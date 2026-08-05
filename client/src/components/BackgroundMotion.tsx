import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function BackgroundMotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    const timeline = gsap.timeline({ repeat: -1 });

    // Animate grid lines
    const lines = gridRef.current.querySelectorAll('line');
    lines.forEach((line, i) => {
      timeline.to(
        line,
        {
          opacity: 0.15,
          duration: 2,
          ease: 'sine.inOut',
        },
        (i as number) * 0.1
      );

      timeline.to(
        line,
        {
          opacity: 0.05,
          duration: 2,
          ease: 'sine.inOut',
        }
      );
    });

    // Animate background gradient
    const gradientStops = gridRef.current.querySelectorAll('stop');
    timeline.to(
      gradientStops,
      {
        offset: (i: number) => {
          const current = (gradientStops[i as number] as SVGStopElement).getAttribute('offset');
          return current === '0%' ? '10%' : '90%';
        },
        duration: 4,
        ease: 'sine.inOut',
      },
      0
    );

    // Create floating geometric shapes
    const shapes = containerRef.current.querySelectorAll('[data-shape]');
    shapes.forEach((shape: Element, i: number) => {
      const duration = 6 + i * 2;
      const delay = i * 0.5;

      // Floating animation
      gsap.to(shape, {
        y: -30,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      });

      // Rotation animation
      gsap.to(shape, {
        rotate: 360,
        duration: 20 + i * 5,
        repeat: -1,
        ease: 'none',
        delay,
      });

      // Scale pulse
      gsap.to(shape, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay + 0.5,
      });

      // Opacity pulse
      gsap.to(shape, {
        opacity: 0.4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay + 1,
      });
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Animated Grid Background */}
      <svg
        ref={gridRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.05 }}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#13C46B" />
            <stop offset="50%" stopColor="#1B8EFF" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 54}
            x2="1920"
            y2={i * 54}
            stroke="#13C46B"
            strokeWidth="1"
            opacity="0.05"
          />
        ))}
        {Array.from({ length: 36 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 53.3}
            y1="0"
            x2={i * 53.3}
            y2="1080"
            stroke="#1B8EFF"
            strokeWidth="1"
            opacity="0.05"
          />
        ))}
      </svg>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 border-2 border-[#13C46B] rounded-lg" data-shape />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-[#1B8EFF]" data-shape />
      <div className="absolute bottom-1/4 left-1/3 w-48 h-24 border-2 border-[#F97316]" data-shape style={{ borderRadius: '50%' }} />
      <div className="absolute bottom-1/3 right-1/3 w-36 h-36 border border-[#13C46B]" data-shape style={{ transform: 'rotate(45deg)' }} />

      {/* Morphing Blobs */}
      <svg
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96"
        viewBox="0 0 200 200"
        style={{ opacity: 0.1 }}
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>
        <ellipse cx="100" cy="100" rx="80" ry="60" fill="#13C46B" filter="url(#blur)" opacity="0.3" data-shape />
        <ellipse cx="100" cy="100" rx="60" ry="80" fill="#1B8EFF" filter="url(#blur)" opacity="0.3" data-shape />
      </svg>

      {/* Animated Light Rays */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
        <defs>
          <linearGradient id="rayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#13C46B" stopOpacity="0" />
            <stop offset="50%" stopColor="#13C46B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#13C46B" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`ray-${i}`}
            x1="50%"
            y1="50%"
            x2={`${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`}
            y2={`${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`}
            stroke="url(#rayGradient)"
            strokeWidth="2"
            opacity="0.3"
          />
        ))}
      </svg>
    </div>
  );
}
