import { createFileRoute } from "@tanstack/react-router";
import { HomeButton } from "@/components/HomeButton";
import { DuemmsterGame } from "@/components/DuemmsterGame";
import { GameTitle, GameTitleInline } from "@/components/GameTitle";

export const Route = createFileRoute("/duemmster")({
  head: () => ({
    meta: [
      { title: "Der Dümmste fliegt – Trinkspiel" },
      { name: "description", content: "Allgemeinwissensfragen – wer die dümmste Antwort gibt, verliert ein Leben." },
    ],
  }),
  component: DuemmsterPage,
});

function DuemmsterPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <HomeButton />
        <GameTitleInline game="duemmster" />
      </div>
      <div className="w-full max-w-3xl text-center mb-6 md:mb-8">
        <GameTitle game="duemmster" size="xl" />
      </div>
      <div className="w-full max-w-md">
        <DuemmsterGame />
      </div>
    </main>
  );
}
