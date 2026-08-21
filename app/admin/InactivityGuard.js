"use client";

import { useEffect, useRef, useState } from "react";
import { signOut } from "../actions/auth";

// TESTING VALUES — WARNING_MS must always be smaller than IDLE_TIMEOUT_MS,
// otherwise the warning fires almost immediately (negative setTimeout delay)
// and reappears in a loop right after being dismissed. Restore to
// 45 * 60 * 1000 / 60 * 1000 once done testing.
const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30s total inactivity budget
const WARNING_MS = 10 * 1000; // show the warning for the last 10s

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];

export default function InactivityGuard() {
  const [secondsLeft, setSecondsLeft] = useState(null); // null = no warning shown
  const idleTimerRef = useRef(null);
  const countdownRef = useRef(null);

  function clearTimers() {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
  }

  function startWarningCountdown() {
    let remaining = WARNING_MS / 1000;
    setSecondsLeft(remaining);
    countdownRef.current = setInterval(() => {
      remaining -= 1;
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        clearInterval(countdownRef.current);
        signOut();
      }
    }, 1000);
  }

  // Only (re)arms the timeout — no state update, safe to call from the
  // mount effect directly.
  function startIdleTimer() {
    clearTimers();
    idleTimerRef.current = setTimeout(startWarningCountdown, IDLE_TIMEOUT_MS - WARNING_MS);
  }

  // Dismisses an active warning and rearms the timer — only ever called
  // from event listeners/handlers, never from the effect body itself.
  function resetIdleTimer() {
    setSecondsLeft(null);
    startIdleTimer();
  }

  useEffect(() => {
    startIdleTimer();
    ACTIVITY_EVENTS.forEach((evt) => window.addEventListener(evt, resetIdleTimer));
    return () => {
      clearTimers();
      ACTIVITY_EVENTS.forEach((evt) => window.removeEventListener(evt, resetIdleTimer));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (secondsLeft === null) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-7 text-center">
        <h3 className="mb-2 font-display text-lg font-semibold">¿Sigues ahí?</h3>
        <p className="mb-6 text-[13.5px] text-muted">
          Por seguridad, tu sesión se cerrará por inactividad en {secondsLeft}s.
        </p>
        <button
          type="button"
          onClick={resetIdleTimer}
          className="w-full rounded-lg border border-ember bg-ember px-4 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ember-hover"
        >
          Seguir conectado
        </button>
      </div>
    </div>
  );
}
