"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  Terminal,
  Monitor,
  Database,
  Wrench,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";
import s from "./page.module.css";

/* ---- animation helpers ---- */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* apply theme to document root */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  /* form submit */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setFormState("success");
        form.reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav className={`${s.nav} ${scrolled ? s.navScrolled : ""}`}>
        <div className={s.navInner}>
          <a href="#" className={s.logo}>
            <Terminal size={20} className={s.logoIcon} />
            <span>soujanya</span>
          </a>
          <div className={s.navLinks}>
            <a href="#about" className={s.navLink}>About</a>
            <a href="#skills" className={s.navLink}>Skills</a>
            <a href="#project" className={s.navLink}>Project</a>
            <a href="#contact" className={s.navLink}>Contact</a>
            <button onClick={toggleTheme} className={s.themeBtn} aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className={s.hero}>
        <div className="container">
          <motion.div className={s.heroInner} variants={fadeUp} initial="hidden" animate="show">
            <p className={s.heroGreeting}>
              Hey there, I&apos;m <span className={s.heroName}>Soujanya Das Roy</span>
            </p>
            <h1 className={s.heroHeading}>I build things for the web.</h1>
            <p className={s.heroDesc}>
              Full-Stack Developer who turns ideas into fast, clean, and user&#8209;focused applications using
              React, Next.js, and modern AI&#8209;assisted workflows.
            </p>
            <div className={s.heroBtns}>
              <a href="#project" className={s.btnFill}>
                See My Work <ArrowRight size={18} />
              </a>
              <a href="#contact" className={s.btnInverse}>
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT (alt bg) ─── */}
      <section id="about" className={s.sectionAlt}>
        <div className="container">
          <span className={s.sectionLabel}>About</span>
          <h2 className={s.sectionTitle}>A bit about me</h2>

          <div className={s.aboutGrid}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className={s.aboutText}>
                I am a passionate web developer focused on building modern, responsive, and clean
                user interfaces. I enjoy combining technical precision with minimal design to create
                fast and scalable web applications.
              </p>
              <br />
              <p className={s.aboutText}>
                I primarily work with React, Next.js, and Node.js, while also having experience
                with WordPress and Elementor for rapid website development. I leverage modern
                AI&#8209;assisted tools to accelerate my development workflow.
              </p>
              <br />
              <p className={s.aboutText}>
                I value simplicity, performance, and thoughtful user experience. I aim to write
                structured, maintainable code and design interfaces that are visually calm yet
                technically strong.
              </p>
            </motion.div>

            <motion.div
              className={s.aboutCard}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h3 className={s.aboutCardTitle}>Quick Info</h3>
              <div className={s.quickInfo}>
                <div className={s.quickItem}>
                  <MapPin size={18} className={s.quickIcon} />
                  <div>
                    <span className={s.quickLabel}>Location</span>
                    <span className={s.quickValue}>India</span>
                  </div>
                </div>
                <div className={s.quickItem}>
                  <Briefcase size={18} className={s.quickIcon} />
                  <div>
                    <span className={s.quickLabel}>Available for</span>
                    <span className={s.quickValue}>Freelance & Full-time</span>
                  </div>
                </div>
                <div className={s.quickItem}>
                  <Monitor size={18} className={s.quickIcon} />
                  <div>
                    <span className={s.quickLabel}>Preferred Stack</span>
                    <span className={s.quickValue}>Next.js, React, Node</span>
                  </div>
                </div>
                <div className={s.quickItem}>
                  <Mail size={18} className={s.quickIcon} />
                  <div>
                    <span className={s.quickLabel}>Email</span>
                    <span className={s.quickValue}>soujanyadasroy@gmail.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SKILLS (default bg) ─── */}
      <section id="skills" className={s.sectionDefault}>
        <div className="container">
          <span className={s.sectionLabel}>Skills</span>
          <h2 className={s.sectionTitle}>Technologies I work with</h2>

          <div className={s.skillsGrid}>
            {[
              {
                icon: <Monitor size={24} />,
                title: "Frontend",
                items: ["React & Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
              },
              {
                icon: <Database size={24} />,
                title: "Backend",
                items: ["Node.js & Express", "PostgreSQL / MongoDB", "REST APIs", "Serverless Functions"],
              },
              {
                icon: <Wrench size={24} />,
                title: "Tools",
                items: ["Git & GitHub", "Docker", "Vercel / AWS", "AI Coding Agents"],
              },
            ].map((skill) => (
              <motion.div
                key={skill.title}
                className={s.skillCard}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div className={s.skillHead}>
                  <span className={s.skillIconWrap}>{skill.icon}</span>
                  <h3 className={s.skillName}>{skill.title}</h3>
                </div>
                <div className={s.skillItems}>
                  {skill.items.map((i) => (
                    <span key={i} className={s.skillItem}>{i}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECT (alt bg) ─── */}
      <section id="project" className={s.sectionAlt}>
        <div className="container">
          <span className={s.sectionLabel}>Featured Project</span>
          <h2 className={s.sectionTitle}>VOID — E-Commerce Platform</h2>

          <div className={s.projectLayout}>
            <motion.div
              className={s.projectMeta}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <p className={s.projectDesc}>
                A full&#8209;stack e&#8209;commerce clothing brand platform built for modern fashion retail.
                Features a seamless checkout flow, scalable product catalog, and a meticulously crafted
                minimalist interface focused on high conversion rates.
              </p>
              <div className={s.tags}>
                {["Next.js", "React", "TailwindCSS", "Node.js"].map((t) => (
                  <span key={t} className={s.tag}>{t}</span>
                ))}
              </div>
              <a
                href="https://void-lime-two.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={s.btnFill}
              >
                Visit Live Site <ArrowRight size={18} />
              </a>
            </motion.div>

            <motion.div
              className={s.browser}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className={s.browserBar}>
                <span className={s.dot} style={{ background: "#ff5f56" }} />
                <span className={s.dot} style={{ background: "#ffbd2e" }} />
                <span className={s.dot} style={{ background: "#27c93f" }} />
              </div>
              <div className={s.browserBody}>
                <iframe
                  src="https://void-lime-two.vercel.app/"
                  title="VOID E-Commerce Preview"
                  loading="lazy"
                  style={{ pointerEvents: "none" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT (default bg) ─── */}
      <section id="contact" className={s.sectionDefault}>
        <div className="container">
          <div className={s.contactCenter}>
            <div className={s.contactCard}>
              <span className={s.sectionLabel}>Contact</span>
              <h2 className={s.sectionTitle} style={{ marginBottom: 16 }}>
                Let&apos;s talk
              </h2>
              <p className={s.aboutText} style={{ marginBottom: 28 }}>
                Available for freelance work and interesting collaborations.
              </p>

              <div className={s.contactInfo}>
                <a href="mailto:soujanyadasroy@gmail.com" className={s.contactLink}>
                  <Mail size={16} /> soujanyadasroy@gmail.com
                </a>
                <a href="tel:+919477011055" className={s.contactLink}>
                  <Phone size={16} /> +91 9477011055
                </a>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={s.formGroup}>
                  <label className={s.formLabel}>Name</label>
                  <input name="name" type="text" required className={s.formInput} placeholder="Your name" />
                </div>
                <div className={s.formGroup}>
                  <label className={s.formLabel}>Email</label>
                  <input name="email" type="email" required className={s.formInput} placeholder="you@email.com" />
                </div>
                <div className={s.formGroup}>
                  <label className={s.formLabel}>Message</label>
                  <textarea name="message" rows={5} required className={s.formInput} placeholder="What can I help with?" />
                </div>
                <button type="submit" className={s.submitBtn} disabled={formState === "sending"}>
                  {formState === "sending" ? "Sending…" : "Send Message"}
                </button>
                {formState === "success" && (
                  <p className={`${s.formMsg} ${s.formSuccess}`}>Message sent successfully!</p>
                )}
                {formState === "error" && (
                  <p className={`${s.formMsg} ${s.formError}`}>Something went wrong. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={s.footer}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span className={s.footerText}>© {new Date().getFullYear()} Soujanya Das Roy</span>
          <div className={s.footerLinks}>
            <a href="https://github.com/SoujanyaDasRoy" target="_blank" rel="noopener noreferrer" className={s.footerLink}>
              GitHub
            </a>
            <a href="https://linkedin.com/in/soujanyadasroy" target="_blank" rel="noopener noreferrer" className={s.footerLink}>
              LinkedIn
            </a>
            <a href="mailto:soujanyadasroy@gmail.com" className={s.footerLink}>
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
