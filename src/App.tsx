import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [musicOn, setMusicOn] = useState(true);

  const startMusic = () => {
    if (!audioRef.current || musicStarted) return;

    audioRef.current.volume = 0;
    audioRef.current.play().catch(() => {});
    setMusicStarted(true);

    // smooth fade-in
    let vol = 0;
    const fade = setInterval(() => {
      if (!audioRef.current) return;
      if (vol < 0.25) {
        vol += 0.02;
        audioRef.current.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 120);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (musicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicOn(!musicOn);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index 
              audioRef={audioRef} 
              startMusic={startMusic} 
              musicStarted={musicStarted}
            />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
        {/* Global Music Toggle Button */}
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 rounded-full bg-pink-200/70 px-3 py-2 text-sm backdrop-blur-md shadow-md hover:scale-105 transition"
        >
          {musicOn ? "🔊" : "🔇"}
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
