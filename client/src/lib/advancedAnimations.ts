import gsap from 'gsap';

/**
 * Advanced animation utilities for kinetic typography
 */

export const blurReveal = (element: HTMLElement, duration: number = 1.2) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      filter: 'blur(20px)',
      letterSpacing: '0.05em',
    },
    {
      opacity: 1,
      filter: 'blur(0px)',
      letterSpacing: '0.15em',
      duration,
      ease: 'power2.out',
    }
  );
};

export const skewReveal = (element: HTMLElement, duration: number = 1.0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      skewY: 10,
      y: 30,
    },
    {
      opacity: 1,
      skewY: 0,
      y: 0,
      duration,
      ease: 'back.out',
    }
  );
};

export const rotateReveal = (element: HTMLElement, duration: number = 1.2) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      rotationX: 90,
      rotationZ: -45,
    },
    {
      opacity: 1,
      rotationX: 0,
      rotationZ: 0,
      duration,
      ease: 'back.out',
      transformOrigin: '50% 50%',
    }
  );
};

export const glitchEffect = (element: HTMLElement, duration: number = 0.6) => {
  const timeline = gsap.timeline();
  
  for (let i = 0; i < 5; i++) {
    timeline.to(
      element,
      {
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
        duration: duration / 10,
      },
      i * (duration / 5)
    );
  }
  
  timeline.to(element, { x: 0, y: 0, duration: duration / 10 });
  return timeline;
};

export const liquidReveal = (element: HTMLElement, duration: number = 1.4) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scaleY: 0,
      transformOrigin: '50% 0%',
    },
    {
      opacity: 1,
      scaleY: 1,
      duration,
      ease: 'elastic.out(1, 0.5)',
    }
  );
};

export const characterWave = (characters: NodeListOf<Element>, duration: number = 0.8, stagger: number = 0.08) => {
  return gsap.fromTo(
    characters,
    {
      opacity: 0,
      y: 40,
      rotationZ: -15,
    },
    {
      opacity: 1,
      y: 0,
      rotationZ: 0,
      duration,
      stagger,
      ease: 'back.out',
    }
  );
};

export const characterBounce = (characters: NodeListOf<Element>, duration: number = 0.6, stagger: number = 0.06) => {
  return gsap.fromTo(
    characters,
    {
      opacity: 0,
      scale: 0,
    },
    {
      opacity: 1,
      scale: 1,
      duration,
      stagger,
      ease: 'back.out',
    }
  );
};

export const splitReveal = (characters: NodeListOf<Element>, duration: number = 0.9, stagger: number = 0.04) => {
  return gsap.fromTo(
    characters,
    (i: number) => ({
      opacity: 0,
      x: i % 2 === 0 ? -50 : 50,
      scale: 0.8,
    }),
    {
      opacity: 1,
      x: 0,
      scale: 1,
      duration,
      stagger,
      ease: 'power2.out',
    }
  );
};

export const pulseGlow = (element: HTMLElement, color: string = '#13C46B', duration: number = 1.5) => {
  return gsap.to(element, {
    textShadow: `0 0 30px ${color}, 0 0 60px ${color}`,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

export const rotatingGlow = (element: HTMLElement, duration: number = 20) => {
  return gsap.to(element, {
    rotate: 360,
    duration,
    repeat: -1,
    ease: 'none',
  });
};

export const morphingGradient = (element: HTMLElement, colors: string[], duration: number = 4) => {
  const timeline = gsap.timeline({ repeat: -1 });
  
  colors.forEach((color: string, i: number) => {
    timeline.to(
      element,
      {
        backgroundImage: `linear-gradient(135deg, ${color}, ${colors[(i + 1) % colors.length]})`,
        duration,
        ease: 'sine.inOut',
      },
      i * duration
    );
  });
  
  return timeline;
};

export const parallaxScroll = (element: HTMLElement, speed: number = 0.5) => {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
    },
  });
};

export const floatingAnimation = (element: HTMLElement, distance: number = 20, duration: number = 3) => {
  return gsap.to(element, {
    y: -distance,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

export const shimmerEffect = (element: HTMLElement, duration: number = 2) => {
  return gsap.to(element, {
    backgroundPosition: '200% center',
    duration,
    repeat: -1,
    ease: 'none',
  });
};
