import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm & Update',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] rounded-2xl border border-[#4D685A]/20 shadow-2xl overflow-hidden p-6 text-stone-900 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl flex-shrink-0 ${isDestructive ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-[#1E3A2B]'}`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 id="dialog-title" className="font-serif text-xl font-bold text-[#1E3A2B]">
              {title}
            </h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors text-sm font-medium flex items-center gap-1.5 cursor-pointer"
          >
            <X className="w-4 h-4" />
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl text-white text-sm font-medium flex items-center gap-1.5 shadow-xs cursor-pointer transition-all ${
              isDestructive 
                ? 'bg-amber-700 hover:bg-amber-800' 
                : 'bg-[#1E3A2B] hover:bg-[#15291E]'
            }`}
          >
            <Check className="w-4 h-4" />
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
