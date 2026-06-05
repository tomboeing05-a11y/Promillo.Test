import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HomeButton } from "@/components/HomeButton";
import { ImposterGame } from "@/components/ImposterGame";
import { ImposterOnline } from "@/components/ImposterOnline";
import { Button } from "@/components/ui/button";
import { Smartphone, Wifi } from "lucide-react";
import { GameTitle, GameTitleInline } from "@/components/GameTitle";

export const Route = createFileRoute("/imposter")({
  head: () => ({
    meta: [
      { title: "Imposter – Trinkspiel" },
      { name: "description", content: "Finde den Imposter unter euch. Lokal oder online." },
    ],
  }),
  component: ImposterPage,
});

type Mode = "choose" | "local" | "online";

function ImposterPage() {
  const [mode, setMode] = useState<Mode>("choose");

  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <HomeButton />
        <GameTitleInline game="imposter" />
      </div>
      {mode === "choose" && (
        <div className="w-full max-w-3xl text-center mb-6 md:mb-8">
          <GameTitle game="imposter" size="xl" />
        </div>
      )}
      <div className="w-full max-w-md">
        {mode === "choose" && (
          <div className="grid gap-3">
            <button
              onClick={() => setMode("local")}
              className="group relative overflow-hidden rounded-lg border border-border bg-card/80 backdrop-blur p-6 text-left hover:border-primary transition"
            >
              <Smartphone className="w-8 h-8 text-primary mb-2" />
              <h2 className="text-xl font-display tracking-wider mb-1">Ein Handy</h2>
              <p className="text-sm text-muted-foreground">
                Handy wird herumgereicht. Klassisch.
              </p>
            </button>
            <button
              onClick={() => setMode("online")}
              className="group relative overflow-hidden rounded-lg border border-border bg-card/80 backdrop-blur p-6 text-left hover:border-accent transition"
            >
              <Wifi className="w-8 h-8 text-accent mb-2" />
              <h2 className="text-xl font-display tracking-wider mb-1">Online-Lobby</h2>
              <p className="text-sm text-muted-foreground">
                Jeder am eigenen Handy – per Code beitreten.
              </p>
            </button>
          </div>
        )}

        {mode === "local" && (
          <div className="space-y-3">
            <Button variant="ghost" size="sm" onClick={() => setMode("choose")}>
              ← Modus wechseln
            </Button>
            <ImposterGame />
          </div>
        )}

        {mode === "online" && <ImposterOnline onExit={() => setMode("choose")} />}
      </div>
    </main>
  );
}
