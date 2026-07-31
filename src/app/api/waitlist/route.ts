import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/waitlist";
import { EmailService } from "@/lib/email";
import { rateLimiter } from "@/lib/rateLimit";

// Origins allowed to call this API
const ALLOWED_ORIGINS = [
  "https://rnvco.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

export async function POST(req: NextRequest) {
  try {
    // 1. CSRF — Origin check
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    // 2. Rate Limiting — trust x-real-ip (set by reverse proxy) first.
    // When falling back to x-forwarded-for, take the LAST entry (the proxy),
    // not the first (which is client-controlled and trivially forged).
    const ip =
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ||
      "127.0.0.1";

    const limitStatus = rateLimiter(ip);

    if (!limitStatus.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again in 15 minutes.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((limitStatus.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const body = await req.json();

    // 3. Validate incoming data
    const validatedData = waitlistSchema.parse(body);

    // 4. Send emails
    await EmailService.sendWaitlistEmails(validatedData);

    return NextResponse.json({
      success: true,
      message: "Waitlist registration successful",
    });
  } catch (error: any) {
    console.error("[Waitlist API] POST Failure:", error);

    // Zod parsing validation error
    if (error.name === "ZodError" || error.issues) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.issues ? error.issues.map((i: any) => ({
            field: i.path.join("."),
            message: i.message,
          })) : error,
        },
        { status: 400 }
      );
    }

    // Never leak internal error details to the client in production
    return NextResponse.json(
      {
        success: false,
        message:
          process.env.NODE_ENV === "development"
            ? (error.message ?? "An unexpected error occurred")
            : "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: "Database integration disabled.",
    },
    { status: 501 }
  );
}
