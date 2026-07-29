import nodemailer from "nodemailer";
import { WaitlistInput } from "./waitlist";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpSecure = process.env.SMTP_SECURE === "true";
const mailFrom = process.env.MAIL_FROM || `"RNVCO" <noreply@rnvco.com>`;
const ownerEmail = process.env.OWNER_EMAIL || "owner@rnvco.com";

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export class EmailService {
  static async sendWaitlistEmails(data: WaitlistInput): Promise<void> {
    const submissionTime = new Date().toLocaleString();

    // 1. Send Notification to Owner
    await this.sendWaitlistOwnerNotification(data, submissionTime);

    // 2. Send Auto-Reply to customer
    await this.sendWaitlistCustomerAutoReply(data);
  }

  private static async sendWaitlistOwnerNotification(
    data: WaitlistInput,
    submissionTime: string
  ): Promise<void> {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Waitlist Registration</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #c8922a 0%, #8a6018 100%);
            padding: 32px;
            color: #ffffff;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
          }
          .content {
            padding: 32px;
          }
          .field-group {
            margin-bottom: 24px;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 16px;
          }
          .field-group:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
          }
          .field-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #64748b;
            font-weight: 600;
            margin-bottom: 6px;
          }
          .field-value {
            font-size: 16px;
            color: #0f172a;
            line-height: 1.5;
          }
          .footer {
            background-color: #f1f5f9;
            padding: 20px 32px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Waitlist Registration</h1>
          </div>
          <div class="content">
            <div class="field-group">
              <div class="field-label">Full Name</div>
              <div class="field-value">${this.escapeHtml(data.name)}</div>
            </div>
            
            <div class="field-group">
              <div class="field-label">Email Address</div>
              <div class="field-value">
                <a href="mailto:${data.email}" style="color: #c8922a; text-decoration: none; font-weight: 500;">
                  ${this.escapeHtml(data.email)}
                </a>
              </div>
            </div>

            <div class="field-group">
              <div class="field-label">Organisation</div>
              <div class="field-value">${data.organisation ? this.escapeHtml(data.organisation) : 'Not provided'}</div>
            </div>

            <div class="field-group">
              <div class="field-label">I Represent</div>
              <div class="field-value">${this.escapeHtml(data.category)}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Compute Requirement</div>
              <div class="field-value" style="white-space: pre-wrap; background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">${data.compute ? this.escapeHtml(data.compute) : 'None specified'}</div>
            </div>
          </div>
          <div class="footer">
            <p style="margin: 0;"><strong>Submitted:</strong> ${submissionTime}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.safeSendMail({
      from: mailFrom,
      to: ownerEmail,
      subject: `New RNVCO Waitlist Registration: ${data.name}`,
      html: htmlContent,
    });
  }

  private static async sendWaitlistCustomerAutoReply(data: WaitlistInput): Promise<void> {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RNVCO Waitlist Confirmation</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #c8922a 0%, #8a6018 100%);
            padding: 32px;
            color: #ffffff;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
          }
          .content {
            padding: 32px;
            line-height: 1.6;
          }
          .footer {
            background-color: #f1f5f9;
            padding: 20px 32px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Waitlist Confirmed</h1>
          </div>
          <div class="content">
            <p>Dear ${this.escapeHtml(data.name)},</p>
            <p>Thank you for registering early interest in RNVCO's sovereign AI data centre network. We have logged your details under the category <strong>${this.escapeHtml(data.category)}</strong>.</p>
            <p>We will reach out with project updates and primary access invitations as RNVCO Phase 1 approaches commissioning.</p>
          </div>
          <div class="footer">
            <p style="margin: 0;">This is an automated confirmation. Please do not reply directly to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.safeSendMail({
      from: mailFrom,
      to: data.email,
      subject: `RNVCO Waitlist Registration Confirmed`,
      html: htmlContent,
    });
  }

  private static escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private static async safeSendMail(options: nodemailer.SendMailOptions): Promise<void> {
    try {
      if (!smtpHost || !smtpUser || !smtpPass) {
        console.warn(`⚠️ [Email Service] SMTP settings not fully configured. Logging details to console instead.`);
        console.log(`Email options:`, options);
        return;
      }
      await transporter.sendMail(options);
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`⚠️ [Email Service] SMTP delivery failed. Falling back to console log:`, error.message);
        console.log(`Email options:`, options);
        return;
      }
      throw error;
    }
  }
}
