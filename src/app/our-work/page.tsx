import type { Metadata } from 'next';
import OurWork from './_components/OurWork';

export const metadata: Metadata = {
  title: 'Our Work | WebXCode Portfolio & Case Studies',
  description:
    'Explore WebXCode portfolio of web engineering, modern branding, AI automation, and high-performance digital marketing case studies.',
  alternates: {
    canonical: 'https://webxcode.in/our-work',
  },
  openGraph: {
    title: 'Our Work | WebXCode Portfolio & Case Studies',
    description:
      'Explore WebXCode portfolio of web engineering, modern branding, AI automation, and high-performance digital marketing case studies.',
    url: 'https://webxcode.in/our-work',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebXCode Portfolio & Case Studies',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work | WebXCode Portfolio & Case Studies',
    description:
      'Explore WebXCode portfolio of web engineering, modern branding, AI automation, and high-performance digital marketing case studies.',
    images: ['/og-image.jpg'],
  },
};

const ourWorkSchema = {
  '@context': 'https://schema.org',
  '@type': ['WebPage', 'CollectionPage'],
  '@id': 'https://webxcode.in/our-work#webpage',
  url: 'https://webxcode.in/our-work',
  name: 'Our Work | WebXCode Portfolio & Case Studies',
  description:
    'Explore WebXCode portfolio of web engineering, modern branding, AI automation, and high-performance digital marketing case studies.',
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

export default function OurWorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ourWorkSchema) }}
      />
      <OurWork />
    </>
  );
}
