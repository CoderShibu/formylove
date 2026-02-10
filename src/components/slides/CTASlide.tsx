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
