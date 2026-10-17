import type { Metadata } from 'next';
import AiAdCreatives from './_components/AiAdCreatives';

export const metadata: Metadata = {
  title: 'AI Ad Creatives & Automated Multivariant Testing | WebXCode',
  description:
    'Generate hundreds of high-converting social and search ad variants in minutes with AI-assisted creative production and algorithmic performance testing.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions/ai-ad-creatives',
  },
  openGraph: {
    title: 'AI Ad Creatives & Automated Multivariant Testing | WebXCode',
    description:
      'Generate hundreds of high-converting social and search ad variants in minutes with AI-assisted creative production and algorithmic performance testing.',
    url: 'https://webxcode.in/ai-solutions/ai-ad-creatives',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Ad Creatives & Automated Multivariant Testing | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Ad Creatives & Automated Multivariant Testing | WebXCode',
    description:
      'Generate hundreds of high-converting social and search ad variants in minutes with AI-assisted creative production and algorithmic performance testing.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions/ai-ad-creatives#webpage',
  url: 'https://webxcode.in/ai-solutions/ai-ad-creatives',
  name: 'AI Ad Creatives & Automated Multivariant Testing | WebXCode',
  description:
    'Generate hundreds of high-converting social and search ad variants in minutes with AI-assisted creative production and algorithmic performance testing.',
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
      <AiAdCreatives />
    </>
  );
}
