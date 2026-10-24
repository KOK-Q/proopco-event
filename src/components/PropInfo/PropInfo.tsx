/** PropInfo copy — edit these strings. */
const propInfo = {
  title: "پراپ تریدینگ چیست؟",
  description:
    "پراپ تریدینگ یعنی ترید با سرمایه یک شرکت مالی به جای سرمایه شخصی. برای معامله‌گرانی که مهارت و توانایی قابل قبولی دارند اما سرمایه کافی برای ترید در فارکس را ندارند، شرکت‌های پراپ‌فرم فضایی را ایجاد کردند که افراد می‌توانند مهارت خود در ترید فارکس را اثبات کنند و سرمایه مورد نیازشان را دریافت کنند و در سود حاصل شده با یکدیگر شریک باشند.",
  cards: [
    {
      number: "1",
      title: "سرمایه مورد نیازتان را در قالب چالش ارزیابی خریداری کنید",
      description:
        "مهارت معامله‌گری خود را در یک محیط واقعی و بدون ریسک محک بزنید.",
    },
    {
      number: "2",
      title: "چالش ارزیابی را با موفقیت پاس کنید",
      description:
        "ریسک خود را کنترل و به حد سود برسید تا بتوانید چالش  خود را باموفقیت پاس کنید.",
    },
    {
      number: "3",
      title: "بالانس ریل خود را دریافت کنید و سهم سود خودتان را داشته باشید",
      description:
        "می‌توانید مادام‌العمر بالانس ریل را به شرط حفظ عملکرد خود داشته باشید.",
    },
  ],
};

export function PropInfo() {
  return (
    <section
      id="prop-info"
      dir="rtl"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-5.5 py-20 sm:py-28"
    >
      {/* Header */}
      <div className="max-w-2xl text-right">
        <h2 className="text-2xl font-bold tracking-tight text-title sm:text-xl">
          {propInfo.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted text-[13px] sm:text-md">
          {propInfo.description}
        </p>
      </div>

      {/* 3 cards */}
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {propInfo.cards.map((card) => (
          <div
            key={card.number}
            className="flex h-28 items-start gap-3 rounded-2xl border border-white/10 bg-[#0e0e0e] p-3 text-right transition-colors hover:border-gold/40"
          >
            <span className="flex size-6 flex-none items-center justify-center rounded-md bg-[rgba(185,162,120,0.1)] text-sm font-bold text-gold">
              {card.number}
            </span>
            <div>
              <h3 className="text-[13px] font-semibold text-title">{card.title}</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
