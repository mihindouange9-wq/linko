import SiteHeader from "@/components/SiteHeader";
import ThumbIndex from "@/components/ThumbIndex";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import MatchSequence from "@/components/MatchSequence";
import Method from "@/components/Method";
import Trades from "@/components/Trades";
import Trust from "@/components/Trust";
import ProductApp from "@/components/ProductApp";
import ForPros from "@/components/ForPros";
import Pricing from "@/components/Pricing";
import ForBusiness from "@/components/ForBusiness";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <ThumbIndex />
      <main id="contenu">
        <Hero />
        <Problem />
        <MatchSequence />
        <Method />
        <Trades />
        <Trust />
        <ProductApp />
        <ForPros />
        <Pricing />
        <ForBusiness />
        <FinalCta />
      </main>
    </>
  );
}
