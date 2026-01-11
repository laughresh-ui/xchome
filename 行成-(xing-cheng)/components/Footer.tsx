import React, { useState, useRef, useEffect } from 'react';
import { APP_REDIRECT_URL, SECRET_PASSWORD } from '../constants';

const Footer: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = [
    { chinese: '好', english: 'How' },
    { chinese: '渡', english: 'do' },
    { chinese: '游', english: 'you' },
    { chinese: '度', english: 'du' },
  ];

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      window.location.href = APP_REDIRECT_URL;
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 1000); // Shake effect reset
    }
  };

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full flex justify-center pb-12 z-50 pointer-events-auto">
        <div 
          onClick={() => setShowInput(true)}
          className="flex gap-8 md:gap-12 group cursor-pointer"
        >
          {items.map((item, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Chinese Character */}
              <span className="text-sm md:text-base font-serif text-brand-text/80 font-medium z-10 transition-colors duration-300 group-hover:text-brand-text">
                {item.chinese}
              </span>
              
              {/* Shadow Art (English) */}
              <span 
                className="
                  absolute top-full mt-1
                  font-sans font-light text-[10px] md:text-xs text-gray-300
                  transform origin-top scale-y-[-1.5] skew-x-[20deg] opacity-30 blur-[0.5px]
                  transition-all duration-500 group-hover:opacity-60 group-hover:scale-y-[-1.8] group-hover:blur-0
                  select-none
                "
              >
                {item.english}
              </span>
            </div>
          ))}
        </div>
      </footer>

      {/* Password Modal */}
      {showInput && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-xs px-8">
            <button 
              onClick={() => setShowInput(false)}
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-brand-subtext hover:text-brand-text transition-colors"
            >
              ✕
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className={`
                  w-full bg-transparent border-b border-brand-subtext/30 py-2 text-center text-brand-text tracking-widest outline-none font-serif
                  transition-all duration-300 focus:border-brand-text
                  placeholder:text-brand-subtext/30 placeholder:text-xs
                  ${error ? 'border-red-400 animate-pulse' : ''}
                `}
              />
              {error && <span className="text-[10px] text-red-400 font-serif tracking-wider">密码错误</span>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;