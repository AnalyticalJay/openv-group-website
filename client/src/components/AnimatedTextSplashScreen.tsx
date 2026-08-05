import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { ParticleSystem } from './ParticleSystem';
import { BackgroundMotion } from './BackgroundMotion';
import { LightRays } from './LightRays';
import * as advancedAnimations from '@/lib/advancedAnimations';

interface AnimatedTextSplashScreenProps {
  onComplete: () => void;
}

export function AnimatedTextSplashScreen({ onComplete }: AnimatedTextSplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showButton, setShowButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handler function for button click and swipe
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

  // Add swipe gesture support for mobile
  useSwipeGesture(containerRef, {
    onSwipeUp: handleExplore,
    threshold: 50,
    timeThreshold: 500,
  });

  useEffect(() => {
    if (!containerRef.current || !line1Ref.current || !line2Ref.current || !line3Ref.current) return;

    const timeline = gsap.timeline();

    // Initial fade in of container
    timeline.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    // ===== LINE 1: "YOUR VISION" =====
    // Animation 1: Blur reveal with letter spacing
    timeline.fromTo(
      line1Ref.current,
      { 
        opacity: 0,
        filter: 'blur(20px)',
        letterSpacing: '0.05em',
        scaleX: 0.8,
      },
      { 
        opacity: 1,
        filter: 'blur(0px)',
        letterSpacing: '0.15em',
        scaleX: 1,
        duration: 1.4,
        ease: 'power2.out',
      },
      0.3
    );

    // Animation 2: Add underline with gradient
    const line1Underline = document.createElement('div');
    line1Underline.className = 'absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#13C46B] to-[#1B8EFF]';
    line1Underline.style.width = '0%';
    if (line1Ref.current) {
      line1Ref.current.style.position = 'relative';
      line1Ref.current.appendChild(line1Underline);
    }

    timeline.to(
      line1Underline,
      {
        width: '100%',
        duration: 1.0,
        ease: 'power2.out',
      },
      0.8
    );

    // Animation 3: Add glitch effect
    const glitchTimeline = gsap.timeline({ delay: 1.8 });
    for (let i = 0; i < 3; i++) {
      glitchTimeline.to(
        line1Ref.current,
        {
          x: Math.random() * 8 - 4,
          y: Math.random() * 8 - 4,
          duration: 0.1,
        }
      );
    }
    glitchTimeline.to(line1Ref.current, { x: 0, y: 0, duration: 0.1 });

    // ===== ACCENT ELEMENT =====
    // Animation: Complex rotation with scale and blur
    if (accentRef.current) {
      timeline.fromTo(
        accentRef.current,
        { 
          opacity: 0,
          scale: 0.2,
          rotate: -180,
          filter: 'blur(15px)',
        },
        { 
          opacity: 0.4,
          scale: 1,
          rotate: 0,
          filter: 'blur(0px)',
          duration: 1.6,
          ease: 'back.out',
        },
        0.2
      );

      // Add continuous rotation animation
      gsap.to(accentRef.current, {
        rotate: 360,
        duration: 25,
        repeat: -1,
        ease: 'none',
        delay: 2.0,
      });

      // Add scale pulse
      gsap.to(accentRef.current, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.0,
      });
    }

    // ===== LINE 2: "OUR EXPERTISE" =====
    // Animation 1: Character stagger with rotation and scale
    const line2Text = line2Ref.current;
    const line2Chars = line2Text.querySelectorAll('span');
    
    timeline.fromTo(
      line2Chars,
      { 
        opacity: 0,
        y: 50,
        scale: 0.3,
        rotate: -20,
        filter: 'blur(10px)',
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out',
      },
      1.2
    );

    // Animation 2: Wave effect
    timeline.to(
      line2Chars,
      {
        y: -15,
        duration: 0.5,
        stagger: 0.08,
        ease: 'sine.inOut',
      },
      2.4
    );

    timeline.to(
      line2Chars,
      {
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'sine.inOut',
      },
      2.9
    );

    // Animation 3: Color shift effect
    timeline.to(
      line2Chars,
      {
        color: '#F97316',
        duration: 0.6,
        stagger: 0.05,
        ease: 'sine.inOut',
      },
      3.4
    );

    timeline.to(
      line2Chars,
      {
        color: '#1B8EFF',
        duration: 0.6,
        stagger: 0.05,
        ease: 'sine.inOut',
      },
      4.0
    );

    // ===== LINE 3: "UNLIMITED POSSIBILITIES" =====
    // Animation 1: Split reveal from center with 3D effect
    const line3Text = line3Ref.current;
    const line3Chars = line3Text.querySelectorAll('span');
    
    timeline.fromTo(
      line3Chars,
      (i: number) => ({
        opacity: 0,
        x: i % 2 === 0 ? -80 : 80,
        scale: 0.5,
        rotationY: i % 2 === 0 ? 90 : -90,
      }),
      { 
        opacity: 1,
        x: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.0,
        stagger: 0.06,
        ease: 'back.out',
      },
      2.0
    );

    // Animation 2: Glow pulse effect
    timeline.to(
      line3Ref.current,
      {
        textShadow: '0 0 40px rgba(19, 196, 107, 0.8), 0 0 80px rgba(19, 196, 107, 0.4)',
        duration: 0.8,
        repeat: 1,
        yoyo: true,
      },
      3.2
    );

    // ===== COMBINED EFFECTS =====
    // Animation: Final pulsing glow on all text
    timeline.to(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      {
        textShadow: '0 0 30px rgba(19, 196, 107, 0.4), 0 0 60px rgba(27, 142, 255, 0.2)',
        duration: 1.0,
        repeat: 1,
        yoyo: true,
      },
      4.2
    );

    // Show button after all text animations complete
    timeline.call(() => {
      setShowButton(true);
    }, [], 5.0);

    // Button entrance animation with scale and glow (only on desktop)
    if (buttonRef.current && !isMobile) {
      timeline.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.5, y: 30, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.0, ease: 'back.out' },
        5.0
      );

      // Add button glow animation
      gsap.to(
        buttonRef.current,
        {
          boxShadow: '0 0 30px rgba(249, 115, 22, 0.8), 0 0 60px rgba(249, 115, 22, 0.4)',
          duration: 2.0,
          repeat: -1,
          yoyo: true,
          delay: 5.0,
        }
      );
    }

    return () => {
      timeline.kill();
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-gradient-to-br from-[#07111c] via-[#0f1e33] to-[#07111c] flex items-center justify-center perspective w-screen h-screen"
    >
      {/* Background Motion Effects */}
      <BackgroundMotion />

      {/* Light Rays */}
      <LightRays />

      {/* Particle System */}
      <ParticleSystem isActive={true} particleCount={isMobile ? 40 : 80} colors={['#13C46B', '#1B8EFF', '#F97316']} />

      {/* Geometric Accent Elements - Hidden on mobile */}
      {!isMobile && (
        <>
          <div
            ref={accentRef}
            className="absolute top-1/4 right-1/4 w-40 h-40 border-2 border-[#1B8EFF]"
            style={{ opacity: 0 }}
          />
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 border border-[#13C46B]" style={{ opacity: 0.1 }} />
        </>
      )}

      {/* Main Content - Responsive padding and spacing */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 h-full gap-4 sm:gap-6 md:gap-8 w-full">
        {/* Line 1: YOUR VISION - Mobile optimized */}
        <div
          ref={line1Ref}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight sm:leading-tight md:leading-normal"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(19, 196, 107, 0.2)',
            wordBreak: 'break-word',
          }}
        >
          YOUR VISION
        </div>

        {/* Line 2: OUR EXPERTISE - Mobile optimized */}
        <div
          ref={line2Ref}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1B8EFF] leading-tight sm:leading-tight md:leading-normal"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(27, 142, 255, 0.3)',
            wordBreak: 'break-word',
          }}
        >
          {'OUR EXPERTISE'.split('').map((char, i) => (
            <span key={i} style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Line 3: UNLIMITED POSSIBILITIES - Mobile optimized */}
        <div
          ref={line3Ref}
          className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#13C46B] leading-tight sm:leading-tight md:leading-normal"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(19, 196, 107, 0.4)',
            wordBreak: 'break-word',
          }}
        >
          {'UNLIMITED POSSIBILITIES'.split('').map((char, i) => (
            <span key={i} style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Explore Button - Desktop only */}
        {showButton && !isMobile && (
          <button
            ref={buttonRef}
            onClick={handleExplore}
            className="mt-8 sm:mt-10 md:mt-12 px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm md:text-base whitespace-nowrap"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            Explore Now
          </button>
        )}

        {/* Swipe hint for mobile - Always visible on mobile after animation */}
        {showButton && isMobile && (
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-white text-xs sm:text-sm">
              <span className="font-medium">Swipe up to explore</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
