import type { Metadata } from 'next';
import Home from './_components/Home';

export const metadata: Metadata = {
  title: 'WebXCode – Digital Marketing & AI Solutions Agency',
  description:
    'WebXCode is a leading digital marketing, web engineering and AI automation agency helping ambitious brands scale with SEO, paid media, and intelligent bots.',
  alternates: {
    canonical: 'https://webxcode.in',
  },
  openGraph: {
    title: 'WebXCode – Digital Marketing & AI Solutions Agency',
    description:
      'Scale your business with high-performance web engineering, ROI-driven marketing campaigns, and cutting-edge AI solutions from WebXCode.',
    url: 'https://webxcode.in',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebXCode Digital Agency',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebXCode – Digital Marketing & AI Solutions Agency',
    description:
      'Web engineering, SEO, performance marketing, and generative AI solutions built for measurable ROI.',
    images: ['/og-image.jpg'],
  },
};

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://webxcode.in/#organization',
      name: 'WebXCode',
      url: 'https://webxcode.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://webxcode.in/icon.png',
      },
      sameAs: [
        'https://twitter.com/webxcode',
        'https://linkedin.com/company/webxcode',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'hello@webxcode.in',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://webxcode.in/#website',
      url: 'https://webxcode.in',
      name: 'WebXCode',
      publisher: {
        '@id': 'https://webxcode.in/#organization',
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://webxcode.in/#webpage',
      url: 'https://webxcode.in',
      name: 'WebXCode – Digital Marketing & AI Solutions Agency',
      isPartOf: {
        '@id': 'https://webxcode.in/#website',
      },
      about: {
        '@id': 'https://webxcode.in/#organization',
      },
      description:
        'WebXCode is a leading digital marketing, web engineering and AI automation agency helping ambitious brands scale with SEO, paid media, and intelligent bots.',
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Home />
    </>
  );
}
