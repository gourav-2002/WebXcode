import type { Metadata } from 'next';
import CustomAiLlmIntegration from './_components/CustomAiLlmIntegration';

export const metadata: Metadata = {
  title: 'Custom AI & LLM Integration Services | WebXCode',
  description:
    'Private, secure enterprise LLM integrations with OpenAI, Claude, and local open-source models using RAG pipelines and custom API connectors.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions/custom-ai-llm-integration',
  },
  openGraph: {
    title: 'Custom AI & LLM Integration Services | WebXCode',
    description:
      'Private, secure enterprise LLM integrations with OpenAI, Claude, and local open-source models using RAG pipelines and custom API connectors.',
    url: 'https://webxcode.in/ai-solutions/custom-ai-llm-integration',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Custom AI & LLM Integration Services | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom AI & LLM Integration Services | WebXCode',
    description:
      'Private, secure enterprise LLM integrations with OpenAI, Claude, and local open-source models using RAG pipelines and custom API connectors.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions/custom-ai-llm-integration#webpage',
  url: 'https://webxcode.in/ai-solutions/custom-ai-llm-integration',
  name: 'Custom AI & LLM Integration Services | WebXCode',
  description:
    'Private, secure enterprise LLM integrations with OpenAI, Claude, and local open-source models using RAG pipelines and custom API connectors.',
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
      <CustomAiLlmIntegration />
    </>
  );
}
