import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card as UICard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { PlayingCard } from "@/components/PlayingCard";
import { Card as PCard, freshDeck } from "@/lib/poker-cards";
import {
  Coins,
  Copy,
  Crown,
  Eye,
  LogOut,
  Maximize2,
  Minimize2,
  Play,
  RotateCw,
  Shuffle,
  Trophy,
  Users,
} from "lucide-react";
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
  deck: PCard[];
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
  is_host: boolean;
}

const MAX_SEATS = 9;

function genCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let c = "";
  for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return c;
}

export function PokerRunout({ onExit }: { onExit: () => void }) {
  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [showdownReveal, setShowdownReveal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const seated = useMemo(
    () => players.filter((p) => p.seat > 0).sort((a, b) => a.seat - b.seat),
    [players],
  );

  const reloadAll = useCallback(async (lobbyId: string) => {
    const [{ data: l }, { data: ps }] = await Promise.all([
      supabase.from("poker_lobbies").select("*").eq("id", lobbyId).maybeSingle(),
      supabase.from("poker_players").select("*").eq("lobby_id", lobbyId).order("joined_at", { ascending: true }),
    ]);
    if (l) setLobby(l as unknown as Lobby);
    if (ps) setPlayers(ps as unknown as Player[]);
  }, []);

  // Auto-create lobby on mount (guarded against StrictMode double-invoke)
  const createdRef = useRef(false);
  useEffect(() => {
    if (createdRef.current) return;
    createdRef.current = true;
    (async () => {
      for (let i = 0; i < 5; i++) {
        const code = genCode();
        const { data, error } = await supabase
          .from("poker_lobbies")
          .insert({ code, status: "lobby" })
          .select()
          .single();
        if (!error && data) {
          setLobby(data as unknown as Lobby);
          return;
        }
      }
      toast.error("Konnte keinen Tisch erstellen.");
      onExit();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Realtime
  useEffect(() => {
    if (!lobby?.id) return;
    const ch = supabase
      .channel(`poker:${lobby.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "poker_lobbies", filter: `id=eq.${lobby.id}` },
        (p) => p.eventType !== "DELETE" && p.new && setLobby(p.new as unknown as Lobby))
      .on("postgres_changes", { event: "*", schema: "public", table: "poker_players", filter: `lobby_id=eq.${lobby.id}` },
        () => reloadAll(lobby.id))
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [lobby?.id, reloadAll]);

  // Reset reveal on phase change
  useEffect(() => {
    if (lobby?.status !== "showdown") setShowdownReveal(false);
  }, [lobby?.status]);

  // Sync fullscreen state
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);


  async function closeTable() {
    if (lobby) await supabase.from("poker_lobbies").delete().eq("id", lobby.id);
    onExit();
  }

  async function updateLobby(patch: Partial<Lobby>) {
    if (!lobby) return;
    await supabase.from("poker_lobbies").update(patch as never).eq("id", lobby.id);
  }

  async function assignSeat(playerId: string, seat: number) {
    // Free up seat if taken
    const taken = players.find((p) => p.seat === seat && p.id !== playerId);
    if (taken) {
      await supabase.from("poker_players").update({ seat: 0 }).eq("id", taken.id);
    }
    await supabase.from("poker_players").update({ seat }).eq("id", playerId);
  }

  async function kickPlayer(playerId: string) {
    await supabase.from("poker_players").delete().eq("id", playerId);
  }

  async function dealHand() {
    if (!lobby) return;
    const participants = lobby.use_chips ? seated : players;
    if (participants.length < 2) {
      toast.error("Mind. 2 Spieler nötig.");
      return;
    }
    const deck = freshDeck();
    let idx = 0;
    const hands: Record<string, PCard[]> = {};
    for (let round = 0; round < 2; round++) {
      for (const p of participants) {
        hands[p.id] ??= [];
        hands[p.id].push(deck[idx++]);
      }
    }

    let buttonSeat = lobby.button_seat;
    let sbSeat = -1;
    let bbSeat = -1;
    if (lobby.use_chips) {
      const seats = seated.map((p) => p.seat);
      if (lobby.hand_number === 0 || !seats.includes(buttonSeat)) {
        buttonSeat = seats[0];
      } else {
        const i = seats.indexOf(buttonSeat);
        buttonSeat = seats[(i + 1) % seats.length];
      }
      sbSeat = seats[(seats.indexOf(buttonSeat) + 1) % seats.length];
      bbSeat = seats[(seats.indexOf(buttonSeat) + 2) % seats.length];
    }

    const updates = participants.map((p) => {
      let chips = p.chips;
      let bet = 0;
      if (lobby.use_chips) {
        if (p.seat === sbSeat) {
          bet = Math.min(lobby.small_blind, chips);
          chips -= bet;
        } else if (p.seat === bbSeat) {
          bet = Math.min(lobby.big_blind, chips);
          chips -= bet;
        }
      }
      return supabase.from("poker_players").update({
        hole_cards: hands[p.id] as never,
        current_bet: bet,
        folded: false,
        chips,
      }).eq("id", p.id);
    });
    await Promise.all(updates);

    const blindsPot = lobby.use_chips ? lobby.small_blind + lobby.big_blind : 0;

    await updateLobby({
      status: "preflop",
      deck: deck.slice(idx),
      community: [],
      pot: blindsPot,
      button_seat: buttonSeat,
      hand_number: lobby.hand_number + 1,
    });
  }

  async function dealStreet(kind: "flop" | "turn" | "river") {
    if (!lobby) return;
    const deck = [...lobby.deck];
    deck.shift(); // burn
    const take = kind === "flop" ? 3 : 1;
    const newCards = deck.splice(0, take);
    await updateLobby({
      status: kind,
      deck,
      community: [...lobby.community, ...newCards],
    });
  }

  async function collectBets() {
    if (!lobby) return;
    const sum = seated.reduce((s, p) => s + p.current_bet, 0);
    await Promise.all(seated.map((p) =>
      supabase.from("poker_players").update({ current_bet: 0 }).eq("id", p.id)
    ));
    await updateLobby({ pot: lobby.pot + sum });
  }

  async function awardPot(playerId: string) {
    if (!lobby) return;
    const p = players.find((x) => x.id === playerId);
    if (!p) return;
    // collect any remaining bets first
    const sumBets = seated.reduce((s, x) => s + x.current_bet, 0);
    const totalPot = lobby.pot + sumBets;
    await Promise.all(seated.map((x) =>
      supabase.from("poker_players").update({ current_bet: 0 }).eq("id", x.id)
    ));
    if (lobby.use_chips) {
      await supabase.from("poker_players").update({ chips: p.chips + totalPot }).eq("id", p.id);
    }
    await updateLobby({ pot: 0, status: "showdown" });
    toast.success(`${p.name} gewinnt ${totalPot > 0 ? totalPot + " Chips" : "die Hand"}`);
  }

  async function newHand() {
    if (!lobby) return;
    const participants = lobby.use_chips ? seated : players;
    await Promise.all(participants.map((p) =>
      supabase.from("poker_players").update({ current_bet: 0, hole_cards: [], folded: false }).eq("id", p.id)
    ));
    await updateLobby({ status: "lobby", community: [], pot: 0, deck: [] });
  }

  if (!lobby) {
    return (
      <UICard className="p-6 text-center bg-card/80 backdrop-blur">
        <Shuffle className="w-8 h-8 mx-auto mb-2 animate-spin text-primary" />
        Tisch wird erstellt …
      </UICard>
    );
  }

  const inHand = lobby.status !== "lobby";
  const sumBets = seated.reduce((s, p) => s + p.current_bet, 0);
  const buttonPlayer = seated.find((p) => p.seat === lobby.button_seat);
  const seats = seated.map((p) => p.seat);
  const btnIdx = seats.indexOf(lobby.button_seat);
  const sbSeat = btnIdx >= 0 && seats.length >= 2 ? seats[(btnIdx + 1) % seats.length] : -1;
  const bbSeat = btnIdx >= 0 && seats.length >= 2 ? seats[(btnIdx + 2) % seats.length] : -1;

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await tableRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      toast.error("Vollbild nicht verfügbar");
    }
  }

  return (
    <div ref={tableRef} className={isFullscreen ? "min-h-screen bg-background overflow-auto p-4 space-y-4" : "space-y-4"}>
      {/* Header */}
      <UICard className="p-4 bg-card/80 backdrop-blur flex items-center justify-between flex-wrap gap-2">
        <button
          onClick={() => {
            navigator.clipboard?.writeText(lobby.code).catch(() => undefined);
            toast.success("Code kopiert");
          }}
          className="flex items-center gap-2 hover:opacity-80"
        >
          <span className="text-xs text-muted-foreground">Tisch-Code</span>
          <span className="font-display tracking-[0.4em] text-2xl">{lobby.code}</span>
          <Copy className="w-3 h-3 opacity-60" />
        </button>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Users className="w-3 h-3" /> {players.length}
          </Badge>
          {lobby.hand_number > 0 && <Badge variant="outline">Hand #{lobby.hand_number}</Badge>}
          <Button onClick={toggleFullscreen} size="sm" variant="ghost" className="gap-1" title="Vollbild">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button onClick={closeTable} size="sm" variant="ghost" className="gap-1">
            <LogOut className="w-4 h-4" /> Tisch schließen
          </Button>
        </div>
      </UICard>


      {/* Settings (lobby phase) */}
      {!inHand && (
        <UICard className="p-4 bg-card/80 backdrop-blur space-y-4">
          <h3 className="font-display tracking-wider">Tisch-Einstellungen</h3>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Mit Chips spielen</Label>
              <p className="text-xs text-muted-foreground">
                {lobby.use_chips ? "Virtuelle Chips & Pot" : "Nur Karten – Chips real am Tisch"}
              </p>
            </div>
            <Switch checked={lobby.use_chips} onCheckedChange={(v) => updateLobby({ use_chips: v })} />
          </div>
          {lobby.use_chips && (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs">Start-Chips</Label>
                <Input
                  type="number" min={10} step={50}
                  value={lobby.starting_chips}
                  onChange={(e) => updateLobby({ starting_chips: Math.max(10, Number(e.target.value) || 0) })}
                />
              </div>
              <div>
                <Label className="text-xs">Small Blind</Label>
                <Input
                  type="number" min={1}
                  value={lobby.small_blind}
                  onChange={(e) => updateLobby({ small_blind: Math.max(1, Number(e.target.value) || 0) })}
                />
              </div>
              <div>
                <Label className="text-xs">Big Blind</Label>
                <Input
                  type="number" min={2}
                  value={lobby.big_blind}
                  onChange={(e) => updateLobby({ big_blind: Math.max(2, Number(e.target.value) || 0) })}
                />
              </div>
            </div>
          )}
        </UICard>
      )}

      {/* Seat assignment / player list (lobby phase) */}
      {!inHand && (
        <UICard className="p-4 bg-card/80 backdrop-blur space-y-3">
          <h3 className="font-display tracking-wider">Spieler{lobby.use_chips ? " & Sitze" : ""}</h3>
          {players.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Spieler treten über den Code <strong>{lobby.code}</strong> bei.
            </p>
          )}
          {players.map((p) => (
            <div key={p.id} className="flex items-center gap-2">
              <div className="flex-1 truncate">
                <span className="font-medium">{p.name}</span>
                {lobby.use_chips && (
                  <span className="text-xs text-muted-foreground ml-2">
                    {p.chips > 0 ? `${p.chips} Chips` : `Startet mit ${lobby.starting_chips}`}
                  </span>
                )}
              </div>
              {lobby.use_chips && (
                <select
                  value={p.seat}
                  onChange={(e) => assignSeat(p.id, Number(e.target.value))}
                  className="bg-background border border-border rounded px-2 py-1 text-sm"
                >
                  <option value={0}>Kein Sitz</option>
                  {Array.from({ length: MAX_SEATS }, (_, i) => i + 1).map((s) => (
                    <option key={s} value={s}>Sitz {s}</option>
                  ))}
                </select>
              )}
              <Button size="icon" variant="ghost" onClick={() => kickPlayer(p.id)} title="Entfernen">
                ✕
              </Button>
            </div>
          ))}
          {lobby.use_chips && players.some((p) => p.chips === 0) && (
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={async () => {
                await Promise.all(players.filter((p) => p.chips === 0).map((p) =>
                  supabase.from("poker_players").update({ chips: lobby.starting_chips }).eq("id", p.id)
                ));
              }}
            >
              <Coins className="w-4 h-4 mr-2" /> Start-Chips verteilen
            </Button>
          )}
          <Button
            onClick={dealHand}
            size="lg"
            className="w-full"
            disabled={(lobby.use_chips ? seated.length : players.length) < 2}
          >
            <Play className="w-4 h-4 mr-2" /> Hand austeilen
          </Button>
        </UICard>
      )}

      {/* TABLE (in hand) */}
      {inHand && (
        <UICard className="p-3 md:p-6 bg-gradient-to-br from-stone-900 via-stone-950 to-black border-amber-900/40 relative overflow-hidden">
          {/* Oval felt table */}
          <div
            className={`relative w-full ${
              isFullscreen
                ? lobby.use_chips ? "h-[78vh]" : "h-[88vh]"
                : lobby.use_chips ? "aspect-[16/10] min-h-[460px]" : "aspect-[16/9] min-h-[520px]"
            }`}
          >
            {/* Outer rail (wood) */}
            <div className="absolute inset-0 rounded-[50%] bg-gradient-to-br from-amber-900 via-amber-950 to-stone-900 shadow-2xl" />
            {/* Felt */}
            <div className="absolute inset-[3%] rounded-[50%] bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 shadow-inner ring-1 ring-amber-800/40">
              <div className="absolute inset-0 rounded-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.25),_transparent_60%)] pointer-events-none" />
            </div>

            {/* Center: pot + deck + community */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 md:gap-4 pointer-events-none">
              {lobby.use_chips && (
                <div className="text-center">
                  <div className="text-[10px] md:text-xs uppercase tracking-widest text-emerald-200/70">Pot</div>
                  <div className="font-display text-2xl md:text-4xl text-amber-300 drop-shadow">{lobby.pot}</div>
                  {sumBets > 0 && (
                    <div className="text-[10px] md:text-xs text-emerald-200/60">+ {sumBets} im Zug</div>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2 md:gap-4">
                {/* Deck stack */}
                {(() => {
                  const deckSize = !lobby.use_chips ? "xl" : isFullscreen ? "md" : "sm";
                  const deckBox = deckSize === "xl"
                    ? "w-28 h-40 mr-3 md:mr-4"
                    : "w-10 h-14 md:w-14 md:h-20 mr-1 md:mr-2";
                  return (
                    <div className={`relative ${deckBox}`}>
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="absolute" style={{ top: -i * 2, left: -i * 2 }}>
                          <PlayingCard faceDown size={deckSize} delay={0} />
                        </div>
                      ))}
                    </div>
                  );
                })()}
                {/* Community */}
                <div className="flex gap-1 md:gap-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const c = lobby.community[i];
                    const sz = !lobby.use_chips ? "xl" : isFullscreen ? "lg" : "md";
                    const placeholder =
                      sz === "xl" ? "w-28 h-40" : sz === "lg" ? "w-20 h-28" : "w-14 h-20";
                    if (c) return <PlayingCard key={i} card={c} size={sz} delay={i * 120} />;
                    return (
                      <div
                        key={i}
                        className={`${placeholder} rounded-md border border-dashed border-emerald-600/40`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Seats arranged around the table (chips mode only) */}
            {lobby.use_chips && seated.map((p, idx) => {
              const N = seated.length;
              // start at bottom (player POV), distribute around oval
              const angle = Math.PI / 2 + (idx * 2 * Math.PI) / N;
              const rx = 48; // % from center horizontally
              const ry = 46; // % from center vertically
              const x = 50 + rx * Math.cos(angle);
              const y = 50 + ry * Math.sin(angle);
              // chip stack position: pull toward center
              const cx = 50 + (rx - 18) * Math.cos(angle);
              const cy = 50 + (ry - 18) * Math.sin(angle);

              const isButton = p.seat === lobby.button_seat;
              const isSB = p.seat === sbSeat;
              const isBB = p.seat === bbSeat;
              const showCards = lobby.status === "showdown" && showdownReveal;

              return (
                <div key={p.id}>
                  {/* Player pod */}
                  <div
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl p-2 border-2 transition w-[110px] md:w-[140px] z-10 ${
                      p.folded
                        ? "border-stone-700/40 bg-black/60 opacity-50"
                        : "border-amber-700/50 bg-black/70 shadow-lg"
                    }`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {/* Cards above name */}
                    <div className="flex gap-1 justify-center mb-1 min-h-[2.75rem] md:min-h-[3.5rem]">
                      {p.hole_cards.length === 0 ? (
                        <div className="text-[10px] text-emerald-300/40 italic self-center">wartet …</div>
                      ) : (
                        p.hole_cards.map((c, i) => (
                          <PlayingCard
                            key={i}
                            card={c}
                            faceDown={!showCards}
                            size="xs"
                            delay={i * 100}
                          />
                        ))
                      )}
                    </div>
                    <div className="text-center truncate text-xs md:text-sm font-medium text-emerald-50">
                      {p.name}
                    </div>
                    <div className="text-center text-[10px] md:text-xs text-amber-200/80">
                      <Coins className="w-2.5 h-2.5 inline mr-0.5" />{p.chips}
                    </div>

                    {/* Dealer / blind badges */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {isButton && (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-[10px] font-bold shadow ring-1 ring-amber-400">
                          D
                        </span>
                      )}
                      {isSB && (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sky-500 text-white text-[9px] font-bold shadow ring-1 ring-sky-200">
                          SB
                        </span>
                      )}
                      {isBB && (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-500 text-white text-[9px] font-bold shadow ring-1 ring-rose-200">
                          BB
                        </span>
                      )}
                    </div>

                    {!p.folded && lobby.status !== "showdown" && (
                      <button
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-stone-800 text-stone-300 text-[10px] border border-stone-600 hover:bg-destructive hover:text-white"
                        title="Fold"
                        onClick={() => supabase.from("poker_players").update({ folded: true }).eq("id", p.id)}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Chip bet near the table center */}
                  {p.current_bet > 0 && (
                    <div
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 px-2 py-0.5 rounded-full bg-amber-500 text-black text-[10px] md:text-xs font-bold shadow-md ring-2 ring-amber-300/70"
                      style={{ left: `${cx}%`, top: `${cy}%` }}
                    >
                      {p.current_bet}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action bar */}
          <div className="relative mt-5 grid grid-cols-2 md:grid-cols-4 gap-2">
            {lobby.status === "preflop" && (
              <Button onClick={() => dealStreet("flop")} className="col-span-2 md:col-span-1">Flop</Button>
            )}
            {lobby.status === "flop" && (
              <Button onClick={() => dealStreet("turn")} className="col-span-2 md:col-span-1">Turn</Button>
            )}
            {lobby.status === "turn" && (
              <Button onClick={() => dealStreet("river")} className="col-span-2 md:col-span-1">River</Button>
            )}
            {lobby.use_chips && (lobby.status === "preflop" || lobby.status === "flop" || lobby.status === "turn" || lobby.status === "river") && (
              <Button onClick={collectBets} variant="secondary" disabled={sumBets === 0}>
                <Coins className="w-4 h-4 mr-1" /> Einsätze
              </Button>
            )}
            {lobby.use_chips && lobby.status === "river" && (
              <Button onClick={() => updateLobby({ status: "showdown" })} variant="default">
                Showdown
              </Button>
            )}
            {lobby.use_chips && lobby.status === "showdown" && (
              <Button onClick={() => setShowdownReveal((v) => !v)} variant="secondary" className="col-span-2 md:col-span-1">
                <Eye className="w-4 h-4 mr-1" /> {showdownReveal ? "Karten verdecken" : "Karten zeigen"}
              </Button>
            )}
            <Button onClick={newHand} variant="outline" className="col-span-2 md:col-span-1">
              <RotateCw className="w-4 h-4 mr-1" /> Neue Hand
            </Button>
          </div>

          {/* Winner picker (chips mode only) */}
          {lobby.use_chips && (lobby.status === "showdown" || lobby.status === "river") && (
            <div className="relative mt-4">
              <div className="text-xs uppercase tracking-widest text-emerald-300/70 mb-2 text-center">
                <Trophy className="w-3 h-3 inline mr-1" /> Pot zuweisen
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {seated.filter((p) => !p.folded).map((p) => (
                  <Button
                    key={p.id}
                    size="sm"
                    variant="outline"
                    onClick={() => awardPot(p.id)}
                    className="bg-black/40 border-amber-500/40 text-amber-100 hover:bg-amber-500/20"
                  >
                    {p.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {lobby.use_chips && buttonPlayer && (
            <div className="relative text-center text-xs text-emerald-300/60 mt-3">
              <Crown className="w-3 h-3 inline mr-1" /> Dealer: <strong>{buttonPlayer.name}</strong>
            </div>
          )}
        </UICard>
      )}
    </div>
  );
}
