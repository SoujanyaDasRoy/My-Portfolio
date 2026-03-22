import { NextRequest, NextResponse } from "next/server";

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // In production, integrate a real service here:
    //   - Nodemailer (SMTP)
    //   - SendGrid / Resend API
    //   - Save to a database (Supabase, MongoDB, etc.)
    //
    // For now, we log the message server-side and
    // return a success response.
    // ─────────────────────────────────────────────

    console.log("──── New Contact Form Submission ────");
    console.log(`Name:    ${body.name}`);
    console.log(`Email:   ${body.email}`);
    console.log(`Message: ${body.message}`);
    console.log("─────────────────────────────────────");

    return NextResponse.json(
      { success: true, message: "Message received!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
