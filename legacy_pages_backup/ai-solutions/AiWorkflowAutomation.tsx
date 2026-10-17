import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Sparkles,
  Workflow,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Sliders,
  ShieldCheck,
  Terminal,
  GitBranch,
  Layers,
  Bell,
  Inbox,
  FileSpreadsheet,
  MessageSquare,
  Zap,
  Music,
  Volume2,
  TrainFront,
  Shuffle,
} from 'lucide-react';
import { aiSolutions } from '../AISolutions';

interface AiWorkflowAutomationProps {
  onOpenQuoteModal?: (service?: string) => void;
}

/* ==========================================================================
   DATA ARRAYS — TOP OF FILE
========================================================================== */

interface ChainStep {
  id: string;
  stepNum: string;
  partType: 'ball' | 'dominoes' | 'gear' | 'lever' | 'ramp-bell' | 'neon-sign';
  mechanicTitle: string;
  label: string;
  detail: string;
  timeStamp: string;
}

const CHAIN_STEPS: ChainStep[] = [
  {
    id: 'step-1',
    stepNum: '01',
    partType: 'ball',
    mechanicTitle: 'Trigger Ball Rolls In',
    label: 'New enquiry',
    detail: 'Website form, email or WhatsApp inquiry arrives',
    timeStamp: '00:00',
  },
  {
    id: 'step-2',
    stepNum: '02',
    partType: 'dominoes',
    mechanicTitle: 'Domino Cascade',
    label: 'Webhook & Parser',
    detail: 'Extracts contact name, company, requirement & budget',
    timeStamp: '00:01',
  },
  {
    id: 'step-3',
    stepNum: '03',
    partType: 'gear',
    mechanicTitle: 'Precision AI Gear',
    label: 'AI reads & scores',
    detail: 'Classifies intent, urgency & assigns lead score',
    timeStamp: '00:02',
  },
  {
    id: 'step-4',
    stepNum: '04',
    partType: 'lever',
    mechanicTitle: 'Drop Lever & Box',
    label: 'CRM',
    detail: 'Drops structured lead card into CRM & Google Sheet',
    timeStamp: '00:03',
  },
  {
    id: 'step-5',
    stepNum: '05',
    partType: 'ramp-bell',
    mechanicTitle: 'Tipping Ramp & Bell',
    label: 'Team notified',
    detail: 'Rings sales owner with a 2-line AI brief',
    timeStamp: '00:03.5',
  },
  {
    id: 'step-6',
    stepNum: '06',
    partType: 'neon-sign',
    mechanicTitle: 'Lit Completion Sign',
    label: 'Reply sent on WhatsApp ✓',
    detail: 'Personalized acknowledgement sent automatically',
    timeStamp: '00:04',
  },
];

type StickyBucket = 'wall' | 'automate' | 'assist' | 'human';

interface StickyTask {
  id: string;
  text: string;
  hoursPerWeek: number;
  rotationDeg: number;
  recommendedBucket: 'automate' | 'assist' | 'human';
  reason: string;
}

const STICKY_TASKS: StickyTask[] = [
  {
    id: 'task-1',
    text: 'Copy leads from website to sheet',
    hoursPerWeek: 3.5,
    rotationDeg: -2,
    recommendedBucket: 'automate',
    reason: '100% deterministic field mapping from form webhook to sheet & CRM.',
  },
  {
    id: 'task-2',
    text: 'Send payment reminders',
    hoursPerWeek: 3.0,
    rotationDeg: 1.5,
    recommendedBucket: 'automate',
    reason: 'Scheduled due-date checks trigger polite WhatsApp/email nudges.',
  },
  {
    id: 'task-3',
    text: "Reply 'what are your timings?'",
    hoursPerWeek: 2.5,
    rotationDeg: -1.5,
    recommendedBucket: 'automate',
    reason: 'Routine FAQ answered 24/7 from verified business hours.',
  },
  {
    id: 'task-4',
    text: 'Make weekly sales report',
    hoursPerWeek: 4.0,
    rotationDeg: 2,
    recommendedBucket: 'automate',
    reason: 'Pulls numbers every Monday 9 AM and emails an AI summary.',
  },
  {
    id: 'task-5',
    text: 'Download invoices from email',
    hoursPerWeek: 3.5,
    rotationDeg: -2.5,
    recommendedBucket: 'automate',
    reason: 'AI reads PDF attachments, extracts GST/line items & logs into accounting.',
  },
  {
    id: 'task-6',
    text: 'Create shipping labels',
    hoursPerWeek: 3.0,
    rotationDeg: 1,
    recommendedBucket: 'automate',
    reason: 'Order confirmation automatically generates courier label & tracking link.',
  },
  {
    id: 'task-7',
    text: 'Update stock in 2 places',
    hoursPerWeek: 2.5,
    rotationDeg: -1,
    recommendedBucket: 'automate',
    reason: 'Two-way sync keeps store inventory and ERP/sheets aligned.',
  },
  {
    id: 'task-8',
    text: 'Schedule interviews',
    hoursPerWeek: 3.0,
    rotationDeg: 2.2,
    recommendedBucket: 'assist',
    reason: 'AI screens resumes & proposes slots; HR approves final shortlist.',
  },
  {
    id: 'task-9',
    text: 'Summarize meeting notes',
    hoursPerWeek: 2.5,
    rotationDeg: -1.8,
    recommendedBucket: 'assist',
    reason: 'AI drafts action items & owners; team lead reviews before sending.',
  },
  {
    id: 'task-10',
    text: 'Chase approvals',
    hoursPerWeek: 2.0,
    rotationDeg: 1.2,
    recommendedBucket: 'Human' === 'Human' ? 'human' : 'assist',
    reason: 'Automated nudges help, while final commercial judgment stays human.',
  },
  {
    id: 'task-11',
    text: 'Send order updates',
    hoursPerWeek: 3.0,
    rotationDeg: -2,
    recommendedBucket: 'automate',
    reason: 'Instant dispatch & delivery status updates on WhatsApp and email.',
  },
  {
    id: 'task-12',
    text: 'Sort support emails',
    hoursPerWeek: 4.0,
    rotationDeg: 1.7,
    recommendedBucket: 'assist',
    reason: 'AI tags urgency, sentiment & drafts a reply for agent one-click send.',
  },
];

interface PlaylistRecipe {
  id: string;
  trackNum: string;
  title: string;
  apps: string[];
  durationSaved: string;
  hoursNum: number;
  flowSteps: string[];
  summary: string;
}

const PLAYLIST_RECIPES: PlaylistRecipe[] = [
  {
    id: 'track-1',
    trackNum: '01',
    title: 'New lead → AI qualifies → CRM → instant WhatsApp/email reply',
    apps: ['Website Form', 'OpenAI / Claude', 'Zoho / HubSpot', 'WhatsApp Business', 'Gmail'],
    durationSaved: '4:30 hrs',
    hoursNum: 4.5,
    flowSteps: [
      'Webhook captures lead',
      'AI enriches & scores intent',
      'Creates CRM deal + owner',
      'Sends tailored WhatsApp & email reply',
    ],
    summary: 'Responds to new enquiries in under 30 seconds while alerting the right sales rep.',
  },
  {
    id: 'track-2',
    trackNum: '02',
    title: 'Invoice emails → AI extracts data → accounting software → approval request',
    apps: ['Gmail / Outlook', 'AI Document Parser', 'Tally / Zoho Books', 'Slack / Teams'],
    durationSaved: '5:00 hrs',
    hoursNum: 5.0,
    flowSteps: [
      'Watches bills@ inbox',
      'AI extracts vendor, GSTIN & line items',
      'Creates draft voucher in Tally/Zoho Books',
      'Routes for 1-click finance approval',
    ],
    summary: 'Eliminates manual re-typing of vendor PDF bills and flags mismatched totals.',
  },
  {
    id: 'track-3',
    trackNum: '03',
    title: 'Support emails → AI classifies & drafts reply → right team',
    apps: ['Support Inbox', 'AI Classifier', 'Knowledge Base', 'Helpdesk / CRM'],
    durationSaved: '4:00 hrs',
    hoursNum: 4.0,
    flowSteps: [
      'Reads incoming customer email',
      'Tags category, order ID & sentiment',
      'Drafts policy-accurate reply from docs',
      'Assigns to replacement or billing queue',
    ],
    summary: 'Gives support reps a ready-to-send draft and routes urgent tickets first.',
  },
  {
    id: 'track-4',
    trackNum: '04',
    title: 'New order → stock update → shipping label → customer update',
    apps: ['Shopify / WooCommerce', 'Google Sheets / ERP', 'Courier API', 'WhatsApp Business'],
    durationSaved: '3:30 hrs',
    hoursNum: 3.5,
    flowSteps: [
      'Order paid trigger',
      'Deducts SKU stock across channels',
      'Generates courier AWB & label PDF',
      'Sends live tracking link on WhatsApp',
    ],
    summary: 'Keeps warehouse stock accurate and customers informed without manual copy-paste.',
  },
  {
    id: 'track-5',
    trackNum: '05',
    title: 'Job applications → AI screens → interview scheduling',
    apps: ['Careers Form / Email', 'AI Resume Reader', 'Google Sheets', 'Google Calendar / Calendly'],
    durationSaved: '3:00 hrs',
    hoursNum: 3.0,
    flowSteps: [
      'Parses incoming CV PDF',
      'AI scores against role must-haves',
      'Logs structured candidate row',
      'Sends calendar booking link to approved shortlist',
    ],
    summary: 'Helps HR review 100+ applications quickly while keeping hiring decisions human.',
  },
  {
    id: 'track-6',
    trackNum: '06',
    title: 'Monday 9 AM → pull sales data → AI summary → email to leadership',
    apps: ['CRM + Store + Ads', 'Google Sheets', 'AI Analyst', 'Gmail / Outlook'],
    durationSaved: '2:30 hrs',
    hoursNum: 2.5,
    flowSteps: [
      'Scheduled Monday 09:00 trigger',
      'Aggregates weekly revenue, leads & collections',
      'AI writes plain-English highlights & anomalies',
      'Delivers clean briefing to leadership inbox',
    ],
    summary: 'Replaces Monday morning spreadsheet crunching with an automatic executive digest.',
  },
  {
    id: 'track-7',
    trackNum: '07',
    title: 'Meeting recording → transcript → action items → tasks assigned',
    apps: ['Google Meet / Zoom', 'Speech-to-Text', 'LLM Summarizer', 'Notion / Trello / Asana'],
    durationSaved: '3:00 hrs',
    hoursNum: 3.0,
    flowSteps: [
      'Call recording finishes',
      'Transcribes speaker turns',
      'AI extracts decisions, owners & due dates',
      'Creates task cards & shares summary note',
    ],
    summary: 'Ensures every client or internal call turns into tracked next steps.',
  },
];

interface RailwaySampleMessage {
  id: string;
  pillLabel: string;
  sender: string;
  messageText: string;
  ruleCheck: string;
  ruleResultStation: string;
  ruleFailureNote: string;
  aiSignalIntent: string;
  aiSignalSentiment: string;
  aiSignalPriority: string;
  aiDestinationStation: string;
  aiActionTaken: string;
}

const RAILWAY_MESSAGES: RailwaySampleMessage[] = [
  {
    id: 'msg-damaged',
    pillLabel: 'Damaged Order Replacement',
    sender: 'Customer Email · #ORD-4829',
    messageText: 'Hey, my order came damaged and I want a new one, not money back',
    ruleCheck: 'Contains word "money" → matches keyword rule [REFUND_FLOW]',
    ruleResultStation: 'Manual queue (or wrong Refund queue)',
    ruleFailureNote:
      'Exact-keyword rule misses that the customer explicitly asked for a replacement, not a refund — derailing into manual sorting.',
    aiSignalIntent: 'Intent: replacement',
    aiSignalSentiment: 'Sentiment: upset',
    aiSignalPriority: 'Priority: high',
    aiDestinationStation: 'Replacement team + apology template drafted',
    aiActionTaken:
      'Looks up Order #4829, checks replacement stock, flags high priority, and drafts a photo-request + replacement confirmation.',
  },
  {
    id: 'msg-enterprise',
    pillLabel: 'Urgent Bulk Quote Request',
    sender: 'Website Form · Procurement Lead',
    messageText: 'Need 180 units delivered to our Pune plant before the 25th. Can we get GST billing?',
    ruleCheck: 'No exact keyword "Enterprise" → routes to generic info@ inbox',
    ruleResultStation: 'Manual queue (48h standard wait)',
    ruleFailureNote:
      'Rule-based form router treats a 180-unit B2B order the same as a single retail question.',
    aiSignalIntent: 'Intent: bulk B2B quote (180 units)',
    aiSignalSentiment: 'Sentiment: time-sensitive',
    aiSignalPriority: 'Priority: high',
    aiDestinationStation: 'B2B Key Accounts + proforma GST draft ready',
    aiActionTaken:
      'Calculates tier volume pricing, creates a high-value deal in CRM, and alerts the B2B sales manager immediately.',
  },
  {
    id: 'msg-invoice',
    pillLabel: 'Vendor Revised Invoice',
    sender: 'Email Attachment · Apex Packaging',
    messageText: 'Please ignore yesterday’s bill. Attached is the revised invoice with corrected HSN code.',
    ruleCheck: 'Attachment = PDF → creates duplicate second bill in accounting',
    ruleResultStation: 'Manual queue (Duplicate invoice conflict)',
    ruleFailureNote:
      'Simple rule blindly imports every PDF attachment, risking double entry.',
    aiSignalIntent: 'Intent: superseding revised invoice',
    aiSignalSentiment: 'Sentiment: neutral operational',
    aiSignalPriority: 'Priority: medium',
    aiDestinationStation: 'Finance Approval Queue (replaces prior draft)',
    aiActionTaken:
      'Matches vendor + invoice number, marks yesterday’s draft as superseded, and updates HSN code for finance review.',
  },
];

/* ==========================================================================
   MAIN PAGE COMPONENT
========================================================================== */

const AiWorkflowAutomation: React.FC<AiWorkflowAutomationProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  // Pull core metadata from parent AI Solutions array
  const solutionMeta = useMemo(
    () =>
      aiSolutions.find((s) => s.slug === 'ai-workflow-automation') || {
        name: 'AI Workflow Automation',
        tagline: 'Connect your apps and let AI handle repetitive busywork.',
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
     SECTION 1 STATE: Hero Rube-Goldberg / Domino Chain Reaction (0..5)
  ------------------------------------------------------------------------ */
  const [activeChainStep, setActiveChainStep] = useState<number>(5);
  const [chainTimerText, setChainTimerText] = useState<string>('00:04');

  useEffect(() => {
    if (shouldReduceMotion) {
      setActiveChainStep(5);
      setChainTimerText('00:04');
      return;
    }

    let step = 0;
    setActiveChainStep(0);
    setChainTimerText('00:00');

    const stepInterval = setInterval(() => {
      step = (step + 1) % 8; // 0..5 active steps, 6..7 hold on final state (~8s loop)
      if (step <= 5) {
        setActiveChainStep(step);
        const secs = Math.min(4, Math.floor((step / 5) * 4));
        setChainTimerText(`00:0${secs}`);
      } else {
        setActiveChainStep(5);
        setChainTimerText('00:04');
      }
    }, 1000);

    return () => clearInterval(stepInterval);
  }, [shouldReduceMotion]);

  const replayChainReaction = () => {
    setActiveChainStep(0);
    setChainTimerText('00:00');
  };

  /* ------------------------------------------------------------------------
     SECTION 2 STATE: Sticky-Note Wall
  ------------------------------------------------------------------------ */
  const [taskAssignments, setTaskAssignments] = useState<Record<string, StickyBucket>>(() => {
    const initial: Record<string, StickyBucket> = {};
    STICKY_TASKS.forEach((t) => {
      initial[t.id] = 'wall';
    });
    return initial;
  });

  const [selectedStickyId, setSelectedStickyId] = useState<string | null>(STICKY_TASKS[0].id);
  const [draggedStickyId, setDraggedStickyId] = useState<string | null>(null);

  const assignTaskToBucket = (taskId: string, bucket: StickyBucket) => {
    setTaskAssignments((prev) => ({
      ...prev,
      [taskId]: bucket,
    }));
  };

  const handleSuggestForMe = () => {
    const suggested: Record<string, StickyBucket> = {};
    STICKY_TASKS.forEach((t) => {
      suggested[t.id] = t.recommendedBucket;
    });
    setTaskAssignments(suggested);
  };

  const handleResetWall = () => {
    const reset: Record<string, StickyBucket> = {};
    STICKY_TASKS.forEach((t) => {
      reset[t.id] = 'wall';
    });
    setTaskAssignments(reset);
  };

  const hoursSavedPerWeek = useMemo(() => {
    let total = 0;
    STICKY_TASKS.forEach((t) => {
      const bucket = taskAssignments[t.id];
      if (bucket === 'automate') {
        total += t.hoursPerWeek;
      } else if (bucket === 'assist') {
        total += t.hoursPerWeek * 0.5;
      }
    });
    return Math.round(total * 10) / 10;
  }, [taskAssignments]);

  const wallTasks = useMemo(
    () => STICKY_TASKS.filter((t) => taskAssignments[t.id] === 'wall'),
    [taskAssignments]
  );
  const automateTasks = useMemo(
    () => STICKY_TASKS.filter((t) => taskAssignments[t.id] === 'automate'),
    [taskAssignments]
  );
  const assistTasks = useMemo(
    () => STICKY_TASKS.filter((t) => taskAssignments[t.id] === 'assist'),
    [taskAssignments]
  );
  const humanTasks = useMemo(
    () => STICKY_TASKS.filter((t) => taskAssignments[t.id] === 'human'),
    [taskAssignments]
  );

  /* ------------------------------------------------------------------------
     SECTION 3 STATE: Automation Recipes Playlist
  ------------------------------------------------------------------------ */
  const [playingTrackId, setPlayingTrackId] = useState<string>(PLAYLIST_RECIPES[0].id);
  const [isPlaylistPaused, setIsPlaylistPaused] = useState<boolean>(false);

  const activeTrack = useMemo(
    () => PLAYLIST_RECIPES.find((r) => r.id === playingTrackId) || PLAYLIST_RECIPES[0],
    [playingTrackId]
  );

  const handleToggleTrack = (trackId: string) => {
    if (playingTrackId === trackId) {
      setIsPlaylistPaused((prev) => !prev);
    } else {
      setPlayingTrackId(trackId);
      setIsPlaylistPaused(false);
    }
  };

  /* ------------------------------------------------------------------------
     SECTION 4 STATE: Rules vs AI — The Railway Switch
  ------------------------------------------------------------------------ */
  const [railwayMode, setRailwayMode] = useState<'ai' | 'rules'>('ai');
  const [selectedRailwayMsgId, setSelectedRailwayMsgId] = useState<string>(RAILWAY_MESSAGES[0].id);

  const activeRailwayMsg = useMemo(
    () => RAILWAY_MESSAGES.find((m) => m.id === selectedRailwayMsgId) || RAILWAY_MESSAGES[0],
    [selectedRailwayMsgId]
  );

  /* ------------------------------------------------------------------------
     SEO Title & Meta Description
  ------------------------------------------------------------------------ */
  useEffect(() => {
    document.title =
      'AI Workflow Automation Services | Automate Business Processes With AI | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Let AI handle the busywork. We connect your apps (email, sheets, CRM, accounting, WhatsApp, store) and build monitored AI workflows with human approvals.'
      );
    }
  }, []);

  const jsonLdSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'AI Workflow Automation Services',
          serviceType: 'Business Process & AI Workflow Automation',
          provider: {
            '@type': 'Organization',
            name: 'WebXCode',
            url: 'https://webxcode.com',
          },
          description:
            'End-to-end AI workflow automation connecting email, spreadsheets, CRM, accounting, WhatsApp and stores with AI steps that read, classify, decide and draft — with human approvals and monitoring.',
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
              name: 'AI Workflow Automation',
              item: 'https://webxcode.com/ai-solutions/ai-workflow-automation',
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
         SECTION 1 — HERO: THE CHAIN REACTION (NAVY #1e242e)
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
              AI Workflow Automation
            </span>
          </nav>

          {/* 50/50 Split Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 50% (6 cols): Copy & CTAs */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Workflow className="w-3.5 h-3.5 text-primary" />
                <span>AI WORKFLOW AUTOMATION</span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-[-0.02em]">
                Let AI Handle <span className="text-primary">the Busywork</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-xl">
                We connect your apps and add AI that reads, sorts, decides and writes — so
                repetitive tasks run on their own, and your team focuses on work that matters.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#automation-audit"
                  onClick={(e) => {
                    const el = document.getElementById('automation-audit');
                    if (!el) {
                      e.preventDefault();
                      triggerQuoteModal('Free Automation Audit');
                    }
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15px] sm:text-[16px] shadow-soft transition-all"
                >
                  <span>Get a Free Automation Audit →</span>
                </a>
                <a
                  href="#task-wall"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] sm:text-[16px] transition-all"
                >
                  <span>Sort Your Busywork</span>
                </a>
              </div>

              {/* Small Functional Row */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-semibold text-white/80">
                {['Leads', 'Invoices', 'Support', 'Orders', 'Reports', 'HR'].map((domain, idx) => (
                  <React.Fragment key={domain}>
                    {idx > 0 && <span className="text-primary">·</span>}
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10">
                      {domain}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right 50% (6 cols): Playful Rube-Goldberg / Domino Chain Machine */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] bg-white/[0.04] border border-white/15 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
                {/* Screen-reader summary for decorative chain */}
                <p className="sr-only">
                  Chain reaction diagram: A ball labelled New enquiry rolls in, knocks a line of
                  dominoes, turns a gear labelled AI reads and scores, pulls a lever that drops a
                  card into a CRM box, tips a ramp that rings a bell labelled Team notified, and
                  lights a sign reading Reply sent on WhatsApp in 4 seconds.
                </p>

                {/* Top Machine Header & Monospace Timer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/85">
                      CHAIN REACTION ENGINE · END-TO-END RUN
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="px-3 py-1 rounded-lg bg-navy border border-primary/50 font-mono text-[12px] font-extrabold text-primary-100">
                      00:00 → {chainTimerText}
                    </div>
                    <button
                      type="button"
                      onClick={replayChainReaction}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-primary text-white text-[11px] font-bold transition-colors cursor-pointer"
                      aria-label="Replay chain reaction animation"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Replay</span>
                    </button>
                  </div>
                </div>

                {/* DESKTOP RUBE-GOLDBERG DIAGRAM (Clean Blue/White SVG + Interactive Stations) */}
                <div className="hidden sm:block" aria-hidden="true">
                  <svg
                    viewBox="0 0 600 290"
                    className="w-full h-auto rounded-2xl bg-navy/90 border border-white/10 p-2"
                  >
                    {/* Upper Track Platform */}
                    <line
                      x1="24"
                      y1="95"
                      x2="560"
                      y2="95"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Connector Chute from Upper Right to Lower Right */}
                    <path
                      d="M 540 95 Q 575 135 540 175"
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="2.5"
                      strokeDasharray="5 4"
                    />
                    {/* Lower Track Platform */}
                    <line
                      x1="40"
                      y1="235"
                      x2="560"
                      y2="235"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* STEP 1: Rolling Ball ("New enquiry") */}
                    <g opacity={activeChainStep >= 0 ? 1 : 0.35}>
                      {/* Ramp */}
                      <line
                        x1="26"
                        y1="62"
                        x2="108"
                        y2="93"
                        stroke="#0571c2"
                        strokeWidth="3"
                      />
                      <circle
                        cx={activeChainStep === 0 ? 55 : 96}
                        cy={activeChainStep === 0 ? 64 : 78}
                        r="14"
                        fill="#0571c2"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                      />
                      <text
                        x="68"
                        y="36"
                        textAnchor="middle"
                        className="fill-white font-mono text-[10px] font-bold"
                      >
                        1. New enquiry
                      </text>
                    </g>

                    {/* STEP 2: Line of Dominoes */}
                    <g opacity={activeChainStep >= 1 ? 1 : 0.35}>
                      {[0, 1, 2, 3].map((dIdx) => {
                        const xPos = 140 + dIdx * 24;
                        const tilted = activeChainStep >= 1;
                        return (
                          <g
                            key={dIdx}
                            transform={`translate(${xPos}, 92) rotate(${tilted ? 24 + dIdx * 4 : 0})`}
                          >
                            <rect
                              x="-4"
                              y="-36"
                              width="8"
                              height="36"
                              rx="2"
                              fill={tilted ? '#0571c2' : '#ffffff'}
                              stroke="#ffffff"
                              strokeWidth="1.5"
                            />
                          </g>
                        );
                      })}
                      <text
                        x="180"
                        y="36"
                        textAnchor="middle"
                        className="fill-white font-mono text-[10px] font-bold"
                      >
                        2. Dominoes
                      </text>
                    </g>

                    {/* STEP 3: Rotating Gear ("AI reads & scores") */}
                    <g opacity={activeChainStep >= 2 ? 1 : 0.35}>
                      <g transform="translate(325, 65)">
                        <circle
                          cx="0"
                          cy="0"
                          r="24"
                          fill="#1e242e"
                          stroke={activeChainStep >= 2 ? '#0571c2' : '#ffffff'}
                          strokeWidth="3"
                        />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                          <rect
                            key={deg}
                            x="-3"
                            y="-30"
                            width="6"
                            height="7"
                            rx="1"
                            fill="#ffffff"
                            transform={`rotate(${deg + (activeChainStep >= 2 ? 22 : 0)})`}
                          />
                        ))}
                        <circle cx="0" cy="0" r="8" fill="#0571c2" />
                      </g>
                      <text
                        x="325"
                        y="24"
                        textAnchor="middle"
                        className="fill-white font-mono text-[10px] font-bold"
                      >
                        3. AI reads &amp; scores
                      </text>
                    </g>

                    {/* STEP 4: Lever dropping Card into Box ("CRM") */}
                    <g opacity={activeChainStep >= 3 ? 1 : 0.35}>
                      {/* Fulcrum & Lever */}
                      <polygon points="435,95 443,82 451,95" fill="#ffffff" />
                      <line
                        x1="410"
                        y1={activeChainStep >= 3 ? 72 : 84}
                        x2="476"
                        y2={activeChainStep >= 3 ? 88 : 74}
                        stroke="#ffffff"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* CRM Box */}
                      <rect
                        x="485"
                        y="52"
                        width="58"
                        height="42"
                        rx="6"
                        fill={activeChainStep >= 3 ? '#0571c2' : '#1e242e'}
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      {/* Dropped Card */}
                      <rect
                        x="499"
                        y={activeChainStep >= 3 ? 40 : 24}
                        width="30"
                        height="18"
                        rx="3"
                        fill="#ffffff"
                      />
                      <text
                        x="514"
                        y="78"
                        textAnchor="middle"
                        className="fill-white font-mono text-[11px] font-extrabold"
                      >
                        CRM
                      </text>
                    </g>

                    {/* STEP 5 (Lower Right to Center): Tipping Ramp + Bell ("Team notified") */}
                    <g opacity={activeChainStep >= 4 ? 1 : 0.35}>
                      {/* Tipping Ramp */}
                      <line
                        x1="510"
                        y1="195"
                        x2="395"
                        y2="228"
                        stroke="#0571c2"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Bell Dome */}
                      <path
                        d="M 340 218 C 340 194, 372 194, 372 218 Z"
                        fill={activeChainStep >= 4 ? '#0571c2' : '#1e242e'}
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <circle cx="356" cy="191" r="4" fill="#ffffff" />
                      {/* Sound waves */}
                      {activeChainStep >= 4 && (
                        <>
                          <path
                            d="M 332 196 Q 324 205 332 214"
                            fill="none"
                            stroke="#0571c2"
                            strokeWidth="2"
                          />
                          <path
                            d="M 380 196 Q 388 205 380 214"
                            fill="none"
                            stroke="#0571c2"
                            strokeWidth="2"
                          />
                        </>
                      )}
                      <text
                        x="356"
                        y="175"
                        textAnchor="middle"
                        className="fill-white font-mono text-[10px] font-bold"
                      >
                        5. Team notified
                      </text>
                    </g>

                    {/* STEP 6 (Lower Left): Lit Sign ("Reply sent on WhatsApp ✓") */}
                    <g opacity={activeChainStep >= 5 ? 1 : 0.4}>
                      <rect
                        x="42"
                        y="178"
                        width="245"
                        height="46"
                        rx="12"
                        fill={activeChainStep >= 5 ? '#0571c2' : '#1e242e'}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                      />
                      <text
                        x="164"
                        y="205"
                        textAnchor="middle"
                        className="fill-white font-mono text-[11px] font-extrabold"
                      >
                        Reply sent on WhatsApp ✓
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Interactive / Mobile Vertical Sequence & Step Inspector */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {CHAIN_STEPS.map((st, idx) => {
                    const isLit = idx <= activeChainStep;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          setActiveChainStep(idx);
                          setChainTimerText(st.timeStamp.slice(0, 5));
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isLit
                            ? 'bg-primary/20 border-primary text-white shadow-xs'
                            : 'bg-white/[0.03] border-white/10 text-white/60 hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                          <span className="font-extrabold text-primary-100">
                            STEP {st.stepNum} · {st.mechanicTitle}
                          </span>
                          <span>{st.timeStamp}</span>
                        </div>
                        <div className="text-[13px] font-extrabold text-white mt-1">
                          {st.label}
                        </div>
                        <div className="text-[11px] text-white/70 mt-0.5 leading-snug">
                          {st.detail}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — WHAT'S EATING YOUR WEEK? THE STICKY-NOTE WALL (WHITE, id="task-wall")
      ====================================================================== */}
      <section id="task-wall" className="py-[72px] lg:py-[112px] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Live Counter & Suggest Button */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                INTERACTIVE TASK TRIAGE
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Let&apos;s Find <span className="text-primary">Your Busywork</span>
              </h2>
              <p className="mt-3 text-[16px] text-navy-70 leading-[1.65]">
                Click any sticky note on the wall (or drag it on desktop) and sort it into{' '}
                <strong className="text-navy">Automate fully</strong>,{' '}
                <strong className="text-navy">AI-assist</strong>, or{' '}
                <strong className="text-navy">Keep human</strong> — or press{' '}
                <strong className="text-primary">&ldquo;Suggest for me&rdquo;</strong> to see our
                recommended split.
              </p>
            </div>

            {/* Live Hours Counter + Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                aria-live="polite"
                className="px-5 py-3 rounded-2xl bg-navy text-white border border-navy shadow-soft flex items-center gap-3"
              >
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/70">
                    Hours you could get back each week:
                  </div>
                  <div className="font-mono text-[22px] font-extrabold text-primary-100 leading-tight">
                    {hoursSavedPerWeek} hrs / week
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSuggestForMe}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white text-[14px] font-bold shadow-soft transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Suggest for me</span>
              </button>

              <button
                type="button"
                onClick={handleResetWall}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full border border-navy-15 hover:border-primary text-navy hover:text-primary text-[13px] font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Wall</span>
              </button>
            </div>
          </div>

          {/* Soft Light-Tint Sticky-Note Wall */}
          <div className="rounded-[26px] bg-primary-50/55 border border-primary-100 p-5 sm:p-8 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <span className="font-mono text-[12px] font-extrabold uppercase tracking-wider text-navy">
                UNSORTED STICKY-NOTE WALL ({wallTasks.length} OF {STICKY_TASKS.length} ON WALL)
              </span>
              <span className="text-[12px] font-semibold text-navy-60">
                Click a sticky note&apos;s quick-sort buttons or drag it into a column below
              </span>
            </div>

            {wallTasks.length === 0 ? (
              <div className="py-10 text-center rounded-2xl bg-white/80 border border-dashed border-primary/40">
                <p className="font-caveat text-[24px] text-primary font-bold">
                  All 12 sticky notes sorted! Your wall is clear.
                </p>
                <p className="text-[13px] text-navy-70 mt-1">
                  Review your 3 columns below or click &ldquo;Reset Wall&rdquo; to re-sort.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {wallTasks.map((note) => {
                  const isSelected = selectedStickyId === note.id;
                  return (
                    <motion.div
                      key={note.id}
                      layout={!shouldReduceMotion}
                      draggable
                      onDragStart={() => setDraggedStickyId(note.id)}
                      onDragEnd={() => setDraggedStickyId(null)}
                      onClick={() => setSelectedStickyId(note.id)}
                      style={{
                        transform: shouldReduceMotion ? undefined : `rotate(${note.rotationDeg}deg)`,
                      }}
                      className={`p-4 rounded-[18px] bg-primary-50 border-2 transition-all shadow-soft flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-primary-100 hover:border-primary'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                          <span className="font-mono text-[11px] font-bold text-primary bg-white px-2 py-0.5 rounded-full border border-primary-100">
                            ~{note.hoursPerWeek}h / wk
                          </span>
                        </div>

                        <p className="font-caveat text-[23px] leading-[1.2] font-bold text-navy my-1">
                          &ldquo;{note.text}&rdquo;
                        </p>
                      </div>

                      {/* Accessible Sort Buttons right on the Note */}
                      <div className="mt-3 pt-2.5 border-t border-primary-100/80">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-navy-60 mb-1.5">
                          Send note to:
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              assignTaskToBucket(note.id, 'automate');
                            }}
                            className="py-1.5 px-1.5 rounded-lg bg-primary text-white text-[11px] font-bold hover:bg-primary-700 transition-colors cursor-pointer"
                          >
                            Automate
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              assignTaskToBucket(note.id, 'assist');
                            }}
                            className="py-1.5 px-1.5 rounded-lg bg-white text-primary border border-primary/40 text-[11px] font-bold hover:bg-primary-100 transition-colors cursor-pointer"
                          >
                            AI-assist
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              assignTaskToBucket(note.id, 'human');
                            }}
                            className="py-1.5 px-1.5 rounded-lg bg-navy text-white text-[11px] font-bold hover:bg-navy-80 transition-colors cursor-pointer"
                          >
                            Human
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3 Destination Columns Below the Wall */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                key: 'automate' as const,
                title: 'Automate fully',
                subtitle: '100% of preset hours saved · Runs end-to-end on rules + AI',
                badgeColor: 'bg-primary text-white',
                tasks: automateTasks,
              },
              {
                key: 'assist' as const,
                title: 'AI-assist',
                subtitle: '50% of preset hours saved · AI drafts & sorts, human clicks send',
                badgeColor: 'bg-primary-50 text-primary border border-primary-100',
                tasks: assistTasks,
              },
              {
                key: 'human' as const,
                title: 'Keep human',
                subtitle: 'High-empathy or final negotiation tasks kept with your team',
                badgeColor: 'bg-navy text-white',
                tasks: humanTasks,
              },
            ].map((col) => (
              <div
                key={col.key}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggedStickyId) {
                    assignTaskToBucket(draggedStickyId, col.key);
                    setDraggedStickyId(null);
                  }
                }}
                className="rounded-[22px] bg-white border-2 border-navy-08 hover:border-primary/40 p-5 shadow-soft flex flex-col justify-between min-h-[250px]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-navy-08">
                    <div>
                      <h3 className="text-[19px] font-extrabold text-navy">{col.title}</h3>
                      <p className="text-[12px] text-navy-60 mt-0.5">{col.subtitle}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full font-mono text-[12px] font-extrabold ${col.badgeColor}`}
                    >
                      {col.tasks.length}
                    </span>
                  </div>

                  {/* Sorted Notes inside Column */}
                  <div className="mt-4 space-y-2.5">
                    {col.tasks.length === 0 ? (
                      <div className="py-8 text-center rounded-xl bg-primary-50/35 border border-dashed border-navy-15 text-[13px] text-navy-50">
                        Click a sticky note above (or drag here) to add to{' '}
                        <strong className="text-navy">{col.title}</strong>
                      </div>
                    ) : (
                      col.tasks.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-primary-50/70 border border-primary-100 flex items-start justify-between gap-3"
                        >
                          <div>
                            <div className="font-caveat text-[20px] font-bold text-navy leading-snug">
                              {item.text}
                            </div>
                            <div className="text-[11px] text-navy-70 mt-0.5">{item.reason}</div>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="font-mono text-[11px] font-bold text-primary">
                              {col.key === 'automate'
                                ? `+${item.hoursPerWeek}h`
                                : col.key === 'assist'
                                ? `+${item.hoursPerWeek * 0.5}h`
                                : '0h'}
                            </span>
                            <button
                              type="button"
                              onClick={() => assignTaskToBucket(item.id, 'wall')}
                              className="text-[11px] font-semibold text-navy-50 hover:text-navy underline cursor-pointer"
                            >
                              Return
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — AUTOMATION RECIPES: THE PLAYLIST (LIGHT BLUE TINT)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50/60 border-y border-primary-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              READY-TO-DEPLOY WORKFLOWS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Popular Automations, <span className="text-primary">Ready to Play</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Press play on any track below to inspect the step-by-step flow and the apps connected.
              Each duration shows illustrative hours saved per week for a typical operations team.
            </p>
          </div>

          {/* Music-Player-Style Playlist Card */}
          <div className="rounded-[28px] bg-white border border-navy-08 shadow-xl overflow-hidden">
            {/* Playlist Header w/ Cover Tile ("Ops Hits — Vol. 1") & Controls */}
            <div className="bg-navy text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {/* Cover Tile */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary flex flex-col items-center justify-center text-center p-2 shadow-lg shrink-0 border border-white/20">
                  <Music className="w-6 h-6 text-white mb-1" />
                  <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-white">
                    OPS HITS
                  </span>
                  <span className="font-caveat text-[18px] font-bold text-white leading-none">
                    Vol. 1
                  </span>
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                    <span>CURATED WORKFLOW PLAYLIST</span>
                    <span>·</span>
                    <span>7 TRACKS</span>
                  </div>
                  <h3 className="text-[24px] sm:text-[30px] font-extrabold text-white mt-1">
                    Ops Hits — Vol. 1
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-white/75 mt-1">
                    High-impact business automations across Leads, Finance, Support, Orders &amp;
                    HR.
                  </p>
                </div>
              </div>

              {/* Player Transport Controls */}
              <div className="flex items-center gap-3 self-start md:self-center">
                <button
                  type="button"
                  onClick={() => setIsPlaylistPaused((p) => !p)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary-700 text-white text-[13px] font-bold shadow-soft transition-all cursor-pointer"
                >
                  {isPlaylistPaused ? (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Resume Flow</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Flow</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const currIdx = PLAYLIST_RECIPES.findIndex((r) => r.id === playingTrackId);
                    const nextIdx = (currIdx + 1) % PLAYLIST_RECIPES.length;
                    setPlayingTrackId(PLAYLIST_RECIPES[nextIdx].id);
                    setIsPlaylistPaused(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-[13px] font-bold transition-colors cursor-pointer"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Next Track</span>
                </button>
              </div>
            </div>

            {/* Tracklist Rows (7 Tracks) */}
            <div className="divide-y divide-navy-08">
              {PLAYLIST_RECIPES.map((track) => {
                const isPlaying = playingTrackId === track.id;
                return (
                  <div
                    key={track.id}
                    className={`transition-colors ${
                      isPlaying ? 'bg-primary-50/45' : 'bg-white hover:bg-primary-50/20'
                    }`}
                  >
                    {/* Track Main Button Row */}
                    <button
                      type="button"
                      aria-expanded={isPlaying}
                      onClick={() => handleToggleTrack(track.id)}
                      className="w-full p-4 sm:p-5 text-left flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start sm:items-center gap-4 min-w-0">
                        <span
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-[12px] font-extrabold shrink-0 transition-colors ${
                            isPlaying
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-primary-50 text-primary'
                          }`}
                        >
                          {isPlaying && !isPlaylistPaused ? '▶' : track.trackNum}
                        </span>

                        <div className="min-w-0">
                          <div className="text-[15px] sm:text-[16px] font-extrabold text-navy leading-snug">
                            {track.title}
                          </div>
                          {/* Apps Involved Text Chips */}
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            {track.apps.map((app) => (
                              <span
                                key={app}
                                className="px-2.5 py-0.5 rounded-md bg-white border border-navy-15 text-[11px] font-semibold text-navy-70"
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Duration = Time Saved per Week */}
                      <div className="flex items-center justify-between lg:justify-end gap-4 pl-14 lg:pl-0 shrink-0">
                        <div className="text-right">
                          <div className="font-mono text-[14px] font-extrabold text-primary">
                            {track.durationSaved}
                          </div>
                          <div className="font-mono text-[10px] uppercase text-navy-50">
                            saved / week
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-navy text-white text-[11px] font-bold">
                          {isPlaying ? 'Inspecting' : 'Play ▶'}
                        </span>
                      </div>
                    </button>

                    {/* Expanded Mini Flow (3-5 rounded step pills connected by thin lines) */}
                    <AnimatePresence initial={false}>
                      {isPlaying && (
                        <motion.div
                          initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-6 pb-6 pt-2 sm:pl-18">
                            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-primary-100 shadow-soft">
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                                  LIVE STEP SEQUENCE · NOW PLAYING
                                </span>
                                <span className="text-[12px] text-navy-70 font-medium">
                                  {track.summary}
                                </span>
                              </div>

                              {/* Connected Step Pills */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
                                {track.flowSteps.map((stepLabel, sIdx) => (
                                  <motion.div
                                    key={stepLabel}
                                    initial={
                                      shouldReduceMotion ? false : { opacity: 0.4, scale: 0.98 }
                                    }
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: shouldReduceMotion ? 0 : sIdx * 0.12 }}
                                    className="p-3.5 rounded-xl bg-primary-50/70 border border-primary/30 flex items-center gap-3 relative"
                                  >
                                    <span className="w-6 h-6 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold flex items-center justify-center shrink-0">
                                      {sIdx + 1}
                                    </span>
                                    <span className="text-[13px] font-bold text-navy leading-snug">
                                      {stepLabel}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom "Now Playing" Bar with Animated Equalizer */}
            <div className="bg-navy text-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Animated Equalizer Bars */}
                <div
                  className="flex items-end gap-1 h-5 px-2 py-1 rounded bg-primary/20 border border-primary/40 shrink-0"
                  aria-hidden="true"
                >
                  {[0.5, 1, 0.7, 0.9].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: isPlaylistPaused ? '35%' : `${h * 100}%` }}
                      className={`w-1 bg-primary rounded-full transition-all ${
                        !isPlaylistPaused && !shouldReduceMotion ? 'animate-pulse' : ''
                      }`}
                    />
                  ))}
                </div>

                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-primary-100">
                    NOW PLAYING · TRACK {activeTrack.trackNum}
                  </div>
                  <div className="text-[13px] sm:text-[14px] font-bold text-white truncate">
                    {activeTrack.title}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => triggerQuoteModal(`Automation Recipe: ${activeTrack.title}`)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary-700 text-white text-[12px] font-bold shrink-0 self-start sm:self-center cursor-pointer"
              >
                <span>Deploy This Recipe →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — RULES VS AI: THE RAILWAY SWITCH (WHITE)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              INTENT ROUTING VS RIGID KEYWORDS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Old Automation Follows Rules.{' '}
              <span className="text-primary">AI Automation Understands.</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Real customers rarely type exact keywords. Toggle the railway switch below between{' '}
              <strong className="text-navy">Rule-based mode</strong> and{' '}
              <strong className="text-navy">AI mode</strong> to see how incoming messages are routed.
            </p>
          </div>

          {/* Interactive Controls Bar: 3 Sample Message Pills + Mode Switch */}
          <div className="rounded-[26px] bg-primary-50/45 border border-navy-08 p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-navy-08">
              {/* 3 Sample Messages Selectable via Pills */}
              <div>
                <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60 mb-2">
                  1. SELECT INCOMING MESSAGE TRAIN:
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {RAILWAY_MESSAGES.map((msg) => {
                    const active = msg.id === selectedRailwayMsgId;
                    return (
                      <button
                        key={msg.id}
                        type="button"
                        onClick={() => setSelectedRailwayMsgId(msg.id)}
                        className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer border ${
                          active
                            ? 'bg-navy text-white border-navy shadow-xs'
                            : 'bg-white text-navy border-navy-15 hover:border-primary'
                        }`}
                      >
                        {msg.pillLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mode Switch (Rule-based mode vs AI mode) using role="switch" */}
              <div className="flex flex-col sm:items-end">
                <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60 mb-2">
                  2. FLIP THE JUNCTION SWITCH:
                </div>
                <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white border border-navy-15">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={railwayMode === 'rules'}
                    onClick={() => setRailwayMode('rules')}
                    className={`px-4 py-2 rounded-full text-[13px] font-extrabold transition-all cursor-pointer ${
                      railwayMode === 'rules'
                        ? 'bg-navy text-white shadow-xs'
                        : 'text-navy-70 hover:text-navy'
                    }`}
                  >
                    Rule-based mode
                  </button>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={railwayMode === 'ai'}
                    onClick={() => setRailwayMode('ai')}
                    className={`px-4 py-2 rounded-full text-[13px] font-extrabold transition-all cursor-pointer ${
                      railwayMode === 'ai'
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-navy-70 hover:text-primary'
                    }`}
                  >
                    AI mode
                  </button>
                </div>
              </div>
            </div>

            {/* Stylized Railway Track Diagram */}
            <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left (4 cols): Incoming Train (Message Card) */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl bg-navy text-white p-5 border border-navy shadow-md">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-primary-100">
                      <TrainFront className="w-4 h-4 text-primary" />
                      <span>INCOMING MESSAGE TRAIN</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-[10px]">
                      LIVE INPUT
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-white/70 mb-1.5">
                    {activeRailwayMsg.sender}
                  </div>
                  <p className="text-[15px] font-bold text-white leading-relaxed bg-white/[0.06] p-3.5 rounded-xl border border-white/10">
                    &ldquo;{activeRailwayMsg.messageText}&rdquo;
                  </p>
                </div>
              </div>

              {/* Middle (4 cols): Railway Switch Junction & Signal Box SVG */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl bg-white border border-navy-15 p-4 text-center">
                  <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-2">
                    {railwayMode === 'ai'
                      ? 'AI SIGNAL BOX ACTIVE · TRACK SWITCHED'
                      : 'RIGID KEYWORD SWITCH · STRAIGHT SIDING'}
                  </div>

                  {/* Railway Track SVG */}
                  <svg
                    viewBox="0 0 320 140"
                    className="w-full h-auto"
                    aria-hidden="true"
                  >
                    {/* Main Left Track */}
                    <line
                      x1="10"
                      y1="70"
                      x2="130"
                      y2="70"
                      stroke="#1e242e"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    {/* Upper Branch (AI Destination Track) */}
                    <path
                      d="M 130 70 Q 190 70 230 34 L 308 34"
                      fill="none"
                      stroke={railwayMode === 'ai' ? '#0571c2' : 'rgba(30,36,46,0.2)'}
                      strokeWidth={railwayMode === 'ai' ? '6' : '4'}
                      strokeLinecap="round"
                    />
                    {/* Lower Branch (Rule-based Manual Queue Siding) */}
                    <path
                      d="M 130 70 Q 190 70 230 106 L 308 106"
                      fill="none"
                      stroke={railwayMode === 'rules' ? '#1e242e' : 'rgba(30,36,46,0.2)'}
                      strokeWidth={railwayMode === 'rules' ? '6' : '4'}
                      strokeDasharray={railwayMode === 'rules' ? '6 4' : undefined}
                      strokeLinecap="round"
                    />
                    {/* Switch Junction Point */}
                    <circle
                      cx="130"
                      cy="70"
                      r="9"
                      fill={railwayMode === 'ai' ? '#0571c2' : '#1e242e'}
                    />
                    {/* Moving Train Indicator Dot */}
                    <circle
                      cx="265"
                      cy={railwayMode === 'ai' ? 34 : 106}
                      r="8"
                      fill={railwayMode === 'ai' ? '#0571c2' : '#1e242e'}
                    />
                  </svg>

                  {/* Signal Box Readout */}
                  {railwayMode === 'ai' ? (
                    <div className="mt-2 p-2.5 rounded-xl bg-primary-50 border border-primary-100 font-mono text-[11px] font-bold text-primary">
                      {activeRailwayMsg.aiSignalIntent} · {activeRailwayMsg.aiSignalSentiment} ·{' '}
                      {activeRailwayMsg.aiSignalPriority}
                    </div>
                  ) : (
                    <div className="mt-2 p-2.5 rounded-xl bg-navy-08 border border-navy-15 font-mono text-[11px] font-bold text-navy">
                      {activeRailwayMsg.ruleCheck}
                    </div>
                  )}
                </div>
              </div>

              {/* Right (4 cols): Destination Station Card */}
              <div className="lg:col-span-4">
                {railwayMode === 'ai' ? (
                  <div className="rounded-2xl bg-primary text-white p-5 shadow-md">
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                      DESTINATION STATION · AI ROUTED ✓
                    </div>
                    <h3 className="text-[18px] font-extrabold text-white mt-1.5 leading-snug">
                      {activeRailwayMsg.aiDestinationStation}
                    </h3>
                    <p className="text-[13px] text-white/90 mt-2 leading-relaxed">
                      {activeRailwayMsg.aiActionTaken}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-navy/90 text-white p-5 border border-navy">
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-white/70">
                      MANUAL QUEUE SIDING · DERAILED
                    </div>
                    <h3 className="text-[18px] font-extrabold text-white mt-1.5 leading-snug">
                      {activeRailwayMsg.ruleResultStation}
                    </h3>
                    <p className="text-[13px] text-white/80 mt-2 leading-relaxed">
                      {activeRailwayMsg.ruleFailureNote}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Cross-link to AI Agents for Business */}
            <div className="mt-6 pt-4 border-t border-navy-08 flex flex-wrap items-center justify-between gap-2 text-[13px] text-navy-70">
              <span>
                Need goal-driven digital teammates or instant sales pipeline routing? Explore{' '}
                <Link
                  to="/ai-solutions/ai-agents-for-business"
                  className="text-primary font-extrabold underline hover:text-navy"
                >
                  AI Agents for Business →
                </Link>{' '}
                or{' '}
                <Link
                  to="/ai-solutions/crm-lead-automation"
                  className="text-primary font-extrabold underline hover:text-navy"
                >
                  CRM &amp; Lead Automation →
                </Link>
              </span>
              <span className="font-mono text-[11px] text-navy-50">
                Monitored · Logged · Human-approved
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AiWorkflowAutomation;
