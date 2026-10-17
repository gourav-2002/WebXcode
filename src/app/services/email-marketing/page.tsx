import type { Metadata } from 'next';
import EmailMarketing from './_components/EmailMarketing';

export const metadata: Metadata = {
  title: 'Email Marketing & Retention Automation | WebXCode',
  description:
    'Klaviyo and Brevo automated lifecycle email flows, customer win-back sequences, and promotional newsletters with high inbox deliverability.',
  alternates: {
    canonical: 'https://webxcode.in/services/email-marketing',
  },
  openGraph: {
    title: 'Email Marketing & Retention Automation | WebXCode',
    description:
      'Klaviyo and Brevo automated lifecycle email flows, customer win-back sequences, and promotional newsletters with high inbox deliverability.',
    url: 'https://webxcode.in/services/email-marketing',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Email Marketing & Retention Automation | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email Marketing & Retention Automation | WebXCode',
    description:
      'Klaviyo and Brevo automated lifecycle email flows, customer win-back sequences, and promotional newsletters with high inbox deliverability.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/email-marketing#webpage',
  url: 'https://webxcode.in/services/email-marketing',
  name: 'Email Marketing & Retention Automation | WebXCode',
  description:
    'Klaviyo and Brevo automated lifecycle email flows, customer win-back sequences, and promotional newsletters with high inbox deliverability.',
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
      <EmailMarketing />
    </>
  );
}
