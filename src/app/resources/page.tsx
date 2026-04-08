"use client";

import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

export default function ResourcesPage() {
  return (
    <div
      style={{
        fontFamily: "var(--font-helvetica)",
        background: "#F4F3F1",
        color: "#0A0A0A",
        minHeight: "100vh",
      }}
    >
      <SiteNav />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ paddingTop: 120, paddingLeft: 40, paddingRight: 40, paddingBottom: 60 }}
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
          Resources
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
          Guides & Downloads
        </p>
      </motion.div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        {/* Resource Item */}
        <ScrollReveal>
          <div
            style={{
              borderTop: "1px solid #E0E0E0",
              borderBottom: "1px solid #E0E0E0",
              padding: "40px 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "4px 12px",
                  border: "1px solid #0000FF",
                  color: "#0000FF",
                }}
              >
                PDF
              </span>
            </div>
            <h2
              style={{
                fontWeight: 900,
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                lineHeight: 1,
                marginBottom: 12,
              }}
            >
              Claude Co-Work Guide
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#5a5a5a",
                lineHeight: 1.7,
                maxWidth: 600,
              }}
            >
              A practical guide to working with Claude as a creative co-pilot.
              Covers prompt engineering for design, brand strategy workflows, and
              shipping products with Claude Code.
            </p>
          </div>
        </ScrollReveal>

        {/* More Coming Soon */}
        <ScrollReveal delay={0.15}>
          <div
            style={{
              padding: "80px 0",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#CECED0",
                marginBottom: 16,
              }}
            >
              More Coming Soon
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#5a5a5a",
                lineHeight: 1.7,
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              Templates, guides, and tools for creative directors working with AI.
              Sign up for updates at{" "}
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
            </p>
          </div>
        </ScrollReveal>

        <Footer />
      </div>
    </div>
  );
}
