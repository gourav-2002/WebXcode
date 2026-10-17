'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Activity,
  MousePointerClick,
  Eye,
  BarChart3,
  TrendingUp,
  Sliders,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  ShieldCheck,
  Search,
  ShoppingCart,
  FileText,
  Zap,
  Target,
  Award,
  Clock,
  HelpCircle,
  Lock,
  Filter,
  Flame,
  SplitSquareVertical,
  Play,
  ArrowUpRight,
} from 'lucide-react';
import { services, ServiceIcon } from '@/app/services/_components/Services';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT CONVERSION-RATE-OPTIMIZATION FROM ../Services
============================================================================ */
const croService =
  services.find((item) => item.slug === 'conversion-rate-optimization') ||
  services[14];

/* ============================================================================
   DATA STRUCTURES & CONSTANTS (Sections 1–4)
============================================================================ */

/* --- SECTION 1: HERO BEFORE / AFTER CONVERSION LIFT VISUALIZER DATA --- */
interface HeroRedesignHotspot {
  id: number;
  badgeLabel: string;
  beforeProblem: string;
  afterUpgrade: string;
  liftStat: string;
}

const HERO_REDESIGN_HOTSPOTS: HeroRedesignHotspot[] = [
  {
    id: 1,
    badgeLabel: '① Benefit-Driven Headline',
    beforeProblem: 'Vague corporate slogan ("Next-Gen Solutions for Modern Enterprises")',
    afterUpgrade: 'Specific outcome + timeframe ("Cut Cloud Invoice Costs by 34% in 14 Days")',
    liftStat: '+38% Scroll & Engagement',
  },
  {
    id: 2,
    badgeLabel: '② Above-the-Fold Social Proof',
    beforeProblem: 'Zero reviews or client proof visible without scrolling 3 screens down',
    afterUpgrade: '4.9★ rating badge + 320+ verified customer logos right under the subheadline',
    liftStat: '+29% Trust Score',
  },
  {
    id: 3,
    badgeLabel: '③ Frictionless 3-Field Form & Clear CTA',
    beforeProblem: '9 mandatory fields + generic "Submit" button causing 74% form abandonment',
    afterUpgrade: '3 essential fields + value-first CTA ("Get My Free Savings Report →") + privacy lock',
    liftStat: '+64% Form Completion',
  },
];

/* --- SECTION 2: THE REVENUE MULTIPLIER CALCULATOR DATA --- */
interface CalculatorPreset {
  id: string;
  label: string;
  visitors: number;
  currentCvr: number;
  orderValue: number;
  targetCvr: number;
}

const CALCULATOR_PRESETS: CalculatorPreset[] = [
  {
    id: 'd2c-store',
    label: 'D2C E-commerce Store',
    visitors: 45000,
    currentCvr: 1.6,
    orderValue: 2800,
    targetCvr: 2.8,
  },
  {
    id: 'b2b-leads',
    label: 'B2B Lead-Gen Funnel',
    visitors: 15000,
    currentCvr: 2.0,
    orderValue: 18000,
    targetCvr: 3.6,
  },
  {
    id: 'high-scale',
    label: 'High-Traffic Retail / SaaS',
    visitors: 120000,
    currentCvr: 1.8,
    orderValue: 4500,
    targetCvr: 3.1,
  },
];

/* --- SECTION 3: USER BEHAVIOR LAB (HEATMAP, SCROLL & RAGE-CLICK SIMULATOR) --- */
export type BehaviorOverlayMode = 'heatmap' | 'scrollmap' | 'rageclicks';

interface BehaviorFinding {
  id: string;
  zoneLabel: string;
  coordinateTag: string;
  severity: 'Critical Leak' | 'High Opportunity' | 'Quick Win';
  whatDataShowed: string;
  whyUsersStruggled: string;
  croFixApplied: string;
  measuredImpact: string;
}

interface BehaviorModeSpec {
  mode: BehaviorOverlayMode;
  tabLabel: string;
  shortTag: string;
  toolStack: string;
  headline: string;
  summary: string;
  sampleMetricLabel: string;
  sampleMetricValue: string;
  findings: [BehaviorFinding, BehaviorFinding, BehaviorFinding];
}

const BEHAVIOR_LAB_MODES: BehaviorModeSpec[] = [
  {
    mode: 'heatmap',
    tabLabel: 'Click Heatmap',
    shortTag: 'WHERE USERS TAP & CLICK',
    toolStack: 'Microsoft Clarity + Hotjar Click Density Maps',
    headline: 'See Which Elements Attract Attention — and Which Get Ignored',
    summary:
      'Click heatmaps aggregate thousands of real visitor taps across desktop and mobile. We spot dead-zone buttons, distracting nav links that steal buyers from checkout, and high-intent specs buried too far down.',
    sampleMetricLabel: 'Primary CTA Click Share (Before → After)',
    sampleMetricValue: '14% → 41% of total page clicks (placeholder)',
    findings: [
      {
        id: 'hm-1',
        zoneLabel: 'Hotzone #1 · Top Nav vs Hero CTA',
        coordinateTag: 'Y: 0–180px (Above Fold)',
        severity: 'Critical Leak',
        whatDataShowed:
          '31% of paid-ad visitors clicked "About Us" or "Blog" in the header instead of the primary Hero CTA.',
        whyUsersStruggled:
          'Full site navigation distracted high-intent search visitors before they read the offer.',
        croFixApplied:
          'Replaced full header on paid landing pages with a distraction-free trust bar + sticky CTA.',
        measuredImpact: '+34% more clicks on the primary conversion button (placeholder)',
      },
      {
        id: 'hm-2',
        zoneLabel: 'Hotzone #2 · Shipping & Return Policy Microcopy',
        coordinateTag: 'Y: 420px (Near Add-to-Cart)',
        severity: 'High Opportunity',
        whatDataShowed:
          'Heavy cluster of taps on tiny "Delivery & Returns" text link right below the price.',
        whyUsersStruggled:
          'Shoppers wanted to know delivery timelines and COD/return rules before adding to cart.',
        croFixApplied:
          'Added an inline Pincode Delivery Estimator + "7-Day Free Exchange" badge directly above Add-to-Cart.',
        measuredImpact: '+22% Add-to-Cart rate on mobile product pages (placeholder)',
      },
      {
        id: 'hm-3',
        zoneLabel: 'Coldzone #3 · Generic Feature Icon Grid',
        coordinateTag: 'Y: 880px (Mid-Page)',
        severity: 'Quick Win',
        whatDataShowed:
          'Less than 1.2% interaction on the 6-column abstract icon section ("Innovative, Scalable, Robust").',
        whyUsersStruggled:
          'Generic buzzwords gave zero concrete answers to buyer objections.',
        croFixApplied:
          'Swapped abstract icons for an interactive 3-tab "How It Works + Pricing Comparison" block.',
        measuredImpact: '+46% engagement & 1.9× higher conversion from scrollers (placeholder)',
      },
    ],
  },
  {
    mode: 'scrollmap',
    tabLabel: 'Scroll Depth Map',
    shortTag: 'WHERE VISITORS DROP OFF',
    toolStack: 'Scroll Reach & Fold-Line Retention Telemetry',
    headline: 'Discover the Exact Pixel Where 60% of Your Traffic Stops Scrolling',
    summary:
      'If your strongest customer testimonials, guarantee badges, or pricing tables sit at the 75% scroll mark—and 65% of mobile visitors leave at 40%—most of your traffic never sees your best proof.',
    sampleMetricLabel: 'Visitors Reaching Key Proof & Offer Block',
    sampleMetricValue: '28% → 79% visibility reach (placeholder)',
    findings: [
      {
        id: 'sm-1',
        zoneLabel: 'Band A · 100%–75% Retention Zone (0–650px)',
        coordinateTag: 'Top 25% of Page (Red/Amber Warmth)',
        severity: 'High Opportunity',
        whatDataShowed:
          '100% of visitors saw the hero banner, but oversized stock imagery pushed the actual value proposition below the mobile fold.',
        whyUsersStruggled:
          'On 390px mobile screens, users only saw a decorative photo and a generic headline without knowing price or category.',
        croFixApplied:
          'Compressed hero vertical height by 35% on mobile so headline, 4.9★ proof, price, and primary CTA fit on Screen 1.',
        measuredImpact: '-27% immediate bounce rate on mobile traffic (placeholder)',
      },
      {
        id: 'sm-2',
        zoneLabel: 'Band B · The "False Floor" Drop-Off (50% Scroll)',
        coordinateTag: 'Mid-Page Sharp Gradient Drop',
        severity: 'Critical Leak',
        whatDataShowed:
          'Retention plummeted from 68% to 29% right after a huge dark full-bleed banner with lots of empty padding.',
        whyUsersStruggled:
          'The layout created a visual "false bottom"—visitors assumed the page had ended and closed the tab.',
        croFixApplied:
          'Removed the false floor, introduced a peeking card carousel and directional visual cues pulling the eye downward.',
        measuredImpact: '+51% more visitors scrolled into the pricing & review section (placeholder)',
      },
      {
        id: 'sm-3',
        zoneLabel: 'Band C · Buried Social Proof (20% Scroll Zone)',
        coordinateTag: 'Bottom 20% of Page (Cold Blue Zone)',
        severity: 'Quick Win',
        whatDataShowed:
          'Verified video reviews and the money-back guarantee were placed at the very bottom where only 19% of users reached.',
        whyUsersStruggled:
          '81% of hesitant buyers left before ever seeing a single customer review or guarantee.',
        croFixApplied:
          'Moved review highlights and risk-reversal badges directly adjacent to the primary CTA and checkout buttons.',
        measuredImpact: '+39% lift in checkout / lead form initiation (placeholder)',
      },
    ],
  },
  {
    mode: 'rageclicks',
    tabLabel: 'Rage Clicks & Form Drop-Off',
    shortTag: 'WHERE FRICTION KILLS SALES',
    toolStack: 'Session Replays + Form Field Abandonment Analytics',
    headline: 'Spot Broken UX Expectations, Dead Taps & Form Field Leaks',
    summary:
      'Rage clicks happen when a user taps the same element 3–5 times in frustration because they expect it to open a size chart, zoom a photo, or apply a coupon—and nothing happens.',
    sampleMetricLabel: 'Checkout & Form Abandonment Rate',
    sampleMetricValue: '68% → 31% drop-off after UX fixes (placeholder)',
    findings: [
      {
        id: 'rc-1',
        zoneLabel: 'Rage Cluster #1 · Non-Clickable Trust & Spec Badges',
        coordinateTag: '142 Rage-Click Sessions / Week',
        severity: 'Quick Win',
        whatDataShowed:
          'Users repeatedly tapped the "Size Guide" image and "EMI Starting ₹799/mo" badge expecting a popup breakdown.',
        whyUsersStruggled:
          'Static images looked like interactive buttons; when nothing opened, users hesitated to pick a size or price tier.',
        croFixApplied:
          'Converted static badges into instant modal drawers showing exact cm/inch measurements and EMI bank slabs.',
        measuredImpact: '+26% faster size selection & lower return rate (placeholder)',
      },
      {
        id: 'rc-2',
        zoneLabel: 'Form Leak #2 · Mandatory Phone + Company Size Fields',
        coordinateTag: 'Field #4 & #5 (47% Drop-Off)',
        severity: 'Critical Leak',
        whatDataShowed:
          'Field-level timing logs showed users typed Name and Email in 6 seconds, then hesitated 19 seconds on "Phone" & "Annual Revenue" before abandoning.',
        whyUsersStruggled:
          'Too much personal/financial friction asked before delivering any value or quote preview.',
        croFixApplied:
          'Split into a 2-step micro-commitment form: Step 1 asks only URL + Goal; Step 2 collects contact details with "No spam" reassurance.',
        measuredImpact: '+62% completed lead submissions from identical ad spend (placeholder)',
      },
      {
        id: 'rc-3',
        zoneLabel: 'Rage Cluster #3 · Coupon Code Box Hunting at Checkout',
        coordinateTag: 'Checkout Step 2 (Coupon Input)',
        severity: 'Critical Leak',
        whatDataShowed:
          'Session replays showed 24% of shoppers clicking the empty "Promo Code" box, leaving the site to Google for codes, and never returning.',
        whyUsersStruggled:
          'A prominent empty coupon box triggers fear of overpaying (FOMO).',
        croFixApplied:
          'Collapsed coupon input behind a subtle toggle and added a 1-click "Apply Available ₹150 Prepaid Offer" chip right inside checkout.',
        measuredImpact: '+19% checkout completion & fewer abandoned carts (placeholder)',
      },
    ],
  },
];

/* --- SECTION 4: THE 6 CONVERSION LEVERS WE PULL (6 CARDS) --- */
export interface ConversionLeverCard {
  id: string;
  numberCode: string;
  title: string;
  subtitle: string;
  typicalLiftRange: string;
  description: string;
  whatWeOptimize: [string, string, string];
  beforeState: string;
  afterState: string;
}

const CONVERSION_LEVERS: ConversionLeverCard[] = [
  {
    id: 'lever-01',
    numberCode: 'LEVER 01',
    title: 'Above-the-Fold Clarity & Value Proposition',
    subtitle: 'Pass the 5-second test so visitors immediately know what you offer and why it matters',
    typicalLiftRange: '+24% to +45% Hero Engagement (placeholder)',
    description:
      'Visitors decide within 5 seconds whether to stay or bounce. We rewrite vague slogans into specific outcome-driven headlines, align landing page copy with the exact ad or search query they clicked (message match), and make the next step unmistakable.',
    whatWeOptimize: [
      'Ad-to-landing-page headline message match',
      'Outcome-first subheadline & bulleted value summary',
      'High-contrast primary CTA above the mobile & desktop fold',
    ],
    beforeState: '"Welcome to Our Digital Platform — Empowering Tomorrow"',
    afterState: '"Automate GST Billing & Inventory in 10 Mins — Start Free Trial"',
  },
  {
    id: 'lever-02',
    numberCode: 'LEVER 02',
    title: 'Page Speed & Mobile UX',
    subtitle: 'Design for the 75%+ of users browsing one-handed on a mobile screen',
    typicalLiftRange: '+18% to +38% Mobile CVR (placeholder)',
    description:
      'Every 1-second delay in mobile load time costs up to 10–20% of conversions. We strip render-blocking bloat, fix layout shifts (CLS), enlarge tap targets for thumbs, and add sticky bottom action bars so the CTA is always in reach.',
    whatWeOptimize: [
      'Sub-2-second Largest Contentful Paint (LCP) & zero layout jump',
      'Thumb-zone sticky "Add to Cart" or "Book Call" bottom bar',
      'Collapsible accordions replacing endless mobile text walls',
    ],
    beforeState: '4.6s mobile load + tiny buttons + scrolling back up to buy',
    afterState: '1.4s load + sticky thumb bar + 48px tap targets',
  },
  {
    id: 'lever-03',
    numberCode: 'LEVER 03',
    title: 'Trust Signals & Social Proof Placement',
    subtitle: 'Put verified reviews, guarantees, and credentials right where doubt creeps in',
    typicalLiftRange: '+20% to +42% Buyer Confidence (placeholder)',
    description:
      'Having testimonials on a separate "/reviews" page does not help a buyer hesitating on your checkout button. We place star ratings, photo/video reviews, client logos, security badges, and clear refund guarantees right next to price and CTAs.',
    whatWeOptimize: [
      'Verified review snippets & star ratings above the fold',
      'Risk-reversal microcopy ("7-Day Free Returns", "Cancel Anytime")',
      'Real customer photos, case study metrics & security seals near forms',
    ],
    beforeState: 'Testimonials hidden at page bottom; zero guarantee near CTA',
    afterState: '4.9★ rating + money-back guarantee badge directly under CTA',
  },
  {
    id: 'lever-04',
    numberCode: 'LEVER 04',
    title: 'Product Pages, Pricing Tables & Offer Framing',
    subtitle: 'Structure options, bundles, and pricing so choosing the right tier feels effortless',
    typicalLiftRange: '+22% to +50% Add-to-Cart / Plan Selection (placeholder)',
    description:
      'Confused buyers never buy. Whether you sell D2C products or SaaS/service packages, we redesign PDPs and pricing tables using anchoring, clear "Best Value" highlights, bundle savings calculators, and instant objection-handling FAQs.',
    whatWeOptimize: [
      'Buy-More-Save-More bundles & slide-out cart upsell drawers',
      'Clear 3-tier pricing table with highlighted "Most Popular" anchor',
      'Inline pincode delivery estimator, size guide & comparison matrix',
    ],
    beforeState: 'Single SKU price with unclear shipping & wall-of-text specs',
    afterState: 'Anchored bundle tiers + free-shipping progress bar + delivery ETA',
  },
  {
    id: 'lever-05',
    numberCode: 'LEVER 05',
    title: 'Forms, Cart & Checkout Friction Removal',
    subtitle: 'Cut unnecessary fields, clicks, and surprises between intent and payment',
    typicalLiftRange: '+30% to +65% Checkout / Form Completion (placeholder)',
    description:
      'The highest-intent visitors drop off at the finish line because of 10-field forms, forced account creation, or surprise shipping fees. We streamline forms into low-friction steps and engineer 1-page UPI/card checkouts.',
    whatWeOptimize: [
      'Field reduction & 2-step micro-commitment lead forms',
      'Guest checkout + pincode auto-fill for city & state',
      '1-tap UPI / wallet priority & prepaid discount nudges',
    ],
    beforeState: '9 required form fields or 4-step account-mandatory checkout',
    afterState: '3-field instant form or 1-page express guest checkout',
  },
  {
    id: 'lever-06',
    numberCode: 'LEVER 06',
    title: 'A/B Testing & Continuous Experimentation',
    subtitle: 'Replace internal opinions with statistically backed split tests that compound monthly',
    typicalLiftRange: 'Compounding +5% to +15% Per Winning Test (placeholder)',
    description:
      'Instead of redesigning blindly and hoping for the best, we run structured A/B experiments on headlines, hero layouts, CTAs, social proof, and checkout flows—shipping only the variants proven to generate more revenue per visitor.',
    whatWeOptimize: [
      'ICE-prioritized hypothesis backlog (Impact, Confidence, Ease)',
      'Clean 50/50 split tests tracking revenue per visitor (RPV)',
      'Post-test statistical analysis & permanent rollout of winners',
    ],
    beforeState: 'HiPPO decisions ("I think we should change the banner")',
    afterState: 'Controlled 50/50 split test → +31% verified winner rolled out',
  },
];

/* ============================================================================
   HELPER FUNCTIONS
============================================================================ */
const formatINR = (val: number): string => {
  return '₹' + Math.round(val).toLocaleString('en-IN');
};

/* ============================================================================
   MAIN COMPONENT: CONVERSION RATE OPTIMIZATION (CRO) PAGE
============================================================================ */
export interface ConversionRateOptimizationProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const ConversionRateOptimization: React.FC<ConversionRateOptimizationProps> = ({
  onOpenQuoteModal,
}) => {
  const shouldReduceMotion = useReducedMotion();

  /* Quote Modal Trigger */
  const triggerQuoteModal = (customContext?: string) => {
    const label = customContext || croService.name;
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  /* Document Title & Meta Description */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Conversion Rate Optimization (CRO) Services — Audits, Heatmaps & A/B Testing | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Turn more of your existing website traffic into customers without raising ad spend. WebXCode delivers data-driven Conversion Rate Optimization (CRO): heatmaps, funnel audits, UX redesigns, checkout optimization, and A/B testing.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* JSON-LD Service Schema */
  const jsonLdSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: croService.name,
      description: croService.description,
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      serviceType: 'Conversion Rate Optimization (CRO)',
      areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'AU'],
      url: 'https://webxcode.com/services/conversion-rate-optimization',
    }),
    []
  );

  /* --- SECTION 1 STATE: Hero Before / After View & Selected Hotspot --- */
  const [heroViewMode, setHeroViewMode] = useState<'split' | 'before' | 'after'>('split');
  const [selectedHeroHotspot, setSelectedHeroHotspot] = useState<number>(1);
  const activeHeroHotspot = useMemo(
    () =>
      HERO_REDESIGN_HOTSPOTS.find((h) => h.id === selectedHeroHotspot) ||
      HERO_REDESIGN_HOTSPOTS[0],
    [selectedHeroHotspot]
  );

  /* --- SECTION 2 STATE: Interactive Revenue Multiplier Calculator --- */
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(45000);
  const [currentCvr, setCurrentCvr] = useState<number>(1.8);
  const [avgOrderValueInr, setAvgOrderValueInr] = useState<number>(3000);
  const [improvedCvr, setImprovedCvr] = useState<number>(3.2);

  /* Ensure improvedCvr stays at least slightly above or equal to currentCvr for logical UX */
  const effectiveImprovedCvr = Math.max(improvedCvr, Number((currentCvr + 0.2).toFixed(1)));

  const calcStats = useMemo(() => {
    const currentCustomers = Math.round(monthlyVisitors * (currentCvr / 100));
    const currentMonthlyRevenue = currentCustomers * avgOrderValueInr;

    const newCustomers = Math.round(monthlyVisitors * (effectiveImprovedCvr / 100));
    const newMonthlyRevenue = newCustomers * avgOrderValueInr;

    const extraMonthlyCustomers = Math.max(0, newCustomers - currentCustomers);
    const extraMonthlyRevenue = Math.max(0, newMonthlyRevenue - currentMonthlyRevenue);
    const extraAnnualRevenue = extraMonthlyRevenue * 12;
    const relativeLiftPercent =
      currentCvr > 0
        ? Math.round(((effectiveImprovedCvr - currentCvr) / currentCvr) * 100)
        : 0;

    return {
      currentCustomers,
      currentMonthlyRevenue,
      newCustomers,
      newMonthlyRevenue,
      extraMonthlyCustomers,
      extraMonthlyRevenue,
      extraAnnualRevenue,
      relativeLiftPercent,
    };
  }, [monthlyVisitors, currentCvr, avgOrderValueInr, effectiveImprovedCvr]);

  const applyPreset = (preset: CalculatorPreset) => {
    setMonthlyVisitors(preset.visitors);
    setCurrentCvr(preset.currentCvr);
    setAvgOrderValueInr(preset.orderValue);
    setImprovedCvr(preset.targetCvr);
  };

  /* --- SECTION 3 STATE: User Behavior Lab (Heatmap / Scroll Map / Rage Clicks) --- */
  const [activeBehaviorMode, setActiveBehaviorMode] =
    useState<BehaviorOverlayMode>('heatmap');
  const currentBehaviorSpec = useMemo(
    () =>
      BEHAVIOR_LAB_MODES.find((b) => b.mode === activeBehaviorMode) ||
      BEHAVIOR_LAB_MODES[0],
    [activeBehaviorMode]
  );
  const [selectedFindingId, setSelectedFindingId] = useState<string>(
    BEHAVIOR_LAB_MODES[0].findings[0].id
  );

  const handleSelectBehaviorMode = (mode: BehaviorOverlayMode) => {
    setActiveBehaviorMode(mode);
    const found = BEHAVIOR_LAB_MODES.find((b) => b.mode === mode);
    if (found) {
      setSelectedFindingId(found.findings[0].id);
    }
  };

  const activeFinding = useMemo(
    () =>
      currentBehaviorSpec.findings.find((f) => f.id === selectedFindingId) ||
      currentBehaviorSpec.findings[0],
    [currentBehaviorSpec, selectedFindingId]
  );

  return (
    <main className="flex-1 bg-white text-navy">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* ======================================================================
          SECTION 1 — HERO: BEFORE / AFTER CONVERSION LIFT VISUALIZER (bg: #1e242e navy)
          ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-white/10">
        {/* Radial Blue Glow + Precision Grid Overlay */}
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
          {/* Breadcrumb: Home / Services / Conversion Rate Optimization */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/65 font-medium">
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
                {croService.name}
              </li>
            </ol>
          </nav>

          {/* Hero 12-Col Grid: 55% Left / 45% Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 6 Cols: Category Pill, H1, Subtitle, BestFor, 2 CTAs & 4 Stat Pills */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <ServiceIcon name={croService.icon} className="w-3.5 h-3.5 text-primary" />
                <span>CONVERSION RATE OPTIMIZATION • UX &amp; A/B TESTING</span>
              </div>

              <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] font-extrabold text-white leading-[1.08] tracking-tight">
                Get More Customers From the{' '}
                <span className="text-primary">Traffic You Already Have</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65]">
                Before you spend another rupee on ads, fix the leaks in your website. We use
                heatmaps, user recordings, funnel data and A/B tests to turn more visitors into
                leads, carts and sales.
              </p>

              {/* Best For Chips pulled from single source of truth */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/55 mr-1">
                  Built For:
                </span>
                {croService.bestFor.map((segment) => (
                  <span
                    key={segment}
                    className="px-3 py-1 rounded-full bg-white/[0.07] border border-white/15 text-[12px] font-semibold text-white/90"
                  >
                    {segment}
                  </span>
                ))}
              </div>

              {/* Two CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('Free CRO & Funnel Leak Audit')}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Get a Free CRO Audit</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#revenue-calculator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] transition-all"
                >
                  <span>Calculate Your Revenue Lift</span>
                </a>
              </div>

              {/* 4 Stat Pills */}
              <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { val: '+35–80%', label: 'Avg. Conversion Lift (placeholder)' },
                  { val: '₹0', label: 'Extra Ad Spend Needed' },
                  { val: 'Data + UX', label: 'Heatmaps, Funnels & Tests' },
                  { val: '30 Days', label: 'To First Tested Wins' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10"
                  >
                    <div className="font-mono text-[20px] sm:text-[22px] font-extrabold text-white tabular-nums leading-none">
                      {stat.val}
                    </div>
                    <div className="text-[11px] sm:text-[12px] font-medium text-white/70 mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 6 Cols: Interactive Before / After Conversion Lift Visualizer */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] bg-white/[0.05] border border-white/15 backdrop-blur-md p-4 sm:p-6 shadow-2xl">
                {/* Top Header Bar + View Mode Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <SplitSquareVertical className="w-4 h-4 text-primary" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/90">
                      BEFORE / AFTER CONVERSION LIFT VISUALIZER
                    </span>
                  </div>

                  {/* Mode Switcher */}
                  <div
                    className="inline-flex items-center p-1 rounded-full bg-navy border border-white/15"
                    role="tablist"
                    aria-label="Before and after comparison view"
                  >
                    {[
                      { id: 'split', label: 'Side-by-Side' },
                      { id: 'before', label: 'Before (1.8%)' },
                      { id: 'after', label: 'After CRO (3.4%)' },
                    ].map((tab) => {
                      const isActive = heroViewMode === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() =>
                            setHeroViewMode(tab.id as 'split' | 'before' | 'after')
                          }
                          className={`px-3 py-1 rounded-full font-mono text-[10.5px] font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-primary text-white shadow-xs'
                              : 'text-white/65 hover:text-white'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Side-by-Side (or Single) Mini Wireframe Comparison */}
                <div className="relative">
                  <div
                    className={`grid gap-4 ${
                      heroViewMode === 'split'
                        ? 'grid-cols-1 sm:grid-cols-2'
                        : 'grid-cols-1'
                    }`}
                  >
                    {/* LEFT CARD — BEFORE CRO */}
                    {(heroViewMode === 'split' || heroViewMode === 'before') && (
                      <div className="rounded-2xl bg-navy/90 border border-white/15 p-4 flex flex-col justify-between opacity-90">
                        <div>
                          <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-white/10">
                            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/75 font-mono text-[10px] font-extrabold uppercase">
                              BEFORE CRO
                            </span>
                            <span className="font-mono text-[10px] text-rose-300 font-semibold">
                              Leaky Page
                            </span>
                          </div>

                          {/* Cluttered Mini Wireframe */}
                          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3 space-y-2.5">
                            {/* Distracting 6-link nav */}
                            <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pb-1.5 border-b border-white/10">
                              <span>LOGO</span>
                              <span>Home · About · Blog · News · Team · Contact</span>
                            </div>

                            {/* Hotspot 1 Before: Vague headline */}
                            <button
                              type="button"
                              onClick={() => setSelectedHeroHotspot(1)}
                              className={`w-full text-left p-2 rounded-lg border transition-all cursor-pointer ${
                                selectedHeroHotspot === 1
                                  ? 'bg-white/10 border-rose-400/60'
                                  : 'bg-white/[0.03] border-white/10 hover:border-white/25'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono text-rose-300 mb-0.5">
                                <span>① Vague Headline</span>
                                <span>High Bounce</span>
                              </div>
                              <div className="text-[11.5px] font-bold text-white/75 leading-tight">
                                &ldquo;Next-Gen Solutions for Modern Enterprises&rdquo;
                              </div>
                            </button>

                            {/* Hotspot 2 Before: Missing Social Proof */}
                            <button
                              type="button"
                              onClick={() => setSelectedHeroHotspot(2)}
                              className={`w-full text-left p-2 rounded-lg border border-dashed transition-all cursor-pointer ${
                                selectedHeroHotspot === 2
                                  ? 'bg-white/10 border-rose-400/60'
                                  : 'bg-white/[0.02] border-white/15 hover:border-white/30'
                              }`}
                            >
                              <div className="text-[10px] font-mono text-white/50">
                                ② Zero Reviews or Logos Above Fold
                              </div>
                              <div className="text-[10.5px] text-white/40 mt-0.5">
                                [Dense 6-line wall of corporate text...]
                              </div>
                            </button>

                            {/* Hotspot 3 Before: 9-Field Form + Tiny Submit */}
                            <button
                              type="button"
                              onClick={() => setSelectedHeroHotspot(3)}
                              className={`w-full text-left p-2 rounded-lg border transition-all cursor-pointer ${
                                selectedHeroHotspot === 3
                                  ? 'bg-white/10 border-rose-400/60'
                                  : 'bg-white/[0.03] border-white/10 hover:border-white/25'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono text-rose-300 mb-1">
                                <span>③ 9 Mandatory Form Fields</span>
                                <span>74% Drop-off</span>
                              </div>
                              <div className="grid grid-cols-3 gap-1 mb-1.5">
                                {[1, 2, 3, 4, 5, 6].map((n) => (
                                  <div
                                    key={n}
                                    className="h-3 rounded bg-white/10 border border-white/10"
                                  />
                                ))}
                              </div>
                              <span className="inline-block px-2.5 py-0.5 rounded bg-white/15 text-white/60 text-[10px] font-mono">
                                Submit
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* Bottom Metric Strip (Before) */}
                        <div className="mt-3.5 pt-3 border-t border-white/10 space-y-1 font-mono text-[11px]">
                          <div className="flex justify-between text-white/65">
                            <span>Traffic:</span>
                            <span>10,000 Visitors</span>
                          </div>
                          <div className="flex justify-between text-white/80">
                            <span>Conv. Rate:</span>
                            <strong className="text-rose-300">1.8% CVR</strong>
                          </div>
                          <div className="flex justify-between text-white font-bold pt-1 border-t border-white/10">
                            <span>Output:</span>
                            <span>180 Customers · ₹5.4L/mo</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* RIGHT CARD — AFTER CRO */}
                    {(heroViewMode === 'split' || heroViewMode === 'after') && (
                      <div className="rounded-2xl bg-white text-navy border-2 border-primary p-4 shadow-xl flex flex-col justify-between relative">
                        <div>
                          <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-navy-08">
                            <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold uppercase">
                              AFTER CRO
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-extrabold">
                              +89% More Revenue
                            </span>
                          </div>

                          {/* Optimized Mini Wireframe */}
                          <div className="rounded-xl bg-primary-50/60 border border-primary-100 p-3 space-y-2.5">
                            {/* Focused Trust Header */}
                            <div className="flex items-center justify-between text-[9.5px] font-mono text-navy-60 pb-1.5 border-b border-primary-100">
                              <span className="font-bold text-navy">BRAND LOGO</span>
                              <span className="text-primary font-bold">
                                🔒 SOC2 Certified · 2-Min Setup
                              </span>
                            </div>

                            {/* Hotspot 1 After: Benefit-Driven Headline */}
                            <button
                              type="button"
                              onClick={() => setSelectedHeroHotspot(1)}
                              className={`w-full text-left p-2 rounded-lg border transition-all cursor-pointer ${
                                selectedHeroHotspot === 1
                                  ? 'bg-white border-primary ring-2 ring-primary/25 shadow-xs'
                                  : 'bg-white/80 border-primary-100 hover:border-primary'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-primary mb-0.5">
                                <span>① Benefit-Driven Headline</span>
                                <span>+38% Lift</span>
                              </div>
                              <div className="text-[11.5px] font-extrabold text-navy leading-tight">
                                &ldquo;Cut Cloud Invoice Costs by 34% in 14 Days&rdquo;
                              </div>
                            </button>

                            {/* Hotspot 2 After: Social Proof Above the Fold */}
                            <button
                              type="button"
                              onClick={() => setSelectedHeroHotspot(2)}
                              className={`w-full text-left p-2 rounded-lg border transition-all cursor-pointer ${
                                selectedHeroHotspot === 2
                                  ? 'bg-white border-primary ring-2 ring-primary/25 shadow-xs'
                                  : 'bg-white/80 border-primary-100 hover:border-primary'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-primary">
                                <span>② Social Proof Above Fold</span>
                                <span>4.9★ (320+ Reviews)</span>
                              </div>
                              <div className="text-[10.5px] font-semibold text-navy-70 mt-0.5">
                                ★★★★★ Trusted by 450+ Engineering Teams
                              </div>
                            </button>

                            {/* Hotspot 3 After: 3-Field Form + Clear CTA */}
                            <button
                              type="button"
                              onClick={() => setSelectedHeroHotspot(3)}
                              className={`w-full text-left p-2 rounded-lg border transition-all cursor-pointer ${
                                selectedHeroHotspot === 3
                                  ? 'bg-white border-primary ring-2 ring-primary/25 shadow-xs'
                                  : 'bg-white/80 border-primary-100 hover:border-primary'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-primary mb-1">
                                <span>③ 3-Field Form &amp; Clear CTA</span>
                                <span>+64% Completion</span>
                              </div>
                              <div className="grid grid-cols-3 gap-1 mb-1.5">
                                <div className="h-3 rounded bg-primary-50 border border-primary/30" />
                                <div className="h-3 rounded bg-primary-50 border border-primary/30" />
                                <div className="h-3 rounded bg-primary-50 border border-primary/30" />
                              </div>
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-extrabold">
                                <span>Get My Free Savings Report</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* Bottom Metric Strip (After) */}
                        <div className="mt-3.5 pt-3 border-t border-navy-08 space-y-1 font-mono text-[11px]">
                          <div className="flex justify-between text-navy-60">
                            <span>Same Traffic:</span>
                            <span className="font-bold text-navy">10,000 Visitors</span>
                          </div>
                          <div className="flex justify-between text-navy">
                            <span>Optimized CVR:</span>
                            <strong className="text-primary font-extrabold">3.4% CVR</strong>
                          </div>
                          <div className="flex justify-between text-navy font-extrabold pt-1 border-t border-navy-08">
                            <span>Output:</span>
                            <span className="text-primary">340 Customers · ₹10.2L/mo</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Center Floating Badge: +89% Revenue Lift */}
                  {heroViewMode === 'split' && (
                    <div className="mt-3 flex justify-center">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-white font-mono text-[11.5px] font-extrabold shadow-lg border border-white/25">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>
                          +89% Revenue Lift — Same Traffic, ₹0 Extra Ad Spend (placeholder)
                        </span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Interactive Hotspot Inspector Strip inside Hero Card */}
                <div className="mt-4 pt-3.5 border-t border-white/10">
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/55 mr-1">
                      Inspect Upgrade:
                    </span>
                    {HERO_REDESIGN_HOTSPOTS.map((spot) => {
                      const active = spot.id === selectedHeroHotspot;
                      return (
                        <button
                          key={spot.id}
                          type="button"
                          onClick={() => setSelectedHeroHotspot(spot.id)}
                          className={`px-2.5 py-1 rounded-lg font-mono text-[10.5px] font-bold transition-all cursor-pointer ${
                            active
                              ? 'bg-primary text-white'
                              : 'bg-white/[0.06] text-white/75 hover:bg-white/10'
                          }`}
                        >
                          {spot.badgeLabel}
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-3 rounded-xl bg-navy/85 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px]">
                    <div className="text-white/85">
                      <strong className="text-primary-100">Fix: </strong>
                      {activeHeroHotspot.afterUpgrade}
                    </div>
                    <span className="font-mono text-[11px] font-extrabold text-primary-100 shrink-0">
                      {activeHeroHotspot.liftStat} (placeholder)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2 — THE REVENUE MULTIPLIER: WHY CRO BEATS BUYING MORE TRAFFIC (#ffffff)
          ====================================================================== */}
      <section
        id="revenue-calculator"
        className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <BarChart3 className="w-3.5 h-3.5 text-primary" />
                <span>THE ECONOMICS OF CRO</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Double Your Sales Without{' '}
                <span className="text-primary">Doubling Your Ad Budget</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-xl leading-[1.65]">
              When you lift your conversion rate from 1.8% to 3.2%, every SEO click, Google Ad,
              and email campaign you run immediately becomes 77% more profitable. Drag the sliders
              below to model your store or lead funnel.
            </p>
          </div>

          {/* Preset Scenario Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-navy-60 mr-2">
              Load Sample Scenario:
            </span>
            {CALCULATOR_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className="px-4 py-2 rounded-full bg-primary-50 hover:bg-primary text-navy hover:text-white border border-primary-100 text-[12.5px] font-bold transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Interactive Revenue Lift Calculator Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7 Cols: 4 Interactive Sliders */}
            <div className="lg:col-span-7 rounded-[24px] bg-primary-50/50 border border-primary-100 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-primary-100">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-primary" />
                    <span className="font-mono text-[12px] font-extrabold uppercase tracking-wider text-navy">
                      YOUR CURRENT FUNNEL INPUTS
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-navy-60">
                    Illustrative Model
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Slider 1: Monthly Website Visitors */}
                  <div className="p-4 rounded-2xl bg-white border border-navy-08">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <label
                        htmlFor="slider-visitors"
                        className="text-[14px] font-extrabold text-navy"
                      >
                        1. Monthly Website Visitors
                      </label>
                      <span className="px-3 py-1 rounded-lg bg-primary-50 text-primary font-mono text-[14px] font-extrabold">
                        {monthlyVisitors.toLocaleString('en-IN')} / mo
                      </span>
                    </div>
                    <input
                      id="slider-visitors"
                      type="range"
                      min={5000}
                      max={200000}
                      step={5000}
                      value={monthlyVisitors}
                      onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10.5px] text-navy-50 mt-1">
                      <span>5,000</span>
                      <span>50,000</span>
                      <span>1,00,000</span>
                      <span>2,00,000</span>
                    </div>
                  </div>

                  {/* Slider 2: Current Conversion Rate (%) */}
                  <div className="p-4 rounded-2xl bg-white border border-navy-08">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <label
                        htmlFor="slider-current-cvr"
                        className="text-[14px] font-extrabold text-navy"
                      >
                        2. Current Conversion Rate (%)
                      </label>
                      <span className="px-3 py-1 rounded-lg bg-navy-08 text-navy font-mono text-[14px] font-extrabold">
                        {currentCvr.toFixed(1)}%
                      </span>
                    </div>
                    <input
                      id="slider-current-cvr"
                      type="range"
                      min={0.5}
                      max={5.0}
                      step={0.1}
                      value={currentCvr}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCurrentCvr(val);
                        if (improvedCvr <= val) {
                          setImprovedCvr(Number((val + 0.8).toFixed(1)));
                        }
                      }}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10.5px] text-navy-50 mt-1">
                      <span>0.5%</span>
                      <span>1.8% (Avg)</span>
                      <span>3.5%</span>
                      <span>5.0%</span>
                    </div>
                  </div>

                  {/* Slider 3: Average Order / Lead Value (₹) */}
                  <div className="p-4 rounded-2xl bg-white border border-navy-08">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <label
                        htmlFor="slider-aov"
                        className="text-[14px] font-extrabold text-navy"
                      >
                        3. Average Order or Lead Value (₹)
                      </label>
                      <span className="px-3 py-1 rounded-lg bg-primary-50 text-primary font-mono text-[14px] font-extrabold">
                        {formatINR(avgOrderValueInr)}
                      </span>
                    </div>
                    <input
                      id="slider-aov"
                      type="range"
                      min={500}
                      max={50000}
                      step={500}
                      value={avgOrderValueInr}
                      onChange={(e) => setAvgOrderValueInr(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10.5px] text-navy-50 mt-1">
                      <span>₹500</span>
                      <span>₹3,000</span>
                      <span>₹15,000</span>
                      <span>₹50,000</span>
                    </div>
                  </div>

                  {/* Slider 4: Target Improved Conversion Rate after CRO (%) */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-primary shadow-xs">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <label
                        htmlFor="slider-target-cvr"
                        className="text-[14px] font-extrabold text-primary"
                      >
                        4. Target Conversion Rate After CRO (%)
                      </label>
                      <span className="px-3 py-1 rounded-lg bg-primary text-white font-mono text-[14px] font-extrabold">
                        {effectiveImprovedCvr.toFixed(1)}% (+{calcStats.relativeLiftPercent}% Lift)
                      </span>
                    </div>
                    <input
                      id="slider-target-cvr"
                      type="range"
                      min={1.0}
                      max={8.0}
                      step={0.1}
                      value={effectiveImprovedCvr}
                      onChange={(e) => setImprovedCvr(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10.5px] text-navy-60 mt-1">
                      <span>1.0%</span>
                      <span>3.2% (Target)</span>
                      <span>5.5%</span>
                      <span>8.0%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[12px] text-navy-60 font-medium">
                * Illustrative revenue model based on your inputs. Actual conversion lift depends on
                baseline UX, traffic intent, and offer structure.
              </div>
            </div>

            {/* Right 5 Cols: Live Output Panel (Dark Navy #1e242e) */}
            <div className="lg:col-span-5 rounded-[24px] bg-navy text-white p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 blue-glow pointer-events-none opacity-60" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 pb-4 mb-6 border-b border-white/15">
                  <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-wider">
                    LIVE REVENUE MULTIPLIER
                  </span>
                  <span className="font-mono text-[11px] text-primary-100 font-bold">
                    ₹0 Extra Ad Spend
                  </span>
                </div>

                {/* Current vs After CRO Comparison Grid */}
                <div className="grid grid-cols-2 gap-3.5 mb-6">
                  <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10">
                    <div className="font-mono text-[10px] font-bold uppercase text-white/60">
                      CURRENT MONTHLY
                    </div>
                    <div className="font-mono text-[18px] sm:text-[20px] font-extrabold text-white mt-1">
                      {formatINR(calcStats.currentMonthlyRevenue)}
                    </div>
                    <div className="font-mono text-[11.5px] text-white/65 mt-1">
                      {calcStats.currentCustomers.toLocaleString('en-IN')} customers/mo ({currentCvr.toFixed(1)}%)
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-primary/20 border border-primary">
                    <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                      AFTER CRO ({effectiveImprovedCvr.toFixed(1)}%)
                    </div>
                    <div className="font-mono text-[18px] sm:text-[20px] font-extrabold text-white mt-1">
                      {formatINR(calcStats.newMonthlyRevenue)}
                    </div>
                    <div className="font-mono text-[11.5px] text-primary-100 mt-1">
                      {calcStats.newCustomers.toLocaleString('en-IN')} customers/mo (+
                      {calcStats.extraMonthlyCustomers.toLocaleString('en-IN')})
                    </div>
                  </div>
                </div>

                {/* Highlighted Extra Monthly Revenue Callout */}
                <div className="p-5 rounded-2xl bg-white/[0.07] border border-white/15 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                      EXTRA MONTHLY REVENUE UNLOCKED
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10.5px] font-extrabold">
                      +{calcStats.relativeLiftPercent}% Lift
                    </span>
                  </div>
                  <div className="font-mono text-[30px] sm:text-[36px] font-extrabold text-white mt-1.5 tracking-tight">
                    +{formatINR(calcStats.extraMonthlyRevenue)}
                    <span className="text-[15px] font-semibold text-white/65">/mo</span>
                  </div>
                  <div className="text-[12.5px] text-white/75 mt-1">
                    +{calcStats.extraMonthlyCustomers.toLocaleString('en-IN')} additional orders or
                    qualified leads every single month from your existing {monthlyVisitors.toLocaleString('en-IN')} visitors.
                  </div>
                </div>

                {/* Extra Annual Revenue Unlocked */}
                <div className="p-4 rounded-2xl bg-primary text-white flex items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-white/85">
                      12-MONTH COMPOUNDING REVENUE LIFT
                    </div>
                    <div className="font-mono text-[22px] sm:text-[26px] font-extrabold text-white leading-tight mt-0.5">
                      +{formatINR(calcStats.extraAnnualRevenue)} / year
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-white/90 shrink-0" />
                </div>
              </div>

              {/* Bottom CTA inside Output Card */}
              <div className="relative z-10 mt-6 pt-5 border-t border-white/15">
                <button
                  type="button"
                  onClick={() =>
                    triggerQuoteModal(
                      `CRO Audit — ${monthlyVisitors.toLocaleString('en-IN')} Visitors (${currentCvr}% → ${effectiveImprovedCvr}% Target)`
                    )
                  }
                  className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-primary-50 text-navy font-extrabold text-[14px] inline-flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <span>Unlock This Revenue Lift — Book Free CRO Audit</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 3 — USER BEHAVIOR LAB: HEATMAP, SCROLL & RAGE-CLICK SIMULATOR (#f0f7fd)
          ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50 border-b border-primary-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + 3 Interactive Overlay Mode Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Eye className="w-3.5 h-3.5 text-primary" />
                <span>BEHAVIORAL DIAGNOSTICS LAB</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                We Don’t Guess What’s Broken —{' '}
                <span className="text-primary">We Watch How Real Users Behave</span>
              </h2>
            </div>

            {/* 3 Overlay Mode Tabs */}
            <div
              className="inline-flex flex-wrap p-1.5 rounded-2xl bg-white border border-navy-08 shadow-xs gap-1"
              role="tablist"
              aria-label="User behavior overlay modes"
            >
              {BEHAVIOR_LAB_MODES.map((m) => {
                const isSelected = m.mode === activeBehaviorMode;
                return (
                  <button
                    key={m.mode}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectBehaviorMode(m.mode)}
                    className={`px-4 py-2.5 rounded-xl text-[13px] font-extrabold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-navy hover:text-primary'
                    }`}
                  >
                    {m.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Lab Canvas + Finding Inspector */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBehaviorSpec.mode}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left 7 Cols: Simulated Webpage with Live Behavior Overlay */}
              <div className="lg:col-span-7 rounded-[24px] bg-navy text-white p-5 sm:p-7 shadow-xl border border-white/10">
                {/* Browser Chrome Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-white/15">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                      {currentBehaviorSpec.shortTag} • LIVE TELEMETRY OVERLAY
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 font-mono text-[10.5px] text-white/85">
                    {currentBehaviorSpec.toolStack}
                  </span>
                </div>

                {/* Mode 1: CLICK HEATMAP VISUAL OVERLAY */}
                {currentBehaviorSpec.mode === 'heatmap' && (
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-white/95 text-navy p-5 relative overflow-hidden border border-white/20 space-y-4">
                      {/* Simulated Top Nav with Distraction Hotspots */}
                      <div
                        onClick={() => setSelectedFindingId('hm-1')}
                        className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                          selectedFindingId === 'hm-1'
                            ? 'border-primary bg-primary-50/70 ring-2 ring-primary/30'
                            : 'border-navy-15 bg-white hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-extrabold text-navy">STORE HEADER NAV</span>
                          <div className="flex items-center gap-3 relative">
                            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-700 font-bold">
                              About Us (18% Clicks)
                            </span>
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 font-bold">
                              Blog (13% Clicks)
                            </span>
                          </div>
                        </div>
                        {/* Glowing Heatmap Radial Spot */}
                        <div
                          className="mt-2 flex items-center justify-between text-[11px] font-bold text-primary"
                          aria-hidden="true"
                        >
                          <span>🔥 Zone #1: 31% of paid clicks leaked into top nav links</span>
                          <span className="underline">Inspect Fix →</span>
                        </div>
                      </div>

                      {/* Simulated Product Hero + Delivery Policy Microcopy Hotspot */}
                      <div
                        onClick={() => setSelectedFindingId('hm-2')}
                        className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                          selectedFindingId === 'hm-2'
                            ? 'border-primary bg-primary-50/70 ring-2 ring-primary/30'
                            : 'border-navy-15 bg-white hover:border-primary/50'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div>
                            <div className="text-[14px] font-extrabold text-navy">
                              Ergonomic Studio Chair Pro — ₹14,990
                            </div>
                            <div className="text-[11.5px] text-navy-60">
                              4.8★ (410 Reviews) · In Stock
                            </div>
                          </div>
                          <span className="px-3 py-1.5 rounded-full bg-primary text-white text-[11px] font-extrabold shadow-md">
                            Add to Cart (Hotzone)
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-300/80 flex items-center justify-between text-[11.5px] font-bold text-amber-900">
                          <span>
                            🔥 Dense Click Cluster: Tiny &ldquo;Shipping &amp; Return Policy&rdquo;
                            link (27% taps)
                          </span>
                          <span className="font-mono text-[10px] uppercase text-primary">
                            Zone #2
                          </span>
                        </div>
                      </div>

                      {/* Simulated Cold Zone Feature Grid */}
                      <div
                        onClick={() => setSelectedFindingId('hm-3')}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          selectedFindingId === 'hm-3'
                            ? 'border-primary bg-primary-50/70 ring-2 ring-primary/30'
                            : 'border-navy-15 bg-navy-08/30 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-navy-60 mb-1.5">
                          <span>❄️ Coldzone #3: Generic Corporate Icon Grid</span>
                          <span className="px-2 py-0.5 rounded bg-primary-50 text-primary font-bold">
                            &lt;1.2% Clicks
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-[10.5px] text-navy-50">
                          <div className="p-2 rounded bg-white border border-navy-08">
                            [Abstract Icon 1]
                          </div>
                          <div className="p-2 rounded bg-white border border-navy-08">
                            [Abstract Icon 2]
                          </div>
                          <div className="p-2 rounded bg-white border border-navy-08">
                            [Abstract Icon 3]
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mode 2: SCROLL DEPTH MAP VISUAL OVERLAY */}
                {currentBehaviorSpec.mode === 'scrollmap' && (
                  <div className="rounded-2xl overflow-hidden border border-white/20 space-y-1.5 bg-navy p-2">
                    {/* Band A: 100% - 75% Retention */}
                    <button
                      type="button"
                      onClick={() => setSelectedFindingId('sm-1')}
                      className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer border-2 ${
                        selectedFindingId === 'sm-1'
                          ? 'border-white ring-2 ring-primary'
                          : 'border-transparent'
                      }`}
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(239,68,68,0.88) 0%, rgba(245,158,11,0.85) 100%)',
                      }}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] font-extrabold text-white">
                        <span>0%–25% SCROLL DEPTH (ABOVE THE FOLD)</span>
                        <span>100% → 75% VISITORS PRESENT</span>
                      </div>
                      <div className="text-[13.5px] font-bold text-white mt-1">
                        Band A: Oversized stock hero image pushed pricing &amp; CTA below mobile fold
                      </div>
                    </button>

                    {/* Band B: 50% False Floor Drop-Off */}
                    <button
                      type="button"
                      onClick={() => setSelectedFindingId('sm-2')}
                      className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer border-2 ${
                        selectedFindingId === 'sm-2'
                          ? 'border-white ring-2 ring-primary'
                          : 'border-transparent'
                      }`}
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(245,158,11,0.75) 0%, rgba(16,185,129,0.75) 100%)',
                      }}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] font-extrabold text-white">
                        <span>50% SCROLL MARK — &ldquo;FALSE FLOOR&rdquo; LEAK</span>
                        <span>SHARP DROP: 68% → 29%</span>
                      </div>
                      <div className="text-[13.5px] font-bold text-white mt-1">
                        Band B: Huge dark divider made visitors think the page ended here
                      </div>
                    </button>

                    {/* Band C: 20% Cold Blue Bottom Zone */}
                    <button
                      type="button"
                      onClick={() => setSelectedFindingId('sm-3')}
                      className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer border-2 ${
                        selectedFindingId === 'sm-3'
                          ? 'border-white ring-2 ring-primary'
                          : 'border-transparent'
                      }`}
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(43,127,212,0.85) 0%, rgba(30,36,46,0.95) 100%)',
                      }}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] font-extrabold text-primary-100">
                        <span>75%–100% SCROLL MARK (COLD ZONE)</span>
                        <span>ONLY 19% OF TRAFFIC REACHED</span>
                      </div>
                      <div className="text-[13.5px] font-bold text-white mt-1">
                        Band C: Customer reviews, case studies &amp; guarantee were buried down here
                      </div>
                    </button>
                  </div>
                )}

                {/* Mode 3: RAGE CLICKS & FORM DROP-OFF OVERLAY */}
                {currentBehaviorSpec.mode === 'rageclicks' && (
                  <div className="rounded-2xl bg-white text-navy p-5 space-y-3.5">
                    {/* Rage Cluster 1 */}
                    <button
                      type="button"
                      onClick={() => setSelectedFindingId('rc-1')}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedFindingId === 'rc-1'
                          ? 'border-primary bg-primary-50/70'
                          : 'border-navy-15 bg-white hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-extrabold text-rose-600">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>RAGE CLUSTER #1 • 142 FRUSTRATED SESSIONS/WK</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono text-[10px] font-bold">
                          5x Rapid Taps
                        </span>
                      </div>
                      <div className="text-[13.5px] font-extrabold text-navy mt-1">
                        Static &ldquo;Size Chart&rdquo; &amp; &ldquo;No-Cost EMI&rdquo; badges looked
                        like buttons but didn’t open
                      </div>
                    </button>

                    {/* Form Field Drop-off Funnel Bars */}
                    <button
                      type="button"
                      onClick={() => setSelectedFindingId('rc-2')}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedFindingId === 'rc-2'
                          ? 'border-primary bg-primary-50/70'
                          : 'border-navy-15 bg-white hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] font-extrabold text-primary mb-2">
                        <span>FORM FIELD ABANDONMENT TELEMETRY</span>
                        <span className="text-rose-600">-47% Drop at Field #4</span>
                      </div>
                      <div className="space-y-1.5 font-mono text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="w-28 text-navy-70">1. Full Name</span>
                          <div className="flex-1 h-2 rounded-full bg-navy-08 overflow-hidden">
                            <div className="h-full w-[96%] bg-primary rounded-full" />
                          </div>
                          <span className="font-bold text-navy">96%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-28 text-navy-70">2. Work Email</span>
                          <div className="flex-1 h-2 rounded-full bg-navy-08 overflow-hidden">
                            <div className="h-full w-[89%] bg-primary rounded-full" />
                          </div>
                          <span className="font-bold text-navy">89%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-28 text-rose-700 font-bold">4. Annual Rev.</span>
                          <div className="flex-1 h-2 rounded-full bg-navy-08 overflow-hidden">
                            <div className="h-full w-[42%] bg-rose-500 rounded-full" />
                          </div>
                          <span className="font-bold text-rose-600">42% (Leak!)</span>
                        </div>
                      </div>
                    </button>

                    {/* Rage Cluster 3: Coupon Box Hunting */}
                    <button
                      type="button"
                      onClick={() => setSelectedFindingId('rc-3')}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedFindingId === 'rc-3'
                          ? 'border-primary bg-primary-50/70'
                          : 'border-navy-15 bg-white hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] font-extrabold text-amber-700">
                        <span>CHECKOUT LEAK #3 • COUPON CODE HUNTING</span>
                        <span>24% Tab Exit Rate</span>
                      </div>
                      <div className="text-[13.5px] font-extrabold text-navy mt-1">
                        Prominent empty &ldquo;Enter Promo Code&rdquo; box sent shoppers to Google
                        mid-checkout
                      </div>
                    </button>
                  </div>
                )}

                {/* Bottom Metric Bar inside Left Canvas */}
                <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 font-mono text-[12px]">
                  <span className="text-white/75">{currentBehaviorSpec.sampleMetricLabel}:</span>
                  <strong className="text-primary-100">
                    {currentBehaviorSpec.sampleMetricValue}
                  </strong>
                </div>
              </div>

              {/* Right 5 Cols: Active Finding Diagnostic & Fix Card */}
              <div className="lg:col-span-5 rounded-[24px] bg-white border border-navy-08 p-6 sm:p-7 shadow-soft flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-navy-08">
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase">
                      {activeFinding.severity}
                    </span>
                    <span className="font-mono text-[11.5px] font-bold text-navy-60">
                      {activeFinding.coordinateTag}
                    </span>
                  </div>

                  {/* Quick Selector Chips for the 3 Findings in Current Mode */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {currentBehaviorSpec.findings.map((item, idx) => {
                      const active = item.id === activeFinding.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedFindingId(item.id)}
                          className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold transition-all cursor-pointer border ${
                            active
                              ? 'bg-navy text-white border-navy'
                              : 'bg-primary-50/60 text-navy border-primary-100 hover:border-primary'
                          }`}
                        >
                          Finding 0{idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  <h3 className="mt-4 text-[20px] sm:text-[22px] font-extrabold text-navy leading-snug">
                    {activeFinding.zoneLabel}
                  </h3>

                  <div className="mt-4 space-y-3.5">
                    <div className="p-3.5 rounded-2xl bg-primary-50/50 border border-navy-08">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-navy-60 mb-1">
                        1. WHAT THE BEHAVIOR DATA SHOWED
                      </div>
                      <p className="text-[13.5px] text-navy leading-relaxed">
                        {activeFinding.whatDataShowed}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-primary-50/50 border border-navy-08">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-navy-60 mb-1">
                        2. WHY VISITORS HESITATED OR DROPPED OFF
                      </div>
                      <p className="text-[13.5px] text-navy leading-relaxed">
                        {activeFinding.whyUsersStruggled}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-navy text-white">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100 mb-1">
                        3. THE WEBXCODE CRO FIX
                      </div>
                      <p className="text-[13.5px] text-white/90 leading-relaxed">
                        {activeFinding.croFixApplied}
                      </p>
                      <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between font-mono text-[12px] font-extrabold text-primary-100">
                        <span>Measured Result:</span>
                        <span>{activeFinding.measuredImpact}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    triggerQuoteModal(`Behavior & Heatmap Audit (${currentBehaviorSpec.tabLabel})`)
                  }
                  className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer"
                >
                  <span>Run This Diagnostic on My Website</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ======================================================================
          SECTION 4 — THE 6 CONVERSION LEVERS WE PULL (bg: #ffffff)
          ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 lg:mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>FULL-FUNNEL OPTIMIZATION FRAMEWORK</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              The 6 Places Where Websites{' '}
              <span className="text-primary">Leak Customers — and How We Fix Them</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              CRO is not about changing button colors at random. We systematically optimize the 6
              highest-leverage persuasion, speed, and checkout layers across your entire customer
              journey.
            </p>
          </div>

          {/* 3x2 Grid of 6 Conversion Lever Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            {CONVERSION_LEVERS.map((lever) => (
              <div
                key={lever.id}
                className="rounded-[24px] bg-white border border-navy-08 hover:border-primary p-6 sm:p-7 shadow-soft hover:shadow-soft-hover transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge + Typical Lift */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-navy-08">
                    <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[11px] font-extrabold uppercase">
                      {lever.numberCode}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary font-mono text-[10.5px] font-extrabold">
                      {lever.typicalLiftRange}
                    </span>
                  </div>

                  <h3 className="text-[20px] sm:text-[21px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug">
                    {lever.title}
                  </h3>

                  <p className="mt-1.5 text-[13px] font-bold text-primary">
                    {lever.subtitle}
                  </p>

                  <p className="mt-3 text-[14px] text-navy-70 leading-relaxed">
                    {lever.description}
                  </p>

                  {/* 3 What We Optimize Bullets */}
                  <ul className="mt-4 pt-4 border-t border-navy-08 space-y-2">
                    {lever.whatWeOptimize.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[13px] font-semibold text-navy"
                      >
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mini Before -> After Strip at Bottom of Card */}
                <div className="mt-6 pt-4 border-t border-navy-08 space-y-2">
                  <div className="p-2.5 rounded-xl bg-navy-08/40 border border-navy-08 text-[11.5px] text-navy-60 font-mono">
                    <strong className="text-navy uppercase mr-1">Before:</strong>
                    {lever.beforeState}
                  </div>
                  <div className="p-2.5 rounded-xl bg-primary-50 border border-primary-100 text-[11.5px] text-navy font-mono font-bold">
                    <strong className="text-primary uppercase mr-1">After:</strong>
                    {lever.afterState}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cross-Link Strip to Related Services */}
          <div className="mt-12 pt-8 border-t border-navy-08 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[14px] font-extrabold text-navy">
              Pair CRO With High-Intent Traffic &amp; Store Engineering:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/services/performance-marketing"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[13px] font-bold transition-colors"
              >
                <span>Performance Marketing</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link
                href="/services/google-ads-sem"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[13px] font-bold transition-colors"
              >
                <span>Google Ads (SEM)</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link
                href="/services/ecommerce-development"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[13px] font-bold transition-colors"
              >
                <span>E-commerce Development</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link
                href="/services/analytics-tracking-setup"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[13px] font-bold transition-colors"
              >
                <span>Analytics &amp; Tracking Setup</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConversionRateOptimization;
