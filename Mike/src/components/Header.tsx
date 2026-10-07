import React, { useState, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import { Menu, X, SlidersHorizontal, FileText, CheckCircle2 } from 'lucide-react';

export const Header: React.FC = () => {
  const { openOrderModal, setIsAdminOpen, isGoogleAuthenticated, settings } = useFarm();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'This Week', href: '#this-week' },
    { label: 'The Box', href: '#seasonal-box' },
    { label: 'What We Grow', href: '#what-we-grow' },
    { label: 'Our Approach', href: '#our-approach' },
    { label: 'Meet Mike', href: '#meet-mike' },
    { label: 'Catnip 🐈', href: '#catnip' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs py-3.5 border-b border-[#4D685A]/15' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand Mark */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            {/* Custom handcrafted Noordhoek landscape + leaf logo icon */}
            <div className="w-10 h-10 rounded-full bg-[#1E3A2B] text-[#FAF7F2] flex items-center justify-center p-2 shadow-xs group-hover:scale-105 transition-transform duration-200">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Understated Cape mountain silhouette */}
                <path d="M4 22L12 12L18 19L24 10L28 22H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeOpacity="0.4" />
                {/* Sprouting leaf & sun */}
                <circle cx="21" cy="7" r="2.5" fill="#E8B042" />
                <path d="M16 26C16 19 22 15 22 15C22 15 21 21 16 26Z" fill="#88A892" />
                <path d="M16 26C16 20 10 16 10 16C10 16 11 22 16 26Z" fill="#4D685A" />
                <path d="M16 26V17" stroke="#FAF7F2" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1E3A2B] leading-none">
                Farmer Mike's
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#654E38] mt-0.5">
                Produce • Noordhoek
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-stone-700 hover:text-[#1E3A2B] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#1E3A2B] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Admin Dashboard trigger + Order CTA */}
          <div className="flex items-center gap-3">
            {/* Mike's Admin Access Toggle */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#4D685A]/30 text-xs font-medium text-stone-700 hover:text-[#1E3A2B] hover:bg-stone-200/50 transition-all cursor-pointer"
              title="Open Farmer Mike's Inventory & Google Doc Sync Dashboard"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#4D685A]" />
              <span className="hidden sm:inline">Farmer Admin</span>
              {isGoogleAuthenticated && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" title="Google Docs Connected" />
              )}
            </button>

            {/* Primary Order CTA */}
            <button
              onClick={() => openOrderModal()}
              className="hidden sm:inline-flex items-center justify-center px-4.5 py-2.5 rounded-xl bg-[#1E3A2B] hover:bg-[#14281E] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200 active:scale-98 cursor-pointer"
            >
              ORDER A BOX — R{settings.boxPrice}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-[#1E3A2B] lg:hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-stone-200/80 bg-[#FAF7F2]/95 backdrop-blur-md rounded-2xl shadow-lg px-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-stone-800 hover:text-[#1E3A2B] py-1"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openOrderModal();
                  }}
                  className="w-full py-3 rounded-xl bg-[#1E3A2B] text-[#FAF7F2] text-sm font-semibold uppercase tracking-wider text-center"
                >
                  ORDER A BOX — R{settings.boxPrice}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium text-center flex items-center justify-center gap-1.5"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#4D685A]" />
                  Mike's Dashboard (Live Google Doc Sync)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
