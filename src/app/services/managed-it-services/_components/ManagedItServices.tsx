'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Server,
  ShieldCheck,
  Laptop,
  Mail,
  Globe,
  Cloud,
  Headphones,
  HardDrive,
  Wifi,
  KeyRound,
  RefreshCw,
  Users,
  UserCheck,
  Wrench,
  Printer,
  Phone,
  Lock,
  Activity,
} from 'lucide-react';
import { services } from '@/app/services/_components/Services';

interface ManagedItServicesProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

/* ============================================================================
   SECTION 1 DATA — HERO: THE CONNECTED ISOMETRIC OFFICE FLOOR
============================================================================ */
interface IsometricOfficeDevice {
  id: string;
  label: string;
  ipTag: string;
  badgeText: 'Secured' | 'Backed up' | 'Updated';
  zone: string;
}

const OFFICE_FLOOR_DEVICES: IsometricOfficeDevice[] = [
  {
    id: 'dev-desk-01',
    label: 'Workstation 01 — Founder MacBook',
    ipTag: '10.0.14.11',
    badgeText: 'Secured',
    zone: 'Desk Pod A1',
  },
  {
    id: 'dev-desk-02',
    label: 'Workstation 02 — Finance Laptop',
    ipTag: '10.0.14.12',
    badgeText: 'Backed up',
    zone: 'Desk Pod A2',
  },
  {
    id: 'dev-desk-03',
    label: 'Workstation 03 — Sales & CRM Desk',
    ipTag: '10.0.14.15',
    badgeText: 'Updated',
    zone: 'Desk Pod B1',
  },
  {
    id: 'dev-desk-04',
    label: 'Workstation 04 — Operations PC',
    ipTag: '10.0.14.19',
    badgeText: 'Secured',
    zone: 'Desk Pod B2',
  },
  {
    id: 'dev-wifi',
    label: 'Mesh Wi-Fi 6 & Firewall Gateway',
    ipTag: '10.0.14.1 (VLAN)',
    badgeText: 'Secured',
    zone: 'Network Core',
  },
  {
    id: 'dev-rack',
    label: 'Local NAS & Cloud Sync Rack',
    ipTag: '10.0.14.250',
    badgeText: 'Backed up',
    zone: 'Server Closet',
  },
  {
    id: 'dev-printer',
    label: 'Network Printer & Scanner',
    ipTag: '10.0.14.88',
    badgeText: 'Updated',
    zone: 'Shared Hub',
  },
  {
    id: 'dev-voip',
    label: 'IP Desk Phone & Reception Line',
    ipTag: '10.0.14.92',
    badgeText: 'Secured',
    zone: 'Front Desk',
  },
];

/* ============================================================================
   SECTION 2 DATA — WHO HANDLES YOUR IT TODAY? (THREE OPTIONS COMPARISON)
============================================================================ */
interface ItOptionBar {
  label: 'Cost' | 'Availability' | 'Expertise breadth' | 'Security & backups';
  scorePercent: number;
  displayText: string;
}

interface ItHandlingOption {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  featured: boolean;
  avatarCode: 'friend' | 'inhouse' | 'webxcode';
  bars: ItOptionBar[];
  verdict: string;
}

const IT_HANDLING_OPTIONS: ItHandlingOption[] = [
  {
    id: 'opt-friend',
    title: '“The Friend Who Knows Computers”',
    subtitle: 'Free or ad-hoc help—until an urgent problem hits on a Tuesday morning.',
    featured: false,
    avatarCode: 'friend',
    bars: [
      { label: 'Cost', scorePercent: 20, displayText: 'Low upfront (hidden downtime cost)' },
      { label: 'Availability', scorePercent: 25, displayText: 'Evenings / weekends only' },
      { label: 'Expertise breadth', scorePercent: 35, displayText: 'Basic troubleshooting only' },
      { label: 'Security & backups', scorePercent: 20, displayText: 'Rarely monitored or tested' },
    ],
    verdict:
      'Verdict: Fine for a 2-person hobby project; risky once your team relies on email, client files, and uptime.',
  },
  {
    id: 'opt-inhouse',
    title: 'In-House IT Hire',
    subtitle: 'Dedicated person on payroll, but expensive and single-person dependent.',
    featured: false,
    avatarCode: 'inhouse',
    bars: [
      { label: 'Cost', scorePercent: 92, displayText: 'High fixed salary + benefits + tools' },
      { label: 'Availability', scorePercent: 65, displayText: 'Business hours (minus sick/leave days)' },
      { label: 'Expertise breadth', scorePercent: 60, displayText: 'One generalist vs cloud + security + network' },
      { label: 'Security & backups', scorePercent: 70, displayText: 'Depends on one person’s bandwidth' },
    ],
    verdict:
      'Verdict: Great for 150+ staff enterprises, but overkill and a single point of failure for 5–80 person teams.',
  },
  {
    id: 'opt-webxcode',
    title: 'WebXCode Managed IT',
    subtitle: 'A full team of cloud, workspace, network & security engineers for a predictable monthly fee.',
    badge: 'Best Value',
    featured: true,
    avatarCode: 'webxcode',
    bars: [
      { label: 'Cost', scorePercent: 45, displayText: 'Predictable per-user flat monthly fee' },
      { label: 'Availability', scorePercent: 98, displayText: 'Fast remote desk + 24/7 critical monitoring' },
      { label: 'Expertise breadth', scorePercent: 96, displayText: 'Workspace, Cloud, Endpoint, Network & DevOps' },
      { label: 'Security & backups', scorePercent: 98, displayText: 'Automated daily backups, 2FA & endpoint shield' },
    ],
    verdict:
      'Verdict: Full-department reliability at a fraction of one full-time salary—with zero sick-day gaps.',
  },
];

/* ============================================================================
   SECTION 3 DATA — WHAT WE MANAGE: THE 10-UNIT SERVER RACK
============================================================================ */
interface ServerRackUnit {
  unitNumber: string; // U01 .. U10
  id: string;
  name: string;
  shortCode: string;
  ledPattern: [boolean, boolean, boolean];
  description: string;
  deliverables: [string, string, string];
  specsTag: string;
}

const SERVER_RACK_UNITS: ServerRackUnit[] = [
  {
    unitNumber: 'U01',
    id: 'rack-email',
    name: 'Business Email — Google Workspace & Microsoft 365',
    shortCode: 'M365 / GWS-MAIL',
    ledPattern: [true, true, true],
    description:
      'Professional @yourcompany email setup, user onboarding/offboarding, shared drives, and anti-spoofing deliverability protection so your emails never land in spam.',
    deliverables: [
      'New employee mailbox provisioning, aliases, groups & shared drive permissions',
      'SPF, DKIM & DMARC authentication setup to prevent domain spoofing',
      'Zero-downtime migration from personal Gmail, cPanel webmail, or legacy hosts',
    ],
    specsTag: 'SPF • DKIM • DMARC • 2FA ENFORCED',
  },
  {
    unitNumber: 'U02',
    id: 'rack-dns',
    name: 'Domains & DNS Management',
    shortCode: 'DNS / SSL-CORE',
    ledPattern: [true, true, false],
    description:
      'Centralized management of all your company domain names, Cloudflare DNS records, SSL certificates, and auto-renewals so a forgotten expiry never takes your business offline.',
    deliverables: [
      'Domain registrar lock, renewal calendar & ownership consolidation',
      'Cloudflare DNS, MX, TXT, CNAME & subdomain routing configuration',
      'Automated SSL certificate provisioning and expiry monitoring',
    ],
    specsTag: 'CLOUDFLARE DNS • REGISTRAR LOCK',
  },
  {
    unitNumber: 'U03',
    id: 'rack-cloud',
    name: 'Cloud Hosting & Servers (AWS, Google Cloud, VPS)',
    shortCode: 'AWS / GCP / VPS',
    ledPattern: [true, true, true],
    description:
      'Right-sized cloud servers, Linux/Windows VPS administration, staging environments, and monthly cloud bill optimization for your websites, ERPs, and internal tools.',
    deliverables: [
      'AWS, Google Cloud, DigitalOcean & Hetzner server setup and OS patching',
      'Load balancing, CDN caching, SSL termination & firewall security groups',
      'Monthly cloud resource audit to cut unused instances and reduce spend',
    ],
    specsTag: '99.98% UPTIME • COST TUNED',
  },
  {
    unitNumber: 'U04',
    id: 'rack-helpdesk',
    name: 'IT Helpdesk & Remote Support',
    shortCode: 'HELPDESK-REMOTE',
    ledPattern: [true, true, true],
    description:
      'Friendly, fast remote IT support for your everyday team headaches—from printer glitches and slow laptops to Outlook sync issues and VPN access.',
    deliverables: [
      'Direct WhatsApp, email & ticket helpdesk for every employee on your team',
      'Encrypted screen-sharing & remote troubleshooting within minutes',
      'Clear monthly ticket log showing issues resolved and response times',
    ],
    specsTag: 'REMOTE DESK • FAST SLA',
  },
  {
    unitNumber: 'U05',
    id: 'rack-devices',
    name: 'Laptop, Desktop & Device Management',
    shortCode: 'MDM / ENDPOINT',
    ledPattern: [true, false, true],
    description:
      'Standardized setup and lifecycle care for Windows PCs and Macs—so new hires get a ready-to-work laptop on Day 1 and departing staff access is revoked cleanly.',
    deliverables: [
      'New joiner laptop setup: business apps, email, Wi-Fi & security pre-configured',
      'Full-disk encryption (BitLocker / FileVault) & remote lock/wipe if lost',
      'Automated OS updates, driver patches & hardware health checks',
    ],
    specsTag: 'WINDOWS • MACOS • BITLOCKER',
  },
  {
    unitNumber: 'U06',
    id: 'rack-security',
    name: 'Cybersecurity & Endpoint Protection',
    shortCode: 'SEC / EDR-WALL',
    ledPattern: [true, true, true],
    description:
      'Practical, multi-layered cybersecurity built for small and mid-sized businesses—stopping ransomware, phishing links, and weak password breaches before they spread.',
    deliverables: [
      'Managed antivirus / EDR endpoint protection on all company laptops & desktops',
      'Company-wide 2-step verification (2FA/MFA) & password manager rollout',
      'Email phishing filter rules & quarterly security hygiene checks',
    ],
    specsTag: 'EDR SHIELD • 2FA • ZERO-TRUST',
  },
  {
    unitNumber: 'U07',
    id: 'rack-backups',
    name: 'Backup & Disaster Recovery',
    shortCode: 'BKP / DR-VAULT',
    ledPattern: [true, true, false],
    description:
      'Automated, encrypted backups of your servers, cloud drives, mailboxes, and critical workstations—with routine test restores so accidental deletion is never permanent.',
    deliverables: [
      'Daily automated off-site backups for servers, databases & business files',
      'Google Workspace / Microsoft 365 mailbox & shared drive backup retention',
      'Scheduled recovery drills to verify how fast files can be restored',
    ],
    specsTag: '3-2-1 BACKUP RULE • ENCRYPTED',
  },
  {
    unitNumber: 'U08',
    id: 'rack-network',
    name: 'Office Network & Wi-Fi Setup',
    shortCode: 'LAN / WIFI-MESH',
    ledPattern: [true, true, true],
    description:
      'Reliable office internet architecture—separating staff Wi-Fi from guest devices, eliminating dead zones, and securing routers and switches.',
    deliverables: [
      'Commercial mesh Wi-Fi planning, router configuration & dead-zone elimination',
      'Separate encrypted VLANs for internal staff, VoIP phones, and office guests',
      'Dual-ISP failover setup so your office stays online if primary broadband drops',
    ],
    specsTag: 'GUEST VLAN • ISP FAILOVER',
  },
  {
    unitNumber: 'U09',
    id: 'rack-saas',
    name: 'Software Licenses & SaaS Management',
    shortCode: 'SAAS / LIC-OPS',
    ledPattern: [true, false, true],
    description:
      'Stop paying for forgotten seats on ex-employees’ accounts. We track all your SaaS subscriptions, renewals, and license tiers in one clean inventory.',
    deliverables: [
      'Central register of all company software licenses, seats & renewal dates',
      'Immediate seat reclamation when employees or contractors leave',
      'Right-sizing license tiers across Microsoft 365, Google, Adobe, Slack & CRM tools',
    ],
    specsTag: 'ZERO SEAT WASTE • AUDIT LOG',
  },
  {
    unitNumber: 'U10',
    id: 'rack-migration',
    name: 'Cloud Migration',
    shortCode: 'CLOUD-MIGRATE',
    ledPattern: [true, true, true],
    description:
      'Move smoothly from aging office file servers, personal drives, or legacy email hosts into modern cloud workspaces without losing folders, permissions, or work hours.',
    deliverables: [
      'Step-by-step migration from local file servers to Google Drive, SharePoint or AWS',
      'Weekend/after-hours cutover schedule so staff experience zero workday disruption',
      'Folder permission mapping, team walkthrough & post-migration support',
    ],
    specsTag: 'AFTER-HOURS CUTOVER • 0 LOSS',
  },
];

/* ============================================================================
   SECTION 4 DATA — TEAM SIZE ESTIMATOR (EDITABLE PLACEHOLDER PRICING CONFIG)
============================================================================ */
interface EstimatorNeedOption {
  id: string;
  label: string;
  monthlyAddInr: number;
  monthlyAddUsd: number;
  perUserAddInr: number;
  perUserAddUsd: number;
}

const IT_ESTIMATOR_CONFIG = {
  basePlatformFeeInr: 6500,
  basePlatformFeeUsd: 95,
  perUserBaseInr: 850,
  perUserBaseUsd: 12,
  needs: [
    {
      id: 'need-email',
      label: 'Business Email',
      monthlyAddInr: 1500,
      monthlyAddUsd: 20,
      perUserAddInr: 150,
      perUserAddUsd: 2,
    },
    {
      id: 'need-devices',
      label: 'Device Management',
      monthlyAddInr: 2000,
      monthlyAddUsd: 30,
      perUserAddInr: 250,
      perUserAddUsd: 3.5,
    },
    {
      id: 'need-security',
      label: 'Security & Antivirus',
      monthlyAddInr: 2000,
      monthlyAddUsd: 30,
      perUserAddInr: 220,
      perUserAddUsd: 3,
    },
    {
      id: 'need-backups',
      label: 'Backups',
      monthlyAddInr: 2500,
      monthlyAddUsd: 35,
      perUserAddInr: 140,
      perUserAddUsd: 2,
    },
    {
      id: 'need-helpdesk',
      label: 'Helpdesk Support',
      monthlyAddInr: 3000,
      monthlyAddUsd: 45,
      perUserAddInr: 300,
      perUserAddUsd: 4,
    },
    {
      id: 'need-cloud',
      label: 'Cloud Hosting',
      monthlyAddInr: 4500,
      monthlyAddUsd: 60,
      perUserAddInr: 80,
      perUserAddUsd: 1,
    },
    {
      id: 'need-network',
      label: 'Network/Wi-Fi',
      monthlyAddInr: 3000,
      monthlyAddUsd: 45,
      perUserAddInr: 60,
      perUserAddUsd: 1,
    },
  ] as EstimatorNeedOption[],
};

/* ============================================================================
   MAIN PAGE COMPONENT
============================================================================ */
const ManagedItServices: React.FC<ManagedItServicesProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  // Single source of truth from Services.tsx
  const managedItService = useMemo(
    () => services.find((s) => s.slug === 'managed-it-services'),
    []
  );

  const triggerQuoteModal = (serviceContext?: string) => {
    const label = serviceContext || managedItService?.name || 'Managed IT Services';
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  // SEO Title & Meta Description
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Managed IT Services for Small Businesses | Email, Cloud, Security & Support | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        managedItService?.description ||
          'Your IT department without hiring one. WebXCode manages business email (Google Workspace & Microsoft 365), domains, cloud hosting, laptops, cybersecurity, automated backups, and remote IT helpdesk for a predictable monthly fee.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, [managedItService]);

  /* --------------------------------------------------------------------------
     SECTION 1 STATE — Active Highlighted Device on Isometric Office Floor
  -------------------------------------------------------------------------- */
  const [activeDeviceIndex, setActiveDeviceIndex] = useState<number>(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveDeviceIndex((prev) => (prev + 1) % OFFICE_FLOOR_DEVICES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  /* --------------------------------------------------------------------------
     SECTION 3 STATE — Active Pulled-Out Server Rack Unit (Default: U01)
  -------------------------------------------------------------------------- */
  const [selectedRackUnitId, setSelectedRackUnitId] = useState<string>('rack-email');
  const activeRackUnit = useMemo(
    () =>
      SERVER_RACK_UNITS.find((u) => u.id === selectedRackUnitId) || SERVER_RACK_UNITS[0],
    [selectedRackUnitId]
  );

  /* --------------------------------------------------------------------------
     SECTION 4 STATE — Team Size Estimator (Default: 12 Users)
  -------------------------------------------------------------------------- */
  const [teamUsers, setTeamUsers] = useState<number>(12);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([
    'need-email',
    'need-security',
    'need-backups',
    'need-helpdesk',
  ]);
  const [estCurrency, setEstCurrency] = useState<'INR' | 'USD'>('INR');

  const toggleEstimatorNeed = (id: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const estimatorResult = useMemo(() => {
    const activeNeedObjs = IT_ESTIMATOR_CONFIG.needs.filter((n) =>
      selectedNeeds.includes(n.id)
    );

    // Determine recommended plan tier based on team size and needs count
    let recommendedPlan: 'Starter IT Care' | 'Business IT Department' | 'Pro Cloud & Security Ops' =
      'Business IT Department';
    if (teamUsers <= 8 && selectedNeeds.length <= 3) {
      recommendedPlan = 'Starter IT Care';
    } else if (teamUsers >= 30 || selectedNeeds.length >= 6) {
      recommendedPlan = 'Pro Cloud & Security Ops';
    }

    if (estCurrency === 'INR') {
      const fixedAddons = activeNeedObjs.reduce((acc, n) => acc + n.monthlyAddInr, 0);
      const perUserAddons = activeNeedObjs.reduce((acc, n) => acc + n.perUserAddInr, 0);
      const rawMid =
        IT_ESTIMATOR_CONFIG.basePlatformFeeInr +
        fixedAddons +
        teamUsers * (IT_ESTIMATOR_CONFIG.perUserBaseInr + perUserAddons);
      const low = Math.round((rawMid * 0.9) / 500) * 500;
      const high = Math.round((rawMid * 1.12) / 500) * 500;
      const perUserAvg = Math.round(rawMid / Math.max(1, teamUsers) / 50) * 50;

      return {
        recommendedPlan,
        rangeText: `₹${low.toLocaleString('en-IN')} – ₹${high.toLocaleString('en-IN')}`,
        perUserText: `≈ ₹${perUserAvg.toLocaleString('en-IN')} per user / month`,
      };
    } else {
      const fixedAddons = activeNeedObjs.reduce((acc, n) => acc + n.monthlyAddUsd, 0);
      const perUserAddons = activeNeedObjs.reduce((acc, n) => acc + n.perUserAddUsd, 0);
      const rawMid =
        IT_ESTIMATOR_CONFIG.basePlatformFeeUsd +
        fixedAddons +
        teamUsers * (IT_ESTIMATOR_CONFIG.perUserBaseUsd + perUserAddons);
      const low = Math.round((rawMid * 0.9) / 10) * 10;
      const high = Math.round((rawMid * 1.12) / 10) * 10;
      const perUserAvg = Math.round(rawMid / Math.max(1, teamUsers));

      return {
        recommendedPlan,
        rangeText: `$${low.toLocaleString('en-US')} – $${high.toLocaleString('en-US')}`,
        perUserText: `≈ $${perUserAvg.toLocaleString('en-US')} per user / month`,
      };
    }
  }, [teamUsers, selectedNeeds, estCurrency]);

  const visibleIconsCount = Math.min(teamUsers, 30);
  const overflowUsersCount = Math.max(0, teamUsers - 30);

  return (
    <main className="flex-1 bg-white text-navy">
      {/* ======================================================================
         SECTION 1 — HERO: THE CONNECTED OFFICE (bg: #1e242e navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Radial Blue Glow + Architectural Isometric Grid */}
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
          {/* Breadcrumb: Home > Services > Managed IT Services */}
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
                {managedItService?.name || 'Managed IT Services'}
              </li>
            </ol>
          </nav>

          {/* 50% / 50% Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 6 Cols: Copy + Buttons + Trust Row */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/45 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Server className="w-3.5 h-3.5 text-primary" />
                <span>MANAGED IT SERVICES</span>
                <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-extrabold tracking-wider">
                  {managedItService?.badge || 'NEW'}
                </span>
              </div>

              <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] font-extrabold text-white leading-[1.08] tracking-tight">
                Your IT Department —{' '}
                <span className="text-primary">Without Hiring One</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65]">
                Business email, domains, cloud hosting, laptops, security, backups and
                day-to-day IT help — managed by our experts for a simple monthly fee.
              </p>

              {/* Two CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#it-check"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-primary hover:bg-primary-700 text-white font-bold text-[15px] sm:text-[16px] shadow-soft hover:shadow-soft-hover transition-all"
                >
                  <span>Get a Free IT Health Check</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#team-estimator"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-bold text-[15px] sm:text-[16px] transition-all"
                >
                  <span>Estimate My Monthly Cost</span>
                </a>
              </div>

              {/* Small Trust Row */}
              <div className="mt-9 pt-7 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-semibold text-white/80">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Remote support</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Proactive monitoring</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>India &amp; worldwide</span>
                </span>
              </div>
            </div>

            {/* Right 6 Cols: Isometric Connected Office Floor Illustration */}
            <div className="lg:col-span-6">
              <div className="rounded-[26px] bg-white/[0.04] border-2 border-primary/40 backdrop-blur-md p-5 sm:p-6 shadow-2xl relative overflow-hidden">
                {/* Screen-reader summary of decorative isometric office diagram */}
                <span className="sr-only">
                  Connected office illustration showing 4 workstation desks with laptops, a
                  mesh Wi-Fi router, a local server rack, a network printer, and an IP desk
                  phone all linked to the WebXCode IT Cloud with Secured, Backed up, and
                  Updated badges.
                </span>

                {/* Top Cloud Hub Header — "WebXCode IT" Floating Above */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-primary text-white border-2 border-white/30 shadow-[0_0_32px_rgba(5,113,194,0.85)]">
                    <Cloud className="w-6 h-6 text-white shrink-0" />
                    <div>
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                        CENTRAL COMMAND CLOUD
                      </div>
                      <div className="text-[16px] font-extrabold leading-tight">
                        WebXCode IT
                      </div>
                    </div>
                    <span className="ml-2 px-2.5 py-0.5 rounded-full bg-navy text-primary-100 font-mono text-[10px] font-bold">
                      8/8 NODES ONLINE
                    </span>
                  </div>

                  {/* Glowing Network Trunk Lines + Travelling Data Dots */}
                  <div
                    aria-hidden="true"
                    className="w-full max-w-[460px] h-12 relative flex items-center justify-center"
                  >
                    <svg
                      viewBox="0 0 460 52"
                      className="w-full h-full overflow-visible"
                      fill="none"
                    >
                      {/* Network branch lines from Cloud Hub (230, 0) to 4 columns below */}
                      <path
                        d="M230 0 L230 18 M230 18 L55 50 M230 18 L170 50 M230 18 L290 50 M230 18 L405 50"
                        stroke="#0571c2"
                        strokeWidth="2"
                        strokeOpacity="0.7"
                        strokeDasharray="4 4"
                      />
                      {/* Animated Data Dots along the lines */}
                      {!shouldReduceMotion && (
                        <>
                          <circle r="3.5" fill="#ffffff">
                            <animateMotion
                              dur="2.4s"
                              repeatCount="indefinite"
                              path="M230 0 L230 18 L55 50"
                            />
                          </circle>
                          <circle r="3.5" fill="#0571c2">
                            <animateMotion
                              dur="2.1s"
                              repeatCount="indefinite"
                              path="M230 0 L230 18 L170 50"
                            />
                          </circle>
                          <circle r="3.5" fill="#ffffff">
                            <animateMotion
                              dur="2.6s"
                              repeatCount="indefinite"
                              path="M230 0 L230 18 L290 50"
                            />
                          </circle>
                          <circle r="3.5" fill="#0571c2">
                            <animateMotion
                              dur="2.2s"
                              repeatCount="indefinite"
                              path="M230 0 L230 18 L405 50"
                            />
                          </circle>
                        </>
                      )}
                    </svg>
                  </div>
                </div>

                {/* Isometric Office Floor Plane (4 Workstation Desks + 4 Shared Infrastructure Nodes) */}
                <div className="relative rounded-2xl bg-navy/90 border border-primary/35 p-4 sm:p-5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/60 pb-3 mb-3.5 border-b border-white/10">
                    <span>OFFICE FLOOR TOPOLOGY • VLAN 10.0.14.0/24</span>
                    <span className="text-primary-100 font-bold">
                      CLICK ANY DEVICE NODE
                    </span>
                  </div>

                  {/* Row 1: 4 Office Desks with Laptops */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {OFFICE_FLOOR_DEVICES.slice(0, 4).map((dev, idx) => {
                      const isCurrent = activeDeviceIndex === idx;
                      return (
                        <button
                          key={dev.id}
                          type="button"
                          onClick={() => setActiveDeviceIndex(idx)}
                          className={`text-left p-3 rounded-xl border transition-all cursor-pointer relative ${
                            isCurrent
                              ? 'bg-primary/25 border-primary shadow-[0_0_20px_rgba(5,113,194,0.45)]'
                              : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/15'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 text-primary-100 flex items-center justify-center">
                              <Laptop className="w-3.5 h-3.5" />
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9px] font-extrabold ${
                                isCurrent
                                  ? 'bg-primary text-white'
                                  : 'bg-white/10 text-primary-100'
                              }`}
                            >
                              <Check className="w-2.5 h-2.5" strokeWidth={3} />
                              <span>{dev.badgeText}</span>
                            </span>
                          </div>
                          <div className="font-mono text-[10px] text-primary-100 font-bold">
                            {dev.zone}
                          </div>
                          <div className="text-[12px] font-bold text-white truncate mt-0.5">
                            {dev.label.split('—')[1] || dev.label}
                          </div>
                          <div className="font-mono text-[10px] text-white/50 mt-0.5">
                            {dev.ipTag}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Center Isometric Network Bus Line */}
                  <div
                    aria-hidden="true"
                    className="my-3 flex items-center gap-2"
                  >
                    <div className="h-[2px] flex-1 bg-primary/40" />
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/40 font-mono text-[9px] font-bold text-primary-100">
                      ENCRYPTED OFFICE SWITCH BUS • 10 Gbps
                    </span>
                    <div className="h-[2px] flex-1 bg-primary/40" />
                  </div>

                  {/* Row 2: Wi-Fi Router, Server Rack, Network Printer, IP Desk Phone */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {OFFICE_FLOOR_DEVICES.slice(4, 8).map((dev, idx) => {
                      const realIdx = idx + 4;
                      const isCurrent = activeDeviceIndex === realIdx;
                      const IconComponent =
                        dev.id === 'dev-wifi'
                          ? Wifi
                          : dev.id === 'dev-rack'
                          ? Server
                          : dev.id === 'dev-printer'
                          ? Printer
                          : Phone;

                      return (
                        <button
                          key={dev.id}
                          type="button"
                          onClick={() => setActiveDeviceIndex(realIdx)}
                          className={`text-left p-3 rounded-xl border transition-all cursor-pointer relative ${
                            isCurrent
                              ? 'bg-primary/25 border-primary shadow-[0_0_20px_rgba(5,113,194,0.45)]'
                              : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/15'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 text-primary-100 flex items-center justify-center">
                              <IconComponent className="w-3.5 h-3.5" />
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9px] font-extrabold ${
                                isCurrent
                                  ? 'bg-primary text-white'
                                  : 'bg-white/10 text-primary-100'
                              }`}
                            >
                              <Check className="w-2.5 h-2.5" strokeWidth={3} />
                              <span>{dev.badgeText}</span>
                            </span>
                          </div>
                          <div className="font-mono text-[10px] text-primary-100 font-bold">
                            {dev.zone}
                          </div>
                          <div className="text-[12px] font-bold text-white truncate mt-0.5">
                            {dev.label}
                          </div>
                          <div className="font-mono text-[10px] text-white/50 mt-0.5">
                            {dev.ipTag}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Live Inspected Node Telemetry Bar */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px]">
                    <div className="font-mono text-white/90">
                      <span className="text-primary-100 font-bold mr-1.5">
                        [{OFFICE_FLOOR_DEVICES[activeDeviceIndex].ipTag}]
                      </span>
                      <span>{OFFICE_FLOOR_DEVICES[activeDeviceIndex].label}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-extrabold text-primary-100">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span>
                        STATUS: {OFFICE_FLOOR_DEVICES[activeDeviceIndex].badgeText.toUpperCase()} ✓
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — WHO HANDLES YOUR IT TODAY? — THREE OPTIONS (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              COMPARE YOUR OPTIONS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Who&apos;s Fixing Things{' '}
              <span className="text-primary">When They Break?</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Most growing businesses outgrow informal tech help long before they need a
              expensive full-time IT director. Compare how the three models stack up across cost,
              availability, breadth of expertise, and security.
            </p>
          </div>

          {/* Three Comparison Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {IT_HANDLING_OPTIONS.map((opt) => (
              <div
                key={opt.id}
                className={`rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all relative overflow-hidden ${
                  opt.featured
                    ? 'bg-navy text-white border-2 border-primary shadow-[0_20px_50px_rgba(5,113,194,0.22)] lg:-my-2'
                    : 'bg-white text-navy border border-navy-15 shadow-soft'
                }`}
              >
                {opt.featured && (
                  <div className="absolute -top-20 -right-20 w-56 h-56 blue-glow-strong pointer-events-none opacity-75" />
                )}

                <div className="relative z-10">
                  {/* Top Friendly Avatar Illustration + Optional Best Value Pill */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div
                      aria-hidden="true"
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${
                        opt.featured
                          ? 'bg-primary/25 border-primary text-white'
                          : 'bg-primary-50 border-primary-100 text-primary'
                      }`}
                    >
                      {opt.avatarCode === 'friend' && (
                        <svg className="w-9 h-9" viewBox="0 0 36 36" fill="none">
                          <circle
                            cx="18"
                            cy="12"
                            r="5.5"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          />
                          <path
                            d="M7 29C7 23.5 11.8 20 18 20C24.2 20 29 23.5 29 29"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M26 8L30 12M30 8L26 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      {opt.avatarCode === 'inhouse' && (
                        <svg className="w-9 h-9" viewBox="0 0 36 36" fill="none">
                          <circle
                            cx="18"
                            cy="11"
                            r="5.5"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          />
                          <path
                            d="M8 29C8 23.5 12.2 20 18 20C23.8 20 28 23.5 28 29"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                          <rect
                            x="15"
                            y="22"
                            width="6"
                            height="7"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                        </svg>
                      )}
                      {opt.avatarCode === 'webxcode' && (
                        <svg className="w-9 h-9" viewBox="0 0 36 36" fill="none">
                          <path
                            d="M18 4L30 9V17.5C30 25.2 24.8 30.8 18 33C11.2 30.8 6 25.2 6 17.5V9L18 4Z"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          />
                          <path
                            d="M13 18.5L16.5 22L23.5 14.5"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    {opt.badge && (
                      <span className="px-3.5 py-1 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                        {opt.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className={`text-[21px] sm:text-[23px] font-extrabold leading-snug ${
                      opt.featured ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {opt.title}
                  </h3>
                  <p
                    className={`mt-2 text-[14px] leading-relaxed ${
                      opt.featured ? 'text-white/80' : 'text-navy-70'
                    }`}
                  >
                    {opt.subtitle}
                  </p>

                  {/* 4 Animated Comparison Bars */}
                  <div className="mt-6 pt-5 border-t border-current/10 space-y-4">
                    {opt.bars.map((bar) => (
                      <div key={bar.label}>
                        <div className="flex items-center justify-between text-[12px] mb-1.5">
                          <span
                            className={`font-bold ${
                              opt.featured ? 'text-white' : 'text-navy'
                            }`}
                          >
                            {bar.label}
                          </span>
                          <span
                            className={`font-mono text-[11px] font-semibold ${
                              opt.featured ? 'text-primary-100' : 'text-navy-60'
                            }`}
                          >
                            {bar.displayText}
                          </span>
                        </div>

                        <div
                          className={`w-full h-2.5 rounded-full overflow-hidden ${
                            opt.featured ? 'bg-white/15' : 'bg-primary-50'
                          }`}
                        >
                          <motion.div
                            initial={
                              shouldReduceMotion ? { width: `${bar.scorePercent}%` } : { width: 0 }
                            }
                            whileInView={{ width: `${bar.scorePercent}%` }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.65, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              opt.featured ? 'bg-primary' : 'bg-navy/60'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* One-Line Verdict Box */}
                <div
                  className={`mt-7 p-4 rounded-2xl text-[13px] font-semibold leading-relaxed relative z-10 ${
                    opt.featured
                      ? 'bg-primary/20 border border-primary/50 text-white'
                      : 'bg-primary-50/60 border border-primary-100 text-navy'
                  }`}
                >
                  {opt.verdict}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — WHAT WE MANAGE: THE SERVER RACK (bg: #f0f7fd light blue)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50 border-b border-primary-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                10 MANAGED CAPABILITIES
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Everything IT, <span className="text-primary">Racked and Ready</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-xl leading-[1.65]">
              Click any of the 10 rack units below to slide out its drawer and inspect what we
              configure, monitor, and support for your team every month.
            </p>
          </div>

          {/* 12-Column Server Rack + Right Drawer Inspector Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Tall Navy Server Rack Frame with Mounting Holes & 10 Rack Units */}
            <div className="lg:col-span-7">
              <div className="rounded-[26px] bg-navy text-white p-4 sm:p-6 border-4 border-navy shadow-2xl relative">
                {/* Top Rack Chassis Header */}
                <div className="flex items-center justify-between px-3 pb-3.5 mb-3 border-b border-white/15 font-mono text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-extrabold text-white tracking-wider">
                      WEBXCODE-RACK-42U • 10 ACTIVE BLADES
                    </span>
                  </div>
                  <span className="text-primary-100">CLICK UNIT TO SLIDE OUT →</span>
                </div>

                {/* 10 Horizontal Rack Units */}
                <div className="space-y-2">
                  {SERVER_RACK_UNITS.map((unit) => {
                    const isPulledOut = unit.id === selectedRackUnitId;
                    return (
                      <div key={unit.id}>
                        <button
                          type="button"
                          aria-expanded={isPulledOut}
                          onClick={() => setSelectedRackUnitId(unit.id)}
                          onMouseEnter={() => setSelectedRackUnitId(unit.id)}
                          className={`w-full text-left rounded-xl p-3 sm:p-3.5 border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                            isPulledOut
                              ? 'bg-primary text-white border-white shadow-[0_8px_25px_rgba(5,113,194,0.65)] lg:translate-x-3'
                              : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border-white/15'
                          }`}
                        >
                          {/* Left Mounting Holes + Unit Number + Service Name */}
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                            {/* Rack Mounting Screw Holes */}
                            <div
                              aria-hidden="true"
                              className="flex flex-col gap-1.5 shrink-0 opacity-60"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-white/70 block" />
                              <span className="w-1.5 h-1.5 rounded-full bg-white/70 block" />
                            </div>

                            <span
                              className={`px-2 py-0.5 rounded font-mono text-[11px] font-extrabold shrink-0 ${
                                isPulledOut
                                  ? 'bg-navy text-primary-100'
                                  : 'bg-primary/25 text-primary-100'
                              }`}
                            >
                              {unit.unitNumber}
                            </span>

                            <span className="font-mono text-[13px] sm:text-[14px] font-bold truncate">
                              {unit.name}
                            </span>
                          </div>

                          {/* Right Blinking Blue LEDs + Short Code */}
                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              className={`hidden sm:inline font-mono text-[10px] font-bold ${
                                isPulledOut ? 'text-white/90' : 'text-white/50'
                              }`}
                            >
                              {unit.shortCode}
                            </span>

                            {/* 3 Blinking Blue/Navy LEDs */}
                            <div
                              aria-hidden="true"
                              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-navy/70 border border-white/10"
                            >
                              {unit.ledPattern.map((activeLed, i) => (
                                <span
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    activeLed
                                      ? 'bg-primary-100 shadow-[0_0_8px_#0571c2] animate-pulse'
                                      : 'bg-primary/40'
                                  }`}
                                />
                              ))}
                            </div>

                            {/* Right Mounting Screw Holes */}
                            <div
                              aria-hidden="true"
                              className="flex flex-col gap-1.5 shrink-0 opacity-60"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-white/70 block" />
                              <span className="w-1.5 h-1.5 rounded-full bg-white/70 block" />
                            </div>
                          </div>
                        </button>

                        {/* Mobile Inline Accordion Drawer when tapped on <lg screens */}
                        {isPulledOut && (
                          <div className="lg:hidden mt-2 p-4 rounded-xl bg-white text-navy border-2 border-primary shadow-md">
                            <div className="font-mono text-[10px] font-extrabold uppercase text-primary">
                              {unit.unitNumber} • {unit.specsTag}
                            </div>
                            <h3 className="text-[17px] font-extrabold text-navy mt-1">
                              {unit.name}
                            </h3>
                            <p className="mt-1.5 text-[13px] text-navy-70 leading-relaxed">
                              {unit.description}
                            </p>
                            <ul className="mt-3 space-y-2">
                              {unit.deliverables.map((deliv) => (
                                <li
                                  key={deliv}
                                  className="flex items-start gap-2 text-[12px] font-semibold text-navy"
                                >
                                  <Check
                                    className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5"
                                    strokeWidth={2.5}
                                  />
                                  <span>{deliv}</span>
                                </li>
                              ))}
                            </ul>
                            <button
                              type="button"
                              onClick={() =>
                                triggerQuoteModal(`Managed IT — ${unit.name}`)
                              }
                              className="mt-4 w-full py-2.5 px-4 rounded-full bg-primary text-white font-bold text-[13px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>Ask About This</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Rack Chassis Ventilation Bar */}
                <div
                  aria-hidden="true"
                  className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between font-mono text-[10px] text-white/50 px-2"
                >
                  <span>PSU-A: ONLINE • PSU-B: REDUNDANT</span>
                  <span>TEMP: 21°C OPTIMAL</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols (Desktop Sticky): Pulled-Out Rack Unit Detail Drawer */}
            <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRackUnit.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  aria-live="polite"
                  className="rounded-[26px] bg-white border-2 border-primary shadow-xl p-7"
                >
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-navy-08">
                    <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[11px] font-extrabold">
                      RACK DRAWER {activeRackUnit.unitNumber} PULLED OUT
                    </span>
                    <span className="font-mono text-[11px] font-bold text-primary">
                      {activeRackUnit.shortCode}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[22px] font-extrabold text-navy leading-snug">
                    {activeRackUnit.name}
                  </h3>

                  <p className="mt-2.5 text-[14px] sm:text-[15px] text-navy-70 leading-relaxed">
                    {activeRackUnit.description}
                  </p>

                  {/* 3 Deliverables with Blue Check */}
                  <div className="mt-6 pt-5 border-t border-navy-08">
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-3.5">
                      WHAT WE HANDLE IN THIS UNIT (3 ✓)
                    </div>
                    <ul className="space-y-3">
                      {activeRackUnit.deliverables.map((deliv) => (
                        <li
                          key={deliv}
                          className="p-3.5 rounded-xl bg-primary-50/60 border border-primary-100 flex items-start gap-3 text-[13px] sm:text-[14px] font-semibold text-navy"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          </span>
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specs Tag */}
                  <div className="mt-5 p-3 rounded-xl bg-navy text-white font-mono text-[11px] font-bold flex items-center justify-between">
                    <span className="text-white/65">PROTOCOL:</span>
                    <span className="text-primary-100">{activeRackUnit.specsTag}</span>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() =>
                      triggerQuoteModal(`Managed IT — ${activeRackUnit.name}`)
                    }
                    className="mt-6 w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-700 text-white font-bold text-[15px] inline-flex items-center justify-center gap-2 shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                  >
                    <span>Ask About This</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — TEAM SIZE ESTIMATOR (bg: #ffffff, id="team-estimator")
      ====================================================================== */}
      <section
        id="team-estimator"
        className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              INTERACTIVE COST CALCULATOR
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Simple, <span className="text-primary">Per-User Pricing</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Slide to match your team size and pick the IT pillars you want us to manage. Get
              an instant indicative monthly range—with zero hidden call-out fees.
            </p>
          </div>

          {/* Wide Estimator Card */}
          <div className="rounded-[28px] bg-primary-50/50 border-2 border-primary-100 p-6 sm:p-8 lg:p-10 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left 7 Cols: People Icon Row + Team Slider + Needs Checkbox Chips */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-7">
                {/* 1. People Icons Visual Row + Slider */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-navy-08">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <label
                      htmlFor="it-team-size-slider"
                      className="text-[15px] sm:text-[16px] font-extrabold text-navy"
                    >
                      How many people use computers in your team?
                    </label>
                    <span className="px-3.5 py-1 rounded-full bg-primary text-white font-mono text-[14px] font-extrabold">
                      {teamUsers} {teamUsers === 1 ? 'User' : 'Users'}
                    </span>
                  </div>

                  {/* Row of Small People Icons (max 30 shown + "+X more" badge) */}
                  <div
                    aria-hidden="true"
                    className="min-h-[56px] p-3.5 rounded-xl bg-primary-50/70 border border-primary-100 flex flex-wrap items-center gap-1.5 mb-4"
                  >
                    {Array.from({ length: 30 }, (_, idx) => {
                      const isCovered = idx < visibleIconsCount;
                      return (
                        <span
                          key={idx}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                            isCovered
                              ? 'bg-primary text-white shadow-2xs'
                              : 'bg-white text-navy-30 border border-navy-08'
                          }`}
                        >
                          <Users className="w-3.5 h-3.5" />
                        </span>
                      );
                    })}
                    {overflowUsersCount > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-navy text-white font-mono text-[11px] font-extrabold">
                        +{overflowUsersCount} more
                      </span>
                    )}
                  </div>

                  {/* Range Slider 1 - 100 */}
                  <input
                    id="it-team-size-slider"
                    type="range"
                    role="slider"
                    min={1}
                    max={100}
                    step={1}
                    value={teamUsers}
                    aria-label="How many people use computers in your team?"
                    aria-valuemin={1}
                    aria-valuemax={100}
                    aria-valuenow={teamUsers}
                    onChange={(e) => setTeamUsers(Number(e.target.value))}
                    className="w-full h-2.5 rounded-lg bg-primary-100 accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[11px] text-navy-50 mt-1.5">
                    <span>1 user</span>
                    <span>25 users</span>
                    <span>50 users</span>
                    <span>75 users</span>
                    <span>100 users</span>
                  </div>
                </div>

                {/* 2. Checkbox Chips: "What do you need?" */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-navy-08">
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="text-[15px] sm:text-[16px] font-extrabold text-navy">
                      What do you need managed?
                    </span>
                    <span className="font-mono text-[11px] font-bold text-primary">
                      {selectedNeeds.length} of {IT_ESTIMATOR_CONFIG.needs.length} selected
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {IT_ESTIMATOR_CONFIG.needs.map((need) => {
                      const isChecked = selectedNeeds.includes(need.id);
                      return (
                        <button
                          key={need.id}
                          type="button"
                          role="checkbox"
                          aria-checked={isChecked}
                          onClick={() => toggleEstimatorNeed(need.id)}
                          className={`px-4 py-2.5 rounded-full text-[13px] font-bold transition-all inline-flex items-center gap-2 cursor-pointer border ${
                            isChecked
                              ? 'bg-primary text-white border-primary shadow-xs'
                              : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              isChecked ? 'bg-white text-primary' : 'bg-navy-10 text-transparent'
                            }`}
                          >
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </span>
                          <span>{need.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Navy Glass Result Panel */}
              <div
                aria-live="polite"
                className="lg:col-span-5 rounded-[24px] bg-navy text-white border-2 border-primary p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-56 h-56 blue-glow-strong pointer-events-none opacity-70" />

                <div className="relative z-10">
                  {/* Top Bar: Label + Currency Toggle ₹ / $ */}
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/15">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                      RECOMMENDED IT PLAN
                    </span>

                    <div
                      role="group"
                      aria-label="Select Currency"
                      className="inline-flex items-center p-1 rounded-full bg-white/10 border border-white/15"
                    >
                      <button
                        type="button"
                        onClick={() => setEstCurrency('INR')}
                        className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold transition-all cursor-pointer ${
                          estCurrency === 'INR'
                            ? 'bg-primary text-white'
                            : 'text-white/75 hover:text-white'
                        }`}
                      >
                        ₹ INR
                      </button>
                      <button
                        type="button"
                        onClick={() => setEstCurrency('USD')}
                        className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold transition-all cursor-pointer ${
                          estCurrency === 'USD'
                            ? 'bg-primary text-white'
                            : 'text-white/75 hover:text-white'
                        }`}
                      >
                        $ USD
                      </button>
                    </div>
                  </div>

                  {/* Recommended Plan Pill & Title */}
                  <div className="mt-5">
                    <span className="px-3 py-1 rounded-full bg-primary/30 border border-primary/50 font-mono text-[11px] font-extrabold text-primary-100 uppercase">
                      {estimatorResult.recommendedPlan}
                    </span>

                    <div className="mt-4 text-[13px] text-white/70 font-medium">
                      Estimated Monthly Retainer ({teamUsers}{' '}
                      {teamUsers === 1 ? 'user' : 'users'})
                    </div>
                    <div className="font-mono text-[28px] sm:text-[34px] font-extrabold text-white tabular-nums leading-tight mt-1">
                      {estimatorResult.rangeText}
                      <span className="text-[14px] font-normal text-white/70"> / mo</span>
                    </div>

                    <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 font-mono text-[12px] font-bold text-primary-100">
                      <span>{estimatorResult.perUserText}</span>
                    </div>
                  </div>

                  {/* Selected Scope Summary */}
                  <div className="mt-6 pt-5 border-t border-white/15">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/60 mb-2.5">
                      INCLUDED IN YOUR ESTIMATE:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg bg-white/10 font-mono text-[11px] font-bold text-white">
                        {teamUsers} Covered {teamUsers === 1 ? 'Workstation' : 'Workstations'}
                      </span>
                      {IT_ESTIMATOR_CONFIG.needs
                        .filter((n) => selectedNeeds.includes(n.id))
                        .map((need) => (
                          <span
                            key={need.id}
                            className="px-2.5 py-1 rounded-lg bg-primary/30 border border-primary/50 text-[11px] font-semibold text-white"
                          >
                            + {need.label}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                {/* CTA + Disclaimer */}
                <div className="mt-8 pt-5 border-t border-white/15 relative z-10">
                  <button
                    type="button"
                    onClick={() =>
                      triggerQuoteModal(
                        `Managed IT Estimate — ${teamUsers} Users (${estimatorResult.recommendedPlan})`
                      )
                    }
                    className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-700 text-white font-bold text-[15px] inline-flex items-center justify-center gap-2 shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                  >
                    <span>Get an Exact Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="mt-3 text-[11px] text-white/65 leading-relaxed text-center">
                    Indicative estimate. Licenses (e.g. Microsoft 365, Google Workspace) are
                    billed as per provider pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ManagedItServices;
