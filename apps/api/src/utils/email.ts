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

export interface ContactOwnerEmailData {
  ownerEmail: string;
  ownerName: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  message: string;
  listingTitle: string;
  listingId: number;
}

export async function sendContactOwnerEmail(
  data: ContactOwnerEmailData
): Promise<void> {
  const listingUrl = `${config.frontendUrl}/listing/${data.listingId}`;

  await transporter.sendMail({
    from: config.email.emailFrom,
    to: data.ownerEmail,
    replyTo: data.senderEmail,
    subject: `New inquiry about your property: ${data.listingTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Property Inquiry</h2>
        <p>Hello ${data.ownerName},</p>
        <p>You have received a new inquiry about your property listing on HomiDirect.</p>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Property: ${data.listingTitle}</h3>
          <p><a href="${listingUrl}" style="color: #007bff;">View Listing</a></p>
        </div>

        <div style="background-color: #fff; border: 1px solid #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Message from ${data.senderName}:</h3>
          <p style="white-space: pre-line; color: #555;">${data.message}</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #333; margin-top: 0;">Contact Information:</h4>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${data.senderName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${data.senderEmail}">${data.senderEmail}</a></p>
          ${data.senderPhone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${data.senderPhone}</p>` : ""}
        </div>

        <p>You can reply directly to this email to respond to ${data.senderName}.</p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">
          This message was sent via HomiDirect.
          <a href="${config.frontendUrl}" style="color: #007bff;">Visit HomiDirect</a>
        </p>
      </div>
    `,
  });
}
