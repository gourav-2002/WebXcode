'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Sparkles,
  Bot,
  MessageSquare,
  Mic,
  Cpu,
  Video,
  FileText,
  Search,
  Megaphone,
  Workflow,
  Users,
  Database,
  BarChart3,
  Clock,
  TrendingUp,
  Layers,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { industries, IndustryIcon, IndustryItem } from '@/app/industries/_components/Industries';
import { services } from '@/app/services/_components/Services';

/* ============================================================================
   PART B — AI SOLUTIONS SINGLE SOURCE OF TRUTH (`aiSolutions` named export)
============================================================================ */

export type AISolutionCategory = 'AI Build' | 'AI Marketing' | 'AI Automation';

export type AISolutionBadge = 'BESTSELLER' | 'NEW' | null;

export type AISolutionIconName =
  | 'Bot'
  | 'MessageSquare'
  | 'Mic'
  | 'Cpu'
  | 'Video'
  | 'FileText'
  | 'Search'
  | 'Megaphone'
  | 'Workflow'
  | 'Users'
  | 'Database'
  | 'BarChart3';

export interface AISolutionItem {
  slug: string;
  name: string;
  category: AISolutionCategory;
  badge: AISolutionBadge;
  icon: AISolutionIconName;
  tagline: string;
  description: string;
  deliverables: [string, string, string, string, string, string];
  bestFor: [string, string, string];
  typicalTimeline: string;
  keyMetric: string;
  relatedIndustries: string[];
  relatedServices: string[];
  futurePagePath: string;
}

export const aiSolutions: AISolutionItem[] = [
  /* ==========================================================================
     CATEGORY 1 — AI BUILD (4 solutions)
  ========================================================================== */
  {
    slug: 'ai-chatbot-development',
    name: 'AI Chatbot Development',
    category: 'AI Build',
    badge: 'BESTSELLER',
    icon: 'Bot',
    tagline: '24/7 website assistant trained on your own business knowledge',
    description:
      'We build custom Retrieval-Augmented Generation (RAG) website chatbots trained strictly on your product docs, pricing pages, FAQs, and policy PDFs—so visitors get accurate, cited answers in seconds, qualify themselves as leads, and hand off seamlessly to your human sales or support team.',
    deliverables: [
      'Custom RAG knowledge base pipeline (PDFs, URLs, helpdesk & product catalog)',
      'Branded web chat widget with instant streaming responses & source citations',
      'Automated lead capture, qualification questions & calendar booking flow',
      'Strict hallucination guardrails, topic boundaries & tone-of-voice rules',
      'Live human agent handoff to Slack, WhatsApp, HubSpot, or Zendesk',
      'Conversation analytics dashboard tracking resolution rate & captured leads',
    ],
    bestFor: ['B2B SaaS & Enterprise Sites', 'D2C & E-commerce Brands', 'Healthcare & Education Portals'],
    typicalTimeline: '2–4 weeks from knowledge ingestion to live deployment',
    keyMetric: 'Up to 68% of visitor queries resolved automatically (placeholder)',
    relatedIndustries: ['b2b-saas', 'ecommerce', 'healthcare', 'finance-fintech'],
    relatedServices: ['website-development', 'web-application-development', 'conversion-rate-optimization'],
    futurePagePath: '/ai-solutions/ai-chatbot-development',
  },
  {
    slug: 'whatsapp-ai-chatbot',
    name: 'WhatsApp AI Chatbot',
    category: 'AI Build',
    badge: null,
    icon: 'MessageSquare',
    tagline: 'Qualify leads, answer questions & book appointments on WhatsApp',
    description:
      'Meet Indian and global customers on the app they open 30+ times a day. Built on the official WhatsApp Business API, our conversational AI assistant replies in under 2 seconds in English, Hindi, or regional languages—answering pricing questions, sharing catalogs, booking slots, and syncing every lead to your CRM.',
    deliverables: [
      'Official WhatsApp Business API (WABA) setup & green-tick verification support',
      'Conversational AI agent trained on your catalog, services & pricing rules',
      'Interactive WhatsApp list messages, quick-reply buttons & product carousels',
      'Automated appointment/demo booking with reminder & confirmation templates',
      'Two-way CRM sync (HubSpot, Zoho, LeadSquared, Shopify) + human agent takeover',
      'Click-to-WhatsApp ad attribution & broadcast re-engagement flows',
    ],
    bestFor: ['Clinics & Healthcare Networks', 'D2C & Retail Stores', 'Real Estate, Interior & EdTech'],
    typicalTimeline: '2–3 weeks including Meta template approvals',
    keyMetric: '3.1× higher lead-to-appointment conversion on WhatsApp (placeholder)',
    relatedIndustries: ['healthcare', 'skincare-beauty', 'education-edtech', 'interior-design-architecture'],
    relatedServices: ['performance-marketing', 'ecommerce-development', 'local-seo'],
    futurePagePath: '/ai-solutions/whatsapp-ai-chatbot',
  },
  {
    slug: 'ai-voice-agents',
    name: 'AI Voice Agents',
    category: 'AI Build',
    badge: 'NEW',
    icon: 'Mic',
    tagline: 'Human-like phone agents for inbound support & outbound qualification',
    description:
      'Never miss a phone enquiry or let fresh ad leads go cold. Our sub-600ms low-latency AI voice agents answer inbound calls 24/7 and place instant outbound qualification calls the moment a form is submitted—confirming intent, answering common questions, booking calendar slots, and transferring hot buyers to your reps.',
    deliverables: [
      'Sub-second latency voice pipeline (Speech-to-Text + LLM + natural neural TTS)',
      'Inbound receptionist & IVR replacement for 24/7 call answering & routing',
      'Instant outbound speed-to-lead calling within 30 seconds of form submission',
      'Appointment confirmation, test-ride scheduling & payment/renewal reminders',
      'Warm call transfer to human sales reps with live call summary whisper',
      'Full call recording, verbatim transcript, sentiment tag & CRM logging',
    ],
    bestFor: ['EV & Automotive Dealerships', 'Healthcare & Diagnostics', 'High-Volume Lead-Gen & Travel'],
    typicalTimeline: '3–5 weeks including telephony & SIP integration',
    keyMetric: '<45 sec speed-to-lead call response & 55% lower call center load (placeholder)',
    relatedIndustries: ['ev-automotive', 'healthcare', 'travel-hospitality', 'education-edtech'],
    relatedServices: ['performance-marketing', 'google-ads-sem', 'analytics-tracking-setup'],
    futurePagePath: '/ai-solutions/ai-voice-agents',
  },
  {
    slug: 'custom-ai-llm-integration',
    name: 'Custom AI / LLM Integration',
    category: 'AI Build',
    badge: null,
    icon: 'Cpu',
    tagline: 'Embed OpenAI, Claude or Gemini directly into your product & internal tools',
    description:
      'We architect production-grade LLM features inside your existing web application, SaaS platform, or internal portal—including semantic vector search, intelligent document parsing, copilot sidebars, structured JSON extraction, and multi-model routing with enterprise security and token cost controls.',
    deliverables: [
      'Multi-model architecture (OpenAI, Anthropic Claude, Google Gemini, open-weights)',
      'Vector database & semantic search engineering (pgvector, Pinecone, Weaviate)',
      'Structured JSON output pipelines, function calling & tool-use orchestration',
      'Document intelligence (PDF/invoice/contract OCR, summarization & extraction)',
      'Prompt evaluation suite, caching layer & token cost monitoring dashboard',
      'Zero-data-retention API configuration, PII redaction & role-based access control',
    ],
    bestFor: ['B2B SaaS Product Teams', 'Fintech & Legal/Finance Ops', 'Manufacturing & Enterprise Portals'],
    typicalTimeline: '4–8 weeks from architecture blueprint to production release',
    keyMetric: '60% faster document & workflow processing inside client apps (placeholder)',
    relatedIndustries: ['b2b-saas', 'finance-fintech', 'manufacturing-industrial'],
    relatedServices: ['web-application-development', 'mobile-app-development', 'managed-it-services'],
    futurePagePath: '/ai-solutions/custom-ai-llm-integration',
  },

  /* ==========================================================================
     CATEGORY 2 — AI MARKETING (4 solutions)
  ========================================================================== */
  {
    slug: 'ai-generated-videos',
    name: 'AI Generated Videos',
    category: 'AI Marketing',
    badge: 'NEW',
    icon: 'Video',
    tagline: 'Studio-grade product explainers, ad variants & multilingual video at scale',
    description:
      'Produce high-converting video ads, product showcases, founder/avatar explainers, and localized multilingual video variants in days instead of months—combining generative video models, realistic voice synthesis, and human motion-graphics polish.',
    deliverables: [
      'Scriptwriting, storyboard & conversion hook variations for paid & organic video',
      'AI product showcase & lifestyle video generation with brand-consistent styling',
      'Digital presenter / avatar product explainers & onboarding walkthroughs',
      'Multilingual dubbing & lip-sync localization (English, Hindi + 15 languages)',
      'Multi-aspect ratio renders (9:16 Reels/Shorts, 1:1 Feed, 16:9 YouTube/Web)',
      'Human creative director QA, custom captions, sound design & motion graphics',
    ],
    bestFor: ['Fashion & Lifestyle Labels', 'Skincare & D2C E-commerce', 'SaaS & App Launches'],
    typicalTimeline: '5–10 business days per campaign batch',
    keyMetric: '4× faster video production at 60% lower cost per creative (placeholder)',
    relatedIndustries: ['fashion-lifestyle', 'skincare-beauty', 'ecommerce', 'b2b-saas'],
    relatedServices: ['creative-communication', 'performance-marketing', 'branding-logo-design'],
    futurePagePath: '/ai-solutions/ai-generated-videos',
  },
  {
    slug: 'ai-content-creation',
    name: 'AI Content Creation',
    category: 'AI Marketing',
    badge: null,
    icon: 'FileText',
    tagline: 'Brand-trained content pipelines with human editorial review',
    description:
      'Scale your blog articles, e-commerce product descriptions, landing page variants, and email sequences without generic AI slop. We build custom brand-voice workflows grounded in your subject-matter expertise—and every piece is edited and fact-checked by senior human writers.',
    deliverables: [
      'Custom Brand Voice & Style Guide prompt library trained on your best writing',
      'Research-backed long-form blog posts, pillar guides & comparison pages',
      'Bulk SKU product descriptions & collection copy for 500+ item catalogs',
      'Landing page & email sequence copy variants for rapid A/B testing',
      'Mandatory human editorial review, fact-checking & originality verification',
      'CMS-ready formatting with meta tags, internal links & FAQ schema blocks',
    ],
    bestFor: ['Large-Catalog E-commerce', 'B2B SaaS Content Engines', 'Multi-Location Service Brands'],
    typicalTimeline: '1–2 weeks setup + ongoing monthly content sprints',
    keyMetric: '3.5× content publishing velocity with 100% human-reviewed quality (placeholder)',
    relatedIndustries: ['ecommerce', 'skincare-beauty', 'b2b-saas', 'home-decor-furniture'],
    relatedServices: ['content-marketing', 'copywriting', 'email-marketing'],
    futurePagePath: '/ai-solutions/ai-content-creation',
  },
  {
    slug: 'ai-powered-seo',
    name: 'AI-Powered SEO',
    category: 'AI Marketing',
    badge: null,
    icon: 'Search',
    tagline: 'Programmatic SEO, entity clustering & AI search visibility at scale',
    description:
      'Supercharge your organic growth with AI-assisted keyword clustering, SERP gap intelligence, automated internal linking maps, programmatic landing page architectures, and continuous visibility tracking across Google Search, AI Overviews, ChatGPT, and Perplexity.',
    deliverables: [
      'AI-driven semantic keyword clustering & buyer-intent topic map (1,000+ terms)',
      'Programmatic SEO page architecture for locations, integrations, or categories',
      'Automated SERP & competitor content brief generation for writers',
      'Entity & JSON-LD schema automation for Google AI Overviews, AEO & GEO',
      'Internal link graph analysis & orphan-page recovery recommendations',
      'Monthly organic traffic, AI citation share & ranking velocity telemetry',
    ],
    bestFor: ['B2B SaaS & Marketplaces', 'Multi-City Healthcare & Education', 'E-commerce Category Scaling'],
    typicalTimeline: '3–4 weeks foundation + monthly compounding sprints',
    keyMetric: '+215% faster non-brand organic impression growth in 6 months (placeholder)',
    relatedIndustries: ['b2b-saas', 'ecommerce', 'education-edtech', 'travel-hospitality'],
    relatedServices: ['seo-services', 'aeo-services', 'geo-generative-engine-optimization'],
    futurePagePath: '/ai-solutions/ai-powered-seo',
  },
  {
    slug: 'ai-ad-creatives',
    name: 'AI Ad Creatives',
    category: 'AI Marketing',
    badge: null,
    icon: 'Megaphone',
    tagline: 'High-velocity static & motion ad testing to beat creative fatigue',
    description:
      'Performance marketing lives and dies by creative testing volume. We combine generative product scenes, hook-matrix copywriting, and senior ad designers to ship 30–60 on-brand Meta, Google Display, and LinkedIn ad variations every month—systematically retiring losers and scaling winners.',
    deliverables: [
      'Monthly creative testing matrix (angles, hooks, visual formats & personas)',
      'AI-assisted product lifestyle scenes & background generation without studio shoots',
      'High-converting static ad sets for Meta, Instagram, LinkedIn & Google PMax',
      'Direct-response headline, primary text & CTA variations per audience segment',
      'Creative fatigue monitoring & weekly ROAS/CTR winner-iteration loop',
      'Editable Figma source templates & organized asset library delivery',
    ],
    bestFor: ['D2C Brands Scaling Meta Ads', 'App Install & SaaS Campaigns', 'Seasonal Retail Launches'],
    typicalTimeline: '5–7 business days for first 25+ ad creative batch',
    keyMetric: '-34% lower CPA through high-frequency creative testing (placeholder)',
    relatedIndustries: ['ecommerce', 'fashion-lifestyle', 'skincare-beauty', 'home-decor-furniture'],
    relatedServices: ['performance-marketing', 'google-ads-sem', 'creative-communication'],
    futurePagePath: '/ai-solutions/ai-ad-creatives',
  },

  /* ==========================================================================
     CATEGORY 3 — AI AUTOMATION (4 solutions)
  ========================================================================== */
  {
    slug: 'ai-workflow-automation',
    name: 'AI Workflow Automation',
    category: 'AI Automation',
    badge: null,
    icon: 'Workflow',
    tagline: 'Connect your apps and eliminate repetitive manual operations',
    description:
      'Stop paying skilled team members to copy-paste data between spreadsheets, emails, Slack, and ERPs. We engineer resilient multi-step automations using Make, n8n, Zapier, and custom webhooks enhanced with LLM reasoning nodes to classify, extract, route, and execute tasks automatically.',
    deliverables: [
      'End-to-end operational workflow audit & bottleneck ROI mapping',
      'Custom n8n, Make, Zapier, or serverless webhook automation pipelines',
      'LLM reasoning steps (email triage, invoice parsing, ticket categorization)',
      'Two-way synchronization across Google Workspace, Slack, Notion, ERP & billing',
      'Error handling, retry queues, dead-letter alerts & execution audit logs',
      'Full workflow documentation & admin handover training for your ops team',
    ],
    bestFor: ['Operations-Heavy B2B Teams', 'Manufacturing & Logistics', 'Agencies, Finance & Back-Office'],
    typicalTimeline: '2–4 weeks from workflow mapping to live automation',
    keyMetric: '25+ hours of manual admin work saved per team every week (placeholder)',
    relatedIndustries: ['manufacturing-industrial', 'finance-fintech', 'b2b-saas', 'ecommerce'],
    relatedServices: ['web-application-development', 'managed-it-services', 'analytics-tracking-setup'],
    futurePagePath: '/ai-solutions/ai-workflow-automation',
  },
  {
    slug: 'ai-agents-for-business',
    name: 'AI Agents for Business',
    category: 'AI Automation',
    badge: 'NEW',
    icon: 'Users',
    tagline: 'Role-specific digital coworkers for research, ops, QA & customer prep',
    description:
      'Go beyond single-prompt chatbots with tool-using AI agents that can search your internal databases, research prospect companies, draft proposals, prepare pre-call briefings, audit support tickets, and request human approval before executing high-stakes actions.',
    deliverables: [
      'Custom role-based agent design (SDR Research Agent, Support QA Agent, Ops Agent)',
      'Secure tool-use & API permissions (read CRM, query database, draft docs)',
      'Human-in-the-loop (HITL) approval gates via Slack or Microsoft Teams',
      'Multi-step task planning, memory persistence & source verification',
      'Role-based access boundaries & complete action audit trail',
      'Iterative accuracy tuning based on team thumbs-up/thumbs-down feedback',
    ],
    bestFor: ['B2B Sales & RevOps Teams', 'Customer Success & Support Orgs', 'Knowledge-Intensive Enterprises'],
    typicalTimeline: '4–6 weeks for custom agent build & safety testing',
    keyMetric: '4.2× faster prospect research & internal ticket resolution (placeholder)',
    relatedIndustries: ['b2b-saas', 'finance-fintech', 'manufacturing-industrial', 'education-edtech'],
    relatedServices: ['web-application-development', 'managed-it-services', 'email-marketing'],
    futurePagePath: '/ai-solutions/ai-agents-for-business',
  },
  {
    slug: 'crm-lead-automation',
    name: 'CRM & Lead Automation',
    category: 'AI Automation',
    badge: null,
    icon: 'Database',
    tagline: 'Instant lead capture, AI scoring, enrichment & multi-channel follow-up',
    description:
      'Most businesses lose 40–60% of paid and organic leads because follow-up takes hours instead of seconds. We wire your website forms, WhatsApp, and ad platforms directly into HubSpot, Zoho, Salesforce, or LeadSquared—enriching leads with AI, scoring fit, assigning reps, and triggering instant WhatsApp + email follow-up.',
    deliverables: [
      'Zero-leakage lead ingestion from Website, Meta Lead Ads, Google Ads & WhatsApp',
      'AI lead enrichment & automatic fit/intent scoring before rep assignment',
      'Round-robin or territory-based instant sales rep routing & Slack/WhatsApp alerts',
      'Automated 60-second personalized Email + WhatsApp speed-to-lead sequence',
      'Pipeline stage automation, stale-deal nudges & automated meeting scheduling',
      'Closed-loop offline conversion sync back to Google Ads & Meta CAPI',
    ],
    bestFor: ['B2B & High-Ticket Service Firms', 'Real Estate, Interior & EV', 'EdTech & Healthcare Admissions'],
    typicalTimeline: '2–4 weeks for full CRM & speed-to-lead deployment',
    keyMetric: '<60 sec lead response time & +48% qualified pipeline conversion (placeholder)',
    relatedIndustries: ['b2b-saas', 'manufacturing-industrial', 'interior-design-architecture', 'ev-automotive'],
    relatedServices: ['performance-marketing', 'email-marketing', 'conversion-rate-optimization'],
    futurePagePath: '/ai-solutions/crm-lead-automation',
  },
  {
    slug: 'ai-analytics-reporting',
    name: 'AI Analytics & Reporting',
    category: 'AI Automation',
    badge: null,
    icon: 'BarChart3',
    tagline: 'Automated cross-channel dashboards with plain-English AI insights',
    description:
      'Replace Monday-morning spreadsheet crunching with automated executive intelligence. We unify your GA4, Google Ads, Meta Ads, Shopify/Stripe revenue, and CRM pipeline into live dashboards—paired with scheduled AI narrative summaries that flag anomalies, explain ROAS shifts, and recommend next actions.',
    deliverables: [
      'Unified data pipeline connecting GA4, Ad Platforms, CRM & E-commerce/ERP',
      'Real-time Looker Studio or custom executive KPI command center',
      'Automated weekly/monthly AI executive summary sent to Slack, Email, or WhatsApp',
      'Real-time anomaly detection alerts (spend spikes, conversion drops, tracking breaks)',
      'Natural-language query interface ("Ask your metrics in plain English")',
      'Channel attribution & cohort LTV/CAC modeling for founders and CMOs',
    ],
    bestFor: ['Founders & Leadership Teams', 'Multi-Channel D2C Brands', 'Performance Marketing Teams'],
    typicalTimeline: '2–3 weeks from data connector setup to live automated briefs',
    keyMetric: '100% automated weekly reporting & instant anomaly alerts (placeholder)',
    relatedIndustries: ['ecommerce', 'b2b-saas', 'finance-fintech', 'skincare-beauty'],
    relatedServices: ['analytics-tracking-setup', 'performance-marketing', 'google-ads-sem'],
    futurePagePath: '/ai-solutions/ai-analytics-reporting',
  },
];

/* ============================================================================
   HELPER ICON RENDERER FOR AI SOLUTIONS (`AISolutionIcon` named export)
============================================================================ */

export const AISolutionIcon: React.FC<{
  name: AISolutionIconName;
  className?: string;
}> = ({ name, className = 'w-5 h-5' }) => {
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
   HERO INTERACTIVE ARCHITECTURE DATA (3 AI PILLAR NODES)
============================================================================ */

interface HeroArchitectureNode {
  category: AISolutionCategory;
  code: string;
  subtitle: string;
  targetAnchor: string;
  inputSources: [string, string, string];
  engineDesc: string;
  outputs: [string, string, string];
  featuredSlugs: [string, string, string, string];
}

const HERO_ARCHITECTURE_NODES: HeroArchitectureNode[] = [
  {
    category: 'AI Build',
    code: 'ENGINE 01',
    subtitle: 'Conversational Agents & Custom LLM Systems',
    targetAnchor: '#pillar-ai-build',
    inputSources: ['Product Docs & PDFs', 'Website & WhatsApp', 'Inbound/Outbound Calls'],
    engineDesc: 'RAG Vector Index + Guardrailed LLMs + Sub-600ms Voice Pipeline',
    outputs: ['24/7 Instant Answers', 'Qualified Appointments', 'In-App Copilot Features'],
    featuredSlugs: [
      'ai-chatbot-development',
      'whatsapp-ai-chatbot',
      'ai-voice-agents',
      'custom-ai-llm-integration',
    ],
  },
  {
    category: 'AI Marketing',
    code: 'ENGINE 02',
    subtitle: 'Generative Video, Content, SEO & Ad Velocity',
    targetAnchor: '#pillar-ai-marketing',
    inputSources: ['Brand Style Guide', 'SKU Catalog & Briefs', 'SERP & Ad Performance'],
    engineDesc: 'Brand-Trained Models + Programmatic SEO + Human Creative QA',
    outputs: ['Studio-Grade Video Ads', 'Human-Edited Blogs & Copy', ' Google + AI Search Citations'],
    featuredSlugs: [
      'ai-generated-videos',
      'ai-content-creation',
      'ai-powered-seo',
      'ai-ad-creatives',
    ],
  },
  {
    category: 'AI Automation',
    code: 'ENGINE 03',
    subtitle: 'Autonomous Workflows, Business Agents & CRM Sync',
    targetAnchor: '#pillar-ai-automation',
    inputSources: ['Web Forms & Ad Leads', 'CRM, ERP & Helpdesk', 'GA4 & Revenue Data'],
    engineDesc: 'Multi-Step Orchestration + Role Agents + Anomaly Detection',
    outputs: ['<60s Speed-to-Lead', 'Zero Manual Data Entry', 'Automated Executive Briefs'],
    featuredSlugs: [
      'ai-workflow-automation',
      'ai-agents-for-business',
      'crm-lead-automation',
      'ai-analytics-reporting',
    ],
  },
];

/* ============================================================================
   SECTION 2 — INTERACTIVE AI BOTTLENECK DIAGNOSTIC DATA (6 BOTTLENECKS)
============================================================================ */

interface BottleneckOption {
  id: string;
  code: string;
  bottleneck: string;
  symptom: string;
  recommendedSlugs: [string, string, string];
  architectureFlow: [string, string, string];
  suggestedTimeline: string;
  firstStep: string;
}

const BOTTLENECK_OPTIONS: BottleneckOption[] = [
  {
    id: 'slow-lead-response',
    code: 'BOTTLENECK 01',
    bottleneck: 'We lose leads outside business hours or reply too slowly',
    symptom: 'Visitors leave without enquiring, or ad leads go cold before sales calls them.',
    recommendedSlugs: ['ai-chatbot-development', 'whatsapp-ai-chatbot', 'crm-lead-automation'],
    architectureFlow: [
      'Visitor asks on Web or WhatsApp 24/7',
      'AI qualifies budget, timeline & answers FAQs',
      'Synced to CRM + instant calendar booking',
    ],
    suggestedTimeline: '2–4 weeks to go live across Web & WhatsApp',
    firstStep: 'Free Lead Response & Funnel Leakage Audit',
  },
  {
    id: 'repetitive-support-calls',
    code: 'BOTTLENECK 02',
    bottleneck: 'Our team is buried in repetitive support queries & phone calls',
    symptom: 'Agents answer the same 30 questions all day on WhatsApp, phone, and email.',
    recommendedSlugs: ['whatsapp-ai-chatbot', 'ai-voice-agents', 'ai-chatbot-development'],
    architectureFlow: [
      'Inbound call, WhatsApp, or web ticket arrives',
      'RAG + Voice AI resolves 65%+ tier-1 queries',
      'Complex cases routed to humans with full context',
    ],
    suggestedTimeline: '3–5 weeks including knowledge base & voice setup',
    firstStep: 'Free Top-50 Support Ticket & Call Automation Assessment',
  },
  {
    id: 'content-creative-bottleneck',
    code: 'BOTTLENECK 03',
    bottleneck: 'Content, video, and ad creative production is too slow & expensive',
    symptom: 'Paid ads suffer from creative fatigue and blog/product publishing lags behind.',
    recommendedSlugs: ['ai-generated-videos', 'ai-ad-creatives', 'ai-content-creation'],
    architectureFlow: [
      'Brand voice & visual guidelines locked in',
      'AI generates video, ad & copy variations at scale',
      'Senior human editors polish & ship to campaigns',
    ],
    suggestedTimeline: '5–10 business days for first production batch',
    firstStep: 'Free Creative Velocity & Content Sample Sprint',
  },
  {
    id: 'manual-admin-spreadsheets',
    code: 'BOTTLENECK 04',
    bottleneck: 'Operations rely on manual copy-pasting across spreadsheets & apps',
    symptom: 'Hours wasted moving data between emails, PDFs, CRM, billing, and Slack.',
    recommendedSlugs: ['ai-workflow-automation', 'ai-agents-for-business', 'ai-analytics-reporting'],
    architectureFlow: [
      'Trigger event in Email, CRM, or ERP',
      'AI extracts, validates & routes structured data',
      'Synced across tools with human approval gates',
    ],
    suggestedTimeline: '2–4 weeks per automated operational workflow',
    firstStep: 'Free 30-Minute Operations & Workflow Mapping Call',
  },
  {
    id: 'ai-search-visibility',
    code: 'BOTTLENECK 05',
    bottleneck: 'We want to scale organic traffic & win AI search citations',
    symptom: 'Competitors outrank you on long-tail searches and ChatGPT/Gemini answers.',
    recommendedSlugs: ['ai-powered-seo', 'ai-content-creation', 'ai-analytics-reporting'],
    architectureFlow: [
      'AI semantic keyword & entity gap clustering',
      'Programmatic & editorial authority pages published',
      'Tracked across Google Search + AI answer engines',
    ],
    suggestedTimeline: '3–4 weeks setup + compounding monthly sprints',
    firstStep: 'Free AI Search (AEO/GEO) & Programmatic SEO Audit',
  },
  {
    id: 'embed-ai-in-product',
    code: 'BOTTLENECK 06',
    bottleneck: 'We want to build custom AI / LLM features into our own product',
    symptom: 'Your SaaS or portal needs smart search, document AI, or an embedded copilot.',
    recommendedSlugs: [
      'custom-ai-llm-integration',
      'ai-agents-for-business',
      'ai-chatbot-development',
    ],
    architectureFlow: [
      'Private data indexed in secure vector store',
      'Multi-model LLM API with function calling & guardrails',
      'Shipped inside your React/Next.js or mobile app',
    ],
    suggestedTimeline: '4–8 weeks from architecture spec to production',
    firstStep: 'Free LLM Architecture & Token Economics Consultation',
  },
];

/* ============================================================================
   HELPER FOR LINKING TO DEDICATED SERVICE & INDUSTRY PAGES
============================================================================ */

const LIVE_SERVICE_SLUGS = new Set([
  'website-development',
  'ecommerce-development',
  'mobile-app-development',
  'wordpress-shopify-development',
  'website-maintenance-support',
  'managed-it-services',
  'seo-services',
  'local-seo',
  'aeo-services',
  'geo-generative-engine-optimization',
  'performance-marketing',
  'google-ads-sem',
  'conversion-rate-optimization',
  'analytics-tracking-setup',
  'branding-logo-design',
  'creative-communication',
  'copywriting',
  'email-marketing',
]);

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

function getServiceRoute(slug: string): string {
  return LIVE_SERVICE_SLUGS.has(slug) ? `/services/${slug}` : `/services#${slug}`;
}

function getIndustryRoute(slug: string): string {
  return LIVE_INDUSTRY_SLUGS.has(slug) ? `/industries/${slug}` : `/industries#${slug}`;
}

/* ============================================================================
   MAIN AI SOLUTIONS HUB PAGE COMPONENT (`/ai-solutions`)
============================================================================ */

interface AISolutionsProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const AISolutions: React.FC<AISolutionsProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();
  // location

  const triggerQuoteModal = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: service }));
    }
  };

  /* Section 1: Hero Active Architecture Pillar State */
  const [activeHeroCategory, setActiveHeroCategory] = useState<AISolutionCategory>('AI Build');

  /* Section 2: Bottleneck Diagnostic State */
  const [selectedBottleneckId, setSelectedBottleneckId] = useState<string>(
    BOTTLENECK_OPTIONS[0].id
  );

  /* Section 3: Filter & Search Bar State */
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<
    'All' | AISolutionCategory | 'New & Bestsellers'
  >('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  /* Section 4: Master Switchboard Active Slugs per Pillar */
  const [selectedBuildSlug, setSelectedBuildSlug] = useState<string>('ai-chatbot-development');
  const [selectedMarketingSlug, setSelectedMarketingSlug] =
    useState<string>('ai-generated-videos');
  const [selectedAutomationSlug, setSelectedAutomationSlug] =
    useState<string>('ai-workflow-automation');

  /* SEO Meta + Title */
  useEffect(() => {
    document.title =
      'AI Solutions for Business — AI Chatbots, Voice Agents & Workflow Automation | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore 12 production-ready AI solutions across AI Build (RAG Chatbots, WhatsApp AI, Voice Agents, Custom LLMs), AI Marketing (AI Video, Content, SEO, Ad Creatives), and AI Automation.'
      );
    }
  }, []);

  /* Hash Deep-Linking Support (`/ai-solutions#<slug>`) */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash) return;
    const rawSlug = window.location.hash.replace('#', '').trim();
    if (!rawSlug) return;

    const matchedSol = aiSolutions.find((item) => item.slug === rawSlug);
    if (matchedSol) {
      setActiveCategoryFilter('All');
      setSearchQuery('');

      if (matchedSol.category === 'AI Build') {
        setSelectedBuildSlug(matchedSol.slug);
      } else if (matchedSol.category === 'AI Marketing') {
        setSelectedMarketingSlug(matchedSol.slug);
      } else if (matchedSol.category === 'AI Automation') {
        setSelectedAutomationSlug(matchedSol.slug);
      }

      const timer = setTimeout(() => {
        const targetEl =
          document.getElementById(matchedSol.slug) ||
          document.getElementById(
            matchedSol.category === 'AI Build'
              ? 'pillar-ai-build'
              : matchedSol.category === 'AI Marketing'
              ? 'pillar-ai-marketing'
              : 'pillar-ai-automation'
          );
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 90);
      return () => clearTimeout(timer);
    }
  }, []);

  /* Filtered Solutions for Section 3 & Section 4 */
  const filteredSolutions = useMemo(() => {
    return aiSolutions.filter((sol) => {
      const matchesCat =
        activeCategoryFilter === 'All'
          ? true
          : activeCategoryFilter === 'New & Bestsellers'
          ? sol.badge !== null
          : sol.category === activeCategoryFilter;

      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const inName = sol.name.toLowerCase().includes(q);
      const inTagline = sol.tagline.toLowerCase().includes(q);
      const inDesc = sol.description.toLowerCase().includes(q);
      const inDeliverables = sol.deliverables.some((d) => d.toLowerCase().includes(q));
      const inBestFor = sol.bestFor.some((b) => b.toLowerCase().includes(q));
      return inName || inTagline || inDesc || inDeliverables || inBestFor;
    });
  }, [activeCategoryFilter, searchQuery]);

  const buildSolutions = useMemo(
    () => filteredSolutions.filter((s) => s.category === 'AI Build'),
    [filteredSolutions]
  );
  const marketingSolutions = useMemo(
    () => filteredSolutions.filter((s) => s.category === 'AI Marketing'),
    [filteredSolutions]
  );
  const automationSolutions = useMemo(
    () => filteredSolutions.filter((s) => s.category === 'AI Automation'),
    [filteredSolutions]
  );

  const activeBuildSolution =
    buildSolutions.find((s) => s.slug === selectedBuildSlug) ||
    buildSolutions[0] ||
    aiSolutions.find((s) => s.slug === 'ai-chatbot-development')!;

  const activeMarketingSolution =
    marketingSolutions.find((s) => s.slug === selectedMarketingSlug) ||
    marketingSolutions[0] ||
    aiSolutions.find((s) => s.slug === 'ai-generated-videos')!;

  const activeAutomationSolution =
    automationSolutions.find((s) => s.slug === selectedAutomationSlug) ||
    automationSolutions[0] ||
    aiSolutions.find((s) => s.slug === 'ai-workflow-automation')!;

  /* Active Hero Architecture Node */
  const activeHeroNode =
    HERO_ARCHITECTURE_NODES.find((n) => n.category === activeHeroCategory) ||
    HERO_ARCHITECTURE_NODES[0];

  /* Active Bottleneck Option */
  const activeBottleneck =
    BOTTLENECK_OPTIONS.find((b) => b.id === selectedBottleneckId) || BOTTLENECK_OPTIONS[0];
  const activeBottleneckSolutions = activeBottleneck.recommendedSlugs
    .map((slug) => aiSolutions.find((s) => s.slug === slug))
    .filter((s): s is AISolutionItem => Boolean(s));

  /* Helper to jump to a specific AI solution in Section 4 */
  const jumpToSolutionBlueprint = (sol: AISolutionItem) => {
    setActiveCategoryFilter('All');
    setSearchQuery('');
    if (sol.category === 'AI Build') {
      setSelectedBuildSlug(sol.slug);
    } else if (sol.category === 'AI Marketing') {
      setSelectedMarketingSlug(sol.slug);
    } else {
      setSelectedAutomationSlug(sol.slug);
    }
    setTimeout(() => {
      const el =
        document.getElementById(sol.slug) ||
        document.getElementById(
          sol.category === 'AI Build'
            ? 'pillar-ai-build'
            : sol.category === 'AI Marketing'
            ? 'pillar-ai-marketing'
            : 'pillar-ai-automation'
        );
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  /* JSON-LD Schema: CollectionPage + ItemList of 12 AI Solutions */
  const jsonLdSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'AI Solutions for Business | WebXCode',
      description:
        '12 production-ready AI solutions across AI Build (Chatbots, WhatsApp AI, Voice Agents, Custom LLMs), AI Marketing, and AI Automation.',
      url: 'https://webxcode.com/ai-solutions',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: aiSolutions.map((sol, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Service',
            name: sol.name,
            category: sol.category,
            description: sol.tagline,
            provider: {
              '@type': 'Organization',
              name: 'WebXCode',
            },
            url: `https://webxcode.com/ai-solutions#${sol.slug}`,
          },
        })),
      },
    };
  }, []);

  /* Render Helper for a Category Workbench Block in Section 4 */
  const renderAICategoryWorkbench = (
    pillarIndex: string,
    pillarId: string,
    categoryTitle: AISolutionCategory,
    categoryIntro: string,
    categoryItems: AISolutionItem[],
    activeSol: AISolutionItem,
    onSelectSlug: (slug: string) => void
  ) => {
    if (categoryItems.length === 0) return null;

    return (
      <div
        id={pillarId}
        className="scroll-mt-28 rounded-[24px] border border-navy-08 bg-white shadow-soft overflow-hidden"
      >
        {/* Top Category Header Strip */}
        <div className="bg-navy text-white px-6 sm:px-8 py-6 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <span className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-[12px] font-extrabold tracking-wider uppercase shrink-0">
              AI PILLAR {pillarIndex}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-[22px] sm:text-[26px] font-extrabold text-white tracking-tight">
                  {categoryTitle}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[12px] font-bold text-primary-100">
                  {categoryItems.length}{' '}
                  {categoryItems.length === 1 ? 'Capability' : 'Capabilities'}
                </span>
              </div>
              <p className="text-[14px] sm:text-[15px] text-white/75 mt-1">{categoryIntro}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => triggerQuoteModal(`${categoryTitle} — Custom Architecture`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-primary border border-white/20 hover:border-primary text-[13px] font-semibold text-white transition-all cursor-pointer"
            >
              <span>Scope {categoryTitle} Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hidden anchor IDs for every solution in this category so /ai-solutions#<slug> always resolves */}
        <div className="sr-only" aria-hidden="true">
          {aiSolutions
            .filter((s) => s.category === categoryTitle)
            .map((s) => (
              <span key={s.slug} id={s.slug} />
            ))}
        </div>

        {/* 12-Col Split Blueprint Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (5 cols on lg): Capability Selector */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-navy-08 bg-primary-50/35 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-70">
                  Select an AI Capability
                </span>
                <span className="text-[11px] font-semibold text-primary">
                  Click to inspect blueprint
                </span>
              </div>

              <div
                className="space-y-2.5"
                role="tablist"
                aria-label={`${categoryTitle} capabilities`}
              >
                {categoryItems.map((sol, idx) => {
                  const isSelected = activeSol.slug === sol.slug;
                  return (
                    <button
                      key={sol.slug}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => onSelectSlug(sol.slug)}
                      className={`w-full text-left p-4 rounded-[18px] transition-all duration-150 flex items-start gap-3.5 cursor-pointer border ${
                        isSelected
                          ? 'bg-navy text-white border-navy shadow-md'
                          : 'bg-white text-navy border-navy-08 hover:border-primary/40 hover:bg-primary-50/60'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'bg-primary text-white' : 'bg-primary-50 text-primary'
                        }`}
                      >
                        <AISolutionIcon name={sol.icon} className="w-5 h-5" />
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
                            {sol.name}
                          </span>
                          {sol.badge && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                sol.badge === 'BESTSELLER'
                                  ? 'bg-primary text-white'
                                  : isSelected
                                  ? 'bg-white/15 text-white'
                                  : 'bg-primary-50 text-primary border border-primary-100'
                              }`}
                            >
                              {sol.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[13px] mt-1 line-clamp-1 ${
                            isSelected ? 'text-white/75' : 'text-navy-70'
                          }`}
                        >
                          {sol.tagline}
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

            {/* Guardrail Assurance Note at bottom of left selector */}
            <div className="mt-6 p-3.5 rounded-2xl bg-white border border-navy-08 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-[12px] text-navy-70 leading-snug">
                <strong className="font-bold text-navy">Private by design:</strong> Your business
                data is never used to train public models.
              </p>
            </div>
          </div>

          {/* Right Column (7 cols on lg): Live AI Capability Blueprint Panel */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-white flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSol.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Blueprint Top Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-navy-08">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-bold uppercase tracking-[0.12em]">
                        {activeSol.category}
                      </span>
                      {activeSol.badge && (
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            activeSol.badge === 'BESTSELLER'
                              ? 'bg-primary text-white'
                              : 'bg-navy text-white'
                          }`}
                        >
                          {activeSol.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] font-mono font-semibold text-navy-50">
                      SPEC: WX-AI-{activeSol.slug.slice(0, 10).toUpperCase()}
                    </span>
                  </div>

                  {/* Title, Tagline & Description */}
                  <div className="mt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                        <AISolutionIcon name={activeSol.icon} className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-[24px] sm:text-[28px] font-extrabold text-navy leading-tight">
                          {activeSol.name}
                        </h4>
                        <p className="text-[16px] font-semibold text-primary mt-1">
                          {activeSol.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[15px] sm:text-[16px] text-navy-70 leading-[1.7]">
                      {activeSol.description}
                    </p>
                  </div>

                  {/* Best For Chips */}
                  <div className="mt-6">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2.5">
                      Ideal Deployment Scenarios
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeSol.bestFor.map((bf) => (
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

                  {/* 6 Engineering Deliverables in 2-Col Grid */}
                  <div className="mt-7">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-3">
                      What We Engineer &amp; Deliver (6 Core Components)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeSol.deliverables.map((deliv) => (
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

                  {/* Typical Timeline & Benchmark Outcome Strip */}
                  <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-navy text-white">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                          Typical Deployment
                        </div>
                        <div className="text-[14px] sm:text-[15px] font-bold text-white mt-0.5">
                          {activeSol.typicalTimeline}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:border-l sm:border-white/15 sm:pl-4">
                      <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                          Target Benchmark
                        </div>
                        <div className="text-[14px] sm:text-[15px] font-bold text-primary-100 mt-0.5">
                          {activeSol.keyMetric}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cross-Links: Related Industries & Related Core Services */}
                  <div className="mt-6 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[12px] font-bold text-navy-60 mr-1">
                        High-Impact Industries:
                      </span>
                      {activeSol.relatedIndustries.map((indSlug) => {
                        const indObj = industries.find((i: any) => i.slug === indSlug);
                        if (!indObj) return null;
                        return (
                          <Link
                            key={indSlug}
                            href={getIndustryRoute(indSlug)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-navy-15 hover:border-primary hover:text-primary text-[12px] font-semibold text-navy transition-colors"
                          >
                            <IndustryIcon name={indObj.icon} className="w-3.5 h-3.5 text-primary" />
                            <span>{indObj.name}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[12px] font-bold text-navy-60 mr-1">
                        Pairs Best With Services:
                      </span>
                      {activeSol.relatedServices.map((svcSlug) => {
                        const svcObj = services.find((s: any) => s.slug === svcSlug);
                        if (!svcObj) return null;
                        return (
                          <Link
                            key={svcSlug}
                            href={getServiceRoute(svcSlug)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50/70 border border-primary-100 hover:bg-primary hover:text-white text-[12px] font-semibold text-primary transition-colors"
                          >
                            <span>{svcObj.name}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Row (Ready for Future Child Sub-Pages via data-future-href) */}
                <div className="mt-8 pt-5 border-t border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {(activeSol.slug === 'ai-chatbot-development' ||
                      activeSol.slug === 'whatsapp-ai-chatbot' ||
                      activeSol.slug === 'ai-voice-agents' ||
                      activeSol.slug === 'custom-ai-llm-integration' ||
                      activeSol.slug === 'ai-generated-videos' ||
                      activeSol.slug === 'ai-content-creation' ||
                      activeSol.slug === 'ai-powered-seo' ||
                      activeSol.slug === 'ai-ad-creatives' ||
                      activeSol.slug === 'ai-workflow-automation' ||
                      activeSol.slug === 'ai-agents-for-business' ||
                      activeSol.slug === 'crm-lead-automation' ||
                      activeSol.slug === 'ai-analytics-reporting') && (
                      <Link
                        href={activeSol.futurePagePath}
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-700 text-white text-[14px] font-semibold shadow-soft transition-all"
                      >
                        <span>Explore {activeSol.name}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                    <button
                      type="button"
                      data-future-href={activeSol.futurePagePath}
                      onClick={() => triggerQuoteModal(activeSol.name)}
                      className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold transition-all cursor-pointer ${
                        activeSol.slug === 'ai-chatbot-development' ||
                        activeSol.slug === 'whatsapp-ai-chatbot' ||
                        activeSol.slug === 'ai-voice-agents' ||
                        activeSol.slug === 'custom-ai-llm-integration' ||
                        activeSol.slug === 'ai-generated-videos' ||
                        activeSol.slug === 'ai-content-creation' ||
                        activeSol.slug === 'ai-powered-seo' ||
                        activeSol.slug === 'ai-ad-creatives' ||
                        activeSol.slug === 'ai-workflow-automation' ||
                        activeSol.slug === 'ai-agents-for-business' ||
                        activeSol.slug === 'crm-lead-automation' ||
                        activeSol.slug === 'ai-analytics-reporting'
                          ? 'bg-navy hover:bg-primary text-white'
                          : 'bg-primary hover:bg-primary-700 text-white shadow-soft'
                      }`}
                    >
                      <span>Get a Quote for {activeSol.name}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        triggerQuoteModal(`${activeSol.name} — Live 7-Day Proof of Concept`)
                      }
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-navy-15 hover:border-primary text-navy hover:text-primary text-[14px] font-semibold transition-colors cursor-pointer"
                    >
                      <span>Request a Live Demo</span>
                    </button>
                  </div>

                  <span className="text-[12px] font-semibold text-navy-50">
                    100% custom weights, prompts &amp; API ownership
                  </span>
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
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: INTERACTIVE AI ARCHITECTURE COMMAND CENTER (bg: #1e242e)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
        <div className="absolute -right-24 -top-20 w-[620px] h-[620px] blue-glow-strong pointer-events-none" />
        <div className="absolute -left-28 bottom-0 w-[480px] h-[480px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[13px] font-medium text-white/70 mb-7"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
            <span className="text-white font-semibold" aria-current="page">
              AI Solutions
            </span>
          </nav>

          {/* 12-Col Split Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 55% (7 cols on lg): Positioning & Key Outcomes */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>AI ENGINEERING &amp; AUTOMATION DIVISION</span>
              </div>

              <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.08] tracking-[-0.02em]">
                AI That Works for Your Business —{' '}
                <span className="text-primary">Not Just a Demo</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-2xl">
                We design, train, and deploy production-ready AI systems—from 24/7 RAG website and
                WhatsApp chatbots, sub-second AI voice agents, and custom LLM integrations to
                high-velocity AI marketing creatives and autonomous CRM workflows.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#ai-switchboard"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft transition-all"
                >
                  <span>Explore All 12 AI Solutions</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('AI Solutions & Architecture Call')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all cursor-pointer"
                >
                  <span>Book a Free AI Architecture Call</span>
                </button>
              </div>

              {/* 4 Telemetry Proof Chips */}
              <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { val: '12', label: 'Specialized AI Capabilities' },
                  { val: '3', label: 'Core AI Engines (Build, Market, Ops)' },
                  { val: '24/7', label: 'Instant Lead & Support Response' },
                  { val: '100%', label: 'Private Data & Prompt Ownership' },
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

            {/* Right 45% (5 cols on lg): Interactive AI Pipeline Architecture Console */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] bg-white/[0.05] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                {/* Console Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/85">
                      LIVE AI PIPELINE INSPECTOR
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-primary-100">
                    Switch Engine Pillar
                  </span>
                </div>

                {/* 3 Engine Pillar Tabs */}
                <div
                  className="grid grid-cols-3 gap-2 mb-5"
                  role="tablist"
                  aria-label="AI Engine Pillars"
                >
                  {HERO_ARCHITECTURE_NODES.map((node) => {
                    const isActive = activeHeroCategory === node.category;
                    return (
                      <button
                        key={node.category}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveHeroCategory(node.category)}
                        className={`py-2.5 px-2 rounded-xl text-[12px] font-extrabold transition-all cursor-pointer border text-center ${
                          isActive
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-white/[0.04] text-white/75 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {node.category}
                      </button>
                    );
                  })}
                </div>

                {/* Animated Pipeline Diagram for Selected Engine */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroNode.category}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-3.5"
                  >
                    {/* Stage 1: Your Data & Channels */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-primary-100 mb-2">
                        01. INPUT CHANNELS &amp; PRIVATE KNOWLEDGE
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {activeHeroNode.inputSources.map((src) => (
                          <div
                            key={src}
                            className="px-2.5 py-1.5 rounded-lg bg-navy/90 border border-white/10 text-[11px] font-semibold text-white/90 text-center truncate"
                            title={src}
                          >
                            {src}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stage 2: WebXCode AI Engine Core */}
                    <div className="p-4 rounded-2xl bg-primary/20 border border-primary shadow-inner relative">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary-100">
                          02. {activeHeroNode.code} • {activeHeroNode.category.toUpperCase()}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold">
                          Guardrailed
                        </span>
                      </div>
                      <div className="text-[14px] font-bold text-white leading-snug">
                        {activeHeroNode.engineDesc}
                      </div>
                    </div>

                    {/* Stage 3: Clickable 4 Solutions in this Pillar */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary-100">
                          03. CLICK ANY CAPABILITY TO INSPECT
                        </span>
                        <a
                          href={activeHeroNode.targetAnchor}
                          className="text-[11px] font-bold text-primary-100 hover:text-white inline-flex items-center gap-1"
                        >
                          <span>Jump to Pillar</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeHeroNode.featuredSlugs.map((slug) => {
                          const sol = aiSolutions.find((s) => s.slug === slug);
                          if (!sol) return null;
                          if (
                            sol.slug === 'ai-chatbot-development' ||
                            sol.slug === 'whatsapp-ai-chatbot' ||
                            sol.slug === 'ai-voice-agents' ||
                            sol.slug === 'custom-ai-llm-integration' ||
                            sol.slug === 'ai-generated-videos' ||
                            sol.slug === 'ai-content-creation' ||
                            sol.slug === 'ai-powered-seo' ||
                            sol.slug === 'ai-ad-creatives' ||
                            sol.slug === 'ai-workflow-automation' ||
                            sol.slug === 'ai-agents-for-business' ||
                            sol.slug === 'crm-lead-automation' ||
                            sol.slug === 'ai-analytics-reporting'
                          ) {
                            return (
                              <Link
                                key={sol.slug}
                                href={sol.futurePagePath}
                                className="p-2.5 rounded-xl bg-navy/85 hover:bg-primary border border-white/10 hover:border-primary text-left transition-all flex items-center justify-between gap-2 group"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <AISolutionIcon
                                    name={sol.icon}
                                    className="w-4 h-4 text-primary group-hover:text-white shrink-0"
                                  />
                                  <span className="text-[12px] font-bold text-white truncate">
                                    {sol.name}
                                  </span>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white shrink-0" />
                              </Link>
                            );
                          }
                          return (
                            <button
                              key={sol.slug}
                              type="button"
                              onClick={() => jumpToSolutionBlueprint(sol)}
                              className="p-2.5 rounded-xl bg-navy/85 hover:bg-primary border border-white/10 hover:border-primary text-left transition-all flex items-center justify-between gap-2 group cursor-pointer"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <AISolutionIcon
                                  name={sol.icon}
                                  className="w-4 h-4 text-primary group-hover:text-white shrink-0"
                                />
                                <span className="text-[12px] font-bold text-white truncate">
                                  {sol.name}
                                </span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Console Footer */}
                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[12px] text-white/70">
                  <span>Looking for Web, SEO or Brand Services?</span>
                  <Link
                    href="/services"
                    className="font-bold text-primary-100 hover:text-white inline-flex items-center gap-1"
                  >
                    <span>View 22 Core Services</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — INTERACTIVE AI BOTTLENECK DIAGNOSTIC ("WHERE IS YOUR BOTTLENECK?")
         (bg: #ffffff)
      ====================================================================== */}
      <section id="ai-diagnostic" className="py-[72px] lg:py-[112px] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              INTERACTIVE AI USE-CASE FINDER
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Not Sure Where to Start With AI?{' '}
              <span className="text-primary">Pick Your Biggest Bottleneck</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Successful AI projects start with a measurable operational bottleneck—not a buzzword.
              Select the challenge slowing your team down to see the exact AI stack and workflow we
              deploy.
            </p>
          </div>

          {/* 12-Col Diagnostic Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column (5 cols): 6 Bottleneck Buttons */}
            <div
              className="lg:col-span-5 flex flex-col justify-between gap-2.5"
              role="tablist"
              aria-label="Business Bottlenecks"
            >
              {BOTTLENECK_OPTIONS.map((item, idx) => {
                const isSelected = item.id === selectedBottleneckId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedBottleneckId(item.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-[18px] border transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? 'bg-navy text-white border-navy shadow-soft'
                        : 'bg-white text-navy border-navy-08 hover:border-primary/40 hover:bg-primary-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`w-7 h-7 rounded-lg text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'bg-primary text-white' : 'bg-primary-50 text-primary'
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
                          {item.bottleneck}
                        </div>
                        <div
                          className={`text-[13px] mt-1 ${
                            isSelected ? 'text-white/70' : 'text-navy-60'
                          }`}
                        >
                          {item.symptom}
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

            {/* Right Column (7 cols): Recommended AI Stack & Architecture Flow */}
            <div className="lg:col-span-7">
              <div className="h-full rounded-[24px] bg-primary-50/60 border border-primary-100 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBottleneck.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-primary-100">
                        <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider">
                          RECOMMENDED AI ARCHITECTURE
                        </span>
                        <span className="text-[13px] font-bold text-navy">
                          {activeBottleneck.code}
                        </span>
                      </div>

                      <h3 className="mt-5 text-[21px] sm:text-[25px] font-extrabold text-navy leading-snug">
                        Solving: <span className="text-primary">{activeBottleneck.bottleneck}</span>
                      </h3>

                      {/* 3-Step Architecture Flow Strip */}
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {activeBottleneck.architectureFlow.map((stepText, stepIdx) => (
                          <div
                            key={stepText}
                            className="p-3.5 rounded-xl bg-navy text-white flex flex-col justify-between"
                          >
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                              STAGE 0{stepIdx + 1}
                            </span>
                            <p className="text-[13px] font-semibold text-white mt-1 leading-snug">
                              {stepText}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* 3 Matched AI Solution Cards */}
                      <div className="mt-6 space-y-3.5">
                        {activeBottleneckSolutions.map((sol, idx) => (
                          <div
                            key={sol.slug}
                            className="p-4 sm:p-5 rounded-2xl bg-white border border-navy-08 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="flex items-start gap-3.5">
                              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                                <AISolutionIcon name={sol.icon} className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                                    CAPABILITY 0{idx + 1} • {sol.category}
                                  </span>
                                  {sol.badge && (
                                    <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase">
                                      {sol.badge}
                                    </span>
                                  )}
                                </div>
                                <h4 className="text-[17px] font-extrabold text-navy mt-0.5">
                                  {sol.name}
                                </h4>
                                <p className="text-[13px] text-navy-70 mt-0.5">{sol.tagline}</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => jumpToSolutionBlueprint(sol)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary-50 hover:bg-primary text-primary hover:text-white text-[12px] font-bold transition-colors shrink-0 self-start sm:self-center cursor-pointer"
                            >
                              <span>Inspect Blueprint</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Timeline + First Step Box */}
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white border border-primary-100">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
                            Typical Implementation
                          </div>
                          <div className="text-[14px] font-bold text-navy mt-1">
                            {activeBottleneck.suggestedTimeline}
                          </div>
                        </div>
                        <div className="sm:border-l sm:border-navy-08 sm:pl-4">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
                            Recommended First Step
                          </div>
                          <div className="text-[14px] font-bold text-navy mt-1">
                            {activeBottleneck.firstStep}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="mt-7 pt-5 border-t border-primary-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(
                            `AI Solution for: ${activeBottleneck.bottleneck} (${activeBottleneckSolutions
                              .map((s) => s.name)
                              .join(' + ')})`
                          )
                        }
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15px] shadow-soft transition-all cursor-pointer"
                      >
                        <span>Scope This AI Stack</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>

                      <span className="text-[13px] font-medium text-navy-70">
                        Working proof-of-concept in 7–10 days
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
         SECTION 3 — STICKY AI CATEGORY & SEARCH BAR (bg: #f0f7fd)
      ====================================================================== */}
      <div
        id="ai-switchboard"
        className="sticky top-[68px] z-30 bg-primary-50/95 backdrop-blur-md border-y border-primary-100 py-3.5 scroll-mt-16"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            {[
              { key: 'All', label: 'All AI Solutions (12)' },
              { key: 'AI Build', label: 'AI Build (4)' },
              { key: 'AI Marketing', label: 'AI Marketing (4)' },
              { key: 'AI Automation', label: 'AI Automation (4)' },
              { key: 'New & Bestsellers', label: 'New & Bestsellers (4)' },
            ].map((tab) => {
              const isActive = activeCategoryFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    setActiveCategoryFilter(
                      tab.key as 'All' | AISolutionCategory | 'New & Bestsellers'
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
                placeholder="Search e.g. WhatsApp, Voice, RAG, CRM..."
                aria-label="Search AI solutions"
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
              Showing {filteredSolutions.length} of 12
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================================
         SECTION 4 — THE 12 AI SOLUTIONS MASTER SWITCHBOARD (3 PILLAR WORKBENCHES)
         (bg: #f0f7fd)
      ====================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                COMPLETE AI CAPABILITY CATALOG
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Explore All 12 AI Solutions{' '}
                <span className="text-primary">Across 3 Engineering Pillars</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-xl leading-[1.65]">
              Click any capability on the left of each workbench to inspect its 6 engineering
              deliverables, ideal deployment scenarios, typical timeline, and connected industry &amp;
              service stacks.
            </p>
          </div>

          {filteredSolutions.length === 0 ? (
            <div className="rounded-[24px] bg-white border border-navy-08 p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-[20px] font-extrabold text-navy">
                No AI solutions matched &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-[15px] text-navy-70 mt-2 max-w-md mx-auto">
                Try clearing your search or switching back to &ldquo;All AI Solutions (12)&rdquo; to
                browse the full catalog.
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
              {/* Pillar 01 — AI Build */}
              {renderAICategoryWorkbench(
                '01',
                'pillar-ai-build',
                'AI Build',
                'Custom RAG website chatbots, official WhatsApp Business AI assistants, sub-second phone voice agents, and bespoke LLM integrations.',
                buildSolutions,
                activeBuildSolution,
                setSelectedBuildSlug
              )}

              {/* Pillar 02 — AI Marketing */}
              {renderAICategoryWorkbench(
                '02',
                'pillar-ai-marketing',
                'AI Marketing',
                'Studio-grade AI video production, human-edited brand content engines, programmatic AI SEO, and high-velocity ad creative testing.',
                marketingSolutions,
                activeMarketingSolution,
                setSelectedMarketingSlug
              )}

              {/* Pillar 03 — AI Automation */}
              {renderAICategoryWorkbench(
                '03',
                'pillar-ai-automation',
                'AI Automation',
                'Multi-step n8n/Make workflow automation, role-based digital coworkers, instant CRM speed-to-lead routing, and automated executive reporting.',
                automationSolutions,
                activeAutomationSolution,
                setSelectedAutomationSlug
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AISolutions;
