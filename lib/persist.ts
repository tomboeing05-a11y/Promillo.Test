// Generischer Cookie-Speicher pro Spiel/Schlüssel
const MAX_AGE_DAYS = 30;

export function saveJSON<T>(key: string, value: T) {
  if (typeof document === "undefined") return;
  try {
    const json = encodeURIComponent(JSON.stringify(value));
    const maxAge = MAX_AGE_DAYS * 24 * 60 * 60;
    document.cookie = `${key}=${json}; max-age=${maxAge}; path=/; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function loadJSON<T>(key: string): T | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${key}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1])) as T;
  } catch {
    return null;
  }
}

export function clearJSON(key: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${key}=; max-age=0; path=/; SameSite=Lax`;
}
