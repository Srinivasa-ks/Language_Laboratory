import { CATEGORY_META, type Phoneme } from "../data/phonemes";

interface Props {
  vowels: Phoneme[];
  diphthongs: Phoneme[];
  selectedId: string;
  practiced: Set<string>;
  onSelect: (id: string) => void;
}

const HEIGHTS = [
  { y: 22, label: "CLOSE" },
  { y: 88, label: "CLOSE-MID" },
  { y: 154, label: "OPEN-MID" },
  { y: 220, label: "OPEN" },
];

export default function VowelChart({ vowels, diphthongs, selectedId, practiced, onSelect }: Props) {
  const mono = CATEGORY_META.monophthong;

  return (
    <div className="flex flex-col gap-5">
      {/* trapezoid */}
      <div className="rounded-md border border-line bg-card p-4 shadow-[0_1px_0_rgba(20,48,42,0.06)]">
        <div className="mb-1 flex items-baseline justify-between">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-ink">
            The vowel trapezoid
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-fog">12 pure vowels</span>
        </div>
        <svg viewBox="0 0 330 250" className="w-full" role="group" aria-label="Vowel chart">
          {/* frame */}
          <line x1="58" y1="22" x2="300" y2="22" stroke="var(--color-line)" strokeWidth="1.4" />
          <line x1="58" y1="22" x2="58" y2="220" stroke="var(--color-line)" strokeWidth="1.4" />
          <line x1="300" y1="22" x2="300" y2="146" stroke="var(--color-line)" strokeWidth="1.4" />
          <line x1="58" y1="220" x2="300" y2="146" stroke="var(--color-line)" strokeWidth="1.4" />
          <line x1="185" y1="22" x2="185" y2="183" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="58" y1="88" x2="300" y2="88" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="58" y1="154" x2="300" y2="154" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="3 4" />

          {/* axis labels */}
          <text x="58" y="12" textAnchor="middle" className="fill-fog font-mono" fontSize="9" letterSpacing="1.5">FRONT</text>
          <text x="185" y="12" textAnchor="middle" className="fill-fog font-mono" fontSize="9" letterSpacing="1.5">CENTRAL</text>
          <text x="300" y="12" textAnchor="middle" className="fill-fog font-mono" fontSize="9" letterSpacing="1.5">BACK</text>
          {HEIGHTS.map((h) => (
            <text key={h.label} x="50" y={h.y + 3} textAnchor="end" className="fill-fog font-mono" fontSize="7.5" letterSpacing="1">
              {h.label}
            </text>
          ))}

          {/* phoneme chips */}
          {vowels.map((v) => {
            if (!v.chartPos) return null;
            const sel = v.id === selectedId;
            const done = practiced.has(v.id);
            return (
              <g
                key={v.id}
                transform={`translate(${v.chartPos.x}, ${v.chartPos.y})`}
                onClick={() => onSelect(v.id)}
                className="cursor-pointer"
                role="button"
                aria-label={` practise ${v.ipa} `}
              >
                <circle
                  r={sel ? 16 : 13.5}
                  fill={sel ? mono.hex : "var(--color-card)"}
                  stroke={mono.hex}
                  strokeWidth={sel ? 0 : 1.6}
                  className="transition-all duration-200 hover:opacity-80"
                />
                <text
                  textAnchor="middle"
                  dy="4.5"
                  fontSize="13.5"
                  fontWeight={sel ? 700 : 600}
                  fill={sel ? "var(--color-chalk)" : mono.hex}
                  style={{ fontFamily: "var(--font-ipa)", pointerEvents: "none" }}
                >
                  {v.ipa}
                </text>
                {done && <circle cx="10" cy="-10" r="3" fill="var(--color-ember)" stroke="var(--color-card)" strokeWidth="1.2" />}
              </g>
            );
          })}
        </svg>
      </div>

      {/* diphthongs */}
      <div className="rounded-md border border-line bg-card p-4 shadow-[0_1px_0_rgba(20,48,42,0.06)]">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-ink">
            Gliding vowels
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-fog">8 diphthongs</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {diphthongs.map((dp) => {
            const sel = dp.id === selectedId;
            const done = practiced.has(dp.id);
            const meta = CATEGORY_META.diphthong;
            return (
              <button
                key={dp.id}
                onClick={() => onSelect(dp.id)}
                aria-pressed={sel}
                className={`group relative flex flex-col items-center rounded-md border px-1 pb-1.5 pt-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  sel ? "border-transparent text-chalk shadow-md" : "border-line bg-chalk text-honey hover:border-honey"
                }`}
                style={sel ? { backgroundColor: meta.hex } : undefined}
              >
                <span className="font-ipa text-lg font-semibold leading-none">{dp.ipa}</span>
                <svg viewBox="0 0 34 10" className="mt-1 h-2.5 w-8" aria-hidden="true">
                  <path
                    d={`M3 8 Q 17 ${dp.id.startsWith("ɪ") || dp.id.startsWith("e") || dp.id.startsWith("ʊ") ? 0 : 2} 31 4`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                  <path d="M27 1.5 31 4l-3 2.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
                </svg>
                {done && (
                  <span className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-ember" />
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-fog">
          Each arrow traces the glide: start vowel → end vowel, one syllable only.
        </p>
      </div>
    </div>
  );
}
