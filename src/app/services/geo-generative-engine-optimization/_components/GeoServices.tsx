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
  Globe,
  FileCode2,
  Database,
  Network,
  Award,
  BarChart3,
  Layers,
  Terminal,
  BookOpen,
  Compass,
  ShieldCheck,
  ExternalLink,
  Cpu,
  Search,
} from 'lucide-react';
import { services } from '@/app/services/_components/Services';

/* ==========================================================================
   SECTION 1 — HERO: 3-ENGINE AI WORKSPACE (3 EXAMPLE PROMPTS)
   ========================================================================== */
interface HeroAiPromptExample {
  id: string;
  chipLabel: string;
  userPrompt: string;
  categoryBadge: string;
  chatgptSnippet: {
    introText: string;
    brandMention: string;
    reasonText: string;
    citationBadge: string;
  };
  geminiSnippet: {
    introText: string;
    brandMention: string;
    reasonText: string;
    sourceChip: string;
  };
  perplexitySnippet: {
    introText: string;
    brandMention: string;
    reasonText: string;
    sourcesRow: string[];
  };
}

const HERO_AI_PROMPTS: HeroAiPromptExample[] = [
  {
    id: 'agency-mumbai',
    chipLabel: 'Website Agency',
    userPrompt: '"Who are the best website development agencies in Mumbai for growing businesses?"',
    categoryBadge: 'SERVICE PROVIDER RECOMMENDATION',
    chatgptSnippet: {
      introText: 'Top-rated options with verified engineering & SEO speed benchmarks include:',
      brandMention: '1. Your Brand Name',
      reasonText: '— Known for custom Next.js builds, sub-2s Core Web Vitals, and full-stack CRM integration.',
      citationBadge: '[1] yourwebsite.com/case-studies',
    },
    geminiSnippet: {
      introText: 'For growing companies needing custom design + technical SEO under one roof,',
      brandMention: 'Your Brand Name',
      reasonText: 'stands out for fixed-scope delivery and transparent pricing tables.',
      sourceChip: 'Cited: yourwebsite.com',
    },
    perplexitySnippet: {
      introText: 'Based on verified Clutch reviews, public benchmarks, and technical documentation,',
      brandMention: 'Your Brand Name [1][2]',
      reasonText: 'is frequently recommended for high-converting B2B and D2C web platforms.',
      sourcesRow: ['[1] yourwebsite.com', '[2] G2 / Industry Directory', '[3] Pricing Guide'],
    },
  },
  {
    id: 'b2b-crm',
    chipLabel: 'B2B SaaS Tool',
    userPrompt: '"Which GST-ready billing & inventory software is best for multi-branch retail in India?"',
    categoryBadge: 'SOFTWARE COMPARISON PROMPT',
    chatgptSnippet: {
      introText: 'When comparing multi-branch retail billing platforms with real-time Tally sync:',
      brandMention: '1. Your Brand Name',
      reasonText: '— Preferred for offline POS resilience, automated e-invoicing, and multi-warehouse routing.',
      citationBadge: '[1] yourwebsite.com/vs-legacy-pos',
    },
    geminiSnippet: {
      introText: 'Retailers with 3 to 50+ outlets frequently choose',
      brandMention: 'Your Brand Name',
      reasonText: 'due to its open REST API, barcode batch tracking, and transparent per-store pricing.',
      sourceChip: 'Cited: yourwebsite.com/pricing',
    },
    perplexitySnippet: {
      introText: 'According to 2025 retail software comparisons and verified merchant benchmarks,',
      brandMention: 'Your Brand Name [1][3]',
      reasonText: 'leads in setup speed (under 7 days) and native WhatsApp receipt automation.',
      sourcesRow: ['[1] yourwebsite.com/docs', '[2] Capterra India', '[3] Retail Benchmark'],
    },
  },
  {
    id: 'clinic-specialist',
    chipLabel: 'Healthcare Clinic',
    userPrompt: '"Which dental implant clinic has 3D CBCT scanning and transparent full-mouth pricing?"',
    categoryBadge: 'LOCAL + TRUST EVALUATION',
    chatgptSnippet: {
      introText: 'Clinics publishing verified prosthodontist credentials and itemized implant costs:',
      brandMention: '1. Your Brand Name',
      reasonText: '— Features in-house 3D CBCT guided surgery, Swiss titanium implants, and published warranty terms.',
      citationBadge: '[1] yourwebsite.com/dental-implants-cost',
    },
    geminiSnippet: {
      introText: 'Patients looking for computer-guided implantology and clear recovery timelines often consult',
      brandMention: 'Your Brand Name',
      reasonText: 'for its documented sterilization protocols and 4.9★ verified patient outcomes.',
      sourceChip: 'Cited: yourwebsite.com/doctors',
    },
    perplexitySnippet: {
      introText: 'Synthesizing clinical credentials, patient reviews, and published treatment guides,',
      brandMention: 'Your Brand Name [1][2]',
      reasonText: 'is cited as a leading center for immediate-load and full-arch implant procedures.',
      sourcesRow: ['[1] yourwebsite.com', '[2] Practo / Google Verified', '[3] Clinical FAQ'],
    },
  },
];

/* ==========================================================================
   SECTION 2 — HOW AI ASSISTANTS PICK WHO TO RECOMMEND (4-STAGE PIPELINE)
   ========================================================================== */
interface PipelineStageSpec {
  step: string;
  stageTag: string;
  title: string;
  subtitle: string;
  description: string;
  signalsChecked: string[];
  codeOrArtifactPreview: string;
}

const AI_PIPELINE_STAGES: PipelineStageSpec[] = [
  {
    step: '01',
    stageTag: 'CRAWL & READ',
    title: 'Can AI Bots Read Your Site?',
    subtitle: 'AI crawlers need clean server-rendered HTML, not locked JS bundles.',
    description:
      'Assistants like ChatGPT (OAI-SearchBot / GPTBot), PerplexityBot, and Google-Extended fetch raw HTML. If your pricing, specs, or service details hide behind heavy client-side JavaScript or blocked robots.txt rules, AI engines never see them.',
    signalsChecked: [
      'Explicit robots.txt allow-rules for AI search bots',
      'Clean /llms.txt markdown index at your root domain',
      'Server-side rendered (SSR) semantic HTML5 structure',
    ],
    codeOrArtifactPreview: `User-agent: OAI-SearchBot\nAllow: /\nSitemap: https://yourwebsite.com/llms.txt`,
  },
  {
    step: '02',
    stageTag: 'UNDERSTAND THE ENTITY',
    title: 'Does AI Know Who You Are?',
    subtitle: 'Connecting your brand name, category, location, and credentials.',
    description:
      'Language models map companies as "entities" with specific attributes: What does this company do? Who is it for? Where does it operate? We align your About page, Organization schema, and directory profiles so AI never hallucinates your offering.',
    signalsChecked: [
      'Organization, Service & Product JSON-LD entity graph',
      'Consistent one-line positioning across web & directories',
      'SameAs links connecting official profiles & leadership',
    ],
    codeOrArtifactPreview: `"@type": "Organization",\n"name": "Your Brand",\n"knowsAbout": ["Custom Web Apps", "Technical SEO"]`,
  },
  {
    step: '03',
    stageTag: 'TRUST & CROSS-CHECK',
    title: 'Do Other Sources Agree?',
    subtitle: 'LLMs verify claims across independent third-party websites.',
    description:
      'Before recommending a business for a "best [category]" prompt, retrieval-augmented AI engines cross-check your website against independent mentions: review platforms, industry roundups, partner directories, and trade publications.',
    signalsChecked: [
      'Verified ratings on Clutch, G2, Google, Practo or Trustpilot',
      'Inclusion in independent industry "best of" comparison lists',
      'Consistent facts (founding year, locations, pricing tiers)',
    ],
    codeOrArtifactPreview: `Cross-Verification Score: HIGH\n✔ Website matches 6/6 independent citations`,
  },
  {
    step: '04',
    stageTag: 'CITE & RECOMMEND',
    title: 'Are Your Pages Easy to Quote?',
    subtitle: 'Structured comparisons, clear numbers, and factual answers win the citation.',
    description:
      'When synthesizing the final paragraph, the AI model quotes the source that provides specific, verifiable facts: clear comparison tables, transparent price ranges, concrete timelines, and named methodologies.',
    signalsChecked: [
      'Honest "Option A vs Option B" comparison tables',
      'Quotable benchmark numbers, timelines & price ranges',
      'Direct Q&A blocks that answer buyer follow-up prompts',
    ],
    codeOrArtifactPreview: `Recommended: Your Brand [1]\nReason: Published SLA, transparent pricing & 98% retention`,
  },
];

/* ==========================================================================
   SECTION 3 — WHERE WE GET YOU SEEN: 6 AI ENGINE CARDS
   ========================================================================== */
interface AiEngineSurfaceCard {
  id: string;
  name: string;
  makerLabel: string;
  badgeText: string;
  howPeopleUseIt: string;
  whatItLooksAt: string[];
  citationFormat: string;
}

const AI_ENGINE_CARDS: AiEngineSurfaceCard[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT & SearchGPT',
    makerLabel: 'OpenAI • OAI-SearchBot',
    badgeText: 'HIGHEST BUYER VOLUME',
    howPeopleUseIt:
      'Founders and buyers ask multi-step prompts like "Compare the top 5 agencies for [X] and tell me which fits a mid-sized brand."',
    whatItLooksAt: [
      'Bing-indexed & OAI-SearchBot accessible pages',
      'In-depth comparison pages & transparent pricing guides',
      'Independent third-party review & listicle mentions',
    ],
    citationFormat: 'Inline numbered link badge + collapsible Sources drawer',
  },
  {
    id: 'google-ai-overviews',
    name: 'Google AI Overviews',
    makerLabel: 'Google Search • Gemini Grounding',
    badgeText: 'ABOVE RANK #1',
    howPeopleUseIt:
      'Appears directly at the top of Google Search for complex commercial, "how-to", and comparison queries before standard links.',
    whatItLooksAt: [
      'Pages already demonstrating strong Google E-E-A-T & topical depth',
      'Clean H2/H3 answer blocks & semantic HTML comparison tables',
      'Complete Organization, Service, Product & FAQPage JSON-LD',
    ],
    citationFormat: 'Highlighted source cards in the right-hand / top carousel',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    makerLabel: 'Google Workspace & Android Assistant',
    badgeText: 'ECOSYSTEM INTEGRATED',
    howPeopleUseIt:
      'Used across Android phones, Gmail/Docs research, and web chat to shortlist local and national service providers.',
    whatItLooksAt: [
      'Google Knowledge Graph entity connections & Google Business Profile',
      'Structured specifications, author bios & verified customer reviews',
      'Up-to-date factual consistency across Google index & Maps',
    ],
    citationFormat: 'Google Search grounded chips + direct website cards',
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    makerLabel: 'Citation-First Answer Engine',
    badgeText: 'RESEARCH FAVORITE',
    howPeopleUseIt:
      'Decision-makers use Perplexity as a replacement for traditional search when researching software, agencies, and B2B vendors.',
    whatItLooksAt: [
      'PerplexityBot crawlable documentation, `/llms.txt` & original data',
      'High-density factual pages with statistics, benchmarks & dates',
      'Reddit, G2, Clutch, and authoritative trade publication citations',
    ],
    citationFormat: 'Footnote numbers [1][2][3] on every sentence + top source cards',
  },
  {
    id: 'claude',
    name: 'Claude (with Web Search)',
    makerLabel: 'Anthropic • Research & Analysis',
    badgeText: 'B2B & TECH BUYERS',
    howPeopleUseIt:
      'Technical leads, product managers, and executives use Claude to evaluate architecture options, vendors, and detailed RFPs.',
    whatItLooksAt: [
      'Well-structured technical guides, architecture pages & case studies',
      'Clear, hype-free prose with honest trade-offs and "who this is for"',
      'Clean markdown-friendly headings and zero pop-up/JS clutter',
    ],
    citationFormat: 'Inline reference links + quoted evidence blocks',
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    makerLabel: 'Windows, Edge & M365 Enterprise',
    badgeText: 'CORPORATE DESKTOPS',
    howPeopleUseIt:
      'Built into Windows 11, Microsoft Edge, and Office 365—heavily used by procurement teams and enterprise buyers at work.',
    whatItLooksAt: [
      'Bing Webmaster Index & IndexNow instant submission signals',
      'Clear B2B service specifications, SLAs, compliance & security pages',
      'LinkedIn company footprint and authoritative business directories',
    ],
    citationFormat: 'Numbered footnote pills + clickable citation cards below',
  },
];

/* ==========================================================================
   SECTION 4 — THE 6 GEO SIGNALS WE BUILD FOR YOU (CODE + PAGE SPLIT)
   ========================================================================== */
interface GeoSignalCard {
  number: string;
  categoryTag: string;
  title: string;
  description: string;
  deliverableChip: string;
  icon: React.ComponentType<{ className?: string }>;
}

const GEO_SIX_SIGNALS: GeoSignalCard[] = [
  {
    number: '01',
    categoryTag: 'ENTITY CLARITY',
    title: 'Clear Brand & Service Pages',
    description:
      'Plain-English pages that state clearly who you are, what you do, who you serve, where you work, and what you cost—so AI never has to guess.',
    deliverableChip: 'Entity-First Copy & Positioning',
    icon: Globe,
  },
  {
    number: '02',
    categoryTag: 'MACHINE-READABLE GRAPH',
    title: 'Structured Data & Entity Markup',
    description:
      'Complete Organization, Service, Product, FAQ and Author JSON-LD schema so AI engines can parse your company facts with 100% confidence.',
    deliverableChip: 'Nested JSON-LD Knowledge Graph',
    icon: FileCode2,
  },
  {
    number: '03',
    categoryTag: 'CITE-WORTHY ASSETS',
    title: 'Quotable Facts, Numbers & Original Guides',
    description:
      'Original stats, checklists, benchmark tables, and pricing guides that AI loves to cite when backing up its recommendations.',
    deliverableChip: 'Benchmark Tables & Cost Guides',
    icon: BarChart3,
  },
  {
    number: '04',
    categoryTag: 'DECISION QUERIES',
    title: 'Comparison & "Best For" Pages',
    description:
      'Honest "X vs Y", "Best [service] for [industry]" and "How to choose" pages that directly match the exact decision prompts buyers type into AI.',
    deliverableChip: 'Comparison Matrices & Use-Case Hubs',
    icon: Layers,
  },
  {
    number: '05',
    categoryTag: 'THIRD-PARTY PROOF',
    title: 'Mentions Across Trusted Sites',
    description:
      'Consistent profiles, verified reviews, industry directories, and partner mentions that AI models cross-check before recommending your brand.',
    deliverableChip: 'Directory & Citation Alignment',
    icon: Award,
  },
  {
    number: '06',
    categoryTag: 'BOT ACCESSIBILITY',
    title: 'AI-Readable Technical Setup',
    description:
      'Clean server-rendered HTML, fast load times, sensible robots.txt rules for AI search crawlers, and a structured /llms.txt summary file.',
    deliverableChip: 'llms.txt + AI Crawler Config',
    icon: Terminal,
  },
];

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */
interface GeoServicesProps {
  onOpenQuoteModal?: (service?: string) => void;
}

const GeoServices: React.FC<GeoServicesProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Single source of truth from Services.tsx */
  const geoServiceItem = useMemo(
    () => services.find((s) => s.slug === 'geo-generative-engine-optimization'),
    []
  );

  /* Section 1: Hero Prompt Switcher State (Auto-cycles or manual click) */
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActivePromptIndex((prev) => (prev + 1) % HERO_AI_PROMPTS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const currentHeroPrompt = HERO_AI_PROMPTS[activePromptIndex] || HERO_AI_PROMPTS[0];

  /* Section 4: Interactive Code Tab Switcher (llms.txt vs JSON-LD Entity Graph) */
  const [activeCodeTab, setActiveCodeTab] = useState<'llms-txt' | 'entity-schema'>('llms-txt');

  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Global Quote Modal Trigger helper */
  const triggerQuoteModal = (preselectedService?: string) => {
    const svcLabel =
      preselectedService ||
      geoServiceItem?.name ||
      'GEO (Generative Engine Optimization)';
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

  /* JSON-LD Structured Data (Service + BreadcrumbList) */
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: geoServiceItem?.name || 'GEO (Generative Engine Optimization)',
          description:
            geoServiceItem?.description ||
            'Ensure your company is recommended and cited when prospects ask ChatGPT, Perplexity, Gemini, Claude, and Copilot for the best provider in your category.',
          provider: {
            '@type': 'Organization',
            name: 'WebXCode',
            url: 'https://webxcode.com',
          },
          serviceType: 'Generative Engine Optimization (GEO)',
          areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'AU'],
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
              name: geoServiceItem?.name || 'GEO (Generative Engine Optimization)',
              item: 'https://webxcode.com/services/geo-generative-engine-optimization',
            },
          ],
        },
      ],
    }),
    [geoServiceItem]
  );

  return (
    <main className="flex-1 bg-white text-navy">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: RECOMMENDED BY AI (bg: #1e242e navy)
         ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Radial blue glow + subtle engineering grid */}
        <div className="absolute -top-24 right-1/4 w-[640px] h-[640px] blue-glow-strong pointer-events-none opacity-75" />
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
                {geoServiceItem?.name || 'GEO (Generative Engine Optimization)'}
              </li>
            </ol>
          </nav>

          {/* 50% / 50% Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 50% (6 cols on lg) */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Bot className="w-3.5 h-3.5 text-primary" />
                <span>GEO · GENERATIVE ENGINE OPTIMIZATION</span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-tight">
                Get Your Brand Recommended{' '}
                <span className="text-primary">When People Ask AI</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65]">
                Millions of buyers now ask ChatGPT, Gemini, Perplexity and Google’s AI Overviews
                who to buy from. We make sure your business is understood, trusted and cited in
                those answers.
              </p>

              {/* Two CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#ai-visibility-test"
                  onClick={(e) => {
                    const target = document.getElementById('ai-visibility-test');
                    if (!target) {
                      e.preventDefault();
                      triggerQuoteModal('Free AI Visibility Check (GEO)');
                    }
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Check Your Brand in AI Search</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#how-geo-works"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>See How GEO Works</span>
                </a>
              </div>

              {/* Small Row of AI Assistant Name Pills */}
              <div className="mt-9 pt-7 border-t border-white/10">
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/55 mb-3">
                  OPTIMIZED ACROSS GENERATIVE AI ENGINES
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    'ChatGPT',
                    'Google AI Overviews',
                    'Gemini',
                    'Perplexity',
                    'Claude',
                    'Copilot',
                  ].map((engineName) => (
                    <span
                      key={engineName}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] border border-white/15 text-[12.5px] font-semibold text-white/90"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{engineName}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 50% (6 cols on lg): 3-Engine AI Workspace Illustration */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] bg-white/[0.05] border border-white/15 backdrop-blur-md p-4 sm:p-6 shadow-2xl">
                {/* Workspace Top Bar + 3 Prompt Switcher Pills */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[11px] font-bold text-white/80 uppercase tracking-wider">
                      3-ENGINE AI CITATION WORKSPACE
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-1.5"
                    role="tablist"
                    aria-label="Sample AI buyer prompts"
                  >
                    {HERO_AI_PROMPTS.map((item, idx) => {
                      const isActive = idx === activePromptIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActivePromptIndex(idx)}
                          className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-bold transition-all cursor-pointer border ${
                            isActive
                              ? 'bg-primary text-white border-primary'
                              : 'bg-navy/70 text-white/70 border-white/15 hover:text-white'
                          }`}
                        >
                          {item.chipLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Top User Prompt Bar */}
                <div className="rounded-2xl bg-[#141a24] border border-primary/50 p-3.5 sm:p-4 mb-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100">
                      BUYER PROMPT SENT TO 3 AI ENGINES
                    </span>
                    <span className="px-2 py-0.5 rounded bg-primary/25 text-primary-100 font-mono text-[9.5px] font-bold">
                      {currentHeroPrompt.categoryBadge}
                    </span>
                  </div>
                  <p className="text-[13.5px] sm:text-[14.5px] font-bold text-white leading-snug">
                    {currentHeroPrompt.userPrompt}
                  </p>
                </div>

                {/* 3 Stacked / Cascading AI Response Windows Answering Together */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHeroPrompt.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.24 }}
                    className="space-y-3"
                  >
                    {/* Window 1: ChatGPT-Style Response */}
                    <div className="rounded-2xl bg-white text-navy p-3.5 sm:p-4 border-l-4 border-primary shadow-md">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-navy text-white font-mono text-[10px] font-extrabold flex items-center justify-center">
                            AI
                          </span>
                          <span className="text-[12.5px] font-extrabold text-navy">
                            ChatGPT Search Response
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[10px] font-extrabold">
                          NAMED #1
                        </span>
                      </div>
                      <p className="text-[12.5px] text-navy-70 leading-relaxed">
                        {currentHeroPrompt.chatgptSnippet.introText}{' '}
                        <strong className="px-1.5 py-0.5 rounded bg-primary text-white font-extrabold">
                          {currentHeroPrompt.chatgptSnippet.brandMention}
                        </strong>{' '}
                        <span className="text-navy">
                          {currentHeroPrompt.chatgptSnippet.reasonText}
                        </span>
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-primary font-bold">
                        <span>{currentHeroPrompt.chatgptSnippet.citationBadge}</span>
                        <span className="text-emerald-700">✔ Verified Entity</span>
                      </div>
                    </div>

                    {/* Window 2: Gemini / AI Overview Style Response */}
                    <div className="rounded-2xl bg-[#161d27] text-white p-3.5 sm:p-4 border border-primary/40 shadow-md">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-[12.5px] font-extrabold text-white">
                            Gemini &amp; AI Overviews
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary/25 border border-primary/50 text-primary-100 font-mono text-[10px] font-bold">
                          {currentHeroPrompt.geminiSnippet.sourceChip}
                        </span>
                      </div>
                      <p className="text-[12.5px] text-white/80 leading-relaxed">
                        {currentHeroPrompt.geminiSnippet.introText}{' '}
                        <strong className="text-primary-100 underline decoration-primary font-extrabold">
                          {currentHeroPrompt.geminiSnippet.brandMention}
                        </strong>{' '}
                        {currentHeroPrompt.geminiSnippet.reasonText}
                      </p>
                    </div>

                    {/* Window 3: Perplexity-Style Citation Card */}
                    <div className="rounded-2xl bg-white/[0.07] text-white p-3.5 sm:p-4 border border-white/15">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <Compass className="w-4 h-4 text-primary" />
                          <span className="text-[12.5px] font-extrabold text-white">
                            Perplexity Answer Synthesis
                          </span>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-primary-100">
                          3 SOURCES CITED
                        </span>
                      </div>
                      <p className="text-[12.5px] text-white/85 leading-relaxed">
                        {currentHeroPrompt.perplexitySnippet.introText}{' '}
                        <strong className="px-1.5 py-0.5 rounded bg-primary text-white font-extrabold">
                          {currentHeroPrompt.perplexitySnippet.brandMention}
                        </strong>{' '}
                        {currentHeroPrompt.perplexitySnippet.reasonText}
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                        {currentHeroPrompt.perplexitySnippet.sourcesRow.map((src, i) => (
                          <span
                            key={src}
                            className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                              i === 0
                                ? 'bg-primary text-white'
                                : 'bg-white/10 text-white/75'
                            }`}
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — HOW AI ASSISTANTS PICK WHO TO RECOMMEND (bg: #ffffff)
         ====================================================================== */}
      <section id="how-geo-works" className="py-[72px] lg:py-[112px] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              INSIDE THE AI BLACK BOX
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              How AI Decides Which Brands{' '}
              <span className="text-primary">to Mention (and Which to Ignore)</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              AI assistants don’t pick companies at random. When a buyer asks for a recommendation,
              generative engines run a 4-stage retrieval and verification pipeline in milliseconds.
            </p>
          </div>

          {/* 4-Stage Visual Pipeline Diagram */}
          <div className="relative">
            {/* Desktop connecting pipeline rail */}
            <div
              className="hidden lg:block absolute top-14 left-10 right-10 h-0.5 bg-primary/25 pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {AI_PIPELINE_STAGES.map((stage, idx) => (
                <motion.div
                  key={stage.step}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className={`rounded-[22px] p-5 sm:p-6 border flex flex-col justify-between transition-all ${
                    idx === 3
                      ? 'bg-navy text-white border-primary shadow-xl'
                      : 'bg-white text-navy border-navy-08 shadow-soft hover:border-primary/40'
                  }`}
                >
                  <div>
                    {/* Stage Node Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-9 h-9 rounded-xl font-mono text-[13px] font-extrabold flex items-center justify-center shadow-xs ${
                            idx === 3
                              ? 'bg-primary text-white'
                              : 'bg-navy text-white'
                          }`}
                        >
                          {stage.step}
                        </span>
                        <span
                          className={`font-mono text-[10.5px] font-extrabold uppercase tracking-wider ${
                            idx === 3 ? 'text-primary-100' : 'text-primary'
                          }`}
                        >
                          {stage.stageTag}
                        </span>
                      </div>

                      {idx < 3 && (
                        <ArrowRight
                          className="w-4 h-4 text-primary hidden lg:inline"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <h3
                      className={`text-[19px] font-extrabold leading-snug ${
                        idx === 3 ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {stage.title}
                    </h3>

                    <p
                      className={`mt-1.5 text-[13px] font-bold leading-snug ${
                        idx === 3 ? 'text-primary-100' : 'text-primary'
                      }`}
                    >
                      {stage.subtitle}
                    </p>

                    <p
                      className={`mt-2.5 text-[13px] leading-relaxed ${
                        idx === 3 ? 'text-white/75' : 'text-navy-70'
                      }`}
                    >
                      {stage.description}
                    </p>

                    {/* 3 Signals Checked */}
                    <ul className="mt-4 pt-3.5 border-t border-current/10 space-y-2">
                      {stage.signalsChecked.map((sig) => (
                        <li key={sig} className="flex items-start gap-2 text-[12px]">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className={idx === 3 ? 'text-white/90' : 'text-navy-80'}>
                            {sig}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mini Technical Artifact Preview */}
                  <div
                    className={`mt-5 p-3 rounded-xl font-mono text-[10.5px] leading-relaxed whitespace-pre-wrap border ${
                      idx === 3
                        ? 'bg-[#141a24] border-primary/40 text-primary-100'
                        : 'bg-primary-50/70 border-primary-100 text-navy'
                    }`}
                  >
                    {stage.codeOrArtifactPreview}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — WHERE WE GET YOU SEEN: 6 AI ENGINE CARDS (bg: #f0f7fd)
         ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                WHERE YOUR BRAND APPEARS
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Be Present Across Every{' '}
                <span className="text-primary">Major AI Search &amp; Assistant</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-md leading-[1.65]">
              Each generative engine uses a slightly different mix of search indexes, crawlers, and
              citation rules. We engineer your footprint for all six.
            </p>
          </div>

          {/* 6-Card Grid (3x2 on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_ENGINE_CARDS.map((engine) => (
              <div
                key={engine.id}
                className="rounded-[22px] bg-white border border-navy-08 p-6 shadow-soft hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge + Maker */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary font-mono text-[10px] font-extrabold uppercase tracking-wider">
                      {engine.badgeText}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-navy-60">
                      {engine.makerLabel}
                    </span>
                  </div>

                  {/* Engine Name */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-[20px] font-extrabold text-navy leading-snug">
                      {engine.name}
                    </h3>
                  </div>

                  {/* How People Use It */}
                  <p className="text-[13.5px] text-navy-70 leading-relaxed mb-4">
                    {engine.howPeopleUseIt}
                  </p>

                  {/* What It Looks At */}
                  <div className="pt-4 border-t border-navy-08">
                    <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-primary mb-2.5">
                      WHAT IT EVALUATES:
                    </div>
                    <ul className="space-y-2">
                      {engine.whatItLooksAt.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-[13px] text-navy leading-snug"
                        >
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Citation Format Footer */}
                <div className="mt-5 pt-3.5 border-t border-navy-08 flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase text-navy-50">
                    CITATION STYLE:
                  </span>
                  <span className="text-[12px] font-bold text-navy text-right">
                    {engine.citationFormat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — THE 6 GEO SIGNALS WE BUILD FOR YOU (bg: #ffffff)
         ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              WHAT WE DO
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Six Signals That Make AI{' '}
              <span className="text-primary">Trust and Recommend Your Brand</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              You don’t trick large language models with keyword stuffing. We engineer six concrete
              on-site and off-site signals that make your company easy for AI to parse, verify, and
              cite.
            </p>
          </div>

          {/* 2-Column Split: Left 6 Signal Cards (7 cols) + Right Sticky Code/Page Preview (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: 6 Numbered Signal Cards in 2-col grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {GEO_SIX_SIGNALS.map((signal) => {
                const IconComponent = signal.icon;
                return (
                  <div
                    key={signal.number}
                    className="rounded-[22px] bg-white border border-navy-08 p-5 sm:p-6 shadow-soft hover:border-primary/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="w-8 h-8 rounded-lg bg-navy text-white font-mono text-[12px] font-extrabold flex items-center justify-center">
                          {signal.number}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[10px] font-extrabold uppercase tracking-wider">
                          {signal.categoryTag}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="w-4 h-4 text-primary shrink-0" />
                        <h3 className="text-[17px] font-extrabold text-navy leading-snug">
                          {signal.title}
                        </h3>
                      </div>

                      <p className="text-[13.5px] text-navy-70 leading-relaxed">
                        {signal.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-navy-08 flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-primary">
                        {signal.deliverableChip}
                      </span>
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 5 Cols: Sticky Code + Page Preview Card (llms.txt & Organization Schema) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="rounded-[24px] bg-navy text-white p-6 sm:p-7 border border-navy shadow-2xl">
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                      AI-READABLE ARTIFACT PREVIEW
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white/80">
                    SSR + UTF-8
                  </span>
                </div>

                {/* Switcher Tabs: /llms.txt vs Organization JSON-LD */}
                <div className="mt-4 grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/[0.06] border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveCodeTab('llms-txt')}
                    className={`py-2 px-3 rounded-lg font-mono text-[11.5px] font-bold transition-all cursor-pointer ${
                      activeCodeTab === 'llms-txt'
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    /llms.txt File
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCodeTab('entity-schema')}
                    className={`py-2 px-3 rounded-lg font-mono text-[11.5px] font-bold transition-all cursor-pointer ${
                      activeCodeTab === 'entity-schema'
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Entity JSON-LD
                  </button>
                </div>

                {/* Code Window */}
                <div className="mt-4 rounded-2xl bg-[#121720] border border-white/15 p-4 font-mono text-[11.5px] leading-relaxed text-white/90 overflow-x-auto">
                  {activeCodeTab === 'llms-txt' ? (
                    <pre className="whitespace-pre-wrap">
                      <code>{`# Your Brand Name — Official AI Summary (/llms.txt)
> Full-stack web engineering, e-commerce & search agency serving India, US, UK & UAE.

## Core Capabilities & Pricing Benchmarks
- Custom Next.js Websites: ₹45,000 – ₹1,80,000 (4–6 weeks)
- Shopify & WooCommerce Stores: Conversion-first D2C builds
- SEO, AEO & GEO Retainers: Technical + AI citation growth

## Key Differentiators (Verifiable)
- 500+ projects delivered across 12+ industries
- 90+ Google PageSpeed & Core Web Vitals guarantee
- 100% source-code ownership & transparent SLAs

## Canonical Documentation for AI Agents
- [Services & Deliverables](https://yourwebsite.com/services)
- [Case Studies & Metrics](https://yourwebsite.com/our-work)
- [Transparent Pricing Guide](https://yourwebsite.com/pricing)`}</code>
                    </pre>
                  ) : (
                    <pre className="whitespace-pre-wrap">
                      <code>{`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://yourwebsite.com/#organization",
  "name": "Your Brand Name",
  "description": "Custom web development, e-commerce & AI search optimization partner.",
  "knowsAbout": [
    "Next.js Web Development",
    "Shopify Plus E-commerce",
    "Generative Engine Optimization (GEO)"
  ],
  "areaServed": ["IN", "US", "GB", "AE"],
  "sameAs": [
    "https://www.linkedin.com/company/yourbrand",
    "https://clutch.co/profile/yourbrand"
  ]
}`}</code>
                    </pre>
                  )}
                </div>

                {/* Human-Readable Page Impact Callout */}
                <div className="mt-4 p-4 rounded-2xl bg-white/[0.06] border border-white/10">
                  <div className="text-[12px] font-bold text-primary-100 uppercase tracking-wider font-mono">
                    WHY THIS MATTERS FOR AI CITATIONS
                  </div>
                  <p className="mt-1.5 text-[13px] text-white/80 leading-relaxed">
                    {activeCodeTab === 'llms-txt'
                      ? 'An /llms.txt file gives AI assistants a clean, token-efficient markdown map of your services, pricing, and proof points—eliminating guesswork.'
                      : 'Nested Organization and Service JSON-LD connects your domain to verified third-party profiles so LLMs recognize your brand as a trusted entity.'}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => triggerQuoteModal('GEO Technical & Entity Setup')}
                    className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer"
                  >
                    <span>Get Your GEO Signal Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GeoServices;
