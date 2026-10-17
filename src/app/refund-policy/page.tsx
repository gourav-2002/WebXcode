import type { Metadata } from 'next';
import RefundPolicy from './_components/RefundPolicy';

export const metadata: Metadata = {
  title: 'Refund Policy | WebXCode',
  description:
    'Review the WebXCode Refund and Cancellation Policy. Understand milestones, escrow security, dispute processes, and guarantee terms across digital services.',
  alternates: {
    canonical: 'https://webxcode.in/refund-policy',
  },
  openGraph: {
    title: 'Refund Policy | WebXCode',
    description:
      'Review the WebXCode Refund and Cancellation Policy. Understand milestones, escrow security, dispute processes, and guarantee terms across digital services.',
    url: 'https://webxcode.in/refund-policy',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebXCode Refund Policy',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refund Policy | WebXCode',
    description:
      'Transparent milestone terms, escrow protections, and refund guidelines for WebXCode clients.',
    images: ['/og-image.jpg'],
  },
};

const refundSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/refund-policy#webpage',
  url: 'https://webxcode.in/refund-policy',
  name: 'Refund Policy | WebXCode',
  description:
    'Review the WebXCode Refund and Cancellation Policy. Understand milestones, escrow security, dispute processes, and guarantee terms across digital services.',
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

export default function RefundPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(refundSchema) }}
      />
      <RefundPolicy />
    </>
  );
}
