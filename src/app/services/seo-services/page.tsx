import type { Metadata } from 'next';
import SeoServices from './_components/SeoServices';

export const metadata: Metadata = {
  title: 'SEO Services & Search Engine Optimization | WebXCode',
  description:
    'Technical SEO audits, topical authority content clusters, and authoritative link acquisition to rank #1 on Google for high-intent keywords.',
  alternates: {
    canonical: 'https://webxcode.in/services/seo-services',
  },
  openGraph: {
    title: 'SEO Services & Search Engine Optimization | WebXCode',
    description:
      'Technical SEO audits, topical authority content clusters, and authoritative link acquisition to rank #1 on Google for high-intent keywords.',
    url: 'https://webxcode.in/services/seo-services',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SEO Services & Search Engine Optimization | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Services & Search Engine Optimization | WebXCode',
    description:
      'Technical SEO audits, topical authority content clusters, and authoritative link acquisition to rank #1 on Google for high-intent keywords.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/seo-services#webpage',
  url: 'https://webxcode.in/services/seo-services',
  name: 'SEO Services & Search Engine Optimization | WebXCode',
  description:
    'Technical SEO audits, topical authority content clusters, and authoritative link acquisition to rank #1 on Google for high-intent keywords.',
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
      <SeoServices />
    </>
  );
}
