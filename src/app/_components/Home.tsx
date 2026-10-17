'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Layers,
  Globe,
  Star,
  Award,
  Code2,
  Cpu,
  ShoppingCart,
  TrendingUp,
  Bot,
  MessageSquare,
  Mic,
  Workflow,
  Send,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Users,
  Code,
  BadgeDollarSign,
  Headphones,
  Search,
  PenTool,
  Terminal,
  Rocket,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Plane,
  Building,
  HeartPulse,
  GraduationCap,
  Landmark,
  Factory,
  ArrowUpRight,
  Quote,
  Plus,
  Minus,
  Check,
  X,
} from 'lucide-react';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';

// ─── Shared UI Primitives ────────────────────────────────────────────────────

interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, dark = false }) => {
  return (
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
};

interface SectionHeadingProps {
  label?: string;
  firstPart: string;
  highlightPart: string;
  lastPart?: string;
  dark?: boolean;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  firstPart,
  highlightPart,
  lastPart,
  dark = false,
  align = 'left',
  className = '',
}) => {
  return (
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
        {firstPart}{' '}
        <span className="text-primary">{highlightPart}</span>
        {lastPart ? ` ${lastPart}` : ''}
      </h2>
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline-dark' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  showArrow?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  showArrow = true,
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
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0"
          strokeWidth={2}
        />
      )}
    </>
  );

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

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  dark?: boolean;
}

export const StatItem: React.FC<StatItemProps> = ({ icon, value, label, dark = true }) => {
  return (
    <div className="flex items-center gap-3.5">
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
          dark
            ? 'bg-primary/15 border border-primary/30 text-primary'
            : 'bg-primary-50 border border-primary-100 text-primary'
        }`}
      >
        {icon}
      </div>
      <div>
        <div
          className={`text-[22px] sm:text-[24px] font-extrabold leading-none tabular-nums ${
            dark ? 'text-white' : 'text-navy'
          }`}
        >
          {value}
        </div>
        <div
          className={`text-[12px] sm:text-[13px] mt-1 font-medium ${
            dark ? 'text-white/70' : 'text-navy-70'
          }`}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets?: string[];
  linkTo?: string;
  linkText?: string;
  className?: string;
  onAction?: () => void;
  children?: React.ReactNode;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  bullets,
  linkTo,
  linkText = 'Explore Service',
  className = '',
  onAction,
  children,
}) => {
  const cardBody = (
    <>
      <div>
        <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mb-5 transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
          {icon}
        </div>
        <h3 className="text-[20px] sm:text-[22px] font-bold text-navy leading-snug mb-2.5 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-[15px] sm:text-[16px] text-navy-70 leading-[1.65]">{description}</p>

        {bullets && bullets.length > 0 && (
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {bullets.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[14px] font-medium text-navy-90">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {children}
      </div>

      <div className="mt-6 flex items-center justify-between pt-2">
        <span className="text-[13px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {linkText}
        </span>
        <span
          aria-label={`Explore ${title}`}
          className="w-9 h-9 rounded-full bg-primary-50 text-primary flex items-center justify-center transition-all duration-200 group-hover:bg-primary group-hover:text-white"
        >
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </>
  );

  if (linkTo) {
    return (
      <Link
        href={linkTo}
        className={`group relative bg-white rounded-[20px] p-6 sm:p-7 border border-navy-08 shadow-soft transition-all duration-200 hover:-translate-y-1.5 hover:shadow-soft-hover hover:border-primary-100 flex flex-col justify-between cursor-pointer ${className}`}
      >
        {cardBody}
      </Link>
    );
  }

  return (
    <div
      onClick={onAction}
      className={`group relative bg-white rounded-[20px] p-6 sm:p-7 border border-navy-08 shadow-soft transition-all duration-200 hover:-translate-y-1.5 hover:shadow-soft-hover hover:border-primary-100 flex flex-col justify-between cursor-pointer ${className}`}
    >
      {cardBody}
    </div>
  );
};

// ─── Asset paths (Next.js public folder) ────────────────────────────────────
const HERO_IMG = '/assets/images/hero_laptop_ui_showcase_1791104898778.jpg';
const TEAM_IMG = '/assets/images/why_webxcode_team_office_1791104914357.jpg';
const PROJECT_SAAS_IMG = '/assets/images/project_fintech_saas_ui_1791104929193.jpg';
const PROJECT_ECOM_IMG = '/assets/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const PROJECT_AI_IMG = '/assets/images/project_ai_enterprise_ui_1791104952051.jpg';
const BLOG_IMG_1 = '/assets/images/project_ai_enterprise_ui_1791104952051.jpg';
const BLOG_IMG_2 = '/assets/images/project_fintech_saas_ui_1791104929193.jpg';
const BLOG_IMG_3 = '/assets/images/project_luxury_ecommerce_ui_1791104938782.jpg';

const CLIENT_LOGOS = [
  { name: 'FinPulse Global', sector: 'FinTech' },
  { name: 'AetherCloud AI', sector: 'Enterprise SaaS' },
  { name: 'Veloce Mobility', sector: 'EV & Auto' },
  { name: 'Lumina Living', sector: 'Luxury Retail' },
  { name: 'MedCore Health', sector: 'Healthcare' },
  { name: 'UrbanNest Realty', sector: 'PropTech' },
  { name: 'EduVerse Academy', sector: 'EdTech' },
  { name: 'Kinetix Logistics', sector: 'Supply Chain' },
  { name: 'Apex Capital', sector: 'WealthTech' },
  { name: 'NovaRetail Group', sector: 'E-commerce' },
];

// ─── Section Components ───────────────────────────────────────────────────────

export const HeroSection: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  return (
    <section className="relative bg-navy text-white pt-10 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
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

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M120 520 Q 420 220 780 420 T 1320 260"
          stroke="#0571c2"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <path
          d="M200 200 Q 650 480 1180 180"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        <circle cx="420" cy="340" r="4" fill="#0571c2" />
        <circle cx="780" cy="420" r="5" fill="#0571c2" />
        <circle cx="1180" cy="180" r="4" fill="#0571c2" />
      </svg>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.22em] text-white/60 mb-4">
              BUILD • AUTOMATE • SCALE
            </div>

            <h1 className="text-[36px] sm:text-[46px] lg:text-[58px] xl:text-[62px] font-extrabold text-white leading-[1.08] tracking-tight mb-6">
              Custom Websites & AI-Powered Solutions for{' '}
              <span className="text-primary">Modern Businesses</span>
            </h1>

            <p className="text-[16px] sm:text-[17px] text-white/75 leading-[1.7] max-w-2xl mb-8 font-normal">
              WebXCode is a full-service web development and digital solutions company helping
              businesses in India, the US and worldwide build high-performance websites, web
              applications and AI-powered solutions.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button size="lg" onClick={() => onOpenQuoteModal('Free Consultation')}>
                Get a Free Consultation
              </Button>
              <Link href="/our-work" className="inline-block">
                <Button variant="outline-dark" size="lg">
                  View Our Work
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              <StatItem
                icon={<Layers className="w-5 h-5" strokeWidth={1.75} />}
                value="100+"
                label="Projects Delivered"
              />
              <StatItem
                icon={<Globe className="w-5 h-5" strokeWidth={1.75} />}
                value="20+"
                label="Countries Served"
              />
              <StatItem
                icon={<Star className="w-5 h-5" strokeWidth={1.75} />}
                value="98%"
                label="Client Satisfaction"
              />
              <StatItem
                icon={<Award className="w-5 h-5" strokeWidth={1.75} />}
                value="5+"
                label="Years of Experience"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute inset-0 blue-glow-strong scale-110 pointer-events-none" />

            <div className="hidden sm:flex flex-col items-end absolute -top-10 right-2 z-20 pointer-events-none">
              <span
                className="text-[24px] leading-tight text-white -rotate-6 select-none"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Ideas. Code. Growth.
              </span>
              <svg
                width="54"
                height="42"
                viewBox="0 0 54 42"
                fill="none"
                className="text-primary -mt-1 mr-4"
                aria-hidden="true"
              >
                <path
                  d="M38 4 C 44 18, 32 32, 10 36"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="3 3"
                />
                <path
                  d="M15 31 L 8 36 L 16 40"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="relative z-10 rounded-[20px] p-2.5 bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-2xl">
              <div className="relative rounded-[14px] overflow-hidden bg-navy aspect-[16/11]">
                <img
                  src={HERO_IMG}
                  alt="WebXCode 3D laptop and mobile phone mockup showcasing enterprise web and AI solutions"
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </div>

              <div className="hidden sm:block absolute -bottom-6 right-5 w-44 rounded-[18px] bg-navy/95 border border-white/20 p-3 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10">
                  <span className="text-[10px] font-bold text-white tracking-wider uppercase">
                    WebXCode Portal
                  </span>
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="space-y-1.5">
                  <div className="px-2 py-1.5 rounded-lg bg-white/[0.06] flex items-center gap-2 text-[11px] text-white/90">
                    <Code2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">Next.js 14 Core</span>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg bg-primary/20 border border-primary/40 flex items-center gap-2 text-[11px] text-white font-semibold">
                    <Cpu className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">AI Lead Agent Active</span>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg bg-white/[0.06] flex items-center justify-between text-[11px] text-white/90">
                    <span>Organic Traffic</span>
                    <span className="text-primary font-bold tabular-nums">+320%</span>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-3 sm:-left-6 z-20 px-3.5 py-2 rounded-full bg-white/[0.08] border border-white/[0.14] backdrop-blur-md flex items-center gap-2 shadow-lg"
            >
              <span className="w-6 h-6 rounded-full bg-primary/25 text-primary flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5" />
              </span>
              <span className="text-[12px] font-semibold text-white whitespace-nowrap">
                Web Development
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="absolute top-12 -right-2 sm:-right-5 z-20 px-3.5 py-2 rounded-full bg-white/[0.08] border border-white/[0.14] backdrop-blur-md flex items-center gap-2 shadow-lg"
            >
              <span className="w-6 h-6 rounded-full bg-primary/25 text-primary flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5" />
              </span>
              <span className="text-[12px] font-semibold text-white whitespace-nowrap">
                AI Integration
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="absolute -bottom-5 left-2 sm:left-4 z-20 px-3.5 py-2 rounded-full bg-white/[0.08] border border-white/[0.14] backdrop-blur-md flex items-center gap-2 shadow-lg"
            >
              <span className="w-6 h-6 rounded-full bg-primary/25 text-primary flex items-center justify-center">
                <ShoppingCart className="w-3.5 h-3.5" />
              </span>
              <span className="text-[12px] font-semibold text-white whitespace-nowrap">
                E-commerce
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
              className="hidden sm:flex absolute bottom-16 -left-7 z-20 px-3.5 py-2 rounded-full bg-white/[0.08] border border-white/[0.14] backdrop-blur-md items-center gap-2 shadow-lg"
            >
              <span className="w-6 h-6 rounded-full bg-primary/25 text-primary flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </span>
              <span className="text-[12px] font-semibold text-white whitespace-nowrap">
                SEO & Growth
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-[36px] sm:h-[52px]"
          viewBox="0 0 1440 52"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0 C480,52 960,52 1440,0 L1440,52 L0,52 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
};

export const TrustedByMarquee: React.FC = () => {
  const doubledLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="bg-white py-12 border-b border-navy-08 overflow-hidden" aria-label="Trusted Clients">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-7">
        <p className="text-center text-[14px] sm:text-[15px] font-semibold text-navy/60">
          Trusted by startups, SMEs and enterprises across the globe
        </p>
      </div>

      <div className="relative max-w-[1280px] mx-auto overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-6 sm:gap-8">
          {doubledLogos.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="group px-6 py-3.5 rounded-2xl border border-navy-08 bg-white hover:border-primary-100 hover:bg-primary-50/40 transition-all duration-200 flex items-center gap-3 shrink-0 cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-navy/5 group-hover:bg-primary text-navy/45 group-hover:text-white flex items-center justify-center font-extrabold text-[14px] transition-colors">
                {client.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-[15px] font-bold text-navy/45 group-hover:text-primary transition-colors whitespace-nowrap">
                  {client.name}
                </div>
                <div className="text-[11px] font-medium text-navy/35 group-hover:text-navy-70 transition-colors">
                  {client.sector}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ServicesBentoSection: React.FC<{
  onOpenQuoteModal: (service?: string) => void;
}> = ({ onOpenQuoteModal }) => {
  return (
    <section id="services" className="bg-primary-50 py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="OUR SERVICES"
            firstPart="Everything You Need to"
            highlightPart="Build & Grow Online"
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 max-w-xl">
            <p className="text-[15px] sm:text-[16px] text-navy-70 leading-[1.65]">
              From high-converting custom web engineering to autonomous AI workflows and search
              dominance, we build digital assets that compound revenue.
            </p>
            <Link href="/services" className="shrink-0">
              <Button variant="outline-light" size="md">
                View All Services
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            icon={<Code2 className="w-6 h-6" strokeWidth={1.75} />}
            title="Website Development"
            description="High-speed, conversion-engineered websites and enterprise web applications tailored to your brand architecture and global growth goals."
            bullets={[
              'Custom Websites',
              'Next.js / React',
              'Corporate Websites',
              'Landing Pages',
            ]}
            linkTo="/services/website-development"
            linkText="Explore Website Development"
            onAction={() => onOpenQuoteModal('Website Development')}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2"
          >
            <div className="mt-6 rounded-[16px] overflow-hidden border border-navy-08 bg-navy relative aspect-[16/9]">
              <img
                src={HERO_IMG}
                alt="Custom Website Development UI showcase on laptop"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-navy/85 backdrop-blur-md border border-white/15 text-white text-[12px]">
                <span className="font-semibold">99.9% Core Web Vitals Pass Rate</span>
                <span className="text-primary font-bold">Next.js 14 + TypeScript</span>
              </div>
            </div>
          </ServiceCard>

          <ServiceCard
            icon={<Bot className="w-6 h-6" strokeWidth={1.75} />}
            title="AI Integration & Automation"
            description="Embed custom LLMs, intelligent chat assistants, and automated business workflows directly into your product."
            onAction={() => onOpenQuoteModal('AI Integration & Automation')}
            className="md:col-span-1 lg:col-span-1 lg:row-span-2"
          >
            <div className="my-5 p-4 rounded-2xl bg-primary-50 border border-primary-100 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-navy text-primary flex items-center justify-center shadow-md mb-3 relative z-10">
                <Cpu className="w-7 h-7" strokeWidth={1.75} />
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-primary uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autonomous AI Core</span>
              </div>
              <div className="mt-3 w-full space-y-1.5">
                <div className="px-3 py-1.5 rounded-lg bg-white text-[12px] font-semibold text-navy flex items-center justify-between border border-navy-08">
                  <span>AI Chatbots</span>
                  <span className="text-primary font-bold">24/7</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white text-[12px] font-semibold text-navy flex items-center justify-between border border-navy-08">
                  <span>LLM Integration</span>
                  <span className="text-primary font-bold">RAG</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white text-[12px] font-semibold text-navy flex items-center justify-between border border-navy-08">
                  <span>Workflow Automation</span>
                  <span className="text-primary font-bold">-70% Time</span>
                </div>
              </div>
            </div>
          </ServiceCard>

          <ServiceCard
            icon={<ShoppingCart className="w-6 h-6" strokeWidth={1.75} />}
            title="E-commerce Solutions"
            description="Scalable online storefronts with frictionless checkout, multi-currency payments, and inventory sync."
            linkTo="/services/ecommerce-development"
            linkText="Explore E-commerce Development"
            onAction={() => onOpenQuoteModal('E-commerce Solutions')}
          />

          <ServiceCard
            icon={<Layers className="w-6 h-6" strokeWidth={1.75} />}
            title="WordPress & Shopify"
            description="Custom themes, headless storefronts, and high-converting WooCommerce & Shopify Plus builds."
            onAction={() => onOpenQuoteModal('WordPress & Shopify Development')}
          />

          <ServiceCard
            icon={<TrendingUp className="w-6 h-6" strokeWidth={1.75} />}
            title="SEO & Performance Marketing"
            description="Dominate Google Search, AI Overviews (AEO/GEO), and high-ROI paid search campaigns that generate qualified pipeline."
            onAction={() => onOpenQuoteModal('SEO & Performance Marketing')}
            className="md:col-span-1 lg:col-span-2"
          >
            <div className="mt-4 p-3.5 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-navy-70">
                  Avg. Organic Traffic Lift
                </div>
                <div className="text-[24px] font-extrabold text-primary tabular-nums leading-tight">
                  +320%
                </div>
                <div className="text-[12px] text-navy-70">Technical SEO • AEO • Google Ads</div>
              </div>
              <svg
                width="120"
                height="48"
                viewBox="0 0 120 48"
                fill="none"
                className="shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M4 42 L28 34 L52 36 L76 20 L100 14 L116 4"
                  stroke="#0571c2"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 42 L28 34 L52 36 L76 20 L100 14 L116 4 L116 46 L4 46 Z"
                  fill="#0571c2"
                  fillOpacity="0.12"
                />
                <circle cx="116" cy="4" r="4" fill="#0571c2" />
              </svg>
            </div>
          </ServiceCard>

          <ServiceCard
            icon={<ShieldCheck className="w-6 h-6" strokeWidth={1.75} />}
            title="Maintenance & Support"
            description="Proactive security patching, daily cloud backups, Core Web Vitals optimization, and dedicated SLA engineering support."
            onAction={() => onOpenQuoteModal('Website Maintenance & Support')}
            className="md:col-span-1 lg:col-span-2"
          >
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-[12px] font-bold text-primary">
                <Clock className="w-3.5 h-3.5" />
                <span>24/7 Support</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy text-[12px] font-bold text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Secure & Reliable</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-[12px] font-bold text-primary">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>99.9% Uptime SLA</span>
              </span>
            </div>
          </ServiceCard>
        </div>
      </div>
    </section>
  );
};

// ─── AI Solutions Spotlight ───────────────────────────────────────────────────

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    sender: 'user',
    text: 'Hi! We need a custom Next.js e-commerce platform integrated with an AI sales assistant on WhatsApp.',
    time: '10:41 AM',
  },
  {
    sender: 'bot',
    text: 'Welcome to WebXCode! We can build both your headless store and a 24/7 WhatsApp AI Agent synced with your catalog & CRM.',
    time: '10:41 AM',
  },
  {
    sender: 'user',
    text: 'How fast can we launch the MVP and what is the typical ROI?',
    time: '10:42 AM',
  },
  {
    sender: 'bot',
    text: 'Our clients launch in 4–6 weeks and automate up to 70% of repetitive support & lead qualification queries immediately.',
    time: '10:42 AM',
  },
];

export const AISolutionsSpotlight: React.FC<{
  onOpenQuoteModal: (service?: string) => void;
}> = ({ onOpenQuoteModal }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendPrompt = (promptText: string) => {
    const trimmed = promptText.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: trimmed,
      time: 'Just now',
    };
    setMessages((prev) => [...prev.slice(-3), userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let reply =
        'Our AI engineering team can deploy a custom proof-of-concept for your workflow within 7 days. Would you like a free AI architecture call?';
      if (trimmed.toLowerCase().includes('voice')) {
        reply =
          'Our AI Voice Agents handle inbound & outbound calls with human-like latency (<500ms), booking qualified appointments directly into your calendar.';
      } else if (trimmed.toLowerCase().includes('cost') || trimmed.toLowerCase().includes('price')) {
        reply =
          'Custom AI Chatbot & CRM Automation packages start at $1,200 with full ownership of weights, prompts, and API pipelines.';
      }
      setMessages((prev) => [
        ...prev.slice(-3),
        {
          sender: 'bot',
          text: reply,
          time: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <section
      id="ai-solutions"
      className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] blue-glow-strong pointer-events-none" />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
        viewBox="0 0 1440 700"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 140 H320 L380 200 H720" stroke="#0571c2" strokeWidth="2" />
        <path d="M1440 520 H1080 L1020 460 H680" stroke="#0571c2" strokeWidth="2" />
        <circle cx="380" cy="200" r="5" fill="#0571c2" />
        <circle cx="1020" cy="460" r="5" fill="#0571c2" />
      </svg>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <SectionHeading
              dark
              label="AI SOLUTIONS"
              firstPart="Put Your Business on"
              highlightPart="Autopilot with AI"
              className="mb-5"
            />

            <p className="text-[16px] sm:text-[17px] text-white/75 leading-[1.7] mb-8">
              Stop losing leads to slow response times and manual spreadsheets. We engineer custom
              AI chatbots, human-like voice agents, and end-to-end workflow automations that
              capture leads, qualify prospects, and support customers 24/7.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-9">
              {[
                {
                  icon: Bot,
                  title: 'AI Chatbots',
                  desc: 'Custom RAG-trained web assistants',
                  to: '/ai-solutions#ai-chatbot-development',
                },
                {
                  icon: MessageSquare,
                  title: 'WhatsApp AI Bot',
                  desc: 'Automated catalog & lead capture',
                  to: '/ai-solutions#whatsapp-ai-chatbot',
                },
                {
                  icon: Mic,
                  title: 'AI Voice Agents',
                  desc: 'Inbound & outbound call automation',
                  to: '/ai-solutions#ai-voice-agents',
                },
                {
                  icon: Workflow,
                  title: 'Workflow Automation',
                  desc: 'CRM, ERP & operations sync',
                  to: '/ai-solutions#ai-workflow-automation',
                },
              ].map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <Link
                    key={feat.title}
                    href={feat.to}
                    className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-primary/50 transition-colors flex items-start gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-white group-hover:text-primary transition-colors leading-snug">
                        {feat.title}
                      </h3>
                      <p className="text-[13px] text-white/65 mt-0.5">{feat.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/ai-solutions"
                className="group inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer bg-primary text-white hover:bg-primary-700 shadow-soft hover:shadow-soft-hover px-7 py-3.5 text-[16px] gap-2.5"
              >
                <span>Explore AI Solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
              </Link>
              <Button
                variant="outline-dark"
                size="lg"
                onClick={() => onOpenQuoteModal('AI Solutions & Automation')}
              >
                Book an AI Consultation
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden sm:flex absolute -top-5 -left-5 z-20 px-4 py-2.5 rounded-2xl bg-white/[0.1] border border-white/20 backdrop-blur-md items-center gap-2.5 shadow-xl"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[13px] font-bold text-white">24/7 Lead Capture</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="hidden sm:flex absolute -bottom-5 -right-4 z-20 px-4 py-2.5 rounded-2xl bg-white/[0.1] border border-white/20 backdrop-blur-md items-center gap-2.5 shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[13px] font-bold text-white">70% Less Manual Work</span>
            </motion.div>

            <div className="bg-white text-navy rounded-[24px] shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-navy px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-white flex items-center gap-2">
                      <span>WebXCode AI Assistant</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Online
                      </span>
                    </div>
                    <div className="text-[12px] text-white/65">
                      Custom Enterprise LLM • Instant Response
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMessages(INITIAL_MESSAGES)}
                  className="text-[11px] font-semibold text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  Reset Demo
                </button>
              </div>

              <div className="p-5 sm:p-6 space-y-4 max-h-[340px] overflow-y-auto bg-white">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-navy text-white rounded-br-xs'
                          : 'bg-primary-50 text-navy border border-primary-100 rounded-bl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[11px] text-navy-50 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <div className="bg-primary-50 border border-primary-100 rounded-2xl px-4 py-2.5 inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <span className="text-[11px] font-semibold text-primary ml-1.5">
                      {isTyping ? 'AI Agent generating response...' : 'AI Ready — Ask a question below'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-4 bg-primary-50/50 border-t border-navy-08">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {[
                    'Tell me about AI Voice Agents',
                    'How much does an AI bot cost?',
                    'Book an AI demo',
                  ].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleSendPrompt(q)}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white border border-primary-100 text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendPrompt(inputValue);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask WebXCode AI anything..."
                    aria-label="Ask WebXCode AI Assistant"
                    className="flex-1 bg-white border border-navy-15 rounded-full px-4 py-2 text-[13px] text-navy placeholder:text-navy-50 focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-700 transition-colors shrink-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyChooseSection: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  const features = [
    {
      icon: Users,
      title: 'Client-First Approach',
      desc: 'Dedicated product strategists and sprint transparency aligned with your KPIs.',
    },
    {
      icon: Code,
      title: 'Modern Tech Stack',
      desc: 'Engineered with Next.js, React, TypeScript, and scalable cloud-native AI pipelines.',
    },
    {
      icon: BadgeDollarSign,
      title: 'Transparent Pricing',
      desc: 'Fixed-milestone proposals with zero hidden retainers or surprise scope creep.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      desc: '24/7 proactive monitoring, SLA-backed maintenance, and direct Slack access.',
    },
  ];

  return (
    <section id="why-webxcode" className="bg-white py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-[20px] overflow-hidden border border-navy-08 shadow-soft aspect-[4/3] bg-navy">
              <img
                src={TEAM_IMG}
                alt="WebXCode engineering and design team collaborating in modern studio"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-4 bg-navy text-white p-5 sm:p-6 rounded-[20px] shadow-xl border border-white/10 max-w-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-extrabold text-[20px] shrink-0 tabular-nums">
                  5+
                </div>
                <div>
                  <div className="text-[15px] font-bold text-white leading-snug">
                    5+ Years of Building Digital Success
                  </div>
                  <div className="text-[12px] text-white/70 mt-0.5">
                    Serving India, US, UK & Global Brands
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex absolute -top-5 -right-4 bg-primary text-white px-5 py-3.5 rounded-[18px] shadow-xl items-center gap-2.5">
              <Star className="w-5 h-5 fill-white text-white" />
              <div>
                <div className="text-[18px] font-extrabold leading-none tabular-nums">98%</div>
                <div className="text-[11px] font-semibold text-white/90 mt-0.5">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <SectionHeading
              label="WHY WEBXCODE"
              firstPart="Your Trusted Partner in"
              highlightPart="Digital Growth"
              className="mb-4"
            />
            <p className="text-[16px] text-navy-70 leading-[1.7] mb-8">
              We bridge the gap between high-craft design agency aesthetics and rigorous software
              engineering—delivering web platforms and AI systems built to scale from day one.
            </p>

            <div className="space-y-5 mb-9">
              {features.map((item) => {
                const IconComp = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <IconComp className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold text-navy leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-navy-70 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href="/about" className="inline-block">
              <Button size="lg">Know More About Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: Search,
      title: 'Discover & Plan',
      desc: 'We audit your market, define technical architecture, and map conversion funnels.',
    },
    {
      num: '02',
      icon: PenTool,
      title: 'Design & Prototype',
      desc: 'Interactive Figma UI/UX systems crafted for brand clarity and user conversion.',
    },
    {
      num: '03',
      icon: Terminal,
      title: 'Develop & Integrate',
      desc: 'Clean, modular code with custom APIs, CMS, and intelligent AI automation.',
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: 'Test & Optimize',
      desc: 'Rigorous QA across devices, Core Web Vitals tuning, and security hardening.',
    },
    {
      num: '05',
      icon: Rocket,
      title: 'Launch & Grow',
      desc: 'Zero-downtime deployment followed by ongoing SEO, AEO, and growth scaling.',
    },
  ];

  return (
    <section id="process" className="bg-primary-50 py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <SectionHeading
            label="OUR PROCESS"
            firstPart="From Idea to"
            highlightPart="Impact"
          />
          <p className="text-[16px] text-navy-70 max-w-md lg:text-right">
            A streamlined, transparent 5-step engineering workflow designed to deliver high-impact
            digital products on time.
          </p>
        </div>

        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-primary/45 origin-left z-0"
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComp = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="bg-white lg:bg-transparent p-6 lg:p-0 rounded-[20px] border border-navy-08 lg:border-0 flex lg:flex-col items-start lg:items-center lg:text-center gap-4"
                >
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-primary-100 shadow-soft flex items-center justify-center text-primary">
                      <IconComp className="w-8 h-8" strokeWidth={1.75} />
                    </div>
                    <span className="absolute -top-1 -right-1 px-2.5 py-0.5 rounded-full bg-primary text-white text-[12px] font-extrabold tabular-nums">
                      {step.num}
                    </span>
                  </div>

                  <div>
                    <div className="text-[13px] font-extrabold text-primary tracking-wider uppercase mb-1 lg:mt-2 tabular-nums">
                      Step {step.num}
                    </div>
                    <h3 className="text-[19px] font-bold text-navy mb-2">{step.title}</h3>
                    <p className="text-[14px] text-navy-70 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export const IndustriesSection: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const industries = [
    { name: 'E-commerce & Retail', icon: ShoppingBag, img: PROJECT_ECOM_IMG },
    { name: 'Travel & Hospitality', icon: Plane, img: HERO_IMG },
    { name: 'Real Estate', icon: Building, img: TEAM_IMG },
    { name: 'Healthcare', icon: HeartPulse, img: PROJECT_SAAS_IMG },
    { name: 'Education', icon: GraduationCap, img: TEAM_IMG },
    { name: 'Finance', icon: Landmark, img: PROJECT_SAAS_IMG },
    { name: 'SaaS & Startups', icon: Cpu, img: PROJECT_AI_IMG },
    { name: 'Manufacturing', icon: Factory, img: HERO_IMG },
  ];

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -340 : 340,
      behavior: 'smooth',
    });
  };

  return (
    <section id="industries" className="bg-white py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionHeading
              label="INDUSTRIES WE SERVE"
              firstPart="Solutions for"
              highlightPart="Every Industry"
              className="mb-3"
            />
            <p className="text-[16px] text-navy-70 max-w-2xl">
              We partner with startups, SMEs, and global enterprises across specialized verticals
              to deliver domain-specific digital platforms.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Scroll industries left"
              className="w-11 h-11 rounded-full border border-navy-15 text-navy hover:border-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Scroll industries right"
              className="w-11 h-11 rounded-full border border-navy-15 text-navy hover:border-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-8 gap-4 overflow-x-auto no-scrollbar pb-4"
        >
          {industries.map((ind) => {
            const IconComp = ind.icon;
            return (
              <div
                key={ind.name}
                onClick={() => onOpenQuoteModal(`${ind.name} Digital Solution`)}
                className="group min-w-[200px] lg:min-w-0 shrink-0 cursor-pointer"
              >
                <div className="relative rounded-[16px] overflow-hidden aspect-[4/3] bg-navy">
                  <img
                    src={ind.img}
                    alt={ind.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent" />
                </div>

                <div className="relative -mt-6 ml-3 flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-full bg-white shadow-md border border-navy-08 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                </div>
                <h3 className="mt-2.5 pl-1 text-[14px] font-bold text-navy group-hover:text-primary transition-colors leading-snug">
                  {ind.name}
                </h3>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/industries" className="inline-block">
            <Button variant="outline-light">View All Industries</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─── Featured Projects ────────────────────────────────────────────────────────

interface ProjectItem {
  id: string;
  title: string;
  category: 'Websites' | 'E-commerce' | 'Web Apps' | 'AI Solutions';
  subtitle: string;
  metric: string;
  image: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'finpulse',
    title: 'FinPulse Enterprise Analytics & Wealth Platform',
    category: 'Web Apps',
    subtitle: 'Next.js 14 • Real-Time Telemetry • AI Forecasting',
    metric: '+185% Enterprise Demo Conversions',
    image: PROJECT_SAAS_IMG,
  },
  {
    id: 'lumina',
    title: 'Lumina Architectural Lighting Storefront',
    category: 'E-commerce',
    subtitle: 'Headless Shopify Plus • 3D Configurator',
    metric: '+140% Checkout Completion Rate',
    image: PROJECT_ECOM_IMG,
  },
  {
    id: 'aether',
    title: 'AetherFlow Autonomous AI Agent Hub',
    category: 'AI Solutions',
    subtitle: 'Custom LLM RAG • Multi-Channel WhatsApp & Voice',
    metric: '70% Reduction in Support Tickets',
    image: PROJECT_AI_IMG,
  },
  {
    id: 'veloce',
    title: 'Veloce Global Corporate Web Experience',
    category: 'Websites',
    subtitle: 'Custom Design System • Technical SEO & AEO',
    metric: '99 Lighthouse Performance Score',
    image: HERO_IMG,
  },
];

export const FeaturedProjectsSection: React.FC<{
  onOpenQuoteModal: (service?: string) => void;
}> = ({ onOpenQuoteModal }) => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const tabs = ['All', 'Websites', 'E-commerce', 'Web Apps', 'AI Solutions'];

  const filtered =
    activeTab === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === activeTab);

  const primaryProject = filtered[0] || PROJECTS[0];
  const secondaryProjects =
    filtered.length > 1
      ? filtered.slice(1, 3)
      : PROJECTS.filter((p) => p.id !== primaryProject.id).slice(0, 2);

  return (
    <section id="work" className="bg-primary-50 py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <SectionHeading
              label="OUR WORK"
              firstPart="Featured"
              highlightPart="Projects"
              className="mb-3"
            />
            <p className="text-[16px] text-navy-70 max-w-xl">
              A curated look at the high-performing websites, e-commerce stores, and AI platforms
              we have engineered for global clients.
            </p>
          </div>
          <Link href="/our-work" className="inline-block">
            <Button variant="outline-light">View All Projects</Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10" role="tablist">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-white text-navy-70 border border-navy-08 hover:border-primary-100 hover:text-primary'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          <div
            onClick={() => onOpenQuoteModal(`Case Study: ${primaryProject.title}`)}
            className="lg:col-span-7 group bg-white rounded-[20px] p-5 sm:p-7 border border-navy-08 shadow-soft hover:shadow-soft-hover hover:border-primary-100 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div className="rounded-[16px] overflow-hidden border border-navy-15 bg-navy">
              <div className="bg-navy px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
                <div className="px-3 py-0.5 rounded-full bg-white/10 text-[11px] text-white/70 font-medium truncate max-w-[220px]">
                  https://app.{primaryProject.id}.io
                </div>
                <span className="text-[11px] text-primary font-bold">{primaryProject.category}</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                <img
                  src={primaryProject.image}
                  alt={primaryProject.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-[125%] object-cover object-top transition-transform duration-700 ease-out group-hover:-translate-y-12"
                />
              </div>
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold text-primary mb-2">
                  <span className="px-3 py-1 rounded-full bg-primary-50">
                    {primaryProject.category}
                  </span>
                  <span className="text-navy-50">•</span>
                  <span className="text-navy-70 font-semibold">{primaryProject.metric}</span>
                </div>
                <h3 className="text-[22px] sm:text-[24px] font-extrabold text-navy group-hover:text-primary transition-colors">
                  {primaryProject.title}
                </h3>
                <p className="text-[14px] text-navy-70 mt-1">{primaryProject.subtitle}</p>
              </div>
              <span className="w-11 h-11 rounded-full bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-7">
            {secondaryProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onOpenQuoteModal(`Case Study: ${proj.title}`)}
                className="group bg-white rounded-[20px] p-5 border border-navy-08 shadow-soft hover:shadow-soft-hover hover:border-primary-100 transition-all flex flex-col justify-between flex-1 cursor-pointer"
              >
                <div className="rounded-[14px] overflow-hidden border border-navy-15 bg-navy">
                  <div className="bg-navy px-3.5 py-2 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white/25" />
                      <span className="w-2 h-2 rounded-full bg-white/25" />
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-[10px] text-white/60">https://{proj.id}.com</span>
                  </div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-navy">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-[125%] object-cover object-top transition-transform duration-700 ease-out group-hover:-translate-y-8"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-primary mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary-50">
                        {proj.category}
                      </span>
                      <span className="text-navy-70 font-semibold">{proj.metric}</span>
                    </div>
                    <h3 className="text-[18px] font-bold text-navy group-hover:text-primary transition-colors">
                      {proj.title}
                    </h3>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
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

// ─── Tech Stack ───────────────────────────────────────────────────────────────

const TECH_STACK: Record<string, { name: string; tag: string; code: string }[]> = {
  Frontend: [
    { name: 'Next.js 14', tag: 'App Router SSR', code: 'NX' },
    { name: 'React 19', tag: 'UI Architecture', code: 'RC' },
    { name: 'TypeScript', tag: 'Type Safety', code: 'TS' },
    { name: 'Tailwind CSS', tag: 'Design Tokens', code: 'TW' },
    { name: 'Framer Motion', tag: '60fps Motion', code: 'FM' },
    { name: 'Vue / Nuxt', tag: 'Reactive Web', code: 'VN' },
  ],
  Backend: [
    { name: 'Node.js', tag: 'Event Runtime', code: 'ND' },
    { name: 'Python / FastAPI', tag: 'AI & Microservices', code: 'PY' },
    { name: 'PostgreSQL', tag: 'Relational DB', code: 'PG' },
    { name: 'GraphQL & REST', tag: 'API Layer', code: 'GQ' },
    { name: 'Redis', tag: 'Edge Caching', code: 'RD' },
    { name: 'Go (Golang)', tag: 'High Concurrency', code: 'GO' },
  ],
  'CMS & E-commerce': [
    { name: 'Shopify Plus', tag: 'Enterprise Commerce', code: 'SH' },
    { name: 'WordPress VIP', tag: 'Custom CMS', code: 'WP' },
    { name: 'WooCommerce', tag: 'Flexible Store', code: 'WC' },
    { name: 'Sanity / Strapi', tag: 'Headless CMS', code: 'SN' },
    { name: 'Stripe Connect', tag: 'Global Billing', code: 'ST' },
    { name: 'Magento / Adobe', tag: 'B2B Catalog', code: 'MG' },
  ],
  'AI & Automation': [
    { name: 'OpenAI GPT-4o', tag: 'LLM Reasoning', code: 'OA' },
    { name: 'Anthropic Claude', tag: 'Enterprise Agents', code: 'AC' },
    { name: 'LangChain / RAG', tag: 'Vector Knowledge', code: 'LC' },
    { name: 'Pinecone DB', tag: 'Embeddings', code: 'PC' },
    { name: 'n8n / Make', tag: 'Workflow Sync', code: 'N8' },
    { name: 'WhatsApp Cloud API', tag: 'Conversational AI', code: 'WA' },
  ],
  Cloud: [
    { name: 'AWS', tag: 'Cloud Infrastructure', code: 'AW' },
    { name: 'Vercel Enterprise', tag: 'Global Edge CDN', code: 'VC' },
    { name: 'Google Cloud', tag: 'Kubernetes & AI', code: 'GC' },
    { name: 'Docker', tag: 'Containerization', code: 'DK' },
    { name: 'Cloudflare', tag: 'WAF & Zero Trust', code: 'CF' },
    { name: 'GitHub Actions', tag: 'CI/CD Pipelines', code: 'GH' },
  ],
};

export const TechStackSection: React.FC = () => {
  const categories = Object.keys(TECH_STACK);
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <section className="bg-white py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          label="TECHNOLOGIES WE USE"
          firstPart="Built with"
          highlightPart="Modern Technology"
          className="mb-8"
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" role="tablist">
          {categories.map((cat) => {
            const active = activeTab === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-primary-50 text-navy-70 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {TECH_STACK[activeTab].map((tech) => (
            <div
              key={tech.name}
              className="group bg-white rounded-[20px] p-5 border border-navy-08 shadow-soft hover:border-primary-100 hover:-translate-y-1 transition-all flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-navy/5 group-hover:bg-primary text-navy/50 group-hover:text-white transition-colors flex items-center justify-center font-extrabold text-[18px] mb-3.5">
                {tech.code}
              </div>
              <h3 className="text-[15px] font-bold text-navy group-hover:text-primary transition-colors">
                {tech.name}
              </h3>
              <p className="text-[12px] text-navy-50 mt-1">{tech.tag}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Testimonials ─────────────────────────────────────────────────────────────

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  country: string;
  metric: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'WebXCode re-engineered our entire SaaS marketing site and deployed an AI qualification bot that increased our booked enterprise demos by 185% within 90 days. Their team operates with true Silicon Valley speed and precision.',
    name: 'David Miller',
    role: 'VP of Growth',
    company: 'FinPulse Technologies',
    country: 'USA',
    metric: '+185% Qualified Demos',
    initials: 'DM',
  },
  {
    quote:
      'They understood our technical requirements immediately and delivered our headless Shopify store two weeks ahead of schedule. Core Web Vitals jumped from 54 to 98.',
    name: 'Sarah Jenkins',
    role: 'Head of Digital',
    company: 'Lumina Home UK',
    country: 'United Kingdom',
    metric: '98/100 Speed Score',
    initials: 'SJ',
  },
  {
    quote:
      'Our custom WhatsApp AI Agent built by WebXCode now resolves 70% of customer inquiries automatically in English and Hindi. Best technology investment we made this year.',
    name: 'Rahul Mehta',
    role: 'Founder & CEO',
    company: 'UrbanNest India',
    country: 'India',
    metric: '70% Support Automated',
    initials: 'RM',
  },
  {
    quote:
      'From SEO & AEO architecture to custom CRM workflow automation, WebXCode scaled our organic inbound pipeline across Dubai and Riyadh seamlessly.',
    name: 'Omar Al-Futtaim',
    role: 'Managing Director',
    company: 'Nexus Ventures MENA',
    country: 'UAE',
    metric: '3.2x Organic Pipeline',
    initials: 'OA',
  },
];

const FiveBlueStars: React.FC = () => (
  <div className="flex items-center gap-1 text-primary" aria-label="5 out of 5 stars">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
    ))}
  </div>
);

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const featured = TESTIMONIALS[activeIndex];
  const others = TESTIMONIALS.filter((_, idx) => idx !== activeIndex);

  const handlePrev = () =>
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  const handleNext = () =>
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));

  return (
    <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden">
      <div className="absolute -bottom-32 -right-32 w-[560px] h-[560px] blue-glow pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeading
            dark
            label="CLIENT TESTIMONIALS"
            firstPart="Trusted by Businesses"
            highlightPart="Worldwide"
          />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`View testimonial ${idx + 1}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx ? 'w-8 bg-primary' : 'w-2.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-primary hover:bg-primary transition-colors flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-primary hover:bg-primary transition-colors flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          <div className="lg:col-span-6 bg-white text-navy rounded-[20px] p-7 sm:p-9 shadow-xl flex flex-col justify-between relative">
            <Quote className="w-12 h-12 text-primary/15 absolute top-6 right-6 pointer-events-none" />
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <FiveBlueStars />
                <span className="text-[12px] font-bold text-primary bg-primary-50 px-3 py-1 rounded-full">
                  {featured.metric}
                </span>
              </div>
              <p className="text-[17px] sm:text-[19px] font-medium text-navy leading-[1.65] mb-8">
                "{featured.quote}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-navy-08">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-navy text-white font-bold text-[15px] flex items-center justify-center shrink-0">
                  {featured.initials}
                </div>
                <div>
                  <div className="text-[16px] font-bold text-navy">{featured.name}</div>
                  <div className="text-[13px] text-navy-70">
                    {featured.role}, {featured.company}
                  </div>
                </div>
              </div>
              <span className="text-[12px] font-bold text-primary uppercase tracking-wider">
                {featured.country}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {others.map((item) => (
              <div
                key={item.name}
                onClick={() =>
                  setActiveIndex(TESTIMONIALS.findIndex((t) => t.name === item.name))
                }
                className="bg-white text-navy rounded-[20px] p-5 sm:p-6 shadow-soft hover:border-primary border border-transparent transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <FiveBlueStars />
                  <span className="text-[12px] font-bold text-primary">{item.metric}</span>
                </div>
                <p className="text-[14px] text-navy-90 leading-relaxed line-clamp-2 mb-3.5">
                  "{item.quote}"
                </p>
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-primary-50 text-primary font-bold text-[12px] flex items-center justify-center">
                      {item.initials}
                    </span>
                    <span className="font-bold text-navy">{item.name}</span>
                    <span className="text-navy-50">·</span>
                    <span className="text-navy-70">{item.company}</span>
                  </div>
                  <span className="font-semibold text-primary text-[12px]">{item.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'How much does a website cost?',
    a: 'Our custom website packages start at $1,500 (₹1,20,000) for high-converting corporate websites and scale based on custom web application architecture, e-commerce catalog complexity, and AI integrations. Every project begins with a transparent, fixed-scope proposal.',
  },
  {
    q: 'How long does it take to build a website?',
    a: 'A standard custom corporate website takes 3 to 5 weeks from discovery to launch. Complex e-commerce platforms, custom SaaS web applications, and AI-integrated portals typically take 6 to 10 weeks with weekly milestone deliveries.',
  },
  {
    q: 'Do you build AI chatbots for business websites?',
    a: "Yes. We build custom AI chatbots, WhatsApp AI assistants, and voice agents trained on your company's knowledge base, CRM data, and product catalog to qualify leads, book appointments, and resolve support queries 24/7.",
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Absolutely. Over 65% of our clients are based in the USA, UK, UAE, Canada, Australia, and Singapore. Our project managers align with your local time zone for seamless Slack, Zoom, and sprint collaboration.',
  },
  {
    q: 'Will my website be SEO-friendly?',
    a: 'Every website we engineer is built SEO-first—featuring semantic HTML5, Core Web Vitals optimization (90+ Lighthouse scores), Schema.org JSON-LD structured data, clean URL architecture, and AEO/GEO readiness for AI search engines.',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Yes, every launch includes 30 days of complimentary post-launch warranty support, plus flexible monthly Website Maintenance & Managed IT plans covering 24/7 uptime monitoring, security patching, backups, and priority feature updates.',
  },
];

export const FAQSection: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionHeading
              label="FAQ"
              firstPart="Questions?"
              highlightPart="We've Got Answers"
              className="mb-4"
            />
            <p className="text-[16px] text-navy-70 leading-[1.7] mb-8">
              Everything you need to know about our engineering process, timelines, AI capabilities,
              and global delivery model.
            </p>

            <div className="bg-navy text-white rounded-[20px] p-6 sm:p-7 relative overflow-hidden shadow-lg">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 blue-glow-strong pointer-events-none" />
              <h3 className="text-[20px] font-bold text-white mb-2 relative z-10">
                Still have questions?
              </h3>
              <p className="text-[14px] text-white/75 leading-relaxed mb-5 relative z-10">
                Speak directly with a senior solutions architect for a free 20-minute strategy call.
              </p>
              <Button
                size="md"
                onClick={() => onOpenQuoteModal('Expert Architecture Call')}
                className="relative z-10"
              >
                Talk to Our Experts
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
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
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
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
                        isOpen
                          ? 'bg-primary text-white'
                          : 'bg-primary-50 text-primary'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-[15px] sm:text-[16px] text-navy-70 leading-[1.7] border-t border-navy-08/60">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Blog Insights ────────────────────────────────────────────────────────────

const BLOG_POSTS = [
  {
    title: 'How AEO & GEO Are Replacing Traditional SEO in the Age of AI Search',
    category: 'SEO & AEO',
    date: 'Oct 2026',
    readTime: '6 min read',
    image: BLOG_IMG_2,
  },
  {
    title: 'Deploying Custom WhatsApp AI Agents That Qualify B2B Leads 24/7',
    category: 'AI Automation',
    date: 'Sep 2026',
    readTime: '5 min read',
    image: BLOG_IMG_1,
  },
  {
    title: 'Next.js 14 vs Headless Shopify Plus: Choosing the Right Commerce Stack',
    category: 'Web Engineering',
    date: 'Sep 2026',
    readTime: '8 min read',
    image: BLOG_IMG_3,
  },
];

export const BlogInsightsSection: React.FC = () => {
  return (
    <section id="insights" className="bg-primary-50 py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="INSIGHTS"
            firstPart="Latest from"
            highlightPart="Our Blog"
          />
          <Link href="/blog" className="inline-block">
            <Button variant="outline-light">View All Articles</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.title}
              href="/blog"
              className="group bg-white rounded-[20px] overflow-hidden border border-navy-08 shadow-soft hover:shadow-soft-hover hover:border-primary-100 hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-primary shadow-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 pb-4">
                  <div className="flex items-center gap-2 text-[13px] font-medium text-navy-50 mb-2.5">
                    <span>{post.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-[19px] font-bold text-navy group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA Band ─────────────────────────────────────────────────────────────────

export const CTABand: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  return (
    <section id="cta" className="bg-white py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-[28px] bg-navy text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-[520px] h-[520px] blue-glow-strong pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-[420px] h-[420px] blue-glow pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-8">
              <SectionHeading
                dark
                label="LET'S BUILD TOGETHER"
                firstPart="Have a"
                highlightPart="Project"
                lastPart="in Mind?"
                className="mb-4"
              />
              <p className="text-[17px] sm:text-[18px] text-white/80 leading-relaxed max-w-xl mb-8">
                Let's create something amazing together. Get a free consultation today.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-7">
                <Button size="lg" onClick={() => onOpenQuoteModal('Free Project Quote')}>
                  Get a Free Quote
                </Button>
                <Button
                  variant="outline-dark"
                  size="lg"
                  showArrow={false}
                  onClick={() => onOpenQuoteModal('Schedule Strategy Call')}
                >
                  Schedule a Call
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] sm:text-[14px] font-medium text-white/75">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  <span>Free consultation</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  <span>No obligation</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  <span>Reply within 24 hours</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping [animation-duration:4s]" />
                <div className="absolute inset-4 rounded-full border border-primary/45" />
                <div className="absolute inset-10 rounded-full bg-primary/15 border border-primary/40 backdrop-blur-md flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary" strokeWidth={1.25} />
                </div>
                <span className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-navy border border-primary text-[11px] font-bold text-white shadow-md">
                  India • US • UK • UAE
                </span>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-[11px] font-bold text-white shadow-md">
                  24/7 Global Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Quote Modal ──────────────────────────────────────────────────────────────

export const QuoteModal: React.FC<{
  isOpen: boolean;
  defaultService: string;
  onClose: () => void;
}> = ({ isOpen, defaultService, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService || 'Website Development');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultService) setService(defaultService);
    setSubmitted(false);
  }, [defaultService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="bg-white text-navy rounded-[24px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-navy-08 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-primary-50 text-navy hover:bg-primary hover:text-white transition-colors flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-[24px] font-extrabold text-navy mb-2">
              Proposal Request Received!
            </h3>
            <p className="text-[15px] text-navy-70 mb-6">
              Thank you, <strong className="text-navy">{name}</strong>. Our senior solutions
              architect will review your requirements for{' '}
              <strong className="text-primary">{service}</strong> and reply within 24 hours.
            </p>
            <Button onClick={onClose} showArrow={false}>
              Back to WebXCode
            </Button>
          </div>
        ) : (
          <>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary mb-1">
              FREE CONSULTATION & AUDIT
            </div>
            <h3 id="quote-modal-title" className="text-[24px] font-extrabold text-navy mb-2">
              Let's Build Your <span className="text-primary">Digital Advantage</span>
            </h3>
            <p className="text-[14px] text-navy-70 mb-6">
              Share your goals and receive a custom architecture roadmap and fixed-scope quote
              within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-navy mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full px-4 py-2.5 rounded-xl border border-navy-15 text-[14px] focus:outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-navy mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-navy-15 text-[14px] focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-navy mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="w-full px-4 py-2.5 rounded-xl border border-navy-15 text-[14px] focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-navy mb-1">
                  Service of Interest
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-navy-15 text-[14px] bg-white focus:outline-none focus:border-primary"
                >
                  <option value="Website Development">Custom Website Development</option>
                  <option value="Web Application / SaaS">Web Application / SaaS Development</option>
                  <option value="E-commerce Solutions">E-commerce (Shopify / Custom)</option>
                  <option value="AI Solutions & Chatbots">AI Chatbots, Voice Agents & Automation</option>
                  <option value="SEO, AEO & Performance Marketing">
                    SEO, AEO/GEO & Performance Marketing
                  </option>
                  <option value="Free Website & SEO Audit">Free Website & SEO Audit</option>
                </select>
              </div>
              <div className="pt-2">
                <Button type="submit" size="lg" className="w-full justify-center">
                  Request My Free Proposal
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Main Home Page Component ─────────────────────────────────────────────────

export default function HomePageContent() {
  const { quoteModalOpen, selectedService, openQuoteModal, closeQuoteModal } = useQuoteModal();

  return (
    <>
      <HeroSection onOpenQuoteModal={openQuoteModal} />
      <TrustedByMarquee />
      <ServicesBentoSection onOpenQuoteModal={openQuoteModal} />
      <AISolutionsSpotlight onOpenQuoteModal={openQuoteModal} />
      <WhyChooseSection onOpenQuoteModal={openQuoteModal} />
      <ProcessSection />
      <IndustriesSection onOpenQuoteModal={openQuoteModal} />
      <FeaturedProjectsSection onOpenQuoteModal={openQuoteModal} />
      <TechStackSection />
      <TestimonialsSection />
      <FAQSection onOpenQuoteModal={openQuoteModal} />
      <BlogInsightsSection />
      <CTABand onOpenQuoteModal={openQuoteModal} />

      {/* Global Quote Modal (driven by context) */}
      <QuoteModal
        isOpen={quoteModalOpen}
        defaultService={selectedService}
        onClose={closeQuoteModal}
      />
    </>
  );
}
