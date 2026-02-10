import { useState, useEffect } from "react";
import MusicPlayer from "@/components/MusicPlayer";

const LetterSlide = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showBody, setShowBody] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowTitle(true), 600);
    setTimeout(() => setShowBody(true), 1800);
  }, []);

  return (
    <div className="flex items-start sm:items-center justify-center p-3 sm:p-4 md:p-8 w-full h-full overflow-y-auto">
      <MusicPlayer />
      <div
        className="bg-letter-paper rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 md:p-12 max-w-2xl w-full border border-border
          relative my-4"
        style={{
          boxShadow: "0 20px 60px -15px rgba(0,0,0,0.1), 0 0 0 1px hsl(340 30% 88% / 0.5)",
        }}
      >
        {/* Paper texture lines */}
        <div className="absolute inset-x-5 sm:inset-x-8 top-16 sm:top-20 bottom-5 sm:bottom-8 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 28px, hsl(340 30% 50%) 28px, hsl(340 30% 50%) 29px)",
          }}
        />

        <h2
          className={`font-cursive text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-5 sm:mb-8 relative z-10
            transition-all duration-1000 ease-out
            ${showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          For my <span className="text-romantic">mi niña</span>
        </h2>

        <div
          className={`font-body text-card-foreground leading-relaxed text-sm sm:text-base md:text-lg space-y-3 sm:space-y-4 relative z-10
            transition-all duration-1500 ease-out
            ${showBody ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDuration: "1.5s" }}
        >
          <p className="italic text-romantic font-medium">mi niña,</p>

          <p>
            I don't know when it happened, but somewhere between small talks and quiet moments, you became someone my heart started reaching for without asking me first. It wasn't loud. It wasn't sudden. It was gentle, the kind of feeling that settles in slowly and then stays.
          </p>

          <p>
            With you, things feel softer. Conversations feel warmer. Even silence feels comfortable. You have this way of existing that makes everything around you feel a little more alive, a little more meaningful. And I don't think you even realize how special that is.
          </p>

          <p>
            I love how you feel like safety without trying. How your presence alone can calm storms I never talk about. How just knowing you're there makes days feel lighter and nights feel less heavy.
          </p>

          <p>
            I don't need grand moments or perfect words. I just want the simple things with you. The laughs that come out of nowhere. The comfort of knowing I can be myself.
          </p>

          <p>
            Thank you for being you, mi niña. For making my heart feel at home in a place I didn't even know I was searching for.
          </p>

          <p className="text-right mt-6 sm:mt-8 font-medium">
            You always<br />
            <span className="font-cursive text-xl sm:text-2xl text-romantic">Sisho 🧿❤️</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LetterSlide;
