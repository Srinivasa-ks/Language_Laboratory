interface IconProps {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconPlay = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M8 5.6v12.8c0 .62.68 1 1.22.66l9.4-6.4a.78.78 0 0 0 0-1.32l-9.4-6.4A.78.78 0 0 0 8 5.6Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconStop = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" fill="currentColor" stroke="none" />
  </svg>
);

export const IconMic = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="9" y="3" width="6" height="11" rx="3" {...base} />
    <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M8.8 21h6.4" {...base} />
  </svg>
);

export const IconSpeaker = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M4 9.5v5h3.2L12 18.6V5.4L7.2 9.5H4Z" {...base} />
    <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.6a8 8 0 0 1 0 10.8" {...base} />
  </svg>
);

export const IconSlow = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M4 15a8 8 0 0 1 16 0" {...base} />
    <path d="M12 15 8.4 9.6" {...base} />
    <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
    <path d="M3 18.5h18" {...base} />
  </svg>
);

export const IconCheck = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" {...base} strokeWidth={2.4} />
  </svg>
);

export const IconDownload = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 4v10m0 0 4-4m-4 4-4-4" {...base} />
    <path d="M5 16.5v2A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5v-2" {...base} />
  </svg>
);

export const IconRedo = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M19 8.5A7.5 7.5 0 1 0 19.5 13" {...base} />
    <path d="M19 4v4.5h-4.5" {...base} />
  </svg>
);

export const IconShuffle = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M3.5 7h3.2c5.6 0 7 10 12.6 10h1.2M3.5 17h3.2c1.9 0 3.3-1.1 4.5-2.5M15 7h5.5M18 4.5 20.5 7 18 9.5M18 14.5 20.5 17 18 19.5" {...base} />
  </svg>
);

export const IconLogout = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M13.5 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6.5" {...base} />
    <path d="M16 8.5 19.5 12 16 15.5M19 12H9.5" {...base} />
  </svg>
);

export const IconCompare = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M3 9c1.8 0 1.8-4 3.6-4s1.8 7 3.6 7 1.8-4 3.6-4 1.8 2 3.6 2 1.6-1 2.6-1" {...base} />
    <path d="M3 17.5h18" {...base} strokeDasharray="1.5 3" />
  </svg>
);

export const IconWave = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M3 12v.01M6.5 8.5v7M10 5v14M13.5 8v8M17 6.5v11M20.5 10v4" {...base} strokeWidth={2.1} />
  </svg>
);

export const IconArrow = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" {...base} />
  </svg>
);

export const IconEar = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M7 9a5.5 5.5 0 1 1 9.6 3.7c-1.5 1.6-2.6 2.6-2.9 4.6-.3 1.9-1.4 3.2-3.2 3.2-1.6 0-2.7-1-3-2.4" {...base} />
    <path d="M10.5 9.2a2.6 2.6 0 0 1 4.4 1.8c0 1.2-.8 1.8-1.6 2.7" {...base} />
  </svg>
);

export const IconGlobe = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" {...base} />
    <path d="M3.5 12h17M12 3.5c2.6 2.4 3.9 5.2 3.9 8.5s-1.3 6.1-3.9 8.5c-2.6-2.4-3.9-5.2-3.9-8.5s1.3-6.1 3.9-8.5Z" {...base} />
  </svg>
);
