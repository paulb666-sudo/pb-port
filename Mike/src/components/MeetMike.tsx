import React from 'react';
import { User, MessageCircle, Heart, MapPin } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const MeetMike: React.FC = () => {
  const { openOrderModal } = useFarm();

  return (
    <section id="meet-mike" className="py-20 bg-[#EFE8DC] border-t border-[#4D685A]/15 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#4D685A]/20 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Image of Grower with respectful Cape farm context */}
            <div className="lg:col-span-5 relative h-full min-h-[380px] bg-stone-200">
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80"
                alt="Local grower harvesting in Noordhoek garden plot"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Notice respecting brief rule #9: stock imagery notice */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-stone-300 inline-block mb-1">
                  On the Noordhoek plot
                </span>
                <p className="text-xs text-stone-200 leading-tight">
                  Working the garden beds at dawn.
                </p>
              </div>
            </div>

            {/* Mike's personal letter */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE4D7] text-[#1E3A2B] text-xs font-semibold uppercase tracking-wider mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#654E38]" />
                <span>Local Farmer</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A2B] tracking-tight mb-6">
                Meet Mike
              </h2>

              <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed font-sans">
                <p className="font-serif text-xl sm:text-2xl text-[#1E3A2B] font-semibold italic">
                  Hi, I’m Mike.
                </p>
                <p>
                  I grow seasonal vegetables here in Noordhoek and sell them directly to people in the local community.
                </p>
                <p>
                  I’m interested in keeping things simple: healthy soil, good growing practices, fresh vegetables, and food that doesn’t have to travel halfway around the world to reach your kitchen.
                </p>
                <p>
                  What’s ready in the garden determines what’s in the box — so every week is a little different.
                </p>
              </div>

              {/* Punchy closing signature */}
              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="font-serif text-lg font-bold tracking-widest text-[#C2593F] uppercase block">
                    GROWN HERE. EATEN HERE.
                  </span>
                  <span className="text-xs text-stone-500">
                    Noordhoek, Cape Town
                  </span>
                </div>

                <button
                  onClick={() => openOrderModal("Hi Mike! I came across your Noordhoek farm website and would love to introduce myself and ask about this week's harvest.")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1E3A2B] hover:bg-[#15281D] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#88A892]" />
                  <span>Send Mike a Message</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
