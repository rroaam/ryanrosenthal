"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";

// ─── Colors ─────────────────────────────────────────────────────────

const BG = "#211F1F";
const FG = "#CECED0";
const MUTED = "rgba(206,206,208,0.25)";
const ACCENT = "#E5000A";
const LINE = "#4C4B4B";

// ─── Animation ──────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const letterVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.4 + i * 0.04, duration: 0.6, ease: EASE },
  }),
};

const fade = (delay: number) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { delay, duration: 0.7, ease: EASE },
});

// ─── R——R Header ────────────────────────────────────────────────────

function RRHeader() {
  return (
    <motion.div
      className="w-full flex items-center justify-between px-2 sm:px-4"
      style={{ fontFamily: "var(--font-helvetica)", fontWeight: 700 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <span
        className="select-none leading-none"
        style={{
          fontSize: "clamp(3rem, 8vw, 7rem)",
          color: FG,
          letterSpacing: "-0.04em",
        }}
      >
        R
      </span>
      <div className="flex-1 mx-3 sm:mx-6" style={{ height: 3, background: FG }} />
      <span
        className="select-none leading-none"
        style={{
          fontSize: "clamp(3rem, 8vw, 7rem)",
          color: FG,
          letterSpacing: "-0.04em",
        }}
      >
        R
      </span>
    </motion.div>
  );
}

// ─── Outline Name ───────────────────────────────────────────────────

function OutlineName() {
  const name = "RYAN ROSENTHAL";
  const letters = name.split("");

  return (
    <motion.div
      className="select-none text-center"
      initial="hidden"
      animate="visible"
    >
      {/* Desktop: single line */}
      <div className="hidden sm:flex justify-center whitespace-nowrap py-[0.05em]">
        {letters.map((letter, i) => (
          <motion.span
            key={`d-${i}`}
            custom={i}
            variants={letterVariants}
            className="inline-block"
            style={{
              fontFamily: "var(--font-helvetica)",
              fontWeight: 700,
              fontSize: "clamp(3rem, 7.5vw, 5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.07em",
              WebkitTextStroke: `1.5px ${FG}`,
              color: "transparent",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>

      {/* Mobile: two lines */}
      <div className="flex flex-col items-center sm:hidden">
        {["RYAN", "ROSENTHAL"].map((word, wi) => (
          <div key={word} className="flex justify-center whitespace-nowrap">
            {word.split("").map((letter, i) => (
              <motion.span
                key={`m-${wi}-${i}`}
                custom={wi * 5 + i}
                variants={letterVariants}
                className="inline-block"
                style={{
                  fontFamily: "var(--font-helvetica)",
                  fontWeight: 700,
                  fontSize: "clamp(3.5rem, 17vw, 5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.07em",
                  WebkitTextStroke: `1.5px ${FG}`,
                  color: "transparent",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Solid Subtitle ─────────────────────────────────────────────────

function SolidTitle() {
  return (
    <motion.h2
      className="text-center uppercase select-none -mt-1 sm:mt-0"
      style={{
        fontFamily: "var(--font-helvetica)",
        fontWeight: 700,
        fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)",
        letterSpacing: "-0.07em",
        color: FG,
        lineHeight: 1.1,
      }}
      {...fade(1.2)}
    >
      A.I. Creative Director
    </motion.h2>
  );
}

// ─── Discipline List ────────────────────────────────────────────────

function Disciplines() {
  return (
    <motion.p
      className="text-center uppercase mt-4 sm:mt-6"
      style={{
        fontFamily: "var(--font-helvetica)",
        fontWeight: 500,
        fontSize: "clamp(7px, 1vw, 9.5px)",
        letterSpacing: "0.08em",
        color: FG,
        whiteSpace: "pre-wrap",
      }}
      {...fade(1.5)}
    >
      Design  x  Brand Dev  x  Product  x  World Building  x  Content Creation
    </motion.p>
  );
}

// ─── Email Input ────────────────────────────────────────────────────

function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Could connect to an API later — for now, open mailto
    window.location.href = `mailto:ryan@ryanrosenthal.com?subject=Let's%20connect&body=Hi%20Ryan,%20my%20email%20is%20${encodeURIComponent(email)}`;
    setSubmitted(true);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-[352px] mt-12 sm:mt-16"
      {...fade(1.8)}
    >
      <div className="flex items-center gap-3">
        {/* Cursor line */}
        <div style={{ width: 1.5, height: 24, background: MUTED }} />

        <input
          type="email"
          placeholder="DROP YOUR EMAIL"
          value={submitted ? "SENT" : email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitted}
          className="flex-1 bg-transparent outline-none placeholder:uppercase"
          style={{
            fontFamily: "var(--font-helvetica)",
            fontWeight: 500,
            fontSize: "clamp(14px, 2vw, 22px)",
            letterSpacing: "-0.07em",
            color: submitted ? FG : MUTED,
          }}
        />

        {/* Arrow button */}
        <button
          type="submit"
          className="flex-shrink-0 transition-transform duration-200 hover:scale-110"
          style={{ color: MUTED }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ transform: "rotate(-45deg)" }}>
            <path d="M6 14H22M22 14L15 7M22 14L15 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Underline */}
      <div className="mt-3" style={{ height: 4, background: LINE }} />
    </motion.form>
  );
}

// ─── Book CTA ───────────────────────────────────────────────────────

function BookCTA() {
  return (
    <motion.a
      href="/book"
      className="mt-6 inline-flex items-center rounded-full px-6 py-3 transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
      style={{
        background: ACCENT,
        fontFamily: "var(--font-helvetica)",
      }}
      {...fade(2.0)}
      whileHover={{ scale: 1.02, filter: "brightness(1.15)" }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className="text-[10px] sm:text-[11px] font-medium tracking-[0.18em] uppercase whitespace-nowrap"
        style={{ color: "#E6E6E6" }}
      >
        Start a Project
      </span>
    </motion.a>
  );
}

// ─── Globe Logo Footer ──────────────────────────────────────────────

function GlobeFooter() {
  return (
    <motion.div className="flex flex-col items-center gap-2" {...fade(2.2)}>
      {/* Globe — invert colors for dark bg */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/globe-logo.svg"
        alt="Ryan Rosenthal globe logo"
        className="w-[170px] sm:w-[200px]"
        style={{ filter: "invert(0.85) sepia(0.05) saturate(0) brightness(0.95)" }}
      />
      <p
        className="uppercase text-center tracking-[0.06em]"
        style={{
          fontFamily: "var(--font-helvetica)",
          fontWeight: 500,
          fontSize: "13.5px",
          color: FG,
        }}
      >
        Ryan Rosenthal
      </p>
    </motion.div>
  );
}

// ─── Hero Page ──────────────────────────────────────────────────────

export default function HeroPage() {
  return (
    <>
      <CustomCursor />
      <div
        className="relative min-h-screen w-full flex flex-col items-center overflow-hidden"
        style={{ background: BG }}
      >
        {/* R——R Header */}
        <div className="w-full pt-3 sm:pt-4 px-2 sm:px-4">
          <RRHeader />
        </div>

        {/* Main content — vertically centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-0">
          <OutlineName />
          <SolidTitle />
          <Disciplines />
          <EmailCapture />
          <BookCTA />
        </div>

        {/* Globe footer */}
        <div className="pb-8 sm:pb-12">
          <GlobeFooter />
        </div>
      </div>
    </>
  );
}
