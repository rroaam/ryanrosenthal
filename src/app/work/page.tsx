"use client";

import { projects } from "@/data/projects";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import FilmGrain from "@/components/FilmGrain";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WorkPage() {
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
      <FilmGrain opacity={0.025} />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ paddingTop: 120, paddingLeft: 40, paddingRight: 40, paddingBottom: 60 }}
      >
        <h1
          style={{
            fontFamily: "var(--font-helvetica)",
            fontWeight: 900,
            fontSize: "clamp(48px, 10vw, 140px)",
            textTransform: "uppercase",
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
            margin: 0,
          }}
        >
          Selected Work
        </h1>
        <p
          style={{
            fontFamily: "var(--font-helvetica)",
            fontWeight: 500,
            fontSize: 13,
            color: "#5a5a5a",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginTop: 16,
          }}
        >
          {projects.length} Projects / Brand, Product, Campaign
        </p>
      </motion.div>

      {/* Project Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          borderTop: "1px solid #E0E0E0",
          borderLeft: "1px solid #E0E0E0",
          margin: "0 40px",
        }}
      >
        {projects.map((project, i) => (
          <ScrollReveal key={project.slug} delay={Math.min(i * 0.05, 0.3)}>
            <Link
              href={`/work/${project.slug}`}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <motion.div
                whileHover="hover"
                initial="rest"
                animate="rest"
                style={{
                  borderRight: "1px solid #E0E0E0",
                  borderBottom: "1px solid #E0E0E0",
                  cursor: "pointer",
                }}
              >
                <motion.div
                  variants={{
                    rest: { backgroundColor: "rgba(250,250,250,0)" },
                    hover: { backgroundColor: "rgba(250,250,250,1)" },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image Container */}
                  <div
                    style={{
                      aspectRatio: "16/10",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <motion.div
                      variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.04 },
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "16px 20px 20px" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-helvetica)",
                        fontWeight: 900,
                        fontSize: 20,
                        textTransform: "uppercase",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                      }}
                    >
                      {project.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-helvetica)",
                        fontWeight: 500,
                        fontSize: 10,
                        color: "#5a5a5a",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: 6,
                      }}
                    >
                      {project.projectType}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-helvetica)",
                        fontWeight: 500,
                        fontSize: 10,
                        color: "#CECED0",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: 2,
                      }}
                    >
                      {project.year}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 80 }}>
        <Footer />
      </div>
    </div>
  );
}
