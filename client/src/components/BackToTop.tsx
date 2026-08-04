import { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/animations';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const heroHeightRef = useRef(0);

  useEffect(() => {
    // Get hero section height
    const heroSection = document.querySelector('section:first-of-type');
    if (heroSection) {
      heroHeightRef.current = (heroSection as HTMLElement).offsetHeight;
    }

    // Handle scroll visibility
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldShow = scrollPosition > heroHeightRef.current;

      if (shouldShow && !isVisible) {
        setIsVisible(true);
        // Animate in
        if (buttonRef.current && !prefersReducedMotion()) {
          gsap.fromTo(
            buttonRef.current,
            { opacity: 0, scale: 0.8, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
          );
        }
      } else if (!shouldShow && isVisible) {
        setIsVisible(false);
        // Animate out
        if (buttonRef.current && !prefersReducedMotion()) {
          gsap.to(buttonRef.current, {
            opacity: 0,
            scale: 0.8,
            y: 20,
            duration: 0.3,
            ease: 'power2.in',
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const handleClick = () => {
    if (prefersReducedMotion()) {
      window.scrollTo({ top: 0 });
    } else {
      // Smooth scroll to top using Lenis if available, otherwise use window.scrollTo
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {isVisible && (
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:shadow-orange-500/50 group"
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)',
            opacity: 0,
          }}
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </button>
      )}
    </>
  );
}
