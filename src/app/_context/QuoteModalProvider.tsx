'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface QuoteModalContextType {
  quoteModalOpen: boolean;
  selectedService: string;
  openQuoteModal: (service?: string) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | null>(null);

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error('useQuoteModal must be used inside QuoteModalProvider');
  return ctx;
}

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Website Development');

  const openQuoteModal = useCallback((service?: string) => {
    if (service) setSelectedService(service);
    setQuoteModalOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setQuoteModalOpen(false);
  }, []);

  // Support legacy window event from existing page components
  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string | undefined>;
      openQuoteModal(customEvent.detail);
    };
    window.addEventListener('open-quote-modal', handleCustomEvent);
    return () => window.removeEventListener('open-quote-modal', handleCustomEvent);
  }, [openQuoteModal]);

  return (
    <QuoteModalContext.Provider
      value={{ quoteModalOpen, selectedService, openQuoteModal, closeQuoteModal }}
    >
      {children}
    </QuoteModalContext.Provider>
  );
}
