import { ExternalLink, DollarSign, User, Clock } from "lucide-react";

/** About copy — edit these strings. */
const about = {
  title: "چرا پراپکو؟",
  description:
    "پراپکو با وجود حضور نه‌چندان طولانی خود در این حوزه، توانسته در کمتر از 3 سال به یکی از سه بازیگر اصلی تأمین سرمایه ترید در کشور تبدیل شود و آمار قابل توجهی را ثبت کند.",
  cards: [
    {
      icon: User,
      value: "+100",
      title: "هزار تریدر",
      description: "تجربه همکاری",
    },
    {
      icon: DollarSign,
      value: "+3M",
      title: "دلار",
      description: "پرداخت سود",
    },
    {
      icon: Clock,
      value: "48",
      title: "ساعت",
      description: "میانگین زمان پرداخت",
    },
  ],
  badges: [
    "سرور اختصاصی متاتریدر 5",
    "پلن‌ها و قوانین متنوع",
    "پشتیبانی سریع",
    "با پشتوانه صرافی کیف‌پول‌من",
  ],
  cta: { label: "آشنایی بیشتر با پراپکو", href: "https://proop.co" },
};

export function About() {
  return (
    <section
      id="about"
      dir="rtl"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-5.5 py-20 sm:py-28"
    >
      {/* Header */}
      <div className="max-w-2xl text-right">
        <h2 className="text-2xl font-bold tracking-tight text-title sm:text-xl">
          {about.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted text-[13px] sm:text-md">
          {about.description}
        </p>
      </div>

      {/* 3 cards */}
      <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
        {about.cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col items-start gap-2 rounded-2xl border border-white/10 bg-[#0e0e0e] p-3 text-right transition-colors hover:border-gold/40 sm:flex-row sm:items-start sm:gap-3"
          >
            <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-[rgba(185,162,120,0.1)] text-gold">
              <card.icon className="size-4" />
            </span>
            <div>
              <span className="block text-2xl font-extrabold text-[#d6bd91]">
                {card.value}
              </span>
              <h3 className="mt-0.5 text-[12px] font-semibold text-[#f8f7f4] sm:text-[13px]">
                {card.title}
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-muted sm:text-[12px]">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="mt-6 flex flex-wrap gap-2">
        {about.badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-[rgba(185,162,120,0.3)] bg-[#b9a2780d] px-4 py-1.5 text-[12px] font-medium text-[#d1cabc]"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* External CTA */}
      <div className="mt-8">
        <a
          href={about.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex w-full text-[15px] items-center justify-center gap-2 rounded-2xl border border-[rgba(185,162,120,0.5)] bg-transparent px-6 py-3.5 text-base font-semibold text-[#D6BD90] transition-colors hover:bg-[rgba(185,162,120,0.1)]"
        >
          {about.cta.label}
          <ExternalLink className="size-5 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
