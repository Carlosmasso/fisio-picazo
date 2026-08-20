export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-14 max-w-[640px]">
      <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[0.12em] text-frost uppercase before:h-px before:w-5.5 before:bg-frost">
        {eyebrow}
      </div>
      <h2 className="mb-4 text-[clamp(30px,4vw,44px)] font-semibold">{title}</h2>
      {description && <p className="text-base text-muted">{description}</p>}
    </div>
  );
}
