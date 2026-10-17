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
  RotateCcw,
  ShieldCheck,
  Zap,
  BatteryCharging,
  Grid,
  Sliders,
  Layers,
  Eye,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { aiSolutions } from '@/app/ai-solutions/_components/AISolutions';

/* ============================================================================
   SECTION 1 — HERO: THE COMBINATION ENGINE DATA (REELS: HEADLINE · VISUAL · CTA)
============================================================================ */

interface CombinationCombo {
  id: string;
  variantCode: string;
  headlineReel: string;
  visualReel: string;
  visualBadge: string;
  visualSceneSummary: string;
  ctaReel: string;
  adSizeLabel: string;
  channelFit: string;
}

const HERO_COMBINATIONS: CombinationCombo[] = [
  {
    id: 'combo-1',
    variantCode: 'NV-H1-V2-C1',
    headlineReel: 'Comfort That Lasts',
    visualReel: 'Sofa Lifestyle Room',
    visualBadge: '175 GSM Washed Linen · Solid Oak Frame',
    visualSceneSummary:
      'Sunlit apartment living room featuring the Nova & Co. 3-Seater Linen Sofa in Oatmeal',
    ctaReel: 'Shop the Collection',
    adSizeLabel: '1200×628 · Responsive Display',
    channelFit: 'Google Display & Performance Max',
  },
  {
    id: 'combo-2',
    variantCode: 'NV-H2-V1-C2',
    headlineReel: 'Crafted for Slow Mornings',
    visualReel: 'Macro Weave Close-Up',
    visualBadge: 'Pre-Washed European Flax · Zero Ironing',
    visualSceneSummary:
      'Tactile macro shot of stonewashed Belgian flax linen weave and coconut-shell button closure',
    ctaReel: 'Order Free Swatches',
    adSizeLabel: '300×250 · Medium Rectangle',
    channelFit: 'Google Display & Programmatic',
  },
  {
    id: 'combo-3',
    variantCode: 'NV-H3-V3-C3',
    headlineReel: 'Fits 10×12 ft Apartments',
    visualReel: 'Dimension Spec Overlay',
    visualBadge: '88 cm Smart Depth · Free 7-Day Delivery',
    visualSceneSummary:
      'Architectural elevation blueprint of the Nova & Co. Compact Sofa with exact cm callouts',
    ctaReel: 'See Room Size Guide',
    adSizeLabel: '1920×1080 · YouTube Action Frame',
    channelFit: 'YouTube & Demand Gen',
  },
  {
    id: 'combo-4',
    variantCode: 'NV-H4-V4-C4',
    headlineReel: 'SolidFSC Oak · 10-Year Warranty',
    visualReel: 'Minimal Studio Cutout',
    visualBadge: 'Mortise-and-Tenon Joinery · Easy Care',
    visualSceneSummary:
      'High-contrast studio silhouette of the Fluted Oak Entry Bench with warranty seal',
    ctaReel: 'Explore Living Room',
    adSizeLabel: '728×90 · Leaderboard Banner',
    channelFit: 'Microsoft Ads & Amazon Display',
  },
];

/* ============================================================================
   SECTION 2 — THE VARIATION MATRIX DATA (4 HEADLINES × 4 VISUALS = 16 ADS)
============================================================================ */

interface MatrixHeadline {
  id: string;
  code: 'H1' | 'H2' | 'H3' | 'H4';
  angleLabel: string;
  headlineText: string;
}

const MATRIX_HEADLINES: MatrixHeadline[] = [
  {
    id: 'h1',
    code: 'H1',
    angleLabel: 'Benefit Angle',
    headlineText: 'Comfort That Lasts Every Day',
  },
  {
    id: 'h2',
    code: 'H2',
    angleLabel: 'Space-Fit Angle',
    headlineText: 'Built for Compact 10×12 ft Rooms',
  },
  {
    id: 'h3',
    code: 'H3',
    angleLabel: 'Material Proof',
    headlineText: '100% European Flax & Solid Oak',
  },
  {
    id: 'h4',
    code: 'H4',
    angleLabel: 'Risk-Free Offer',
    headlineText: 'Free Fabric Swatches + 30-Night Trial',
  },
];

interface MatrixVisual {
  id: string;
  code: 'V1' | 'V2' | 'V3' | 'V4';
  title: string;
  layoutType: string;
  visualDescription: string;
}

const MATRIX_VISUALS: MatrixVisual[] = [
  {
    id: 'v1',
    code: 'V1',
    title: 'Product Close-Up',
    layoutType: 'Macro Texture Split',
    visualDescription: 'Tight crop on washed linen weave + solid oak joinery badge',
  },
  {
    id: 'v2',
    code: 'V2',
    title: 'Lifestyle Room',
    layoutType: 'Full-Bleed Editorial',
    visualDescription: 'Warm sunlit living room with sofa, jute rug & stoneware mug',
  },
  {
    id: 'v3',
    code: 'V3',
    title: 'Offer Badge Layout',
    layoutType: 'Conversion Callout Card',
    visualDescription: 'Clean product cutout paired with high-contrast spec & trial pill',
  },
  {
    id: 'v4',
    code: 'V4',
    title: 'Minimal Text-Only',
    layoutType: 'Swiss Typographic Poster',
    visualDescription: 'Bold navy/blue architectural typography with dimension ruler',
  },
];

// Top 4 strongest headline x visual combinations highlighted when "Test priority" is toggled
const PRIORITY_CELL_IDS = new Set<string>([
  'NV-H1-V2', // Benefit + Lifestyle Room
  'NV-H2-V3', // Space-Fit + Offer/Dimension Badge
  'NV-H3-V1', // Material Proof + Product Close-Up
  'NV-H4-V2', // Free Swatches Offer + Lifestyle Room
]);

/* ============================================================================
   SECTION 3 — BEAT CREATIVE FATIGUE: THE BATTERY & 12-WEEK CTR DATA
============================================================================ */

interface FatigueWeekPoint {
  week: string;
  weekNum: number;
  noRefreshCtr: number; // Steadily declining dashed navy-tint line
  aiRefreshCtr: number; // Sawtooth solid blue line staying high
  isRefreshPoint: boolean;
  refreshBatchNote?: string;
}

const FATIGUE_TIMELINE_POINTS: FatigueWeekPoint[] = [
  { week: 'W1', weekNum: 1, noRefreshCtr: 1.15, aiRefreshCtr: 1.15, isRefreshPoint: false },
  { week: 'W2', weekNum: 2, noRefreshCtr: 1.08, aiRefreshCtr: 1.12, isRefreshPoint: false },
  { week: 'W3', weekNum: 3, noRefreshCtr: 0.92, aiRefreshCtr: 0.96, isRefreshPoint: false },
  {
    week: 'W4',
    weekNum: 4,
    noRefreshCtr: 0.78,
    aiRefreshCtr: 1.24,
    isRefreshPoint: true,
    refreshBatchNote: 'Refresh #1: Swapped in 6 Lifestyle + Dimension variants',
  },
  { week: 'W5', weekNum: 5, noRefreshCtr: 0.69, aiRefreshCtr: 1.19, isRefreshPoint: false },
  { week: 'W6', weekNum: 6, noRefreshCtr: 0.61, aiRefreshCtr: 1.05, isRefreshPoint: false },
  {
    week: 'W7',
    weekNum: 7,
    noRefreshCtr: 0.54,
    aiRefreshCtr: 1.28,
    isRefreshPoint: true,
    refreshBatchNote: 'Refresh #2: Launched Free Swatch Pack CTA angle',
  },
  { week: 'W8', weekNum: 8, noRefreshCtr: 0.49, aiRefreshCtr: 1.22, isRefreshPoint: false },
  { week: 'W9', weekNum: 9, noRefreshCtr: 0.44, aiRefreshCtr: 1.09, isRefreshPoint: false },
  {
    week: 'W10',
    weekNum: 10,
    noRefreshCtr: 0.4,
    aiRefreshCtr: 1.31,
    isRefreshPoint: true,
    refreshBatchNote: 'Refresh #3: Monsoon Easy-Care Linen benefit hook',
  },
  { week: 'W11', weekNum: 11, noRefreshCtr: 0.37, aiRefreshCtr: 1.26, isRefreshPoint: false },
  { week: 'W12', weekNum: 12, noRefreshCtr: 0.34, aiRefreshCtr: 1.21, isRefreshPoint: false },
];

/* ============================================================================
   SECTION 4 — ON-BRAND, EVERY TIME: THE MAGNETIC BRAND GRID DATA (6 AD DRAFTS)
============================================================================ */

interface BrandGridDraftCard {
  id: string;
  code: string;
  adFormat: string;
  unalignedIssue: string;
  riskyDraftClaim: string;
  approvedBrandCopy: string;
  ctaLabel: string;
  offGridRotationClass: string;
}

const MAGNETIC_BRAND_DRAFTS: BrandGridDraftCard[] = [
  {
    id: 'draft-1',
    code: 'DRF-01',
    adFormat: '300×250 Display',
    unalignedIssue: 'Logo in bottom-right · Unapproved superlative claim',
    riskyDraftClaim: '“#1 BEST SOFA IN INDIA — 90% OFF TODAY!!”',
    approvedBrandCopy: '“Crafted from 175 GSM European Flax Linen · Built for Everyday Living”',
    ctaLabel: 'Shop Linen Sofas →',
    offGridRotationClass: '-rotate-2 translate-y-1',
  },
  {
    id: 'draft-2',
    code: 'DRF-02',
    adFormat: '1200×628 PMax Asset',
    unalignedIssue: 'Off-grid headline · Unverified warranty promise',
    riskyDraftClaim: '“Indestructible Forever Frame — Cheapest Price Guaranteed!”',
    approvedBrandCopy: '“Solid FSC-Certified White Oak Frame · Backed by Our 10-Year Warranty”',
    ctaLabel: 'Explore Oak Collection →',
    offGridRotationClass: 'rotate-2 -translate-y-1',
  },
  {
    id: 'draft-3',
    code: 'DRF-03',
    adFormat: '1920×1080 YouTube Card',
    unalignedIssue: 'Wrong font weight · Missing dimension context',
    riskyDraftClaim: '“Fits Literally Any Room Instantly!”',
    approvedBrandCopy: '“Smart 88 cm Seat Depth — Designed for 10×12 ft Urban Living Rooms”',
    ctaLabel: 'View Size Guide →',
    offGridRotationClass: '-rotate-1 translate-x-1',
  },
  {
    id: 'draft-4',
    code: 'DRF-04',
    adFormat: '728×90 Leaderboard',
    unalignedIssue: 'Logo cropped · Pushy urgency countdown',
    riskyDraftClaim: '“BUY IN 5 MINUTES OR LOSE THIS DEAL FOREVER!”',
    approvedBrandCopy: '“Try 5 Free Fabric Swatches at Home Before You Choose Your Sofa”',
    ctaLabel: 'Order Free Swatches →',
    offGridRotationClass: 'rotate-1 -translate-x-1',
  },
  {
    id: 'draft-5',
    code: 'DRF-05',
    adFormat: '160×600 Skyscraper',
    unalignedIssue: 'Cluttered badge · Policy-violating ALL CAPS',
    riskyDraftClaim: '“ZERO CLEANING EVER NEEDED — MAGIC FABRIC!”',
    approvedBrandCopy: '“Easy-Care Removable Slipcovers — Cold Gentle Wash at Home”',
    ctaLabel: 'See Care Guide →',
    offGridRotationClass: '-rotate-2 -translate-y-0.5',
  },
  {
    id: 'draft-6',
    code: 'DRF-06',
    adFormat: '1200×1200 Square Display',
    unalignedIssue: 'Off-palette border · Fake discount anchor',
    riskyDraftClaim: '“Was ₹2,00,000 Now ₹19,999 — Secret Liquidation!”',
    approvedBrandCopy: '“Thoughtful Home Living · Transparent Workshop Pricing & Free Delivery”',
    ctaLabel: 'Browse Bestsellers →',
    offGridRotationClass: 'rotate-2 translate-y-1',
  },
];

/* ============================================================================
   MAIN PAGE COMPONENT
============================================================================ */

interface AiAdCreativesProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const AiAdCreatives: React.FC<AiAdCreativesProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Single Source of Truth from AISolutions.tsx */
  const solutionData = useMemo(() => {
    return (
      aiSolutions.find((s: any) => s.slug === 'ai-ad-creatives') || {
        slug: 'ai-ad-creatives',
        name: 'AI Ad Creatives',
        category: 'AI Marketing' as const,
        badge: null,
        icon: 'Sparkles' as const,
        tagline: 'High-converting display, video & search ad variants built for rapid testing',
        description:
          'Beat creative fatigue across Google Display, YouTube, Performance Max, and e-commerce ad networks. We combine generative visual pipelines with performance copywriting frameworks to deliver dozens of on-brand ad variations ready for structured A/B testing.',
        deliverables: [
          'Multi-aspect-ratio static & motion ad kits (1:1, 4:5, 9:16, 16:9)',
          'Hook, headline & value-proposition visual variants for structured testing',
          'Product feed image enhancement & lifestyle background generation',
          'Strict brand palette, typography & safe-zone compliance checks',
          'Creative fatigue tracking & bi-weekly winning-angle refresh packs',
          'Organized asset delivery with clear naming conventions for media buyers',
        ] as [string, string, string, string, string, string],
        bestFor: [
          'D2C & E-commerce Advertisers',
          'App Install & SaaS Growth Teams',
          'High-Spend Google & YouTube Accounts',
        ] as [string, string, string],
        typicalTimeline: '5–7 business days per creative testing batch',
        keyMetric: '4× more creative concepts tested per media dollar spent (placeholder)',
        relatedIndustries: [
          'ecommerce',
          'fashion-lifestyle',
          'skincare-beauty',
          'food-beverage',
          'gaming-esports',
        ],
        relatedServices: ['performance-marketing', 'google-ads', 'creative-communication'],
        futurePagePath: '/ai-solutions/ai-ad-creatives',
      }
    );
  }, []);

  /* Section 1 — Hero Combination Engine State */
  const [activeComboIndex, setActiveComboIndex] = useState<number>(0);
  const [isSpinningReels, setIsSpinningReels] = useState<boolean>(false);
  const [exploredCounter, setExploredCounter] = useState<number>(1248);
  const [heroAnnouncement, setHeroAnnouncement] = useState<string>(
    'Combination NV-H1-V2-C1 ready: Comfort That Lasts + Sofa Lifestyle Room + Shop the Collection.'
  );

  /* Section 2 — Variation Matrix State (4x4 = 16 cells) */
  const [filledCellCount, setFilledCellCount] = useState<number>(16);
  const [isGeneratingMatrix, setIsGeneratingMatrix] = useState<boolean>(false);
  const [showTestPriority, setShowTestPriority] = useState<boolean>(true);
  const [selectedMatrixCellId, setSelectedMatrixCellId] = useState<string>('NV-H1-V2');
  const [matrixAnnouncement, setMatrixAnnouncement] = useState<string>(
    '16 Nova & Co. ad variations generated across 4 headlines and 4 visuals.'
  );

  /* Section 3 — Battery Charge & Fatigue Cycle State */
  const [batteryChargePct, setBatteryChargePct] = useState<number>(92);
  const [isRechargingBurst, setIsRechargingBurst] = useState<boolean>(false);

  /* Section 4 — Magnetic Brand Grid State */
  const [brandKitApplied, setBrandKitApplied] = useState<boolean>(true);
  const [brandGridAnnouncement, setBrandGridAnnouncement] = useState<string>(
    'Brand Kit applied: all 6 Nova & Co. ad drafts snapped to grid and verified.'
  );

  /* SEO Title & Meta Description */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'AI Ad Creatives | On-Brand Ad Variations for Google, YouTube & Display | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'AI-generated, on-brand ad variations for Google Display, YouTube, Performance Max, Demand Gen, Microsoft Ads and Amazon Ads — tested, refreshed and approved by human creative directors.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Section 1 — Auto-spin reels every ~5 seconds unless reduced motion */
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setIsSpinningReels(true);
      setTimeout(() => {
        setActiveComboIndex((prev) => (prev + 1) % HERO_COMBINATIONS.length);
        setExploredCounter((prev) => prev + 1);
        setIsSpinningReels(false);
      }, 320);
    }, 5000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const handleManualSpin = () => {
    const nextIdx = (activeComboIndex + 1) % HERO_COMBINATIONS.length;
    const nextCombo = HERO_COMBINATIONS[nextIdx];
    if (shouldReduceMotion) {
      setActiveComboIndex(nextIdx);
      setExploredCounter((prev) => prev + 1);
      setHeroAnnouncement(
        `Combination ${nextCombo.variantCode}: ${nextCombo.headlineReel} + ${nextCombo.visualReel} + ${nextCombo.ctaReel}`
      );
      return;
    }
    setIsSpinningReels(true);
    setTimeout(() => {
      setActiveComboIndex(nextIdx);
      setExploredCounter((prev) => prev + 1);
      setIsSpinningReels(false);
      setHeroAnnouncement(
        `Combination ${nextCombo.variantCode}: ${nextCombo.headlineReel} + ${nextCombo.visualReel} + ${nextCombo.ctaReel}`
      );
    }, 280);
  };

  /* Section 2 — Generate Matrix 1..16 Animation */
  const handleGenerateMatrix = () => {
    if (shouldReduceMotion) {
      setFilledCellCount(16);
      setMatrixAnnouncement('Generated all 16 Nova & Co. ad cells in the 4x4 matrix.');
      return;
    }
    setIsGeneratingMatrix(true);
    setFilledCellCount(0);
    setMatrixAnnouncement('Generating 16 ad variations across 4 headlines and 4 visuals...');
    let count = 0;
    const timer = setInterval(() => {
      count += 1;
      setFilledCellCount(count);
      if (count >= 16) {
        clearInterval(timer);
        setIsGeneratingMatrix(false);
        setMatrixAnnouncement(
          '16 Nova & Co. ad cells generated. Top 4 priority pairings marked Test first.'
        );
      }
    }, 75);
  };

  /* Section 3 — Battery Drain & Recharge Loop */
  useEffect(() => {
    if (shouldReduceMotion) {
      setBatteryChargePct(100);
      return;
    }
    const timer = setInterval(() => {
      setBatteryChargePct((prev) => {
        if (prev <= 32) {
          setIsRechargingBurst(true);
          setTimeout(() => setIsRechargingBurst(false), 900);
          return 100;
        }
        return prev - 14;
      });
    }, 1400);
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  const handleManualRecharge = () => {
    setIsRechargingBurst(true);
    setBatteryChargePct(100);
    setTimeout(() => setIsRechargingBurst(false), 800);
  };

  /* Section 4 — Toggle Magnetic Brand Kit */
  const handleToggleBrandKit = (apply: boolean) => {
    setBrandKitApplied(apply);
    setBrandGridAnnouncement(
      apply
        ? 'Applied Nova & Co. Brand Kit: all 6 ad drafts aligned to grid, approved fonts locked, and risky claims replaced.'
        : 'Showing unaligned raw AI drafts before Brand Kit rules are locked.'
    );
  };

  const activeHeroCombo = HERO_COMBINATIONS[activeComboIndex];

  const triggerQuoteModal = (customService?: string) => {
    const label = customService || solutionData.name;
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  /* JSON-LD Structured Data (Service + BreadcrumbList) */
  const jsonLdData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'AI Ad Creatives — On-Brand Ad Variations for Google, YouTube, Microsoft & Amazon',
        serviceType:
          'AI-Assisted Display, Video, Performance Max, Demand Gen, Microsoft Ads & Amazon Ad Creative Generation and Testing',
        description: solutionData.description,
        provider: {
          '@type': 'Organization',
          name: 'WebXCode',
          url: 'https://webxcode.com',
        },
        areaServed: ['India', 'United States', 'United Kingdom', 'UAE', 'Worldwide'],
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
            name: 'AI Solutions',
            item: 'https://webxcode.com/ai-solutions',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'AI Ad Creatives',
            item: 'https://webxcode.com/ai-solutions/ai-ad-creatives',
          },
        ],
      },
    ],
    [solutionData.description]
  );

  return (
    <main className="flex-1 bg-white text-navy overflow-x-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* ======================================================================
          SECTION 1 — HERO: THE COMBINATION ENGINE (bg: #1e242e navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-20 w-[600px] h-[600px] blue-glow-strong pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 -left-24 w-[440px] h-[440px] blue-glow pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/70 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
            <Link href="/ai-solutions" className="hover:text-white transition-colors">
              AI Solutions
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
            <span className="text-white font-semibold" aria-current="page">
              {solutionData.name}
            </span>
          </nav>

          {/* 50/50 Split Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 50% (6 cols) */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>AI AD CREATIVES</span>
              </div>

              <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.07] tracking-[-0.02em]">
                More Winning Ads.{' '}
                <span className="text-primary">Made Faster.</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-xl">
                AI-generated, on-brand ad variations for Google, YouTube, Microsoft and Amazon —
                tested, refreshed and approved by our creative team.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#creative-pack"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft transition-all"
                >
                  <span>Get a Free Creative Pack</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#matrix"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>See the Variation Matrix</span>
                </a>
              </div>

              {/* Supported Ad Networks Text Row (Zero Social Networks) */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary-100 mb-2">
                  BUILT FOR SEARCH, DISPLAY, VIDEO &amp; MARKETPLACE NETWORKS
                </div>
                <p className="text-[13px] sm:text-[13.5px] font-semibold text-white/85 leading-relaxed">
                  Display · YouTube · Performance Max · Demand Gen · Microsoft Ads · Amazon Ads
                </p>
              </div>
            </div>

            {/* Right 50% (6 cols): The Combination Engine Machine + Assembled Nova & Co. Ad Preview */}
            <div className="lg:col-span-6">
              <div className="rounded-[26px] bg-white/[0.05] border-2 border-primary/45 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                {/* Screen-reader live region */}
                <div className="sr-only" aria-live="polite">
                  {heroAnnouncement}
                </div>

                {/* Top Machine Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                  <div>
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary-100 block">
                      NOVA &amp; CO. // COMBINATION ENGINE
                    </span>
                    <span className="font-mono text-[12px] font-bold text-white">
                      Combinations explored: {exploredCounter.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Manual Spin / Generate Lever Button */}
                  <button
                    type="button"
                    onClick={handleManualSpin}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary-700 text-white font-mono text-[12px] font-extrabold shadow-soft transition-all cursor-pointer"
                  >
                    <RotateCcw
                      className={`w-3.5 h-3.5 ${isSpinningReels ? 'animate-spin' : ''}`}
                    />
                    <span>Generate</span>
                  </button>
                </div>

                {/* Glass Window with 3 Vertical Reels: HEADLINE · VISUAL · CTA */}
                <div
                  aria-hidden="true"
                  className="p-4 rounded-2xl bg-[#12171f] border-2 border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {/* Reel 1: HEADLINE */}
                  <div className="p-3 rounded-xl bg-navy border border-primary/40 flex flex-col justify-between">
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                      REEL 01 · HEADLINE
                    </span>
                    <div
                      className={`my-2 py-2.5 px-2.5 rounded-lg bg-white/[0.06] border border-white/10 font-extrabold text-[13px] text-white transition-transform duration-200 ${
                        isSpinningReels ? '-translate-y-1 opacity-50' : 'translate-y-0 opacity-100'
                      }`}
                    >
                      &ldquo;{activeHeroCombo.headlineReel}&rdquo;
                    </div>
                    <span className="font-mono text-[9px] text-white/50">LOCKED TO TONE</span>
                  </div>

                  {/* Reel 2: VISUAL */}
                  <div className="p-3 rounded-xl bg-navy border border-primary/40 flex flex-col justify-between">
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                      REEL 02 · VISUAL
                    </span>
                    <div
                      className={`my-2 py-2.5 px-2.5 rounded-lg bg-primary/20 border border-primary/45 font-extrabold text-[13px] text-white transition-transform duration-200 ${
                        isSpinningReels ? 'translate-y-1 opacity-50' : 'translate-y-0 opacity-100'
                      }`}
                    >
                      {activeHeroCombo.visualReel}
                    </div>
                    <span className="font-mono text-[9px] text-white/50">LICENSED ASSET</span>
                  </div>

                  {/* Reel 3: CTA */}
                  <div className="p-3 rounded-xl bg-navy border border-primary/40 flex flex-col justify-between">
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                      REEL 03 · CTA
                    </span>
                    <div
                      className={`my-2 py-2.5 px-2.5 rounded-lg bg-white/[0.06] border border-white/10 font-extrabold text-[13px] text-primary-100 transition-transform duration-200 ${
                        isSpinningReels ? '-translate-y-1 opacity-50' : 'translate-y-0 opacity-100'
                      }`}
                    >
                      {activeHeroCombo.ctaReel} →
                    </div>
                    <span className="font-mono text-[9px] text-white/50">HIGH CONTRAST</span>
                  </div>
                </div>

                {/* Assembled Live Ad Preview Card Below the Machine */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroCombo.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 rounded-2xl bg-white text-navy p-5 border-2 border-primary shadow-xl"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-navy-08">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-navy text-white font-mono text-[10px] font-extrabold">
                          NOVA &amp; CO. HOME
                        </span>
                        <span className="font-mono text-[11px] font-extrabold text-primary">
                          {activeHeroCombo.variantCode}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-navy-60">
                        {activeHeroCombo.adSizeLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      {/* Visual Scene Box (Blue/Navy/White Monochromatic Graphic) */}
                      <div className="sm:col-span-5 rounded-xl bg-primary-50 border border-primary-100 p-3.5 flex flex-col justify-between min-h-[116px]">
                        <span className="self-start px-2 py-0.5 rounded bg-primary text-white font-mono text-[9px] font-bold uppercase">
                          {activeHeroCombo.visualReel}
                        </span>
                        <p className="text-[11px] text-navy-70 font-medium mt-2 leading-snug">
                          {activeHeroCombo.visualSceneSummary}
                        </p>
                      </div>

                      {/* Assembled Copy + CTA */}
                      <div className="sm:col-span-7 flex flex-col justify-between">
                        <div>
                          <span className="font-mono text-[10px] font-bold text-primary uppercase">
                            {activeHeroCombo.visualBadge}
                          </span>
                          <h2 className="text-[19px] sm:text-[21px] font-extrabold text-navy leading-tight mt-0.5">
                            {activeHeroCombo.headlineReel}
                          </h2>
                          <p className="text-[12px] text-navy-60 mt-1">
                            Channel: {activeHeroCombo.channelFit}
                          </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-[12px] font-bold">
                            <span>{activeHeroCombo.ctaReel}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                          <span className="font-mono text-[10px] font-extrabold text-navy-70">
                            Creative Director Approved ✓
                          </span>
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
          SECTION 2 — THE VARIATION MATRIX (bg: #ffffff, id="matrix")
      ====================================================================== */}
      <section
        id="matrix"
        className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Grid className="w-3.5 h-3.5 text-primary" />
                <span>STRUCTURED MULTI-VARIATE TESTING</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.12] tracking-tight">
                4 Headlines × 4 Visuals ={' '}
                <span className="text-primary">16 Ads to Test</span>
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] text-navy-70 leading-[1.65]">
                Instead of guessing one &ldquo;hero banner&rdquo; and hoping it clicks, we cross
                four distinct copy angles with four visual treatments. Click{' '}
                <strong className="text-navy">Generate Matrix</strong> or select any cell to inspect
                the variant.
              </p>
            </div>

            {/* Matrix Controls */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleGenerateMatrix}
                disabled={isGeneratingMatrix}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] shadow-soft transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGeneratingMatrix ? 'Filling 16 Cells...' : 'Generate Matrix'}</span>
              </button>

              <button
                type="button"
                role="switch"
                aria-checked={showTestPriority}
                onClick={() => setShowTestPriority((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-full border font-mono text-[12px] font-bold transition-all cursor-pointer ${
                  showTestPriority
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-navy border-navy-15 hover:border-primary'
                }`}
              >
                <span>Test priority (Top 4)</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    showTestPriority ? 'bg-primary text-white' : 'bg-navy-08 text-navy'
                  }`}
                >
                  {showTestPriority ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
          </div>

          <div className="sr-only" aria-live="polite">
            {matrixAnnouncement}
          </div>

          {/* 4x4 Matrix Table + Selected Variant Preview Bar */}
          <div className="overflow-x-auto pb-2">
            <table
              className="w-full min-w-[880px] border-separate border-spacing-2.5"
              aria-label="4 Headlines by 4 Visuals Ad Variation Matrix"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-48 p-3.5 rounded-2xl bg-navy text-white text-left align-bottom"
                  >
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100">
                      NOVA &amp; CO. MATRIX
                    </div>
                    <div className="text-[13px] font-extrabold mt-0.5">
                      Headline ↓ × Visual →
                    </div>
                  </th>
                  {MATRIX_VISUALS.map((vis) => (
                    <th
                      key={vis.id}
                      scope="col"
                      className="p-3.5 rounded-2xl bg-primary-50 border border-primary-100 text-left align-top"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-extrabold">
                          {vis.code}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-navy-60">
                          {vis.layoutType}
                        </span>
                      </div>
                      <div className="text-[14px] font-extrabold text-navy mt-1.5">
                        {vis.title}
                      </div>
                      <div className="text-[11.5px] font-normal text-navy-70 mt-0.5 leading-snug">
                        {vis.visualDescription}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {MATRIX_HEADLINES.map((hl, rowIdx) => (
                  <tr key={hl.id}>
                    {/* Row Header: Headline H1-H4 */}
                    <th
                      scope="row"
                      className="p-3.5 rounded-2xl bg-primary-50/75 border border-primary-100 text-left align-middle"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-navy text-white font-mono text-[10px] font-extrabold">
                          {hl.code}
                        </span>
                        <span className="font-mono text-[10px] font-bold uppercase text-primary">
                          {hl.angleLabel}
                        </span>
                      </div>
                      <div className="text-[13.5px] font-extrabold text-navy mt-1.5 leading-snug">
                        &ldquo;{hl.headlineText}&rdquo;
                      </div>
                    </th>

                    {/* 4 Cells per Row */}
                    {MATRIX_VISUALS.map((vis, colIdx) => {
                      const flatCellIndex = rowIdx * 4 + colIdx;
                      const cellId = `NV-${hl.code}-${vis.code}`;
                      const isCellFilled = flatCellIndex < filledCellCount;
                      const isPriority = showTestPriority && PRIORITY_CELL_IDS.has(cellId);
                      const isSelected = selectedMatrixCellId === cellId;

                      return (
                        <td key={cellId} className="align-stretch">
                          <button
                            type="button"
                            onClick={() => setSelectedMatrixCellId(cellId)}
                            onMouseEnter={() => setSelectedMatrixCellId(cellId)}
                            className={`w-full h-full min-h-[118px] p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer ${
                              !isCellFilled
                                ? 'bg-primary-50/30 border-dashed border-navy-15 opacity-50'
                                : isSelected
                                ? 'bg-navy text-white border-primary shadow-lg scale-[1.02]'
                                : isPriority
                                ? 'bg-primary-50/90 text-navy border-primary shadow-sm'
                                : 'bg-white text-navy border-navy-10 hover:border-primary'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1.5">
                              <span
                                className={`font-mono text-[11px] font-extrabold ${
                                  isSelected ? 'text-primary-100' : 'text-primary'
                                }`}
                              >
                                {cellId}
                              </span>
                              {isCellFilled && isPriority && (
                                <span className="px-2 py-0.5 rounded-full bg-primary text-white font-mono text-[9px] font-extrabold uppercase">
                                  Test first
                                </span>
                              )}
                            </div>

                            {isCellFilled ? (
                              <div className="my-2">
                                <div
                                  className={`text-[12px] font-extrabold leading-snug line-clamp-2 ${
                                    isSelected ? 'text-white' : 'text-navy'
                                  }`}
                                >
                                  {hl.headlineText}
                                </div>
                                <div
                                  className={`font-mono text-[10px] mt-1 ${
                                    isSelected ? 'text-white/70' : 'text-navy-60'
                                  }`}
                                >
                                  Visual: {vis.title}
                                </div>
                              </div>
                            ) : (
                              <div className="my-3 font-mono text-[10px] text-navy-40 italic">
                                Queued...
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-1.5 border-t border-current/10 font-mono text-[9.5px]">
                              <span>NOVA &amp; CO.</span>
                              <span>Inspect →</span>
                            </div>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Enlarged Selected Cell Preview Card */}
          {(() => {
            const parts = selectedMatrixCellId.split('-');
            const hlCode = (parts[1] || 'H1') as 'H1' | 'H2' | 'H3' | 'H4';
            const visCode = (parts[2] || 'V2') as 'V1' | 'V2' | 'V3' | 'V4';
            const hlObj =
              MATRIX_HEADLINES.find((h) => h.code === hlCode) || MATRIX_HEADLINES[0];
            const visObj =
              MATRIX_VISUALS.find((v) => v.code === visCode) || MATRIX_VISUALS[1];
            const isTop4 = PRIORITY_CELL_IDS.has(selectedMatrixCellId);

            return (
              <div className="mt-6 p-5 sm:p-6 rounded-[24px] bg-navy text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="px-4 py-3 rounded-2xl bg-primary text-white font-mono text-center shrink-0">
                    <div className="text-[10px] uppercase tracking-wider opacity-85">VARIANT ID</div>
                    <div className="text-[18px] font-extrabold">{selectedMatrixCellId}</div>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-primary-100 uppercase">
                        {hlObj.angleLabel} × {visObj.title}
                      </span>
                      {isTop4 && (
                        <span className="px-2.5 py-0.5 rounded-full bg-white text-navy font-mono text-[10px] font-extrabold">
                          ★ Wave-1 Priority Test Pair
                        </span>
                      )}
                    </div>
                    <h3 className="text-[18px] sm:text-[20px] font-extrabold text-white mt-1">
                      &ldquo;{hlObj.headlineText}&rdquo; — {visObj.visualDescription}
                    </h3>
                  </div>
                </div>

                <div className="text-left lg:text-right shrink-0 font-mono text-[12px] text-white/80">
                  We launch the strongest combinations first, then let real data decide.
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ======================================================================
          SECTION 3 — BEAT CREATIVE FATIGUE: THE BATTERY (bg: #f0f7fd)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50 border-b border-primary-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <BatteryCharging className="w-3.5 h-3.5 text-primary" />
              <span>PROACTIVE CREATIVE REFRESH</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.12] tracking-tight">
              Ads Get Tired.{' '}
              <span className="text-primary">We Recharge Them Before They Do.</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Even the best display or YouTube ad loses steam once your audience has seen it five
              times. Instead of waiting for CPA to spike, we schedule fresh creative drops every 3
              weeks.
            </p>
          </div>

          {/* Split Layout: Left 5 Cols = Animated Ad Freshness Battery | Right 7 Cols = 12-Week Sawtooth CTR Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left (5 cols): Large Stylized Battery */}
            <div className="lg:col-span-5 rounded-[26px] bg-white border-2 border-navy-15 p-6 sm:p-8 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy">
                    AD FRESHNESS METER
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold">
                    {batteryChargePct}% CHARGE
                  </span>
                </div>

                {/* Stylized Vertical/Horizontal Battery Housing (aria-hidden decorative animation) */}
                <div aria-hidden="true" className="my-4">
                  <div className="flex items-center">
                    {/* Main Battery Body */}
                    <div className="relative flex-1 h-28 rounded-2xl border-4 border-navy bg-primary-50/60 p-2 overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{ width: `${batteryChargePct}%` }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' }}
                        className="h-full rounded-xl bg-primary relative flex items-center justify-end pr-3 shadow-[0_0_20px_rgba(5,113,194,0.45)]"
                      >
                        <Zap className="w-6 h-6 text-white fill-current" />
                      </motion.div>

                      {/* Recharge Bolt Overlay when hitting ~30% */}
                      {isRechargingBurst && (
                        <div className="absolute inset-0 bg-navy/85 flex items-center justify-center gap-2 text-white font-mono text-[13px] font-extrabold">
                          <Zap className="w-5 h-5 text-primary fill-current animate-bounce" />
                          <span>REFRESHING BATCH → 100% FRESH</span>
                        </div>
                      )}
                    </div>
                    {/* Battery Terminal Cap */}
                    <div className="w-3.5 h-12 rounded-r-lg bg-navy ml-1" />
                  </div>

                  {/* Threshold Scale */}
                  <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] font-bold text-navy-60">
                    <span>0% (FATIGUED)</span>
                    <span className="text-primary font-extrabold">
                      ⚡ 30% AUTO-REFRESH TRIGGER
                    </span>
                    <span>100% (LAUNCH)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-navy-08 flex flex-wrap items-center justify-between gap-3">
                <div className="text-[13px] text-navy-70">
                  <strong className="text-navy">3-Week Refresh Cadence:</strong> New hooks &amp;
                  visuals go live before frequency fatigue sets in.
                </div>
                <button
                  type="button"
                  onClick={handleManualRecharge}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-700 text-white font-mono text-[11px] font-extrabold cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Trigger Refresh Now</span>
                </button>
              </div>
            </div>

            {/* Right (7 cols): 12-Week CTR Line Chart (Dashed Decline vs Solid Blue Sawtooth) */}
            <div className="lg:col-span-7 rounded-[26px] bg-navy text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10">
                  <div>
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100 block">
                      12-WEEK DISPLAY &amp; YOUTUBE CTR TRAJECTORY (ILLUSTRATIVE)
                    </span>
                    <h3 className="text-[18px] sm:text-[20px] font-extrabold text-white mt-0.5">
                      Static Launch-and-Forget vs. AI Refresh Every 3 Weeks
                    </h3>
                  </div>

                  {/* Chart Legend */}
                  <div className="flex flex-wrap items-center gap-4 font-mono text-[11px]">
                    <span className="inline-flex items-center gap-1.5 text-primary-100 font-bold">
                      <span className="w-4 h-1 bg-primary rounded-full inline-block" />
                      <span>With AI Refreshes</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-white/60">
                      <span className="w-4 h-0.5 border-b-2 border-dashed border-white/50 inline-block" />
                      <span>No Refresh (Fatigue)</span>
                    </span>
                  </div>
                </div>

                {/* Accessible Text Summary for Screen Readers */}
                <p className="sr-only">
                  Over 12 weeks, an unrefreshed ad campaign drops from 1.15% CTR in Week 1 to 0.34%
                  CTR in Week 12. With AI creative refreshes at Weeks 4, 7, and 10, CTR rebounds
                  into a sawtooth wave maintaining 1.21% to 1.31% CTR.
                </p>

                {/* SVG Line Chart + Refresh Markers */}
                <div aria-hidden="true" className="relative pt-2 pb-4">
                  <svg
                    viewBox="0 0 660 210"
                    className="w-full h-48 sm:h-52 overflow-visible"
                  >
                    {/* Horizontal Grid Lines */}
                    {[30, 80, 130, 180].map((yVal) => (
                      <line
                        key={yVal}
                        x1="20"
                        y1={yVal}
                        x2="640"
                        y2={yVal}
                        stroke="rgba(255,255,255,0.1)"
                        strokeDasharray="3 3"
                      />
                    ))}

                    {/* Dashed Navy/White Line: No Refresh (Declining from 1.15% to 0.34%) */}
                    <polyline
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2.5"
                      strokeDasharray="6 5"
                      points={FATIGUE_TIMELINE_POINTS.map((pt, i) => {
                        const x = 30 + i * 54;
                        const y = 190 - pt.noRefreshCtr * 115;
                        return `${x},${y}`;
                      }).join(' ')}
                    />

                    {/* Solid Blue Sawtooth Line: AI Refreshes Every 3 Weeks */}
                    <polyline
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="3.5"
                      points={FATIGUE_TIMELINE_POINTS.map((pt, i) => {
                        const x = 30 + i * 54;
                        const y = 190 - pt.aiRefreshCtr * 115;
                        return `${x},${y}`;
                      }).join(' ')}
                    />

                    {/* Data Points & Refresh Badges on W4, W7, W10 */}
                    {FATIGUE_TIMELINE_POINTS.map((pt, i) => {
                      const x = 30 + i * 54;
                      const yAi = 190 - pt.aiRefreshCtr * 115;
                      return (
                        <g key={pt.week}>
                          <circle
                            cx={x}
                            cy={yAi}
                            r={pt.isRefreshPoint ? 6 : 3.5}
                            fill={pt.isRefreshPoint ? '#ffffff' : '#0571c2'}
                            stroke="#0571c2"
                            strokeWidth="2.5"
                          />
                          {pt.isRefreshPoint && (
                            <text
                              x={x}
                              y={yAi - 12}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="10"
                              fontFamily="monospace"
                              fontWeight="bold"
                            >
                              ⚡ REFRESH
                            </text>
                          )}
                          <text
                            x={x}
                            y="206"
                            textAnchor="middle"
                            fill="rgba(255,255,255,0.65)"
                            fontSize="10"
                            fontFamily="monospace"
                          >
                            {pt.week}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Caption Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[13px] text-white/80">
                <span>
                  We monitor performance and swap in fresh, on-brand variants before results drop.
                </span>
                <span className="font-mono text-[11px] text-primary-100">
                  Illustrative CTR curve
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 4 — ON-BRAND, EVERY TIME: THE MAGNETIC BRAND GRID (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Apply Brand Kit Button */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>BRAND SAFETY &amp; POLICY GUARDRAILS</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.12] tracking-tight">
                AI Creativity,{' '}
                <span className="text-primary">Locked to Your Brand Kit</span>
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] text-navy-70 leading-[1.65]">
                Raw AI tools put logos in the wrong corner and invent risky claims that get ad
                accounts flagged. Toggle between unaligned drafts and our{' '}
                <strong className="text-navy">Magnetic Brand Grid</strong> below.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleToggleBrandKit(true)}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[14px] transition-all cursor-pointer ${
                  brandKitApplied
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-primary hover:bg-primary-700 text-white shadow-soft'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Apply Brand Kit</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleBrandKit(false)}
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-full border font-semibold text-[14px] transition-all cursor-pointer ${
                  !brandKitApplied
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-navy border-navy-15 hover:border-navy'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>View Unaligned AI Drafts</span>
              </button>
            </div>
          </div>

          <div className="sr-only" aria-live="polite">
            {brandGridAnnouncement}
          </div>

          {/* Split Layout: Left 4 Cols = Brand Kit Panel | Right 8 Cols = 6 Magnetic Ad Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left (4 cols): Nova & Co. Brand Kit Spec Panel */}
            <div className="lg:col-span-4 rounded-[24px] bg-navy text-white p-6 sm:p-7 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                  BRAND KIT // NOVA &amp; CO.
                </span>
                <span className="px-2.5 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-bold">
                  ACTIVE
                </span>
              </div>

              {/* 1. Logo Safe Zone */}
              <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100">
                  01. LOGO ZONE &amp; CLEARSPACE
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="px-3 py-1 rounded bg-white text-navy font-mono text-[11px] font-extrabold">
                    NOVA &amp; CO.
                  </span>
                  <span className="font-mono text-[11px] text-white/75">Top-Left · 16px pad</span>
                </div>
              </div>

              {/* 2. Approved Fonts "Aa" & Color Swatches */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10">
                  <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                    02. FONTS
                  </div>
                  <div className="text-[24px] font-extrabold text-white leading-none mt-1.5">
                    Aa
                  </div>
                  <div className="font-mono text-[10px] text-white/70 mt-1">
                    Plus Jakarta + Mono
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10">
                  <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                    03. PALETTE
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-6 h-6 rounded-full bg-primary border border-white/30" />
                    <span className="w-6 h-6 rounded-full bg-navy border border-white/40" />
                    <span className="w-6 h-6 rounded-full bg-primary-50 border border-white/30" />
                    <span className="w-6 h-6 rounded-full bg-white border border-white/30" />
                  </div>
                  <div className="font-mono text-[10px] text-white/70 mt-1.5">
                    Blue · Navy · White
                  </div>
                </div>
              </div>

              {/* 4. Tone Keywords */}
              <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100 mb-2">
                  04. APPROVED TONE KEYWORDS
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {['Warm', 'Tactile', 'Exact cm specs', 'Easy care', 'Honest warranty'].map(
                    (kw) => (
                      <span
                        key={kw}
                        className="px-2.5 py-0.5 rounded bg-primary/25 border border-primary/40 text-white"
                      >
                        {kw}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* 5. "Do Not Say" Claims Guardrail List */}
              <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100 mb-2">
                  05. &ldquo;DO NOT SAY&rdquo; POLICY BLOCKLIST
                </div>
                <ul className="space-y-1.5 text-[12px] text-white/80 font-mono">
                  <li className="line-through decoration-white/60">
                    No &ldquo;best in India&rdquo; superlative claims
                  </li>
                  <li className="line-through decoration-white/60">
                    No fake liquidation or 90% OFF anchors
                  </li>
                  <li className="line-through decoration-white/60">
                    No ALL-CAPS urgency spam
                  </li>
                </ul>
              </div>
            </div>

            {/* Right (8 cols): 6 Ad Drafts Snapping onto the Magnetic Brand Grid */}
            <div className="lg:col-span-8">
              <div className="p-5 sm:p-6 rounded-[26px] bg-primary-50/70 border-2 border-primary-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MAGNETIC_BRAND_DRAFTS.map((draft) => (
                    <div
                      key={draft.id}
                      className={`p-4 rounded-2xl bg-white border-2 transition-all duration-300 flex flex-col justify-between min-h-[215px] ${
                        brandKitApplied
                          ? 'border-primary shadow-md rotate-0 translate-x-0 translate-y-0'
                          : `border-navy-15 shadow-xs ${draft.offGridRotationClass}`
                      }`}
                    >
                      {/* Top Bar: Logo Zone + Format Badge */}
                      <div>
                        <div
                          className={`flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-navy-08 ${
                            !brandKitApplied ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <span
                            className={`px-2 py-0.5 rounded font-mono text-[10px] font-extrabold ${
                              brandKitApplied
                                ? 'bg-navy text-white'
                                : 'bg-navy-08 text-navy-60'
                            }`}
                          >
                            NOVA &amp; CO.
                          </span>
                          <span className="font-mono text-[10px] font-bold text-navy-50">
                            {draft.adFormat}
                          </span>
                        </div>

                        {/* Body Copy: Unapproved Strikethrough vs Locked Brand Copy */}
                        {!brandKitApplied ? (
                          <div>
                            <div className="px-2 py-1 rounded bg-primary-50 border border-primary-100 font-mono text-[10px] font-bold text-navy-70 mb-2">
                              Issue: {draft.unalignedIssue}
                            </div>
                            <p className="text-[13px] font-bold text-navy-60 line-through decoration-navy decoration-2 leading-snug">
                              {draft.riskyDraftClaim}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-[13.5px] font-extrabold text-navy leading-snug">
                              {draft.approvedBrandCopy}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Bottom CTA + Brand Check Badge */}
                      <div className="mt-4 pt-2.5 border-t border-navy-08 flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-extrabold text-primary">
                          {draft.ctaLabel}
                        </span>
                        {brandKitApplied ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                            <span>Brand ✓</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-navy-08 text-navy-70 font-mono text-[10px] font-bold">
                            Unaligned
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Caption Footer + Related Links to AI Videos & AI Content Creation */}
                <div className="mt-6 pt-4 border-t border-primary-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13.5px] text-navy-70">
                  <p className="font-semibold text-navy">
                    Every variant is reviewed by a human creative director before launch.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[12.5px] font-bold text-primary">
                    <Link href="/ai-solutions/ai-generated-videos" className="hover:underline">
                      AI Generated Videos →
                    </Link>
                    <span className="text-navy-30">·</span>
                    <Link href="/ai-solutions/ai-content-creation" className="hover:underline">
                      AI Content Creation →
                    </Link>
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

export default AiAdCreatives;
