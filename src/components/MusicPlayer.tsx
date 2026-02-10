import { useState, useEffect, useRef } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.5;
      
      const playAudio = () => {
        audio.play()
          .then(() => {
            setIsPlaying(true);
            console.log("✅ Music playing!");
          })
          .catch((error) => {
            console.log("❌ Auto-play failed:", error);
            setIsPlaying(false);
          });
      };

      audio.addEventListener('canplay', playAudio);
      
      return () => {
        audio.removeEventListener('canplay', playAudio);
      };
    }
  }, []);

  const toggleMusic = () => {
    console.log("🔘 Music button clicked!");
    const audio = audioRef.current;
    if (!audio) {
      console.log("❌ Audio ref not found");
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      console.log("⏸️ Music paused");
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          console.log("▶️ Music playing");
        })
        .catch((error) => {
          console.log("❌ Play failed:", error);
        });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999
    }}>
      <audio
        ref={audioRef}
        src="/meri-banoge-kya-reprise.mp3"
        preload="auto"
      />
      <button
        onClick={toggleMusic}
        style={{
          backgroundColor: isPlaying ? '#dc2626' : '#16a34a',
          color: 'white',
          border: '2px solid white',
          padding: '12px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? '⏸️' : '🎵'}
      </button>
    </div>
  );
};

export default MusicPlayer;
