import { useState, type FormEvent } from "react";
import { IconMic, IconSpeaker, IconWave } from "./Icons";
import { GUEST_ID, loginUser, registerUser } from "../lib/auth";
import { TOTAL_DRILLS } from "../data/phonemes";

interface Props {
  onAuthed: (userId: string) => void;
}

type Mode = "login" | "signup";

const inputCls =
  "w-full rounded-md border border-pine-3 bg-pine-2/70 px-3.5 py-2.5 text-[14.5px] font-medium text-chalk placeholder:text-chalk/35 outline-none transition-all focus:border-honey focus:bg-pine-2 focus:shadow-[0_0_0_3px_rgba(217,164,65,0.15)]";

const labelCls = "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-chalk/60";

export default function AuthGate({ onAuthed }: Props) {
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (mode === "signup" && password !== confirm) {
      setError("The two passwords don't match.");
      return;
    }
    setBusy(true);
    const res =
      mode === "login" ? await loginUser(username, password) : await registerUser(username, password);
    setBusy(false);
    if (res.ok) onAuthed(res.user.id);
    else setError(res.error);
  };

  return (
    <main className="relative z-10 flex min-h-screen flex-col px-4 py-10 sm:px-6">
      <div className="mx-auto my-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* ── left · the lab's calling card ── */}
        <div className="reveal is-in">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-ember shadow-lg shadow-ember/25">
              <IconWave className="h-6 w-6 text-chalk" />
            </span>
            <div className="leading-none">
              <p className="font-display text-[21px] font-extrabold tracking-tight text-chalk">
                Phonetics<span className="text-honey">·</span>Lab
              </p>
              <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-chalk/50">
                British English · RP · reception desk
              </p>
            </div>
          </div>

          <h1 className="mt-8 font-display text-[clamp(2.3rem,5.5vw,3.9rem)] font-extrabold leading-[1.02] tracking-tight text-chalk">
            Sign in,
            <br />
            then <span className="text-lagoon">say it</span>{" "}
            <span className="text-honey">properly</span>.
          </h1>

          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-chalk/70">
            All 49 sounds of Received Pronunciation — 12 vowels, 8 diphthongs, 5 triphthongs and 24
            consonants — drilled at syllable, word and sentence level. Your progress is saved to
            your account on this device.
          </p>

          <ul className="mt-7 flex flex-col gap-3 font-mono text-[12px] text-chalk/75">
            <li className="flex items-center gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-lagoon/20 text-lagoon">
                <IconSpeaker className="h-4 w-4" />
              </span>
              {TOTAL_DRILLS.toLocaleString()} listen-and-repeat drills with UK model voices
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-ember/20 text-ember">
                <IconMic className="h-4 w-4" />
              </span>
              on-device recording with live waveform — nothing is ever uploaded
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-honey/20 text-honey">
                <IconWave className="h-4 w-4" />
              </span>
              one account per learner · pick up exactly where you left off
            </li>
          </ul>

          <div className="mt-9 hidden items-center gap-2 lg:flex" aria-hidden="true">
            {["iː", "æ", "ʌ", "ɜː", "əʊ", "aʊ", "θ", "ð", "ʃ", "ʒ", "tʃ", "ŋ"].map((g, i) => (
              <span
                key={g}
                className="glyph-float rounded-md border border-pine-3 bg-pine-2/50 px-2 py-1 font-ipa text-[15px] font-semibold text-chalk/55"
                style={{ ["--dur" as string]: `${9 + (i % 5) * 2}s`, animationDelay: `${i * 0.35}s` }}
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* ── right · the desk card ── */}
        <div className="reveal is-in rounded-lg border border-pine-3 bg-pine p-6 shadow-2xl shadow-black/30 sm:p-7" style={{ transitionDelay: "120ms" }}>
          {/* tabs */}
          <div className="relative mb-6 grid grid-cols-2 rounded-md border border-pine-3 bg-pine-2/60 p-1">
            <span
              className="absolute inset-y-1 w-[calc(50%-4px)] rounded-[5px] bg-honey transition-transform duration-300 ease-out"
              style={{ transform: mode === "signup" ? "translateX(calc(100% + 4px))" : "translateX(0)", left: 4 }}
              aria-hidden="true"
            />
            {(["login", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                aria-pressed={mode === m}
                className={`relative z-10 rounded-[5px] px-3 py-2 font-display text-[13.5px] font-bold transition-colors duration-300 ${
                  mode === m ? "text-pine" : "text-chalk/60 hover:text-chalk"
                }`}
              >
                {m === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="auth-name" className={labelCls}>
                Learner name
              </label>
              <input
                id="auth-name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. amelia_learns"
                autoComplete="username"
                autoFocus
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="auth-pass" className={labelCls}>
                Password
              </label>
              <input
                id="auth-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className={inputCls}
              />
            </div>
            {mode === "signup" && (
              <div>
                <label htmlFor="auth-confirm" className={labelCls}>
                  Confirm password
                </label>
                <input
                  id="auth-confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="repeat it once more"
                  autoComplete="new-password"
                  className={inputCls}
                />
              </div>
            )}

            {error && (
              <p className="rounded-md border border-ember/50 bg-ember/15 px-3 py-2.5 text-[12.5px] leading-snug text-chalk" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !username.trim() || !password}
              className="mt-1 flex items-center justify-center gap-2 rounded-md bg-ember px-4 py-3 font-display text-[15px] font-bold text-chalk shadow-lg shadow-ember/25 transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Checking…" : mode === "login" ? "Enter the lab" : "Open my account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-pine-3" />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-chalk/40">or</span>
            <span className="h-px flex-1 bg-pine-3" />
          </div>

          <button
            onClick={() => onAuthed(GUEST_ID)}
            className="w-full rounded-md border border-pine-3 bg-pine-2/50 px-4 py-2.5 font-display text-[13.5px] font-bold text-chalk/85 transition-all hover:border-chalk/40 hover:bg-pine-2 hover:text-chalk active:scale-[0.98]"
          >
            Continue as guest →
          </button>

          <p className="mt-4 text-center font-mono text-[10px] leading-relaxed text-chalk/40">
            Accounts, passwords and progress live only in this browser.
          </p>
        </div>
      </div>

      {/* ── academic attribution ── */}
      <footer className="mx-auto mt-12 w-full max-w-5xl border-t border-pine-3 pt-6">
        <address className="flex flex-col items-center gap-2 text-center not-italic">
          <span className="mb-2.5 h-px w-14 bg-honey/80" aria-hidden="true" />
          <span className="font-mono text-[13px] font-semibold tracking-wide text-chalk/80">
            © 2026{" "}
            <span className="font-display text-[19px] font-extrabold tracking-tight text-chalk">
              Srinivasa K S
            </span>
          </span>
          <span className="font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-chalk/80">
            Assistant Professor
          </span>
          <span className="font-mono text-[12px] font-semibold leading-relaxed text-chalk/70">
            R.V. Teachers College, Jayanagar, Bengaluru – 560011
          </span>
          <span className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-chalk/55">
            All Rights Reserved.
          </span>
        </address>
      </footer>
    </main>
  );
}
