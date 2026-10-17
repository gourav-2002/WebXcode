/* Blog Data - Server/Client Safe */
import {
  LucideIcon,
  Code2,
  TrendingUp,
  Sparkles,
  Bot,
  BarChart3,
  ShoppingBag,
  Layers,
  Globe,
} from 'lucide-react';

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
