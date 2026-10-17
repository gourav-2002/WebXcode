import type { Metadata } from 'next';
import WebsiteMaintenanceSupport from './_components/WebsiteMaintenanceSupport';

export const metadata: Metadata = {
  title: 'Website Maintenance & Support Services | WebXCode',
  description:
    '24/7 uptime monitoring, security patching, Core Web Vitals optimization, and regular feature updates to keep your website running flawlessly.',
  alternates: {
    canonical: 'https://webxcode.in/services/website-maintenance-support',
  },
  openGraph: {
    title: 'Website Maintenance & Support Services | WebXCode',
    description:
      '24/7 uptime monitoring, security patching, Core Web Vitals optimization, and regular feature updates to keep your website running flawlessly.',
    url: 'https://webxcode.in/services/website-maintenance-support',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Website Maintenance & Support Services | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Maintenance & Support Services | WebXCode',
    description:
      '24/7 uptime monitoring, security patching, Core Web Vitals optimization, and regular feature updates to keep your website running flawlessly.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/services/website-maintenance-support#webpage',
  url: 'https://webxcode.in/services/website-maintenance-support',
  name: 'Website Maintenance & Support Services | WebXCode',
  description:
    '24/7 uptime monitoring, security patching, Core Web Vitals optimization, and regular feature updates to keep your website running flawlessly.',
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
      <WebsiteMaintenanceSupport />
    </>
  );
}
