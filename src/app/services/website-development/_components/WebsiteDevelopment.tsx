'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  Globe,
  Code2,
  Cpu,
  ShoppingCart,
  Layers,
  ShieldCheck,
  Search,
  Sparkles,
  Bot,
  TrendingUp,
  Target,
  Activity,
  BarChart3,
  Award,
  Zap,
  Clock,
  Sliders,
  Plus,
  Minus,
  CheckCircle2,
  Building2,
  Laptop,
  Smartphone,
  Terminal,
  Rocket,
  GitBranch,
  GitCommit,
  GitMerge,
  Eye,
  Lock,
  FileText,
  Phone,
  Database,
  Headphones,
  LayoutDashboard,
  Languages,
  Briefcase,
  UserCheck,
  Settings,
  Gauge,
  ExternalLink,
} from 'lucide-react';
import { services, ServiceIcon } from '@/app/services/_components/Services';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT WEBSITE-DEVELOPMENT ITEM FROM ../Services
============================================================================ */
const websiteDevService =
  services.find((item) => item.slug === 'website-development') || services[0];

/* ============================================================================
   IMAGE ASSETS (From existing repository assets)
============================================================================ */
const IMG_HERO_SHOWCASE = '/images/hero_laptop_ui_showcase_1791104898778.jpg';
const IMG_FINTECH_SAAS = '/images/project_fintech_saas_ui_1791104929193.jpg';
const IMG_LUXURY_ECOM = '/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const IMG_AI_ENTERPRISE = '/images/project_ai_enterprise_ui_1791104952051.jpg';
const IMG_TEAM_OFFICE = '/images/why_webxcode_team_office_1791104914357.jpg';

/* ============================================================================
   PAGE CONTENT DATA ARRAYS (Top of file — single source of truth)
============================================================================ */

/* Section 1: Hero Code Editor Lines (strictly blue/white/navy syntax tints) */
interface CodeLineItem {
  lineNum: number;
  indent: number;
  tokens: { text: string; tone: 'keyword' | 'tag' | 'prop' | 'string' | 'plain' }[];
}

const HERO_CODE_LINES: CodeLineItem[] = [
  {
    lineNum: 1,
    indent: 0,
    tokens: [
      { text: 'export default function ', tone: 'keyword' },
      { text: 'HeroSection', tone: 'tag' },
      { text: '() {', tone: 'plain' },
    ],
  },
  {
    lineNum: 2,
    indent: 1,
    tokens: [
      { text: 'return (', tone: 'keyword' },
    ],
  },
  {
    lineNum: 3,
    indent: 2,
    tokens: [
      { text: '<section ', tone: 'tag' },
      { text: 'className', tone: 'prop' },
      { text: '=', tone: 'plain' },
      { text: '"bg-navy text-white py-20"', tone: 'string' },
      { text: '>', tone: 'tag' },
    ],
  },
  {
    lineNum: 4,
    indent: 3,
    tokens: [
      { text: '<Badge ', tone: 'tag' },
      { text: 'variant', tone: 'prop' },
      { text: '=', tone: 'plain' },
      { text: '"primary"', tone: 'string' },
      { text: '>Next.js 14 + SEO</Badge>', tone: 'tag' },
    ],
  },
  {
    lineNum: 5,
    indent: 3,
    tokens: [
      { text: '<h1 ', tone: 'tag' },
      { text: 'className', tone: 'prop' },
      { text: '=', tone: 'plain' },
      { text: '"font-extrabold tracking-tight"', tone: 'string' },
      { text: '>', tone: 'tag' },
    ],
  },
  {
    lineNum: 6,
    indent: 4,
    tokens: [
      { text: 'Engineered to Convert & Scale', tone: 'plain' },
    ],
  },
  {
    lineNum: 7,
    indent: 3,
    tokens: [
      { text: '</h1>', tone: 'tag' },
    ],
  },
  {
    lineNum: 8,
    indent: 3,
    tokens: [
      { text: '<ShowcasePreview ', tone: 'tag' },
      { text: 'cwvScore', tone: 'prop' },
      { text: '={', tone: 'plain' },
      { text: '98', tone: 'keyword' },
      { text: '} />', tone: 'tag' },
    ],
  },
  {
    lineNum: 9,
    indent: 3,
    tokens: [
      { text: '<Button ', tone: 'tag' },
      { text: 'cta', tone: 'prop' },
      { text: '=', tone: 'plain' },
      { text: '"Get Started →"', tone: 'string' },
      { text: ' />', tone: 'tag' },
    ],
  },
  {
    lineNum: 10,
    indent: 2,
    tokens: [
      { text: '</section>', tone: 'tag' },
    ],
  },
  {
    lineNum: 11,
    indent: 1,
    tokens: [
      { text: ');', tone: 'plain' },
    ],
  },
  {
    lineNum: 12,
    indent: 0,
    tokens: [
      { text: '}', tone: 'plain' },
    ],
  },
];

/* Section 2: Quick Facts Strip (5 compact facts) */
const QUICK_FACTS = [
  {
    icon: Clock,
    value: '4–8 weeks',
    label: 'Typical launch',
  },
  {
    icon: Gauge,
    value: '90+',
    label: 'PageSpeed target',
  },
  {
    icon: Smartphone,
    value: '100%',
    label: 'Mobile-first',
  },
  {
    icon: Search,
    value: 'SEO-ready',
    label: 'From day one',
  },
  {
    icon: Code2,
    value: 'You own',
    label: 'The code & content',
  },
];

/* Section 3: Websites We Build — Type Switcher (6 tabs) */
interface WebsiteTypeItem {
  id: string;
  name: string;
  oneLine: string;
  urlPreview: string;
  idealFor: [string, string, string];
  keyFeatures: [string, string, string];
  mockupHeadline: string;
  mockupSub: string;
  mockupMetricLabel: string;
  mockupMetricValue: string;
}

const WEBSITE_TYPES: WebsiteTypeItem[] = [
  {
    id: 'corporate',
    name: 'Corporate & Business Websites',
    oneLine: 'Build credibility and generate enquiries',
    urlPreview: 'https://enterprise-group.com',
    idealFor: ['B2B Enterprises', 'Service & Consulting Firms', 'Growing SMBs'],
    keyFeatures: [
      'Multi-page service & solution architecture with clear conversion paths',
      'Trust signals, case study showcases & executive team profiles',
      'CRM-connected enquiry forms with instant lead routing',
    ],
    mockupHeadline: 'Global Infrastructure for Modern Enterprises',
    mockupSub: 'Trusted by 200+ institutional clients across 14 countries.',
    mockupMetricLabel: 'Qualified Inbound RFQs',
    mockupMetricValue: '+185%',
  },
  {
    id: 'landing',
    name: 'Landing Pages',
    oneLine: 'Focused pages for campaigns and ads',
    urlPreview: 'https://try.brand.io/launch-offer',
    idealFor: ['Google & Meta Ad Campaigns', 'Product Launches', 'Webinar & Demo Funnels'],
    keyFeatures: [
      'Single-goal distraction-free layout engineered for high ROAS',
      'Sub-1.5s load time to maximize ad Quality Score & lower CPC',
      'Built-in A/B testing hooks, social proof blocks & sticky CTAs',
    ],
    mockupHeadline: 'Book Your Live Product Walkthrough in 30 Seconds',
    mockupSub: 'Zero fluff. Message-matched to your exact paid search & social campaigns.',
    mockupMetricLabel: 'Ad Conversion Lift',
    mockupMetricValue: '3.4×',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Websites',
    oneLine: 'Online stores with secure checkout',
    urlPreview: 'https://store.luminaretail.com',
    idealFor: ['D2C Consumer Brands', 'Fashion & Lifestyle Labels', 'Multi-SKU Retailers'],
    keyFeatures: [
      'High-speed collection filters, variant swatches & size guides',
      'Slide-out cart drawer with upsells, bundles & free-shipping meter',
      'Razorpay, Stripe, UPI & shipping/inventory ERP synchronization',
    ],
    mockupHeadline: 'Autumn / Winter Studio Collection — Now Live',
    mockupSub: 'Instant variant switching, 1-click checkout and automated cart recovery.',
    mockupMetricLabel: 'Checkout Completion',
    mockupMetricValue: '+140%',
  },
  {
    id: 'portfolio',
    name: 'Portfolio & Personal Brand Sites',
    oneLine: 'Show your work beautifully',
    urlPreview: 'https://atelier-studio.design',
    idealFor: ['Architects & Interior Studios', 'Agencies & Creators', 'Founders & Consultants'],
    keyFeatures: [
      'Editorial high-resolution project galleries with smooth lazy loading',
      'Filterable case studies by category, location or project scale',
      'Integrated consultation booking calendar & press kit downloads',
    ],
    mockupHeadline: 'Selected Architectural Works & Spatial Identities',
    mockupSub: 'Curated visual storytelling that wins high-ticket client mandates.',
    mockupMetricLabel: 'Consultation Bookings',
    mockupMetricValue: '+210%',
  },
  {
    id: 'portals',
    name: 'Web Portals & Dashboards',
    oneLine: 'Logins, user areas and data views',
    urlPreview: 'https://portal.finpulse.app/dashboard',
    idealFor: ['SaaS Products', 'Client & Partner Portals', 'Healthcare & EdTech Platforms'],
    keyFeatures: [
      'Role-based authentication, secure member areas & document vaults',
      'Interactive data tables, real-time charts & status tracking',
      'REST / GraphQL API integrations with your backend or ERP',
    ],
    mockupHeadline: 'Welcome Back — Live Portfolio & Operations Console',
    mockupSub: 'Secure multi-role access, real-time telemetry and self-serve workflows.',
    mockupMetricLabel: 'Support Ticket Drop',
    mockupMetricValue: '−64%',
  },
  {
    id: 'multilingual',
    name: 'Multilingual & Multi-Region Sites',
    oneLine: 'For international audiences',
    urlPreview: 'https://global-brand.com/en-us/',
    idealFor: ['Exporters & Manufacturers', 'Global SaaS & Travel Brands', 'Multi-Country Enterprises'],
    keyFeatures: [
      'Automatic geo-routing, language switcher & RTL layout support',
      'International hreflang SEO tags for US, UK, UAE, EU & India rankings',
      'Region-specific pricing, currencies, compliance & local contact routing',
    ],
    mockupHeadline: 'One Global Brand. Localized for Every Market.',
    mockupSub: 'Seamless EN / DE / AR / HI switching with regional SEO & currency support.',
    mockupMetricLabel: 'International Traffic',
    mockupMetricValue: '+260%',
  },
];

/* Section 4: Which Technology Is Right? — Priority Balancer */
interface PriorityWeights {
  speed: number;
  editing: number;
  commerce: number;
  budget: number;
}

interface TechStackOption {
  id: string;
  name: string;
  codeTag: string;
  bestFor: string;
  pros: [string, string, string];
  scores: {
    speed: number; // out of 5
    editing: number; // out of 5
    commerce: number; // out of 5
    budget: number; // out of 5
  };
}

const TECH_STACK_OPTIONS: TechStackOption[] = [
  {
    id: 'nextjs-react',
    name: 'Next.js / React (Custom)',
    codeTag: 'NEXT.JS 14 • TYPESCRIPT',
    bestFor: 'High-growth brands, B2B SaaS, custom web apps & maximum Core Web Vitals speed.',
    pros: [
      'Blazing sub-second page transitions & 95–100 Lighthouse scores',
      'Zero plugin bloat, custom animations & enterprise-grade security',
      'Pairs with headless CMS (Sanity/Strapi) so marketing can still edit copy',
    ],
    scores: {
      speed: 5.0,
      editing: 3.8,
      commerce: 4.2,
      budget: 3.0,
    },
  },
  {
    id: 'wordpress',
    name: 'WordPress (Custom Theme)',
    codeTag: 'WORDPRESS 6 • CUSTOM BLOCKS',
    bestFor: 'Content-heavy corporate websites, blogs, service businesses & fast marketing edits.',
    pros: [
      'Familiar visual editor — your team can publish pages & blogs in minutes',
      'Lightweight custom-coded theme (no slow multipurpose template bloat)',
      'Lower upfront build cost with full SEO control & schema plugins',
    ],
    scores: {
      speed: 3.9,
      editing: 5.0,
      commerce: 3.5,
      budget: 4.8,
    },
  },
  {
    id: 'shopify',
    name: 'Shopify / Shopify Plus',
    codeTag: 'SHOPIFY 2.0 • LIQUID / HEADLESS',
    bestFor: 'D2C e-commerce brands, multi-SKU retail catalogs & fast checkout conversion.',
    pros: [
      'World-class checkout, inventory, orders, tax & payment gateway engine',
      'Custom Online Store 2.0 sections for lookbooks, bundles & upsells',
      'Built-in hosting, PCI security & 1-click marketing app ecosystem',
    ],
    scores: {
      speed: 4.3,
      editing: 4.6,
      commerce: 5.0,
      budget: 3.9,
    },
  },
];

/* Section 5: Speed That Converts — Performance Gauges (Illustrative Placeholders) */
interface GaugeMetricItem {
  id: string;
  label: string;
  typicalScore: number;
  webxcodeScore: number;
  detail: string;
}

const PERFORMANCE_GAUGES: GaugeMetricItem[] = [
  {
    id: 'performance',
    label: 'Performance',
    typicalScore: 42,
    webxcodeScore: 98,
    detail: 'Sub-2s Largest Contentful Paint & zero render-blocking scripts',
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    typicalScore: 68,
    webxcodeScore: 100,
    detail: 'WCAG AA contrast, semantic landmarks & full keyboard navigation',
  },
  {
    id: 'best-practices',
    label: 'Best Practices',
    typicalScore: 71,
    webxcodeScore: 100,
    detail: 'Modern HTTPS/SSL, clean console, optimized WebP/AVIF media',
  },
  {
    id: 'seo',
    label: 'SEO',
    typicalScore: 74,
    webxcodeScore: 100,
    detail: 'Indexable structure, meta tags, canonicals & JSON-LD schema',
  },
];

/* Section 6: Every Website Includes — Build Configuration Panel (12 features) */
interface ConfigFeatureItem {
  id: string;
  keyName: string;
  title: string;
  description: string;
}

const INCLUDED_CONFIG_FEATURES: ConfigFeatureItem[] = [
  {
    id: 'feat-1',
    keyName: 'responsive.mobileFirst',
    title: 'Mobile-First Responsive Design',
    description: 'Pixel-perfect layouts across 375px phones, tablets, laptops & 4K monitors.',
  },
  {
    id: 'feat-2',
    keyName: 'seo.onPageAndSchema',
    title: 'On-Page SEO & Schema Markup',
    description: 'Clean URLs, meta titles/descriptions, XML sitemap & JSON-LD structured data.',
  },
  {
    id: 'feat-3',
    keyName: 'perf.coreWebVitals',
    title: 'Speed Optimization (Core Web Vitals)',
    description: 'Code splitting, asset compression & caching tuned for 90+ PageSpeed scores.',
  },
  {
    id: 'feat-4',
    keyName: 'security.sslHardening',
    title: 'SSL & Security Hardening',
    description: 'HTTPS encryption, firewall headers, bot/spam protection & secure forms.',
  },
  {
    id: 'feat-5',
    keyName: 'cms.visualEditor',
    title: 'Easy-to-Use CMS',
    description: 'Update text, images, case studies & blog posts without touching a line of code.',
  },
  {
    id: 'feat-6',
    keyName: 'leads.captureForms',
    title: 'Contact & Lead Forms',
    description: 'Validated multi-step or instant quote forms synced to your email & CRM.',
  },
  {
    id: 'feat-7',
    keyName: 'analytics.ga4AndGsc',
    title: 'Google Analytics 4 & Search Console Setup',
    description: 'Full event tracking for button clicks, form submissions & organic search queries.',
  },
  {
    id: 'feat-8',
    keyName: 'connect.whatsappAndCall',
    title: 'WhatsApp & Click-to-Call Integration',
    description: 'Instant 1-tap WhatsApp chat and phone triggers for mobile visitors.',
  },
  {
    id: 'feat-9',
    keyName: 'a11y.wcagCompliance',
    title: 'Accessibility Best Practices',
    description: 'Screen-reader labels, focus rings, alt attributes & keyboard support.',
  },
  {
    id: 'feat-10',
    keyName: 'legal.privacyAndTerms',
    title: 'Basic Legal Pages (Privacy, Terms)',
    description: 'Formatted Privacy Policy, Terms & Conditions and cookie banner templates.',
  },
  {
    id: 'feat-11',
    keyName: 'ops.automatedBackups',
    title: 'Automated Backups',
    description: 'Scheduled off-site cloud backups and 1-click rollback protection.',
  },
  {
    id: 'feat-12',
    keyName: 'sla.postLaunchSupport',
    title: 'Post-Launch Support (Free for 30 days)',
    description: '30-day warranty window for bug fixes, team training & smooth handover.',
  },
];

/* Section 7: Our Process — Git Commit Timeline (6 commits) */
interface GitCommitStep {
  hash: string;
  message: string;
  week: string;
  description: string;
  deliverables: [string, string, string];
  isRelease?: boolean;
  hasClientFeedbackBranchAfter?: boolean;
}

const GIT_PROCESS_COMMITS: GitCommitStep[] = [
  {
    hash: 'a1f9c2e',
    message: 'feat: discovery & strategy',
    week: 'Week 1',
    description:
      'We audit your current website, analyze top competitors, clarify your target buyer personas, and map a conversion-first sitemap.',
    deliverables: ['Goals & KPI Brief', 'Competitor Teardown', 'Approved Sitemap'],
  },
  {
    hash: 'b4d8e10',
    message: 'feat: content & wireframes',
    week: 'Week 1–2',
    description:
      'We structure every page layout and conversion hierarchy with interactive low-fidelity wireframes and persuasive headline architecture.',
    deliverables: ['Page Wireframes', 'Content & Copy Plan', 'Conversion Funnel Map'],
  },
  {
    hash: 'c7a2f55',
    message: 'feat: ui design',
    week: 'Week 2–3',
    description:
      'Our senior designers craft bespoke desktop and mobile interfaces in Figma—complete with typography, color tokens, and 2 revision rounds.',
    deliverables: ['Desktop & Mobile Figma UI', 'Component Design System', '2 Revision Rounds'],
    hasClientFeedbackBranchAfter: true,
  },
  {
    hash: 'd9e3b81',
    message: 'feat: development & cms',
    week: 'Week 3–6',
    description:
      'We turn approved designs into clean, modular production code on Next.js, WordPress, or Shopify and wire up your CMS and CRM integrations.',
    deliverables: ['Clean Frontend & CMS Build', 'Lead Forms & CRM Sync', 'Live Staging URL'],
  },
  {
    hash: 'e2c6a94',
    message: 'test: qa, speed & seo',
    week: 'Week 6–7',
    description:
      'Rigorous testing across iOS, Android, Safari, Chrome, and Edge alongside Core Web Vitals speed tuning and on-page SEO/schema setup.',
    deliverables: ['Cross-Device QA Pass', '90+ PageSpeed Tuning', 'On-Page SEO & Schema'],
  },
  {
    hash: 'f8b1d07',
    message: 'release: launch',
    week: 'Week 7–8',
    description:
      'Zero-downtime deployment to your production domain, SSL verification, GA4/Search Console connection, 1-on-1 editor training, and 30-day support.',
    deliverables: ['Zero-Downtime Go-Live', 'GA4 & GSC Verification', 'Team Training & Handover'],
    isRelease: true,
  },
];

/* Section 8: Packages & Expandable Comparison Table (Placeholders) */
interface WebsitePackageItem {
  id: string;
  name: string;
  badge?: string;
  featured?: boolean;
  subtitle: string;
  priceText: string;
  timelineText: string;
  features: string[];
}

const WEBSITE_PACKAGES: WebsitePackageItem[] = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'For startups and local businesses launching a credible, lead-ready web presence.',
    priceText: 'Starting from ₹45,000 / $690 (placeholder)',
    timelineText: 'Typical timeline: 2–3 weeks',
    features: [
      'Up to 5 custom-designed pages',
      'Mobile-first responsive design',
      'Basic on-page SEO & XML sitemap',
      'Validated contact & lead capture form',
      'WhatsApp & click-to-call button',
      'Google Analytics 4 & SSL setup',
      '14-day post-launch support',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    badge: 'MOST POPULAR',
    featured: true,
    subtitle: 'For growing brands and B2B companies that need custom UX, CMS control, and high SEO velocity.',
    priceText: 'Starting from ₹95,000 / $1,490 (placeholder)',
    timelineText: 'Typical timeline: 4–6 weeks',
    features: [
      'Up to 15 bespoke pages + reusable sections',
      'Custom UI/UX design in Figma (2 revision rounds)',
      'Easy-to-edit CMS + dynamic Blog / Resource hub',
      'Advanced technical SEO & JSON-LD Schema markup',
      '90+ PageSpeed & Core Web Vitals optimization',
      'CRM, calendar booking & newsletter integrations',
      '30-day priority post-launch support & training',
    ],
  },
  {
    id: 'enterprise',
    name: 'Custom / Enterprise',
    subtitle: 'For high-scale organizations needing custom web portals, headless commerce, or global sites.',
    priceText: 'Custom pricing (scoped to requirements)',
    timelineText: 'Typical timeline: 6–10 weeks',
    features: [
      'Unlimited pages & custom design system library',
      'Web app features, portals, logins & dashboards',
      'Multilingual & multi-region geo-routing setup',
      'Custom REST/GraphQL API, ERP & payment sync',
      'Dedicated engineering pod & Slack channel',
      'Automated staging, CI/CD & security hardening',
      '60-day post-launch warranty & SLA options',
    ],
  },
];

interface PackageComparisonRow {
  feature: string;
  starter: string | boolean;
  business: string | boolean;
  enterprise: string | boolean;
}

const PACKAGE_COMPARISON_ROWS: PackageComparisonRow[] = [
  { feature: 'Number of Pages', starter: 'Up to 5 pages', business: 'Up to 15 pages', enterprise: 'Unlimited' },
  { feature: 'Custom UI/UX Design in Figma', starter: 'Standard layout', business: true, enterprise: true },
  { feature: 'Mobile-First Responsive Build', starter: true, business: true, enterprise: true },
  { feature: 'Content Management System (CMS)', starter: true, business: true, enterprise: 'Custom / Headless' },
  { feature: 'Blog / Case Studies Module', starter: false, business: true, enterprise: true },
  { feature: 'On-Page SEO & Meta Tags', starter: true, business: true, enterprise: true },
  { feature: 'JSON-LD Schema & Rich Snippets', starter: false, business: true, enterprise: true },
  { feature: 'Core Web Vitals Speed Tuning (90+)', starter: true, business: true, enterprise: true },
  { feature: 'CRM / HubSpot / Zoho Integration', starter: false, business: true, enterprise: true },
  { feature: 'Multilingual / Multi-Currency', starter: false, business: 'Optional add-on', enterprise: true },
  { feature: 'Custom Portals / User Logins', starter: false, business: false, enterprise: true },
  { feature: 'Post-Launch Free Support Window', starter: '14 Days', business: '30 Days', enterprise: '60 Days' },
];

/* Section 9: Websites We've Built — Device Stage Portfolio (5 placeholder projects) */
interface PortfolioShowcaseItem {
  id: string;
  name: string;
  industryTag: string;
  stackTag: string;
  url: string;
  image: string;
  imageAlt: string;
  summary: string;
  results: [string, string];
}

const PORTFOLIO_PROJECTS: PortfolioShowcaseItem[] = [
  {
    id: 'finpulse',
    name: 'FinPulse Wealth & SaaS Marketing Platform',
    industryTag: 'Finance & Fintech',
    stackTag: 'Next.js 14 + TypeScript',
    url: 'https://finpulse-global.io',
    image: IMG_FINTECH_SAAS,
    imageAlt: 'FinPulse SaaS and wealth platform website shown on laptop and mobile mockup',
    summary:
      'Re-engineered corporate website and interactive product tour for a multi-product fintech platform.',
    results: ['+185% Demo Sign-ups (placeholder)', '99 Performance Score (placeholder)'],
  },
  {
    id: 'lumina',
    name: 'Lumina Architectural Lighting & Decor Store',
    industryTag: 'Home Decor & E-commerce',
    stackTag: 'Shopify Plus 2.0',
    url: 'https://luminastudio.store',
    image: IMG_LUXURY_ECOM,
    imageAlt: 'Lumina luxury e-commerce storefront on laptop and mobile phone stage',
    summary:
      'Custom visual catalog with room-scene hotspots, finish swatches, and a 1-step slide-out cart.',
    results: ['+140% Checkout Lift (placeholder)', '1.4s Mobile Load Time (placeholder)'],
  },
  {
    id: 'aether',
    name: 'AetherCloud Enterprise AI Portal',
    industryTag: 'B2B / SaaS',
    stackTag: 'React + Headless CMS',
    url: 'https://aethercloud.ai',
    image: IMG_AI_ENTERPRISE,
    imageAlt: 'AetherCloud B2B enterprise AI website and documentation hub on devices',
    summary:
      'High-converting B2B website with interactive ROI calculators, security trust center, and docs.',
    results: ['+220% Organic Pipeline (placeholder)', '−38% Bounce Rate (placeholder)'],
  },
  {
    id: 'veloce',
    name: 'Veloce Industrial & Mobility Group',
    industryTag: 'Manufacturing & EV',
    stackTag: 'Next.js + Multilingual',
    url: 'https://velocemobility.com',
    image: IMG_HERO_SHOWCASE,
    imageAlt: 'Veloce global corporate website with specification finder on desktop and mobile',
    summary:
      'Multi-region corporate portal and searchable technical spec catalog for global B2B buyers.',
    results: ['3.4× Distributor RFQs (placeholder)', '4 Languages Live (placeholder)'],
  },
  {
    id: 'medcore',
    name: 'MedCore Multi-Specialty Clinic Network',
    industryTag: 'Healthcare',
    stackTag: 'WordPress Custom + Booking',
    url: 'https://medcorehealth.org',
    image: IMG_TEAM_OFFICE,
    imageAlt: 'MedCore patient-friendly healthcare website with doctor finder on laptop and mobile',
    summary:
      'Accessible, fast-loading hospital website with doctor directory, department pages, and slot booking.',
    results: ['+190% Online Appointments (placeholder)', '100 Accessibility Score (placeholder)'],
  },
];

/* Section 10: Grow Further — Add-On Services (4 plug-in modules) */
interface AddOnModuleItem {
  id: string;
  code: string;
  title: string;
  oneLine: string;
  to: string;
  iconName: 'Search' | 'ShieldCheck' | 'Bot' | 'Target';
}

const ADDON_MODULES: AddOnModuleItem[] = [
  {
    id: 'addon-seo',
    code: 'MOD_01 // ORGANIC_RANK',
    title: 'SEO Services',
    oneLine: 'Turn your new website into a compounding organic traffic & lead machine on Google.',
    to: '/services/seo-services',
    iconName: 'Search',
  },
  {
    id: 'addon-maint',
    code: 'MOD_02 // UPTIME_SLA',
    title: 'Website Maintenance & Support',
    oneLine: 'Weekly security patches, daily cloud backups, speed checks & monthly content updates.',
    to: '/services/website-maintenance-support',
    iconName: 'ShieldCheck',
  },
  {
    id: 'addon-ai',
    code: 'MOD_03 // AI_AGENT_24x7',
    title: 'AI Chatbot for Your Website',
    oneLine: 'Capture, qualify & book leads 24/7 with a custom AI assistant trained on your pages.',
    to: '/ai-solutions/ai-chatbot-development',
    iconName: 'Bot',
  },
  {
    id: 'addon-ads',
    code: 'MOD_04 // PAID_SEARCH',
    title: 'Google Ads (SEM)',
    oneLine: 'Drive immediate high-intent buyer traffic to your new landing pages from day one.',
    to: '/services/google-ads-sem',
    iconName: 'Target',
  },
];

/* Section 11: Website Development FAQ (8 items) */
interface FaqItem {
  q: string;
  a: string;
}

const WEBSITE_DEV_FAQS: FaqItem[] = [
  {
    q: 'How much does a website cost?',
    a: 'Website costs depend on the number of pages, whether you need custom UI/UX design, your choice of platform (Next.js, WordPress, or Shopify), and any custom integrations. Starter business websites typically begin around ₹45,000 ($690), growth-focused custom Business websites start around ₹95,000 ($1,490), and complex web portals or enterprise builds are scoped individually. Use our interactive Cost Estimator below for an instant range.',
  },
  {
    q: 'How long does it take to build a website?',
    a: 'Most custom websites launch within 4 to 8 weeks from discovery to go-live. Focused campaign landing pages or 5-page starter websites can be delivered in 2 to 3 weeks, while large e-commerce catalogs or custom web portals typically take 6 to 10 weeks.',
  },
  {
    q: 'Will I be able to update the website myself?',
    a: 'Yes. Every website we deliver includes a clean, intuitive Content Management System (CMS)—whether that is WordPress, Shopify 2.0, or a modern headless CMS for Next.js builds. Your marketing team can edit text, swap images, publish blog posts, and add new pages without writing code, and we provide 1-on-1 training at launch.',
  },
  {
    q: 'Do you redesign existing websites without losing SEO?',
    a: 'Absolutely. Before touching a single page of your existing site, we crawl all current URLs, benchmark your top-ranking keywords, and create a complete 301 redirect map. We preserve URL structures where beneficial, upgrade on-page SEO and Schema markup, and improve Core Web Vitals so rankings grow rather than drop.',
  },
  {
    q: 'Do I own the website and code after launch?',
    a: 'Yes—100%. Upon project completion, you own the full source code, GitHub repository, Figma design files, CMS database, content, and domain/hosting accounts. There are zero proprietary lock-ins or mandatory agency licensing fees.',
  },
  {
    q: 'Do you provide hosting and domain?',
    a: 'We help you select and configure the ideal hosting environment for your stack—such as Vercel, AWS, Cloudflare, Cloudways, or Shopify—and set up your domain, DNS, and SSL certificates directly under your own company account so you always retain full ownership.',
  },
  {
    q: 'Will my website work on mobile and be fast?',
    a: 'Every website is designed mobile-first and tested across real iOS and Android devices, tablets, and desktop screens. We optimize images into WebP/AVIF, eliminate render-blocking scripts, and tune Core Web Vitals to target 90+ Google PageSpeed scores.',
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Every website package includes a free post-launch support window (14 to 60 days depending on your package) covering bug fixes, minor adjustments, and team onboarding. After that, you can manage the site in-house or opt into our monthly Website Maintenance & Support plan.',
  },
];

/* Section 12: Website Cost Estimator Pricing Configuration (Editable Placeholders) */
type EstimatorSiteType = 'Business' | 'Landing Page' | 'E-commerce' | 'Portfolio' | 'Portal';
type EstimatorDesignType = 'Template-based' | 'Custom';
type EstimatorTimelineType = 'Standard' | 'Urgent';

interface EstimatorFeatureAddon {
  id: string;
  label: string;
  costINR: number;
  costUSD: number;
  weeksAdd: number;
}

const ESTIMATOR_CONFIG = {
  baseByType: {
    'Landing Page': { inr: 25000, usd: 400, baseWeeks: 2 },
    Portfolio: { inr: 35000, usd: 550, baseWeeks: 3 },
    Business: { inr: 45000, usd: 700, baseWeeks: 4 },
    'E-commerce': { inr: 75000, usd: 1150, baseWeeks: 5 },
    Portal: { inr: 110000, usd: 1700, baseWeeks: 6 },
  } as Record<EstimatorSiteType, { inr: number; usd: number; baseWeeks: number }>,
  perPage: {
    inr: 2500,
    usd: 40,
  },
  designMultiplier: {
    'Template-based': 1.0,
    Custom: 1.35,
  } as Record<EstimatorDesignType, number>,
  urgencyMultiplier: {
    Standard: 1.0,
    Urgent: 1.25,
  } as Record<EstimatorTimelineType, number>,
  addons: [
    { id: 'blog', label: 'Blog', costINR: 8000, costUSD: 120, weeksAdd: 0.5 },
    { id: 'multilingual', label: 'Multilingual', costINR: 18000, costUSD: 280, weeksAdd: 1 },
    { id: 'booking', label: 'Booking System', costINR: 15000, costUSD: 240, weeksAdd: 1 },
    { id: 'payment', label: 'Payment Gateway', costINR: 14000, costUSD: 220, weeksAdd: 0.5 },
    { id: 'chatbot', label: 'AI Chatbot', costINR: 22000, costUSD: 350, weeksAdd: 1 },
    { id: 'integrations', label: 'Integrations (CRM/ERP)', costINR: 20000, costUSD: 320, weeksAdd: 1 },
  ] as EstimatorFeatureAddon[],
};

/* Helper Icon for Section 3 Website Type Tabs */
const WebsiteTypeIcon: React.FC<{ id: string; className?: string }> = ({
  id,
  className = 'w-5 h-5',
}) => {
  switch (id) {
    case 'corporate':
      return <Building2 className={className} strokeWidth={1.75} />;
    case 'landing':
      return <Target className={className} strokeWidth={1.75} />;
    case 'ecommerce':
      return <ShoppingCart className={className} strokeWidth={1.75} />;
    case 'portfolio':
      return <Award className={className} strokeWidth={1.75} />;
    case 'portals':
      return <LayoutDashboard className={className} strokeWidth={1.75} />;
    case 'multilingual':
      return <Languages className={className} strokeWidth={1.75} />;
    default:
      return <Globe className={className} strokeWidth={1.75} />;
  }
};

/* Helper Icon for Section 6 Config Panel Rows */
const ConfigFeatureIcon: React.FC<{ id: string; className?: string }> = ({
  id,
  className = 'w-4 h-4',
}) => {
  switch (id) {
    case 'feat-1':
      return <Smartphone className={className} strokeWidth={1.75} />;
    case 'feat-2':
      return <Search className={className} strokeWidth={1.75} />;
    case 'feat-3':
      return <Zap className={className} strokeWidth={1.75} />;
    case 'feat-4':
      return <Lock className={className} strokeWidth={1.75} />;
    case 'feat-5':
      return <Layers className={className} strokeWidth={1.75} />;
    case 'feat-6':
      return <FileText className={className} strokeWidth={1.75} />;
    case 'feat-7':
      return <BarChart3 className={className} strokeWidth={1.75} />;
    case 'feat-8':
      return <Phone className={className} strokeWidth={1.75} />;
    case 'feat-9':
      return <Eye className={className} strokeWidth={1.75} />;
    case 'feat-10':
      return <ShieldCheck className={className} strokeWidth={1.75} />;
    case 'feat-11':
      return <Database className={className} strokeWidth={1.75} />;
    case 'feat-12':
      return <Headphones className={className} strokeWidth={1.75} />;
    default:
      return <Check className={className} strokeWidth={1.75} />;
  }
};

/* ============================================================================
   MAIN WEBSITE DEVELOPMENT SERVICE PAGE COMPONENT
============================================================================ */

interface WebsiteDevelopmentProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const WebsiteDevelopment: React.FC<WebsiteDevelopmentProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  const triggerQuoteModal = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service || websiteDevService.name);
    } else {
      window.dispatchEvent(
        new CustomEvent('open-quote-modal', { detail: service || websiteDevService.name })
      );
    }
  };

  /* SEO Title & Meta Description */
  useEffect(() => {
    document.title =
      'Website Development Company | Custom, Fast & SEO-Ready Websites | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Custom, mobile-first website development on Next.js, React, WordPress & Shopify. Built to load fast, rank high on Google & convert visitors into leads.'
      );
    }
  }, []);

  /* ==========================================================================
     SECTION 1 STATE: HERO CODE-TO-WEBSITE SYNC ANIMATION
     Stage 0: lines 1-4 (Wireframe stage)
     Stage 1: lines 1-8 (Styled UI stage)
     Stage 2: lines 1-12 (Full content + image + Get Started CTA + 98 Perf chip)
  ========================================================================== */
  const [visibleCodeLines, setVisibleCodeLines] = useState<number>(
    shouldReduceMotion ? HERO_CODE_LINES.length : 1
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisibleCodeLines(HERO_CODE_LINES.length);
      return;
    }

    const interval = setInterval(() => {
      setVisibleCodeLines((prev) => {
        if (prev >= HERO_CODE_LINES.length + 4) {
          return 1; // loop smoothly after pause at end
        }
        return prev + 1;
      });
    }, 520);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const effectiveLines = Math.min(visibleCodeLines, HERO_CODE_LINES.length);
  const heroBuildStage: 0 | 1 | 2 =
    shouldReduceMotion || effectiveLines >= 10 ? 2 : effectiveLines >= 5 ? 1 : 0;

  /* ==========================================================================
     SECTION 3 STATE: WEBSITE TYPE SWITCHER
  ========================================================================== */
  const [activeWebsiteTypeId, setActiveWebsiteTypeId] = useState<string>(WEBSITE_TYPES[0].id);
  const activeWebsiteType =
    WEBSITE_TYPES.find((t) => t.id === activeWebsiteTypeId) || WEBSITE_TYPES[0];

  /* ==========================================================================
     SECTION 4 STATE: TECH PRIORITY BALANCER (Sliders 1-5)
  ========================================================================== */
  const [priorities, setPriorities] = useState<PriorityWeights>({
    speed: 5,
    editing: 4,
    commerce: 2,
    budget: 3,
  });

  const rankedTechOptions = useMemo(() => {
    const totalWeight =
      priorities.speed + priorities.editing + priorities.commerce + priorities.budget || 1;

    return TECH_STACK_OPTIONS.map((tech) => {
      const weightedSum =
        tech.scores.speed * priorities.speed +
        tech.scores.editing * priorities.editing +
        tech.scores.commerce * priorities.commerce +
        tech.scores.budget * priorities.budget;

      const maxPossible = 5 * totalWeight;
      const matchPercent = Math.round((weightedSum / maxPossible) * 100);
      return {
        ...tech,
        matchPercent,
      };
    }).sort((a, b) => b.matchPercent - a.matchPercent);
  }, [priorities]);

  /* ==========================================================================
     SECTION 5 STATE: PERFORMANCE GAUGES TOGGLE
  ========================================================================== */
  const [gaugeMode, setGaugeMode] = useState<'typical' | 'webxcode'>('webxcode');

  /* ==========================================================================
     SECTION 6 STATE: BUILD CONFIGURATION PANEL TOGGLES (12 switches)
  ========================================================================== */
  const [enabledFeatures, setEnabledFeatures] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    INCLUDED_CONFIG_FEATURES.forEach((f) => {
      initial[f.id] = Boolean(shouldReduceMotion);
    });
    return initial;
  });
  const [configSectionViewed, setConfigSectionViewed] = useState<boolean>(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      const allOn: Record<string, boolean> = {};
      INCLUDED_CONFIG_FEATURES.forEach((f) => {
        allOn[f.id] = true;
      });
      setEnabledFeatures(allOn);
      return;
    }

    if (!configSectionViewed) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    INCLUDED_CONFIG_FEATURES.forEach((feat, idx) => {
      const t = setTimeout(() => {
        setEnabledFeatures((prev) => ({ ...prev, [feat.id]: true }));
      }, idx * 110);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [configSectionViewed, shouldReduceMotion]);

  const toggleConfigFeature = (id: string) => {
    setEnabledFeatures((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const enabledFeatureCount = Object.values(enabledFeatures).filter(Boolean).length;

  /* ==========================================================================
     SECTION 8 STATE: EXPANDABLE PACKAGE COMPARISON TABLE
  ========================================================================== */
  const [compareTableOpen, setCompareTableOpen] = useState<boolean>(false);

  /* ==========================================================================
     SECTION 9 STATE: PORTFOLIO DEVICE STAGE
  ========================================================================== */
  const [activePortfolioId, setActivePortfolioId] = useState<string>(PORTFOLIO_PROJECTS[0].id);
  const activePortfolio =
    PORTFOLIO_PROJECTS.find((p) => p.id === activePortfolioId) || PORTFOLIO_PROJECTS[0];

  /* ==========================================================================
     SECTION 11 STATE: 2-COLUMN FAQ ACCORDION
  ========================================================================== */
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });

  const toggleFaqIndex = (idx: number) => {
    setOpenFaqIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  /* ==========================================================================
     SECTION 12 STATE: INTERACTIVE WEBSITE COST ESTIMATOR
  ========================================================================== */
  const [estType, setEstType] = useState<EstimatorSiteType>('Business');
  const [estPages, setEstPages] = useState<number>(10);
  const [estDesign, setEstDesign] = useState<EstimatorDesignType>('Custom');
  const [estAddons, setEstAddons] = useState<string[]>(['blog', 'integrations']);
  const [estTimeline, setEstTimeline] = useState<EstimatorTimelineType>('Standard');
  const [estCurrency, setEstCurrency] = useState<'INR' | 'USD'>('INR');

  const toggleEstAddon = (addonId: string) => {
    setEstAddons((prev) =>
      prev.includes(addonId) ? prev.filter((item) => item !== addonId) : [...prev, addonId]
    );
  };

  const estimatorResult = useMemo(() => {
    const baseObj = ESTIMATOR_CONFIG.baseByType[estType];
    const baseCost = estCurrency === 'INR' ? baseObj.inr : baseObj.usd;
    const perPageRate =
      estCurrency === 'INR' ? ESTIMATOR_CONFIG.perPage.inr : ESTIMATOR_CONFIG.perPage.usd;

    const extraPages = Math.max(0, estPages - 5);
    const pagesCost = extraPages * perPageRate;

    const addonsCost = estAddons.reduce((acc, addonId) => {
      const found = ESTIMATOR_CONFIG.addons.find((a) => a.id === addonId);
      if (!found) return acc;
      return acc + (estCurrency === 'INR' ? found.costINR : found.costUSD);
    }, 0);

    const addonsWeeks = estAddons.reduce((acc, addonId) => {
      const found = ESTIMATOR_CONFIG.addons.find((a) => a.id === addonId);
      return acc + (found ? found.weeksAdd : 0);
    }, 0);

    const designMult = ESTIMATOR_CONFIG.designMultiplier[estDesign];
    const urgencyMult = ESTIMATOR_CONFIG.urgencyMultiplier[estTimeline];

    const rawEstimate = (baseCost + pagesCost + addonsCost) * designMult * urgencyMult;
    const lowEstimate = Math.round(rawEstimate * 0.9 / 500) * 500 || Math.round(rawEstimate * 0.9);
    const highEstimate = Math.round(rawEstimate * 1.15 / 500) * 500 || Math.round(rawEstimate * 1.15);

    const rawWeeks =
      (baseObj.baseWeeks + Math.floor(estPages / 12) + addonsWeeks) *
      (estDesign === 'Custom' ? 1.15 : 0.85) *
      (estTimeline === 'Urgent' ? 0.75 : 1.0);

    const minWeeks = Math.max(2, Math.round(rawWeeks));
    const maxWeeks = Math.max(minWeeks + 1, Math.round(rawWeeks + 2));

    const formatMoney = (val: number) => {
      if (estCurrency === 'INR') {
        return `₹${val.toLocaleString('en-IN')}`;
      }
      return `$${val.toLocaleString('en-US')}`;
    };

    return {
      rangeString: `${formatMoney(lowEstimate)} – ${formatMoney(highEstimate)}`,
      timelineString: `${minWeeks}–${maxWeeks} weeks`,
    };
  }, [estType, estPages, estDesign, estAddons, estTimeline, estCurrency]);

  /* ==========================================================================
     SECTION 13 DATA: RELATED WEB & APPS SERVICES (excluding website-development)
  ========================================================================== */
  const relatedWebServices = useMemo(
    () =>
      services.filter(
        (s) => s.category === 'Web & Apps' && s.slug !== 'website-development'
      ),
    []
  );

  /* ==========================================================================
     JSON-LD STRUCTURED DATA (Service + BreadcrumbList + FAQPage)
  ========================================================================== */
  const jsonLdSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: websiteDevService.name,
          serviceType: 'Website Development',
          description: websiteDevService.tagline,
          provider: {
            '@type': 'Organization',
            name: 'WebXCode',
            url: 'https://webxcode.com',
          },
          areaServed: ['India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Worldwide'],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Website Development Packages',
            itemListElement: WEBSITE_PACKAGES.map((pkg) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `${pkg.name} Website Package`,
                description: pkg.subtitle,
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                description: pkg.priceText,
              },
            })),
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://webxcode.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: 'https://webxcode.com/services',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: websiteDevService.name,
              item: 'https://webxcode.com/services/website-development',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: WEBSITE_DEV_FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        },
      ],
    };
  }, []);

  return (
    <main className="flex-1 bg-white text-navy overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: CODE TO WEBSITE (bg: #1e242e navy, 45/55 split)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-28 lg:pt-16 lg:pb-36 overflow-hidden">
        {/* Radial Blue Glow + Faint Architectural Grid */}
        <div className="absolute -top-24 right-1/4 w-[680px] h-[680px] blue-glow-strong pointer-events-none opacity-80" />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb: Home › Services › Website Development */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/65 font-medium">
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
                {websiteDevService.name}
              </li>
            </ol>
          </nav>

          {/* 45/55 Split (5 cols left / 7 cols right on 12-col grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
            {/* Left 45% (5 cols on lg) */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <ServiceIcon name={websiteDevService.icon} className="w-3.5 h-3.5 text-primary" />
                <span>{websiteDevService.name.toUpperCase()}</span>
              </div>

              <h1 className="text-[34px] sm:text-[44px] lg:text-[50px] font-extrabold text-white leading-[1.08] tracking-tight">
                Custom Websites Built to{' '}
                <span className="text-primary">Load Fast, Rank High and Convert</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[17px] text-white/75 leading-[1.68]">
                We design and develop custom, mobile-first websites on Next.js, React, WordPress and
                Shopify — fast, secure, SEO-ready and easy for your team to manage.
              </p>

              {/* Single source of truth tagline note */}
              <p className="mt-2.5 text-[13px] font-mono text-primary-100/90">
                // {websiteDevService.tagline}
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#estimator"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15px] shadow-soft hover:shadow-soft-hover transition-all"
                >
                  <span>Get a Free Website Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] transition-all"
                >
                  <span>See Our Websites</span>
                </a>
              </div>

              {/* Small Trust Row */}
              <div className="mt-7 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2 text-[13px] text-white/70 font-medium">
                <span>No templates</span>
                <span className="text-primary">•</span>
                <span>You own the code</span>
                <span className="text-primary">•</span>
                <span>Launch in 4–8 weeks</span>
              </div>
            </div>

            {/* Right 55% (7 cols on lg): Split "Build" Window (Code Editor + Live Browser Preview) */}
            <div className="lg:col-span-7 relative">
              {/* Screen-reader text alternative for decorative code-to-website animation */}
              <span className="sr-only">
                Interactive demonstration showing clean Hero.tsx React code on the left compiling
                into a high-converting business website preview on the right with a 98 Performance
                score.
              </span>

              <div
                aria-hidden="true"
                className="rounded-[20px] bg-white/[0.04] border border-white/15 backdrop-blur-md shadow-2xl overflow-hidden"
              >
                {/* Window Top Bar */}
                <div className="bg-navy px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="ml-2 px-2.5 py-0.5 rounded-md bg-white/[0.07] border border-white/10 font-mono text-[11px] text-primary-100">
                      Hero.tsx
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[11px] text-white/65">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {heroBuildStage === 0
                        ? '1/3 Wireframing...'
                        : heroBuildStage === 1
                        ? '2/3 Applying UI Tokens...'
                        : '3/3 Production Ready'}
                    </span>
                  </div>
                </div>

                {/* Split Body: Left Code Editor (hidden on tiny mobile, compact strip shown instead) + Right Live Preview */}
                <div className="grid grid-cols-1 md:grid-cols-12">
                  {/* Mobile Compact Code Strip */}
                  <div className="md:hidden bg-navy/90 px-4 py-2.5 border-b border-white/10 font-mono text-[11px] flex items-center justify-between text-primary-100">
                    <span>&lt;HeroSection cwvScore=&#123;98&#125; /&gt;</span>
                    <span className="px-2 py-0.5 rounded bg-primary/20 text-white text-[10px]">
                      line {effectiveLines}/12
                    </span>
                  </div>

                  {/* Left Half: Navy Code Editor (6 cols on md+) */}
                  <div className="hidden md:block md:col-span-6 bg-navy p-4 sm:p-5 border-r border-white/10 font-mono text-[12px] leading-[1.75] select-none min-h-[340px]">
                    <div className="space-y-0.5">
                      {HERO_CODE_LINES.map((line) => {
                        const isVisible = line.lineNum <= effectiveLines;
                        return (
                          <div
                            key={line.lineNum}
                            className={`flex items-start transition-opacity duration-200 ${
                              isVisible ? 'opacity-100' : 'opacity-15'
                            }`}
                          >
                            <span className="w-6 text-right pr-3 text-white/30 text-[11px] shrink-0">
                              {line.lineNum}
                            </span>
                            <div
                              style={{ paddingLeft: `${line.indent * 10}px` }}
                              className="truncate"
                            >
                              {line.tokens.map((tok, tIdx) => {
                                const toneClass =
                                  tok.tone === 'keyword'
                                    ? 'text-primary font-semibold'
                                    : tok.tone === 'tag'
                                    ? 'text-white font-semibold'
                                    : tok.tone === 'prop'
                                    ? 'text-primary-100'
                                    : tok.tone === 'string'
                                    ? 'text-white/85'
                                    : 'text-white/60';
                                return (
                                  <span key={tIdx} className={toneClass}>
                                    {tok.text}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Half: Browser Preview Building in Sync (6 cols on md+) */}
                  <div className="md:col-span-6 bg-white text-navy p-4 sm:p-5 flex flex-col justify-between min-h-[320px] sm:min-h-[340px] relative">
                    {/* Mini Browser URL Bar */}
                    <div>
                      <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-primary-50 border border-primary-100 mb-4">
                        <span className="font-mono text-[11px] text-navy-70 truncate">
                          https://yourbrand.com
                        </span>
                        <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-bold">
                          SSL
                        </span>
                      </div>

                      {/* Stage-synced Website Preview Content */}
                      {heroBuildStage === 0 && (
                        /* Stage 0: Wireframe grey-blue boxes */
                        <div className="space-y-3 animate-pulse">
                          <div className="w-28 h-4 rounded-full bg-primary-100" />
                          <div className="w-full h-6 rounded-lg bg-navy-15" />
                          <div className="w-4/5 h-6 rounded-lg bg-navy-15" />
                          <div className="w-full h-24 rounded-xl bg-primary-50 border border-dashed border-primary/40 flex items-center justify-center text-[11px] font-mono text-primary">
                            [ Wireframe Layout Grid ]
                          </div>
                          <div className="w-32 h-8 rounded-full bg-navy-15" />
                        </div>
                      )}

                      {heroBuildStage === 1 && (
                        /* Stage 1: Real styles + typography applied */
                        <div className="space-y-3 transition-all duration-300">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary-50 text-primary text-[10px] font-bold uppercase tracking-wider">
                            Next.js 14 + SEO
                          </span>
                          <div className="text-[18px] font-extrabold text-navy leading-snug">
                            Engineered to <span className="text-primary">Convert &amp; Scale</span>
                          </div>
                          <div className="w-full h-24 rounded-xl bg-navy/90 border border-navy-15 flex items-center justify-center text-[11px] font-mono text-primary-100">
                            Applying Design Tokens &amp; Media...
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/30 text-primary text-[12px] font-bold">
                            <span>Get Started →</span>
                          </div>
                        </div>
                      )}

                      {heroBuildStage === 2 && (
                        /* Stage 2: Full visual preview with image & active CTA */
                        <div className="space-y-3 transition-all duration-300">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary-50 text-primary text-[10px] font-bold uppercase tracking-wider">
                            Next.js 14 + SEO
                          </span>
                          <div className="text-[18px] font-extrabold text-navy leading-snug">
                            Engineered to <span className="text-primary">Convert &amp; Scale</span>
                          </div>
                          <div className="relative rounded-xl overflow-hidden border border-navy-15 aspect-[16/8] bg-navy">
                            <img
                              src={IMG_HERO_SHOWCASE}
                              alt="Live built website preview inside split build window"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-[12px] font-bold shadow-xs">
                              <span>Get Started</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                            <span className="font-mono text-[11px] font-bold text-navy-60">
                              LCP: 0.9s
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Glass Status Chip at the end of build */}
                    <div
                      className={`mt-4 px-3.5 py-2 rounded-xl bg-navy text-white border border-primary/40 flex items-center justify-between transition-all duration-300 ${
                        heroBuildStage === 2
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-40 translate-y-1'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2 text-[12px] font-bold">
                        <span className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" strokeWidth={3} />
                        </span>
                        <span>Build successful · 98 Performance</span>
                      </span>
                      <span className="font-mono text-[10px] text-primary-100">READY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — QUICK FACTS STRIP (white, overlapping hero bottom by ~50px)
      ====================================================================== */}
      <section aria-label="Quick Website Development Facts" className="relative z-20 -mt-12 sm:-mt-14 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="rounded-[20px] bg-white border border-navy-08 shadow-soft p-5 sm:p-7">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-0 lg:divide-x lg:divide-navy-08">
              {QUICK_FACTS.map((fact, idx) => {
                const IconComp = fact.icon;
                return (
                  <div
                    key={fact.label}
                    className={`flex items-center gap-3.5 ${
                      idx > 0 ? 'lg:pl-6' : ''
                    } ${idx < QUICK_FACTS.length - 1 ? 'lg:pr-4' : ''}`}
                  >
                    <div className="w-11 h-11 rounded-2xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      <IconComp className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="text-[18px] sm:text-[20px] font-extrabold text-navy leading-tight">
                        {fact.value}
                      </div>
                      <div className="text-[12px] sm:text-[13px] text-navy-70 font-medium mt-0.5">
                        {fact.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — WEBSITES WE BUILD: TYPE SWITCHER (bg: #f0f7fd)
      ====================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px] mt-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              WHAT WE BUILD
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              The Right Website for <span className="text-primary">Your Business</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Whether you need a corporate website that wins enterprise trust, a high-ROAS campaign
              landing page, or a custom client portal, we architect every layout around your
              conversion goal.
            </p>
          </div>

          {/* Mobile Horizontal Pill Row */}
          <div
            className="flex lg:hidden items-center gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar"
            role="tablist"
            aria-label="Website Types Mobile"
          >
            {WEBSITE_TYPES.map((t) => {
              const isSelected = t.id === activeWebsiteType.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveWebsiteTypeId(t.id)}
                  className={`px-4 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white text-navy border border-navy-08'
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>

          {/* Desktop Vertical Tabs Left + Large Browser Mockup Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Vertical Tabs (5 cols on lg) */}
            <div
              className="hidden lg:flex lg:col-span-5 flex-col justify-between gap-2.5"
              role="tablist"
              aria-label="Website Types"
            >
              {WEBSITE_TYPES.map((tab) => {
                const isSelected = tab.id === activeWebsiteType.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveWebsiteTypeId(tab.id)}
                    className={`w-full text-left p-4 rounded-[18px] border transition-all duration-150 flex items-center justify-between gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-navy text-white border-navy shadow-soft'
                        : 'bg-white text-navy border-navy-08 hover:border-primary/40 hover:bg-white/90'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        <WebsiteTypeIcon id={tab.id} className="w-5 h-5" />
                      </div>
                      <div>
                        <h3
                          className={`text-[15px] font-bold leading-snug ${
                            isSelected ? 'text-white' : 'text-navy'
                          }`}
                        >
                          {tab.name}
                        </h3>
                        <p
                          className={`text-[13px] mt-0.5 ${
                            isSelected ? 'text-white/75' : 'text-navy-70'
                          }`}
                        >
                          {tab.oneLine}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-primary translate-x-0.5' : 'text-navy-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Browser Mockup + Details (7 cols on lg) */}
            <div className="lg:col-span-7">
              <div className="h-full rounded-[20px] bg-white border border-navy-08 shadow-soft p-5 sm:p-7 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeWebsiteType.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* Browser Mockup Frame */}
                      <div className="rounded-[16px] border border-navy-15 bg-navy overflow-hidden shadow-md">
                        {/* Browser Chrome */}
                        <div className="bg-navy px-4 py-2.5 border-b border-white/10 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                          </div>
                          <div className="px-3.5 py-1 rounded-full bg-white/10 font-mono text-[11px] text-white/80 truncate max-w-[260px]">
                            {activeWebsiteType.urlPreview}
                          </div>
                          <span className="font-mono text-[10px] font-bold text-primary-100 uppercase">
                            {activeWebsiteType.id}
                          </span>
                        </div>

                        {/* Custom Wireframe/UI Illustration in Blue/Navy/White Tints */}
                        <div className="p-5 sm:p-6 bg-navy text-white relative overflow-hidden">
                          <div className="absolute -right-12 -bottom-12 w-48 h-48 blue-glow pointer-events-none" />

                          {/* Top Simulated Nav inside Browser */}
                          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-primary flex items-center justify-center font-mono text-[11px] font-bold">
                                WX
                              </span>
                              <div className="w-20 h-2.5 rounded-full bg-white/30" />
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="hidden sm:block w-12 h-2 rounded-full bg-white/20" />
                              <div className="hidden sm:block w-12 h-2 rounded-full bg-white/20" />
                              <span className="px-2.5 py-1 rounded-full bg-primary text-[10px] font-bold">
                                Contact
                              </span>
                            </div>
                          </div>

                          {/* Dynamic Layout per Website Type */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                            <div className="sm:col-span-7 space-y-2.5">
                              <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/25 border border-primary/40 text-primary-100 text-[10px] font-mono font-bold uppercase">
                                {activeWebsiteType.name}
                              </span>
                              <div className="text-[18px] sm:text-[20px] font-extrabold text-white leading-snug">
                                {activeWebsiteType.mockupHeadline}
                              </div>
                              <p className="text-[12px] text-white/70 leading-relaxed">
                                {activeWebsiteType.mockupSub}
                              </p>
                              <div className="pt-1 flex items-center gap-2">
                                <span className="px-3 py-1.5 rounded-full bg-primary text-white text-[11px] font-bold">
                                  Primary Action →
                                </span>
                                <span className="px-3 py-1.5 rounded-full border border-white/25 text-white/80 text-[11px] font-semibold">
                                  Learn More
                                </span>
                              </div>
                            </div>

                            {/* Right Visual Widget inside Browser */}
                            <div className="sm:col-span-5 rounded-xl bg-white/[0.06] border border-white/15 p-3.5 space-y-2.5">
                              <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                                <span>{activeWebsiteType.mockupMetricLabel}</span>
                                <span className="text-primary font-bold">LIVE</span>
                              </div>
                              <div className="text-[24px] font-extrabold text-primary tabular-nums leading-none">
                                {activeWebsiteType.mockupMetricValue}
                              </div>
                              {/* Mini Blue Bar Graph */}
                              <div className="grid grid-cols-5 gap-1.5 items-end h-12 pt-2">
                                <div className="h-4 rounded bg-white/15" />
                                <div className="h-6 rounded bg-white/25" />
                                <div className="h-7 rounded bg-primary/50" />
                                <div className="h-9 rounded bg-primary/80" />
                                <div className="h-11 rounded bg-primary" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Under Mockup: 3 "Ideal for" Chips */}
                      <div className="mt-6">
                        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2.5">
                          Ideal For
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeWebsiteType.idealFor.map((chip) => (
                            <span
                              key={chip}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-[13px] font-semibold text-navy"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              <span>{chip}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 3 "Key features" Points */}
                      <div className="mt-5">
                        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2.5">
                          Key Features Included
                        </div>
                        <ul className="space-y-2">
                          {activeWebsiteType.keyFeatures.map((feat) => (
                            <li
                              key={feat}
                              className="flex items-start gap-2.5 text-[14px] text-navy-80"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-7 pt-5 border-t border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(`Website Development — ${activeWebsiteType.name}`)
                        }
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] shadow-soft transition-all cursor-pointer"
                      >
                        <span>Get a Quote for This</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>

                      <a
                        href="#estimator"
                        className="text-[13px] font-bold text-primary hover:text-navy transition-colors"
                      >
                        Or calculate exact cost below →
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
         SECTION 4 — WHICH TECHNOLOGY IS RIGHT? — PRIORITY BALANCER (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Heading */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              TECH CHOICE
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Next.js, WordPress or Shopify?{' '}
              <span className="text-primary">Let Your Priorities Decide.</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Adjust the 4 sliders below based on what matters most to your business. Watch the
              platforms re-rank live with an instant compatibility percentage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: 4 Priority Sliders Card (5 cols on lg) */}
            <div className="lg:col-span-5 rounded-[20px] bg-white border border-navy-08 shadow-soft p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-navy-08">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" />
                  <h3 className="text-[17px] font-extrabold text-navy">
                    How important is…
                  </h3>
                </div>
                <span className="font-mono text-[11px] font-bold text-primary">
                  SCALE: 1 TO 5
                </span>
              </div>

              <div className="space-y-6">
                {[
                  {
                    key: 'speed' as keyof PriorityWeights,
                    label: 'Speed & Performance',
                    hint: 'Sub-second page loads & custom web app feel',
                  },
                  {
                    key: 'editing' as keyof PriorityWeights,
                    label: 'Easy Content Editing',
                    hint: 'Marketing team edits pages & blogs daily',
                  },
                  {
                    key: 'commerce' as keyof PriorityWeights,
                    label: 'Selling Products Online',
                    hint: 'Cart, checkout, SKUs, shipping & order sync',
                  },
                  {
                    key: 'budget' as keyof PriorityWeights,
                    label: 'Low Upfront Budget',
                    hint: 'Faster launch with lower initial build investment',
                  },
                ].map((slider) => {
                  const val = priorities[slider.key];
                  return (
                    <div key={slider.key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor={`priority-${slider.key}`}
                          className="text-[14px] font-bold text-navy"
                        >
                          {slider.label}
                        </label>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[12px] font-extrabold">
                          {val} / 5
                        </span>
                      </div>
                      <p className="text-[12px] text-navy-60 mb-2.5">{slider.hint}</p>
                      <input
                        id={`priority-${slider.key}`}
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={val}
                        aria-label={slider.label}
                        aria-valuemin={1}
                        aria-valuemax={5}
                        aria-valuenow={val}
                        onChange={(e) =>
                          setPriorities((prev) => ({
                            ...prev,
                            [slider.key]: Number(e.target.value),
                          }))
                        }
                        className="w-full h-2 rounded-lg bg-primary-100 accent-primary cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-navy-08 flex items-center justify-between text-[12px] text-navy-60">
                <span>Move any slider to recalculate</span>
                <button
                  type="button"
                  onClick={() =>
                    setPriorities({ speed: 5, editing: 4, commerce: 2, budget: 3 })
                  }
                  className="font-bold text-primary hover:underline cursor-pointer"
                >
                  Reset Defaults
                </button>
              </div>
            </div>

            {/* Right: 3 Technology Cards Re-Ranking Live (7 cols on lg) */}
            <div className="lg:col-span-7" aria-live="polite">
              <div className="space-y-4">
                {rankedTechOptions.map((tech, index) => {
                  const isTopMatch = index === 0;
                  return (
                    <motion.div
                      key={tech.id}
                      layout={!shouldReduceMotion}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className={`rounded-[20px] p-5 sm:p-6 border transition-colors ${
                        isTopMatch
                          ? 'bg-navy text-white border-navy shadow-xl'
                          : 'bg-white text-navy border-navy-08 shadow-soft'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center font-mono text-[14px] font-extrabold shrink-0 ${
                              isTopMatch
                                ? 'bg-primary text-white'
                                : 'bg-primary-50 text-primary'
                            }`}
                          >
                            {tech.id === 'nextjs-react'
                              ? 'NX'
                              : tech.id === 'wordpress'
                              ? 'WP'
                              : 'SH'}
                          </div>
                          <div>
                            <div className="flex items-center flex-wrap gap-2">
                              <h3
                                className={`text-[19px] sm:text-[20px] font-extrabold ${
                                  isTopMatch ? 'text-white' : 'text-navy'
                                }`}
                              >
                                {tech.name}
                              </h3>
                              {isTopMatch && (
                                <span className="px-3 py-0.5 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-wider">
                                  Best Match
                                </span>
                              )}
                            </div>
                            <div
                              className={`font-mono text-[11px] mt-0.5 ${
                                isTopMatch ? 'text-primary-100' : 'text-navy-50'
                              }`}
                            >
                              {tech.codeTag}
                            </div>
                          </div>
                        </div>

                        {/* Match Percentage Pill + Bar */}
                        <div className="w-full sm:w-44">
                          <div className="flex items-center justify-between text-[12px] font-bold mb-1">
                            <span className={isTopMatch ? 'text-white/80' : 'text-navy-70'}>
                              Match Score
                            </span>
                            <span className="font-mono text-primary font-extrabold">
                              Match: {tech.matchPercent}%
                            </span>
                          </div>
                          <div
                            className={`w-full h-2 rounded-full overflow-hidden ${
                              isTopMatch ? 'bg-white/15' : 'bg-primary-50'
                            }`}
                          >
                            <div
                              style={{ width: `${tech.matchPercent}%` }}
                              className="h-full bg-primary rounded-full transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      <p
                        className={`mt-3.5 text-[14px] leading-relaxed ${
                          isTopMatch ? 'text-white/80' : 'text-navy-70'
                        }`}
                      >
                        <strong className={isTopMatch ? 'text-white' : 'text-navy'}>
                          Best for:
                        </strong>{' '}
                        {tech.bestFor}
                      </p>

                      <ul className="mt-4 grid grid-cols-1 gap-2">
                        {tech.pros.map((pro) => (
                          <li
                            key={pro}
                            className={`flex items-start gap-2 text-[13px] ${
                              isTopMatch ? 'text-white/85' : 'text-navy-80'
                            }`}
                          >
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>

              <p className="mt-4 text-[13px] text-navy-60 font-medium text-center sm:text-left">
                Not sure? We&apos;ll recommend the right stack in your free consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 5 — SPEED THAT CONVERTS — PERFORMANCE GAUGES (bg: #1e242e navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] blue-glow-strong pointer-events-none opacity-65" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Header + Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                PERFORMANCE
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight">
                Built for <span className="text-primary">Speed, Scores and SEO</span>
              </h2>
            </div>

            {/* Toggle: Typical Website ⟷ WebXCode Website */}
            <div
              className="inline-flex items-center p-1.5 rounded-full bg-white/[0.06] border border-white/15 self-start lg:self-auto"
              role="group"
              aria-label="Compare Website Performance"
            >
              <button
                type="button"
                onClick={() => setGaugeMode('typical')}
                className={`px-4 sm:px-5 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                  gaugeMode === 'typical'
                    ? 'bg-white text-navy shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Typical Website
              </button>
              <button
                type="button"
                onClick={() => setGaugeMode('webxcode')}
                className={`px-4 sm:px-5 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                  gaugeMode === 'webxcode'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                WebXCode Website
              </button>
            </div>
          </div>

          {/* 4 Large Circular Lighthouse-Style Gauges (Strict Blue / Navy / White palette) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERFORMANCE_GAUGES.map((gauge) => {
              const score =
                gaugeMode === 'webxcode' ? gauge.webxcodeScore : gauge.typicalScore;
              const radius = 54;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (score / 100) * circumference;

              return (
                <div
                  key={gauge.id}
                  className={`rounded-[20px] p-6 border transition-all text-center flex flex-col items-center justify-between ${
                    gaugeMode === 'webxcode'
                      ? 'bg-white/[0.06] border-primary/40 shadow-xl'
                      : 'bg-white/[0.03] border-white/10'
                  }`}
                >
                  {/* SVG Circular Gauge */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                      {/* Track Circle */}
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="10"
                        fill="none"
                      />
                      {/* Progress Circle (strictly #0571c2 primary blue or muted white/navy tint) */}
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke={
                          gaugeMode === 'webxcode'
                            ? '#0571c2'
                            : 'rgba(255,255,255,0.42)'
                        }
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        className={`font-mono text-[32px] font-extrabold tabular-nums leading-none ${
                          gaugeMode === 'webxcode' ? 'text-white' : 'text-white/65'
                        }`}
                      >
                        {score}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-primary-100 mt-1">
                        / 100
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-[18px] font-extrabold text-white">{gauge.label}</h3>
                    <p className="text-[13px] text-white/70 mt-1.5 leading-relaxed">
                      {gauge.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3 Small Glass Cards Below Gauges */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Optimized images & lazy loading',
              'Clean, lightweight code',
              'Core Web Vitals monitored',
            ].map((pillText) => (
              <div
                key={pillText}
                className="p-4 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-md flex items-center justify-center gap-2.5 text-[14px] font-bold text-white"
              >
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{pillText}</span>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-5 text-center text-[12px] text-white/60">
            Scores are illustrative; actual results depend on content and hosting.
          </p>
        </div>
      </section>

      {/* ======================================================================
         SECTION 6 — EVERY WEBSITE INCLUDES — BUILD CONFIGURATION PANEL (bg: #ffffff)
      ====================================================================== */}
      <motion.section
        onViewportEnter={() => setConfigSectionViewed(true)}
        viewport={{ once: true, amount: 0.2 }}
        className="py-[72px] lg:py-[112px] bg-white"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              INCLUDED
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Everything Included, <span className="text-primary">Switched On</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              No nickle-and-diming for essentials. Every WebXCode website ships with these 12
              production-grade engineering, SEO, and security standards enabled by default.
            </p>
          </div>

          {/* Large Settings Panel Card */}
          <div className="rounded-[24px] border border-navy-15 bg-white shadow-soft overflow-hidden">
            {/* Header Bar: website.config */}
            <div className="bg-navy text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
                <span className="font-mono text-[14px] font-bold text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-primary" />
                  <span>website.config</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const allOn: Record<string, boolean> = {};
                    INCLUDED_CONFIG_FEATURES.forEach((f) => {
                      allOn[f.id] = true;
                    });
                    setEnabledFeatures(allOn);
                  }}
                  className="font-mono text-[11px] font-bold text-primary-100 hover:text-white underline cursor-pointer"
                >
                  Enable All
                </button>
                <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 font-mono text-[11px] font-bold text-primary-100">
                  ENV: PRODUCTION
                </span>
              </div>
            </div>

            {/* 2-Column List of 12 Feature Rows with Toggle Switches */}
            <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {INCLUDED_CONFIG_FEATURES.map((feat) => {
                const isOn = Boolean(enabledFeatures[feat.id]);
                return (
                  <div
                    key={feat.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      isOn
                        ? 'bg-primary-50/45 border-primary-100'
                        : 'bg-white border-navy-08 opacity-75'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isOn
                            ? 'bg-primary text-white'
                            : 'bg-navy-08 text-navy-60'
                        }`}
                      >
                        <ConfigFeatureIcon id={feat.id} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] text-primary font-bold">
                          {feat.keyName}
                        </div>
                        <h3 className="text-[15px] font-bold text-navy leading-snug">
                          {feat.title}
                        </h3>
                        <p className="text-[12px] sm:text-[13px] text-navy-70 mt-0.5 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </div>

                    {/* Accessible Toggle Switch */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isOn}
                      aria-label={`Toggle ${feat.title}`}
                      onClick={() => toggleConfigFeature(feat.id)}
                      className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 cursor-pointer flex items-center ${
                        isOn ? 'bg-primary justify-end' : 'bg-navy-15 justify-start'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white shadow-xs block transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Footer of Panel: 12 / 12 features enabled + full blue progress bar */}
            <div className="bg-primary-50 px-6 sm:px-8 py-4 border-t border-primary-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="font-mono text-[13px] font-extrabold text-navy">
                  {enabledFeatureCount} / {INCLUDED_CONFIG_FEATURES.length} features enabled
                </span>
              </div>

              <div className="w-full sm:w-64 h-2.5 rounded-full bg-white border border-primary-100 overflow-hidden">
                <div
                  style={{
                    width: `${(enabledFeatureCount / INCLUDED_CONFIG_FEATURES.length) * 100}%`,
                  }}
                  className="h-full bg-primary rounded-full transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ======================================================================
         SECTION 7 — OUR PROCESS — GIT COMMIT TIMELINE (bg: #f0f7fd)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12 lg:mb-14">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              OUR PROCESS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              From Idea to <span className="text-primary">Live Website</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Follow our transparent 6-commit engineering workflow—complete with staging links,
              Figma review loops, and zero-downtime deployment.
            </p>
          </div>

          {/* Git Commit Vertical Timeline */}
          <div className="relative pl-6 sm:pl-10">
            {/* Main Vertical Blue Branch Line */}
            <div
              className="absolute left-2.5 sm:left-4 top-3 bottom-3 w-0.5 bg-primary/40"
              aria-hidden="true"
            />

            <div className="space-y-6">
              {GIT_PROCESS_COMMITS.map((commit, idx) => (
                <React.Fragment key={commit.hash}>
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="relative"
                  >
                    {/* Commit Dot on the Branch Line */}
                    <div
                      className={`absolute -left-[23px] sm:-left-[31px] top-6 w-5 h-5 rounded-full border-4 flex items-center justify-center ${
                        commit.isRelease
                          ? 'bg-primary border-navy shadow-md'
                          : 'bg-white border-primary'
                      }`}
                      aria-hidden="true"
                    />

                    {/* Commit Card */}
                    <div
                      className={`rounded-[20px] p-5 sm:p-7 border transition-all ${
                        commit.isRelease
                          ? 'bg-navy text-white border-navy shadow-xl'
                          : 'bg-white text-navy border-navy-08 shadow-soft hover:border-primary-100'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-current/10">
                        <div className="flex items-center flex-wrap gap-2.5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[12px] font-bold ${
                              commit.isRelease
                                ? 'bg-primary text-white'
                                : 'bg-primary-50 text-primary border border-primary-100'
                            }`}
                          >
                            <GitCommit className="w-3.5 h-3.5" />
                            <span>{commit.hash}</span>
                          </span>

                          <h3
                            className={`font-mono text-[16px] sm:text-[18px] font-extrabold flex items-center gap-2 ${
                              commit.isRelease ? 'text-white' : 'text-navy'
                            }`}
                          >
                            <span>{commit.message}</span>
                            {commit.isRelease && (
                              <Rocket className="w-4 h-4 text-primary inline-block" />
                            )}
                          </h3>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider ${
                            commit.isRelease
                              ? 'bg-white/15 text-primary-100'
                              : 'bg-navy text-white'
                          }`}
                        >
                          {commit.week}
                        </span>
                      </div>

                      <p
                        className={`mt-3.5 text-[14px] sm:text-[15px] leading-relaxed ${
                          commit.isRelease ? 'text-white/80' : 'text-navy-70'
                        }`}
                      >
                        {commit.description}
                      </p>

                      {/* Deliverable Chips */}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {commit.deliverables.map((deliv) => (
                          <span
                            key={deliv}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold ${
                              commit.isRelease
                                ? 'bg-white/10 text-white border border-white/15'
                                : 'bg-primary-50/70 text-navy border border-primary-100'
                            }`}
                          >
                            <Check className="w-3 h-3 text-primary" strokeWidth={2.5} />
                            <span>{deliv}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Side Branch Line between Steps 3 and 4 labelled "client feedback" */}
                  {commit.hasClientFeedbackBranchAfter && (
                    <div className="relative pl-4 sm:pl-8 py-1" aria-label="Client feedback branch">
                      {/* Curved SVG Side Branch joining back into main line */}
                      <svg
                        className="absolute -left-[15px] sm:-left-[23px] -top-3 w-10 h-20 text-primary pointer-events-none"
                        viewBox="0 0 40 80"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 4 C 24 10, 28 28, 28 40 C 28 52, 24 70, 2 76"
                          stroke="#0571c2"
                          strokeWidth="2"
                          strokeDasharray="4 3"
                        />
                      </svg>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/40 shadow-xs text-[12px] font-mono font-bold text-primary">
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>branch: client feedback &amp; design sign-off</span>
                        <GitMerge className="w-3.5 h-3.5 text-navy" />
                        <span className="text-navy-60">merged to main</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 8 — PACKAGES + EXPANDABLE COMPARISON TABLE (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              PACKAGES
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Simple Packages. <span className="text-primary">No Surprises.</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Choose the package that matches your stage of growth. Every tier includes full source
              code ownership, mobile-first design, and on-page SEO.
            </p>
          </div>

          {/* 3 Package Cards (Middle one featured: navy, blue glow, slightly taller) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {WEBSITE_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all border relative overflow-hidden ${
                  pkg.featured
                    ? 'bg-navy text-white border-navy shadow-2xl lg:-my-3 lg:py-10'
                    : 'bg-white text-navy border-navy-08 shadow-soft hover:border-primary-100'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-20 -right-20 w-56 h-56 blue-glow-strong pointer-events-none" />
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <h3
                      className={`text-[24px] font-extrabold ${
                        pkg.featured ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {pkg.name}
                    </h3>
                    {pkg.badge && (
                      <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-wider">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-[14px] leading-relaxed ${
                      pkg.featured ? 'text-white/75' : 'text-navy-70'
                    }`}
                  >
                    {pkg.subtitle}
                  </p>

                  {/* Price & Timeline Block */}
                  <div
                    className={`mt-5 p-4 rounded-2xl border ${
                      pkg.featured
                        ? 'bg-white/[0.06] border-white/15'
                        : 'bg-primary-50/60 border-primary-100'
                    }`}
                  >
                    <div
                      className={`text-[17px] sm:text-[18px] font-extrabold ${
                        pkg.featured ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {pkg.priceText}
                    </div>
                    <div
                      className={`font-mono text-[12px] font-semibold mt-1 ${
                        pkg.featured ? 'text-primary-100' : 'text-primary'
                      }`}
                    >
                      {pkg.timelineText}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mt-6 space-y-3">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-[14px]">
                        <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" strokeWidth={2.5} />
                        </div>
                        <span className={pkg.featured ? 'text-white/90' : 'text-navy-80'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-current/10 relative z-10">
                  <button
                    type="button"
                    onClick={() =>
                      triggerQuoteModal(`Website Development — ${pkg.name} Package`)
                    }
                    className={`w-full py-3.5 px-6 rounded-full font-semibold text-[15px] inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      pkg.featured
                        ? 'bg-primary hover:bg-primary-700 text-white shadow-soft'
                        : 'bg-navy hover:bg-primary text-white'
                    }`}
                  >
                    <span>Get This Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Expandable "Compare all features" Button & Table */}
          <div className="mt-10 text-center">
            <button
              type="button"
              aria-expanded={compareTableOpen}
              onClick={() => setCompareTableOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-50 hover:bg-primary text-primary hover:text-white border border-primary-100 font-bold text-[14px] transition-all cursor-pointer"
            >
              <span>{compareTableOpen ? 'Hide feature comparison' : 'Compare all features'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  compareTableOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {compareTableOpen && (
              <motion.div
                initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-8 rounded-[20px] border border-navy-08 bg-white shadow-soft overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[640px]">
                    <thead>
                      <tr className="bg-navy text-white">
                        <th className="py-4 px-5 text-[13px] font-bold uppercase tracking-wider">
                          Feature / Deliverable
                        </th>
                        <th className="py-4 px-5 text-[14px] font-extrabold text-center">
                          Starter
                        </th>
                        <th className="py-4 px-5 text-[14px] font-extrabold text-center bg-primary">
                          Business
                        </th>
                        <th className="py-4 px-5 text-[14px] font-extrabold text-center">
                          Custom / Enterprise
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-08 text-[14px]">
                      {PACKAGE_COMPARISON_ROWS.map((row) => {
                        const renderCell = (val: string | boolean) => {
                          if (typeof val === 'boolean') {
                            return val ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white">
                                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                              </span>
                            ) : (
                              <span className="text-navy-40 font-mono font-bold">—</span>
                            );
                          }
                          return <span className="font-semibold text-navy">{val}</span>;
                        };

                        return (
                          <tr key={row.feature} className="hover:bg-primary-50/35">
                            <td className="py-3.5 px-5 font-bold text-navy">{row.feature}</td>
                            <td className="py-3.5 px-5 text-center">{renderCell(row.starter)}</td>
                            <td className="py-3.5 px-5 text-center bg-primary-50/40">
                              {renderCell(row.business)}
                            </td>
                            <td className="py-3.5 px-5 text-center">
                              {renderCell(row.enterprise)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ======================================================================
         SECTION 9 — WEBSITES WE'VE BUILT — DEVICE STAGE (bg: #1e242e navy)
         section id="portfolio"
      ====================================================================== */}
      <section
        id="portfolio"
        className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden scroll-mt-20"
      >
        <div className="absolute -bottom-24 right-1/3 w-[640px] h-[640px] blue-glow-strong pointer-events-none opacity-70" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                PORTFOLIO
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight">
                Websites That <span className="text-primary">Speak for Themselves</span>
              </h2>
            </div>

            <Link
              href="/our-work"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white text-[14px] font-semibold transition-all self-start lg:self-auto"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Device Stage: Large Laptop + Overlapping Phone + Project Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left/Center Device Stage (7 cols on lg) */}
            <div className="lg:col-span-7 relative pb-6 sm:pb-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePortfolio.id}
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  {/* Large Laptop Mockup (Hovering slowly scrolls preview inside) */}
                  <div className="group rounded-[20px] bg-white/[0.06] border border-white/20 p-2.5 sm:p-3.5 shadow-2xl">
                    {/* Laptop Top Bar */}
                    <div className="bg-navy px-4 py-2.5 rounded-t-[12px] border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      </div>
                      <span className="font-mono text-[11px] text-white/75 truncate">
                        {activePortfolio.url}
                      </span>
                      <span className="font-mono text-[10px] text-primary-100 hidden sm:inline">
                        Hover to scroll
                      </span>
                    </div>

                    {/* Laptop Screen Viewport */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-b-[12px] bg-navy">
                      <img
                        src={activePortfolio.image}
                        alt={activePortfolio.imageAlt}
                        loading="lazy"
                        className="w-full h-[135%] object-cover object-top transition-transform duration-1000 ease-in-out group-hover:-translate-y-14"
                      />
                    </div>
                  </div>

                  {/* Overlapping Phone Mockup at Bottom-Right */}
                  <div className="hidden sm:block absolute -bottom-6 right-4 w-40 sm:w-44 rounded-[22px] bg-navy border-2 border-white/25 p-2 shadow-2xl">
                    <div className="w-10 h-1 rounded-full bg-white/25 mx-auto mb-1.5" />
                    <div className="relative aspect-[9/16] rounded-[14px] overflow-hidden bg-navy">
                      <img
                        src={activePortfolio.image}
                        alt={`${activePortfolio.name} mobile view`}
                        loading="lazy"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-navy/90 border border-white/15 text-[10px] font-mono text-primary-100 text-center">
                        Mobile 100%
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Project Details Panel (5 cols on lg) */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] bg-white/[0.05] border border-white/15 p-6 sm:p-8 backdrop-blur-md">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider">
                    {activePortfolio.industryTag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-primary-100 font-mono text-[11px] font-semibold">
                    {activePortfolio.stackTag}
                  </span>
                </div>

                <h3 className="text-[22px] sm:text-[26px] font-extrabold text-white leading-snug">
                  {activePortfolio.name}
                </h3>

                <p className="mt-3 text-[14px] sm:text-[15px] text-white/75 leading-relaxed">
                  {activePortfolio.summary}
                </p>

                {/* 2 Result Chips */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activePortfolio.results.map((res) => (
                    <div
                      key={res}
                      className="p-3 rounded-xl bg-primary/20 border border-primary/40 flex items-center gap-2 text-[13px] font-bold text-white"
                    >
                      <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href="/our-work"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-700 text-white text-[14px] font-semibold transition-all"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <span className="font-mono text-[11px] text-white/50">
                    {activePortfolio.url}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Row of 5 Clickable Project Thumbnails Below the Stage */}
          <div
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5"
            role="tablist"
            aria-label="Select Portfolio Website"
          >
            {PORTFOLIO_PROJECTS.map((proj) => {
              const isSelected = proj.id === activePortfolio.id;
              return (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActivePortfolioId(proj.id)}
                  className={`text-left p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-primary/25 border-primary shadow-lg'
                      : 'bg-white/[0.04] border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="rounded-xl overflow-hidden aspect-[16/9] bg-navy mb-2.5 border border-white/10">
                    <img
                      src={proj.image}
                      alt={proj.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-primary-100 truncate">
                      {proj.industryTag}
                    </div>
                    <div className="text-[13px] font-bold text-white truncate mt-0.5">
                      {proj.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 10 — GROW FURTHER — ADD-ON SERVICES (PLUG-IN CARDS) (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              ADD-ONS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Launch Is Just <span className="text-primary">the Beginning</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Plug any of these 4 growth modules directly into your new WebXCode website to scale
              rankings, uptime, lead capture, and paid traffic.
            </p>
          </div>

          {/* Hub Node on Far Left + 4 Horizontal Plug-In Cards Connected by Thin Blue Lines */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Far Left Website Core Hub Node (3 cols on lg) */}
            <div className="lg:col-span-3 relative">
              <div className="rounded-[24px] bg-navy text-white p-6 border border-navy shadow-xl text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Globe className="w-7 h-7" />
                </div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                  CORE_SYSTEM
                </div>
                <h3 className="text-[19px] font-extrabold text-white mt-1">
                  Your New Website
                </h3>
                <p className="text-[12px] text-white/70 mt-1.5">
                  Modular architecture ready for 1-click growth add-ons
                </p>
              </div>
            </div>

            {/* Right 4 Horizontal Plug-In Cards (9 cols on lg) */}
            <div className="lg:col-span-9 space-y-4 relative lg:pl-8">
              {/* Vertical & Horizontal Thin Blue Connector Lines on Desktop */}
              <div
                className="hidden lg:block absolute left-0 top-10 bottom-10 w-0.5 bg-primary/40"
                aria-hidden="true"
              />

              {ADDON_MODULES.map((mod) => (
                <div key={mod.id} className="relative">
                  {/* Horizontal connector line to card notch on desktop */}
                  <div
                    className="hidden lg:block absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-primary/40"
                    aria-hidden="true"
                  />

                  {/* Plug-in Card with Left Connector Notch */}
                  <Link
                    href={mod.to}
                    className="group relative rounded-[20px] bg-white border border-navy-08 hover:border-primary shadow-soft hover:shadow-soft-hover p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    {/* Left Connector Notch */}
                    <span
                      className="hidden lg:flex absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary-50 border-2 border-primary items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </span>

                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                        <ServiceIcon name={mod.iconName} className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-mono text-[11px] font-bold text-primary">
                          {mod.code}
                        </div>
                        <h3 className="text-[18px] font-extrabold text-navy group-hover:text-primary transition-colors">
                          {mod.title}
                        </h3>
                        <p className="text-[14px] text-navy-70 mt-0.5">{mod.oneLine}</p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-50 group-hover:bg-primary text-primary group-hover:text-white text-[13px] font-bold whitespace-nowrap self-start sm:self-center transition-colors shrink-0">
                      <span>Add This</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 11 — WEBSITE DEVELOPMENT FAQ (2-COLUMN ACCORDION) (bg: #f0f7fd)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              FAQ
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Website Questions, <span className="text-primary">Answered</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Everything you need to know about pricing, timelines, CMS editing, SEO migrations,
              and code ownership.
            </p>
          </div>

          {/* 2-Column Accordion Grid (8 questions) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {WEBSITE_DEV_FAQS.map((faq, idx) => {
              const isOpen = Boolean(openFaqIndices[idx]);
              return (
                <div
                  key={faq.q}
                  className={`rounded-[20px] bg-white border transition-all ${
                    isOpen
                      ? 'border-primary shadow-soft'
                      : 'border-navy-08 hover:border-primary/40'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleFaqIndex(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-[12px] font-extrabold text-primary bg-primary-50 px-2.5 py-1 rounded-lg shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <h3 className="text-[16px] sm:text-[17px] font-bold text-navy leading-snug">
                        {faq.q}
                      </h3>
                    </div>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
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
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-navy-08 text-[14px] sm:text-[15px] text-navy-70 leading-[1.7]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 12 — WEBSITE COST ESTIMATOR — CTA (navy rounded container)
         section id="estimator"
      ====================================================================== */}
      <section id="estimator" className="py-[72px] lg:py-[112px] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-[28px] bg-navy text-white p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-[540px] h-[540px] blue-glow-strong pointer-events-none opacity-75" />

            {/* Section Header inside Navy Container */}
            <div className="max-w-3xl mb-10 relative z-10">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                INTERACTIVE WEBSITE COST ESTIMATOR
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight">
                Estimate Your Website <span className="text-primary">Cost &amp; Timeline</span>
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] text-white/75 leading-[1.65]">
                Configure your website type, page count, design level, and extra features below for
                an instant indicative budget range.
              </p>
            </div>

            {/* Split Layout: Left White Estimator Card + Right Live Navy Glass Estimate Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
              {/* Left (7 cols on lg): White Configuration Card */}
              <div className="lg:col-span-7 rounded-[22px] bg-white text-navy p-6 sm:p-8 shadow-xl space-y-6">
                {/* 1. Website Type (Chips) */}
                <div>
                  <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2.5">
                    1. Website Type
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(
                      ['Business', 'Landing Page', 'E-commerce', 'Portfolio', 'Portal'] as EstimatorSiteType[]
                    ).map((typeOption) => {
                      const active = estType === typeOption;
                      return (
                        <button
                          key={typeOption}
                          type="button"
                          onClick={() => setEstType(typeOption)}
                          className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer border ${
                            active
                              ? 'bg-primary text-white border-primary shadow-xs'
                              : 'bg-primary-50/50 text-navy border-navy-15 hover:border-primary'
                          }`}
                        >
                          {typeOption}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Number of Pages (Slider 1 - 50) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="estimator-pages-slider"
                      className="text-[12px] font-bold uppercase tracking-[0.12em] text-navy-60"
                    >
                      2. Number of Pages
                    </label>
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[13px] font-extrabold">
                      {estPages} {estPages === 1 ? 'Page' : 'Pages'}
                    </span>
                  </div>
                  <input
                    id="estimator-pages-slider"
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={estPages}
                    aria-label="Number of pages"
                    aria-valuemin={1}
                    aria-valuemax={50}
                    aria-valuenow={estPages}
                    onChange={(e) => setEstPages(Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-primary-100 accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-navy-50 mt-1">
                    <span>1 page</span>
                    <span>15 pages</span>
                    <span>30 pages</span>
                    <span>50 pages</span>
                  </div>
                </div>

                {/* 3. Design & 5. Timeline in 2-col row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2.5">
                      3. Design Approach
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(['Template-based', 'Custom'] as EstimatorDesignType[]).map((des) => {
                        const active = estDesign === des;
                        return (
                          <button
                            key={des}
                            type="button"
                            onClick={() => setEstDesign(des)}
                            className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer border ${
                              active
                                ? 'bg-navy text-white border-navy'
                                : 'bg-primary-50/50 text-navy border-navy-15 hover:border-primary'
                            }`}
                          >
                            {des}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2.5">
                      4. Delivery Timeline
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(['Standard', 'Urgent'] as EstimatorTimelineType[]).map((tl) => {
                        const active = estTimeline === tl;
                        return (
                          <button
                            key={tl}
                            type="button"
                            onClick={() => setEstTimeline(tl)}
                            className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer border ${
                              active
                                ? 'bg-navy text-white border-navy'
                                : 'bg-primary-50/50 text-navy border-navy-15 hover:border-primary'
                            }`}
                          >
                            {tl}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 5. Extra Features (Checkbox Chips) */}
                <div>
                  <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2.5">
                    5. Extra Features (Select all that apply)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ESTIMATOR_CONFIG.addons.map((addon) => {
                      const isChecked = estAddons.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          role="checkbox"
                          aria-checked={isChecked}
                          onClick={() => toggleEstAddon(addon.id)}
                          className={`px-3.5 py-2 rounded-full text-[13px] font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer border ${
                            isChecked
                              ? 'bg-primary text-white border-primary'
                              : 'bg-primary-50/50 text-navy border-navy-15 hover:border-primary'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                          <span>{addon.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right (5 cols on lg): Live Estimate Navy Glass Card */}
              <div
                aria-live="polite"
                className="lg:col-span-5 rounded-[22px] bg-white/[0.07] border border-white/20 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Label + Currency Toggle ₹ / $ */}
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/15">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                      ESTIMATED INVESTMENT
                    </span>

                    <div
                      className="inline-flex items-center p-1 rounded-full bg-navy border border-white/20"
                      role="group"
                      aria-label="Select Currency"
                    >
                      <button
                        type="button"
                        onClick={() => setEstCurrency('INR')}
                        className={`px-3 py-1 rounded-full font-mono text-[12px] font-bold transition-colors cursor-pointer ${
                          estCurrency === 'INR'
                            ? 'bg-primary text-white'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        ₹ INR
                      </button>
                      <button
                        type="button"
                        onClick={() => setEstCurrency('USD')}
                        className={`px-3 py-1 rounded-full font-mono text-[12px] font-bold transition-colors cursor-pointer ${
                          estCurrency === 'USD'
                            ? 'bg-primary text-white'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        $ USD
                      </button>
                    </div>
                  </div>

                  {/* Price Range Output */}
                  <div className="mt-6">
                    <div className="text-[13px] text-white/70 font-medium">
                      Indicative Project Range
                    </div>
                    <div className="font-mono text-[28px] sm:text-[34px] font-extrabold text-white tabular-nums leading-tight mt-1">
                      {estimatorResult.rangeString}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/25 border border-primary/40 text-primary-100 font-mono text-[12px] font-bold">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>Estimated timeline: {estimatorResult.timelineString}</span>
                    </div>
                  </div>

                  {/* Selected Items Listed as Small Pills */}
                  <div className="mt-6 pt-5 border-t border-white/15">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2.5">
                      Your Configuration Summary
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[12px] font-semibold text-white">
                        {estType} Site
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[12px] font-semibold text-white">
                        {estPages} {estPages === 1 ? 'Page' : 'Pages'}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[12px] font-semibold text-white">
                        {estDesign} Design
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[12px] font-semibold text-white">
                        {estTimeline} Timeline
                      </span>
                      {estAddons.map((id) => {
                        const found = ESTIMATOR_CONFIG.addons.find((a) => a.id === id);
                        if (!found) return null;
                        return (
                          <span
                            key={id}
                            className="px-2.5 py-1 rounded-lg bg-primary/30 border border-primary/50 text-[12px] font-semibold text-white"
                          >
                            + {found.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* CTA Button + Disclaimer */}
                <div className="mt-8 pt-5 border-t border-white/15">
                  <button
                    type="button"
                    onClick={() => triggerQuoteModal('Website Development')}
                    className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-700 text-white font-bold text-[15px] shadow-soft hover:shadow-soft-hover inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Get My Exact Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="mt-3 text-center text-[11px] text-white/60">
                    Indicative estimate only. Final quote after a free consultation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 13 — RELATED SERVICES (white, compact horizontal row)
      ====================================================================== */}
      <section className="py-12 lg:py-16 bg-white border-t border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                WEB &amp; APPS PILLAR
              </span>
              <h2 className="text-[20px] sm:text-[24px] font-extrabold text-navy mt-0.5">
                Related Web &amp; App Services
              </h2>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary hover:text-navy transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Horizontal Row of Compact Service Chips */}
          <div className="flex flex-wrap items-center gap-2.5">
            {relatedWebServices.map((svc) => {
              const hasDedicatedPage =
                svc.slug === 'website-development' ||
                svc.slug === 'ecommerce-development' ||
                svc.slug === 'mobile-app-development' ||
                svc.slug === 'wordpress-shopify-development' ||
                svc.slug === 'website-maintenance-support' ||
                svc.slug === 'managed-it-services';
              return (
                <Link
                  key={svc.slug}
                  href={hasDedicatedPage ? svc.futurePagePath : `/services#${svc.slug}`}
                  className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-primary-50/60 hover:bg-navy border border-primary-100 hover:border-navy text-navy hover:text-white text-[13px] font-bold transition-all"
                >
                  <span className="text-primary group-hover:text-primary-100">
                    <ServiceIcon name={svc.icon} className="w-4 h-4" />
                  </span>
                  <span>{svc.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
            <Link
              href="/services/branding-logo-design"
              className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-primary-50/60 hover:bg-navy border border-primary-100 hover:border-navy text-navy hover:text-white text-[13px] font-bold transition-all"
            >
              <span>Branding &amp; Logo Design</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WebsiteDevelopment;


