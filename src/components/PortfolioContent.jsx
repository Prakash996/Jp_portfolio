import ParticleBackground from "./ParticleBackground";
import Header from "./Header";
import MainBody from "./MainBody";
import FooterSection from "@/components/FooterSection"

export default function PortfolioContent() {
  return (
    <main id="portfolio" className="app-shell">
      <Header />
      <ParticleBackground>
        <MainBody />
      </ParticleBackground>
      <FooterSection/>
    </main>
  );
}
