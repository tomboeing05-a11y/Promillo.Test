import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import imgPicili from "@/assets/game-picili.png";
import imgPoker from "@/assets/game-poker.png";
import imgNacheinander from "@/assets/game-nacheinander.png";
import imgImposter from "@/assets/game-imposter.png";
import imgQuiz from "@/assets/game-quiz.png";
import imgDuemmster from "@/assets/game-duemmster.png";
import imgFragen99 from "@/assets/game-99fragen.jpg";
import imgNeunundneunzig from "@/assets/game-neunundneunzig.jpg";
import imgLuegnerjagd from "@/assets/game-luegnerjagd.jpg";
import imgDarkCases from "@/assets/game-darkcases.jpg";
import promilloLogo from "@/assets/promillo-logo.png";
import { GAME_STYLES, type GameKey } from "@/lib/game-styles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trinkspiel-Hub – Bierionär, Imposter, Picili & mehr" },
      { name: "description", content: "Wähle ein Trinkspiel: Bierionär, Imposter, Picili, Poker & mehr." },
      { property: "og:title", content: "Trinkspiel-Hub" },
      { property: "og:description", content: "Lustige Trinkspiele für deinen Abend." },
    ],
  }),
  component: Hub,
});

const games: { key: GameKey; to: string; desc: string; img: string; gradient: string }[] = [
  {
    key: "quiz",
    to: "/quiz",
    desc: "Popkultur, Fußball & mehr. Falsch geantwortet? Schluck!",
    img: imgQuiz,
    gradient: "from-yellow-300/60 via-orange-300/30 to-transparent",
  },
  {
    key: "imposter",
    to: "/imposter",
    desc: "Alle haben dasselbe Wort – einer nicht. Finde ihn!",
    img: imgImposter,
    gradient: "from-pink-400/60 via-fuchsia-300/30 to-transparent",
  },
  {
    key: "nacheinander",
    to: "/nacheinander",
    desc: "Kategorie ziehen, reihum Begriffe nennen. Wer hängt, trinkt.",
    img: imgNacheinander,
    gradient: "from-cyan-300/60 via-sky-300/30 to-transparent",
  },
  {
    key: "picili",
    to: "/picini",
    desc: "Karten ziehen, Challenges meistern: Klassisch, Hausparty, Hot & Spicy.",
    img: imgPicili,
    gradient: "from-purple-400/60 via-pink-300/30 to-transparent",
  },
  {
    key: "poker",
    to: "/poker",
    desc: "Runout-Gerät als Board, jeder Spieler am eigenen Handy.",
    img: imgPoker,
    gradient: "from-emerald-300/60 via-teal-300/30 to-transparent",
  },
  {
    key: "duemmster",
    to: "/duemmster",
    desc: "Allgemeinwissen mit Potenzial für dumme Antworten. Wer am dümmsten antwortet, verliert ein Leben.",
    img: imgDuemmster,
    gradient: "from-orange-400/60 via-red-300/30 to-transparent",
  },
  {
    key: "fragen99",
    to: "/fragen99",
    desc: "Karten lesen, betroffen sein, trinken. Heb die Schere, wenn's passt!",
    img: imgFragen99,
    gradient: "from-pink-400/60 via-fuchsia-300/30 to-transparent",
  },
  {
    key: "neunundneunzig",
    to: "/neunundneunzig",
    desc: "Leise lesen, Handy weitergeben. Wer's bekommt, liest laut vor und trinkt – progressiv.",
    img: imgNeunundneunzig,
    gradient: "from-purple-400/60 via-violet-300/30 to-transparent",
  },
  {
    key: "luegnerjagd",
    to: "/luegnerjagd",
    desc: "Einer bekommt eine andere Frage. Findet den Lügner!",
    img: imgLuegnerjagd,
    gradient: "from-yellow-300/60 via-red-300/30 to-transparent",
  },
  {
    key: "darkcases",
    to: "/darkcases",
    desc: "Rätsel lösen durch Ja/Nein-Fragen. Falsche Frage? Schluck!",
    img: imgDarkCases,
    gradient: "from-slate-600/60 via-slate-800/30 to-transparent",
  },
];

function Hub() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <header className="text-center mb-10">
        <img
          src={promilloLogo}
          alt="Promillo Trinkspiele – Wer verliert, der trinkt"
          className="w-64 md:w-80 mx-auto float-soft drop-shadow-[0_10px_30px_rgba(255,120,80,0.35)]"
        />
        <p className="text-muted-foreground text-sm md:text-base mt-2">Wähle dein Spiel 🍻</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 w-full max-w-4xl">
        {games.map((g) => {
          const s = GAME_STYLES[g.key];
          return (
            <Link key={g.to} to={g.to}>
              <Card className="group relative overflow-hidden p-0 bg-card/90 backdrop-blur border-2 border-border/60 shadow-[var(--shadow-pop)] hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98] transition-all cursor-pointer h-full rounded-3xl">
                <div className="relative aspect-[16/9] overflow-hidden bg-white">
                  <div className={`absolute inset-0 bg-gradient-to-br ${g.gradient} pointer-events-none z-10`} />
                  <img
                    src={g.img}
                    alt={s.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="relative p-5">
                  <h2
                    className="text-2xl md:text-3xl mb-1.5 leading-tight"
                    style={{
                      fontFamily: s.font,
                      backgroundImage: s.gradient,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(0,0,0,0.85)",
                      filter: `drop-shadow(0 3px 0 ${s.shadow})`,
                    }}
                  >
                    {s.title}
                  </h2>
                  <p className="text-sm text-foreground/80">{g.desc}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <footer className="mt-12 text-xs text-muted-foreground text-center">
        Bitte verantwortungsbewusst trinken. Ab 18.
      </footer>
    </main>
  );
}
