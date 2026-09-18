import { NextResponse } from "next/server";

/**
 * Inquiry endpoint. Validates and (for now) logs the submission server-side.
 *
 * TO GO LIVE: wire this to email/CRM — e.g. Resend, SendGrid, or a webhook.
 * The shape below is stable, so only the "deliver" step needs to change:
 *
 *   await resend.emails.send({ to: "info@capitalgroupcr.com", ... })
 */

interface Inquiry {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  message?: string;
  propertyAddress?: string;
  propertySlug?: string;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Inquiry;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();

  if (!name || name.length > 120) {
    return NextResponse.json({ ok: false, error: "A valid name is required." }, { status: 422 });
  }
  if (!emailRe.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 422 });
  }

  const inquiry: Inquiry = {
    name,
    email,
    phone: (body.phone ?? "").trim().slice(0, 40),
    type: (body.type ?? "General Inquiry").slice(0, 80),
    message: (body.message ?? "").trim().slice(0, 4000),
    propertyAddress: body.propertyAddress?.slice(0, 200),
    propertySlug: body.propertySlug?.slice(0, 120),
  };

  // Placeholder delivery: server log. Replace with real email/CRM integration.
  console.info("[inquiry] new submission", {
    ...inquiry,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
