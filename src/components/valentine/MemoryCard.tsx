import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MemoryCardProps {
  imageSrc: string;
  caption: string;
  side: "left" | "right";
  delay?: number;
}

const MemoryCard = ({ imageSrc, caption, side, delay = 0 }: MemoryCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative group cursor-pointer transition-all duration-1000",
        side === "left" ? "self-start" : "self-end",
        isVisible
          ? side === "left"
            ? "opacity-100 translate-x-0"
            : "opacity-100 translate-x-0"
          : side === "left"
          ? "opacity-0 -translate-x-20"
          : "opacity-0 translate-x-20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
    >
      {/* Polaroid style card */}
      <div
        className={cn(
          "relative bg-warm-cream p-3 pb-16 rounded-sm memory-card-shadow transition-all duration-500",
          "transform hover:scale-105 hover:-rotate-1",
          side === "left" ? "rotate-[-3deg]" : "rotate-[3deg]"
        )}
        style={{
          transform: isHovered
            ? `scale(1.05) rotate(0deg)`
            : side === "left"
            ? "rotate(-3deg)"
            : "rotate(3deg)",
        }}
      >
        {/* Image/Video container */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden bg-secondary">
          {imageSrc && (imageSrc.endsWith('.mp4') || imageSrc.endsWith('.webm') || imageSrc.endsWith('.mov') || imageSrc.endsWith('.avi')) ? (
            <video
              src={imageSrc}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              controls
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={imageSrc}
              alt="Memory"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Caption */}
        <div
          className={cn(
            "absolute bottom-4 left-3 right-3 text-center transition-all duration-500",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <p className="font-serif text-sm text-deep-burgundy/80 italic leading-relaxed">
            {caption}
          </p>
        </div>

        {/* Tape decoration */}
        <div
          className={cn(
            "absolute -top-3 w-12 h-6 bg-warm-cream/60 rounded-sm",
            side === "left" ? "left-4 rotate-[-5deg]" : "right-4 rotate-[5deg]"
          )}
          style={{
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* Glow effect on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-lg bg-rose/20 blur-2xl transition-opacity duration-500 -z-10",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

export default MemoryCard;
