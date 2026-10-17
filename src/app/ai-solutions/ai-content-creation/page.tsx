import type { Metadata } from 'next';
import AiContentCreation from './_components/AiContentCreation';

export const metadata: Metadata = {
  title: 'AI Content Creation & Copywriting Engine | WebXCode',
  description:
    'Scale your content production with enterprise AI copywriting, SEO pillar cluster generation, and brand-voice-trained editorial pipelines.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions/ai-content-creation',
  },
  openGraph: {
    title: 'AI Content Creation & Copywriting Engine | WebXCode',
    description:
      'Scale your content production with enterprise AI copywriting, SEO pillar cluster generation, and brand-voice-trained editorial pipelines.',
    url: 'https://webxcode.in/ai-solutions/ai-content-creation',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Content Creation & Copywriting Engine | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Content Creation & Copywriting Engine | WebXCode',
    description:
      'Scale your content production with enterprise AI copywriting, SEO pillar cluster generation, and brand-voice-trained editorial pipelines.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions/ai-content-creation#webpage',
  url: 'https://webxcode.in/ai-solutions/ai-content-creation',
  name: 'AI Content Creation & Copywriting Engine | WebXCode',
  description:
    'Scale your content production with enterprise AI copywriting, SEO pillar cluster generation, and brand-voice-trained editorial pipelines.',
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
      <AiContentCreation />
    </>
  );
}
