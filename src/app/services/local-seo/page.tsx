import type { Metadata } from 'next';
import LocalSeo from './_components/LocalSeo';

export const metadata: Metadata = {
  title: 'Local SEO Services & Google Business Profile Optimization | WebXCode',
  description:
    'Dominate local Google 3-Pack rankings, optimize Google Business Profile, and capture high-intent geographic customers in your city.',
  alternates: {
    canonical: 'https://webxcode.in/services/local-seo',
  },
  openGraph: {
    title: 'Local SEO Services & Google Business Profile Optimization | WebXCode',
    description:
      'Dominate local Google 3-Pack rankings, optimize Google Business Profile, and capture high-intent geographic customers in your city.',
    url: 'https://webxcode.in/services/local-seo',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Local SEO Services & Google Business Profile Optimization | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Local SEO Services & Google Business Profile Optimization | WebXCode',
    description:
      'Dominate local Google 3-Pack rankings, optimize Google Business Profile, and capture high-intent geographic customers in your city.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/local-seo#webpage',
  url: 'https://webxcode.in/services/local-seo',
  name: 'Local SEO Services & Google Business Profile Optimization | WebXCode',
  description:
    'Dominate local Google 3-Pack rankings, optimize Google Business Profile, and capture high-intent geographic customers in your city.',
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
      <LocalSeo />
    </>
  );
}
