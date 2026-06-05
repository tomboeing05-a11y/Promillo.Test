import { createFileRoute } from "@tanstack/react-router";
import { HomeButton } from "@/components/HomeButton";
import { Fragen99Game } from "@/components/Fragen99Game";
import { GameTitle, GameTitleInline } from "@/components/GameTitle";

export const Route = createFileRoute("/fragen99")({
  head: () => ({
    meta: [
      { title: "99 Fragen – Trinkspiel" },
      { name: "description", content: "99 Fragen-Karten im Stil von 100 Fragen. Wer betroffen ist, trinkt." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <HomeButton />
        <GameTitleInline game="fragen99" />
      </div>
      <div className="w-full max-w-3xl text-center mb-6 md:mb-8">
        <GameTitle game="fragen99" size="xl" />
      </div>
      <div className="w-full max-w-md">
        <Fragen99Game />
      </div>
    </main>
  );
}
