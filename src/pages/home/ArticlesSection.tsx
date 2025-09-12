import React, { useRef, useState } from 'react';
import { Grid, Col } from '../../components/ui/Grid';
import { useFadeIn } from '../../hooks/useFadeIn';

const ArticlesLogo: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="165" height="76" viewBox="0 0 165 76" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M11.5148 26.5985C9.2925 26.5985 7.36003 26.1154 5.62081 25.2458C3.88159 24.3762 2.52887 22.9268 1.56263 21.091C0.596398 19.1585 0.113281 16.8395 0.113281 13.8442C0.113281 10.7523 0.596398 8.33668 1.65926 6.40421C2.72211 4.47174 4.07484 3.11901 5.81406 2.15278C7.55328 1.28317 9.58237 0.800049 11.8047 0.800049C13.0608 0.800049 14.3169 0.896674 15.4764 1.18654C16.6359 1.47641 17.6021 1.76628 18.3751 2.15278L17.0224 5.5346C16.2494 5.24473 15.3798 4.95485 14.4135 4.76161C13.4473 4.47174 12.4811 4.37511 11.6115 4.37511C6.68367 4.37511 4.26809 7.46706 4.26809 13.7476C4.26809 16.7429 4.84783 19.0619 6.00731 20.7045C7.16679 22.2504 9.00263 23.0234 11.3216 23.0234C12.6743 23.0234 13.8338 22.9268 14.8967 22.6369C15.9595 22.3471 16.9257 22.0572 17.7954 21.5741V25.1491C16.9257 25.5356 16.0561 25.9221 14.9933 26.1154C14.1237 26.5019 12.8676 26.5985 11.5148 26.5985ZM41.1782 4.66498H33.0619V26.1154H29.0037V4.66498H20.9839V1.18654H41.1782V4.66498ZM57.6042 0.800049C60.6961 0.800049 63.1117 1.86291 64.9476 3.98862C66.88 6.11434 67.7496 9.30291 67.7496 13.651C67.7496 17.9024 66.7834 21.091 64.9476 23.3133C63.1117 25.5356 60.5995 26.5985 57.5076 26.5985C55.5751 26.5985 54.0291 26.212 52.773 25.5356C51.5169 24.7626 50.5507 24.0863 49.8743 23.12V37.3237H45.8161V1.28317H49.8743V4.47174C50.0676 3.98862 52.4832 0.800049 57.6042 0.800049ZM57.5076 3.89199C51.5169 3.89199 50.2608 8.52992 50.2608 13.4577C50.2608 18.1923 51.227 23.2167 57.6042 23.2167C64.7543 23.2167 64.4644 15.2936 64.4644 13.4577C64.4644 8.62654 63.305 3.89199 57.5076 3.89199ZM154.131 38.773C157.223 38.773 159.638 39.8359 161.474 41.9616C163.407 44.0873 164.276 47.2759 164.276 51.6239C164.276 55.8754 163.31 59.0639 161.474 61.2863C159.638 63.5086 157.126 64.5715 154.034 64.5715C152.102 64.5715 150.556 64.185 149.3 63.5086C148.044 62.7356 147.077 61.9627 146.401 60.9964V75.2001H142.343V39.2562H145.725V42.638C146.788 41.1886 147.657 40.4156 148.913 39.8359C150.846 38.773 152.198 38.773 154.131 38.773ZM154.131 41.7684C148.14 41.7684 146.884 46.4063 146.884 51.3341C146.884 56.0686 147.85 61.093 154.228 61.093C161.378 61.093 161.088 53.1699 161.088 51.3341C161.088 46.5029 159.928 41.7684 154.131 41.7684ZM83.306 0.800049C85.4317 0.800049 87.2676 1.28317 88.8135 2.15278C90.3595 3.11901 91.519 4.37511 92.292 6.11433C93.1616 7.75693 93.5481 9.78602 93.5481 12.0084V14.4239H76.5424C76.639 17.226 77.3154 19.3517 78.6681 20.8977C80.0208 22.3471 81.9533 23.12 84.4655 23.12C86.0115 23.12 87.4608 23.0234 88.6203 22.7336C89.8764 22.4437 91.1325 21.9606 92.3886 21.4775V24.9559C91.1325 25.5356 89.8764 25.9221 88.6203 26.1154C87.3642 26.4052 85.9148 26.5019 84.1756 26.5019C81.8567 26.5019 79.7309 26.0187 77.8951 25.0525C76.0592 24.0863 74.7065 22.6369 73.6437 20.8011C72.6774 18.8686 72.1943 16.5497 72.1943 13.8442C72.1943 11.1388 72.6774 8.81979 73.547 6.88732C74.5133 4.95486 75.7694 3.40888 77.412 2.34602C79.2478 1.28316 81.1803 0.800049 83.306 0.800049ZM83.306 4.18187C81.3735 4.18187 79.8276 4.85823 78.6681 6.11433C77.5086 7.37044 76.9289 9.10966 76.639 11.332H89.2967C89.2967 9.20628 88.8135 7.56368 87.8473 6.21096C86.8811 4.76161 85.3351 4.18187 83.306 4.18187ZM102.824 39.3528C104.95 39.3528 106.785 39.8359 108.331 40.7055C109.877 41.6717 111.037 42.9278 111.81 44.6671C112.68 46.3097 113.066 48.3388 113.066 50.5611V52.9767H96.0603C96.1569 55.7788 96.8333 57.9045 98.186 59.4504C99.5387 60.8998 101.471 61.6728 103.983 61.6728C105.529 61.6728 106.979 61.5762 108.138 61.2863C109.394 60.9964 110.65 60.5133 111.907 60.0302V63.6052C110.65 64.185 109.394 64.5715 108.138 64.7647C106.882 65.0546 105.433 65.1512 103.694 65.1512C101.375 65.1512 99.2489 64.6681 97.413 63.7019C95.5772 62.7356 94.2244 61.2863 93.1616 59.4504C92.1954 57.518 91.7122 55.199 91.7122 52.4936C91.7122 49.7881 92.1954 47.4691 93.065 45.5367C94.0312 43.6042 95.2873 42.0582 96.9299 40.9954C98.7657 39.9325 100.698 39.3528 102.824 39.3528ZM102.824 42.7346C100.891 42.7346 99.3455 43.411 98.186 44.6671C97.0265 45.9232 96.4468 47.6624 96.1569 49.8847H108.815C108.815 47.759 108.331 46.1164 107.365 44.7637C106.399 43.411 104.853 42.7346 102.824 42.7346ZM109.588 26.5985C107.365 26.5985 105.433 26.1154 103.694 25.2458C101.954 24.3762 100.602 22.9268 99.6354 21.091C98.6691 19.1585 98.186 16.8395 98.186 13.8442C98.186 10.7523 98.6691 8.33668 99.732 6.40421C100.795 4.47174 102.148 3.11901 103.887 2.15278C105.626 1.28317 107.655 0.800049 109.877 0.800049C111.134 0.800049 112.39 0.896674 113.549 1.18654C114.709 1.47641 115.675 1.76628 116.448 2.15278L115.192 5.5346C114.419 5.24473 113.549 4.95485 112.583 4.76161C111.617 4.47174 110.65 4.37511 109.781 4.37511C104.853 4.37511 102.437 7.46706 102.437 13.7476C102.437 16.7429 103.017 19.0619 104.177 20.7045C105.336 22.2504 107.172 23.0234 109.491 23.0234C110.844 23.0234 112.003 22.9268 113.066 22.6369C114.129 22.3471 115.095 22.0572 115.965 21.5741V25.1491C115.095 25.5356 114.225 25.9221 113.163 26.1154C112.196 26.5019 111.037 26.5985 109.588 26.5985ZM131.908 26.5985C129.685 26.5985 127.753 26.1154 126.014 25.2458C124.274 24.3762 122.922 22.9268 121.955 21.091C120.989 19.1585 120.506 16.8395 120.506 13.8442C120.506 10.7523 120.989 8.33668 122.052 6.40421C123.115 4.47174 124.468 3.11901 126.207 2.15278C127.946 1.28317 129.975 0.800049 132.197 0.800049C133.454 0.800049 134.71 0.896674 135.869 1.18654C137.029 1.47641 137.995 1.76628 138.768 2.15278L137.512 5.5346C136.739 5.24473 135.869 4.95485 134.903 4.76161C133.937 4.47174 132.97 4.37511 132.101 4.37511C127.173 4.37511 124.757 7.46706 124.757 13.7476C124.757 16.7429 125.337 19.0619 126.497 20.7045C127.656 22.2504 129.492 23.0234 131.811 23.0234C133.164 23.0234 134.323 22.9268 135.386 22.6369C136.449 22.3471 137.415 22.0572 138.285 21.5741V25.1491C137.415 25.5356 136.545 25.9221 135.483 26.1154C134.516 26.5019 133.357 26.5985 131.908 26.5985ZM83.2094 51.3341L83.306 64.7647H79.1512L79.0546 51.5273C79.0546 48.4354 78.4748 43.9907 73.4504 44.0873C71.7112 44.0873 67.9429 44.8603 67.8463 50.2712L67.9429 64.6681H63.7881V29.3039H67.9429L67.8463 42.5413C67.8463 42.5413 69.972 40.4156 73.6437 40.319C80.0208 40.319 83.2094 44.2806 83.2094 51.3341ZM136.256 64.7647H132.777C129.878 64.7647 127.753 64.4749 126.497 63.8951C125.724 63.5086 125.241 63.1221 124.757 62.7356C123.598 61.5762 123.018 58.9673 123.018 55.0058V32.4925H115.578V29.3039H127.173V54.7159C127.173 57.7112 127.463 59.2572 127.946 59.9336C129.105 61.2863 131.714 61.2863 132.584 61.2863H136.256V64.7647Z" fill="black"/>
  </svg>
);

const ArticlesBlobLeftLight: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="330" height="188" viewBox="0 0 330 188" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M-191.996 252.679C-214.272 422.277 -141.3 469.496 -30.3827 500.967C80.5342 532.439 123.624 461.902 195.536 435.777C267.449 409.653 374.556 269.925 309.904 113.647C212.976 -120.648 29.4256 74.0838 -10.7662 110.439C-50.958 146.793 -164.151 40.6818 -191.996 252.679Z" fill="#ECFDFF"/>
  </svg>
);

const ArticlesBlobRightDark: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="207" height="188" viewBox="0 0 207 188" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M166.371 13.019C67.776 -22.5477 35.1558 18.925 9.3473 86.9799C-16.4612 155.035 22.3365 191.776 33.0521 241.691C43.7677 291.606 119.202 378.501 215.616 356.003C360.161 322.274 257.27 178.929 238.448 148.323C219.626 117.718 289.615 57.4773 166.371 13.019Z" fill="#22D4EA"/>
  </svg>
);

// New: Left outline stroke inside the card
const ArticlesLeftOutline: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="267" height="189" viewBox="0 0 267 189" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M249.93 339.854C246.927 406.78 201.662 417.25 180.44 422.66C159.219 428.069 88.98 440.885 80.9908 442.217C71.0042 443.881 43.9573 453.452 -34.271 431.398C-83.7877 406.848 -120.821 400.19 -139.546 299.076C-158.271 197.962 -142.459 115.989 -102.929 64.8077C-93.5141 52.6185 -56.3247 4.47195 107.205 3.63974C238.029 2.97396 266.02 112.66 263.662 167.586C249.93 306.566 252.843 274.942 249.93 339.854Z" stroke="#1EE3FB" strokeWidth="5.8255"/>
  </svg>
);

// New: Right light blob under the dark blob
const ArticlesRightLightBlob: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="520" height="auto" viewBox="0 0 570 533" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M4.00404 253.5C-18.2716 423.098 54.7004 470.316 165.617 501.788C276.534 533.259 319.624 462.722 391.536 436.598C463.449 410.473 570.556 270.745 505.904 114.467C408.976 -119.828 225.426 74.9041 185.234 111.259C145.042 147.614 31.8486 41.5021 4.00404 253.5Z" fill="#ECFDFF"/>
  </svg>
);

const CornerArrowSvg: React.FC = () => (
  <svg viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32.3096 1.41835L7.20019 1.26978M32.3096 1.41835L32.4582 26.5278M32.3096 1.41835L2 31.728" stroke="#2A2725" strokeWidth="2.5419" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ArticlesSection: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const leftLightRef = useRef<HTMLDivElement>(null);
  const leftOutlineRef = useRef<HTMLDivElement>(null);
  const rightLightRef = useRef<HTMLDivElement>(null);
  const rightDarkRef = useRef<HTMLDivElement>(null);

  const { elementRef: labelRef, shouldAnimate: labelShouldAnimate } = useFadeIn<HTMLDivElement>({ delay: 0 });
  const { elementRef: titleRef, shouldAnimate: titleShouldAnimate } = useFadeIn<HTMLHeadingElement>({ delay: 200 });
  const { elementRef: subtitleRef, shouldAnimate: subtitleShouldAnimate } = useFadeIn<HTMLParagraphElement>({ delay: 400 });

  const [transforms, setTransforms] = useState({
    leftLight: 'translate(0px, 0px)',
    leftOutline: 'translate(0px, 0px)',
    rightLight: 'translate(0px, 0px)',
    rightDark: 'translate(0px, 0px)'
  });

  const computeTransform = (el: HTMLDivElement | null, mouseX: number, mouseY: number, maxShift: number) => {
    if (!el) return 'translate(0px, 0px)';
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - mouseX;
    const dy = cy - mouseY;
    const dist = Math.hypot(dx, dy);
    const radius = 420; // влияние курсора
    if (dist === 0 || dist > radius) return 'translate(0px, 0px)';
    const strength = (1 - dist / radius) * maxShift;
    const nx = dx / dist;
    const ny = dy / dist;
    return `translate(${(nx * strength).toFixed(2)}px, ${(ny * strength).toFixed(2)}px)`;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTransforms({
      leftLight: computeTransform(leftLightRef.current, e.clientX, e.clientY, 24),
      leftOutline: computeTransform(leftOutlineRef.current, e.clientX, e.clientY, 18),
      rightLight: computeTransform(rightLightRef.current, e.clientX, e.clientY, 22),
      rightDark: computeTransform(rightDarkRef.current, e.clientX, e.clientY, 14)
    });
  };

  const handleMouseLeave = () => {
    setTransforms({ leftLight: 'translate(0px, 0px)', leftOutline: 'translate(0px, 0px)', rightLight: 'translate(0px, 0px)', rightDark: 'translate(0px, 0px)' });
  };

  return (
    <section id="blog" className="articles container">
      <Grid className="articles-head">
        <Col span={6} smSpan={4}>
          <div 
            ref={labelRef}
            className={`how-label fade-in-left ${labelShouldAnimate ? 'animate' : ''}`}
          >
            {`{ Статьи }`}
          </div>
        </Col>
        <Col span={6} smSpan={4}>
          <h2 
            ref={titleRef}
            className={`how-title articles-title fade-in-up ${titleShouldAnimate ? 'animate' : ''}`}
          >
            Больше статей<br/><span className="how-title-dim">на нашем сайте</span>
          </h2>
          <p 
            ref={subtitleRef}
            className={`how-sub articles-subtitle fade-in-up ${subtitleShouldAnimate ? 'animate' : ''}`}
          >
            В блоге мы делимся простыми советами<br/>и историями о том, как справляться с тревогой
          </p>
        </Col>
      </Grid>

      <div ref={boxRef} className="articles-box" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {/* Decorative blobs */}
        <div ref={leftLightRef} className="articles-blob articles-blob-left-light" style={{ transform: transforms.leftLight }}>
          <ArticlesBlobLeftLight style={{ width: '100%', height: 'auto' }} />
        </div>
        <div ref={leftOutlineRef} className="articles-blob articles-blob-left-outline" style={{ transform: `var(--articles-rotate-left-outline, rotate(0deg)) ${transforms.leftOutline}` }}>
          <ArticlesLeftOutline style={{ width: '100%', height: 'auto' }} />
        </div>
        <div ref={rightLightRef} className="articles-blob articles-blob-right-light" style={{ transform: transforms.rightLight }}>
          <ArticlesRightLightBlob style={{ width: '100%', height: 'auto' }} />
        </div>
        <div ref={rightDarkRef} className="articles-blob articles-blob-right-dark" style={{ transform: transforms.rightDark }}>
          <ArticlesBlobRightDark style={{ width: '100%', height: 'auto' }} />
        </div>

        {/* Center logo */}
        <ArticlesLogo style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }} />

        <div className="articles-corner"><CornerArrowSvg /></div>
      </div>
    </section>
  );
};


