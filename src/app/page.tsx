"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Menu,
  X,
} from "lucide-react";

import { SkillsShowcase } from "@/components/skills-showcase";
import { FeaturedProject } from "@/components/featured-project";
import { ContactSection } from "@/components/contact-section";
import { Separator } from "@/components/ui/separator";
import s from "./page.module.css";

/* ---- framer helpers ---- */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  /* smooth scroll helper + URL changer */
  const scrollTo = (id: string, path: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (path) {
      window.history.pushState(null, "", path);
    }
  };

  /* Auto-scroll on direct page loads for /contact, /about, etc */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setTimeout(() => {
        if (path === "/about") scrollTo("about", path);
        if (path === "/skills") scrollTo("skills", path);
        if (path === "/project") scrollTo("project", path);
        if (path === "/contact") scrollTo("contact", path);
      }, 300);
    }
  }, []);

  return (
    <>
      {/* ────────────────── NAVBAR ────────────────── */}
      <nav className={`${s.nav} ${scrolled ? s.navScrolled : ""}`}>
        <div className={s.navInner}>
          <a
            href="/"
            className={s.logo}
            onClick={(e) => {
               if (window.location.pathname !== '/') e.preventDefault();
               setMobileMenuOpen(false);
               scrollTo("top", "/");
               window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className={s.logoText}>soujanya</span>
          </a>

          <button
            className={s.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`${s.navLinks} ${mobileMenuOpen ? s.navLinksOpen : ""}`}>
            <a href="/about" className={s.navLink} onClick={(e) => { e.preventDefault(); scrollTo("about", "/about"); }}>About</a>
            <a href="/skills" className={s.navLink} onClick={(e) => { e.preventDefault(); scrollTo("skills", "/skills"); }}>Skills</a>
            <a href="/project" className={s.navLink} onClick={(e) => { e.preventDefault(); scrollTo("project", "/project"); }}>Project</a>
            <a href="/contact" className={s.navLink} onClick={(e) => { e.preventDefault(); scrollTo("contact", "/contact"); }}>Contact</a>

            <button onClick={toggleTheme} className={s.themeBtn} aria-label="Toggle theme" title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ────────────────── HERO ────────────────── */}
      <section className={s.hero} id="top">
        <div className={s.heroBackground} />
        <div className="container">
          <motion.div className={s.heroInner} variants={fadeUp} initial="hidden" animate="show">
            <div className={s.heroBadge}>
              <span className={s.statusDot} />
              <span>Available for work</span>
            </div>

            <p className={s.heroGreeting}>
              Hey there, I&apos;m <span className={s.heroName}>Soujanya Das Roy</span>
            </p>
            <h1 className={s.heroHeading}>I build things<br />for the web.</h1>
            <p className={s.heroDesc}>
              Full-Stack Developer who turns ideas into fast, clean, and
              user&#8209;focused applications using React, Next.js, and
              modern web technologies.
            </p>

            <div className={s.heroBtns}>
              <a href="/project" className={s.btnGreen} onClick={(e) => { e.preventDefault(); scrollTo("project", "/project"); }}>
                See My Work <ArrowRight size={18} />
              </a>
              <a href="/contact" className={s.btnInverse} onClick={(e) => { e.preventDefault(); scrollTo("contact", "/contact"); }}>
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────────────── ABOUT ────────────────── */}
      <section id="about" className={s.sectionAlt}>
        <div className="container">
          <motion.div className={s.sectionHeader} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className={s.label}>About</span>
            <h2 className={s.heading}>A bit about me</h2>
          </motion.div>

          <motion.div className={s.aboutContent} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className={s.aboutText}>
              <p>
                I am a passionate web developer focused on building modern, responsive, and clean
                user interfaces. I enjoy combining technical precision with minimal design to create
                fast and scalable web applications.
              </p>
              <p>
                I primarily work with React, Next.js, and Node.js, while also having experience
                with WordPress and Elementor for rapid website development. I continuously
                learn and adopt new tools to improve my workflow.
              </p>
              <p>
                I value simplicity, performance, and thoughtful user experience. I aim to write
                structured, maintainable code and design interfaces that are visually calm yet
                technically strong.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────────────── SKILLS ────────────────── */}
      <SkillsShowcase />

      {/* ────────────────── PROJECT ────────────────── */}
      <FeaturedProject />

      {/* ────────────────── CONTACT ────────────────── */}
      <ContactSection />

      {/* ────────────────── FOOTER ────────────────── */}
      <footer className={s.footer}>
        <div className="container">
          <div className={s.footerInner}>
            <div className={s.footerBrand}>
              <span className={s.footerLogo}>soujanya</span>
              <p className={s.footerTagline}>Full-Stack Developer crafting clean, performant, and user-focused web applications. Let&apos;s build something great together.</p>
            </div>

            <div className={s.footerContent}>
              <div className={s.footerSection}>
                <h4 className={s.footerTitle}>Quick Links</h4>
                <div className={s.footerLinks}>
                  <a href="/about" onClick={(e) => { e.preventDefault(); scrollTo("about", "/about"); }}>About</a>
                  <a href="/skills" onClick={(e) => { e.preventDefault(); scrollTo("skills", "/skills"); }}>Skills</a>
                  <a href="/project" onClick={(e) => { e.preventDefault(); scrollTo("project", "/project"); }}>Project</a>
                  <a href="/contact" onClick={(e) => { e.preventDefault(); scrollTo("contact", "/contact"); }}>Contact</a>
                </div>
              </div>

              <div className={s.footerSection}>
                <h4 className={s.footerTitle}>Connect</h4>
                <div className={s.footerSocial}>
                  <a href="https://github.com/SoujanyaDasRoy" target="_blank" rel="noopener noreferrer" title="GitHub">
                    <Github size={18} />
                  </a>
                  <a href="https://linkedin.com/in/soujanyadasroy" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                  <a href="mailto:soujanyadasroy@gmail.com" title="Email">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Separator className={s.footerSep} />

          <div className={s.footerBottom}>
            <span>&copy; {new Date().getFullYear()} Soujanya Das Roy. All rights reserved.</span>
            <span className={s.footerCredit}>Built with Next.js &amp; TailwindCSS</span>
          </div>
        </div>
      </footer>
    </>
  );
}
