import { useEffect, useRef } from 'react';
import {
  animateFadeIn,
  animateSlideUp,
  animateScale,
  animateStaggerChildren,
  killScrollTriggers,
} from '@/lib/animations';

export type AnimationType = 'fadeIn' | 'slideUp' | 'scale' | 'staggerChildren';

interface UseScrollAnimationOptions {
  type?: AnimationType;
  delay?: number;
  staggerAmount?: number;
  childSelector?: string;
}

/**
 * Custom hook for applying scroll animations to elements
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    type = 'slideUp',
    delay = 0,
    staggerAmount = 0.1,
    childSelector = '> *',
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    // Apply animation based on type
    switch (type) {
      case 'fadeIn':
        animateFadeIn(element, delay);
        break;
      case 'slideUp':
        animateSlideUp(element, delay);
        break;
      case 'scale':
        animateScale(element, delay);
        break;
      case 'staggerChildren':
        animateStaggerChildren(element, childSelector, staggerAmount);
        break;
      default:
        animateSlideUp(element, delay);
    }

    // Cleanup on unmount
    return () => {
      killScrollTriggers();
    };
  }, [type, delay, staggerAmount, childSelector]);

  return ref;
};
