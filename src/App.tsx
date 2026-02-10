import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicUnlocked, setMusicUnlocked] = useState(false);

  useEffect(() => {
    const unlockAudio = () => {
      if (!audioRef.current || musicUnlocked) return;

      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        let v = 0;
        const fade = setInterval(() => {
          if (!audioRef.current) return;
          if (v < 0.25) {
            v += 0.02;
            audioRef.current.volume = v;
          } else {
            clearInterval(fade);
          }
        }, 120);

        setMusicUnlocked(true);
      }).catch(() => {});
    };

    // listen for FIRST real interaction
    document.addEventListener("pointerdown", unlockAudio, { once: true });

    return () => {
      document.removeEventListener("pointerdown", unlockAudio);
    };
  }, [musicUnlocked]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index 
              audioRef={audioRef} 
              musicUnlocked={musicUnlocked}
            />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
        {/* Global Music Toggle Button */}
        <button
          onClick={() => {
            if (audioRef.current) {
              if (musicUnlocked) {
                audioRef.current.pause();
              } else {
                audioRef.current.play().catch(() => {});
              }
            }
          }}
          className="fixed top-4 right-4 z-50 rounded-full bg-pink-200/70 px-3 py-2 text-sm backdrop-blur-md shadow-md hover:scale-105 transition"
        >
          {musicUnlocked ? "🔊" : "🔇"}
        </button>
        
        {/* Global Audio Element */}
        <audio
          ref={audioRef}
          src="/audio/meri-banogi-kya.mp3"
          loop
          preload="auto"
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
