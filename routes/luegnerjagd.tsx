import { createFileRoute } from "@tanstack/react-router";
import { LuegnerjagdGame } from "@/components/LuegnerjagdGame";
export const Route = createFileRoute("/luegnerjagd")({
  head: () => ({ meta: [{ title: "Lügnerjagd – Promillo" }] }),
  component: () => (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center">
      <div className="w-full max-w-lg"><LuegnerjagdGame /></div>
    </div>
  ),
});
