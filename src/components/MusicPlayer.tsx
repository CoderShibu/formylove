import { useState, useEffect, useRef } from "react";
import { Play, Pause, Music } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.3;
      
      const handleCanPlay = () => {
        setIsLoaded(true);
        // Auto-play immediately when ready
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          console.log("Auto-play prevented - user interaction needed");
        });
      };

      const handleError = (e: Event) => {
        console.error("Audio loading error:", e);
        setIsLoaded(false);
      };

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
      };
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("Play error:", error);
      });
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        preload="auto"
      />
      <button
        onClick={toggleMusic}
        disabled={!isLoaded}
        className={`bg-white/20 backdrop-blur-md text-white p-3 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/30 ${
          !isLoaded ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isLoaded ? (isPlaying ? "Pause music" : "Play music") : "Loading music..."}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Music className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
