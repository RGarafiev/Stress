import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const SHOW_THRESHOLD = 120; // показать, если скролл больше
  const HIDE_THRESHOLD = 40;  // скрыть, если меньше 

  const [visible, setVisible] = useState(false);
  const isProgrammaticRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const location = useLocation();

  const getScrollTop = () => {
    return (
      window.pageYOffset ||
      (document.documentElement && document.documentElement.scrollTop) ||
      (document.body && (document.body as any).scrollTop) ||
      0
    );
  };

  const scheduleVisibilityUpdate = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const y = getScrollTop();
      if (isProgrammaticRef.current) {
        setVisible(false);
        return;
      }
      setVisible(prev => (prev ? y > HIDE_THRESHOLD : y > SHOW_THRESHOLD));
    });
  };

  useEffect(() => {
    const onAnyScroll = () => scheduleVisibilityUpdate();
    window.addEventListener('scroll', onAnyScroll, { passive: true });
    window.addEventListener('resize', onAnyScroll, { passive: true });
    window.addEventListener('wheel', onAnyScroll, { passive: true });
    window.addEventListener('touchmove', onAnyScroll, { passive: true });
    scheduleVisibilityUpdate();
    return () => {
      window.removeEventListener('scroll', onAnyScroll as EventListener);
      window.removeEventListener('resize', onAnyScroll as EventListener);
      window.removeEventListener('wheel', onAnyScroll as EventListener);
      window.removeEventListener('touchmove', onAnyScroll as EventListener);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current as unknown as number);
    };
  }, []);

  // Появление при переходах по навигации (прокрутка к секции)
  useEffect(() => {
    scheduleVisibilityUpdate();
    const t1 = window.setTimeout(scheduleVisibilityUpdate, 50);
    const t2 = window.setTimeout(scheduleVisibilityUpdate, 300);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [location]);

  const scrollToTop = () => {

    isProgrammaticRef.current = true;
    setVisible(false);

    try { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); } catch {}

    const root = (document.scrollingElement || document.documentElement) as HTMLElement;
    if (root) {
      try { (root as any).scrollTo?.({ top: 0, left: 0, behavior: 'smooth' }); } catch { root.scrollTop = 0; }
    }
    (document.body as HTMLElement).scrollTop = 0;
    (document.documentElement as HTMLElement).scrollTop = 0;

    const waitToTop = () => {
      if (getScrollTop() <= 1) {
        isProgrammaticRef.current = false;
        scheduleVisibilityUpdate();
      } else {
        timeoutRef.current = window.setTimeout(waitToTop, 100);
      }
    };
    waitToTop();
    window.setTimeout(() => { isProgrammaticRef.current = false; scheduleVisibilityUpdate(); }, 1500);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top ${visible ? 'visible' : ''}`}
      aria-label="Прокрутить наверх"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#979797',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease'
      }}
    >
      <img
        src="/images/arrow-top5-svgrepo-com.svg"
        alt="Наверх"
        style={{ width: '28px', height: '28px', filter: 'brightness(0) invert(1)' }}
      />
    </button>
  );
};

