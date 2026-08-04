import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize GSAP with Lenis for smooth scroll compatibility
 */
export const initLenisGSAPIntegration = (lenis: Lenis | null | undefined) => {
  if (!lenis) return;

  // Update ScrollTrigger on Lenis scroll
  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Sync GSAP animations with Lenis
  gsap.ticker.add((time) => {
    ScrollTrigger.update();
  });

  // Refresh ScrollTrigger on window resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
};

/**
 * Animate element with fade-in effect
 */
export const animateFadeIn = (element: HTMLElement, delay = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Animate element with slide-up effect
 */
export const animateSlideUp = (element: HTMLElement, delay = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Animate element with staggered children
 */
export const animateStaggerChildren = (
  container: HTMLElement,
  selector: string,
  staggerAmount = 0.1
) => {
  const children = container.querySelectorAll(selector);
  
  gsap.fromTo(
    children,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: staggerAmount,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Animate element with scale effect
 */
export const animateScale = (element: HTMLElement, delay = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.95,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Create parallax effect using yPercent for smooth scrolling
 * @param element - The element to apply parallax to
 * @param speed - Parallax speed multiplier (0.3-0.7 recommended)
 */
export const createParallaxEffect = (element: HTMLElement, speed = 0.5) => {
  gsap.to(element, {
    yPercent: speed * 50,
    ease: 'none',
    scrollTrigger: {
      trigger: element.parentElement || element,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5,
      markers: false,
    },
  });
};

/**
 * Animate hero headline with staggered line reveals
 */
export const animateHeroHeadline = (element: HTMLElement) => {
  const lines = element.querySelectorAll('.headline-line');
  
  gsap.fromTo(
    lines,
    {
      opacity: 0,
      y: 40,
      clipPath: 'inset(0 0 100% 0)',
    },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.3,
    }
  );
};

/**
 * Animate gradient text fill with smooth reveal
 */
export const animateGradientText = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    {
      backgroundPosition: '200% center',
      opacity: 0,
    },
    {
      backgroundPosition: '0% center',
      opacity: 1,
      duration: 1.4,
      ease: 'power2.out',
      delay: 0.6,
    }
  );
};

/**
 * Animate button entrance with scale and fade
 */
export const animateButtonEntrance = (element: HTMLElement, delay = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.5)',
      delay: delay + 0.8,
    }
  );
};

/**
 * Add hover lift effect to cards
 */
export const addCardHoverEffect = (element: HTMLElement) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      y: -8,
      boxShadow: '0 20px 40px rgba(255, 107, 53, 0.2)',
      duration: 0.3,
      ease: 'power2.out',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      y: 0,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out',
    });
  });
};

/**
 * Add icon hover scale effect
 */
export const addIconHoverEffect = (element: HTMLElement) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.3,
      ease: 'back.out(1.5)',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
};

/**
 * Kill all ScrollTrigger instances for cleanup
 */
export const killScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.ticker.remove(() => {
    ScrollTrigger.update();
  });
};

/**
 * Add floating animation to globe/background element
 */
export const addFloatingAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    y: -20,
    duration: 3,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};
