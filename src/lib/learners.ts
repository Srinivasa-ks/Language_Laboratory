/* ─────────────────────────────────────────────────────────────────────────────
   Learner profiles — offline-first, password-free.

   A profile is just { id, name, roll?, createdAt, lastSeen }. Identity is a
   stable locally-generated UUID, so two learners with the same name never
   share a progress ledger. Nothing leaves this browser: no server, no email,
   no phone, no password — by design.

   Storage keys are namespaced (phonelab-learners-v2 / -active-learner-v2) so
   a future teacher dashboard can live alongside with its own keys.
   ───────────────────────────────────────────────────────────────────────────── */

export interface Learner {
  id: string;
  name: string;
  /** Student ID / roll number — optional, purely a label. */
  roll?: string;
  createdAt: number;
  lastSeen: number;
}

const LEARNERS_KEY = "phonelab-learners-v2";
const ACTIVE_KEY = "phonelab-active-learner-v2";
export const GUEST_ID = "guest";

const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `lrn-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;

/* one-time tidy-up: the old password session pointer is meaningless now */
try {
  localStorage.removeItem("phonelab-session-v1");
} catch {
  /* storage unavailable — nothing to tidy */
}

/* ───────────── store ───────────── */
export function getLearners(): Learner[] {
  try {
    const raw = localStorage.getItem(LEARNERS_KEY);
    const parsed = raw ? (JSON.parse(raw) as Learner[]) : [];
    return Array.isArray(parsed) ? parsed.filter((l) => l && typeof l.id === "string") : [];
  } catch {
    return [];
  }
}

function saveLearners(list: Learner[]) {
  try {
    localStorage.setItem(LEARNERS_KEY, JSON.stringify(list));
  } catch {
    /* private mode — the session still works in memory */
  }
}

export function getLearnerById(id: string): Learner | undefined {
  return getLearners().find((l) => l.id === id);
}

export function displayNameFor(id: string): string {
  if (id === GUEST_ID) return "Guest";
  return getLearnerById(id)?.name ?? "Learner";
}

export function rollFor(id: string): string | undefined {
  if (id === GUEST_ID) return undefined;
  return getLearnerById(id)?.roll;
}

const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();

/**
 * Create a profile, or resume the existing one when the same name + student ID
 * returns on this device. Matching on both fields means two students who share
 * a name still get separate, never-overwriting ledgers.
 */
export function createOrResumeLearner(name: string, roll?: string): { learner: Learner; resumed: boolean } {
  const n = norm(name);
  const r = roll?.trim() ? roll.trim() : undefined;
  const list = getLearners();
  const existing = list.find((l) => norm(l.name) === n && (l.roll ?? "") === (r ?? ""));
  if (existing) {
    touchLearner(existing.id);
    return { learner: { ...existing, lastSeen: Date.now() }, resumed: true };
  }
  const learner: Learner = {
    id: makeId(),
    name: name.trim().replace(/\s+/g, " "),
    roll: r,
    createdAt: Date.now(),
    lastSeen: Date.now(),
  };
  saveLearners([...list, learner]);
  return { learner, resumed: false };
}

export function touchLearner(id: string) {
  if (id === GUEST_ID) return;
  saveLearners(getLearners().map((l) => (l.id === id ? { ...l, lastSeen: Date.now() } : l)));
}

export function removeLearner(id: string) {
  saveLearners(getLearners().filter((l) => l.id !== id));
  try {
    if (localStorage.getItem(ACTIVE_KEY) === id) localStorage.removeItem(ACTIVE_KEY);
  } catch {
    /* ignore */
  }
}

/* ───────────── active-learner session ───────────── */
export function getActiveLearner(): string | null {
  try {
    const id = localStorage.getItem(ACTIVE_KEY);
    if (!id) return null;
    if (id === GUEST_ID) return GUEST_ID;
    return getLearnerById(id) ? id : null;
  } catch {
    return null;
  }
}

export function setActiveLearner(id: string | null) {
  try {
    if (id) localStorage.setItem(ACTIVE_KEY, id);
    else localStorage.removeItem(ACTIVE_KEY);
  } catch {
    /* carry on without persistence */
  }
}
