import React from 'react';

export const LogoSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <img
    src={process.env.PUBLIC_URL + '/logoHeader.png'}
    alt="Stresshelp"
    width={107}
    height={49}
    className={className}
    style={{ height: '100%', width: 'auto', display: 'block' }}
  />
);