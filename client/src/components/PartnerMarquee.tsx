import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './partner-marquee.css';

type Partner = {
  name: string;
  logo: string;
};

type PartnerMarqueeProps = {
  partners: Partner[];
  className?: string;
};

type PartnerCardProps = {
  partner: Partner;
  set: 'primary' | 'clone';
};

function PartnerCard({ partner, set }: PartnerCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="partner-marquee__card" tabIndex={set === 'primary' ? 0 : -1} aria-label={`${partner.name} technology partner`}>
      <span className={`partner-marquee__wordmark ${isLoaded ? 'is-hidden' : ''}`}>{partner.name}</span>
      <span className="partner-marquee__name">{partner.name}</span>
      <img
        src={partner.logo}
        alt={set === 'primary' ? partner.name : ''}
        loading="eager"
        decoding="async"
        className={isLoaded ? 'is-loaded' : 'is-loading'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(false)}
      />
    </div>
  );
}

export default function PartnerMarquee({ partners, className = '' }: PartnerMarqueeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const distanceRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mediaQuery.matches;

    const setDistance = () => {
      const firstSet = track.querySelector<HTMLElement>('[data-marquee-set="primary"]');
      if (!firstSet) return;
      distanceRef.current = firstSet.offsetWidth;
      gsap.set(track, { x: 0 });
      tweenRef.current?.invalidate();
    };

    const createTween = () => {
      tweenRef.current?.kill();
      setDistance();

      if (reducedMotionRef.current || distanceRef.current === 0) {
        gsap.set(track, { x: 0 });
        return;
      }

      tweenRef.current = gsap.to(track, {
        x: () => -distanceRef.current,
        duration: Math.max(18, distanceRef.current / 55),
        ease: 'none',
        repeat: -1,
        force3D: true,
        paused: false,
      });
    };

    const pause = () => {
      if (reducedMotionRef.current || !tweenRef.current) return;
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.55, ease: 'power2.out', overwrite: true });
    };

    const resume = () => {
      if (reducedMotionRef.current || !tweenRef.current) return;
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: 'power2.out', overwrite: true });
    };

    const entrance = gsap.fromTo(
      section,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', paused: true }
    );

    // Keep the marquee discoverable before its trigger enters the viewport.
    // The entrance animation then replays from the hidden state on scroll.
    gsap.set(section, { autoAlpha: 1, y: 0 });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.set(section, { autoAlpha: 0, y: 28 });
        entrance.restart();
      },
    });

    createTween();
    viewport.addEventListener('mouseenter', pause);
    viewport.addEventListener('mouseleave', resume);
    viewport.addEventListener('focusin', pause);
    viewport.addEventListener('focusout', resume);

    const resizeObserver = new ResizeObserver(() => {
      createTween();
    });
    resizeObserver.observe(viewport);
    window.addEventListener('resize', createTween);
    mediaQuery.addEventListener('change', () => {
      reducedMotionRef.current = mediaQuery.matches;
      createTween();
    });

    return () => {
      tweenRef.current?.kill();
      entrance.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
      viewport.removeEventListener('mouseenter', pause);
      viewport.removeEventListener('mouseleave', resume);
      viewport.removeEventListener('focusin', pause);
      viewport.removeEventListener('focusout', resume);
      resizeObserver.disconnect();
      window.removeEventListener('resize', createTween);
    };
  }, [partners.length]);

  const renderPartners = (set: 'primary' | 'clone') => (
    <div className="partner-marquee__set" data-marquee-set={set} aria-hidden={set === 'clone'}>
      {partners.map((partner) => (
        <PartnerCard key={`${set}-${partner.name}`} partner={partner} set={set} />
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className={`partner-marquee ${className}`} aria-label="Technology partners">
      <div ref={viewportRef} className="partner-marquee__viewport">
        <div ref={trackRef} className="partner-marquee__track">
          {renderPartners('primary')}
          {renderPartners('clone')}
        </div>
      </div>
    </section>
  );
}
