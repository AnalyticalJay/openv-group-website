import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import './hero-technology-background.css';

type MotionStyle = CSSProperties & {
  [key: `--${string}`]: string | number;
};

const particles = [
  { x: '53%', y: '73%', dx: '190px', dy: '-116px', size: '3px', duration: '10s', delay: '-1.8s', color: '#FF6B35' },
  { x: '57%', y: '78%', dx: '230px', dy: '-158px', size: '2px', duration: '13s', delay: '-8.2s', color: '#FF1744' },
  { x: '60%', y: '69%', dx: '250px', dy: '-84px', size: '4px', duration: '15s', delay: '-5.6s', color: '#1B8EFF' },
  { x: '63%', y: '62%', dx: '218px', dy: '-142px', size: '2px', duration: '11s', delay: '-6.4s', color: '#13C46B' },
  { x: '67%', y: '82%', dx: '208px', dy: '-228px', size: '3px', duration: '14s', delay: '-2.7s', color: '#FF6B35' },
  { x: '70%', y: '55%', dx: '168px', dy: '-102px', size: '2px', duration: '9s', delay: '-4.1s', color: '#1B8EFF' },
  { x: '72%', y: '75%', dx: '170px', dy: '-198px', size: '4px', duration: '16s', delay: '-11.5s', color: '#13C46B' },
  { x: '76%', y: '44%', dx: '128px', dy: '76px', size: '2px', duration: '12s', delay: '-8.8s', color: '#FF1744' },
  { x: '79%', y: '66%', dx: '116px', dy: '-132px', size: '3px', duration: '10s', delay: '-3.9s', color: '#FF6B35' },
  { x: '82%', y: '35%', dx: '90px', dy: '132px', size: '2px', duration: '14s', delay: '-7.3s', color: '#1B8EFF' },
  { x: '84%', y: '79%', dx: '92px', dy: '-184px', size: '3px', duration: '13s', delay: '-9.6s', color: '#13C46B' },
  { x: '88%', y: '51%', dx: '72px', dy: '-82px', size: '2px', duration: '11s', delay: '-5.2s', color: '#FF1744' },
  { x: '52%', y: '48%', dx: '214px', dy: '118px', size: '2px', duration: '12s', delay: '-7.8s', color: '#1B8EFF' },
  { x: '55%', y: '38%', dx: '228px', dy: '152px', size: '3px', duration: '15s', delay: '-10.4s', color: '#FF6B35' },
  { x: '61%', y: '88%', dx: '206px', dy: '-248px', size: '2px', duration: '14s', delay: '-6.9s', color: '#13C46B' },
  { x: '65%', y: '31%', dx: '186px', dy: '164px', size: '4px', duration: '17s', delay: '-12.6s', color: '#FF1744' },
  { x: '73%', y: '22%', dx: '142px', dy: '224px', size: '2px', duration: '13s', delay: '-4.8s', color: '#1B8EFF' },
  { x: '77%', y: '89%', dx: '118px', dy: '-266px', size: '3px', duration: '16s', delay: '-9.1s', color: '#13C46B' },
  { x: '86%', y: '25%', dx: '76px', dy: '164px', size: '3px', duration: '12s', delay: '-6.2s', color: '#FF6B35' },
  { x: '92%', y: '71%', dx: '48px', dy: '-122px', size: '2px', duration: '10s', delay: '-8.5s', color: '#1B8EFF' },
];

const nodes = [
  { x: '58%', y: '72%', color: '#FF6B35', delay: '-1s' },
  { x: '66%', y: '58%', color: '#1B8EFF', delay: '-2.4s' },
  { x: '72%', y: '76%', color: '#13C46B', delay: '-3.8s' },
  { x: '78%', y: '42%', color: '#FF1744', delay: '-1.9s' },
  { x: '84%', y: '65%', color: '#1B8EFF', delay: '-4.6s' },
  { x: '91%', y: '32%', color: '#13C46B', delay: '-2.8s' },
  { x: '62%', y: '37%', color: '#FF1744', delay: '-5.2s' },
  { x: '75%', y: '88%', color: '#13C46B', delay: '-3.3s' },
  { x: '94%', y: '58%', color: '#FF6B35', delay: '-1.6s' },
];

const HeroTechnologyBackground = forwardRef<HTMLDivElement>(function HeroTechnologyBackground(_, ref) {
  return (
    <div aria-hidden="true" className="hero-tech-background absolute inset-0 z-0 overflow-hidden">
      <div
        ref={ref}
        className="hero-tech-artwork absolute -inset-[3%]"
        style={{ backgroundImage: 'url(/manus-storage/openv-connected-technology-hero_29faa8b3.jpg)' }}
      />
      <div className="hero-tech-grid absolute inset-0" />

      <svg className="hero-tech-streams absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <path className="hero-tech-stream-glow hero-tech-stream-glow--orange" d="M1600 170 C1340 170 1240 330 1080 404 C980 450 900 468 812 472" />
        <path className="hero-tech-stream-glow hero-tech-stream-glow--blue" d="M1600 445 C1370 442 1230 440 1085 456 C982 468 910 474 812 472" />
        <path className="hero-tech-stream-glow hero-tech-stream-glow--green" d="M1600 740 C1360 720 1250 602 1080 528 C980 484 905 474 812 472" />
        <path className="hero-tech-stream hero-tech-stream--orange" d="M1600 170 C1340 170 1240 330 1080 404 C980 450 900 468 812 472" />
        <path className="hero-tech-stream hero-tech-stream--orange hero-tech-stream--secondary" d="M1600 240 C1370 238 1250 350 1090 418 C988 461 906 470 812 472" />
        <path className="hero-tech-stream hero-tech-stream--blue" d="M1600 445 C1370 442 1230 440 1085 456 C982 468 910 474 812 472" />
        <path className="hero-tech-stream hero-tech-stream--blue hero-tech-stream--secondary" d="M1600 516 C1382 505 1240 474 1088 472 C985 471 910 472 812 472" />
        <path className="hero-tech-stream hero-tech-stream--green" d="M1600 740 C1360 720 1250 602 1080 528 C980 484 905 474 812 472" />
        <path className="hero-tech-stream hero-tech-stream--green hero-tech-stream--secondary" d="M1600 812 C1374 776 1260 635 1090 546 C988 493 910 476 812 472" />
        <circle className="hero-tech-core-orbit" cx="812" cy="472" r="52" />
        <circle className="hero-tech-core-ring" cx="812" cy="472" r="24" />
        <circle className="hero-tech-core" cx="812" cy="472" r="5" />
      </svg>
      <div className="hero-tech-convergence" />

      <div data-hero-particles className="hero-tech-particles absolute inset-0">
        {particles.map((particle, index) => {
          const style: MotionStyle = {
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 14px ${particle.color}`,
            '--particle-x': particle.dx,
            '--particle-y': particle.dy,
            '--particle-duration': particle.duration,
            '--particle-delay': particle.delay,
          };
          return <span key={`${particle.x}-${particle.y}-${index}`} className="hero-tech-particle" style={style} />;
        })}
      </div>

      <div data-hero-nodes className="hero-tech-nodes absolute inset-0">
        {nodes.map((node, index) => {
          const style: MotionStyle = {
            left: node.x,
            top: node.y,
            borderColor: `${node.color}66`,
            boxShadow: `0 0 22px ${node.color}33`,
            '--node-color': node.color,
            '--node-delay': node.delay,
          };
          return <span key={`${node.x}-${node.y}-${index}`} className="hero-tech-node" style={style}><span /></span>;
        })}
      </div>

      <div className="hero-tech-module hero-tech-module--one"><span /><span /><span /></div>
      <div className="hero-tech-module hero-tech-module--two"><span /><span /></div>
      <div className="hero-tech-module hero-tech-module--three"><span /><span /><span /></div>
      <div className="hero-tech-module hero-tech-module--four"><span /><span /></div>
      <div className="hero-tech-module hero-tech-module--five"><span /><span /><span /></div>
      <div className="hero-tech-text-shield absolute inset-0" />
      <div className="hero-tech-vignette absolute inset-0" />
    </div>
  );
});

export default HeroTechnologyBackground;
