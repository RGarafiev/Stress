import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export const VerificationFailedPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div style={{ color: '#e6e6e6', padding: 24 }}>
      Ошибка верификации: {error || 'Неизвестная ошибка'}
      <div style={{ marginTop: 12 }}>
        <Link to="/" style={{ color: '#60a5fa' }}>На главную</Link>
      </div>
    </div>
  );
};


