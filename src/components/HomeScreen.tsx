import { IconArrow, IconCheck, IconShuffle } from "./Icons";
import { CATEGORY_META, type LevelId } from "../data/phonemes";
import { computeStats, fmtDate, type ChecksMap } from "../lib/progress";

interface Props {
  userName: string;
  isGuest: boolean;
  joinedAt?: number;
  lastSeen?: number;
  checks: ChecksMap;
  onOpenSound: (id: string, level: LevelId) => void;
  onSurprise: () => void;
}

function BigRing({ value, label, sub }: { value: number; label: string; sub: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const pct = Math.round(value * 100);
  return (
    <div className="relative h-[124px] w-[124px] shrink-0">
      <svg viewBox="0 0 124 124" className="h-full w-full -rotate-90">
        <circle cx="62" cy="62" r={r} fill="none" stroke="var(--color-line)" strokeWidth="9" />
        <circle
          cx="62"
          cy="62"
          r={r}
          fill="none"
          stroke="var(--color-honey)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value)}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="font-display text-[26px] font-extrabold tabular-nums text-ink">{pct}%</span>
        <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-fog">{label}</span>
        <span className="mt-0.5 font-mono text-[9px] tabular-nums text-fog/80">{sub}</span>
      </div>
    </div>
  );
}

const LEVEL_META: { id: LevelId; name: string; hex: string }[] = [
  { id: "syll", name: "Syllables · minimal pairs", hex: CATEGORY_META.monophthong.hex },
  { id: "word", name: "Words", hex: CATEGORY_META.diphthong.hex },
  { id: "sent", name: "Sentences", hex: CATEGORY_META.plosive.hex },
];

export default function HomeScreen({
  userName,
  isGuest,
  joinedAt,
  lastSeen,
  checks,
  onOpenSound,
  onSurprise,
}: Props) {
  const stats = computeStats(checks);
  const fresh = stats.totalDone === 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-ember">
            Station 00 · Home screen
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-extrabold tracking-tight text-ink">
            {fresh ? (
              <>
                Welcome to the lab, <span className="text-lagoon">{userName}</span>.
              </>
            ) : (
              <>
                Welcome back, <span className="text-lagoon">{userName}</span>.
              </>
            )}
          </h2>
        </div>
        {isGuest && (
          <p className="max-w-[300px] rounded-md border border-dashed border-line bg-card px-3 py-2 font-mono text-[10.5px] leading-snug text-fog">
            Guest progress is saved on this device. Create an account to keep it under your name.
          </p>
        )}
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-12">
        {/* ── session card ── */}
        <div className="flex items-center gap-5 rounded-lg border border-line bg-card p-5 shadow-[0_2px_0_rgba(20,48,42,0.07)] lg:col-span-4">
          <BigRing
            value={stats.totalAll > 0 ? stats.totalDone / stats.totalAll : 0}
            label="of all drills"
            sub={`${stats.totalDone}/${stats.totalAll}`}
          />
          <div className="min-w-0 flex-1">
            <p className="font-display text-[26px] font-extrabold leading-none tabular-nums text-ink">
              {stats.soundsCovered}
              <span className="text-[16px] font-bold text-fog">/{stats.soundsTotal}</span>
            </p>
            <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-fog">
              sounds started
            </p>
            <dl className="mt-4 flex flex-col gap-1.5 border-t border-line pt-3 font-mono text-[10.5px] text-fog">
              {joinedAt && (
                <div className="flex justify-between gap-2">
                  <dt className="uppercase tracking-wider text-fog/70">member since</dt>
                  <dd className="tabular-nums text-ink/80">{fmtDate(joinedAt)}</dd>
                </div>
              )}
              {lastSeen && (
                <div className="flex justify-between gap-2">
                  <dt className="uppercase tracking-wider text-fog/70">last session</dt>
                  <dd className="tabular-nums text-ink/80">{fmtDate(lastSeen)}</dd>
                </div>
              )}
              <div className="flex justify-between gap-2">
                <dt className="uppercase tracking-wider text-fog/70">mastered</dt>
                <dd className="tabular-nums text-ink/80">{stats.mastered.length} sounds</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* ── level meters ── */}
        <div className="rounded-lg border border-line bg-card p-5 shadow-[0_2px_0_rgba(20,48,42,0.07)] lg:col-span-5">
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink">
            Drills by level
          </p>
          <div className="flex flex-col gap-4">
            {LEVEL_META.map((l) => {
              const { done, total } = stats.byLevel[l.id];
              const pct = total > 0 ? done / total : 0;
              return (
                <div key={l.id}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-semibold text-ink">{l.name}</span>
                    <span className="font-mono text-[10.5px] tabular-nums text-fog">
                      {done}/{total} · {Math.round(pct * 100)}%
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-paper">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.max(pct * 100, done > 0 ? 2 : 0)}%`, backgroundColor: l.hex }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── coverage by family ── */}
        <div className="rounded-lg border border-line bg-card p-5 shadow-[0_2px_0_rgba(20,48,42,0.07)] lg:col-span-3">
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink">
            Sounds covered
          </p>
          <div className="flex flex-col gap-3">
            {stats.categories.map((c) => (
              <div key={c.title} className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: c.hex }} />
                <span className="w-24 shrink-0 text-[12px] font-semibold text-ink">{c.title}</span>
                <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-paper">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(c.done / c.total) * 100}%`, backgroundColor: c.hex }}
                  />
                </div>
                <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-fog">
                  {c.done}/{c.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── resume banner ── */}
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-lg border border-line bg-chalk p-5 shadow-[0_2px_0_rgba(20,48,42,0.07)]">
        {stats.next ? (
          <>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ember">
              Next up
            </span>
            <button
              onClick={() => onOpenSound(stats.next!.phoneme.id, stats.next!.level)}
              className="group flex items-center gap-3 text-left"
              title="Open this sound in the practice bench"
            >
              <span className="grid h-12 w-12 place-items-center rounded-md border-2 border-ink/15 bg-paper font-ipa text-[22px] font-bold text-ink transition-all group-hover:-translate-y-0.5 group-hover:border-ember group-hover:text-ember group-hover:shadow-md">
                {stats.next.phoneme.ipa}
              </span>
              <span>
                <span className="block font-display text-[17px] font-bold leading-tight text-ink group-hover:text-ember">
                  {stats.next.phoneme.keyword}
                </span>
                <span className="block font-mono text-[10.5px] tabular-nums text-fog">
                  {stats.next.done}/{stats.next.total} drills · continue at{" "}
                  {stats.next.level === "syll" ? "syllable" : stats.next.level === "word" ? "word" : "sentence"} level
                </span>
              </span>
            </button>
            <button
              onClick={() => onOpenSound(stats.next!.phoneme.id, stats.next!.level)}
              className="ml-auto flex items-center gap-2 rounded-md bg-ink px-5 py-2.5 font-display text-[13.5px] font-bold text-chalk transition-all hover:bg-ember active:scale-95"
            >
              Resume practice <IconArrow className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <span className="grid h-12 w-12 place-items-center rounded-md bg-moss text-chalk">
              <IconCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-[17px] font-bold text-ink">
                All {stats.soundsTotal} sounds practised — remarkable work, {userName}.
              </p>
              <p className="font-mono text-[10.5px] text-fog">
                Keep the ear sharp with a random drill, or re-run your weakest level.
              </p>
            </div>
            <button
              onClick={onSurprise}
              className="ml-auto flex items-center gap-2 rounded-md bg-ink px-5 py-2.5 font-display text-[13.5px] font-bold text-chalk transition-all hover:bg-ember active:scale-95"
            >
              <IconShuffle className="h-4 w-4" /> Surprise drill
            </button>
          </>
        )}
      </div>

      {/* ── mastered strip ── */}
      {stats.mastered.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-moss">
            Mastered · {stats.mastered.length}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {stats.mastered.map((p) => (
              <button
                key={p.id}
                onClick={() => onOpenSound(p.id, "sent")}
                title={`${p.keyword} — mastered`}
                className="rounded-md border border-moss/50 bg-moss/10 px-2 py-1 font-ipa text-[14px] font-semibold text-moss transition-all hover:-translate-y-0.5 hover:bg-moss hover:text-chalk hover:shadow-md"
              >
                {p.ipa}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
