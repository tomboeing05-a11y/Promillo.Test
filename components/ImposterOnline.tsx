import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import {
  IMPOSTER_CATEGORIES,
  IMPOSTER_WORDS,
  type ImposterCategory,
} from "@/lib/imposter-words";
import {
  Copy,
  Crown,
  Eye,
  EyeOff,
  LogOut,
  Play,
  RotateCw,
  Shuffle,
  Skull,
  Users,
} from "lucide-react";
import { toast } from "sonner";

type Status = "waiting" | "reveal" | "discuss" | "result";

interface Lobby {
  id: string;
  code: string;
  status: Status;
  categories: string[];
  hint_enabled: boolean;
  word: string | null;
  hint: string | null;
  imposter_player_id: string | null;
  starter_player_id: string | null;
  host_player_id: string | null;
}

interface Player {
  id: string;
  lobby_id: string;
  name: string;
  is_host: boolean;
  joined_at: string;
}

const DEFAULT_CATS: ImposterCategory[] = ["einfach", "trends", "marken", "filme", "fussball"];

function genCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let c = "";
  for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return c;
}

function storageKey(code: string) {
  return `imposter_lobby_${code.toUpperCase()}_pid`;
}

export function ImposterOnline({ onExit }: { onExit: () => void }) {
  const [view, setView] = useState<"menu" | "create" | "join" | "lobby">("menu");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [myId, setMyId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const me = useMemo(() => players.find((p) => p.id === myId) ?? null, [players, myId]);
  const isHost = lobby?.host_player_id === myId;

  // ---------- Subscriptions ----------
  const reloadAll = useCallback(async (lobbyId: string) => {
    const [{ data: l }, { data: ps }] = await Promise.all([
      supabase.from("imposter_lobbies").select("*").eq("id", lobbyId).maybeSingle(),
      supabase
        .from("imposter_players")
        .select("*")
        .eq("lobby_id", lobbyId)
        .order("joined_at", { ascending: true }),
    ]);
    if (l) setLobby(l as Lobby);
    if (ps) setPlayers(ps as Player[]);
  }, []);

  useEffect(() => {
    if (!lobby?.id) return;
    const ch = supabase
      .channel(`lobby:${lobby.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "imposter_lobbies", filter: `id=eq.${lobby.id}` },
        (payload) => {
          if (payload.eventType === "DELETE") {
            toast("Lobby wurde geschlossen.");
            onExit();
          } else if (payload.new) {
            setLobby(payload.new as Lobby);
          }
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "imposter_players", filter: `lobby_id=eq.${lobby.id}` },
        () => reloadAll(lobby.id),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobby?.id]);

  // Reset revealed when status changes back to waiting/result
  useEffect(() => {
    if (lobby?.status === "waiting" || lobby?.status === "result") setRevealed(false);
  }, [lobby?.status]);

  // ---------- Actions ----------
  async function createLobby() {
    const n = name.trim();
    if (!n) return;
    setBusy(true);
    try {
      let lobbyCode = "";
      let lobbyId: string | null = null;
      for (let attempt = 0; attempt < 5; attempt++) {
        lobbyCode = genCode();
        const { data, error } = await supabase
          .from("imposter_lobbies")
          .insert({ code: lobbyCode, status: "waiting", categories: DEFAULT_CATS, hint_enabled: true })
          .select()
          .single();
        if (!error && data) {
          lobbyId = data.id;
          break;
        }
      }
      if (!lobbyId) throw new Error("Konnte keine Lobby erstellen.");

      const { data: player, error: pe } = await supabase
        .from("imposter_players")
        .insert({ lobby_id: lobbyId, name: n, is_host: true })
        .select()
        .single();
      if (pe || !player) throw pe ?? new Error("Spieler konnte nicht erstellt werden.");

      await supabase
        .from("imposter_lobbies")
        .update({ host_player_id: player.id })
        .eq("id", lobbyId);

      sessionStorage.setItem(storageKey(lobbyCode), player.id);
      setMyId(player.id);
      await reloadAll(lobbyId);
      setView("lobby");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function joinLobby() {
    const n = name.trim();
    const c = code.trim().toUpperCase();
    if (!n || c.length < 4) return;
    setBusy(true);
    try {
      const { data: l, error } = await supabase
        .from("imposter_lobbies")
        .select("*")
        .eq("code", c)
        .maybeSingle();
      if (error || !l) throw new Error("Lobby nicht gefunden.");
      if (l.status !== "waiting") throw new Error("Spiel läuft bereits.");

      const { data: player, error: pe } = await supabase
        .from("imposter_players")
        .insert({ lobby_id: l.id, name: n, is_host: false })
        .select()
        .single();
      if (pe || !player) throw pe ?? new Error("Beitritt fehlgeschlagen.");

      sessionStorage.setItem(storageKey(c), player.id);
      setMyId(player.id);
      setLobby(l as Lobby);
      await reloadAll(l.id);
      setView("lobby");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function leaveLobby() {
    if (!lobby || !myId) {
      onExit();
      return;
    }
    try {
      if (isHost) {
        await supabase.from("imposter_lobbies").delete().eq("id", lobby.id);
      } else {
        await supabase.from("imposter_players").delete().eq("id", myId);
      }
      sessionStorage.removeItem(storageKey(lobby.code));
    } catch {
      /* ignore */
    }
    onExit();
  }

  async function updateCategory(catId: ImposterCategory) {
    if (!lobby || !isHost) return;
    const next = lobby.categories.includes(catId)
      ? lobby.categories.filter((c) => c !== catId)
      : [...lobby.categories, catId];
    await supabase.from("imposter_lobbies").update({ categories: next }).eq("id", lobby.id);
  }

  async function toggleHint(v: boolean) {
    if (!lobby || !isHost) return;
    await supabase.from("imposter_lobbies").update({ hint_enabled: v }).eq("id", lobby.id);
  }

  async function startRound() {
    if (!lobby || !isHost) return;
    if (players.length < 3) {
      toast.error("Mind. 3 Spieler nötig.");
      return;
    }
    if (lobby.categories.length === 0) {
      toast.error("Mind. eine Kategorie wählen.");
      return;
    }
    const pool: [string, string][] = [];
    for (const c of lobby.categories as ImposterCategory[]) {
      if (IMPOSTER_WORDS[c]) pool.push(...IMPOSTER_WORDS[c]);
    }
    if (pool.length === 0) return;
    const [word, hint] = pool[Math.floor(Math.random() * pool.length)];
    const imp = players[Math.floor(Math.random() * players.length)];
    const starter = players[Math.floor(Math.random() * players.length)];
    await supabase
      .from("imposter_lobbies")
      .update({
        status: "reveal",
        word,
        hint,
        imposter_player_id: imp.id,
        starter_player_id: starter.id,
      })
      .eq("id", lobby.id);
  }

  async function setStatus(s: Status) {
    if (!lobby || !isHost) return;
    await supabase.from("imposter_lobbies").update({ status: s }).eq("id", lobby.id);
  }

  async function nextRound() {
    if (!lobby || !isHost) return;
    await supabase
      .from("imposter_lobbies")
      .update({
        status: "waiting",
        word: null,
        hint: null,
        imposter_player_id: null,
        starter_player_id: null,
      })
      .eq("id", lobby.id);
  }

  function copyCode() {
    if (!lobby) return;
    navigator.clipboard?.writeText(lobby.code).catch(() => undefined);
    toast.success("Code kopiert");
  }

  // ---------- MENU ----------
  if (view === "menu") {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-4">
        <div className="text-center space-y-1">
          <Users className="w-8 h-8 mx-auto text-primary" />
          <h2 className="text-2xl font-display tracking-wider">Online-Lobby</h2>
          <p className="text-sm text-muted-foreground">
            Jeder spielt am eigenen Handy.
          </p>
        </div>
        <Button onClick={() => setView("create")} size="lg" className="w-full">
          Lobby erstellen
        </Button>
        <Button onClick={() => setView("join")} size="lg" variant="secondary" className="w-full">
          Lobby beitreten
        </Button>
        <Button onClick={onExit} variant="ghost" className="w-full">
          Zurück
        </Button>
      </Card>
    );
  }

  // ---------- CREATE ----------
  if (view === "create") {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-4">
        <h2 className="text-xl font-display tracking-wider">Neue Lobby</h2>
        <div className="space-y-2">
          <Label>Dein Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z. B. Max"
            maxLength={20}
            onKeyDown={(e) => e.key === "Enter" && createLobby()}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => setView("menu")}>Zurück</Button>
          <Button onClick={createLobby} disabled={!name.trim() || busy}>
            Erstellen
          </Button>
        </div>
      </Card>
    );
  }

  // ---------- JOIN ----------
  if (view === "join") {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-4">
        <h2 className="text-xl font-display tracking-wider">Beitreten</h2>
        <div className="space-y-2">
          <Label>Code</Label>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="z. B. AB3F"
            maxLength={4}
            className="font-display tracking-[0.5em] text-center text-2xl"
          />
        </div>
        <div className="space-y-2">
          <Label>Dein Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z. B. Lisa"
            maxLength={20}
            onKeyDown={(e) => e.key === "Enter" && joinLobby()}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => setView("menu")}>Zurück</Button>
          <Button onClick={joinLobby} disabled={!name.trim() || code.length < 4 || busy}>
            Beitreten
          </Button>
        </div>
      </Card>
    );
  }

  // ---------- LOBBY ----------
  if (!lobby) return null;

  const imIsImposter = me?.id === lobby.imposter_player_id;
  const starter = players.find((p) => p.id === lobby.starter_player_id);
  const imposter = players.find((p) => p.id === lobby.imposter_player_id);

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-4 bg-card/80 backdrop-blur flex items-center justify-between">
        <button
          onClick={copyCode}
          className="flex items-center gap-2 hover:opacity-80"
          title="Code kopieren"
        >
          <span className="text-xs text-muted-foreground">Code</span>
          <span className="font-display tracking-[0.4em] text-2xl">{lobby.code}</span>
          <Copy className="w-3 h-3 opacity-60" />
        </button>
        <Button onClick={leaveLobby} size="sm" variant="ghost" className="gap-1">
          <LogOut className="w-4 h-4" /> Verlassen
        </Button>
      </Card>

      {/* Players */}
      <Card className="p-4 bg-card/80 backdrop-blur">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{players.length} Spieler</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {players.map((p) => (
            <Badge key={p.id} variant={p.id === myId ? "default" : "secondary"} className="gap-1 py-1.5">
              {p.is_host && <Crown className="w-3 h-3 text-accent" />}
              {p.name}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Phase content */}
      {lobby.status === "waiting" && (
        <Card className="p-6 bg-card/80 backdrop-blur space-y-5">
          <div>
            <h3 className="font-display tracking-wider mb-3">Kategorien</h3>
            <div className="grid grid-cols-2 gap-2">
              {IMPOSTER_CATEGORIES.map((c) => {
                const active = lobby.categories.includes(c.id);
                return (
                  <button
                    key={c.id}
                    disabled={!isHost}
                    onClick={() => updateCategory(c.id)}
                    className={`p-2 rounded-md border text-sm text-left transition ${
                      active
                        ? "border-primary bg-primary/15"
                        : "border-border bg-muted/30 opacity-60"
                    } ${!isHost && "cursor-not-allowed"}`}
                  >
                    <span className="mr-1">{c.emoji}</span> {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Imposter bekommt Tipp</Label>
              <p className="text-xs text-muted-foreground">Ober-Kategorie statt nichts</p>
            </div>
            <Switch checked={lobby.hint_enabled} onCheckedChange={toggleHint} disabled={!isHost} />
          </div>

          {isHost ? (
            <Button onClick={startRound} size="lg" className="w-full">
              <Play className="w-4 h-4 mr-2" /> Runde starten
            </Button>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              Warte auf den Host …
            </div>
          )}
        </Card>
      )}

      {lobby.status === "reveal" && (
        <Card className="p-6 bg-card/80 backdrop-blur text-center space-y-5">
          <h3 className="text-xl font-display tracking-wider">Dein Wort</h3>
          <p className="text-xs text-muted-foreground">
            Schau heimlich – niemand sonst darf mitlesen.
          </p>
          {!revealed ? (
            <Button onClick={() => setRevealed(true)} size="lg" className="w-full">
              <Eye className="w-4 h-4 mr-2" /> Aufdecken
            </Button>
          ) : (
            <>
              <div
                className={`p-8 rounded-lg border-2 ${
                  imIsImposter
                    ? "border-destructive bg-destructive/10"
                    : "border-primary bg-primary/10"
                }`}
              >
                {imIsImposter ? (
                  <>
                    <Skull className="w-10 h-10 mx-auto mb-2 text-destructive" />
                    <div className="text-3xl font-display tracking-widest text-destructive">
                      IMPOSTER
                    </div>
                    {lobby.hint_enabled && lobby.hint && (
                      <div className="mt-3 text-sm text-muted-foreground">
                        Tipp: <strong className="text-foreground">{lobby.hint}</strong>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-xs text-muted-foreground mb-1">Dein Wort</div>
                    <div className="text-3xl font-display tracking-wider">{lobby.word}</div>
                  </>
                )}
              </div>
              <Button onClick={() => setRevealed(false)} variant="secondary" className="w-full">
                <EyeOff className="w-4 h-4 mr-2" /> Verbergen
              </Button>
            </>
          )}
          {isHost && (
            <Button onClick={() => setStatus("discuss")} size="lg" className="w-full">
              Diskussion starten
            </Button>
          )}
        </Card>
      )}

      {lobby.status === "discuss" && (
        <Card className="p-6 bg-card/80 backdrop-blur space-y-5">
          <div className="text-center space-y-2">
            <Shuffle className="w-8 h-8 mx-auto text-primary" />
            <h3 className="text-2xl font-display tracking-wider">Diskussion</h3>
            <p className="text-sm text-muted-foreground">
              Jeder nennt <strong>ein Wort</strong>. Reihum entlarven!
            </p>
          </div>
          {starter && (
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Startet</div>
              <div className="font-display tracking-wider text-xl">
                <Crown className="w-4 h-4 inline mr-1 text-accent" /> {starter.name}
              </div>
            </div>
          )}
          {isHost && (
            <Button onClick={() => setStatus("result")} size="lg" className="w-full">
              Auflösen
            </Button>
          )}
        </Card>
      )}

      {lobby.status === "result" && (
        <Card className="p-6 bg-card/80 backdrop-blur text-center space-y-5">
          <h3 className="text-2xl font-display tracking-wider">Auflösung</h3>
          <div className="p-6 rounded-lg border-2 border-primary bg-primary/10">
            <div className="text-xs text-muted-foreground mb-1">Das Wort war</div>
            <div className="text-3xl font-display tracking-wider">{lobby.word}</div>
          </div>
          <div className="p-6 rounded-lg border-2 border-destructive bg-destructive/10">
            <Skull className="w-8 h-8 mx-auto mb-2 text-destructive" />
            <div className="text-xs text-muted-foreground mb-1">Imposter war</div>
            <div className="text-2xl font-display tracking-wider text-destructive">
              {imposter?.name ?? "?"}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Entlarvt? Imposter trinkt. Nicht erkannt? Alle anderen trinken. 🍻
          </p>
          {isHost && (
            <Button onClick={nextRound} size="lg" className="w-full">
              <RotateCw className="w-4 h-4 mr-2" /> Nächste Runde
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}
