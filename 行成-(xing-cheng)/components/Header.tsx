import React, { useState } from 'react';
import { LOGO_URL } from '../constants';

const Header: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-center pt-12 z-50 pointer-events-auto">
      <div 
        className="flex flex-col items-center group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Image: 1/5 of screen width (20vw) */}
        <div className="w-[20vw] transition-transform duration-700 ease-out transform group-hover:scale-105">
          <img src={LOGO_URL} alt="行成 Logo" className="w-full h-auto object-contain" />
        </div>

        {/* Hover Text Reveal: "行之所至，心之所成" */}
        <div 
          className={`
            mt-4 text-xs md:text-sm font-serif tracking-[0.3em] text-brand-subtext 
            transition-all duration-700 ease-in-out
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}
        >
          行之所至，心之所成
        </div>
      </div>
    </header>
  );
};

export default Header;