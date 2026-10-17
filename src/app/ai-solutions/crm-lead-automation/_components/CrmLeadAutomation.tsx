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
  Flame,
  Zap,
  Snowflake,
  UserCheck,
  Clock,
  ShieldCheck,
  Layers,
  Filter,
  Send,
  RefreshCw,
  Database,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Megaphone,
  AlertTriangle,
  Sliders,
} from 'lucide-react';
import { aiSolutions } from '@/app/ai-solutions/_components/AISolutions';

interface CrmLeadAutomationProps {
  onOpenQuoteModal?: (service?: string) => void;
}

/* ==========================================================================
   DATA ARRAYS — TOP OF FILE
========================================================================== */

interface HeroLeadSample {
  id: string;
  name: string;
  company: string;
  sourceChannel: 'Website Form' | 'WhatsApp' | 'Meta Ads' | 'Google Ads';
  inquirySummary: string;
  score: number;
  tier: 'HOT' | 'WARM' | 'COLD';
  tierEmoji: string;
  enrichmentFacts: string[];
  assignedRep: string;
  assignedTerritory: string;
  instantFollowUp: string;
}

const HERO_LEAD_SAMPLES: HeroLeadSample[] = [
  {
    id: 'lead-hot',
    name: 'Aarav Mehta',
    company: 'Apex Diagnostics (42 Centers)',
    sourceChannel: 'Meta Ads',
    inquirySummary: 'Looking to automate patient WhatsApp booking + Zoho CRM sync this month.',
    score: 92,
    tier: 'HOT',
    tierEmoji: '🔥',
    enrichmentFacts: [
      '42 Clinic Locations · Healthcare',
      'Decision Maker: VP Operations',
      'Timeline: Immediate (< 30 days)',
    ],
    assignedRep: 'Rohan K. (Enterprise Healthcare Rep)',
    assignedTerritory: 'West & Pan-India Multi-Center',
    instantFollowUp:
      'WhatsApp + Email sent in 14s with calendar link & diagnostic case study; rep alerted on Slack.',
  },
  {
    id: 'lead-warm',
    name: 'Priya Nair',
    company: 'Lumina Studio Interiors',
    sourceChannel: 'Website Form',
    inquirySummary: 'Comparing CRM setup options for 8 designers handling 120 monthly inquiries.',
    score: 68,
    tier: 'WARM',
    tierEmoji: '⚡',
    enrichmentFacts: [
      '15–30 Employees · Interior Design',
      'Budget: Exploring Q2 rollout',
      'High Website Intent (Viewed Pricing 3×)',
    ],
    assignedRep: 'Meera S. (Mid-Market Consultant)',
    assignedTerritory: 'South India & Design Vertical',
    instantFollowUp:
      'Personalized WhatsApp portfolio + 3-day educational email nurture sequence triggered.',
  },
  {
    id: 'lead-cold',
    name: 'Vikram Singh',
    company: 'Freelance Student Project',
    sourceChannel: 'Google Ads',
    inquirySummary: 'Downloading general CRM checklist PDF for college research assignment.',
    score: 24,
    tier: 'COLD',
    tierEmoji: '❄️',
    enrichmentFacts: [
      'Personal Gmail · Non-commercial',
      'No company domain or team size',
      'Zero buying intent signals',
    ],
    assignedRep: 'Auto-Nurture Pool (No Rep Interrupted)',
    assignedTerritory: 'Self-Serve Newsletter Track',
    instantFollowUp:
      'Resource PDF emailed automatically; sales reps protected from low-fit call time.',
  },
];

interface DecayTimePoint {
  id: string;
  timeLabel: string;
  minutesText: string;
  likelihoodPct: number;
  zoneLabel: string;
  whatHappens: string;
  statusTag: string;
}

const DECAY_TIME_POINTS: DecayTimePoint[] = [
  {
    id: 't-1m',
    timeLabel: '1 min',
    minutesText: '60 Seconds (AI Speed-to-Lead Zone)',
    likelihoodPct: 95,
    zoneLabel: 'PEAK BUYER INTENT · PHONE IN HAND',
    whatHappens:
      'The prospect is still looking at your screen. Our AI enriches the lead, logs it in your CRM, alerts the assigned rep, and sends a personalized WhatsApp + email reply with a booking link.',
    statusTag: 'WebXCode AI Target (< 60s)',
  },
  {
    id: 't-5m',
    timeLabel: '5 min',
    minutesText: '5 Minutes After Submission',
    likelihoodPct: 78,
    zoneLabel: 'HIGH INTENT · STILL COMPARING TABS',
    whatHappens:
      'Still a strong window if a human rep calls right now—but without automated Slack/WhatsApp rep alerts and instant lead scoring, most teams haven’t even seen the form notification yet.',
    statusTag: 'Fast Human Benchmark',
  },
  {
    id: 't-30m',
    timeLabel: '30 min',
    minutesText: '30 Minutes After Submission',
    likelihoodPct: 42,
    zoneLabel: 'COOLING FAST · BACK IN MEETINGS',
    whatHappens:
      'The buyer has closed your tab, stepped into another meeting, or submitted forms on two competitor websites that replied faster.',
    statusTag: ' Sharp Drop-Off',
  },
  {
    id: 't-2h',
    timeLabel: '2 hrs',
    minutesText: '2 Hours After Submission',
    likelihoodPct: 22,
    zoneLabel: 'LUKEWARM · COMPETITOR ALREADY SPOKE',
    whatHappens:
      'When your rep finally exports the CSV or checks the shared inbox, the prospect barely remembers which company yours was.',
    statusTag: 'High Ghosting Risk',
  },
  {
    id: 't-24h',
    timeLabel: '24 hrs',
    minutesText: '24 Hours Later (Typical Manual Follow-Up)',
    likelihoodPct: 11,
    zoneLabel: 'COLD LEAD · PAID AD BUDGET WASTED',
    whatHappens:
      'Calls go to voicemail and WhatsApp messages get ignored. You paid full CPC for the click, but slow speed-to-lead killed the deal.',
    statusTag: 'Average Manual Team',
  },
  {
    id: 't-72h',
    timeLabel: '72 hrs',
    minutesText: '72 Hours Later (Weekend / Unassigned Backlog)',
    likelihoodPct: 4,
    zoneLabel: 'DEAD IN THE WATER',
    whatHappens:
      'Weekend and after-hours leads sit untouched until Monday afternoon. Almost 96% of conversion potential has evaporated.',
    statusTag: 'Unautomated Leak',
  },
];

interface PipelineStageCard {
  stageNumber: string;
  stageCode: string;
  title: string;
  subtitle: string;
  whatHappens: string;
  sampleDataIn: string;
  sampleDataOut: string;
  badgeText: string;
}

const PIPELINE_STAGES: PipelineStageCard[] = [
  {
    stageNumber: '01',
    stageCode: 'STAGE 01 · CAPTURE',
    title: 'Capture Every Lead Source',
    subtitle: 'Web forms, WhatsApp, Meta Lead Ads, Google Ads, phone calls & emails',
    whatHappens:
      'Every inquiry—whether from your website form, Meta Instant Forms, Google Ads lead extensions, incoming WhatsApp messages, or voice calls—is captured via real-time webhooks with UTM parameters intact.',
    sampleDataIn:
      'Meta Lead Ad: "Dr. Kabir Verma · +91 98201 XXXXX · Looking for 5-chair dental CRM + WhatsApp bot"',
    sampleDataOut:
      'Webhook payload normalized in 0.4s · Source: Meta_Lead_Ad_Campaign_Q2 · Consent: Verified',
    badgeText: '0% Lead Leakage',
  },
  {
    stageNumber: '02',
    stageCode: 'STAGE 02 · CLEAN & DEDUPLICATE',
    title: 'Clean, Format & Deduplicate',
    subtitle: 'Standardize phones/names & merge repeat inquiries into existing records',
    whatHappens:
      'Before touching your CRM, we format phone numbers to E.164 (+91), fix capitalization, filter out obvious spam/bot submissions, and check if the email or phone already exists so reps never call the same person twice.',
    sampleDataIn:
      'Raw input: "kabir verma", phone "098201-xxxxx", duplicate inquiry from website 2 days ago',
    sampleDataOut:
      'Merged with Contact #CRM-4821 · Phone standardized · Activity timeline updated without duplicate deal',
    badgeText: 'Clean CRM Hygiene',
  },
  {
    stageNumber: '03',
    stageCode: 'STAGE 03 · AI ENRICH & SCORE',
    title: 'AI Enrichment & Fit Scoring (1–100)',
    subtitle: 'Evaluate budget, company profile, urgency & service match automatically',
    whatHappens:
      'An AI scoring node reads the free-text message, enriches company details, checks your ideal customer criteria (budget, location, team size, urgency), and stamps a 1–100 score plus a plain-English summary note for the rep.',
    sampleDataIn:
      'Message: "Need 5-chair clinic setup in Mumbai within 3 weeks" + Domain: vermadental.in',
    sampleDataOut:
      'Score: 89/100 (🔥 HOT) · ICP Match: Multi-chair Healthcare · Summary note pinned to CRM deal card',
    badgeText: '1–100 AI Fit Score',
  },
  {
    stageNumber: '04',
    stageCode: 'STAGE 04 · ASSIGN & ROUTE',
    title: 'Smart Territory & Round-Robin Routing',
    subtitle: 'Assign to the right rep by city, product line, deal size or availability',
    whatHappens:
      'Hot leads route directly to your senior closers by territory, language, or product specialty, with automatic fallback if a rep is on leave. The assigned rep gets an instant Slack/WhatsApp alert with one-tap call & WhatsApp buttons.',
    sampleDataIn:
      'Score: 89/100 · City: Mumbai (West Zone) · Product: Healthcare AI + CRM Suite',
    sampleDataOut:
      'Assigned to: Siddharth M. (West Healthcare Lead) · Slack + WhatsApp rep alert delivered in 3s',
    badgeText: 'Instant Rep Alert',
  },
  {
    stageNumber: '05',
    stageCode: 'STAGE 05 · FOLLOW UP & NURTURE',
    title: '60-Second Multi-Channel Follow-Up & Stale Deal Nudges',
    subtitle: 'Instant WhatsApp + Email reply, meeting booking & automated follow-up reminders',
    whatHappens:
      'Within 60 seconds, the lead receives a personalized WhatsApp template and email with a calendar link. If a deal sits untouched or a prospect goes quiet after 48 hours, automated gentle nudges and rep tasks keep the pipeline moving.',
    sampleDataIn:
      'Trigger: New Hot Lead Assigned → Wait 0s for first reply · Monitor deal stage activity for 48h',
    sampleDataOut:
      'WhatsApp + Email sent in 18s · Discovery call booked for Thu 11:00 AM · Meta CAPI conversion synced',
    badgeText: '< 60s First Touch',
  },
];

interface ScoringPreset {
  id: string;
  label: string;
  budget: 'low' | 'mid' | 'high';
  companySize: 'solo' | 'smb' | 'midmarket' | 'enterprise';
  urgency: 'researching' | 'quarter' | 'month' | 'immediate';
  source: 'cold-list' | 'meta-ad' | 'google-search' | 'website-demo' | 'referral';
}

const SCORING_PRESETS: ScoringPreset[] = [
  {
    id: 'enterprise-inbound',
    label: 'Preset 1: Enterprise Demo Request',
    budget: 'high',
    companySize: 'enterprise',
    urgency: 'immediate',
    source: 'website-demo',
  },
  {
    id: 'smb-meta-lead',
    label: 'Preset 2: SMB Meta Lead Ad',
    budget: 'mid',
    companySize: 'smb',
    urgency: 'month',
    source: 'meta-ad',
  },
  {
    id: 'student-ebook',
    label: 'Preset 3: Early-Stage Ebook Download',
    budget: 'low',
    companySize: 'solo',
    urgency: 'researching',
    source: 'cold-list',
  },
];

/* ==========================================================================
   COMPONENT
========================================================================== */

const CrmLeadAutomation: React.FC<CrmLeadAutomationProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  // Pull canonical item from aiSolutions array in AISolutions.tsx
  const solutionData = useMemo(
    () =>
      aiSolutions.find((s: any) => s.slug === 'crm-lead-automation') || {
        slug: 'crm-lead-automation',
        name: 'CRM & Lead Automation',
        category: 'AI Automation',
        badge: null,
        icon: 'Database',
        tagline: 'Instant lead capture, AI scoring, enrichment & multi-channel follow-up',
        description:
          'Most businesses lose 40–60% of paid and organic leads because follow-up takes hours instead of seconds. We wire your website forms, WhatsApp, and ad platforms directly into HubSpot, Zoho, Salesforce, or LeadSquared—enriching leads with AI, scoring fit, assigning reps, and triggering instant WhatsApp + email follow-up.',
        typicalTimeline: '2–3 weeks end-to-end CRM & lead pipeline setup',
      },
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
     SECTION 1 STATE: Hero Pinball / Sorting Machine
  ------------------------------------------------------------------------ */
  const [activeHeroLeadIndex, setActiveHeroLeadIndex] = useState<number>(0);
  const [heroSimPhase, setHeroSimPhase] = useState<'intake' | 'scoring' | 'routed'>('routed');

  const activeHeroLead = HERO_LEAD_SAMPLES[activeHeroLeadIndex];

  const handleDropNewLead = () => {
    const nextIdx = (activeHeroLeadIndex + 1) % HERO_LEAD_SAMPLES.length;
    setActiveHeroLeadIndex(nextIdx);
    if (shouldReduceMotion) {
      setHeroSimPhase('routed');
      return;
    }
    setHeroSimPhase('intake');
  };

  useEffect(() => {
    if (shouldReduceMotion || heroSimPhase === 'routed') return;
    const timer = setTimeout(() => {
      if (heroSimPhase === 'intake') {
        setHeroSimPhase('scoring');
      } else if (heroSimPhase === 'scoring') {
        setHeroSimPhase('routed');
      }
    }, 520);
    return () => clearTimeout(timer);
  }, [heroSimPhase, shouldReduceMotion]);

  /* ------------------------------------------------------------------------
     SECTION 2 STATE: Lead Decay Curve (1 min -> 72 hrs)
  ------------------------------------------------------------------------ */
  const [selectedDecayIndex, setSelectedDecayIndex] = useState<number>(0);
  const activeDecayPoint = DECAY_TIME_POINTS[selectedDecayIndex];

  /* ------------------------------------------------------------------------
     SECTION 3 STATE: 5-Stage Pipeline Stepper
  ------------------------------------------------------------------------ */
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const activePipelineStage = PIPELINE_STAGES[activeStageIdx];

  /* ------------------------------------------------------------------------
     SECTION 4 STATE: Interactive Lead Scoring Simulator
  ------------------------------------------------------------------------ */
  const [scoreBudget, setScoreBudget] = useState<'low' | 'mid' | 'high'>('high');
  const [scoreCompanySize, setScoreCompanySize] = useState<
    'solo' | 'smb' | 'midmarket' | 'enterprise'
  >('midmarket');
  const [scoreUrgency, setScoreUrgency] = useState<
    'researching' | 'quarter' | 'month' | 'immediate'
  >('immediate');
  const [scoreSource, setScoreSource] = useState<
    'cold-list' | 'meta-ad' | 'google-search' | 'website-demo' | 'referral'
  >('website-demo');

  const applyScoringPreset = (preset: ScoringPreset) => {
    setScoreBudget(preset.budget);
    setScoreCompanySize(preset.companySize);
    setScoreUrgency(preset.urgency);
    setScoreSource(preset.source);
  };

  const calculatedLeadAssessment = useMemo(() => {
    const budgetPts = scoreBudget === 'high' ? 30 : scoreBudget === 'mid' ? 20 : 6;
    const sizePts =
      scoreCompanySize === 'enterprise'
        ? 25
        : scoreCompanySize === 'midmarket'
        ? 20
        : scoreCompanySize === 'smb'
        ? 14
        : 5;
    const urgencyPts =
      scoreUrgency === 'immediate'
        ? 25
        : scoreUrgency === 'month'
        ? 18
        : scoreUrgency === 'quarter'
        ? 10
        : 4;
    const sourcePts =
      scoreSource === 'website-demo'
        ? 20
        : scoreSource === 'referral'
        ? 19
        : scoreSource === 'google-search'
        ? 16
        : scoreSource === 'meta-ad'
        ? 13
        : 5;

    const totalScore = Math.min(100, Math.max(8, budgetPts + sizePts + urgencyPts + sourcePts));

    if (totalScore >= 75) {
      return {
        score: totalScore,
        tier: 'HOT LEAD' as const,
        emoji: '🔥',
        badgeBg: 'bg-primary text-white',
        assignedAction: 'Senior Account Executive + Instant Slack & Phone Alert',
        followUpSpeed: 'Under 30 seconds (WhatsApp booking link + personal email)',
        crmStage: 'SQL — Fast-Track Discovery Call',
        breakdown: { budgetPts, sizePts, urgencyPts, sourcePts },
      };
    }
    if (totalScore >= 45) {
      return {
        score: totalScore,
        tier: 'WARM LEAD' as const,
        emoji: '⚡',
        badgeBg: 'bg-navy text-white',
        assignedAction: 'Round-Robin Inside Sales Rep + Automated Qualification Flow',
        followUpSpeed: 'Under 60 seconds (WhatsApp Q&A + 5-day case study sequence)',
        crmStage: 'MQL — Active Qualification',
        breakdown: { budgetPts, sizePts, urgencyPts, sourcePts },
      };
    }
    return {
      score: totalScore,
      tier: 'COLD / NURTURE' as const,
      emoji: '❄️',
      badgeBg: 'bg-primary-50 text-navy border border-primary-100',
      assignedAction: 'Automated Educational Drip (Sales Reps Not Interrupted)',
      followUpSpeed: 'Instant resource email + monthly value newsletter',
      crmStage: 'Nurture Pool — Monitor Re-Engagement',
      breakdown: { budgetPts, sizePts, urgencyPts, sourcePts },
    };
  }, [scoreBudget, scoreCompanySize, scoreUrgency, scoreSource]);

  /* ------------------------------------------------------------------------
     SEO & JSON-LD
  ------------------------------------------------------------------------ */
  useEffect(() => {
    document.title =
      'CRM & Lead Automation Services | Speed-to-Lead, AI Scoring & CRM Sync — WebXCode';
  }, []);

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'CRM & Lead Automation Services',
      Description: solutionData.description,
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      areaServed: 'Worldwide',
      serviceType: 'CRM Integration, AI Lead Scoring & Automated Sales Follow-Up',
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
         SECTION 1 — HERO: THE LEAD PINBALL / SORTING MACHINE (bg: #0f1c2e)
      ====================================================================== */}
      <section className="relative bg-[#0f1c2e] text-white pt-10 pb-20 lg:pt-14 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-[540px] h-[540px] blue-glow-strong pointer-events-none" />

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

          {/* 12-Col Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (6 cols): Copy, CTAs, Trust Pills */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-primary-100 mb-5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>AI AUTOMATION · CRM &amp; SPEED-TO-LEAD</span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-[-0.02em]">
                Every Lead Captured, Scored &amp; Followed Up —{' '}
                <span className="text-primary">In Seconds</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-xl">
                Stop losing high-intent inquiries to slow callbacks, messy spreadsheets, and
                unassigned inboxes. We connect your website forms, Meta &amp; Google Ads, and
                WhatsApp directly to your CRM—using AI to enrich, score, assign reps, and trigger
                personalized follow-up in under 60 seconds.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('Audit My Lead Pipeline')}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15px] sm:text-[16px] shadow-soft transition-all cursor-pointer"
                >
                  <span>Audit My Lead Pipeline</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#lead-pipeline-walkthrough"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] sm:text-[16px] transition-all"
                >
                  <span>See How a Lead Flows ↓</span>
                </a>
              </div>

              {/* 3 Trust Pills */}
              <div className="mt-9 pt-7 border-t border-white/10 flex flex-wrap items-center gap-2.5">
                {[
                  'All Lead Sources Connected',
                  '<60s First Response',
                  'Works With Your CRM',
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

            {/* Right Column (6 cols): Interactive Lead Pinball / Sorting Machine */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] bg-white text-navy border-2 border-white/20 shadow-2xl p-5 sm:p-6">
                {/* Machine Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-navy-08">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                      <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                        LIVE LEAD SORTING MACHINE
                      </span>
                    </div>
                    <p className="text-[12px] text-navy-60 mt-0.5">
                      Watch how incoming inquiries get enriched, scored &amp; routed to the right lane
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDropNewLead}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-700 text-white font-mono text-[12px] font-extrabold shadow-xs transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Drop a New Lead</span>
                  </button>
                </div>

                {/* Top Hopper: 4 Incoming Channels */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider text-navy-50 mb-2">
                    <span>01. INTAKE FUNNEL (4 CHANNELS)</span>
                    <span className="text-primary">
                      Active Source: {activeHeroLead.sourceChannel}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Website Form', 'WhatsApp', 'Meta Ads', 'Google Ads'] as const).map(
                      (channel) => {
                        const isCurrentSource = activeHeroLead.sourceChannel === channel;
                        return (
                          <div
                            key={channel}
                            className={`px-2.5 py-2 rounded-xl border text-center font-mono text-[11px] font-bold transition-all ${
                              isCurrentSource
                                ? 'bg-navy text-white border-navy shadow-xs'
                                : 'bg-primary-50/50 text-navy-60 border-navy-08'
                            }`}
                          >
                            {channel}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Middle Chamber: AI Enrichment & Scoring Gate */}
                <div className="mt-4 p-4 rounded-2xl bg-[#f5f9ff] border border-primary-100 relative">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                      02. AI ENRICHMENT &amp; SCORING CHAMBER
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-navy text-white font-mono text-[11px] font-extrabold">
                      {heroSimPhase === 'intake'
                        ? 'Reading payload…'
                        : heroSimPhase === 'scoring'
                        ? 'Calculating ICP fit…'
                        : `AI Score: ${activeHeroLead.score}/100`}
                    </span>
                  </div>

                  {/* Active Lead Card Inside Chamber */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeHeroLead.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="p-3.5 rounded-xl bg-white border border-navy-08 shadow-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-[15px] font-extrabold text-navy">
                            {activeHeroLead.name}
                          </span>
                          <span className="text-[13px] font-semibold text-navy-60 ml-2">
                            · {activeHeroLead.company}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-md bg-primary-50 font-mono text-[11px] font-extrabold text-primary">
                          {activeHeroLead.tierEmoji} {activeHeroLead.tier} ({activeHeroLead.score}
                          /100)
                        </span>
                      </div>

                      <p className="text-[12.5px] text-navy-70 mt-1.5 leading-snug">
                        “{activeHeroLead.inquirySummary}”
                      </p>

                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {activeHeroLead.enrichmentFacts.map((fact) => (
                          <span
                            key={fact}
                            className="px-2 py-0.5 rounded bg-primary-50/70 border border-primary-100 font-mono text-[10.5px] font-semibold text-navy"
                          >
                            ✓ {fact}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Sorting Lanes: Hot / Warm / Cold */}
                <div className="mt-4">
                  <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50 mb-2">
                    03. SORTED DESTINATION LANES (INSTANT ROUTING)
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      {
                        tier: 'HOT' as const,
                        label: '🔥 Hot Lane (75–100)',
                        sub: 'Senior Rep + <30s Call/WA',
                      },
                      {
                        tier: 'WARM' as const,
                        label: '⚡ Warm Lane (45–74)',
                        sub: 'Inside Sales + Case Study',
                      },
                      {
                        tier: 'COLD' as const,
                        label: '❄️ Cold Lane (<45)',
                        sub: 'Auto-Nurture Drip Pool',
                      },
                    ].map((lane) => {
                      const isTargetLane = activeHeroLead.tier === lane.tier;
                      return (
                        <div
                          key={lane.tier}
                          className={`p-3 rounded-xl border transition-all ${
                            isTargetLane
                              ? 'bg-primary text-white border-primary shadow-md ring-2 ring-primary/25'
                              : 'bg-white text-navy-60 border-navy-08 opacity-65'
                          }`}
                        >
                          <div className="font-mono text-[11px] font-extrabold leading-tight">
                            {lane.label}
                          </div>
                          <div
                            className={`text-[11px] mt-1 leading-tight ${
                              isTargetLane ? 'text-white/90 font-semibold' : 'text-navy-50'
                            }`}
                          >
                            {lane.sub}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Assigned Rep & Instant Action Footer */}
                <div className="mt-4 p-3.5 rounded-xl bg-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                      ASSIGNED OWNER: {activeHeroLead.assignedRep}
                    </div>
                    <div className="text-[12px] text-white/90 mt-0.5 leading-snug">
                      {activeHeroLead.instantFollowUp}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {HERO_LEAD_SAMPLES.map((sample, idx) => (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => {
                          setActiveHeroLeadIndex(idx);
                          setHeroSimPhase('routed');
                        }}
                        aria-label={`Inspect sample lead ${idx + 1}: ${sample.tier}`}
                        className={`px-2.5 py-1 rounded font-mono text-[10px] font-extrabold cursor-pointer transition-colors ${
                          idx === activeHeroLeadIndex
                            ? 'bg-primary text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {sample.tier}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — THE PROBLEM: THE LEAD DECAY CURVE (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase tracking-[0.12em] mb-3.5">
              SPEED-TO-LEAD ECONOMICS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              A Lead Goes Cold in <span className="text-primary">Minutes, Not Days</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              When a prospect fills out a form or clicks your Meta Lead Ad, their buying intent is
              at 100% right now. Drag or click along the response timeline below to see how waiting
              even a few hours destroys your conversion rate.
            </p>
          </div>

          {/* Interactive Decay Curve Card */}
          <div className="rounded-[24px] bg-[#f5f9ff] border border-primary-100 p-6 sm:p-8 lg:p-10 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 7 Cols: SVG Decay Curve + Time Point Selector */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-white border border-navy-08 p-5 sm:p-6 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60">
                      RELATIVE CONVERSION LIKELIHOOD OVER TIME (ILLUSTRATIVE)
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-primary-50 font-mono text-[11px] font-extrabold text-primary">
                      Selected: {activeDecayPoint.timeLabel} ({activeDecayPoint.likelihoodPct}%
                      intent)
                    </span>
                  </div>

                  {/* Stylized SVG Decay Curve */}
                  <div className="w-full overflow-hidden">
                    <svg
                      viewBox="0 0 600 220"
                      className="w-full h-auto"
                      role="img"
                      aria-label="Lead response time decay curve from 1 minute to 72 hours"
                    >
                      <defs>
                        <linearGradient id="decayFillGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1b63e9" stopOpacity="0.28" />
                          <stop offset="100%" stopColor="#1b63e9" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid Lines */}
                      {[30, 80, 130, 180].map((yPos) => (
                        <line
                          key={yPos}
                          x1="40"
                          y1={yPos}
                          x2="570"
                          y2={yPos}
                          stroke="#e2e8f0"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Shaded AI Speed Zone (< 5 mins) */}
                      <rect
                        x="45"
                        y="20"
                        width="115"
                        height="165"
                        rx="8"
                        fill="#1b63e9"
                        fillOpacity="0.08"
                      />
                      <text
                        x="54"
                        y="36"
                        fill="#1b63e9"
                        fontSize="10"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="700"
                      >
                        AI ZONE (&lt;60s)
                      </text>

                      {/* Area under curve */}
                      <path
                        d="M 55 32 C 120 42, 180 95, 255 122 C 340 152, 440 170, 555 178 L 555 185 L 55 185 Z"
                        fill="url(#decayFillGrad)"
                      />

                      {/* Main Curve Line */}
                      <path
                        d="M 55 32 C 120 42, 180 95, 255 122 C 340 152, 440 170, 555 178"
                        fill="none"
                        stroke="#1b63e9"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* 6 Interactive Nodes on Curve */}
                      {[
                        { x: 55, y: 32, label: '1 min' },
                        { x: 155, y: 58, label: '5 min' },
                        { x: 255, y: 122, label: '30 min' },
                        { x: 355, y: 154, label: '2 hrs' },
                        { x: 455, y: 170, label: '24 hrs' },
                        { x: 555, y: 178, label: '72 hrs' },
                      ].map((pt, idx) => {
                        const isSelected = idx === selectedDecayIndex;
                        return (
                          <g
                            key={pt.label}
                            onClick={() => setSelectedDecayIndex(idx)}
                            className="cursor-pointer"
                          >
                            {isSelected && (
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="14"
                                fill="#1b63e9"
                                fillOpacity="0.2"
                              />
                            )}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={isSelected ? '7.5' : '5.5'}
                              fill={isSelected ? '#1b63e9' : '#ffffff'}
                              stroke={isSelected ? '#0f1c2e' : '#1b63e9'}
                              strokeWidth="2.5"
                            />
                            <text
                              x={pt.x}
                              y="206"
                              textAnchor="middle"
                              fill={isSelected ? '#0f1c2e' : '#64748b'}
                              fontSize="11"
                              fontFamily="JetBrains Mono, monospace"
                              fontWeight={isSelected ? '800' : '600'}
                            >
                              {pt.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Interactive Time Point Buttons + Range Scrubber */}
                  <div className="mt-4 pt-4 border-t border-navy-08">
                    <div className="flex items-center justify-between text-[12px] font-semibold text-navy-70 mb-2">
                      <label htmlFor="decay-time-slider" className="font-bold text-navy">
                        Scrub Response Delay:
                      </label>
                      <span className="font-mono text-[11px] text-primary font-bold">
                        Click any time badge or drag slider
                      </span>
                    </div>

                    <input
                      id="decay-time-slider"
                      type="range"
                      min={0}
                      max={DECAY_TIME_POINTS.length - 1}
                      step={1}
                      value={selectedDecayIndex}
                      onChange={(e) => setSelectedDecayIndex(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                      aria-label="Select response time after lead submission"
                    />

                    <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {DECAY_TIME_POINTS.map((tp, idx) => {
                        const active = idx === selectedDecayIndex;
                        return (
                          <button
                            key={tp.id}
                            type="button"
                            onClick={() => setSelectedDecayIndex(idx)}
                            className={`py-2 px-2.5 rounded-xl font-mono text-[12px] font-bold transition-all cursor-pointer border ${
                              active
                                ? 'bg-navy text-white border-navy shadow-xs'
                                : 'bg-primary-50/50 text-navy border-navy-08 hover:border-primary'
                            }`}
                          >
                            {tp.timeLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Active Time Point Inspection Card */}
              <div className="lg:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDecayPoint.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="rounded-[22px] bg-navy text-white p-6 sm:p-7 shadow-xl"
                  >
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                      <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                        {activeDecayPoint.statusTag}
                      </span>
                      <span className="font-mono text-[12px] font-bold text-primary-100">
                        Response Time: {activeDecayPoint.timeLabel}
                      </span>
                    </div>

                    <div className="mt-5 flex items-baseline gap-3">
                      <span className="text-[44px] sm:text-[52px] font-extrabold text-white tabular-nums leading-none">
                        {activeDecayPoint.likelihoodPct}%
                      </span>
                      <span className="text-[13px] font-semibold text-white/75">
                        Relative Qualification Likelihood (Illustrative)
                      </span>
                    </div>

                    <div className="mt-3 font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                      {activeDecayPoint.zoneLabel}
                    </div>

                    <h3 className="mt-2 text-[19px] font-extrabold text-white leading-snug">
                      {activeDecayPoint.minutesText}
                    </h3>

                    <p className="mt-3 text-[14px] text-white/85 leading-relaxed">
                      {activeDecayPoint.whatHappens}
                    </p>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <span className="text-[12px] text-white/70">
                        Want every inquiry answered in under 60 seconds?
                      </span>
                      <button
                        type="button"
                        onClick={() => triggerQuoteModal('60-Second Speed-to-Lead Setup')}
                        className="px-4 py-2 rounded-full bg-primary hover:bg-primary-700 text-white text-[12px] font-extrabold shrink-0 transition-colors cursor-pointer"
                      >
                        Fix My Response Time →
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — THE 5-STAGE LEAD PIPELINE WALKTHROUGH (bg: #f5f9ff)
      ====================================================================== */}
      <section
        id="lead-pipeline-walkthrough"
        className="py-[72px] lg:py-[112px] bg-[#f5f9ff] scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary font-mono text-[11px] font-extrabold uppercase tracking-[0.12em] mb-3.5">
              END-TO-END REVENUE ARCHITECTURE
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              From First Click to <span className="text-primary">Booked Meeting</span> — Automatically
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Click through the 5 stages below to inspect how raw inquiries are captured, cleaned,
              enriched with AI, assigned to the right rep, and followed up across WhatsApp and
              email.
            </p>
          </div>

          {/* 5-Stage Horizontal Stepper Bar */}
          <div
            className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-8"
            role="tablist"
            aria-label="5-stage CRM lead automation pipeline"
          >
            {PIPELINE_STAGES.map((st, idx) => {
              const isSelected = idx === activeStageIdx;
              return (
                <button
                  key={st.stageNumber}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveStageIdx(idx)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-md'
                      : 'bg-white text-navy border-navy-08 hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`font-mono text-[11px] font-extrabold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-primary text-white' : 'bg-primary-50 text-primary'
                      }`}
                    >
                      STAGE {st.stageNumber}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-primary translate-x-0.5' : 'text-navy-40'
                      }`}
                    />
                  </div>
                  <div className="text-[14px] font-extrabold leading-snug">{st.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Expanded Blueprint Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePipelineStage.stageNumber}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-[24px] bg-white border border-navy-08 shadow-soft p-6 sm:p-8 lg:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-navy-08">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-primary text-white font-mono text-[15px] font-extrabold flex items-center justify-center">
                    {activePipelineStage.stageNumber}
                  </span>
                  <div>
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                      {activePipelineStage.stageCode}
                    </div>
                    <h3 className="text-[22px] sm:text-[26px] font-extrabold text-navy leading-snug">
                      {activePipelineStage.title}
                    </h3>
                  </div>
                </div>

                <span className="px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 font-mono text-[12px] font-extrabold text-primary">
                  {activePipelineStage.badgeText}
                </span>
              </div>

              <p className="mt-5 text-[16px] text-navy-80 leading-[1.65] max-w-4xl">
                {activePipelineStage.whatHappens}
              </p>

              {/* Sample Data In -> Sample Data Out */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#f5f9ff] border border-primary-100">
                  <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60 mb-1.5">
                    RAW INPUT / TRIGGER EVENT
                  </div>
                  <p className="font-mono text-[13px] text-navy leading-relaxed">
                    {activePipelineStage.sampleDataIn}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-navy text-white">
                  <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100 mb-1.5">
                    AUTOMATED OUTPUT / CRM RESULT
                  </div>
                  <p className="font-mono text-[13px] text-white/95 leading-relaxed">
                    {activePipelineStage.sampleDataOut}
                  </p>
                </div>
              </div>

              {/* Bottom Stage Navigation */}
              <div className="mt-6 pt-5 border-t border-navy-08 flex flex-wrap items-center justify-between gap-4">
                <div className="text-[13px] font-semibold text-navy-60">
                  Showing Stage {activeStageIdx + 1} of {PIPELINE_STAGES.length}:{' '}
                  <span className="text-navy font-bold">{activePipelineStage.subtitle}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStageIdx((prev) =>
                        prev === 0 ? PIPELINE_STAGES.length - 1 : prev - 1
                      )
                    }
                    className="px-4 py-2 rounded-full border border-navy-15 hover:border-primary text-navy text-[13px] font-bold transition-colors cursor-pointer"
                  >
                    ← Previous Stage
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStageIdx((prev) => (prev + 1) % PIPELINE_STAGES.length)
                    }
                    className="px-5 py-2 rounded-full bg-primary hover:bg-primary-700 text-white text-[13px] font-bold transition-colors cursor-pointer"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — INTERACTIVE LEAD SCORING SIMULATOR (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Presets */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase tracking-[0.12em] mb-3.5">
                INTERACTIVE AI SCORING ENGINE
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                How AI Decides Which Leads Call First:{' '}
                <span className="text-primary">Try the Scorer</span>
              </h2>
              <p className="mt-3 text-[16px] text-navy-70 leading-[1.65]">
                Adjust the 4 lead signals below—or click a quick preset—to see how our AI scoring
                model calculates a 1–100 fit score and triggers the exact right sales action.
              </p>
            </div>

            {/* 3 Quick Presets */}
            <div className="flex flex-wrap items-center gap-2">
              {SCORING_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyScoringPreset(preset)}
                  className="px-3.5 py-2 rounded-full bg-[#f5f9ff] hover:bg-primary hover:text-white border border-primary-100 text-navy font-mono text-[11.5px] font-bold transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 12-Col Simulator Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7 Cols: 4 Interactive Signal Controls */}
            <div className="lg:col-span-7 rounded-[24px] bg-[#f5f9ff] border border-primary-100 p-6 sm:p-8 space-y-6">
              {/* Control 1: Budget Signal */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-extrabold text-navy">
                    1. Estimated Deal Budget / Project Scope
                  </span>
                  <span className="font-mono text-[11px] font-bold text-primary">
                    +{calculatedLeadAssessment.breakdown.budgetPts} pts
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'low' as const, label: 'Exploratory / Low' },
                    { id: 'mid' as const, label: 'Standard Growth Budget' },
                    { id: 'high' as const, label: 'Enterprise / Multi-Unit' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setScoreBudget(opt.id)}
                      className={`py-2.5 px-3 rounded-xl text-[12.5px] font-bold border transition-all cursor-pointer ${
                        scoreBudget === opt.id
                          ? 'bg-navy text-white border-navy shadow-xs'
                          : 'bg-white text-navy border-navy-08 hover:border-primary'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 2: Company Size / Profile */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-extrabold text-navy">
                    2. Company Size / Team Profile
                  </span>
                  <span className="font-mono text-[11px] font-bold text-primary">
                    +{calculatedLeadAssessment.breakdown.sizePts} pts
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'solo' as const, label: 'Solo / Student' },
                    { id: 'smb' as const, label: '10–50 Staff' },
                    { id: 'midmarket' as const, label: '50–250 Staff' },
                    { id: 'enterprise' as const, label: '250+ Enterprise' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setScoreCompanySize(opt.id)}
                      className={`py-2.5 px-3 rounded-xl text-[12.5px] font-bold border transition-all cursor-pointer ${
                        scoreCompanySize === opt.id
                          ? 'bg-navy text-white border-navy shadow-xs'
                          : 'bg-white text-navy border-navy-08 hover:border-primary'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 3: Buying Urgency */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-extrabold text-navy">
                    3. Implementation Timeline / Urgency
                  </span>
                  <span className="font-mono text-[11px] font-bold text-primary">
                    +{calculatedLeadAssessment.breakdown.urgencyPts} pts
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'researching' as const, label: 'Just Browsing' },
                    { id: 'quarter' as const, label: 'Next Quarter' },
                    { id: 'month' as const, label: 'Within 30 Days' },
                    { id: 'immediate' as const, label: 'Immediate Need' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setScoreUrgency(opt.id)}
                      className={`py-2.5 px-3 rounded-xl text-[12.5px] font-bold border transition-all cursor-pointer ${
                        scoreUrgency === opt.id
                          ? 'bg-navy text-white border-navy shadow-xs'
                          : 'bg-white text-navy border-navy-08 hover:border-primary'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 4: Lead Source Channel */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-extrabold text-navy">
                    4. Acquisition Source &amp; Intent Signal
                  </span>
                  <span className="font-mono text-[11px] font-bold text-primary">
                    +{calculatedLeadAssessment.breakdown.sourcePts} pts
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'cold-list' as const, label: 'Ebook / Cold' },
                    { id: 'meta-ad' as const, label: 'Meta Lead Ad' },
                    { id: 'google-search' as const, label: 'Google Search' },
                    { id: 'referral' as const, label: 'Partner Referral' },
                    { id: 'website-demo' as const, label: 'Pricing / Demo' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setScoreSource(opt.id)}
                      className={`py-2.5 px-2.5 rounded-xl text-[12px] font-bold border transition-all cursor-pointer ${
                        scoreSource === opt.id
                          ? 'bg-navy text-white border-navy shadow-xs'
                          : 'bg-white text-navy border-navy-08 hover:border-primary'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Live Score Readout & Automated Routing Decision */}
            <div className="lg:col-span-5">
              <div className="h-full rounded-[24px] bg-navy text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                      LIVE AI SCORING OUTPUT
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full font-mono text-[12px] font-extrabold ${calculatedLeadAssessment.badgeBg}`}
                    >
                      {calculatedLeadAssessment.emoji} {calculatedLeadAssessment.tier}
                    </span>
                  </div>

                  {/* Score Gauge Display */}
                  <div className="mt-5 flex items-baseline justify-between">
                    <div>
                      <div className="text-[48px] sm:text-[56px] font-extrabold text-white tabular-nums leading-none">
                        {calculatedLeadAssessment.score}
                        <span className="text-[22px] text-white/50 font-bold">/100</span>
                      </div>
                      <div className="text-[12px] font-mono text-primary-100 mt-1">
                        Composite ICP &amp; Intent Fit Score
                      </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="w-32 bg-white/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${calculatedLeadAssessment.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Routing & Action Details */}
                  <div className="mt-6 space-y-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/10">
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                        ASSIGNED REP &amp; ROUTING RULE
                      </div>
                      <div className="text-[14px] font-bold text-white mt-0.5">
                        {calculatedLeadAssessment.assignedAction}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/10">
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                        AUTOMATED FIRST TOUCH SPEED
                      </div>
                      <div className="text-[14px] font-bold text-white mt-0.5">
                        {calculatedLeadAssessment.followUpSpeed}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/10">
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                        CRM PIPELINE STAGE CREATED
                      </div>
                      <div className="text-[14px] font-bold text-white mt-0.5">
                        {calculatedLeadAssessment.crmStage}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Scoring Criteria Note */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[12px] text-white/75">
                    We train custom scoring weights around your exact qualification rules.
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerQuoteModal('Custom AI Lead Scoring Setup')}
                    className="px-4 py-2 rounded-full bg-primary hover:bg-primary-700 text-white text-[12px] font-extrabold shrink-0 transition-colors cursor-pointer"
                  >
                    Build My Scorer →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Capabilities Cross-Link Bar */}
          <div className="mt-8 p-5 rounded-2xl bg-[#f5f9ff] border border-primary-100 flex flex-wrap items-center justify-between gap-4 text-[13px] text-navy-70">
            <span>
              Want leads qualified on live chat or WhatsApp before they hit your CRM? Pair with{' '}
              <Link
                href="/ai-solutions/whatsapp-ai-chatbot"
                className="text-primary font-extrabold underline hover:text-navy"
              >
                WhatsApp AI Chatbot
              </Link>
              ,{' '}
              <Link
                href="/ai-solutions/ai-chatbot-development"
                className="text-primary font-extrabold underline hover:text-navy"
              >
                AI Chatbot Development
              </Link>{' '}
              or{' '}
              <Link
                href="/ai-solutions/ai-agents-for-business"
                className="text-primary font-extrabold underline hover:text-navy"
              >
                AI Agents for Business
              </Link>{' '}
              or{' '}
              <Link
                href="/ai-solutions/ai-analytics-reporting"
                className="text-primary font-extrabold underline hover:text-navy"
              >
                AI Analytics &amp; Reporting
              </Link>
              .
            </span>
            <Link
              href="/services/email-marketing"
              className="font-mono text-[12px] font-extrabold text-primary hover:text-navy inline-flex items-center gap-1"
            >
              <span>Explore Email Marketing &amp; Automation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CrmLeadAutomation;
