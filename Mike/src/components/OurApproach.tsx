import React from 'react';
import { Layers, CloudSun, Scissors, Home, Leaf } from 'lucide-react';

export const OurApproach: React.FC = () => {
  const principles = [
    {
      title: 'SOIL FIRST',
      tagline: 'Healthy soil is the beginning of good food.',
      desc: 'We feed the biology of the ground with rich compost, cover crops, and deep organic mulches rather than soluble chemical fertilisers.',
      icon: Layers,
    },
    {
      title: 'IN SEASON',
      tagline: 'Mike grows according to what the seasons allow.',
      desc: 'No artificially heated plastic tunnels or forced cycles. Vegetables develop deep sugars, crisp texture, and natural pest resistance in their natural time.',
      icon: CloudSun,
    },
    {
      title: 'HARVEST FRESH',
      tagline: 'Vegetables are picked when they’re ready.',
      desc: 'Nothing is picked green to ripen in a shipping container. Mike cuts and pulls produce on order days so it arrives at your table still bursting with garden life.',
      icon: Scissors,
    },
    {
      title: 'LOCAL',
      tagline: 'Grown in Noordhoek for local households.',
      desc: 'Kept in our valley community. Shorter distances mean zero cold-chain storage degradation and a genuine human connection to who grew your food.',
      icon: Home,
    },
  ];

  return (
    <section id="our-approach" className="py-20 bg-[#FAF7F2] border-t border-[#4D685A]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Editorial Text */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] text-xs font-semibold uppercase tracking-wider mb-4">
              <Leaf className="w-3.5 h-3.5" />
              <span>Grown Using Organic Practices</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A2B] tracking-tight leading-tight mb-6">
              Grow with the seasons. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#4D685A]">Work with the soil.</span>
            </h2>

            <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed">
              <p>
                Mike's approach is simple: grow naturally, look after the soil, and harvest when the vegetables are ready.
              </p>
              <p>
                His growing methods are based on organic farming practices, with an emphasis on healthy living soil, seasonal growing, and producing good, unpretentious food for local people.
              </p>
            </div>

            {/* Reassurance note */}
            <div className="mt-8 p-4 rounded-2xl bg-[#F3EDE2] border border-[#4D685A]/15 text-xs text-[#654E38] leading-relaxed">
              <strong className="font-semibold text-[#1E3A2B]">Natural growing, honest communication:</strong> We focus on regenerative soil health, compost teas, and companion planting without synthetic pesticides or chemical fertilisers.
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=1200&q=80"
                alt="Healthy rich living soil and seedlings in garden bed"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A2B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2]">
                <p className="font-serif text-xl font-bold">
                  “Soil-first growing. The closer the food is grown, the better it tastes.”
                </p>
                <span className="text-xs text-stone-300 mt-1 block">Noordhoek Valley garden beds</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Core Principles Grid */}
        <div className="mt-16 pt-12 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-[#F3EDE2]/70 border border-[#4D685A]/15 hover:border-[#1E3A2B]/40 hover:bg-[#F3EDE2] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1E3A2B] text-[#FAF7F2] flex items-center justify-center mb-4 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1E3A2B] mb-1">
                  {p.title}
                </h3>
                <h4 className="text-xs font-semibold text-[#654E38] mb-2 leading-snug">
                  {p.tagline}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
