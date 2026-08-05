import gsap from 'gsap';

/**
 * Geometric Kinetic Typography Animation Utilities
 * Provides reusable animation functions for text reveal effects
 */

/**
 * Animate text with staggered character reveal
 * Creates a wave-like effect where characters appear one by one
 */
export function animateCharacterStagger(
  element: HTMLElement,
  duration: number = 0.8,
  stagger: number = 0.05,
  delay: number = 0
) {
  const chars = element.querySelectorAll('span');
  
  gsap.fromTo(
    chars,
    { 
      opacity: 0,
      y: 20,
    },
    { 
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'back.out',
      delay,
    }
  );
}

/**
 * Animate text sliding in from direction with letter spacing
 */
export function animateSlideInText(
  element: HTMLElement,
  direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
  duration: number = 1.2,
  delay: number = 0
) {
  const startProps: Record<string, any> = {
    opacity: 0,
    letterSpacing: '0.05em',
  };

  const endProps: Record<string, any> = {
    opacity: 1,
    letterSpacing: '0.15em',
    duration,
    ease: 'power2.out',
    delay,
  };

  switch (direction) {
    case 'left':
      startProps.x = -100;
      endProps.x = 0;
      break;
    case 'right':
      startProps.x = 100;
      endProps.x = 0;
      break;
    case 'top':
      startProps.y = -100;
      endProps.y = 0;
      break;
    case 'bottom':
      startProps.y = 100;
      endProps.y = 0;
      break;
  }

  gsap.fromTo(element, startProps, endProps);
}

/**
 * Animate geometric accent element with rotation and scale
 */
export function animateAccentElement(
  element: HTMLElement,
  duration: number = 1.2,
  delay: number = 0
) {
  gsap.fromTo(
    element,
    { 
      opacity: 0,
      scale: 0.5,
      rotate: -45
    },
    { 
      opacity: 0.3,
      scale: 1,
      rotate: 0,
      duration,
      ease: 'back.out',
      delay,
    }
  );
}

/**
 * Add pulsing glow effect to text elements
 */
export function addGlowPulse(
  elements: HTMLElement | HTMLElement[],
  color1: string = 'rgba(19, 196, 107, 0.3)',
  color2: string = 'rgba(27, 142, 255, 0.2)',
  duration: number = 1.5,
  delay: number = 0
) {
  const elementArray = Array.isArray(elements) ? elements : [elements];
  
  gsap.to(
    elementArray,
    {
      textShadow: `0 0 20px ${color1}, 0 0 40px ${color2}`,
      duration,
      repeat: 2,
      yoyo: true,
      delay,
    }
  );
}

/**
 * Animate button entrance with scale and opacity
 */
export function animateButtonEntrance(
  element: HTMLElement,
  duration: number = 0.6,
  delay: number = 0
) {
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration, ease: 'back.out', delay }
  );
}

/**
 * Create smooth page transition with overlay
 */
export function createPageTransition(
  onComplete: () => void,
  duration: number = 0.6
) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 z-[10000] bg-white';
  overlay.style.opacity = '0';
  document.body.appendChild(overlay);

  const timeline = gsap.timeline();
  
  // Fade in overlay
  timeline.to(overlay, {
    opacity: 1,
    duration: duration * 0.8,
    ease: 'power2.inOut',
  });

  // Complete transition
  timeline.call(() => {
    onComplete();
  }, [], duration * 0.8);

  // Fade out overlay
  timeline.to(overlay, {
    opacity: 0,
    duration: duration * 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      overlay.remove();
    },
  }, duration);
}

/**
 * Animate multiple text lines with staggered timing
 */
export function animateMultilineText(
  lines: HTMLElement[],
  options: {
    staggerBetweenLines?: number;
    duration?: number;
    ease?: string;
  } = {}
) {
  const {
    staggerBetweenLines = 0.6,
    duration = 1.2,
    ease = 'power2.out',
  } = options;

  lines.forEach((line, index) => {
    gsap.fromTo(
      line,
      { 
        opacity: 0,
        y: 20,
      },
      { 
        opacity: 1,
        y: 0,
        duration,
        ease,
        delay: index * staggerBetweenLines,
      }
    );
  });
}
