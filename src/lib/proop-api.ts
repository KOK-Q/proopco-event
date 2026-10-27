/**
 * Server-only client for the proop.co API (see the 6 Aban frontend handoff).
 * Every response uses the envelope { success, data, message }; validation
 * errors come back as Laravel's 422 shape { message, errors }.
 */
import { headers } from "next/headers";

const BASE_URL = process.env.API_BASE_URL || "https://proop.co/api";
// Login can take a few seconds for a new user (it creates a live MT5 account).
const TIMEOUT_MS = Number(process.env.API_TIMEOUT_MS) || 30000;

const NETWORK_ERROR = "ارتباط با سرور برقرار نشد. لطفا دوباره تلاش کنید.";
const UNKNOWN_ERROR = "خطایی رخ داده است";

export type ApiResult<T> =
  | { ok: true; status: number; data: T; message: string }
  | { ok: false; status: number; message: string; code?: string };

type RequestOptions = {
  method?: "GET" | "POST";
  body?: unknown;
  token?: string;
};

export async function apiRequest<T>(
  path: string,
  { method = "GET", body, token }: RequestOptions = {},
): Promise<ApiResult<T>> {
  // Pass the visitor's IP on, so per-IP limits don't treat everyone as us.
  const requestHeaders = await headers();
  const forwardedFor =
    requestHeaders.get("x-forwarded-for") ?? requestHeaders.get("x-real-ip");

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(forwardedFor && { "X-Forwarded-For": forwardedFor }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    return { ok: false, status: 0, message: NETWORK_ERROR };
  }

  const json = await res.json().catch(() => null);
  if (res.ok && json?.success) {
    return { ok: true, status: res.status, data: json.data as T, message: json.message ?? "" };
  }

  // 422 carries per-field errors; show the first one.
  const fieldError = json?.errors
    ? (Object.values(json.errors).flat()[0] as string | undefined)
    : undefined;
  return {
    ok: false,
    status: res.status,
    message: fieldError ?? json?.message ?? UNKNOWN_ERROR,
    code: json?.data?.code,
  };
}
