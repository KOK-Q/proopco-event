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
  location: "مشهد هتل بین‌المللی میثاق"
};

export function HeroSection() {
  return (
    <section id="top" dir="rtl" className="hero relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60" />
      <HeroStage />
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5.5 pb-20 pt-16 text-center sm:pt-24">
        {/* Floating logo boxes */}
       

        {/* Centered text — pulled up over the empty lower part of the stage */}
        <div className="relative z-10 -mt-30 flex items-center justify-center gap-1 text-gold sm:-mt-28">
          <span className="h-px w-8 bg-linear-to-r from-transparent to-gold/60 sm:w-12" />
          <p className="text-sm font-medium">{hero.eyebrow}</p>
          <span className="h-px w-8 bg-linear-to-l from-transparent to-gold/60 sm:w-12" />
        </div>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-bold leading-10 lg:leading-20 tracking-tight text-title sm:text-5xl  w-60 lg:w-full height-2">
          {hero.title}
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-xl leading-relaxed text-muted text-sm">
          {hero.description}
        </p>

        {/* Buttons — in RTL the first child sits on the right */}
        <div dir="rtl" className="mt-8 flex w-full items-center gap-2">
          <a
            href={hero.primaryCta.href}
            className="font-button group inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl bg-gold-2 px-6 py-3.5 text-base font-bold text-[#100e09] transition-transform hover:-translate-y-0.5"
          >
            {hero.primaryCta.label}
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </a>
          <a
            href={hero.secondaryCta.href}
            className="font-button inline-flex min-w-0 flex-1 items-center justify-center rounded-2xl border border-[rgba(185,162,120,0.5)] bg-transparent px-3 py-3.5 text-base font-bold text-[#D6BD90] transition-colors hover:bg-[rgba(185,162,120,0.1)]"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        {/* Time & location */}
        <p className="mt-6 font-mono text-[11px] text-muted">{`${hero.time.trim()}·${hero.location.trim()}`}</p>
      </div>
    </section>
  );
}
