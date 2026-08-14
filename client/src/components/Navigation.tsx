import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { createScrollProgressIndicator, animateMobileMenuOpen, animateMobileMenuClose } from '@/lib/animations';
import { useContactForm } from '@/contexts/ContactFormContext';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#companies');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { openContactForm } = useContactForm();

  const navLinks = [
    { label: 'Our Companies', href: '#companies' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Partners', href: '#partners' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    // Create scroll progress indicator
    createScrollProgressIndicator();

    // Track active section on scroll
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100;

      navLinks.forEach(link => {
        const section = document.querySelector(link.href);
        if (!section) return;

        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(link.href);
        }
      });
    };

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      animateMobileMenuOpen(mobileMenuRef.current);
    } else if (!mobileMenuOpen && mobileMenuRef.current) {
      animateMobileMenuClose(mobileMenuRef.current);
    }
  }, [mobileMenuOpen]);

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10" style={{backgroundColor: '#F8FAFC'}}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl py-3 sm:py-4 flex items-center justify-between">
        {/* Logo - Left */}
        <a href="/" className="flex-shrink-0">
          <img src="/manus-storage/OpenVGroupLogo(1)_a1e90051.png" alt="OpenV Group" className="h-14 sm:h-16 md:h-20 w-auto" />
        </a>

        {/* Desktop Navigation - Center */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                if (link.label === 'Contact') {
                  openContactForm();
                } else {
                  const element = document.querySelector(link.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className={`relative text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors py-1 px-2 bg-none border-none cursor-pointer ${
                activeSection === link.href ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {link.label}
              <span 
                className="nav-underline absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 origin-left" 
                style={{transform: activeSection === link.href ? 'scaleX(1)' : 'scaleX(0)'}}
              ></span>
            </button>
          ))}
        </nav>

        {/* Desktop CTA - Right */}
        <div className="hidden lg:flex items-center flex-shrink-0">
          <button data-motion-press onClick={openContactForm} className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-white font-bold tracking-wider text-xs uppercase rounded transition-colors hover:shadow-lg hover:shadow-orange-500/50" style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)'}}> 
            BOOK A CONSULTATION
          </button>
        </div>

        {/* Mobile Menu Toggle - Right */}
        <button
          className="lg:hidden transition-colors p-2 hover:bg-gray-100 rounded-lg" style={{color: '#4b5563'}}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav ref={mobileMenuRef} className="lg:hidden border-t px-3 sm:px-4 py-4 sm:py-6" style={{backgroundColor: '#f0f0f0', borderColor: '#d1d1d1'}}>
          <div className="space-y-2 sm:space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  handleMobileMenuClose();
                  if (link.label === 'Contact') {
                    openContactForm();
                  } else {
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                    setActiveSection(link.href);
                  }
                }}
                className={`block w-full text-left text-sm sm:text-base font-bold tracking-wider uppercase py-3 px-2 border-b border-white/5 transition-colors bg-none border-none cursor-pointer hover:bg-white/50 rounded ${
                  activeSection === link.href ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button data-motion-press onClick={() => { handleMobileMenuClose(); openContactForm(); }} className="w-full mt-4 inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-white font-bold tracking-wider text-xs uppercase rounded transition-colors hover:shadow-lg hover:shadow-orange-500/50" style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)'}}> 
              BOOK A CONSULTATION
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
