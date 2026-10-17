import type { Metadata } from 'next';
import AiAnalyticsReporting from './_components/AiAnalyticsReporting';

export const metadata: Metadata = {
  title: 'AI Analytics & Automated Executive Reporting | WebXCode',
  description:
    'Turn multi-channel marketing and product data into real-time executive dashboards, automated anomaly alerts, and natural-language revenue insights.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions/ai-analytics-reporting',
  },
  openGraph: {
    title: 'AI Analytics & Automated Executive Reporting | WebXCode',
    description:
      'Turn multi-channel marketing and product data into real-time executive dashboards, automated anomaly alerts, and natural-language revenue insights.',
    url: 'https://webxcode.in/ai-solutions/ai-analytics-reporting',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Analytics & Automated Executive Reporting | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Analytics & Automated Executive Reporting | WebXCode',
    description:
      'Turn multi-channel marketing and product data into real-time executive dashboards, automated anomaly alerts, and natural-language revenue insights.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions/ai-analytics-reporting#webpage',
  url: 'https://webxcode.in/ai-solutions/ai-analytics-reporting',
  name: 'AI Analytics & Automated Executive Reporting | WebXCode',
  description:
    'Turn multi-channel marketing and product data into real-time executive dashboards, automated anomaly alerts, and natural-language revenue insights.',
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
      <AiAnalyticsReporting />
    </>
  );
}
