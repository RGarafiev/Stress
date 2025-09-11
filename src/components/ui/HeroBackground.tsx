import React from 'react';

export const HeroBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bgStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100vw',
    height: 512,
    background: `linear-gradient(rgba(13, 13, 13, 0.65), rgba(13, 13, 13, 0.65)), url(/images/hero-bg-6bfd80.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0 0 30px 30px',
    marginTop: 0
  };

  return (
    <div className="hero-wrap" style={{ minHeight: 512, marginTop: 0 }}>
      <div style={bgStyle} />
      {children}
    </div>
  );
};
