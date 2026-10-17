import type { Metadata } from 'next';
import AISolutions from './_components/AISolutions';

export const metadata: Metadata = {
  title: 'AI Solutions & Automation Services | WebXCode',
  description:
    'Custom AI solutions engineered for modern enterprises: AI chatbots, WhatsApp AI agents, voice assistants, automated CRM workflows, and generative content systems.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions',
  },
  openGraph: {
    title: 'AI Solutions & Automation Services | WebXCode',
    description:
      'Custom AI solutions engineered for modern enterprises: AI chatbots, WhatsApp AI agents, voice assistants, automated CRM workflows, and generative content systems.',
    url: 'https://webxcode.in/ai-solutions',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebXCode AI Solutions',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solutions & Automation Services | WebXCode',
    description:
      'Custom AI chatbots, WhatsApp assistants, workflow automation, and enterprise LLM integrations.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions#webpage',
  url: 'https://webxcode.in/ai-solutions',
  name: 'AI Solutions & Automation Services | WebXCode',
  description:
    'Custom AI solutions engineered for modern enterprises: AI chatbots, WhatsApp AI agents, voice assistants, automated CRM workflows, and generative content systems.',
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

export default function AISolutionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <AISolutions />
    </>
  );
}
