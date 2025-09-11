import { useEffect, useRef, useState } from 'react';

interface UseFadeInOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  immediate?: boolean; // Для элементов, которые должны анимироваться сразу
}

export const useFadeIn = <T extends HTMLElement = HTMLElement>(options: UseFadeInOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', delay = 0, immediate = false } = options;
  const elementRef = useRef<T>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated.current) return;

    // Если immediate = true, анимируем сразу
    if (immediate) {
      hasAnimated.current = true;
      setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setTimeout(() => {
            setShouldAnimate(true);
          }, delay);
          // Отключаем observer после первого срабатывания
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, delay, immediate]);

  return { elementRef, shouldAnimate };
};
