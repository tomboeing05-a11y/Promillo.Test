export type Suit = "h" | "d" | "c" | "s";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K";
export interface Card { r: Rank; s: Suit }

const RANKS: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const SUITS: Suit[] = ["h", "d", "c", "s"];

export function freshDeck(): Card[] {
  const deck: Card[] = [];
  for (const s of SUITS) for (const r of RANKS) deck.push({ r, s });
  // Fisher-Yates
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export const SUIT_SYMBOL: Record<Suit, string> = { h: "♥", d: "♦", c: "♣", s: "♠" };
export const SUIT_COLOR: Record<Suit, string> = {
  h: "text-red-600",
  d: "text-red-600",
  c: "text-zinc-900",
  s: "text-zinc-900",
};
