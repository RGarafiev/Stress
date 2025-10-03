import React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  contentStyle?: React.CSSProperties;
};

export const Modal: React.FC<Props> = ({ open, onClose, title, children, contentStyle }) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={contentStyle}>
        {title && <h3 style={{ marginTop: 0, color: '#ffffff' }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
};


