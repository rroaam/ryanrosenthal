"use client";

import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useTextScramble } from "@/hooks/useTextScramble";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: EASE },
});

const heroNavItems = [
  { num: "01", text: "Work", href: "/work", count: "20 projects", accent: "#0000FF" },
  { num: "02", text: "Resume", href: "#capabilities", count: "scroll down", accent: "#0A0A0A" },
  { num: "03", text: "Side Quests", href: "/side-quests", count: "apps & products", accent: "#4A00E0" },
  { num: "04", text: "Book a Session", href: "/book", count: "1:1 consulting", accent: "#007A4D" },
  { num: "05", text: "Resources", href: "/resources", count: "guides & downloads", accent: "#8B5E00" },
  { num: "06", text: "Download PDF", href: "/resume", count: "1-page resume", accent: "#5a5a5a" },
];

function HeroNavItem({
  num,
  text,
  href,
  count,
  accent,
}: {
  num: string;
  text: string;
  href: string;
  count: string;
  accent: string;
}) {
  const { display, scramble, reset } = useTextScramble(text, 25);
  const isHash = href.startsWith("#");
  const Tag = isHash ? "a" : Link;
  const id = `nav-${num}`;

  return (
    <Tag
      href={href}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      id={id}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "14px 0",
        borderBottom: "1px solid #E0E0E0",
        textDecoration: "none",
        color: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
        transition: "padding-left 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="group"
    >
      <style>{`
        #${id}:hover { padding-left: 8px !important; }
        #${id}::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: ${accent};
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #${id}:hover::before { width: 100%; }
        #${id}:hover .nav-num { color: ${accent} !important; }
      `}</style>
      <span
        style={{
          fontFamily: "var(--font-helvetica)",
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: "0.1em",
          color: "#CECED0",
          minWidth: 28,
          transition: "color 0.3s",
        }}
        className="nav-num"
      >
        {num}
      </span>
      <span
        style={{
          fontFamily: "var(--font-helvetica)",
          fontWeight: 800,
          fontSize: "clamp(16px, 2vw, 24px)",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          transition: "letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="group-hover:tracking-[0.01em]"
      >
        {display}
      </span>
      <span
        style={{
          fontFamily: "var(--font-helvetica)",
          fontWeight: 400,
          fontSize: 10,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "#CECED0",
          marginLeft: "auto",
          transition: "color 0.3s",
        }}
        className="group-hover:!text-[#5a5a5a]"
      >
        {count}
      </span>
    </Tag>
  );
}

export default function Home() {
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

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "clamp(70px, 12vw, 100px) clamp(20px, 4vw, 40px) 60px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
          <motion.div
            {...fadeUp(0.1)}
            style={{
              fontFamily: "var(--font-helvetica)",
              fontWeight: 900,
              fontSize: "clamp(48px, 8vw, 120px)",
              lineHeight: 0.85,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              color: "#0A0A0A",
            }}
          >
            <style>{`
              .hero-letter {
                display: inline-block;
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s;
                cursor: none !important;
              }
              .hero-letter:hover {
                transform: scaleY(1.3);
                color: #0000FF;
              }
            `}</style>
            {"RYAN".split("").map((ch, i) => (
              <span key={`r${i}`} className="hero-letter">{ch}</span>
            ))}
            <br />
            {"ROSENTHAL".split("").map((ch, i) => (
              <span key={`s${i}`} className="hero-letter">{ch}</span>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.3)}
            style={{
              fontFamily: "var(--font-helvetica)",
              fontWeight: 500,
              fontSize: "clamp(11px, 1.2vw, 14px)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#5a5a5a",
              marginTop: 14,
            }}
          >
            Creative Director &amp; Founder / Los Angeles
          </motion.div>

          <motion.div
            {...fadeUp(0.4)}
            style={{
              fontFamily: "var(--font-helvetica)",
              fontWeight: 500,
              fontSize: "clamp(11px, 1.2vw, 14px)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#CECED0",
            }}
          >
            10 years / 50+ clients / AI-native
          </motion.div>

          <motion.div {...fadeUp(0.5)} style={{ marginTop: 48 }}>
            {heroNavItems.map((item) => (
              <HeroNavItem key={item.num} {...item} />
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.7)}
            style={{ display: "flex", gap: 20, marginTop: 48 }}
          >
            {[
              { label: "Instagram", href: "https://instagram.com/ryanrosenthal" },
              { label: "LinkedIn", href: "https://linkedin.com/in/ryan-rosenthal" },
              { label: "Email", href: "mailto:ryan@designwithroam.com" },
              { label: "ROAM", href: "https://designwithroam.com" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group"
                style={{
                  fontFamily: "var(--font-helvetica)",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#5a5a5a",
                  textDecoration: "none",
                  paddingBottom: 2,
                  borderBottom: "1px solid transparent",
                  transition: "all 0.3s",
                }}
              >
                <span className="group-hover:!text-[#0A0A0A] group-hover:border-b group-hover:border-[#0000FF]">
                  {s.label}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          RESUME CONTENT
          ═══════════════════════════════════════════ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px, 4vw, 40px)" }}>
        {/* BIO */}
        <ScrollReveal>
          <section
            id="bio"
            style={{ padding: "120px 0 80px", borderTop: "none" }}
          >
            <div
              style={{
                fontFamily: "var(--font-helvetica)",
                fontWeight: 700,
                fontSize: "clamp(18px, 2.4vw, 32px)",
                lineHeight: 1.35,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.6)",
                maxWidth: 1000,
              }}
            >
              Born in 1994 in Los Angeles. Studied psychology — the science of why
              people do what they do. Carried that lens through music labels,
              metaverse platforms, wellness companies, entertainment institutions,
              and a decade of brand and product work. Now building AI-native
              creative at the intersection of culture and technology.
            </div>
            <div
              style={{
                marginTop: 32,
                fontFamily: "var(--font-helvetica)",
                fontSize: 13,
                color: "#5a5a5a",
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <span>Creative Director &middot; Founder &middot; Los Angeles</span>
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
                style={{
                  color: "#0A0A0A",
                  textDecoration: "none",
                  borderBottom: "1px solid #0000FF",
                }}
              >
                ryanrosenthal.com
              </a>
              <a
                href="https://instagram.com/ryanrosenthal"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#0A0A0A",
                  textDecoration: "none",
                  borderBottom: "1px solid #0000FF",
                }}
              >
                @ryanrosenthal
              </a>
            </div>
          </section>
        </ScrollReveal>

        {/* CAPABILITIES */}
        <ScrollReveal>
          <section
            id="capabilities"
            style={{ padding: "80px 0", borderTop: "1px solid #E0E0E0" }}
          >
            <div
              style={{
                fontFamily: "var(--font-helvetica)",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#CECED0",
                marginBottom: 8,
              }}
            >
              01
            </div>
            <h2
              style={{
                fontFamily: "var(--font-helvetica)",
                fontWeight: 900,
                fontSize: "clamp(36px, 5vw, 72px)",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                lineHeight: 0.95,
                marginBottom: 48,
              }}
            >
              Capabilities
              <br />& AI Stack
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 0,
                borderTop: "1px solid #E0E0E0",
                borderLeft: "1px solid #E0E0E0",
              }}
            >
              {[
                {
                  label: "Creative Direction",
                  items: "Campaign Strategy\nBrand Systems\nVisual Worlds\nAI Asset Direction",
                },
                {
                  label: "Design",
                  items: "UI / UX\nFigma \u00b7 Framer\nAdobe Suite\nMotion Design",
                },
                {
                  label: "Vibe Coding",
                  items: "Figma \u2192 Claude Code \u2192 Vercel\nNext.js \u00b7 React Native\nSwiftUI / tvOS\nSupabase",
                },
                {
                  label: "AI Stack",
                  items: "Claude API \u00b7 Claude Code\nMidjourney\nRunway \u00b7 Kling\nTopaz AI \u00b7 Higgsfield",
                },
                {
                  label: "Content & Video",
                  items: "CapCut \u00b7 Premiere Pro\nAfter Effects\nSubstack\nShort-form Video",
                },
                {
                  label: "Software",
                  items: "Figma \u00b7 Framer\nWebflow \u00b7 Shopify\nSupabase \u00b7 Vercel\nCursor",
                },
              ].map((cap) => (
                <div
                  key={cap.label}
                  style={{
                    background: "transparent",
                    padding: 28,
                    borderRight: "1px solid #E0E0E0",
                    borderBottom: "1px solid #E0E0E0",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-helvetica)",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#5a5a5a",
                      marginBottom: 12,
                    }}
                  >
                    {cap.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-helvetica)",
                      fontSize: 13,
                      lineHeight: 2,
                      color: "#0A0A0A",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {cap.items}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* EXPERIENCE */}
        <ScrollReveal>
          <section
            id="experience"
            style={{ padding: "80px 0", borderTop: "1px solid #E0E0E0" }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#CECED0",
                marginBottom: 8,
              }}
            >
              02
            </div>
            <h2
              style={{
                fontWeight: 900,
                fontSize: "clamp(36px, 5vw, 72px)",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                lineHeight: 0.95,
                marginBottom: 48,
              }}
            >
              Agency & In-House
              <br />
              Experience
            </h2>

            {[
              {
                year: "Currently Building",
                tag: "Active",
                company: "r0am.io",
                role: "Founder & Design Director",
                desc: "AI startup validation platform \u2014 designed in Figma, shipped with Claude Code. Real-time market intelligence scraped from Reddit, X, and Product Hunt. Returns a full validation report in minutes. For founders who\u2019d rather know before they build.",
              },
              {
                year: "2025 \u2014 2026",
                tag: "Active",
                company: "Device Factory / LIV Las Vegas",
                role: "Creative Director \u00b7 2026 Campaign",
                desc: 'Built the entire 2026 artist announcement campaign for one of the most recognized nightclub brands in the world. Solo. Six weeks. Every asset AI-generated.',
                bullets: [
                  'Created "The Device Factory" \u2014 a fictional underground laboratory where resident DJs were positioned as inventors of experimental music technology',
                  "12 AI-generated device renders \u00b7 full monthly flyer system \u00b7 6 environmental textures \u00b7 billboard creative",
                  "41-frame launch video storyboard \u00b7 complete style guide built to scale without a CD in the room",
                  "Artists: John Summit \u00b7 Dom Dolla \u00b7 Ti\u00ebsto \u00b7 Disco Lines \u00b7 David Guetta",
                ],
              },
              {
                year: "2019 \u2014 2023",
                company: "Sprite \u00d7 UMG",
                role: "Design Director \u00b7 Integrated Campaign",
                desc: "Integrated artist campaign spanning digital assets, cultural touchpoints, and global distribution. Music and commerce, made to feel like neither.",
              },
              {
                year: "2020 \u2014 2024",
                company: "Snapchat",
                role: "Creative Partner \u00b7 Brand & Product",
                desc: "Brand and product-facing creative direction for one of the defining social platforms of a generation.",
              },
              {
                year: "2023 \u2014 Present",
                company: "Therabody",
                role: "Creative Direction",
                desc: "Campaign and brand work for the global leader in percussive therapy and wellness technology.",
              },
              {
                year: "2017 \u2014 2021",
                company: "Grammy Recording Academy",
                role: "Creative Consulting",
                desc: "Brand and design consulting for the institution at the center of recorded music culture.",
              },
              {
                year: "2018 \u2014 2022",
                company: "MUD\\WTR",
                role: "Strategy & Design \u00b7 DTC",
                desc: "Brand identity, digital presence, and packaging through the growth years of a DTC category-maker. Early. The brand was still becoming. So was the work.",
              },
              {
                year: "2018 \u2014 2019",
                company: "Stageverse",
                role: "Design Director \u00b7 Metaverse",
                desc: "Visual world-building for a metaverse concert platform \u2014 years before the language existed. The intersection of spatial design, brand identity, and live music experience.",
              },
              {
                year: "2014 \u2014 2015",
                company: "Ultra Records",
                role: "A&R Intern",
                desc: "Taste-making at one of electronic music\u2019s most culturally relevant labels. Home to Deadmau5, Calvin Harris, a generation of artists who shaped festival culture. The training ground.",
              },
            ].map((exp, i) => (
              <ScrollReveal key={i} delay={Math.min(i * 0.05, 0.3)}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr",
                    gap: 40,
                    padding: "40px 0",
                    borderBottom:
                      i < 8 ? "1px solid #E0E0E0" : "none",
                  }}
                  className="max-sm:!grid-cols-1 max-sm:!gap-3"
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        letterSpacing: "0.08em",
                        color: "#5a5a5a",
                        textTransform: "uppercase",
                        paddingTop: 6,
                      }}
                    >
                      {exp.year}
                    </div>
                    {exp.tag && (
                      <div
                        style={{
                          display: "inline-block",
                          marginTop: 10,
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "4px 10px",
                          border: "1px solid #1a8a1a",
                          color: "#1a8a1a",
                        }}
                      >
                        {exp.tag}
                      </div>
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: "clamp(28px, 3vw, 42px)",
                        letterSpacing: "-0.03em",
                        textTransform: "uppercase",
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      {exp.company}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#888888",
                        marginBottom: 16,
                      }}
                    >
                      {exp.role}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#5a5a5a",
                        lineHeight: 1.8,
                        marginBottom: 16,
                        maxWidth: 700,
                      }}
                    >
                      {exp.desc}
                    </div>
                    {exp.bullets && (
                      <ul
                        style={{
                          listStyle: "none",
                          fontSize: 12,
                          color: "#777",
                          lineHeight: 2,
                          padding: 0,
                        }}
                      >
                        {exp.bullets.map((b, bi) => (
                          <li key={bi}>
                            <span style={{ color: "#888888" }}>&mdash; </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </section>
        </ScrollReveal>

        {/* PRODUCTS */}
        <ScrollReveal>
          <section
            id="products"
            style={{ padding: "80px 0", borderTop: "1px solid #E0E0E0" }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#CECED0",
                marginBottom: 8,
              }}
            >
              03
            </div>
            <h2
              style={{
                fontWeight: 900,
                fontSize: "clamp(36px, 5vw, 72px)",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                lineHeight: 0.95,
                marginBottom: 48,
              }}
            >
              Products Built
              <br />& In Production
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 0,
                borderTop: "1px solid #E0E0E0",
                borderLeft: "1px solid #E0E0E0",
              }}
            >
              {[
                {
                  name: "r0am.io",
                  type: "AI Startup Validation Platform",
                  desc: "AI-powered startup idea validation. Scrapes Reddit, X, and Product Hunt in real time to score ideas against market demand, competitors, and blind spots.",
                  stack: "Next.js \u00b7 Supabase \u00b7 Claude API \u00b7 Vercel",
                  status: ["Built", "Launching"],
                  statusClass: "build",
                },
                {
                  name: "Mysa",
                  type: "Postpartum Wellness App",
                  desc: "Mobile app for postpartum mothers \u2014 daily check-ins, community, habit tracking, journal, and library. Warm, botanical, unhurried.",
                  stack: "React Native \u00b7 Expo SDK 54 \u00b7 Supabase \u00b7 NativeWind",
                  status: ["In Progress"],
                  statusClass: "build",
                },
                {
                  name: "Aura",
                  type: "Apple TV Generative Ambient",
                  desc: "Type a prompt, get music and visuals simultaneously. Your TV becomes a living artwork generator.",
                  stack: "tvOS \u00b7 SwiftUI \u00b7 MetalKit \u00b7 MusicGen / Replicate",
                  status: ["PRD Complete"],
                  statusClass: "build",
                },
                {
                  name: "Scout",
                  type: "iOS AI Pre-Shoot Director",
                  desc: "Director-level preparation before the camera rolls. Scans environment via ARKit and coaches on lighting, camera settings, composition.",
                  stack: "SwiftUI \u00b7 AVFoundation \u00b7 ARKit \u00b7 Vision \u00b7 Claude API",
                  status: ["PRD Complete"],
                  statusClass: "build",
                },
                {
                  name: "Jarvis",
                  type: "macOS Workspace Daemon",
                  desc: "Double-clap. Everything opens. YAML-configurable per project.",
                  stack: "Python \u00b7 pyaudio \u00b7 launchd \u00b7 AppleScript",
                  status: ["PRD Complete"],
                  statusClass: "build",
                },
                {
                  name: "Chronicle",
                  type: "Voice \u2192 Printed Books",
                  desc: "AI converts voice memos into designed, printed books via POD.",
                  stack: "AI Semantic Interpretation \u00b7 POD \u00b7 Wispr Flow",
                  status: ["Concept"],
                  statusClass: "concept",
                },
                {
                  name: "Human.os",
                  type: "Creative Technology Studio",
                  desc: "\u201cHow Users Make Art with New Operating Systems.\u201d Umbrella brand and holding company for all products.",
                  stack: "LLC \u00b7 SAFE Notes \u00b7 Portfolio Model",
                  status: ["Concept"],
                  statusClass: "concept",
                },
                {
                  name: "r33l.studio",
                  type: "AI Content Studio",
                  desc: "AI-native content production arm. Active.",
                  stack: "AI Production Pipeline",
                  status: ["Active"],
                  statusClass: "live",
                },
                {
                  name: "Liminal Mind",
                  type: "Headless YouTube Channel",
                  desc: "AI-generated ambient philosophy. No camera, no face. Surreal visuals, philosophical narration.",
                  stack: "Kling \u00b7 ElevenLabs \u00b7 Suno \u00b7 CapCut \u00b7 Midjourney",
                  status: ["Concept"],
                  statusClass: "concept",
                },
              ].map((p) => (
                <ScrollReveal key={p.name}>
                  <div
                    style={{
                      background: "transparent",
                      padding: 32,
                      borderRight: "1px solid #E0E0E0",
                      borderBottom: "1px solid #E0E0E0",
                      transition: "background 0.15s",
                    }}
                    className="hover:!bg-[#FAFAFA]"
                  >
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        marginBottom: 14,
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      {p.status.map((s) => (
                        <span
                          key={s}
                          style={{
                            padding: "3px 10px",
                            border: `1px solid ${
                              p.statusClass === "live"
                                ? "#1a8a1a"
                                : p.statusClass === "build"
                                ? "#8a8a1a"
                                : "#E0E0E0"
                            }`,
                            color:
                              p.statusClass === "live"
                                ? "#1a8a1a"
                                : p.statusClass === "build"
                                ? "#8a8a1a"
                                : "#5a5a5a",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: 28,
                        letterSpacing: "-0.02em",
                        textTransform: "uppercase",
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#888888",
                        marginBottom: 14,
                      }}
                    >
                      {p.type}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#777",
                        lineHeight: 1.75,
                      }}
                    >
                      {p.desc}
                    </div>
                    <div
                      style={{
                        marginTop: 16,
                        fontSize: 11,
                        color: "#5a5a5a",
                        letterSpacing: "0.04em",
                        borderTop: "1px solid #E0E0E0",
                        paddingTop: 14,
                      }}
                    >
                      {p.stack}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* CLIENTS */}
        <ScrollReveal>
          <section
            id="clients"
            style={{ padding: "80px 0", borderTop: "1px solid #E0E0E0" }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#CECED0",
                marginBottom: 8,
              }}
            >
              04
            </div>
            <h2
              style={{
                fontWeight: 900,
                fontSize: "clamp(36px, 5vw, 72px)",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                lineHeight: 0.95,
                marginBottom: 48,
              }}
            >
              Client Portfolio
              <br />
              From A-Z
            </h2>

            <div
              style={{
                lineHeight: 1.8,
                maxWidth: 900,
              }}
            >
              {[
                "Adaptive", "Agrippa", "Algo", "Alien Water", "A'muse",
                "Celia Health", "Chegg", "Compatible.LA", "Coral House",
                "Cowboy Colostrum", "Fun Guy", "Grammy Recording Academy",
                "Kintsugi", "LIV Las Vegas", "Livegrid", "MUD\\WTR",
                "OPLAE", "Playful AI", "SaunaBox", "Schwartz & Schreiber",
                "Skylrk", "Snapchat", "Sprite \u00d7 UMG", "Stageverse",
                "Superpower", "Supermassive", "Tabs", "The Girls in 401",
                "The90", "Therabody", "Ultra Records", "Unitea",
                "Universal Music Group", "Wheelz", "Wild Society Nutrition", "Yuno",
              ].map((name, i, arr) => (
                <span key={name}>
                  <span
                    className="client-name"
                    style={{
                      fontWeight: 800,
                      fontSize: "clamp(14px, 1.8vw, 18px)",
                      textTransform: "uppercase",
                      letterSpacing: "-0.01em",
                      color: "#0A0A0A",
                      transition: "color 0.2s",
                    }}
                  >
                    {name}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ color: "#CECED0", margin: "0 12px", fontSize: 14 }}>&middot;</span>
                  )}
                </span>
              ))}
              <style>{`
                .client-name:hover { color: #0000FF !important; }
              `}</style>
            </div>
          </section>
        </ScrollReveal>

        {/* PERSONAL BRAND & CONTENT */}
        <ScrollReveal>
          <section
            id="content"
            style={{ padding: "80px 0", borderTop: "1px solid #E0E0E0" }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#CECED0",
                marginBottom: 8,
              }}
            >
              05
            </div>
            <h2
              style={{
                fontWeight: 900,
                fontSize: "clamp(36px, 5vw, 72px)",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                lineHeight: 0.95,
                marginBottom: 48,
              }}
            >
              Personal Brand
              <br />& Content
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 40,
              }}
            >
              {[
                {
                  title: "Speaking",
                  content:
                    "Future of Commerce with AR Summit \u2014 speaker\nMRAD Architecture Creative Summit \u2014 speaker\nLightning in a Bottle 2026 \u2014 confirmed",
                },
                {
                  title: "r33l.studio",
                  content:
                    "AI content studio. Active production arm for AI-native video, image, and motion content.",
                },
                {
                  title: "Liminal Mind",
                  content:
                    "Headless YouTube channel. AI-generated ambient philosophy. No camera, no face. Surreal visuals and philosophical narration.",
                },
                {
                  title: "Coral House",
                  content:
                    "Co-founded a wellness coworking space in Venice, CA. Community-first workspace for creatives and founders. 2019.",
                },
                {
                  title: "OG",
                  content:
                    "Personal content channel. Behind-the-scenes creative direction, AI workflows, and building in public.",
                },
                {
                  title: "ROAM The AI Newsletter",
                  content:
                    "Weekly newsletter on AI-native creative workflows. Tools, techniques, and real examples from shipping products with AI.",
                },
                {
                  title: "Startup Mini Incubator",
                  content:
                    "Mentoring early-stage founders on brand, product design, and go-to-market. From idea validation to first customers.",
                },
                {
                  title: "Design With ROAM",
                  content:
                    "Boutique creative agency. 10+ years, 50+ clients. Brand identity, UI/UX, campaign production. AI-native production model.",
                  link: { label: "designwithroam.com", href: "https://designwithroam.com" },
                },
              ].map((item) => (
                <ScrollReveal key={item.title}>
                  <div>
                    <h3
                      style={{
                        fontWeight: 900,
                        fontSize: 22,
                        letterSpacing: "-0.02em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#5a5a5a",
                        lineHeight: 1.75,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.content}
                      {item.link && (
                        <>
                          <br />
                          <a
                            href={item.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#0A0A0A",
                              textDecoration: "none",
                              borderBottom: "1px solid #0000FF",
                            }}
                          >
                            {item.link.label}
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* EDUCATION */}
        <ScrollReveal>
          <section
            id="education"
            style={{ padding: "80px 0", borderTop: "1px solid #E0E0E0" }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#CECED0",
                marginBottom: 8,
              }}
            >
              06
            </div>
            <h2
              style={{
                fontWeight: 900,
                fontSize: "clamp(36px, 5vw, 72px)",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                lineHeight: 0.95,
                marginBottom: 48,
              }}
            >
              Education &
              <br />
              Infrastructure
            </h2>

            {[
              {
                institution: "UCLA",
                detail: "B.A. Psychology \u00b7 2012 \u2013 2016",
                right: "Los Angeles, CA\nConsumer Behavior \u00b7 Human-Centered Systems",
              },
              {
                institution: "Ultra Records \u2014 A&R",
                detail: "Artist Development \u00b7 Taste-Making \u00b7 2014 \u2013 2015",
                right: "Self-directed career chapter\nPre-agency, formative years",
              },
              {
                institution: "Silicon Beach Era",
                detail: "App creation & startup world \u00b7 2015 \u2013 2019",
                right: "Worked at startups big to small\nPeak Silicon Beach days in LA",
              },
              {
                institution: "Coral House",
                detail: "Co-Founder & CEO \u00b7 Wellness Coworking \u00b7 2019",
                right: "Venice, CA\nCommunity-first workspace",
              },
              {
                institution: "ROAM",
                detail: "Founded \u00b7 2022 \u2013 Present",
                right: "Boutique creative agency\n50+ clients, AI-native production",
              },
            ].map((edu, i) => (
              <ScrollReveal key={i}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: "24px 0",
                    borderBottom:
                      i < 3 ? "1px solid #E0E0E0" : "none",
                    gap: 24,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: 26,
                        letterSpacing: "-0.02em",
                        textTransform: "uppercase",
                      }}
                    >
                      {edu.institution}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "#5a5a5a",
                        marginTop: 4,
                      }}
                    >
                      {edu.detail}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#5a5a5a",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      textAlign: "right",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {edu.right}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </section>
        </ScrollReveal>

        {/* FOOTER */}
        <div style={{ marginTop: 40 }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
