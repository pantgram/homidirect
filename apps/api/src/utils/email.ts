import nodemailer from "nodemailer";
import { config } from "../config/env";

const transporter = nodemailer.createTransport({
  host: config.email.smtpHost,
  port: config.email.smtpPort,
  secure: true,
  auth: {
    user: config.email.smtpUser,
    pass: config.email.smtpPass,
  },
});

export async function sendPasswordResetEmail(
  email: string,
  token: string
): Promise<void> {
  const resetUrl = `${config.frontendUrl}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: config.email.emailFrom,
    to: email,
    subject: "Reset Your HomiDirect Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested to reset your password for your HomiDirect account.</p>
        <p>Your reset code is:</p>
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
          <code style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${token}</code>
        </div>
        <p>Or click the button below to reset your password:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #666; font-size: 14px;">This link expires in 1 hour.</p>
        <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">HomiDirect - Find Your Perfect Rental</p>
      </div>
    `,
  });
}
