import React from 'react';
import { Button } from '../components/ui/Button';
import { SiteHeader } from '../components/shared/SiteHeader';
import { SiteFooter } from '../components/shared/SiteFooter';
import { Link } from 'react-router-dom';
import { useFadeIn } from '../hooks/useFadeIn';
import {BASENAME} from "../index";

export const NotFoundPage: React.FC = () => {
  const { elementRef: titleRef, shouldAnimate: titleShouldAnimate } = useFadeIn<HTMLHeadingElement>({ delay: 0, immediate: true });
  const { elementRef: subtitleRef, shouldAnimate: subtitleShouldAnimate } = useFadeIn<HTMLParagraphElement>({ delay: 300, immediate: true });
  const { elementRef: buttonRef, shouldAnimate: buttonShouldAnimate } = useFadeIn<HTMLDivElement>({ delay: 600, immediate: true });

  const bgStyle: React.CSSProperties = {
    background: `linear-gradient(rgba(13, 13, 13, 0.65), rgba(13, 13, 13, 0.65)), url('${BASENAME}/images/404-bg-18b585.png')`,
  };

  return (
    <div className="not-found-page">
      {/* Main Content Area */}
      <div className="not-found-main">
        {/* Background Image */}
        <div className="not-found-bg" style={bgStyle} />
        
        {/* Header */}
        <SiteHeader embedded={true} />
        
        {/* Content */}
        <div className="not-found-content">
          <h1 
            ref={titleRef}
            className={`not-found-title fade-in-up ${titleShouldAnimate ? 'animate' : ''}`}
          >
            Ошибка: 404
          </h1>
          <p 
            ref={subtitleRef}
            className={`not-found-subtitle fade-in-up ${subtitleShouldAnimate ? 'animate' : ''}`}
          >
            Cтраница не работает. Обновите ее<br/>
            или перейдите на главную
          </p>
          <div 
            ref={buttonRef}
            className={`fade-in-up ${buttonShouldAnimate ? 'animate' : ''}`}
          >
            <Link to="/">
              <Button variant="game">На главную</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
};
