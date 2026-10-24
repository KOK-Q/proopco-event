import { ArrowLeft } from "lucide-react";

/** FreeChallenge copy — edit these strings. */
const freeChallenge = {
  title: "چالش رایگان، هدیه پراپکو برای همایش پارسیان بورس",
  description:
    "به مناسبت حضورتان در همایش می‌توانید تجربه رایگان پراپ تریدینگ را داشته باشید.",
  card: {
    name: "چالش با بالانس 10K",
    balanceDesc: "این بالانس را از پراپکو دریافت کنید، به حد سود 10 درصد برسید، یک پراپ رایگان از طرف پراپکو دریافت می‌کنید.",
    cta: { label: " درخواست چالش رایگان", href: "#register" },
  },
  subtext: "برای ثبت درخواست فقط شماره موبایل مورد نیاز است.",
};

export function FreeChallenge() {
  const { card } = freeChallenge;

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
            <a
              href={card.cta.href}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-2 px-6 py-3.5 text-base font-bold text-[#100e09] transition-transform hover:-translate-y-0.5"
            >
              {card.cta.label}
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            </a>
            <p className="mt-3 text-center text-[10px] text-muted">
              {freeChallenge.subtext}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
