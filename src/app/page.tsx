import Image from "next/image";
import { FileText, Github, Linkedin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Drift, MotionProvider, Reveal } from "@/components/motion";
import { SiteNav } from "@/components/site-nav";
import { ToolStrip } from "@/components/tool-strip";
import s from "./page.module.css";

const GITHUB = "https://github.com/SoujanyaDasRoy";
const LINKEDIN = "https://linkedin.com/in/soujanyadasroy";
const EMAIL = "soujanyadasroy@gmail.com";
const RESUME = "/Soujanya-Das-Roy-Resume.pdf";

// [label, icon file in /public/tech]. Icons: skillicons.dev (MIT); shadcn and framer marks from Simple Icons (CC0).
const heroStack = [
  ["React", "react"], ["Next.js", "nextjs"], ["TypeScript", "ts"], ["Tailwind CSS", "tailwind"],
  ["Material UI", "materialui"], ["shadcn/ui", "shadcn"], ["Framer Motion", "framer"], ["Node.js", "nodejs"], ["Express", "express"], ["MongoDB", "mongodb"],
  ["PostgreSQL", "postgres"], ["Prisma", "prisma"], ["Git", "git"],
  ["Cloudflare", "cloudflare"], ["Vercel", "vercel"], ["Netlify", "netlify"],
];

type Project = {
  name: string;
  slug: "void" | "tracknit" | "nexaric";
  kind: string;
  summary: string;
  builtWith: string;
  live: string;
  /** What you did and one problem you solved. Shown only once written; never filled in with guesses. */
  role?: string;
};

const projects: Project[] = [
  { name: "VOID", slug: "void", kind: "E-commerce", summary: "A minimal clothing store with collection filtering, product pages and a cart.", builtWith: "Next.js, React, TypeScript, Tailwind CSS", live: "https://void-lime-two.vercel.app/" },
  { name: "Tracknit", slug: "tracknit", kind: "Music licensing", summary: "A subscription platform for royalty-free music and sound effects.", builtWith: "Next.js, Framer Motion, GSAP, Zustand", live: "https://tracknit.vercel.app/" },
  { name: "NeXaric", slug: "nexaric", kind: "Studio website", summary: "A website for a web design and growth studio.", builtWith: "Next.js, Three.js, GSAP, Tailwind CSS", live: "https://nexaric.vercel.app/" },
];

const skills = [
  ["Languages", "JavaScript, TypeScript, SQL"],
  ["Frontend", "React, Next.js, Tailwind CSS, shadcn/ui, Material UI, Responsive Web Design"],
  ["Animation", "GSAP, Framer Motion"],
  ["Backend and APIs", "Node.js, Express, REST APIs, API Integration, CRUD Operations"],
  ["Database and ORM", "PostgreSQL, MongoDB, Prisma"],
  ["Deployment and tools", "Vercel, Netlify, Cloudflare Workers, Git, GitHub, npm, VS Code, Postman"],
];

/** "When I'm not coding". The section appears once real entries are added here. */
const offHours: { title: string; text: string }[] = [];

export default function Page() {
  return (
    <MotionProvider>
      <a href="#main" className={s.skip}>Skip to content</a>
      <SiteNav />

      <main id="main" tabIndex={-1}>
        <header id="top" className={`${s.wrap} ${s.hero}`}>
          <div className={s.heroGrid}>
            <div>
              <p className={`${s.hand} ${s.rise}`}>Hi, I&apos;m Soujanya</p>
              <h1 className={s.rise}>Websites that feel calm and work well.</h1>
              <p className={`${s.intro} ${s.rise}`}>A full stack developer, open to full{"‑"}time, remote and freelance work.</p>
              <div className={`${s.actions} ${s.rise}`}>
                <a href="#work" className={s.primary}>View work</a>
                <a href="#contact" className={s.secondary}>Contact</a>
                <a href={RESUME} target="_blank" rel="noopener" className={s.secondary}><FileText size={17} aria-hidden="true" />Résumé</a>
              </div>
            </div>
            <div className={s.portrait}>
              <Image src="/portrait.jpg" alt="Soujanya Das Roy sitting outdoors, looking at a phone" width={1128} height={1410} quality={90} sizes="(max-width: 760px) 80vw, 340px" preload />
            </div>
          </div>
          <ToolStrip tools={heroStack} />
        </header>

        <section id="work" className={`${s.wrap} ${s.section}`} aria-labelledby="work-title">
          <Reveal><h2 id="work-title" className={s.title}>Selected work</h2></Reveal>
          <div className={s.projects}>
            {projects.map((p, i) => (
              <article key={p.slug} className={s.project}>
                <Reveal delay={i === 2 ? 0.12 : 0}>
                {/* the tile takes the project's own colours; its screens are real captures */}
                <div className={`${s.tile} ${s[p.slug]}`}>
                  <div className={s.tileHead}>
                    <h3>{p.name}</h3>
                    <span>{p.kind}</span>
                  </div>
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className={s.visit} aria-label={`Visit ${p.name}`}>Visit site</a>
                  <Drift className={s.drift}>
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className={s.screens} tabIndex={-1} aria-hidden="true">
                    <span className={s.desktop}>
                      <Image src={`/projects/${p.slug}.jpg`} alt="" width={1920} height={1200} sizes="(max-width: 900px) 80vw, 720px" />
                    </span>
                    <span className={s.phone}>
                      <Image src={`/projects/${p.slug}-phone.jpg`} alt="" width={480} height={960} sizes="(max-width: 900px) 32vw, 230px" />
                    </span>
                  </a>
                  </Drift>
                </div>
                <div className={s.projectInfo}>
                  <p className={s.summary}>{p.summary}</p>
                  {p.role && <p className={s.summary}>{p.role}</p>}
                  <p className={s.builtWith}>
                    Built with {p.builtWith}. <a href={`${GITHUB}/${p.name}`} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} source code`}>Source</a>
                  </p>
                </div>
                </Reveal>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className={`${s.wrap} ${s.section}`} aria-labelledby="about-title">
          <Reveal>
            <h2 id="about-title" className={s.label}>About</h2>
            <p className={s.statement}>I build modern, responsive interfaces that look calm and hold up technically.</p>
          </Reveal>
          <Reveal className={s.aboutGrid} delay={0.1}>
            <p className={s.body}>I mostly work with React, Next.js and Node.js, and have used WordPress and Elementor for rapid builds. I value simplicity, performance and maintainable code.</p>
            <dl className={s.skills}>
              {skills.map(([group, list]) => (
                <div key={group}>
                  <dt>{group}</dt>
                  <dd>{list}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {offHours.length > 0 && (
          <section className={`${s.wrap} ${s.section}`} aria-labelledby="off-title">
            <h2 id="off-title" className={s.title}>When I&apos;m not coding</h2>
            <ul className={s.offHours}>
              {offHours.map((item) => (
                <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>
              ))}
            </ul>
          </section>
        )}

        <section id="contact" className={s.contact} aria-labelledby="contact-title">
          <div className={s.wrap}>
            <Reveal>
              <h2 id="contact-title" className={s.contactTitle}>Have a role or a project in mind?</h2>
              <a href={`mailto:${EMAIL}`} className={s.email}>{EMAIL}</a>
            </Reveal>
            <div className={s.contactGrid}>
              <div>
                <p>Write to me directly, or use the form.</p>
                <p className={s.elsewhere}>
                  <a href={GITHUB} target="_blank" rel="noopener noreferrer"><Github size={18} aria-hidden="true" />GitHub</a>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"><Linkedin size={18} aria-hidden="true" />LinkedIn</a>
                  <a href={RESUME} target="_blank" rel="noopener"><FileText size={18} aria-hidden="true" />Résumé (PDF)</a>
                </p>
              </div>
              <ContactForm />
            </div>
            <footer className={s.footer}>
              <span>© {new Date().getFullYear()} Soujanya Das Roy</span>
              <a href="#top">Back to top</a>
            </footer>
          </div>
        </section>
      </main>
    </MotionProvider>
  );
}
