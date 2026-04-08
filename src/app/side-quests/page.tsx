"use client";

import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const products = [
  {
    name: "r0am.io",
    type: "AI Startup Validation",
    status: "Launching",
    statusColor: "#8a8a1a",
    desc: "AI-powered startup idea validation. Scrapes Reddit, X, and Product Hunt in real time to score ideas against market demand, competitors, and blind spots.",
    stack: "Next.js \u00b7 Supabase \u00b7 Claude API \u00b7 Vercel",
  },
  {
    name: "Mysa",
    type: "Postpartum Wellness App",
    status: "In Progress",
    statusColor: "#8a8a1a",
    desc: "Mobile app for postpartum mothers \u2014 daily check-ins, community, habit tracking, journal, and library. Warm, botanical, unhurried.",
    stack: "React Native \u00b7 Expo SDK 54 \u00b7 Supabase \u00b7 NativeWind",
  },
  {
    name: "Aura",
    type: "Apple TV Generative Ambient",
    status: "PRD Complete",
    statusColor: "#5a5a5a",
    desc: "Type a prompt, get music and visuals simultaneously. Your TV becomes a living artwork generator.",
    stack: "tvOS \u00b7 SwiftUI \u00b7 MetalKit \u00b7 MusicGen / Replicate",
  },
  {
    name: "Scout",
    type: "iOS AI Pre-Shoot Director",
    status: "PRD Complete",
    statusColor: "#5a5a5a",
    desc: "Director-level preparation before the camera rolls. Scans environment via ARKit and coaches on lighting, camera settings, composition.",
    stack: "SwiftUI \u00b7 AVFoundation \u00b7 ARKit \u00b7 Vision \u00b7 Claude API",
  },
  {
    name: "Jarvis",
    type: "macOS Workspace Daemon",
    status: "PRD Complete",
    statusColor: "#5a5a5a",
    desc: "Double-clap. Everything opens. YAML-configurable per project.",
    stack: "Python \u00b7 pyaudio \u00b7 launchd \u00b7 AppleScript",
  },
  {
    name: "r33l.studio",
    type: "AI Content Studio",
    status: "Active",
    statusColor: "#1a8a1a",
    desc: "AI-native content production arm. Active production studio for AI-generated video, image, and motion content.",
    stack: "AI Production Pipeline",
  },
  {
    name: "Chronicle",
    type: "Voice to Printed Books",
    status: "Concept",
    statusColor: "#CECED0",
    desc: "AI converts voice memos into designed, printed books via POD.",
    stack: "AI Semantic Interpretation \u00b7 POD \u00b7 Wispr Flow",
  },
  {
    name: "Liminal Mind",
    type: "Headless YouTube",
    status: "Concept",
    statusColor: "#CECED0",
    desc: "AI-generated ambient philosophy. No camera, no face. Surreal visuals, philosophical narration.",
    stack: "Kling \u00b7 ElevenLabs \u00b7 Suno \u00b7 CapCut \u00b7 Midjourney",
  },
];

export default function SideQuestsPage() {
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
          Side Quests
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
          {products.length} Products / Apps, Platforms, Concepts
        </p>
      </motion.div>

      {/* Product List */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        {products.map((product, i) => (
          <ScrollReveal key={product.name} delay={Math.min(i * 0.06, 0.3)}>
            <div
              className="group"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 40,
                padding: "32px 0",
                borderBottom: "1px solid #E0E0E0",
                position: "relative",
                overflow: "hidden",
                transition: "padding-left 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Blue underline sweep */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: 0,
                  height: 1,
                  background: "#0000FF",
                  transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="group-hover:!w-full"
              />

              <div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: "clamp(22px, 3vw, 36px)",
                    letterSpacing: "-0.03em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {product.name}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#5a5a5a",
                    marginBottom: 10,
                  }}
                >
                  {product.type}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#5a5a5a",
                    lineHeight: 1.7,
                    maxWidth: 600,
                    marginBottom: 8,
                  }}
                >
                  {product.desc}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#CECED0",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {product.stack}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", paddingTop: 4 }}>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    border: `1px solid ${product.statusColor}`,
                    color: product.statusColor,
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.status}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", marginTop: 80 }}>
        <Footer />
      </div>
    </div>
  );
}
