"use client";

import { useEffect, useRef, useState } from "react";
import { methodSteps } from "../lib/site-content";

export default function MethodSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));
      const index = Math.min(methodSteps.length - 1, Math.floor(progress * methodSteps.length));
      setActiveIndex(index);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: `${methodSteps.length * 70}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-10">
        <div className="flex items-center gap-2">
          {methodSteps.map((step, i) => (
            <div key={step.num} className="flex flex-1 items-center gap-2">
              <span
                className={`shrink-0 font-mono text-xs transition-colors duration-500 ${
                  i === activeIndex ? "text-ember" : "text-muted"
                }`}
              >
                {step.num}
              </span>
              <span
                className={`h-px flex-1 transition-colors duration-500 ${
                  i <= activeIndex ? "bg-ember" : "bg-line"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="relative min-h-[220px] sm:min-h-[160px]">
          {methodSteps.map((step, i) => (
            <div
              key={step.num}
              className={`absolute inset-0 transition-all duration-500 ${
                i === activeIndex
                  ? "translate-y-0 opacity-100"
                  : i < activeIndex
                    ? "-translate-y-6 opacity-0 pointer-events-none"
                    : "translate-y-6 opacity-0 pointer-events-none"
              }`}
            >
              <h3 className="mb-3 font-display text-[clamp(26px,4vw,40px)] font-semibold">
                {step.title}
              </h3>
              <p className="max-w-[560px] text-base text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
