import React from 'react';
import { useFarm } from '../context/FarmContext';
import { ArrowDown, Sparkles, MapPin, Sun } from 'lucide-react';

export const Hero: React.FC = () => {
  const { openOrderModal, settings } = useFarm();

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Subtle background ambient gradient reminiscent of Noordhoek morning coastal mist and sun */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(126,151,136,0.18),rgba(250,247,242,0))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Small geographical tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE4D7] text-[#1E3A2B] text-xs font-semibold tracking-wide uppercase mb-6 shadow-xs border border-[#4D685A]/15">
              <MapPin className="w-3.5 h-3.5 text-[#654E38]" />
              <span>Noordhoek Valley • Cape Town</span>
              <span className="w-1 h-1 rounded-full bg-[#654E38]/40" />
              <span className="text-[#654E38] lowercase font-medium">small-scale grower</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] text-[#1E3A2B] font-bold tracking-tight leading-[1.08] mb-6">
              Grown in Noordhoek.
              <span className="block italic font-normal text-[#4D685A] mt-1 sm:mt-2">
                Picked when it’s ready.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-stone-700 max-w-2xl leading-relaxed mb-8">
              Fresh seasonal vegetables grown on a small local plot in Noordhoek using natural organic farming practices. Harvested and packed straight for your kitchen.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => openOrderModal()}
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-[#1E3A2B] hover:bg-[#15281D] text-[#FAF7F2] font-semibold text-sm tracking-wide uppercase shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 cursor-pointer"
              >
                ORDER THIS WEEK'S BOX — R{settings.boxPrice}
              </button>

              <a
                href="#this-week"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-[#EAE4D7]/80 hover:bg-[#EAE4D7] text-[#1E3A2B] font-semibold text-sm tracking-wide border border-[#4D685A]/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>SEE WHAT’S GROWING</span>
                <ArrowDown className="w-4 h-4 ml-2 text-[#4D685A]" />
              </a>
            </div>

            {/* Key Micro-reassurances */}
            <div className="mt-10 pt-6 border-t border-stone-200/90 flex flex-wrap items-center gap-6 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="font-semibold text-stone-800">Weekly Harvest:</span>
                <span>Packed fresh every week</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C2593F]" />
                <span className="font-semibold text-stone-800">Direct Contact:</span>
                <span>Order via WhatsApp or Email</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#654E38]" />
                <span className="font-semibold text-stone-800">Zero Air Miles:</span>
                <span>Grown right here in the valley</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Column: Authentic Cape Farm Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary editorial photo: Hands harvesting freshly picked garden vegetables */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF7F2] bg-stone-100 aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80"
                  alt="Farmer harvesting fresh organic produce in morning light"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Subtle gradient overlay at bottom for tactile feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                {/* Visual badge on photo */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md text-[11px] font-medium tracking-wide uppercase mb-2 border border-white/20">
                    <Sun className="w-3 h-3 text-[#E8B042]" />
                    <span>Noordhoek Morning Harvest</span>
                  </div>
                  <p className="font-serif text-lg leading-snug font-medium text-stone-100">
                    “What’s ready in the garden determines what’s in the box.”
                  </p>
                </div>
              </div>

              {/* Overlapping secondary floating card: Freshly harvested carrots & greens in crate */}
              <div className="hidden sm:block absolute -bottom-6 -left-8 w-56 rounded-2xl overflow-hidden shadow-xl border-4 border-[#FAF7F2] bg-[#FAF7F2] p-2 rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80"
                  alt="Fresh garden vegetable box with soil-dusted roots"
                  className="w-full h-32 object-cover rounded-xl"
                />
                <div className="pt-2 px-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-serif font-bold text-[#1E3A2B]">The Weekly Box</span>
                    <span className="font-semibold text-[#C2593F]">R{settings.boxPrice}</span>
                  </div>
                  <span className="text-[10px] text-stone-500">Picked to order</span>
                </div>
              </div>

              {/* Decorative botanical mountain element */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#FAF7F2] p-3 shadow-lg flex items-center justify-center border border-[#4D685A]/15 animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#1E3A2B] fill-current">
                  <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="text-[9.5px] uppercase tracking-[0.25em] font-bold fill-[#1E3A2B]">
                    <textPath href="#curve">
                      * NOORDHOEK * GROWN LOCAL *
                    </textPath>
                  </text>
                </svg>
                <div className="absolute w-4 h-4 rounded-full bg-[#C2593F]" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
