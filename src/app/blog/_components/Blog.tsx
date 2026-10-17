'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Clock,
  Calendar,
  Sparkles,
  Code2,
  TrendingUp,
  Bot,
  ShoppingBag,
  Layers,
  Globe,
  BarChart3,
  Mail,
  Check,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';

/* ============================================================================
   IMAGE ASSETS
============================================================================ */
const IMG_LAPTOP_SHOWCASE = '/images/hero_laptop_ui_showcase_1791104898778.jpg';
const IMG_SAAS_DASH = '/images/project_fintech_saas_ui_1791104929193.jpg';
const IMG_ECOM_STORE = '/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const IMG_AI_PLATFORM = '/images/project_ai_enterprise_ui_1791104952051.jpg';
const IMG_OFFICE_TEAM = '/images/why_webxcode_team_office_1791104914357.jpg';

/* ============================================================================
   NAMED EXPORTS: BLOG CATEGORIES, AUTHORS & POSTS (SINGLE SOURCE OF TRUTH)
============================================================================ */

export type BlogCategory =
  | 'Web Development'
  | 'SEO'
  | 'AEO & GEO'
  | 'AI & Automation'
  | 'Performance Marketing'
  | 'E-commerce'
  | 'UI/UX Design'
  | 'Business Growth';

export const blogCategories: BlogCategory[] = [
  'Web Development',
  'SEO',
  'AEO & GEO',
  'AI & Automation',
  'Performance Marketing',
  'E-commerce',
  'UI/UX Design',
  'Business Growth',
];

export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  initials: string;
  linkedinUrl: string;
}

export const blogAuthors: BlogAuthor[] = [
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    role: 'Principal Web Architect & Co-Founder',
    bio: 'Arjun leads full-stack architecture and cloud performance engineering at WebXCode. Over the past 10+ years, he has architected high-converting web platforms for SaaS startups and global enterprises across India and the US.',
    photo: IMG_OFFICE_TEAM,
    initials: 'AM',
    linkedinUrl: 'https://linkedin.com',
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'Head of Organic Growth, SEO & AEO',
    bio: 'Priya specializes in technical SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO). She helps B2B and D2C brands capture high-intent search visibility across Google, ChatGPT, and Perplexity.',
    photo: IMG_SAAS_DASH,
    initials: 'PS',
    linkedinUrl: 'https://linkedin.com',
  },
  {
    id: 'rohan-kapoor',
    name: 'Rohan Kapoor',
    role: 'Lead AI Solutions & Automation Engineer',
    bio: 'Rohan designs production-grade AI chatbots, WhatsApp lead agents, and voice automation workflows that integrate directly with HubSpot, Salesforce, and custom enterprise backends.',
    photo: IMG_AI_PLATFORM,
    initials: 'RK',
    linkedinUrl: 'https://linkedin.com',
  },
  {
    id: 'ananya-verma',
    name: 'Ananya Verma',
    role: 'Design Director & Conversion Strategist',
    bio: 'Ananya leads UI/UX design systems and conversion rate optimization (CRO) at WebXCode, turning complex digital products into intuitive, measurable growth engines.',
    photo: IMG_ECOM_STORE,
    initials: 'AV',
    linkedinUrl: 'https://linkedin.com',
  },
];

export type BlogContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string; id: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'image'; src: string; alt: string; caption: string }
  | { type: 'quote'; text: string; author: string }
  | {
      type: 'callout';
      variant: 'tip' | 'info' | 'warning';
      title: string;
      text: string;
    }
  | { type: 'code'; language: string; code: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'cta' };

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPostItem {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  authorId: string;
  publishedDate: string;
  publishedIso: string;
  updatedDate?: string;
  updatedIso?: string;
  readTime: string;
  coverImage: string;
  coverAlt: string;
  featured: boolean;
  editorsPick: boolean;
  popularityRank: number;
  keyTakeaways: string[];
  content: BlogContentBlock[];
  faqs: BlogFaqItem[];
}

export const blogPosts: BlogPostItem[] = [
  /* ------------------------------------------------------------------------
     POST 1 (Full sample content — all 9 block types, Featured #1, Editor's Pick #1)
  ------------------------------------------------------------------------ */
  {
    slug: 'how-much-does-a-website-cost-in-india-2026',
    title: 'How Much Does a Website Cost in India in 2026?',
    excerpt:
      'A transparent, itemized breakdown of website development pricing in India for 2026—from high-converting startup sites to custom Next.js web applications and enterprise portals.',
    category: 'Web Development',
    tags: ['Website Cost', 'Web Development', 'Next.js', 'India Pricing', 'Digital Strategy'],
    authorId: 'arjun-mehta',
    publishedDate: 'Oct 14, 2026',
    publishedIso: '2026-10-14',
    updatedDate: 'Oct 28, 2026',
    updatedIso: '2026-10-28',
    readTime: '9 min read',
    coverImage: IMG_LAPTOP_SHOWCASE,
    coverAlt: 'Modern enterprise website interface displayed on a sleek laptop',
    featured: true,
    editorsPick: true,
    popularityRank: 1,
    keyTakeaways: [
      'A professional business website in India typically ranges from ₹45,000 ($600) for a clean marketing site to ₹6,50,000+ ($8,000+) for custom Next.js platforms.',
      'Choosing between template-based CMS setups and custom headless architectures is the single biggest driver of upfront and long-term cost.',
      'Technical SEO, Core Web Vitals optimization (95+ PageSpeed), and AEO schema should be built into the core scope—never treated as an afterthought.',
      'Always evaluate agency proposals based on milestone deliverables, source-code ownership, and post-launch SLA support.',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Whether you are a funded SaaS founder in Bangalore, an expanding D2C brand in Delhi NCR, or an international business hiring an engineering partner in India, understanding website pricing in 2026 can feel overwhelming. Quotes for seemingly identical requirements often swing from ₹25,000 to over ₹10,00,000. In this practical guide, we break down what actually drives website development costs in India and how to budget for measurable ROI.',
      },
      {
        type: 'heading',
        level: 2,
        text: '2026 Website Pricing Tiers in India at a Glance',
        id: 'pricing-tiers-2026',
      },
      {
        type: 'paragraph',
        text: 'Website costs depend on design depth, tech stack, custom integrations, and performance targets. Below is a realistic comparison of standard agency pricing tiers across India in 2026:',
      },
      {
        type: 'table',
        headers: [
          'Website Tier',
          'Ideal For',
          'Recommended Tech Stack',
          'Timeline',
          'Estimated Cost (INR / USD)',
        ],
        rows: [
          [
            'Starter Business Website (5–8 Pages)',
            'Local businesses, early startups & consultants',
            'WordPress / Custom React SPA',
            '2–3 Weeks',
            '₹45,000 – ₹90,000 ($600 – $1,100)',
          ],
          [
            'Growth Corporate & B2B Website (12–25 Pages)',
            'Funded startups, B2B agencies & mid-market brands',
            'Next.js 14 + Headless CMS + Tailwind',
            '4–6 Weeks',
            '₹1,20,000 – ₹2,75,000 ($1,500 – $3,300)',
          ],
          [
            'Custom D2C E-commerce Store',
            'High-growth retail & multi-currency brands',
            'Shopify Plus / WooCommerce / Custom Next.js',
            '5–8 Weeks',
            '₹1,50,000 – ₹4,50,000 ($1,800 – $5,400)',
          ],
          [
            'Enterprise Web App / SaaS Platform',
            'Fintech, Healthcare, SaaS & AI products',
            'Next.js + Node.js + PostgreSQL + Cloud',
            '8–14 Weeks',
            '₹4,50,000 – ₹12,00,000+ ($5,500 – $15,000+)',
          ],
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Pro Budgeting Tip: Separate Build Cost from Growth Infrastructure',
        text: 'Allocate 80% of your initial budget to core UI/UX design, fast frontend engineering, and technical SEO foundations. Reserve 20% for post-launch conversion testing, analytics instrumentation, and AI lead-capture integration.',
      },
      {
        type: 'heading',
        level: 2,
        text: '5 Core Factors That Influence Your Website Quote',
        id: 'core-cost-factors',
      },
      {
        type: 'heading',
        level: 3,
        text: '1. Custom UI/UX Design vs Pre-Made Themes',
        id: 'custom-design-vs-themes',
      },
      {
        type: 'paragraph',
        text: 'Off-the-shelf templates look generic and often ship with bloated scripts that hurt mobile conversion rates. A bespoke Figma design system tailored to your buyer journey requires dedicated UX research, wireframing, and interactive prototyping—adding 20–30% to initial cost while frequently doubling lead conversion rates.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Discovery & competitor UX benchmarking across desktop and mobile viewports',
          'Conversion-focused information architecture and copywriting hierarchy',
          'Bespoke interactive components, micro-animations, and custom iconography',
          'Strict Core Web Vitals engineering (LCP < 1.8s, CLS < 0.02, INP < 100ms)',
          'Automated schema.org JSON-LD markup for Google Search and AI Answer Engines',
        ],
      },
      {
        type: 'image',
        src: IMG_SAAS_DASH,
        alt: 'High-performance SaaS web architecture and analytics dashboard designed by WebXCode',
        caption:
          'Figure 1: Custom design systems and component libraries reduce long-term maintenance costs while boosting conversion velocity.',
      },
      {
        type: 'quote',
        text: 'A cheap website is the most expensive marketing mistake a growing company can make. When your site loads in 0.9 seconds and communicates instant authority, every paid click and organic visitor converts at a higher multiple.',
        author: 'Arjun Mehta, Principal Web Architect at WebXCode',
      },
      {
        type: 'cta',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Technical SEO & Schema Setup Included in Modern Builds',
        id: 'technical-seo-schema-setup',
      },
      {
        type: 'paragraph',
        text: 'In 2026, every production website we ship includes structured metadata and JSON-LD schema out of the box so search engines and AI assistants can parse your services accurately:',
      },
      {
        type: 'code',
        language: 'typescript',
        code: `// Example Next.js 14 Metadata & JSON-LD Configuration
export const siteMetadata = {
  title: 'Enterprise Web & AI Solutions | WebXCode',
  coreWebVitalsTarget: { lcpMs: 1200, cls: 0.01, lighthouseScore: 98 },
  schemaOrg: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'WebXCode',
    priceRange: '$$',
    areaServed: ['IN', 'US', 'GB', 'AE'],
  },
};`,
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Watch Out for Hidden Agency Costs',
        text: 'Before signing any web development contract, verify in writing that you receive 100% full ownership of the Git repository, Figma design files, domain DNS, and hosting accounts upon final milestone completion.',
      },
    ],
    faqs: [
      {
        question: 'How much does annual website maintenance cost in India?',
        answer:
          'Standard annual maintenance (hosting, SSL, security patches, uptime monitoring, and minor content updates) typically costs 12% to 18% of the initial development budget per year, or roughly ₹15,000 to ₹60,000/year depending on traffic volume.',
      },
      {
        question: 'Do you charge in INR for Indian clients and USD for international clients?',
        answer:
          'Yes. We provide GST-compliant INR invoicing for Indian businesses and USD/GBP/EUR wire or Stripe invoicing for clients in the US, UK, UAE, and globally, with milestone-based payment schedules.',
      },
      {
        question: 'Can we start with a core 8-page website and expand later?',
        answer:
          'Absolutely. We architect websites modularly using reusable component systems so you can launch your high-impact core pages in 3–4 weeks and add new landing pages, calculators, or AI chatbots anytime.',
      },
    ],
  },

  /* ------------------------------------------------------------------------
     POST 2 (Full sample content — all 9 block types, Featured #2, Editor's Pick #2)
  ------------------------------------------------------------------------ */
  {
    slug: 'what-is-aeo-and-why-it-matters-for-your-website',
    title: 'What Is AEO and Why It Matters for Your Website',
    excerpt:
      'Answer Engine Optimization (AEO) is transforming how buyers discover brands in ChatGPT, Google AI Overviews, and Perplexity. Learn how to structure your website to win AI citations.',
    category: 'AEO & GEO',
    tags: ['AEO', 'GEO', 'AI Search', 'SEO Strategy', 'Schema Markup'],
    authorId: 'priya-sharma',
    publishedDate: 'Oct 09, 2026',
    publishedIso: '2026-10-09',
    updatedDate: 'Oct 25, 2026',
    updatedIso: '2026-10-25',
    readTime: '8 min read',
    coverImage: IMG_AI_PLATFORM,
    coverAlt: 'AI search optimization and Answer Engine Optimization analytics interface',
    featured: true,
    editorsPick: true,
    popularityRank: 2,
    keyTakeaways: [
      'Over 42% of B2B software and service buyers now consult AI answer engines (ChatGPT, Perplexity, Google AI Overviews) before clicking traditional search results.',
      'AEO focuses on direct, concise answer blocks, entity-rich schema.org graphs, and verifiable first-party data tables.',
      'Traditional SEO and AEO work together: strong domain authority gets you indexed, while structured answer formatting gets you cited.',
      'Adding FAQPage, HowTo, Organization, and Service JSON-LD schema increases AI citation likelihood by up to 3.1×.',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'For two decades, digital visibility meant ranking in the top three blue links on Google. Today, your buyers are asking complex, conversational questions directly inside ChatGPT Search, Perplexity, Claude, and Google AI Overviews—such as "Which web development agency in India builds custom Next.js SaaS platforms?" If your website is not architected for Answer Engine Optimization (AEO), your brand remains invisible in the exact moment high-intent decisions are made.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Traditional SEO vs AEO vs GEO: What Is the Difference?',
        id: 'seo-vs-aeo-vs-geo',
      },
      {
        type: 'paragraph',
        text: 'While traditional SEO optimizes for keyword rankings and click-through rates, AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) optimize your content so Large Language Models (LLMs) and retrieval-augmented search engines select, quote, and cite your brand as the authoritative source.',
      },
      {
        type: 'table',
        headers: ['Dimension', 'Traditional SEO', 'Answer Engine Optimization (AEO)', 'Generative Engine Optimization (GEO)'],
        rows: [
          [
            'Primary Target',
            'Google & Bing SERP Blue Links',
            'Featured Snippets, Voice & AI Answer Boxes',
            'ChatGPT, Perplexity, Gemini & Copilot Citations',
          ],
          [
            'Content Structure',
            'Long-form keyword-targeted guides',
            'Direct 45–60 word answer blocks + Q&A pairs',
            'Fact-dense comparisons, original stats & entity relationships',
          ],
          [
            'Technical Signal',
            'Backlinks, Core Web Vitals, Meta Tags',
            'FAQPage, Speakable & HowTo JSON-LD Schema',
            'Clean semantic HTML, llms.txt & high entity authority',
          ],
          [
            'Key Metric',
            'Organic Sessions & Keyword Position',
            'Zero-Click Impression Share & Answer Ownership',
            'Brand Citation Frequency & AI Referral Conversions',
          ],
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Did You Know? AI Referral Traffic Converts 2.4× Higher',
        text: 'Across WebXCode client analytics in 2026, visitors arriving via citations in ChatGPT and Perplexity convert into qualified sales calls at 2.4× the rate of standard organic search traffic because the AI has already pre-qualified the recommendation.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The 5-Step Framework to Make Your Website AEO-Ready',
        id: 'five-step-aeo-framework',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Structure Every Page Around Real Buyer Questions',
        id: 'buyer-question-hierarchy',
      },
      {
        type: 'paragraph',
        text: 'LLMs retrieve passages that directly answer specific prompts. Start major H2 sections with a clear question or declarative heading, followed immediately by a concise 50-word summary paragraph before diving into deeper technical nuances.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Lead every service and blog page with a structured Key Takeaways summary box',
          'Use comparison tables with clear column headers so AI crawlers can extract pricing and feature matrices',
          'Implement nested JSON-LD schema linking your Organization, Services, Authors, and FAQs',
          'Publish verifiable case study metrics (+240% traffic, 98 PageSpeed) rather than vague adjectives',
          'Ensure server-side rendering (SSR/SSG) so AI crawlers never hit empty client-side JavaScript shells',
        ],
      },
      {
        type: 'image',
        src: IMG_LAPTOP_SHOWCASE,
        alt: 'Structured semantic HTML and JSON-LD entity graph visualization',
        caption:
          'Figure 1: How Answer Engines parse semantic headings, comparison tables, and JSON-LD schema to synthesize brand recommendations.',
      },
      {
        type: 'quote',
        text: 'In the era of AI search, clarity beats cleverness. Websites that publish transparent pricing tables, structured FAQs, and clean semantic HTML win the citation every single time.',
        author: 'Priya Sharma, Head of Organic Growth, SEO & AEO at WebXCode',
      },
      {
        type: 'code',
        language: 'json',
        code: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is Answer Engine Optimization (AEO)?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "AEO is the practice of structuring website content, semantic HTML, and JSON-LD schema so AI search engines like ChatGPT, Perplexity, and Google AI Overviews directly cite your brand."
    }
  }]
}`,
      },
      {
        type: 'cta',
      },
    ],
    faqs: [
      {
        question: 'Does AEO replace traditional Google SEO?',
        answer:
          'No—AEO builds on top of strong technical SEO. Search engines and AI assistants still rely on crawlable architecture, fast page speed, and domain authority to discover and trust your pages.',
      },
      {
        question: 'How long does it take to see results from AEO & GEO optimization?',
        answer:
          'Most websites begin appearing in Perplexity and Google AI Overviews within 4 to 8 weeks after restructuring key landing pages, adding comparison tables, and deploying comprehensive JSON-LD entity schema.',
      },
    ],
  },

  /* ------------------------------------------------------------------------
     POST 3 (Featured #3, Editor's Pick #3)
  ------------------------------------------------------------------------ */
  {
    slug: 'nextjs-vs-wordpress-which-is-right-for-your-business',
    title: 'Next.js vs WordPress: Which Is Right for Your Business?',
    excerpt:
      'An honest architectural comparison of Next.js 14 and WordPress across speed, security, SEO scalability, and total cost of ownership for modern businesses.',
    category: 'Web Development',
    tags: ['Next.js', 'WordPress', 'Web Architecture', 'Core Web Vitals', 'Headless CMS'],
    authorId: 'arjun-mehta',
    publishedDate: 'Oct 03, 2026',
    publishedIso: '2026-10-03',
    readTime: '7 min read',
    coverImage: IMG_SAAS_DASH,
    coverAlt: 'Next.js vs WordPress performance benchmark comparison on desktop screen',
    featured: true,
    editorsPick: true,
    popularityRank: 3,
    keyTakeaways: [
      'Next.js delivers near-instant page loads (95–100 Lighthouse scores) and enterprise-grade security with zero plugin vulnerabilities.',
      'WordPress remains a cost-effective choice for simple content sites with tight initial budgets under ₹75,000.',
      'For high-growth B2B, SaaS, and custom digital products, Next.js paired with a headless CMS lowers 3-year maintenance costs by 40%.',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Choosing between WordPress and Next.js is one of the most consequential technical decisions a marketing or product leader will make. While WordPress powers a large portion of the legacy web, modern growth-focused companies are rapidly migrating to Next.js for sub-second speed, rock-solid security, and limitless UI flexibility.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Performance, Security & Scalability Comparison',
        id: 'performance-security-comparison',
      },
      {
        type: 'table',
        headers: ['Criteria', 'Next.js (Modern React Stack)', 'Traditional WordPress'],
        rows: [
          ['Mobile PageSpeed Score', '95 – 100 Out of the Box', '60 – 82 (Plugin Dependent)'],
          ['Security Attack Surface', 'Minimal (Static/Edge Rendered)', 'High (Requires Constant Plugin Patching)'],
          ['Custom UI & Interactive Tools', 'Unlimited Native React Components', 'Constrained by Page Builders'],
          ['Ideal Business Stage', 'Scaling Startups, B2B & Enterprise', 'Small Blogs & Basic Brochure Sites'],
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Best of Both Worlds: Headless CMS + Next.js Frontend',
        text: 'Your marketing team can still enjoy an intuitive visual editor (like Sanity, Strapi, or Headless WordPress) while your visitors experience a blazing-fast Next.js frontend.',
      },
      {
        type: 'cta',
      },
    ],
    faqs: [
      {
        question: 'Can we migrate our existing WordPress site to Next.js without losing SEO rankings?',
        answer:
          'Yes. By preserving URL slugs, implementing 1:1 301 redirect maps, and upgrading Core Web Vitals, our clients typically see a 25%–60% organic traffic lift within 60 days of migrating from WordPress to Next.js.',
      },
    ],
  },

  /* ------------------------------------------------------------------------
     POST 4 (Featured #4 for 1+3 Magazine Split, Editor's Pick #4)
  ------------------------------------------------------------------------ */
  {
    slug: 'how-an-ai-chatbot-can-capture-leads-24-7',
    title: 'How an AI Chatbot Can Capture Leads 24/7',
    excerpt:
      'Discover how custom-trained AI chatbots and WhatsApp agents qualify visitors, answer pricing questions from your knowledge base, and book discovery calls while your team sleeps.',
    category: 'AI & Automation',
    tags: ['AI Chatbots', 'WhatsApp AI', 'Lead Generation', 'CRM Automation'],
    authorId: 'rohan-kapoor',
    publishedDate: 'Sep 27, 2026',
    publishedIso: '2026-09-27',
    readTime: '6 min read',
    coverImage: IMG_AI_PLATFORM,
    coverAlt: 'Custom AI chatbot qualifying B2B leads and booking calendar meetings',
    featured: true,
    editorsPick: true,
    popularityRank: 4,
    keyTakeaways: [
      'Responding to a web lead within 60 seconds increases qualification rates by 391% compared to waiting 30 minutes.',
      'Modern RAG-powered AI agents answer complex product questions using your actual PDFs, case studies, and pricing rules.',
      'Seamless WhatsApp and CRM handoff ensures high-intent buyers can book calendar slots in under 45 seconds.',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Static contact forms are where high-intent B2B and consumer leads go cold. When a prospect visits your pricing or service page at 11:00 PM, they want immediate, accurate answers—not a "We will get back to you in 48 hours" auto-responder.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Rule-Based Bots vs Custom LLM Lead Agents',
        id: 'rule-based-vs-llm-agents',
      },
      {
        type: 'paragraph',
        text: 'Unlike rigid decision-tree widgets that frustrate users, a customRetrieval-Augmented Generation (RAG) AI chatbot understands context, recommends the right service tier, captures budget and timeline details, and pushes qualified leads straight into HubSpot, Zoho, or WhatsApp.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Ingest your website pages, service decks, and FAQs into a secure vector knowledge base',
          'Configure guardrails so the AI never hallucinates unsupported discounts or promises',
          'Connect real-time calendar booking and WhatsApp Business API notifications',
        ],
      },
      {
        type: 'cta',
      },
    ],
    faqs: [
      {
        question: 'Can the AI chatbot hand over the conversation to a human sales rep?',
        answer:
          'Yes. Whenever a prospect asks for a live specialist or meets your enterprise budget threshold, the agent triggers an instant Slack or WhatsApp alert for seamless human takeover.',
      },
    ],
  },

  /* ------------------------------------------------------------------------
     POST 5 (Editor's Pick #5)
  ------------------------------------------------------------------------ */
  {
    slug: 'geo-explained-how-to-show-up-in-ai-search-answers',
    title: 'GEO Explained: How to Show Up in AI Search Answers',
    excerpt:
      'Generative Engine Optimization (GEO) is the new playbook for earning brand recommendations inside ChatGPT, Claude, and Google Gemini responses.',
    category: 'AEO & GEO',
    tags: ['GEO', 'AEO', 'AI Search', 'Brand Authority', 'Content Strategy'],
    authorId: 'priya-sharma',
    publishedDate: 'Sep 21, 2026',
    publishedIso: '2026-09-21',
    readTime: '7 min read',
    coverImage: IMG_OFFICE_TEAM,
    coverAlt: 'SEO and GEO strategists analyzing AI citation share across generative search engines',
    featured: false,
    editorsPick: true,
    popularityRank: 5,
    keyTakeaways: [
      'Generative engines synthesize answers from multiple corroborated sources—making entity consistency and original data essential.',
      'Pages with clear statistics, expert quotations, and structured comparison tables see up to 40% higher visibility in generative responses.',
      'Building topical authority clusters around core service pillars signals deep expertise to LLM retrieval pipelines.',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Generative Engine Optimization (GEO) goes beyond single-question snippets to ensure your brand is recommended when users ask multi-step advisory prompts like "Compare the top web development and AI agencies for a healthcare startup."',
      },
      {
        type: 'heading',
        level: 2,
        text: '3 Signals That Generative Engines Prioritize',
        id: 'three-geo-signals',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Verifiable Statistics & Case Studies: Specific metrics (+240% organic growth, 98% retention) give LLMs concrete facts to cite.',
          'Semantic Entity Clarity: Consistent brand descriptions across your website, schema markup, and industry directories.',
          'Authoritative Depth: Comprehensive topic clusters covering pricing, comparisons, architecture, and implementation.',
        ],
      },
      {
        type: 'cta',
      },
    ],
    faqs: [
      {
        question: 'How do we measure GEO performance?',
        answer:
          'We track prompt-level brand citation share across major LLMs alongside direct AI referral sessions in GA4 and self-reported "How did you hear about us?" attribution on lead forms.',
      },
    ],
  },

  /* ------------------------------------------------------------------------
     POST 6
  ------------------------------------------------------------------------ */
  {
    slug: '10-website-speed-fixes-that-improve-conversions',
    title: '10 Website Speed Fixes That Improve Conversions',
    excerpt:
      'Every 100ms improvement in mobile load speed lifts conversion rates by up to 7%. Here are 10 engineering fixes our team uses to hit 95+ PageSpeed scores.',
    category: 'SEO',
    tags: ['Website Speed', 'Core Web Vitals', 'SEO', 'Conversion Optimization'],
    authorId: 'arjun-mehta',
    publishedDate: 'Sep 14, 2026',
    publishedIso: '2026-09-14',
    readTime: '6 min read',
    coverImage: IMG_LAPTOP_SHOWCASE,
    coverAlt: 'Lighthouse 99 performance score audit on high-speed business website',
    featured: false,
    editorsPick: false,
    popularityRank: 6,
    keyTakeaways: [
      'Largest Contentful Paint (LCP) under 1.8 seconds is the strongest technical predictor of low mobile bounce rates.',
      'Replacing heavy third-party tracking scripts and unoptimized PNGs with AVIF/WebP assets immediately cuts payload weight by 60%.',
      'Edge caching and server-side rendering eliminate layout shifts (CLS) and keep interaction latency near zero.',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Slow websites silently drain your marketing budget. When a prospective client taps your link on a 4G/5G mobile connection, waiting 4 seconds for a hero banner to render causes over half of visitors to abandon the page.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'High-Impact Core Web Vitals Checklist',
        id: 'core-web-vitals-checklist',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Serve next-gen AVIF and WebP images with explicit width/height attributes and priority preloading on the hero visual.',
          'Self-host variable WOFF2 fonts with font-display: swap to eliminate render-blocking external font requests.',
          'Defer non-critical third-party analytics and chat widgets until after first user interaction.',
          'Use route-level code splitting and static edge caching via CDN.',
        ],
      },
      {
        type: 'cta',
      },
    ],
    faqs: [],
  },

  /* ------------------------------------------------------------------------
     POST 7
  ------------------------------------------------------------------------ */
  {
    slug: 'google-ads-vs-seo-where-should-you-spend-first',
    title: 'Google Ads vs SEO: Where Should You Spend First?',
    excerpt:
      'Should you invest your growth budget in immediate high-intent Google Ads clicks or compounding organic SEO & AEO authority? Use our decision matrix.',
    category: 'Performance Marketing',
    tags: ['Google Ads', 'SEO', 'Performance Marketing', 'ROI', 'Lead Generation'],
    authorId: 'priya-sharma',
    publishedDate: 'Sep 05, 2026',
    publishedIso: '2026-09-05',
    readTime: '7 min read',
    coverImage: IMG_SAAS_DASH,
    coverAlt: 'Google Ads ROAS and organic SEO growth comparison chart',
    featured: false,
    editorsPick: false,
    popularityRank: 7,
    keyTakeaways: [
      'Google Ads buys immediate top-of-page visibility and validates which keywords and landing pages actually convert into revenue.',
      'SEO and AEO build a compounding asset that lowers your blended Customer Acquisition Cost (CAC) by 50–70% over 6–12 months.',
      'The highest-performing brands run a hybrid sprint: use Google Ads for immediate pipeline while SEO pages mature.',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Founders and CMOs frequently ask whether to allocate their initial digital marketing budget to Google Search Ads or organic SEO. The right answer depends on your runway, sales cycle length, and landing page conversion readiness.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The 90-Day Hybrid Growth Playbook',
        id: 'hybrid-growth-playbook',
      },
      {
        type: 'paragraph',
        text: 'Before spending a single rupee or dollar on paid traffic, ensure your landing page converts at 4%+. Launch targeted high-intent search campaigns to generate immediate leads, then reinvest those winning search query insights into permanent SEO and AEO pillar pages.',
      },
      {
        type: 'cta',
      },
    ],
    faqs: [],
  },

  /* ------------------------------------------------------------------------
     POST 8
  ------------------------------------------------------------------------ */
  {
    slug: 'shopify-vs-woocommerce-for-indian-businesses',
    title: 'Shopify vs WooCommerce for Indian Businesses',
    excerpt:
      'Comparing payment gateways (Razorpay, Cashfree, UPI), shipping automation, checkout speed, and scaling costs between Shopify and WooCommerce in India.',
    category: 'E-commerce',
    tags: ['Shopify', 'WooCommerce', 'E-commerce', 'D2C India', 'Checkout Conversion'],
    authorId: 'arjun-mehta',
    publishedDate: 'Aug 26, 2026',
    publishedIso: '2026-08-26',
    readTime: '8 min read',
    coverImage: IMG_ECOM_STORE,
    coverAlt: 'Luxury D2C e-commerce storefront and mobile UPI checkout flow',
    featured: false,
    editorsPick: false,
    popularityRank: 8,
    keyTakeaways: [
      'Shopify excels in reliability, 1-click checkout speed, and zero server maintenance during flash sales.',
      'WooCommerce offers complete database control and zero platform transaction fees for custom catalog workflows.',
      'For Indian D2C brands, native UPI intent flows, COD risk scoring, and Shiprocket/Delhivery sync are critical for profitability.',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'India’s D2C e-commerce landscape has unique engineering requirements: mobile-first shoppers, high UPI adoption, Cash-on-Delivery (COD) verification, and pan-India courier aggregation.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'When to Choose Shopify vs Custom WooCommerce',
        id: 'shopify-vs-woocommerce-decision',
      },
      {
        type: 'paragraph',
        text: 'If your primary focus is rapid D2C scaling, influencer campaign spikes, and effortless inventory management, Shopify is hard to beat. If you require complex B2B wholesale pricing tiers, custom product configurators, or deep ERP integration without recurring app fees, a performance-tuned WooCommerce or headless commerce build is ideal.',
      },
      {
        type: 'cta',
      },
    ],
    faqs: [],
  },

  /* ------------------------------------------------------------------------
     POST 9
  ------------------------------------------------------------------------ */
  {
    slug: 'ui-ux-mistakes-that-are-costing-you-customers',
    title: 'UI/UX Mistakes That Are Costing You Customers',
    excerpt:
      'From vague hero headlines and hidden pricing to friction-heavy mobile forms—fix these 7 common UI/UX mistakes to double your website’s lead conversion rate.',
    category: 'UI/UX Design',
    tags: ['UI/UX Design', 'CRO', 'Website Redesign', 'Business Growth'],
    authorId: 'ananya-verma',
    publishedDate: 'Aug 18, 2026',
    publishedIso: '2026-08-18',
    readTime: '5 min read',
    coverImage: IMG_OFFICE_TEAM,
    coverAlt: 'UI/UX designers reviewing conversion heatmaps and mobile wireframes',
    featured: false,
    editorsPick: false,
    popularityRank: 9,
    keyTakeaways: [
      'Visitors form a trust impression in 0.05 seconds—cluttered layouts and low-contrast typography immediately erode credibility.',
      'Replacing generic "Learn More" buttons with specific value-driven CTAs increases click-through rates by 34%.',
      'Reducing quote form fields from 9 inputs to 4 essential fields consistently lifts form completion rates by over 50%.',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Great UI/UX design is not about decorative animations that slow down the browser—it is about visual clarity, psychological trust, and removing every ounce of friction between a visitor’s problem and your solution.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The 5-Second Hero Section Clarity Test',
        id: 'five-second-clarity-test',
      },
      {
        type: 'paragraph',
        text: 'Within five seconds of landing on your homepage, a first-time visitor must immediately understand: (1) What you do, (2) Who you help, (3) Proof that you deliver results, and (4) Exactly what happens when they click your primary CTA button.',
      },
      {
        type: 'cta',
      },
    ],
    faqs: [],
  },
];

/* Helper to look up author by ID */
export function getAuthorById(authorId: string): BlogAuthor {
  return blogAuthors.find((a) => a.id === authorId) || blogAuthors[0];
}

/* Topic metadata for Section 5 (Explore by Topic 4x2 Grid) */
const TOPIC_TILES: {
  category: BlogCategory;
  icon: React.FC<{ className?: string }>;
  shortDesc: string;
}[] = [
  {
    category: 'Web Development',
    icon: Code2,
    shortDesc: 'Next.js, React, speed & scalable architecture',
  },
  {
    category: 'SEO',
    icon: TrendingUp,
    shortDesc: 'Technical SEO, Core Web Vitals & organic growth',
  },
  {
    category: 'AEO & GEO',
    icon: Sparkles,
    shortDesc: 'Rank in ChatGPT, Perplexity & AI Overviews',
  },
  {
    category: 'AI & Automation',
    icon: Bot,
    shortDesc: 'AI chatbots, voice agents & CRM workflows',
  },
  {
    category: 'Performance Marketing',
    icon: BarChart3,
    shortDesc: 'High-ROAS Google Ads & landing page funnels',
  },
  {
    category: 'E-commerce',
    icon: ShoppingBag,
    shortDesc: 'Shopify, WooCommerce & D2C checkout scale',
  },
  {
    category: 'UI/UX Design',
    icon: Layers,
    shortDesc: 'Conversion-first design systems & UX audits',
  },
  {
    category: 'Business Growth',
    icon: Globe,
    shortDesc: 'Digital roadmaps, pricing & agency playbooks',
  },
];

const POPULAR_TOPIC_CHIPS: {
  label: string;
  category?: BlogCategory;
  search?: string;
}[] = [
  { label: 'AI Chatbots', category: 'AI & Automation', search: 'AI Chatbot' },
  { label: 'SEO', category: 'SEO' },
  { label: 'Next.js', category: 'Web Development', search: 'Next.js' },
  { label: 'Website Cost', category: 'Web Development', search: 'Website Cost' },
  { label: 'AEO', category: 'AEO & GEO' },
];

/* ============================================================================
   MAIN BLOG LISTING COMPONENT (/blog)
============================================================================ */

interface BlogProps {
  onOpenQuoteModal?: (service?: string) => void;
}

const POSTS_PER_PAGE = 6;

const Blog: React.FC<BlogProps> = ({ onOpenQuoteModal: propOpenQuoteModal }) => {
  const quoteModalCtx = useQuoteModal();
  const onOpenQuoteModal = (service?: string) => {
    if (propOpenQuoteModal) propOpenQuoteModal(service);
    else quoteModalCtx.openQuoteModal(service);
  };
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategoryParam = searchParams.get('category');
  const initialSearchParam = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>(() => {
    if (
      initialCategoryParam &&
      blogCategories.includes(initialCategoryParam as BlogCategory)
    ) {
      return initialCategoryParam as BlogCategory;
    }
    return 'All';
  });

  const [searchQuery, setSearchQuery] = useState(initialSearchParam);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [currentPage, setCurrentPage] = useState(1);

  // Newsletter states (Sidebar mini card & Section 6 wide banner)
  const [sidebarEmail, setSidebarEmail] = useState('');
  const [sidebarSubscribed, setSidebarSubscribed] = useState(false);
  const [bannerEmail, setBannerEmail] = useState('');
  const [bannerSubscribed, setBannerSubscribed] = useState(false);

  // Editor's Picks carousel ref
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Sync URL query parameter if navigated from an article category pill
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam && blogCategories.includes(catParam as BlogCategory)) {
      setSelectedCategory(catParam as BlogCategory);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // SEO Meta & Document Title
  useEffect(() => {
    document.title = 'Blog | WebXCode — Web Development, SEO & AI Insights';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Practical guides on web development, technical SEO, AEO & GEO, AI chatbots, and digital growth — written by the senior engineering and growth team at WebXCode.'
      );
    }
  }, []);

  const scrollToArticles = () => {
    const el = document.getElementById('articles');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategorySelect = (cat: 'All' | BlogCategory, shouldScroll = false) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.replace(`/blog?${params.toString()}`, { scroll: false });
    if (shouldScroll) {
      scrollToArticles();
    }
  };

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    scrollToArticles();
  };

  const handlePopularTopicClick = (chip: {
    label: string;
    category?: BlogCategory;
    search?: string;
  }) => {
    if (chip.category) {
      setSelectedCategory(chip.category);
    } else {
      setSelectedCategory('All');
    }
    setSearchQuery(chip.search || '');
    setCurrentPage(1);
    scrollToArticles();
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('latest');
    setCurrentPage(1);
    router.replace('/blog', { scroll: false });
  };

  // Filtered + Sorted Posts
  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesCat =
        selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat;
      const matchesText =
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesText;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return a.popularityRank - b.popularityRank;
      }
      return b.publishedIso.localeCompare(a.publishedIso);
    });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  // Featured stories: 1 primary + 3 compact horizontal
  const featuredStories = blogPosts.filter((p) => p.featured);
  const primaryFeatured = featuredStories[0] || blogPosts[0];
  const secondaryFeatured = featuredStories.slice(1, 4);

  // Editor's picks (5 numbered items)
  const editorsPickPosts = blogPosts.filter((p) => p.editorsPick).slice(0, 5);

  // Popular posts for sidebar (top 4)
  const popularSidebarPosts = [...blogPosts]
    .sort((a, b) => a.popularityRank - b.popularityRank)
    .slice(0, 4);

  // Category counts (including growth/strategy fallback display)
  const getCategoryCount = (cat: BlogCategory) =>
    blogPosts.filter((p) => p.category === cat || (cat === 'Business Growth' && p.tags.includes('Business Growth'))).length;

  const scrollCarousel = (dir: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const scrollAmount = 360;
    carouselRef.current.scrollBy({
      left: dir === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleSidebarNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sidebarEmail.trim()) return;
    // TODO: Connect newsletter subscription endpoint (e.g., Resend / ConvertKit / Mailchimp API)
    setSidebarSubscribed(true);
    setSidebarEmail('');
  };

  const handleBannerNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerEmail.trim()) return;
    // TODO: Connect newsletter subscription endpoint (e.g., Resend / ConvertKit / Mailchimp API)
    setBannerSubscribed(true);
    setBannerEmail('');
  };

  // JSON-LD Blog + ItemList schema
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'WebXCode Blog — Web Development, SEO & AI Insights',
    description:
      'Practical guides on web development, SEO, AEO & GEO, AI chatbots, and digital growth written by the WebXCode team.',
    url: 'https://webxcode.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'WebXCode',
      url: 'https://webxcode.com',
    },
    blogPost: blogPosts.map((post, idx) => ({
      '@type': 'BlogPosting',
      position: idx + 1,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedIso,
      dateModified: post.updatedIso || post.publishedIso,
      url: `https://webxcode.com/blog/${post.slug}`,
      author: {
        '@type': 'Person',
        name: getAuthorById(post.authorId).name,
      },
    })),
  };

  return (
    <main className="flex-1 bg-white text-navy">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* ====================================================================
          1. HERO WITH SEARCH (navy — centered layout)
      ==================================================================== */}
      <section className="relative bg-navy text-white pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Blue radial glow & faint dotted texture */}
        <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] blue-glow-strong pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
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
              Blog
            </span>
          </nav>

          {/* Section Label on Dark */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.14em] mb-5">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span>INSIGHTS & RESOURCES</span>
          </span>

          {/* H1 */}
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold leading-[1.08] tracking-tight max-w-3xl mb-5">
            Ideas to Help You{' '}
            <span className="text-primary">Build &amp; Grow</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[17px] sm:text-[19px] text-white/75 leading-relaxed max-w-2xl mb-9">
            Practical guides on web development, SEO, AI and digital growth — written by
            the WebXCode team.
          </p>

          {/* Large Pill Search Bar (~640px wide) */}
          <form
            onSubmit={handleHeroSearchSubmit}
            role="search"
            aria-label="Search blog articles"
            className="w-full max-w-[640px] bg-white rounded-full p-2 pl-5 shadow-2xl flex items-center gap-2 border border-white/20 focus-within:ring-4 focus-within:ring-primary/35 transition-all"
          >
            <Search className="w-5 h-5 text-primary shrink-0" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search articles on Next.js, SEO, AEO, AI chatbots, website cost..."
              aria-label="Search articles"
              className="w-full bg-transparent text-navy placeholder:text-navy-50 text-[15px] font-medium focus:outline-none py-2"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                aria-label="Clear search query"
                className="p-1.5 rounded-full text-navy-50 hover:text-navy hover:bg-primary-50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-colors shrink-0 cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Popular Topic Chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-[13px] font-semibold text-white/65 mr-1">
              Popular topics:
            </span>
            {POPULAR_TOPIC_CHIPS.map((chip) => {
              const isChipActive =
                (chip.search &&
                  searchQuery.toLowerCase() === chip.search.toLowerCase()) ||
                (!chip.search &&
                  chip.category &&
                  selectedCategory === chip.category);
              return (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => handlePopularTopicClick(chip)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer border ${
                    isChipActive
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white/10 text-white/85 border-white/15 hover:bg-primary/30 hover:border-primary/50 hover:text-white'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. FEATURED STORIES — EDITORIAL MAGAZINE SPLIT (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[104px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                FEATURED
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Must-Read <span className="text-primary">Stories</span>
              </h2>
            </div>
            <p className="text-[15px] text-navy-70 max-w-md">
              Handpicked deep-dives on high-converting web engineering, AI automation, and
              modern search visibility.
            </p>
          </div>

          {/* 60 / 40 Magazine Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 60% (7 cols): 1 Large Featured Story */}
            {primaryFeatured && (
              <Link
                href={`/blog/${primaryFeatured.slug}`}
                className="lg:col-span-7 group bg-white rounded-[20px] border border-navy-08 shadow-soft hover:shadow-soft-hover hover:border-primary-100 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-navy">
                    <Image
                      src={primaryFeatured.coverImage}
                      alt={primaryFeatured.coverAlt}
                      loading="lazy"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-primary text-white text-[12px] font-bold uppercase tracking-wider shadow-md">
                      {primaryFeatured.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3 className="text-[24px] sm:text-[30px] lg:text-[32px] font-extrabold text-navy group-hover:text-primary transition-colors leading-[1.2] mb-3.5">
                      {primaryFeatured.title}
                    </h3>
                    <p className="text-[16px] text-navy-70 leading-relaxed line-clamp-3">
                      {primaryFeatured.excerpt}
                    </p>
                  </div>
                </div>

                {/* Author + Meta Footer */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-navy-08/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white font-bold text-[13px] flex items-center justify-center shrink-0">
                      {getAuthorById(primaryFeatured.authorId).initials}
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-navy">
                        {getAuthorById(primaryFeatured.authorId).name}
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-navy-50 font-medium">
                        <time dateTime={primaryFeatured.publishedIso}>
                          {primaryFeatured.publishedDate}
                        </time>
                        <span aria-hidden="true">·</span>
                        <span>{primaryFeatured.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            )}

            {/* Right 40% (5 cols): 3 Compact Horizontal Posts Stacked */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-5">
              {secondaryFeatured.map((post) => {
                const author = getAuthorById(post.authorId);
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-[20px] p-4 sm:p-5 border border-navy-08 shadow-soft hover:shadow-soft-hover hover:border-primary-100 transition-all duration-300 flex items-center gap-4 sm:gap-5 flex-1"
                  >
                    <div className="w-28 sm:w-36 aspect-[4/3] rounded-[14px] overflow-hidden bg-navy shrink-0 relative">
                      <Image
                        src={post.coverImage}
                        alt={post.coverAlt}
                        loading="lazy"
                        fill
                        sizes="144px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary text-[11px] font-bold uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-[12px] text-navy-50 font-medium">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-[16px] sm:text-[18px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[12px] text-navy-50 font-medium">
                        <span>{author.name}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={post.publishedIso}>{post.publishedDate}</time>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. ALL ARTICLES — FILTERS + 70/30 GRID + SIDEBAR (primary-50, #articles)
      ==================================================================== */}
      <section id="articles" className="bg-primary-50 py-[72px] lg:py-[104px]">
        {/* Sticky Category Filter Bar */}
        <div className="sticky top-[68px] lg:top-[72px] z-30 bg-white/95 backdrop-blur-md border-y border-navy-08 shadow-sm mb-10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Horizontally Scrollable Category Pills */}
            <div
              role="toolbar"
              aria-label="Filter articles by category"
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0"
            >
              {(['All', ...blogCategories] as const).map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleCategorySelect(cat)}
                    className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-primary-50 text-navy-70 hover:bg-primary-100 hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Right: Sort Dropdown */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
              <div
                aria-live="polite"
                className="text-[13px] font-semibold text-navy-70"
              >
                Showing <span className="text-primary font-bold">{filteredPosts.length}</span>{' '}
                {filteredPosts.length === 1 ? 'article' : 'articles'}
              </div>

              <div className="flex items-center gap-2">
                <label
                  htmlFor="blog-sort-select"
                  className="text-[13px] font-bold text-navy-70"
                >
                  Sort:
                </label>
                <select
                  id="blog-sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as 'latest' | 'popular');
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-navy-15 rounded-full px-3.5 py-1.5 text-[13px] font-bold text-navy focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Active Search Filter Indicator */}
          {(searchQuery.trim() !== '' || selectedCategory !== 'All') && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white rounded-[16px] px-5 py-3 border border-navy-08">
              <div className="flex flex-wrap items-center gap-2 text-[14px] text-navy-70">
                <span className="font-semibold">Active filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-[12px] font-bold">
                    {selectedCategory}
                  </span>
                )}
                {searchQuery.trim() !== '' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary text-[12px] font-bold">
                    Search: &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[13px] font-bold text-primary hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* 70 / 30 Layout: Article Grid Left (8 cols) + Sticky Sidebar Right (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 70% (8 cols): 2-Column Article Grid */}
            <div className="lg:col-span-8">
              {paginatedPosts.length === 0 ? (
                /* Empty State */
                <div className="bg-white rounded-[20px] p-12 text-center border border-navy-08 shadow-soft">
                  <div className="w-14 h-14 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-[22px] font-extrabold text-navy mb-2">
                    No articles found
                  </h3>
                  <p className="text-[15px] text-navy-70 max-w-md mx-auto mb-6">
                    We couldn&apos;t find any articles matching your current search or
                    category filter. Try clearing your filters to explore all guides.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-colors cursor-pointer"
                  >
                    <span>Clear filters</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedPosts.map((post) => {
                      const author = getAuthorById(post.authorId);
                      return (
                        <motion.article
                          key={post.slug}
                          initial={{ opacity: 0, y: 14 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <Link
                            href={`/blog/${post.slug}`}
                            className="group h-full bg-white rounded-[20px] border border-navy-08 shadow-soft hover:shadow-soft-hover hover:border-primary-100 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                          >
                            <div>
                              {/* 16:9 Cover Image with Category Pill over Corner */}
                              <div className="relative aspect-[16/9] overflow-hidden bg-navy">
                                <Image
                                  src={post.coverImage}
                                  alt={post.coverAlt}
                                  loading="lazy"
                                  fill
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-primary text-[11px] font-bold uppercase tracking-wider shadow-sm">
                                  {post.category}
                                </span>
                              </div>

                              <div className="p-6">
                                <h3 className="text-[20px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug mb-2.5">
                                  {post.title}
                                </h3>
                                <p className="text-[14px] text-navy-70 leading-relaxed line-clamp-2">
                                  {post.excerpt}
                                </p>
                              </div>
                            </div>

                            <div className="px-6 pb-6 pt-3 border-t border-navy-08/60 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-full bg-primary-50 text-primary font-bold text-[11px] flex items-center justify-center shrink-0">
                                  {author.initials}
                                </div>
                                <div className="text-[12px] text-navy-70 truncate">
                                  <span className="font-bold text-navy block truncate">
                                    {author.name}
                                  </span>
                                  <span className="text-navy-50">
                                    <time dateTime={post.publishedIso}>
                                      {post.publishedDate}
                                    </time>{' '}
                                    · {post.readTime}
                                  </span>
                                </div>
                              </div>

                              <span className="inline-flex items-center gap-1 text-[13px] font-bold text-primary shrink-0 group-hover:translate-x-1 transition-transform">
                                <span>Read More</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </Link>
                        </motion.article>
                      );
                    })}
                  </div>

                  {/* Numbered Pagination (6 posts per page) */}
                  {totalPages > 1 && (
                    <nav
                      aria-label="Blog pagination"
                      className="mt-10 flex items-center justify-center gap-2"
                    >
                      <button
                        type="button"
                        disabled={safePage === 1}
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          scrollToArticles();
                        }}
                        aria-label="Previous page"
                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                          safePage === 1
                            ? 'border-navy-08 text-navy-30 cursor-not-allowed bg-white/60'
                            : 'border-navy-15 bg-white text-navy hover:border-primary hover:text-primary cursor-pointer'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (pageNum) => {
                          const isCurrent = pageNum === safePage;
                          return (
                            <button
                              key={pageNum}
                              type="button"
                              aria-current={isCurrent ? 'page' : undefined}
                              onClick={() => {
                                setCurrentPage(pageNum);
                                scrollToArticles();
                              }}
                              className={`w-10 h-10 rounded-full text-[14px] font-bold transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-primary text-white shadow-soft'
                                  : 'bg-white text-navy-70 border border-navy-08 hover:border-primary hover:text-primary'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      <button
                        type="button"
                        disabled={safePage === totalPages}
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          scrollToArticles();
                        }}
                        aria-label="Next page"
                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                          safePage === totalPages
                            ? 'border-navy-08 text-navy-30 cursor-not-allowed bg-white/60'
                            : 'border-navy-15 bg-white text-navy hover:border-primary hover:text-primary cursor-pointer'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </nav>
                  )}
                </>
              )}
            </div>

            {/* Right 30% (4 cols): Sticky Sidebar */}
            <aside
              aria-label="Blog sidebar"
              className="lg:col-span-4 lg:sticky lg:top-[140px] space-y-6"
            >
              {/* 1. Categories Card */}
              <div className="bg-white rounded-[20px] p-6 border border-navy-08 shadow-soft">
                <h3 className="text-[18px] font-extrabold text-navy mb-4">
                  Categories
                </h3>
                <ul className="space-y-1.5">
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect('All')}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-[14px] font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === 'All'
                          ? 'bg-primary text-white'
                          : 'text-navy-70 hover:bg-primary-50 hover:text-primary'
                      }`}
                    >
                      <span>All Articles</span>
                      <span
                        className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${
                          selectedCategory === 'All'
                            ? 'bg-white/20 text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {blogPosts.length}
                      </span>
                    </button>
                  </li>
                  {blogCategories.map((cat) => {
                    const active = selectedCategory === cat;
                    const count = getCategoryCount(cat);
                    return (
                      <li key={cat}>
                        <button
                          type="button"
                          onClick={() => handleCategorySelect(cat)}
                          className={`w-full px-3.5 py-2.5 rounded-xl text-[14px] font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                            active
                              ? 'bg-primary text-white'
                              : 'text-navy-70 hover:bg-primary-50 hover:text-primary'
                          }`}
                        >
                          <span>{cat}</span>
                          <span
                            className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${
                              active
                                ? 'bg-white/20 text-white'
                                : 'bg-primary-50 text-primary'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* 2. Popular Posts Card (with big faint numbers 01–04) */}
              <div className="bg-white rounded-[20px] p-6 border border-navy-08 shadow-soft">
                <h3 className="text-[18px] font-extrabold text-navy mb-4">
                  Popular Posts
                </h3>
                <div className="space-y-4">
                  {popularSidebarPosts.map((post, idx) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex items-start gap-3.5 pb-4 last:pb-0 border-b last:border-b-0 border-navy-08"
                    >
                      <span className="text-[28px] font-extrabold leading-none text-primary/25 group-hover:text-primary transition-colors select-none tabular-nums shrink-0 w-9">
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-0.5">
                          {post.category}
                        </span>
                        <h4 className="text-[14px] font-bold text-navy group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h4>
                        <span className="text-[12px] text-navy-50 mt-1 block">
                          {post.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 3. Newsletter Mini Card (navy) */}
              <div className="bg-navy text-white rounded-[20px] p-6 relative overflow-hidden shadow-soft">
                <div className="absolute -right-12 -top-12 w-36 h-36 blue-glow pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mb-3.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-[18px] font-extrabold text-white mb-1.5">
                    Get insights in your inbox
                  </h3>
                  <p className="text-[13px] text-white/70 leading-relaxed mb-4">
                    Actionable web, SEO &amp; AI playbooks sent once a month. Zero fluff.
                  </p>

                  {sidebarSubscribed ? (
                    <div className="p-3.5 rounded-xl bg-primary/20 border border-primary/40 text-[13px] font-semibold text-white flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>Subscribed! Check your inbox soon.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSidebarNewsletter} className="space-y-2.5">
                      <input
                        type="email"
                        required
                        value={sidebarEmail}
                        onChange={(e) => setSidebarEmail(e.target.value)}
                        placeholder="Enter your work email"
                        aria-label="Work email for newsletter"
                        className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/50 text-[13px] focus:outline-none focus:border-primary"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[13px] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Subscribe</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* 4. Solid Primary CTA Card (#0571c2, white text) */}
              <div className="bg-primary text-white rounded-[20px] p-6 shadow-soft">
                <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[11px] font-bold uppercase tracking-wider mb-3">
                  FREE CONSULTATION
                </span>
                <h3 className="text-[20px] font-extrabold leading-snug mb-2">
                  Need a website or AI solution?
                </h3>
                <p className="text-[13px] text-white/85 leading-relaxed mb-5">
                  Turn these insights into measurable revenue with our senior engineering
                  and growth team.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal('Blog Sidebar Consultation')}
                  className="w-full py-3 px-5 rounded-full bg-white text-navy hover:bg-navy hover:text-white font-bold text-[14px] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. EDITOR'S PICKS — NUMBERED CAROUSEL (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[104px] border-t border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                EDITOR&apos;S PICKS
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Start <span className="text-primary">Here</span>
              </h2>
            </div>

            {/* Carousel Prev/Next Arrows */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => scrollCarousel('prev')}
                aria-label="Scroll Editor's Picks left"
                className="w-11 h-11 rounded-full border border-navy-15 bg-white text-navy hover:border-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel('next')}
                aria-label="Scroll Editor's Picks right"
                className="w-11 h-11 rounded-full border border-navy-15 bg-white text-navy hover:border-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Snap Carousel of Tall Cards */}
          <div
            ref={carouselRef}
            tabIndex={0}
            aria-label="Editor's Picks articles carousel"
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar focus:outline-none"
          >
            {editorsPickPosts.map((post, idx) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="snap-start shrink-0 w-[290px] sm:w-[330px] group bg-white rounded-[20px] p-6 border border-navy-08 shadow-soft hover:shadow-soft-hover hover:border-primary-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Huge Outlined Number 01–05 in Blue */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[48px] font-extrabold leading-none select-none tabular-nums"
                      style={{
                        WebkitTextStroke: '2px #0571c2',
                        color: 'transparent',
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-[19px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[12px] text-navy-50 font-medium mb-5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{post.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.publishedDate}</span>
                  </div>
                </div>

                {/* Image at the bottom with rounded corners */}
                <div className="relative aspect-[16/10] rounded-[14px] overflow-hidden bg-navy">
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt}
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. EXPLORE BY TOPIC (navy — 4x2 grid of glass topic tiles)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[104px] overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="absolute -left-24 top-1/3 w-[480px] h-[480px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              TOPICS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight">
              Explore by <span className="text-primary">Topic</span>
            </h2>
          </div>

          {/* 4x2 Grid of Glass Topic Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOPIC_TILES.map((tile) => {
              const IconComp = tile.icon;
              const count = getCategoryCount(tile.category);
              const isSelected = selectedCategory === tile.category;
              return (
                <button
                  key={tile.category}
                  type="button"
                  onClick={() => handleCategorySelect(tile.category, true)}
                  className={`group text-left rounded-[20px] p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-primary border-primary text-white shadow-lg'
                      : 'bg-white/5 border-white/10 hover:bg-primary hover:border-primary text-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-primary/20 text-primary group-hover:bg-white/20 group-hover:text-white'
                        }`}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-white/10 text-white/80 group-hover:bg-white/20 group-hover:text-white'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    <h3 className="text-[19px] font-extrabold text-white mb-1.5">
                      {tile.category}
                    </h3>
                    <p className="text-[13px] text-white/75 group-hover:text-white/90 leading-relaxed mb-4">
                      {tile.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[12px] font-bold text-white/80 group-hover:text-white">
                    <span>
                      {count} {count === 1 ? 'Article' : 'Articles'}
                    </span>
                    <span>Filter topic →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. NEWSLETTER BAND (light blue tint — wide rounded banner)
      ==================================================================== */}
      <section className="bg-primary-50 py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-[24px] p-8 sm:p-10 lg:p-14 border border-primary-100 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Envelope Illustration in Blue Tones + H2 */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Custom SVG Envelope Illustration in Blue Tones */}
                <div className="w-20 h-20 rounded-[20px] bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 64 64"
                    className="w-12 h-12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="6"
                      y="14"
                      width="52"
                      height="38"
                      rx="8"
                      fill="#0571c2"
                      fillOpacity="0.15"
                      stroke="#0571c2"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M10 18L32 35L54 18"
                      stroke="#0571c2"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="48" cy="18" r="7" fill="#0571c2" />
                    <path
                      d="M45 18L47 20L51 16"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-[26px] sm:text-[32px] font-extrabold text-navy leading-tight mb-2">
                    Get Smarter About{' '}
                    <span className="text-primary">Digital Growth</span>
                  </h2>
                  <p className="text-[16px] text-navy-70">
                    One useful email a month. No spam, unsubscribe anytime.
                  </p>
                </div>
              </div>

              {/* Right: Email Input + Subscribe Button */}
              <div className="lg:col-span-5">
                {bannerSubscribed ? (
                  <div className="p-5 rounded-[20px] bg-primary-50 border border-primary-100 flex items-center gap-3 text-navy">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-[15px]">
                        You&apos;re on the list!
                      </div>
                      <div className="text-[13px] text-navy-70">
                        Thank you for subscribing to the WebXCode monthly growth digest.
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBannerNewsletter} className="space-y-2.5">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        type="email"
                        required
                        value={bannerEmail}
                        onChange={(e) => setBannerEmail(e.target.value)}
                        placeholder="Enter your email address"
                        aria-label="Email address for monthly newsletter"
                        className="flex-1 px-5 py-3.5 rounded-full bg-primary-50/70 border border-navy-15 text-navy placeholder:text-navy-50 text-[14px] font-medium focus:outline-none focus:border-primary focus:bg-white"
                      />
                      <button
                        type="submit"
                        className="px-7 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-colors inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm"
                      >
                        <span>Subscribe</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[12px] text-navy-50 font-medium pl-2">
                      Join <span className="font-bold text-navy-70">2,500+</span> founders,
                      marketers &amp; product leaders.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. FINAL CTA (navy, rounded container — split with rotated cover stack)
      ==================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-[28px] bg-navy text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -top-20 w-[480px] h-[480px] blue-glow-strong pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-[380px] h-[380px] blue-glow pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left (7 cols) */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                  FROM INSIGHT TO EXECUTION
                </span>
                <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.12] tracking-tight mb-4">
                  Ready to Put These{' '}
                  <span className="text-primary">Ideas to Work?</span>
                </h2>
                <p className="text-[16px] sm:text-[18px] text-white/75 leading-relaxed max-w-xl mb-8">
                  Whether you need a sub-second Next.js website, an AEO &amp; SEO growth
                  engine, or a 24/7 AI lead agent—our team is ready to architect and ship
                  it for you.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal('Blog CTA Project Inquiry')}
                    className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Get a Free Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="/contact"
                    className="px-7 py-4 rounded-full border border-white/25 hover:border-white hover:bg-white/10 text-white font-bold text-[15px] transition-all inline-flex items-center gap-2"
                  >
                    <span>Talk to an Expert</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right (5 cols): Stack of 3 Slightly Rotated Article Cover Thumbnails */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full max-w-[360px] h-[260px] flex items-center justify-center">
                  {/* Blue Glow behind Stack */}
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl pointer-events-none" />

                  {/* Back Left Card */}
                  <div className="absolute w-56 rounded-[16px] overflow-hidden border-2 border-white/20 bg-navy shadow-xl -rotate-12 -translate-x-10 translate-y-3">
                    <div className="relative w-full h-32">
                      <Image
                        src={IMG_ECOM_STORE}
                        alt="E-commerce growth guide thumbnail"
                        loading="lazy"
                        fill
                        sizes="224px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 bg-navy text-[11px] font-bold text-white/90 truncate">
                      Shopify vs WooCommerce 2026
                    </div>
                  </div>

                  {/* Back Right Card */}
                  <div className="absolute w-56 rounded-[16px] overflow-hidden border-2 border-white/20 bg-navy shadow-xl rotate-12 translate-x-10 translate-y-2">
                    <div className="relative w-full h-32">
                      <Image
                        src={IMG_AI_PLATFORM}
                        alt="AI search and AEO guide thumbnail"
                        loading="lazy"
                        fill
                        sizes="224px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 bg-navy text-[11px] font-bold text-white/90 truncate">
                      What Is AEO &amp; Why It Matters
                    </div>
                  </div>

                  {/* Center Front Card */}
                  <div className="relative z-10 w-64 rounded-[18px] overflow-hidden border-2 border-primary bg-white text-navy shadow-2xl -translate-y-2">
                    <div className="relative w-full h-36">
                      <Image
                        src={IMG_LAPTOP_SHOWCASE}
                        alt="Website cost guide cover thumbnail"
                        loading="lazy"
                        fill
                        sizes="256px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3.5 bg-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                        Web Development
                      </span>
                      <div className="text-[13px] font-extrabold text-navy truncate">
                        Website Cost in India in 2026
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
