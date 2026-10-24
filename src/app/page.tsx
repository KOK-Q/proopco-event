import { Header } from "@/components/Header/Header";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { PropInfo } from "@/components/PropInfo/PropInfo";
import { FreeChallenge } from "@/components/FreeChallenge/FreeChallenge";
import { About } from "@/components/About/About";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PropInfo />
        <FreeChallenge />
        <About />
      </main>
    </>
  );
}
