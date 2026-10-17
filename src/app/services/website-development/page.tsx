import type { Metadata } from 'next';
import WebsiteDevelopment from './_components/WebsiteDevelopment';

export const metadata: Metadata = {
  title: 'Website Development Company | WebXCode',
  description:
    'Custom high-performance corporate websites, SaaS web apps, and landing pages built with clean code, sub-2s speed, and high-converting UX.',
  alternates: {
    canonical: 'https://webxcode.in/services/website-development',
  },
  openGraph: {
    title: 'Website Development Company | WebXCode',
    description:
      'Custom high-performance corporate websites, SaaS web apps, and landing pages built with clean code, sub-2s speed, and high-converting UX.',
    url: 'https://webxcode.in/services/website-development',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Website Development Company | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Development Company | WebXCode',
    description:
      'Custom high-performance corporate websites, SaaS web apps, and landing pages built with clean code, sub-2s speed, and high-converting UX.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/website-development#webpage',
  url: 'https://webxcode.in/services/website-development',
  name: 'Website Development Company | WebXCode',
  description:
    'Custom high-performance corporate websites, SaaS web apps, and landing pages built with clean code, sub-2s speed, and high-converting UX.',
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
      <WebsiteDevelopment />
    </>
  );
}
