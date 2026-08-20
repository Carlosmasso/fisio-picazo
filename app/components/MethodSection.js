import { methodSteps } from "../lib/site-content";

export default function MethodSection() {
  return (
    <div className="flex flex-col">
      {methodSteps.map((step, i) => (
        <div
          key={step.num}
          className={`grid grid-cols-[90px_1fr] gap-7 py-8 ${i === 0 ? "" : "border-t border-line"}`}
        >
          <div className="pt-1 font-mono text-sm text-ember">{step.num}</div>
          <div>
            <h3 className="mb-2 text-[22px] font-semibold">{step.title}</h3>
            <p className="max-w-[560px] text-[15px] text-muted">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
