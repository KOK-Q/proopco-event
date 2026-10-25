import Image from "next/image";

/**
 * Sticky site header. Stays pinned to the top of the viewport while scrolling
 * (`sticky top-0`) and sits above page content (`z-50`) with a translucent,
 * blurred background. Layout is a simple `justify-between` row:
 * text on the left, logo on the right. 22px side padding (`px-[22px]`).
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-navbar backdrop-blur-md">
      <nav className="flex h-16 w-full items-center justify-between px-5.5">
        <span dir="rtl" className="text-xs font-extrabold text-muted sm:text-sm">
          چرا حرفه‌ای‌ها در بازارهای مالی ضرر می‌کنند؟
        </span>

        <a href="#top" aria-label="Home">
          <Image
            src="/logo-type.svg"
            alt="Proop"
            width={133}
            height={36}
            priority
            className="h-6 w-auto sm:h-9"
          />
        </a>
      </nav>
    </header>
  );
}
