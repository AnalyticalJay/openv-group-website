import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PageTransitionOverlayProps {
  isActive: boolean;
  onTransitionComplete?: () => void;
  duration?: number;
}

export function PageTransitionOverlay({ 
  isActive, 
  onTransitionComplete,
  duration = 0.6 
}: PageTransitionOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !overlayRef.current) return;

    const timeline = gsap.timeline();

    // Fade in overlay
    timeline.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: duration * 0.5,
        ease: 'power2.inOut' 
      }
    );

    // Fade out overlay
    timeline.to(
      overlayRef.current,
      { 
        opacity: 0, 
        duration: duration * 0.5,
        ease: 'power2.inOut',
        onComplete: onTransitionComplete
      },
      duration * 0.5
    );
  }, [isActive, duration, onTransitionComplete]);

  if (!isActive) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] bg-white pointer-events-none"
      style={{ opacity: 0 }}
    />
  );
}
