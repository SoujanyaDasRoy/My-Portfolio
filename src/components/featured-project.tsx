"use client";

import { motion, Variants } from "framer-motion";
import {
  ExternalLink,
  Github,
} from "lucide-react";

/* ─── animation ─── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─── component ─── */

export function FeaturedProject() {
  return (
    <section
      id="project"
      style={{
        padding: "92px 0",
        background: "var(--bg-alt)",
        transition: "background 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle radial background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% 120%, var(--green-dim) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--green)",
              marginBottom: 12,
              padding: "7px 14px",
              background: "var(--green-dim)",
              borderRadius: 8,
            }}
          >
            Featured Project
          </span>
          <h2
            style={{
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontSize: "3rem",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            VOID — E-Commerce Platform
          </h2>
        </motion.div>

        {/* two-column layout */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.25fr)",
            gap: 44,
            alignItems: "center",
          }}
          className="project-grid"
        >
          {/* left — meta */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                maxWidth: "34rem",
                margin: 0,
              }}
            >
              A fashion e-commerce website for a clothing brand, built from the ground up
              with a modern tech stack. Features product browsing, filtering,
              cart management, secure checkout via Stripe, and user authentication with Clerk.
            </p>

            {/* tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Next.js", "React", "Tailwind", "Node.js", "MongoDB", "Express", "Vercel", "Stripe", "Clerk"].map(
                (t) => (
                  <span
                    key={t}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border-custom)",
                      color: "var(--text)",
                      fontWeight: 500,
                      fontSize: "0.8125rem",
                      padding: "6px 12px",
                      borderRadius: 8,
                    }}
                  >
                    {t}
                  </span>
                )
              )}
            </div>

            {/* buttons */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 4 }}>
              <a
                href="https://void-lime-two.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--green)",
                  color: "#000",
                  fontWeight: 600,
                  fontSize: "1rem",
                  padding: "13px 24px",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  textDecoration: "none",
                }}
              >
                Visit Live Site <ExternalLink size={18} />
              </a>
              <a
                href="https://github.com/SoujanyaDasRoy/VOID"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--surface)",
                  color: "var(--text)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  padding: "13px 24px",
                  border: "1px solid var(--border-custom)",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  textDecoration: "none",
                }}
              >
                View Code <Github size={18} />
              </a>
            </div>
          </div>

          {/* right — browser mockup */}
          <div
            style={{
              width: "100%",
              maxWidth: 760,
              marginLeft: "auto",
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid var(--border-custom)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
              boxShadow: "var(--shadow-lg-custom)",
              transition: "all 0.3s ease",
            }}
          >
            {/* browser bar */}
            <div
              style={{
                height: 52,
                display: "flex",
                alignItems: "center",
                padding: "0 18px",
                gap: 16,
                background: "var(--surface)",
                borderBottom: "1px solid var(--border-custom)",
              }}
            >
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  padding: "8px 16px",
                  background: "var(--bg)",
                  borderRadius: 999,
                  maxWidth: 340,
                  margin: "0 auto",
                }}
              >
                void-lime-two.vercel.app
              </div>
            </div>
            {/* interactive iframe preview */}
            <iframe
              src="https://void-lime-two.vercel.app/"
              title="VOID E-Commerce Platform"
              style={{
                width: "100%",
                height: 500,
                border: "none",
                display: "block",
                background: "#000",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>

      {/* responsive override */}
      <style>{`
        @media (max-width: 768px) {
          .project-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
