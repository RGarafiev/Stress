import React from 'react';
import { Grid, Col } from '../../components/ui/Grid';
import { useFadeIn } from '../../hooks/useFadeIn';
import { useAuth } from '../../app/providers/AuthProvider';
import { useModal } from '../../app/providers/ModalProvider';
import { useNavigate } from 'react-router-dom';

// Компонент для новой стрелки (мобильная версия)
const MobileArrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    width="51" 
    height="94" 
    viewBox="0 0 51 94" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M43.7071 93.7071C43.3166 94.0976 42.6834 94.0976 42.2929 93.7071L35.9289 87.3431C35.5384 86.9526 35.5384 86.3195 35.9289 85.9289C36.3195 85.5384 36.9526 85.5384 37.3432 85.9289L43 91.5858L48.6569 85.9289C49.0474 85.5384 49.6806 85.5384 50.0711 85.9289C50.4616 86.3195 50.4616 86.9526 50.0711 87.3431L43.7071 93.7071ZM0.999992 3.67176e-06L1.99999 3.64995e-06C1.99999 15.2315 4.60485 25.3594 8.45061 32.7904C12.2974 40.2232 17.4261 45.0421 22.6588 49.625C27.8693 54.1884 33.253 58.5678 37.2861 65.0369C41.3417 71.5422 44 80.0913 44 93L43 93L42 93C42 80.3855 39.4083 72.2213 35.5889 66.095C31.747 59.9325 26.6307 55.7622 21.3412 51.1296C16.0739 46.5165 10.7026 41.4932 6.67438 33.7096C2.64514 25.9241 -6.27772e-06 15.4614 -7.62939e-06 3.69357e-06L0.999992 3.67176e-06Z" 
      fill="#121212" 
      fillOpacity="0.4"
    />
  </svg>
);

export const CareSection: React.FC = () => {
  const { elementRef: titleRef, shouldAnimate: titleShouldAnimate } = useFadeIn<HTMLHeadingElement>({ delay: 0 });
  const { elementRef: labelRef, shouldAnimate: labelShouldAnimate } = useFadeIn<HTMLDivElement>({ delay: 200 });
  const { elementRef: arrowRef, shouldAnimate: arrowShouldAnimate } = useFadeIn<HTMLDivElement>({ delay: 400 });
  const { elementRef: descTitleRef, shouldAnimate: descTitleShouldAnimate } = useFadeIn<HTMLHeadingElement>({ delay: 600 });
  const { elementRef: descTextRef, shouldAnimate: descTextShouldAnimate } = useFadeIn<HTMLParagraphElement>({ delay: 800 });
  const { elementRef: ctaRef, shouldAnimate: ctaShouldAnimate } = useFadeIn<HTMLButtonElement>({ delay: 1000 });
  const { user, ensureAuthenticated } = useAuth();
  const { open } = useModal();
  const navigate = useNavigate();

  return (
    <section id="mission" className="container care-section">
      {/* Mission label (should be above on mobile) */}
      <div 
        ref={labelRef}
        className={`care-mission-label fade-in-right ${labelShouldAnimate ? 'animate' : ''}`}
      >
        {`{ Миссия игры }`}
      </div>

      {/* Header row: title */}
      <div className="care-head">
        <h2 
          ref={titleRef}
          className={`care-title fade-in-left ${titleShouldAnimate ? 'animate' : ''}`}
        >
          Игра, которая<br/>
          <span className="care-title-dim">заботится о тебе</span>
        </h2>
            <p 
          className="care-subtitle"
        >
              {/* Это игра-антистресс, где заботясь о герое, ты учишься бережно относиться к себе. */}
        </p>
      </div>

      {/* Body: left arrow, right description */}
      <div className="care-grid">
        <div className="care-left">
          <div 
            ref={arrowRef}
            className={`care-arrow fade-in-left ${arrowShouldAnimate ? 'animate' : ''}`}
            aria-hidden
          >
            {/* Десктопная стрелка */}
            <svg className="care-arrow-desktop" viewBox="0 0 577 142" width="577" height="142" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.98479 0.992639C1.98479 0.444522 1.54076 0 0.992639 0C0.444522 0 0 0.444522 0 0.992639C0.661635 0.992639 1.32316 0.992639 1.98479 0.992639ZM576.009 128.631C576.243 128.865 576.478 129.098 576.712 129.332C576.898 129.146 577.002 128.894 577.002 128.631C577.002 128.368 576.898 128.115 576.712 127.929C576.478 128.163 576.243 128.397 576.009 128.631ZM259.03 67.9832C258.77 67.7779 258.511 67.5724 258.251 67.3671L259.03 67.9832ZM564.415 115.631C564.028 115.244 563.398 115.244 563.011 115.631C562.624 116.019 562.624 116.647 563.011 117.035C563.479 116.567 563.947 116.099 564.415 115.631ZM563.011 140.227C562.624 140.614 562.624 141.242 563.011 141.63C563.398 142.018 564.028 142.018 564.415 141.63C563.947 141.162 563.479 140.695 563.011 140.227ZM0 0.992639C0 13.3967 5.59857 22.0547 15.1489 27.8317C24.6254 33.5639 37.9655 36.4503 53.525 37.538C84.6557 39.7142 125.207 34.7132 162.885 30.1747C181.748 27.9025 199.896 25.7447 215.839 24.6454C231.799 23.5448 245.459 23.5127 255.37 25.4533C265.347 27.406 271.061 31.2463 272.041 37.5099C272.542 40.7168 271.848 44.7209 269.622 49.6896C267.399 54.6521 263.682 60.5031 258.251 67.3671C258.77 67.7777 259.29 68.1882 259.809 68.5987C265.295 61.663 269.119 55.6682 271.433 50.501C273.743 45.34 274.584 40.9308 274.001 37.2036C272.813 29.5987 265.873 25.4869 255.752 23.5054C245.568 21.5115 231.687 21.5627 215.703 22.6649C199.7 23.7683 181.5 25.9327 162.648 28.2035C124.898 32.7506 84.5631 37.7182 53.6636 35.5581C38.2079 34.4778 25.2471 31.6201 16.1764 26.1334C7.1797 20.6914 1.98479 12.6556 1.98479 0.992639C1.32316 0.992639 0.661635 0.992639 0 0.992639ZM258.251 67.3671C249.254 78.7389 245.658 88.4269 246.807 96.6563C247.96 104.926 253.855 111.395 263.037 116.431C272.22 121.466 284.846 125.159 299.815 127.838C314.796 130.519 332.186 132.196 350.943 133.165C388.458 135.104 431.503 134.217 471.772 132.847C512.066 131.476 549.548 129.623 576.009 129.623C576.009 128.962 576.009 128.3 576.009 127.638C549.503 127.638 511.944 129.494 471.705 130.863C431.441 132.233 388.468 133.117 351.048 131.183C332.337 130.217 315.034 128.546 300.165 125.884C285.28 123.22 272.9 119.574 263.993 114.69C255.085 109.806 249.803 103.775 248.773 96.3815C247.735 88.9465 250.942 79.8052 259.809 68.5987C259.29 68.1882 258.77 67.7777 258.251 67.3671ZM576.712 127.929C572.613 123.83 568.514 119.731 564.415 115.631C563.947 116.099 563.479 116.567 563.011 117.035C567.111 121.134 571.21 125.233 575.31 129.332C575.777 128.865 576.244 128.397 576.712 127.929ZM575.31 127.929C571.21 132.028 567.111 136.127 563.011 140.227C563.479 140.695 563.947 141.162 564.415 141.63C568.514 137.531 572.613 133.432 576.712 129.332C576.244 128.865 575.777 128.397 575.31 127.929Z" fill="#7F7D7C"/>
            </svg>
            
            {/* Мобильная стрелка */}
            <MobileArrow className="care-arrow-mobile" />
          </div>
        </div>
        <div className="care-right">
          <div className="care-desc">
            <h3 
              ref={descTitleRef}
              className={`care-title-desc fade-in-up ${descTitleShouldAnimate ? 'animate' : ''}`}
            >
              "Самогочи" создан, чтобы<br/> напоминать: даже в суете дня<br/> у тебя есть время на себя
            </h3>
            <p 
              ref={descTextRef}
              className={`care-description fade-in-up ${descTextShouldAnimate ? 'animate' : ''}`}
            >
              Это игра-антистресс, где заботясь о герое, ты учишься бережно относиться к себе.
            </p>
            <button 
              type="button"
              ref={ctaRef}
              className={`care-cta fade-in-up ${ctaShouldAnimate ? 'animate' : ''}`}
              onClick={async () => {
                const ok = user ? true : await ensureAuthenticated();
                if (ok) {
                  navigate('/game', { state: { entry: 'cta-care' } });
                } else {
                  open('login');
                }
              }}
            >
              Смотри, как тревога растворяется, уступая место лёгкости.
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


