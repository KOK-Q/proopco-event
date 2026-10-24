import { event } from "@/lib/event";

export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {event.about.kicker}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {event.about.heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {event.about.body}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8">
            {event.stats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-4xl font-extrabold tracking-tight text-primary">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <ul className="flex flex-col gap-4">
          {event.about.points.map((point, i) => (
            <li
              key={point.title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="font-mono text-sm text-muted-foreground">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
