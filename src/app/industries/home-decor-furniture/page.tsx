import type { Metadata } from 'next';
import HomeDecorFurniture from './_components/HomeDecorFurniture';

export const metadata: Metadata = {
  title: 'Home Decor & Furniture Digital Agency | WebXCode',
  description:
    'Inspire buyers with immersive catalog websites, 3D visualizers, local showroom SEO, and conversion-optimized Google Shopping campaigns.',
  alternates: {
    canonical: 'https://webxcode.in/industries/home-decor-furniture',
  },
  openGraph: {
    title: 'Home Decor & Furniture Digital Agency | WebXCode',
    description:
      'Inspire buyers with immersive catalog websites, 3D visualizers, local showroom SEO, and conversion-optimized Google Shopping campaigns.',
    url: 'https://webxcode.in/industries/home-decor-furniture',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Home Decor & Furniture Digital Agency | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Decor & Furniture Digital Agency | WebXCode',
    description:
      'Inspire buyers with immersive catalog websites, 3D visualizers, local showroom SEO, and conversion-optimized Google Shopping campaigns.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/industries/home-decor-furniture#webpage',
  url: 'https://webxcode.in/industries/home-decor-furniture',
  name: 'Home Decor & Furniture Digital Agency | WebXCode',
  description:
    'Inspire buyers with immersive catalog websites, 3D visualizers, local showroom SEO, and conversion-optimized Google Shopping campaigns.',
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
      <HomeDecorFurniture />
    </>
  );
}
