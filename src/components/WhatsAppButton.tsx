import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  onOpenQuoteModal?: (service?: string) => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ onOpenQuoteModal }) => {
  const triggerQuoteModal = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: service }));
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        type="button"
        aria-label="Chat with WebXCode on WhatsApp"
        onClick={() => triggerQuoteModal('WhatsApp Instant Consultation')}
        className="px-4 py-3 rounded-full bg-primary text-white font-bold text-[13px] shadow-xl hover:bg-primary-700 transition-all flex items-center gap-2 cursor-pointer"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
