import { useState, useEffect } from "react";
import MusicPlayer from "@/components/MusicPlayer";

interface Props {
  onComplete: () => void;
}

const lines = [
  "I didn't plan this…",
  "But somehow…",
  "You became really important to me.",
];

const ConfessionSlide = ({ onComplete }: Props) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    lines.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, 600 + i * 1200);
    });

    const afterLines = 600 + lines.length * 1200 + 800;
    setTimeout(() => setShowQuestion(true), afterLines);
    setTimeout(() => setShowButton(true), afterLines + 1000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6 text-center max-w-lg mx-auto">
      <MusicPlayer />
      <div className="space-y-3 sm:space-y-4">
        {lines.map((line, i) => (
          <p
            key={i}
            className={`font-body text-lg sm:text-xl md:text-2xl text-foreground transition-all duration-1000 ease-out
              ${visibleLines.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {line}
          </p>
        ))}
      </div>

      <h2
        className={`font-cursive text-2xl sm:text-3xl md:text-5xl text-foreground mt-4 sm:mt-8 transition-all duration-1000 ease-out
          ${showQuestion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        So… will you be my <span className="text-romantic">mi niña</span>? 🧿❤️
      </h2>

      <button
        onClick={onComplete}
        className={`mt-2 sm:mt-4 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm sm:text-base
          shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-500
          ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionProperty: "opacity, transform" }}
      >
        Continue 💗
      </button>
    </div>
  );
};

export default ConfessionSlide;
