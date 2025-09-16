import React from 'react';
import { Button } from '../../components/ui/Button';
import { Grid, Col } from '../../components/ui/Grid';
import { Card } from '../../components/ui/Card';
import { Link } from 'react-router-dom';
import { Hero } from '../../components/sections/Hero';
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
  return (
    <div className="col" style={{ gap: 48, width: '100%' }}>

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
          onCtaClick={() => open('login')}
        />
      </HeroBackground>

      <HowItWorks />

      <CareSection />

      <ArticlesSection />

      <AboutSection />
    </div>
  );
};


