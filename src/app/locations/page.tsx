import type { Metadata } from 'next';
import Locations from './_components/Locations';

export const metadata: Metadata = {
  title: 'Our Office Locations & Regional Hubs | WebXCode',
  description:
    'Explore WebXCode regional offices and digital delivery centers in Delhi NCR, Mumbai, and Bengaluru. Local teams delivering enterprise web development, SEO, and AI solutions.',
  alternates: {
    canonical: 'https://webxcode.in/locations',
  },
  openGraph: {
    title: 'Our Office Locations & Regional Hubs | WebXCode',
    description:
      'Explore WebXCode regional offices and digital delivery centers in Delhi NCR, Mumbai, and Bengaluru.',
    url: 'https://webxcode.in/locations',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebXCode Locations',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Office Locations & Regional Hubs | WebXCode',
    description:
      'WebXCode regional hubs across Delhi NCR, Mumbai, and Bengaluru.',
    images: ['/og-image.jpg'],
  },
};

const locationsSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/locations#webpage',
  url: 'https://webxcode.in/locations',
  name: 'Our Office Locations & Regional Hubs | WebXCode',
  description:
    'Explore WebXCode regional offices and digital delivery centers in Delhi NCR, Mumbai, and Bengaluru.',
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

export default function LocationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsSchema) }}
      />
      <Locations />
    </>
  );
}
