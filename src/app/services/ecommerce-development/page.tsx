import type { Metadata } from 'next';
import EcommerceDevelopment from './_components/EcommerceDevelopment';

export const metadata: Metadata = {
  title: 'E-commerce Development Services | Shopify & Custom | WebXCode',
  description:
    'Scalable online store development across Shopify, WooCommerce, and headless commerce with frictionless checkout and high mobile conversion rates.',
  alternates: {
    canonical: 'https://webxcode.in/services/ecommerce-development',
  },
  openGraph: {
    title: 'E-commerce Development Services | Shopify & Custom | WebXCode',
    description:
      'Scalable online store development across Shopify, WooCommerce, and headless commerce with frictionless checkout and high mobile conversion rates.',
    url: 'https://webxcode.in/services/ecommerce-development',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'E-commerce Development Services | Shopify & Custom | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-commerce Development Services | Shopify & Custom | WebXCode',
    description:
      'Scalable online store development across Shopify, WooCommerce, and headless commerce with frictionless checkout and high mobile conversion rates.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/ecommerce-development#webpage',
  url: 'https://webxcode.in/services/ecommerce-development',
  name: 'E-commerce Development Services | Shopify & Custom | WebXCode',
  description:
    'Scalable online store development across Shopify, WooCommerce, and headless commerce with frictionless checkout and high mobile conversion rates.',
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
      <EcommerceDevelopment />
    </>
  );
}
