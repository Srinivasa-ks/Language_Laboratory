import { useMemo, useState } from "react";
import {
  IconArrow,
  IconCheck,
  IconCompare,
  IconMic,
  IconPlay,
  IconRedo,
  IconSlow,
  IconSpeaker,
  IconStop,
  IconTrash,
} from "./Icons";
import {
  CLUSTERS,
  CONNECTED,
  CONVERSATIONS,
  SENTENCE_STRESS,
  WORD_STRESS,
  type ClusterItem,
  type ConnectedItem,
  type Conversation,
  type SentenceStressItem,
  type WordStressItem,
} from "../data/modules";
import { useRecorder } from "../hooks/useRecorder";
import type { SpeakOptions } from "../hooks/useSpeech";
import { CATEGORY_META } from "../data/phonemes";

interface Props {
  checks: Record<string, boolean>;
  onToggle: (key: string) => void;
  speak: (text: string, opts?: SpeakOptions) => void;
  speaking: boolean;
  onJumpToBench: () => void;
}

type ModuleId = "clusters" | "wstress" | "sstress" | "cspeech" | "conv";

const MODULES: { id: ModuleId; name: string; short: string; blurb: string; hex: string }[] = [
  { id: "clusters", name: "Consonant Clusters", short: "Clusters", blurb: "Two or three consonants, one clean burst — from identification to conversation.", hex: CATEGORY_META.plosive.hex },
  { id: "wstress", name: "Word Stress", short: "Word Stress", blurb: "Find the beat inside each word, then say it until the rhythm sticks.", hex: CATEGORY_META.diphthong.hex },
  { id: "sstress", name: "Sentence Stress", short: "Sentence Stress", blurb: "Content words beat; function words bow — and moving a beat moves the meaning.", hex: CATEGORY_META.fricative.hex },
  { id: "cspeech", name: "Connected Speech", short: "Connected Speech", blurb: "Linking, assimilation, elision, weak forms and reductions — natural vs careful.", hex: CATEGORY_META.triphthong.hex },
  { id: "conv", name: "Daily Conversations", short: "Conversations", blurb: "Real-life role-plays: classroom to courtroom, market to aeroplane.", hex: CATEGORY_META.nasal.hex },
];

const PIPELINE = ["Learn", "Listen", "Identify", "Repeat", "Record", "Feedback", "Score"];

const mono = "font-mono text-[10px] uppercase tracking-[0.16em] text-fog";
const cardCls = "rounded-lg border border-line bg-card p-4 shadow-[0_2px_0_rgba(20,48,42,0.06)] sm:p-5";

function StepDots({ state }: { state: number }) {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {PIPELINE.map((s, i) => (
        <span
          key={s}
          title={s}
          className={`h-1.5 w-4 rounded-full transition-colors duration-500 ${
            i < state ? "bg-lagoon" : "bg-line"
          }`}
        />
      ))}
    </div>
  );
}

function ListenButtons({ text, speak, rate }: { text: string; speak: Props["speak"]; rate?: number }) {
  return (
    <div className="flex gap-1.5">
      <button
        onClick={() => speak(text, { rate })}
        className="grid h-8 w-8 place-items-center rounded-md border border-line bg-chalk text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-md active:scale-90"
        title={rate && rate < 1 ? "Listen (slow)" : "Listen"}
        aria-label="Listen"
      >
        {rate && rate < 1 ? <IconSlow className="h-4 w-4" /> : <IconSpeaker className="h-4 w-4" />}
      </button>
    </div>
  );
}

/* ════════════ shared record + analyse + feedback + score block ════════════ */
interface RecordBlockProps {
  recKey: string; // persisted "recorded" ledger key
  doneKey: string; // persisted "scored" ledger key
  idKey?: string; // optional persisted "identify correct" key (gates Score)
  label: string;
  modelText: string;
  modelIpa?: string;
  checks: Props["checks"];
  onToggle: Props["onToggle"];
  rec: ReturnType<typeof useRecorder>;
  speak: Props["speak"];
  retryHint: string;
}

function RecordBlock({ recKey, doneKey, idKey, label, modelText, modelIpa, checks, onToggle, rec, speak, retryHint }: RecordBlockProps) {
  const [selfCheck, setSelfCheck] = useState([false, false, false]);
  const recorded = !!checks[recKey];
  const done = !!checks[doneKey];
  const identifyOk = idKey ? !!checks[idKey] : true;
  const recBusy = rec.status === "recording" || rec.status === "requesting" || rec.status === "processing";

  const allChecked = selfCheck.every(Boolean);
  const feedback = !recorded
    ? null
    : allChecked
      ? { tone: "good", text: "Strong work — your rhythm tracks the model. Score the item, or re-record for a cleaner take." }
      : { tone: "warn", text: retryHint };

  return (
    <div className={`rounded-md border p-3.5 transition-colors ${done ? "border-moss/60 bg-moss/5" : "border-line bg-paper/60"}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: done ? "var(--color-moss)" : "var(--color-ember)" }}>
          {done ? "· scored ✓" : "· record & score"}
        </span>
        <span className="text-[13px] font-semibold text-ink">{label}</span>
        {modelIpa && <span className="font-ipa text-[11.5px] text-fog">{modelIpa}</span>}
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={() => speak(modelText)}
            className="flex items-center gap-1.5 rounded-md border border-line bg-chalk px-2.5 py-1.5 text-[11.5px] font-semibold text-ink transition-all hover:-translate-y-px hover:border-ink hover:shadow-sm active:scale-95"
            title="Replay the model (for A/B comparison)"
          >
            <IconCompare className="h-3.5 w-3.5" /> A/B
          </button>
          {rec.status === "recording" ? (
            <button
              onClick={rec.stop}
              className="flex items-center gap-1.5 rounded-md bg-ember px-3 py-1.5 text-[11.5px] font-bold text-chalk shadow-md shadow-ember/30 transition-all hover:brightness-110 active:scale-95"
            >
              <IconStop className="h-3.5 w-3.5" /> {rec.elapsed.toFixed(1)}s
            </button>
          ) : (
            <button
              onClick={() => (recorded ? (rec.reset(), onToggle(doneKey)) : rec.start())}
              disabled={rec.status === "processing"}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11.5px] font-bold transition-all active:scale-95 ${
                recorded
                  ? "border border-line bg-chalk text-ink hover:border-ember hover:text-ember"
                  : "bg-ink text-chalk hover:bg-ember"
              }`}
              title={recorded ? "Re-record this item" : "Record your attempt"}
            >
              <IconMic className="h-3.5 w-3.5" /> {recorded ? "Re-record" : "Record"}
            </button>
          )}
        </div>
      </div>

      {rec.status === "recording" && <RecLive rec={rec} />}
      {recorded && rec.recording && rec.status !== "recording" && (
        <RecPlayback rec={rec} label={label} />
      )}

      {/* feedback checklist + score */}
      {recorded && !done && (
        <div className="mt-3 border-t border-line/70 pt-3">
          <p className={`${mono} mb-2`}>feedback · compare with the model</p>
          <div className="grid gap-1.5 sm:grid-cols-3">
            {["Sounds match", "Stress lands right", "Flow feels natural"].map((c, i) => (
              <button
                key={c}
                onClick={() => setSelfCheck((p) => p.map((v, j) => (j === i ? !v : v)))}
                aria-pressed={selfCheck[i]}
                className={`flex items-center gap-2 rounded-md border px-2.5 py-2 text-left text-[12px] font-semibold transition-all active:scale-[0.98] ${
                  selfCheck[i] ? "border-moss bg-moss/10 text-moss" : "border-line bg-chalk text-fog hover:border-ink/40"
                }`}
              >
                <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-sm border ${selfCheck[i] ? "border-moss bg-moss text-chalk" : "border-line"}`}>
                  {selfCheck[i] && <IconCheck className="h-3 w-3" />}
                </span>
                {c}
              </button>
            ))}
          </div>
          {feedback && (
            <p className={`mt-2.5 rounded-md border-l-4 px-3 py-2 text-[12px] leading-relaxed ${
              feedback.tone === "good" ? "border-moss bg-moss/10 text-moss" : "border-honey bg-honey/10 text-honey"
            }`}>
              {feedback.text}
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              onClick={() => onToggle(doneKey)}
              disabled={!identifyOk || !allChecked}
              className={`flex items-center gap-1.5 rounded-md px-4 py-2 font-display text-[12.5px] font-bold transition-all active:scale-95 ${
                identifyOk && allChecked
                  ? "bg-moss text-chalk hover:brightness-110 shadow-md shadow-moss/25"
                  : "cursor-not-allowed bg-line text-fog/60"
              }`}
              title={!identifyOk ? "Answer the identify step first" : !allChecked ? "Tick the feedback checklist first" : "Mark this item practised"}
            >
              <IconCheck className="h-3.5 w-3.5" /> Score item
            </button>
            {!identifyOk && <span className="font-mono text-[10px] text-fog">finish the identify step first</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function RecLive({ rec }: { rec: ReturnType<typeof useRecorder> }) {
  return (
    <div className="mt-3 flex items-center gap-3 rounded-md bg-ink px-3 py-2.5">
      <span className="rec-dot h-2.5 w-2.5 shrink-0 rounded-full bg-ember" />
      <LiveCanvas getAnalyser={rec.getAnalyser} />
      <span className="ml-auto font-mono text-[11px] tabular-nums text-chalk/80">{rec.elapsed.toFixed(1)}s</span>
    </div>
  );
}

function LiveCanvas({ getAnalyser }: { getAnalyser: () => AnalyserNode | null }) {
  const ref = useMemo(() => {
    return (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      let raf = 0;
      const data = new Uint8Array(1024);
      const draw = () => {
        raf = requestAnimationFrame(draw);
        const a = getAnalyser();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(168,114,10,0.9)";
        if (a) {
          a.getByteTimeDomainData(data);
          ctx.beginPath();
          for (let i = 0; i < data.length; i++) {
            const x = (i / (data.length - 1)) * canvas.width;
            const y = (data[i] / 255) * canvas.height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.lineWidth = 2;
          ctx.strokeStyle = "rgba(217,164,65,0.95)";
          ctx.stroke();
        }
      };
      draw();
      (canvas as unknown as { __cleanup?: () => void }).__cleanup = () => cancelAnimationFrame(raf);
    };
  }, [getAnalyser]);
  return <canvas ref={ref} width={520} height={56} className="h-12 w-full flex-1" />;
}

function RecPlayback({ rec, label }: { rec: ReturnType<typeof useRecorder>; label: string }) {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const audioRef = useMemo(() => {
    const a = new Audio(rec.recording!.url);
    a.onended = () => {
      setPlaying(false);
      setPos(1);
    };
    a.ontimeupdate = () => setPos(a.duration ? a.currentTime / a.duration : 0);
    return a;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rec.recording?.url]);

  const toggle = () => {
    if (playing) {
      audioRef.pause();
      setPlaying(false);
    } else {
      void audioRef.play();
      setPlaying(true);
      setPos(0);
    }
  };

  const bars = rec.recording!.bars;
  return (
    <div className="mt-3 rounded-md border border-line bg-chalk p-3">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-md transition-all active:scale-90 ${playing ? "bg-ember text-chalk" : "bg-ink text-chalk hover:bg-ember"}`}
          aria-label={playing ? "Pause your recording" : "Play your recording"}
        >
          {playing ? <IconStop className="h-4 w-4" /> : <IconPlay className="h-4 w-4" />}
        </button>
        <div
          className="flex h-10 flex-1 cursor-pointer items-center gap-[2px] overflow-hidden"
          onClick={(e) => {
            const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const f = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
            audioRef.currentTime = f * (audioRef.duration || 0);
            setPos(f);
          }}
          title="Seek within your recording"
        >
          {bars.map((b, i) => (
            <span
              key={i}
              className="w-[3px] flex-1 rounded-full transition-colors"
              style={{
                height: `${Math.max(8, b * 100)}%`,
                backgroundColor: i / bars.length <= pos ? "var(--color-ember)" : "var(--color-line)",
              }}
            />
          ))}
        </div>
        <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-fog">
          {(rec.recording!.duration || 0).toFixed(1)}s
        </span>
        <a
          href={rec.recording!.url}
          download={`phonelab-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.webm`}
          className="grid h-8 w-8 place-items-center rounded-md border border-line bg-chalk text-fog transition-all hover:border-ink hover:text-ink"
          title="Download your recording"
        >
          <IconArrow className="h-3.5 w-3.5 rotate-90" />
        </a>
      </div>
    </div>
  );
}

/* ════════════ identify step ════════════ */
function Identify({
  prompt,
  choices,
  correct,
  persistKey,
  checks,
  onToggle,
  explain,
}: {
  prompt: string;
  choices: string[];
  correct: string;
  persistKey: string;
  checks: Props["checks"];
  onToggle: Props["onToggle"];
  explain: string;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const saved = !!checks[persistKey];
  const wrongPick = picked && picked !== correct && !saved;

  return (
    <div className="rounded-md border border-line bg-paper/60 p-3.5">
      <p className={`${mono} mb-2`}>identify</p>
      <p className="mb-2.5 text-[13px] font-semibold text-ink">{prompt}</p>
      <div className="flex flex-wrap gap-1.5">
        {choices.map((c) => {
          const isCorrect = c === correct;
          const isPicked = picked === c;
          const showState = saved ? isCorrect : isPicked;
          return (
            <button
              key={c}
              disabled={saved}
              onClick={() => {
                setPicked(c);
                if (isCorrect && !saved) onToggle(persistKey);
              }}
              className={`rounded-md border px-3 py-1.5 font-ipa text-[13.5px] font-semibold transition-all active:scale-95 disabled:cursor-default ${
                saved && isCorrect
                  ? "border-moss bg-moss/15 text-moss"
                  : wrongPick && isPicked
                    ? "animate-[shake_0.35s] border-ember bg-ember/10 text-ember"
                    : "border-line bg-chalk text-ink hover:-translate-y-0.5 hover:border-ink hover:shadow-sm"
              }`}
            >
              {c}
            </button>
          );
        })}
        <button
          onClick={() => setPicked(null)}
          disabled={saved}
          className="ml-auto rounded-md border border-dashed border-line px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-fog transition-colors hover:border-ember hover:text-ember disabled:opacity-40"
          title="Try again"
        >
          retry
        </button>
      </div>
      {saved && (
        <p className="mt-2 rounded-md border-l-4 border-moss bg-moss/10 px-3 py-1.5 text-[12px] font-medium text-moss">
          Correct — {explain}
        </p>
      )}
      {wrongPick && (
        <p className="mt-2 rounded-md border-l-4 border-ember bg-ember/10 px-3 py-1.5 text-[12px] font-medium text-ember">
          Not quite — listen again and retry.
        </p>
      )}
    </div>
  );
}

/* ════════════ module renderers ════════════ */

function ClusterCard({ item, idx, checks, onToggle, rec, speak }: { item: ClusterItem; idx: number; checks: Props["checks"]; onToggle: Props["onToggle"]; rec: ReturnType<typeof useRecorder>; speak: Props["speak"] }) {
  const pre = `cl:${idx}`;
  const done = !!checks[`${pre}:done`];
  const state = done ? 7 : checks[`${pre}:rec`] ? 5 : checks[`${pre}:id`] ? 3 : 1;
  const choices = useMemo(() => {
    const arr = [item.ipa, ...item.foils];
    const shift = idx % 3;
    return [...arr.slice(shift), ...arr.slice(0, shift)];
  }, [item, idx]);

  return (
    <article className={cardCls}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-3">
            <h4 className="font-ipa text-[30px] font-bold leading-none text-ink">{item.ipa}</h4>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog">cluster {idx + 1}/{CLUSTERS.length}</span>
          </div>
          <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-fog">{item.rule}</p>
        </div>
        <StepDots state={state} />
      </div>

      <div className="mt-3.5 grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="rounded-md border border-line bg-paper/60 p-3.5">
            <p className={`${mono} mb-2`}>listen & repeat · progressive</p>
            <div className="flex flex-col gap-2">
              {item.words.map((w, wi) => (
                <div key={w.t} className="flex items-center gap-2.5">
                  <span className="w-5 shrink-0 text-center font-mono text-[10px] tabular-nums text-fog">{wi + 1}</span>
                  <button
                    onClick={() => speak(w.t)}
                    className="group flex flex-1 items-center justify-between gap-2 rounded-md border border-line bg-chalk px-3 py-1.5 transition-all hover:-translate-y-px hover:border-ink hover:shadow-sm active:scale-[0.99]"
                  >
                    <span className="text-[14px] font-semibold text-ink group-hover:text-ember">{w.t}</span>
                    <span className="flex items-center gap-2">
                      <span className="font-ipa text-[11.5px] text-fog">{w.ipa}</span>
                      <IconSpeaker className="h-3.5 w-3.5 text-fog transition-colors group-hover:text-ember" />
                    </span>
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2.5">
                <span className="w-5 shrink-0 text-center font-mono text-[10px] uppercase text-lagoon">s</span>
                <button
                  onClick={() => speak(item.sent.t)}
                  className="group flex flex-1 items-center justify-between gap-2 rounded-md border border-lagoon/40 bg-lagoon/5 px-3 py-1.5 transition-all hover:-translate-y-px hover:border-lagoon hover:shadow-sm active:scale-[0.99]"
                >
                  <span className="text-[13px] font-medium text-ink">{item.sent.t}</span>
                  <span className="flex items-center gap-2">
                    <span className="hidden font-ipa text-[11px] text-fog sm:inline">{item.sent.ipa}</span>
                    <IconSpeaker className="h-3.5 w-3.5 text-lagoon" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <Identify
            prompt="Listen, then pick the cluster you heard."
            choices={choices}
            correct={item.ipa}
            persistKey={`${pre}:id`}
            checks={checks}
            onToggle={onToggle}
            explain={`${item.ipa} as in “${item.words[0].t}”.`}
          />
        </div>

        <div className="flex flex-col gap-3">
          <RecordBlock
            recKey={`${pre}:rec`}
            doneKey={`${pre}:done`}
            idKey={`${pre}:id`}
            label={item.sent.t}
            modelText={item.sent.t}
            checks={checks}
            onToggle={onToggle}
            rec={rec}
            speak={speak}
            retryHint="Check the burst: keep the consonants glued together — no extra vowels inside the cluster."
          />
          <div className="rounded-md border border-dashed border-line bg-chalk/60 p-3.5">
            <p className={`${mono} mb-1.5`}>conversation</p>
            <p className="text-[13px] leading-relaxed text-ink/85">{item.talk}</p>
            <button
              onClick={() => rec.status === "recording" ? rec.stop() : rec.start()}
              disabled={rec.status === "processing" || rec.status === "requesting"}
              className="mt-2.5 flex items-center gap-1.5 rounded-md border border-line bg-chalk px-3 py-1.5 text-[11.5px] font-bold text-ink transition-all hover:border-ember hover:text-ember active:scale-95 disabled:opacity-50"
            >
              <IconMic className="h-3.5 w-3.5" /> {rec.status === "recording" ? "Stop talking" : "Talk & record"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function WordStressCard({ item, idx, checks, onToggle, rec, speak }: { item: WordStressItem; idx: number; checks: Props["checks"]; onToggle: Props["onToggle"]; rec: ReturnType<typeof useRecorder>; speak: Props["speak"] }) {
  const pre = `ws:${idx}`;
  const done = !!checks[`${pre}:done`];
  const state = done ? 7 : checks[`${pre}:rec`] ? 5 : checks[`${pre}:id`] ? 3 : 1;

  return (
    <article className={cardCls}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-3">
            <h4 className="font-display text-[26px] font-extrabold leading-none text-ink">{item.word}</h4>
            <span className="font-ipa text-[14px] text-fog">{item.ipa}</span>
          </div>
          <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-fog">
            {item.rule}
            {item.pair && <span className="ml-1 font-semibold text-honey">{item.pair}</span>}
          </p>
        </div>
        <StepDots state={state} />
      </div>

      <div className="mt-3.5 grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => speak(item.word)}
              className="group flex items-center gap-2 rounded-md border border-line bg-chalk px-4 py-2 transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-md active:scale-95"
            >
              <IconSpeaker className="h-4 w-4 text-lagoon" />
              <span className="text-[13.5px] font-bold text-ink group-hover:text-ember">Listen to the word</span>
            </button>
            <button
              onClick={() => speak(item.sent.t)}
              className="group flex items-center gap-2 rounded-md border border-line bg-chalk px-4 py-2 transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-md active:scale-95"
            >
              <IconSpeaker className="h-4 w-4 text-cobalt" />
              <span className="text-[13.5px] font-bold text-ink group-hover:text-ember">In a sentence</span>
            </button>
          </div>

          <div className="rounded-md border border-line bg-paper/60 p-3.5">
            <p className={`${mono} mb-2`}>identify · tap the stressed syllable</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {item.syllables.map((s, si) => {
                const saved = !!checks[`${pre}:id`];
                const isCorrect = si === item.stressed;
                return (
                  <button
                    key={s + si}
                    disabled={saved}
                    onClick={() => isCorrect && onToggle(`${pre}:id`)}
                    className={`min-w-[3.2rem] rounded-md border px-3 py-2.5 font-display text-[18px] font-bold transition-all active:scale-95 disabled:cursor-default ${
                      saved && isCorrect
                        ? "border-moss bg-moss/15 text-moss"
                        : saved
                          ? "border-line bg-chalk text-fog/60"
                          : "border-line bg-chalk text-ink hover:-translate-y-0.5 hover:border-honey hover:text-honey hover:shadow-md"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
              {checks[`${pre}:id`] && (
                <span className="ml-2 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-moss">
                  beat on “{item.syllables[item.stressed]}” ✓
                </span>
              )}
            </div>
          </div>
        </div>

        <RecordBlock
          recKey={`${pre}:rec`}
          doneKey={`${pre}:done`}
          idKey={`${pre}:id`}
          label={item.sent.t}
          modelText={item.sent.t}
          modelIpa={item.sent.ipa}
          checks={checks}
          onToggle={onToggle}
          rec={rec}
          speak={speak}
          retryHint="Say the word alone first, hammering the stressed syllable, then drop it into the sentence."
        />
      </div>
    </article>
  );
}

function SentenceStressCard({ item, idx, checks, onToggle, rec, speak }: { item: SentenceStressItem; idx: number; checks: Props["checks"]; onToggle: Props["onToggle"]; rec: ReturnType<typeof useRecorder>; speak: Props["speak"] }) {
  const pre = `ss:${idx}`;
  const done = !!checks[`${pre}:done`];
  const state = done ? 7 : checks[`${pre}:rec`] ? 5 : checks[`${pre}:id`] ? 3 : 1;
  const [tapped, setTapped] = useState<Set<string>>(new Set());
  const saved = !!checks[`${pre}:id`];
  const strongSet = useMemo(() => new Set(item.strong.map((s) => s.toLowerCase())), [item]);
  const weakSet = useMemo(() => new Set(item.weak.map((s) => s.toLowerCase())), [item]);
  const words = useMemo(() => item.text.replace(/[.,!?]/g, "").split(/\s+/), [item]);
  const correctSoFar = [...tapped].every((w) => strongSet.has(w));
  const complete = saved || (tapped.size === strongSet.size && correctSoFar);

  const tapWord = (w: string) => {
    if (saved) return;
    const lw = w.toLowerCase();
    setTapped((p) => {
      const n = new Set(p);
      if (n.has(lw)) n.delete(lw);
      else n.add(lw);
      return n;
    });
    const next = new Set(tapped);
    if (next.has(lw)) next.delete(lw);
    else next.add(lw);
    if (next.size === strongSet.size && [...next].every((x) => strongSet.has(x))) onToggle(`${pre}:id`);
  };

  return (
    <article className={cardCls}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className={`font-display text-[19px] font-bold leading-snug text-ink sm:text-[21px]`}>
          {words.map((w, i) => {
            const lw = w.toLowerCase();
            const isStrong = strongSet.has(lw);
            const isTapped = tapped.has(lw);
            const show = saved ? isStrong : isTapped;
            return (
              <button
                key={w + i}
                onClick={() => tapWord(w)}
                disabled={saved}
                className={`mx-[3px] rounded px-1 py-0.5 transition-all ${
                  show
                    ? isStrong || !saved
                      ? "bg-honey/25 text-ink shadow-[0_2px_0_var(--color-honey)]"
                      : "bg-ember/20 text-ember line-through"
                    : weakSet.has(lw) && saved
                      ? "text-fog/60"
                      : "hover:bg-line/60"
                }`}
                title={saved ? (isStrong ? "content word — carries a beat" : "function word — squeezed short") : "tap the words you think carry the beats"}
              >
                {w}
              </button>
            );
          })}
        </p>
        <StepDots state={state} />
      </div>
      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-fog">{item.note}</p>

      <div className="mt-3.5 grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="rounded-md border border-line bg-paper/60 p-3.5">
            <p className={`${mono} mb-2`}>listen · natural rhythm</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => speak(item.text)}
                className="flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-[13px] font-bold text-chalk transition-all hover:bg-ember active:scale-95"
              >
                <IconSpeaker className="h-4 w-4" /> Play sentence
              </button>
              <button
                onClick={() => speak(item.text, { rate: 0.55 })}
                className="flex items-center gap-2 rounded-md border border-line bg-chalk px-3 py-2 text-[12px] font-bold text-ink transition-all hover:border-ink active:scale-95"
              >
                <IconSlow className="h-4 w-4" /> Slow
              </button>
            </div>
            <p className="mt-2 font-mono text-[10.5px] text-fog">
              {item.strong.length} content-word beats · {item.weak.length} weak words
            </p>
          </div>

          {item.variant && (
            <div className="rounded-md border border-cobalt/40 bg-cobalt/5 p-3.5">
              <p className={`${mono} mb-2`} style={{ color: "var(--color-cobalt)" }}>contrastive stress</p>
              <p className="text-[13.5px] font-semibold text-ink">{item.variant.text}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-fog">{item.variant.focus}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => speak(item.variant!.text)} className="flex items-center gap-1.5 rounded-md border border-line bg-chalk px-3 py-1.5 text-[11.5px] font-bold text-ink transition-all hover:border-cobalt hover:text-cobalt active:scale-95">
                  <IconSpeaker className="h-3.5 w-3.5" /> Listen
                </button>
                <button onClick={() => speak(item.variant!.text, { rate: 0.55 })} className="flex items-center gap-1.5 rounded-md border border-line bg-chalk px-3 py-1.5 text-[11.5px] font-bold text-ink transition-all hover:border-cobalt hover:text-cobalt active:scale-95">
                  <IconSlow className="h-3.5 w-3.5" /> Slow
                </button>
              </div>
            </div>
          )}
        </div>

        <RecordBlock
          recKey={`${pre}:rec`}
          doneKey={`${pre}:done`}
          idKey={`${pre}:id`}
          label={item.text}
          modelText={item.text}
          modelIpa={item.ipa}
          checks={checks}
          onToggle={onToggle}
          rec={rec}
          speak={speak}
          retryHint="Tap the table: one tap per stressed word, quick light taps on the weak words between."
        />
      </div>
    </article>
  );
}

function ConnectedCard({ item, idx, checks, onToggle, rec, speak }: { item: ConnectedItem; idx: number; checks: Props["checks"]; onToggle: Props["onToggle"]; rec: ReturnType<typeof useRecorder>; speak: Props["speak"] }) {
  const pre = `cs:${idx}`;
  const done = !!checks[`${pre}:done`];
  const state = done ? 7 : checks[`${pre}:rec`] ? 5 : checks[`${pre}:id`] ? 3 : 1;
  const others = useMemo(() => {
    const rest = [...new Set(CONNECTED.filter((c) => c.type !== item.type).map((c) => c.type))];
    return [item.type, rest[idx % rest.length], rest[(idx + 1) % rest.length]];
  }, [item, idx]);

  return (
    <article className={cardCls}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-chalk" style={{ backgroundColor: CATEGORY_META.triphthong.hex }}>
              {item.type}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog">item {idx + 1}/{CONNECTED.length}</span>
          </div>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-fog">{item.rule}</p>
        </div>
        <StepDots state={state} />
      </div>

      <div className="mt-3.5 grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-md border border-line bg-paper/60 p-3.5">
              <p className={`${mono} mb-2`}>careful speech</p>
              <p className="text-[15px] font-semibold text-ink">{item.careful.t}</p>
              <p className="mt-0.5 font-ipa text-[11.5px] text-fog">{item.careful.ipa}</p>
              <button onClick={() => speak(item.careful.t, { rate: 0.8 })} className="mt-2 flex items-center gap-1.5 rounded-md border border-line bg-chalk px-3 py-1.5 text-[11.5px] font-bold text-ink transition-all hover:border-ink hover:shadow-sm active:scale-95">
                <IconSpeaker className="h-3.5 w-3.5" /> Careful
              </button>
            </div>
            <div className="rounded-md border border-line bg-chalk p-3.5 ring-1 ring-honey/40">
              <p className={`${mono} mb-2`} style={{ color: "var(--color-honey)" }}>natural speech</p>
              <p className="text-[15px] font-bold text-ink">{item.natural.t}</p>
              <p className="mt-0.5 font-ipa text-[11.5px] text-fog">{item.natural.ipa}</p>
              <button onClick={() => speak(item.careful.t)} className="mt-2 flex items-center gap-1.5 rounded-md bg-honey px-3 py-1.5 text-[11.5px] font-bold text-chalk transition-all hover:brightness-110 active:scale-95">
                <IconSpeaker className="h-3.5 w-3.5" /> Natural
              </button>
            </div>
          </div>

          <Identify
            prompt="What happens in the natural version?"
            choices={others}
            correct={item.type}
            persistKey={`${pre}:id`}
            checks={checks}
            onToggle={onToggle}
            explain={`“${item.careful.t}” becomes “${item.natural.t}” by ${item.type.toLowerCase()}.`}
          />
        </div>

        <RecordBlock
          recKey={`${pre}:rec`}
          doneKey={`${pre}:done`}
          idKey={`${pre}:id`}
          label={item.natural.t}
          modelText={item.careful.t}
          checks={checks}
          onToggle={onToggle}
          rec={rec}
          speak={speak}
          retryHint="Say it fast and lazy — natural speech is about letting sounds lean on each other."
        />
      </div>
    </article>
  );
}

function ConversationView({ conv, onBack, checks, onToggle, rec, speak }: { conv: Conversation; onBack: () => void; checks: Props["checks"]; onToggle: Props["onToggle"]; rec: ReturnType<typeof useRecorder>; speak: Props["speak"] }) {
  const [role, setRole] = useState<0 | 1>(0);
  const myLines = conv.lines.map((l, i) => ({ l, i })).filter((x) => x.l.role === role);
  const doneCount = myLines.filter((x) => checks[`cv:${conv.id}:L${x.i}`]).length;
  const complete = doneCount === myLines.length && myLines.length > 0;

  return (
    <article className={cardCls}>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={onBack} className="flex items-center gap-1.5 rounded-md border border-line bg-chalk px-3 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-fog transition-all hover:border-ink hover:text-ink active:scale-95">
          <IconArrow className="h-3.5 w-3.5 rotate-180" /> All situations
        </button>
        <h4 className="font-display text-[22px] font-extrabold text-ink">{conv.title}</h4>
        <span className="font-mono text-[10.5px] text-fog">{conv.setting}</span>
        <span className={`ml-auto rounded-md px-2.5 py-1 font-mono text-[10.5px] font-bold tabular-nums ${complete ? "bg-moss text-chalk" : "bg-line text-fog"}`}>
          {doneCount}/{myLines.length} lines
        </span>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[240px_1fr]">
        <div className="flex flex-col gap-3">
          <div className="rounded-md border border-line bg-paper/60 p-3.5">
            <p className={`${mono} mb-2`}>your role</p>
            <div className="grid grid-cols-2 gap-1.5">
              {([0, 1] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  aria-pressed={role === r}
                  className={`rounded-md border px-2 py-2 text-[12px] font-bold transition-all active:scale-95 ${
                    role === r ? "border-transparent bg-ink text-chalk shadow-md" : "border-line bg-chalk text-ink hover:border-ink"
                  }`}
                >
                  {conv.roles[r]}
                </button>
              ))}
            </div>
            <p className="mt-2.5 text-[11.5px] leading-relaxed text-fog">
              Listen to both sides, then record only your lines. Replay your partner anytime with A/B.
            </p>
          </div>
          <div className="rounded-md border border-line bg-paper/60 p-3.5">
            <p className={`${mono} mb-2`}>key phrases</p>
            {conv.phrases.map((p) => (
              <button key={p.t} onClick={() => speak(p.t)} className="group mb-1.5 flex w-full items-start justify-between gap-2 rounded-md border border-line bg-chalk px-2.5 py-2 text-left transition-all hover:-translate-y-px hover:border-ink hover:shadow-sm last:mb-0">
                <span>
                  <span className="block text-[12.5px] font-semibold text-ink group-hover:text-ember">{p.t}</span>
                  <span className="mt-0.5 block font-ipa text-[10.5px] text-fog">{p.ipa}</span>
                </span>
                <IconSpeaker className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fog group-hover:text-ember" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {conv.lines.map((line, i) => {
            const mine = line.role === role;
            const recDone = !!checks[`cv:${conv.id}:L${i}`];
            const partnerText = conv.lines.find((x) => x.role !== line.role)?.t ?? "";
            return (
              <div
                key={i}
                className={`rounded-md border p-3 transition-colors ${
                  mine ? (recDone ? "border-moss/60 bg-moss/5" : "border-honey/50 bg-honey/5") : "border-line bg-paper/50"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] ${mine ? "bg-honey text-chalk" : "bg-line text-fog"}`}>
                    {conv.roles[line.role]}
                  </span>
                  <p className="text-[13.5px] font-medium leading-snug text-ink">{line.t}</p>
                  {line.tip && <p className="w-full font-mono text-[10px] text-fog">▸ {line.tip}</p>}
                  <div className="ml-auto flex shrink-0 items-center gap-1.5">
                    {mine ? (
                      <>
                        <button
                          onClick={() => speak(partnerText)}
                          className="rounded-md border border-line bg-chalk px-2 py-1.5 text-[10.5px] font-bold text-fog transition-all hover:border-ink hover:text-ink active:scale-95"
                          title="Hear your partner's cue line"
                        >
                          cue
                        </button>
                        <button
                          onClick={() => (recDone ? onToggle(`cv:${conv.id}:L${i}`) : (rec.start()))}
                          disabled={rec.status === "processing" || rec.status === "requesting"}
                          className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[10.5px] font-bold transition-all active:scale-95 disabled:opacity-50 ${
                            recDone ? "border border-moss/60 bg-moss/10 text-moss hover:border-ember hover:text-ember" : "bg-ink text-chalk hover:bg-ember"
                          }`}
                          title={recDone ? "Un-mark / re-record this line" : "Record this line"}
                        >
                          {recDone ? <><IconCheck className="h-3 w-3" /> done</> : <><IconMic className="h-3 w-3" /> record</>}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => speak(line.t)}
                        className="grid h-7 w-7 place-items-center rounded-md border border-line bg-chalk text-fog transition-all hover:border-ink hover:text-ink active:scale-90"
                        title="Listen to this line"
                      >
                        <IconSpeaker className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                {mine && rec.status === "recording" && (
                  <div className="mt-2 flex items-center gap-2.5">
                    <RecLive rec={rec} />
                    <button onClick={rec.stop} className="shrink-0 rounded-md bg-ember px-3 py-2 text-[11px] font-bold text-chalk active:scale-95">
                      Done — mark line
                    </button>
                  </div>
                )}
                {mine && recDone && (
                  <p className="mt-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-moss">✓ recorded & marked</p>
                )}
              </div>
            );
          })}
          {complete && (
            <p className="mt-1 rounded-md border-l-4 border-moss bg-moss/10 px-3 py-2 text-[12.5px] font-semibold text-moss">
              Scene complete — swap roles and run it again from the other side.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/* ════════════ hub ════════════ */
export default function SkillsLab({ checks, onToggle, speak, speaking, onJumpToBench }: Props) {
  const rec = useRecorder();
  const [active, setActive] = useState<ModuleId>("clusters");
  const [convId, setConvId] = useState<string | null>(null);

  const moduleDone = (pre: string, total: number) => {
    let n = 0;
    for (let i = 0; i < total; i++) if (checks[`${pre}:${i}:done`]) n++;
    return n;
  };

  const counts: Record<ModuleId, { done: number; total: number }> = {
    clusters: { done: moduleDone("cl", CLUSTERS.length), total: CLUSTERS.length },
    wstress: { done: moduleDone("ws", WORD_STRESS.length), total: WORD_STRESS.length },
    sstress: { done: moduleDone("ss", SENTENCE_STRESS.length), total: SENTENCE_STRESS.length },
    cspeech: { done: moduleDone("cs", CONNECTED.length), total: CONNECTED.length },
    conv: {
      done: CONVERSATIONS.filter((c) => c.lines.filter((l, i) => checks[`cv:${c.id}:L${i}`]).length === c.lines.filter((l) => l.role === 0).length + c.lines.filter((l) => l.role === 1).length && c.lines.length > 0).length,
      total: CONVERSATIONS.length,
    },
  };
  const convDoneCount = (c: Conversation) => c.lines.filter((_, i) => checks[`cv:${c.id}:L${i}`]).length;

  const activeMeta = MODULES.find((m) => m.id === active)!;
  const activeConv = convId ? CONVERSATIONS.find((c) => c.id === convId) : null;

  return (
    <div>
      {/* pipeline key */}
      <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-md border border-line bg-card px-4 py-2.5">
        <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-ember">every activity</span>
        {["Learn", "Listen", "Identify", "Repeat", "Record", "Analyse", "Feedback", "Retry", "Score"].map((s, i, arr) => (
          <span key={s} className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider text-fog">
            {i > 0 && <span className="text-line">→</span>}
            <span className={i === arr.length - 1 ? "font-bold text-moss" : ""}>{s}</span>
          </span>
        ))}
      </div>

      {/* main practice buttons */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
        <button
          onClick={onJumpToBench}
          className="group flex flex-col items-start rounded-lg border border-line bg-card p-3.5 text-left shadow-[0_2px_0_rgba(20,48,42,0.06)] transition-all hover:-translate-y-1 hover:border-lagoon hover:shadow-lg"
          title="Station 03 — syllable → word → sentence drills for all 49 sounds"
        >
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-lagoon">Station 03 ↗</span>
          <span className="mt-1 font-display text-[15px] font-bold leading-tight text-ink group-hover:text-lagoon">
            Phoneme Drills
          </span>
          <span className="mt-1 text-[11px] leading-snug text-fog">Syllable → Word → Sentence</span>
        </button>
        {MODULES.map((m) => {
          const c = counts[m.id];
          const on = active === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                setActive(m.id);
                setConvId(null);
              }}
              aria-pressed={on}
              className={`group relative flex flex-col items-start overflow-hidden rounded-lg border p-3.5 text-left transition-all hover:-translate-y-1 hover:shadow-lg ${
                on ? "border-transparent text-chalk shadow-lg" : "border-line bg-card shadow-[0_2px_0_rgba(20,48,42,0.06)] hover:border-ink/50"
              }`}
              style={on ? { backgroundColor: m.hex } : undefined}
              title={m.blurb}
            >
              <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.18em] ${on ? "text-chalk/70" : ""}`} style={!on ? { color: m.hex } : undefined}>
                {c.done}/{c.total} done
              </span>
              <span className={`mt-1 font-display text-[15px] font-bold leading-tight ${on ? "text-chalk" : "text-ink"}`}>
                {m.short}
              </span>
              <span className={`mt-1 line-clamp-2 text-[11px] leading-snug ${on ? "text-chalk/75" : "text-fog"}`}>
                {m.blurb}
              </span>
              <span className={`absolute inset-x-3 bottom-0 h-0.5 origin-left rounded-full transition-transform duration-300 ${on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} style={{ backgroundColor: on ? "var(--color-chalk)" : m.hex }} />
            </button>
          );
        })}
      </div>

      {/* module body */}
      <div className="mt-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-[24px] font-extrabold tracking-tight" style={{ color: activeMeta.hex }}>
            {activeMeta.name}
          </h3>
          <p className="mt-1 max-w-2xl text-[13.5px] leading-relaxed text-fog">{activeMeta.blurb}</p>
        </div>
        <div className="flex items-center gap-3">
          {speaking && (
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-lagoon">
              <span className="blink-dot h-2 w-2 rounded-full bg-lagoon" /> model voice live
            </span>
          )}
          <div className="h-2.5 w-36 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${counts[active].total ? (counts[active].done / counts[active].total) * 100 : 0}%`, backgroundColor: activeMeta.hex }}
            />
          </div>
          <span className="font-mono text-[11px] font-bold tabular-nums text-ink">
            {Math.round((counts[active].done / Math.max(1, counts[active].total)) * 100)}%
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {active === "clusters" &&
          CLUSTERS.map((c, i) => (
            <ClusterCard key={c.id} item={c} idx={i} checks={checks} onToggle={onToggle} rec={rec} speak={speak} />
          ))}

        {active === "wstress" &&
          WORD_STRESS.map((w, i) => (
            <WordStressCard key={w.id} item={w} idx={i} checks={checks} onToggle={onToggle} rec={rec} speak={speak} />
          ))}

        {active === "sstress" &&
          SENTENCE_STRESS.map((s, i) => (
            <SentenceStressCard key={s.id} item={s} idx={i} checks={checks} onToggle={onToggle} rec={rec} speak={speak} />
          ))}

        {active === "cspeech" &&
          CONNECTED.map((c, i) => (
            <ConnectedCard key={c.id} item={c} idx={i} checks={checks} onToggle={onToggle} rec={rec} speak={speak} />
          ))}

        {active === "conv" &&
          (activeConv ? (
            <ConversationView
              conv={activeConv}
              onBack={() => setConvId(null)}
              checks={checks}
              onToggle={onToggle}
              rec={rec}
              speak={speak}
            />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CONVERSATIONS.map((c) => {
                const d = convDoneCount(c);
                return (
                  <button
                    key={c.id}
                    onClick={() => setConvId(c.id)}
                    className="group relative overflow-hidden rounded-lg border border-line bg-card p-4 text-left shadow-[0_2px_0_rgba(20,48,42,0.06)] transition-all hover:-translate-y-1 hover:border-moss hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-[16.5px] font-bold text-ink group-hover:text-moss">{c.title}</span>
                      <IconArrow className="h-4 w-4 shrink-0 text-fog transition-all group-hover:translate-x-0.5 group-hover:text-moss" />
                    </div>
                    <p className="mt-1 text-[12px] leading-snug text-fog">{c.setting}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-sm bg-line px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-fog">
                        {c.roles[0]} ↔ {c.roles[1]}
                      </span>
                      <span className={`ml-auto font-mono text-[10px] font-bold tabular-nums ${d === c.lines.length ? "text-moss" : "text-fog"}`}>
                        {d}/{c.lines.length} lines
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
                      <div className="h-full rounded-full bg-moss transition-all duration-700" style={{ width: `${(d / c.lines.length) * 100}%` }} />
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
      </div>

      {rec.error && (
        <div className="mt-5 flex items-start gap-3 rounded-md border border-ember/50 bg-ember/10 px-4 py-3">
          <IconMic className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
          <div>
            <p className="text-[13px] font-bold text-ember">Microphone unavailable</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-ember/80">{rec.error}</p>
          </div>
          <button onClick={rec.reset} className="ml-auto flex items-center gap-1 rounded-md border border-ember/40 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ember transition-colors hover:bg-ember hover:text-chalk">
            <IconTrash className="h-3 w-3" /> dismiss
          </button>
        </div>
      )}
    </div>
  );
}
