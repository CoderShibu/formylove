import { useState, useEffect } from "react";
import MusicPlayer from "@/components/MusicPlayer";

interface Props {
  onNext: () => void;
}

const cards = [
  { emoji: "😂", text: "Chaotic laughs that fix bad days" },
  { emoji: "🎀", text: "Late-night talks that feel like home" },
  { emoji: "🌸", text: "Big love in small moments" },
  { emoji: "✨", text: "You being you — that's enough" },
];

const ReasonsSlide = ({ onNext }: Props) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    cards.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, i]);
      }, 400 + i * 500);
    });
    setTimeout(() => setShowButton(true), 400 + cards.length * 500 + 400);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-8 px-4 sm:px-6 max-w-2xl mx-auto w-full">
      <MusicPlayer />
      <h2 className="font-cursive text-3xl sm:text-4xl md:text-5xl text-foreground text-center">
        Why I love our friendship…
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`bg-card rounded-2xl p-4 sm:p-6 shadow-md border border-border
              transition-all duration-700 ease-out cursor-default
              hover:shadow-lg hover:-rotate-1 hover:scale-[1.03]
              ${visibleCards.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-2xl sm:text-3xl block mb-1.5 sm:mb-2 hover:animate-emoji-bounce">{card.emoji}</span>
            <p className="font-body text-card-foreground font-medium text-sm sm:text-base">{card.text}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className={`mt-2 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm sm:text-base
          shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-500
          ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionProperty: "opacity, transform" }}
      >
        Continue 💕
      </button>
    </div>
  );
};

export default ReasonsSlide;
