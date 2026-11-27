// Run: node --test src/lib/contact.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { LIMITS, escapeHtml, fieldErrors, parseContact } from "./contact.ts";

const good = { name: "Ada", email: "ada@example.com", message: "Hello there, nice site." };

test("accepts a normal message", () => {
  const r = parseContact(good);
  assert.equal(r.ok, true);
  assert.equal(r.isBot, false);
});

test("rejects missing, wrong-typed and oversized input", () => {
  for (const body of [null, "x", {}, { ...good, name: 42 }, { ...good, email: "nope" },
    { ...good, message: "short" }, { ...good, message: "a".repeat(LIMITS.message.max + 1) },
    { ...good, name: "a".repeat(LIMITS.name.max + 1) }]) {
    assert.equal(parseContact(body).ok, false, JSON.stringify(body)?.slice(0, 60));
  }
});

test("flags the honeypot", () => assert.equal(parseContact({ ...good, website: "spam" }).isBot, true));

test("keeps header characters out of the name", () => {
  const r = parseContact({ ...good, name: 'Eve"\r\nBcc: <x@y.z>' });
  assert.equal(/[\r\n"<>]/.test(r.data.name), false);
});

test("escapes HTML for the email body", () => {
  assert.equal(escapeHtml(`<img src=x onerror="a('&')">`), "&lt;img src=x onerror=&quot;a(&#39;&amp;&#39;)&quot;&gt;");
});

test("names each wrong field, including spaces-only input", () => {
  assert.deepEqual(Object.keys(fieldErrors({ name: "  ", email: "a@b", message: "          " })), ["name", "email", "message"]);
  assert.deepEqual(fieldErrors(good), {});
  assert.deepEqual(Object.keys(fieldErrors({ ...good, email: "nope" })), ["email"]);
});
