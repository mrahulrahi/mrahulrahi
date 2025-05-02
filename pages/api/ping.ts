import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,       // Your Gmail
        pass: process.env.EMAIL_PASS,       // Your Gmail App Password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "New Ping from Your Portfolio",
      text: `You've received a new ping from: ${email}`,
    });

    res.status(200).json({ message: "Ping sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email." });
  }
}
