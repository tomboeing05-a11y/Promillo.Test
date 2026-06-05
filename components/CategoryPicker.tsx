import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CATEGORIES, type Category } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Props {
  round: number;
  initial: Category[];
  onConfirm: (cats: Category[]) => void;
}

export function CategoryPicker({ round, initial, onConfirm }: Props) {
  const [selected, setSelected] = useState<Set<Category>>(new Set(initial));

  const toggle = (c: Category) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  return (
    <Card className="p-6 md:p-8 max-w-md w-full bg-card/80 backdrop-blur shadow-[var(--shadow-glow)]">
      <p className="text-center text-xs uppercase tracking-wider text-muted-foreground">
        Runde {round}
      </p>
      <h2 className="text-2xl font-display tracking-wider text-center mb-1">Kategorien wählen</h2>
      <p className="text-center text-sm text-muted-foreground mb-6">
        Welche Themen sollen vorkommen?
      </p>

      <div className="grid gap-2 mb-6">
        {CATEGORIES.map((c) => {
          const on = selected.has(c.id);
          return (
            <button
              key={c.id}
              onClick={() => toggle(c.id)}
              className={cn(
                "flex items-center justify-between rounded-xl border-2 px-4 py-3 transition-all text-left",
                on
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/50",
              )}
            >
              <span className="flex items-center gap-3 font-medium">
                <span className="text-xl">{c.emoji}</span>
                {c.label}
              </span>
              {on && <Check className="w-5 h-5 text-primary" />}
            </button>
          );
        })}
      </div>

      <Button
        onClick={() => onConfirm(Array.from(selected))}
        disabled={selected.size === 0}
        className="w-full font-display tracking-wider"
        size="lg"
      >
        Runde starten 🍻
      </Button>
    </Card>
  );
}
