import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUp,
  ChevronRight,
  ChevronDown,
  Shield,
  Lock,
  Calendar,
  Clock,
  CheckCircle2,
  Database,
  ShieldOff,
  ShieldCheck,
  Sliders,
  Info,
  Sparkles,
  Cookie,
  BarChart3,
  Megaphone,
  Settings,
  Eye,
  Edit3,
  Trash2,
  RotateCcw,
  BellOff,
  Scale,
  Mail,
  Phone,
  MapPin,
  Printer,
  MessageSquare,
  FileText,
} from 'lucide-react';

/* ============================================================================
   POLICY CONTENT DATA ARRAY (single source of truth at top of file)
============================================================================ */

export interface PolicySectionItem {
  id: string;
  num: string;
  title: string;
  paragraphs?: string[];
  bullets?: { label?: string; text: string }[];
  infoCallout?: string;
  keyPointCallout?: string;
  tableData?: {
    headers: [string, string, string];
    rows: {
      purpose: string;
      infoUsed: string;
      legalBasis: string;
    }[];
  };
  cookieGrid?: {
    title: string;
    subtitle: string;
    desc: string;
    icon: 'essential' | 'analytics' | 'advertising' | 'preference';
  }[];
  rightsGrid?: {
    title: string;
    desc: string;
    icon: 'access' | 'correction' | 'deletion' | 'withdraw' | 'optout' | 'nominate';
  }[];
  regionNotes?: {
    region: string;
    text: string;
  }[];
  rightsFooterNote?: string;
  contactCards?: {
    privacyContact: {
      title: string;
      company: string;
      address: string;
      email: string;
      phone: string;
    };
    grievanceOfficer: {
      title: string;
      name: string;
      email: string;
      address: string;
      note: string;
    };
  };
}

export const POLICY_SECTIONS: PolicySectionItem[] = [
  {
    id: 'introduction',
    num: '01',
    title: 'Introduction',
    paragraphs: [
      'WebXCode ("WebXCode", "we", "us" or "our"), operated by [Legal Company Name], respects your privacy. This Privacy Policy explains how we collect, use, share and protect personal information when you visit [www.webxcode.com] (the "Website"), contact us, or use our services. By using our Website, you agree to the practices described in this policy.',
    ],
  },
  {
    id: 'information-we-collect',
    num: '02',
    title: 'Information We Collect',
    bullets: [
      {
        label: 'Information you give us:',
        text: 'name, email address, phone number, company name, project details, budget and timeline, and any information you share in forms, emails, calls, WhatsApp or chat.',
      },
      {
        label: 'Information collected automatically:',
        text: 'IP address, browser and device type, pages visited, time spent, referring website, and approximate location, collected through cookies and similar technologies.',
      },
      {
        label: 'Information from third parties:',
        text: 'information from advertising, analytics or scheduling partners, where permitted by law.',
      },
    ],
    infoCallout:
      'We do not knowingly collect sensitive personal data such as financial account details, health information or government ID numbers through our Website.',
  },
  {
    id: 'how-we-use',
    num: '03',
    title: 'How We Use Your Information',
    paragraphs: [
      'We process your personal information strictly for clear, legitimate business purposes as outlined in the table below:',
    ],
    tableData: {
      headers: ['Purpose', 'Information Used', 'Legal Basis'],
      rows: [
        {
          purpose: 'Respond to enquiries and quote requests',
          infoUsed: 'Contact details, project details',
          legalBasis: 'Consent / steps before a contract',
        },
        {
          purpose: 'Deliver and manage our services',
          infoUsed: 'Contact and project information',
          legalBasis: 'Performance of a contract',
        },
        {
          purpose: 'Improve our Website and user experience',
          infoUsed: 'Usage and device data',
          legalBasis: 'Legitimate interest',
        },
        {
          purpose: 'Send updates and marketing emails (only if you opt in)',
          infoUsed: 'Name, email',
          legalBasis: 'Consent',
        },
        {
          purpose: 'Measure and improve our advertising',
          infoUsed: 'Cookie and usage data',
          legalBasis: 'Consent',
        },
        {
          purpose: 'Prevent fraud, spam and misuse',
          infoUsed: 'IP address, form data',
          legalBasis: 'Legitimate interest',
        },
        {
          purpose: 'Comply with legal obligations',
          infoUsed: 'As required',
          legalBasis: 'Legal obligation',
        },
      ],
    },
  },
  {
    id: 'cookies',
    num: '04',
    title: 'Cookies & Tracking Technologies',
    paragraphs: [
      'We use cookies and similar technologies to keep the Website working, understand how visitors use it and measure our marketing.',
    ],
    cookieGrid: [
      {
        title: 'Essential',
        subtitle: 'Strictly Necessary',
        desc: 'Required for core site functionality, security, navigation and form submissions.',
        icon: 'essential',
      },
      {
        title: 'Analytics',
        subtitle: 'e.g. Google Analytics',
        desc: 'Helps us understand visitor traffic, popular pages and overall site performance.',
        icon: 'analytics',
      },
      {
        title: 'Advertising',
        subtitle: 'e.g. Google Ads',
        desc: 'Measures campaign effectiveness and delivers relevant business communications.',
        icon: 'advertising',
      },
      {
        title: 'Preference',
        subtitle: 'Functional Memory',
        desc: 'Remembers your settings, region preferences and interactive choices across sessions.',
        icon: 'preference',
      },
    ],
    infoCallout:
      'You can control or delete cookies through your browser settings; blocking some cookies may affect how the Website works.',
  },
  {
    id: 'sharing',
    num: '05',
    title: 'How We Share Your Information',
    keyPointCallout: 'We do not sell, rent or trade your personal information.',
    paragraphs: [
      'We share information only with: service providers who help us run our business (hosting, email, analytics, CRM, scheduling, payment), under confidentiality obligations; professional advisers; authorities when required by law or to protect our rights; and a successor in case of a merger, acquisition or sale of assets.',
    ],
  },
  {
    id: 'ai-tools',
    num: '06',
    title: 'AI Tools & Chatbots',
    paragraphs: [
      'Our Website may use an AI-powered chat assistant. Messages you send to it may be processed by trusted third-party AI providers to generate responses. Please avoid sharing sensitive personal information in chat. We do not use your chat messages to train our own AI models, and we choose providers with appropriate data protection commitments.',
    ],
  },
  {
    id: 'retention',
    num: '07',
    title: 'Data Retention',
    paragraphs: [
      'We keep personal information only for as long as needed for the purposes in this policy — for example, enquiry data for up to [24] months after our last interaction, and client project records for as long as required for contractual, tax and legal purposes. After that, we securely delete or anonymize it.',
    ],
  },
  {
    id: 'security',
    num: '08',
    title: 'Data Security',
    paragraphs: [
      'We use reasonable technical and organizational safeguards, including encrypted connections (HTTPS), access controls and trusted service providers. However, no method of transmission or storage over the internet is 100% secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    id: 'international-transfers',
    num: '09',
    title: 'International Data Transfers',
    paragraphs: [
      'We work with clients and service providers in India, the United States and other countries, so your information may be processed outside your country. Where required, we take steps to make sure it remains protected in line with this policy and applicable law.',
    ],
  },
  {
    id: 'your-rights',
    num: '10',
    title: 'Your Privacy Rights',
    paragraphs: [
      'Depending on your location, you have the following rights regarding the personal information we hold about you:',
    ],
    rightsGrid: [
      {
        title: 'Right to Access',
        desc: 'Request a clear copy of the personal data we hold about you.',
        icon: 'access',
      },
      {
        title: 'Right to Correction',
        desc: 'Ask us to update or fix inaccurate or incomplete information.',
        icon: 'correction',
      },
      {
        title: 'Right to Deletion',
        desc: 'Request erasure of your personal data when no longer needed.',
        icon: 'deletion',
      },
      {
        title: 'Right to Withdraw Consent',
        desc: 'Withdraw previously given consent for processing at any time.',
        icon: 'withdraw',
      },
      {
        title: 'Right to Opt-Out of Marketing',
        desc: 'Unsubscribe from promotional communications with one click.',
        icon: 'optout',
      },
      {
        title: 'Right to Nominate / Grievance Redressal',
        desc: 'Nominate a representative or escalate privacy concerns directly.',
        icon: 'nominate',
      },
    ],
    regionNotes: [
      {
        region: 'India:',
        text: 'rights under the Digital Personal Data Protection Act, 2023, including the right to grievance redressal and to nominate a person to exercise your rights.',
      },
      {
        region: 'United States (including California):',
        text: 'where applicable, the right to know, delete and correct personal information and to opt out of the "sale" or "sharing" of personal information. We do not sell personal information.',
      },
      {
        region: 'EU / UK visitors:',
        text: 'where applicable, rights under the GDPR / UK GDPR, including the right to object, restrict processing and data portability, and to complain to your local data protection authority.',
      },
    ],
    rightsFooterNote:
      'To exercise any right, email [privacy@webxcode.com]. We may need to verify your identity and will respond within the time required by applicable law.',
  },
  {
    id: 'children',
    num: '11',
    title: "Children's Privacy",
    paragraphs: [
      'Our Website and services are intended for businesses and adults. We do not knowingly collect personal information from anyone under 18. If you believe a child has shared personal information with us, contact us and we will delete it.',
    ],
  },
  {
    id: 'third-party-links',
    num: '12',
    title: 'Third-Party Links',
    paragraphs: [
      'Our Website may contain links to other websites. We are not responsible for their privacy practices, and we encourage you to read their privacy policies.',
    ],
  },
  {
    id: 'changes',
    num: '13',
    title: 'Changes to This Policy',
    paragraphs: [
      'We may update this policy from time to time. The "Last updated" date at the top shows when it was last revised. For significant changes, we may also notify you by email or a notice on our Website.',
    ],
  },
  {
    id: 'contact',
    num: '14',
    title: 'Contact Us & Grievance Officer',
    paragraphs: [
      'If you have any questions, requests or complaints about this Privacy Policy or our data practices, please reach out to our Privacy Team or Grievance Officer:',
    ],
    contactCards: {
      privacyContact: {
        title: 'Privacy Contact',
        company: '[Legal Company Name]',
        address: '[Full Registered Address]',
        email: '[privacy@webxcode.com]',
        phone: '[+91 XXXXX XXXXX]',
      },
      grievanceOfficer: {
        title: 'Grievance Officer (India)',
        name: '[Name]',
        email: '[grievance@webxcode.com]',
        address: '[Address]',
        note: 'We will acknowledge your complaint and try to resolve it within the time required by law.',
      },
    },
  },
];

/* Related Legal Pages Data Array (easy to update when Terms & Refund pages are added) */
export interface RelatedLegalPageItem {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'available' | 'coming-soon';
  href?: string;
}

export const RELATED_LEGAL_PAGES: RelatedLegalPageItem[] = [
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'How we collect, use, store and protect your personal information.',
    status: 'active',
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
    status: 'available',
    href: '/refund-policy',
  },
];

/* ============================================================================
   SHARED UI HELPERS (self-contained inside PrivacyPolicy.tsx)
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
   2. PAGE HERO (navy, compact — left content + right shield with lock illustration)
============================================================================ */
const PrivacyHeroSection: React.FC = () => {
  return (
    <section className="relative bg-navy text-white pt-10 pb-24 lg:pt-16 lg:pb-28 overflow-hidden">
      {/* Soft Blue Glows & Faint Grid Texture */}
      <div className="absolute -top-24 -left-24 w-[480px] h-[480px] blue-glow pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-[520px] h-[520px] blue-glow-strong pointer-events-none" />
      <div className="absolute inset-0 hero-grid-bg opacity-60 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Content (7 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Breadcrumb: Home › Privacy Policy */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white/65 print:hidden"
            >
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-primary font-semibold" aria-current="page">
                Privacy Policy
              </span>
            </nav>

            <div>
              <SectionLabel dark>LEGAL</SectionLabel>
            </div>

            {/* H1 */}
            <h1 className="text-[36px] sm:text-[48px] lg:text-[54px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
              Privacy <span className="text-primary">Policy</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-[16px] sm:text-[18px] text-white/75 leading-[1.7] max-w-2xl">
              Your privacy matters to us. This policy explains what information we collect, how we
              use it and the choices you have.
            </p>

            {/* Meta Row with Small Icons */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-2 text-[13px] sm:text-[14px] font-medium text-white/80">
              <div className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary shrink-0" />
                <span>Last updated: [DD Month YYYY]</span>
              </div>
              <span className="hidden sm:inline text-white/25">·</span>
              <div className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Effective date: [DD Month YYYY]</span>
              </div>
              <span className="hidden sm:inline text-white/25">·</span>
              <div className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>~10 min read</span>
              </div>
            </div>
          </motion.div>

          {/* Right Shield with Lock Illustration + Orbit Rings + 3 Floating Glass Chips (5 columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5 flex items-center justify-center print:hidden"
          >
            <div className="relative w-[280px] h-[260px] sm:w-[340px] sm:h-[300px] flex items-center justify-center">
              {/* Faint Orbit Rings */}
              <div className="w-60 h-60 sm:w-68 sm:h-68 rounded-full border border-white/10 absolute" />
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-primary/35 border-dashed absolute" />

              {/* Center Glowing Shield with Lock */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[28px] bg-primary/15 border-2 border-primary shadow-[0_0_50px_rgba(5,113,194,0.55)] backdrop-blur-md flex items-center justify-center">
                <Shield className="w-16 h-16 sm:w-20 sm:h-20 text-primary" strokeWidth={1.5} />
                <div className="absolute inset-0 flex items-center justify-center pt-1">
                  <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2} />
                </div>
              </div>

              {/* Floating Glass Chip 1: "Secure" */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-2 left-2 sm:left-4 px-3.5 py-2 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-lg inline-flex items-center gap-2 text-[12px] font-bold text-white"
              >
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Secure</span>
              </motion.div>

              {/* Floating Glass Chip 2: "Transparent" */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute top-6 right-0 sm:right-2 px-3.5 py-2 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-lg inline-flex items-center gap-2 text-[12px] font-bold text-white"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Transparent</span>
              </motion.div>

              {/* Floating Glass Chip 3: "You're in Control" */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-lg inline-flex items-center gap-2 text-[12px] font-bold text-white whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>You're in Control</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   3. PRIVACY AT A GLANCE (white, overlapping hero bottom by ~50px, 4 tiles)
============================================================================ */
const PrivacyAtAGlanceSection: React.FC = () => {
  const summaryTiles = [
    {
      icon: Database,
      title: 'We collect only what we need',
      desc: 'to respond to you and deliver our services.',
    },
    {
      icon: ShieldOff,
      title: 'We never sell your data',
      desc: 'not to anyone, ever.',
    },
    {
      icon: ShieldCheck,
      title: 'Your data is protected',
      desc: 'with industry-standard security.',
    },
    {
      icon: Sliders,
      title: "You're in control",
      desc: 'access, correct or delete your data anytime.',
    },
  ];

  return (
    <section className="relative z-20 bg-white pb-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 -mt-12 sm:-mt-14">
        <div className="bg-white rounded-[24px] border border-navy-08 shadow-xl p-6 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <SectionLabel>THE SHORT VERSION</SectionLabel>
            <span className="text-[12px] font-semibold text-navy-50">
              Privacy at a Glance
            </span>
          </div>

          {/* 4 Summary Tiles in a Row (2x2 on mobile/tablet, 4 cols on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {summaryTiles.map((tile) => {
              const IconComp = tile.icon;
              return (
                <div
                  key={tile.title}
                  className="p-5 rounded-[20px] bg-white border border-navy-08 hover:border-primary-100 hover:bg-primary-50/40 transition-colors flex flex-col justify-between"
                >
                  <div className="w-11 h-11 rounded-full bg-primary-50 text-primary flex items-center justify-center mb-4 shrink-0">
                    <IconComp className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-navy leading-snug mb-1">
                      {tile.title}
                    </h3>
                    <p className="text-[14px] text-navy-70 leading-relaxed">{tile.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 pt-4 border-t border-navy-08 text-[13px] text-navy-50 text-center sm:text-left">
            This summary is for convenience. Please read the full policy below.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   4 & 5. MAIN POLICY — STICKY TOC + CONTENT (white)
============================================================================ */
const MainPolicySection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(POLICY_SECTIONS[0].id);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Scroll-Spy using IntersectionObserver / scroll position
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 180;
      let currentSectionId = POLICY_SECTIONS[0].id;

      for (const section of POLICY_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSectionId = section.id;
          }
        }
      }
      setActiveId(currentSectionId);
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
      window.history.replaceState(null, '', `/privacy-policy#${id}`);
    }
  };

  const renderCookieIcon = (type: 'essential' | 'analytics' | 'advertising' | 'preference') => {
    switch (type) {
      case 'essential':
        return <Cookie className="w-5 h-5" strokeWidth={1.75} />;
      case 'analytics':
        return <BarChart3 className="w-5 h-5" strokeWidth={1.75} />;
      case 'advertising':
        return <Megaphone className="w-5 h-5" strokeWidth={1.75} />;
      case 'preference':
        return <Settings className="w-5 h-5" strokeWidth={1.75} />;
    }
  };

  const renderRightIcon = (
    type: 'access' | 'correction' | 'deletion' | 'withdraw' | 'optout' | 'nominate'
  ) => {
    switch (type) {
      case 'access':
        return <Eye className="w-5 h-5" strokeWidth={1.75} />;
      case 'correction':
        return <Edit3 className="w-5 h-5" strokeWidth={1.75} />;
      case 'deletion':
        return <Trash2 className="w-5 h-5" strokeWidth={1.75} />;
      case 'withdraw':
        return <RotateCcw className="w-5 h-5" strokeWidth={1.75} />;
      case 'optout':
        return <BellOff className="w-5 h-5" strokeWidth={1.75} />;
      case 'nominate':
        return <Scale className="w-5 h-5" strokeWidth={1.75} />;
    }
  };

  const activeSectionObj =
    POLICY_SECTIONS.find((s) => s.id === activeId) || POLICY_SECTIONS[0];

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
              {POLICY_SECTIONS.map((sec) => {
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
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-28 print:hidden">
            <div className="bg-white rounded-[20px] border border-navy-08 shadow-soft p-5">
              <div className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-navy mb-3.5 px-2">
                On this page
              </div>

              <nav aria-label="Table of contents" className="space-y-1">
                {POLICY_SECTIONS.map((sec) => {
                  const isActive = activeId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left px-3 py-2 rounded-r-xl text-[13px] leading-snug flex items-center gap-2.5 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-primary ${
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

              {/* Utility Actions Below TOC: Print / Save as PDF & Back to top */}
              <div className="mt-5 pt-4 border-t border-navy-08 space-y-2">
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

          {/* Right Column: Policy Reading Content (max-w-[720px] reading measure) */}
          <div className="flex-1 min-w-0 max-w-[760px]">
            <div className="divide-y divide-navy-08">
              {POLICY_SECTIONS.map((sec, idx) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className={`scroll-mt-28 ${idx === 0 ? 'pb-10' : 'py-10'}`}
                >
                  {/* Section Heading: Small Blue Number + 28px Weight 800 H2 */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-[14px] font-extrabold text-primary tracking-wider uppercase px-2.5 py-1 rounded-lg bg-primary-50 tabular-nums shrink-0">
                      {sec.num}
                    </span>
                    <h2 className="text-[24px] sm:text-[28px] font-extrabold text-navy leading-snug tracking-[-0.015em]">
                      {sec.title}
                    </h2>
                  </div>

                  {/* Key-Point Callout (Navy Box with White Text and Blue Icon) */}
                  {sec.keyPointCallout && (
                    <div className="my-5 p-5 sm:p-6 rounded-[20px] bg-navy text-white flex items-start gap-4 shadow-md">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
                          KEY COMMITMENT
                        </div>
                        <p className="text-[16px] sm:text-[17px] font-bold text-white leading-relaxed">
                          {sec.keyPointCallout}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Body Paragraphs (17px, line-height 1.8, navy at 80% opacity, 18px spacing) */}
                  {sec.paragraphs &&
                    sec.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-[17px] leading-[1.8] text-navy/80 mb-[18px] last:mb-0"
                      >
                        {p}
                      </p>
                    ))}

                  {/* Bullet Lists with Small Blue Dots */}
                  {sec.bullets && (
                    <ul className="space-y-3.5 my-4">
                      {sec.bullets.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-3 text-[17px] leading-[1.8] text-navy/80"
                        >
                          <span className="w-2 h-2 rounded-full bg-primary mt-3 shrink-0" />
                          <span>
                            {b.label && (
                              <strong className="font-bold text-navy">{b.label} </strong>
                            )}
                            {b.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Data Table (Section 03 — Navy Header Row, White Rows, Light Blue Hover; Stacked Cards on Mobile) */}
                  {sec.tableData && (
                    <div className="my-6">
                      {/* Desktop Table */}
                      <div className="hidden sm:block rounded-[20px] overflow-hidden border border-navy-15 shadow-xs">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-navy text-white text-[13px] font-bold uppercase tracking-wider">
                              {sec.tableData.headers.map((header) => (
                                <th key={header} scope="col" className="py-4 px-5">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-navy-08 text-[15px]">
                            {sec.tableData.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className="bg-white hover:bg-primary-50/60 transition-colors"
                              >
                                <td className="py-4 px-5 font-bold text-navy">
                                  {row.purpose}
                                </td>
                                <td className="py-4 px-5 text-navy/80">{row.infoUsed}</td>
                                <td className="py-4 px-5">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary text-[12px] font-bold">
                                    {row.legalBasis}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Stacked Cards */}
                      <div className="sm:hidden space-y-3">
                        {sec.tableData.rows.map((row, rIdx) => (
                          <div
                            key={rIdx}
                            className="p-4 rounded-[16px] bg-white border border-navy-15 shadow-xs space-y-2"
                          >
                            <div className="text-[15px] font-bold text-navy">{row.purpose}</div>
                            <div className="text-[13px] text-navy/80">
                              <span className="font-semibold text-navy">Information Used: </span>
                              {row.infoUsed}
                            </div>
                            <div className="pt-1">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary-50 text-primary text-[11px] font-bold">
                                Legal Basis: {row.legalBasis}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cookie Types 2x2 Grid (Section 04) */}
                  {sec.cookieGrid && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                      {sec.cookieGrid.map((ck) => (
                        <div
                          key={ck.title}
                          className="p-5 rounded-[20px] bg-white border border-navy-08 shadow-soft hover:border-primary-100 transition-colors"
                        >
                          <div className="flex items-center gap-3 mb-2.5">
                            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                              {renderCookieIcon(ck.icon)}
                            </div>
                            <div>
                              <h3 className="text-[19px] font-bold text-navy leading-tight">
                                {ck.title}
                              </h3>
                              <span className="text-[12px] font-semibold text-primary">
                                {ck.subtitle}
                              </span>
                            </div>
                          </div>
                          <p className="text-[14px] text-navy/80 leading-relaxed">{ck.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Info Callout (Light Blue Tint Box, Blue Left Border, Info Icon) */}
                  {sec.infoCallout && (
                    <div className="mt-5 p-5 rounded-r-[18px] rounded-l-xs bg-primary-50 border-l-4 border-primary flex items-start gap-3.5">
                      <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-[15px] sm:text-[16px] font-medium text-navy leading-relaxed">
                        {sec.infoCallout}
                      </p>
                    </div>
                  )}

                  {/* Privacy Rights 3x2 Grid + Region Notes (Section 10) */}
                  {sec.rightsGrid && (
                    <div className="my-6 space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sec.rightsGrid.map((right) => (
                          <div
                            key={right.title}
                            className="p-5 rounded-[20px] bg-white border border-navy-08 shadow-soft hover:border-primary-100 transition-colors flex flex-col justify-between"
                          >
                            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center mb-3.5">
                              {renderRightIcon(right.icon)}
                            </div>
                            <div>
                              <h3 className="text-[17px] font-bold text-navy mb-1 leading-snug">
                                {right.title}
                              </h3>
                              <p className="text-[13px] text-navy/80 leading-relaxed">
                                {right.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {sec.regionNotes && (
                        <div className="p-5 sm:p-6 rounded-[20px] bg-primary-50/60 border border-primary-100 space-y-3">
                          {sec.regionNotes.map((rn) => (
                            <div
                              key={rn.region}
                              className="flex items-start gap-2.5 text-[15px] leading-[1.7] text-navy/80"
                            >
                              <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                              <span>
                                <strong className="font-bold text-navy italic">
                                  {rn.region}{' '}
                                </strong>
                                {rn.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {sec.rightsFooterNote && (
                        <p className="text-[16px] leading-[1.8] text-navy/80 font-medium">
                          {sec.rightsFooterNote}
                        </p>
                      )}
                    </div>
                  )}

                  {/* 2-Card Contact & Grievance Officer Layout (Section 14) */}
                  {sec.contactCards && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      {/* White Card — Privacy Contact */}
                      <div className="p-6 sm:p-7 rounded-[20px] bg-white border border-navy-15 shadow-soft flex flex-col justify-between">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-bold uppercase tracking-wider mb-3">
                            <span>DATA PROTECTION DESK</span>
                          </div>
                          <h3 className="text-[20px] font-extrabold text-navy mb-4">
                            {sec.contactCards.privacyContact.title}
                          </h3>
                          <div className="space-y-3 text-[15px] text-navy/80">
                            <div>
                              <strong className="font-bold text-navy">Company: </strong>
                              <span>{sec.contactCards.privacyContact.company}</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                              <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                              <span>{sec.contactCards.privacyContact.address}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <Mail className="w-4 h-4 text-primary shrink-0" />
                              <span>
                                Email:{' '}
                                <a
                                  href="mailto:privacy@webxcode.com"
                                  className="font-bold text-primary hover:underline"
                                >
                                  {sec.contactCards.privacyContact.email}
                                </a>
                              </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <Phone className="w-4 h-4 text-primary shrink-0" />
                              <span>Phone: {sec.contactCards.privacyContact.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Navy Card — Grievance Officer (India) */}
                      <div className="relative p-6 sm:p-7 rounded-[20px] bg-navy text-white shadow-xl overflow-hidden flex flex-col justify-between">
                        <div className="absolute -top-12 -right-12 w-44 h-44 blue-glow-strong pointer-events-none" />
                        <div className="relative z-10">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-white text-[11px] font-bold uppercase tracking-wider mb-3">
                            <span>DPDP ACT COMPLIANCE</span>
                          </div>
                          <h3 className="text-[20px] font-extrabold text-white mb-4">
                            {sec.contactCards.grievanceOfficer.title}
                          </h3>
                          <div className="space-y-2.5 text-[14px] text-white/80 mb-4">
                            <div>
                              <strong className="font-bold text-white">Name: </strong>
                              <span>{sec.contactCards.grievanceOfficer.name}</span>
                            </div>
                            <div>
                              <strong className="font-bold text-white">Email: </strong>
                              <a
                                href="mailto:grievance@webxcode.com"
                                className="font-bold text-primary hover:underline"
                              >
                                {sec.contactCards.grievanceOfficer.email}
                              </a>
                            </div>
                            <div>
                              <strong className="font-bold text-white">Address: </strong>
                              <span>{sec.contactCards.grievanceOfficer.address}</span>
                            </div>
                          </div>
                          <p className="text-[13px] text-white/70 leading-relaxed mb-6">
                            “{sec.contactCards.grievanceOfficer.note}”
                          </p>
                        </div>

                        <div className="relative z-10">
                          <Link to="/contact" className="inline-block">
                            <Button size="sm">Contact Us</Button>
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
   6. STILL HAVE QUESTIONS? (light blue tint — horizontal rounded banner)
============================================================================ */
const StillHaveQuestionsBanner: React.FC = () => {
  return (
    <section className="bg-white py-8 lg:py-12 print:hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="rounded-[24px] bg-primary-50 border border-primary-100 p-7 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
              <MessageSquare className="w-7 h-7" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-[26px] sm:text-[32px] font-extrabold text-navy leading-tight">
                Questions About <span className="text-primary">Your Privacy?</span>
              </h2>
              <p className="text-[16px] text-navy-70 mt-1">
                Our team is happy to help.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link to="/contact">
              <Button size="lg">Contact Us</Button>
            </Link>
            <Button
              variant="outline-light"
              size="lg"
              showArrow={false}
              iconLeft={<Mail className="w-4 h-4 text-primary" />}
              href="mailto:privacy@webxcode.com"
            >
              Email Privacy Team
            </Button>
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
          {RELATED_LEGAL_PAGES.map((page) => {
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
   MAIN PRIVACY POLICY PAGE EXPORT
============================================================================ */
export const PrivacyPolicy: React.FC = () => {
  const { hash } = useLocation();

  /* Update Document Title & Meta Description on Route Mount */
  useEffect(() => {
    document.title = 'Privacy Policy | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Read the WebXCode Privacy Policy to learn how we collect, use, share, and protect your personal information across our website, AI tools, and global digital services.'
      );
    }
  }, []);

  /* Handle Deep Hash Links on Mount/Change (e.g. /privacy-policy#cookies) */
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
  const privacyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://webxcode.com/privacy-policy#webpage',
    url: 'https://webxcode.com/privacy-policy',
    name: 'Privacy Policy | WebXCode',
    description:
      'Your privacy matters to us. This policy explains what information WebXCode collects, how we use it, and the choices and rights you have.',
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
      {/* Print Stylesheet: hide global header, footer, WhatsApp button, TOC, and progress bar when printing */}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />

      {/* 1. Reading Progress Bar */}
      <ReadingProgressBar />

      {/* 2. Compact Page Hero (navy) */}
      <PrivacyHeroSection />

      {/* 3. Privacy at a Glance (white overlapping summary panel) */}
      <PrivacyAtAGlanceSection />

      {/* 4 & 5. Sticky Table of Contents + 14 Policy Sections */}
      <MainPolicySection />

      {/* 6. Still Have Questions? Banner (light blue tint) */}
      <StillHaveQuestionsBanner />

      {/* 7. Related Legal Pages (white, compact 3-card row) */}
      <RelatedLegalPagesSection />
    </main>
  );
};

export default PrivacyPolicy;
