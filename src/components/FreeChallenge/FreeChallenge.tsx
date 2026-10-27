"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, LoaderCircle, RefreshCw, X } from "lucide-react";
import {
  getFestivalStatus,
  joinFestival,
  loginWithOtp,
  logout,
  sendOtp,
} from "@/app/actions/festival";
import {
  DASHBOARD_URL,
  OTP_LENGTH,
  PHONE_PATTERN,
  RESEND_SECONDS,
  toLatinDigits,
  type FestivalAccount,
} from "@/lib/festival";

/** FreeChallenge copy — edit these strings. */
const freeChallenge = {
  title: "چالش رایگان، هدیه پراپکو برای همایش پارسیان بورس",
  description:
    "به مناسبت حضورتان در همایش می‌توانید تجربه رایگان پراپ تریدینگ را داشته باشید.",
  card: {
    name: "چالش با بالانس",
    balance: "10K",
    balanceDesc: "این بالانس را از پراپکو دریافت کنید، به حد سود 10 درصد برسید، یک پراپ رایگان از طرف پراپکو دریافت می‌کنید.",
    cta: {
      label: " درخواست چالش رایگان",
      // Logged in, but the free account could not be created yet.
      retry: "ساخت اکانت رایگان",
      // Shown once the user has a festival account.
      dashboard: { label: "ورود به داشبورد", href: DASHBOARD_URL },
    },
  },
  subtext: "برای ثبت درخواست فقط شماره موبایل مورد نیاز است.",
  accounts: {
    title: "اکانت‌های جشنواره شما",
    login: "شماره لاگین",
    server: "سرور",
    balance: "بالانس",
    credentials: "رمز عبور اکانت‌ها در داشبورد پراپکو قابل مشاهده است.",
    logout: "ورود با شماره‌ی دیگر",
  },
  modal: {
    title: "درخواست چالش رایگان",
    description:
      "شماره موبایل خود را وارد کنید تا کد تأیید برایتان ارسال شود.",
    inputLabel: "شماره موبایل",
    placeholder: "09xxxxxxxxx",
    submit: "دریافت کد تأیید",
    sending: "در حال ارسال کد…",
    error: "شماره‌ی موبایل باید 11 رقم باشد و با 09 شروع شود.",
    subtext:
      "پلن چالش پس از فعال‌سازی در داشبورد پراپکو برای همین شماره قرار می‌گیرد و اطلاع‌رسانی می‌شود.",
    otp: {
      title: "تأیید شماره موبایل",
      description: "برای ثبت نهایی درخواست، کد تأیید را وارد کنید.",
      sentTo: "کد تأیید به شماره‌ی {number} ارسال شد.",
      editNumber: "ویرایش شماره",
      resend: "ارسال مجدد کد",
      resendTimer: "ارسال مجدد کد تا {time}",
      submit: "تأیید و ثبت درخواست",
      verifying: "در حال ساخت اکانت…",
      slowHint: "ساخت اکانت ممکن است چند ثانیه طول بکشد.",
      error: "کد تأیید را کامل وارد کنید.",
      notReceived: "کد را دریافت نکردید؟",
      support: "ارتباط با پشتیبانی",
    },
    retry: {
      title: "ساخت اکانت رایگان",
      description: "ساخت اکانت رایگان شما کامل نشد. دوباره تلاش کنید.",
      submit: "تلاش مجدد",
    },
    done: {
      title: "درخواستت ثبت شد",
      subtext:
        "رمز عبور و اطلاعات کامل ورود به اکانت در داشبورد پراپکو در دسترس است.",
      cta: "متوجه شدم",
    },
  },
};

/** Card label per account `kind`, badge per `status` (see the API handoff). */
const KIND_LABELS: Record<string, string> = {
  one_step: "چالش رایگان",
  flex: "اکانت فلکس",
  real: "اکانت ریل",
};
const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  active: { label: "فعال", className: "bg-[rgba(185,162,120,0.15)] text-[#d6bd91]" },
  passed: { label: "قبول شده", className: "bg-[rgba(57,185,132,0.15)] text-[#39b984]" },
  verified: { label: "تأیید شده", className: "bg-[rgba(57,185,132,0.15)] text-[#39b984]" },
  failed: { label: "مردود", className: "bg-[rgba(211,107,107,0.15)] text-[#e18c8c]" },
};

type Session =
  | { state: "loading" }
  | { state: "guest" }
  | {
      state: "member";
      phone: string | null;
      enrolled: boolean;
      accounts: FestivalAccount[];
    };

type Step = "phone" | "otp" | "retry" | "done";

const emptyCode = () => Array<string>(OTP_LENGTH).fill("");

const formatBalance = (balance: number) => `$${balance.toLocaleString("en-US")}`;

/** Referrer code from the landing URL (?ref=… or ?referral_by=…). */
function referralCode() {
  const params = new URLSearchParams(window.location.search);
  return params.get("ref") ?? params.get("referral_by") ?? undefined;
}

function StatusBadge({ status }: { status: string }) {
  const badge = STATUS_BADGES[status] ?? {
    label: status,
    className: "bg-white/8 text-muted",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.className}`}>
      {badge.label}
    </span>
  );
}

function AccountDetails({ account }: { account: FestivalAccount }) {
  const { accounts } = freeChallenge;
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[11px]">
      <dt className="text-muted">{accounts.login}</dt>
      <dd dir="ltr" className="text-left font-mono text-title">
        {account.login}
      </dd>
      <dt className="text-muted">{accounts.server}</dt>
      <dd dir="ltr" className="text-left font-mono text-title">
        {account.server_name} · {account.platform.toUpperCase()}
      </dd>
      <dt className="text-muted">{accounts.balance}</dt>
      <dd dir="ltr" className="text-left font-mono text-title">
        {formatBalance(account.balance)}
      </dd>
    </dl>
  );
}

export function FreeChallenge() {
  const { card, modal } = freeChallenge;
  const otp = modal.otp;
  const done = modal.done;
  const retry = modal.retry;

  const [session, setSession] = useState<Session>({ state: "loading" });
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("phone");
  const [busy, setBusy] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState(emptyCode);
  const [otpError, setOtpError] = useState("");
  const [joinError, setJoinError] = useState("");
  const [result, setResult] = useState<{
    message: string;
    account: FestivalAccount | null;
  } | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // GET /aban-6/me — refreshed when the page opens, so an approved 1k flex shows up.
  const applyStatus = useCallback(
    (res: Awaited<ReturnType<typeof getFestivalStatus>>) => {
      if (res.ok) {
        setSession({
          state: "member",
          phone: res.phone,
          enrolled: res.enrolled,
          accounts: res.accounts,
        });
      } else if (res.loggedOut) {
        setSession({ state: "guest" });
      } else {
        setSession((s) => (s.state === "loading" ? { state: "guest" } : s));
      }
    },
    [],
  );
  const loadStatus = () => getFestivalStatus().then(applyStatus);

  useEffect(() => {
    getFestivalStatus().then(applyStatus);
  }, [applyStatus]);

  const closeModal = useCallback(() => {
    if (!busy) setOpen(false);
  }, [busy]);

  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  // Countdown for the resend timer while on the OTP step.
  useEffect(() => {
    if (!open || step !== "otp") return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [open, step]);

  // Focus the first OTP box when entering the OTP step.
  useEffect(() => {
    if (step === "otp") inputsRef.current[0]?.focus();
  }, [step]);

  // Tokens rejected and refresh failed — back to step 1.
  const restartLogin = (message: string) => {
    setSession({ state: "guest" });
    setStep("phone");
    setError(message);
    setOpen(true);
  };

  const openModal = () => {
    setError("");
    setOtpError("");
    setJoinError("");
    setCode(emptyCode());
    // Logged in without a festival account → straight to the join retry.
    setStep(session.state === "member" && !session.enrolled ? "retry" : "phone");
    setOpen(true);
  };

  const handlePhoneSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalized = toLatinDigits(phone);
    if (!PHONE_PATTERN.test(normalized)) {
      setError(modal.error);
      return;
    }
    setPhone(normalized);
    setError("");
    setBusy(true);
    const res = await sendOtp(normalized);
    setBusy(false);
    if (!res.ok) {
      setError(res.message);
      return;
    }
    setCode(emptyCode());
    setOtpError("");
    setSecondsLeft(RESEND_SECONDS);
    setStep("otp");
  };

  const handleVerify = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = code.join("");
    if (otpValue.length < OTP_LENGTH) {
      setOtpError(otp.error);
      return;
    }
    setOtpError("");
    setBusy(true);
    const res = await loginWithOtp(phone, otpValue, referralCode());
    setBusy(false);
    if (!res.ok) {
      setOtpError(res.message);
      setCode(emptyCode());
      inputsRef.current[0]?.focus();
      return;
    }

    const { festival } = res;
    setSession({
      state: "member",
      phone,
      enrolled: festival.joined,
      accounts: festival.account ? [festival.account] : [],
    });
    if (festival.joined) {
      // created: true → new 10k; created: false → returning user, same account.
      setResult({ message: festival.message, account: festival.account });
      setStep("done");
      void loadStatus(); // pick up any other festival accounts (e.g. the 1k flex)
    } else {
      // Still a valid login — keep the tokens and only retry join.
      setJoinError(festival.message);
      setStep("retry");
    }
  };

  const handleJoin = async () => {
    setJoinError("");
    setBusy(true);
    const res = await joinFestival();
    setBusy(false);
    if (!res.ok) {
      if (res.loggedOut) restartLogin(res.message);
      else setJoinError(res.message);
      return;
    }
    setResult({ message: res.message, account: res.account });
    setStep("done");
    void loadStatus();
  };

  const handleResend = async () => {
    if (secondsLeft > 0 || busy) return;
    setOtpError("");
    setBusy(true);
    const res = await sendOtp(phone);
    setBusy(false);
    if (!res.ok) {
      setOtpError(res.message);
      // 429: this phone is rate-limited — make the user wait before trying again.
      if (res.status === 429) setSecondsLeft(RESEND_SECONDS);
      return;
    }
    setCode(emptyCode());
    setSecondsLeft(RESEND_SECONDS);
    inputsRef.current[0]?.focus();
  };

  const handleLogout = async () => {
    await logout();
    setSession({ state: "guest" });
    setPhone("");
    setResult(null);
  };

  const handleOtpChange = (i: number, value: string) => {
    const digit = toLatinDigits(value).replace(/\D/g, "").slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    if (otpError) setOtpError("");
    if (digit && i < OTP_LENGTH - 1) inputsRef.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = toLatinDigits(e.clipboardData.getData("text"))
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!text) return;
    e.preventDefault();
    const next = emptyCode();
    text.split("").forEach((c, idx) => {
      next[idx] = c;
    });
    setCode(next);
    if (otpError) setOtpError("");
    inputsRef.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus();
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const timeLabel = `${mm}:${ss}`;
  const [sentBefore, sentAfter] = otp.sentTo.split("{number}");

  const member = session.state === "member" ? session : null;
  const primaryButton =
    "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-2 px-6 py-3.5 text-base font-bold text-[#100e09] transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60";

  return (
    <section
      id="free-challenge"
      dir="rtl"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-5.5 py-20 sm:py-20"
    >
      {/* Header */}
      <div className="max-w-2xl text-right">
        <h2 className="text-2xl font-bold tracking-tight text-title sm:text-xl">
          {freeChallenge.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted text-[13px] sm:text-md">
          {freeChallenge.description}
        </p>
      </div>

      {/* The user's festival accounts (GET /aban-6/me) */}
      {member && member.accounts.length > 0 && (
        <div className="mt-8 rounded-2xl border border-[rgba(57,185,132,0.35)] bg-[rgba(57,185,132,0.08)] p-4 text-right font-vazir">
          <div className="flex items-center gap-3">
            <div className="flex size-9 flex-none items-center justify-center rounded-full bg-[rgba(57,185,132,0.15)] text-[#39b984]">
              <Check className="size-5" />
            </div>
            <p className="text-[14px] font-bold text-[#39b984]">
              {freeChallenge.accounts.title}
            </p>
            {member.phone && (
              <span dir="ltr" className="mr-auto font-mono text-[12px] text-title">
                {member.phone}
              </span>
            )}
          </div>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {member.accounts.map((account) => (
              <li
                key={account.id}
                className="rounded-xl border border-white/10 bg-[#101010]/60 p-3"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-[13px] font-bold text-title">
                    {KIND_LABELS[account.kind] ?? account.type}
                  </span>
                  <StatusBadge status={account.status} />
                </div>
                <AccountDetails account={account} />
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center justify-between gap-3 text-[11px]">
            <p className="text-muted">{freeChallenge.accounts.credentials}</p>
            <button
              type="button"
              onClick={handleLogout}
              className="flex-none font-vazir text-gold-2 transition-colors hover:text-gold"
            >
              {freeChallenge.accounts.logout}
            </button>
          </div>
        </div>
      )}

      {/* Challenge card */}
      <div className={`${member?.accounts.length ? "mt-4" : "mt-8"} overflow-hidden rounded-3xl border border-[rgba(185,162,120,0.3)] bg-[radial-gradient(circle_at_10%_10%,rgba(185,162,120,0.13),transparent_82%)] p-5 transition-colors hover:border-gold/40`}>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Right column: balance + specs */}
          <div className="text-right">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold font-vazir text-title">
                {card.name}{" "}
                <span className="font-(family-name:--font-yekan-bakh) text-2xl font-extrabold">
                  {card.balance}
                </span>
              </h3>
            </div>

            <p className="mt-6 font-vazir text-[13px] text-muted">{card.balanceDesc}</p>
          </div>

          {/* Left column: CTA + subtext */}
          <div className="flex flex-col items-center justify-center">
            {member?.enrolled ? (
              <a
                href={card.cta.dashboard.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-button group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[rgba(185,162,120,0.5)] bg-linear-to-l from-[rgba(185,162,120,0.2)] to-[rgba(185,162,120,0.03)] px-6 py-3.5 text-base font-bold text-[#D6BD90] transition-colors hover:from-[rgba(185,162,120,0.3)] hover:to-[rgba(185,162,120,0.08)]"
              >
                {card.cta.dashboard.label}
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              </a>
            ) : (
              <button
                type="button"
                onClick={openModal}
                disabled={session.state === "loading"}
                className={`group ${primaryButton}`}
              >
                {session.state === "loading" ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <>
                    {member ? card.cta.retry : card.cta.label}
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
                  </>
                )}
              </button>
            )}
            <p className="mt-3 text-center text-[10px] text-muted">
              {freeChallenge.subtext}
            </p>
          </div>
        </div>
      </div>

      {/* Request modal */}
      {open && (
        <div
          dir="rtl"
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/72 backdrop-blur-sm animate-in fade-in duration-200 motion-reduce:animate-none sm:items-center sm:p-3"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="challenge-modal-title"
        >
          {/* Bottom sheet on mobile, centered dialog from sm up */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="font-vazir [&_button]:font-vazir max-h-[90dvh] w-full overflow-y-auto rounded-t-3xl border border-b-0 border-white/13 bg-[#171716] p-5 pb-[calc(2.5rem+env(safe-area-inset-bottom))] text-right shadow-[0_-14px_50px_rgba(0,0,0,0.45)] animate-in slide-in-from-bottom duration-300 ease-out motion-reduce:animate-none sm:max-w-md sm:rounded-3xl sm:border-b sm:p-6 sm:fade-in sm:zoom-in-95 sm:slide-in-from-bottom-0 sm:duration-200"
          >
            {/* Sheet handle (mobile only) */}
            <div className="mx-auto -mt-2 mb-4 h-1 w-10 rounded-full bg-white/20 sm:hidden" />
            {/* Head */}
            <div className="flex items-start justify-between gap-4">
              {step === "done" ? (
                <div />
              ) : (
                <div>
                  <h2
                    id="challenge-modal-title"
                    className="text-xl font-bold text-title"
                  >
                    {step === "phone"
                      ? modal.title
                      : step === "otp"
                        ? otp.title
                        : retry.title}
                  </h2>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted">
                    {step === "phone"
                      ? modal.description
                      : step === "otp"
                        ? otp.description
                        : retry.description}
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={closeModal}
                disabled={busy}
                aria-label="بستن"
                className="flex size-9 flex-none items-center justify-center rounded-xl border border-white/10 text-muted transition-colors hover:text-title disabled:opacity-40"
              >
                <X className="size-4" />
              </button>
            </div>

            {step === "phone" && (
              <>
                {/* Phone form */}
                <form onSubmit={handlePhoneSubmit} noValidate className="mt-6">
                  <label
                    htmlFor="challenge-phone"
                    className="mb-2 block text-[13px] font-semibold text-title"
                  >
                    {modal.inputLabel}
                  </label>
                  <input
                    id="challenge-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder={modal.placeholder}
                    aria-invalid={!!error}
                    aria-describedby={error ? "challenge-phone-error" : undefined}
                    className={`h-13 w-full rounded-xl border bg-[#101010] px-4 text-right text-[#f8f7f4] outline-none transition-colors placeholder:text-[#666] focus:ring-3 focus:ring-[rgba(185,162,120,0.1)] ${
                      error
                        ? "border-[#d36b6b] focus:border-[#d36b6b]"
                        : "border-white/15 focus:border-gold"
                    }`}
                  />

                  {error && (
                    <p
                      id="challenge-phone-error"
                      role="alert"
                      className="mt-2 text-[11px] leading-relaxed text-[#e18c8c]"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={busy}
                    className={`mt-4 ${primaryButton}`}
                  >
                    {busy && <LoaderCircle className="size-4 animate-spin" />}
                    {busy ? modal.sending : modal.submit}
                  </button>
                </form>

                {/* Subtext */}
                <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
                  {modal.subtext}
                </p>
              </>
            )}

            {step === "otp" && (
              <>
                {/* OTP form */}
                <p className="mt-6 text-[12px] leading-relaxed text-muted">
                  {sentBefore}
                  <span dir="ltr" className="mx-1 font-mono text-[#d6bd91]">
                    {phone}
                  </span>
                  {sentAfter}
                </p>

                <form onSubmit={handleVerify} noValidate className="mt-4">
                  <div
                    dir="ltr"
                    className="grid gap-2"
                    style={{ gridTemplateColumns: `repeat(${OTP_LENGTH}, minmax(0, 1fr))` }}
                  >
                    {code.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          inputsRef.current[i] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        autoComplete={i === 0 ? "one-time-code" : "off"}
                        maxLength={1}
                        value={digit}
                        disabled={busy}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        onPaste={handleOtpPaste}
                        aria-label={`رقم ${i + 1}`}
                        aria-invalid={!!otpError}
                        className={`h-14 w-full rounded-xl border bg-[#101010] text-center font-mono text-xl font-bold text-[#f8f7f4] caret-gold outline-none transition-colors focus:ring-3 focus:ring-[rgba(185,162,120,0.1)] disabled:opacity-60 ${
                          otpError
                            ? "border-[#d36b6b] focus:border-[#d36b6b]"
                            : "border-white/15 focus:border-gold"
                        }`}
                      />
                    ))}
                  </div>

                  {otpError && (
                    <p role="alert" className="mt-2 text-[11px] leading-relaxed text-[#e18c8c]">
                      {otpError}
                    </p>
                  )}

                  {/* Edit number / resend timer */}
                  <div className="mt-4 flex items-center justify-between text-[12px]">
                    <button
                      type="button"
                      onClick={() => setStep("phone")}
                      disabled={busy}
                      className="text-gold-2 transition-colors hover:text-gold disabled:opacity-50"
                    >
                      {otp.editNumber}
                    </button>
                    {secondsLeft > 0 ? (
                      <span dir="ltr" className="text-muted">
                        {otp.resendTimer.replace("{time}", timeLabel)}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={busy}
                        className="text-gold-2 transition-colors hover:text-gold disabled:opacity-50"
                      >
                        {otp.resend}
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={busy}
                    className={`mt-5 ${primaryButton}`}
                  >
                    {busy && <LoaderCircle className="size-4 animate-spin" />}
                    {busy ? otp.verifying : otp.submit}
                  </button>
                  {busy && (
                    <p className="mt-2 text-center text-[11px] text-muted">
                      {otp.slowHint}
                    </p>
                  )}
                </form>

                {/* Subtext — not received? → support */}
                <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
                  {otp.notReceived}{" "}
                  <a
                    href="#support"
                    onClick={() => setOpen(false)}
                    className="font-semibold text-gold-2 transition-colors hover:text-gold"
                  >
                    {otp.support}
                  </a>
                </p>
              </>
            )}

            {step === "retry" && (
              <div className="mt-6">
                {joinError && (
                  <p role="alert" className="text-[12px] leading-relaxed text-[#e18c8c]">
                    {joinError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleJoin}
                  disabled={busy}
                  className={`mt-4 ${primaryButton}`}
                >
                  {busy ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <RefreshCw className="size-4" />
                  )}
                  {busy ? otp.verifying : retry.submit}
                </button>
              </div>
            )}

            {step === "done" && (
              <div className="pt-2 text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[rgba(57,185,132,0.12)] text-[#39b984]">
                  <Check className="size-8" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-title">
                  {result?.message || done.title}
                </h2>
                {result?.account && (
                  <div className="mt-5 rounded-xl border border-white/10 bg-[#101010] p-4 text-right">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-[13px] font-bold text-title">
                        {KIND_LABELS[result.account.kind] ?? result.account.type}
                      </span>
                      <StatusBadge status={result.account.status} />
                    </div>
                    <AccountDetails account={result.account} />
                  </div>
                )}
                <p className="mt-4 text-[12px] leading-relaxed text-muted">
                  {done.subtext}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`mt-6 ${primaryButton}`}
                >
                  {done.cta}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
