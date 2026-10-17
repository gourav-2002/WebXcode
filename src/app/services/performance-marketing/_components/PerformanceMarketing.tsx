'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  TrendingUp,
  Target,
  Sliders,
  Sparkles,
  BarChart3,
  Crown,
  Zap,
  Layers,
  Search,
  ShoppingBag,
  Tv,
  Globe,
  RefreshCw,
} from 'lucide-react';
import { services } from '@/app/services/_components/Services';

/* ==========================================================================
   HELPERS — INDIAN CURRENCY & NUMBER FORMATTING
   ========================================================================== */
const formatINR = (amount: number): string => {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
};

/* ==========================================================================
   SECTION 1 — HERO: SANKEY FLOW CHANNELS (NO SOCIAL MEDIA)
   ========================================================================== */
interface SankeyChannelNode {
  id: string;
  label: string;
  sharePercent: number;
  bandThicknessPx: number;
  primaryOutcome: 'Leads' | 'Sales' | 'Both';
  sampleRoas: string;
}

const SANKEY_CHANNELS: SankeyChannelNode[] = [
  {
    id: 'google-search',
    label: 'Google Search',
    sharePercent: 32,
    bandThicknessPx: 14,
    primaryOutcome: 'Leads',
    sampleRoas: '4.5x',
  },
  {
    id: 'google-shopping',
    label: 'Google Shopping',
    sharePercent: 26,
    bandThicknessPx: 11,
    primaryOutcome: 'Sales',
    sampleRoas: '4.8x',
  },
  {
    id: 'performance-max',
    label: 'Performance Max',
    sharePercent: 22,
    bandThicknessPx: 9,
    primaryOutcome: 'Both',
    sampleRoas: '4.1x',
  },
  {
    id: 'display-remarketing',
    label: 'Display & Remarketing',
    sharePercent: 12,
    bandThicknessPx: 6,
    primaryOutcome: 'Both',
    sampleRoas: '3.6x',
  },
  {
    id: 'microsoft-ads',
    label: 'Microsoft Ads',
    sharePercent: 8,
    bandThicknessPx: 4,
    primaryOutcome: 'Leads',
    sampleRoas: '3.9x',
  },
];

/* ==========================================================================
   SECTION 2 — THE BUDGET MIXER: CHANNELS, BENCHMARKS & PRESETS
   ========================================================================== */
type ChannelKey =
  | 'search'
  | 'shopping'
  | 'pmax'
  | 'displayRemarketing'
  | 'microsoftAds';

interface MixerChannelConfig {
  key: ChannelKey;
  shortLabel: string;
  fullName: string;
  avgCpcINR: number;
  convRatePct: number;
  sampleRoasMultiplier: number;
  roleSummary: string;
}

const MIXER_CHANNELS: MixerChannelConfig[] = [
  {
    key: 'search',
    shortLabel: 'Search',
    fullName: 'Google Search Ads',
    avgCpcINR: 42,
    convRatePct: 4.6,
    sampleRoasMultiplier: 4.3,
    roleSummary: 'Captures high-intent buyers actively searching for your service or product.',
  },
  {
    key: 'shopping',
    shortLabel: 'Shopping',
    fullName: 'Google Shopping & Feed',
    avgCpcINR: 18,
    convRatePct: 3.4,
    sampleRoasMultiplier: 4.7,
    roleSummary: 'Shows product photo, price and rating directly at the top of search results.',
  },
  {
    key: 'pmax',
    shortLabel: 'PMax',
    fullName: 'Performance Max',
    avgCpcINR: 24,
    convRatePct: 3.8,
    sampleRoasMultiplier: 4.1,
    roleSummary: 'Goal-based campaigns across Search, Shopping, YouTube, Gmail and Maps.',
  },
  {
    key: 'displayRemarketing',
    shortLabel: 'Remarketing',
    fullName: 'Display & YouTube Remarketing',
    avgCpcINR: 12,
    convRatePct: 2.9,
    sampleRoasMultiplier: 3.8,
    roleSummary: 'Brings back past visitors and cart abandoners across web and YouTube.',
  },
  {
    key: 'microsoftAds',
    shortLabel: 'Microsoft',
    fullName: 'Microsoft (Bing) Ads',
    avgCpcINR: 34,
    convRatePct: 4.2,
    sampleRoasMultiplier: 3.9,
    roleSummary: 'Reaches corporate desktop buyers on Bing, Edge and Windows with lower CPCs.',
  },
];

type BusinessPresetKey = 'lead-gen' | 'ecommerce' | 'local-business';

interface MixerPresetSpec {
  id: BusinessPresetKey;
  label: string;
  description: string;
  outcomeWord: string;
  allocations: Record<ChannelKey, number>;
}

const MIXER_PRESETS: MixerPresetSpec[] = [
  {
    id: 'lead-gen',
    label: 'Lead Gen',
    description: 'B2B services, SaaS demos, clinics, real estate & high-ticket inquiries.',
    outcomeWord: 'Qualified Leads',
    allocations: {
      search: 45,
      shopping: 0,
      pmax: 25,
      displayRemarketing: 15,
      microsoftAds: 15,
    },
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    description: 'D2C online stores, catalog brands & multi-category retail checkouts.',
    outcomeWord: 'Online Orders',
    allocations: {
      search: 20,
      shopping: 35,
      pmax: 25,
      displayRemarketing: 12,
      microsoftAds: 8,
    },
  },
  {
    id: 'local-business',
    label: 'Local Business',
    description: 'Showrooms, multi-branch clinics, coaching centers & city service providers.',
    outcomeWord: 'Calls & Bookings',
    allocations: {
      search: 50,
      shopping: 5,
      pmax: 25,
      displayRemarketing: 15,
      microsoftAds: 5,
    },
  },
];

/* ==========================================================================
   SECTION 3 — FULL-FUNNEL TARGETING: THE BULLSEYE (4 RINGS)
   ========================================================================== */
interface BullseyeRingSpec {
  id: 'awareness' | 'consideration' | 'conversion' | 'remarketing';
  ringOrder: number; // 1 = outermost, 4 = center bullseye
  name: string;
  shortTag: string;
  goalStatement: string;
  channelsUsed: string[];
  exampleCampaigns: string[];
  keyMetric: string;
  sampleBenchmark: string;
}

const BULLSEYE_RINGS: BullseyeRingSpec[] = [
  {
    id: 'awareness',
    ringOrder: 1,
    name: 'Awareness',
    shortTag: 'OUTER RING 01 • TOP OF FUNNEL',
    goalStatement:
      'Put your product or service in front of in-market audiences researching your category before they pick a vendor.',
    channelsUsed: [
      'YouTube In-Stream & Shorts Ads (via Google Ads)',
      'Google Display Custom Intent Audiences',
      'Performance Max Video & Discovery Inventory',
    ],
    exampleCampaigns: [
      'YouTube ads targeting people searching competitor & category terms on Google',
      'Custom intent display banners on industry publications and review sites',
    ],
    keyMetric: 'Qualified Reach, View Rate (VTR) & Engaged Site Visits',
    sampleBenchmark: '28–42% YouTube Completed View Rate (placeholder)',
  },
  {
    id: 'consideration',
    ringOrder: 2,
    name: 'Consideration',
    shortTag: 'RING 02 • RESEARCH & EVALUATION',
    goalStatement:
      'Capture buyers comparing options, reading specs, and evaluating pricing across search and shopping feeds.',
    channelsUsed: [
      'Non-Brand Category Google Search',
      'Microsoft (Bing) Desktop Search',
      'Google Shopping Category & Comparison Listings',
    ],
    exampleCampaigns: [
      '"Best [service/software] for [industry]" search ad groups with comparison landing pages',
      'Structured Google Merchant Center product feeds with review stars and price drops',
    ],
    keyMetric: 'Click-Through Rate (CTR), Quality Score & Product View Depth',
    sampleBenchmark: '6.4% – 9.8% Search CTR on high-intent ad groups (placeholder)',
  },
  {
    id: 'conversion',
    ringOrder: 3,
    name: 'Conversion',
    shortTag: 'RING 03 • HIGH-INTENT ACTION',
    goalStatement:
      'Convert bottom-of-funnel buyers who are ready to request a quote, book an appointment, or complete checkout right now.',
    channelsUsed: [
      'Exact & Phrase Match High-Intent Google Search',
      'High-Margin Google Shopping & Performance Max',
      'Amazon Sponsored Products & Sponsored Brands (for sellers)',
    ],
    exampleCampaigns: [
      'Bottom-funnel "[service] agency near me" & "[product] buy online" campaigns',
      'Value-based bidding (Target ROAS / Target CPA) focused on highest-margin SKUs',
    ],
    keyMetric: 'Cost per Acquisition (CPA), Conversion Rate & ROAS',
    sampleBenchmark: '3.4x – 4.8x Blended Return on Ad Spend (placeholder)',
  },
  {
    id: 'remarketing',
    ringOrder: 4,
    name: 'Remarketing & Repeat',
    shortTag: 'CENTER BULLSEYE • MAXIMUM ROI',
    goalStatement:
      'Recover visitors who left without converting and turn first-time buyers into high-LTV repeat customers.',
    channelsUsed: [
      'Dynamic Product Remarketing (Display & YouTube)',
      'RLSA (Remarketing Lists for Search Ads)',
      'Customer Match & Past-Buyer Cross-Sell Campaigns',
    ],
    exampleCampaigns: [
      'Dynamic cart-abandoner ads showing the exact product viewed + fast-shipping assurance',
      ' Branded search defense & 60-day reorder reminders for consumable D2C products',
    ],
    keyMetric: 'Cart Recovery Rate, Repeat Purchase Rate & LTV:CAC Ratio',
    sampleBenchmark: '-46% lower CPA than cold acquisition traffic (placeholder)',
  },
];

/* ==========================================================================
   SECTION 4 — THE CREATIVE TESTING ARENA: A/B TESTS (3 TABS)
   ========================================================================== */
interface ArenaVariantSpec {
  code: 'Ad A' | 'Ad B';
  variantTitle: string;
  isWinner: boolean;
  winnerLiftBadge?: string;
  adFormatLabel: string;
  headline: string;
  description: string;
  visualCalloutBox: string;
  ctaButtonText: string;
  ctrPercent: number;
  convRatePercent: number;
  cpaINR: number;
}

interface ArenaTestTab {
  id: 'headline-test' | 'offer-test' | 'landing-page-test';
  tabLabel: string;
  experimentHypothesis: string;
  trafficSplitInfo: string;
  keyTakeaway: string;
  variantA: ArenaVariantSpec;
  variantB: ArenaVariantSpec;
}

const ARENA_TESTS: ArenaTestTab[] = [
  {
    id: 'headline-test',
    tabLabel: 'Headline Test',
    experimentHypothesis:
      'Does a specific timeframe + metric headline outperform a generic "trusted provider" headline on Google Search?',
    trafficSplitInfo: '50/50 Ad Rotation • 14,200 Impressions • 98% Stat. Confidence',
    keyTakeaway:
      'Specific numbers ("Launch in 4 Weeks", "Transparent Pricing") consistently beat vague superlatives like "Leading Solutions".',
    variantA: {
      code: 'Ad A',
      variantTitle: 'Control: Generic Agency Headline',
      isWinner: false,
      adFormatLabel: 'Sponsored • Google Search Result',
      headline: 'Leading ERP & Inventory Software | Trusted by Businesses',
      description:
        'Upgrade your business operations with our complete cloud software suite. Contact our sales team today for more information.',
      visualCalloutBox: 'Generic Sitelinks: About Us • Contact • Our Vision',
      ctaButtonText: 'Learn More',
      ctrPercent: 4.8,
      convRatePercent: 2.6,
      cpaINR: 1180,
    },
    variantB: {
      code: 'Ad B',
      variantTitle: 'Challenger: Specific Outcome + Speed',
      isWinner: true,
      winnerLiftBadge: 'Winner +38% CTR',
      adFormatLabel: 'Sponsored • Google Search Result',
      headline: 'GST Inventory & POS Software — Go Live in 7 Days (From ₹2,499/mo)',
      description:
        'Sync multi-store stock, barcode billing & Tally in real time. 4.8★ rated by 600+ Indian retailers. Book a 15-min live demo.',
      visualCalloutBox: 'Extensions: Pricing Calculator • 7-Day Setup • Free Trial',
      ctaButtonText: 'See Live Demo & Pricing',
      ctrPercent: 6.6,
      convRatePercent: 4.1,
      cpaINR: 710,
    },
  },
  {
    id: 'offer-test',
    tabLabel: 'Offer Test',
    experimentHypothesis:
      'Does an interactive "Free Cost Estimator / Audit" offer convert better than a high-friction "Talk to Sales" call?',
    trafficSplitInfo: '50/50 Split • 8,900 Clicks • 21-Day Run',
    keyTakeaway:
      'Giving buyers immediate value (an instant estimate, sample kit, or audit) lowers CPA and doubles form completion.',
    variantA: {
      code: 'Ad A',
      variantTitle: 'Control: High-Friction Sales Call',
      isWinner: false,
      adFormatLabel: 'Sponsored • Search & Display Hook',
      headline: 'Custom Office Interior Design — Speak With Our Sales Team',
      description:
        'We design and build modern corporate offices. Fill out our contact form and a representative will call you back.',
      visualCalloutBox: 'Offer Hook: "Schedule a 45-Minute Sales Call"',
      ctaButtonText: 'Request a Callback',
      ctrPercent: 5.1,
      convRatePercent: 2.3,
      cpaINR: 1420,
    },
    variantB: {
      code: 'Ad B',
      variantTitle: 'Challenger: Value-First Cost Calculator',
      isWinner: true,
      winnerLiftBadge: 'Winner +52% Conv. Rate',
      adFormatLabel: 'Sponsored • Search & Display Hook',
      headline: 'Office Interior Turnkey Cost Calculator — Instant Sq.Ft. Estimate',
      description:
        'Planning a 2,000 to 25,000 sq.ft. office? Get an itemized BOQ budget + 3D layout concept in 24 hours. 45-day handover SLA.',
      visualCalloutBox: 'Offer Hook: "Instant Sq.Ft. Budget + Free 2D Layout"',
      ctaButtonText: 'Calculate My Office Budget',
      ctrPercent: 6.8,
      convRatePercent: 3.5,
      cpaINR: 840,
    },
  },
  {
    id: 'landing-page-test',
    tabLabel: 'Landing Page Test',
    experimentHypothesis:
      'Does a dedicated, distraction-free campaign landing page beat sending paid Shopping/Search clicks to the standard website homepage?',
    trafficSplitInfo: '50/50 Traffic Split • 11,400 Paid Sessions • Google Ads Experiment',
    keyTakeaway:
      'Removing top-nav distractions, matching the exact ad headline, and showing proof above the fold lifts ROAS immediately.',
    variantA: {
      code: 'Ad A',
      variantTitle: 'Control: Standard Website Homepage',
      isWinner: false,
      adFormatLabel: 'Destination • yourwebsite.com/',
      headline: 'Welcome to Our Brand — Browse 14 Categories & Company News',
      description:
        'Full header menu with 18 links, generic brand slider, slow background video, and buried contact form at the very bottom.',
      visualCalloutBox: 'Page Layout: 18 Nav Links • Generic Hero • 3.8s Load Time',
      ctaButtonText: 'Explore Website',
      ctrPercent: 5.4,
      convRatePercent: 2.1,
      cpaINR: 1290,
    },
    variantB: {
      code: 'Ad B',
      variantTitle: 'Challenger: Focused Message-Match LP',
      isWinner: true,
      winnerLiftBadge: 'Winner +64% Conversions',
      adFormatLabel: 'Destination • yourwebsite.com/lp/offer',
      headline: 'Exact Ad Headline Match + Trust Badges + 3-Field Instant Quote Box',
      description:
        'Zero header clutter, sub-1.4s load speed, comparison table, verified customer reviews, and sticky mobile CTA bar.',
      visualCalloutBox: 'Page Layout: Zero Nav Leaks • Above-Fold Form • 1.2s Load',
      ctaButtonText: 'Get Instant Quote Now',
      ctrPercent: 6.2,
      convRatePercent: 5.4,
      cpaINR: 560,
    },
  },
];

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */
interface PerformanceMarketingProps {
  onOpenQuoteModal?: (service?: string) => void;
}

const PerformanceMarketing: React.FC<PerformanceMarketingProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Single source of truth from Services.tsx */
  const perfServiceItem = useMemo(
    () => services.find((s) => s.slug === 'performance-marketing'),
    []
  );

  /* ========================================================================
     SECTION 2 STATE — THE BUDGET MIXER (5 FADERS ALWAYS SUM TO 100%)
     ======================================================================== */
  const [totalBudgetINR, setTotalBudgetINR] = useState<number>(150000);
  const [activePreset, setActivePreset] = useState<BusinessPresetKey>('ecommerce');
  const [allocations, setAllocations] = useState<Record<ChannelKey, number>>(
    MIXER_PRESETS[1].allocations
  );

  /* Proportional re-allocation when any single fader moves so total = 100% */
  const handleFaderChange = (changedKey: ChannelKey, rawNewValue: number) => {
    const clampedNew = Math.max(0, Math.min(100, Math.round(rawNewValue)));
    const otherKeys = MIXER_CHANNELS.map((c) => c.key).filter((k) => k !== changedKey);
    const remainingPool = 100 - clampedNew;

    const currentOthersSum = otherKeys.reduce((acc, k) => acc + allocations[k], 0);
    const nextAllocations: Record<ChannelKey, number> = {
      ...allocations,
      [changedKey]: clampedNew,
    };

    if (currentOthersSum === 0) {
      // Distribute remaining equally among other channels
      const baseShare = Math.floor(remainingPool / otherKeys.length);
      let leftover = remainingPool - baseShare * otherKeys.length;
      otherKeys.forEach((k) => {
        nextAllocations[k] = baseShare + (leftover > 0 ? 1 : 0);
        if (leftover > 0) leftover -= 1;
      });
    } else {
      // Scale others proportionally
      let runningSum = clampedNew;
      otherKeys.forEach((k, idx) => {
        if (idx === otherKeys.length - 1) {
          nextAllocations[k] = Math.max(0, 100 - runningSum);
        } else {
          const scaled = Math.round((allocations[k] / currentOthersSum) * remainingPool);
          nextAllocations[k] = scaled;
          runningSum += scaled;
        }
      });
    }

    setAllocations(nextAllocations);
  };

  const applyRecommendedPreset = (presetKey: BusinessPresetKey) => {
    setActivePreset(presetKey);
    const found = MIXER_PRESETS.find((p) => p.id === presetKey) || MIXER_PRESETS[0];
    setAllocations({ ...found.allocations });
  };

  /* Live Mixer Projections Calculation */
  const mixerProjections = useMemo(() => {
    let totalClicks = 0;
    let totalConversions = 0;
    let totalProjectedRevenue = 0;

    MIXER_CHANNELS.forEach((ch) => {
      const share = (allocations[ch.key] || 0) / 100;
      const channelSpend = totalBudgetINR * share;
      const clicks = channelSpend / ch.avgCpcINR;
      const conversions = clicks * (ch.convRatePct / 100);
      const revenue = channelSpend * ch.sampleRoasMultiplier;

      totalClicks += clicks;
      totalConversions += conversions;
      totalProjectedRevenue += revenue;
    });

    const blendedRoas =
      totalBudgetINR > 0 ? totalProjectedRevenue / totalBudgetINR : 0;

    return {
      clicksLow: Math.round(totalClicks * 0.88),
      clicksHigh: Math.round(totalClicks * 1.12),
      convLow: Math.max(1, Math.round(totalConversions * 0.85)),
      convHigh: Math.max(2, Math.round(totalConversions * 1.15)),
      revLow: Math.round(totalProjectedRevenue * 0.9),
      revHigh: Math.round(totalProjectedRevenue * 1.1),
      blendedRoas: blendedRoas.toFixed(1),
    };
  }, [allocations, totalBudgetINR]);

  const currentPresetObj = useMemo(
    () => MIXER_PRESETS.find((p) => p.id === activePreset) || MIXER_PRESETS[0],
    [activePreset]
  );

  /* ========================================================================
     SECTION 3 STATE — BULLSEYE FUNNEL RING SELECTION
     ======================================================================== */
  const [selectedRingId, setSelectedRingId] = useState<BullseyeRingSpec['id']>('conversion');
  const activeRing = useMemo(
    () => BULLSEYE_RINGS.find((r) => r.id === selectedRingId) || BULLSEYE_RINGS[2],
    [selectedRingId]
  );

  /* ========================================================================
     SECTION 4 STATE — CREATIVE TESTING ARENA TAB
     ======================================================================== */
  const [selectedArenaTabId, setSelectedArenaTabId] = useState<ArenaTestTab['id']>('headline-test');
  const activeArenaTest = useMemo(
    () => ARENA_TESTS.find((t) => t.id === selectedArenaTabId) || ARENA_TESTS[0],
    [selectedArenaTabId]
  );

  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Global Quote Modal Trigger helper */
  const triggerQuoteModal = (preselectedService?: string) => {
    const svcLabel =
      preselectedService || perfServiceItem?.name || 'Performance Marketing';
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
          name: perfServiceItem?.name || 'Performance Marketing',
          description:
            'Data-driven Google Search, Google Shopping, Performance Max, Display Remarketing, YouTube and Microsoft Ads management focused on measurable leads, sales, CPA and ROAS.',
          provider: {
            '@type': 'Organization',
            name: 'WebXCode',
            url: 'https://webxcode.com',
          },
          serviceType: 'Performance Marketing & Paid Search Management',
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
              name: perfServiceItem?.name || 'Performance Marketing',
              item: 'https://webxcode.com/services/performance-marketing',
            },
          ],
        },
      ],
    }),
    [perfServiceItem]
  );

  return (
    <main className="flex-1 bg-white text-navy">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: BUDGET IN, REVENUE OUT (SANKEY FLOW) (bg: #1e242e navy)
         ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Radial blue glow + trading desk grid */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[720px] blue-glow-strong pointer-events-none opacity-75" />
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
          <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
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
                {perfServiceItem?.name || 'Performance Marketing'}
              </li>
            </ol>
          </nav>

          {/* Top Half: Centered Copy + Dual CTAs */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span>PERFORMANCE MARKETING</span>
              <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-extrabold tracking-wider">
                MOST DEMANDED
              </span>
            </div>

            <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.08] tracking-tight">
              Ads That <span className="text-primary">Pay for Themselves</span>
            </h1>

            <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65]">
              Data-driven Google, Shopping, Performance Max and Microsoft Ads campaigns — with
              proper tracking, landing pages and weekly optimization focused on leads, sales and
              profit.
            </p>

            {/* Two CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#ad-audit"
                onClick={(e) => {
                  const target = document.getElementById('ad-audit');
                  if (!target) {
                    e.preventDefault();
                    triggerQuoteModal('Free Ad Account Audit (Performance Marketing)');
                  }
                }}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
              >
                <span>Get a Free Ad Account Audit</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#budget-mixer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
              >
                <span>Try the Budget Mixer</span>
              </a>
            </div>
          </div>

          {/* Bottom Half: Wide Sankey Money-Flow Diagram */}
          <div className="mt-12 lg:mt-14 rounded-[24px] bg-white/[0.04] border border-white/15 backdrop-blur-md p-5 sm:p-7 lg:p-8 shadow-2xl">
            {/* Screen-reader accessible summary of the decorative Sankey flow */}
            <div className="sr-only">
              Illustrative Sankey diagram showing a sample monthly ad budget of ₹1,00,000 flowing
              into five intent-driven channels (Google Search, Google Shopping, Performance Max,
              Display and Remarketing, and Microsoft Ads), merging into qualified Leads and Sales,
              and producing ₹4,20,000 in sample tracked revenue at a 4.2x ROAS benchmark.
            </div>

            {/* Top Diagram Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/80">
                  CAPITAL ALLOCATION &amp; RETURN FLOW // EVERY RUPEE ACCOUNTABLE
                </span>
              </div>
              <span className="font-mono text-[11px] text-primary-100">
                Sample Benchmark Illustration • Ad Spend Paid Directly to Platforms
              </span>
            </div>

            {/* Desktop Horizontal Sankey Flow (lg+) */}
            <div className="hidden lg:grid lg:grid-cols-12 items-center gap-2" aria-hidden="true">
              {/* Stage 1 (Left 3 cols): Monthly Ad Budget Input Node */}
              <div className="col-span-3">
                <div className="rounded-2xl bg-[#141a24] border-2 border-primary p-5 shadow-lg relative">
                  <span className="px-2.5 py-0.5 rounded bg-primary/25 text-primary-100 font-mono text-[10px] font-extrabold uppercase">
                    INPUT CAPITAL
                  </span>
                  <div className="mt-2 text-[14px] font-bold text-white/80">
                    Monthly Ad Budget
                  </div>
                  <div className="mt-1 font-mono text-[28px] font-extrabold text-white tracking-tight">
                    ₹1,00,000
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-primary-100">
                    <span>100% Tracked</span>
                    <span>5 Intent Channels</span>
                  </div>
                </div>
              </div>

              {/* SVG Sankey Bands Left -> Middle (1 col) */}
              <div className="col-span-1 h-[310px] flex items-center justify-center">
                <svg
                  viewBox="0 0 90 310"
                  className="w-full h-full overflow-visible"
                  fill="none"
                >
                  {[
                    { yEnd: 28, strokeW: 14, delay: '0s' },
                    { yEnd: 92, strokeW: 11, delay: '0.4s' },
                    { yEnd: 155, strokeW: 9, delay: '0.8s' },
                    { yEnd: 218, strokeW: 6, delay: '1.2s' },
                    { yEnd: 282, strokeW: 4, delay: '1.6s' },
                  ].map((band, i) => {
                    const pathD = `M 0 155 C 45 155, 45 ${band.yEnd}, 90 ${band.yEnd}`;
                    return (
                      <g key={i}>
                        <path
                          d={pathD}
                          stroke="#0571c2"
                          strokeOpacity={0.35}
                          strokeWidth={band.strokeW}
                          strokeLinecap="round"
                        />
                        {!shouldReduceMotion && (
                          <circle r="3.5" fill="#ffffff">
                            <animateMotion
                              dur="2.8s"
                              begin={band.delay}
                              repeatCount="indefinite"
                              path={pathD}
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Stage 2 (Middle 3 cols): 5 Intent Channel Blocks */}
              <div className="col-span-3 space-y-2.5">
                {SANKEY_CHANNELS.map((ch) => (
                  <div
                    key={ch.id}
                    className="rounded-xl bg-white/[0.07] border border-white/15 px-3.5 py-2.5 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2 rounded-full bg-primary shrink-0"
                        style={{ height: `${Math.max(14, ch.bandThicknessPx * 1.6)}px` }}
                      />
                      <span className="text-[13px] font-bold text-white truncate">
                        {ch.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded bg-primary/25 font-mono text-[10.5px] font-bold text-primary-100">
                        {ch.sharePercent}%
                      </span>
                      <span className="font-mono text-[11px] font-bold text-white/75">
                        {ch.sampleRoas}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* SVG Sankey Bands Middle -> Outcomes (1 col) */}
              <div className="col-span-1 h-[310px] flex items-center justify-center">
                <svg
                  viewBox="0 0 90 310"
                  className="w-full h-full overflow-visible"
                  fill="none"
                >
                  {[
                    { yStart: 28, yEnd: 105, strokeW: 12, delay: '0.2s' },
                    { yStart: 92, yEnd: 205, strokeW: 11, delay: '0.6s' },
                    { yStart: 155, yEnd: 105, strokeW: 6, delay: '1.0s' },
                    { yStart: 155, yEnd: 205, strokeW: 6, delay: '1.3s' },
                    { yStart: 218, yEnd: 205, strokeW: 6, delay: '1.5s' },
                    { yStart: 282, yEnd: 105, strokeW: 4, delay: '1.8s' },
                  ].map((band, i) => {
                    const pathD = `M 0 ${band.yStart} C 45 ${band.yStart}, 45 ${band.yEnd}, 90 ${band.yEnd}`;
                    return (
                      <g key={i}>
                        <path
                          d={pathD}
                          stroke="#0571c2"
                          strokeOpacity={0.4}
                          strokeWidth={band.strokeW}
                          strokeLinecap="round"
                        />
                        {!shouldReduceMotion && (
                          <circle r="3" fill="#e6f2fb">
                            <animateMotion
                              dur="2.6s"
                              begin={band.delay}
                              repeatCount="indefinite"
                              path={pathD}
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Stage 3 (1.5 cols): Outcome Blocks ("Leads" & "Sales") */}
              <div className="col-span-1 space-y-5">
                <div className="rounded-xl bg-primary/25 border border-primary/50 p-3 text-center">
                  <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                    OUTCOME A
                  </div>
                  <div className="text-[15px] font-extrabold text-white mt-0.5">Leads</div>
                </div>
                <div className="rounded-xl bg-primary/25 border border-primary/50 p-3 text-center">
                  <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                    OUTCOME B
                  </div>
                  <div className="text-[15px] font-extrabold text-white mt-0.5">Sales</div>
                </div>
              </div>

              {/* Stage 4 (Right 3 cols): Final Revenue Output Block */}
              <div className="col-span-3 pl-2">
                <div className="rounded-2xl bg-primary text-white p-5 shadow-[0_0_35px_rgba(5,113,194,0.45)] border border-white/25">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-navy/40 font-mono text-[10px] font-extrabold uppercase">
                      TRACKED RETURN
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-navy font-mono text-[11px] font-extrabold">
                      ROAS 4.2x
                    </span>
                  </div>
                  <div className="mt-2.5 text-[14px] font-bold text-white/90">
                    Revenue (Placeholder)
                  </div>
                  <div className="mt-0.5 font-mono text-[28px] font-extrabold text-white tracking-tight">
                    ₹4,20,000
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/20 text-[11px] font-mono text-white/90">
                    GA4 + GTM + Offline CRM Sync
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Simplified Vertical Sankey Flow (<lg) */}
            <div className="lg:hidden space-y-4" aria-hidden="true">
              {/* Top Input Block */}
              <div className="rounded-2xl bg-[#141a24] border-2 border-primary p-4 text-center">
                <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                  MONTHLY AD BUDGET INPUT
                </div>
                <div className="font-mono text-[24px] font-extrabold text-white mt-1">
                  ₹1,00,000
                </div>
              </div>

              {/* Vertical Connector */}
              <div className="flex justify-center">
                <div className="w-1 h-6 bg-primary/50 rounded-full" />
              </div>

              {/* 5 Channel Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SANKEY_CHANNELS.map((ch) => (
                  <div
                    key={ch.id}
                    className="rounded-xl bg-white/[0.07] border border-white/15 p-3 flex items-center justify-between"
                  >
                    <span className="text-[13px] font-bold text-white">{ch.label}</span>
                    <span className="font-mono text-[11px] font-bold text-primary-100">
                      {ch.sharePercent}% • {ch.sampleRoas}
                    </span>
                  </div>
                ))}
              </div>

              {/* Vertical Connector */}
              <div className="flex justify-center">
                <div className="w-1 h-6 bg-primary/50 rounded-full" />
              </div>

              {/* Outcomes Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-primary/25 border border-primary/50 p-3 text-center font-bold text-white text-[14px]">
                  Qualified Leads
                </div>
                <div className="rounded-xl bg-primary/25 border border-primary/50 p-3 text-center font-bold text-white text-[14px]">
                  Online Sales
                </div>
              </div>

              {/* Vertical Connector */}
              <div className="flex justify-center">
                <div className="w-1 h-6 bg-primary rounded-full" />
              </div>

              {/* Bottom Revenue Block */}
              <div className="rounded-2xl bg-primary text-white p-4 text-center shadow-lg">
                <div className="font-mono text-[11px] font-extrabold uppercase">
                  TRACKED OUTCOME (PLACEHOLDER)
                </div>
                <div className="font-mono text-[24px] font-extrabold mt-1">
                  Revenue ₹4,20,000 · ROAS 4.2x
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — THE BUDGET MIXER: INTERACTIVE ALLOCATION (bg: #ffffff)
         ====================================================================== */}
      <section id="budget-mixer" className="py-[72px] lg:py-[112px] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header + Business Type Preset Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Sliders className="w-3.5 h-3.5 text-primary" />
                <span>INTERACTIVE BUDGET ALLOCATOR</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Where Should <span className="text-primary">Your Budget</span> Go?
              </h2>
              <p className="mt-3 text-[16px] text-navy-70 max-w-2xl leading-[1.65]">
                Slide any channel fader below or snap to a recommended industry split. When you
                raise one channel, the mixer proportionally re-balances the others so your mix
                always totals 100%.
              </p>
            </div>

            {/* Business Type Preset Pills + "Use Recommended Mix" */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div
                className="inline-flex p-1 rounded-full bg-primary-50 border border-primary-100"
                role="group"
                aria-label="Business type presets"
              >
                {MIXER_PRESETS.map((preset) => {
                  const isSelected = activePreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyRecommendedPreset(preset.id)}
                      className={`px-4 py-2 rounded-full text-[12.5px] font-extrabold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-white shadow-xs'
                          : 'text-navy hover:text-primary'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => applyRecommendedPreset(activePreset)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-navy hover:bg-primary text-white text-[12.5px] font-bold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Use Recommended Mix</span>
              </button>
            </div>
          </div>

          {/* Mixing Board Console Container (Brushed Navy-Tint Texture) */}
          <div
            className="rounded-[24px] bg-navy text-white p-5 sm:p-8 lg:p-10 border border-navy shadow-2xl relative overflow-hidden"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 6px)',
            }}
          >
            {/* Top Mixing Console Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-7 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                  CONSOLE // 5-CHANNEL MIXER
                </span>
                <span className="text-[13px] text-white/75 hidden sm:inline">
                  Active Preset: <strong className="text-white">{currentPresetObj.label}</strong> —{' '}
                  {currentPresetObj.description}
                </span>
              </div>
              <div className="font-mono text-[12px] font-bold text-primary-100">
                TOTAL ALLOCATION: 100%
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 7 Cols: 5 Vertical Audio-Style Channel Faders */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-5 gap-4">
                {MIXER_CHANNELS.map((ch) => {
                  const pct = allocations[ch.key] || 0;
                  const channelINR = Math.round((totalBudgetINR * pct) / 100);
                  const activeLedSegments = Math.round((pct / 100) * 8);

                  return (
                    <div
                      key={ch.key}
                      className="rounded-2xl bg-[#141a24] border border-white/12 p-4 flex flex-col justify-between items-center"
                    >
                      {/* Top LED Level Meter (8 segments in blue/navy tints) */}
                      <div className="w-full">
                        <div className="flex items-center justify-between font-mono text-[10px] text-white/60 mb-1.5">
                          <span>LVL</span>
                          <span className="text-primary-100 font-bold">{pct}%</span>
                        </div>
                        <div
                          className="grid grid-cols-8 gap-1 mb-3"
                          aria-hidden="true"
                        >
                          {Array.from({ length: 8 }).map((_, segIdx) => {
                            const isLit = segIdx < activeLedSegments;
                            return (
                              <span
                                key={segIdx}
                                className={`h-2 rounded-xs transition-colors ${
                                  isLit ? 'bg-primary shadow-[0_0_6px_#0571c2]' : 'bg-white/10'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Vertical Fader Track (Desktop vertical look + accessible range slider) */}
                      <div className="w-full my-2 flex flex-col items-center">
                        <div className="relative w-full h-36 hidden sm:flex items-center justify-center">
                          {/* Track ticks */}
                          <div
                            className="absolute inset-y-2 w-8 flex flex-col justify-between pointer-events-none opacity-35"
                            aria-hidden="true"
                          >
                            {[100, 75, 50, 25, 0].map((t) => (
                              <div key={t} className="w-full flex items-center justify-between">
                                <span className="w-2 h-[1px] bg-white" />
                                <span className="w-2 h-[1px] bg-white" />
                              </div>
                            ))}
                          </div>

                          {/* Visual vertical bar */}
                          <div
                            className="w-2.5 h-32 rounded-full bg-white/10 relative overflow-hidden pointer-events-none"
                            aria-hidden="true"
                          >
                            <div
                              className="absolute bottom-0 inset-x-0 bg-primary rounded-full transition-all duration-150"
                              style={{ height: `${pct}%` }}
                            />
                          </div>

                          {/* Rotated native input range for full keyboard/screen-reader accessibility */}
                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            value={pct}
                            aria-label={`${ch.fullName} budget allocation percentage`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={pct}
                            aria-valuetext={`${ch.shortLabel} ${pct}% (${formatINR(channelINR)})`}
                            onChange={(e) => handleFaderChange(ch.key, Number(e.target.value))}
                            className="absolute w-32 h-8 -rotate-90 appearance-none bg-transparent cursor-pointer accent-primary"
                          />
                        </div>

                        {/* Mobile Horizontal Fader (<sm) */}
                        <div className="w-full sm:hidden py-2">
                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            value={pct}
                            aria-label={`${ch.fullName} budget allocation percentage`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={pct}
                            aria-valuetext={`${ch.shortLabel} ${pct}% (${formatINR(channelINR)})`}
                            onChange={(e) => handleFaderChange(ch.key, Number(e.target.value))}
                            className="w-full accent-primary cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Channel Label & Rupee Readout */}
                      <div className="w-full text-center pt-2.5 border-t border-white/10">
                        <div className="text-[13px] font-extrabold text-white">
                          {ch.shortLabel}
                        </div>
                        <div className="font-mono text-[11px] text-primary-100 mt-0.5">
                          {formatINR(channelINR)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right 5 Cols: Master Total Budget Input + Live Output Meter Panel */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-white text-navy p-5 sm:p-6 shadow-xl">
                <div>
                  {/* Master Total Budget Control */}
                  <div className="pb-5 mb-5 border-b border-navy-08">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <label
                        htmlFor="master-budget-input"
                        className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary"
                      >
                        MASTER TOTAL MONTHLY BUDGET (₹)
                      </label>
                      <span className="font-mono text-[18px] font-extrabold text-navy">
                        {formatINR(totalBudgetINR)}
                      </span>
                    </div>

                    <input
                      id="master-budget-input"
                      type="range"
                      min={30000}
                      max={1500000}
                      step={10000}
                      value={totalBudgetINR}
                      onChange={(e) => setTotalBudgetINR(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />

                    {/* Quick Budget Preset Chips */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {[50000, 150000, 350000, 750000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setTotalBudgetINR(amt)}
                          className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold transition-colors cursor-pointer ${
                            totalBudgetINR === amt
                              ? 'bg-primary text-white'
                              : 'bg-primary-50 text-navy hover:bg-primary-100'
                          }`}
                        >
                          {formatINR(amt)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Output Meter Panel (aria-live) */}
                  <div aria-live="polite" aria-atomic="true">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60">
                        PROJECTED MONTHLY OUTPUT METER
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold">
                        Blended ROAS ~{mixerProjections.blendedRoas}x
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-primary-50/70 border border-primary-100">
                        <div className="font-mono text-[10px] font-bold uppercase text-navy-60">
                          EST. CLICKS
                        </div>
                        <div className="font-mono text-[15px] font-extrabold text-navy mt-1">
                          {mixerProjections.clicksLow.toLocaleString('en-IN')}–
                          {mixerProjections.clicksHigh.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-primary-50/70 border border-primary-100">
                        <div className="font-mono text-[10px] font-bold uppercase text-navy-60">
                          EST. {currentPresetObj.outcomeWord.toUpperCase()}
                        </div>
                        <div className="font-mono text-[15px] font-extrabold text-primary mt-1">
                          {mixerProjections.convLow.toLocaleString('en-IN')}–
                          {mixerProjections.convHigh.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-navy text-white">
                        <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                          EST. REVENUE
                        </div>
                        <div className="font-mono text-[14px] font-extrabold text-white mt-1">
                          {formatINR(mixerProjections.revLow)}–
                          {formatINR(mixerProjections.revHigh)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Honest Disclaimer & Action */}
                <div className="mt-5 pt-4 border-t border-navy-08">
                  <p className="text-[11.5px] text-navy-60 leading-relaxed mb-3.5">
                    Illustrative projections based on sample benchmarks — real results depend on
                    your market, offer and website.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      triggerQuoteModal(
                        `Custom Media Plan (${currentPresetObj.label} • ${formatINR(
                          totalBudgetINR
                        )}/mo)`
                      )
                    }
                    className="w-full py-3 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer"
                  >
                    <span>Get a Custom Media Plan for This Budget</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — FULL-FUNNEL TARGETING: THE BULLSEYE (bg: #f0f7fd)
         ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Target className="w-3.5 h-3.5 text-primary" />
              <span>FULL-FUNNEL INTENT ARCHITECTURE</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              We Hit Every Stage, <span className="text-primary">Then the Bullseye</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Click any ring on the target below to inspect how we pair top-of-funnel YouTube and
              Display discovery with high-intent Search, Shopping, and remarketing loops.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left 6 Cols: Interactive 4-Ring Concentric Bullseye Target */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center select-none">
                {/* Ring 1 (Outer): Awareness */}
                <button
                  type="button"
                  onClick={() => setSelectedRingId('awareness')}
                  aria-label="Select Awareness outer ring"
                  className={`w-full h-full rounded-full flex items-center justify-center transition-all cursor-pointer border-2 ${
                    selectedRingId === 'awareness'
                      ? 'bg-primary/20 border-primary shadow-[0_0_0_6px_rgba(5,113,194,0.15)]'
                      : 'bg-white hover:bg-primary-100/50 border-primary/30'
                  }`}
                >
                  <span className="absolute top-3.5 sm:top-5 font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-navy">
                    01 · Awareness
                  </span>
                </button>

                {/* Ring 2: Consideration */}
                <button
                  type="button"
                  onClick={() => setSelectedRingId('consideration')}
                  aria-label="Select Consideration ring"
                  className={`absolute w-[74%] h-[74%] rounded-full flex items-center justify-center transition-all cursor-pointer border-2 ${
                    selectedRingId === 'consideration'
                      ? 'bg-primary/35 border-primary shadow-md'
                      : 'bg-primary-100/80 hover:bg-primary/25 border-primary/40'
                  }`}
                >
                  <span className="absolute top-3.5 sm:top-5 font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-navy">
                    02 · Consideration
                  </span>
                </button>

                {/* Ring 3: Conversion */}
                <button
                  type="button"
                  onClick={() => setSelectedRingId('conversion')}
                  aria-label="Select Conversion ring"
                  className={`absolute w-[48%] h-[48%] rounded-full flex items-center justify-center transition-all cursor-pointer border-2 ${
                    selectedRingId === 'conversion'
                      ? 'bg-primary text-white border-navy shadow-lg'
                      : 'bg-primary/70 hover:bg-primary/85 text-white border-white/50'
                  }`}
                >
                  <span className="absolute top-3 sm:top-4 font-mono text-[9.5px] sm:text-[10.5px] font-extrabold uppercase tracking-wider text-white">
                    03 · Conversion
                  </span>
                </button>

                {/* Ring 4 (Center Bullseye): Remarketing & Repeat */}
                <button
                  type="button"
                  onClick={() => setSelectedRingId('remarketing')}
                  aria-label="Select Remarketing and Repeat center bullseye"
                  className={`absolute w-[24%] h-[24%] rounded-full flex flex-col items-center justify-center transition-all cursor-pointer border-2 ${
                    selectedRingId === 'remarketing'
                      ? 'bg-navy text-white border-white scale-105 shadow-xl'
                      : 'bg-navy/90 hover:bg-navy text-white border-primary-100'
                  }`}
                >
                  <Target className="w-4 h-4 text-primary mb-0.5" />
                  <span className="font-mono text-[8.5px] sm:text-[9.5px] font-extrabold uppercase leading-tight text-center px-1">
                    Repeat
                  </span>
                </button>

                {/* Decorative Campaign "Darts" flying in and landing on rings */}
                <motion.div
                  initial={shouldReduceMotion ? false : { x: 40, y: -40, opacity: 0 }}
                  whileInView={{ x: 0, y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="absolute top-[14%] right-[16%] pointer-events-none flex items-center gap-1 px-2 py-0.5 rounded-full bg-navy text-white font-mono text-[9px] font-bold shadow-md"
                  aria-hidden="true"
                >
                  <span>↘ YouTube</span>
                </motion.div>

                <motion.div
                  initial={shouldReduceMotion ? false : { x: -40, y: -30, opacity: 0 }}
                  whileInView={{ x: 0, y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.22 }}
                  className="absolute top-[28%] left-[10%] pointer-events-none flex items-center gap-1 px-2 py-0.5 rounded-full bg-navy text-white font-mono text-[9px] font-bold shadow-md"
                  aria-hidden="true"
                >
                  <span>↘ Shopping</span>
                </motion.div>

                <motion.div
                  initial={shouldReduceMotion ? false : { x: 35, y: 35, opacity: 0 }}
                  whileInView={{ x: 0, y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.34 }}
                  className="absolute bottom-[30%] right-[24%] pointer-events-none flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-white border border-white font-mono text-[9px] font-bold shadow-md"
                  aria-hidden="true"
                >
                  <span>🎯 Search</span>
                </motion.div>
              </div>

              {/* Quick Ring Selector Buttons Below Target */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {BULLSEYE_RINGS.map((ring) => {
                  const isActive = ring.id === selectedRingId;
                  return (
                    <button
                      key={ring.id}
                      type="button"
                      onClick={() => setSelectedRingId(ring.id)}
                      className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-navy text-white border-navy shadow-xs'
                          : 'bg-white text-navy border-navy-15 hover:border-primary'
                      }`}
                    >
                      0{ring.ringOrder} · {ring.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 6 Cols: Selected Ring Detail Card */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRing.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="rounded-[24px] bg-white border border-navy-08 p-6 sm:p-8 shadow-soft"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-navy-08">
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase">
                      {activeRing.shortTag}
                    </span>
                    <span className="font-mono text-[12px] font-bold text-navy-60">
                      Stage 0{activeRing.ringOrder} of 04
                    </span>
                  </div>

                  <h3 className="mt-5 text-[24px] sm:text-[28px] font-extrabold text-navy leading-snug">
                    {activeRing.name} Stage Strategy
                  </h3>

                  <p className="mt-2.5 text-[15px] text-navy-70 leading-relaxed">
                    {activeRing.goalStatement}
                  </p>

                  {/* Channels Used */}
                  <div className="mt-6">
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-2.5">
                      CHANNELS DEPLOYED (ZERO SOCIAL FLUFF):
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeRing.channelsUsed.map((ch) => (
                        <span
                          key={ch}
                          className="px-3 py-1.5 rounded-xl bg-primary-50/80 border border-primary-100 text-[12.5px] font-bold text-navy"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Example Campaigns */}
                  <div className="mt-5 pt-5 border-t border-navy-08">
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60 mb-2.5">
                      EXAMPLE CAMPAIGN PLAYS:
                    </div>
                    <ul className="space-y-2">
                      {activeRing.exampleCampaigns.map((ex) => (
                        <li
                          key={ex}
                          className="flex items-start gap-2.5 text-[13.5px] text-navy leading-relaxed"
                        >
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Metric & Benchmark Box */}
                  <div className="mt-6 p-4 rounded-2xl bg-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                        PRIMARY KPI MEASURED
                      </div>
                      <div className="text-[14px] font-bold text-white mt-0.5">
                        {activeRing.keyMetric}
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <span className="inline-block px-3 py-1 rounded-lg bg-primary text-white font-mono text-[11.5px] font-extrabold">
                        {activeRing.sampleBenchmark}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — THE CREATIVE TESTING ARENA: A/B TESTS (bg: #ffffff)
         ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + 3 Test Type Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>CONTINUOUS EXPERIMENTATION</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                We Let the <span className="text-primary">Data Pick the Winner</span>
              </h2>
            </div>

            {/* 3 Test Type Switcher Tabs */}
            <div
              className="inline-flex flex-wrap p-1.5 rounded-2xl bg-primary-50 border border-primary-100 gap-1"
              role="tablist"
              aria-label="A/B test types"
            >
              {ARENA_TESTS.map((test) => {
                const isSelected = test.id === selectedArenaTabId;
                return (
                  <button
                    key={test.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedArenaTabId(test.id)}
                    className={`px-4 py-2.5 rounded-xl text-[13px] font-extrabold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-navy hover:text-primary'
                    }`}
                  >
                    {test.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experiment Hypothesis Bar */}
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-primary-50/70 border border-primary-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="text-[14px] text-navy">
              <strong className="font-extrabold text-primary uppercase font-mono text-[12px] mr-2">
                HYPOTHESIS:
              </strong>
              <span className="font-semibold">{activeArenaTest.experimentHypothesis}</span>
            </div>
            <span className="font-mono text-[11.5px] font-bold text-navy-60 shrink-0">
              {activeArenaTest.trafficSplitInfo}
            </span>
          </div>

          {/* The Arena: Ad A vs Ad B */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArenaTest.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* Left 5 Cols: Variant A (Loser / Control — slightly faded) */}
              <div className="lg:col-span-5 rounded-[24px] bg-white border border-navy-15 p-6 flex flex-col justify-between opacity-85">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3.5 mb-4 border-b border-navy-08">
                    <span className="px-3 py-1 rounded-full bg-navy-08 text-navy font-mono text-[11px] font-extrabold">
                      {activeArenaTest.variantA.code} • CONTROL
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-navy-60">
                      {activeArenaTest.variantA.variantTitle}
                    </span>
                  </div>

                  {/* Generic Ad Mockup Card */}
                  <div className="rounded-2xl bg-primary-50/40 border border-navy-08 p-4">
                    <div className="font-mono text-[10px] font-bold text-navy-60 mb-1">
                      {activeArenaTest.variantA.adFormatLabel}
                    </div>
                    <h3 className="text-[16px] font-extrabold text-navy leading-snug">
                      {activeArenaTest.variantA.headline}
                    </h3>
                    <p className="mt-2 text-[13px] text-navy-70 leading-relaxed">
                      {activeArenaTest.variantA.description}
                    </p>
                    <div className="mt-3 p-2.5 rounded-xl bg-white border border-navy-08 font-mono text-[11px] text-navy-60">
                      {activeArenaTest.variantA.visualCalloutBox}
                    </div>
                    <div className="mt-3">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-navy/80 text-white text-[12px] font-bold">
                        {activeArenaTest.variantA.ctaButtonText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Racing CTR & Conversion Rate Bars */}
                <div className="mt-6 pt-5 border-t border-navy-08 space-y-3.5">
                  <div>
                    <div className="flex justify-between font-mono text-[12px] font-bold text-navy mb-1">
                      <span>Click-Through Rate (CTR)</span>
                      <span>{activeArenaTest.variantA.ctrPercent}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-navy-08 overflow-hidden">
                      <motion.div
                        initial={shouldReduceMotion ? false : { width: 0 }}
                        animate={{ width: `${(activeArenaTest.variantA.ctrPercent / 10) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full rounded-full bg-navy/50"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-mono text-[12px] font-bold text-navy mb-1">
                      <span>Conversion Rate (CVR)</span>
                      <span>{activeArenaTest.variantA.convRatePercent}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-navy-08 overflow-hidden">
                      <motion.div
                        initial={shouldReduceMotion ? false : { width: 0 }}
                        animate={{
                          width: `${(activeArenaTest.variantA.convRatePercent / 7) * 100}%`,
                        }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="h-full rounded-full bg-navy/50"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between font-mono text-[12px] text-navy-60">
                    <span>Cost per Acquisition (CPA):</span>
                    <strong className="text-navy">
                      {formatINR(activeArenaTest.variantA.cpaINR)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Center 2 Cols: VS Badge */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center py-2">
                <div className="w-14 h-14 rounded-full bg-navy text-white border-4 border-primary-50 shadow-lg flex items-center justify-center font-mono text-[16px] font-extrabold">
                  VS
                </div>
                <span className="mt-2 font-mono text-[10px] font-bold uppercase tracking-widest text-navy-60 text-center">
                  HEAD-TO-HEAD SPLIT
                </span>
              </div>

              {/* Right 5 Cols: Variant B (Winner with Blue Crown Badge) */}
              <div className="lg:col-span-5 rounded-[24px] bg-white border-2 border-primary p-6 shadow-xl flex flex-col justify-between relative">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-navy-08">
                    <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold">
                      {activeArenaTest.variantB.code} • CHALLENGER
                    </span>

                    {activeArenaTest.variantB.winnerLiftBadge && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy text-white font-mono text-[11px] font-extrabold shadow-xs">
                        <Crown className="w-3.5 h-3.5 text-primary" />
                        <span>{activeArenaTest.variantB.winnerLiftBadge} (placeholder)</span>
                      </span>
                    )}
                  </div>

                  {/* Winner Ad Mockup Card */}
                  <div className="rounded-2xl bg-primary-50/70 border border-primary/40 p-4">
                    <div className="font-mono text-[10px] font-bold text-primary mb-1">
                      {activeArenaTest.variantB.adFormatLabel}
                    </div>
                    <h3 className="text-[16px] font-extrabold text-navy leading-snug">
                      {activeArenaTest.variantB.headline}
                    </h3>
                    <p className="mt-2 text-[13px] text-navy leading-relaxed">
                      {activeArenaTest.variantB.description}
                    </p>
                    <div className="mt-3 p-2.5 rounded-xl bg-white border border-primary/30 font-mono text-[11px] font-bold text-primary">
                      {activeArenaTest.variantB.visualCalloutBox}
                    </div>
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-white text-[12px] font-bold">
                        <span>{activeArenaTest.variantB.ctaButtonText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Racing CTR & Conversion Rate Bars (Blue Winner) */}
                <div className="mt-6 pt-5 border-t border-navy-08 space-y-3.5">
                  <div>
                    <div className="flex justify-between font-mono text-[12px] font-extrabold text-navy mb-1">
                      <span>Click-Through Rate (CTR)</span>
                      <span className="text-primary">{activeArenaTest.variantB.ctrPercent}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-primary-50 overflow-hidden">
                      <motion.div
                        initial={shouldReduceMotion ? false : { width: 0 }}
                        animate={{ width: `${(activeArenaTest.variantB.ctrPercent / 10) * 100}%` }}
                        transition={{ duration: 0.55 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-mono text-[12px] font-extrabold text-navy mb-1">
                      <span>Conversion Rate (CVR)</span>
                      <span className="text-primary">
                        {activeArenaTest.variantB.convRatePercent}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-primary-50 overflow-hidden">
                      <motion.div
                        initial={shouldReduceMotion ? false : { width: 0 }}
                        animate={{
                          width: `${(activeArenaTest.variantB.convRatePercent / 7) * 100}%`,
                        }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between font-mono text-[12px] text-navy">
                    <span className="font-semibold">Cost per Acquisition (CPA):</span>
                    <strong className="px-2.5 py-0.5 rounded bg-primary text-white font-extrabold">
                      {formatINR(activeArenaTest.variantB.cpaINR)}
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Caption */}
          <div className="mt-8 p-4 rounded-2xl bg-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[14px] text-white/90 font-medium">
              We run continuous tests on ads, offers and landing pages — small wins compound every
              month.
            </p>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <span className="font-mono text-[12px] font-bold text-primary-100">
                Takeaway: {activeArenaTest.keyTakeaway}
              </span>
              <Link
                href="/services/google-ads-sem"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[12px] transition-colors"
              >
                <span>Google Ads (SEM)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/conversion-rate-optimization"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-primary text-white font-semibold text-[12px] border border-white/15 transition-colors"
              >
                <span>Conversion Rate Optimization (CRO)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/creative-communication"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-primary text-white font-semibold text-[12px] border border-white/15 transition-colors"
              >
                <span>Creative &amp; Communication</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/email-marketing"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-primary text-white font-semibold text-[12px] border border-white/15 transition-colors"
              >
                <span>Email Marketing &amp; Retention</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/analytics-tracking-setup"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-primary text-white font-semibold text-[12px] border border-white/15 transition-colors"
              >
                <span>Analytics &amp; Tracking Setup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/ai-solutions/ai-analytics-reporting"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-primary text-white font-semibold text-[12px] border border-white/15 transition-colors"
              >
                <span>AI Analytics &amp; Reporting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PerformanceMarketing;
