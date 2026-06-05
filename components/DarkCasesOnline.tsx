import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { DARK_CASES, type BlackStoryDifficulty } from "@/lib/dark-cases";
import { Copy, Crown, Eye, EyeOff, LogOut, Play, Trophy, ChevronRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";

type LobbyStatus = "waiting" | "playing" | "round_end" | "finished";

interface Lobby {
  id: string;
  code: string;
  status: LobbyStatus;
  difficulties: string[];
  points_correct: number;
  sips_wrong: number;
  current_story_id: number | null;
  host_player_id: string | null;
  narrator_player_id: string | null;
  no_count: number;
  yes_count: number;
  round_number: number;
  solution_visible: boolean;
}

interface Player {
  id: string;
  lobby_id: string;
  name: string;
  points: number;
  is_host: boolean;
  joined_at: string;
}

function genCode() {
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 4 }, () => c[Math.floor(Math.random() * c.length)]).join("");
}

function pidKey(code: string) { return `darkcases_pid_${code}`; }

const DIFFICULTY_LABEL: Record<BlackStoryDifficulty, string> = {
  leicht: "Leicht", mittel: "Mittel", dunkel: "Dunkel 🖤",
};

export function DarkCasesOnline({
  difficulties, pointsCorrect, sipsWrong, onExit,
}: {
  difficulties: BlackStoryDifficulty[];
  pointsCorrect: number;
  sipsWrong: number;
  onExit: () => void;
}) {
  const [view, setView] = useState<"menu" | "create" | "join">("menu");
  const [name, setName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [busy, setBusy] = useState(false);

  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [myId, setMyId] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const me = useMemo(() => players.find(p => p.id === myId) ?? null, [players, myId]);
  const isHost = lobby?.host_player_id === myId;
  const isNarrator = lobby?.narrator_player_id === myId;
  const narrator = players.find(p => p.id === lobby?.narrator_player_id);
  const currentStory = DARK_CASES.find(s => s.id === lobby?.current_story_id) ?? null;

  // ── Realtime ─────────────────────────────────────────────────────────────
  const reloadAll = useCallback(async (lobbyId: string) => {
    const [{ data: l }, { data: ps }] = await Promise.all([
      supabase.from("darkcases_lobbies").select("*").eq("id", lobbyId).maybeSingle(),
      supabase.from("darkcases_players").select("*").eq("lobby_id", lobbyId).order("joined_at"),
    ]);
    if (l) setLobby(l as Lobby);
    if (ps) setPlayers(ps as Player[]);
  }, []);

  useEffect(() => {
    if (!lobby?.id) return;
    const ch = supabase
      .channel(`darkcases:${lobby.id}`)
      .on("postgres_changes",
        { event: "*", schema: "public", table: "darkcases_lobbies", filter: `id=eq.${lobby.id}` },
        payload => {
          if (payload.eventType === "DELETE") { toast("Lobby geschlossen."); onExit(); }
          else if (payload.new) { setLobby(payload.new as Lobby); setShowSolution(false); }
        })
      .on("postgres_changes",
        { event: "*", schema: "public", table: "darkcases_players", filter: `lobby_id=eq.${lobby.id}` },
        () => reloadAll(lobby.id))
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [lobby?.id, reloadAll, onExit]);

  // ── Create ───────────────────────────────────────────────────────────────
  async function createLobby() {
    if (!name.trim()) return;
    setBusy(true);
    try {
      const code = genCode();
      const { data: l, error: le } = await supabase
        .from("darkcases_lobbies")
        .insert({ code, difficulties, points_correct: pointsCorrect, sips_wrong: sipsWrong })
        .select().single();
      if (le || !l) throw le;
      const { data: p, error: pe } = await supabase
        .from("darkcases_players")
        .insert({ lobby_id: l.id, name: name.trim(), is_host: true })
        .select().single();
      if (pe || !p) throw pe;
      await supabase.from("darkcases_lobbies").update({ host_player_id: p.id }).eq("id", l.id);
      localStorage.setItem(pidKey(code), p.id);
      setMyId(p.id);
      setLobby({ ...l, host_player_id: p.id } as Lobby);
      setPlayers([p as Player]);
    } catch { toast.error("Fehler beim Erstellen."); }
    finally { setBusy(false); }
  }

  // ── Join ─────────────────────────────────────────────────────────────────
  async function joinLobby() {
    if (!name.trim() || !joinCode.trim()) return;
    setBusy(true);
    try {
      const code = joinCode.trim().toUpperCase();
      const saved = localStorage.getItem(pidKey(code));
      const { data: l } = await supabase.from("darkcases_lobbies").select("*").eq("code", code).maybeSingle();
      if (!l) { toast.error("Lobby nicht gefunden."); setBusy(false); return; }
      if (saved) {
        const { data: ex } = await supabase.from("darkcases_players").select("*").eq("id", saved).maybeSingle();
        if (ex) { setMyId(saved); await reloadAll(l.id); setLobby(l as Lobby); setBusy(false); return; }
      }
      const { data: p, error } = await supabase
        .from("darkcases_players")
        .insert({ lobby_id: l.id, name: name.trim() })
        .select().single();
      if (error || !p) throw error;
      localStorage.setItem(pidKey(code), p.id);
      setMyId(p.id);
      await reloadAll(l.id);
      setLobby(l as Lobby);
    } catch { toast.error("Beitreten fehlgeschlagen."); }
    finally { setBusy(false); }
  }

  // ── Host actions ──────────────────────────────────────────────────────────
  async function startRound() {
    if (!lobby || !isHost) return;
    const pool = DARK_CASES.filter(s => (lobby.difficulties as BlackStoryDifficulty[]).includes(s.difficulty));
    const story = pool[Math.floor(Math.random() * pool.length)];
    // Narrator = next player after host in rotation
    const hostIdx = players.findIndex(p => p.id === lobby.host_player_id);
    const narratorIdx = (hostIdx + lobby.round_number - 1) % players.length;
    await supabase.from("darkcases_lobbies").update({
      status: "playing",
      current_story_id: story.id,
      narrator_player_id: players[narratorIdx]?.id ?? players[0].id,
      no_count: 0,
      yes_count: 0,
      solution_visible: false,
    }).eq("id", lobby.id);
  }

  async function answerYes() {
    if (!lobby || !isNarrator) return;
    await supabase.from("darkcases_lobbies").update({ yes_count: (lobby.yes_count ?? 0) + 1 }).eq("id", lobby.id);
  }

  async function answerNo() {
    if (!lobby || !isNarrator) return;
    await supabase.from("darkcases_lobbies").update({ no_count: (lobby.no_count ?? 0) + 1 }).eq("id", lobby.id);
  }

  async function playerSolved(playerId: string) {
    if (!lobby || !isNarrator) return;
    const p = players.find(x => x.id === playerId);
    if (!p) return;
    await supabase.from("darkcases_players").update({ points: p.points + (lobby.points_correct ?? 3) }).eq("id", playerId);
    await supabase.from("darkcases_lobbies").update({ status: "round_end" }).eq("id", lobby.id);
  }

  async function nobodySolved() {
    if (!lobby || !isNarrator) return;
    // Narrator gets +1 bonus
    if (narrator) await supabase.from("darkcases_players").update({ points: narrator.points + 1 }).eq("id", narrator.id);
    await supabase.from("darkcases_lobbies").update({ status: "round_end" }).eq("id", lobby.id);
  }

  async function nextRound() {
    if (!lobby || !isHost) return;
    if (lobby.round_number >= 10) {
      await supabase.from("darkcases_lobbies").update({ status: "finished" }).eq("id", lobby.id);
    } else {
      await supabase.from("darkcases_lobbies").update({ status: "waiting", round_number: lobby.round_number + 1 }).eq("id", lobby.id);
    }
  }

  async function leaveLobby() {
    if (!myId) return;
    await supabase.from("darkcases_players").delete().eq("id", myId);
    if (isHost && lobby) await supabase.from("darkcases_lobbies").delete().eq("id", lobby.id);
    onExit();
  }

  const sorted = [...players].sort((a, b) => b.points - a.points);

  // ── Views ─────────────────────────────────────────────────────────────────
  if (!lobby) return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onExit}><LogOut className="w-4 h-4" /></Button>
        <h2 className="text-xl font-display tracking-wider">Online-Lobby</h2>
      </div>
      {view === "menu" && (
        <div className="space-y-3">
          <Button onClick={() => setView("create")} className="w-full" size="lg">+ Lobby erstellen</Button>
          <Button onClick={() => setView("join")} variant="outline" className="w-full" size="lg">Code eingeben & beitreten</Button>
        </div>
      )}
      {view === "create" && (
        <div className="space-y-4">
          <button onClick={() => setView("menu")} className="text-xs text-muted-foreground">← Zurück</button>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Dein Name" />
          <Button onClick={createLobby} disabled={!name.trim() || busy} className="w-full" size="lg">
            {busy ? "Erstelle…" : "Lobby erstellen 🚀"}
          </Button>
        </div>
      )}
      {view === "join" && (
        <div className="space-y-4">
          <button onClick={() => setView("menu")} className="text-xs text-muted-foreground">← Zurück</button>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Dein Name" />
          <Input value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} placeholder="Code (z.B. X4K2)"
            style={{ textTransform: "uppercase", letterSpacing: "0.25em", fontWeight: 900, fontSize: 20, textAlign: "center" }} />
          <Button onClick={joinLobby} disabled={!name.trim() || !joinCode.trim() || busy} className="w-full" size="lg">
            {busy ? "Verbinde…" : "Beitreten 📲"}
          </Button>
        </div>
      )}
    </Card>
  );

  // Waiting
  if (lobby.status === "waiting") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display tracking-wider">Lobby</h2>
        <Button variant="ghost" size="icon" onClick={leaveLobby}><LogOut className="w-4 h-4" /></Button>
      </div>
      <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-4 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Lobby-Code</p>
        <p className="text-3xl font-display tracking-widest">{lobby.code}</p>
        <button onClick={() => { navigator.clipboard.writeText(lobby.code); toast("Code kopiert!"); }}
          className="flex items-center gap-1 mx-auto mt-1 text-xs text-muted-foreground hover:text-foreground">
          <Copy className="w-3 h-3" /> Code kopieren
        </button>
      </div>
      <div className="space-y-2">
        {players.map(p => (
          <div key={p.id} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${p.id === myId ? "bg-primary/15 border border-primary/30" : "bg-secondary/50"}`}>
            {p.is_host && <Crown className="w-3.5 h-3.5 text-yellow-500" />}
            <span className="font-medium">{p.name}</span>
            {p.id === myId && <Badge variant="outline" className="ml-auto text-xs">Du</Badge>}
            <span className="font-display ml-auto">{p.points} P.</span>
          </div>
        ))}
      </div>
      {isHost
        ? <Button onClick={startRound} disabled={players.length < 2} className="w-full" size="lg"><Play className="w-4 h-4 mr-2" />Runde starten</Button>
        : <p className="text-center text-sm text-muted-foreground">Warte auf den Host…</p>}
    </Card>
  );

  // Playing
  if (lobby.status === "playing") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-4 animate-scale-in">
      <div className="flex items-center justify-between">
        <Badge variant="outline">{DIFFICULTY_LABEL[currentStory?.difficulty ?? "leicht"]}</Badge>
        <Badge variant="outline">{isNarrator ? "Du bist Erzähler 📖" : `Erzähler: ${narrator?.name}`}</Badge>
      </div>

      {/* Riddle – everyone sees */}
      <div className="bg-secondary/50 rounded-xl p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Das Rätsel</p>
        <p className="font-medium leading-relaxed">{currentStory?.riddle}</p>
      </div>

      {/* Solution – only narrator */}
      {isNarrator && (
        <div className={`rounded-xl p-4 border-2 transition-all ${showSolution ? "border-primary/40 bg-primary/10" : "border-dashed border-border bg-muted/30"}`}>
          <button onClick={() => setShowSolution(s => !s)}
            className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-2 w-full">
            {showSolution ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showSolution ? "Lösung verbergen" : "Lösung anzeigen (nur du!)"}
          </button>
          {showSolution && <p className="text-sm leading-relaxed">{currentStory?.solution}</p>}
        </div>
      )}

      {/* Q&A counter */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-display text-green-500">{lobby.yes_count}</p>
          <p className="text-xs text-muted-foreground">✓ Ja</p>
        </div>
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-display text-destructive">{lobby.no_count}</p>
          <p className="text-xs text-muted-foreground">✗ Nein ({sipsWrong} Schluck)</p>
        </div>
      </div>

      {/* Narrator controls */}
      {isNarrator && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={answerYes} variant="outline" className="border-green-500/40 text-green-600 hover:bg-green-500/10">
              <ThumbsUp className="w-4 h-4 mr-1" /> Ja
            </Button>
            <Button onClick={answerNo} variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10">
              <ThumbsDown className="w-4 h-4 mr-1" /> Nein
            </Button>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground text-center">Wer hat es gelöst?</p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {players.filter(p => p.id !== myId).map(p => (
                <button key={p.id} onClick={() => playerSolved(p.id)}
                  className="bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer">
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={nobodySolved} variant="outline" size="sm" className="w-full">
            Niemand errät es → Lösung zeigen
          </Button>
        </>
      )}

      {!isNarrator && (
        <p className="text-center text-sm text-muted-foreground">Stellt Ja/Nein-Fragen an {narrator?.name}!</p>
      )}
    </Card>
  );

  // Round end
  if (lobby.status === "round_end") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Die Lösung</p>
        <p className="text-sm leading-relaxed">{currentStory?.solution}</p>
      </div>
      <div className="space-y-1.5">
        {sorted.map((p, i) => (
          <div key={p.id} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2">
            <span className="font-medium">{["🥇","🥈","🥉"][i] ?? `#${i+1}`} {p.name}</span>
            <span className="font-display text-xl">{p.points}</span>
          </div>
        ))}
      </div>
      {isHost
        ? <Button onClick={nextRound} className="w-full" size="lg">Nächste Runde <ChevronRight className="w-4 h-4 ml-1" /></Button>
        : <p className="text-center text-sm text-muted-foreground">Warte auf den Host…</p>}
    </Card>
  );

  // Finished
  return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="text-center py-2">
        <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
        <h2 className="text-2xl font-display tracking-wider">Spiel beendet!</h2>
      </div>
      <div className="space-y-2">
        {sorted.map((p, i) => (
          <div key={p.id} className={`flex items-center justify-between rounded-xl px-4 py-3 ${i === 0 ? "bg-yellow-500/20 border-2 border-yellow-500/30" : "bg-secondary/50"}`}>
            <span className="font-medium">{["🥇","🥈","🥉"][i] ?? `#${i+1}`} {p.name}</span>
            <span className="font-display text-2xl">{p.points}</span>
          </div>
        ))}
      </div>
      <Button onClick={onExit} className="w-full" size="lg">Zurück zum Menü</Button>
    </Card>
  );
}
