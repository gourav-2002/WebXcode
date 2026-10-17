import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocationDetail from './_components/LocationDetail';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const locationData: Record<
  string,
  {
    name: string;
    city: string;
    title: string;
    description: string;
    streetAddress: string;
    locality: string;
    region: string;
    postalCode: string;
    telephone: string;
    areaServed: string[];
  }
> = {
  delhi: {
    name: 'WebXCode Delhi NCR — Digital Marketing, Web & AI Agency',
    city: 'New Delhi',
    title: 'Digital Marketing & Web Development Agency in Delhi NCR | WebXCode',
    description:
      'WebXCode Delhi is a premier digital agency delivering custom website development, technical SEO, performance marketing, and enterprise AI chatbot solutions across Delhi NCR.',
    streetAddress: 'Plot C-24, Sector 62',
    locality: 'Noida (Delhi NCR)',
    region: 'Delhi NCR',
    postalCode: '201309',
    telephone: '+91-98765-43210',
    areaServed: [
      'New Delhi',
      'Connaught Place',
      'Nehru Place',
      'Okhla Industrial Area',
      'South Delhi',
      'Gurugram',
      'Noida',
    ],
  },
  mumbai: {
    name: 'WebXCode Mumbai — Enterprise Web, Performance Marketing & AI',
    city: 'Mumbai',
    title: 'Digital Marketing & Web Development Company in Mumbai | WebXCode',
    description:
      'Premier digital growth agency in Mumbai serving BFSI, D2C, and corporate brands with web application engineering, performance marketing, and custom AI systems.',
    streetAddress: 'BKC Financial District, Bandra East',
    locality: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400051',
    telephone: '+91-98765-43210',
    areaServed: [
      'Mumbai',
      'Bandra Kurla Complex (BKC)',
      'Lower Parel',
      'Andheri East',
      'Nariman Point',
      'Powai',
    ],
  },
  bengaluru: {
    name: 'WebXCode Bengaluru — Tech & AI Growth Partner',
    city: 'Bengaluru',
    title: 'Web Engineering & AI Solutions Agency in Bengaluru | WebXCode',
    description:
      'Partnering with tech startups and scale-ups in Bengaluru for custom SaaS web app development, generative AI automation, and compounding technical SEO.',
    streetAddress: 'Outer Ring Road, Bellandur',
    locality: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560103',
    telephone: '+91-98765-43210',
    areaServed: [
      'Bengaluru',
      'Koramangala',
      'Indiranagar',
      'HSR Layout',
      'Whitefield',
      'Electronic City',
    ],
  },
};

export async function generateStaticParams() {
  return [
    { slug: 'delhi' },
    { slug: 'mumbai' },
    { slug: 'bengaluru' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const loc = locationData[slug];
  if (!loc) {
    return {
      title: 'Location | WebXCode',
    };
  }

  return {
    title: loc.title,
    description: loc.description,
    alternates: {
      canonical: `https://webxcode.in/locations/${slug}`,
    },
    openGraph: {
      title: loc.title,
      description: loc.description,
      url: `https://webxcode.in/locations/${slug}`,
      siteName: 'WebXCode',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: loc.name,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: loc.title,
      description: loc.description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const loc = locationData[slug];
  if (!loc) {
    notFound();
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://webxcode.in/locations/${slug}#localbusiness`,
    name: loc.name,
    image: 'https://webxcode.in/og-image.jpg',
    url: `https://webxcode.in/locations/${slug}`,
    telephone: loc.telephone,
    email: 'hello@webxcode.in',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.streetAddress,
      addressLocality: loc.locality,
      addressRegion: loc.region,
      postalCode: loc.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.6139',
      longitude: '77.2090',
    },
    areaServed: loc.areaServed.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    sameAs: [
      'https://twitter.com/webxcode',
      'https://linkedin.com/company/webxcode',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <LocationDetail />
    </>
  );
}
