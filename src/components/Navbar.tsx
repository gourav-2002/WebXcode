import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Globe,
  Cpu,
  Building2,
  MapPin,
  Sparkles,
  Bot,
  MessageSquare,
  Mic,
  Workflow,
  Mail,
  Phone,
} from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline-dark' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  showArrow?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
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

const WebXCodeLogo: React.FC<{ darkBg?: boolean }> = ({ darkBg = false }) => {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      {/* Geometric X-Bracket Emblem strictly in Primary Blue & White/Navy */}
      <svg
        width="36"
        height="32"
        viewBox="0 0 36 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <path
          d="M11 4L3 16L11 28"
          stroke="#0571c2"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25 4L33 16L25 28"
          stroke="#0571c2"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 9L22 23M22 9L14 23"
          stroke={darkBg ? '#ffffff' : '#1e242e'}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[22px] font-extrabold tracking-tight leading-none">
        <span className={darkBg ? 'text-white' : 'text-navy'}>Web</span>
        <span className="text-primary">X</span>
        <span className={darkBg ? 'text-white' : 'text-navy'}>Code</span>
      </span>
    </span>
  );
};

interface NavbarProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

type MegaMenuKey = 'services' | 'ai' | 'industries' | 'locations' | 'about' | null;

const SERVICES_MEGA = {
  webAndApps: [
    { name: 'Website Development', slug: 'website-development', to: '/services/website-development' },
    { name: 'Web Application Development', slug: 'web-application-development', to: '/services#web-application-development' },
    { name: 'E-commerce Development', slug: 'ecommerce-development', to: '/services/ecommerce-development' },
    { name: 'Mobile App Development', slug: 'mobile-app-development', to: '/services/mobile-app-development' },
    { name: 'UI/UX Design', slug: 'ui-ux-design', to: '/services#ui-ux-design' },
    { name: 'WordPress & Shopify Development', slug: 'wordpress-shopify-development', to: '/services/wordpress-shopify-development' },
    { name: 'Website Maintenance & Support', slug: 'website-maintenance-support', to: '/services/website-maintenance-support' },
    { name: 'Managed IT Services', slug: 'managed-it-services', to: '/services/managed-it-services', badge: 'NEW' },
  ],
  seoAndPerformance: [
    { name: 'SEO Services', slug: 'seo-services', to: '/services/seo-services' },
    { name: 'Local SEO', slug: 'local-seo', to: '/services/local-seo' },
    { name: 'AEO Services', slug: 'aeo-services', to: '/services/aeo-services', badge: 'NEW' },
    { name: 'GEO (Generative Engine Optimization)', slug: 'geo-generative-engine-optimization', to: '/services/geo-generative-engine-optimization', badge: 'NEW' },
    { name: 'Performance Marketing', slug: 'performance-marketing', to: '/services/performance-marketing', badge: 'MOST DEMANDED', solidBadge: true },
    { name: 'Google Ads (SEM)', slug: 'google-ads-sem', to: '/services/google-ads-sem' },
    { name: 'Conversion Rate Optimization', slug: 'conversion-rate-optimization', to: '/services/conversion-rate-optimization' },
    { name: 'Analytics & Tracking Setup', slug: 'analytics-tracking-setup', to: '/services/analytics-tracking-setup' },
  ],
  brandAndContent: [
    { name: 'Branding & Logo Design', slug: 'branding-logo-design', to: '/services/branding-logo-design' },
    { name: 'Creative & Communication', slug: 'creative-communication', to: '/services/creative-communication' },
    { name: 'Content Marketing', slug: 'content-marketing', to: '/services#content-marketing' },
    { name: 'Copywriting', slug: 'copywriting', to: '/services/copywriting' },
    { name: 'Online Reputation Management', slug: 'online-reputation-management', to: '/services#online-reputation-management' },
    { name: 'Email Marketing', slug: 'email-marketing', to: '/services/email-marketing' },
  ],
};

const AI_MEGA = {
  aiBuild: [
    { name: 'AI Chatbot Development', slug: 'ai-chatbot-development', to: '/ai-solutions/ai-chatbot-development', badge: 'BESTSELLER', solidBadge: true, icon: Bot },
    { name: 'WhatsApp AI Chatbot', slug: 'whatsapp-ai-chatbot', to: '/ai-solutions/whatsapp-ai-chatbot', icon: MessageSquare },
    { name: 'AI Voice Agents', slug: 'ai-voice-agents', to: '/ai-solutions/ai-voice-agents', badge: 'NEW', icon: Mic },
    { name: 'Custom AI / LLM Integration', slug: 'custom-ai-llm-integration', to: '/ai-solutions/custom-ai-llm-integration', icon: Cpu },
  ],
  aiMarketing: [
    { name: 'AI Generated Videos', slug: 'ai-generated-videos', to: '/ai-solutions/ai-generated-videos', badge: 'NEW' },
    { name: 'AI Content Creation', slug: 'ai-content-creation', to: '/ai-solutions/ai-content-creation' },
    { name: 'AI-Powered SEO', slug: 'ai-powered-seo', to: '/ai-solutions/ai-powered-seo' },
    { name: 'AI Ad Creatives', slug: 'ai-ad-creatives', to: '/ai-solutions/ai-ad-creatives' },
  ],
  aiAutomation: [
    { name: 'AI Workflow Automation', slug: 'ai-workflow-automation', to: '/ai-solutions/ai-workflow-automation', icon: Workflow },
    { name: 'AI Agents for Business', slug: 'ai-agents-for-business', to: '/ai-solutions/ai-agents-for-business', badge: 'NEW' },
    { name: 'CRM & Lead Automation', slug: 'crm-lead-automation', to: '/ai-solutions/crm-lead-automation' },
    { name: 'AI Analytics & Reporting', slug: 'ai-analytics-reporting', to: '/ai-solutions/ai-analytics-reporting' },
  ],
};

const INDUSTRIES_MEGA = {
  b2b: [
    { name: 'B2B / SaaS', slug: 'b2b-saas', to: '/industries/b2b-saas' },
    { name: 'Finance & Fintech', slug: 'finance-fintech', to: '/industries/finance-fintech' },
    { name: 'Interior Design & Architecture', slug: 'interior-design-architecture', to: '/industries/interior-design-architecture' },
    { name: 'Manufacturing & Industrial', slug: 'manufacturing-industrial', to: '/industries/manufacturing-industrial' },
  ],
  consumer: [
    { name: 'E-commerce', slug: 'ecommerce', to: '/industries/ecommerce' },
    { name: 'Skincare & Beauty', slug: 'skincare-beauty', to: '/industries/skincare-beauty' },
    { name: 'Home Decor & Furniture', slug: 'home-decor-furniture', to: '/industries/home-decor-furniture' },
    { name: 'Fashion & Lifestyle', slug: 'fashion-lifestyle', to: '/industries/fashion-lifestyle' },
  ],
  specialized: [
    { name: 'Healthcare', slug: 'healthcare', to: '/industries/healthcare' },
    { name: 'EV & Automotive', slug: 'ev-automotive', to: '/industries#ev-automotive' },
    { name: 'Travel & Hospitality', slug: 'travel-hospitality', to: '/industries/travel-hospitality' },
    { name: 'Education & EdTech', slug: 'education-edtech', to: '/industries/education-edtech' },
  ],
};

const LOCATIONS_MEGA = {
  india: [
    'Delhi',
    'Noida',
    'Gurgaon',
    'Jaipur',
    'Mumbai',
    'Pune',
    'Ahmedabad',
    'Bangalore',
    'Hyderabad',
    'Kolkata',
  ],
  international: ['USA', 'UK', 'UAE', 'Canada', 'Australia', 'Singapore'],
};

const ABOUT_MEGA = [
  { name: 'About WebXCode', desc: 'Our story, mission & global footprint', href: '/about', isRoute: true },
  { name: 'Our Team', desc: '50+ senior engineers, designers & AI specialists', href: '/about#team', isRoute: true },
  { name: 'Our Process', desc: 'How we turn ambitious ideas into digital impact', href: '/about#approach', isRoute: true },
  { name: 'Careers', desc: 'Join our fast-growing engineering studio', href: '/about#careers', isRoute: true },
  { name: 'Contact Us', desc: 'Get in touch with our India or US offices', href: '/contact', isRoute: true },
];

const MenuBadge: React.FC<{ text: string; solid?: boolean }> = ({ text, solid }) => (
  <span
    className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
      solid ? 'bg-primary text-white' : 'bg-primary-50 text-primary'
    }`}
  >
    {text}
  </span>
);

export const MegaMenu: React.FC<{
  activeMenu: MegaMenuKey;
  onClose: () => void;
  onOpenQuoteModal: (defaultService?: string) => void;
}> = ({ activeMenu, onClose, onOpenQuoteModal }) => {
  if (!activeMenu) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute left-0 right-0 top-full pt-3 z-50"
      role="region"
      aria-label="Submenu navigation"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="bg-white rounded-[20px] shadow-soft border border-navy-08 p-7 text-navy animate-in fade-in slide-in-from-top-2 duration-150">
          {activeMenu === 'services' && (
            <div>
              <div className="grid grid-cols-3 gap-8">
                {/* Col 1 */}
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary pb-2.5 mb-3.5 border-b border-primary-100">
                    WEB & APPS
                  </h3>
                  <ul className="space-y-2.5">
                    {SERVICES_MEGA.webAndApps.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.to}
                          onClick={onClose}
                          className="group flex items-center text-[14px] font-medium text-navy-90 hover:text-primary transition-colors py-0.5"
                        >
                          <span>{item.name}</span>
                          {item.badge && <MenuBadge text={item.badge} />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 2 */}
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary pb-2.5 mb-3.5 border-b border-primary-100">
                    SEO & PERFORMANCE
                  </h3>
                  <ul className="space-y-2.5">
                    {SERVICES_MEGA.seoAndPerformance.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.to}
                          onClick={onClose}
                          className="group flex items-center text-[14px] font-medium text-navy-90 hover:text-primary transition-colors py-0.5"
                        >
                          <span>{item.name}</span>
                          {item.badge && <MenuBadge text={item.badge} solid={item.solidBadge} />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 3 */}
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary pb-2.5 mb-3.5 border-b border-primary-100">
                    BRAND & CONTENT
                  </h3>
                  <ul className="space-y-2.5">
                    {SERVICES_MEGA.brandAndContent.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.to}
                          onClick={onClose}
                          className="group flex items-center text-[14px] font-medium text-navy-90 hover:text-primary transition-colors py-0.5"
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Strip */}
              <div className="mt-6 pt-5 border-t border-navy-08 flex items-center justify-between bg-primary-50/60 -mx-7 -mb-7 px-7 py-4 rounded-b-[20px]">
                <p className="text-[14px] text-navy-70">
                  Not sure where to start?{' '}
                  <strong className="font-bold text-navy">Talk to an expert</strong> for a custom
                  digital roadmap.
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    to="/services"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary hover:underline mr-2"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => {
                      onClose();
                      onOpenQuoteModal('Free Website & SEO Audit');
                    }}
                  >
                    Get a Free Audit
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'ai' && (
            <div className="grid grid-cols-4 gap-7 items-stretch">
              {/* Col 1 */}
              <div>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary pb-2.5 mb-3.5 border-b border-primary-100">
                  AI BUILD
                </h3>
                <ul className="space-y-3">
                  {AI_MEGA.aiBuild.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.to}
                        onClick={onClose}
                        className="flex items-center text-[14px] font-medium text-navy-90 hover:text-primary transition-colors py-0.5"
                      >
                        <span>{item.name}</span>
                        {item.badge && <MenuBadge text={item.badge} solid={item.solidBadge} />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 2 */}
              <div>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary pb-2.5 mb-3.5 border-b border-primary-100">
                  AI MARKETING
                </h3>
                <ul className="space-y-3">
                  {AI_MEGA.aiMarketing.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.to}
                        onClick={onClose}
                        className="flex items-center text-[14px] font-medium text-navy-90 hover:text-primary transition-colors py-0.5"
                      >
                        <span>{item.name}</span>
                        {item.badge && <MenuBadge text={item.badge} />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3 */}
              <div>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary pb-2.5 mb-3.5 border-b border-primary-100">
                  AI AUTOMATION
                </h3>
                <ul className="space-y-3">
                  {AI_MEGA.aiAutomation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.to}
                        onClick={onClose}
                        className="flex items-center text-[14px] font-medium text-navy-90 hover:text-primary transition-colors py-0.5"
                      >
                        <span>{item.name}</span>
                        {item.badge && <MenuBadge text={item.badge} />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4: Navy Feature Card */}
              <div className="relative rounded-2xl bg-navy p-6 text-white overflow-hidden flex flex-col justify-between">
                <div className="absolute -right-10 -top-10 w-40 h-40 blue-glow-strong pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-[18px] font-bold text-white leading-snug mb-2">
                    AI That Works for Your Business
                  </h4>
                  <p className="text-[13px] text-white/75 leading-relaxed mb-5">
                    Deploy 24/7 AI chatbots, voice agents, and custom workflows that cut manual
                    operations by 70%.
                  </p>
                </div>
                <div className="relative z-10">
                  <Link
                    to="/ai-solutions"
                    onClick={onClose}
                    className="group inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer bg-primary text-white hover:bg-primary-700 shadow-soft px-4 py-2 text-[13px] gap-1.5 w-full"
                  >
                    <span>Explore AI</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'industries' && (
            <div>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary pb-2.5 mb-3.5 border-b border-primary-100">
                    B2B & PROFESSIONAL
                  </h3>
                  <ul className="space-y-2.5">
                    {INDUSTRIES_MEGA.b2b.map((ind) => (
                      <li key={ind.slug}>
                        <Link
                          to={ind.to}
                          onClick={onClose}
                          className="flex items-center gap-2.5 text-[14px] font-medium text-navy-90 hover:text-primary transition-colors py-1"
                        >
                          <Building2 className="w-4 h-4 text-primary shrink-0" strokeWidth={1.75} />
                          <span>{ind.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary pb-2.5 mb-3.5 border-b border-primary-100">
                    CONSUMER & RETAIL
                  </h3>
                  <ul className="space-y-2.5">
                    {INDUSTRIES_MEGA.consumer.map((ind) => (
                      <li key={ind.slug}>
                        <Link
                          to={ind.to}
                          onClick={onClose}
                          className="flex items-center gap-2.5 text-[14px] font-medium text-navy-90 hover:text-primary transition-colors py-1"
                        >
                          <Building2 className="w-4 h-4 text-primary shrink-0" strokeWidth={1.75} />
                          <span>{ind.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary pb-2.5 mb-3.5 border-b border-primary-100">
                    SPECIALIZED
                  </h3>
                  <ul className="space-y-2.5">
                    {INDUSTRIES_MEGA.specialized.map((ind) => (
                      <li key={ind.slug}>
                        <Link
                          to={ind.to}
                          onClick={onClose}
                          className="flex items-center gap-2.5 text-[14px] font-medium text-navy-90 hover:text-primary transition-colors py-1"
                        >
                          <Building2 className="w-4 h-4 text-primary shrink-0" strokeWidth={1.75} />
                          <span>{ind.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Strip */}
              <div className="mt-6 pt-5 border-t border-navy-08 flex items-center justify-between bg-primary-50/60 -mx-7 -mb-7 px-7 py-4 rounded-b-[20px]">
                <p className="text-[14px] text-navy-70">
                  Don&apos;t see your industry?{' '}
                  <strong className="font-bold text-navy">We adapt to any category.</strong>
                </p>
                <Link to="/industries" onClick={onClose}>
                  <Button size="sm">View All Industries</Button>
                </Link>
              </div>
            </div>
          )}

          {activeMenu === 'locations' && (
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-7">
                <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary pb-2.5 mb-3.5 border-b border-primary-100">
                  INDIA
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {LOCATIONS_MEGA.india.map((city) =>
                    city === 'Delhi' ? (
                      <Link
                        key={city}
                        to="/locations/delhi"
                        onClick={onClose}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-primary-50 transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                          <MapPin className="w-4 h-4" strokeWidth={1.75} />
                        </span>
                        <span className="text-[14px] font-medium text-navy-90 group-hover:text-primary">
                          {city}
                        </span>
                      </Link>
                    ) : (
                      <a
                        key={city}
                        href="#footer"
                        onClick={onClose}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-primary-50 transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                          <MapPin className="w-4 h-4" strokeWidth={1.75} />
                        </span>
                        <span className="text-[14px] font-medium text-navy-90 group-hover:text-primary">
                          {city}
                        </span>
                      </a>
                    )
                  )}
                </div>
              </div>
              <div className="col-span-5">
                <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary pb-2.5 mb-3.5 border-b border-primary-100">
                  INTERNATIONAL
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {LOCATIONS_MEGA.international.map((country) => (
                    <a
                      key={country}
                      href="#footer"
                      onClick={onClose}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-primary-50 transition-colors group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                        <Globe className="w-4 h-4" strokeWidth={1.75} />
                      </span>
                      <span className="text-[14px] font-medium text-navy-90 group-hover:text-primary">
                        {country}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'about' && (
            <div className="grid grid-cols-5 gap-4">
              {ABOUT_MEGA.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className="p-4 rounded-2xl border border-navy-08 hover:border-primary-100 hover:bg-primary-50/50 transition-all group"
                  >
                    <div className="text-[15px] font-bold text-navy group-hover:text-primary mb-1 flex items-center justify-between">
                      <span>{item.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[12px] text-navy-70 leading-relaxed">{item.desc}</p>
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="p-4 rounded-2xl border border-navy-08 hover:border-primary-100 hover:bg-primary-50/50 transition-all group"
                  >
                    <div className="text-[15px] font-bold text-navy group-hover:text-primary mb-1 flex items-center justify-between">
                      <span>{item.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[12px] text-navy-70 leading-relaxed">{item.desc}</p>
                  </a>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaMenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>('services');
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const triggerQuoteModal = (service?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: service }));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMega(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems: {
    label: string;
    key?: MegaMenuKey;
    href?: string;
    to?: string;
  }[] = [
    { label: 'Services', key: 'services', to: '/services' },
    { label: 'AI Solutions', key: 'ai', to: '/ai-solutions' },
    { label: 'Industries', key: 'industries', to: '/industries' },
    { label: 'Locations', key: 'locations' },
    { label: 'Our Work', to: '/our-work' },
    { label: 'About', key: 'about' },
    { label: 'Blog', to: '/blog' },
  ];

  const isSolid = scrolled || activeMega !== null;
  const isAboutRoute = location.pathname === '/about' || location.pathname === '/contact';
  const isIndustriesRoute = location.pathname.startsWith('/industries');
  const isServicesRoute = location.pathname.startsWith('/services');
  const isAiRoute = location.pathname.startsWith('/ai-solutions');
  const isLocationsRoute = location.pathname.startsWith('/locations');

  return (
    <>
      {/* 1. TOP BAR (thin strip above header, hidden on mobile) */}
      <div className="hidden lg:block bg-primary text-white h-[40px] text-[13px] relative z-50">
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span>🚀 Free Website & SEO Audit — Limited Slots This Month</span>
            <button
              onClick={() => triggerQuoteModal('Free Website & SEO Audit')}
              className="inline-flex items-center gap-1 font-bold underline underline-offset-4 hover:opacity-90 cursor-pointer ml-1"
            >
              <span>Claim Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-4 text-white/90 font-medium">
            <a
              href="mailto:hello@webxcode.com"
              className="hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>hello@webxcode.com</span>
            </a>
            <span className="text-white/35">|</span>
            <a
              href="tel:+18009329263"
              className="hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+1 (800) 932-9263</span>
            </a>
            <span className="text-white/35">|</span>
            <Link to="/about#careers" className="hover:text-white transition-colors">
              Careers
            </Link>
            <span className="text-white/35">|</span>
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>

      {/* 2. STICKY HEADER / NAVBAR */}
      <header
        ref={headerRef}
        onMouseLeave={() => setActiveMega(null)}
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isSolid
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-navy-08 py-3.5'
            : 'bg-navy py-5 border-b border-white/10'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            aria-label="WebXCode Home"
            className="focus-visible:outline-2 focus-visible:outline-primary rounded-lg shrink-0"
          >
            <WebXCodeLogo darkBg={!isSolid} />
          </Link>

          {/* Zone 2: Center Nav Items */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-1.5"
          >
            {navItems.map((item) => {
              const isOpen = item.key && activeMega === item.key;
              const isActiveRoute =
                (item.key === 'about' && isAboutRoute) ||
                (item.key === 'industries' && isIndustriesRoute) ||
                (item.key === 'services' && isServicesRoute) ||
                (item.key === 'ai' && isAiRoute) ||
                (item.key === 'locations' && isLocationsRoute);
              const isHighlighted = Boolean(isOpen || isActiveRoute);

              if (item.key && item.to) {
                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    aria-expanded={Boolean(isOpen)}
                    onMouseEnter={() => setActiveMega(item.key!)}
                    onClick={() => setActiveMega(null)}
                    className={`px-3.5 py-2 rounded-full text-[14px] font-semibold inline-flex items-center gap-1 transition-all duration-150 whitespace-nowrap cursor-pointer ${
                      isSolid
                        ? isHighlighted
                          ? 'bg-primary-50 text-primary'
                          : 'text-navy-90 hover:bg-primary-50 hover:text-primary'
                        : isHighlighted
                        ? 'bg-white/15 text-white'
                        : 'text-white/85 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                      strokeWidth={2}
                    />
                  </NavLink>
                );
              }

              if (item.key) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    aria-expanded={Boolean(isOpen)}
                    onMouseEnter={() => setActiveMega(item.key!)}
                    onClick={() => setActiveMega(isOpen ? null : item.key!)}
                    className={`px-3.5 py-2 rounded-full text-[14px] font-semibold inline-flex items-center gap-1 transition-all duration-150 whitespace-nowrap cursor-pointer ${
                      isSolid
                        ? isHighlighted
                          ? 'bg-primary-50 text-primary'
                          : 'text-navy-90 hover:bg-primary-50 hover:text-primary'
                        : isHighlighted
                        ? 'bg-white/15 text-white'
                        : 'text-white/85 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                );
              }

              if (item.to) {
                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    onMouseEnter={() => setActiveMega(null)}
                    className={({ isActive }) =>
                      `px-3.5 py-2 rounded-full text-[14px] font-semibold transition-all duration-150 whitespace-nowrap ${
                        isSolid
                          ? isActive
                            ? 'bg-primary-50 text-primary'
                            : 'text-navy-90 hover:bg-primary-50 hover:text-primary'
                          : isActive
                          ? 'bg-white/15 text-white'
                          : 'text-white/85 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setActiveMega(null)}
                  className={`px-3.5 py-2 rounded-full text-[14px] font-semibold transition-all duration-150 whitespace-nowrap ${
                    isSolid
                      ? 'text-navy-90 hover:bg-primary-50 hover:text-primary'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Right Primary Action */}
          <div className="hidden lg:flex items-center shrink-0">
            <Button size="sm" onClick={() => triggerQuoteModal()}>
              Get a Free Quote
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
              isSolid
                ? 'text-navy hover:bg-primary-50'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Mega Menu */}
        <div className="hidden lg:block">
          <MegaMenu
            activeMenu={activeMega}
            onClose={() => setActiveMega(null)}
            onOpenQuoteModal={triggerQuoteModal}
          />
        </div>
      </header>

      {/* Mobile Full-Screen Navy Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-navy text-white flex flex-col justify-between overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <WebXCodeLogo darkBg />
              </Link>
              <button
                type="button"
                aria-label="Close mobile menu"
                onClick={() => setMobileOpen(false)}
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-6 space-y-2">
              {/* Services Accordion */}
              <div className="border-b border-white/10 pb-2">
                <button
                  onClick={() =>
                    setMobileAccordion(mobileAccordion === 'services' ? null : 'services')
                  }
                  className={`w-full py-3 flex items-center justify-between text-[17px] font-bold ${
                    isServicesRoute ? 'text-primary' : 'text-white'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform ${
                      mobileAccordion === 'services' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileAccordion === 'services' && (
                  <div className="pb-4 pl-3 space-y-4 text-[14px] text-white/80">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                        Web & Apps
                      </div>
                      <ul className="space-y-2">
                        {SERVICES_MEGA.webAndApps.map((i) => (
                          <li key={i.name}>
                            <Link
                              to={i.to}
                              onClick={() => setMobileOpen(false)}
                              className="block py-0.5 hover:text-white"
                            >
                              {i.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                        SEO & Performance
                      </div>
                      <ul className="space-y-2">
                        {SERVICES_MEGA.seoAndPerformance.map((i) => (
                          <li key={i.name}>
                            <Link
                              to={i.to}
                              onClick={() => setMobileOpen(false)}
                              className="block py-0.5 hover:text-white"
                            >
                              {i.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                        Brand & Content
                      </div>
                      <ul className="space-y-2">
                        {SERVICES_MEGA.brandAndContent.map((i) => (
                          <li key={i.name}>
                            <Link
                              to={i.to}
                              onClick={() => setMobileOpen(false)}
                              className="block py-0.5 hover:text-white"
                            >
                              {i.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <Link
                        to="/services"
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary hover:underline"
                      >
                        <span>View All Services</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Solutions Accordion */}
              <div className="border-b border-white/10 pb-2">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'ai' ? null : 'ai')}
                  className={`w-full py-3 flex items-center justify-between text-[17px] font-bold ${
                    isAiRoute ? 'text-primary' : 'text-white'
                  }`}
                >
                  <span>AI Solutions</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform ${
                      mobileAccordion === 'ai' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileAccordion === 'ai' && (
                  <div className="pb-4 pl-3 space-y-2 text-[14px] text-white/80">
                    {[...AI_MEGA.aiBuild, ...AI_MEGA.aiMarketing, ...AI_MEGA.aiAutomation].map(
                      (i) => (
                        <Link
                          key={i.name}
                          to={i.to}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 hover:text-white"
                        >
                          {i.name}
                        </Link>
                      )
                    )}
                    <div className="pt-2 border-t border-white/10">
                      <Link
                        to="/ai-solutions"
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary hover:underline"
                      >
                        <span>View All AI Solutions</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Industries Accordion */}
              <div className="border-b border-white/10 pb-2">
                <button
                  onClick={() =>
                    setMobileAccordion(mobileAccordion === 'industries' ? null : 'industries')
                  }
                  className={`w-full py-3 flex items-center justify-between text-[17px] font-bold ${
                    isIndustriesRoute ? 'text-primary' : 'text-white'
                  }`}
                >
                  <span>Industries</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform ${
                      mobileAccordion === 'industries' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileAccordion === 'industries' && (
                  <div className="pb-4 pl-3 space-y-3 text-[14px] text-white/80">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        ...INDUSTRIES_MEGA.b2b,
                        ...INDUSTRIES_MEGA.consumer,
                        ...INDUSTRIES_MEGA.specialized,
                      ].map((ind) => (
                        <Link
                          key={ind.slug}
                          to={ind.to}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 hover:text-white"
                        >
                          {ind.name}
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <Link
                        to="/industries"
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary hover:underline"
                      >
                        <span>View All Industries</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Locations Accordion */}
              <div className="border-b border-white/10 pb-2">
                <button
                  onClick={() =>
                    setMobileAccordion(mobileAccordion === 'locations' ? null : 'locations')
                  }
                  className="w-full py-3 flex items-center justify-between text-[17px] font-bold text-white"
                >
                  <span>Locations</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform ${
                      mobileAccordion === 'locations' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileAccordion === 'locations' && (
                  <div className="pb-4 pl-3 grid grid-cols-2 gap-2 text-[14px] text-white/80">
                    {[...LOCATIONS_MEGA.india, ...LOCATIONS_MEGA.international].map((loc) =>
                      loc === 'Delhi' ? (
                        <Link
                          key={loc}
                          to="/locations/delhi"
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 hover:text-white font-semibold text-primary"
                        >
                          {loc}
                        </Link>
                      ) : (
                        <a
                          key={loc}
                          href="#footer"
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 hover:text-white"
                        >
                          {loc}
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* About Accordion */}
              <div className="border-b border-white/10 pb-2">
                <button
                  onClick={() =>
                    setMobileAccordion(mobileAccordion === 'about' ? null : 'about')
                  }
                  className={`w-full py-3 flex items-center justify-between text-[17px] font-bold ${
                    isAboutRoute ? 'text-primary' : 'text-white'
                  }`}
                >
                  <span>About</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform ${
                      mobileAccordion === 'about' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileAccordion === 'about' && (
                  <div className="pb-4 pl-3 space-y-2 text-[14px] text-white/80">
                    {ABOUT_MEGA.map((item) =>
                      item.isRoute ? (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 hover:text-white"
                        >
                          {item.name}
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>

              <NavLink
                to="/our-work"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-3 border-b border-white/10 text-[17px] font-bold ${
                    isActive ? 'text-primary' : 'text-white'
                  }`
                }
              >
                Our Work
              </NavLink>
              <NavLink
                to="/blog"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-3 border-b border-white/10 text-[17px] font-bold ${
                    isActive ? 'text-primary' : 'text-white'
                  }`
                }
              >
                Blog
              </NavLink>
            </div>
          </div>

          {/* Pinned CTA at bottom of mobile drawer */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-navy sticky bottom-0">
            <Button
              size="lg"
              className="w-full justify-center"
              onClick={() => {
                setMobileOpen(false);
                triggerQuoteModal();
              }}
            >
              Get a Free Quote
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
