import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  MessageSquare,
  Smartphone,
  Sun,
  Sunset,
  Moon,
  Clock,
  ShoppingBag,
  CreditCard,
  MapPin,
  FileText,
  Calendar,
  Mic,
  List,
  ShieldCheck,
  Lock,
  Ban,
  Activity,
  CheckCheck,
  Send,
  Sparkles,
  Bot,
  ChevronLeft,
} from 'lucide-react';
import { aiSolutions } from '../AISolutions';

/* ============================================================================
   SINGLE SOURCE OF TRUTH IMPORT (`whatsapp-ai-chatbot` from AISolutions.tsx)
============================================================================ */
const WHATSAPP_SOLUTION =
  aiSolutions.find((s) => s.slug === 'whatsapp-ai-chatbot') || {
    slug: 'whatsapp-ai-chatbot',
    name: 'WhatsApp AI Chatbot',
    category: 'AI Build' as const,
    badge: null,
    tagline: 'Automated WhatsApp Business API assistant for sales, bookings & support',
    description:
      'An AI assistant on the official WhatsApp Business Platform that answers questions, shares your catalog, books appointments, sends order updates and captures leads — even while you sleep.',
  };

/* ============================================================================
   SECTION 1 DATA — HERO: DAY -> EVENING -> NIGHT PHONE CHAT CYCLE
============================================================================ */
interface HeroTimePhase {
  id: 'day' | 'evening' | 'night';
  label: string;
  clockChip: string;
  skyBadge: string;
  nightSticker?: string;
  messages: {
    sender: 'customer' | 'bot';
    text: string;
    time: string;
    metaTag?: string;
  }[];
}

const HERO_TIME_PHASES: HeroTimePhase[] = [
  {
    id: 'day',
    label: 'Day Shift',
    clockChip: '10:15 AM',
    skyBadge: 'Morning Peak · Instant Catalog & Order Tracking',
    messages: [
      {
        sender: 'customer',
        text: 'Hi Nova & Co.! Where is my order #NC-4812?',
        time: '10:14 AM',
      },
      {
        sender: 'bot',
        text: 'Hello! Order #NC-4812 (Linen Co-ord Set) is out for delivery via BlueDart and arrives today before 4:30 PM.',
        time: '10:15 AM',
        metaTag: 'API Lookup · 0.8s',
      },
      {
        sender: 'customer',
        text: 'Awesome! Also do you have matching travel pouches in stock?',
        time: '10:15 AM',
      },
      {
        sender: 'bot',
        text: 'Yes! Here are 3 travel pouches ready to ship today. Tap any item to view details or pay via UPI link.',
        time: '10:15 AM',
        metaTag: 'Catalog Shared',
      },
    ],
  },
  {
    id: 'evening',
    label: 'Evening Rush',
    clockChip: '7:40 PM',
    skyBadge: 'After-Hours Rush · Automated Slot Booking',
    messages: [
      {
        sender: 'customer',
        text: 'Can I book a bridal styling session at your studio for tomorrow?',
        time: '7:39 PM',
      },
      {
        sender: 'bot',
        text: 'Certainly! We have 11:30 AM and 4:00 PM open tomorrow with our senior stylist. Which slot works best for you?',
        time: '7:39 PM',
        metaTag: 'Calendar Synced',
      },
      {
        sender: 'customer',
        text: '4:00 PM please.',
        time: '7:40 PM',
      },
      {
        sender: 'bot',
        text: 'Confirmed for tomorrow at 4:00 PM! Booking ID: #BK-904. I have shared the studio location pin & calendar invite.',
        time: '7:40 PM',
        metaTag: 'Slot Locked',
      },
    ],
  },
  {
    id: 'night',
    label: 'Late Night',
    clockChip: '2:05 AM',
    skyBadge: '2:05 AM · While Your Team Sleeps',
    nightSticker: 'Store closed — your bot is still selling.',
    messages: [
      {
        sender: 'customer',
        text: 'Hey, how much is the Festive Gift Hamper for 25 corporate boxes?',
        time: '2:04 AM',
      },
      {
        sender: 'bot',
        text: 'Our Signature Festive Hamper is ₹1,499/box. For 25+ boxes, you get a 12% corporate tier (₹1,319/box) with custom logo sleeves!',
        time: '2:04 AM',
        metaTag: 'Price Sheet Grounded',
      },
      {
        sender: 'customer',
        text: 'Great, can I reserve a sample box right now?',
        time: '2:05 AM',
      },
      {
        sender: 'bot',
        text: 'Here is your instant sample checkout link (₹1,499 via UPI / Card). Our B2B manager will also call you at 10 AM!',
        time: '2:05 AM',
        metaTag: 'Payment Link + Lead Saved',
      },
    ],
  },
];

/* ============================================================================
   SECTION 2 DATA — MESSAGE TYPES: THE VENDING MACHINE (8 SLOTS)
============================================================================ */
interface VendingSlotItem {
  slotCode: string;
  id: string;
  name: string;
  shortTag: string;
  bestForCaption: string;
  customerTrigger: string;
  botIntro: string;
  payloadType:
    | 'quick-replies'
    | 'list-menu'
    | 'catalog'
    | 'payment-link'
    | 'location-pin'
    | 'document'
    | 'appointment-slots'
    | 'voice-transcript';
}

const VENDING_SLOTS: VendingSlotItem[] = [
  {
    slotCode: 'A1',
    id: 'quick-reply-buttons',
    name: 'Quick Reply Buttons',
    shortTag: '3 Tap Chips',
    bestForCaption:
      'Best for: Letting customers pick the next action in one tap without typing long sentences.',
    customerTrigger: 'Hi, I need help with my recent purchase.',
    botIntro: 'Welcome to Nova & Co.! How can I help you today? Tap an option below:',
    payloadType: 'quick-replies',
  },
  {
    slotCode: 'A2',
    id: 'list-menu',
    name: 'List Menu',
    shortTag: '5-Option Drawer',
    bestForCaption:
      'Best for: Service businesses, clinics & coaching institutes offering up to 10 structured categories.',
    customerTrigger: 'What services and consultations do you offer?',
    botIntro: 'Browse our complete service menu below and select a category to see fees & timings:',
    payloadType: 'list-menu',
  },
  {
    slotCode: 'A3',
    id: 'product-catalog',
    name: 'Product Catalog',
    shortTag: '3 SKU Cards',
    bestForCaption:
      'Best for: D2C stores & retailers showcasing products with live prices right inside the chat.',
    customerTrigger: 'Show me your bestselling skincare kits under ₹2,000.',
    botIntro: 'Here are our top 3 dermatologist-tested kits in stock today:',
    payloadType: 'catalog',
  },
  {
    slotCode: 'A4',
    id: 'payment-link',
    name: 'Payment Link',
    shortTag: 'UPI / Card Pay',
    bestForCaption:
      'Best for: Closing orders, collecting booking deposits, or renewing plans via Razorpay / Cashfree UPI & card links.',
    customerTrigger: "I'll take the Hydrating Barrier Kit. Send me the payment link.",
    botIntro: 'Your order #ORD-7741 is ready! Complete your payment securely below:',
    payloadType: 'payment-link',
  },
  {
    slotCode: 'B1',
    id: 'location-pin',
    name: 'Location Pin',
    shortTag: 'Map Directions',
    bestForCaption:
      'Best for: Clinics, showrooms, hotels, and experience centers sharing exact map coordinates & parking info.',
    customerTrigger: 'Where is your flagship clinic located?',
    botIntro: 'Here is our clinic location pin. Basement parking is available at Gate 2:',
    payloadType: 'location-pin',
  },
  {
    slotCode: 'B2',
    id: 'document',
    name: 'Document',
    shortTag: 'PDF Invoice / Brochure',
    bestForCaption:
      'Best for: Sending GST invoices, course brochures, lab reports, or floor-plan PDFs automatically.',
    customerTrigger: 'Can you share the GST invoice for order #1042?',
    botIntro: 'Here is your verified tax invoice PDF for Order #1042:',
    payloadType: 'document',
  },
  {
    slotCode: 'B3',
    id: 'appointment-slots',
    name: 'Appointment Slots',
    shortTag: 'Live Time Picker',
    bestForCaption:
      'Best for: Doctors, salons, real-estate site visits, and consultants locking in calendar slots 24/7.',
    customerTrigger: 'Do you have consultation slots open this Friday?',
    botIntro: 'We have 4 slots available this Friday, 14 Nov. Tap a time to confirm:',
    payloadType: 'appointment-slots',
  },
  {
    slotCode: 'B4',
    id: 'voice-note-text',
    name: 'Voice Note → Text',
    shortTag: 'AI Audio Transcript',
    bestForCaption:
      'Best for: Customers who prefer speaking a quick voice note in English, Hindi, or Hinglish while on the move.',
    customerTrigger: '[Voice Note · 0:11]',
    botIntro:
      'Got your voice note! Yes, we can reschedule your Friday delivery to Monday morning between 10 AM and 12 PM.',
    payloadType: 'voice-transcript',
  },
];

/* ============================================================================
   SECTION 3 DATA — USE CASES: THE TWO-PANE CHAT LIST (6 CONVERSATIONS)
============================================================================ */
interface ChatUseCaseMessage {
  sender: 'customer' | 'bot';
  text: string;
  time: string;
  richBadge?: string;
  richItems?: string[];
}

interface ChatUseCaseThread {
  id: string;
  avatarInitial: string;
  title: string;
  businessType: string;
  lastMessagePreview: string;
  lastTime: string;
  unreadCount: number;
  templateTag: string;
  messages: ChatUseCaseMessage[];
}

const USE_CASE_THREADS: ChatUseCaseThread[] = [
  {
    id: 'order-updates',
    avatarInitial: 'OU',
    title: 'Order Updates',
    businessType: 'D2C Store',
    lastMessagePreview: 'Order #NV-8821 out for delivery · Track live',
    lastTime: '11:04 AM',
    unreadCount: 2,
    templateTag: 'order_status_utility_v2',
    messages: [
      {
        sender: 'bot',
        text: 'Hi Aarav! Your Nova & Co. Order #NV-8821 has been packed and handed over to Delhivery.',
        time: '10:58 AM',
        richBadge: 'Approved Template · order_shipped_v2',
      },
      {
        sender: 'customer',
        text: 'When will it reach Gurgaon Sector 43?',
        time: '11:01 AM',
      },
      {
        sender: 'bot',
        text: 'Live courier scan shows your package is at the Gurgaon hub and scheduled for delivery today between 2:00 PM and 5:00 PM.',
        time: '11:01 AM',
        richItems: ['Track Live Package', 'Download Invoice-8821.pdf'],
      },
      {
        sender: 'customer',
        text: 'Can the delivery partner leave it at the security desk?',
        time: '11:03 AM',
      },
      {
        sender: 'bot',
        text: 'Done! I have added the delivery instruction "Leave at main security gate" to Shipment #NV-8821.',
        time: '11:04 AM',
      },
    ],
  },
  {
    id: 'appointment-booking',
    avatarInitial: 'AB',
    title: 'Appointment Booking',
    businessType: 'Clinic',
    lastMessagePreview: 'Confirmed: Saturday 11:30 AM with Dr. Mehra',
    lastTime: '10:42 AM',
    unreadCount: 1,
    templateTag: 'clinic_slot_booking',
    messages: [
      {
        sender: 'customer',
        text: 'Hi, I want to book a dermatology consultation for this Saturday.',
        time: '10:39 AM',
      },
      {
        sender: 'bot',
        text: 'Hello! Dr. Ritika Mehra is available this Saturday. Please tap a convenient time slot below:',
        time: '10:39 AM',
        richBadge: 'Interactive Slot Buttons',
        richItems: ['Sat · 10:00 AM', 'Sat · 11:30 AM ✓', 'Sat · 04:15 PM'],
      },
      {
        sender: 'customer',
        text: 'Sat · 11:30 AM',
        time: '10:40 AM',
      },
      {
        sender: 'bot',
        text: 'Great! Please share the patient name to lock the 11:30 AM slot.',
        time: '10:40 AM',
      },
      {
        sender: 'customer',
        text: 'Neha Verma',
        time: '10:41 AM',
      },
      {
        sender: 'bot',
        text: 'Appointment confirmed for Neha Verma on Saturday at 11:30 AM (#APT-309). We will send an automated reminder 3 hours before your visit!',
        time: '10:42 AM',
        richItems: ['View Clinic Location Pin', 'Reschedule Slot'],
      },
    ],
  },
  {
    id: 'lead-qualification',
    avatarInitial: 'LQ',
    title: 'Lead Qualification',
    businessType: 'Real Estate',
    lastMessagePreview: '3 BHK floor plan sent · Site visit scheduled',
    lastTime: '09:50 AM',
    unreadCount: 3,
    templateTag: 'crm_lead_qualifier',
    messages: [
      {
        sender: 'customer',
        text: 'Saw your ad for Skyline Residences. Please share price & brochure.',
        time: '09:46 AM',
      },
      {
        sender: 'bot',
        text: 'Welcome to Skyline Residences! To share the right floor plan PDF, which configuration are you exploring?',
        time: '09:46 AM',
        richItems: ['2 BHK (₹1.15 Cr+)', '3 BHK + Study (₹1.65 Cr+) ✓', 'Penthouse'],
      },
      {
        sender: 'customer',
        text: '3 BHK + Study. Looking for ready-to-move or possession within 6 months.',
        time: '09:48 AM',
      },
      {
        sender: 'bot',
        text: 'Tower B has possession in 4 months! Here is the 3 BHK + Study Floor Plan & Cost Sheet PDF.',
        time: '09:48 AM',
        richBadge: 'Document · Skyline-3BHK-CostSheet.pdf',
      },
      {
        sender: 'customer',
        text: 'Can we visit the sample flat this Sunday at 12 PM?',
        time: '09:49 AM',
      },
      {
        sender: 'bot',
        text: 'Booked your VIP sample flat tour for Sunday at 12:00 PM! Our relationship manager Karan has been assigned and will greet you at the lounge.',
        time: '09:50 AM',
        richBadge: 'Synced to CRM · Hot Lead Score 94/100',
      },
    ],
  },
  {
    id: 'payment-reminders',
    avatarInitial: 'PR',
    title: 'Payment Reminders',
    businessType: 'Coaching',
    lastMessagePreview: 'Term-2 fee ₹12,500 paid via UPI · Receipt PDF',
    lastTime: 'Yesterday',
    unreadCount: 0,
    templateTag: 'fee_installment_utility',
    messages: [
      {
        sender: 'bot',
        text: 'Hello Rohan! Friendly reminder (opted-in): Your Term-2 Data Science Cohort installment of ₹12,500 is due on 15 Nov.',
        time: '04:10 PM',
        richBadge: 'Approved Template · installment_due_v1',
        richItems: ['Pay ₹12,500 Securely (UPI / Card)'],
      },
      {
        sender: 'customer',
        text: 'Can I pay via UPI right now and get the receipt for reimbursement?',
        time: '04:12 PM',
      },
      {
        sender: 'bot',
        text: 'Yes! As soon as you complete the UPI payment via the link above, I will generate your official fee receipt PDF right here in chat.',
        time: '04:12 PM',
      },
      {
        sender: 'customer',
        text: 'Just paid!',
        time: '04:14 PM',
      },
      {
        sender: 'bot',
        text: 'Payment of ₹12,500 received (Txn #RZP-99412). Here is your official receipt PDF: Receipt-Term2-Rohan.pdf.',
        time: '04:14 PM',
        richBadge: 'Webhook Verified · Receipt Attached',
      },
    ],
  },
  {
    id: 'customer-support',
    avatarInitial: 'CS',
    title: 'Customer Support',
    businessType: 'Electronics Brand',
    lastMessagePreview: 'Troubleshooting solved · Human handoff available',
    lastTime: 'Yesterday',
    unreadCount: 0,
    templateTag: 'rag_support_handoff',
    messages: [
      {
        sender: 'customer',
        text: 'My brewer blinking light stays solid blue after descaling. What do I do?',
        time: '06:20 PM',
      },
      {
        sender: 'bot',
        text: 'According to the ProBrew Manual (p.14), a solid light after descaling means it needs one fresh-water rinse cycle. Hold the Rinse button for 3 seconds.',
        time: '06:20 PM',
        richBadge: 'Grounded on: probrew-manual.pdf',
      },
      {
        sender: 'customer',
        text: 'Tried that, still solid and water is not pumping.',
        time: '06:23 PM',
      },
      {
        sender: 'bot',
        text: 'Since the rinse reset did not clear the pump lock, let me connect you to a senior service technician right now with your serial number & chat history.',
        time: '06:23 PM',
        richBadge: 'Escalated to Human Inbox · Priority Ticket #TK-402',
      },
      {
        sender: 'customer',
        text: 'Thank you, that was super fast.',
        time: '06:24 PM',
      },
    ],
  },
  {
    id: 'feedback-reviews',
    avatarInitial: 'FR',
    title: 'Feedback & Reviews',
    businessType: 'Hospitality & Stays',
    lastMessagePreview: 'Rated 5/5 · Shared Google Review link',
    lastTime: '2d ago',
    unreadCount: 0,
    templateTag: 'post_stay_feedback_v1',
    messages: [
      {
        sender: 'bot',
        text: 'Hi Meera! Thank you for staying at The Cedar Retreat this weekend. How would you rate your stay from 1 to 5?',
        time: '11:00 AM',
        richBadge: 'Approved Template · post_visit_feedback',
        richItems: ['5 - Loved It ★', '4 - Good', '1-3 - Needs Attention'],
      },
      {
        sender: 'customer',
        text: '5 - Loved It ★',
        time: '11:02 AM',
      },
      {
        sender: 'bot',
        text: 'We are thrilled to hear that! Would you mind sharing a 30-second review on our Google profile? As a thank-you, here is code CEDAR15 for your next stay.',
        time: '11:02 AM',
        richItems: ['Leave Google Review →', 'Save Code CEDAR15'],
      },
      {
        sender: 'customer',
        text: 'Done! Posted a review with photos.',
        time: '11:05 AM',
      },
      {
        sender: 'bot',
        text: 'Thank you so much, Meera! We look forward to hosting you again soon.',
        time: '11:05 AM',
      },
    ],
  },
];

/* ============================================================================
   SECTION 4 DATA — PLAYING BY THE RULES: 5 COMPLIANCE RULE CARDS
============================================================================ */
interface ComplianceRuleItem {
  id: string;
  number: string;
  title: string;
  shortRule: string;
  detail: string;
  monoBadge: string;
  iconType: 'optin' | 'template' | 'window' | 'optout' | 'quality';
}

const COMPLIANCE_RULES: ComplianceRuleItem[] = [
  {
    id: 'rule-optin',
    number: '01',
    title: 'Opt-in first',
    shortRule: 'Only message people who agreed to hear from you',
    detail:
      'We set up clean opt-in checkboxes on your website checkout, lead forms, QR codes, and incoming chat flows—never scraped or purchased contact lists.',
    monoBadge: 'CONSENT_LOGGED = TRUE',
    iconType: 'optin',
  },
  {
    id: 'rule-templates',
    number: '02',
    title: 'Approved templates',
    shortRule: 'Business-initiated messages use Meta-approved templates',
    detail:
      'When you message a customer first (order shipped, appointment reminder, or back-in-stock alert), the bot uses structured templates pre-approved on the platform.',
    monoBadge: 'TEMPLATE_STATUS: APPROVED',
    iconType: 'template',
  },
  {
    id: 'rule-window',
    number: '03',
    title: '24-hour window',
    shortRule: "Free-form replies within 24 hours of the customer's last message",
    detail:
      'As soon as a customer messages you, a 24-hour customer service window opens where your AI assistant and human team can exchange rich, free-form replies.',
    monoBadge: 'SERVICE_WINDOW: 24H_OPEN',
    iconType: 'window',
  },
  {
    id: 'rule-optout',
    number: '04',
    title: 'Easy opt-out',
    shortRule: '"STOP" respected instantly',
    detail:
      'Every promotional template includes an Unsubscribe button, and our webhook automatically suppresses any contact who replies "STOP" or "Unsubscribe".',
    monoBadge: 'AUTO_SUPPRESS_ON_STOP',
    iconType: 'optout',
  },
  {
    id: 'rule-quality',
    number: '05',
    title: 'Quality rating',
    shortRule: 'We monitor it so your number stays healthy',
    detail:
      'We configure rate-limits, relevant audience segments, and fallback guardrails so your phone number maintains a healthy quality rating and avoids spam flags.',
    monoBadge: 'QUALITY_RATING: MONITORED',
    iconType: 'quality',
  },
];

/* ============================================================================
   MAIN COMPONENT: WhatsappAiChatbot
============================================================================ */
interface WhatsappAiChatbotProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const WhatsappAiChatbot: React.FC<WhatsappAiChatbotProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  const triggerQuoteModal = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: service }));
    }
  };

  /* ------------------------------------------------------------------------
     SECTION 1 STATE: Day -> Evening -> Night Cycle
  ------------------------------------------------------------------------ */
  const [heroPhaseIndex, setHeroPhaseIndex] = useState<number>(0);
  const [isHeroPaused, setIsHeroPaused] = useState<boolean>(false);

  useEffect(() => {
    if (shouldReduceMotion || isHeroPaused) return;
    const timer = setInterval(() => {
      setHeroPhaseIndex((prev) => (prev + 1) % HERO_TIME_PHASES.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, isHeroPaused]);

  const activeHeroPhase = HERO_TIME_PHASES[heroPhaseIndex] || HERO_TIME_PHASES[0];

  /* ------------------------------------------------------------------------
     SECTION 2 STATE: Message Types Vending Machine
  ------------------------------------------------------------------------ */
  const [selectedSlotId, setSelectedSlotId] = useState<string>(VENDING_SLOTS[0].id);
  const [droppingSlotCode, setDroppingSlotCode] = useState<string | null>(null);

  const activeVendingSlot =
    VENDING_SLOTS.find((s) => s.id === selectedSlotId) || VENDING_SLOTS[0];

  const handleSelectVendingSlot = (slot: VendingSlotItem) => {
    setSelectedSlotId(slot.id);
    if (!shouldReduceMotion) {
      setDroppingSlotCode(slot.slotCode);
      setTimeout(() => {
        setDroppingSlotCode(null);
      }, 650);
    }
  };

  /* ------------------------------------------------------------------------
     SECTION 3 STATE: Two-Pane Use-Case Chat List
  ------------------------------------------------------------------------ */
  const [activeThreadId, setActiveThreadId] = useState<string>(USE_CASE_THREADS[0].id);
  const [mobileChatOpen, setMobileChatOpen] = useState<boolean>(false);

  const activeThread =
    USE_CASE_THREADS.find((t) => t.id === activeThreadId) || USE_CASE_THREADS[0];

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setMobileChatOpen(true);
  };

  /* ------------------------------------------------------------------------
     SECTION 4 STATE: 24-Hour Clock Mode Inspector
  ------------------------------------------------------------------------ */
  const [clockPhase, setClockPhase] = useState<'within-24h' | 'after-24h'>('within-24h');

  /* ------------------------------------------------------------------------
     SEO TITLE & META DESCRIPTION
  ------------------------------------------------------------------------ */
  useEffect(() => {
    document.title =
      'WhatsApp AI Chatbot Development | WhatsApp Business API Automation | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Build an AI assistant on the official WhatsApp Business Platform (API) that answers questions 24/7, shares product catalogs, takes bookings, sends payment links, and hands over to your team inbox.'
      );
    }
  }, []);

  /* Helper to render compliance rule icon */
  const renderRuleIcon = (type: ComplianceRuleItem['iconType']) => {
    switch (type) {
      case 'optin':
        return <Lock className="w-5 h-5" />;
      case 'template':
        return <FileText className="w-5 h-5" />;
      case 'window':
        return <Clock className="w-5 h-5" />;
      case 'optout':
        return <Ban className="w-5 h-5" />;
      case 'quality':
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <main className="flex-1 bg-white text-navy">
      {/* ======================================================================
         SECTION 1 — HERO: OPEN 24/7 (NAVY, DAY-TO-NIGHT SKY & GENERIC PHONE)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
        <div className="absolute -right-24 -top-20 w-[600px] h-[600px] blue-glow-strong pointer-events-none" />
        <div className="absolute -left-24 bottom-0 w-[460px] h-[460px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb: Home › AI Solutions › WhatsApp AI Chatbot */}
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
              {WHATSAPP_SOLUTION.name}
            </span>
          </nav>

          {/* 50/50 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 50% (6 cols) */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <MessageSquare className="w-3.5 h-3.5 text-primary" />
                <span>WHATSAPP AI CHATBOT</span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-[-0.02em]">
                Your Business, <span className="text-primary">Open 24/7 on WhatsApp</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-xl">
                An AI assistant on the official WhatsApp Business Platform that answers questions,
                shares your catalog, books appointments, sends order updates and captures leads —
                even while you sleep.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#try-demo"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft transition-all"
                >
                  <span>Try Our Demo Bot</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#message-types"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>See Message Types</span>
                </a>
              </div>

              {/* Small Feature Row */}
              <div className="mt-9 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5 text-[13px] font-semibold text-white/80">
                <span>Official API</span>
                <span className="text-primary">·</span>
                <span>Catalog</span>
                <span className="text-primary">·</span>
                <span>Bookings</span>
                <span className="text-primary">·</span>
                <span>Payments</span>
                <span className="text-primary">·</span>
                <span>Team Inbox</span>
              </div>
            </div>

            {/* Right 50% (6 cols): Day -> Evening -> Night Sky Stage + Generic Phone Mockup */}
            <div
              className="lg:col-span-6"
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
            >
              {/* Screen-reader text summary for decorative sky cycle */}
              <p className="sr-only">
                Interactive preview showing how the Nova and Co. AI assistant responds to customer
                orders, bookings, and wholesale questions at 10:15 AM, 7:40 PM, and 2:05 AM.
              </p>

              {/* Sky Backdrop Container (Strictly Blue / Navy / White tints only) */}
              <div
                className={`relative rounded-[28px] p-4 sm:p-6 border transition-colors duration-700 overflow-hidden shadow-2xl ${
                  activeHeroPhase.id === 'day'
                    ? 'bg-gradient-to-b from-primary/35 via-primary/15 to-navy border-primary/40'
                    : activeHeroPhase.id === 'evening'
                    ? 'bg-gradient-to-b from-primary/20 via-navy to-navy border-white/20'
                    : 'bg-navy border-white/15'
                }`}
              >
                {/* Decorative Sun / Sunset / Moon & Stars in Blue/White Tints */}
                <div
                  className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10"
                  aria-hidden="true"
                >
                  {/* Time-of-Day Switcher Pills */}
                  <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-navy/80 border border-white/15 backdrop-blur-md">
                    {HERO_TIME_PHASES.map((phase, idx) => {
                      const isCurrent = idx === heroPhaseIndex;
                      return (
                        <button
                          key={phase.id}
                          type="button"
                          onClick={() => {
                            setHeroPhaseIndex(idx);
                            setIsHeroPaused(true);
                          }}
                          className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isCurrent
                              ? 'bg-primary text-white shadow-2xs'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          {phase.id === 'day' && <Sun className="w-3.5 h-3.5" />}
                          {phase.id === 'evening' && <Sunset className="w-3.5 h-3.5" />}
                          {phase.id === 'night' && <Moon className="w-3.5 h-3.5" />}
                          <span>{phase.clockChip}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Celestial Indicator */}
                  <div className="flex items-center gap-2">
                    {activeHeroPhase.id === 'day' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-semibold">
                        <Sun className="w-3.5 h-3.5 text-primary-100" />
                        <span>10:15 AM · Store Open</span>
                      </span>
                    )}
                    {activeHeroPhase.id === 'evening' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold">
                        <Sunset className="w-3.5 h-3.5 text-primary-100" />
                        <span>7:40 PM · Closing Hours</span>
                      </span>
                    )}
                    {activeHeroPhase.id === 'night' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/25 border border-primary/50 text-white text-[11px] font-semibold">
                        <Moon className="w-3.5 h-3.5 text-primary-100" />
                        <span>✦ 2:05 AM · Night Mode</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Decorative Night Stars (Blue/White dots when night is active) */}
                {activeHeroPhase.id === 'night' && (
                  <div className="absolute inset-x-0 top-12 h-24 pointer-events-none" aria-hidden="true">
                    <span className="absolute left-8 top-2 w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                    <span className="absolute right-12 top-5 w-2 h-2 rounded-full bg-primary-100 animate-pulse" />
                    <span className="absolute left-1/3 top-3 w-1 h-1 rounded-full bg-white/60" />
                    <span className="absolute right-1/4 top-10 w-1.5 h-1.5 rounded-full bg-primary/80" />
                  </div>
                )}

                {/* Generic Phone Mockup Frame (WebXCode Blue / Navy / White Only) */}
                <div className="max-w-[440px] mx-auto rounded-[24px] bg-white text-navy border-4 border-navy shadow-xl overflow-hidden relative z-10">
                  {/* Generic Phone Top Status & Clock Bar */}
                  <div className="bg-navy text-white px-4 py-2 flex items-center justify-between text-[11px] font-mono border-b border-white/10">
                    <span className="inline-flex items-center gap-1.5 font-bold text-primary-100">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{activeHeroPhase.clockChip}</span>
                    </span>
                    <span className="text-white/65 truncate">{activeHeroPhase.skyBadge}</span>
                    <span className="px-2 py-0.5 rounded bg-primary/25 text-primary-100 text-[10px] font-bold">
                      24/7 API
                    </span>
                  </div>

                  {/* Generic Chat Header ("Nova & Co.") */}
                  <div className="bg-navy text-white px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-white font-extrabold text-[14px] flex items-center justify-center shrink-0">
                        NC
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[15px] font-extrabold text-white">Nova &amp; Co.</span>
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-primary-100">
                            Official Business API
                          </span>
                        </div>
                        <div className="text-[11px] text-white/70">
                          AI Assistant · Instant Replies 24/7
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conversation Stream (role="log" aria-live="polite") */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeHeroPhase.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
                      role="log"
                      aria-live="polite"
                      aria-label={`Nova & Co. chat at ${activeHeroPhase.clockChip}`}
                      className="p-4 bg-primary-50/40 space-y-2.5 min-h-[295px]"
                    >
                      {activeHeroPhase.messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${
                            msg.sender === 'customer' ? 'justify-start' : 'justify-end'
                          }`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug shadow-2xs ${
                              msg.sender === 'customer'
                                ? 'bg-white border border-navy-08 text-navy rounded-tl-xs'
                                : 'bg-navy text-white rounded-tr-xs'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <div
                              className={`mt-1.5 flex items-center justify-between gap-2 font-mono text-[10px] ${
                                msg.sender === 'customer' ? 'text-navy-50' : 'text-primary-100'
                              }`}
                            >
                              <span>{msg.metaTag || (msg.sender === 'bot' ? 'AI Bot' : 'Customer')}</span>
                              <span className="inline-flex items-center gap-1">
                                <span>{msg.time}</span>
                                {msg.sender === 'bot' && (
                                  <CheckCheck className="w-3.5 h-3.5 text-primary" />
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Night Sticker Chip at 2:05 AM */}
                      {activeHeroPhase.nightSticker && (
                        <div className="pt-1 flex justify-center">
                          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[12px] font-extrabold shadow-md border-2 border-white">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{activeHeroPhase.nightSticker}</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom Input Bar */}
                  <div className="px-4 py-2.5 bg-white border-t border-navy-08 flex items-center justify-between text-[12px] text-navy-50">
                    <span>Type a message or tap a quick button…</span>
                    <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">
                      <Send className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — MESSAGE TYPES: THE VENDING MACHINE (WHITE, id="message-types")
      ====================================================================== */}
      <section id="message-types" className="py-[72px] lg:py-[112px] bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              INTERACTIVE MESSAGE DISPENSER
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              More Than Text. <span className="text-primary">Rich Messages That Get Things Done.</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Customers hate typing long answers on a phone screen. Press any button on the message
              vending machine below to dispense an interactive message format into the live phone
              preview.
            </p>
          </div>

          {/* Split Layout: Left Vending Machine (7 cols) | Right Generic Phone (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Stylized Navy Vending Machine */}
            <div className="lg:col-span-7 rounded-[26px] bg-navy text-white p-5 sm:p-7 border border-navy shadow-xl flex flex-col justify-between">
              <div>
                {/* Top Vending Machine Marquee Bar */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-primary text-white font-mono text-[11px] font-extrabold">
                      WX-VEND // 08
                    </span>
                    <span className="text-[14px] font-extrabold tracking-wide uppercase text-white">
                      Rich Message Dispenser
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-primary-100">
                    SELECTED: {activeVendingSlot.slotCode}
                  </span>
                </div>

                {/* Glass Front Window with 8 Product Slots (4x2 Grid) */}
                <div
                  className="rounded-[20px] bg-white/[0.05] border-2 border-white/15 p-4 sm:p-5"
                  role="group"
                  aria-label="Vending machine message slots"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {VENDING_SLOTS.map((slot) => {
                      const isSelected = slot.id === selectedSlotId;
                      const isDropping = droppingSlotCode === slot.slotCode;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => handleSelectVendingSlot(slot)}
                          className={`group text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-primary text-white border-white shadow-lg scale-[1.02]'
                              : 'bg-navy/90 text-white border-white/15 hover:border-primary hover:bg-white/10'
                          } ${isDropping ? 'translate-y-2' : ''}`}
                        >
                          <div className="flex items-center justify-between w-full mb-2">
                            <span
                              className={`font-mono text-[11px] font-extrabold px-2 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-navy text-white'
                                  : 'bg-primary/25 text-primary-100'
                              }`}
                            >
                              {slot.slotCode}
                            </span>
                            <span className="text-[10px] font-mono opacity-75">TAP</span>
                          </div>

                          <div>
                            <div className="text-[13px] font-extrabold leading-snug">
                              {slot.name}
                            </div>
                            <div
                              className={`text-[11px] mt-1 ${
                                isSelected ? 'text-white/90' : 'text-white/60'
                              }`}
                            >
                              {slot.shortTag}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Keypad of Labelled Buttons + Drop Chute */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Keypad Strip */}
                  <div className="sm:col-span-7 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100 mb-2">
                      KEYPAD QUICK SELECT
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {VENDING_SLOTS.map((slot) => {
                        const active = slot.id === selectedSlotId;
                        return (
                          <button
                            key={slot.slotCode}
                            type="button"
                            onClick={() => handleSelectVendingSlot(slot)}
                            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-colors cursor-pointer ${
                              active
                                ? 'bg-primary text-white'
                                : 'bg-white/10 text-white/75 hover:bg-white/20 hover:text-white'
                            }`}
                          >
                            {slot.slotCode}: {slot.name.split(' ')[0]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dispense Chute Door */}
                  <div className="sm:col-span-5 p-3.5 rounded-2xl bg-navy border-2 border-dashed border-primary/50 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                        DISPENSE CHUTE
                      </div>
                      <div className="text-[13px] font-extrabold text-white mt-0.5">
                        {droppingSlotCode
                          ? `Dropping ${droppingSlotCode}…`
                          : `${activeVendingSlot.slotCode} · ${activeVendingSlot.name}`}
                      </div>
                    </div>
                    <span className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[12px] text-white/70">
                <span>All 8 formats work natively via the official WhatsApp Business API</span>
                <span className="font-mono text-primary-100">Interactive Payload</span>
              </div>
            </div>

            {/* Right: Generic Phone Receiving the Dropped Message */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="rounded-[26px] border-4 border-navy bg-white shadow-xl overflow-hidden flex-1 flex flex-col justify-between">
                {/* Generic Phone Top Bar */}
                <div>
                  <div className="bg-navy text-white px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary text-white font-extrabold text-[13px] flex items-center justify-center">
                        NC
                      </div>
                      <div>
                        <div className="text-[14px] font-extrabold text-white">Nova &amp; Co. Bot</div>
                        <div className="font-mono text-[10px] text-primary-100">
                          SLOT {activeVendingSlot.slotCode} · {activeVendingSlot.name.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <Smartphone className="w-4 h-4 text-primary-100" />
                  </div>

                  {/* Live Phone Screen Body */}
                  <div
                    role="log"
                    aria-live="polite"
                    aria-label={`Phone preview for ${activeVendingSlot.name}`}
                    className="p-5 bg-primary-50/40 space-y-3.5 min-h-[340px]"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeVendingSlot.id}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: -14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.22 }}
                        className="space-y-3.5"
                      >
                        {/* Customer Trigger Message */}
                        <div className="flex justify-start">
                          <div className="max-w-[85%] rounded-2xl rounded-tl-xs bg-white border border-navy-08 px-3.5 py-2.5 text-[13px] text-navy shadow-2xs">
                            {activeVendingSlot.customerTrigger}
                          </div>
                        </div>

                        {/* Bot Rich Message Bubble */}
                        <div className="flex justify-end">
                          <div className="w-full max-w-[92%] rounded-2xl rounded-tr-xs bg-navy text-white p-4 shadow-md space-y-3">
                            <p className="text-[13px] text-white/90 leading-snug">
                              {activeVendingSlot.botIntro}
                            </p>

                            {/* 1. Quick Reply Buttons */}
                            {activeVendingSlot.payloadType === 'quick-replies' && (
                              <div className="grid grid-cols-1 gap-1.5 pt-1">
                                {['Track order', 'Talk to us', 'New order'].map((btn) => (
                                  <div
                                    key={btn}
                                    className="py-2 px-3 rounded-xl bg-white text-primary font-bold text-[12px] text-center shadow-2xs"
                                  >
                                    {btn}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* 2. List Menu (5 Options) */}
                            {activeVendingSlot.payloadType === 'list-menu' && (
                              <div className="rounded-xl bg-white text-navy p-3 space-y-1.5">
                                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-primary border-b border-navy-08 pb-1.5">
                                  <span className="inline-flex items-center gap-1">
                                    <List className="w-3.5 h-3.5" />
                                    <span>SERVICES MENU (5 OPTIONS)</span>
                                  </span>
                                  <span>Select 1</span>
                                </div>
                                {[
                                  '1. General Consultation (₹700)',
                                  '2. Skin & Laser Care',
                                  '3. Annual Health Checkup',
                                  '4. Home Sample Collection',
                                  '5. Speak to Clinic Desk',
                                ].map((opt, idx) => (
                                  <div
                                    key={opt}
                                    className="flex items-center justify-between text-[12px] font-semibold py-1 px-2 rounded-lg bg-primary-50/50"
                                  >
                                    <span>{opt}</span>
                                    <span
                                      className={`w-3.5 h-3.5 rounded-full border ${
                                        idx === 0
                                          ? 'bg-primary border-primary'
                                          : 'border-navy-30'
                                      }`}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* 3. Product Catalog (3 Product Cards with Prices) */}
                            {activeVendingSlot.payloadType === 'catalog' && (
                              <div className="grid grid-cols-3 gap-2 pt-1">
                                {[
                                  { name: 'Ceramide Cleanser', price: '₹599', code: 'SKU-01' },
                                  { name: 'Barrier Repair Kit', price: '₹1,499', code: 'SKU-02' },
                                  { name: 'SPF 50 Fluid Gel', price: '₹799', code: 'SKU-03' },
                                ].map((prod) => (
                                  <div
                                    key={prod.code}
                                    className="rounded-xl bg-white text-navy p-2.5 flex flex-col justify-between"
                                  >
                                    <div className="h-10 rounded-lg bg-primary-50 text-primary flex items-center justify-center mb-1.5">
                                      <ShoppingBag className="w-4 h-4" />
                                    </div>
                                    <div className="text-[11px] font-bold leading-tight">
                                      {prod.name}
                                    </div>
                                    <div className="font-mono text-[11px] font-extrabold text-primary mt-1">
                                      {prod.price}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* 4. Payment Link */}
                            {activeVendingSlot.payloadType === 'payment-link' && (
                              <div className="rounded-xl bg-white text-navy p-3.5 space-y-2.5">
                                <div className="flex items-center justify-between text-[11px] font-mono text-navy-60">
                                  <span>ORDER #ORD-7741</span>
                                  <span>UPI / CARD GATEWAY</span>
                                </div>
                                <div className="text-[15px] font-extrabold text-navy">
                                  Hydrating Barrier Kit · ₹1,499
                                </div>
                                <div className="w-full py-2.5 px-4 rounded-xl bg-primary text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm">
                                  <CreditCard className="w-4 h-4" />
                                  <span>Pay ₹1,499 securely</span>
                                </div>
                              </div>
                            )}

                            {/* 5. Location Pin */}
                            {activeVendingSlot.payloadType === 'location-pin' && (
                              <div className="rounded-xl bg-white text-navy p-3.5 space-y-2">
                                <div className="h-20 rounded-lg bg-primary-50 border border-primary-100 flex flex-col items-center justify-center text-primary">
                                  <MapPin className="w-6 h-6" />
                                  <span className="font-mono text-[10px] font-bold mt-1">
                                    28.4595° N, 77.0266° E
                                  </span>
                                </div>
                                <div className="text-[13px] font-extrabold text-navy">
                                  Nova Flagship Studio · Sector 43
                                </div>
                                <div className="text-[11px] text-navy-60">
                                  Open 10:00 AM – 8:00 PM · Tap for Directions
                                </div>
                              </div>
                            )}

                            {/* 6. Document ("Invoice-1042.pdf") */}
                            {activeVendingSlot.payloadType === 'document' && (
                              <div className="rounded-xl bg-white text-navy p-3.5 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="font-mono text-[13px] font-extrabold text-navy">
                                      Invoice-1042.pdf
                                    </div>
                                    <div className="text-[11px] text-navy-60">
                                      PDF Document · 148 KB · Verified GST
                                    </div>
                                  </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-lg bg-primary text-white text-[11px] font-bold">
                                  Download
                                </span>
                              </div>
                            )}

                            {/* 7. Appointment Slots */}
                            {activeVendingSlot.payloadType === 'appointment-slots' && (
                              <div className="rounded-xl bg-white text-navy p-3 space-y-2">
                                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-primary">
                                  <Calendar className="w-3.5 h-3.5" />
                                  <span>AVAILABLE TIME BUTTONS</span>
                                </div>
                                <div className="grid grid-cols-2 gap-1.5">
                                  {['10:30 AM', '12:00 PM ✓', '03:30 PM', '05:15 PM'].map(
                                    (slotTime, idx) => (
                                      <div
                                        key={slotTime}
                                        className={`py-2 px-2.5 rounded-lg text-[12px] font-bold text-center border ${
                                          idx === 1
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-primary-50/60 text-navy border-primary-100'
                                        }`}
                                      >
                                        {slotTime}
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            {/* 8. Voice Note -> Text */}
                            {activeVendingSlot.payloadType === 'voice-transcript' && (
                              <div className="rounded-xl bg-white text-navy p-3.5 space-y-2.5">
                                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-primary-50">
                                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                                    <Mic className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="flex-1 flex items-center gap-1" aria-hidden="true">
                                    {[3, 6, 4, 8, 5, 7, 3, 6, 8, 4, 5, 3].map((h, i) => (
                                      <span
                                        key={i}
                                        className="w-1 rounded-full bg-primary"
                                        style={{ height: `${h * 2.2}px` }}
                                      />
                                    ))}
                                  </div>
                                  <span className="font-mono text-[10px] font-bold text-navy">
                                    0:11
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-lg border border-navy-08 bg-white text-[12px] text-navy-70">
                                  <span className="font-mono text-[10px] font-bold text-primary block mb-0.5">
                                    AI TRANSCRIPT (HINGLISH → TEXT):
                                  </span>
                                  &ldquo;Mera Friday wala delivery please Monday subah 10 baje ke
                                  baad schedule kar dijiye.&rdquo;
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Short Caption Under the Phone: What It's Best For */}
                <div className="p-4 bg-navy text-white border-t border-white/10">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100">
                    WHAT {activeVendingSlot.name.toUpperCase()} IS BEST FOR
                  </div>
                  <p className="text-[13px] text-white/90 mt-1 leading-snug">
                    {activeVendingSlot.bestForCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — USE CASES: THE CHAT LIST (LIGHT BLUE TINT)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50/60 border-y border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              6 AUTOMATED WORKFLOWS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              One Number. <span className="text-primary">Many Jobs Done Automatically.</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Click any conversation in the inbox below to inspect how a single official business
              number handles order tracking, appointments, lead qualification, payment links,
              support, and reviews.
            </p>
          </div>

          {/* Two-Pane Generic Messaging UI */}
          <div className="rounded-[24px] bg-white border border-navy-15 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
            {/* Left Pane (4 cols on lg): Chat List with 6 Conversations */}
            <div
              className={`lg:col-span-4 border-b lg:border-b-0 lg:border-r border-navy-08 flex flex-col ${
                mobileChatOpen ? 'hidden lg:flex' : 'flex'
              }`}
            >
              <div className="bg-navy text-white px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="text-[14px] font-extrabold">Automated Conversations (6)</span>
                </div>
                <span className="font-mono text-[11px] text-primary-100">24/7 Active</span>
              </div>

              <div
                className="divide-y divide-navy-08 flex-1"
                role="tablist"
                aria-label="WhatsApp use case conversations"
              >
                {USE_CASE_THREADS.map((thread) => {
                  const isSelected = thread.id === activeThreadId;
                  return (
                    <button
                      key={thread.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => handleSelectThread(thread.id)}
                      className={`w-full text-left px-4 sm:px-5 py-4 transition-colors flex items-start gap-3.5 cursor-pointer ${
                        isSelected
                          ? 'bg-primary-50 border-l-4 border-l-primary'
                          : 'bg-white hover:bg-primary-50/40'
                      }`}
                    >
                      {/* Avatar Initial */}
                      <div
                        className={`w-11 h-11 rounded-full font-extrabold text-[13px] flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-primary text-white' : 'bg-navy text-white'
                        }`}
                      >
                        {thread.avatarInitial}
                      </div>

                      {/* Name, Business Type, Last Message */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[15px] font-extrabold text-navy truncate">
                            {thread.title}
                          </span>
                          <span className="font-mono text-[11px] text-navy-50 shrink-0">
                            {thread.lastTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="px-2 py-0.5 rounded bg-primary-50 border border-primary-100 text-primary font-mono text-[10px] font-bold">
                            {thread.businessType}
                          </span>
                        </div>

                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <p className="text-[12px] text-navy-60 truncate">
                            {thread.lastMessagePreview}
                          </p>
                          {thread.unreadCount > 0 && (
                            <span className="w-5 h-5 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold flex items-center justify-center shrink-0">
                              {thread.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Pane (8 cols on lg): Open Scripted Conversation */}
            <div
              className={`lg:col-span-8 flex flex-col justify-between bg-primary-50/25 ${
                mobileChatOpen ? 'flex' : 'hidden lg:flex'
              }`}
            >
              {/* Conversation Header Strip with Business Type */}
              <div className="bg-white px-5 sm:px-6 py-4 border-b border-navy-08 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Mobile Back Arrow */}
                  <button
                    type="button"
                    onClick={() => setMobileChatOpen(false)}
                    className="lg:hidden p-1.5 rounded-lg border border-navy-15 text-navy hover:bg-primary-50 cursor-pointer"
                    aria-label="Back to conversation list"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="w-10 h-10 rounded-full bg-primary text-white font-extrabold text-[13px] flex items-center justify-center shrink-0">
                    {activeThread.avatarInitial}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[16px] font-extrabold text-navy">{activeThread.title}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-navy text-white text-[11px] font-bold">
                        Business Type: {activeThread.businessType}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-navy-50 mt-0.5">
                      Template / Flow: {activeThread.templateTag}
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Bot Active</span>
                </span>
              </div>

              {/* Messages Stream (role="log" aria-live="polite") */}
              <div
                role="log"
                aria-live="polite"
                aria-label={`${activeThread.title} conversation transcript`}
                className="p-5 sm:p-6 space-y-3.5 flex-1 overflow-y-auto max-h-[440px]"
              >
                {activeThread.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.sender === 'customer' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] sm:text-[14px] leading-relaxed shadow-2xs ${
                        msg.sender === 'customer'
                          ? 'bg-white border border-navy-08 text-navy rounded-tl-xs'
                          : 'bg-navy text-white rounded-tr-xs'
                      }`}
                    >
                      {msg.richBadge && (
                        <div className="mb-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-primary/25 border border-primary/40 font-mono text-[10px] font-bold text-primary-100">
                          <span>{msg.richBadge}</span>
                        </div>
                      )}

                      <p>{msg.text}</p>

                      {msg.richItems && msg.richItems.length > 0 && (
                        <div className="mt-2.5 pt-2.5 border-t border-white/15 flex flex-wrap gap-1.5">
                          {msg.richItems.map((chip) => (
                            <span
                              key={chip}
                              className="px-3 py-1 rounded-lg bg-white text-primary font-bold text-[12px]"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      )}

                      <div
                        className={`mt-1.5 flex items-center justify-end gap-1 font-mono text-[10px] ${
                          msg.sender === 'customer' ? 'text-navy-50' : 'text-primary-100'
                        }`}
                      >
                        <span>{msg.time}</span>
                        {msg.sender === 'bot' && <CheckCheck className="w-3.5 h-3.5 text-primary" />}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Subtle Typing Indicator Strip */}
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-navy-60">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span>Webhook synced · Zero manual typing required</span>
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      triggerQuoteModal(
                        `WhatsApp AI Chatbot — ${activeThread.title} (${activeThread.businessType})`
                      )
                    }
                    className="text-primary font-bold hover:underline cursor-pointer"
                  >
                    Build this flow for my business →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — PLAYING BY THE RULES: THE 24-HOUR CLOCK (WHITE)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              OFFICIAL API COMPLIANCE &amp; NUMBER SAFETY
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              We Follow WhatsApp&apos;s Rules —{' '}
              <span className="text-primary">So Your Number Stays Safe</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Unofficial bulk-messaging scripts get business numbers blocked. We build strictly on
              the official WhatsApp Business Platform (API) with opt-in consent, approved templates,
              and 24-hour service window rules built in.
            </p>
          </div>

          {/* Split Layout: Left 24-Hour Clock Dial (5 cols) | Right 5 Rule Cards (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Large 24-Hour Clock Dial */}
            <div className="lg:col-span-5">
              <div className="rounded-[26px] bg-navy text-white p-6 sm:p-8 border border-navy shadow-xl">
                {/* Screen-reader summary for decorative clock */}
                <p className="sr-only">
                  24-hour customer service window diagram: When a customer messages you, a 24-hour
                  window opens for free-form replies and AI chat. After 24 hours of inactivity,
                  only Meta-approved templates can re-open the conversation.
                </p>

                {/* Top Marker: "Customer messages you" */}
                <div className="flex flex-col items-center text-center mb-5">
                  <span className="px-3.5 py-1.5 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    00:00 HR · Customer Messages You
                  </span>
                  <span className="text-[12px] text-white/70 mt-1.5">
                    24-Hour Customer Service Window Starts Instantly
                  </span>
                </div>

                {/* Circular 24-Hour Dial SVG */}
                <div className="relative w-60 h-60 sm:w-64 sm:h-64 mx-auto my-4" aria-hidden="true">
                  <svg viewBox="0 0 220 220" className="w-full h-full">
                    {/* Outer Track Ring */}
                    <circle
                      cx="110"
                      cy="110"
                      r="90"
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="18"
                    />
                    {/* Blue Arc: 24-Hour Customer Service Window */}
                    <circle
                      cx="110"
                      cy="110"
                      r="90"
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="18"
                      strokeDasharray={clockPhase === 'within-24h' ? '420 565' : '150 565'}
                      strokeLinecap="round"
                      transform="rotate(-90 110 110)"
                    />
                    {/* Inner Dial Face */}
                    <circle cx="110" cy="110" r="68" fill="#1e242e" />

                    {/* Top 24h Marker Dot */}
                    <circle cx="110" cy="20" r="6" fill="#ffffff" />

                    {/* Sweeping Clock Hand */}
                    <line
                      x1="110"
                      y1="110"
                      x2={clockPhase === 'within-24h' ? '160' : '60'}
                      y2={clockPhase === 'within-24h' ? '145' : '150'}
                      stroke="#0571c2"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle cx="110" cy="110" r="7" fill="#ffffff" />
                  </svg>

                  {/* Center Clock Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
                    <span className="font-mono text-[11px] font-bold text-primary-100 uppercase">
                      {clockPhase === 'within-24h' ? 'HOURS 0–24' : 'AFTER 24 HOURS'}
                    </span>
                    <span className="text-[16px] font-extrabold text-white leading-tight mt-1">
                      {clockPhase === 'within-24h'
                        ? 'Free-form replies & AI chat'
                        : 'Only approved templates'}
                    </span>
                  </div>
                </div>

                {/* Interactive Window Toggle Pills */}
                <div className="grid grid-cols-2 gap-2.5 mt-5">
                  <button
                    type="button"
                    onClick={() => setClockPhase('within-24h')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      clockPhase === 'within-24h'
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white/[0.05] text-white/75 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="font-mono text-[10px] font-bold uppercase">
                      BLUE ARC (0–24H)
                    </div>
                    <div className="text-[12px] font-extrabold mt-0.5">
                      Free-form replies &amp; AI chat
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setClockPhase('after-24h')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      clockPhase === 'after-24h'
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white/[0.05] text-white/75 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="font-mono text-[10px] font-bold uppercase">
                      NAVY ARC (24H+ CLOSED)
                    </div>
                    <div className="text-[12px] font-extrabold mt-0.5">
                      Only approved templates
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: 5 Rule Cards with Icons */}
            <div className="lg:col-span-7 space-y-3.5">
              {COMPLIANCE_RULES.map((rule) => (
                <div
                  key={rule.id}
                  className="p-5 rounded-[20px] bg-white border border-navy-08 hover:border-primary/40 shadow-soft transition-all flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-2xl bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    {renderRuleIcon(rule.iconType)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[12px] font-extrabold text-primary">
                          {rule.number}
                        </span>
                        <h3 className="text-[17px] font-extrabold text-navy">{rule.title}</h3>
                        <span className="text-[13px] font-semibold text-navy-70">
                          — {rule.shortRule}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-primary-50 font-mono text-[10px] font-bold text-primary">
                        {rule.monoBadge}
                      </span>
                    </div>

                    <p className="text-[14px] text-navy-70 mt-1.5 leading-relaxed">{rule.detail}</p>
                  </div>
                </div>
              ))}

              {/* Honest Platform Fee & Policy Note */}
              <div className="p-4 rounded-2xl bg-primary-50/70 border border-primary-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-[13px] text-navy font-medium leading-relaxed">
                  <strong className="font-extrabold">Transparent Platform Billing:</strong>{' '}
                  Messaging charges are set by Meta and billed separately. Rules can change; we keep
                  your setup up to date. Need full backend sync? Explore{' '}
                  <Link
                    to="/ai-solutions/ai-workflow-automation"
                    className="text-primary font-extrabold underline hover:text-navy"
                  >
                    AI Workflow Automation →
                  </Link>{' '}
                  or{' '}
                  <Link
                    to="/ai-solutions/crm-lead-automation"
                    className="text-primary font-extrabold underline hover:text-navy"
                  >
                    CRM &amp; Lead Automation →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WhatsappAiChatbot;
