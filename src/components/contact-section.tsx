"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  ArrowRight,
} from "lucide-react";

/* ─── animation ─── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─── component ─── */

export function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("Something went wrong. Please try again.");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("Something went wrong. Please try again.");
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message) { 
      setErrorMessage("Please fill out all fields.");
      setFormState("error"); 
      return; 
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { 
      setErrorMessage("Please enter a valid email address.");
      setFormState("error"); 
      return; 
    }

    const website = (form.elements.namedItem("website") as HTMLInputElement)?.value ?? "";

    setFormState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      
      const data = await res.json().catch(() => null);

      if (res.ok) { 
        setFormState("success"); 
        form.reset(); 
      } else { 
        setErrorMessage(data?.error || "Failed to send message. Please try again.");
        setFormState("error"); 
      }
    } catch {
      setErrorMessage("Network error. Please try again later.");
      setFormState("error");
    }
  };

  return (
    <section
      id="contact"
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
            Contact
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
            Get in touch
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
              maxWidth: 500,
              margin: "12px auto 0",
              lineHeight: 1.7,
            }}
          >
            Have a project in mind? Let&apos;s create something amazing together.
          </p>
        </motion.div>

        {/* grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "380px 1fr",
            gap: 36,
            maxWidth: 1100,
            margin: "0 auto",
          }}
          className="contact-grid"
        >
          {/* left — cards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* Email card */}
            <ContactCard
              icon={<Mail size={24} />}
              title="Email"
              desc="Drop me an email anytime"
              link="mailto:soujanyadasroy@gmail.com"
              linkText="soujanyadasroy@gmail.com"
            />

            {/* Phone card */}
            <ContactCard
              icon={<Phone size={24} />}
              title="Phone"
              desc="Mon-Fri from 9am to 6pm"
              link="tel:+919477011055"
              linkText="+91 9477011055"
            />

            {/* Social */}
            <div
              style={{
                padding: 24,
                background: "var(--surface)",
                border: "1px solid var(--border-custom)",
                borderRadius: 20,
              }}
            >
              <h4
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 16,
                }}
              >
                Follow me
              </h4>
              <div style={{ display: "flex", gap: 14 }}>
                <SocialIcon href="https://github.com/SoujanyaDasRoy" label="GitHub">
                  <Github size={22} />
                </SocialIcon>
                <SocialIcon href="https://linkedin.com/in/soujanyadasroy" label="LinkedIn">
                  <Linkedin size={22} />
                </SocialIcon>
                <SocialIcon href="mailto:soujanyadasroy@gmail.com" label="Email">
                  <Mail size={22} />
                </SocialIcon>
              </div>
            </div>
          </motion.div>

          {/* right — form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-custom)",
                borderRadius: 28,
                padding: 34,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: 8,
                    }}
                  >
                    Send a message
                  </h3>
                  <p style={{ fontSize: "1.02rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    Fill out the form below and I&apos;ll get back to you soon.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {/* Honeypot field - visually hidden to catch bots */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <FormField label="Full Name" id="name" type="text" placeholder="John Doe" />
                  <FormField label="Email Address" id="email" type="email" placeholder="john@example.com" />

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <label
                      htmlFor="message"
                      style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Tell me about your project..."
                      style={{
                        background: "var(--bg)",
                        border: "1px solid var(--border-custom)",
                        borderRadius: 16,
                        color: "var(--text)",
                        fontFamily: "inherit",
                        padding: "16px 18px",
                        fontSize: "1rem",
                        transition: "all 0.2s ease",
                        width: "100%",
                        resize: "vertical",
                        minHeight: 148,
                        outline: "none",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--green)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px var(--green-dim)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-custom)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    width: "100%",
                    background: "var(--green)",
                    color: "#000",
                    fontWeight: 600,
                    fontSize: "1.0625rem",
                    minHeight: 56,
                    padding: "16px 28px",
                    borderRadius: 16,
                    border: "none",
                    cursor: formState === "sending" ? "not-allowed" : "pointer",
                    transition: "all 0.25s ease",
                    opacity: formState === "sending" ? 0.7 : 1,
                  }}
                >
                  {formState === "sending" ? (
                    <>
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          border: "2px solid transparent",
                          borderTopColor: "currentColor",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {/* status */}
                <div style={{ textAlign: "center" }}>
                  {formState === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--green)",
                        padding: 16,
                        background: "var(--green-dim)",
                        borderRadius: 12,
                      }}
                    >
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "var(--green)",
                          color: "#000",
                          borderRadius: "50%",
                          fontSize: "0.875rem",
                        }}
                      >
                        ✓
                      </span>
                      Message sent successfully! I&apos;ll get back to you soon.
                    </motion.p>
                  )}
                  {formState === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#ef4444",
                        padding: 16,
                        background: "rgba(239,68,68,0.1)",
                        borderRadius: 12,
                      }}
                    >
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#ef4444",
                          color: "#fff",
                          borderRadius: "50%",
                          fontSize: "0.875rem",
                        }}
                      >
                        !
                      </span>
                      {errorMessage}
                    </motion.p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* responsive override */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── sub-components ─── */

function ContactCard({
  icon,
  title,
  desc,
  link,
  linkText,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  link: string;
  linkText: string;
}) {
  return (
    <div
      style={{
        padding: 24,
        background: "var(--surface)",
        border: "1px solid var(--border-custom)",
        borderRadius: 20,
        transition: "all 0.25s ease",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
        <div
          style={{
            width: 52,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--green-dim)",
            color: "var(--green)",
            borderRadius: 14,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "var(--text)",
              marginBottom: 4,
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{desc}</p>
        </div>
      </div>
      <a
        href={link}
        style={{
          fontSize: "1rem",
          fontWeight: 500,
          color: "var(--text)",
          paddingLeft: 68,
          transition: "color 0.2s ease",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--green)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
      >
        {linkText}
      </a>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      style={{
        width: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        border: "1px solid var(--border-custom)",
        borderRadius: 12,
        color: "var(--text-secondary)",
        transition: "all 0.25s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "var(--green)";
        el.style.borderColor = "var(--green)";
        el.style.background = "var(--green-dim)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "var(--text-secondary)";
        el.style.borderColor = "var(--border-custom)";
        el.style.background = "var(--bg)";
        el.style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}

function FormField({
  label,
  id,
  type,
  placeholder,
}: {
  label: string;
  id: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <label htmlFor={id} style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        placeholder={placeholder}
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border-custom)",
          borderRadius: 16,
          color: "var(--text)",
          fontFamily: "inherit",
          minHeight: 54,
          padding: "16px 18px",
          fontSize: "1rem",
          transition: "all 0.2s ease",
          width: "100%",
          outline: "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--green)";
          e.currentTarget.style.boxShadow = "0 0 0 3px var(--green-dim)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border-custom)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}
