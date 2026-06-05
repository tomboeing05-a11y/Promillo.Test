import { useEffect, useMemo, useState } from "react";
import { saveJSON, loadJSON } from "@/lib/persist";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Plus, Pause, Users, ChevronLeft, RotateCw, Shuffle, X } from "lucide-react";
import {
  N99_QUESTIONS,
  N99_CATEGORY_EMOJI,
  N99_CATEGORY_LABEL,
  type N99Category,
} from "@/lib/questions-hebdieSchere";

type Phase = "setup" | "secret" | "reveal" | "done" | "pause" | "manage-players";

const ALL_CATS: N99Category[] = ["classic", "action", "spicy", "deep"];
const STORAGE_KEY = "neunundneunzig-setup-v1";
const ROUND_SIZE = 99;

// Schlücke erhöhen sich alle 20 Fragen: 1-20=1, 21-40=2, 41-60=3, 61-80=4, 81-99=5
function sipsForRound(round: number) {
  return Math.min(Math.floor((round - 1) / 20) + 1, 5);
}

interface Saved {
  players: string[];
  cats: N99Category[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Erzeugt genau ROUND_SIZE Fragen-Indizes; wiederholt den Pool bei Bedarf,
// shuffelt jeden Durchlauf neu und vermeidet direkte Wiederholungen an der Naht.
function buildRound(pool: number[]): number[] {
  if (pool.length === 0) return [];
  const result: number[] = [];
  let lastBatch: number[] = [];
  while (result.length < ROUND_SIZE) {
    let batch = shuffle(pool);
    if (lastBatch.length && batch[0] === lastBatch[lastBatch.length - 1] && batch.length > 1) {
      [batch[0], batch[1]] = [batch[1], batch[0]];
    }
    result.push(...batch);
    lastBatch = batch;
  }
  return result.slice(0, ROUND_SIZE);
}

export function NeunundneunzigGame() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<string[]>(["Spieler 1", "Spieler 2", "Spieler 3"]);
  const [newName, setNewName] = useState("");
  const [pausedFrom, setPausedFrom] = useState<Phase>("play");
  const [manageNewName, setManageNewName] = useState("");
  const [selected, setSelected] = useState<Set<N99Category>>(new Set(ALL_CATS));
  const [order, setOrder] = useState<number[]>([]);
  const [idx, setIdx] = useState(0);
  const [recipient, setRecipient] = useState<string | null>(null);

  useEffect(() => {
    const s = loadJSON<Saved>(STORAGE_KEY);
    if (s?.players?.length) setPlayers(s.players);
    if (s?.cats?.length) setSelected(new Set(s.cats));
  }, []);
  useEffect(() => {
    saveJSON<Saved>(STORAGE_KEY, { players, cats: Array.from(selected) });
  }, [players, selected]);

  const filteredCount = useMemo(
    () => N99_QUESTIONS.filter((q) => selected.has(q.category)).length,
    [selected]
  );

  function addPlayer() {
    const n = newName.trim();
    if (!n || players.includes(n)) return;
    setPlayers([...players, n]);
    setNewName("");
  }
  function removePlayer(i: number) {
    setPlayers(players.filter((_, x) => x !== i));
  }
  function toggleCat(cat: N99Category) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      if (next.size === 0) next.add(cat);
      return next;
    });
  }

  function start() {
    if (players.length < 3) return;
    const pool = N99_QUESTIONS.map((_, i) => i).filter((i) =>
      selected.has(N99_QUESTIONS[i].category)
    );
    setOrder(buildRound(pool));
    setIdx(0);
    setRecipient(null);
    setPhase("secret");
  }

  function pickRecipient(name: string) {
    setRecipient(name);
    setPhase("reveal");
  }

  function next() {
    if (idx >= order.length - 1) {
      setPhase("done");
      return;
    }
    setIdx((i) => i + 1);
    setRecipient(null);
    setPhase("secret");
  }

  function restart() {
    setPhase("setup");
    setIdx(0);
    setRecipient(null);
  }

  // ---------- SETUP ----------
  if (phase === "setup") {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-6">
        <div className="rounded-lg border bg-muted/30 p-4 text-sm space-y-2">
          <p className="font-display tracking-wider text-base">So geht's</p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Du liest die Karte <strong className="text-foreground">leise</strong> und wählst die Person,
            auf die das am ehesten zutrifft. Sie liest dann
            <strong className="text-foreground"> laut vor</strong> und
            <strong className="text-foreground"> trinkt</strong> – alle 20 Fragen einen Schluck mehr.
            Pro Runde immer 99 Fragen.
          </p>
        </div>

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
                  onClick={() => removePlayer(i)}
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
            {ALL_CATS.map((c) => {
              const on = selected.has(c);
              return (
                <button
                  key={c}
                  onClick={() => toggleCat(c)}
                  className={`p-3 rounded-lg border-2 text-left transition ${
                    on
                      ? "border-primary bg-primary/15"
                      : "border-border bg-muted/30 opacity-60"
                  }`}
                >
                  <div className="text-2xl mb-1">{N99_CATEGORY_EMOJI[c]}</div>
                  <div className="text-sm font-display tracking-wider">
                    {N99_CATEGORY_LABEL[c]}
                  </div>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Pool: {filteredCount} unterschiedliche Fragen · pro Runde immer 99
          </p>
        </div>

        <Button
          onClick={start}
          disabled={players.length < 3}
          className="w-full"
          size="lg"
        >
          <Shuffle className="w-4 h-4 mr-2" /> Los geht's
        </Button>
      </Card>
    );
  }

  // ---------- DONE ----------
  if (phase === "done") {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-5 text-center">
        <div className="text-5xl">🏁</div>
        <h2 className="text-2xl font-display tracking-wider">Alle 99 Fragen durch!</h2>
        <p className="text-sm text-muted-foreground">
          Ihr habt es bis zum Ende geschafft. Auf euch! 🍻
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={restart}>
            <RotateCw className="w-4 h-4 mr-2" /> Setup
          </Button>
          <Button onClick={start}>
            <Shuffle className="w-4 h-4 mr-2" /> Neue Runde
          </Button>
        </div>
      </Card>
    );
  }

  const q = N99_QUESTIONS[order[idx]];
  const round = idx + 1;
  const sips = sipsForRound(round);
  const isLast = idx >= order.length - 1;

  // ---------- SECRET ----------
  if (phase === "secret") {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-5">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="py-1">
            {N99_CATEGORY_EMOJI[q.category]} {N99_CATEGORY_LABEL[q.category]}
          </Badge>
          <div className="text-xs text-muted-foreground">
            Frage {round} / {order.length}
          </div>
        </div>

        <div
          key={`s-${idx}`}
          className="min-h-[200px] rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent p-6 flex flex-col items-center justify-center text-center animate-scale-in gap-4"
        >
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            🤫 Leise lesen
          </div>
          <p className="text-xl md:text-2xl font-display tracking-wide leading-snug">
            {q.text}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-center text-sm font-display tracking-wider">
            An wen gibst du das Handy? 📲
          </p>
          <div className="grid grid-cols-2 gap-2">
            {players.map((p) => (
              <button
                key={p}
                onClick={() => pickRecipient(p)}
                className="p-3 rounded-lg border-2 border-border bg-muted/30 hover:border-primary hover:bg-primary/10 active:scale-95 transition text-sm font-display tracking-wide"
              >
                {p}
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Diese Person trinkt{" "}
            <strong className="text-foreground">
              {sips} Schluck{sips === 1 ? "" : "e"}
            </strong>
            .
          </p>
        </div>

        <button
          onClick={restart}
          className="w-full text-xs text-muted-foreground hover:text-foreground transition"
        >
          ← Zurück zum Setup
        </button>
      </Card>
    );
  }

  // ---------- REVEAL ----------
  return (
    <Card className="p-6 bg-card/80 backdrop-blur space-y-5">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="py-1">
          {N99_CATEGORY_EMOJI[q.category]} {N99_CATEGORY_LABEL[q.category]}
        </Badge>
        <div className="text-xs text-muted-foreground">
          Frage {round} / {order.length}
        </div>
      </div>

      <div className="rounded-lg border-2 border-accent/40 bg-accent/10 p-3 text-center">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Liest vor & trinkt
        </div>
        <div className="font-display tracking-wider text-lg">📣 {recipient}</div>
      </div>

      <div
        key={`r-${idx}`}
        className="min-h-[200px] rounded-2xl border-2 border-accent/50 bg-gradient-to-br from-accent/25 via-primary/15 to-transparent p-6 flex flex-col items-center justify-center text-center animate-scale-in gap-4"
      >
        <p className="text-xl md:text-2xl font-display tracking-wide leading-snug">
          {q.text}
        </p>
      </div>

      <div className="rounded-xl border-2 border-primary/40 bg-primary/10 p-4 text-center">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {recipient} trinkt
        </div>
        <div className="text-4xl font-display tracking-wider mt-1">🍺 {sips}</div>
        <div className="text-xs text-muted-foreground mt-1">
          Schluck{sips === 1 ? "" : "e"}
        </div>
      </div>

      <Button onClick={next} className="w-full" size="lg">
        {isLast ? (
          <>
            <RotateCw className="w-4 h-4 mr-2" /> Spiel beenden
          </>
        ) : (
          <>
            Nächste Karte <ChevronRight className="w-4 h-4 ml-1" />
          </>
        )}
      </Button>

      <button
        onClick={restart}
        className="w-full text-xs text-muted-foreground hover:text-foreground transition"
      >
        ← Zurück zum Setup
      </button>
    </Card>
  );
}
