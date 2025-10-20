import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogoSvg } from '../ui/LogoSvg';

export const SiteFooter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      if (el && 'scrollTo' in el) {
        (el as HTMLElement).scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      // hard fallback
      (document.body as HTMLElement).scrollTop = 0;
      (document.documentElement as HTMLElement).scrollTop = 0;
    };
    if (location.pathname !== '/') {
      navigate('/', { replace: false, state: { toTop: true, ts: Date.now() } });
      setTimeout(scrollTopSmooth, 120);
      return;
    }
    scrollTopSmooth();
  }

  return (
    <footer className="footer">
      <div className="footer-blobs" aria-hidden="true">
        <div className="footer-blobs-inner">
        {/* Left light blob (updated) */}
        <svg className="footer-blob-left-svg" width="941" height="228" viewBox="0 0 941 228" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M620.766 850.997C909.378 796.937 947.526 652.696 939.753 454.934C931.98 257.172 793.913 224.463 712.951 121.047C631.989 17.6321 346.896 -82.6538 126.357 106.148C-204.279 389.203 211.315 584.901 292.061 631.104C372.807 677.306 260.001 918.571 620.766 850.997Z" fill="#ECFDFF"/>
        </svg>

        {/* Center blob (updated) */}
        <svg className="footer-blob-center-svg" width="454" height="74" viewBox="0 0 454 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M91.3076 24.086C-21.1147 80.8629 -11.8037 143.578 26.3477 222.276C64.4991 300.975 128.606 297.401 181.05 329.227C233.493 361.054 371.641 366.861 431.543 264.078C521.349 109.985 311.236 81.5827 268.971 72.7703C226.706 63.9578 231.836 -46.8852 91.3076 24.086Z" fill="#22D4EA"/>
        </svg>

        {/* Right light blob (updated) */}
        <svg className="footer-blob-right-svg" width="783" height="228" viewBox="0 0 783 228" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M267.252 34.261C-8.73297 134.519 -22.9256 283.043 16.8932 476.911C56.7119 670.779 198.259 680.608 294.956 769.486C391.653 858.365 689.256 910.971 876.169 688.829C1156.39 355.79 714.514 230.255 627.331 197.794C540.148 165.332 612.232 -91.0616 267.252 34.261Z" fill="#ECFDFF"/>
        </svg>

        {/* Mobile-only blobs: light left, dark right */}
        <svg className="footer-blob-left-mobile" width="374" height="244" viewBox="0 0 374 244" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M237.372 850.997C525.984 796.937 564.132 652.696 556.359 454.934C548.586 257.172 410.519 224.463 329.557 121.047C248.595 17.6321 -36.4982 -82.6538 -257.037 106.148C-587.672 389.203 -172.079 584.901 -91.3331 631.104C-10.5872 677.306 -123.392 918.571 237.372 850.997Z" fill="#ECFDFF"/>
        </svg>
        <svg className="footer-blob-right-mobile" width="179" height="244" viewBox="0 0 179 244" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M90.0925 23.5903C-21.2654 80.3303 -12.0426 143.004 25.7476 221.652C63.5378 300.299 127.038 296.727 178.985 328.533C230.932 360.339 367.772 366.142 427.107 263.426C516.063 109.433 307.939 81.0496 266.074 72.2429C224.209 63.4362 229.29 -47.3347 90.0925 23.5903Z" fill="#22D4EA"/>
        </svg>
        </div>
      </div>

      <div className="container footer-inner">
        <nav className="footer-nav">
          <Link to="/" onClick={goHome}>Главная</Link>
          <a href="#rules" onClick={(e) => { e.preventDefault(); goToSection('rules'); }}>Правила</a>
          <a href="#mission" onClick={(e) => { e.preventDefault(); goToSection('mission'); }}>Миссия игры</a>
          <a href="#blog" onClick={(e) => { e.preventDefault(); goToSection('blog'); }}>Статьи</a>
          <Link to="/privacy">Политика конфиденциальности</Link>
        </nav>
        <div className="footer-brand" aria-label="Stresshelp">
          <Link to="/" onClick={goHome} className="footer-logo-link" aria-label="Stresshelp">
            <span className="footer-logo"><LogoSvg className="footer-logo-img" /></span>
          </Link>
        </div>
      </div>
    </footer>
  );
};


