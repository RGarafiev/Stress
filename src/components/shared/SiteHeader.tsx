import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { useModal } from '../../app/providers/ModalProvider';
import { Button } from '../ui/Button';
import { LogoSvg } from '../ui/LogoSvg';
import { useToast } from '../../app/providers/ToastProvider';
import { BurgerMenu } from '../ui/BurgerMenu';

type Props = { translucent?: boolean; embedded?: boolean };

export const SiteHeader: React.FC<Props> = ({ translucent, embedded }) => {
  const { user, signOut } = useAuth();
  const { open } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { push } = useToast();
  const [menuFor, setMenuFor] = useState<null | 'desktop' | 'mobile' | 'phone'>(null);
  const [menuPosition, setMenuPosition] = useState<null | { top: number; right: number }>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  async function handleLogout(source: 'desktop' | 'mobile' | 'phone'): Promise<void> {
    try {
      setMenuFor(null);
      await signOut();
      push('Вы успешно вышли из системы', 'success');
      navigate('/');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch {
      push('Ошибка при выходе из системы', 'error');
    }
  }

  useEffect(() => {
    if (!isMenuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (target.closest('.account-menu-portal') || target.closest('.account-button')) return;
      setIsMenuOpen(false);
      setMenuFor(null);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [isMenuOpen]);

  function toggleMenuFromAnchor(source: 'desktop' | 'mobile' | 'phone', anchor: HTMLElement): void {
    const rect = anchor.getBoundingClientRect();
    const top = Math.round(rect.bottom + 8);
    const right = Math.round(window.innerWidth - rect.right);
    setMenuPosition({ top, right });
    setIsMenuOpen(!(isMenuOpen && menuFor === source));
    setMenuFor(source);
  }

  // Navigation helpers: identical behavior with footer
  function goToSection(sectionId: 'rules' | 'mission' | 'blog'): void {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function goHome(e?: React.MouseEvent): void {
    if (e) e.preventDefault();
    const scrollTopSmooth = () => {
      const el = document.scrollingElement || document.documentElement;
      if (el && 'scrollTo' in el) (el as HTMLElement).scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      (document.body as HTMLElement).scrollTop = 0;
      (document.documentElement as HTMLElement).scrollTop = 0;
    };
    if (location.pathname !== '/') {
      navigate('/', { state: { toTop: true, ts: Date.now() } });
      setTimeout(scrollTopSmooth, 120);
      return;
    }
    scrollTopSmooth();
  }

  const bar = (
    <>
      <div className="nav-bar">
        <div className="nav-logo">
          <Link to="/" className="logo-link" aria-label="Stresshelp">
            <span className="logo-desktop"><LogoSvg /></span>
          </Link>
        </div>
        <div className="nav-center">
          <Link to="/" className="nav-chip" onClick={goHome}>Главная</Link>
          <a href="#rules" className="nav-chip" onClick={(e) => { e.preventDefault(); goToSection('rules'); }}>Правила</a>
          <a href="#mission" className="nav-chip" onClick={(e) => { e.preventDefault(); goToSection('mission'); }}>Миссия игры</a>
          <a href="#blog" className="nav-chip" onClick={(e) => { e.preventDefault(); goToSection('blog'); }}>Статьи</a>
        </div>
        <div className={`nav-right${user ? ' no-cta' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {user && (
            <div className="account-anchor" style={{ position: 'relative', zIndex: 10000 }}>
              <button
                type="button"
                onClick={(e) => toggleMenuFromAnchor('desktop', e.currentTarget)}
                aria-label="Аккаунт"
                className="account-button"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#e6e6e6',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 4,
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 10001
                }}
              >
                <svg width="30" height="36" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M6.80578 8.4077C6.80578 11.9466 9.6746 14.8154 13.2135 14.8154C16.7523 14.8154 19.6212 11.9466 19.6212 8.4077C19.6212 4.86882 16.7523 2 13.2135 2C9.6746 2 6.80578 4.86882 6.80578 8.4077Z" stroke="#ffffff" strokeWidth="2.1762"/>
                  <path d="M2 24.3223C2 22.9441 2.86641 21.7146 4.16435 21.2511C10.0161 19.1612 16.4109 19.1612 22.2626 21.2511C23.5605 21.7146 24.4269 22.9441 24.4269 24.3223V26.4296C24.4269 28.3318 22.7422 29.793 20.8591 29.524L19.3302 29.3056C15.273 28.726 11.154 28.726 7.09672 29.3056L5.56782 29.524C3.68476 29.793 2 28.3318 2 26.4296V24.3223Z" stroke="#ffffff" strokeWidth="2.1762"/>
                </svg>
              </button>
            </div>
          )}
          {!user && (
            <Button className="cta-try-now" variant="try-now" onClick={() => open('login')}>Попробовать сейчас</Button>
          )}
        </div>
        {/* Mobile/burger account icon (does not affect burger layout) */}
        {user && (
          <div className="account-mobile account-anchor">
            <button
              type="button"
              onClick={(e) => toggleMenuFromAnchor('mobile', e.currentTarget)}
              aria-label="Аккаунт"
              className="account-button account-button-mobile"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#e6e6e6',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                cursor: 'pointer'
              }}
            >
              {/* мобильная SVG-иконка из макета */}
              <svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6.80578 8.4077C6.80578 11.9466 9.6746 14.8154 13.2135 14.8154C16.7523 14.8154 19.6212 11.9466 19.6212 8.4077C19.6212 4.86882 16.7523 2 13.2135 2C9.6746 2 6.80578 4.86882 6.80578 8.4077Z" stroke="#ffffff" strokeWidth="2.1762"/>
                <path d="M2 24.3223C2 22.9441 2.86641 21.7146 4.16435 21.2511C10.0161 19.1612 16.4109 19.1612 22.2626 21.2511C23.5605 21.7146 24.4269 22.9441 24.4269 24.3223V26.4296C24.4269 28.3318 22.7422 29.793 20.8591 29.524L19.3302 29.3056C15.273 28.726 11.154 28.726 7.09672 29.3056L5.56782 29.524C3.68476 29.793 2 28.3318 2 26.4296V24.3223Z" stroke="#ffffff" strokeWidth="2.1762"/>
              </svg>
            </button>
          </div>
        )}
        {user && (
          <div className="account-phone account-anchor">
            <button
              type="button"
              onClick={(e) => toggleMenuFromAnchor('phone', e.currentTarget)}
              aria-label="Аккаунт"
              className="account-button account-button-phone"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#e6e6e6',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                cursor: 'pointer'
              }}
            >
              <svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6.80578 8.4077C6.80578 11.9466 9.6746 14.8154 13.2135 14.8154C16.7523 14.8154 19.6212 11.9466 19.6212 8.4077C19.6212 4.86882 16.7523 2 13.2135 2C9.6746 2 6.80578 4.86882 6.80578 8.4077Z" stroke="#ffffff" strokeWidth="2.1762"/>
                <path d="M2 24.3223C2 22.9441 2.86641 21.7146 4.16435 21.2511C10.0161 19.1612 16.4109 19.1612 22.2626 21.2511C23.5605 21.7146 24.4269 22.9441 24.4269 24.3223V26.4296C24.4269 28.3318 22.7422 29.793 20.8591 29.524L19.3302 29.3056C15.273 28.726 11.154 28.726 7.09672 29.3056L5.56782 29.524C3.68476 29.793 2 28.3318 2 26.4296V24.3223Z" stroke="#ffffff" strokeWidth="2.1762"/>
              </svg>
            </button>
          </div>
        )}
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
            <Button size="sm" variant="ghost" onClick={() => handleLogout('desktop')}>Выйти из аккаунта</Button>
          </>
        )}
      </div>
      {isMenuOpen && menuPosition && createPortal(
          <div className="account-menu-portal" style={{ position: 'fixed', top: menuPosition.top, right: menuPosition.right, zIndex: 10002 }}>
          <div className="account-menu" role="menu" tabIndex={-1} style={{
            background: '#0f172a',
            border: 'none',
            borderRadius: 10,
            minWidth: 200,
            boxShadow: '0 10px 26px rgba(0,0,0,.34)',
            padding: 6
          }}>
            {user?.email && (
              <div style={{
                color: '#cbd5e1',
                fontSize: 12,
                padding: '8px 12px 6px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                marginBottom: 6
              }}>
                {user.email}
              </div>
            )}
            <button
              type="button"
              className="logout-button"
              onClick={() => handleLogout(menuFor || 'desktop')}
              style={{
                width: '100%',
                background: 'transparent',
                color: '#e6e6e6',
                border: 'none',
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: 8,
                cursor: 'pointer'
              }}
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>, document.body)}
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


