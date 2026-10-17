'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Lock,
  Shield,
  ShieldCheck,
  Landmark,
  CreditCard,
  TrendingUp,
  Calculator,
  FileCheck,
  UserCheck,
  Bot,
  Search,
  BarChart3,
  Smartphone,
  Server,
  KeyRound,
  Users,
  Scale,
  Plus,
  Minus,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Briefcase,
  Layers,
} from 'lucide-react';
import { industries, IndustryIcon } from '@/app/industries/_components/Industries';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT FINANCE & FINTECH ITEM FROM ../Industries
============================================================================ */
const financeIndustry =
  industries.find((item) => item.slug === 'finance-fintech') || industries[1];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS
============================================================================ */

/* Section 2: Who We Serve — 7 Segment Ribbon Items */
const FINANCE_SEGMENTS = [
  {
    id: 'fintech-startups',
    title: 'Fintech Startups',
    shortDesc: 'MVPs, apps and marketing websites',
    detail:
      'High-trust product launches, investor-ready marketing websites, and scalable web apps built for rapid user acquisition.',
    chips: ['Fintech Web Apps', 'Growth SEO & AEO'],
    icon: Smartphone,
  },
  {
    id: 'banks-nbfcs',
    title: 'Banks & NBFCs',
    shortDesc: 'Product pages, loan journeys, customer portals',
    detail:
      'Modern digital branches, interactive EMI & eligibility calculators, and self-serve borrower portals engineered for scale.',
    chips: ['Borrower Portals', 'Loan Funnel UX'],
    icon: Landmark,
  },
  {
    id: 'lending-credit',
    title: 'Lending & Credit',
    shortDesc: 'Loan eligibility, application and KYC flows',
    detail:
      'Low-dropoff multi-step loan applications with instant eKYC, bureau checks, and automated CRM lead routing.',
    chips: ['3-Step eKYC Flows', 'Lead Scoring'],
    icon: CreditCard,
  },
  {
    id: 'payments',
    title: 'Payments',
    shortDesc: 'Merchant onboarding sites and dashboards',
    detail:
      'Developer-friendly payment gateway websites, interactive API docs, and real-time settlement telemetry dashboards.',
    chips: ['Merchant Dashboards', 'API Docs'],
    icon: Layers,
  },
  {
    id: 'wealth-advisors',
    title: 'Wealth & Investment Advisors',
    shortDesc: 'Trust-led websites, SIP and goal calculators',
    detail:
      'E-E-A-T compliant advisory platforms with interactive SIP, retirement, and portfolio goal planners that book high-HNI calls.',
    chips: ['SIP Calculators', 'YMYL SEO'],
    icon: TrendingUp,
  },
  {
    id: 'insurance',
    title: 'Insurance',
    shortDesc: 'Quote comparison and policy purchase journeys',
    detail:
      'Guided premium estimators, side-by-side policy comparison tables, and 24/7 WhatsApp AI claims and renewal assistants.',
    chips: ['Quote Engines', 'AI Policy Bot'],
    icon: ShieldCheck,
  },
  {
    id: 'ca-accounting',
    title: 'CA & Accounting Firms',
    shortDesc: 'Professional websites, local SEO, client portals',
    detail:
      'Authoritative corporate websites, secure document upload portals, and Local SEO that captures high-value business retainers.',
    chips: ['Client Portals', 'Local SEO'],
    icon: Briefcase,
  },
];

/* Section 3: Website Trust Score — 8 Interactive Checklist Items */
const TRUST_CHECKLIST_ITEMS = [
  { id: 'ssl', label: 'HTTPS / SSL on every page' },
  { id: 'regulatory', label: 'Clear regulatory and registration details displayed' },
  { id: 'team-office', label: 'Real team, office address and contact details' },
  { id: 'transparent-fees', label: 'Transparent fees, rates and terms' },
  { id: 'testimonials', label: 'Client testimonials and reviews' },
  { id: 'speed', label: 'Page loads in under 3 seconds' },
  { id: 'privacy', label: 'Privacy policy and data security information' },
  { id: 'mobile', label: 'Works perfectly on mobile' },
];

/* Section 4: Services for Finance & Fintech (7 items — no Social Media Marketing) */
const FINANCE_SERVICES = [
  {
    num: '01',
    id: 'fintech-web-app',
    title: 'Fintech Website & App Development',
    desc: 'Fast, secure marketing sites and web apps architected to communicate instant institutional credibility.',
    bullets: [
      'Sub-second Next.js frontends with 95+ Core Web Vitals',
      'Clear product positioning, rate tables & regulatory disclosures',
      'WCAG AA accessible UI systems for every age group',
    ],
    visualLabel: 'High-Trust Fintech Web Platform',
    visualMetric: '0.9s Page Load · 99 Security Score',
    icon: Smartphone,
  },
  {
    num: '02',
    id: 'customer-portals',
    title: 'Customer Portals & Dashboards',
    desc: 'Account views, statements, and secure document uploads with role-based access control.',
    bullets: [
      'Real-time loan, portfolio, or policy status tracking',
      'Encrypted PDF statement downloads & tax certificates',
      'OTP / 2FA session security & audit logs',
    ],
    visualLabel: 'Self-Serve Client Vault & Dashboard',
    visualMetric: '60% Fewer Routine Support Calls',
    icon: Server,
  },
  {
    num: '03',
    id: 'onboarding-kyc',
    title: 'Digital Onboarding & KYC Flows',
    desc: 'Smooth multi-step applications with eKYC integrations that cut customer drop-offs.',
    bullets: [
      'Auto-saving progress bars for mobile & desktop applicants',
      'DigiLocker, PAN, Aadhaar & video KYC API readiness',
      'Instant validation to prevent form submission errors',
    ],
    visualLabel: 'Frictionless 3-Step eKYC Journey',
    visualMetric: '−40% Drop-Off During Verification',
    icon: UserCheck,
  },
  {
    num: '04',
    id: 'calculators-tools',
    title: 'Financial Calculators & Lead Tools',
    desc: 'EMI, SIP, loan eligibility and premium calculators that turn anonymous visitors into warm leads.',
    bullets: [
      'Interactive sliders with real-time amortization charts',
      'Optional email/WhatsApp report download for lead capture',
      'Custom math formulas tailored to your exact credit products',
    ],
    visualLabel: 'Interactive EMI & SIP Lead Engine',
    visualMetric: '3.2× Higher Visitor Engagement',
    icon: Calculator,
  },
  {
    num: '05',
    id: 'seo-finance-ymyl',
    title: 'SEO for Finance (YMYL)',
    desc: 'E-E-A-T focused content, expert authorship and AEO/GEO visibility across Google and AI search.',
    bullets: [
      'Verified author bios, reviewer citations & FinancialProduct schema',
      'Programmatic city, loan-type & calculator landing pages',
      'Answer Engine Optimization (AEO) for ChatGPT & Perplexity citations',
    ],
    visualLabel: 'YMYL Authority & AI Search Graph',
    visualMetric: '+175% High-Intent Organic Leads',
    icon: Search,
  },
  {
    num: '06',
    id: 'google-ads-finance',
    title: 'Google Ads for Financial Services',
    desc: 'Policy-compliant search campaigns for high-intent borrowers, investors, and policyholders.',
    bullets: [
      'Ad-policy compliant copy & transparent fee disclosures',
      'Dedicated high-trust landing pages with calculator widgets',
      'CRM offline conversion tracking for approved applications',
    ],
    visualLabel: 'Compliant High-Intent Paid Search',
    visualMetric: '−34% Cost Per Approved Application',
    icon: BarChart3,
  },
  {
    num: '07',
    id: 'ai-support-chatbots',
    title: 'AI Chatbots for Customer Support',
    desc: 'Answers FAQs, tracks applications and routes complex queries to human advisors 24/7.',
    bullets: [
      'Strict guardrails—answers only from your verified policy docs',
      'Instant eligibility pre-checks on web and WhatsApp',
      'Seamless handoff to relationship managers for high-value leads',
    ],
    visualLabel: '24/7 Guardrailed Financial AI Concierge',
    visualMetric: 'Under 10s Response Time · 24/7',
    icon: Bot,
  },
];

/* Section 5: Calculator Defaults */
const CALCULATOR_DEFAULTS = {
  minAmount: 50000,
  maxAmount: 10000000,
  defaultAmount: 1000000,
  minRate: 5,
  maxRate: 24,
  defaultRate: 10.5,
  minTenure: 1,
  maxTenure: 30,
  defaultTenure: 5,
};

/* Section 6: Security & Compliance — 6 Layered Stack Items */
const SECURITY_LAYERS = [
  {
    num: '01',
    title: 'Secure Hosting & SSL',
    desc: 'HTTPS everywhere, hardened servers, DDoS protection',
    icon: Server,
  },
  {
    num: '02',
    title: 'Secure Authentication',
    desc: '2FA/OTP login and session protection',
    icon: KeyRound,
  },
  {
    num: '03',
    title: 'Data Encryption',
    desc: 'Encryption in transit and at rest',
    icon: Lock,
  },
  {
    num: '04',
    title: 'Role-Based Access',
    desc: 'The right access for the right people',
    icon: Users,
  },
  {
    num: '05',
    title: 'Trusted Payment Gateways',
    desc: 'Card and UPI payments through PCI DSS–compliant providers',
    icon: CreditCard,
  },
  {
    num: '06',
    title: 'Privacy-Aware by Design',
    desc: "Built with India's DPDP Act and applicable financial-sector guidelines in mind",
    icon: Scale,
  },
];

/* Section 7: Customer Journey — 6 Subway-Line Stations */
const JOURNEY_STATIONS = [
  {
    step: '01',
    station: 'Discover',
    slowsDown: 'Generic pages that rank poorly for financial queries',
    howWeFix: 'E-E-A-T SEO, AEO schema & high-intent product pages',
  },
  {
    step: '02',
    station: 'Compare',
    slowsDown: 'Hidden fees, confusing terms and cluttered tables',
    howWeFix: 'Transparent side-by-side rate & eligibility matrices',
  },
  {
    step: '03',
    station: 'Calculate',
    slowsDown: 'Static PDF rate sheets with no interactive tools',
    howWeFix: 'Instant EMI, SIP & eligibility calculators on page',
  },
  {
    step: '04',
    station: 'Apply',
    slowsDown: 'Long, confusing forms',
    howWeFix: 'Short multi-step forms with progress bar and autosave',
  },
  {
    step: '05',
    station: 'Verify (KYC)',
    slowsDown: 'Manual document uploads and slow status updates',
    howWeFix: 'Guided eKYC / DigiLocker integration & instant checks',
  },
  {
    step: '06',
    station: 'Engage',
    slowsDown: 'Endless call-center wait times for simple queries',
    howWeFix: 'Self-serve customer portal & 24/7 WhatsApp AI support',
  },
];

/* Section 8: Case Study — Big Statement Data */
const FINTECH_CASE_STUDY = {
  clientName: 'CredVantage NBFC (Placeholder)',
  statementBefore: '12 min',
  statementAfter: '4 min',
  statementLabel: 'average loan application time (placeholder)',
  challenge:
    'Borrowers were abandoning a 28-field single-page application on mobile devices, driving up acquisition costs and overloading call-center agents.',
  solution:
    'We redesigned the digital lending portal with an interactive EMI calculator, a 4-step auto-saving application flow, and streamlined eKYC verification.',
  result:
    'Application completion time dropped from 12 minutes to 4 minutes, lifting completed loan disbursal leads by 65% within 90 days.',
  kpis: [
    { value: '+65%', label: 'Completed Applications (Placeholder)' },
    { value: '−40%', label: 'Drop-off at KYC (Placeholder)' },
    { value: '4.8★', label: 'App & Portal Rating (Placeholder)' },
  ],
};

/* Section 9: Payment & Finance Integrations (2 Marquee Rows) */
const INTEGRATIONS_ROW_1 = [
  { name: 'Razorpay', tag: 'Payments & UPI' },
  { name: 'Stripe', tag: 'Global Cards & Billing' },
  { name: 'PayU', tag: 'Enterprise Payment Gateway' },
  { name: 'Cashfree', tag: 'Payouts & Collections' },
  { name: 'PhonePe PG', tag: 'UPI Intent Checkout' },
  { name: 'PayPal', tag: 'Cross-Border Payments' },
];

const INTEGRATIONS_ROW_2 = [
  { name: 'Account Aggregator / Setu', tag: 'Financial Data Consent' },
  { name: 'DigiLocker', tag: 'Verified Document Pull' },
  { name: 'eKYC Providers', tag: 'Identity Verification' },
  { name: 'HubSpot', tag: 'CRM & Lead Routing' },
  { name: 'Salesforce', tag: 'Financial Services Cloud' },
  { name: 'Zoho CRM', tag: 'Advisor Workflows' },
  { name: 'Google Analytics 4', tag: 'Funnel Telemetry' },
  { name: 'OpenAI', tag: 'Guardrailed AI Agents' },
];

/* Section 10: Finance FAQ — Topic Tabs */
const FINANCE_FAQ_TABS: {
  topic: 'Security' | 'Compliance' | 'SEO & Marketing' | 'Cost & Timeline';
  items: { q: string; a: string }[];
}[] = [
  {
    topic: 'Security',
    items: [
      {
        q: 'Is our customer data safe on the websites you build?',
        a: 'Yes. We engineer every financial website and portal with strict HTTPS/TLS encryption in transit, encrypted database storage at rest, hardened cloud firewalls, and input sanitization against OWASP vulnerabilities.',
      },
      {
        q: 'Do you support 2FA and secure logins?',
        a: 'Absolutely. We implement multi-factor authentication (SMS/Email OTP, authenticator apps, and SSO), short-lived encrypted session tokens, role-based access controls, and automated session timeouts for customer and admin portals.',
      },
    ],
  },
  {
    topic: 'Compliance',
    items: [
      {
        q: 'Do you understand RBI / SEBI / DPDP requirements?',
        a: "We design and build websites and onboarding flows with India's DPDP Act and applicable financial-sector UX guidelines in mind—including explicit consent checkboxes, clear fee/APR disclosures, grievance officer sections, and privacy notices.",
      },
      {
        q: 'Can you work with our compliance team?',
        a: 'Yes. Our engineering and design pods regularly collaborate with internal legal, compliance, and InfoSec teams during wireframing, copy review, and pre-launch VAPT (Vulnerability Assessment & Penetration Testing) sign-offs.',
      },
    ],
  },
  {
    topic: 'SEO & Marketing',
    items: [
      {
        q: 'Why is SEO harder for finance websites (YMYL)?',
        a: 'Search engines classify financial pages as "Your Money or Your Life" (YMYL) and hold them to strict E-E-A-T standards (Experience, Expertise, Authoritativeness, Trustworthiness). We build verified author profiles, transparent citations, calculators, and FinancialProduct schema so you rank safely.',
      },
      {
        q: 'Can you run Google Ads for financial products?',
        a: 'Yes. We structure Google Search campaigns with clear fee, interest rate, and tenure disclosures on the landing pages to align with Google Financial Services verification policies and maximize qualified lead conversion.',
      },
    ],
  },
  {
    topic: 'Cost & Timeline',
    items: [
      {
        q: 'How much does a fintech website cost?',
        a: 'A high-trust financial marketing website with custom calculators typically starts from ₹1,25,000 ($1,600), while custom borrower/investor portals and full-stack fintech web apps are scoped based on integrations and security milestones.',
      },
      {
        q: 'How long does a customer portal take?',
        a: 'A marketing website with interactive calculators typically launches in 4 to 6 weeks, while a custom customer portal with eKYC and CRM integrations takes 6 to 10 weeks depending on scope.',
      },
    ],
  },
];

/* Section 11: Booking Widget Slots */
const WORKING_DAY_SLOTS = [
  { day: 'Mon', date: '12 Oct', full: 'Monday, 12 Oct' },
  { day: 'Tue', date: '13 Oct', full: 'Tuesday, 13 Oct' },
  { day: 'Wed', date: '14 Oct', full: 'Wednesday, 14 Oct' },
  { day: 'Thu', date: '15 Oct', full: 'Thursday, 15 Oct' },
  { day: 'Fri', date: '16 Oct', full: 'Friday, 16 Oct' },
];

const TIME_SLOTS = ['11:00 AM IST', '1:00 PM IST', '3:30 PM IST', '5:00 PM IST'];

/* Helper for Indian Number Formatting (e.g. 10,00,000) */
function formatINR(value: number): string {
  return Math.round(value).toLocaleString('en-IN');
}

/* ============================================================================
   MAIN FINANCE & FINTECH INDUSTRY PAGE COMPONENT
============================================================================ */
const FinanceFintech: React.FC<{
  onOpenQuoteModal?: (service?: string) => void;
}> = ({ onOpenQuoteModal: propOpenQuoteModal }) => {
  const quoteModalCtx = useQuoteModal();
  const onOpenQuoteModal = (service?: string) => {
    if (propOpenQuoteModal) propOpenQuoteModal(service);
    else quoteModalCtx.openQuoteModal(service);
  };
  const prefersReducedMotion = useReducedMotion();

  /* Section 2: Active Segment State */
  const [activeSegmentId, setActiveSegmentId] = useState<string>(
    FINANCE_SEGMENTS[0].id
  );

  /* Section 3: Website Trust Score Checklist State (default 5 checked out of 8) */
  const [checkedTrustIds, setCheckedTrustIds] = useState<Record<string, boolean>>({
    ssl: true,
    regulatory: true,
    'team-office': true,
    'transparent-fees': false,
    testimonials: true,
    speed: false,
    privacy: true,
    mobile: false,
  });

  /* Section 4: Sticky Scroll-Spy Service Index */
  const [activeServiceIndex, setActiveServiceIndex] = useState<number>(0);
  const serviceCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Section 5: Live EMI Calculator State */
  const [loanAmount, setLoanAmount] = useState<number>(
    CALCULATOR_DEFAULTS.defaultAmount
  );
  const [interestRate, setInterestRate] = useState<number>(
    CALCULATOR_DEFAULTS.defaultRate
  );
  const [tenureYears, setTenureYears] = useState<number>(
    CALCULATOR_DEFAULTS.defaultTenure
  );

  /* Section 10: Finance FAQ Topic Tab & Open Question State */
  const [activeFaqTopic, setActiveFaqTopic] = useState<
    'Security' | 'Compliance' | 'SEO & Marketing' | 'Cost & Timeline'
  >('Security');
  const [openFaqQuestion, setOpenFaqQuestion] = useState<string>(
    FINANCE_FAQ_TABS[0].items[0].q
  );

  /* Section 11: Strategy Call Booking Widget State */
  const [selectedDay, setSelectedDay] = useState<string>(
    WORKING_DAY_SLOTS[1].full
  );
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[0]);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [bookingErrors, setBookingErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  }>({});
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  /* SEO Meta & Document Title */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Finance & Fintech Website Development, SEO & AI Solutions | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Secure websites, digital onboarding, financial calculators, SEO and AI support for banks, NBFCs, fintech startups and financial advisors. Book a strategy call with WebXCode.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Scroll-Spy Observer for Section 4 Sticky Services */
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.42;
      let closestIdx = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      serviceCardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < closestDistance) {
          closestDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveServiceIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Section 2 Active Segment */
  const activeSegment =
    FINANCE_SEGMENTS.find((s) => s.id === activeSegmentId) || FINANCE_SEGMENTS[0];

  /* Section 3 Trust Score Calculation */
  const trustScoreCount = TRUST_CHECKLIST_ITEMS.reduce(
    (sum, item) => sum + (checkedTrustIds[item.id] ? 1 : 0),
    0
  );
  const trustPercent = Math.round(
    (trustScoreCount / TRUST_CHECKLIST_ITEMS.length) * 100
  );
  const trustTier =
    trustScoreCount <= 3
      ? {
          badge: 'Low Trust — Losing Leads',
          message:
            'Visitors are likely leaving before enquiring. Let’s fix these trust gaps.',
        }
      : trustScoreCount <= 6
      ? {
          badge: 'Moderate Trust — Room to Improve',
          message:
            'Good foundation — a few upgrades can noticeably lift conversions.',
        }
      : {
          badge: 'High Trust — Ready to Scale',
          message:
            'Strong trust setup. Focus next on SEO, calculators and AI support.',
        };

  const toggleTrustItem = (id: string) => {
    setCheckedTrustIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /* Section 5 EMI Calculation (Standard Reducing-Balance Formula) */
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emiFactor = Math.pow(1 + monthlyRate, totalMonths);
  const monthlyEmi =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * emiFactor) / (emiFactor - 1)
      : loanAmount / totalMonths;
  const totalPayable = monthlyEmi * totalMonths;
  const totalInterest = Math.max(0, totalPayable - loanAmount);
  const principalSharePercent =
    totalPayable > 0 ? Math.round((loanAmount / totalPayable) * 100) : 100;
  const interestSharePercent = 100 - principalSharePercent;

  /* Section 10 Active FAQ List */
  const activeFaqGroup =
    FINANCE_FAQ_TABS.find((t) => t.topic === activeFaqTopic) ||
    FINANCE_FAQ_TABS[0];

  /* Section 11 Booking Form Validation & Submit */
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      name?: string;
      email?: string;
      phone?: string;
      company?: string;
    } = {};

    if (!bookingForm.name.trim()) {
      errors.name = 'Please enter your full name.';
    }
    if (
      !bookingForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingForm.email.trim())
    ) {
      errors.email = 'Please enter a valid work email.';
    }
    if (!bookingForm.phone.trim() || bookingForm.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid phone / WhatsApp number.';
    }
    if (!bookingForm.company.trim()) {
      errors.company = 'Please enter your company or firm name.';
    }

    setBookingErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setBookingSubmitting(true);
    setTimeout(() => {
      setBookingSubmitting(false);
      setBookingConfirmed(true);
    }, 650);
  };

  /* Other 11 Industries for Bottom Section */
  const otherIndustries = industries.filter(
    (ind) => ind.slug !== 'finance-fintech'
  );

  /* JSON-LD Structured Data (Service, BreadcrumbList, FAQPage) */
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Finance & Fintech Website Development, SEO & AI Solutions',
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      serviceType:
        'Fintech Website Development, Customer Portals, Financial Calculators, YMYL SEO & AI Support',
      areaServed: 'Worldwide',
      description:
        'Secure websites, digital onboarding, financial calculators, SEO and AI support for banks, NBFCs, fintech startups and financial advisors.',
    },
    {
      '@context': 'https://schema.org',
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
          name: 'Industries',
          item: 'https://webxcode.com/industries',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: financeIndustry.name,
          item: 'https://webxcode.com/industries/finance-fintech',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FINANCE_FAQ_TABS.flatMap((tab) =>
        tab.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        }))
      ),
    },
  ];

  const ActiveServiceIcon =
    FINANCE_SERVICES[activeServiceIndex]?.icon || Smartphone;

  return (
    <main className="bg-white text-navy overflow-x-hidden">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Custom Marquee Keyframes */}
      <style>{`
        @keyframes fintechMarqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fintechMarqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .fintech-marquee-left {
          display: flex;
          width: max-content;
          animation: fintechMarqueeLeft 36s linear infinite;
        }
        .fintech-marquee-right {
          display: flex;
          width: max-content;
          animation: fintechMarqueeRight 36s linear infinite;
        }
        .fintech-marquee-wrap:hover .fintech-marquee-left,
        .fintech-marquee-wrap:hover .fintech-marquee-right {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .fintech-marquee-left,
          .fintech-marquee-right {
            animation: none !important;
          }
        }
      `}</style>

      {/* ====================================================================
          1. HERO — FINTECH VAULT SPLIT (navy — 55/45 split)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
        <div className="absolute -right-24 top-1/4 w-[600px] h-[600px] blue-glow-strong pointer-events-none" />
        <div className="absolute -left-24 bottom-0 w-[440px] h-[440px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 55% (7 cols) */}
            <div className="lg:col-span-7">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="inline-flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/70 mb-6"
              >
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
                <Link
                  href="/industries"
                  className="hover:text-white transition-colors"
                >
                  Industries
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
                <span className="text-white font-semibold" aria-current="page">
                  {financeIndustry.name}
                </span>
              </nav>

              {/* Pill Label */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em]">
                  <Landmark className="w-3.5 h-3.5 text-primary" />
                  <span>FINANCE &amp; FINTECH SOLUTIONS</span>
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] font-extrabold leading-[1.08] tracking-tight mb-5">
                Secure, High-Trust Websites, SEO &amp; AI for{' '}
                <span className="text-primary">Finance &amp; Fintech</span>
              </h1>

              {/* Subtitle */}
              <p className="text-[16px] sm:text-[18px] text-white/75 leading-relaxed mb-8 max-w-2xl">
                In financial services, trust decides everything. We build fast,
                secure websites, smooth onboarding flows, financial calculators,
                search visibility and AI support that turn visitors into verified
                customers.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-9">
                <a
                  href="#strategy-call"
                  className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Book a Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#calculator-demo"
                  className="px-7 py-4 rounded-full border border-white/25 hover:border-white hover:bg-white/10 text-white font-bold text-[15px] transition-all inline-flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-primary" />
                  <span>Try Live Calculator Demo</span>
                </a>
              </div>

              {/* Trust Strip — 3 Lock/Shield Badges */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="inline-flex items-center gap-2 text-[13px] font-bold text-white/90">
                  <span className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <span>Security-First Architecture</span>
                </div>
                <div className="inline-flex items-center gap-2 text-[13px] font-bold text-white/90">
                  <span className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                    <Lock className="w-4 h-4" />
                  </span>
                  <span>DPDP &amp; Compliance-Aware UX</span>
                </div>
                <div className="inline-flex items-center gap-2 text-[13px] font-bold text-white/90">
                  <span className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                    <FileCheck className="w-4 h-4" />
                  </span>
                  <span>95+ PageSpeed Target</span>
                </div>
              </div>
            </div>

            {/* Right 45% (5 cols): Layered "Fintech Vault" Graphic */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-[460px]">
                {/* Soft Blue Radial Glow Behind */}
                <div className="absolute -inset-6 rounded-full bg-primary/25 blur-3xl pointer-events-none" />

                {/* Floating Chip Top-Left: 256-Bit SSL */}
                <div className="relative z-20 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-navy text-[12px] font-extrabold shadow-xl border border-primary-100 mb-3">
                  <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                    <Lock className="w-3 h-3" />
                  </span>
                  <span>256-Bit SSL</span>
                </div>

                {/* Main White Fintech Card */}
                <div className="relative z-10 bg-white text-navy rounded-[24px] p-6 sm:p-7 shadow-2xl border border-primary-100">
                  {/* Top Bar: Portfolio Value + Verified KYC Chip */}
                  <div className="flex items-start justify-between gap-3 pb-5 border-b border-navy-08">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-navy-50 block mb-1">
                        Client Portfolio Value
                      </span>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-[28px] sm:text-[32px] font-extrabold text-navy tabular-nums">
                          ₹24,80,500
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary text-[12px] font-extrabold tabular-nums">
                          +18.4%
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-[11px] font-bold shadow-sm shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>KYC Verified</span>
                    </span>
                  </div>

                  {/* Middle: Mini EMI / SIP Slider Preview */}
                  <div className="py-5 border-b border-navy-08">
                    <div className="flex items-center justify-between text-[12px] font-bold mb-2">
                      <span className="text-navy-70">
                        Instant Loan / SIP Estimator
                      </span>
                      <span className="text-primary tabular-nums font-extrabold">
                        ₹21,494 / mo
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-primary-50 overflow-hidden p-0.5">
                      <div className="w-[68%] h-full rounded-full bg-primary" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-navy-50 font-semibold mt-2">
                      <span>Principal: ₹10,00,000</span>
                      <span>APR: 10.5% · 5 Yrs</span>
                    </div>
                  </div>

                  {/* Bottom: 3-Step Onboarding Progress Bar */}
                  <div className="pt-5">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-navy-50 mb-3">
                      <span>Digital Onboarding Flow</span>
                      <span className="text-primary">Step 3 of 3 Ready</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { num: '1', label: 'Details', done: true },
                        { num: '2', label: 'eKYC', done: true },
                        { num: '3', label: 'Approved', done: true },
                      ].map((st) => (
                        <div
                          key={st.label}
                          className="rounded-xl bg-primary-50/70 border border-primary-100 px-3 py-2.5 flex items-center gap-2"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-extrabold flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </span>
                          <span className="text-[12px] font-extrabold text-navy truncate">
                            {st.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Chips Below Card */}
                <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 mt-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-navy text-[12px] font-extrabold shadow-xl border border-primary-100">
                    <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                      <KeyRound className="w-3 h-3" />
                    </span>
                    <span>2FA Protected</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary text-white text-[12px] font-extrabold shadow-xl">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+62% Qualified Leads (Placeholder)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. WHO WE SERVE IN FINANCE — SEGMENT RIBBON (white)
      ==================================================================== */}
      <section className="bg-white py-14 lg:py-20 border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                WHO WE WORK WITH
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Built for Every Corner of{' '}
                <span className="text-primary">Financial Services</span>
              </h2>
            </div>
            <p className="text-[14px] text-navy-50 font-semibold">
              Click any segment to see how we tailor your digital platform:
            </p>
          </div>

          {/* 7-Item Segment Ribbon (7 cols on desktop, horizontal scroll on mobile) */}
          <div
            role="tablist"
            aria-label="Financial services segments"
            className="flex lg:grid lg:grid-cols-7 gap-3 overflow-x-auto no-scrollbar pb-3"
          >
            {FINANCE_SEGMENTS.map((seg) => {
              const Icon = seg.icon;
              const isSelected = activeSegmentId === seg.id;
              return (
                <button
                  key={seg.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveSegmentId(seg.id)}
                  className={`shrink-0 w-[210px] lg:w-auto text-left rounded-[18px] p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-md -translate-y-0.5'
                      : 'bg-primary-50/60 hover:bg-primary-50 text-navy border-primary-100'
                  }`}
                >
                  <div>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                        isSelected
                          ? 'bg-white text-primary'
                          : 'bg-white text-primary shadow-2xs'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3
                      className={`text-[15px] font-extrabold leading-snug mb-1 ${
                        isSelected ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {seg.title}
                    </h3>
                  </div>
                  <p
                    className={`text-[12px] leading-relaxed ${
                      isSelected ? 'text-white/85' : 'text-navy-70'
                    }`}
                  >
                    {seg.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Slim 1-Line Contextual Strip Below Ribbon */}
          <div className="mt-5 rounded-[18px] bg-primary-50 border border-primary-100 px-5 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-[12px] font-bold shrink-0 w-fit">
                <span>{activeSegment.title}</span>
              </span>
              <p className="text-[14px] sm:text-[15px] text-navy font-semibold">
                {activeSegment.detail}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {activeSegment.chips.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold"
                >
                  {chip}
                </span>
              ))}
              <button
                type="button"
                onClick={() =>
                  onOpenQuoteModal(`${activeSegment.title} Solution`)
                }
                className="ml-1 inline-flex items-center gap-1 text-[13px] font-extrabold text-primary hover:underline cursor-pointer"
              >
                <span>Discuss {activeSegment.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. WEBSITE TRUST SCORE — INTERACTIVE SELF-CHECK (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              TRUST CHECK
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              Would a Customer Trust Your Website{' '}
              <span className="text-primary">With Their Money?</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-navy-70">
              Tick the items your current website has:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 60% (7 cols): 8 Interactive Checklist Rows */}
            <div className="lg:col-span-7 bg-white rounded-[24px] p-6 sm:p-8 border border-navy-08 shadow-soft flex flex-col justify-between">
              <div className="space-y-3">
                {TRUST_CHECKLIST_ITEMS.map((item) => {
                  const isChecked = Boolean(checkedTrustIds[item.id]);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="checkbox"
                      aria-checked={isChecked}
                      onClick={() => toggleTrustItem(item.id)}
                      className={`w-full text-left px-4 py-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                        isChecked
                          ? 'bg-primary-50/70 border-primary text-navy shadow-2xs'
                          : 'bg-white hover:bg-primary-50/30 border-navy-08 text-navy-70'
                      }`}
                    >
                      <span className="flex items-center gap-3.5">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                            isChecked
                              ? 'bg-primary text-white'
                              : 'bg-white border-2 border-navy-15 text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </span>
                        <span className="text-[15px] font-bold">{item.label}</span>
                      </span>

                      <span
                        className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${
                          isChecked
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-navy-50'
                        }`}
                      >
                        {isChecked ? 'Active' : 'Missing'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-navy-08 flex flex-wrap items-center justify-between gap-3 text-[13px] text-navy-50 font-semibold">
                <span>
                  Click any row above to toggle and recalculate your live Trust
                  Score.
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCheckedTrustIds({
                      ssl: true,
                      regulatory: true,
                      'team-office': true,
                      'transparent-fees': true,
                      testimonials: true,
                      speed: true,
                      privacy: true,
                      mobile: true,
                    })
                  }
                  className="text-primary font-bold hover:underline cursor-pointer"
                >
                  Check all 8
                </button>
              </div>
            </div>

            {/* Right 40% (5 cols): Live Navy Trust Score Meter Card */}
            <div className="lg:col-span-5 bg-navy text-white rounded-[24px] p-7 sm:p-9 shadow-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-64 h-64 blue-glow pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
                    LIVE TRUST METER
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[12px] font-bold tabular-nums">
                    <Shield className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {trustScoreCount} / {TRUST_CHECKLIST_ITEMS.length} Passed
                    </span>
                  </span>
                </div>

                {/* Circular / Semi-Circular Gauge Visual */}
                <div className="my-4 flex flex-col items-center text-center">
                  <div className="relative w-44 h-44 rounded-full border-[10px] border-white/10 flex flex-col items-center justify-center shadow-inner">
                    <svg
                      className="absolute -inset-[10px] w-44 h-44 -rotate-90 pointer-events-none"
                      viewBox="0 0 176 176"
                    >
                      <circle
                        cx="88"
                        cy="88"
                        r="78"
                        fill="none"
                        stroke="#0571c2"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 78}
                        strokeDashoffset={
                          2 * Math.PI * 78 * (1 - trustPercent / 100)
                        }
                        className="transition-all duration-500"
                      />
                    </svg>
                    <span className="text-[42px] font-extrabold text-white leading-none tabular-nums">
                      {trustScoreCount}/{TRUST_CHECKLIST_ITEMS.length}
                    </span>
                    <span className="text-[13px] font-bold text-primary uppercase tracking-wider mt-1.5 tabular-nums">
                      {trustPercent}% Trust Score
                    </span>
                  </div>

                  {/* Dynamic Status Badge */}
                  <div className="mt-6">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-white text-[13px] font-extrabold shadow-md">
                      {trustTier.badge}
                    </span>
                  </div>

                  {/* Dynamic Advice Copy */}
                  <p className="mt-4 text-[15px] text-white/80 leading-relaxed max-w-sm">
                    {trustTier.message}
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/10 mt-6">
                <a
                  href="#strategy-call"
                  className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Get a Free Website Trust Review</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. SERVICES FOR FINANCE & FINTECH — STICKY SCROLL-SPY SHOWCASE (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHAT WE BUILD
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Digital Solutions for{' '}
              <span className="text-primary">Finance &amp; Fintech</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 42% (5 cols): Sticky Preview Card on Desktop */}
            <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-[110px]">
              <div className="bg-navy text-white rounded-[24px] p-8 shadow-2xl border border-white/10 relative overflow-hidden">
                <div className="absolute -right-16 -bottom-16 w-64 h-64 blue-glow pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={FINANCE_SERVICES[activeServiceIndex].id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22 }}
                    className="relative z-10"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="text-[54px] font-extrabold leading-none tabular-nums"
                        style={{
                          WebkitTextStroke: '2px #0571c2',
                          color: 'transparent',
                        }}
                      >
                        {FINANCE_SERVICES[activeServiceIndex].num}
                      </span>
                      <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                        <ActiveServiceIcon className="w-7 h-7" />
                      </div>
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary block mb-1.5">
                      ACTIVE CAPABILITY
                    </span>
                    <h3 className="text-[24px] font-extrabold text-white leading-snug mb-3">
                      {FINANCE_SERVICES[activeServiceIndex].title}
                    </h3>
                    <p className="text-[14px] text-white/75 leading-relaxed mb-6">
                      {FINANCE_SERVICES[activeServiceIndex].desc}
                    </p>

                    {/* Mini Visual Frame Inside Sticky Panel */}
                    <div className="rounded-[18px] bg-white/5 border border-white/15 p-5 mb-6">
                      <div className="text-[12px] font-bold text-white/60 uppercase tracking-wider mb-1">
                        Deliverable Architecture
                      </div>
                      <div className="text-[16px] font-extrabold text-white mb-3">
                        {FINANCE_SERVICES[activeServiceIndex].visualLabel}
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/25 border border-primary/40 text-white text-[12px] font-bold">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        <span>
                          {FINANCE_SERVICES[activeServiceIndex].visualMetric}
                        </span>
                      </div>
                    </div>

                    {/* Progress Dots */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-1.5">
                        {FINANCE_SERVICES.map((s, idx) => (
                          <button
                            key={s.id}
                            type="button"
                            aria-label={`Jump to ${s.title}`}
                            onClick={() => {
                              serviceCardRefs.current[idx]?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                              });
                            }}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                              idx === activeServiceIndex
                                ? 'w-7 bg-primary'
                                : 'w-2 bg-white/25 hover:bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[12px] font-bold text-white/60 tabular-nums">
                        {activeServiceIndex + 1} / {FINANCE_SERVICES.length}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right 58% (7 cols): 7 Scrolling Service Cards */}
            <div className="lg:col-span-7 space-y-6">
              {FINANCE_SERVICES.map((srv, idx) => {
                const Icon = srv.icon;
                const isCurrent = activeServiceIndex === idx;
                return (
                  <div
                    key={srv.id}
                    ref={(el) => {
                      serviceCardRefs.current[idx] = el;
                    }}
                    onMouseEnter={() => setActiveServiceIndex(idx)}
                    className={`rounded-[22px] p-6 sm:p-8 border transition-all duration-300 ${
                      isCurrent
                        ? 'bg-white border-primary border-l-4 border-l-primary shadow-soft-hover'
                        : 'bg-white border-navy-08 shadow-soft hover:border-primary-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                            isCurrent
                              ? 'bg-primary text-white'
                              : 'bg-primary-50 text-primary'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[12px] font-extrabold uppercase tracking-wider text-primary block">
                            SERVICE {srv.num}
                          </span>
                          <h3 className="text-[20px] sm:text-[22px] font-extrabold text-navy leading-snug">
                            {srv.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-[15px] text-navy-70 leading-relaxed mb-5">
                      {srv.desc}
                    </p>

                    <ul className="space-y-2.5 mb-6">
                      {srv.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-[14px] font-semibold text-navy"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-navy-08/60 flex flex-wrap items-center justify-between gap-3">
                      <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-[12px] font-bold">
                        {srv.visualMetric}
                      </span>

                      <button
                        type="button"
                        onClick={() => onOpenQuoteModal(srv.title)}
                        className="inline-flex items-center gap-1.5 text-[14px] font-extrabold text-primary hover:underline cursor-pointer"
                      >
                        <span>Discuss This</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. LIVE FINANCIAL CALCULATOR DEMO (navy — #calculator-demo)
      ==================================================================== */}
      <section
        id="calculator-demo"
        className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="absolute -left-24 top-1/3 w-[520px] h-[520px] blue-glow pointer-events-none" />

        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              INTERACTIVE DEMO
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight mb-3">
              Calculators That Turn{' '}
              <span className="text-primary">Visitors Into Leads</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-white/75">
              Try a sample EMI calculator like the ones we build for lending and
              finance clients.
            </p>
          </div>

          {/* White Calculator Card Centered Inside Navy Section */}
          <div className="bg-white text-navy rounded-[28px] p-6 sm:p-10 lg:p-12 shadow-2xl border border-primary-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Inputs (7 cols) */}
              <div className="lg:col-span-7 space-y-7">
                {/* Input 1: Loan Amount */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <label
                      htmlFor="calc-loan-amount"
                      className="text-[14px] font-extrabold text-navy"
                    >
                      Loan Amount
                    </label>
                    <span className="px-3.5 py-1 rounded-full bg-primary-50 text-primary text-[15px] font-extrabold tabular-nums">
                      ₹{formatINR(loanAmount)}
                    </span>
                  </div>
                  <input
                    id="calc-loan-amount"
                    type="range"
                    min={CALCULATOR_DEFAULTS.minAmount}
                    max={CALCULATOR_DEFAULTS.maxAmount}
                    step={50000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2.5 bg-primary-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[11px] font-bold text-navy-50 mt-1.5 tabular-nums">
                    <span>₹50,000</span>
                    <span>₹50,00,000</span>
                    <span>₹1,00,00,000</span>
                  </div>
                </div>

                {/* Input 2: Interest Rate */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <label
                      htmlFor="calc-interest-rate"
                      className="text-[14px] font-extrabold text-navy"
                    >
                      Interest Rate (% p.a.)
                    </label>
                    <span className="px-3.5 py-1 rounded-full bg-primary-50 text-primary text-[15px] font-extrabold tabular-nums">
                      {interestRate.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    id="calc-interest-rate"
                    type="range"
                    min={CALCULATOR_DEFAULTS.minRate}
                    max={CALCULATOR_DEFAULTS.maxRate}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2.5 bg-primary-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[11px] font-bold text-navy-50 mt-1.5 tabular-nums">
                    <span>5%</span>
                    <span>14.5%</span>
                    <span>24%</span>
                  </div>
                </div>

                {/* Input 3: Tenure */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <label
                      htmlFor="calc-tenure-years"
                      className="text-[14px] font-extrabold text-navy"
                    >
                      Loan Tenure (Years)
                    </label>
                    <span className="px-3.5 py-1 rounded-full bg-primary-50 text-primary text-[15px] font-extrabold tabular-nums">
                      {tenureYears} {tenureYears === 1 ? 'Year' : 'Years'} (
                      {totalMonths} mos)
                    </span>
                  </div>
                  <input
                    id="calc-tenure-years"
                    type="range"
                    min={CALCULATOR_DEFAULTS.minTenure}
                    max={CALCULATOR_DEFAULTS.maxTenure}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full h-2.5 bg-primary-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[11px] font-bold text-navy-50 mt-1.5 tabular-nums">
                    <span>1 Yr</span>
                    <span>15 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>

              {/* Right Live Output (5 cols) */}
              <div className="lg:col-span-5 bg-primary-50 rounded-[22px] p-6 sm:p-8 border border-primary-100">
                <span className="text-[12px] font-extrabold uppercase tracking-wider text-primary block mb-1">
                  Estimated Monthly EMI
                </span>
                <div className="text-[36px] sm:text-[42px] font-extrabold text-navy leading-none tabular-nums mb-6">
                  ₹{formatINR(monthlyEmi)}
                  <span className="text-[15px] font-bold text-navy-50 ml-1">
                    / mo
                  </span>
                </div>

                {/* Stacked Bar: Principal vs Interest */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-[12px] font-bold mb-2">
                    <span className="inline-flex items-center gap-1.5 text-navy">
                      <span className="w-3 h-3 rounded-xs bg-primary inline-block" />
                      <span>Principal ({principalSharePercent}%)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-navy">
                      <span className="w-3 h-3 rounded-xs bg-navy inline-block" />
                      <span>Interest ({interestSharePercent}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-4 rounded-full bg-navy overflow-hidden flex">
                    <div
                      style={{ width: `${principalSharePercent}%` }}
                      className="h-full bg-primary transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Summary Rows */}
                <div className="space-y-2.5 pt-4 border-t border-primary-100 text-[14px]">
                  <div className="flex items-center justify-between">
                    <span className="text-navy-70 font-medium">
                      Principal Amount
                    </span>
                    <span className="font-extrabold text-navy tabular-nums">
                      ₹{formatINR(loanAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-navy-70 font-medium">
                      Total Interest Payable
                    </span>
                    <span className="font-extrabold text-navy tabular-nums">
                      ₹{formatINR(totalInterest)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-primary-100 text-[15px]">
                    <span className="font-extrabold text-navy">
                      Total Amount Payable
                    </span>
                    <span className="font-extrabold text-primary tabular-nums">
                      ₹{formatINR(totalPayable)}
                    </span>
                  </div>
                </div>

                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenQuoteModal('Custom Financial Calculator')
                    }
                    className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Build a Custom Calculator for My Website</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. SECURITY & COMPLIANCE BY DESIGN — LAYERED STACK (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 40% (5 cols): Editorial Intro */}
            <div className="lg:col-span-5 lg:sticky lg:top-[110px]">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                SECURITY &amp; COMPLIANCE
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-4">
                Built With Security at{' '}
                <span className="text-primary">Every Layer</span>
              </h2>
              <p className="text-[16px] text-navy-70 leading-relaxed mb-6">
                Financial websites cannot treat security as an afterthought. From
                SSL/TLS transport to DPDP-aware consent flows, every project is
                engineered with strict defensive layers.
              </p>

              <div className="rounded-[20px] bg-primary-50 border border-primary-100 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-extrabold text-navy mb-1">
                      Ready for InfoSec &amp; VAPT Reviews
                    </h3>
                    <p className="text-[13px] text-navy-70 leading-relaxed">
                      We work directly with your compliance and security teams to
                      clear pre-launch audits smoothly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 60% (7 cols): 6 Stacked Horizontal Layer Bars */}
            <div className="lg:col-span-7 space-y-4">
              {SECURITY_LAYERS.map((layer) => {
                const Icon = layer.icon;
                return (
                  <div
                    key={layer.num}
                    className="group rounded-[20px] bg-white hover:bg-primary-50/40 border border-navy-08 hover:border-primary p-5 sm:p-6 shadow-soft transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <span className="text-[14px] font-extrabold text-primary bg-primary-50 border border-primary-100 px-3 py-1.5 rounded-xl tabular-nums shrink-0">
                        {layer.num}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-navy text-white group-hover:bg-primary transition-colors flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[18px] font-extrabold text-navy mb-0.5">
                          {layer.title}
                        </h3>
                        <p className="text-[14px] text-navy-70">{layer.desc}</p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-extrabold uppercase tracking-wider shrink-0 w-fit">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Included</span>
                    </span>
                  </div>
                );
              })}

              {/* Honest Note Below */}
              <p className="text-[12px] text-navy-50 italic pt-2 px-1">
                We build websites and portals following security and privacy best
                practices and work alongside your legal/compliance team for
                regulatory sign-offs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. THE FINANCIAL CUSTOMER JOURNEY — SUBWAY-LINE MAP (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              CUSTOMER JOURNEY
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Removing Drop-Offs From{' '}
              <span className="text-primary">First Click to KYC</span>
            </h2>
          </div>

          {/* Horizontal Subway-Line Track (6 Stations) */}
          <div className="relative">
            {/* Desktop Horizontal Connecting Track Line */}
            <div className="hidden lg:block absolute top-7 left-10 right-10 h-1.5 bg-primary/25 rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 relative z-10">
              {JOURNEY_STATIONS.map((st) => (
                <div key={st.step} className="flex flex-col">
                  {/* Station Node Circle */}
                  <div className="flex items-center gap-3 mb-4 lg:justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary text-white border-4 border-white shadow-md flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 leading-none">
                        STOP
                      </span>
                      <span className="text-[16px] font-extrabold leading-tight tabular-nums">
                        {st.step}
                      </span>
                    </div>
                    <h3 className="text-[18px] font-extrabold text-navy lg:hidden">
                      {st.station}
                    </h3>
                  </div>

                  <h3 className="hidden lg:block text-center text-[17px] font-extrabold text-navy mb-3">
                    {st.station}
                  </h3>

                  {/* Station Card */}
                  <div className="flex-1 bg-white rounded-[18px] p-4 border border-navy-08 shadow-soft flex flex-col justify-between gap-4">
                    {/* What slows customers down */}
                    <div className="rounded-xl bg-primary-50/50 p-3 border border-navy-08/60">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-navy-50 block mb-1">
                        What slows customers down
                      </span>
                      <p className="text-[13px] text-navy-70 font-medium leading-snug">
                        {st.slowsDown}
                      </p>
                    </div>

                    {/* How we fix it */}
                    <div className="rounded-xl bg-primary-50 border border-primary-100 p-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary block mb-1">
                        How we fix it
                      </span>
                      <p className="text-[13px] text-navy font-bold leading-snug">
                        {st.howWeFix}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. CASE STUDY — BIG STATEMENT LAYOUT (navy)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="absolute -right-24 top-1/4 w-[520px] h-[520px] blue-glow-strong pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em]">
              FINTECH CASE STUDY
            </span>
            <span className="text-[13px] font-semibold text-white/65">
              Client: {FINTECH_CASE_STUDY.clientName}
            </span>
          </div>

          {/* Full-Width Oversized Statement Number */}
          <div className="rounded-[24px] bg-white/5 border border-white/15 p-7 sm:p-10 lg:p-12 mb-8 backdrop-blur-xs">
            <div className="flex flex-col lg:flex-row lg:items-baseline gap-4 lg:gap-8">
              <div className="text-[44px] sm:text-[64px] lg:text-[76px] font-extrabold leading-none tracking-tight tabular-nums">
                <span className="text-white/40 line-through decoration-primary/70 mr-3">
                  {FINTECH_CASE_STUDY.statementBefore}
                </span>
                <span className="text-primary">→</span>{' '}
                <span className="text-white">
                  {FINTECH_CASE_STUDY.statementAfter}
                </span>
              </div>
              <p className="text-[18px] sm:text-[22px] font-bold text-white/85">
                {FINTECH_CASE_STUDY.statementLabel}
              </p>
            </div>
          </div>

          {/* 3-Column Row: The Challenge | Our Solution | The Result */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-[20px] bg-white/5 border border-white/10 p-6">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary block mb-2">
                01 · THE CHALLENGE
              </span>
              <p className="text-[15px] text-white/80 leading-relaxed">
                {FINTECH_CASE_STUDY.challenge}
              </p>
            </div>

            <div className="rounded-[20px] bg-white/5 border border-white/10 p-6">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary block mb-2">
                02 · OUR SOLUTION
              </span>
              <p className="text-[15px] text-white/80 leading-relaxed">
                {FINTECH_CASE_STUDY.solution}
              </p>
            </div>

            <div className="rounded-[20px] bg-primary/20 border border-primary/40 p-6">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-white block mb-2">
                03 · THE RESULT
              </span>
              <p className="text-[15px] text-white font-semibold leading-relaxed">
                {FINTECH_CASE_STUDY.result}
              </p>
            </div>
          </div>

          {/* 3 KPI Chips + Button */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              {FINTECH_CASE_STUDY.kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 flex items-center gap-3.5"
                >
                  <span className="text-[26px] sm:text-[30px] font-extrabold text-primary tabular-nums">
                    {kpi.value}
                  </span>
                  <span className="text-[12px] font-bold text-white/80 leading-snug">
                    {kpi.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/our-work"
              className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-all inline-flex items-center justify-center gap-2 shrink-0 shadow-lg"
            >
              <span>View More Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. PAYMENT & FINANCE INTEGRATIONS — TWO-ROW MARQUEE (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[96px] border-b border-navy-08 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-10 text-center">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
            INTEGRATIONS
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold text-navy leading-[1.14] tracking-tight">
            Connects With the Platforms{' '}
            <span className="text-primary">You Already Use</span>
          </h2>
        </div>

        <div className="fintech-marquee-wrap space-y-4">
          {/* Row 1: Scrolls Left */}
          <div className="overflow-hidden">
            <div className="fintech-marquee-left gap-4 px-2">
              {[...INTEGRATIONS_ROW_1, ...INTEGRATIONS_ROW_1].map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="px-5 py-3.5 rounded-2xl bg-primary-50/60 border border-primary-100 flex items-center gap-3 shrink-0"
                >
                  <span className="w-8 h-8 rounded-xl bg-white text-primary flex items-center justify-center font-extrabold text-[13px] shadow-2xs">
                    <CreditCard className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-[14px] font-extrabold text-navy leading-tight">
                      {item.name}
                    </div>
                    <div className="text-[11px] font-semibold text-navy-50">
                      {item.tag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolls Right */}
          <div className="overflow-hidden">
            <div className="fintech-marquee-right gap-4 px-2">
              {[...INTEGRATIONS_ROW_2, ...INTEGRATIONS_ROW_2].map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="px-5 py-3.5 rounded-2xl bg-white border border-navy-08 shadow-2xs flex items-center gap-3 shrink-0"
                >
                  <span className="w-8 h-8 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-extrabold text-[13px]">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-[14px] font-extrabold text-navy leading-tight">
                      {item.name}
                    </div>
                    <div className="text-[11px] font-semibold text-navy-50">
                      {item.tag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. FINANCE FAQ — TOPIC TABS + ACCORDION (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              FAQ
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Questions From <span className="text-primary">Finance Teams</span>
            </h2>
          </div>

          {/* 4 Topic Pill Tabs */}
          <div
            role="tablist"
            aria-label="Finance FAQ topics"
            className="flex flex-wrap items-center justify-center gap-2.5 mb-8"
          >
            {FINANCE_FAQ_TABS.map((tab) => {
              const isSelected = activeFaqTopic === tab.topic;
              return (
                <button
                  key={tab.topic}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveFaqTopic(tab.topic);
                    setOpenFaqQuestion(tab.items[0].q);
                  }}
                  className={`px-5 py-2.5 rounded-full text-[14px] font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-navy-70 border border-navy-08 hover:border-primary hover:text-primary'
                  }`}
                >
                  {tab.topic}
                </button>
              );
            })}
          </div>

          {/* Accordion List for Selected Topic */}
          <div className="space-y-4">
            {activeFaqGroup.items.map((item) => {
              const isOpen = openFaqQuestion === item.q;
              return (
                <div
                  key={item.q}
                  className={`rounded-[20px] bg-white border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-primary border-l-4 border-l-primary shadow-soft'
                      : 'border-navy-08 hover:border-primary-100'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenFaqQuestion(isOpen ? '' : item.q)
                    }
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <h3
                      className={`text-[16px] sm:text-[18px] font-extrabold leading-snug ${
                        isOpen ? 'text-primary' : 'text-navy'
                      }`}
                    >
                      {item.q}
                    </h3>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-primary text-white'
                          : 'bg-primary-50 text-primary'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-[15px] text-navy-70 leading-relaxed border-t border-navy-08/60">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. BOOK A STRATEGY CALL — CALENDAR SLOT PICKER CTA (navy, #strategy-call)
      ==================================================================== */}
      <section id="strategy-call" className="bg-white py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-[28px] bg-navy text-white p-7 sm:p-10 lg:p-16 overflow-hidden shadow-2xl">
            <div className="absolute -right-24 -top-24 w-[520px] h-[520px] blue-glow-strong pointer-events-none" />
            <div className="absolute -left-24 -bottom-24 w-[420px] h-[420px] blue-glow pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left 45% (5 cols) */}
              <div className="lg:col-span-5">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/35 text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                  BOOK A STRATEGY CALL
                </span>
                <h2 className="text-[30px] sm:text-[38px] lg:text-[42px] font-extrabold text-white leading-[1.12] tracking-tight mb-4">
                  Let&apos;s Discuss Your{' '}
                  <span className="text-primary">Finance Project</span>
                </h2>
                <p className="text-[16px] text-white/75 leading-relaxed mb-8">
                  Book a 30-minute call with our team to review your website,
                  onboarding flow or marketing goals.
                </p>

                <ul className="space-y-3.5">
                  {[
                    'Free 30-minute consultation',
                    'NDA available on request',
                    'Clear scope & pricing estimate after the call',
                  ].map((pt) => (
                    <li
                      key={pt}
                      className="flex items-center gap-3 text-[15px] font-semibold text-white/90"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right 55% (7 cols): White Slot-Picker Booking Card */}
              <div className="lg:col-span-7">
                <div className="bg-white text-navy rounded-[24px] p-6 sm:p-8 shadow-2xl border border-navy-08">
                  {bookingConfirmed ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-[24px] font-extrabold text-navy">
                        Strategy Call Slot Requested!
                      </h3>
                      <p className="text-[15px] text-navy-70 max-w-md mx-auto">
                        Thank you, <strong>{bookingForm.name}</strong> from{' '}
                        <strong>{bookingForm.company}</strong>. We have reserved
                        your preferred slot on{' '}
                        <strong className="text-primary">
                          {selectedDay} at {selectedTime}
                        </strong>{' '}
                        and sent calendar details to{' '}
                        <strong>{bookingForm.email}</strong>.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setBookingConfirmed(false);
                          setBookingForm({
                            name: '',
                            email: '',
                            phone: '',
                            company: '',
                          });
                        }}
                        className="px-6 py-2.5 rounded-full bg-primary-50 text-primary font-bold text-[13px] hover:bg-primary hover:text-white transition-colors cursor-pointer"
                      >
                        Book another slot
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleBookingSubmit}
                      noValidate
                      className="space-y-5"
                    >
                      {/* Step 1: Pick a Day */}
                      <div>
                        <div className="flex items-center gap-2 text-[13px] font-extrabold text-navy mb-2.5">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>1. Select a Preferred Day</span>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          {WORKING_DAY_SLOTS.map((d) => {
                            const active = selectedDay === d.full;
                            return (
                              <button
                                key={d.full}
                                type="button"
                                onClick={() => setSelectedDay(d.full)}
                                className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                                  active
                                    ? 'bg-primary text-white border-primary shadow-sm'
                                    : 'bg-primary-50/50 hover:bg-primary-50 text-navy border-navy-08'
                                }`}
                              >
                                <div
                                  className={`text-[11px] font-bold uppercase ${
                                    active ? 'text-white/80' : 'text-navy-50'
                                  }`}
                                >
                                  {d.day}
                                </div>
                                <div className="text-[13px] font-extrabold">
                                  {d.date}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 2: Pick a Time Slot */}
                      <div>
                        <div className="flex items-center gap-2 text-[13px] font-extrabold text-navy mb-2.5">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>2. Select a Time Slot</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const active = selectedTime === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTime(slot)}
                                className={`py-2.5 px-3 rounded-xl border text-[12px] font-extrabold transition-all cursor-pointer ${
                                  active
                                    ? 'bg-primary text-white border-primary shadow-sm'
                                    : 'bg-primary-50/50 hover:bg-primary-50 text-navy border-navy-08'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 3: Contact Fields (2x2 Grid) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                        <div>
                          <label
                            htmlFor="fin-book-name"
                            className="block text-[12px] font-bold text-navy mb-1"
                          >
                            Your Name *
                          </label>
                          <input
                            id="fin-book-name"
                            type="text"
                            autoComplete="name"
                            value={bookingForm.name}
                            onChange={(e) =>
                              setBookingForm({
                                ...bookingForm,
                                name: e.target.value,
                              })
                            }
                            placeholder="Siddharth Verma"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-primary-50/50 border border-navy-15 text-navy text-[14px] focus:outline-none focus:border-primary focus:bg-white"
                          />
                          {bookingErrors.name && (
                            <p className="mt-1 text-[11px] font-semibold text-primary flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{bookingErrors.name}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="fin-book-email"
                            className="block text-[12px] font-bold text-navy mb-1"
                          >
                            Work Email *
                          </label>
                          <input
                            id="fin-book-email"
                            type="email"
                            autoComplete="email"
                            value={bookingForm.email}
                            onChange={(e) =>
                              setBookingForm({
                                ...bookingForm,
                                email: e.target.value,
                              })
                            }
                            placeholder="you@company.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-primary-50/50 border border-navy-15 text-navy text-[14px] focus:outline-none focus:border-primary focus:bg-white"
                          />
                          {bookingErrors.email && (
                            <p className="mt-1 text-[11px] font-semibold text-primary flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{bookingErrors.email}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="fin-book-phone"
                            className="block text-[12px] font-bold text-navy mb-1"
                          >
                            Phone / WhatsApp *
                          </label>
                          <input
                            id="fin-book-phone"
                            type="tel"
                            autoComplete="tel"
                            value={bookingForm.phone}
                            onChange={(e) =>
                              setBookingForm({
                                ...bookingForm,
                                phone: e.target.value,
                              })
                            }
                            placeholder="+91 98765 43210"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-primary-50/50 border border-navy-15 text-navy text-[14px] focus:outline-none focus:border-primary focus:bg-white"
                          />
                          {bookingErrors.phone && (
                            <p className="mt-1 text-[11px] font-semibold text-primary flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{bookingErrors.phone}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="fin-book-company"
                            className="block text-[12px] font-bold text-navy mb-1"
                          >
                            Company / Firm Name *
                          </label>
                          <input
                            id="fin-book-company"
                            type="text"
                            autoComplete="organization"
                            value={bookingForm.company}
                            onChange={(e) =>
                              setBookingForm({
                                ...bookingForm,
                                company: e.target.value,
                              })
                            }
                            placeholder="Apex Capital NBFC"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-primary-50/50 border border-navy-15 text-navy text-[14px] focus:outline-none focus:border-primary focus:bg-white"
                          />
                          {bookingErrors.company && (
                            <p className="mt-1 text-[11px] font-semibold text-primary flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{bookingErrors.company}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={bookingSubmitting}
                        className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
                      >
                        {bookingSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Confirming Your Strategy Call...</span>
                          </>
                        ) : (
                          <>
                            <span>
                              Request This Slot ({selectedDay.split(',')[0]},{' '}
                              {selectedTime})
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          12. EXPLORE OTHER INDUSTRIES (white — compact horizontal chip row)
      ==================================================================== */}
      <section className="bg-white py-14 lg:py-20 border-t border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary block mb-1">
                12 SPECIALIZED SECTORS
              </span>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold text-navy">
                Explore Other <span className="text-primary">Industries</span>
              </h2>
            </div>
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary hover:underline"
            >
              <span>View All Industries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
            {otherIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={
                  ind.slug === 'b2b-saas'
                    ? '/industries/b2b-saas'
                    : ind.slug === 'interior-design-architecture'
                    ? '/industries/interior-design-architecture'
                    : ind.slug === 'manufacturing-industrial'
                    ? '/industries/manufacturing-industrial'
                    : ind.slug === 'ecommerce'
                    ? '/industries/ecommerce'
                    : ind.slug === 'skincare-beauty'
                    ? '/industries/skincare-beauty'
                    : ind.slug === 'home-decor-furniture'
                    ? '/industries/home-decor-furniture'
                    : ind.slug === 'fashion-lifestyle'
                    ? '/industries/fashion-lifestyle'
                    : ind.slug === 'healthcare'
                    ? '/industries/healthcare'
                    : ind.slug === 'travel-hospitality'
                    ? '/industries/travel-hospitality'
                    : ind.slug === 'education-edtech'
                    ? '/industries/education-edtech'
                    : `/industries#${ind.slug}`
                }
                className="shrink-0 px-4 py-3 rounded-2xl bg-primary-50/60 hover:bg-primary border border-primary-100 hover:border-primary text-navy hover:text-white transition-all flex items-center gap-2.5 group shadow-2xs"
              >
                <span className="w-8 h-8 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 shadow-2xs">
                  <IndustryIcon name={ind.icon} className="w-4 h-4" />
                </span>
                <span className="text-[14px] font-bold whitespace-nowrap">
                  {ind.name}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FinanceFintech;
