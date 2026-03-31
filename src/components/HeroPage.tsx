"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "./CustomCursor";
import FilmGrain from "./FilmGrain";
import Preloader from "./Preloader";
import BookingContent from "./BookingContent";
import { useTextScramble } from "@/hooks/useTextScramble";

// ─── Colors ─────────────────────────────────────────────────────────

const BG = "#211F1F";
const FG = "#CECED0";
const ACCENT = "#E5000A";

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
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: FG, letterSpacing: "-0.04em" }}
      >
        R
      </span>
      <div className="flex-1 mx-3 sm:mx-6" style={{ height: 3, background: FG }} />
      <span
        className="select-none leading-none"
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: FG, letterSpacing: "-0.04em" }}
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
    <motion.div className="select-none text-center" initial="hidden" animate="visible">
      <div className="hidden sm:flex justify-center whitespace-nowrap py-[0.05em]">
        {letters.map((letter, i) => (
          <motion.span
            key={`d-${i}`}
            custom={i}
            variants={letterVariants}
            className="inline-block"
            style={{
              fontFamily: "var(--font-helvetica)", fontWeight: 700,
              fontSize: "clamp(3rem, 7.5vw, 5rem)", lineHeight: 1.1,
              letterSpacing: "-0.07em", WebkitTextStroke: `1.5px ${FG}`, color: "transparent",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>

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
                  fontFamily: "var(--font-helvetica)", fontWeight: 700,
                  fontSize: "clamp(3.5rem, 17vw, 5rem)", lineHeight: 0.95,
                  letterSpacing: "-0.07em", WebkitTextStroke: `1.5px ${FG}`, color: "transparent",
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
        fontFamily: "var(--font-helvetica)", fontWeight: 700,
        fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)", letterSpacing: "-0.07em",
        color: FG, lineHeight: 1.1,
      }}
      {...fade(1.2)}
    >
      A.I. Creative Director
    </motion.h2>
  );
}

// ─── Discipline List ────────────────────────────────────────────────

function Disciplines() {
  const text = "Design  x  Brand Dev  x  Product  x  World Building  x  Content Creation";
  const { display, scramble, reset } = useTextScramble(text, 25);

  return (
    <motion.p
      className="text-center uppercase mt-4 sm:mt-6"
      style={{
        fontFamily: "var(--font-helvetica)", fontWeight: 500,
        fontSize: "clamp(7px, 1vw, 9.5px)", letterSpacing: "0.08em",
        color: FG, whiteSpace: "pre-wrap",
      }}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      {...fade(1.5)}
    >
      {display}
    </motion.p>
  );
}

// ─── Book CTA ───────────────────────────────────────────────────────

function BookCTA({ onClick }: { onClick: () => void }) {
  const { display, scramble, reset } = useTextScramble("Start a Project", 30);

  return (
    <motion.button
      onClick={onClick}
      data-cursor-label="BOOK"
      className="mt-10 sm:mt-14 inline-flex items-center rounded-full px-6 py-3 transition-all duration-200 ease-out"
      style={{ background: ACCENT, fontFamily: "var(--font-helvetica)" }}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      {...fade(1.8)}
      whileHover={{ scale: 1.02, filter: "brightness(1.15)" }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className="text-[10px] sm:text-[11px] font-medium tracking-[0.18em] uppercase whitespace-nowrap"
        style={{ color: "#E6E6E6" }}
      >
        {display}
      </span>
    </motion.button>
  );
}

// ─── Globe Logo Footer ──────────────────────────────────────────────

function GlobeFooter() {
  return (
    <motion.div className="flex flex-col items-center gap-2" {...fade(2.0)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/globe-logo.svg"
        alt="Ryan Rosenthal globe logo"
        className="w-[170px] sm:w-[200px]"
        style={{ filter: "invert(0.85) sepia(0.05) saturate(0) brightness(0.95)" }}
      />
      <p
        className="uppercase text-center tracking-[0.06em]"
        style={{ fontFamily: "var(--font-helvetica)", fontWeight: 500, fontSize: "13.5px", color: FG }}
      >
        Ryan Rosenthal
      </p>
    </motion.div>
  );
}

// ─── Booking Modal ──────────────────────────────────────────────────

function BookingModal({ onClose }: { onClose: () => void }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(33,31,31,0.95)", backdropFilter: "blur(20px)" }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal content */}
      <motion.div
        className="relative w-full max-w-[760px] max-h-[90vh] overflow-y-auto mx-4 rounded-3xl"
        style={{
          background: BG,
          border: "1px solid rgba(206,206,208,0.08)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        initial={{ y: 60, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <BookingContent onClose={onClose} />
      </motion.div>
    </motion.div>
  );
}

// ─── Hero Page ──────────────────────────────────────────────────────

export default function HeroPage() {
  const [loaded, setLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("rr-preloader-seen");
      if (!seen) {
        setShowPreloader(true);
        sessionStorage.setItem("rr-preloader-seen", "1");
      } else {
        setLoaded(true);
      }
    }
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <CustomCursor />
      <FilmGrain opacity={0.035} />
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {loaded && (
        <div
          className="relative min-h-screen w-full flex flex-col items-center overflow-hidden"
          style={{ background: BG }}
        >
          <div className="w-full pt-3 sm:pt-4 px-2 sm:px-4">
            <RRHeader />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-0">
            <OutlineName />
            <SolidTitle />
            <Disciplines />
            <BookCTA onClick={() => setShowBooking(true)} />
          </div>

          <div className="pb-8 sm:pb-12">
            <GlobeFooter />
          </div>
        </div>
      )}

      {!loaded && (
        <div className="fixed inset-0" style={{ background: BG }} />
      )}

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
      </AnimatePresence>
    </>
  );
}
