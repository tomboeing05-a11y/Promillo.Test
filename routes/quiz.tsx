import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PlayerSetup } from "@/components/PlayerSetup";
import { QuizGame } from "@/components/QuizGame";
import { loadState, type SavedState, type QuizSettings } from "@/lib/storage";
import { HomeButton } from "@/components/HomeButton";
import { GameTitle, GameTitleInline } from "@/components/GameTitle";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Sauf-Quiz – Popkultur Trinkspiel" },
      { name: "description", content: "Lustige Popkultur-Quizfragen als Trinkspiel." },
      { property: "og:title", content: "Sauf-Quiz" },
      { property: "og:description", content: "Popkultur-Wissen oder Schluck nehmen." },
    ],
  }),
  component: QuizPage,
});

interface GameConfig {
  players: string[];
  settings: QuizSettings;
  resume?: SavedState | null;
}

function QuizPage() {
  const [game, setGame] = useState<GameConfig | null>(null);
  const [saved, setSaved] = useState<SavedState | null>(null);

  useEffect(() => {
    setSaved(loadState());
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <HomeButton confirm={game !== null} onConfirm={() => setGame(null)} />
        <GameTitleInline game="quiz" />
      </div>

      {game === null && (
        <div className="w-full max-w-3xl text-center mb-6 md:mb-8">
          <GameTitle game="quiz" size="xl" />
        </div>
      )}

      <div className="flex-1 w-full flex flex-col items-center justify-center">
        {game === null ? (
          <PlayerSetup
            hasSaved={!!saved}
            onResume={() =>
              saved &&
              setGame({
                players: saved.players,
                settings: saved.settings,
                resume: saved,
              })
            }
            onStart={(players, settings) => setGame({ players, settings, resume: null })}
          />
        ) : (
          <QuizGame
            players={game.players}
            settings={game.settings}
            resume={game.resume ?? null}
            onRestart={() => {
              setSaved(null);
              setGame(null);
            }}
            onHome={() => {
              setSaved(null);
              setGame(null);
            }}
          />
        )}
      </div>
    </main>
  );
}
