import { useEffect, useState, type FormEvent } from "react";
import { IconArrow, IconMic, IconRedo, IconSpeaker, IconTrash, IconUser, IconWave } from "./Icons";
import { GUEST_ID, createOrResumeLearner, type Learner } from "../lib/learners";
import { TOTAL_DRILLS } from "../data/phonemes";
import type { AllProgress } from "../lib/progress";

interface Props {
  profiles: Learner[];
  progress: AllProgress;
  onEnter: (learnerId: string) => void;
  onResetProgress: (learnerId: string) => void;
  onRemoveProfile: (learnerId: string) => void;
}

type Confirm = { id: string; kind: "reset" | "remove" } | null;

const inputCls =
  "w-full rounded-md border border-pine-3 bg-pine-2/70 px-3.5 py-2.5 text-[14.5px] font-medium text-chalk placeholder:text-chalk/35 outline-none transition-all focus:border-honey focus:bg-pine-2 focus:shadow-[0_0_0_3px_rgba(217,164,65,0.15)]";

const labelCls = "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-chalk/60";

const doneCount = (p: AllProgress, id: string) => Object.values(p[id] ?? {}).filter(Boolean).length;

export default function LearnerGate({ profiles, progress, onEnter, onResetProgress, onRemoveProfile }: Props) {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<Confirm>(null);

  /* auto-disarm the two-step confirm buttons */
  useEffect(() => {
    if (!confirm) return;
    const t = window.setTimeout(() => setConfirm(null), 2600);
    return () => window.clearTimeout(t);
  }, [confirm]);

  const sorted = [...profiles].sort((a, b) => b.lastSeen - a.lastSeen);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim().replace(/\s+/g, " ");
    if (n.length < 2 || n.length > 40) {
      setError("Enter the learner's name (2–40 characters).");
      return;
    }
    const r = roll.trim();
    if (r.length > 24) {
      setError("Student ID / roll number can be at most 24 characters.");
      return;
    }
    const { learner } = createOrResumeLearner(n, r || undefined);
    onEnter(learner.id);
  };

  const ask = (id: string, kind: "reset" | "remove") => {
    if (confirm?.id === id && confirm.kind === kind) {
      if (kind === "reset") onResetProgress(id);
      else onRemoveProfile(id);
      setConfirm(null);
    } else {
      setConfirm({ id, kind });
    }
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
                British English · RP · learner entry
              </p>
            </div>
          </div>

          <h1 className="mt-8 font-display text-[clamp(2.3rem,5.5vw,3.9rem)] font-extrabold leading-[1.02] tracking-tight text-chalk">
            No passwords.
            <br />
            Just <span className="text-lagoon">listen</span>,{" "}
            <span className="text-ember">record</span>, <span className="text-honey">improve</span>.
          </h1>

          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-chalk/70">
            All 49 sounds of Received Pronunciation — 12 vowels, 8 diphthongs, 5 triphthongs and 24
            consonants — drilled at syllable, word and sentence level. Profiles and progress live
            only in this browser: no email, no phone number, no password.
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
                <IconUser className="h-4 w-4" />
              </span>
              one local profile per learner · returns pick up where they left off
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

        {/* ── right · the learner desk ── */}
        <div
          className="reveal is-in rounded-lg border border-pine-3 bg-pine p-6 shadow-2xl shadow-black/30 sm:p-7"
          style={{ transitionDelay: "120ms" }}
        >
          <div className="mb-5 flex items-baseline justify-between gap-3">
            <h2 className="font-display text-[19px] font-extrabold tracking-tight text-chalk">Learner entry</h2>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-chalk/45">
              stored on this device
            </span>
          </div>

          {/* returning learners */}
          {sorted.length > 0 && (
            <div className="mb-5">
              <p className={labelCls}>Returning learners — tap to continue</p>
              <ul className="flex flex-col gap-2">
                {sorted.map((l) => {
                  const done = doneCount(progress, l.id);
                  const pct = Math.round((done / TOTAL_DRILLS) * 100);
                  const isConfirm = confirm?.id === l.id;
                  return (
                    <li
                      key={l.id}
                      className="group rounded-md border border-pine-3 bg-pine-2/50 p-2.5 transition-all hover:border-chalk/30 hover:bg-pine-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-honey font-display text-[15px] font-extrabold text-pine">
                          {l.name.charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] font-bold text-chalk">
                            {l.name}
                            {l.roll && (
                              <span className="ml-2 rounded-sm bg-pine-3 px-1.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-wide text-chalk/70">
                                {l.roll}
                              </span>
                            )}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-pine-3">
                              <span
                                className="block h-full rounded-full bg-lagoon transition-all duration-700"
                                style={{ width: `${Math.max(pct, done > 0 ? 3 : 0)}%` }}
                              />
                            </span>
                            <span className="shrink-0 font-mono text-[9.5px] tabular-nums text-chalk/55">
                              {done}/{TOTAL_DRILLS}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onEnter(l.id)}
                          title={`Continue as ${l.name}`}
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-lagoon text-chalk transition-all hover:brightness-110 active:scale-90"
                        >
                          <IconArrow className="h-4 w-4" />
                        </button>
                        <div className="flex shrink-0 flex-col gap-1">
                          <button
                            onClick={() => ask(l.id, "reset")}
                            title={isConfirm && confirm?.kind === "reset" ? "Tap again to erase all progress" : "Reset this learner's progress"}
                            className={`grid h-[15px] w-6 place-items-center rounded-sm transition-colors ${
                              isConfirm && confirm?.kind === "reset" ? "bg-ember text-chalk" : "text-chalk/35 hover:text-honey"
                            }`}
                          >
                            <IconRedo className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => ask(l.id, "remove")}
                            title={isConfirm && confirm?.kind === "remove" ? "Tap again to delete this profile" : "Remove this profile"}
                            className={`grid h-[15px] w-6 place-items-center rounded-sm transition-colors ${
                              isConfirm && confirm?.kind === "remove" ? "bg-ember text-chalk" : "text-chalk/35 hover:text-ember"
                            }`}
                          >
                            <IconTrash className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 font-mono text-[9.5px] leading-relaxed text-chalk/40">
                ↻ erases progress only · 🗑 removes the profile and its progress. Tap twice to confirm.
              </p>
            </div>
          )}

          {sorted.length > 0 && (
            <div className="mb-5 flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-pine-3" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-chalk/40">or start fresh</span>
              <span className="h-px flex-1 bg-pine-3" />
            </div>
          )}

          {/* new profile form — no password, ever */}
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="learner-name" className={labelCls}>
                Learner name <span className="text-ember">*</span>
              </label>
              <input
                id="learner-name"
                className={inputCls}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. Ananya Rao"
                autoComplete="off"
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="learner-roll" className={labelCls}>
                Student ID / roll number <span className="normal-case tracking-normal text-chalk/35">(optional)</span>
              </label>
              <input
                id="learner-roll"
                className={inputCls}
                value={roll}
                onChange={(e) => {
                  setRoll(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. 21EDU042 — leave blank for casual practice"
                autoComplete="off"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-md border border-ember/40 bg-ember/15 px-3 py-2 text-[12.5px] font-semibold text-ember">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-md bg-ember px-4 py-3 font-display text-[15px] font-extrabold tracking-wide text-chalk shadow-lg shadow-ember/25 transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Start Learning <IconArrow className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onEnter(GUEST_ID)}
              className="w-full rounded-md border border-pine-3 bg-pine-2/50 px-4 py-2.5 font-display text-[13.5px] font-bold text-chalk/85 transition-all hover:border-chalk/40 hover:bg-pine-2 hover:text-chalk active:scale-[0.98]"
            >
              Continue as Guest →
            </button>

            <p className="text-center font-mono text-[10px] leading-relaxed text-chalk/40">
              Learner name and optional ID only — no password, no email, no personal details.
              Everything stays in this browser and works fully offline.
            </p>
          </form>
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
