import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import './globals.css';
import { QuoteModalProvider } from './_context/QuoteModalProvider';
import NavbarWrapper from './_components/NavbarWrapper';
import FooterWrapper from './_components/FooterWrapper';

// ─── Google Fonts ────────────────────────────────────────────────────────────
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// ─── Root Metadata ───────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'WebXCode – Digital Marketing & AI Solutions Agency',
    template: '%s | WebXCode',
  },
  description:
    'WebXCode is a full-service digital marketing and AI solutions agency. We specialise in website development, SEO, performance marketing, AI chatbots, and more.',
  metadataBase: new URL('https://webxcode.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'WebXCode',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${caveat.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-navy antialiased">
        <QuoteModalProvider>
          {/* Navbar */}
          <NavbarWrapper />

          {/* Page content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <FooterWrapper />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
