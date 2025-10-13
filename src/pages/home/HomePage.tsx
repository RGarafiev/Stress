import React from 'react';
import { Button } from '../../components/ui/Button';
import { Grid, Col } from '../../components/ui/Grid';
import { Card } from '../../components/ui/Card';
import { Link } from 'react-router-dom';
import { Hero } from '../../components/sections/Hero';
import { useAuth } from '../../app/providers/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModal } from '../../app/providers/ModalProvider';
import { SiteHeader } from '../../components/shared/SiteHeader';
import { HowItWorks } from './HowItWorks';
import { CareSection } from './CareSection';
import { ArticlesSection } from './ArticlesSection';
import { AboutSection } from './AboutSection';
import { PageBlobs } from '../../components/ui/BlobElements';
import { HeroBackground } from '../../components/ui/HeroBackground';

export const HomePage: React.FC = () => {
  const { open } = useModal();
  const { user, ensureAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // If navigated with state.scrollTo from footer, scroll to that section
  React.useEffect(() => {
    const navState = (location.state as any) || undefined;
    const sectionId: string | undefined = navState?.scrollTo;
    const toTop: boolean | undefined = navState?.toTop;
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    } else if (toTop) {
      // robust top scroll
      setTimeout(() => {
        const el = document.scrollingElement || document.documentElement;
        if (el && 'scrollTo' in el) (el as HTMLElement).scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        (document.body as HTMLElement).scrollTop = 0;
        (document.documentElement as HTMLElement).scrollTop = 0;
      }, 0);
    }
  }, [location]);
  return (
    <div className="col" style={{ gap: 'clamp(84px, 10.5vw, 180px)', width: '100%' }}>

      <HeroBackground>
        <SiteHeader embedded />
        <Hero
          title={<>
            Самогочи: антистресс<br/>
            игра прямо в браузере
          </>}
          subtitle="Создай персонажа, заботься о нём и вместе находите способы справляться с тревогой мягко и с улыбкой"
          ctaHref="/game"
          ctaText="Начать игру"
          onCtaClick={async () => {
            const ok = user ? true : await ensureAuthenticated();
            if (ok) {
              navigate('/game', { state: { entry: 'cta' } });
            } else {
              open('login');
            }
          }}
        />
      </HeroBackground>

      <HowItWorks />

      <CareSection />

      <ArticlesSection />

      <AboutSection />
    </div>
  );
};


