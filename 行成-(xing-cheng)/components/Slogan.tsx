import React from 'react';

const Slogan: React.FC = () => {
  return (
    <div className="fixed top-[38%] left-0 w-full text-center z-30 pointer-events-none mix-blend-multiply">
      <h1 className="font-serif text-xl md:text-2xl tracking-[0.4em] text-brand-text/80 font-normal">
        行之所至，心之所成
      </h1>
    </div>
  );
};

export default Slogan;