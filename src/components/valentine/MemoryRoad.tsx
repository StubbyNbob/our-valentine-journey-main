import { useRef, useEffect, useState } from "react";
import MemoryCard from "./MemoryCard";
import EmotionalText from "./EmotionalText";

// Placeholder memories - you'll replace these with actual photos
const memories = [
  {
    imageSrc: "/first.jpg",
    caption: "This day would always be special to me in more ways than one.",
    side: "left" as const,
  },
  {
    imageSrc: "/test2.mp4",
    caption: "Always trying to frame meee",
    side: "right" as const,
  },
  {
    imageSrc: "/date.jpg",
    caption: "Our *first* date not going to lie i was nervous af",
    side: "left" as const,
  },
  {
    imageSrc: "/promise.jpg",
    caption: "My promise to you, Always and Forever",
    side: "right" as const,
  },
  {
    imageSrc: "/Bubs.jpeg",
    caption: "My beautiful baby girl I would always love you and cherish you",
    side: "left" as const,
  },
  {
    imageSrc: "/birthday.jpeg",
    caption: "I would always look forward to your smiles and future moments like these",
    side: "right" as const,
  },
];

const emotionalTexts = [
  "Every moment with you feels like a beautiful dream...",
  "You make my heart smile in ways I never knew possible...",
  "With you, even ordinary days become extraordinary...",
];

const MemoryRoad = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const roadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (roadRef.current) {
        const rect = roadRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = roadRef.current.offsetHeight;

        const scrolled = -rect.top;
        const total = elementHeight - windowHeight;
        const progress = Math.max(0, Math.min(1, scrolled / total));

        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={roadRef} className="relative py-20 min-h-[300vh]">
      {/* Road visualization */}
      <div className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2">
        {/* Road base */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-muted/40 to-muted/20 rounded-full" />

        {/* Road glow based on scroll */}
        <div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-rose/50 via-rose/30 to-transparent rounded-full transition-all duration-100"
          style={{
            height: `${scrollProgress * 100}%`,
            boxShadow: "0 0 30px 10px hsl(var(--rose) / 0.2)",
          }}
        />

        {/* Road dots */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-muted/30 animate-road-glow"
            style={{
              top: `${(i + 1) * 5}%`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <div className="relative max-w-5xl mx-auto px-6">
        {memories.map((memory, index) => (
          <div key={index}>
            {/* Memory card */}
            <div
              className={`flex ${memory.side === "left" ? "justify-start" : "justify-end"
                } mb-8`}
            >
              <MemoryCard
                imageSrc={memory.imageSrc}
                caption={memory.caption}
                side={memory.side}
                delay={index * 100}
              />
            </div>

            {/* Emotional text between some memories */}
            {index === 1 && <EmotionalText text={emotionalTexts[0]} />}
            {index === 3 && <EmotionalText text={emotionalTexts[1]} />}
            {index === 5 && <EmotionalText text={emotionalTexts[2]} />}
          </div>
        ))}
      </div>

      {/* Ambient background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-rose/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MemoryRoad;
