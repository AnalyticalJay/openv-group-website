import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showButton, setShowButton] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Handler function for swipe and button click
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
    if (!containerRef.current || !videoRef.current) return;

    const timeline = gsap.timeline();

    // Fade in background
    timeline.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    return () => {
      timeline.kill();
    };
  }, []);

  // Handle video ready state for smooth playback
  const handleVideoCanPlay = () => {
    setVideoReady(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }
  };

  // Handle video end - show button when video completes
  const handleVideoEnd = () => {
    setShowButton(true);
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out' }
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden touch-none"
      style={{
        background: '#000000',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Full viewport video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        onCanPlay={handleVideoCanPlay}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.play().catch((error) => {
              console.log('Video autoplay failed:', error);
            });
          }
        }}
        onEnded={handleVideoEnd}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src="/manus-storage/openv_logo_reveal_5sec_0bcf26ab.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for button visibility */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Content overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 h-full">
        {/* Explore Button - Overlaid on video - Only shows after video ends */}
        {showButton && (
          <button
            ref={buttonRef}
            onClick={handleExplore}
            className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm md:text-base"
          >
            Explore Now
          </button>
        )}

        {/* Swipe hint for mobile - Only shows after video ends */}
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

        {/* Video loading indicator */}
        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="text-white text-sm">Loading video...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
