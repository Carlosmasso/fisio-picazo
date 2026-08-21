"use client";

import { useEffect, useRef, useState } from "react";

function parseValue(raw) {
  const match = raw.match(/^([\d.,]+)(.*)$/);
  if (!match) return { number: 0, decimals: 0, suffix: raw };
  const numStr = match[1].replace(",", ".");
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { number: parseFloat(numStr), decimals, suffix: match[2] };
}

export default function CountUp({ value, duration = 1200 }) {
  const { number, decimals, suffix } = parseValue(value);
  const [display, setDisplay] = useState(`0${suffix}`);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        if (prefersReducedMotion) {
          setDisplay(number.toFixed(decimals) + suffix);
          observer.disconnect();
          return;
        }

        const start = performance.now();

        function tick(now) {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay((number * eased).toFixed(decimals) + suffix);
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={ref}>{display}</span>;
}
