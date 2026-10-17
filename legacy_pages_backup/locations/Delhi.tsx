import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  Search,
  Globe,
  Cpu,
  ShoppingCart,
  Smartphone,
  PenTool,
  Layers,
  ShieldCheck,
  Server,
  TrendingUp,
  Sparkles,
  Bot,
  BarChart3,
  Target,
  Activity,
  Award,
  Megaphone,
  FileText,
  Edit3,
  MessageSquare,
  Mail,
  Mic,
  Video,
  Workflow,
  Users,
  Database,
  Building2,
  Landmark,
  Factory,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  Store,
  Briefcase,
  CheckCircle2,
  Check,
  Navigation,
  Phone,
  Compass,
  Clock,
} from 'lucide-react';
import { services, ServiceItem, ServiceIconName } from '../Services';
import { aiSolutions, AISolutionItem, AISolutionIconName } from '../AISolutions';
import { industries, IndustryItem } from '../Industries';

/* ============================================================================
   PROPS & ICON HELPERS
============================================================================ */

interface DelhiProps {
  onOpenQuoteModal?: (service?: string) => void;
}

const RenderServiceIcon: React.FC<{ name: ServiceIconName; className?: string }> = ({
  name,
  className = 'w-5 h-5',
}) => {
  switch (name) {
    case 'Globe':
      return <Globe className={className} strokeWidth={1.75} />;
    case 'Cpu':
      return <Cpu className={className} strokeWidth={1.75} />;
    case 'ShoppingCart':
      return <ShoppingCart className={className} strokeWidth={1.75} />;
    case 'Smartphone':
      return <Smartphone className={className} strokeWidth={1.75} />;
    case 'PenTool':
      return <PenTool className={className} strokeWidth={1.75} />;
    case 'Layers':
      return <Layers className={className} strokeWidth={1.75} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} strokeWidth={1.75} />;
    case 'Server':
      return <Server className={className} strokeWidth={1.75} />;
    case 'Search':
      return <Search className={className} strokeWidth={1.75} />;
    case 'MapPin':
      return <MapPin className={className} strokeWidth={1.75} />;
    case 'Sparkles':
      return <Sparkles className={className} strokeWidth={1.75} />;
    case 'Bot':
      return <Bot className={className} strokeWidth={1.75} />;
    case 'TrendingUp':
      return <TrendingUp className={className} strokeWidth={1.75} />;
    case 'Target':
      return <Target className={className} strokeWidth={1.75} />;
    case 'Activity':
      return <Activity className={className} strokeWidth={1.75} />;
    case 'BarChart3':
      return <BarChart3 className={className} strokeWidth={1.75} />;
    case 'Award':
      return <Award className={className} strokeWidth={1.75} />;
    case 'Megaphone':
      return <Megaphone className={className} strokeWidth={1.75} />;
    case 'FileText':
      return <FileText className={className} strokeWidth={1.75} />;
    case 'Edit3':
      return <Edit3 className={className} strokeWidth={1.75} />;
    case 'MessageSquare':
      return <MessageSquare className={className} strokeWidth={1.75} />;
    case 'Mail':
      return <Mail className={className} strokeWidth={1.75} />;
    default:
      return <Globe className={className} strokeWidth={1.75} />;
  }
};

const RenderAIIcon: React.FC<{ name: AISolutionIconName; className?: string }> = ({
  name,
  className = 'w-5 h-5',
}) => {
  switch (name) {
    case 'Bot':
      return <Bot className={className} strokeWidth={1.75} />;
    case 'MessageSquare':
      return <MessageSquare className={className} strokeWidth={1.75} />;
    case 'Mic':
      return <Mic className={className} strokeWidth={1.75} />;
    case 'Cpu':
      return <Cpu className={className} strokeWidth={1.75} />;
    case 'Video':
      return <Video className={className} strokeWidth={1.75} />;
    case 'FileText':
      return <FileText className={className} strokeWidth={1.75} />;
    case 'Search':
      return <Search className={className} strokeWidth={1.75} />;
    case 'Megaphone':
      return <Megaphone className={className} strokeWidth={1.75} />;
    case 'Workflow':
      return <Workflow className={className} strokeWidth={1.75} />;
    case 'Users':
      return <Users className={className} strokeWidth={1.75} />;
    case 'Database':
      return <Database className={className} strokeWidth={1.75} />;
    case 'BarChart3':
      return <BarChart3 className={className} strokeWidth={1.75} />;
    default:
      return <Sparkles className={className} strokeWidth={1.75} />;
  }
};

/* ============================================================================
   SECTION 1 DATA — HERO DELHI SKYLINE & HUB PINS
============================================================================ */

interface HeroHubPin {
  id: string;
  name: string;
  shortLabel: string;
  x: number;
  y: number;
  profile: string;
  topService: string;
  statChip: string;
}

const HERO_HUB_PINS: HeroHubPin[] = [
  {
    id: 'connaught-place',
    name: 'Connaught Place',
    shortLabel: 'CP • Central Delhi',
    x: 245,
    y: 122,
    profile: 'Corporate HQs, BFSI offices, legacy retail & hospitality flagships',
    topService: 'Enterprise Web Apps, Brand Authority SEO & AI Chatbots',
    statChip: '+240% Inbound Enquiries (Placeholder)',
  },
  {
    id: 'nehru-place',
    name: 'Nehru Place',
    shortLabel: 'Nehru Place • IT Hub',
    x: 340,
    y: 215,
    profile: 'IT hardware/software distributors, SaaS teams & B2B service firms',
    topService: 'Custom Web Portals, B2B Lead Gen & CRM Automation',
    statChip: '3.4× Qualified Pipeline (Placeholder)',
  },
  {
    id: 'okhla',
    name: 'Okhla Industrial',
    shortLabel: 'Okhla Phase I–III',
    x: 425,
    y: 250,
    profile: 'Exporters, apparel & engineering manufacturers, D2C warehouses',
    topService: 'B2B Export Websites, Catalog SEO & WhatsApp AI Ordering',
    statChip: '<90s Dealer Quote Response (Placeholder)',
  },
  {
    id: 'saket-hauz-khas',
    name: 'Saket / Hauz Khas',
    shortLabel: 'South Delhi • D2C & Clinics',
    x: 225,
    y: 255,
    profile: 'Multi-specialty clinics, luxury D2C studios, design firms & EdTech',
    topService: 'Shopify Plus / D2C Stores, Local SEO & WhatsApp Booking Bots',
    statChip: '+190% Direct Bookings (Placeholder)',
  },
  {
    id: 'aerocity',
    name: 'Aerocity',
    shortLabel: 'Aerocity • Global Hub',
    x: 118,
    y: 228,
    profile: 'MNC regional offices, luxury hospitality, aviation & consulting',
    topService: 'High-Speed Next.js Sites, GEO/AEO Search & AI Voice Agents',
    statChip: '99.2 Lighthouse Score (Placeholder)',
  },
];

/* ============================================================================
   SECTION 2 DATA — DELHI BUSINESS DISTRICTS & COMMERCIAL HUBS (6 HUBS)
============================================================================ */

interface DelhiCommercialHub {
  id: string;
  tabName: string;
  zoneBadge: string;
  headline: string;
  areasCovered: string[];
  whoTradesHere: string;
  whatTheyTypicallyNeed: {
    title: string;
    desc: string;
    to: string;
  }[];
  localSearchExamples: string[];
  recommendedStack: string[];
  highlightMetric: string;
  quoteTopic: string;
}

const DELHI_COMMERCIAL_HUBS: DelhiCommercialHub[] = [
  {
    id: 'central-cp',
    tabName: 'Connaught Place & Central Delhi',
    zoneBadge: 'CORPORATE, BFSI & FLAGSHIP RETAIL',
    headline: 'Connaught Place, Barakhamba Road, Janpath & ITO',
    areasCovered: [
      'Connaught Place (Inner & Outer Circle)',
      'Barakhamba Road',
      'Janpath & Parliament Street',
      'KG Marg & Mandi House',
      'Karol Bagh & Rajendra Place',
    ],
    whoTradesHere:
      'Corporate headquarters, financial & legal advisory firms, Chartered Accountants, heritage retail flagships, travel consolidators, and healthcare diagnostics.',
    whatTheyTypicallyNeed: [
      {
        title: 'High-Authority Corporate Websites',
        desc: 'Sub-2-second Next.js websites with investor/client portals and WCAG-compliant UX.',
        to: '/services/website-development',
      },
      {
        title: 'National + Local SEO & AEO',
        desc: 'Rank for high-value "in Connaught Place" and pan-India commercial keywords simultaneously.',
        to: '/services/seo-services',
      },
      {
        title: 'AI Website & WhatsApp Concierge',
        desc: '24/7 RAG chatbot that answers policy/service queries and books executive consultations.',
        to: '/ai-solutions/ai-chatbot-development',
      },
    ],
    localSearchExamples: [
      '"corporate law firm Connaught Place"',
      '"wealth management advisor Central Delhi"',
      '"best dental clinic near CP Delhi"',
    ],
    recommendedStack: ['Next.js 14', 'Schema.org LocalBusiness', 'RAG AI Chatbot', 'HubSpot CRM Sync'],
    highlightMetric: '+215% organic consultation requests for Central Delhi firms (placeholder)',
    quoteTopic: 'Connaught Place & Central Delhi Digital Growth Plan',
  },
  {
    id: 'south-delhi',
    tabName: 'South Delhi (Nehru Place, Saket, GK, Hauz Khas)',
    zoneBadge: 'IT, CLINICS, LUXURY D2C & ARCHITECTS',
    headline: 'Nehru Place, Greater Kailash, Saket, Hauz Khas, Defence Colony & Lajpat Nagar',
    areasCovered: [
      'Nehru Place Commercial Complex',
      'Greater Kailash (GK I & II)',
      'Saket & Malviya Nagar',
      'Hauz Khas & Green Park',
      'Defence Colony & South Ex',
      'Lajpat Nagar & Jasola District Centre',
    ],
    whoTradesHere:
      'Boutique healthcare & dermatology clinics, luxury fashion & jewellery labels, interior architects (MG Road / Sultanpur), SaaS founders, and IT system integrators.',
    whatTheyTypicallyNeed: [
      {
        title: 'D2C E-commerce & Portfolio Platforms',
        desc: 'Editorial Shopify Plus & custom storefronts built for high-AOV South Delhi brands.',
        to: '/services/ecommerce-development',
      },
      {
        title: 'Hyper-Local Google Maps & Clinic SEO',
        desc: 'Top-3 Map Pack dominance across GK, Saket, Defence Colony, and Hauz Khas pin codes.',
        to: '/services/local-seo',
      },
      {
        title: 'WhatsApp Appointment & Catalog Bot',
        desc: 'Automated patient slot booking, catalog sharing, and lead qualification on WhatsApp.',
        to: '/ai-solutions/whatsapp-ai-chatbot',
      },
    ],
    localSearchExamples: [
      '"dermatologist in Greater Kailash"',
      '"luxury interior designer South Delhi"',
      '"IT hardware supplier Nehru Place"',
    ],
    recommendedStack: ['Shopify / Next.js', 'Google Business Profile API', 'WhatsApp Cloud API', 'Meta & Google Ads'],
    highlightMetric: '3.2× patient & showroom walk-in bookings across South Delhi (placeholder)',
    quoteTopic: 'South Delhi Digital & Local Growth Strategy',
  },
  {
    id: 'okhla-industrial',
    tabName: 'Okhla, Mohan Co-op & Naraina Industrial',
    zoneBadge: 'MANUFACTURING, EXPORTERS & B2B SUPPLY',
    headline: 'Okhla Industrial Area (Phase I, II, III), Mohan Co-operative & Naraina',
    areasCovered: [
      'Okhla Industrial Estate Phase I–III',
      'Mohan Co-operative Industrial Estate',
      'Naraina Industrial Area',
      'Mayapuri Industrial Area',
      'Patparganj Industrial Area',
    ],
    whoTradesHere:
      'Garment & home-textile exporters, precision engineering & auto-component manufacturers, packaging plants, pharmaceutical units, and wholesale B2B distributors.',
    whatTheyTypicallyNeed: [
      {
        title: 'B2B Specification & Export Portals',
        desc: 'Fast, searchable product spec catalogs, RFQ builders, and multi-currency export inquiry flows.',
        to: '/services/website-development',
      },
      {
        title: 'Global Export SEO & GEO Optimization',
        desc: 'Get cited by international procurement teams on Google, ChatGPT, and Perplexity.',
        to: '/services/geo-generative-engine-optimization',
      },
      {
        title: 'AI RFQ & Dealer Lead Automation',
        desc: 'Instant spec-sheet replies, automated dealer scoring, and ERP/CRM sync.',
        to: '/ai-solutions/crm-lead-automation',
      },
    ],
    localSearchExamples: [
      '"custom packaging manufacturer Okhla Phase 2"',
      '"CNC machining exporter Delhi NCR"',
      '"apparel export house Okhla Delhi"',
    ],
    recommendedStack: ['Custom B2B Catalog', 'Technical Spec SEO', 'AI Workflow Automation', 'Zoho / Salesforce Sync'],
    highlightMetric: '+280% verified international RFQ enquiries for Okhla exporters (placeholder)',
    quoteTopic: 'Okhla / Industrial B2B Website & Lead Automation',
  },
  {
    id: 'west-north-delhi',
    tabName: 'Netaji Subhash Place, Rajouri Garden & Rohini',
    zoneBadge: 'RETAIL CHAINS, EDTECH, COACHING & SMEs',
    headline: 'Netaji Subhash Place (Pitampura), Rajouri Garden, Janakpuri, Rohini & Wazirpur',
    areasCovered: [
      'Netaji Subhash Place (NSP) Pitampura',
      'Rajouri Garden & Punjabi Bagh',
      'Janakpuri District Centre',
      'Rohini & Shalimar Bagh',
      'Wazirpur & Kirti Nagar (Timber/Furniture Hub)',
    ],
    whoTradesHere:
      'Kirti Nagar furniture & home-decor showrooms, NSP corporate & CA offices, test-prep & EdTech institutes, multi-branch hospitals, and high-street retail brands.',
    whatTheyTypicallyNeed: [
      {
        title: 'Showroom-to-Online E-commerce & Web',
        desc: 'Interactive furniture/retail catalogs with room visualizers and store-visit schedulers.',
        to: '/services/wordpress-shopify-development',
      },
      {
        title: 'Performance Marketing & Google Ads',
        desc: 'High-intent Search, Performance Max, and Click-to-WhatsApp ads targeting Delhi pin codes.',
        to: '/services/performance-marketing',
      },
      {
        title: 'AI Voice Agents for Admissions & Calls',
        desc: 'Instant outbound/inbound voice calling in Hindi & English for student and showroom leads.',
        to: '/ai-solutions/ai-voice-agents',
      },
    ],
    localSearchExamples: [
      '"modular kitchen showroom Kirti Nagar"',
      '"CA & GST consultant Netaji Subhash Place"',
      '"multispecialty hospital Rajouri Garden"',
    ],
    recommendedStack: ['React / Shopify', 'Google Local Campaigns', 'Hindi + English AI Voice Agent', 'LeadSquared'],
    highlightMetric: '46% lower cost-per-lead across West & North Delhi campaigns (placeholder)',
    quoteTopic: 'West & North Delhi Showroom / SME Growth Plan',
  },
  {
    id: 'aerocity-dwarka',
    tabName: 'Aerocity, Dwarka & Vasant Kunj',
    zoneBadge: 'HOSPITALITY, AVIATION, LOGISTICS & GLOBAL SERVICES',
    headline: 'IGI Aerocity, Mahipalpur Logistics Corridor, Vasant Kunj & Dwarka Sub-City',
    areasCovered: [
      'Worldmark Aerocity (1, 2 & 3)',
      'Vasant Kunj & Nelson Mandela Marg',
      'Dwarka Sectors 1–23',
      'Mahipalpur & Kapashera Logistics Hub',
      'Chanakyapuri Diplomatic Enclave',
    ],
    whoTradesHere:
      'Luxury hotels & banquets, global consulting & GCC offices in Worldmark, freight & customs clearing agencies, international schools, and healthcare centres.',
    whatTheyTypicallyNeed: [
      {
        title: 'Direct-Booking & Enterprise Web Apps',
        desc: 'Commission-free hospitality booking engines, freight trackers, and custom enterprise portals.',
        to: '/services/mobile-app-development',
      },
      {
        title: 'Answer Engine Optimization (AEO)',
        desc: 'Capture international travellers and corporate buyers searching on AI answer engines.',
        to: '/services/aeo-services',
      },
      {
        title: 'AI Analytics & Executive Reporting',
        desc: 'Automated Monday morning revenue briefs combining ad spend, bookings, and CRM pipeline.',
        to: '/ai-solutions/ai-analytics-reporting',
      },
    ],
    localSearchExamples: [
      '"corporate event venue Aerocity Delhi"',
      '"air freight forwarder near IGI Airport"',
      '"pediatric clinic Dwarka Sector 12"',
    ],
    recommendedStack: ['Next.js + Node.js', 'AEO & Multilingual Schema', 'AI Voice Concierge', 'Automated BI Briefs'],
    highlightMetric: '+175% direct corporate & booking enquiries in Aerocity/Dwarka (placeholder)',
    quoteTopic: 'Aerocity & Dwarka Enterprise Digital Consultation',
  },
  {
    id: 'chandni-chowk-east',
    tabName: 'Old Delhi Wholesale, Laxmi Nagar & Preet Vihar',
    zoneBadge: 'WHOLESALE TRADE, JEWELLERY, BRIDAL & PROFESSIONAL HUBS',
    headline: 'Chandni Chowk, Sadar Bazar, Chawri Bazar, Karol Bagh, Laxmi Nagar & Preet Vihar',
    areasCovered: [
      'Chandni Chowk & Dariba Kalan',
      'Sadar Bazar & Khari Baoli',
      'Chawri Bazar & Nai Sarak',
      'Laxmi Nagar & Nirman Vihar',
      'Preet Vihar & Karkardooma',
    ],
    whoTradesHere:
      'Generational bridal & jewellery houses, FMCG/spice/paper wholesale traders transitioning to pan-India B2B e-commerce, and East Delhi coaching & finance hubs.',
    whatTheyTypicallyNeed: [
      {
        title: 'B2B Wholesale + D2C Hybrid Storefronts',
        desc: 'Tiered MOQ pricing for wholesale buyers alongside luxury retail checkout for consumers.',
        to: '/services/ecommerce-development',
      },
      {
        title: 'AI Video & Ad Creative Production',
        desc: 'Studio-quality product reels, bridal lookbooks, and festival ad creatives at scale.',
        to: '/ai-solutions/ai-generated-videos',
      },
      {
        title: 'WhatsApp Automated Order & Catalog Bot',
        desc: 'Let pan-India retailers browse live stock, request bulk quotes, and reorder on WhatsApp.',
        to: '/ai-solutions/whatsapp-ai-chatbot',
      },
    ],
    localSearchExamples: [
      '"bridal lehenga flagship Chandni Chowk"',
      '"wholesale packaging supplier Sadar Bazar"',
      '"coaching institute Laxmi Nagar Delhi"',
    ],
    recommendedStack: ['Shopify B2B / Custom Cart', 'WhatsApp Catalog API', 'AI Video Creatives', 'Local + National SEO'],
    highlightMetric: '4.1× pan-India wholesale & bridal video-appointment leads (placeholder)',
    quoteTopic: 'Wholesale-to-Digital & D2C Transformation in Delhi',
  },
];

/* ============================================================================
   SECTION 3 DATA — DELHI MARKET REALITIES (LOCAL CHALLENGES vs SOLUTIONS)
============================================================================ */

interface DelhiChallengePair {
  id: string;
  number: string;
  challengeTitle: string;
  delhiReality: string;
  costOfInaction: string;
  ourSolutionTitle: string;
  howWeSolveIt: string;
  linkedSolutions: { label: string; to: string }[];
  resultMetric: string;
}

const DELHI_CHALLENGE_PAIRS: DelhiChallengePair[] = [
  {
    id: 'cpc-wars',
    number: '01',
    challengeTitle: 'Sky-High Ad CPCs Across Delhi NCR Pin Codes',
    delhiReality:
      'In categories like clinics, real estate, interior design, legal, and education, dozens of Delhi agencies bid on the exact same broad keywords—pushing Google Ads CPCs up while landing pages convert at under 1.8%.',
    costOfInaction: '40–55% of monthly ad budget wasted on irrelevant clicks and slow mobile pages.',
    ourSolutionTitle: 'Pin-Code Intent Architecture + High-Speed CRO Landing Pages',
    howWeSolveIt:
      'We pair sub-1.5s Next.js landing pages with hyper-granular Delhi locality ad groups (South Delhi vs West Delhi vs Central Delhi), server-side conversion tracking, and Local SEO + AEO so organic search compounds alongside paid.',
    linkedSolutions: [
      { label: 'Google Ads (SEM)', to: '/services/google-ads-sem' },
      { label: 'Conversion Rate Optimization', to: '/services/conversion-rate-optimization' },
      { label: 'Local SEO', to: '/services/local-seo' },
    ],
    resultMetric: 'Up to 44% lower Cost-Per-Qualified-Lead in Delhi campaigns (placeholder)',
  },
  {
    id: 'whatsapp-first-buyers',
    number: '02',
    challengeTitle: 'Delhi Buyers Prefer WhatsApp & Phone Calls Over Long Web Forms',
    delhiReality:
      'Whether it is a South Delhi patient booking a skin consultation, a Kirti Nagar homeowner asking for furniture prices, or an Okhla B2B buyer requesting a quote—prospects expect an instant reply on WhatsApp or phone, Including in Hinglish/Hindi.',
    costOfInaction: 'Leads contacted after 30 minutes have a 4× lower close rate; evening enquiries vanish.',
    ourSolutionTitle: '24/7 Bilingual WhatsApp AI Bots + Sub-60s AI Voice Agents',
    howWeSolveIt:
      'We deploy official WhatsApp Business API chatbots and natural Hindi/English AI Voice Agents that respond in under 3 seconds, share brochures/catalogs, qualify budget & locality, and book confirmed slots straight into your team’s CRM.',
    linkedSolutions: [
      { label: 'WhatsApp AI Chatbot', to: '/ai-solutions/whatsapp-ai-chatbot' },
      { label: 'AI Voice Agents', to: '/ai-solutions/ai-voice-agents' },
      { label: 'CRM & Lead Automation', to: '/ai-solutions/crm-lead-automation' },
    ],
    resultMetric: '<5 sec response time & +210% lead-to-appointment rate (placeholder)',
  },
  {
    id: 'legacy-to-digital',
    number: '03',
    challengeTitle: 'Established Delhi Family & B2B Businesses Stuck on Outdated Websites',
    delhiReality:
      'Delhi has thousands of market-leading manufacturers, exporters, wholesalers, and professional firms with 20+ years of offline reputation—but their 2017 brochure website fails mobile Core Web Vitals and looks untrustworthy to global or millennial buyers.',
    costOfInaction: 'Losing high-margin export, enterprise, and D2C contracts to newer digital-native competitors.',
    ourSolutionTitle: 'Modern Web Engineering + Digital Catalog & ERP/CRM Modernization',
    howWeSolveIt:
      'We rebuild your digital flagship from the ground up—combining executive brand identity, interactive B2B/D2C product catalogs, automated RFQ workflows, and AI search visibility (GEO) without disrupting your daily operations.',
    linkedSolutions: [
      { label: 'Website Development', to: '/services/website-development' },
      { label: 'E-commerce Development', to: '/services/ecommerce-development' },
      { label: 'Branding & Logo Design', to: '/services/branding-logo-design' },
    ],
    resultMetric: '95+ Google PageSpeed & 2.8× higher buyer enquiry conversion (placeholder)',
  },
  {
    id: 'multi-locality-map-pack',
    number: '04',
    challengeTitle: 'Invisible in "Near Me" Map Packs Outside Your Immediate Street',
    delhiReality:
      'A clinic in Saket or a showroom in Rajouri Garden often ranks within 500 metres of its building, but disappears completely when customers 3 km away in GK, Malviya Nagar, or Punjabi Bagh search on Google Maps or ChatGPT.',
    costOfInaction: 'Competitors with optimized Google Business Profiles capture 70%+ of high-intent local calls.',
    ourSolutionTitle: 'Multi-Colony Local SEO, GBP Engineering & AI Search Citations',
    howWeSolveIt:
      'We engineer dedicated Delhi neighbourhood landing pages, LocalBusiness JSON-LD schema, 50+ Indian directory citations (Justdial, IndiaMART, Sulekha, Practo), and automated QR review velocity flows.',
    linkedSolutions: [
      { label: 'Local SEO', to: '/services/local-seo' },
      { label: 'AEO Services', to: '/services/aeo-services' },
      { label: 'GEO Optimization', to: '/services/geo-generative-engine-optimization' },
    ],
    resultMetric: 'Top-3 Map Pack visibility across 80%+ of target Delhi pin codes (placeholder)',
  },
];

/* ============================================================================
   SECTION 4 DATA — DELHI LENS OVERLAYS FOR ALL 34 SERVICES & AI SOLUTIONS
============================================================================ */

type MatrixTabKey = 'Web & Apps' | 'SEO & Performance' | 'Brand & Content' | 'AI Solutions';

const DELHI_LOCAL_ANGLE_BY_SLUG: Record<string, { delhiUseCase: string; popularIn: string }> = {
  // Web & Apps (8)
  'website-development': {
    delhiUseCase: 'Fast corporate, clinic, exporter & startup websites engineered for Delhi NCR & global buyers.',
    popularIn: 'Connaught Place, Nehru Place, Aerocity',
  },
  'web-application-development': {
    delhiUseCase: 'Custom SaaS platforms, B2B dealer portals, patient dashboards & internal ERP tools.',
    popularIn: 'Nehru Place, Okhla, Netaji Subhash Place',
  },
  'ecommerce-development': {
    delhiUseCase: 'High-AOV D2C storefronts & B2B wholesale catalogs with Razorpay, Shiprocket & GST invoicing.',
    popularIn: 'South Delhi, Chandni Chowk, Kirti Nagar',
  },
  'mobile-app-development': {
    delhiUseCase: 'iOS & Android consumer apps, clinic booking apps & fleet/delivery apps for NCR operations.',
    popularIn: 'Saket, Hauz Khas, Dwarka',
  },
  'ui-ux-design': {
    delhiUseCase: 'Conversion-first Figma design systems tailored for Indian mobile-first and global enterprise users.',
    popularIn: 'Hauz Khas, Connaught Place, Vasant Kunj',
  },
  'wordpress-shopify-development': {
    delhiUseCase: 'Custom Shopify Plus stores for Delhi fashion/beauty brands & fast WordPress sites for SMEs.',
    popularIn: 'Greater Kailash, Shahpur Jat, Rajouri Garden',
  },
  'website-maintenance-support': {
    delhiUseCase: 'Proactive security, daily backups & IST SLA support from our adjacent Sector 62 Noida HQ.',
    popularIn: 'All Delhi Commercial Zones',
  },
  'managed-it-services': {
    delhiUseCase: 'Cloud infrastructure, AWS/GCP DevOps, zero-downtime monitoring & enterprise security.',
    popularIn: 'Aerocity, Connaught Place, Mohan Co-op',
  },
  // SEO & Performance (8)
  'seo-services': {
    delhiUseCase: 'Rank #1 across Delhi NCR and national/export commercial keywords with technical & content SEO.',
    popularIn: 'Connaught Place, Okhla, Nehru Place',
  },
  'local-seo': {
    delhiUseCase: 'Dominate Google Maps 3-Pack across South, Central, West, North & East Delhi neighbourhoods.',
    popularIn: 'GK, Saket, Rajouri Garden, Pitampura, Laxmi Nagar',
  },
  'aeo-services': {
    delhiUseCase: 'Win direct answers in Google AI Overviews, Siri & voice search for high-intent Delhi queries.',
    popularIn: 'South Delhi, Aerocity, Central Delhi',
  },
  'geo-generative-engine-optimization': {
    delhiUseCase: 'Get your Delhi brand recommended by ChatGPT, Perplexity, Claude & Gemini when buyers research.',
    popularIn: 'Okhla Exporters, B2B SaaS, Healthcare',
  },
  'performance-marketing': {
    delhiUseCase: 'ROI-obsessed Meta, Google & LinkedIn campaigns targeting high-LTV Delhi NCR audiences.',
    popularIn: 'D2C Brands, Real Estate, Clinics, EdTech',
  },
  'google-ads-sem': {
    delhiUseCase: 'Pin-code targeted Search, Call-Only & Performance Max campaigns with negative keyword shields.',
    popularIn: 'South Delhi, West Delhi, Central Delhi',
  },
  'conversion-rate-optimization': {
    delhiUseCase: 'Turn expensive Delhi ad clicks into WhatsApp chats, calls & checkouts through A/B testing.',
    popularIn: 'High-Spend Advertisers Across Delhi',
  },
  'analytics-tracking-setup': {
    delhiUseCase: 'GA4, Meta CAPI, server-side GTM & offline CRM call attribution for complete ROI clarity.',
    popularIn: 'E-commerce, Healthcare, B2B Lead Gen',
  },
  // Brand & Content (6)
  'branding-logo-design': {
    delhiUseCase: 'Modern brand identity, packaging & visual guidelines for new-age D2C and legacy Delhi firms.',
    popularIn: 'Shahpur Jat, Defence Colony, Chandni Chowk',
  },
  'creative-communication': {
    delhiUseCase: 'Festive campaigns (Diwali/Wedding season), social kits, pitch decks & exhibition graphics.',
    popularIn: 'South Ex, Karol Bagh, Pragati Maidan Exhibitors',
  },
  'content-marketing': {
    delhiUseCase: 'Authority blogs, industry whitepapers & SEO content hubs that build organic pipeline.',
    popularIn: 'B2B SaaS, Fintech, Healthcare, Education',
  },
  'copywriting': {
    delhiUseCase: 'Sharp, persuasive website, landing page & ad copy for Indian and international buyers.',
    popularIn: 'Connaught Place, Nehru Place, South Delhi',
  },
  'online-reputation-management': {
    delhiUseCase: 'Protect leadership & clinic/hotel ratings across Google Reviews, Practo, TripAdvisor & press.',
    popularIn: 'Aerocity Hotels, South Delhi Clinics, Corporate HQs',
  },
  'email-marketing': {
    delhiUseCase: 'Automated Klaviyo/HubSpot retention flows, B2B newsletters & WhatsApp+Email lifecycle drips.',
    popularIn: 'D2C Retail, SaaS, Exporters',
  },
  // AI Solutions (12)
  'ai-chatbot-development': {
    delhiUseCase: 'Custom RAG website chatbot trained on your Delhi business docs, pricing & FAQs.',
    popularIn: 'Corporate, Clinics, EdTech, D2C',
  },
  'whatsapp-ai-chatbot': {
    delhiUseCase: '24/7 WhatsApp Business API bot in English/Hindi for catalog browsing, quotes & slot booking.',
    popularIn: 'South Delhi Clinics, Kirti Nagar, Chandni Chowk',
  },
  'ai-voice-agents': {
    delhiUseCase: 'Human-like Hindi & English phone agents for instant <45s lead calling and reception.',
    popularIn: 'Automotive, Real Estate, Diagnostics, Coaching',
  },
  'custom-ai-llm-integration': {
    delhiUseCase: 'Private OpenAI/Claude/Gemini pipelines embedded into your proprietary web app or ERP.',
    popularIn: 'Nehru Place IT, B2B SaaS, FinTech',
  },
  'ai-generated-videos': {
    delhiUseCase: 'Studio-grade product videos, bilingual explainers & festive ad reels produced 5× faster.',
    popularIn: 'Fashion, Jewellery, Skincare, D2C',
  },
  'ai-content-creation': {
    delhiUseCase: 'Brand-voice trained AI workflows for 1,000+ SKU descriptions, local pages & social posts.',
    popularIn: 'Multi-SKU Retailers & Marketplaces',
  },
  'ai-powered-seo': {
    delhiUseCase: 'Programmatic Delhi locality pages, SERP cluster intelligence & AI content velocity.',
    popularIn: 'Multi-Branch Clinics, Retail & Aggregators',
  },
  'ai-ad-creatives': {
    delhiUseCase: 'High-converting Meta & Google ad variations tested rapidly for Delhi NCR audiences.',
    popularIn: 'Performance Marketing & D2C Teams',
  },
  'ai-workflow-automation': {
    delhiUseCase: 'Connect Tally/Zoho, Google Sheets, WhatsApp, Shopify & Slack to eliminate manual busywork.',
    popularIn: 'Okhla Manufacturers, Traders, Operations Teams',
  },
  'ai-agents-for-business': {
    delhiUseCase: 'Autonomous digital teammates for vendor research, tender monitoring & operations.',
    popularIn: 'Enterprise & Mid-Market Delhi Firms',
  },
  'crm-lead-automation': {
    delhiUseCase: 'Capture IndiaMART, Justdial, Meta, Google & website leads into one instant follow-up engine.',
    popularIn: 'B2B Industrial, Real Estate, Education, Clinics',
  },
  'ai-analytics-reporting': {
    delhiUseCase: 'Plain-English Monday morning WhatsApp/Email revenue briefs across all your business data.',
    popularIn: 'Founders, MDs & Marketing Heads in Delhi',
  },
};

/* ============================================================================
   MAIN DELHI PAGE COMPONENT (PART 1: SECTIONS 1–4)
============================================================================ */

const Delhi: React.FC<DelhiProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  // Section 1: Interactive Skyline & Commercial Hub Pin state
  const [activeHeroHubId, setActiveHeroHubId] = useState<string>(HERO_HUB_PINS[0].id);

  // Section 2: Active Commercial Hub Tab state
  const [activeDistrictId, setActiveDistrictId] = useState<string>(DELHI_COMMERCIAL_HUBS[0].id);

  // Section 4: Active Matrix Category Tab state
  const [activeMatrixTab, setActiveMatrixTab] = useState<MatrixTabKey>('Web & Apps');

  const triggerQuoteModal = (serviceName?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(serviceName || 'Delhi Digital Growth Consultation');
    } else {
      window.dispatchEvent(
        new CustomEvent('open-quote-modal', {
          detail: serviceName || 'Delhi Digital Growth Consultation',
        })
      );
    }
  };

  // SEO Meta & JSON-LD LocalBusiness / Place / Service Schema for Delhi
  useEffect(() => {
    document.title =
      'Web Development, SEO & AI Solutions Company in Delhi | WebXCode Delhi NCR';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'WebXCode is your local digital growth partner for Delhi businesses—delivering custom websites, e-commerce, Local SEO, Google Ads, and AI chatbots across Connaught Place, South Delhi, Nehru Place, Okhla, Rajouri Garden & Aerocity.'
      );
    }
  }, []);

  const activeHeroHub =
    HERO_HUB_PINS.find((h) => h.id === activeHeroHubId) || HERO_HUB_PINS[0];

  const activeDistrict =
    DELHI_COMMERCIAL_HUBS.find((d) => d.id === activeDistrictId) ||
    DELHI_COMMERCIAL_HUBS[0];

  // Filter items for Section 4 Matrix
  const displayedServices: ServiceItem[] =
    activeMatrixTab === 'AI Solutions'
      ? []
      : services.filter((s) => s.category === activeMatrixTab);

  const displayedAISolutions: AISolutionItem[] =
    activeMatrixTab === 'AI Solutions' ? aiSolutions : [];

  const delhiJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'WebXCode — Delhi Digital Growth Partner (Web, SEO & AI Solutions)',
    url: 'https://webxcode.com/locations/delhi',
    telephone: '+91-98765-43210',
    email: 'hello@webxcode.com',
    areaServed: [
      { '@type': 'City', name: 'New Delhi' },
      { '@type': 'Place', name: 'Connaught Place, New Delhi' },
      { '@type': 'Place', name: 'Nehru Place, New Delhi' },
      { '@type': 'Place', name: 'Okhla Industrial Area, New Delhi' },
      { '@type': 'Place', name: 'South Delhi (Greater Kailash, Saket, Hauz Khas)' },
      { '@type': 'Place', name: 'Netaji Subhash Place & Rajouri Garden, Delhi' },
      { '@type': 'Place', name: 'Aerocity & Dwarka, New Delhi' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot C-24, Sector 62',
      addressLocality: 'Noida (Delhi NCR)',
      addressRegion: 'UP / Delhi NCR',
      postalCode: '201309',
      addressCountry: 'IN',
    },
  };

  return (
    <main className="flex-1 bg-white text-navy overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(delhiJsonLd) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: DELHI SKYLINE & COMMERCIAL RADAR (bg: #1e242e Navy)
         ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
        {/* Radial Blue Glows & Blueprint Grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -top-28 -left-28 w-[540px] h-[540px] blue-glow pointer-events-none" />
        <div className="absolute top-12 right-0 w-[640px] h-[640px] blue-glow-strong pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/65 mb-8"
          >
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white/75">Locations</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-primary font-semibold" aria-current="page">
              Delhi
            </span>
          </nav>

          {/* 55 / 45 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left 7 Cols: Delhi Copy, Proximity Badge & CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em]">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>DELHI NCR • LOCAL ENGINEERING &amp; GROWTH STUDIO</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.07] border border-white/15 font-mono text-[11px] font-semibold text-white/85">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>HQ in Sector 62 Noida • 25 Mins from Central &amp; South Delhi</span>
                </span>
              </div>

              <h1 className="text-[34px] sm:text-[46px] lg:text-[56px] font-extrabold text-white leading-[1.08] tracking-tight mb-6">
                Your Digital Growth Partner for{' '}
                <span className="text-primary">Delhi Businesses</span>
              </h1>

              <p className="text-[16px] sm:text-[18px] text-white/80 leading-[1.7] max-w-2xl mb-7">
                From corporate flagships in <strong className="text-white">Connaught Place</strong>{' '}
                and IT/B2B leaders in <strong className="text-white">Nehru Place &amp; Okhla</strong>{' '}
                to clinics, D2C brands, and showrooms across{' '}
                <strong className="text-white">
                  South Delhi, Kirti Nagar, Rajouri Garden &amp; Aerocity
                </strong>
                —we engineer high-speed websites, local &amp; AI search dominance, and 24/7 WhatsApp
                &amp; voice AI automation.
              </p>

              {/* Quick Locality Jump Pills */}
              <div className="mb-8">
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/55 mb-2.5">
                  SERVING EVERY COMMERCIAL CORRIDOR IN DELHI (CLICK TO PREVIEW):
                </div>
                <div className="flex flex-wrap gap-2">
                  {HERO_HUB_PINS.map((pin) => {
                    const isSelected = pin.id === activeHeroHubId;
                    return (
                      <button
                        key={pin.id}
                        type="button"
                        onClick={() => setActiveHeroHubId(pin.id)}
                        className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-white/[0.06] text-white/80 border-white/15 hover:border-primary/60 hover:text-white'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{pin.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  type="button"
                  onClick={() =>
                    triggerQuoteModal(`Free Delhi Digital Growth Audit (${activeHeroHub.name})`)
                  }
                  className="group inline-flex items-center justify-center font-semibold rounded-full bg-primary hover:bg-primary-700 text-white px-7 py-3.5 text-[15.5px] gap-2.5 shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Book a Free Delhi Strategy Call</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#delhi-hubs"
                  className="inline-flex items-center justify-center font-semibold rounded-full border-[1.5px] border-white/35 text-white hover:border-white hover:bg-white/10 px-6 py-3.5 text-[15px] gap-2 transition-all"
                >
                  <span>Explore Delhi Business Hubs</span>
                </a>
              </div>

              {/* 4 Trust Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-7 border-t border-white/10">
                {[
                  {
                    value: '22 + 12',
                    label: 'Services & AI Solutions',
                  },
                  {
                    value: '< 2.0s',
                    label: 'Avg. Website Load Time',
                  },
                  {
                    value: 'In-Person',
                    label: 'Meetings Across Delhi NCR',
                  },
                  {
                    value: '24/7',
                    label: 'WhatsApp & Voice AI Bots',
                  },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[22px] sm:text-[25px] font-extrabold text-primary tabular-nums leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[12.5px] text-white/70 font-medium mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Custom Architectural Delhi Skyline & Interactive Commercial Hub Map Card */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] bg-white/[0.06] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl relative">
                {/* Card Top Header */}
                <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[11.5px] font-bold uppercase tracking-wider text-white/90">
                      DELHI COMMERCIAL RADAR • LIVE HUB VIEW
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-primary/25 border border-primary/40 font-mono text-[10.5px] font-bold text-white">
                    NCT OF DELHI
                  </span>
                </div>

                {/* Custom SVG Illustration: Stylized Delhi Skyline + Metro/Ring-Road Grid + Clickable Hub Pins */}
                <div className="relative rounded-[18px] bg-navy/90 border border-white/10 p-3 overflow-hidden">
                  <svg
                    viewBox="0 0 520 310"
                    className="w-full h-auto select-none"
                    role="img"
                    aria-label="Stylized Delhi skyline featuring India Gate, Lotus Temple, Signature Bridge and clickable commercial business hubs"
                  >
                    <defs>
                      <radialGradient id="delhiRadarGlow" cx="50%" cy="50%" r="55%">
                        <stop offset="0%" stopColor="#0571c2" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#0571c2" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="skylineFill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0571c2" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#1e242e" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>

                    {/* Ambient Glow */}
                    <circle cx="260" cy="170" r="160" fill="url(#delhiRadarGlow)" />

                    {/* Stylized Architectural Delhi Skyline Silhouette along Top Horizon */}
                    <g opacity="0.55">
                      {/* Horizon Line */}
                      <line
                        x1="20"
                        y1="86"
                        x2="500"
                        y2="86"
                        stroke="#0571c2"
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                      />

                      {/* Qutub Minar Silhouette (Left) */}
                      <polygon
                        points="64,86 70,26 76,26 82,86"
                        fill="url(#skylineFill)"
                        stroke="#0571c2"
                        strokeWidth="1.3"
                      />
                      <line x1="68" y1="42" x2="78" y2="42" stroke="#0571c2" strokeWidth="1.2" />
                      <line x1="66" y1="58" x2="80" y2="58" stroke="#0571c2" strokeWidth="1.2" />
                      <line x1="65" y1="72" x2="81" y2="72" stroke="#0571c2" strokeWidth="1.2" />

                      {/* Connaught Place Georgian Colonnade Archways */}
                      <rect
                        x="115"
                        y="56"
                        width="72"
                        height="30"
                        rx="2"
                        fill="url(#skylineFill)"
                        stroke="#0571c2"
                        strokeWidth="1.2"
                      />
                      {[125, 139, 153, 167, 179].map((colX) => (
                        <line
                          key={colX}
                          x1={colX}
                          y1="56"
                          x2={colX}
                          y2="86"
                          stroke="#0571c2"
                          strokeWidth="1.2"
                        />
                      ))}

                      {/* India Gate Archway (Centerpiece) */}
                      <path
                        d="M228 86 V38 H236 V32 H284 V38 H292 V86 H274 V56 C274 46 246 46 246 56 V86 Z"
                        fill="url(#skylineFill)"
                        stroke="#0571c2"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="244"
                        y="26"
                        width="32"
                        height="6"
                        fill="#0571c2"
                        fillOpacity="0.35"
                        stroke="#0571c2"
                        strokeWidth="1.2"
                      />

                      {/* Lotus Temple Petals (Right-Center) */}
                      <path
                        d="M332 86 Q342 46 356 42 Q370 46 380 86 Z"
                        fill="url(#skylineFill)"
                        stroke="#0571c2"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M320 86 Q330 56 346 54"
                        fill="none"
                        stroke="#0571c2"
                        strokeWidth="1.3"
                      />
                      <path
                        d="M392 86 Q382 56 366 54"
                        fill="none"
                        stroke="#0571c2"
                        strokeWidth="1.3"
                      />

                      {/* Signature Bridge / Modern NCR High-Rise Pylon (Far Right) */}
                      <path
                        d="M438 86 L454 24 L462 24 L452 86"
                        fill="url(#skylineFill)"
                        stroke="#0571c2"
                        strokeWidth="1.5"
                      />
                      <line x1="456" y1="30" x2="420" y2="86" stroke="#0571c2" strokeWidth="1" />
                      <line x1="458" y1="42" x2="430" y2="86" stroke="#0571c2" strokeWidth="1" />
                      <line x1="460" y1="32" x2="488" y2="86" stroke="#0571c2" strokeWidth="1" />
                    </g>

                    {/* Stylized Ring Road & Yamuna Corridor Vector Map (Lower 2/3) */}
                    {/* Outer Ring Road Loop */}
                    <ellipse
                      cx="255"
                      cy="195"
                      rx="178"
                      ry="88"
                      fill="none"
                      stroke="#ffffff"
                      strokeOpacity="0.14"
                      strokeWidth="1.5"
                      strokeDasharray="6 5"
                    />
                    {/* Inner Ring Road Loop */}
                    <ellipse
                      cx="255"
                      cy="188"
                      rx="105"
                      ry="54"
                      fill="none"
                      stroke="#0571c2"
                      strokeOpacity="0.4"
                      strokeWidth="1.5"
                    />

                    {/* Connecting Metro / Fiber Corridors between Hubs */}
                    <path
                      d="M118 228 L245 122 L340 215 L425 250 M245 122 L225 255 L340 215"
                      stroke="#0571c2"
                      strokeWidth="1.75"
                      strokeOpacity="0.55"
                      fill="none"
                    />

                    {/* Interactive Hub Nodes */}
                    {HERO_HUB_PINS.map((pin) => {
                      const isActive = pin.id === activeHeroHubId;
                      return (
                        <g
                          key={pin.id}
                          transform={`translate(${pin.x}, ${pin.y})`}
                          onClick={() => setActiveHeroHubId(pin.id)}
                          className="cursor-pointer"
                        >
                          {isActive && (
                            <circle
                              r="20"
                              fill="#0571c2"
                              fillOpacity="0.3"
                              className="animate-ping [animation-duration:2.5s]"
                            />
                          )}
                          <circle
                            r={isActive ? 11 : 8}
                            fill={isActive ? '#0571c2' : '#1e242e'}
                            stroke="#ffffff"
                            strokeWidth={isActive ? 2.5 : 1.75}
                          />
                          <circle r="3.5" fill="#ffffff" />

                          {/* Pin Label Pill */}
                          <g transform="translate(0, -22)">
                            <rect
                              x="-64"
                              y="-12"
                              width="128"
                              height="20"
                              rx="10"
                              fill={isActive ? '#0571c2' : '#1e242e'}
                              stroke={isActive ? '#ffffff' : '#0571c2'}
                              strokeWidth="1.2"
                            />
                            <text
                              x="0"
                              y="2"
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="9.5"
                              fontWeight="700"
                            >
                              {pin.name}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Live Selected Hub Inspector Strip Below SVG */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroHub.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="mt-4 p-4 rounded-[18px] bg-white/[0.07] border border-white/15"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10.5px] font-extrabold">
                          {activeHeroHub.shortLabel}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] font-bold text-emerald-400">
                        {activeHeroHub.statChip}
                      </span>
                    </div>

                    <p className="text-[13px] text-white/80 leading-snug mb-2">
                      <strong className="text-white">Who we help here:</strong>{' '}
                      {activeHeroHub.profile}
                    </p>
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10 text-[12px]">
                      <span className="text-primary-100 font-semibold truncate">
                        Top demand: {activeHeroHub.topService}
                      </span>
                      <a
                        href="#delhi-hubs"
                        className="text-white font-bold underline hover:text-primary shrink-0"
                      >
                        Details →
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — DELHI BUSINESS DISTRICTS & COMMERCIAL HUBS WE SERVE (bg: #ffffff)
         ====================================================================== */}
      <section id="delhi-hubs" className="py-[72px] lg:py-[112px] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              HYPER-LOCAL DELHI EXPERTISE
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Built for How Every{' '}
              <span className="text-primary">Delhi Business District</span> Actually Trades
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.7]">
              A manufacturing exporter in <strong className="text-navy">Okhla Phase II</strong>, a
              dermatology clinic in <strong className="text-navy">Greater Kailash</strong>, and a
              corporate advisory firm in <strong className="text-navy">Connaught Place</strong> have
              completely different customers and sales cycles. Select your Delhi business corridor
              below to see our tailored digital playbook:
            </p>
          </div>

          {/* 6 Interactive District Selector Tabs */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8"
            role="tablist"
            aria-label="Delhi Commercial Districts"
          >
            {DELHI_COMMERCIAL_HUBS.map((hub, idx) => {
              const isSelected = hub.id === activeDistrictId;
              return (
                <button
                  key={hub.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveDistrictId(hub.id)}
                  className={`text-left p-4 rounded-[18px] border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-navy text-white border-primary shadow-md'
                      : 'bg-primary-50/50 text-navy border-navy-08 hover:border-primary/50 hover:bg-primary-50'
                  }`}
                >
                  <div>
                    <div
                      className={`font-mono text-[10px] font-extrabold uppercase tracking-wider mb-1 ${
                        isSelected ? 'text-primary' : 'text-navy-50'
                      }`}
                    >
                      ZONE 0{idx + 1} • {hub.zoneBadge}
                    </div>
                    <div className="text-[14.5px] font-extrabold leading-snug">{hub.tabName}</div>
                  </div>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-primary text-white' : 'bg-white text-primary'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active District Deep-Dive Blueprint Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDistrict.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="rounded-[24px] bg-white border-2 border-navy-08 shadow-soft overflow-hidden"
            >
              {/* Top Banner Bar */}
              <div className="bg-navy text-white px-6 py-5 sm:px-8 sm:py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{activeDistrict.zoneBadge}</span>
                  </div>
                  <h3 className="text-[22px] sm:text-[26px] font-extrabold text-white leading-snug">
                    {activeDistrict.headline}
                  </h3>
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/20 border border-primary/40 font-mono text-[12px] font-bold text-emerald-300 shrink-0 self-start lg:self-center">
                  {activeDistrict.highlightMetric}
                </div>
              </div>

              {/* Main 12-Col Body */}
              <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 5 Cols: Micro-Markets Covered, Who Trades Here & Sample Local Searches */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50 mb-2.5">
                      KEY COLONIES &amp; COMMERCIAL POCKETS COVERED:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeDistrict.areasCovered.map((area) => (
                        <span
                          key={area}
                          className="px-3 py-1.5 rounded-xl bg-primary-50 border border-primary-100 text-[12.5px] font-bold text-navy inline-flex items-center gap-1.5"
                        >
                          <MapPin className="w-3 h-3 text-primary shrink-0" />
                          <span>{area}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-primary-50/60 border border-primary-100">
                    <div className="font-mono text-[10.5px] font-extrabold uppercase tracking-wider text-primary mb-1">
                      TYPICAL DELHI BUSINESS PROFILE IN THIS HUB
                    </div>
                    <p className="text-[14px] text-navy-80 leading-relaxed font-medium">
                      {activeDistrict.whoTradesHere}
                    </p>
                  </div>

                  <div>
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50 mb-2.5">
                      HIGH-INTENT LOCAL &amp; AI SEARCHES WE CAPTURE:
                    </div>
                    <div className="space-y-2">
                      {activeDistrict.localSearchExamples.map((query) => (
                        <div
                          key={query}
                          className="px-3.5 py-2 rounded-xl bg-navy text-white font-mono text-[12px] flex items-center justify-between gap-2"
                        >
                          <span className="flex items-center gap-2 truncate">
                            <Search className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="truncate">{query}</span>
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400 shrink-0">
                            HIGH INTENT
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 7 Cols: 3 Tailored Solutions + Recommended Tech Stack + CTA */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50 mb-3">
                      WHAT WE DELIVER FOR {activeDistrict.tabName.toUpperCase()} BUSINESSES:
                    </div>

                    <div className="space-y-3.5">
                      {activeDistrict.whatTheyTypicallyNeed.map((sol, idx) => (
                        <Link
                          key={sol.title}
                          to={sol.to}
                          className="group block p-5 rounded-2xl bg-white border border-navy-08 hover:border-primary shadow-soft transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3.5">
                              <span className="w-8 h-8 rounded-xl bg-primary text-white font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                                0{idx + 1}
                              </span>
                              <div>
                                <h4 className="text-[17px] font-extrabold text-navy group-hover:text-primary transition-colors">
                                  {sol.title}
                                </h4>
                                <p className="text-[14px] text-navy-70 leading-relaxed mt-1">
                                  {sol.desc}
                                </p>
                              </div>
                            </div>
                            <span className="w-8 h-8 rounded-full bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Recommended Stack & Action Bar */}
                  <div className="pt-5 border-t border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-navy-50 mb-1.5">
                        RECOMMENDED STACK FOR THIS HUB:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDistrict.recommendedStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-navy/5 text-navy font-mono text-[11px] font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => triggerQuoteModal(activeDistrict.quoteTopic)}
                      className="px-6 py-3 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer shrink-0"
                    >
                      <span>Get a Plan for This Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — DELHI MARKET REALITIES: LOCAL CHALLENGES vs OUR SOLUTIONS (bg: #f0f7fc)
         ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              WHY GENERIC AGENCIES FAIL IN DELHI
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              4 Real Challenges Facing{' '}
              <span className="text-primary">Delhi Businesses Online</span> — &amp; How We Solve
              Them
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.7]">
              Delhi is one of India&apos;s most competitive commercial markets. Winning here takes
              more than a template website or boosted Instagram posts—it requires engineering built
              around how Delhi buyers search, compare, and talk on WhatsApp.
            </p>
          </div>

          {/* 4 Diagnostic Ledger Cards (2x2 Grid on Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-stretch">
            {DELHI_CHALLENGE_PAIRS.map((pair) => (
              <div
                key={pair.id}
                className="rounded-[24px] bg-white border border-navy-08 shadow-soft p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Top Index + Result Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-navy-08">
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                      <span className="w-6 h-6 rounded-lg bg-navy text-white flex items-center justify-center">
                        {pair.number}
                      </span>
                      <span>DELHI MARKET BOTTLENECK</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[11px] font-extrabold">
                      {pair.resultMetric}
                    </span>
                  </div>

                  {/* Problem Block */}
                  <div className="mb-5">
                    <h3 className="text-[20px] sm:text-[22px] font-extrabold text-navy leading-snug mb-2">
                      {pair.challengeTitle}
                    </h3>
                    <p className="text-[14.5px] text-navy-70 leading-relaxed mb-3">
                      {pair.delhiReality}
                    </p>
                    <div className="px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200/80 text-[12.5px] font-bold text-rose-800">
                      ⚠️ Cost of inaction: {pair.costOfInaction}
                    </div>
                  </div>

                  {/* WebXCode Solution Block */}
                  <div className="p-5 rounded-2xl bg-navy text-white">
                    <div className="font-mono text-[10.5px] font-extrabold uppercase tracking-wider text-primary mb-1">
                      ✔ THE WEBXCODE DELHI SOLUTION
                    </div>
                    <h4 className="text-[17px] font-extrabold text-white mb-2">
                      {pair.ourSolutionTitle}
                    </h4>
                    <p className="text-[13.5px] text-white/80 leading-relaxed">
                      {pair.howWeSolveIt}
                    </p>
                  </div>
                </div>

                {/* Linked Services / AI Solutions Chips at Bottom */}
                <div className="mt-6 pt-4 border-t border-navy-08 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[10.5px] font-bold uppercase text-navy-50">
                    POWERED BY:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {pair.linkedSolutions.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 hover:bg-primary text-primary hover:text-white text-[12px] font-bold transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — FULL-STACK DIGITAL & AI CAPABILITIES FOR DELHI (bg: #ffffff)
         ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                COMPLETE 34-SERVICE &amp; AI MATRIX FOR DELHI
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Every Service &amp; AI Solution —{' '}
                <span className="text-primary">Through a Delhi Lens</span>
              </h2>
              <p className="mt-3 text-[16px] text-navy-70 leading-[1.7]">
                Explore all <strong className="text-navy">22 core digital services</strong> and{' '}
                <strong className="text-navy">12 AI solutions</strong> we deliver for Delhi
                businesses—complete with how local teams use each capability and direct links to
                every dedicated service page.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white text-[13px] font-bold transition-colors"
              >
                <span>All 22 Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/ai-solutions"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white text-[13px] font-bold transition-colors"
              >
                <span>All 12 AI Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4 Pillar Switcher Tabs */}
          <div
            className="flex flex-wrap items-center gap-2.5 mb-9 pb-4 border-b border-navy-08"
            role="tablist"
            aria-label="Service and AI Solution Categories for Delhi"
          >
            {(
              [
                { key: 'Web & Apps', count: 8, badge: '8 Services' },
                { key: 'SEO & Performance', count: 8, badge: '8 Services' },
                { key: 'Brand & Content', count: 6, badge: '6 Services' },
                { key: 'AI Solutions', count: 12, badge: '12 AI Solutions' },
              ] as { key: MatrixTabKey; count: number; badge: string }[]
            ).map((tab) => {
              const isActive = activeMatrixTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveMatrixTab(tab.key)}
                  className={`px-5 py-3 rounded-full text-[14px] font-extrabold transition-all cursor-pointer flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-primary text-white shadow-soft'
                      : 'bg-primary-50 text-navy hover:bg-primary/15'
                  }`}
                >
                  <span>{tab.key}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                      isActive ? 'bg-navy text-white' : 'bg-white text-primary'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cards Grid for Selected Pillar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMatrixTab}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch"
            >
              {/* Render Core Services when Web & Apps / SEO & Performance / Brand & Content is active */}
              {displayedServices.map((srv) => {
                const delhiMeta = DELHI_LOCAL_ANGLE_BY_SLUG[srv.slug] || {
                  delhiUseCase: srv.tagline,
                  popularIn: 'Delhi NCR',
                };
                return (
                  <div
                    key={srv.slug}
                    className="group rounded-[22px] bg-white border border-navy-08 hover:border-primary shadow-soft hover:shadow-soft-hover p-5 sm:p-6 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="w-11 h-11 rounded-2xl bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                          <RenderServiceIcon name={srv.icon} className="w-5 h-5" />
                        </div>
                        {srv.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold uppercase">
                            {srv.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-[17.5px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug mb-2">
                        {srv.name}
                      </h3>

                      <p className="text-[13.5px] text-navy-70 leading-relaxed mb-4">
                        {delhiMeta.delhiUseCase}
                      </p>

                      <div className="p-2.5 rounded-xl bg-primary-50/70 border border-primary-100 mb-4">
                        <div className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-navy-50">
                          HIGH DEMAND IN DELHI:
                        </div>
                        <div className="text-[12px] font-bold text-navy mt-0.5">
                          {delhiMeta.popularIn}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-navy-08 flex items-center justify-between gap-2">
                      <Link
                        to={srv.futurePagePath}
                        className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-primary hover:text-navy transition-colors"
                      >
                        <span>Explore Service</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => triggerQuoteModal(`${srv.name} in Delhi`)}
                        className="text-[11.5px] font-bold text-navy-60 hover:text-primary underline cursor-pointer"
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Render AI Solutions when AI Solutions tab is active */}
              {displayedAISolutions.map((ai) => {
                const delhiMeta = DELHI_LOCAL_ANGLE_BY_SLUG[ai.slug] || {
                  delhiUseCase: ai.tagline,
                  popularIn: 'Delhi NCR',
                };
                return (
                  <div
                    key={ai.slug}
                    className="group rounded-[22px] bg-white border border-navy-08 hover:border-primary shadow-soft hover:shadow-soft-hover p-5 sm:p-6 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="w-11 h-11 rounded-2xl bg-navy text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                          <RenderAIIcon name={ai.icon} className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[10px] font-extrabold uppercase">
                          {ai.badge || ai.category}
                        </span>
                      </div>

                      <h3 className="text-[17.5px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug mb-2">
                        {ai.name}
                      </h3>

                      <p className="text-[13.5px] text-navy-70 leading-relaxed mb-4">
                        {delhiMeta.delhiUseCase}
                      </p>

                      <div className="p-2.5 rounded-xl bg-primary-50/70 border border-primary-100 mb-4">
                        <div className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-navy-50">
                          POPULAR WITH DELHI TEAMS:
                        </div>
                        <div className="text-[12px] font-bold text-navy mt-0.5">
                          {delhiMeta.popularIn}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-navy-08 flex items-center justify-between gap-2">
                      <Link
                        to={ai.futurePagePath}
                        className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-primary hover:text-navy transition-colors"
                      >
                        <span>Explore AI Solution</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => triggerQuoteModal(`${ai.name} for Delhi Business`)}
                        className="text-[11.5px] font-bold text-navy-60 hover:text-primary underline cursor-pointer"
                      >
                        Book Demo
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Key Industries We Serve in Delhi Cross-Link Strip */}
          <div className="mt-12 p-6 sm:p-7 rounded-[24px] bg-primary-50 border border-primary-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-1">
                INDUSTRY-SPECIFIC PLAYBOOKS FOR DELHI NCR
              </div>
              <h3 className="text-[19px] sm:text-[21px] font-extrabold text-navy">
                Explore Our Dedicated Industry Solutions Serving Delhi Businesses
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.slice(0, 8).map((ind: IndustryItem) => (
                <Link
                  key={ind.slug}
                  to={ind.futurePagePath}
                  className="px-3.5 py-2 rounded-full bg-white hover:bg-navy text-navy hover:text-white border border-navy-08 text-[12.5px] font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{ind.name}</span>
                  <ArrowRight className="w-3 h-3 text-primary" />
                </Link>
              ))}
              <Link
                to="/industries"
                className="px-3.5 py-2 rounded-full bg-primary text-white text-[12.5px] font-bold hover:bg-primary-700 transition-colors inline-flex items-center gap-1.5"
              >
                <span>All 12 Industries</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Delhi;
