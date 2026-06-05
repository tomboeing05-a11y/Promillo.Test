import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, X, Play, RotateCw, Heart, HeartCrack, Timer, ListChecks, SkipForward, Eye, EyeOff, Trophy, Skull, Pause, Users, ChevronLeft } from "lucide-react";
import { DUEMMSTER_QUESTIONS } from "@/lib/duemmster-questions";
import { saveJSON, loadJSON } from "@/lib/persist";

type Mode = "count" | "timer";
type Phase = "setup" | "question" | "vote" | "round-end" | "game-over" | "pause" | "manage-players";

interface Player {
  name: string;
  lives: number;
  alive: boolean;
}

const STORAGE_KEY = "duemmster-setup-v1";
interface Saved {
  names: string[];
  mode: Mode;
  questionsPerRound: number;
  timerSeconds: number;
  startLives: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function DuemmsterGame() {
  // ---------- Setup ----------
  const [names, setNames] = useState<string[]>(["Spieler 1", "Spieler 2", "Spieler 3"]);
  const [newName, setNewName] = useState("");
  const [mode, setMode] = useState<Mode>("count");
  const [questionsPerRound, setQuestionsPerRound] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [startLives, setStartLives] = useState(3);

  // ---------- Game state ----------
  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<Player[]>([]);
  const [round, setRound] = useState(1);
  const [deck, setDeck] = useState<typeof DUEMMSTER_QUESTIONS>([]);
  const [deckIdx, setDeckIdx] = useState(0);
  const [askedThisRound, setAskedThisRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [loserIdx, setLoserIdx] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [pausedFrom, setPausedFrom] = useState<Phase>("question");
  const [manageNewName, setManageNewName] = useState("");

  // ---------- Persistence ----------
  useEffect(() => {
    const s = loadJSON<Saved>(STORAGE_KEY);
    if (s) {
      if (s.names?.length) setNames(s.names);
      if (s.mode) setMode(s.mode);
      if (s.questionsPerRound) setQuestionsPerRound(s.questionsPerRound);
      if (s.timerSeconds) setTimerSeconds(s.timerSeconds);
      if (s.startLives) setStartLives(s.startLives);
    }
  }, []);
  useEffect(() => {
    saveJSON<Saved>(STORAGE_KEY, { names, mode, questionsPerRound, timerSeconds, startLives });
  }, [names, mode, questionsPerRound, timerSeconds, startLives]);

  // ---------- Timer ----------
  useEffect(() => {
    if (phase === "question" && mode === "timer") {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [phase, mode]);

  const alivePlayers = useMemo(() => players.filter((p) => p.alive), [players]);
  const currentQ = deck[deckIdx];

  // ---------- Actions ----------
  function addPlayer() {
    const n = newName.trim();
    if (!n || names.includes(n)) return;
    setNames([...names, n]);
    setNewName("");
  }

  function startGame() {
    if (names.length < 2) return;
    setPlayers(names.map((n) => ({ name: n, lives: startLives, alive: true })));
    setDeck(shuffle(DUEMMSTER_QUESTIONS));
    setDeckIdx(0);
    setRound(1);
    setAskedThisRound(0);
    setTimeLeft(timerSeconds);
    setRevealed(false);
    setLoserIdx(null);
    setPhase("question");
  }

  function nextQuestion() {
    setRevealed(false);
    setDeckIdx((i) => (i + 1) % deck.length);
    setAskedThisRound((c) => c + 1);
  }

  function endRound() {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("vote");
  }

  function applyVote() {
    if (loserIdx === null) return;
    const next = players.map((p, i) => {
      if (i !== loserIdx) return p;
      const lives = Math.max(0, p.lives - 1);
      return { ...p, lives, alive: lives > 0 };
    });
    setPlayers(next);
    const stillAlive = next.filter((p) => p.alive);
    if (stillAlive.length <= 1) {
      setPhase("game-over");
    } else {
      setPhase("round-end");
    }
  }

  function nextRound() {
    setRound((r) => r + 1);
    setAskedThisRound(0);
    setTimeLeft(timerSeconds);
    setRevealed(false);
    setLoserIdx(null);
    setPhase("question");
  }

  function backToSetup() {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("setup");
  }

  function pauseGame() {
    if (timerRef.current) clearInterval(timerRef.current);
    setPausedFrom(phase as Phase);
    setPhase("pause");
  }

  function resumeGame() {
    setPhase(pausedFrom);
  }

  // Auto end-of-round detection
  useEffect(() => {
    if (phase !== "question") return;
    if (mode === "count" && askedThisRound >= questionsPerRound) endRound();
    if (mode === "timer" && timeLeft <= 0) endRound();
     
  }, [askedThisRound, timeLeft, phase, mode, questionsPerRound]);

  // ============================================================
  // SETUP
  // ============================================================
  if (phase === "setup") {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-6">
        <div>
          <h2 className="text-xl font-display tracking-wider mb-3">Spieler</h2>
          <div className="flex gap-2 mb-3">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPlayer()}
              placeholder="Name eingeben"
            />
            <Button onClick={addPlayer} size="icon" variant="secondary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {names.map((p, i) => (
              <Badge key={i} variant="secondary" className="gap-1 py-1.5 px-3">
                {p}
                <button
                  onClick={() => setNames(names.filter((_, x) => x !== i))}
                  className="ml-1 opacity-60 hover:opacity-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          {names.length < 2 && (
            <p className="text-xs text-muted-foreground mt-2">Mind. 2 Spieler nötig.</p>
          )}
        </div>

        <div>
          <Label className="text-base mb-2 block">Runden-Modus</Label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => setMode("count")}
              className={`p-3 rounded-md border text-sm transition flex items-center justify-center gap-2 ${
                mode === "count" ? "border-primary bg-primary/15" : "border-border bg-muted/30 opacity-60"
              }`}
            >
              <ListChecks className="w-4 h-4" /> Fragenzahl
            </button>
            <button
              onClick={() => setMode("timer")}
              className={`p-3 rounded-md border text-sm transition flex items-center justify-center gap-2 ${
                mode === "timer" ? "border-primary bg-primary/15" : "border-border bg-muted/30 opacity-60"
              }`}
            >
              <Timer className="w-4 h-4" /> Timer
            </button>
          </div>

          {mode === "count" ? (
            <Stepper
              label="Fragen pro Runde"
              value={questionsPerRound}
              min={1}
              max={30}
              step={1}
              onChange={setQuestionsPerRound}
            />
          ) : (
            <Stepper
              label="Sekunden pro Runde"
              value={timerSeconds}
              min={30}
              max={600}
              step={15}
              onChange={setTimerSeconds}
            />
          )}
        </div>

        <div>
          <Label className="text-base mb-2 block">Leben pro Spieler</Label>
          <Stepper
            label="Startleben"
            value={startLives}
            min={1}
            max={9}
            step={1}
            onChange={setStartLives}
          />
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 text-sm space-y-2">
          <p className="font-display tracking-wider text-base">So geht's</p>
          <p className="text-muted-foreground text-xs">
            Eine Runde besteht aus mehreren Fragen ohne Antwortmöglichkeiten. Reihum oder gleichzeitig
            geben alle ihre Antwort ab – die richtige wird aufgedeckt. Am Ende der Runde stimmt ihr ab,
            wer die <strong className="text-foreground">dümmste Antwort</strong> gegeben hat: dieser
            Spieler verliert ein Leben. Wer keine Leben mehr hat, ist raus. Letzter im Flugzeug gewinnt.
          </p>
        </div>

        <Button onClick={startGame} disabled={names.length < 2} className="w-full" size="lg">
          <Play className="w-4 h-4 mr-2" /> Los geht's
        </Button>
      </Card>
    );
  }

  // ============================================================
  // PAUSE
  // ============================================================
  if (phase === "pause") {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-5 text-center">
        <div className="py-4">
          <Pause className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
          <h2 className="text-2xl font-display tracking-wider">Pause</h2>
          <p className="text-sm text-muted-foreground mt-1">Runde {round}</p>
        </div>
        <div className="grid gap-2">
          <Button onClick={resumeGame} size="lg" className="w-full">
            <Play className="w-4 h-4 mr-2" /> Weiterspielen
          </Button>
          <Button onClick={() => setPhase("manage-players")} variant="outline" className="w-full">
            <Users className="w-4 h-4 mr-2" /> Spieler verwalten
          </Button>
          <Button onClick={backToSetup} variant="outline" className="w-full">
            <RotateCw className="w-4 h-4 mr-2" /> Zurück zum Setup
          </Button>
        </div>
      </Card>
    );
  }

  // ============================================================
  // SPIELER VERWALTEN
  // ============================================================
  if (phase === "manage-players") {
    function addMidGame() {
      const n = manageNewName.trim();
      if (!n || players.some((p) => p.name === n)) return;
      setPlayers([...players, { name: n, lives: startLives, alive: true }]);
      setManageNewName("");
    }
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-5">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setPhase("pause")}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-display tracking-wider">Spieler verwalten</h2>
        </div>
        <div className="flex gap-2">
          <Input value={manageNewName} onChange={(e) => setManageNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addMidGame()} placeholder="Spieler hinzufügen" />
          <Button onClick={addMidGame} size="icon" variant="secondary"><Plus className="w-4 h-4" /></Button>
        </div>
        <div className="space-y-2">
          {players.map((p, i) => (
            <div key={i} className={`flex items-center justify-between rounded-lg px-4 py-2 ${p.alive ? "bg-secondary/50" : "bg-muted/30 opacity-50"}`}>
              <span className="font-medium flex items-center gap-2">
                {!p.alive && <Skull className="w-3 h-3" />}
                {p.name}
                <span className="flex">
                  {Array.from({ length: p.lives }).map((_, k) => (
                    <Heart key={k} className="w-3 h-3 text-destructive fill-destructive" />
                  ))}
                </span>
              </span>
              {p.alive && (
                <button onClick={() => {
                  if (players.filter((x) => x.alive).length <= 2) return;
                  setPlayers(players.map((x, j) => j === i ? { ...x, alive: false, lives: 0 } : x));
                }} className="text-muted-foreground hover:text-destructive transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          {players.filter((p) => p.alive).length <= 2 && (
            <p className="text-xs text-muted-foreground text-center">Mind. 2 aktive Spieler nötig.</p>
          )}
        </div>
        <Button onClick={() => setPhase("pause")} className="w-full">
          <ChevronLeft className="w-4 h-4 mr-2" /> Zurück zur Pause
        </Button>
      </Card>
    );
  }

  // ============================================================
  // QUESTION
  // ============================================================
  if (phase === "question" && currentQ) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-5">
        <div className="flex items-center justify-between text-xs">
          <Badge variant="outline">Runde {round}</Badge>
          <div className="flex items-center gap-2">
            {mode === "count" ? (
              <Badge variant="outline">
                Frage {askedThisRound + 1} / {questionsPerRound}
              </Badge>
            ) : (
              <Badge variant="outline" className="flex items-center gap-1">
                <Timer className="w-3 h-3" />
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </Badge>
            )}
            <button onClick={pauseGame} className="text-muted-foreground hover:text-foreground transition-colors">
              <Pause className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-center space-y-3 py-3">
          {currentQ.estimate && (
            <Badge className="bg-accent/20 text-accent border-accent/40">Schätzfrage</Badge>
          )}
          <h2 className="text-2xl md:text-3xl font-display tracking-wide leading-snug">
            {currentQ.q}
          </h2>
          {revealed ? (
            <div className="rounded-lg border-2 border-primary/40 bg-primary/10 p-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                Richtige Antwort
              </div>
              <div className="text-xl font-display tracking-wide">{currentQ.a}</div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Alle geben jetzt ihre Antwort ab. Dann aufdecken.
            </p>
          )}
        </div>

        <div>
          <div className="text-xs text-muted-foreground mb-2">Spieler (Leben)</div>
          <div className="flex flex-wrap gap-2">
            {players.map((p, i) =>
              p.alive ? (
                <Badge key={i} variant="outline" className="py-1.5 gap-1.5">
                  {p.name}
                  <span className="flex">
                    {Array.from({ length: p.lives }).map((_, k) => (
                      <Heart key={k} className="w-3 h-3 text-destructive fill-destructive" />
                    ))}
                  </span>
                </Badge>
              ) : (
                <Badge key={i} variant="outline" className="py-1.5 opacity-40 line-through">
                  <Skull className="w-3 h-3 mr-1" /> {p.name}
                </Badge>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {!revealed ? (
            <Button onClick={() => setRevealed(true)} variant="secondary" className="col-span-2">
              <Eye className="w-4 h-4 mr-2" /> Antwort aufdecken
            </Button>
          ) : (
            <>
              <Button onClick={() => setRevealed(false)} variant="outline">
                <EyeOff className="w-4 h-4 mr-2" /> Verbergen
              </Button>
              <Button onClick={nextQuestion}>
                <SkipForward className="w-4 h-4 mr-2" /> Nächste Frage
              </Button>
            </>
          )}
          <Button onClick={endRound} variant="outline" className="col-span-2">
            Runde beenden & abstimmen
          </Button>
        </div>
      </Card>
    );
  }

  // ============================================================
  // VOTE
  // ============================================================
  if (phase === "vote") {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-5">
        <div className="text-center space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-widest">Runde {round} vorbei</div>
          <h2 className="text-2xl font-display tracking-wider">Wer hatte die dümmste Antwort?</h2>
          <p className="text-xs text-muted-foreground">Dieser Spieler verliert ein Leben.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {players.map((p, i) =>
            p.alive ? (
              <button
                key={i}
                onClick={() => setLoserIdx(i)}
                className={`p-3 rounded-lg border-2 text-left transition flex items-center justify-between ${
                  loserIdx === i
                    ? "border-destructive bg-destructive/15"
                    : "border-border bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <span className="font-medium">{p.name}</span>
                <span className="flex">
                  {Array.from({ length: p.lives }).map((_, k) => (
                    <Heart key={k} className="w-3.5 h-3.5 text-destructive fill-destructive" />
                  ))}
                </span>
              </button>
            ) : null,
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => setPhase("question")} variant="outline">
            Zurück
          </Button>
          <Button onClick={applyVote} disabled={loserIdx === null} variant="destructive">
            <HeartCrack className="w-4 h-4 mr-2" /> Leben abziehen
          </Button>
        </div>
      </Card>
    );
  }

  // ============================================================
  // ROUND END
  // ============================================================
  if (phase === "round-end") {
    const loser = loserIdx !== null ? players[loserIdx] : null;
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-5 text-center">
        <div className="text-xs text-muted-foreground uppercase tracking-widest">Runde {round} ausgewertet</div>
        {loser && (
          <div className="space-y-2">
            <HeartCrack className="w-12 h-12 mx-auto text-destructive" />
            <div className="text-2xl font-display tracking-wider">{loser.name}</div>
            <p className="text-sm text-muted-foreground">
              hat ein Leben verloren – noch {loser.lives} {loser.lives === 1 ? "Leben" : "Leben"} übrig
              {!loser.alive && " (eliminiert!)"}
            </p>
          </div>
        )}

        <div>
          <div className="text-xs text-muted-foreground mb-2">Noch im Spiel</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {alivePlayers.map((p, i) => (
              <Badge key={i} variant="outline" className="py-1.5 gap-1.5">
                {p.name}
                <span className="flex">
                  {Array.from({ length: p.lives }).map((_, k) => (
                    <Heart key={k} className="w-3 h-3 text-destructive fill-destructive" />
                  ))}
                </span>
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={backToSetup} variant="outline">
            <RotateCw className="w-4 h-4 mr-2" /> Setup
          </Button>
          <Button onClick={nextRound}>
            <Play className="w-4 h-4 mr-2" /> Nächste Runde
          </Button>
        </div>
      </Card>
    );
  }

  // ============================================================
  // GAME OVER
  // ============================================================
  if (phase === "game-over") {
    const winner = alivePlayers[0];
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-5 text-center">
        <Trophy className="w-16 h-16 mx-auto text-accent" />
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground uppercase tracking-widest">Spielende</div>
          <h2 className="text-3xl font-display tracking-wider">
            {winner ? `${winner.name} gewinnt!` : "Alle eliminiert"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {winner ? "Du bist nicht der Dümmste – heute zumindest. 🍻" : "Niemand mehr im Flugzeug."}
          </p>
        </div>

        <div className="space-y-2">
          {players.map((p, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded-md border p-2 ${
                p.alive ? "border-primary/40 bg-primary/10" : "border-border bg-muted/20 opacity-60"
              }`}
            >
              <span className="font-medium">
                {p.alive ? "🏆 " : "💀 "}
                {p.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {p.alive ? `${p.lives} Leben übrig` : "eliminiert"}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={backToSetup} variant="outline">
            <RotateCw className="w-4 h-4 mr-2" /> Setup
          </Button>
          <Button onClick={startGame}>
            <Play className="w-4 h-4 mr-2" /> Neues Spiel
          </Button>
        </div>
      </Card>
    );
  }

  return null;
}

function Stepper({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange(Math.max(min, value - step))}
        >
          −
        </Button>
        <span className="font-display text-xl text-primary w-12 text-center">{value}</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange(Math.min(max, value + step))}
        >
          +
        </Button>
      </div>
    </div>
  );
}
