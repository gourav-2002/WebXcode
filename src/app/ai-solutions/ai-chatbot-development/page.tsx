import type { Metadata } from 'next';
import AiChatbotDevelopment from './_components/AiChatbotDevelopment';

export const metadata: Metadata = {
  title: 'AI Chatbot Development Services | WebXCode',
  description:
    'Deploy custom intelligent AI chatbots trained on your company data to qualify leads, book appointments, and provide 24/7 support with zero latency.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions/ai-chatbot-development',
  },
  openGraph: {
    title: 'AI Chatbot Development Services | WebXCode',
    description:
      'Deploy custom intelligent AI chatbots trained on your company data to qualify leads, book appointments, and provide 24/7 support with zero latency.',
    url: 'https://webxcode.in/ai-solutions/ai-chatbot-development',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Chatbot Development Services | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Chatbot Development Services | WebXCode',
    description:
      'Deploy custom intelligent AI chatbots trained on your company data to qualify leads, book appointments, and provide 24/7 support with zero latency.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions/ai-chatbot-development#webpage',
  url: 'https://webxcode.in/ai-solutions/ai-chatbot-development',
  name: 'AI Chatbot Development Services | WebXCode',
  description:
    'Deploy custom intelligent AI chatbots trained on your company data to qualify leads, book appointments, and provide 24/7 support with zero latency.',
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
      <AiChatbotDevelopment />
    </>
  );
}
