import type { Metadata } from 'next';
import MobileAppDevelopment from './_components/MobileAppDevelopment';

export const metadata: Metadata = {
  title: 'Mobile App Development Services (iOS & Android) | WebXCode',
  description:
    'Native and cross-platform Flutter/React Native mobile application engineering with offline support, push notifications, and intuitive UX.',
  alternates: {
    canonical: 'https://webxcode.in/services/mobile-app-development',
  },
  openGraph: {
    title: 'Mobile App Development Services (iOS & Android) | WebXCode',
    description:
      'Native and cross-platform Flutter/React Native mobile application engineering with offline support, push notifications, and intuitive UX.',
    url: 'https://webxcode.in/services/mobile-app-development',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mobile App Development Services (iOS & Android) | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile App Development Services (iOS & Android) | WebXCode',
    description:
      'Native and cross-platform Flutter/React Native mobile application engineering with offline support, push notifications, and intuitive UX.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/mobile-app-development#webpage',
  url: 'https://webxcode.in/services/mobile-app-development',
  name: 'Mobile App Development Services (iOS & Android) | WebXCode',
  description:
    'Native and cross-platform Flutter/React Native mobile application engineering with offline support, push notifications, and intuitive UX.',
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
      <MobileAppDevelopment />
    </>
  );
}
