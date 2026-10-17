import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Check,
  Sparkles,
  Bot,
  ShieldCheck,
  Terminal,
  RotateCcw,
  Play,
  Briefcase,
  CheckCircle2,
  UserCheck,
  Compass,
  Sliders,
  Lock,
  Search,
  Layers,
  Cpu,
} from 'lucide-react';
import { aiSolutions } from '../AISolutions';

interface AiAgentsForBusinessProps {
  onOpenQuoteModal?: (service?: string) => void;
}

/* ==========================================================================
   DATA ARRAYS — TOP OF FILE
========================================================================== */

interface AgentBadgeData {
  id: string;
  codeName: string;
  roleTitle: string;
  monoId: string;
  department: string;
  avatarShape: 'hexagon' | 'diamond' | 'octagon' | 'circle-grid';
  statusStates: string[];
  swingDeg: number;
}

const HERO_AGENT_BADGES: AgentBadgeData[] = [
  {
    id: 'nova-s',
    codeName: 'Nova-S',
    roleTitle: 'Sales Researcher',
    monoId: 'ID: AGT-SLS-01',
    department: 'REVENUE & OUTBOUND',
    avatarShape: 'hexagon',
    statusStates: [
      'Researching 20 clinics in Pune…',
      'Drafted 20 emails · awaiting approval',
    ],
    swingDeg: -1.8,
  },
  {
    id: 'nova-c',
    codeName: 'Nova-C',
    roleTitle: 'Support Resolver',
    monoId: 'ID: AGT-SUP-02',
    department: 'CUSTOMER EXPERIENCE',
    avatarShape: 'diamond',
    statusStates: [
      'Checking order #1042…',
      'Replacement arranged ✓',
    ],
    swingDeg: 1.6,
  },
  {
    id: 'nova-o',
    codeName: 'Nova-O',
    roleTitle: 'Ops Coordinator',
    monoId: 'ID: AGT-OPS-03',
    department: 'FINANCE & SUPPLY CHAIN',
    avatarShape: 'octagon',
    statusStates: [
      'Matching 34 invoices to POs…',
      '2 mismatches flagged',
    ],
    swingDeg: -1.4,
  },
  {
    id: 'nova-d',
    codeName: 'Nova-D',
    roleTitle: 'Data Analyst',
    monoId: 'ID: AGT-DAT-04',
    department: 'BI & REPORTING',
    avatarShape: 'circle-grid',
    statusStates: [
      'Building weekly sales summary…',
      'Report sent to leadership ✓',
    ],
    swingDeg: 1.5,
  },
];

interface MazeComparisonData {
  goalTitle: string;
  finishTitle: string;
  wallLabel: string;
  automationStopStatus: string;
  agentCheckpoints: {
    monoCall: string;
    detail: string;
  }[];
}

const MAZE_DATA: MazeComparisonData = {
  goalTitle: "Goal: Resolve customer's damaged-order complaint",
  finishTitle: 'Customer happy ✓',
  wallLabel: 'Unexpected: customer wants replacement, not refund',
  automationStopStatus: 'Sent to manual queue',
  agentCheckpoints: [
    {
      monoCall: 'intent.replan()',
      detail: 'Detects replacement preference instead of rigid refund rule',
    },
    {
      monoCall: 'inventory.check()',
      detail: 'Verifies replacement SKU #402 is in stock at warehouse',
    },
    {
      monoCall: 'Approval: replacement worth ₹2,400 ✓',
      detail: 'Requests & receives 1-click supervisor approval before dispatch',
    },
  ],
};

interface MissionStepItem {
  phase: 'Plan' | 'Act' | 'Check' | 'Ask' | 'Done';
  title: string;
  toolCallMono?: string;
  shortResult: string;
  expandedDetail: string;
  requiresApproval?: boolean;
  approvalPrompt?: string;
}

interface MissionScenario {
  id: string;
  goalChip: string;
  agentAssigned: string;
  steps: MissionStepItem[];
}

const MISSION_SCENARIOS: MissionScenario[] = [
  {
    id: 'mission-clinics',
    goalChip: 'Find 20 dental clinics in Pune without online booking and draft outreach emails',
    agentAssigned: 'Nova-S · Sales Researcher (ID: AGT-SLS-01)',
    steps: [
      {
        phase: 'Plan',
        title: '1. Plan — 4-step prospect discovery & verification plan created',
        shortResult:
          '(1) Search Pune dental listings → (2) Inspect websites for booking widgets → (3) Cross-check CRM → (4) Draft personalized emails.',
        expandedDetail:
          'Agent breaks the high-level goal into 4 verifiable sub-tasks and checks its allowed toolset (search.web, crm.lookup, email.draft) before starting.',
      },
      {
        phase: 'Act',
        title: '2. Act — Tool execution across web directory & CRM',
        toolCallMono: 'search.web() · crm.lookup() · email.draft()',
        shortResult:
          'Scanned 48 clinic websites in Kothrud, Baner & Viman Nagar; identified 20 without online appointment booking.',
        expandedDetail:
          'Executed search.web("dental clinics Pune") → parsed appointment links → verified contact emails → prepared 20 tailored outreach drafts.',
      },
      {
        phase: 'Check',
        title: '3. Check — Self-verification against existing CRM records',
        toolCallMono: 'crm.deduplicate()',
        shortResult: 'Self-check: 2 clinics already customers → removed',
        expandedDetail:
          'Cross-referenced all 20 domains against active deals and current clients in CRM; removed 2 existing accounts to prevent awkward outreach.',
      },
      {
        phase: 'Ask',
        title: '4. Ask — Human supervisor gate triggered before sending',
        toolCallMono: 'policy.require_approval("email.send_batch")',
        shortResult: 'Approval needed: send 18 emails?',
        expandedDetail:
          'Because external email sending is set to "Needs approval", Nova-S pauses and presents the 18 recipient drafts for human review.',
        requiresApproval: true,
        approvalPrompt: 'Approval needed: send 18 emails?',
      },
      {
        phase: 'Done',
        title: '5. Done — 18 personalized outreach drafts queued & logged',
        toolCallMono: 'audit.log_write("MSN-8841")',
        shortResult: '18 outreach emails queued · CRM updated · Full action log saved',
        expandedDetail:
          'All 18 prospects logged in CRM with research notes, timestamped tool calls, and supervisor sign-off recorded in the immutable audit trail.',
      },
    ],
  },
  {
    id: 'mission-orders',
    goalChip: "Resolve all 'where is my order' tickets from today",
    agentAssigned: 'Nova-C · Support Resolver (ID: AGT-SUP-02)',
    steps: [
      {
        phase: 'Plan',
        title: '1. Plan — Triage open WISMO tickets & verify live courier status',
        shortResult:
          '(1) Fetch today’s open order-status tickets → (2) Query courier tracking API → (3) Flag stalled parcels → (4) Draft customer replies.',
        expandedDetail:
          'Agent filters helpdesk queue for shipping inquiries and prepares read-only lookups against order management and logistics APIs.',
      },
      {
        phase: 'Act',
        title: '2. Act — Live order & AWB status check across 14 tickets',
        toolCallMono: 'orders.get_status() · courier.track_awb() · email.draft()',
        shortResult:
          '12 orders out for delivery today; 2 orders delayed at hub > 48 hours.',
        expandedDetail:
          'Retrieved live tracking checkpoints for all 14 order IDs and drafted exact ETA responses with tracking links.',
      },
      {
        phase: 'Check',
        title: '3. Check — Policy check on delayed shipments',
        toolCallMono: 'policy.check_sla("shipping_delay")',
        shortResult: 'Self-check: 2 delayed orders qualify for priority courier escalation',
        expandedDetail:
          'Verified SLA rules: shipments delayed > 48h require a proactive apology note and courier priority ticket rather than a generic tracking link.',
      },
      {
        phase: 'Ask',
        title: '4. Ask — Human review for 2 delayed-order goodwill vouchers',
        toolCallMono: 'approval.request("store.credit_voucher")',
        shortResult: 'Approval needed: send 12 instant tracking updates + 2 goodwill vouchers?',
        expandedDetail:
          'Routine tracking updates are ready to go; the 2 delayed orders include a ₹250 store voucher that requires support lead sign-off.',
        requiresApproval: true,
        approvalPrompt: 'Approval needed: send 12 tracking updates + 2 vouchers?',
      },
      {
        phase: 'Done',
        title: '5. Done — All 14 tickets updated with zero manual copy-paste',
        toolCallMono: 'audit.log_write("MSN-8842")',
        shortResult: '14 tickets resolved · Courier escalations logged · Full action log saved',
        expandedDetail:
          'Customers received accurate ETAs, support queue cleared in 4 minutes, and every API call was recorded.',
      },
    ],
  },
  {
    id: 'mission-sales-summary',
    goalChip: 'Prepare a weekly sales summary with top 5 insights',
    agentAssigned: 'Nova-D · Data Analyst (ID: AGT-DAT-04)',
    steps: [
      {
        phase: 'Plan',
        title: '1. Plan — Pull multi-source revenue data & compare week-over-week',
        shortResult:
          '(1) Read weekly CRM + store sheets → (2) Reconcile refunds → (3) Rank top products & regions → (4) Write 5 executive insights.',
        expandedDetail:
          'Agent outlines a read-only analytical pipeline across Google Sheets, CRM deal stages, and store order exports.',
      },
      {
        phase: 'Act',
        title: '2. Act — Query sheets & compute cohort metrics',
        toolCallMono: 'sheets.read() · crm.lookup() · analytics.summarize()',
        shortResult:
          'Processed 1,420 orders and 190 B2B pipeline deals across 4 regional tabs.',
        expandedDetail:
          'Aggregated net revenue, average order value, and lead-to-close conversion velocity by channel.',
      },
      {
        phase: 'Check',
        title: '3. Check — Sanity-check totals against accounting ledger',
        toolCallMono: 'verify.cross_check_totals()',
        shortResult: 'Self-check: 3 test orders excluded from net revenue calculation',
        expandedDetail:
          'Detected 3 internal QA test transactions (₹1 each) and excluded them so average order value remained accurate.',
      },
      {
        phase: 'Ask',
        title: '4. Ask — Confirm distribution to leadership mailing list',
        toolCallMono: 'approval.request("email.send_leadership")',
        shortResult: 'Approval needed: send weekly summary to 6 leadership recipients?',
        expandedDetail:
          'Presents the 5 bullet insights and chart table for a quick 10-second human glance before emailing leadership.',
        requiresApproval: true,
        approvalPrompt: 'Approval needed: send summary to leadership?',
      },
      {
        phase: 'Done',
        title: '5. Done — Monday briefing delivered with source links',
        toolCallMono: 'audit.log_write("MSN-8843")',
        shortResult: 'Executive brief sent · Source cells linked · Full action log saved',
        expandedDetail:
          'Every number in the summary links directly to the underlying spreadsheet range for complete transparency.',
      },
    ],
  },
];

type JobDepartmentFilter = 'All' | 'Sales' | 'Support' | 'Operations' | 'HR' | 'Analytics';

interface AgentJobPosting {
  id: string;
  roleTitle: string;
  codeName: string;
  department: Exclude<JobDepartmentFilter, 'All'>;
  avatarVariant: 'hexagon' | 'diamond' | 'octagon' | 'circle-grid' | 'shield' | 'prism';
  shortTagline: string;
  responsibilities: string[];
  toolsUsed: string[];
  worksWith: string;
  successMetrics: string[];
}

const JOB_POSTINGS: AgentJobPosting[] = [
  {
    id: 'job-sales',
    roleTitle: 'Sales Research Agent',
    codeName: 'Nova-S',
    department: 'Sales',
    avatarVariant: 'hexagon',
    shortTagline: 'Finds and qualifies prospects, enriches CRM, drafts outreach for approval',
    responsibilities: [
      'Researches target companies, decision-makers & public buying signals',
      'Enriches CRM lead records with verified industry, size & tech stack notes',
      'Drafts tailored first-touch emails & WhatsApp intros for rep approval',
    ],
    toolsUsed: ['Web Search', 'Zoho / HubSpot CRM', 'Google Sheets', 'Gmail / Outlook'],
    worksWith: 'B2B Sales Reps, SDRs & Founders',
    successMetrics: ['Qualified leads researched / day', 'Rep prep time saved per call'],
  },
  {
    id: 'job-support',
    roleTitle: 'Customer Support Agent',
    codeName: 'Nova-C',
    department: 'Support',
    avatarVariant: 'diamond',
    shortTagline:
      'Resolves common cases end-to-end (order status, returns, rescheduling), escalates complex ones',
    responsibilities: [
      'Checks live order status, courier tracking & return eligibility automatically',
      'Arranges approved replacements or appointment reschedules within policy',
      'Escalates angry or edge-case tickets to human agents with a clean summary',
    ],
    toolsUsed: ['Shopify / WooCommerce', 'Helpdesk / Inbox', 'WhatsApp Business', 'Courier API'],
    worksWith: 'Customer Support & CX Teams',
    successMetrics: ['First-response speed', '% routine tickets resolved with audit log'],
  },
  {
    id: 'job-ops',
    roleTitle: 'Operations Coordinator Agent',
    codeName: 'Nova-O',
    department: 'Operations',
    avatarVariant: 'octagon',
    shortTagline: 'Matches invoices, updates stock, chases approvals, flags mismatches',
    responsibilities: [
      'Extracts vendor invoice line items and compares them against purchase orders',
      'Flags quantity or tax mismatches for finance review before payment entry',
      'Follows up on pending internal approvals and syncs inventory buffers',
    ],
    toolsUsed: ['Tally / Zoho Books', 'Google Sheets / Excel', 'Email Inbox', 'Slack / Teams'],
    worksWith: 'Operations, Finance & Procurement Teams',
    successMetrics: ['PO-to-invoice match rate', 'Turnaround time on vendor bill logging'],
  },
  {
    id: 'job-hr',
    roleTitle: 'Recruiting Assistant Agent',
    codeName: 'Nova-R',
    department: 'HR',
    avatarVariant: 'shield',
    shortTagline: 'Screens applications against criteria, schedules interviews, sends updates',
    responsibilities: [
      'Reads incoming resumes and scores candidates against must-have role criteria',
      'Prepares structured shortlist cards for hiring managers to approve',
      'Coordinates calendar slots and sends polite status updates to applicants',
    ],
    toolsUsed: ['Careers Inbox / ATS', 'Google Calendar / Calendly', 'Google Sheets', 'Email'],
    worksWith: 'HR Teams, Recruiters & Department Heads',
    successMetrics: ['Time-to-shortlist per role', '100% candidate reply coverage'],
  },
  {
    id: 'job-analyst',
    roleTitle: 'Data Analyst Agent',
    codeName: 'Nova-D',
    department: 'Analytics',
    avatarVariant: 'circle-grid',
    shortTagline: 'Pulls data from sheets/BI, answers questions, writes weekly summaries',
    responsibilities: [
      'Consolidates weekly sales, marketing & collections numbers across sheets',
      'Spots anomalies (dips, spikes, stockouts) and explains what changed',
      'Answers plain-English questions from leadership with cited source rows',
    ],
    toolsUsed: ['Google Sheets / Excel', 'SQL / BI Read-Only', 'CRM Exports', 'Email / Slack'],
    worksWith: 'Founders, Finance & Growth Leaders',
    successMetrics: ['Hours saved on Monday reporting', 'Zero manual formula copy-paste errors'],
  },
  {
    id: 'job-knowledge',
    roleTitle: 'Knowledge Assistant Agent',
    codeName: 'Nova-K',
    department: 'Operations',
    avatarVariant: 'prism',
    shortTagline:
      'Answers employee questions from internal policies and documents with sources',
    responsibilities: [
      'Searches SOPs, HR handbooks, product specs & pricing tables in seconds',
      'Answers internal team questions with exact page and paragraph citations',
      'Flags outdated or conflicting policy documents for operations review',
    ],
    toolsUsed: ['Google Drive / Docs', 'Notion / Wiki', 'PDF SOP Vault', 'Slack / Teams'],
    worksWith: 'All Internal Departments & New Hires',
    successMetrics: ['Internal query resolution time', 'Citation accuracy on audited answers'],
  },
];

/* ==========================================================================
   HELPER: ABSTRACT GEOMETRIC AGENT AVATAR (NO PHOTOS OF REAL PEOPLE)
========================================================================== */

const AbstractAgentAvatar: React.FC<{
  variant: AgentBadgeData['avatarShape'] | AgentJobPosting['avatarVariant'];
  size?: 'sm' | 'md';
}> = ({ variant, size = 'md' }) => {
  const dim = size === 'sm' ? 'w-10 h-10' : 'w-12 h-12';
  return (
    <div
      className={`${dim} rounded-2xl bg-primary/15 border border-primary/40 flex items-center justify-center shrink-0`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" className="w-7 h-7">
        {variant === 'hexagon' && (
          <>
            <polygon
              points="20,4 34,12 34,28 20,36 6,28 6,12"
              fill="#0571c2"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <circle cx="15" cy="19" r="2.2" fill="#ffffff" />
            <circle cx="25" cy="19" r="2.2" fill="#ffffff" />
            <line
              x1="15"
              y1="26"
              x2="25"
              y2="26"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
        {variant === 'diamond' && (
          <>
            <polygon
              points="20,4 36,20 20,36 4,20"
              fill="#0571c2"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <circle cx="15" cy="19" r="2.2" fill="#ffffff" />
            <circle cx="25" cy="19" r="2.2" fill="#ffffff" />
            <path
              d="M 15 25 Q 20 28 25 25"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
        {variant === 'octagon' && (
          <>
            <polygon
              points="13,4 27,4 36,13 36,27 27,36 13,36 4,27 4,13"
              fill="#0571c2"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <rect x="12" y="16" width="5" height="4" rx="1" fill="#ffffff" />
            <rect x="23" y="16" width="5" height="4" rx="1" fill="#ffffff" />
            <line
              x1="14"
              y1="26"
              x2="26"
              y2="26"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
        {variant === 'circle-grid' && (
          <>
            <circle cx="20" cy="20" r="15" fill="#0571c2" stroke="#ffffff" strokeWidth="2" />
            <circle cx="14.5" cy="18" r="2.3" fill="#ffffff" />
            <circle cx="25.5" cy="18" r="2.3" fill="#ffffff" />
            <rect x="14" y="24" width="12" height="2.5" rx="1" fill="#ffffff" />
          </>
        )}
        {variant === 'shield' && (
          <>
            <path
              d="M 20 4 L 34 10 L 34 21 C 34 29 20 36 20 36 C 20 36 6 29 6 21 L 6 10 Z"
              fill="#0571c2"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <circle cx="15" cy="18" r="2.2" fill="#ffffff" />
            <circle cx="25" cy="18" r="2.2" fill="#ffffff" />
            <path
              d="M 15 24 Q 20 27 25 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
        {variant === 'prism' && (
          <>
            <polygon
              points="20,5 35,33 5,33"
              fill="#0571c2"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <circle cx="17" cy="23" r="2" fill="#ffffff" />
            <circle cx="23" cy="23" r="2" fill="#ffffff" />
            <line
              x1="16"
              y1="28"
              x2="24"
              y2="28"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </div>
  );
};

/* ==========================================================================
   MAIN PAGE COMPONENT
========================================================================== */

const AiAgentsForBusiness: React.FC<AiAgentsForBusinessProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  // Pull core metadata from parent AI Solutions array
  const solutionMeta = useMemo(
    () =>
      aiSolutions.find((s) => s.slug === 'ai-agents-for-business') || {
        name: 'AI Agents for Business',
        tagline: 'Digital teammates that plan, use your tools, and report back.',
        badge: 'NEW',
      },
    []
  );

  const triggerQuoteModal = (customContext?: string) => {
    const label = customContext || solutionMeta.name;
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  /* ------------------------------------------------------------------------
     SECTION 1 STATE: Live Status Line Ticker on ID Badges
  ------------------------------------------------------------------------ */
  const [badgeStatusTick, setBadgeStatusTick] = useState<number>(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setBadgeStatusTick((prev) => (prev + 1) % 2);
    }, 3400);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  /* ------------------------------------------------------------------------
     SECTION 2 STATE: Automation vs Agent — The Maze Replay
  ------------------------------------------------------------------------ */
  const [mazeRunKey, setMazeRunKey] = useState<number>(0);
  const [mazeStage, setMazeStage] = useState<number>(3); // 0..3

  useEffect(() => {
    if (shouldReduceMotion) {
      setMazeStage(3);
      return;
    }
    setMazeStage(0);
    const t1 = setTimeout(() => setMazeStage(1), 450);
    const t2 = setTimeout(() => setMazeStage(2), 1100);
    const t3 = setTimeout(() => setMazeStage(3), 1850);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [mazeRunKey, shouldReduceMotion]);

  /* ------------------------------------------------------------------------
     SECTION 3 STATE: Watch an Agent Work — The Mission Log
  ------------------------------------------------------------------------ */
  const [selectedMissionId, setSelectedMissionId] = useState<string>(MISSION_SCENARIOS[0].id);
  const [visibleStepCount, setVisibleStepCount] = useState<number>(5);
  const [expandedStepIdx, setExpandedStepIdx] = useState<number | null>(3);
  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'edited'>(
    'pending'
  );

  const activeMission = useMemo(
    () => MISSION_SCENARIOS.find((m) => m.id === selectedMissionId) || MISSION_SCENARIOS[0],
    [selectedMissionId]
  );

  const handleStartMission = (scenarioId?: string) => {
    const targetId = scenarioId || selectedMissionId;
    if (scenarioId) setSelectedMissionId(scenarioId);
    setApprovalStatus('pending');
    setExpandedStepIdx(null);

    if (shouldReduceMotion) {
      setVisibleStepCount(5);
      return;
    }

    setVisibleStepCount(1);
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisibleStepCount(5);
      return;
    }
    if (visibleStepCount >= 5) return;
    const timer = setTimeout(() => {
      setVisibleStepCount((prev) => Math.min(5, prev + 1));
    }, 520);
    return () => clearTimeout(timer);
  }, [visibleStepCount, shouldReduceMotion]);

  /* ------------------------------------------------------------------------
     SECTION 4 STATE: Hire an Agent — The Job Board Filter
  ------------------------------------------------------------------------ */
  const [jobDeptFilter, setJobDeptFilter] = useState<JobDepartmentFilter>('All');

  const filteredJobs = useMemo(() => {
    if (jobDeptFilter === 'All') return JOB_POSTINGS;
    return JOB_POSTINGS.filter((j) => j.department === jobDeptFilter);
  }, [jobDeptFilter]);

  /* ------------------------------------------------------------------------
     SEO Title & Meta Description
  ------------------------------------------------------------------------ */
  useEffect(() => {
    document.title =
      'AI Agents for Business | Digital Teammates That Plan, Act & Report | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Digital teammates that get real work done. We build goal-driven AI agents for lead research, customer support, operations, HR and analytics — with strict permissions, action logs and human approval.'
      );
    }
  }, []);

  const jsonLdSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'AI Agents for Business',
          serviceType: 'Custom Goal-Driven AI Agents & Digital Teammates',
          provider: {
            '@type': 'Organization',
            name: 'WebXCode',
            url: 'https://webxcode.com',
          },
          description:
            'Custom AI agents that plan, use your business tools, check their own work, and complete multi-step tasks within strict permissions and human approvals.',
          areaServed: 'Worldwide',
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
              name: 'AI Solutions',
              item: 'https://webxcode.com/ai-solutions',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'AI Agents for Business',
              item: 'https://webxcode.com/ai-solutions/ai-agents-for-business',
            },
          ],
        },
      ],
    }),
    []
  );

  return (
    <main className="flex-1 bg-white text-navy">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: MEET YOUR DIGITAL TEAMMATES (NAVY #1e242e)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-20 lg:pt-14 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
        <div className="absolute -right-24 -top-24 w-[520px] h-[520px] blue-glow-strong pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/70 mb-7"
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
              AI Agents for Business
            </span>
          </nav>

          {/* 50/50 Split Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 50% (6 cols): Copy & CTAs */}
            <div className="lg:col-span-6">
              <div className="inline-flex flex-wrap items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em]">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                  <span>AI AGENTS FOR BUSINESS</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-wider">
                  {solutionMeta.badge || 'NEW'}
                </span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-[-0.02em]">
                Digital Teammates That <span className="text-primary">Get Real Work Done</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-xl">
                AI agents that plan, use your tools and complete multi-step tasks — from lead
                research to support resolution — within the permissions you set, with your team
                approving what matters.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#design-agent"
                  onClick={(e) => {
                    const el = document.getElementById('design-agent');
                    if (!el) {
                      e.preventDefault();
                      triggerQuoteModal('Design Your First AI Agent');
                    }
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15px] sm:text-[16px] shadow-soft transition-all"
                >
                  <span>Design Your First Agent →</span>
                </a>
                <a
                  href="#mission"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] sm:text-[16px] transition-all"
                >
                  <span>Watch an Agent Work</span>
                </a>
              </div>

              {/* Small Row: Plans · Uses your tools · Checks its work · Asks before acting */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-semibold text-white/85">
                {[
                  'Plans',
                  'Uses your tools',
                  'Checks its work',
                  'Asks before acting',
                ].map((trait, idx) => (
                  <React.Fragment key={trait}>
                    {idx > 0 && <span className="text-primary">·</span>}
                    <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10">
                      {trait}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right 50% (6 cols): 4 ID Badges Hanging on Lanyards */}
            <div className="lg:col-span-6">
              <div className="rounded-[26px] bg-white/[0.04] border border-white/15 p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between gap-2 pb-4 mb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/85">
                      ACTIVE DIGITAL TEAM ROSTER · 4 AGENTS ON SHIFT
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-primary-100">
                    SUPERVISED MODE ✓
                  </span>
                </div>

                {/* 2x2 Grid of ID Badges (Swings gently on desktop, static on mobile / reduced motion) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {HERO_AGENT_BADGES.map((badge) => {
                    const currentStatus =
                      badge.statusStates[shouldReduceMotion ? 1 : badgeStatusTick];
                    return (
                      <motion.div
                        key={badge.id}
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : {
                                rotate: [
                                  0,
                                  badge.swingDeg,
                                  0,
                                  -badge.swingDeg * 0.7,
                                  0,
                                ],
                              }
                        }
                        transition={
                          shouldReduceMotion
                            ? undefined
                            : {
                                duration: 6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }
                        }
                        style={{ transformOrigin: 'top center' }}
                        className="flex flex-col items-center"
                      >
                        {/* Lanyard Strap & Metal Clip (Desktop decorative, aria-hidden) */}
                        <div
                          className="hidden sm:flex flex-col items-center"
                          aria-hidden="true"
                        >
                          <div className="w-3 h-3.5 border-x-2 border-primary/70" />
                          <div className="w-7 h-2.5 rounded-t-md bg-white/80 border border-white" />
                        </div>

                        {/* ID Badge Card */}
                        <div className="w-full rounded-[20px] bg-navy border-2 border-white/20 hover:border-primary p-4 shadow-lg transition-colors">
                          {/* Slot Punch Hole at Top */}
                          <div
                            className="w-8 h-1.5 rounded-full bg-white/20 mx-auto mb-3"
                            aria-hidden="true"
                          />

                          {/* Badge Header: Avatar + Name + Role + Monospace ID */}
                          <div className="flex items-start gap-3">
                            <AbstractAgentAvatar variant={badge.avatarShape} size="md" />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-mono text-[10px] font-bold text-primary-100 uppercase">
                                  {badge.monoId}
                                </span>
                                <span className="w-2 h-2 rounded-full bg-primary" />
                              </div>
                              <h2 className="text-[16px] font-extrabold text-white leading-tight mt-0.5">
                                {badge.codeName} · {badge.roleTitle}
                              </h2>
                              <div className="font-mono text-[10px] text-white/60 mt-0.5">
                                {badge.department}
                              </div>
                            </div>
                          </div>

                          {/* Live Updating Status Line */}
                          <div className="mt-3.5 pt-3 border-t border-white/10">
                            <div className="font-mono text-[10px] uppercase tracking-wider text-white/55 mb-1">
                              LIVE STATUS:
                            </div>
                            <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 font-mono text-[11px] font-bold text-primary-100 min-h-[42px] flex items-center">
                              <span>{currentStatus}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — AUTOMATION VS AGENT: THE MAZE (WHITE)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Run Again Button */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                FIXED SCRIPTS VS GOAL-DRIVEN REASONING
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Automations Follow Steps.{' '}
                <span className="text-primary">Agents Pursue Goals.</span>
              </h2>
              <p className="mt-3 text-[16px] text-navy-70 leading-[1.65]">
                Both start with the same goal —{' '}
                <strong className="text-navy">
                  &ldquo;Resolve customer&apos;s damaged-order complaint&rdquo;
                </strong>{' '}
                — and hit the same unexpected wall. Watch how a fixed workflow compares to an AI
                agent.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMazeRunKey((k) => k + 1)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-navy hover:bg-primary text-white text-[14px] font-bold shadow-soft transition-colors self-start lg:self-auto cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Run Again</span>
            </button>
          </div>

          {/* Two Side-by-Side Mazes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT MAZE: Fixed Automation */}
            <div className="rounded-[24px] bg-primary-50/40 border-2 border-navy-15 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-navy-15">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60">
                      MAZE A · PRE-DRAWN ROUTE
                    </span>
                    <h3 className="text-[21px] font-extrabold text-navy mt-0.5">
                      Fixed Automation
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-navy/10 text-navy font-mono text-[11px] font-bold">
                    HITS WALL &amp; STOPS
                  </span>
                </div>

                {/* Start Banner */}
                <div className="mt-4 px-3.5 py-2 rounded-xl bg-white border border-navy-15 font-mono text-[12px] font-bold text-navy flex items-center justify-between">
                  <span>START: {MAZE_DATA.goalTitle}</span>
                  <span className="text-navy-50">00:00</span>
                </div>

                {/* SVG Maze Diagram — Left */}
                <div className="my-4 rounded-2xl bg-white border border-navy-15 p-4" aria-hidden="true">
                  <svg viewBox="0 0 420 190" className="w-full h-auto">
                    {/* Outer Maze Walls */}
                    <rect
                      x="12"
                      y="12"
                      width="396"
                      height="166"
                      rx="12"
                      fill="none"
                      stroke="#1e242e"
                      strokeWidth="3"
                    />
                    {/* Internal Corridor Walls */}
                    <line x1="140" y1="12" x2="140" y2="62" stroke="#1e242e" strokeWidth="3" />
                    <line x1="275" y1="125" x2="275" y2="178" stroke="#1e242e" strokeWidth="3" />

                    {/* Unexpected Wall Blocking Straight Center Path */}
                    <rect
                      x="212"
                      y="64"
                      width="14"
                      height="62"
                      rx="4"
                      fill="#1e242e"
                    />
                    <text
                      x="219"
                      y="54"
                      textAnchor="middle"
                      className="fill-navy font-mono text-[9.5px] font-extrabold"
                    >
                      WALL: Wants replacement, not refund
                    </text>

                    {/* Straight Fixed Route Line */}
                    <line
                      x1="36"
                      y1="95"
                      x2={mazeStage >= 1 ? 204 : 95}
                      y2="95"
                      stroke="#1e242e"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Token Stopped at Wall */}
                    <circle
                      cx={mazeStage >= 1 ? 198 : 80}
                      cy="95"
                      r="10"
                      fill="#1e242e"
                    />

                    {/* Unreached Finish Flag on Right */}
                    <g opacity="0.35">
                      <rect
                        x="315"
                        y="77"
                        width="78"
                        height="36"
                        rx="8"
                        fill="#1e242e"
                      />
                      <text
                        x="354"
                        y="99"
                        textAnchor="middle"
                        className="fill-white font-mono text-[10px] font-bold"
                      >
                        Finish
                      </text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Outcome Box */}
              <div className="p-4 rounded-2xl bg-navy text-white flex items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/65">
                    OUTCOME AT WALL: &ldquo;{MAZE_DATA.wallLabel}&rdquo;
                  </div>
                  <div className="text-[15px] font-extrabold text-white mt-0.5">
                    Route Blocked → {MAZE_DATA.automationStopStatus}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-white/10 font-mono text-[11px] font-bold shrink-0">
                  Stopped
                </span>
              </div>
            </div>

            {/* RIGHT MAZE: AI Agent */}
            <div className="rounded-[24px] bg-primary-50/75 border-2 border-primary p-6 sm:p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-primary-100">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                      MAZE B · DYNAMIC RE-PLANNING
                    </span>
                    <h3 className="text-[21px] font-extrabold text-navy mt-0.5">
                      AI Agent
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-bold">
                    RE-PLANS &amp; FINISHES ✓
                  </span>
                </div>

                {/* Start Banner */}
                <div className="mt-4 px-3.5 py-2 rounded-xl bg-white border border-primary-100 font-mono text-[12px] font-bold text-navy flex items-center justify-between">
                  <span>START: {MAZE_DATA.goalTitle}</span>
                  <span className="text-primary font-extrabold">GOAL ACTIVE</span>
                </div>

                {/* SVG Maze Diagram — Right */}
                <div className="my-4 rounded-2xl bg-white border border-primary-100 p-4" aria-hidden="true">
                  <svg viewBox="0 0 420 190" className="w-full h-auto">
                    {/* Outer Maze Walls */}
                    <rect
                      x="12"
                      y="12"
                      width="396"
                      height="166"
                      rx="12"
                      fill="none"
                      stroke="#1e242e"
                      strokeWidth="3"
                    />
                    <line x1="140" y1="12" x2="140" y2="62" stroke="#1e242e" strokeWidth="3" />
                    <line x1="275" y1="125" x2="275" y2="178" stroke="#1e242e" strokeWidth="3" />

                    {/* Same Wall */}
                    <rect
                      x="212"
                      y="64"
                      width="14"
                      height="62"
                      rx="4"
                      fill="#1e242e"
                    />

                    {/* Agent Initial Segment + Dotted Re-Planned Bypass Corridor */}
                    <path
                      d="M 36 95 L 175 95 L 175 36 L 295 36 L 295 95 L 330 95"
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="4"
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                    />

                    {/* Checkpoint 1: inventory.check() */}
                    <g transform="translate(182, 18)">
                      <rect
                        x="0"
                        y="0"
                        width="105"
                        height="20"
                        rx="6"
                        fill="#0571c2"
                      />
                      <text
                        x="52"
                        y="13"
                        textAnchor="middle"
                        className="fill-white font-mono text-[9.5px] font-bold"
                      >
                        inventory.check()
                      </text>
                    </g>

                    {/* Checkpoint 2 Gate: Approval: replacement worth ₹2,400 ✓ */}
                    <g transform="translate(170, 142)">
                      <rect
                        x="0"
                        y="0"
                        width="225"
                        height="22"
                        rx="6"
                        fill="#1e242e"
                      />
                      <text
                        x="112"
                        y="14"
                        textAnchor="middle"
                        className="fill-white font-mono text-[9.5px] font-bold"
                      >
                        Approval: replacement worth ₹2,400 ✓
                      </text>
                    </g>

                    {/* Agent Token at Finish */}
                    <circle
                      cx={mazeStage >= 3 ? 330 : mazeStage === 2 ? 295 : 175}
                      cy={mazeStage >= 3 ? 95 : 36}
                      r="10"
                      fill="#0571c2"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />

                    {/* Reached Finish Box */}
                    <rect
                      x="315"
                      y="77"
                      width="82"
                      height="36"
                      rx="8"
                      fill="#0571c2"
                    />
                    <text
                      x="356"
                      y="99"
                      textAnchor="middle"
                      className="fill-white font-mono text-[9.5px] font-extrabold"
                    >
                      Customer happy ✓
                    </text>
                  </svg>
                </div>
              </div>

              {/* Outcome Box */}
              <div className="p-4 rounded-2xl bg-primary text-white flex items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-primary-100">
                    RE-PLANNED AROUND WALL · CHECKED STOCK · GOT APPROVAL
                  </div>
                  <div className="text-[15px] font-extrabold text-white mt-0.5">
                    Reached Finish: {MAZE_DATA.finishTitle}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-white text-primary font-mono text-[11px] font-extrabold shrink-0">
                  Solved ✓
                </span>
              </div>
            </div>
          </div>

          {/* Honest Caption & Cross-Link to AI Workflow Automation */}
          <p className="mt-7 text-center text-[14px] sm:text-[15px] text-navy-70 font-medium">
            Use automation for predictable steps, and agents where judgement and flexibility are
            needed — often both together. Explore{' '}
            <Link
              to="/ai-solutions/ai-workflow-automation"
              className="text-primary font-extrabold underline hover:text-navy"
            >
              AI Workflow Automation →
            </Link>
          </p>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — WATCH AN AGENT WORK: THE MISSION LOG (LIGHT BLUE TINT, id="mission")
      ====================================================================== */}
      <section
        id="mission"
        className="py-[72px] lg:py-[112px] bg-primary-50/60 border-y border-primary-100 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              TRANSPARENT REASONING TRAIL
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              From Goal to Done — <span className="text-primary">Every Step Visible</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Pick a business goal below and press <strong className="text-navy">Start Mission</strong>{' '}
              to watch how an agent plans, calls tools, checks its own output, and pauses for human
              approval.
            </p>
          </div>

          {/* Mission Console Card */}
          <div className="rounded-[28px] bg-white border border-navy-08 shadow-xl overflow-hidden">
            {/* Top Goal Selector Bar */}
            <div className="bg-navy text-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                  SELECT A PRESET MISSION GOAL:
                </span>
                <span className="font-mono text-[11px] text-white/75">
                  Assigned: {activeMission.agentAssigned}
                </span>
              </div>

              {/* 3 Preset Goal Chips */}
              <div className="flex flex-wrap gap-2.5 mb-5">
                {MISSION_SCENARIOS.map((scen) => {
                  const isSelected = scen.id === selectedMissionId;
                  return (
                    <button
                      key={scen.id}
                      type="button"
                      onClick={() => handleStartMission(scen.id)}
                      className={`px-4 py-2.5 rounded-xl text-left text-[13px] font-bold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-md'
                          : 'bg-white/[0.06] text-white/80 border-white/15 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      &ldquo;{scen.goalChip}&rdquo;
                    </button>
                  );
                })}
              </div>

              {/* Active Goal Input Display + Start Mission Button */}
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Terminal className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-mono text-[13px] sm:text-[14px] font-bold text-white truncate">
                    GOAL: {activeMission.goalChip}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleStartMission()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-700 text-white text-[13px] font-extrabold shrink-0 self-start sm:self-center cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Mission</span>
                </button>
              </div>
            </div>

            {/* Vertical Thinking Trail (Plan → Act → Check → Ask → Done) */}
            <div
              aria-live="polite"
              className="p-6 sm:p-8 space-y-4 bg-white"
            >
              {activeMission.steps.slice(0, visibleStepCount).map((st, idx) => {
                const isExpanded = expandedStepIdx === idx;
                return (
                  <motion.div
                    key={`${activeMission.id}-${st.phase}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl border transition-all ${
                      st.phase === 'Ask'
                        ? 'bg-primary-50/70 border-primary'
                        : 'bg-white border-navy-15 hover:border-primary/50'
                    }`}
                  >
                    <div className="p-4 sm:p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-lg font-mono text-[11px] font-extrabold uppercase ${
                              st.phase === 'Done'
                                ? 'bg-primary text-white'
                                : st.phase === 'Ask'
                                ? 'bg-navy text-white'
                                : 'bg-primary-50 text-primary border border-primary-100'
                            }`}
                          >
                            {st.phase}
                          </span>
                          <h3 className="text-[15px] sm:text-[16px] font-extrabold text-navy">
                            {st.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          {st.toolCallMono && (
                            <span className="px-2.5 py-1 rounded-md bg-navy text-primary-100 font-mono text-[11px] font-bold">
                              {st.toolCallMono}
                            </span>
                          )}
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            onClick={() =>
                              setExpandedStepIdx(isExpanded ? null : idx)
                            }
                            className="px-2.5 py-1 rounded-lg border border-navy-15 text-[11px] font-bold text-navy hover:border-primary cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>{isExpanded ? 'Hide detail' : 'Details'}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      <p className="mt-2.5 text-[14px] font-semibold text-navy-80">
                        {st.shortResult}
                      </p>

                      {/* Interactive Approve / Edit Buttons on Step 4 (Ask) */}
                      {st.requiresApproval && (
                        <div className="mt-3.5 pt-3.5 border-t border-primary-100 flex flex-wrap items-center justify-between gap-3">
                          <span className="font-mono text-[12px] font-extrabold text-navy">
                            {approvalStatus === 'approved'
                              ? '✓ Supervisor approved batch execution'
                              : approvalStatus === 'edited'
                              ? '✎ Opened draft batch in editor before sending'
                              : st.approvalPrompt}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setApprovalStatus('approved')}
                              className={`px-4 py-1.5 rounded-full text-[12px] font-extrabold transition-colors cursor-pointer ${
                                approvalStatus === 'approved'
                                  ? 'bg-primary text-white'
                                  : 'bg-navy hover:bg-primary text-white'
                              }`}
                            >
                              Approve ✓
                            </button>
                            <button
                              type="button"
                              onClick={() => setApprovalStatus('edited')}
                              className={`px-4 py-1.5 rounded-full border text-[12px] font-extrabold transition-colors cursor-pointer ${
                                approvalStatus === 'edited'
                                  ? 'bg-primary-50 border-primary text-primary'
                                  : 'bg-white border-navy-15 text-navy hover:border-primary'
                              }`}
                            >
                              Edit Drafts
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Expandable Step Details */}
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-navy-08 text-[13px] text-navy-70 leading-relaxed">
                          {st.expandedDetail}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Footer Disclaimer */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[12px] font-mono text-navy-50">
                <span>Scripted demo for illustration.</span>
                <span>Every tool call &amp; approval is saved to your audit log.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — HIRE AN AGENT: THE JOB BOARD (WHITE)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Department Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                DIGITAL TEAMMATE ROLES
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                What Would <span className="text-primary">Your Agent</span> Do?
              </h2>
              <p className="mt-3 text-[16px] text-navy-70 leading-[1.65]">
                Browse our 6 most requested agent roles below. Each agent is scoped to a clear job
                description, connected only to the tools it needs, and paired with your human team.
              </p>
            </div>

            {/* Filter Pills: All · Sales · Support · Operations · HR · Analytics */}
            <div
              className="flex flex-wrap items-center gap-2"
              role="tablist"
              aria-label="Filter agents by department"
            >
              {(
                ['All', 'Sales', 'Support', 'Operations', 'HR', 'Analytics'] as JobDepartmentFilter[]
              ).map((dept) => {
                const active = jobDeptFilter === dept;
                return (
                  <button
                    key={dept}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setJobDeptFilter(dept)}
                    className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer border ${
                      active
                        ? 'bg-navy text-white border-navy shadow-xs'
                        : 'bg-white text-navy border-navy-15 hover:border-primary'
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6 Job-Posting Cards (Pinned-Paper Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-[22px] bg-white border-2 border-navy-08 hover:border-primary shadow-soft p-6 flex flex-col justify-between relative transition-all"
              >
                <div>
                  {/* Top Pin & "NOW HIRING" Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span>NOW HIRING · {job.department.toUpperCase()}</span>
                    </span>
                    <span className="font-mono text-[11px] font-bold text-navy-50">
                      {job.codeName}
                    </span>
                  </div>

                  {/* Role Title + Abstract Avatar */}
                  <div className="flex items-start gap-3.5 pb-4 border-b border-navy-08">
                    <AbstractAgentAvatar variant={job.avatarVariant} size="md" />
                    <div>
                      <h3 className="text-[19px] font-extrabold text-navy leading-snug">
                        {job.roleTitle}
                      </h3>
                      <p className="text-[13px] text-navy-70 mt-1 leading-snug">
                        {job.shortTagline}
                      </p>
                    </div>
                  </div>

                  {/* Responsibilities (3 Bullets) */}
                  <div className="mt-4">
                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-50 mb-2">
                      RESPONSIBILITIES:
                    </div>
                    <ul className="space-y-1.5">
                      {job.responsibilities.map((resp) => (
                        <li
                          key={resp}
                          className="flex items-start gap-2 text-[13px] text-navy-80 leading-snug"
                        >
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools It Uses (Text Chips) */}
                  <div className="mt-4">
                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-50 mb-1.5">
                      TOOLS IT USES:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.toolsUsed.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-0.5 rounded-md bg-primary-50/70 border border-primary-100 text-[11px] font-semibold text-navy"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Works With + Success Metrics (2 KPIs) */}
                  <div className="mt-4 pt-3.5 border-t border-navy-08 space-y-2 text-[12px]">
                    <div>
                      <span className="font-bold text-navy">Works with: </span>
                      <span className="text-navy-70">{job.worksWith}</span>
                    </div>
                    <div>
                      <span className="font-bold text-navy">Success metrics: </span>
                      <span className="text-primary font-semibold">
                        {job.successMetrics.join(' · ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hire This Agent CTA */}
                <button
                  type="button"
                  onClick={() => triggerQuoteModal(`Hire Agent: ${job.roleTitle}`)}
                  className="mt-6 w-full py-3 px-4 rounded-full bg-navy hover:bg-primary text-white text-[13px] font-extrabold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Hire This Agent →</span>
                </button>
              </div>
            ))}
          </div>

          {/* Cross-link to CRM & Lead Automation */}
          <div className="mt-8 p-5 rounded-2xl bg-[#f5f9ff] border border-primary-100 flex flex-wrap items-center justify-between gap-3 text-[13px] text-navy-70">
            <span>
              Looking specifically for <strong className="text-navy">under-60-second lead capture, AI lead scoring &amp; CRM routing</strong>?
            </span>
            <Link
              to="/ai-solutions/crm-lead-automation"
              className="font-mono text-[12px] font-extrabold text-primary hover:text-navy inline-flex items-center gap-1"
            >
              <span>Explore CRM &amp; Lead Automation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AiAgentsForBusiness;
