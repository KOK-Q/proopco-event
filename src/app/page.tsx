import { Header } from "@/components/Header/Header";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { Marquee } from "@/components/sections/marquee";
import { About } from "@/components/sections/about";
import { Agenda } from "@/components/sections/agenda";
import { Speakers } from "@/components/sections/speakers";
import { Register } from "@/components/sections/register";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Marquee />
        <About />
        <Agenda />
        <Speakers />
        <Register />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
