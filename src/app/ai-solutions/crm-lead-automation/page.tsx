import type { Metadata } from 'next';
import CrmLeadAutomation from './_components/CrmLeadAutomation';

export const metadata: Metadata = {
  title: 'CRM Lead Automation & Instant Routing | WebXCode',
  description:
    'Capture, enrich, score, and instantly assign leads to sales reps with zero manual data entry and automated multi-channel follow-up sequences.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions/crm-lead-automation',
  },
  openGraph: {
    title: 'CRM Lead Automation & Instant Routing | WebXCode',
    description:
      'Capture, enrich, score, and instantly assign leads to sales reps with zero manual data entry and automated multi-channel follow-up sequences.',
    url: 'https://webxcode.in/ai-solutions/crm-lead-automation',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CRM Lead Automation & Instant Routing | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRM Lead Automation & Instant Routing | WebXCode',
    description:
      'Capture, enrich, score, and instantly assign leads to sales reps with zero manual data entry and automated multi-channel follow-up sequences.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions/crm-lead-automation#webpage',
  url: 'https://webxcode.in/ai-solutions/crm-lead-automation',
  name: 'CRM Lead Automation & Instant Routing | WebXCode',
  description:
    'Capture, enrich, score, and instantly assign leads to sales reps with zero manual data entry and automated multi-channel follow-up sequences.',
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
      <CrmLeadAutomation />
    </>
  );
}
