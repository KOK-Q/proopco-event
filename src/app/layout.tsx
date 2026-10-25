import type { Metadata } from "next";
import { Geist_Mono, Poppins, Vazirmatn } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { event } from "@/lib/event";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Landing font stack: Poppins → Peyda → YekanBakh → Vazirmatn → Tahoma
// (assembled in globals.css). Fallback adjustment is off on the local fonts
// so Persian glyphs fall through the stack instead of hitting Arial.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const peyda = localFont({
  variable: "--font-peyda",
  adjustFontFallback: false,
  src: [
    { path: "./fonts/peyda/PeydaWeb-Regular.woff", weight: "400" },
    { path: "./fonts/peyda/PeydaWeb-Medium.woff", weight: "500" },
    { path: "./fonts/peyda/PeydaWeb-SemiBold.woff", weight: "600" },
    { path: "./fonts/peyda/PeydaWeb-Bold.woff", weight: "700" },
    { path: "./fonts/peyda/PeydaWeb-ExtraBold.woff", weight: "800" },
  ],
});

const yekanBakh = localFont({
  variable: "--font-yekan-bakh",
  adjustFontFallback: false,
  src: [
    { path: "./fonts/yekanbakh/YekanBakh-Regular.woff", weight: "400" },
    { path: "./fonts/yekanbakh/YekanBakh-Bold.woff", weight: "700" },
    { path: "./fonts/yekanbakh/YekanBakh-ExtraBold.woff", weight: "800" },
  ],
});

// Poppins limited to 0-9, prepended to the other stacks so every number
// renders in Poppins whatever font the surrounding text uses.
const poppinsDigits = localFont({
  variable: "--font-poppins-digits",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0030-0039" }],
  preload: false,
  src: [
    { path: "./fonts/poppins/Poppins-Regular.woff", weight: "400" },
    { path: "./fonts/poppins/Poppins-Medium.woff", weight: "500" },
    { path: "./fonts/poppins/Poppins-SemiBold.woff", weight: "600" },
    { path: "./fonts/poppins/Poppins-Bold.woff", weight: "700" },
    { path: "./fonts/poppins/Poppins-ExtraBold.woff", weight: "800" },
  ],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: `${event.name}`,
  description: event.description,
  openGraph: {
    title: `${event.name}`,
    description: event.description,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${poppins.variable} ${peyda.variable} ${yekanBakh.variable} ${poppinsDigits.variable} ${vazirmatn.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
