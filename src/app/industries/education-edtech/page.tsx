import type { Metadata } from 'next';
import EducationEdtech from './_components/EducationEdtech';

export const metadata: Metadata = {
  title: 'Education & EdTech Digital Agency | WebXCode',
  description:
    'Drive predictable student admissions and enrolments with custom institute websites, LMS portals, high-intent Google Ads, and AI admission bots.',
  alternates: {
    canonical: 'https://webxcode.in/industries/education-edtech',
  },
  openGraph: {
    title: 'Education & EdTech Digital Agency | WebXCode',
    description:
      'Drive predictable student admissions and enrolments with custom institute websites, LMS portals, high-intent Google Ads, and AI admission bots.',
    url: 'https://webxcode.in/industries/education-edtech',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Education & EdTech Digital Agency | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education & EdTech Digital Agency | WebXCode',
    description:
      'Drive predictable student admissions and enrolments with custom institute websites, LMS portals, high-intent Google Ads, and AI admission bots.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/industries/education-edtech#webpage',
  url: 'https://webxcode.in/industries/education-edtech',
  name: 'Education & EdTech Digital Agency | WebXCode',
  description:
    'Drive predictable student admissions and enrolments with custom institute websites, LMS portals, high-intent Google Ads, and AI admission bots.',
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
      <EducationEdtech />
    </>
  );
}
