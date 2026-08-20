import { heroStats } from "../lib/site-content";

export default function PulseWaveform() {
  return (
    <div className="relative h-[120px] w-full border-t border-line pt-[18px]">
      <svg viewBox="0 0 1180 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <path
          className="pulse-path"
          d="M0,50 L120,50 L145,50 L160,15 L180,85 L200,50 L230,50 L940,50 L960,20 L980,80 L1000,50 L1180,50"
        />
      </svg>
      <div className="absolute top-[-4px] right-0 flex gap-[22px] font-mono text-xs text-muted">
        {heroStats.map((stat) => (
          <span key={stat.label}>
            {stat.label} <b className="font-medium text-foreground">{stat.value}</b>
          </span>
        ))}
      </div>
    </div>
  );
}
