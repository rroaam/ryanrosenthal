"use client";

import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";
import Navigation from "./Navigation";

// ─── Animation Variants ─────────────────────────────────────────────

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const letterVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.6,
      ease: EASE_OUT_CUBIC,
    },
  }),
};

const fadeUpVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASE_OUT_CUBIC,
    },
  },
};

const pillVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 200,
      mass: 0.8,
    },
  },
};

// ─── Name Component ─────────────────────────────────────────────────

const NAME = "RYAN ROSENTHAL";

function AnimatedName() {
  const letters = NAME.split("");

  return (
    <motion.div
      className="flex items-center justify-center select-none px-4 sm:px-8"
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-center whitespace-nowrap py-[0.05em]">
        {letters.map((letter, i) => (
          <motion.span
            key={`letter-${i}`}
            custom={i}
            variants={letterVariants}
            className="inline-block"
            style={{
              fontFamily: "var(--font-helvetica)",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 10.5vw, 10rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.07em",
              color: "var(--black)",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Subtitle ───────────────────────────────────────────────────────

function Subtitle() {
  const nameAnimDuration = NAME.length * 0.06 + 0.6;

  return (
    <motion.p
      className="mt-3 text-center tracking-[0.25em] uppercase sm:mt-5"
      style={{
        fontSize: "clamp(0.5625rem, 1.2vw, 0.8125rem)",
        fontWeight: 300,
        color: "rgba(33, 31, 31, 0.45)",
        fontFamily: "var(--font-helvetica)",
      }}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: nameAnimDuration,
        duration: 0.8,
        ease: EASE_OUT_CUBIC,
      }}
    >
      A.I. x Creative Director
      <sup className="text-[0.5em] relative -top-[0.5em] ml-[1px]">&reg;</sup>
    </motion.p>
  );
}

// ─── Bottom Pill ────────────────────────────────────────────────────

function BottomPill() {
  const totalDelay = NAME.length * 0.06 + 0.6 + 0.4;

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 z-50 sm:bottom-10"
      style={{ x: "-50%" }}
      variants={pillVariants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: totalDelay,
        type: "spring",
        damping: 20,
        stiffness: 200,
        mass: 0.8,
      }}
    >
      <div
        className="flex items-center gap-0 rounded-full pl-5 pr-1 py-1"
        style={{
          background: "rgba(33, 31, 31, 0.05)",
          border: "1px solid rgba(33, 31, 31, 0.1)",
          boxShadow: "0 2px 20px rgba(33, 31, 31, 0.04)",
        }}
      >
        <span
          className="text-lg sm:text-xl tracking-tight mr-4 select-none"
          style={{
            fontFamily: "var(--font-helvetica)",
            fontWeight: 700,
            letterSpacing: "-0.07em",
            color: "var(--black)",
          }}
        >
          RR
          <sup className="text-[0.45em] relative -top-[0.6em] ml-[0.5px] font-normal">
            &reg;
          </sup>
        </span>

        <a
          href="/book"
          className="inline-flex items-center rounded-full px-5 py-2.5 sm:px-6 sm:py-3 transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "var(--accent)",
            fontFamily: "var(--font-helvetica)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#FF1A1A")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--accent)")
          }
        >
          <span
            className="text-[10px] sm:text-[11px] font-medium tracking-[0.18em] uppercase whitespace-nowrap"
            style={{ color: "var(--white)" }}
          >
            Start a Project
          </span>
        </a>
      </div>
    </motion.div>
  );
}

// ─── Hero Page ──────────────────────────────────────────────────────

export default function HeroPage() {
  const navDelay = NAME.length * 0.06 + 0.6;

  return (
    <>
      <CustomCursor />
      <div
        className="relative h-screen h-[100dvh] w-full overflow-hidden"
        style={{ background: "var(--white)" }}
      >
        <Navigation delay={navDelay} />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatedName />
          <Subtitle />
        </div>

        <BottomPill />
      </div>
    </>
  );
}
