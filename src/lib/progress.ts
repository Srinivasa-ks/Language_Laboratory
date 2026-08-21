import {
  CONSONANTS,
  DIPHTHONGS,
  PHONEMES,
  TOTAL_PAIRS,
  TOTAL_SENTENCES,
  TOTAL_WORDS,
  TRIPHTHONGS,
  VOWELS,
  type LevelId,
  type Phoneme,
} from "../data/phonemes";

export type ChecksMap = Record<string, boolean>;
export type AllProgress = Record<string, ChecksMap>;

const KEY = "phonelab-progress-v2";
const LEGACY_KEY = "phonelab-checks-v1";

export function loadAllProgress(): AllProgress {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as AllProgress) : {};
    const store = parsed && typeof parsed === "object" ? parsed : {};
    // one-time migration of the pre-account progress blob into the guest ledger
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy && !store["guest"]) {
      try {
        const old = JSON.parse(legacy) as ChecksMap;
        if (old && typeof old === "object") store["guest"] = old;
      } catch {
        /* ignore malformed legacy data */
      }
      localStorage.removeItem(LEGACY_KEY);
    }
    return store;
  } catch {
    return {};
  }
}

export function saveAllProgress(all: AllProgress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* private mode — progress stays in memory for this session */
  }
}

export const soundTotal = (p: Phoneme) =>
  (p.pairs?.length ?? 0) + p.words.length + p.sentences.length;

export function doneForSound(checks: ChecksMap, p: Phoneme): number {
  let n = 0;
  const count = (lvl: LevelId, len: number) => {
    for (let i = 0; i < len; i++) if (checks[`${p.id}:${lvl}:${i}`]) n++;
  };
  count("syll", p.pairs?.length ?? 0);
  count("word", p.words.length);
  count("sent", p.sentences.length);
  return n;
}

export interface LabStats {
  totalDone: number;
  totalAll: number;
  byLevel: Record<LevelId, { done: number; total: number }>;
  soundsCovered: number;
  soundsTotal: number;
  categories: { title: string; hex: string; done: number; total: number; ids: string[] }[];
  mastered: Phoneme[];
  next: { phoneme: Phoneme; level: LevelId; done: number; total: number } | null;
}

export function computeStats(checks: ChecksMap): LabStats {
  const byLevel: LabStats["byLevel"] = {
    syll: { done: 0, total: TOTAL_PAIRS },
    word: { done: 0, total: TOTAL_WORDS },
    sent: { done: 0, total: TOTAL_SENTENCES },
  };
  let totalDone = 0;

  for (const [key, on] of Object.entries(checks)) {
    if (!on) continue;
    const lvl = key.split(":")[1] as LevelId;
    if (lvl in byLevel) {
      byLevel[lvl].done++;
      totalDone++;
    }
  }

  const covered = new Set<string>();
  const mastered: Phoneme[] = [];
  let next: LabStats["next"] = null;

  for (const p of PHONEMES) {
    const total = soundTotal(p);
    const done = doneForSound(checks, p);
    if (done > 0) covered.add(p.id);
    if (done >= total) mastered.push(p);
    if (!next && done < total) {
      const level: LevelId =
        (p.pairs?.length ?? 0) > 0 &&
        Array.from({ length: p.pairs?.length ?? 0 }, (_, i) => checks[`${p.id}:syll:${i}`]).some((v) => !v)
          ? "syll"
          : p.words.some((_, i) => !checks[`${p.id}:word:${i}`])
            ? "word"
            : "sent";
      next = { phoneme: p, level, done, total };
    }
  }

  const group = (title: string, hex: string, items: Phoneme[]) => ({
    title,
    hex,
    done: items.filter((p) => covered.has(p.id)).length,
    total: items.length,
    ids: items.map((p) => p.id),
  });

  return {
    totalDone,
    totalAll: TOTAL_PAIRS + TOTAL_WORDS + TOTAL_SENTENCES,
    byLevel,
    soundsCovered: covered.size,
    soundsTotal: PHONEMES.length,
    categories: [
      group("Vowels", "#0e7c6b", VOWELS),
      group("Diphthongs", "#a8720a", DIPHTHONGS),
      group("Triphthongs", "#0a8b9e", TRIPHTHONGS),
      group("Consonants", "#d24a2b", CONSONANTS),
    ],
    mastered,
    next,
  };
}

export function fmtDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
