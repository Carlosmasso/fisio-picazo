import { testimonials } from "../lib/site-content";

export default function TestimonialsSection() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {testimonials.map((t) => (
        <div
          key={t.who}
          className="rounded-[14px] border border-line bg-surface p-6.5 transition-all duration-300 hover:-translate-y-1 hover:border-frost-dim hover:shadow-[0_20px_45px_-28px_var(--color-frost)]"
        >
          <p className="mb-4.5 text-[14.5px]">&ldquo;{t.quote}&rdquo;</p>
          <div className="font-mono text-[12.5px] text-muted">— {t.who}</div>
        </div>
      ))}
    </div>
  );
}
