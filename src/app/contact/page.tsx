import type { Metadata } from 'next';
import Contact from './_components/Contact';

export const metadata: Metadata = {
  title: 'Contact Us | WebXCode',
  description:
    'Get in touch with WebXCode. Let’s build high-converting websites, AI automations, and scalable digital solutions for your business.',
  alternates: {
    canonical: 'https://webxcode.in/contact',
  },
  openGraph: {
    title: 'Contact Us | WebXCode',
    description:
      'Get in touch with WebXCode. Let’s build high-converting websites, AI automations, and scalable digital solutions for your business.',
    url: 'https://webxcode.in/contact',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | WebXCode',
    description:
      'Get in touch with WebXCode for web engineering, AI solutions, and digital growth services.',
    images: ['/og-image.jpg'],
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://webxcode.in/contact#webpage',
  url: 'https://webxcode.in/contact',
  name: 'Contact Us | WebXCode',
  description:
    'Get in touch with WebXCode. Let’s build high-converting websites, AI automations, and scalable digital solutions for your business.',
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://webxcode.in/#organization',
    name: 'WebXCode',
    url: 'https://webxcode.in',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Hindi'],
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Contact />
    </>
  );
}
