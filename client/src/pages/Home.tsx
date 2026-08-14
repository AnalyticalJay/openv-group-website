import { ArrowRight, Play, Building2, TrendingUp, Zap, Users, Lock, BarChart3, HelpCircle, ShoppingCart, DollarSign, BookOpen, Hotel } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { animateStaggerChildren, animateSlideUp, animateFadeIn, animateScale, initLenisGSAPIntegration, createParallaxEffect, animateHeroHeadline, animateGradientText, animateButtonEntrance, addCardHoverEffect, addIconHoverEffect, addFloatingAnimation, animateCounter, addLogoHoverEffect, addNavButtonHoverEffect, setupCarouselAutoScroll, addCarouselFadeTransition, animatePageLoad, animateSectionTransition, addMicroInteractions, prefersReducedMotion, optimizeElementsForGPU, lazyLoadAnimation, cleanupAnimations } from '@/lib/animations';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import BackToTop from '@/components/BackToTop';
import ContactFormModal from '@/components/ContactFormModal';
import { useLenis } from '@/contexts/LenisContext';
import { useContactForm } from '@/contexts/ContactFormContext';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

gsap.registerPlugin(ScrollTrigger);

type BrandVideoCardProps = {
  href: string;
  source: string;
  name: string;
};

const capabilityLanes = [
  { eyebrow: 'CONNECT', label: 'Digital foundation', copy: 'Infrastructure, cybersecurity and support that keep the business moving.', themes: ['Infrastructure', 'Cybersecurity', 'Support'], accent: '#FF6B35' },
  { eyebrow: 'ENABLE', label: 'Business intelligence', copy: 'Software, automation and AI that turn operational complexity into momentum.', themes: ['Business Software', 'AI & Automation'], accent: '#1B8EFF' },
  { eyebrow: 'AMPLIFY', label: 'Customer experience', copy: 'Web, marketing and digital growth that make your value easier to find.', themes: ['Digital Growth'], accent: '#FF1744' },
];

const industryLabels = ['Manufacturing', 'Healthcare', 'Professional Services', 'Construction', 'Retail', 'Financial Services', 'Education', 'Hospitality'];

function BrandVideoCard({ href, source, name }: BrandVideoCardProps) {
  const baseBorder = 'rgba(255, 107, 53, 0.32)';
  const baseShadow = '0 8px 24px rgba(0, 0, 0, 0.16)';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${name}`}
      className="group relative block h-48 cursor-pointer overflow-hidden rounded-lg bg-navy-medium/50 backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111C] sm:h-56 md:h-64"
      style={{ border: `1px solid ${baseBorder}`, boxShadow: baseShadow }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.9)';
        e.currentTarget.style.boxShadow = '0 20px 45px rgba(255, 107, 53, 0.22)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = baseBorder;
        e.currentTarget.style.boxShadow = baseShadow;
      }}
      ref={(el) => {
        if (el) addCardHoverEffect(el);
      }}
    >
      <video className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src={source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111C]/70 via-transparent to-[#07111C]/10 opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-[#FF6B35]/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="sr-only">{name}</span>
    </a>
  );
}

export default function Home() {
  // The useAuth hook provides authentication state.
  // To implement login/logout, call logout(), or start login from an event
  // handler: onClick={() => startLogin()} (imported from "@/const"). Never call
  // startLogin() during render (no href={startLogin()}) — it mints a one-time
  // nonce cookie and must run only at the moment of navigation.
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const { openContactForm } = useContactForm();
  // Animation refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBackgroundRef = useRef<HTMLDivElement>(null);
  const heroHeadlineRef = useRef<HTMLDivElement>(null);
  const heroGradientRef = useRef<HTMLSpanElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const watchVideoButtonRef = useRef<HTMLButtonElement>(null);
  const ctaBackgroundRef = useRef<HTMLDivElement>(null);
  const brandCardsRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<any>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const swiperRef = useRef<any>(null);
  const partnersCarouselRef = useRef<HTMLDivElement>(null);
  const partnersNavButtonsRef = useRef<HTMLDivElement>(null);

  // Add CSS animations for globe and connector movement
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatGlobe {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-20px) scale(1.02); }
      }
      @keyframes rotateConnectors {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulseGlow {
        0%, 100% { opacity: 0.7; filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.3)); }
        50% { opacity: 0.9; filter: drop-shadow(0 0 40px rgba(255, 107, 53, 0.6)); }
      }
      .hero-background-animated {
        animation: floatGlobe 6s ease-in-out infinite, pulseGlow 4s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Get Lenis instance for scroll integration
  const lenis = useLenis();

  // Initialize GSAP with Lenis and apply section animations
  useEffect(() => {
    // Initialize Lenis-GSAP integration
    initLenisGSAPIntegration(lenis);
    
    // Page load animations
    animatePageLoad();
    
    // Add micro-interactions to all interactive elements
    addMicroInteractions();

    // Hero section animations
    if (heroHeadlineRef.current) animateHeroHeadline(heroHeadlineRef.current);
    if (heroGradientRef.current) animateGradientText(heroGradientRef.current);
    if (exploreButtonRef.current) animateButtonEntrance(exploreButtonRef.current, 0);
    if (watchVideoButtonRef.current) animateButtonEntrance(watchVideoButtonRef.current, 0.1);
    if (heroBackgroundRef.current) addFloatingAnimation(heroBackgroundRef.current);

    // Apply scroll-triggered animations to sections
    if (brandCardsRef.current) animateStaggerChildren(brandCardsRef.current, '[class*="group"]', 0.15);
    if (capabilitiesRef.current) {
      const capabilityLanes = capabilitiesRef.current.querySelectorAll('[data-capability-lane]');
      animateStaggerChildren(capabilitiesRef.current, '[data-capability-lane]', 0.12);
      capabilityLanes.forEach((lane) => addCardHoverEffect(lane as HTMLElement));
      const header = capabilitiesRef.current.querySelector('[data-capabilities-header]');
      if (header) animateFadeIn(header as HTMLElement);
    }
    if (partnersRef.current) animateStaggerChildren(partnersRef.current, '[class*="bg-white"]', 0.08);
    // Apply parallax effects to background images
    if (heroBackgroundRef.current) createParallaxEffect(heroBackgroundRef.current, 0.4);
    // CTA section uses CSS backgroundAttachment: 'fixed' for parallax (like Partners section)
    
    // Performance optimization: GPU acceleration for animated elements
    if (!prefersReducedMotion()) {
      const animatedElements = document.querySelectorAll('[class*="animate"], button, a, .ecosystem-icon, [data-capability-lane], .partner-logo');
      optimizeElementsForGPU(animatedElements as NodeListOf<Element>);
    }
    
    // Cleanup on unmount
    return () => {
      cleanupAnimations();
    };
  }, [lenis]);

  // Auto-scroll carousel effect
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollIntervalRef.current = setInterval(() => {
        if (carouselRef.current?.scrollNext) {
          carouselRef.current.scrollNext();
        }
      }, 4000); // Scroll every 4 seconds
    };

    const stopAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };

    startAutoScroll();

    return () => stopAutoScroll();
  }, []);

  // Get contact form state from context
  const { isOpen: isContactModalOpen, closeContactForm } = useContactForm();

  return (
    <div className="min-h-screen bg-navy text-white">
      <Navigation />
      <BackToTop />
      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center pt-32 sm:pt-36 md:pt-48 lg:pt-52 pb-20 sm:pb-24 md:pb-28 lg:pb-32 overflow-hidden bg-navy" style={{opacity: 1}}>
        {/* Abstract enterprise technology background with text-safe space */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            ref={heroBackgroundRef}
            className="absolute inset-0 w-full h-full hero-background-animated"
            style={{
              backgroundImage: 'url(/manus-storage/openv-hero-abstract-technology_3973bcae.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.7
            }}
            onLoad={(e) => { if (heroBackgroundRef.current) addFloatingAnimation(heroBackgroundRef.current); }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/40 to-navy/60 z-10"></div>
        </div>

        <div className="relative z-20 w-full">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-20 max-w-7xl">
          <div className="max-w-4xl">


            {/* Headline */}
            <h1 ref={heroHeadlineRef} className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-manrope font-black text-white mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight">
              <div className="headline-line">THREE SPECIALIST BRANDS.</div>
              <div className="headline-line">
                <span ref={heroGradientRef} style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900', letterSpacing: '-0.02em', backgroundSize: '200% 100%', display: 'inline-block'}}>ONE POWERFUL GROUP.</span>
              </div>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 md:mb-12 max-w-3xl font-light leading-relaxed">
              Different expertise. One seamless partnership.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 pb-8 sm:pb-10 md:pb-12 lg:pb-16">
              <button ref={exploreButtonRef} className="inline-flex items-center justify-center sm:justify-start w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-white font-bold tracking-wider text-xs uppercase rounded transition-colors hover:shadow-lg hover:shadow-orange-500/50" style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)'}}>
                EXPLORE THE GROUP
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button ref={watchVideoButtonRef} className="inline-flex items-center justify-center sm:justify-start w-full sm:w-auto text-white font-bold tracking-widest text-xs uppercase hover:text-orange-400 transition-colors">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mr-4 hover:border-orange-500 transition-colors">
                  <Play className="w-5 h-5 ml-1" style={{color: '#FF6B35'}} />
                </div>
                WATCH VIDEO
              </button>
            </div>
          </div>
          </div>

      {/* Brands Section */}
      <section id="companies" className="relative z-10 overflow-hidden bg-transparent pt-8 sm:pt-10 md:pt-14 lg:pt-20 pb-1 sm:pb-2 md:pb-3 lg:pb-4">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl relative z-10">
          {/* Brand Cards */}
          <div ref={brandCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <BrandVideoCard name="OpenV Business" href="https://www.openv.co.za/" source="/manus-storage/OpenV(1)_7faeea8b.mp4" />

            <BrandVideoCard name="NextFour" href="https://nextfour.co.za/" source="/manus-storage/NextFour(3)_1389b015.mp4" />

            <BrandVideoCard name="ShiftBridge" href="https://shiftbridge.co.za/" source="/manus-storage/ShiftBridge(1)_ae346aab.mp4" />
          </div>
        </div>
      </section>
        </div>
      </section>

      {/* Unified Capabilities + Industries Section */}
      <section id="solutions" ref={capabilitiesRef} className="relative overflow-hidden border-t border-gray-200 bg-[#F8FAFC] py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 pointer-events-none opacity-70" style={{background: 'radial-gradient(circle at 78% 18%, rgba(27, 142, 255, 0.10), transparent 32%), radial-gradient(circle at 18% 72%, rgba(255, 107, 53, 0.08), transparent 30%)'}}></div>
        <div className="container relative z-10 mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
          <div data-capabilities-header className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20" style={{opacity: 0}}>
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#FF6B35] sm:text-xs">OPENV GROUP / ONE OPERATING LAYER</p>
              <h2 className="max-w-3xl font-manrope text-3xl font-black leading-[1.04] tracking-tight text-[#07111C] sm:text-4xl md:text-5xl lg:text-6xl">
                Technology that moves<br />
                <span style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}}>the whole business forward.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:mt-7 md:text-lg">
                One connected capability layer across the systems, experiences and industries that shape modern growth.
              </p>
            </div>

            <div className="relative min-h-[280px] overflow-hidden rounded-3xl bg-[#07111C] p-6 text-white shadow-[0_28px_80px_rgba(7,17,28,0.24)] sm:min-h-[340px] sm:p-8 md:min-h-[380px] md:p-10">
              <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-[#1B8EFF]/30"></div>
              <div className="absolute -right-4 -top-4 h-80 w-80 rounded-full border border-[#FF6B35]/20"></div>
              <div className="absolute inset-0 opacity-70" style={{background: 'linear-gradient(135deg, transparent 0 38%, rgba(27,142,255,0.14) 38.2% 38.5%, transparent 38.7% 100%), radial-gradient(circle at 76% 30%, rgba(255,107,53,0.18), transparent 28%)'}}></div>
              <div className="absolute left-[9%] right-[9%] top-[48%] h-px bg-gradient-to-r from-[#FF6B35] via-[#1B8EFF] to-transparent"></div>
              <div className="absolute left-[43%] top-[48%] h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#FF6B35] shadow-[0_0_22px_rgba(255,107,53,0.9)]"></div>
              <div className="absolute left-[9%] right-[9%] top-[69%] border-t border-white/10"></div>
              <div className="relative flex h-full min-h-[230px] flex-col justify-between sm:min-h-[280px] md:min-h-[320px]">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.24em] text-white/50"><span>FROM FOUNDATION</span><span>TO MOMENTUM</span></div>
                <div className="relative mt-8 flex flex-1 items-center justify-between">
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[#FF6B35]/70 bg-[#FF6B35]/10 text-center shadow-[0_0_42px_rgba(255,107,53,0.24)] sm:h-32 sm:w-32"><span className="text-xs font-black uppercase tracking-[0.22em] text-[#FF6B35]">OPENV</span><span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">01 / GROUP</span></div>
                  <div className="absolute left-[40%] top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">OPERATING LAYER</div>
                  <div className="relative mr-1 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#1B8EFF]/70 bg-[#1B8EFF]/10 text-center shadow-[0_0_38px_rgba(27,142,255,0.22)] sm:h-24 sm:w-24"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1B8EFF]">GROW</span><span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">02 / IMPACT</span></div>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/65"><span>CONNECT</span><span>ENABLE</span><span>SCALE</span></div>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-5 md:mt-20">
            {capabilityLanes.map((lane, index) => (
              <article key={lane.eyebrow} data-capability-lane tabIndex={0} role="group" aria-label={`${lane.label}: ${lane.copy}`} className="group relative grid gap-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_14px_34px_rgba(7,17,28,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-[0_22px_44px_rgba(7,17,28,0.12)] focus-visible:-translate-y-1 focus-visible:border-[#FF6B35] focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC] focus-visible:shadow-[0_22px_44px_rgba(7,17,28,0.12)] sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-7 sm:p-7 md:p-8">
                <span className="absolute inset-y-0 left-0 w-1 transition-all duration-300 group-hover:w-1.5" style={{background: lane.accent}}></span>
                <span className="absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-20" style={{background: lane.accent}}></span>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border text-[10px] font-bold tracking-[0.18em] text-slate-500 transition-all duration-300 group-hover:scale-105 group-hover:text-[#07111C] sm:h-14 sm:w-14" style={{borderColor: `${lane.accent}55`, background: `${lane.accent}0d`}}>0{index + 1}</div>
                <div className="relative min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{color: lane.accent}}>{lane.eyebrow}</p>
                  <h3 className="mt-1 font-manrope text-2xl font-bold tracking-tight text-[#07111C] sm:text-3xl">{lane.label}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{lane.copy}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {lane.themes.map((theme) => <span key={theme} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500 transition-all duration-300 group-hover:border-slate-300 group-hover:bg-white group-hover:text-[#07111C]">{theme}</span>)}
                  </div>
                </div>
                <div className="relative flex w-full items-center justify-end gap-3 pt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 transition-colors duration-300 group-hover:text-[#07111C] sm:w-auto sm:pt-0"><span className="h-px w-10 bg-slate-300 transition-all duration-300 group-hover:w-16" style={{backgroundColor: lane.accent}}></span><span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition-all duration-300 group-hover:border-transparent group-hover:bg-[#07111C] group-hover:text-white"><ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" /></span></div>
              </article>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl bg-[#07111C] p-6 text-white shadow-[0_22px_60px_rgba(7,17,28,0.16)] sm:mt-16 sm:p-8 md:mt-20 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="flex items-end gap-4 sm:gap-6">
                <span className="font-manrope text-6xl font-black leading-none tracking-[-0.08em] text-white sm:text-7xl">08</span>
                <div className="pb-1"><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF6B35]">BUILT FOR THE REAL WORLD</p><p className="mt-2 max-w-sm text-sm leading-relaxed text-white/65">One group. Eight sectors. No disconnected handoffs.</p></div>
              </div>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-[#FF6B35]/70 via-[#1B8EFF]/60 to-transparent lg:block"></div>
              <p className="max-w-xs text-xs font-bold uppercase leading-relaxed tracking-[0.16em] text-white/40">Technology shaped around how your world actually works.</p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-white/10 pt-6 sm:grid-cols-2 md:grid-cols-4">
              {industryLabels.map((label, index) => (
                <div key={label} className="group flex items-center gap-3 border-b border-white/10 pb-3 transition-colors duration-300 hover:border-[#FF6B35]/70 md:border-b-0 md:pb-0">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-white/35">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/65 transition-colors duration-300 group-hover:text-white">{label}</span>
                  <span className="ml-auto h-px w-6 bg-white/15 transition-all duration-300 group-hover:w-10 group-hover:bg-[#FF6B35]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Partners Section */}
      <section id="partners" className="py-12 md:py-20 lg:py-32 bg-navy relative overflow-hidden">
        {/* Isometric Background */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'url(/manus-storage/partners-bg-isometric_aabc2946.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16" style={{opacity: 0}} ref={(el) => { if (el) animateFadeIn(el); }}>
            <h2 className="text-white uppercase tracking-widest text-base sm:text-lg md:text-2xl font-bold mb-2 md:mb-4 font-manrope">Our Technology Partners</h2>
            <p className="text-white/70 text-xs sm:text-sm">World-class brands. Strategic partnerships. Real results.</p>
          </div>

          {/* Partner Logos Carousel */}
          <Carousel ref={(el) => { carouselRef.current = el; }} className="w-full mb-6 sm:mb-8 md:mb-12" opts={{ align: 'center', loop: true, slidesToScroll: 1 }}>
            <CarouselContent className="-ml-2 md:-ml-4" ref={partnersCarouselRef}>
              {[
                { name: 'Vodacom', logo: '/manus-storage/logo-vodacom_59076cbe.png' },
                { name: 'Citrix', logo: '/manus-storage/logo-citrix_69ed1026.png' },
                { name: 'Microsoft', logo: '/manus-storage/logo-microsoft_2384180c.png' },
                { name: 'Cisco', logo: '/manus-storage/logo-cisco_47b2b265.png' },
                { name: 'Fortinet', logo: '/manus-storage/logo-fortinet_989f697b.png' },
                { name: 'Dell', logo: '/manus-storage/logo-dell_bc7519d8.png' },
                { name: 'Nikon', logo: '/manus-storage/logo-nikon_0f9a3ad8.png' },
                { name: 'CSI', logo: '/manus-storage/logo-csi_cf8c6ef2.png' },
              ].map((partner, i) => (
                <CarouselItem key={i} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <div className="flex items-center justify-center h-20 sm:h-24 md:h-32 transition-all duration-300" ref={(el) => { if (el) addLogoHoverEffect(el); }}>
                    <img src={partner.logo} alt={partner.name} className="max-h-16 sm:max-h-20 md:max-h-28 max-w-full object-contain" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16" ref={(el) => { if (el) addNavButtonHoverEffect(el); }} />
            <CarouselNext className="hidden md:flex -right-12 lg:-right-16" ref={(el) => { if (el) addNavButtonHoverEffect(el); }} />
          </Carousel>

          {/* View All Button */}
          <div className="text-center" ref={partnersNavButtonsRef}>
            <button className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 border-2 font-bold tracking-wider text-xs uppercase rounded transition-all" style={{borderColor: '#FF6B35', color: '#FF6B35'}} onMouseEnter={(e) => {e.currentTarget.style.background = '#FF6B35'; e.currentTarget.style.color = 'white';}} onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF6B35';}}>
              VIEW ALL PARTNERS
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section id="cta" className="py-8 sm:py-12 md:py-20 lg:py-32 bg-navy relative overflow-hidden">
        {/* Isometric Background */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'url(/manus-storage/partners-bg-isometric_aabc2946.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}></div>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16" style={{opacity: 0}} ref={(el) => { if (el) animateFadeIn(el); }}>
            <h2 className="text-white uppercase tracking-wider text-sm sm:text-base md:text-xl lg:text-2xl font-bold mb-2 md:mb-4 font-manrope">Ready to transform your business?</h2>
            <p className="text-white/70 text-xs">Book us for team loyalty and discover how Open V Group can do more with your technology. Businesses across South Africa trust us.</p>
          </div>

          {/* CTA Button */}
          <div className="text-center" ref={ctaRef}>
            <button onClick={openContactForm} className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 border-2 font-bold tracking-wider text-xs uppercase rounded transition-all" style={{borderColor: '#FF6B35', color: '#FF6B35'}} onMouseEnter={(e) => {e.currentTarget.style.background = '#FF6B35'; e.currentTarget.style.color = 'white';}} onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF6B35'}}>
              BOOK A CONSULTATION
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy border-t border-white/10 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-white font-bold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">OpenV Group</h3>
              <p className="text-xs text-white/60">Three expert brands. One connected ecosystem. Empowering businesses across South Africa.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">Quick Links</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs text-white/60">
                <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Solutions</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Our Companies */}
            <div>
              <h4 className="text-white font-bold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">Our Companies</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs text-white/60">
                <li><a href="#" className="hover:text-orange-400 transition-colors">OpenV Business Solutions</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">NextFour</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">ShiftBridge</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">Contact</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs text-white/60">
                <li><a href="tel:0413790550" className="hover:text-orange-400 transition-colors">041 379 0550</a></li>
                <li><a href="mailto:info@openv.co.za" className="hover:text-orange-400 transition-colors">info@openv.co.za</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 pt-4 sm:pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white/60 gap-3 sm:gap-4 md:gap-0">
            <p>&copy; 2025 OpenV Group. All rights reserved.</p>
            <div className="flex gap-3 sm:gap-4 md:gap-6">
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      <ContactFormModal isOpen={isContactModalOpen} onClose={closeContactForm} />
    </div>
  );
}
