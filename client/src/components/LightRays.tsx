import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function LightRays() {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const rays = containerRef.current.querySelectorAll('[data-ray]');
    const timeline = gsap.timeline({ repeat: -1 });

    rays.forEach((ray, i) => {
      const delay = (i as number) * 0.3;

      // Animate ray opacity and length
      timeline.to(
        ray,
        {
          opacity: 0.6,
          strokeDashoffset: 0,
          duration: 2,
          ease: 'sine.inOut',
        },
        delay
      );

      timeline.to(
        ray,
        {
          opacity: 0.1,
          strokeDashoffset: 100,
          duration: 2,
          ease: 'sine.inOut',
        }
      );

      // Rotate rays
      gsap.to(ray, {
        rotate: 360,
        duration: 20 + (i as number) * 2,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
        delay,
      });
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <svg
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.15 }}
    >
      <defs>
        <linearGradient id="rayGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#13C46B" stopOpacity="0" />
          <stop offset="50%" stopColor="#13C46B" stopOpacity="1" />
          <stop offset="100%" stopColor="#13C46B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rayGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1B8EFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#1B8EFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#1B8EFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rayGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0" />
          <stop offset="50%" stopColor="#F97316" stopOpacity="1" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main light rays from center */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12;
        const x2 = 960 + 500 * Math.cos((angle * Math.PI) / 180);
        const y2 = 540 + 500 * Math.sin((angle * Math.PI) / 180);
        const gradient = ['rayGradient1', 'rayGradient2', 'rayGradient3'][i % 3];

        return (
          <line
            key={`ray-${i}`}
            x1="960"
            y1="540"
            x2={x2}
            y2={y2}
            stroke={`url(#${gradient})`}
            strokeWidth="3"
            opacity="0.2"
            strokeDasharray="100"
            strokeDashoffset="100"
            filter="url(#glow)"
            data-ray
          />
        );
      })}

      {/* Concentric circles */}
      {Array.from({ length: 5 }).map((_, i) => {
        const radius = 100 + i * 80;
        return (
          <circle
            key={`circle-${i}`}
            cx="960"
            cy="540"
            r={radius}
            fill="none"
            stroke="#13C46B"
            strokeWidth="1"
            opacity="0.1"
            strokeDasharray="10 10"
          />
        );
      })}

      {/* Animated glow points */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        const x = 960 + 300 * Math.cos((angle * Math.PI) / 180);
        const y = 540 + 300 * Math.sin((angle * Math.PI) / 180);

        return (
          <g key={`glow-${i}`} data-ray>
            <circle cx={x} cy={y} r="8" fill="#13C46B" opacity="0.3" filter="url(#glow)" />
            <circle cx={x} cy={y} r="15" fill="none" stroke="#13C46B" strokeWidth="1" opacity="0.2" />
          </g>
        );
      })}
    </svg>
  );
}
