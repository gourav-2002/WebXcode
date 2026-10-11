import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ArrowRight,
  CheckCircle2,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
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

/* 16. FOOTER (navy — newsletter strip + 5 columns + bottom bar + back-to-top button) */
export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="footer" className="bg-navy text-white/70 pt-16 pb-10 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Top Row: Newsletter Strip */}
        <div className="pb-12 mb-12 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-[22px] sm:text-[24px] font-extrabold text-white">
              Get digital growth tips in your inbox
            </h3>
            <p className="text-[14px] text-white/65 mt-1">
              Actionable insights on Next.js web engineering, AEO/GEO search, and AI automation.
            </p>
          </div>

          {subscribed ? (
            <div className="px-5 py-3 rounded-full bg-primary/20 border border-primary text-white text-[14px] font-semibold inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Subscribed! Check your inbox for our latest growth playbook.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email..."
                aria-label="Email address for newsletter"
                className="sm:w-80 px-5 py-3 rounded-full bg-white/[0.06] border border-white/15 text-white placeholder:text-white/45 text-[14px] focus:outline-none focus:border-primary"
              />
              <Button type="submit" size="md">
                Subscribe
              </Button>
            </form>
          )}
        </div>

        {/* 5 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" aria-label="WebXCode Home" className="inline-block">
              <WebXCodeLogo darkBg />
            </Link>
            <div className="text-[13px] font-bold uppercase tracking-[0.18em] text-primary">
              Ideas | Code | Growth
            </div>
            <p className="text-[14px] text-white/70 leading-relaxed pr-4">
              Full-service web development, SEO, and AI solutions agency partnering with modern
              businesses across India, the US, and 20+ countries.
            </p>
            <div className="space-y-2 text-[14px] pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                <span>Sector 62, Noida (Delhi NCR), India & Austin, TX, USA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+18009329263" className="hover:text-primary transition-colors">
                  +1 (800) 932-9263 / +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:hello@webxcode.com" className="hover:text-primary transition-colors">
                  hello@webxcode.com
                </a>
              </div>
            </div>

            {/* Social Icons in Outlined Circles */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { label: 'LinkedIn', icon: Linkedin, href: '#footer' },
                { label: 'Instagram', icon: Instagram, href: '#footer' },
                { label: 'YouTube', icon: Youtube, href: '#footer' },
                { label: 'X (Twitter)', icon: Twitter, href: '#footer' },
              ].map((soc) => {
                const IconComp = soc.icon;
                return (
                  <a
                    key={soc.label}
                    href={soc.href}
                    aria-label={soc.label}
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:border-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <IconComp className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-bold text-white mb-4">
              <Link to="/services" className="hover:text-primary transition-colors">
                Services
              </Link>
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              {[
                { name: 'Website Development', to: '/services/website-development' },
                { name: 'Web App Development', to: '/services#web-application-development' },
                { name: 'E-commerce Development', to: '/services/ecommerce-development' },
                { name: 'Mobile App Development', to: '/services/mobile-app-development' },
                { name: 'WordPress & Shopify Development', to: '/services/wordpress-shopify-development' },
                { name: 'Website Maintenance & Support', to: '/services/website-maintenance-support' },
                { name: 'Managed IT Services', to: '/services/managed-it-services' },
                { name: 'SEO Services', to: '/services/seo-services' },
                { name: 'Local SEO', to: '/services/local-seo' },
                { name: 'AEO Services', to: '/services/aeo-services' },
                { name: 'GEO (Generative Engine Optimization)', to: '/services/geo-generative-engine-optimization' },
                { name: 'Performance Marketing', to: '/services/performance-marketing' },
                { name: 'Google Ads', to: '/services/google-ads-sem' },
                { name: 'Conversion Rate Optimization', to: '/services/conversion-rate-optimization' },
                { name: 'Analytics & Tracking Setup', to: '/services/analytics-tracking-setup' },
                { name: 'Branding & Logo Design', to: '/services/branding-logo-design' },
                { name: 'Creative & Communication', to: '/services/creative-communication' },
                { name: 'Copywriting', to: '/services/copywriting' },
                { name: 'Email Marketing', to: '/services/email-marketing' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.to} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-[13px] font-bold text-primary hover:underline"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: AI Solutions (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-bold text-white mb-4">
              <Link to="/ai-solutions" className="hover:text-primary transition-colors">
                AI Solutions
              </Link>
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              {[
                { name: 'AI Chatbot Development', to: '/ai-solutions/ai-chatbot-development' },
                { name: 'WhatsApp AI Chatbot', to: '/ai-solutions/whatsapp-ai-chatbot' },
                { name: 'AI Voice Agents', to: '/ai-solutions/ai-voice-agents' },
                { name: 'Custom AI / LLM Integration', to: '/ai-solutions/custom-ai-llm-integration' },
                { name: 'AI Generated Videos', to: '/ai-solutions/ai-generated-videos' },
                { name: 'AI Content Creation', to: '/ai-solutions/ai-content-creation' },
                { name: 'AI-Powered SEO', to: '/ai-solutions/ai-powered-seo' },
                { name: 'AI Ad Creatives', to: '/ai-solutions/ai-ad-creatives' },
                { name: 'AI Workflow Automation', to: '/ai-solutions/ai-workflow-automation' },
                { name: 'AI Agents for Business', to: '/ai-solutions/ai-agents-for-business' },
                { name: 'CRM & Lead Automation', to: '/ai-solutions/crm-lead-automation' },
                { name: 'AI Analytics & Reporting', to: '/ai-solutions/ai-analytics-reporting' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.to} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/ai-solutions"
                  className="inline-flex items-center gap-1 text-[13px] font-bold text-primary hover:underline"
                >
                  <span>View All AI Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-[14px]">
              {[
                { name: 'About Us', href: '/about', isRoute: true },
                { name: 'Our Work', href: '/our-work', isRoute: true },
                { name: 'Industries', href: '/industries', isRoute: true },
                { name: 'Case Studies', href: '/our-work#case-studies', isRoute: true },
                { name: 'Careers', href: '/about#careers', isRoute: true },
                { name: 'Blog', href: '/blog', isRoute: true },
                { name: 'Contact Us', href: '/contact', isRoute: true },
              ].map((item) => (
                <li key={item.name}>
                  {item.isRoute ? (
                    <Link to={item.href} className="hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  ) : (
                    <a href={item.href} className="hover:text-primary transition-colors">
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Locations (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-bold text-white mb-4">Locations</h4>
            <ul className="space-y-2.5 text-[14px]">
              {['Delhi', 'Noida', 'Gurgaon', 'Mumbai', 'Bangalore', 'USA', 'UK', 'UAE'].map(
                (loc) => (
                  <li key={loc}>
                    {loc === 'Delhi' ? (
                      <Link to="/locations/delhi" className="hover:text-primary transition-colors">
                        {loc}
                      </Link>
                    ) : (
                      <a href="#cta" className="hover:text-primary transition-colors">
                        {loc}
                      </a>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-white/60">
          <div>© 2026 WebXCode. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/refund-policy" className="hover:text-primary transition-colors">
              Refund Policy
            </Link>
            <a href="#footer" className="hover:text-primary transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* Back-to-Top Button */}
      {showBackToTop && (
        <div className="fixed bottom-20 right-5 z-40">
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full bg-navy border border-white/20 text-white shadow-lg hover:bg-primary hover:border-primary transition-all flex items-center justify-center cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
