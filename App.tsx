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

  const filteredProperties = activeTab === 'All' 
    ? FEATURED_PROPERTIES 
    : FEATURED_PROPERTIES.filter(p => p.type === activeTab);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-gold selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center space-x-3">
               <div className="h-14 w-14 overflow-hidden rounded-full border border-brand-gold/20">
                 <img
                   src={new URL('./download (7).png', import.meta.url).href}
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
              <a href="#home" className="text-sm font-medium hover:text-brand-gold transition-colors">Home</a>
              <a href="#about" className="text-sm font-medium hover:text-brand-gold transition-colors">About</a>
              <a href="#properties" className="text-sm font-medium hover:text-brand-gold transition-colors">Properties</a>
              <a href="#services" className="text-sm font-medium hover:text-brand-gold transition-colors">Services</a>
              <button className="bg-white text-black px-6 py-2 rounded-sm text-sm font-bold hover:bg-brand-gold hover:text-black transition-all duration-300 uppercase tracking-wide">
                Contact Us
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
             <a href="#home" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Home</a>
             <a href="#about" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>About</a>
             <a href="#properties" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Properties</a>
             <a href="#services" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Services</a>
             <button className="bg-brand-gold text-black w-full py-3 rounded-sm text-lg font-bold uppercase">Contact Us</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <AiImage 
            prompt="futuristic luxury glass mansion on a cliff overlooking the ocean at night, dramatic lighting, gold ambient lights, architectural masterpiece, 8k, photorealistic" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            fallbackSrc={new URL('./download (7).png', import.meta.url).href}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <p className="text-brand-gold uppercase tracking-[0.3em] text-sm font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Redefining Luxury
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-white leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            OCEAN LUXE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold/50 to-white">ESTATES</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Strategic solutions across residential, commercial, and investment properties. 
            Operating in RI, MA, FL, and MI. Built to scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <button className="bg-brand-gold text-black px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              Explore Listings
            </button>
            <button onClick={() => setContactOpen(true)} className="bg-transparent border border-white text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all">
              Our Services
            </button>
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
                <span className="text-brand-gold uppercase tracking-widest text-sm font-bold">Powered by Innovation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Integrity in Every <br/> Transaction.
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Ocean Luxe Estates is a full-service real estate company offering strategic solutions across residential, commercial, and investment properties. We specialize in buying, selling, leasing, and managing properties with a focus on luxury.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Backed by <span className="text-white font-bold">Stackk Cloud</span> and powered by <span className="text-white font-bold">Oretha AI</span>, we leverage cutting-edge technology to deliver clarity and efficiency.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'National Scalability',
                  'Data-Driven Market Analysis',
                  'End-to-End Project Oversight',
                  'Luxury Portfolio Management'
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
                fallbackSrc={new URL('./download (7).png', import.meta.url).href}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">Featured <span className="text-brand-gold">Estates</span></h2>
              <p className="text-gray-400 max-w-xl">
                Curated selection of premier properties across our key markets.
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
            <button className="inline-flex items-center text-white border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors group">
              <span className="text-lg mr-2">View Global Portfolio</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-brand-darkgray border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-serif font-bold mb-4">Our Services</h2>
             <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                title: "Acquisitions & Sales",
                desc: "Expert guidance through buying and selling luxury assets with market-leading data."
              },
              {
                icon: Building2,
                title: "Development & Oversight",
                desc: "From ground-up construction to renovation oversight, ensuring vision meets reality."
              },
              {
                icon: TrendingUp,
                title: "Asset Management",
                desc: "Maximizing value through strategic leasing and operational efficiency."
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
            Whether you are looking for a dream home or a high-yield investment, Ocean Luxe Estates delivers exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all shadow-xl rounded-sm">
              Start a Conversation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all rounded-sm">
              Join Our Network
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-serif font-bold text-white mb-6">
                OCEAN LUXE <span className="text-brand-gold">ESTATES</span>
              </h3>
              <p className="text-gray-400 mb-6 max-w-sm">
                A full-service real estate company built on clarity, efficiency, and integrity. Scaling nationally from our roots in RI, MA, FL, and MI.
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
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Markets</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-brand-gold cursor-pointer">Rhode Island</li>
                <li className="hover:text-brand-gold cursor-pointer">Massachusetts</li>
                <li className="hover:text-brand-gold cursor-pointer">Florida</li>
                <li className="hover:text-brand-gold cursor-pointer">Michigan</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><Phone className="w-4 h-4 mr-2 text-brand-gold"/> +1 (800) LUXE-EST</li>
                <li className="flex items-center"><Mail className="w-4 h-4 mr-2 text-brand-gold"/> info@oceanluxe.com</li>
                <li className="flex items-center"><Globe className="w-4 h-4 mr-2 text-brand-gold"/> www.oceanluxe.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Ocean Luxe Estates. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
               <span className="flex items-center gap-2">
                 Powered by <span className="font-bold text-gray-300">Stackk Cloud</span> & <span className="font-bold text-gray-300">Oretha AI</span>
               </span>
               <a href="#" className="hover:text-white">Privacy</a>
               <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>

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
                  <button onClick={() => setContactOpen(true)} className="bg-brand-gold text-black px-4 py-2 rounded-sm font-bold uppercase">
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
                const payload = Object.fromEntries(data.entries());
                console.log('Inquiry', payload);
                form.reset();
                setContactOpen(false);
              }}
              className="space-y-4"
            >
              <input name="name" required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-white" />
              <input name="email" required type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-white" />
              <input name="phone" placeholder="Phone" className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-white" />
              <textarea name="message" required placeholder="Tell us what you're looking for" rows={4} className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-white" />
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
