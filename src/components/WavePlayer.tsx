import { useEffect, useRef, useState } from "react";
import type { Recording } from "../hooks/useRecorder";
import { IconDownload, IconPlay, IconStop } from "./Icons";

interface Props {
  recording: Recording;
  accent?: string;
  downloadName?: string;
}

function fmt(t: number) {
  if (!isFinite(t) || t <= 0) return "0:00.0";
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  return `${m}:${s < 10 ? "0" : ""}${s.toFixed(1)}`;
}

export default function WavePlayer({ recording, accent = "var(--color-ember)", downloadName = "my-take" }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
  }, [recording.url]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
    } else {
      void a.play();
    }
  };

  const n = recording.bars.length;

  return (
    <div className="flex items-center gap-3">
      <audio
        ref={audioRef}
        src={recording.url}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          const dur = isFinite(a.duration) && a.duration > 0 ? a.duration : recording.duration;
          if (dur > 0) setProgress(Math.min(1, a.currentTime / dur));
        }}
      />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause your recording" : "Play your recording"}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-chalk transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: accent }}
      >
        {playing ? <IconStop className="h-4.5 w-4.5" /> : <IconPlay className="h-4.5 w-4.5 translate-x-[1px]" />}
      </button>

      <div className="flex h-11 flex-1 items-center gap-[2px] overflow-hidden" role="img" aria-label="Waveform of your recording">
        {recording.bars.map((b, i) => {
          const played = i / n <= progress;
          return (
            <span
              key={i}
              className="min-w-[2px] flex-1 rounded-full transition-colors duration-100"
              style={{
                height: `${Math.max(8, b * 100)}%`,
                backgroundColor: played ? accent : "var(--color-line)",
              }}
            />
          );
        })}
      </div>

      <span className="shrink-0 font-mono text-[11px] tabular-nums text-fog">
        {fmt(recording.duration)}
      </span>

      <a
        href={recording.url}
        download={`${downloadName}.webm`}
        aria-label="Download recording"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line bg-chalk text-ink transition-colors hover:border-ember hover:text-ember"
      >
        <IconDownload className="h-4 w-4" />
      </a>
    </div>
  );
}
