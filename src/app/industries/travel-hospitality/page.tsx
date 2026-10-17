import type { Metadata } from 'next';
import TravelHospitality from './_components/TravelHospitality';

export const metadata: Metadata = {
  title: 'Travel & Hospitality Marketing & Booking Agency | WebXCode',
  description:
    'Cut OTA commission dependency with lightning-fast direct booking engines, resort marketing, local tourism SEO, and 24/7 AI guest concierges.',
  alternates: {
    canonical: 'https://webxcode.in/industries/travel-hospitality',
  },
  openGraph: {
    title: 'Travel & Hospitality Marketing & Booking Agency | WebXCode',
    description:
      'Cut OTA commission dependency with lightning-fast direct booking engines, resort marketing, local tourism SEO, and 24/7 AI guest concierges.',
    url: 'https://webxcode.in/industries/travel-hospitality',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Travel & Hospitality Marketing & Booking Agency | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel & Hospitality Marketing & Booking Agency | WebXCode',
    description:
      'Cut OTA commission dependency with lightning-fast direct booking engines, resort marketing, local tourism SEO, and 24/7 AI guest concierges.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/industries/travel-hospitality#webpage',
  url: 'https://webxcode.in/industries/travel-hospitality',
  name: 'Travel & Hospitality Marketing & Booking Agency | WebXCode',
  description:
    'Cut OTA commission dependency with lightning-fast direct booking engines, resort marketing, local tourism SEO, and 24/7 AI guest concierges.',
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <TravelHospitality />
    </>
  );
}
