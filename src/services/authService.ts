/**
 * Mock Econet subscriber auth (MSISDN + OTP). Shapes mirror the real header-
 * enrichment / OTP endpoints so a live backend drops in behind the same calls.
 * The OTP is 4 digits with a 60s resend window (preserved from production §4).
 */

export const OTP_LENGTH = 4;
export const OTP_TTL_SECONDS = 60;

/** Any 4-digit code is accepted in the demo except '0000' (forced-fail path). */
const DEMO_REJECT = '0000';

export interface RequestOtpResult {
  ok: true;
  maskedNumber: string;
}

/** Send an OTP to the given E.164 number. */
export async function requestOtp(e164: string): Promise<RequestOtpResult> {
  await new Promise((r) => setTimeout(r, 500));
  return { ok: true, maskedNumber: e164 };
}

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: string };

/** Verify the entered OTP. */
export async function verifyOtp(code: string): Promise<VerifyResult> {
  await new Promise((r) => setTimeout(r, 650));
  if (code.length !== OTP_LENGTH) return { ok: false, reason: 'Enter all 4 digits' };
  if (code === DEMO_REJECT) return { ok: false, reason: 'That PIN is incorrect. Try again or resend.' };
  return { ok: true };
}

/** Subscribe a number to a plan, then trigger OTP. */
export async function subscribe(e164: string, planId: string): Promise<RequestOtpResult> {
  await new Promise((r) => setTimeout(r, 550));
  void planId;
  return { ok: true, maskedNumber: e164 };
}
