import type { Metadata } from 'next';
import AiPoweredSeo from './_components/AiPoweredSeo';

export const metadata: Metadata = {
  title: 'AI-Powered SEO & AEO Optimization | WebXCode',
  description:
    'Dominate traditional Google search and new generative AI answer engines (AEO/GEO) with AI-accelerated programmatic SEO and topical authority architecture.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions/ai-powered-seo',
  },
  openGraph: {
    title: 'AI-Powered SEO & AEO Optimization | WebXCode',
    description:
      'Dominate traditional Google search and new generative AI answer engines (AEO/GEO) with AI-accelerated programmatic SEO and topical authority architecture.',
    url: 'https://webxcode.in/ai-solutions/ai-powered-seo',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI-Powered SEO & AEO Optimization | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered SEO & AEO Optimization | WebXCode',
    description:
      'Dominate traditional Google search and new generative AI answer engines (AEO/GEO) with AI-accelerated programmatic SEO and topical authority architecture.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions/ai-powered-seo#webpage',
  url: 'https://webxcode.in/ai-solutions/ai-powered-seo',
  name: 'AI-Powered SEO & AEO Optimization | WebXCode',
  description:
    'Dominate traditional Google search and new generative AI answer engines (AEO/GEO) with AI-accelerated programmatic SEO and topical authority architecture.',
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
      <AiPoweredSeo />
    </>
  );
}
