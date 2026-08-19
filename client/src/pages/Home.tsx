import { ArrowRight, Play, Building2, TrendingUp, Zap, Users, Lock, BarChart3, HelpCircle, ShoppingCart, DollarSign, BookOpen, Hotel } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { animateStaggerChildren, animateSlideUp, animateFadeIn, animateScale, initLenisGSAPIntegration, createParallaxEffect, animateHeroHeadline, animateGradientText, animateButtonEntrance, addCardHoverEffect, addIconHoverEffect, animateCounter, animatePageLoad, animateSectionTransition, addMicroInteractions, addPressMotion, prefersReducedMotion, optimizeElementsForGPU, lazyLoadAnimation, setupHomepageMotion, cleanupAnimations } from '@/lib/animations';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import BackToTop from '@/components/BackToTop';
import ContactFormModal from '@/components/ContactFormModal';
import { useLenis } from '@/contexts/LenisContext';
import { useContactForm } from '@/contexts/ContactFormContext';
import PartnerMarquee from '@/components/PartnerMarquee';
import HeroTechnologyBackground from '@/components/HeroTechnologyBackground';

gsap.registerPlugin(ScrollTrigger);

type BrandVideoCardProps = {
  href: string;
  name: string;
  logo: string;
  description: string;
  accent: string;
  tags: string[];
};

const capabilityLanes = [
  { eyebrow: 'CONNECT', label: 'Managed technology foundation', copy: '24/7 managed IT, cybersecurity, cloud and connectivity that keep the business moving.', themes: ['Managed IT', 'Cybersecurity', 'Cloud & Connectivity'], accent: '#FF6B35' },
  { eyebrow: 'ENABLE', label: 'Connected business operations', copy: 'CRM, quoting, jobs, invoicing and AI-assisted workflows in one operational view.', themes: ['Business Software', 'Automation', 'AI Workflows'], accent: '#1B8EFF' },
  { eyebrow: 'AMPLIFY', label: 'Digital growth engine', copy: 'Web, marketing, brand and CRM experiences built to turn visibility into growth.', themes: ['Web & CRM', 'Marketing', 'Brand'], accent: '#FF1744' },
];

const operatingLayerPillars = [
  { label: 'Connect', detail: 'Technology foundation', accent: '#FF6B35' },
  { label: 'Enable', detail: 'Business operations', accent: '#1B8EFF' },
  { label: 'Amplify', detail: 'Digital growth', accent: '#FF1744' },
];

const industryLabels = ['Manufacturing', 'Healthcare', 'Professional Services', 'Construction', 'Retail', 'Financial Services', 'Education', 'Hospitality'];

const groupProof = [
  { value: '20+', label: 'Years in South Africa' },
  { value: '45', label: 'ICT specialists' },
  { value: '8', label: 'Corporate ICT partners' },
  { value: '3', label: 'Integrated brands' },
];

const groupOutcomes = [
  { index: '01', title: 'One call', copy: 'One team owns the issue from report to resolution.' },
  { index: '02', title: 'One invoice', copy: 'Clearer reporting and more predictable technology spend.' },
  { index: '03', title: 'One relationship', copy: 'Every technology layer working toward the same business goal.' },
];

const fragmentedVendors = ['IT support', 'Connectivity', 'Website', 'Cybersecurity', 'Business software'];

const connectedOutcomes = ['Clear ownership', 'Connected systems', 'Predictable costs'];

const appliedAi = [
  { index: '01', label: 'Microsoft 365 Copilot', copy: 'Draft, summarise and analyse inside everyday tools.' },
  { index: '02', label: 'AI threat detection', copy: 'Identify and respond to risk in real time.' },
  { index: '03', label: 'ShiftBridge workflows', copy: 'Surface follow-ups, overdue work and operational signals.' },
  { index: '04', label: 'NextFour marketing', copy: 'Optimise campaigns, content and customer response.' },
];

const technologyPartners = [
  { name: 'Vodacom', logo: '/manus-storage/logo-vodacom_59076cbe.png' },
  { name: 'Citrix', logo: '/manus-storage/logo-citrix_69ed1026.png' },
  { name: 'Microsoft', logo: '/manus-storage/logo-microsoft_2384180c.png' },
  { name: 'Cisco', logo: '/manus-storage/logo-cisco_47b2b265.png' },
  { name: 'Fortinet', logo: '/manus-storage/logo-fortinet_989f697b.png' },
  { name: 'Dell', logo: '/manus-storage/logo-dell_bc7519d8.png' },
  { name: 'Nikon', logo: '/manus-storage/logo-nikon_0f9a3ad8.png' },
  { name: 'CSI', logo: '/manus-storage/logo-csi_cf8c6ef2.png' },
];

function BrandLogo({ logo, name }: { logo: string; name: string }) {
  return (
    <div className="flex h-16 w-full min-w-0 items-center justify-center sm:h-20 md:h-24">
      <img src={logo} alt={`${name} logo`} className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]" loading="eager" decoding="async" />
    </div>
  );
}

function BrandVideoCard({ href, name, logo, description, accent, tags }: BrandVideoCardProps) {
  const baseBorder = `${accent}55`;
  const baseShadow = '0 12px 32px rgba(3, 10, 18, 0.22)';

  return (
    <a
      data-motion-press
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${name}`}
      className="group relative block h-48 cursor-pointer overflow-hidden rounded-2xl border bg-[#0A1828]/92 backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-2 focus-visible:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111C] sm:h-56 md:h-64"
      style={{ borderColor: baseBorder, boxShadow: baseShadow }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.boxShadow = `0 24px 52px ${accent}35`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = baseBorder;
        e.currentTarget.style.boxShadow = baseShadow;
      }}
      ref={(el) => {
        if (el) addCardHoverEffect(el);
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: `radial-gradient(circle at 85% 16%, ${accent}28, transparent 34%), linear-gradient(135deg, transparent 0 45%, ${accent}12 45.2% 45.5%, transparent 45.7% 100%)` }} />
      <div className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full border opacity-60 transition-transform duration-700 group-hover:scale-125" style={{ borderColor: `${accent}38` }} />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

      <div className="relative flex h-full flex-col items-center justify-between p-5 text-center sm:p-6 md:p-7">
        <div className="w-full">
          <BrandLogo logo={logo} name={name} />
        </div>

        <div className="min-w-0">
          <p className="mx-auto max-w-[19rem] text-xs leading-relaxed text-white/60">{description}</p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-3 border-t border-white/10 pt-3">
          <div className="flex flex-wrap justify-center gap-1.5">
            {tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white/48 transition-colors duration-300 group-hover:border-white/25 group-hover:text-white/75">{tag}</span>)}
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" style={{ color: `${accent}cc` }} />
        </div>
      </div>
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

  // Animation refs for each section
  const homepageMotionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBackgroundRef = useRef<HTMLDivElement>(null);
  const heroHeadlineRef = useRef<HTMLDivElement>(null);
  const heroGradientRef = useRef<HTMLSpanElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const watchVideoButtonRef = useRef<HTMLButtonElement>(null);
  const brandCardsRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLElement>(null);
  const [showAllPartners, setShowAllPartners] = useState(false);

  // Get Lenis instance for scroll integration
  const lenis = useLenis();

  // Initialize GSAP with Lenis and apply section animations
  useEffect(() => {
    // Initialize Lenis-GSAP integration and the scoped homepage motion system.
    initLenisGSAPIntegration(lenis);
    const teardownHomepageMotion = homepageMotionRef.current
      ? setupHomepageMotion(homepageMotionRef.current)
      : undefined;
    const reducedMotion = prefersReducedMotion();
    const teardownPressMotion = addPressMotion(document.querySelectorAll<HTMLElement>('[data-motion-press]'));

    if (!reducedMotion) {
      animatePageLoad();
      addMicroInteractions();

      // Hero motion remains deliberately more expressive than scroll reveals.
      if (heroHeadlineRef.current) animateHeroHeadline(heroHeadlineRef.current);
      if (heroGradientRef.current) animateGradientText(heroGradientRef.current);
      if (exploreButtonRef.current) animateButtonEntrance(exploreButtonRef.current, 0);
      if (watchVideoButtonRef.current) animateButtonEntrance(watchVideoButtonRef.current, 0.1);
      if (heroBackgroundRef.current) {
        createParallaxEffect(heroBackgroundRef.current, 0.24);
      }
    }

    if (capabilitiesRef.current) {
      capabilitiesRef.current.querySelectorAll('[data-capability-lane]').forEach((lane) => {
        addCardHoverEffect(lane as HTMLElement);
      });
    }

    if (!reducedMotion) {
      const animatedElements = document.querySelectorAll('[class*="animate"], button, a, [data-motion-section], [data-motion-child], [data-capability-lane], .partner-logo');
      optimizeElementsForGPU(animatedElements as NodeListOf<Element>);
    }

    return () => {
      teardownPressMotion?.();
      teardownHomepageMotion?.();
      cleanupAnimations();
    };
  }, [lenis]);


  // Get contact form state from context
  const { isOpen: isContactModalOpen, closeContactForm } = useContactForm();

  return (
    <div ref={homepageMotionRef} className="min-h-screen bg-navy text-center text-white md:text-left">
      <Navigation />
      <BackToTop />
      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center pt-32 sm:pt-36 md:pt-48 lg:pt-52 pb-20 sm:pb-24 md:pb-28 lg:pb-32 overflow-hidden bg-navy" style={{opacity: 1}}>
        {/* Three connected capability streams converge into one OpenV Group operating layer. */}
        <HeroTechnologyBackground ref={heroBackgroundRef} />

        <div className="relative z-20 w-full">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-20 max-w-7xl">
          <div className="mx-auto max-w-4xl md:mx-0">


            {/* Headline */}
            <h1 ref={heroHeadlineRef} className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-manrope font-black text-white mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight">
              <div className="headline-line">THREE SPECIALIST BRANDS.</div>
              <div className="headline-line">
                <span ref={heroGradientRef} style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900', letterSpacing: '-0.02em', backgroundSize: '200% 100%', display: 'inline-block'}}>ONE POWERFUL GROUP.</span>
              </div>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 md:mb-12 max-w-3xl font-light leading-relaxed">
              One accountable team across managed IT, digital growth and connected business software.
            </p>

            {/* CTAs */}
            <div className="flex flex-col flex-wrap items-center justify-center gap-3 pb-8 sm:flex-row sm:gap-4 md:items-start md:justify-start md:gap-6 md:pb-12 lg:pb-16">
              <button ref={exploreButtonRef} data-motion-press className="inline-flex w-full items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:shadow-lg hover:shadow-orange-500/50 sm:w-auto sm:px-6 sm:py-3" style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)'}}>
                EXPLORE THE GROUP
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button ref={watchVideoButtonRef} data-motion-press className="inline-flex w-full items-center justify-center text-xs font-bold uppercase tracking-widest text-white transition-colors hover:text-orange-400 sm:w-auto">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mr-4 hover:border-orange-500 transition-colors">
                  <Play className="w-5 h-5 ml-1" style={{color: '#FF6B35'}} />
                </div>
                WATCH VIDEO
              </button>
            </div>
          </div>
          </div>

      {/* Brands Section */}
      <section id="companies" data-motion-section className="relative z-10 overflow-hidden bg-transparent pt-8 sm:pt-10 md:pt-14 lg:pt-20 pb-1 sm:pb-2 md:pb-3 lg:pb-4">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl relative z-10">
          {/* Brand Cards */}
          <div ref={brandCardsRef} data-motion-child className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <BrandVideoCard name="OpenV Business" href="https://www.openv.co.za/" logo="/manus-storage/openv-business-logo_9be9b2a7.png" description="Managed IT, cybersecurity, cloud and connectivity—proactive, monitored and SLA-backed." accent="#FF6B35" tags={["Managed IT", "Cybersecurity", "Cloud"]} />

            <BrandVideoCard name="NextFour" href="https://nextfour.co.za/" logo="/manus-storage/nextfour-logo_2b7d7e0d.png" description="Web, marketing, brand and CRM—built to turn visibility into measurable growth." accent="#1B8EFF" tags={["Web & CRM", "Marketing", "Brand"]} />

            <BrandVideoCard name="ShiftBridge" href="https://shiftbridge.co.za/" logo="/manus-storage/shiftbridge-logo_cf5c7e03.png" description="CRM, quoting, jobs, invoicing and automation—one clear view of your operation." accent="#FF4F8B" tags={["Business OS", "Job Management", "Automation"]} />
          </div>
        </div>
      </section>
        </div>
      </section>

      {/* Fragmented Vendors to One Accountable Group */}
      <section id="why-group" data-motion-section className="relative overflow-hidden border-t border-slate-200 bg-[#F8FAFC] py-14 sm:py-18 md:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-80" style={{background: 'radial-gradient(circle at 12% 22%, rgba(255,107,53,0.09), transparent 26%), radial-gradient(circle at 88% 72%, rgba(27,142,255,0.09), transparent 28%)'}} />
        <div className="container relative z-10 mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
          <div data-motion-child className="grid items-end gap-6 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:text-left lg:gap-20">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#FF6B35] sm:text-xs">WHY THE GROUP EXISTS</p>
              <h2 className="mx-auto max-w-3xl font-manrope text-3xl font-black leading-[1.04] tracking-tight text-[#07111C] sm:text-4xl md:mx-0 md:text-5xl lg:text-6xl">
                Technology breaks<br />
                <span style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}}>in the gaps.</span>
              </h2>
            </div>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:mx-0 md:text-lg">Multiple suppliers create handoffs, blind spots and cost. OpenV Group replaces the gaps with one accountable operating relationship.</p>
          </div>

          <div data-motion-child className="mt-10 grid items-stretch gap-4 sm:mt-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
            <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_55px_rgba(7,17,28,0.08)] sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-70" style={{background: 'linear-gradient(145deg, transparent 0 44%, rgba(255,107,53,0.10) 44.2% 44.5%, transparent 44.7% 100%), radial-gradient(circle at 50% 52%, rgba(255,23,68,0.08), transparent 30%)'}} />
              <div className="relative flex items-center justify-center gap-3 sm:justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">FRAGMENTED MODEL</p><span className="h-2 w-2 rounded-full bg-[#FF1744] shadow-[0_0_18px_rgba(255,23,68,0.65)]" /></div>
              <ul aria-label="Separate technology vendors" className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {fragmentedVendors.map((vendor, index) => (
                  <li key={vendor} className={`flex min-h-20 items-center justify-center rounded-2xl border border-slate-200 bg-[#F8FAFC]/90 px-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 ${index === fragmentedVendors.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}>{vendor}</li>
                ))}
              </ul>
              <div className="relative mx-auto mt-5 flex w-fit items-center gap-3 rounded-full border border-[#FF1744]/20 bg-[#FF1744]/5 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF1744]"><span className="h-1.5 w-1.5 rounded-full bg-[#FF1744]" />Handoffs / blind spots / cost</div>
            </div>

            <div aria-hidden="true" className="flex items-center justify-center py-1 lg:py-0"><div className="flex h-12 w-12 rotate-90 items-center justify-center rounded-full border border-[#FF6B35]/35 bg-white text-[#FF6B35] shadow-[0_12px_28px_rgba(255,107,53,0.18)] lg:rotate-0"><ArrowRight className="h-5 w-5" /></div></div>

            <div data-motion-depth className="relative min-h-[300px] overflow-hidden rounded-3xl bg-[#07111C] p-6 text-white shadow-[0_26px_70px_rgba(7,17,28,0.20)] sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-[#1B8EFF]/30" />
              <div className="pointer-events-none absolute -right-2 -top-5 h-72 w-72 rounded-full border border-[#FF6B35]/18" />
              <div className="relative flex items-center justify-center gap-3 sm:justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">CONNECTED MODEL</p><span className="h-2 w-2 rounded-full bg-[#13C46B] shadow-[0_0_18px_rgba(19,196,107,0.65)]" /></div>
              <div className="relative mt-9 flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[#FF6B35]/65 bg-[#FF6B35]/10 text-[11px] font-black uppercase tracking-[0.2em] text-[#FF6B35] shadow-[0_0_42px_rgba(255,107,53,0.22)]">OPENV</div>
                <div><p className="font-manrope text-2xl font-black leading-tight sm:text-3xl">One accountable<br />technology partner.</p><p className="mt-3 text-xs leading-relaxed text-white/50 sm:text-sm">Every layer aligned under one relationship.</p></div>
              </div>
              <ul aria-label="Benefits of one accountable group" className="relative mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
                {connectedOutcomes.map((outcome, index) => <li key={outcome} className="bg-[#0A1828]/95 p-4"><span className="text-[9px] font-bold tracking-[0.2em] text-[#1B8EFF]">0{index + 1}</span><p className="mt-2 text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] text-white/65">{outcome}</p></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OpenV Group Advantage */}
      <section id="advantage" data-motion-section className="relative overflow-hidden border-t border-slate-200 bg-white py-14 sm:py-18 md:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{background: 'radial-gradient(circle at 84% 12%, rgba(27,142,255,0.10), transparent 30%), radial-gradient(circle at 12% 88%, rgba(255,107,53,0.09), transparent 28%)'}} />
        <div className="container relative z-10 mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
          <div data-motion-child className="grid items-end gap-6 md:grid-cols-[1.08fr_0.92fr] md:gap-12 md:text-left lg:gap-20">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#FF6B35] sm:text-xs">THE OPENV GROUP ADVANTAGE</p>
              <h2 className="mx-auto max-w-3xl font-manrope text-3xl font-black leading-[1.04] tracking-tight text-[#07111C] sm:text-4xl md:mx-0 md:text-5xl lg:text-6xl">
                Less complexity.<br />
                <span style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}}>More capability.</span>
              </h2>
            </div>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:mx-0 md:text-lg">
              OpenV Group replaces fragmented suppliers with one accountable relationship across your technology, customer growth and business operations.
            </p>
          </div>

          <div data-motion-child data-motion-depth className="relative mt-10 overflow-hidden rounded-3xl bg-[#07111C] p-6 text-white shadow-[0_30px_90px_rgba(7,17,28,0.22)] sm:mt-12 sm:p-8 md:mt-16 md:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-[#1B8EFF]/25" />
            <div className="pointer-events-none absolute -right-6 -top-10 h-96 w-96 rounded-full border border-[#FF6B35]/15" />
            <div className="pointer-events-none absolute inset-0 opacity-80" style={{background: 'linear-gradient(132deg, transparent 0 43%, rgba(27,142,255,0.11) 43.2% 43.5%, transparent 43.7% 100%), radial-gradient(circle at 78% 34%, rgba(255,107,53,0.16), transparent 27%)'}} />
            <div className="relative grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-end lg:gap-16">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/45">ONE GROUP / COMPLETE TECHNOLOGY PARTNER</p>
                <h3 className="mx-auto mt-5 max-w-xl font-manrope text-3xl font-black leading-[1.06] tracking-tight sm:text-4xl md:mx-0 md:text-5xl">
                  One call.<br />One invoice.<br /><span className="text-[#FF6B35]">Total accountability.</span>
                </h3>
                <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base md:mx-0">Managed IT. Digital growth. Business software. Designed to work as one.</p>
              </div>

              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                {groupProof.map((proof) => (
                  <div key={proof.label} className="min-h-28 bg-[#0A1828]/95 p-5 sm:min-h-32 sm:p-6">
                    <strong className="font-manrope text-3xl font-black tracking-tight text-white sm:text-4xl">{proof.value}</strong>
                    <p className="mt-3 max-w-[9rem] text-[9px] font-bold uppercase leading-relaxed tracking-[0.16em] text-white/45 sm:text-[10px]">{proof.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div data-motion-child className="mt-7 grid border-y border-slate-200 md:grid-cols-3 md:divide-x md:divide-slate-200">
            {groupOutcomes.map((outcome) => (
              <div key={outcome.index} className="grid justify-items-center gap-2 border-b border-slate-200 py-6 text-center last:border-b-0 md:grid-cols-[auto_1fr] md:justify-items-start md:gap-4 md:border-b-0 md:px-6 md:text-left md:first:pl-0 md:last:pr-0">
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#FF6B35]">{outcome.index}</span>
                <div><h3 className="font-manrope text-lg font-bold text-[#07111C]">{outcome.title}</h3><p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">{outcome.copy}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Capabilities + Industries Section */}
      <section id="solutions" ref={capabilitiesRef} data-motion-section className="relative overflow-hidden border-t border-gray-200 bg-[#F8FAFC] py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 pointer-events-none opacity-70" style={{background: 'radial-gradient(circle at 78% 18%, rgba(27, 142, 255, 0.10), transparent 32%), radial-gradient(circle at 18% 72%, rgba(255, 107, 53, 0.08), transparent 30%)'}}></div>
        <div className="container relative z-10 mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
          <header data-capabilities-header data-operating-layer-header data-motion-child className="mx-auto max-w-5xl text-center">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#FF6B35] sm:text-xs">OPENV GROUP / ONE OPERATING LAYER</p>
            <h2 className="font-manrope text-3xl font-black leading-[1.04] tracking-tight text-[#07111C] sm:text-4xl md:text-5xl lg:text-6xl">
              Technology that moves
              <span className="block" style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}}>the whole business forward.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:mt-7 md:text-lg">
              One connected capability layer across managed technology, customer growth and day-to-day business operations—designed around the way your business actually works.
            </p>
            <ul aria-label="Operating-layer capabilities" className="mx-auto mt-8 grid max-w-4xl gap-3 border-y border-slate-200 py-5 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-slate-200 sm:py-6">
              {operatingLayerPillars.map((pillar, index) => (
                <li key={pillar.label} className="flex items-center justify-center gap-3 px-4 py-2 sm:py-0">
                  <span className="h-2 w-2 rounded-full" style={{backgroundColor: pillar.accent, boxShadow: `0 0 14px ${pillar.accent}66`}} />
                  <span><strong className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#07111C]">0{index + 1} / {pillar.label}</strong><span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">{pillar.detail}</span></span>
                </li>
              ))}
            </ul>
          </header>

          <div className="mt-10 space-y-4 sm:mt-12 sm:space-y-5 md:mt-16">
            {capabilityLanes.map((lane, index) => (
              <article key={lane.eyebrow} data-capability-lane data-motion-child data-motion-press tabIndex={0} role="group" aria-label={`${lane.label}: ${lane.copy}`} className="group relative grid justify-items-center gap-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 p-5 text-center shadow-[0_14px_34px_rgba(7,17,28,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-[0_22px_44px_rgba(7,17,28,0.12)] focus-visible:-translate-y-1 focus-visible:border-[#FF6B35] focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC] focus-visible:shadow-[0_22px_44px_rgba(7,17,28,0.12)] sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:justify-items-start sm:gap-7 sm:p-7 sm:text-left md:p-8">
                <span className="absolute inset-y-0 left-0 w-1 transition-all duration-300 group-hover:w-1.5" style={{background: lane.accent}}></span>
                <span className="absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-20" style={{background: lane.accent}}></span>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border text-[10px] font-bold tracking-[0.18em] text-slate-500 transition-all duration-300 group-hover:scale-105 group-hover:text-[#07111C] sm:h-14 sm:w-14" style={{borderColor: `${lane.accent}55`, background: `${lane.accent}0d`}}>0{index + 1}</div>
                <div className="relative min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{color: lane.accent}}>{lane.eyebrow}</p>
                  <h3 className="mt-1 font-manrope text-2xl font-bold tracking-tight text-[#07111C] sm:text-3xl">{lane.label}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{lane.copy}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                    {lane.themes.map((theme) => <span key={theme} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500 transition-all duration-300 group-hover:border-slate-300 group-hover:bg-white group-hover:text-[#07111C]">{theme}</span>)}
                  </div>
                </div>
                <div className="relative flex w-full items-center justify-center gap-3 pt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 transition-colors duration-300 group-hover:text-[#07111C] sm:w-auto sm:justify-end sm:pt-0"><span className="h-px w-10 bg-slate-300 transition-all duration-300 group-hover:w-16" style={{backgroundColor: lane.accent}}></span><span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition-all duration-300 group-hover:border-transparent group-hover:bg-[#07111C] group-hover:text-white"><ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" /></span></div>
              </article>
            ))}
          </div>

          <div data-motion-child className="mt-12 overflow-hidden rounded-3xl bg-[#07111C] p-6 text-white shadow-[0_22px_60px_rgba(7,17,28,0.16)] sm:mt-16 sm:p-8 md:mt-20 md:p-10">
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="flex items-end gap-4 sm:gap-6">
                <span className="font-manrope text-6xl font-black leading-none tracking-[-0.08em] text-white sm:text-7xl">08</span>
                <div className="pb-1"><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF6B35]">BUILT FOR THE REAL WORLD</p><p className="mt-2 max-w-sm text-sm leading-relaxed text-white/65">One group. Eight sectors. No disconnected handoffs.</p></div>
              </div>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-[#FF6B35]/70 via-[#1B8EFF]/60 to-transparent lg:block"></div>
              <p className="max-w-xs text-xs font-bold uppercase leading-relaxed tracking-[0.16em] text-white/40">Technology shaped around how your world actually works.</p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-white/10 pt-6 sm:grid-cols-2 md:grid-cols-4">
              {industryLabels.map((label, index) => (
                <div key={label} className="group flex items-center justify-center gap-3 border-b border-white/10 pb-3 transition-colors duration-300 hover:border-[#FF6B35]/70 sm:justify-start md:border-b-0 md:pb-0">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-white/35">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/65 transition-colors duration-300 group-hover:text-white">{label}</span>
                  <span className="ml-auto h-px w-6 bg-white/15 transition-all duration-300 group-hover:w-10 group-hover:bg-[#FF6B35]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Applied AI Section */}
      <section id="applied-ai" data-motion-section className="relative overflow-hidden border-t border-white/10 bg-[#07111C] py-14 text-white sm:py-18 md:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-75" style={{background: 'radial-gradient(circle at 18% 28%, rgba(27,142,255,0.18), transparent 28%), radial-gradient(circle at 82% 72%, rgba(255,107,53,0.16), transparent 30%), linear-gradient(135deg, transparent 0 48%, rgba(255,255,255,0.035) 48.2% 48.4%, transparent 48.6% 100%)'}} />
        <div className="container relative z-10 mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
          <div data-motion-child className="grid items-end gap-6 md:grid-cols-[1.08fr_0.92fr] md:gap-12 md:text-left lg:gap-20">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#1B8EFF] sm:text-xs">PRACTICAL AI / ALREADY AT WORK</p>
              <h2 className="mx-auto max-w-3xl font-manrope text-3xl font-black leading-[1.04] tracking-tight text-white sm:text-4xl md:mx-0 md:text-5xl lg:text-6xl">AI inside the business.<br /><span style={{background: 'linear-gradient(135deg, #1B8EFF 0%, #13C46B 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}}>Not beside it.</span></h2>
            </div>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/60 sm:text-base md:mx-0 md:text-lg">We deploy AI where it makes the operation faster, safer and more effective—inside tools your team already uses.</p>
          </div>

          <ol data-motion-child className="relative mt-10 grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] sm:mt-12 md:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden="true" className="pointer-events-none absolute left-[8%] right-[8%] top-11 hidden h-px bg-gradient-to-r from-[#1B8EFF] via-[#13C46B] to-[#FF6B35] opacity-55 lg:block" />
            {appliedAi.map((item) => (
              <li key={item.index} className="group relative min-h-48 border-b border-white/10 p-6 text-center last:border-b-0 md:text-left md:[&:nth-child(odd)]:border-r lg:min-h-56 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:p-8">
                <div className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#1B8EFF]/55 bg-[#1B8EFF]/10 text-[9px] font-black tracking-[0.18em] text-[#1B8EFF] transition-all duration-300 group-hover:scale-110 group-hover:border-[#13C46B] group-hover:text-[#13C46B] md:mx-0">{item.index}</div>
                <h3 className="mt-7 font-manrope text-lg font-bold tracking-tight text-white sm:text-xl">{item.label}</h3>
                <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed text-white/50 sm:text-sm md:mx-0">{item.copy}</p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#1B8EFF] to-[#13C46B] transition-all duration-500 group-hover:w-full" />
              </li>
            ))}
          </ol>
        </div>
      </section>



      {/* Partners Section */}
      <section id="partners" data-motion-section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-navy relative overflow-hidden">
        {/* Isometric Background */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'url(/manus-storage/partners-bg-isometric_aabc2946.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Section Header */}
          <div data-motion-child className="text-center mb-6 sm:mb-8 md:mb-10">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#FF6B35] sm:text-xs">OPENV GROUP / TECHNOLOGY PARTNERS</p>
            <h2 className="mx-auto max-w-3xl font-manrope text-3xl font-black leading-[1.04] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Our Technology<br className="hidden sm:block" />
              <span style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}}> Partners.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">Active partner relationships that unlock specialist support, technical depth and preferential procurement.</p>
          </div>

          {/* Infinite Partner Marquee */}
          <PartnerMarquee partners={technologyPartners} className="mb-4 sm:mb-6 md:mb-8" />

          {/* View All Button */}
          <div data-motion-child className="text-center">
                          <button
              type="button"
              data-motion-press

              aria-expanded={showAllPartners}
              aria-controls="partners-list"
              onClick={() => setShowAllPartners((current: boolean) => !current)}
              className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 border-2 font-bold tracking-wider text-xs uppercase rounded transition-all"
              style={{borderColor: '#FF6B35', color: '#FF6B35'}}
              onMouseEnter={(e) => {e.currentTarget.style.background = '#FF6B35'; e.currentTarget.style.color = 'white';}}
              onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF6B35';}}
            >
              {showAllPartners ? 'HIDE PARTNERS' : 'VIEW ALL PARTNERS'}
              <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${showAllPartners ? 'rotate-90' : ''}`} />
            </button>
          </div>
          {showAllPartners && (
            <ul id="partners-list" aria-label="Technology partner directory" className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-white/5 p-4 text-center md:text-left sm:grid-cols-3 md:grid-cols-6">
              {technologyPartners.map((partner) => (
                <li key={partner.name} className="rounded-lg border border-white/10 px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                  {partner.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>


      {/* Footer */}
      <footer data-motion-section className="bg-navy border-t border-white/10 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl">
          <div data-motion-child className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-white font-bold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">OpenV Group</h3>
              <p className="text-xs text-white/60">Managed IT. Digital growth. Business software. One accountable South African technology group.</p>
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
                <li className="text-white/45">Gqeberha &amp; Cape Town</li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div data-motion-child className="border-t border-white/10 pt-4 sm:pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white/60 gap-3 sm:gap-4 md:gap-0">
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
