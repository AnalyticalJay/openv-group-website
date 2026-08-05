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

    // Create floating geometric shapes with longer visibility
    const shapes = containerRef.current.querySelectorAll('[data-shape]');
    shapes.forEach((shape: Element, i: number) => {
      const duration = 8 + i * 2;
      const delay = i * 0.3;

      // Floating animation - longer and more pronounced
      gsap.to(shape, {
        y: -50,
        duration: duration * 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      });

      // Rotation animation - continuous and smooth
      gsap.to(shape, {
        rotate: 360,
        duration: 25 + i * 3,
        repeat: -1,
        ease: 'none',
        delay,
      });

      // Scale pulse - more pronounced
      gsap.to(shape, {
        scale: 1.15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay + 0.5,
      });

      // Opacity pulse - stays more visible longer
      gsap.to(shape, {
        opacity: 0.5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay + 1,
      });

      // Color shift animation
      gsap.to(shape, {
        borderColor: i % 3 === 0 ? '#F97316' : i % 3 === 1 ? '#1B8EFF' : '#13C46B',
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay + 2,
      });

      // Blur effect animation
      gsap.to(shape, {
        filter: 'blur(2px)',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay + 1.5,
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

      {/* Floating Geometric Shapes - Expanded Set */}
      {/* Top Row */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 border-2 border-[#13C46B] rounded-lg" data-shape />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-[#1B8EFF]" data-shape />
      <div className="absolute top-1/5 left-1/2 w-24 h-24 border-2 border-[#F97316]" data-shape style={{ transform: 'rotate(45deg)' }} />
      <div className="absolute top-1/3 left-1/3 w-28 h-28 border border-[#13C46B]" data-shape style={{ borderRadius: '50%' }} />

      {/* Middle Row */}
      <div className="absolute bottom-1/4 left-1/3 w-48 h-24 border-2 border-[#F97316]" data-shape style={{ borderRadius: '50%' }} />
      <div className="absolute bottom-1/3 right-1/3 w-36 h-36 border border-[#13C46B]" data-shape style={{ transform: 'rotate(45deg)' }} />
      <div className="absolute top-1/2 right-1/3 w-32 h-32 border-2 border-[#1B8EFF]" data-shape />
      <div className="absolute top-2/3 left-1/4 w-40 h-20 border border-[#F97316]" data-shape />

      {/* Bottom Row */}
      <div className="absolute bottom-1/3 left-1/4 w-28 h-28 border-2 border-[#13C46B]" data-shape style={{ borderRadius: '50%' }} />
      <div className="absolute bottom-1/4 right-1/4 w-36 h-36 border border-[#1B8EFF]" data-shape style={{ transform: 'rotate(45deg)' }} />
      <div className="absolute bottom-1/5 left-1/2 w-32 h-32 border-2 border-[#F97316]" data-shape />
      <div className="absolute bottom-1/3 right-1/5 w-40 h-40 border border-[#13C46B]" data-shape />

      {/* Corner Shapes */}
      <div className="absolute top-1/6 right-1/6 w-24 h-24 border-2 border-[#F97316]" data-shape style={{ transform: 'rotate(45deg)' }} />
      <div className="absolute bottom-1/6 left-1/6 w-32 h-32 border border-[#1B8EFF]" data-shape />
      <div className="absolute top-1/2 left-1/6 w-28 h-28 border-2 border-[#13C46B]" data-shape style={{ borderRadius: '50%' }} />
      <div className="absolute bottom-1/2 right-1/6 w-36 h-36 border border-[#F97316]" data-shape />

      {/* Additional Scattered Shapes */}
      <div className="absolute top-1/3 left-1/6 w-20 h-20 border-2 border-[#1B8EFF]" data-shape style={{ transform: 'rotate(45deg)' }} />
      <div className="absolute bottom-1/4 left-1/2 w-24 h-24 border border-[#13C46B]" data-shape />
      <div className="absolute top-2/3 right-1/4 w-32 h-32 border-2 border-[#F97316]" data-shape style={{ borderRadius: '50%' }} />
      <div className="absolute top-1/4 right-1/6 w-28 h-28 border border-[#1B8EFF]" data-shape />

      {/* Morphing Blobs */}
      <svg
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96"
        viewBox="0 0 200 200"
        style={{ opacity: 0.15 }}
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>
        <ellipse cx="100" cy="100" rx="80" ry="60" fill="#13C46B" filter="url(#blur)" opacity="0.4" data-shape />
        <ellipse cx="100" cy="100" rx="60" ry="80" fill="#1B8EFF" filter="url(#blur)" opacity="0.4" data-shape />
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

      {/* Additional Geometric Accent Elements */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.1 }}>
        {/* Hexagons */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 360) / 6;
          const x = 50 + 30 * Math.cos((angle * Math.PI) / 180);
          const y = 50 + 30 * Math.sin((angle * Math.PI) / 180);
          return (
            <circle
              key={`hex-${i}`}
              cx={`${x}%`}
              cy={`${y}%`}
              r="20"
              fill="none"
              stroke={i % 3 === 0 ? '#13C46B' : i % 3 === 1 ? '#1B8EFF' : '#F97316'}
              strokeWidth="2"
              opacity="0.2"
              data-shape
            />
          );
        })}

        {/* Triangles */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i * 90);
          const x = 50 + 35 * Math.cos((angle * Math.PI) / 180);
          const y = 50 + 35 * Math.sin((angle * Math.PI) / 180);
          return (
            <polygon
              key={`tri-${i}`}
              points={`${x},${y} ${x + 15},${y + 15} ${x - 15},${y + 15}`}
              fill="none"
              stroke={i % 3 === 0 ? '#F97316' : i % 3 === 1 ? '#13C46B' : '#1B8EFF'}
              strokeWidth="2"
              opacity="0.2"
              data-shape
            />
          );
        })}
      </svg>
    </div>
  );
}
