import { useEffect, useState } from "react";
import { saveJSON, loadJSON } from "@/lib/persist";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, X, Shuffle, Pause, Users, ChevronLeft, RotateCw, Crown, ChevronRight, SkipForward } from "lucide-react";
import {
  NACH_CATEGORIES,
  pickRandomCategory,
  type NachCategory,
} from "@/lib/nacheinander-categories";

type Phase = "setup" | "round" | "pause" | "manage-players";
type Diff = "all" | "easy" | "medium" | "hard";

const STORAGE_KEY = "nacheinander-setup-v1";
interface NachSaved { players: string[]; diff: Diff }

export function NacheinanderGame() {
  const [players, setPlayers] = useState<string[]>(["Spieler 1", "Spieler 2", "Spieler 3"]);
  const [newName, setNewName] = useState("");
  const [pausedFrom, setPausedFrom] = useState<Phase>("play");
  const [manageNewName, setManageNewName] = useState("");
  const [diff, setDiff] = useState<Diff>("all");
  const [phase, setPhase] = useState<Phase>("setup");
  const [cat, setCat] = useState<NachCategory | null>(null);
  const [starterIdx, setStarterIdx] = useState(0);
  const [used, setUsed] = useState<string[]>([]);

  useEffect(() => {
    const s = loadJSON<NachSaved>(STORAGE_KEY);
    if (s?.players?.length) setPlayers(s.players);
    if (s?.diff) setDiff(s.diff);
  }, []);
  useEffect(() => {
    saveJSON<NachSaved>(STORAGE_KEY, { players, diff });
  }, [players, diff]);

  function addPlayer() {
    const n = newName.trim();
    if (!n || players.includes(n)) return;
    setPlayers([...players, n]);
    setNewName("");
  }

  function nextCategory() {
    const pool =
      diff === "all"
        ? NACH_CATEGORIES
        : NACH_CATEGORIES.filter((c) => c.difficulty === diff);
    const fresh = pool.filter((c) => !used.includes(c.id));
    const arr = fresh.length > 0 ? fresh : pool;
    const next = arr[Math.floor(Math.random() * arr.length)];
    setCat(next);
    setUsed((u) => (fresh.length > 0 ? [...u, next.id] : [next.id]));
    setStarterIdx(Math.floor(Math.random() * players.length));
  }

  function startGame() {
    if (players.length < 2) return;
    nextCategory();
    setPhase("round");
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
          {players.length < 2 && (
            <p className="text-xs text-muted-foreground mt-2">Mind. 2 Spieler nötig.</p>
          )}
        </div>

        <div>
          <Label className="text-base mb-2 block">Schwierigkeit</Label>
          <div className="grid grid-cols-4 gap-2">
            {(["all", "easy", "medium", "hard"] as Diff[]).map((d) => (
              <button
                key={d}
                onClick={() => setDiff(d)}
                className={`p-2 rounded-md border text-xs transition ${
                  diff === d
                    ? "border-primary bg-primary/15"
                    : "border-border bg-muted/30 opacity-60"
                }`}
              >
                {d === "all" ? "Alle" : d === "easy" ? "Leicht" : d === "medium" ? "Mittel" : "Schwer"}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 text-sm space-y-2">
          <p className="font-display tracking-wider text-base">So geht's</p>
          <p className="text-muted-foreground text-xs">
            Die Website zieht eine Kategorie. Beginnend beim Startspieler nennt jeder reihum
            <strong className="text-foreground"> einen passenden Begriff</strong>. Wer zu lange
            zögert, einen Begriff doppelt nennt oder daneben liegt: <strong className="text-foreground">trinken!</strong>
          </p>
        </div>

        <Button onClick={startGame} disabled={players.length < 2} className="w-full" size="lg">
          <Shuffle className="w-4 h-4 mr-2" /> Los geht's
        </Button>
      </Card>
    );
  }

  // ---------- ROUND ----------
  if (phase === "round" && cat) {
    const starter = players[starterIdx];
    return (
      <Card className="p-6 bg-card/80 backdrop-blur space-y-5">
        <div className="text-center space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-widest">
            Kategorie
          </div>
          <div className="text-5xl mb-1">{cat.emoji}</div>
          <h2 className="text-3xl font-display tracking-wider">{cat.label}</h2>
          <Badge variant="outline" className="mt-1">
            {cat.difficulty === "easy" ? "Leicht" : cat.difficulty === "medium" ? "Mittel" : "Schwer"}
          </Badge>
        </div>

        <div className="rounded-lg border-2 border-primary/40 bg-primary/10 p-4 text-center">
          <div className="text-xs text-muted-foreground mb-1">Beginnt</div>
          <div className="font-display tracking-wider text-2xl flex items-center justify-center gap-2">
            <Crown className="w-5 h-5 text-accent" />
            {starter}
          </div>
        </div>

        <div>
          <div className="text-xs text-muted-foreground mb-2">Reihenfolge</div>
          <div className="flex flex-wrap gap-2">
            {players.map((p, i) => {
              const order = (i - starterIdx + players.length) % players.length;
              return (
                <Badge key={i} variant="outline" className="py-1">
                  <span className="opacity-50 mr-1">{order + 1}.</span>
                  {p}
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="rounded-md border bg-muted/20 p-3 text-xs text-muted-foreground">
          <ChevronRight className="w-3 h-3 inline mr-1" />
          Wer hängt, sich wiederholt oder daneben liegt → <strong className="text-foreground">trinkt</strong>.
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => setPhase("setup")} variant="outline">
            <RotateCw className="w-4 h-4 mr-2" /> Setup
          </Button>
          <Button onClick={nextCategory}>
            <SkipForward className="w-4 h-4 mr-2" /> Nächste Kategorie
          </Button>
        </div>
      </Card>
    );
  }

  return null;
}
