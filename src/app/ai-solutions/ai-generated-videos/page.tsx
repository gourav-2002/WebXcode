import type { Metadata } from 'next';
import AiGeneratedVideos from './_components/AiGeneratedVideos';

export const metadata: Metadata = {
  title: 'AI Generated Videos & Video Marketing | WebXCode',
  description:
    'Produce high-converting video ad creatives, multilingual spokesperson videos, and personalized product demos at scale using cutting-edge AI.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions/ai-generated-videos',
  },
  openGraph: {
    title: 'AI Generated Videos & Video Marketing | WebXCode',
    description:
      'Produce high-converting video ad creatives, multilingual spokesperson videos, and personalized product demos at scale using cutting-edge AI.',
    url: 'https://webxcode.in/ai-solutions/ai-generated-videos',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Generated Videos & Video Marketing | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Generated Videos & Video Marketing | WebXCode',
    description:
      'Produce high-converting video ad creatives, multilingual spokesperson videos, and personalized product demos at scale using cutting-edge AI.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions/ai-generated-videos#webpage',
  url: 'https://webxcode.in/ai-solutions/ai-generated-videos',
  name: 'AI Generated Videos & Video Marketing | WebXCode',
  description:
    'Produce high-converting video ad creatives, multilingual spokesperson videos, and personalized product demos at scale using cutting-edge AI.',
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
      <AiGeneratedVideos />
    </>
  );
}
