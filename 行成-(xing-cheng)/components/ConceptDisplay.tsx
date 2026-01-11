import React, { useState, useEffect } from 'react';
import { CONCEPTS } from '../constants';

const ConceptDisplay: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setFade(false);
      
      // Wait for fade out to finish, then switch text and fade in
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % CONCEPTS.length);
        setFade(true);
      }, 1500); // Elegant transition time

    }, 6000); // Total cycle duration

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-1/2 left-0 w-full transform -translate-y-1/2 text-center z-20 pointer-events-none px-8">
      <p 
        className={`
          font-serif text-base md:text-lg text-brand-text tracking-[0.2em] leading-loose
          transition-all duration-1500 ease-in-out
          ${fade ? 'opacity-80 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-4'}
        `}
      >
        {CONCEPTS[index]}
      </p>
    </div>
  );
};

export default ConceptDisplay;