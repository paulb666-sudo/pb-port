import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Eye, MessageCircle, Truck, Mail, ArrowRight } from 'lucide-react';

export const HowToOrder: React.FC = () => {
  const { openOrderModal } = useFarm();

  const steps = [
    {
      step: '01',
      title: "SEE WHAT’S FRESH",
      desc: "Check our live harvest board to see what Mike has cut, pulled, and packed this week.",
      icon: Eye,
    },
    {
      step: '02',
      title: 'MESSAGE MIKE',
      desc: 'Send a quick WhatsApp or email with your name and whether you’d like the R200 seasonal box or specific bunches.',
      icon: MessageCircle,
    },
    {
      step: '03',
      title: 'COLLECT OR ARRANGE DELIVERY',
      desc: 'Pick up your fresh box locally or arrange local Noordhoek delivery directly with Mike.',
      icon: Truck,
    },
  ];

  return (
    <section id="how-to-order" className="py-20 bg-[#F5EFE4] border-t border-[#4D685A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Simple Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A2B] tracking-tight">
            Getting your box is easy.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            No complicated ecommerce carts or forced subscriptions. Just direct communication with your farmer.
          </p>
        </div>

        {/* 3 Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="relative bg-[#FAF7F2] rounded-3xl p-8 border border-[#4D685A]/15 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#C2593F]/50">
                      {st.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#EAE4D7] text-[#1E3A2B] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1E3A2B] mb-2 tracking-tight">
                    {st.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500 italic">
                  {st.step === '03' ? 'Delivery or pickup options confirmed directly with Mike.' : 'Friendly and quick reply.'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance notes on delivery / pickup */}
        <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#4D685A]/15 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs sm:text-sm text-stone-700 text-center sm:text-left space-y-1">
            <p className="font-semibold text-[#1E3A2B]">
              • Pickup options available — ask Mike.
            </p>
            <p>
              • Delivery may be available locally in Noordhoek — ask Mike when ordering.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openOrderModal("Hi Mike! I'd like to order on WhatsApp.")}
              className="px-5 py-3 rounded-xl bg-[#1E3A2B] hover:bg-[#15281D] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-[#88A892]" />
              <span>ORDER ON WHATSAPP</span>
            </button>

            <button
              onClick={() => openOrderModal("Hi Mike! I'd like to send an email order inquiry.")}
              className="px-4 py-3 rounded-xl bg-[#EAE4D7] hover:bg-stone-300 text-stone-800 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#654E38]" />
              <span>EMAIL MIKE</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
