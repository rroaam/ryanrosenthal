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

const NAME_FIRST = "RYAN";
const NAME_LAST = "ROSENTHAL";

function AnimatedName() {
  const firstLetters = NAME_FIRST.split("");
  const lastLetters = NAME_LAST.split("");
  const totalFirst = firstLetters.length;

  return (
    <motion.div
      className="flex flex-col items-center select-none"
      initial="hidden"
      animate="visible"
    >
      {/* RYAN */}
      <div className="overflow-hidden">
        <div className="flex justify-center">
          {firstLetters.map((letter, i) => (
            <motion.span
              key={`first-${i}`}
              custom={i}
              variants={letterVariants}
              className="font-display inline-block"
              style={{
                fontSize: "clamp(4.5rem, 18vw, 16rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
      {/* ROSENTHAL */}
      <div className="overflow-hidden -mt-1 sm:-mt-2 md:-mt-3">
        <div className="flex justify-center">
          {lastLetters.map((letter, i) => (
            <motion.span
              key={`last-${i}`}
              custom={i + totalFirst}
              variants={letterVariants}
              className="font-display inline-block"
              style={{
                fontSize: "clamp(4.5rem, 18vw, 16rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Subtitle ───────────────────────────────────────────────────────

function Subtitle() {
  // Delay: 13 letters × 60ms + 200ms buffer
  const nameAnimDuration = 13 * 0.06 + 0.6;

  return (
    <motion.p
      className="mt-4 text-center tracking-[0.25em] uppercase sm:mt-6"
      style={{
        fontSize: "clamp(0.625rem, 1.4vw, 0.875rem)",
        fontWeight: 300,
        color: "#666",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
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
  const nameAnimDuration = 13 * 0.06 + 0.6;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-7"
      style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
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
        style={{ letterSpacing: "0.08em" }}
      >
        Ryan Rosenthal
        <sup className="text-[0.55em] relative -top-[0.4em] ml-[0.5px]">
          &reg;
        </sup>
      </div>

      {/* Center: descriptor */}
      <div className="hidden md:block text-[11px] tracking-[0.12em] uppercase text-[#999] font-light text-center">
        AI{" "}
        <span className="mx-1 text-[#ccc]">//</span> Design{" "}
        <span className="mx-1 text-[#ccc]">//</span> Brand{" "}
        <span className="mx-1 text-[#ccc]">//</span> Product
        <span className="mx-4 text-[#ddd]">|</span>
        <span className="text-[#bbb]">Los Angeles, CA</span>
      </div>

      {/* Right: Say Hello */}
      <a
        href="mailto:ryan@ryanrosenthal.com"
        className="group relative text-[11px] sm:text-xs tracking-[0.08em] uppercase font-medium"
      >
        Say Hello
        <span className="absolute left-0 -bottom-[2px] h-[1px] w-full bg-black origin-left scale-x-100 transition-transform duration-300 ease-out group-hover:scale-x-0" />
        <span className="absolute left-0 -bottom-[2px] h-[1px] w-full bg-[#E5000A] origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </a>
    </motion.nav>
  );
}

// ─── Bottom Pill ────────────────────────────────────────────────────

function BottomPill() {
  const totalDelay = 13 * 0.06 + 0.6 + 0.4;

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
        className="flex items-center gap-0 rounded-full border border-[#E0E0E0] bg-[#F0F0F0] pl-5 pr-1 py-1"
        style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}
      >
        {/* RR® */}
        <span
          className="font-display text-lg sm:text-xl tracking-tight mr-4 select-none"
          style={{ letterSpacing: "-0.01em" }}
        >
          RR
          <sup className="text-[0.45em] relative -top-[0.6em] ml-[0.5px] font-normal">
            &reg;
          </sup>
        </span>

        {/* Button */}
        <a
          href="mailto:ryan@ryanrosenthal.com"
          className="inline-flex items-center rounded-full bg-[#E5000A] px-5 py-2.5 sm:px-6 sm:py-3 transition-all duration-200 ease-out hover:bg-[#FF1A1A] hover:scale-[1.02] active:scale-[0.98]"
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          <span className="text-white text-[10px] sm:text-[11px] font-medium tracking-[0.18em] uppercase whitespace-nowrap">
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
      <div className="relative h-screen h-[100dvh] w-full bg-white overflow-hidden">
        <Navigation />

        {/* Center: Name + Subtitle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <AnimatedName />
          <Subtitle />
        </div>

        <BottomPill />
      </div>
    </>
  );
}
