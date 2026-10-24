import { event } from "@/lib/event";

export function Speakers() {
  return (
    <section id="speakers" className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">On stage</p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          People who are currently building, not just talking.
        </h2>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {event.speakers.map((speaker) => (
          <li
            key={speaker.name}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div className="flex size-14 items-center justify-center rounded-lg bg-primary/10 font-display text-lg font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              {speaker.initials}
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
              {speaker.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{speaker.role}</p>
          </li>
        ))}
      </ul>

      <p className="mt-8 font-mono text-sm text-muted-foreground">
        + more speakers announced soon.
      </p>
    </section>
  );
}
