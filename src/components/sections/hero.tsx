import { ArrowRight, MapPin } from "lucide-react";
import { Countdown } from "@/components/countdown";
import { event } from "@/lib/event";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-texture opacity-70" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 22%, transparent), transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:pt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {event.dateLabel}
          <span className="text-border">·</span>
          {event.city}
        </div>

        <h1 className="mt-7 max-w-4xl font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          The build conference for people{" "}
          <span className="relative whitespace-nowrap text-primary">
            shipping
            <svg
              className="absolute -bottom-2 left-0 w-full text-accent"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path d="M1 7 Q 50 1 99 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>{" "}
          what&apos;s next.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {event.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#register"
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Get your ticket
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#agenda"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3.5 text-base font-medium text-foreground transition-colors hover:border-foreground/30"
          >
            See the agenda
          </a>
          <span className="inline-flex items-center gap-1.5 pl-1 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {event.venue}
          </span>
        </div>

        <div className="mt-14 max-w-xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Doors open in
          </p>
          <Countdown startsAt={event.startsAt} />
        </div>
      </div>
    </section>
  );
}
