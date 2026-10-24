import { Header } from "@/components/Header/Header";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { PropInfo } from "@/components/PropInfo/PropInfo";
import { FreeChallenge } from "@/components/FreeChallenge/FreeChallenge";
import { About } from "@/components/About/About";
import { Support } from "@/components/Support/Support";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PropInfo />
        <FreeChallenge />
        <About />
        <Support />
      </main>
      <Footer />
    </>
  );
}
