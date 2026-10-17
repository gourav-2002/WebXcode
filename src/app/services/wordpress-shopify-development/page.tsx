import type { Metadata } from 'next';
import WordpressShopifyDevelopment from './_components/WordpressShopifyDevelopment';

export const metadata: Metadata = {
  title: 'WordPress & Shopify Development Agency | WebXCode',
  description:
    'Bespoke WordPress CMS themes and headless Shopify builds engineered for marketing flexibility, security, and lightning speed.',
  alternates: {
    canonical: 'https://webxcode.in/services/wordpress-shopify-development',
  },
  openGraph: {
    title: 'WordPress & Shopify Development Agency | WebXCode',
    description:
      'Bespoke WordPress CMS themes and headless Shopify builds engineered for marketing flexibility, security, and lightning speed.',
    url: 'https://webxcode.in/services/wordpress-shopify-development',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WordPress & Shopify Development Agency | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordPress & Shopify Development Agency | WebXCode',
    description:
      'Bespoke WordPress CMS themes and headless Shopify builds engineered for marketing flexibility, security, and lightning speed.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/wordpress-shopify-development#webpage',
  url: 'https://webxcode.in/services/wordpress-shopify-development',
  name: 'WordPress & Shopify Development Agency | WebXCode',
  description:
    'Bespoke WordPress CMS themes and headless Shopify builds engineered for marketing flexibility, security, and lightning speed.',
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
      <WordpressShopifyDevelopment />
    </>
  );
}
