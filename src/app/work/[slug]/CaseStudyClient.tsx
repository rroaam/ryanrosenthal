"use client";

import type { Project } from "@/data/projects";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function CaseStudyClient({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  const [nextHover, setNextHover] = useState(false);

  const galleryImages = project.images.slice(1);

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
      <CustomCursor />
      <FilmGrain opacity={0.025} />

      {/* Hero Section */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 60,
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-helvetica)",
            fontWeight: 900,
            fontSize: "clamp(56px, 12vw, 160px)",
            textTransform: "uppercase",
            letterSpacing: "-0.05em",
            lineHeight: 0.92,
            margin: 0,
          }}
        >
          {project.title}
        </motion.h1>

        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-helvetica)",
            fontWeight: 700,
            fontSize: "clamp(14px, 2vw, 22px)",
            color: "#5a5a5a",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            marginTop: 16,
          }}
        >
          {project.titleBelow}
        </motion.p>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-helvetica)",
            fontWeight: 500,
            fontSize: 13,
            color: "#CECED0",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginTop: 12,
          }}
        >
          {project.projectType} / {project.year}
        </motion.p>
      </section>

      {/* Sticky Sub-Nav */}
      <div
        style={{
          position: "sticky",
          top: 54,
          zIndex: 40,
          background: "rgba(244, 243, 241, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid #E0E0E0",
          borderBottom: "1px solid #E0E0E0",
          padding: "0 40px",
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-helvetica)",
            fontWeight: 900,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {project.title}
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          {["Overview", "Gallery", "Next"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              style={{
                fontFamily: "var(--font-helvetica)",
                fontWeight: 700,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#5a5a5a",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#0A0A0A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#5a5a5a")
              }
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Overview Section */}
      <section
        id="overview"
        style={{ padding: "80px 40px", maxWidth: 900 }}
      >
        <ScrollReveal>
          <p
            style={{
              fontFamily: "var(--font-helvetica)",
              fontWeight: 700,
              fontSize: "clamp(18px, 2.5vw, 28px)",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.6)",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {project.content}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 32,
            }}
          >
            {project.projectType.split(" / ").map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-helvetica)",
                  fontWeight: 700,
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#5a5a5a",
                  border: "1px solid #E0E0E0",
                  padding: "6px 12px",
                  borderRadius: 2,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        style={{ padding: "0 40px 80px" }}
      >
        <ScrollReveal>
          <div style={{ marginBottom: 40 }}>
            <span
              style={{
                fontFamily: "var(--font-helvetica)",
                fontWeight: 900,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#CECED0",
              }}
            >
              01
            </span>
            <h2
              style={{
                fontFamily: "var(--font-helvetica)",
                fontWeight: 900,
                fontSize: "clamp(32px, 5vw, 56px)",
                textTransform: "uppercase",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                margin: "8px 0 0",
              }}
            >
              Project Gallery
            </h2>
            <p
              style={{
                fontFamily: "var(--font-helvetica)",
                fontWeight: 500,
                fontSize: 13,
                color: "#5a5a5a",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginTop: 12,
                maxWidth: 600,
                lineHeight: 1.5,
              }}
            >
              {project.overview}
            </p>
          </div>
        </ScrollReveal>

        {/* Cover Image - Full Width */}
        <ScrollReveal>
          <div
            style={{
              width: "100%",
              aspectRatio: "4/3",
              position: "relative",
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <Image
              src={project.images[0]}
              alt={`${project.title} — cover`}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </ScrollReveal>

        {/* 2x2 Grid for remaining images */}
        {galleryImages.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
              marginTop: 16,
            }}
          >
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 2,
                  }}
                >
                  <Image
                    src={img}
                    alt={`${project.title} — image ${i + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* Next Project Section */}
      <section
        id="next"
        style={{
          padding: "80px 40px",
          borderTop: "1px solid #E0E0E0",
        }}
      >
        <ScrollReveal>
          <span
            style={{
              fontFamily: "var(--font-helvetica)",
              fontWeight: 900,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#CECED0",
            }}
          >
            Next Project
          </span>

          <Link
            href={`/work/${nextProject.slug}`}
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
            onMouseEnter={() => setNextHover(true)}
            onMouseLeave={() => setNextHover(false)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              {/* Title with hover slide effect */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "clamp(48px, 10vw, 120px)",
                }}
              >
                <motion.div
                  animate={{ y: nextHover ? "-100%" : "0%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-helvetica)",
                      fontWeight: 900,
                      fontSize: "clamp(40px, 8vw, 100px)",
                      textTransform: "uppercase",
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      display: "block",
                    }}
                  >
                    {nextProject.title}
                  </span>
                </motion.div>
                <motion.div
                  animate={{ y: nextHover ? "-100%" : "0%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", top: "100%", left: 0 }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-helvetica)",
                      fontWeight: 900,
                      fontSize: "clamp(40px, 8vw, 100px)",
                      textTransform: "uppercase",
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      display: "block",
                      color: "#0000FF",
                    }}
                  >
                    {nextProject.title}
                  </span>
                </motion.div>
              </div>

              {/* Arrow */}
              <motion.span
                animate={{ x: nextHover ? 12 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "var(--font-helvetica)",
                  fontSize: "clamp(28px, 5vw, 60px)",
                  fontWeight: 300,
                  color: nextHover ? "#0000FF" : "#0A0A0A",
                  transition: "color 0.3s",
                  flexShrink: 0,
                }}
              >
                &rarr;
              </motion.span>
            </div>
          </Link>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
