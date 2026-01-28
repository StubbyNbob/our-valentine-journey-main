import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface EmotionalTextProps {
  text: string;
  className?: string;
}

const EmotionalText = ({ text, className }: EmotionalTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={textRef}
      className={cn(
        "py-20 md:py-32 text-center px-6 transition-all duration-1500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      <p className="font-display text-2xl md:text-4xl lg:text-5xl text-foreground/90 font-light italic leading-relaxed max-w-3xl mx-auto">
        {text}
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-rose/50" />
        <span className="w-1.5 h-1.5 rounded-full bg-rose/30" />
        <span className="w-1.5 h-1.5 rounded-full bg-rose/50" />
      </div>
    </div>
  );
};

export default EmotionalText;
