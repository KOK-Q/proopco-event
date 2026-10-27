/**
 * 6 Aban festival — shared types and client settings.
 * Safe to import from both client and server code.
 */

/** A festival trading account, as returned by login, join and me. */
export type FestivalAccount = {
  id: string;
  login: string;
  server_name: string;
  platform: string;
  balance: number;
  status: string; // active, passed, failed, verified, …
  realPhase: number;
  type: string; // one_step (10k) or limit (flex)
  kind: string; // one_step, flex or real — picks the card label
  challenge_balance: number;
};

/** The `festival` object from login-or-register-with-otp. */
export type FestivalLogin = {
  joined: boolean;
  created: boolean;
  account: FestivalAccount | null;
  message: string;
};

export const OTP_LENGTH = Number(process.env.NEXT_PUBLIC_OTP_LENGTH) || 5;
export const RESEND_SECONDS =
  Number(process.env.NEXT_PUBLIC_OTP_RESEND_SECONDS) || 120;
export const PHONE_PATTERN = new RegExp(
  process.env.NEXT_PUBLIC_PHONE_PATTERN || "^09\\d{9}$",
);
export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://proop.co/user";

/** Persian (۰-۹) and Arabic (٠-٩) digits → 0-9, whitespace removed. */
export function toLatinDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/\s/g, "");
}
