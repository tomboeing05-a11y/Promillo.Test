import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HomeButton } from "@/components/HomeButton";
import { PokerRunout } from "@/components/PokerRunout";
import { PokerPlayer } from "@/components/PokerPlayer";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone } from "lucide-react";
import { GameTitle, GameTitleInline } from "@/components/GameTitle";

export const Route = createFileRoute("/poker")({
  head: () => ({
    meta: [
      { title: "Poker – Spielhelfer" },
      { name: "description", content: "Texas Hold'em Hilfsmittel: Runout-Gerät als Board, jeder Spieler am eigenen Handy." },
    ],
  }),
  component: PokerPage,
});

type Mode = "choose" | "runout" | "player";

function PokerPage() {
  const [mode, setMode] = useState<Mode>("choose");

  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-3xl flex items-center justify-between mb-4">
        <HomeButton />
        <GameTitleInline game="poker" />
      </div>
      {mode === "choose" && (
        <div className="w-full max-w-3xl text-center mb-6 md:mb-8">
          <GameTitle game="poker" size="xl" />
        </div>
      )}
      <div className="w-full max-w-3xl">
        {mode === "choose" && (
          <div className="grid gap-3 max-w-md mx-auto">
            <button
              onClick={() => setMode("runout")}
              className="group relative overflow-hidden rounded-lg border border-border bg-card/80 backdrop-blur p-6 text-left hover:border-primary transition"
            >
              <Monitor className="w-8 h-8 text-primary mb-2" />
              <h2 className="text-xl font-display tracking-wider mb-1">Runout-Gerät</h2>
              <p className="text-sm text-muted-foreground">
                Zentrales Tablet/Laptop. Zeigt Flop, Turn, River & Pot.
              </p>
            </button>
            <button
              onClick={() => setMode("player")}
              className="group relative overflow-hidden rounded-lg border border-border bg-card/80 backdrop-blur p-6 text-left hover:border-accent transition"
            >
              <Smartphone className="w-8 h-8 text-accent mb-2" />
              <h2 className="text-xl font-display tracking-wider mb-1">Spieler beitreten</h2>
              <p className="text-sm text-muted-foreground">
                Sieh deine Hole-Cards & setze direkt vom Handy.
              </p>
            </button>
          </div>
        )}

        {mode === "runout" && (
          <div className="space-y-3">
            <Button variant="ghost" size="sm" onClick={() => setMode("choose")}>
              ← Modus wechseln
            </Button>
            <PokerRunout onExit={() => setMode("choose")} />
          </div>
        )}

        {mode === "player" && (
          <div className="max-w-md mx-auto">
            <PokerPlayer onExit={() => setMode("choose")} />
          </div>
        )}
      </div>
    </main>
  );
}
