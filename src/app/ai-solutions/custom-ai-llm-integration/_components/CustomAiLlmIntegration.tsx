'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Cpu,
  Database,
  FileText,
  Layers,
  Terminal,
  ShieldCheck,
  Sparkles,
  Settings,
  UserCheck,
  Compass,
  Sliders,
  Code2,
  GitMerge,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
} from 'lucide-react';
import { aiSolutions } from '@/app/ai-solutions/_components/AISolutions';

/* ============================================================================
   SINGLE SOURCE OF TRUTH IMPORT (`custom-ai-llm-integration` from AISolutions.tsx)
============================================================================ */
const CUSTOM_LLM_SOLUTION =
  aiSolutions.find((s: any) => s.slug === 'custom-ai-llm-integration') || {
    slug: 'custom-ai-llm-integration',
    name: 'Custom AI / LLM Integration',
    category: 'AI Build' as const,
    badge: null,
    tagline: 'Private RAG, document AI & custom LLM features integrated into your software',
    description:
      'We connect large language models to your apps, documents and systems — securely — to automate knowledge work, power new product features and help your teams move faster.',
  };

/* ============================================================================
   SECTION 1 DATA — HERO: THE AI LAYER ISOMETRIC SYSTEM BLOCKS
============================================================================ */
interface HeroSystemBlock {
  id: string;
  code: string;
  name: string;
  protocol: string;
  sampleRequest: string;
  sampleJsonResponse: string;
}

const HERO_SYSTEM_BLOCKS: HeroSystemBlock[] = [
  {
    id: 'sys-crm',
    code: 'NODE_01 // CRM',
    name: 'CRM',
    protocol: 'REST / Webhook',
    sampleRequest: 'POST /ai/enrich_lead { "notes": "Need 120 seats by Q2, budget approved" }',
    sampleJsonResponse:
      '{"intent":"enterprise_expansion","priority":"high","seat_count":120,"next_action":"assign_ae"}',
  },
  {
    id: 'sys-erp',
    code: 'NODE_02 // ERP',
    name: 'ERP',
    protocol: 'Batch / API',
    sampleRequest: 'POST /ai/parse_po { "file": "PO_4491_Apex_Industries.pdf" }',
    sampleJsonResponse:
      '{"vendor":"Apex Industries","po_no":"PO-4491","gst_verified":true,"line_items":14,"review_required":false}',
  },
  {
    id: 'sys-docs',
    code: 'NODE_03 // DOCS',
    name: 'Docs & Drive',
    protocol: 'Vector RAG Index',
    sampleRequest: 'POST /ai/rag_query { "q": "What is our SLA penalty clause in enterprise MSAs?" }',
    sampleJsonResponse:
      '{"answer":"99.9% uptime SLA; 5% service credit per 30m downtime.","citation":"MSA_Template_v4.pdf#p11"}',
  },
  {
    id: 'sys-db',
    code: 'NODE_04 // DB',
    name: 'Database',
    protocol: 'Read-Only SQL Tool',
    sampleRequest: 'POST /ai/nl_to_report { "q": "Compare Q3 vs Q4 churn in South region" }',
    sampleJsonResponse:
      '{"q3_churn_pct":3.8,"q4_churn_pct":2.4,"delta":"-1.4%","query_validated":true}',
  },
  {
    id: 'sys-app',
    code: 'NODE_05 // APP',
    name: 'Your App',
    protocol: 'Streaming SDK',
    sampleRequest: 'POST /ai/copilot_draft { "context": "user_dashboard_analytics" }',
    sampleJsonResponse:
      '{"feature":"in_app_copilot","summary":"3 anomalies flagged in weekly inventory turnover.","latency_ms":640}',
  },
  {
    id: 'sys-support',
    code: 'NODE_06 // DESK',
    name: 'Support Desk',
    protocol: 'Event Stream',
    sampleRequest: 'POST /ai/triage_ticket { "ticket_id": "TK-8821" }',
    sampleJsonResponse:
      '{"intent":"refund","priority":"high","summary":"Double-charged via UPI on order #9012; draft reply attached."}',
  },
];

/* ============================================================================
   SECTION 2 DATA — THE TRANSFORMER: MESSY INPUT, USEFUL OUTPUT (5 INPUTS)
============================================================================ */
interface TransformerInputSpec {
  id: string;
  label: string;
  inputDocName: string;
  inputFormatTag: string;
  messySnippet: string;
  processingStepsMono: [string, string, string];
  outputFormat: 'json' | 'bullets';
  outputTitle: string;
  jsonOutput?: string;
  bulletOutput?: {
    heading: string;
    bullets: string[];
    metaBadges: string[];
  };
  reviewerNote: string;
}

const TRANSFORMER_INPUTS: TransformerInputSpec[] = [
  {
    id: 'tf-invoice',
    label: 'Invoice PDF',
    inputDocName: 'INV_2026_8841_Scanned.pdf',
    inputFormatTag: '2-Page Multi-Column PDF · 412 KB',
    messySnippet:
      'TAX INVOICE // Shree Balaji Packaging Pvt Ltd · GSTIN 27AABCS1429B1Z · Inv #SBP/26-27/0841 Dt: 04-Oct-2026 · Corrugated 5-Ply Box (Qty 1,200 @ 42.00) · CGST 9% SGST 9% · Grand Total Rs. 59,472.00...',
    processingStepsMono: [
      'ocr.layout_extract()',
      'schema.validate(InvoiceV2)',
      'math.cross_check_totals()',
    ],
    outputFormat: 'json',
    outputTitle: 'Structured ERP-Ready JSON',
    jsonOutput: `{
  "vendor": "Shree Balaji Packaging Pvt Ltd",
  "gstin": "27AABCS1429B1Z",
  "invoice_no": "SBP/26-27/0841",
  "date": "2026-10-04",
  "subtotal_inr": 50400.00,
  "gst_total_inr": 9072.00,
  "total_inr": 59472.00,
  "line_items": [
    { "sku": "5PLY-CORR-BOX", "qty": 1200, "unit_rate": 42.00, "amount": 50400.00 }
  ],
  "totals_verified": true
}`,
    reviewerNote: 'Line-item sum & 18% GST math cross-checked before ERP sync.',
  },
  {
    id: 'tf-contract',
    label: 'Long Contract',
    inputDocName: 'Master_Services_Agreement_48pp.docx',
    inputFormatTag: '48-Page Legal DOCX · 18,400 Words',
    messySnippet:
      'SECTION 14.2 INDEMNIFICATION & LIMITATION OF LIABILITY: Notwithstanding anything to the contrary contained herein, Vendor aggregate liability shall not exceed 6 months of fees paid... Auto-renews for 24-month terms unless 90-day written notice...',
    processingStepsMono: [
      'chunk.section_split(48_pages)',
      'rag.extract_clauses()',
      'risk.flag_deviations()',
    ],
    outputFormat: 'bullets',
    outputTitle: '5-Bullet Summary + Key Dates + Risk Flags',
    bulletOutput: {
      heading: 'Contract Intelligence Brief (MSA-2026)',
      bullets: [
        'Scope & Term: 24-month initial enterprise software license starting 01-Nov-2026.',
        'Payment Terms: Net-45 days from invoice receipt; 1.5%/month late fee clause on page 9.',
        'Key Date Alert: Requires 90-day written notice prior to 31-Oct-2028 to prevent 2-year auto-renewal.',
        'Risk Flag [HIGH]: Liability cap limited to 6 months of fees (your standard policy requires 12 months).',
        'Risk Flag [MEDIUM]: Unilateral price escalation up to 12% upon renewal (Clause 8.4, p.19).',
      ],
      metaBadges: ['2 Risk Flags Highlighted', 'Page Citations Attached', 'Ready for Legal Review'],
    },
    reviewerNote: 'Legal counsel reviews flagged clauses with direct page jumps.',
  },
  {
    id: 'tf-ticket',
    label: 'Support Ticket',
    inputDocName: 'Ticket_9042_Incoming_Email.txt',
    inputFormatTag: 'Unstructured Customer Email',
    messySnippet:
      'Subject: URGENT!! Payment deducted twice for order #NV-7721. Hi team, I paid Rs 4,299 via UPI at 11:15 AM today. First attempt showed timed out so I paid again, now both debited from HDFC bank!! Please refund one immediately...',
    processingStepsMono: [
      'classify.intent_and_priority()',
      'lookup.payment_gateway(#NV-7721)',
      'draft.grounded_response()',
    ],
    outputFormat: 'json',
    outputTitle: 'Triage Metadata + Drafted Agent Reply',
    jsonOutput: `{
  "ticket_id": "TK-9042",
  "category": "Billing / Duplicate UPI Debit",
  "priority": "HIGH",
  "sentiment": "Distressed / Urgent",
  "order_id": "NV-7721",
  "gateway_check": "2 captures found (Txn_A settled, Txn_B auto-refund queued)",
  "suggested_reply": "Hi! We verified Order #NV-7721. The duplicate UPI debit of ₹4,299 (Ref #428190) has been initiated for instant refund and will reflect in your HDFC account within 24–48 hours."
}`,
    reviewerNote: 'Support agent approves & sends the pre-filled reply in one click.',
  },
  {
    id: 'tf-call',
    label: 'Call Recording',
    inputDocName: 'Discovery_Call_42min.wav',
    inputFormatTag: '42-Min Sales Call Audio · Hinglish + English',
    messySnippet:
      '[00:14:22] Prospect: Humara current warehouse dispatch sheet Excel pe chalta hai, roz 400 orders mein 2 ghante lagte hain... [00:28:10] Rep: We can connect your tally ERP and shiprocket webhook before Dec 15...',
    processingStepsMono: [
      'asr.transcribe_diarize()',
      'extract.action_items()',
      'crm.prepare_field_updates()',
    ],
    outputFormat: 'bullets',
    outputTitle: 'Transcript Excerpt + Action Items + CRM Update',
    bulletOutput: {
      heading: 'Call Summary & Structured CRM Sync',
      bullets: [
        'Transcript Excerpt (14:22): Prospect manages 400 daily orders manually on spreadsheets (~2 hrs/day lost).',
        'Action Item 01 (Owner: Solutions Architect): Share Tally + courier webhook architecture diagram by Thursday.',
        'Action Item 02 (Owner: Account Exec): Send Phase-1 fixed POC proposal for ₹[X] before Friday 5 PM.',
        'CRM Stage Update: Deal moved from "Discovery" → "Technical Scoping" · Target Go-Live: 15 Dec.',
        'Competitor / Blocker Logged: Needs on-premise connector for legacy inventory table.',
      ],
      metaBadges: ['CRM Fields Pre-Filled', '2 Follow-Up Tasks Created', 'Hinglish Diarized'],
    },
    reviewerNote: 'Account executive verifies CRM field diff before committing.',
  },
  {
    id: 'tf-specs',
    label: 'Product Specs Sheet',
    inputDocName: 'SKU_9920_Industrial_Pump_Raw.csv',
    inputFormatTag: 'Raw Engineering CSV Row',
    messySnippet:
      'SKU: IP-220-SS316 | Mat: 316 Stainless | Flow: 180 LPM | Head: 42m | Motor: 3HP 3-Phase IE3 | Seal: Viton Mechanical | Temp: -10C to +120C | Cert: ISO9001, CE | Appl: Pharma, Food, Chemical transfer...',
    processingStepsMono: [
      'parse.spec_attributes()',
      'retrieve.brand_style_guide()',
      'generate.seo_product_copy()',
    ],
    outputFormat: 'bullets',
    outputTitle: 'SEO-Ready Product Description (Human Review Badge)',
    bulletOutput: {
      heading: 'Catalog Copy · SKU IP-220-SS316 (316SS Centrifugal Pump)',
      bullets: [
        'SEO Title: 3 HP SS316 Sanitary Centrifugal Transfer Pump (180 LPM, 42m Head, IE3 Motor)',
        'Overview: Engineered from corrosion-resistant 316 stainless steel with Viton mechanical seals, the IP-220 delivers reliable 180 LPM flow across -10°C to +120°C operating ranges.',
        'Key Specs Structured: 3 HP IE3 high-efficiency 3-phase motor · 42m max head · ISO 9001 & CE certified.',
        'Ideal Applications: Pharmaceutical batch transfer, food-grade liquid processing, and specialty chemical lines.',
        'Guardrail Check: Zero unverified performance claims added; 100% matched to raw CSV spec sheet.',
      ],
      metaBadges: ['Human Review Badge: Approved', 'Spec-Faithful', 'Schema.org JSON Ready'],
    },
    reviewerNote: 'Catalog manager approves batch before publishing to store.',
  },
];

/* ============================================================================
   SECTION 3 DATA — WHICH APPROACH? THE 2×2 QUADRANT
============================================================================ */
type QuadrantZoneId = 'prompting' | 'rag' | 'finetuning' | 'agents';

interface QuadrantZoneSpec {
  id: QuadrantZoneId;
  quadrantPosition: string;
  title: string;
  shortSubtitle: string;
  xLevel: 'Low' | 'High';
  yLevel: 'Low' | 'High';
  whenToUse: string;
  typicalTimeline: string;
  costDots: 1 | 2 | 3;
  costLabel: string;
  concreteExample: string;
  defaultDotCoords: { x: number; y: number }; // 0..100
}

const QUADRANT_ZONES: QuadrantZoneSpec[] = [
  {
    id: 'prompting',
    quadrantPosition: 'Bottom-Left',
    title: 'Prompt Engineering',
    shortSubtitle: 'Quick wins with general tasks',
    xLevel: 'Low',
    yLevel: 'Low',
    whenToUse:
      'When the model already knows the domain and you need structured formatting, summarization, translation, or classification on text passed directly in the request.',
    typicalTimeline: '1–2 Weeks (illustrative)',
    costDots: 1,
    costLabel: 'Low setup & runtime cost',
    concreteExample:
      'Summarizing incoming support emails into 3 bullet points, sentiment tags, and JSON categories using structured output schemas.',
    defaultDotCoords: { x: 25, y: 25 },
  },
  {
    id: 'rag',
    quadrantPosition: 'Bottom-Right',
    title: 'RAG (Retrieval-Augmented Generation)',
    shortSubtitle: 'Answers grounded in your documents',
    xLevel: 'High',
    yLevel: 'Low',
    whenToUse:
      'When answers must come strictly from your private PDFs, policies, SOPs, product catalogs, or database records—with page citations and fresh updates without retraining.',
    typicalTimeline: '2–5 Weeks (illustrative)',
    costDots: 2,
    costLabel: 'Moderate setup · Low ongoing cost',
    concreteExample:
      'An internal knowledge assistant that searches 2,500 HR, legal, and engineering documents and answers employee questions with exact source links.',
    defaultDotCoords: { x: 75, y: 25 },
  },
  {
    id: 'finetuning',
    quadrantPosition: 'Top-Left',
    title: 'Fine-Tuning',
    shortSubtitle: 'Consistent style/format or specialized classification',
    xLevel: 'Low',
    yLevel: 'High',
    whenToUse:
      'When you need a compact, fast model to follow a strict domain taxonomy, medical/legal shorthand, or brand voice across thousands of repetitive daily requests.',
    typicalTimeline: '3–6 Weeks (illustrative)',
    costDots: 2,
    costLabel: 'Higher upfront data prep · Lower per-call token cost',
    concreteExample:
      'Training a smaller model on 15,000 historical logistics descriptions to classify HS tariff codes with sub-200ms latency.',
    defaultDotCoords: { x: 25, y: 75 },
  },
  {
    id: 'agents',
    quadrantPosition: 'Top-Right',
    title: 'AI Agents + Tools',
    shortSubtitle: 'Multi-step tasks that read and act in your systems',
    xLevel: 'High',
    yLevel: 'High',
    whenToUse:
      'When the system must combine your private knowledge with live API tool calls—querying databases, checking inventory, drafting records, and requesting human approval.',
    typicalTimeline: '4–8 Weeks (illustrative)',
    costDots: 3,
    costLabel: 'Enterprise workflow scope',
    concreteExample:
      'An operations agent that reads a vendor claim, checks ERP delivery logs, verifies contract terms via RAG, and prepares a credit note draft for finance sign-off.',
    defaultDotCoords: { x: 75, y: 75 },
  },
];

/* ============================================================================
   SECTION 4 DATA — CHOOSING THE RIGHT MODEL: RADAR CHART (3 PROFILES, 5 AXES)
============================================================================ */
interface ModelProfileSpec {
  id: 'frontier' | 'fast-small' | 'open-source';
  name: string;
  examplesText: string;
  tagline: string;
  strokeColor: string;
  fillColor: string;
  dashArray?: string;
  // Scores 1..5 on the 5 Radar Axes: [Quality, Speed, Cost Efficiency, Data Control, Context Length]
  scores: {
    quality: number;
    speed: number;
    costEfficiency: number;
    dataControl: number;
    contextLength: number;
  };
  bestForBullets: string[];
}

const MODEL_PROFILES: ModelProfileSpec[] = [
  {
    id: 'frontier',
    name: 'Frontier Hosted Models',
    examplesText: 'e.g. GPT, Claude, Gemini',
    tagline: 'Highest reasoning depth & long-context document analysis via enterprise APIs',
    strokeColor: '#0571c2',
    fillColor: 'rgba(5, 113, 194, 0.24)',
    scores: {
      quality: 5,
      speed: 3,
      costEfficiency: 3,
      dataControl: 3,
      contextLength: 5,
    },
    bestForBullets: [
      'Complex multi-step reasoning, contract analysis & code generation',
      'Fastest time-to-market for Proofs of Concept and high-stakes synthesis',
    ],
  },
  {
    id: 'fast-small',
    name: 'Fast & Small Models',
    examplesText: 'e.g. lighter hosted models',
    tagline: 'Sub-second latency & high cost-efficiency for high-volume classification and extraction',
    strokeColor: '#1e242e',
    fillColor: 'rgba(30, 36, 46, 0.16)',
    dashArray: '5 3',
    scores: {
      quality: 3.5,
      speed: 5,
      costEfficiency: 5,
      dataControl: 3,
      contextLength: 4,
    },
    bestForBullets: [
      'Real-time chat routing, ticket tagging, PII detection & JSON extraction',
      'Ideal for 70–80% of daily traffic in a smart model-routing setup',
    ],
  },
  {
    id: 'open-source',
    name: 'Open-Source Self-Hosted',
    examplesText: 'e.g. Llama, Mistral',
    tagline: 'Runs inside your own VPC or on-premise GPU servers for strict data sovereignty',
    strokeColor: '#045694',
    fillColor: 'rgba(5, 113, 194, 0.10)',
    dashArray: '2 3',
    scores: {
      quality: 4,
      speed: 4,
      costEfficiency: 4,
      dataControl: 5,
      contextLength: 3.5,
    },
    bestForBullets: [
      'Regulated finance, healthcare, defense, or strict VPC residency policies',
      'Predictable flat infrastructure cost at high sustained throughput',
    ],
  },
];

const RADAR_AXES: {
  key: keyof ModelProfileSpec['scores'];
  label: string;
  angleDeg: number;
}[] = [
  { key: 'quality', label: 'Quality', angleDeg: -90 },
  { key: 'speed', label: 'Speed', angleDeg: -18 },
  { key: 'costEfficiency', label: 'Cost Efficiency', angleDeg: 54 },
  { key: 'dataControl', label: 'Data Control', angleDeg: 126 },
  { key: 'contextLength', label: 'Context Length', angleDeg: 198 },
];

/* Helper to compute SVG (x,y) on a radar chart of center (150,150) and maxRadius 95 */
function getRadarPoint(angleDeg: number, valueOutOf5: number, maxRadius = 95) {
  const rad = (angleDeg * Math.PI) / 180;
  const r = (valueOutOf5 / 5) * maxRadius;
  return {
    x: 150 + r * Math.cos(rad),
    y: 150 + r * Math.sin(rad),
  };
}

/* ============================================================================
   MAIN COMPONENT: CustomAiLlmIntegration
============================================================================ */
interface CustomAiLlmIntegrationProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const CustomAiLlmIntegration: React.FC<CustomAiLlmIntegrationProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  const triggerQuoteModal = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: service }));
    }
  };

  /* ------------------------------------------------------------------------
     SECTION 1 STATE: Hero Isometric System Blueprint
  ------------------------------------------------------------------------ */
  const [activeSystemIndex, setActiveSystemIndex] = useState<number>(5); // Default Support Desk (`{"intent":"refund"...}`)
  const [isHeroPaused, setIsHeroPaused] = useState<boolean>(false);

  useEffect(() => {
    if (shouldReduceMotion || isHeroPaused) return;
    const timer = setInterval(() => {
      setActiveSystemIndex((prev) => (prev + 1) % HERO_SYSTEM_BLOCKS.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, isHeroPaused]);

  const activeHeroSystem =
    HERO_SYSTEM_BLOCKS[activeSystemIndex] || HERO_SYSTEM_BLOCKS[5];

  /* ------------------------------------------------------------------------
     SECTION 2 STATE: The Transformer Machine
  ------------------------------------------------------------------------ */
  const [selectedTransformerId, setSelectedTransformerId] = useState<string>(
    TRANSFORMER_INPUTS[0].id
  );
  const [isProcessingDoc, setIsProcessingDoc] = useState<boolean>(false);
  const [humanReviewApproved, setHumanReviewApproved] = useState<boolean>(true);

  const activeTransformer =
    TRANSFORMER_INPUTS.find((t) => t.id === selectedTransformerId) || TRANSFORMER_INPUTS[0];

  const handleSelectTransformerInput = (id: string) => {
    setSelectedTransformerId(id);
    if (!shouldReduceMotion) {
      setIsProcessingDoc(true);
      setTimeout(() => {
        setIsProcessingDoc(false);
      }, 420);
    }
  };

  /* ------------------------------------------------------------------------
     SECTION 3 STATE: 2×2 Quadrant Chart + Draggable / Keyboard "Your Project" Dot
  ------------------------------------------------------------------------ */
  const [projectDot, setProjectDot] = useState<{ x: number; y: number }>({ x: 75, y: 25 }); // Starts in RAG

  const activeQuadrantId: QuadrantZoneId = useMemo(() => {
    if (projectDot.x < 50 && projectDot.y < 50) return 'prompting';
    if (projectDot.x >= 50 && projectDot.y < 50) return 'rag';
    if (projectDot.x < 50 && projectDot.y >= 50) return 'finetuning';
    return 'agents';
  }, [projectDot]);

  const activeQuadrantSpec =
    QUADRANT_ZONES.find((z) => z.id === activeQuadrantId) || QUADRANT_ZONES[1];

  const handleSelectQuadrantZone = (zone: QuadrantZoneSpec) => {
    setProjectDot(zone.defaultDotCoords);
  };

  const nudgeProjectDot = (dx: number, dy: number) => {
    setProjectDot((prev) => ({
      x: Math.max(8, Math.min(92, prev.x + dx)),
      y: Math.max(8, Math.min(92, prev.y + dy)),
    }));
  };

  /* ------------------------------------------------------------------------
     SECTION 4 STATE: Radar Chart Model Profile Toggles
  ------------------------------------------------------------------------ */
  const [selectedModelIds, setSelectedModelIds] = useState<ModelProfileSpec['id'][]>([
    'frontier',
    'fast-small',
  ]);

  const toggleModelProfile = (id: ModelProfileSpec['id']) => {
    setSelectedModelIds((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((item) => item !== id) : prev;
      }
      return [...prev, id];
    });
  };

  /* ------------------------------------------------------------------------
     SEO TITLE & META DESCRIPTION
  ------------------------------------------------------------------------ */
  useEffect(() => {
    document.title =
      'Custom AI & LLM Integration Services | RAG, Document AI & Private AI | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Integrate large language models into your products, documents, and workflows with RAG, Document AI, structured extraction, evaluation pipelines, and private cloud or on-premise deployment.'
      );
    }
  }, []);

  return (
    <main className="flex-1 bg-white text-navy">
      {/* ======================================================================
         SECTION 1 — HERO: THE AI LAYER (NAVY ISOMETRIC ARCHITECTURE BLUEPRINT)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
        <div className="absolute -right-24 -top-20 w-[600px] h-[600px] blue-glow-strong pointer-events-none" />
        <div className="absolute -left-24 bottom-0 w-[460px] h-[460px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb: Home › AI Solutions › Custom AI / LLM Integration */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/70 mb-7"
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
              {CUSTOM_LLM_SOLUTION.name}
            </span>
          </nav>

          {/* 50/50 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 50% (6 cols) */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Cpu className="w-3.5 h-3.5 text-primary" />
                <span>CUSTOM AI / LLM INTEGRATION</span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-[-0.02em]">
                AI Built Into{' '}
                <span className="text-primary">Your Products, Data and Workflows</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-xl">
                We connect large language models to your apps, documents and systems — securely —
                to automate knowledge work, power new product features and help your teams move
                faster.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#ai-spec"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft transition-all"
                >
                  <span>Book a Free AI Feasibility Call</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#transformer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>See the Transformer</span>
                </a>
              </div>

              {/* Small Capabilities Row */}
              <div className="mt-9 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5 text-[13px] font-semibold text-white/80">
                <span>RAG</span>
                <span className="text-primary">·</span>
                <span>Document AI</span>
                <span className="text-primary">·</span>
                <span>AI Features</span>
                <span className="text-primary">·</span>
                <span>Agents</span>
                <span className="text-primary">·</span>
                <span>Private Deployment</span>
              </div>
            </div>

            {/* Right 50% (6 cols): Isometric Architecture Blueprint + Translucent AI Layer Plane */}
            <div
              className="lg:col-span-6"
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
            >
              <div className="rounded-[26px] bg-white/[0.04] border border-primary/40 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
                {/* Blueprint Top Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary-100">
                      ARCH_BLUEPRINT // ENTERPRISE AI LAYER
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-white/65">
                    Click any system node to trace
                  </span>
                </div>

                {/* Top Row of 3 Isometric System Blocks (CRM · ERP · Docs & Drive) */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {HERO_SYSTEM_BLOCKS.slice(0, 3).map((block, idx) => {
                    const isSelected = idx === activeSystemIndex;
                    return (
                      <button
                        key={block.id}
                        type="button"
                        onClick={() => {
                          setActiveSystemIndex(idx);
                          setIsHeroPaused(true);
                        }}
                        className={`text-left p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer -skew-x-2 ${
                          isSelected
                            ? 'bg-primary text-white border-white shadow-lg scale-[1.02]'
                            : 'bg-navy/90 text-white border-primary/35 hover:border-primary'
                        }`}
                      >
                        <div className="font-mono text-[9px] sm:text-[10px] font-bold text-primary-100 truncate">
                          {block.code}
                        </div>
                        <div className="text-[13px] sm:text-[14px] font-extrabold text-white mt-0.5 truncate">
                          {block.name}
                        </div>
                        <div className="font-mono text-[10px] text-white/70 mt-1 truncate">
                          {block.protocol}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Connection Lines into the AI Layer Plane */}
                <div className="grid grid-cols-3 gap-3 px-6 py-1.5" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex justify-center">
                      <div
                        className={`w-0.5 h-5 transition-colors ${
                          activeSystemIndex === i ? 'bg-primary' : 'bg-primary/30'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Translucent Glowing "AI Layer" Horizontal Glass Plane */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45 }}
                  className="rounded-2xl bg-gradient-to-r from-primary/35 via-primary/20 to-primary/35 border-2 border-primary backdrop-blur-md p-4 shadow-xl relative"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[13px] sm:text-[14px] font-extrabold text-white tracking-wide">
                          THE AI LAYER · GUARDRAILED LLM GATEWAY
                        </div>
                        <div className="font-mono text-[10px] text-primary-100">
                          PII Masking → Vector RAG → Model Router → Schema Validator
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-navy border border-primary/50 font-mono text-[10px] font-bold text-primary-100">
                      ACTIVE: {activeHeroSystem.name.toUpperCase()}
                    </span>
                  </div>
                </motion.div>

                {/* Connection Lines out to Bottom 3 Isometric System Blocks */}
                <div className="grid grid-cols-3 gap-3 px-6 py-1.5" aria-hidden="true">
                  {[3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-center">
                      <div
                        className={`w-0.5 h-5 transition-colors ${
                          activeSystemIndex === i ? 'bg-primary' : 'bg-primary/30'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Bottom Row of 3 Isometric System Blocks (Database · Your App · Support Desk) */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {HERO_SYSTEM_BLOCKS.slice(3, 6).map((block, offsetIdx) => {
                    const idx = offsetIdx + 3;
                    const isSelected = idx === activeSystemIndex;
                    return (
                      <button
                        key={block.id}
                        type="button"
                        onClick={() => {
                          setActiveSystemIndex(idx);
                          setIsHeroPaused(true);
                        }}
                        className={`text-left p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer -skew-x-2 ${
                          isSelected
                            ? 'bg-primary text-white border-white shadow-lg scale-[1.02]'
                            : 'bg-navy/90 text-white border-primary/35 hover:border-primary'
                        }`}
                      >
                        <div className="font-mono text-[9px] sm:text-[10px] font-bold text-primary-100 truncate">
                          {block.code}
                        </div>
                        <div className="text-[13px] sm:text-[14px] font-extrabold text-white mt-0.5 truncate">
                          {block.name}
                        </div>
                        <div className="font-mono text-[10px] text-white/70 mt-1 truncate">
                          {block.protocol}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Floating Terminal Card: Request & JSON Response */}
                <div
                  className="mt-5 rounded-2xl bg-navy border border-white/15 p-4 font-mono text-[11px] sm:text-[12px]"
                  aria-label="Live API request and structured JSON response preview"
                  aria-live="polite"
                >
                  <div className="flex items-center justify-between text-white/60 pb-2 mb-2 border-b border-white/10">
                    <span className="inline-flex items-center gap-1.5 text-primary-100 font-bold">
                      <Terminal className="w-3.5 h-3.5 text-primary" />
                      <span>LIVE PAYLOAD // {activeHeroSystem.name.toUpperCase()}</span>
                    </span>
                    <span>schema_valid: true</span>
                  </div>
                  <div className="text-white/80 truncate">{activeHeroSystem.sampleRequest}</div>
                  <div className="mt-1.5 text-primary-100 font-semibold break-all">
                    → {activeHeroSystem.sampleJsonResponse}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — THE TRANSFORMER: MESSY INPUT, USEFUL OUTPUT (WHITE, id="transformer")
      ====================================================================== */}
      <section id="transformer" className="py-[72px] lg:py-[112px] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Human Review Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                UNSTRUCTURED TO STRUCTURED PIPELINE
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                From <span className="text-primary">Messy Data</span> to{' '}
                <span className="text-primary">Useful Answers</span>
              </h2>
              <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
                Select any messy business input below to drop it into the transformer hopper and
                inspect the structured JSON or executive brief it produces.
              </p>
            </div>

            {/* Human-in-the-Loop Review Toggle */}
            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-primary-50/70 border border-primary-100 self-start lg:self-auto">
              <span className="text-[12px] font-bold text-navy pl-2">Human review step:</span>
              <button
                type="button"
                role="switch"
                aria-checked={humanReviewApproved}
                onClick={() => setHumanReviewApproved((prev) => !prev)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-[11px] font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  humanReviewApproved
                    ? 'bg-navy text-white shadow-2xs'
                    : 'bg-white text-navy-60 border border-navy-15'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-primary" />
                <span>{humanReviewApproved ? 'ON (Reviewer Approved)' : 'OFF (Auto-Commit)'}</span>
              </button>
            </div>
          </div>

          {/* 5 Input Selector Pills Above the Machine */}
          <div
            className="flex flex-wrap items-center gap-2.5 mb-8"
            role="tablist"
            aria-label="Select messy input document type"
          >
            {TRANSFORMER_INPUTS.map((item) => {
              const active = item.id === selectedTransformerId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectTransformerInput(item.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-[13px] sm:text-[14px] font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    active
                      ? 'bg-navy text-white border-navy shadow-soft'
                      : 'bg-white text-navy border-navy-15 hover:border-primary hover:text-primary'
                  }`}
                >
                  <FileText className={`w-4 h-4 ${active ? 'text-primary' : 'text-primary'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Horizontal Machine Illustration: Left Input Hopper (4 cols) | Middle Chamber (3 cols) | Right Output Tray (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Input Hopper */}
            <div className="lg:col-span-4 rounded-[24px] bg-primary-50/50 border-2 border-navy-15 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-08">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    01. INPUT HOPPER
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white font-mono text-[10px] font-bold text-navy-60 border border-navy-08">
                    RAW FILE
                  </span>
                </div>

                {/* Dropped Document Card */}
                <motion.div
                  key={activeTransformer.id}
                  initial={shouldReduceMotion ? false : { y: -16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 rounded-2xl bg-white border border-navy-15 shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[13px] font-extrabold text-navy truncate">
                        {activeTransformer.inputDocName}
                      </div>
                      <div className="text-[11px] text-navy-60">
                        {activeTransformer.inputFormatTag}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3.5 p-3 rounded-xl bg-primary-50/40 border border-navy-08 font-mono text-[11px] text-navy-70 leading-relaxed">
                    {activeTransformer.messySnippet}
                  </div>
                </motion.div>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-08 font-mono text-[11px] text-navy-60 flex items-center justify-between">
                <span>STATUS: FED INTO CHAMBER</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </div>

            {/* Middle: Glowing Processing Chamber */}
            <div className="lg:col-span-3 rounded-[24px] bg-navy text-white p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 blue-glow pointer-events-none opacity-60" />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                    02. CHAMBER
                  </span>
                  <Settings
                    className={`w-4 h-4 text-primary ${
                      isProcessingDoc && !shouldReduceMotion ? 'animate-spin' : ''
                    }`}
                  />
                </div>

                <div className="text-[15px] font-extrabold text-white mb-3">
                  Schema &amp; Grounding Engine
                </div>

                {/* 3 Pipeline Bars */}
                <div className="space-y-2.5">
                  {activeTransformer.processingStepsMono.map((stepName, i) => (
                    <div
                      key={stepName}
                      className="p-3 rounded-xl bg-white/[0.06] border border-primary/40"
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-primary-100 mb-1">
                        <span>STAGE 0{i + 1}</span>
                        <span>OK</span>
                      </div>
                      <div className="font-mono text-[12px] font-bold text-white truncate">
                        {stepName}
                      </div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-full bg-primary rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/10 font-mono text-[10px] text-white/70">
                Strict JSON Schema / Citation Guardrails Applied
              </div>
            </div>

            {/* Right: Output Tray (JSON in Navy Code Panel OR Bullets in White Card) */}
            <div
              className="lg:col-span-5 rounded-[24px] border-2 border-primary bg-white p-5 sm:p-6 flex flex-col justify-between shadow-xl"
              aria-live="polite"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-navy-08">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                      03. OUTPUT TRAY
                    </span>
                    <h3 className="text-[17px] font-extrabold text-navy mt-0.5">
                      {activeTransformer.outputTitle}
                    </h3>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary font-mono text-[10px] font-bold">
                    {activeTransformer.outputFormat === 'json' ? 'JSON_SCHEMA' : 'STRUCTURED_BRIEF'}
                  </span>
                </div>

                {/* Output Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTransformer.id}
                    initial={shouldReduceMotion ? false : { x: 14, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {activeTransformer.outputFormat === 'json' && activeTransformer.jsonOutput ? (
                      <pre
                        aria-label={`Structured JSON output for ${activeTransformer.label}`}
                        className="rounded-2xl bg-navy text-primary-100 p-4 font-mono text-[11px] sm:text-[12px] leading-relaxed overflow-x-auto border border-navy"
                      >
                        <code>{activeTransformer.jsonOutput}</code>
                      </pre>
                    ) : (
                      activeTransformer.bulletOutput && (
                        <div className="rounded-2xl bg-primary-50/40 border border-navy-08 p-4 space-y-3">
                          <div className="font-mono text-[12px] font-extrabold text-navy">
                            {activeTransformer.bulletOutput.heading}
                          </div>
                          <ul className="space-y-2">
                            {activeTransformer.bulletOutput.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-start gap-2 text-[12px] sm:text-[13px] text-navy leading-snug"
                              >
                                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="pt-2 flex flex-wrap gap-1.5">
                            {activeTransformer.bulletOutput.metaBadges.map((badge) => (
                              <span
                                key={badge}
                                className="px-2.5 py-0.5 rounded-full bg-white border border-primary-100 font-mono text-[10px] font-bold text-primary"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Human Review Approval Footer Strip */}
              <div className="mt-4 pt-3.5 border-t border-navy-08 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[12px] text-navy-70">
                  <UserCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>{activeTransformer.reviewerNote}</span>
                </div>
                {humanReviewApproved && (
                  <span className="px-2.5 py-1 rounded-full bg-navy text-white font-mono text-[10px] font-bold">
                    ✓ Reviewer Approved
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — WHICH APPROACH? THE QUADRANT (LIGHT BLUE TINT)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50/60 border-y border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              ARCHITECTURE DECISION MATRIX
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Prompting, RAG, Fine-Tuning or Agents?{' '}
              <span className="text-primary">We&apos;ll Pick What Fits.</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Most business problems do not need expensive model training from scratch. Click any
              quadrant zone or move the{' '}
              <strong className="font-bold text-navy">&ldquo;Your project&rdquo;</strong> marker to
              see our recommended engineering approach.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left (7 cols): 2×2 Quadrant Chart + Keyboard/Click Movable "Your Project" Dot */}
            <div className="lg:col-span-7 rounded-[26px] bg-white border border-navy-15 p-5 sm:p-7 shadow-soft flex flex-col justify-between">
              <div>
                {/* Top Axis Legend & Keyboard Dot Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-navy-08">
                  <div className="font-mono text-[11px] font-bold text-navy-70">
                    ↑ Y-AXIS: Needs custom behaviour / actions (low → high)
                  </div>

                  {/* Accessible Arrow Controls to Move "Your Project" Dot */}
                  <div
                    className="inline-flex items-center gap-1 p-1 rounded-xl bg-primary-50 border border-primary-100"
                    role="group"
                    aria-label="Move Your Project dot across the quadrant"
                  >
                    <span className="font-mono text-[10px] font-bold text-primary px-2">
                      Move &ldquo;Your project&rdquo;:
                    </span>
                    <button
                      type="button"
                      onClick={() => nudgeProjectDot(-25, 0)}
                      aria-label="Move project dot left (lower private knowledge)"
                      className="p-1.5 rounded-lg bg-white hover:bg-primary hover:text-white text-navy transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => nudgeProjectDot(0, 25)}
                      aria-label="Move project dot up (higher custom behaviour)"
                      className="p-1.5 rounded-lg bg-white hover:bg-primary hover:text-white text-navy transition-colors cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => nudgeProjectDot(0, -25)}
                      aria-label="Move project dot down (lower custom behaviour)"
                      className="p-1.5 rounded-lg bg-white hover:bg-primary hover:text-white text-navy transition-colors cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => nudgeProjectDot(25, 0)}
                      aria-label="Move project dot right (higher private knowledge)"
                      className="p-1.5 rounded-lg bg-white hover:bg-primary hover:text-white text-navy transition-colors cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 2x2 Quadrant Grid (Top-Left: Fine-Tuning, Top-Right: Agents, Bottom-Left: Prompting, Bottom-Right: RAG) */}
                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    QUADRANT_ZONES[2], // Top-Left: Fine-Tuning
                    QUADRANT_ZONES[3], // Top-Right: AI Agents + Tools
                    QUADRANT_ZONES[0], // Bottom-Left: Prompt Engineering
                    QUADRANT_ZONES[1], // Bottom-Right: RAG
                  ].map((zone) => {
                    const isRecommended = zone.id === activeQuadrantId;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => handleSelectQuadrantZone(zone)}
                        aria-pressed={isRecommended}
                        className={`text-left p-5 rounded-[20px] border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[175px] relative ${
                          isRecommended
                            ? 'bg-navy text-white border-primary shadow-xl'
                            : 'bg-primary-50/35 text-navy border-navy-08 hover:border-primary/50 hover:bg-primary-50/70'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span
                              className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                isRecommended
                                  ? 'bg-primary text-white'
                                  : 'bg-white text-navy-60 border border-navy-08'
                              }`}
                            >
                              {zone.quadrantPosition}
                            </span>

                            {isRecommended && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-navy font-mono text-[10px] font-extrabold">
                                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                <span>Your project</span>
                              </span>
                            )}
                          </div>

                          <h3
                            className={`text-[17px] sm:text-[18px] font-extrabold leading-snug ${
                              isRecommended ? 'text-white' : 'text-navy'
                            }`}
                          >
                            {zone.title}
                          </h3>
                          <p
                            className={`text-[13px] mt-1 ${
                              isRecommended ? 'text-white/80' : 'text-navy-70'
                            }`}
                          >
                            {zone.shortSubtitle}
                          </p>
                        </div>

                        <div className="mt-4 pt-2.5 border-t border-current/10 flex items-center justify-between font-mono text-[10px]">
                          <span>Private Data: {zone.xLevel}</span>
                          <span>Actions: {zone.yLevel}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom X-Axis Label */}
              <div className="mt-4 pt-3 border-t border-navy-08 flex items-center justify-between font-mono text-[11px] text-navy-70">
                <span>X-AXIS: Needs your private knowledge (low → high) →</span>
                <span className="text-primary font-bold">
                  Recommended: {activeQuadrantSpec.title}
                </span>
              </div>
            </div>

            {/* Right (5 cols): Expanded Recommendation Card */}
            <div className="lg:col-span-5" aria-live="polite">
              <div className="h-full rounded-[26px] bg-navy text-white p-6 sm:p-8 border border-navy shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                    <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                      RECOMMENDED APPROACH
                    </span>
                    <span className="font-mono text-[11px] text-primary-100">
                      {activeQuadrantSpec.quadrantPosition} Zone
                    </span>
                  </div>

                  <h3 className="text-[24px] sm:text-[28px] font-extrabold text-white leading-tight">
                    {activeQuadrantSpec.title}
                  </h3>
                  <p className="text-[14px] text-primary-100 font-semibold mt-1">
                    {activeQuadrantSpec.shortSubtitle}
                  </p>

                  {/* When to Use */}
                  <div className="mt-5 p-4 rounded-2xl bg-white/[0.05] border border-white/10">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100 mb-1">
                      WHEN TO USE THIS APPROACH
                    </div>
                    <p className="text-[13px] sm:text-[14px] text-white/90 leading-relaxed">
                      {activeQuadrantSpec.whenToUse}
                    </p>
                  </div>

                  {/* Timeline + Cost Level (1–3 Dots) */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10">
                      <div className="font-mono text-[10px] text-white/60 uppercase">
                        TYPICAL TIMELINE
                      </div>
                      <div className="font-mono text-[14px] font-extrabold text-white mt-1">
                        {activeQuadrantSpec.typicalTimeline}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10">
                      <div className="font-mono text-[10px] text-white/60 uppercase">
                        RELATIVE COST LEVEL
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {[1, 2, 3].map((dotNum) => (
                          <span
                            key={dotNum}
                            className={`w-3 h-3 rounded-full ${
                              dotNum <= activeQuadrantSpec.costDots
                                ? 'bg-primary'
                                : 'bg-white/20'
                            }`}
                          />
                        ))}
                        <span className="font-mono text-[11px] text-primary-100 ml-1">
                          ({activeQuadrantSpec.costDots}/3)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Concrete Example */}
                  <div className="mt-4 p-4 rounded-2xl bg-primary/20 border border-primary/50">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100 mb-1">
                      REAL-WORLD PRODUCTION EXAMPLE
                    </div>
                    <p className="text-[13px] text-white leading-relaxed">
                      {activeQuadrantSpec.concreteExample}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[12px] text-white/70">
                    We often combine RAG + Tools in production
                  </span>
                  <a
                    href="#ai-spec"
                    className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary-100 hover:text-white"
                  >
                    <span>Scope {activeQuadrantSpec.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — CHOOSING THE RIGHT MODEL: RADAR CHART (WHITE)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              VENDOR-NEUTRAL MODEL SELECTION
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              The Right Model for <span className="text-primary">Your Needs and Budget</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              We are not locked to a single AI provider. Toggle the model families on the left to
              compare their trade-offs across quality, speed, cost efficiency, data control, and
              context window.
            </p>
          </div>

          {/* Split Layout: Left Model Profile Toggles (6 cols) | Right 5-Axis Radar Chart (6 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: 3 Model Profile Toggle Cards */}
            <div className="lg:col-span-6 space-y-4">
              {MODEL_PROFILES.map((profile) => {
                const isSelected = selectedModelIds.includes(profile.id);
                return (
                  <div
                    key={profile.id}
                    onClick={() => toggleModelProfile(profile.id)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleModelProfile(profile.id);
                      }
                    }}
                    className={`p-5 sm:p-6 rounded-[22px] border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-primary shadow-md'
                        : 'bg-primary-50/30 border-navy-08 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                            isSelected
                              ? 'bg-primary border-primary text-white'
                              : 'bg-white border-navy-30'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                        </span>
                        <div>
                          <h3 className="text-[18px] font-extrabold text-navy">{profile.name}</h3>
                          <span className="font-mono text-[12px] text-primary font-semibold">
                            ({profile.examplesText})
                          </span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-primary-50 font-mono text-[10px] font-bold text-navy">
                        {isSelected ? 'PLOTTED ON RADAR' : 'CLICK TO COMPARE'}
                      </span>
                    </div>

                    <p className="text-[13px] sm:text-[14px] text-navy-70 mt-3 leading-relaxed">
                      {profile.tagline}
                    </p>

                    <ul className="mt-3 space-y-1.5">
                      {profile.bestForBullets.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[12px] text-navy-70 font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Right: 5-Axis Radar / Spider Chart + Accessible Summary Table */}
            <div className="lg:col-span-6">
              <div className="rounded-[26px] bg-primary-50/50 border border-navy-15 p-6 sm:p-8 shadow-soft">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-08">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy">
                    5-AXIS CAPABILITY RADAR
                  </span>
                  <span className="font-mono text-[11px] text-primary font-bold">
                    {selectedModelIds.length} active profile
                    {selectedModelIds.length > 1 ? 's' : ''}
                  </span>
                </div>

                {/* SVG Radar Chart */}
                <div className="max-w-[340px] mx-auto my-2">
                  <svg
                    viewBox="0 0 300 300"
                    className="w-full h-auto"
                    role="img"
                    aria-label="Radar chart comparing Frontier Hosted Models, Fast and Small Models, and Open-Source Self-Hosted models across Quality, Speed, Cost Efficiency, Data Control, and Context Length."
                  >
                    {/* Concentric Pentagon Rings (Levels 1..5) */}
                    {[1, 2, 3, 4, 5].map((lvl) => {
                      const ringPoints = RADAR_AXES.map((ax) => {
                        const pt = getRadarPoint(ax.angleDeg, lvl);
                        return `${pt.x},${pt.y}`;
                      }).join(' ');
                      return (
                        <polygon
                          key={lvl}
                          points={ringPoints}
                          fill="none"
                          stroke="#1e242e"
                          strokeOpacity={lvl === 5 ? 0.25 : 0.1}
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Axis Spokes & Labels */}
                    {RADAR_AXES.map((ax) => {
                      const outer = getRadarPoint(ax.angleDeg, 5);
                      const labelPt = getRadarPoint(ax.angleDeg, 6.25);
                      return (
                        <g key={ax.key}>
                          <line
                            x1="150"
                            y1="150"
                            x2={outer.x}
                            y2={outer.y}
                            stroke="#1e242e"
                            strokeOpacity="0.2"
                            strokeWidth="1"
                          />
                          <text
                            x={labelPt.x}
                            y={labelPt.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-navy font-mono text-[9px] font-bold"
                          >
                            {ax.label}
                          </text>
                        </g>
                      );
                    })}

                    {/* Selected Model Polygons */}
                    {MODEL_PROFILES.filter((p) => selectedModelIds.includes(p.id)).map(
                      (profile) => {
                        const polyPoints = RADAR_AXES.map((ax) => {
                          const val = profile.scores[ax.key];
                          const pt = getRadarPoint(ax.angleDeg, val);
                          return `${pt.x},${pt.y}`;
                        }).join(' ');

                        return (
                          <g key={profile.id}>
                            <polygon
                              points={polyPoints}
                              fill={profile.fillColor}
                              stroke={profile.strokeColor}
                              strokeWidth="2.5"
                              strokeDasharray={profile.dashArray}
                            />
                            {RADAR_AXES.map((ax) => {
                              const pt = getRadarPoint(ax.angleDeg, profile.scores[ax.key]);
                              return (
                                <circle
                                  key={ax.key}
                                  cx={pt.x}
                                  cy={pt.y}
                                  r="3.5"
                                  fill={profile.strokeColor}
                                />
                              );
                            })}
                          </g>
                        );
                      }
                    )}
                  </svg>
                </div>

                {/* Accessible Text Summary Table of Scores (out of 5) */}
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left border-collapse font-mono text-[11px]">
                    <thead>
                      <tr className="border-b border-navy-15 text-navy-60">
                        <th className="py-1.5 pr-2">Model Tier</th>
                        <th className="py-1.5 px-1.5">Qual</th>
                        <th className="py-1.5 px-1.5">Speed</th>
                        <th className="py-1.5 px-1.5">Cost</th>
                        <th className="py-1.5 px-1.5">Ctrl</th>
                        <th className="py-1.5 pl-1.5">Ctx</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-08">
                      {MODEL_PROFILES.filter((p) => selectedModelIds.includes(p.id)).map((p) => (
                        <tr key={p.id} className="text-navy font-bold">
                          <td className="py-1.5 pr-2 truncate max-w-[140px]">{p.name}</td>
                          <td className="py-1.5 px-1.5">{p.scores.quality}/5</td>
                          <td className="py-1.5 px-1.5">{p.scores.speed}/5</td>
                          <td className="py-1.5 px-1.5">{p.scores.costEfficiency}/5</td>
                          <td className="py-1.5 px-1.5">{p.scores.dataControl}/5</td>
                          <td className="py-1.5 pl-1.5">{p.scores.contextLength}/5</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Smart Model Routing Note + Honest Disclaimer */}
                <div className="mt-5 p-4 rounded-2xl bg-navy text-white space-y-1.5">
                  <p className="text-[13px] text-white/95 leading-snug">
                    We often <strong className="text-primary-100">route</strong> requests — small
                    models for simple tasks, frontier models for complex ones — to balance quality
                    and cost. Looking to connect apps or deploy digital teammates? See{' '}
                    <Link
                      href="/ai-solutions/ai-workflow-automation"
                      className="text-primary-100 font-bold underline hover:text-white"
                    >
                      AI Workflow Automation →
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/ai-solutions/ai-agents-for-business"
                      className="text-primary-100 font-bold underline hover:text-white"
                    >
                      AI Agents for Business →
                    </Link>
                  </p>
                  <p className="font-mono text-[11px] text-white/65">
                    Note: Illustrative comparison; capabilities change quickly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomAiLlmIntegration;
