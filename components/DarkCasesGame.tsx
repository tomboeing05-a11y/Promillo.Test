import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus, X, Play, RotateCw, ChevronLeft, ChevronRight,
  Eye, EyeOff, Trophy, Skull, HelpCircle, Check, Pause, Users
} from "lucide-react";
import { DarkCasesOnline } from "@/components/DarkCasesOnline";
import { DARK_CASES, DEFAULT_POINTS, type DarkCaseDifficulty } from "@/lib/dark-cases";
import { playClick } from "@/hooks/use-click-sound";

type Phase = "setup" | "narrator" | "reveal" | "round-end" | "game-over" | "pause";

interface Player {
  name: string;
  points: number;
}

const DIFFICULTY_LABEL: Record<DarkCaseDifficulty, string> = {
  leicht: "Leicht",
  mittel: "Mittel",
  dunkel: "Dunkel 🖤",
};

const DIFFICULTY_COLOR: Record<DarkCaseDifficulty, string> = {
  leicht: "#4FA8FF",
  mittel: "#FFB400",
  dunkel: "#1a1a2e",
};

export function DarkCasesGame() {
  // ── Setup state ────────────────────────────────────────────────────────────
  const [players, setPlayers] = useState<Player[]>([
    { name: "Spieler 1", points: 0 },
    { name: "Spieler 2", points: 0 },
  ]);
  const [newName, setNewName] = useState("");
  const [difficulties, setDifficulties] = useState<DarkCaseDifficulty[]>(["leicht", "mittel"]);
  const [pointsCorrect, setPointsCorrect] = useState(DEFAULT_POINTS.correctGuess);
  const [sipsWrong, setSipsWrong] = useState(1);

  // ── Game state ─────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("setup");
  const [narratorIdx, setNarratorIdx] = useState(0);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [currentStory, setCurrentStory] = useState<(typeof DARK_CASES)[0] | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [noCount, setNoCount] = useState(0);       // Nein-Antworten dieser Runde
  const [yesCount, setYesCount] = useState(0);
  const [lastAnsweredPlayer, setLastAnsweredPlayer] = useState<number | null>(null);
  const [roundWinner, setRoundWinner] = useState<number | null>(null);
  const [pausedFrom, setPausedFrom] = useState<Phase>("narrator");
  const [manageNewName, setManageNewName] = useState("");

  function addPlayer() {
    const n = newName.trim();
    if (!n || players.some(p => p.name === n)) return;
    setPlayers([...players, { name: n, points: 0 }]);
    setNewName("");
  }

  function toggleDifficulty(d: DarkCaseDifficulty) {
    setDifficulties(prev =>
      prev.includes(d) ? (prev.length > 1 ? prev.filter(x => x !== d) : prev) : [...prev, d]
    );
  }

  function drawStory() {
    const pool = DARK_CASES.filter(s =>
      difficulties.includes(s.difficulty) && !usedIds.has(s.id)
    );
    if (pool.length === 0) {
      setUsedIds(new Set()); // reset pool
      return DARK_CASES.filter(s => difficulties.includes(s.difficulty))[
        Math.floor(Math.random() * DARK_CASES.filter(s => difficulties.includes(s.difficulty)).length)
      ];
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function startGame() {
    if (players.length < 2) return;
    const story = drawStory();
    setCurrentStory(story);
    setUsedIds(new Set([story.id]));
    setShowSolution(false);
    setNoCount(0);
    setYesCount(0);
    setRoundWinner(null);
    setLastAnsweredPlayer(null);
    setNarratorIdx(0);
    setPhase("narrator");
    playClick({ type: "soft" });
  }

  function nextRound() {
    const nextNarrator = (narratorIdx + 1) % players.length;
    const story = drawStory();
    if (story) setUsedIds(prev => new Set([...prev, story.id]));
    setCurrentStory(story ?? null);
    setShowSolution(false);
    setNoCount(0);
    setYesCount(0);
    setRoundWinner(null);
    setLastAnsweredPlayer(null);
    setNarratorIdx(nextNarrator);
    setPhase("narrator");
    playClick({ type: "soft" });
  }

  function answerNo(playerIdx: number) {
    setNoCount(c => c + 1);
    setLastAnsweredPlayer(playerIdx);
    playClick({ type: "soft" });
  }

  function answerYes(playerIdx: number) {
    setYesCount(c => c + 1);
    setLastAnsweredPlayer(playerIdx);
    playClick({ type: "soft" });
  }

  function playerSolved(playerIdx: number) {
    setRoundWinner(playerIdx);
    setPlayers(prev => prev.map((p, i) =>
      i === playerIdx ? { ...p, points: p.points + pointsCorrect } : p
    ));
    setPhase("round-end");
    playClick({ type: "soft" });
  }

  function nobodySolved() {
    // Erzähler bekommt Bonuspunkt
    setPlayers(prev => prev.map((p, i) =>
      i === narratorIdx ? { ...p, points: p.points + DEFAULT_POINTS.hostBonus } : p
    ));
    setRoundWinner(null);
    setPhase("round-end");
  }

  const narrator = players[narratorIdx];
  const guessers = players.filter((_, i) => i !== narratorIdx);
  const totalPoints = players.reduce((s, p) => s + p.points, 0);

  // ── SETUP ──────────────────────────────────────────────────────────────────
  if (phase === "setup") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      {/* Players */}
      <div>
        <h2 className="text-xl font-display tracking-wider mb-3">Spieler</h2>
        <div className="flex gap-2 mb-3">
          <Input value={newName} onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addPlayer()} placeholder="Name eingeben" />
          <Button onClick={addPlayer} size="icon" variant="secondary"><Plus className="w-4 h-4" /></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {players.map((p, i) => (
            <Badge key={i} variant="secondary" className="gap-1 py-1.5 px-3">
              {p.name}
              <button onClick={() => players.length > 2 && setPlayers(players.filter((_, x) => x !== i))}
                className="ml-1 opacity-60 hover:opacity-100">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        {players.length < 2 && <p className="text-xs text-muted-foreground mt-2">Mind. 2 Spieler nötig.</p>}
      </div>

      {/* Difficulty */}
      <div>
        <h2 className="text-xl font-display tracking-wider mb-3">Schwierigkeit</h2>
        <div className="grid gap-2">
          {(["leicht", "mittel", "dunkel"] as DarkCaseDifficulty[]).map(d => {
            const active = difficulties.includes(d);
            return (
              <button key={d} onClick={() => toggleDifficulty(d)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${active ? "border-primary bg-primary/15" : "border-border bg-muted/30 opacity-70 hover:opacity-100"}`}>
                <span className="font-display tracking-wider">{DIFFICULTY_LABEL[d]}</span>
                {d === "dunkel" && <span className="text-xs text-muted-foreground ml-2">Für mutige Runden</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Points */}
      <div className="space-y-2">
        <h2 className="text-xl font-display tracking-wider">Punkte</h2>
        <div className="flex items-center justify-between bg-secondary/50 rounded-xl px-4 py-3">
          <span className="text-sm font-medium">Punkte für Lösung</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setPointsCorrect(p => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center font-bold">−</button>
            <span className="font-display text-lg w-6 text-center">{pointsCorrect}</span>
            <button onClick={() => setPointsCorrect(p => Math.min(10, p + 1))}
              className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center font-bold">+</button>
          </div>
        </div>
        <div className="flex items-center justify-between bg-secondary/50 rounded-xl px-4 py-3">
          <span className="text-sm font-medium">Schlücke bei Nein-Antwort</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setSipsWrong(p => Math.max(0, p - 1))}
              className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center font-bold">−</button>
            <span className="font-display text-lg w-6 text-center">{sipsWrong}</span>
            <button onClick={() => setSipsWrong(p => Math.min(5, p + 1))}
              className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center font-bold">+</button>
          </div>
        </div>
      </div>

      <Button onClick={startGame} disabled={players.length < 2} className="w-full" size="lg">
        <Play className="w-4 h-4 mr-2" /> Spiel starten
      </Button>
    </Card>
  );

  // ── PAUSE ──────────────────────────────────────────────────────────────────
  if (phase === "pause") return (
    <Card className="p-6 bg-card/80 backdrop-blur space-y-5 text-center animate-scale-in">
      <div className="py-4">
        <Pause className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
        <h2 className="text-2xl font-display tracking-wider">Pause</h2>
        <p className="text-sm text-muted-foreground mt-1">Erzähler: {narrator.name}</p>
      </div>
      {/* Scoreboard in pause */}
      <div className="space-y-1.5">
        {[...players].sort((a, b) => b.points - a.points).map((p, i) => (
          <div key={p.name} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2">
            <span className="text-sm font-medium">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"} {p.name}</span>
            <span className="font-display text-lg">{p.points} P.</span>
          </div>
        ))}
      </div>
      <div className="grid gap-2">
        <Button onClick={() => setPhase(pausedFrom)} size="lg" className="w-full">
          <Play className="w-4 h-4 mr-2" /> Weiterspielen
        </Button>
        <Button onClick={() => setPhase("setup")} variant="outline" className="w-full">
          <RotateCw className="w-4 h-4 mr-2" /> Zurück zum Setup
        </Button>
      </div>
    </Card>
  );

  // ── NARRATOR SCREEN ────────────────────────────────────────────────────────
  if (phase === "narrator") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-4 animate-scale-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-display">{DIFFICULTY_LABEL[currentStory?.difficulty ?? "leicht"]}</Badge>
          <span className="text-xs text-muted-foreground">{usedIds.size} Rätsel gespielt</span>
        </div>
        <button onClick={() => { setPausedFrom("narrator"); setPhase("pause"); }}
          className="text-muted-foreground hover:text-foreground transition-colors">
          <Pause className="w-4 h-4" />
        </button>
      </div>

      {/* Narrator tag */}
      <div className="bg-primary/15 border-2 border-primary/30 rounded-xl px-4 py-3 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Erzähler</p>
        <p className="text-xl font-display tracking-wider">{narrator.name}</p>
        <p className="text-xs text-muted-foreground mt-1">Nur du liest die Lösung!</p>
      </div>

      {/* Riddle (everyone sees this) */}
      <div className="bg-secondary/50 rounded-xl p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1">
          <HelpCircle className="w-3 h-3" /> Das Rätsel
        </p>
        <p className="text-base font-medium leading-relaxed">{currentStory?.riddle}</p>
      </div>

      {/* Solution – only narrator sees this */}
      <div className={`rounded-xl p-4 border-2 transition-all ${showSolution ? "border-primary/40 bg-primary/10" : "border-dashed border-border bg-muted/30"}`}>
        <button onClick={() => setShowSolution(s => !s)}
          className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-2 w-full">
          {showSolution ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          {showSolution ? "Lösung verbergen" : "Lösung anzeigen (nur Erzähler!)"}
        </button>
        {showSolution && (
          <p className="text-sm leading-relaxed text-foreground/90">{currentStory?.solution}</p>
        )}
      </div>

      {/* Q&A counter */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-display text-green-500">{yesCount}</p>
          <p className="text-xs text-muted-foreground">✓ Ja-Antworten</p>
        </div>
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-display text-destructive">{noCount}</p>
          <p className="text-xs text-muted-foreground">✗ Nein {sipsWrong > 0 ? `(${sipsWrong} Schluck)` : ""}</p>
        </div>
      </div>

      {/* Answer buttons */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground text-center">Wer hat gerade eine Frage gestellt?</p>
        <div className="grid grid-cols-2 gap-2">
          {guessers.map((p, i) => {
            const realIdx = players.indexOf(p);
            return (
              <div key={i} className="space-y-1">
                <p className="text-xs text-center font-medium truncate">{p.name}</p>
                <div className="grid grid-cols-2 gap-1">
                  <button onClick={() => answerYes(realIdx)}
                    className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-600 rounded-lg py-1.5 text-xs font-bold transition-all cursor-pointer">
                    ✓ Ja
                  </button>
                  <button onClick={() => answerNo(realIdx)}
                    className="bg-destructive/20 hover:bg-destructive/30 border border-destructive/30 text-destructive rounded-lg py-1.5 text-xs font-bold transition-all cursor-pointer">
                    ✗ Nein
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Solved / Nobody solved */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <Button variant="outline" onClick={nobodySolved} size="sm">
          <Skull className="w-3 h-3 mr-1" /> Niemand errät es
        </Button>
        <div className="space-y-1">
          <p className="text-xs text-center text-muted-foreground">Gelöst von:</p>
          <div className="flex flex-wrap gap-1 justify-center">
            {guessers.map((p, i) => (
              <button key={i} onClick={() => playerSolved(players.indexOf(p))}
                className="bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary rounded-lg px-2 py-1 text-xs font-bold transition-all cursor-pointer">
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );

  // ── ROUND END ──────────────────────────────────────────────────────────────
  if (phase === "round-end") return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="text-center py-3">
        {roundWinner !== null ? (
          <>
            <Trophy className="w-10 h-10 mx-auto mb-2 text-yellow-500" />
            <h2 className="text-2xl font-display tracking-wider">
              {players[roundWinner].name} hat's erraten!
            </h2>
            <p className="text-sm text-muted-foreground mt-1">+{pointsCorrect} Punkte</p>
          </>
        ) : (
          <>
            <Skull className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
            <h2 className="text-2xl font-display tracking-wider">Niemand kam drauf!</h2>
            <p className="text-sm text-muted-foreground mt-1">{narrator.name} bekommt +1 Bonuspunkt</p>
          </>
        )}
      </div>

      {/* Solution reveal */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Die Lösung</p>
        <p className="text-sm leading-relaxed">{currentStory?.solution}</p>
      </div>

      {/* Scoreboard */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">Punktestand</p>
        {[...players]
          .map((p, i) => ({ ...p, idx: i }))
          .sort((a, b) => b.points - a.points)
          .map((p, rank) => (
            <div key={p.idx} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2.5">
              <span className="font-medium flex items-center gap-2">
                <span className="text-muted-foreground text-sm">#{rank + 1}</span>
                {p.name}
                {p.idx === narratorIdx && <Badge variant="outline" className="text-xs">Erzähler</Badge>}
              </span>
              <span className="font-display text-xl">{p.points}</span>
            </div>
          ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={() => setPhase("setup")}>
          <RotateCw className="w-4 h-4 mr-1" /> Setup
        </Button>
        <Button onClick={nextRound} size="lg">
          Nächste Runde <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </Card>
  );

  return null;
}
