import { Fragment, useEffect, useRef, useState } from "react";
import {
  CATEGORY_META,
  LEVELS,
  drillsForLevel,
  getDrills,
  type LevelId,
  type Phoneme,
} from "../data/phonemes";
import { useRecorder } from "../hooks/useRecorder";
import type { SpeakOptions } from "../hooks/useSpeech";
import WavePlayer from "./WavePlayer";
import {
  IconCheck,
  IconMic,
  IconPlay,
  IconRedo,
  IconShuffle,
  IconSlow,
  IconSpeaker,
  IconStop,
} from "./Icons";

interface Props {
  phoneme: Phoneme;
  level: LevelId;
  onLevel: (l: LevelId) => void;
  checked: Set<string>;
  onToggle: (id: string) => void;
  speak: (text: string, opts?: SpeakOptions) => void;
  speaking: boolean;
  onRandom: () => void;
}

interface Target {
  level: LevelId;
  idx: number;
}

function fmtClock(t: number) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function PracticeBench({
  phoneme,
  level,
  onLevel,
  checked,
  onToggle,
  speak,
  speaking,
  onRandom,
}: Props) {
  const rec = useRecorder();
  const meta = CATEGORY_META[phoneme.category];
  const [current, setCurrent] = useState<string | null>(null);
  const [target, setTarget] = useState<Target | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drills = level === "syll" ? [] : getDrills(phoneme, level);
  const activeTarget: Target = target ?? { level, idx: 0 };
  const targetPair = activeTarget.level === "syll" ? phoneme.pairs?.[activeTarget.idx] : undefined;
  const targetDrill =
    activeTarget.level === "syll"
      ? phoneme.pairs?.[activeTarget.idx]?.a ?? { ipa: "", text: "" }
      : getDrills(phoneme, activeTarget.level)[activeTarget.idx];
  const levelDone = (l: LevelId) =>
    l === "syll"
      ? (phoneme.pairs ?? []).filter((_, i) => checked.has(`${phoneme.id}:syll:${i}`)).length
      : getDrills(phoneme, l).filter((_, i) => checked.has(`${phoneme.id}:${l}:${i}`)).length;
  const levelTotal = drillsForLevel(phoneme, level);
  const levelPct = levelTotal > 0 ? levelDone(level) / levelTotal : 0;

  // reset local state when the phoneme changes
  useEffect(() => {
    setCurrent(null);
    setTarget(null);
    rec.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneme.id]);

  // live oscilloscope while recording
  useEffect(() => {
    if (rec.status !== "recording") return;
    const canvas = canvasRef.current;
    const analyser = rec.getAnalyser();
    if (!canvas || !analyser) return;
    const g = canvas.getContext("2d");
    if (!g) return;
    const buf = new Uint8Array(analyser.fftSize);
    const W = canvas.width;
    const H = canvas.height;
    g.fillStyle = "#0d2a23";
    g.fillRect(0, 0, W, H);
    let raf = 0;
    const draw = () => {
      analyser.getByteTimeDomainData(buf);
      g.fillStyle = "rgba(13, 42, 35, 0.3)";
      g.fillRect(0, 0, W, H);
      g.lineWidth = 2.2;
      g.strokeStyle = "#f6f8f2";
      g.beginPath();
      for (let i = 0; i < buf.length; i++) {
        const x = (i / (buf.length - 1)) * W;
        const y = (buf[i] / 255) * H;
        if (i === 0) g.moveTo(x, y);
        else g.lineTo(x, y);
      }
      g.stroke();
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [rec.status, rec.getAnalyser]);

  const playDrill = (lvl: LevelId, idx: number, rate?: number) => {
    const dr = lvl === "syll" ? phoneme.pairs?.[idx]?.a : getDrills(phoneme, lvl)[idx];
    if (!dr) return;
    setTarget({ level: lvl, idx });
    const key = `${phoneme.id}:${lvl}:${idx}`;
    setCurrent(key);
    speak(dr.say ?? dr.text, { rate, onEnd: () => setCurrent(null) });
  };

  /** play the rival side of a minimal pair */
  const playRival = (idx: number, rate?: number) => {
    const pr = phoneme.pairs?.[idx];
    if (!pr) return;
    const key = `${phoneme.id}:syll:${idx}:r`;
    setCurrent(key);
    speak(pr.b.say ?? pr.b.text, { rate, onEnd: () => setCurrent(null) });
  };

  const recordingBusy = rec.status === "recording" || rec.status === "requesting";

  const toggleRecord = () => {
    if (recordingBusy) {
      rec.stop();
    } else {
      rec.start();
    }
  };

  const downloadName = `${phoneme.id.replace(/[^\w]/g, "")}-${activeTarget.level}-${activeTarget.idx + 1}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
      {/* ── identity card ── */}
      <aside className="flex flex-col gap-4">
        <div
          className="overflow-hidden rounded-lg border border-line bg-card shadow-[0_2px_0_rgba(20,48,42,0.07)]"
          style={{ borderTop: `5px solid ${meta.hex}` }}
        >
          <div className="flex items-center gap-4 p-5 pb-4">
            <div
              className="grid h-24 w-24 shrink-0 place-items-center rounded-lg border"
              style={{ borderColor: meta.hex, backgroundColor: `${meta.hex}14` }}
            >
              <span className="font-ipa text-[52px] font-bold leading-none" style={{ color: meta.hex }}>
                {phoneme.ipa}
              </span>
            </div>
            <div className="min-w-0">
              <span
                className="inline-block rounded-sm px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-chalk"
                style={{ backgroundColor: meta.hex }}
              >
                {meta.name}
              </span>
              <h3 className="mt-1.5 font-display text-xl font-bold leading-tight text-ink">
                {phoneme.keyword}
              </h3>
              <p className="mt-0.5 font-mono text-[11px] leading-snug text-fog">{phoneme.label}</p>
            </div>
          </div>
          <div className="border-t border-line px-5 py-4">
            <p className="text-[14px] leading-relaxed text-ink/90">{phoneme.hint}</p>
            <p className="mt-3 mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
              Hear it in
            </p>
            <div className="flex flex-wrap gap-1.5">
              {phoneme.keywords.map((kw) => (
                <button
                  key={kw}
                  disabled={recordingBusy}
                  onClick={() => speak(kw)}
                  className="group flex items-center gap-1.5 rounded-md border border-line bg-chalk px-2.5 py-1 text-[13px] font-medium text-ink transition-all hover:-translate-y-px hover:border-ink hover:shadow-sm disabled:opacity-50"
                >
                  {kw}
                  <IconSpeaker className="h-3.5 w-3.5 opacity-40 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* signature minimal pair — or the triphthong glide path */}
          {phoneme.pairs?.[0] ? (
            <div className="border-t border-line px-5 py-4">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
                Signature contrast · vs /{phoneme.pairs[0].rival}/
              </p>
              <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
                {[0, 1].map((ci) => {
                  const side = ci === 0 ? phoneme.pairs![0].a : phoneme.pairs![0].b;
                  return (
                    <Fragment key={ci}>
                      {ci === 1 && (
                        <span className="grid place-items-center font-display text-lg font-extrabold text-fog" aria-hidden="true">
                          ↔
                        </span>
                      )}
                      <button
                        disabled={recordingBusy}
                        onClick={() => speak(side.text)}
                        title={`Listen: ${side.text}`}
                        className="group flex flex-col items-center rounded-md border border-line bg-chalk px-2 py-2.5 transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-md active:scale-95 disabled:opacity-50"
                      >
                        <span className="font-display text-[17px] font-bold leading-tight text-ink group-hover:text-ember">
                          {side.text}
                        </span>
                        <span className="mt-0.5 font-ipa text-[11.5px] text-fog">{side.ipa}</span>
                        <span className="mt-1.5 flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-fog opacity-60 transition-opacity group-hover:text-ember group-hover:opacity-100">
                          <IconSpeaker className="h-3 w-3" /> {ci === 0 ? "target" : "rival"}
                        </span>
                      </button>
                    </Fragment>
                  );
                })}
              </div>
              <button
                onClick={() => onLevel("syll")}
                className="mt-2.5 w-full rounded-md border border-dashed border-line bg-paper/60 px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fog transition-all hover:border-ember hover:text-ember active:scale-[0.99]"
              >
                ▸ open the full minimal-pair set ({phoneme.pairs.length})
              </button>
            </div>
          ) : (
            <div className="border-t border-line px-5 py-4">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
                Triple glide · one syllable
              </p>
              <div className="flex items-center gap-3 rounded-md border border-line bg-chalk px-3 py-2.5">
                <span className="font-ipa text-[22px] font-bold leading-none" style={{ color: meta.hex }}>
                  /{phoneme.ipa}/
                </span>
                <svg viewBox="0 0 44 12" className="h-4 w-14 shrink-0" aria-hidden="true">
                  <path
                    d="M3 10 C 9 2 13 2 18 5 C 23 8 27 8 32 4 L 40 2"
                    fill="none"
                    stroke={meta.hex}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  <path d="M35.5 0.5 40 2l-3 3.4" fill="none" stroke={meta.hex} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                </svg>
                <span className="font-mono text-[10px] leading-relaxed text-fog">
                  three vowels, one movement
                </span>
              </div>
              <button
                onClick={() => onLevel("word")}
                className="mt-2.5 w-full rounded-md border border-dashed border-line bg-paper/60 px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fog transition-all hover:border-ember hover:text-ember active:scale-[0.99]"
              >
                ▸ triphthongs train at word &amp; sentence level
              </button>
            </div>
          )}
        </div>

        {/* recorder */}
        <div className="rounded-lg border border-line bg-pine p-5 text-chalk shadow-[0_2px_0_rgba(20,48,42,0.15)]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.14em]">
              Your turn
            </h4>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-chalk/60">
              {rec.status === "recording" && <span className="blink-dot inline-block h-2 w-2 rounded-full bg-ember" />}
              {rec.status === "recording" ? `REC ${fmtClock(rec.elapsed)}` : "mic · on-device"}
            </span>
          </div>

          <div className="mb-3 rounded-md bg-pine-2/80 px-3 py-2.5">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-chalk/50">
              target ·{" "}
              {activeTarget.level === "syll"
                ? `syllable · vs /${targetPair?.rival}/`
                : activeTarget.level === "word"
                  ? "word"
                  : "sentence"}{" "}
              {activeTarget.idx + 1}
            </p>
            <p className="mt-0.5 font-display text-lg font-bold leading-snug">
              {targetDrill.text}
              {targetPair && (
                <span className="ml-2 font-ipa text-[12px] font-normal text-chalk/50">
                  ≠ {targetPair.b.text} {targetPair.b.ipa}
                </span>
              )}
            </p>
            <p className="font-ipa text-[12px] text-chalk/60">{targetDrill.ipa}</p>
          </div>

          {/* scope / player */}
          {rec.status === "recording" || rec.status === "requesting" || rec.status === "processing" ? (
            <div className="overflow-hidden rounded-md border border-pine-3">
              <canvas ref={canvasRef} width={1200} height={170} className="h-24 w-full bg-pine" />
            </div>
          ) : rec.recording ? (
            <div className="rounded-md border border-pine-3 bg-chalk p-3">
              <WavePlayer recording={rec.recording} downloadName={downloadName} />
            </div>
          ) : (
            <div className="grid h-24 place-items-center rounded-md border border-dashed border-pine-3 text-center">
              <p className="px-4 font-mono text-[11px] leading-relaxed text-chalk/50">
                Listen first, then record yourself and compare the two takes back-to-back.
              </p>
            </div>
          )}

          {rec.status === "error" && rec.error && (
            <p className="mt-3 rounded-md border border-ember/50 bg-ember/15 px-3 py-2 text-[12px] leading-snug text-chalk">
              {rec.error}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => playDrill(activeTarget.level, activeTarget.idx)}
              disabled={recordingBusy}
              className="flex items-center gap-2 rounded-md border border-pine-3 bg-pine-2 px-3 py-2 text-[13px] font-semibold text-chalk transition-colors hover:bg-pine-3 disabled:opacity-50"
            >
              <IconSpeaker className="h-4 w-4" /> Model
            </button>

            <button
              onClick={toggleRecord}
              disabled={rec.status === "processing"}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-[13px] font-bold text-chalk transition-all active:scale-95 ${
                recordingBusy ? "rec-pulse bg-ember" : "bg-ember hover:brightness-110"
              } disabled:opacity-60`}
            >
              {recordingBusy ? <IconStop className="h-4 w-4" /> : <IconMic className="h-4 w-4" />}
              {recordingBusy ? "Stop" : rec.recording ? "Re-record" : "Record"}
            </button>

            {rec.recording && !recordingBusy && (
              <button
                onClick={() => playDrill(activeTarget.level, activeTarget.idx)}
                className="flex items-center gap-2 rounded-md border border-pine-3 bg-pine-2 px-3 py-2 text-[13px] font-semibold text-chalk transition-colors hover:bg-pine-3"
              >
                <IconRedo className="h-4 w-4" /> A / B
              </button>
            )}
          </div>
          <p className="mt-3 font-mono text-[10px] leading-relaxed text-chalk/40">
            Recordings are processed entirely in your browser — nothing is uploaded.
          </p>
        </div>
      </aside>

      {/* ── drill list ── */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-lg border border-line bg-card p-1">
            {LEVELS.map((l) => {
              const count = drillsForLevel(phoneme, l.id);
              const active = level === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => onLevel(l.id)}
                  aria-pressed={active}
                  className={`flex items-center gap-2 rounded-md px-3.5 py-2 font-display text-[13px] font-bold transition-all sm:px-5 ${
                    active ? "bg-ink text-chalk shadow-sm" : "text-ink/70 hover:bg-paper hover:text-ink"
                  }`}
                >
                  {l.name}
                  <span
                    className={`rounded-sm px-1.5 py-px font-mono text-[10px] font-semibold tabular-nums ${
                      active ? "bg-chalk/20 text-chalk" : "bg-paper text-fog"
                    }`}
                  >
                    {levelDone(l.id)}/{count}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            onClick={onRandom}
            className="flex items-center gap-2 rounded-md border border-line bg-card px-3.5 py-2.5 text-[13px] font-semibold text-ink transition-all hover:-translate-y-px hover:border-ember hover:text-ember hover:shadow-sm"
          >
            <IconShuffle className="h-4 w-4" /> Surprise sound
          </button>
        </div>

        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fog">
          {LEVELS.find((l) => l.id === level)?.blurb}
        </p>

        {level === "syll" && !(phoneme.pairs?.length ?? 0) && (
          <div className="rounded-lg border-2 border-dashed border-triph/50 bg-card px-6 py-12 text-center">
            <p className="font-display text-xl font-bold text-ink">
              No minimal pairs here — triphthongs are trained in context
            </p>
            <p className="mx-auto mt-2 max-w-lg text-[14px] leading-relaxed text-fog">
              /{phoneme.ipa}/ is a three-vowel glide that only exists inside real words, so there are
              no isolated syllable contrasts to drill. Practise it inside the ten target words and
              three carrier sentences instead — then record yourself and compare.
            </p>
            <div className="mt-5 flex justify-center gap-2.5">
              <button
                onClick={() => onLevel("word")}
                className="rounded-md px-5 py-2.5 font-display text-[13px] font-bold text-chalk transition-all hover:brightness-110 active:scale-95"
                style={{ backgroundColor: meta.hex }}
              >
                Practise words
              </button>
              <button
                onClick={() => onLevel("sent")}
                className="rounded-md border border-line bg-chalk px-5 py-2.5 font-display text-[13px] font-bold text-ink transition-all hover:-translate-y-px hover:border-ink hover:shadow-sm active:scale-95"
              >
                Practise sentences
              </button>
            </div>
          </div>
        )}
        {level === "syll" && (phoneme.pairs?.length ?? 0) > 0 ? (
          <ol className="flex flex-col gap-2.5">
            {(phoneme.pairs ?? []).map((pr, i) => {
              const key = `${phoneme.id}:syll:${i}`;
              const isCurrent = current === key;
              const isRivalCurrent = current === `${key}:r`;
              const isTarget = activeTarget.level === "syll" && activeTarget.idx === i;
              const done = checked.has(key);
              return (
                <li
                  key={key}
                  className={`overflow-hidden rounded-lg border transition-all duration-200 ${
                    isTarget ? "border-ink/50 bg-chalk shadow-[0_2px_0_rgba(20,48,42,0.08)]" : "border-line bg-card hover:border-ink/30 hover:bg-chalk"
                  }`}
                >
                  <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,0.68fr)]">
                    {/* target side */}
                    <div className="grid grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-x-3 px-3.5 py-3 sm:gap-x-4">
                      <span className="font-mono text-[11px] font-medium text-fog">{String(i + 1).padStart(2, "0")}</span>
                      <div className="min-w-0">
                        <p
                          className={`truncate font-display text-[21px] font-bold leading-tight text-ink sm:text-[23px] ${isCurrent ? "animate-pulse" : ""}`}
                          style={isCurrent ? { color: meta.hex } : undefined}
                        >
                          {pr.a.text}
                          <span
                            className="ml-2 rounded-sm px-1.5 py-0.5 align-middle font-mono text-[8.5px] font-bold uppercase tracking-[0.14em] text-chalk"
                            style={{ backgroundColor: meta.hex }}
                          >
                            target
                          </span>
                        </p>
                        <p className="truncate font-ipa text-[13px] text-fog">{pr.a.ipa}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => playDrill("syll", i)}
                          disabled={recordingBusy}
                          aria-label={`Listen: ${pr.a.text}`}
                          title="Listen"
                          className={`grid h-9 w-9 place-items-center rounded-md border transition-all hover:-translate-y-px active:scale-95 disabled:opacity-40 ${
                            isCurrent ? "border-transparent text-chalk" : "border-line bg-chalk text-ink hover:border-ink"
                          }`}
                          style={isCurrent ? { backgroundColor: meta.hex } : undefined}
                        >
                          {isCurrent && speaking ? (
                            <span className="flex h-3.5 items-end gap-[2.5px]">
                              <span className="eq-bar h-full w-[3px] rounded-full bg-chalk is-speaking" style={{ animationDelay: "0ms" }} />
                              <span className="eq-bar h-full w-[3px] rounded-full bg-chalk is-speaking" style={{ animationDelay: "180ms" }} />
                              <span className="eq-bar h-full w-[3px] rounded-full bg-chalk is-speaking" style={{ animationDelay: "340ms" }} />
                            </span>
                          ) : (
                            <IconPlay className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => playDrill("syll", i, 0.55)}
                          disabled={recordingBusy}
                          aria-label={`Slow listen: ${pr.a.text}`}
                          title="Slow (≈0.5×)"
                          className="grid h-9 w-9 place-items-center rounded-md border border-line bg-chalk text-ink transition-all hover:-translate-y-px hover:border-ink active:scale-95 disabled:opacity-40"
                        >
                          <IconSlow className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setTarget({ level: "syll", idx: i });
                            toggleRecord();
                          }}
                          disabled={rec.status === "processing" || rec.status === "requesting"}
                          aria-label={`Record yourself saying: ${pr.a.text}`}
                          title="Record yourself"
                          className={`grid h-9 w-9 place-items-center rounded-md border transition-all hover:-translate-y-px active:scale-95 disabled:opacity-40 ${
                            isTarget && recordingBusy
                              ? "rec-pulse border-transparent bg-ember text-chalk"
                              : "border-line bg-chalk text-ember hover:border-ember"
                          }`}
                        >
                          {isTarget && recordingBusy ? <IconStop className="h-3.5 w-3.5" /> : <IconMic className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => onToggle(key)}
                          aria-pressed={done}
                          aria-label={done ? "Mark as not practised" : "Mark as practised"}
                          title="I've practised this"
                          className={`grid h-9 w-9 place-items-center rounded-md border transition-all hover:-translate-y-px active:scale-95 ${
                            done
                              ? "border-transparent bg-moss text-chalk shadow-sm"
                              : "border-line bg-chalk text-fog hover:border-moss hover:text-moss"
                          }`}
                        >
                          <IconCheck className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* rival side */}
                    <div className="relative flex items-center justify-between gap-3 border-t border-dashed border-line bg-paper/70 px-3.5 py-3 sm:border-l sm:border-t-0 sm:pl-5">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[13px] top-1/2 z-10 hidden h-[26px] w-[26px] -translate-y-1/2 place-items-center rounded-full border border-line bg-card font-display text-[13px] font-extrabold text-fog shadow-sm sm:grid"
                      >
                        ↔
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[8.5px] font-bold uppercase tracking-[0.16em] text-fog">
                          rival · <span className="font-ipa text-[11px] normal-case tracking-normal">/{pr.rival}/</span>
                          {pr.rival === "∅" && " silent"}
                        </p>
                        <p
                          className={`truncate font-display text-[18px] font-bold leading-tight text-ink/75 sm:text-[19px] ${isRivalCurrent ? "animate-pulse" : ""}`}
                          style={isRivalCurrent ? { color: meta.hex } : undefined}
                        >
                          {pr.b.text}
                        </p>
                        <p className="truncate font-ipa text-[12px] text-fog">{pr.b.ipa}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => playRival(i)}
                          disabled={recordingBusy}
                          aria-label={`Listen: ${pr.b.text}`}
                          title="Listen to the rival"
                          className={`grid h-9 w-9 place-items-center rounded-md border transition-all hover:-translate-y-px active:scale-95 disabled:opacity-40 ${
                            isRivalCurrent ? "border-transparent text-chalk" : "border-line bg-chalk text-ink/70 hover:border-ink"
                          }`}
                          style={isRivalCurrent ? { backgroundColor: meta.hex } : undefined}
                        >
                          {isRivalCurrent && speaking ? (
                            <span className="flex h-3.5 items-end gap-[2.5px]">
                              <span className="eq-bar h-full w-[3px] rounded-full bg-chalk is-speaking" style={{ animationDelay: "0ms" }} />
                              <span className="eq-bar h-full w-[3px] rounded-full bg-chalk is-speaking" style={{ animationDelay: "180ms" }} />
                              <span className="eq-bar h-full w-[3px] rounded-full bg-chalk is-speaking" style={{ animationDelay: "340ms" }} />
                            </span>
                          ) : (
                            <IconPlay className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => playRival(i, 0.55)}
                          disabled={recordingBusy}
                          aria-label={`Slow listen: ${pr.b.text}`}
                          title="Slow (≈0.5×)"
                          className="grid h-9 w-9 place-items-center rounded-md border border-line bg-chalk text-ink/70 transition-all hover:-translate-y-px hover:border-ink active:scale-95 disabled:opacity-40"
                        >
                          <IconSlow className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
        <ol className="flex flex-col gap-2">
          {drills.map((dr, i) => {
            const key = `${phoneme.id}:${level}:${i}`;
            const isCurrent = current === key;
            const isTarget = activeTarget.level === level && activeTarget.idx === i;
            const done = checked.has(key);
            return (
              <li
                key={key}
                className={`group grid grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-x-3 rounded-lg border px-3.5 py-3 transition-all duration-200 sm:gap-x-4 ${
                  isTarget ? "border-ink/50 bg-chalk shadow-[0_2px_0_rgba(20,48,42,0.08)]" : "border-line bg-card hover:border-ink/30 hover:bg-chalk"
                }`}
              >
                <span className="font-mono text-[11px] font-medium text-fog">{String(i + 1).padStart(2, "0")}</span>

                <div className="min-w-0">
                  <p
                    className={`truncate font-display font-bold leading-tight text-ink ${
                      level === "sent" ? "text-[16px] sm:text-[17px]" : "text-[21px] sm:text-[24px]"
                    } ${isCurrent ? "animate-pulse" : ""}`}
                    style={isCurrent ? { color: meta.hex } : undefined}
                  >
                    {dr.text}
                  </p>
                  <p className="truncate font-ipa text-[13px] text-fog">{dr.ipa}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => playDrill(level, i)}
                    disabled={recordingBusy}
                    aria-label={`Listen: ${dr.text}`}
                    title="Listen"
                    className={`grid h-9 w-9 place-items-center rounded-md border transition-all hover:-translate-y-px active:scale-95 disabled:opacity-40 ${
                      isCurrent ? "border-transparent text-chalk" : "border-line bg-chalk text-ink hover:border-ink"
                    }`}
                    style={isCurrent ? { backgroundColor: meta.hex } : undefined}
                  >
                    {isCurrent && speaking ? (
                      <span className="flex h-3.5 items-end gap-[2.5px]">
                        <span className="eq-bar h-full w-[3px] rounded-full bg-chalk is-speaking" style={{ animationDelay: "0ms" }} />
                        <span className="eq-bar h-full w-[3px] rounded-full bg-chalk is-speaking" style={{ animationDelay: "180ms" }} />
                        <span className="eq-bar h-full w-[3px] rounded-full bg-chalk is-speaking" style={{ animationDelay: "340ms" }} />
                      </span>
                    ) : (
                      <IconPlay className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => playDrill(level, i, 0.55)}
                    disabled={recordingBusy}
                    aria-label={`Slow listen: ${dr.text}`}
                    title="Slow (≈0.5×)"
                    className="grid h-9 w-9 place-items-center rounded-md border border-line bg-chalk text-ink transition-all hover:-translate-y-px hover:border-ink active:scale-95 disabled:opacity-40"
                  >
                    <IconSlow className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setTarget({ level, idx: i });
                      toggleRecord();
                    }}
                    disabled={rec.status === "processing" || rec.status === "requesting"}
                    aria-label={`Record yourself saying: ${dr.text}`}
                    title="Record yourself"
                    className={`grid h-9 w-9 place-items-center rounded-md border transition-all hover:-translate-y-px active:scale-95 disabled:opacity-40 ${
                      isTarget && recordingBusy
                        ? "rec-pulse border-transparent bg-ember text-chalk"
                        : "border-line bg-chalk text-ember hover:border-ember"
                    }`}
                  >
                    {isTarget && recordingBusy ? <IconStop className="h-3.5 w-3.5" /> : <IconMic className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => onToggle(key)}
                    aria-pressed={done}
                    aria-label={done ? "Mark as not practised" : "Mark as practised"}
                    title="I've practised this"
                    className={`grid h-9 w-9 place-items-center rounded-md border transition-all hover:-translate-y-px active:scale-95 ${
                      done
                        ? "border-transparent bg-moss text-chalk shadow-sm"
                        : "border-line bg-chalk text-fog hover:border-moss hover:text-moss"
                    }`}
                  >
                    <IconCheck className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
        )}
      </section>
    </div>
  );
}
