/* Shared contact-form rules. No imports, so the browser, the API route and the tests can all use it. */

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
};

export type Contact = { name: string; email: string; message: string };

type Result = { ok: true; data: Contact; isBot: boolean } | { ok: false; error: string };

const EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

const read = (body: unknown, key: string) => {
  const value = body && typeof body === "object" ? (body as Record<string, unknown>)[key] : undefined;
  return typeof value === "string" ? value.trim() : "";
};

// The name goes into the mail's From header, so drop line breaks, quotes and angle brackets.
const readName = (body: unknown) => read(body, "name").replace(/[\r\n"<>]+/g, " ").trim();

export type FieldErrors = Partial<Record<keyof Contact, string>>;

/** One message per wrong field. An empty object means the input is valid. */
export function fieldErrors(body: unknown): FieldErrors {
  const name = readName(body);
  const email = read(body, "email");
  const message = read(body, "message");
  const errors: FieldErrors = {};

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) {
    errors.name = `Name must be ${LIMITS.name.min} to ${LIMITS.name.max} characters.`;
  }
  if (!email) errors.email = "Please enter your email.";
  else if (email.length > LIMITS.email.max || !EMAIL.test(email)) errors.email = "Enter an email like name@example.com.";
  if (!message) errors.message = "Please write a message.";
  else if (message.length < LIMITS.message.min || message.length > LIMITS.message.max) {
    errors.message = `Message must be ${LIMITS.message.min} to ${LIMITS.message.max} characters.`;
  }
  return errors;
}

export function parseContact(body: unknown): Result {
  const error = Object.values(fieldErrors(body))[0];
  if (error) return { ok: false, error };

  const data = { name: readName(body), email: read(body, "email"), message: read(body, "message") };
  return { ok: true, data, isBot: Boolean(read(body, "website")) };
}

const ENTITIES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => ENTITIES[c]);
