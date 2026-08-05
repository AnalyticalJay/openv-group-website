import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    const timeline = gsap.timeline();

    // Fade in background
    timeline.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    // Logo entrance animation - scale and fade in with enhanced effect
    timeline.fromTo(
      logoRef.current,
      { scale: 0.3, opacity: 0, rotateZ: -45 },
      { scale: 1, opacity: 1, rotateZ: 0, duration: 1.2, ease: 'back.out' },
      0.2
    );

    // Logo floating animation with more pronounced movement
    timeline.to(
      logoRef.current,
      {
        y: -40,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      },
      0.5
    );

    // Removed rotation animation - keeping only floating and scale pulse

    // Add subtle scale pulse for emphasis
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.08,
        duration: 2.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });
    }

    // Show button after animations
    timeline.call(() => setShowButton(true), [], 1.5);

    // Button entrance
    if (buttonRef.current) {
      timeline.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'back.out' },
        2
      );
    }

    return () => {
      timeline.kill();
    };
  }, []);

  const handleExplore = () => {
    if (!containerRef.current) return;

    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[10000] bg-white';
    overlay.style.opacity = '0';
    document.body.appendChild(overlay);

    // Animate splash screen out and overlay in
    const timeline = gsap.timeline();
    
    // Fade out splash content
    timeline.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
    }, 0);

    // Fade in white overlay
    timeline.to(overlay, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut',
    }, 0.3);

    // Complete transition and show homepage
    timeline.call(() => {
      onComplete();
    }, [], 0.8);

    // Fade out overlay to reveal homepage
    timeline.to(overlay, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        overlay.remove();
      },
    }, 0.9);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f0f4f8 0%, #e8eef5 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-200/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Logo Container */}
        <div
          ref={logoRef}
          className="mb-6 md:mb-8"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(19, 196, 107, 0.2))',
          }}
        >
          {/* OpenV Logo - Image with glow effect */}
          <img
            src="/manus-storage/openv-logo-splash-new_b4d91942.png"
            alt="OpenV Group Logo"
            className="w-48 h-48 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 60px rgba(255, 107, 53, 0.4)) drop-shadow(0 0 30px rgba(27, 142, 255, 0.3)) brightness(1.3) contrast(1.1)',
              opacity: 0.95,
            }}
          />
        </div>

        {/* Explore Button */}
        {showButton && (
          <button
            ref={buttonRef}
            onClick={handleExplore}
            className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm md:text-base"
          >
            Explore Now
          </button>
        )}
      </div>

      {/* Animated particles/dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-slate-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
