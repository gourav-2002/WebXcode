import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUp,
  ChevronRight,
  ChevronDown,
  FileCheck2,
  Calendar,
  Clock,
  CheckCircle2,
  MessageSquare,
  Printer,
  Check,
  X,
  ShieldAlert,
  Handshake,
  FileText,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Scale,
} from 'lucide-react';

/* ============================================================================
   TERMS & CONDITIONS DATA ARRAY (single source of truth at top of file)
============================================================================ */

export interface TermsSectionItem {
  id: string;
  num: string;
  title: string;
  plainEnglish: string;
  paragraphs?: string[];
  glossaryGrid?: {
    term: string;
    meaning: string;
  }[];
  paymentMilestoneBar?: {
    percent: string;
    stage: string;
    detail: string;
  }[];
  refundNote?: string;
  ownershipSplitCard?: {
    youOwnTitle: string;
    youOwnItems: string[];
    weKeepTitle: string;
    weKeepItems: string[];
    weKeepNote: string;
  };
  guaranteeComparison?: {
    weDoTitle: string;
    weDoItems: string[];
    weCantTitle: string;
    weCantItems: string[];
  };
  keyPointCallout?: string;
  contactCard?: {
    company: string;
    address: string;
    email: string;
    phone: string;
  };
}

export const TERMS_SECTIONS: TermsSectionItem[] = [
  {
    id: 'acceptance',
    num: '01',
    title: 'Acceptance of Terms',
    plainEnglish: 'By using our website or services, you agree to these terms.',
    paragraphs: [
      'These Terms & Conditions ("Terms") govern your use of [www.webxcode.com] (the "Website") and the services provided by WebXCode, operated by [Legal Company Name] ("WebXCode", "we", "us"). By using the Website or engaging our services, you agree to these Terms. If you do not agree, please do not use the Website or our services.',
    ],
  },
  {
    id: 'definitions',
    num: '02',
    title: 'Definitions',
    plainEnglish: 'A few words we use often, explained.',
    glossaryGrid: [
      {
        term: 'Client',
        meaning: 'the person or business that engages our services',
      },
      {
        term: 'Services',
        meaning:
          'web development, SEO, performance marketing, AI solutions, design, maintenance and related services',
      },
      {
        term: 'Proposal / SOW',
        meaning:
          'the written quote or Statement of Work describing scope, price and timeline',
      },
      {
        term: 'Deliverables',
        meaning: 'the final work we produce for the Client under a Proposal',
      },
      {
        term: 'Client Materials',
        meaning: 'content, logos, images, data and access the Client provides',
      },
      {
        term: 'Third-Party Services',
        meaning:
          'tools, platforms, plugins, hosting, APIs or AI providers not owned by WebXCode',
      },
    ],
  },
  {
    id: 'services',
    num: '03',
    title: 'Our Services',
    plainEnglish: 'What we do is defined in your proposal.',
    paragraphs: [
      'The exact scope, deliverables, timeline and price of each project are set out in the Proposal/SOW accepted by the Client. Anything not included in the Proposal is out of scope and may be quoted separately.',
    ],
  },
  {
    id: 'proposals',
    num: '04',
    title: 'Proposals, Quotes & Agreements',
    plainEnglish:
      'Quotes are valid for a limited time and the project starts once accepted and the first payment is made.',
    paragraphs: [
      'Quotes are valid for [30] days unless stated otherwise. A project starts once the Proposal is accepted in writing (including email) and the advance payment is received. If a separate signed agreement exists, it takes priority over these Terms where they conflict.',
    ],
  },
  {
    id: 'client-responsibilities',
    num: '05',
    title: 'Client Responsibilities',
    plainEnglish: 'We need your timely inputs to deliver on time.',
    paragraphs: [
      'The Client agrees to provide accurate information, content, feedback, approvals and access (hosting, domains, accounts) on time; to ensure they have the rights to all Client Materials they provide; and to appoint one point of contact for decisions. Delays in Client inputs may shift timelines and may incur additional costs.',
    ],
  },
  {
    id: 'payment-terms',
    num: '06',
    title: 'Payment Terms',
    plainEnglish: 'Projects are paid in milestones; late payments may pause work.',
    paymentMilestoneBar: [
      {
        percent: '[50]% Advance',
        stage: 'Milestone 01',
        detail: 'before work starts',
      },
      {
        percent: '[25]% Midway',
        stage: 'Milestone 02',
        detail: 'on design/development approval',
      },
      {
        percent: '[25]% Final',
        stage: 'Milestone 03',
        detail: 'before launch/handover',
      },
    ],
    paragraphs: [
      'Invoices are payable within [7] days. Prices are exclusive of applicable taxes (such as GST), which are added as required. Recurring services (maintenance, SEO, marketing, AI subscriptions) are billed in advance for each billing period. If payment is late, we may pause work until it is cleared. Third-party costs (hosting, domains, paid plugins, ad spend, AI usage fees) are paid by the Client unless stated otherwise.',
    ],
    refundNote: 'For refunds, please see our Refund Policy.',
  },
  {
    id: 'timelines-revisions',
    num: '07',
    title: 'Timelines, Revisions & Change Requests',
    plainEnglish:
      'Each phase includes a set number of revisions; extra changes are quoted separately.',
    paragraphs: [
      'Timelines in a Proposal are estimates and depend on timely Client inputs. Each design phase includes [2] rounds of revisions unless stated otherwise. Requests beyond the agreed scope or revision rounds are treated as change requests and may affect price and timeline. If a project is on hold for more than [30] days due to the Client, we may close it and invoice the work completed.',
    ],
  },
  {
    id: 'intellectual-property',
    num: '08',
    title: 'Intellectual Property',
    plainEnglish: "Once you've paid in full, the final work is yours.",
    ownershipSplitCard: {
      youOwnTitle: 'You own (after full payment)',
      youOwnItems: [
        'Final custom UI/UX designs created for your project',
        'Website and application code written specifically for you',
        'Custom copy, graphics and content created for you',
      ],
      weKeepTitle: 'We keep',
      weKeepItems: [
        'Our pre-existing internal tools and starter boilerplates',
        'Reusable frameworks and internal code libraries',
        'Agency engineering know-how and methodologies',
      ],
      weKeepNote:
        'You receive a perpetual, royalty-free licence to use them as part of your Deliverables.',
    },
    paragraphs: [
      'Ownership of Deliverables transfers to the Client only after full payment. Third-party and open-source components remain subject to their own licences. Unless the Client asks us not to in writing, we may show the completed work in our portfolio and case studies.',
    ],
  },
  {
    id: 'third-party-services',
    num: '09',
    title: 'Third-Party Services',
    plainEnglish: "We're not responsible for tools and platforms we don't own.",
    paragraphs: [
      'Our work may use Third-Party Services (e.g. hosting providers, WordPress, Shopify, plugins, payment gateways, Google services, AI providers). Their availability, pricing, policies and performance are controlled by those providers, and we are not liable for their changes, outages or failures.',
    ],
  },
  {
    id: 'results-disclaimer',
    num: '10',
    title: 'SEO, Marketing & AI Results',
    plainEnglish:
      'We work hard for great results, but no one can guarantee rankings or exact numbers.',
    guaranteeComparison: {
      weDoTitle: 'What We Commit To',
      weDoItems: [
        'Follow industry best practices and ethical standards',
        'Report performance metrics and progress transparently',
        'Optimize campaigns, SEO architecture and AI prompts continuously',
      ],
      weCantTitle: "What We Can't Guarantee",
      weCantItems: [
        'Specific #1 search engine rankings or algorithm changes',
        'Exact website traffic numbers, leads or sales volume',
        'Third-party ad platform approvals or policy decisions',
      ],
    },
    paragraphs: [
      'Search engines, ad platforms and AI models are controlled by third parties and change often. AI-generated outputs (chatbot replies, content, videos) may sometimes be inaccurate, and the Client is responsible for reviewing them before use.',
    ],
  },
  {
    id: 'support',
    num: '11',
    title: 'Maintenance & Support',
    plainEnglish:
      'Support is included for a limited period after launch; ongoing support is a separate plan.',
    paragraphs: [
      'We provide [15/30] days of free bug-fix support after launch for issues within the original scope. Ongoing maintenance, updates, security monitoring and new features are available under a separate support plan.',
    ],
  },
  {
    id: 'confidentiality',
    num: '12',
    title: 'Confidentiality',
    plainEnglish:
      'We keep your business information private, and you do the same for ours.',
    paragraphs: [
      'Both parties agree to keep confidential information shared during the project private and use it only for the project. This does not apply to information that is public, already known, or required to be disclosed by law. We are happy to sign an NDA on request.',
    ],
  },
  {
    id: 'acceptable-use',
    num: '13',
    title: 'Acceptable Use of the Website',
    plainEnglish: 'Use our website fairly and legally.',
    paragraphs: [
      'You agree not to misuse the Website, including attempting to hack, disrupt or overload it, copying its content or design without permission, submitting false or spam enquiries, or using it for any unlawful purpose.',
    ],
  },
  {
    id: 'disclaimer',
    num: '14',
    title: 'Warranties & Disclaimer',
    plainEnglish:
      'We deliver professional work, but the website itself is provided "as is".',
    paragraphs: [
      'We will perform our services with reasonable skill and care. Except as expressly stated, the Website and its content are provided "as is" without warranties of any kind, to the extent permitted by law.',
    ],
  },
  {
    id: 'limitation-of-liability',
    num: '15',
    title: 'Limitation of Liability',
    plainEnglish: 'Our total liability is limited to what you paid us recently.',
    keyPointCallout:
      'Our total liability for any claim is limited to the amount paid by the Client for the relevant service in the [3] months before the claim.',
    paragraphs: [
      'To the maximum extent permitted by law, WebXCode is not liable for indirect, incidental or consequential losses, including loss of profits, data or business. Our total liability for any claim is limited to the amount paid by the Client for the relevant service in the [3] months before the claim.',
    ],
  },
  {
    id: 'indemnification',
    num: '16',
    title: 'Indemnification',
    plainEnglish:
      "If something you provided causes a legal problem, you're responsible for it.",
    paragraphs: [
      "The Client agrees to indemnify WebXCode against claims arising from Client Materials, the Client's misuse of the Deliverables, or the Client's breach of these Terms or applicable law.",
    ],
  },
  {
    id: 'termination',
    num: '17',
    title: 'Termination',
    plainEnglish:
      'Either side can end the project with notice; completed work is paid for.',
    paragraphs: [
      "Either party may terminate a project with [15] days' written notice, or immediately if the other party seriously breaches these Terms. On termination, the Client pays for all work completed and costs incurred up to the termination date.",
    ],
  },
  {
    id: 'governing-law',
    num: '18',
    title: 'Governing Law & Disputes',
    plainEnglish:
      "Indian law applies, and we'll try to solve issues by talking first.",
    paragraphs: [
      'These Terms are governed by the laws of India. Both parties will first try to resolve any dispute through good-faith discussion. If unresolved within [30] days, the courts of [City], India will have exclusive jurisdiction.',
    ],
  },
  {
    id: 'changes',
    num: '19',
    title: 'Changes to These Terms',
    plainEnglish:
      'We may update these terms; the date at the top shows the latest version.',
    paragraphs: [
      'We may update these Terms from time to time. Changes apply from the "Last updated" date. Ongoing projects continue under the terms agreed at the time of the Proposal unless both parties agree otherwise.',
    ],
  },
  {
    id: 'contact',
    num: '20',
    title: 'Contact Us',
    plainEnglish: "Questions? We're happy to help.",
    contactCard: {
      company: '[Legal Company Name]',
      address: '[Full Registered Address]',
      email: '[legal@webxcode.com]',
      phone: '[+91 XXXXX XXXXX]',
    },
  },
];

/* Related Legal Pages Data Array (easy to update when Refund Policy is added) */
export interface RelatedLegalItem {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'available' | 'coming-soon';
  href?: string;
}

export const RELATED_LEGAL_PAGES_DATA: RelatedLegalItem[] = [
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
    status: 'active',
    href: '/terms-and-conditions',
  },
  {
    id: 'refund-policy',
    title: 'Refund Policy',
    description: 'Milestone billing, cancellation terms and refund eligibility guidelines.',
    status: 'available',
    href: '/refund-policy',
  },
];

/* ============================================================================
   SHARED UI HELPERS (self-contained inside TermsConditions.tsx)
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
   1. READING PROGRESS BAR (3px #0571c2 fixed at top of viewport)
============================================================================ */
const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setProgress(pct);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] bg-navy-08 z-[60] pointer-events-none print:hidden"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary transition-[width] duration-100 ease-out shadow-[0_0_10px_#0571c2]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

/* ============================================================================
   2. PAGE HERO (navy, compact, centered content + diagonal texture + watermark seal)
============================================================================ */
const TermsHeroSection: React.FC = () => {
  return (
    <section className="relative bg-navy text-white pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden text-center">
      {/* Soft Blue Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] blue-glow-strong pointer-events-none" />

      {/* Faint Diagonal Line Texture (distinct from Privacy Policy grid) */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 18px)',
        }}
      />

      {/* Large Faint Outline Document with Checkmark Seal Behind Heading */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.06]"
        aria-hidden="true"
      >
        <FileCheck2 className="w-[290px] h-[290px] sm:w-[360px] sm:h-[360px] text-primary" strokeWidth={1} />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Two Small Floating Glass Chips on Left & Right Sides (Desktop) */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:inline-flex absolute left-8 top-1/3 px-4 py-2 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-xl items-center gap-2 text-[12px] font-bold text-white print:hidden"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Clear Terms</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="hidden lg:inline-flex absolute right-8 top-1/3 px-4 py-2 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-xl items-center gap-2 text-[12px] font-bold text-white print:hidden"
        >
          <Handshake className="w-4 h-4 text-primary" />
          <span>Fair Partnership</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="max-w-3xl mx-auto space-y-5"
        >
          {/* Breadcrumb: Home › Terms & Conditions */}
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center justify-center gap-2 text-[13px] font-medium text-white/65 print:hidden"
          >
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-primary font-semibold" aria-current="page">
              Terms & Conditions
            </span>
          </nav>

          <div className="flex justify-center">
            <SectionLabel dark>LEGAL</SectionLabel>
          </div>

          {/* H1 */}
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
            Terms & <span className="text-primary">Conditions</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-[16px] sm:text-[18px] text-white/75 leading-[1.7] max-w-2xl mx-auto">
            These terms explain how we work together — clearly and fairly. Please read them before
            using our website or services.
          </p>

          {/* Meta Pills Row (Glass Style) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md text-[13px] font-medium text-white/90">
              <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Last updated: [DD Month YYYY]</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md text-[13px] font-medium text-white/90">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Effective: [DD Month YYYY]</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md text-[13px] font-medium text-white/90">
              <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>~12 min read</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================================
   3. KEY TERMS AT A GLANCE (white, overlapping hero bottom by ~50px, 5-step strip)
============================================================================ */
const KeyTermsAtAGlanceSection: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Proposal',
      desc: 'Scope, price and timeline are agreed in writing.',
    },
    {
      num: '2',
      title: 'Payment',
      desc: 'Work is billed in milestones.',
    },
    {
      num: '3',
      title: 'Build',
      desc: 'We deliver, you review within agreed revision rounds.',
    },
    {
      num: '4',
      title: 'Ownership',
      desc: 'Final deliverables are yours after full payment.',
    },
    {
      num: '5',
      title: 'Support',
      desc: 'Post-launch support as per your plan.',
    },
  ];

  return (
    <section className="relative z-20 bg-white pb-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 -mt-12 sm:-mt-14">
        <div className="bg-white rounded-[24px] border border-navy-08 shadow-xl p-6 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-7">
            <SectionLabel>THE SHORT VERSION</SectionLabel>
            <span className="text-[12px] font-semibold text-navy-50">
              How We Work Together in 5 Steps
            </span>
          </div>

          {/* Horizontal 5-Step Strip Connected by Dashed Blue Line (Stacked on Mobile) */}
          <div className="relative">
            {/* Dashed Horizontal Connector Line on Desktop */}
            <div
              className="hidden lg:block absolute top-6 left-[8%] right-[8%] h-[2px] border-t-2 border-dashed border-primary/40 z-0"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="flex lg:flex-col items-start lg:items-center lg:text-center gap-4 bg-primary-50/35 lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-navy-08 lg:border-0"
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-white font-extrabold text-[16px] flex items-center justify-center shrink-0 shadow-[0_6px_16px_-2px_rgba(5,113,194,0.45)] ring-4 ring-white tabular-nums">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-navy mb-1">{step.title}</h3>
                    <p className="text-[13px] sm:text-[14px] text-navy-70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-7 pt-4 border-t border-navy-08 text-[13px] text-navy-50 text-center sm:text-left">
            This summary is for convenience. The full terms below apply.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   4 & 5. MAIN TERMS — STICKY TOC + 20 SECTIONS WITH "IN PLAIN ENGLISH" BOXES
============================================================================ */
const MainTermsContentSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(TERMS_SECTIONS[0].id);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Scroll-Spy for Sticky TOC
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 180;
      let currentId = TERMS_SECTIONS[0].id;

      for (const sec of TERMS_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            currentId = sec.id;
          }
        }
      }
      setActiveId(currentId);
    };

    handleScrollSpy();
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    setMobileTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `/terms-and-conditions#${id}`);
    }
  };

  const activeSectionObj =
    TERMS_SECTIONS.find((s) => s.id === activeId) || TERMS_SECTIONS[0];

  return (
    <section className="bg-white py-10 lg:py-16">
      {/* Mobile Sticky "Jump to section ▾" Dropdown */}
      <div className="lg:hidden sticky top-[68px] z-30 bg-white/95 backdrop-blur-md border-y border-navy-08 px-4 py-3 mb-8 print:hidden">
        <div className="max-w-[1280px] mx-auto">
          <button
            type="button"
            aria-expanded={mobileTocOpen}
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-primary-50 border border-primary-100 text-navy font-bold text-[14px] cursor-pointer"
          >
            <span className="truncate">
              Jump to section:{' '}
              <span className="text-primary">
                {activeSectionObj.num}. {activeSectionObj.title}
              </span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-primary shrink-0 transition-transform duration-200 ${
                mobileTocOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {mobileTocOpen && (
            <nav
              aria-label="Mobile Table of contents"
              className="mt-2 max-h-[60vh] overflow-y-auto rounded-2xl bg-white border border-navy-15 shadow-xl p-2 space-y-1"
            >
              {TERMS_SECTIONS.map((sec) => {
                const isActive = activeId === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-primary-50 text-primary font-bold border-l-4 border-primary'
                        : 'text-navy-70 hover:bg-primary-50/50 hover:text-navy'
                    }`}
                  >
                    <span className="text-primary font-extrabold tabular-nums">{sec.num}</span>
                    <span className="truncate">{sec.title}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">
          {/* Left Column: Sticky Table of Contents (~280px) */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-24 print:hidden">
            <div className="bg-white rounded-[20px] border border-navy-08 shadow-soft p-5">
              <div className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-navy mb-3 px-2">
                Contents
              </div>

              <nav
                aria-label="Table of contents"
                className="space-y-0.5 max-h-[calc(100vh-250px)] overflow-y-auto pr-1"
              >
                {TERMS_SECTIONS.map((sec) => {
                  const isActive = activeId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-r-xl text-[13px] leading-snug flex items-center gap-2.5 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-primary ${
                        isActive
                          ? 'border-l-[3px] border-primary bg-primary-50 text-primary font-bold'
                          : 'border-l-[3px] border-transparent text-navy-70 hover:text-primary hover:bg-primary-50/40 font-medium'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-extrabold tabular-nums shrink-0 ${
                          isActive ? 'text-primary' : 'text-navy-50'
                        }`}
                      >
                        {sec.num}
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Utility Buttons Below TOC: Print / Save as PDF & Back to top */}
              <div className="mt-4 pt-4 border-t border-navy-08 space-y-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-navy-15 text-[13px] font-bold text-navy hover:border-primary hover:text-primary hover:bg-primary-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-primary" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-full px-3.5 py-2 rounded-xl text-[13px] font-semibold text-navy-70 hover:text-primary transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Back to top</span>
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column: Terms Sections (~720px max reading width) */}
          <div className="flex-1 min-w-0 max-w-[760px]">
            <div className="divide-y divide-navy-08">
              {TERMS_SECTIONS.map((sec, idx) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className={`scroll-mt-28 ${idx === 0 ? 'pb-10' : 'py-10'}`}
                >
                  {/* Section Number + H2 */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-[14px] font-extrabold text-primary tracking-wider uppercase px-2.5 py-1 rounded-lg bg-primary-50 tabular-nums shrink-0">
                      {sec.num}
                    </span>
                    <h2 className="text-[24px] sm:text-[28px] font-extrabold text-navy leading-snug tracking-[-0.015em]">
                      {sec.title}
                    </h2>
                  </div>

                  {/* Signature "IN PLAIN ENGLISH" Summary Box */}
                  <div className="mb-6 p-4 sm:p-5 rounded-[16px] bg-primary-50 border border-primary-100 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <MessageSquare className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary mb-0.5">
                        IN PLAIN ENGLISH
                      </div>
                      <p className="text-[15px] sm:text-[16px] font-bold text-navy leading-snug">
                        {sec.plainEnglish}
                      </p>
                    </div>
                  </div>

                  {/* Key-Point Navy Callout (Section 15 — Limitation of Liability) */}
                  {sec.keyPointCallout && (
                    <div className="my-5 p-5 sm:p-6 rounded-[20px] bg-navy text-white flex items-start gap-4 shadow-md">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Scale className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
                          LIABILITY CAP
                        </div>
                        <p className="text-[16px] sm:text-[17px] font-bold text-white leading-relaxed">
                          {sec.keyPointCallout}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Special Block 1: Definitions Glossary Grid (Section 02 — 2 columns of bordered tiles) */}
                  {sec.glossaryGrid && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                      {sec.glossaryGrid.map((item) => (
                        <div
                          key={item.term}
                          className="p-5 rounded-[20px] bg-white border border-navy-15 hover:border-primary-100 shadow-2xs transition-colors"
                        >
                          <h3 className="text-[17px] font-extrabold text-primary mb-1.5">
                            {item.term}
                          </h3>
                          <p className="text-[15px] text-navy/80 leading-relaxed">
                            — {item.meaning}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Special Block 2: Payment Milestone Bar (Section 06 — 3 blue-shaded segments) */}
                  {sec.paymentMilestoneBar && (
                    <div className="my-6">
                      <div className="rounded-[20px] overflow-hidden border border-primary-100 shadow-soft grid grid-cols-1 sm:grid-cols-3">
                        {/* Segment 1: Deep Brand Blue */}
                        <div className="bg-primary text-white p-5 flex flex-col justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1">
                            {sec.paymentMilestoneBar[0].stage}
                          </span>
                          <div className="text-[20px] font-extrabold text-white">
                            {sec.paymentMilestoneBar[0].percent}
                          </div>
                          <p className="text-[13px] text-white/90 mt-1">
                            — {sec.paymentMilestoneBar[0].detail}
                          </p>
                        </div>

                        {/* Segment 2: Navy with Primary Accent */}
                        <div className="bg-navy text-white p-5 flex flex-col justify-between border-y sm:border-y-0 sm:border-x border-white/10">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
                            {sec.paymentMilestoneBar[1].stage}
                          </span>
                          <div className="text-[20px] font-extrabold text-white">
                            {sec.paymentMilestoneBar[1].percent}
                          </div>
                          <p className="text-[13px] text-white/80 mt-1">
                            — {sec.paymentMilestoneBar[1].detail}
                          </p>
                        </div>

                        {/* Segment 3: Soft Light Blue Tint */}
                        <div className="bg-primary-50 text-navy p-5 flex flex-col justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
                            {sec.paymentMilestoneBar[2].stage}
                          </span>
                          <div className="text-[20px] font-extrabold text-navy">
                            {sec.paymentMilestoneBar[2].percent}
                          </div>
                          <p className="text-[13px] text-navy-70 mt-1">
                            — {sec.paymentMilestoneBar[2].detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Special Block 3: Ownership Split Card (Section 08 — Intellectual Property) */}
                  {sec.ownershipSplitCard && (
                    <div className="my-6 rounded-[20px] border border-navy-15 overflow-hidden shadow-soft grid grid-cols-1 md:grid-cols-2">
                      {/* Left Column: You Own (after full payment) */}
                      <div className="bg-primary-50/60 p-6 sm:p-7 border-b md:border-b-0 md:border-r border-navy-15">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider mb-3">
                          <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                          <span>Client Ownership</span>
                        </div>
                        <h3 className="text-[19px] font-bold text-navy mb-4">
                          {sec.ownershipSplitCard.youOwnTitle}
                        </h3>
                        <ul className="space-y-3">
                          {sec.ownershipSplitCard.youOwnItems.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[15px] text-navy/85 leading-snug"
                            >
                              <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Column: We Keep */}
                      <div className="bg-white p-6 sm:p-7 flex flex-col justify-between">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 text-navy text-[11px] font-bold uppercase tracking-wider mb-3">
                            <span>Agency IP & Know-How</span>
                          </div>
                          <h3 className="text-[19px] font-bold text-navy mb-4">
                            {sec.ownershipSplitCard.weKeepTitle}
                          </h3>
                          <ul className="space-y-3 mb-4">
                            {sec.ownershipSplitCard.weKeepItems.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-[15px] text-navy/80 leading-snug"
                              >
                                <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-[13px] font-semibold text-primary bg-primary-50 p-3.5 rounded-xl">
                          {sec.ownershipSplitCard.weKeepNote}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Special Block 4: "We Do / We Can't Guarantee" Two-Column Block (Section 10) */}
                  {sec.guaranteeComparison && (
                    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Left: Blue Check List */}
                      <div className="p-6 rounded-[20px] bg-white border-2 border-primary/30 shadow-soft">
                        <h3 className="text-[19px] font-bold text-navy mb-4 flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-[12px]">
                            <Check className="w-4 h-4" strokeWidth={2.5} />
                          </span>
                          <span>{sec.guaranteeComparison.weDoTitle}</span>
                        </h3>
                        <ul className="space-y-3">
                          {sec.guaranteeComparison.weDoItems.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[15px] text-navy/85 leading-snug"
                            >
                              <Check
                                className="w-4 h-4 text-primary shrink-0 mt-1"
                                strokeWidth={2.5}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Muted X List */}
                      <div className="p-6 rounded-[20px] bg-navy/[0.03] border border-navy-15">
                        <h3 className="text-[19px] font-bold text-navy mb-4 flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-navy/15 text-navy/70 flex items-center justify-center text-[12px]">
                            <X className="w-4 h-4" strokeWidth={2.5} />
                          </span>
                          <span>{sec.guaranteeComparison.weCantTitle}</span>
                        </h3>
                        <ul className="space-y-3">
                          {sec.guaranteeComparison.weCantItems.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[15px] text-navy/70 leading-snug"
                            >
                              <X
                                className="w-4 h-4 text-navy/45 shrink-0 mt-1"
                                strokeWidth={2.5}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Full Legal Text Paragraphs (17px, line-height 1.8, navy at 80% opacity) */}
                  {sec.paragraphs &&
                    sec.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-[17px] leading-[1.8] text-navy/80 mb-[18px] last:mb-0"
                      >
                        {p}
                      </p>
                    ))}

                  {/* Refund Policy Link Line (Section 06) */}
                  {sec.refundNote && (
                    <p className="mt-4 text-[15px] font-semibold text-navy/75 bg-primary-50/60 px-4 py-2.5 rounded-xl inline-block">
                      For refunds, please see our{' '}
                      <Link
                        to="/refund-policy"
                        className="font-bold text-primary hover:underline underline-offset-4"
                      >
                        Refund Policy
                      </Link>
                      .
                    </p>
                  )}

                  {/* Special Block 5: Single Wide Navy Contact Card with Blue Glow (Section 20) */}
                  {sec.contactCard && (
                    <div className="mt-5 relative rounded-[20px] bg-navy text-white p-7 sm:p-9 overflow-hidden shadow-xl">
                      <div className="absolute -right-16 -top-16 w-64 h-64 blue-glow-strong pointer-events-none" />
                      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2.5 text-[15px] text-white/85">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-white text-[11px] font-bold uppercase tracking-wider mb-1">
                            <span>LEGAL & AGREEMENTS DESK</span>
                          </div>
                          <div className="text-[20px] font-extrabold text-white">
                            {sec.contactCard.company}
                          </div>
                          <div className="flex items-start gap-2.5">
                            <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                            <span>{sec.contactCard.address}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
                            <span className="inline-flex items-center gap-2">
                              <Mail className="w-4 h-4 text-primary shrink-0" />
                              <span>
                                Email:{' '}
                                <a
                                  href="mailto:legal@webxcode.com"
                                  className="font-bold text-primary hover:underline"
                                >
                                  {sec.contactCard.email}
                                </a>
                              </span>
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <Phone className="w-4 h-4 text-primary shrink-0" />
                              <span>Phone: {sec.contactCard.phone}</span>
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <Link to="/contact">
                            <Button size="md">Contact Us</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   6. AGREE & GET STARTED BANNER (light blue tint — split banner)
============================================================================ */
const AgreeGetStartedBanner: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  return (
    <section className="bg-white py-8 lg:py-12 print:hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="rounded-[24px] bg-primary-50 border border-primary-100 p-7 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
              <Handshake className="w-7 h-7" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-[26px] sm:text-[32px] font-extrabold text-navy leading-tight">
                Ready to <span className="text-primary">Work Together?</span>
              </h2>
              <p className="text-[16px] text-navy-70 mt-1">
                Clear terms, fair partnership, great results.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Button
              size="lg"
              onClick={() => onOpenQuoteModal('New Project Inquiry')}
            >
              Get a Free Quote
            </Button>
            <Link to="/contact">
              <Button variant="outline-light" size="lg" showArrow={false}>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   7. RELATED LEGAL PAGES (white, compact — 3 link cards in a row)
============================================================================ */
const RelatedLegalPagesSection: React.FC = () => {
  return (
    <section className="bg-white pt-4 pb-16 lg:pb-24 print:hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-navy-50 mb-4">
          RELATED LEGAL DOCUMENTS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RELATED_LEGAL_PAGES_DATA.map((page) => {
            const isActive = page.status === 'active';
            const isAvailable = page.status === 'available' && page.href;

            if (isAvailable && page.href) {
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
                className={`p-6 rounded-[20px] transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-primary-50/40 border-2 border-primary shadow-soft'
                    : 'bg-white border border-navy-08 opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
                      <FileText className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    {isActive ? (
                      <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider">
                        You're here
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-navy/5 text-navy-50 text-[11px] font-bold uppercase tracking-wider">
                        Coming soon
                      </span>
                    )}
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
   MAIN TERMS & CONDITIONS PAGE EXPORT
============================================================================ */
interface TermsConditionsProps {
  onOpenQuoteModal?: (service?: string) => void;
}

export const TermsConditions: React.FC<TermsConditionsProps> = ({ onOpenQuoteModal }) => {
  const { hash } = useLocation();

  const handleOpenQuote = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: service }));
    }
  };

  /* Update Document Title & Meta Description on Route Mount */
  useEffect(() => {
    document.title = 'Terms & Conditions | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Read the WebXCode Terms & Conditions covering project proposals, milestone payments, intellectual property ownership, revisions, warranties, and global service agreements.'
      );
    }
  }, []);

  /* Handle Deep Hash Links on Mount/Change (e.g. /terms-and-conditions#payment-terms) */
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

  /* WebPage + Organization JSON-LD Schema */
  const termsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://webxcode.com/terms-and-conditions#webpage',
    url: 'https://webxcode.com/terms-and-conditions',
    name: 'Terms & Conditions | WebXCode',
    description:
      'These Terms & Conditions explain how WebXCode works with clients across web development, SEO, performance marketing, and AI solutions.',
    dateModified: '2026-10-04',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://webxcode.com/#organization',
      name: 'WebXCode',
      url: 'https://webxcode.com',
    },
  };

  return (
    <main className="flex-1 bg-white">
      {/* Print Stylesheet: hide header, footer, TOC, progress bar and floating buttons when printing */}
      <style>{`
        @media print {
          header, footer, nav[aria-label="Table of contents"], .fixed {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />

      {/* 1. Reading Progress Bar */}
      <ReadingProgressBar />

      {/* 2. Centered Compact Page Hero (navy) */}
      <TermsHeroSection />

      {/* 3. Key Terms at a Glance (white overlapping 5-step strip) */}
      <KeyTermsAtAGlanceSection />

      {/* 4 & 5. Sticky TOC + 20 Terms Sections with "In Plain English" Summary Boxes */}
      <MainTermsContentSection />

      {/* 6. Agree & Get Started Split Banner (light blue tint) */}
      <AgreeGetStartedBanner onOpenQuoteModal={handleOpenQuote} />

      {/* 7. Related Legal Pages (white, compact 3-card row) */}
      <RelatedLegalPagesSection />
    </main>
  );
};

export default TermsConditions;
