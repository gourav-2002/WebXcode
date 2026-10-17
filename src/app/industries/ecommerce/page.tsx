import type { Metadata } from 'next';
import Ecommerce from './_components/Ecommerce';

export const metadata: Metadata = {
  title: 'E-commerce Growth & Development Agency | WebXCode',
  description:
    'Scale your online store with Shopify / WooCommerce engineering, CRO audits, high-ROAS performance marketing, and AI shopping assistants.',
  alternates: {
    canonical: 'https://webxcode.in/industries/ecommerce',
  },
  openGraph: {
    title: 'E-commerce Growth & Development Agency | WebXCode',
    description:
      'Scale your online store with Shopify / WooCommerce engineering, CRO audits, high-ROAS performance marketing, and AI shopping assistants.',
    url: 'https://webxcode.in/industries/ecommerce',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'E-commerce Growth & Development Agency | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-commerce Growth & Development Agency | WebXCode',
    description:
      'Scale your online store with Shopify / WooCommerce engineering, CRO audits, high-ROAS performance marketing, and AI shopping assistants.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/industries/ecommerce#webpage',
  url: 'https://webxcode.in/industries/ecommerce',
  name: 'E-commerce Growth & Development Agency | WebXCode',
  description:
    'Scale your online store with Shopify / WooCommerce engineering, CRO audits, high-ROAS performance marketing, and AI shopping assistants.',
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
      <Ecommerce />
    </>
  );
}
