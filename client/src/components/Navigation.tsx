import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Our Companies', href: '#companies' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Industries', href: '#industries' },
    { label: 'Partners', href: '#partners' },
    { label: 'Insights', href: '#insights' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10" style={{backgroundColor: '#dbdbdb'}}>
      <div className="container mx-auto px-4 max-w-7xl py-4 flex items-center">
        {/* Logo - Left */}
        <a href="/" className="flex-shrink-0">
          <img src="/manus-storage/OpenVGrouplogotransparent_0e3dcb89.svg" alt="OpenV Group" className="h-8 w-auto" />
        </a>

        {/* Desktop Navigation - Center */}
        <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-bold tracking-widest uppercase transition-colors hover:text-gray-800" style={{color: '#4b5563'}}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA - Right */}
        <div className="hidden lg:flex items-center flex-shrink-0">
          <button className="px-6 py-2 text-white font-bold tracking-widest text-xs uppercase rounded transition-colors" style={{background: 'linear-gradient(135deg, #13C46B 0%, #1B8EFF 50%, #6B5B95 100%)'}}> 
            BOOK A CONSULTATION
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden transition-colors" style={{color: '#4b5563'}}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t px-4 py-6" style={{backgroundColor: '#f0f0f0', borderColor: '#d1d1d1'}}>
          <div className="space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm font-bold tracking-widest text-white/70 hover:text-white uppercase py-2 border-b border-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="w-full mt-4 px-6 py-3 text-white font-bold tracking-widest text-xs uppercase rounded transition-colors" style={{background: 'linear-gradient(135deg, #13C46B 0%, #1B8EFF 50%, #6B5B95 100%)'}}> 
              BOOK A CONSULTATION
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
