"use client";

import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";

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

const navVariants = {
  hidden: { y: -20, opacity: 0 },
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
      className="flex items-center justify-center select-none overflow-hidden px-4 sm:px-8"
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-center whitespace-nowrap">
        {letters.map((letter, i) => (
          <motion.span
            key={`letter-${i}`}
            custom={i}
            variants={letterVariants}
            className="inline-block"
            style={{
              fontFamily: "var(--font-helvetica)",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 10.5vw, 10rem)",
              lineHeight: 1,
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

// ─── Navigation ─────────────────────────────────────────────────────

function Navigation() {
  const nameAnimDuration = NAME.length * 0.06 + 0.6;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-7"
      style={{ fontFamily: "var(--font-helvetica)" }}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: nameAnimDuration,
        duration: 0.8,
        ease: EASE_OUT_CUBIC,
      }}
    >
      {/* Left: name */}
      <div
        className="text-[11px] sm:text-xs tracking-[0.08em] uppercase font-medium whitespace-nowrap"
        style={{ color: "var(--black)" }}
      >
        Ryan Rosenthal
        <sup className="text-[0.55em] relative -top-[0.4em] ml-[0.5px]">
          &reg;
        </sup>
      </div>

      {/* Center: descriptor */}
      <div
        className="hidden md:block text-[11px] tracking-[0.12em] uppercase font-light text-center"
        style={{ color: "rgba(33, 31, 31, 0.35)" }}
      >
        AI{" "}
        <span className="mx-1" style={{ color: "rgba(33, 31, 31, 0.18)" }}>
          //
        </span>{" "}
        Design{" "}
        <span className="mx-1" style={{ color: "rgba(33, 31, 31, 0.18)" }}>
          //
        </span>{" "}
        Brand{" "}
        <span className="mx-1" style={{ color: "rgba(33, 31, 31, 0.18)" }}>
          //
        </span>{" "}
        Product
        <span className="mx-4" style={{ color: "rgba(33, 31, 31, 0.15)" }}>
          |
        </span>
        <span style={{ color: "rgba(33, 31, 31, 0.3)" }}>
          Los Angeles, CA
        </span>
      </div>

      {/* Right: Say Hello */}
      <a
        href="mailto:ryan@ryanrosenthal.com"
        className="group relative text-[11px] sm:text-xs tracking-[0.08em] uppercase font-medium"
        style={{ color: "var(--black)" }}
      >
        Say Hello
        <span
          className="absolute left-0 -bottom-[2px] h-[1px] w-full origin-left scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0"
          style={{ background: "var(--black)" }}
        />
        <span
          className="absolute left-0 -bottom-[2px] h-[1px] w-full origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
          style={{ background: "var(--accent)" }}
        />
      </a>
    </motion.nav>
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
        {/* RR® */}
        <span
          className="text-lg sm:text-xl tracking-tight mr-4 select-none"
          style={{
            fontFamily: "var(--font-helvetica)",
            fontWeight: 900,
            letterSpacing: "-0.07em",
            color: "var(--black)",
          }}
        >
          RR
          <sup className="text-[0.45em] relative -top-[0.6em] ml-[0.5px] font-normal">
            &reg;
          </sup>
        </span>

        {/* Button */}
        <a
          href="mailto:ryan@ryanrosenthal.com"
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
  return (
    <>
      <CustomCursor />
      <div
        className="relative h-screen h-[100dvh] w-full overflow-hidden"
        style={{ background: "var(--white)" }}
      >
        <Navigation />

        {/* Center: Name + Subtitle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatedName />
          <Subtitle />
        </div>

        <BottomPill />
      </div>
    </>
  );
}
