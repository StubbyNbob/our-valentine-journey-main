import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, Sparkles } from "lucide-react";
import HeartConfetti from "./HeartConfetti";

const FinalReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 500);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAnswer = () => {
    setIsDialogOpen(false);
    setShowConfetti(true);
    setTimeout(() => setAnswered(true), 500);
  };

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden"
    >
      {/* Grand glow background */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-burgundy/20 via-background to-background" />

      {/* Central glow */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full transition-all duration-2000",
          isVisible ? "glow-rose opacity-100" : "opacity-0"
        )}
      />

      {/* Sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-golden/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 8 + Math.random() * 16,
              height: 8 + Math.random() * 16,
              animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <HeartConfetti isActive={showConfetti} />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {!answered ? (
          <>
            {/* Clickable Valentine Card */}
            <div
              className={cn(
                "transition-all duration-1500 cursor-pointer",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              onClick={handleCardClick}
            >
              <div className="relative group">
                {/* Card container */}
                <div className="relative bg-warm-cream p-8 md:p-12 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 border-2 border-rose/20">
                  {/* Decorative tape */}
                  <div className="absolute -top-4 left-8 w-16 h-8 bg-warm-cream/80 rounded-sm rotate-[-5deg] shadow-md" />
                  <div className="absolute -top-4 right-8 w-16 h-8 bg-warm-cream/80 rounded-sm rotate-[5deg] shadow-md" />

                  {/* Card content */}
                  <div className="relative z-10">
                    <Heart
                      className="w-16 h-16 mx-auto mb-6 text-rose fill-rose/20 animate-float group-hover:fill-rose/40 transition-all"
                      strokeWidth={1}
                    />

                    <p className="font-serif text-xl md:text-2xl text-deep-burgundy/90 italic mb-4">
                      Click to open...
                    </p>

                    <div className="flex justify-center items-center gap-2 text-rose/60">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                      <span className="font-display text-lg text-deep-burgundy/70">
                        A special message awaits
                      </span>
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-lg bg-rose/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              </div>
            </div>

            {/* Dialog for the question */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-md bg-warm-cream border-2 border-rose/30 rounded-lg shadow-2xl">
                <DialogHeader className="text-center space-y-4">
                  <Heart
                    className="w-16 h-16 mx-auto text-rose fill-rose/30 animate-float"
                    strokeWidth={1}
                  />
                  <DialogTitle className="font-display text-3xl md:text-4xl font-light tracking-wide text-deep-burgundy">
                    <span className="text-gradient-rose">Will you be</span>
                    <br />
                    <span className="text-gradient-golden">my Valentine?</span>
                  </DialogTitle>
                  <DialogDescription className="font-serif text-base text-deep-burgundy/70 pt-2">
                    I've been waiting so long to ask you this special question...
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <Button
                    onClick={handleAnswer}
                    size="lg"
                    className="group w-full sm:w-auto px-8 py-6 text-lg font-serif bg-gradient-to-r from-rose to-rose-glow hover:from-rose-glow hover:to-rose text-white border-0 rounded-full shadow-lg hover:shadow-rose/40 transition-all duration-500 hover:scale-105"
                  >
                    <Heart className="w-5 h-5 mr-2 group-hover:scale-125 transition-transform fill-white/30" />
                    Yes ❤️
                  </Button>

                  <Button
                    onClick={handleAnswer}
                    size="lg"
                    className="group w-full sm:w-auto px-8 py-6 text-lg font-serif bg-gradient-to-r from-soft-pink to-blush hover:from-blush hover:to-soft-pink text-deep-burgundy border-0 rounded-full shadow-lg hover:shadow-soft-pink/40 transition-all duration-500 hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5 mr-2 group-hover:scale-125 transition-transform" />
                    Of course 💕
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          /* Celebration message */
          <div className="animate-fade-in-scale">
            <Heart
              className="w-24 h-24 mx-auto mb-8 text-rose fill-rose animate-float"
              strokeWidth={1}
            />

            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-gradient-rose mb-8">
              Thank You for always sticking it out with me, Through the good and the bad.
            </h2>

            <p className="font-serif text-xl md:text-2xl text-foreground/80 italic mb-8">
              I Love You
            </p>

            <div className="flex justify-center gap-3">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-8 h-8 text-rose fill-rose/60 animate-float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FinalReveal;
