import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  RotateCcw,
  Calendar,
  Clock,
  Check,
  X,
  Info,
  Code2,
  TrendingUp,
  Bot,
  ShieldCheck,
  Palette,
  Mail,
  FileSearch,
  CheckCircle2,
  CreditCard,
  FolderX,
  CalendarOff,
  Building2,
  Plus,
  Minus,
  Phone,
  MessageSquare,
  FileText,
  Sparkles,
} from 'lucide-react';

/* ============================================================================
   REFUND POLICY DATA ARRAYS (single source of truth at top of file)
============================================================================ */

export interface PillNavItem {
  id: string;
  label: string;
}

export const PILL_NAV_ITEMS: PillNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'refund-by-stage', label: 'Refund by Stage' },
  { id: 'estimate', label: 'Estimate' },
  { id: 'by-service', label: 'By Service' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'how-to-request', label: 'How to Request' },
  { id: 'cancellations', label: 'Cancellations' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export interface RefundStageItem {
  id: string;
  stepNum: string;
  stage: string;
  refundPercent: number;
  displayPercent: string;
  description: string;
  barHeightClass: string;
  barBgClass: string;
  barTextClass: string;
}

/* Shared between Section 4 (Refund Ladder) and Section 5 (Refund Estimate Tool) */
export const REFUND_STAGES_DATA: RefundStageItem[] = [
  {
    id: 'before-start',
    stepNum: '01',
    stage: 'Before work starts',
    refundPercent: 90,
    displayPercent: '[90]%',
    description: '[90]% of advance (only the [10]% admin/consultation fee is kept)',
    barHeightClass: 'h-[260px]',
    barBgClass: 'bg-primary',
    barTextClass: 'text-white',
  },
  {
    id: 'discovery',
    stepNum: '02',
    stage: 'During discovery & planning',
    refundPercent: 50,
    displayPercent: '[50]%',
    description: '[50]% of advance',
    barHeightClass: 'h-[195px]',
    barBgClass: 'bg-primary/80',
    barTextClass: 'text-white',
  },
  {
    id: 'design-approved',
    stepNum: '03',
    stage: 'After design approval',
    refundPercent: 25,
    displayPercent: '[25]%',
    description: '[25]% of advance',
    barHeightClass: 'h-[135px]',
    barBgClass: 'bg-primary/55',
    barTextClass: 'text-white',
  },
  {
    id: 'development',
    stepNum: '04',
    stage: 'During development',
    refundPercent: 0,
    displayPercent: '0%',
    description: 'No refund on paid milestones',
    barHeightClass: 'h-[82px]',
    barBgClass: 'bg-navy/15',
    barTextClass: 'text-navy',
  },
  {
    id: 'launched',
    stepNum: '05',
    stage: 'After launch / handover',
    refundPercent: 0,
    displayPercent: '0%',
    description: 'No refund',
    barHeightClass: 'h-[64px]',
    barBgClass: 'bg-navy/10',
    barTextClass: 'text-navy-70',
  },
];

export interface ServiceRefundRule {
  id: string;
  title: string;
  badge: string;
  icon: 'web' | 'seo' | 'ai' | 'maintenance' | 'branding';
  summary: string;
  rules: string[];
}

export const SERVICE_REFUND_RULES: ServiceRefundRule[] = [
  {
    id: 'web-app-dev',
    title: 'Website & App Development',
    badge: 'Stage-based',
    icon: 'web',
    summary: 'Stage-based refunds as per the refund ladder above.',
    rules: [
      'Before work starts: [90]% of advance refunded (minus [10]% admin/consultation fee).',
      'During discovery & planning: [50]% of advance refunded.',
      'After design approval: [25]% of advance refunded.',
      'Once development starts or after launch/handover: no refund on completed or active milestones.',
    ],
  },
  {
    id: 'seo-performance',
    title: 'SEO & Performance Marketing (monthly)',
    badge: 'Cancel anytime',
    icon: 'seo',
    summary:
      "No refund for the current month once work has started; cancel anytime with [15] days' notice before the next billing cycle. Ad spend paid to Google or other platforms is non-refundable.",
    rules: [
      'Monthly retainers are billed in advance and are non-refundable once the monthly cycle begins.',
      "Cancel anytime by giving at least [15] days' written notice before your next billing date.",
      'Third-party advertising budgets paid directly or via us to Google Ads or other platforms are strictly non-refundable.',
    ],
  },
  {
    id: 'ai-chatbots-automation',
    title: 'AI Chatbots & Automation',
    badge: 'Setup: stage-based',
    icon: 'ai',
    summary:
      'Setup fee follows the stage-based rules; monthly AI usage, API and subscription fees are non-refundable.',
    rules: [
      'One-time custom AI setup and development fees follow the 5-stage project refund ladder.',
      'Monthly AI usage credits, LLM API consumption (OpenAI, Anthropic, WhatsApp API, voice minutes) and subscription fees are non-refundable.',
      'Custom knowledge-base training completed and approved is non-refundable.',
    ],
  },
  {
    id: 'maintenance-support',
    title: 'Maintenance & Support Plans',
    badge: 'Pro-rated (annual)',
    icon: 'maintenance',
    summary:
      'Monthly plans are non-refundable for the current month; annual plans may get a pro-rated refund for unused full months, minus a [10]% admin fee.',
    rules: [
      'Monthly support plans are non-refundable for the active billing month.',
      'Annual prepaid maintenance plans are eligible for a pro-rated refund for unused full calendar months remaining.',
      'A standard [10]% administrative fee is deducted from pro-rated annual refunds.',
    ],
  },
  {
    id: 'branding-design',
    title: 'Branding & Design',
    badge: 'Before concepts',
    icon: 'branding',
    summary:
      'Full refund of advance minus [10]% before first concepts are shared; no refund after concepts are delivered.',
    rules: [
      'If cancelled before initial brand or UI concepts are shared: [90]% of the advance is refunded ([10]% admin fee kept).',
      'Once initial design concepts or moodboards have been delivered for review, the advance becomes non-refundable.',
      'Included revision rounds can be used to refine concepts to match your brief.',
    ],
  },
];

export const ELIGIBLE_ITEMS: string[] = [
  'We fail to start work within [7] days of payment without a valid reason',
  'We cannot deliver the agreed scope',
  'Duplicate or incorrect payment',
  'Project cancelled before work starts',
];

export const NOT_ELIGIBLE_ITEMS: string[] = [
  'Completed and approved milestones',
  'Third-party costs: domains, hosting, paid plugins/themes, stock assets, ad spend, AI/API usage',
  'Change of mind after work has been delivered',
  'Delays caused by missing Client inputs, content or approvals',
  'Projects on hold for more than [30] days due to the Client',
  'Results-based reasons (e.g. search rankings, traffic or sales not as expected)',
];

export interface RefundProcessStep {
  num: string;
  title: string;
  desc: string;
  badge: string;
  icon: 'email' | 'review' | 'decision' | 'payout';
}

export const REFUND_PROCESS_STEPS: RefundProcessStep[] = [
  {
    num: '01',
    title: 'Send a request',
    desc: 'Email [billing@webxcode.com] with your invoice number, project name and reason.',
    badge: 'within [7] days',
    icon: 'email',
  },
  {
    num: '02',
    title: 'Review',
    desc: 'Our team reviews your project stage and request.',
    badge: '[3–5] business days',
    icon: 'review',
  },
  {
    num: '03',
    title: 'Decision',
    desc: 'We confirm the approved refund amount in writing.',
    badge: 'by email',
    icon: 'decision',
  },
  {
    num: '04',
    title: 'Refund processed',
    desc: 'Sent to the original payment method.',
    badge: '[7–10] business days',
    icon: 'payout',
  },
];

export interface CancellationRowItem {
  title: string;
  desc: string;
  icon: 'project' | 'monthly' | 'agency';
}

export const CANCELLATION_ROWS: CancellationRowItem[] = [
  {
    title: 'Project cancellation by Client',
    desc: 'Give written notice. Refunds follow the stage-based rules; work completed up to the cancellation date is billed.',
    icon: 'project',
  },
  {
    title: 'Monthly plan cancellation',
    desc: "Give [15] days' notice before the next billing date. No further charges after the current cycle.",
    icon: 'monthly',
  },
  {
    title: 'Cancellation by WebXCode',
    desc: 'If we cancel a project for reasons not caused by the Client, we refund the amount paid for work not yet delivered.',
    icon: 'agency',
  },
];

export interface RefundFaqItem {
  q: string;
  a: string;
}

export const REFUND_FAQ_ITEMS: RefundFaqItem[] = [
  {
    q: 'How long does a refund take?',
    a: 'Once you submit a written request, our billing team reviews your project stage within [3–5] business days. Approved refunds are processed within [7–10] business days back to your original payment method.',
  },
  {
    q: 'Can I get a refund on Google Ads spend?',
    a: 'No. Any advertising budget paid to Google Ads or third-party ad platforms is billed directly by those platforms and is strictly non-refundable.',
  },
  {
    q: "What if I'm not happy with the design?",
    a: 'Every project includes dedicated revision rounds ([2] rounds per phase unless stated otherwise) so we can refine the design based on your feedback before any refund discussion is needed. If you cancel during discovery before design approval, stage-based refund rules apply.',
  },
  {
    q: 'Can I pause a project instead of cancelling?',
    a: 'Yes! You can place your project on hold for up to [30] days at no extra charge by notifying your project manager in writing, allowing you to resume right where you left off.',
  },
  {
    q: 'Are taxes (GST) refunded?',
    a: 'Where a refund is approved and credit notes can be issued within the applicable tax filing period, taxes such as GST are refunded proportionally along with the eligible service amount.',
  },
  {
    q: 'Do international clients get refunds in USD?',
    a: 'Yes. International refunds are returned in the same currency and to the same payment method (such as Stripe, wire transfer or card) used for the original payment. Standard bank or payment-gateway conversion charges may apply.',
  },
];

export interface RelatedLegalCardItem {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'available';
  href: string;
}

export const RELATED_LEGAL_CARDS: RelatedLegalCardItem[] = [
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'How we collect, use, store and protect your personal information.',
    status: 'available',
    href: '/privacy-policy',
  },
  {
    id: 'terms-conditions',
    title: 'Terms & Conditions',
    description: 'Standard terms governing the use of our website and agency services.',
    status: 'available',
    href: '/terms-and-conditions',
  },
  {
    id: 'refund-policy',
    title: 'Refund Policy',
    description: 'Milestone billing, cancellation terms and refund eligibility guidelines.',
    status: 'active',
    href: '/refund-policy',
  },
];

/* ============================================================================
   SHARED UI HELPERS (self-contained inside RefundPolicy.tsx)
============================================================================ */

const SectionLabel: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({
  children,
  dark = false,
}) => (
  <span
    className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-[0.12em] whitespace-nowrap ${
      dark
        ? 'bg-primary/20 text-white border border-primary/35'
        : 'bg-primary-50 text-primary'
    }`}
  >
    {children}
  </span>
);

const SectionHeading: React.FC<{
  label?: string;
  firstPart: string;
  highlightPart: string;
  lastPart?: string;
  dark?: boolean;
  align?: 'left' | 'center';
  className?: string;
}> = ({
  label,
  firstPart,
  highlightPart,
  lastPart,
  dark = false,
  align = 'left',
  className = '',
}) => (
  <div className={`${align === 'center' ? 'text-center mx-auto max-w-3xl' : ''} ${className}`}>
    {label && (
      <div className={`mb-4 ${align === 'center' ? 'flex justify-center' : ''}`}>
        <SectionLabel dark={dark}>{label}</SectionLabel>
      </div>
    )}
    <h2
      className={`text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold leading-[1.16] tracking-[-0.02em] ${
        dark ? 'text-white' : 'text-navy'
      }`}
    >
      {firstPart}{' '}
      <span className="text-primary">{highlightPart}</span>
      {lastPart ? ` ${lastPart}` : ''}
    </h2>
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline-dark' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  href?: string;
  iconLeft?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  showArrow = true,
  href,
  iconLeft,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2.5 text-[14px]',
    md: 'px-6 py-3.5 text-[15px]',
    lg: 'px-7 py-4 text-[16px]',
  }[size];

  const variantClasses = {
    primary:
      'bg-primary text-white hover:bg-primary-700 shadow-[0_8px_20px_-4px_rgba(5,113,194,0.45)] hover:shadow-[0_12px_26px_-4px_rgba(5,113,194,0.65)]',
    'outline-dark':
      'border border-white/25 text-white hover:bg-white/10 hover:border-white/50',
    'outline-light':
      'border border-navy-15 text-navy hover:border-primary hover:text-primary hover:bg-primary-50',
  }[variant];

  const baseClasses = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {iconLeft}
        <span>{children}</span>
        {showArrow && (
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </a>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {iconLeft}
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </button>
  );
};

/* ============================================================================
   1. PAGE HERO (navy, compact — content left, circular-arrow + ₹/$ coin right)
============================================================================ */
const RefundHeroSection: React.FC = () => {
  return (
    <section className="relative bg-navy text-white pt-10 pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Soft Blue Glows */}
      <div className="absolute -top-24 -left-24 w-[480px] h-[480px] blue-glow pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-[560px] h-[560px] blue-glow-strong pointer-events-none" />

      {/* Faint Concentric-Circle Texture (distinct from Grid and Diagonal legal heroes) */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-radial-gradient(circle at 80% 50%, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 36px)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Content (7 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Breadcrumb: Home › Refund Policy */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white/65 print:hidden"
            >
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-primary font-semibold" aria-current="page">
                Refund Policy
              </span>
            </nav>

            <div>
              <SectionLabel dark>LEGAL</SectionLabel>
            </div>

            {/* H1 */}
            <h1 className="text-[36px] sm:text-[48px] lg:text-[54px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
              Refund <span className="text-primary">Policy</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-[16px] sm:text-[18px] text-white/75 leading-[1.7] max-w-2xl">
              We want every client to be happy with our work. This policy explains when refunds
              apply, how much you can get back and how to request one.
            </p>

            {/* Meta Pills (Glass Style) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md text-[13px] font-medium text-white/90">
                <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Last updated: [DD Month YYYY]</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md text-[13px] font-medium text-white/90">
                <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>~5 min read</span>
              </div>
            </div>
          </motion.div>

          {/* Right Illustration: Glowing Outline Circular-Arrow with ₹/$ Coin Center + 3 Glass Chips */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5 flex items-center justify-center print:hidden"
          >
            <div className="relative w-[290px] h-[270px] sm:w-[350px] sm:h-[300px] flex items-center justify-center">
              {/* Outer Orbit Rings */}
              <div className="w-60 h-60 sm:w-68 sm:h-68 rounded-full border border-white/10 absolute" />
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-primary/35 border-dashed absolute" />

              {/* Center Glowing Circular-Arrow (Refund Cycle) with ₹ / $ Coin */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-primary/15 border-2 border-primary shadow-[0_0_55px_rgba(5,113,194,0.6)] backdrop-blur-md flex items-center justify-center">
                <RotateCcw className="w-24 h-24 sm:w-28 sm:h-28 text-primary opacity-90" strokeWidth={1.35} />
                <div className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-navy border-2 border-primary flex items-center justify-center shadow-inner">
                  <span className="text-[18px] sm:text-[20px] font-extrabold text-white tracking-tight">
                    ₹ / $
                  </span>
                </div>
              </div>

              {/* Floating Glass Chip 1: "Fair & Transparent" */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-2 left-0 sm:left-2 px-3.5 py-2 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-lg inline-flex items-center gap-2 text-[12px] font-bold text-white"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Fair & Transparent</span>
              </motion.div>

              {/* Floating Glass Chip 2: "Stage-Based Refunds" */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute top-6 right-0 px-3.5 py-2 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-lg inline-flex items-center gap-2 text-[12px] font-bold text-white"
              >
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Stage-Based Refunds</span>
              </motion.div>

              {/* Floating Glass Chip 3: "Processed in [7–10] Business Days" */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute bottom-1 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-lg inline-flex items-center gap-2 text-[12px] font-bold text-white whitespace-nowrap"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Processed in [7–10] Business Days</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   2. STICKY PILL NAVIGATION + 3PX READING PROGRESS BAR (white)
============================================================================ */
const StickyPillNav: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(PILL_NAV_ITEMS[0].id);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Update reading progress bar
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);

      // Scroll-spy for section pills
      const spyOffset = scrollTop + 190;
      let current = PILL_NAV_ITEMS[0].id;
      for (const item of PILL_NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && spyOffset >= el.offsetTop) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handlePillClick = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `/refund-policy#${id}`);
    }
  };

  return (
    <div className="sticky top-[68px] lg:top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-navy-08 shadow-soft print:hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative">
        {/* Fade Edges on Mobile */}
        <div className="pointer-events-none lg:hidden absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none lg:hidden absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10" />

        <nav
          aria-label="Page sections"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3.5"
        >
          {PILL_NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'true' : undefined}
                onClick={() => handlePillClick(item.id)}
                className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white text-navy-70 border border-navy-15 hover:border-primary hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Thin 3px Blue Reading Progress Bar Attached to Bottom of Sticky Pill Bar */}
      <div className="h-[3px] w-full bg-navy-08 overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-primary transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

/* ============================================================================
   3. OVERVIEW (white — #overview, 60/40 split: text left, navy Key Points right)
============================================================================ */
const OverviewSection: React.FC = () => {
  const keyPoints = [
    'Refunds are based on the project stage',
    'Third-party costs are non-refundable',
    'Requests must be made in writing within [7] days',
    'Approved refunds are processed in [7–10] business days',
  ];

  return (
    <section id="overview" className="bg-white py-14 lg:py-20 scroll-mt-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 60% (7 columns) */}
          <div className="lg:col-span-7">
            <SectionHeading
              label="OVERVIEW"
              firstPart="Our Commitment to"
              highlightPart="Fairness"
              className="mb-5"
            />
            <p className="text-[17px] leading-[1.8] text-navy/80">
              WebXCode, operated by [Legal Company Name], provides custom digital services such as
              website development, SEO, performance marketing and AI solutions. Because our work is
              custom and time-based, refunds depend on how far the project has progressed when a
              refund is requested. This policy should be read together with our{' '}
              <Link
                to="/terms-and-conditions"
                className="font-bold text-primary hover:underline underline-offset-4"
              >
                Terms & Conditions
              </Link>
              .
            </p>
          </div>

          {/* Right 40% (5 columns) — Navy Card with Blue Glow */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[20px] bg-navy text-white p-7 sm:p-8 shadow-xl overflow-hidden">
              <div className="absolute -top-16 -right-16 w-52 h-52 blue-glow-strong pointer-events-none" />
              <div className="relative z-10">
                <div className="text-[11px] font-bold uppercase tracking-widest text-primary mb-2">
                  AT A GLANCE
                </div>
                <h3 className="text-[22px] font-extrabold text-white mb-5">Key Points</h3>
                <ul className="space-y-3.5">
                  {keyPoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-[15px] text-white/85">
                      <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   4. REFUND BY PROJECT STAGE — THE REFUND LADDER (light blue tint — #refund-by-stage)
============================================================================ */
const RefundLadderSection: React.FC = () => {
  return (
    <section id="refund-by-stage" className="bg-primary-50 py-16 lg:py-24 scroll-mt-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          label="REFUND BY STAGE"
          firstPart="How Much Can"
          highlightPart="You Get Back?"
          className="mb-12"
        />

        {/* Desktop Stepped Descending Bar Chart (5 columns whose heights decrease left to right) */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6 items-end bg-white rounded-[24px] p-8 border border-navy-08 shadow-soft">
          {REFUND_STAGES_DATA.map((item) => (
            <div key={item.id} className="flex flex-col h-full justify-end">
              {/* Stepped Bar */}
              <div className="h-[270px] flex items-end mb-5">
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`w-full ${item.barHeightClass} ${item.barBgClass} ${item.barTextClass} rounded-[20px] p-5 flex flex-col justify-between shadow-sm`}
                >
                  <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-80">
                    Stage {item.stepNum}
                  </span>
                  <div className="text-[32px] xl:text-[36px] font-extrabold leading-none tracking-tight tabular-nums">
                    {item.displayPercent}
                  </div>
                </motion.div>
              </div>

              {/* Stage Label + Short Description Below Bar */}
              <div className="pt-3 border-t border-navy-08 min-h-[110px]">
                <h3 className="text-[16px] font-extrabold text-navy leading-snug mb-1.5">
                  {item.stage}
                </h3>
                <p className="text-[13px] text-navy-70 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Vertical List with Horizontal Progress Bars */}
        <div className="lg:hidden space-y-4">
          {REFUND_STAGES_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[20px] p-5 border border-navy-08 shadow-soft"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                  Stage {item.stepNum}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-[14px] font-extrabold tabular-nums">
                  {item.displayPercent}
                </span>
              </div>
              <h3 className="text-[17px] font-bold text-navy mb-2">{item.stage}</h3>
              <div className="w-full h-3 rounded-full bg-navy/10 overflow-hidden mb-2.5">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(item.refundPercent, 6)}%` }}
                />
              </div>
              <p className="text-[13px] text-navy-70">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Info Callout Below Ladder */}
        <div className="mt-8 p-5 rounded-r-[18px] rounded-l-xs bg-white border border-navy-08 border-l-4 border-l-primary flex items-start gap-3.5 shadow-2xs">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-[15px] sm:text-[16px] font-medium text-navy leading-relaxed">
            Percentages apply to the amount paid for the current milestone. Completed and approved
            milestones are non-refundable.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   5. REFUND ESTIMATE TOOL (white — #estimate, reads from REFUND_STAGES_DATA)
============================================================================ */
const RefundEstimateToolSection: React.FC = () => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [amountInput, setAmountInput] = useState<string>('50000');
  const [selectedStageId, setSelectedStageId] = useState<string>(REFUND_STAGES_DATA[0].id);
  const [animatedValue, setAnimatedValue] = useState<number>(45000);

  const selectedStage =
    REFUND_STAGES_DATA.find((s) => s.id === selectedStageId) || REFUND_STAGES_DATA[0];

  const numericAmount = Math.max(0, Number(amountInput) || 0);
  const targetRefund = Math.round((numericAmount * selectedStage.refundPercent) / 100);

  // Smooth count-up animation when targetRefund changes
  useEffect(() => {
    let startVal = animatedValue;
    const diff = targetRefund - startVal;
    if (diff === 0) return;

    const duration = 260;
    const startTime = performance.now();
    let rafId: number;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedValue(Math.round(startVal + diff * eased));
      if (t < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [targetRefund]);

  const handleCurrencySwitch = (nextCurr: 'INR' | 'USD') => {
    if (nextCurr === currency) return;
    setCurrency(nextCurr);
    if (nextCurr === 'USD' && amountInput === '50000') {
      setAmountInput('2000');
    } else if (nextCurr === 'INR' && amountInput === '2000') {
      setAmountInput('50000');
    }
  };

  const scrollToRequest = () => {
    const el = document.getElementById('how-to-request');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const symbol = currency === 'INR' ? '₹' : '$';
  const formattedRefund = animatedValue.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US');

  // Circular SVG Ring Geometry
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const dashOffset =
    circumference - (selectedStage.refundPercent / 100) * circumference;

  return (
    <section id="estimate" className="bg-white py-16 lg:py-24 scroll-mt-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          label="QUICK ESTIMATE"
          firstPart="Check Your"
          highlightPart="Refund Estimate"
          className="mb-12"
        />

        <div className="rounded-[24px] border border-navy-15 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Panel: Inputs (White, 7 columns) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 space-y-7">
            {/* Amount Paid Input + Currency Toggle Pills */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <label
                  htmlFor="refund-amount-input"
                  className="text-[14px] font-extrabold text-navy"
                >
                  Amount paid for current milestone
                </label>

                <div
                  className="inline-flex rounded-full bg-primary-50 p-1 border border-primary-100"
                  role="group"
                  aria-label="Select currency"
                >
                  <button
                    type="button"
                    aria-pressed={currency === 'INR'}
                    onClick={() => handleCurrencySwitch('INR')}
                    className={`px-3.5 py-1 rounded-full text-[12px] font-extrabold transition-all cursor-pointer ${
                      currency === 'INR'
                        ? 'bg-primary text-white shadow-2xs'
                        : 'text-navy-70 hover:text-primary'
                    }`}
                  >
                    ₹ INR
                  </button>
                  <button
                    type="button"
                    aria-pressed={currency === 'USD'}
                    onClick={() => handleCurrencySwitch('USD')}
                    className={`px-3.5 py-1 rounded-full text-[12px] font-extrabold transition-all cursor-pointer ${
                      currency === 'USD'
                        ? 'bg-primary text-white shadow-2xs'
                        : 'text-navy-70 hover:text-primary'
                    }`}
                  >
                    $ USD
                  </button>
                </div>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] font-extrabold text-primary">
                  {symbol}
                </span>
                <input
                  id="refund-amount-input"
                  type="number"
                  min="0"
                  step="500"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-[14px] border border-navy-15 text-[18px] font-extrabold text-navy focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary tabular-nums"
                />
              </div>
            </div>

            {/* Project Stage — 5 Selectable Stage Chips */}
            <div>
              <span className="block text-[14px] font-extrabold text-navy mb-3">
                Select current project stage
              </span>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                role="group"
                aria-label="Project stage"
              >
                {REFUND_STAGES_DATA.map((st) => {
                  const isSelected = st.id === selectedStageId;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedStageId(st.id)}
                      className={`p-3.5 rounded-[14px] border text-left transition-all cursor-pointer flex items-center justify-between gap-2 focus-visible:outline-2 focus-visible:outline-primary ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-soft'
                          : 'bg-white text-navy border-navy-15 hover:border-primary hover:bg-primary-50/40'
                      }`}
                    >
                      <span className="text-[13px] font-bold leading-snug">{st.stage}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shrink-0 tabular-nums ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {st.displayPercent}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: Live Result (Navy with Blue Glow, 5 columns) */}
          <div
            className="lg:col-span-5 relative bg-navy text-white p-7 sm:p-10 flex flex-col justify-between overflow-hidden"
            aria-live="polite"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 blue-glow-strong pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-primary mb-1">
                    ESTIMATED REFUND
                  </div>
                  <div className="text-[32px] sm:text-[40px] font-extrabold text-white leading-none tracking-tight tabular-nums">
                    {symbol}
                    {formattedRefund}
                  </div>
                  <p className="text-[14px] font-semibold text-primary mt-2">
                    {selectedStage.displayPercent} of amount paid at this stage
                  </p>
                </div>

                {/* Animated Circular Progress Ring in Blue */}
                <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r={radius}
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  <span className="absolute text-[18px] font-extrabold text-white tabular-nums">
                    {selectedStage.refundPercent}%
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10 text-[13px] text-white/85 mb-6">
                <strong className="text-white">{selectedStage.stage}:</strong>{' '}
                {selectedStage.description}
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <Button size="md" onClick={scrollToRequest} className="w-full justify-center">
                Request a Refund
              </Button>
              <p className="text-[12px] text-white/60 leading-relaxed">
                This is an estimate only. Final refunds are confirmed after reviewing your project,
                and third-party costs are excluded.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   6. REFUNDS BY SERVICE (light blue tint — #by-service, accessible vertical tabs)
============================================================================ */
const RefundsByServiceSection: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeService = SERVICE_REFUND_RULES[activeTabIndex] || SERVICE_REFUND_RULES[0];

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx = idx;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIdx = (idx + 1) % SERVICE_REFUND_RULES.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIdx = (idx - 1 + SERVICE_REFUND_RULES.length) % SERVICE_REFUND_RULES.length;
    } else {
      return;
    }
    setActiveTabIndex(nextIdx);
    tabRefs.current[nextIdx]?.focus();
  };

  const renderServiceIcon = (icon: ServiceRefundRule['icon']) => {
    switch (icon) {
      case 'web':
        return <Code2 className="w-6 h-6" strokeWidth={1.75} />;
      case 'seo':
        return <TrendingUp className="w-6 h-6" strokeWidth={1.75} />;
      case 'ai':
        return <Bot className="w-6 h-6" strokeWidth={1.75} />;
      case 'maintenance':
        return <ShieldCheck className="w-6 h-6" strokeWidth={1.75} />;
      case 'branding':
        return <Palette className="w-6 h-6" strokeWidth={1.75} />;
    }
  };

  return (
    <section id="by-service" className="bg-primary-50 py-16 lg:py-24 scroll-mt-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          label="BY SERVICE"
          firstPart="Refund Rules for"
          highlightPart="Each Service"
          className="mb-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Vertical Tabs on Desktop / Horizontal Scroll on Mobile (5 columns) */}
          <div
            role="tablist"
            aria-label="Service refund rules"
            className="lg:col-span-5 flex lg:flex-col gap-2.5 overflow-x-auto no-scrollbar pb-2 lg:pb-0"
          >
            {SERVICE_REFUND_RULES.map((srv, idx) => {
              const isSelected = idx === activeTabIndex;
              return (
                <button
                  key={srv.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  id={`tab-${srv.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls={`panel-${srv.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveTabIndex(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`px-5 py-4 rounded-[18px] text-left transition-all cursor-pointer flex items-center justify-between gap-3 shrink-0 lg:shrink focus-visible:outline-2 focus-visible:outline-primary ${
                    isSelected
                      ? 'bg-primary text-white shadow-soft font-bold'
                      : 'bg-white text-navy border border-navy-08 hover:border-primary-100 hover:text-primary font-semibold'
                  }`}
                >
                  <span className="text-[14px] sm:text-[15px]">{srv.title}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-primary-50 text-primary'
                    }`}
                  >
                    {srv.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Content Card (7 columns) */}
          <div
            id={`panel-${activeService.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeService.id}`}
            className="lg:col-span-7 bg-white rounded-[24px] border border-navy-08 shadow-soft p-7 sm:p-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-navy-08">
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 rounded-2xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                  {renderServiceIcon(activeService.icon)}
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    SERVICE CATEGORY
                  </span>
                  <h3 className="text-[22px] sm:text-[24px] font-extrabold text-navy">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-primary text-white text-[12px] font-bold">
                Refund window: {activeService.badge}
              </span>
            </div>

            <p className="text-[17px] leading-[1.8] font-bold text-navy mb-5">
              {activeService.summary}
            </p>

            <ul className="space-y-3.5">
              {activeService.rules.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start gap-3 text-[16px] leading-[1.7] text-navy/80"
                >
                  <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   7. ELIGIBILITY (white — #eligibility, 2 contrasting columns side by side)
============================================================================ */
const EligibilitySection: React.FC = () => {
  return (
    <section id="eligibility" className="bg-white py-16 lg:py-24 scroll-mt-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          label="ELIGIBILITY"
          firstPart="What's"
          highlightPart="Covered"
          lastPart="and What's Not"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Card: Eligible for a refund (white, blue top border, blue check icons) */}
          <div className="rounded-[20px] bg-white border border-navy-15 border-t-4 border-t-primary shadow-soft p-7 sm:p-9">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h3 className="text-[22px] font-extrabold text-navy">Eligible for a refund</h3>
            </div>

            <ul className="space-y-4">
              {ELIGIBLE_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 text-[16px] leading-[1.7] text-navy/85"
                >
                  <span className="w-6 h-6 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card: Not eligible for a refund (light tint, muted navy X icons — no green/red) */}
          <div className="rounded-[20px] bg-navy/[0.03] border border-navy-15 p-7 sm:p-9">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-navy/15 text-navy/75 flex items-center justify-center shrink-0">
                <X className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h3 className="text-[22px] font-extrabold text-navy">
                Not eligible for a refund
              </h3>
            </div>

            <ul className="space-y-4">
              {NOT_ELIGIBLE_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 text-[16px] leading-[1.7] text-navy/75"
                >
                  <span className="w-6 h-6 rounded-full bg-navy/10 text-navy/60 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   8. HOW TO REQUEST A REFUND (navy — #how-to-request, horizontal 4-step timeline)
============================================================================ */
const HowToRequestSection: React.FC = () => {
  const renderStepIcon = (icon: RefundProcessStep['icon']) => {
    switch (icon) {
      case 'email':
        return <Mail className="w-5 h-5" strokeWidth={1.75} />;
      case 'review':
        return <FileSearch className="w-5 h-5" strokeWidth={1.75} />;
      case 'decision':
        return <CheckCircle2 className="w-5 h-5" strokeWidth={1.75} />;
      case 'payout':
        return <CreditCard className="w-5 h-5" strokeWidth={1.75} />;
    }
  };

  return (
    <section
      id="how-to-request"
      className="relative bg-navy text-white py-16 lg:py-24 overflow-hidden scroll-mt-32"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] blue-glow pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          dark
          align="center"
          label="THE PROCESS"
          firstPart="How to"
          highlightPart="Request a Refund"
          className="mb-14"
        />

        {/* Horizontal 4-Step Timeline with Glowing Blue Connector Line */}
        <div className="relative">
          <div
            className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-primary/40 via-primary to-primary/40 shadow-[0_0_12px_#0571c2] z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {REFUND_PROCESS_STEPS.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-[20px] bg-white/[0.06] border border-white/15 backdrop-blur-md flex flex-col justify-between hover:border-primary transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-[0_6px_18px_rgba(5,113,194,0.5)]">
                      {renderStepIcon(step.icon)}
                    </div>
                    <span className="text-[13px] font-extrabold text-primary bg-primary/20 border border-primary/40 px-3 py-1 rounded-full tabular-nums">
                      Step {step.num}
                    </span>
                  </div>

                  <h3 className="text-[19px] font-extrabold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-white/75 leading-relaxed mb-5">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-primary">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{step.badge}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons Below Timeline */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" href="mailto:billing@webxcode.com">
            Email Billing Team
          </Button>
          <Link to="/contact">
            <Button variant="outline-dark" size="lg" showArrow={false}>
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   9. CANCELLATIONS (white — #cancellations, 3 horizontal info rows + navy callout)
============================================================================ */
const CancellationsSection: React.FC = () => {
  const renderCancelIcon = (type: CancellationRowItem['icon']) => {
    switch (type) {
      case 'project':
        return <FolderX className="w-5 h-5" strokeWidth={1.75} />;
      case 'monthly':
        return <CalendarOff className="w-5 h-5" strokeWidth={1.75} />;
      case 'agency':
        return <Building2 className="w-5 h-5" strokeWidth={1.75} />;
    }
  };

  return (
    <section id="cancellations" className="bg-white py-16 lg:py-24 scroll-mt-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          label="CANCELLATIONS"
          firstPart="Cancelling a"
          highlightPart="Project or Plan"
          className="mb-10"
        />

        {/* 3 Horizontal Info Rows Separated by Thin Dividers */}
        <div className="border-t border-b border-navy-15 divide-y divide-navy-15 mb-8">
          {CANCELLATION_ROWS.map((row) => (
            <div
              key={row.title}
              className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                {renderCancelIcon(row.icon)}
              </div>
              <div>
                <h3 className="text-[19px] font-bold text-navy mb-1">{row.title}</h3>
                <p className="text-[16px] leading-[1.7] text-navy/80">{row.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Key-Point Navy Callout */}
        <div className="p-6 sm:p-7 rounded-[20px] bg-navy text-white flex items-start gap-4 shadow-lg">
          <div className="w-11 h-11 rounded-xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
              PAYMENT METHOD POLICY
            </div>
            <p className="text-[16px] sm:text-[17px] font-bold text-white leading-relaxed">
              Refunds are always made to the original payment method. Bank or payment-gateway
              charges may be deducted where applicable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   10. REFUND FAQ (light blue tint — #faq, single centered accordion column)
============================================================================ */
const RefundFAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-primary-50 py-16 lg:py-24 scroll-mt-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          label="FAQ"
          firstPart="Refund"
          highlightPart="Questions"
          className="mb-12"
        />

        {/* Single Centered Accordion Column (max-w-[800px]) */}
        <div className="max-w-[800px] mx-auto space-y-4">
          {REFUND_FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.q}
                className={`bg-white rounded-[20px] border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-navy-15 border-l-4 border-l-primary shadow-soft'
                    : 'border-navy-08 hover:border-primary-100'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <h3
                    className={`text-[17px] sm:text-[18px] font-bold leading-snug transition-colors ${
                      isOpen ? 'text-primary' : 'text-navy'
                    }`}
                  >
                    {item.q}
                  </h3>
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-primary text-white' : 'bg-primary-50 text-primary'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-[16px] leading-[1.75] text-navy/80 border-t border-navy-08/60">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   11. CONTACT FOR REFUNDS (white — #contact, 2 cards side by side)
============================================================================ */
const ContactForRefundsSection: React.FC = () => {
  return (
    <section id="contact" className="bg-white py-14 lg:py-20 scroll-mt-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-stretch">
          {/* Left White Card — Billing & Refunds */}
          <div className="p-7 sm:p-9 rounded-[20px] bg-white border border-navy-15 shadow-soft flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-bold uppercase tracking-wider mb-3">
                <span>BILLING SUPPORT</span>
              </div>
              <h3 className="text-[22px] sm:text-[24px] font-extrabold text-navy mb-5">
                Billing & Refunds
              </h3>
              <div className="space-y-3.5 text-[16px] text-navy/80">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>
                    Email:{' '}
                    <a
                      href="mailto:billing@webxcode.com"
                      className="font-bold text-primary hover:underline"
                    >
                      [billing@webxcode.com]
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>Phone: [+91 XXXXX XXXXX]</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <span>Hours: Mon–Sat, 10 AM – 7 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Navy Card — "Not happy with something?" */}
          <div className="relative p-7 sm:p-9 rounded-[20px] bg-navy text-white shadow-xl overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-16 -right-16 w-52 h-52 blue-glow-strong pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h3 className="text-[22px] sm:text-[24px] font-extrabold text-white mb-2">
                Not happy with something?
              </h3>
              <p className="text-[16px] text-white/80 leading-relaxed mb-7">
                Talk to us first — most issues are solved quickly with a conversation.
              </p>
            </div>

            <div className="relative z-10">
              <Link to="/contact">
                <Button size="md">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   12. RELATED LEGAL PAGES (white, compact — 3 small link cards)
============================================================================ */
const RelatedLegalPagesSection: React.FC = () => {
  return (
    <section className="bg-white pt-2 pb-16 lg:pb-24 print:hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-navy-50 mb-4">
          RELATED LEGAL DOCUMENTS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RELATED_LEGAL_CARDS.map((page) => {
            const isActive = page.status === 'active';

            if (!isActive) {
              return (
                <Link
                  key={page.id}
                  to={page.href}
                  className="group p-6 rounded-[20px] bg-white border border-navy-08 hover:border-primary hover:shadow-soft transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center">
                        <FileText className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[12px] font-bold text-primary">
                        <span>Read Policy</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                    <h3 className="text-[18px] font-bold text-navy group-hover:text-primary transition-colors mb-1">
                      {page.title}
                    </h3>
                    <p className="text-[14px] text-navy-70 leading-relaxed">
                      {page.description}
                    </p>
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={page.id}
                className="p-6 rounded-[20px] bg-primary-50/40 border-2 border-primary shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
                      <FileText className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider">
                      You're here
                    </span>
                  </div>
                  <h3 className="text-[18px] font-bold text-navy mb-1">{page.title}</h3>
                  <p className="text-[14px] text-navy-70 leading-relaxed">
                    {page.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   MAIN REFUND POLICY PAGE EXPORT
============================================================================ */
export const RefundPolicy: React.FC = () => {
  const { hash } = useLocation();

  /* Update Document Title & Meta Description on Route Mount */
  useEffect(() => {
    document.title = 'Refund Policy | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Understand the WebXCode Refund Policy, including stage-based refund percentages, our interactive refund estimator, service-specific rules, and how to submit a refund request.'
      );
    }
  }, []);

  /* Handle Deep Hash Links on Mount/Change (e.g. /refund-policy#how-to-request) */
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  /* JSON-LD Structured Data: WebPage + FAQPage */
  const refundJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://webxcode.com/refund-policy#webpage',
        url: 'https://webxcode.com/refund-policy',
        name: 'Refund Policy | WebXCode',
        description:
          'This policy explains when refunds apply, how much you can get back at each project stage, and how to request a refund at WebXCode.',
        dateModified: '2026-10-04',
        publisher: {
          '@type': 'Organization',
          '@id': 'https://webxcode.com/#organization',
          name: 'WebXCode',
          url: 'https://webxcode.com',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://webxcode.com/refund-policy#faq',
        mainEntity: REFUND_FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <main className="flex-1 bg-white">
      {/* Print Stylesheet: hide header, footer, sticky pill bar and floating buttons */}
      <style>{`
        @media print {
          header, footer, nav[aria-label="Page sections"], .fixed, .sticky {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            color: #1e242e !important;
          }
        }
      `}</style>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(refundJsonLd) }}
      />

      {/* 1. Compact Split Page Hero (navy) */}
      <RefundHeroSection />

      {/* 2. Sticky Horizontal Pill Navigation + Reading Progress Bar */}
      <StickyPillNav />

      {/* 3. Overview (#overview) */}
      <OverviewSection />

      {/* 4. Refund by Project Stage — The Refund Ladder (#refund-by-stage) */}
      <RefundLadderSection />

      {/* 5. Interactive Refund Estimate Tool (#estimate) */}
      <RefundEstimateToolSection />

      {/* 6. Refunds by Service (#by-service) */}
      <RefundsByServiceSection />

      {/* 7. Eligibility (#eligibility) */}
      <EligibilitySection />

      {/* 8. How to Request a Refund (#how-to-request) */}
      <HowToRequestSection />

      {/* 9. Cancellations (#cancellations) */}
      <CancellationsSection />

      {/* 10. Refund FAQ (#faq) */}
      <RefundFAQSection />

      {/* 11. Contact for Refunds (#contact) */}
      <ContactForRefundsSection />

      {/* 12. Related Legal Pages */}
      <RelatedLegalPagesSection />
    </main>
  );
};

export default RefundPolicy;
