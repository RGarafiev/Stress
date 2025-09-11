import React from 'react';
import { useToast } from '../../app/providers/ToastProvider';

export const ToastViewport: React.FC = () => {
  const { toasts, remove } = useToast();
  return (
    <div className="toast-viewport">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.kind}`} onClick={() => remove(t.id)}>
          {t.message}
        </div>
      ))}
    </div>
  );
};


