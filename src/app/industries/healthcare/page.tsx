import type { Metadata } from 'next';
import Healthcare from './_components/Healthcare';

export const metadata: Metadata = {
  title: 'Healthcare Digital Marketing & Web Solutions | WebXCode',
  description:
    'Fill doctor schedules and hospital clinics with frictionless appointment booking websites, local SEO visibility, and HIPAA-aware AI assistants.',
  alternates: {
    canonical: 'https://webxcode.in/industries/healthcare',
  },
  openGraph: {
    title: 'Healthcare Digital Marketing & Web Solutions | WebXCode',
    description:
      'Fill doctor schedules and hospital clinics with frictionless appointment booking websites, local SEO visibility, and HIPAA-aware AI assistants.',
    url: 'https://webxcode.in/industries/healthcare',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Healthcare Digital Marketing & Web Solutions | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare Digital Marketing & Web Solutions | WebXCode',
    description:
      'Fill doctor schedules and hospital clinics with frictionless appointment booking websites, local SEO visibility, and HIPAA-aware AI assistants.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/industries/healthcare#webpage',
  url: 'https://webxcode.in/industries/healthcare',
  name: 'Healthcare Digital Marketing & Web Solutions | WebXCode',
  description:
    'Fill doctor schedules and hospital clinics with frictionless appointment booking websites, local SEO visibility, and HIPAA-aware AI assistants.',
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
      <Healthcare />
    </>
  );
}
