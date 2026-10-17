'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Sparkles,
  Laptop,
  LayoutDashboard,
  Search,
  BarChart3,
  Bot,
  Workflow,
  Layers,
  Globe,
  FileText,
  BookOpen,
  CreditCard,
  GitCompare,
  Award,
  HelpCircle,
  Calendar,
  TrendingUp,
  Rocket,
  Plus,
  Minus,
  Quote,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Zap,
} from 'lucide-react';
import { industries, IndustryIcon } from '@/app/industries/_components/Industries';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT B2B / SAAS ITEM FROM ../Industries
============================================================================ */
const b2bSaasIndustry =
  industries.find((item) => item.slug === 'b2b-saas') || industries[0];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS (Top of file — single source of truth)
============================================================================ */

/* Section 1: Hero Dashboard Metrics */
const HERO_DASHBOARD_METRICS = [
  { label: 'Trial Sign-ups', value: '+68%', note: 'vs. prior quarter' },
  { label: 'Customer Acquisition Cost', value: '−32%', note: 'blended CAC' },
  { label: 'Organic Pipeline', value: '+140%', note: 'high-intent SQLs' },
];

const HERO_FUNNEL_BARS = [
  { stage: 'Visitors', pct: 100, val: '48.2K' },
  { stage: 'Product Tour', pct: 64, val: '30.8K' },
  { stage: 'AI Qualified', pct: 38, val: '18.3K' },
  { stage: 'Booked Demos', pct: 22, val: '1,420' },
];

/* Section 2: "Sound Familiar?" — Pain Points as Chat Bubbles (5 pairs) */
interface ChatPainPointItem {
  id: string;
  founderRole: string;
  founderInitials: string;
  timestamp: string;
  problemText: string;
  replyText: string;
  replyBadge: string;
}

const PAIN_POINT_THREADS: ChatPainPointItem[] = [
  {
    id: 'pain-1',
    founderRole: 'SaaS Founder · Series A',
    founderInitials: 'SF',
    timestamp: '09:41 AM',
    problemText: 'Our website gets traffic but almost nobody books a demo.',
    replyText: 'We rebuild your funnel pages around one clear conversion goal.',
    replyBadge: 'Conversion Architecture',
  },
  {
    id: 'pain-2',
    founderRole: 'VP of Marketing · B2B Tech',
    founderInitials: 'VP',
    timestamp: '09:42 AM',
    problemText: 'Our product is hard to explain on the homepage.',
    replyText: 'We design clear messaging, product tours and use-case pages.',
    replyBadge: 'Product Storytelling',
  },
  {
    id: 'pain-3',
    founderRole: 'Head of Growth · Cloud SaaS',
    founderInitials: 'HG',
    timestamp: '09:44 AM',
    problemText: 'Google Ads are getting too expensive.',
    replyText: 'We grow organic pipeline with SEO, AEO and comparison pages.',
    replyBadge: 'SEO + AEO Engine',
  },
  {
    id: 'pain-4',
    founderRole: 'RevOps Lead · Enterprise B2B',
    founderInitials: 'RO',
    timestamp: '09:45 AM',
    problemText: 'Sales wastes time on unqualified leads.',
    replyText: 'Our AI chatbot qualifies and routes leads before they reach sales.',
    replyBadge: '24/7 AI Lead Scoring',
  },
  {
    id: 'pain-5',
    founderRole: 'Content & Demand Gen Manager',
    founderInitials: 'DG',
    timestamp: '09:47 AM',
    problemText: "Marketing can't update the site without developers.",
    replyText: 'We build on a CMS your team can edit in minutes.',
    replyBadge: 'Modular Headless CMS',
  },
];

/* Section 3: The SaaS Growth Funnel — Interactive (5 stages) */
interface FunnelStageItem {
  id: string;
  stepNum: string;
  name: string;
  goal: string;
  whatWeDo: string[];
  keyMetric: string;
  metricTarget: string;
  widthPercent: number;
}

const SAAS_FUNNEL_STAGES: FunnelStageItem[] = [
  {
    id: 'awareness',
    stepNum: '01',
    name: 'Awareness',
    goal: 'Capture high-intent B2B buyers researching category problems across Google, ChatGPT, and Perplexity.',
    whatWeDo: [
      'Technical SEO & programmatic industry landing pages',
      'Answer Engine Optimization (AEO) & GEO schema for AI citations',
      'Thought-leadership engineering guides & benchmark reports',
      'High-intent Google Search Ads targeting category keywords',
    ],
    keyMetric: 'Organic traffic',
    metricTarget: '+140% to +240% qualified sessions',
    widthPercent: 100,
  },
  {
    id: 'consideration',
    stepNum: '02',
    name: 'Consideration',
    goal: 'Educate buying committees with clear product architecture, ROI calculators, and competitor comparisons.',
    whatWeDo: [
      'Dedicated Feature & Product Tour pages with interactive UI previews',
      'Role-based & Industry-specific Use-Case pages',
      'Native Integration directory pages (e.g. HubSpot, Salesforce, Slack)',
      'High-converting Competitor Comparison ("Your SaaS vs Competitor") pages',
    ],
    keyMetric: 'Time on page',
    metricTarget: '3m 40s+ average engagement',
    widthPercent: 86,
  },
  {
    id: 'demo-trial',
    stepNum: '03',
    name: 'Demo / Trial',
    goal: 'Remove friction from scheduling demos or starting self-serve product trials 24/7.',
    whatWeDo: [
      'Multi-step frictionless Demo Booking flows with instant calendar sync',
      'Self-serve Free-Trial onboarding & SSO signup flows',
      '24/7 AI Lead Qualification Chatbot that scores budget & company size',
      'Automated SDR routing based on territory and deal tier',
    ],
    keyMetric: 'Demo bookings',
    metricTarget: '+65% to +110% qualified demos',
    widthPercent: 72,
  },
  {
    id: 'conversion',
    stepNum: '04',
    name: 'Conversion',
    goal: 'Turn active trials and sales pipeline into closed-won annual and monthly recurring revenue (ARR/MRR).',
    whatWeDo: [
      'Continuous Conversion Rate Optimization (CRO) & A/B testing',
      'Transparent Pricing page UX with tier comparison matrices & ROI toggle',
      'Enterprise security, SOC2/GDPR trust centers & interactive case studies',
      'Automated trial-to-paid behavioral email & CRM sequences',
    ],
    keyMetric: 'Trial-to-paid rate',
    metricTarget: '2.4× higher pipeline velocity',
    widthPercent: 58,
  },
  {
    id: 'retention',
    stepNum: '05',
    name: 'Retention',
    goal: 'Keep customers engaged, reduce churn, and unlock account expansion and net revenue retention (NRR).',
    whatWeDo: [
      'Custom Customer Portals & usage analytics dashboards',
      'Searchable Docs, API reference & self-serve Help Centers',
      'CRM & lifecycle email automation for feature adoption',
      'AI support assistant trained on your product documentation',
    ],
    keyMetric: 'Churn rate',
    metricTarget: '−28% reduction in logo churn',
    widthPercent: 44,
  },
];

/* Section 4: Services Built for B2B & SaaS (6 cards — no Social Media Marketing) */
interface SaasServiceCardItem {
  id: string;
  title: string;
  description: string;
  bullets: [string, string, string];
  illustrationType: 'browser' | 'dashboard' | 'seo-chart' | 'ads-funnel' | 'ai-chat' | 'crm-flow';
  icon: React.FC<{ className?: string }>;
}

const SAAS_SERVICES: SaasServiceCardItem[] = [
  {
    id: 'saas-websites',
    title: 'SaaS Marketing Websites',
    description:
      'Fast, conversion-focused sites on Next.js or a headless CMS engineered to turn buyer traffic into demos.',
    bullets: [
      'Next.js 14 + Headless CMS for instant marketing edits',
      'Interactive product tours, pricing toggles & ROI calculators',
      '95+ Core Web Vitals & enterprise accessibility compliance',
    ],
    illustrationType: 'browser',
    icon: Laptop,
  },
  {
    id: 'webapp-dashboards',
    title: 'Web App & Dashboard Development',
    description:
      'Customer portals, admin panels, and scalable SaaS MVPs built with clean full-stack architecture.',
    bullets: [
      'Multi-tenant React / Next.js & TypeScript frontends',
      'Role-based access control, SSO & billing integrations (Stripe)',
      'Real-time analytics charts, data tables & API webhooks',
    ],
    illustrationType: 'dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'seo-aeo-geo',
    title: 'SEO, AEO & GEO for SaaS',
    description:
      'Buyer-intent keywords, comparison pages, and AI search visibility across Google, ChatGPT, and Perplexity.',
    bullets: [
      'Programmatic "Alternative to" & "vs" comparison page clusters',
      'SoftwareApplication & FAQPage JSON-LD entity schema',
      'Technical site audits, link authority & AI citation tracking',
    ],
    illustrationType: 'seo-chart',
    icon: Search,
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    description:
      'Google Ads and paid search campaigns engineered specifically for qualified demo and trial sign-ups.',
    bullets: [
      'High-intent bottom-of-funnel Google Search & competitor bidding',
      'Dedicated conversion landing pages with message match',
      'Offline conversion tracking synced with HubSpot / Salesforce SQLs',
    ],
    illustrationType: 'ads-funnel',
    icon: BarChart3,
  },
  {
    id: 'ai-lead-chatbot',
    title: 'AI Lead Qualification Chatbot',
    description:
      'Qualifies, scores and routes leads to sales 24/7 using your product docs, case studies, and pricing rules.',
    bullets: [
      'Custom RAG agent trained on your SaaS documentation & FAQs',
      'Filters out non-ICP leads and books meetings directly in Calendly',
      'Instant Slack & CRM handoff when enterprise buyers engage',
    ],
    illustrationType: 'ai-chat',
    icon: Bot,
  },
  {
    id: 'crm-automation',
    title: 'CRM & Marketing Automation',
    description:
      'HubSpot and Salesforce integration, automated lead routing, enrichment, and lifecycle nurture flows.',
    bullets: [
      'Two-way sync between web forms, product trials & your CRM',
      'Automated lead scoring, territory assignment & SDR alerts',
      'Multi-touch attribution reporting from first click to closed ARR',
    ],
    illustrationType: 'crm-flow',
    icon: Workflow,
  },
];

/* Section 5: The High-Converting SaaS Website Blueprint (Interactive Sitemap Tree) */
interface BlueprintNodeItem {
  id: string;
  title: string;
  badge: string;
  whyItMatters: string;
  conversionTip: string;
  icon: React.FC<{ className?: string }>;
  isRoot?: boolean;
}

const BLUEPRINT_NODES: BlueprintNodeItem[] = [
  {
    id: 'node-home',
    title: 'Home',
    badge: 'Root Entry',
    whyItMatters:
      'Communicates your core value proposition, ICP fit, and social proof within 5 seconds of landing.',
    conversionTip:
      'Pair a specific outcome-driven H1 with an interactive product preview and dual CTAs ("Book a Demo" + "Interactive Tour").',
    icon: Globe,
    isRoot: true,
  },
  {
    id: 'node-product',
    title: 'Product / Features',
    badge: 'Core Solution',
    whyItMatters:
      'Breaks down your platform capabilities into digestible modules so technical evaluators see how it works.',
    conversionTip:
      'Replace static screenshots with annotated UI callouts and link each feature directly to a measurable business outcome.',
    icon: Layers,
  },
  {
    id: 'node-use-cases',
    title: 'Use Cases',
    badge: 'By Role / Team',
    whyItMatters:
      'Helps different stakeholders (Founders, RevOps, Engineering, Finance) see why your SaaS matters to their daily workflow.',
    conversionTip:
      'Include a role-specific pain-to-solution matrix and a relevant customer quote on every use-case page.',
    icon: Laptop,
  },
  {
    id: 'node-integrations',
    title: 'Integrations',
    badge: 'Ecosystem',
    whyItMatters:
      'B2B buyers rarely buy standalone tools—they need assurance that your software connects to their existing stack.',
    conversionTip:
      'Create individual SEO-indexable pages for every integration (e.g. "/integrations/hubspot") to capture high-intent search traffic.',
    icon: Workflow,
  },
  {
    id: 'node-pricing',
    title: 'Pricing',
    badge: 'High Intent',
    whyItMatters:
      'The second most visited page on any SaaS website and where prospects decide whether to start a trial or talk to sales.',
    conversionTip:
      'Highlight your recommended growth tier, add an annual/monthly savings toggle, and answer billing FAQs right below the table.',
    icon: CreditCard,
  },
  {
    id: 'node-comparison',
    title: 'Comparison ("vs") Pages',
    badge: 'BOFU SEO',
    whyItMatters:
      'Captures buyers actively comparing you against legacy competitors right before they make a purchasing decision.',
    conversionTip:
      'Use an honest side-by-side feature table and offer a "Free Migration Package" CTA to win switching customers.',
    icon: GitCompare,
  },
  {
    id: 'node-customers',
    title: 'Customers / Case Studies',
    badge: 'Social Proof',
    whyItMatters:
      'De-risks the buying decision for enterprise procurement teams by proving real-world ROI.',
    conversionTip:
      'Lead every case study title with the hard metric ("How Acme Cut CAC by 32%") and place a sticky demo CTA in the sidebar.',
    icon: Award,
  },
  {
    id: 'node-resources',
    title: 'Resources & Blog',
    badge: 'Organic Growth',
    whyItMatters:
      'Builds topical authority for Google SEO and earns brand citations inside AI answer engines (ChatGPT, Perplexity).',
    conversionTip:
      'Embed contextual inline CTA cards inside every article that match the reader’s topic to a specific product feature.',
    icon: BookOpen,
  },
  {
    id: 'node-docs',
    title: 'Docs / Help Center',
    badge: 'Product Trust',
    whyItMatters:
      'Technical buyers and developers inspect documentation before signing up to verify API quality and ease of setup.',
    conversionTip:
      'Keep docs fast, searchable, and add a "Start Free API Sandbox" button in the top navigation bar.',
    icon: FileText,
  },
  {
    id: 'node-demo',
    title: 'Book a Demo',
    badge: 'Conversion Goal',
    whyItMatters:
      'Where marketing traffic turns into qualified sales pipeline—every unnecessary form field costs you demos.',
    conversionTip:
      'Show exactly what happens on the 25-minute call, display 3 client logos, and embed instant calendar scheduling after form submit.',
    icon: Calendar,
  },
];

/* Section 6: Case Study — Metrics Dashboard (Single placeholder data object) */
const SAAS_CASE_STUDY = {
  clientName: 'CloudScale IQ (Placeholder)',
  clientCode: 'CS',
  industryTag: 'B2B SaaS',
  duration: '6 months',
  headline: 'How We Helped CloudScale IQ Grow Pipeline',
  challenge:
    'CloudScale IQ had a strong B2B analytics product, but their legacy marketing website took 2.1 seconds to load, suffered from a 1.1% demo conversion rate, and had zero visibility for high-intent competitor comparison queries.',
  whatWeDid: [
    'Re-architected the marketing site on Next.js 14 with interactive product tours and a modular headless CMS',
    'Built 24 programmatic "vs" comparison and integration pages optimized for SEO, AEO & GEO citations',
    'Deployed a 24/7 RAG AI Lead Qualification Agent connected to HubSpot and instant Calendly routing',
    'Redesigned the Pricing & Book-a-Demo flow with real-time company enrichment and 4-field friction reduction',
  ],
  quote:
    'WebXCode rebuilt our entire digital growth engine. Within six months, our organic pipeline more than doubled, page load speed dropped under one second, and our AEs only spend time on pre-qualified enterprise demos.',
  quoteAuthor: 'Siddharth Rao (Placeholder)',
  quoteRole: 'Co-Founder & Chief Revenue Officer, CloudScale IQ',
  kpis: [
    {
      value: '+140%',
      label: 'Organic Traffic',
      sub: 'High-intent B2B sessions',
      sparkline: [22, 30, 38, 52, 68, 85, 100],
    },
    {
      value: '+85%',
      label: 'Demo Bookings',
      sub: 'Qualified SQL calendar slots',
      sparkline: [30, 36, 48, 58, 72, 86, 100],
    },
    {
      value: '−32%',
      label: 'Cost per Lead',
      sub: 'Blended paid + organic CPL',
      sparkline: [100, 90, 82, 76, 68, 62, 55],
    },
    {
      value: '2.1s → 0.9s',
      label: 'Load Time',
      sub: '99 Lighthouse Performance',
      sparkline: [95, 80, 60, 45, 35, 28, 22],
    },
  ],
  beforeAfterDemos: {
    beforeLabel: 'Before WebXCode',
    beforeVal: 64,
    beforeText: '64 Demos / mo',
    afterLabel: 'After 6 Months',
    afterVal: 118,
    afterText: '118 Demos / mo (+85%)',
  },
};

/* Section 7: Integrations We Work With (12 stack items) */
interface IntegrationStackItem {
  name: string;
  category: string;
  code: string;
  arc: 'inner' | 'outer';
}

const SAAS_INTEGRATIONS: IntegrationStackItem[] = [
  { name: 'HubSpot', category: 'CRM & Marketing Hub', code: 'HS', arc: 'inner' },
  { name: 'Salesforce', category: 'Enterprise CRM', code: 'SF', arc: 'inner' },
  { name: 'Stripe', category: 'SaaS Billing & Subscriptions', code: 'ST', arc: 'inner' },
  { name: 'Intercom', category: 'Customer Messaging', code: 'IC', arc: 'inner' },
  { name: 'Zapier', category: 'Workflow Automation', code: 'ZP', arc: 'inner' },
  { name: 'Calendly', category: 'Demo Scheduling', code: 'CL', arc: 'inner' },
  { name: 'Google Analytics 4', category: 'Funnel Attribution', code: 'G4', arc: 'outer' },
  { name: 'Mixpanel', category: 'Product Analytics', code: 'MP', arc: 'outer' },
  { name: 'Segment', category: 'Customer Data Platform', code: 'SG', arc: 'outer' },
  { name: 'Slack', category: 'Instant SDR Alerts', code: 'SL', arc: 'outer' },
  { name: 'OpenAI', category: 'LLM Lead Agents', code: 'OA', arc: 'outer' },
  { name: 'Anthropic Claude', category: 'Enterprise AI Reasoning', code: 'AC', arc: 'outer' },
];

/* Section 8: Engagement Models (3 Pricing-Style Cards) */
interface EngagementPlanItem {
  id: string;
  name: string;
  subtitle: string;
  priceText: string;
  priceSub: string;
  featured?: boolean;
  badge?: string;
  features: string[];
}

const ENGAGEMENT_PLANS: EngagementPlanItem[] = [
  {
    id: 'launch',
    name: 'Launch',
    subtitle:
      'For new SaaS & B2B brands needing a high-converting marketing website and foundational SEO.',
    priceText: 'Starting from ₹1,25,000 / $1,600',
    priceSub: 'Placeholder one-time milestone engagement',
    features: [
      'Custom Next.js or Headless CMS marketing website (up to 12 pages)',
      'Core pages: Home, Product, Pricing, Case Studies & Book a Demo',
      'Technical SEO, Core Web Vitals (95+) & AEO JSON-LD schema setup',
      'GA4, conversion events & basic CRM form integration',
      '30 days of post-launch warranty & team CMS training',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    subtitle:
      'Full-funnel monthly growth retainer combining SEO/AEO, comparison pages, Google Ads, and CRO.',
    priceText: 'Starting from ₹75,000 / $950 /month',
    priceSub: 'Placeholder monthly retainer · No long-term lock-in',
    featured: true,
    badge: 'MOST POPULAR',
    features: [
      'Comprehensive SaaS SEO, AEO & GEO optimization for AI search citations',
      '4+ new landing, use-case, or competitor ("vs") pages built monthly',
      'High-intent Google Search Ads management for demo & trial sign-ups',
      'Continuous Conversion Rate Optimization (CRO) & A/B funnel testing',
      'Bi-weekly pipeline attribution reporting & dedicated growth strategist',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    subtitle:
      'Custom web app or customer portal, 24/7 AI lead agent, deep CRM automation, and a dedicated engineering pod.',
    priceText: 'Custom pricing',
    priceSub: 'Tailored to your product roadmap & team velocity',
    features: [
      'Custom SaaS Web App, MVP, or multi-tenant Customer Portal development',
      'Custom-trained 24/7 AI Lead Qualification Chatbot & Voice Agent',
      'Deep HubSpot / Salesforce two-way sync, scoring & automated routing',
      'Dedicated senior full-stack developers, UI/UX designer & AI engineer',
      'Priority SLA support, security hardening & cloud DevOps management',
    ],
  },
];

/* Section 9: Launch Timeline — Gantt View (W1–W8) */
interface GanttPhaseItem {
  phase: string;
  deliverable: string;
  startWeek: number; // 1-8
  endWeek: number; // 1-8
  weekLabel: string;
}

const GANTT_PHASES: GanttPhaseItem[] = [
  {
    phase: 'Discovery & Strategy',
    deliverable: 'ICP research, competitor audit & conversion architecture',
    startWeek: 1,
    endWeek: 1,
    weekLabel: 'W1',
  },
  {
    phase: 'Messaging & Sitemap',
    deliverable: 'Positioning copy, blueprint wireframes & funnel flow',
    startWeek: 1,
    endWeek: 2,
    weekLabel: 'W1–W2',
  },
  {
    phase: 'UI/UX Design',
    deliverable: 'Figma design system, interactive product visuals & prototypes',
    startWeek: 2,
    endWeek: 4,
    weekLabel: 'W2–W4',
  },
  {
    phase: 'Development & CMS',
    deliverable: 'Next.js frontend, headless CMS modules & CRM/AI integrations',
    startWeek: 3,
    endWeek: 7,
    weekLabel: 'W3–W7',
  },
  {
    phase: 'SEO & Analytics Setup',
    deliverable: 'Technical SEO, AEO/GEO schema, GA4 & conversion attribution',
    startWeek: 5,
    endWeek: 7,
    weekLabel: 'W5–W7',
  },
  {
    phase: 'QA & Launch',
    deliverable: 'Cross-device testing, 95+ speed audit, 301 redirects & go-live',
    startWeek: 7,
    endWeek: 8,
    weekLabel: 'W7–W8',
  },
];

/* Section 10: B2B / SaaS FAQ (6 items in 2-column accordion) */
const B2B_SAAS_FAQS = [
  {
    question: 'Do you work with early-stage SaaS startups?',
    answer:
      'Yes. We work with pre-seed and seed-stage founders launching their first MVP and marketing site, as well as Series A–C SaaS teams scaling their demand generation and enterprise conversion funnels.',
  },
  {
    question: 'Can you migrate our existing website without losing SEO rankings?',
    answer:
      'Absolutely. We run a complete URL inventory, preserve high-ranking slugs, implement 1:1 301 redirect maps, and upgrade your Core Web Vitals and structured schema—typically resulting in a net organic traffic lift within 30–60 days post-launch.',
  },
  {
    question: 'Which CMS do you recommend for SaaS marketing sites?',
    answer:
      'For fast-moving SaaS marketing teams, we typically recommend Next.js paired with Sanity, Strapi, or Headless WordPress. This gives your marketers drag-and-drop page building speed while preserving sub-second performance and strict security.',
  },
  {
    question: 'Can your AI chatbot integrate with HubSpot or Salesforce?',
    answer:
      'Yes. Our custom AI lead qualification agents integrate directly with HubSpot, Salesforce, Pipedrive, Zoho, Calendly, and Slack—enriching contact records, scoring ICP fit, and booking demos on the right AE’s calendar.',
  },
  {
    question: 'Do you build SaaS products and MVPs, or only websites?',
    answer:
      'We build both. Our full-stack engineering team designs and develops complete SaaS web applications, multi-tenant dashboards, customer portals, Stripe subscription billing flows, and custom AI features alongside high-converting marketing sites.',
  },
  {
    question: 'How do you measure success — traffic or pipeline?',
    answer:
      'Pipeline comes first. While we track technical metrics like Core Web Vitals and keyword rankings, our primary north-star KPIs are qualified demo bookings, free-trial sign-ups, customer acquisition cost (CAC), and marketing-sourced ARR.',
  },
];

/* ============================================================================
   HELPER MINI UI ILLUSTRATIONS FOR SECTION 4 CARDS (Strict Blue/Navy/White)
============================================================================ */
const ServiceMiniIllustration: React.FC<{
  type: SaasServiceCardItem['illustrationType'];
}> = ({ type }) => {
  switch (type) {
    case 'browser':
      return (
        <div
          aria-hidden="true"
          className="h-28 rounded-[14px] bg-primary-50/80 border border-primary-100 p-3 flex flex-col justify-between overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-primary-100 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-navy/30" />
              <span className="w-2 h-2 rounded-full bg-navy/30" />
              <span className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white text-[9px] font-bold text-navy-70">
              nextjs-saas.app
            </span>
          </div>
          <div className="grid grid-cols-12 gap-2 items-center pt-1">
            <div className="col-span-7 space-y-1.5">
              <div className="h-2.5 w-4/5 rounded bg-navy" />
              <div className="h-2 w-3/5 rounded bg-primary" />
              <div className="inline-block px-2 py-0.5 rounded-full bg-primary text-white text-[8px] font-bold">
                Book Demo →
              </div>
            </div>
            <div className="col-span-5 h-12 rounded-lg bg-white border border-primary-100 p-1.5 flex flex-col justify-between">
              <div className="h-1.5 w-2/3 rounded bg-primary/40" />
              <div className="flex items-end gap-1 h-6">
                <span className="flex-1 h-2 bg-primary/30 rounded-sm" />
                <span className="flex-1 h-3.5 bg-primary/60 rounded-sm" />
                <span className="flex-1 h-5 bg-primary rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'dashboard':
      return (
        <div
          aria-hidden="true"
          className="h-28 rounded-[14px] bg-navy text-white p-3 flex gap-2.5 overflow-hidden"
        >
          <div className="w-10 rounded-lg bg-white/10 p-1.5 flex flex-col gap-1.5">
            <span className="w-full h-2 rounded bg-primary" />
            <span className="w-3/4 h-1.5 rounded bg-white/30" />
            <span className="w-full h-1.5 rounded bg-white/20" />
            <span className="w-2/3 h-1.5 rounded bg-white/20" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/80">MRR Telemetry</span>
              <span className="px-2 py-0.5 rounded-full bg-primary text-[9px] font-bold">
                +42% MoM
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="rounded bg-white/10 p-1.5">
                <div className="text-[8px] text-white/60">Active Seats</div>
                <div className="text-[11px] font-extrabold text-white">14.2K</div>
              </div>
              <div className="rounded bg-white/10 p-1.5">
                <div className="text-[8px] text-white/60">Uptime</div>
                <div className="text-[11px] font-extrabold text-primary">99.99%</div>
              </div>
              <div className="rounded bg-white/10 p-1.5">
                <div className="text-[8px] text-white/60">API Latency</div>
                <div className="text-[11px] font-extrabold text-white">38ms</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'seo-chart':
      return (
        <div
          aria-hidden="true"
          className="h-28 rounded-[14px] bg-primary-50/80 border border-primary-100 p-3 flex flex-col justify-between overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full bg-white text-primary text-[9px] font-bold border border-primary-100">
              AI Citation #1 · AEO + GEO
            </span>
            <span className="text-[10px] font-extrabold text-navy">+240% SQLs</span>
          </div>
          <svg viewBox="0 0 200 45" className="w-full h-12 overflow-visible">
            <path
              d="M 0 40 Q 40 36, 70 26 T 140 14 T 200 4"
              fill="none"
              stroke="#0571c2"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="70" cy="26" r="3.5" fill="#1e242e" />
            <circle cx="140" cy="14" r="3.5" fill="#0571c2" />
            <circle cx="200" cy="4" r="4.5" fill="#0571c2" />
          </svg>
        </div>
      );

    case 'ads-funnel':
      return (
        <div
          aria-hidden="true"
          className="h-28 rounded-[14px] bg-primary-50/80 border border-primary-100 p-3 flex flex-col justify-center gap-1.5 overflow-hidden"
        >
          <div className="w-full h-5 rounded-md bg-navy/15 px-2.5 flex items-center justify-between text-[9px] font-bold text-navy">
            <span>Paid Search Impressions</span>
            <span>100%</span>
          </div>
          <div className="w-4/5 mx-auto h-5 rounded-md bg-primary/30 px-2.5 flex items-center justify-between text-[9px] font-bold text-navy">
            <span>High-Intent Landing Page</span>
            <span>48%</span>
          </div>
          <div className="w-3/5 mx-auto h-5 rounded-md bg-primary px-2.5 flex items-center justify-between text-[9px] font-bold text-white shadow-sm">
            <span>Booked SQL Demos</span>
            <span>14.2% CVR</span>
          </div>
        </div>
      );

    case 'ai-chat':
      return (
        <div
          aria-hidden="true"
          className="h-28 rounded-[14px] bg-navy text-white p-3 flex flex-col justify-between overflow-hidden"
        >
          <div className="self-start max-w-[80%] rounded-xl rounded-tl-xs bg-white/10 px-2.5 py-1.5 text-[10px] text-white/90">
            We have 120 sales reps. Does this sync with Salesforce?
          </div>
          <div className="self-end max-w-[85%] rounded-xl rounded-tr-xs bg-primary px-2.5 py-1.5 text-[10px] font-semibold text-white flex items-center justify-between gap-2">
            <span>Yes! Native 2-way sync. Book enterprise demo?</span>
            <span className="px-1.5 py-0.5 rounded bg-white text-navy text-[8px] font-extrabold shrink-0">
              ICP: 98
            </span>
          </div>
        </div>
      );

    case 'crm-flow':
      return (
        <div
          aria-hidden="true"
          className="h-28 rounded-[14px] bg-primary-50/80 border border-primary-100 p-3 flex items-center justify-between gap-2 overflow-hidden"
        >
          <div className="px-2.5 py-2 rounded-xl bg-white border border-navy-15 text-center shadow-2xs">
            <div className="text-[9px] font-bold text-navy-50">Web Lead</div>
            <div className="text-[11px] font-extrabold text-navy">Demo Form</div>
          </div>
          <div className="flex-1 h-0.5 bg-primary relative">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-primary text-white text-[8px] font-bold">
              Enrich
            </span>
          </div>
          <div className="px-2.5 py-2 rounded-xl bg-primary text-white text-center shadow-sm">
            <div className="text-[9px] font-bold text-white/80">HubSpot</div>
            <div className="text-[11px] font-extrabold">Deal Created</div>
          </div>
        </div>
      );
  }
};

/* ============================================================================
   MAIN B2B / SAAS PAGE COMPONENT (/industries/b2b-saas)
============================================================================ */

interface B2BSaaSProps {
  onOpenQuoteModal?: (service?: string) => void;
}

const B2BSaaS: React.FC<B2BSaaSProps> = ({ onOpenQuoteModal: propOpenQuoteModal  }) => {
  const { openQuoteModal: contextOpenQuoteModal } = useQuoteModal();
  const onOpenQuoteModal = propOpenQuoteModal || contextOpenQuoteModal;
  const prefersReducedMotion = useReducedMotion();

  // Section 3: Interactive Funnel active stage
  const [activeFunnelId, setActiveFunnelId] = useState<string>(
    SAAS_FUNNEL_STAGES[2].id // Default to "Demo / Trial"
  );

  // Section 5: Interactive Sitemap Blueprint active node
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>(
    BLUEPRINT_NODES[0].id
  );

  // Section 10: FAQ Accordion state (allow opening items in 2-col layout)
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<number, boolean>>({
    0: true,
    3: true,
  });

  // Section 11: Free Growth Audit Form state
  const [auditForm, setAuditForm] = useState({
    name: '',
    email: '',
    website: '',
    demoGoal: '25–50 demos / month',
  });
  const [auditErrors, setAuditErrors] = useState<{
    name?: string;
    email?: string;
    website?: string;
  }>({});
  const [auditSubmitting, setAuditSubmitting] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState(false);

  // SEO Meta & Document Title on mount
  useEffect(() => {
    document.title =
      'B2B & SaaS Web Development, SEO & AI Solutions | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'WebXCode helps B2B and SaaS companies build high-converting Next.js websites and web apps, rank for buyer-intent SEO/AEO searches, and automate lead qualification with AI.'
      );
    }
  }, []);

  const activeFunnelStage =
    SAAS_FUNNEL_STAGES.find((s) => s.id === activeFunnelId) ||
    SAAS_FUNNEL_STAGES[0];

  const activeBlueprintNode =
    BLUEPRINT_NODES.find((n) => n.id === activeBlueprintId) ||
    BLUEPRINT_NODES[0];

  const childBlueprintNodes = BLUEPRINT_NODES.filter((n) => !n.isRoot);

  const otherIndustries = industries.filter((ind) => ind.slug !== 'b2b-saas');

  const toggleFaq = (idx: number) => {
    setOpenFaqIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  /* Single Audit Form Submit Handler */
  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; website?: string } = {};

    if (!auditForm.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (
      !auditForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(auditForm.email.trim())
    ) {
      newErrors.email = 'Please enter a valid work email address.';
    }
    if (!auditForm.website.trim()) {
      newErrors.website = 'Please enter your company website URL.';
    }

    if (Object.keys(newErrors).length > 0) {
      setAuditErrors(newErrors);
      return;
    }

    setAuditErrors({});
    setAuditSubmitting(true);

    // TODO: Connect handleAuditSubmit to backend / CRM webhook endpoint (e.g., POST /api/saas-audit)
    setTimeout(() => {
      setAuditSubmitting(false);
      setAuditSuccess(true);
    }, 900);
  };

  // JSON-LD: Service + BreadcrumbList + FAQPage
  const jsonLdGraph = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'B2B & SaaS Web Development, SEO & AI Solutions',
      serviceType: [
        'SaaS Website Development',
        'Web Application Development',
        'B2B SEO, AEO & GEO',
        'AI Lead Qualification Chatbots',
        'CRM & Marketing Automation',
      ],
      description: b2bSaasIndustry.tagline,
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      areaServed: ['IN', 'US', 'GB', 'AE', 'Worldwide'],
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'B2B & SaaS Companies, Founders, Marketing & Growth Teams',
      },
    },
    {
      '@context': 'https://schema.org',
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
          name: 'Industries',
          item: 'https://webxcode.com/industries',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: b2bSaasIndustry.name,
          item: 'https://webxcode.com/industries/b2b-saas',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: B2B_SAAS_FAQS.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      {/* ====================================================================
          1. HERO — SAAS DASHBOARD (navy — 50/50 split)
      ==================================================================== */}
      <section className="relative bg-navy text-white pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
        {/* Faint SaaS Product UI Grid Lines & Blue Radial Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -right-20 top-1/4 w-[640px] h-[640px] blue-glow-strong pointer-events-none" />
        <div className="absolute -left-24 bottom-0 w-[460px] h-[460px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 50% (6 cols) */}
            <div className="lg:col-span-6">
              {/* Breadcrumb: Home › Industries › B2B / SaaS */}
              <nav
                aria-label="Breadcrumb"
                className="inline-flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/70 mb-6"
              >
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
                <Link
                  href="/industries"
                  className="hover:text-white transition-colors"
                >
                  Industries
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
                <span className="text-white font-semibold" aria-current="page">
                  {b2bSaasIndustry.name}
                </span>
              </nav>

              {/* Label on Dark */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em]">
                  <Laptop className="w-3.5 h-3.5 text-primary" />
                  <span>B2B / SAAS</span>
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold leading-[1.08] tracking-tight mb-5">
                Websites, SEO &amp; AI That Turn Visitors Into{' '}
                <span className="text-primary">Pipeline</span>
              </h1>

              {/* Paragraph */}
              <p className="text-[17px] sm:text-[18px] text-white/75 leading-relaxed mb-8 max-w-xl">
                We help B2B and SaaS companies build high-converting websites and web
                apps, rank for buyer-intent searches, and automate lead qualification
                with AI — so your sales team talks to better leads.
              </p>

              {/* Primary + Outline Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-7">
                <a
                  href="#audit"
                  className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Book a Free Growth Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/our-work"
                  className="px-7 py-4 rounded-full border border-white/25 hover:border-white hover:bg-white/10 text-white font-bold text-[15px] transition-all inline-flex items-center gap-2"
                >
                  <span>See SaaS Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Small Trust Line */}
              <div className="inline-flex items-center gap-2.5 text-[13px] font-semibold text-white/70">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>
                  Built for SaaS, B2B services and tech startups ·{' '}
                  <strong className="text-white">{b2bSaasIndustry.tagline}</strong>
                </span>
              </div>
            </div>

            {/* Right 50% (6 cols): Animated SaaS Dashboard Mockup */}
            <div className="lg:col-span-6 relative">
              {/* Floating Glass Chip 1 (Top Right outside window) */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden sm:flex absolute -top-5 right-4 z-20 items-center gap-2.5 px-4 py-2.5 rounded-full bg-navy/90 backdrop-blur-md border border-primary/50 shadow-xl text-white text-[12px] font-bold"
              >
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                  <Bot className="w-3.5 h-3.5" />
                </span>
                <span>AI Lead Scoring · ICP 96%</span>
              </motion.div>

              {/* Floating Glass Chip 2 (Bottom Left outside window) */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="hidden sm:flex absolute -bottom-5 -left-4 z-20 items-center gap-2.5 px-4 py-2.5 rounded-full bg-primary text-white shadow-xl text-[12px] font-bold border border-white/25"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Book a Demo ✓ · Synced to HubSpot</span>
              </motion.div>

              {/* Main White Rounded "App Window" with Navy Sidebar */}
              <div
                role="img"
                aria-label="SaaS Pipeline Analytics Dashboard showing rising Demo Bookings chart, Trial Sign-ups +68%, CAC -32%, and Organic Pipeline +140%"
                className="rounded-[24px] bg-white text-navy border border-white/20 shadow-2xl overflow-hidden"
              >
                {/* Window Chrome Top Bar */}
                <div className="bg-navy px-5 py-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>
                  <div className="px-3 py-0.5 rounded-full bg-white/10 text-[11px] text-white/75 font-semibold">
                    growth.webxcode-saas.io/pipeline
                  </div>
                  <span className="text-[11px] font-bold text-primary">
                    LIVE TELEMETRY
                  </span>
                </div>

                {/* Window Body: Navy Sidebar + White Analytics Canvas */}
                <div className="grid grid-cols-12">
                  {/* Navy Sidebar (3 cols on sm+) */}
                  <div className="hidden sm:flex sm:col-span-3 bg-navy text-white p-4 flex-col justify-between border-r border-navy-08">
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-white/45 px-2">
                        Workspace
                      </div>
                      <div className="px-2.5 py-2 rounded-xl bg-primary text-white text-[12px] font-bold flex items-center gap-2">
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>Pipeline</span>
                      </div>
                      <div className="px-2.5 py-1.5 rounded-xl text-white/65 text-[12px] font-medium flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-primary" />
                        <span>SEO &amp; AEO</span>
                      </div>
                      <div className="px-2.5 py-1.5 rounded-xl text-white/65 text-[12px] font-medium flex items-center gap-2">
                        <Bot className="w-3.5 h-3.5 text-primary" />
                        <span>AI Agent</span>
                      </div>
                      <div className="px-2.5 py-1.5 rounded-xl text-white/65 text-[12px] font-medium flex items-center gap-2">
                        <Workflow className="w-3.5 h-3.5 text-primary" />
                        <span>CRM Sync</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px]">
                      <div className="text-white/50 font-medium">PageSpeed</div>
                      <div className="text-[16px] font-extrabold text-primary">
                        99 / 100
                      </div>
                    </div>
                  </div>

                  {/* Main Dashboard Area (12 cols mobile, 9 cols sm+) */}
                  <div className="col-span-12 sm:col-span-9 p-5 sm:p-6 space-y-5 bg-white">
                    {/* 3 Metric Cards */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                      {HERO_DASHBOARD_METRICS.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-2xl bg-primary-50/70 border border-primary-100 p-3"
                        >
                          <div className="text-[18px] sm:text-[22px] font-extrabold text-primary leading-none tabular-nums mb-1">
                            {m.value}
                          </div>
                          <div className="text-[11px] font-bold text-navy leading-tight">
                            {m.label}
                          </div>
                          <div className="text-[10px] text-navy-50 mt-0.5 hidden sm:block">
                            {m.note}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chart + Funnel Split */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                      {/* Rising Line Chart: "Demo Bookings" */}
                      <div className="md:col-span-7 rounded-2xl border border-navy-08 p-4 flex flex-col justify-between bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-navy-50">
                              SQL VELOCITY
                            </div>
                            <div className="text-[15px] font-extrabold text-navy">
                              Demo Bookings
                            </div>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary text-[11px] font-bold">
                            +85% QoQ
                          </span>
                        </div>

                        <svg
                          viewBox="0 0 240 90"
                          className="w-full h-24 overflow-visible"
                          aria-label="Rising line chart of monthly SaaS demo bookings"
                        >
                          <defs>
                            <linearGradient
                              id="saasHeroChartFill"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#0571c2" stopOpacity="0.28" />
                              <stop offset="100%" stopColor="#0571c2" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          {/* Grid lines */}
                          <line
                            x1="0"
                            y1="20"
                            x2="240"
                            y2="20"
                            stroke="#1e242e"
                            strokeOpacity="0.08"
                            strokeDasharray="3 3"
                          />
                          <line
                            x1="0"
                            y1="50"
                            x2="240"
                            y2="50"
                            stroke="#1e242e"
                            strokeOpacity="0.08"
                            strokeDasharray="3 3"
                          />
                          <line
                            x1="0"
                            y1="80"
                            x2="240"
                            y2="80"
                            stroke="#1e242e"
                            strokeOpacity="0.08"
                          />
                          {/* Area under curve */}
                          <path
                            d="M 6 76 C 45 72, 75 58, 115 48 C 155 38, 190 22, 234 10 L 234 84 L 6 84 Z"
                            fill="url(#saasHeroChartFill)"
                          />
                          {/* Animated Blue Chart Line */}
                          <motion.path
                            d="M 6 76 C 45 72, 75 58, 115 48 C 155 38, 190 22, 234 10"
                            fill="none"
                            stroke="#0571c2"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            initial={
                              prefersReducedMotion ? false : { pathLength: 0 }
                            }
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.4, ease: 'easeOut' }}
                          />
                          <circle cx="115" cy="48" r="4" fill="#0571c2" />
                          <circle cx="180" cy="24" r="4" fill="#0571c2" />
                          <circle
                            cx="234"
                            cy="10"
                            r="5"
                            fill="#0571c2"
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                        </svg>

                        <div className="flex items-center justify-between text-[10px] font-semibold text-navy-50 pt-1">
                          <span>M1</span>
                          <span>M2</span>
                          <span>M3</span>
                          <span>M4</span>
                          <span>M5</span>
                          <span className="text-primary font-bold">M6</span>
                        </div>
                      </div>

                      {/* Side Funnel Bar Widget */}
                      <div className="md:col-span-5 rounded-2xl border border-navy-08 p-4 bg-primary-50/40 flex flex-col justify-between">
                        <div className="text-[12px] font-extrabold text-navy mb-2">
                          Funnel Conversion
                        </div>
                        <div className="space-y-2.5">
                          {HERO_FUNNEL_BARS.map((bar) => (
                            <div key={bar.stage}>
                              <div className="flex items-center justify-between text-[10px] font-bold text-navy-70 mb-1">
                                <span>{bar.stage}</span>
                                <span className="text-primary">{bar.val}</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-navy-08 overflow-hidden">
                                <motion.div
                                  initial={
                                    prefersReducedMotion
                                      ? false
                                      : { width: 0 }
                                  }
                                  animate={{ width: `${bar.pct}%` }}
                                  transition={{ duration: 0.9, delay: 0.2 }}
                                  className="h-full rounded-full bg-primary"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. "SOUND FAMILIAR?" — PAIN POINTS AS CHAT BUBBLES (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              SOUND FAMILIAR?
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              Growth Problems Every{' '}
              <span className="text-primary">SaaS Team</span> Knows
            </h2>
            <p className="text-[16px] text-navy-70">
              Here is what SaaS founders and marketing leaders tell us on discovery
              calls—and how we fix each bottleneck.
            </p>
          </div>

          {/* Slack-Style Split Conversation Thread */}
          <div className="max-w-[1060px] mx-auto space-y-6">
            {PAIN_POINT_THREADS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center bg-primary-50/35 rounded-[24px] p-4 sm:p-6 border border-navy-08"
              >
                {/* Left: Founder Chat Bubble (light grey-blue) */}
                <div className="lg:col-span-6 flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-navy text-white font-extrabold text-[13px] flex items-center justify-center shrink-0 shadow-sm">
                    {item.founderInitials}
                  </div>
                  <div className="flex-1 bg-white rounded-2xl rounded-tl-xs p-4 sm:p-5 border border-navy-08 shadow-soft">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[12px] font-extrabold text-navy">
                        {item.founderRole}
                      </span>
                      <span className="text-[11px] font-medium text-navy-50">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-[15px] sm:text-[16px] font-semibold text-navy-90 leading-snug">
                      &ldquo;{item.problemText}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Right: Matching WebXCode Reply Bubble (solid blue) */}
                <div className="lg:col-span-6 flex items-start justify-end gap-3.5">
                  <div className="flex-1 bg-primary text-white rounded-2xl rounded-tr-xs p-4 sm:p-5 shadow-soft">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white/90">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>WebXCode Growth Team</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                        {item.replyBadge}
                      </span>
                    </div>
                    <p className="text-[15px] sm:text-[16px] font-bold text-white leading-snug">
                      {item.replyText}
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-primary-50 border border-primary-100 text-primary font-extrabold text-[13px] flex items-center justify-center shrink-0">
                    WX
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. THE SAAS GROWTH FUNNEL — INTERACTIVE (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-sm">
              FULL-FUNNEL GROWTH
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              We Cover Every Stage of{' '}
              <span className="text-primary">Your Funnel</span>
            </h2>
            <p className="text-[16px] text-navy-70">
              Click or hover any stage of the SaaS growth funnel below to inspect our
              deliverables and target KPIs.
            </p>
          </div>

          {/* Horizontal Tapering Funnel Graphic on Desktop / Stacked Tapering Bars on Mobile */}
          <div
            role="tablist"
            aria-label="SaaS Growth Funnel Stages"
            className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-8 items-center"
          >
            {SAAS_FUNNEL_STAGES.map((stage, idx) => {
              const isSelected = activeFunnelId === stage.id;
              const heights = [
                'lg:h-[116px]',
                'lg:h-[104px]',
                'lg:h-[94px]',
                'lg:h-[84px]',
                'lg:h-[74px]',
              ];
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFunnelId(stage.id)}
                  onMouseEnter={() => setActiveFunnelId(stage.id)}
                  style={{
                    width:
                      typeof window !== 'undefined' && window.innerWidth < 1024
                        ? `${stage.widthPercent}%`
                        : '100%',
                  }}
                  className={`mx-auto w-full ${heights[idx]} rounded-[18px] p-4 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-soft-hover -translate-y-1.5'
                      : 'bg-white text-navy border-navy-08 hover:border-primary-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-primary-50 text-primary'
                      }`}
                    >
                      Stage {stage.stepNum}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 ${
                        isSelected ? 'text-white' : 'text-primary'
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-[17px] font-extrabold leading-tight">
                      {stage.name}
                    </div>
                    <div
                      className={`text-[11px] font-semibold mt-0.5 ${
                        isSelected ? 'text-white/85' : 'text-navy-50'
                      }`}
                    >
                      KPI: {stage.keyMetric}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail Card Below Funnel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFunnelStage.id}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="bg-white rounded-[24px] p-6 sm:p-10 border border-navy-08 shadow-soft"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left (5 cols): Stage Name, Goal & Key Metric Chip */}
                <div className="lg:col-span-5 space-y-4 lg:border-r border-navy-08 lg:pr-8">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-wider">
                    <span>STAGE {activeFunnelStage.stepNum}</span>
                    <span>·</span>
                    <span>{activeFunnelStage.name}</span>
                  </div>

                  <h3 className="text-[26px] sm:text-[30px] font-extrabold text-navy leading-tight">
                    {activeFunnelStage.name} Stage Execution
                  </h3>

                  <p className="text-[15px] sm:text-[16px] text-navy-70 leading-relaxed">
                    {activeFunnelStage.goal}
                  </p>

                  <div className="pt-2">
                    <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-navy text-white">
                      <TrendingUp className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                          Primary Metric: {activeFunnelStage.keyMetric}
                        </div>
                        <div className="text-[14px] font-extrabold text-white">
                          {activeFunnelStage.metricTarget}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right (7 cols): "What we do" List with Blue Checkmarks */}
                <div className="lg:col-span-7 space-y-5">
                  <h4 className="text-[14px] font-extrabold uppercase tracking-wider text-primary">
                    What We Do in the {activeFunnelStage.name} Stage
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeFunnelStage.whatWeDo.map((item) => (
                      <li
                        key={item}
                        className="p-4 rounded-2xl bg-primary-50/50 border border-primary-100 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                        <span className="text-[14px] font-bold text-navy leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ====================================================================
          4. SERVICES FOR B2B & SAAS (white — 3x2 product feature cards)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                WHAT WE BUILD
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Services Built for{' '}
                <span className="text-primary">B2B &amp; SaaS</span>
              </h2>
            </div>
            <p className="text-[15px] text-navy-70 max-w-md">
              End-to-end product engineering, buyer-intent search, and AI qualification
              under one roof.
            </p>
          </div>

          {/* 3x2 Grid of Product Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SAAS_SERVICES.map((srv) => {
              const IconComp = srv.icon;
              return (
                <article
                  key={srv.id}
                  className="group bg-white rounded-[20px] p-6 border border-navy-08 shadow-soft hover:shadow-soft-hover hover:border-primary-100 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Mini UI-Style Illustration at Top */}
                    <div className="mb-5">
                      <ServiceMiniIllustration type={srv.illustrationType} />
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-[20px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug">
                        {srv.title}
                      </h3>
                    </div>

                    {/* 2-Line Description */}
                    <p className="text-[14px] text-navy-70 leading-relaxed mb-4">
                      {srv.description}
                    </p>

                    {/* 3 Bullet Points */}
                    <ul className="space-y-2 mb-6">
                      {srv.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-[13px] font-semibold text-navy-90"
                        >
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-navy-08/60">
                    <button
                      type="button"
                      onClick={() => onOpenQuoteModal(`B2B SaaS: ${srv.title}`)}
                      className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary group-hover:translate-x-1 transition-transform cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. THE HIGH-CONVERTING SAAS WEBSITE BLUEPRINT (navy — interactive sitemap tree)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WEBSITE BLUEPRINT
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight mb-3">
              Every Page Your SaaS Website{' '}
              <span className="text-primary">Needs</span>
            </h2>
            <p className="text-[16px] text-white/75">
              Click or hover any page node in our proven SaaS sitemap architecture to see
              why it matters and how we optimize it for conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left (8 cols): Interactive Sitemap Tree */}
            <div className="lg:col-span-8">
              {/* Root Node ("Home") at the Top */}
              <div className="flex flex-col items-center">
                {(() => {
                  const rootNode = BLUEPRINT_NODES[0];
                  const RootIcon = rootNode.icon;
                  const isRootActive = activeBlueprintId === rootNode.id;
                  return (
                    <button
                      type="button"
                      aria-pressed={isRootActive}
                      onClick={() => setActiveBlueprintId(rootNode.id)}
                      onMouseEnter={() => setActiveBlueprintId(rootNode.id)}
                      className={`px-7 py-4 rounded-[20px] border transition-all cursor-pointer flex items-center gap-3.5 shadow-xl ${
                        isRootActive
                          ? 'bg-primary border-white text-white scale-105'
                          : 'bg-white/10 border-primary/50 text-white hover:bg-white/15'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <RootIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                          {rootNode.badge}
                        </span>
                        <span className="text-[18px] font-extrabold">
                          {rootNode.title}
                        </span>
                      </div>
                    </button>
                  );
                })()}

                {/* Glowing Blue Connector Stem + Horizontal Branch Line (Desktop) */}
                <div
                  aria-hidden="true"
                  className="w-0.5 h-8 bg-gradient-to-b from-primary to-primary/60"
                />
                <div
                  aria-hidden="true"
                  className="hidden sm:block w-4/5 h-0.5 bg-gradient-to-r from-transparent via-primary/70 to-transparent mb-6"
                />
              </div>

              {/* 9 Child Sitemap Nodes Grid (3x3 on sm+, vertical expandable list on mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {childBlueprintNodes.map((node) => {
                  const NodeIcon = node.icon;
                  const isActive = activeBlueprintId === node.id;
                  return (
                    <div key={node.id} className="flex flex-col">
                      <button
                        type="button"
                        aria-pressed={isActive}
                        aria-expanded={isActive}
                        onClick={() => setActiveBlueprintId(node.id)}
                        onMouseEnter={() => setActiveBlueprintId(node.id)}
                        className={`w-full rounded-[18px] p-4 text-left border transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                          isActive
                            ? 'bg-primary border-white/60 text-white shadow-lg -translate-y-1'
                            : 'bg-white/5 border-white/10 text-white/85 hover:bg-white/10 hover:border-primary/50'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-primary/20 text-primary'
                          }`}
                        >
                          <NodeIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider block ${
                              isActive ? 'text-white/85' : 'text-primary'
                            }`}
                          >
                            {node.badge}
                          </span>
                          <h3 className="text-[15px] font-extrabold leading-snug truncate">
                            {node.title}
                          </h3>
                        </div>
                      </button>

                      {/* Mobile Inline Expandable Details */}
                      {isActive && (
                        <div className="lg:hidden mt-2 p-4 rounded-2xl bg-white/10 border border-primary/40 text-[13px] space-y-2">
                          <div>
                            <span className="font-extrabold text-primary">
                              Why it matters:{' '}
                            </span>
                            <span className="text-white/90">{node.whyItMatters}</span>
                          </div>
                          <div>
                            <span className="font-extrabold text-primary">
                              Conversion tip:{' '}
                            </span>
                            <span className="text-white/90">{node.conversionTip}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right (4 cols): Side Tooltip Inspector Panel */}
            <div className="lg:col-span-4 lg:sticky lg:top-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBlueprintNode.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[24px] bg-white/10 border border-primary/50 p-6 sm:p-8 backdrop-blur-md shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0">
                      {(() => {
                        const ActiveIcon = activeBlueprintNode.icon;
                        return <ActiveIcon className="w-6 h-6" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                        BLUEPRINT NODE · {activeBlueprintNode.badge}
                      </span>
                      <h3 className="text-[22px] font-extrabold text-white">
                        {activeBlueprintNode.title}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-navy/80 border border-white/10">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-primary mb-1">
                        Why it matters
                      </div>
                      <p className="text-[14px] text-white/90 leading-relaxed">
                        {activeBlueprintNode.whyItMatters}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-primary/20 border border-primary/40">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-white mb-1 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        <span>Conversion Tip</span>
                      </div>
                      <p className="text-[14px] text-white font-medium leading-relaxed">
                        {activeBlueprintNode.conversionTip}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/15">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenQuoteModal(
                          `SaaS Blueprint: ${activeBlueprintNode.title}`
                        )
                      }
                      className="w-full py-3 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Build This SaaS Sitemap</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. CASE STUDY — METRICS DASHBOARD (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                CASE STUDY
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                How We Helped{' '}
                <span className="text-primary">{SAAS_CASE_STUDY.clientName}</span>{' '}
                Grow Pipeline
              </h2>
            </div>
            <Link
              href="/our-work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-navy-15 hover:border-primary text-navy hover:text-primary font-bold text-[14px] transition-colors shrink-0"
            >
              <span>View More Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Large Analytics Report Card */}
          <div className="rounded-[24px] bg-white border border-navy-08 shadow-soft overflow-hidden">
            {/* Report Top Bar */}
            <div className="bg-navy text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white font-extrabold text-[14px] flex items-center justify-center">
                  {SAAS_CASE_STUDY.clientCode}
                </div>
                <div>
                  <div className="text-[16px] font-extrabold text-white">
                    {SAAS_CASE_STUDY.clientName}
                  </div>
                  <div className="text-[12px] text-white/65">
                    Enterprise Cloud Cost &amp; FinOps SaaS
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-primary/25 border border-primary/40 text-white text-[12px] font-bold">
                  Industry: {SAAS_CASE_STUDY.industryTag}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-white/10 text-white/85 text-[12px] font-semibold">
                  Duration: {SAAS_CASE_STUDY.duration}
                </span>
              </div>
            </div>

            {/* Report Body: Left Narrative + Right 4 KPI Sparkline Tiles */}
            <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (6 cols): Challenge + What We Did + Quote */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-primary mb-2">
                    The Challenge
                  </h3>
                  <p className="text-[15px] text-navy-70 leading-relaxed">
                    {SAAS_CASE_STUDY.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-primary mb-3">
                    What We Did
                  </h3>
                  <ul className="space-y-2.5">
                    {SAAS_CASE_STUDY.whatWeDid.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[14px] font-semibold text-navy"
                      >
                        <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Client Quote with Avatar */}
                <div className="p-5 rounded-2xl bg-primary-50/70 border border-primary-100">
                  <p className="text-[14px] sm:text-[15px] italic font-semibold text-navy leading-relaxed mb-3">
                    &ldquo;{SAAS_CASE_STUDY.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-[12px] flex items-center justify-center">
                      SR
                    </div>
                    <div>
                      <div className="text-[13px] font-extrabold text-navy">
                        {SAAS_CASE_STUDY.quoteAuthor}
                      </div>
                      <div className="text-[11px] text-navy-50 font-medium">
                        {SAAS_CASE_STUDY.quoteRole}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (6 cols): 4 KPI Tiles with Sparklines + Before/After Bar Chart */}
              <div className="lg:col-span-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SAAS_CASE_STUDY.kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-2xl p-5 bg-white border border-navy-08 shadow-soft flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[12px] font-bold text-navy-50 mb-1">
                          {kpi.label}
                        </div>
                        <div className="text-[28px] sm:text-[32px] font-extrabold text-primary leading-none tabular-nums mb-1">
                          {kpi.value}
                        </div>
                        <div className="text-[12px] font-semibold text-navy-70 mb-4">
                          {kpi.sub}
                        </div>
                      </div>

                      {/* Mini Sparkline Bars in Blue Tints */}
                      <div
                        aria-hidden="true"
                        className="flex items-end gap-1.5 h-9 pt-2 border-t border-navy-08/60"
                      >
                        {kpi.sparkline.map((val, sIdx) => (
                          <div
                            key={sIdx}
                            style={{ height: `${val}%` }}
                            className={`flex-1 rounded-t-sm ${
                              sIdx === kpi.sparkline.length - 1
                                ? 'bg-primary'
                                : 'bg-primary/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom: Before / After Mini Bar Chart Comparing Monthly Demos */}
                <div
                  role="img"
                  aria-label="Before and After comparison showing monthly demos rising from 64 per month to 118 per month"
                  className="rounded-2xl bg-navy text-white p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] font-extrabold uppercase tracking-wider text-primary">
                      Monthly Qualified Demo Volume (Before vs. After)
                    </span>
                    <span className="text-[12px] font-bold text-white/75">
                      +85% Lift
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[12px] font-semibold text-white/75 mb-1">
                        <span>{SAAS_CASE_STUDY.beforeAfterDemos.beforeLabel}</span>
                        <span>{SAAS_CASE_STUDY.beforeAfterDemos.beforeText}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-white/40"
                          style={{ width: '54%' }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[12px] font-bold text-white mb-1">
                        <span>{SAAS_CASE_STUDY.beforeAfterDemos.afterLabel}</span>
                        <span className="text-primary">
                          {SAAS_CASE_STUDY.beforeAfterDemos.afterText}
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. INTEGRATIONS WE WORK WITH (light blue tint — hub-and-spoke diagram)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-sm">
              INTEGRATIONS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              Plugs Into <span className="text-primary">Your Stack</span>
            </h2>
            <p className="text-[16px] text-navy-70">
              Every website, web app, and AI agent we ship connects cleanly with your
              CRM, billing, analytics, and product telemetry tools.
            </p>
          </div>

          {/* Hub-and-Spoke Layout: Top Arc (6) -> Central WebXCode Hub -> Bottom Arc (6) */}
          <div className="relative max-w-[1080px] mx-auto">
            {/* Top Arc (Inner 6 Integrations) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {SAAS_INTEGRATIONS.slice(0, 6).map((item) => (
                <div
                  key={item.name}
                  className="group bg-white rounded-[18px] p-4 border border-navy-08 shadow-soft hover:border-primary hover:-translate-y-1 transition-all flex flex-col items-center text-center"
                >
                  <div className="w-11 h-11 rounded-xl bg-navy/5 group-hover:bg-primary text-navy/45 group-hover:text-white font-extrabold text-[14px] flex items-center justify-center transition-colors mb-2.5">
                    {item.code}
                  </div>
                  <h3 className="text-[14px] font-extrabold text-navy group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-[11px] text-navy-50 mt-0.5">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Connecting Spoke Lines + Central WebXCode Hub Tile (Desktop) */}
            <div className="my-6 lg:my-8 flex flex-col items-center justify-center relative">
              <div
                aria-hidden="true"
                className="hidden lg:flex w-4/5 items-center justify-between mb-3 px-10"
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="flex flex-col items-center">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="w-0.5 h-6 bg-gradient-to-b from-primary/60 to-primary" />
                  </div>
                ))}
              </div>

              {/* Central Hub Tile */}
              <div className="relative z-10 px-8 py-4 rounded-full bg-navy text-white border-4 border-primary shadow-xl flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-extrabold text-[13px]">
                  WX
                </span>
                <div className="text-left">
                  <div className="text-[15px] font-extrabold leading-none">
                    WebXCode Growth Engine
                  </div>
                  <div className="text-[11px] text-primary font-bold mt-0.5">
                    Real-Time Two-Way Webhooks &amp; APIs
                  </div>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="hidden lg:flex w-4/5 items-center justify-between mt-3 px-10"
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="flex flex-col items-center">
                    <span className="w-0.5 h-6 bg-gradient-to-t from-primary/60 to-primary" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Arc (Outer 6 Integrations) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {SAAS_INTEGRATIONS.slice(6, 12).map((item) => (
                <div
                  key={item.name}
                  className="group bg-white rounded-[18px] p-4 border border-navy-08 shadow-soft hover:border-primary hover:-translate-y-1 transition-all flex flex-col items-center text-center"
                >
                  <div className="w-11 h-11 rounded-xl bg-navy/5 group-hover:bg-primary text-navy/45 group-hover:text-white font-extrabold text-[14px] flex items-center justify-center transition-colors mb-2.5">
                    {item.code}
                  </div>
                  <h3 className="text-[14px] font-extrabold text-navy group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-[11px] text-navy-50 mt-0.5">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. ENGAGEMENT MODELS (white — 3 pricing-style cards, middle featured)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              HOW WE WORK TOGETHER
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              Pick the Right <span className="text-primary">Growth Plan</span>
            </h2>
            <p className="text-[16px] text-navy-70">
              Flexible engagement models designed for seed-stage launches, scaling B2B
              marketing teams, and custom product builds.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {ENGAGEMENT_PLANS.map((plan) => {
              const isFeatured = Boolean(plan.featured);
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-[24px] p-7 sm:p-9 flex flex-col justify-between transition-all ${
                    isFeatured
                      ? 'bg-navy text-white border-2 border-primary shadow-2xl lg:-my-4 relative overflow-hidden'
                      : 'bg-white text-navy border border-navy-08 shadow-soft hover:border-primary-100'
                  }`}
                >
                  {isFeatured && (
                    <div className="absolute -right-16 -top-16 w-56 h-56 blue-glow-strong pointer-events-none" />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <h3
                        className={`text-[24px] font-extrabold ${
                          isFeatured ? 'text-white' : 'text-navy'
                        }`}
                      >
                        {plan.name}
                      </h3>
                      {plan.badge && (
                        <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-wider">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-[14px] leading-relaxed mb-6 ${
                        isFeatured ? 'text-white/75' : 'text-navy-70'
                      }`}
                    >
                      {plan.subtitle}
                    </p>

                    <div className="pb-6 mb-6 border-b border-current/10">
                      <div
                        className={`text-[22px] sm:text-[26px] font-extrabold leading-tight ${
                          isFeatured ? 'text-primary' : 'text-navy'
                        }`}
                      >
                        {plan.priceText}
                      </div>
                      <div
                        className={`text-[12px] font-medium mt-1 ${
                          isFeatured ? 'text-white/60' : 'text-navy-50'
                        }`}
                      >
                        {plan.priceSub}
                      </div>
                    </div>

                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-3 text-[14px] font-medium"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </span>
                          <span className={isFeatured ? 'text-white/90' : 'text-navy-90'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenQuoteModal(`B2B SaaS ${plan.name} Plan Proposal`)
                    }
                    className={`relative z-10 w-full py-4 px-6 rounded-full font-bold text-[15px] transition-all inline-flex items-center justify-center gap-2 cursor-pointer ${
                      isFeatured
                        ? 'bg-primary hover:bg-primary-dark text-white shadow-lg'
                        : 'bg-primary-50 hover:bg-primary text-primary hover:text-white'
                    }`}
                  >
                    <span>Get a Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. LAUNCH TIMELINE — GANTT VIEW (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-sm">
                TIMELINE
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                From Kickoff to Launch in{' '}
                <span className="text-primary">6–8 Weeks</span>
              </h2>
            </div>
            <p className="text-[15px] text-navy-70 max-w-md">
              A transparent, sprint-based Gantt schedule with weekly Figma and staging
              demos—no black-box development.
            </p>
          </div>

          {/* Gantt Chart Container */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-navy-08 shadow-soft overflow-x-auto">
            <div className="min-w-[720px]">
              {/* Top Week Columns Header (W1–W8) */}
              <div className="grid grid-cols-12 gap-3 pb-4 border-b border-navy-08 items-center">
                <div className="col-span-4 text-[12px] font-extrabold uppercase tracking-wider text-navy-50">
                  Phase &amp; Key Deliverables
                </div>
                <div className="col-span-8 grid grid-cols-8 gap-2 text-center">
                  {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map((w) => (
                    <div
                      key={w}
                      className="py-1.5 rounded-lg bg-primary-50 text-primary text-[12px] font-extrabold"
                    >
                      {w}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase Rows */}
              <div className="divide-y divide-navy-08">
                {GANTT_PHASES.map((item, idx) => {
                  const leftPercent = ((item.startWeek - 1) / 8) * 100;
                  const widthPercent =
                    ((item.endWeek - item.startWeek + 1) / 8) * 100;

                  return (
                    <div
                      key={item.phase}
                      className="grid grid-cols-12 gap-3 py-4 items-center"
                    >
                      <div className="col-span-4 pr-3">
                        <div className="text-[15px] font-extrabold text-navy">
                          {item.phase}
                        </div>
                        <div className="text-[12px] text-navy-50 font-medium">
                          {item.deliverable}
                        </div>
                      </div>

                      <div className="col-span-8 relative h-9 rounded-full bg-primary-50/50 flex items-center px-1">
                        <motion.div
                          initial={
                            prefersReducedMotion ? false : { width: 0, opacity: 0 }
                          }
                          whileInView={{ width: `${widthPercent}%`, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: idx * 0.08 }}
                          style={{ marginLeft: `${leftPercent}%` }}
                          className="h-7 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-between px-3 shadow-sm whitespace-nowrap"
                        >
                          <span>{item.weekLabel}</span>
                          {item.endWeek === 8 && (
                            <span className="inline-flex items-center gap-1 bg-white text-primary px-2 py-0.5 rounded-full text-[10px] font-extrabold">
                              <Rocket className="w-3 h-3" />
                              <span>Launch</span>
                            </span>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. B2B / SAAS FAQ (white — 2-column accordion 3 + 3)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              FAQ
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Questions from <span className="text-primary">SaaS Teams</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            {B2B_SAAS_FAQS.map((faq, idx) => {
              const isOpen = Boolean(openFaqIndices[idx]);
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
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <h3
                      className={`text-[16px] sm:text-[17px] font-bold leading-snug ${
                        isOpen ? 'text-primary' : 'text-navy'
                      }`}
                    >
                      {faq.question}
                    </h3>
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
                    <div className="px-6 pb-5 pt-1 text-[14px] sm:text-[15px] text-navy-70 leading-relaxed border-t border-navy-08/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. FREE GROWTH AUDIT — INLINE FORM CTA (navy, #audit)
      ==================================================================== */}
      <section id="audit" className="bg-white py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-[28px] bg-navy text-white p-7 sm:p-10 lg:p-16 overflow-hidden shadow-2xl">
            <div className="absolute -right-24 -top-24 w-[520px] h-[520px] blue-glow-strong pointer-events-none" />
            <div className="absolute -left-24 -bottom-24 w-[420px] h-[420px] blue-glow pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left 50% (6 cols): Pitch + 3 Check Points */}
              <div className="lg:col-span-6">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                  FREE GROWTH AUDIT
                </span>
                <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.12] tracking-tight mb-4">
                  Get a Free{' '}
                  <span className="text-primary">SaaS Website &amp; SEO Audit</span>
                </h2>
                <p className="text-[16px] sm:text-[18px] text-white/75 leading-relaxed mb-8">
                  We&apos;ll review your website, SEO and funnel, and send you a clear
                  list of quick wins — free, no obligation.
                </p>

                <ul className="space-y-3.5">
                  {[
                    'Conversion review — homepage clarity, pricing UX & demo booking flow',
                    'SEO & AEO gaps — buyer-intent keywords, comparison pages & AI search visibility',
                    'Speed & tech check — Core Web Vitals, mobile responsiveness & schema',
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-[15px] font-semibold text-white/90"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right 50% (6 cols): White Mini Form Card */}
              <div className="lg:col-span-6">
                <div className="bg-white text-navy rounded-[24px] p-6 sm:p-8 shadow-2xl border border-navy-08">
                  {auditSuccess ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-[24px] font-extrabold text-navy">
                        Audit Request Received!
                      </h3>
                      <p className="text-[15px] text-navy-70 max-w-md mx-auto">
                        Thank you, <strong>{auditForm.name}</strong>. Our SaaS growth
                        architects are reviewing <strong>{auditForm.website}</strong> and
                        will email your custom audit within 24 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setAuditSuccess(false);
                          setAuditForm({
                            name: '',
                            email: '',
                            website: '',
                            demoGoal: '25–50 demos / month',
                          });
                        }}
                        className="px-6 py-2.5 rounded-full bg-primary-50 text-primary font-bold text-[13px] hover:bg-primary hover:text-white transition-colors cursor-pointer"
                      >
                        Submit another website
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleAuditSubmit} noValidate className="space-y-4">
                      <h3 className="text-[20px] font-extrabold text-navy mb-1">
                        Request Your Personalized Audit
                      </h3>

                      {/* Name */}
                      <div>
                        <label
                          htmlFor="audit-name"
                          className="block text-[13px] font-bold text-navy mb-1.5"
                        >
                          Your Name *
                        </label>
                        <input
                          id="audit-name"
                          type="text"
                          autoComplete="name"
                          value={auditForm.name}
                          onChange={(e) =>
                            setAuditForm({ ...auditForm, name: e.target.value })
                          }
                          placeholder="e.g. Rohan Mehta"
                          aria-invalid={Boolean(auditErrors.name)}
                          aria-describedby={
                            auditErrors.name ? 'audit-name-error' : undefined
                          }
                          className="w-full px-4 py-3 rounded-xl bg-primary-50/50 border border-navy-15 text-navy text-[14px] focus:outline-none focus:border-primary focus:bg-white"
                        />
                        {auditErrors.name && (
                          <p
                            id="audit-name-error"
                            className="mt-1 text-[12px] font-semibold text-primary flex items-center gap-1"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{auditErrors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Work Email */}
                      <div>
                        <label
                          htmlFor="audit-email"
                          className="block text-[13px] font-bold text-navy mb-1.5"
                        >
                          Work Email *
                        </label>
                        <input
                          id="audit-email"
                          type="email"
                          autoComplete="email"
                          value={auditForm.email}
                          onChange={(e) =>
                            setAuditForm({ ...auditForm, email: e.target.value })
                          }
                          placeholder="you@yourcompany.com"
                          aria-invalid={Boolean(auditErrors.email)}
                          aria-describedby={
                            auditErrors.email ? 'audit-email-error' : undefined
                          }
                          className="w-full px-4 py-3 rounded-xl bg-primary-50/50 border border-navy-15 text-navy text-[14px] focus:outline-none focus:border-primary focus:bg-white"
                        />
                        {auditErrors.email && (
                          <p
                            id="audit-email-error"
                            className="mt-1 text-[12px] font-semibold text-primary flex items-center gap-1"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{auditErrors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Company Website URL */}
                      <div>
                        <label
                          htmlFor="audit-website"
                          className="block text-[13px] font-bold text-navy mb-1.5"
                        >
                          Company Website URL *
                        </label>
                        <input
                          id="audit-website"
                          type="url"
                          autoComplete="url"
                          value={auditForm.website}
                          onChange={(e) =>
                            setAuditForm({ ...auditForm, website: e.target.value })
                          }
                          placeholder="https://yourcompany.com"
                          aria-invalid={Boolean(auditErrors.website)}
                          aria-describedby={
                            auditErrors.website ? 'audit-website-error' : undefined
                          }
                          className="w-full px-4 py-3 rounded-xl bg-primary-50/50 border border-navy-15 text-navy text-[14px] focus:outline-none focus:border-primary focus:bg-white"
                        />
                        {auditErrors.website && (
                          <p
                            id="audit-website-error"
                            className="mt-1 text-[12px] font-semibold text-primary flex items-center gap-1"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{auditErrors.website}</span>
                          </p>
                        )}
                      </div>

                      {/* Monthly Demo Goal (Optional Select) */}
                      <div>
                        <label
                          htmlFor="audit-goal"
                          className="block text-[13px] font-bold text-navy mb-1.5"
                        >
                          Monthly Demo Goal{' '}
                          <span className="text-navy-50 font-normal">(Optional)</span>
                        </label>
                        <select
                          id="audit-goal"
                          value={auditForm.demoGoal}
                          onChange={(e) =>
                            setAuditForm({ ...auditForm, demoGoal: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-primary-50/50 border border-navy-15 text-navy text-[14px] font-medium focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                        >
                          <option value="10–25 demos / month">
                            10–25 demos / month
                          </option>
                          <option value="25–50 demos / month">
                            25–50 demos / month
                          </option>
                          <option value="50–100+ demos / month">
                            50–100+ demos / month
                          </option>
                          <option value="Launching a new SaaS product">
                            Launching a new SaaS product
                          </option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={auditSubmitting}
                        className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
                      >
                        {auditSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Preparing Your Audit Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Get My Free Audit</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[12px] font-semibold text-navy-50">
                        We reply within 24 hours.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          12. EXPLORE OTHER INDUSTRIES (white, compact horizontal scrolling chips)
      ==================================================================== */}
      <section className="bg-white py-14 lg:py-20 border-t border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary block mb-1">
                12 SPECIALIZED SECTORS
              </span>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold text-navy">
                Explore Other <span className="text-primary">Industries</span>
              </h2>
            </div>
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary hover:underline"
            >
              <span>View All Industries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Horizontal Scrolling Row of Industry Chips */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
            {otherIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={
                  ind.slug === 'finance-fintech'
                    ? '/industries/finance-fintech'
                    : ind.slug === 'interior-design-architecture'
                    ? '/industries/interior-design-architecture'
                    : ind.slug === 'manufacturing-industrial'
                    ? '/industries/manufacturing-industrial'
                    : ind.slug === 'ecommerce'
                    ? '/industries/ecommerce'
                    : ind.slug === 'skincare-beauty'
                    ? '/industries/skincare-beauty'
                    : ind.slug === 'home-decor-furniture'
                    ? '/industries/home-decor-furniture'
                    : ind.slug === 'fashion-lifestyle'
                    ? '/industries/fashion-lifestyle'
                    : ind.slug === 'healthcare'
                    ? '/industries/healthcare'
                    : ind.slug === 'travel-hospitality'
                    ? '/industries/travel-hospitality'
                    : ind.slug === 'education-edtech'
                    ? '/industries/education-edtech'
                    : `/industries#${ind.slug}`
                }
                className="shrink-0 px-4 py-3 rounded-2xl bg-primary-50/60 hover:bg-primary border border-primary-100 hover:border-primary text-navy hover:text-white transition-all flex items-center gap-2.5 group shadow-2xs"
              >
                <span className="w-8 h-8 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 shadow-2xs">
                  <IndustryIcon name={ind.icon} className="w-4 h-4" />
                </span>
                <span className="text-[14px] font-bold whitespace-nowrap">
                  {ind.name}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default B2BSaaS;
