import type { Metadata } from 'next';
import FashionLifestyle from './_components/FashionLifestyle';

export const metadata: Metadata = {
  title: 'Fashion & Lifestyle Brand Agency | WebXCode',
  description:
    'Launch and scale luxury lifestyle e-commerce experiences with bespoke branding, high-speed storefronts, visual storytelling, and paid social campaigns.',
  alternates: {
    canonical: 'https://webxcode.in/industries/fashion-lifestyle',
  },
  openGraph: {
    title: 'Fashion & Lifestyle Brand Agency | WebXCode',
    description:
      'Launch and scale luxury lifestyle e-commerce experiences with bespoke branding, high-speed storefronts, visual storytelling, and paid social campaigns.',
    url: 'https://webxcode.in/industries/fashion-lifestyle',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fashion & Lifestyle Brand Agency | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fashion & Lifestyle Brand Agency | WebXCode',
    description:
      'Launch and scale luxury lifestyle e-commerce experiences with bespoke branding, high-speed storefronts, visual storytelling, and paid social campaigns.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/industries/fashion-lifestyle#webpage',
  url: 'https://webxcode.in/industries/fashion-lifestyle',
  name: 'Fashion & Lifestyle Brand Agency | WebXCode',
  description:
    'Launch and scale luxury lifestyle e-commerce experiences with bespoke branding, high-speed storefronts, visual storytelling, and paid social campaigns.',
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
      <FashionLifestyle />
    </>
  );
}
