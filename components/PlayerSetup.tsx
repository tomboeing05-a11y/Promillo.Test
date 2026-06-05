import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus, PartyPopper, Play, Settings2 } from "lucide-react";
import { DEFAULT_QUIZ_SETTINGS, type QuizSettings } from "@/lib/storage";

interface Props {
  onStart: (players: string[], settings: QuizSettings) => void;
  hasSaved?: boolean;
  onResume?: () => void;
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          −
        </Button>
        <span className="font-display text-xl text-primary w-8 text-center">{value}</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +
        </Button>
      </div>
    </div>
  );
}

export function PlayerSetup({ onStart, hasSaved, onResume }: Props) {
  const [players, setPlayers] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [settings, setSettings] = useState<QuizSettings>(DEFAULT_QUIZ_SETTINGS);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = (k: keyof QuizSettings, v: number) =>
    setSettings((s) => ({ ...s, [k]: v }));

  const add = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = name.trim().slice(0, 30);
    if (!trimmed) return;
    if (players.includes(trimmed)) {
      setName("");
      return;
    }
    setPlayers((prev) => [...prev, trimmed]);
    setName("");
  };

  return (
    <Card className="p-6 md:p-8 max-w-md w-full bg-card/80 backdrop-blur border-border shadow-[var(--shadow-glow)]">
      <div className="text-center mb-6">
        <PartyPopper className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h2 className="text-2xl font-display tracking-wider">Wer spielt mit?</h2>
        <p className="text-sm text-muted-foreground mt-1">Mindestens 1 Spieler</p>
      </div>

      {hasSaved && onResume && (
        <Button
          onClick={onResume}
          variant="secondary"
          className="w-full mb-4 font-display tracking-wider"
          size="lg"
        >
          <Play className="w-4 h-4 mr-2" /> Letztes Spiel fortsetzen
        </Button>
      )}

      <form onSubmit={add} className="flex gap-2 mb-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name eingeben..."
          maxLength={30}
          className="bg-input"
        />
        <Button type="submit" variant="secondary" className="shrink-0">
          <Plus className="w-4 h-4 mr-1" /> Hinzu
        </Button>
      </form>

      <ul className="space-y-2 mb-6 min-h-[60px]">
        {players.map((p, i) => (
          <li
            key={p}
            className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2"
          >
            <span className="font-medium">
              <span className="text-primary mr-2">{i + 1}.</span>
              {p}
            </span>
            <button
              onClick={() => setPlayers(players.filter((x) => x !== p))}
              className="text-muted-foreground hover:text-destructive transition-colors"
              aria-label={`${p} entfernen`}
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </li>
        ))}
        {players.length === 0 && (
          <li className="text-center text-sm text-muted-foreground py-4">
            Noch keine Spieler hinzugefügt
          </li>
        )}
      </ul>

      <div className="space-y-3 mb-4">
        <Stepper
          label="Runden"
          value={settings.rounds}
          min={1}
          max={10}
          onChange={(n) => update("rounds", n)}
          hint={`= ${settings.rounds * settings.questionsPerPlayer} Fragen / Person`}
        />
        <Stepper
          label="Fragen pro Runde & Spieler"
          value={settings.questionsPerPlayer}
          min={1}
          max={10}
          onChange={(n) => update("questionsPerPlayer", n)}
        />
      </div>

      <button
        type="button"
        onClick={() => setShowAdvanced((s) => !s)}
        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mb-3"
      >
        <Settings2 className="w-3 h-3" />
        {showAdvanced ? "Weniger Optionen" : "Schlücke anpassen"}
      </button>

      {showAdvanced && (
        <div className="space-y-3 mb-6 p-3 rounded-lg bg-secondary/30">
          <Stepper
            label="Schlücke – Leicht"
            value={settings.sipsEasy}
            min={1}
            max={10}
            onChange={(n) => update("sipsEasy", n)}
          />
          <Stepper
            label="Schlücke – Mittel"
            value={settings.sipsMedium}
            min={1}
            max={10}
            onChange={(n) => update("sipsMedium", n)}
          />
          <Stepper
            label="Schlücke – Schwer"
            value={settings.sipsHard}
            min={1}
            max={10}
            onChange={(n) => update("sipsHard", n)}
          />
          <Stepper
            label="Schlücke bei falscher Antwort"
            value={settings.wrongSips}
            min={0}
            max={10}
            onChange={(n) => update("wrongSips", n)}
            hint="Selbst trinken"
          />
        </div>
      )}

      <Button
        onClick={() => onStart(players, settings)}
        disabled={players.length === 0}
        className="w-full font-display text-lg tracking-wider"
        size="lg"
      >
        Los geht's! 🍻
      </Button>
    </Card>
  );
}
