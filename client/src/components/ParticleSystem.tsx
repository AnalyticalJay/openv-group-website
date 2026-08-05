import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleSystemProps {
  isActive: boolean;
  particleCount?: number;
  colors?: string[];
}

export function ParticleSystem({ isActive, particleCount = 50, colors = ['#13C46B', '#1B8EFF', '#F97316'] }: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    const initializeParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        particlesRef.current.push({
          x: canvas.width / 2 + Math.random() * 200 - 100,
          y: canvas.height / 2 + Math.random() * 200 - 100,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: Math.random() * 3 + 2,
        });
      }
    };

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(7, 17, 28, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        if (!isActive) {
          particle.life += 0.016;
          if (particle.life > particle.maxLife) {
            particle.life = 0;
            particle.x = canvas.width / 2 + Math.random() * 200 - 100;
            particle.y = canvas.height / 2 + Math.random() * 200 - 100;
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Add gravity effect
        particle.vy += 0.05;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Calculate opacity based on life
        const lifeRatio = particle.life / particle.maxLife;
        const opacity = particle.opacity * (1 - Math.abs(lifeRatio * 2 - 1));

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = opacity * 0.5;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size + 2, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    initializeParticles();
    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, particleCount, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: isActive ? 1 : 0.3 }}
    />
  );
}
