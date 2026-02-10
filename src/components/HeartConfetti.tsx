import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  emoji: string;
}

const EMOJIS = ["💗", "💕", "💖", "🩷", "❤️", "💝", "✨", "🌸"];

const HeartConfetti = ({ active }: { active: boolean }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      const p: Particle[] = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 24,
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 3,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      }));
      setParticles(p);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};

export default HeartConfetti;
