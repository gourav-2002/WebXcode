import type { Metadata } from 'next';
import InteriorDesignArchitecture from './_components/InteriorDesignArchitecture';

export const metadata: Metadata = {
  title: 'Interior Design & Architecture Agency | WebXCode',
  description:
    'Win high-ticket residential and commercial commissions with ultra-sleek portfolio design, editorial visual branding, and local search dominance.',
  alternates: {
    canonical: 'https://webxcode.in/industries/interior-design-architecture',
  },
  openGraph: {
    title: 'Interior Design & Architecture Agency | WebXCode',
    description:
      'Win high-ticket residential and commercial commissions with ultra-sleek portfolio design, editorial visual branding, and local search dominance.',
    url: 'https://webxcode.in/industries/interior-design-architecture',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Interior Design & Architecture Agency | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interior Design & Architecture Agency | WebXCode',
    description:
      'Win high-ticket residential and commercial commissions with ultra-sleek portfolio design, editorial visual branding, and local search dominance.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/industries/interior-design-architecture#webpage',
  url: 'https://webxcode.in/industries/interior-design-architecture',
  name: 'Interior Design & Architecture Agency | WebXCode',
  description:
    'Win high-ticket residential and commercial commissions with ultra-sleek portfolio design, editorial visual branding, and local search dominance.',
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
      <InteriorDesignArchitecture />
    </>
  );
}
