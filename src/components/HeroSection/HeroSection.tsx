import { ArrowLeft } from "lucide-react";
import { HeroStage } from "./HeroStage";

/** Hero copy — edit these strings. */
const hero = {
  eyebrow: "اسپانسر انحصاری همایش پارسیان بورس", // placeholder — the centered text under the logo boxes
  title: "مسیر ترید حرفه‌ای‌ را با پراپکو شروع کنید",
  description:
    "در چالش رایگان پراپکو شرکت کنید و با تجربه پراپ تریدینگ آشنایی بیشتری از این فضا پیدا کنید.",
  primaryCta: { label: "چالش رایگان", href: "#free-challenge" },
  secondaryCta: { label: "پراپ چیست؟", href: "#prop-info" },
  time: "چهارشنبه 6 آبان 1405",
  location: "مشهد هتل بین المللی میثاق "
};

export function HeroSection() {
  return (
    <section id="top" dir="rtl" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-texture opacity-60" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5.5 pb-20 pt-16 text-center sm:pt-24">
        {/* Floating logo boxes */}
        <HeroStage />

        {/* Centered text under the boxes */}
        <div className="mt-10 flex items-center justify-center gap-3 text-gold">
          <span className="h-px w-8 bg-linear-to-r from-transparent to-gold/60 sm:w-12" />
          <p className="text-base font-medium">{hero.eyebrow}</p>
          <span className="h-px w-8 bg-linear-to-l from-transparent to-gold/60 sm:w-12" />
        </div>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-title sm:text-5xl">
          {hero.title}
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-md">
          {hero.description}
        </p>

        {/* Buttons — in RTL the first child sits on the right */}
        <div dir="rtl" className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={hero.primaryCta.href}
            className="group inline-flex min-w-0 flex-auto items-center justify-center gap-2 rounded-2xl bg-gold-2 px-6 py-3.5 text-base font-bold text-[#100e09] transition-transform hover:-translate-y-0.5 sm:min-w-43 sm:flex-none"
          >
            {hero.primaryCta.label}
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex min-w-0 flex-auto items-center justify-center rounded-2xl border border-[rgba(185,162,120,0.5)] bg-transparent px-6 py-3.5 text-base font-bold text-[#D6BD90] transition-colors hover:bg-[rgba(185,162,120,0.1)] sm:min-w-43 sm:flex-none"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        {/* Time & location */}
        <p className="mt-6 font-mono text-sm text-muted">{`${hero.time.trim()} · ${hero.location.trim()}`}</p>
      </div>
    </section>
  );
}
