import React from 'react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { useFadeIn } from '../../hooks/useFadeIn';

type Props = {
  title: React.ReactNode;
  subtitle: string;
  ctaHref: string;
  ctaText: string;
  onCtaClick?: () => void;
};

export const Hero: React.FC<Props> = ({ title, subtitle, ctaHref, ctaText, onCtaClick }) => {
  const { elementRef: titleRef, shouldAnimate: titleShouldAnimate } = useFadeIn<HTMLHeadingElement>({ delay: 0, immediate: true });
  const { elementRef: subtitleRef, shouldAnimate: subtitleShouldAnimate } = useFadeIn<HTMLParagraphElement>({ delay: 300, immediate: true });
  const { elementRef: buttonRef, shouldAnimate: buttonShouldAnimate } = useFadeIn<HTMLDivElement>({ delay: 600, immediate: true });

  return (
    <section className="hero">
      <h1 
        ref={titleRef}
        className={`hero-title fade-in-up ${titleShouldAnimate ? 'animate' : ''}`}
      >
        {title}
      </h1>
      <p 
        ref={subtitleRef}
        className={`hero-subtitle fade-in-up ${subtitleShouldAnimate ? 'animate' : ''}`}
      >
        {subtitle}
      </p>
      <div 
        ref={buttonRef}
        className={`fade-in-up ${buttonShouldAnimate ? 'animate' : ''}`}
        style={{ marginTop: 24 }}
      >
        {onCtaClick ? (
          <Button variant="game" onClick={onCtaClick}>{ctaText}</Button>
        ) : (
          <Link to={ctaHref}><Button variant="game">{ctaText}</Button></Link>
        )}
      </div>
    </section>
  );
};


