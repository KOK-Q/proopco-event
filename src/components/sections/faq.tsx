import { Plus } from "lucide-react";
import { event } from "@/lib/event";

export function Faq() {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Questions, answered.
      </h2>

      <div className="mt-10 divide-y divide-border border-y border-border">
        {event.faqs.map((faq) => (
          <details key={faq.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium text-foreground">
              {faq.q}
              <Plus className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" />
            </summary>
            <p className="mt-3 leading-relaxed text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
