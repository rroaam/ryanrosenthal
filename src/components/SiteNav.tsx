"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Resume", href: "/" },
  { label: "Side Quests", href: "/side-quests" },
  { label: "Book", href: "/book" },
  { label: "Resources", href: "/resources" },
];

export default function SiteNav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        fontFamily: "var(--font-helvetica)",
        background: "rgba(244, 243, 241, 0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        padding: "0 40px",
        height: "56px",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-helvetica)",
          fontWeight: 900,
          fontSize: "13px",
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: "#0A0A0A",
          textDecoration: "none",
        }}
      >
        RR
      </Link>

      <div className="flex items-center gap-6 max-sm:gap-3">
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors duration-200 hover:!text-[#0A0A0A] ${
              i > 2 ? "max-md:hidden" : ""
            } ${i > 3 ? "max-lg:hidden" : ""}`}
            style={{
              fontFamily: "var(--font-helvetica)",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              color: "#5a5a5a",
              textDecoration: "none",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
