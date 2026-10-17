'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Users,
  Cpu,
  Globe,
  Play,
  X,
  Check,
  CheckCircle2,
  Target,
  Eye,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Award,
  TrendingUp,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Clock,
  Calendar,
  Briefcase,
  Send,
} from 'lucide-react';

/* ============================================================================
   IMAGE ASSETS (from generated local assets)
============================================================================ */
const TEAM_OFFICE_IMG = '/images/why_webxcode_team_office_1791104914357.jpg';
const HERO_SHOWCASE_IMG = '/images/hero_laptop_ui_showcase_1791104898778.jpg';
const PROJECT_SAAS_IMG = '/images/project_fintech_saas_ui_1791104929193.jpg';
const PROJECT_ECOM_IMG = '/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const PROJECT_AI_IMG = '/images/project_ai_enterprise_ui_1791104952051.jpg';

/* ============================================================================
   EDITABLE DATA ARRAYS
============================================================================ */
const STATS_DATA = [
  { value: 100, suffix: '+', label: 'Projects Delivered' },
  { value: 20, suffix: '+', label: 'Countries Served' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 5, suffix: '+', label: 'Years of Experience' },
];

const JOURNEY_MILESTONES = [
  {
    year: '2022',
    title: 'The Beginning',
    desc: 'Started with a simple goal — help businesses build a strong online presence with clean, high-converting websites.',
  },
  {
    year: '2023',
    title: 'Growth Phase',
    desc: 'Expanded the core engineering & design team and started working with ambitious clients across India and the US.',
  },
  {
    year: '2024',
    title: 'Global Reach',
    desc: 'Delivered 100+ custom digital products for startups, SMEs and enterprises across 20+ countries.',
  },
  {
    year: '2025',
    title: 'AI-First',
    desc: 'Launched custom AI chatbots, human-like voice agents and intelligent workflow automation services.',
  },
  {
    year: '2026',
    title: 'Looking Ahead',
    desc: 'Continuing to innovate with next-generation AI architectures, AEO/GEO search and modern cloud technologies.',
  },
];

const CORE_VALUES = [
  {
    num: '01',
    icon: HeartHandshake,
    title: 'Client Success First',
    desc: 'Your success is our success. We build long-term relationships with measurable results.',
  },
  {
    num: '02',
    icon: Sparkles,
    title: 'Innovation & Technology',
    desc: 'We keep exploring new technologies like AI and automation to deliver future-ready solutions.',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'Quality & Reliability',
    desc: 'High standards of quality, performance and security in everything we build.',
  },
  {
    num: '04',
    icon: TrendingUp,
    title: 'Growth Together',
    desc: 'We grow together with our clients, our team and our community.',
  },
];

const COMPARISON_ROWS = [
  {
    typical: 'Template-based websites',
    webxcode: 'Custom-designed, built from scratch',
  },
  {
    typical: 'Slow, outdated tech',
    webxcode: 'Modern stack (React, Next.js, AI)',
  },
  {
    typical: 'Hidden costs',
    webxcode: 'Transparent pricing',
  },
  {
    typical: 'Hand-off and disappear',
    webxcode: 'Ongoing support and maintenance',
  },
  {
    typical: 'SEO as an afterthought',
    webxcode: 'SEO-ready from day one',
  },
  {
    typical: 'No AI capabilities',
    webxcode: 'AI chatbots, agents and automation built in',
  },
];

const APPROACH_STEPS = [
  {
    num: '01',
    title: 'Listen',
    desc: 'We understand your business, goals and audience before writing a single line of code.',
  },
  {
    num: '02',
    title: 'Strategize',
    desc: 'We plan the right solution, modern tech stack and clear milestone timeline.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'We design and develop with clean, modular code and transparent weekly updates.',
  },
  {
    num: '04',
    title: 'Grow',
    desc: 'We launch smoothly, measure real conversion metrics and keep improving.',
  },
];

const TEAM_MEMBERS = [
  {
    name: 'Aarav Sharma',
    role: 'Founder & Lead Developer',
    bio: 'Full-stack Next.js & cloud systems architect',
    image: TEAM_OFFICE_IMG,
    objPos: 'object-left',
    linkedin: 'https://www.linkedin.com',
    email: 'aarav@webxcode.com',
  },
  {
    name: 'Ananya Verma',
    role: 'UI/UX Designer',
    bio: 'Design systems & conversion-first interfaces',
    image: PROJECT_ECOM_IMG,
    objPos: 'object-center',
    linkedin: 'https://www.linkedin.com',
    email: 'ananya@webxcode.com',
  },
  {
    name: 'Rohan Nair',
    role: 'SEO Specialist',
    bio: 'Technical SEO, AEO & Generative Engine Growth',
    image: PROJECT_SAAS_IMG,
    objPos: 'object-center',
    linkedin: 'https://www.linkedin.com',
    email: 'rohan@webxcode.com',
  },
  {
    name: 'Vikram Kapoor',
    role: 'Performance Marketing Lead',
    bio: 'High-ROI Google Ads & funnel attribution',
    image: HERO_SHOWCASE_IMG,
    objPos: 'object-right',
    linkedin: 'https://www.linkedin.com',
    email: 'vikram@webxcode.com',
  },
  {
    name: 'Meera Krishnan',
    role: 'Content Strategist',
    bio: 'B2B brand storytelling & high-intent copywriting',
    image: TEAM_OFFICE_IMG,
    objPos: 'object-right',
    linkedin: 'https://www.linkedin.com',
    email: 'meera@webxcode.com',
  },
  {
    name: 'Kabir Malhotra',
    role: 'AI Solutions Engineer',
    bio: 'Custom LLM RAG pipelines, chatbots & voice agents',
    image: PROJECT_AI_IMG,
    objPos: 'object-center',
    linkedin: 'https://www.linkedin.com',
    email: 'kabir@webxcode.com',
  },
];

/* ============================================================================
   SHARED UI HELPERS (strict brand tokens)
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
  <div className={`${align === 'center' ? 'text-center flex flex-col items-center' : ''} ${className}`}>
    {label && (
      <div className="mb-3.5">
        <SectionLabel dark={dark}>{label}</SectionLabel>
      </div>
    )}
    <h2
      className={`text-[28px] sm:text-[32px] lg:text-[42px] font-extrabold leading-[1.14] tracking-tight ${
        dark ? 'text-white' : 'text-navy'
      }`}
    >
      {firstPart} <span className="text-primary">{highlightPart}</span>
      {lastPart ? ` ${lastPart}` : ''}
    </h2>
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline-dark' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  showArrow?: boolean;
  iconLeft?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  to,
  showArrow = true,
  iconLeft,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses =
    'group inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

  const sizeClasses = {
    sm: 'px-4 py-2 text-[13px] gap-1.5',
    md: 'px-6 py-3 text-[15px] gap-2',
    lg: 'px-7 py-3.5 text-[16px] gap-2.5',
  }[size];

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-700 shadow-soft hover:shadow-soft-hover',
    'outline-dark':
      'border-[1.5px] border-white/35 text-white bg-transparent hover:border-white hover:bg-white/10',
    'outline-light':
      'border-[1.5px] border-primary/35 text-navy hover:border-primary hover:text-primary bg-transparent hover:bg-primary-50',
  }[variant];

  const content = (
    <>
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0"
          strokeWidth={2}
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link href={to} className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            (onClick as unknown as () => void)();
          }
        }}
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};

/* Animated Count-Up Number Component */
const AnimatedCounter: React.FC<{ target: number; suffix: string }> = ({ target, suffix }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const duration = 1200;
    const steps = 30;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

/* ============================================================================
   1. PAGE HERO (navy — 55/45 split)
============================================================================ */
const AboutHeroSection: React.FC<{ onOpenVideoModal: () => void }> = ({ onOpenVideoModal }) => {
  return (
    <section className="relative bg-navy text-white pt-10 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
      {/* Subtle grid texture & blue radial glows */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] blue-glow pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[640px] h-[640px] blue-glow-strong pointer-events-none" />

      {/* Subtle Network Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
        viewBox="0 0 1440 700"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M80 480 Q 460 180 860 380 T 1360 220"
          stroke="#0571c2"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <circle cx="460" cy="280" r="4" fill="#0571c2" />
        <circle cx="860" cy="380" r="5" fill="#0571c2" />
      </svg>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left 55% (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            {/* Breadcrumb: Home › About Us */}
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[13px] font-medium">
                <li>
                  <Link href="/" className="text-white/70 hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/40">
                  <ChevronRight className="w-3.5 h-3.5" />
                </li>
                <li className="text-primary font-bold" aria-current="page">
                  About Us
                </li>
              </ol>
            </nav>

            <h1 className="text-[36px] sm:text-[46px] lg:text-[58px] font-extrabold text-white leading-[1.08] tracking-tight mb-6">
              A Team That Builds <span className="text-primary">Digital Success</span>
            </h1>

            <p className="text-[16px] sm:text-[17px] text-white/75 leading-[1.7] max-w-2xl mb-9">
              At WebXCode, we combine technology, creativity and strategy to help businesses grow.
              We are a team of developers, designers and strategists building modern websites, web
              applications and AI-powered solutions for clients across the globe.
            </p>

            {/* 3 Inline Highlights with Blue Icons in Translucent Circles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              {[
                { icon: Users, label: 'Client-First Approach' },
                { icon: Cpu, label: 'Innovation Driven' },
                { icon: Globe, label: 'Global Perspective' },
              ].map((item) => {
                const IconComp = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-primary/20 border border-primary/35 text-primary flex items-center justify-center shrink-0">
                      <IconComp className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-[14px] font-bold text-white leading-snug">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right 45% (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="lg:col-span-5 relative"
          >
            {/* Handwritten Caveat Annotation */}
            <div className="hidden sm:flex flex-col items-end absolute -top-11 right-2 z-20 pointer-events-none">
              <span
                className="text-[22px] leading-tight text-white -rotate-3 select-none"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Building digital solutions for a better tomorrow
              </span>
              <svg
                width="52"
                height="38"
                viewBox="0 0 52 38"
                fill="none"
                className="text-primary -mt-1 mr-6"
                aria-hidden="true"
              >
                <path
                  d="M38 4 C 42 16, 30 28, 10 32"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="3 3"
                />
                <path
                  d="M15 27 L 8 32 L 16 36"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Large Rounded Office/Team Image with Glowing Wall Logo Overlay */}
            <div className="relative rounded-[20px] p-2.5 bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-2xl">
              <div className="relative rounded-[16px] overflow-hidden aspect-[4/3] bg-navy">
                <img
                  src={TEAM_OFFICE_IMG}
                  alt="WebXCode engineering and creative team collaborating in studio"
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-navy/20" />

                {/* Glowing WebXCode Logo Badge on Studio Wall */}
                <div className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-navy/85 border border-primary/50 shadow-[0_0_25px_rgba(5,113,194,0.6)] backdrop-blur-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[14px] font-extrabold tracking-tight text-white">
                    Web<span className="text-primary">X</span>Code Studio
                  </span>
                </div>
              </div>

              {/* Floating Frosted Glass Video Trigger Card (bottom-left) */}
              <button
                type="button"
                onClick={onOpenVideoModal}
                className="group mt-3 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-5 z-20 w-full sm:w-auto px-4 py-3 rounded-[18px] bg-navy/90 sm:bg-white/[0.12] border border-white/25 backdrop-blur-xl shadow-2xl flex items-center gap-3.5 text-left hover:border-primary transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </span>
                <div>
                  <div className="text-[14px] font-bold text-white group-hover:text-primary transition-colors">
                    Our Story — Watch Video (1:30)
                  </div>
                  <div className="text-[12px] text-white/70">
                    Inside our engineering culture & vision
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Soft Curved Divider into White Section */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-[36px] sm:h-[52px]"
          viewBox="0 0 1440 52"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,0 C480,52 960,52 1440,0 L1440,52 L0,52 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
};

/* ============================================================================
   2. WHO WE ARE (white — overlapping diagonal image collage + content)
============================================================================ */
const WhoWeAreSection: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  const checklist = [
    'Custom-built solutions',
    'Transparent communication',
    'On-time delivery',
    'Long-term support',
  ];

  return (
    <section className="bg-white py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Overlapping Diagonal Image Collage */}
          <div className="lg:col-span-6 relative pb-8 sm:pb-14 sm:pr-10">
            {/* Main Large Image */}
            <div className="rounded-[20px] overflow-hidden border border-navy-08 shadow-soft aspect-[4/3] bg-navy">
              <img
                src={TEAM_OFFICE_IMG}
                alt="WebXCode developers and strategists planning digital architecture"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Smaller Overlapping Image (bottom-right) */}
            <div className="hidden sm:block absolute bottom-0 right-0 w-[56%] rounded-[20px] overflow-hidden border-4 border-white shadow-2xl aspect-[16/11] bg-navy">
              <img
                src={HERO_SHOWCASE_IMG}
                alt="Modern web and AI interface crafted by WebXCode"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping Navy Badge Card */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-6 sm:left-4 bg-navy text-white px-5 py-4 rounded-[18px] shadow-xl border border-white/10 inline-flex items-center gap-3 z-10">
              <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-extrabold text-[14px] shrink-0">
                2022
              </span>
              <div>
                <div className="text-[14px] font-bold text-white leading-snug">
                  Since 2022 — Building for the Web
                </div>
                <div className="text-[12px] text-white/70">India • USA • Global Delivery</div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6">
            <SectionHeading
              label="WHO WE ARE"
              firstPart="Your Trusted Partner in"
              highlightPart="Digital Growth"
              className="mb-5"
            />

            <p className="text-[16px] text-navy-70 leading-[1.7] mb-4">
              WebXCode is a full-service web development, SEO and AI solutions company dedicated to
              helping modern businesses establish a commanding digital presence. Whether you are a
              fast-moving startup, a growing SME or an established global enterprise, we engineer
              products that solve real business problems.
            </p>
            <p className="text-[16px] text-navy-70 leading-[1.7] mb-7">
              Every project we take on is guided by three core principles: uncompromising code
              quality, lightning-fast execution speed and measurable growth outcomes that directly
              impact your bottom line.
            </p>

            {/* 2-Column Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-9">
              {checklist.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-[15px] font-bold text-navy">{item}</span>
                </div>
              ))}
            </div>

            {/* Buttons: Primary "Work With Us →" + text link "See Our Work →" */}
            <div className="flex flex-wrap items-center gap-6">
              <Button size="lg" onClick={() => onOpenQuoteModal('Work With WebXCode')}>
                Work With Us
              </Button>
              <Link
                href="/our-work"
                className="group inline-flex items-center gap-2 text-[15px] font-bold text-navy hover:text-primary transition-colors"
              >
                <span>See Our Work</span>
                <ArrowRight className="w-4 h-4 text-primary transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   3. NUMBERS THAT DEFINE US (light blue tint — wide white panel with 4 stats)
============================================================================ */
const NumbersSection: React.FC = () => {
  return (
    <section className="bg-primary-50 py-[72px] lg:py-[96px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          label="BY THE NUMBERS"
          firstPart="Numbers That"
          highlightPart="Define Us"
          className="mb-10"
        />

        <div className="bg-white rounded-[20px] border border-navy-08 shadow-soft p-8 sm:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-navy-08">
            {STATS_DATA.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center py-6 sm:py-2 ${
                  idx > 0 ? 'sm:px-6' : 'sm:pr-6'
                }`}
              >
                <div className="text-[48px] lg:text-[56px] font-extrabold text-primary leading-none mb-2.5">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[15px] font-bold text-navy-70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   4. MISSION, VISION & PROMISE (white — 3 tall vertical panels side by side)
============================================================================ */
const MissionVisionPromiseSection: React.FC = () => {
  return (
    <section className="bg-white py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          label="OUR PURPOSE"
          firstPart="Mission, Vision &"
          highlightPart="Our Promise"
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {/* Panel 1: Mission (White card, thin border, blue icon) */}
          <div className="group relative bg-white rounded-[20px] p-8 sm:p-10 border border-navy-08 shadow-soft transition-all duration-200 hover:-translate-y-1.5 hover:border-primary-100 flex flex-col justify-between overflow-hidden">
            <span
              className="absolute -bottom-4 -right-2 text-[110px] font-extrabold text-navy/[0.04] leading-none select-none pointer-events-none"
              aria-hidden="true"
            >
              01
            </span>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mb-6">
                <Target className="w-7 h-7" strokeWidth={1.75} />
              </div>
              <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-primary mb-2">
                OUR MISSION
              </div>
              <h3 className="text-[24px] font-extrabold text-navy mb-4">Empowering Real Impact</h3>
              <p className="text-[16px] text-navy-70 leading-[1.7]">
                “To empower businesses with innovative digital solutions that create real impact.”
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-navy-08 text-[13px] font-semibold text-navy-50">
              Strategy • Engineering • Outcomes
            </div>
          </div>

          {/* Panel 2: Vision (Solid #0571c2, white text, slightly taller featured card) */}
          <div className="group relative bg-primary text-white rounded-[20px] p-8 sm:p-10 shadow-xl lg:-my-4 transition-all duration-200 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
            <span
              className="absolute -bottom-4 -right-2 text-[110px] font-extrabold text-white/[0.1] leading-none select-none pointer-events-none"
              aria-hidden="true"
            >
              02
            </span>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/15 text-white flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" strokeWidth={1.75} />
              </div>
              <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                OUR VISION
              </div>
              <h3 className="text-[24px] font-extrabold text-white mb-4">
                Globally Trusted Partner
              </h3>
              <p className="text-[16px] text-white/90 leading-[1.7]">
                “To be a globally trusted technology partner known for quality, innovation and
                long-term client success.”
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/20 text-[13px] font-semibold text-white/85">
              India • USA • 20+ Countries
            </div>
          </div>

          {/* Panel 3: Promise (Navy card with white text) */}
          <div className="group relative bg-navy text-white rounded-[20px] p-8 sm:p-10 shadow-soft transition-all duration-200 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
            <span
              className="absolute -bottom-4 -right-2 text-[110px] font-extrabold text-white/[0.05] leading-none select-none pointer-events-none"
              aria-hidden="true"
            >
              03
            </span>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center mb-6">
                <Award className="w-7 h-7" strokeWidth={1.75} />
              </div>
              <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-primary mb-2">
                OUR PROMISE
              </div>
              <h3 className="text-[24px] font-extrabold text-white mb-4">
                Measurable Excellence
              </h3>
              <p className="text-[16px] text-white/80 leading-[1.7]">
                “Honest advice, clean code and results you can measure — on every project.”
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-[13px] font-semibold text-white/60">
              100% Transparency Guaranteed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   5. OUR JOURNEY (navy — vertical alternating timeline)
============================================================================ */
const OurJourneySection: React.FC = () => {
  return (
    <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[720px] blue-glow pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          dark
          align="center"
          label="OUR JOURNEY"
          firstPart="From a Small Idea to a"
          highlightPart="Global Agency"
          className="mb-16"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Glowing Blue Center Line (left on mobile, center on desktop) */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[2px] md:-translate-x-1/2 bg-white/15 overflow-hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="w-full h-full bg-primary origin-top shadow-[0_0_12px_#0571c2]"
            />
          </div>

          <div className="space-y-10">
            {JOURNEY_MILESTONES.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Card Column */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="p-6 sm:p-7 rounded-[20px] bg-white/[0.06] border border-white/15 backdrop-blur-md hover:border-primary/60 transition-colors">
                      <div className="text-[28px] sm:text-[32px] font-extrabold text-primary leading-none tabular-nums mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-[20px] font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-[15px] text-white/75 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Center Glowing Node */}
                  <div className="absolute left-4 md:left-1/2 top-7 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-navy shadow-[0_0_0_4px_rgba(5,113,194,0.35)] z-10" />

                  {/* Empty Half Spacer on Desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   6. CORE VALUES (white — 2x2 large horizontal cards)
============================================================================ */
const CoreValuesSection: React.FC = () => {
  return (
    <section className="bg-white py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="OUR VALUES"
            firstPart="What"
            highlightPart="Drives Us"
          />
          <p className="text-[16px] text-navy-70 max-w-md lg:text-right">
            The core engineering and human principles that guide every decision, sprint and client
            partnership at WebXCode.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {CORE_VALUES.map((val) => {
            const IconComp = val.icon;
            return (
              <div
                key={val.num}
                className="group relative bg-white rounded-[20px] p-7 sm:p-8 border border-navy-08 shadow-soft hover:border-primary hover:shadow-soft-hover hover:-translate-y-1 transition-all duration-200 flex items-start gap-5 overflow-hidden"
              >
                {/* Faint Number in Top-Right Corner */}
                <span
                  className="absolute top-4 right-6 text-[44px] font-extrabold text-navy/[0.06] group-hover:text-primary/15 transition-colors leading-none tabular-nums select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {val.num}
                </span>

                <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 flex items-center justify-center shrink-0">
                  <IconComp className="w-7 h-7" strokeWidth={1.75} />
                </div>

                <div className="pr-10">
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-navy group-hover:text-primary transition-colors mb-2">
                    {val.title}
                  </h3>
                  <p className="text-[15px] sm:text-[16px] text-navy-70 leading-[1.65]">
                    {val.desc}
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
   7. WHAT MAKES US DIFFERENT (light blue tint — comparison table)
============================================================================ */
const WhatMakesUsDifferentSection: React.FC = () => {
  return (
    <section className="bg-primary-50 py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          label="WHY WEBXCODE"
          firstPart="Not Just Another"
          highlightPart="Agency"
          className="mb-12"
        />

        <div className="max-w-4xl mx-auto">
          {/* Desktop / Tablet Two-Column Comparison Table */}
          <div className="hidden sm:grid sm:grid-cols-2 rounded-[20px] overflow-hidden shadow-soft border border-navy-08 bg-white">
            {/* Left Column: Typical Agency */}
            <div className="border-r border-navy-08">
              <div className="px-7 py-5 bg-navy/[0.03] border-b border-navy-08">
                <h3 className="text-[18px] font-bold text-navy/60">Typical Agency</h3>
              </div>
              <div className="divide-y divide-navy-08">
                {COMPARISON_ROWS.map((row) => (
                  <div
                    key={row.typical}
                    className="px-7 py-4.5 flex items-center gap-3.5 text-[15px] font-medium text-navy-50"
                  >
                    <span className="w-6 h-6 rounded-full bg-navy/5 text-navy-50 flex items-center justify-center shrink-0">
                      <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </span>
                    <span>{row.typical}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: WebXCode (Highlighted with blue top border & light glow) */}
            <div className="border-t-4 border-t-primary bg-primary-50/40 relative">
              <div className="px-7 py-5 bg-primary-50 border-b border-primary-100 flex items-center justify-between">
                <h3 className="text-[18px] font-extrabold text-navy">
                  Web<span className="text-primary">X</span>Code
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider">
                  Recommended
                </span>
              </div>
              <div className="divide-y divide-primary-100/60">
                {COMPARISON_ROWS.map((row) => (
                  <div
                    key={row.webxcode}
                    className="px-7 py-4.5 flex items-center gap-3.5 text-[15px] font-bold text-navy"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </span>
                    <span>{row.webxcode}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Stacked Rows */}
          <div className="sm:hidden space-y-4">
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.webxcode}
                className="bg-white rounded-[20px] p-5 border border-navy-08 shadow-soft space-y-3"
              >
                <div className="flex items-center gap-2.5 text-[14px] text-navy-50">
                  <span className="w-5 h-5 rounded-full bg-navy/5 text-navy-50 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3" strokeWidth={2.5} />
                  </span>
                  <span>
                    <strong className="font-semibold text-navy/60">Typical Agency:</strong>{' '}
                    {row.typical}
                  </span>
                </div>
                <div className="pt-2.5 border-t border-navy-08 flex items-center gap-2.5 text-[15px] font-bold text-navy">
                  <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  </span>
                  <span>
                    <strong className="text-primary">WebXCode:</strong> {row.webxcode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   8. OUR APPROACH (white — id="approach", 4 staggered blocks + curved dashed line)
============================================================================ */
const OurApproachSection: React.FC = () => {
  return (
    <section id="approach" className="bg-white py-[72px] lg:py-[112px] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          label="HOW WE WORK"
          firstPart="A Process Built on"
          highlightPart="Clarity"
          className="mb-14"
        />

        <div className="relative">
          {/* Soft Curved Dashed Line Connecting Blocks on Desktop */}
          <svg
            className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 w-full h-36 pointer-events-none z-0"
            viewBox="0 0 1200 140"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M 120 35 C 280 35, 320 105, 460 105 C 600 105, 640 35, 780 35 C 920 35, 960 105, 1100 105"
              stroke="#0571c2"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeOpacity="0.45"
            />
          </svg>

          {/* 4 Staggered Blocks (2nd and 4th offset lower on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 relative z-10">
            {APPROACH_STEPS.map((step, idx) => {
              const isStaggered = idx % 2 === 1;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className={`bg-white rounded-[20px] p-7 border border-navy-08 shadow-soft hover:border-primary hover:-translate-y-1.5 transition-all duration-200 ${
                    isStaggered ? 'lg:mt-12' : 'lg:mb-12'
                  }`}
                >
                  {/* Big Outlined Number (Stroke Only in #0571c2) */}
                  <div
                    className="text-[54px] font-extrabold leading-none mb-4 select-none tabular-nums"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '2px #0571c2',
                    }}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-[21px] font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-[15px] text-navy-70 leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   9. MEET THE TEAM (light blue tint — id="team", left sticky intro + 6 team cards)
============================================================================ */
const MeetTheTeamSection: React.FC = () => {
  return (
    <section id="team" className="bg-primary-50 py-[72px] lg:py-[112px] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Intro Block (Sticky on Desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <SectionHeading
              label="OUR TEAM"
              firstPart="Meet the People Behind"
              highlightPart="WebXCode"
              className="mb-4"
            />
            <p className="text-[16px] text-navy-70 leading-[1.7] mb-8">
              We are a passionate collective of senior full-stack developers, UI/UX designers, SEO
              strategists and AI engineers united by a love for clean craft and measurable client
              growth.
            </p>
            <Button size="lg" href="#careers">
              Join Our Team
            </Button>
          </div>

          {/* Right: 6 Team Cards Grid (3 cols desktop, 2 tablet, 1-2 mobile) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="group bg-white rounded-[20px] p-4 border border-navy-08 shadow-soft hover:border-primary-100 hover:shadow-soft-hover transition-all duration-200"
              >
                {/* Portrait Container */}
                <div className="relative rounded-[16px] overflow-hidden aspect-[3/4] bg-navy mb-4">
                  <img
                    src={member.image}
                    alt={`${member.name} — ${member.role} at WebXCode`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover ${member.objPos} transition-transform duration-500 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />

                  {/* Initials Monogram Badge top-left */}
                  <span className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-navy/80 border border-white/15 backdrop-blur-md text-white text-[12px] font-extrabold flex items-center justify-center">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>

                  {/* Hover Blue Gradient Overlay Sliding Up from Bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-primary via-primary/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-white pr-2 line-clamp-1">
                      {member.bio}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                        className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                        className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Name, Role & LinkedIn Icon */}
                <div className="flex items-center justify-between gap-2 px-1">
                  <div>
                    <h3 className="text-[17px] font-bold text-navy group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[13px] font-medium text-navy-70">{member.role}</p>
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} LinkedIn profile`}
                    className="w-9 h-9 rounded-full bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center shrink-0"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   10. LIFE AT WEBXCODE (white — masonry photo & quote tile gallery)
============================================================================ */
const LifeAtWebXCodeSection: React.FC = () => {
  return (
    <section className="bg-white py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          label="OUR CULTURE"
          firstPart="Where Ideas"
          highlightPart="Come to Life"
          className="mb-12"
        />

        {/* 7-Tile Asymmetric Bento / Masonry Photo & Culture Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[220px]">
          {/* Tile 1: Tall Team Discussions (spans 2 rows) */}
          <div className="group relative rounded-[20px] overflow-hidden sm:row-span-2 bg-navy border border-navy-08">
            <img
              src={TEAM_OFFICE_IMG}
              alt="WebXCode engineering team architecture discussion"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                  COLLABORATION
                </div>
                <h3 className="text-[18px] font-bold text-white">
                  Weekly Architecture & Sprint Reviews
                </h3>
              </div>
            </div>
          </div>

          {/* Tile 2: Navy Text Tile ("Learning every day") */}
          <div className="rounded-[20px] bg-navy text-white p-7 flex flex-col justify-between relative overflow-hidden shadow-soft">
            <div className="absolute -right-8 -top-8 w-32 h-32 blue-glow-strong pointer-events-none" />
            <Sparkles className="w-7 h-7 text-primary relative z-10" />
            <div className="relative z-10">
              <div className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
                MINDSET 01
              </div>
              <h3 className="text-[24px] font-extrabold text-white leading-tight">
                “Learning every day”
              </h3>
            </div>
          </div>

          {/* Tile 3: Wide Workspace Photo (spans 2 cols) */}
          <div className="group relative rounded-[20px] overflow-hidden sm:col-span-2 bg-navy border border-navy-08">
            <img
              src={HERO_SHOWCASE_IMG}
              alt="High-performance multi-device product lab at WebXCode"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                  CRAFT & LABS
                </div>
                <h3 className="text-[18px] font-bold text-white">
                  Building High-Speed Web & AI Products
                </h3>
              </div>
            </div>
          </div>

          {/* Tile 4: Design & Prototyping Photo */}
          <div className="group relative rounded-[20px] overflow-hidden bg-navy border border-navy-08">
            <img
              src={PROJECT_ECOM_IMG}
              alt="UI/UX design critiques and minimalist brand systems"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-5">
              <h3 className="text-[16px] font-bold text-white">Design Systems Studio</h3>
            </div>
          </div>

          {/* Tile 5: Solid Primary Blue Text Tile ("Ideas over hierarchy") */}
          <div className="rounded-[20px] bg-primary text-white p-7 flex flex-col justify-between shadow-soft">
            <Users className="w-7 h-7 text-white" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1">
                MINDSET 02
              </div>
              <h3 className="text-[24px] font-extrabold text-white leading-tight">
                “Ideas over hierarchy”
              </h3>
            </div>
          </div>

          {/* Tile 6: AI & Innovation Lab Photo (spans 2 cols) */}
          <div className="group relative rounded-[20px] overflow-hidden sm:col-span-2 bg-navy border border-navy-08">
            <img
              src={PROJECT_AI_IMG}
              alt="AI automation hackathons and LLM research sessions"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                  INNOVATION FRIDAYS
                </div>
                <h3 className="text-[18px] font-bold text-white">
                  AI Agents, Voice Bots & LLM Hackathons
                </h3>
              </div>
            </div>
          </div>

          {/* Tile 7: Celebrations & Launches Photo (spans 2 cols) */}
          <div className="group relative rounded-[20px] overflow-hidden sm:col-span-2 bg-navy border border-navy-08">
            <img
              src={PROJECT_SAAS_IMG}
              alt="Celebrating global client product launches"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                  MILESTONES
                </div>
                <h3 className="text-[18px] font-bold text-white">
                  Celebrating 100+ Global Client Launches
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   11. GLOBAL PRESENCE (navy — dotted world map with glowing blue pulse markers + 2 office cards)
============================================================================ */
const GlobalPresenceSection: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  const markers = [
    { name: 'India HQ', x: 690, y: 230, primary: true },
    { name: 'USA Office', x: 230, y: 185, primary: true },
    { name: 'Canada', x: 210, y: 125, primary: false },
    { name: 'UK', x: 475, y: 135, primary: false },
    { name: 'UAE', x: 605, y: 225, primary: false },
    { name: 'Singapore', x: 765, y: 285, primary: false },
    { name: 'Australia', x: 845, y: 365, primary: false },
  ];

  return (
    <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] blue-glow pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          dark
          align="center"
          label="WHERE WE WORK"
          firstPart="Global Clients,"
          highlightPart="Local Support"
          className="mb-12"
        />

        {/* Large Dotted World Map Container */}
        <div className="relative rounded-[24px] bg-white/[0.04] border border-white/10 p-4 sm:p-8 mb-10 overflow-hidden">
          {/* Dotted Matrix Background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#0571c2 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px',
            }}
          />

          <svg
            viewBox="0 0 1000 460"
            className="w-full h-auto relative z-10"
            fill="none"
            aria-label="Global presence map showing India HQ connected to USA, UK, UAE, Canada, Australia and Singapore"
          >
            {/* Stylized Continental Silhouettes in subtle navy/white tint */}
            <g fill="#ffffff" fillOpacity="0.06">
              {/* North America */}
              <path d="M110 80 Q220 60 290 140 T240 240 L150 210 Z" />
              {/* South America */}
              <path d="M260 260 Q320 270 330 350 T280 420 L250 340 Z" />
              {/* Europe */}
              <path d="M440 90 Q520 80 560 140 T470 175 Z" />
              {/* Africa */}
              <path d="M450 195 Q540 190 570 280 T510 380 L450 290 Z" />
              {/* Asia & India */}
              <path d="M570 95 Q760 80 840 180 T740 295 L660 265 L600 230 Z" />
              {/* Australia */}
              <path d="M780 325 Q860 315 890 375 T810 405 Z" />
            </g>

            {/* Curved Blue Connection Arcs from India (690, 230) to Global Hubs */}
            <g stroke="#0571c2" strokeWidth="1.75" strokeDasharray="5 5" strokeOpacity="0.75">
              {/* India -> USA */}
              <path d="M690 230 Q460 50 230 185" />
              {/* India -> Canada */}
              <path d="M690 230 Q450 25 210 125" />
              {/* India -> UK */}
              <path d="M690 230 Q580 110 475 135" />
              {/* India -> UAE */}
              <path d="M690 230 Q645 205 605 225" />
              {/* India -> Singapore */}
              <path d="M690 230 Q735 245 765 285" />
              {/* India -> Australia */}
              <path d="M690 230 Q790 275 845 365" />
            </g>

            {/* Glowing Pulse Markers */}
            {markers.map((m) => (
              <g key={m.name} transform={`translate(${m.x}, ${m.y})`}>
                {m.primary && (
                  <circle
                    r="18"
                    fill="#0571c2"
                    fillOpacity="0.28"
                    className="animate-ping [animation-duration:3s]"
                  />
                )}
                <circle
                  r={m.primary ? '9' : '6'}
                  fill="#0571c2"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <rect
                  x="-42"
                  y={m.primary ? '14' : '11'}
                  width="84"
                  height="22"
                  rx="11"
                  fill="#1e242e"
                  stroke="#0571c2"
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y={m.primary ? '29' : '26'}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="700"
                >
                  {m.name}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* 2 Glass Office Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* India Office */}
          <div className="p-7 sm:p-8 rounded-[20px] bg-white/[0.06] border border-white/15 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-[11px] font-bold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Engineering & Delivery HQ</span>
              </div>
              <h3 className="text-[22px] font-extrabold text-white mb-4">India Office</h3>
              <div className="space-y-3 text-[15px] text-white/75">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Plot C-24, Sector 62, Noida (Delhi NCR), Uttar Pradesh 201309, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:+919876543210" className="hover:text-white transition-colors">
                    +91 98765 43210
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <span>Mon – Sat: 9:30 AM – 7:30 PM IST</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-white/10">
              <button
                type="button"
                onClick={() => onOpenQuoteModal('Visit India Office / Consultation')}
                className="group inline-flex items-center gap-2 text-[14px] font-bold text-primary hover:text-white transition-colors cursor-pointer"
              >
                <span>Get Directions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* US Office */}
          <div className="p-7 sm:p-8 rounded-[20px] bg-white/[0.06] border border-white/15 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-[11px] font-bold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>North America Client Hub</span>
              </div>
              <h3 className="text-[22px] font-extrabold text-white mb-4">US Office</h3>
              <div className="space-y-3 text-[15px] text-white/75">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>600 Congress Ave, Suite 1400, Austin, TX 78701, United States</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:+18009329263" className="hover:text-white transition-colors">
                    +1 (800) 932-9263
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <span>Mon – Fri: 9:00 AM – 6:00 PM CST / EST</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-white/10">
              <button
                type="button"
                onClick={() => onOpenQuoteModal('US Office Strategy Call')}
                className="group inline-flex items-center gap-2 text-[14px] font-bold text-primary hover:text-white transition-colors cursor-pointer"
              >
                <span>Get Directions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   12. CAREERS TEASER (white — id="careers", horizontal rounded light-blue banner)
============================================================================ */
const CareersTeaserSection: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  return (
    <section id="careers" className="bg-white py-[72px] lg:py-[96px] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-[24px] bg-primary-50 border border-primary-100 p-8 sm:p-12 lg:p-14 overflow-hidden">
          {/* Decorative Blue Shapes on the Right */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-primary/10 pointer-events-none" />
          <div className="absolute right-12 -bottom-20 w-52 h-52 rounded-full bg-primary/15 pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl">
              <SectionHeading
                label="CAREERS"
                firstPart="Want to"
                highlightPart="Build With Us?"
                className="mb-3"
              />
              <p className="text-[16px] sm:text-[17px] text-navy-70 leading-relaxed">
                We're always looking for talented developers, designers and marketers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Button
                size="lg"
                onClick={() => onOpenQuoteModal('Careers — Open Positions')}
              >
                View Open Positions
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                showArrow={false}
                iconLeft={<Briefcase className="w-4 h-4 text-primary" />}
                onClick={() => onOpenQuoteModal('Careers — Send Resume')}
              >
                Send Your Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   13. FINAL CTA (navy, inside rounded 28px container)
============================================================================ */
const AboutFinalCTASection: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-[28px] bg-navy text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-[520px] h-[520px] blue-glow-strong pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-[420px] h-[420px] blue-glow pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-8">
              <SectionHeading
                dark
                label="LET'S BUILD TOGETHER"
                firstPart="Ready to Work With a Team That Cares About"
                highlightPart="Your Success?"
                className="mb-4"
              />
              <p className="text-[16px] sm:text-[18px] text-white/80 leading-relaxed max-w-2xl mb-8">
                Whether you're a startup, a growing business or an enterprise, we're here to help
                you reach your digital goals.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" onClick={() => onOpenQuoteModal('Free Project Quote')}>
                  Get a Free Quote
                </Button>
                <Button
                  variant="outline-dark"
                  size="lg"
                  showArrow={false}
                  iconLeft={<Calendar className="w-4 h-4 text-primary" />}
                  onClick={() => onOpenQuoteModal('Schedule a Strategy Call')}
                >
                  Schedule a Call
                </Button>
              </div>
            </div>

            {/* Faint Globe / Network Illustration on the Right */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping [animation-duration:4s]" />
                <div className="absolute inset-4 rounded-full border border-primary/45" />
                <div className="absolute inset-10 rounded-full bg-primary/15 border border-primary/40 backdrop-blur-md flex items-center justify-center">
                  <Globe className="w-20 h-20 text-primary" strokeWidth={1.25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   VIDEO MODAL ("Our Story — Watch Video (1:30)")
============================================================================ */
const StoryVideoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: (service?: string) => void;
}> = ({ isOpen, onClose, onOpenQuoteModal }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-navy/85 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="bg-navy text-white rounded-[24px] max-w-3xl w-full overflow-hidden border border-white/20 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <h3 id="video-modal-title" className="text-[15px] font-bold text-white">
              WebXCode — Our Story & Engineering Culture (1:30)
            </h3>
          </div>
          <button
            type="button"
            aria-label="Close video modal"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 text-white hover:bg-primary transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulated Studio Reel Player */}
        <div className="relative aspect-video bg-navy overflow-hidden flex items-center justify-center">
          <img
            src={TEAM_OFFICE_IMG}
            alt="WebXCode Studio Showreel"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
          <div className="relative z-10 text-center max-w-lg px-6">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(5,113,194,0.8)]">
              <Play className="w-7 h-7 fill-white ml-0.5" />
            </div>
            <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
              2022 – 2026 SHOWREEL
            </div>
            <h4 className="text-[22px] sm:text-[26px] font-extrabold text-white mb-2">
              Ideas. Code. Measurable Growth.
            </h4>
            <p className="text-[14px] text-white/75 leading-relaxed mb-6">
              From a boutique development studio to a global web, SEO & AI partner serving 100+
              brands across India, the USA and 20+ countries.
            </p>
            <Button
              size="md"
              onClick={() => {
                onClose();
                onOpenQuoteModal('Start a Project with WebXCode');
              }}
            >
              Work With Our Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   MAIN ABOUT PAGE EXPORT
============================================================================ */
interface AboutProps {
  onOpenQuoteModal?: (service?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenQuoteModal: propOpenQuoteModal }) => {
  const quoteModalCtx = useQuoteModal();
  const onOpenQuoteModal = propOpenQuoteModal || quoteModalCtx?.openQuoteModal;
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleOpenQuote = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: service }));
    }
  };

  /* Update SEO Document Title & Meta Description on Route Mount */
  useEffect(() => {
    document.title = 'About Us | WebXCode — Web Development, SEO & AI Solutions';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Meet the team behind WebXCode. Learn about our mission, values, 4-step clarity process, and global web development, SEO, and AI engineering offices in India and the US.'
      );
    }
  }, []);

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://webxcode.com/about#aboutpage',
        url: 'https://webxcode.com/about',
        name: 'About Us | WebXCode — Web Development, SEO & AI Solutions',
        description:
          'At WebXCode, we combine technology, creativity and strategy to help businesses grow with modern websites, web applications and AI-powered solutions.',
        mainEntity: {
          '@id': 'https://webxcode.com/#organization',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://webxcode.com/#organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
        foundingDate: '2022',
        slogan: 'Ideas | Code | Growth',
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          minValue: 25,
          maxValue: 60,
        },
      },
    ],
  };

  return (
    <main className="flex-1">
      {/* JSON-LD Structured Data for AboutPage + Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* 1. Page Hero (navy) */}
      <AboutHeroSection onOpenVideoModal={() => setVideoModalOpen(true)} />

      {/* 2. Who We Are (white) */}
      <WhoWeAreSection onOpenQuoteModal={handleOpenQuote} />

      {/* 3. Numbers That Define Us (light blue tint) */}
      <NumbersSection />

      {/* 4. Mission, Vision & Promise (white) */}
      <MissionVisionPromiseSection />

      {/* 5. Our Journey (navy) */}
      <OurJourneySection />

      {/* 6. Core Values (white) */}
      <CoreValuesSection />

      {/* 7. What Makes Us Different (light blue tint) */}
      <WhatMakesUsDifferentSection />

      {/* 8. Our Approach (white — #approach) */}
      <OurApproachSection />

      {/* 9. Meet The Team (light blue tint — #team) */}
      <MeetTheTeamSection />

      {/* 10. Life At WebXCode (white) */}
      <LifeAtWebXCodeSection />

      {/* 11. Global Presence (navy) */}
      <GlobalPresenceSection onOpenQuoteModal={handleOpenQuote} />

      {/* 12. Careers Teaser (white — #careers) */}
      <CareersTeaserSection onOpenQuoteModal={handleOpenQuote} />

      {/* 13. Final CTA (navy rounded container) */}
      <AboutFinalCTASection onOpenQuoteModal={handleOpenQuote} />

      {/* Interactive Story Video Modal */}
      <StoryVideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onOpenQuoteModal={handleOpenQuote}
      />
    </main>
  );
};

export default About;

