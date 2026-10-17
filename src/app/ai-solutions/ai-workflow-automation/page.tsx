import type { Metadata } from 'next';
import AiWorkflowAutomation from './_components/AiWorkflowAutomation';

export const metadata: Metadata = {
  title: 'AI Workflow Automation & Zapier/Make Integration | WebXCode',
  description:
    'Eliminate repetitive manual operations by connecting your apps, databases, and LLMs into self-executing autonomous business workflows.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions/ai-workflow-automation',
  },
  openGraph: {
    title: 'AI Workflow Automation & Zapier/Make Integration | WebXCode',
    description:
      'Eliminate repetitive manual operations by connecting your apps, databases, and LLMs into self-executing autonomous business workflows.',
    url: 'https://webxcode.in/ai-solutions/ai-workflow-automation',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Workflow Automation & Zapier/Make Integration | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Workflow Automation & Zapier/Make Integration | WebXCode',
    description:
      'Eliminate repetitive manual operations by connecting your apps, databases, and LLMs into self-executing autonomous business workflows.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions/ai-workflow-automation#webpage',
  url: 'https://webxcode.in/ai-solutions/ai-workflow-automation',
  name: 'AI Workflow Automation & Zapier/Make Integration | WebXCode',
  description:
    'Eliminate repetitive manual operations by connecting your apps, databases, and LLMs into self-executing autonomous business workflows.',
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
      <AiWorkflowAutomation />
    </>
  );
}
