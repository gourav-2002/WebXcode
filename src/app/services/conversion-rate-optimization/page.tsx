import type { Metadata } from 'next';
import ConversionRateOptimization from './_components/ConversionRateOptimization';

export const metadata: Metadata = {
  title: 'Conversion Rate Optimization (CRO) Services | WebXCode',
  description:
    'Turn more of your current traffic into paying customers through A/B testing, heatmap analysis, copy redesign, and checkout optimization.',
  alternates: {
    canonical: 'https://webxcode.in/services/conversion-rate-optimization',
  },
  openGraph: {
    title: 'Conversion Rate Optimization (CRO) Services | WebXCode',
    description:
      'Turn more of your current traffic into paying customers through A/B testing, heatmap analysis, copy redesign, and checkout optimization.',
    url: 'https://webxcode.in/services/conversion-rate-optimization',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Conversion Rate Optimization (CRO) Services | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conversion Rate Optimization (CRO) Services | WebXCode',
    description:
      'Turn more of your current traffic into paying customers through A/B testing, heatmap analysis, copy redesign, and checkout optimization.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/conversion-rate-optimization#webpage',
  url: 'https://webxcode.in/services/conversion-rate-optimization',
  name: 'Conversion Rate Optimization (CRO) Services | WebXCode',
  description:
    'Turn more of your current traffic into paying customers through A/B testing, heatmap analysis, copy redesign, and checkout optimization.',
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
      <ConversionRateOptimization />
    </>
  );
}
