"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 1800; // ms

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      // Ease-in-out progress
      const t = Math.min(elapsed / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setCount(Math.floor(eased * 100));

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => setDone(true), 400);
      }
    };

    // Small initial delay so it doesn't flash
    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, 200);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Fire onComplete after exit animation
  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: "#211F1F" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Counter */}
          <motion.span
            style={{
              fontFamily: "var(--font-helvetica)",
              fontWeight: 700,
              fontSize: "clamp(3rem, 10vw, 6rem)",
              letterSpacing: "-0.04em",
              color: "#CECED0",
            }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
          >
            {String(count).padStart(3, "0")}
          </motion.span>

          {/* Bottom line that fills */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px]"
            style={{ background: "#E5000A" }}
            animate={{ width: `${count}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
