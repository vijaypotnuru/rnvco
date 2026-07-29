import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { updateWaitlistSchema } from "@/lib/waitlist";

/*
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Validate update parameters
    const validatedData = updateWaitlistSchema.parse(body);

    const updates: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (validatedData.status !== undefined) {
      updates.push(`status = $${index++}`);
      values.push(validatedData.status);
    }
    if (validatedData.notes !== undefined) {
      updates.push(`notes = $${index++}`);
      values.push(validatedData.notes);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one field (status or notes) must be provided for update",
        },
        { status: 400 }
      );
    }

    values.push(id);
    const query = `
      UPDATE waitlist
      SET ${updates.join(", ")}
      WHERE id = $${index}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Waitlist entry with ID ${id} not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Waitlist status updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error("[Waitlist API ID] PATCH Failure:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update waitlist entry",
      },
      { status: 500 }
    );
  }
}
*/

export async function PATCH() {
  return NextResponse.json({ message: "Endpoint currently disabled" }, { status: 403 });
}
