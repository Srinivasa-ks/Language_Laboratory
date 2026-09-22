import { useCallback, useEffect, useRef, useState } from "react";

export interface SpeakOptions {
  rate?: number;
  onEnd?: () => void;
}

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(0.95);
  const [supported] = useState(() => typeof window !== "undefined" && "speechSynthesis" in window);

  const voiceURIRef = useRef(voiceURI);
  voiceURIRef.current = voiceURI;
  const rateRef = useRef(rate);
  rateRef.current = rate;

  useEffect(() => {
    if (!supported) return;
    const load = () => {
      const all = window.speechSynthesis.getVoices();
      const en = all.filter((v) => /^en([-_]|$)/i.test(v.lang));
      const gb = en.filter((v) => /^en[-_]gb/i.test(v.lang));
      const rest = en.filter((v) => !/^en[-_](gb|us)/i.test(v.lang));
      const us = en.filter((v) => /^en[-_]us/i.test(v.lang));
      const sorted = [...gb, ...rest, ...us];
      setVoices(sorted);
      setVoiceURI((prev) => {
        if (prev && sorted.some((v) => v.voiceURI === prev)) return prev;
        const preferred =
          sorted.find((v) => /google uk|daniel|sonia|libby|serena|arthur/i.test(v.name)) ??
          sorted[0];
        return preferred ? preferred.voiceURI : "";
      });
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, [supported]);

  const speak = useCallback(
    (text: string, opts?: SpeakOptions) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = window.speechSynthesis.getVoices().find((x) => x.voiceURI === voiceURIRef.current);
      if (v) {
        u.voice = v;
        u.lang = v.lang;
      } else {
        u.lang = "en-GB";
      }
      u.rate = Math.min(1.4, Math.max(0.3, (opts?.rate ?? 1) * rateRef.current));
      u.pitch = 1;
      u.onstart = () => setSpeaking(true);
      u.onend = () => {
        setSpeaking(false);
        opts?.onEnd?.();
      };
      u.onerror = () => {
        setSpeaking(false);
        opts?.onEnd?.();
      };
      window.speechSynthesis.speak(u);
    },
    [supported]
  );

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  useEffect(() => () => stop(), [stop]);

  return { voices, voiceURI, setVoiceURI, rate, setRate, speak, stop, speaking, supported };
}
