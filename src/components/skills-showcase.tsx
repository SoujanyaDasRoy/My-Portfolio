"use client";

import { motion, Variants } from "framer-motion";
import {
  Braces,
  Code2,
  Database,
  Box,
  Figma,
  Flame,
  GitBranch,
  Palette,
  Rocket,
  ServerCog,
  Sparkles,
  Workflow,
  Blocks,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/* ─── data (no categories — flat list, only things you actually know) ─── */

type Skill = { name: string; icon: LucideIcon };

const skills: Skill[] = [
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Rocket },
  { name: "TypeScript", icon: Braces },
  { name: "Tailwind CSS", icon: Palette },
  { name: "Framer Motion", icon: Sparkles },
  { name: "Figma → Code", icon: Figma },
  { name: "Node.js", icon: Flame },
  { name: "Express", icon: ServerCog },
  { name: "MongoDB", icon: Box },
  { name: "PostgreSQL", icon: Database },
  { name: "REST APIs", icon: Workflow },
  { name: "GraphQL", icon: Blocks },
  { name: "Authentication", icon: ShieldCheck },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: Code2 },
  { name: "Vercel", icon: Rocket },
];

/* ─── animation ─── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const chip: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

/* ─── component ─── */

export function SkillsShowcase() {
  return (
    <section
      id="skills"
      style={{ padding: "92px 0", background: "var(--bg)", transition: "background 0.3s ease" }}
    >
      <div className="container">
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
            Skills
          </span>
          <h2
            style={{
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontSize: "3rem",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 8,
            }}
          >
            Technologies I Work With
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Tools I use daily to build fast, reliable, and polished web applications.
          </p>
        </motion.div>

        {/* glassmorphism chips — flat, no categories */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                variants={chip}
                whileHover={{ y: -2 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 38,
                  fontSize: "0.86rem",
                  color: "var(--text)",
                  padding: "8px 14px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.035))",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 999,
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 24px rgba(0,0,0,0.16)",
                  cursor: "default",
                  transition:
                    "transform 0.25s ease, border-color 0.25s ease, background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(34,238,110,0.28)";
                  el.style.background =
                    "linear-gradient(180deg, rgba(34,238,110,0.14), rgba(255,255,255,0.05))";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.14)";
                  el.style.background =
                    "linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.035))";
                }}
              >
                <Icon size={16} style={{ opacity: 0.7 }} />
                {skill.name}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
