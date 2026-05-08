import React, { useState } from 'react';
import { Menu, X, Globe, Phone, Mail, Instagram, Linkedin, ArrowRight, Building2, TrendingUp, Home, CheckCircle2 } from 'lucide-react';
import AiImage from './components/AiImage';
import PropertyCard from './components/PropertyCard';
import Concierge from './components/Concierge';
import { Property } from './types';

// Constants
const FEATURED_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Azure Penthouse',
    location: 'Miami, FL',
    price: '$12,500,000',
    specs: '4 Beds | 5.5 Baths | 4,200 sqft',
    description: 'Ultra-luxury oceanfront penthouse with panoramic views, private elevator, and wraparound terrace.',
    imagePrompt: 'ultra modern luxury penthouse living room overlooking miami ocean sunset, floor to ceiling windows, white marble floors, sleek black furniture, gold accents',
    type: 'Residential'
  },
  {
    id: '2',
    title: 'Beacon Hill Brownstone',
    location: 'Boston, MA',
    price: '$6,250,000',
    specs: '5 Beds | 4 Baths | 3,800 sqft',
    description: 'Historically significant brownstone renovated with modern amenities while preserving original architectural charm.',
    imagePrompt: 'historic boston brownstone exterior street view, luxury entrance, gas lantern, sunset, autumn leaves, red brick, elegant, warm lighting',
    type: 'Residential'
  },
  {
    id: '3',
    title: 'TechHub Workspace',
    location: 'Detroit, MI',
    price: '$18/sqft NNN',
    specs: '15,000 sqft | Class A Office',
    description: 'Modern industrial office space in the heart of Detroit, perfect for scaling tech startups.',
    imagePrompt: 'modern industrial office lobby detroit, exposed brick, glass walls, concrete floors, gold accent furniture, high tech lighting',
    type: 'Commercial'
  },
  {
    id: '4',
    title: 'Newport Cliff Estate',
    location: 'Newport, RI',
    price: '$24,000,000',
    specs: '9 Beds | 11 Baths | 12,500 sqft',
    description: 'Gilded Age inspired estate on the Cliff Walk with direct ocean access and expansive manicured gardens.',
    imagePrompt: 'grand luxury estate mansion newport rhode island cliff walk ocean view, manicured gardens, sunset, architectural masterpiece, cinematic, golden hour',
    type: 'Investment'
  }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Residential' | 'Commercial' | 'Investment'>('All');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  const filteredProperties = activeTab === 'All' 
    ? FEATURED_PROPERTIES 
    : FEATURED_PROPERTIES.filter(p => p.type === activeTab);

  const navigateTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (id) {
      history.replaceState(null, '', `#${id}`);
    }
  };

  const openContact = (prefill?: string) => {
    setMobileMenuOpen(false);
    setContactMessage(prefill ?? '');
    setContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-gold selection:text-black pb-24 md:pb-0">
      
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center space-x-3">
               <div className="h-14 w-14 overflow-hidden rounded-full border border-brand-gold/20">
                 <img
                   src="/logo.png"
                   alt="Logo"
                   className="h-full w-full object-cover"
                 />
               </div>
               <div className="flex flex-col">
                 <div className="text-xl font-serif font-bold tracking-tight text-white leading-none">
                   OCEAN LUXE
                 </div>
                 <div className="flex items-center justify-between w-full mt-1">
                   <div className="h-[1px] bg-brand-gold w-3"></div>
                   <span className="text-[0.6rem] tracking-[0.2em] text-brand-gold font-sans uppercase">Real Estate</span>
                   <div className="h-[1px] bg-brand-gold w-3"></div>
                 </div>
               </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => navigateTo('home')} className="text-sm font-medium hover:text-brand-gold transition-colors">Home</button>
              <button onClick={() => navigateTo('buy')} className="text-sm font-medium hover:text-brand-gold transition-colors">Buy</button>
              <button onClick={() => navigateTo('invest')} className="text-sm font-medium hover:text-brand-gold transition-colors">Invest</button>
              <button onClick={() => navigateTo('sell')} className="text-sm font-medium hover:text-brand-gold transition-colors">Sell</button>
              <button onClick={() => navigateTo('markets')} className="text-sm font-medium hover:text-brand-gold transition-colors">Markets</button>
              <button onClick={() => navigateTo('about')} className="text-sm font-medium hover:text-brand-gold transition-colors">About</button>
              <button onClick={() => openContact()} className="text-sm font-medium hover:text-brand-gold transition-colors">Contact</button>
              <button onClick={() => navigateTo('portal')} className="bg-white text-black px-6 py-2 rounded-sm text-sm font-bold hover:bg-brand-gold hover:text-black transition-all duration-300 uppercase tracking-wide">
                Sign In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 w-full bg-black border-b border-white/10 p-4 flex flex-col space-y-4">
             <button className="text-lg font-medium text-left" onClick={() => navigateTo('home')}>Home</button>
             <button className="text-lg font-medium text-left" onClick={() => navigateTo('buy')}>Buy</button>
             <button className="text-lg font-medium text-left" onClick={() => navigateTo('invest')}>Invest</button>
             <button className="text-lg font-medium text-left" onClick={() => navigateTo('sell')}>Sell</button>
             <button className="text-lg font-medium text-left" onClick={() => navigateTo('markets')}>Markets</button>
             <button className="text-lg font-medium text-left" onClick={() => navigateTo('about')}>About</button>
             <button className="text-lg font-medium text-left" onClick={() => openContact()}>Contact</button>
             <button onClick={() => navigateTo('portal')} className="bg-brand-gold text-black w-full py-3 rounded-sm text-lg font-bold uppercase">Sign In</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen w-full flex items-center justify-center pt-28 md:pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="/logo.png"
            alt="Hero Background"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <p className="text-brand-gold uppercase tracking-[0.3em] text-sm font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Coastal Luxury • Investment-Grade Real Estate
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold mb-6 text-white leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            Coastal Luxury <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold/50 to-white">& Investment-Grade</span> Real Estate
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Ocean Luxe Estates connects you to curated residential, commercial, and multi-family opportunities across Rhode Island, Massachusetts, Florida, and Michigan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <button onClick={() => navigateTo('buy')} className="bg-brand-gold text-black px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              Browse Properties
            </button>
            <button onClick={() => openContact('I’d like to talk to an advisor about buying, selling, or investing.')} className="bg-transparent border border-white text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all">
              Talk to an Advisor
            </button>
          </div>
        </div>
      </section>

      <section id="markets" className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">Featured <span className="text-brand-gold">Markets</span></h2>
              <p className="text-gray-400 max-w-2xl">
                Local insight with a national standard of execution.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Rhode Island', note: 'Coastal legacy • Newport • Providence' },
              { name: 'Massachusetts', note: 'Brownstones • New construction • Boston' },
              { name: 'Florida', note: 'Oceanfront • Luxury condos • Miami' },
              { name: 'Michigan', note: 'Industrial growth • Detroit' }
            ].map((m) => (
              <button
                key={m.name}
                onClick={() => openContact(`I’m interested in opportunities in ${m.name}.`)}
                className="text-left bg-brand-darkgray border border-white/10 p-8 hover:border-brand-gold/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-serif text-white">{m.name}</h3>
                  <ArrowRight className="w-5 h-5 text-brand-gold" />
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{m.note}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About / Stackk Cloud Section */}
      <section id="about" className="py-24 bg-brand-darkgray relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-px w-10 bg-brand-gold"></div>
                <span className="text-brand-gold uppercase tracking-widest text-sm font-bold">Clarity. Discretion. Performance.</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Integrity in Every <br/> Transaction.
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Ocean Luxe Estates is built for buyers, sellers, and investors who expect a premium experience and decisive execution. We deliver curated opportunities, market intelligence, and end-to-end representation.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Backed by <span className="text-white font-bold">Stackk Cloud</span> and powered by <span className="text-white font-bold">Oretha AI</span>, our process stays fast, accountable, and built to scale.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Curated inventory and vetted opportunities',
                  'Market analysis for lifestyle and ROI',
                  'Negotiation, diligence, and closing support',
                  'Long-term portfolio strategy and management'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-white">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand-gold"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-brand-gold"></div>
              <AiImage 
                prompt="modern sleek skyscraper architecture detail black and gold, upward angle, cinematic, luxury" 
                alt="Architecture" 
                className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                fallbackSrc="/logo.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="buy" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">Browse <span className="text-brand-gold">Properties</span></h2>
              <p className="text-gray-400 max-w-xl">
                Curated listings across residential, commercial, and investment assets.
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex space-x-2 mt-6 md:mt-0">
              {['All', 'Residential', 'Commercial', 'Investment'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? 'bg-brand-gold text-black' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onInquire={(p) => setSelectedProperty(p)} 
                fallbackSrc={new URL('./download (7).png', import.meta.url).href}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button onClick={() => openContact('I’d like access to additional inventory and off-market opportunities.')} className="inline-flex items-center text-white border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors group">
              <span className="text-lg mr-2">Request Off-Market Inventory</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <section id="invest" className="py-24 bg-brand-darkgray border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-px w-10 bg-brand-gold"></div>
                <span className="text-brand-gold uppercase tracking-widest text-sm font-bold">Invest</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Serious analysis for <br /> serious investors.
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed max-w-xl">
                Identify high-quality opportunities across multi-family, mixed-use, and select commercial assets. Move with confidence—backed by underwriting support and disciplined execution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => openContact('I’d like to discuss investment opportunities (multi-family, commercial, or portfolio strategy).')} className="bg-brand-gold text-black px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-white transition-all">
                  Talk to an Advisor
                </button>
                <button onClick={() => navigateTo('buy')} className="bg-transparent border border-white text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all">
                  View Opportunities
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand-gold"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-brand-gold"></div>
              <AiImage
                prompt="luxury real estate investment meeting, modern boardroom, skyline at dusk, black and gold color palette, cinematic lighting, high-end editorial"
                alt="Investment"
                className="w-full h-[520px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                fallbackSrc="/logo.png"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="sell" className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand-gold"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-brand-gold"></div>
              <AiImage
                prompt="luxury home exterior at golden hour, editorial real estate photography, coastal modern architecture, black and gold accents, cinematic"
                alt="Sell"
                className="w-full h-[520px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                fallbackSrc="/logo.png"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-px w-10 bg-brand-gold"></div>
                <span className="text-brand-gold uppercase tracking-widest text-sm font-bold">Sell</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Marketed like a brand. <br /> Negotiated like an asset.
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed max-w-xl">
                Pricing strategy, premium presentation, targeted outreach, and clean process management—built to protect value and reduce friction from listing to close.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => openContact('I’d like to sell a property. Please share next steps for pricing and marketing.')} className="bg-brand-gold text-black px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-white transition-all">
                  Request a Valuation
                </button>
                <button onClick={() => openContact('I’d like to discuss listing strategy and timelines.')} className="bg-transparent border border-white text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all">
                  Listing Strategy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-brand-darkgray border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-serif font-bold mb-4">How It Works</h2>
             <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                title: "Discover",
                desc: "Curated inventory, market intelligence, and targeted sourcing aligned to your goals."
              },
              {
                icon: Building2,
                title: "Analyze",
                desc: "Diligence, underwriting support, and a clear plan—built for confident decisions."
              },
              {
                icon: TrendingUp,
                title: "Close",
                desc: "Negotiation and execution through contract, financing, and closing coordination."
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-black p-10 border border-white/5 hover:border-brand-gold/50 transition-colors group">
                <service.icon className="w-12 h-12 text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-serif font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portal" className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">Agent & Partner <span className="text-brand-gold">Portal</span></h2>
              <p className="text-gray-400 max-w-2xl">
                One sign-in hub for agents, partners, and staff. Choose your workspace to continue.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'CRM', desc: 'Deals, clients, pipelines, and communications.', url: 'https://crm.oceanluxe.org' },
              { name: 'XP', desc: 'Training, playbooks, and performance systems.', url: 'https://xp.oceanluxe.org' },
              { name: 'HR', desc: 'Internal tools for staff and operations.', url: 'https://hr.oceanluxe.org' }
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                className="bg-brand-darkgray border border-white/10 p-8 hover:border-brand-gold/50 transition-colors block"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-serif text-white">{p.name}</h3>
                  <ArrowRight className="w-5 h-5 text-brand-gold" />
                </div>
                <p className="text-gray-400 leading-relaxed">{p.desc}</p>
                <p className="text-xs text-gray-500 mt-6 uppercase tracking-widest">{p.url.replace('https://', '')}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="trust" className="py-24 bg-brand-darkgray border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Trust & Results</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: 'White-glove service from the first call to closing. Clear, decisive, and always professional.', name: 'Client Experience' },
              { quote: 'The team brought structure, speed, and real market intelligence. Exactly what we needed.', name: 'Investment Advisory' },
              { quote: 'High standards, strong communication, and a process that feels premium end-to-end.', name: 'Seller Representation' }
            ].map((t) => (
              <div key={t.name} className="bg-black border border-white/10 p-10">
                <p className="text-gray-200 font-light leading-relaxed text-lg mb-8">“{t.quote}”</p>
                <div className="h-px w-12 bg-brand-gold mb-4"></div>
                <p className="text-sm uppercase tracking-widest text-gray-400">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-gold">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-black via-brand-gold/80 to-black opacity-90"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
            Ready to Elevate Your Portfolio?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Whether you are buying, selling, or investing, Ocean Luxe Estates delivers clarity, discretion, and high-performance execution.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => openContact('I’d like to start a conversation about buying, selling, or investing.')} className="bg-white text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all shadow-xl rounded-sm">
              Talk to an Advisor
            </button>
            <button onClick={() => navigateTo('portal')} className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all rounded-sm">
              Access Portal
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-3xl font-serif font-bold text-white mb-6">
                OCEAN LUXE <span className="text-brand-gold">ESTATES</span>
              </h3>
              <p className="text-gray-400 mb-6 max-w-sm">
                Luxury and investment-grade real estate across Rhode Island, Massachusetts, Florida, and Michigan.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => navigateTo('buy')} className="hover:text-brand-gold transition-colors">Buy</button></li>
                <li><button onClick={() => navigateTo('invest')} className="hover:text-brand-gold transition-colors">Invest</button></li>
                <li><button onClick={() => navigateTo('sell')} className="hover:text-brand-gold transition-colors">Sell</button></li>
                <li><button onClick={() => navigateTo('markets')} className="hover:text-brand-gold transition-colors">Markets</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:text-brand-gold transition-colors">About</button></li>
                <li><button onClick={() => openContact()} className="hover:text-brand-gold transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Portals</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="https://crm.oceanluxe.org" className="hover:text-brand-gold transition-colors">CRM</a></li>
                <li><a href="https://xp.oceanluxe.org" className="hover:text-brand-gold transition-colors">XP</a></li>
                <li><a href="https://hr.oceanluxe.org" className="hover:text-brand-gold transition-colors">HR</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><Phone className="w-4 h-4 mr-2 text-brand-gold"/> +1 (800) LUXE-EST</li>
                <li className="flex items-center"><Mail className="w-4 h-4 mr-2 text-brand-gold"/> info@oceanluxe.org</li>
                <li className="flex items-center"><Globe className="w-4 h-4 mr-2 text-brand-gold"/> oceanluxe.org</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Ocean Luxe Estates. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
               <span className="flex items-center gap-2">
                 Powered by <span className="font-bold text-gray-300">Stackk Cloud</span> & <span className="font-bold text-gray-300">Oretha AI</span>
               </span>
               <a href="/privacy.html" className="hover:text-white">Privacy</a>
               <a href="/terms.html" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button onClick={() => navigateTo('buy')} className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-sm font-bold uppercase tracking-wider">
            Search
          </button>
          <a href="tel:+18005893378" className="flex-1 bg-brand-gold text-black py-3 rounded-sm font-bold uppercase tracking-wider text-center">
            Call
          </a>
          <button onClick={() => setMobileMenuOpen(true)} className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-sm font-bold uppercase tracking-wider">
            Menu
          </button>
        </div>
      </div>

      {/* AI Concierge Component */}
      <Concierge />
      
      {selectedProperty && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-black border border-white/10 max-w-3xl w-full mx-4 rounded-sm overflow-hidden">
            <div className="h-72 w-full relative">
              <AiImage
                prompt={selectedProperty.imagePrompt}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
                fallbackSrc={new URL('./download (7).png', import.meta.url).href}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-serif text-white">{selectedProperty.title}</h3>
                  <p className="text-gray-400">{selectedProperty.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl text-brand-gold">{selectedProperty.price}</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6">{selectedProperty.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wider">{selectedProperty.specs}</span>
                <div className="flex gap-3">
                  <button onClick={() => { setSelectedProperty(null); openContact(`I’m interested in ${selectedProperty.title} (${selectedProperty.location}). Please share next steps.`); }} className="bg-brand-gold text-black px-4 py-2 rounded-sm font-bold uppercase">
                    Inquire
                  </button>
                  <button onClick={() => setSelectedProperty(null)} className="border border-white text-white px-4 py-2 rounded-sm">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {contactOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-black border border-white/10 max-w-lg w-full mx-4 rounded-sm p-6">
            <h3 className="text-2xl font-serif text-white mb-4">Start a Conversation</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = new FormData(form);
                form.reset();
                setContactMessage('');
                setContactOpen(false);
              }}
              className="space-y-4"
            >
              <input name="name" required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-white" />
              <input name="email" required type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-white" />
              <input name="phone" placeholder="Phone" className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-white" />
              <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} name="message" required placeholder="Tell us what you're looking for" rows={4} className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-white" />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setContactOpen(false)} className="border border-white text-white px-4 py-2 rounded-sm">
                  Cancel
                </button>
                <button type="submit" className="bg-brand-gold text-black px-4 py-2 rounded-sm font-bold uppercase">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
