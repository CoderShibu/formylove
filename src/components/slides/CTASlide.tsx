import { useState, useCallback } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import HeartConfetti from "@/components/HeartConfetti";
import SlideTransition from "@/components/SlideTransition";
import OpeningSlide from "@/components/slides/OpeningSlide";
import ReasonsSlide from "@/components/slides/ReasonsSlide";
import ConfessionSlide from "@/components/slides/ConfessionSlide";
import ResponseSlide from "@/components/slides/ResponseSlide";
import ConfirmationSlide from "@/components/slides/ConfirmationSlide";
import LetterSlide from "@/components/slides/LetterSlide";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [confettiActive, setConfettiActive] = useState(false);
  const [heavyHearts, setHeavyHearts] = useState(false);

  const goToSlide = useCallback((n: number) => {
    setCurrentSlide(n);
  }, []);

  const handleCTAClick = useCallback(() => {
    setConfettiActive(true);
    setTimeout(() => {
      setConfettiActive(false);
      goToSlide(3);
    }, 1800);
  }, [goToSlide]);

  const handleResponse = useCallback(() => {
    setHeavyHearts(true);
    goToSlide(5);
  }, [goToSlide]);

  return (
    <div className="fixed inset-0 bg-gradient-romantic overflow-hidden">
      <FloatingHearts count={heavyHearts ? 30 : 12} />
      <HeartConfetti active={confettiActive} />

      <div className="relative w-full h-full">
        <SlideTransition active={currentSlide === 0}>
          <OpeningSlide onYes={() => goToSlide(1)} />
        </SlideTransition>

        <SlideTransition active={currentSlide === 1}>
          <ReasonsSlide onNext={() => goToSlide(2)} />
        </SlideTransition>

        <SlideTransition active={currentSlide === 2}>
          <CTASlide onClick={handleCTAClick} />
        </SlideTransition>

        <SlideTransition active={currentSlide === 3}>
          <ConfessionSlide onComplete={() => goToSlide(4)} />
        </SlideTransition>

        <SlideTransition active={currentSlide === 4}>
          <ResponseSlide onYes={handleResponse} />
        </SlideTransition>

        <SlideTransition active={currentSlide === 5}>
          <ConfirmationSlide onNext={() => goToSlide(6)} />
        </SlideTransition>

        <SlideTransition active={currentSlide === 6}>
          <LetterSlide />
        </SlideTransition>
      </div>
    </div>
  );
};

export default Index;

interface Props {
  onClick: () => void;
}

const CTASlide = ({ onClick }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onClick}
        className="px-8 py-4 sm:px-12 sm:py-5 rounded-full bg-primary text-primary-foreground font-body font-bold text-lg sm:text-xl
          shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95
          transition-all duration-300 animate-pulse-glow"
      >
        💌 One more thing…
      </button>
    </div>
  );
};

export default CTASlide;
