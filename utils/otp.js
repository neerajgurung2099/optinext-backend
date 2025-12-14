import crypto from "crypto";
export function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}
export function getExpiry(minutes = 10) {
  return Date.now() + minutes * 60 * 1000;
}
