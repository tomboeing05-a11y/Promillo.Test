import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card as UICard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PlayingCard } from "@/components/PlayingCard";
import { Card as PCard } from "@/lib/poker-cards";
import { Coins, Eye, EyeOff, LogOut } from "lucide-react";
import { toast } from "sonner";

type Status = "lobby" | "preflop" | "flop" | "turn" | "river" | "showdown";

interface Lobby {
  id: string;
  code: string;
  status: Status;
  use_chips: boolean;
  starting_chips: number;
  small_blind: number;
  big_blind: number;
  community: PCard[];
  pot: number;
  button_seat: number;
  hand_number: number;
}

interface Player {
  id: string;
  lobby_id: string;
  name: string;
  seat: number;
  chips: number;
  hole_cards: PCard[];
  current_bet: number;
  folded: boolean;
}

function storageKey(code: string) {
  return `poker_lobby_${code.toUpperCase()}_pid`;
}

export function PokerPlayer({ onExit }: { onExit: () => void }) {
  const [view, setView] = useState<"join" | "table">("join");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [myId, setMyId] = useState<string | null>(null);
  const [peek, setPeek] = useState(false);
  const [betAmount, setBetAmount] = useState("");

  const me = useMemo(() => players.find((p) => p.id === myId) ?? null, [players, myId]);

  const reloadAll = useCallback(async (lobbyId: string) => {
    const [{ data: l }, { data: ps }] = await Promise.all([
      supabase.from("poker_lobbies").select("*").eq("id", lobbyId).maybeSingle(),
      supabase.from("poker_players").select("*").eq("lobby_id", lobbyId).order("joined_at", { ascending: true }),
    ]);
    if (l) setLobby(l as unknown as Lobby);
    if (ps) setPlayers(ps as unknown as Player[]);
  }, []);

  useEffect(() => {
    if (!lobby?.id) return;
    const ch = supabase
      .channel(`poker_p:${lobby.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "poker_lobbies", filter: `id=eq.${lobby.id}` },
        (p) => {
          if (p.eventType === "DELETE") { toast("Tisch geschlossen."); onExit(); }
          else if (p.new) setLobby(p.new as unknown as Lobby);
        })
      .on("postgres_changes", { event: "*", schema: "public", table: "poker_players", filter: `lobby_id=eq.${lobby.id}` },
        () => reloadAll(lobby.id))
      .subscribe();
    return () => { supabase.removeChannel(ch); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobby?.id]);

  // Reset peek when new hand starts
  useEffect(() => {
    if (lobby?.status === "lobby") setPeek(false);
  }, [lobby?.status]);

  async function joinLobby() {
    const n = name.trim();
    const c = code.trim().toUpperCase();
    if (!n || c.length < 4) return;
    setBusy(true);
    try {
      const { data: l, error } = await supabase
        .from("poker_lobbies")
        .select("*")
        .eq("code", c)
        .maybeSingle();
      if (error || !l) throw new Error("Tisch nicht gefunden.");

      const { data: player, error: pe } = await supabase
        .from("poker_players")
        .insert({ lobby_id: l.id, name: n, is_host: false, chips: 0, seat: 0 })
        .select()
        .single();
      if (pe || !player) throw pe ?? new Error("Beitritt fehlgeschlagen.");

      sessionStorage.setItem(storageKey(c), player.id);
      setMyId(player.id);
      setLobby(l as unknown as Lobby);
      await reloadAll(l.id);
      setView("table");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function leave() {
    if (lobby && myId) {
      await supabase.from("poker_players").delete().eq("id", myId);
      sessionStorage.removeItem(storageKey(lobby.code));
    }
    onExit();
  }

  async function placeBet() {
    if (!me || !lobby) return;
    const amt = Math.max(0, Math.floor(Number(betAmount) || 0));
    if (amt <= 0) return;
    if (lobby.use_chips) {
      const max = me.chips;
      const realAmt = Math.min(amt, max);
      await supabase.from("poker_players").update({
        current_bet: me.current_bet + realAmt,
        chips: me.chips - realAmt,
      }).eq("id", me.id);
    } else {
      // No chips: just show the bet amount
      await supabase.from("poker_players").update({
        current_bet: me.current_bet + amt,
      }).eq("id", me.id);
    }
    setBetAmount("");
  }

  async function fold() {
    if (!me) return;
    await supabase.from("poker_players").update({ folded: true }).eq("id", me.id);
  }

  // ---------- JOIN VIEW ----------
  if (view === "join") {
    return (
      <UICard className="p-6 bg-card/80 backdrop-blur space-y-4">
        <h2 className="text-xl font-display tracking-wider">Tisch beitreten</h2>
        <div className="space-y-2">
          <Label>Tisch-Code</Label>
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
          <Button variant="outline" onClick={onExit}>Zurück</Button>
          <Button onClick={joinLobby} disabled={!name.trim() || code.length < 4 || busy}>
            Beitreten
          </Button>
        </div>
      </UICard>
    );
  }

  // ---------- TABLE VIEW ----------
  if (!lobby || !me) return null;

  const hasCards = me.hole_cards.length > 0;
  const inHand = lobby.status !== "lobby";

  return (
    <div className="space-y-4">
      <UICard className="p-3 bg-card/80 backdrop-blur flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display tracking-[0.3em] text-sm">{lobby.code}</span>
          <Badge variant="secondary">{me.name}</Badge>
          {me.seat > 0 && <Badge variant="outline">Sitz {me.seat}</Badge>}
        </div>
        <Button onClick={leave} size="sm" variant="ghost" className="gap-1">
          <LogOut className="w-4 h-4" />
        </Button>
      </UICard>

      {/* Status / chips */}
      <UICard className="p-4 bg-card/80 backdrop-blur space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Phase</span>
          <span className="font-display tracking-wider">
            {lobby.status === "lobby" && "Warten auf Deal"}
            {lobby.status === "preflop" && "Pre-Flop"}
            {lobby.status === "flop" && "Flop"}
            {lobby.status === "turn" && "Turn"}
            {lobby.status === "river" && "River"}
            {lobby.status === "showdown" && "Showdown"}
          </span>
        </div>
        {lobby.use_chips && (
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Deine Chips</span>
            <span className="font-display text-2xl text-amber-400">
              <Coins className="w-4 h-4 inline mr-1" />
              {me.chips}
            </span>
          </div>
        )}
        {me.current_bet > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Im Pot</span>
            <span className="font-bold text-amber-400">{me.current_bet}</span>
          </div>
        )}
      </UICard>

      {/* Hole cards */}
      {hasCards && (
        <UICard className="p-4 bg-card/80 backdrop-blur text-center space-y-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Deine Hand</div>
          <div className="flex gap-2 justify-center">
            {me.hole_cards.map((c, i) => (
              <PlayingCard key={i} card={c} faceDown={!peek} size="lg" delay={i * 150} />
            ))}
          </div>
          <Button
            variant={peek ? "secondary" : "default"}
            className="w-full"
            onClick={() => setPeek((v) => !v)}
          >
            {peek ? <><EyeOff className="w-4 h-4 mr-2" /> Verbergen</> : <><Eye className="w-4 h-4 mr-2" /> Karten anschauen</>}
          </Button>
          {me.folded && (
            <div className="text-sm text-destructive font-medium">Du hast gefoldet</div>
          )}
        </UICard>
      )}

      {/* Betting (only when playing with chips) */}
      {inHand && !me.folded && hasCards && lobby.use_chips && (
        <UICard className="p-4 bg-card/80 backdrop-blur space-y-3">
          <Label className="text-xs uppercase tracking-widest text-muted-foreground">
            Einsatz erhöhen
          </Label>
          <div className="flex gap-2">
            <Input
              type="number"
              min={1}
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder={`max ${me.chips}`}
            />
            <Button onClick={placeBet} disabled={!betAmount || Number(betAmount) <= 0}>
              Setzen
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {[lobby.big_blind, lobby.big_blind * 2, lobby.big_blind * 5, me.chips].map((v, i) => (
              <Button
                key={i}
                size="sm"
                variant="outline"
                onClick={() => setBetAmount(String(Math.min(v, me.chips)))}
                disabled={me.chips === 0}
              >
                {i === 3 ? "All-in" : v}
              </Button>
            ))}
          </div>
          <Button variant="destructive" className="w-full" onClick={fold}>
            Fold
          </Button>
        </UICard>
      )}

      {/* Fold-only when no chips */}
      {inHand && !me.folded && hasCards && !lobby.use_chips && (
        <UICard className="p-4 bg-card/80 backdrop-blur">
          <Button variant="destructive" className="w-full" onClick={fold}>
            Fold
          </Button>
        </UICard>
      )}

      {/* Community preview */}
      {lobby.community.length > 0 && (
        <UICard className="p-4 bg-card/80 backdrop-blur">
          <div className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-2">
            Board
          </div>
          <div className="flex gap-1 justify-center">
            {lobby.community.map((c, i) => (
              <PlayingCard key={i} card={c} size="sm" delay={i * 80} />
            ))}
          </div>
        </UICard>
      )}

      {!inHand && (
        <UICard className="p-6 bg-card/80 backdrop-blur text-center text-muted-foreground">
          Warte, bis der Tisch eine Hand austeilt …
        </UICard>
      )}
    </div>
  );
}
