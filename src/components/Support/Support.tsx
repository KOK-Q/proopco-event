import { Phone, MapPin } from "lucide-react";

/** Support copy — edit these strings. */
const support = {
  title: "پشتیبانی پراپکو",
  description:
    "اگر درباره پراپ یا چالش رایگان سوالی دارید، از راه‌های زیر با پشتیبانی پراپکو ارتباط بگیرید.",
  cards: [
    {
      icon: MapPin,
      title: "غرفه همایش",
      description: "برای راهنمایی‌های لازم به غرفه پراپکو مراجعه کنید.",
    },
    {
      icon: Phone,
      title: "تماس تلفنی",
      phones: [
        { label: "021 9109 8999", href: "tel:+982191098999" },
        { label: "051 3605 6060", href: "tel:+985136056060" },
      ],
    },
  ],
  subtext: "پشتیبانی تلفنی هر روز از ساعت 10 تا 22 پاسخگو است.",
};

export function Support() {
  return (
    <section
      id="support"
      dir="rtl"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-5.5 py-14 lg:py-18"
    >
      {/* Header */}
      <div className="max-w-2xl text-right">
        <h2 className="text-2xl font-bold tracking-tight text-title sm:text-xl">
          {support.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted text-[13px] sm:text-md">
          {support.description}
        </p>
      </div>

      {/* 2 cards */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {support.cards.map((card) => (
          <div
            key={card.title}
            className="flex gap-3 rounded-2xl border border-white/10 bg-[#0e0e0e] p-3 text-right transition-colors hover:border-gold/40"
          >
            <span className="flex size-10 flex-none items-center justify-center rounded-xl bg-[rgba(185,162,120,0.1)] text-gold">
              <card.icon className="size-5" />
            </span>
            <div>
              <h3 className="text-[13px] font-semibold text-[#f8f7f4]">
                {card.title}
              </h3>
              {card.phones ? (
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {card.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      dir="ltr"
                      className="inline-flex items-center gap-1.5 self-end text-[10px] font-semibold text-[#d6bd91] transition-colors hover:text-gold"
                    >
                      <Phone className="size-4" />
                      {phone.label}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="font-vazir text-[11px] leading-relaxed text-muted">
                  {card.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Subtext */}
      <p className="mt-4 text-center text-[10px] text-muted">
        {support.subtext}
      </p>
    </section>
  );
}
