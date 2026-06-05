import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pause, Play, RotateCw, Users, ChevronLeft, X, Plus, Heart, Skull } from "lucide-react";

interface SimplePlayer { name: string; }

interface Props {
  round?: number | string;
  onResume: () => void;
  onSetup: () => void;
  onManage: () => void;
}

interface ManageProps {
  players: string[];
  setPlayers: (p: string[]) => void;
  newName: string;
  setNewName: (n: string) => void;
  onBack: () => void;
  minPlayers?: number;
}

interface ManageLifeProps {
  players: { name: string; lives: number; alive: boolean }[];
  setPlayers: (p: { name: string; lives: number; alive: boolean }[]) => void;
  startLives: number;
  newName: string;
  setNewName: (n: string) => void;
  onBack: () => void;
}

export function PauseScreen({ round, onResume, onSetup, onManage }: Props) {
  return (
    <Card className="p-6 bg-card/80 backdrop-blur space-y-5 text-center animate-scale-in">
      <div className="py-4">
        <Pause className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
        <h2 className="text-2xl font-display tracking-wider">Pause</h2>
        {round !== undefined && <p className="text-sm text-muted-foreground mt-1">Runde {round}</p>}
      </div>
      <div className="grid gap-2">
        <Button onClick={onResume} size="lg" className="w-full">
          <Play className="w-4 h-4 mr-2" /> Weiterspielen
        </Button>
        <Button onClick={onManage} variant="outline" className="w-full">
          <Users className="w-4 h-4 mr-2" /> Spieler verwalten
        </Button>
        <Button onClick={onSetup} variant="outline" className="w-full">
          <RotateCw className="w-4 h-4 mr-2" /> Zurück zum Setup
        </Button>
      </div>
    </Card>
  );
}

export function ManagePlayersScreen({ players, setPlayers, newName, setNewName, onBack, minPlayers = 2 }: ManageProps) {
  function add() {
    const n = newName.trim();
    if (!n || players.includes(n)) return;
    setPlayers([...players, n]);
    setNewName("");
  }
  return (
    <Card className="p-6 bg-card/80 backdrop-blur space-y-5 animate-scale-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}><ChevronLeft className="w-4 h-4" /></Button>
        <h2 className="text-xl font-display tracking-wider">Spieler verwalten</h2>
      </div>
      <div className="flex gap-2">
        <Input value={newName} onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Spieler hinzufügen" />
        <Button onClick={add} size="icon" variant="secondary"><Plus className="w-4 h-4" /></Button>
      </div>
      <div className="space-y-2">
        {players.map((p, i) => (
          <div key={i} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2">
            <span className="font-medium">{p}</span>
            <button onClick={() => { if (players.length <= minPlayers) return; setPlayers(players.filter((_, x) => x !== i)); }}
              className="text-muted-foreground hover:text-destructive transition-colors" disabled={players.length <= minPlayers}>
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {players.length <= minPlayers && <p className="text-xs text-muted-foreground text-center">Mind. {minPlayers} Spieler nötig.</p>}
      </div>
      <Button onClick={onBack} className="w-full"><ChevronLeft className="w-4 h-4 mr-2" /> Zurück zur Pause</Button>
    </Card>
  );
}
