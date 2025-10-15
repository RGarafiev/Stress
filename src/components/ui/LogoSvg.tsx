import React from 'react';

export const LogoSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <img
    src={process.env.PUBLIC_URL + '/logoHeader.png'}
    alt="Stresshelp"
    className={className}
    style={{ height: '100%', width: '100%', display: 'block', objectFit: 'contain', objectPosition: 'left center', imageRendering: 'auto' }}
  />
);