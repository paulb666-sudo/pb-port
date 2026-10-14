import React from 'react';
import { useFarm } from '../context/FarmContext';
import { MessageCircle, Package } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { openOrderModal, settings } = useFarm();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden p-3 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#4D685A]/20 shadow-lg">
      <div className="max-w-md mx-auto flex items-center gap-3">
        
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#654E38] uppercase tracking-wider">
            <Package className="w-3 h-3 text-[#1E3A2B]" />
            <span>Weekly Harvest Box</span>
          </div>
          <div className="font-serif text-lg font-bold text-[#1E3A2B] leading-none mt-0.5">
            R{settings.boxPrice}
            <span className="text-[11px] font-sans font-normal text-stone-500 ml-1">/ seasonal box</span>
          </div>
        </div>

        <button
          onClick={() => openOrderModal()}
          className="px-5 py-3 rounded-xl bg-[#1E3A2B] hover:bg-[#14281E] active:scale-98 text-[#FAF7F2] text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer transition-all"
        >
          <MessageCircle className="w-4 h-4 text-[#88A892]" />
          <span>ORDER A BOX</span>
        </button>

      </div>
    </div>
  );
};
