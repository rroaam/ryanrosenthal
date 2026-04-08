"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full"
      style={{
        fontFamily: "var(--font-helvetica)",
        borderTop: "1px solid #E0E0E0",
        padding: "40px",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          style={{
            fontWeight: 900,
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "#0A0A0A",
          }}
        >
          Ryan Rosenthal / Creative Director &amp; Founder
        </div>

        <div
          className="flex flex-wrap items-center gap-4"
          style={{
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "#5a5a5a",
          }}
        >
          <a
            href="mailto:ryan@designwithroam.com"
            style={{
              color: "#0A0A0A",
              textDecoration: "none",
              borderBottom: "1px solid #0000FF",
            }}
          >
            ryan@designwithroam.com
          </a>
          <a
            href="https://ryanrosenthal.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0A0A0A",
              textDecoration: "none",
              borderBottom: "1px solid #0000FF",
            }}
          >
            ryanrosenthal.com
          </a>
          <span>Los Angeles / 2026</span>
        </div>
      </div>
    </motion.footer>
  );
}
