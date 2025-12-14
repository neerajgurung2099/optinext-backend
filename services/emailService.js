import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

export async function sendOtpEmail({ to, otp }) {
  return resend.emails.send({
    from: process.env.FROM_EMAIL,
    to,
    subject: "Verify your email",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Email Verification</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 3px;">${otp}</h1>
        <p>This code expires in 10 minutes.</p>
      </div>
    `,
  });
}
