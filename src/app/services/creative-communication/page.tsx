import type { Metadata } from 'next';
import CreativeCommunication from './_components/CreativeCommunication';

export const metadata: Metadata = {
  title: 'Creative Communication & Design Services | WebXCode',
  description:
    'Visual storytelling, brand campaigns, pitch decks, and digital creative assets crafted to command attention across touchpoints.',
  alternates: {
    canonical: 'https://webxcode.in/services/creative-communication',
  },
  openGraph: {
    title: 'Creative Communication & Design Services | WebXCode',
    description:
      'Visual storytelling, brand campaigns, pitch decks, and digital creative assets crafted to command attention across touchpoints.',
    url: 'https://webxcode.in/services/creative-communication',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Creative Communication & Design Services | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Communication & Design Services | WebXCode',
    description:
      'Visual storytelling, brand campaigns, pitch decks, and digital creative assets crafted to command attention across touchpoints.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/creative-communication#webpage',
  url: 'https://webxcode.in/services/creative-communication',
  name: 'Creative Communication & Design Services | WebXCode',
  description:
    'Visual storytelling, brand campaigns, pitch decks, and digital creative assets crafted to command attention across touchpoints.',
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
      <CreativeCommunication />
    </>
  );
}
