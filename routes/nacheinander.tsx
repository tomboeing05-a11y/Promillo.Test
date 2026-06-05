import { createFileRoute } from "@tanstack/react-router";
import { HomeButton } from "@/components/HomeButton";
import { NacheinanderGame } from "@/components/NacheinanderGame";
import { GameTitle, GameTitleInline } from "@/components/GameTitle";

export const Route = createFileRoute("/nacheinander")({
  head: () => ({
    meta: [
      { title: "Nacheinander – Trinkspiel" },
      { name: "description", content: "Reihum Begriffe zu einer Kategorie nennen." },
    ],
  }),
  component: NachPage,
});

function NachPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <HomeButton />
        <GameTitleInline game="nacheinander" />
      </div>
      <div className="w-full max-w-3xl text-center mb-6 md:mb-8">
        <GameTitle game="nacheinander" size="xl" />
      </div>
      <div className="w-full max-w-md">
        <NacheinanderGame />
      </div>
    </main>
  );
}

