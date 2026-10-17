import type { Metadata } from 'next';
import PerformanceMarketing from './_components/PerformanceMarketing';

export const metadata: Metadata = {
  title: 'Performance Marketing Agency | Meta & Google Ads | WebXCode',
  description:
    'ROI-focused paid customer acquisition across Meta Ads, Google Ads, and LinkedIn with continuous testing and CAC reduction.',
  alternates: {
    canonical: 'https://webxcode.in/services/performance-marketing',
  },
  openGraph: {
    title: 'Performance Marketing Agency | Meta & Google Ads | WebXCode',
    description:
      'ROI-focused paid customer acquisition across Meta Ads, Google Ads, and LinkedIn with continuous testing and CAC reduction.',
    url: 'https://webxcode.in/services/performance-marketing',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Performance Marketing Agency | Meta & Google Ads | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performance Marketing Agency | Meta & Google Ads | WebXCode',
    description:
      'ROI-focused paid customer acquisition across Meta Ads, Google Ads, and LinkedIn with continuous testing and CAC reduction.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/performance-marketing#webpage',
  url: 'https://webxcode.in/services/performance-marketing',
  name: 'Performance Marketing Agency | Meta & Google Ads | WebXCode',
  description:
    'ROI-focused paid customer acquisition across Meta Ads, Google Ads, and LinkedIn with continuous testing and CAC reduction.',
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
      <PerformanceMarketing />
    </>
  );
}
