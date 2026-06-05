// Freundlicher kleiner "Pop"-Sound bei Klicks via WebAudio (kein Asset nötig)
let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      const Ctor =
        (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
          .AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctor) ctx = new Ctor();
    } catch {
      return null;
    }
  }
  return ctx;
}

export function setMuted(v: boolean) {
  muted = v;
}

export function playClick(opts: { freq?: number; type?: "pop" | "soft" | "success" } = {}) {
  if (muted) return;
  const ac = getCtx();
  if (!ac) return;
  try {
    if (ac.state === "suspended") void ac.resume();
    const now = ac.currentTime;
    const type = opts.type ?? "pop";

    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);

    if (type === "soft") {
      // Warmer "boop" – tief, weich
      osc.type = "sine";
      osc.frequency.setValueAtTime(opts.freq ?? 440, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.18);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.1, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === "success") {
      // Fröhliches Zwei-Ton Chime (C → E → G)
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((f, i) => {
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.type = "triangle";
        o.frequency.setValueAtTime(f, now + i * 0.08);
        g.gain.setValueAtTime(0.0001, now + i * 0.08);
        g.gain.exponentialRampToValueAtTime(0.14, now + i * 0.08 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.28);
        o.connect(g); g.connect(ac.destination);
        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.3);
      });
    } else {
      // Freundlicher "Bubble Pop" – kurzer, runder Ton mit Wackel
      osc.type = "sine";
      const base = opts.freq ?? 660;
      osc.frequency.setValueAtTime(base * 0.9, now);
      osc.frequency.exponentialRampToValueAtTime(base * 1.25, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(base * 0.85, now + 0.14);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.11, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.18);
    }
  } catch {
    /* ignore */
  }
}
