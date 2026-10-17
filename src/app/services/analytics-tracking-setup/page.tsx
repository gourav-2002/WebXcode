import type { Metadata } from 'next';
import AnalyticsTrackingSetup from './_components/AnalyticsTrackingSetup';

export const metadata: Metadata = {
  title: 'Analytics & Tracking Setup (GA4, GTM, CAPI) | WebXCode',
  description:
    'Flawless server-side GA4 setup, Google Tag Manager implementation, Meta Conversions API (CAPI), and custom looker studio dashboards.',
  alternates: {
    canonical: 'https://webxcode.in/services/analytics-tracking-setup',
  },
  openGraph: {
    title: 'Analytics & Tracking Setup (GA4, GTM, CAPI) | WebXCode',
    description:
      'Flawless server-side GA4 setup, Google Tag Manager implementation, Meta Conversions API (CAPI), and custom looker studio dashboards.',
    url: 'https://webxcode.in/services/analytics-tracking-setup',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Analytics & Tracking Setup (GA4, GTM, CAPI) | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Analytics & Tracking Setup (GA4, GTM, CAPI) | WebXCode',
    description:
      'Flawless server-side GA4 setup, Google Tag Manager implementation, Meta Conversions API (CAPI), and custom looker studio dashboards.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/analytics-tracking-setup#webpage',
  url: 'https://webxcode.in/services/analytics-tracking-setup',
  name: 'Analytics & Tracking Setup (GA4, GTM, CAPI) | WebXCode',
  description:
    'Flawless server-side GA4 setup, Google Tag Manager implementation, Meta Conversions API (CAPI), and custom looker studio dashboards.',
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
      <AnalyticsTrackingSetup />
    </>
  );
}
