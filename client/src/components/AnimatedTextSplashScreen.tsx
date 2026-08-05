import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

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
      { opacity: 1, duration: 0.3 }
    );

    // ===== LINE 1: "YOUR VISION" =====
    // Animation 1: Slide in from left with letter spacing expansion
    timeline.fromTo(
      line1Ref.current,
      { 
        opacity: 0,
        x: -150,
        letterSpacing: '0.05em',
        scaleX: 0.8,
      },
      { 
        opacity: 1,
        x: 0,
        letterSpacing: '0.15em',
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.out',
      },
      0.3
    );

    // Animation 2: Add underline effect (geometric line)
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
        duration: 0.8,
        ease: 'power2.out',
      },
      0.8
    );

    // ===== ACCENT ELEMENT =====
    // Animation: Rotate, scale, and fade in with glow
    if (accentRef.current) {
      timeline.fromTo(
        accentRef.current,
        { 
          opacity: 0,
          scale: 0.3,
          rotate: -90,
          filter: 'blur(10px)',
        },
        { 
          opacity: 0.3,
          scale: 1,
          rotate: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'back.out',
        },
        0.2
      );

      // Add continuous rotation animation to accent
      gsap.to(accentRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
        delay: 2.0,
      });
    }

    // ===== LINE 2: "OUR EXPERTISE" =====
    // Animation 1: Character stagger with scale and rotation
    const line2Text = line2Ref.current;
    const line2Chars = line2Text.querySelectorAll('span');
    
    timeline.fromTo(
      line2Chars,
      { 
        opacity: 0,
        y: 40,
        scale: 0.5,
        rotate: -10,
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'back.out',
      },
      1.0
    );

    // Animation 2: Add wave effect to characters
    timeline.to(
      line2Chars,
      {
        y: -10,
        duration: 0.4,
        stagger: 0.06,
        ease: 'sine.inOut',
      },
      2.2
    );

    timeline.to(
      line2Chars,
      {
        y: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: 'sine.inOut',
      },
      2.6
    );

    // ===== LINE 3: "UNLIMITED POSSIBILITIES" =====
    // Animation 1: Split reveal from center
    const line3Text = line3Ref.current;
    const line3Chars = line3Text.querySelectorAll('span');
    
    timeline.fromTo(
      line3Chars,
      { 
        opacity: 0,
        x: (i) => {
          const middle = line3Chars.length / 2;
          return (i < middle ? -50 : 50);
        },
        scale: 0.8,
      },
      { 
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.04,
        ease: 'power2.out',
      },
      1.8
    );

    // Animation 2: Add glow pulse effect
    timeline.to(
      line3Ref.current,
      {
        textShadow: '0 0 30px rgba(19, 196, 107, 0.5), 0 0 60px rgba(19, 196, 107, 0.3)',
        duration: 0.6,
        repeat: 1,
        yoyo: true,
      },
      2.8
    );

    // ===== COMBINED EFFECTS =====
    // Animation: Pulsing glow effect on all text
    timeline.to(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      {
        textShadow: '0 0 20px rgba(19, 196, 107, 0.3), 0 0 40px rgba(27, 142, 255, 0.2)',
        duration: 1.2,
        repeat: 1,
        yoyo: true,
      },
      3.0
    );

    // Animation: Geometric line animations (accent lines)
    const horizontalLine = document.querySelector('line[y1="50%"]') as SVGLineElement;
    const verticalLine = document.querySelector('line[x1="50%"]') as SVGLineElement;

    if (horizontalLine) {
      timeline.fromTo(
        horizontalLine,
        { opacity: 0, strokeDasharray: '1000', strokeDashoffset: '1000' },
        { opacity: 0.1, strokeDashoffset: 0, duration: 1.0, ease: 'power2.out' },
        0.5
      );
    }

    if (verticalLine) {
      timeline.fromTo(
        verticalLine,
        { opacity: 0, strokeDasharray: '1000', strokeDashoffset: '1000' },
        { opacity: 0.1, strokeDashoffset: 0, duration: 1.0, ease: 'power2.out' },
        0.7
      );
    }

    // Show button after all text animations complete
    timeline.call(() => {
      setShowButton(true);
    }, [], 4.2);

    // Button entrance animation with scale and glow
    if (buttonRef.current) {
      timeline.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.7, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out' },
        4.2
      );

      // Add button glow animation
      gsap.to(
        buttonRef.current,
        {
          boxShadow: '0 0 20px rgba(249, 115, 22, 0.6), 0 0 40px rgba(249, 115, 22, 0.3)',
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          delay: 4.2,
        }
      );
    }

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-gradient-to-br from-[#07111c] via-[#0f1e33] to-[#07111c] flex items-center justify-center"
    >
      {/* Animated Grid Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.05 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#13C46B" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Geometric Accent Elements */}
      <div
        ref={accentRef}
        className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-[#1B8EFF]"
        style={{ opacity: 0 }}
      />

      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border border-[#13C46B]" style={{ opacity: 0.1 }} />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 h-full gap-8">
        {/* Line 1: YOUR VISION */}
        <div
          ref={line1Ref}
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-white"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(19, 196, 107, 0.2)',
          }}
        >
          YOUR VISION
        </div>

        {/* Line 2: OUR EXPERTISE - with character wrapping for stagger effect */}
        <div
          ref={line2Ref}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B8EFF]"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(27, 142, 255, 0.3)',
          }}
        >
          {'OUR EXPERTISE'.split('').map((char, i) => (
            <span key={i} style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Line 3: UNLIMITED POSSIBILITIES - with character wrapping */}
        <div
          ref={line3Ref}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#13C46B]"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(19, 196, 107, 0.4)',
          }}
        >
          {'UNLIMITED POSSIBILITIES'.split('').map((char, i) => (
            <span key={i} style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Explore Button - Only shows after animation */}
        {showButton && (
          <button
            ref={buttonRef}
            onClick={handleExplore}
            className="mt-12 px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm md:text-base"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            Explore Now
          </button>
        )}

        {/* Swipe hint for mobile - Only shows after animation */}
        {showButton && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden z-20">
            <div className="flex flex-col items-center gap-2 text-white text-sm animate-bounce">
              <span>Swipe up to explore</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Animated accent lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.1 }}>
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#13C46B" strokeWidth="1" strokeDasharray="1000" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#1B8EFF" strokeWidth="1" strokeDasharray="1000" />
      </svg>
    </div>
  );
}
