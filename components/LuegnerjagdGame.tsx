import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus, X, Play, RotateCw, ChevronRight, Eye, EyeOff,
  Users, Wifi, WifiOff, Check, AlertCircle, Trophy, Pause
} from "lucide-react";
import { LuegnerjagdOnline } from "@/components/LuegnerjagdOnline";
import {
  LUEGNERJAGD_QUESTIONS,
  LUEGNERJAGD_CATEGORY_LABELS,
  LUEGNERJAGD_CATEGORY_EMOJI,
  type LuegnerjagdCategory,
} from "@/lib/luegnerjagd-questions";
import { supabase } from "@/integrations/supabase/client";
import { playClick } from "@/hooks/use-click-sound";

type Phase =
  | "setup"
  | "mode-select"     // lokal oder online
  | "online-menu"     // lobby erstellen / beitreten
  | "online-lobby"    // warteraum
  | "answering"       // jeder gibt seine Antwort ein (handy reihum / oder online)
  | "reveal"          // antworten aufgedeckt, diskussion
  | "vote"            // abstimmung wer der Lügner ist
  | "round-end"       // Auflösung
  | "game-over"
  | "pause";

interface Player {
  name: string;
  points: number;
  isLiar?: boolean;
}

const ALL_CATS = Object.keys(LUEGNERJAGD_CATEGORY_LABELS) as LuegnerjagdCategory[];

function pickQuestion(usedIds: Set<number>, cats: LuegnerjagdCategory[]) {
  const pool = LUEGNERJAGD_QUESTIONS.filter(
    q => cats.includes(q.category) && !usedIds.has(q.id)
  );
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function LuegnerjagdGame() {
  // ── Setup ──────────────────────────────────────────────────────────────────
  const [playerNames, setPlayerNames] = useState<string[]>(["Anna", "Ben", "Clara", "David"]);
  const [newName, setNewName] = useState("");
  const [cats, setCats] = useState<Set<LuegnerjagdCategory>>(new Set(ALL_CATS));
  const [rounds, setRounds] = useState(5);
  const [sipsWrong, setSipsWrong] = useState(2);   // Schlücke wenn Lügner nicht erkannt
  const [sipsLiar, setSipsLiar] = useState(3);      // Schlücke für erkannten Lügner

  // ── Game state ─────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<Player[]>([]);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [currentQ, setCurrentQ] = useState<typeof LUEGNERJAGD_QUESTIONS[0] | null>(null);
  const [liarIdx, setLiarIdx] = useState(0);
  const [currentAnswerIdx, setCurrentAnswerIdx] = useState(0); // whose turn to type
  const [answers, setAnswers] = useState<string[]>([]);
  const [answerInput, setAnswerInput] = useState("");
  const [voteIdx, setVoteIdx] = useState<number | null>(null);
  const [roundNum, setRoundNum] = useState(1);
  const [pausedFrom, setPausedFrom] = useState<Phase>("answering");
  const [revealLiar, setRevealLiar] = useState(false);

  // ── Online state ───────────────────────────────────────────────────────────
  const [mode, setMode] = useState<"local" | "online">("local");
  const [onlineView, setOnlineView] = useState<"menu" | "create" | "join" | "lobby">("menu");
  const [lobbyCode, setLobbyCode] = useState("");
  const [myName, setMyName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [onlinePlayers, setOnlinePlayers] = useState<string[]>([]);
  const [isHost, setIsHost] = useState(false);

  function addPlayer() {
    const n = newName.trim();
    if (!n || playerNames.includes(n)) return;
    setPlayerNames([...playerNames, n]);
    setNewName("");
  }

  function toggleCat(c: LuegnerjagdCategory) {
    setCats(prev => {
      const n = new Set(prev);
      if (n.has(c) && n.size <= 1) return prev;
      n.has(c) ? n.delete(c) : n.add(c);
      return n;
    });
  }

  function startLocal() {
    const ps: Player[] = playerNames.map(name => ({ name, points: 0 }));
    setPlayers(ps);
    setUsedIds(new Set());
    setRoundNum(1);
    beginRound(ps, new Set());
  }

  function beginRound(ps: Player[], used: Set<number>) {
    const q = pickQuestion(used, [...cats]);
    if (!q) { setPhase("game-over"); return; }
    const li = Math.floor(Math.random() * ps.length);
    const newUsed = new Set([...used, q.id]);
    setCurrentQ(q);
    setLiarIdx(li);
    setUsedIds(newUsed);
    setAnswers(new Array(ps.length).fill(""));
    setCurrentAnswerIdx(0);
    setAnswerInput("");
    setVoteIdx(null);
    setRevealLiar(false);
    setPhase("answering");
    playClick({ type: "soft" });
  }

  function submitAnswer() {
    if (!answerInput.trim()) return;
    const newAnswers = [...answers];
    newAnswers[currentAnswerIdx] = answerInput.trim();
    setAnswers(newAnswers);
    setAnswerInput("");
    if (currentAnswerIdx < players.length - 1) {
      setCurrentAnswerIdx(i => i + 1);
    } else {
      // All answered
      setPhase("reveal");
    }
    playClick({ type: "soft" });
  }

  function vote(idx: number) {
    setVoteIdx(idx);
    playClick({ type: "soft" });
  }

  function confirmVote() {
    if (voteIdx === null) return;
    const correct = voteIdx === liarIdx;
    const newPlayers = players.map((p, i) => {
      if (correct && i !== liarIdx) return { ...p, points: p.points + 1 };
      if (!correct && i === liarIdx) return { ...p, points: p.points + 2 }; // liar escaped
      return p;
    });
    setPlayers(newPlayers);
    setRevealLiar(true);
    setPhase("round-end");
    playClick({ type: "soft" });
  }

  function nextRound() {
    if (roundNum >= rounds) { setPhase("game-over"); return; }
    setRoundNum(r => r + 1);
    beginRound(players, usedIds);
  }

  // ── Sorted scores ──────────────────────────────────────────────────────────
  const sortedPlayers = [...players].map((p, i) => ({ ...p, idx: i })).sort((a, b) => b.points - a.points);

  // ═══════════════════════════════════════════════════════════════════════════
  // SETUP
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "setup") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div>
        <h2 className="text-xl font-display tracking-wider mb-3">Spieler</h2>
        <div className="flex gap-2 mb-3">
          <Input value={newName} onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addPlayer()} placeholder="Name eingeben" />
          <Button onClick={addPlayer} size="icon" variant="secondary"><Plus className="w-4 h-4" /></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {playerNames.map((p, i) => (
            <Badge key={i} variant="secondary" className="gap-1 py-1.5 px-3">
              {p}
              <button onClick={() => playerNames.length > 3 && setPlayerNames(playerNames.filter((_, x) => x !== i))}
                className="ml-1 opacity-60 hover:opacity-100"><X className="w-3 h-3" /></button>
            </Badge>
          ))}
        </div>
        {playerNames.length < 3 && <p className="text-xs text-muted-foreground mt-1">Mind. 3 Spieler nötig.</p>}
      </div>

      <div>
        <h2 className="text-xl font-display tracking-wider mb-3">Kategorien</h2>
        <div className="grid grid-cols-2 gap-2">
          {ALL_CATS.map(c => {
            const on = cats.has(c);
            return (
              <button key={c} onClick={() => toggleCat(c)}
                className={`p-2.5 rounded-xl border-2 text-left transition-all flex items-center gap-2 text-sm ${on ? "border-primary bg-primary/15" : "border-border bg-muted/30 opacity-60"}`}>
                <span>{LUEGNERJAGD_CATEGORY_EMOJI[c]}</span>
                <span className="font-medium">{LUEGNERJAGD_CATEGORY_LABELS[c]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-display tracking-wider">Einstellungen</h2>
        {[
          ["Runden", rounds, setRounds, 1, 20],
          ["Schlücke – Lügner erkannt", sipsLiar, setSipsLiar, 0, 10],
          ["Schlücke – Lügner entkommen", sipsWrong, setSipsWrong, 0, 10],
        ].map(([label, val, setter, min, max]) => (
          <div key={label as string} className="flex items-center justify-between bg-secondary/50 rounded-xl px-4 py-2.5">
            <span className="text-sm font-medium">{label as string}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => (setter as any)(Math.max(min as number, (val as number) - 1))}
                className="w-7 h-7 rounded-lg bg-secondary font-bold flex items-center justify-center">−</button>
              <span className="font-display text-lg w-6 text-center">{val as number}</span>
              <button onClick={() => (setter as any)(Math.min(max as number, (val as number) + 1))}
                className="w-7 h-7 rounded-lg bg-secondary font-bold flex items-center justify-center">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={() => { setMode("local"); startLocal(); }} disabled={playerNames.length < 3 || cats.size === 0} size="lg">
          <WifiOff className="w-4 h-4 mr-2" /> Lokal spielen
        </Button>
        <Button onClick={() => { setMode("online"); setPhase("online-menu"); }} variant="outline" disabled={cats.size === 0} size="lg">
          <Wifi className="w-4 h-4 mr-2" /> Online-Lobby
        </Button>
      </div>
    </Card>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // ONLINE MENU
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "online-menu") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setPhase("setup")}><X className="w-4 h-4" /></Button>
        <h2 className="text-xl font-display tracking-wider">Online-Lobby</h2>
      </div>

      {onlineView === "menu" && (
        <div className="space-y-3">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center space-y-2">
            <Users className="w-8 h-8 mx-auto text-primary" />
            <p className="text-sm font-medium">Jeder Spieler am eigenen Handy.<br/>Antworten werden gleichzeitig eingegeben.</p>
          </div>
          <Button onClick={() => setOnlineView("create")} className="w-full" size="lg">+ Lobby erstellen</Button>
          <Button onClick={() => setOnlineView("join")} variant="outline" className="w-full" size="lg">Code eingeben & beitreten</Button>
        </div>
      )}

      {onlineView === "create" && (
        <div className="space-y-4">
          <button onClick={() => setOnlineView("menu")} className="text-xs text-muted-foreground">← Zurück</button>
          <Input value={myName} onChange={e => setMyName(e.target.value)} placeholder="Dein Name" />
          <Button onClick={() => {
            if (!myName.trim()) return;
            const code = Math.random().toString(36).substring(2, 6).toUpperCase();
            setLobbyCode(code);
            setIsHost(true);
            setOnlinePlayers([myName.trim()]);
            setOnlineView("lobby");
          }} disabled={!myName.trim()} className="w-full" size="lg">Lobby erstellen 🚀</Button>
        </div>
      )}

      {onlineView === "join" && (
        <div className="space-y-4">
          <button onClick={() => setOnlineView("menu")} className="text-xs text-muted-foreground">← Zurück</button>
          <Input value={myName} onChange={e => setMyName(e.target.value)} placeholder="Dein Name" />
          <Input value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())}
            placeholder="Lobby-Code (z.B. X4K2)" style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 900, fontSize: 18, textAlign: "center" }} />
          <Button onClick={() => {
            if (!myName.trim() || !joinCode.trim()) return;
            setLobbyCode(joinCode);
            setIsHost(false);
            setOnlinePlayers([myName.trim()]);
            setOnlineView("lobby");
          }} disabled={!myName.trim() || !joinCode.trim()} className="w-full" size="lg">Beitreten 📲</Button>
        </div>
      )}

      {onlineView === "lobby" && (
        <div className="space-y-4">
          <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Lobby-Code</p>
            <p className="text-3xl font-display tracking-widest">{lobbyCode}</p>
            <p className="text-xs text-muted-foreground mt-1">Teile diesen Code mit Mitspielern</p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-3 space-y-1.5">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Spieler ({onlinePlayers.length})</p>
            {onlinePlayers.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium">
                {i === 0 && isHost && <Trophy className="w-3 h-3 text-yellow-500" />}
                {p}
              </div>
            ))}
            <p className="text-xs text-muted-foreground italic">Warte auf weitere Spieler…</p>
          </div>
          {isHost && (
            <Button onClick={() => {
              const ps: Player[] = onlinePlayers.map(name => ({ name, points: 0 }));
              setPlayers(ps);
              setPlayerNames(onlinePlayers);
              setUsedIds(new Set());
              setRoundNum(1);
              beginRound(ps, new Set());
            }} disabled={onlinePlayers.length < 3} className="w-full" size="lg">
              <Play className="w-4 h-4 mr-2" /> Spiel starten
            </Button>
          )}
        </div>
      )}
    </Card>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // PAUSE
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "pause") return (
    <Card className="p-6 bg-card/80 backdrop-blur space-y-5 text-center animate-scale-in">
      <div className="py-3">
        <Pause className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
        <h2 className="text-2xl font-display tracking-wider">Pause</h2>
        <p className="text-sm text-muted-foreground mt-1">Runde {roundNum} / {rounds}</p>
      </div>
      <div className="space-y-1.5">
        {sortedPlayers.map((p, i) => (
          <div key={p.idx} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2">
            <span className="font-medium">#{i + 1} {p.name}</span>
            <span className="font-display text-xl">{p.points} P.</span>
          </div>
        ))}
      </div>
      <div className="grid gap-2">
        <Button onClick={() => setPhase(pausedFrom)} size="lg"><Play className="w-4 h-4 mr-2" />Weiterspielen</Button>
        <Button onClick={() => setPhase("setup")} variant="outline"><RotateCw className="w-4 h-4 mr-1" />Setup</Button>
      </div>
    </Card>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // ANSWERING – Handy wird reihum gegeben
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "answering") {
    const currentPlayer = players[currentAnswerIdx];
    const isLiar = currentAnswerIdx === liarIdx;
    const question = isLiar ? currentQ?.liar : currentQ?.majority;
    return (
      <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
        <div className="flex items-center justify-between">
          <Badge variant="outline">Runde {roundNum} / {rounds}</Badge>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {LUEGNERJAGD_CATEGORY_EMOJI[currentQ?.category ?? "filme"]} {LUEGNERJAGD_CATEGORY_LABELS[currentQ?.category ?? "filme"]}
            </Badge>
            <button onClick={() => { setPausedFrom("answering"); setPhase("pause"); }} className="text-muted-foreground hover:text-foreground">
              <Pause className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-primary/15 border-2 border-primary/30 rounded-xl px-4 py-3 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            {currentAnswerIdx + 1} / {players.length}
          </p>
          <p className="text-xl font-display tracking-wider">{currentPlayer?.name}</p>
          <p className="text-xs text-muted-foreground mt-1">Lies die Frage alleine – niemand darf mitlesen!</p>
        </div>

        <div className="bg-secondary/60 rounded-xl p-4">
          <p className="text-base font-medium leading-relaxed">{question}</p>
        </div>

        <div className="space-y-2">
          <Input
            value={answerInput}
            onChange={e => setAnswerInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submitAnswer()}
            placeholder="Deine Antwort…"
            autoFocus
          />
          <Button onClick={submitAnswer} disabled={!answerInput.trim()} className="w-full" size="lg">
            Antwort abgeben <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="flex justify-center gap-1.5">
          {players.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < currentAnswerIdx ? "bg-primary" : i === currentAnswerIdx ? "bg-primary/60 ring-2 ring-primary/30" : "bg-muted"}`} />
          ))}
        </div>
      </Card>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // REVEAL – Antworten anzeigen, diskutieren
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "reveal") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display tracking-wider">Antworten</h2>
        <Badge variant="outline">Runde {roundNum}</Badge>
      </div>

      <div className="bg-secondary/50 rounded-xl p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Die Frage der Mehrheit</p>
        <p className="text-sm font-medium">{currentQ?.majority}</p>
      </div>

      <div className="space-y-2">
        {players.map((p, i) => (
          <div key={i} className="flex items-start gap-3 bg-secondary/30 rounded-xl px-4 py-3">
            <span className="font-medium text-sm w-20 shrink-0 pt-0.5">{p.name}</span>
            <span className="text-sm text-foreground/80 italic">„{answers[i] || "–"}"</span>
          </div>
        ))}
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
        <p className="text-sm font-medium">💬 Diskutiert! Wer hat anders geantwortet – und warum?</p>
      </div>

      <Button onClick={() => setPhase("vote")} className="w-full" size="lg">
        Abstimmen <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </Card>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // VOTE
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "vote") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <h2 className="text-xl font-display tracking-wider">Wer ist der Lügner?</h2>
      <p className="text-sm text-muted-foreground">Wählt gemeinsam die Person, die eine andere Frage hatte.</p>

      <div className="space-y-2">
        {players.map((p, i) => (
          <button key={i} onClick={() => vote(i)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${voteIdx === i ? "border-primary bg-primary/15" : "border-border bg-secondary/30 hover:bg-secondary/60"}`}>
            <span className="font-medium">{p.name}</span>
            {voteIdx === i && <Check className="w-5 h-5 text-primary" />}
          </button>
        ))}
      </div>

      <Button onClick={confirmVote} disabled={voteIdx === null} className="w-full" size="lg">
        Auflösen <Eye className="w-4 h-4 ml-1" />
      </Button>
    </Card>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND END
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "round-end") {
    const guessedRight = voteIdx === liarIdx;
    return (
      <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
        <div className="text-center py-2">
          {guessedRight ? (
            <>
              <Trophy className="w-10 h-10 mx-auto mb-2 text-yellow-500" />
              <h2 className="text-2xl font-display tracking-wider">Lügner entlarvt!</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {players[liarIdx]?.name} hatte die andere Frage. Alle anderen: +1 Punkt.<br />
                {players[liarIdx]?.name} trinkt {sipsLiar} Schlücke! 🍺
              </p>
            </>
          ) : (
            <>
              <AlertCircle className="w-10 h-10 mx-auto mb-2 text-destructive" />
              <h2 className="text-2xl font-display tracking-wider">Lügner entkommen!</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {players[liarIdx]?.name} hatte die andere Frage – niemand hat's gemerkt! +2 Punkte.<br />
                Alle anderen trinken {sipsWrong} Schlücke! 🍺
              </p>
            </>
          )}
        </div>

        {/* Liar's question revealed */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Die Lügner-Frage war</p>
          <p className="text-sm font-medium text-destructive">{currentQ?.liar}</p>
          <p className="text-xs text-muted-foreground">Antwort von {players[liarIdx]?.name}: „{answers[liarIdx]}"</p>
        </div>

        {/* Scoreboard */}
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Punktestand</p>
          {sortedPlayers.map((p, rank) => (
            <div key={p.idx} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2">
              <span className="font-medium flex items-center gap-2">
                {rank === 0 ? "🥇" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : `#${rank + 1}`}
                {p.name}
                {p.idx === liarIdx && <Badge variant="outline" className="text-xs">Lügner</Badge>}
              </span>
              <span className="font-display text-xl">{p.points}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => setPhase("setup")}><RotateCw className="w-4 h-4 mr-1" />Setup</Button>
          <Button onClick={nextRound} size="lg">
            {roundNum >= rounds ? "Ergebnis" : "Nächste Runde"} <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </Card>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GAME OVER
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "game-over") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="text-center py-2">
        <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
        <h2 className="text-2xl font-display tracking-wider">Spiel beendet!</h2>
      </div>
      <div className="space-y-2">
        {sortedPlayers.map((p, rank) => (
          <div key={p.idx} className={`flex items-center justify-between rounded-xl px-4 py-3 ${rank === 0 ? "bg-yellow-500/20 border-2 border-yellow-500/30" : "bg-secondary/50"}`}>
            <span className="font-medium flex items-center gap-2">
              {rank === 0 ? "🥇" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : `#${rank + 1}`}
              {p.name}
            </span>
            <span className="font-display text-2xl">{p.points}</span>
          </div>
        ))}
      </div>
      <Button onClick={() => setPhase("setup")} className="w-full" size="lg">
        <RotateCw className="w-4 h-4 mr-2" />Neues Spiel
      </Button>
    </Card>
  );

  return null;
}
