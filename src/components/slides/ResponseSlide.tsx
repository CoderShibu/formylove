import MusicPlayer from "@/components/MusicPlayer";

interface Props {
  onYes: () => void;
}

const ResponseSlide = ({ onYes }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6">
      <MusicPlayer />
      <h2 className="font-cursive text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-2 sm:mb-4">
        What do you say? 🌸
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={onYes}
          className="px-8 py-3 sm:px-10 sm:py-4 rounded-full bg-primary text-primary-foreground font-body font-bold text-base sm:text-lg
            shadow-lg hover:shadow-xl hover:scale-105 active:scale-90
            transition-all duration-300 animate-bounce-soft"
        >
          💕 YES
        </button>

        <button
          onClick={onYes}
          className="px-8 py-3 sm:px-10 sm:py-4 rounded-full bg-accent text-accent-foreground font-body font-bold text-base sm:text-lg
            shadow-lg hover:shadow-xl hover:scale-105 active:scale-90
            transition-all duration-300"
        >
          🙈 OBVIOUSLY YES
        </button>
      </div>
    </div>
  );
};

export default ResponseSlide;
