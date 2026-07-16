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
 * Kill all ScrollTrigger instances for cleanup
 */
export const killScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.ticker.remove(() => {
    ScrollTrigger.update();
  });
};
