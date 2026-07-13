import { ArrowRight, Play, Building2, Shield, TrendingUp, Zap, Users, Headphones, Wifi, Lock, BarChart3, Cog, Brain, HelpCircle, Zap as ZapIcon, Target, Monitor, ShoppingCart, DollarSign, BookOpen, Hotel } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-navy text-white">
      <Navigation />
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-navy/40 z-10"></div>
          <img 
            src="/manus-storage/hero-background_85f8ac75.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20 max-w-7xl">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold tracking-widest uppercase">
                Welcome to OpenV Group
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-manrope font-extrabold text-white mb-8 leading-tight">
              Smart technology.<br />
              Seamless solutions.<br />
              <span className="text-green-500">Stronger business.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl">
              Three expert brands. One connected ecosystem. All the technology your business needs to operate, grow and thrive.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-6">
              <button className="inline-flex items-center px-6 py-3 bg-green-500 text-navy font-bold tracking-widest text-xs uppercase rounded hover:bg-green-600 transition-colors">
                EXPLORE THE GROUP
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button className="inline-flex items-center text-white font-bold tracking-widest text-xs uppercase hover:text-green-400 transition-colors">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mr-4 hover:border-green-500 transition-colors">
                  <Play className="w-5 h-5 text-green-500 ml-1" />
                </div>
                WATCH VIDEO
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-navy-medium/90 to-navy-medium/40 backdrop-blur-md border-t border-white/5 py-12 z-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="flex items-center space-x-4">
                <Building2 className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <span className="text-3xl font-manrope font-bold text-white block">20+</span>
                  <span className="text-xs font-bold tracking-widest text-white/40 uppercase leading-tight">Years in<br />South Africa</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Users className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <span className="text-3xl font-manrope font-bold text-white block">45</span>
                  <span className="text-xs font-bold tracking-widest text-white/40 uppercase leading-tight">ICT<br />Professionals</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Users className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <span className="text-3xl font-manrope font-bold text-white block">8</span>
                  <span className="text-xs font-bold tracking-widest text-white/40 uppercase leading-tight">Corporate<br />Partners</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Building2 className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <span className="text-3xl font-manrope font-bold text-white block">3</span>
                  <span className="text-xs font-bold tracking-widest text-white/40 uppercase leading-tight">Integrated<br />Brands</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="companies" className="py-20 md:py-32 bg-navy border-t border-white/5">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-white uppercase tracking-widest text-xs font-bold mb-2">THREE SPECIALIST BRANDS. <span className="text-green-500">ONE POWERFUL GROUP.</span></h2>
            <p className="text-white/60 text-sm">Different expertise. One seamless partnership.</p>
          </div>

          {/* Brand Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* OpenV Business */}
            <div className="group relative overflow-hidden bg-navy-medium/50 border border-green-500/15 rounded-lg p-8 backdrop-blur-xl hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-3">
              <div className="absolute inset-0 opacity-30">
                <img src="/manus-storage/openv-business-card_c98957d4.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10 mb-8 h-10">
                <div className="text-white font-bold text-lg">OpenV Business</div>
              </div>
              <h3 className="relative z-10 text-xl font-bold mb-4 text-white">Managed IT & Cybersecurity</h3>
              <p className="relative z-10 text-sm text-white/70 mb-8">Reliable infrastructure, secure networks and expert support that keeps your business running at its best.</p>
              <a href="#" className="relative z-10 text-xs font-bold tracking-widest text-green-500 uppercase flex items-center hover:underline">
                EXPLORE OPENV
                <ArrowRight className="ml-2 w-3 h-3" />
              </a>
            </div>

            {/* NextFour */}
            <div className="group relative overflow-hidden bg-navy-medium/50 border border-green-500/15 rounded-lg p-8 backdrop-blur-xl hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-3">
              <div className="absolute inset-0 opacity-30">
                <img src="/manus-storage/nextfour-card_9955f2a7.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10 mb-8 h-10">
                <div className="text-white font-bold text-lg">NextFour</div>
              </div>
              <h3 className="relative z-10 text-xl font-bold mb-4 text-white">Digital Marketing & Web Solutions</h3>
              <p className="relative z-10 text-sm text-white/70 mb-8">Websites, marketing, SEO, ads and branding that attract attention and drive growth.</p>
              <a href="#" className="relative z-10 text-xs font-bold tracking-widest text-green-500 uppercase flex items-center hover:underline">
                EXPLORE NEXTFOUR
                <ArrowRight className="ml-2 w-3 h-3" />
              </a>
            </div>

            {/* ShiftBridge */}
            <div className="group relative overflow-hidden bg-navy-medium/50 border border-green-500/15 rounded-lg p-8 backdrop-blur-xl hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-3">
              <div className="absolute inset-0 opacity-30">
                <img src="/manus-storage/shiftbridge-card_1201b067.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10 mb-8 h-10">
                <div className="text-white font-bold text-lg">ShiftBridge</div>
              </div>
              <h3 className="relative z-10 text-xl font-bold mb-4 text-white">Business Software & Automation</h3>
              <p className="relative z-10 text-sm text-white/70 mb-8">Powerful CRM and business platforms that streamline operations and boost productivity.</p>
              <a href="#" className="relative z-10 text-xs font-bold tracking-widest text-green-500 uppercase flex items-center hover:underline">
                EXPLORE SHIFTBRIDGE
                <ArrowRight className="ml-2 w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 md:py-32 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-navy uppercase tracking-widest text-xs font-bold mb-2">
              ALL THE SOLUTIONS. <span className="text-green-500">WORKING TOGETHER.</span>
            </h2>
            <p className="text-gray-600 text-sm">From infrastructure to innovation, we've got your business covered.</p>
          </div>

          {/* Solution Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            {[
              { icon: Wifi, label: 'Infrastructure' },
              { icon: Shield, label: 'Cybersecurity' },
              { icon: TrendingUp, label: 'Digital Growth' },
              { icon: Cog, label: 'Business Software' },
              { icon: Brain, label: 'AI & Automation' },
              { icon: Headphones, label: 'Support' },
            ].map((item, i) => (
              <div key={i} className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors">
                  <item.icon className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-sm font-bold text-navy uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-500 font-bold tracking-widest text-xs uppercase rounded hover:bg-green-500 hover:text-navy transition-colors">
              VIEW ALL SOLUTIONS
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="py-20 md:py-32 bg-navy">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-green-500 uppercase tracking-widest text-xs font-bold mb-4">One Ecosystem. Endless Possibilities.</h2>
            <p className="text-white/70">Our three brands work together to deliver complete technology solutions.</p>
          </div>

          {/* Process Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { icon: ZapIcon, label: 'Connect', desc: 'Integrate your existing systems' },
              { icon: Target, label: 'Engage', desc: 'Digital marketing to reach your audience' },
              { icon: Monitor, label: 'Manage', desc: 'Business software manages operations' },
              { icon: Zap, label: 'Automate', desc: 'AI and automation that drives efficiency' },
              { icon: TrendingUp, label: 'Grow', desc: 'Together we help you scale with confidence' },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors">
                  <item.icon className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="text-white font-bold mb-2 uppercase tracking-wider text-sm">{item.label}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 md:py-32 bg-navy">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-white uppercase tracking-widest text-xs font-bold mb-4">Our Technology Partners</h2>
            <p className="text-white/70">World-class brands. Strategic partnerships. Real results.</p>
          </div>

          {/* Partner Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-12 items-center">
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
              <div key={i} className="bg-white/10 border border-white/10 rounded-lg p-6 flex items-center justify-center h-24 hover:border-green-500/50 transition-colors group">
                <img src={partner.logo} alt={partner.name} className="max-h-16 max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-500 font-bold tracking-widest text-xs uppercase rounded hover:bg-green-500 hover:text-navy transition-colors">
              VIEW ALL PARTNERS
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 md:py-32 bg-navy">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-white uppercase tracking-widest text-xs font-bold mb-4">Solutions For Every Industry</h2>
            <p className="text-white/70">Technology that understands your industry and drives your success.</p>
          </div>

          {/* Industry Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {[
              { icon: Building2, label: 'Manufacturing' },
              { icon: HelpCircle, label: 'Healthcare' },
              { icon: Users, label: 'Professional Services' },
              { icon: Building2, label: 'Construction' },
              { icon: ShoppingCart, label: 'Retail' },
              { icon: DollarSign, label: 'Financial Services' },
              { icon: BookOpen, label: 'Education' },
              { icon: Hotel, label: 'Hospitality' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <item.icon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-sm font-bold text-white/70 uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/manus-storage/cta-section-background_582c596e.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 opacity-85"></div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to transform your business?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Book us for team loyalty and discover how Open V Group can do more with your technology. Businesses across South Africa trust us.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-bold tracking-widest text-sm uppercase rounded hover:bg-white/90 transition-colors">
                BOOK A CONSULTATION
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <a href="tel:0413790550" className="text-white font-bold tracking-widest text-sm">
                📞 041 379 0550
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy border-t border-white/10 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-white font-bold mb-4">OpenV Group</h3>
              <p className="text-sm text-white/60">Three expert brands. One connected ecosystem. Empowering businesses across South Africa.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-green-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Solutions</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Our Companies */}
            <div>
              <h4 className="text-white font-bold mb-4">Our Companies</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-green-500 transition-colors">OpenV Business Solutions</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">NextFour</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">ShiftBridge</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="tel:0413790550" className="hover:text-green-500 transition-colors">041 379 0550</a></li>
                <li><a href="mailto:info@openv.co.za" className="hover:text-green-500 transition-colors">info@openv.co.za</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <p>&copy; 2025 OpenV Group. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-500 transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
