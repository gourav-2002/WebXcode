import type { Metadata } from 'next';
import Copywriting from './_components/Copywriting';

export const metadata: Metadata = {
  title: 'Conversion Copywriting Services | WebXCode',
  description:
    'High-converting website copy, sales letters, email flows, and video scripts crafted with behavioral psychology and buyer empathy.',
  alternates: {
    canonical: 'https://webxcode.in/services/copywriting',
  },
  openGraph: {
    title: 'Conversion Copywriting Services | WebXCode',
    description:
      'High-converting website copy, sales letters, email flows, and video scripts crafted with behavioral psychology and buyer empathy.',
    url: 'https://webxcode.in/services/copywriting',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Conversion Copywriting Services | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conversion Copywriting Services | WebXCode',
    description:
      'High-converting website copy, sales letters, email flows, and video scripts crafted with behavioral psychology and buyer empathy.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/copywriting#webpage',
  url: 'https://webxcode.in/services/copywriting',
  name: 'Conversion Copywriting Services | WebXCode',
  description:
    'High-converting website copy, sales letters, email flows, and video scripts crafted with behavioral psychology and buyer empathy.',
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
      <Copywriting />
    </>
  );
}
