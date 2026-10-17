'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  ShieldCheck,
  Activity,
  Clock,
  Lock,
  Database,
  Zap,
  FileEdit,
  Wrench,
  Eye,
  FileSpreadsheet,
  Server,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Globe,
  Cpu,
  HardDrive,
} from 'lucide-react';
import { services } from '@/app/services/_components/Services';

interface WebsiteMaintenanceSupportProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

/* ============================================================================
   SECTION 1 DATA — MISSION CONTROL HERO: 6 LIVE MONITORS + INCIDENT TICKER
============================================================================ */
interface MissionMonitorItem {
  id: string;
  label: string;
  statusTag: string;
  metricValue: string;
  subDetail: string;
  lastChecked: string;
}

const MISSION_MONITORS: MissionMonitorItem[] = [
  {
    id: 'mon-uptime',
    label: 'Uptime',
    statusTag: 'ONLINE • 60s PING',
    metricValue: '99.98%',
    subDetail: 'Multi-region HTTP/SSL heartbeat checks from Mumbai, Frankfurt & Virginia',
    lastChecked: 'Checked 12s ago',
  },
  {
    id: 'mon-ssl',
    label: 'SSL & Security',
    statusTag: 'WAF + TLS 1.3 ACTIVE',
    metricValue: '0 Threats',
    subDetail: 'Daily malware scan, firewall rules, brute-force lock & auto-renewing SSL',
    lastChecked: 'Scanned 18m ago',
  },
  {
    id: 'mon-backups',
    label: 'Backups',
    statusTag: 'OFF-SITE S3 SNAPSHOT',
    metricValue: 'Daily 03:00 IST',
    subDetail: '30-day rolling encrypted database + files snapshot with 1-click restore',
    lastChecked: 'Verified today',
  },
  {
    id: 'mon-updates',
    label: 'Core & Plugin Updates',
    statusTag: 'STAGING TESTED',
    metricValue: '100% Current',
    subDetail: 'WordPress core, plugins, Shopify apps & npm dependencies tested on staging first',
    lastChecked: 'Batch #42 clean',
  },
  {
    id: 'mon-speed',
    label: 'Page Speed (CWV)',
    statusTag: 'CORE WEB VITALS PASS',
    metricValue: '1.2s LCP',
    subDetail: 'Image WebP compression, CDN cache purge, script deferral & database cleanup',
    lastChecked: '94 Mobile Score',
  },
  {
    id: 'mon-errors',
    label: 'Broken Links & Errors',
    statusTag: '404 & FORM WATCH',
    metricValue: '0 Broken',
    subDetail: 'Automated crawl for 404 links, checkout/contact form delivery & JS console errors',
    lastChecked: 'All forms tested',
  },
];

// 90-day uptime bar strip generator (deterministic clean bars)
const NINETY_DAY_BARS = Array.from({ length: 60 }, (_, idx) => ({
  day: 60 - idx,
  status: idx === 41 ? 'maintenance-window' : 'operational',
  uptime: idx === 41 ? '99.95% (Scheduled 2m patch)' : '100% Uptime',
}));

/* ============================================================================
   SECTION 2 DATA — "WITHOUT MAINTENANCE" VS "WITH WEBXCODE CARE": TIMELINE
============================================================================ */
interface MonthTimelinePoint {
  month: string;
  monthNumber: number;
  unmaintainedTitle: string;
  unmaintainedEvent: string;
  unmaintainedImpact: string;
  unmaintainedHealth: number;
  withCareTitle: string;
  withCareEvent: string;
  withCareOutcome: string;
  withCareHealth: number;
}

const SIX_MONTH_TIMELINE: MonthTimelinePoint[] = [
  {
    month: 'Month 1',
    monthNumber: 1,
    unmaintainedTitle: 'Plugin & Dependency Updates Pile Up',
    unmaintainedEvent:
      '7 plugins and CMS core show update banners. Nobody clicks update for fear of breaking the live layout.',
    unmaintainedImpact: 'Known CVE patch missed • Staging non-existent',
    unmaintainedHealth: 84,
    withCareTitle: 'Staging Audit & Baseline Hardening',
    withCareEvent:
      'We clone your site to staging, update all plugins safely, lock down admin routes, and configure daily off-site backups.',
    withCareOutcome: '100% patched on staging • Daily S3 backup live',
    withCareHealth: 100,
  },
  {
    month: 'Month 2',
    monthNumber: 2,
    unmaintainedTitle: 'Uncompressed Uploads Slow Mobile LCP',
    unmaintainedEvent:
      'Marketing team uploads 4MB banner PNGs and installs two tracking scripts. Mobile load time creeps past 4.3 seconds.',
    unmaintainedImpact: 'Core Web Vitals fail • Bounce rate rises',
    unmaintainedHealth: 68,
    withCareTitle: 'Automated Image & CWV Tune-Up',
    withCareEvent:
      'New uploads are converted to WebP/AVIF, unused CSS/JS is trimmed, and database post-revisions are cleaned.',
    withCareOutcome: 'Mobile LCP kept under 1.5s • 90+ PageSpeed',
    withCareHealth: 100,
  },
  {
    month: 'Month 3',
    monthNumber: 3,
    unmaintainedTitle: 'Silent Contact Form or Checkout Failure',
    unmaintainedEvent:
      'An SMTP or API token expires. Visitors submit the quote form for 11 days, but emails silently fail to arrive.',
    unmaintainedImpact: 'Lost paid-ad leads • Zero alert triggered',
    unmaintainedHealth: 52,
    withCareTitle: 'Weekly Form, Checkout & Link Verification',
    withCareEvent:
      'Synthetic form & checkout tests verify email/webhook delivery every week; broken links are redirected before users hit 404s.',
    withCareOutcome: 'Zero lost leads • Verified SMTP + CRM delivery',
    withCareHealth: 100,
  },
  {
    month: 'Month 4',
    monthNumber: 4,
    unmaintainedTitle: 'SSL Auto-Renewal Fails or Mixed Content Appears',
    unmaintainedEvent:
      'DNS or server cert renewal hiccups trigger a browser "Your connection is not private" warning for morning visitors.',
    unmaintainedImpact: 'Instant trust loss • Google Ads paused',
    unmaintainedHealth: 36,
    withCareTitle: 'Proactive SSL & DNS Expiry Watch',
    withCareEvent:
      'SSL certificates are renewed 30 days prior to expiry with strict HSTS headers and zero mixed-content warnings.',
    withCareOutcome: 'A+ SSL Labs grade • Uninterrupted ad traffic',
    withCareHealth: 100,
  },
  {
    month: 'Month 5',
    monthNumber: 5,
    unmaintainedTitle: 'Outdated Plugin Exploited by Automated Bot',
    unmaintainedEvent:
      'Bots scan for the 4-month-old plugin vulnerability, injecting spam redirects or defacing product pages.',
    unmaintainedImpact: 'Google blacklist risk • Emergency scramble',
    unmaintainedHealth: 18,
    withCareTitle: '24/7 WAF Firewall & Zero-Day Patching',
    withCareEvent:
      'Cloud WAF blocks malicious bot payloads at the edge; critical security advisories are patched within hours.',
    withCareOutcome: '0 malware infections • 24/7 intrusion shield',
    withCareHealth: 100,
  },
  {
    month: 'Month 6',
    monthNumber: 6,
    unmaintainedTitle: 'Checkout Crash With No Clean Backup to Restore',
    unmaintainedEvent:
      'A rushed live edit breaks checkout on Friday night. Hosting backup is 3 weeks old or corrupted. Expensive emergency rebuild.',
    unmaintainedImpact: 'Days of downtime • High emergency dev bill',
    unmaintainedHealth: 8,
    withCareTitle: '1-Click Clean Rollback & Monthly Health Report',
    withCareEvent:
      'Even if a third-party API glitches, we roll back in minutes from verified daily snapshots and send your executive summary.',
    withCareOutcome: '99.98% 6-month uptime • Predictable flat fee',
    withCareHealth: 100,
  },
];

/* ============================================================================
   SECTION 3 DATA — WHAT WE DO EVERY MONTH: PIT-STOP CREW BOARD (9 STATIONS)
============================================================================ */
type CadenceFilter = 'All' | 'Daily' | 'Weekly' | 'Monthly' | 'On-Demand';

interface PitStopStation {
  id: string;
  number: string;
  title: string;
  cadence: 'Daily' | 'Weekly' | 'Monthly' | 'On-Demand';
  summary: string;
  checklist: [string, string, string];
  stationCode: string;
}

const PIT_STOP_STATIONS: PitStopStation[] = [
  {
    id: 'station-01',
    number: '01',
    title: '24/7 Uptime & Incident Monitoring',
    cadence: 'Daily',
    summary:
      'Continuous 60-second heartbeat checks across homepage, key landing pages, and checkout endpoints.',
    checklist: [
      '1-minute interval HTTP, keyword & port checks from 3 global nodes',
      'Instant Slack, WhatsApp & Pager alert to our on-call engineer',
      'Root-cause triage started before your team even notices a blip',
    ],
    stationCode: 'CREW-MON-01',
  },
  {
    id: 'station-02',
    number: '02',
    title: 'Security Scans, Firewall & Malware Protection',
    cadence: 'Daily',
    summary:
      'Proactive edge WAF rules, file-integrity monitoring, and automated malware/backdoor sweeps.',
    checklist: [
      'Daily file-hash comparison to detect unauthorized core or theme edits',
      'Brute-force login protection, XML-RPC block & 2FA enforcement',
      'Immediate malware cleanup & blacklist removal if ever targeted',
    ],
    stationCode: 'CREW-SEC-02',
  },
  {
    id: 'station-03',
    number: '03',
    title: 'Automated Off-Site Backups & Tested Restores',
    cadence: 'Daily',
    summary:
      'Independent encrypted cloud backups stored off-server—plus scheduled test restores to prove they work.',
    checklist: [
      'Daily full database + media snapshots to isolated AWS S3 storage',
      'Pre-update snapshot taken automatically before every code/plugin change',
      'Monthly test-restore verification on staging so backups are never corrupt',
    ],
    stationCode: 'CREW-BKP-03',
  },
  {
    id: 'station-04',
    number: '04',
    title: 'Core, Plugin, Theme & Dependency Updates',
    cadence: 'Weekly',
    summary:
      'Safe, staging-first updates for WordPress, WooCommerce, Shopify apps, or Node/React packages.',
    checklist: [
      'All updates applied on an isolated staging clone first—never raw on live',
      'Visual regression check on key templates after every update batch',
      'Instant rollback protocol if a plugin introduces a conflict',
    ],
    stationCode: 'CREW-UPD-04',
  },
  {
    id: 'station-05',
    number: '05',
    title: 'Speed & Core Web Vitals Tuning',
    cadence: 'Monthly',
    summary:
      'Keep your site fast as new content, banners, and marketing scripts get added over time.',
    checklist: [
      'LCP, INP & CLS audit on mobile and desktop with Lighthouse verification',
      'Database overhead cleanup (transients, expired sessions, post revisions)',
      'Bulk image optimization (WebP/AVIF) & third-party script deferral',
    ],
    stationCode: 'CREW-CWV-05',
  },
  {
    id: 'station-06',
    number: '06',
    title: 'Content Edits, Banner Swaps & Small Updates',
    cadence: 'On-Demand',
    summary:
      'Send us your text changes, new team photos, promotional banners, or blog posts—we publish them cleanly.',
    checklist: [
      'Dedicated monthly support hours included for content & layout tweaks',
      'New landing page sections, promo bars, or seasonal hero updates',
      'Formatted with proper heading hierarchy, alt tags, and responsive checks',
    ],
    stationCode: 'CREW-EDT-06',
  },
  {
    id: 'station-07',
    number: '07',
    title: 'Bug Fixes & Browser/Mobile Compatibility',
    cadence: 'On-Demand',
    summary:
      'Rapid engineering fixes when iOS Safari, Chrome updates, or third-party APIs cause layout or script glitches.',
    checklist: [
      'CSS/JS layout repairs across iOS Safari, Android Chrome & desktop browsers',
      'Payment gateway, CRM webhook, and shipping API troubleshooting',
      'Clean Git commit history so every fix is documented and reversible',
    ],
    stationCode: 'CREW-FIX-07',
  },
  {
    id: 'station-08',
    number: '08',
    title: 'SSL, Domain, DNS & Broken-Link Checks',
    cadence: 'Weekly',
    summary:
      'Prevent embarrassing expired certificates, DNS misconfigurations, and dead 404 links.',
    checklist: [
      'Weekly sitewide crawler for broken internal/external links & 301 redirects',
      'End-to-end contact form, lead webhook & checkout test submissions',
      'SSL certificate, domain renewal & DNS record integrity monitoring',
    ],
    stationCode: 'CREW-DNS-08',
  },
  {
    id: 'station-09',
    number: '09',
    title: 'Monthly Health Report & Recommendations',
    cadence: 'Monthly',
    summary:
      'A clear, jargon-free monthly PDF & dashboard summary showing everything we did and what to improve next.',
    checklist: [
      'Uptime percentage, backup log, and full list of plugins/packages updated',
      'Before/after Core Web Vitals scores & security scan summary',
      'Hours used vs remaining + 3 actionable UX/SEO improvement suggestions',
    ],
    stationCode: 'CREW-RPT-09',
  },
];

/* ============================================================================
   SECTION 4 DATA — PLATFORMS WE MAINTAIN: SERVICE BAY SWITCHER (4 TABS)
============================================================================ */
interface PlatformServiceBay {
  id: 'wordpress' | 'shopify' | 'custom-stack' | 'legacy-rescue';
  tabLabel: string;
  bayCode: string;
  headline: string;
  subtitle: string;
  commonIssues: {
    title: string;
    detail: string;
  }[];
  maintenanceTasks: string[];
  typicalHoursPerMonth: string;
  supportedTechChips: string[];
}

const PLATFORM_SERVICE_BAYS: PlatformServiceBay[] = [
  {
    id: 'wordpress',
    tabLabel: 'WordPress & WooCommerce',
    bayCode: 'BAY 01 • WP / WOO',
    headline: 'WordPress & WooCommerce Care Without Plugin Anxiety',
    subtitle:
      'We maintain custom Gutenberg/ACF builds, Elementor/Divi sites, and high-volume WooCommerce stores—keeping PHP, core, and plugins updated without breaking checkout or custom templates.',
    commonIssues: [
      {
        title: 'Plugin update conflicts & white-screen errors',
        detail:
          'WooCommerce or page-builder updates clash with older add-ons and break cart or layout templates.',
      },
      {
        title: 'Bloated `wp_options` & slow autoload queries',
        detail:
          'Leftover rows from uninstalled plugins and ribuan order transients slow down admin and TTFB.',
      },
      {
        title: 'XML-RPC & `wp-login` brute-force floods',
        detail:
          'Automated botnets hammer login endpoints, spiking CPU usage and risking compromised admin accounts.',
      },
      {
        title: 'PHP 8.x deprecation warnings after host upgrades',
        detail:
          'Hosting providers force PHP upgrades that break older custom theme functions or payment gateways.',
      },
    ],
    maintenanceTasks: [
      'Weekly staging-tested WordPress core, theme & plugin updates',
      'WooCommerce checkout, Razorpay/Stripe webhook & order email verification',
      'Database table optimization, transient purge & Redis object-cache tuning',
      'Hardened `wp-config`, WAF rules, XML-RPC disable & daily malware scanning',
      'PHP version compatibility patching & custom child-theme code maintenance',
      'Daily off-site full files + MySQL backups with 1-click staging restore',
    ],
    typicalHoursPerMonth: '4 – 10 hrs / month (depending on store traffic & edit volume)',
    supportedTechChips: [
      'WordPress 6.x',
      'WooCommerce',
      'ACF Pro & Gutenberg',
      'Elementor / Bricks',
      'WP Rocket & Redis',
      'PHP 8.2 / 8.3',
    ],
  },
  {
    id: 'shopify',
    tabLabel: 'Shopify & Shopify Plus',
    bayCode: 'BAY 02 • SHOPIFY 2.0 / PLUS',
    headline: 'Keep Your Shopify Store Fast, Clean & Conversion-Ready',
    subtitle:
      'While Shopify hosts the servers, your theme code, third-party apps, tracking pixels, and product catalog still need engineering care so your store never slows down before a big sale.',
    commonIssues: [
      {
        title: 'Leftover app scripts slowing mobile speed',
        detail:
          'Uninstalling a Shopify app rarely removes its Liquid snippets, leaving dead JS blocking render.',
      },
      {
        title: 'Broken slide-out cart or variant selectors',
        detail:
          'Bundle apps, discount scripts, or theme edits cause price mismatch or "Add to Cart" button freezes.',
      },
      {
        title: 'GA4, Meta Pixel & CAPI tracking drift',
        detail:
          'Checkout extensibility updates break purchase event attribution and ROAS reporting.',
      },
      {
        title: 'Catalog, metafield & collection sync errors',
        detail:
          'ERP/inventory sync hiccups or broken filters hide in-stock products from collection pages.',
      },
    ],
    maintenanceTasks: [
      'Monthly theme code audit & removal of leftover third-party app scripts',
      'Online Store 2.0 custom Liquid section & JSON template additions',
      'Slide-out drawer cart, upsell logic & Checkout UI Extension maintenance',
      'Campaign landing pages, seasonal promo banners & bundle setup',
      'GA4, Meta CAPI, Google Merchant Center feed & schema error fixes',
      'Automated daily theme + product/customer catalog CSV/API backups',
    ],
    typicalHoursPerMonth: '5 – 12 hrs / month (including campaign banners & CRO tweaks)',
    supportedTechChips: [
      'Shopify Online Store 2.0',
      'Shopify Plus',
      'Liquid & JSON Schemas',
      'Checkout UI Extensions',
      'Shopify Markets',
      'Klaviyo / ERP Webhooks',
    ],
  },
  {
    id: 'custom-stack',
    tabLabel: 'Custom (React / Next.js / Node / Laravel)',
    bayCode: 'BAY 03 • FULL-STACK & HEADLESS',
    headline: 'DevOps, Dependency & SLA Care for Custom Web Apps',
    subtitle:
      'For custom marketing sites, SaaS portals, and headless storefronts built on Next.js, React, Node.js, or Laravel—we manage npm/Composer patches, CI/CD pipelines, cloud servers, and API integrations.',
    commonIssues: [
      {
        title: 'npm / Composer security advisories & build failures',
        detail:
          'Outdated packages trigger GitHub Dependabot alerts or break Vercel/Docker production builds.',
      },
      {
        title: 'Third-party API & webhook version deprecations',
        detail:
          'Stripe, Razorpay, HubSpot, or CRM APIs deprecate endpoints and silently break background jobs.',
      },
      {
        title: 'Server memory leaks, SSL or Docker container restarts',
        detail:
          'Unmonitored Node/PM2 processes or full disk logs cause sudden 502 Bad Gateway outages.',
      },
      {
        title: 'Hydration errors & Core Web Vitals regressions',
        detail:
          'New CMS content or client-side bundles bloat JS payloads and hurt Next.js SEO performance.',
      },
    ],
    maintenanceTasks: [
      'Scheduled npm, Node.js, React/Next.js & Laravel/Composer security patching',
      'CI/CD pipeline maintenance (GitHub Actions, Vercel, AWS, DigitalOcean)',
      'PostgreSQL / MySQL / MongoDB automated snapshots & query index tuning',
      'Server CPU, RAM, disk-space & PM2/Docker container health monitoring',
      'Sentry error-log triage, API webhook updates & feature enhancements',
      'SSR/ISR cache tuning, Cloudflare WAF management & uptime SLA coverage',
    ],
    typicalHoursPerMonth: '6 – 16 hrs / month (engineering + DevOps coverage)',
    supportedTechChips: [
      'Next.js & React',
      'Node.js & Express',
      'Laravel & PHP',
      'PostgreSQL / MongoDB',
      'AWS / Vercel / Docker',
      'Sanity / Strapi Headless',
    ],
  },
  {
    id: 'legacy-rescue',
    tabLabel: 'Sites Built by Another Agency',
    bayCode: 'BAY 04 • CODEBASE TAKEOVER & RESCUE',
    headline: 'Seamless Takeover for Websites Built by Someone Else',
    subtitle:
      'Previous freelancer disappeared or agency takes 2 weeks to reply? We audit your existing website, document the setup, clean up security/speed debt, and take over ongoing care—no rebuild required.',
    commonIssues: [
      {
        title: 'Missing documentation & scattered credentials',
        detail:
          'Domain, DNS, hosting, and CMS logins are split across old emails with zero handover notes.',
      },
      {
        title: 'Hardcoded edits directly on the live server',
        detail:
          'Previous developers edited live theme files without Git or child themes, making updates risky.',
      },
      {
        title: 'Hidden malware, backdoor admin users or pirated plugins',
        detail:
          '"Nulled" plugins or forgotten admin accounts leave the site vulnerable and un-updatable.',
      },
      {
        title: 'Zero staging environment or working backup',
        detail:
          'No safe place to test fixes before pushing them to paying customers.',
      },
    ],
    maintenanceTasks: [
      '48-hour Takeover Audit: full codebase, plugin, security & credential inventory',
      'Lock down access: revoke old developer keys, rotate passwords & enforce 2FA',
      'Put the codebase into Git version control and spin up a dedicated staging site',
      'Replace pirated/abandoned plugins with clean, licensed equivalents',
      'Fix immediate high-priority bugs, broken forms & mobile layout issues',
      'Transition smoothly into a predictable monthly WebXCode Care Plan',
    ],
    typicalHoursPerMonth: 'Starts with 48h Onboarding Audit → then 4 – 12 hrs / month',
    supportedTechChips: [
      '48h Codebase Audit',
      'Git & Staging Setup',
      'Credential Recovery',
      'Malware & Bloat Cleanup',
      'No Forced Rebuild',
      'Dedicated Account Lead',
    ],
  },
];

/* ============================================================================
   MAIN PAGE COMPONENT
============================================================================ */
const WebsiteMaintenanceSupport: React.FC<WebsiteMaintenanceSupportProps> = ({
  onOpenQuoteModal,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Single source of truth from Services.tsx
  const maintenanceService = useMemo(
    () => services.find((s) => s.slug === 'website-maintenance-support'),
    []
  );

  // Helper to open Quote Modal with fallback custom event
  const triggerQuoteModal = (serviceContext?: string) => {
    const label =
      serviceContext || maintenanceService?.name || 'Website Maintenance & Support';
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  // SEO Meta Title & Description
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Website Maintenance & Support Services — 24/7 Care, Updates, Backups & Security | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        maintenanceService?.description ||
          'Keep your website fast, secure, and updated 24/7. WebXCode handles daily cloud backups, staging-tested plugin updates, security monitoring, Core Web Vitals speed tuning, and priority support for WordPress, Shopify, and custom web apps.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, [maintenanceService]);

  /* --------------------------------------------------------------------------
     SECTION 1 STATE — Active Monitor Tile in Mission Control
  -------------------------------------------------------------------------- */
  const [selectedMonitorId, setSelectedMonitorId] = useState<string>('mon-uptime');
  const activeMonitor = useMemo(
    () =>
      MISSION_MONITORS.find((m) => m.id === selectedMonitorId) || MISSION_MONITORS[0],
    [selectedMonitorId]
  );

  /* --------------------------------------------------------------------------
     SECTION 2 STATE — Selected Month on 6-Month Split Timeline
  -------------------------------------------------------------------------- */
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(5); // Default Month 6 to show full contrast
  const activeMonthData = SIX_MONTH_TIMELINE[selectedMonthIndex];

  /* --------------------------------------------------------------------------
     SECTION 3 STATE — Pit-Stop Crew Cadence Filter
  -------------------------------------------------------------------------- */
  const [activeCadenceFilter, setActiveCadenceFilter] = useState<CadenceFilter>('All');
  const filteredStations = useMemo(() => {
    if (activeCadenceFilter === 'All') return PIT_STOP_STATIONS;
    return PIT_STOP_STATIONS.filter((st) => st.cadence === activeCadenceFilter);
  }, [activeCadenceFilter]);

  /* --------------------------------------------------------------------------
     SECTION 4 STATE — Platform Service Bay Switcher (4 Tabs)
  -------------------------------------------------------------------------- */
  const [activeBayId, setActiveBayId] =
    useState<PlatformServiceBay['id']>('wordpress');
  const activeBay = useMemo(
    () =>
      PLATFORM_SERVICE_BAYS.find((b) => b.id === activeBayId) ||
      PLATFORM_SERVICE_BAYS[0],
    [activeBayId]
  );

  return (
    <main className="flex-1 bg-white text-navy">
      {/* ======================================================================
         SECTION 1 — HERO: LIVE SITE HEALTH & UPTIME MISSION CONTROL (navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Subtle Radial Blue Glow & Technical Grid */}
        <div className="absolute -top-24 right-1/4 w-[620px] h-[620px] blue-glow-strong pointer-events-none opacity-75" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb: Home / Services / Website Maintenance & Support */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/65 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </li>
              <li className="text-primary-100 font-semibold" aria-current="page">
                {maintenanceService?.name || 'Website Maintenance & Support'}
              </li>
            </ol>
          </nav>

          {/* 50% / 50% Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 6 Cols: Copy + CTAs + Trust Row */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/45 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>WEBSITE MAINTENANCE &amp; SUPPORT</span>
              </div>

              <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] font-extrabold text-white leading-[1.08] tracking-tight">
                We Keep Your Website{' '}
                <span className="text-primary">
                  Fast, Secure &amp; Online — 24/7.
                </span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65]">
                {maintenanceService?.description ||
                  'Stop worrying about broken plugins, surprise downtime, slow mobile speeds, or missed backups. Our engineering team looks after your WordPress, Shopify, or custom website every single day—so you can focus on running your business.'}
              </p>

              {/* Two CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    triggerQuoteModal('Free Site Health Check — Website Maintenance')
                  }
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-primary hover:bg-primary-700 text-white font-bold text-[15px] sm:text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Get a Free Site Health Check</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#care-plans"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-bold text-[15px] sm:text-[16px] transition-all"
                >
                  <span>See Care Plans ↓</span>
                </a>
              </div>

              {/* Trust Row */}
              <div className="mt-9 pt-7 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-semibold text-white/80">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>24/7 Monitoring</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Daily Off-Site Backups</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>WordPress • Shopify • Custom</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Cancel Anytime</span>
                </span>
              </div>
            </div>

            {/* Right 6 Cols: Interactive "Site Health Mission Control" Card */}
            <div className="lg:col-span-6">
              <div className="rounded-[26px] bg-white/[0.05] border-2 border-primary/40 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                {/* Top Status Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                    </span>
                    <span className="font-mono text-[12px] font-extrabold uppercase tracking-wider text-white">
                      ALL SYSTEMS OPERATIONAL
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-primary/25 border border-primary/40 font-mono text-[11px] font-bold text-primary-100">
                    SAMPLE MONITORED CLIENT SITE
                  </span>
                </div>

                {/* 90-Day Uptime Bar Strip */}
                <div className="mt-4 p-3.5 rounded-2xl bg-navy/80 border border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className="text-white/75 font-bold">
                      90-DAY UPTIME HEARTBEAT LOG
                    </span>
                    <span className="text-primary-100 font-extrabold">
                      99.98% SLA VERIFIED
                    </span>
                  </div>
                  <div
                    className="grid grid-cols-30 sm:grid-cols-60 gap-[3px] h-6 items-end"
                    style={{
                      gridTemplateColumns: 'repeat(60, minmax(0, 1fr))',
                    }}
                    aria-label="90-day uptime bar strip showing 99.98% uptime"
                  >
                    {NINETY_DAY_BARS.map((bar) => (
                      <div
                        key={bar.day}
                        title={`Day -${bar.day}: ${bar.uptime}`}
                        className={`w-full rounded-xs transition-all ${
                          bar.status === 'operational'
                            ? 'h-full bg-primary hover:bg-primary-100'
                            : 'h-4 bg-white/45'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mt-1.5">
                    <span>90 days ago</span>
                    <span>60-sec interval checks</span>
                    <span>Today (Live)</span>
                  </div>
                </div>

                {/* 6 Clickable Live Monitor Tiles */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/70">
                      6 ACTIVE PROTECTION MONITORS (CLICK TO INSPECT)
                    </span>
                    <span className="font-mono text-[11px] text-primary-100">
                      {activeMonitor.lastChecked}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {MISSION_MONITORS.map((mon) => {
                      const isSelected = mon.id === selectedMonitorId;
                      return (
                        <button
                          key={mon.id}
                          type="button"
                          onClick={() => setSelectedMonitorId(mon.id)}
                          className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-white border-white/40 shadow-md'
                              : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`font-mono text-[10px] font-bold uppercase truncate ${
                                isSelected ? 'text-white/90' : 'text-primary-100'
                              }`}
                            >
                              {mon.label}
                            </span>
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isSelected ? 'text-white' : 'text-primary'
                              }`}
                            />
                          </div>
                          <div className="font-mono text-[16px] sm:text-[17px] font-extrabold mt-1 leading-tight">
                            {mon.metricValue}
                          </div>
                          <div
                            className={`font-mono text-[10px] mt-1 truncate ${
                              isSelected ? 'text-white/85' : 'text-white/55'
                            }`}
                          >
                            {mon.statusTag}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Monitor Live Readout Bar */}
                  <div className="mt-3 p-3.5 rounded-xl bg-white/[0.06] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-[12px] text-white/90 leading-snug">
                      <strong className="font-mono text-primary-100 uppercase mr-1.5">
                        [{activeMonitor.label}]:
                      </strong>
                      {activeMonitor.subDetail}
                    </div>
                    <span className="font-mono text-[11px] font-bold text-primary-100 shrink-0">
                      STATUS: HEALTHY ✓
                    </span>
                  </div>
                </div>

                {/* Simulated "Last Incident Handled" Ticker */}
                <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[12px]">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-primary/30 border border-primary/50 font-mono text-[10px] font-extrabold text-primary-100 uppercase">
                      LAST INCIDENT LOG
                    </span>
                    <span className="font-mono text-[12px] text-white/85">
                      Plugin conflict caught on staging — resolved in{' '}
                      <strong className="text-white underline decoration-primary">
                        14 min
                      </strong>{' '}
                      — 0s live downtime
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — "WITHOUT MAINTENANCE" VS "WITH WEBXCODE CARE": TIMELINE
         (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              WHY MAINTENANCE MATTERS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              What Happens to an{' '}
              <span className="text-primary">Unmaintained Website</span> Over 6 Months
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Websites don&apos;t break all at once—they decay quietly month by month until a
              failed SSL, broken form, or plugin exploit costs you real revenue. Click any month
              on the timeline below to compare both tracks.
            </p>
          </div>

          {/* Interactive Month Scrubber Buttons (Month 1 -> Month 6) */}
          <div
            role="tablist"
            aria-label="6-Month Website Maintenance Timeline"
            className="grid grid-cols-2 sm:grid-cols-6 gap-2.5 mb-8"
          >
            {SIX_MONTH_TIMELINE.map((item, idx) => {
              const isSelected = idx === selectedMonthIndex;
              return (
                <button
                  key={item.month}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedMonthIndex(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-soft'
                      : 'bg-primary-50/40 hover:bg-primary-50 text-navy border-navy-08'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[11px] font-extrabold uppercase ${
                        isSelected ? 'text-primary-100' : 'text-primary'
                      }`}
                    >
                      {item.month}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-white text-navy-60 border border-navy-08'
                      }`}
                    >
                      {item.unmaintainedHealth}% vs 100%
                    </span>
                  </div>
                  <div
                    className={`text-[12px] font-bold mt-1.5 truncate ${
                      isSelected ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {item.unmaintainedTitle.split(' ').slice(0, 3).join(' ')}…
                  </div>
                </button>
              );
            })}
          </div>

          {/* Two Parallel Horizontal Tracks (Top Track: Unmaintained | Bottom Track: With WebXCode Care) */}
          <div className="space-y-6">
            {/* TOP TRACK — WITHOUT MAINTENANCE (Muted Slate Warning Track) */}
            <div className="rounded-[24px] bg-navy/[0.03] border-2 border-navy-15 p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-navy-08">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-navy text-white flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-primary-100" />
                  </span>
                  <div>
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60">
                      TRACK A • WITHOUT MAINTENANCE
                    </div>
                    <h3 className="text-[18px] sm:text-[20px] font-extrabold text-navy">
                      Ad-Hoc &ldquo;Fix It Only When It Breaks&rdquo; Approach
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-navy-60">
                    SITE HEALTH AT {activeMonthData.month.toUpperCase()}:
                  </span>
                  <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[13px] font-extrabold">
                    {activeMonthData.unmaintainedHealth}%
                  </span>
                </div>
              </div>

              {/* 6-Node Horizontal Step Bar for Unmaintained Track */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-6 gap-3">
                {SIX_MONTH_TIMELINE.map((step, idx) => {
                  const isCurrent = idx === selectedMonthIndex;
                  const isPastOrCurrent = idx <= selectedMonthIndex;
                  return (
                    <div
                      key={step.month}
                      onClick={() => setSelectedMonthIndex(idx)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-white border-navy shadow-md ring-2 ring-navy/10'
                          : isPastOrCurrent
                          ? 'bg-white/80 border-navy-15'
                          : 'bg-white/40 border-navy-08 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] font-bold text-navy-60">
                        <span>{step.month}</span>
                        <span>{step.unmaintainedHealth}%</span>
                      </div>
                      <div className="text-[13px] font-extrabold text-navy mt-1 leading-snug">
                        {step.unmaintainedTitle}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Month Detail Box for Unmaintained */}
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white border border-navy-15 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[11px] font-extrabold uppercase text-navy-60">
                    {activeMonthData.month} INCIDENT RISK — {activeMonthData.unmaintainedTitle}
                  </span>
                  <p className="text-[14px] sm:text-[15px] text-navy-80 mt-1 leading-relaxed">
                    {activeMonthData.unmaintainedEvent}
                  </p>
                </div>
                <span className="px-3.5 py-2 rounded-xl bg-navy/5 border border-navy-15 font-mono text-[12px] font-bold text-navy shrink-0">
                  Impact: {activeMonthData.unmaintainedImpact}
                </span>
              </div>
            </div>

            {/* BOTTOM TRACK — WITH WEBXCODE CARE (Steady Blue/Navy Protected Track) */}
            <div className="rounded-[24px] bg-navy text-white border-2 border-primary p-5 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-72 h-72 blue-glow-strong pointer-events-none opacity-60" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/15">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                        TRACK B • WITH WEBXCODE CARE PLAN
                      </div>
                      <h3 className="text-[18px] sm:text-[20px] font-extrabold text-white">
                        Proactive Staging Updates, Daily Backups &amp; 24/7 Monitoring
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-primary-100">
                      SITE HEALTH AT {activeMonthData.month.toUpperCase()}:
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[13px] font-extrabold">
                      {activeMonthData.withCareHealth}% HEALTHY ✓
                    </span>
                  </div>
                </div>

                {/* 6-Node Horizontal Step Bar for WebXCode Care Track */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-6 gap-3">
                  {SIX_MONTH_TIMELINE.map((step, idx) => {
                    const isCurrent = idx === selectedMonthIndex;
                    return (
                      <div
                        key={step.month}
                        onClick={() => setSelectedMonthIndex(idx)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-primary text-white border-white shadow-md'
                            : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-[10px] font-bold">
                          <span className={isCurrent ? 'text-white' : 'text-primary-100'}>
                            {step.month}
                          </span>
                          <span>100% ✓</span>
                        </div>
                        <div className="text-[13px] font-extrabold mt-1 leading-snug">
                          {step.withCareTitle}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Active Month Detail Box for WebXCode Care */}
                <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white/[0.07] border border-white/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold uppercase text-primary-100">
                      {activeMonthData.month} PROACTIVE PROTECTION —{' '}
                      {activeMonthData.withCareTitle}
                    </span>
                    <p className="text-[14px] sm:text-[15px] text-white/90 mt-1 leading-relaxed">
                      {activeMonthData.withCareEvent}
                    </p>
                  </div>
                  <span className="px-3.5 py-2 rounded-xl bg-primary text-white font-mono text-[12px] font-extrabold shrink-0">
                    {activeMonthData.withCareOutcome}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — WHAT WE DO EVERY MONTH: PIT-STOP CREW BOARD
         (bg: #f0f7fd light blue tint)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50 border-b border-primary-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Top Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                WHAT&apos;S INCLUDED
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                9 Things Our Team Handles{' '}
                <span className="text-primary">Behind the Scenes</span>
              </h2>
              <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
                Think of us as your website&apos;s dedicated pit-stop crew. Filter by cadence
                below to see what we run daily, weekly, monthly, and on-demand whenever you
                send a request.
              </p>
            </div>

            {/* Cadence Filter Pills: All / Daily / Weekly / Monthly / On-Demand */}
            <div
              role="tablist"
              aria-label="Filter maintenance stations by frequency"
              className="flex flex-wrap items-center gap-2"
            >
              {(['All', 'Daily', 'Weekly', 'Monthly', 'On-Demand'] as CadenceFilter[]).map(
                (cadence) => {
                  const isActive = activeCadenceFilter === cadence;
                  const count =
                    cadence === 'All'
                      ? PIT_STOP_STATIONS.length
                      : PIT_STOP_STATIONS.filter((s) => s.cadence === cadence).length;
                  return (
                    <button
                      key={cadence}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCadenceFilter(cadence)}
                      className={`px-4 py-2.5 rounded-full text-[13px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-navy text-white shadow-soft'
                          : 'bg-white text-navy hover:border-primary border border-navy-15'
                      }`}
                    >
                      <span>{cadence}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-full font-mono text-[11px] ${
                          isActive
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* 3x3 Pit-Stop Crew Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            <AnimatePresence mode="popLayout">
              {filteredStations.map((station) => (
                <motion.div
                  key={station.id}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22 }}
                  className="rounded-[24px] bg-white border border-navy-08 hover:border-primary shadow-soft p-6 sm:p-7 flex flex-col justify-between transition-all"
                >
                  <div>
                    {/* Top Station Header: Number + Frequency Pill */}
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-navy-08">
                      <div className="flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-xl bg-navy text-white font-mono text-[13px] font-extrabold flex items-center justify-center">
                          {station.number}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-navy-50">
                          {station.stationCode}
                        </span>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full font-mono text-[11px] font-extrabold uppercase tracking-wider ${
                          station.cadence === 'Daily'
                            ? 'bg-primary text-white'
                            : station.cadence === 'Weekly'
                            ? 'bg-navy text-white'
                            : 'bg-primary-50 text-primary border border-primary-100'
                        }`}
                      >
                        {station.cadence}
                      </span>
                    </div>

                    {/* Title & Summary */}
                    <h3 className="mt-5 text-[19px] sm:text-[20px] font-extrabold text-navy leading-snug">
                      {station.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-navy-70 leading-relaxed">
                      {station.summary}
                    </p>

                    {/* 3 Checklist Bullets */}
                    <ul className="mt-5 space-y-2.5 pt-4 border-t border-navy-08">
                      {station.checklist.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[13px] text-navy-80 font-medium leading-snug"
                        >
                          <span className="w-4 h-4 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Station Footer */}
                  <div className="mt-6 pt-3.5 border-t border-navy-08 flex items-center justify-between text-[12px] font-mono font-bold text-primary">
                    <span>INCLUDED IN ALL CARE PLANS</span>
                    <span>ACTIVE ✓</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — PLATFORMS WE MAINTAIN: SERVICE BAY SWITCHER (white)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              PLATFORMS WE SUPPORT
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Built by Us or Built by Someone Else —{' '}
              <span className="text-primary">We&apos;ll Maintain It</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Select your platform below to inspect the common failure points we prevent, our
              exact monthly maintenance checklist, and typical engineering hours.
            </p>
          </div>

          {/* 4 Service Bay Tab Buttons */}
          <div
            role="tablist"
            aria-label="Platforms we maintain"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
          >
            {PLATFORM_SERVICE_BAYS.map((bay) => {
              const isSelected = bay.id === activeBayId;
              return (
                <button
                  key={bay.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveBayId(bay.id)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-soft'
                      : 'bg-white text-navy border-navy-15 hover:border-primary'
                  }`}
                >
                  <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                    {bay.bayCode}
                  </div>
                  <div
                    className={`text-[15px] sm:text-[16px] font-extrabold mt-1.5 leading-snug ${
                      isSelected ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {bay.tabLabel}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Service Bay Inspection Console */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBay.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="rounded-[26px] bg-primary-50/50 border-2 border-primary-100 p-6 sm:p-8 lg:p-10"
            >
              {/* Bay Top Banner */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-primary-100">
                <div>
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    {activeBay.bayCode} • ACTIVE DIAGNOSTIC SPECIFICATION
                  </span>
                  <h3 className="text-[22px] sm:text-[28px] font-extrabold text-navy mt-1">
                    {activeBay.headline}
                  </h3>
                  <p className="mt-2 text-[14px] sm:text-[15px] text-navy-70 max-w-3xl leading-relaxed">
                    {activeBay.subtitle}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-navy text-white shrink-0">
                  <div className="font-mono text-[10px] uppercase text-primary-100 font-bold">
                    TYPICAL MONTHLY ALLOCATION
                  </div>
                  <div className="font-mono text-[15px] font-extrabold text-white mt-1">
                    {activeBay.typicalHoursPerMonth}
                  </div>
                </div>
              </div>

              {/* 2-Column Split: Left = 4 Common Issues We Fix | Right = 6 Monthly Maintenance Tasks */}
              <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left 6 Cols: 4 Common Issues We Prevent & Fix */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60 mb-3.5">
                      COMMON {activeBay.tabLabel.toUpperCase()} ISSUES WE PREVENT &amp; FIX
                    </div>

                    <div className="space-y-3">
                      {activeBay.commonIssues.map((issue, idx) => (
                        <div
                          key={issue.title}
                          className="p-4 rounded-2xl bg-white border border-navy-08 shadow-xs"
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-lg bg-primary-50 text-primary font-mono text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                              0{idx + 1}
                            </span>
                            <div>
                              <h4 className="text-[15px] font-extrabold text-navy">
                                {issue.title}
                              </h4>
                              <p className="text-[13px] text-navy-70 mt-1 leading-relaxed">
                                {issue.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Supported Tech Chips */}
                  <div className="mt-5 pt-4 border-t border-primary-100">
                    <div className="font-mono text-[10px] font-bold uppercase text-navy-60 mb-2">
                      SUPPORTED STACK &amp; TOOLING IN THIS BAY:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeBay.supportedTechChips.map((chip) => (
                        <span
                          key={chip}
                          className="px-3 py-1 rounded-full bg-white border border-primary-100 font-mono text-[11px] font-bold text-navy"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 6 Cols: 6 Specific Maintenance Tasks We Perform */}
                <div className="lg:col-span-6 rounded-[22px] bg-navy text-white p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/15">
                      <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                        OUR MONTHLY CARE PROTOCOL (6 TASKS)
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold">
                        STAGING VERIFIED
                      </span>
                    </div>

                    <ul className="mt-5 space-y-3">
                      {activeBay.maintenanceTasks.map((task) => (
                        <li
                          key={task}
                          className="p-3 rounded-xl bg-white/[0.06] border border-white/10 flex items-start gap-3 text-[13px] sm:text-[14px] text-white/90 font-medium"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          </span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-[13px] text-white/80">
                      Have a <strong className="text-white">{activeBay.tabLabel}</strong> site
                      that needs care?
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        triggerQuoteModal(`Maintenance Plan — ${activeBay.tabLabel}`)
                      }
                      className="px-6 py-3 rounded-full bg-primary hover:bg-primary-700 text-white font-bold text-[14px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer shrink-0"
                    >
                      <span>Maintain My {activeBay.tabLabel.split(' ')[0]} Site</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Compact Related Services Cross-Link Strip */}
          <div className="mt-8 pt-6 border-t border-navy-08 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60">
              NEED FULL-COMPANY IT, CLOUD, EMAIL &amp; DEVICE SUPPORT?
            </span>
            <Link
              href="/services/managed-it-services"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[13px] font-bold transition-all"
            >
              <Server className="w-3.5 h-3.5 text-primary group-hover:text-primary-100" />
              <span>Managed IT Services</span>
              <span className="px-1.5 py-0.2 rounded bg-primary text-white font-mono text-[9px] font-extrabold">
                NEW
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WebsiteMaintenanceSupport;
