import { useState, useEffect, useRef, useCallback } from "react";
import MusicPlayer from "@/components/MusicPlayer";

interface Props {
  onYes: () => void;
}

const OpeningSlide = ({ onYes }: Props) => {
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setShowText(true), 400);
    setTimeout(() => setShowButton(true), 1200);
  }, []);

  const evade = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pad = 40;
    const btnW = 120;
    const btnH = 48;
    // Clamp within visible area
    const halfW = Math.max((rect.width / 2) - btnW - pad, 30);
    const halfH = Math.max((rect.height / 2) - btnH - pad, 30);
    const newX = (Math.random() * 2 - 1) * halfW;
    const newY = (Math.random() * 2 - 1) * halfH;
    setNoPos({ x: newX, y: newY });
    setHasMoved(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center gap-8 px-6 text-center w-full h-full overflow-hidden"
    >
      <MusicPlayer />
      <div
        className={`transition-all duration-1000 ease-out ${
          showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h1 className="font-cursive text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight px-2">
          Will you be my{" "}
          <span className="text-romantic">mi niña</span>?
        </h1>
        <p className="mt-3 text-base sm:text-lg font-body text-muted-foreground tracking-wide">
          just us.
        </p>
      </div>

      <div
        className={`flex gap-4 items-center mt-4 transition-all duration-500 ease-out
          ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <button
          onClick={onYes}
          className="px-8 py-3 sm:px-10 sm:py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold text-base sm:text-lg
            shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 animate-pulse-glow
            transition-all duration-500 z-10"
        >
          💗 Yes
        </button>
      </div>

      <button
        onMouseEnter={evade}
        onTouchStart={(e) => { e.preventDefault(); evade(); }}
        onClick={(e) => e.preventDefault()}
        className={`absolute px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-muted text-muted-foreground font-body font-bold text-base sm:text-lg
          shadow-md cursor-default select-none
          transition-all duration-300 ease-in-out
          ${showButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{
          transform: hasMoved
            ? `translate(${noPos.x}px, ${noPos.y}px)`
            : "translate(70px, 0px)",
        }}
        tabIndex={-1}
      >
        🙃 No
      </button>
    </div>
  );
};

export default OpeningSlide;
