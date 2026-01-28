import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface HeartParticle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

interface HeartConfettiProps {
  isActive: boolean;
}

const HeartConfetti = ({ isActive }: HeartConfettiProps) => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles: HeartParticle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 3 + Math.random() * 2,
          size: 12 + Math.random() * 20,
          rotation: Math.random() * 360,
        });
      }
      setParticles(newParticles);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-heart-float"
          style={{
            left: `${particle.x}%`,
            top: "100%",
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        >
          <Heart
            className="text-rose fill-rose/80"
            style={{
              width: particle.size,
              height: particle.size,
              transform: `rotate(${particle.rotation}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default HeartConfetti;
