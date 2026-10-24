"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";

/** FreeChallenge copy — edit these strings. */
const freeChallenge = {
  title: "چالش رایگان، هدیه پراپکو برای همایش پارسیان بورس",
  description:
    "به مناسبت حضورتان در همایش می‌توانید تجربه رایگان پراپ تریدینگ را داشته باشید.",
  card: {
    name: "چالش با بالانس 10K",
    balanceDesc: "این بالانس را از پراپکو دریافت کنید، به حد سود 10 درصد برسید، یک پراپ رایگان از طرف پراپکو دریافت می‌کنید.",
    cta: { label: " درخواست چالش رایگان" },
  },
  subtext: "برای ثبت درخواست فقط شماره موبایل مورد نیاز است.",
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
  },
};

export function FreeChallenge() {
  const { card, modal } = freeChallenge;
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^09\d{9}$/.test(phone)) {
      setError(modal.error);
      return;
    }
    setError("");
    // Interactive prototype — no real submission in this version.
  };

  return (
    <section
      id="free-challenge"
      dir="rtl"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-5.5 py-20 sm:py-28"
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

      {/* Challenge card */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-[rgba(185,162,120,0.3)] bg-[radial-gradient(circle_at_10%_10%,rgba(185,162,120,0.13),transparent_82%)] p-5 transition-colors hover:border-gold/40">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Right column: balance + specs */}
          <div className="text-right">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-semibold text-title">{card.name}</h3>
            </div>

            <p className="mt-6 text-[13px] text-muted">{card.balanceDesc}</p>
          </div>

          {/* Left column: CTA + subtext */}
          <div className="flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setError("");
                setOpen(true);
              }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-2 px-6 py-3.5 text-base font-bold text-[#100e09] transition-transform hover:-translate-y-0.5"
            >
              {card.cta.label}
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            </button>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 p-3 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="challenge-modal-title"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-white/13 bg-[#171716] p-5 text-right shadow-[0_-14px_50px_rgba(0,0,0,0.45)] sm:p-6"
          >
            {/* Head */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="challenge-modal-title"
                  className="text-xl font-bold text-title"
                >
                  {modal.title}
                </h2>
                <p className="mt-2 text-[11px] leading-relaxed text-muted">
                  {modal.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="بستن"
                className="flex size-9 flex-none items-center justify-center rounded-xl border border-white/10 text-muted transition-colors hover:text-title"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="mt-6">
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
          </div>
        </div>
      )}
    </section>
  );
}
