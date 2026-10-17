import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Sparkles,
  MessageSquare,
  Mic,
  Search,
  FileText,
  ListOrdered,
  Table2,
  ListChecks,
  Zap,
  HelpCircle,
  Plus,
  Minus,
  Volume2,
  BookOpen,
  Layers,
  Globe,
  CheckCircle2,
  Bot,
  Compass,
} from 'lucide-react';
import { services } from '../Services';

/* ==========================================================================
   SECTION 1 — HERO: VOICE-ASSISTANT & DIRECT ANSWER SCENE DATA (3 EXAMPLES)
   ========================================================================== */
interface HeroVoiceAnswerPair {
  id: string;
  chipLabel: string;
  spokenQuestion: string;
  intentTag: string;
  answerText: string;
  answerHighlight: string;
  sourceDomain: string;
  sourceUrlPath: string;
  formatBadge: string;
}

const HERO_VOICE_ANSWERS: HeroVoiceAnswerPair[] = [
  {
    id: 'wp-speed',
    chipLabel: 'WordPress Speed',
    spokenQuestion: '"What’s the best way to speed up a slow WordPress site?"',
    intentTag: 'HOW-TO + TECHNICAL',
    answerHighlight:
      'Replace heavy page-builder bloat with clean block templates, serve WebP images via an edge CDN, and enable server-level object caching.',
    answerText:
      'Together, these three steps typically cut Largest Contentful Paint (LCP) under 1.8 seconds and help pages pass Core Web Vitals.',
    sourceDomain: 'yourwebsite.com',
    sourceUrlPath: '/guides/speed-up-wordpress-core-web-vitals',
    formatBadge: 'Featured Snippet + Voice Readout',
  },
  {
    id: 'crm-migration',
    chipLabel: 'CRM Migration',
    spokenQuestion: '"How long does an enterprise CRM migration take without losing data?"',
    intentTag: 'TIMELINE + PROCESS',
    answerHighlight:
      'A structured enterprise CRM migration typically takes 4 to 8 weeks using a parallel staging sync.',
    answerText:
      'Teams map custom fields in Week 1, validate historical pipelines in a sandbox in Weeks 2–5, and run a zero-downtime weekend cutover.',
    sourceDomain: 'yourwebsite.com',
    sourceUrlPath: '/resources/crm-migration-timeline',
    formatBadge: 'AI Overview + Position #0 Box',
  },
  {
    id: 'dental-implant',
    chipLabel: 'Clinical FAQ',
    spokenQuestion: '"Are single-tooth dental implants painful and how long is recovery?"',
    intentTag: 'PATIENT QUESTION',
    answerHighlight:
      'Single-tooth dental implant placement is performed under local anesthesia with minimal discomfort, and most patients return to normal routines within 24 to 48 hours.',
    answerText:
      'Complete bone integration (osseointegration) takes 8 to 12 weeks before the permanent crown is fitted.',
    sourceDomain: 'yourwebsite.com',
    sourceUrlPath: '/treatments/dental-implants-faq',
    formatBadge: 'People Also Ask + Voice Assistant',
  },
];

/* ==========================================================================
   SECTION 2 — SEARCH EVOLUTION STRIP DATA (4 STAGES)
   ========================================================================== */
interface EvolutionStageSpec {
  step: string;
  eraTag: string;
  title: string;
  subtitle: string;
  description: string;
  visualType: 'ten-links' | 'featured-snippet' | 'voice-readout' | 'ai-overview';
}

const SEARCH_EVOLUTION_STAGES: EvolutionStageSpec[] = [
  {
    step: '01',
    eraTag: 'CLASSIC SEARCH',
    title: 'Ten Blue Links',
    subtitle: 'Users scrolled and clicked 4–5 tabs to piece together an answer.',
    description:
      'Traditional search engines returned a list of 10 web pages. Ranking #3 or #4 still earned plenty of clicks because buyers had to open multiple articles.',
    visualType: 'ten-links',
  },
  {
    step: '02',
    eraTag: 'POSITION #0',
    title: 'Featured Snippets',
    subtitle: 'Search engines began extracting a single answer box above Rank #1.',
    description:
      'Clean definitions, numbered steps, and comparison tables get pulled directly to the top of the page—capturing attention before standard organic links.',
    visualType: 'featured-snippet',
  },
  {
    step: '03',
    eraTag: 'CONVERSATIONAL',
    title: 'Voice Answers',
    subtitle: 'Phones, cars, and smart speakers read out just one concise answer.',
    description:
      'When someone asks a full spoken question on mobile or in-car assistants, the device doesn’t read ten links—it reads the single clearest answer-ready source.',
    visualType: 'voice-readout',
  },
  {
    step: '04',
    eraTag: 'GENERATIVE ERA',
    title: 'AI Overviews & Answers',
    subtitle: 'Synthesized answers at the top of results citing trusted sources.',
    description:
      'Modern search synthesizes an immediate answer block from structured, high-clarity pages and highlights the cited source cards right alongside it.',
    visualType: 'ai-overview',
  },
];

/* ==========================================================================
   SECTION 3 — ANSWER FORMATS THAT WIN: SNIPPET LAB (5 TABS)
   ========================================================================== */
interface SnippetFormatSpec {
  id: 'definition' | 'how-to' | 'comparison' | 'list' | 'quick-fact';
  tabLabel: string;
  badgeText: string;
  bestForQuestions: string;
  sampleQuestionHeading: string;
  wordCountTarget: string;
  schemaUsed: string;
  howWeWriteItTips: string[];
}

const SNIPPET_FORMATS: SnippetFormatSpec[] = [
  {
    id: 'definition',
    tabLabel: 'Definition',
    badgeText: '40–60 WORD PARAGRAPH',
    bestForQuestions: '"What is...", "Why does...", "How does [X] work?"',
    sampleQuestionHeading: 'What is Answer Engine Optimization (AEO)?',
    wordCountTarget: '48 words • Direct "is" statement in sentence #1',
    schemaUsed: 'Article + FAQPage + DefinedTerm JSON-LD',
    howWeWriteItTips: [
      'Answer the core question directly in the first 45–55 words without throat-clearing intros',
      'Use the exact customer question as a clean H2 or H3 heading directly above the paragraph',
      'Start immediately with "[Topic] is..." so answer parsers can extract the block cleanly',
    ],
  },
  {
    id: 'how-to',
    tabLabel: 'How-To',
    badgeText: 'NUMBERED STEP SEQUENCE',
    bestForQuestions: '"How to...", "Steps to set up...", "How do I migrate..."',
    sampleQuestionHeading: 'How to Migrate an Online Store Without Losing Rankings',
    wordCountTarget: '5–7 concise steps • Imperative verb lead-ins',
    schemaUsed: 'HowTo + StepList Structured Data',
    howWeWriteItTips: [
      'Format each step with a bold action-verb title ("1. Crawl & Export All Legacy URLs")',
      'Keep total steps between 4 and 8 so the entire list fits inside the answer preview box',
      'Wrap the sequence in semantic <ol><li> tags paired with matching HowTo schema',
    ],
  },
  {
    id: 'comparison',
    tabLabel: 'Comparison',
    badgeText: 'STRUCTURED HTML TABLE',
    bestForQuestions: '"[Option A] vs [Option B]", "Cost comparison", "Which plan..."',
    sampleQuestionHeading: 'Custom Web App vs Off-the-Shelf SaaS Comparison',
    wordCountTarget: '3–4 columns • 4–6 clear comparison rows',
    schemaUsed: 'Table + Dataset + ItemList Schema',
    howWeWriteItTips: [
      'Use real semantic <table>, <thead>, and <tbody> markup—never CSS-only div grids or images',
      'Place the evaluation criteria in column 1 and concise, scannable values in columns 2–3',
      'Include a 1-sentence verdict summary right above the table for dual snippet eligibility',
    ],
  },
  {
    id: 'list',
    tabLabel: 'List',
    badgeText: 'BULLETED CHECKLIST',
    bestForQuestions: '"Best tools for...", "Types of...", "Checklist for..."',
    sampleQuestionHeading: '7 Essential Elements of an Answer-Ready Service Page',
    wordCountTarget: '5–8 bullets • Parallel H3 subheadings or bold lead-ins',
    schemaUsed: 'ItemList + FAQPage JSON-LD',
    howWeWriteItTips: [
      'Use consistent H3 headings or bold item prefixes so search engines pull a clean summary list',
      'Include 6 to 8 items so search engines display a "More items..." link that drives high CTR',
      'Keep each bullet focused on one concrete takeaway rather than multi-sentence blocks',
    ],
  },
  {
    id: 'quick-fact',
    tabLabel: 'Quick Fact',
    badgeText: 'ONE-LINE DATA & METRIC',
    bestForQuestions: '"How much does...", "How long does...", "What is the average..."',
    sampleQuestionHeading: 'How Long Does a Custom Business Website Take to Build?',
    wordCountTarget: '18–30 words • Bold numerical range up front',
    schemaUsed: 'FAQPage + Service Specification Schema',
    howWeWriteItTips: [
      'Lead with the exact numerical range ("4 to 8 weeks" or "₹45,000 to ₹1,80,000") in bold',
      'Follow immediately with the 2–3 variables that influence that range (scope, pages, integrations)',
      'Avoid vague "it depends" openings—give a clear benchmark range first, then explain context',
    ],
  },
];

/* ==========================================================================
   SECTION 4 — THE QUESTION MAP: PEOPLE ALSO ASK TREE (3 INDUSTRIES, 3 LEVELS)
   ========================================================================== */
type QuestionIntentType = 'Cost' | 'Process' | 'Comparison' | 'Local';

interface QuestionNodeL3 {
  id: string;
  question: string;
  intent: QuestionIntentType;
}

interface QuestionNodeL2 {
  id: string;
  question: string;
  intent: QuestionIntentType;
  answerPreview: string;
  children: QuestionNodeL3[];
}

interface QuestionTreePreset {
  id: 'website-services' | 'dental-clinic' | 'online-store';
  industryLabel: string;
  rootId: string;
  rootQuestion: string;
  rootIntent: QuestionIntentType;
  rootAnswerSummary: string;
  branches: QuestionNodeL2[];
}

const QUESTION_TREE_PRESETS: QuestionTreePreset[] = [
  {
    id: 'website-services',
    industryLabel: 'Website Services',
    rootId: 'web-root',
    rootQuestion: 'How much does a custom business website cost in India?',
    rootIntent: 'Cost',
    rootAnswerSummary:
      'A custom business website typically ranges from ₹45,000 for a 5–8 page starter site to ₹1,80,000+ for custom Next.js builds with CRM and multilingual workflows.',
    branches: [
      {
        id: 'web-b1',
        question: 'Is Next.js better than WordPress for B2B SEO?',
        intent: 'Comparison',
        answerPreview:
          'Next.js delivers faster server-side rendering and Core Web Vitals out of the box, while custom WordPress excels when marketing teams need daily block editing.',
        children: [
          {
            id: 'web-b1-c1',
            question: 'Can a WordPress site score 90+ on Google PageSpeed?',
            intent: 'Process',
          },
          {
            id: 'web-b1-c2',
            question: 'How much does annual website maintenance cost?',
            intent: 'Cost',
          },
        ],
      },
      {
        id: 'web-b2',
        question: 'How long does it take to design and launch a 15-page site?',
        intent: 'Process',
        answerPreview:
          'A 15-page custom website takes 4 to 6 weeks across UX wireframing, visual design, responsive engineering, and QA testing.',
        children: [
          {
            id: 'web-b2-c1',
            question: 'What do I need to prepare before starting a website project?',
            intent: 'Process',
          },
          {
            id: 'web-b2-c2',
            question: 'Will redesigning my website hurt my current Google rankings?',
            intent: 'Comparison',
          },
        ],
      },
      {
        id: 'web-b3',
        question: 'Which web development agency near me includes technical SEO?',
        intent: 'Local',
        answerPreview:
          'Look for an engineering-led agency that builds semantic HTML5, JSON-LD schema, XML sitemaps, and 301 redirect maps directly into the launch scope.',
        children: [
          {
            id: 'web-b3-c1',
            question: 'Do I own 100% of the source code and domain after launch?',
            intent: 'Process',
          },
          {
            id: 'web-b3-c2',
            question: 'Should I bundle SEO and website maintenance together?',
            intent: 'Cost',
          },
        ],
      },
    ],
  },
  {
    id: 'dental-clinic',
    industryLabel: 'Dental Clinic',
    rootId: 'dental-root',
    rootQuestion: 'How much do full-mouth dental implants cost and how long do they last?',
    rootIntent: 'Cost',
    rootAnswerSummary:
      'Single dental implants typically start from ₹25,000–₹45,000 per tooth depending on titanium brand, and last 20+ years with proper hygiene.',
    branches: [
      {
        id: 'den-b1',
        question: 'What is the step-by-step process for getting a dental implant?',
        intent: 'Process',
        answerPreview:
          'The 3-stage process includes a 3D CBCT bone scan, guided titanium post placement under local anesthesia, and final crown attachment after healing.',
        children: [
          {
            id: 'den-b1-c1',
            question: 'Can you get same-day teeth with immediate-load implants?',
            intent: 'Comparison',
          },
          {
            id: 'den-b1-c2',
            question: 'What foods should you avoid in the first 7 days after surgery?',
            intent: 'Process',
          },
        ],
      },
      {
        id: 'den-b2',
        question: 'Dental implants vs dental bridges: which is better long-term?',
        intent: 'Comparison',
        answerPreview:
          'Dental implants preserve jawbone density without grinding down adjacent healthy teeth, whereas bridges have a lower upfront cost.',
        children: [
          {
            id: 'den-b2-c1',
            question: 'Are zirconia crowns better than porcelain-fused-to-metal?',
            intent: 'Comparison',
          },
          {
            id: 'den-b2-c2',
            question: 'Does health insurance or EMI cover dental implant surgery?',
            intent: 'Cost',
          },
        ],
      },
      {
        id: 'den-b3',
        question: 'How to choose an implant specialist clinic with 3D CBCT near me?',
        intent: 'Local',
        answerPreview:
          'Verify prosthodontist or implantologist credentials, in-house 3D CBCT imaging, sterilization protocols, and verified patient reviews.',
        children: [
          {
            id: 'den-b3-c1',
            question: 'Is dental implant surgery safe for diabetic patients?',
            intent: 'Process',
          },
          {
            id: 'den-b3-c2',
            question: 'How soon can I book an implant consultation this week?',
            intent: 'Local',
          },
        ],
      },
    ],
  },
  {
    id: 'online-store',
    industryLabel: 'Online Store',
    rootId: 'store-root',
    rootQuestion: 'Should we build our D2C online store on Shopify or WooCommerce?',
    rootIntent: 'Comparison',
    rootAnswerSummary:
      'Shopify is ideal for fast, managed D2C checkouts and app ecosystems, while WooCommerce offers full database ownership and custom PHP workflows.',
    branches: [
      {
        id: 'sto-b1',
        question: 'How do we reduce cart abandonment on mobile checkout?',
        intent: 'Process',
        answerPreview:
          'Enable 1-tap UPI/wallet express checkout, show transparent delivery dates on the product page, and trigger automated WhatsApp cart recovery.',
        children: [
          {
            id: 'sto-b1-c1',
            question: 'Which Indian payment gateway has the highest UPI success rate?',
            intent: 'Comparison',
          },
          {
            id: 'sto-b1-c2',
            question: 'How do we prevent fake COD orders and reduce RTO losses?',
            intent: 'Process',
          },
        ],
      },
      {
        id: 'sto-b2',
        question: 'How much does it cost to migrate 2,000 SKUs to Shopify?',
        intent: 'Cost',
        answerPreview:
          'Migrating a 2,000-SKU catalog with product variants, customer history, and 301 SEO redirects typically takes 4 to 6 weeks.',
        children: [
          {
            id: 'sto-b2-c1',
            question: 'Will our product URLs lose Google rankings during migration?',
            intent: 'Process',
          },
          {
            id: 'sto-b2-c2',
            question: 'Can we connect Tally or SAP ERP inventory in real time?',
            intent: 'Process',
          },
        ],
      },
      {
        id: 'sto-b3',
        question: 'How do D2C brands get products cited in AI shopping searches?',
        intent: 'Comparison',
        answerPreview:
          'Implement complete Product, Offer, and AggregateRating JSON-LD schema alongside clear comparison tables and ingredient/material FAQs.',
        children: [
          {
            id: 'sto-b3-c1',
            question: 'What schema markup shows product price and stock in search?',
            intent: 'Process',
          },
          {
            id: 'sto-b3-c2',
            question: 'Do customer Q&A sections on product pages improve AEO?',
            intent: 'Comparison',
          },
        ],
      },
    ],
  },
];

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */
interface AeoServicesProps {
  onOpenQuoteModal?: (service?: string) => void;
}

const AeoServices: React.FC<AeoServicesProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Single source of truth from Services.tsx */
  const aeoServiceItem = useMemo(
    () => services.find((s) => s.slug === 'aeo-services'),
    []
  );

  /* Section 1: Hero Voice-Assistant Q&A Pair State (Auto-cycles or manual click) */
  const [activeVoiceIndex, setActiveVoiceIndex] = useState<number>(0);
  const [isOrbThinking, setIsOrbThinking] = useState<boolean>(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setIsOrbThinking(true);
      setTimeout(() => {
        setActiveVoiceIndex((prev) => (prev + 1) % HERO_VOICE_ANSWERS.length);
        setIsOrbThinking(false);
      }, 450);
    }, 6500);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const handleSelectHeroVoice = (idx: number) => {
    if (idx === activeVoiceIndex) return;
    if (!shouldReduceMotion) {
      setIsOrbThinking(true);
      setTimeout(() => {
        setActiveVoiceIndex(idx);
        setIsOrbThinking(false);
      }, 260);
    } else {
      setActiveVoiceIndex(idx);
    }
  };

  const currentHeroPair = HERO_VOICE_ANSWERS[activeVoiceIndex] || HERO_VOICE_ANSWERS[0];

  /* Section 3: Snippet Format Lab Tab State */
  const [selectedFormatId, setSelectedFormatId] = useState<
    SnippetFormatSpec['id']
  >('definition');
  const activeSnippetFormat = useMemo(
    () =>
      SNIPPET_FORMATS.find((f) => f.id === selectedFormatId) ||
      SNIPPET_FORMATS[0],
    [selectedFormatId]
  );

  /* Section 4: Question Map / PAA Tree State */
  const [selectedTreeIndustry, setSelectedTreeIndustry] = useState<
    QuestionTreePreset['id']
  >('website-services');
  const activeTreePreset = useMemo(
    () =>
      QUESTION_TREE_PRESETS.find((t) => t.id === selectedTreeIndustry) ||
      QUESTION_TREE_PRESETS[0],
    [selectedTreeIndustry]
  );

  const [expandedBranches, setExpandedBranches] = useState<string[]>([
    QUESTION_TREE_PRESETS[0].branches[0].id,
    QUESTION_TREE_PRESETS[0].branches[1].id,
  ]);

  const handleIndustrySwitch = (indId: QuestionTreePreset['id']) => {
    setSelectedTreeIndustry(indId);
    const found =
      QUESTION_TREE_PRESETS.find((t) => t.id === indId) ||
      QUESTION_TREE_PRESETS[0];
    // Expand first two branches by default so the tree feels alive immediately
    setExpandedBranches([found.branches[0].id, found.branches[1].id]);
  };

  const toggleBranchExpand = (branchId: string) => {
    setExpandedBranches((prev) =>
      prev.includes(branchId)
        ? prev.filter((id) => id !== branchId)
        : [...prev, branchId]
    );
  };

  const expandAllBranches = () => {
    setExpandedBranches(activeTreePreset.branches.map((b) => b.id));
  };

  /* Calculate live mapped question counter (1 root + 3 L2 branches + 2 L3 per expanded branch) */
  const mappedQuestionCount = useMemo(() => {
    let count = 1 + activeTreePreset.branches.length;
    activeTreePreset.branches.forEach((b) => {
      if (expandedBranches.includes(b.id)) {
        count += b.children.length;
      }
    });
    return count;
  }, [activeTreePreset, expandedBranches]);

  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Global Quote Modal Trigger helper */
  const triggerQuoteModal = (preselectedService?: string) => {
    const svcLabel = preselectedService || aeoServiceItem?.name || 'AEO Services';
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
          name: aeoServiceItem?.name || 'AEO Services (Answer Engine Optimization)',
          description:
            aeoServiceItem?.description ||
            'Answer Engine Optimization (AEO) to structure your content for Featured Snippets, People Also Ask boxes, voice search assistants, and AI-generated overviews.',
          provider: {
            '@type': 'Organization',
            name: 'WebXCode',
            url: 'https://webxcode.com',
          },
          serviceType: 'Answer Engine Optimization (AEO)',
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
              name: aeoServiceItem?.name || 'AEO Services',
              item: 'https://webxcode.com/services/aeo-services',
            },
          ],
        },
      ],
    }),
    [aeoServiceItem]
  );

  return (
    <main className="flex-1 bg-white text-navy">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: BE THE ANSWER (bg: #1e242e navy)
         ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Radial blue glow + subtle grid */}
        <div className="absolute -top-24 right-1/4 w-[620px] h-[620px] blue-glow-strong pointer-events-none opacity-75" />
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
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </li>
              <li className="text-primary-100 font-semibold" aria-current="page">
                {aeoServiceItem?.name || 'AEO Services'}
              </li>
            </ol>
          </nav>

          {/* 50% / 50% Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 50% (6 cols on lg) */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>AEO · ANSWER ENGINE OPTIMIZATION</span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-tight">
                When Customers Ask,{' '}
                <span className="text-primary">Be the Answer</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65]">
                We structure your content so search engines, voice assistants and AI overviews can
                pick your business as the answer — for the questions your customers ask every day.
              </p>

              {/* Two CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#answer-check"
                  onClick={(e) => {
                    const target = document.getElementById('answer-check');
                    if (!target) {
                      e.preventDefault();
                      triggerQuoteModal('Free Answer Readiness Check (AEO)');
                    }
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Get a Free Answer Readiness Check</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#snippet-formats"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>See How Answers Work</span>
                </a>
              </div>

              {/* Small Row: Featured Snippets · People Also Ask · Voice Search · AI Overviews */}
              <div className="mt-9 pt-7 border-t border-white/10">
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/55 mb-3">
                  ANSWER-READY VISIBILITY SURFACES
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    'Featured Snippets',
                    'People Also Ask',
                    'Voice Search',
                    'AI Overviews',
                  ].map((surface, i) => (
                    <React.Fragment key={surface}>
                      <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-[13px] font-semibold text-white/90">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span>{surface}</span>
                      </span>
                      {i < 3 && (
                        <span className="text-white/30 font-bold hidden sm:inline" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 50% (6 cols on lg): Voice-Assistant & Answer Orb Scene */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] bg-white/[0.06] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                {/* Top Scene Header + 3 Example Switcher Pills */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[11px] font-bold text-white/80 uppercase tracking-wider">
                      ANSWER ENGINE SIMULATOR
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-1.5"
                    role="tablist"
                    aria-label="Sample customer questions"
                  >
                    {HERO_VOICE_ANSWERS.map((item, idx) => {
                      const isActive = idx === activeVoiceIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => handleSelectHeroVoice(idx)}
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

                {/* 1. User Speech Bubble (Customer Question) */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Mic className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 rounded-2xl rounded-tl-xs bg-white/[0.08] border border-white/15 p-3.5 sm:p-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100">
                        CUSTOMER SPOKEN / TYPED QUESTION
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary/25 text-primary-100 font-mono text-[10px] font-bold">
                        {currentHeroPair.intentTag}
                      </span>
                    </div>
                    <p className="text-[14px] sm:text-[15px] font-bold text-white leading-snug">
                      {currentHeroPair.spokenQuestion}
                    </p>
                  </div>
                </div>

                {/* 2. Glowing Blue Orb + Animated Voice Waveform Scene */}
                <div
                  className="my-5 py-4 px-4 rounded-2xl bg-[#141a24] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden"
                  aria-hidden="true"
                >
                  {/* Ambient radial glow */}
                  <div className="w-36 h-36 rounded-full bg-primary/25 blur-2xl absolute pointer-events-none" />

                  {/* Pulsing Blue Orb */}
                  <div className="relative flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-full border border-primary/40 bg-primary/10 animate-ping absolute"
                      style={{ animationDuration: '2.8s' }}
                    />
                    <div className="w-16 h-16 rounded-full border border-primary/60 bg-primary/20 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-primary shadow-[0_0_25px_#0571c2] flex items-center justify-center">
                        {isOrbThinking ? (
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"
                              style={{ animationDelay: '120ms' }}
                            />
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"
                              style={{ animationDelay: '240ms' }}
                            />
                          </div>
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Animated Voice Waveform Bars beneath the Orb */}
                  <div className="mt-4 flex items-center justify-center gap-1 h-7">
                    {[
                      10, 18, 26, 14, 24, 28, 16, 22, 12, 26, 20, 14, 24, 18, 10,
                    ].map((barHeight, i) => (
                      <motion.span
                        key={i}
                        animate={
                          shouldReduceMotion
                            ? { height: barHeight }
                            : {
                                height: [
                                  Math.max(6, barHeight * 0.45),
                                  barHeight,
                                  Math.max(8, barHeight * 0.6),
                                ],
                              }
                        }
                        transition={{
                          duration: 1.1,
                          repeat: Infinity,
                          delay: i * 0.06,
                          ease: 'easeInOut',
                        }}
                        style={{ height: `${barHeight}px` }}
                        className="w-1 rounded-full bg-primary"
                      />
                    ))}
                  </div>

                  <div className="mt-2 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-100">
                    {isOrbThinking
                      ? 'EXTRACTING STRUCTURED ANSWER...'
                      : 'DIRECT ANSWER SELECTED • SPEAKABLE + FAQ SCHEMA'}
                  </div>
                </div>

                {/* 3. White Answer Card Sliding Up with Source Chip */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHeroPair.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl bg-white text-navy p-4 sm:p-5 border-2 border-primary shadow-xl"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-navy-08">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[10.5px] font-extrabold uppercase">
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span>{currentHeroPair.formatBadge}</span>
                      </span>
                      <span className="font-mono text-[10.5px] font-bold text-navy-60">
                        48-Word Answer Block
                      </span>
                    </div>

                    <p className="text-[13.5px] sm:text-[14px] text-navy leading-relaxed">
                      <strong className="bg-primary-50 text-navy px-1 py-0.5 rounded font-extrabold">
                        {currentHeroPair.answerHighlight}
                      </strong>{' '}
                      <span className="text-navy-70">{currentHeroPair.answerText}</span>
                    </p>

                    {/* Highlighted Source Chip */}
                    <div className="mt-3.5 pt-3 border-t border-navy-08 flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-white text-[12px] font-bold shadow-xs">
                        <Globe className="w-3.5 h-3.5" />
                        <span>
                          Source: <strong className="underline">{currentHeroPair.sourceDomain}</strong>
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-navy-60 truncate">
                        {currentHeroPair.sourceUrlPath}
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
         SECTION 2 — FROM LINKS TO ANSWERS: SEARCH EVOLUTION STRIP (bg: #ffffff)
         ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              HOW SEARCH EVOLVED
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Search Stopped Showing Links.{' '}
              <span className="text-primary">It Started Giving Answers.</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Buyers no longer type two-word fragments and browse ten different tabs. They ask
              complete questions—and search engines extract the single clearest answer right at the
              top.
            </p>
          </div>

          {/* 4-Card Evolution Strip Connected by Arrow Line */}
          <div className="relative">
            {/* Horizontal connecting line on desktop */}
            <div
              className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-primary/25 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {SEARCH_EVOLUTION_STAGES.map((stage, idx) => (
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
                    {/* Stage Step & Era Pill */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`px-2.5 py-1 rounded-full font-mono text-[10.5px] font-extrabold uppercase tracking-wider ${
                          idx === 3
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        STAGE {stage.step} • {stage.eraTag}
                      </span>
                      {idx < 3 && (
                        <ArrowRight
                          className="w-4 h-4 text-primary hidden lg:inline"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Mini Visual Illustration Morphing From Links -> Answer Box -> Voice -> AI */}
                    <div
                      className={`h-32 rounded-2xl p-3.5 mb-4 flex flex-col justify-center border ${
                        idx === 3
                          ? 'bg-white/[0.06] border-white/15'
                          : 'bg-primary-50/50 border-primary-100'
                      }`}
                      aria-hidden="true"
                    >
                      {stage.visualType === 'ten-links' && (
                        <div className="space-y-2">
                          {[1, 2, 3].map((row) => (
                            <div
                              key={row}
                              className="p-2 rounded-lg bg-white border border-navy-08 flex items-center gap-2"
                            >
                              <span className="w-2 h-2 rounded-full bg-primary/50 shrink-0" />
                              <div className="flex-1 space-y-1">
                                <div className="h-2 w-2/3 rounded bg-primary/40" />
                                <div className="h-1.5 w-full rounded bg-navy-15" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {stage.visualType === 'featured-snippet' && (
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-xl bg-white border-2 border-primary shadow-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-[9px] font-extrabold text-primary">
                                POSITION #0 ANSWER BOX
                              </span>
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <div className="h-2 w-full rounded bg-navy/80 mb-1" />
                            <div className="h-2 w-4/5 rounded bg-primary/60" />
                          </div>
                          <div className="p-1.5 rounded-lg bg-white/70 border border-navy-08 opacity-60">
                            <div className="h-1.5 w-1/2 rounded bg-navy-30" />
                          </div>
                        </div>
                      )}

                      {stage.visualType === 'voice-readout' && (
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2 shadow-sm">
                            <Volume2 className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-1 h-4 mb-1.5">
                            {[8, 14, 18, 10, 16, 12, 8].map((h, barIdx) => (
                              <span
                                key={barIdx}
                                style={{ height: `${h}px` }}
                                className="w-1 rounded-full bg-primary"
                              />
                            ))}
                          </div>
                          <span className="font-mono text-[9.5px] font-bold text-navy">
                            &ldquo;According to yourwebsite.com...&rdquo;
                          </span>
                        </div>
                      )}

                      {stage.visualType === 'ai-overview' && (
                        <div className="space-y-2 text-left">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 font-mono text-[9.5px] font-bold text-primary-100">
                              <Sparkles className="w-3 h-3 text-primary" />
                              <span>AI SYNTHESIZED ANSWER</span>
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-primary text-white font-mono text-[8.5px] font-bold">
                              CITED
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-white/10 border border-white/15 space-y-1">
                            <div className="h-2 w-full rounded bg-white/80" />
                            <div className="h-2 w-3/4 rounded bg-primary-100" />
                          </div>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/30 border border-primary text-[9.5px] font-mono text-white">
                            <span>[1] yourwebsite.com</span>
                          </div>
                        </div>
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
                      className={`mt-1 text-[13px] font-bold ${
                        idx === 3 ? 'text-primary-100' : 'text-primary'
                      }`}
                    >
                      {stage.subtitle}
                    </p>
                    <p
                      className={`mt-2 text-[13px] leading-relaxed ${
                        idx === 3 ? 'text-white/75' : 'text-navy-70'
                      }`}
                    >
                      {stage.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Summary Callout Bar */}
          <div className="mt-10 rounded-2xl bg-primary-50 border border-primary-100 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-[15px] sm:text-[16px] font-extrabold text-navy">
                Only one answer gets read out or featured.{' '}
                <span className="text-primary">
                  AEO helps you structure your pages to increase your chances of becoming that
                  answer.
                </span>
              </p>
            </div>
            <a
              href="#snippet-formats"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-primary hover:text-navy shrink-0"
            >
              <span>Inspect the 5 Answer Formats</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — ANSWER FORMATS THAT WIN: SNIPPET LAB (bg: #f0f7fd, id: snippet-formats)
         ====================================================================== */}
      <section
        id="snippet-formats"
        className="py-[72px] lg:py-[112px] bg-primary-50 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              THE SNIPPET LAB • 5 WINNING STRUCTURES
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Every Question Has <span className="text-primary">a Winning Format</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Answer engines don’t guess—they look for specific HTML structures that match the
              intent of the question. Switch between the 5 formats below to see how we engineer
              answer-ready blocks.
            </p>
          </div>

          {/* 2-Column Snippet Lab */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column (4 cols on lg): 5 Format Tabs */}
            <div
              className="lg:col-span-4 flex flex-col justify-between gap-2.5"
              role="tablist"
              aria-label="Answer Snippet Formats"
            >
              {SNIPPET_FORMATS.map((fmt, idx) => {
                const isSelected = fmt.id === selectedFormatId;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedFormatId(fmt.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-[20px] border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-navy text-white border-navy shadow-soft'
                        : 'bg-white text-navy border-navy-08 hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-lg font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[16px] font-extrabold">
                            {fmt.tabLabel}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded font-mono text-[9.5px] font-bold ${
                              isSelected
                                ? 'bg-white/15 text-primary-100'
                                : 'bg-primary-50 text-primary'
                            }`}
                          >
                            {fmt.badgeText}
                          </span>
                        </div>
                        <div
                          className={`text-[12px] mt-1 truncate ${
                            isSelected ? 'text-white/75' : 'text-navy-60'
                          }`}
                        >
                          {fmt.bestForQuestions}
                        </div>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-primary translate-x-0.5' : 'text-navy-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column (8 cols on lg): Generic Answer Box Mockup + "How We Write It" 3 Tips */}
            <div className="lg:col-span-8">
              <div className="h-full rounded-[24px] bg-white border border-navy-08 shadow-soft p-6 sm:p-8 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSnippetFormat.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar of Generic Answer Box */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-navy-08">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                            FORMAT: {activeSnippetFormat.tabLabel.toUpperCase()}
                          </span>
                          <span className="font-mono text-[11.5px] font-bold text-navy-60">
                            {activeSnippetFormat.wordCountTarget}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-primary">
                          {activeSnippetFormat.schemaUsed}
                        </span>
                      </div>

                      {/* Generic Answer Box Mockup Window */}
                      <div className="rounded-2xl bg-primary-50/50 border-2 border-primary p-5 sm:p-6">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-mono text-[10.5px] font-extrabold uppercase tracking-wider text-primary">
                            DIRECT ANSWER PREVIEW // POSITION #0
                          </span>
                          <span className="px-2 py-0.5 rounded bg-navy text-white font-mono text-[10px] font-bold">
                            &lt;H2&gt; QUESTION HEADING
                          </span>
                        </div>

                        <h3 className="text-[18px] sm:text-[20px] font-extrabold text-navy mb-3">
                          {activeSnippetFormat.sampleQuestionHeading}
                        </h3>

                        {/* Format 1: Definition (40-60 word paragraph) */}
                        {activeSnippetFormat.id === 'definition' && (
                          <p className="text-[14px] sm:text-[15px] text-navy leading-relaxed bg-white p-4 rounded-xl border border-primary-100">
                            <strong className="bg-primary-100/80 text-navy px-1 rounded">
                              Answer Engine Optimization (AEO) is the practice of structuring web
                              pages with concise direct answers, semantic headings, and JSON-LD
                              schema
                            </strong>{' '}
                            so search engines, voice assistants, and AI overviews can extract and
                            cite your content when customers ask specific questions.
                          </p>
                        )}

                        {/* Format 2: How-To (Numbered steps) */}
                        {activeSnippetFormat.id === 'how-to' && (
                          <ol className="space-y-2 bg-white p-4 rounded-xl border border-primary-100 text-[13.5px] text-navy">
                            {[
                              '1. Audit & Export Legacy URLs: Crawl every existing product, category, and blog URL before touching staging.',
                              '2. Map 1-to-1 301 Redirects: Match every old URL to its exact new destination to preserve link equity.',
                              '3. Migrate Product & FAQ Schema: Carry over Product, Offer, and AggregateRating JSON-LD without errors.',
                              '4. Benchmark Core Web Vitals: Verify sub-2.0s LCP on mobile before switching DNS live.',
                              '5. Submit Updated XML Sitemaps: Push fresh sitemaps in Search Console and monitor crawl logs for 14 days.',
                            ].map((step) => (
                              <li key={step} className="font-medium leading-snug">
                                <strong className="text-primary">{step.split(':')[0]}:</strong>
                                {step.split(':')[1]}
                              </li>
                            ))}
                          </ol>
                        )}

                        {/* Format 3: Comparison (Small HTML Table) */}
                        {activeSnippetFormat.id === 'comparison' && (
                          <div className="bg-white rounded-xl border border-primary-100 overflow-x-auto">
                            <table className="w-full text-left border-collapse text-[13px]">
                              <thead>
                                <tr className="bg-navy text-white font-mono text-[11px] uppercase">
                                  <th className="p-3">Criteria</th>
                                  <th className="p-3">Custom Web App</th>
                                  <th className="p-3">Off-the-Shelf SaaS</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-navy-08">
                                <tr>
                                  <td className="p-3 font-bold text-navy">Per-Seat License Fees</td>
                                  <td className="p-3 text-primary font-bold">₹0 (Unlimited Users)</td>
                                  <td className="p-3 text-navy-70">Recurring per-user cost</td>
                                </tr>
                                <tr>
                                  <td className="p-3 font-bold text-navy">Custom Workflow Fit</td>
                                  <td className="p-3 text-primary font-bold">100% Tailored</td>
                                  <td className="p-3 text-navy-70">Limited to preset templates</td>
                                </tr>
                                <tr>
                                  <td className="p-3 font-bold text-navy">Code &amp; Data Ownership</td>
                                  <td className="p-3 text-primary font-bold">Full IP Ownership</td>
                                  <td className="p-3 text-navy-70">Vendor-locked hosting</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Format 4: List (Bulleted checklist) */}
                        {activeSnippetFormat.id === 'list' && (
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-4 rounded-xl border border-primary-100 text-[13px] font-semibold text-navy">
                            {[
                              'Question-matched H2 & H3 headings',
                              '45–60 word direct summary block',
                              'Semantic HTML lists & comparison tables',
                              'Validated FAQPage & Service JSON-LD',
                              'Sub-2.0s mobile page load speed',
                              'Verified author & entity credentials',
                            ].map((bullet) => (
                              <li key={bullet} className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                                  <Check className="w-2.5 h-2.5" strokeWidth={3} />
                                </span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Format 5: Quick Fact (One-line fact with bold number) */}
                        {activeSnippetFormat.id === 'quick-fact' && (
                          <div className="bg-white p-4 rounded-xl border border-primary-100">
                            <p className="text-[15px] text-navy leading-relaxed">
                              A custom business website typically takes{' '}
                              <strong className="px-2 py-0.5 rounded bg-primary text-white font-mono font-extrabold">
                                4 to 8 weeks
                              </strong>{' '}
                              from initial discovery to launch, depending on page count, custom UI
                              animations, and CRM/ERP integrations.
                            </p>
                          </div>
                        )}

                        {/* Source Attribution Footer inside Answer Box */}
                        <div className="mt-3.5 pt-3 border-t border-primary-100 flex flex-wrap items-center justify-between gap-2 text-[12px]">
                          <span className="font-bold text-primary">
                            Source: yourwebsite.com › guides › {activeSnippetFormat.id}
                          </span>
                          <span className="font-mono text-[11px] text-navy-60">
                            Answer-Ready Markup ✓
                          </span>
                        </div>
                      </div>

                      {/* Under the Mockup: "How we write it" — 3 Tips */}
                      <div className="mt-6">
                        <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-navy-60 mb-3">
                          HOW WE WRITE IT ({activeSnippetFormat.tabLabel.toUpperCase()} RULES):
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {activeSnippetFormat.howWeWriteItTips.map((tip) => (
                            <div
                              key={tip}
                              className="p-3.5 rounded-xl bg-primary-50/60 border border-primary-100 flex items-start gap-2.5"
                            >
                              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3" strokeWidth={2.5} />
                              </span>
                              <span className="text-[12.5px] text-navy font-medium leading-snug">
                                {tip}
                              </span>
                            </div>
                          ))}
                        </div>
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
         SECTION 4 — THE QUESTION MAP: PEOPLE ALSO ASK TREE (bg: #ffffff)
         ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Industry Switcher Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                PEOPLE ALSO ASK TREE • QUESTION RESEARCH
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                We Map <span className="text-primary">Every Question</span> Your Customers Ask
              </h2>
              <p className="mt-3 text-[16px] text-navy-70 leading-[1.65]">
                One buyer question branches into dozens of follow-up searches. Click any question
                bubble below to expand its Level-3 follow-up branches—or switch sample industries.
              </p>
            </div>

            {/* Industry Switcher Pills */}
            <div className="flex flex-col sm:items-end gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-navy-60">
                SWITCH SAMPLE INDUSTRY:
              </span>
              <div
                className="inline-flex flex-wrap gap-2 p-1.5 rounded-2xl bg-primary-50 border border-primary-100"
                role="tablist"
                aria-label="Sample Industry Question Sets"
              >
                {QUESTION_TREE_PRESETS.map((preset) => {
                  const isSelected = preset.id === selectedTreeIndustry;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => handleIndustrySwitch(preset.id)}
                      className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-white shadow-xs'
                          : 'text-navy hover:text-primary'
                      }`}
                    >
                      {preset.industryLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Question Tree + Desktop Side Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Interactive 3-Level Question Tree */}
            <div className="lg:col-span-8 rounded-[24px] bg-primary-50/40 border border-primary-100 p-5 sm:p-7">
              {/* Root Question Node (Level 1) */}
              <div className="rounded-2xl bg-navy text-white p-5 sm:p-6 border-2 border-primary shadow-lg relative">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-extrabold uppercase text-primary-100">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <span>LEVEL 01 • CORE BUYER QUESTION</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold uppercase">
                    Intent: {activeTreePreset.rootIntent}
                  </span>
                </div>

                <h3 className="text-[18px] sm:text-[20px] font-extrabold text-white leading-snug">
                  &ldquo;{activeTreePreset.rootQuestion}&rdquo;
                </h3>
                <p className="mt-2 text-[13px] text-white/80 leading-relaxed">
                  {activeTreePreset.rootAnswerSummary}
                </p>
              </div>

              {/* Curved Connector Indicator */}
              <div className="flex items-center justify-between px-4 py-3 text-[12px] font-mono font-bold text-primary">
                <span>├── BRANCHES INTO 3 FOLLOW-UP &ldquo;PEOPLE ALSO ASK&rdquo; CLUSTERS</span>
                <button
                  type="button"
                  onClick={expandAllBranches}
                  className="underline hover:text-navy cursor-pointer"
                >
                  Expand All Branches
                </button>
              </div>

              {/* Level 2 Child Question Bubbles + Expandable Level 3 Branches */}
              <div className="space-y-4">
                {activeTreePreset.branches.map((branch, bIdx) => {
                  const isExpanded = expandedBranches.includes(branch.id);
                  return (
                    <div
                      key={branch.id}
                      className="rounded-2xl bg-white border border-navy-08 shadow-xs p-4 sm:p-5 transition-all"
                    >
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => toggleBranchExpand(branch.id)}
                        className="w-full text-left flex items-start justify-between gap-3 cursor-pointer"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <span className="w-7 h-7 rounded-xl bg-primary-50 text-primary font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                            2.{bIdx + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 rounded bg-primary-50 text-primary font-mono text-[10px] font-extrabold uppercase">
                                {branch.intent}
                              </span>
                              <span className="font-mono text-[11px] text-navy-50">
                                {isExpanded
                                  ? 'Showing 2 follow-up questions'
                                  : 'Click to expand +2 questions'}
                              </span>
                            </div>
                            <h4 className="text-[15.5px] sm:text-[16.5px] font-extrabold text-navy leading-snug">
                              {branch.question}
                            </h4>
                            <p className="mt-1 text-[13px] text-navy-70 leading-relaxed">
                              {branch.answerPreview}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isExpanded
                              ? 'bg-primary text-white'
                              : 'bg-primary-50 text-primary hover:bg-primary hover:text-white'
                          }`}
                        >
                          {isExpanded ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </span>
                      </button>

                      {/* Level 3 Follow-Up Questions */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-3.5 border-t border-navy-08 pl-4 sm:pl-8 border-l-2 border-l-primary/40 space-y-2.5">
                              {branch.children.map((leaf, lIdx) => (
                                <div
                                  key={leaf.id}
                                  className="p-3 rounded-xl bg-primary-50/50 border border-primary-100 flex items-center justify-between gap-3"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="font-mono text-[11px] font-extrabold text-primary shrink-0">
                                      3.{bIdx + 1}.{lIdx + 1}
                                    </span>
                                    <span className="text-[13.5px] font-bold text-navy">
                                      {leaf.question}
                                    </span>
                                  </div>
                                  <span className="px-2 py-0.5 rounded bg-white text-primary border border-primary-100 font-mono text-[10px] font-extrabold shrink-0">
                                    {leaf.intent}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 4 Cols: Side Panel ("From one question to a full content plan") */}
            <div className="lg:col-span-4 rounded-[24px] bg-navy text-white p-6 sm:p-7 shadow-xl sticky top-28">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 font-mono text-[10.5px] font-bold uppercase tracking-wider text-primary-100 mb-4">
                <span>LIVE QUESTION COUNTER</span>
              </div>

              <h3 className="text-[22px] font-extrabold text-white leading-snug">
                From One Question to a <span className="text-primary">Full Content Plan</span>
              </h3>

              {/* Dynamic Counter Box */}
              <div className="mt-5 p-5 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-between">
                <div>
                  <div className="text-[34px] font-extrabold text-primary font-mono leading-none tabular-nums">
                    {mappedQuestionCount}
                  </div>
                  <div className="text-[13px] font-bold text-white mt-1">
                    Questions mapped in this tree
                  </div>
                  <div className="text-[11.5px] text-white/65 mt-0.5">
                    Click branches on the left to expand up to 10
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>

              <p className="mt-5 text-[13.5px] text-white/80 leading-relaxed">
                In a full WebXCode AEO engagement, we mine{' '}
                <strong className="text-white">50 to 150+ real customer questions</strong> from
                People Also Ask boxes, Search Console queries, and your sales team—turning each one
                into an answer-ready section or FAQ on your site.
              </p>

              <ul className="mt-4 space-y-2 text-[13px] text-white/90">
                {[
                  'Grouped by Cost, Process, Comparison & Local intent',
                  'Mapped to existing service pages (no bloat)',
                  'Paired with FAQPage & HowTo JSON-LD schema',
                ].map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() =>
                  triggerQuoteModal(
                    `Map My Customers' Questions (${activeTreePreset.industryLabel})`
                  )
                }
                className="mt-6 w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14.5px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer"
              >
                <span>Map My Customers&apos; Questions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AeoServices;
