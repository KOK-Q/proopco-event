import { event } from "@/lib/event";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="#top" className="flex items-baseline gap-2 font-display">
              <span className="text-xl font-extrabold tracking-tight">proop</span>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                / summit
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {event.name} — {event.tagline}. {event.dateLabel}, {event.venue}, {event.city}.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href={`mailto:${event.social.email}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {event.social.email}
            </a>
            <div className="flex gap-5">
              <a
                href={event.social.twitter}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Twitter
              </a>
              <a
                href={event.social.linkedin}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© 2026 proop.co</span>
          <span>Built with Next.js · See you in {event.city.split(",")[0]}</span>
        </div>
      </div>
    </footer>
  );
}
