import { testimonials } from "../lib/site-content";

export default function TestimonialsSection() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {testimonials.map((t) => (
        <div key={t.who} className="rounded-[14px] border border-line bg-surface p-6.5">
          <p className="mb-4.5 text-[14.5px]">&ldquo;{t.quote}&rdquo;</p>
          <div className="font-mono text-[12.5px] text-muted">— {t.who}</div>
        </div>
      ))}
    </div>
  );
}
