"use server";

/**
 * 6 Aban festival Server Functions, called from the FreeChallenge section.
 * Tokens live in httpOnly cookies on this site; the browser never sees them.
 */
import { cookies } from "next/headers";
import { apiRequest, type ApiResult } from "@/lib/proop-api";
import {
  toLatinDigits,
  type FestivalAccount,
  type FestivalLogin,
} from "@/lib/festival";

const TOKEN_COOKIE = "aban6_token";
const REFRESH_COOKIE = "aban6_refresh";
const PHONE_COOKIE = "aban6_phone";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // expiry is enforced by the API (401 → refresh)
};

/** `loggedOut` means the tokens are gone or rejected: back to the phone step. */
export type ActionResult<T = object> =
  | ({ ok: true; message: string } & T)
  | { ok: false; status: number; message: string; loggedOut?: boolean };

function fail(res: Extract<ApiResult<unknown>, { ok: false }>) {
  return { ok: false as const, status: res.status, message: res.message };
}

const LOGGED_OUT = {
  ok: false as const,
  status: 401,
  message: "نشست شما منقضی شده است. لطفا دوباره وارد شوید.",
  loggedOut: true,
};

/** Step 1 — POST /auth/send-otp. Also used for resend. */
export async function sendOtp(phone: string): Promise<ActionResult> {
  const res = await apiRequest("/auth/send-otp", {
    method: "POST",
    body: { phone: toLatinDigits(phone) },
  });
  return res.ok ? { ok: true, message: res.message } : fail(res);
}

/** Step 2 — POST /aban-6/login-or-register-with-otp. Stores the tokens. */
export async function loginWithOtp(
  phone: string,
  otp: string,
  referralBy?: string,
): Promise<ActionResult<{ festival: FestivalLogin }>> {
  const normalizedPhone = toLatinDigits(phone);
  const res = await apiRequest<{
    token: string;
    refresh_token: string;
    festival: FestivalLogin;
  }>("/aban-6/login-or-register-with-otp", {
    method: "POST",
    body: {
      phone: normalizedPhone,
      otp: toLatinDigits(otp),
      ...(referralBy && { referral_by: referralBy }),
    },
  });
  if (!res.ok) return fail(res);

  const jar = await cookies();
  jar.set(TOKEN_COOKIE, res.data.token, COOKIE_OPTIONS);
  jar.set(REFRESH_COOKIE, res.data.refresh_token, COOKIE_OPTIONS);
  jar.set(PHONE_COOKIE, normalizedPhone, COOKIE_OPTIONS);
  return { ok: true, message: res.message, festival: res.data.festival };
}

/** Retry only — POST /aban-6/join, when login returned festival.joined: false. */
export async function joinFestival(): Promise<
  ActionResult<{ created: boolean; account: FestivalAccount }>
> {
  const res = await authedRequest<{ created: boolean; account: FestivalAccount }>(
    "/aban-6/join",
    "POST",
  );
  if (!res) return LOGGED_OUT;
  if (!res.ok) return fail(res);
  return { ok: true, message: res.message, ...res.data };
}

/** GET /aban-6/me — called when the page opens, so a newly approved 1k flex shows up. */
export async function getFestivalStatus(): Promise<
  ActionResult<{ phone: string | null; enrolled: boolean; accounts: FestivalAccount[] }>
> {
  const res = await authedRequest<{ enrolled: boolean; accounts: FestivalAccount[] }>(
    "/aban-6/me",
    "GET",
  );
  if (!res) return LOGGED_OUT;
  if (!res.ok) return fail(res);
  const phone = (await cookies()).get(PHONE_COOKIE)?.value ?? null;
  return { ok: true, message: res.message, phone, ...res.data };
}

/** Clears the session on this site. */
export async function logout(): Promise<void> {
  const jar = await cookies();
  jar.delete(TOKEN_COOKIE);
  jar.delete(REFRESH_COOKIE);
  jar.delete(PHONE_COOKIE);
}

/**
 * Calls a festival endpoint with the access token. On 401 it refreshes the
 * token (POST /auth/refresh) and retries once. Returns null when the user
 * has to log in again.
 */
async function authedRequest<T>(path: string, method: "GET" | "POST") {
  const jar = await cookies();
  const token = jar.get(TOKEN_COOKIE)?.value;
  const refreshToken = jar.get(REFRESH_COOKIE)?.value;
  if (!token && !refreshToken) return null;

  if (token) {
    const res = await apiRequest<T>(path, { method, token });
    if (res.status !== 401) return res;
  }

  const refreshed = refreshToken
    ? await apiRequest<{ token: string }>("/auth/refresh", {
        method: "POST",
        body: { refresh_token: refreshToken },
      })
    : null;
  if (refreshed?.ok) {
    jar.set(TOKEN_COOKIE, refreshed.data.token, COOKIE_OPTIONS);
    const retry = await apiRequest<T>(path, { method, token: refreshed.data.token });
    if (retry.status !== 401) return retry;
  }

  await logout();
  return null;
}
