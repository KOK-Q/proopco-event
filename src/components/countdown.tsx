"use client";

import { useEffect, useState } from "react";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Remaining {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

const UNITS: { key: keyof Remaining; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
];

export function Countdown({ startsAt }: { startsAt: string }) {
  const target = new Date(startsAt).getTime();
  // Start null so server and first client render match (avoids hydration mismatch).
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    setLeft(diff(target));
    const id = setInterval(() => setLeft(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <dl className="flex items-stretch gap-2 sm:gap-3" aria-label="Time until the summit begins">
      {UNITS.map(({ key, label }) => (
        <div
          key={key}
          className="flex min-w-[64px] flex-1 flex-col items-center rounded-lg border border-border bg-card px-3 py-3 sm:min-w-[80px]"
        >
          <dd className="font-mono text-3xl font-semibold tabular-nums text-foreground sm:text-4xl">
            {left ? pad(left[key]) : "––"}
          </dd>
          <dt className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
