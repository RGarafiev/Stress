import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export const Input: React.FC<Props> = ({ label, style, ...props }) => {
  return (
    <label className="col" style={{ width: '100%' }}>
      {label && <span style={{ fontSize: 13, color: 'var(--muted)' }}>{label}</span>}
      <input
        {...props}
        style={{
          height: 40,
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.12)',
          background: '#0f172a',
          color: 'var(--text)',
          padding: '0 12px',
          ...style
        }}
      />
    </label>
  );
};


