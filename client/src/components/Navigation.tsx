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
    <header className="fixed top-0 left-0 w-full z-50 bg-navy/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 max-w-7xl py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center bg-gray-200/20 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-gray-200/30 transition-colors">
          <img src="/manus-storage/OpenVGrouplogotransparent_0e3dcb89.svg" alt="OpenV Group" className="h-8 w-auto" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-bold tracking-widest text-white/70 hover:text-white uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold tracking-widest text-xs uppercase rounded hover:from-orange-600 hover:to-red-600 transition-colors">
            BOOK A CONSULTATION
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white/70 hover:text-orange-500 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-navy/95 backdrop-blur-xl border-t border-white/10 px-4 py-6">
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
            <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold tracking-widest text-xs uppercase rounded hover:from-orange-600 hover:to-red-600 transition-colors">
              BOOK A CONSULTATION
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
