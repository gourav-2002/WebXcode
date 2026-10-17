import type { Metadata } from 'next';
import SkincareBeauty from './_components/SkincareBeauty';

export const metadata: Metadata = {
  title: 'Skincare & Beauty D2C Digital Agency | WebXCode',
  description:
    'Accelerate repeat purchases and DTC brand loyalty with custom Shopify experiences, viral creative advertising, and personalized skincare routine quizzes.',
  alternates: {
    canonical: 'https://webxcode.in/industries/skincare-beauty',
  },
  openGraph: {
    title: 'Skincare & Beauty D2C Digital Agency | WebXCode',
    description:
      'Accelerate repeat purchases and DTC brand loyalty with custom Shopify experiences, viral creative advertising, and personalized skincare routine quizzes.',
    url: 'https://webxcode.in/industries/skincare-beauty',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Skincare & Beauty D2C Digital Agency | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skincare & Beauty D2C Digital Agency | WebXCode',
    description:
      'Accelerate repeat purchases and DTC brand loyalty with custom Shopify experiences, viral creative advertising, and personalized skincare routine quizzes.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/industries/skincare-beauty#webpage',
  url: 'https://webxcode.in/industries/skincare-beauty',
  name: 'Skincare & Beauty D2C Digital Agency | WebXCode',
  description:
    'Accelerate repeat purchases and DTC brand loyalty with custom Shopify experiences, viral creative advertising, and personalized skincare routine quizzes.',
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
      <SkincareBeauty />
    </>
  );
}
