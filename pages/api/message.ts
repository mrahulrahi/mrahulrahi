import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 30px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
    
    <!-- Header -->
    <div style="background: linear-gradient(45deg,#1b9c85,#11d486); padding: 40px 32px; text-align: center;">
      <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">New Message</h2>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 32px;">
      
      <!-- Sender Info -->
      <div style="margin-bottom: 32px;">
        <div style="display: inline-block; background: #f8f9fa; padding: 20px 24px; border-radius: 12px; width: 100%; box-sizing: border-box;">
          <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">From</p>
          <p style="margin: 0 0 8px 0; color: #111827; font-size: 18px; font-weight: 600;">${name}</p>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">${email}</p>
        </div>
      </div>
      
      <!-- Subject -->
      <div style="margin-bottom: 28px;">
        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Subject</p>
        <p style="margin: 0; color: #111827; font-size: 16px; font-weight: 500;">${subject}</p>
      </div>
      
      <!-- Message -->
      <div style="margin-bottom: 0;">
        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
        <div style="color: #374151; font-size: 15px; line-height: 1.7;">${message.replace(/\n/g, "<br>")}</div>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div style="background: #f8f9fa; padding: 24px 32px; border-top: 1px solid #e5e7eb;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <a href="https://mrahulrahi.vercel.app/" style="display: flex; align-items: center; text-decoration: none; color: #111827;">
          <img src="https://mrahulrahi.vercel.app/logo.svg" alt="Logo" style="width: 32px; height: 32px; margin-right: 10px; border-radius: 6px;" />
          <span style="font-size: 18px; font-weight: 700; letter-spacing: -0.3px;">mrahulrahi</span>
        </a>
      </div>
      <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">Sent via portfolio contact form</p>
    </div>
    
  </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New message from ${name}: ${subject}`,
      html: htmlContent, // ✅ styled HTML body
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email." });
  }
}
