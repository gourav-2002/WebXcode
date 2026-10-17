import type { Metadata } from 'next';
import BrandingLogoDesign from './_components/BrandingLogoDesign';

export const metadata: Metadata = {
  title: 'Branding & Logo Design Agency | WebXCode',
  description:
    'Memorable visual identities, brand guidelines, typography systems, and logo design that communicate premium quality and market leadership.',
  alternates: {
    canonical: 'https://webxcode.in/services/branding-logo-design',
  },
  openGraph: {
    title: 'Branding & Logo Design Agency | WebXCode',
    description:
      'Memorable visual identities, brand guidelines, typography systems, and logo design that communicate premium quality and market leadership.',
    url: 'https://webxcode.in/services/branding-logo-design',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Branding & Logo Design Agency | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Branding & Logo Design Agency | WebXCode',
    description:
      'Memorable visual identities, brand guidelines, typography systems, and logo design that communicate premium quality and market leadership.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/branding-logo-design#webpage',
  url: 'https://webxcode.in/services/branding-logo-design',
  name: 'Branding & Logo Design Agency | WebXCode',
  description:
    'Memorable visual identities, brand guidelines, typography systems, and logo design that communicate premium quality and market leadership.',
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
      <BrandingLogoDesign />
    </>
  );
}
