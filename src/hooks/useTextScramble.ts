"use client";

import { useState, useCallback, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

export function useTextScramble(text: string, speed = 30) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);
  const running = useRef(false);

  const scramble = useCallback(() => {
    if (running.current) return;
    running.current = true;

    const original = text;
    const length = original.length;
    const resolved = new Array(length).fill(false);
    let iteration = 0;

    const step = () => {
      const next = original.split("").map((char, i) => {
        if (char === " ") return " ";
        if (resolved[i]) return original[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });

      // Resolve characters progressively
      const resolveCount = Math.floor(iteration / 3);
      for (let i = 0; i < resolveCount && i < length; i++) {
        resolved[i] = true;
      }

      setDisplay(next.join(""));
      iteration++;

      if (resolveCount >= length) {
        setDisplay(original);
        running.current = false;
        return;
      }

      rafRef.current = window.setTimeout(step, speed);
    };

    step();
  }, [text, speed]);

  const reset = useCallback(() => {
    clearTimeout(rafRef.current);
    running.current = false;
    setDisplay(text);
  }, [text]);

  return { display, scramble, reset };
}
