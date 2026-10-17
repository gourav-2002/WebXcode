import type { Metadata } from 'next';
import AeoServices from './_components/AeoServices';

export const metadata: Metadata = {
  title: 'AEO Services – Answer Engine Optimization | WebXCode',
  description:
    'Format and structure your digital content to win direct answer boxes, featured snippets, and voice assistant responses.',
  alternates: {
    canonical: 'https://webxcode.in/services/aeo-services',
  },
  openGraph: {
    title: 'AEO Services – Answer Engine Optimization | WebXCode',
    description:
      'Format and structure your digital content to win direct answer boxes, featured snippets, and voice assistant responses.',
    url: 'https://webxcode.in/services/aeo-services',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AEO Services – Answer Engine Optimization | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AEO Services – Answer Engine Optimization | WebXCode',
    description:
      'Format and structure your digital content to win direct answer boxes, featured snippets, and voice assistant responses.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/aeo-services#webpage',
  url: 'https://webxcode.in/services/aeo-services',
  name: 'AEO Services – Answer Engine Optimization | WebXCode',
  description:
    'Format and structure your digital content to win direct answer boxes, featured snippets, and voice assistant responses.',
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
      <AeoServices />
    </>
  );
}
