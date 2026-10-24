import { event } from "@/lib/event";

export function Marquee() {
  const items = [...event.topics, ...event.topics];
  return (
    <section
      aria-hidden
      className="border-y border-border bg-foreground py-4 text-background"
    >
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {items.map((topic, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-lg font-medium">
            {topic}
            <span className="text-accent">✳</span>
          </span>
        ))}
      </div>
    </section>
  );
}
