import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { ProduceStatus, ProduceItem } from '../types/produce';
import { Sparkles, Calendar, Plus, RefreshCw, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const AvailableThisWeek: React.FC = () => {
  const { produce, openOrderModal, settings, isSyncing } = useFarm();
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');

  const statusColors: Record<ProduceStatus, { bg: string; text: string; border: string; dot: string }> = {
    'Fresh today': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      dot: 'bg-emerald-600',
    },
    'Available today': {
      bg: 'bg-stone-100',
      text: 'text-stone-800',
      border: 'border-stone-300',
      dot: 'bg-[#4D685A]',
    },
    'Low inventory': {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      dot: 'bg-amber-600',
    },
    'Out of stock': {
      bg: 'bg-stone-100',
      text: 'text-stone-500',
      border: 'border-stone-200',
      dot: 'bg-stone-400',
    },
    'Coming into season': {
      bg: 'bg-sky-50',
      text: 'text-sky-800',
      border: 'border-sky-200',
      dot: 'bg-sky-500',
    },
  };

  const filterOptions = [
    'All',
    'Fresh today',
    'Available today',
    'Low inventory',
    'Out of stock',
  ];

  const filteredProduce = produce.filter((item) => {
    if (selectedStatusFilter === 'All') return true;
    return item.status === selectedStatusFilter;
  });

  const handleInquireCrop = (item: ProduceItem) => {
    openOrderModal(`Hi Mike! I saw ${item.name} (${item.status}) on your harvest board and would love to ask about availability/extra bunches.`);
  };

  return (
    <section id="this-week" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE4D7] text-[#1E3A2B] text-xs font-semibold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#654E38]" />
            <span>Farm Harvest Board</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight">
            Available this week
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl">
            Live status straight from the Noordhoek plot. Picked to order when you message Mike.
          </p>
        </div>

        {/* Sync status indicator */}
        <div className="mt-4 md:mt-0 flex items-center gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Farm Sync</span>
            {settings.lastSyncedAt && (
              <span className="text-stone-400 text-[11px]">• Synced {settings.lastSyncedAt}</span>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {filterOptions.map((filter) => {
          const isActive = selectedStatusFilter === filter;
          const count = filter === 'All' 
            ? produce.length 
            : produce.filter(p => p.status === filter).length;

          return (
            <button
              key={filter}
              onClick={() => setSelectedStatusFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#1E3A2B] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#FAF7F2] text-stone-600 hover:bg-stone-200/70 border border-stone-200'
              }`}
            >
              <span>{filter}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Harvest Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProduce.map((item) => {
          const statusStyle = statusColors[item.status] || statusColors['Available today'];
          const isAvailable = item.status !== 'Out of stock';

          return (
            <div
              key={item.id}
              className="group bg-[#FAF7F2] rounded-2xl border border-[#4D685A]/15 overflow-hidden hover:border-[#1E3A2B]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo with natural soil & lighting */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-md shadow-xs ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                      {item.status}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 right-3">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-black/60 text-stone-100 backdrop-blur-xs">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-serif text-lg font-bold text-[#1E3A2B] group-hover:text-[#C2593F] transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mt-1">
                    {item.description}
                  </p>

                  {/* Harvest Note from Mike */}
                  {item.harvestNote && (
                    <div className="mt-3 pt-2.5 border-t border-stone-200/80 flex items-center gap-1.5 text-[11px] text-[#654E38] italic">
                      <Sparkles className="w-3 h-3 text-[#C2593F] shrink-0" />
                      <span className="line-clamp-1">{item.harvestNote}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="p-4 sm:p-5 pt-0">
                <button
                  onClick={() => handleInquireCrop(item)}
                  disabled={!isAvailable}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isAvailable
                      ? 'bg-[#EAE4D7] hover:bg-[#1E3A2B] text-[#1E3A2B] hover:text-[#FAF7F2]'
                      : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAvailable ? 'Ask Mike to Add This' : 'Currently Resting'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Bottom helper reassurance */}
      <div className="mt-12 text-center text-xs text-stone-500">
        <p>
          Need specific bunches or want to know harvest times? Mike replies quickly on WhatsApp.
        </p>
      </div>

    </section>
  );
};
