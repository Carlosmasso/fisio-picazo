"use client";

import { useEffect, useRef } from "react";

export default function ScrollPulseProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
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
    <div className="fixed inset-x-0 top-0 z-[110] h-[3px] bg-line/40">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-ember"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
