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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose/5 blur-3xl animate-pulse-glow" />
      
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

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Heart icon */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <Heart
            className="w-16 h-16 mx-auto text-rose fill-rose/20 animate-float"
            strokeWidth={1.5}
          />
        </div>

        {/* Main text */}
        <h1
          className={`font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6 transition-all duration-1500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          <span className="text-gradient-rose">Let's take a walk</span>
          <br />
          <span className="text-foreground/90 italic">down memory lane...</span>
        </h1>

        <p
          className={`font-serif text-lg md:text-xl text-muted-foreground mb-12 transition-all duration-1500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          
        </p>

        {/* Start button */}
        <div
          className={`transition-all duration-1000 ${
            showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="group relative px-10 py-6 text-lg font-serif bg-gradient-to-r from-rose to-rose-glow hover:from-rose-glow hover:to-rose text-white border-0 rounded-full shadow-lg hover:shadow-rose/30 transition-all duration-500"
          >
            <span className="relative z-10 flex items-center gap-3">
              Begin Our Journey
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
