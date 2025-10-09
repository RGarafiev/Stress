import React, { useRef } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  contentStyle?: React.CSSProperties;
};

export const Modal: React.FC<Props> = ({ open, onClose, title, children, contentStyle }) => {
  const isMouseDownOnBackdrop = useRef(false);
  if (!open) return null;
  return (
    <div
      className="modal-backdrop"
      onMouseDown={e => { isMouseDownOnBackdrop.current = e.target === e.currentTarget; }}
      onMouseUp={e => { if (isMouseDownOnBackdrop.current && e.target === e.currentTarget) onClose(); isMouseDownOnBackdrop.current = false; }}
    >
      <div className="modal-content" onMouseDown={e => e.stopPropagation()} onClick={e => e.stopPropagation()} style={contentStyle}>
        {title && <h3 style={{ marginTop: 0, color: '#ffffff' }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
};


