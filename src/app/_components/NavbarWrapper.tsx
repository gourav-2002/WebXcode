'use client';

import Navbar from '@/components/Navbar';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';

export default function NavbarWrapper() {
  const { openQuoteModal } = useQuoteModal();
  return <Navbar onOpenQuoteModal={openQuoteModal} />;
}
