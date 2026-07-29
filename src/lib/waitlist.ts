import { z } from "zod";

export const waitlistSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(1, "Name cannot be empty"),
  organisation: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  email: z
    .string({ error: "Email is required" })
    .trim()
    .min(1, "Email cannot be empty")
    .email("Invalid email address"),
  category: z
    .string({ error: "Category is required" })
    .trim()
    .min(1, "Category cannot be empty"),
  compute: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const updateWaitlistSchema = z.object({
  status: z.string().trim().min(1, "Status cannot be empty").optional(),
  notes: z.string().trim().optional(),
});

export type UpdateWaitlistInput = z.infer<typeof updateWaitlistSchema>;
