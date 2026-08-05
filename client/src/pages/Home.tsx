import { ArrowRight, Play, Building2, Shield, TrendingUp, Zap, Users, Headphones, Wifi, Lock, BarChart3, Cog, Brain, HelpCircle, Zap as ZapIcon, Target, Monitor, ShoppingCart, DollarSign, BookOpen, Hotel } from 'lucide-react';
import { animateStaggerChildren, animateSlideUp, animateFadeIn, animateScale, initLenisGSAPIntegration, createParallaxEffect, animateHeroHeadline, animateGradientText, animateButtonEntrance, addCardHoverEffect, addIconHoverEffect, addFloatingAnimation, addIconPulseEffect, animateLineReveal, animateEcosystemIcons, addEcosystemIconLift, animateSolutionCards, addSolutionIconHover, addAccentBarAnimation, animateCounter, addLogoHoverEffect, addNavButtonHoverEffect, setupCarouselAutoScroll, addCarouselFadeTransition, addIndustryIconHover, animateIndustryIcons, animatePageLoad, animateSectionTransition, addMicroInteractions, prefersReducedMotion, optimizeElementsForGPU, lazyLoadAnimation, cleanupAnimations } from '@/lib/animations';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import BackToTop from '@/components/BackToTop';
import ContactFormModal from '@/components/ContactFormModal';
import { useLenis } from '@/contexts/LenisContext';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Animation refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBackgroundRef = useRef<HTMLDivElement>(null);
  const heroHeadlineRef = useRef<HTMLDivElement>(null);
  const heroGradientRef = useRef<HTMLSpanElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const watchVideoButtonRef = useRef<HTMLButtonElement>(null);
  const ctaBackgroundRef = useRef<HTMLDivElement>(null);
  const brandCardsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<any>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const swiperRef = useRef<any>(null);
  const partnersCarouselRef = useRef<HTMLDivElement>(null);
  const partnersNavButtonsRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const ecosystemLineRef = useRef<HTMLDivElement>(null);
  const ecosystemIconsRef = useRef<HTMLDivElement>(null);

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

    // Ecosystem animations
    if (ecosystemLineRef.current) animateLineReveal(ecosystemLineRef.current);
    if (ecosystemIconsRef.current) animateEcosystemIcons(ecosystemIconsRef.current);
    
    // Apply ecosystem icon effects
    if (ecosystemRef.current) {
      const icons = ecosystemRef.current.querySelectorAll('[class*="ecosystem-icon"]');
      icons.forEach(icon => {
        addIconPulseEffect(icon as HTMLElement);
        addEcosystemIconLift(icon as HTMLElement);
      });
    }

    // Apply scroll-triggered animations to sections
    if (brandCardsRef.current) animateStaggerChildren(brandCardsRef.current, '[class*="group"]', 0.15);
    if (solutionsRef.current) animateSolutionCards(solutionsRef.current);
    if (solutionsRef.current) animateStaggerChildren(solutionsRef.current, '[class*="text-center"]', 0.1);
    if (partnersRef.current) animateStaggerChildren(partnersRef.current, '[class*="bg-white"]', 0.08);
    // Apply industry icon animations
    if (industriesRef.current) {
      animateIndustryIcons(industriesRef.current);
      const icons = industriesRef.current.querySelectorAll('.industry-icon-container');
      icons.forEach(icon => {
        addIndustryIconHover(icon as HTMLElement);
      });
    }
    // Apply parallax effects to background images
    if (heroBackgroundRef.current) createParallaxEffect(heroBackgroundRef.current, 0.4);
    // CTA section uses CSS backgroundAttachment: 'fixed' for parallax (like Partners section)
    
    // Performance optimization: GPU acceleration for animated elements
    if (!prefersReducedMotion()) {
      const animatedElements = document.querySelectorAll('[class*="animate"], button, a, .ecosystem-icon, .solution-card, .partner-logo, .industry-icon-container');
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

  // Contact form modal state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-navy text-white">
      <Navigation />
      <BackToTop />
      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center pt-32 md:pt-40 pb-48 md:pb-56 lg:pb-64 overflow-hidden bg-navy" style={{opacity: 1}}>
        {/* Static Background with animated globe and connectors */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            ref={heroBackgroundRef}
            className="absolute inset-0 w-full h-full hero-background-animated"
            style={{
              backgroundImage: 'url(/manus-storage/hero-background_85f8ac75.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.7
            }}
            onLoad={(e) => { if (heroBackgroundRef.current) addFloatingAnimation(heroBackgroundRef.current); }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/40 to-navy/60 z-10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20 max-w-7xl">
          <div className="max-w-4xl">


            {/* Headline */}
            <h1 ref={heroHeadlineRef} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-manrope font-black text-white mb-6 md:mb-8 leading-tight tracking-tight">
              <div className="headline-line">Smart technology.</div>
              <div className="headline-line">Seamless solutions.</div>
              <div className="headline-line">
                <span ref={heroGradientRef} style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900', letterSpacing: '-0.02em', backgroundSize: '200% 100%', display: 'inline-block'}}>Stronger business.</span>
              </div>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 mb-8 md:mb-12 max-w-3xl font-light leading-relaxed">
              Three expert brands. One connected ecosystem. All the technology your business needs to operate, grow and thrive.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 pb-20 md:pb-24 lg:pb-32">
              <button ref={exploreButtonRef} className="inline-flex items-center justify-center sm:justify-start w-full sm:w-auto px-6 py-3 text-white font-bold tracking-widest text-xs uppercase rounded transition-colors hover:shadow-lg hover:shadow-orange-500/50" style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)'}}>
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

        {/* Ecosystem Strip Bar */}
        <div ref={ecosystemRef} className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 py-6 md:py-10 z-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="uppercase tracking-widest text-sm sm:text-base md:text-lg font-bold mb-1 md:mb-2 font-manrope" style={{background: 'linear-gradient(to right, #FF6B35, #FF1744)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}}>One Ecosystem. Endless Possibilities.</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Our three brands work together to deliver complete technology solutions.</p>
            </div>
            
            {/* Process Flow with Connectors */}
            <div className="relative">
              {/* Horizontal divider line for desktop */}
              <div ref={ecosystemLineRef} className="hidden lg:block absolute top-6 left-0 right-0 h-px" style={{background: 'linear-gradient(to right, transparent, #FF6B35, #FF1744, transparent)', boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)'}}></div>
              
              <div ref={ecosystemIconsRef} className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 lg:gap-8 relative z-10">
                {[
                  { icon: ZapIcon, label: 'Connect', desc: 'Integrate your existing systems' },
                  { icon: Target, label: 'Engage', desc: 'Digital marketing to reach your audience' },
                  { icon: Monitor, label: 'Manage', desc: 'Business software manages operations' },
                  { icon: Zap, label: 'Automate', desc: 'AI and automation that drives efficiency' },
                  { icon: TrendingUp, label: 'Grow', desc: 'Together we help you scale with confidence' },
                ].map((item, i) => (
                  <div key={i} className="text-center group relative ecosystem-icon">
                    <div className="flex flex-col items-center">
                      <div className="ecosystem-icon w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 transition-all duration-300 shadow-lg" style={{background: 'linear-gradient(135deg, #FF6B35, #FF1744)', border: '1px solid rgba(255, 107, 53, 0.4)', boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)'}}>
                        <item.icon className="w-5 md:w-6 h-5 md:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-navy font-bold mb-1 uppercase tracking-wider text-xs md:text-sm">{item.label}</h3>
                      <p className="text-xs text-gray-600 leading-tight hidden md:block">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="companies" className="py-12 md:py-20 lg:py-32 relative overflow-hidden border-t border-white/5 bg-navy">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16" style={{opacity: 0}} ref={(el) => { if (el) animateFadeIn(el); }}>
            <h2 className="text-white uppercase tracking-widest text-base sm:text-lg md:text-2xl font-bold mb-2 md:mb-4 font-manrope">THREE SPECIALIST BRANDS. <span style={{background: 'linear-gradient(to right, #13C46B, #0F9B6F, #0F1E33)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}}>ONE POWERFUL GROUP.</span></h2>
            <p className="text-white/60 text-xs sm:text-sm">Different expertise. One seamless partnership.</p>
          </div>

          {/* Brand Cards */}
          <div ref={brandCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* OpenV Business - Video */}
            <a href="https://www.openv.co.za/" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-navy-medium/50 rounded-lg backdrop-blur-xl cursor-pointer block" style={{border: '1px solid rgba(255, 107, 53, 0.3)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'}} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.8)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'; }} ref={(el) => { if (el) addCardHoverEffect(el); }}>
              <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                <source src="/manus-storage/OpenV(1)_7faeea8b.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </a>

            {/* NextFour - Video */}
            <a href="https://nextfour.co.za/" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-navy-medium/50 rounded-lg backdrop-blur-xl cursor-pointer block" style={{border: '1px solid rgba(255, 107, 53, 0.3)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'}} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.8)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'; }} ref={(el) => { if (el) addCardHoverEffect(el); }}>
              <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                <source src="/manus-storage/NextFour(3)_1389b015.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </a>

            {/* ShiftBridge - Video */}
            <a href="https://shiftbridge.co.za/" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-navy-medium/50 rounded-lg backdrop-blur-xl cursor-pointer block" style={{border: '1px solid rgba(255, 107, 53, 0.3)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'}} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.8)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'; }} ref={(el) => { if (el) addCardHoverEffect(el); }}>
              <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                <source src="/manus-storage/ShiftBridge(1)_ae346aab.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </a>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-12 md:py-20 lg:py-32 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16" style={{opacity: 0}} ref={(el) => { if (el) animateFadeIn(el); }}>
            <h2 className="text-navy uppercase tracking-widest text-base sm:text-lg md:text-2xl font-bold mb-2 font-manrope">
              ALL THE SOLUTIONS. <span style={{background: 'linear-gradient(to right, #13C46B, #0F9B6F, #0F1E33)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}}>WORKING TOGETHER.</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">From infrastructure to innovation, we've got your business covered.</p>
          </div>

          {/* Solution Icons Grid */}
          <div ref={solutionsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
            {[
              { icon: Wifi, label: 'Infrastructure', desc: 'Networks, connectivity and cloud solutions you can rely on.' },
              { icon: Shield, label: 'Cybersecurity', desc: 'Protecting your data, systems and people.' },
              { icon: TrendingUp, label: 'Digital Growth', desc: 'Websites, marketing and branding that grow your business.' },
              { icon: Cog, label: 'Business Software', desc: 'Smart platforms and automation that drive results.' },
              { icon: Brain, label: 'AI & Automation', desc: 'Intelligent tools that increase productivity and efficiency.' },
              { icon: Headphones, label: 'Support', desc: 'Expert support whenever and wherever you need it.' },
            ].map((item, i) => (
              <div key={i} className="solution-card text-center group" ref={(el) => { if (el) { addAccentBarAnimation(el); const svg = el.querySelector('svg'); if (svg) addSolutionIconHover(svg as unknown as HTMLElement); } }}>
                <item.icon className="solution-icon w-10 md:w-12 h-10 md:h-12 text-navy mx-auto mb-3 md:mb-4 transition-colors" style={{color: '#1f2937'}} onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'} onMouseLeave={(e) => e.currentTarget.style.color = '#1f2937'} />
                <p className="text-xs md:text-sm font-bold text-navy uppercase tracking-wider mb-2">{item.label}</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-3 md:mb-4">{item.desc}</p>
                <div className="accent-bar h-1 rounded-full" style={{background: 'linear-gradient(to right, #FF6B35, #FF1744, #FF6B35)', transformOrigin: 'center'}}></div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 text-white font-bold tracking-widest text-xs uppercase rounded transition-colors hover:shadow-lg hover:shadow-orange-500/50" style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)'}}>
              VIEW ALL SOLUTIONS
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
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
          <Carousel ref={(el) => { carouselRef.current = el; }} className="w-full mb-8 md:mb-12" opts={{ align: 'center', loop: true, slidesToScroll: 1 }}>
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
                  <div className="flex items-center justify-center h-24 md:h-32 transition-all duration-300" ref={(el) => { if (el) addLogoHoverEffect(el); }}>
                    <img src={partner.logo} alt={partner.name} className="max-h-20 md:max-h-28 max-w-full object-contain" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16" ref={(el) => { if (el) addNavButtonHoverEffect(el); }} />
            <CarouselNext className="hidden md:flex -right-12 lg:-right-16" ref={(el) => { if (el) addNavButtonHoverEffect(el); }} />
          </Carousel>

          {/* View All Button */}
          <div className="text-center" ref={partnersNavButtonsRef}>
            <button className="inline-flex items-center px-6 py-3 border-2 font-bold tracking-widest text-xs uppercase rounded transition-all" style={{borderColor: '#FF6B35', color: '#FF6B35'}} onMouseEnter={(e) => {e.currentTarget.style.background = '#FF6B35'; e.currentTarget.style.color = 'white';}} onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF6B35';}}>
              VIEW ALL PARTNERS
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-12 md:py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16" style={{opacity: 0}} ref={(el) => { if (el) animateFadeIn(el); }}>
            <h2 className="text-navy uppercase tracking-widest text-base sm:text-lg md:text-2xl font-bold mb-2 md:mb-4 font-manrope">Solutions For Every Industry</h2>
            <p className="text-gray-600 text-xs sm:text-sm">Technology that understands your industry and drives your success.</p>
          </div>

          {/* Industry Icons Grid */}
          <div ref={industriesRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 md:gap-6 lg:gap-8">
            {[
              { image: '/manus-storage/icon-manufacturing-3d_ed5d4a90.png', label: 'Manufacturing' },
              { image: '/manus-storage/icon-healthcare-3d_2f2b24b0.png', label: 'Healthcare' },
              { image: '/manus-storage/icon-professional-services-3d_33ae95a0.png', label: 'Professional Services' },
              { image: '/manus-storage/icon-construction-3d_904a266f.png', label: 'Construction' },
              { image: '/manus-storage/icon-retail-3d_df5ed49f.png', label: 'Retail' },
              { image: '/manus-storage/icon-financial-services-3d_211e4de2.png', label: 'Financial Services' },
              { image: '/manus-storage/icon-education-3d_a1e06121.png', label: 'Education' },
              { image: '/manus-storage/icon-hospitality-3d_c6ac832e.png', label: 'Hospitality' },
            ].map((item, i) => (
              <div key={i} className="text-center industry-icon-container" style={{opacity: 0}}>
                <div className="industry-icon-wrapper relative inline-block mb-3 md:mb-4 cursor-pointer group">
                  <img src={item.image} alt={item.label} className="w-16 md:w-20 h-16 md:h-20 object-contain" />
                  <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 rounded-lg transition-colors duration-300"></div>
                </div>
                <p className="text-xs md:text-sm font-bold text-gray-700 uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-12 md:py-20 lg:py-32 bg-navy relative overflow-hidden">
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
            <h2 className="text-white uppercase tracking-widest text-base sm:text-lg md:text-2xl font-bold mb-2 md:mb-4 font-manrope">Ready to transform your business?</h2>
            <p className="text-white/70 text-xs sm:text-sm">Book us for team loyalty and discover how Open V Group can do more with your technology. Businesses across South Africa trust us.</p>
          </div>

          {/* CTA Button */}
          <div className="text-center" ref={ctaRef}>
            <button onClick={() => setIsContactModalOpen(true)} className="inline-flex items-center px-6 py-3 border-2 font-bold tracking-widest text-xs uppercase rounded transition-all" style={{borderColor: '#FF6B35', color: '#FF6B35'}} onMouseEnter={(e) => {e.currentTarget.style.background = '#FF6B35'; e.currentTarget.style.color = 'white';}} onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF6B35'}}>
              BOOK A CONSULTATION
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy border-t border-white/10 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-white font-bold mb-3 md:mb-4 text-sm md:text-base">OpenV Group</h3>
              <p className="text-xs md:text-sm text-white/60">Three expert brands. One connected ecosystem. Empowering businesses across South Africa.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
              <ul className="space-y-2 text-xs md:text-sm text-white/60">
                <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Solutions</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Our Companies */}
            <div>
              <h4 className="text-white font-bold mb-3 md:mb-4 text-sm md:text-base">Our Companies</h4>
              <ul className="space-y-2 text-xs md:text-sm text-white/60">
                <li><a href="#" className="hover:text-orange-400 transition-colors">OpenV Business Solutions</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">NextFour</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">ShiftBridge</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-3 md:mb-4 text-sm md:text-base">Contact</h4>
              <ul className="space-y-2 text-xs md:text-sm text-white/60">
                <li><a href="tel:0413790550" className="hover:text-orange-400 transition-colors">041 379 0550</a></li>
                <li><a href="mailto:info@openv.co.za" className="hover:text-orange-400 transition-colors">info@openv.co.za</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-white/60 gap-4 md:gap-0">
            <p>&copy; 2025 OpenV Group. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      <ContactFormModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}
