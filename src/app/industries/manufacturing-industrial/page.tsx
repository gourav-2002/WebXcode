import type { Metadata } from 'next';
import ManufacturingIndustrial from './_components/ManufacturingIndustrial';

export const metadata: Metadata = {
  title: 'Manufacturing & Industrial Digital Agency | WebXCode',
  description:
    'Modernize industrial websites, showcase comprehensive B2B product catalogs, generate distributor RFQs, and automate sales pipeline follow-ups.',
  alternates: {
    canonical: 'https://webxcode.in/industries/manufacturing-industrial',
  },
  openGraph: {
    title: 'Manufacturing & Industrial Digital Agency | WebXCode',
    description:
      'Modernize industrial websites, showcase comprehensive B2B product catalogs, generate distributor RFQs, and automate sales pipeline follow-ups.',
    url: 'https://webxcode.in/industries/manufacturing-industrial',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Manufacturing & Industrial Digital Agency | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manufacturing & Industrial Digital Agency | WebXCode',
    description:
      'Modernize industrial websites, showcase comprehensive B2B product catalogs, generate distributor RFQs, and automate sales pipeline follow-ups.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/industries/manufacturing-industrial#webpage',
  url: 'https://webxcode.in/industries/manufacturing-industrial',
  name: 'Manufacturing & Industrial Digital Agency | WebXCode',
  description:
    'Modernize industrial websites, showcase comprehensive B2B product catalogs, generate distributor RFQs, and automate sales pipeline follow-ups.',
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
      <ManufacturingIndustrial />
    </>
  );
}
