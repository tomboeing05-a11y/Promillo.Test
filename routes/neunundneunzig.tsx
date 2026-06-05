import { createFileRoute } from "@tanstack/react-router";
import { HomeButton } from "@/components/HomeButton";
import { NeunundneunzigGame } from "@/components/NeunundneunzigGame";
import { GameTitle, GameTitleInline } from "@/components/GameTitle";

export const Route = createFileRoute("/neunundneunzig")({
  head: () => ({
    meta: [
      { title: "99 Fragen – Wer würde am ehesten?" },
      { name: "description", content: "Lies leise, gib das Handy weiter. Wer es bekommt, liest laut vor und trinkt – mit jeder Runde mehr." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <HomeButton />
        <GameTitleInline game="neunundneunzig" />
      </div>
      <div className="w-full max-w-3xl text-center mb-6 md:mb-8">
        <GameTitle game="neunundneunzig" size="xl" />
      </div>
      <div className="w-full max-w-md">
        <NeunundneunzigGame />
      </div>
    </main>
  );
}
