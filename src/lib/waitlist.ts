import { z } from "zod";

export const WAITLIST_CATEGORIES = [
  "Enterprise Client",
  "Investor",
  "Government / PSU",
  "Technology Partner",
  "Research Institution",
  "Other",
] as const;

export const waitlistSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(1, "Name cannot be empty")
    .max(100, "Name must be 100 characters or fewer"),
  organisation: z
    .string()
    .trim()
    .max(200, "Organisation must be 200 characters or fewer")
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  email: z
    .string({ error: "Email is required" })
    .trim()
    .min(1, "Email cannot be empty")
    .max(254, "Email must be 254 characters or fewer") // RFC 5321 max
    .email("Invalid email address"),
  category: z.enum(WAITLIST_CATEGORIES, {
    error: "Invalid category selected",
  }),
  compute: z
    .string()
    .trim()
    .max(500, "Compute requirement must be 500 characters or fewer")
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const updateWaitlistSchema = z.object({
  status: z.string().trim().min(1, "Status cannot be empty").optional(),
  notes: z.string().trim().optional(),
});

export type UpdateWaitlistInput = z.infer<typeof updateWaitlistSchema>;

