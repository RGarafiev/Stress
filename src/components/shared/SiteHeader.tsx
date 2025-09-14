import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { useModal } from '../../app/providers/ModalProvider';
import { Button } from '../ui/Button';
import { LogoSvg } from '../ui/LogoSvg';
import { BurgerMenu } from '../ui/BurgerMenu';

type Props = { translucent?: boolean; embedded?: boolean };

export const SiteHeader: React.FC<Props> = ({ translucent, embedded }) => {
  const { user, signOut } = useAuth();
  const { open } = useModal();
  const navigate = useNavigate();

  const bar = (
    <>
      <div className="nav-bar">
        <div className="nav-logo">
          <Link to="/" className="logo-link" aria-label="Stresshelp">
            <span className="logo-desktop"><LogoSvg /></span>
          </Link>
        </div>
        <div className="nav-center">
          <Link to="/" className="nav-chip">Главная</Link>
          <a href="#rules" className="nav-chip">Правила</a>
          <a href="#mission" className="nav-chip">Миссия игры</a>
          <a href="#blog" className="nav-chip">Статьи</a>
        </div>
        <div className="nav-right">
          <Button variant="try-now" onClick={() => navigate('/game')}>Попробовать сейчас</Button>
        </div>
        <BurgerMenu />
      </div>
      <div className="auth-inline">
        {!user ? (
          <>
            <Button size="sm" onClick={() => open('login')}>Войти</Button>
            <Button size="sm" variant="primary" onClick={() => open('register')}>Регистрация</Button>
          </>
        ) : (
          <>
            <Button size="sm" onClick={() => open('profile')}>{user.email}</Button>
            <Button size="sm" variant="ghost" onClick={() => { signOut(); navigate('/'); }}>Выйти</Button>
          </>
        )}
      </div>
    </>
  );

  if (embedded) return <div style={{ paddingTop: 20, marginBottom: 0, width: '100%' }}>{bar}</div>;

  return (
    <header className={translucent ? 'translucent' : ''} style={{ marginTop: 0, width: '100%' }}>
      <div style={{ paddingTop: 20, paddingBottom: 0, width: '100%' }}>
        {bar}
      </div>
    </header>
  );
};


