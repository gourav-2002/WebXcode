import type { Metadata } from 'next';
import ManagedItServices from './_components/ManagedItServices';

export const metadata: Metadata = {
  title: 'Managed IT Services & Cloud Infrastructure | WebXCode',
  description:
    'Proactive cloud infrastructure management, AWS/GCP DevOps, automated database backups, and enterprise cyber resilience.',
  alternates: {
    canonical: 'https://webxcode.in/services/managed-it-services',
  },
  openGraph: {
    title: 'Managed IT Services & Cloud Infrastructure | WebXCode',
    description:
      'Proactive cloud infrastructure management, AWS/GCP DevOps, automated database backups, and enterprise cyber resilience.',
    url: 'https://webxcode.in/services/managed-it-services',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Managed IT Services & Cloud Infrastructure | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Managed IT Services & Cloud Infrastructure | WebXCode',
    description:
      'Proactive cloud infrastructure management, AWS/GCP DevOps, automated database backups, and enterprise cyber resilience.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/managed-it-services#webpage',
  url: 'https://webxcode.in/services/managed-it-services',
  name: 'Managed IT Services & Cloud Infrastructure | WebXCode',
  description:
    'Proactive cloud infrastructure management, AWS/GCP DevOps, automated database backups, and enterprise cyber resilience.',
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
      <ManagedItServices />
    </>
  );
}
