import { useState, useEffect, useRef } from "react";
import { Play, Pause, Music } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.5;
      
      // Try to play immediately
      const playAudio = () => {
        audio.play()
          .then(() => {
            setIsPlaying(true);
            console.log("Music started playing");
          })
          .catch((error) => {
            console.log("Auto-play prevented:", error);
            setIsPlaying(false);
          });
      };

      // Play when loaded
      audio.addEventListener('canplay', playAudio);
      
      return () => {
        audio.removeEventListener('canplay', playAudio);
      };
    }
  }, []);

  const toggleMusic = () => {
    console.log("Button clicked!");
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      console.log("Music paused");
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          console.log("Music resumed");
        })
        .catch((error) => {
          console.log("Play error:", error);
        });
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio
        ref={audioRef}
        src="https://www.bensound.com/bensound-memories.mp3"
        preload="auto"
      />
      <button
        onClick={toggleMusic}
        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 border-2 border-white"
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause music" : "Play music"}
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
