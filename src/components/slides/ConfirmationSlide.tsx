import { useState, useEffect } from "react";
import MusicPlayer from "@/components/MusicPlayer";

interface Props {
  onNext: () => void;
}

const ConfirmationSlide = ({ onNext }: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6 text-center">
      <MusicPlayer />
      <div
        className={`transition-all duration-1000 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-cursive text-3xl sm:text-5xl md:text-6xl text-foreground">
          Yay! I'm really happy it's you 🌷
        </h2>
        <p className="mt-3 sm:mt-4 font-body text-muted-foreground text-base sm:text-lg">
          I hope this made you smile… because you make me smile every day.
        </p>
      </div>

      <button
        onClick={onNext}
        className={`px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm sm:text-base
          shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-500
          ${show ? "opacity-100" : "opacity-0"}`}
      >
        Read my letter 💌
      </button>
    </div>
  );
};

export default ConfirmationSlide;
