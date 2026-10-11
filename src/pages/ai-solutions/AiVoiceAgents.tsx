import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Mic,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Clock,
  RotateCcw,
  ShieldCheck,
  Sliders,
  UserCheck,
  Calendar,
  FileText,
  Sparkles,
  Volume2,
  GitBranch,
} from 'lucide-react';
import { aiSolutions } from '../AISolutions';

/* ============================================================================
   SINGLE SOURCE OF TRUTH IMPORT (`ai-voice-agents` from AISolutions.tsx)
   NOTE: Real audio samples can be wired in later via an `audioPreviewUrl` field
   when voice recordings are ready.
============================================================================ */
const VOICE_AGENT_SOLUTION =
  aiSolutions.find((s) => s.slug === 'ai-voice-agents') || {
    slug: 'ai-voice-agents',
    name: 'AI Voice Agents',
    category: 'AI Build' as const,
    badge: 'NEW' as const,
    tagline: 'Natural-sounding inbound & outbound AI phone receptionists and callers',
    description:
      'AI voice agents that answer, book, follow up and remind — in natural English, Hindi and more — and transfer to your team when a human is needed.',
  };

/* ============================================================================
   SECTION 1 DATA — HERO: STACK OF INCOMING CALL CARDS (ZERO MISSED CALLS)
============================================================================ */
interface HeroCallCardItem {
  id: string;
  maskedCaller: string;
  callerLabel: string;
  callTimeMono: string;
  durationMono: string;
  intentSummary: string;
  outcomeBadge: string;
  aiDisclosureLine: string;
}

const HERO_CALL_STACK: HeroCallCardItem[] = [
  {
    id: 'call-01',
    maskedCaller: '+91 98•••• 4210',
    callerLabel: 'Dental Patient · After-Hours Call',
    callTimeMono: '11:47 PM',
    durationMono: '00:48',
    intentSummary: 'Requested root-canal consultation slot for Thursday evening.',
    outcomeBadge: 'Booked: Thu 5 PM',
    aiDisclosureLine: '"Hi, I am Nova, the AI voice assistant for Smile Care Dental…"',
  },
  {
    id: 'call-02',
    maskedCaller: '+91 97•••• 1084',
    callerLabel: 'D2C Shopper · Order Status',
    callTimeMono: '08:19 PM',
    durationMono: '00:34',
    intentSummary: 'Asked for courier tracking & delivery time for Order #1042.',
    outcomeBadge: 'Order #1042 status shared',
    aiDisclosureLine: '"Hello! You are speaking with the AI assistant for Nova Store…"',
  },
  {
    id: 'call-03',
    maskedCaller: '+91 99•••• 6391',
    callerLabel: 'Enterprise Client · Billing Query',
    callTimeMono: '03:12 PM',
    durationMono: '00:52',
    intentSummary: 'Needed custom GST credit-note approval from accounts.',
    outcomeBadge: 'Transferred to Priya — billing',
    aiDisclosureLine: '"Connecting you to Priya in Billing with your call summary…"',
  },
  {
    id: 'call-04',
    maskedCaller: '+91 96•••• 8820',
    callerLabel: 'Website Lead · Instant Callback',
    callTimeMono: '01:05 PM',
    durationMono: '01:04',
    intentSummary: 'Submitted brochure form 45 seconds ago; qualified budget & timeline.',
    outcomeBadge: 'Site visit booked: Sat 11 AM',
    aiDisclosureLine: '"Hi! You requested a callback from Skyline Residences…"',
  },
];

const SPECTROGRAM_BARS: number[] = [
  24, 48, 34, 68, 52, 82, 44, 60, 90, 38, 74, 56, 40, 84, 62, 32, 70, 50, 86, 42, 58, 36, 64, 28,
];

/* ============================================================================
   SECTION 2 DATA — THE MISSED CALL PILE (VISUAL NOTIFICATION STACK)
============================================================================ */
interface MissedPileNotification {
  id: string;
  caller: string;
  timeAgo: string;
  missedReason: string;
}

const MISSED_PILE_SAMPLE: MissedPileNotification[] = [
  {
    id: 'mp-1',
    caller: '+91 98•••• 7731',
    timeAgo: '9:42 PM',
    missedReason: 'Missed Call · Clinic closed for the night',
  },
  {
    id: 'mp-2',
    caller: '+91 99•••• 3109',
    timeAgo: '6:18 PM',
    missedReason: 'Missed Call · Front desk busy on another line',
  },
  {
    id: 'mp-3',
    caller: '+91 97•••• 5582',
    timeAgo: '2:05 PM',
    missedReason: 'Missed Call · Lunch break / unattended desk',
  },
  {
    id: 'mp-4',
    caller: '+91 96•••• 9044',
    timeAgo: 'Sunday 11:10 AM',
    missedReason: 'Missed Call · Weekend enquiry went to competitor',
  },
];

/* ============================================================================
   SECTION 3 DATA — "PRESS 1" VS "JUST SAY IT" (IVR MAZE VS NATURAL CONVERSATION)
============================================================================ */
interface IvrMazeNode {
  step: string;
  prompt: string;
  elapsedMono: string;
}

const IVR_MAZE_STEPS: IvrMazeNode[] = [
  {
    step: 'MENU 01',
    prompt: 'Press 1 for appointments · Press 2 for billing · Press 3 for locations…',
    elapsedMono: '00:48',
  },
  {
    step: 'SUB-MENU 03',
    prompt: 'Press 3 to reschedule an existing visit · Press 4 for new patients…',
    elapsedMono: '01:36',
  },
  {
    step: 'KEYPAD INPUT',
    prompt: 'Please enter your 8-digit patient ID followed by the # key…',
    elapsedMono: '02:29',
  },
  {
    step: 'LOOP ERROR',
    prompt: 'Invalid input. Press 9 to repeat this menu or hold for the next operator…',
    elapsedMono: '03:42',
  },
];

interface NaturalVoiceTurn {
  speaker: 'Caller' | 'AI Voice Agent';
  line: string;
  timeMono: string;
}

const NATURAL_VOICE_TURNS: NaturalVoiceTurn[] = [
  {
    speaker: 'AI Voice Agent',
    line: "Hi, I'm Nova, the AI voice assistant for Smile Dental. How can I help you today?",
    timeMono: '00:05',
  },
  {
    speaker: 'Caller',
    line: 'I need to move my appointment to Friday evening.',
    timeMono: '00:14',
  },
  {
    speaker: 'AI Voice Agent',
    line: 'Sure — Friday at 6 PM works with Dr. Ananya. Shall I confirm?',
    timeMono: '00:25',
  },
  {
    speaker: 'Caller',
    line: 'Yes, please.',
    timeMono: '00:31',
  },
  {
    speaker: 'AI Voice Agent',
    line: 'Done ✓ Your appointment is moved to Friday at 6:00 PM. SMS & WhatsApp confirmation sent.',
    timeMono: '00:38',
  },
];

/* ============================================================================
   SECTION 4 DATA — INBOUND & OUTBOUND: THE SWITCHBOARD
============================================================================ */
type SwitchboardMode = 'inbound' | 'outbound';

interface SwitchboardJackItem {
  id: string;
  jackCode: string;
  mode: SwitchboardMode;
  title: string;
  subtitle: string;
  scriptLine: string;
  outcomeText: string;
  systemActionMono: string;
}

const SWITCHBOARD_JACKS: SwitchboardJackItem[] = [
  /* INBOUND (5 Jacks) */
  {
    id: 'in-reception',
    jackCode: 'JACK IN-01',
    mode: 'inbound',
    title: 'Reception & FAQs',
    subtitle: 'Answers timings, pricing, location & service questions on the first ring',
    scriptLine:
      '"Hi! I am Nova, the AI assistant for Apex Clinic. We are open 9 AM to 8 PM Monday through Saturday, and basement parking is available at Gate 2."',
    outcomeText: 'Routine reception questions answered in under 30 seconds without putting callers on hold.',
    systemActionMono: 'kb.retrieve_faq() -> answered',
  },
  {
    id: 'in-booking',
    jackCode: 'JACK IN-02',
    mode: 'inbound',
    title: 'Appointment Booking',
    subtitle: 'Checks live calendar slots, books visits & sends SMS/WhatsApp confirmation',
    scriptLine:
      '"Dr. Mehra has 11:30 AM and 4:15 PM open tomorrow. Which time would you like me to reserve for you?"',
    outcomeText: 'Slot locked directly in your calendar/CRM with instant confirmation sent to the caller.',
    systemActionMono: 'calendar.book_slot() + sms.send()',
  },
  {
    id: 'in-order',
    jackCode: 'JACK IN-03',
    mode: 'inbound',
    title: 'Order / Delivery Status',
    subtitle: 'Looks up live shipment status, return windows & invoice requests by phone number',
    scriptLine:
      '"I found Order #1042 linked to your phone number. It shipped via BlueDart and is scheduled for delivery tomorrow before 5 PM."',
    outcomeText: 'WISMO ("Where is my order?") calls resolved automatically 24/7.',
    systemActionMono: 'store.lookup_order(#1042)',
  },
  {
    id: 'in-afterhours',
    jackCode: 'JACK IN-04',
    mode: 'inbound',
    title: 'After-Hours Answering',
    subtitle: 'Captures late-night & Sunday callers when your office or store is closed',
    scriptLine:
      '"Our clinic desk is closed for the night, but as the AI assistant I can book your morning slot right now or flag an urgent callback for 9 AM."',
    outcomeText: 'Zero missed night or weekend leads; morning team starts with a structured call summary.',
    systemActionMono: 'after_hours.capture_and_schedule()',
  },
  {
    id: 'in-routing',
    jackCode: 'JACK IN-05',
    mode: 'inbound',
    title: 'Call Routing to Departments',
    subtitle: 'Understands what the caller needs & warm-transfers to Sales, Support, or Billing',
    scriptLine:
      '"Got it—since you need a custom corporate invoice revision, let me transfer you directly to Priya in our Billing team along with your details."',
    outcomeText: 'Warm call transfer to the right human department with context notes.',
    systemActionMono: 'sip.warm_transfer(dept="billing")',
  },

  /* OUTBOUND — CONSENT-BASED (5 Jacks) */
  {
    id: 'out-reminders',
    jackCode: 'JACK OUT-01',
    mode: 'outbound',
    title: 'Appointment Reminders',
    subtitle: 'Calls opted-in patients or clients ahead of their scheduled visit to confirm or reschedule',
    scriptLine:
      '"Hi Rahul, this is the AI assistant from Smile Dental calling to confirm your 11:30 AM appointment tomorrow. Say Confirm to keep it, or Reschedule to pick another time."',
    outcomeText: 'Reduces no-shows and fills cancelled calendar slots automatically.',
    systemActionMono: 'outbound.confirm_appointment()',
  },
  {
    id: 'out-lead-callback',
    jackCode: 'JACK OUT-02',
    mode: 'outbound',
    title: 'Lead Callbacks (within minutes of a form fill)',
    subtitle: 'Calls website or ad leads who requested a callback while their interest is highest',
    scriptLine:
      '"Hello! You just requested a callback on our website for the 3 BHK floor plan. I am the AI assistant—may I ask two quick questions before connecting our senior advisor?"',
    outcomeText: 'Reaches opted-in leads within minutes and transfers qualified buyers to your sales team.',
    systemActionMono: 'crm.trigger_instant_callback()',
  },
  {
    id: 'out-payment',
    jackCode: 'JACK OUT-03',
    mode: 'outbound',
    title: 'Payment Reminders',
    subtitle: 'Polite, consent-based reminders for upcoming renewals, EMI installments, or invoices',
    scriptLine:
      '"Hi Rohan, this is the AI assistant from Bright Academy with a friendly reminder that your Term-2 fee installment is due this Friday. Would you like me to send the payment link on WhatsApp?"',
    outcomeText: 'Timely fee and invoice collection with one-tap payment link delivery.',
    systemActionMono: 'billing.send_payment_link()',
  },
  {
    id: 'out-feedback',
    jackCode: 'JACK OUT-04',
    mode: 'outbound',
    title: 'Feedback Calls',
    subtitle: 'Short post-delivery or post-visit check-in calls to capture customer satisfaction',
    scriptLine:
      '"Hi Meera, this is the AI assistant from Cedar Retreat checking in after your stay. On a scale of 1 to 5, how was your experience with us?"',
    outcomeText: 'Logs CSAT ratings into your CRM and alerts managers if a customer reports an issue.',
    systemActionMono: 'csat.record_score_and_alert()',
  },
  {
    id: 'out-events',
    jackCode: 'JACK OUT-05',
    mode: 'outbound',
    title: 'Event / Webinar Confirmations',
    subtitle: 'Confirms attendance & shares joining instructions with registered attendees',
    scriptLine:
      '"Hello! You registered for tomorrow’s Masterclass at 5 PM. Shall I send the joining link and workbook PDF to your WhatsApp number?"',
    outcomeText: 'Higher webinar and open-house show-up rates among opted-in registrants.',
    systemActionMono: 'event.confirm_attendee()',
  },
];

/* ============================================================================
   MAIN COMPONENT: AiVoiceAgents
============================================================================ */
interface AiVoiceAgentsProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const AiVoiceAgents: React.FC<AiVoiceAgentsProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  const triggerQuoteModal = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: service }));
    }
  };

  /* ------------------------------------------------------------------------
     SECTION 1 STATE: Stack of Incoming Call Cards
  ------------------------------------------------------------------------ */
  const [activeCallIndex, setActiveCallIndex] = useState<number>(0);
  const [isHeroPaused, setIsHeroPaused] = useState<boolean>(false);

  useEffect(() => {
    if (shouldReduceMotion || isHeroPaused) return;
    const timer = setInterval(() => {
      setActiveCallIndex((prev) => (prev + 1) % HERO_CALL_STACK.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, isHeroPaused]);

  /* ------------------------------------------------------------------------
     SECTION 2 STATE: The Missed Call Pile Sliders & Toggle
  ------------------------------------------------------------------------ */
  const [callsPerDay, setCallsPerDay] = useState<number>(45);
  const [missedPercent, setMissedPercent] = useState<number>(25);
  const [customerValueINR, setCustomerValueINR] = useState<number>(3500);
  const [pileMode, setPileMode] = useState<'without-ai' | 'with-ai'>('without-ai');

  const monthlyMissedCalls = useMemo(() => {
    if (pileMode === 'with-ai') return 0;
    return Math.round(callsPerDay * (missedPercent / 100) * 30);
  }, [callsPerDay, missedPercent, pileMode]);

  const rawMonthlyMissedCalls = useMemo(
    () => Math.round(callsPerDay * (missedPercent / 100) * 30),
    [callsPerDay, missedPercent]
  );

  // Conservative illustrative conversion factor (20% of missed callers would have converted)
  const monthlyRevenueAtRisk = useMemo(() => {
    if (pileMode === 'with-ai') return 0;
    return Math.round(rawMonthlyMissedCalls * 0.2 * customerValueINR);
  }, [rawMonthlyMissedCalls, customerValueINR, pileMode]);

  /* ------------------------------------------------------------------------
     SECTION 3 STATE: "Press 1" vs "Just Say It" Replay Animation
  ------------------------------------------------------------------------ */
  const [comparisonStep, setComparisonStep] = useState<number>(4);

  const handleReplayComparison = () => {
    if (shouldReduceMotion) {
      setComparisonStep(4);
      return;
    }
    setComparisonStep(1);
  };

  useEffect(() => {
    if (comparisonStep >= 4) return;
    const timer = setTimeout(() => {
      setComparisonStep((prev) => prev + 1);
    }, 650);
    return () => clearTimeout(timer);
  }, [comparisonStep]);

  /* ------------------------------------------------------------------------
     SECTION 4 STATE: Inbound & Outbound Switchboard
  ------------------------------------------------------------------------ */
  const [switchboardMode, setSwitchboardMode] = useState<SwitchboardMode>('inbound');
  const [selectedJackId, setSelectedJackId] = useState<string>('in-booking');

  const visibleJacks = useMemo(
    () => SWITCHBOARD_JACKS.filter((j) => j.mode === switchboardMode),
    [switchboardMode]
  );

  const activeJack = useMemo(
    () => visibleJacks.find((j) => j.id === selectedJackId) || visibleJacks[0],
    [visibleJacks, selectedJackId]
  );

  const handleSwitchMode = (mode: SwitchboardMode) => {
    setSwitchboardMode(mode);
    const firstInMode = SWITCHBOARD_JACKS.find((j) => j.mode === mode);
    if (firstInMode) {
      setSelectedJackId(firstInMode.id);
    }
  };

  /* ------------------------------------------------------------------------
     SEO TITLE & META DESCRIPTION
  ------------------------------------------------------------------------ */
  useEffect(() => {
    document.title =
      'AI Voice Agents for Business | AI Phone Answering & Call Automation | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'AI voice agents that answer and make phone calls in natural English, Hindi, and more — handling 24/7 reception, appointment booking, FAQs, order status, and consent-based lead callbacks.'
      );
    }
  }, []);

  return (
    <main className="flex-1 bg-white text-navy">
      {/* ======================================================================
         SECTION 1 — HERO: ZERO MISSED CALLS (NAVY)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
        <div className="absolute -right-24 -top-20 w-[600px] h-[600px] blue-glow-strong pointer-events-none" />
        <div className="absolute -left-24 bottom-0 w-[460px] h-[460px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb: Home › AI Solutions › AI Voice Agents */}
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
              {VOICE_AGENT_SOLUTION.name}
            </span>
          </nav>

          {/* 50/50 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 50% (6 cols) */}
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em]">
                  <Mic className="w-3.5 h-3.5 text-primary" />
                  <span>AI VOICE AGENTS</span>
                </span>
                {VOICE_AGENT_SOLUTION.badge && (
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-wider">
                    {VOICE_AGENT_SOLUTION.badge}
                  </span>
                )}
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-[-0.02em]">
                Never Miss <span className="text-primary">a Call Again</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-xl">
                AI voice agents that answer, book, follow up and remind — in natural English, Hindi
                and more — and transfer to your team when a human is needed.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#ai-callback"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft transition-all"
                >
                  <span>Request a Callback From Our AI</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#switchboard"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>See Inbound vs Outbound</span>
                </a>
              </div>

              {/* Small Feature Row */}
              <div className="mt-9 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5 text-[13px] font-semibold text-white/80">
                <span>24/7 Reception</span>
                <span className="text-primary">·</span>
                <span>Bookings</span>
                <span className="text-primary">·</span>
                <span>Lead Callbacks</span>
                <span className="text-primary">·</span>
                <span>Reminders</span>
              </div>
            </div>

            {/* Right 50% (6 cols): Stack of Incoming Call Cards + Live Spectrogram */}
            <div
              className="lg:col-span-6 relative"
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
            >
              <div className="rounded-[26px] bg-white/[0.05] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl relative overflow-hidden">
                {/* Top Counter Strip: Missed calls today: 0 */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/25 border border-primary/50 text-white text-[13px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>
                      Missed calls today: <strong className="font-mono text-white">0</strong>
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-primary-100">
                    AI Disclosure: Enabled on every call
                  </span>
                </div>

                {/* Decorative Animated Spectrogram Behind the Stack */}
                <div
                  className="flex items-end justify-between gap-1 h-16 px-3 mb-5 rounded-2xl bg-navy/80 border border-white/10 py-2.5"
                  aria-hidden="true"
                >
                  {SPECTROGRAM_BARS.map((heightPct, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-full bg-gradient-to-t from-primary/40 via-primary to-primary-100 transition-all duration-500"
                      style={{
                        height: `${
                          idx % 2 === activeCallIndex % 2
                            ? Math.min(100, heightPct + 14)
                            : Math.max(22, heightPct - 12)
                        }%`,
                      }}
                    />
                  ))}
                </div>

                {/* Desktop Stack of Call Cards / Mobile Single Cycling Card */}
                <div className="space-y-3 relative z-10" aria-live="polite">
                  {HERO_CALL_STACK.map((callItem, idx) => {
                    const isActive = idx === activeCallIndex;
                    return (
                      <div
                        key={callItem.id}
                        onClick={() => {
                          setActiveCallIndex(idx);
                          setIsHeroPaused(true);
                        }}
                        className={`rounded-[20px] p-4 sm:p-5 border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-white text-navy border-white shadow-xl scale-[1.01] block'
                            : 'bg-navy/90 text-white border-white/10 hover:border-primary/50 hidden sm:block opacity-85'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                isActive
                                  ? 'bg-primary text-white'
                                  : 'bg-white/10 text-primary-100'
                              }`}
                            >
                              <PhoneIncoming className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className={`font-mono text-[14px] font-extrabold ${
                                    isActive ? 'text-navy' : 'text-white'
                                  }`}
                                >
                                  {callItem.maskedCaller}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                                    isActive
                                      ? 'bg-primary-50 text-primary'
                                      : 'bg-white/10 text-white/75'
                                  }`}
                                >
                                  {callItem.callTimeMono} · {callItem.durationMono}
                                </span>
                              </div>
                              <div
                                className={`text-[12px] mt-0.5 ${
                                  isActive ? 'text-navy-60' : 'text-white/65'
                                }`}
                              >
                                {callItem.callerLabel}
                              </div>
                            </div>
                          </div>

                          {/* Flipped Badge: Answered by AI ✓ + 1-line outcome */}
                          <div className="flex flex-col items-end gap-1">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-white text-[11px] font-extrabold">
                              <Check className="w-3 h-3" strokeWidth={3} />
                              <span>Answered by AI</span>
                            </span>
                            <span
                              className={`font-mono text-[11px] font-bold ${
                                isActive ? 'text-primary' : 'text-primary-100'
                              }`}
                            >
                              {callItem.outcomeBadge}
                            </span>
                          </div>
                        </div>

                        {/* Expanded Transcript Snippet on Active Call Card */}
                        {isActive && (
                          <div className="mt-3.5 pt-3 border-t border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px]">
                            <p className="text-navy-70 font-medium italic">
                              {callItem.aiDisclosureLine}
                            </p>
                            <span className="font-mono text-[11px] font-semibold text-navy-50 shrink-0">
                              {callItem.intentSummary}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Card Selector Dots */}
                <div className="mt-4 flex items-center justify-between text-[11px] text-white/70">
                  <span>Click any incoming call to inspect outcome</span>
                  <div className="flex items-center gap-1.5">
                    {HERO_CALL_STACK.map((c, i) => (
                      <button
                        key={c.id}
                        type="button"
                        aria-label={`Inspect call ${i + 1}`}
                        onClick={() => {
                          setActiveCallIndex(i);
                          setIsHeroPaused(true);
                        }}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          i === activeCallIndex ? 'w-6 bg-primary' : 'w-2 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — THE MISSED CALL PILE (WHITE)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Mode Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                REVENUE AT RISK ESTIMATOR
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Every Missed Call Is <span className="text-primary">a Missed Customer</span>
              </h2>
              <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
                When callers hit a busy tone during peak hours or ring after 7 PM, most do not leave
                a voicemail—they call the next business on Google.
              </p>
            </div>

            {/* Toggle: Without AI | With AI Voice Agent */}
            <div
              className="inline-flex items-center p-1.5 rounded-full bg-primary-50 border border-primary-100 self-start lg:self-auto"
              role="radiogroup"
              aria-label="Compare Without AI versus With AI Voice Agent"
            >
              <button
                type="button"
                role="radio"
                aria-checked={pileMode === 'without-ai'}
                onClick={() => setPileMode('without-ai')}
                className={`px-5 py-2.5 rounded-full text-[13px] font-extrabold transition-all cursor-pointer ${
                  pileMode === 'without-ai'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-navy-70 hover:text-navy'
                }`}
              >
                Without AI
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={pileMode === 'with-ai'}
                onClick={() => setPileMode('with-ai')}
                className={`px-5 py-2.5 rounded-full text-[13px] font-extrabold transition-all cursor-pointer ${
                  pileMode === 'with-ai'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-navy-70 hover:text-primary'
                }`}
              >
                With AI Voice Agent
              </button>
            </div>
          </div>

          {/* Split Layout: Left Phone Handset + Notification Pile (5 cols) | Right 3 Sliders & Results (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Generic Phone Handset & Stacking Missed-Call Pile */}
            <div className="lg:col-span-5 rounded-[24px] bg-navy text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-16 -bottom-16 w-64 h-64 blue-glow pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                    {pileMode === 'without-ai'
                      ? 'UNATTENDED PHONE QUEUE'
                      : 'AI VOICE RECEPTIONIST ACTIVE'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 font-mono text-[11px] font-bold text-white">
                    {pileMode === 'without-ai'
                      ? `${rawMonthlyMissedCalls} missed / mo`
                      : '0 missed / mo'}
                  </span>
                </div>

                {/* Pile Area */}
                <AnimatePresence mode="wait">
                  {pileMode === 'without-ai' ? (
                    <motion.div
                      key="pile-without-ai"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.22 }}
                      className="space-y-2.5"
                    >
                      {MISSED_PILE_SAMPLE.map((item, idx) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-white/[0.07] border border-white/15 flex items-center justify-between gap-3"
                          style={{
                            transform: `translateX(${idx % 2 === 0 ? '0px' : '6px'})`,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/10 text-primary-100 flex items-center justify-center shrink-0">
                              <PhoneMissed className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-mono text-[13px] font-bold text-white">
                                {item.caller}
                              </div>
                              <div className="text-[11px] text-white/70">{item.missedReason}</div>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-primary-100 shrink-0">
                            {item.timeAgo}
                          </span>
                        </div>
                      ))}

                      <div className="pt-2 text-center font-mono text-[12px] text-primary-100">
                        + {Math.max(0, rawMonthlyMissedCalls - 4)} more unanswered calls every month
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="pile-with-ai"
                      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.24 }}
                      className="py-8"
                    >
                      {/* Single Blue Card: "All calls answered" */}
                      <div className="p-6 rounded-[22px] bg-primary text-white border-2 border-white shadow-xl text-center space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-white text-primary flex items-center justify-center mx-auto shadow-md">
                          <Check className="w-7 h-7" strokeWidth={3} />
                        </div>
                        <div className="text-[22px] font-extrabold tracking-tight">
                          All calls answered
                        </div>
                        <p className="text-[13px] text-white/90 leading-relaxed">
                          Simultaneous inbound capacity answers peak-hour &amp; late-night callers on
                          the first ring—booking appointments, answering FAQs, or transferring urgent
                          calls to your team.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Stylized Generic Handset Base Illustration */}
              <div
                className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-white">Business Reception Line</div>
                    <div className="font-mono text-[11px] text-white/65">
                      {pileMode === 'without-ai'
                        ? 'Single-line bottleneck'
                        : 'Concurrent AI voice lines active'}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 font-mono text-[11px] text-primary-100">
                  24/7/365
                </span>
              </div>
            </div>

            {/* Right: 3 Interactive Sliders + Live Output Cards */}
            <div className="lg:col-span-7 rounded-[24px] bg-primary-50/50 border border-navy-08 p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Slider 1: Calls per day (5–500) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-navy-08">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="slider-calls-per-day"
                      className="text-[14px] sm:text-[15px] font-extrabold text-navy"
                    >
                      1. Calls per day
                    </label>
                    <span className="px-3 py-1 rounded-lg bg-primary-50 font-mono text-[14px] font-extrabold text-primary">
                      {callsPerDay} calls / day
                    </span>
                  </div>
                  <input
                    id="slider-calls-per-day"
                    type="range"
                    min={5}
                    max={500}
                    step={5}
                    value={callsPerDay}
                    onChange={(e) => setCallsPerDay(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[11px] text-navy-50 mt-1">
                    <span>5 calls</span>
                    <span>250 calls</span>
                    <span>500 calls</span>
                  </div>
                </div>

                {/* Slider 2: Missed or after-hours % (5–60%) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-navy-08">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="slider-missed-pct"
                      className="text-[14px] sm:text-[15px] font-extrabold text-navy"
                    >
                      2. Missed or after-hours %
                    </label>
                    <span className="px-3 py-1 rounded-lg bg-primary-50 font-mono text-[14px] font-extrabold text-primary">
                      {missedPercent}%
                    </span>
                  </div>
                  <input
                    id="slider-missed-pct"
                    type="range"
                    min={5}
                    max={60}
                    step={5}
                    value={missedPercent}
                    onChange={(e) => setMissedPercent(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[11px] text-navy-50 mt-1">
                    <span>5% (Low)</span>
                    <span>30% (Typical)</span>
                    <span>60% (Peak/After-hours)</span>
                  </div>
                </div>

                {/* Slider 3: Average value of a new customer (₹) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-navy-08">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="slider-customer-value"
                      className="text-[14px] sm:text-[15px] font-extrabold text-navy"
                    >
                      3. Average value of a new customer (₹)
                    </label>
                    <span className="px-3 py-1 rounded-lg bg-primary-50 font-mono text-[14px] font-extrabold text-primary">
                      ₹{customerValueINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    id="slider-customer-value"
                    type="range"
                    min={500}
                    max={50000}
                    step={500}
                    value={customerValueINR}
                    onChange={(e) => setCustomerValueINR(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[11px] text-navy-50 mt-1">
                    <span>₹500</span>
                    <span>₹25,000</span>
                    <span>₹50,000</span>
                  </div>
                </div>
              </div>

              {/* Results Bar */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-live="polite">
                <div className="p-5 rounded-2xl bg-navy text-white">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                    MONTHLY UNANSWERED CALLS
                  </div>
                  <div className="text-[28px] sm:text-[32px] font-extrabold font-mono mt-1">
                    {monthlyMissedCalls.toLocaleString('en-IN')} missed calls / month
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-primary text-white">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/85">
                    ESTIMATED OPPORTUNITY
                  </div>
                  <div className="text-[26px] sm:text-[30px] font-extrabold font-mono mt-1">
                    ≈ ₹{monthlyRevenueAtRisk.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[12px] text-white/90 font-medium">
                    potential revenue at risk / month
                  </div>
                </div>
              </div>

              {/* Mandatory Disclaimer */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[12px] text-navy-60">
                <span>Illustrative estimate based on your inputs.</span>
                <button
                  type="button"
                  onClick={() =>
                    triggerQuoteModal(
                      `AI Voice Agent Assessment (${callsPerDay} calls/day, ~${rawMonthlyMissedCalls} missed/mo)`
                    )
                  }
                  className="font-bold text-primary hover:underline cursor-pointer"
                >
                  Capture these calls with an AI Voice Agent →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — "PRESS 1" VS "JUST SAY IT" (LIGHT BLUE TINT)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50/60 border-y border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Replay Button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                IVR MENU MAZE VS NATURAL VOICE AI
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                No More <span className="text-primary">Phone Menus</span>. Just Natural
                Conversation.
              </h2>
            </div>

            <button
              type="button"
              onClick={handleReplayComparison}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy hover:bg-primary text-white text-[13px] font-bold transition-colors cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay</span>
            </button>
          </div>

          {/* Two Panels Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Panel (6 cols): Old IVR Menu Maze Tree */}
            <div className="lg:col-span-6 rounded-[24px] bg-white border border-navy-15 p-6 sm:p-8 flex flex-col justify-between shadow-soft">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-navy-08">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-navy/10 text-navy font-mono text-[11px] font-extrabold uppercase">
                      OLD IVR KEYPAD TREE
                    </span>
                    <h3 className="text-[20px] font-extrabold text-navy mt-2">
                      &ldquo;Press 1… Press 3… Press 9 to repeat&rdquo;
                    </h3>
                  </div>

                  {/* Timer Counting Up to 03:42 */}
                  <div className="px-3.5 py-2 rounded-xl bg-navy text-white font-mono text-right">
                    <div className="text-[10px] text-white/65">CALL TIMER</div>
                    <div className="text-[18px] font-extrabold">
                      {comparisonStep === 1
                        ? '00:48'
                        : comparisonStep === 2
                        ? '01:36'
                        : comparisonStep === 3
                        ? '02:29'
                        : '03:42'}
                    </div>
                  </div>
                </div>

                {/* Tangled Menu Maze Steps */}
                <div className="space-y-3 relative">
                  {IVR_MAZE_STEPS.map((ivr, idx) => {
                    const visible = idx < comparisonStep;
                    return (
                      <div
                        key={ivr.step}
                        className={`p-4 rounded-2xl border transition-all ${
                          visible
                            ? 'bg-primary-50/35 border-navy-15 opacity-100'
                            : 'bg-white border-navy-08 opacity-35'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-[11px] font-bold text-navy-60 mb-1">
                          <span className="inline-flex items-center gap-1.5">
                            <GitBranch className="w-3.5 h-3.5 text-navy-50" />
                            <span>{ivr.step}</span>
                          </span>
                          <span>{ivr.elapsedMono}</span>
                        </div>
                        <p className="font-mono text-[13px] text-navy leading-snug">{ivr.prompt}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* End Chip: Caller Lost in Maze -> "Hung up" (Navy tint) */}
              <div className="mt-6 pt-4 border-t border-navy-08 flex items-center justify-between gap-3">
                <span className="text-[13px] font-semibold text-navy-70">
                  Caller gets stuck in keypad loops
                </span>
                <span className="px-4 py-1.5 rounded-full bg-navy text-white font-mono text-[12px] font-extrabold">
                  03:42 · Hung up
                </span>
              </div>
            </div>

            {/* Right Panel (6 cols): AI Voice Agent ("Just Say It") */}
            <div className="lg:col-span-6 rounded-[24px] bg-navy text-white border-2 border-primary p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                      WEBXCODE AI VOICE AGENT
                    </span>
                    <h3 className="text-[20px] font-extrabold text-white mt-2">
                      &ldquo;Just say what you need&rdquo;
                    </h3>
                  </div>

                  {/* Timer Stops at 00:38 */}
                  <div className="px-3.5 py-2 rounded-xl bg-primary text-white font-mono text-right">
                    <div className="text-[10px] text-white/85">CALL TIMER</div>
                    <div className="text-[18px] font-extrabold">
                      {comparisonStep === 1
                        ? '00:05'
                        : comparisonStep === 2
                        ? '00:14'
                        : comparisonStep === 3
                        ? '00:25'
                        : '00:38'}
                    </div>
                  </div>
                </div>

                {/* Natural Conversation Speech Bubbles */}
                <div className="space-y-3" role="log" aria-live="polite">
                  {NATURAL_VOICE_TURNS.map((turn, idx) => {
                    const visible = idx <= comparisonStep;
                    const isCaller = turn.speaker === 'Caller';
                    return (
                      <div
                        key={turn.timeMono}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          !visible
                            ? 'opacity-25 border-white/10'
                            : isCaller
                            ? 'bg-white text-navy border-white'
                            : 'bg-primary/20 text-white border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-[10px] font-bold mb-1">
                          <span className={isCaller ? 'text-primary' : 'text-primary-100'}>
                            {turn.speaker.toUpperCase()}
                          </span>
                          <span className={isCaller ? 'text-navy-50' : 'text-primary-100'}>
                            {turn.timeMono}
                          </span>
                        </div>
                        <p className="text-[13px] sm:text-[14px] font-medium leading-snug">
                          {turn.line}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Outcome Chip at 00:38 */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-[13px] font-semibold text-white/80">
                  Zero keypad menus · Instant calendar sync
                </span>
                <span className="px-4 py-1.5 rounded-full bg-primary text-white font-mono text-[12px] font-extrabold">
                  00:38 · Done ✓ SMS sent
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — INBOUND & OUTBOUND: THE SWITCHBOARD (WHITE, id="switchboard")
      ====================================================================== */}
      <section id="switchboard" className="py-[72px] lg:py-[112px] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Inbound / Outbound Radio Group Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                TELEPHONY SWITCHBOARD ARCHITECTURE
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Answers Calls. <span className="text-primary">Makes Calls.</span> All Day.
              </h2>
              <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
                Toggle between Inbound and Outbound below, then click any switchboard jack to
                inspect the live script line and system action.
              </p>
            </div>

            {/* Accessible Radiogroup Toggle: Inbound | Outbound */}
            <div
              className="inline-flex items-center p-1.5 rounded-full bg-primary-50 border border-primary-100 self-start lg:self-auto"
              role="radiogroup"
              aria-label="Switchboard call direction"
            >
              <button
                type="button"
                role="radio"
                aria-checked={switchboardMode === 'inbound'}
                onClick={() => handleSwitchMode('inbound')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-extrabold transition-all cursor-pointer ${
                  switchboardMode === 'inbound'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-navy-70 hover:text-navy'
                }`}
              >
                <PhoneIncoming className="w-4 h-4 text-primary" />
                <span>Inbound (5)</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={switchboardMode === 'outbound'}
                onClick={() => handleSwitchMode('outbound')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-extrabold transition-all cursor-pointer ${
                  switchboardMode === 'outbound'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-navy-70 hover:text-primary'
                }`}
              >
                <PhoneOutgoing className="w-4 h-4" />
                <span>Outbound · Consent-Based (5)</span>
              </button>
            </div>
          </div>

          {/* Stylized Vintage Telephone Switchboard Panel (Navy Panel with Round Jacks & Patch Cables) */}
          <div className="rounded-[26px] bg-navy text-white p-6 sm:p-8 lg:p-10 border border-navy shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left (3 cols): Central "AI Agent" Master Jack Hub */}
              <div className="lg:col-span-3 rounded-2xl bg-white/[0.05] border border-white/15 p-5 text-center flex flex-col items-center justify-center">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary-100 mb-3">
                  MASTER PATCH CORE
                </div>

                {/* Round Metallic-Style Switchboard Jack in Blue/Navy */}
                <div className="w-20 h-20 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center shadow-lg relative">
                  <div className="w-9 h-9 rounded-full bg-navy border-2 border-white flex items-center justify-center">
                    <Mic className="w-4 h-4 text-primary" />
                  </div>
                  <span className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-primary border-2 border-navy animate-pulse" />
                </div>

                <div className="text-[17px] font-extrabold text-white mt-3.5">AI Agent Jack</div>
                <div className="font-mono text-[11px] text-white/70 mt-1">
                  {switchboardMode === 'inbound'
                    ? 'MODE: INBOUND RECEPTION'
                    : 'MODE: OPT-IN OUTBOUND'}
                </div>

                {/* Patch Cable Indicator */}
                <div className="mt-4 px-3 py-1.5 rounded-full bg-primary text-white font-mono text-[11px] font-bold">
                  PATCHED → {activeJack.jackCode}
                </div>
              </div>

              {/* Center (5 cols): 5 Destination Jacks with Animated Blue Patch Cable Connectors */}
              <div
                className="lg:col-span-5 space-y-2.5"
                role="tablist"
                aria-label={`${switchboardMode} destination jacks`}
              >
                {visibleJacks.map((jack) => {
                  const isPlugged = jack.id === activeJack.id;
                  return (
                    <button
                      key={jack.id}
                      type="button"
                      role="tab"
                      aria-selected={isPlugged}
                      onClick={() => setSelectedJackId(jack.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isPlugged
                          ? 'bg-primary text-white border-white shadow-lg'
                          : 'bg-white/[0.04] text-white border-white/12 hover:border-primary/60 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Round Switchboard Socket Ring */}
                        <div
                          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isPlugged
                              ? 'bg-navy border-white text-primary'
                              : 'bg-navy border-white/30 text-white/60'
                          }`}
                        >
                          <span
                            className={`w-3 h-3 rounded-full ${
                              isPlugged ? 'bg-primary' : 'bg-white/30'
                            }`}
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-mono text-[10px] font-bold ${
                                isPlugged ? 'text-white/90' : 'text-primary-100'
                              }`}
                            >
                              {jack.jackCode}
                            </span>
                            <span className="text-[14px] sm:text-[15px] font-extrabold truncate">
                              {jack.title}
                            </span>
                          </div>
                          <p
                            className={`text-[12px] truncate mt-0.5 ${
                              isPlugged ? 'text-white/90' : 'text-white/65'
                            }`}
                          >
                            {jack.subtitle}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold shrink-0 ${
                          isPlugged ? 'bg-navy text-white' : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {isPlugged ? 'PLUGGED' : 'PATCH'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right (4 cols): Active Jack Script Line + Outcome Card */}
              <div className="lg:col-span-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeJack.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-[22px] bg-white text-navy p-5 sm:p-6 shadow-xl space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-navy-08">
                      <span className="px-2.5 py-1 rounded bg-primary-50 text-primary font-mono text-[11px] font-extrabold">
                        {activeJack.jackCode}
                      </span>
                      <span className="font-mono text-[11px] text-navy-50">
                        {activeJack.mode.toUpperCase()} LINE
                      </span>
                    </div>

                    <div>
                      <h3 className="text-[19px] font-extrabold text-navy">{activeJack.title}</h3>
                      <p className="text-[13px] text-navy-60 mt-1">{activeJack.subtitle}</p>
                    </div>

                    {/* Example Script Line */}
                    <div className="p-3.5 rounded-xl bg-primary-50/60 border border-primary-100">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
                        SAMPLE AI SCRIPT LINE
                      </div>
                      <p className="text-[13px] text-navy font-medium italic leading-relaxed">
                        {activeJack.scriptLine}
                      </p>
                    </div>

                    {/* Outcome */}
                    <div className="p-3.5 rounded-xl bg-navy text-white">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100 mb-1">
                        CALL OUTCOME · {activeJack.systemActionMono}
                      </div>
                      <p className="text-[13px] text-white/90 leading-snug">
                        {activeJack.outcomeText}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Mandatory Outbound Compliance Note */}
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-white/80">
              <div className="flex items-center gap-2.5 flex-wrap">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>
                  <strong className="text-white">Compliance Rule:</strong> Outbound calls only to
                  people who opted in, following DND/TCPA rules. Need multi-step back-office
                  execution? Explore{' '}
                  <Link
                    to="/ai-solutions/ai-agents-for-business"
                    className="text-primary-100 font-bold underline hover:text-white"
                  >
                    AI Agents for Business →
                  </Link>
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  triggerQuoteModal(`AI Voice Agent — ${activeJack.title} (${switchboardMode})`)
                }
                className="font-bold text-primary-100 hover:text-white inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Configure this line for your business</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AiVoiceAgents;
