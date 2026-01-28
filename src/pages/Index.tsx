import { useState, useRef } from "react";
import IntroSection from "@/components/valentine/IntroSection";
import MemoryRoad from "@/components/valentine/MemoryRoad";
import PoemSection from "@/components/valentine/PoemSection";
import FinalReveal from "@/components/valentine/FinalReveal";

const Index = () => {
  const [journeyStarted, setJourneyStarted] = useState(false);
  const journeyRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setJourneyStarted(true);
    setTimeout(() => {
      journeyRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="relative bg-background min-h-screen scroll-snap-container">
      {/* Intro Section */}
      <IntroSection onStart={handleStart} />

      {/* Journey content - shown after start */}
      <div
        ref={journeyRef}
        className={`transition-opacity duration-1000 ${
          journeyStarted ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Memory Road with photos */}
        <MemoryRoad />

        {/* Poem Section */}
        <PoemSection />

        {/* Final Valentine Reveal */}
        <FinalReveal />
      </div>

      {/* Global ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top vignette */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />
        
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>
    </main>
  );
};

export default Index;
