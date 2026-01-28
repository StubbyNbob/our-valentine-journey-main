import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

const poemLines = [
  "Her eyes, a depth so vast, untold,",
  "Not like the ocean's endless fold,",
  "",
  "But in their gaze, I lose my way,",
  "A quiet storm that sweeps the day.",
  "",
  "Those brown, sweet pools, where warmth resides,",
  "A place where all my hope confides.",
  "Not ocean’s waves that crash and roar,",
  "But in her glance, I find my shore.",
  "",
  "Her skin, a softness like a dream,",
  "A touch that glows in moonlight’s beam,",
  "Like silken threads that softly glide,",
  "I feel them brush my soul inside.",
  "",
  "And when she smiles, the world stands still,",
  "A fluttering breath, a heart's sweet thrill,",
  "A rhythm lost in time and space,",
  "I find my peace in her embrace.",
  "",
  "She is the muse, the spark, the fire,",
  "The quiet joy, my deep desire,",
  "In every glance, in every beat,",
  "A love that makes my heart complete.",
];

const PoemSection = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (isInView) {
      poemLines.forEach((_, index) => {
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, index]);
        }, index * 600);
      });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-32 px-6"
    >
      {/* Soft ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      {/* Gentle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-rose/5 blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Decorative heart */}
        <div
          className={cn(
            "mb-12 transition-all duration-1000",
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
        >
          <Heart
            className="w-10 h-10 mx-auto text-rose/60 fill-rose/20"
            strokeWidth={1}
          />
        </div>

        {/* Poem lines */}
        <div className="space-y-4">
          {poemLines.map((line, index) => (
            <p
              key={index}
              className={cn(
                "font-display text-xl md:text-2xl lg:text-3xl font-light transition-all duration-1000",
                line === "" ? "h-6" : "",
                visibleLines.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                color: line ? "hsl(var(--foreground) / 0.9)" : "transparent",
              }}
            >
              {line || " "}
            </p>
          ))}
        </div>

        {/* Decorative dots */}
        <div
          className={cn(
            "mt-16 flex justify-center gap-3 transition-all duration-1000",
            visibleLines.length === poemLines.length
              ? "opacity-100"
              : "opacity-0"
          )}
          style={{ transitionDelay: "0.5s" }}
        >
          <span className="w-2 h-2 rounded-full bg-rose/40" />
          <span className="w-2 h-2 rounded-full bg-rose/60" />
          <span className="w-2 h-2 rounded-full bg-rose/40" />
        </div>
      </div>
    </section>
  );
};

export default PoemSection;
