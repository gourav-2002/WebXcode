import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Search,
  Target,
  Sliders,
  Sparkles,
  Crown,
  Phone,
  MapPin,
  ShoppingBag,
  Tv,
  Globe,
  RefreshCw,
  Award,
  TrendingUp,
  Layers,
  ExternalLink,
  Star,
  Tag,
} from 'lucide-react';
import { services } from '../Services';

/* ==========================================================================
   HELPERS — INDIAN CURRENCY & NUMBER FORMATTING
   ========================================================================== */
const formatINR = (amount: number): string => {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
};

/* ==========================================================================
   SECTION 1 — HERO: LIVE AD AUCTION ARENA DATA
   ========================================================================== */
interface HeroAuctionQuery {
  id: string;
  query: string;
  intentTag: string;
}

const HERO_AUCTION_QUERIES: HeroAuctionQuery[] = [
  {
    id: 'crm-india',
    query: 'best crm software india',
    intentTag: 'B2B High-Intent Search',
  },
  {
    id: 'dental-clinic',
    query: 'emergency dental clinic near me',
    intentTag: 'Local Urgent Service',
  },
  {
    id: 'ergonomic-chair',
    query: 'buy ergonomic office chair online',
    intentTag: 'Commercial Shopping Query',
  },
];

interface HeroAuctionBidder {
  id: string;
  name: string;
  isClient: boolean;
  maxCpcBidINR: number;
  qualityScore: number; // out of 10
  adRankScore: number; // Bid * Quality Multiplier
  actualCpcPaidINR: number;
  positionLabel: string;
}

const HERO_AUCTION_BIDDERS: HeroAuctionBidder[] = [
  {
    id: 'competitor-a',
    name: 'Competitor A',
    isClient: false,
    maxCpcBidINR: 80,
    qualityScore: 4,
    adRankScore: 320,
    actualCpcPaidINR: 68,
    positionLabel: 'Position #2',
  },
  {
    id: 'competitor-b',
    name: 'Competitor B',
    isClient: false,
    maxCpcBidINR: 70,
    qualityScore: 5,
    adRankScore: 350,
    actualCpcPaidINR: 65,
    positionLabel: 'Position #3',
  },
  {
    id: 'your-business',
    name: 'Your Business (Managed by WebXCode)',
    isClient: true,
    maxCpcBidINR: 55,
    qualityScore: 9,
    adRankScore: 495,
    actualCpcPaidINR: 42,
    positionLabel: 'Position #1 • Top of Page',
  },
];

/* ==========================================================================
   SECTION 2 — QUALITY SCORE SIMULATOR PRESETS
   ========================================================================== */
interface QualitySimulatorPreset {
  id: 'unmanaged' | 'managed';
  label: string;
  ctrScore: number; // 1 to 10
  adRelevanceScore: number; // 1 to 10
  landingPageScore: number; // 1 to 10
  caption: string;
}

const QUALITY_SIMULATOR_PRESETS: QualitySimulatorPreset[] = [
  {
    id: 'unmanaged',
    label: 'Typical Unmanaged Account (QS 4/10)',
    ctrScore: 4,
    adRelevanceScore: 4,
    landingPageScore: 4,
    caption: 'Generic ad groups, broad keywords, and traffic sent to a slow homepage.',
  },
  {
    id: 'managed',
    label: 'WebXCode Managed Account (QS 9/10)',
    ctrScore: 9,
    adRelevanceScore: 9,
    landingPageScore: 9,
    caption: 'Tightly themed ad groups, exact headline match, and sub-2s conversion landing pages.',
  },
];

/* ==========================================================================
   SECTION 3 — 6 GOOGLE ADS CAMPAIGN TYPES: PLACEMENT STAGE DATA
   ========================================================================== */
type CampaignTypeKey =
  | 'search'
  | 'shopping'
  | 'pmax'
  | 'youtube'
  | 'display-remarketing'
  | 'local-call';

interface CampaignStageSpec {
  id: CampaignTypeKey;
  tabLabel: string;
  fullName: string;
  badgeText: string;
  headline: string;
  summary: string;
  bestForChips: [string, string, string];
  whatWeSetUp: [string, string, string, string];
  keyMetricTracked: string;
  sampleBenchmark: string;
}

const CAMPAIGN_STAGE_TABS: CampaignStageSpec[] = [
  {
    id: 'search',
    tabLabel: 'Search Ads',
    fullName: 'Google Search Campaigns (High-Intent Text Ads)',
    badgeText: 'BOTTOM-OF-FUNNEL INTENT',
    headline: 'Appear #1 at the Exact Second a Buyer Searches for Your Service',
    summary:
      'We build tightly structured Search campaigns around commercial and transactional keywords—complete with responsive search ads, sitelinks, callouts, and strict negative keyword lists.',
    bestForChips: ['B2B & SaaS Demos', 'High-Ticket Services', 'Doctors, Clinics & Legal'],
    whatWeSetUp: [
      'Single-theme ad groups with Exact & Phrase match high-intent keywords',
      '15-headline Responsive Search Ads (RSAs) pinned for message clarity',
      'Full ad asset stack: Sitelinks, Callouts, Structured Snippets, Call & Price assets',
      'Pre-launch & weekly negative keyword lists to block research/freebie clicks',
    ],
    keyMetricTracked: 'Cost Per Qualified Lead (CPL), Search Top Impression Share & Quality Score',
    sampleBenchmark: '7.8% avg. Search CTR & -38% lower CPL vs broad accounts (placeholder)',
  },
  {
    id: 'shopping',
    tabLabel: 'Shopping Ads',
    fullName: 'Google Shopping & Merchant Center Feed Campaigns',
    badgeText: 'E-COMMERCE & RETAIL CATALOGS',
    headline: 'Show Your Product Photo, Price & Star Rating Before They Even Click',
    summary:
      'For online stores, Google Shopping sits right at the top of search results. We optimize your Google Merchant Center product titles, GTINs, custom labels, and margin-tiered bidding.',
    bestForChips: ['Shopify & WooCommerce', 'D2C Consumer Brands', 'Multi-SKU Retail Catalogs'],
    whatWeSetUp: [
      'Google Merchant Center feed setup, diagnostics cleanup & disapproval fixes',
      'Keyword-rich product title & attribute optimization for higher search matching',
      'Custom labels by profit margin, bestseller status, and seasonal inventory',
      'Product review star ratings & Merchant Promotions ("15% Off" badges) integration',
    ],
    keyMetricTracked: 'Return on Ad Spend (ROAS), Cost Per Order & Feed Approval Rate',
    sampleBenchmark: '4.6x average Shopping ROAS across D2C catalogs (placeholder)',
  },
  {
    id: 'pmax',
    tabLabel: 'Performance Max',
    fullName: 'Performance Max (All-in-One Goal-Based Campaigns)',
    badgeText: 'FULL GOOGLE INVENTORY',
    headline: 'Scale Across Search, Shopping, YouTube, Discovery, Gmail & Maps',
    summary:
      'Performance Max works when fed clean conversion data and structured asset groups—not left on autopilot. We segment asset groups by product/service line and feed first-party audience signals.',
    bestForChips: ['Scaling E-commerce ROAS', 'Multi-Channel Lead Gen', 'Omnichannel Retail'],
    whatWeSetUp: [
      'Segmented asset groups with custom images, video hooks, and headlines per category',
      'First-party customer list & high-intent custom search term audience signals',
      'Brand exclusions so PMax does not cannibalize your cheap branded search traffic',
      'Placement exclusions & script-based spend visibility across Search, Shopping & Video',
    ],
    keyMetricTracked: 'Incremental Conversions, Blended ROAS & New-Customer Acquisition Ratio',
    sampleBenchmark: '+34% incremental conversion volume alongside core Search (placeholder)',
  },
  {
    id: 'youtube',
    tabLabel: 'YouTube Ads',
    fullName: 'YouTube Video Action & In-Stream Campaigns',
    badgeText: 'VISUAL DEMAND & ACTION',
    headline: 'Turn Viewers Researching Your Category Into Direct Website Leads',
    summary:
      'Run skippable In-Stream, YouTube Shorts, and In-Feed video ads targeting users based on what they recently searched on Google—complete with direct CTA overlays and product feeds.',
    bestForChips: ['Product Launches & Demos', 'EdTech & Coaching', 'D2C Brand Scaling'],
    whatWeSetUp: [
      'Custom intent audiences targeting people who searched your top keywords on Google',
      'Video Action campaigns with clickable CTA buttons, sitelinks & lead forms',
      'YouTube Shorts vertical ad placements for mobile-first buyer discovery',
      'Sequential video remarketing for visitors who viewed key pages but did not convert',
    ],
    keyMetricTracked: 'Cost Per View (CPV), View-Through Conversions & Assisted ROAS',
    sampleBenchmark: '₹0.45 – ₹1.20 avg. CPV & 32% view completion rate (placeholder)',
  },
  {
    id: 'display-remarketing',
    tabLabel: 'Display & Remarketing',
    fullName: 'Google Display Network & Dynamic Remarketing',
    badgeText: '95% VISITOR RECOVERY',
    headline: 'Bring Back Window Shoppers, Cart Abandoners & Pricing Page Visitors',
    summary:
      '95% of first-time visitors leave without buying or inquiring. We build clean responsive display ads and dynamic product remarketing across 2M+ news sites, blogs, and YouTube.',
    bestForChips: ['Cart Recovery', 'Long B2B Sales Cycles', 'High-Consideration Buyers'],
    whatWeSetUp: [
      'Segmented GA4 audiences (Pricing page viewers, 7-day cart abandoners, past buyers)',
      'Dynamic remarketing feeds showing the exact product a shopper viewed',
      'Responsive Display Ads in all standard IAB aspect ratios with brand guardrails',
      'Strict mobile app & kids-channel exclusions so zero budget leaks on accidental taps',
    ],
    keyMetricTracked: 'Remarketing CPA, Return Visitor Conversion Rate & Frequency Cap',
    sampleBenchmark: '3.9x remarketing ROAS & -46% lower CPA than cold traffic (placeholder)',
  },
  {
    id: 'local-call',
    tabLabel: 'Local & Call Ads',
    fullName: 'Google Maps Promoted Pins & Call-Only Campaigns',
    badgeText: 'CALLS, DIRECTIONS & WALK-INS',
    headline: 'Drive Direct Phone Calls, Store Visits & Appointment Bookings Nearby',
    summary:
      'Ideal for clinics, emergency services, showrooms, and local branches. We link your Google Business Profile to run promoted Map pins, radius-targeted search ads, and mobile tap-to-call ads.',
    bestForChips: ['Clinics & Hospitals', 'Showrooms & Dealerships', 'Home & Emergency Services'],
    whatWeSetUp: [
      'Google Business Profile location asset linking for Promoted Pins on Google Maps',
      'Mobile Call-Only & Call-Asset campaigns scheduled strictly during your business hours',
      'Pin-code and radius bid adjustments around your highest-value neighborhoods',
      'Call duration tracking (counting calls over 60 seconds as verified conversions)',
    ],
    keyMetricTracked: 'Verified Phone Calls, Get-Directions Taps & Cost Per Call',
    sampleBenchmark: '2.8x increase in qualified inbound phone calls within 30 days (placeholder)',
  },
];

/* ==========================================================================
   SECTION 4 — ANATOMY OF A HIGH-CONVERTING GOOGLE SEARCH AD (6 CALLOUTS)
   ========================================================================== */
interface SearchAdHotspot {
  id: number;
  title: string;
  shortLabel: string;
  whatItIs: string;
  howWeOptimize: string;
  ctrImpactBadge: string;
}

const SEARCH_AD_HOTSPOTS: SearchAdHotspot[] = [
  {
    id: 1,
    title: 'Display URL & Path Fields',
    shortLabel: '01 • URL Path',
    whatItIs:
      'The clean URL path shown right below your brand name (e.g. yourbrand.com/CRM-Software/India-Pricing).',
    howWeOptimize:
      'We populate both 15-character path fields with the exact searched keyword so users immediately confirm the page matches their query.',
    ctrImpactBadge: '+14% Trust & Relevance Lift',
  },
  {
    id: 2,
    title: 'Headline Stack (Up to 3 Shown)',
    shortLabel: '02 • Headlines',
    whatItIs:
      'The bold blue clickable title of your ad—the single biggest driver of Click-Through Rate (CTR) and Ad Relevance.',
    howWeOptimize:
      'We write 15 distinct headlines combining exact keyword match in Position 1, a quantified proof point in Position 2, and a clear CTA in Position 3.',
    ctrImpactBadge: '+38% Headline CTR Lift',
  },
  {
    id: 3,
    title: 'Description Lines (Value + Offer + Proof)',
    shortLabel: '03 • Descriptions',
    whatItIs:
      'Two 90-character lines of persuasive copy below the headline that pre-qualify the click and differentiate you from rivals.',
    howWeOptimize:
      'Instead of vague slogans, we pack concrete specifics: transparent starting prices, delivery timelines, GST invoicing, and risk-reversal guarantees.',
    ctrImpactBadge: '+22% Qualified Click Rate',
  },
  {
    id: 4,
    title: 'Sitelink Assets (4 Deep Links)',
    shortLabel: '04 • Sitelinks',
    whatItIs:
      'Four additional clickable links with two-line descriptions underneath your main ad that double your vertical screen real estate.',
    howWeOptimize:
      'We route buyers directly to high-intent subpages—Pricing Plans, Case Studies, Free Demo Booking, and Competitor Comparison—pushing rivals further down.',
    ctrImpactBadge: '+26% Extra SERP Real Estate',
  },
  {
    id: 5,
    title: 'Callout & Structured Snippet Assets',
    shortLabel: '05 • Callouts & Snippets',
    whatItIs:
      'Punchy trust bullets (e.g. "24/7 Support • Free Migration • ISO Certified") and categorized feature lists.',
    howWeOptimize:
      'We add 8–10 account and ad-group level callouts plus structured snippets ("Types:", "Services:", "Brands:") to answer objections before the click.',
    ctrImpactBadge: '+15% Ad Rank Extension Score',
  },
  {
    id: 6,
    title: 'Call, Location, Price & Image Assets',
    shortLabel: '06 • Call, Price & Image',
    whatItIs:
      'Interactive tap-to-call phone numbers, Google Maps address pins, swipeable price cards, and verified 60×60 thumbnail images.',
    howWeOptimize:
      'We enable verified image thumbnails, live starting price cards, and business-hours call tracking to make your text ad visually impossible to ignore.',
    ctrImpactBadge: '+31% Mobile Conversion Rate',
  },
];

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */
interface GoogleAdsPageProps {
  onOpenQuoteModal?: (service?: string) => void;
}

const GoogleAds: React.FC<GoogleAdsPageProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Single Source of Truth from ../Services */
  const googleAdsService = useMemo(
    () => services.find((s) => s.slug === 'google-ads-sem'),
    []
  );

  const serviceName = googleAdsService?.name || 'Google Ads (SEM)';
  const serviceDescription =
    googleAdsService?.description ||
    'Capture buyers at the exact moment they search on Google. We build tightly themed Search campaigns, clean Google Merchant Center Shopping feeds, and negative-keyword guardrails that eliminate wasted ad spend.';

  /* Helper to trigger Quote Modal */
  const triggerQuoteModal = (customContext?: string) => {
    const label = customContext || serviceName;
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  /* SEO Meta Title & Description + Restore on Unmount */
  useEffect(() => {
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';

    document.title =
      'Google Ads (SEM) Agency — Search, Shopping, Performance Max & YouTube Ads | WebXCode';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Win the Google Ads auction without overpaying. Expert Google Search, Shopping, Performance Max, YouTube & Remarketing management engineered for high Quality Score, lower CPCs, and verified ROAS.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Section 1 State: Hero Live Auction Query Selector */
  const [selectedHeroQueryId, setSelectedHeroQueryId] = useState<string>(
    HERO_AUCTION_QUERIES[0].id
  );
  const activeHeroQuery = useMemo(
    () =>
      HERO_AUCTION_QUERIES.find((q) => q.id === selectedHeroQueryId) ||
      HERO_AUCTION_QUERIES[0],
    [selectedHeroQueryId]
  );

  /* Section 2 State: Quality Score Simulator Sliders */
  const [qsCtr, setQsCtr] = useState<number>(9);
  const [qsRelevance, setQsRelevance] = useState<number>(9);
  const [qsLandingPage, setQsLandingPage] = useState<number>(9);

  const qualitySimulation = useMemo(() => {
    // Weighted Google Quality Score formula approximation (Landing page + Expected CTR carry slightly higher weight)
    const rawScore = qsCtr * 0.35 + qsRelevance * 0.25 + qsLandingPage * 0.4;
    const qualityScore = Math.max(1, Math.min(10, Math.round(rawScore)));

    // Baseline CPC at QS = 5 is ₹60; Monthly sample budget is ₹1,00,000; CVR scales with Landing Page score
    const baselineCpcAtQs5 = 60;
    // Google Ads discount/penalty curve relative to QS 5
    const qsMultiplierMap: Record<number, number> = {
      1: 2.2,
      2: 1.75,
      3: 1.45,
      4: 1.2,
      5: 1.0,
      6: 0.9,
      7: 0.82,
      8: 0.75,
      9: 0.68,
      10: 0.6,
    };
    const cpcMultiplier = qsMultiplierMap[qualityScore] || 1.0;
    const estCpcINR = Math.round(baselineCpcAtQs5 * cpcMultiplier);

    const sampleMonthlyBudgetINR = 100000;
    const estMonthlyClicks = Math.round(sampleMonthlyBudgetINR / estCpcINR);

    // Conversion rate improves when landing page & ad relevance are higher (2.4% at low -> 5.4% at high)
    const convRatePct = 2.0 + (qsLandingPage * 0.24 + qsRelevance * 0.1);
    const estMonthlyLeads = Math.max(
      8,
      Math.round(estMonthlyClicks * (convRatePct / 100))
    );

    // Baseline comparison against QS 4/10 unmanaged account (CPC ₹72, ~38 leads)
    const unmanagedLeads = 38;
    const extraLeadsVsUnmanaged = estMonthlyLeads - unmanagedLeads;

    return {
      qualityScore,
      estCpcINR,
      estMonthlyClicks,
      estMonthlyLeads,
      extraLeadsVsUnmanaged,
      convRatePct: convRatePct.toFixed(1),
    };
  }, [qsCtr, qsRelevance, qsLandingPage]);

  const applyQualityPreset = (preset: QualitySimulatorPreset) => {
    setQsCtr(preset.ctrScore);
    setQsRelevance(preset.adRelevanceScore);
    setQsLandingPage(preset.landingPageScore);
  };

  /* Section 3 State: Active Campaign Placement Stage Tab */
  const [activeCampaignTab, setActiveCampaignTab] =
    useState<CampaignTypeKey>('search');
  const currentCampaignSpec = useMemo(
    () =>
      CAMPAIGN_STAGE_TABS.find((c) => c.id === activeCampaignTab) ||
      CAMPAIGN_STAGE_TABS[0],
    [activeCampaignTab]
  );

  /* Section 4 State: Active Search Ad Anatomy Hotspot */
  const [activeAdHotspotId, setActiveAdHotspotId] = useState<number>(2);
  const activeAdHotspot = useMemo(
    () =>
      SEARCH_AD_HOTSPOTS.find((h) => h.id === activeAdHotspotId) ||
      SEARCH_AD_HOTSPOTS[0],
    [activeAdHotspotId]
  );

  /* JSON-LD Service Schema */
  const jsonLdSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceName,
      description: serviceDescription,
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      areaServed: 'Worldwide',
      serviceType: 'Google Ads & Search Engine Marketing (SEM)',
    }),
    [serviceName, serviceDescription]
  );

  return (
    <main className="flex-1 bg-white text-navy">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* ======================================================================
          SECTION 1 — HERO: THE LIVE AD AUCTION ARENA (bg: #1e242e navy)
          ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Radial Blue Glow + Subtle Grid */}
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
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/65 font-medium">
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
                {serviceName}
              </li>
            </ol>
          </nav>

          {/* 50% / 50% Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 6 Cols: Copy + CTAs + Trust Chips */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Target className="w-3.5 h-3.5 text-primary" />
                <span>GOOGLE ADS • SEARCH, SHOPPING, PMAX &amp; YOUTUBE</span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-tight">
                Be #1 When Customers Search Ready to Buy —{' '}
                <span className="text-primary">Without Overpaying for Clicks</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65]">
                In Google Ads, the highest bidder doesn&apos;t automatically win. We engineer
                high-Quality-Score Search, Shopping, Performance Max, and YouTube campaigns with
                strict negative-keyword guardrails—so you win the #1 ad spot while paying less per
                click than competitors.
              </p>

              {/* Two CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#google-ads-audit"
                  onClick={(e) => {
                    const el = document.getElementById('google-ads-audit');
                    if (!el) {
                      e.preventDefault();
                      triggerQuoteModal('Free Google Ads Audit & Plan');
                    }
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all"
                >
                  <span>Get a Free Google Ads Audit &amp; Plan</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#quality-simulator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] transition-all"
                >
                  <span>Try the Quality Score Simulator</span>
                </a>
              </div>

              {/* 4 Compact Trust Chips */}
              <div className="mt-9 pt-7 border-t border-white/10 flex flex-wrap gap-2.5">
                {[
                  'Search, Shopping, PMax & YouTube',
                  'Negative-Keyword Protection',
                  'Quality Score Optimization',
                  '100% Account Ownership',
                ].map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/15 text-[12.5px] font-semibold text-white/90"
                  >
                    <span className="w-4 h-4 rounded-full bg-primary/30 text-primary flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </span>
                    <span>{chip}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right 6 Cols: The Live Ad Auction Arena Card */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] bg-white/[0.05] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                {/* Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/85">
                      LIVE GOOGLE ADS AUCTION ARENA
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-primary-100">
                    Ad Rank = Max Bid × Quality Score
                  </span>
                </div>

                {/* Search Query Bar + Switcher Pills */}
                <div className="mb-4">
                  <div className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-navy border border-white/15">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Search className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-mono text-[13px] font-bold text-white truncate">
                        &ldquo;{activeHeroQuery.query}&rdquo;
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/25 border border-primary/40 font-mono text-[10px] font-bold text-primary-100 shrink-0">
                      {activeHeroQuery.intentTag}
                    </span>
                  </div>

                  {/* Query Switcher Mini Buttons */}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[10px] text-white/50 mr-1">
                      Sample Query:
                    </span>
                    {HERO_AUCTION_QUERIES.map((q) => {
                      const active = q.id === activeHeroQuery.id;
                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => setSelectedHeroQueryId(q.id)}
                          className={`px-2.5 py-1 rounded-lg font-mono text-[10.5px] font-semibold transition-all cursor-pointer ${
                            active
                              ? 'bg-primary text-white'
                              : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {q.query}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3 Bidders Entering the Auction */}
                <div className="space-y-3">
                  {HERO_AUCTION_BIDDERS.map((bidder) => {
                    return (
                      <div
                        key={bidder.id}
                        className={`rounded-2xl p-4 transition-all border ${
                          bidder.isClient
                            ? 'bg-primary/20 border-2 border-primary shadow-lg relative'
                            : 'bg-white/[0.04] border-white/10'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            {bidder.isClient ? (
                              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                                <Crown className="w-3.5 h-3.5" />
                              </span>
                            ) : (
                              <span className="w-6 h-6 rounded-full bg-white/10 text-white/60 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                                vs
                              </span>
                            )}
                            <span
                              className={`text-[14px] font-extrabold ${
                                bidder.isClient ? 'text-white' : 'text-white/80'
                              }`}
                            >
                              {bidder.name}
                            </span>
                          </div>

                          <span
                            className={`px-2.5 py-0.5 rounded-full font-mono text-[10.5px] font-extrabold ${
                              bidder.isClient
                                ? 'bg-primary text-white shadow-xs'
                                : 'bg-white/10 text-white/65'
                            }`}
                          >
                            {bidder.positionLabel}
                          </span>
                        </div>

                        {/* 4 Auction Columns: Max Bid | Quality Score | Ad Rank | Actual CPC Paid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-white/10 font-mono">
                          <div className="p-2 rounded-lg bg-navy/60">
                            <div className="text-[10px] text-white/55 uppercase">Max Bid</div>
                            <div className="text-[14px] font-bold text-white mt-0.5">
                              ₹{bidder.maxCpcBidINR}
                            </div>
                          </div>

                          <div className="p-2 rounded-lg bg-navy/60">
                            <div className="text-[10px] text-white/55 uppercase">
                              Quality Score
                            </div>
                            <div
                              className={`text-[14px] font-extrabold mt-0.5 ${
                                bidder.isClient ? 'text-primary-100' : 'text-white/75'
                              }`}
                            >
                              {bidder.qualityScore}/10
                            </div>
                          </div>

                          <div className="p-2 rounded-lg bg-navy/60">
                            <div className="text-[10px] text-white/55 uppercase">Ad Rank</div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span
                                className={`text-[14px] font-extrabold ${
                                  bidder.isClient ? 'text-white' : 'text-white/75'
                                }`}
                              >
                                {bidder.adRankScore}
                              </span>
                              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden hidden sm:block">
                                <motion.div
                                  initial={shouldReduceMotion ? false : { width: 0 }}
                                  animate={{ width: `${(bidder.adRankScore / 500) * 100}%` }}
                                  transition={{ duration: 0.7 }}
                                  className={`h-full rounded-full ${
                                    bidder.isClient ? 'bg-primary' : 'bg-white/40'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            className={`p-2 rounded-lg ${
                              bidder.isClient
                                ? 'bg-primary text-white'
                                : 'bg-navy/60 text-white/80'
                            }`}
                          >
                            <div
                              className={`text-[10px] uppercase ${
                                bidder.isClient ? 'text-white/85' : 'text-white/55'
                              }`}
                            >
                              Actual CPC
                            </div>
                            <div className="text-[14px] font-extrabold mt-0.5">
                              ₹{bidder.actualCpcPaidINR}{' '}
                              {bidder.isClient && (
                                <span className="text-[10px] font-bold">(-38%)</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Caption */}
                <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] text-white/80">
                  <span>
                    <strong className="text-primary-100">The Google Ads Secret:</strong> Higher
                    Quality Score = #1 Ad Position at a{' '}
                    <span className="underline decoration-primary font-bold">
                      38% lower cost per click
                    </span>
                    .
                  </span>
                  <span className="font-mono text-[10.5px] text-white/50 shrink-0">
                    Illustrative Auction Model
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2 — QUALITY SCORE SIMULATOR: PAY LESS FOR HIGHER RANK (#ffffff)
          ====================================================================== */}
      <section id="quality-simulator" className="py-[72px] lg:py-[112px] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              HOW GOOGLE ADS ACTUALLY WORKS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Quality Score Is Your Unfair Advantage —{' '}
              <span className="text-primary">Try the Simulator</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Google scores every keyword in your account from 1 to 10 across three factors. Drag
              the sliders or toggle between an unmanaged account and a WebXCode-engineered account
              to see how Quality Score changes your CPC and monthly lead volume on the exact same
              ₹1,00,000 ad budget.
            </p>
          </div>

          {/* Preset Quick-Switch Buttons */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-navy-60">
              Quick Compare Presets:
            </span>
            {QUALITY_SIMULATOR_PRESETS.map((preset) => {
              const isSelected =
                qsCtr === preset.ctrScore &&
                qsRelevance === preset.adRelevanceScore &&
                qsLandingPage === preset.landingPageScore;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyQualityPreset(preset)}
                  className={`px-4 py-2.5 rounded-full text-[13px] font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-soft'
                      : 'bg-primary-50/70 text-navy border-primary-100 hover:border-primary'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* 2-Column Simulator Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 6 Cols: 3 Interactive Factor Sliders */}
            <div className="lg:col-span-6 rounded-[24px] bg-white border border-navy-08 shadow-soft p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-navy-08">
                  <div className="flex items-center gap-2.5">
                    <Sliders className="w-5 h-5 text-primary" />
                    <h3 className="text-[18px] font-extrabold text-navy">
                      The 3 Pillars of Google Quality Score
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-primary">
                    DRAG 1 TO 10
                  </span>
                </div>

                <div className="space-y-7">
                  {/* Slider 1: Expected CTR */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="qs-ctr-slider"
                        className="text-[15px] font-extrabold text-navy"
                      >
                        1. Expected Click-Through Rate (CTR)
                      </label>
                      <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[13px] font-extrabold">
                        {qsCtr} / 10
                      </span>
                    </div>
                    <p className="text-[13px] text-navy-70 mb-3">
                      How likely users are to click your ad based on compelling headlines, numbers,
                      and full ad asset extensions.
                    </p>
                    <input
                      id="qs-ctr-slider"
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={qsCtr}
                      aria-label="Expected Click-Through Rate Score"
                      onChange={(e) => setQsCtr(Number(e.target.value))}
                      className="w-full h-2.5 rounded-lg bg-primary-100 accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[11px] text-navy-50 mt-1">
                      <span>1 (Below Average)</span>
                      <span>5 (Average)</span>
                      <span>10 (Above Average)</span>
                    </div>
                  </div>

                  {/* Slider 2: Ad Relevance */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="qs-relevance-slider"
                        className="text-[15px] font-extrabold text-navy"
                      >
                        2. Ad Relevance (Keyword-to-Headline Match)
                      </label>
                      <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[13px] font-extrabold">
                        {qsRelevance} / 10
                      </span>
                    </div>
                    <p className="text-[13px] text-navy-70 mb-3">
                      How closely your ad copy matches the user&apos;s exact search query—achieved
                      via tightly themed ad groups instead of dumping 50 keywords together.
                    </p>
                    <input
                      id="qs-relevance-slider"
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={qsRelevance}
                      aria-label="Ad Relevance Score"
                      onChange={(e) => setQsRelevance(Number(e.target.value))}
                      className="w-full h-2.5 rounded-lg bg-primary-100 accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[11px] text-navy-50 mt-1">
                      <span>1 (Generic Copy)</span>
                      <span>5 (Average)</span>
                      <span>10 (Exact Theme Match)</span>
                    </div>
                  </div>

                  {/* Slider 3: Landing Page Experience */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="qs-lp-slider"
                        className="text-[15px] font-extrabold text-navy"
                      >
                        3. Landing Page Experience &amp; Speed
                      </label>
                      <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[13px] font-extrabold">
                        {qsLandingPage} / 10
                      </span>
                    </div>
                    <p className="text-[13px] text-navy-70 mb-3">
                      Mobile load speed, message match between ad and page headline, clear trust
                      signals, and frictionless conversion forms.
                    </p>
                    <input
                      id="qs-lp-slider"
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={qsLandingPage}
                      aria-label="Landing Page Experience Score"
                      onChange={(e) => setQsLandingPage(Number(e.target.value))}
                      className="w-full h-2.5 rounded-lg bg-primary-100 accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[11px] text-navy-50 mt-1">
                      <span>1 (Slow Homepage)</span>
                      <span>5 (Average)</span>
                      <span>10 (Fast Dedicated LP)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 pt-4 border-t border-navy-08 flex items-center justify-between text-[12.5px] text-navy-60">
                <span>Sample Monthly Ad Spend Fixed at ₹1,00,000</span>
                <button
                  type="button"
                  onClick={() => applyQualityPreset(QUALITY_SIMULATOR_PRESETS[1])}
                  className="font-bold text-primary hover:underline cursor-pointer"
                >
                  Reset to WebXCode 9/10
                </button>
              </div>
            </div>

            {/* Right 6 Cols: Live Auction Output Panel */}
            <div
              aria-live="polite"
              className="lg:col-span-6 rounded-[24px] bg-navy text-white p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-72 h-72 blue-glow pointer-events-none opacity-70" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/15">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-primary-100">
                    LIVE AUCTION IMPACT (ON ₹1,00,000/MO SPEND)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/25 border border-primary/40 font-mono text-[11px] font-bold text-white">
                    Simulated Output
                  </span>
                </div>

                {/* Top Score Row: Quality Score Gauge Badge + Est CPC */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.06] border border-white/15">
                    <div className="font-mono text-[11px] uppercase text-white/65">
                      Calculated Quality Score
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-mono text-[42px] font-extrabold text-primary leading-none tabular-nums">
                        {qualitySimulation.qualityScore}
                      </span>
                      <span className="font-mono text-[20px] font-bold text-white/60">/ 10</span>
                    </div>
                    <div className="mt-2 text-[12px] font-semibold text-primary-100">
                      {qualitySimulation.qualityScore >= 8
                        ? 'Google CPC Discount Unlocked'
                        : qualitySimulation.qualityScore >= 5
                        ? 'Standard Auction Pricing'
                        : 'Low-Quality Penalty Applied'}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.06] border border-white/15">
                    <div className="font-mono text-[11px] uppercase text-white/65">
                      Estimated Cost Per Click (CPC)
                    </div>
                    <div className="mt-2 font-mono text-[42px] font-extrabold text-white leading-none tabular-nums">
                      ₹{qualitySimulation.estCpcINR}
                    </div>
                    <div className="mt-2 text-[12px] text-white/70">
                      Est. Landing Page CVR:{' '}
                      <strong className="text-white">{qualitySimulation.convRatePct}%</strong>
                    </div>
                  </div>
                </div>

                {/* Clicks & Leads Output Grid */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="font-mono text-[11px] uppercase text-white/60">
                      Monthly Clicks From ₹1,00,000
                    </div>
                    <div className="mt-1.5 font-mono text-[30px] font-extrabold text-white tabular-nums">
                      {qualitySimulation.estMonthlyClicks.toLocaleString('en-IN')} clicks
                    </div>
                    <p className="mt-1 text-[12px] text-white/65">
                      High-intent search visitors to your landing page
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-primary/20 border-2 border-primary">
                    <div className="font-mono text-[11px] uppercase text-primary-100 font-bold">
                      Estimated Monthly Leads
                    </div>
                    <div className="mt-1.5 font-mono text-[30px] font-extrabold text-white tabular-nums">
                      {qualitySimulation.estMonthlyLeads} leads/mo
                    </div>
                    <p className="mt-1 text-[12px] text-primary-100 font-semibold">
                      {qualitySimulation.extraLeadsVsUnmanaged >= 0
                        ? `+${qualitySimulation.extraLeadsVsUnmanaged} more leads vs QS 4/10 account`
                        : `${qualitySimulation.extraLeadsVsUnmanaged} fewer leads vs QS 4/10 account`}{' '}
                      (placeholder)
                    </p>
                  </div>
                </div>

                {/* Highlight Callout Box */}
                <div className="mt-5 p-4 rounded-2xl bg-white/[0.06] border border-white/15 text-[13.5px] text-white/85 leading-relaxed">
                  <strong className="text-white">Why this matters:</strong> Because WebXCode designs
                  both your Google Ads campaigns{' '}
                  <span className="text-primary-100 font-semibold">
                    and your fast conversion landing pages
                  </span>
                  , we control all 3 Quality Score levers under one roof—unlocking more leads from
                  your existing ad spend.
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <button
                  type="button"
                  onClick={() =>
                    triggerQuoteModal(
                      `Google Ads Quality Score Audit (Target QS ${qualitySimulation.qualityScore}/10)`
                    )
                  }
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] shadow-soft transition-all cursor-pointer"
                >
                  <span>Audit My Current Quality Score</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <span className="font-mono text-[11px] text-white/55">
                  Illustrative simulation based on Google Ads auction mechanics
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 3 — 6 GOOGLE ADS CAMPAIGN TYPES: THE PLACEMENT STAGE (#f0f7fd)
          ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              CAMPAIGN TYPES WE MANAGE
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Every Google Ad Format —{' '}
              <span className="text-primary">See How Your Ad Looks in the Wild</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Switch between the 6 Google Ads campaign types below to inspect a live visual mockup of
              where your ad appears alongside our exact setup checklist and target KPIs.
            </p>
          </div>

          {/* 6 Campaign Type Pill Tabs */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar"
            role="tablist"
            aria-label="Google Ads Campaign Types"
          >
            {CAMPAIGN_STAGE_TABS.map((tab) => {
              const isSelected = tab.id === activeCampaignTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCampaignTab(tab.id)}
                  className={`px-5 py-3 rounded-full text-[13.5px] font-extrabold whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-soft'
                      : 'bg-white text-navy border-navy-08 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {tab.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Placement Stage Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCampaignSpec.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left 6 Cols: Visual Ad Placement Mockup */}
              <div className="lg:col-span-6 rounded-[24px] bg-navy text-white p-5 sm:p-7 shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -bottom-16 -right-16 w-64 h-64 blue-glow pointer-events-none opacity-60" />

                <div>
                  {/* Mockup Top Chrome */}
                  <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="ml-2 font-mono text-[11px] text-white/75">
                        LIVE PLACEMENT PREVIEW • {currentCampaignSpec.tabLabel.toUpperCase()}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-primary/25 border border-primary/40 font-mono text-[10px] font-bold text-primary-100">
                      GOOGLE NETWORK
                    </span>
                  </div>

                  {/* Dynamic Visual Mockup by Campaign Type */}
                  {currentCampaignSpec.id === 'search' && (
                    <div className="rounded-2xl bg-white text-navy p-5 shadow-md space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-navy-60 pb-2 border-b border-navy-08">
                        <span>google.com/search?q=enterprise+crm+software</span>
                        <span className="text-primary font-bold">Position #1</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-navy text-white text-[10px] font-extrabold">
                          Sponsored
                        </span>
                        <span className="text-[12px] font-bold text-navy">YourBrand Cloud</span>
                        <span className="text-[11px] text-navy-60 font-mono">
                          https://yourbrand.com › crm-software › india
                        </span>
                      </div>
                      <div className="text-[17px] font-extrabold text-primary leading-snug">
                        #1 Rated B2B CRM Software — Automate Sales Pipeline in 48 Hrs
                      </div>
                      <p className="text-[13px] text-navy-70 leading-relaxed">
                        Trusted by 1,200+ Indian sales teams. Built-in WhatsApp, GST billing &amp;
                        lead routing. Book a 15-min live demo today. Free migration from spreadsheets.
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy-08 text-[12px] font-bold text-primary">
                        <span>Pricing &amp; Plans →</span>
                        <span>Book 15-Min Demo →</span>
                        <span>Case Studies (4.9★) →</span>
                        <span>Compare vs Rivals →</span>
                      </div>
                    </div>
                  )}

                  {currentCampaignSpec.id === 'shopping' && (
                    <div className="rounded-2xl bg-white text-navy p-5 shadow-md">
                      <div className="flex items-center justify-between text-[11px] font-mono text-navy-60 pb-3 mb-3 border-b border-navy-08">
                        <span>Sponsored • Google Shopping Carousel</span>
                        <span className="text-primary font-bold">Merchant Center Feed</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            title: 'AeroMesh Pro Ergonomic Chair',
                            price: '₹14,990',
                            oldPrice: '₹19,990',
                            rating: '4.9 ★ (412)',
                            tag: '15% OFF + Free Ship',
                            highlight: true,
                          },
                          {
                            title: 'Lumina Standing Desk Dual Motor',
                            price: '₹28,500',
                            oldPrice: '₹34,000',
                            rating: '4.8 ★ (189)',
                            tag: 'In Stock • 3-Yr Warranty',
                            highlight: false,
                          },
                          {
                            title: 'ErgoSpine Executive Task Chair',
                            price: '₹11,490',
                            oldPrice: '₹14,500',
                            rating: '4.7 ★ (276)',
                            tag: 'GST Invoice Available',
                            highlight: false,
                          },
                        ].map((prod) => (
                          <div
                            key={prod.title}
                            className={`rounded-xl p-3 border ${
                              prod.highlight
                                ? 'border-2 border-primary bg-primary-50/40'
                                : 'border-navy-15 bg-white'
                            }`}
                          >
                            <div className="h-16 rounded-lg bg-primary-50 flex items-center justify-center mb-2">
                              <ShoppingBag className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-[11.5px] font-extrabold text-navy line-clamp-2 leading-snug">
                              {prod.title}
                            </div>
                            <div className="mt-1 flex items-baseline gap-1.5">
                              <span className="font-mono text-[13px] font-extrabold text-primary">
                                {prod.price}
                              </span>
                              <span className="font-mono text-[10px] text-navy-50 line-through">
                                {prod.oldPrice}
                              </span>
                            </div>
                            <div className="text-[10px] font-bold text-amber-600 mt-1">
                              {prod.rating}
                            </div>
                            <div className="mt-1.5 px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-[9.5px] font-bold truncate">
                              {prod.tag}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentCampaignSpec.id === 'pmax' && (
                    <div className="rounded-2xl bg-white text-navy p-5 shadow-md space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-navy-60 pb-2 border-b border-navy-08">
                        <span>Performance Max • Unified Asset Group</span>
                        <span className="text-primary font-bold">5 Google Surfaces</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          { surface: 'Google Search', kpi: 'Exact Buyer Queries', icon: Search },
                          { surface: 'Shopping Feed', kpi: 'SKU Product Cards', icon: ShoppingBag },
                          { surface: 'YouTube Video', kpi: 'In-Stream & Shorts', icon: Tv },
                          { surface: 'Google Discover', kpi: 'Mobile Feed Cards', icon: Sparkles },
                          { surface: 'Gmail Promotions', kpi: 'Inbox Offer Tabs', icon: Tag },
                          { surface: 'Google Maps', kpi: 'Local Store Pins', icon: MapPin },
                        ].map((item) => {
                          const IconComp = item.icon;
                          return (
                            <div
                              key={item.surface}
                              className="p-3 rounded-xl bg-primary-50/70 border border-primary-100 flex items-start gap-2.5"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-[12px] font-extrabold text-navy">
                                  {item.surface}
                                </div>
                                <div className="text-[10.5px] text-navy-60">{item.kpi}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="p-3 rounded-xl bg-navy text-white font-mono text-[11px] flex items-center justify-between">
                        <span>First-Party Audience Signal + Brand Exclusion Active</span>
                        <span className="text-primary-100 font-bold">ROAS Target: 4.5x</span>
                      </div>
                    </div>
                  )}

                  {currentCampaignSpec.id === 'youtube' && (
                    <div className="rounded-2xl bg-white text-navy p-5 shadow-md space-y-3">
                      <div className="rounded-xl bg-navy p-4 text-white relative overflow-hidden">
                        <div className="flex items-center justify-between text-[10px] font-mono text-white/70 mb-6">
                          <span className="px-2 py-0.5 rounded bg-primary text-white font-bold">
                            Sponsored • 0:18 / 0:45
                          </span>
                          <span>Custom Search Intent Audience</span>
                        </div>
                        <div className="text-[16px] font-extrabold text-white max-w-sm">
                          &ldquo;See How We Cut Warehouse Dispatch Time by 62%...&rdquo;
                        </div>
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/15">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-white text-[11.5px] font-bold">
                            <span>Book Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                          <span className="px-3 py-1 rounded bg-white/10 font-mono text-[10.5px] text-white/80">
                            Skip Ad in 5s ⏭
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px] text-center">
                        <div className="p-2 rounded-lg bg-primary-50 text-navy font-bold">
                          YouTube In-Stream
                        </div>
                        <div className="p-2 rounded-lg bg-primary-50 text-navy font-bold">
                          YouTube Shorts
                        </div>
                        <div className="p-2 rounded-lg bg-primary-50 text-navy font-bold">
                          In-Feed Video
                        </div>
                      </div>
                    </div>
                  )}

                  {currentCampaignSpec.id === 'display-remarketing' && (
                    <div className="rounded-2xl bg-white text-navy p-5 shadow-md space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-navy-60 pb-2 border-b border-navy-08">
                        <span>Dynamic Remarketing • Cart &amp; Pricing Visitor</span>
                        <span className="text-primary font-bold">Frequency Cap: 3/day</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3.5 rounded-xl bg-primary-50/70 border-2 border-primary">
                        <div className="sm:col-span-8">
                          <span className="px-2 py-0.5 rounded bg-navy text-white font-mono text-[9.5px] font-bold uppercase">
                            Still Comparing Options?
                          </span>
                          <div className="mt-1.5 text-[15px] font-extrabold text-navy">
                            Complete Your Setup Today &amp; Unlock Free Onboarding
                          </div>
                          <p className="text-[12px] text-navy-70 mt-1">
                            Shown only to verified visitors who viewed your pricing or product page
                            in the last 14 days.
                          </p>
                        </div>
                        <div className="sm:col-span-4 flex flex-col items-stretch gap-2">
                          <span className="py-2 px-3 rounded-full bg-primary text-white text-[11.5px] font-bold text-center">
                            Claim Offer →
                          </span>
                          <span className="font-mono text-[10px] text-center text-navy-60">
                            Mobile App Placements Excluded
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentCampaignSpec.id === 'local-call' && (
                    <div className="rounded-2xl bg-white text-navy p-5 shadow-md space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-navy-60 pb-2 border-b border-navy-08">
                        <span>Mobile Call-First &amp; Maps Promoted Pin</span>
                        <span className="text-primary font-bold">5 km Radius Target</span>
                      </div>
                      <div className="p-4 rounded-xl bg-primary-50/60 border-2 border-primary space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-navy text-white text-[10px] font-bold">
                            Sponsored • Call Ad
                          </span>
                          <span className="font-mono text-[11px] font-bold text-emerald-700">
                            ● Open Now • 1.8 km away
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[16px] font-extrabold text-primary">
                          <Phone className="w-4 h-4 shrink-0" />
                          <span>Call +91 98765 43210 — 24/7 Care &amp; Same-Day Slot</span>
                        </div>
                        <p className="text-[12.5px] text-navy-70">
                          4.9★ (640+ Google Reviews) • Senior Specialists • Direct Insurance &amp;
                          Instant WhatsApp Confirmation.
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <span className="py-2 px-3 rounded-lg bg-primary text-white text-[12px] font-bold text-center inline-flex items-center justify-center gap-1.5">
                            <Phone className="w-3.5 h-3.5" />
                            <span>Tap to Call Now</span>
                          </span>
                          <span className="py-2 px-3 rounded-lg bg-white border border-navy-15 text-navy text-[12px] font-bold text-center inline-flex items-center justify-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            <span>Get Directions</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Benchmark Strip inside Left Mockup Card */}
                <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 font-mono text-[12px]">
                  <span className="text-white/75">
                    Target Benchmark:{' '}
                    <strong className="text-primary-100">
                      {currentCampaignSpec.sampleBenchmark}
                    </strong>
                  </span>
                  <span className="text-white/50 text-[11px]">
                    {currentCampaignSpec.badgeText}
                  </span>
                </div>
              </div>

              {/* Right 6 Cols: Details, Best For, What We Set Up, Key Metric */}
              <div className="lg:col-span-6 rounded-[24px] bg-white border border-navy-08 shadow-soft p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase tracking-wider">
                      {currentCampaignSpec.badgeText}
                    </span>
                    <span className="text-[12px] font-bold text-navy-60">
                      {currentCampaignSpec.fullName}
                    </span>
                  </div>

                  <h3 className="text-[22px] sm:text-[26px] font-extrabold text-navy leading-snug">
                    {currentCampaignSpec.headline}
                  </h3>

                  <p className="mt-2.5 text-[15px] text-navy-70 leading-relaxed">
                    {currentCampaignSpec.summary}
                  </p>

                  {/* Best For Chips */}
                  <div className="mt-5">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2">
                      Best For
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentCampaignSpec.bestForChips.map((chip) => (
                        <span
                          key={chip}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-[12.5px] font-bold text-navy"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{chip}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 4 "What We Set Up" Bullets */}
                  <div className="mt-5">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2.5">
                      What We Engineer &amp; Manage
                    </div>
                    <ul className="space-y-2.5">
                      {currentCampaignSpec.whatWeSetUp.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-[14px] text-navy-80 leading-snug"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Metric Tracked */}
                  <div className="mt-5 p-3.5 rounded-2xl bg-primary-50/70 border border-primary-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                        PRIMARY METRICS WE TRACK
                      </div>
                      <div className="text-[13.5px] font-extrabold text-navy mt-0.5">
                        {currentCampaignSpec.keyMetricTracked}
                      </div>
                    </div>
                    <TrendingUp className="w-5 h-5 text-primary shrink-0" />
                  </div>
                </div>

                {/* CTA Row */}
                <div className="mt-6 pt-5 border-t border-navy-08 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      triggerQuoteModal(`Google Ads — ${currentCampaignSpec.tabLabel}`)
                    }
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-700 text-white text-[14px] font-semibold shadow-soft transition-all cursor-pointer"
                  >
                    <span>Launch {currentCampaignSpec.tabLabel} Campaign</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  {currentCampaignSpec.id === 'local-call' && (
                    <Link
                      to="/services/local-seo"
                      className="text-[13px] font-bold text-primary hover:text-navy transition-colors inline-flex items-center gap-1"
                    >
                      <span>Pair with Local SEO →</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ======================================================================
          SECTION 4 — ANATOMY OF A HIGH-CONVERTING GOOGLE SEARCH AD (#ffffff)
          ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              AD ASSET ENGINEERING
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              What Makes People Click <span className="text-primary">Your Ad Instead of Rivals</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Most advertisers write two hasty headlines and hit publish. We build fully loaded
              Google Search ads with all 6 asset layers—doubling your screen space on mobile and
              lifting Click-Through Rate without raising your bid. Click any numbered badge
              (①–⑥) to inspect.
            </p>
          </div>

          {/* 2-Column Interactive Anatomy Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Large Annotated Google Search Ad Card */}
            <div className="lg:col-span-7 rounded-[24px] bg-primary-50/60 border border-primary-100 p-5 sm:p-7 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-primary-100">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                  ANNOTATED GOOGLE SEARCH AD • CLICK ①–⑥ TO INSPECT
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-navy text-white font-mono text-[10.5px] font-bold">
                  100% Ad Strength: Excellent
                </span>
              </div>

              {/* Simulated White Google SERP Ad Card */}
              <div className="rounded-[20px] bg-white border-2 border-navy-15 p-5 sm:p-6 shadow-md space-y-4">
                {/* Row 1: Sponsored + Favicon + Brand + Display URL Path + Image Thumbnail */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-navy text-white text-[10px] font-extrabold">
                        Sponsored
                      </span>
                      <span className="text-[13px] font-extrabold text-navy">
                        ApexCloud ERP India
                      </span>
                    </div>

                    {/* Hotspot 1: Display URL with Path Fields */}
                    <button
                      type="button"
                      onClick={() => setActiveAdHotspotId(1)}
                      className={`group text-left inline-flex items-center gap-2 px-2.5 py-1 rounded-lg transition-all cursor-pointer border ${
                        activeAdHotspotId === 1
                          ? 'bg-primary/15 border-primary ring-2 ring-primary/30'
                          : 'bg-primary-50/50 border-transparent hover:border-primary/40'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold flex items-center justify-center shrink-0">
                        1
                      </span>
                      <span className="font-mono text-[12px] text-navy-80">
                        https://apexcloud.in › <strong className="text-primary">Manufacturing-ERP</strong> ›{' '}
                        <strong className="text-primary">GST-Ready</strong>
                      </span>
                    </button>
                  </div>

                  {/* Image Thumbnail Asset (Part of Hotspot 6) */}
                  <button
                    type="button"
                    onClick={() => setActiveAdHotspotId(6)}
                    className={`w-14 h-14 rounded-xl bg-navy text-white flex flex-col items-center justify-center shrink-0 border-2 transition-all cursor-pointer ${
                      activeAdHotspotId === 6
                        ? 'border-primary ring-2 ring-primary/30'
                        : 'border-navy-15 hover:border-primary'
                    }`}
                    title="Inspect Image & Price Assets"
                  >
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-mono text-[9px] font-bold text-primary-100 mt-0.5">
                      60×60
                    </span>
                  </button>
                </div>

                {/* Hotspot 2: Headline Stack (Up to 3 Shown) */}
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveAdHotspotId(2)}
                    className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border flex items-start gap-2.5 ${
                      activeAdHotspotId === 2
                        ? 'bg-primary/15 border-primary ring-2 ring-primary/30'
                        : 'bg-primary-50/40 border-transparent hover:border-primary/40'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-white font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div className="text-[18px] sm:text-[20px] font-extrabold text-primary leading-snug">
                      #1 Cloud ERP for Indian Factories | Live in 14 Days | Book Free Demo
                    </div>
                  </button>
                </div>

                {/* Hotspot 3: Description Lines */}
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveAdHotspotId(3)}
                    className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border flex items-start gap-2.5 ${
                      activeAdHotspotId === 3
                        ? 'bg-primary/15 border-primary ring-2 ring-primary/30'
                        : 'bg-primary-50/40 border-transparent hover:border-primary/40'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-white font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <p className="text-[13.5px] text-navy-80 leading-relaxed">
                      Automate BOM, inventory, e-way bills &amp; multi-plant accounting in one
                      dashboard. Trusted by 450+ SMEs across India. Zero setup fee this month—get
                      instant pricing.
                    </p>
                  </button>
                </div>

                {/* Hotspot 5: Callouts & Structured Snippets */}
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveAdHotspotId(5)}
                    className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border flex items-start gap-2.5 ${
                      activeAdHotspotId === 5
                        ? 'bg-primary/15 border-primary ring-2 ring-primary/30'
                        : 'bg-primary-50/40 border-transparent hover:border-primary/40'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-white font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      5
                    </span>
                    <div className="text-[12.5px] text-navy-70 space-y-1">
                      <div>
                        <strong className="text-navy">Callouts:</strong> 24/7 India Support • Free
                        Tally Migration • ISO 27001 Certified • Custom Role Access
                      </div>
                      <div>
                        <strong className="text-navy">Modules:</strong> Production Planning, Batch
                        Inventory, GST E-Invoicing, Vendor Portal, QA Tracking
                      </div>
                    </div>
                  </button>
                </div>

                {/* Hotspot 4: 4 Sitelink Assets */}
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveAdHotspotId(4)}
                    className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                      activeAdHotspotId === 4
                        ? 'bg-primary/15 border-primary ring-2 ring-primary/30'
                        : 'bg-primary-50/40 border-transparent hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-white font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0">
                        4
                      </span>
                      <span className="font-mono text-[11px] font-bold uppercase text-primary">
                        4 Sitelink Extensions (With 2-Line Descriptions)
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-8">
                      {[
                        {
                          title: 'Transparent Pricing Plans',
                          desc: 'Plans from ₹4,999/mo. No hidden user fees.',
                        },
                        {
                          title: 'Book a 15-Min Live Demo',
                          desc: 'See BOM & inventory workflows tailored to you.',
                        },
                        {
                          title: '450+ Factory Case Studies',
                          desc: 'How clients cut stockouts by 42% in 60 days.',
                        },
                        {
                          title: 'Compare vs Legacy ERPs',
                          desc: 'Side-by-side speed & implementation checklist.',
                        },
                      ].map((sl) => (
                        <div
                          key={sl.title}
                          className="p-2.5 rounded-lg bg-white border border-navy-08"
                        >
                          <div className="text-[13px] font-extrabold text-primary">{sl.title}</div>
                          <div className="text-[11.5px] text-navy-60 mt-0.5">{sl.desc}</div>
                        </div>
                      ))}
                    </div>
                  </button>
                </div>

                {/* Hotspot 6: Call, Location & Price Assets Strip */}
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveAdHotspotId(6)}
                    className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border flex flex-wrap items-center justify-between gap-2 ${
                      activeAdHotspotId === 6
                        ? 'bg-primary/15 border-primary ring-2 ring-primary/30'
                        : 'bg-primary-50/40 border-transparent hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-primary text-white font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0">
                        6
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold text-navy">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-navy-15">
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          <span>Call +91 80 4567 8900</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-navy-15">
                          <Tag className="w-3.5 h-3.5 text-primary" />
                          <span>Starter Plan: ₹4,999/mo</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-navy-15">
                          <Star className="w-3.5 h-3.5 text-amber-500" />
                          <span>4.9★ Seller Rating</span>
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Hotspot Selector Pills + Active Callout Inspector */}
            <div className="lg:col-span-5 space-y-4">
              {/* 6 Numbered Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SEARCH_AD_HOTSPOTS.map((hs) => {
                  const isSelected = hs.id === activeAdHotspotId;
                  return (
                    <button
                      key={hs.id}
                      type="button"
                      onClick={() => setActiveAdHotspotId(hs.id)}
                      className={`p-3 rounded-xl font-mono text-[12px] font-bold text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-navy text-white border-navy shadow-soft'
                          : 'bg-white text-navy border-navy-08 hover:border-primary'
                      }`}
                    >
                      {hs.shortLabel}
                    </button>
                  );
                })}
              </div>

              {/* Active Hotspot Detail Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAdHotspot.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="rounded-[24px] bg-navy text-white p-6 sm:p-7 shadow-xl space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-white/15">
                    <span className="inline-flex items-center gap-2 font-mono text-[12px] font-extrabold text-primary-100">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[12px]">
                        {activeAdHotspot.id}
                      </span>
                      <span>AD ELEMENT #{activeAdHotspot.id} OF 6</span>
                    </span>

                    <span className="px-3 py-1 rounded-full bg-primary/25 border border-primary/40 font-mono text-[11px] font-bold text-white">
                      {activeAdHotspot.ctrImpactBadge} (placeholder)
                    </span>
                  </div>

                  <h3 className="text-[22px] font-extrabold text-white leading-snug">
                    {activeAdHotspot.title}
                  </h3>

                  <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">
                      WHAT THIS ASSET IS
                    </div>
                    <p className="text-[14px] text-white/85 leading-relaxed">
                      {activeAdHotspot.whatItIs}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-primary/20 border border-primary/40">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100 mb-1">
                      HOW WEBXCODE OPTIMIZES IT FOR CTR &amp; QUALITY SCORE
                    </div>
                    <p className="text-[14px] text-white leading-relaxed font-medium">
                      {activeAdHotspot.howWeOptimize}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveAdHotspotId((prev) => (prev === 6 ? 1 : prev + 1))
                      }
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary-100 hover:text-white cursor-pointer"
                    >
                      <span>Inspect Next Ad Asset (#{activeAdHotspot.id === 6 ? 1 : activeAdHotspot.id + 1})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => triggerQuoteModal('Google Search Ad Copy & Asset Audit')}
                      className="px-4 py-2 rounded-full bg-primary hover:bg-primary-700 text-white text-[12.5px] font-bold transition-colors cursor-pointer"
                    >
                      Get Ad Copy Audit
                    </button>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[12px] text-white/75">
                    <span>Need higher post-click conversions or clean GA4/GTM attribution?</span>
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        to="/services/conversion-rate-optimization"
                        className="font-bold text-primary-100 hover:text-white inline-flex items-center gap-1"
                      >
                        <span>Explore CRO Services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/services/analytics-tracking-setup"
                        className="font-bold text-primary-100 hover:text-white inline-flex items-center gap-1"
                      >
                        <span>Analytics &amp; Tracking Setup</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/ai-solutions/crm-lead-automation"
                        className="font-bold text-primary-100 hover:text-white inline-flex items-center gap-1"
                      >
                        <span>CRM &amp; Lead Automation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GoogleAds;
