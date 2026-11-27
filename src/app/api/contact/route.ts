import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { escapeHtml, parseContact } from "@/lib/contact";

const UNAVAILABLE = "Could not send right now. Please email me directly.";

/* ─── simple in-memory rate limiter with cleanup ─── */
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 submissions per minute per IP
const CLEANUP_INTERVAL = 5 * 60 * 1000; // cleanup every 5 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Cleanup old entries periodically to prevent memory leak
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap.entries()) {
      if (now - entry.timestamp > RATE_LIMIT_WINDOW * 2) {
        rateLimitMap.delete(ip);
      }
    }
  }, CLEANUP_INTERVAL);
}

export async function POST(req: NextRequest) {
  try {
    /* ── rate limiting ── */
    const ipRaw = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const ip = ipRaw || "unknown";
    
    // Only apply rate limiting if we have a real IP (bypasses dev 'unknown')
    if (ip !== "unknown" && ip !== "127.0.0.1" && ip !== "::1") {
      if (isRateLimited(ip)) {
        return NextResponse.json(
          { error: "Too many requests. Please try again in a minute." },
          { status: 429 }
        );
      }
    }

    const parsed = parseContact(await req.json().catch(() => null));
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    /* ── honeypot check (bots fill hidden fields) ── */
    if (parsed.isBot) {
      // Silently succeed — don't tip off the bot
      return NextResponse.json({ success: true, message: "Message received!" }, { status: 200 });
    }

    const { name, email, message } = parsed.data;

    /* ── send email via Nodemailer ── */
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Contact form: GMAIL_USER or GMAIL_APP_PASSWORD is not set.");
      return NextResponse.json({ error: UNAVAILABLE }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name} (Portfolio)" <${process.env.GMAIL_USER}>`, 
      replyTo: email,
      to: process.env.GMAIL_USER,
      subject: `Portfolio Contact — ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;">
          <h2 style="color: #059669; font-size: 20px; margin-bottom: 4px;">New Contact Form Message</h2>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
          <p style="margin: 12px 0 4px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.05em;">From</p>
          <p style="margin: 0; font-size: 16px; color: #1a1a1a;"><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
          <p style="margin: 20px 0 4px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
          <div style="background: #f9f9f6; padding: 16px; border-radius: 8px; font-size: 15px; color: #333; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</div>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0 12px;" />
          <p style="font-size: 12px; color: #aaa;">Sent from your portfolio contact form • You can reply directly to this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Message sent!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact form failed:", err);
    return NextResponse.json({ error: UNAVAILABLE }, { status: 500 });
  }
}
