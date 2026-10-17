import type { Metadata } from 'next';
import PrivacyPolicy from './_components/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy | WebXCode',
  description:
    'Read the WebXCode Privacy Policy to learn how we collect, use, share, and protect your personal information across our website, AI tools, and global digital services.',
  alternates: {
    canonical: 'https://webxcode.in/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | WebXCode',
    description:
      'Read the WebXCode Privacy Policy to learn how we collect, use, share, and protect your personal information across our website, AI tools, and global digital services.',
    url: 'https://webxcode.in/privacy-policy',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebXCode Privacy Policy',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | WebXCode',
    description:
      'Learn how WebXCode handles and protects your personal data.',
    images: ['/og-image.jpg'],
  },
};

const privacySchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/privacy-policy#webpage',
  url: 'https://webxcode.in/privacy-policy',
  name: 'Privacy Policy | WebXCode',
  description:
    'Read the WebXCode Privacy Policy to learn how we collect, use, share, and protect your personal information.',
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />
      <PrivacyPolicy />
    </>
  );
}
