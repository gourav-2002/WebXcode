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
  MapPin,
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
  Zap,
  Clock,
  Sliders,
  Plus,
  Minus,
  CheckCircle2,
  Building2,
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
} from 'lucide-react';
import { industries, IndustryIconName } from '@/app/industries/_components/Industries';

/* ============================================================================
   PART B — SERVICES DATA (`services` array — named export)
============================================================================ */

export type ServiceCategory = 'Web & Apps' | 'SEO & Performance' | 'Brand & Content';

export type ServiceIconName =
  | 'Globe'
  | 'Cpu'
  | 'ShoppingCart'
  | 'Smartphone'
  | 'PenTool'
  | 'Layers'
  | 'ShieldCheck'
  | 'Server'
  | 'Search'
  | 'MapPin'
  | 'Sparkles'
  | 'Bot'
  | 'TrendingUp'
  | 'Target'
  | 'Activity'
  | 'BarChart3'
  | 'Award'
  | 'Megaphone'
  | 'FileText'
  | 'Edit3'
  | 'MessageSquare'
  | 'Mail';

export interface ServiceItem {
  slug: string;
  name: string;
  category: ServiceCategory;
  badge: 'NEW' | 'MOST DEMANDED' | null;
  icon: ServiceIconName;
  tagline: string;
  description: string;
  bestFor: [string, string, string];
  deliverables: [string, string, string, string, string, string];
  typicalTimeline: string;
  keyMetric: string;
  relatedIndustries: [string, string, string];
  futurePagePath: string;
}

export const services: ServiceItem[] = [
  /* ==========================================================================
     1. Web & Apps (8 services)
  ========================================================================== */
  {
    slug: 'website-development',
    name: 'Website Development',
    category: 'Web & Apps',
    badge: null,
    icon: 'Globe',
    tagline: 'Fast, custom websites built to turn visitors into customers.',
    description:
      'We engineer custom marketing websites, corporate portals, and conversion-focused landing pages using clean architecture. Every build is mobile-first, SEO-ready from day one, and optimized for sub-2-second page loads.',
    bestFor: ['B2B & Enterprise Brands', 'High-Growth Startups', 'Service Businesses'],
    deliverables: [
      'Custom responsive UI/UX & design system',
      'Next.js / React or clean CMS frontend build',
      'Technical SEO & Schema.org structured data',
      'Lead capture forms & CRM webhook integration',
      'Core Web Vitals & speed optimization (<2s load)',
      'Staging QA, launch checklist & team handover',
    ],
    typicalTimeline: '3–6 weeks',
    keyMetric: 'Sub-2s average load time & +140% enquiry lift (placeholder)',
    relatedIndustries: ['b2b-saas', 'finance-fintech', 'healthcare'],
    futurePagePath: '/services/website-development',
  },
  {
    slug: 'web-application-development',
    name: 'Web Application Development',
    category: 'Web & Apps',
    badge: null,
    icon: 'Cpu',
    tagline: 'Custom portals, dashboards, SaaS products and internal tools.',
    description:
      'From multi-tenant SaaS platforms to customer portals and internal ERP dashboards, we build secure, scalable full-stack web applications with clean APIs, role-based access control, and real-time data workflows.',
    bestFor: ['SaaS Founders', 'Fintech & Healthcare Portals', 'Operations-Heavy Teams'],
    deliverables: [
      'Full-stack architecture & database schema design',
      'Role-based authentication & permission control',
      'Interactive dashboards & real-time data tables',
      'REST / GraphQL API development & 3rd-party sync',
      'Automated testing, security audit & staging setup',
      'Cloud deployment, CI/CD pipeline & documentation',
    ],
    typicalTimeline: '6–12 weeks',
    keyMetric: '99.9% uptime architecture & 3× faster user workflows (placeholder)',
    relatedIndustries: ['b2b-saas', 'finance-fintech', 'education-edtech'],
    futurePagePath: '/services/web-application-development',
  },
  {
    slug: 'ecommerce-development',
    name: 'E-commerce Development',
    category: 'Web & Apps',
    badge: null,
    icon: 'ShoppingCart',
    tagline: 'High-converting online stores with smooth checkout and payments.',
    description:
      'We build D2C and B2B online storefronts engineered for high average order value, instant variant switching, frictionless checkout, and seamless payment, shipping, and inventory integrations.',
    bestFor: ['D2C Consumer Brands', 'Multi-SKU Retailers', 'Wholesale B2B Stores'],
    deliverables: [
      'Custom storefront UX & mobile-first product pages',
      'Smart filtering, variant swatches & size/fit guides',
      'Slide-out cart drawer with upsells & free-shipping bar',
      'Payment gateway, shipping & ERP/inventory integration',
      'Abandoned cart recovery via email & WhatsApp',
      'Speed optimization for heavy catalog & media assets',
    ],
    typicalTimeline: '4–8 weeks',
    keyMetric: '+140% checkout completion lift across D2C stores (placeholder)',
    relatedIndustries: ['ecommerce', 'fashion-lifestyle', 'skincare-beauty'],
    futurePagePath: '/services/ecommerce-development',
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    category: 'Web & Apps',
    badge: null,
    icon: 'Smartphone',
    tagline: 'iOS, Android and cross-platform apps your customers love using.',
    description:
      'We design and develop sleek iOS and Android applications using React Native, Flutter, and native modules—complete with push notifications, offline support, biometric login, and unified backend APIs.',
    bestFor: ['Consumer & D2C Apps', 'On-Demand & Booking Platforms', 'Learning & Wellness Apps'],
    deliverables: [
      'Interactive mobile UI kit & clickable Figma prototype',
      'iOS & Android cross-platform or native app build',
      'Push notifications, deep linking & biometric auth',
      'In-app payments, subscriptions & wallet integration',
      'Backend API sync & offline caching support',
      'App Store & Google Play submission & compliance',
    ],
    typicalTimeline: '8–14 weeks',
    keyMetric: '4.8★ average app store UX rating & fast release cycles (placeholder)',
    relatedIndustries: ['healthcare', 'education-edtech', 'travel-hospitality'],
    futurePagePath: '/services/mobile-app-development',
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    category: 'Web & Apps',
    badge: null,
    icon: 'PenTool',
    tagline: 'Research-backed interfaces, wireframes, prototypes and design systems.',
    description:
      'Great engineering starts with intuitive design. We map user journeys, eliminate friction points, and craft tokenized Figma design systems and interactive prototypes that your users understand immediately.',
    bestFor: ['Product Redesigns', 'SaaS & Mobile Apps', 'Conversion-Focused Stores'],
    deliverables: [
      'UX audit, user journey mapping & information architecture',
      'Low-fidelity wireframes for key conversion flows',
      'High-fidelity desktop & mobile UI screens in Figma',
      'Reusable component library & design token system',
      'Interactive clickable prototype for stakeholder testing',
      'Developer-ready specs, assets & accessibility check',
    ],
    typicalTimeline: '2–4 weeks',
    keyMetric: '+65% task completion speed & lower bounce rates (placeholder)',
    relatedIndustries: ['b2b-saas', 'home-decor-furniture', 'fashion-lifestyle'],
    futurePagePath: '/services/ui-ux-design',
  },
  {
    slug: 'wordpress-shopify-development',
    name: 'WordPress & Shopify Development',
    category: 'Web & Apps',
    badge: null,
    icon: 'Layers',
    tagline: 'Clean, fast builds and custom themes on the world’s top CMS platforms.',
    description:
      'Get the publishing ease of WordPress or the commerce power of Shopify and Shopify Plus without bloated templates. We build lightweight custom themes, custom blocks, and app integrations your team can edit without code.',
    bestFor: ['Marketing Teams', 'D2C Brands on Shopify', 'Content-Driven Businesses'],
    deliverables: [
      'Custom lightweight WordPress theme or Shopify 2.0 theme',
      'Drag-and-drop custom sections & modular page builder',
      'Plugin/app audit & bloat removal for fast page speed',
      'Seamless migration from legacy CMS or store platform',
      'SEO meta controls, redirects & schema configuration',
      '1-on-1 editor training & video documentation for your team',
    ],
    typicalTimeline: '3–5 weeks',
    keyMetric: '90+ PageSpeed score & zero developer dependency for edits (placeholder)',
    relatedIndustries: ['ecommerce', 'skincare-beauty', 'interior-design-architecture'],
    futurePagePath: '/services/wordpress-shopify-development',
  },
  {
    slug: 'website-maintenance-support',
    name: 'Website Maintenance & Support',
    category: 'Web & Apps',
    badge: null,
    icon: 'ShieldCheck',
    tagline: 'Updates, backups, security, speed tuning and priority fixes.',
    description:
      'Keep your website fast, secure, and up-to-date every single month. Our engineering team handles core updates, daily cloud backups, uptime monitoring, security patching, and ongoing content or landing page tweaks.',
    bestFor: ['Growing Businesses', 'High-Traffic E-commerce', 'Compliance-Sensitive Orgs'],
    deliverables: [
      '24/7 uptime monitoring & real-time incident alerts',
      'Daily automated off-site cloud backups & 1-click restore',
      'Weekly CMS, plugin & security vulnerability patching',
      'Monthly Core Web Vitals & speed tune-up',
      'Dedicated monthly hours for UI tweaks & new sections',
      'Monthly health, security & performance report',
    ],
    typicalTimeline: 'Ongoing monthly SLA (starts in 48 hours)',
    keyMetric: '99.95% monitored uptime & <4h priority response SLA (placeholder)',
    relatedIndustries: ['healthcare', 'finance-fintech', 'manufacturing-industrial'],
    futurePagePath: '/services/website-maintenance-support',
  },
  {
    slug: 'managed-it-services',
    name: 'Managed IT Services',
    category: 'Web & Apps',
    badge: 'NEW',
    icon: 'Server',
    tagline: 'Cloud setup, hosting, monitoring and day-to-day tech operations.',
    description:
      'Offload your cloud infrastructure, server management, DevOps pipelines, and business email/workspace operations to our dedicated systems team so your company can focus on growth without downtime.',
    bestFor: ['SMBs Without In-House DevOps', 'Multi-Location Enterprises', 'Fast-Scaling Startups'],
    deliverables: [
      'AWS / GCP / Vercel / Cloudflare cloud setup & tuning',
      'CI/CD deployment pipelines & staging environments',
      'SSL, WAF firewall, DDoS protection & DNS management',
      'Automated database backups & disaster recovery plan',
      'Server cost audit & cloud spend optimization',
      'Dedicated Slack/ticket channel for tech ops support',
    ],
    typicalTimeline: '1–2 weeks onboarding + monthly retainers',
    keyMetric: '35% average cloud cost reduction & zero-downtime deploys (placeholder)',
    relatedIndustries: ['manufacturing-industrial', 'b2b-saas', 'finance-fintech'],
    futurePagePath: '/services/managed-it-services',
  },

  /* ==========================================================================
     2. SEO & Performance (8 services)
  ========================================================================== */
  {
    slug: 'seo-services',
    name: 'SEO Services',
    category: 'SEO & Performance',
    badge: null,
    icon: 'Search',
    tagline: 'Technical SEO, on-page optimization and content that ranks on Google.',
    description:
      'Compound your organic traffic and capture high-intent buyers searching for your solutions. We combine deep technical SEO audits, topic-cluster content architecture, and authoritative link building.',
    bestFor: ['B2B & SaaS Companies', 'National D2C Brands', 'High-Consideration Services'],
    deliverables: [
      'Full technical SEO audit, crawlability & indexation fixes',
      'High-intent keyword research & competitor gap matrix',
      'On-page optimization (meta, headings, internal linking)',
      'Schema.org JSON-LD rich snippet implementation',
      'Monthly SEO content briefs & authority link building',
      'Live Search Console & organic pipeline dashboard',
    ],
    typicalTimeline: '3–6 months compounding roadmap',
    keyMetric: '+320% average organic traffic lift within 6 months (placeholder)',
    relatedIndustries: ['b2b-saas', 'manufacturing-industrial', 'education-edtech'],
    futurePagePath: '/services/seo-services',
  },
  {
    slug: 'local-seo',
    name: 'Local SEO',
    category: 'SEO & Performance',
    badge: null,
    icon: 'MapPin',
    tagline: 'Google Business Profile, map pack rankings and city/area pages.',
    description:
      'Own the "near me" searches and Google Maps 3-Pack in every city and neighborhood you serve. Ideal for clinics, hotels, showrooms, schools, and multi-location service brands.',
    bestFor: ['Hospitals & Clinics', 'Hotels, Venues & Restaurants', 'Showrooms & Schools'],
    deliverables: [
      'Google Business Profile (GBP) setup & full optimization',
      'dedicated city, neighborhood & branch landing pages',
      'NAP citation building & local directory cleanup',
      'LocalBusiness, Physician & Hotel schema markup',
      'Automated customer review generation & reply playbook',
      'Monthly map-pack rank tracking & call/direction report',
    ],
    typicalTimeline: '4–8 weeks for initial map-pack lift',
    keyMetric: '+240% Google Maps calls, direction clicks & walk-ins (placeholder)',
    relatedIndustries: ['healthcare', 'travel-hospitality', 'interior-design-architecture'],
    futurePagePath: '/services/local-seo',
  },
  {
    slug: 'aeo-services',
    name: 'AEO Services',
    category: 'SEO & Performance',
    badge: 'NEW',
    icon: 'Sparkles',
    tagline: 'Answer Engine Optimization so your brand shows up in direct answers and voice search.',
    description:
      'Buyers now ask full questions in Google AI Overviews, Siri, Alexa, and People Also Ask boxes. We structure your pages with concise answer blocks, Q&A schema, and entity clarity so search engines pick your brand as the definitive answer.',
    bestFor: ['Healthcare & Education', 'B2B Software & Finance', 'Expert Service Brands'],
    deliverables: [
      'Question-intent research across PAA & voice queries',
      'Direct-answer snippet blocks & structured FAQ sections',
      'FAQPage, HowTo & Speakable schema implementation',
      'Knowledge Graph entity & author authority signals',
      'Zero-click snippet & AI Overview citation tracking',
      'Monthly question coverage & snippet win-rate report',
    ],
    typicalTimeline: '4–8 weeks implementation',
    keyMetric: '3.2× more Featured Snippet & Answer Box placements (placeholder)',
    relatedIndustries: ['healthcare', 'education-edtech', 'finance-fintech'],
    futurePagePath: '/services/aeo-services',
  },
  {
    slug: 'geo-generative-engine-optimization',
    name: 'GEO (Generative Engine Optimization)',
    category: 'SEO & Performance',
    badge: 'NEW',
    icon: 'Bot',
    tagline: 'Get your brand cited and recommended inside AI search tools.',
    description:
      'Ensure your company is recommended when prospects ask ChatGPT, Perplexity, Gemini, and Claude for the "best provider" in your category. We optimize brand citations, structured comparison pages, and LLM-friendly documentation.',
    bestFor: ['B2B SaaS & Tech Agencies', 'D2C Category Leaders', 'Financial & EdTech Brands'],
    deliverables: [
      'AI visibility audit across ChatGPT, Perplexity & Gemini',
      'LLM-readable comparison, pricing & use-case pages',
      'Structured entity, citation & digital PR footprint',
      'Original data tables, benchmarks & quotable statistics',
      'llms.txt & clean markdown/crawler accessibility setup',
      'Monthly share-of-voice tracking in AI search responses',
    ],
    typicalTimeline: '6–10 weeks',
    keyMetric: '+190% brand citation rate in AI search prompts (placeholder)',
    relatedIndustries: ['b2b-saas', 'finance-fintech', 'ecommerce'],
    futurePagePath: '/services/geo-generative-engine-optimization',
  },
  {
    slug: 'performance-marketing',
    name: 'Performance Marketing',
    category: 'SEO & Performance',
    badge: 'MOST DEMANDED',
    icon: 'TrendingUp',
    tagline: 'ROI-driven paid campaigns across Google, Meta, LinkedIn and YouTube.',
    description:
      'Full-funnel paid acquisition engineered around ROAS, CAC, and qualified pipeline—not vanity clicks. We combine high-converting ad creatives, custom landing pages, and server-side conversion tracking.',
    bestFor: ['D2C E-commerce Brands', 'Lead-Gen & B2B Companies', 'Admissions & Bookings'],
    deliverables: [
      'Full-funnel media plan across Meta, Google & LinkedIn',
      'Ad creative hooks, static variants & video scripts',
      'Dedicated high-converting campaign landing pages',
      'Audience segmentation, retargeting & lookalike funnels',
      'Daily bid, budget & ROAS/CPL optimization',
      'Weekly live revenue & cost-per-lead attribution report',
    ],
    typicalTimeline: 'Launch in 7–10 days + ongoing management',
    keyMetric: '4.2× average blended ROAS & -38% cost per lead (placeholder)',
    relatedIndustries: ['ecommerce', 'fashion-lifestyle', 'education-edtech'],
    futurePagePath: '/services/performance-marketing',
  },
  {
    slug: 'google-ads-sem',
    name: 'Google Ads (SEM)',
    category: 'SEO & Performance',
    badge: null,
    icon: 'Target',
    tagline: 'High-intent Search, Shopping, Performance Max and remarketing campaigns.',
    description:
      'Capture buyers at the exact moment they search on Google. We build tightly themed Search campaigns, clean Google Merchant Center Shopping feeds, and negative-keyword guardrails that eliminate wasted ad spend.',
    bestFor: ['High-Intent Service Leads', 'E-commerce Shopping Feeds', 'Local & Emergency Services'],
    deliverables: [
      'Google Ads account audit & wasted-spend cleanup',
      'High-intent Search, PMax & Shopping campaign architecture',
      'Google Merchant Center feed optimization (for retail)',
      'Ad extensions, call tracking & negative keyword lists',
      'Landing page message-match & Quality Score tuning',
      'Transparent weekly CPL, ROAS & search-term reports',
    ],
    typicalTimeline: 'Launch in 5–7 days + monthly optimization',
    keyMetric: '-41% wasted ad spend & +175% qualified search conversions (placeholder)',
    relatedIndustries: ['home-decor-furniture', 'healthcare', 'travel-hospitality'],
    futurePagePath: '/services/google-ads-sem',
  },
  {
    slug: 'conversion-rate-optimization',
    name: 'Conversion Rate Optimization',
    category: 'SEO & Performance',
    badge: null,
    icon: 'Activity',
    tagline: 'Turn more of your existing traffic into leads, carts and bookings.',
    description:
      'Before spending more on ads, double the output of the traffic you already have. We use heatmaps, session recordings, funnel drop-off analysis, and A/B experiments to fix leaks across your product, cart, and lead forms.',
    bestFor: ['E-commerce Stores', 'SaaS Demo Funnels', 'High-Traffic Lead Sites'],
    deliverables: [
      'Full funnel analytics, heatmap & session replay audit',
      'Checkout, form & mobile UX friction-point teardown',
      'Prioritized A/B test & UX hypothesis roadmap',
      'Design & engineering of high-converting page variants',
      'Speed, trust-signal & copy clarity enhancements',
      'Post-experiment conversion & revenue lift report',
    ],
    typicalTimeline: '4-week sprint or ongoing monthly testing',
    keyMetric: '+48% average conversion rate lift from existing traffic (placeholder)',
    relatedIndustries: ['ecommerce', 'b2b-saas', 'travel-hospitality'],
    futurePagePath: '/services/conversion-rate-optimization',
  },
  {
    slug: 'analytics-tracking-setup',
    name: 'Analytics & Tracking Setup',
    category: 'SEO & Performance',
    badge: null,
    icon: 'BarChart3',
    tagline: 'GA4, Tag Manager, conversion pixels and clean attribution dashboards.',
    description:
      'Make marketing decisions on clean, trustworthy data. We configure GA4, Google Tag Manager, Meta CAPI, server-side tracking, CRM offline conversion sync, and executive Looker Studio dashboards.',
    bestFor: ['Performance Marketers', 'E-commerce & D2C Stores', 'B2B Pipeline Teams'],
    deliverables: [
      'GA4 & Google Tag Manager clean event architecture',
      'Meta Conversions API (CAPI) & Google Enhanced Conversions',
      'E-commerce dataLayer (view_item, add_to_cart, purchase)',
      'UTM governance & CRM lead-source attribution sync',
      'Cookie consent banner & privacy-compliant tracking',
      'Custom live Looker Studio executive KPI dashboard',
    ],
    typicalTimeline: '1–2 weeks',
    keyMetric: '100% event accuracy & +28% recovered ad attribution (placeholder)',
    relatedIndustries: ['ecommerce', 'finance-fintech', 'b2b-saas'],
    futurePagePath: '/services/analytics-tracking-setup',
  },

  /* ==========================================================================
     3. Brand & Content (6 services)
  ========================================================================== */
  {
    slug: 'branding-logo-design',
    name: 'Branding & Logo Design',
    category: 'Brand & Content',
    badge: null,
    icon: 'Award',
    tagline: 'Memorable brand identity, logo systems, color palettes and guidelines.',
    description:
      'Look like the category leader from the very first impression. We craft distinctive logos, typography hierarchies, color systems, packaging direction, and comprehensive brand books that scale across digital and print.',
    bestFor: ['New Brand Launches', 'Company Rebrands', 'D2C & Luxury Labels'],
    deliverables: [
      'Brand positioning, archetype & visual moodboards',
      'Primary logo, monogram, responsive marks & lockups',
      'Color palette, typography scale & iconography style',
      'Social media, stationery & packaging/deck templates',
      'Comprehensive Brand Guidelines book (PDF + Figma)',
      'Full vector source files (SVG, EPS, PNG, Font licenses)',
    ],
    typicalTimeline: '2–4 weeks',
    keyMetric: 'Complete brand system ready for web, social & packaging (placeholder)',
    relatedIndustries: ['skincare-beauty', 'fashion-lifestyle', 'interior-design-architecture'],
    futurePagePath: '/services/branding-logo-design',
  },
  {
    slug: 'creative-communication',
    name: 'Creative & Communication',
    category: 'Brand & Content',
    badge: null,
    icon: 'Megaphone',
    tagline: 'Campaign visuals, social creatives, pitch decks and brand storytelling.',
    description:
      'Turn your brand strategy into thumb-stopping campaign visuals, investor/sales pitch decks, product launch kits, and social design systems that keep your brand consistent across every channel.',
    bestFor: ['Collection & Product Drops', 'B2B Sales & Investor Decks', 'Social-First Brands'],
    deliverables: [
      'Campaign creative concept & visual key art',
      'Paid ad static & carousel creative packs (Meta/LinkedIn)',
      'Sales presentations, investor pitch decks & company profiles',
      'Social media grid templates & launch countdown assets',
      'Exhibition, brochure & digital lookbook design',
      'Editable Figma/Canva master templates for your team',
    ],
    typicalTimeline: '2–3 weeks or monthly creative retainer',
    keyMetric: '+62% higher ad click-through rate with custom creatives (placeholder)',
    relatedIndustries: ['fashion-lifestyle', 'home-decor-furniture', 'b2b-saas'],
    futurePagePath: '/services/creative-communication',
  },
  {
    slug: 'content-marketing',
    name: 'Content Marketing',
    category: 'Brand & Content',
    badge: null,
    icon: 'FileText',
    tagline: 'Blog strategy, pillar guides, case studies and resources that attract buyers.',
    description:
      'Build topical authority and educate buyers at every stage of the funnel. We plan, research, write, and design SEO pillar guides, industry reports, case studies, and resource hubs that rank and convert.',
    bestFor: ['B2B SaaS & Enterprise', 'Healthcare & Education', 'Finance & Fintech'],
    deliverables: [
      '90-day editorial calendar & topic-cluster strategy',
      'Long-form SEO & AEO optimized articles and pillar guides',
      'Customer case studies, whitepapers & downloadable lead magnets',
      'Custom blog graphics, comparison charts & diagrams',
      'CMS publishing, internal linking & schema markup',
      'Monthly content traffic, engagement & lead attribution',
    ],
    typicalTimeline: 'Ongoing monthly retainers',
    keyMetric: '3.5× organic keyword footprint & steady inbound leads (placeholder)',
    relatedIndustries: ['b2b-saas', 'education-edtech', 'healthcare'],
    futurePagePath: '/services/content-marketing',
  },
  {
    slug: 'copywriting',
    name: 'Copywriting',
    category: 'Brand & Content',
    badge: null,
    icon: 'Edit3',
    tagline: 'Clear, persuasive website copy, landing pages, product descriptions and ads.',
    description:
      'Great design needs sharp words to convert. We write crisp, jargon-free website copy, sales landing pages, D2C product descriptions, and ad hooks grounded in customer psychology and clear value propositions.',
    bestFor: ['Website Launches', 'Ad Landing Pages', 'E-commerce Catalogs'],
    deliverables: [
      'Brand voice, tone & core messaging framework',
      'Homepage, service/product & about page conversion copy',
      'Dedicated paid-ad landing page copy with strong CTAs',
      'SEO-friendly e-commerce product descriptions & microcopy',
      'Ad headline & hook variations for A/B testing',
      'Wireframe-mapped copy deck ready for design & dev',
    ],
    typicalTimeline: '1–3 weeks',
    keyMetric: '+54% landing page conversion lift from message clarity (placeholder)',
    relatedIndustries: ['b2b-saas', 'skincare-beauty', 'finance-fintech'],
    futurePagePath: '/services/copywriting',
  },
  {
    slug: 'online-reputation-management',
    name: 'Online Reputation Management',
    category: 'Brand & Content',
    badge: null,
    icon: 'MessageSquare',
    tagline: 'Review growth, brand monitoring and positive search presence.',
    description:
      'Protect and strengthen what buyers see when they Google your brand or founder name. We automate 5-star review collection across Google, Trustpilot, and Practo/TripAdvisor while promoting positive press and brand assets.',
    bestFor: ['Hospitals & Doctors', 'Hotels & Hospitality', 'Financial & Consumer Brands'],
    deliverables: [
      'Search result (SERP) & review sentiment audit',
      'Automated SMS/WhatsApp/email review request flows',
      'Google, Trustpilot, Glassdoor & industry profile optimization',
      'Professional response templates & escalation workflows',
      'Positive brand content & PR asset amplification on Page 1',
      'Monthly sentiment score & rating growth report',
    ],
    typicalTimeline: 'Ongoing monthly program (setup in 7 days)',
    keyMetric: '4.7★+ average profile rating & 3× review volume (placeholder)',
    relatedIndustries: ['healthcare', 'travel-hospitality', 'finance-fintech'],
    futurePagePath: '/services/online-reputation-management',
  },
  {
    slug: 'email-marketing',
    name: 'Email Marketing',
    category: 'Brand & Content',
    badge: null,
    icon: 'Mail',
    tagline: 'Automated welcome, cart recovery, nurture and retention flows that drive repeat revenue.',
    description:
      'Turn one-time visitors and buyers into repeat customers. We set up Klaviyo, HubSpot, or Mailchimp with custom-designed email templates, automated lifecycle flows, and high-converting campaign calendars.',
    bestFor: ['D2C E-commerce & Skincare', 'B2B Lead Nurturing', 'Courses & Subscriptions'],
    deliverables: [
      'ESP setup (Klaviyo / HubSpot / Brevo) & deliverability warmup',
      'Welcome series, abandoned cart & browse-abandonment flows',
      'Post-purchase, replenishment, win-back & VIP sequences',
      'B2B lead-nurture & demo follow-up email sequences',
      'Custom mobile-responsive HTML email templates',
      'List segmentation, A/B subject testing & revenue tracking',
    ],
    typicalTimeline: '2–3 weeks flow setup + monthly campaigns',
    keyMetric: '22–30% of total D2C store revenue driven by email flows (placeholder)',
    relatedIndustries: ['skincare-beauty', 'ecommerce', 'fashion-lifestyle'],
    futurePagePath: '/services/email-marketing',
  },
];

/* ============================================================================
   ADDITIONAL PAGE DATA ARRAYS
============================================================================ */

/* Section 2: Interactive Goal Matcher Data */
interface GoalOption {
  id: string;
  label: string;
  sub: string;
  recommendedSlugs: [string, string, string];
  suggestedTimeline: string;
  firstStep: string;
}

const GOAL_MATCHER_OPTIONS: GoalOption[] = [
  {
    id: 'launch-redesign',
    label: 'Launch or redesign our website',
    sub: 'Look credible, load fast & convert visitors',
    recommendedSlugs: ['website-development', 'ui-ux-design', 'copywriting'],
    suggestedTimeline: '4–6 weeks from kickoff to launch',
    firstStep: 'Free 20-point Website UX, Speed & Conversion Audit',
  },
  {
    id: 'sell-online',
    label: 'Sell products online (E-commerce / D2C)',
    sub: 'Launch or scale a high-converting online store',
    recommendedSlugs: [
      'ecommerce-development',
      'wordpress-shopify-development',
      'performance-marketing',
    ],
    suggestedTimeline: '4–8 weeks for store build + immediate ad launch',
    firstStep: 'Free Storefront, Checkout & ROAS Growth Audit',
  },
  {
    id: 'google-ai-visibility',
    label: 'Get more leads from Google & AI search',
    sub: 'Rank on Google, Maps, ChatGPT & Perplexity',
    recommendedSlugs: ['seo-services', 'aeo-services', 'geo-generative-engine-optimization'],
    suggestedTimeline: '4–6 weeks technical foundation + compounding monthly lift',
    firstStep: 'Free Technical SEO, AEO & AI Search Visibility Report',
  },
  {
    id: 'scale-paid-ads',
    label: 'Scale paid ads & lower cost per lead',
    sub: 'High-ROI Google, Meta & LinkedIn campaigns',
    recommendedSlugs: [
      'performance-marketing',
      'google-ads-sem',
      'conversion-rate-optimization',
    ],
    suggestedTimeline: 'Campaigns live in 7 days + weekly CRO sprints',
    firstStep: 'Free Ad Account Wasted-Spend & Landing Page Audit',
  },
  {
    id: 'build-app-portal',
    label: 'Build a custom web or mobile app',
    sub: 'SaaS product, customer portal or iOS/Android app',
    recommendedSlugs: ['web-application-development', 'mobile-app-development', 'ui-ux-design'],
    suggestedTimeline: '6–12 weeks for MVP / Phase-1 production release',
    firstStep: 'Free Product Architecture & clickable Figma Scope Session',
  },
  {
    id: 'refresh-brand',
    label: 'Refresh our brand & content',
    sub: 'Visual identity, persuasive copy & email retention',
    recommendedSlugs: ['branding-logo-design', 'content-marketing', 'email-marketing'],
    suggestedTimeline: '2–4 weeks for brand & messaging overhaul',
    firstStep: 'Free Brand Positioning & Messaging Review',
  },
];

/* Section 5: AI Bridge Pills */
const AI_BRIDGE_PILLS = [
  { label: 'AI Chatbots', slug: 'ai-chatbot-development' },
  { label: 'WhatsApp AI Bot', slug: 'whatsapp-ai-chatbot' },
  { label: 'AI Voice Agents', slug: 'ai-voice-agents' },
  { label: 'Custom LLM Integration', slug: 'custom-ai-llm-integration' },
  { label: 'AI Generated Videos', slug: 'ai-generated-videos' },
  { label: 'AI Workflow Automation', slug: 'ai-workflow-automation' },
  { label: 'CRM & Lead Automation', slug: 'crm-lead-automation' },
];

/* Section 6: Ready-Made Service Bundles (Blueprints) */
interface ServiceBundle {
  id: string;
  tag: string;
  title: string;
  whoFor: string;
  timeline: string;
  includedSlugs: [string, string, string, string];
  outcome: string;
  featured?: boolean;
}

const SERVICE_BUNDLES: ServiceBundle[] = [
  {
    id: 'launch-pack',
    tag: 'BUNDLE 01 • NEW LAUNCH',
    title: 'New Business Launch Pack',
    whoFor: 'Startups, new brands & businesses launching a fresh digital presence from scratch.',
    timeline: '4–6 Weeks',
    includedSlugs: [
      'branding-logo-design',
      'ui-ux-design',
      'website-development',
      'seo-services',
    ],
    outcome: 'Go live with a category-leading identity, sub-2s website, and Google-ready SEO foundation.',
  },
  {
    id: 'd2c-engine',
    tag: 'BUNDLE 02 • MOST POPULAR',
    title: 'D2C Store & Growth Engine',
    whoFor: 'E-commerce, fashion, skincare & home decor brands scaling online orders and repeat buyers.',
    timeline: '5–8 Weeks + Monthly Growth',
    includedSlugs: [
      'ecommerce-development',
      'performance-marketing',
      'email-marketing',
      'conversion-rate-optimization',
    ],
    outcome: 'High-AOV storefront paired with profitable Meta/Google ads and automated retention flows.',
    featured: true,
  },
  {
    id: 'b2b-pipeline',
    tag: 'BUNDLE 03 • B2B & ENTERPRISE',
    title: 'B2B Lead & Pipeline Engine',
    whoFor: 'SaaS companies, manufacturers, fintechs & service firms targeting high-ticket B2B deals.',
    timeline: '4–6 Weeks + Compounding SEO',
    includedSlugs: [
      'website-development',
      'seo-services',
      'geo-generative-engine-optimization',
      'google-ads-sem',
    ],
    outcome: 'Turn your site into a 24/7 demo and RFQ generator across Google Search and AI engines.',
  },
];

/* Section 7: Engagement Models */
interface EngagementModel {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  bestWhen: string;
  howBillingWorks: string;
  whatsIncluded: [string, string, string, string];
  ctaText: string;
}

const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: 'fixed-scope',
    code: 'MODEL 01',
    name: 'Fixed-Scope Project',
    subtitle: 'Clear deliverables, fixed timeline, milestone-based billing.',
    bestWhen:
      'You have a defined goal—like launching a new website, D2C store, brand identity, or MVP web app.',
    howBillingWorks:
      'Transparent fixed quote broken into 3–4 milestone payments tied to design approval, staging, and launch.',
    whatsIncluded: [
      'Written scope document & milestone schedule',
      'Dedicated project manager, designer & lead engineer',
      'Weekly live staging links & progress walkthroughs',
      '30-day post-launch warranty & team training',
    ],
    ctaText: 'Scope a Fixed Project',
  },
  {
    id: 'monthly-retainer',
    code: 'MODEL 02',
    name: 'Monthly Growth Retainer',
    subtitle: 'Ongoing SEO, ads, content, CRO and maintenance with monthly reporting.',
    bestWhen:
      'You want predictable month-over-month traffic, leads, sales, and continuous website improvements.',
    howBillingWorks:
      'Flat monthly fee with clear monthly deliverables, sprint priorities, and no hidden agency markups.',
    whatsIncluded: [
      'Dedicated SEO, paid media, content & CRO specialists',
      'Monthly experiment & content calendar sign-off',
      'Real-time Looker Studio revenue & pipeline dashboard',
      'Bi-weekly strategy calls & Slack/WhatsApp channel',
    ],
    ctaText: 'Start a Growth Retainer',
  },
  {
    id: 'dedicated-pod',
    code: 'MODEL 03',
    name: 'Dedicated Team / Pod',
    subtitle: 'Designers, developers and marketers working as an extension of your team.',
    bestWhen:
      'You are scaling a SaaS product, multi-brand portfolio, or enterprise roadmap and need daily velocity.',
    howBillingWorks:
      'Monthly pod subscription based on team composition (e.g., 2 Senior Engineers + 1 Product Designer + PM).',
    whatsIncluded: [
      'Full-time dedicated senior talent in your Slack & Jira',
      'Direct daily standups & agile 2-week sprint velocity',
      'Flexible scope—shift focus between web, app & growth',
      'Zero hiring overhead, instant scale-up or scale-down',
    ],
    ctaText: 'Build Your Dedicated Pod',
  },
];

/* Section 8: Delivery Timeline Steps */
interface ProcessStep {
  num: string;
  title: string;
  duration: string;
  receive: string;
}

const DELIVERY_PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Discovery & Audit',
    duration: 'Days 1–3',
    receive: 'Written audit of your current site/ads, competitor teardown & KPI baseline.',
  },
  {
    num: '02',
    title: 'Strategy & Roadmap',
    duration: 'Week 1',
    receive: 'Sitemap, wireframes, tech architecture or media plan with clear milestones.',
  },
  {
    num: '03',
    title: 'Design & Build',
    duration: 'Weeks 2–5',
    receive: 'Figma UI system, staging link, clean code or campaign/content assets.',
  },
  {
    num: '04',
    title: 'Launch & QA',
    duration: 'Week 6',
    receive: 'Speed/SEO/security check, analytics verification & zero-downtime go-live.',
  },
  {
    num: '05',
    title: 'Measure & Scale',
    duration: 'Ongoing',
    receive: 'Live attribution dashboard, A/B testing, SEO compounding & priority support.',
  },
];

/* Section 10: Services FAQs */
interface ServiceFAQ {
  q: string;
  a: string;
}

const SERVICES_FAQS: ServiceFAQ[] = [
  {
    q: 'Can we start with just one service (like Website Development or SEO) and add more later?',
    a: 'Absolutely. Over 70% of our clients start with a single high-impact project—such as a website redesign, a Shopify store build, or a technical SEO & Google Ads audit—and expand into ongoing growth retainers once they see our speed and ROI.',
  },
  {
    q: 'How do you price your services—fixed project fee or monthly retainer?',
    a: 'Build projects (websites, web apps, e-commerce stores, UI/UX design, branding, and analytics setup) are priced as transparent fixed-scope projects paid across milestones. Ongoing growth services (SEO, AEO/GEO, Performance Marketing, Content, and Maintenance) run on predictable monthly retainers.',
  },
  {
    q: 'What is the difference between SEO, AEO, and GEO?',
    a: 'Traditional SEO helps your pages rank in Google’s classic organic search results. AEO (Answer Engine Optimization) structures your content to win direct answer boxes, Featured Snippets, and voice search queries. GEO (Generative Engine Optimization) ensures your brand is cited and recommended when buyers ask AI engines like ChatGPT, Perplexity, and Google Gemini.',
  },
  {
    q: 'Do we get full ownership of the code, design files, and ad accounts?',
    a: 'Yes—100%. You own all source code, GitHub repositories, Figma design systems, domain/hosting accounts, Google Analytics properties, and Google/Meta ad accounts from day one. We never lock clients into proprietary platforms.',
  },
  {
    q: 'How fast can your team kick off a new project?',
    a: 'After our initial discovery call, we deliver a written scope, timeline, and proposal within 24–48 hours. Once approved, our engineering, design, or performance marketing pod can kick off within 3 to 5 business days.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. We partner with startups, D2C brands, and enterprises across India, the USA, UK, UAE, Canada, Australia, and Singapore, with overlapping communication hours and dedicated Slack/WhatsApp channels.',
  },
];

/* ============================================================================
   HELPER ICON RENDERERS
============================================================================ */

export const ServiceIcon: React.FC<{ name: ServiceIconName; className?: string }> = ({
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

const IndustryIcon: React.FC<{ name: IndustryIconName; className?: string }> = ({
  name,
  className = 'w-4 h-4',
}) => {
  switch (name) {
    case 'Laptop':
      return <Laptop className={className} strokeWidth={1.75} />;
    case 'Landmark':
      return <Landmark className={className} strokeWidth={1.75} />;
    case 'Compass':
      return <Compass className={className} strokeWidth={1.75} />;
    case 'Factory':
      return <Factory className={className} strokeWidth={1.75} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} strokeWidth={1.75} />;
    case 'Heart':
      return <Heart className={className} strokeWidth={1.75} />;
    case 'Sofa':
      return <Sofa className={className} strokeWidth={1.75} />;
    case 'Shirt':
      return <Shirt className={className} strokeWidth={1.75} />;
    case 'HeartPulse':
      return <HeartPulse className={className} strokeWidth={1.75} />;
    case 'Car':
      return <Car className={className} strokeWidth={1.75} />;
    case 'Plane':
      return <Plane className={className} strokeWidth={1.75} />;
    case 'GraduationCap':
      return <GraduationCap className={className} strokeWidth={1.75} />;
    default:
      return <Building2 className={className} strokeWidth={1.75} />;
  }
};

const LIVE_INDUSTRY_SLUGS = new Set([
  'b2b-saas',
  'finance-fintech',
  'interior-design-architecture',
  'manufacturing-industrial',
  'ecommerce',
  'skincare-beauty',
  'home-decor-furniture',
  'fashion-lifestyle',
  'healthcare',
  'travel-hospitality',
  'education-edtech',
]);

function getIndustryLink(slug: string): string {
  return LIVE_INDUSTRY_SLUGS.has(slug) ? `/industries/${slug}` : `/industries#${slug}`;
}

/* ============================================================================
   MAIN SERVICES PAGE COMPONENT
============================================================================ */

interface ServicesProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();
  // location

  const triggerQuoteModal = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: service }));
    }
  };

  /* Section 1: Hero Pillar Interactive State */
  const [activeHeroPillar, setActiveHeroPillar] = useState<ServiceCategory>('Web & Apps');

  /* Section 2: Interactive Goal Matcher State */
  const [selectedGoalId, setSelectedGoalId] = useState<string>(GOAL_MATCHER_OPTIONS[0].id);

  /* Section 3: Filter & Search Bar State */
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<
    'All' | ServiceCategory | 'New & Most Demanded'
  >('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  /* Section 4: Master Switchboard Selected Service per Category */
  const [selectedWebServiceSlug, setSelectedWebServiceSlug] = useState<string>(
    'website-development'
  );
  const [selectedSeoServiceSlug, setSelectedSeoServiceSlug] = useState<string>('seo-services');
  const [selectedBrandServiceSlug, setSelectedBrandServiceSlug] = useState<string>(
    'branding-logo-design'
  );

  /* Section 7: Engagement Models Active Tab */
  const [activeEngagementIndex, setActiveEngagementIndex] = useState<number>(0);

  /* Section 10: FAQ Accordion State */
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  /* Section 11: Plan-Builder CTA Form State */
  const [selectedPlanServices, setSelectedPlanServices] = useState<string[]>([
    'Website Development',
    'SEO Services',
  ]);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    companyOrWebsite: '',
    goalOrTimeline: '',
  });
  const [formError, setFormError] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  /* SEO Meta + Hash Sync (auto-select service in switchboard when visiting /services#<slug>) */
  useEffect(() => {
    document.title =
      'Our Services — Web Development, SEO, AEO/GEO & Brand Growth | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore 22 full-stack digital services across Web & Apps, SEO & Performance (AEO/GEO, Google Ads, CRO), and Brand & Content. Engineered by WebXCode.'
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash) return;
    const rawSlug = window.location.hash.replace('#', '').trim();
    if (!rawSlug) return;

    const matchedService = services.find((s) => s.slug === rawSlug);
    if (matchedService) {
      /* Ensure filters show all so the category workbench is visible */
      setActiveCategoryFilter('All');
      setSearchQuery('');

      if (matchedService.category === 'Web & Apps') {
        setSelectedWebServiceSlug(matchedService.slug);
      } else if (matchedService.category === 'SEO & Performance') {
        setSelectedSeoServiceSlug(matchedService.slug);
      } else if (matchedService.category === 'Brand & Content') {
        setSelectedBrandServiceSlug(matchedService.slug);
      }

      const timer = setTimeout(() => {
        const targetEl =
          document.getElementById(matchedService.slug) ||
          document.getElementById(
            matchedService.category === 'Web & Apps'
              ? 'pillar-web-apps'
              : matchedService.category === 'SEO & Performance'
              ? 'pillar-seo-performance'
              : 'pillar-brand-content'
          );
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 90);
      return () => clearTimeout(timer);
    }
  }, []);

  /* Filtered Services for Section 3 & 4 */
  const filteredServices = useMemo(() => {
    return services.filter((svc) => {
      const matchesCategory =
        activeCategoryFilter === 'All'
          ? true
          : activeCategoryFilter === 'New & Most Demanded'
          ? svc.badge !== null
          : svc.category === activeCategoryFilter;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const inName = svc.name.toLowerCase().includes(q);
      const inTagline = svc.tagline.toLowerCase().includes(q);
      const inDesc = svc.description.toLowerCase().includes(q);
      const inDeliverables = svc.deliverables.some((d) => d.toLowerCase().includes(q));
      const inBestFor = svc.bestFor.some((b) => b.toLowerCase().includes(q));
      return inName || inTagline || inDesc || inDeliverables || inBestFor;
    });
  }, [activeCategoryFilter, searchQuery]);

  /* Category lists */
  const webServices = useMemo(
    () => filteredServices.filter((s) => s.category === 'Web & Apps'),
    [filteredServices]
  );
  const seoServices = useMemo(
    () => filteredServices.filter((s) => s.category === 'SEO & Performance'),
    [filteredServices]
  );
  const brandServices = useMemo(
    () => filteredServices.filter((s) => s.category === 'Brand & Content'),
    [filteredServices]
  );

  /* Active service objects for the 3 category workbenches (fallback to first visible item if filtered) */
  const activeWebService =
    webServices.find((s) => s.slug === selectedWebServiceSlug) ||
    webServices[0] ||
    services.find((s) => s.slug === 'website-development')!;

  const activeSeoService =
    seoServices.find((s) => s.slug === selectedSeoServiceSlug) ||
    seoServices[0] ||
    services.find((s) => s.slug === 'seo-services')!;

  const activeBrandService =
    brandServices.find((s) => s.slug === selectedBrandServiceSlug) ||
    brandServices[0] ||
    services.find((s) => s.slug === 'branding-logo-design')!;

  /* Goal Matcher Active Goal */
  const activeGoal =
    GOAL_MATCHER_OPTIONS.find((g) => g.id === selectedGoalId) || GOAL_MATCHER_OPTIONS[0];
  const activeGoalServices = activeGoal.recommendedSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is ServiceItem => Boolean(s));

  /* Helper to jump to a specific service in Section 4 */
  const jumpToServiceWorkbench = (svc: ServiceItem) => {
    setActiveCategoryFilter('All');
    setSearchQuery('');
    if (svc.category === 'Web & Apps') {
      setSelectedWebServiceSlug(svc.slug);
    } else if (svc.category === 'SEO & Performance') {
      setSelectedSeoServiceSlug(svc.slug);
    } else {
      setSelectedBrandServiceSlug(svc.slug);
    }
    setTimeout(() => {
      const el =
        document.getElementById(svc.slug) ||
        document.getElementById(
          svc.category === 'Web & Apps'
            ? 'pillar-web-apps'
            : svc.category === 'SEO & Performance'
            ? 'pillar-seo-performance'
            : 'pillar-brand-content'
        );
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  /* Plan Builder Multi-Select Toggle */
  const togglePlanService = (serviceName: string) => {
    setSelectedPlanServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((item) => item !== serviceName)
        : [...prev, serviceName]
    );
  };

  /* Plan Builder Submit Handler */
  const handlePlanFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!formData.workEmail.trim() || !formData.workEmail.includes('@')) {
      setFormError('Please enter a valid work email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setFormError('Please enter your phone or WhatsApp number.');
      return;
    }

    setFormSubmitted(true);
  };

  /* JSON-LD Schema: ItemList + FAQPage */
  const jsonLdSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ItemList',
          name: 'WebXCode Digital Services Catalog',
          description:
            '22 full-service web development, SEO, AEO/GEO, performance marketing, and brand & content services.',
          numberOfItems: services.length,
          itemListElement: services.map((svc, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'Service',
              name: svc.name,
              category: svc.category,
              description: svc.tagline,
              provider: {
                '@type': 'Organization',
                name: 'WebXCode',
              },
              url: `https://webxcode.com/services#${svc.slug}`,
            },
          })),
        },
        {
          '@type': 'FAQPage',
          mainEntity: SERVICES_FAQS.map((faq) => ({
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

  /* Render Helper for a Category Workbench Block in Section 4 */
  const renderCategoryWorkbench = (
    pillarIndex: string,
    pillarId: string,
    categoryTitle: ServiceCategory,
    categoryIntro: string,
    categoryServices: ServiceItem[],
    activeSvc: ServiceItem,
    onSelectSlug: (slug: string) => void
  ) => {
    if (categoryServices.length === 0) return null;

    return (
      <div
        id={pillarId}
        className="scroll-mt-28 rounded-[24px] border border-navy-08 bg-white shadow-soft overflow-hidden"
      >
        {/* Top Category Banner */}
        <div className="bg-navy text-white px-6 sm:px-8 py-6 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <span className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-[13px] font-extrabold tracking-wider uppercase shrink-0">
              PILLAR {pillarIndex}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-[22px] sm:text-[26px] font-extrabold text-white tracking-tight">
                  {categoryTitle}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[12px] font-bold text-primary-100">
                  {categoryServices.length}{' '}
                  {categoryServices.length === 1 ? 'Service' : 'Services'}
                </span>
              </div>
              <p className="text-[14px] sm:text-[15px] text-white/75 mt-1">{categoryIntro}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => triggerQuoteModal(`${categoryTitle} — Custom Package`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-primary border border-white/20 hover:border-primary text-[13px] font-semibold text-white transition-all cursor-pointer"
            >
              <span>Request {categoryTitle} Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hidden anchor tags for every service in this category so /services#<slug> always has a DOM node */}
        <div className="sr-only" aria-hidden="true">
          {services
            .filter((s) => s.category === categoryTitle)
            .map((s) => (
              <span key={s.slug} id={s.slug} />
            ))}
        </div>

        {/* 2-Column Split Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (5 cols on lg): Service Selector List */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-navy-08 bg-primary-50/35 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-70">
                Select a Service to Inspect
              </span>
              <span className="text-[11px] font-semibold text-primary">
                Click any row
              </span>
            </div>

            <div className="space-y-2" role="tablist" aria-label={`${categoryTitle} services`}>
              {categoryServices.map((svc, idx) => {
                const isSelected = activeSvc.slug === svc.slug;
                return (
                  <button
                    key={svc.slug}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => onSelectSlug(svc.slug)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-[16px] transition-all duration-150 flex items-start gap-3.5 cursor-pointer border ${
                      isSelected
                        ? 'bg-navy text-white border-navy shadow-md'
                        : 'bg-white text-navy border-navy-08 hover:border-primary/40 hover:bg-primary-50/60'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-primary-50 text-primary'
                      }`}
                    >
                      <ServiceIcon name={svc.icon} className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-1.5">
                        <span
                          className={`text-[11px] font-bold tabular-nums ${
                            isSelected ? 'text-primary-100' : 'text-navy-50'
                          }`}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`text-[15px] font-bold leading-snug ${
                            isSelected ? 'text-white' : 'text-navy'
                          }`}
                        >
                          {svc.name}
                        </span>
                        {svc.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              svc.badge === 'MOST DEMANDED'
                                ? 'bg-primary text-white'
                                : isSelected
                                ? 'bg-white/15 text-white'
                                : 'bg-primary-50 text-primary border border-primary-100'
                            }`}
                          >
                            {svc.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-[13px] mt-1 line-clamp-1 ${
                          isSelected ? 'text-white/75' : 'text-navy-70'
                        }`}
                      >
                        {svc.tagline}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                        isSelected ? 'text-primary translate-x-0.5' : 'text-navy-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (7 cols on lg): Live Service Blueprint Panel */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-white flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSvc.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Blueprint Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-navy-08">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-bold uppercase tracking-[0.12em]">
                        {activeSvc.category}
                      </span>
                      {activeSvc.badge && (
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            activeSvc.badge === 'MOST DEMANDED'
                              ? 'bg-primary text-white'
                              : 'bg-navy text-white'
                          }`}
                        >
                          {activeSvc.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] font-mono font-semibold text-navy-50">
                      REF: WX-{activeSvc.slug.slice(0, 12).toUpperCase()}
                    </span>
                  </div>

                  {/* Service Name + Tagline + Description */}
                  <div className="mt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                        <ServiceIcon name={activeSvc.icon} className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-[24px] sm:text-[28px] font-extrabold text-navy leading-tight">
                          {activeSvc.name}
                        </h4>
                        <p className="text-[16px] font-semibold text-primary mt-1">
                          {activeSvc.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[15px] sm:text-[16px] text-navy-70 leading-[1.7]">
                      {activeSvc.description}
                    </p>
                  </div>

                  {/* Best For Chips */}
                  <div className="mt-6">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2.5">
                      Best Suited For
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeSvc.bestFor.map((bf) => (
                        <span
                          key={bf}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-[13px] font-semibold text-navy"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{bf}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* What's Included (6 Deliverables in 2-col checklist) */}
                  <div className="mt-7">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-3">
                      What&apos;s Included (Deliverables)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeSvc.deliverables.map((deliv) => (
                        <div
                          key={deliv}
                          className="p-3 rounded-xl bg-primary-50/45 border border-navy-08 flex items-start gap-2.5"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          </div>
                          <span className="text-[13px] sm:text-[14px] font-medium text-navy leading-snug">
                            {deliv}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline & Key Metric Strip */}
                  <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-navy text-white">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                          Typical Timeline
                        </div>
                        <div className="text-[14px] sm:text-[15px] font-bold text-white mt-0.5">
                          {activeSvc.typicalTimeline}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:border-l sm:border-white/15 sm:pl-4">
                      <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                          Benchmark Outcome
                        </div>
                        <div className="text-[14px] sm:text-[15px] font-bold text-primary-100 mt-0.5">
                          {activeSvc.keyMetric}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Related Industries Link Chips */}
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="text-[12px] font-bold text-navy-60 mr-1">
                      Popular in Industries:
                    </span>
                    {activeSvc.relatedIndustries.map((indSlug) => {
                      const indObj = industries.find((i) => i.slug === indSlug);
                      if (!indObj) return null;
                      return (
                        <Link
                          key={indSlug}
                          href={getIndustryLink(indSlug)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-navy-15 hover:border-primary hover:text-primary text-[12px] font-semibold text-navy transition-colors"
                        >
                          <IndustryIcon name={indObj.icon} className="w-3.5 h-3.5 text-primary" />
                          <span>{indObj.name}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="mt-8 pt-5 border-t border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {(activeSvc.slug === 'website-development' ||
                      activeSvc.slug === 'ecommerce-development' ||
                      activeSvc.slug === 'mobile-app-development' ||
                      activeSvc.slug === 'wordpress-shopify-development' ||
                      activeSvc.slug === 'website-maintenance-support' ||
                      activeSvc.slug === 'managed-it-services' ||
                      activeSvc.slug === 'seo-services' ||
                      activeSvc.slug === 'local-seo' ||
                      activeSvc.slug === 'aeo-services' ||
                      activeSvc.slug === 'geo-generative-engine-optimization' ||
                      activeSvc.slug === 'performance-marketing' ||
                      activeSvc.slug === 'google-ads-sem' ||
                      activeSvc.slug === 'conversion-rate-optimization' ||
                      activeSvc.slug === 'analytics-tracking-setup' ||
                      activeSvc.slug === 'branding-logo-design' ||
                      activeSvc.slug === 'creative-communication' ||
                      activeSvc.slug === 'copywriting' ||
                      activeSvc.slug === 'email-marketing') && (
                      <Link
                        href={activeSvc.futurePagePath}
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15px] shadow-soft hover:shadow-soft-hover transition-all"
                      >
                        <span>Explore Full Service Page</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => triggerQuoteModal(activeSvc.name)}
                      className={`group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[15px] transition-all cursor-pointer ${
                        activeSvc.slug === 'website-development' ||
                        activeSvc.slug === 'ecommerce-development' ||
                        activeSvc.slug === 'mobile-app-development' ||
                        activeSvc.slug === 'wordpress-shopify-development' ||
                        activeSvc.slug === 'website-maintenance-support' ||
                        activeSvc.slug === 'managed-it-services' ||
                        activeSvc.slug === 'seo-services' ||
                        activeSvc.slug === 'local-seo' ||
                        activeSvc.slug === 'aeo-services' ||
                        activeSvc.slug === 'geo-generative-engine-optimization' ||
                        activeSvc.slug === 'performance-marketing' ||
                        activeSvc.slug === 'google-ads-sem' ||
                        activeSvc.slug === 'conversion-rate-optimization' ||
                        activeSvc.slug === 'analytics-tracking-setup' ||
                        activeSvc.slug === 'branding-logo-design' ||
                        activeSvc.slug === 'creative-communication' ||
                        activeSvc.slug === 'copywriting' ||
                        activeSvc.slug === 'email-marketing'
                          ? 'border-[1.5px] border-primary/35 text-navy hover:border-primary hover:text-primary bg-transparent hover:bg-primary-50'
                          : 'bg-primary hover:bg-primary-700 text-white shadow-soft hover:shadow-soft-hover'
                      }`}
                    >
                      <span>Get a Quote for {activeSvc.name}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  <a
                    href="#custom-plan"
                    onClick={() => {
                      if (!selectedPlanServices.includes(activeSvc.name)) {
                        setSelectedPlanServices((prev) => [...prev, activeSvc.name]);
                      }
                    }}
                    className="inline-flex items-center justify-center gap-1.5 text-[14px] font-bold text-navy hover:text-primary transition-colors py-2"
                  >
                    <Plus className="w-4 h-4 text-primary" />
                    <span>Add to Custom Plan Builder</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex-1 bg-white text-navy">
      {/* Structured Data (ItemList + FAQPage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: THE SERVICE ARCHITECTURE BOARD (bg: #1e242e navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Radial Blue Glow + Architectural Grid */}
        <div className="absolute -top-24 right-1/4 w-[640px] h-[640px] blue-glow-strong pointer-events-none opacity-75" />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-[13px] text-white/65 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </li>
              <li className="text-primary-100 font-semibold" aria-current="page">
                Services
              </li>
            </ol>
          </nav>

          {/* 55% / 45% Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 55% (7 cols on lg) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Layers className="w-3.5 h-3.5 text-primary" />
                <span>OUR SERVICES • 22 CAPABILITIES</span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[56px] font-extrabold text-white leading-[1.08] tracking-tight">
                One Team to{' '}
                <span className="text-primary">Build, Rank &amp; Grow</span> Your Business Online
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-2xl">
                Stop juggling disconnected freelancers, slow web shops, and ad agencies that blame
                each other. WebXCode brings 22 full-stack capabilities—from custom websites, web
                apps, and e-commerce stores to SEO, AEO/GEO, paid acquisition, and brand design—under
                one roof.
              </p>

              {/* Two CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#goal-matcher"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all"
                >
                  <span>Find the Right Service</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <button
                  type="button"
                  onClick={() => triggerQuoteModal('Custom Digital Roadmap')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all cursor-pointer"
                >
                  <span>Get a Free Quote</span>
                </button>
              </div>

              {/* Trust Strip — 4 Stat Pills */}
              <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  { val: '22', label: 'Core Services' },
                  { val: '500+', label: 'Projects Delivered' },
                  { val: '12+', label: 'Industries Served' },
                  { val: '98%', label: 'Client Retention' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10"
                  >
                    <div className="text-[22px] sm:text-[26px] font-extrabold text-white tabular-nums leading-none">
                      {stat.val}
                    </div>
                    <div className="text-[12px] font-medium text-white/70 mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 45% (5 cols on lg): Interactive 3-Pillar Architecture Board */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] bg-white/[0.05] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/80">
                      SERVICE ARCHITECTURE BOARD
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-primary-100">
                    Click a Pillar to Jump
                  </span>
                </div>

                {/* 3 Stacked Interactive Pillar Cards */}
                <div className="space-y-3.5">
                  {[
                    {
                      category: 'Web & Apps' as ServiceCategory,
                      code: 'PILLAR 01',
                      count: 8,
                      targetId: '#pillar-web-apps',
                      summary: 'Custom Websites, SaaS Web Apps, D2C Stores & Mobile Apps',
                      chips: [
                        'Website Development',
                        'Web Apps',
                        'E-commerce',
                        'Mobile Apps',
                        'UI/UX',
                        'WordPress & Shopify',
                      ],
                    },
                    {
                      category: 'SEO & Performance' as ServiceCategory,
                      code: 'PILLAR 02',
                      count: 8,
                      targetId: '#pillar-seo-performance',
                      summary: 'SEO, Local SEO, AEO, GEO, Paid Media, Google Ads & CRO',
                      chips: [
                        'SEO Services',
                        'AEO (NEW)',
                        'GEO (NEW)',
                        'Performance Marketing',
                        'Google Ads',
                        'CRO',
                      ],
                    },
                    {
                      category: 'Brand & Content' as ServiceCategory,
                      code: 'PILLAR 03',
                      count: 6,
                      targetId: '#pillar-brand-content',
                      summary: 'Brand Identity, Creative Campaigns, Copywriting, ORM & Email',
                      chips: [
                        'Branding & Logo',
                        'Creative',
                        'Content Marketing',
                        'Copywriting',
                        'ORM',
                        'Email Flows',
                      ],
                    },
                  ].map((pillar) => {
                    const isActive = activeHeroPillar === pillar.category;
                    return (
                      <div
                        key={pillar.category}
                        onMouseEnter={() => setActiveHeroPillar(pillar.category)}
                        className={`rounded-2xl p-4 transition-all border ${
                          isActive
                            ? 'bg-primary/20 border-primary shadow-lg'
                            : 'bg-white/[0.04] border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-extrabold uppercase tracking-wider">
                              {pillar.code}
                            </span>
                            <h2 className="text-[17px] font-extrabold text-white">
                              {pillar.category}
                            </h2>
                          </div>
                          <a
                            href={pillar.targetId}
                            className="inline-flex items-center gap-1 text-[12px] font-bold text-primary-100 hover:text-white transition-colors"
                          >
                            <span>{pillar.count} Services</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <p className="text-[13px] text-white/75 mt-1.5">{pillar.summary}</p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {pillar.chips.map((chip) => (
                            <span
                              key={chip}
                              className="px-2.5 py-1 rounded-lg bg-navy/80 border border-white/10 text-[11px] font-semibold text-white/90"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Board Footer */}
                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[12px] text-white/70">
                  <span>Need AI Chatbots, Voice Agents or Automation?</span>
                  <Link
                    href="/ai-solutions"
                    className="font-bold text-primary-100 hover:text-white inline-flex items-center gap-1"
                  >
                    <span>See AI Solutions</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — INTERACTIVE GOAL MATCHER: "WHAT DO YOU WANT TO ACHIEVE?"
         (bg: #ffffff)
      ====================================================================== */}
      <section id="goal-matcher" className="py-[72px] lg:py-[112px] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Heading */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              INTERACTIVE SERVICE FINDER
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Not Sure Which Service You Need?{' '}
              <span className="text-primary">Start With Your Goal</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Pick your primary business objective below and our diagnostic console will recommend
              the exact service combination, timeline, and first step.
            </p>
          </div>

          {/* 2-Column Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column (5 cols): 6 Goal Buttons */}
            <div
              className="lg:col-span-5 flex flex-col justify-between gap-2.5"
              role="tablist"
              aria-label="Business Goals"
            >
              {GOAL_MATCHER_OPTIONS.map((goal, idx) => {
                const isSelected = goal.id === selectedGoalId;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedGoalId(goal.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-[18px] border transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? 'bg-navy text-white border-navy shadow-soft'
                        : 'bg-white text-navy border-navy-08 hover:border-primary/40 hover:bg-primary-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`w-7 h-7 rounded-lg text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <div>
                        <div
                          className={`text-[15px] sm:text-[16px] font-bold leading-snug ${
                            isSelected ? 'text-white' : 'text-navy'
                          }`}
                        >
                          {goal.label}
                        </div>
                        <div
                          className={`text-[13px] mt-0.5 ${
                            isSelected ? 'text-white/70' : 'text-navy-60'
                          }`}
                        >
                          {goal.sub}
                        </div>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-primary translate-x-1' : 'text-navy-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column (7 cols): Live Recommendation Card */}
            <div className="lg:col-span-7">
              <div className="h-full rounded-[24px] bg-primary-50/60 border border-primary-100 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeGoal.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-primary-100">
                        <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider">
                          RECOMMENDED SERVICE STACK
                        </span>
                        <span className="text-[13px] font-bold text-navy">
                          3 Matched Capabilities
                        </span>
                      </div>

                      <h3 className="mt-5 text-[22px] sm:text-[26px] font-extrabold text-navy leading-snug">
                        Goal: <span className="text-primary">{activeGoal.label}</span>
                      </h3>

                      {/* 3 Recommended Service Cards */}
                      <div className="mt-6 space-y-3.5">
                        {activeGoalServices.map((svc, idx) => (
                          <div
                            key={svc.slug}
                            className="p-4 sm:p-5 rounded-2xl bg-white border border-navy-08 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="flex items-start gap-3.5">
                              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                                <ServiceIcon name={svc.icon} className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                                    STEP 0{idx + 1} • {svc.category}
                                  </span>
                                  {svc.badge && (
                                    <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase">
                                      {svc.badge}
                                    </span>
                                  )}
                                </div>
                                <h4 className="text-[17px] font-extrabold text-navy mt-0.5">
                                  {svc.name}
                                </h4>
                                <p className="text-[13px] text-navy-70 mt-0.5">{svc.tagline}</p>
                              </div>
                            </div>

                            {svc.slug === 'website-development' ||
                            svc.slug === 'ecommerce-development' ||
                            svc.slug === 'mobile-app-development' ||
                            svc.slug === 'wordpress-shopify-development' ||
                            svc.slug === 'website-maintenance-support' ||
                            svc.slug === 'managed-it-services' ||
                            svc.slug === 'seo-services' ||
                            svc.slug === 'local-seo' ||
                            svc.slug === 'aeo-services' ||
                            svc.slug === 'geo-generative-engine-optimization' ||
                            svc.slug === 'performance-marketing' ||
                            svc.slug === 'google-ads-sem' ||
                            svc.slug === 'conversion-rate-optimization' ||
                            svc.slug === 'analytics-tracking-setup' ||
                            svc.slug === 'branding-logo-design' ||
                            svc.slug === 'creative-communication' ||
                            svc.slug === 'copywriting' ||
                            svc.slug === 'email-marketing' ? (
                              <Link
                                href={svc.futurePagePath}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-white hover:bg-primary-700 text-[12px] font-bold transition-colors shrink-0 self-start sm:self-center"
                              >
                                <span>Explore Service Page</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            ) : (
                              <button
                                type="button"
                                onClick={() => jumpToServiceWorkbench(svc)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary-50 hover:bg-primary text-primary hover:text-white text-[12px] font-bold transition-colors shrink-0 self-start sm:self-center cursor-pointer"
                              >
                                <span>Inspect Details</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Timeline + First Step Box */}
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-navy text-white">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-primary-100">
                            Suggested Timeline
                          </div>
                          <div className="text-[14px] font-bold text-white mt-1">
                            {activeGoal.suggestedTimeline}
                          </div>
                        </div>
                        <div className="sm:border-l sm:border-white/15 sm:pl-4">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-primary-100">
                            Recommended First Step
                          </div>
                          <div className="text-[14px] font-bold text-white mt-1">
                            {activeGoal.firstStep}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-7 pt-5 border-t border-primary-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(
                            `${activeGoal.label} (${activeGoalServices
                              .map((s) => s.name)
                              .join(' + ')})`
                          )
                        }
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15px] shadow-soft transition-all cursor-pointer"
                      >
                        <span>Get a Custom Plan for This Goal</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>

                      <span className="text-[13px] font-medium text-navy-70">
                        Free roadmap &amp; fixed estimate in 24 hrs
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — STICKY CATEGORY & SEARCH BAR (bg: #f0f7fd)
      ====================================================================== */}
      <div className="sticky top-[68px] z-30 bg-primary-50/95 backdrop-blur-md border-y border-primary-100 py-3.5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            {[
              { key: 'All', label: 'All Services (22)' },
              { key: 'Web & Apps', label: 'Web & Apps (8)' },
              { key: 'SEO & Performance', label: 'SEO & Performance (8)' },
              { key: 'Brand & Content', label: 'Brand & Content (6)' },
              { key: 'New & Most Demanded', label: 'New & Most Demanded (4)' },
            ].map((tab) => {
              const isActive = activeCategoryFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    setActiveCategoryFilter(
                      tab.key as 'All' | ServiceCategory | 'New & Most Demanded'
                    )
                  }
                  className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white text-navy hover:bg-white/80 hover:text-primary border border-navy-08'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input + Live Count */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-navy-50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search e.g. Shopify, AEO, Ads..."
                aria-label="Search services"
                className="w-full pl-9 pr-8 py-2 rounded-full bg-white border border-navy-15 text-[13px] text-navy placeholder:text-navy-50 focus:outline-none focus:border-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-navy-50 hover:text-navy cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <span className="text-[12px] font-bold text-navy-70 whitespace-nowrap hidden sm:inline">
              Showing {filteredServices.length} of 22
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================================
         SECTION 4 — THE 22 SERVICES MASTER SWITCHBOARD (3 CATEGORY WORKBENCHES)
         (bg: #f0f7fd)
      ====================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                COMPLETE SERVICE DIRECTORY
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Explore All 22 Capabilities{' '}
                <span className="text-primary">Across 3 Core Pillars</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-xl leading-[1.65]">
              Click any service on the left of each workbench to inspect its exact deliverables,
              ideal use cases, typical delivery timeline, and benchmark results.
            </p>
          </div>

          {filteredServices.length === 0 ? (
            <div className="rounded-[24px] bg-white border border-navy-08 p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-[20px] font-extrabold text-navy">
                No services matched &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-[15px] text-navy-70 mt-2 max-w-md mx-auto">
                Try clearing your search or switching back to &ldquo;All Services (22)&rdquo; to
                browse our full catalog.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategoryFilter('All');
                  setSearchQuery('');
                }}
                className="mt-5 px-6 py-2.5 rounded-full bg-primary text-white text-[14px] font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-12 lg:space-y-16">
              {/* Pillar 01 — Web & Apps */}
              {renderCategoryWorkbench(
                '01',
                'pillar-web-apps',
                'Web & Apps',
                'Custom websites, full-stack web apps, high-converting D2C stores, mobile apps, and managed cloud operations.',
                webServices,
                activeWebService,
                setSelectedWebServiceSlug
              )}

              {/* Pillar 02 — SEO & Performance */}
              {renderCategoryWorkbench(
                '02',
                'pillar-seo-performance',
                'SEO & Performance',
                'Compound organic visibility on Google, Maps, and AI search engines (AEO/GEO) while scaling profitable paid media.',
                seoServices,
                activeSeoService,
                setSelectedSeoServiceSlug
              )}

              {/* Pillar 03 — Brand & Content */}
              {renderCategoryWorkbench(
                '03',
                'pillar-brand-content',
                'Brand & Content',
                'Distinctive brand identity, campaign creatives, persuasive conversion copy, reputation management, and lifecycle email flows.',
                brandServices,
                activeBrandService,
                setSelectedBrandServiceSlug
              )}
            </div>
          )}
        </div>
      </section>

      {/* ======================================================================
         SECTION 5 — AI SOLUTIONS BRIDGE BANNER (bg: #1e242e navy)
      ====================================================================== */}
      <section id="ai-bridge" className="relative bg-navy text-white py-16 lg:py-20 overflow-hidden">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[520px] h-[520px] blue-glow-strong pointer-events-none opacity-70" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="rounded-[24px] bg-white/[0.04] border border-white/15 p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>AI SOLUTIONS DIVISION</span>
                </div>
                <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold text-white leading-[1.15]">
                  Looking for <span className="text-primary">AI Chatbots, Voice Agents</span> or
                  Workflow Automation?
                </h2>
                <p className="mt-3.5 text-[15px] sm:text-[16px] text-white/75 leading-[1.65]">
                  Alongside our 22 core web, SEO, and brand services, our specialized AI engineering
                  unit builds custom RAG chatbots, WhatsApp AI sales assistants, human-like voice
                  agents, and automated CRM workflows.
                </p>

                {/* 7 AI Capability Pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {AI_BRIDGE_PILLS.map((pill) => (
                    <Link
                      key={pill.slug}
                      href={
                        pill.slug === 'ai-chatbot-development'
                          ? '/ai-solutions/ai-chatbot-development'
                          : `/ai-solutions#${pill.slug}`
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.07] hover:bg-primary border border-white/15 hover:border-primary text-[13px] font-semibold text-white transition-colors"
                    >
                      <Bot className="w-3.5 h-3.5 text-primary" />
                      <span>{pill.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center justify-end gap-4">
                <Link
                  href="/ai-solutions"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15px] shadow-soft transition-all"
                >
                  <span>Explore AI Solutions</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('AI Solutions & Automation')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] transition-all cursor-pointer"
                >
                  <span>Book an AI Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 6 — READY-MADE SERVICE BUNDLES (BLUEPRINTS) (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              ARCHITECTED GROWTH BUNDLES
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Ready-Made <span className="text-primary">Service Blueprints</span> That Work Together
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Most clients combine build, search, and conversion services for faster ROI. Start with
              one of our proven 4-service blueprints or customize your own.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {SERVICE_BUNDLES.map((bundle) => (
              <div
                key={bundle.id}
                className={`rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all border ${
                  bundle.featured
                    ? 'bg-navy text-white border-navy shadow-xl relative'
                    : 'bg-white text-navy border-navy-08 shadow-soft hover:border-primary-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                        bundle.featured
                          ? 'bg-primary text-white'
                          : 'bg-primary-50 text-primary'
                      }`}
                    >
                      {bundle.tag}
                    </span>
                    <span
                      className={`text-[12px] font-bold ${
                        bundle.featured ? 'text-primary-100' : 'text-navy-60'
                      }`}
                    >
                      {bundle.timeline}
                    </span>
                  </div>

                  <h3
                    className={`text-[22px] sm:text-[24px] font-extrabold leading-snug ${
                      bundle.featured ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {bundle.title}
                  </h3>

                  <p
                    className={`mt-2.5 text-[14px] leading-relaxed ${
                      bundle.featured ? 'text-white/75' : 'text-navy-70'
                    }`}
                  >
                    {bundle.whoFor}
                  </p>

                  {/* 4 Included Services */}
                  <div className="mt-6 pt-5 border-t border-current/10">
                    <div
                      className={`text-[11px] font-bold uppercase tracking-[0.12em] mb-3 ${
                        bundle.featured ? 'text-white/60' : 'text-navy-60'
                      }`}
                    >
                      4 Combined Services
                    </div>

                    <ul className="space-y-2.5">
                      {bundle.includedSlugs.map((slug) => {
                        const svc = services.find((s) => s.slug === slug);
                        if (!svc) return null;
                        return (
                          <li key={slug}>
                            {svc.slug === 'website-development' ||
                            svc.slug === 'ecommerce-development' ||
                            svc.slug === 'mobile-app-development' ||
                            svc.slug === 'wordpress-shopify-development' ||
                            svc.slug === 'website-maintenance-support' ||
                            svc.slug === 'managed-it-services' ||
                            svc.slug === 'seo-services' ||
                            svc.slug === 'local-seo' ||
                            svc.slug === 'aeo-services' ||
                            svc.slug === 'geo-generative-engine-optimization' ||
                            svc.slug === 'performance-marketing' ||
                            svc.slug === 'google-ads-sem' ||
                            svc.slug === 'conversion-rate-optimization' ||
                            svc.slug === 'analytics-tracking-setup' ||
                            svc.slug === 'branding-logo-design' ||
                            svc.slug === 'creative-communication' ||
                            svc.slug === 'copywriting' ||
                            svc.slug === 'email-marketing' ? (
                              <Link
                                href={svc.futurePagePath}
                                className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between gap-2 transition-colors border ${
                                  bundle.featured
                                    ? 'bg-white/[0.06] border-white/10 hover:border-primary text-white'
                                    : 'bg-primary-50/50 border-navy-08 hover:border-primary text-navy'
                                }`}
                              >
                                <span className="flex items-center gap-2.5 text-[13px] font-bold">
                                  <ServiceIcon
                                    name={svc.icon}
                                    className="w-4 h-4 text-primary shrink-0"
                                  />
                                  <span>{svc.name}</span>
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
                              </Link>
                            ) : (
                              <button
                                type="button"
                                onClick={() => jumpToServiceWorkbench(svc)}
                                className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between gap-2 transition-colors cursor-pointer border ${
                                  bundle.featured
                                    ? 'bg-white/[0.06] border-white/10 hover:border-primary text-white'
                                    : 'bg-primary-50/50 border-navy-08 hover:border-primary text-navy'
                                }`}
                              >
                                <span className="flex items-center gap-2.5 text-[13px] font-bold">
                                  <ServiceIcon
                                    name={svc.icon}
                                    className="w-4 h-4 text-primary shrink-0"
                                  />
                                  <span>{svc.name}</span>
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
                              </button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Expected Outcome */}
                  <div
                    className={`mt-5 p-3.5 rounded-xl text-[13px] leading-relaxed ${
                      bundle.featured
                        ? 'bg-primary/20 border border-primary/40 text-white'
                        : 'bg-primary-50 border border-primary-100 text-navy'
                    }`}
                  >
                    <strong className="font-bold">Target Outcome:</strong> {bundle.outcome}
                  </div>
                </div>

                <div className="mt-7 pt-4 border-t border-current/10">
                  <button
                    type="button"
                    onClick={() => triggerQuoteModal(`Bundle: ${bundle.title}`)}
                    className={`w-full py-3.5 px-5 rounded-full font-semibold text-[14px] inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      bundle.featured
                        ? 'bg-primary hover:bg-primary-700 text-white shadow-soft'
                        : 'bg-navy hover:bg-primary text-white'
                    }`}
                  >
                    <span>Request This Bundle</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 7 — HOW WE ENGAGE (3 FLEXIBLE ENGAGEMENT MODELS) (bg: #f0f7fd)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                FLEXIBLE WORKING MODELS
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Three Ways to <span className="text-primary">Partner With WebXCode</span>
              </h2>
            </div>

            {/* Interactive Switcher Pills */}
            <div
              className="flex flex-wrap items-center gap-2"
              role="tablist"
              aria-label="Engagement Models"
            >
              {ENGAGEMENT_MODELS.map((model, idx) => {
                const isSelected = activeEngagementIndex === idx;
                return (
                  <button
                    key={model.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveEngagementIndex(idx)}
                    className={`px-4 py-2.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-navy text-white shadow-sm'
                        : 'bg-white text-navy border border-navy-08 hover:border-primary'
                    }`}
                  >
                    {model.code}: {model.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-Column Comparison Matrix Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {ENGAGEMENT_MODELS.map((model, idx) => {
              const isHighlighted = activeEngagementIndex === idx;
              return (
                <div
                  key={model.id}
                  onClick={() => setActiveEngagementIndex(idx)}
                  className={`rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all cursor-pointer border ${
                    isHighlighted
                      ? 'bg-white border-primary ring-2 ring-primary/20 shadow-xl'
                      : 'bg-white/85 border-navy-08 hover:bg-white hover:border-primary-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-navy-08">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                          isHighlighted
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {model.code}
                      </span>
                      {isHighlighted && (
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                          Selected Model
                        </span>
                      )}
                    </div>

                    <h3 className="mt-5 text-[22px] font-extrabold text-navy">{model.name}</h3>
                    <p className="mt-1.5 text-[14px] font-semibold text-primary">
                      {model.subtitle}
                    </p>

                    {/* Matrix Rows */}
                    <div className="mt-6 space-y-4">
                      <div className="p-3.5 rounded-xl bg-primary-50/50 border border-navy-08">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-navy-60">
                          Best When
                        </div>
                        <p className="text-[13px] sm:text-[14px] text-navy mt-1 leading-relaxed">
                          {model.bestWhen}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-primary-50/50 border border-navy-08">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-navy-60">
                          How Billing Works
                        </div>
                        <p className="text-[13px] sm:text-[14px] text-navy mt-1 leading-relaxed">
                          {model.howBillingWorks}
                        </p>
                      </div>

                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-navy-60 mb-2.5">
                          What&apos;s Included
                        </div>
                        <ul className="space-y-2">
                          {model.whatsIncluded.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-navy"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 pt-5 border-t border-navy-08">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerQuoteModal(`Engagement: ${model.name}`);
                      }}
                      className={`w-full py-3.5 px-5 rounded-full font-semibold text-[14px] inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isHighlighted
                          ? 'bg-primary hover:bg-primary-700 text-white shadow-soft'
                          : 'bg-navy hover:bg-primary text-white'
                      }`}
                    >
                      <span>{model.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 8 — OUR DELIVERY TIMELINE (5-STEP HORIZONTAL TRACK) (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              HOW WE DELIVER
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              A Clear, Predictable <span className="text-primary">5-Stage Delivery Track</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Every project—whether a 3-week website sprint or a 12-month SEO &amp; performance
              retainer—follows our milestone-driven engineering playbook.
            </p>
          </div>

          {/* 5-Stage Horizontal Track */}
          <div className="relative">
            {/* Connecting Line on Desktop */}
            <div
              className="hidden lg:block absolute top-8 left-12 right-12 h-0.5 bg-primary-100 pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {DELIVERY_PROCESS_STEPS.map((step) => (
                <div
                  key={step.num}
                  className="rounded-[20px] bg-white border border-navy-08 p-6 shadow-soft flex flex-col justify-between hover:border-primary transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="w-11 h-11 rounded-2xl bg-navy text-white font-extrabold text-[15px] flex items-center justify-center shadow-sm">
                        {step.num}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-bold uppercase tracking-wider">
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="text-[18px] font-extrabold text-navy leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-4 border-t border-navy-08">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary mb-1">
                      What You Receive
                    </div>
                    <p className="text-[13px] text-navy-70 leading-relaxed">{step.receive}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 9 — SERVICES BY INDUSTRY (CROSS-LINKING STRIP) (bg: #f0f7fd)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[96px] bg-primary-50 border-y border-primary-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                INDUSTRY-SPECIFIC PLAYBOOKS
              </span>
              <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold text-navy leading-[1.14] tracking-tight">
                See How Our Services Work{' '}
                <span className="text-primary">in Your Industry</span>
              </h2>
            </div>

            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-[14px] font-bold text-primary hover:text-navy transition-colors shrink-0"
            >
              <span>View All 12 Industries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((ind) => {
              const toUrl = getIndustryLink(ind.slug);
              return (
                <Link
                  key={ind.slug}
                  href={toUrl}
                  className="group p-4 sm:p-5 rounded-2xl bg-white border border-navy-08 hover:border-primary shadow-xs hover:shadow-soft transition-all flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <IndustryIcon name={ind.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-extrabold text-navy group-hover:text-primary transition-colors">
                        {ind.name}
                      </h3>
                      <p className="text-[12px] text-navy-60 mt-0.5 line-clamp-1">
                        {ind.solutions.slice(0, 2).join(' • ')}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-navy-40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 10 — SERVICES FAQ (SPLIT LAYOUT) (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left 40% (5 cols): Sticky Intro + Talk to Strategist Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                COMMON QUESTIONS
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Questions About Scope, <span className="text-primary">Pricing &amp; Delivery</span>
              </h2>
              <p className="mt-3.5 text-[15px] sm:text-[16px] text-navy-70 leading-[1.65]">
                Straight answers on how we scope projects, how SEO/AEO/GEO work together, and how
                our engineering &amp; growth teams collaborate with yours.
              </p>

              {/* Talk to a Strategist Card */}
              <div className="mt-7 p-6 rounded-[20px] bg-navy text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-white">
                      Have a custom technical question?
                    </div>
                    <div className="text-[12px] text-white/70">
                      Speak directly with a senior architect—not a junior sales rep.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('Strategy Call — Services FAQ')}
                  className="mt-3 w-full py-3 px-5 rounded-full bg-primary hover:bg-primary-700 text-white text-[14px] font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Talk to a Strategist</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 60% (7 cols): 6 Accordion Items */}
            <div className="lg:col-span-7 space-y-3.5">
              {SERVICES_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className={`rounded-[18px] border transition-colors ${
                      isOpen
                        ? 'bg-primary-50/40 border-primary-100'
                        : 'bg-white border-navy-08 hover:border-primary/40'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-[16px] sm:text-[17px] font-bold text-navy leading-snug">
                        {faq.q}
                      </span>
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
                      <div className="px-6 pb-5 text-[15px] text-navy-70 leading-[1.7] border-t border-navy-08/60 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 11 — FINAL CTA: BUILD YOUR CUSTOM SERVICE PLAN (bg: #1e242e navy)
      ====================================================================== */}
      <section
        id="custom-plan"
        className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden scroll-mt-20"
      >
        <div className="absolute -bottom-24 left-1/4 w-[620px] h-[620px] blue-glow-strong pointer-events-none opacity-75" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column (5 cols): What You Receive in 24 Hours */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                CUSTOM SERVICE PLAN BUILDER
              </span>

              <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.12] tracking-tight">
                Build Your <span className="text-primary">Custom Service Plan</span> in 60 Seconds
              </h2>

              <p className="mt-4 text-[16px] text-white/75 leading-[1.65]">
                Select one or more services on the right and share your website or project goal.
                Our senior architects will prepare a tailored scope and fixed estimate within 24
                hours.
              </p>

              {/* What You Receive Checklist */}
              <div className="mt-8 p-6 rounded-2xl bg-white/[0.05] border border-white/15 space-y-4">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary-100">
                  What You Receive Within 24 Hours:
                </div>

                {[
                  'Written scope & recommended tech/marketing stack',
                  'Week-by-week delivery roadmap & milestone schedule',
                  'Transparent fixed-project quote or monthly retainer breakdown',
                  'Quick-win audit of your existing website, SEO or ad account',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" strokeWidth={2.5} />
                    </div>
                    <span className="text-[14px] text-white/90 leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 text-[13px] text-white/70">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>100% confidential • NDA available on request • Zero obligation</span>
              </div>
            </div>

            {/* Right Column (7 cols): White Plan-Builder Card */}
            <div className="lg:col-span-7">
              <div className="rounded-[24px] bg-white text-navy p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/20">
                {formSubmitted ? (
                  <div className="py-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="text-[24px] sm:text-[28px] font-extrabold text-navy">
                      Your Custom Service Plan Request Is In!
                    </h3>
                    <p className="mt-2.5 text-[15px] text-navy-70 max-w-lg mx-auto leading-relaxed">
                      Thank you, <strong className="text-navy">{formData.fullName}</strong>. Our
                      strategy team is reviewing your selected services (
                      <strong className="text-primary">
                        {selectedPlanServices.length > 0
                          ? selectedPlanServices.join(', ')
                          : 'Custom Roadmap'}
                      </strong>
                      ) and will send your tailored proposal to{' '}
                      <strong className="text-navy">{formData.workEmail}</strong> within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          fullName: '',
                          workEmail: '',
                          phone: '',
                          companyOrWebsite: '',
                          goalOrTimeline: '',
                        });
                      }}
                      className="mt-7 px-6 py-3 rounded-full bg-navy text-white text-[14px] font-semibold hover:bg-primary transition-colors cursor-pointer"
                    >
                      Build Another Plan
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePlanFormSubmit} noValidate>
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-navy-08">
                      <div>
                        <h3 className="text-[20px] sm:text-[22px] font-extrabold text-navy">
                          Select Your Services &amp; Details
                        </h3>
                        <p className="text-[13px] text-navy-60 mt-0.5">
                          Pick as many capabilities as you need ({selectedPlanServices.length}{' '}
                          selected)
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-bold uppercase tracking-wider">
                        Free Proposal
                      </span>
                    </div>

                    {/* Multi-Select Service Chips Grouped by Pillar */}
                    <div className="mt-5 space-y-4 max-h-[260px] overflow-y-auto pr-1">
                      {(['Web & Apps', 'SEO & Performance', 'Brand & Content'] as ServiceCategory[]).map(
                        (cat) => (
                          <div key={cat}>
                            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-2">
                              {cat}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {services
                                .filter((s) => s.category === cat)
                                .map((svc) => {
                                  const isPicked = selectedPlanServices.includes(svc.name);
                                  return (
                                    <button
                                      key={svc.slug}
                                      type="button"
                                      onClick={() => togglePlanService(svc.name)}
                                      className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer border ${
                                        isPicked
                                          ? 'bg-primary text-white border-primary'
                                          : 'bg-primary-50/50 text-navy border-navy-15 hover:border-primary'
                                      }`}
                                    >
                                      {isPicked && <Check className="w-3 h-3" strokeWidth={2.5} />}
                                      <span>{svc.name}</span>
                                    </button>
                                  );
                                })}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Contact Inputs */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="plan-full-name"
                          className="block text-[12px] font-bold uppercase tracking-wider text-navy-70 mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="plan-full-name"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, fullName: e.target.value }))
                          }
                          placeholder="e.g. Rohan Mehta"
                          className="w-full px-4 py-3 rounded-xl bg-primary-50/40 border border-navy-15 text-[14px] text-navy placeholder:text-navy-40 focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="plan-work-email"
                          className="block text-[12px] font-bold uppercase tracking-wider text-navy-70 mb-1.5"
                        >
                          Work Email *
                        </label>
                        <input
                          id="plan-work-email"
                          type="email"
                          required
                          value={formData.workEmail}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, workEmail: e.target.value }))
                          }
                          placeholder="rohan@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-primary-50/40 border border-navy-15 text-[14px] text-navy placeholder:text-navy-40 focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="plan-phone"
                          className="block text-[12px] font-bold uppercase tracking-wider text-navy-70 mb-1.5"
                        >
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="plan-phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                          placeholder="+91 98765 43210 or +1..."
                          className="w-full px-4 py-3 rounded-xl bg-primary-50/40 border border-navy-15 text-[14px] text-navy placeholder:text-navy-40 focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="plan-company"
                          className="block text-[12px] font-bold uppercase tracking-wider text-navy-70 mb-1.5"
                        >
                          Company / Website URL
                        </label>
                        <input
                          id="plan-company"
                          type="text"
                          value={formData.companyOrWebsite}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, companyOrWebsite: e.target.value }))
                          }
                          placeholder="https://yourcompany.com"
                          className="w-full px-4 py-3 rounded-xl bg-primary-50/40 border border-navy-15 text-[14px] text-navy placeholder:text-navy-40 focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="plan-goal"
                        className="block text-[12px] font-bold uppercase tracking-wider text-navy-70 mb-1.5"
                      >
                        Project Goal, Timeline or Budget Notes
                      </label>
                      <textarea
                        id="plan-goal"
                        rows={2}
                        value={formData.goalOrTimeline}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, goalOrTimeline: e.target.value }))
                        }
                        placeholder="Tell us what you want to launch or improve in the next 30–90 days..."
                        className="w-full px-4 py-2.5 rounded-xl bg-primary-50/40 border border-navy-15 text-[14px] text-navy placeholder:text-navy-40 focus:outline-none focus:border-primary"
                      />
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="mt-3 px-4 py-2.5 rounded-xl bg-primary-50 border border-primary text-[13px] font-semibold text-navy"
                      >
                        {formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="mt-6 w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-700 text-white font-bold text-[16px] shadow-soft hover:shadow-soft-hover inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Get My Custom Plan &amp; Quote</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;


