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
  Bot,
  MessageSquare,
  Smartphone,
  Globe,
  FileText,
  Database,
  Play,
  RotateCcw,
  UserCheck,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  ShieldCheck,
  Search,
  Send,
  Layers,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sliders,
} from 'lucide-react';
import { aiSolutions } from '@/app/ai-solutions/_components/AISolutions';

/* ============================================================================
   SINGLE SOURCE OF TRUTH IMPORT (`ai-chatbot-development` from AISolutions.tsx)
============================================================================ */
const CHATBOT_SOLUTION =
  aiSolutions.find((s: any) => s.slug === 'ai-chatbot-development') || {
    slug: 'ai-chatbot-development',
    name: 'AI Chatbot Development',
    category: 'AI Build' as const,
    badge: 'BESTSELLER' as const,
    tagline: '24/7 website assistant trained on your own business knowledge',
    description:
      'Custom AI chatbots trained on your website, FAQs and documents — answering customers 24/7, capturing leads, booking appointments and handing over to your team when it matters.',
  };

/* ============================================================================
   SECTION 1 DATA — HERO: 3 CYCLING PERSONAS
============================================================================ */
interface PersonaMessage {
  sender: 'user' | 'bot';
  text: string;
}

interface HeroPersona {
  id: string;
  name: string;
  roleLabel: string;
  domainTag: string;
  iconType: 'dental' | 'store' | 'academy';
  statChip: string;
  greeting: string;
  messages: PersonaMessage[];
  quickReplies: [string, string, string];
  knowledgeSource: string;
}

const HERO_PERSONAS: HeroPersona[] = [
  {
    id: 'smile-dental',
    name: 'Smile Dental Assistant',
    roleLabel: 'Clinic Reception & Booking Bot',
    domainTag: 'dental-clinic-kb · 28 pages',
    iconType: 'dental',
    statChip: 'Answered 1,248 questions this week (illustrative)',
    greeting:
      'Hi! Welcome to Smile Care Dental. Need help with treatment costs, Sunday timings, or booking a cleaning slot?',
    messages: [
      {
        sender: 'user',
        text: 'Do you have a slot for ultrasonic scaling & polishing this Saturday morning?',
      },
      {
        sender: 'bot',
        text: 'Yes! Dr. Ananya has 10:30 AM and 11:45 AM open this Saturday. Scaling & polishing is ₹1,500 (takes ~35 mins). Shall I reserve 10:30 AM for you?',
      },
      {
        sender: 'user',
        text: '10:30 AM works. Also what if I need a root canal quote?',
      },
      {
        sender: 'bot',
        text: 'Slot held for 10:30 AM! For root canal pricing, our clinical coordinator can share an exact estimate after X-ray—want me to have her call you?',
      },
    ],
    quickReplies: ['Confirm 10:30 AM slot', 'Check clinic location', 'Request coordinator call'],
    knowledgeSource: 'Grounded on: treatments.pdf + doctor-roster.json',
  },
  {
    id: 'nova-store',
    name: 'Nova Store Helper',
    roleLabel: 'D2C Order & Product Guide',
    domainTag: 'product-catalog.csv · 640 SKUs',
    iconType: 'store',
    statChip: 'Assisted 890 shoppers & order checks this week (illustrative)',
    greeting:
      'Hey there! I can track your order in seconds, check size charts, or help you pick the right skincare routine.',
    messages: [
      {
        sender: 'user',
        text: 'Where is my order #NV-4821? And what moisturizer works best for oily skin?',
      },
      {
        sender: 'bot',
        text: 'Order #NV-4821 shipped via BlueDart and arrives tomorrow by 6 PM! For oily skin, our Oil-Free Ceramide Gel (₹699) is lightweight and non-comedogenic.',
      },
      {
        sender: 'user',
        text: 'Nice, can I exchange if a cleanser irritates my skin?',
      },
      {
        sender: 'bot',
        text: 'Per our return policy (p.2), unopened or gently tested items within 14 days qualify for a free replacement or store credit.',
      },
    ],
    quickReplies: ['View Ceramide Gel', 'Download invoice #NV-4821', 'Talk to support team'],
    knowledgeSource: 'Grounded on: shopify-catalog.csv + return-policy.docx',
  },
  {
    id: 'bright-academy',
    name: 'Bright Academy Counsellor',
    roleLabel: 'Admissions & Fee Guide Bot',
    domainTag: 'admissions-brochure.pdf · 54 FAQs',
    iconType: 'academy',
    statChip: 'Qualified 410 student enquiries this month (illustrative)',
    greeting:
      'Hello! Ask me about batch schedules, course eligibility, fee structures, or no-cost EMI options.',
    messages: [
      {
        sender: 'user',
        text: 'Am I eligible for the Data Analytics cohort if I have a B.Com degree? What is the fee?',
      },
      {
        sender: 'bot',
        text: 'Yes! B.Com graduates are eligible—no prior coding required. The 24-week cohort fee is ₹48,000, with 6-month no-cost EMI starting at ₹8,000/mo.',
      },
      {
        sender: 'user',
        text: 'Can I speak with an academic counsellor before enrolling?',
      },
      {
        sender: 'bot',
        text: 'Of course. Share your name and WhatsApp number below and our senior counsellor will call you within 20 minutes with the syllabus PDF.',
      },
    ],
    quickReplies: ['Book counsellor call', 'Download syllabus PDF', 'Check weekend timings'],
    knowledgeSource: 'Grounded on: brochure-2026.pdf + fee-sheet.xlsx',
  },
];

/* ============================================================================
   SECTION 2 DATA — FEED IT YOUR KNOWLEDGE: THE KNOWLEDGE VAULT
============================================================================ */
interface VaultDocument {
  id: string;
  monoName: string;
  typeTag: string;
  chunkCount: number;
  desc: string;
}

const VAULT_DOCUMENTS: VaultDocument[] = [
  {
    id: 'doc-web',
    monoName: 'website-pages (42)',
    typeTag: 'HTML / SITEMAP',
    chunkCount: 124,
    desc: 'Service pages, about, location hours & contact info',
  },
  {
    id: 'doc-faq',
    monoName: 'faq.pdf',
    typeTag: 'PDF DOCUMENT',
    chunkCount: 38,
    desc: 'Approved answers to top customer & patient questions',
  },
  {
    id: 'doc-price',
    monoName: 'price-list.xlsx',
    typeTag: 'SPREADSHEET',
    chunkCount: 52,
    desc: 'Plans, package rates, EMI slabs & consultation fees',
  },
  {
    id: 'doc-catalog',
    monoName: 'product-catalog.csv',
    typeTag: 'STRUCTURED CSV',
    chunkCount: 210,
    desc: 'SKUs, specifications, stock status & compatibility',
  },
  {
    id: 'doc-policy',
    monoName: 'policies.docx',
    typeTag: 'WORD DOC',
    chunkCount: 29,
    desc: 'Returns, warranty terms, shipping SLAs & escalation rules',
  },
];

interface VaultChunkTile {
  id: string;
  code: string;
  docName: string;
  snippet: string;
}

const VAULT_CHUNKS: VaultChunkTile[] = [
  {
    id: 'chk-01',
    code: 'CHK_01 // website-pages',
    docName: 'website-pages (42)',
    snippet: 'Mon–Sat: 9:30 AM – 8:00 PM · Sunday: 10:00 AM – 2:00 PM (prior appointment)',
  },
  {
    id: 'chk-02',
    code: 'CHK_02 // faq.pdf · p.2',
    docName: 'faq.pdf',
    snippet: 'Sunday clinic hours: Open 10 AM to 2 PM for scheduled appointments & emergencies.',
  },
  {
    id: 'chk-03',
    code: 'CHK_03 // price-list.xlsx',
    docName: 'price-list.xlsx',
    snippet: '3-month and 6-month no-cost EMI available on orders & treatments above ₹10,000.',
  },
  {
    id: 'chk-04',
    code: 'CHK_04 // faq.pdf · p.5',
    docName: 'faq.pdf',
    snippet: 'EMI partners: Major credit cards, Bajaj Finserv & instant debit card EMI supported.',
  },
  {
    id: 'chk-05',
    code: 'CHK_05 // product-catalog.csv',
    docName: 'product-catalog.csv',
    snippet: 'In-stock items dispatch within 24 hours with live tracking via WhatsApp & email.',
  },
  {
    id: 'chk-06',
    code: 'CHK_06 // policies.docx · p.2',
    docName: 'policies.docx',
    snippet: '14-day hassle-free return or exchange on unused items in original packaging.',
  },
  {
    id: 'chk-07',
    code: 'CHK_07 // policies.docx · p.4',
    docName: 'policies.docx',
    snippet: 'Refunds are processed back to original payment method within 5–7 business days.',
  },
  {
    id: 'chk-08',
    code: 'CHK_08 // fallback.guardrail',
    docName: 'guardrails.json',
    snippet: 'If confidence < 0.78: Do not guess—offer instant handoff to human support team.',
  },
];

interface VaultPresetQuestion {
  id: string;
  question: string;
  matchedChunkIds: string[];
  answerText: string;
  sourceCitation: string;
  confidenceTag: string;
}

const VAULT_PRESET_QUESTIONS: VaultPresetQuestion[] = [
  {
    id: 'q-sunday',
    question: 'What are your timings on Sunday?',
    matchedChunkIds: ['chk-01', 'chk-02'],
    answerText:
      'We are open on Sundays from 10:00 AM to 2:00 PM for prior appointments and urgent visits (Monday to Saturday timings are 9:30 AM to 8:00 PM). Would you like me to check available Sunday slots?',
    sourceCitation: 'Source: faq.pdf · p.2 & website-pages (42)',
    confidenceTag: 'Grounded Match · 2 chunks retrieved',
  },
  {
    id: 'q-emi',
    question: 'Do you offer EMI?',
    matchedChunkIds: ['chk-03', 'chk-04'],
    answerText:
      'Yes! We offer 3-month and 6-month no-cost EMI on plans and treatments above ₹10,000 via major credit cards, debit card EMI, and Bajaj Finserv. Want me to calculate your monthly installment?',
    sourceCitation: 'Source: price-list.xlsx · Row 14 & faq.pdf · p.5',
    confidenceTag: 'Grounded Match · 2 chunks retrieved',
  },
  {
    id: 'q-return',
    question: "What's the return policy?",
    matchedChunkIds: ['chk-06', 'chk-07'],
    answerText:
      'You can request a free return or exchange within 14 days of delivery for unused items in original packaging. Once picked up, refunds reach your original payment mode in 5–7 business days.',
    sourceCitation: 'Source: policies.docx · p.2 & p.4',
    confidenceTag: 'Grounded Match · 2 chunks retrieved',
  },
  {
    id: 'q-custom-discount',
    question: 'Can you approve a special 40% bulk corporate discount right now?',
    matchedChunkIds: ['chk-08'],
    answerText:
      "Custom bulk discounts aren't listed in my standard price sheet, so I won't guess! I'll connect you with our sales manager right now along with your enquiry details.",
    sourceCitation: 'Source: guardrails.json · Low-Confidence Human Handoff Rule',
    confidenceTag: 'Guardrail Triggered · Safe Escalation',
  },
];

/* ============================================================================
   SECTION 3 DATA — BUILD YOUR BOT: LIVE CONFIGURATOR
============================================================================ */
type BotJobType = 'Customer Support' | 'Lead Capture' | 'Appointment Booking' | 'Order Help';
type BotPersonalityType = 'Friendly' | 'Professional' | 'Concise';
type BotLanguageType = 'English' | 'Hindi' | 'Hinglish' | '+ Regional';
type BotChannelType = 'Website' | 'WhatsApp' | 'Mobile App';

const CONFIG_JOBS: BotJobType[] = [
  'Customer Support',
  'Lead Capture',
  'Appointment Booking',
  'Order Help',
];

const CONFIG_PERSONALITIES: BotPersonalityType[] = ['Friendly', 'Professional', 'Concise'];

const CONFIG_LANGUAGES: BotLanguageType[] = ['English', 'Hindi', 'Hinglish', '+ Regional'];

const CONFIG_CHANNELS: BotChannelType[] = ['Website', 'WhatsApp', 'Mobile App'];

const JOB_QUICK_REPLIES: Record<BotJobType, [string, string, string]> = {
  'Customer Support': ['Check return policy', 'Warranty & service', 'Report an issue'],
  'Lead Capture': ['Get a custom quote', 'See pricing tiers', 'Request callback'],
  'Appointment Booking': ['Book a slot today', 'Reschedule visit', 'Check doctor/expert timings'],
  'Order Help': ['Track my order', 'Change delivery address', 'Download GST invoice'],
};

const JOB_SAMPLE_USER_MSG: Record<BotJobType, string> = {
  'Customer Support': 'Hi, how fast do you resolve warranty replacements?',
  'Lead Capture': 'We need a custom quote for a 25-member team.',
  'Appointment Booking': 'Do you have any consultation slots open tomorrow afternoon?',
  'Order Help': 'Can I check the delivery status of order #WX-2094?',
};

function getConfiguredBotGreeting(
  botName: string,
  job: BotJobType,
  personality: BotPersonalityType,
  languages: BotLanguageType[]
): string {
  const safeName = botName.trim() || 'Nova';
  const hasHindi = languages.includes('Hindi');
  const hasHinglish = languages.includes('Hinglish');

  if (hasHinglish) {
    if (personality === 'Friendly') {
      return `Namaste! Main ${safeName} hoon 👋 Aapke ${job.toLowerCase()} questions mein aaj kaise help kar sakta hoon?`;
    }
    if (personality === 'Concise') {
      return `Hi, main ${safeName} (${job}). Apna sawaal batayein ya niche option chunein:`;
    }
    return `Hello & Namaste. Main ${safeName} hoon. ${job} ke liye apni requirement share karein.`;
  }

  if (hasHindi && !languages.includes('English')) {
    return `नमस्ते! मैं ${safeName} हूँ। ${job} से जुड़े किसी भी प्रश्न के लिए नीचे विकल्प चुनें या अपना संदेश लिखें।`;
  }

  if (personality === 'Friendly') {
    return `Hey there! I'm ${safeName} 👋 Ready to help you with ${job.toLowerCase()} in seconds—what can I do for you today?`;
  }
  if (personality === 'Concise') {
    return `Hi, I'm ${safeName}. Select a ${job.toLowerCase()} option below or type your question:`;
  }
  return `Welcome. I am ${safeName}, your virtual assistant for ${job.toLowerCase()}. How may I assist you today?`;
}

function getConfiguredBotReply(
  job: BotJobType,
  personality: BotPersonalityType,
  handoffEnabled: boolean
): string {
  const base: Record<BotJobType, string> = {
    'Customer Support':
      'Per our verified support policy, replacements are approved within 24 hours after inspection.',
    'Lead Capture':
      'For a 25-member team, our Business tier fits best. May I grab your work email and phone to send the itemized estimate?',
    'Appointment Booking':
      'Tomorrow has 3:00 PM and 4:30 PM available. Tap your preferred time below to lock it in instantly.',
    'Order Help':
      'Order #WX-2094 passed quality check and is out for delivery today—expected before 5:30 PM.',
  };

  const suffix = handoffEnabled
    ? ' Need special approval? Tap "Talk to a human" anytime.'
    : '';

  if (personality === 'Concise') {
    return base[job];
  }
  return `${base[job]}${suffix}`;
}

/* ============================================================================
   SECTION 4 DATA — CONVERSATION FLOW DESIGNER: THE FLOWCHART
============================================================================ */
type FlowSamplePathKey = 'faq' | 'lead' | 'booking';

interface FlowBranchSpec {
  id: 'faq' | 'lead' | 'booking' | 'handoff';
  title: string;
  intentMono: string;
  stepNodeLabel: string;
  outcomeNodeLabel: string;
  sampleBubbles: [string, string, string];
}

const FLOW_BRANCHES: FlowBranchSpec[] = [
  {
    id: 'faq',
    title: 'FAQ Answer',
    intentMono: 'intent: faq_lookup',
    stepNodeLabel: 'Retrieve Grounded Chunk',
    outcomeNodeLabel: 'Helpful? Yes / No',
    sampleBubbles: [
      'User: "Do you have basement parking at the clinic?"',
      'Router: Matched intent `faq_lookup` (confidence 0.94)',
      'Bot: "Yes, free basement parking is available at Gate 2." → Helpful? Yes ✓',
    ],
  },
  {
    id: 'lead',
    title: 'Lead Capture',
    intentMono: 'intent: lead_qualification',
    stepNodeLabel: 'Ask Name, Phone & Need',
    outcomeNodeLabel: 'Sent to CRM + Alert',
    sampleBubbles: [
      'User: "I want a quote for 50 office workstations."',
      'Router: Matched intent `lead_qualification` → Collecting Name, Phone & Need',
      'Bot: "Thanks Rahul! Synced to HubSpot CRM & alerted our B2B team."',
    ],
  },
  {
    id: 'booking',
    title: 'Booking',
    intentMono: 'intent: slot_booking',
    stepNodeLabel: 'Pick Available Slot',
    outcomeNodeLabel: 'Confirmed + Calendar Invite',
    sampleBubbles: [
      'User: "Can I book a demo call for Thursday afternoon?"',
      'Router: Matched intent `slot_booking` → Checking live calendar availability',
      'Bot: "Thursday 3:30 PM confirmed! Calendar invite & WhatsApp reminder sent."',
    ],
  },
  {
    id: 'handoff',
    title: 'Human Handoff',
    intentMono: 'intent: human_escalation',
    stepNodeLabel: 'Package Chat Summary',
    outcomeNodeLabel: 'Agent Joins With Context',
    sampleBubbles: [
      'User: "I have a custom legal clause question before signing."',
      'Router: Low confidence / sensitive topic → Triggering Human Handoff',
      'Bot: "Connecting you to Priya from our team with your full chat summary."',
    ],
  },
];

/* ============================================================================
   MAIN PAGE COMPONENT: AiChatbotDevelopment
============================================================================ */
interface AiChatbotDevelopmentProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const AiChatbotDevelopment: React.FC<AiChatbotDevelopmentProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  const triggerQuoteModal = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: service }));
    }
  };

  /* ------------------------------------------------------------------------
     SECTION 1 STATE: Cycling Persona Widget
  ------------------------------------------------------------------------ */
  const [activePersonaIndex, setActivePersonaIndex] = useState<number>(0);
  const [isPersonaPaused, setIsPersonaPaused] = useState<boolean>(false);

  useEffect(() => {
    if (shouldReduceMotion || isPersonaPaused) return;
    const timer = setInterval(() => {
      setActivePersonaIndex((prev) => (prev + 1) % HERO_PERSONAS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, isPersonaPaused]);

  const currentPersona = HERO_PERSONAS[activePersonaIndex] || HERO_PERSONAS[0];

  /* ------------------------------------------------------------------------
     SECTION 2 STATE: Knowledge Vault Interactive Question
  ------------------------------------------------------------------------ */
  const [selectedVaultQuestionId, setSelectedVaultQuestionId] = useState<string>(
    VAULT_PRESET_QUESTIONS[0].id
  );
  const [customVaultInput, setCustomVaultInput] = useState<string>('');

  const activeVaultQ =
    VAULT_PRESET_QUESTIONS.find((q) => q.id === selectedVaultQuestionId) ||
    VAULT_PRESET_QUESTIONS[0];

  const handleCustomVaultAsk = (e: React.FormEvent) => {
    e.preventDefault();
    const q = customVaultInput.toLowerCase().trim();
    if (!q) return;
    if (q.includes('sunday') || q.includes('time') || q.includes('hour')) {
      setSelectedVaultQuestionId('q-sunday');
    } else if (q.includes('emi') || q.includes('price') || q.includes('pay')) {
      setSelectedVaultQuestionId('q-emi');
    } else if (q.includes('return') || q.includes('refund') || q.includes('exchange')) {
      setSelectedVaultQuestionId('q-return');
    } else {
      setSelectedVaultQuestionId('q-custom-discount');
    }
  };

  /* ------------------------------------------------------------------------
     SECTION 3 STATE: Live Bot Configurator
  ------------------------------------------------------------------------ */
  const [cfgJob, setCfgJob] = useState<BotJobType>('Appointment Booking');
  const [cfgPersonality, setCfgPersonality] = useState<BotPersonalityType>('Friendly');
  const [cfgLanguages, setCfgLanguages] = useState<BotLanguageType[]>(['English', 'Hinglish']);
  const [cfgChannel, setCfgChannel] = useState<BotChannelType>('Website');
  const [cfgBotName, setCfgBotName] = useState<string>('Nova');
  const [cfgHandoff, setCfgHandoff] = useState<boolean>(true);

  const toggleLanguage = (lang: BotLanguageType) => {
    setCfgLanguages((prev) => {
      if (prev.includes(lang)) {
        return prev.length > 1 ? prev.filter((l) => l !== lang) : prev;
      }
      return [...prev, lang];
    });
  };

  const livePreviewGreeting = useMemo(
    () => getConfiguredBotGreeting(cfgBotName, cfgJob, cfgPersonality, cfgLanguages),
    [cfgBotName, cfgJob, cfgPersonality, cfgLanguages]
  );

  const livePreviewReply = useMemo(
    () => getConfiguredBotReply(cfgJob, cfgPersonality, cfgHandoff),
    [cfgJob, cfgPersonality, cfgHandoff]
  );

  /* ------------------------------------------------------------------------
     SECTION 4 STATE: Conversation Flowchart Playback
  ------------------------------------------------------------------------ */
  const [selectedFlowPath, setSelectedFlowPath] = useState<FlowSamplePathKey>('booking');
  const [flowStep, setFlowStep] = useState<number>(3); // 0=Greeting, 1=Decision, 2=BranchStep, 3=Outcome
  const [isPlayingFlow, setIsPlayingFlow] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlayingFlow) return;
    if (flowStep >= 3) {
      setIsPlayingFlow(false);
      return;
    }
    const timer = setTimeout(() => {
      setFlowStep((prev) => prev + 1);
    }, 950);
    return () => clearTimeout(timer);
  }, [isPlayingFlow, flowStep]);

  const triggerPlayFlow = (pathKey?: FlowSamplePathKey) => {
    if (pathKey) setSelectedFlowPath(pathKey);
    if (shouldReduceMotion) {
      setFlowStep(3);
      setIsPlayingFlow(false);
      return;
    }
    setFlowStep(0);
    setIsPlayingFlow(true);
  };

  const activeFlowBranch =
    FLOW_BRANCHES.find((b) => b.id === selectedFlowPath) || FLOW_BRANCHES[0];

  /* ------------------------------------------------------------------------
     SEO META TITLE & DESCRIPTION
  ------------------------------------------------------------------------ */
  useEffect(() => {
    document.title =
      'AI Chatbot Development Company | Custom Chatbots for Website & WhatsApp | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Custom AI chatbots trained on your website, FAQs, documents, and catalog. Answer customer questions 24/7, capture leads, book appointments, and hand off to your human team on Website, WhatsApp, and Mobile Apps.'
      );
    }
  }, []);

  /* Helper for Persona Avatar Icon */
  const renderPersonaIcon = (type: HeroPersona['iconType']) => {
    if (type === 'dental') return <HeartPulse className="w-5 h-5" />;
    if (type === 'store') return <ShoppingBag className="w-5 h-5" />;
    return <GraduationCap className="w-5 h-5" />;
  };

  return (
    <main className="flex-1 bg-white text-navy">
      {/* ======================================================================
         SECTION 1 — HERO: ONE BOT, MANY PERSONAS (bg: #1e242e navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
        <div className="absolute -right-24 -top-20 w-[600px] h-[600px] blue-glow-strong pointer-events-none" />
        <div className="absolute -left-24 bottom-0 w-[460px] h-[460px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb: Home › AI Solutions › AI Chatbot Development */}
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
              {CHATBOT_SOLUTION.name}
            </span>
          </nav>

          {/* 50/50 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 50% (6 cols) */}
            <div className="lg:col-span-6">
              {/* Label + BESTSELLER Pill */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em]">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                  <span>AI CHATBOT DEVELOPMENT</span>
                </span>
                {CHATBOT_SOLUTION.badge && (
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-wider">
                    {CHATBOT_SOLUTION.badge}
                  </span>
                )}
              </div>

              {/* H1 */}
              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-[-0.02em]">
                A Chatbot That <span className="text-primary">Knows Your Business</span>
              </h1>

              {/* Paragraph */}
              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-xl">
                Custom AI chatbots trained on your website, FAQs and documents — answering
                customers 24/7, capturing leads, booking appointments and handing over to your team
                when it matters.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#demo-bot"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft transition-all"
                >
                  <span>Get a Free Demo Bot</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#bot-builder"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>Build Your Bot</span>
                </a>
              </div>

              {/* Small Channel Row */}
              <div className="mt-9 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 text-[13px] font-semibold text-white/75">
                <span className="inline-flex items-center gap-1.5 text-white">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>Website</span>
                </span>
                <span className="text-white/30">·</span>
                <Link
                  href="/ai-solutions/whatsapp-ai-chatbot"
                  className="inline-flex items-center gap-1.5 text-white hover:text-primary transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span>WhatsApp</span>
                </Link>
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1.5 text-white">
                  <Smartphone className="w-4 h-4 text-primary" />
                  <span>Mobile App</span>
                </span>
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1.5 text-white">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Internal Teams</span>
                </span>
              </div>
            </div>

            {/* Right 50% (6 cols): Large Cycling Persona Chat Widget */}
            <div
              className="lg:col-span-6 relative"
              onMouseEnter={() => setIsPersonaPaused(true)}
              onMouseLeave={() => setIsPersonaPaused(false)}
            >
              {/* Floating Stat Chip that changes per Persona */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-[12px] font-semibold text-white">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono">{currentPersona.statChip}</span>
                </div>
                <span className="text-[11px] font-mono text-primary-100 hidden sm:inline">
                  Auto-cycling 3 personas
                </span>
              </div>

              {/* Generic WebXCode-Style Chat Widget Card */}
              <div className="rounded-[24px] bg-white text-navy border border-white/20 shadow-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPersona.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, rotateX: -6, y: 8 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, rotateX: 6, y: -8 }}
                    transition={{ duration: 0.28 }}
                  >
                    {/* Widget Header */}
                    <div className="bg-navy text-white px-5 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                          {renderPersonaIcon(currentPersona.iconType)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-[16px] font-extrabold text-white leading-snug">
                              {currentPersona.name}
                            </h2>
                            <span className="px-2 py-0.5 rounded-full bg-primary/25 border border-primary/40 text-[10px] font-bold text-primary-100">
                              {currentPersona.roleLabel}
                            </span>
                          </div>
                          <div className="font-mono text-[11px] text-white/65 mt-0.5">
                            {currentPersona.domainTag}
                          </div>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-white shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        24/7 Active
                      </span>
                    </div>

                    {/* Chat Log Area (Accessible role="log" aria-live="polite") */}
                    <div
                      role="log"
                      aria-live="polite"
                      aria-label={`Sample conversation with ${currentPersona.name}`}
                      className="p-5 sm:p-6 bg-primary-50/35 space-y-3.5 max-h-[340px] overflow-y-auto"
                    >
                      {/* Bot Greeting */}
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="max-w-[85%] rounded-2xl rounded-tl-xs bg-white border border-navy-08 px-4 py-2.5 text-[13px] sm:text-[14px] text-navy shadow-2xs">
                          {currentPersona.greeting}
                        </div>
                      </div>

                      {/* Exchanged Messages */}
                      {currentPersona.messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${
                            msg.sender === 'user' ? 'justify-end' : 'items-start gap-2.5'
                          }`}
                        >
                          {msg.sender === 'bot' && (
                            <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Bot className="w-4 h-4" />
                            </div>
                          )}
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] sm:text-[14px] leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-navy text-white rounded-br-xs'
                                : 'bg-white border border-primary-100 text-navy rounded-tl-xs shadow-2xs'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      {/* Subtle Typing & Grounding Footer Bar */}
                      <div className="pt-1 flex items-center justify-between gap-2 text-[11px] font-mono text-navy-60">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{currentPersona.knowledgeSource}</span>
                        </span>
                        <span className="text-primary font-semibold">Human handoff ready</span>
                      </div>
                    </div>

                    {/* Quick-Reply Chips Footer */}
                    <div className="px-5 sm:px-6 py-3.5 bg-white border-t border-navy-08">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-navy-50 mb-2">
                        SUGGESTED QUICK REPLIES
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {currentPersona.quickReplies.map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() =>
                              setActivePersonaIndex(
                                (prev) => (prev + 1) % HERO_PERSONAS.length
                              )
                            }
                            className="px-3 py-1.5 rounded-full bg-primary-50 hover:bg-primary text-primary hover:text-white border border-primary-100 text-[12px] font-semibold transition-colors cursor-pointer"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Persona Switcher Dots / Pills Below Widget */}
              <div
                className="mt-4 flex flex-wrap items-center justify-between gap-3"
                role="tablist"
                aria-label="Switch Chatbot Persona"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {HERO_PERSONAS.map((persona, idx) => {
                    const isSelected = idx === activePersonaIndex;
                    return (
                      <button
                        key={persona.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => {
                          setActivePersonaIndex(idx);
                          setIsPersonaPaused(true);
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-white/[0.06] text-white/75 border-white/15 hover:border-white/40 hover:text-white'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-white' : 'bg-primary'
                          }`}
                        />
                        <span>{persona.name}</span>
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
         SECTION 2 — FEED IT YOUR KNOWLEDGE: THE KNOWLEDGE VAULT (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              THE KNOWLEDGE VAULT (RAG)
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Trained on <span className="text-primary">Your Content</span> — Not Guesswork
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Generic chatbots hallucinate because they rely on open internet memory. We index your
              exact website pages, PDFs, spreadsheets, and policies into a private knowledge vault
              so every response is grounded in your business truth.
            </p>
          </div>

          {/* 3-Stage Visual Pipeline: Left Document Stack -> Middle Processor Funnel -> Right Vault Chunk Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left (4 cols): Stack of 5 Document Cards */}
            <div className="lg:col-span-4 rounded-[20px] bg-primary-50/45 border border-navy-08 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-08">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                    01. YOUR APPROVED FILES
                  </span>
                  <span className="font-mono text-[11px] text-navy-60">5 Sources</span>
                </div>

                <div className="space-y-2.5">
                  {VAULT_DOCUMENTS.map((doc) => {
                    const isUsedInActiveAnswer = VAULT_CHUNKS.some(
                      (c) =>
                        activeVaultQ.matchedChunkIds.includes(c.id) &&
                        c.docName === doc.monoName
                    );
                    return (
                      <div
                        key={doc.id}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          isUsedInActiveAnswer
                            ? 'bg-navy text-white border-navy shadow-md'
                            : 'bg-white text-navy border-navy-08'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileText
                              className={`w-4 h-4 shrink-0 ${
                                isUsedInActiveAnswer ? 'text-primary' : 'text-primary'
                              }`}
                            />
                            <span className="font-mono text-[13px] font-bold truncate">
                              {doc.monoName}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold shrink-0 ${
                              isUsedInActiveAnswer
                                ? 'bg-primary text-white'
                                : 'bg-primary-50 text-primary'
                            }`}
                          >
                            {doc.chunkCount} chunks
                          </span>
                        </div>
                        <p
                          className={`text-[12px] mt-1 ${
                            isUsedInActiveAnswer ? 'text-white/75' : 'text-navy-60'
                          }`}
                        >
                          {doc.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-08 text-[12px] text-navy-60 font-medium">
                 Re-syncs automatically when you update a page or upload a new price list.
              </div>
            </div>

            {/* Middle (2 cols): Glowing Funnel / Vector Chunker Processor */}
            <div
              className="lg:col-span-2 rounded-[20px] bg-navy text-white p-5 flex flex-col items-center justify-center text-center relative overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute inset-0 blue-glow pointer-events-none opacity-60" />
              <div className="relative z-10 space-y-4">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary-100">
                  02. CHUNKER
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/20 border-2 border-primary text-primary flex items-center justify-center mx-auto shadow-lg">
                  <Layers className="w-7 h-7" />
                </div>
                <div className="text-[14px] font-extrabold text-white leading-snug">
                  Vector Indexing &amp; Grounding
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Splits files into searchable semantic chunks with page &amp; row citations.
                </p>

                {/* Animated Flowing Chunk Dots */}
                <div className="pt-2 flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-primary/70 animate-pulse [animation-delay:200ms]" />
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse [animation-delay:400ms]" />
                </div>
              </div>
            </div>

            {/* Right (6 cols): The Vault Grid where Chunk Tiles Settle & Light Up */}
            <div className="lg:col-span-6 rounded-[20px] bg-white border border-navy-08 shadow-soft p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-navy-08">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-navy">
                      03. INDEXED KNOWLEDGE VAULT (453 CHUNKS)
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-primary">
                    Matching chunks light up blue ↓
                  </span>
                </div>

                {/* Grid of 8 Chunk Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {VAULT_CHUNKS.map((chunk) => {
                    const isHighlighted = activeVaultQ.matchedChunkIds.includes(chunk.id);
                    return (
                      <div
                        key={chunk.id}
                        className={`p-3 rounded-xl border transition-all duration-200 ${
                          isHighlighted
                            ? 'bg-primary text-white border-primary shadow-md scale-[1.01]'
                            : 'bg-primary-50/40 text-navy border-navy-08 opacity-75'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span
                            className={`font-mono text-[10px] font-bold ${
                              isHighlighted ? 'text-white' : 'text-primary'
                            }`}
                          >
                            {chunk.code}
                          </span>
                          {isHighlighted && (
                            <span className="px-1.5 py-0.5 rounded bg-white text-primary font-mono text-[9px] font-extrabold uppercase">
                              MATCH
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[12px] leading-snug ${
                            isHighlighted ? 'text-white font-semibold' : 'text-navy-70'
                          }`}
                        >
                          {chunk.snippet}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-08 flex items-center justify-between text-[11px] font-mono text-navy-50">
                <span>EMBEDDING: PRIVATE_VECTOR_STORE</span>
                <span>HALLUCINATION GUARD: ON</span>
              </div>
            </div>
          </div>

          {/* Interactive Question Row + Grounded Answer Bubble Below Vault */}
          <div className="mt-6 rounded-[22px] bg-primary-50/70 border border-primary-100 p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-primary-100">
              <div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                  TEST THE KNOWLEDGE VAULT — CLICK A QUESTION
                </div>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label="Preset customer questions"
                >
                  {VAULT_PRESET_QUESTIONS.map((item) => {
                    const isSelected = item.id === selectedVaultQuestionId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedVaultQuestionId(item.id)}
                        className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-navy text-white border-navy shadow-xs'
                            : 'bg-white text-navy border-navy-15 hover:border-primary hover:text-primary'
                        }`}
                      >
                        &ldquo;{item.question}&rdquo;
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Quick Question Input */}
              <form onSubmit={handleCustomVaultAsk} className="flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={customVaultInput}
                  onChange={(e) => setCustomVaultInput(e.target.value)}
                  placeholder="Or type e.g. Sunday, EMI, return..."
                  aria-label="Ask the knowledge vault a sample question"
                  className="w-full sm:w-64 px-4 py-2 rounded-full bg-white border border-navy-15 text-[13px] text-navy placeholder:text-navy-50 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-primary hover:bg-primary-700 text-white text-[13px] font-bold cursor-pointer shrink-0"
                >
                  Ask
                </button>
              </form>
            </div>

            {/* Grounded Answer Bubble with Citation Chip */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVaultQ.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="pt-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                aria-live="polite"
              >
                <div className="flex items-start gap-3.5 max-w-3xl">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[12px] font-extrabold uppercase tracking-wider text-navy">
                        Grounded Bot Response
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white border border-primary-100 font-mono text-[11px] font-bold text-primary">
                        {activeVaultQ.sourceCitation}
                      </span>
                    </div>
                    <p className="text-[14px] sm:text-[15px] text-navy leading-relaxed font-medium">
                      {activeVaultQ.answerText}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-start md:self-center">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy text-white font-mono text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    <span>{activeVaultQ.confidenceTag}</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Honesty Caption */}
          <p className="mt-4 text-center text-[13px] sm:text-[14px] text-navy-70 font-medium">
            Your chatbot answers from your approved content — and says{' '}
            <strong className="font-bold text-navy">
              &ldquo;I&apos;ll connect you to our team&rdquo;
            </strong>{' '}
            when it isn&apos;t sure.
          </p>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — BUILD YOUR BOT: LIVE CONFIGURATOR (bg: #f0f7fd, id="bot-builder")
      ====================================================================== */}
      <section id="bot-builder" className="py-[72px] lg:py-[112px] bg-primary-50 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              INTERACTIVE BOT CONFIGURATOR
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Design Your Chatbot <span className="text-primary">in 30 Seconds</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Customize your bot&apos;s main job, personality, languages, deployment channel, and
              human handoff rules on the left—watch the live preview update instantly on the right.
            </p>
          </div>

          {/* Split Layout: Left Configuration Groups (6 cols) + Right Live Preview Widget (6 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left (6 cols): Configuration Groups Card */}
            <div className="lg:col-span-6 rounded-[24px] bg-white border border-navy-08 shadow-soft p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                {/* 1. Main Job */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-navy-70">
                      1. Main Job
                    </span>
                    <span className="font-mono text-[11px] text-primary font-bold">
                      intent_focus
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2" role="group" aria-label="Main job">
                    {CONFIG_JOBS.map((job) => {
                      const active = cfgJob === job;
                      return (
                        <button
                          key={job}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setCfgJob(job)}
                          className={`px-3.5 py-2.5 rounded-xl text-[13px] font-bold text-left transition-all cursor-pointer border flex items-center justify-between ${
                            active
                              ? 'bg-navy text-white border-navy shadow-xs'
                              : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                          }`}
                        >
                          <span>{job}</span>
                          {active && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Personality */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-navy-70">
                      2. Personality &amp; Tone
                    </span>
                    <span className="font-mono text-[11px] text-primary font-bold">
                      tone_profile
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2" role="group" aria-label="Personality">
                    {CONFIG_PERSONALITIES.map((tone) => {
                      const active = cfgPersonality === tone;
                      return (
                        <button
                          key={tone}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setCfgPersonality(tone)}
                          className={`py-2.5 px-3 rounded-xl text-[13px] font-bold text-center transition-all cursor-pointer border ${
                            active
                              ? 'bg-primary text-white border-primary shadow-xs'
                              : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                          }`}
                        >
                          {tone}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Languages (Multi-Select) */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-navy-70">
                      3. Languages (Multi-Select)
                    </span>
                    <span className="font-mono text-[11px] text-navy-50">
                      {cfgLanguages.length} selected
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Languages">
                    {CONFIG_LANGUAGES.map((lang) => {
                      const active = cfgLanguages.includes(lang);
                      return (
                        <button
                          key={lang}
                          type="button"
                          aria-pressed={active}
                          onClick={() => toggleLanguage(lang)}
                          className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer border inline-flex items-center gap-1.5 ${
                            active
                              ? 'bg-primary text-white border-primary'
                              : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                          }`}
                        >
                          {active && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                          <span>{lang}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Channel */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-navy-70">
                      4. Primary Channel Frame
                    </span>
                    <span className="font-mono text-[11px] text-primary font-bold">
                      deploy_target
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2" role="group" aria-label="Channel">
                    {CONFIG_CHANNELS.map((ch) => {
                      const active = cfgChannel === ch;
                      return (
                        <button
                          key={ch}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setCfgChannel(ch)}
                          className={`py-2.5 px-3 rounded-xl text-[13px] font-bold text-center transition-all cursor-pointer border ${
                            active
                              ? 'bg-navy text-white border-navy'
                              : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                          }`}
                        >
                          {ch}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Bot Name Input + 6. Human Handoff Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label
                      htmlFor="cfg-bot-name-input"
                      className="block text-[12px] font-bold uppercase tracking-[0.12em] text-navy-70 mb-2"
                    >
                      5. Bot Name
                    </label>
                    <input
                      id="cfg-bot-name-input"
                      type="text"
                      maxLength={22}
                      value={cfgBotName}
                      onChange={(e) => setCfgBotName(e.target.value)}
                      placeholder="Nova"
                      className="w-full px-4 py-2.5 rounded-xl bg-primary-50/40 border border-navy-15 text-[14px] font-bold text-navy focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <span className="block text-[12px] font-bold uppercase tracking-[0.12em] text-navy-70 mb-2">
                      6. Human Handoff
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={cfgHandoff}
                      aria-label="Toggle human handoff button"
                      onClick={() => setCfgHandoff((prev) => !prev)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-[13px] font-bold flex items-center justify-between transition-all cursor-pointer ${
                        cfgHandoff
                          ? 'bg-primary-50 border-primary text-navy'
                          : 'bg-white border-navy-15 text-navy-60'
                      }`}
                    >
                      <span>{cfgHandoff ? 'Handoff ON' : 'Handoff OFF'}</span>
                      <span
                        className={`w-10 h-5 rounded-full p-0.5 transition-colors flex items-center ${
                          cfgHandoff ? 'bg-primary justify-end' : 'bg-navy-20 justify-start'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-navy-08 flex items-center justify-between text-[12px] text-navy-60">
                <span className="inline-flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-primary" />
                  <span>All settings customizable during build</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCfgJob('Appointment Booking');
                    setCfgPersonality('Friendly');
                    setCfgLanguages(['English', 'Hinglish']);
                    setCfgChannel('Website');
                    setCfgBotName('Nova');
                    setCfgHandoff(true);
                  }}
                  className="font-bold text-primary hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Right (6 cols): Live Preview Chat Widget + CTA */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              {/* Channel-Specific Outer Frame */}
              <div
                className={`rounded-[24px] border overflow-hidden shadow-xl transition-all ${
                  cfgChannel === 'Mobile App'
                    ? 'max-w-[420px] mx-auto w-full border-4 border-navy bg-white'
                    : 'w-full border-navy-15 bg-white'
                }`}
              >
                {/* Top Frame Chrome Based on Channel */}
                <div className="bg-navy text-white px-5 py-3.5 border-b border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white font-extrabold text-[15px] flex items-center justify-center shrink-0">
                      {(cfgBotName.trim() || 'N').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-extrabold text-white">
                          {cfgBotName.trim() || 'Nova'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/25 text-primary-100 font-mono text-[10px] font-bold">
                          {cfgChannel} UI
                        </span>
                      </div>
                      <div className="text-[11px] text-white/70">
                        {cfgJob} · {cfgPersonality} · {cfgLanguages.join(', ')}
                      </div>
                    </div>
                  </div>

                  {cfgHandoff && (
                    <button
                      type="button"
                      onClick={() =>
                        triggerQuoteModal(
                          `Custom Bot Plan (${cfgBotName || 'Nova'} - ${cfgJob} on ${cfgChannel})`
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-primary text-white text-[11px] font-bold transition-colors cursor-pointer shrink-0"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-primary-100" />
                      <span>Talk to a human</span>
                    </button>
                  )}
                </div>

                {/* Live Chat Preview Body */}
                <div
                  role="log"
                  aria-live="polite"
                  aria-label="Configured chatbot preview"
                  className={`p-5 space-y-3.5 ${
                    cfgChannel === 'WhatsApp' ? 'bg-primary-50/60' : 'bg-primary-50/25'
                  }`}
                >
                  {/* Bot Greeting Bubble */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-primary text-white text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      {(cfgBotName.trim() || 'N').charAt(0).toUpperCase()}
                    </div>
                    <div className="max-w-[85%] rounded-2xl rounded-tl-xs bg-white border border-navy-08 px-4 py-3 text-[13px] sm:text-[14px] text-navy shadow-2xs">
                      {livePreviewGreeting}
                    </div>
                  </div>

                  {/* Sample User Message for Selected Job */}
                  <div className="flex justify-end">
                    <div className="max-w-[82%] rounded-2xl rounded-br-xs bg-navy text-white px-4 py-2.5 text-[13px] sm:text-[14px]">
                      {JOB_SAMPLE_USER_MSG[cfgJob]}
                    </div>
                  </div>

                  {/* Bot Grounded Reply */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-primary text-white text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      {(cfgBotName.trim() || 'N').charAt(0).toUpperCase()}
                    </div>
                    <div className="max-w-[85%] rounded-2xl rounded-tl-xs bg-white border border-primary-100 px-4 py-3 text-[13px] sm:text-[14px] text-navy shadow-2xs">
                      {livePreviewReply}
                    </div>
                  </div>

                  {/* Quick-Reply Chips matching Main Job */}
                  <div className="pt-2">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-navy-50 mb-1.5">
                      QUICK ACTIONS ({cfgJob.toUpperCase()})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {JOB_QUICK_REPLIES[cfgJob].map((qr) => (
                        <span
                          key={qr}
                          className="px-3 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold"
                        >
                          {qr}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Simulated Input Bar */}
                <div className="px-5 py-3 bg-white border-t border-navy-08 flex items-center justify-between gap-2">
                  <span className="text-[12px] text-navy-50">
                    Ask {cfgBotName.trim() || 'Nova'} anything about your business…
                  </span>
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    <Send className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Action Button Under Preview */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-navy-08 shadow-soft">
                <div className="text-[13px] text-navy-70">
                  <strong className="font-bold text-navy">Ready to build {cfgBotName || 'Nova'}?</strong>{' '}
                  We&apos;ll send a fixed quote &amp; architecture plan.
                </div>
                <button
                  type="button"
                  onClick={() =>
                    triggerQuoteModal(
                      `AI Chatbot Plan: ${cfgBotName || 'Nova'} (${cfgJob}, ${cfgChannel}, ${cfgLanguages.join('/')})`
                    )
                  }
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] shadow-soft transition-all cursor-pointer shrink-0"
                >
                  <span>Send Me This Bot Plan</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — CONVERSATION FLOW DESIGNER: THE FLOWCHART (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Sample Path Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                CONVERSATION FLOW DESIGNER
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Every Conversation <span className="text-primary">Has a Plan</span>
              </h2>
              <p className="mt-3 text-[16px] text-navy-70 max-w-2xl leading-[1.65]">
                Your chatbot doesn&apos;t ramble—it follows structured conversation guardrails that
                identify what the visitor needs and guide them to an answer, lead form, booking
                slot, or human teammate.
              </p>
            </div>

            {/* 3 Sample Path Pills + Play Sample Conversation Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div
                className="inline-flex items-center p-1 rounded-full bg-primary-50 border border-primary-100"
                role="group"
                aria-label="Select sample conversation path"
              >
                {(
                  [
                    { key: 'faq', label: 'FAQ' },
                    { key: 'lead', label: 'Lead' },
                    { key: 'booking', label: 'Booking' },
                  ] as { key: FlowSamplePathKey; label: string }[]
                ).map((pill) => {
                  const active = selectedFlowPath === pill.key;
                  return (
                    <button
                      key={pill.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setSelectedFlowPath(pill.key);
                        setFlowStep(3);
                        setIsPlayingFlow(false);
                      }}
                      className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                        active
                          ? 'bg-navy text-white shadow-2xs'
                          : 'text-navy-70 hover:text-primary'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => triggerPlayFlow()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-700 text-white text-[13px] font-bold shadow-soft transition-all cursor-pointer"
              >
                {isPlayingFlow ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Playing Path…</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Play sample conversation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Flowchart Canvas (Dotted Background) */}
          <div className="rounded-[24px] bg-primary-50/40 bg-dots-light border border-navy-08 p-6 sm:p-8 lg:p-10 shadow-soft">
            {/* Top Row: Start Node ("Greeting") -> Decision Node ("What does the user want?") */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {/* Node 0: Rounded Start Node "Greeting" */}
              <div
                className={`px-6 py-3.5 rounded-full border-2 transition-all flex items-center gap-2.5 ${
                  flowStep >= 0
                    ? 'bg-navy text-white border-primary shadow-md'
                    : 'bg-white text-navy border-navy-15'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-primary-100">
                  START
                </span>
                <span className="text-[15px] font-extrabold">Greeting</span>
              </div>

              {/* Blue Arrow Connector */}
              <div className="flex items-center text-primary" aria-hidden="true">
                <div className="hidden md:block w-12 h-0.5 bg-primary" />
                <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
              </div>

              {/* Node 1: Diamond-Styled Decision Node "What does the user want?" */}
              <div
                className={`px-6 py-4 rounded-2xl border-2 transition-all text-center ${
                  flowStep >= 1
                    ? 'bg-primary text-white border-primary shadow-lg scale-[1.02]'
                    : 'bg-white text-navy border-navy-15'
                }`}
              >
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-85">
                  INTENT ROUTER ◆ DECISION
                </div>
                <div className="text-[16px] font-extrabold mt-0.5">
                  What does the user want?
                </div>
              </div>
            </div>

            {/* Connector Line Down to 4 Branches (Desktop) */}
            <div className="hidden lg:grid grid-cols-4 gap-5 mt-6 pt-6 border-t-2 border-dashed border-primary/40">
              {FLOW_BRANCHES.map((branch) => {
                const isSelectedBranch = branch.id === selectedFlowPath;
                const isStepActive = isSelectedBranch && flowStep >= 2;
                const isOutcomeActive = isSelectedBranch && flowStep >= 3;

                return (
                  <div
                    key={branch.id}
                    onClick={() => {
                      if (branch.id !== 'handoff') {
                        triggerPlayFlow(branch.id);
                      }
                    }}
                    className={`rounded-[20px] p-5 border transition-all flex flex-col justify-between ${
                      isSelectedBranch
                        ? 'bg-white border-primary ring-2 ring-primary/20 shadow-lg'
                        : 'bg-white/80 border-navy-08 opacity-85 hover:opacity-100'
                    } ${branch.id !== 'handoff' ? 'cursor-pointer' : ''}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold ${
                            isSelectedBranch
                              ? 'bg-primary text-white'
                              : 'bg-primary-50 text-primary'
                          }`}
                        >
                          {branch.intentMono}
                        </span>
                        {isSelectedBranch && (
                          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>

                      <h3 className="text-[18px] font-extrabold text-navy">{branch.title}</h3>

                      {/* Step Node */}
                      <div
                        className={`mt-4 p-3 rounded-xl border text-[13px] font-bold transition-colors ${
                          isStepActive
                            ? 'bg-primary-50 border-primary text-navy'
                            : 'bg-primary-50/30 border-navy-08 text-navy-70'
                        }`}
                      >
                        1. {branch.stepNodeLabel}
                      </div>

                      {/* Down Arrow */}
                      <div className="my-2 flex justify-center text-primary" aria-hidden="true">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>

                      {/* Outcome Node */}
                      <div
                        className={`p-3 rounded-xl border text-[13px] font-extrabold transition-colors flex items-center justify-between ${
                          isOutcomeActive
                            ? 'bg-navy text-white border-navy shadow-sm'
                            : 'bg-white border-navy-15 text-navy'
                        }`}
                      >
                        <span>2. {branch.outcomeNodeLabel}</span>
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile / Tablet Vertical Stacked Branches */}
            <div className="lg:hidden mt-6 space-y-3">
              {FLOW_BRANCHES.map((branch) => {
                const isSelectedBranch = branch.id === selectedFlowPath;
                return (
                  <div
                    key={branch.id}
                    onClick={() => {
                      if (branch.id !== 'handoff') {
                        triggerPlayFlow(branch.id);
                      }
                    }}
                    className={`rounded-[18px] p-4 border ${
                      isSelectedBranch
                        ? 'bg-white border-primary ring-2 ring-primary/20 shadow-md'
                        : 'bg-white/85 border-navy-08'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-extrabold text-[16px] text-navy">{branch.title}</span>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-primary-50 text-primary">
                        {branch.intentMono}
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-[13px] text-navy-70 pl-3 border-l-2 border-primary">
                      <li>• Step: {branch.stepNodeLabel}</li>
                      <li className="font-bold text-navy">→ Outcome: {branch.outcomeNodeLabel}</li>
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Live Pop-Up Chat Bubble Trace Bar for Active Path */}
            <div
              className="mt-7 rounded-2xl bg-navy text-white p-5 sm:p-6 border border-white/10"
              aria-live="polite"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                    ACTIVE PATH TRACE: {activeFlowBranch.title.toUpperCase()} (STEP{' '}
                    {Math.min(flowStep + 1, 3)} OF 3)
                  </span>
                </div>
                <span className="font-mono text-[11px] text-white/60">
                  {activeFlowBranch.intentMono}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeFlowBranch.sampleBubbles.map((bubble, idx) => {
                  const isReached = flowStep >= idx + 1 || flowStep === 3;
                  return (
                    <div
                      key={bubble}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isReached
                          ? 'bg-white/10 border-primary text-white'
                          : 'bg-white/[0.03] border-white/10 text-white/40'
                      }`}
                    >
                      <div className="font-mono text-[10px] font-bold text-primary-100 mb-1">
                        NODE 0{idx + 1}
                      </div>
                      <p className="text-[13px] leading-snug font-medium">{bubble}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[12px] text-white/75">
                <span>Need instant AI lead scoring, territory routing &amp; 60-second multi-channel follow-up?</span>
                <Link
                  href="/ai-solutions/crm-lead-automation"
                  className="font-mono text-[11.5px] font-extrabold text-primary-100 hover:text-white inline-flex items-center gap-1"
                >
                  <span>Explore CRM &amp; Lead Automation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AiChatbotDevelopment;
