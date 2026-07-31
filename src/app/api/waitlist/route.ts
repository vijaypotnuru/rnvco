import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/waitlist";
import { EmailService } from "@/lib/email";
import { rateLimiter } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
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

    // 2. Validate incoming data
    const validatedData = waitlistSchema.parse(body);

    // 3. Send emails
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

    return NextResponse.json(
      {
        success: false,
        message: error.message || "An unexpected error occurred",
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

