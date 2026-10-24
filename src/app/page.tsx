import { Header } from "@/components/Header/Header";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { PropInfo } from "@/components/PropInfo/PropInfo";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PropInfo />
      </main>
    </>
  );
}
