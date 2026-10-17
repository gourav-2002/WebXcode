import type { Metadata } from 'next';
import Industries from './_components/Industries';

export const metadata: Metadata = {
  title: 'Industries We Serve | WebXCode',
  description:
    'Explore industry-specific digital solutions engineered by WebXCode — from B2B SaaS, E-commerce, and FinTech to Healthcare, EdTech, and Manufacturing.',
  alternates: {
    canonical: 'https://webxcode.in/industries',
  },
  openGraph: {
    title: 'Industries We Serve | WebXCode',
    description:
      'Explore industry-specific digital solutions engineered by WebXCode — from B2B SaaS, E-commerce, and FinTech to Healthcare, EdTech, and Manufacturing.',
    url: 'https://webxcode.in/industries',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebXCode Industries',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries We Serve | WebXCode',
    description:
      'Tailored digital marketing, web engineering, and AI automation for specialized industry verticals.',
    images: ['/og-image.jpg'],
  },
};

const industriesSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/industries#webpage',
  url: 'https://webxcode.in/industries',
  name: 'Industries We Serve | WebXCode',
  description:
    'Explore industry-specific digital solutions engineered by WebXCode — from B2B SaaS, E-commerce, and FinTech to Healthcare, EdTech, and Manufacturing.',
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://webxcode.in/#website',
    name: 'WebXCode',
    url: 'https://webxcode.in',
  },
  about: {
    '@type': 'Organization',
    '@id': 'https://webxcode.in/#organization',
    name: 'WebXCode',
  },
};

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industriesSchema) }}
      />
      <Industries />
    </>
  );
}
