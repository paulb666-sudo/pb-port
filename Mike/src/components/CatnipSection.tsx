import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Sparkles, MessageCircle, Heart, ArrowRight } from 'lucide-react';

export const CatnipSection: React.FC = () => {
  const { openOrderModal } = useFarm();

  const formats = [
    {
      title: 'Fresh Bunches',
      desc: 'Cut green stems straight from the bed. Bursting with aromatic essential oils.',
      badge: 'Most Popular',
    },
    {
      title: 'Dried Catnip',
      desc: 'Naturally slow-cured in the farm shade. Easy to store and sprinkle on scratchers.',
      badge: 'Long-lasting',
    },
    {
      title: 'Catnip Bags',
      desc: 'Handmade breathable cotton pouches packed with potent crushed leaf and flowers.',
      badge: 'Play Pouches',
    },
    {
      title: 'Living Plants',
      desc: 'Potted Nepeta Cataria plants in garden compost ready for your windowsill or patio.',
      badge: 'Grow at Home',
    },
  ];

  return (
    <section id="catnip" className="py-20 bg-[#FAF7F2] border-t border-[#4D685A]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#F2ECE0] rounded-3xl border border-[#4D685A]/20 p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-lg">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] text-xs font-semibold uppercase tracking-wider mb-4">
                <span>Natural Companion Crop</span>
                <span>•</span>
                <span>Nepeta Cataria</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight mb-4">
                Something for the other members of the household. 🐈
              </h2>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-8">
                Fresh local catnip, grown right here in Noordhoek alongside the vegetables as a natural beneficial companion herb. Grown without synthetic sprays, totally pure, and adored by local felines.
              </p>

              {/* 4 Formats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {formats.map((fmt) => (
                  <button
                    key={fmt.title}
                    type="button"
                    onClick={() => openOrderModal(`Hi Mike! I'd like to order your catnip: ${fmt.title}.`, 'catnip')}
                    className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#4D685A]/15 hover:border-[#1E3A2B] hover:shadow-md transition-all flex flex-col justify-between text-left cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-serif font-bold text-[#1E3A2B] group-hover:text-[#C2593F] transition-colors text-base">
                          {fmt.title}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EAE4D7] text-[#654E38]">
                          {fmt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {fmt.desc}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#1E3A2B] mt-2 group-hover:underline">
                      Select {fmt.title} →
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => openOrderModal("Hi Mike! I'd love to ask about your fresh or dried catnip for my cat.", 'catnip')}
                  className="px-6 py-3.5 rounded-xl bg-[#1E3A2B] hover:bg-[#15281D] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 text-[#88A892]" />
                  <span>ASK ABOUT CATNIP</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-xs text-stone-500 italic">
                  Pure Nepeta Cataria grown right here in Noordhoek
                </span>
              </div>
            </div>

            {/* Right Photo: Tasteful Cat + Herb Interaction */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-4/3 sm:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80"
                  alt="Healthy cat resting beside fresh green herbs"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <span className="font-serif font-semibold text-sm block">100% Organically Grown Catnip</span>
                  <span className="text-stone-200 text-[11px]">Noordhoek garden companion beds</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
