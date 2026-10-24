import { event } from "@/lib/event";
import { cn } from "@/lib/utils";

export function Agenda() {
  return (
    <section id="agenda" className="scroll-mt-20 border-y border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">The day</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              One room. One track. Twelve talks.
            </h2>
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            {event.dayLabel} · {event.timeLabel}
          </p>
        </div>

        <ol className="mt-12">
          {event.agenda.map((slot, i) => {
            const isBreak = slot.kind === "break";
            return (
              <li
                key={i}
                className={cn(
                  "group grid grid-cols-[68px_1fr] items-baseline gap-4 border-t border-border py-4 sm:grid-cols-[110px_1fr] sm:gap-8 sm:py-5",
                  i === event.agenda.length - 1 && "border-b",
                )}
              >
                <span className="font-mono text-sm text-muted-foreground sm:text-base">
                  {slot.time}
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3
                    className={cn(
                      "font-display text-lg font-semibold sm:text-xl",
                      isBreak ? "text-muted-foreground" : "text-foreground",
                    )}
                  >
                    {slot.title}
                  </h3>
                  {slot.speaker && (
                    <span
                      className={cn(
                        "text-sm",
                        isBreak ? "text-muted-foreground" : "text-primary",
                      )}
                    >
                      {slot.speaker}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
