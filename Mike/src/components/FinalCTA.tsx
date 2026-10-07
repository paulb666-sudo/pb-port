import React from 'react';
import { useFarm } from '../context/FarmContext';
import { ArrowDown, Package, MessageCircle } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { openOrderModal, settings } = useFarm();

  return (
    <section className="relative py-24 bg-[#1E3A2B] text-[#FAF7F2] overflow-hidden">
      {/* Background imagery with dark tint */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1600&q=80"
          alt="Cape Town farm landscape"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#15291E] via-transparent to-[#1E3A2B]/80 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-xs border border-white/15">
          <Package className="w-3.5 h-3.5 text-[#E8B042]" />
          <span>Fresh Seasonal Veggies</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Bring a little Noordhoek home.
        </h2>

        <p className="text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          Seasonal vegetables, grown locally and packed up for your kitchen. Picked when they're ready, packed with care.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openOrderModal()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FAF7F2] hover:bg-white text-[#1E3A2B] font-bold text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#1E3A2B]" />
            <span>ORDER THIS WEEK'S BOX — R{settings.boxPrice}</span>
          </button>

          <a
            href="#this-week"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-transparent hover:bg-white/10 text-[#FAF7F2] font-semibold text-sm uppercase tracking-wider border border-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>WHAT’S GROWING?</span>
            <ArrowDown className="w-4 h-4 text-stone-300" />
          </a>
        </div>

        <p className="mt-8 text-xs text-stone-400">
          WhatsApp or email Mike directly • No accounts • No fuss
        </p>

      </div>
    </section>
  );
};
