import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  LUEGNERJAGD_QUESTIONS,
  LUEGNERJAGD_CATEGORY_LABELS,
  LUEGNERJAGD_CATEGORY_EMOJI,
  type LuegnerjagdCategory,
} from "@/lib/luegnerjagd-questions";
import {
  Copy, Crown, LogOut, Play, Users, Check, Eye,
  AlertCircle, Trophy, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

// ── Types ──────────────────────────────────────────────────────────────────
type LobbyStatus = "waiting" | "answering" | "reveal" | "vote" | "round_end" | "finished";

interface Lobby {
  id: string;
  code: string;
  status: LobbyStatus;
  categories: string[];
  rounds: number;
  sips_liar: number;
  sips_wrong: number;
  current_question_id: number | null;
  liar_player_id: string | null;
  round_number: number;
  host_player_id: string | null;
}

interface Player {
  id: string;
  lobby_id: string;
  name: string;
  points: number;
  answer: string | null;
  has_answered: boolean;
  is_host: boolean;
  joined_at: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function genCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let c = "";
  for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return c;
}

function pidKey(code: string) { return `luegnerjagd_pid_${code}`; }

// ── Component ──────────────────────────────────────────────────────────────
export function LuegnerjagdOnline({
  cats, rounds, sipsLiar, sipsWrong, onExit,
}: {
  cats: LuegnerjagdCategory[];
  rounds: number;
  sipsLiar: number;
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
  const [answerInput, setAnswerInput] = useState("");
  const [voteTarget, setVoteTarget] = useState<string | null>(null);

  const me = useMemo(() => players.find(p => p.id === myId) ?? null, [players, myId]);
  const isHost = lobby?.host_player_id === myId;
  const liar = players.find(p => p.id === lobby?.liar_player_id) ?? null;
  const isLiar = myId === lobby?.liar_player_id;
  const currentQ = LUEGNERJAGD_QUESTIONS.find(q => q.id === lobby?.current_question_id) ?? null;

  // ── Realtime ───────────────────────────────────────────────────────────
  const reloadAll = useCallback(async (lobbyId: string) => {
    const [{ data: l }, { data: ps }] = await Promise.all([
      supabase.from("luegnerjagd_lobbies").select("*").eq("id", lobbyId).maybeSingle(),
      supabase.from("luegnerjagd_players").select("*").eq("lobby_id", lobbyId).order("joined_at"),
    ]);
    if (l) setLobby(l as Lobby);
    if (ps) setPlayers(ps as Player[]);
  }, []);

  useEffect(() => {
    if (!lobby?.id) return;
    const ch = supabase
      .channel(`luegnerjagd:${lobby.id}`)
      .on("postgres_changes",
        { event: "*", schema: "public", table: "luegnerjagd_lobbies", filter: `id=eq.${lobby.id}` },
        (payload) => {
          if (payload.eventType === "DELETE") { toast("Lobby geschlossen."); onExit(); }
          else if (payload.new) setLobby(payload.new as Lobby);
        })
      .on("postgres_changes",
        { event: "*", schema: "public", table: "luegnerjagd_players", filter: `lobby_id=eq.${lobby.id}` },
        () => reloadAll(lobby.id))
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [lobby?.id, reloadAll, onExit]);

  // Clear answer input when status changes to answering
  useEffect(() => {
    if (lobby?.status === "answering") setAnswerInput("");
  }, [lobby?.status, lobby?.round_number]);

  // ── Create lobby ───────────────────────────────────────────────────────
  async function createLobby() {
    if (!name.trim()) return;
    setBusy(true);
    try {
      const code = genCode();
      const { data: l, error: le } = await supabase
        .from("luegnerjagd_lobbies")
        .insert({ code, categories: cats, rounds, sips_liar: sipsLiar, sips_wrong: sipsWrong })
        .select().single();
      if (le || !l) throw le;

      const { data: p, error: pe } = await supabase
        .from("luegnerjagd_players")
        .insert({ lobby_id: l.id, name: name.trim(), is_host: true })
        .select().single();
      if (pe || !p) throw pe;

      await supabase.from("luegnerjagd_lobbies").update({ host_player_id: p.id }).eq("id", l.id);
      localStorage.setItem(pidKey(code), p.id);
      setMyId(p.id);
      setLobby({ ...l, host_player_id: p.id } as Lobby);
      setPlayers([p as Player]);
    } catch (e) {
      toast.error("Lobby konnte nicht erstellt werden.");
    } finally { setBusy(false); }
  }

  // ── Join lobby ─────────────────────────────────────────────────────────
  async function joinLobby() {
    if (!name.trim() || !joinCode.trim()) return;
    setBusy(true);
    try {
      const code = joinCode.trim().toUpperCase();
      const saved = localStorage.getItem(pidKey(code));

      const { data: l } = await supabase.from("luegnerjagd_lobbies").select("*").eq("code", code).maybeSingle();
      if (!l) { toast.error("Lobby nicht gefunden."); setBusy(false); return; }

      if (saved) {
        const { data: existing } = await supabase.from("luegnerjagd_players").select("*").eq("id", saved).maybeSingle();
        if (existing) {
          setMyId(saved);
          await reloadAll(l.id);
          setLobby(l as Lobby);
          setBusy(false);
          return;
        }
      }

      const { data: p, error } = await supabase
        .from("luegnerjagd_players")
        .insert({ lobby_id: l.id, name: name.trim() })
        .select().single();
      if (error || !p) throw error;

      localStorage.setItem(pidKey(code), p.id);
      setMyId(p.id);
      await reloadAll(l.id);
      setLobby(l as Lobby);
    } catch {
      toast.error("Beitreten fehlgeschlagen.");
    } finally { setBusy(false); }
  }

  // ── Host: Start round ──────────────────────────────────────────────────
  async function startRound() {
    if (!lobby || !isHost) return;
    // Pick unused question
    const usedReq = await supabase.from("luegnerjagd_lobbies").select("current_question_id").eq("id", lobby.id).maybeSingle();
    const pool = LUEGNERJAGD_QUESTIONS.filter(q => (lobby.categories as LuegnerjagdCategory[]).includes(q.category));
    const q = pool[Math.floor(Math.random() * pool.length)];

    // Pick random liar
    const liarIdx = Math.floor(Math.random() * players.length);
    const liarId = players[liarIdx].id;

    // Reset all answers
    await Promise.all(players.map(p =>
      supabase.from("luegnerjagd_players").update({ answer: null, has_answered: false }).eq("id", p.id)
    ));

    await supabase.from("luegnerjagd_lobbies").update({
      status: "answering",
      current_question_id: q.id,
      liar_player_id: liarId,
    }).eq("id", lobby.id);
  }

  // ── Submit answer ──────────────────────────────────────────────────────
  async function submitAnswer() {
    if (!answerInput.trim() || !myId) return;
    await supabase.from("luegnerjagd_players").update({
      answer: answerInput.trim(),
      has_answered: true,
    }).eq("id", myId);
    setAnswerInput("");
  }

  // ── Host: Move to reveal (when all answered) ───────────────────────────
  async function moveToReveal() {
    if (!lobby || !isHost) return;
    await supabase.from("luegnerjagd_lobbies").update({ status: "reveal" }).eq("id", lobby.id);
  }

  // ── Host: Move to vote ─────────────────────────────────────────────────
  async function moveToVote() {
    if (!lobby || !isHost) return;
    await supabase.from("luegnerjagd_lobbies").update({ status: "vote" }).eq("id", lobby.id);
  }

  // ── Submit vote (host confirms after group decision) ───────────────────
  async function confirmVote() {
    if (!lobby || !isHost || !voteTarget) return;
    const correct = voteTarget === lobby.liar_player_id;
    // Award points
    const updates = players.map(p => {
      let pts = p.points;
      if (correct && p.id !== lobby.liar_player_id) pts += 1;
      if (!correct && p.id === lobby.liar_player_id) pts += 2;
      return supabase.from("luegnerjagd_players").update({ points: pts }).eq("id", p.id);
    });
    await Promise.all(updates);
    await supabase.from("luegnerjagd_lobbies").update({ status: "round_end" }).eq("id", lobby.id);
  }

  // ── Next round / finish ────────────────────────────────────────────────
  async function nextRound() {
    if (!lobby || !isHost) return;
    if (lobby.round_number >= lobby.rounds) {
      await supabase.from("luegnerjagd_lobbies").update({ status: "finished" }).eq("id", lobby.id);
    } else {
      await supabase.from("luegnerjagd_lobbies").update({
        round_number: lobby.round_number + 1,
        status: "waiting",
      }).eq("id", lobby.id);
    }
  }

  async function leaveLobby() {
    if (!myId) return;
    await supabase.from("luegnerjagd_players").delete().eq("id", myId);
    if (isHost && lobby) await supabase.from("luegnerjagd_lobbies").delete().eq("id", lobby.id);
    onExit();
  }

  const allAnswered = players.length > 0 && players.every(p => p.has_answered);
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  // ════════════════════════════════════════════════════════════════════════
  // VIEWS
  // ════════════════════════════════════════════════════════════════════════

  // ── Menu ────────────────────────────────────────────────────────────────
  if (!lobby) return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onExit}><LogOut className="w-4 h-4" /></Button>
        <h2 className="text-xl font-display tracking-wider">Online-Lobby</h2>
      </div>

      {view === "menu" && (
        <div className="space-y-3">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
            <Users className="w-8 h-8 mx-auto text-primary mb-2" />
            <p className="text-sm font-medium">Jeder am eigenen Handy.<br />Antworten werden gleichzeitig eingegeben.</p>
          </div>
          <Button onClick={() => setView("create")} className="w-full" size="lg">+ Lobby erstellen</Button>
          <Button onClick={() => setView("join")} variant="outline" className="w-full" size="lg">Code eingeben & beitreten</Button>
        </div>
      )}

      {view === "create" && (
        <div className="space-y-4">
          <button onClick={() => setView("menu")} className="text-xs text-muted-foreground">← Zurück</button>
          <div className="space-y-1"><p className="text-sm font-medium">Dein Name</p>
            <Input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && createLobby()} placeholder="Name eingeben" /></div>
          <Button onClick={createLobby} disabled={!name.trim() || busy} className="w-full" size="lg">
            {busy ? "Erstelle…" : "Lobby erstellen 🚀"}
          </Button>
        </div>
      )}

      {view === "join" && (
        <div className="space-y-4">
          <button onClick={() => setView("menu")} className="text-xs text-muted-foreground">← Zurück</button>
          <div className="space-y-1"><p className="text-sm font-medium">Dein Name</p>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name eingeben" /></div>
          <div className="space-y-1"><p className="text-sm font-medium">Lobby-Code</p>
            <Input value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} placeholder="Z.B. X4K2"
              style={{ textTransform: "uppercase", letterSpacing: "0.25em", fontWeight: 900, fontSize: 20, textAlign: "center" }} /></div>
          <Button onClick={joinLobby} disabled={!name.trim() || !joinCode.trim() || busy} className="w-full" size="lg">
            {busy ? "Verbinde…" : "Beitreten 📲"}
          </Button>
        </div>
      )}
    </Card>
  );

  // ── Waiting room ────────────────────────────────────────────────────────
  if (lobby.status === "waiting") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display tracking-wider">Lobby</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Runde {lobby.round_number} / {lobby.rounds}</Badge>
          <Button variant="ghost" size="icon" onClick={leaveLobby}><LogOut className="w-4 h-4" /></Button>
        </div>
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
        <p className="text-xs text-muted-foreground uppercase tracking-widest">Spieler ({players.length})</p>
        {players.map(p => (
          <div key={p.id} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${p.id === myId ? "bg-primary/15 border border-primary/30" : "bg-secondary/50"}`}>
            {p.is_host && <Crown className="w-3.5 h-3.5 text-yellow-500" />}
            <span className="font-medium">{p.name}</span>
            {p.id === myId && <Badge variant="outline" className="text-xs ml-auto">Du</Badge>}
          </div>
        ))}
        {players.length < 3 && <p className="text-xs text-muted-foreground">Mind. 3 Spieler für den Start.</p>}
      </div>

      {/* Scoreboard after round 1 */}
      {lobby.round_number > 1 && (
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Punktestand</p>
          {sortedPlayers.map((p, i) => (
            <div key={p.id} className="flex items-center justify-between bg-secondary/30 rounded-lg px-4 py-2">
              <span className="font-medium">{["🥇","🥈","🥉"][i] ?? `#${i+1}`} {p.name}</span>
              <span className="font-display text-xl">{p.points}</span>
            </div>
          ))}
        </div>
      )}

      {isHost
        ? <Button onClick={startRound} disabled={players.length < 3} className="w-full" size="lg">
            <Play className="w-4 h-4 mr-2" />Runde starten
          </Button>
        : <p className="text-center text-sm text-muted-foreground">Warte auf den Host…</p>}
    </Card>
  );

  // ── Answering ────────────────────────────────────────────────────────────
  if (lobby.status === "answering") {
    const question = isLiar ? currentQ?.liar : currentQ?.majority;
    return (
      <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
        <div className="flex items-center justify-between">
          <Badge variant="outline">Runde {lobby.round_number} / {lobby.rounds}</Badge>
          <Badge variant="outline">
            {LUEGNERJAGD_CATEGORY_EMOJI[currentQ?.category ?? "filme"]}
            {LUEGNERJAGD_CATEGORY_LABELS[currentQ?.category ?? "filme"]}
          </Badge>
        </div>

        {!me?.has_answered ? (
          <>
            <div className="bg-primary/15 border-2 border-primary/30 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Deine Frage</p>
              <p className="text-xs text-muted-foreground mb-2">Lies sie allein – niemand darf mitlesen!</p>
            </div>
            <div className="bg-secondary/60 rounded-xl p-4">
              <p className="font-medium leading-relaxed">{question}</p>
            </div>
            <div className="space-y-2">
              <Input value={answerInput} onChange={e => setAnswerInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submitAnswer()}
                placeholder="Deine Antwort…" autoFocus />
              <Button onClick={submitAnswer} disabled={!answerInput.trim()} className="w-full" size="lg">
                Antwort abgeben <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <Check className="w-12 h-12 mx-auto text-green-500" />
            <p className="text-lg font-display">Antwort abgegeben!</p>
            <p className="text-sm text-muted-foreground">Warte auf die anderen…</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {players.map(p => (
                <Badge key={p.id} variant={p.has_answered ? "default" : "outline"} className="text-xs">
                  {p.has_answered ? "✓" : "…"} {p.name}
                </Badge>
              ))}
            </div>
            {isHost && allAnswered && (
              <Button onClick={moveToReveal} className="w-full" size="lg">Antworten aufdecken <Eye className="w-4 h-4 ml-1" /></Button>
            )}
          </div>
        )}
      </Card>
    );
  }

  // ── Reveal ───────────────────────────────────────────────────────────────
  if (lobby.status === "reveal") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display tracking-wider">Antworten</h2>
        <Badge variant="outline">Runde {lobby.round_number}</Badge>
      </div>
      <div className="bg-secondary/50 rounded-xl p-3">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Frage der Mehrheit</p>
        <p className="text-sm font-medium">{currentQ?.majority}</p>
      </div>
      <div className="space-y-2">
        {players.map(p => (
          <div key={p.id} className="flex items-start gap-3 bg-secondary/30 rounded-xl px-4 py-3">
            <span className="font-medium text-sm w-20 shrink-0">{p.name}</span>
            <span className="text-sm italic text-foreground/80">„{p.answer ?? "–"}"</span>
          </div>
        ))}
      </div>
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
        <p className="text-sm font-medium">💬 Diskutiert! Wer hat anders geantwortet?</p>
      </div>
      {isHost
        ? <Button onClick={moveToVote} className="w-full" size="lg">Zur Abstimmung <ChevronRight className="w-4 h-4 ml-1" /></Button>
        : <p className="text-center text-sm text-muted-foreground">Host leitet zur Abstimmung weiter…</p>}
    </Card>
  );

  // ── Vote ─────────────────────────────────────────────────────────────────
  if (lobby.status === "vote") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <h2 className="text-xl font-display tracking-wider">Wer ist der Lügner?</h2>
      <p className="text-sm text-muted-foreground">Diskutiert und wählt gemeinsam. Der Host bestätigt.</p>
      <div className="space-y-2">
        {players.map(p => (
          <button key={p.id} onClick={() => isHost && setVoteTarget(p.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${voteTarget === p.id ? "border-primary bg-primary/15" : "border-border bg-secondary/30"} ${isHost ? "hover:bg-secondary/60 cursor-pointer" : "cursor-default"}`}>
            <span className="font-medium">{p.name}</span>
            {voteTarget === p.id && <Check className="w-5 h-5 text-primary" />}
          </button>
        ))}
      </div>
      {isHost
        ? <Button onClick={confirmVote} disabled={!voteTarget} className="w-full" size="lg">Auflösen <Eye className="w-4 h-4 ml-1" /></Button>
        : <p className="text-center text-sm text-muted-foreground">Host wählt den Verdächtigen…</p>}
    </Card>
  );

  // ── Round end ─────────────────────────────────────────────────────────────
  if (lobby.status === "round_end") {
    const guessed = voteTarget === lobby.liar_player_id;
    return (
      <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
        <div className="text-center py-2">
          {guessed
            ? <><Trophy className="w-10 h-10 mx-auto mb-2 text-yellow-500" /><h2 className="text-2xl font-display">Lügner entlarvt!</h2><p className="text-sm text-muted-foreground mt-1">{liar?.name} muss {lobby.sips_liar} Schlücke trinken 🍺</p></>
            : <><AlertCircle className="w-10 h-10 mx-auto mb-2 text-destructive" /><h2 className="text-2xl font-display">Lügner entkommen!</h2><p className="text-sm text-muted-foreground mt-1">Alle anderen trinken {lobby.sips_wrong} Schlücke 🍺</p></>}
        </div>
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Lügner-Frage ({liar?.name})</p>
          <p className="text-sm font-medium text-destructive">{currentQ?.liar}</p>
          <p className="text-xs text-muted-foreground">Antwort: „{liar?.answer}"</p>
        </div>
        <div className="space-y-1.5">
          {sortedPlayers.map((p, i) => (
            <div key={p.id} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2">
              <span className="font-medium">{["🥇","🥈","🥉"][i] ?? `#${i+1}`} {p.name}
                {p.id === lobby.liar_player_id && <Badge variant="outline" className="text-xs ml-2">Lügner</Badge>}
              </span>
              <span className="font-display text-xl">{p.points}</span>
            </div>
          ))}
        </div>
        {isHost
          ? <Button onClick={nextRound} className="w-full" size="lg">
              {lobby.round_number >= lobby.rounds ? "Ergebnis" : "Nächste Runde"} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          : <p className="text-center text-sm text-muted-foreground">Warte auf den Host…</p>}
      </Card>
    );
  }

  // ── Finished ──────────────────────────────────────────────────────────────
  return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="text-center py-2">
        <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
        <h2 className="text-2xl font-display tracking-wider">Spiel beendet!</h2>
      </div>
      <div className="space-y-2">
        {sortedPlayers.map((p, i) => (
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
