import React from 'react';
import { Grid, Col } from '../../components/ui/Grid';
import { Button } from '../../components/ui/Button';
import { BlobBehindPerson, PersonOutline, AboutLightBlob } from '../../components/ui/BlobElements';
import { useFadeIn } from '../../hooks/useFadeIn';

export const AboutSection: React.FC = () => {
  const { elementRef: labelRef, shouldAnimate: labelShouldAnimate } = useFadeIn<HTMLDivElement>({ delay: 0 });
  const { elementRef: titleRef, shouldAnimate: titleShouldAnimate } = useFadeIn<HTMLHeadingElement>({ delay: 200 });
  const { elementRef: subtitleRef, shouldAnimate: subtitleShouldAnimate } = useFadeIn<HTMLParagraphElement>({ delay: 400 });
  const { elementRef: buttonRef, shouldAnimate: buttonShouldAnimate } = useFadeIn<HTMLDivElement>({ delay: 600 });

  return (
    <section className="about container">
      <Grid>
        <Col span={6} smSpan={4}>
          <div className="about-image-container">
            {/* Светлое пятно позади всех — стандартная SVG без поворота */}
            <AboutLightBlob 
              className="about-light-blob"
            />

            {/* Бирюзовое пятно за спиной персонажа */}
            <BlobBehindPerson className="about-blob-behind" />

            {/* Портрет */}
            <img 
              src="/images/person-photo-23b545.png" 
              alt="Человек в костюме" 
              className="about-person-image"
            />

            {/* Обводка вокруг портрета: верх ~30px над головой, низ по линии торса */}
            <PersonOutline className="about-person-outline" />
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
            <Button variant="game" className="about-cta">Погрузиться в мир</Button>
          </div> 
        </Col>
      </Grid>
    </section>
  );
};


