'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Check,
  Play,
  MoveHorizontal,
  Sparkles,
  Layers,
  Globe,
  Star,
  Building2,
  ShoppingBag,
  Home,
  HeartPulse,
  GraduationCap,
  Landmark,
  Cpu,
  Plane,
  Factory,
  Plus,
  FolderSearch,
  AlertCircle,
  Zap,
  TrendingUp,
} from 'lucide-react';

/* ============================================================================
   IMAGE ASSETS
============================================================================ */
const IMG_HERO_SHOWCASE = '/images/hero_laptop_ui_showcase_1791104898778.jpg';
const IMG_SAAS = '/images/project_fintech_saas_ui_1791104929193.jpg';
const IMG_ECOM = '/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const IMG_AI = '/images/project_ai_enterprise_ui_1791104952051.jpg';
const IMG_OFFICE = '/images/why_webxcode_team_office_1791104914357.jpg';

/* ============================================================================
   PORTFOLIO DATA ARRAYS (single source of truth at top of file — placeholder data)
============================================================================ */

export type ProjectCategory =
  | 'Websites'
  | 'E-commerce'
  | 'Web Apps'
  | 'Mobile Apps'
  | 'AI Solutions'
  | 'SEO & Growth';

export type ProjectIndustry =
  | 'E-commerce'
  | 'Real Estate'
  | 'Healthcare'
  | 'Education'
  | 'Finance'
  | 'SaaS'
  | 'Travel'
  | 'Manufacturing';

export interface ProjectDataItem {
  id: string;
  title: string;
  client: string;
  country: string;
  flag: string;
  year: string;
  category: ProjectCategory;
  industry: ProjectIndustry;
  description: string;
  challenge?: string;
  solution?: string;
  resultSummary?: string;
  servicesProvided: string[];
  features: string[];
  techStack: string[];
  results: { value: string; label: string }[];
  images: string[];
  liveUrl: string;
  featured?: boolean;
  cardAspect?: 'tall' | 'standard' | 'compact';
}

/* 9 Placeholder Projects (+ 3 extra for "Load More Projects" demonstration) */
export const projects: ProjectDataItem[] = [
  {
    id: 'finpulse-analytics',
    title: 'FinPulse Enterprise Wealth & Analytics Platform',
    client: 'FinPulse Global Inc.',
    country: 'United States',
    flag: '🇺🇸',
    year: '2026',
    category: 'Web Apps',
    industry: 'Finance',
    description:
      'Placeholder project: Re-architected a multi-tenant financial analytics SaaS platform and marketing experience with real-time portfolio telemetry and AI-assisted lead qualification.',
    challenge:
      'Legacy dashboard suffered from 4.8s page loads and low enterprise trial-to-demo conversion across North American institutional buyers.',
    solution:
      'Engineered a Next.js 14 modular web app with streaming SSR, interactive KPI visualizations, and an embedded RAG qualification assistant.',
    resultSummary:
      'Organic traffic surged by +180%, qualified enterprise leads grew 2.5x, and global load times dropped to 1.2s.',
    servicesProvided: ['Web App Development', 'UI/UX Design System', 'Technical SEO & AEO'],
    features: [
      'Real-time multi-currency portfolio telemetry dashboard',
      'Role-based enterprise access control & SSO integration',
      'Automated AI lead qualification & calendar routing',
      '99/100 Google Lighthouse performance architecture',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    results: [
      { value: '+180%', label: 'Organic Traffic' },
      { value: '2.5x', label: 'Qualified Leads' },
      { value: '1.2s', label: 'Load Time' },
    ],
    images: [IMG_SAAS, IMG_HERO_SHOWCASE, IMG_AI],
    liveUrl: 'https://example.com/finpulse',
    featured: true,
    cardAspect: 'tall',
  },
  {
    id: 'lumina-architectural-commerce',
    title: 'Lumina Luxury Architectural Lighting Store',
    client: 'Lumina Living Ltd.',
    country: 'United Kingdom',
    flag: '🇬🇧',
    year: '2026',
    category: 'E-commerce',
    industry: 'E-commerce',
    description:
      'Placeholder project: Headless Shopify Plus storefront featuring interactive room lighting previews, B2B trade pricing tiers, and instant multi-currency checkout.',
    servicesProvided: ['Headless E-commerce', 'Shopify Plus', 'Conversion Rate Optimization'],
    features: [
      'Interactive fixture finish & lumen configurator',
      'Dedicated B2B interior designer trade portal',
      'One-click Apple Pay & localized multi-currency checkout',
    ],
    techStack: ['Shopify Plus', 'Next.js', 'Tailwind CSS', 'Stripe'],
    results: [
      { value: '+240%', label: 'Conversions' },
      { value: '+62%', label: 'Average Order Value' },
      { value: '0.9s', label: 'Page Transitions' },
    ],
    images: [IMG_ECOM, IMG_HERO_SHOWCASE],
    liveUrl: 'https://example.com/lumina',
    cardAspect: 'standard',
  },
  {
    id: 'urbannest-realty-ai-bot',
    title: 'UrbanNest 24/7 AI Property Concierge & Portal',
    client: 'UrbanNest Realty Group',
    country: 'India & UAE',
    flag: '🇮🇳',
    year: '2026',
    category: 'AI Solutions',
    industry: 'Real Estate',
    description:
      'Placeholder project: Omnichannel web and WhatsApp AI agent trained on 1,200+ luxury residential listings to qualify buyers and schedule site visits automatically.',
    servicesProvided: ['AI Chatbot Development', 'WhatsApp AI Agent', 'CRM Automation'],
    features: [
      'Bilingual English & Hindi conversational property matching',
      'Instant WhatsApp brochure delivery & floor-plan Q&A',
      'Real-time HubSpot & Salesforce site-visit booking sync',
    ],
    techStack: ['OpenAI GPT-4o', 'LangChain', 'WhatsApp API', 'Next.js'],
    results: [
      { value: '3.4x', label: 'Booked Site Visits' },
      { value: '72%', label: 'Support Automated' },
      { value: '<3s', label: 'Response Time' },
    ],
    images: [IMG_AI, IMG_SAAS],
    liveUrl: 'https://example.com/urbannest',
    cardAspect: 'tall',
  },
  {
    id: 'medcore-telehealth-mobile',
    title: 'MedCore Patient Care & Telemedicine Super-App',
    client: 'MedCore Health Systems',
    country: 'United States',
    flag: '🇺🇸',
    year: '2025',
    category: 'Mobile Apps',
    industry: 'Healthcare',
    description:
      'Placeholder project: Cross-platform iOS and Android patient app with HD video consultations, digital prescriptions, and AI symptom triage.',
    servicesProvided: ['Mobile App Development', 'UI/UX Design', 'HIPAA-Ready Cloud API'],
    features: [
      'Encrypted one-tap video consultations with specialists',
      'Automated appointment reminders & lab report vault',
      'AI pre-visit symptom intake questionnaire',
    ],
    techStack: ['React Native', 'TypeScript', 'Node.js', 'AWS'],
    results: [
      { value: '4.9★', label: 'App Store Rating' },
      { value: '+145%', label: 'Patient Retention' },
      { value: '85K+', label: 'Active Users' },
    ],
    images: [IMG_HERO_SHOWCASE, IMG_SAAS],
    liveUrl: 'https://example.com/medcore',
    cardAspect: 'standard',
  },
  {
    id: 'aethercloud-seo-aeo-growth',
    title: 'AetherCloud B2B SaaS Organic & AEO Growth Engine',
    client: 'AetherCloud AI',
    country: 'Canada',
    flag: '🇨🇦',
    year: '2026',
    category: 'SEO & Growth',
    industry: 'SaaS',
    description:
      'Placeholder project: Programmatic SEO architecture, Answer Engine Optimization (AEO), and high-intent Google Ads funnels for an enterprise cloud security platform.',
    servicesProvided: ['Technical SEO', 'AEO / GEO Optimization', 'Google Ads'],
    features: [
      '150+ programmatic comparison & integration landing pages',
      'Schema.org knowledge graph for ChatGPT & Perplexity citations',
      'High-ROAS search & remarketing ad funnels',
    ],
    techStack: ['Next.js', 'Schema JSON-LD', 'GA4', 'Google Ads'],
    results: [
      { value: '+310%', label: 'Organic Pipeline' },
      { value: '4.6x', label: 'Return on Ad Spend' },
      { value: 'Top 3', label: 'AI Search Citations' },
    ],
    images: [IMG_SAAS, IMG_AI],
    liveUrl: 'https://example.com/aethercloud',
    cardAspect: 'compact',
  },
  {
    id: 'eduverse-learning-campus',
    title: 'EduVerse Interactive Cohort & LMS Web Platform',
    client: 'EduVerse Academy',
    country: 'Singapore',
    flag: '🇸🇬',
    year: '2025',
    category: 'Web Apps',
    industry: 'Education',
    description:
      'Placeholder project: Scalable EdTech web application with live coding sandboxes, AI tutor assistance, and automated certification issuance.',
    servicesProvided: ['Custom Web Application', 'AI Tutor Integration', 'Cloud Scaling'],
    features: [
      'Interactive video classrooms & peer code review',
      '24/7 AI mentor trained on course curriculum',
      'Global Stripe & Razorpay subscription billing',
    ],
    techStack: ['React', 'Python FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    results: [
      { value: '+92%', label: 'Course Completion' },
      { value: '120K', label: 'Enrolled Learners' },
      { value: '99.98%', label: 'Platform Uptime' },
    ],
    images: [IMG_AI, IMG_HERO_SHOWCASE],
    liveUrl: 'https://example.com/eduverse',
    cardAspect: 'tall',
  },
  {
    id: 'azure-horizon-luxury-travel',
    title: 'AzureHorizon Bespoke Yacht & Resort Booking Web',
    client: 'AzureHorizon Voyages',
    country: 'UAE',
    flag: '🇦🇪',
    year: '2025',
    category: 'Websites',
    industry: 'Travel',
    description:
      'Placeholder project: Editorial luxury travel website with real-time charter availability, interactive itinerary builder, and multilingual Arabic/English support.',
    servicesProvided: ['Custom Website Design', 'CMS Architecture', 'International SEO'],
    features: [
      'Real-time yacht & private villa availability calendar',
      'Custom 60fps scroll storytelling & map itineraries',
      'RTL Arabic & English localization',
    ],
    techStack: ['Next.js', 'Framer Motion', 'Sanity CMS', 'Tailwind CSS'],
    results: [
      { value: '+195%', label: 'Charter Inquiries' },
      { value: '1.1s', label: 'LCP Speed Score' },
      { value: '+88%', label: 'Mobile Bookings' },
    ],
    images: [IMG_ECOM, IMG_OFFICE],
    liveUrl: 'https://example.com/azurehorizon',
    cardAspect: 'standard',
  },
  {
    id: 'kinetix-industrial-b2b',
    title: 'Kinetix Precision Robotics & Manufacturing Portal',
    client: 'Kinetix Industrial Systems',
    country: 'Germany & India',
    flag: '🇮🇳',
    year: '2025',
    category: 'Websites',
    industry: 'Manufacturing',
    description:
      'Placeholder project: Enterprise B2B digital catalog and RFQ configurator for an industrial automation manufacturer exporting to 30+ countries.',
    servicesProvided: ['B2B Website Development', '3D Spec Configurator', 'Global SEO'],
    features: [
      'Parametric CAD spec sheet finder & instant RFQ generator',
      'Distributor portal with live inventory sync',
      'Multi-region SEO targeting US, EU and APAC buyers',
    ],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'GraphQL'],
    results: [
      { value: '+215%', label: 'Global RFQ Leads' },
      { value: '18', label: 'New Export Markets' },
      { value: '98/100', label: 'Core Web Vitals' },
    ],
    images: [IMG_HERO_SHOWCASE, IMG_SAAS],
    liveUrl: 'https://example.com/kinetix',
    cardAspect: 'compact',
  },
  {
    id: 'veloce-ev-companion-app',
    title: 'Veloce Smart EV Charging & Fleet Mobile App',
    client: 'Veloce Mobility',
    country: 'Australia',
    flag: '🇦🇺',
    year: '2026',
    category: 'Mobile Apps',
    industry: 'Travel',
    description:
      'Placeholder project: Consumer and fleet mobile app for locating high-speed EV chargers, reserving slots, and automating fleet expense telemetry.',
    servicesProvided: ['iOS & Android App', 'IoT Telemetry Dashboard', 'UI/UX Design'],
    features: [
      'Live charger occupancy map & route planner',
      'QR-code instant plug-and-charge wallet',
      'Enterprise fleet energy analytics portal',
    ],
    techStack: ['React Native', 'Go', 'PostgreSQL', 'AWS IoT'],
    results: [
      { value: '2.8x', label: 'Charging Sessions' },
      { value: '4.8★', label: 'User Rating' },
      { value: '-40%', label: 'Support Tickets' },
    ],
    images: [IMG_AI, IMG_ECOM],
    liveUrl: 'https://example.com/veloce',
    cardAspect: 'standard',
  },
  {
    id: 'novaretail-omnichannel-store',
    title: 'NovaRetail High-Volume D2C Fashion Storefront',
    client: 'NovaRetail Group',
    country: 'India',
    flag: '🇮🇳',
    year: '2025',
    category: 'E-commerce',
    industry: 'E-commerce',
    description:
      'Placeholder project: Ultra-fast D2C e-commerce platform with AI size recommendations, WhatsApp cart recovery, and sub-second collection filtering.',
    servicesProvided: ['E-commerce Development', 'AI Personalization', 'Performance Marketing'],
    features: [
      'AI virtual fit & size predictor reducing returns by 32%',
      'Automated WhatsApp abandoned-cart recovery flows',
      'Instant facet filtering across 10,000+ SKUs',
    ],
    techStack: ['Shopify Plus', 'React', 'Tailwind CSS', 'WhatsApp API'],
    results: [
      { value: '+175%', label: 'Repeat Purchases' },
      { value: '-32%', label: 'Size Returns' },
      { value: '3.9x', label: 'ROAS' },
    ],
    images: [IMG_ECOM, IMG_AI],
    liveUrl: 'https://example.com/novaretail',
    cardAspect: 'tall',
  },
  {
    id: 'apex-voice-ai-concierge',
    title: 'Apex Capital Autonomous AI Voice & Lead Agent',
    client: 'Apex Capital Advisors',
    country: 'United States',
    flag: '🇺🇸',
    year: '2026',
    category: 'AI Solutions',
    industry: 'Finance',
    description:
      'Placeholder project: Low-latency inbound and outbound AI voice agent that answers investor FAQs and books qualified wealth-advisory calls 24/7.',
    servicesProvided: ['AI Voice Agent', 'Custom LLM RAG', 'CRM Workflow Sync'],
    features: [
      'Sub-500ms natural human-like voice response latency',
      'Real-time calendar availability check & booking',
      'Automatic call transcript & sentiment logging in CRM',
    ],
    techStack: ['OpenAI Realtime', 'Python', 'Twilio', 'HubSpot API'],
    results: [
      { value: '100%', label: 'Calls Answered 24/7' },
      { value: '+160%', label: 'Advisor Bookings' },
      { value: '68%', label: 'Lower Cost/Lead' },
    ],
    images: [IMG_AI, IMG_SAAS],
    liveUrl: 'https://example.com/apex-ai',
    cardAspect: 'standard',
  },
  {
    id: 'skyline-proptech-seo',
    title: 'Skyline Commercial PropTech Portal & SEO Scale',
    client: 'Skyline Estates',
    country: 'United Kingdom',
    flag: '🇬🇧',
    year: '2025',
    category: 'SEO & Growth',
    industry: 'Real Estate',
    description:
      'Placeholder project: Complete website overhaul and local/international SEO campaign for a commercial real estate brokerage in London and Dubai.',
    servicesProvided: ['Website Redesign', 'Local & International SEO', 'Lead Funnel'],
    features: [
      'Interactive neighborhood yield & ROI calculators',
      'Automated city-level landing pages with live listings',
      'Instant investor pitch-deck download gates',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity'],
    results: [
      { value: '+260%', label: 'Organic Inquiries' },
      { value: '#1', label: 'Target City Keywords' },
      { value: '1.3s', label: 'Page Load Time' },
    ],
    images: [IMG_HERO_SHOWCASE, IMG_ECOM],
    liveUrl: 'https://example.com/skyline',
    cardAspect: 'compact',
  },
];

/* Separate Case Studies Data Array (Section 5) */
export interface CaseStudyRowItem {
  id: string;
  projectId: string;
  industryTag: string;
  title: string;
  floatingChip: string;
  image: string;
  imageAlt: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: { value: string; label: string }[];
}

export const CASE_STUDIES_DATA: CaseStudyRowItem[] = [
  {
    id: 'cs-ecommerce',
    projectId: 'lumina-architectural-commerce',
    industryTag: 'E-COMMERCE STORE REDESIGN · UK',
    title: 'How Lumina Living Increased Online Checkout Conversions by 240%',
    floatingChip: '+240% Conversions',
    image: IMG_ECOM,
    imageAlt: 'Lumina Living headless Shopify Plus e-commerce storefront redesign',
    challenge:
      'A slow monolithic store with 5.2s load times and a complex 5-step checkout caused 78% mobile cart abandonment.',
    solution:
      'Rebuilt on a headless Next.js + Shopify Plus architecture with an interactive lighting configurator and 1-click express checkout.',
    result:
      'Checkout conversions jumped 240% within 60 days while average order value rose by 62% across UK and EU markets.',
    metrics: [
      { value: '+240%', label: 'Checkout Conversions' },
      { value: '+62%', label: 'Average Order Value' },
      { value: '0.9s', label: 'Page Load Speed' },
    ],
  },
  {
    id: 'cs-ai-realestate',
    projectId: 'urbannest-realty-ai-bot',
    industryTag: 'AI CHATBOT FOR REAL ESTATE · INDIA & UAE',
    title: 'Automating 72% of Property Inquiries & 3.4x Site Visits with WhatsApp AI',
    floatingChip: '3.4x Site Visits',
    image: IMG_AI,
    imageAlt: 'UrbanNest Realty AI chatbot and WhatsApp property assistant dashboard',
    challenge:
      'Sales reps missed over 60% of after-hours property inquiries from NRI and international investors across time zones.',
    solution:
      'Deployed a custom RAG-trained Web + WhatsApp AI Concierge integrated directly with inventory availability and CRM calendars.',
    result:
      'Instant <3-second responses 24/7 increased qualified site-visit bookings by 3.4x and freed sales teams from repetitive qualification.',
    metrics: [
      { value: '3.4x', label: 'Qualified Site Visits' },
      { value: '72%', label: 'Inquiries Automated' },
      { value: '24/7', label: 'Instant Response' },
    ],
  },
  {
    id: 'cs-saas-seo',
    projectId: 'aethercloud-seo-aeo-growth',
    industryTag: 'SEO & AEO GROWTH FOR SAAS · NORTH AMERICA',
    title: 'Scaling Organic Enterprise Pipeline by 310% Through Technical SEO & AEO',
    floatingChip: '+310% Organic Pipeline',
    image: IMG_SAAS,
    imageAlt: 'AetherCloud B2B SaaS organic traffic and SEO analytics growth dashboard',
    challenge:
      'High dependency on expensive paid search ads with minimal visibility on Google page 1 or AI answer engines.',
    solution:
      'Engineered 150+ high-intent programmatic comparison pages, Schema.org entity graphs, and Core Web Vitals optimization.',
    result:
      'Organic demo pipeline expanded by 310% in 6 months and secured top-3 citations across Google AI Overviews and ChatGPT search.',
    metrics: [
      { value: '+310%', label: 'Organic Demo Pipeline' },
      { value: '99/100', label: 'Core Web Vitals' },
      { value: '4.6x', label: 'Blended ROAS' },
    ],
  },
];

/* Before & After Redesign Transformations Data Array (Section 6) */
export interface BeforeAfterItem {
  id: string;
  tabTitle: string;
  clientName: string;
  summary: string;
  beforeImage: string;
  afterImage: string;
  beforeIssues: string[];
  afterWins: string[];
  chips: [string, string, string];
}

export const BEFORE_AFTER_PROJECTS: BeforeAfterItem[] = [
  {
    id: 'ba-fintech',
    tabTitle: 'FinPulse SaaS Redesign',
    clientName: 'FinPulse Enterprise Analytics',
    summary: 'Transformed a cluttered 2019 legacy portal into a high-converting dark/light modern SaaS platform.',
    beforeImage: IMG_OFFICE,
    afterImage: IMG_SAAS,
    beforeIssues: ['Cluttered navigation & low contrast', '4.8s load time on mobile', '1.1% demo conversion rate'],
    afterWins: ['Clean visual hierarchy & design system', '1.2s sub-second SSR speed', '3.8% enterprise demo conversion'],
    chips: ['Modern UI', '3x Faster', 'Mobile-First'],
  },
  {
    id: 'ba-ecommerce',
    tabTitle: 'Lumina Storefront Overhaul',
    clientName: 'Lumina Architectural Lighting',
    summary: 'Replaced a slow template store with a bespoke headless commerce experience.',
    beforeImage: IMG_HERO_SHOWCASE,
    afterImage: IMG_ECOM,
    beforeIssues: ['Generic template layout', '5-step high-friction checkout', 'Poor mobile product filtering'],
    afterWins: ['Editorial luxury product showcase', '1-click express checkout', '+240% conversion lift'],
    chips: ['Modern UI', '3x Faster', 'Mobile-First'],
  },
  {
    id: 'ba-ai-platform',
    tabTitle: 'AetherFlow AI Hub',
    clientName: 'AetherFlow Automation',
    summary: 'Redesigned technical documentation and product workflows into an intuitive interactive hub.',
    beforeImage: IMG_OFFICE,
    afterImage: IMG_AI,
    beforeIssues: ['Text-heavy static pages', 'No interactive product preview', 'High bounce rate (74%)'],
    afterWins: ['Live interactive AI agent sandbox', 'Clear 3-step onboarding flow', 'Bounce rate reduced to 31%'],
    chips: ['Modern UI', '3x Faster', 'Mobile-First'],
  },
];

/* Stats & Logos Data Array (Section 2) */
export const WORK_IMPACT_STATS = [
  { target: 100, suffix: '+', label: 'Projects Delivered' },
  { target: 20, suffix: '+', label: 'Countries' },
  { target: 12, suffix: '', label: 'Industries' },
  { target: 98, suffix: '%', label: 'Client Satisfaction' },
];

export const TRUSTED_BRAND_LOGOS = [
  { name: 'FinPulse', tag: 'FINTECH' },
  { name: 'Lumina', tag: 'COMMERCE' },
  { name: 'AetherCloud', tag: 'ENTERPRISE AI' },
  { name: 'UrbanNest', tag: 'PROPTECH' },
  { name: 'MedCore', tag: 'HEALTHCARE' },
  { name: 'EduVerse', tag: 'EDTECH' },
  { name: 'Kinetix', tag: 'ROBOTICS' },
  { name: 'Veloce', tag: 'MOBILITY' },
];

/* Client Voices Video Testimonials + Quotes Data Array (Section 8) */
export interface VideoTestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  flag: string;
  country: string;
  quote: string;
  duration: string;
  metric: string;
  image: string;
}

export const VIDEO_TESTIMONIALS: VideoTestimonialItem[] = [
  {
    id: 'vid-david',
    name: 'David Miller',
    role: 'VP of Growth',
    company: 'FinPulse Global',
    flag: '🇺🇸',
    country: 'United States',
    quote:
      'WebXCode re-architected our entire web platform and AI qualification flow, lifting enterprise demo bookings by 180% in 90 days.',
    duration: '1:15',
    metric: '+180% Enterprise Demos',
    image: IMG_SAAS,
  },
  {
    id: 'vid-sarah',
    name: 'Sarah Jenkins',
    role: 'Head of Digital',
    company: 'Lumina Living UK',
    flag: '🇬🇧',
    country: 'United Kingdom',
    quote:
      'Our headless Shopify Plus store launched ahead of schedule and immediately doubled mobile checkout conversions.',
    duration: '0:58',
    metric: '+240% Conversions',
    image: IMG_ECOM,
  },
  {
    id: 'vid-rahul',
    name: 'Rahul Mehta',
    role: 'Founder & CEO',
    company: 'UrbanNest Realty',
    flag: '🇮🇳',
    country: 'India',
    quote:
      'The custom WhatsApp and Web AI agent built by WebXCode handles 72% of buyer inquiries automatically 24/7.',
    duration: '1:24',
    metric: '3.4x Site Visits',
    image: IMG_AI,
  },
];

export const SHORT_CLIENT_QUOTES = [
  { text: '“Delivered our SaaS platform 2 weeks early with a 99 Lighthouse score.”', author: 'CTO, AetherCloud (Canada)' },
  { text: '“Best engineering and SEO partner we have worked with in 8 years.”', author: 'MD, Skyline Estates (UK)' },
  { text: '“Our AI voice agent books 40+ qualified consultations every week.”', author: 'Partner, Apex Capital (USA)' },
  { text: '“Zero-downtime migration and +215% global B2B RFQ leads.”', author: 'VP Sales, Kinetix (India)' },
  { text: '“Clean code, transparent communication, and measurable ROI.”', author: 'Founder, EduVerse (Singapore)' },
];

/* ============================================================================
   SHARED UI HELPERS (self-contained inside OurWork.tsx)
============================================================================ */

const SectionLabel: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({
  children,
  dark = false,
}) => (
  <span
    className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-[0.12em] whitespace-nowrap ${
      dark
        ? 'bg-primary/20 text-white border border-primary/35'
        : 'bg-primary-50 text-primary'
    }`}
  >
    {children}
  </span>
);

const SectionHeading: React.FC<{
  label?: string;
  firstPart: string;
  highlightPart: string;
  lastPart?: string;
  dark?: boolean;
  align?: 'left' | 'center';
  className?: string;
}> = ({
  label,
  firstPart,
  highlightPart,
  lastPart,
  dark = false,
  align = 'left',
  className = '',
}) => (
  <div className={`${align === 'center' ? 'text-center mx-auto max-w-3xl' : ''} ${className}`}>
    {label && (
      <div className={`mb-4 ${align === 'center' ? 'flex justify-center' : ''}`}>
        <SectionLabel dark={dark}>{label}</SectionLabel>
      </div>
    )}
    <h2
      className={`text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] tracking-[-0.02em] ${
        dark ? 'text-white' : 'text-navy'
      }`}
    >
      {firstPart}{' '}
      <span className="text-primary">{highlightPart}</span>
      {lastPart ? ` ${lastPart}` : ''}
    </h2>
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline-dark' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  iconLeft?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  showArrow = true,
  href,
  target,
  rel,
  iconLeft,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2.5 text-[14px]',
    md: 'px-6 py-3.5 text-[15px]',
    lg: 'px-7 py-4 text-[16px]',
  }[size];

  const variantClasses = {
    primary:
      'bg-primary text-white hover:bg-primary-700 shadow-[0_8px_20px_-4px_rgba(5,113,194,0.45)] hover:shadow-[0_12px_26px_-4px_rgba(5,113,194,0.65)]',
    'outline-dark':
      'border border-white/25 text-white hover:bg-white/10 hover:border-white/50',
    'outline-light':
      'border border-navy-15 text-navy hover:border-primary hover:text-primary hover:bg-primary-50',
  }[variant];

  const baseClasses = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={baseClasses}>
        {iconLeft}
        <span>{children}</span>
        {showArrow && (
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </a>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {iconLeft}
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </button>
  );
};

const CountUpStat: React.FC<{ target: number; suffix: string }> = ({ target, suffix }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const duration = 1100;
    const steps = 28;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

/* ============================================================================
   1. PAGE HERO — TILTED SHOWCASE WALL (navy)
============================================================================ */
const TiltedShowcaseHero: React.FC<{
  onOpenQuoteModal: (service?: string) => void;
}> = ({ onOpenQuoteModal }) => {
  const prefersReducedMotion = useReducedMotion();

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const col1 = [projects[0], projects[1], projects[2], projects[0], projects[1], projects[2]];
  const col2 = [projects[3], projects[4], projects[5], projects[3], projects[4], projects[5]];
  const col3 = [projects[6], projects[7], projects[8], projects[6], projects[7], projects[8]];

  return (
    <section className="relative bg-navy text-white pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
      {/* Blue Radial Glows */}
      <div className="absolute -top-28 -left-28 w-[560px] h-[560px] blue-glow pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[680px] h-[680px] blue-glow-strong pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Breadcrumb: Home › Our Work */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white/65"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-primary font-semibold" aria-current="page">
                Our Work
              </span>
            </nav>

            <div>
              <SectionLabel dark>OUR WORK</SectionLabel>
            </div>

            <h1 className="text-[38px] sm:text-[50px] lg:text-[60px] font-extrabold leading-[1.08] tracking-[-0.025em] text-white">
              Work That <span className="text-primary">Speaks for Itself</span>
            </h1>

            <p className="text-[16px] sm:text-[18px] text-white/75 leading-[1.7] max-w-xl">
              A look at the websites, web apps and AI solutions we've built for businesses across
              India, the US and the world.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button size="lg" onClick={scrollToPortfolio}>
                Explore Projects
              </Button>
              <Button
                variant="outline-dark"
                size="lg"
                showArrow={false}
                onClick={() => onOpenQuoteModal('Start a New Project')}
              >
                Start Your Project
              </Button>
            </div>

            {/* Handwritten Caveat Annotation pointing toward the Showcase Wall */}
            <div className="hidden sm:inline-flex items-center gap-3 pt-3 text-white/90">
              <span className="font-script text-[24px] tracking-wide -rotate-2">
                Every pixel with a purpose
              </span>
              <svg
                width="54"
                height="28"
                viewBox="0 0 54 28"
                fill="none"
                className="text-primary shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M2 20C18 24 34 18 48 6M48 6L38 6M48 6L46 16"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Right: 3D-Tilted Wall of Project Screenshots (Desktop: 3 vertical auto-scrolling columns) */}
          <div className="hidden lg:block lg:col-span-6 relative h-[500px] overflow-hidden rounded-[24px] border border-white/10 bg-navy/60">
            {/* Top & Bottom Navy Gradient Fades */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-navy via-navy/70 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy via-navy/70 to-transparent z-20 pointer-events-none" />

            {/* 3D Perspective Rotated Wall (~ -12deg X / 18deg Z) */}
            <div
              className="grid grid-cols-3 gap-4 px-4 -my-12"
              style={{
                transform: 'perspective(1100px) rotateX(12deg) rotateZ(-14deg) scale(1.06)',
                transformOrigin: 'center center',
              }}
            >
              {/* Column 1 — scrolls upward */}
              <motion.div
                animate={prefersReducedMotion ? { y: 0 } : { y: ['0%', '-50%'] }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                className="space-y-4"
              >
                {col1.map((proj, idx) => (
                  <div
                    key={`c1-${proj.id}-${idx}`}
                    className="rounded-[16px] overflow-hidden border border-white/15 bg-navy shadow-xl"
                  >
                    <div className="bg-white/10 px-2.5 py-1.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <img
                      src={proj.images[0]}
                      alt={`${proj.title} interface preview`}
                      loading="lazy"
                      className="w-full aspect-[16/11] object-cover"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Column 2 — scrolls downward */}
              <motion.div
                animate={prefersReducedMotion ? { y: 0 } : { y: ['-50%', '0%'] }}
                transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                className="space-y-4"
              >
                {col2.map((proj, idx) => (
                  <div
                    key={`c2-${proj.id}-${idx}`}
                    className="rounded-[16px] overflow-hidden border border-white/15 bg-navy shadow-xl"
                  >
                    <div className="bg-white/10 px-2.5 py-1.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <img
                      src={proj.images[0]}
                      alt={`${proj.title} interface preview`}
                      loading="lazy"
                      className="w-full aspect-[16/11] object-cover"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Column 3 — scrolls upward */}
              <motion.div
                animate={prefersReducedMotion ? { y: 0 } : { y: ['0%', '-50%'] }}
                transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                className="space-y-4"
              >
                {col3.map((proj, idx) => (
                  <div
                    key={`c3-${proj.id}-${idx}`}
                    className="rounded-[16px] overflow-hidden border border-white/15 bg-navy shadow-xl"
                  >
                    <div className="bg-white/10 px-2.5 py-1.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <img
                      src={proj.images[0]}
                      alt={`${proj.title} interface preview`}
                      loading="lazy"
                      className="w-full aspect-[16/11] object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Mobile / Tablet: Single Horizontal Auto-Scrolling Row Below Text */}
          <div className="lg:hidden overflow-hidden -mx-4 px-4">
            <motion.div
              animate={prefersReducedMotion ? { x: 0 } : { x: ['0%', '-50%'] }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="flex gap-4 w-max"
            >
              {[...projects.slice(0, 6), ...projects.slice(0, 6)].map((proj, idx) => (
                <div
                  key={`mob-${proj.id}-${idx}`}
                  className="w-[240px] shrink-0 rounded-[16px] overflow-hidden border border-white/15 bg-navy shadow-lg"
                >
                  <div className="bg-white/10 px-3 py-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <span className="text-[10px] font-bold text-primary">{proj.category}</span>
                  </div>
                  <img
                    src={proj.images[0]}
                    alt={`${proj.title} mobile preview`}
                    loading="lazy"
                    className="w-full aspect-[16/10] object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   2. IMPACT NUMBERS + CLIENT LOGOS (white, compact padding, 2 rows)
============================================================================ */
const ImpactAndLogosSection: React.FC = () => {
  return (
    <section className="bg-white py-12 lg:py-16 border-b border-navy-08">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        {/* Row 1: 4 Stats in a Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-navy-08">
          {WORK_IMPACT_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`text-center ${idx > 0 ? 'lg:pl-8' : ''} pt-4 sm:pt-0`}
            >
              <div className="text-[36px] sm:text-[44px] font-extrabold text-primary leading-none tracking-tight mb-1.5">
                <CountUpStat target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-[14px] sm:text-[15px] font-bold text-navy-70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Thin Label "Brands that trust us" + One-Line Grayscale Logo Row */}
        <div className="pt-8 border-t border-navy-08 relative overflow-hidden">
          <div className="text-center text-[11px] font-extrabold uppercase tracking-[0.18em] text-navy-50 mb-5">
            Brands that trust us
          </div>

          {/* Fade Edges */}
          <div className="pointer-events-none absolute left-0 top-10 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-10 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-1">
            {TRUSTED_BRAND_LOGOS.map((brand) => (
              <div
                key={brand.name}
                className="group px-5 py-3 rounded-xl border border-navy-08 bg-white grayscale opacity-65 hover:grayscale-0 hover:opacity-100 hover:border-primary-100 hover:bg-primary-50/40 transition-all duration-200 shrink-0 flex items-center gap-2.5 cursor-default"
              >
                <span className="w-7 h-7 rounded-lg bg-primary text-white font-extrabold text-[12px] flex items-center justify-center">
                  {brand.name.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <div className="text-[14px] font-extrabold text-navy group-hover:text-primary transition-colors leading-none">
                    {brand.name}
                  </div>
                  <div className="text-[9px] font-bold tracking-widest text-primary mt-0.5">
                    {brand.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   3. FEATURED CASE STUDY SPOTLIGHT (light blue tint — 55/45 split card)
============================================================================ */
const FeaturedSpotlightSection: React.FC<{
  onOpenProjectModal: (project: ProjectDataItem) => void;
}> = ({ onOpenProjectModal }) => {
  const spotlight = projects.find((p) => p.featured) || projects[0];

  return (
    <section className="bg-primary-50 py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          label="FEATURED PROJECT"
          firstPart="Spotlight:"
          highlightPart="FinPulse Enterprise Platform"
          className="mb-10"
        />

        {/* Full-Width Rounded 28px Card Split 55 / 45 */}
        <div className="bg-white rounded-[28px] border border-navy-08 shadow-xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 55% (7 cols): Desktop Browser Mockup + Overlapping Phone Mockup */}
          <div className="lg:col-span-7 relative pb-6 sm:pb-10 sm:pr-8">
            {/* Desktop Browser Frame */}
            <div className="rounded-[20px] overflow-hidden border border-navy-15 bg-navy shadow-xl">
              <div className="bg-navy px-4 py-3 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
                <div className="px-3.5 py-1 rounded-full bg-white/10 text-[11px] text-white/75 font-medium">
                  https://app.finpulse.io
                </div>
                <span className="text-[11px] font-bold text-primary">Enterprise SaaS</span>
              </div>
              <div className="aspect-[16/10] overflow-hidden bg-navy">
                <img
                  src={spotlight.images[0]}
                  alt={`${spotlight.title} desktop dashboard view`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Overlapping Mobile Phone Mockup at Bottom-Right */}
            <div className="hidden sm:block absolute bottom-0 right-0 w-[34%] max-w-[195px] rounded-[24px] p-2 bg-navy border-4 border-white shadow-2xl">
              <div className="w-10 h-1 rounded-full bg-white/25 mx-auto mb-1.5" />
              <div className="rounded-[16px] overflow-hidden aspect-[9/16] bg-navy">
                <img
                  src={spotlight.images[1] || spotlight.images[0]}
                  alt={`${spotlight.title} mobile responsive view`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right 45% (5 cols): Details, 3 Story Blocks, Metrics, Tech Pills & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Client Name + Industry Tag Pill + Country Flag */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[15px] font-extrabold text-navy">{spotlight.client}</span>
              <span className="text-navy-30">•</span>
              <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-[12px] font-bold">
                {spotlight.industry}
              </span>
              <span className="text-[14px] font-semibold text-navy-70">
                {spotlight.flag} {spotlight.country}
              </span>
            </div>

            {/* 3 Short Blocks with Blue Icons: The Challenge · Our Solution · The Result */}
            <div className="space-y-4">
              {[
                {
                  icon: AlertCircle,
                  label: 'The Challenge',
                  text: spotlight.challenge,
                },
                {
                  icon: Zap,
                  label: 'Our Solution',
                  text: spotlight.solution,
                },
                {
                  icon: TrendingUp,
                  label: 'The Result',
                  text: spotlight.resultSummary,
                },
              ].map((block) => {
                const IconComp = block.icon;
                return (
                  <div key={block.label} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <IconComp className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-extrabold text-navy leading-snug">
                        {block.label}
                      </h3>
                      <p className="text-[13px] sm:text-[14px] text-navy-70 leading-relaxed line-clamp-2">
                        {block.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3 Result Metrics in a Row */}
            <div className="grid grid-cols-3 gap-3 py-4 px-4 rounded-2xl bg-primary-50/60 border border-primary-100">
              {spotlight.results.map((res) => (
                <div key={res.label} className="text-center">
                  <div className="text-[22px] sm:text-[26px] font-extrabold text-primary leading-none tabular-nums">
                    {res.value}
                  </div>
                  <div className="text-[11px] font-bold text-navy-70 mt-1">{res.label}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack Logo Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {spotlight.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-navy/[0.05] text-navy font-bold text-[12px]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons: Primary "View Case Study →" + Text Link "Visit Live Site ↗" */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Button size="md" onClick={() => onOpenProjectModal(spotlight)}>
                View Case Study
              </Button>
              <a
                href={spotlight.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] font-extrabold text-primary hover:underline underline-offset-4"
              >
                <span>Visit Live Site</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   4. PORTFOLIO GRID WITH FILTERS (white — #portfolio)
============================================================================ */
const CATEGORIES_LIST: ('All' | ProjectCategory)[] = [
  'All',
  'Websites',
  'E-commerce',
  'Web Apps',
  'Mobile Apps',
  'AI Solutions',
  'SEO & Growth',
];

const INDUSTRIES_LIST: ('All' | ProjectIndustry)[] = [
  'All',
  'E-commerce',
  'Real Estate',
  'Healthcare',
  'Education',
  'Finance',
  'SaaS',
  'Travel',
  'Manufacturing',
];

const PortfolioGridSection: React.FC<{
  selectedCategory: 'All' | ProjectCategory;
  setSelectedCategory: (cat: 'All' | ProjectCategory) => void;
  selectedIndustry: 'All' | ProjectIndustry;
  setSelectedIndustry: (ind: 'All' | ProjectIndustry) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenProjectModal: (
    project: ProjectDataItem,
    triggerButton: HTMLButtonElement | null
  ) => void;
}> = ({
  selectedCategory,
  setSelectedCategory,
  selectedIndustry,
  setSelectedIndustry,
  searchQuery,
  setSearchQuery,
  onOpenProjectModal,
}) => {
  const [visibleCount, setVisibleCount] = useState(9);

  const getCategoryCount = (cat: 'All' | ProjectCategory) => {
    if (cat === 'All') return projects.length;
    return projects.filter((p) => p.category === cat).length;
  };

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesIndustry =
      selectedIndustry === 'All' || proj.industry === selectedIndustry;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      proj.title.toLowerCase().includes(q) ||
      proj.client.toLowerCase().includes(q) ||
      proj.industry.toLowerCase().includes(q) ||
      proj.techStack.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesIndustry && matchesSearch;
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedIndustry('All');
    setSearchQuery('');
    setVisibleCount(9);
  };

  return (
    <section id="portfolio" className="bg-white py-16 lg:py-24 scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <SectionHeading
            label="PORTFOLIO"
            firstPart="Explore"
            highlightPart="Our Projects"
          />
          <div
            aria-live="polite"
            className="text-[14px] font-bold text-navy-70"
          >
            Showing <span className="text-primary">{displayedProjects.length}</span> of{' '}
            <span className="text-navy">{filteredProjects.length}</span> projects
          </div>
        </div>

        {/* Filter Bar: Category Pills Left + Industry Dropdown & Search Input Right */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-8 mb-10 border-b border-navy-08">
          {/* Category Pills with Count Badges */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter projects by category"
          >
            {CATEGORIES_LIST.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(9);
                  }}
                  className={`px-4 py-2 rounded-full text-[13px] font-bold inline-flex items-center gap-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-primary ${
                    isActive
                      ? 'bg-primary text-white shadow-soft'
                      : 'bg-primary-50/70 text-navy-70 hover:bg-primary-50 hover:text-primary'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold tabular-nums ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-primary'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Industry Dropdown + Search Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Industry Select */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="portfolio-industry-select"
                className="text-[12px] font-bold uppercase tracking-wider text-navy-50 whitespace-nowrap"
              >
                Industry:
              </label>
              <select
                id="portfolio-industry-select"
                value={selectedIndustry}
                onChange={(e) => {
                  setSelectedIndustry(e.target.value as 'All' | ProjectIndustry);
                  setVisibleCount(9);
                }}
                className="px-3.5 py-2.5 rounded-full border border-navy-15 bg-white text-[13px] font-bold text-navy focus:outline-none focus:border-primary cursor-pointer"
              >
                {INDUSTRIES_LIST.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind === 'All' ? 'All Industries' : ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative sm:w-60">
              <Search className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects…"
                aria-label="Search projects"
                className="w-full pl-9 pr-4 py-2.5 rounded-full border border-navy-15 text-[13px] text-navy placeholder:text-navy-50 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Masonry-Style 3-Column Grid with Varied Card Heights & Smooth Layout Reflow */}
        {displayedProjects.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mx-auto mb-4">
              <FolderSearch className="w-8 h-8" strokeWidth={1.75} />
            </div>
            <h3 className="text-[22px] font-extrabold text-navy mb-2">
              No projects match your filters
            </h3>
            <p className="text-[15px] text-navy-70 mb-6">
              Try clearing your search query or switching to another category or industry.
            </p>
            <Button variant="outline-light" showArrow={false} onClick={handleClearFilters}>
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-start"
            >
              <AnimatePresence mode="popLayout">
                {displayedProjects.map((proj) => {
                  const frameHeightClass =
                    proj.cardAspect === 'tall'
                      ? 'aspect-[16/12]'
                      : proj.cardAspect === 'compact'
                      ? 'aspect-[16/9]'
                      : 'aspect-[16/10]';

                  return (
                    <motion.article
                      layout
                      key={proj.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="group bg-white rounded-[20px] border border-navy-08 shadow-soft hover:shadow-soft-hover hover:border-primary-100 hover:-translate-y-1.5 transition-all duration-200 overflow-hidden flex flex-col justify-between"
                    >
                      <button
                        type="button"
                        onClick={(e) => onOpenProjectModal(proj, e.currentTarget)}
                        className="w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                      >
                        {/* Browser Frame Header (3 small dots in navy tint) */}
                        <div className="bg-navy/[0.04] px-4 py-2.5 border-b border-navy-08 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-navy/25" />
                            <span className="w-2.5 h-2.5 rounded-full bg-navy/25" />
                            <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                          </div>
                          <span className="text-[11px] font-semibold text-navy-50 truncate max-w-[160px]">
                            {proj.client}
                          </span>
                          <span className="text-[12px]">{proj.flag}</span>
                        </div>

                        {/* Screenshot Area: Slowly Scrolls Top-to-Bottom on Hover */}
                        <div className={`relative ${frameHeightClass} overflow-hidden bg-navy`}>
                          <img
                            src={proj.images[0]}
                            alt={`${proj.title} — ${proj.category} screenshot`}
                            loading="lazy"
                            className="w-full h-[135%] object-cover object-top transition-transform duration-[1800ms] ease-in-out group-hover:-translate-y-[24%]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                          {/* Blue Circular "↗" Button Appearing in Corner on Hover */}
                          <span className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-primary text-white shadow-lg flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                            <ArrowUpRight className="w-5 h-5" />
                          </span>

                          {/* Floating Result Badge Bottom-Left */}
                          {proj.results[0] && (
                            <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-navy/90 border border-white/15 backdrop-blur-md text-white text-[11px] font-bold">
                              <strong className="text-primary">{proj.results[0].value}</strong>{' '}
                              {proj.results[0].label}
                            </span>
                          )}
                        </div>

                        {/* Card Body: Title, Client/Industry, Category Pill & 2–3 Tech Tags */}
                        <div className="p-6">
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-bold">
                              {proj.category}
                            </span>
                            <span className="text-[12px] font-semibold text-navy-50">
                              {proj.industry}
                            </span>
                          </div>

                          <h3 className="text-[19px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug mb-3">
                            {proj.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-navy-08">
                            {proj.techStack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-0.5 rounded-md bg-navy/[0.04] text-navy-70 text-[11px] font-semibold"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Load More Projects Outline Button (shows 9 at a time) */}
            {visibleCount < filteredProjects.length && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline-light"
                  size="lg"
                  onClick={() => setVisibleCount((prev) => prev + 9)}
                >
                  Load More Projects ({filteredProjects.length - visibleCount} more)
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

/* ============================================================================
   5. CASE STUDIES (navy — #case-studies, 3 alternating rows)
============================================================================ */
const CaseStudiesSection: React.FC<{
  onOpenProjectById: (projectId: string) => void;
}> = ({ onOpenProjectById }) => {
  return (
    <section
      id="case-studies"
      className="relative bg-navy text-white py-20 lg:py-28 overflow-hidden scroll-mt-24"
    >
      <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] blue-glow pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] blue-glow-strong pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          dark
          align="center"
          label="CASE STUDIES"
          firstPart="Real Problems."
          highlightPart="Real Results."
          className="mb-16"
        />

        <div className="space-y-16 lg:space-y-24">
          {CASE_STUDIES_DATA.map((cs, index) => {
            const isImageLeft = index % 2 === 0;
            return (
              <div
                key={cs.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
              >
                {/* Image Side (6 cols) */}
                <div
                  className={`lg:col-span-6 relative ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="rounded-[24px] overflow-hidden border border-white/15 bg-white/[0.04] p-2.5 shadow-2xl">
                    <div className="rounded-[18px] overflow-hidden aspect-[16/10] bg-navy">
                      <img
                        src={cs.image}
                        alt={cs.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Floating Glass Result Chip Overlapping Corner */}
                  <div
                    className={`mt-3 sm:mt-0 sm:absolute sm:-bottom-4 ${
                      isImageLeft ? 'sm:-right-4' : 'sm:-left-4'
                    } z-20 px-5 py-3 rounded-2xl bg-primary text-white font-extrabold text-[15px] shadow-[0_12px_30px_rgba(5,113,194,0.6)] border border-white/25 inline-flex items-center gap-2`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{cs.floatingChip}</span>
                  </div>
                </div>

                {/* Text Side (6 cols) */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-primary">
                    {cs.industryTag}
                  </div>

                  <h3 className="text-[26px] sm:text-[32px] font-extrabold text-white leading-tight">
                    {cs.title}
                  </h3>

                  {/* 3-Step Mini Storyline (Challenge → Solution → Result) with Vertical Line & Blue Dots */}
                  <div className="relative pl-6 space-y-4 border-l-2 border-primary/40">
                    {[
                      { label: 'Challenge', text: cs.challenge },
                      { label: 'Solution', text: cs.solution },
                      { label: 'Result', text: cs.result },
                    ].map((step) => (
                      <div key={step.label} className="relative">
                        <span className="w-3 h-3 rounded-full bg-primary ring-4 ring-navy absolute -left-[31px] top-1.5" />
                        <div className="text-[12px] font-extrabold uppercase tracking-wider text-primary">
                          {step.label}
                        </div>
                        <p className="text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Row of 3 Metrics in Big Blue Numbers with White Labels */}
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    {cs.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-4 rounded-2xl bg-white/[0.05] border border-white/10"
                      >
                        <div className="text-[24px] sm:text-[28px] font-extrabold text-primary leading-none tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-[12px] font-semibold text-white/80 mt-1.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Button
                      variant="outline-dark"
                      size="md"
                      onClick={() => onOpenProjectById(cs.projectId)}
                    >
                      Read Full Case Study
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   6. BEFORE & AFTER REDESIGN SLIDER (white — interactive drag/touch/keyboard)
============================================================================ */
const BeforeAfterRedesignSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = BEFORE_AFTER_PROJECTS[activeIndex] || BEFORE_AFTER_PROJECTS[0];

  const updateSliderFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(95, Math.max(5, Math.round((x / rect.width) * 100)));
    setSliderPos(pct);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e: MouseEvent) => updateSliderFromClientX(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateSliderFromClientX(e.touches[0].clientX);
    };
    const onUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging]);

  const handleSliderKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((p) => Math.max(5, p - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((p) => Math.min(95, p + 5));
    }
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <SectionHeading
              label="TRANSFORMATIONS"
              firstPart="Before &"
              highlightPart="After"
              className="mb-2"
            />
            <p className="text-[16px] text-navy-70">
              Drag the handle to compare outdated legacy websites with our modern high-converting
              redesigns.
            </p>
          </div>

          {/* Small Tabs to Switch Between 3 Redesign Projects */}
          <div className="flex flex-wrap items-center gap-2" role="tablist">
            {BEFORE_AFTER_PROJECTS.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveIndex(idx);
                    setSliderPos(50);
                  }}
                  className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-primary text-white shadow-soft'
                      : 'bg-primary-50 text-navy-70 hover:text-primary'
                  }`}
                >
                  {item.tabTitle}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Comparison Slider Frame */}
        <div
          ref={containerRef}
          onMouseDown={(e) => {
            setIsDragging(true);
            updateSliderFromClientX(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            if (e.touches[0]) updateSliderFromClientX(e.touches[0].clientX);
          }}
          className="relative rounded-[24px] overflow-hidden border border-navy-15 shadow-xl aspect-[16/9] max-h-[540px] w-full select-none cursor-ew-resize bg-navy"
        >
          {/* Base Layer: AFTER (Redesigned Website) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={activeItem.afterImage}
              alt={`After redesign of ${activeItem.clientName}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-5 right-5 hidden sm:block max-w-xs p-4 rounded-2xl bg-navy/90 border border-primary/50 backdrop-blur-md text-white shadow-xl">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-primary mb-1.5">
                AFTER WEBXCODE REDESIGN
              </div>
              <ul className="space-y-1 text-[12px] text-white/90">
                {activeItem.afterWins.map((w) => (
                  <li key={w} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Clipped Overlay Layer: BEFORE (Legacy Website) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src={activeItem.beforeImage}
              alt={`Before redesign of ${activeItem.clientName}`}
              loading="lazy"
              className="w-full h-full object-cover grayscale contrast-75 brightness-75"
            />
            <div className="absolute inset-0 bg-navy/40" />
            <div className="absolute bottom-5 left-5 hidden sm:block max-w-xs p-4 rounded-2xl bg-navy/90 border border-white/20 backdrop-blur-md text-white shadow-xl">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-white/60 mb-1.5">
                LEGACY WEBSITE (BEFORE)
              </div>
              <ul className="space-y-1 text-[12px] text-white/75">
                {activeItem.beforeIssues.map((iss) => (
                  <li key={iss} className="flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5 text-white/50 shrink-0" />
                    <span>{iss}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Top Corner Pill Labels: BEFORE and AFTER */}
          <span className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-navy/85 border border-white/20 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-widest text-white">
            BEFORE
          </span>
          <span className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-primary text-[11px] font-extrabold uppercase tracking-widest text-white shadow-md">
            AFTER
          </span>

          {/* Vertical Draggable Handle (White Line + Blue Circular Handle with ↔ Icon) */}
          <div
            style={{ left: `${sliderPos}%` }}
            className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] z-30 -translate-x-1/2"
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label="Before and after redesign comparison slider"
              aria-valuemin={5}
              aria-valuemax={95}
              aria-valuenow={sliderPos}
              onKeyDown={handleSliderKeyDown}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary text-white border-4 border-white shadow-2xl flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <MoveHorizontal className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Below Slider: 3 Improvement Chips */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div className="text-[15px] font-bold text-navy">
            {activeItem.clientName} —{' '}
            <span className="font-normal text-navy-70">{activeItem.summary}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {activeItem.chips.map((chip) => (
              <span
                key={chip}
                className="px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary text-[13px] font-extrabold inline-flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span>{chip}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   7. INDUSTRIES WE'VE DELIVERED FOR (light blue tint — centered pill cloud)
============================================================================ */
const IndustriesPillCloudSection: React.FC<{
  onSelectIndustryFilter: (ind: ProjectIndustry) => void;
}> = ({ onSelectIndustryFilter }) => {
  const industryCloud: {
    name: ProjectIndustry;
    label: string;
    count: number;
    sizeClass: string;
    icon: React.ComponentType<any>;
  }[] = [
    {
      name: 'E-commerce',
      label: 'E-commerce & D2C',
      count: 28,
      sizeClass: 'px-6 py-3.5 text-[16px]',
      icon: ShoppingBag,
    },
    {
      name: 'SaaS',
      label: 'SaaS & Tech Startups',
      count: 24,
      sizeClass: 'px-6 py-3.5 text-[16px]',
      icon: Cpu,
    },
    {
      name: 'Real Estate',
      label: 'Real Estate & PropTech',
      count: 19,
      sizeClass: 'px-5 py-3 text-[15px]',
      icon: Home,
    },
    {
      name: 'Finance',
      label: 'Finance & FinTech',
      count: 16,
      sizeClass: 'px-5 py-3 text-[15px]',
      icon: Landmark,
    },
    {
      name: 'Healthcare',
      label: 'Healthcare & MedTech',
      count: 14,
      sizeClass: 'px-5 py-2.5 text-[14px]',
      icon: HeartPulse,
    },
    {
      name: 'Education',
      label: 'Education & EdTech',
      count: 12,
      sizeClass: 'px-5 py-2.5 text-[14px]',
      icon: GraduationCap,
    },
    {
      name: 'Travel',
      label: 'Travel & Hospitality',
      count: 11,
      sizeClass: 'px-4 py-2.5 text-[14px]',
      icon: Plane,
    },
    {
      name: 'Manufacturing',
      label: 'Manufacturing & B2B',
      count: 9,
      sizeClass: 'px-4 py-2.5 text-[14px]',
      icon: Factory,
    },
  ];

  return (
    <section className="bg-primary-50 py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
        <SectionHeading
          align="center"
          label="ACROSS INDUSTRIES"
          firstPart="Experience Across"
          highlightPart="Every Sector"
          className="mb-4"
        />
        <p className="text-[16px] text-navy-70 max-w-xl mx-auto mb-10">
          Click any industry below to filter our portfolio and explore domain-specific solutions.
        </p>

        {/* Centered Pill Cloud in Varied Sizes */}
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3.5">
          {industryCloud.map((ind) => {
            const IconComp = ind.icon;
            return (
              <button
                key={ind.name}
                type="button"
                onClick={() => onSelectIndustryFilter(ind.name)}
                className={`group ${ind.sizeClass} rounded-full bg-white border border-navy-08 hover:bg-primary hover:border-primary text-navy hover:text-white shadow-soft hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2.5 font-extrabold cursor-pointer focus-visible:outline-2 focus-visible:outline-primary`}
              >
                <IconComp
                  className="w-4 h-4 text-primary group-hover:text-white transition-colors shrink-0"
                  strokeWidth={2}
                />
                <span>{ind.label}</span>
                <span className="text-primary group-hover:text-white/90 font-bold tabular-nums">
                  · {ind.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   8. CLIENT VOICES (white — 3 video-style testimonial cards + scrolling quote strip)
============================================================================ */
const ClientVoicesSection: React.FC<{
  onOpenVideoTestimonial: (item: VideoTestimonialItem) => void;
}> = ({ onOpenVideoTestimonial }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          label="CLIENT VOICES"
          firstPart="What Our"
          highlightPart="Clients Say"
          className="mb-12"
        />

        {/* 3 Video-Style Testimonial Cards in a Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-12">
          {VIDEO_TESTIMONIALS.map((vid) => (
            <div
              key={vid.id}
              onClick={() => onOpenVideoTestimonial(vid)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenVideoTestimonial(vid);
                }
              }}
              className="group relative rounded-[24px] overflow-hidden aspect-[4/5] bg-navy border border-navy-08 shadow-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
            >
              <img
                src={vid.image}
                alt={`${vid.name}, ${vid.role} at ${vid.company} video testimonial`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/20" />

              {/* Top Metric Badge + Duration */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold">
                  {vid.metric}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-navy/80 border border-white/15 text-white text-[11px] font-bold tabular-nums">
                  {vid.duration}
                </span>
              </div>

              {/* Center Blue Circular Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 rounded-full bg-primary text-white shadow-[0_0_30px_rgba(5,113,194,0.8)] flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                  <Play className="w-7 h-7 fill-white ml-0.5" />
                </span>
              </div>

              {/* Bottom Client Info */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[13px] text-white/85 line-clamp-2 mb-3 italic">
                  “{vid.quote}”
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/15">
                  <div>
                    <h3 className="text-[17px] font-extrabold text-white">{vid.name}</h3>
                    <p className="text-[12px] text-white/75">
                      {vid.role}, {vid.company}
                    </p>
                  </div>
                  <span className="text-[20px]" aria-label={vid.country}>
                    {vid.flag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Single-Line Horizontally Auto-Scrolling Strip of Short Text Quotes with 5 Blue Stars */}
        <div className="relative pt-8 border-t border-navy-08 overflow-hidden">
          <motion.div
            animate={prefersReducedMotion ? { x: 0 } : { x: ['0%', '-50%'] }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-6 w-max"
          >
            {[...SHORT_CLIENT_QUOTES, ...SHORT_CLIENT_QUOTES].map((q, idx) => (
              <div
                key={`${q.author}-${idx}`}
                className="px-5 py-3.5 rounded-full bg-primary-50/60 border border-primary-100 inline-flex items-center gap-3 shrink-0"
              >
                <div className="flex items-center gap-0.5 text-primary" aria-label="5 stars">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-[14px] font-bold text-navy">{q.text}</span>
                <span className="text-[12px] font-semibold text-primary">— {q.author}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   9. FINAL CTA — "YOUR PROJECT COULD BE NEXT" (navy, rounded container)
============================================================================ */
const YourProjectNextCTA: React.FC<{
  onOpenQuoteModal: (service?: string) => void;
}> = ({ onOpenQuoteModal }) => {
  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-[28px] bg-navy text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-[520px] h-[520px] blue-glow-strong pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] blue-glow pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7">
              <SectionHeading
                dark
                label="LET'S BUILD TOGETHER"
                firstPart="Your Project Could Be"
                highlightPart="Next"
                className="mb-4"
              />
              <p className="text-[16px] sm:text-[18px] text-white/80 leading-relaxed max-w-xl mb-8">
                Tell us about your idea and we'll turn it into something you're proud to show.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  onClick={() => onOpenQuoteModal('Start a Project')}
                >
                  Get a Free Quote
                </Button>
                <Link href="/contact">
                  <Button variant="outline-dark" size="lg" showArrow={false}>
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: 2x2 Grid of 4 Small Project Thumbnail Cards (4th is Dashed "Your Project Here") */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {projects.slice(0, 3).map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-[18px] overflow-hidden border border-white/15 bg-white/[0.05] p-2"
                >
                  <div className="rounded-[12px] overflow-hidden aspect-[16/10] bg-navy mb-2">
                    <img
                      src={proj.images[0]}
                      alt={proj.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-1">
                    <div className="text-[10px] font-bold text-primary uppercase truncate">
                      {proj.category}
                    </div>
                    <div className="text-[12px] font-bold text-white truncate">
                      {proj.client}
                    </div>
                  </div>
                </div>
              ))}

              {/* 4th Card: Empty Dashed-Border Placeholder Card ("Your Project Here") */}
              <button
                type="button"
                onClick={() => onOpenQuoteModal('Your Project Next')}
                className="group rounded-[18px] border-2 border-dashed border-white/30 hover:border-solid hover:border-primary bg-white/[0.03] hover:bg-primary/15 p-4 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer min-h-[140px] focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span className="w-11 h-11 rounded-full bg-primary/20 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center mb-2.5 transition-all duration-300 group-hover:rotate-90">
                  <Plus className="w-6 h-6" strokeWidth={2.5} />
                </span>
                <span className="text-[14px] font-extrabold text-white group-hover:text-primary transition-colors">
                  Your Project Here
                </span>
                <span className="text-[11px] text-white/60 mt-0.5">Click to start</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   PROJECT QUICK-VIEW MODAL (accessible dialog with focus trap, gallery & prev/next)
============================================================================ */
const ProjectQuickViewModal: React.FC<{
  project: ProjectDataItem | null;
  onClose: () => void;
  onSelectProject: (proj: ProjectDataItem) => void;
  onOpenQuoteModal: (service?: string) => void;
}> = ({ project, onClose, onSelectProject, onOpenQuoteModal }) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImgIdx(0);
  }, [project]);

  // Focus trap & Escape / Arrow key navigation
  useEffect(() => {
    if (!project) return;

    const closeBtn = dialogRef.current?.querySelector<HTMLButtonElement>(
      '[data-modal-close="true"]'
    );
    closeBtn?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentIdx = projects.findIndex((p) => p.id === project.id);
  const handlePrevProject = () => {
    const prevIdx = (currentIdx - 1 + projects.length) % projects.length;
    onSelectProject(projects[prevIdx]);
  };
  const handleNextProject = () => {
    const nextIdx = (currentIdx + 1) % projects.length;
    onSelectProject(projects[nextIdx]);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-navy/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-modal-title"
    >
      <div
        ref={dialogRef}
        className="bg-white text-navy rounded-[24px] max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-navy-08 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Top Modal Bar: Prev / Next Project + Close Button */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-navy-08 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevProject}
              className="px-3 py-1.5 rounded-full border border-navy-15 text-[12px] font-bold text-navy hover:border-primary hover:text-primary inline-flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Project</span>
            </button>
            <button
              type="button"
              onClick={handleNextProject}
              className="px-3 py-1.5 rounded-full border border-navy-15 text-[12px] font-bold text-navy hover:border-primary hover:text-primary inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Next Project</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            data-modal-close="true"
            aria-label="Close project quick-view modal"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-primary-50 text-navy hover:bg-primary hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-7">
          {/* Image Gallery / Slider with Thumbnails */}
          <div className="space-y-3">
            <div className="rounded-[20px] overflow-hidden border border-navy-15 bg-navy aspect-[16/9]">
              <img
                src={project.images[activeImgIdx] || project.images[0]}
                alt={`${project.title} preview ${activeImgIdx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {project.images.length > 1 && (
              <div className="flex items-center gap-3">
                {project.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    className={`w-24 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImgIdx === idx
                        ? 'border-primary ring-2 ring-primary/30'
                        : 'border-navy-15 opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Metadata Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-bold">
                {project.industry}
              </span>
              <span className="text-[13px] font-semibold text-navy-70">
                {project.flag} {project.country} · {project.year}
              </span>
            </div>

            <h3
              id="quick-view-modal-title"
              className="text-[24px] sm:text-[30px] font-extrabold text-navy leading-tight mb-2"
            >
              {project.title}
            </h3>
            <p className="text-[14px] font-bold text-primary">
              Client: {project.client} · Services: {project.servicesProvided.join(' • ')}
            </p>
          </div>

          {/* Overview + Key Features List */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 space-y-4">
              <h4 className="text-[15px] font-extrabold uppercase tracking-wider text-navy">
                Project Overview
              </h4>
              <p className="text-[15px] text-navy-70 leading-relaxed">{project.description}</p>

              <h4 className="text-[15px] font-extrabold uppercase tracking-wider text-navy pt-2">
                Key Features Delivered
              </h4>
              <ul className="space-y-2.5">
                {project.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-[14px] text-navy-90">
                    <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Result Metrics & Tech Stack */}
            <div className="md:col-span-5 space-y-5 bg-primary-50/50 rounded-[20px] p-5 border border-primary-100">
              <div>
                <div className="text-[12px] font-extrabold uppercase tracking-wider text-primary mb-3">
                  Measured Impact
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {project.results.map((r) => (
                    <div
                      key={r.label}
                      className="p-3 rounded-xl bg-white border border-navy-08 text-center"
                    >
                      <div className="text-[18px] font-extrabold text-primary tabular-nums">
                        {r.value}
                      </div>
                      <div className="text-[10px] font-bold text-navy-70 mt-0.5">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[12px] font-extrabold uppercase tracking-wider text-navy mb-2">
                  Technology Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-white border border-navy-08 text-[12px] font-bold text-navy"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-5 border-t border-navy-08 flex flex-wrap items-center justify-between gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] font-extrabold text-primary hover:underline underline-offset-4"
            >
              <span>Visit Live Site</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <Button
              size="md"
              onClick={() => {
                onClose();
                onOpenQuoteModal(`Similar Project to: ${project.title}`);
              }}
            >
              Start a Similar Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   CLIENT VIDEO TESTIMONIAL MODAL
============================================================================ */
const ClientVideoModal: React.FC<{
  item: VideoTestimonialItem | null;
  onClose: () => void;
  onOpenQuoteModal: (service?: string) => void;
}> = ({ item, onClose, onOpenQuoteModal }) => {
  useEffect(() => {
    if (!item) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-navy/85 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-video-modal-title"
    >
      <div className="bg-navy text-white rounded-[24px] max-w-2xl w-full overflow-hidden border border-white/20 shadow-2xl">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 id="client-video-modal-title" className="text-[15px] font-bold text-white">
            {item.flag} {item.name} — {item.company} ({item.duration})
          </h3>
          <button
            type="button"
            aria-label="Close video modal"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 text-white hover:bg-primary transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video bg-navy flex items-center justify-center p-6 text-center">
          <img
            src={item.image}
            alt={item.company}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />

          <div className="relative z-10 max-w-lg space-y-4">
            <span className="inline-flex px-3.5 py-1 rounded-full bg-primary text-white text-[12px] font-bold">
              {item.metric}
            </span>
            <p className="text-[18px] sm:text-[20px] font-bold text-white leading-relaxed italic">
              “{item.quote}”
            </p>
            <div className="text-[14px] text-white/80 font-semibold">
              {item.name} · {item.role}, {item.company}
            </div>
            <div className="pt-2">
              <Button
                size="md"
                onClick={() => {
                  onClose();
                  onOpenQuoteModal(`Project Consultation (${item.company} Case Study)`);
                }}
              >
                Build a Similar Solution
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   MAIN OUR WORK PAGE EXPORT
============================================================================ */
interface OurWorkProps {
  onOpenQuoteModal?: (service?: string) => void;
}

export const OurWork: React.FC<OurWorkProps> = ({ onOpenQuoteModal: propOpenQuoteModal }) => {
  const quoteModalCtx = useQuoteModal();
  const onOpenQuoteModal = propOpenQuoteModal || quoteModalCtx?.openQuoteModal;
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [selectedIndustry, setSelectedIndustry] = useState<'All' | ProjectIndustry>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<ProjectDataItem | null>(null);
  const [activeVideoItem, setActiveVideoItem] = useState<VideoTestimonialItem | null>(null);
  const lastFocusedCardRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenQuote = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: service }));
    }
  };

  const handleOpenProjectModal = (
    proj: ProjectDataItem,
    triggerEl: HTMLButtonElement | null = null
  ) => {
    if (triggerEl) {
      lastFocusedCardRef.current = triggerEl;
    }
    setActiveModalProject(proj);
  };

  const handleCloseProjectModal = () => {
    setActiveModalProject(null);
    setTimeout(() => {
      lastFocusedCardRef.current?.focus();
    }, 30);
  };

  const handleOpenProjectById = (projectId: string) => {
    const found = projects.find((p) => p.id === projectId) || projects[0];
    setActiveModalProject(found);
  };

  const handleSelectIndustryFromCloud = (industry: ProjectIndustry) => {
    setSelectedCategory('All');
    setSelectedIndustry(industry);
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* Update Document Title & Meta Description on Route Mount */
  useEffect(() => {
    document.title = 'Our Work | WebXCode — Portfolio & Case Studies';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore WebXCode’s portfolio of high-performing websites, headless e-commerce stores, custom web & mobile apps, SEO/AEO campaigns, and AI solutions delivered globally.'
      );
    }
  }, []);

  /* JSON-LD Structured Data: CollectionPage with ItemList of Projects */
  const ourWorkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://webxcode.com/our-work#collectionpage',
    url: 'https://webxcode.com/our-work',
    name: 'Our Work | WebXCode — Portfolio & Case Studies',
    description:
      'A curated showcase of websites, web applications, e-commerce platforms, and AI solutions built by WebXCode for clients across India, the US, and worldwide.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((proj, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: proj.title,
        description: proj.description,
        url: proj.liveUrl,
      })),
    },
  };

  return (
    <main className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ourWorkJsonLd) }}
      />

      {/* 1. Page Hero — Tilted Showcase Wall (navy) */}
      <TiltedShowcaseHero onOpenQuoteModal={handleOpenQuote} />

      {/* 2. Impact Numbers + Client Logos (white) */}
      <ImpactAndLogosSection />

      {/* 3. Featured Case Study Spotlight (light blue tint) */}
      <FeaturedSpotlightSection
        onOpenProjectModal={(proj) => handleOpenProjectModal(proj, null)}
      />

      {/* 4. Portfolio Grid with Filters (white — #portfolio) */}
      <PortfolioGridSection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenProjectModal={handleOpenProjectModal}
      />

      {/* 5. Case Studies (navy — #case-studies) */}
      <CaseStudiesSection onOpenProjectById={handleOpenProjectById} />

      {/* 6. Before & After Redesign Slider (white) */}
      <BeforeAfterRedesignSection />

      {/* 7. Industries We've Delivered For — Pill Cloud (light blue tint) */}
      <IndustriesPillCloudSection onSelectIndustryFilter={handleSelectIndustryFromCloud} />

      {/* 8. Client Voices — Video Cards + Quote Marquee (white) */}
      <ClientVoicesSection onOpenVideoTestimonial={(item) => setActiveVideoItem(item)} />

      {/* 9. Final CTA — "Your Project Could Be Next" (navy rounded container) */}
      <YourProjectNextCTA onOpenQuoteModal={handleOpenQuote} />

      {/* Project Quick-View Modal */}
      <ProjectQuickViewModal
        project={activeModalProject}
        onClose={handleCloseProjectModal}
        onSelectProject={(proj) => setActiveModalProject(proj)}
        onOpenQuoteModal={handleOpenQuote}
      />

      {/* Client Video Testimonial Modal */}
      <ClientVideoModal
        item={activeVideoItem}
        onClose={() => setActiveVideoItem(null)}
        onOpenQuoteModal={handleOpenQuote}
      />
    </main>
  );
};

export default OurWork;
