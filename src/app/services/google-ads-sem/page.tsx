import type { Metadata } from 'next';
import GoogleAds from './_components/GoogleAds';

export const metadata: Metadata = {
  title: 'Google Ads & SEM Management Services | WebXCode',
  description:
    'High-intent search, Shopping, and Performance Max ad campaigns configured with negative keyword hygiene and accurate revenue tracking.',
  alternates: {
    canonical: 'https://webxcode.in/services/google-ads-sem',
  },
  openGraph: {
    title: 'Google Ads & SEM Management Services | WebXCode',
    description:
      'High-intent search, Shopping, and Performance Max ad campaigns configured with negative keyword hygiene and accurate revenue tracking.',
    url: 'https://webxcode.in/services/google-ads-sem',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Google Ads & SEM Management Services | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads & SEM Management Services | WebXCode',
    description:
      'High-intent search, Shopping, and Performance Max ad campaigns configured with negative keyword hygiene and accurate revenue tracking.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/google-ads-sem#webpage',
  url: 'https://webxcode.in/services/google-ads-sem',
  name: 'Google Ads & SEM Management Services | WebXCode',
  description:
    'High-intent search, Shopping, and Performance Max ad campaigns configured with negative keyword hygiene and accurate revenue tracking.',
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
      <GoogleAds />
    </>
  );
}
