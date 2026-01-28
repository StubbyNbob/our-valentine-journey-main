import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface IntroSectionProps {
  onStart: () => void;
}

const IntroSection = ({ onStart }: IntroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
    setTimeout(() => setShowButton(true), 2500);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-8 sm:py-12 md:py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      {/* Ambient glow - responsive size */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full bg-rose/5 blur-3xl animate-pulse-glow" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-rose/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-2xl mx-auto w-full">
        {/* Heart icon - responsive size */}
        <div
          className={`mb-4 sm:mb-6 md:mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <Heart
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto text-rose fill-rose/20 animate-float"
            strokeWidth={1.5}
          />
        </div>

        {/* Main text - more responsive sizing */}
        <h1
          className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-wide mb-4 sm:mb-5 md:mb-6 leading-tight sm:leading-normal transition-all duration-1500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          <span className="text-gradient-rose block sm:inline">Let's take a walk</span>
          <br className="hidden sm:block" />
          <span className="text-foreground/90 italic block sm:inline mt-1 sm:mt-0">down memory lane...</span>
        </h1>

        <p
          className={`font-serif text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-12 transition-all duration-1500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          
        </p>

        {/* Start button - responsive sizing */}
        <div
          className={`transition-all duration-1000 ${
            showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="group relative px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 text-base sm:text-lg md:text-lg font-serif bg-gradient-to-r from-rose to-rose-glow hover:from-rose-glow hover:to-rose text-white border-0 rounded-full shadow-lg hover:shadow-rose/30 transition-all duration-500 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              <span className="whitespace-nowrap">Begin Our Journey</span>
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
