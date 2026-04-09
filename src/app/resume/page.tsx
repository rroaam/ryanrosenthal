"use client";

export default function ResumePrintPage() {
  return (
    <>
      <style>{`
        @page {
          size: 8in 11in;
          margin: 0;
        }
        @media print {
          body { background: white !important; }
          canvas, [class*="cursor"], [class*="grain"] { display: none !important; }
        }
        .resume-page * { cursor: auto !important; }
      `}</style>

      <div
        className="resume-page"
        style={{
          fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          background: "#FFFFFF",
          color: "#0A0A0A",
          width: "8in",
          margin: "0 auto",
          minHeight: "11in",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "8in",
            minHeight: "11in",
            padding: "0.4in 0.45in 0.35in",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              paddingBottom: 8,
              borderBottom: "2.5px solid #0A0A0A",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontWeight: 900,
                fontSize: 34,
                letterSpacing: "-0.05em",
                textTransform: "uppercase",
                lineHeight: 0.88,
              }}
            >
              Ryan
              <br />
              Rosenthal
            </div>
            <div style={{ textAlign: "right", lineHeight: 1.55 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 8,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Creative Director &amp; Founder
              </div>
              <div
                style={{
                  fontSize: 7.5,
                  fontWeight: 400,
                  color: "#6a6a6a",
                  marginTop: 2,
                }}
              >
                <a
                  href="mailto:ryan@designwithroam.com"
                  style={{
                    color: "#0A0A0A",
                    textDecoration: "none",
                    borderBottom: "0.5px solid #0000FF",
                  }}
                >
                  ryan@designwithroam.com
                </a>{" "}
                &middot;{" "}
                <a
                  href="https://ryanrosenthal.com"
                  style={{
                    color: "#0A0A0A",
                    textDecoration: "none",
                    borderBottom: "0.5px solid #0000FF",
                  }}
                >
                  ryanrosenthal.com
                </a>{" "}
                &middot;{" "}
                <a
                  href="https://instagram.com/ryanrosenthal"
                  style={{
                    color: "#0A0A0A",
                    textDecoration: "none",
                    borderBottom: "0.5px solid #0000FF",
                  }}
                >
                  @ryanrosenthal
                </a>
                <br />
                Los Angeles, CA
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div
            style={{
              fontWeight: 500,
              fontSize: 8.5,
              lineHeight: 1.5,
              letterSpacing: "-0.005em",
              color: "rgba(0,0,0,0.55)",
              marginBottom: 12,
              maxWidth: "6.5in",
            }}
          >
            Creative director and founder with 10+ years building campaigns, brands,
            and products across music, tech, wellness, and entertainment. Full-spectrum
            marketing: brand identity, product design, content creation, creative
            campaigns, ads, email, retention, and go-to-market strategy.
            Psychology-trained perspective on what actually moves people. Now shipping
            AI-native tools and workflows with Claude Code. 50+ clients. Multiple
            products in market.
          </div>

          {/* TWO COLUMNS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 0.95fr",
              gap: 22,
              flex: 1,
              minHeight: 0,
            }}
          >
            {/* LEFT COLUMN */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                minHeight: 0,
              }}
            >
              {/* Experience */}
              <div>
                <div style={sectionLabelStyle}>01</div>
                <div style={sectionTitleStyle}>Experience</div>

                {[
                  { dates: "2025 - Present", active: true, company: "LIV Las Vegas", role: "Creative Director \u00b7 2026 Campaign", desc: "Solo-built entire 2026 artist announcement campaign. 12 AI-generated renders, full flyer system, billboard creative, 41-frame storyboard. John Summit, Dom Dolla, Ti\u00ebsto, David Guetta." },
                  { dates: "2025", company: "Adaptive", role: "Creative Lead \u00b7 Brand Architect" },
                  { dates: "2025", company: "Alien Water", role: "Head of Creative \u00b7 Packaging \u00b7 Brand" },
                  { dates: "2020 - 2024", company: "Snapchat", role: "Creative Partner \u00b7 Brand & Product" },
                  { dates: "2019 - 2023", company: "Sprite \u00d7 UMG", role: "Design Director \u00b7 Integrated Campaign" },
                  { dates: "2020 - 2023", company: "MUD\\WTR", role: "Sr. Designer to Digital Design Director" },
                  { dates: "2023", company: "Livegrid", role: "Design Director \u00b7 Talent Booking Platform" },
                  { dates: "2019 - Present", company: "Therabody", role: "Digital Designer \u00b7 Athletic Optimization" },
                  { dates: "2019", company: "Grammy Awards", role: "UX Product Designer \u00b7 Music Rewards" },
                  { dates: "2018", company: "Stageverse", role: "Lead Product Designer \u00b7 VR Concerts" },
                  { dates: "2017", company: "Snapchat", role: "Jr. Designer \u00b7 Social App" },
                  { dates: "2016", company: "Ultra Records", role: "A&R Intern \u00b7 Record Label" },
                ].map((exp, i) => (
                  <div key={i} style={expRowStyle(i === 11)}>
                    <div>
                      <div style={expDatesStyle}>{exp.dates}</div>
                      {exp.active && (
                        <div style={expActiveStyle}>Active</div>
                      )}
                    </div>
                    <div>
                      <div style={expCompanyStyle}>{exp.company}</div>
                      <div style={expRoleStyle}>{exp.role}</div>
                      {exp.desc && <div style={expDescStyle}>{exp.desc}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Founded */}
              <div>
                <div style={sectionLabelStyle}>02</div>
                <div style={sectionTitleStyle}>Founded</div>

                {[
                  { dates: "2015 - Present", company: "Design With ROAM", role: "Founder & Design Director", desc: "Boutique creative agency. 10+ years, 50+ clients. Brand, UI/UX, campaign production. Founded at 21." },
                  { dates: "2025 - Present", active: true, company: "r0am.io", role: "Founder & Creative Director", desc: "AI startup validation platform. Designed in Figma, shipped with Claude Code, deployed on Vercel." },
                  { dates: "2025", company: "R33L", role: "Co-Founder \u00b7 Social-First Content Studio" },
                  { dates: "2021", company: "Wrkflw", role: "Co-Founder \u00b7 Wellness Habit SaaS" },
                  { dates: "2020", company: "Coral Co. Agency", role: "Co-Founder \u00b7 CPG Creative Agency" },
                  { dates: "2019 - 2020", company: "Coral Space", role: "Co-Founder & CEO \u00b7 Wellness Coworking" },
                ].map((exp, i) => (
                  <div key={i} style={expRowStyle(i === 5)}>
                    <div>
                      <div style={expDatesStyle}>{exp.dates}</div>
                      {exp.active && (
                        <div style={expActiveStyle}>Active</div>
                      )}
                    </div>
                    <div>
                      <div style={expCompanyStyle}>{exp.company}</div>
                      <div style={expRoleStyle}>{exp.role}</div>
                      {exp.desc && <div style={expDescStyle}>{exp.desc}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Toolkit */}
              <div>
                <div style={sectionLabelStyle}>03</div>
                <div style={sectionTitleStyle}>Toolkit</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                  <div>
                    <div style={capLabelStyle}>Design</div>
                    <div style={capItemsStyle}>
                      Figma &middot; Illustrator &middot; Photoshop
                      <br />
                      Framer &middot; Webflow &middot; Shopify
                    </div>
                    <div style={{ ...capLabelStyle, marginTop: 5 }}>AI / LLMs</div>
                    <div style={capItemsStyle}>
                      Claude &middot; ChatGPT
                      <br />
                      Claude Code &middot; Cursor
                    </div>
                    <div style={{ ...capLabelStyle, marginTop: 5 }}>Image Gen</div>
                    <div style={capItemsStyle}>
                      Midjourney &middot; Nano Banana
                      <br />
                      Seedream &middot; Adobe Firefly &middot; Higgsfield
                    </div>
                  </div>
                  <div>
                    <div style={capLabelStyle}>Video Gen</div>
                    <div style={capItemsStyle}>
                      VEO-3 &middot; Flux &middot; Midjourney &middot; Kling
                    </div>
                    <div style={{ ...capLabelStyle, marginTop: 5 }}>Motion &amp; Video</div>
                    <div style={capItemsStyle}>
                      CapCut &middot; Jitter
                      <br />
                      Premiere &middot; After Effects
                    </div>
                    <div style={{ ...capLabelStyle, marginTop: 5 }}>Development</div>
                    <div style={capItemsStyle}>
                      Next.js &middot; React Native &middot; SwiftUI
                      <br />
                      Supabase &middot; Vercel
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                minHeight: 0,
              }}
            >
              {/* Products */}
              <div>
                <div style={sectionLabelStyle}>04</div>
                <div style={sectionTitleStyle}>Products Built</div>

                {[
                  { name: "r0am.io", status: "Launching", statusClass: "build", desc: "AI startup validation. Real-time market intelligence.", stack: "Next.js \u00b7 Supabase \u00b7 Claude API \u00b7 Vercel" },
                  { name: "Mysa", status: "In Progress", statusClass: "build", desc: "Postpartum wellness app. Check-ins, community, journal.", stack: "React Native \u00b7 Expo \u00b7 Supabase \u00b7 NativeWind" },
                  { name: "Aura", status: "PRD Complete", statusClass: "", desc: "Apple TV generative ambient. Prompt \u2192 music + visuals.", stack: "tvOS \u00b7 SwiftUI \u00b7 MetalKit \u00b7 MusicGen" },
                  { name: "Scout", status: "PRD Complete", statusClass: "", desc: "iOS AI pre-shoot director. Environment scan + coaching.", stack: "SwiftUI \u00b7 ARKit \u00b7 Vision \u00b7 Claude API" },
                  { name: "Jarvis", status: "PRD Complete", statusClass: "", desc: "macOS workspace daemon. Double-clap, everything opens.", stack: "Python \u00b7 pyaudio \u00b7 launchd \u00b7 AppleScript" },
                  { name: "r33l.studio", status: "Active", statusClass: "live", desc: "AI-native content production studio.", stack: "AI Production Pipeline" },
                  { name: "Wrkflw", status: "Built", statusClass: "", desc: "Wellness habit building SaaS app.", stack: "Product Design \u00b7 Co-Founded 2021" },
                  { name: "Chronicle", status: "Concept", statusClass: "", desc: "Voice memos \u2192 designed, printed books via POD.", stack: "AI Semantic Interpretation \u00b7 Wispr Flow" },
                  { name: "Liminal Mind", status: "Concept", statusClass: "", desc: "Headless YouTube. AI-generated ambient philosophy.", stack: "Kling \u00b7 ElevenLabs \u00b7 Suno \u00b7 Midjourney" },
                ].map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "64px 1fr",
                      gap: 5,
                      padding: "2.5px 0",
                      borderBottom: i < 8 ? "0.5px solid #D8D8D8" : "none",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 8, letterSpacing: "-0.02em", textTransform: "uppercase", lineHeight: 1.1 }}>
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontSize: 5,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: p.statusClass === "live" ? "#1a8a1a" : p.statusClass === "build" ? "#8a8a1a" : "#6a6a6a",
                          marginTop: 1,
                        }}
                      >
                        {p.status}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 6, fontWeight: 400, color: "#888", lineHeight: 1.35 }}>
                        {p.desc}
                      </div>
                      <div style={{ fontSize: 5.5, fontWeight: 400, color: "#6a6a6a", marginTop: 1 }}>
                        {p.stack}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clients */}
              <div>
                <div style={sectionLabelStyle}>05</div>
                <div style={sectionTitleStyle}>Select Clients</div>
                <div style={{ fontSize: 6.5, fontWeight: 400, color: "#6a6a6a", lineHeight: 1.55 }}>
                  <strong style={clientBoldStyle}>Adaptive</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Agrippa</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Algo</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Alien Water</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>A&apos;muse</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Celia Health</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Chegg</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Compatible.LA</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Coral House</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Cowboy Colostrum</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Fun Guy</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Grammy Recording Academy</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Kintsugi</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>LIV Las Vegas</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Livegrid</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>MUD\WTR</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>OPLAE</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>SaunaBox</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Schwartz &amp; Schreiber</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Skylrk</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Snapchat</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Sprite &times; UMG</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Stageverse</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Superpower</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Supermassive</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Tabs</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>The Girls in 401</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>The90</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Therabody</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Ultra Records</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Unitea</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Universal Music Group</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Wheelz</strong> &middot;{" "}
                  <strong style={clientBoldStyle}>Wild Society Nutrition</strong>
                </div>
              </div>

              {/* Speaking */}
              <div>
                <div style={sectionLabelStyle}>06</div>
                <div style={sectionTitleStyle}>Speaking</div>
                <div style={{ fontSize: 6.5, fontWeight: 400, color: "#6a6a6a", lineHeight: 1.65 }}>
                  Future of Commerce with AR Summit / Speaker
                  <br />
                  MRAD Architecture Creative Summit / Speaker
                  <br />
                  Lightning in a Bottle 2026 / Confirmed
                </div>
              </div>

              {/* Education */}
              <div>
                <div style={sectionLabelStyle}>07</div>
                <div style={sectionTitleStyle}>Education</div>
                <div style={{ fontSize: 7, fontWeight: 400, color: "#6a6a6a", lineHeight: 1.5 }}>
                  <strong style={{ fontWeight: 800, color: "#0A0A0A", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                    UCLA
                  </strong>{" "}
                  / B.A. Psychology, Minor: Media &amp; Design, Music Industry. 2016.
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div
            style={{
              borderTop: "1px solid #D8D8D8",
              paddingTop: 6,
              marginTop: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 6.5,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Ryan Rosenthal / Creative Director &amp; Founder
            </div>
            <div style={{ fontSize: 6.5, fontWeight: 400, color: "#6a6a6a" }}>
              Los Angeles / April 2026
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Shared styles ────────────────────────────────────────────────

const sectionLabelStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 6.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#BBBBBF",
  marginBottom: 1,
};

const sectionTitleStyle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 12,
  letterSpacing: "-0.04em",
  textTransform: "uppercase",
  lineHeight: 0.95,
  marginBottom: 5,
};

const expRowStyle = (isLast: boolean): React.CSSProperties => ({
  display: "grid",
  gridTemplateColumns: "72px 1fr",
  gap: 6,
  padding: "3px 0",
  borderBottom: isLast ? "none" : "0.5px solid #D8D8D8",
});

const expDatesStyle: React.CSSProperties = {
  fontSize: 6.5,
  fontWeight: 500,
  color: "#6a6a6a",
  paddingTop: 1,
  letterSpacing: "0.01em",
};

const expActiveStyle: React.CSSProperties = {
  display: "inline-block",
  fontSize: 5,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#1a8a1a",
  border: "0.5px solid #1a8a1a",
  padding: "1px 4px",
  marginTop: 2,
};

const expCompanyStyle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 9.5,
  letterSpacing: "-0.03em",
  textTransform: "uppercase",
  lineHeight: 1,
};

const expRoleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: 6,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#6a6a6a",
  marginTop: 1,
};

const expDescStyle: React.CSSProperties = {
  fontSize: 6,
  fontWeight: 400,
  color: "#777",
  lineHeight: 1.35,
  marginTop: 1,
  maxWidth: 240,
};

const capLabelStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 6,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#6a6a6a",
  marginBottom: 2,
};

const capItemsStyle: React.CSSProperties = {
  fontSize: 6.5,
  fontWeight: 400,
  lineHeight: 1.6,
  color: "#0A0A0A",
};

const clientBoldStyle: React.CSSProperties = {
  fontWeight: 800,
  fontSize: 7,
  color: "#0A0A0A",
  textTransform: "uppercase",
  letterSpacing: "-0.01em",
};
