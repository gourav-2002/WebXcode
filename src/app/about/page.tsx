import type { Metadata } from 'next';
import About from './_components/About';

export const metadata: Metadata = {
  title: 'About Us | WebXCode — Web Development, SEO & AI Solutions',
  description:
    'Meet the team behind WebXCode. Learn about our mission, values, 4-step clarity process, and global web engineering, modern branding, and AI automation solutions.',
  alternates: {
    canonical: 'https://webxcode.in/about',
  },
  openGraph: {
    title: 'About Us | WebXCode — Web Development, SEO & AI Solutions',
    description:
      'Meet the team behind WebXCode. Learn about our mission, values, 4-step clarity process, and global web engineering, modern branding, and AI automation solutions.',
    url: 'https://webxcode.in/about',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About WebXCode Team & Mission',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | WebXCode — Web Development, SEO & AI Solutions',
    description:
      'Meet the team behind WebXCode. Engineering high-converting websites, web applications, and AI-powered solutions.',
    images: ['/og-image.jpg'],
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://webxcode.in/about#aboutpage',
  url: 'https://webxcode.in/about',
  name: 'About Us | WebXCode — Web Development, SEO & AI Solutions',
  description:
    'At WebXCode, we combine technology, creativity and strategy to help businesses grow with modern websites, web applications and AI-powered solutions.',
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
    url: 'https://webxcode.in',
    description:
      'WebXCode engineers high-performance web applications, digital growth strategies, and AI automation systems.',
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <About />
    </>
  );
}
