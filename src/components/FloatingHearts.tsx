import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  emoji: string;
}

const EMOJIS = ["💗", "💕", "💖", "🩷", "🤍", "💝"];

const FloatingHearts = ({ count = 15 }: { count?: number }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 20,
      delay: Math.random() * 8,
      duration: 5 + Math.random() * 6,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute opacity-0"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animation: `float-heart ${h.duration}s ease-in-out ${h.delay}s infinite`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
