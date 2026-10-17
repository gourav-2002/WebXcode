import type { Metadata } from 'next';
import { Suspense } from 'react';
import Blog from './_components/Blog';

export const metadata: Metadata = {
  title: 'Insights, Playbooks & Engineering Articles | WebXCode Blog',
  description:
    'In-depth guides, case studies, and engineering breakdowns covering web development, technical SEO, AEO/GEO, AI chatbot implementation, and high-ROAS marketing.',
  alternates: {
    canonical: 'https://webxcode.in/blog',
  },
  openGraph: {
    title: 'Insights, Playbooks & Engineering Articles | WebXCode Blog',
    description:
      'Actionable growth strategies and technical tutorials from WebXCode engineers and marketing strategists.',
    url: 'https://webxcode.in/blog',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebXCode Blog',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights, Playbooks & Engineering Articles | WebXCode Blog',
    description:
      'Actionable guides on web engineering, technical SEO, and AI automation.',
    images: ['/og-image.jpg'],
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': 'https://webxcode.in/blog#blog',
  url: 'https://webxcode.in/blog',
  name: 'WebXCode Engineering & Growth Blog',
  description:
    'In-depth guides, case studies, and engineering breakdowns covering web development, technical SEO, AEO/GEO, AI chatbot implementation, and high-ROAS marketing.',
  publisher: {
    '@type': 'Organization',
    '@id': 'https://webxcode.in/#organization',
    name: 'WebXCode',
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-navy" />}>
        <Blog />
      </Suspense>
    </>
  );
}
