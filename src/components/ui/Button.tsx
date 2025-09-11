import React from 'react';

type Variant = 'default' | 'primary' | 'ghost' | 'light' | 'brand' | 'game' | 'game-header' | 'try-now';
type Size = 'sm' | 'md' | 'lg';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const sizeStyles: Record<Size, React.CSSProperties> = {
  sm: { height: 32, padding: '0 10px', fontSize: 14 },
  md: { height: 40, padding: '0 14px', fontSize: 15 },
  lg: { height: 48, padding: '0 18px', fontSize: 16 }
};

export const Button: React.FC<Props> = ({ variant = 'default', size = 'md', style, className, ...props }) => {
  const base: React.CSSProperties = {
    borderRadius: 10,
    border: '1px solid rgba(0,0,0,0.08)',
    background: '#22D4EA',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };
  const v: Record<Variant, React.CSSProperties> = {
    default: {},
    primary: { background: 'var(--primary)', color: '#ffffff', borderColor: 'transparent' },
    ghost: { background: 'transparent', borderColor: 'transparent' },
    light: { background: '#f6f6f6', color: '#111827', borderColor: 'transparent' },
    brand: { background: 'rgba(42,39,37,1)', color: '#ffffff', borderColor: 'transparent', borderRadius: 30 },
    game: { 
      background: '#22D4EA', 
      color: '#ffffff', 
      borderColor: 'transparent', 
      borderRadius: '35px',
      fontFamily: 'Comfortaa, sans-serif',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '1.115em',
      letterSpacing: '-0.025em',
      height: '60px',
      padding: '20px 50px',
      border: 'none'
    },
    'game-header': { 
      background: '#000000', 
      color: '#ffffff', 
      borderColor: 'transparent', 
      borderRadius: '100px',
      fontFamily: 'Comfortaa, sans-serif',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '1.085em',
      letterSpacing: '-0.025em',
      height: '60px',
      padding: '20px 50px',
      border: 'none'
    },
    'try-now': {
      background: '#ffffff',
      color: '#000000',
      borderColor: 'transparent',
      borderRadius: '100px',
      fontFamily: 'Comfortaa, sans-serif',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '1.085em',
      letterSpacing: '-0.025em',
      height: '60px',
      padding: '20px 50px',
      border: 'none'
    }
  };
  
  const hoverClass = variant === 'game' || variant === 'game-header' || variant === 'try-now' 
    ? 'button-hover' 
    : '';
    
  return (
    <button 
      {...props} 
      className={`${hoverClass} ${className || ''}`}
      style={{ ...base, ...sizeStyles[size], ...v[variant], ...style }} 
    />
  );
};


