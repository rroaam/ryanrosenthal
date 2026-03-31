"use client";

import { motion } from "framer-motion";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

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

export default function Navigation({ delay = 0 }: { delay?: number }) {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-7"
      style={{ fontFamily: "var(--font-helvetica)" }}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      transition={{
        delay,
        duration: 0.8,
        ease: EASE_OUT_CUBIC,
      }}
    >
      {/* Left: name */}
      <a
        href="/"
        className="text-[11px] sm:text-xs tracking-[0.08em] uppercase font-medium whitespace-nowrap"
        style={{ color: "var(--black)" }}
      >
        Ryan Rosenthal
        <sup className="text-[0.55em] relative -top-[0.4em] ml-[0.5px]">
          &reg;
        </sup>
      </a>

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
