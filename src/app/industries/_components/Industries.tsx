'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Check,
  X,
  AlertCircle,
  Sparkles,
  Laptop,
  Landmark,
  Compass,
  Factory,
  ShoppingBag,
  Heart,
  Sofa,
  Shirt,
  HeartPulse,
  Car,
  Plane,
  GraduationCap,
  Briefcase,
  Store,
  ShieldCheck,
  Search,
  BarChart3,
  Bot,
  Zap,
  Target,
  TrendingUp,
  Layers,
  Clock,
  Plus,
  Minus,
  Quote,
} from 'lucide-react';

/* ============================================================================
   IMAGE ASSETS
============================================================================ */
const IMG_SHOWCASE = '/images/hero_laptop_ui_showcase_1791104898778.jpg';
const IMG_SAAS = '/images/project_fintech_saas_ui_1791104929193.jpg';
const IMG_ECOM = '/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const IMG_AI = '/images/project_ai_enterprise_ui_1791104952051.jpg';
const IMG_OFFICE = '/images/why_webxcode_team_office_1791104914357.jpg';

/* ============================================================================
   PART B — INDUSTRIES DATA (`industries` array — named export)
============================================================================ */

export type IndustryGroup =
  | 'B2B & Professional'
  | 'Consumer & Retail'
  | 'Specialized';

export type IndustryIconName =
  | 'Laptop'
  | 'Landmark'
  | 'Compass'
  | 'Factory'
  | 'ShoppingBag'
  | 'Heart'
  | 'Sofa'
  | 'Shirt'
  | 'HeartPulse'
  | 'Car'
  | 'Plane'
  | 'GraduationCap';

export interface IndustryItem {
  slug: string;
  name: string;
  group: IndustryGroup;
  icon: IndustryIconName;
  image: string;
  imageAlt: string;
  tagline: string;
  challenges: [string, string, string];
  solutions: [string, string, string, string];
  highlightStat: string;
  futurePagePath: string;
}

export const industries: IndustryItem[] = [
  /* B2B & Professional (4) */
  {
    slug: 'b2b-saas',
    name: 'B2B / SaaS',
    group: 'B2B & Professional',
    icon: 'Laptop',
    image: IMG_SAAS,
    imageAlt: 'B2B SaaS analytics dashboard and conversion-focused marketing website',
    tagline: 'Turn your website into a pipeline machine',
    challenges: [
      'Long sales cycles',
      'Low demo sign-ups',
      'Complex product to explain',
    ],
    solutions: [
      'Web App Development',
      'SEO & AEO',
      'Performance Marketing',
      'AI Lead Qualification Chatbot',
    ],
    highlightStat: '+185% qualified demo sign-ups for a B2B SaaS client (placeholder)',
    futurePagePath: '/industries/b2b-saas',
  },
  {
    slug: 'finance-fintech',
    name: 'Finance & Fintech',
    group: 'B2B & Professional',
    icon: 'Landmark',
    image: IMG_SAAS,
    imageAlt: 'Secure fintech web application and wealth management portal',
    tagline: 'Build trust at every click',
    challenges: [
      'Trust and credibility',
      'Security and compliance needs',
      'High customer acquisition cost',
    ],
    solutions: [
      'Secure Web App Development',
      'Website Development',
      'SEO',
      'AI Chatbot for Customer Queries',
    ],
    highlightStat: '42% lower customer acquisition cost for a Finance & Fintech client (placeholder)',
    futurePagePath: '/industries/finance-fintech',
  },
  {
    slug: 'interior-design-architecture',
    name: 'Interior Design & Architecture',
    group: 'B2B & Professional',
    icon: 'Compass',
    image: IMG_SHOWCASE,
    imageAlt: 'Luxury architectural and interior design studio portfolio website',
    tagline: 'Let your portfolio win the project',
    challenges: [
      'Showcasing work beautifully',
      'Getting local, high-value leads',
      'Standing out from competitors',
    ],
    solutions: [
      'Portfolio Website Design',
      'Local SEO',
      'Google Ads',
      'Branding & Logo Design',
    ],
    highlightStat: '+210% high-ticket project consultations for an Architecture studio (placeholder)',
    futurePagePath: '/industries/interior-design-architecture',
  },
  {
    slug: 'manufacturing-industrial',
    name: 'Manufacturing & Industrial',
    group: 'B2B & Professional',
    icon: 'Factory',
    image: IMG_OFFICE,
    imageAlt: 'Industrial manufacturing digital product catalog and B2B portal',
    tagline: 'Bring your factory online and win B2B buyers',
    challenges: [
      'Outdated websites',
      'Large product catalogs',
      'Few qualified enquiries',
    ],
    solutions: [
      'Corporate Website Development',
      'Product Catalog Website',
      'B2B SEO',
      'CRM & Lead Automation',
    ],
    highlightStat: '3.4× increase in distributor RFQs for a Manufacturing client (placeholder)',
    futurePagePath: '/industries/manufacturing-industrial',
  },

  /* Consumer & Retail (4) */
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    group: 'Consumer & Retail',
    icon: 'ShoppingBag',
    image: IMG_ECOM,
    imageAlt: 'High-converting D2C e-commerce store and mobile checkout interface',
    tagline: 'More traffic, more carts, more checkouts',
    challenges: [
      'Cart abandonment',
      'Rising ad costs',
      'Slow, hard-to-use stores',
    ],
    solutions: [
      'Shopify / WooCommerce Development',
      'Conversion Rate Optimization',
      'Performance Marketing',
      'AI Shopping Assistant',
    ],
    highlightStat: '+140% checkout completion lift for an E-commerce brand (placeholder)',
    futurePagePath: '/industries/ecommerce',
  },
  {
    slug: 'skincare-beauty',
    name: 'Skincare & Beauty',
    group: 'Consumer & Retail',
    icon: 'Heart',
    image: IMG_ECOM,
    imageAlt: 'Premium D2C skincare and beauty storefront with routine quiz',
    tagline: 'A brand experience as good as your products',
    challenges: [
      'Crowded market',
      'Building brand trust',
      'Repeat purchases',
    ],
    solutions: [
      'D2C E-commerce Website',
      'Branding & Creative',
      'Performance Marketing',
      'AI Content Creation',
    ],
    highlightStat: '2.9× repeat purchase rate for a Skincare & Beauty brand (placeholder)',
    futurePagePath: '/industries/skincare-beauty',
  },
  {
    slug: 'home-decor-furniture',
    name: 'Home Decor & Furniture',
    group: 'Consumer & Retail',
    icon: 'Sofa',
    image: IMG_SHOWCASE,
    imageAlt: 'Interactive home decor and luxury furniture catalog website',
    tagline: 'Help customers picture it in their home',
    challenges: [
      'High-consideration purchases',
      'Large visual catalogs',
      'Online-to-store journeys',
    ],
    solutions: [
      'E-commerce Development',
      'UI/UX Design',
      'Google Shopping Ads',
      'Local SEO',
    ],
    highlightStat: '+165% showroom & online orders for a Home Decor client (placeholder)',
    futurePagePath: '/industries/home-decor-furniture',
  },
  {
    slug: 'fashion-lifestyle',
    name: 'Fashion & Lifestyle',
    group: 'Consumer & Retail',
    icon: 'Shirt',
    image: IMG_ECOM,
    imageAlt: 'Editorial fashion and lifestyle e-commerce shopping experience',
    tagline: 'Style that sells, online',
    challenges: [
      'Fast-changing trends',
      'High return rates',
      'Strong visual branding',
    ],
    solutions: [
      'Fashion E-commerce Website',
      'Branding & Design',
      'Performance Marketing',
      'AI Generated Videos',
    ],
    highlightStat: '3.2× ROAS on seasonal launches for a Fashion & Lifestyle label (placeholder)',
    futurePagePath: '/industries/fashion-lifestyle',
  },

  /* Specialized (4) */
  {
    slug: 'healthcare',
    name: 'Healthcare',
    group: 'Specialized',
    icon: 'HeartPulse',
    image: IMG_AI,
    imageAlt: 'Multi-specialty healthcare clinic website with instant appointment booking',
    tagline: 'Make it easy for patients to find and book you',
    challenges: [
      'Appointment booking friction',
      'Local visibility',
      'Patient trust',
    ],
    solutions: [
      'Clinic & Hospital Websites',
      'Online Appointment Booking',
      'Local SEO',
      'WhatsApp AI Chatbot',
    ],
    highlightStat: '+190% online patient appointments for a Healthcare network (placeholder)',
    futurePagePath: '/industries/healthcare',
  },
  {
    slug: 'ev-automotive',
    name: 'EV & Automotive',
    group: 'Specialized',
    icon: 'Car',
    image: IMG_SHOWCASE,
    imageAlt: 'EV and automotive interactive vehicle configurator and test ride booking portal',
    tagline: 'Drive more test rides and showroom visits',
    challenges: [
      'Educating new buyers',
      'Dealer and showroom leads',
      'Comparing models online',
    ],
    solutions: [
      'Automotive Website Development',
      'Test Drive Booking System',
      'Google Ads',
      'AI Voice Agents',
    ],
    highlightStat: '+230% booked test rides for an EV & Automotive brand (placeholder)',
    futurePagePath: '/industries/ev-automotive',
  },
  {
    slug: 'travel-hospitality',
    name: 'Travel & Hospitality',
    group: 'Specialized',
    icon: 'Plane',
    image: IMG_OFFICE,
    imageAlt: 'Direct hotel and luxury tour booking platform with AI concierge',
    tagline: 'Fill rooms and tours with direct bookings',
    challenges: [
      'Dependence on OTAs',
      'Seasonal demand',
      'Instant guest queries',
    ],
    solutions: [
      'Booking Website Development',
      'Local SEO',
      'Google Ads',
      'AI Booking Chatbot',
    ],
    highlightStat: '+155% commission-free direct bookings for a Hospitality group (placeholder)',
    futurePagePath: '/industries/travel-hospitality',
  },
  {
    slug: 'education-edtech',
    name: 'Education & EdTech',
    group: 'Specialized',
    icon: 'GraduationCap',
    image: IMG_AI,
    imageAlt: 'EdTech learning management portal and university admission platform',
    tagline: 'More enquiries, more admissions',
    challenges: [
      'Admission lead generation',
      'Long decision process',
      'High query volume',
    ],
    solutions: [
      'Institute Websites & LMS',
      'SEO',
      'Performance Marketing',
      'AI Admission Chatbot',
    ],
    highlightStat: '+175% student admission enquiries for an Education & EdTech institute (placeholder)',
    futurePagePath: '/industries/education-edtech',
  },
];

/* Helper to render industry icon by name */
export const IndustryIcon: React.FC<{
  name: IndustryIconName;
  className?: string;
}> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Laptop':
      return <Laptop className={className} />;
    case 'Landmark':
      return <Landmark className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Factory':
      return <Factory className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    case 'Heart':
      return <Heart className={className} />;
    case 'Sofa':
      return <Sofa className={className} />;
    case 'Shirt':
      return <Shirt className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Plane':
      return <Plane className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    default:
      return <Laptop className={className} />;
  }
};

/* Group metadata for Directory bands */
const GROUP_META: {
  group: IndustryGroup;
  number: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  {
    group: 'B2B & Professional',
    number: '01',
    description:
      'High-trust websites, enterprise web apps, B2B SEO, and AI lead engines built for complex buying committees.',
    icon: Briefcase,
  },
  {
    group: 'Consumer & Retail',
    number: '02',
    description:
      'Fast, mobile-first D2C storefronts, visual catalogs, and performance marketing that turn browsers into repeat buyers.',
    icon: Store,
  },
  {
    group: 'Specialized',
    number: '03',
    description:
      'Booking systems, patient & student portals, and 24/7 AI voice and WhatsApp assistants tailored to regulated sectors.',
    icon: ShieldCheck,
  },
];

/* Goals for Section 2 (Sentence Finder) */
const SENTENCE_GOALS = [
  'Get more leads',
  'Sell more online',
  'Build a new website',
  'Automate with AI',
  'Improve Google rankings',
] as const;

/* Matrix Columns for Section 5 */
const MATRIX_COLUMNS = [
  { key: 'web', label: 'Website Development' },
  { key: 'ecom', label: 'E-commerce' },
  { key: 'webapps', label: 'Web Apps' },
  { key: 'seo', label: 'SEO / AEO' },
  { key: 'perf', label: 'Performance Marketing' },
  { key: 'ai', label: 'AI Chatbots & Agents' },
  { key: 'brand', label: 'Branding' },
] as const;

type MatrixCellStatus = 'core' | 'often' | 'empty';

/* Derive matrix status from each industry's solutions & profile */
function getMatrixStatus(
  industry: IndustryItem,
  colKey: (typeof MATRIX_COLUMNS)[number]['key']
): MatrixCellStatus {
  const joined = industry.solutions.join(' ').toLowerCase();

  switch (colKey) {
    case 'web':
      if (
        joined.includes('website') ||
        joined.includes('portfolio') ||
        joined.includes('catalog')
      ) {
        return 'core';
      }
      return 'often';
    case 'ecom':
      if (
        joined.includes('shopify') ||
        joined.includes('woocommerce') ||
        joined.includes('e-commerce') ||
        joined.includes('shopping')
      ) {
        return 'core';
      }
      if (industry.group === 'Consumer & Retail') return 'core';
      return 'empty';
    case 'webapps':
      if (
        joined.includes('web app') ||
        joined.includes('booking') ||
        joined.includes('lms') ||
        joined.includes('crm')
      ) {
        return 'core';
      }
      if (
        industry.slug === 'manufacturing-industrial' ||
        industry.slug === 'ecommerce'
      ) {
        return 'often';
      }
      return 'empty';
    case 'seo':
      if (joined.includes('seo') || joined.includes('aeo')) {
        return 'core';
      }
      return 'often';
    case 'perf':
      if (
        joined.includes('performance marketing') ||
        joined.includes('google ads') ||
        joined.includes('google shopping')
      ) {
        return 'core';
      }
      return 'often';
    case 'ai':
      if (joined.includes('ai ') || joined.includes('automation')) {
        return 'core';
      }
      return 'often';
    case 'brand':
      if (joined.includes('branding') || joined.includes('ui/ux')) {
        return 'core';
      }
      if (
        industry.group === 'Consumer & Retail' ||
        industry.slug === 'b2b-saas'
      ) {
        return 'often';
      }
      return 'empty';
    default:
      return 'empty';
  }
}

/* Section 6: 6 Common Challenges Flip Cards */
const COMMON_CHALLENGES_CARDS = [
  {
    id: 'not-enough-leads',
    icon: Target,
    problem: 'Not enough leads',
    solution:
      'We combine conversion-focused landing pages, high-intent SEO/Google Ads, and 24/7 AI lead qualification chatbots to turn anonymous visitors into booked calls.',
    targetSection: '#deep-dive',
  },
  {
    id: 'website-looks-outdated',
    icon: Layers,
    problem: 'Website looks outdated',
    solution:
      'We redesign your digital presence with a modern, mobile-first Figma design system that communicates instant authority and outshines category competitors.',
    targetSection: '#directory',
  },
  {
    id: 'slow-hard-to-use',
    icon: Zap,
    problem: 'Slow, hard-to-use website',
    solution:
      'We engineer sub-second Next.js and performance-tuned storefronts hitting 95+ Core Web Vitals scores with frictionless navigation and checkout flows.',
    targetSection: '#deep-dive',
  },
  {
    id: 'invisible-on-google',
    icon: Search,
    problem: 'Invisible on Google',
    solution:
      'Our technical SEO, Local SEO, and Answer Engine Optimization (AEO/GEO) playbooks put your business at the top of Google Search and AI answer engines.',
    targetSection: '#deep-dive',
  },
  {
    id: 'too-much-manual-work',
    icon: Bot,
    problem: 'Too much manual work',
    solution:
      'We deploy custom WhatsApp AI chatbots, voice agents, and automated CRM workflows that handle repetitive enquiries, bookings, and follow-ups automatically.',
    targetSection: '#deep-dive',
  },
  {
    id: 'high-ad-costs',
    icon: TrendingUp,
    problem: 'High ad costs, low returns',
    solution:
      'We pair precision Google Ads targeting with continuous Conversion Rate Optimization (CRO) and compounding organic SEO to cut your blended acquisition cost.',
    targetSection: '#deep-dive',
  },
];

/* Section 7: 4 Horizontal Expanding Panels (Our Industry-First Approach) */
const APPROACH_PANELS = [
  {
    num: '01',
    title: 'Research Your Market',
    shortText: 'We study your competitors, customers and search demand.',
    detailText:
      'Before writing a single line of code, our strategists audit the top performers in your category, map high-intent search queries, and identify the exact trust signals your buyers look for before enquiring.',
    deliverables: ['Category Competitor Benchmark', 'Buyer Intent Keyword & AEO Map', 'Conversion Funnel Audit'],
    icon: Search,
  },
  {
    num: '02',
    title: "Speak Your Customer's Language",
    shortText: 'Content and design that fits how your buyers think.',
    detailText:
      'A CFO evaluating fintech software reads differently than a homeowner browsing luxury furniture. We craft industry-native messaging, visual hierarchy, and proof points that resonate immediately.',
    deliverables: ['Industry-Native Copywriting', 'Bespoke Figma UI/UX System', 'Trust & Compliance Framing'],
    icon: Sparkles,
  },
  {
    num: '03',
    title: 'Use What Works in Your Industry',
    shortText: 'Proven features, integrations and funnels.',
    detailText:
      'From instant WhatsApp appointment booking for clinics and test-ride schedulers for EV brands to multi-currency D2C checkouts—we ship pre-vetted industry workflows that convert from day one.',
    deliverables: ['Sector-Specific Booking & Catalog Flows', 'CRM, ERP & Payment Integrations', '24/7 AI Lead & Support Agents'],
    icon: Layers,
  },
  {
    num: '04',
    title: 'Measure What Matters',
    shortText: 'Industry-relevant KPIs, not vanity numbers.',
    detailText:
      'We configure end-to-end attribution tracking around the metrics that actually grow your bottom line: qualified demo pipeline, booked appointments, direct room bookings, and net ROAS.',
    deliverables: ['Custom GA4 & Conversion Attribution', 'Pipeline & ROAS Dashboards', 'Continuous CRO Experimentation'],
    icon: BarChart3,
  },
];

/* Section 8: Industry Results Slider (4 placeholder slides clearly marked) */
const INDUSTRY_RESULTS_SLIDES = [
  {
    id: 'result-saas',
    stat: '+210%',
    statLabel: 'Increase in Qualified Enterprise Demo Bookings',
    industry: 'B2B / SaaS',
    industrySlug: 'b2b-saas',
    quote:
      'WebXCode completely transformed our SaaS marketing site and deployed an AI qualification agent. Within 90 days, our enterprise demo pipeline more than doubled while our bounce rate dropped by 38%.',
    clientName: 'Vikram Singhania (Placeholder)',
    clientRole: 'VP of Marketing, CloudScale B2B Technologies',
  },
  {
    id: 'result-ecommerce',
    stat: '2.9×',
    statLabel: 'Growth in Direct-to-Consumer Online Revenue',
    industry: 'Skincare & Beauty',
    industrySlug: 'skincare-beauty',
    quote:
      'Our previous store took 5 seconds to load on mobile and leaked mobile ad traffic. WebXCode rebuilt our D2C experience with an interactive routine finder and lightning-fast UPI checkout.',
    clientName: 'Meera Nair (Placeholder)',
    clientRole: 'Founder, AuraBotanics Skincare',
  },
  {
    id: 'result-healthcare',
    stat: '+190%',
    statLabel: 'More Patient Appointments Booked Online',
    industry: 'Healthcare',
    industrySlug: 'healthcare',
    quote:
      'Patients can now find our specialists on Google Local Search and book confirmed slots via our website or WhatsApp AI assistant in under 45 seconds—reducing front-desk phone load by 65%.',
    clientName: 'Dr. Rajesh Khanna (Placeholder)',
    clientRole: 'Medical Director, NovaCare Multi-Specialty Clinics',
  },
  {
    id: 'result-manufacturing',
    stat: '3.4×',
    statLabel: 'Increase in B2B Distributor & Export RFQs',
    industry: 'Manufacturing & Industrial',
    industrySlug: 'manufacturing-industrial',
    quote:
      'WebXCode turned our 800+ SKU PDF catalog into a searchable, SEO-optimized digital specification portal connected directly to our sales CRM. We now win international distributor enquiries every week.',
    clientName: 'Sandeep Kulkarni (Placeholder)',
    clientRole: 'Director of Operations, Apex Precision Industrials',
  },
];

/* Section 9: 5 Industry FAQs */
const INDUSTRY_FAQS = [
  {
    question: 'Do you have experience in my industry?',
    answer:
      'Yes. Over the past 5+ years and 100+ delivered projects across India, the US, UK, and UAE, we have built websites, custom web apps, SEO/AEO campaigns, and AI solutions across B2B SaaS, Fintech, Healthcare, E-commerce, Real Estate/Interiors, Manufacturing, Education, Automotive, and Hospitality.',
  },
  {
    question: 'Can you work with businesses outside these 12 industries?',
    answer:
      'Absolutely. These 12 categories represent our most frequent engagements, but our research-first discovery process allows us to rapidly map customer psychology, competitive gaps, and technical workflows for any niche—from logistics and legal tech to renewable energy and non-profits.',
  },
  {
    question: 'Do you follow industry-specific compliance (e.g. healthcare, finance)?',
    answer:
      'Yes. We architect platforms with strict security and privacy standards, including encrypted data transmission, role-based access control, DPDP Act (India) and GDPR readiness, accessibility standards (WCAG AA), and audit-ready cloud infrastructure.',
  },
  {
    question: 'Can you show examples of work in my industry?',
    answer:
      'Certainly. You can explore live case studies on our Our Work page, or request an industry-specific walkthrough during your free discovery call where we share relevant architecture demos and performance benchmarks.',
  },
  {
    question: 'How do you price industry-specific projects?',
    answer:
      'We provide transparent, milestone-based fixed quotes tailored to your exact scope—whether you need a high-converting corporate website, a custom e-commerce store, an AI lead agent, or a full-stack web application. Request a free quote to receive an itemized proposal within 24 hours.',
  },
];

/* ============================================================================
   MAIN INDUSTRIES PAGE COMPONENT (/industries)
============================================================================ */

interface IndustriesProps {
  onOpenQuoteModal?: (service?: string) => void;
}

const Industries: React.FC<IndustriesProps> = ({ onOpenQuoteModal: propOpenQuoteModal  }) => {
  const { openQuoteModal: contextOpenQuoteModal } = useQuoteModal();
  const onOpenQuoteModal = propOpenQuoteModal || contextOpenQuoteModal;
  // location handled
  const prefersReducedMotion = useReducedMotion();

  // Orbit Hero hover state
  const [hoveredOrbitSlug, setHoveredOrbitSlug] = useState<string | null>(null);

  // Section 2: Sentence Finder states
  const [finderIndustrySlug, setFinderIndustrySlug] = useState<string>('b2b-saas');
  const [finderGoal, setFinderGoal] = useState<string>(SENTENCE_GOALS[0]);
  const [finderSubmitted, setFinderSubmitted] = useState<boolean>(true);

  // Section 3: Directory Group Filter & Hash Highlight state
  const [directoryGroup, setDirectoryGroup] = useState<'All' | IndustryGroup>('All');
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);

  // Section 4: Deep Dive Explorer active industry
  const [deepDiveSlug, setDeepDiveSlug] = useState<string>('b2b-saas');

  // Section 5: Matrix hover states
  const [hoveredRowSlug, setHoveredRowSlug] = useState<string | null>(null);
  const [hoveredColKey, setHoveredColKey] = useState<string | null>(null);

  // Section 6: Flip Cards state (for tap/keyboard toggle)
  const [flippedCardIds, setFlippedCardIds] = useState<Record<string, boolean>>({});

  // Section 7: Expanding Panels active index
  const [openApproachIdx, setOpenApproachIdx] = useState<number>(0);

  // Section 8: Results Slider index
  const [resultSlideIdx, setResultSlideIdx] = useState<number>(0);

  // Section 9: FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // SEO Meta & Document Title
  useEffect(() => {
    document.title =
      'Industries We Serve | WebXCode — Web, SEO & AI Solutions by Industry';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore tailored web development, e-commerce, technical SEO/AEO, and AI chatbot solutions built for 12+ industries including B2B SaaS, Fintech, Healthcare, E-commerce, and Manufacturing.'
      );
    }
  }, []);

  // Handle Hash Deep Links (e.g. /industries#healthcare) -> ensure group is visible, select in Deep Dive, highlight card
  const locationHash = typeof window !== 'undefined' ? window.location.hash : '';
  useEffect(() => {
    if (!locationHash) return;
    const rawId = locationHash.replace('#', '');
    const matchedIndustry = industries.find((ind) => ind.slug === rawId);
    if (matchedIndustry) {
      setDirectoryGroup('All');
      setDeepDiveSlug(matchedIndustry.slug);
      setFinderIndustrySlug(matchedIndustry.slug);
      setHighlightedSlug(matchedIndustry.slug);

      const timer = setTimeout(() => {
        const el = document.getElementById(matchedIndustry.slug);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);

      const clearTimer = setTimeout(() => {
        setHighlightedSlug(null);
      }, 3200);

      return () => {
        clearTimeout(timer);
        clearTimeout(clearTimer);
      };
    }
  }, [locationHash]);

  const scrollToIndustryCard = (slug: string) => {
    setDirectoryGroup('All');
    setHighlightedSlug(slug);
    setDeepDiveSlug(slug);
    setTimeout(() => {
      const el = document.getElementById(slug);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 60);
    setTimeout(() => {
      setHighlightedSlug(null);
    }, 3000);
  };

  const handleExploreInDeepDive = (slug: string) => {
    setDeepDiveSlug(slug);
    const el = document.getElementById('deep-dive');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFlipCard = (id: string) => {
    setFlippedCardIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedFinderIndustry =
    industries.find((i) => i.slug === finderIndustrySlug) || industries[0];

  const activeDeepDiveIndustry =
    industries.find((i) => i.slug === deepDiveSlug) || industries[0];

  const visibleGroups =
    directoryGroup === 'All'
      ? GROUP_META
      : GROUP_META.filter((g) => g.group === directoryGroup);

  const b2bRingIndustries = industries.filter(
    (i) => i.group === 'B2B & Professional'
  );
  const consumerRingIndustries = industries.filter(
    (i) => i.group === 'Consumer & Retail'
  );
  const specializedRingIndustries = industries.filter(
    (i) => i.group === 'Specialized'
  );

  // JSON-LD: CollectionPage + ItemList of 12 industries + FAQPage
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Industries We Serve | WebXCode',
      description:
        'Digital solutions—websites, web apps, SEO/AEO, and AI automation—tailored for 12 core industries.',
      url: 'https://webxcode.com/industries',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: industries.map((ind, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: ind.name,
          description: `${ind.tagline}. Recommended solutions: ${ind.solutions.join(', ')}`,
          url: `https://webxcode.com/industries#${ind.slug}`,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: INDUSTRY_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <main className="flex-1 bg-white text-navy">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Keyframe styles for smooth orbit rotation that pauses on hover */}
      <style>{`
        @keyframes orbitSpinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitSpinReverseSlow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .orbit-ring-cw {
          animation: orbitSpinSlow 46s linear infinite;
        }
        .orbit-ring-ccw {
          animation: orbitSpinReverseSlow 56s linear infinite;
        }
        .orbit-counter-cw {
          animation: orbitSpinReverseSlow 46s linear infinite;
        }
        .orbit-counter-ccw {
          animation: orbitSpinSlow 56s linear infinite;
        }
        .orbit-paused .orbit-ring-cw,
        .orbit-paused .orbit-ring-ccw,
        .orbit-paused .orbit-counter-cw,
        .orbit-paused .orbit-counter-ccw {
          animation-play-state: paused !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-ring-cw,
          .orbit-ring-ccw,
          .orbit-counter-cw,
          .orbit-counter-ccw {
            animation: none !important;
          }
        }
      `}</style>

      {/* ====================================================================
          1. HERO — INDUSTRY ORBIT (navy — 50/50 split)
      ==================================================================== */}
      <section className="relative bg-navy text-white pt-12 pb-28 lg:pt-16 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
        <div className="absolute -right-24 top-1/4 w-[620px] h-[620px] blue-glow-strong pointer-events-none" />
        <div className="absolute -left-24 bottom-0 w-[440px] h-[440px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 50% (6 cols) */}
            <div className="lg:col-span-6">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-white/70 mb-6"
              >
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
                <span className="text-white font-semibold" aria-current="page">
                  Industries
                </span>
              </nav>

              {/* Label on dark */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em]">
                  INDUSTRIES WE SERVE
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold leading-[1.08] tracking-tight mb-5">
                Digital Solutions Built for{' '}
                <span className="text-primary">Your Industry</span>
              </h1>

              {/* Paragraph */}
              <p className="text-[17px] sm:text-[18px] text-white/75 leading-relaxed mb-8 max-w-xl">
                Every industry has its own customers, challenges and competition. We
                build websites, marketing and AI solutions designed around how your
                industry actually works.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#directory"
                  className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Find Your Industry</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal('Industry Solution Consultation')}
                  className="px-7 py-4 rounded-full border border-white/25 hover:border-white hover:bg-white/10 text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Quote</span>
                </button>
              </div>

              {/* 3 Inline Stats */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-10">
                <div>
                  <span className="text-[26px] sm:text-[30px] font-extrabold text-primary tabular-nums">
                    12
                  </span>
                  <span className="text-[14px] text-white/75 font-semibold ml-2">
                    Industries
                  </span>
                </div>
                <span className="text-white/20 hidden sm:inline">·</span>
                <div>
                  <span className="text-[26px] sm:text-[30px] font-extrabold text-white tabular-nums">
                    100+
                  </span>
                  <span className="text-[14px] text-white/75 font-semibold ml-2">
                    Projects
                  </span>
                </div>
                <span className="text-white/20 hidden sm:inline">·</span>
                <div>
                  <span className="text-[26px] sm:text-[30px] font-extrabold text-white tabular-nums">
                    20+
                  </span>
                  <span className="text-[14px] text-white/75 font-semibold ml-2">
                    Countries
                  </span>
                </div>
              </div>
            </div>

            {/* Right 50% (6 cols): Interactive 3-Ring Industry Orbit */}
            <div className="lg:col-span-6 flex flex-col items-center">
              {/* Desktop / Tablet Interactive Orbit */}
              <div
                className={`hidden sm:flex relative w-[430px] h-[430px] xl:w-[460px] xl:h-[460px] items-center justify-center ${
                  hoveredOrbitSlug || prefersReducedMotion ? 'orbit-paused' : ''
                }`}
              >
                {/* Soft Radial Glow */}
                <div className="absolute inset-12 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

                {/* Center Glowing WebXCode Logo Mark inside Blue Circle */}
                <div className="relative z-20 w-24 h-24 rounded-full bg-primary border-4 border-white/20 shadow-2xl flex flex-col items-center justify-center text-white">
                  <span className="text-[18px] font-extrabold tracking-tight leading-none">
                    Web<span className="text-navy">X</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/85 mt-0.5">
                    12 Sectors
                  </span>
                </div>

                {/* Inner Ring 1: B2B & Professional (4 icons, diameter 210px) */}
                <div className="absolute w-[210px] h-[210px] rounded-full border border-dashed border-primary/50 orbit-ring-cw pointer-events-none">
                  {b2bRingIndustries.map((ind, idx) => {
                    const positions = [
                      'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
                      'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
                      'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
                      'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
                    ];
                    const isHovered = hoveredOrbitSlug === ind.slug;
                    return (
                      <div
                        key={ind.slug}
                        className={`absolute ${positions[idx]} pointer-events-auto`}
                      >
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredOrbitSlug(ind.slug)}
                          onMouseLeave={() => setHoveredOrbitSlug(null)}
                          onFocus={() => setHoveredOrbitSlug(ind.slug)}
                          onBlur={() => setHoveredOrbitSlug(null)}
                          onClick={() => scrollToIndustryCard(ind.slug)}
                          aria-label={`Jump to ${ind.name}`}
                          className={`orbit-counter-cw relative w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 cursor-pointer shadow-lg ${
                            isHovered
                              ? 'bg-primary text-white scale-125 ring-4 ring-white/30 z-30'
                              : 'bg-white text-primary hover:bg-primary hover:text-white'
                          }`}
                        >
                          <IndustryIcon name={ind.icon} className="w-5 h-5" />
                          {isHovered && (
                            <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-white text-navy text-[11px] font-extrabold whitespace-nowrap shadow-md border border-primary-100">
                              {ind.name}
                            </span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Middle Ring 2: Consumer & Retail (4 icons, diameter 320px) */}
                <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-primary/40 orbit-ring-ccw pointer-events-none">
                  {consumerRingIndustries.map((ind, idx) => {
                    const positions = [
                      'top-[14.6%] left-[85.4%] -translate-x-1/2 -translate-y-1/2',
                      'top-[85.4%] left-[85.4%] -translate-x-1/2 -translate-y-1/2',
                      'top-[85.4%] left-[14.6%] -translate-x-1/2 -translate-y-1/2',
                      'top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2',
                    ];
                    const isHovered = hoveredOrbitSlug === ind.slug;
                    return (
                      <div
                        key={ind.slug}
                        className={`absolute ${positions[idx]} pointer-events-auto`}
                      >
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredOrbitSlug(ind.slug)}
                          onMouseLeave={() => setHoveredOrbitSlug(null)}
                          onFocus={() => setHoveredOrbitSlug(ind.slug)}
                          onBlur={() => setHoveredOrbitSlug(null)}
                          onClick={() => scrollToIndustryCard(ind.slug)}
                          aria-label={`Jump to ${ind.name}`}
                          className={`orbit-counter-ccw relative w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 cursor-pointer shadow-lg ${
                            isHovered
                              ? 'bg-primary text-white scale-125 ring-4 ring-white/30 z-30'
                              : 'bg-white text-primary hover:bg-primary hover:text-white'
                          }`}
                        >
                          <IndustryIcon name={ind.icon} className="w-5 h-5" />
                          {isHovered && (
                            <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-white text-navy text-[11px] font-extrabold whitespace-nowrap shadow-md border border-primary-100">
                              {ind.name}
                            </span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Outer Ring 3: Specialized (4 icons, diameter 425px) */}
                <div className="absolute w-[425px] h-[425px] rounded-full border border-dashed border-primary/30 orbit-ring-cw pointer-events-none">
                  {specializedRingIndustries.map((ind, idx) => {
                    const positions = [
                      'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
                      'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
                      'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
                      'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
                    ];
                    const isHovered = hoveredOrbitSlug === ind.slug;
                    return (
                      <div
                        key={ind.slug}
                        className={`absolute ${positions[idx]} pointer-events-auto`}
                      >
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredOrbitSlug(ind.slug)}
                          onMouseLeave={() => setHoveredOrbitSlug(null)}
                          onFocus={() => setHoveredOrbitSlug(ind.slug)}
                          onBlur={() => setHoveredOrbitSlug(null)}
                          onClick={() => scrollToIndustryCard(ind.slug)}
                          aria-label={`Jump to ${ind.name}`}
                          className={`orbit-counter-cw relative w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 cursor-pointer shadow-lg ${
                            isHovered
                              ? 'bg-primary text-white scale-125 ring-4 ring-white/30 z-30'
                              : 'bg-white text-primary hover:bg-primary hover:text-white'
                          }`}
                        >
                          <IndustryIcon name={ind.icon} className="w-5 h-5" />
                          {isHovered && (
                            <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-white text-navy text-[11px] font-extrabold whitespace-nowrap shadow-md border border-primary-100">
                              {ind.name}
                            </span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Static Orbit Grid below text */}
              <div className="sm:hidden w-full bg-white/5 border border-white/10 rounded-[20px] p-5">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-extrabold text-[12px]">
                    WX
                  </div>
                  <span className="text-[13px] font-bold text-white">
                    Tap any industry to explore
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {industries.map((ind) => (
                    <button
                      key={ind.slug}
                      type="button"
                      onClick={() => scrollToIndustryCard(ind.slug)}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-primary text-white flex flex-col items-center text-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center">
                        <IndustryIcon name={ind.icon} className="w-4 h-4" />
                      </span>
                      <span className="text-[11px] font-bold leading-tight line-clamp-1">
                        {ind.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Orbit Legend below */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-[12px] font-semibold text-white/80">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span>B2B &amp; Professional</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  <span>Consumer &amp; Retail</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/60 ring-2 ring-white/40" />
                  <span>Specialized</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. FIND YOUR INDUSTRY — SENTENCE FINDER (white, overlapping hero by ~60px)
      ==================================================================== */}
      <section className="relative z-20 -mt-14 sm:-mt-16 pb-16 lg:pb-24 px-4 sm:px-6">
        <div className="max-w-[1140px] mx-auto bg-white rounded-[24px] p-6 sm:p-10 lg:p-12 border border-navy-08 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-navy-08">
            <div className="text-[20px] sm:text-[26px] lg:text-[28px] font-extrabold text-navy leading-[1.45]">
              <span>I run a </span>
              <span className="inline-block relative mx-1">
                <select
                  aria-label="Select your industry"
                  value={finderIndustrySlug}
                  onChange={(e) => {
                    setFinderIndustrySlug(e.target.value);
                    setFinderSubmitted(true);
                  }}
                  className="appearance-none bg-primary-50/70 hover:bg-primary-50 text-primary font-extrabold border-b-2 border-primary px-3 py-1 pr-8 rounded-t-lg focus:outline-none cursor-pointer"
                >
                  {GROUP_META.map((grp) => (
                    <optgroup key={grp.group} label={grp.group}>
                      {industries
                        .filter((ind) => ind.group === grp.group)
                        .map((ind) => (
                          <option key={ind.slug} value={ind.slug}>
                            {ind.name}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-primary absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </span>
              <span> business and I want to </span>
              <span className="inline-block relative mx-1">
                <select
                  aria-label="Select your primary goal"
                  value={finderGoal}
                  onChange={(e) => {
                    setFinderGoal(e.target.value);
                    setFinderSubmitted(true);
                  }}
                  className="appearance-none bg-primary-50/70 hover:bg-primary-50 text-primary font-extrabold border-b-2 border-primary px-3 py-1 pr-8 rounded-t-lg focus:outline-none cursor-pointer"
                >
                  {SENTENCE_GOALS.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal.toLowerCase()}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-primary absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </span>
              <span>.</span>
            </div>

            <button
              type="button"
              onClick={() => setFinderSubmitted(true)}
              className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-colors inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-soft"
            >
              <span>Show My Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Animated Recommendation Result Panel */}
          <AnimatePresence mode="wait">
            {finderSubmitted && selectedFinderIndustry && (
              <motion.div
                key={`${selectedFinderIndustry.slug}-${finderGoal}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="pt-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                      <IndustryIcon
                        name={selectedFinderIndustry.icon}
                        className="w-6 h-6"
                      />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[20px] font-extrabold text-navy">
                          {selectedFinderIndustry.name}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary text-[11px] font-bold">
                          Goal: {finderGoal}
                        </span>
                      </div>
                      <p className="text-[14px] text-navy-70 font-medium">
                        {selectedFinderIndustry.tagline}
                      </p>
                    </div>
                  </div>

                  {/* 4 Recommended Solutions as Blue Pill Chips */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-navy-50 mr-1">
                      Recommended Stack:
                    </span>
                    {selectedFinderIndustry.solutions.map((sol) => (
                      <span
                        key={sol}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary text-[13px] font-bold"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{sol}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Result Actions */}
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {selectedFinderIndustry.slug === 'b2b-saas' ||
                  selectedFinderIndustry.slug === 'finance-fintech' ||
                  selectedFinderIndustry.slug ===
                    'interior-design-architecture' ||
                  selectedFinderIndustry.slug ===
                    'manufacturing-industrial' ||
                  selectedFinderIndustry.slug === 'ecommerce' ||
                  selectedFinderIndustry.slug === 'skincare-beauty' ||
                  selectedFinderIndustry.slug === 'home-decor-furniture' ||
                  selectedFinderIndustry.slug === 'fashion-lifestyle' ||
                  selectedFinderIndustry.slug === 'healthcare' ||
                  selectedFinderIndustry.slug === 'travel-hospitality' ||
                  selectedFinderIndustry.slug === 'education-edtech' ? (
                    <Link
                      href={selectedFinderIndustry.futurePagePath}
                      className="px-5 py-3 rounded-full bg-primary-50 hover:bg-primary hover:text-white text-primary font-bold text-[14px] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>See Industry Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => scrollToIndustryCard(selectedFinderIndustry.slug)}
                      className="px-5 py-3 rounded-full bg-primary-50 hover:bg-primary hover:text-white text-primary font-bold text-[14px] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>See Industry Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  <Link
                    href="/ai-solutions"
                    className="px-5 py-3 rounded-full border border-primary/35 hover:border-primary hover:bg-primary-50 text-primary font-bold text-[14px] transition-colors inline-flex items-center gap-1.5"
                  >
                    <Bot className="w-4 h-4" />
                    <span>AI Solutions Hub</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenQuoteModal(
                        `${selectedFinderIndustry.name} — ${finderGoal}`
                      )
                    }
                    className="px-6 py-3 rounded-full bg-navy hover:bg-primary text-white font-bold text-[14px] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Get a Free Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ====================================================================
          3. INDUSTRY DIRECTORY (light blue tint, #directory)
      ==================================================================== */}
      <section id="directory" className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-sm">
                ALL INDUSTRIES
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Find <span className="text-primary">Your Industry</span>
              </h2>
            </div>

            {/* Group Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter industries by group"
              className="flex flex-wrap items-center gap-2"
            >
              {(
                [
                  'All',
                  'B2B & Professional',
                  'Consumer & Retail',
                  'Specialized',
                ] as const
              ).map((tab) => {
                const isActive = directoryGroup === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setDirectoryGroup(tab)}
                    className={`px-4 py-2.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white shadow-soft'
                        : 'bg-white text-navy-70 border border-navy-08 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Group Bands (Sticky 25% Group Header Left + 75% 2x2 Industry Cards Right) */}
          <div className="space-y-16">
            {visibleGroups.map((groupInfo) => {
              const GroupIcon = groupInfo.icon;
              const groupIndustries = industries.filter(
                (ind) => ind.group === groupInfo.group
              );

              return (
                <div
                  key={groupInfo.group}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-navy-08 first:border-t-0 first:pt-0"
                >
                  {/* Left 25% (3 cols): Sticky Group Header */}
                  <div className="lg:col-span-3 lg:sticky lg:top-[110px]">
                    <div className="bg-white rounded-[20px] p-6 border border-navy-08 shadow-soft">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-[44px] font-extrabold leading-none select-none tabular-nums"
                          style={{
                            WebkitTextStroke: '2px #0571c2',
                            color: 'transparent',
                          }}
                        >
                          {groupInfo.number}
                        </span>
                        <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
                          <GroupIcon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-[22px] font-extrabold text-navy leading-snug mb-2">
                        {groupInfo.group}
                      </h3>
                      <p className="text-[14px] text-navy-70 leading-relaxed mb-4">
                        {groupInfo.description}
                      </p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary text-[12px] font-bold">
                        {groupIndustries.length} industries
                      </span>
                    </div>
                  </div>

                  {/* Right 75% (9 cols): 2x2 Grid of Industry Cards */}
                  <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {groupIndustries.map((ind) => {
                      const isHighlighted = highlightedSlug === ind.slug;
                      return (
                        <article
                          key={ind.slug}
                          id={ind.slug}
                          className={`scroll-mt-28 group bg-white rounded-[20px] p-5 border transition-all duration-300 flex flex-col justify-between ${
                            isHighlighted
                              ? 'border-primary ring-4 ring-primary/30 shadow-2xl -translate-y-1'
                              : 'border-navy-08 shadow-soft hover:shadow-soft-hover hover:border-primary-100 hover:-translate-y-1.5'
                          }`}
                        >
                          <div>
                            {/* Image on top (16:10, rounded) with navy gradient & overlapping circular icon badge */}
                            <div className="relative mb-7">
                              <div className="aspect-[16/10] rounded-[16px] overflow-hidden bg-navy relative">
                                <Image
                                  src={ind.image}
                                  alt={ind.imageAlt}
                                  loading="lazy"
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
                              </div>

                              {/* Circular White Icon Badge Overlapping Bottom-Left Edge */}
                              <div className="absolute -bottom-5 left-5 w-12 h-12 rounded-full bg-white group-hover:bg-primary text-primary group-hover:text-white border-2 border-primary-100 group-hover:border-primary shadow-md flex items-center justify-center transition-colors duration-300">
                                <IndustryIcon name={ind.icon} className="w-5 h-5" />
                              </div>
                            </div>

                            {/* Industry Name (H3) & Tagline */}
                            <h3 className="text-[21px] font-extrabold text-navy group-hover:text-primary transition-colors mb-1">
                              {ind.name}
                            </h3>
                            <p className="text-[14px] text-navy-70 font-medium mb-4">
                              {ind.tagline}
                            </p>

                            {/* 3 Small Solution Chips (light blue tint) */}
                            <div className="flex flex-wrap gap-1.5 mb-5">
                              {ind.solutions.slice(0, 3).map((sol) => (
                                <span
                                  key={sol}
                                  className="px-2.5 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-bold"
                                >
                                  {sol}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Footer Row */}
                          <div className="pt-3.5 border-t border-navy-08/60 flex items-center justify-between">
                            {ind.slug === 'b2b-saas' ||
                            ind.slug === 'finance-fintech' ||
                            ind.slug === 'interior-design-architecture' ||
                            ind.slug === 'manufacturing-industrial' ||
                            ind.slug === 'ecommerce' ||
                            ind.slug === 'skincare-beauty' ||
                            ind.slug === 'home-decor-furniture' ||
                            ind.slug === 'fashion-lifestyle' ||
                            ind.slug === 'healthcare' ||
                            ind.slug === 'travel-hospitality' ||
                            ind.slug === 'education-edtech' ? (
                              <Link
                                href={ind.futurePagePath}
                                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary group-hover:translate-x-1 transition-transform"
                              >
                                <span>Explore</span>
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleExploreInDeepDive(ind.slug)}
                                data-future-href={ind.futurePagePath}
                                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary group-hover:translate-x-1 transition-transform cursor-pointer"
                              >
                                <span>Explore</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                onOpenQuoteModal(`${ind.name} Project Quote`)
                              }
                              className="text-[12px] font-bold text-navy-50 hover:text-primary transition-colors cursor-pointer"
                            >
                              Request Quote
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. INDUSTRY DEEP DIVE — EXPLORER PANEL (navy, #deep-dive)
      ==================================================================== */}
      <section
        id="deep-dive"
        className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="absolute -right-24 bottom-0 w-[520px] h-[520px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              DEEP DIVE
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight">
              How We Help <span className="text-primary">Each Industry</span>
            </h2>
          </div>

          {/* Mobile Horizontal Scrollable Pill Row */}
          <div
            role="tablist"
            aria-label="Select an industry to inspect"
            className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6"
          >
            {industries.map((ind) => {
              const active = deepDiveSlug === ind.slug;
              return (
                <button
                  key={ind.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setDeepDiveSlug(ind.slug)}
                  className={`px-4 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                    active
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white/10 text-white/75 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <IndustryIcon name={ind.icon} className="w-4 h-4" />
                  <span>{ind.name}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop 12-Col Split: Left Vertical Tab List (4 cols) + Right Large Detail Panel (8 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Grouped Vertical Tab List (Desktop) */}
            <div
              role="tablist"
              aria-label="Industry deep dive navigation"
              className="hidden lg:block lg:col-span-4 bg-white/5 border border-white/10 rounded-[20px] p-4 space-y-5"
            >
              {GROUP_META.map((grp) => (
                <div key={grp.group}>
                  <div className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                    {grp.group}
                  </div>
                  <div className="space-y-1">
                    {industries
                      .filter((ind) => ind.group === grp.group)
                      .map((ind) => {
                        const isActive = deepDiveSlug === ind.slug;
                        return (
                          <button
                            key={ind.slug}
                            type="button"
                            role="tab"
                            id={`tab-${ind.slug}`}
                            aria-selected={isActive}
                            aria-controls={`panel-${ind.slug}`}
                            onClick={() => setDeepDiveSlug(ind.slug)}
                            onKeyDown={(e) => {
                              const currentIndex = industries.findIndex(
                                (item) => item.slug === ind.slug
                              );
                              if (e.key === 'ArrowDown') {
                                e.preventDefault();
                                const next =
                                  industries[(currentIndex + 1) % industries.length];
                                setDeepDiveSlug(next.slug);
                              } else if (e.key === 'ArrowUp') {
                                e.preventDefault();
                                const prev =
                                  industries[
                                    (currentIndex - 1 + industries.length) %
                                      industries.length
                                  ];
                                setDeepDiveSlug(prev.slug);
                              }
                            }}
                            className={`w-full px-3.5 py-2.5 rounded-xl text-left text-[14px] font-bold flex items-center justify-between transition-all cursor-pointer ${
                              isActive
                                ? 'bg-primary text-white shadow-md'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <span className="flex items-center gap-2.5 truncate">
                              <IndustryIcon
                                name={ind.icon}
                                className={`w-4 h-4 shrink-0 ${
                                  isActive ? 'text-white' : 'text-primary'
                                }`}
                              />
                              <span className="truncate">{ind.name}</span>
                            </span>
                            <ChevronRight
                              className={`w-4 h-4 shrink-0 transition-transform ${
                                isActive ? 'translate-x-0.5 text-white' : 'opacity-40'
                              }`}
                            />
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Large Glass Detail Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDeepDiveIndustry.slug}
                  role="tabpanel"
                  id={`panel-${activeDeepDiveIndustry.slug}`}
                  aria-labelledby={`tab-${activeDeepDiveIndustry.slug}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white/5 border border-white/15 rounded-[24px] p-6 sm:p-8 lg:p-10 backdrop-blur-md"
                >
                  {/* Top: Industry Image Banner with Icon Badge, Name & Tagline Overlaid */}
                  <div className="relative rounded-[18px] overflow-hidden aspect-[16/7] bg-navy mb-8 border border-white/10">
                    <Image
                      src={activeDeepDiveIndustry.image}
                      alt={activeDeepDiveIndustry.imageAlt}
                      loading="lazy"
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg border border-white/20">
                          <IndustryIcon
                            name={activeDeepDiveIndustry.icon}
                            className="w-7 h-7"
                          />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-0.5">
                            {activeDeepDiveIndustry.group}
                          </span>
                          <h3 className="text-[24px] sm:text-[30px] font-extrabold text-white leading-tight">
                            {activeDeepDiveIndustry.name}
                          </h3>
                          <p className="text-[14px] sm:text-[15px] text-white/80 font-medium">
                            {activeDeepDiveIndustry.tagline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Two Columns: Your Challenges vs Our Solutions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Left Col: Your Challenges */}
                    <div className="rounded-[18px] bg-white/5 border border-white/10 p-6">
                      <h4 className="text-[15px] font-extrabold uppercase tracking-wider text-white/90 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-white/60" />
                        <span>Your Challenges</span>
                      </h4>
                      <ul className="space-y-3.5">
                        {activeDeepDiveIndustry.challenges.map((chal) => (
                          <li
                            key={chal}
                            className="flex items-start gap-3 text-[15px] text-white/75"
                          >
                            <span className="w-6 h-6 rounded-full bg-white/10 text-white/70 flex items-center justify-center shrink-0 mt-0.5">
                              <X className="w-3.5 h-3.5" />
                            </span>
                            <span>{chal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Col: Our Solutions */}
                    <div className="rounded-[18px] bg-primary/15 border border-primary/35 p-6">
                      <h4 className="text-[15px] font-extrabold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>Our Solutions</span>
                      </h4>
                      <ul className="space-y-3.5">
                        {activeDeepDiveIndustry.solutions.map((sol) => (
                          <li
                            key={sol}
                            className="flex items-start gap-3 text-[15px] font-semibold text-white"
                          >
                            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </span>
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Highlight Stat Chip + Action Buttons */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-primary/20 border border-primary/40 text-[13px] font-bold text-white">
                      <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                      <span>{activeDeepDiveIndustry.highlightStat}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      {(activeDeepDiveIndustry.slug === 'b2b-saas' ||
                        activeDeepDiveIndustry.slug === 'finance-fintech' ||
                        activeDeepDiveIndustry.slug ===
                          'interior-design-architecture' ||
                        activeDeepDiveIndustry.slug ===
                          'manufacturing-industrial' ||
                        activeDeepDiveIndustry.slug === 'ecommerce' ||
                        activeDeepDiveIndustry.slug === 'skincare-beauty' ||
                        activeDeepDiveIndustry.slug ===
                          'home-decor-furniture' ||
                        activeDeepDiveIndustry.slug ===
                          'fashion-lifestyle' ||
                        activeDeepDiveIndustry.slug === 'healthcare' ||
                        activeDeepDiveIndustry.slug ===
                          'travel-hospitality' ||
                        activeDeepDiveIndustry.slug ===
                          'education-edtech') && (
                        <Link
                          href={activeDeepDiveIndustry.futurePagePath}
                          className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary hover:underline mr-2"
                        >
                          <span>
                            View Full {activeDeepDiveIndustry.name} Page
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          onOpenQuoteModal(
                            `${activeDeepDiveIndustry.name} Solution`
                          )
                        }
                        className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-lg"
                      >
                        <span>Get a Free Quote</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <Link
                        href="/our-work"
                        className="px-6 py-3.5 rounded-full border border-white/25 hover:border-white hover:bg-white/10 text-white font-bold text-[14px] transition-colors inline-flex items-center gap-2"
                      >
                        <span>View Our Work</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. SERVICES × INDUSTRIES MATRIX (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              AT A GLANCE
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              The Right Services for{' '}
              <span className="text-primary">Every Industry</span>
            </h2>
            <p className="text-[16px] text-navy-70">
              See which core digital capabilities drive the highest ROI in each vertical.
            </p>
          </div>

          {/* Comparison Matrix Table */}
          <div className="rounded-[20px] border border-navy-08 shadow-soft overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[880px]">
                <thead>
                  <tr className="bg-navy text-white text-[12px] font-bold uppercase tracking-wider">
                    <th
                      scope="col"
                      className="sticky left-0 z-20 bg-navy py-4 px-5 w-[250px] border-r border-white/10"
                    >
                      Industry
                    </th>
                    {MATRIX_COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        scope="col"
                        onMouseEnter={() => setHoveredColKey(col.key)}
                        onMouseLeave={() => setHoveredColKey(null)}
                        className={`py-4 px-3 text-center transition-colors ${
                          hoveredColKey === col.key ? 'bg-primary text-white' : ''
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-08 text-[14px]">
                  {GROUP_META.map((grp) => (
                    <React.Fragment key={grp.group}>
                      {/* Thin Group Label Row */}
                      <tr className="bg-primary-50/80">
                        <th
                           colSpan={MATRIX_COLUMNS.length + 1}
                          scope="colgroup"
                          className="py-2 px-5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary"
                        >
                          {grp.group}
                        </th>
                      </tr>
                      {industries
                        .filter((ind) => ind.group === grp.group)
                        .map((ind) => {
                          const isRowHovered = hoveredRowSlug === ind.slug;
                          return (
                            <tr
                              key={ind.slug}
                              onMouseEnter={() => setHoveredRowSlug(ind.slug)}
                              onMouseLeave={() => setHoveredRowSlug(null)}
                              className={`transition-colors ${
                                isRowHovered ? 'bg-primary-50/70' : 'bg-white'
                              }`}
                            >
                              <th
                                scope="row"
                                className={`sticky left-0 z-10 py-3.5 px-5 font-bold text-navy border-r border-navy-08 transition-colors ${
                                  isRowHovered ? 'bg-primary-50 text-primary' : 'bg-white'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => handleExploreInDeepDive(ind.slug)}
                                  className="inline-flex items-center gap-2.5 text-left hover:text-primary cursor-pointer"
                                >
                                  <IndustryIcon
                                    name={ind.icon}
                                    className="w-4 h-4 text-primary shrink-0"
                                  />
                                  <span>{ind.name}</span>
                                </button>
                              </th>

                              {MATRIX_COLUMNS.map((col) => {
                                const status = getMatrixStatus(ind, col.key);
                                const isColHovered = hoveredColKey === col.key;
                                return (
                                  <td
                                    key={col.key}
                                    onMouseEnter={() => setHoveredColKey(col.key)}
                                    onMouseLeave={() => setHoveredColKey(null)}
                                    className={`py-3.5 px-3 text-center transition-colors ${
                                      isColHovered ? 'bg-primary-50/50' : ''
                                    }`}
                                  >
                                    {status === 'core' && (
                                      <span
                                        title="Core recommendation"
                                        aria-label="Core recommendation"
                                        className="inline-block w-3.5 h-3.5 rounded-full bg-primary shadow-sm"
                                      />
                                    )}
                                    {status === 'often' && (
                                      <span
                                        title="Often used"
                                        aria-label="Often used"
                                        className="inline-block w-3.5 h-3.5 rounded-full border-2 border-primary bg-primary-50"
                                      />
                                    )}
                                    {status === 'empty' && (
                                      <span
                                        aria-label="Not typical"
                                        className="inline-block w-1.5 h-1.5 rounded-full bg-navy-15"
                                      />
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Matrix Legend */}
            <div className="px-6 py-4 bg-primary-50/40 border-t border-navy-08 flex flex-wrap items-center justify-between gap-4 text-[13px] font-semibold text-navy-70">
              <div className="flex flex-wrap items-center gap-6">
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-primary inline-block" />
                  <span>Core recommendation</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-primary bg-primary-50 inline-block" />
                  <span>Often used</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-navy-15 inline-block" />
                  <span>Optional / Custom</span>
                </span>
              </div>
              <span className="text-[12px] text-navy-50">
                Click any industry row to inspect its full blueprint above
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. COMMON CHALLENGES WE SOLVE (light blue tint — 3x2 flip cards)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-sm">
              PROBLEMS WE SOLVE
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              Different Industries,{' '}
              <span className="text-primary">Same Big Problems</span>
            </h2>
            <p className="text-[16px] text-navy-70">
              Hover or tap any card to see how WebXCode turns common bottlenecks into
              measurable growth.
            </p>
          </div>

          {/* 3x2 Grid of Interactive Flip Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMON_CHALLENGES_CARDS.map((card) => {
              const IconComp = card.icon;
              const isFlipped = Boolean(flippedCardIds[card.id]);
              return (
                <div
                  key={card.id}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isFlipped}
                  aria-label={`${card.problem} — ${card.solution}`}
                  onClick={() => toggleFlipCard(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlipCard(card.id);
                    }
                  }}
                  className="group relative h-[240px] rounded-[20px] cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/30"
                >
                  {/* Front Face (white) */}
                  <div
                    className={`absolute inset-0 rounded-[20px] bg-white p-7 border border-navy-08 shadow-soft flex flex-col justify-between transition-all duration-300 ${
                      isFlipped
                        ? 'opacity-0 pointer-events-none scale-95'
                        : 'opacity-100 group-hover:opacity-0 group-hover:pointer-events-none group-hover:scale-95'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-navy-50">
                        Hover / Tap to Flip
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1">
                        THE BOTTLENECK
                      </span>
                      <h3 className="text-[22px] font-extrabold text-navy leading-snug">
                        &ldquo;{card.problem}&rdquo;
                      </h3>
                    </div>
                  </div>

                  {/* Back Face (solid #0571c2, white text) */}
                  <div
                    className={`absolute inset-0 rounded-[20px] bg-primary text-white p-7 shadow-soft-hover flex flex-col justify-between transition-all duration-300 ${
                      isFlipped
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 pointer-events-none scale-95 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100'
                    }`}
                  >
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider mb-2.5">
                        HOW WEBXCODE SOLVES IT
                      </span>
                      <p className="text-[15px] text-white leading-relaxed font-medium">
                        {card.solution}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenQuoteModal(`Challenge: ${card.problem}`);
                        }}
                        className="inline-flex items-center gap-1.5 text-[14px] font-bold text-white hover:underline cursor-pointer"
                      >
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <Check className="w-5 h-5 text-white/80" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. OUR INDUSTRY-FIRST APPROACH (white — 4 horizontal expanding panels)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              OUR APPROACH
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Why Industry Knowledge <span className="text-primary">Matters</span>
            </h2>
          </div>

          {/* Desktop Horizontal Expanding Accordion Columns + Mobile Vertical Accordion */}
          <div className="flex flex-col lg:flex-row gap-4 lg:h-[420px]">
            {APPROACH_PANELS.map((panel, idx) => {
              const isOpen = openApproachIdx === idx;
              const PanelIcon = panel.icon;

              return (
                <div
                  key={panel.num}
                  onMouseEnter={() => setOpenApproachIdx(idx)}
                  onClick={() => setOpenApproachIdx(idx)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenApproachIdx(idx);
                    }
                  }}
                  className={`rounded-[24px] transition-all duration-500 overflow-hidden cursor-pointer relative ${
                    isOpen
                      ? 'lg:flex-[3.2] bg-navy text-white p-7 sm:p-9 shadow-2xl'
                      : 'lg:flex-[0.85] bg-primary-50 hover:bg-primary-100/70 text-navy p-6 border border-primary-100'
                  }`}
                >
                  {isOpen ? (
                    /* Expanded Panel Content (navy with blue glow) */
                    <div className="h-full flex flex-col justify-between relative z-10">
                      <div className="absolute -right-16 -top-16 w-64 h-64 blue-glow-strong pointer-events-none" />

                      <div className="flex items-center justify-between gap-4 mb-6">
                        <span className="text-[44px] sm:text-[54px] font-extrabold text-primary leading-none tabular-nums">
                          {panel.num}
                        </span>
                        <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center">
                          <PanelIcon className="w-6 h-6" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-[24px] sm:text-[28px] font-extrabold text-white mb-2">
                          {panel.title}
                        </h3>
                        <p className="text-[16px] font-bold text-primary mb-3">
                          {panel.shortText}
                        </p>
                        <p className="text-[15px] text-white/75 leading-relaxed max-w-xl mb-6">
                          {panel.detailText}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {panel.deliverables.map((del) => (
                            <span
                              key={del}
                              className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[12px] font-semibold text-white/90"
                            >
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Collapsed Strip Content (light blue tint, rotated title on desktop) */
                    <div className="h-full flex lg:flex-col items-center justify-between gap-4">
                      <span className="text-[24px] font-extrabold text-primary tabular-nums">
                        {panel.num}
                      </span>

                      <div className="flex-1 lg:flex lg:items-center lg:justify-center">
                        <h3 className="text-[18px] font-extrabold text-navy lg:[writing-mode:vertical-rl] lg:rotate-180 whitespace-nowrap">
                          {panel.title}
                        </h3>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-sm shrink-0">
                        <PanelIcon className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. INDUSTRY RESULTS SLIDER (navy — single-slide large carousel)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                RESULTS
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight">
                Real Results Across <span className="text-primary">Industries</span>
              </h2>
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                aria-label="Previous industry result"
                onClick={() =>
                  setResultSlideIdx(
                    (prev) =>
                      (prev - 1 + INDUSTRY_RESULTS_SLIDES.length) %
                      INDUSTRY_RESULTS_SLIDES.length
                  )
                }
                className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-primary hover:border-primary text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Next industry result"
                onClick={() =>
                  setResultSlideIdx(
                    (prev) => (prev + 1) % INDUSTRY_RESULTS_SLIDES.length
                  )
                }
                className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-primary hover:border-primary text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Single-Slide Large Carousel Card */}
          <AnimatePresence mode="wait">
            {(() => {
              const slide = INDUSTRY_RESULTS_SLIDES[resultSlideIdx];
              return (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-[24px] bg-white/5 border border-white/15 p-8 sm:p-12 lg:p-14 backdrop-blur-md"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left (5 cols): Big Result Number + Label */}
                    <div className="lg:col-span-5 lg:border-r border-white/15 lg:pr-10">
                      <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-primary text-white text-[12px] font-bold uppercase tracking-wider mb-4">
                        {slide.industry}
                      </span>
                      <div className="text-[56px] sm:text-[72px] font-extrabold text-primary leading-none tabular-nums mb-3">
                        {slide.stat}
                      </div>
                      <p className="text-[18px] sm:text-[20px] font-bold text-white leading-snug">
                        {slide.statLabel}
                      </p>
                    </div>

                    {/* Right (7 cols): Client Quote + Name + Company + Industry Tag Pill */}
                    <div className="lg:col-span-7 space-y-6">
                      <Quote className="w-10 h-10 text-primary opacity-60" />
                      <blockquote className="text-[18px] sm:text-[22px] text-white/90 font-medium leading-relaxed italic">
                        &ldquo;{slide.quote}&rdquo;
                      </blockquote>
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <div>
                          <div className="text-[16px] font-extrabold text-white">
                            {slide.clientName}
                          </div>
                          <div className="text-[13px] text-white/65 font-medium">
                            {slide.clientRole}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleExploreInDeepDive(slide.industrySlug)}
                          className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-primary text-white text-[12px] font-bold transition-colors cursor-pointer"
                        >
                          Explore {slide.industry} →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Slide Dots */}
          <div className="mt-7 flex items-center justify-center gap-2.5">
            {INDUSTRY_RESULTS_SLIDES.map((s, i) => {
              const active = i === resultSlideIdx;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}: ${s.industry}`}
                  onClick={() => setResultSlideIdx(i)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    active ? 'w-8 bg-primary' : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. INDUSTRY FAQ (white — split layout)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left (5 cols): Heading + Small Navy Card */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                FAQ
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-4">
                Industry <span className="text-primary">Questions</span>
              </h2>
              <p className="text-[16px] text-navy-70 leading-relaxed mb-8">
                Everything you need to know about how we tailor websites, SEO, and AI
                solutions to your specific sector.
              </p>

              {/* Small Navy Card: Talk to an industry specialist */}
              <div className="rounded-[20px] bg-navy text-white p-7 relative overflow-hidden shadow-soft">
                <div className="absolute -right-10 -top-10 w-40 h-40 blue-glow pointer-events-none" />
                <div className="relative z-10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1.5">
                    DIRECT SPECIALIST ACCESS
                  </span>
                  <h3 className="text-[20px] font-extrabold text-white mb-2">
                    Talk to an industry specialist
                  </h3>
                  <p className="text-[14px] text-white/75 leading-relaxed mb-5">
                    Share your business model and goals—we&apos;ll prepare a custom
                    roadmap and relevant industry references.
                  </p>
                  <Link
                    href="/contact"
                    className="px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-colors inline-flex items-center gap-2"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right (7 cols): 5-Question Accordion */}
            <div className="lg:col-span-7 space-y-4">
              {INDUSTRY_FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={faq.question}
                    className={`rounded-[20px] border transition-all overflow-hidden ${
                      isOpen
                        ? 'border-navy-15 border-l-4 border-l-primary bg-white shadow-soft'
                        : 'border-navy-08 bg-white hover:border-primary-100'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <h3
                        className={`text-[17px] sm:text-[18px] font-bold leading-snug ${
                          isOpen ? 'text-primary' : 'text-navy'
                        }`}
                      >
                        {faq.question}
                      </h3>
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-[15px] text-navy-70 leading-[1.75] border-t border-navy-08/60">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. FINAL CTA — "DON'T SEE YOUR INDUSTRY?" (primary-50 -> navy rounded container)
      ==================================================================== */}
      <section className="bg-primary-50 py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-[28px] bg-navy text-white px-6 py-14 sm:p-16 lg:p-20 overflow-hidden shadow-2xl text-center">
            {/* Blue Glows */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] blue-glow-strong pointer-events-none" />

            {/* Soft Ring of Faint Industry Icons Floating Around the Edges */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute inset-0 pointer-events-none"
            >
              {[
                { icon: 'Laptop' as IndustryIconName, pos: 'top-8 left-12' },
                { icon: 'Landmark' as IndustryIconName, pos: 'top-10 right-16' },
                { icon: 'HeartPulse' as IndustryIconName, pos: 'top-1/2 left-8 -translate-y-1/2' },
                { icon: 'ShoppingBag' as IndustryIconName, pos: 'top-1/2 right-8 -translate-y-1/2' },
                { icon: 'Car' as IndustryIconName, pos: 'bottom-8 left-16' },
                { icon: 'GraduationCap' as IndustryIconName, pos: 'bottom-10 right-12' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`absolute ${item.pos} w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-primary/40 flex items-center justify-center`}
                >
                  <IndustryIcon name={item.icon} className="w-6 h-6" />
                </div>
              ))}
            </div>

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                ANY INDUSTRY
              </span>
              <h2 className="text-[30px] sm:text-[40px] lg:text-[46px] font-extrabold text-white leading-[1.12] tracking-tight mb-4">
                Don&apos;t See Your Industry?{' '}
                <span className="text-primary">We Adapt to Any Category.</span>
              </h2>
              <p className="text-[17px] sm:text-[19px] text-white/75 leading-relaxed mb-8">
                Tell us about your business and we&apos;ll build a solution that fits.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal('Custom Category Inquiry')}
                  className="px-8 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full border border-white/25 hover:border-white hover:bg-white/10 text-white font-bold text-[15px] transition-all inline-flex items-center gap-2"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Industries;
