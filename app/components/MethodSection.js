"use client";

import { useEffect, useRef, useState } from "react";
import { methodSteps } from "../lib/site-content";

export default function MethodSection() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="mb-12 flex items-center gap-2">
        {methodSteps.map((step, i) => (
          <div key={step.num} className="flex flex-1 items-center gap-2">
            <span
              className={`shrink-0 font-mono text-xs transition-colors duration-500 ${
                shown ? "text-ember" : "text-muted"
              }`}
              style={{ transitionDelay: shown ? `${i * 150}ms` : "0ms" }}
            >
              {step.num}
            </span>
            <span className="relative h-px flex-1 overflow-hidden bg-line">
              <span
                className={`absolute inset-y-0 left-0 w-full origin-left bg-ember transition-transform duration-700 ease-out ${
                  shown ? "scale-x-100" : "scale-x-0"
                }`}
                style={{ transitionDelay: shown ? `${i * 150}ms` : "0ms" }}
              />
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
        {methodSteps.map((step, i) => (
          <div
            key={step.num}
            className={`transition-all duration-700 ease-out ${
              shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: shown ? `${i * 150}ms` : "0ms" }}
          >
            <h3 className="mb-2.5 font-display text-lg font-semibold">{step.title}</h3>
            <p className="text-[14.5px] text-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
