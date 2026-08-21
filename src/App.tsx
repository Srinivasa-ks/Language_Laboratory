import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import ConsonantTable from "./components/ConsonantTable";
import PracticeBench from "./components/PracticeBench";
import VowelChart from "./components/VowelChart";
import {
  IconArrow,
  IconCompare,
  IconEar,
  IconGlobe,
  IconMic,
  IconSpeaker,
  IconWave,
} from "./components/Icons";
import {
  DIPHTHONGS,
  PHONEMES,
  SOUND_GROUPS,
  TOTAL_DRILLS,
  VOWELS,
  type LevelId,
} from "./data/phonemes";
import { useSpeech } from "./hooks/useSpeech";

/* ───────────────── scroll reveal ───────────────── */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/* ───────────────── ambient glyph field ───────────────── */
const GLYPHS = [
  { ch: "ɜː", top: "8%", left: "3%", size: 130, dur: 13 },
  { ch: "ʃ", top: "22%", left: "88%", size: 110, dur: 11 },
  { ch: "ŋ", top: "46%", left: "6%", size: 90, dur: 15 },
  { ch: "θ", top: "64%", left: "91%", size: 100, dur: 12 },
  { ch: "ɔɪ", top: "78%", left: "4%", size: 84, dur: 14 },
  { ch: "ɑː", top: "38%", left: "47%", size: 150, dur: 17 },
  { ch: "ð", top: "88%", left: "55%", size: 96, dur: 12 },
  { ch: "ʒ", top: "12%", left: "42%", size: 78, dur: 10 },
  { ch: "ɒ", top: "58%", left: "70%", size: 88, dur: 16 },
];

function GlyphField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {GLYPHS.map((g) => (
        <span
          key={g.ch + g.left}
          className="glyph-float absolute select-none font-ipa font-bold text-ink"
          style={{
            top: g.top,
            left: g.left,
            fontSize: g.size,
            opacity: 0.045,
            ["--dur" as string]: `${g.dur}s`,
          }}
        >
          {g.ch}
        </span>
      ))}
      <div className="bg-blueprint absolute inset-0 opacity-40" />
    </div>
  );
}

/* ───────────────── progress ring ───────────────── */
function ProgressRing({ value }: { value: number }) {
  const r = 15.5;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 40 40" className="h-11 w-11 -rotate-90">
      <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(246,248,242,0.15)" strokeWidth="4" />
      <circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        stroke="var(--color-honey)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value)}
        className="transition-all duration-700"
      />
    </svg>
  );
}

const CHECK_KEY = "phonelab-checks-v1";

export default function App() {
  const speech = useSpeech();
  const [selectedId, setSelectedId] = useState("iː");
  const [level, setLevel] = useState<LevelId>("syll");
  const [checks, setChecks] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(CHECK_KEY) ?? "{}") as Record<string, boolean>;
    } catch {
      return {};
    }
  });
  const benchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CHECK_KEY, JSON.stringify(checks));
    } catch {
      /* private mode — carry on without persistence */
    }
  }, [checks]);

  const selected = useMemo(() => PHONEMES.find((p) => p.id === selectedId) ?? PHONEMES[0], [selectedId]);

  const practiced = useMemo(
    () => new Set(Object.keys(checks).filter((k) => checks[k]).map((k) => k.split(":")[0])),
    [checks]
  );
  const doneCount = useMemo(() => Object.values(checks).filter(Boolean).length, [checks]);

  const doneBySound = useMemo(() => {
    const m = new Map<string, number>();
    Object.keys(checks).forEach((k) => {
      if (!checks[k]) return;
      const id = k.split(":")[0];
      m.set(id, (m.get(id) ?? 0) + 1);
    });
    return m;
  }, [checks]);

  const selectPhoneme = (id: string, scroll = false) => {
    setSelectedId(id);
    if (scroll) {
      requestAnimationFrame(() => benchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  const surprise = () => {
    const p = PHONEMES[Math.floor(Math.random() * PHONEMES.length)];
    const lv = (["syll", "word", "sent"] as LevelId[])[Math.floor(Math.random() * 3)];
    setLevel(lv);
    selectPhoneme(p.id, true);
  };

  const toggleCheck = (key: string) =>
    setChecks((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });

  const soundProgress = practiced.size / PHONEMES.length;

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <GlyphField />

      {/* ════════════════ HEADER / VOICE CONSOLE ════════════════ */}
      <header className="bg-blueprint-dark sticky top-0 z-40 border-b border-pine-3 bg-pine text-chalk shadow-lg shadow-pine/20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-ember">
              <IconWave className="h-5.5 w-5.5 text-chalk" />
            </span>
            <div className="leading-none">
              <p className="font-display text-[19px] font-extrabold tracking-tight">
                Phonetics<span className="text-honey">·</span>Lab
              </p>
              <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-chalk/55">
                British English · RP · 44 phonemes
              </p>
            </div>
          </div>

          <div className={`hidden items-center gap-2.5 md:flex ${speech.speaking ? "is-speaking" : ""}`}>
            <span className="flex h-7 items-end gap-[3px]">
              {[14, 22, 28, 20, 12].map((h, i) => (
                <span
                  key={i}
                  className="eq-bar w-[3.5px] rounded-full bg-honey"
                  style={{ height: h, animationDelay: `${i * 130}ms` }}
                />
              ))}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-chalk/55">
              {speech.speaking ? "voice live" : "voice idle"}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="text-right leading-tight">
              <p className="font-display text-[15px] font-bold tabular-nums">
                {practiced.size}<span className="text-chalk/45">/{PHONEMES.length}</span>
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-chalk/55">sounds practised</p>
            </div>
            <ProgressRing value={soundProgress} />
          </div>
        </div>

        {/* console row */}
        <div className="border-t border-pine-3/70 bg-pine-2/60">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2.5 px-4 py-2.5 sm:px-6">
            <label className="flex items-center gap-2.5">
              <IconGlobe className="h-4 w-4 shrink-0 text-chalk/50" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-chalk/55">voice</span>
              <select
                value={speech.voiceURI}
                onChange={(e) => speech.setVoiceURI(e.target.value)}
                disabled={!speech.supported || speech.voices.length === 0}
                className="max-w-[240px] rounded-md border border-pine-3 bg-pine px-2.5 py-1.5 text-[12.5px] font-medium text-chalk outline-none transition-colors hover:border-chalk/40 focus:border-honey disabled:opacity-50"
              >
                {speech.voices.length === 0 && <option>System default (en-GB)</option>}
                {speech.voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} — {v.lang}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2.5">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-chalk/55">tempo</span>
              <input
                type="range"
                min={0.6}
                max={1.2}
                step={0.05}
                value={speech.rate}
                onChange={(e) => speech.setRate(parseFloat(e.target.value))}
                className="w-28 cursor-pointer"
                aria-label="Speech tempo"
              />
              <span className="w-10 font-mono text-[11px] tabular-nums text-chalk/70">{speech.rate.toFixed(2)}×</span>
            </label>

            <button
              onClick={() => speech.speak("Hello! This is your British pronunciation coach. Let's train those forty-four sounds together.")}
              className="flex items-center gap-2 rounded-md border border-pine-3 bg-pine px-3 py-1.5 text-[12.5px] font-semibold text-chalk transition-all hover:border-honey hover:text-honey active:scale-95"
            >
              <IconSpeaker className="h-3.5 w-3.5" /> Test voice
            </button>

            <p className="ml-auto hidden font-mono text-[10px] text-chalk/40 lg:block">
              model voice: your device's en-GB speech engine
            </p>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* ════════════════ STATION 01 · SOUND MAP ════════════════ */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-ember">
                  Station 01 · The sound map
                </p>
                <h1 className="mt-3 font-display text-[clamp(2.1rem,5.2vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
                  Every sound in British English,
                  <span className="text-lagoon"> mapped</span> and
                  <span className="text-ember"> trainable</span>.
                </h1>
                <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink/75">
                  The full 44-phoneme RP inventory laid out the way phoneticians see it — vowels on
                  a trapezoid of tongue position, consonants on a grid of place and manner. Tap any
                  symbol to load it into the bench below, then drill it at{" "}
                  <strong className="font-semibold text-ink">syllable</strong> level — pitting each
                  sound against its nearest rival in minimal pairs — before stepping up to{" "}
                  <strong className="font-semibold text-ink">word</strong> and{" "}
                  <strong className="font-semibold text-ink">sentence</strong> level.
                </p>
              </div>
              <div className="flex flex-col gap-2 font-mono text-[11.5px] text-fog">
                <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-lagoon" /> 12 vowels</span>
                <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-honey" /> 8 diphthongs</span>
                <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-ember" /> 24 consonants</span>
                <span className="flex items-center gap-2 font-semibold text-ink">
                  <i className="h-2.5 w-2.5 rounded-full border-2 border-ink" /> = 44 phonemes
                </span>
                <span className="mt-2 border-t border-line pt-2 tabular-nums">
                  {doneCount} / {TOTAL_DRILLS} drills ticked off
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-9">
            <div className="grid gap-6 lg:grid-cols-[400px_minmax(0,1fr)]">
              <VowelChart
                vowels={VOWELS}
                diphthongs={DIPHTHONGS}
                selectedId={selectedId}
                practiced={practiced}
                onSelect={(id) => selectPhoneme(id, true)}
              />
              <ConsonantTable selectedId={selectedId} practiced={practiced} onSelect={(id) => selectPhoneme(id, true)} />
            </div>
          </Reveal>

          {/* ── all-44 index rail ── */}
          <Reveal delay={200} className="mt-6">
            <div className="rounded-md border border-line bg-card p-4 shadow-[0_1px_0_rgba(20,48,42,0.06)] sm:p-5">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-ink">
                  All 44 sounds — the full index
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-wider text-fog">
                  12 vowels + 8 diphthongs + 24 consonants ·{" "}
                  <span className="font-semibold text-ember">{practiced.size}/44</span> covered
                </p>
              </div>
              <div className="flex flex-col gap-3.5">
                {SOUND_GROUPS.map((g) => (
                  <div key={g.title} className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span
                      className="w-28 shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: g.hex }}
                    >
                      {g.title}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((p) => {
                        const sel = p.id === selectedId;
                        const done = practiced.has(p.id);
                        return (
                          <button
                            key={p.id}
                            onClick={() => selectPhoneme(p.id, true)}
                            aria-pressed={sel}
                            title={`${p.keyword} · ${doneBySound.get(p.id) ?? 0}/${
                              p.pairs.length + p.words.length + p.sentences.length
                            } drills done — open in the practice bench`}
                            className={`relative min-w-[2.3rem] rounded-md border px-2 py-1 font-ipa text-[15px] font-semibold leading-tight transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md ${
                              sel ? "text-chalk shadow-md" : "bg-chalk hover:border-ink/60"
                            }`}
                            style={{
                              borderColor: sel ? g.hex : "var(--color-line)",
                              backgroundColor: sel ? g.hex : undefined,
                              color: sel ? "var(--color-chalk)" : g.hex,
                            }}
                          >
                            {p.ipa}
                            {done && (
                              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-card bg-ember" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ════════════════ STATION 02 · DRILL LOOP ════════════════ */}
        <section className="bg-blueprint-dark relative border-y border-pine-3 bg-pine py-14 text-chalk">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-honey">
                Station 02 · The drill loop
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-extrabold tracking-tight">
                Hear it. Say it. Check it off.
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-9 grid gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start md:gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-5xl font-extrabold text-lagoon">01</span>
                    <IconEar className="h-7 w-7 text-lagoon" />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold">Listen</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-chalk/70">
                    Play the model at full tempo, or hit the gauge for a slow-motion version while
                    you watch where the sound sits in the word.
                  </p>
                </div>
                <IconArrow className="mx-auto hidden h-6 w-6 self-center text-chalk/30 md:block" />
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-5xl font-extrabold text-ember">02</span>
                    <IconMic className="h-7 w-7 text-ember" />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold">Record</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-chalk/70">
                    One tap opens the microphone with a live oscilloscope. Your take is drawn as a
                    waveform the moment you stop.
                  </p>
                </div>
                <IconArrow className="mx-auto hidden h-6 w-6 self-center text-chalk/30 md:block" />
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-5xl font-extrabold text-honey">03</span>
                    <IconCompare className="h-7 w-7 text-honey" />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold">Compare</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-chalk/70">
                    Flip between the model and your recording, tick the drill when it feels right,
                    and watch the sound map fill with embers.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-pine-3 pt-5 font-mono text-[11px] text-chalk/50">
                <span>▸ recordings never leave your browser</span>
                <span>▸ progress is saved on this device</span>
                <span>▸ works best in Chrome or Edge with a UK voice installed</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════ STATION 03 · PRACTICE BENCH ════════════════ */}
        <section ref={benchRef} className="scroll-mt-36">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-ember">
                    Station 03 · The practice bench
                  </p>
                  <h2 className="mt-3 flex flex-wrap items-baseline gap-x-3 font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-extrabold tracking-tight text-ink">
                    Now drilling
                    <span className="font-ipa text-lagoon">/{selected.ipa}/</span>
                  </h2>
                </div>
                <p className="font-mono text-[11.5px] tabular-nums text-fog">
                  {Object.keys(checks).filter((k) => k.startsWith(selected.id + ":") && checks[k]).length}{" "}
                  / {selected.pairs.length + selected.words.length + selected.sentences.length} drills practised for this sound
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-8">
              <PracticeBench
                phoneme={selected}
                level={level}
                onLevel={setLevel}
                checked={new Set(Object.keys(checks).filter((k) => checks[k]))}
                onToggle={toggleCheck}
                speak={speech.speak}
                speaking={speech.speaking}
                onRandom={surprise}
              />
            </Reveal>
          </div>
        </section>
      </main>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="relative z-10 border-t border-pine-3 bg-pine py-8 text-chalk">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded bg-ember">
              <IconWave className="h-4 w-4 text-chalk" />
            </span>
            <p className="font-display text-[15px] font-extrabold tracking-tight">
              Phonetics<span className="text-honey">·</span>Lab
            </p>
          </div>
          <p className="max-w-xl font-mono text-[10.5px] leading-relaxed text-chalk/45">
            Inventory follows the IPA chart for Received Pronunciation. Model audio via the Web
            Speech API (en-GB); recording via MediaRecorder — both run entirely on your device.
          </p>
        </div>
      </footer>
    </div>
  );
}
