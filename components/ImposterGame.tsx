import { useEffect, useMemo, useState } from "react";
import { saveJSON, loadJSON } from "@/lib/persist";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  IMPOSTER_CATEGORIES,
  IMPOSTER_WORDS,
  type ImposterCategory,
} from "@/lib/imposter-words";
import {
  Eye,
  EyeOff,
  Plus,
  Minus,
  X,
  Shuffle,
  Play,
  RotateCw,
  Crown,
  Skull,
  Timer,
  Pause,
} from "lucide-react";

type Phase = "setup" | "reveal" | "discuss" | "result";

interface Round {
  word: string;
  hint: string;
  imposterIdx: number;
  starterIdx: number;
}

const DEFAULT_CATS: ImposterCategory[] = ["einfach", "trends", "marken", "filme", "fussball"];

const STORAGE_KEY = "imposter-setup-v1";
interface ImposterSaved {
  players: string[];
  cats: ImposterCategory[];
  hintEnabled: boolean;
  imposterCount: number;
  timerEnabled?: boolean;
  timerSeconds?: number;
}

export function ImposterGame() {
  const [players, setPlayers] = useState<string[]>(["Spieler 1", "Spieler 2", "Spieler 3"]);
  const [newName, setNewName] = useState("");
  const [pausedFrom, setPausedFrom] = useState<Phase>("play");
  const [manageNewName, setManageNewName] = useState("");
  const [cats, setCats] = useState<ImposterCategory[]>(DEFAULT_CATS);
  const [hintEnabled, setHintEnabled] = useState(true);
  const [imposterCount, setImposterCount] = useState(1);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(120);

  useEffect(() => {
    const s = loadJSON<ImposterSaved>(STORAGE_KEY);
    if (!s) return;
    if (s.players?.length) setPlayers(s.players);
    if (s.cats?.length) setCats(s.cats);
    if (typeof s.hintEnabled === "boolean") setHintEnabled(s.hintEnabled);
    if (typeof s.imposterCount === "number") setImposterCount(s.imposterCount);
    if (typeof s.timerEnabled === "boolean") setTimerEnabled(s.timerEnabled);
    if (typeof s.timerSeconds === "number") setTimerSeconds(s.timerSeconds);
  }, []);
  useEffect(() => {
    saveJSON<ImposterSaved>(STORAGE_KEY, { players, cats, hintEnabled, imposterCount, timerEnabled, timerSeconds });
  }, [players, cats, hintEnabled, imposterCount, timerEnabled, timerSeconds]);

  const [phase, setPhase] = useState<Phase>("setup");
  const [round, setRound] = useState<Round | null>(null);
  const [imposterIdxs, setImposterIdxs] = useState<number[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (phase === "discuss" && timerEnabled) {
      setTimeLeft(timerSeconds);
      setTimerRunning(true);
    } else {
      setTimerRunning(false);
    }
  }, [phase, timerEnabled, timerSeconds]);

  useEffect(() => {
    if (!timerRunning) return;
    if (timeLeft <= 0) {
      setTimerRunning(false);
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timerRunning, timeLeft]);

  const maxImposters = Math.max(1, Math.floor((players.length - 1) / 2));

  function addPlayer() {
    const name = newName.trim();
    if (!name || players.includes(name)) return;
    setPlayers([...players, name]);
    setNewName("");
  }

  function toggleCat(c: ImposterCategory) {
    setCats((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  function pickWord(): { word: string; hint: string } | null {
    const pool: [string, string][] = [];
    for (const c of cats) pool.push(...IMPOSTER_WORDS[c]);
    const fresh = pool.filter(([w]) => !usedWords.has(w));
    const arr = fresh.length > 0 ? fresh : pool;
    if (arr.length === 0) return null;
    const [word, hint] = arr[Math.floor(Math.random() * arr.length)];
    return { word, hint };
  }

  function startRound() {
    if (players.length < 3 || cats.length === 0) return;
    const picked = pickWord();
    if (!picked) return;
    const count = Math.min(imposterCount, maxImposters);
    const idxs = new Set<number>();
    while (idxs.size < count) idxs.add(Math.floor(Math.random() * players.length));
    const imps = [...idxs];
    const starter = Math.floor(Math.random() * players.length);
    setImposterIdxs(imps);
    setRound({ word: picked.word, hint: picked.hint, imposterIdx: imps[0], starterIdx: starter });
    setUsedWords((u) => new Set(u).add(picked.word));
    setCurrentIdx(0);
    setRevealed(false);
    setPhase("reveal");
  }

  function nextPlayer() {
    setRevealed(false);
    if (currentIdx + 1 >= players.length) {
      setPhase("discuss");
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  }

  function reset() {
    setPhase("setup");
    setRound(null);
    setRevealed(false);
    setCurrentIdx(0);
  }

  // ---------- SETUP ----------
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
            {players.map((p, i) => (
              <Badge key={i} variant="secondary" className="gap-1 py-1.5 px-3">
                {p}
                <button
                  onClick={() => setPlayers(players.filter((_, x) => x !== i))}
                  className="ml-1 opacity-60 hover:opacity-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          {players.length < 3 && (
            <p className="text-xs text-muted-foreground mt-2">Mind. 3 Spieler nötig.</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-display tracking-wider mb-3">Kategorien</h2>
          <div className="grid grid-cols-2 gap-2">
            {IMPOSTER_CATEGORIES.map((c) => {
              const active = cats.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCat(c.id)}
                  className={`p-2 rounded-md border text-sm text-left transition ${
                    active
                      ? "border-primary bg-primary/15"
                      : "border-border bg-muted/30 opacity-60"
                  }`}
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
          <Switch checked={hintEnabled} onCheckedChange={setHintEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Anzahl Imposter</Label>
            <p className="text-xs text-muted-foreground">Max. {maxImposters}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setImposterCount(Math.max(1, imposterCount - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-display text-lg">{imposterCount}</span>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setImposterCount(Math.min(maxImposters, imposterCount + 1))}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-border/50 p-3 bg-muted/20">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base flex items-center gap-1.5">
                <Timer className="w-4 h-4" /> Zeitlimit
              </Label>
              <p className="text-xs text-muted-foreground">Countdown in der Diskussion</p>
            </div>
            <Switch checked={timerEnabled} onCheckedChange={setTimerEnabled} />
          </div>
          {timerEnabled && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Dauer</span>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setTimerSeconds(Math.max(15, timerSeconds - 15))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-20 text-center font-display text-lg tabular-nums">
                  {Math.floor(timerSeconds / 60)}:{String(timerSeconds % 60).padStart(2, "0")}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setTimerSeconds(Math.min(600, timerSeconds + 15))}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <Button
          onClick={startRound}
          disabled={players.length < 3 || cats.length === 0}
          className="w-full"
          size="lg"
        >
          <Play className="w-4 h-4 mr-2" /> Runde starten
        </Button>
      </Card>
    );
  }

  // ---------- REVEAL ----------
  if (phase === "reveal" && round) {
    const player = players[currentIdx];
    const isImposter = imposterIdxs.includes(currentIdx);
    return (
      <Card className="p-6 bg-card/80 backdrop-blur text-center space-y-5">
        <div className="text-xs text-muted-foreground">
          {currentIdx + 1} / {players.length}
        </div>
        <h2 className="text-2xl font-display tracking-wider">{player}</h2>
        <p className="text-sm text-muted-foreground">
          Reiche das Handy an <strong>{player}</strong> und tippe zum Aufdecken.
        </p>

        {!revealed ? (
          <Button onClick={() => setRevealed(true)} size="lg" className="w-full">
            <Eye className="w-4 h-4 mr-2" /> Wort aufdecken
          </Button>
        ) : (
          <div className="space-y-4">
            <div
              className={`p-8 rounded-lg border-2 ${
                isImposter
                  ? "border-destructive bg-destructive/10"
                  : "border-primary bg-primary/10"
              }`}
            >
              {isImposter ? (
                <>
                  <Skull className="w-10 h-10 mx-auto mb-2 text-destructive" />
                  <div className="text-3xl font-display tracking-widest text-destructive">
                    IMPOSTER
                  </div>
                  {hintEnabled && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      Tipp: <strong className="text-foreground">{round.hint}</strong>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="text-xs text-muted-foreground mb-1">Dein Wort</div>
                  <div className="text-3xl font-display tracking-wider">{round.word}</div>
                </>
              )}
            </div>
            <Button onClick={nextPlayer} size="lg" className="w-full" variant="secondary">
              <EyeOff className="w-4 h-4 mr-2" />
              {currentIdx + 1 >= players.length ? "Diskussion starten" : "Weitergeben"}
            </Button>
          </div>
        )}
      </Card>
    );
  }

  // ---------- DISCUSS ----------
  if (phase === "discuss" && round) {
    const starter = players[round.starterIdx];
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-5">
        <div className="text-center space-y-2">
          <Shuffle className="w-8 h-8 mx-auto text-primary" />
          <h2 className="text-2xl font-display tracking-wider">Diskussion</h2>
          <p className="text-sm text-muted-foreground">
            Jeder beschreibt das Wort mit <strong>einem Begriff</strong>. Reihum entlarven!
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 text-center">
          <div className="text-xs text-muted-foreground mb-1">Startet</div>
          <div className="font-display tracking-wider text-xl">
            <Crown className="w-4 h-4 inline mr-1 text-accent" />
            {starter}
          </div>
        </div>

        {timerEnabled && (
          <div
            className={`rounded-2xl border-2 p-4 text-center transition-colors ${
              timeLeft === 0
                ? "border-destructive bg-destructive/15"
                : timeLeft <= 10
                  ? "border-destructive/70 bg-destructive/10 animate-pulse"
                  : "border-primary/60 bg-primary/10"
            }`}
          >
            <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
              <Timer className="w-3.5 h-3.5" /> Zeit
            </div>
            <div className="text-4xl font-display tabular-nums">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </div>
            {timeLeft === 0 ? (
              <div className="text-sm font-display text-destructive mt-1">Zeit abgelaufen! 🚨</div>
            ) : (
              <div className="flex justify-center gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTimerRunning((r) => !r)}
                >
                  {timerRunning ? (
                    <><Pause className="w-3.5 h-3.5 mr-1" /> Pause</>
                  ) : (
                    <><Play className="w-3.5 h-3.5 mr-1" /> Weiter</>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setTimeLeft(timerSeconds);
                    setTimerRunning(true);
                  }}
                >
                  <RotateCw className="w-3.5 h-3.5 mr-1" /> Reset
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground">Reihenfolge:</div>
        <div className="flex flex-wrap gap-2">
          {players.map((p, i) => {
            const order = (i - round.starterIdx + players.length) % players.length;
            return (
              <Badge key={i} variant="outline" className="py-1">
                <span className="opacity-50 mr-1">{order + 1}.</span>
                {p}
              </Badge>
            );
          })}
        </div>

        <Button onClick={() => setPhase("result")} size="lg" className="w-full">
          Auflösen
        </Button>
      </Card>
    );
  }

  // ---------- RESULT ----------
  if (phase === "result" && round) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur text-center space-y-5">
        <h2 className="text-2xl font-display tracking-wider">Auflösung</h2>
        <div className="p-6 rounded-lg border-2 border-primary bg-primary/10">
          <div className="text-xs text-muted-foreground mb-1">Das Wort war</div>
          <div className="text-3xl font-display tracking-wider">{round.word}</div>
        </div>
        <div className="p-6 rounded-lg border-2 border-destructive bg-destructive/10">
          <Skull className="w-8 h-8 mx-auto mb-2 text-destructive" />
          <div className="text-xs text-muted-foreground mb-1">
            Imposter {imposterIdxs.length > 1 ? "waren" : "war"}
          </div>
          <div className="text-2xl font-display tracking-wider text-destructive">
            {imposterIdxs.map((i) => players[i]).join(", ")}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Entlarvt? Imposter trinkt. Nicht erkannt? Alle anderen trinken. 🍻
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={reset} variant="outline">
            <RotateCw className="w-4 h-4 mr-2" /> Setup
          </Button>
          <Button onClick={startRound}>
            <Play className="w-4 h-4 mr-2" /> Nächste Runde
          </Button>
        </div>
      </Card>
    );
  }

  return null;
}
