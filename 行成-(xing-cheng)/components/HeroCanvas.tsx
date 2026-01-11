import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MAP_URL } from '../constants';

interface HeroCanvasProps {
  isActive: boolean;
  onRevealStart: () => void;
}

const HeroCanvas: React.FC<HeroCanvasProps> = ({ isActive, onRevealStart }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasStartedRevealing, setHasStartedRevealing] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reset layer: Fill with brand background color (Pearl White)
      // We use the exact hex from index.html body to make it seamless
      ctx.fillStyle = '#F5F5F7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []); 

  // Drawing Logic
  const draw = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use destination-out to erase the white layer
    ctx.globalCompositeOperation = 'destination-out';
    
    ctx.beginPath();
    // Diameter 60px = Radius 30px
    ctx.arc(x, y, 30, 0, Math.PI * 2); 
    ctx.fill();
    
    if (!hasStartedRevealing) {
      setHasStartedRevealing(true);
      onRevealStart();
    }
  }, [hasStartedRevealing, onRevealStart]);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isActive) return;
    
    let clientX, clientY;
    
    if ('touches' in e) {
       clientX = e.touches[0].clientX;
       clientY = e.touches[0].clientY;
    } else {
       clientX = (e as React.MouseEvent).clientX;
       clientY = (e as React.MouseEvent).clientY;
    }

    setCursorPos({ x: clientX, y: clientY });

    if (isDrawing) {
      draw(clientX, clientY);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden transition-all duration-1000 ${isActive ? 'z-40' : 'z-0 pointer-events-none'}`}
    >
      {/* 1. Underlying Map Image (Revealed when scratched) */}
      <div className="absolute inset-0 z-0">
        <img 
          src={MAP_URL} 
          alt="World Map" 
          className="w-full h-full object-cover object-center opacity-90"
          draggable={false}
        />
      </div>

      {/* 2. Scratch-off Canvas Layer */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-10 transition-opacity duration-1000 ${isActive ? 'cursor-none' : ''}`}
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDrawing(true)}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={handleMouseMove}
        style={{ touchAction: 'none' }}
      />

      {/* 3. Follow Text */}
      <div 
        className="fixed pointer-events-none z-30 text-brand-text text-xs font-serif italic tracking-widest whitespace-nowrap transition-all duration-300 ease-out"
        style={{ 
          left: cursorPos.x + 35, 
          top: cursorPos.y - 10,
          opacity: isActive && hasStartedRevealing ? 0.8 : 0,
          transform: isActive && hasStartedRevealing ? 'translateX(0)' : 'translateX(-10px)'
        }}
      >
        世界已在脚下，网站正在搭建中...
      </div>
      
      {/* 4. Custom Brush Cursor Visual */}
      {isActive && (
        <div 
          className="fixed pointer-events-none z-20 w-[60px] h-[60px] border border-brand-subtext/30 bg-white/10 backdrop-blur-[1px] rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        />
      )}
    </div>
  );
};

export default HeroCanvas;