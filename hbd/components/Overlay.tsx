
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ExperienceState } from '../types';

interface OverlayProps {
  state: ExperienceState;
  onStart: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ state, onStart }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state === ExperienceState.REVEALED) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, [state]);

  const handleStart = () => {
    gsap.to(landingRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 1,
      onComplete: onStart
    });
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Landing State */}
      {state === ExperienceState.LANDING && (
        <div 
          ref={landingRef}
          className="pointer-events-auto flex flex-col items-center gap-8 text-center px-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest uppercase">
              A Special Gift
            </h1>
            <p className="text-teal-200/60 font-light italic text-lg">
              Wait for the night to bloom...
            </p>
          </div>
          
          <button
            onClick={handleStart}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-teal-500/30 transition-all hover:border-teal-400"
          >
            <div className="absolute inset-0 bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors" />
            <span className="relative text-teal-300 font-medium tracking-widest text-sm uppercase">
              Tap to Open Your Surprise
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </button>
        </div>
      )}

      {/* Reveal State */}
      {state === ExperienceState.REVEALED && (
        <div 
          ref={contentRef}
          className="flex flex-col items-center justify-center text-center px-6 max-w-lg"
        >
          {/* Heart Frame Placeholder */}
          <div className="relative mb-12">
            <div className="heart-frame w-48 h-48 md:w-64 md:h-64 bg-slate-800 shadow-[0_0_50px_rgba(45,212,191,0.2)] flex items-center justify-center p-2">
              <img 
                src="https://picsum.photos/400/400" 
                alt="Portrait" 
                className="heart-frame w-full h-full object-cover"
              />
            </div>
            {/* Soft Glow */}
            <div className="absolute inset-0 heart-frame -z-10 bg-teal-500/20 blur-2xl animate-pulse" />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              Happy Birthday AASHI APPI
            </h2>
            
            <div className="space-y-4 px-4 py-6 border-y border-teal-500/20 bg-slate-900/40 backdrop-blur-sm rounded-xl">
              <p className="text-teal-100 font-serif italic text-xl md:text-2xl leading-relaxed">
                "May Allah bless you with wisdom, strength, and unwavering faith."
              </p>
              <p className="text-teal-400/80 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                On this beautiful day, I pray that your life is filled with the Noor of Islam and that your heart remains a vessel for His love.
              </p>
            </div>

            <p className="text-2xl md:text-3xl font-serif text-amber-200 animate-pulse tracking-wide mt-8">
              May Allah Fill Your Life With Barakah
            </p>
            <p className="text-2xl md:text-3xl font-serif text-amber-200 animate-pulse tracking-wide mt-8">
                MOHD KAIF
            </p>

          </div>
          
          <div className="mt-12 flex gap-4">
             <div className="w-1 h-1 bg-teal-500 rounded-full animate-ping" />
             <div className="w-1 h-1 bg-teal-500 rounded-full animate-ping delay-75" />
             <div className="w-1 h-1 bg-teal-500 rounded-full animate-ping delay-150" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Overlay;
