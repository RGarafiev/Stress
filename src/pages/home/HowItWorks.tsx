import React from 'react';
import { Grid, Col } from '../../components/ui/Grid';
import { useFadeIn } from '../../hooks/useFadeIn';

type Item = { num: number; text: string };

const items: Item[] = [
  { num: 1, text: 'Выбираешь героя, который ближе по духу' },
  { num: 2, text: 'Встречаете вместе жизненные ситуации' },
  { num: 3, text: 'Помогаешь ему —\nи себе — пройти их легко' },
  { num: 4, text: 'Заботишься\n о персонаже: еда, отдых' },
  { num: 5, text: 'Радуетесь маленьким победам и копите опыт' },
  { num: 6, text: 'Делитесь историей\n и вдохновляете других' }
];

const StepIcon: React.FC<{ num: number }> = ({ num }) => (
  <div style={{ position: 'relative', width: 30, height: 30 }}>
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="14.5" stroke="#D3D3D3" strokeWidth="1" strokeDasharray="6.75 6.75" fill="none" />
    </svg>
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: 20,
      fontFamily: 'Comfortaa',
      fontWeight: 400,
      lineHeight: '1.6em',
      letterSpacing: '-2.5%',
      color: '#979797'
    }}>
      {num}
    </div>
  </div>
);

const HowItem: React.FC<{ item: Item; index: number }> = ({ item, index }) => {
  const { elementRef: itemRef, shouldAnimate: itemShouldAnimate } = useFadeIn<HTMLDivElement>({ delay: index * 100 + 600 });
  
  return (
    <Col span={4} smSpan={4}>
      <div 
        ref={itemRef}
        className={`how-item fade-in-up ${itemShouldAnimate ? 'animate' : ''}`}
      >
        <StepIcon num={item.num} />
        <div className="how-text">{item.text}</div>
      </div>
    </Col>
  );
};

export const HowItWorks: React.FC = () => {
  const { elementRef: labelRef, shouldAnimate: labelShouldAnimate } = useFadeIn<HTMLDivElement>({ delay: 0 });
  const { elementRef: titleRef, shouldAnimate: titleShouldAnimate } = useFadeIn<HTMLHeadingElement>({ delay: 200 });
  const { elementRef: subtitleRef, shouldAnimate: subtitleShouldAnimate } = useFadeIn<HTMLParagraphElement>({ delay: 400 });

  return (
    <section id="rules" className="how container">
      <Grid className="how-header">
        <Col span={6} smSpan={4}>
          <div 
            ref={labelRef}
            className={`how-label fade-in-left ${labelShouldAnimate ? 'animate' : ''}`}
          >
            {`{ Правила }`}
          </div>
        </Col>
        <Col span={6} smSpan={4}>
          <h2 
            ref={titleRef}
            className={`how-title fade-in-up ${titleShouldAnimate ? 'animate' : ''}`}
          >
            Как всё <span className="how-title-dim">устроено?</span>
          </h2>
          <p 
            ref={subtitleRef}
            className={`how-sub fade-in-up ${subtitleShouldAnimate ? 'animate' : ''}`}
          >
            Простые шаги, чтобы понять правила игры
          </p>
        </Col>
      </Grid>

      <Grid className="how-list">
        {items.map((item, index) => (
          <HowItem key={item.num} item={item} index={index} />
        ))}
      </Grid>
    </section>
  );
};


