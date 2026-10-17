import type { Metadata } from 'next';
import WhatsappAiChatbot from './_components/WhatsappAiChatbot';

export const metadata: Metadata = {
  title: 'WhatsApp AI Chatbot Solutions | WebXCode',
  description:
    'Automate sales, customer support, and catalog ordering directly on WhatsApp with intelligent conversational AI integrated into your CRM and inventory.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions/whatsapp-ai-chatbot',
  },
  openGraph: {
    title: 'WhatsApp AI Chatbot Solutions | WebXCode',
    description:
      'Automate sales, customer support, and catalog ordering directly on WhatsApp with intelligent conversational AI integrated into your CRM and inventory.',
    url: 'https://webxcode.in/ai-solutions/whatsapp-ai-chatbot',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WhatsApp AI Chatbot Solutions | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsApp AI Chatbot Solutions | WebXCode',
    description:
      'Automate sales, customer support, and catalog ordering directly on WhatsApp with intelligent conversational AI integrated into your CRM and inventory.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions/whatsapp-ai-chatbot#webpage',
  url: 'https://webxcode.in/ai-solutions/whatsapp-ai-chatbot',
  name: 'WhatsApp AI Chatbot Solutions | WebXCode',
  description:
    'Automate sales, customer support, and catalog ordering directly on WhatsApp with intelligent conversational AI integrated into your CRM and inventory.',
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
      <WhatsappAiChatbot />
    </>
  );
}
