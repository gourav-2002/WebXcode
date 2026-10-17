import type { Metadata } from 'next';
import AiAgentsForBusiness from './_components/AiAgentsForBusiness';

export const metadata: Metadata = {
  title: 'Autonomous AI Agents for Business | WebXCode',
  description:
    'Deploy goal-driven autonomous AI agents that research, analyze, execute multi-step business tasks, and collaborate with your human teams.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions/ai-agents-for-business',
  },
  openGraph: {
    title: 'Autonomous AI Agents for Business | WebXCode',
    description:
      'Deploy goal-driven autonomous AI agents that research, analyze, execute multi-step business tasks, and collaborate with your human teams.',
    url: 'https://webxcode.in/ai-solutions/ai-agents-for-business',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Autonomous AI Agents for Business | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autonomous AI Agents for Business | WebXCode',
    description:
      'Deploy goal-driven autonomous AI agents that research, analyze, execute multi-step business tasks, and collaborate with your human teams.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions/ai-agents-for-business#webpage',
  url: 'https://webxcode.in/ai-solutions/ai-agents-for-business',
  name: 'Autonomous AI Agents for Business | WebXCode',
  description:
    'Deploy goal-driven autonomous AI agents that research, analyze, execute multi-step business tasks, and collaborate with your human teams.',
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
      <AiAgentsForBusiness />
    </>
  );
}
