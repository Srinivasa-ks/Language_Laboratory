import { useMemo, useState } from "react";
import {
  GRAMMAR_LEVELS,
  grammarDone,
  grammarKey,
  type GrammarExerciseType,
  type GrammarQuestion,
} from "../data/grammar";
import type { ChecksMap } from "../lib/progress";
import { IconCheck, IconRedo } from "./Icons";

interface Props {
  checks: ChecksMap;
  onComplete: (key: string) => void;
}

const typeLabel: Record<GrammarExerciseType, string> = {
  mcq: "Multiple choice",
  fill: "Fill in the blank",
  error: "Error correction",
  transform: "Sentence transformation",
  rearrange: "Sentence rearrangement",
  matching: "Matching",
  identify: "Identify the grammar element",
};

const normalise = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();

export default function GrammarLab({ checks, onComplete }: Props) {
  const [levelId, setLevelId] = useState(GRAMMAR_LEVELS[0].id);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [activeLeft, setActiveLeft] = useState<string | null>(null);
  const [selectedErrorPart, setSelectedErrorPart] = useState<string | null>(null);

  const level = GRAMMAR_LEVELS.find((item) => item.id === levelId) ?? GRAMMAR_LEVELS[0];
  const question = level.questions[questionIndex];
  const key = grammarKey(level.id, question.id);
  const totalDone = grammarDone(checks);
  const isMarked = Boolean(checks[key]);

  const resetQuestion = () => {
    setAnswer("");
    setMatches({});
    setActiveLeft(null);
    setSelectedErrorPart(null);
    setFeedback(null);
  };

  const chooseLevel = (id: string) => {
    setLevelId(id);
    setQuestionIndex(0);
    resetQuestion();
  };

  const expectedMatch = useMemo(
    () => Object.fromEntries((question.pairs ?? []).map((pair) => [pair.left, pair.right])),
    [question]
  );

  const isAnswerCorrect = () => {
    if (question.type === "matching") {
      return Object.keys(expectedMatch).every((item) => matches[item] === expectedMatch[item]);
    }
    if (question.type === "rearrange") {
      return normalise(answer.split("|").join(" ")) === normalise(question.answer);
    }
    if (question.type === "error") {
      return Boolean(selectedErrorPart) && normalise(answer) === normalise(question.answer);
    }
    return normalise(answer) === normalise(question.answer);
  };

  const submit = () => {
    const correct = isAnswerCorrect();
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) onComplete(key);
  };

  const nextQuestion = () => {
    setQuestionIndex((current) => (current + 1) % level.questions.length);
    resetQuestion();
  };

  const errorSentence = question.type === "error" ? question.prompt.split(":").slice(1).join(":").trim() : "";
  const errorWords = errorSentence.replace(/[.?!]$/, "").split(/\s+/).filter(Boolean);

  const renderInput = (item: GrammarQuestion) => {
    if (item.type === "mcq") {
      return (
        <div className="grid gap-2 sm:grid-cols-3">
          {(item.options ?? []).map((option) => (
            <button
              key={option}
              onClick={() => setAnswer(option)}
              disabled={feedback !== null}
              className={`rounded-md border px-3 py-3 text-left text-[14px] font-semibold transition-all ${
                answer === option ? "border-ink bg-ink text-chalk" : "border-line bg-card text-ink hover:border-ember"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }
    if (item.type === "identify") {
      return (
        <div className="grid gap-2 sm:grid-cols-3">
          {(item.options ?? []).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setAnswer(option)}
              disabled={feedback !== null}
              aria-pressed={answer === option}
              className={`rounded-md border px-3 py-3 text-left text-[14px] font-semibold transition-all ${
                answer === option ? "border-ink bg-ink text-chalk" : "border-line bg-card text-ink hover:border-ember"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }
    if (item.type === "error") {
      return (
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
            Select the incorrect part
          </p>
          <div className="flex flex-wrap gap-2 rounded-md border border-dashed border-line bg-card p-3">
            {errorWords.map((word) => (
              <button
                key={word}
                type="button"
                onClick={() => setSelectedErrorPart(word)}
                disabled={feedback !== null}
                aria-pressed={selectedErrorPart === word}
                className={`rounded-md border px-2.5 py-1.5 font-mono text-[12px] transition-colors ${
                  selectedErrorPart === word ? "border-ember bg-ember text-chalk" : "border-line bg-paper text-ink hover:border-ember"
                }`}
              >
                {word}
              </button>
            ))}
          </div>
          <input
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            disabled={feedback !== null}
            placeholder="Type the corrected sentence…"
            aria-label="Corrected sentence"
            className="mt-3 w-full rounded-md border border-line bg-card px-3.5 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-fog/60 focus:border-ember"
          />
        </div>
      );
    }
    if (item.type === "rearrange") {
      const selected = answer ? answer.split("|") : [];
      return (
        <div>
          <div className="flex min-h-12 flex-wrap gap-2 rounded-md border border-dashed border-line bg-paper p-3">
            {selected.map((token, index) => (
              <button
                key={`${token}-${index}`}
                onClick={() => setAnswer(selected.filter((_, i) => i !== index).join("|"))}
                disabled={feedback !== null}
                className="rounded bg-ink px-2.5 py-1.5 font-mono text-[12px] text-chalk"
              >
                {token}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(item.tokens ?? []).filter((token) => !selected.includes(token)).map((token) => (
              <button
                key={token}
                onClick={() => setAnswer([...selected, token].join("|"))}
                disabled={feedback !== null}
                className="rounded-md border border-line bg-card px-2.5 py-1.5 font-mono text-[12px] text-ink transition-colors hover:border-ember"
              >
                {token}
              </button>
            ))}
          </div>
        </div>
      );
    }
    if (item.type === "matching") {
      const choices = item.pairs?.map((pair) => pair.right) ?? [];
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog">Choose a left item</p>
            {(item.pairs ?? []).map((pair) => (
              <button
                key={pair.left}
                type="button"
                onClick={() => setActiveLeft(pair.left)}
                disabled={feedback !== null}
                aria-pressed={activeLeft === pair.left}
                className={`block w-full rounded-md border px-3 py-2.5 text-left text-[13px] font-semibold transition-colors ${
                  activeLeft === pair.left ? "border-ink bg-ink text-chalk" : "border-line bg-card text-ink hover:border-ember"
                }`}
              >
                {pair.left}{matches[pair.left] && <span className="ml-2 text-[11px] opacity-70">→ {matches[pair.left]}</span>}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog">Choose its match</p>
            {choices.map((choice) => (
              <button
                key={choice}
                type="button"
                onClick={() => {
                  if (!activeLeft) return;
                  setMatches((current) => ({ ...current, [activeLeft]: choice }));
                  setActiveLeft(null);
                }}
                disabled={feedback !== null || !activeLeft}
                className="block w-full rounded-md border border-line bg-card px-3 py-2.5 text-left text-[13px] text-ink transition-colors hover:border-ember disabled:cursor-not-allowed disabled:opacity-50"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      );
    }
    return (
      <input
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        disabled={feedback !== null}
        placeholder={item.type === "transform" ? "Type the transformed sentence…" : "Type your answer…"}
        aria-label={item.type === "transform" ? "Transformed sentence" : "Answer"}
        className="w-full rounded-md border border-line bg-card px-3.5 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-fog/60 focus:border-ember"
      />
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
      <aside className="flex flex-col gap-3">
        <div className="rounded-lg border border-line bg-card p-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-fog">Grammar progress</p>
          <p className="mt-2 font-display text-3xl font-extrabold text-ink">{totalDone}<span className="text-base text-fog">/{GRAMMAR_LEVELS.reduce((sum, item) => sum + item.questions.length, 0)}</span></p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-fog">correct exercises saved</p>
        </div>
        {GRAMMAR_LEVELS.map((item) => {
          const done = item.questions.filter((entry) => checks[grammarKey(item.id, entry.id)]).length;
          return (
            <button
              key={item.id}
              onClick={() => chooseLevel(item.id)}
              className={`rounded-lg border p-3 text-left transition-all ${level.id === item.id ? "border-ink bg-ink text-chalk shadow-md" : "border-line bg-card text-ink hover:border-ember"}`}
              style={level.id === item.id ? { borderLeftColor: item.color, borderLeftWidth: 5 } : undefined}
            >
              <span className="block font-display text-[15px] font-bold">{item.name}</span>
              <span className={`mt-0.5 block font-mono text-[10px] ${level.id === item.id ? "text-chalk/65" : "text-fog"}`}>{item.classes}</span>
              <span className={`mt-2 block font-mono text-[10px] ${level.id === item.id ? "text-honey" : "text-fog"}`}>{done}/{item.questions.length} complete</span>
            </button>
          );
        })}
      </aside>

      <div className="rounded-lg border border-line bg-paper p-5 shadow-[0_2px_0_rgba(20,48,42,0.07)] sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: level.color }}>{level.classes}</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-ink">{level.name}</h3>
            <p className="mt-1 max-w-xl text-[13.5px] leading-relaxed text-fog">{level.blurb}</p>
          </div>
          <span className="rounded-md bg-card px-3 py-2 font-mono text-[11px] tabular-nums text-fog">Question {questionIndex + 1}/{level.questions.length}</span>
        </div>

        <div className="mt-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-chalk" style={{ backgroundColor: level.color }}>{typeLabel[question.type]}</span>
            {isMarked && <span className="flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-moss"><IconCheck className="h-3.5 w-3.5" /> saved</span>}
          </div>
          <h4 className="mt-4 font-display text-xl font-bold text-ink">{question.title}</h4>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{question.prompt}</p>
          <div className="mt-5">{renderInput(question)}</div>
        </div>

        {feedback && (
          <div className={`mt-5 rounded-md border p-4 ${feedback === "correct" ? "border-moss/40 bg-moss/10" : "border-ember/40 bg-ember/10"}`}>
            <p className={`font-display text-[15px] font-bold ${feedback === "correct" ? "text-moss" : "text-ember"}`}>
              {feedback === "correct" ? "Correct — great work." : "Not quite yet."}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink/80">
              <strong className="font-semibold text-ink">Answer:</strong> {question.type === "rearrange" ? question.answer : question.answer}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink/75">{question.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {!feedback ? (
            <button
              onClick={submit}
              disabled={
                question.type === "matching"
                  ? Object.keys(matches).length !== (question.pairs?.length ?? 0)
                  : question.type === "error"
                    ? !selectedErrorPart || !answer
                    : !answer
              }
              className="rounded-md bg-ink px-5 py-2.5 font-display text-[13.5px] font-bold text-chalk transition-all hover:bg-ember disabled:cursor-not-allowed disabled:opacity-40"
            >
              Check answer
            </button>
          ) : feedback === "incorrect" ? (
            <button onClick={resetQuestion} className="flex items-center gap-2 rounded-md border border-line bg-card px-5 py-2.5 font-display text-[13.5px] font-bold text-ink transition-all hover:border-ember"><IconRedo className="h-4 w-4" /> Retry</button>
          ) : null}
          {feedback === "correct" && <button onClick={nextQuestion} className="rounded-md bg-ink px-5 py-2.5 font-display text-[13.5px] font-bold text-chalk transition-all hover:bg-ember">Next exercise →</button>}
        </div>
      </div>
    </div>
  );
}
