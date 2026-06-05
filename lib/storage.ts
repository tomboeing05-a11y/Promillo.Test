// Cookie-Helpers für Spielfortschritt

const COOKIE_NAME = "sauf-quiz-state";
const MAX_AGE_DAYS = 30;

export interface QuizSettings {
  rounds: number;
  questionsPerPlayer: number; // pro Runde
  sipsEasy: number;
  sipsMedium: number;
  sipsHard: number;
  wrongSips: number; // wie viele Schlücke man bei falsch selbst trinkt
}

export const DEFAULT_QUIZ_SETTINGS: QuizSettings = {
  rounds: 3,
  questionsPerPlayer: 4,
  sipsEasy: 1,
  sipsMedium: 2,
  sipsHard: 3,
  wrongSips: 2,
};

export interface SavedState {
  players: string[];
  settings: QuizSettings;
  points: Record<string, number>;
  drinks: Record<string, number>;
  givenSips: Record<string, number>;
  round: number;
  playerIdx: number;
  questionInRound: number;
  askedIds: number[];
  currentId: number | null;
  categories: string[];
  doubleBonusUsed: Record<string, number>;
  pendingRevenge: string[];
  revengeUsed: string[];
}

export function saveState(state: SavedState) {
  if (typeof document === "undefined") return;
  try {
    const json = JSON.stringify(state);
    const maxAge = MAX_AGE_DAYS * 24 * 60 * 60;
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(json)}; max-age=${maxAge}; path=/; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function loadState(): SavedState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    const raw = decodeURIComponent(match.split("=")[1]);
    const parsed = JSON.parse(raw) as Partial<SavedState> & { rounds?: number };
    if (!parsed.players || !Array.isArray(parsed.players)) return null;
    // backwards compat
    const settings: QuizSettings = parsed.settings ?? {
      ...DEFAULT_QUIZ_SETTINGS,
      rounds: parsed.rounds ?? DEFAULT_QUIZ_SETTINGS.rounds,
    };
    return {
      players: parsed.players,
      settings,
      points: parsed.points ?? Object.fromEntries(parsed.players.map((p) => [p, 0])),
      drinks: parsed.drinks ?? Object.fromEntries(parsed.players.map((p) => [p, 0])),
      givenSips: parsed.givenSips ?? Object.fromEntries(parsed.players.map((p) => [p, 0])),
      round: parsed.round ?? 1,
      playerIdx: parsed.playerIdx ?? 0,
      questionInRound: parsed.questionInRound ?? 0,
      askedIds: parsed.askedIds ?? [],
      currentId: parsed.currentId ?? null,
      categories: parsed.categories ?? ["filme", "musik", "fussball", "allgemein", "gemischt"],
      doubleBonusUsed:
        parsed.doubleBonusUsed ?? Object.fromEntries(parsed.players.map((p) => [p, 0])),
      pendingRevenge: parsed.pendingRevenge ?? [],
      revengeUsed: parsed.revengeUsed ?? [],
    };
  } catch {
    return null;
  }
}

export function clearState() {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=; max-age=0; path=/; SameSite=Lax`;
}
