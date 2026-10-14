import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Check, Sparkles, MessageCircle, Mail, HelpCircle, Package, ArrowRight } from 'lucide-react';

export const SeasonalBoxSection: React.FC = () => {
  const { openOrderModal, produce, settings } = useFarm();

  // Filter crops that are featured or available for the current box
  const boxItems = produce.filter((p) => p.isSeasonalBoxFeatured || p.status === 'Fresh today' || p.status === 'Available today').slice(0, 8);

  return (
    <section id="seasonal-box" className="py-20 bg-[#F3EDE2] border-y border-[#4D685A]/15 relative overflow-hidden">
      {/* Background organic shape */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FAF7F2]/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7E9788]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] text-xs font-semibold uppercase tracking-wider mb-3">
            <Package className="w-3.5 h-3.5" />
            <span>The Core Offering</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A2B] tracking-tight mb-4">
            This week's box
          </h2>
          <p className="text-xl text-[#654E38] font-serif italic mb-4">
            Fresh from the garden. Packed for your kitchen.
          </p>
          <p className="text-stone-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Every box is a little different because every week in the garden is different. Mike fills each box with whatever is fresh, seasonal and ready to harvest that week.
          </p>
        </div>

        {/* Main Box Showcase Container */}
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#4D685A]/20 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Box Composition Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200">
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#654E38]">Current Seasonal Mix</span>
                    <h3 className="font-serif text-2xl font-bold text-[#1E3A2B]">What's packing into this week's box</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">Weekly Price</span>
                    <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C2593F]">
                      R{settings.boxPrice}
                    </div>
                  </div>
                </div>

                {/* Produce composition visual grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6">
                  {boxItems.map((item) => (
                    <div
                      key={item.id}
                      className="group relative bg-[#F3EDE2]/60 rounded-2xl p-2.5 border border-[#4D685A]/15 hover:border-[#1E3A2B]/40 hover:bg-[#F3EDE2] transition-all flex flex-col"
                    >
                      <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-200 mb-2 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1.5 left-1.5 text-[9px] font-semibold px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-stone-900 leading-tight line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1 italic">
                        {item.harvestNote || item.unit}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Important seasonal note */}
                <div className="p-4 rounded-2xl bg-[#EAE4D7]/70 border border-[#4D685A]/15 flex items-start gap-3 text-stone-700 text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-[#C2593F] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900">What’s included changes with the season and harvest: </span>
                    Mike picks whatever is at peak flavour on harvest morning. You receive an abundant family box of naturally grown greens, roots, fruiting vegetables, and herbs.
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-stone-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2B]" />
                  <span>Local Noordhoek soil</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2B]" />
                  <span>Harvested weekly to order</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2B]" />
                  <span>No synthetic pesticides</span>
                </div>
              </div>

            </div>

            {/* Ordering & Value Proposition Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-[#FAF7F2] flex flex-col justify-between">
              
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-[#1E3A2B] text-xs font-bold uppercase tracking-wider mb-4">
                  Simple WhatsApp or Email Ordering
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3A2B] mb-4">
                  Why order Mike's box?
                </h3>

                <ul className="space-y-3.5 mb-8 text-sm text-stone-700">
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-100 text-[#1E3A2B] mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-stone-900 font-semibold">Tastes like real vegetables: </strong>
                      Picked ripe, not stored for weeks in cold distribution warehouses.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-100 text-[#1E3A2B] mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-stone-900 font-semibold">No fixed contracts: </strong>
                      Order week by week whenever you need one. No subscription lock-in.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-100 text-[#1E3A2B] mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-stone-900 font-semibold">Grown in organic soil: </strong>
                      Fed with farm compost, clean mountain runoff, and healthy soil microbes.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-100 text-[#1E3A2B] mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-stone-900 font-semibold">Easy local handover: </strong>
                      Pick up or chat with Mike to arrange convenient local valley delivery.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Call to Action Container */}
              <div className="p-5 rounded-2xl bg-[#F3EDE2] border border-[#4D685A]/15">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-serif font-bold text-lg text-[#1E3A2B]">The Seasonal Box</span>
                  <span className="font-serif text-2xl font-bold text-[#C2593F]">R{settings.boxPrice}</span>
                </div>

                <button
                  onClick={() => openOrderModal("Hi Mike! I'd love to order this week's seasonal vegetable box (R200).")}
                  className="w-full py-4 px-6 rounded-xl bg-[#1E3A2B] hover:bg-[#15281D] text-[#FAF7F2] font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>ORDER A R{settings.boxPrice} BOX</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-xs text-stone-500 mt-2.5">
                  WhatsApp or email Mike directly • Local • Seasonal • Naturally grown
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
