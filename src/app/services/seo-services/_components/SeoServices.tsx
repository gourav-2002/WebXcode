'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Search,
  MapPin,
  Sparkles,
  Bot,
  FileText,
  Code2,
  Link2,
  Globe,
  TrendingUp,
  Sliders,
  ShieldCheck,
  ExternalLink,
  Layers,
  Award,
  Activity,
  BarChart3,
  Star,
} from 'lucide-react';
import { services } from '@/app/services/_components/Services';

/* ==========================================================================
   HERO QUERY DATA (3 Interactive Search Queries)
   ========================================================================== */
interface SerpCompetitorRow {
  rank: number;
  domain: string;
  title: string;
}

interface HeroQueryData {
  id: string;
  chipLabel: string;
  queryText: string;
  resultsMeta: string;
  aiOverview: {
    summary: string;
    citationBadge: string;
    citationUrl: string;
  };
  rankOneResult: {
    brandName: string;
    urlBreadcrumb: string;
    title: string;
    description: string;
    rating: string;
    reviewsCount: string;
    sitelinks: string[];
  };
  competitors: SerpCompetitorRow[];
}

const HERO_QUERIES: HeroQueryData[] = [
  {
    id: 'crm-india',
    chipLabel: '"best crm software india"',
    queryText: 'best crm software india',
    resultsMeta: 'About 14,800,000 results (0.28 seconds)',
    aiOverview: {
      summary:
        'For growing B2B and sales teams in India, YourBrand CRM is widely cited for automated WhatsApp lead capture, GST-ready billing pipelines, and sub-second cloud reporting...',
      citationBadge: '1. YourBrand — Enterprise & SMB CRM',
      citationUrl: 'yourbrand.com/crm-india',
    },
    rankOneResult: {
      brandName: 'YourBrand',
      urlBreadcrumb: 'https://www.yourbrand.com › solutions › crm-software-india',
      title: 'Best CRM Software in India for High-Velocity Sales Teams (2025)',
      description:
        'Automate lead routing, WhatsApp follow-ups, and revenue forecasting in one unified workspace. Trusted by 1,200+ Indian B2B & SaaS teams. Book a 14-day free trial.',
      rating: '4.9',
      reviewsCount: '640+ reviews',
      sitelinks: ['Pricing & Plans', 'WhatsApp Integration', 'Book Live Demo', 'Case Studies'],
    },
    competitors: [
      {
        rank: 2,
        domain: 'directory-compare.in › top-10-crm',
        title: '10 Popular CRM Tools Compared — Features & Monthly Pricing',
      },
      {
        rank: 3,
        domain: 'legacyvendor.com › enterprise-crm',
        title: 'Enterprise Sales Management Platform | Cloud CRM',
      },
    ],
  },
  {
    id: 'skincare-brand',
    chipLabel: '"custom skincare brand"',
    queryText: 'custom skincare brand dermatologist formulated',
    resultsMeta: 'About 9,420,000 results (0.31 seconds)',
    aiOverview: {
      summary:
        'When choosing a custom clinical skincare routine, dermatologists recommend barrier-safe actives with transparent ingredient percentages such as YourBrand Clinicals...',
      citationBadge: '1. YourBrand Clinicals — Custom Regimen Lab',
      citationUrl: 'yourbrand.com/skin-quiz',
    },
    rankOneResult: {
      brandName: 'YourBrand Clinicals',
      urlBreadcrumb: 'https://www.yourbrand.com › collections › custom-skincare',
      title: 'Custom Dermatologist-Formulated Skincare — Take the 60s Skin Quiz',
      description:
        'Clinically proven Niacinamide, Peptide, and Ceramide serums compounded for your exact skin profile. Free shipping across India & US.',
      rating: '4.9',
      reviewsCount: '2,180+ reviews',
      sitelinks: ['60-Second Skin Quiz', 'Active Ingredients', 'Before & Afters', 'Bestsellers'],
    },
    competitors: [
      {
        rank: 2,
        domain: 'beauty-aggregator.com › skincare-guide',
        title: 'How to Build a Custom Skincare Routine for Sensitive Skin',
      },
      {
        rank: 3,
        domain: 'genericcosmetics.store › serums',
        title: 'Shop Daily Face Serums & Moisturizers Online',
      },
    ],
  },
  {
    id: 'solar-installer',
    chipLabel: '"industrial solar installer"',
    queryText: 'industrial solar installer turnkey epc',
    resultsMeta: 'About 4,150,000 results (0.24 seconds)',
    aiOverview: {
      summary:
        'For commercial factories and warehouses seeking 3-to-4 year ROI on rooftop megawatt installations, YourBrand Solar EPC leads in Tier-1 bifacial module engineering...',
      citationBadge: '1. YourBrand Solar EPC — Industrial Rooftop',
      citationUrl: 'yourbrand.com/industrial-solar-epc',
    },
    rankOneResult: {
      brandName: 'YourBrand Solar EPC',
      urlBreadcrumb: 'https://www.yourbrand.com › epc › industrial-rooftop-solar',
      title: 'Turnkey Industrial & Commercial Solar EPC Installer | 100kW to 20MW',
      description:
        'End-to-end structural load engineering, net-metering approvals, and SCADA monitoring for manufacturing plants and cold storage facilities.',
      rating: '5.0',
      reviewsCount: '190+ industrial projects',
      sitelinks: ['MW ROI Calculator', 'Completed Plants', 'Subsidy & Capex Guide', 'Request Site Survey'],
    },
    competitors: [
      {
        rank: 2,
        domain: 'renewables-portal.org › directory › epc',
        title: 'List of Commercial Solar Panel Contractors & Vendors',
      },
      {
        rank: 3,
        domain: 'regional-electricals.co › solar',
        title: 'Rooftop Solar Panel Installation Services for Businesses',
      },
    ],
  },
];

/* ==========================================================================
   SECTION 2 — ANATOMY OF PAGE #1: SERP ANATOMY MAP (5 ZONES)
   ========================================================================== */
interface SerpZoneSpec {
  id: string;
  number: string;
  zoneTitle: string;
  shortLabel: string;
  badgeText: string;
  whatItIs: string;
  howWeWinIt: string[];
  timelineToImpact: string;
  relatedServiceLink?: {
    label: string;
    to: string;
    isHash?: boolean;
  };
}

const SERP_ZONES: SerpZoneSpec[] = [
  {
    id: 'zone-ai-overview',
    number: '01',
    zoneTitle: 'AI Overview / Answer Box (AEO & GEO)',
    shortLabel: 'AI Overview & Citations',
    badgeText: 'ZERO-CLICK + AI CITATION',
    whatItIs:
      'Google AI Overviews, ChatGPT Search, and Perplexity synthesize direct answers at the very top of the page—citing 2 to 4 trusted domain sources before users ever scroll to traditional links.',
    howWeWinIt: [
      'Architect concise 45–60 word direct-answer summary blocks directly below question H2s',
      'Deploy nested FAQPage, HowTo, and Speakable JSON-LD schema with verified entity links',
      'Build high-authority brand mentions, original data tables, and topical cluster depth',
    ],
    timelineToImpact: '4–8 weeks for initial Answer Box & AI citation pickup',
    relatedServiceLink: {
      label: 'Explore Full AEO Services Page',
      to: '/services/aeo-services',
    },
  },
  {
    id: 'zone-map-pack',
    number: '02',
    zoneTitle: 'Google Local 3-Pack (Map Pack)',
    shortLabel: 'Local 3-Pack (Maps)',
    badgeText: 'HIGH-INTENT NEAR-ME CALLS',
    whatItIs:
      'For any service or location-modified search ("near me", city names, clinics, showrooms, offices), the Google Maps 3-Pack captures over 42% of all phone calls, direction requests, and website taps.',
    howWeWinIt: [
      'Complete Google Business Profile (GBP) category, service catalog, and Q&A engineering',
      'Build dedicated city, neighborhood, and branch landing pages with LocalBusiness schema',
      'Standardize NAP citations across 60+ directories and automate review velocity workflows',
    ],
    timelineToImpact: '4–8 weeks for top-3 Map Pack movement in target cities',
    relatedServiceLink: {
      label: 'Explore Full Local SEO Service Page',
      to: '/services/local-seo',
    },
  },
  {
    id: 'zone-organic-one',
    number: '03',
    zoneTitle: 'Organic #1 — Commercial & Service Pages',
    shortLabel: 'Organic #1 (Service Pages)',
    badgeText: 'HIGHEST BUYER CONVERSION',
    whatItIs:
      'The #1 organic listing for bottom-of-funnel commercial keywords ("best [service] company", "[product] platform") captures ~28–34% of all clicks from buyers ready to request a quote or purchase.',
    howWeWinIt: [
      'Map 1 primary commercial intent per URL with zero keyword cannibalization across pages',
      'Engineer sub-2.0s LCP Core Web Vitals, semantic HTML5 headings, and deep internal link equity',
      'Earn editorial backlinks and digital PR mentions that lift domain & page-level authority',
    ],
    timelineToImpact: '3–6 months for competitive commercial #1–#3 positions',
  },
  {
    id: 'zone-rich-results',
    number: '04',
    zoneTitle: 'Rich Results — Stars, FAQs, Sitelinks & Price Schema',
    shortLabel: 'Rich Snippets & Schema',
    badgeText: '+35% HIGHER CLICK-THROUGH',
    whatItIs:
      'Enhanced organic listings displaying review stars, price ranges, stock status, breadcrumb trails, and 4 clickable sitelinks visually dominate the screen and steal clicks even from higher-ranked plain links.',
    howWeWinIt: [
      'Implement error-free Product, Service, AggregateRating, and BreadcrumbList JSON-LD',
      'Structure clean table-of-contents anchors so Google auto-generates jump sitelinks',
      'Validate every template against Google Rich Results Test & Search Console reports',
    ],
    timelineToImpact: '2–4 weeks after schema deployment & recrawl',
  },
  {
    id: 'zone-paa-clusters',
    number: '05',
    zoneTitle: 'People Also Ask & Topic Authority Blogs',
    shortLabel: 'People Also Ask & Guides',
    badgeText: 'TOP-OF-FUNNEL AUTHORITY',
    whatItIs:
      'Interactive "People Also Ask" accordions and in-depth comparison guides capture decision-makers researching costs, alternatives, and implementation specs before they shortlist vendors.',
    howWeWinIt: [
      'Mine 100+ real customer PAA questions, Reddit threads, and competitor content gaps',
      'Publish pillar-and-cluster authority guides written with subject-matter depth (never generic AI fluff)',
      'Funnel readers from informational guides directly into your commercial money pages via contextual CTAs',
    ],
    timelineToImpact: '6–12 weeks for compounding long-tail traffic & PAA slots',
  },
];

/* ==========================================================================
   SECTION 3 — ICEBERG LAYER DATA (4 LAYERS: 2 ABOVE, 2 BELOW WATERLINE)
   ========================================================================== */
interface IcebergCheckItem {
  title: string;
  detail: string;
  tag: string;
}

interface IcebergLayerData {
  id: string;
  code: string;
  position: 'ABOVE WATERLINE (VISIBLE TO VISITORS)' | 'BELOW WATERLINE (DEEP ENGINEERING)';
  name: string;
  subtitle: string;
  depthMetric: string;
  summary: string;
  checks: IcebergCheckItem[];
  sampleCodeLabel: string;
  sampleCodeSnippet: string;
}

const ICEBERG_LAYERS: IcebergLayerData[] = [
  {
    id: 'layer-onpage',
    code: 'LAYER 01 // SURFACE',
    position: 'ABOVE WATERLINE (VISIBLE TO VISITORS)',
    name: 'On-Page SEO & Search Intent',
    subtitle: 'Title tags, H1–H3 hierarchy, entity coverage & conversion layout',
    depthMetric: '100% Intent Alignment',
    summary:
      'Every commercial and informational page is architected around how real buyers search—aligning title tags, semantic headings, comparison tables, and primary CTAs so visitors stay and convert.',
    checks: [
      {
        title: 'CTR-Engineered Title & Meta',
        detail: 'Primary keyword front-loaded + compelling value hook to maximize SERP click-through rate.',
        tag: 'CTR +28%',
      },
      {
        title: 'Semantic H1 → H2 → H3 Outline',
        detail: 'Single H1 with structured subheadings covering every sub-topic Google expects on Page #1.',
        tag: 'HTML5',
      },
      {
        title: 'Commercial Comparison & Proof Blocks',
        detail: 'Pricing tables, spec matrices, and trust signals that reduce bounce rate and lift dwell time.',
        tag: 'Dwell Time',
      },
      {
        title: 'Image Alt, WebP & Descriptive Filenames',
        detail: 'Next-gen compressed visuals with descriptive alt attributes for Google Images & accessibility.',
        tag: 'Media SEO',
      },
    ],
    sampleCodeLabel: 'ON-PAGE SEMANTIC BLUEPRINT',
    sampleCodeSnippet: `<title>Industrial Solar EPC Installer in India | 100kW–20MW | YourBrand</title>
<meta name="description" content="Turnkey rooftop & ground-mount solar EPC for factories..." />
<h1>Turnkey Industrial Solar EPC Engineering</h1>
  <h2>Commercial Rooftop Solar ROI & Payback Calculator</h2>
  <h2>MNRE & DISCOM Net-Metering Approval Process</h2>`,
  },
  {
    id: 'layer-content',
    code: 'LAYER 02 // SURFACE',
    position: 'ABOVE WATERLINE (VISIBLE TO VISITORS)',
    name: 'Topic Clusters & Authority Content',
    subtitle: 'Pillar pages, buyer guides, original data & E-E-A-T signals',
    depthMetric: 'Topical Authority Map',
    summary:
      'Search engines reward websites that cover an entire subject deeply rather than publishing random isolated blog posts. We build interconnected pillar-and-cluster hubs backed by real expertise.',
    checks: [
      {
        title: 'Hub-and-Spoke Topic Clusters',
        detail: '1 core commercial pillar page supported by 6–12 interlinked comparison, cost, and how-to guides.',
        tag: 'Topical Depth',
      },
      {
        title: 'E-E-A-T Author & Reviewer Signals',
        detail: 'Verified author bios, credentials, citations, and last-reviewed timestamps for YMYL & B2B trust.',
        tag: 'E-E-A-T',
      },
      {
        title: 'Answer-First Snippet Formatting',
        detail: 'Direct 50-word definitions and HTML tables engineered to win Featured Snippets and AI Overviews.',
        tag: 'AEO Ready',
      },
      {
        title: 'Content Decay Refreshes',
        detail: 'Quarterly updates to existing ranking pages with fresh 2025 stats, FAQs, and internal links.',
        tag: 'Compounding',
      },
    ],
    sampleCodeLabel: 'TOPIC CLUSTER INTERNAL GRAPH',
    sampleCodeSnippet: `[Pillar] /services/ecommerce-development (Commercial Money Page)
  ├── [Cluster 01] /blog/shopify-plus-vs-custom-headless-cost
  ├── [Cluster 02] /blog/erp-sap-integration-for-d2c-stores
  ├── [Cluster 03] /blog/woocommerce-to-shopify-seo-migration-checklist
  └── Contextual anchor links passing 100% topical relevance back to Pillar`,
  },
  {
    id: 'layer-technical',
    code: 'LAYER 03 // SUB-SURFACE',
    position: 'BELOW WATERLINE (DEEP ENGINEERING)',
    name: 'Technical SEO, Crawl Budget & Core Web Vitals',
    subtitle: 'Indexation, canonicals, JS rendering, XML sitemaps & sub-2s LCP',
    depthMetric: '90+ Core Web Vitals',
    summary:
      'Because WebXCode is an engineering-first agency, we fix technical bottlenecks directly in your React, Next.js, WordPress, or Shopify codebase—never just handing you a 90-page PDF audit.',
    checks: [
      {
        title: 'Crawl Budget & Index Bloat Cleanup',
        detail: 'Eliminate duplicate parameter URLs, faceted search traps, soft 404s, and orphan pages.',
        tag: 'GSC Clean',
      },
      {
        title: 'Core Web Vitals (LCP, INP, CLS)',
        detail: 'Server-side rendering, font preloading, script deferral, and edge caching for green CWV scores.',
        tag: 'LCP < 2.0s',
      },
      {
        title: 'Schema.org JSON-LD Graph',
        detail: 'Custom Organization, Service, Product, FAQPage, and BreadcrumbList structured data graphs.',
        tag: 'Rich Snippets',
      },
      {
        title: 'Log-File & AI Bot Crawlability',
        detail: 'Clean robots.txt, dynamic XML sitemaps, and SSR so Googlebot, GPTBot, and PerplexityBot index 100% of content.',
        tag: 'SSR / Bot Ready',
      },
    ],
    sampleCodeLabel: 'JSON-LD + ROBOTS DIRECTIVE',
    sampleCodeSnippet: `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Enterprise SEO & AEO Engineering",
  "provider": { "@type": "Organization", "name": "WebXCode" },
  "areaServed": ["IN", "US", "GB", "AE"]
}`,
  },
  {
    id: 'layer-authority',
    code: 'LAYER 04 // DEEP FOUNDATION',
    position: 'BELOW WATERLINE (DEEP ENGINEERING)',
    name: 'Off-Page Authority, Digital PR & Internal Link Graph',
    subtitle: 'Editorial backlinks, brand citations, link reclamation & anchor distribution',
    depthMetric: 'White-Hat DR Growth',
    summary:
      'In competitive markets, great content and clean code need domain authority to break into the top 3. We earn white-hat editorial backlinks and engineer internal PageRank flow across your site.',
    checks: [
      {
        title: 'Editorial Digital PR & Industry Links',
        detail: 'Contextual placements on real, traffic-verified industry publications—zero PBNs or spammy link farms.',
        tag: '100% White-Hat',
      },
      {
        title: 'Competitor Backlink Gap Acquisition',
        detail: 'Reverse-engineer the exact referring domains powering top-3 competitors and secure stronger placements.',
        tag: 'Link Gap',
      },
      {
        title: 'Internal PageRank Sculpting',
        detail: 'Strategic hub-to-money-page internal linking so high-authority blogs pass ranking power to service pages.',
        tag: 'Link Equity',
      },
      {
        title: 'Unlinked Brand Mention & 404 Reclamation',
        detail: 'Convert unlinked press mentions into dofollow links and rescue lost equity from historical broken URLs.',
        tag: 'Reclamation',
      },
    ],
    sampleCodeLabel: 'AUTHORITY & LINK VELOCITY POLICY',
    sampleCodeSnippet: `✔ Referring Domain Criteria: DR 40–80+, >5,000 monthly organic traffic
✔ Anchor Profile: 70% Branded / Natural • 20% Partial Match • 10% Target Commercial
✖ Zero PBNs, Zero Paid Link Farms, Zero Automated Comment Spam`,
  },
];

/* ==========================================================================
   SECTION 4 — SEO + AEO + GEO: THE 3-ENGINE SEARCH SWITCHER
   ========================================================================== */
interface SearchEngineTabSpec {
  id: 'google-seo' | 'aeo-voice' | 'geo-ai';
  tabTitle: string;
  tabBadge: string;
  engineSubtitle: string;
  whereItShows: string[];
  queryPrompt: string;
  mockWindowTitle: string;
  mockType: 'google-serp' | 'answer-box' | 'ai-chat';
  whatWeOptimize: {
    title: string;
    desc: string;
  }[];
  crossLink?: {
    label: string;
    to: string;
    badge?: string;
  };
}

const THREE_ENGINES_DATA: SearchEngineTabSpec[] = [
  {
    id: 'google-seo',
    tabTitle: 'Traditional SEO',
    tabBadge: 'CORE REVENUE ENGINE',
    engineSubtitle: 'Google & Bing Organic Rankings, Local Map Pack & Rich Product/Service Snippets',
    whereItShows: ['Google Organic #1–#3', 'Google Maps 3-Pack', 'Bing Search', 'Google Images & Shopping'],
    queryPrompt: 'enterprise erp implementation partner india',
    mockWindowTitle: 'google.com/search?q=enterprise+erp+implementation+partner',
    mockType: 'google-serp',
    whatWeOptimize: [
      {
        title: 'Commercial Landing Page Architecture',
        desc: 'Dedicated service, industry, and solution pages mapped to high-converting buyer keywords.',
      },
      {
        title: 'Core Web Vitals & Crawl Engineering',
        desc: 'Sub-2s loading speed, clean canonicals, XML sitemaps, and zero indexation waste.',
      },
      {
        title: 'Rich Snippet Schema & Editorial Links',
        desc: 'Review stars, FAQ toggles, sitelinks, and white-hat authority backlinks that lock in top-3 positions.',
      },
    ],
  },
  {
    id: 'aeo-voice',
    tabTitle: 'AEO (Answer Engine Optimization)',
    tabBadge: 'NEW • ZERO-CLICK',
    engineSubtitle: 'Featured Snippets, Google AI Overviews, People Also Ask & Voice Assistants',
    whereItShows: ['Featured Snippet (Position #0)', 'People Also Ask (PAA)', 'Google AI Overviews', 'Siri / Alexa / Voice'],
    queryPrompt: 'How long does custom ERP migration take without downtime?',
    mockWindowTitle: 'Answer Engine // Position #0 Featured Snippet',
    mockType: 'answer-box',
    whatWeOptimize: [
      {
        title: 'Concise 45–60 Word Direct Answer Blocks',
        desc: 'Structured definition and step-by-step blocks placed immediately after question-based H2 headings.',
      },
      {
        title: 'FAQPage, HowTo & Speakable Schema',
        desc: 'Machine-readable Q&A pairs and structured tables that Google extracts verbatim into Position #0.',
      },
      {
        title: 'People Also Ask (PAA) Tree Coverage',
        desc: 'Answering the full chain of follow-up questions so your domain owns multiple slots on the same SERP.',
      },
    ],
    crossLink: {
      label: 'Explore Full AEO Services Page',
      to: '/services/aeo-services',
      badge: 'NEW',
    },
  },
  {
    id: 'geo-ai',
    tabTitle: 'GEO (Generative Engine Optimization)',
    tabBadge: 'NEW • AI CITATIONS',
    engineSubtitle: 'ChatGPT Search, Perplexity, Claude, Gemini & Copilot Brand Recommendations',
    whereItShows: ['ChatGPT Search', 'Perplexity AI', 'Google Gemini', 'Microsoft Copilot'],
    queryPrompt: 'Which agency in India builds fast Next.js websites and handles technical SEO under one roof?',
    mockWindowTitle: 'AI Assistant // Generative Search Synthesis',
    mockType: 'ai-chat',
    whatWeOptimize: [
      {
        title: 'Entity Clarity & Knowledge Graph Signals',
        desc: 'Consistent brand attributes, comparison matrices, and sameAs schema so LLMs associate your brand with your category.',
      },
      {
        title: 'Cite-Worthy Original Data & Benchmarks',
        desc: 'Publishing structured specifications, pricing transparency, and verifiable frameworks that AI models quote.',
      },
      {
        title: 'SSR & AI Crawler Accessibility',
        desc: 'Server-side rendered HTML and explicit GPTBot / PerplexityBot / OAI-SearchBot access so your pages are never invisible to AI.',
      },
    ],
    crossLink: {
      label: 'Explore Full GEO Services Page',
      to: '/services/geo-generative-engine-optimization',
      badge: 'NEW',
    },
  },
];

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */
interface SeoServicesProps {
  onOpenQuoteModal?: (service?: string) => void;
}

const SeoServices: React.FC<SeoServicesProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Pull single source of truth from Services.tsx */
  const seoServiceItem = useMemo(
    () => services.find((s) => s.slug === 'seo-services'),
    []
  );

  /* Section 1: Interactive SERP Query state */
  const [selectedQueryId, setSelectedQueryId] = useState<string>(HERO_QUERIES[0].id);
  const activeHeroQuery = useMemo(
    () => HERO_QUERIES.find((q) => q.id === selectedQueryId) || HERO_QUERIES[0],
    [selectedQueryId]
  );

  /* Section 2: Interactive SERP Anatomy Zone state */
  const [selectedZoneId, setSelectedZoneId] = useState<string>(SERP_ZONES[0].id);
  const activeSerpZone = useMemo(
    () => SERP_ZONES.find((z) => z.id === selectedZoneId) || SERP_ZONES[0],
    [selectedZoneId]
  );

  /* Section 3: Iceberg Layer state */
  const [selectedLayerId, setSelectedLayerId] = useState<string>(ICEBERG_LAYERS[2].id); // Default to Technical SEO below waterline
  const activeIcebergLayer = useMemo(
    () => ICEBERG_LAYERS.find((l) => l.id === selectedLayerId) || ICEBERG_LAYERS[2],
    [selectedLayerId]
  );

  /* Section 4: 3-Engine Switcher state */
  const [selectedEngineId, setSelectedEngineId] = useState<'google-seo' | 'aeo-voice' | 'geo-ai'>(
    'google-seo'
  );
  const activeEngine = useMemo(
    () => THREE_ENGINES_DATA.find((e) => e.id === selectedEngineId) || THREE_ENGINES_DATA[0],
    [selectedEngineId]
  );

  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Global Quote Modal Trigger helper */
  const triggerQuoteModal = (preselectedService?: string) => {
    const svcLabel = preselectedService || seoServiceItem?.name || 'SEO Services';
    if (onOpenQuoteModal) {
      onOpenQuoteModal(svcLabel);
      return;
    }
    window.dispatchEvent(
      new CustomEvent('open-quote-modal', {
        detail: {
          service: svcLabel,
        },
      })
    );
  };

  /* JSON-LD Structured Data (Service) */
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: seoServiceItem?.name || 'SEO Services',
      description:
        seoServiceItem?.description ||
        'Technical SEO, on-page optimization, authority content clusters, Local SEO, and AEO/GEO optimization for Google and AI search engines.',
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      serviceType: 'Search Engine Optimization (SEO), AEO & GEO',
      areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'AU'],
    }),
    [seoServiceItem]
  );

  return (
    <main className="flex-1 bg-white text-navy">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: LIVE GOOGLE + AI SEARCH SIMULATOR (bg: #1e242e navy)
         ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Radial blue glow + subtle search grid */}
        <div className="absolute -top-24 right-1/4 w-[620px] h-[620px] blue-glow-strong pointer-events-none opacity-75" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/70 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </li>
              <li className="text-primary-100 font-semibold" aria-current="page">
                {seoServiceItem?.name || 'SEO Services'}
              </li>
            </ol>
          </nav>

          {/* 50% / 50% Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 50% (6 cols on lg) */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Search className="w-3.5 h-3.5 text-primary" />
                <span>SEO SERVICES • GOOGLE + AI SEARCH</span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-tight">
                Rank Where Your Buyers{' '}
                <span className="text-primary">Actually Search</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65]">
                {seoServiceItem?.description ||
                  'Ranking on page one requires more than stuffing keywords into blog posts. We combine deep technical SEO, Core Web Vitals engineering, search-intent content clusters, and high-authority digital PR to turn organic search into your lowest-CAC acquisition channel.'}{' '}
                Plus, we structure your pages for <strong className="text-white">Google AI Overviews, ChatGPT, and Perplexity</strong>.
              </p>

              {/* Two CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('Free SEO & AI Search Audit')}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Get a Free SEO Audit</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#what-we-do"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>See What&apos;s Included</span>
                </a>
              </div>

              {/* 4 Capability Chips below buttons */}
              <div className="mt-9 pt-7 border-t border-white/10">
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/55 mb-3">
                  4-PILLAR ORGANIC ARCHITECTURE
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Technical SEO', icon: Code2 },
                    { label: 'On-Page & Content', icon: FileText },
                    { label: 'Local SEO & Maps', icon: MapPin },
                    { label: 'AI Search (AEO / GEO)', icon: Sparkles },
                  ].map((chip) => {
                    const IconComp = chip.icon;
                    return (
                      <span
                        key={chip.label}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-[13px] font-semibold text-white/90"
                      >
                        <IconComp className="w-3.5 h-3.5 text-primary" />
                        <span>{chip.label}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 50% (6 cols on lg): Interactive Search Results (SERP) Simulator */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] bg-white/[0.06] border border-white/15 backdrop-blur-md p-4 sm:p-6 shadow-2xl">
                {/* Browser Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="ml-1.5 font-mono text-[11px] font-bold text-white/75 uppercase tracking-wider">
                      LIVE SERP SIMULATOR // PAGE #1
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-primary-100">
                    Click a query below to test
                  </span>
                </div>

                {/* 3 Interactive Query Chips */}
                <div
                  className="flex flex-wrap items-center gap-2 mb-4"
                  role="tablist"
                  aria-label="Sample buyer search queries"
                >
                  {HERO_QUERIES.map((q) => {
                    const isSelected = q.id === selectedQueryId;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setSelectedQueryId(q.id)}
                        className={`px-3.5 py-1.5 rounded-full font-mono text-[12px] font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-navy/70 text-white/75 border-white/15 hover:border-white/40 hover:text-white'
                        }`}
                      >
                        {q.chipLabel}
                      </button>
                    );
                  })}
                </div>

                {/* Simulated Google Search Input Bar */}
                <div className="rounded-full bg-white text-navy px-4 py-2.5 flex items-center justify-between gap-3 shadow-inner border border-navy-15">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Search className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-mono text-[13px] sm:text-[14px] font-bold text-navy truncate">
                      {activeHeroQuery.queryText}
                    </span>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[10px] font-extrabold shrink-0">
                    <span>INTENT: COMMERCIAL</span>
                  </span>
                </div>

                <div className="mt-2 px-2 flex items-center justify-between font-mono text-[11px] text-white/55">
                  <span>{activeHeroQuery.resultsMeta}</span>
                  <span className="text-emerald-400 font-semibold">● All Rich Schemas Valid</span>
                </div>

                {/* Animated SERP Results Area */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroQuery.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 space-y-3"
                  >
                    {/* 1. AI Overview Card at Top of SERP */}
                    <div className="rounded-2xl bg-primary/15 border border-primary/40 p-4">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                          <Sparkles className="w-3.5 h-3.5 text-primary" />
                          <span>AI Overview • Synthesized Answer</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 font-mono text-[10px] font-bold text-emerald-300">
                          CITED SOURCE #1
                        </span>
                      </div>
                      <p className="text-[12.5px] text-white/90 leading-relaxed">
                        {activeHeroQuery.aiOverview.summary}
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-[11px]">
                        <span className="inline-flex items-center gap-1.5 font-mono font-bold text-primary-100">
                          <Link2 className="w-3 h-3 text-primary" />
                          <span>{activeHeroQuery.aiOverview.citationBadge}</span>
                        </span>
                        <span className="font-mono text-white/60 truncate">
                          {activeHeroQuery.aiOverview.citationUrl}
                        </span>
                      </div>
                    </div>

                    {/* 2. Organic #1 Result — Highlighted Client Card */}
                    <div className="rounded-2xl bg-white text-navy p-4 sm:p-5 border-2 border-primary shadow-xl relative">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-6 h-6 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold flex items-center justify-center shrink-0">
                            Y
                          </span>
                          <div className="min-w-0">
                            <div className="text-[12px] font-extrabold text-navy leading-none">
                              {activeHeroQuery.rankOneResult.brandName}
                            </div>
                            <div className="font-mono text-[11px] text-navy-60 truncate mt-0.5">
                              {activeHeroQuery.rankOneResult.urlBreadcrumb}
                            </div>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 font-mono text-[11px] font-extrabold shrink-0">
                          <span>RANK #1 ORGANIC</span>
                        </span>
                      </div>

                      <h2 className="text-[15px] sm:text-[16px] font-extrabold text-primary leading-snug mt-2">
                        {activeHeroQuery.rankOneResult.title}
                      </h2>

                      <p className="text-[12.5px] text-navy-70 leading-relaxed mt-1.5">
                        {activeHeroQuery.rankOneResult.description}
                      </p>

                      {/* Rich Snippet Stars + Schema Tag */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11.5px]">
                        <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{activeHeroQuery.rankOneResult.rating}/5.0</span>
                          <span className="text-navy-60 font-medium">
                            ({activeHeroQuery.rankOneResult.reviewsCount})
                          </span>
                        </span>
                        <span className="text-navy-30">•</span>
                        <span className="font-mono text-[11px] font-bold text-emerald-700">
                          ✔ FAQ &amp; Service Schema
                        </span>
                      </div>

                      {/* Sitelinks Row */}
                      <div className="mt-3 pt-2.5 border-t border-navy-08 flex flex-wrap gap-1.5">
                        {activeHeroQuery.rankOneResult.sitelinks.map((sl) => (
                          <span
                            key={sl}
                            className="px-2.5 py-1 rounded-lg bg-primary-50 text-primary font-semibold text-[11px]"
                          >
                            {sl} ›
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 3. Dimmed Competitor Results #2 & #3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeHeroQuery.competitors.map((comp) => (
                        <div
                          key={comp.rank}
                          className="rounded-xl bg-white/[0.04] border border-white/10 p-3 opacity-75"
                        >
                          <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-white/55">
                            <span className="truncate">{comp.domain}</span>
                            <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-bold shrink-0">
                              #{comp.rank}
                            </span>
                          </div>
                          <div className="text-[12px] font-bold text-white/80 line-clamp-1 mt-1">
                            {comp.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — ANATOMY OF PAGE #1: WHERE WE GET YOU FOUND (bg: #ffffff)
         ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              WHERE YOU APPEAR
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Page One Has Changed —{' '}
              <span className="text-primary">We Optimize for Every Slot</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Modern search results are no longer ten plain blue links. Click any of the 5 numbered
              zones on the Page #1 map below to inspect how we engineer your brand into that exact
              real estate.
            </p>
          </div>

          {/* 2-Column Interactive SERP Anatomy Map + Zone Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column (7 cols on lg): Visual SERP Map with 5 Clickable Numbered Zones */}
            <div className="lg:col-span-7 rounded-[24px] bg-primary-50/60 border border-primary-100 p-4 sm:p-6">
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-primary-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-navy-70">
                    GOOGLE + AI PAGE #1 ANATOMY MAP
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold text-primary">
                  Select Zone 01 – 05
                </span>
              </div>

              <div className="space-y-3" role="tablist" aria-label="SERP Zones">
                {/* ZONE 01: AI Overview */}
                {(() => {
                  const zone = SERP_ZONES[0];
                  const isActive = selectedZoneId === zone.id;
                  return (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`w-full text-left rounded-2xl p-4 transition-all cursor-pointer border-2 ${
                        isActive
                          ? 'bg-navy text-white border-primary shadow-lg'
                          : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span
                            className={`w-8 h-8 rounded-xl font-mono text-[13px] font-extrabold flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-primary text-white'
                                : 'bg-primary-50 text-primary'
                            }`}
                          >
                            01
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[15px] font-extrabold">
                                AI Overview / Answer Box (AEO &amp; GEO)
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                                  isActive
                                    ? 'bg-primary/25 text-primary-100'
                                    : 'bg-primary-50 text-primary'
                                }`}
                              >
                                POSITION #0
                              </span>
                            </div>
                            <p
                              className={`text-[12.5px] mt-1 ${
                                isActive ? 'text-white/75' : 'text-navy-60'
                              }`}
                            >
                              AI-synthesized summary block with clickable source citation cards at the top of search.
                            </p>
                          </div>
                        </div>
                        <Sparkles
                          className={`w-5 h-5 shrink-0 ${
                            isActive ? 'text-primary' : 'text-navy-40'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })()}

                {/* ZONE 02: Local 3-Pack (Map Pack) */}
                {(() => {
                  const zone = SERP_ZONES[1];
                  const isActive = selectedZoneId === zone.id;
                  return (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`w-full text-left rounded-2xl p-4 transition-all cursor-pointer border-2 ${
                        isActive
                          ? 'bg-navy text-white border-primary shadow-lg'
                          : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span
                            className={`w-8 h-8 rounded-xl font-mono text-[13px] font-extrabold flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-primary text-white'
                                : 'bg-primary-50 text-primary'
                            }`}
                          >
                            02
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[15px] font-extrabold">
                                Google Local 3-Pack (Maps &amp; GBP)
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                                  isActive
                                    ? 'bg-primary/25 text-primary-100'
                                    : 'bg-primary-50 text-primary'
                                }`}
                              >
                                LOCAL INTENT
                              </span>
                            </div>
                            <p
                              className={`text-[12.5px] mt-1 ${
                                isActive ? 'text-white/75' : 'text-navy-60'
                              }`}
                            >
                              Map pins, star ratings, phone call buttons &amp; city/branch landing pages.
                            </p>
                          </div>
                        </div>
                        <MapPin
                          className={`w-5 h-5 shrink-0 ${
                            isActive ? 'text-primary' : 'text-navy-40'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })()}

                {/* ZONE 03: Organic #1 Service/Commercial Listing */}
                {(() => {
                  const zone = SERP_ZONES[2];
                  const isActive = selectedZoneId === zone.id;
                  return (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`w-full text-left rounded-2xl p-4 transition-all cursor-pointer border-2 ${
                        isActive
                          ? 'bg-navy text-white border-primary shadow-lg'
                          : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span
                            className={`w-8 h-8 rounded-xl font-mono text-[13px] font-extrabold flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-primary text-white'
                                : 'bg-primary-50 text-primary'
                            }`}
                          >
                            03
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[15px] font-extrabold">
                                Organic #1 — Commercial &amp; Service Pages
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                                  isActive
                                    ? 'bg-emerald-500/25 text-emerald-300'
                                    : 'bg-emerald-500/10 text-emerald-700'
                                }`}
                              >
                                ~31% CLICK SHARE
                              </span>
                            </div>
                            <p
                              className={`text-[12.5px] mt-1 ${
                                isActive ? 'text-white/75' : 'text-navy-60'
                              }`}
                            >
                              Your core revenue service, product, or category page ranking #1 for buyer keywords.
                            </p>
                          </div>
                        </div>
                        <Award
                          className={`w-5 h-5 shrink-0 ${
                            isActive ? 'text-primary' : 'text-navy-40'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })()}

                {/* ZONE 04: Rich Results (Stars, FAQs, Sitelinks) */}
                {(() => {
                  const zone = SERP_ZONES[3];
                  const isActive = selectedZoneId === zone.id;
                  return (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`w-full text-left rounded-2xl p-4 transition-all cursor-pointer border-2 ${
                        isActive
                          ? 'bg-navy text-white border-primary shadow-lg'
                          : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span
                            className={`w-8 h-8 rounded-xl font-mono text-[13px] font-extrabold flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-primary text-white'
                                : 'bg-primary-50 text-primary'
                            }`}
                          >
                            04
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[15px] font-extrabold">
                                Rich Snippets — Stars, FAQs, Sitelinks &amp; Price
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                                  isActive
                                    ? 'bg-primary/25 text-primary-100'
                                    : 'bg-primary-50 text-primary'
                                }`}
                              >
                                JSON-LD SCHEMA
                              </span>
                            </div>
                            <p
                              className={`text-[12.5px] mt-1 ${
                                isActive ? 'text-white/75' : 'text-navy-60'
                              }`}
                            >
                              Visual enhancements that double your listing height and boost organic CTR by up to 35%.
                            </p>
                          </div>
                        </div>
                        <Code2
                          className={`w-5 h-5 shrink-0 ${
                            isActive ? 'text-primary' : 'text-navy-40'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })()}

                {/* ZONE 05: People Also Ask & Topic Authority Blogs */}
                {(() => {
                  const zone = SERP_ZONES[4];
                  const isActive = selectedZoneId === zone.id;
                  return (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`w-full text-left rounded-2xl p-4 transition-all cursor-pointer border-2 ${
                        isActive
                          ? 'bg-navy text-white border-primary shadow-lg'
                          : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span
                            className={`w-8 h-8 rounded-xl font-mono text-[13px] font-extrabold flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-primary text-white'
                                : 'bg-primary-50 text-primary'
                            }`}
                          >
                            05
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[15px] font-extrabold">
                                People Also Ask &amp; Authority Cluster Guides
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                                  isActive
                                    ? 'bg-primary/25 text-primary-100'
                                    : 'bg-primary-50 text-primary'
                                }`}
                              >
                                TOPIC CLUSTERS
                              </span>
                            </div>
                            <p
                              className={`text-[12.5px] mt-1 ${
                                isActive ? 'text-white/75' : 'text-navy-60'
                              }`}
                            >
                              Capturing research-stage buyers comparing costs, specs, and vendor alternatives.
                            </p>
                          </div>
                        </div>
                        <FileText
                          className={`w-5 h-5 shrink-0 ${
                            isActive ? 'text-primary' : 'text-navy-40'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })()}
              </div>
            </div>

            {/* Right Column (5 cols on lg): Live Zone Engineering Inspector */}
            <div className="lg:col-span-5">
              <div className="h-full rounded-[24px] bg-navy text-white p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-72 h-72 blue-glow pointer-events-none opacity-60" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSerpZone.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/15">
                        <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-wider">
                          ZONE {activeSerpZone.number} INSPECTOR
                        </span>
                        <span className="font-mono text-[11px] font-bold text-primary-100">
                          {activeSerpZone.badgeText}
                        </span>
                      </div>

                      <h3 className="mt-5 text-[22px] sm:text-[24px] font-extrabold text-white leading-snug">
                        {activeSerpZone.zoneTitle}
                      </h3>

                      {/* What It Is */}
                      <div className="mt-4 p-4 rounded-2xl bg-white/[0.06] border border-white/10">
                        <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100 mb-1">
                          WHAT THIS SLOT IS
                        </div>
                        <p className="text-[13.5px] text-white/85 leading-relaxed">
                          {activeSerpZone.whatItIs}
                        </p>
                      </div>

                      {/* How WebXCode Wins It */}
                      <div className="mt-5">
                        <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100 mb-3">
                          HOW WE ENGINEER &amp; WIN THIS SLOT
                        </div>
                        <ul className="space-y-2.5">
                          {activeSerpZone.howWeWinIt.map((step) => (
                            <li
                              key={step}
                              className="flex items-start gap-2.5 text-[13.5px] text-white/90 leading-snug"
                            >
                              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3" strokeWidth={2.5} />
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Typical Timeline */}
                      <div className="mt-5 p-3.5 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-between gap-3">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                          TYPICAL TIMELINE:
                        </span>
                        <span className="font-mono text-[12px] font-extrabold text-white text-right">
                          {activeSerpZone.timelineToImpact}
                        </span>
                      </div>
                    </div>

                    {/* Related Link + Quote Trigger */}
                    <div className="mt-6 pt-5 border-t border-white/15 space-y-3">
                      {activeSerpZone.relatedServiceLink && (
                        <Link
                          href={activeSerpZone.relatedServiceLink.to}
                          className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-[13px] font-bold text-primary-100 hover:text-white flex items-center justify-between transition-colors"
                        >
                          <span>{activeSerpZone.relatedServiceLink.label}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(`SEO Audit — ${activeSerpZone.shortLabel}`)
                        }
                        className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer"
                      >
                        <span>Audit My Visibility in Zone {activeSerpZone.number}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — WHAT WE DO: THE SEO ICEBERG (ABOVE & BELOW THE SURFACE)
         (bg: #f0f7fd, id="what-we-do")
         ====================================================================== */}
      <section id="what-we-do" className="py-[72px] lg:py-[112px] bg-primary-50 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              4 PILLARS OF SEO
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              What Visitors See — and the{' '}
              <span className="text-primary">Engineering Underneath</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Most agencies only touch surface-level blog keywords. Real rankings come from uniting
              what visitors read above the waterline with deep technical architecture and authority
              below it. Click any of the 4 layers to inspect our checklist.
            </p>
          </div>

          {/* Split Cross-Section Diagram (Left 5 Cols) + Deep Checklist Inspector (Right 7 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 5 Cols: Interactive Iceberg Cross-Section Stack */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-[24px] bg-white border border-navy-08 p-4 sm:p-5 shadow-soft">
              {/* Surface Zone Header */}
              <div className="px-3 py-1.5 rounded-lg bg-primary-50/80 border border-primary-100 flex items-center justify-between mb-2.5">
                <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                  ▲ ABOVE WATERLINE (VISIBLE TO VISITORS)
                </span>
                <span className="font-mono text-[10px] font-bold text-navy-60">2 LAYERS</span>
              </div>

              {/* Top 2 Surface Layers */}
              <div className="space-y-2.5">
                {ICEBERG_LAYERS.slice(0, 2).map((layer) => {
                  const isSelected = layer.id === selectedLayerId;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      onClick={() => setSelectedLayerId(layer.id)}
                      className={`w-full text-left p-4 rounded-2xl transition-all cursor-pointer border-2 ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-md'
                          : 'bg-primary-50/40 text-navy border-primary-100 hover:border-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-mono text-[10px] font-extrabold uppercase tracking-wider ${
                            isSelected ? 'text-white/90' : 'text-primary'
                          }`}
                        >
                          {layer.code}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-white text-navy-70 border border-navy-08'
                          }`}
                        >
                          {layer.depthMetric}
                        </span>
                      </div>
                      <h3 className="text-[16px] font-extrabold mt-1">{layer.name}</h3>
                      <p
                        className={`text-[12px] mt-0.5 ${
                          isSelected ? 'text-white/85' : 'text-navy-60'
                        }`}
                      >
                        {layer.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* THE WATERLINE DIVIDER */}
              <div className="my-4 relative py-2 flex items-center justify-center">
                <div
                  className="w-full border-t-2 border-dashed border-primary"
                  aria-hidden="true"
                />
                <span className="absolute px-3.5 py-1 rounded-full bg-navy text-primary-100 font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] border border-primary/40 shadow-sm">
                  ~~~ SURFACE WATERLINE ~~~
                </span>
              </div>

              {/* Sub-Surface Zone Header */}
              <div className="px-3 py-1.5 rounded-lg bg-navy text-white flex items-center justify-between mb-2.5">
                <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                  ▼ BELOW WATERLINE (DEEP ENGINEERING)
                </span>
                <span className="font-mono text-[10px] font-bold text-white/60">2 LAYERS</span>
              </div>

              {/* Bottom 2 Deep Layers */}
              <div className="space-y-2.5">
                {ICEBERG_LAYERS.slice(2, 4).map((layer) => {
                  const isSelected = layer.id === selectedLayerId;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      onClick={() => setSelectedLayerId(layer.id)}
                      className={`w-full text-left p-4 rounded-2xl transition-all cursor-pointer border-2 ${
                        isSelected
                          ? 'bg-navy text-white border-primary shadow-lg ring-2 ring-primary/30'
                          : 'bg-navy/90 text-white/85 border-navy hover:border-primary/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                          {layer.code}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-primary/25 text-primary-100 font-mono text-[10px] font-bold">
                          {layer.depthMetric}
                        </span>
                      </div>
                      <h3 className="text-[16px] font-extrabold text-white mt-1">{layer.name}</h3>
                      <p className="text-[12px] text-white/70 mt-0.5">{layer.subtitle}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 7 Cols: Selected Iceberg Layer Engineering Checklist + Code/Spec Preview */}
            <div className="lg:col-span-7">
              <div className="h-full rounded-[24px] bg-white border border-navy-08 p-6 sm:p-8 shadow-soft flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIcebergLayer.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-navy-08">
                        <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase">
                          {activeIcebergLayer.code} • {activeIcebergLayer.position}
                        </span>
                        <span className="font-mono text-[12px] font-extrabold text-emerald-700">
                          ● {activeIcebergLayer.depthMetric}
                        </span>
                      </div>

                      <h3 className="mt-5 text-[24px] sm:text-[28px] font-extrabold text-navy leading-snug">
                        {activeIcebergLayer.name}
                      </h3>
                      <p className="mt-2 text-[15px] text-navy-70 leading-relaxed">
                        {activeIcebergLayer.summary}
                      </p>

                      {/* 4-Card Deliverable Grid */}
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {activeIcebergLayer.checks.map((item) => (
                          <div
                            key={item.title}
                            className="p-4 rounded-2xl bg-primary-50/50 border border-primary-100 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                                  <Check className="w-3 h-3" strokeWidth={2.5} />
                                </span>
                                <span className="px-2 py-0.5 rounded bg-white border border-primary-100 font-mono text-[10px] font-bold text-primary">
                                  {item.tag}
                                </span>
                              </div>
                              <h4 className="text-[15px] font-extrabold text-navy mt-1">
                                {item.title}
                              </h4>
                              <p className="text-[13px] text-navy-70 leading-relaxed mt-1">
                                {item.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Monospace Technical Spec / Code Block */}
                      <div className="mt-6 rounded-2xl bg-navy text-white p-4 sm:p-5 border border-navy">
                        <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-white/10">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                            {activeIcebergLayer.sampleCodeLabel}
                          </span>
                          <span className="font-mono text-[10px] text-emerald-400">
                            VERIFIED IMPLEMENTATION
                          </span>
                        </div>
                        <pre className="font-mono text-[11.5px] sm:text-[12px] text-white/90 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                          {activeIcebergLayer.sampleCodeSnippet}
                        </pre>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-[13px] font-semibold text-navy-70">
                        Included in every monthly WebXCode SEO &amp; Growth retainer
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(`SEO Services — ${activeIcebergLayer.name}`)
                        }
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-navy hover:bg-primary text-white font-semibold text-[14px] transition-all cursor-pointer shrink-0"
                      >
                        <span>Request Full {activeIcebergLayer.name.split('&')[0]} Audit</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — SEO + AEO + GEO: THE 3-ENGINE SEARCH SWITCHER (bg: #ffffff)
         ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>FUTURE-READY SEARCH • NEW</span>
            </div>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Google Search. Voice Answers.{' '}
              <span className="text-primary">AI Engines.</span> One Strategy.
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              B2B decision-makers and consumers now discover brands across three distinct search
              engines: traditional Google SERPs, direct Answer Boxes, and generative AI assistants.
              Switch between the 3 engines below to see how we optimize for each.
            </p>
          </div>

          {/* 3-Tab Switcher Bar */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8"
            role="tablist"
            aria-label="Search Engine Optimization Modes"
          >
            {THREE_ENGINES_DATA.map((eng) => {
              const isSelected = eng.id === selectedEngineId;
              return (
                <button
                  key={eng.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedEngineId(eng.id)}
                  className={`text-left p-4 sm:p-5 rounded-[20px] transition-all cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-navy text-white border-primary shadow-soft'
                      : 'bg-primary-50/40 text-navy border-navy-08 hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-extrabold uppercase tracking-wider ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-primary-50 text-primary border border-primary-100'
                      }`}
                    >
                      {eng.tabBadge}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 ${
                        isSelected ? 'text-primary translate-x-0.5' : 'text-navy-40'
                      }`}
                    />
                  </div>
                  <div className="text-[17px] font-extrabold">{eng.tabTitle}</div>
                  <div
                    className={`text-[12.5px] mt-1 line-clamp-1 ${
                      isSelected ? 'text-white/75' : 'text-navy-60'
                    }`}
                  >
                    {eng.engineSubtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Engine Console */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEngine.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="rounded-[26px] bg-primary-50/50 border border-primary-100 p-6 sm:p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left 6 Cols: Simulated Result Window for the Active Engine */}
                <div className="lg:col-span-6">
                  <div className="rounded-[22px] bg-navy text-white p-5 sm:p-6 shadow-xl border border-navy">
                    <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <span className="ml-2 font-mono text-[11px] text-white/75 truncate">
                          {activeEngine.mockWindowTitle}
                        </span>
                      </div>
                    </div>

                    {/* Query Prompt Bar */}
                    <div className="p-3 rounded-xl bg-white/[0.07] border border-white/15 flex items-center gap-2.5">
                      <Search className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-mono text-[12.5px] text-white font-semibold">
                        {activeEngine.queryPrompt}
                      </span>
                    </div>

                    {/* Engine-Specific Visual Result Mock */}
                    {activeEngine.mockType === 'google-serp' && (
                      <div className="mt-4 rounded-xl bg-white text-navy p-4 border-2 border-primary">
                        <div className="flex items-center justify-between text-[11px] font-mono text-navy-60">
                          <span>https://www.yourbrand.com › enterprise-erp</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 font-bold">
                            RANK #1
                          </span>
                        </div>
                        <div className="text-[15px] font-extrabold text-primary mt-1">
                          Enterprise ERP Implementation Partner in India | Zero-Downtime Migration
                        </div>
                        <p className="text-[12px] text-navy-70 mt-1">
                          ISO-certified SAP, Oracle &amp; custom cloud ERP implementation with automated GST compliance and 99.98% data accuracy.
                        </p>
                        <div className="mt-2.5 pt-2 border-t border-navy-08 flex flex-wrap items-center gap-3 text-[11px] font-bold text-amber-600">
                          <span>★★★★★ 4.9 (310+ B2B Reviews)</span>
                          <span className="text-primary">• Case Studies ›</span>
                          <span className="text-primary">• Pricing Calculator ›</span>
                        </div>
                      </div>
                    )}

                    {activeEngine.mockType === 'answer-box' && (
                      <div className="mt-4 rounded-xl bg-white text-navy p-4 border-2 border-primary">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[10px] font-extrabold uppercase">
                            FEATURED SNIPPET • POSITION #0
                          </span>
                          <span className="font-mono text-[10px] font-bold text-emerald-700">
                            Speakable + HowTo Schema
                          </span>
                        </div>
                        <p className="text-[13px] text-navy leading-relaxed font-medium">
                          <strong className="bg-primary-100 text-navy px-1 rounded">
                            A phased parallel-run ERP migration takes 6 to 10 weeks with zero operational downtime.
                          </strong>{' '}
                          By syncing legacy SQL databases via staging webhooks and validating 100% of historical ledgers prior to weekend cutover, teams avoid billing disruption.
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-navy-08 flex items-center justify-between text-[11px]">
                          <span className="font-extrabold text-primary">
                            YourBrand — Enterprise ERP Migration Guide
                          </span>
                          <span className="font-mono text-navy-50">yourbrand.com/erp-guide</span>
                        </div>
                      </div>
                    )}

                    {activeEngine.mockType === 'ai-chat' && (
                      <div className="mt-4 rounded-xl bg-white/[0.06] border border-primary/50 p-4 text-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-primary-100">
                            <Bot className="w-4 h-4 text-primary" />
                            <span>AI Search Response (ChatGPT / Perplexity / Gemini)</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                            PRIMARY RECOMMENDATION
                          </span>
                        </div>
                        <p className="text-[13px] text-white/90 leading-relaxed">
                          Based on verified Core Web Vitals benchmarks, schema implementation, and full-stack capabilities,{' '}
                          <strong className="text-primary-100 underline decoration-primary">
                            WebXCode [1]
                          </strong>{' '}
                          is a top-rated partner in India combining custom Next.js engineering with technical SEO, AEO, and GEO under one roof.
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-primary/25 border border-primary/40 font-mono text-[11px] text-white">
                            [1] webxcode.com/services/seo-services
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-white/10 font-mono text-[11px] text-white/75">
                            Entity Confidence: 98.4%
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Where It Shows Pills */}
                    <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/55">
                        SURFACES:
                      </span>
                      {activeEngine.whereItShows.map((surface) => (
                        <span
                          key={surface}
                          className="px-2.5 py-1 rounded-md bg-white/[0.06] text-[11px] font-semibold text-white/85"
                        >
                          {surface}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 6 Cols: 3 Optimization Deliverables + Cross-Links */}
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                      ENGINE SPECIFICATION // {activeEngine.tabTitle}
                    </span>
                    <h3 className="text-[24px] sm:text-[28px] font-extrabold text-navy mt-1 leading-snug">
                      How We Optimize Your Brand for{' '}
                      <span className="text-primary">{activeEngine.tabTitle.split(' ')[0]}</span>
                    </h3>
                  </div>

                  <div className="space-y-3.5">
                    {activeEngine.whatWeOptimize.map((item, idx) => (
                      <div
                        key={item.title}
                        className="p-4 rounded-2xl bg-white border border-navy-08 shadow-xs flex items-start gap-3.5"
                      >
                        <span className="w-7 h-7 rounded-lg bg-primary text-white font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                          0{idx + 1}
                        </span>
                        <div>
                          <h4 className="text-[16px] font-extrabold text-navy">{item.title}</h4>
                          <p className="text-[13.5px] text-navy-70 leading-relaxed mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action & Hub Cross-Link Row */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        triggerQuoteModal(`SEO + AEO + GEO Strategy (${activeEngine.tabTitle})`)
                      }
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] shadow-soft transition-all cursor-pointer"
                    >
                      <span>Get an SEO + AI Search Audit</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {activeEngine.crossLink && (
                      <Link
                        href={activeEngine.crossLink.to}
                        className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-navy text-navy hover:text-white border border-navy-15 text-[13px] font-bold transition-all"
                      >
                        <span>{activeEngine.crossLink.label}</span>
                        {activeEngine.crossLink.badge && (
                          <span className="px-1.5 py-0.5 rounded bg-primary text-white font-mono text-[9px] font-extrabold">
                            {activeEngine.crossLink.badge}
                          </span>
                        )}
                        <ArrowRight className="w-3.5 h-3.5 text-primary" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
};

export default SeoServices;
