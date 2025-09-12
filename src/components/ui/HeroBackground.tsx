import React from 'react';

export const HeroBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bgStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 512,
    background: `linear-gradient(rgba(13, 13, 13, 0.65), rgba(13, 13, 13, 0.65)), url(/images/hero-bg-6bfd80.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0 0 30px 30px',
    marginTop: 0
  };

  const mobileBgStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 512,
    background: `linear-gradient(rgba(13, 13, 13, 0.65), rgba(13, 13, 13, 0.65)), url(/images/bg-mobile.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0 0 30px 30px',
    marginTop: 0
  };

  return (
    <div className="hero-wrap" style={{ minHeight: 512, marginTop: 0, width: '100%', position: 'relative' }}>
      <div style={bgStyle} className="hero-bg-desktop" />
      <div style={mobileBgStyle} className="hero-bg-mobile" />
      <div style={{ width: '100%', position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};
