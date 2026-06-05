import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Beer, RotateCcw, Trophy, Skull, Sparkles, Flame, Star } from "lucide-react";
import {
  questions,
  PENALTY,
  CATEGORIES,
  type Question,
  type Category,
  type Difficulty,
} from "@/lib/questions";
import { cn } from "@/lib/utils";
import { saveState, clearState, type SavedState, type QuizSettings } from "@/lib/storage";
import { CategoryPicker } from "./CategoryPicker";

interface Props {
  players: string[];
  settings: QuizSettings;
  resume?: SavedState | null;
  onRestart: () => void;
  onHome?: () => void;
}

const ALL_CATS: Category[] = CATEGORIES.map((c) => c.id);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Mischt durch Kategorien: pickt zufällige Kategorie aus erlaubten und dann zufällige Frage
function pickQuestion(
  askedIds: Set<number>,
  allowed: Category[],
  forceDifficulty?: Question["difficulty"],
): Question | null {
  const pool = questions.filter(
    (q) =>
      !askedIds.has(q.id) &&
      allowed.includes(q.category) &&
      (!forceDifficulty || q.difficulty === forceDifficulty),
  );
  if (pool.length === 0) {
    // Fallback ohne Kategorie-Filter wenn leer
    const fb = questions.filter(
      (q) => !askedIds.has(q.id) && (!forceDifficulty || q.difficulty === forceDifficulty),
    );
    if (fb.length === 0) return null;
    return fb[Math.floor(Math.random() * fb.length)];
  }
  // Zufallskategorie -> Zufallsfrage (Mischeffekt)
  const cats = Array.from(new Set(pool.map((q) => q.category)));
  const cat = cats[Math.floor(Math.random() * cats.length)];
  const sub = pool.filter((q) => q.category === cat);
  return sub[Math.floor(Math.random() * sub.length)];
}

const difficultyLabel: Record<Question["difficulty"], string> = {
  easy: "Leicht",
  medium: "Mittel",
  hard: "Schwer",
};

const catLabel = (c: Category) => CATEGORIES.find((x) => x.id === c)!;

// Bestimmt am Anfang der Runde, in welcher Frage-Position jeder Spieler seine 2x-Bonus-Hard-Frage bekommt
function pickBonusSlots(players: string[], round: number, qpp: number): Record<string, number> {
  const out: Record<string, number> = {};
  for (const p of players) {
    out[p] = Math.floor(Math.random() * qpp);
  }
  void round;
  return out;
}

export function QuizGame({ players, settings, resume, onRestart }: Props) {
  const { rounds, questionsPerPlayer: QPP, wrongSips } = settings;
  const SIPS: Record<Difficulty, number> = {
    easy: settings.sipsEasy,
    medium: settings.sipsMedium,
    hard: settings.sipsHard,
  };

  const playerOrder = useMemo(
    () => (resume ? players : shuffle(players)),
    [players, resume],
  );

  const [points, setPoints] = useState<Record<string, number>>(
    () => resume?.points ?? Object.fromEntries(playerOrder.map((p) => [p, 0])),
  );
  const [drinks, setDrinks] = useState<Record<string, number>>(
    () => resume?.drinks ?? Object.fromEntries(playerOrder.map((p) => [p, 0])),
  );
  const [givenSips, setGivenSips] = useState<Record<string, number>>(
    () => resume?.givenSips ?? Object.fromEntries(playerOrder.map((p) => [p, 0])),
  );
  const [round, setRound] = useState(resume?.round ?? 1);
  const [playerIdx, setPlayerIdx] = useState(resume?.playerIdx ?? 0);
  const [questionInRound, setQuestionInRound] = useState(resume?.questionInRound ?? 0);
  const [askedIds, setAskedIds] = useState<Set<number>>(
    () => new Set(resume?.askedIds ?? []),
  );
  const [categories, setCategories] = useState<Category[]>(
    () => (resume?.categories as Category[]) ?? ALL_CATS,
  );
  const [doubleBonusUsed, setDoubleBonusUsed] = useState<Record<string, number>>(
    () => resume?.doubleBonusUsed ?? Object.fromEntries(playerOrder.map((p) => [p, 0])),
  );
  const [pendingRevenge, setPendingRevenge] = useState<string[]>(
    () => resume?.pendingRevenge ?? [],
  );
  const [revengeUsed, setRevengeUsed] = useState<string[]>(
    () => resume?.revengeUsed ?? [],
  );

  const [bonusSlots, setBonusSlots] = useState<Record<string, number>>(() =>
    pickBonusSlots(playerOrder, round, QPP),
  );

  // Soll der Spieler bei Kategoriewahl stehen?
  const [needsCategoryPick, setNeedsCategoryPick] = useState<boolean>(() => {
    // Frische Runde wenn questionInRound == 0 und playerIdx == 0
    if (resume) {
      return (resume.questionInRound ?? 0) === 0 && (resume.playerIdx ?? 0) === 0;
    }
    return true;
  });

  const [current, setCurrent] = useState<Question | null>(() => {
    if (resume?.currentId) {
      const q = questions.find((x) => x.id === resume.currentId);
      if (q) return q;
    }
    return null; // Wird nach Kategoriewahl gepickt
  });
  const [selected, setSelected] = useState<number | null>(null);
  const [distribution, setDistribution] = useState<Record<string, number>>({});

  const totalQuestions = rounds * playerOrder.length * QPP;
  const finished = round > rounds;
  const currentPlayer = playerOrder[playerIdx];

  const isDoubleBonus =
    !!current &&
    current.difficulty === "hard" &&
    bonusSlots[currentPlayer] === questionInRound &&
    doubleBonusUsed[currentPlayer] !== round;

  const hasRevenge =
    !!currentPlayer &&
    pendingRevenge.includes(currentPlayer) &&
    !revengeUsed.includes(currentPlayer);

  const baseSips = current ? SIPS[current.difficulty] : 0;
  const multiplier = (isDoubleBonus ? 2 : 1) * (hasRevenge ? 2 : 1);
  const sipCount = baseSips * multiplier;
  const pointsEarned = current ? SIPS[current.difficulty] * (isDoubleBonus ? 2 : 1) : 0;
  const penalty = current ? PENALTY[current.difficulty] : 0;

  useEffect(() => {
    if (finished) return;
    const state: SavedState = {
      players: playerOrder,
      settings,
      points,
      drinks,
      givenSips,
      round,
      playerIdx,
      questionInRound,
      askedIds: Array.from(askedIds),
      currentId: current?.id ?? null,
      categories,
      doubleBonusUsed,
      pendingRevenge,
      revengeUsed,
    };
    saveState(state);
  }, [
    playerOrder, settings, points, drinks, givenSips, round, playerIdx,
    questionInRound, askedIds, current, finished, categories,
    doubleBonusUsed, pendingRevenge, revengeUsed,
  ]);

  // ============ ENDSTAND ============
  if (finished) {
    const ranked = [...playerOrder].sort((a, b) => points[b] - points[a]);
    const loser = ranked[ranked.length - 1];
    return (
      <Card className="p-8 max-w-md w-full bg-card/80 backdrop-blur shadow-[var(--shadow-glow)]">
        <Trophy className="w-14 h-14 mx-auto mb-4 text-primary" />
        <h2 className="text-3xl font-display tracking-wider text-center mb-2">Endstand</h2>
        <p className="text-center text-sm text-muted-foreground mb-6">Nach {rounds} Runden</p>
        <ul className="space-y-2 mb-6">
          {ranked.map((p, i) => (
            <li
              key={p}
              className={cn(
                "flex items-center justify-between rounded-lg px-4 py-3",
                i === 0 && "bg-success/20 border border-success/40",
                i === ranked.length - 1 && ranked.length > 1 && "bg-destructive/20 border border-destructive/40",
                i !== 0 && !(i === ranked.length - 1 && ranked.length > 1) && "bg-secondary/50",
              )}
            >
              <span className="font-medium">
                {i + 1}. {p}
                {i === 0 && " 👑"}
                {i === ranked.length - 1 && ranked.length > 1 && " 💀"}
              </span>
              <span className="flex items-center gap-3">
                <span className="text-primary font-bold">{points[p]} P.</span>
                <span className="flex items-center gap-1 text-accent text-sm">
                  <Beer className="w-3 h-3" />
                  {drinks[p]}
                </span>
              </span>
            </li>
          ))}
        </ul>

        {ranked.length > 1 && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/15 border border-destructive/40 text-center">
            <Skull className="w-8 h-8 mx-auto mb-2 text-destructive" />
            <p className="font-display tracking-wider text-xl text-destructive">
              {loser} muss ein Getränk EXEN! 🍻
            </p>
          </div>
        )}

        <Button
          onClick={() => {
            clearState();
            onRestart();
          }}
          className="w-full"
          size="lg"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Neues Spiel
        </Button>
      </Card>
    );
  }

  // ============ KATEGORIEWAHL ============
  if (needsCategoryPick) {
    return (
      <CategoryPicker
        round={round}
        initial={categories.length > 0 ? categories : ALL_CATS}
        onConfirm={(cats) => {
          setCategories(cats);
          // Neue Bonus-Slots & Revanche-Check
          setBonusSlots(pickBonusSlots(playerOrder, round, QPP));
          // Revanche-Check: wer überdurchschnittlich viele Schlücke kassiert hat
          const drinkVals = playerOrder.map((p) => drinks[p] ?? 0);
          const avg = drinkVals.reduce((a, b) => a + b, 0) / Math.max(1, drinkVals.length);
          const revengeList = playerOrder.filter(
            (p) => (drinks[p] ?? 0) >= avg + 3 && (drinks[p] ?? 0) >= 3,
          );
          setPendingRevenge(revengeList);
          setRevengeUsed([]);
          setNeedsCategoryPick(false);
          setCurrent(pickQuestion(askedIds, cats));
        }}
      />
    );
  }

  if (!current) {
    // Sicherheits-Fallback
    setCurrent(pickQuestion(askedIds, categories));
    return null;
  }

  const q = current;
  const others = playerOrder.filter((p) => p !== currentPlayer);
  const distributed = Object.values(distribution).reduce((a, b) => a + b, 0);
  const remaining = sipCount - distributed;
  const answeredCorrectly = selected === q.answer;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i !== q.answer) {
      setDrinks((d) => ({ ...d, [currentPlayer]: d[currentPlayer] + wrongSips }));
      setPoints((p) => ({ ...p, [currentPlayer]: p[currentPlayer] - penalty }));
    } else {
      setPoints((p) => ({ ...p, [currentPlayer]: p[currentPlayer] + pointsEarned }));
      if (isDoubleBonus) {
        setDoubleBonusUsed((s) => ({ ...s, [currentPlayer]: round }));
      }
      if (hasRevenge) {
        setRevengeUsed((s) => [...s, currentPlayer]);
      }
    }
  };

  const adjust = (name: string, delta: number) => {
    setDistribution((d) => {
      const cur = d[name] ?? 0;
      const next = cur + delta;
      if (next < 0) return d;
      if (delta > 0 && remaining <= 0) return d;
      return { ...d, [name]: next };
    });
  };

  const next = () => {
    if (answeredCorrectly && distributed > 0) {
      setDrinks((d) => {
        const out = { ...d };
        for (const [p, n] of Object.entries(distribution)) {
          out[p] = (out[p] ?? 0) + n;
        }
        return out;
      });
      setGivenSips((g) => ({ ...g, [currentPlayer]: (g[currentPlayer] ?? 0) + distributed }));
    }
    const nextAsked = new Set(askedIds);
    nextAsked.add(q.id);
    setAskedIds(nextAsked);
    setDistribution({});
    setSelected(null);

    let nRound = round;
    let nPlayerIdx = playerIdx + 1;
    let nQinRound = questionInRound;
    let newRound = false;
    if (nPlayerIdx >= playerOrder.length) {
      nPlayerIdx = 0;
      nQinRound += 1;
      if (nQinRound >= QPP) {
        nQinRound = 0;
        nRound += 1;
        newRound = true;
      }
    }
    setPlayerIdx(nPlayerIdx);
    setQuestionInRound(nQinRound);
    setRound(nRound);

    if (nRound > rounds) {
      setCurrent(null);
      clearState();
    } else if (newRound) {
      setNeedsCategoryPick(true);
      setCurrent(null);
    } else {
      setCurrent(pickQuestion(nextAsked, categories));
    }
  };

  const diffColor = {
    easy: "bg-success/20 text-success border-success/30",
    medium: "bg-primary/20 text-primary border-primary/30",
    hard: "bg-destructive/20 text-destructive border-destructive/30",
  }[q.difficulty];

  const cat = catLabel(q.category);

  return (
    <Card className="p-6 md:p-8 max-w-2xl w-full bg-card/80 backdrop-blur shadow-[var(--shadow-glow)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Am Zug</p>
          <p className="text-xl font-display tracking-wide text-primary">{currentPlayer}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">
            Runde {round}/{rounds} · Frage {questionInRound + 1}/{QPP}
          </p>
          <p className="text-xs text-muted-foreground">
            gesamt {Math.min(askedIds.size + 1, totalQuestions)}/{totalQuestions}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Badge variant="outline" className="border-border bg-secondary/30">
          {cat.emoji} {cat.label}
        </Badge>
        <Badge variant="outline" className={cn("border", diffColor)}>
          {difficultyLabel[q.difficulty]} · {pointsEarned} P.
          {isDoubleBonus && <Sparkles className="w-3 h-3 ml-1 inline" />}
        </Badge>
        <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">
          Falsch: −{penalty} P. + {wrongSips} Schlücke
        </Badge>
        {isDoubleBonus && (
          <Badge variant="outline" className="border-amber-400/40 bg-amber-400/10 text-amber-400">
            <Star className="w-3 h-3 mr-1" /> 2× Bonus-Frage!
          </Badge>
        )}
        {hasRevenge && (
          <Badge variant="outline" className="border-pink-500/40 bg-pink-500/10 text-pink-400">
            <Flame className="w-3 h-3 mr-1" /> Revanche – 2× Schlücke verteilen
          </Badge>
        )}
      </div>

      {hasRevenge && (
        <div className="mb-4 p-3 rounded-lg bg-pink-500/10 border border-pink-500/30 text-sm">
          🔥 <span className="font-bold">{currentPlayer}</span> wurde abgefüllt – bei richtiger Antwort darf er/sie <span className="font-bold">doppelt</span> verteilen!
        </div>
      )}

      <h3 className="text-2xl md:text-3xl font-display tracking-wide mb-6 leading-tight">
        {q.question}
      </h3>

      <div className="grid gap-3 mb-6">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer;
          const isSelected = i === selected;
          const show = selected !== null;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={show}
              className={cn(
                "text-left px-4 py-3 rounded-xl border-2 border-border bg-secondary/30 hover:border-primary hover:bg-secondary/60 transition-all font-medium",
                show && isCorrect && "border-success bg-success/20 text-success-foreground",
                show && isSelected && !isCorrect && "border-destructive bg-destructive/20",
              )}
            >
              <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          {answeredCorrectly ? (
            <div className="space-y-3">
              <p className="text-center text-success font-display text-xl tracking-wide">
                Richtig! +{pointsEarned} P. — verteile {sipCount} Schluck{sipCount > 1 ? "e" : ""} 🍻
              </p>
              {others.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-center text-sm text-muted-foreground">
                    Übrig: <span className="text-primary font-bold">{remaining}</span> / {sipCount}
                  </p>
                  {others.map((p) => (
                    <div key={p} className="flex items-center justify-between bg-secondary/40 rounded-lg px-3 py-2">
                      <span className="font-medium">{p}</span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => adjust(p, -1)} disabled={(distribution[p] ?? 0) === 0}>−</Button>
                        <span className="w-8 text-center font-bold text-primary">{distribution[p] ?? 0}</span>
                        <Button size="sm" variant="outline" onClick={() => adjust(p, 1)} disabled={remaining <= 0}>+</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">Keine Mitspieler zum Verteilen 😢</p>
              )}
            </div>
          ) : (
            <p className="text-center text-destructive font-display text-xl tracking-wide flex items-center justify-center gap-2">
              <Beer className="w-5 h-5" />
              Falsch! {currentPlayer}: −{penalty} P. & trinkt {wrongSips} Schlücke!
            </p>
          )}
          <Button
            onClick={next}
            className="w-full"
            size="lg"
            disabled={answeredCorrectly && others.length > 0 && remaining > 0}
          >
            {answeredCorrectly && others.length > 0 && remaining > 0
              ? `Noch ${remaining} verteilen`
              : "Nächste Frage"}
          </Button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Punktestand</p>
        <div className="flex flex-wrap gap-2">
          {[...playerOrder]
            .sort((a, b) => points[b] - points[a])
            .map((p) => (
              <span key={p} className="text-sm bg-secondary/40 px-3 py-1 rounded-full">
                {p}:{" "}
                <span className={cn("font-bold", points[p] < 0 ? "text-destructive" : "text-primary")}>
                  {points[p]}
                </span>
                <span className="text-accent ml-2">🍺 {drinks[p]}</span>
              </span>
            ))}
        </div>
      </div>
    </Card>
  );
}
