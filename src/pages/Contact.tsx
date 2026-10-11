import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Sparkles,
  Layers,
  Globe,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  User,
  Building2,
  ShieldCheck,
  Check,
  CheckCircle2,
  Star,
  MapPin,
  ExternalLink,
  Rocket,
  LifeBuoy,
  Handshake,
  Briefcase,
  Plus,
  Minus,
  Loader2,
  AlertCircle,
} from 'lucide-react';

/* ============================================================================
   SHARED UI HELPERS (self-contained inside Contact.tsx)
============================================================================ */

interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ children, dark = false }) => (
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

interface SectionHeadingProps {
  label?: string;
  firstPart: string;
  highlightPart: string;
  lastPart?: string;
  dark?: boolean;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
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
      className={`text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.16] tracking-[-0.02em] ${
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
  target?: string;
  rel?: string;
  iconLeft?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  showArrow = true,
  href,
  target,
  rel,
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

  const baseClasses = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={baseClasses}>
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
   PLACEHOLDER OFFICE LOCATIONS DATA ARRAY (easy to edit)
============================================================================ */

interface OfficeLocation {
  id: 'india' | 'us';
  tabLabel: string;
  flag: string;
  name: string;
  badge: string;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  hours: string;
  mapEmbedUrl: string;
  directionsUrl: string;
}

const OFFICES_DATA: OfficeLocation[] = [
  {
    id: 'india',
    tabLabel: 'India Office',
    flag: '🇮🇳',
    name: 'WebXCode India HQ (Noida / Delhi NCR)',
    badge: 'Engineering & Global Delivery Center',
    address: 'Plot C-24, Sector 62, Noida (Delhi NCR), Uttar Pradesh 201309, India',
    phone: '+91 98765 43210',
    phoneHref: 'tel:+919876543210',
    email: 'hello@webxcode.com',
    hours: 'Mon – Sat, 10:00 AM – 7:00 PM IST',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Sector%2062%20Noida%20Uttar%20Pradesh%20India&t=&z=13&ie=UTF8&iwloc=&output=embed',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Sector+62+Noida+Uttar+Pradesh+India',
  },
  {
    id: 'us',
    tabLabel: 'US Office',
    flag: '🇺🇸',
    name: 'WebXCode USA (Austin, Texas)',
    badge: 'North America Strategy & Client Hub',
    address: '600 Congress Ave, Suite 1400, Austin, TX 78701, United States',
    phone: '+1 (800) 932-9263',
    phoneHref: 'tel:+18009329263',
    email: 'us@webxcode.com',
    hours: 'Mon – Fri, 9:00 AM – 6:00 PM CST / EST',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=600%20Congress%20Ave%20Austin%20TX%2078701&t=&z=14&ie=UTF8&iwloc=&output=embed',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=600+Congress+Ave+Austin+TX+78701',
  },
];

/* ============================================================================
   1. PAGE HERO (navy — 60/40 split with glowing dotted globe & curved divider)
============================================================================ */
const ContactHeroSection: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate latitude/longitude dot matrix for the 3D globe visual
  const globeDots: { cx: number; cy: number; r: number; opacity: number }[] = [];
  const rows = 11;
  for (let row = -5; row <= 5; row++) {
    const latRadius = Math.cos((row / 6) * (Math.PI / 2)) * 145;
    const cy = 190 + row * 24;
    const cols = Math.max(5, Math.round((latRadius / 145) * 14));
    for (let col = 0; col < cols; col++) {
      const angle = (col / cols) * Math.PI - Math.PI / 2;
      const cx = 190 + Math.sin(angle) * latRadius;
      const depthOpacity = 0.25 + Math.cos(angle) * 0.65;
      globeDots.push({
        cx: Number(cx.toFixed(1)),
        cy: Number(cy.toFixed(1)),
        r: Math.cos(angle) > 0.5 ? 2.4 : 1.7,
        opacity: Number(depthOpacity.toFixed(2)),
      });
    }
  }

  return (
    <section className="relative bg-navy text-white pt-12 pb-32 lg:pt-20 lg:pb-40 overflow-hidden">
      {/* Radial Blue Glows & Faint Grid Texture */}
      <div className="absolute -top-24 -left-24 w-[560px] h-[560px] blue-glow pointer-events-none" />
      <div className="absolute top-10 right-0 w-[640px] h-[640px] blue-glow-strong pointer-events-none" />
      <div className="absolute inset-0 hero-grid-bg opacity-65 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left 60% (7 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Breadcrumb: Home › Contact Us */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white/65"
            >
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-primary font-semibold" aria-current="page">
                Contact Us
              </span>
            </nav>

            {/* H1 */}
            <h1 className="text-[36px] sm:text-[48px] lg:text-[58px] font-extrabold leading-[1.09] tracking-[-0.025em] text-white">
              Let's Build Something <span className="text-primary">Amazing Together</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-[16px] sm:text-[18px] text-white/75 leading-[1.7] max-w-2xl">
              Have a project in mind or want to discuss how we can help your business grow? We're
              just a message away.
            </p>

            {/* 3 Inline Highlights with Blue Icons in Translucent Circles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                {
                  icon: Clock,
                  title: 'Quick Response',
                  sub: 'Within 24 hours',
                },
                {
                  icon: Sparkles,
                  title: 'Expert Consultation',
                  sub: '100% free',
                },
                {
                  icon: Layers,
                  title: 'Tailored Solutions',
                  sub: 'For your business',
                },
              ].map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0">
                      <IconComp className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-white leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[12px] text-white/70 mt-0.5">{item.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <Button size="lg" onClick={scrollToForm}>
                Send Us a Message
              </Button>
            </div>
          </motion.div>

          {/* Right 40% (5 columns): Glowing Dotted Globe + Floating Glass Card + Handwritten Note */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
          >
            {/* Handwritten Annotation Top-Right */}
            <div className="hidden sm:flex items-center gap-2 self-end mb-2 mr-2 text-white">
              <span className="font-script text-[22px] tracking-wide text-white/95 -rotate-3">
                Your Ideas. Our Code. Global Impact.
              </span>
              <svg
                width="44"
                height="34"
                viewBox="0 0 44 34"
                fill="none"
                className="text-primary shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M4 4C18 4 30 12 34 28M34 28L26 23M34 28L39 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Glowing Dotted Globe SVG */}
            <div className="relative w-[310px] h-[310px] sm:w-[370px] sm:h-[370px] flex items-center justify-center">
              {/* Outer Ambient Halo */}
              <div className="absolute inset-4 rounded-full bg-primary/15 blur-2xl pointer-events-none" />

              {/* Slowly Rotating Dotted Sphere Ring */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                viewBox="0 0 380 380"
                className="w-full h-full"
                aria-hidden="true"
              >
                {/* Outer Orbit Rings */}
                <circle
                  cx="190"
                  cy="190"
                  r="166"
                  fill="none"
                  stroke="#0571c2"
                  strokeOpacity="0.22"
                  strokeDasharray="4 6"
                  strokeWidth="1.25"
                />
                <circle
                  cx="190"
                  cy="190"
                  r="150"
                  fill="#0571c2"
                  fillOpacity="0.06"
                  stroke="#0571c2"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                />

                {/* Dotted Matrix */}
                {globeDots.map((dot, idx) => (
                  <circle
                    key={idx}
                    cx={dot.cx}
                    cy={dot.cy}
                    r={dot.r}
                    fill="#0571c2"
                    fillOpacity={dot.opacity}
                  />
                ))}
              </motion.svg>

              {/* Static Overlay for India & USA Pulsing Markers + Curved Glowing Arc */}
              <svg
                viewBox="0 0 380 380"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-label="Global connection between USA and India offices"
              >
                <defs>
                  <linearGradient id="globeArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#0571c2" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>

                {/* Glowing Curved Connection Line between USA (112, 148) and India (268, 178) */}
                <path
                  d="M112 148 Q190 68 268 178"
                  fill="none"
                  stroke="#0571c2"
                  strokeWidth="5"
                  strokeOpacity="0.3"
                  strokeLinecap="round"
                />
                <path
                  d="M112 148 Q190 68 268 178"
                  fill="none"
                  stroke="url(#globeArcGrad)"
                  strokeWidth="2.25"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                />

                {/* USA Marker (Left-Top) */}
                <g transform="translate(112, 148)">
                  <circle
                    r="16"
                    fill="#0571c2"
                    fillOpacity="0.35"
                    className="animate-ping [animation-duration:2.8s]"
                  />
                  <circle r="7" fill="#0571c2" stroke="#ffffff" strokeWidth="2.5" />
                  <rect
                    x="-34"
                    y="-32"
                    width="68"
                    height="20"
                    rx="10"
                    fill="#1e242e"
                    stroke="#0571c2"
                    strokeWidth="1.2"
                  />
                  <text
                    x="0"
                    y="-19"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="700"
                  >
                    🇺🇸 USA
                  </text>
                </g>

                {/* India Marker (Right-Mid) */}
                <g transform="translate(268, 178)">
                  <circle
                    r="16"
                    fill="#0571c2"
                    fillOpacity="0.35"
                    className="animate-ping [animation-duration:2.8s]"
                  />
                  <circle r="7" fill="#0571c2" stroke="#ffffff" strokeWidth="2.5" />
                  <rect
                    x="-38"
                    y="-32"
                    width="76"
                    height="20"
                    rx="10"
                    fill="#1e242e"
                    stroke="#0571c2"
                    strokeWidth="1.2"
                  />
                  <text
                    x="0"
                    y="-19"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="700"
                  >
                    🇮🇳 INDIA
                  </text>
                </g>
              </svg>

              {/* Floating Glass Card Over the Globe */}
              <div className="absolute -bottom-3 sm:bottom-2 left-1/2 -translate-x-1/2 w-[92%] sm:w-[340px] p-4 rounded-[20px] bg-navy/85 border border-white/20 backdrop-blur-md shadow-2xl flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-white leading-snug">
                    Global Clients, Local Support
                  </div>
                  <p className="text-[12px] text-white/75 leading-relaxed mt-0.5">
                    We work with businesses across India, the US and worldwide.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Soft Curved Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-14 text-white"
          preserveAspectRatio="none"
        >
          <path
            d="M0 64H1440V16C1220 56 960 64 720 64C480 64 220 56 0 16V64Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

/* ============================================================================
   2. QUICK CONNECT STRIP (white, overlapping bottom of hero by ~60px)
============================================================================ */
const QuickConnectStrip: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  return (
    <section className="relative z-20 bg-white pb-12 lg:pb-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 -mt-14 sm:-mt-16">
        <div className="bg-white rounded-[24px] border border-navy-08 shadow-xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-navy-08">
          {/* 1. Call Us */}
          <div className="group p-6 sm:p-7 hover:bg-primary-50 transition-colors duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-[18px] font-bold text-navy mb-2">Call Us</h3>
              <div className="space-y-1 text-[14px] font-semibold text-navy-90">
                <div>
                  <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                    🇮🇳 +91 98765 43210
                  </a>
                </div>
                <div>
                  <a href="tel:+18009329263" className="hover:text-primary transition-colors">
                    🇺🇸 +1 (800) 932-9263
                  </a>
                </div>
              </div>
            </div>
            <p className="text-[12px] font-medium text-navy-50 mt-3 pt-3 border-t border-navy-08">
              Mon–Sat, 10 AM – 7 PM IST
            </p>
          </div>

          {/* 2. WhatsApp */}
          <a
            href="https://wa.me/18009329263?text=Hi%20WebXCode%2C%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 sm:p-7 hover:bg-primary-50 transition-colors duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-[18px] font-bold text-navy mb-1.5">WhatsApp</h3>
              <p className="text-[14px] text-navy-70 leading-relaxed">
                Chat with us instantly for quick questions & estimates.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-navy-08 inline-flex items-center gap-1.5 text-[13px] font-bold text-primary">
              <span>Start WhatsApp Chat</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>

          {/* 3. Email Us */}
          <div className="group p-6 sm:p-7 hover:bg-primary-50 transition-colors duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-[18px] font-bold text-navy mb-2">Email Us</h3>
              <div className="space-y-1 text-[14px] font-semibold text-navy-90">
                <div>
                  <a
                    href="mailto:hello@webxcode.com"
                    className="hover:text-primary transition-colors"
                  >
                    hello@webxcode.com
                  </a>
                </div>
                <div>
                  <a
                    href="mailto:support@webxcode.com"
                    className="hover:text-primary transition-colors"
                  >
                    support@webxcode.com
                  </a>
                </div>
              </div>
            </div>
            <p className="text-[12px] font-medium text-navy-50 mt-3 pt-3 border-t border-navy-08">
              Guaranteed response under 24 hrs
            </p>
          </div>

          {/* 4. Book a Call */}
          <div
            onClick={() => onOpenQuoteModal('Free 30-Min Consultation Call')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenQuoteModal('Free 30-Min Consultation Call');
              }
            }}
            className="group p-6 sm:p-7 hover:bg-primary-50 transition-colors duration-200 flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-[18px] font-bold text-navy mb-1.5">Book a Call</h3>
              <p className="text-[14px] text-navy-70 leading-relaxed">
                Free 30-min consultation with our senior solutions architect.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-navy-08 inline-flex items-center gap-1.5 text-[13px] font-bold text-primary">
              <span>Schedule Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   3. CONTACT FORM + PROJECT DETAILS (light blue tint — id="contact-form")
============================================================================ */

const SERVICE_OPTIONS = [
  'Website Development',
  'Web App',
  'E-commerce',
  'Mobile App',
  'UI/UX Design',
  'SEO',
  'Performance Marketing / Google Ads',
  'AI Chatbot',
  'AI Automation',
  'Maintenance & Support',
  'Other',
];

const INR_BUDGET_OPTIONS = [
  'Under ₹50K',
  '₹50K–₹2L',
  '₹2L–₹5L',
  '₹5L+',
  'Not sure yet',
];

const USD_BUDGET_OPTIONS = [
  'Under $1K',
  '$1K–$3K',
  '$3K–$7K',
  '$7K+',
  'Not sure yet',
];

const TIMELINE_OPTIONS = ['ASAP', '1–2 Months', '3+ Months', 'Just exploring'];

const COUNTRY_CODES = [
  { code: '+91', label: '🇮🇳 +91 (IN)' },
  { code: '+1', label: '🇺🇸 +1 (US/CA)' },
  { code: '+44', label: '🇬🇧 +44 (UK)' },
  { code: '+971', label: '🇦🇪 +971 (UAE)' },
  { code: '+61', label: '🇦🇺 +61 (AU)' },
  { code: '+65', label: '🇸🇬 +65 (SG)' },
];

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  services?: string;
  message?: string;
  privacyAccepted?: string;
}

const ContactFormSection: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Website Development']);
  const [budget, setBudget] = useState<string>('₹50K–₹2L');
  const [timeline, setTimeline] = useState<string>('1–2 Months');
  const [message, setMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Spam protection honeypot

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isUSSelected = countryCode === '+1';
  const budgetOptions = isUSSelected ? USD_BUDGET_OPTIONS : INR_BUDGET_OPTIONS;

  // Keep budget chip synced when switching between INR and USD country codes
  useEffect(() => {
    if (isUSSelected && INR_BUDGET_OPTIONS.includes(budget) && budget !== 'Not sure yet') {
      const idx = INR_BUDGET_OPTIONS.indexOf(budget);
      setBudget(USD_BUDGET_OPTIONS[idx] || '$1K–$3K');
    } else if (!isUSSelected && USD_BUDGET_OPTIONS.includes(budget) && budget !== 'Not sure yet') {
      const idx = USD_BUDGET_OPTIONS.indexOf(budget);
      setBudget(INR_BUDGET_OPTIONS[idx] || '₹50K–₹2L');
    }
  }, [countryCode, isUSSelected, budget]);

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid work or personal email address.';
    }

    if (phone.trim() && !/^[0-9\s\-()]{6,15}$/.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (6–15 digits).';
    }

    if (selectedServices.length === 0) {
      newErrors.services = 'Please select at least one service you need.';
    }

    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = 'Please share a few details about your project (at least 10 characters).';
    }

    if (!privacyAccepted) {
      newErrors.privacyAccepted = 'Please agree to the Privacy Policy before submitting.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Spam honeypot check: silently ignore if bots filled hidden field
    if (honeypot) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // TODO: Connect backend / email delivery service here (e.g. Formspree, EmailJS, Resend, or POST /api/contact)
    // Payload ready to send:
    // const payload = { fullName, email, company, phone: `${countryCode} ${phone}`, selectedServices, budget, timeline, message };

    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setCompany('');
    setPhone('');
    setSelectedServices(['Website Development']);
    setBudget(isUSSelected ? '$1K–$3K' : '₹50K–₹2L');
    setTimeline('1–2 Months');
    setMessage('');
    setPrivacyAccepted(false);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="contact-form" className="bg-primary-50 py-[72px] lg:py-[112px] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 60% (7 columns) — Large White Form Card */}
          <div className="lg:col-span-7 bg-white rounded-[24px] border border-navy-08 shadow-soft p-6 sm:p-10 lg:p-12">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="py-12 px-4 text-center"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                  className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-6 shadow-[0_12px_30px_-4px_rgba(5,113,194,0.55)]"
                >
                  <CheckCircle2 className="w-10 h-10" strokeWidth={2.2} />
                </motion.div>

                <SectionLabel>MESSAGE RECEIVED</SectionLabel>
                <h3 className="text-[26px] sm:text-[32px] font-extrabold text-navy mt-4 mb-3">
                  Thank you! Your message has been sent.
                </h3>
                <p className="text-[16px] text-navy-70 max-w-md mx-auto leading-relaxed mb-8">
                  Our team will reach out within <strong className="text-navy">24 hours</strong>{' '}
                  with next steps and a tailored consultation for{' '}
                  <span className="text-primary font-semibold">
                    {selectedServices.join(', ')}
                  </span>
                  .
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-[15px] font-bold text-primary hover:underline underline-offset-4 cursor-pointer"
                >
                  <span>Send Another Message</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <SectionHeading
                    label="GET IN TOUCH"
                    firstPart="Tell Us About Your"
                    highlightPart="Project"
                    className="mb-2.5"
                  />
                  <p className="text-[15px] sm:text-[16px] text-navy-70">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Hidden Honeypot Input for Spam Protection */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-website-url">Website URL</label>
                    <input
                      id="contact-website-url"
                      name="website_url"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[13px] font-bold text-navy mb-1.5"
                      >
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName)
                              setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }}
                          placeholder="Rahul Sharma"
                          aria-invalid={Boolean(errors.fullName)}
                          aria-describedby={errors.fullName ? 'error-fullname' : undefined}
                          className={`w-full pl-10 pr-4 py-3 rounded-[12px] border text-[14px] text-navy placeholder:text-navy-50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all ${
                            errors.fullName ? 'border-red-400' : 'border-navy-15'
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p
                          id="error-fullname"
                          className="mt-1.5 text-[12px] font-medium text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[13px] font-bold text-navy mb-1.5"
                      >
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email)
                              setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          placeholder="rahul@company.com"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'error-email' : undefined}
                          className={`w-full pl-10 pr-4 py-3 rounded-[12px] border text-[14px] text-navy placeholder:text-navy-50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all ${
                            errors.email ? 'border-red-400' : 'border-navy-15'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p
                          id="error-email"
                          className="mt-1.5 text-[12px] font-medium text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Company Name & Phone Number with Country Code Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Company Name */}
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-[13px] font-bold text-navy mb-1.5"
                      >
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="contact-company"
                          name="organization"
                          type="text"
                          autoComplete="organization"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Technologies"
                          className="w-full pl-10 pr-4 py-3 rounded-[12px] border border-navy-15 text-[14px] text-navy placeholder:text-navy-50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone Number with Country Code Selector (default +91) */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-[13px] font-bold text-navy mb-1.5"
                      >
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <select
                          aria-label="Country code"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="px-2.5 py-3 rounded-[12px] border border-navy-15 bg-white text-[13px] font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary shrink-0 cursor-pointer"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <div className="relative flex-1">
                          <Phone className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="contact-phone"
                            name="tel"
                            type="tel"
                            autoComplete="tel"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (errors.phone)
                                setErrors((prev) => ({ ...prev, phone: undefined }));
                            }}
                            placeholder={isUSSelected ? '(555) 234-5678' : '98765 43210'}
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? 'error-phone' : undefined}
                            className={`w-full pl-9 pr-3.5 py-3 rounded-[12px] border text-[14px] text-navy placeholder:text-navy-50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all ${
                              errors.phone ? 'border-red-400' : 'border-navy-15'
                            }`}
                          />
                        </div>
                      </div>
                      {errors.phone && (
                        <p
                          id="error-phone"
                          className="mt-1.5 text-[12px] font-medium text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Multi-Select Chips: "What do you need?" */}
                  <div>
                    <span className="block text-[13px] font-bold text-navy mb-2">
                      What do you need? <span className="text-primary">*</span>{' '}
                      <span className="font-normal text-navy-50">(Select all that apply)</span>
                    </span>
                    <div
                      className="flex flex-wrap gap-2"
                      role="group"
                      aria-label="Services needed"
                    >
                      {SERVICE_OPTIONS.map((srv) => {
                        const isSelected = selectedServices.includes(srv);
                        return (
                          <button
                            key={srv}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => toggleService(srv)}
                            className={`px-3.5 py-2 rounded-full text-[13px] font-semibold border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                              isSelected
                                ? 'bg-primary text-white border-primary shadow-xs'
                                : 'bg-white text-navy-90 border-primary/35 hover:border-primary hover:bg-primary-50'
                            }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                    {errors.services && (
                      <p className="mt-1.5 text-[12px] font-medium text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.services}</span>
                      </p>
                    )}
                  </div>

                  {/* Single-Select Pill Chips: Budget Range + Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Budget Range */}
                    <div>
                      <span className="block text-[13px] font-bold text-navy mb-2">
                        Estimated Budget{' '}
                        <span className="font-normal text-navy-50">
                          ({isUSSelected ? 'USD' : 'INR'})
                        </span>
                      </span>
                      <div
                        className="flex flex-wrap gap-2"
                        role="group"
                        aria-label="Budget range"
                      >
                        {budgetOptions.map((item) => {
                          const active = budget === item;
                          return (
                            <button
                              key={item}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setBudget(item)}
                              className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                                active
                                  ? 'bg-primary text-white border-primary'
                                  : 'bg-white text-navy-70 border-navy-15 hover:border-primary hover:text-primary'
                              }`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <span className="block text-[13px] font-bold text-navy mb-2">
                        Expected Timeline
                      </span>
                      <div
                        className="flex flex-wrap gap-2"
                        role="group"
                        aria-label="Project timeline"
                      >
                        {TIMELINE_OPTIONS.map((item) => {
                          const active = timeline === item;
                          return (
                            <button
                              key={item}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setTimeline(item)}
                              className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                                active
                                  ? 'bg-primary text-white border-primary'
                                  : 'bg-white text-navy-70 border-navy-15 hover:border-primary hover:text-primary'
                              }`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Message Textarea with Live Character Counter */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-message"
                        className="text-[13px] font-bold text-navy"
                      >
                        Project Details & Message <span className="text-primary">*</span>
                      </label>
                      <span className="text-[12px] text-navy-50 tabular-nums">
                        {message.length} / 1000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      maxLength={1000}
                      required
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message)
                          setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Tell us about your project, goals and requirements…"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      className={`w-full p-4 rounded-[12px] border text-[14px] text-navy placeholder:text-navy-50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all resize-y ${
                        errors.message ? 'border-red-400' : 'border-navy-15'
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="error-message"
                        className="mt-1.5 text-[12px] font-medium text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Privacy Policy Checkbox */}
                  <div>
                    <label className="inline-flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(e) => {
                          setPrivacyAccepted(e.target.checked);
                          if (errors.privacyAccepted)
                            setErrors((prev) => ({ ...prev, privacyAccepted: undefined }));
                        }}
                        aria-invalid={Boolean(errors.privacyAccepted)}
                        aria-describedby={
                          errors.privacyAccepted ? 'error-privacy' : undefined
                        }
                        className="mt-1 w-4 h-4 rounded border-navy-30 accent-primary focus:ring-primary cursor-pointer"
                      />
                      <span className="text-[13px] text-navy-70">
                        I agree to the{' '}
                        <Link
                          to="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link
                          to="/terms-and-conditions"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-primary hover:underline"
                        >
                          Terms & Conditions
                        </Link>{' '}
                        and consent to WebXCode contacting me regarding my enquiry.{' '}
                        <span className="text-primary">*</span>
                      </span>
                    </label>
                    {errors.privacyAccepted && (
                      <p
                        id="error-privacy"
                        className="mt-1.5 text-[12px] font-medium text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.privacyAccepted}</span>
                      </p>
                    )}
                  </div>

                  {/* Full-Width Submit Button with Loading Spinner State */}
                  <div>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      showArrow={!isSubmitting}
                      iconLeft={
                        isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : undefined
                      }
                      className="w-full justify-center"
                    >
                      {isSubmitting ? 'Sending Your Message...' : 'Send Message'}
                    </Button>

                    <div className="mt-3.5 flex items-center justify-center gap-2 text-[12px] font-medium text-navy-50">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                      <span>We respect your privacy. Your information is safe with us.</span>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Right 40% (5 columns) — Sticky Info Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            {/* Card 1: Navy Card with Blue Glow ("Prefer a Quick Chat?") */}
            <div className="relative bg-navy text-white rounded-[20px] p-7 sm:p-8 overflow-hidden shadow-xl">
              <div className="absolute -top-16 -right-16 w-56 h-56 blue-glow-strong pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-[11px] font-bold uppercase tracking-wider text-white mb-4">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>Direct Strategy Call</span>
                </div>
                <h3 className="text-[22px] font-extrabold text-white mb-2">
                  Prefer a Quick Chat?
                </h3>
                <p className="text-[14px] text-white/75 leading-relaxed mb-6">
                  Schedule a free consultation call with our experts.
                </p>
                <Button
                  size="md"
                  onClick={() => onOpenQuoteModal('Free Consultation Call')}
                >
                  Book a Call
                </Button>
              </div>
            </div>

            {/* Card 2: White Card ("What happens next?" — 3-step vertical list) */}
            <div className="bg-white rounded-[20px] border border-navy-08 shadow-soft p-7 sm:p-8">
              <h3 className="text-[19px] font-extrabold text-navy mb-5">
                What happens next?
              </h3>
              <div className="space-y-5 relative">
                {/* Connecting Vertical Line */}
                <div className="absolute left-4 top-4 bottom-4 w-[2px] bg-primary-100 pointer-events-none" />

                {[
                  {
                    num: '1',
                    title: 'We review your requirements',
                    sub: 'Detailed evaluation by a senior architect within 24 hrs',
                  },
                  {
                    num: '2',
                    title: 'We schedule a free discovery call',
                    sub: 'Align on goals, technical scope, and growth targets',
                  },
                  {
                    num: '3',
                    title: 'You get a clear proposal and timeline',
                    sub: 'Transparent fixed-milestone roadmap with zero surprises',
                  },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-4 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-primary text-white text-[13px] font-extrabold flex items-center justify-center shrink-0 shadow-xs tabular-nums">
                      {step.num}
                    </div>
                    <div>
                      <div className="text-[15px] font-bold text-navy leading-snug">
                        {step.title}
                      </div>
                      <div className="text-[13px] text-navy-70 mt-0.5">{step.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: White Card ("Trusted by 100+ businesses") */}
            <div className="bg-white rounded-[20px] border border-navy-08 shadow-soft p-6 sm:p-7 flex items-center justify-between gap-4">
              <div className="flex items-center -space-x-2.5 shrink-0">
                {['DM', 'SJ', 'RM', 'OA'].map((initials, i) => (
                  <div
                    key={initials}
                    className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-[12px] font-extrabold text-white shadow-xs ${
                      i % 2 === 0 ? 'bg-navy' : 'bg-primary'
                    }`}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 text-primary mb-1" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <div className="text-[14px] font-extrabold text-navy">
                  Trusted by 100+ businesses
                </div>
                <div className="text-[12px] font-semibold text-primary">
                  98% client satisfaction
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
   4. OUR OFFICES + MAP (white — tabbed full-width map with floating office card)
============================================================================ */
const OurOfficesMapSection: React.FC = () => {
  const [activeOfficeId, setActiveOfficeId] = useState<'india' | 'us'>('india');
  const activeOffice =
    OFFICES_DATA.find((o) => o.id === activeOfficeId) || OFFICES_DATA[0];

  return (
    <section className="bg-white py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Heading Row + One-Line Description on Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <SectionHeading
            label="VISIT US"
            firstPart="Our"
            highlightPart="Offices"
          />
          <p className="text-[16px] text-navy-70 max-w-md lg:text-right">
            Strategically located across India and the United States to deliver seamless support
            across every time zone.
          </p>
        </div>

        {/* Pill Tabs Above the Map */}
        <div className="flex items-center gap-3 mb-6" role="tablist" aria-label="Office Locations">
          {OFFICES_DATA.map((office) => {
            const isActive = office.id === activeOfficeId;
            return (
              <button
                key={office.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveOfficeId(office.id)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-bold inline-flex items-center gap-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isActive
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-primary-50 text-navy-70 hover:text-primary'
                }`}
              >
                <span className="text-[16px]">{office.flag}</span>
                <span>{office.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Stacked Card on Mobile / Floating Card Over Rounded Map Container on Desktop */}
        <div className="relative rounded-[24px] overflow-hidden border border-navy-08 shadow-soft bg-navy/5">
          {/* Floating White Office Card (stacked above map on mobile, floating top-left on lg+) */}
          <div className="lg:absolute lg:top-6 lg:left-6 lg:z-20 lg:w-[390px] bg-white rounded-[20px] p-6 sm:p-7 border-b lg:border border-navy-08 shadow-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-bold uppercase tracking-wider mb-3">
              <span>{activeOffice.badge}</span>
            </div>

            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-[24px]" aria-hidden="true">
                {activeOffice.flag}
              </span>
              <h3 className="text-[20px] font-extrabold text-navy leading-snug">
                {activeOffice.name}
              </h3>
            </div>

            <div className="space-y-3 text-[14px] text-navy-70 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                <span>{activeOffice.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={activeOffice.phoneHref}
                  className="font-semibold text-navy hover:text-primary transition-colors"
                >
                  {activeOffice.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={`mailto:${activeOffice.email}`}
                  className="font-semibold text-navy hover:text-primary transition-colors"
                >
                  {activeOffice.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>{activeOffice.hours}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <Button
                size="sm"
                href={activeOffice.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-center"
              >
                Get Directions
              </Button>
              {activeOffice.id === 'india' && (
                <Link
                  to="/locations/delhi"
                  className="w-full py-2 px-4 rounded-full bg-primary-50 hover:bg-navy text-primary hover:text-white text-[12.5px] font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Our Delhi NCR Hub Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* Map Iframe Container (~460px height) with subtle blue/desaturated overlay */}
          <div className="relative h-[360px] sm:h-[460px] w-full bg-navy">
            <iframe
              key={activeOffice.id}
              src={activeOffice.mapEmbedUrl}
              title={`Google Map location for ${activeOffice.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0 grayscale contrast-105 opacity-90"
            />
            {/* Soft Brand Blue Tint Overlay */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   5. HOW CAN WE HELP? — DEPARTMENT ROUTING (light blue tint — 4 list-style rows)
============================================================================ */
const DepartmentRoutingSection: React.FC = () => {
  const departments = [
    {
      icon: Rocket,
      title: 'New Projects & Sales',
      desc: 'Start a new website, app or AI project',
      email: 'sales@webxcode.com',
      careerRoute: undefined,
    },
    {
      icon: LifeBuoy,
      title: 'Support & Maintenance',
      desc: 'Help with an existing project',
      email: 'support@webxcode.com',
      careerRoute: undefined,
    },
    {
      icon: Handshake,
      title: 'Partnerships',
      desc: 'Agencies and collaboration opportunities',
      email: 'partners@webxcode.com',
      careerRoute: undefined,
    },
    {
      icon: Briefcase,
      title: 'Careers',
      desc: 'Join the WebXCode team',
      email: 'careers@webxcode.com',
      careerRoute: '/about#careers',
    },
  ];

  return (
    <section className="bg-primary-50 py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <SectionHeading
            label="REACH THE RIGHT TEAM"
            firstPart="How Can We"
            highlightPart="Help You?"
          />
        </div>

        {/* 4 Horizontal List-Style Rows with Thin Dividers */}
        <div className="border-t border-b border-navy-15 divide-y divide-navy-15">
          {departments.map((dept) => {
            const IconComp = dept.icon;
            return (
              <div
                key={dept.title}
                className="group py-6 sm:py-7 px-4 sm:px-6 -mx-4 sm:-mx-6 hover:bg-white/90 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl"
              >
                {/* Left + Middle: Blue Icon + Title & One-Line Description */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-primary-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 flex items-center justify-center shrink-0 shadow-xs">
                    <IconComp className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-[19px] sm:text-[21px] font-extrabold text-navy group-hover:text-primary transition-colors">
                        {dept.title}
                      </h3>
                      {dept.careerRoute && (
                        <Link
                          to={dept.careerRoute}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-50 text-primary text-[11px] font-bold hover:bg-primary hover:text-white transition-colors"
                        >
                          <span>View Open Roles</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                    <p className="text-[15px] text-navy-70 mt-0.5">{dept.desc}</p>
                  </div>
                </div>

                {/* Right: Email Address + Arrow Button */}
                <div className="flex items-center justify-between md:justify-end gap-4 pl-16 md:pl-0">
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-[15px] sm:text-[16px] font-bold text-primary hover:underline underline-offset-4"
                  >
                    {dept.email}
                  </a>
                  <a
                    href={`mailto:${dept.email}`}
                    aria-label={`Email ${dept.title} at ${dept.email}`}
                    className="w-10 h-10 rounded-full bg-white border border-navy-15 text-navy group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-200 flex items-center justify-center shrink-0"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
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
   6. CONTACT FAQ (white — centered heading + 2-column accordion, 3 per column)
============================================================================ */
const CONTACT_FAQ_ITEMS = [
  {
    q: 'How quickly will you respond to my enquiry?',
    a: 'We respond to all project enquiries within 24 hours on business days—and often within 2 to 4 hours during India and US working hours.',
  },
  {
    q: 'Is the first consultation really free?',
    a: 'Yes, 100% free and with zero obligation. You will speak directly with a senior solutions architect who will review your goals and suggest a practical technical roadmap.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Absolutely. Over 65% of our clients are in the United States, UK, UAE, Canada, Australia, and Singapore. Our teams align with your time zone for weekly sprint reviews and communication.',
  },
  {
    q: 'What information should I share about my project?',
    a: 'Simply share your core business goal, any reference websites or features you like, your rough timeline, and an approximate budget range. Even if you only have a rough idea, we will help you structure the scope.',
  },
  {
    q: 'Do you sign an NDA before discussing my project?',
    a: 'Yes. We treat every enquiry with strict confidentiality and are happy to sign a mutual Non-Disclosure Agreement (NDA) before you share proprietary documents or product ideas.',
  },
  {
    q: 'What are your working hours?',
    a: 'Our India HQ operates Monday to Saturday from 10:00 AM to 7:00 PM IST, while our US client desk operates Monday to Friday from 9:00 AM to 6:00 PM CST/EST.',
  },
];

const ContactFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const renderAccordionCard = (item: { q: string; a: string }, idx: number) => {
    const isOpen = openIndex === idx;
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
          onClick={() => setOpenIndex(isOpen ? null : idx)}
          className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
        >
          <h3
            className={`text-[16px] sm:text-[17px] font-bold leading-snug transition-colors ${
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
          <div className="px-6 pb-6 pt-1 text-[14px] sm:text-[15px] text-navy-70 leading-[1.7] border-t border-navy-08/60">
            {item.a}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="bg-white py-[72px] lg:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          align="center"
          label="FAQ"
          firstPart="Before You"
          highlightPart="Reach Out"
          className="mb-12"
        />

        {/* 2-Column Accordion Grid (3 questions per column) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            {CONTACT_FAQ_ITEMS.slice(0, 3).map((item, i) => renderAccordionCard(item, i))}
          </div>
          <div className="space-y-4">
            {CONTACT_FAQ_ITEMS.slice(3, 6).map((item, i) =>
              renderAccordionCard(item, i + 3)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   7. FINAL CTA (navy — centered layout with orbit rings & floating chat bubble)
============================================================================ */
const ContactFinalCTASection: React.FC<{ onOpenQuoteModal: (service?: string) => void }> = ({
  onOpenQuoteModal,
}) => {
  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-[28px] bg-navy text-white py-14 px-6 sm:px-12 lg:py-20 overflow-hidden shadow-2xl text-center">
          {/* Center Large Blue Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] blue-glow-strong pointer-events-none" />

          {/* Faint Ring / Orbit Pattern Behind Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-white/[0.06] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[740px] h-[740px] rounded-full border border-primary/15 border-dashed pointer-events-none" />

          {/* Small Floating Chat-Bubble Illustration in Brand Blue on One Side */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden lg:flex absolute top-12 right-14 w-16 h-16 rounded-2xl bg-primary/20 border border-primary/45 backdrop-blur-md items-center justify-center text-primary shadow-xl pointer-events-none"
            aria-hidden="true"
          >
            <MessageCircle className="w-8 h-8" strokeWidth={1.75} />
          </motion.div>

          <div className="max-w-2xl mx-auto relative z-10">
            <SectionHeading
              dark
              align="center"
              label="READY TO GET STARTED?"
              firstPart="Turn Your Ideas Into"
              highlightPart="Reality"
              className="mb-4"
            />
            <p className="text-[16px] sm:text-[18px] text-white/80 leading-relaxed mb-8">
              Whether you need a new website, AI integration or a complete digital solution, our
              team is here to help.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <Button
                size="lg"
                onClick={() => onOpenQuoteModal('Free Consultation')}
              >
                Get a Free Consultation
              </Button>
              <Button
                variant="outline-dark"
                size="lg"
                showArrow={false}
                iconLeft={<MessageCircle className="w-4 h-4 text-primary" />}
                href="https://wa.me/18009329263?text=Hi%20WebXCode%2C%20I%27d%20like%20a%20free%20consultation."
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </Button>
            </div>

            <div className="inline-flex items-center justify-center gap-2 text-[13px] font-medium text-white/75">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>No obligation. Just a friendly conversation.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   MAIN CONTACT PAGE EXPORT
============================================================================ */
interface ContactProps {
  onOpenQuoteModal?: (service?: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenQuoteModal }) => {
  const handleOpenQuote = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: service }));
    }
  };

  /* Update Document Title & Meta Description on Route Mount */
  useEffect(() => {
    document.title = 'Contact Us | WebXCode — Get a Free Consultation';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Get in touch with WebXCode for custom website development, web applications, SEO, and AI solutions. Offices in India and the US. Free consultation and 24-hour response.'
      );
    }
  }, []);

  /* JSON-LD Structured Data: ContactPage + Organization + LocalBusiness (India & US) + FAQPage */
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': 'https://webxcode.com/contact#contactpage',
        url: 'https://webxcode.com/contact',
        name: 'Contact Us | WebXCode — Get a Free Consultation',
        description:
          'Reach out to WebXCode for custom web development, e-commerce, SEO, and AI automation solutions across India, the US, and worldwide.',
        mainEntity: {
          '@id': 'https://webxcode.com/#organization',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://webxcode.com/#organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-98765-43210',
            contactType: 'sales',
            email: 'sales@webxcode.com',
            areaServed: ['IN', 'US', 'GB', 'AE', 'CA', 'AU', 'SG'],
            availableLanguage: ['English', 'Hindi'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+1-800-932-9263',
            contactType: 'customer support',
            email: 'support@webxcode.com',
            areaServed: ['US', 'IN', 'Global'],
            availableLanguage: ['English'],
          },
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://webxcode.com/#india-office',
        name: 'WebXCode India HQ',
        telephone: '+91-98765-43210',
        email: 'hello@webxcode.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Plot C-24, Sector 62',
          addressLocality: 'Noida',
          addressRegion: 'Uttar Pradesh',
          postalCode: '201309',
          addressCountry: 'IN',
        },
        openingHours: 'Mo-Sa 10:00-19:00',
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://webxcode.com/#us-office',
        name: 'WebXCode US Office',
        telephone: '+1-800-932-9263',
        email: 'us@webxcode.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '600 Congress Ave, Suite 1400',
          addressLocality: 'Austin',
          addressRegion: 'TX',
          postalCode: '78701',
          addressCountry: 'US',
        },
        openingHours: 'Mo-Fr 09:00-18:00',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://webxcode.com/contact#faq',
        mainEntity: CONTACT_FAQ_ITEMS.map((item) => ({
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
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* 1. Page Hero (navy — 60/40 split with glowing dotted globe) */}
      <ContactHeroSection />

      {/* 2. Quick Connect Strip (white — overlapping bottom of hero) */}
      <QuickConnectStrip onOpenQuoteModal={handleOpenQuote} />

      {/* 3. Contact Form + Project Details (light blue tint — #contact-form) */}
      <ContactFormSection onOpenQuoteModal={handleOpenQuote} />

      {/* 4. Our Offices + Map (white — tabbed map with floating office card) */}
      <OurOfficesMapSection />

      {/* 5. How Can We Help? — Department Routing (light blue tint — 4 list rows) */}
      <DepartmentRoutingSection />

      {/* 6. Contact FAQ (white — centered heading + 2-column accordion) */}
      <ContactFAQSection />

      {/* 7. Final CTA (navy — centered rounded container) */}
      <ContactFinalCTASection onOpenQuoteModal={handleOpenQuote} />
    </main>
  );
};

export default Contact;
