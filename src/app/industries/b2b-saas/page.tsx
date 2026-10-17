import type { Metadata } from 'next';
import B2BSaaS from './_components/B2BSaaS';

export const metadata: Metadata = {
  title: 'B2B & SaaS Digital Agency | WebXCode',
  description:
    'Turn your B2B website into a customer acquisition pipeline machine. High-converting SaaS marketing websites, technical SEO, and AI lead qualification bots.',
  alternates: {
    canonical: 'https://webxcode.in/industries/b2b-saas',
  },
  openGraph: {
    title: 'B2B & SaaS Digital Agency | WebXCode',
    description:
      'Turn your B2B website into a customer acquisition pipeline machine. High-converting SaaS marketing websites, technical SEO, and AI lead qualification bots.',
    url: 'https://webxcode.in/industries/b2b-saas',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B2B & SaaS Digital Agency | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B & SaaS Digital Agency | WebXCode',
    description:
      'Turn your B2B website into a customer acquisition pipeline machine. High-converting SaaS marketing websites, technical SEO, and AI lead qualification bots.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/industries/b2b-saas#webpage',
  url: 'https://webxcode.in/industries/b2b-saas',
  name: 'B2B & SaaS Digital Agency | WebXCode',
  description:
    'Turn your B2B website into a customer acquisition pipeline machine. High-converting SaaS marketing websites, technical SEO, and AI lead qualification bots.',
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
      <B2BSaaS />
    </>
  );
}
