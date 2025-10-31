import React, { useEffect, useMemo, useState } from 'react';
import { Grid, Col } from '../../components/ui/Grid';
import { Button } from '../../components/ui/Button';
import { BlobBehindPerson, BlobBehindPersonMobile, PersonOutline, AboutLightBlob } from '../../components/ui/BlobElements';
import { useFadeIn } from '../../hooks/useFadeIn';
import { useModal } from '../../app/providers/ModalProvider';
import { useAuth } from '../../app/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import {BASENAME} from "../../index";

export const AboutSection: React.FC = () => {
  const { open } = useModal();
  const { user, ensureAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { elementRef: labelRef, shouldAnimate: labelShouldAnimate } = useFadeIn<HTMLDivElement>({ delay: 0 });
  const { elementRef: titleRef, shouldAnimate: titleShouldAnimate } = useFadeIn<HTMLHeadingElement>({ delay: 200 });
  const { elementRef: subtitleRef, shouldAnimate: subtitleShouldAnimate } = useFadeIn<HTMLParagraphElement>({ delay: 400 });
  const { elementRef: buttonRef, shouldAnimate: buttonShouldAnimate } = useFadeIn<HTMLDivElement>({ delay: 600 });


  const MOBILE_BLOBS = {
    tabletDown: {
      light: { dx: -80, dy: -20, rotate: 0, width: 400, height: 270 },
      lightScale: 0.25,
      behind: { dx: 60, dy: 180, rotate: 0 },
      behindScale: 0.72,
      outline: { dx: 0, dy: 0, rotate: 6 },
    },
    phone: {
      light: { dx: 20, dy: -16, rotate: 0, width: 600, height: 400 },
      lightScale: 1.4,
      behind: { dx: -35, dy: -40, rotate: 0 },
      behindScale: 0.66,
      outline: { dx: -9, dy: 4, rotate: 6 },
    },
  } as const;

  const [viewport, setViewport] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 1024 });
  useEffect(() => {
    const handler = () => setViewport({ width: window.innerWidth });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const isTabletDown = viewport.width <= 768;
  const isPhone = viewport.width <= 480;

  const blobStyles = useMemo(() => {
    if (!isTabletDown) return { light: {}, behind: {}, outline: {} } as {
      light: React.CSSProperties; behind: React.CSSProperties; outline: React.CSSProperties
    };
    const preset = isPhone ? MOBILE_BLOBS.phone : MOBILE_BLOBS.tabletDown;
    const lightScale = preset.lightScale;
    const behindScale = preset.behindScale;
    return {
      light: {
        transform: `translate(calc(-50% + ${preset.light.dx}px), calc(-50% + ${preset.light.dy}px)) rotate(${preset.light.rotate}deg) scale(${lightScale})`,
        width: preset.light.width,
        height: preset.light.height,
      } as React.CSSProperties,
      behind: {
        transform: `translate(${preset.behind.dx}px, ${preset.behind.dy}px) rotate(${preset.behind.rotate}deg) scale(${behindScale})`,
      } as React.CSSProperties,
      outline: {
        transform: `translate(${preset.outline.dx}px, ${preset.outline.dy}px) rotate(${preset.outline.rotate}deg)`,
      } as React.CSSProperties,
    };
  }, [isTabletDown, isPhone]);

  return (
    <section className="about container">
      <Grid>
        <Col span={6} smSpan={4} className="about-visual">
          <div className="about-image-container">
            {/* Светлое пятно позади всех — стандартная SVG без поворота */}
            <AboutLightBlob 
              className="about-light-blob"
              style={blobStyles.light}
            />

            {/* Бирюзовое пятно за спиной персонажа */}
            {isTabletDown ? (
              <BlobBehindPersonMobile className="about-blob-behind" style={blobStyles.behind} />
            ) : (
              <BlobBehindPerson className="about-blob-behind" style={blobStyles.behind} />
            )}

            {/* Портрет */}
            <img 
              src={`${BASENAME}/images/person-photo-23b545.png`}
              alt="Человек в костюме" 
              className="about-person-image"
            />

            {/* Обводка вокруг портрета: верх ~30px над головой, низ по линии торса */}
            <PersonOutline className="about-person-outline" style={blobStyles.outline} />
            {/* Подпись под портретом */}
            <div className="about-person-caption">
              <div className="about-person-text">
                Мотовилин Олег,<br/>
                кандидат психологических наук, доцент. Клинический психолог, специалист в сфере эмоциональных и личностных нарушений.
              </div>
            </div>
          </div>
        </Col>
        <Col span={6} smSpan={4} className="about-content">
          <div 
            ref={labelRef}
            className={`how-label about-label fade-in-left ${labelShouldAnimate ? 'animate' : ''}`}
          >
            {`{ О нас }`}
          </div>
          <h2 
            ref={titleRef}
            className={`about-title fade-in-up ${titleShouldAnimate ? 'animate' : ''}`}
          >
            <span className="about-title-dark">Твоё спокойствие</span><br/><span className="about-title-dim">начинается здесь</span>
          </h2>
          <p 
            ref={subtitleRef}
            className={`about-sub fade-in-up ${subtitleShouldAnimate ? 'animate' : ''}`}
          >
            Создай персонажа, помоги ему прожить день<br/>без лишней тревоги — и почувствуй, как становится легче самому
          </p>
          <div 
            ref={buttonRef}
            className={`fade-in-up ${buttonShouldAnimate ? 'animate' : ''}`}
          >
            <Button 
              variant="game" 
              className="about-cta"
              onClick={async () => {
                const ok = user ? true : await ensureAuthenticated();
                if (ok) {
                  navigate('/game', { state: { entry: 'about-cta' } });
                } else {
                  open('login');
                }
              }}
            >
              Погрузиться в мир
            </Button>
          </div> 
        </Col>
      </Grid>
    </section>
  );
};


