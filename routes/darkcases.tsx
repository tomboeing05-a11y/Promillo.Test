import { createFileRoute } from "@tanstack/react-router";
import { DarkCasesGame } from "@/components/DarkCasesGame";

export const Route = createFileRoute("/darkcases")({
  head: () => ({
    meta: [{ title: "Dark Cases – Promillo" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-start">
      <div className="w-full max-w-lg">
        <DarkCasesGame />
      </div>
    </div>
  ),
});
