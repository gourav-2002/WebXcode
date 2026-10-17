import type { Metadata } from 'next';
import Services from './_components/Services';

export const metadata: Metadata = {
  title: 'Digital Services & Web Engineering | WebXCode',
  description:
    'Explore WebXCode services: Custom Website Development, E-commerce, Mobile Apps, Technical SEO, Google Ads, Performance Marketing, and Creative Branding.',
  alternates: {
    canonical: 'https://webxcode.in/services',
  },
  openGraph: {
    title: 'Digital Services & Web Engineering | WebXCode',
    description:
      'High-performance web development, technical SEO, performance marketing, and creative branding designed to accelerate revenue.',
    url: 'https://webxcode.in/services',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebXCode Digital Services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Services & Web Engineering | WebXCode',
    description:
      'Explore full-service web engineering, performance marketing, and branding services by WebXCode.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services#webpage',
  url: 'https://webxcode.in/services',
  name: 'Digital Services & Web Engineering | WebXCode',
  description:
    'Explore WebXCode services: Custom Website Development, E-commerce, Mobile Apps, Technical SEO, Google Ads, Performance Marketing, and Creative Branding.',
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

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <Services />
    </>
  );
}
