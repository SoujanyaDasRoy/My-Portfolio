"use client";

import { useState } from "react";
import s from "@/app/page.module.css";
import { LIMITS, fieldErrors, type FieldErrors } from "@/lib/contact";

type Status = { kind: "idle" | "sending" | "success" | "error"; text: string };

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "message", label: "Message" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const sending = status.kind === "sending";

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    const found = fieldErrors(values);
    setErrors(found);
    const firstWrong = Object.keys(found)[0];
    if (firstWrong) {
      setStatus({ kind: "idle", text: "" });
      (form.elements.namedItem(firstWrong) as HTMLElement).focus();
      return;
    }

    setStatus({ kind: "sending", text: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus({ kind: "error", text: data?.error ?? "Could not send. Please email me directly." });
        return;
      }
      form.reset();
      setStatus({ kind: "success", text: "Message sent. I'll get back to you soon." });
    } catch {
      setStatus({ kind: "error", text: "Network error. Please try again, or email me directly." });
    }
  }

  return (
    // noValidate: our own messages appear under each field instead of the browser's popup
    <form onSubmit={send} className={s.form} noValidate>
      {fields.map((field) => {
        const error = errors[field.name];
        const shared = {
          id: `contact-${field.name}`,
          name: field.name,
          required: true,
          maxLength: LIMITS[field.name].max,
          "aria-invalid": Boolean(error),
          "aria-describedby": error ? `contact-${field.name}-error` : undefined,
          // clear a field's message as soon as the visitor edits it
          onChange: () => error && setErrors((current) => ({ ...current, [field.name]: undefined })),
        };
        return (
          <div key={field.name} className={s.field}>
            <label htmlFor={shared.id}>{field.label}</label>
            {field.name === "message" ? <textarea rows={4} {...shared} /> : <input type={field.type} autoComplete={field.autoComplete} {...shared} />}
            {error && <p id={`contact-${field.name}-error`} className={s.fieldError}>{error}</p>}
          </div>
        );
      })}
      {/* honeypot: people never see it, bots fill it in */}
      <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />
      <button type="submit" disabled={sending}>{sending ? "Sending…" : "Send message"}</button>
      <p role="status" className={status.kind === "error" ? s.formError : s.formNote}>{status.text}</p>
    </form>
  );
}
