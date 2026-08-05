import { createContext, useContext, ReactNode } from 'react';
import gsap from 'gsap';

interface PageTransitionContextType {
  transitionTo: (callback: () => void, duration?: number) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const transitionTo = (callback: () => void, duration: number = 0.6) => {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[9998] bg-white';
    overlay.style.opacity = '0';
    document.body.appendChild(overlay);

    // Animate transition
    const timeline = gsap.timeline();
    
    // Fade in overlay
    timeline.to(overlay, {
      opacity: 1,
      duration: duration * 0.5,
      ease: 'power2.inOut',
    }, 0);

    // Execute callback (page change)
    timeline.call(() => {
      callback();
    }, [], duration * 0.5);

    // Fade out overlay to reveal new page
    timeline.to(overlay, {
      opacity: 0,
      duration: duration * 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        overlay.remove();
      },
    }, duration * 0.5);
  };

  return (
    <PageTransitionContext.Provider value={{ transitionTo }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return context;
}
