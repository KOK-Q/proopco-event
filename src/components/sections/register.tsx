import { Check } from "lucide-react";
import { event } from "@/lib/event";
import { cn } from "@/lib/utils";

export function Register() {
  return (
    <section id="register" className="scroll-mt-20 border-t border-border bg-foreground text-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Register</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Grab a seat before early birds sell out.
          </h2>
          <p className="mt-4 text-lg text-background/70">
            {event.dateLabel} · {event.venue}, {event.city}. One ticket, the whole day.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {event.tickets.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "flex flex-col rounded-2xl border p-7",
                tier.featured
                  ? "border-accent bg-accent/10 ring-1 ring-accent"
                  : "border-background/15 bg-background/[0.04]",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
                {tier.featured && (
                  <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-foreground">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-5 font-display text-4xl font-extrabold tracking-tight">
                {tier.price}
              </p>
              <p className="mt-1 text-sm text-background/60">{tier.note}</p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm text-background/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {perk}
                  </li>
                ))}
              </ul>

              <a
                href={`mailto:${event.social.email}?subject=${encodeURIComponent(
                  `${event.name} — ${tier.name} ticket`,
                )}`}
                className={cn(
                  "mt-7 rounded-lg px-5 py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90",
                  tier.featured
                    ? "bg-accent text-accent-foreground"
                    : "bg-background text-foreground",
                )}
              >
                Select {tier.name}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-background/50">
          Checkout is a placeholder — wire it to your payment or registration provider in{" "}
          <span className="text-background/70">src/components/sections/register.tsx</span>.
        </p>
      </div>
    </section>
  );
}
