import type { Metadata } from 'next';
import AiVoiceAgents from './_components/AiVoiceAgents';

export const metadata: Metadata = {
  title: 'AI Voice Agents for Inbound & Outbound Calling | WebXCode',
  description:
    'Human-like conversational AI voice bots for instant inbound call qualification, automated outbound appointment booking, and customer support.',
  alternates: {
    canonical: 'https://webxcode.in/ai-solutions/ai-voice-agents',
  },
  openGraph: {
    title: 'AI Voice Agents for Inbound & Outbound Calling | WebXCode',
    description:
      'Human-like conversational AI voice bots for instant inbound call qualification, automated outbound appointment booking, and customer support.',
    url: 'https://webxcode.in/ai-solutions/ai-voice-agents',
    siteName: 'WebXCode',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Voice Agents for Inbound & Outbound Calling | WebXCode',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Voice Agents for Inbound & Outbound Calling | WebXCode',
    description:
      'Human-like conversational AI voice bots for instant inbound call qualification, automated outbound appointment booking, and customer support.',
    images: ['/og-image.jpg'],
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webxcode.in/ai-solutions/ai-voice-agents#webpage',
  url: 'https://webxcode.in/ai-solutions/ai-voice-agents',
  name: 'AI Voice Agents for Inbound & Outbound Calling | WebXCode',
  description:
    'Human-like conversational AI voice bots for instant inbound call qualification, automated outbound appointment booking, and customer support.',
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
      <AiVoiceAgents />
    </>
  );
}
