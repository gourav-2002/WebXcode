'use client';

import { Navbar } from './Navbar';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';

export default function NavbarClient() {
  const { openQuoteModal } = useQuoteModal();
  return <Navbar onOpenQuoteModal={openQuoteModal} />;
}
