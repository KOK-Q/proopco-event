"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { event } from "@/lib/event";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2 font-display">
          <span className="text-lg font-extrabold tracking-tight">proop</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
            / summit
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {event.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#register"
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get tickets
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background md:hidden",
          open ? "max-h-80" : "max-h-0 border-t-0",
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {event.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-base text-foreground hover:bg-secondary"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg bg-foreground px-4 py-2.5 text-center text-sm font-medium text-background"
          >
            Get tickets
          </a>
        </div>
      </div>
    </header>
  );
}
