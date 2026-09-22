import { useCallback, useEffect, useRef, useState } from "react";

export interface Recording {
  url: string;
  bars: number[];
  duration: number;
}

export type RecStatus = "idle" | "requesting" | "recording" | "processing" | "error";

const BAR_COUNT = 88;

function computeBars(buffer: AudioBuffer): number[] {
  const data = buffer.getChannelData(0);
  const bars: number[] = new Array(BAR_COUNT).fill(0);
  const bucket = Math.max(1, Math.floor(data.length / BAR_COUNT));
  for (let i = 0; i < BAR_COUNT; i++) {
    let peak = 0;
    const start = i * bucket;
    const end = Math.min(start + bucket, data.length);
    for (let j = start; j < end; j += 4) {
      const v = Math.abs(data[j]);
      if (v > peak) peak = v;
    }
    bars[i] = peak;
  }
  const max = Math.max(0.001, ...bars);
  return bars.map((b) => Math.max(0.06, b / max));
}

export function useRecorder() {
  const [status, setStatus] = useState<RecStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [recording, setRecording] = useState<Recording | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const mediaRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number>(0);
  const urlRef = useRef<string | null>(null);
  const cancelRef = useRef(false);

  const killStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const start = useCallback(async () => {
    setError(null);
    cancelRef.current = false;
    setRecording((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (cancelRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        setStatus("idle");
        return;
      }
      streamRef.current = stream;
      const Ctx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      ctxRef.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.55;
      src.connect(analyser);
      analyserRef.current = analyser;

      const mr = new MediaRecorder(stream);
      mediaRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.start();
      setElapsed(0);
      setStatus("recording");
      timerRef.current = window.setInterval(() => setElapsed((e) => e + 0.1), 100);
    } catch (err) {
      setStatus("error");
      const blocked =
        err instanceof DOMException &&
        (err.name === "NotAllowedError" || err.name === "SecurityError" || err.name === "NotFoundError");
      setError(
        blocked
          ? "Microphone access was blocked. Allow the mic for this site in your browser settings, then try again."
          : "The microphone could not be started on this device."
      );
      killStream();
    }
  }, []);

  const stop = useCallback(() => {
    cancelRef.current = true;
    const mr = mediaRef.current;
    if (!mr || mr.state === "inactive") {
      setStatus("idle");
      return;
    }
    window.clearInterval(timerRef.current);
    setStatus("processing");

    mr.onstop = async () => {
      killStream();
      const blob = new Blob(chunksRef.current, { type: mr.mimeType || "audio/webm" });
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      const url = URL.createObjectURL(blob);
      urlRef.current = url;

      let bars: number[] = new Array(BAR_COUNT).fill(0.12);
      let duration = 0;
      try {
        const ctx = ctxRef.current ?? new AudioContext();
        const ab = await blob.arrayBuffer();
        const decoded = await ctx.decodeAudioData(ab);
        bars = computeBars(decoded);
        duration = decoded.duration;
        if (ctx !== ctxRef.current) void ctx.close();
      } catch {
        duration = 0;
      }
      if (ctxRef.current) {
        void ctxRef.current.close().catch(() => undefined);
        ctxRef.current = null;
      }
      analyserRef.current = null;
      setRecording({ url, bars, duration });
      setStatus("idle");
    };
    mr.stop();
  }, []);

  const getAnalyser = useCallback(() => analyserRef.current, []);

  const reset = useCallback(() => {
    cancelRef.current = true;
    if (mediaRef.current && mediaRef.current.state === "recording") {
      window.clearInterval(timerRef.current);
      mediaRef.current.stop();
      killStream();
    }
    setStatus("idle");
    setRecording((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
  }, []);

  useEffect(
    () => () => {
      window.clearInterval(timerRef.current);
      if (mediaRef.current && mediaRef.current.state === "recording") mediaRef.current.stop();
      killStream();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      if (ctxRef.current) void ctxRef.current.close().catch(() => undefined);
    },
    []
  );

  return { status, error, recording, elapsed, start, stop, reset, getAnalyser };
}
