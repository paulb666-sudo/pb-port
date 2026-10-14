import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { ProduceCategory } from '../types/produce';
import { Sprout } from 'lucide-react';

export const WhatMikeGrows: React.FC = () => {
  const { produce } = useFarm();
  const [activeCategory, setActiveCategory] = useState<ProduceCategory | 'All'>('All');

  const categories: (ProduceCategory | 'All')[] = [
    'All',
    'Leafy',
    'Roots',
    'Fruiting',
    'Alliums',
    'Herbs & Catnip',
  ];

  const categoryDescriptions: Record<string, string> = {
    'All': 'A diverse agroecological rotation grown year-round in coastal Noordhoek.',
    'Leafy': 'Cut fresh at dawn: English spinach, Swiss chard, crisp butterheads, and salad greens.',
    'Roots': 'Slow-grown in deep compost: sweet Dutch carrots, tender beetroot, baby Nicola potatoes, and radishes.',
    'Fruiting': 'Ripened naturally in Cape sunshine: heirloom tomatoes, sweet peppers, ridge cucumbers, and chillies.',
    'Alliums': 'Cured on farm racks: purple-striped garlic and mild red salad onions.',
    'Herbs & Catnip': 'Companion herbs, natural pollinator plants, and garden catnip loved by local cats.',
  };

  const filtered = activeCategory === 'All'
    ? produce
    : produce.filter(p => p.category === activeCategory);

  return (
    <section id="what-we-grow" className="py-20 bg-[#F4EFE6] border-t border-[#4D685A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sprout className="w-3.5 h-3.5" />
            <span>Seasonal Varieties</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A2B] tracking-tight">
            What Mike grows
          </h2>
          <p className="mt-3 text-stone-700 text-base sm:text-lg leading-relaxed">
            From leafy greens to roots, fruiting vegetables and a little something for the cats — Mike grows a changing mix of seasonal produce throughout the year.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1E3A2B] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#FAF7F2] text-stone-700 hover:bg-[#EAE4D7] border border-[#4D685A]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Category Summary */}
        <div className="mb-10 text-xs sm:text-sm text-[#654E38] italic font-serif">
          {categoryDescriptions[activeCategory]}
        </div>

        {/* Varied Visual Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((item, idx) => {
            const isWide = idx % 5 === 0 && idx !== 0;

            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#4D685A]/15 shadow-xs hover:shadow-md transition-all duration-300 ${
                  isWide ? 'col-span-2' : ''
                }`}
              >
                <div className={`relative overflow-hidden bg-stone-200 ${isWide ? 'aspect-21/9' : 'aspect-square'}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#E8B042]">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-bold leading-tight mt-0.5">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-stone-200 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
