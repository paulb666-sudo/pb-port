import React from 'react';
import { useFarm } from '../context/FarmContext';
import { MapPin, SlidersHorizontal, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openOrderModal, setIsAdminOpen, settings } = useFarm();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#15281D] text-[#FAF7F2] pt-16 pb-12 border-t border-[#4D685A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#FAF7F2] text-[#1E3A2B] flex items-center justify-center p-1.5">
                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                  <path d="M4 22L12 12L18 19L24 10L28 22H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeOpacity="0.4" />
                  <circle cx="21" cy="7" r="2.5" fill="#C2593F" />
                  <path d="M16 26C16 19 22 15 22 15C22 15 21 21 16 26Z" fill="#1E3A2B" />
                  <path d="M16 26C16 20 10 16 10 16C10 16 11 22 16 26Z" fill="#4D685A" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight block">
                  Farmer Mike's Produce
                </span>
                <span className="text-[11px] text-stone-400 uppercase tracking-widest">
                  Noordhoek, Cape Town
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-300 max-w-sm leading-relaxed mb-6 font-sans">
              Grown in Noordhoek. Picked when it's ready. Packed for your kitchen. Small-scale seasonal vegetables grown with organic practices.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-[#E8B042]" />
              <span>Noordhoek Valley, Western Cape, South Africa</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li>
                <a href="#this-week" className="hover:text-white transition-colors">
                  Available This Week
                </a>
              </li>
              <li>
                <a href="#seasonal-box" className="hover:text-white transition-colors">
                  The Seasonal Box (R{settings.boxPrice})
                </a>
              </li>
              <li>
                <a href="#what-we-grow" className="hover:text-white transition-colors">
                  What Mike Grows
                </a>
              </li>
              <li>
                <a href="#our-approach" className="hover:text-white transition-colors">
                  Our Approach (Organic Methods)
                </a>
              </li>
              <li>
                <a href="#meet-mike" className="hover:text-white transition-colors">
                  Meet Mike
                </a>
              </li>
              <li>
                <a href="#catnip" className="hover:text-white transition-colors">
                  Catnip 🐈
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (Placeholders per brief rules) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Direct Contact
            </h4>
            
            <div className="space-y-3 text-sm text-stone-300 mb-6">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-stone-400 block font-medium">WhatsApp Orders:</span>
                <a 
                  href="https://wa.me/27724886140" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-xs sm:text-sm text-emerald-400 hover:text-emerald-300 font-semibold hover:underline block mt-0.5"
                >
                  {settings.whatsAppNumber || '+27 72 488 6140'}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-stone-400 block font-medium">Email Inquiries:</span>
                <span className="font-mono text-xs sm:text-sm text-white font-semibold">
                  {settings.emailAddress}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openOrderModal()}
                className="px-4 py-2 rounded-lg bg-[#EAE4D7] text-[#1E3A2B] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
              >
                Order Box
              </button>

              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/20 text-xs font-medium text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Mike's Dashboard</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            Seasonal produce. Local growing. Good food.
          </p>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Farmer Mike's Produce. Noordhoek, Cape Town.</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
