import { useEffect, useMemo, useState } from "react";
import { saveJSON, loadJSON } from "@/lib/persist";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Plus, Pause, Users, ChevronLeft, RotateCw, Shuffle, X } from "lucide-react";
import {
  FRAGEN99,
  FRAGEN99_CATEGORY_EMOJI,
  FRAGEN99_CATEGORY_LABEL,
  type Fragen99Category,
} from "@/lib/questions-neunundneunzig";

type Phase = "setup" | "play" | "pause" | "manage-players" | "done";

const ALL_CATS: Fragen99Category[] = ["classic", "action", "spicy", "deep"];
const STORAGE_KEY = "fragen99-setup-v1";

interface Saved {
  players: string[];
  cats: Fragen99Category[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Fragen99Game() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<string[]>(["Spieler 1", "Spieler 2", "Spieler 3"]);
  const [newName, setNewName] = useState("");
  const [pausedFrom, setPausedFrom] = useState<Phase>("play");
  const [manageNewName, setManageNewName] = useState("");
  const [selected, setSelected] = useState<Set<Fragen99Category>>(new Set(ALL_CATS));
  const [order, setOrder] = useState<number[]>([]);
  const [idx, setIdx] = useState(0);
  const [readerIdx, setReaderIdx] = useState(0);

  // Persist setup
  useEffect(() => {
    const s = loadJSON<Saved>(STORAGE_KEY);
    if (s?.players?.length) setPlayers(s.players);
    if (s?.cats?.length) setSelected(new Set(s.cats));
  }, []);
  useEffect(() => {
    saveJSON<Saved>(STORAGE_KEY, { players, cats: Array.from(selected) });
  }, [players, selected]);

  const filteredCount = useMemo(
    () => FRAGEN99.filter((q) => selected.has(q.category)).length,
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
  function toggleCat(cat: Fragen99Category) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      if (next.size === 0) next.add(cat);
      return next;
    });
  }

  function start() {
    if (players.length < 2) return;
    const indices = FRAGEN99.map((_, i) => i).filter((i) =>
      selected.has(FRAGEN99[i].category)
    );
    setOrder(shuffle(indices));
    setIdx(0);
    setReaderIdx(Math.floor(Math.random() * players.length));
    setPhase("play");
  }

  function next() {
    if (idx >= order.length - 1) {
      setPhase("done");
      return;
    }
    setIdx((i) => i + 1);
    setReaderIdx((r) => (r + 1) % players.length);
  }

  function restart() {
    setPhase("setup");
    setIdx(0);
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
                  onClick={() => removePlayer(i)}
                  className="ml-1 opacity-60 hover:opacity-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          {players.length < 2 && (
            <p className="text-xs text-muted-foreground mt-2">Mind. 2 Spieler nötig.</p>
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
                  <div className="text-2xl mb-1">{FRAGEN99_CATEGORY_EMOJI[c]}</div>
                  <div className="text-sm font-display tracking-wider">
                    {FRAGEN99_CATEGORY_LABEL[c]}
                  </div>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {filteredCount} Fragen ausgewählt
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 text-sm space-y-2">
          <p className="font-display tracking-wider text-base">So geht's</p>
          <p className="text-muted-foreground text-xs">
            Der angezeigte Spieler liest die Karte laut vor. Alle, auf die sie zutrifft,
            <strong className="text-foreground"> trinken</strong>. Danach geht das Handy an den
            nächsten Spieler weiter.
          </p>
        </div>

        <Button
          onClick={start}
          disabled={players.length < 2}
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
        <h2 className="text-2xl font-display tracking-wider">Alle 99 durch!</h2>
        <p className="text-sm text-muted-foreground">
          Respekt – ihr habt es bis ans Ende geschafft. Auf euch! 🍻
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

  // ---------- PLAY ----------
  const q = FRAGEN99[order[idx]];
  const reader = players[readerIdx];
  const isLast = idx >= order.length - 1;

  return (
    <Card className="p-6 bg-card/80 backdrop-blur space-y-5">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="py-1">
          {FRAGEN99_CATEGORY_EMOJI[q.category]} {FRAGEN99_CATEGORY_LABEL[q.category]}
        </Badge>
        <div className="text-xs text-muted-foreground">
          {idx + 1} / {order.length}
        </div>
      </div>

      <div className="rounded-lg border-2 border-accent/40 bg-accent/10 p-3 text-center">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Liest vor
        </div>
        <div className="font-display tracking-wider text-lg">📣 {reader}</div>
      </div>

      <div
        key={idx}
        className="min-h-[200px] rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent p-6 flex items-center justify-center text-center animate-scale-in"
      >
        <p className="text-xl md:text-2xl font-display tracking-wide leading-snug">
          {q.text}
        </p>
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
