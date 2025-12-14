import express from "express";
import { generateOTP, getExpiry } from "../utils/otp.js";
import { sendOtpEmail } from "../services/emailService.js";

const router = express.Router();

const otpStore = new Map();

router.post("/send", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = generateOTP();
    const expiresAt = getExpiry(10);

    otpStore.set(email, {
      otp,
      expiresAt,
      verified: false,
    });

    await sendOtpEmail({ to: email, otp });

    res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (error) {
    console.error("OTP send error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
});
router.post("/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const record = otpStore.get(email);

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or already used",
      });
    }

    if (record.expiresAt < Date.now()) {
      otpStore.delete(email);
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    if (record.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Mark verified & cleanup
    record.verified = true;
    otpStore.delete(email);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
});

export { otpStore };
export default router;
