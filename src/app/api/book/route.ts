import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, company, note, sessionType, date, time } = body;

  if (!name || !email || !sessionType || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email");
    return NextResponse.json({ success: true, emailSent: false });
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const sessionLabel = sessionType === "discovery" ? "Discovery Call (30 min)" : "Project Kickoff (60 min)";

  try {
    // Confirmation email to booker
    await resend.emails.send({
      from: "Ryan Rosenthal <bookings@ryanrosenthal.com>",
      to: email,
      subject: "You're booked with Ryan Rosenthal",
      text: [
        `Hey ${name},`,
        "",
        `You're confirmed for a ${sessionLabel} with Ryan.`,
        "",
        `Date: ${date}`,
        `Time: ${time}`,
        "",
        "A Zoom link will be sent before your session.",
        "",
        "Questions? Reply to this email or reach out at ryan@ryanrosenthal.com",
        "",
        "— Ryan Rosenthal",
      ].join("\n"),
    });

    // Notification to Ryan
    await resend.emails.send({
      from: "Bookings <bookings@ryanrosenthal.com>",
      to: "ryan@ryanrosenthal.com",
      subject: `New booking: ${name} — ${sessionLabel}`,
      text: [
        `New ${sessionLabel} booked.`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        `Date: ${date}`,
        `Time: ${time}`,
        "",
        note ? `Note: ${note}` : "No note provided.",
      ].join("\n"),
    });

    return NextResponse.json({ success: true, emailSent: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ success: true, emailSent: false });
  }
}
