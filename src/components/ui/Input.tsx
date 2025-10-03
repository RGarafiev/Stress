import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string | null };

export const Input: React.FC<Props> = ({ label, style, error, ...props }) => {
  const borderColor = error ? '#ef4444' : 'rgba(255,255,255,0.12)';
  return (
    <label className="col" style={{ width: '100%' }}>
      {label && <span style={{ fontSize: 13, color: 'var(--muted)' }}>{label}</span>}
      <input
        {...props}
        style={{
          height: 40,
          borderRadius: 10,
          border: `1px solid ${borderColor}`,
          background: '#0f172a',
          color: '#e6e6e6',
          padding: '0 12px',
          ...style
        }}
      />
      {error && (
        <span style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>{error}</span>
      )}
    </label>
  );
};


