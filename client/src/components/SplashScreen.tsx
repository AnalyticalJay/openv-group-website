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

    // Logo entrance animation - scale and fade in
    timeline.fromTo(
      logoRef.current,
      { scale: 0.5, opacity: 0, rotateZ: -10 },
      { scale: 1, opacity: 1, rotateZ: 0, duration: 1, ease: 'back.out' },
      0.2
    );

    // Logo floating animation
    timeline.to(
      logoRef.current,
      {
        y: -20,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      },
      0.5
    );

    // Subtle rotation animation
    gsap.to(logoRef.current, {
      rotateZ: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });

    // Text fade in
    if (textRef.current) {
      timeline.fromTo(
        textRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.8
      );
    }

    // Show button after animations
    timeline.call(() => setShowButton(true), [], 2);

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

    // Fade out splash screen
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a2a4a 0%, #2a3f5f 100%)',
        backgroundImage: `url('/manus-storage/splash-background-pattern_6a271b24.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Logo Container */}
        <div
          ref={logoRef}
          className="mb-8 md:mb-12"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(19, 196, 107, 0.2))',
          }}
        >
          {/* OpenV Logo - Image */}
          <img
            src="/manus-storage/openv-logo-splash_e931a5c2.png"
            alt="OpenV Group Logo"
            className="w-40 h-40 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
          />
        </div>

        {/* Text */}
        <div ref={textRef} className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 font-manrope">
            The OpenV Group
          </h1>
          <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-md mx-auto">
            Smart technology. Seamless solutions. Stronger business.
          </p>
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
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30"
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
