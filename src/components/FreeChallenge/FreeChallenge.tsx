"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";

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
      // Shown after the request is submitted.
      dashboard: { label: "ورود به داشبورد", href: "https://proop.co/user" },
    },
  },
  subtext: "برای ثبت درخواست فقط شماره موبایل مورد نیاز است.",
  submitted: {
    title: "درخواست شما ثبت شد",
    description:
      "شماره‌ی {number} ثبت شد. پلن چالش در داشبورد پراپکو برای شما فعال خواهد شد.",
  },
  modal: {
    title: "درخواست چالش رایگان",
    description:
      "شماره موبایل خود را وارد کنید تا کد تأیید برایتان ارسال شود.",
    inputLabel: "شماره موبایل",
    placeholder: "09xxxxxxxxx",
    submit: "دریافت کد تأیید",
    error: "شماره‌ی موبایل باید 11 رقم باشد و با 09 شروع شود.",
    subtext:
      "پلن چالش پس از فعال‌سازی در داشبورد پراپکو برای همین شماره قرار می‌گیرد و اطلاع‌رسانی می‌شود.",
    otp: {
      title: "تأیید شماره موبایل",
      description: "برای ثبت نهایی درخواست، کد تأیید را وارد کنید.",
      sentTo: "کد ۵ رقمی به شماره‌ی {number} ارسال شد.",
      editNumber: "ویرایش شماره",
      resend: "ارسال مجدد کد",
      resendTimer: "ارسال مجدد کد تا {time}",
      submit: "تأیید و ثبت درخواست",
      error: "کد تأیید را کامل وارد کنید.",
      notReceived: "کد را دریافت نکردید؟",
      support: "ارتباط با پشتیبانی",
    },
    done: {
      title: "درخواستت ثبت شد",
      subtext:
        "پلن چالش رایگان پس از فعال‌سازی در داشبورد پراپکو برای همین شماره قرار می‌گیرد و از طریق پیامک به شما اطلاع‌رسانی می‌شود.",
      cta: "متوجه شدم",
    },
  },
};

const RESEND_SECONDS = 120; // 2-minute resend timer

export function FreeChallenge() {
  const { card, modal } = freeChallenge;
  const otp = modal.otp;
  const done = modal.done;

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"phone" | "otp" | "done">("phone");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

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

  const openModal = () => {
    setStep("phone");
    setError("");
    setOtpError("");
    setCode(["", "", "", "", ""]);
    setOpen(true);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^09\d{9}$/.test(phone)) {
      setError(modal.error);
      return;
    }
    setError("");
    setCode(["", "", "", "", ""]);
    setOtpError("");
    setSecondsLeft(RESEND_SECONDS);
    setStep("otp");
    // Interactive prototype — no real SMS is sent in this version.
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.join("").length < 5) {
      setOtpError(otp.error);
      return;
    }
    setOtpError("");
    setStep("done");
    setSubmitted(true);
    // Interactive prototype — no real verification in this version.
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setCode(["", "", "", "", ""]);
    setOtpError("");
    setSecondsLeft(RESEND_SECONDS);
    inputsRef.current[0]?.focus();
  };

  const handleOtpChange = (i: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    if (otpError) setOtpError("");
    if (digit && i < 4) inputsRef.current[i + 1]?.focus();
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
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
    if (!text) return;
    e.preventDefault();
    const next = ["", "", "", "", ""];
    text.split("").forEach((c, idx) => {
      next[idx] = c;
    });
    setCode(next);
    if (otpError) setOtpError("");
    inputsRef.current[Math.min(text.length, 4)]?.focus();
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const timeLabel = `${mm}:${ss}`;
  const [sentBefore, sentAfter] = otp.sentTo.split("{number}");
  const [submittedBefore, submittedAfter] =
    freeChallenge.submitted.description.split("{number}");

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

      {/* Submitted notice */}
      {submitted && (
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[rgba(57,185,132,0.35)] bg-[rgba(57,185,132,0.08)] p-4 text-right">
          <div className="flex size-9 flex-none items-center justify-center rounded-full bg-[rgba(57,185,132,0.15)] text-[#39b984]">
            <Check className="size-5" />
          </div>
          <div>
            <p className="font-vazir text-[14px] font-bold text-[#39b984]">
              {freeChallenge.submitted.title}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted">
              {submittedBefore}
              <span dir="ltr" className="mx-1 font-mono text-title">
                {phone}
              </span>
              {submittedAfter}
            </p>
          </div>
        </div>
      )}

      {/* Challenge card */}
      <div className={`${submitted ? "mt-4" : "mt-8"} overflow-hidden rounded-3xl border border-[rgba(185,162,120,0.3)] bg-[radial-gradient(circle_at_10%_10%,rgba(185,162,120,0.13),transparent_82%)] p-5 transition-colors hover:border-gold/40`}>
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
            {submitted ? (
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
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-2 px-6 py-3.5 text-base font-bold text-[#100e09] transition-transform hover:-translate-y-0.5"
              >
                {card.cta.label}
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
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
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="challenge-modal-title"
        >
          {/* Bottom sheet on mobile, centered dialog from sm up */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90dvh] w-full overflow-y-auto rounded-t-3xl border border-b-0 border-white/13 bg-[#171716] p-5 pb-[calc(2.5rem+env(safe-area-inset-bottom))] text-right shadow-[0_-14px_50px_rgba(0,0,0,0.45)] animate-in slide-in-from-bottom duration-300 ease-out motion-reduce:animate-none sm:max-w-md sm:rounded-3xl sm:border-b sm:p-6 sm:fade-in sm:zoom-in-95 sm:slide-in-from-bottom-0 sm:duration-200"
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
                    {step === "phone" ? modal.title : otp.title}
                  </h2>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted">
                    {step === "phone" ? modal.description : otp.description}
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="بستن"
                className="flex size-9 flex-none items-center justify-center rounded-xl border border-white/10 text-muted transition-colors hover:text-title"
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
                      className="mt-2 text-[11px] leading-relaxed text-[#e18c8c]"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-2 px-6 py-3.5 text-base font-bold text-[#100e09] transition-transform hover:-translate-y-0.5"
                  >
                    {modal.submit}
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
                  <div dir="ltr" className="grid grid-cols-5 gap-2">
                    {code.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          inputsRef.current[i] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        onPaste={handleOtpPaste}
                        aria-label={`رقم ${i + 1}`}
                        aria-invalid={!!otpError}
                        className={`h-14 w-full rounded-xl border bg-[#101010] text-center font-mono text-xl font-bold text-[#f8f7f4] caret-gold outline-none transition-colors focus:ring-3 focus:ring-[rgba(185,162,120,0.1)] ${
                          otpError
                            ? "border-[#d36b6b] focus:border-[#d36b6b]"
                            : "border-white/15 focus:border-gold"
                        }`}
                      />
                    ))}
                  </div>

                  {otpError && (
                    <p className="mt-2 text-[11px] leading-relaxed text-[#e18c8c]">
                      {otpError}
                    </p>
                  )}

                  {/* Edit number / resend timer */}
                  <div className="mt-4 flex items-center justify-between text-[12px]">
                    <button
                      type="button"
                      onClick={() => setStep("phone")}
                      className="text-gold-2 transition-colors hover:text-gold"
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
                        className="text-gold-2 transition-colors hover:text-gold"
                      >
                        {otp.resend}
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-2 px-6 py-3.5 text-base font-bold text-[#100e09] transition-transform hover:-translate-y-0.5"
                  >
                    {otp.submit}
                  </button>
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

            {step === "done" && (
              <div className="pt-2 text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[rgba(57,185,132,0.12)] text-[#39b984]">
                  <Check className="size-8" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-title">
                  {done.title}
                </h2>
                <p className="mt-2 font-vazir text-[12px] leading-relaxed text-muted">
                  {done.subtext}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-2 px-6 py-3.5 text-base font-bold text-[#100e09] transition-transform hover:-translate-y-0.5"
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
