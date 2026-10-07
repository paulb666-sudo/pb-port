import React, { useState, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import { X, MessageCircle, Mail, Package, Check, Plus, Minus, Copy, Sparkles, Heart } from 'lucide-react';

interface CatnipFormatOption {
  id: string;
  name: string;
  description: string;
  defaultQty: number;
}

const CATNIP_FORMATS: CatnipFormatOption[] = [
  { id: 'fresh-bunches', name: 'Fresh Bunches', description: 'Cut green stems straight from the bed. Aromatic & potent.', defaultQty: 1 },
  { id: 'dried-catnip', name: 'Dried Catnip', description: 'Naturally shade-cured leaf and flowers. Long-lasting.', defaultQty: 0 },
  { id: 'catnip-bags', name: 'Catnip Play Bags', description: 'Breathable cotton pouches packed with crushed herb.', defaultQty: 0 },
  { id: 'living-plants', name: 'Living Plants (Potted)', description: 'Established Nepeta Cataria plants for home windowsill.', defaultQty: 0 },
];

export const OrderModal: React.FC = () => {
  const { 
    isOrderModalOpen, 
    closeOrderModal, 
    orderModalMode,
    orderPrefilledMessage, 
    produce, 
    settings 
  } = useFarm();

  // Box mode state
  const [boxQuantity, setBoxQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  
  // Catnip mode state
  const [catnipQuantities, setCatnipQuantities] = useState<Record<string, number>>({
    'fresh-bunches': 1,
    'dried-catnip': 0,
    'catnip-bags': 0,
    'living-plants': 0,
  });

  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (orderPrefilledMessage) {
      setNotes(orderPrefilledMessage);
      // Auto-increment relevant catnip format if mentioned in note
      if (orderModalMode === 'catnip') {
        CATNIP_FORMATS.forEach((fmt) => {
          if (orderPrefilledMessage.toLowerCase().includes(fmt.name.toLowerCase())) {
            setCatnipQuantities((prev) => ({
              ...prev,
              [fmt.id]: Math.max(1, prev[fmt.id] || 1),
            }));
          }
        });
      }
    } else {
      setNotes('');
    }
  }, [orderPrefilledMessage, orderModalMode]);

  if (!isOrderModalOpen) return null;

  const isCatnipOnly = orderModalMode === 'catnip';

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const updateCatnipQty = (id: string, delta: number) => {
    setCatnipQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const availableExtras = produce.filter(p => p.status !== 'Out of stock' && p.id !== 'catnip');

  const generateOrderText = () => {
    if (isCatnipOnly) {
      let msg = `Hi Mike! 🐈 I would like to order fresh local catnip from your Noordhoek plot:\n\n`;
      
      const chosen = CATNIP_FORMATS
        .filter(f => (catnipQuantities[f.id] || 0) > 0)
        .map(f => `🐾 ${catnipQuantities[f.id]}x ${f.name}`);

      if (chosen.length > 0) {
        msg += `Items requested:\n${chosen.join('\n')}\n\n`;
      } else {
        msg += `Items: Inquiry about catnip availability\n\n`;
      }

      msg += `📍 Preference: ${fulfillment === 'pickup' ? 'Farm pickup in Noordhoek' : 'Delivery arrangement in Noordhoek'}\n`;
      if (customerName) {
        msg += `👤 Name: ${customerName}\n`;
      }
      if (notes) {
        msg += `📝 Note: ${notes}\n`;
      }
      msg += `\nPlease let me know when ready for collection or delivery. Thank you!`;
      return msg;
    }

    // Standard Vegetable Box Mode
    const extraNames = selectedExtras
      .map(id => produce.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    let msg = `Hi Mike! 👋 I would like to order fresh produce from your Noordhoek garden:\n\n`;
    if (boxQuantity > 0) {
      msg += `📦 ${boxQuantity}x Seasonal Veggie Box (R${settings.boxPrice * boxQuantity})\n`;
    }
    if (extraNames) {
      msg += `🌿 Extra additions requested: ${extraNames}\n`;
    }
    msg += `📍 Preference: ${fulfillment === 'pickup' ? 'Farm pickup in Noordhoek' : 'Delivery arrangement in Noordhoek'}\n`;
    if (customerName) {
      msg += `👤 Name: ${customerName}\n`;
    }
    if (notes) {
      msg += `📝 Note: ${notes}\n`;
    }
    msg += `\nPlease let me know your harvest schedule and availability. Thank you!`;
    return msg;
  };

  const handleWhatsAppOrder = () => {
    const message = generateOrderText();
    // Mike's verified phone number is +27 72 488 6140 -> 27724886140
    const rawNumber = settings.whatsAppNumber || '+27 72 488 6140';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '') || '27724886140';
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailOrder = () => {
    const message = generateOrderText();
    const email = settings.emailAddress && settings.emailAddress.includes('@') 
      ? settings.emailAddress 
      : 'orders@farmermikeproduce.co.za';
    const subject = encodeURIComponent(
      isCatnipOnly 
        ? `Catnip Order Inquiry — ${customerName || 'Noordhoek Customer'}`
        : `Seasonal Box Order — ${customerName || 'Noordhoek Customer'}`
    );
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const copyToClipboard = () => {
    const text = generateOrderText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-xl bg-[#FAF7F2] rounded-3xl border border-[#4D685A]/20 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Header */}
        <div className={`p-6 border-b border-stone-200 flex items-center justify-between ${
          isCatnipOnly ? 'bg-[#F2ECE0]' : 'bg-[#EAE4D7]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A2B] text-[#FAF7F2] flex items-center justify-center">
              {isCatnipOnly ? (
                <Sparkles className="w-5 h-5 text-[#E8B042]" />
              ) : (
                <Package className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1E3A2B]">
                {isCatnipOnly ? 'Order Fresh Catnip from Mike' : 'Order from Farmer Mike'}
              </h3>
              <p className="text-xs text-[#654E38]">
                {isCatnipOnly 
                  ? 'Pure Nepeta Cataria grown in Noordhoek • WhatsApp Mike' 
                  : 'Direct WhatsApp or email inquiry • No payment required now'}
              </p>
            </div>
          </div>

          <button
            onClick={closeOrderModal}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* CATNIP MODE SPECIFIC CONTENT */}
          {isCatnipOnly ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">Pure & Organically Grown:</strong> Hand-harvested Nepeta Cataria companion-planted right in our Noordhoek garden. Select the formats you’d like Mike to prepare for you:
                </div>
              </div>

              <div className="space-y-2.5">
                {CATNIP_FORMATS.map((fmt) => {
                  const qty = catnipQuantities[fmt.id] || 0;
                  return (
                    <div
                      key={fmt.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        qty > 0 
                          ? 'border-[#1E3A2B] bg-[#1E3A2B]/5' 
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <span className="font-serif font-bold text-sm text-stone-900 block">
                          {fmt.name}
                        </span>
                        <span className="text-[11px] text-stone-500 leading-tight">
                          {fmt.description}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateCatnipQty(fmt.id, -1)}
                          disabled={qty === 0}
                          className="w-7 h-7 rounded-lg bg-stone-200 hover:bg-stone-300 disabled:opacity-30 text-stone-800 flex items-center justify-center font-bold transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-serif font-bold text-base text-[#1E3A2B] w-5 text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCatnipQty(fmt.id, 1)}
                          className="w-7 h-7 rounded-lg bg-[#1E3A2B] hover:bg-[#14281E] text-white flex items-center justify-center font-bold transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* STANDARD VEGETABLE BOX MODE CONTENT */
            <>
              {/* Seasonal Box Selection */}
              <div className="p-4 rounded-2xl bg-[#F3EDE2] border border-[#4D685A]/15 flex items-center justify-between">
                <div>
                  <span className="font-serif font-bold text-stone-900 block text-base">
                    The Seasonal Box
                  </span>
                  <span className="text-xs text-stone-600">
                    Fresh mix of what's ripe and ready (R{settings.boxPrice} / box)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setBoxQuantity(Math.max(0, boxQuantity - 1))}
                    className="w-8 h-8 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 flex items-center justify-center font-bold transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-serif font-bold text-lg text-[#1E3A2B] w-6 text-center">
                    {boxQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBoxQuantity(boxQuantity + 1)}
                    className="w-8 h-8 rounded-lg bg-[#1E3A2B] hover:bg-[#15281D] text-[#FAF7F2] flex items-center justify-center font-bold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add extra crops */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Any specific extra bunches to inquire about? (optional)
                </label>
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
                  {availableExtras.map((item) => {
                    const isSelected = selectedExtras.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleExtra(item.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#1E3A2B] text-[#FAF7F2]'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Pickup vs Delivery (Shared) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Collection or Delivery
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFulfillment('pickup')}
                className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  fulfillment === 'pickup'
                    ? 'border-[#1E3A2B] bg-[#1E3A2B]/5 text-[#1E3A2B] font-semibold'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span className="block font-serif font-bold text-sm text-stone-900">
                  Local Farm Pickup
                </span>
                <span className="text-[11px] text-stone-500">
                  Pickup options available — ask Mike
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFulfillment('delivery')}
                className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  fulfillment === 'delivery'
                    ? 'border-[#1E3A2B] bg-[#1E3A2B]/5 text-[#1E3A2B] font-semibold'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span className="block font-serif font-bold text-sm text-stone-900">
                  Arrange Delivery
                </span>
                <span className="text-[11px] text-stone-500">
                  Delivery may be available locally — ask Mike
                </span>
              </button>
            </div>
          </div>

          {/* Name & Notes */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Sarah"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {isCatnipOnly ? 'Notes / Questions about Catnip' : 'Notes or Preferences'}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder={isCatnipOnly ? "e.g. My cat loves dried catnip, please let me know when ready!" : "e.g. Extra spinach if available, thanks!"}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A2B]"
              />
            </div>
          </div>

          {/* Generated Message Preview */}
          <div className="p-3.5 rounded-2xl bg-stone-100 border border-stone-200 text-xs">
            <div className="flex items-center justify-between text-stone-500 mb-1.5 font-medium">
              <span>Message Preview for Mike (+27 72 488 6140):</span>
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1 text-[11px] text-[#4D685A] hover:text-[#1E3A2B] cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? 'Copied!' : 'Copy text'}</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono text-stone-700 whitespace-pre-wrap leading-relaxed max-h-24 overflow-y-auto">
              {generateOrderText()}
            </pre>
          </div>

        </div>

        {/* Modal Footer / CTAs */}
        <div className="p-6 bg-[#FAF7F2] border-t border-stone-200 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleWhatsAppOrder}
            className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#1E3A2B] hover:bg-[#14281E] text-white font-semibold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#88A892]" />
            <span>ORDER ON WHATSAPP (+27 72 488 6140)</span>
          </button>

          <button
            type="button"
            onClick={handleEmailOrder}
            className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#EAE4D7] hover:bg-stone-300 text-stone-800 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Mail className="w-4 h-4 text-[#654E38]" />
            <span>EMAIL MIKE</span>
          </button>
        </div>

      </div>
    </div>
  );
};
