import { useState, useEffect, useRef } from "react";
import { Play, Pause, Music } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.3;
      
      // Auto-play when component mounts
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Auto-play was prevented:", error);
            setIsPlaying(false);
          });
      }
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Play was prevented:", error);
            });
        }
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio
        ref={audioRef}
        src="/meri-banoge-kya-reprise.mp3"
        preload="auto"
      />
      <button
        onClick={toggleMusic}
        className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
        aria-label={isPlaying ? "Pause music" : "Play music"}
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
