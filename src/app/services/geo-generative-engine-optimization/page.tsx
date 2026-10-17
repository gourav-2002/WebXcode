import type { Metadata } from 'next';
import GeoServices from './_components/GeoServices';

export const metadata: Metadata = {
  title: 'GEO Services – Generative Engine Optimization | WebXCode',
  description:
    'Ensure your brand is cited and recommended when potential customers query ChatGPT, Perplexity, Gemini, and Claude.',
  alternates: {
    canonical: 'https://webxcode.in/services/geo-generative-engine-optimization',
  },
  openGraph: {
    title: 'GEO Services – Generative Engine Optimization | WebXCode',
    description:
      'Ensure your brand is cited and recommended when potential customers query ChatGPT, Perplexity, Gemini, and Claude.',
    url: 'https://webxcode.in/services/geo-generative-engine-optimization',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GEO Services – Generative Engine Optimization | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEO Services – Generative Engine Optimization | WebXCode',
    description:
      'Ensure your brand is cited and recommended when potential customers query ChatGPT, Perplexity, Gemini, and Claude.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/geo-generative-engine-optimization#webpage',
  url: 'https://webxcode.in/services/geo-generative-engine-optimization',
  name: 'GEO Services – Generative Engine Optimization | WebXCode',
  description:
    'Ensure your brand is cited and recommended when potential customers query ChatGPT, Perplexity, Gemini, and Claude.',
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
      <GeoServices />
    </>
  );
}
