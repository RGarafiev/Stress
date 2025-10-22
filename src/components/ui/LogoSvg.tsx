import React from 'react';

type Props = { className?: string; variant?: 'bw' | 'color' | 'invers' };

export const LogoSvg: React.FC<Props> = ({ className = '', variant = 'bw' }) => {
  const fileByVariant: Record<NonNullable<Props['variant']>, string> = {
    bw: '/images/logos/Logo-StressHelp-b&w.svg',
    color: '/images/logos/Logo-StressHelp-color.svg',
    invers: '/images/logos/Logo-StressHelp-invers.svg',
  };
  const src = process.env.PUBLIC_URL + (fileByVariant[variant] || fileByVariant.bw);
  return (
    <img
      src={src}
      alt="Stresshelp"
      className={className}
      style={{ height: '100%', width: '100%', display: 'block', objectFit: 'contain', objectPosition: 'left center', imageRendering: 'auto' }}
    />
  );
};