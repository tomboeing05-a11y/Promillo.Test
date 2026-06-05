import { createFileRoute } from "@tanstack/react-router";
import { HomeButton } from "@/components/HomeButton";
import { PiciniGame } from "@/components/PiciniGame";
import { GameTitle, GameTitleInline } from "@/components/GameTitle";

export const Route = createFileRoute("/picini")({
  head: () => ({
    meta: [
      { title: "Picili – Karten-Trinkspiel" },
      { name: "description", content: "Schnelle Karten, freche Aufgaben und kalte Schlücke – Picili bringt jede Runde zum Kochen." },
      { property: "og:title", content: "Picili" },
      { property: "og:description", content: "Karten ziehen, Challenges meistern, Schlücke verteilen – das schnelle Partyspiel für jede Stimmung." },
    ],
  }),
  component: PiciniPage,
});

function PiciniPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <HomeButton />
        <GameTitleInline game="picili" />
      </div>
      <div className="w-full max-w-3xl text-center mb-6 md:mb-8">
        <GameTitle game="picili" size="xl" />
      </div>
      <div className="w-full max-w-md">
        <PiciniGame />
      </div>
    </main>
  );
}
