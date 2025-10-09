import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { saveSession } from '../../app/auth/session';

export const VerifiedPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      saveSession(token, undefined, true);
      const timeout = setTimeout(() => navigate('/'), 200);
      return () => clearTimeout(timeout);
    } else {
      navigate('/auth/verification-failed?error=token_missing', { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div style={{ color: '#e6e6e6', padding: 24 }}>
      Email подтверждён! Перенаправляем...
    </div>
  );
};


