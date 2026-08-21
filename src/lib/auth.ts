export interface StoredUser {
  id: string;
  username: string;
  passHash: string;
  salt: string;
  createdAt: number;
  lastSeen: number;
}

export type AuthResult = { ok: true; user: StoredUser } | { ok: false; error: string };

const USERS_KEY = "phonelab-users-v1";
const SESSION_KEY = "phonelab-session-v1";
export const GUEST_ID = "guest";

/* ───────────── hashing (WebCrypto with a deterministic fallback) ───────────── */
async function digest(text: string): Promise<string> {
  try {
    if (crypto?.subtle) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
  } catch {
    /* fall through to FNV fallback */
  }
  // FNV-1a double pass — not cryptographically strong, but keeps accounts usable
  // in non-secure contexts where WebCrypto is unavailable.
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193 ^ 0x5bd1e995;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ ((c << 8) | (c >>> 8)), 0x5bd1e995) >>> 0;
  }
  return h1.toString(16).padStart(8, "0") + h2.toString(16).padStart(8, "0");
}

const makeSalt = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID().slice(0, 13)
    : `${Date.now().toString(36)}${Math.floor(Math.random() * 1e9).toString(36)}`;

const makeId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `u-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;

/* ───────────── user store ───────────── */
export function getUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? (JSON.parse(raw) as StoredUser[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* private mode — session continues in memory only */
  }
}

export function findUser(username: string): StoredUser | undefined {
  const name = username.trim().toLowerCase();
  return getUsers().find((u) => u.username.toLowerCase() === name);
}

export function getUserById(id: string): StoredUser | undefined {
  return getUsers().find((u) => u.id === id);
}

export function displayNameFor(id: string): string {
  if (id === GUEST_ID) return "Guest";
  return getUserById(id)?.username ?? "Learner";
}

const USERNAME_RE = /^[a-zA-Z0-9_.-]{3,16}$/;

export async function registerUser(username: string, password: string): Promise<AuthResult> {
  const name = username.trim();
  if (!USERNAME_RE.test(name)) {
    return {
      ok: false,
      error: "Pick a name of 3–16 letters, numbers, dots, dashes or underscores.",
    };
  }
  if (password.length < 4) {
    return { ok: false, error: "Password needs at least 4 characters." };
  }
  if (findUser(name)) {
    return { ok: false, error: `“${name}” is already registered — sign in instead.` };
  }
  const salt = makeSalt();
  const passHash = await digest(`${salt}::${password}`);
  const user: StoredUser = {
    id: makeId(),
    username: name,
    passHash,
    salt,
    createdAt: Date.now(),
    lastSeen: Date.now(),
  };
  saveUsers([...getUsers(), user]);
  return { ok: true, user };
}

export async function loginUser(username: string, password: string): Promise<AuthResult> {
  const user = findUser(username);
  if (!user) {
    return { ok: false, error: "No account found for that name — create one below." };
  }
  const passHash = await digest(`${user.salt}::${password}`);
  if (passHash !== user.passHash) {
    return { ok: false, error: "That password doesn't match. Try again." };
  }
  return { ok: true, user };
}

export function touchUser(id: string) {
  if (id === GUEST_ID) return;
  const users = getUsers().map((u) => (u.id === id ? { ...u, lastSeen: Date.now() } : u));
  saveUsers(users);
}

/* ───────────── session ───────────── */
export function getSession(): string | null {
  try {
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) return null;
    if (id === GUEST_ID) return GUEST_ID;
    return getUserById(id) ? id : null;
  } catch {
    return null;
  }
}

export function setSession(id: string | null) {
  try {
    if (id) localStorage.setItem(SESSION_KEY, id);
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* carry on without persistence */
  }
}
