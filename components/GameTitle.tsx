import { GAME_STYLES, type GameKey } from "@/lib/game-styles";

interface Props {
  game: GameKey;
  size?: "sm" | "md" | "lg" | "xl";
  withEmoji?: boolean;
  className?: string;
  animated?: boolean;
}

const SIZE: Record<NonNullable<Props["size"]>, string> = {
  sm: "text-xl sm:text-2xl md:text-3xl",
  md: "text-2xl sm:text-4xl md:text-5xl",
  lg: "text-3xl sm:text-5xl md:text-7xl",
  xl: "text-[2.25rem] leading-none sm:text-6xl md:text-8xl",
};

export function GameTitle({ game, size = "lg", withEmoji = true, className = "", animated = true }: Props) {
  const s = GAME_STYLES[game];
  return (
    <h1
      className={`leading-[0.95] tracking-wide select-none inline-block max-w-full break-words ${SIZE[size]} ${animated ? "animate-scale-in" : ""} ${className}`}
      style={{
        fontFamily: s.font,
        backgroundImage: s.gradient,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        WebkitTextStroke: "1.5px rgba(0,0,0,0.85)",
        paddingBottom: "0.12em",
        filter: `drop-shadow(0 3px 0 ${s.shadow}) drop-shadow(0 6px 10px rgba(0,0,0,0.25))`,
      }}
    >
      {s.title}
      {withEmoji && <span style={{ WebkitTextFillColor: "initial", WebkitTextStroke: "0", filter: "none", marginLeft: "0.3em" }}>{s.emoji}</span>}
    </h1>
  );
}

export function GameTitleInline({ game, className = "" }: { game: GameKey; className?: string }) {
  const s = GAME_STYLES[game];
  return (
    <span
      className={`text-base sm:text-lg md:text-xl truncate max-w-[60vw] ${className}`}
      style={{
        fontFamily: s.font,
        color: s.color,
        WebkitTextStroke: "1px rgba(0,0,0,0.7)",
        letterSpacing: "0.02em",
      }}
    >
      {s.title} {s.emoji}
    </span>
  );
}
