import {
  CATEGORY_META,
  CONSONANT_CELLS,
  MANNERS,
  PHONEME_MAP,
  PLACES,
  type Phoneme,
} from "../data/phonemes";

interface Props {
  selectedId: string;
  practiced: Set<string>;
  onSelect: (id: string) => void;
}

function Chip({ p, selected, done, onSelect }: { p: Phoneme; selected: boolean; done: boolean; onSelect: (id: string) => void }) {
  const meta = CATEGORY_META[p.category];
  const filled = p.voiced;
  const sel = selected;
  return (
    <button
      onClick={() => onSelect(p.id)}
      aria-pressed={sel}
      title={`${meta.name} · ${p.label}`}
      className={`relative min-w-[2.4rem] rounded-md border px-2 py-1 font-ipa text-[17px] font-semibold leading-tight transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md ${
        sel
          ? "border-transparent text-chalk shadow-lg"
          : filled
            ? "text-chalk hover:opacity-90"
            : "bg-chalk hover:shadow-sm"
      }`}
      style={{
        backgroundColor: sel ? "var(--color-ink)" : filled ? meta.hex : "var(--color-chalk)",
        borderColor: sel ? "var(--color-ink)" : meta.hex,
        color: sel ? "var(--color-chalk)" : filled ? "var(--color-chalk)" : meta.hex,
      }}
    >
      {p.ipa}
      {done && (
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-card bg-ember" />
      )}
    </button>
  );
}

export default function ConsonantTable({ selectedId, practiced, onSelect }: Props) {
  return (
    <div className="rounded-md border border-line bg-card p-4 shadow-[0_1px_0_rgba(20,48,42,0.06)] sm:p-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-ink">
          The consonant grid
        </h3>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-fog">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm border border-cobalt bg-chalk" /> voiceless
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm bg-cobalt" /> voiced
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="min-w-[640px]">
          {/* header row */}
          <div className="grid grid-cols-[88px_repeat(8,minmax(0,1fr))] gap-1">
            <div className="flex items-end pb-1 font-mono text-[9px] uppercase tracking-wider text-fog">
              manner ↓
            </div>
            {PLACES.map((pl) => (
              <div key={pl} className="pb-1 text-center font-mono text-[9px] uppercase leading-tight tracking-wider text-fog">
                {pl}
              </div>
            ))}
          </div>

          {MANNERS.map((manner, mi) => {
            const rowCat = ["plosive", "nasal", "fricative", "affricate", "approximant"][mi] as keyof typeof CATEGORY_META;
            const meta = CATEGORY_META[rowCat];
            return (
              <div key={manner} className="mt-1 grid grid-cols-[88px_repeat(8,minmax(0,1fr))] items-stretch gap-1">
                <div
                  className="flex items-center rounded-l-md border-l-4 bg-chalk/70 px-2 py-1.5 font-display text-[12.5px] font-bold uppercase tracking-wide"
                  style={{ borderLeftColor: meta.hex, color: meta.hex }}
                >
                  {manner}
                </div>
                {PLACES.map((_, pi) => {
                  const c = CONSONANT_CELLS.find((x) => x.manner === mi && x.place === pi);
                  return (
                    <div
                      key={pi}
                      className={`flex items-center justify-center gap-1 rounded-md px-1 py-1.5 ${
                        c ? "border border-line/80 bg-paper/60" : "bg-transparent"
                      }`}
                    >
                      {c?.ids.map((id) => {
                        const p = PHONEME_MAP.get(id);
                        if (!p) return null;
                        return (
                          <Chip
                            key={id}
                            p={p}
                            selected={selectedId === id}
                            done={practiced.has(id)}
                            onSelect={onSelect}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-fog">
        24 consonants plotted by where the airflow is shaped (→ place) and how (↓ manner). Tap any
        symbol to load it into the practice bench.
      </p>
    </div>
  );
}
