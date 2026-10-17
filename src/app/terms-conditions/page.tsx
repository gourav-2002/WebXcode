import type { Metadata } from 'next';
import TermsConditions from './_components/TermsConditions';

export const metadata: Metadata = {
  title: 'Terms & Conditions | WebXCode',
  description:
    'Review the official Terms and Conditions governing use of WebXCode services, intellectual property ownership, milestone payments, and client rights.',
  alternates: {
    canonical: 'https://webxcode.in/terms-conditions',
  },
  openGraph: {
    title: 'Terms & Conditions | WebXCode',
    description:
      'Review the official Terms and Conditions governing use of WebXCode services, intellectual property ownership, milestone payments, and client rights.',
    url: 'https://webxcode.in/terms-conditions',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebXCode Terms & Conditions',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | WebXCode',
    description:
      'Clear, transparent terms of service, IP transfer rules, and client warranties at WebXCode.',
    images: ['/og-image.jpg'],
  },
};

const termsSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/terms-conditions#webpage',
  url: 'https://webxcode.in/terms-conditions',
  name: 'Terms & Conditions | WebXCode',
  description:
    'Review the official Terms and Conditions governing use of WebXCode services, intellectual property ownership, milestone payments, and client rights.',
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

export default function TermsConditionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
      />
      <TermsConditions />
    </>
  );
}
