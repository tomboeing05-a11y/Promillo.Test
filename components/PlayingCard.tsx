import { Card, SUIT_COLOR, SUIT_SYMBOL } from "@/lib/poker-cards";
import { cn } from "@/lib/utils";

interface Props {
  card?: Card | null;
  faceDown?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  delay?: number;
}

const SIZES = {
  xs: { box: "w-8 h-11", corner: "text-[9px]", suit: "text-[9px]", center: "text-lg" },
  sm: { box: "w-10 h-14", corner: "text-[10px]", suit: "text-[10px]", center: "text-2xl" },
  md: { box: "w-14 h-20", corner: "text-xs", suit: "text-xs", center: "text-4xl" },
  lg: { box: "w-20 h-28", corner: "text-sm", suit: "text-sm", center: "text-6xl" },
  xl: { box: "w-28 h-40", corner: "text-lg", suit: "text-lg", center: "text-8xl" },
};

export function PlayingCard({ card, faceDown, size = "md", className, delay = 0 }: Props) {
  const s = SIZES[size];

  if (faceDown || !card) {
    return (
      <div
        className={cn(
          s.box,
          "relative rounded-md shadow-lg animate-in fade-in zoom-in-50 bg-white p-[2px]",
          className,
        )}
        style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
      >
        <div className="w-full h-full rounded-[5px] bg-gradient-to-br from-red-700 via-red-800 to-red-950 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-[6px] rounded-sm border border-white/30 bg-[repeating-linear-gradient(45deg,_transparent_0,_transparent_3px,_rgba(255,255,255,0.08)_3px,_rgba(255,255,255,0.08)_6px),repeating-linear-gradient(-45deg,_transparent_0,_transparent_3px,_rgba(255,255,255,0.08)_3px,_rgba(255,255,255,0.08)_6px)]" />
          <div className="relative w-1/2 h-1/2 rounded-full border border-white/40 bg-red-900/50 flex items-center justify-center">
            <span className="text-white/70 font-display tracking-widest text-[10px]">♠♥</span>
          </div>
        </div>
      </div>
    );
  }

  const color = SUIT_COLOR[card.s];
  const symbol = SUIT_SYMBOL[card.s];

  return (
    <div
      className={cn(
        s.box,
        "relative rounded-md bg-white shadow-lg animate-in fade-in zoom-in-50 overflow-hidden border border-zinc-300",
        className,
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {/* top-left corner */}
      <div className={cn("absolute top-0.5 left-1 flex flex-col items-center leading-none font-display", color)}>
        <span className={s.corner}>{card.r}</span>
        <span className={s.suit}>{symbol}</span>
      </div>
      {/* bottom-right corner (rotated) */}
      <div className={cn("absolute bottom-0.5 right-1 flex flex-col items-center leading-none font-display rotate-180", color)}>
        <span className={s.corner}>{card.r}</span>
        <span className={s.suit}>{symbol}</span>
      </div>
      {/* center pip */}
      <div className={cn("absolute inset-0 flex items-center justify-center font-display leading-none", color, s.center)}>
        {symbol}
      </div>
    </div>
  );
}
