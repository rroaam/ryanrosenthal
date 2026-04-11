"use client";

import { motion } from "framer-motion";
import SiteNav from "./SiteNav";
import BookingContent from "./BookingContent";

export default function BookingFlow() {
  return (
    <div
      className="relative min-h-screen w-full"
      style={{
        background: "#F4F3F1",
        fontFamily: "var(--font-helvetica)",
        color: "#0A0A0A",
      }}
    >
      <SiteNav />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ paddingTop: 120, paddingLeft: 40, paddingRight: 40, paddingBottom: 40 }}
      >
        <h1
          style={{
            fontWeight: 900,
            fontSize: "clamp(48px, 10vw, 140px)",
            textTransform: "uppercase",
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
            margin: 0,
          }}
        >
          Book a Call
        </h1>
        <p
          style={{
            fontWeight: 500,
            fontSize: 13,
            color: "#5a5a5a",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginTop: 16,
          }}
        >
          Discovery or Project Kickoff
        </p>
      </motion.div>

      <div className="flex flex-col items-center justify-center pb-12">
        <BookingContent />
      </div>
    </div>
  );
}
