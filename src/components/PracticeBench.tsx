import { useEffect, useRef, useState } from "react";
import {
  CATEGORY_META,
  LEVELS,
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

  const drills = getDrills(phoneme, level);
  const activeTarget: Target = target ?? { level, idx: 0 };
  const targetDrill = getDrills(phoneme, activeTarget.level)[activeTarget.idx];

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
    const dr = getDrills(phoneme, lvl)[idx];
    if (!dr) return;
    setTarget({ level: lvl, idx });
    const key = `${phoneme.id}:${lvl}:${idx}`;
    setCurrent(key);
    speak(dr.say ?? dr.text, { rate, onEnd: () => setCurrent(null) });
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
              target · {activeTarget.level === "syll" ? "syllable" : activeTarget.level === "word" ? "word" : "sentence"} {activeTarget.idx + 1}
            </p>
            <p className="mt-0.5 font-display text-lg font-bold leading-snug">{targetDrill.text}</p>
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
              const count = getDrills(phoneme, l.id).length;
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
                    className={`rounded-sm px-1.5 py-px font-mono text-[10px] font-semibold ${
                      active ? "bg-chalk/20 text-chalk" : "bg-paper text-fog"
                    }`}
                  >
                    {count}
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
      </section>
    </div>
  );
}
