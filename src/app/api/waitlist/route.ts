import { NextRequest, NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { waitlistSchema } from "@/lib/waitlist";
import { EmailService } from "@/lib/email";
import { rateLimiter } from "@/lib/rateLimit";

// Initialize tables automatically on first request to the database
let dbInitialized = false;
async function ensureDbInit() {
  if (!dbInitialized) {
    await initDb();
    dbInitialized = true;
  }
}

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

    await ensureDbInit();
    const body = await req.json();

    // 2. Validate incoming data
    const validatedData = waitlistSchema.parse(body);

    // // 2. Insert into PostgreSQL
    // await pool.query(
    //   "INSERT INTO waitlist (name, organisation, email, category, compute) VALUES ($1, $2, $3, $4, $5)",
    //   [
    //     validatedData.name,
    //     validatedData.organisation || null,
    //     validatedData.email,
    //     validatedData.category,
    //     validatedData.compute || null,
    //   ]
    // );

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
  try {
    await ensureDbInit();
    const result = await pool.query(
      "SELECT * FROM waitlist ORDER BY created_at DESC"
    );

    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    console.error("[Waitlist API] GET Failure:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch waitlist entries",
      },
      { status: 500 }
    );
  }
}
