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


/**
 * Add pulse animation to icon on hover with glow effect
 */
export const addIconPulseEffect = (element: HTMLElement) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: 1.15,
      boxShadow: '0 0 30px rgba(255, 107, 53, 0.6)',
      duration: 0.4,
      ease: 'back.out(1.5)',
    });
    
    // Create pulse animation
    gsap.to(element, {
      scale: 1.05,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.killTweensOf(element);
    gsap.to(element, {
      scale: 1,
      boxShadow: '0 0 0px rgba(255, 107, 53, 0)',
      duration: 0.3,
      ease: 'power2.out',
    });
  });
};

/**
 * Animate connecting line from left to right
 */
export const animateLineReveal = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    {
      scaleX: 0,
      transformOrigin: 'left center',
    },
    {
      scaleX: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element.parentElement || element,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Add staggered entrance to ecosystem icons
 */
export const animateEcosystemIcons = (container: HTMLElement) => {
  const icons = container.querySelectorAll('[class*="ecosystem-icon"]');
  
  gsap.fromTo(
    icons,
    {
      opacity: 0,
      scale: 0.8,
      y: 30,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'back.out(1.5)',
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
 * Add lift effect to ecosystem icons on hover
 */
export const addEcosystemIconLift = (element: HTMLElement) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      y: -12,
      boxShadow: '0 15px 35px rgba(255, 107, 53, 0.25)',
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
 * Animate solution cards with staggered entrance from different directions
 */
export const animateSolutionCards = (container: HTMLElement) => {
  const cards = container.querySelectorAll('[class*="solution-card"]');
  
  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 40,
      x: (i) => {
        // Alternate direction: odd from left, even from right
        return i % 2 === 0 ? -30 : 30;
      },
    },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.7,
      stagger: 0.1,
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
 * Add icon scale and rotate animation on hover
 */
export const addSolutionIconHover = (element: HTMLElement) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: 1.2,
      rotation: 8,
      duration: 0.4,
      ease: 'back.out(1.5)',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
};

/**
 * Add accent bar animation on hover
 */
export const addAccentBarAnimation = (element: HTMLElement) => {
  const bar = element.querySelector('[class*="accent-bar"]') as HTMLElement;
  if (!bar) return;
  
  element.addEventListener('mouseenter', () => {
    gsap.to(bar, {
      scaleX: 1.1,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(bar, {
      scaleX: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
};

/**
 * Animate counter numbers on scroll
 */
export const animateCounter = (element: HTMLElement, target: number, duration: number = 2) => {
  const obj = { value: 0 };
  
  gsap.to(obj, {
    value: target,
    duration: duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.floor(obj.value).toString();
    },
    scrollTrigger: {
      trigger: element.parentElement || element,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none none',
    },
  });
};

/**
 * Add logo scale and glow effect on hover
 */
export const addLogoHoverEffect = (element: HTMLElement) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: 1.15,
      filter: 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.5))',
      duration: 0.4,
      ease: 'back.out(1.5)',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      filter: 'drop-shadow(0 0 0px rgba(255, 107, 53, 0))',
      duration: 0.3,
      ease: 'power2.out',
    });
  });
};

/**
 * Add animated hover state to carousel navigation buttons
 */
export const addNavButtonHoverEffect = (button: HTMLElement) => {
  const icon = button.querySelector('svg');
  
  button.addEventListener('mouseenter', () => {
    gsap.to(button, {
      scale: 1.1,
      boxShadow: '0 8px 24px rgba(255, 107, 53, 0.3)',
      duration: 0.3,
      ease: 'back.out(1.5)',
    });
    
    if (icon) {
      gsap.to(icon, {
        x: button.classList.contains('swiper-button-next') ? 4 : -4,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  });
  
  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      scale: 1,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out',
    });
    
    if (icon) {
      gsap.to(icon, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  });
};

/**
 * Setup carousel auto-scroll with pause-on-hover
 */
export const setupCarouselAutoScroll = (swiperInstance: any, speed: number = 4000) => {
  if (!swiperInstance) return;
  
  // Start auto-scroll
  swiperInstance.autoplay.start();
  
  // Pause on hover
  const container = swiperInstance.$el;
  if (container) {
    container.addEventListener('mouseenter', () => {
      swiperInstance.autoplay.stop();
    });
    
    container.addEventListener('mouseleave', () => {
      swiperInstance.autoplay.start();
    });
  }
};

/**
 * Add smooth fade transition to carousel slides
 */
export const addCarouselFadeTransition = (container: HTMLElement) => {
  const slides = container.querySelectorAll('[class*="swiper-slide"]');
  
  slides.forEach((slide) => {
    gsap.set(slide, {
      opacity: 0.7,
    });
  });
};

/**
 * Add industry icon hover effects with scale, rotation, and color transition
 */
export const addIndustryIconHover = (element: HTMLElement) => {
  const wrapper = element.querySelector('.industry-icon-wrapper') as HTMLElement;
  if (!wrapper) return;
  
  element.addEventListener('mouseenter', () => {
    gsap.to(wrapper, {
      scale: 1.2,
      rotation: 8,
      duration: 0.4,
      ease: 'back.out(1.5)',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(wrapper, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
};

/**
 * Animate industry icons with staggered bounce entrance on scroll
 */
export const animateIndustryIcons = (container: HTMLElement) => {
  const icons = container.querySelectorAll('.industry-icon-container');
  
  gsap.fromTo(
    icons,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: container,
        start: 'top center+=100',
        end: 'top center',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Create scroll progress indicator at top of page
 */
export const createScrollProgressIndicator = () => {
  // Check if progress bar already exists
  if (document.getElementById('scroll-progress-bar')) return;
  
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress-bar';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #FF6B35 0%, #FF1744 100%);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s ease-out;
  `;
  document.body.appendChild(progressBar);
  
  // Update progress on scroll
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  };
  
  window.addEventListener('scroll', updateProgress);
  
  return () => {
    window.removeEventListener('scroll', updateProgress);
  };
};

/**
 * Track active section and update navigation
 */
export const trackActiveSection = (navLinks: { label: string; href: string }[]) => {
  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(link => {
      const section = document.querySelector(link.href);
      if (!section) return;
      
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      
      const navLink = document.querySelector(`a[href="${link.href}"]`) as HTMLElement;
      if (!navLink) return;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active from all links
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
          link.classList.remove('active-nav-link');
          const underline = link.querySelector('.nav-underline');
          if (underline) {
            gsap.to(underline, {
              scaleX: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        });
        
        // Add active to current link
        navLink.classList.add('active-nav-link');
        const underline = navLink.querySelector('.nav-underline');
        if (underline) {
          gsap.to(underline, {
            scaleX: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      }
    });
  };
  
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
  
  return () => {
    window.removeEventListener('scroll', updateActiveLink);
  };
};

/**
 * Animate section transitions with fade and scale
 */
export const animateSectionTransition = (section: HTMLElement) => {
  gsap.fromTo(
    section,
    {
      opacity: 0,
      scale: 0.98,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Page load sequence with staggered element reveals
 */
export const animatePageLoad = () => {
  // Animate header
  const header = document.querySelector('header');
  if (header) {
    gsap.fromTo(
      header,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }
  
  // Animate hero section
  const hero = document.querySelector('section:first-of-type');
  if (hero) {
    gsap.fromTo(
      hero,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 0.2, ease: 'power2.out' }
    );
  }
};

/**
 * Add smooth micro-interactions to all interactive elements
 */
export const addMicroInteractions = () => {
  // Button interactions
  const buttons = document.querySelectorAll('button, a[href*="#"]');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        duration: 0.2,
        ease: 'power2.out',
      });
    });
  });
  
  // Link color transitions
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    gsap.set(link, { color: getComputedStyle(link).color });
  });
};

/**
 * Animate mobile menu slide-in with staggered links
 */
export const animateMobileMenuOpen = (menuElement: HTMLElement) => {
  const links = menuElement.querySelectorAll('a');
  
  gsap.fromTo(
    menuElement,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
  );
  
  gsap.fromTo(
    links,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
  );
};

/**
 * Animate mobile menu slide-out
 */
export const animateMobileMenuClose = (menuElement: HTMLElement) => {
  const links = menuElement.querySelectorAll('a');
  
  gsap.to(links, {
    opacity: 0,
    x: -20,
    duration: 0.2,
    stagger: 0.03,
    ease: 'power2.in',
  });
  
  gsap.to(menuElement, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: 'power2.in',
    delay: 0.1,
  });
};
