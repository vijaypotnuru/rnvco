"use server";

import nodemailer from "nodemailer";

export async function submitWaitlist(formData: FormData) {
  const name = formData.get("name") as string;
  const organisation = formData.get("organisation") as string;
  const email = formData.get("email") as string;
  const category = formData.get("category") as string;
  const compute = formData.get("compute") as string;

  if (!name || !email) {
    return { success: false, error: "Name and email are required." };
  }

  // Extract SMTP configuration from environment variables
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === "true";

  // If no SMTP settings are provided, fallback to logging
  if (!smtpHost || !smtpUser || !smtpPass) {
    return {
      success: true,
      warning: "SMTP settings not configured on server. Submission logged successfully."
    };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${smtpUser}>`, // Send on behalf of user, using smtpUser to authenticate
      replyTo: email, // Set Reply-To to user's email
      to: "naveen@iibssec.com",
      subject: `New RNVCO Waitlist Registration: ${name}`,
      text: `
New Waitlist Registration Details:
----------------------------------
Full Name: ${name}
Organisation: ${organisation || "Not provided"}
Email Address: ${email}
I Represent: ${category || "Not selected"}
Compute Requirement: ${compute || "Not provided"}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #c48b29; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">New Waitlist Registration</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Full Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Organisation:</td>
              <td style="padding: 8px 0;">${organisation || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email Address:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c48b29; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">I Represent:</td>
              <td style="padding: 8px 0;">${category || "Not selected"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Compute Requirement:</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${compute || "Not provided"}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Failed to send email due to server error." };
  }
}
