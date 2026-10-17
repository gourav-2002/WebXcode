import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Sparkles,
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  FileSpreadsheet,
  MessageSquare,
  Mail,
  Bell,
  HelpCircle,
  Search,
  Database,
  Layers,
  Clock,
  ShieldCheck,
  Sliders,
  CheckCircle2,
  Zap,
  Globe,
  RefreshCw,
} from 'lucide-react';
import { aiSolutions } from '../AISolutions';
import { services } from '../Services';

interface AiAnalyticsReportingProps {
  onOpenQuoteModal?: (service?: string) => void;
}

/* ==========================================================================
   DATA ARRAYS — TOP OF FILE
========================================================================== */

interface HeroKpiItem {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  sparkPoints: string;
}

const HERO_KPI_ITEMS: HeroKpiItem[] = [
  {
    id: 'kpi-rev',
    label: 'Net Revenue (7d)',
    value: '₹42.8L',
    delta: '+18.4% WoW',
    trend: 'up',
    sparkPoints: '4,24 18,20 32,22 46,14 60,11 74,6',
  },
  {
    id: 'kpi-spend',
    label: 'Total Ad Spend',
    value: '₹9.4L',
    delta: '+6.2% WoW',
    trend: 'up',
    sparkPoints: '4,22 18,21 32,18 46,19 60,15 74,13',
  },
  {
    id: 'kpi-leads',
    label: 'Qualified Leads',
    value: '614',
    delta: '+24.1% WoW',
    trend: 'up',
    sparkPoints: '4,25 18,22 32,17 46,15 60,9 74,5',
  },
  {
    id: 'kpi-roas',
    label: 'Blended ROAS',
    value: '4.55×',
    delta: '+0.42× WoW',
    trend: 'up',
    sparkPoints: '4,23 18,19 32,20 46,13 60,10 74,6',
  },
];

interface HeroBriefTakeaway {
  id: string;
  badge: string;
  headline: string;
  explanation: string;
  recommendedAction: string;
  sourceSystems: string[];
}

const HERO_BRIEF_TAKEAWAYS: HeroBriefTakeaway[] = [
  {
    id: 'takeaway-1',
    badge: '01 · REVENUE DRIVER',
    headline: 'Google Search Non-Brand drove 64% of net-new pipeline growth this week.',
    explanation:
      'High-intent comparison queries converted at 6.8% (+1.9 pts WoW) after landing page speed and headline updates went live on Tuesday.',
    recommendedAction: 'Shift ₹85,000/wk from Display retargeting into top 4 Search ad groups.',
    sourceSystems: ['Google Ads', 'GA4', 'HubSpot CRM'],
  },
  {
    id: 'takeaway-2',
    badge: '02 · ANOMALY FLAGGED',
    headline: 'Meta Ads Android checkout drop-off spiked +29% on Thursday 14:00–19:00 IST.',
    explanation:
      'Root-cause trace matched a Razorpay UPI intent timeout on mobile webviews—not creative fatigue. Ad CTR remained steady at 2.4%.',
    recommendedAction: 'Keep winning video creatives running; verify payment gateway webhook fix.',
    sourceSystems: ['Meta Ads', 'Shopify', 'GA4 Funnel'],
  },
  {
    id: 'takeaway-3',
    badge: '03 · PIPELINE & LTV SIGNAL',
    headline: 'WhatsApp-qualified leads closed 2.3× faster than standard web form leads.',
    explanation:
      'Deals with <60s WhatsApp first touch reached Demo Completed in 3.1 days vs. 7.4 days for manual email follow-ups.',
    recommendedAction: 'Route all Meta Lead Ads above ₹50k budget directly into WhatsApp flow.',
    sourceSystems: ['Zoho CRM', 'WhatsApp API', 'Stripe/Tally'],
  },
];

interface AskYourDataQuestion {
  id: string;
  chipLabel: string;
  fullQuestion: string;
  headlineAnswer: string;
  narrativeSummary: string;
  keyDrivers: {
    factor: string;
    impact: string;
    direction: 'positive' | 'negative' | 'neutral';
  }[];
  chartTitle: string;
  chartUnit: string;
  chartBars: {
    label: string;
    value: number;
    displayValue: string;
    highlight?: boolean;
  }[];
  recommendedAction: string;
  queriedSources: string[];
}

const ASK_YOUR_DATA_QUESTIONS: AskYourDataQuestion[] = [
  {
    id: 'q-leads-drop',
    chipLabel: 'Why did leads drop last week?',
    fullQuestion: 'Why did qualified leads drop 19% last week despite steady ad spend?',
    headlineAnswer:
      '82% of the drop came from a broken mobile form validation rule on the /book-demo page after Tuesday’s release—not from ad performance.',
    narrativeSummary:
      'Ad clicks across Google and Meta actually rose +4.2% WoW, and landing page sessions held steady at 14,820. However, mobile Safari form submission rate fell from 5.8% to 1.4% between Tue 16:00 and Fri 11:00.',
    keyDrivers: [
      {
        factor: 'Mobile Safari Form Validation Error (/book-demo)',
        impact: '-112 leads (Primary Root Cause)',
        direction: 'negative',
      },
      {
        factor: 'Meta Lead Ad Instant Form Pause (Campaign #4)',
        impact: '-26 leads (Budget cap reached Thu)',
        direction: 'negative',
      },
      {
        factor: 'Google Brand & High-Intent Search',
        impact: '+19 leads (+8.4% WoW lift)',
        direction: 'positive',
      },
    ],
    chartTitle: 'Qualified Leads by Day (Last 7 Days vs. Prior Week Baseline)',
    chartUnit: 'Leads / Day',
    chartBars: [
      { label: 'Mon', value: 88, displayValue: '88' },
      { label: 'Tue', value: 84, displayValue: '84' },
      { label: 'Wed (Bug)', value: 46, displayValue: '46 ⚠️', highlight: true },
      { label: 'Thu (Bug)', value: 42, displayValue: '42 ⚠️', highlight: true },
      { label: 'Fri (Fixed)', value: 79, displayValue: '79' },
      { label: 'Sat', value: 74, displayValue: '74' },
      { label: 'Sun', value: 71, displayValue: '71' },
    ],
    recommendedAction:
      'Form hotfix was deployed Friday 11:20 AM (conversion already recovered to 5.6%). Trigger the CRM re-engagement WhatsApp flow for the 310 visitors who abandoned step 2.',
    queriedSources: ['GA4 Events', 'Google Ads', 'Meta Ads', 'HubSpot CRM'],
  },
  {
    id: 'q-best-roas',
    chipLabel: 'Which campaign had the best ROAS?',
    fullQuestion: 'Which paid campaign delivered the highest true net-revenue ROAS this month?',
    headlineAnswer:
      'Google Search — "Competitor Alternatives" delivered 6.8× net-revenue ROAS (₹21.4L closed revenue on ₹3.15L spend).',
    narrativeSummary:
      'While Meta Retargeting reported 7.2× inside Ads Manager, deduplicated CRM + Shopify order data shows 38% of those conversions were existing repeat buyers. Google Non-Brand Competitor Search drove the highest net-new customer revenue.',
    keyDrivers: [
      {
        factor: 'Google Search: Competitor & Comparison Intent',
        impact: '6.8× True ROAS · 74% New-to-Brand',
        direction: 'positive',
      },
      {
        factor: 'Meta Reels: Founder Explainer UGC Hook #3',
        impact: '4.9× True ROAS · Lowest New CAC (₹1,180)',
        direction: 'positive',
      },
      {
        factor: 'Google PMax: All-Products Catch-All Asset Group',
        impact: '2.1× True ROAS · High low-margin SKU share',
        direction: 'neutral',
      },
    ],
    chartTitle: 'Deduplicated Net-Revenue ROAS by Campaign (30-Day Window)',
    chartUnit: 'True ROAS Multiplier',
    chartBars: [
      { label: 'Search: Competitor', value: 96, displayValue: '6.8× ★', highlight: true },
      { label: 'Meta: Founder UGC', value: 72, displayValue: '4.9×' },
      { label: 'Search: Category', value: 64, displayValue: '4.3×' },
      { label: 'Meta: Carousel', value: 52, displayValue: '3.5×' },
      { label: 'LinkedIn: ABM', value: 44, displayValue: '2.9×' },
      { label: 'PMax: Catch-All', value: 32, displayValue: '2.1×' },
    ],
    recommendedAction:
      'Increase daily budget cap on "Search: Competitor" by +30% (impression share is currently capped at 62% due to budget) and exclude low-margin SKUs from PMax.',
    queriedSources: ['Google Ads', 'Meta CAPI', 'Shopify / Stripe', 'CRM Closed-Won'],
  },
  {
    id: 'q-products-growing',
    chipLabel: 'Which products are growing fastest?',
    fullQuestion: 'Which product lines or service tiers are growing fastest in revenue and margin?',
    headlineAnswer:
      'The "Clinical Bundle (60-Day Kit)" grew +64% MoM with a 71% gross margin and 42% 60-day repeat reorder rate.',
    narrativeSummary:
      'Single-bottle trial SKUs bring high first-order volume but break even after paid acquisition cost. Customers who start on the 60-Day Clinical Bundle generate 2.4× higher 90-day LTV and 31% fewer support tickets.',
    keyDrivers: [
      {
        factor: '60-Day Clinical Bundle (Hero SKU)',
        impact: '+64% MoM Revenue · ₹3,450 AOV',
        direction: 'positive',
      },
      {
        factor: 'Refill Subscription Auto-Ship',
        impact: '+39% MoM MRR · 8.2% monthly churn',
        direction: 'positive',
      },
      {
        factor: 'Starter 15ml Trial Pack',
        impact: '-11% MoM Margin contribution (High ad CPA)',
        direction: 'negative',
      },
    ],
    chartTitle: 'Month-over-Month Net Revenue Growth by Product Line',
    chartUnit: 'MoM Growth (%)',
    chartBars: [
      { label: '60-Day Bundle', value: 95, displayValue: '+64% ★', highlight: true },
      { label: 'Auto-Refill Sub', value: 68, displayValue: '+39%' },
      { label: 'AM/PM Duo Kit', value: 54, displayValue: '+28%' },
      { label: 'Core Serum 30ml', value: 38, displayValue: '+16%' },
      { label: 'Trial Pack 15ml', value: 18, displayValue: '+4%' },
    ],
    recommendedAction:
      'Make the 60-Day Clinical Bundle the default pre-selected option on paid landing pages and shift Meta ad creatives to lead with the bundle savings.',
    queriedSources: ['Shopify Orders', 'GA4 E-commerce', 'Klaviyo Cohorts', 'Tally Margin ERP'],
  },
  {
    id: 'q-rep-close-rate',
    chipLabel: 'Which sales rep has the highest close rate?',
    fullQuestion: 'Which sales rep has the highest SQL-to-Close rate and fastest response time?',
    headlineAnswer:
      'Rohan K. leads with a 31.4% SQL-to-Won rate and a 42-second median first response time.',
    narrativeSummary:
      'Across 418 qualified opportunities this quarter, speed-to-first-touch and structured WhatsApp + calendar follow-up strongly predicted win rate. Reps responding under 2 minutes closed at 27.8% vs. 11.2% when response exceeded 30 minutes.',
    keyDrivers: [
      {
        factor: 'Rohan K. (Enterprise & Healthcare Pod)',
        impact: '31.4% Win Rate · ₹38.5L Closed · 42s Resp',
        direction: 'positive',
      },
      {
        factor: 'Meera S. (Mid-Market & SaaS Pod)',
        impact: '26.8% Win Rate · ₹29.2L Closed · 1m 15s Resp',
        direction: 'positive',
      },
      {
        factor: 'Unassigned / Weekend Overflow Queue',
        impact: '9.4% Win Rate · 4h 20m Avg Delay',
        direction: 'negative',
      },
    ],
    chartTitle: 'SQL-to-Closed-Won Rate by Sales Rep / Pod (Current Quarter)',
    chartUnit: 'Win Rate (%)',
    chartBars: [
      { label: 'Rohan K.', value: 94, displayValue: '31.4% ★', highlight: true },
      { label: 'Meera S.', value: 82, displayValue: '26.8%' },
      { label: 'Siddharth M.', value: 73, displayValue: '23.5%' },
      { label: 'Ananya V.', value: 65, displayValue: '20.9%' },
      { label: 'Weekend Queue', value: 30, displayValue: '9.4% ⚠️' },
    ],
    recommendedAction:
      'Enable 24/7 AI WhatsApp instant qualification on the Weekend Overflow Queue so weekend leads book directly onto Rohan and Meera’s Monday calendars.',
    queriedSources: ['HubSpot / Zoho CRM', 'WhatsApp Business Logs', 'Call Tracking'],
  },
];

interface DeliveryChannelTab {
  id: 'email' | 'slack' | 'whatsapp';
  label: string;
  cadenceBadge: string;
  recipientLine: string;
  subjectOrHeader: string;
  timestamp: string;
  wins: string[];
  anomalies: string[];
  recommendations: string[];
  footerNote: string;
}

const DELIVERY_CHANNEL_TABS: DeliveryChannelTab[] = [
  {
    id: 'email',
    label: 'Email Brief',
    cadenceBadge: 'Every Monday · 08:00 AM IST',
    recipientLine: 'To: Founders, CMO, RevOps Lead · From: WebXCode AI Analyst',
    subjectOrHeader: '📊 Weekly Executive Brief: Revenue +18.4% WoW | 1 Checkout Anomaly Resolved',
    timestamp: 'Mon, 08:00 AM · 60-Second Read',
    wins: [
      'Blended Net Revenue reached ₹42.8L (+18.4% WoW), beating weekly forecast by ₹4.1L.',
      'Google Non-Brand Search ROAS rose from 3.9× to 4.8× after negative keyword cleanup.',
      'CRM speed-to-lead averaged 38 seconds across 614 qualified inquiries.',
    ],
    anomalies: [
      'Meta CPC on Lookalike 1% rose +22% since Friday (creative frequency crossed 3.4×).',
      '14 high-score SQL deals (>₹2L) have been stuck in "Proposal Sent" for >6 days.',
    ],
    recommendations: [
      'Rotate 3 fresh AI video hooks into Meta Lookalike ad set today (assets ready in folder).',
      'Trigger automated founder check-in email for the 14 stalled Proposal Sent deals.',
      'Reallocate ₹60k from underperforming Display campaign to Google Competitor Search.',
    ],
    footerNote: 'Includes 1-click links to live Looker Studio board & underlying CRM deal list.',
  },
  {
    id: 'slack',
    label: 'Slack Digest',
    cadenceBadge: 'Daily · 09:00 AM in #exec-growth-pulse',
    recipientLine: '#exec-growth-pulse ·Pinned by @WebXCode-AI-Analyst [APP]',
    subjectOrHeader: '⚡ Daily Growth & Pipeline Pulse — Yesterday’s Snapshot & Priority Actions',
    timestamp: 'Today at 09:00 AM · Interactive Slack Block Kit',
    wins: [
      'Yesterday Revenue: ₹6.85L (112% of daily target) · 94 Qualified SQLs logged.',
      'WhatsApp AI Bot booked 19 discovery calls overnight with zero human intervention.',
    ],
    anomalies: [
      '🚨 Alert (02:15 AM): Google Ads landing page /pricing-enterprise returned 3 slow-LCP warnings (4.1s) on mobile.',
      '⚠️ 4 Enterprise leads assigned to North Pod awaiting first rep call (>45 mins elapsed).',
    ],
    recommendations: [
      '[@Rohan] [@Siddharth] — Click to claim or auto-reassign the 4 pending North Pod SQLs.',
      'Approve 1-click budget bump (+15%) on Campaign #12 (ROAS holding at 6.1× for 5 days).',
    ],
    footerNote: 'Team members can reply in-thread with plain-English follow-up questions.',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Summary',
    cadenceBadge: 'Daily 08:30 AM + Instant Anomaly Alerts',
    recipientLine: 'WhatsApp Business Verified · Founder & CXO Direct Brief',
    subjectOrHeader: '📈 Morning Founder Snapshot (60-Sec Audio + Text Card)',
    timestamp: '08:30 AM · Delivered ✓✓',
    wins: [
      '💰 Yesterday Net Sales: ₹6.85L (+16% vs 7d avg) | Ad Spend: ₹1.32L (5.18× Blended ROAS).',
      '🔥 Pipeline Added: ₹28.4L across 18 Hot Deals (Top source: Google Search + WhatsApp).',
    ],
    anomalies: [
      '⚠️ Note: Refund rate on SKU #104 ticked up to 4.8% (packaging damage mentioned in 6 tickets).',
    ],
    recommendations: [
      'Reply "1" to see the 18 Hot Deals list, "2" for Channel ROAS breakdown, or ask any metric question by voice note.',
    ],
    footerNote: 'Designed for busy founders who want numbers on their phone before the first meeting.',
  },
];

/* ==========================================================================
   COMPONENT
========================================================================== */

const AiAnalyticsReporting: React.FC<AiAnalyticsReportingProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  // Pull canonical item from aiSolutions array in AISolutions.tsx
  const solutionData = useMemo(
    () =>
      aiSolutions.find((s) => s.slug === 'ai-analytics-reporting') || {
        slug: 'ai-analytics-reporting',
        name: 'AI Analytics & Reporting',
        category: 'AI Automation',
        badge: null,
        icon: 'BarChart3',
        tagline: 'Automated cross-channel dashboards with plain-English AI insights',
        description:
          'Replace Monday-morning spreadsheet crunching with automated executive intelligence. We unify your GA4, Google Ads, Meta Ads, Shopify/Stripe revenue, and CRM pipeline into live dashboards—paired with scheduled AI narrative summaries that flag anomalies, explain ROAS shifts, and recommend next actions.',
        typicalTimeline: '2–3 weeks from data connector setup to live automated briefs',
      },
    []
  );

  // Also pull related Analytics & Tracking Setup service metadata from Services.tsx
  const analyticsSetupService = useMemo(
    () => services.find((s) => s.slug === 'analytics-tracking-setup'),
    []
  );

  const triggerQuoteModal = (customContext?: string) => {
    const label = customContext ? `${solutionData.name} — ${customContext}` : solutionData.name;
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  /* ------------------------------------------------------------------------
     SECTION 1 STATE: Hero Executive Brief (Interactive Takeaway Highlight)
  ------------------------------------------------------------------------ */
  const [activeTakeawayIdx, setActiveTakeawayIdx] = useState<number>(0);
  const activeHeroTakeaway = HERO_BRIEF_TAKEAWAYS[activeTakeawayIdx];

  /* ------------------------------------------------------------------------
     SECTION 2 STATE: Spreadsheet Graveyard vs. AI Brief Toggle
  ------------------------------------------------------------------------ */
  const [comparisonView, setComparisonView] = useState<'both' | 'graveyard' | 'brief'>('both');

  /* ------------------------------------------------------------------------
     SECTION 3 STATE: Interactive "Ask Your Data" Demo
  ------------------------------------------------------------------------ */
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number>(0);
  const activeDataQuestion = ASK_YOUR_DATA_QUESTIONS[selectedQuestionIdx];

  /* ------------------------------------------------------------------------
     SECTION 4 STATE: Scheduled Briefs & Anomaly Alerts Channel Switcher
  ------------------------------------------------------------------------ */
  const [activeChannelId, setActiveChannelId] = useState<'email' | 'slack' | 'whatsapp'>('email');
  const activeChannelTab =
    DELIVERY_CHANNEL_TABS.find((t) => t.id === activeChannelId) || DELIVERY_CHANNEL_TABS[0];

  /* ------------------------------------------------------------------------
     SEO & JSON-LD
  ------------------------------------------------------------------------ */
  useEffect(() => {
    document.title =
      'AI Analytics & Reporting Services | Automated Dashboards, Plain-English Briefs & Anomaly Alerts — WebXCode';
  }, []);

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'AI Analytics & Reporting Services',
      description: solutionData.description,
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      areaServed: 'Worldwide',
      serviceType:
        'Automated Cross-Channel Marketing & Revenue Dashboards, AI Executive Briefings & Anomaly Detection',
    }),
    [solutionData.description]
  );

  return (
    <main className="flex-1 bg-white text-navy overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: THE MONDAY MORNING AI BRIEF (bg: #0f1c2e)
      ====================================================================== */}
      <section className="relative bg-[#0f1c2e] text-white pt-10 pb-20 lg:pt-14 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-[560px] h-[560px] blue-glow-strong pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/70 mb-8"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
            <Link to="/ai-solutions" className="hover:text-white transition-colors">
              AI Solutions
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
            <span className="text-white font-semibold" aria-current="page">
              {solutionData.name}
            </span>
          </nav>

          {/* 12-Col Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (6 cols): Copy, CTAs, Trust Pills */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-primary-100 mb-5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>AI AUTOMATION · ANALYTICS &amp; INSIGHTS</span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-[-0.02em]">
                Stop Drowning in Dashboards.{' '}
                <span className="text-primary">Get Plain-English Answers.</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-xl">
                Most leadership teams have 10+ tabs of charts and still spend Monday morning asking{' '}
                <em className="not-italic font-semibold text-white">“Why did numbers move?”</em> We
                unify your ad platforms, GA4, CRM, and revenue data into one clean source of
                truth—paired with AI that writes your weekly executive brief, flags anomalies early,
                and answers metric questions in plain English.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('Automate My Reporting')}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15px] sm:text-[16px] shadow-soft transition-all cursor-pointer"
                >
                  <span>Automate My Reporting</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#ask-your-data-demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] sm:text-[16px] transition-all"
                >
                  <span>Try “Ask Your Data” ↓</span>
                </a>
              </div>

              {/* 3 Trust Pills */}
              <div className="mt-9 pt-7 border-t border-white/10 flex flex-wrap items-center gap-2.5">
                {[
                  'All Data Sources Unified',
                  'Weekly AI Briefs',
                  'Instant Anomaly Alerts',
                ].map((pill) => (
                  <div
                    key={pill}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/15 text-[12px] font-bold text-white/90"
                  >
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{pill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (6 cols): The Monday Morning AI Brief Card */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] bg-white text-navy border-2 border-white/20 shadow-2xl p-5 sm:p-6">
                {/* Brief Top Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-navy-08">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                      MONDAY 08:00 AM · EXECUTIVE AI BRIEF
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-primary-50 font-mono text-[10.5px] font-extrabold text-navy">
                    Delivered to Email · Slack · WhatsApp
                  </span>
                </div>

                {/* 4 KPI Sparkline Mini-Cards */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {HERO_KPI_ITEMS.map((kpi) => (
                    <div
                      key={kpi.id}
                      className="p-3 rounded-xl bg-[#f5f9ff] border border-primary-100 flex flex-col justify-between"
                    >
                      <div className="text-[11px] font-bold text-navy-60 truncate">{kpi.label}</div>
                      <div className="mt-1 flex items-baseline justify-between gap-1">
                        <span className="font-mono text-[17px] sm:text-[18px] font-extrabold text-navy tabular-nums">
                          {kpi.value}
                        </span>
                      </div>
                      {/* Mini SVG Sparkline + Delta */}
                      <div className="mt-1.5 flex items-center justify-between gap-1">
                        <span className="font-mono text-[10px] font-extrabold text-primary">
                          {kpi.delta}
                        </span>
                        <svg
                          viewBox="0 0 80 28"
                          className="w-12 h-4 shrink-0"
                          aria-hidden="true"
                        >
                          <polyline
                            fill="none"
                            stroke="#1b63e9"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={kpi.sparkPoints}
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Plain-English AI Narrative Takeaways (3 Interactive Callouts) */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10.5px] font-extrabold uppercase tracking-wider text-navy-50">
                      PLAIN-ENGLISH AI NARRATIVE &amp; ROOT-CAUSE TRACE
                    </span>
                    <span className="font-mono text-[10.5px] font-bold text-primary">
                      Click any finding to inspect
                    </span>
                  </div>

                  {/* 3 Takeaway Selector Pills */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {HERO_BRIEF_TAKEAWAYS.map((item, idx) => {
                      const isSelected = idx === activeTakeawayIdx;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveTakeawayIdx(idx)}
                          className={`py-2 px-2.5 rounded-xl font-mono text-[10.5px] font-extrabold transition-all cursor-pointer border text-left truncate ${
                            isSelected
                              ? 'bg-navy text-white border-navy shadow-xs'
                              : 'bg-white text-navy-70 border-navy-08 hover:border-primary'
                          }`}
                        >
                          {item.badge}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Takeaway Detail Box */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeHeroTakeaway.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -5 }}
                      transition={{ duration: 0.18 }}
                      className="p-4 rounded-2xl bg-[#f5f9ff] border border-primary-100"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-md bg-primary text-white font-mono text-[10px] font-extrabold uppercase">
                          {activeHeroTakeaway.badge}
                        </span>
                        <div className="flex flex-wrap items-center gap-1">
                          {activeHeroTakeaway.sourceSystems.map((src) => (
                            <span
                              key={src}
                              className="px-2 py-0.5 rounded bg-white border border-navy-08 font-mono text-[10px] font-bold text-navy-60"
                            >
                              {src}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h2 className="text-[14.5px] sm:text-[15.5px] font-extrabold text-navy leading-snug">
                        {activeHeroTakeaway.headline}
                      </h2>

                      <p className="mt-1.5 text-[12.5px] text-navy-70 leading-relaxed">
                        {activeHeroTakeaway.explanation}
                      </p>

                      {/* Recommended Action Callout */}
                      <div className="mt-3 p-2.5 rounded-xl bg-navy text-white flex items-start gap-2.5">
                        <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div className="text-[12px] leading-snug">
                          <strong className="font-mono text-[10.5px] uppercase tracking-wider text-primary-100 mr-1.5">
                            NEXT ACTION:
                          </strong>
                          <span className="font-semibold text-white">
                            {activeHeroTakeaway.recommendedAction}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Brief Bottom Footer */}
                <div className="mt-4 pt-3 border-t border-navy-08 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-navy-60">
                  <span className="font-mono font-semibold">
                    ✓ Zero manual CSV exports · Auto-reconciled with CRM &amp; bank revenue
                  </span>
                  <a
                    href="#ask-your-data-demo"
                    className="font-mono font-extrabold text-primary hover:text-navy inline-flex items-center gap-1"
                  >
                    <span>Ask a Follow-Up Question</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — THE PROBLEM: THE SPREADSHEET GRAVEYARD VS. THE AI BRIEF (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12">
            <div className="max-w-3xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase tracking-[0.12em] mb-3.5">
                REPORTING PARALYSIS VS. EXECUTIVE CLARITY
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                You Have More Data Than Ever —{' '}
                <span className="text-primary">and Less Clarity</span>
              </h2>
              <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
                Every platform claims credit for the same sale, CSV exports break every Friday, and
                by the time your team finishes building the weekly slide deck, the week is already
                half over.
              </p>
            </div>

            {/* View Switcher for Mobile/Focused Inspection */}
            <div
              className="inline-flex items-center p-1 rounded-full bg-[#f5f9ff] border border-primary-100 self-start"
              role="group"
              aria-label="Comparison view mode"
            >
              {[
                { id: 'both' as const, label: 'Side-by-Side' },
                { id: 'graveyard' as const, label: 'The Old Way' },
                { id: 'brief' as const, label: 'The AI Brief' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setComparisonView(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] font-extrabold transition-all cursor-pointer ${
                    comparisonView === tab.id
                      ? 'bg-navy text-white shadow-xs'
                      : 'text-navy-60 hover:text-navy'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Card Comparison Grid */}
          <div
            className={`grid grid-cols-1 ${
              comparisonView === 'both' ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-3xl mx-auto'
            } gap-8 items-stretch`}
          >
            {/* LEFT CARD: The Spreadsheet Graveyard */}
            {(comparisonView === 'both' || comparisonView === 'graveyard') && (
              <div className="rounded-[24px] bg-white border-2 border-navy-15 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-navy-08">
                    <span className="px-3 py-1 rounded-full bg-navy-08 text-navy font-mono text-[11px] font-extrabold uppercase">
                      BEFORE · THE SPREADSHEET GRAVEYARD
                    </span>
                    <span className="font-mono text-[12px] font-bold text-navy-60">
                      6–10 Hours Lost Every Week
                    </span>
                  </div>

                  <h3 className="mt-5 text-[22px] sm:text-[25px] font-extrabold text-navy leading-snug">
                    12 Open Tabs, Conflicting Numbers &amp; Late Decisions
                  </h3>
                  <p className="mt-2 text-[14px] text-navy-70 leading-relaxed">
                    Analysts and marketers spend Monday morning stitching exports together while
                    leadership waits for answers.
                  </p>

                  {/* Visual "Spreadsheet Graveyard" Mockup */}
                  <div className="mt-5 p-4 rounded-2xl bg-[#f8fafc] border border-navy-10 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-navy-08">
                      {[
                        'Final_Report_v4_REAL.xlsx',
                        'Meta_Export_Mon.csv',
                        'GA4_Unassigned_Traffic',
                        'Zoho_Pipeline_Copy(2).xls',
                      ].map((tabName) => (
                        <span
                          key={tabName}
                          className="px-2.5 py-1 rounded-md bg-white border border-navy-15 font-mono text-[10.5px] font-semibold text-navy-60 flex items-center gap-1"
                        >
                          <FileSpreadsheet className="w-3 h-3 text-navy-40 shrink-0" />
                          <span>{tabName}</span>
                        </span>
                      ))}
                    </div>

                    {/* Conflicting Platform Rows */}
                    <div className="space-y-2 font-mono text-[11.5px]">
                      <div className="p-2.5 rounded-xl bg-white border border-navy-08 flex items-center justify-between gap-2">
                        <span className="text-navy font-semibold">
                          Meta Ads Manager says: <strong>142 purchases</strong>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-navy-08 text-navy-70 text-[10px] font-bold">
                          Over-attributed
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-navy-08 flex items-center justify-between gap-2">
                        <span className="text-navy font-semibold">
                          Google Ads says: <strong>118 purchases</strong>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-navy-08 text-navy-70 text-[10px] font-bold">
                          Overlap w/ Meta
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-navy-08 flex items-center justify-between gap-2">
                        <span className="text-navy font-semibold">
                          Actual Shopify / CRM Orders: <strong>164 total</strong>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-navy text-white text-[10px] font-bold">
                          #REF! VLOOKUP Error
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Pain Points */}
                  <ul className="mt-5 space-y-2.5">
                    {[
                      'Hours wasted downloading CSVs and fixing broken spreadsheet formulas every Monday',
                      'Ad platforms double-counting conversions while true net-new CAC stays hidden',
                      'Tracking breaks or checkout bugs go unnoticed for 4–5 days until weekly review',
                      'Dashboards show 40 charts of "what happened" with zero explanation of "why"',
                    ].map((pain) => (
                      <li
                        key={pain}
                        className="flex items-start gap-2.5 text-[13.5px] text-navy-70 leading-snug"
                      >
                        <AlertTriangle className="w-4 h-4 text-navy-50 shrink-0 mt-0.5" />
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-08 flex items-center justify-between text-[12px] font-mono text-navy-60">
                  <span>STATUS: Reactive &amp; Manual</span>
                  <span>Decision Lag: 5–7 Days</span>
                </div>
              </div>
            )}

            {/* RIGHT CARD: The Automated AI Executive Brief */}
            {(comparisonView === 'both' || comparisonView === 'brief') && (
              <div className="rounded-[24px] bg-[#0f1c2e] text-white border-2 border-primary p-6 sm:p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
                    <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                      AFTER · THE AUTOMATED AI BRIEF
                    </span>
                    <span className="font-mono text-[12px] font-bold text-primary-100">
                      60-Second Executive Readout
                    </span>
                  </div>

                  <h3 className="mt-5 text-[22px] sm:text-[25px] font-extrabold text-white leading-snug">
                    One Reconciled Truth + Plain-English Action Plan
                  </h3>
                  <p className="mt-2 text-[14px] text-white/80 leading-relaxed">
                    Every morning and Monday at 8:00 AM, your team gets reconciled KPIs, root-cause
                    explanations, and prioritized actions.
                  </p>

                  {/* Visual "Clean AI Brief" Mockup */}
                  <div className="mt-5 p-4 rounded-2xl bg-white/[0.06] border border-white/15 space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-[11px]">
                      <span className="text-primary-100 font-extrabold">
                        ✓ UNIFIED WAREHOUSE SYNC (GA4 + ADS + CRM + REVENUE)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary text-white text-[10px] font-bold">
                        Live · 99.9% Match
                      </span>
                    </div>

                    <div className="space-y-2 text-[12.5px]">
                      <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-[10px] uppercase text-primary-100 font-bold block">
                            WHAT MOVED &amp; WHY
                          </span>
                          <span className="text-white font-semibold">
                            True New-Customer CAC dropped 14% WoW driven by Google Competitor Search.
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-primary/30 text-primary-100 font-mono text-[10px] font-bold shrink-0">
                          Verified
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-[10px] uppercase text-primary-100 font-bold block">
                            REAL-TIME ANOMALY GUARD
                          </span>
                          <span className="text-white font-semibold">
                            Flagged mobile form bug within 35 mins of deploy—saving ₹1.8L in ad
                            waste.
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-bold shrink-0">
                          Auto-Alerted
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Benefits */}
                  <ul className="mt-5 space-y-2.5">
                    {[
                      'Zero manual spreadsheet work—connectors pull GA4, Ads, CRM, Shopify & Tally automatically',
                      'Deduplicated revenue attribution so you see true CAC, LTV, and payback by channel',
                      'Plain-English weekly & daily briefs delivered to Email, Slack, and WhatsApp',
                      'Ask follow-up questions in plain English and get instant charts + answers in seconds',
                    ].map((win) => (
                      <li
                        key={win}
                        className="flex items-start gap-2.5 text-[13.5px] text-white/90 leading-snug"
                      >
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{win}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[12px] text-primary-100 font-bold">
                    STATUS: Proactive &amp; Automated (24/7)
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerQuoteModal('Replace Manual Spreadsheet Reporting')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-700 text-white font-mono text-[11.5px] font-extrabold transition-colors cursor-pointer"
                  >
                    <span>See Sample Brief Setup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — INTERACTIVE "ASK YOUR DATA" DEMO (bg: #f5f9ff)
      ====================================================================== */}
      <section
        id="ask-your-data-demo"
        className="py-[72px] lg:py-[112px] bg-[#f5f9ff] border-y border-primary-100 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary font-mono text-[11px] font-extrabold uppercase tracking-[0.12em] mb-3.5">
              PLAIN-ENGLISH DATA QUERY ENGINE
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Ask Your Data a Question in <span className="text-primary">Plain English</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              No SQL queries, pivot tables, or waiting three days for an analyst ticket. Click any
              real business question below to see how our AI queries your unified data layer and
              returns a clear answer, root-cause breakdown, and chart.
            </p>
          </div>

          {/* 4 Question Chips Bar */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
            role="tablist"
            aria-label="Sample plain-English data questions"
          >
            {ASK_YOUR_DATA_QUESTIONS.map((q, idx) => {
              const isSelected = idx === selectedQuestionIdx;
              return (
                <button
                  key={q.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedQuestionIdx(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-md'
                      : 'bg-white text-navy border-navy-08 hover:border-primary hover:bg-primary-50/40'
                  }`}
                >
                  <div>
                    <span
                      className={`font-mono text-[10px] font-extrabold uppercase tracking-wider block mb-1 ${
                        isSelected ? 'text-primary-100' : 'text-primary'
                      }`}
                    >
                      QUESTION 0{idx + 1}
                    </span>
                    <span className="text-[14px] font-extrabold leading-snug block">
                      “{q.chipLabel}”
                    </span>
                  </div>
                  <Search
                    className={`w-4 h-4 shrink-0 mt-1 ${
                      isSelected ? 'text-primary' : 'text-navy-40'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Interactive Query Response Console */}
          <div className="rounded-[24px] bg-white border border-navy-08 shadow-soft p-6 sm:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDataQuestion.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {/* Top Query Bar */}
                <div className="p-4 rounded-2xl bg-[#f5f9ff] border border-primary-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-mono text-[12px] font-extrabold shrink-0">
                      Q
                    </span>
                    <span className="text-[15px] sm:text-[17px] font-extrabold text-navy">
                      “{activeDataQuestion.fullQuestion}”
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                    {activeDataQuestion.queriedSources.map((src) => (
                      <span
                        key={src}
                        className="px-2.5 py-1 rounded-full bg-white border border-navy-08 font-mono text-[10.5px] font-bold text-navy-70"
                      >
                        {src}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 12-Col Answer + Chart Split */}
                <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left 7 Cols: Plain-English Answer + Key Drivers + Recommended Action */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase">
                          AI ANALYST ANSWER · VERIFIED AGAINST WAREHOUSE
                        </span>
                      </div>

                      <h3 className="text-[20px] sm:text-[23px] font-extrabold text-navy leading-snug">
                        {activeDataQuestion.headlineAnswer}
                      </h3>

                      <p className="mt-2.5 text-[14.5px] text-navy-70 leading-relaxed">
                        {activeDataQuestion.narrativeSummary}
                      </p>

                      {/* 3 Root-Cause / Driver Rows */}
                      <div className="mt-5 space-y-2.5">
                        <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50">
                          CONTRIBUTING DRIVERS &amp; ROOT-CAUSE BREAKDOWN
                        </div>
                        {activeDataQuestion.keyDrivers.map((drv) => (
                          <div
                            key={drv.factor}
                            className="p-3.5 rounded-xl bg-[#f5f9ff] border border-primary-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <span className="text-[13.5px] font-bold text-navy">{drv.factor}</span>
                            <span
                              className={`px-2.5 py-1 rounded-lg font-mono text-[11.5px] font-extrabold shrink-0 ${
                                drv.direction === 'positive'
                                  ? 'bg-primary text-white'
                                  : drv.direction === 'negative'
                                  ? 'bg-navy text-white'
                                  : 'bg-white text-navy border border-navy-15'
                              }`}
                            >
                              {drv.impact}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Next Action Box */}
                    <div className="mt-6 p-4 rounded-2xl bg-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-[10.5px] font-extrabold uppercase tracking-wider text-primary-100 block">
                          RECOMMENDED NEXT ACTION
                        </span>
                        <p className="text-[13.5px] font-semibold text-white mt-1 leading-snug">
                          {activeDataQuestion.recommendedAction}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(`Ask Your Data Setup (${activeDataQuestion.chipLabel})`)
                        }
                        className="px-4 py-2.5 rounded-full bg-primary hover:bg-primary-700 text-white font-mono text-[11.5px] font-extrabold shrink-0 transition-colors cursor-pointer"
                      >
                        Connect My Data →
                      </button>
                    </div>
                  </div>

                  {/* Right 5 Cols: Supporting Visual Bar Chart */}
                  <div className="lg:col-span-5">
                    <div className="h-full rounded-2xl bg-[#0f1c2e] text-white p-5 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-white/10">
                          <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                            GENERATED VISUAL PROOF
                          </span>
                          <span className="font-mono text-[11px] text-white/70">
                            Unit: {activeDataQuestion.chartUnit}
                          </span>
                        </div>

                        <h4 className="mt-4 text-[15px] font-extrabold text-white leading-snug">
                          {activeDataQuestion.chartTitle}
                        </h4>

                        {/* Horizontal Bar Chart */}
                        <div className="mt-5 space-y-3">
                          {activeDataQuestion.chartBars.map((bar) => (
                            <div key={bar.label}>
                              <div className="flex items-center justify-between font-mono text-[12px] mb-1">
                                <span
                                  className={
                                    bar.highlight ? 'font-extrabold text-primary-100' : 'text-white/85'
                                  }
                                >
                                  {bar.label}
                                </span>
                                <span className="font-extrabold text-white tabular-nums">
                                  {bar.displayValue}
                                </span>
                              </div>
                              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                                <motion.div
                                  initial={shouldReduceMotion ? false : { width: 0 }}
                                  animate={{ width: `${bar.value}%` }}
                                  transition={{ duration: 0.35 }}
                                  className={`h-full rounded-full ${
                                    bar.highlight ? 'bg-primary' : 'bg-white/45'
                                  }`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/70">
                        <span>Query Latency: 1.4s (Read-Only Guardrailed)</span>
                        <span className="text-primary-100 font-bold">Zero Hallucinated Math</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — SCHEDULED BRIEFS & ANOMALY ALERTS (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase tracking-[0.12em] mb-3.5">
              PROACTIVE EXECUTIVE DELIVERY
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Insights Come to You —{' '}
              <span className="text-primary">Before Small Issues Become Big Losses</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Dashboards only work if someone remembers to check them. We push concise executive
              summaries and real-time anomaly alerts directly to the channels your leadership team
              already checks every morning.
            </p>
          </div>

          {/* 3 Delivery Channel Tabs */}
          <div
            className="inline-flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#f5f9ff] border border-primary-100 mb-8"
            role="tablist"
            aria-label="Brief delivery channels"
          >
            {DELIVERY_CHANNEL_TABS.map((tab) => {
              const isSelected = tab.id === activeChannelId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveChannelId(tab.id)}
                  className={`px-5 py-2.5 rounded-xl font-mono text-[12px] font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-navy text-white shadow-xs'
                      : 'text-navy-70 hover:text-navy hover:bg-white'
                  }`}
                >
                  {tab.id === 'email' && <Mail className="w-4 h-4 text-primary" />}
                  {tab.id === 'slack' && <Layers className="w-4 h-4 text-primary" />}
                  {tab.id === 'whatsapp' && <MessageSquare className="w-4 h-4 text-primary" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Channel Preview Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChannelTab.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="rounded-[24px] bg-[#f5f9ff] border border-primary-100 p-6 sm:p-8 lg:p-10 shadow-soft"
            >
              {/* Message Envelope Header */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-navy-08 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10.5px] font-extrabold uppercase">
                      {activeChannelTab.label}
                    </span>
                    <span className="font-mono text-[11.5px] font-bold text-navy-60">
                      {activeChannelTab.cadenceBadge}
                    </span>
                  </div>
                  <h3 className="mt-2 text-[17px] sm:text-[19px] font-extrabold text-navy">
                    {activeChannelTab.subjectOrHeader}
                  </h3>
                  <div className="mt-1 font-mono text-[11.5px] text-navy-50">
                    {activeChannelTab.recipientLine}
                  </div>
                </div>

                <span className="px-3 py-1.5 rounded-xl bg-[#f5f9ff] border border-primary-100 font-mono text-[11px] font-extrabold text-primary shrink-0 self-start lg:self-center">
                  {activeChannelTab.timestamp}
                </span>
              </div>

              {/* 3 Structured Columns: Wins / Anomalies Flagged / Recommended Actions */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Col 1: Key Wins */}
                <div className="p-5 rounded-2xl bg-white border border-navy-08 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-navy-08">
                      <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                        01 · KEY WINS &amp; MOMENTUM
                      </span>
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <ul className="space-y-3">
                      {activeChannelTab.wins.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[13.5px] text-navy leading-snug font-medium"
                        >
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-navy-08 font-mono text-[10.5px] text-navy-50">
                    Auto-verified against bank &amp; CRM ledger
                  </div>
                </div>

                {/* Col 2: Anomalies Flagged */}
                <div className="p-5 rounded-2xl bg-white border border-navy-08 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-navy-08">
                      <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy">
                        02 · ANOMALIES &amp; RISKS FLAGGED
                      </span>
                      <Bell className="w-4 h-4 text-primary" />
                    </div>
                    <ul className="space-y-3">
                      {activeChannelTab.anomalies.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[13.5px] text-navy leading-snug font-medium"
                        >
                          <AlertTriangle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-navy-08 font-mono text-[10.5px] text-navy-50">
                    24/7 threshold &amp; trend-break monitoring
                  </div>
                </div>

                {/* Col 3: Recommended Next Actions */}
                <div className="p-5 rounded-2xl bg-navy text-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                        03 · RECOMMENDED ACTIONS
                      </span>
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <ul className="space-y-3">
                      {activeChannelTab.recommendations.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[13.5px] text-white/95 leading-snug font-medium"
                        >
                          <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[10.5px] text-primary-100">
                    {activeChannelTab.footerNote}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Cross-Links Bar to Related Services & AI Solutions */}
          <div className="mt-8 p-5 rounded-2xl bg-[#f5f9ff] border border-primary-100 flex flex-wrap items-center justify-between gap-4 text-[13px] text-navy-70">
            <span>
              Need clean GA4, Tag Manager &amp; server-side conversion pixels first? Explore{' '}
              <Link
                to={
                  analyticsSetupService?.futurePagePath || '/services/analytics-tracking-setup'
                }
                className="text-primary font-extrabold underline hover:text-navy"
              >
                {analyticsSetupService?.name || 'Analytics & Tracking Setup'}
              </Link>
              ,{' '}
              <Link
                to="/ai-solutions/crm-lead-automation"
                className="text-primary font-extrabold underline hover:text-navy"
              >
                CRM &amp; Lead Automation
              </Link>
              ,{' '}
              <Link
                to="/ai-solutions/ai-powered-seo"
                className="text-primary font-extrabold underline hover:text-navy"
              >
                AI-Powered SEO
              </Link>{' '}
              or{' '}
              <Link
                to="/services/performance-marketing"
                className="text-primary font-extrabold underline hover:text-navy"
              >
                Performance Marketing
              </Link>
              .
            </span>
            <button
              type="button"
              onClick={() => triggerQuoteModal('Schedule My Weekly AI Brief')}
              className="font-mono text-[12px] font-extrabold text-primary hover:text-navy inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Configure My Executive Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AiAnalyticsReporting;
