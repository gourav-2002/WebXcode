import type { Metadata } from 'next';
import FinanceFintech from './_components/FinanceFintech';

export const metadata: Metadata = {
  title: 'Finance & FinTech Web & Marketing Agency | WebXCode',
  description:
    'Build enterprise trust and drive compliant user acquisition with secure fintech web applications, institutional SEO, and AI customer support.',
  alternates: {
    canonical: 'https://webxcode.in/industries/finance-fintech',
  },
  openGraph: {
    title: 'Finance & FinTech Web & Marketing Agency | WebXCode',
    description:
      'Build enterprise trust and drive compliant user acquisition with secure fintech web applications, institutional SEO, and AI customer support.',
    url: 'https://webxcode.in/industries/finance-fintech',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Finance & FinTech Web & Marketing Agency | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance & FinTech Web & Marketing Agency | WebXCode',
    description:
      'Build enterprise trust and drive compliant user acquisition with secure fintech web applications, institutional SEO, and AI customer support.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/industries/finance-fintech#webpage',
  url: 'https://webxcode.in/industries/finance-fintech',
  name: 'Finance & FinTech Web & Marketing Agency | WebXCode',
  description:
    'Build enterprise trust and drive compliant user acquisition with secure fintech web applications, institutional SEO, and AI customer support.',
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
      <FinanceFintech />
    </>
  );
}
