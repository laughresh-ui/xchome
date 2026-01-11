import React, { useState } from 'react';
import Header from './components/Header';
import HeroCanvas from './components/HeroCanvas';
import ConceptDisplay from './components/ConceptDisplay';
import Footer from './components/Footer';

const App: React.FC = () => {
  // State to track if the "Start" button has been clicked
  const [isStarted, setIsStarted] = useState(false);
  // State to track if the user has started revealing the map
  const [isRevealing, setIsRevealing] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleRevealStart = () => {
    setIsRevealing(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-brand-bg text-brand-text selection:bg-brand-text selection:text-brand-bg">
      
      {/* 1. Header (Logo & Slogan) */}
      <Header />
      
      {/* 2. Center Rotating Concept Text 
          Fades out slightly when user starts scratching the map to reduce visual noise
      */}
      <div className={`transition-opacity duration-1000 ${isRevealing ? 'opacity-20' : 'opacity-100'}`}>
        <ConceptDisplay />
      </div>

      {/* 3. Interactive Map Layer 
          - Bottom layer: Map Image
          - Top layer: White Canvas (Scratched off by user)
      */}
      <HeroCanvas isActive={isStarted} onRevealStart={handleRevealStart} />

      {/* 4. Start Button (The Trigger) */}
      {/* Positioned Bottom Right, small and elegant */}
      <div 
        className={`
          fixed bottom-[10%] right-[8%] md:right-[10%] z-50
          transition-all duration-700 ease-in-out
          ${isStarted ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}
        `}
      >
        <button
          onClick={handleStart}
          className={`
            group
            relative
            flex items-center justify-center
            px-5 py-2
            bg-white/50
            border border-brand-subtext/20 hover:border-brand-text/40
            rounded-full
            text-brand-subtext hover:text-brand-text
            font-sans font-light text-[11px] tracking-[0.15em]
            transition-all duration-500
            shadow-sm hover:shadow-md
            backdrop-blur-sm
          `}
        >
          <span className="relative z-10">点亮你的地图</span>
          {/* Subtle breathing glow */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-40 transition-opacity duration-700 animate-pulse-slow"></div>
        </button>
      </div>

      {/* 5. Footer (Secret Portal) */}
      <Footer />
      
    </div>
  );
};

export default App;