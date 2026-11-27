"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Moon, Sun } from "lucide-react";
import s from "@/app/page.module.css";

// Three links fit in one pill even on a 320px phone, so there is no menu to open.
const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function toggleTheme() {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = dark ? "light" : "dark";
  root.dataset.theme = next;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", next === "dark" ? "#15110e" : "#f5f2ec"));
  try {
    localStorage.setItem("theme", next);
  } catch {
    // storage can be blocked; the theme still changes for this visit
  }
}

export function SiteNav() {
  const [current, setCurrent] = useState("");
  const reduce = useReducedMotion();

  // Mark the section crossing the middle of the window.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent("#" + e.target.id)),
      { rootMargin: "-45% 0px -54% 0px" },
    );
    ["#top", ...links.map((l) => l.href)].forEach((id) => {
      const section = document.querySelector(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={s.navBar}>
      <a href="#top" className={s.brand} aria-label="Soujanya Das Roy, back to top">sdr<span>.</span></a>
      <nav className={s.nav} aria-label="Main">
        {links.map((l) => (
          <a key={l.href} href={l.href} aria-current={current === l.href ? "location" : undefined}>
            {current === l.href && (
              <motion.span layoutId="nav-pill" className={s.navPill} aria-hidden="true" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} />
            )}
            {l.label}
          </a>
        ))}
      </nav>
      <div className={s.social}>
        <a href="https://github.com/SoujanyaDasRoy" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} aria-hidden="true" /></a>
        <a href="https://linkedin.com/in/soujanyadasroy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} aria-hidden="true" /></a>
        <button type="button" data-theme-toggle className={s.themeToggle} onClick={toggleTheme} aria-label="Switch between light and dark" title="Switch between light and dark">
          <Moon size={18} className={s.moon} aria-hidden="true" />
          <Sun size={18} className={s.sun} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
