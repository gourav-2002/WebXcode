'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Factory,
  Cog,
  Cpu,
  Package,
  Wrench,
  Layers,
  Globe,
  FileText,
  ShoppingCart,
  Search,
  Bot,
  Workflow,
  ShieldCheck,
  Download,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle2,
  Loader2,
  SlidersHorizontal,
  Boxes,
  Truck,
  Sparkles,
} from 'lucide-react';
import { industries, IndustryIcon } from '@/app/industries/_components/Industries';

const IMG_FACTORY =
  '/images/why_webxcode_team_office_1791104914357.jpg';
const IMG_PRODUCT_1 =
  '/images/project_fintech_saas_ui_1791104929193.jpg';
const IMG_PRODUCT_2 =
  '/images/project_ai_enterprise_ui_1791104952051.jpg';
const IMG_PRODUCT_3 =
  '/images/hero_laptop_ui_showcase_1791104898778.jpg';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT MANUFACTURING & INDUSTRIAL ITEM
============================================================================ */
const mfgIndustry =
  industries.find((item) => item.slug === 'manufacturing-industrial') ||
  industries[3];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS
============================================================================ */

/* Section 1: Hero Cycling RFQ Notifications */
const HERO_RFQ_ALERTS = [
  {
    code: 'RFQ-8841',
    title: 'New RFQ: 500 units · Germany',
    sub: 'Part #VLV-SS316-50 · Target CIF Hamburg',
  },
  {
    code: 'DOC-2094',
    title: 'Datasheet downloaded',
    sub: 'ISO 9001 & PED Certificate Pack · USA Buyer',
  },
  {
    code: 'SMP-5102',
    title: 'Sample request · UAE',
    sub: 'High-Pressure Flange Series · Dubai EPC Contractor',
  },
];

/* Section 2: Sectors We Serve — 8 Hex Bolt Grid Items */
const INDUSTRIAL_SECTORS = [
  {
    code: 'SEC-01',
    name: 'Machinery & Equipment',
    desc: 'Heavy machinery catalogs, 3D/CAD spec sheets, and turnkey line enquiry systems.',
    icon: Cog,
  },
  {
    code: 'SEC-02',
    name: 'Auto Components',
    desc: 'OEM/Tier-1 capability portals, IATF 16949 quality pages, and part-number search.',
    icon: Wrench,
  },
  {
    code: 'SEC-03',
    name: 'Chemicals & Plastics',
    desc: 'CAS-number searchable catalogs, MSDS/COA downloads, and bulk drum/IBC RFQ forms.',
    icon: Layers,
  },
  {
    code: 'SEC-04',
    name: 'Electrical & Electronics',
    desc: 'Parametric component filters, UL/CE compliance libraries, and distributor portals.',
    icon: Cpu,
  },
  {
    code: 'SEC-05',
    name: 'Packaging',
    desc: 'Custom box/film configurators, MOQ calculators, and sample kit request funnels.',
    icon: Package,
  },
  {
    code: 'SEC-06',
    name: 'Metal & Fabrication',
    desc: 'CNC, sheet-metal & casting capability matrices with drawing upload for instant RFQs.',
    icon: Factory,
  },
  {
    code: 'SEC-07',
    name: 'Textile Manufacturing',
    desc: 'GSM/weave digital swatch catalogs and private-label export enquiry pipelines.',
    icon: Boxes,
  },
  {
    code: 'SEC-08',
    name: 'Exporters & OEMs',
    desc: 'Multilingual country-targeted websites built to win international wholesale buyers.',
    icon: Truck,
  },
];

/* Section 3: What Buyers Check — Technical Datasheet Rows */
const DATASHEET_ROWS = [
  {
    code: 'REQ-01',
    requirement: 'Product range & specs online',
    whyNeed: 'To shortlist suppliers quickly',
    typical: 'PDF or "contact us" only',
    webxcode: 'Searchable catalog with spec pages',
  },
  {
    code: 'REQ-02',
    requirement: 'Downloadable datasheets & certifications',
    whyNeed: 'Technical and quality approval',
    typical: 'Missing or outdated',
    webxcode: 'One-click datasheet & certificate downloads',
  },
  {
    code: 'REQ-03',
    requirement: 'Manufacturing capability',
    whyNeed: 'Capacity and quality confidence',
    typical: 'A few factory photos',
    webxcode: 'Capabilities, machinery, QC process pages',
  },
  {
    code: 'REQ-04',
    requirement: 'Easy quote request',
    whyNeed: 'Fast comparison of suppliers',
    typical: 'Generic contact form',
    webxcode: 'Multi-product RFQ system',
  },
  {
    code: 'REQ-05',
    requirement: 'Fast, mobile-friendly site',
    whyNeed: 'Buyers browse on the go',
    typical: 'Slow, desktop-only',
    webxcode: 'Fast, responsive, SEO-ready',
  },
  {
    code: 'REQ-06',
    requirement: "Content in buyer's language",
    whyNeed: 'Export buyers',
    typical: 'English only (or nothing)',
    webxcode: 'Multilingual pages for target markets',
  },
];

/* Section 4: Services — 8 Assembly Line Stations (No Social Media Marketing) */
const ASSEMBLY_STATIONS = [
  {
    code: 'ST-01',
    title: 'Industrial Website Development',
    desc: 'Modern corporate site that shows capability, plant infrastructure and quality standards.',
    bullets: [
      'Plant tour, machinery list & QC lab showcase pages',
      'Sub-2s global load speed for overseas procurement teams',
      'Engineered mobile & desktop experience',
    ],
    icon: Factory,
  },
  {
    code: 'ST-02',
    title: 'Product Catalog & Spec Pages',
    desc: 'Filterable catalog, specs, dimensional drawings and one-click PDF datasheets.',
    bullets: [
      'Filter by category, material grade, pressure & size',
      'Auto-generated printable PDF spec sheets per SKU',
      'Easy admin dashboard to add 100s of products',
    ],
    icon: Layers,
  },
  {
    code: 'ST-03',
    title: 'RFQ / Quote Request System',
    desc: 'Multi-product quote cart with quantity steppers, custom drawing upload and specs.',
    bullets: [
      'Add multiple SKUs to a single consolidated RFQ cart',
      'Captures target quantity, incoterms (FOB/CIF) & destination',
      'Routes directly to your sales team on email & WhatsApp',
    ],
    icon: ShoppingCart,
  },
  {
    code: 'ST-04',
    title: 'B2B & Export SEO',
    desc: 'Rank for product + "manufacturer/supplier/exporter" searches in India and target countries.',
    bullets: [
      'Part-number, ASTM/DIN standard & industrial keyword SEO',
      'Country-specific landing pages for USA, Europe, UAE & Africa',
      'Product & Manufacturer JSON-LD structured schema',
    ],
    icon: Search,
  },
  {
    code: 'ST-05',
    title: 'Multilingual Websites',
    desc: 'Pages in buyer languages (German, Spanish, French, Arabic) for export markets.',
    bullets: [
      'Native technical terminology for industrial specs',
      'Automatic RTL layout support for Arabic/Middle East buyers',
      'International hreflang tags for regional Google engines',
    ],
    icon: Globe,
  },
  {
    code: 'ST-06',
    title: 'Google Ads for B2B Enquiries',
    desc: 'Search campaigns targeting high-intent industrial buyers, EPC contractors and importers.',
    bullets: [
      'Targets bulk/wholesale keywords ("bulk supplier", "OEM manufacturer")',
      'Negative keywords to block retail/single-piece consumers',
      'Dedicated RFQ landing pages with high conversion rates',
    ],
    icon: SlidersHorizontal,
  },
  {
    code: 'ST-07',
    title: 'CRM & Lead Automation',
    desc: 'Zoho / HubSpot integration, auto-assignment, WhatsApp & email follow-ups.',
    bullets: [
      'Zero manual data entry — every RFQ logs into your CRM',
      'Auto-assigns leads by territory or product line',
      'Automated 48-hour follow-up reminders for sales reps',
    ],
    icon: Workflow,
  },
  {
    code: 'ST-08',
    title: 'AI Product Assistant',
    desc: 'Chatbot that answers spec questions, recommends SKUs and collects RFQ details 24/7.',
    bullets: [
      'Trained on your PDF catalogs, tolerances & MOQ rules',
      'Handles buyer queries across time zones while you sleep',
      'Captures buyer email, company & quantity automatically',
    ],
    icon: Bot,
  },
];

/* Section 5: Product Catalog + RFQ Demo (8 Industrial Products) */
export interface DemoCatalogProduct {
  id: string;
  partNumber: string;
  name: string;
  category: 'Valves' | 'Pumps' | 'Fittings' | 'Flanges';
  material: 'SS 304' | 'SS 316' | 'Carbon Steel';
  sizeRange: 'DN15–DN50' | 'DN65–DN150' | 'DN200+';
  spec1: string;
  spec2: string;
  image: string;
}

const DEMO_PRODUCTS: DemoCatalogProduct[] = [
  {
    id: 'p1',
    partNumber: 'VLV-SS316-50',
    name: '3-Piece Trunnion Ball Valve',
    category: 'Valves',
    material: 'SS 316',
    sizeRange: 'DN15–DN50',
    spec1: 'Rating: PN40 / Class 300',
    spec2: 'Temp: -29°C to +220°C',
    image: IMG_PRODUCT_1,
  },
  {
    id: 'p2',
    partNumber: 'VLV-CS-100',
    name: 'Flanged Gate Valve API 600',
    category: 'Valves',
    material: 'Carbon Steel',
    sizeRange: 'DN65–DN150',
    spec1: 'Rating: Class 150–600',
    spec2: 'Standard: API 600 / ASME B16.34',
    image: IMG_PRODUCT_2,
  },
  {
    id: 'p3',
    partNumber: 'PMP-SS316-80',
    name: 'Centrifugal Chemical Process Pump',
    category: 'Pumps',
    material: 'SS 316',
    sizeRange: 'DN65–DN150',
    spec1: 'Flow: Up to 420 m³/h',
    spec2: 'Head: 110m · ISO 2858',
    image: IMG_PRODUCT_3,
  },
  {
    id: 'p4',
    partNumber: 'PMP-SS304-40',
    name: 'Multi-Stage High Pressure Booster Pump',
    category: 'Pumps',
    material: 'SS 304',
    sizeRange: 'DN15–DN50',
    spec1: 'Max Pressure: 25 Bar',
    spec2: 'Motor: IE4 High Efficiency',
    image: IMG_PRODUCT_1,
  },
  {
    id: 'p5',
    partNumber: 'FIT-SS316-25',
    name: 'High-Pressure Twin Ferrule Tube Fitting',
    category: 'Fittings',
    material: 'SS 316',
    sizeRange: 'DN15–DN50',
    spec1: 'Pressure: 6000 PSI',
    spec2: 'Thread: NPT / BSPT / Metric',
    image: IMG_PRODUCT_2,
  },
  {
    id: 'p6',
    partNumber: 'FIT-SS304-125',
    name: 'Seamless Butt-Weld 90° Elbow',
    category: 'Fittings',
    material: 'SS 304',
    sizeRange: 'DN65–DN150',
    spec1: 'Schedule: SCH 40 / SCH 80',
    spec2: 'Standard: ASME B16.9',
    image: IMG_PRODUCT_3,
  },
  {
    id: 'p7',
    partNumber: 'FLG-CS-250',
    name: 'Weld Neck Raised Face Flange',
    category: 'Flanges',
    material: 'Carbon Steel',
    sizeRange: 'DN200+',
    spec1: 'Size: DN200 to DN600',
    spec2: 'Standard: ANSI B16.5 / EN 1092-1',
    image: IMG_PRODUCT_1,
  },
  {
    id: 'p8',
    partNumber: 'FLG-SS316-200',
    name: 'Blind & Forged Orifice Flange Assembly',
    category: 'Flanges',
    material: 'SS 316',
    sizeRange: 'DN200+',
    spec1: 'Rating: Class 300 / 600',
    spec2: 'Cert: EN 10204 3.1 MTC',
    image: IMG_PRODUCT_2,
  },
];

/* Section 6: Go Global — Multilingual Switcher Translations */
const LANGUAGE_DEMOS: Record<
  'EN' | 'DE' | 'ES' | 'FR' | 'AR',
  {
    code: 'EN' | 'DE' | 'ES' | 'FR' | 'AR';
    langAttr: string;
    dir: 'ltr' | 'rtl';
    marketLabel: string;
    categoryTag: string;
    heading: string;
    productLabel: string;
    specLine: string;
    ctaText: string;
    datasheetText: string;
  }
> = {
  EN: {
    code: 'EN',
    langAttr: 'en',
    dir: 'ltr',
    marketLabel: 'Global / UK / USA (English)',
    categoryTag: 'INDUSTRIAL FLUID CONTROL // ISO 9001',
    heading: 'Precision Stainless Steel Ball Valves for Chemical Processing',
    productLabel: 'Series WX-316 · DN15 to DN150 (1/2" to 6")',
    specLine: 'Pressure Rating: PN40 / ANSI Class 300 · Zero-Leakage PTFE Seats',
    ctaText: 'Request Export Quote (RFQ) →',
    datasheetText: 'Download Technical Datasheet (PDF)',
  },
  DE: {
    code: 'DE',
    langAttr: 'de',
    dir: 'ltr',
    marketLabel: 'DACH / Germany (Deutsch)',
    categoryTag: 'INDUSTRIELLE ARMATUREN // DIN EN ISO 9001',
    heading: 'Präzisions-Edelstahl-Kugelhähne für die Chemieindustrie',
    productLabel: 'Baureihe WX-316 · Nennweite DN15 bis DN150',
    specLine: 'Druckstufe: PN40 / Klasse 300 · Leckagefreie PTFE-Dichtung',
    ctaText: 'Angebot anfordern (RFQ) →',
    datasheetText: 'Technisches Datenblatt herunterladen (PDF)',
  },
  ES: {
    code: 'ES',
    langAttr: 'es',
    dir: 'ltr',
    marketLabel: 'Spain & Latin America (Español)',
    categoryTag: 'CONTROL DE FLUIDOS INDUSTRIALES // ISO 9001',
    heading: 'Válvulas de Bola de Acero Inoxidable para Procesos Químicos',
    productLabel: 'Serie WX-316 · Diámetro DN15 a DN150',
    specLine: 'Presión Nominal: PN40 / Clase 300 · Sellado Hermético PTFE',
    ctaText: 'Solicitar Cotización (RFQ) →',
    datasheetText: 'Descargar Ficha Técnica (PDF)',
  },
  FR: {
    code: 'FR',
    langAttr: 'fr',
    dir: 'ltr',
    marketLabel: 'France & North/West Africa (Français)',
    categoryTag: 'ROBINETTERIE INDUSTRIELLE // ISO 9001',
    heading: 'Vannes à Boisseau Sphérique en Inox pour Génie Chimique',
    productLabel: 'Série WX-316 · Diamètre DN15 à DN150',
    specLine: 'Pression Nominale : PN40 / Classe 300 · Étanchéité PTFE',
    ctaText: 'Demander un Devis Export (RFQ) →',
    datasheetText: 'Télécharger la Fiche Technique (PDF)',
  },
  AR: {
    code: 'AR',
    langAttr: 'ar',
    dir: 'rtl',
    marketLabel: 'UAE / Saudi Arabia / MENA (العربية)',
    categoryTag: 'أنظمة التحكم في السوائل الصناعية // ISO 9001',
    heading: 'صمامات كروية من الفولاذ المقاوم للصدأ للمعالجة الكيميائية',
    productLabel: 'سلسلة WX-316 · المقاسات من DN15 إلى DN150',
    specLine: 'تصنيف الضغط: PN40 / الفئة 300 · مانع تسرب كامل',
    ctaText: '← طلب عرض سعر للتصدير (RFQ)',
    datasheetText: 'تحميل المواصفات الفنية (PDF)',
  },
};

/* Section 7: Lead Automation Workflow — 7 Nodes */
const WORKFLOW_NODES = [
  {
    id: 'ND-01',
    title: 'RFQ Received',
    short: 'Web / Catalog Cart',
    tooltip:
      'Buyer submits a multi-product RFQ or spec enquiry with quantities, destination country, and company details.',
  },
  {
    id: 'ND-02',
    title: 'Saved in CRM',
    short: 'Zoho / HubSpot / ERP',
    tooltip:
      'Enquiry is automatically logged in your CRM with full SKU list, part numbers, and source campaign tag.',
  },
  {
    id: 'ND-03',
    title: 'Auto-Assigned to Sales Rep',
    short: 'By Region / Product',
    tooltip:
      'Export enquiries route to your international desk; domestic RFQs route to the regional sales engineer.',
  },
  {
    id: 'ND-04',
    title: 'Instant WhatsApp & Email Ack',
    short: 'Within 30 Seconds',
    tooltip:
      'Buyer immediately receives an official acknowledgment with your company profile and requested datasheets.',
  },
  {
    id: 'ND-05',
    title: 'Follow-up Reminder (48 hrs)',
    short: 'Zero SLA Breach',
    tooltip:
      'If a quote is not sent within 48 hours, the system alerts the sales manager automatically.',
  },
  {
    id: 'ND-06',
    title: 'Quote Sent',
    short: 'Proforma / Commercial',
    tooltip:
      'Sales engineer sends the formal quotation and logs the value directly against the opportunity.',
  },
  {
    id: 'ND-07',
    title: 'Deal Tracked',
    short: 'Sample → PO Closed',
    tooltip:
      'Track conversion from RFQ to sample dispatch, technical approval, and final Purchase Order.',
  },
];

/* Section 8: Case Study — Quality Inspection Report */
const QC_CASE_STUDY = {
  reportId: 'Project WX-MFG-409',
  clientName: 'Apex Flow Controls Pvt. Ltd. (Placeholder)',
  sector: 'Industrial Valves & Process Instrumentation',
  markets: 'India, Germany, UAE, Saudi Arabia, Vietnam',
  duration: '7 Weeks (Catalog + Multilingual SEO)',
  inspectedItems: [
    'New website with plant & QC lab showcase',
    '250-product searchable catalog with PDF datasheets',
    'Multi-product RFQ cart system',
    'Export SEO for 3 target regions (EU, GCC, SEA)',
    'Zoho CRM & instant WhatsApp lead automation',
  ],
  results: [
    { value: '3.4x', label: 'RFQs per month (placeholder)' },
    { value: '14', label: 'New export countries (placeholder)' },
    { value: '−60%', label: 'Time to first response (placeholder)' },
  ],
};

/* Section 9: FAQ — Part-Number Accordion (Q-01 to Q-06) */
const MFG_FAQS = [
  {
    code: 'Q-01',
    question: 'We have 500+ products. Can you build the full catalog?',
    answer:
      'Yes. We structure large industrial catalogs with bulk CSV/Excel import support, parametric category filters (material grade, size, pressure rating, standard), part-number search, and automated PDF datasheet generation so buyers can find any SKU in seconds.',
  },
  {
    code: 'Q-02',
    question: 'Can buyers download datasheets and certificates?',
    answer:
      'Absolutely. Every product page can feature one-click downloads for technical datasheets, dimensional CAD drawings, MSDS sheets, and ISO / CE / API / UL quality certificates—either open-access or gated behind a quick work-email capture.',
  },
  {
    code: 'Q-03',
    question: 'Will the website help us get export enquiries?',
    answer:
      'Yes. We engineer international B2B SEO targeting country-specific buyer keywords (e.g., "stainless steel valve manufacturer India", "OEM auto component exporter"), set up multilingual pages with proper hreflang tags, and run export-focused Google Search campaigns.',
  },
  {
    code: 'Q-04',
    question:
      'Can you integrate with our ERP or CRM (Zoho, Tally, SAP, HubSpot)?',
    answer:
      'Yes. We connect your website’s RFQ cart and enquiry forms directly to Zoho CRM, HubSpot, Salesforce, or custom ERP webhooks so every incoming quote request is logged, assigned to the right sales engineer, and acknowledged via email and WhatsApp automatically.',
  },
  {
    code: 'Q-05',
    question: "We don't have good product photos. Can you help?",
    answer:
      'Yes. We can clean up existing factory and product photos, create crisp technical line diagrams and 3D CAD renders from your engineering drawings, and design standardized specification cards so your catalog looks world-class.',
  },
  {
    code: 'Q-06',
    question:
      'How much does an industrial website cost and how long does it take?',
    answer:
      'A modern B2B manufacturing website with a searchable product catalog and RFQ system typically starts from ₹85,000 ($1,100) and takes 5 to 8 weeks depending on the number of product categories, multilingual pages, and CRM integrations.',
  },
];

/* Section 10: Target Markets Chips for Audit Form */
const AUDIT_TARGET_MARKETS = [
  'India',
  'Middle East',
  'Europe',
  'USA',
  'Africa',
  'Southeast Asia',
];

/* ============================================================================
   MAIN MANUFACTURING & INDUSTRIAL PAGE COMPONENT
============================================================================ */
const ManufacturingIndustrial: React.FC<{
  onOpenQuoteModal?: (service?: string) => void;
}> = ({ onOpenQuoteModal: propOpenQuoteModal }) => {
  const quoteModalCtx = useQuoteModal();
  const onOpenQuoteModal = (service?: string) => {
    if (propOpenQuoteModal) propOpenQuoteModal(service);
    else quoteModalCtx.openQuoteModal(service);
  };
  const prefersReducedMotion = useReducedMotion();

  /* Section 1: Cycling Hero RFQ Alert Index */
  const [activeHeroAlertIdx, setActiveHeroAlertIdx] = useState<number>(0);

  /* Section 2: Active Hex Sector Code */
  const [activeSectorCode, setActiveSectorCode] = useState<string>('SEC-01');

  /* Section 4: Assembly Line Scroll Progress & Active Station */
  const assemblySectionRef = useRef<HTMLDivElement | null>(null);
  const [assemblyProgress, setAssemblyProgress] = useState<number>(0);
  const [activeStationIdx, setActiveStationIdx] = useState<number>(0);

  /* Section 5: Product Catalog + RFQ Cart Demo State */
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedSizeRange, setSelectedSizeRange] = useState<string>('All');
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [rfqCart, setRfqCart] = useState<Record<string, number>>({
    p1: 25,
  });
  const [rfqDrawerOpen, setRfqDrawerOpen] = useState<boolean>(false);
  const [datasheetToast, setDatasheetToast] = useState<string | null>(null);
  const [rfqForm, setRfqForm] = useState({
    company: '',
    email: '',
    country: 'Germany',
  });
  const [rfqErrors, setRfqErrors] = useState<{
    company?: string;
    email?: string;
    country?: string;
  }>({});
  const [rfqSubmitting, setRfqSubmitting] = useState<boolean>(false);
  const [rfqSubmittedSuccess, setRfqSubmittedSuccess] =
    useState<boolean>(false);
  const rfqCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  /* Section 6: Multilingual Switcher State */
  const [selectedLang, setSelectedLang] = useState<
    'EN' | 'DE' | 'ES' | 'FR' | 'AR'
  >('EN');

  /* Section 7: Active Automation Workflow Node */
  const [activeNodeId, setActiveNodeId] = useState<string>('ND-01');

  /* Section 9: FAQ Part-Number Accordion State */
  const [openFaqCode, setOpenFaqCode] = useState<string>('Q-01');

  /* Section 10: Free B2B Website Audit Form State */
  const [auditForm, setAuditForm] = useState({
    company: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    products: '',
    markets: ['India', 'Europe', 'Middle East'] as string[],
  });
  const [auditErrors, setAuditErrors] = useState<{
    company?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    website?: string;
    products?: string;
  }>({});
  const [auditSubmitting, setAuditSubmitting] = useState<boolean>(false);
  const [auditSuccess, setAuditSuccess] = useState<boolean>(false);

  /* SEO Meta & Document Title */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Websites, SEO & Lead Generation for Manufacturers & Exporters | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Modern B2B websites, searchable product catalogs, multi-product RFQ systems, multilingual export SEO and CRM automation for manufacturers, OEMs and exporters.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Cycle Hero RFQ Notifications */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveHeroAlertIdx((prev) => (prev + 1) % HERO_RFQ_ALERTS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  /* Scroll-Driven Assembly Line Calculation (Desktop, when reduced motion is off) */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleScroll = () => {
      if (!assemblySectionRef.current) return;
      const rect = assemblySectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;
      if (totalScrollable <= 0) return;

      const raw = -rect.top / totalScrollable;
      const clamped = Math.max(0, Math.min(1, raw));
      setAssemblyProgress(clamped);
      const stIdx = Math.min(
        ASSEMBLY_STATIONS.length - 1,
        Math.floor(clamped * ASSEMBLY_STATIONS.length)
      );
      setActiveStationIdx(stIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  /* Focus Trap & Escape Key for RFQ Drawer */
  useEffect(() => {
    if (!rfqDrawerOpen) return;
    rfqCloseBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setRfqDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [rfqDrawerOpen]);

  /* Filter Catalog Products */
  const filteredProducts = DEMO_PRODUCTS.filter((prod) => {
    const matchCat =
      selectedCategories.length === 0 ||
      selectedCategories.includes(prod.category);
    const matchMat =
      selectedMaterials.length === 0 ||
      selectedMaterials.includes(prod.material);
    const matchSize =
      selectedSizeRange === 'All' || prod.sizeRange === selectedSizeRange;
    const q = catalogSearch.trim().toLowerCase();
    const matchQuery =
      !q ||
      prod.name.toLowerCase().includes(q) ||
      prod.partNumber.toLowerCase().includes(q) ||
      prod.category.toLowerCase().includes(q) ||
      prod.material.toLowerCase().includes(q);

    return matchCat && matchMat && matchSize && matchQuery;
  });

  const toggleCategoryFilter = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleMaterialFilter = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const handleAddToRfq = (productId: string) => {
    setRfqSubmittedSuccess(false);
    setRfqCart((prev) => ({
      ...prev,
      [productId]: prev[productId] ? prev[productId] + 10 : 10,
    }));
  };

  const updateRfqQty = (productId: string, delta: number) => {
    setRfqCart((prev) => {
      const nextQty = (prev[productId] || 0) + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: nextQty };
    });
  };

  const rfqProductEntries = Object.entries(rfqCart)
    .map(([id, qty]) => {
      const product = DEMO_PRODUCTS.find((p) => p.id === id);
      return product ? { product, qty } : null;
    })
    .filter(Boolean) as { product: DemoCatalogProduct; qty: number }[];

  const totalRfqSkus = rfqProductEntries.length;

  /* Section 5 RFQ Drawer Submit Handler */
  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { company?: string; email?: string; country?: string } = {};
    if (!rfqForm.company.trim()) {
      errors.company = 'Please enter your company name.';
    }
    if (
      !rfqForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rfqForm.email.trim())
    ) {
      errors.email = 'Please enter a valid work email.';
    }
    if (!rfqForm.country.trim()) {
      errors.country = 'Please enter your destination country.';
    }
    setRfqErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setRfqSubmitting(true);
    // TODO: Connect multi-product RFQ submission to backend CRM/ERP webhook
    setTimeout(() => {
      setRfqSubmitting(false);
      setRfqSubmittedSuccess(true);
    }, 600);
  };

  /* Section 10 B2B Audit Form Submit Handler */
  const toggleAuditMarket = (market: string) => {
    setAuditForm((prev) => ({
      ...prev,
      markets: prev.markets.includes(market)
        ? prev.markets.filter((m) => m !== market)
        : [...prev.markets, market],
    }));
  };

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      company?: string;
      contactPerson?: string;
      email?: string;
      phone?: string;
      website?: string;
      products?: string;
    } = {};

    if (!auditForm.company.trim()) {
      errors.company = 'Company name is required.';
    }
    if (!auditForm.contactPerson.trim()) {
      errors.contactPerson = 'Contact person name is required.';
    }
    if (
      !auditForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(auditForm.email.trim())
    ) {
      errors.email = 'Valid work email is required.';
    }
    if (!auditForm.phone.trim() || auditForm.phone.trim().length < 7) {
      errors.phone = 'Valid phone number with country code is required.';
    }
    if (!auditForm.website.trim()) {
      errors.website = 'Website URL is required.';
    }
    if (!auditForm.products.trim()) {
      errors.products = 'Please specify your main products.';
    }

    setAuditErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setAuditSubmitting(true);
    // TODO: Connect B2B manufacturing website audit form to backend endpoint
    setTimeout(() => {
      setAuditSubmitting(false);
      setAuditSuccess(true);
    }, 650);
  };

  const currentLangData = LANGUAGE_DEMOS[selectedLang];
  const activeWorkflowNode =
    WORKFLOW_NODES.find((n) => n.id === activeNodeId) || WORKFLOW_NODES[0];
  const otherIndustries = industries.filter(
    (ind) => ind.slug !== 'manufacturing-industrial'
  );

  /* JSON-LD Structured Data (Service, BreadcrumbList, FAQPage) */
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Websites, SEO & Lead Generation for Manufacturers & Exporters',
      serviceType:
        'Industrial Website Development, Product Catalogs, RFQ Systems, Multilingual Export SEO & CRM Automation',
      audience: {
        '@type': 'Audience',
        audienceType: 'Manufacturers, industrial suppliers and exporters',
      },
      areaServed: ['India', 'US', 'Worldwide'],
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
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
          name: mfgIndustry.name,
          item: 'https://webxcode.com/industries/manufacturing-industrial',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: MFG_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <main className="bg-white text-navy overflow-x-hidden">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Technical Grid, Conveyor & Packet Keyframes (Strict #0571c2, #1e242e, #ffffff) */}
      <style>{`
        .mfg-tech-grid-dark {
          background-image:
            linear-gradient(to right, rgba(5, 113, 194, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(5, 113, 194, 0.14) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .mfg-dotted-canvas {
          background-image: radial-gradient(rgba(5, 113, 194, 0.24) 1.5px, transparent 1.5px);
          background-size: 22px 22px;
        }
        @keyframes mfgConveyorBoxes {
          0% { stroke-dashoffset: 48; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes mfgPacketFlow {
          0% { left: 4%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { left: 96%; opacity: 0; }
        }
        .mfg-conveyor-anim {
          animation: mfgConveyorBoxes 2.4s linear infinite;
        }
        .mfg-packet-dot {
          animation: mfgPacketFlow 4.5s linear infinite;
        }
        .mfg-hex-clip {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }
        @media (prefers-reduced-motion: reduce) {
          .mfg-conveyor-anim,
          .mfg-packet-dot {
            animation: none !important;
          }
        }
      `}</style>

      {/* ====================================================================
          1. HERO — FROM FACTORY FLOOR TO INBOX (navy — 50/50 split)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-16 lg:py-24 overflow-hidden mfg-tech-grid-dark">
        <div className="absolute -right-24 top-1/4 w-[580px] h-[580px] blue-glow-strong pointer-events-none" />
        <div className="absolute -left-24 bottom-0 w-[440px] h-[440px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 50% (6 cols) */}
            <div className="lg:col-span-6">
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
                  {mfgIndustry.name}
                </span>
              </nav>

              {/* Pill Label */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em]">
                  <Factory className="w-3.5 h-3.5 text-primary" />
                  <span>MANUFACTURING &amp; INDUSTRIAL</span>
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[34px] sm:text-[44px] lg:text-[50px] font-extrabold leading-[1.08] tracking-tight mb-5">
                Bring Your Factory Online and{' '}
                <span className="text-primary">Win More B2B Buyers</span>
              </h1>

              {/* Paragraph */}
              <p className="text-[16px] sm:text-[18px] text-white/75 leading-relaxed mb-8">
                We build modern websites, product catalogs and RFQ systems for
                manufacturers and exporters — so buyers in India and abroad can
                find your products, check specs and send enquiries 24/7.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#audit"
                  className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Get a Free B2B Website Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#catalog-demo"
                  className="px-7 py-4 rounded-full border border-white/25 hover:border-white hover:bg-white/10 text-white font-bold text-[15px] transition-all inline-flex items-center gap-2"
                >
                  <span>Try the Catalog Demo</span>
                </a>
              </div>

              {/* Spec-Style Monospace Stat Row */}
              <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-3 sm:gap-5">
                {[
                  { code: 'RFQ ↑ 3x', note: 'Placeholder' },
                  { code: 'EXPORT MARKETS 20+', note: 'Placeholder' },
                  { code: 'CATALOG 24/7', note: 'Online Specs' },
                ].map((stat) => (
                  <div
                    key={stat.code}
                    className="px-3.5 py-2 rounded-lg bg-white/5 border border-primary/40 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[12px] sm:text-[13px] font-bold text-white tracking-wider">
                      {stat.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 50% (6 cols): Isometric Factory-to-Monitor Conveyor Illustration */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[20px] bg-white/5 border border-primary/40 p-5 sm:p-7 backdrop-blur-xs shadow-2xl">
                {/* Top Technical Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 font-mono text-[11px] text-white/70">
                  <span>SYS // FACTORY-TO-INBOX PIPELINE</span>
                  <span className="inline-flex items-center gap-1.5 text-primary font-bold">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <span>LIVE TELEMETRY</span>
                  </span>
                </div>

                {/* Isometric SVG Line Illustration: Factory → Conveyor Belt → Digital Catalog Monitor */}
                <div className="relative bg-navy/90 rounded-[14px] border border-primary/30 p-4 overflow-hidden">
                  <svg
                    viewBox="0 0 560 250"
                    className="w-full h-auto"
                    role="img"
                    aria-label="Isometric illustration of a factory unit connected by a conveyor belt to a digital B2B product catalog monitor generating export RFQ notifications"
                  >
                    {/* Left: Isometric Factory Unit */}
                    <g stroke="#0571c2" strokeWidth="1.8" fill="rgba(5,113,194,0.12)">
                      {/* Factory Base & Sawtooth Roof */}
                      <polygon points="30,175 95,140 150,170 85,205" />
                      <polygon points="30,175 30,115 65,95 65,120 95,100 95,140" />
                      <polygon points="95,140 95,100 150,130 150,170" />
                      {/* Chimneys */}
                      <rect x="44" y="72" width="12" height="32" />
                      <rect x="72" y="64" width="12" height="38" />
                    </g>
                    <text
                      x="32"
                      y="225"
                      fill="#ffffff"
                      fontSize="10"
                      fontFamily="monospace"
                      letterSpacing="1"
                    >
                      01 // PLANT FLOOR
                    </text>

                    {/* Middle: Isometric Conveyor Track + Moving Product Boxes */}
                    <line
                      x1="145"
                      y1="155"
                      x2="330"
                      y2="120"
                      stroke="#ffffff"
                      strokeOpacity="0.3"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <line
                      x1="145"
                      y1="155"
                      x2="330"
                      y2="120"
                      stroke="#0571c2"
                      strokeWidth="3"
                      strokeDasharray="10 14"
                      className="mfg-conveyor-anim"
                    />
                    {/* 3 Isometric Product Crates on Conveyor */}
                    <g fill="#0571c2" stroke="#ffffff" strokeWidth="1.2">
                      <rect x="175" y="134" width="22" height="18" rx="2" />
                      <rect x="230" y="124" width="22" height="18" rx="2" />
                      <rect x="285" y="114" width="22" height="18" rx="2" />
                    </g>
                    <text
                      x="192"
                      y="182"
                      fill="#0571c2"
                      fontSize="10"
                      fontFamily="monospace"
                      letterSpacing="1"
                    >
                      02 // DIGITAL CATALOG
                    </text>

                    {/* Right: Large Monitor Showing Product Spec Page */}
                    <g>
                      <rect
                        x="335"
                        y="35"
                        width="195"
                        height="135"
                        rx="8"
                        fill="#1e242e"
                        stroke="#0571c2"
                        strokeWidth="2.2"
                      />
                      <rect
                        x="347"
                        y="49"
                        width="70"
                        height="55"
                        rx="4"
                        fill="rgba(5,113,194,0.22)"
                        stroke="#0571c2"
                        strokeWidth="1.2"
                      />
                      <line
                        x1="428"
                        y1="56"
                        x2="512"
                        y2="56"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <line
                        x1="428"
                        y1="70"
                        x2="495"
                        y2="70"
                        stroke="#0571c2"
                        strokeWidth="2"
                      />
                      <line
                        x1="428"
                        y1="84"
                        x2="505"
                        y2="84"
                        stroke="#ffffff"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                      />
                      {/* "+ Add to RFQ" Button Inside Monitor */}
                      <rect
                        x="347"
                        y="118"
                        width="168"
                        height="32"
                        rx="16"
                        fill="#0571c2"
                      />
                      <text
                        x="386"
                        y="138"
                        fill="#ffffff"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        + SEND B2B RFQ
                      </text>
                      {/* Monitor Stand */}
                      <rect
                        x="420"
                        y="170"
                        width="26"
                        height="20"
                        fill="#0571c2"
                      />
                      <rect
                        x="395"
                        y="190"
                        width="76"
                        height="6"
                        rx="3"
                        fill="#ffffff"
                        fillOpacity="0.6"
                      />
                    </g>
                    <text
                      x="365"
                      y="225"
                      fill="#ffffff"
                      fontSize="10"
                      fontFamily="monospace"
                      letterSpacing="1"
                    >
                      03 // 24/7 BUYER INBOX
                    </text>
                  </svg>
                </div>

                {/* Popping Glass RFQ Notification Chips */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/60 px-1">
                    <span>INCOMING EXPORT &amp; OEM ENQUIRIES:</span>
                    <span>AUTO-SYNCED TO CRM</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {HERO_RFQ_ALERTS.map((alert, idx) => {
                      const isActive = activeHeroAlertIdx === idx;
                      return (
                        <div
                          key={alert.code}
                          onClick={() => setActiveHeroAlertIdx(idx)}
                          className={`rounded-xl p-3 border transition-all cursor-pointer ${
                            isActive
                              ? 'bg-primary/25 border-primary text-white shadow-lg -translate-y-0.5'
                              : 'bg-white/5 border-white/10 text-white/75 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between font-mono text-[10px] mb-1">
                            <span className="text-primary font-bold">
                              {alert.code}
                            </span>
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isActive ? 'bg-primary' : 'bg-white/30'
                              }`}
                            />
                          </div>
                          <div className="text-[12px] font-extrabold text-white leading-snug">
                            {alert.title}
                          </div>
                          <div className="text-[11px] text-white/65 truncate mt-0.5">
                            {alert.sub}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. SECTORS WE SERVE — HEX BOLT GRID (white — 8 interlocking tiles)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              SECTORS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Built for <span className="text-primary">Industrial Businesses</span>
            </h2>
          </div>

          {/* 2-Col Mobile / 4-Col Desktop Honeycomb Hex Bolt Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {INDUSTRIAL_SECTORS.map((sec, idx) => {
              const Icon = sec.icon;
              const isSelected = activeSectorCode === sec.code;
              const isOffsetRow = idx >= 4;
              return (
                <button
                  key={sec.code}
                  type="button"
                  aria-pressed={isSelected}
                  onMouseEnter={() => setActiveSectorCode(sec.code)}
                  onClick={() => setActiveSectorCode(sec.code)}
                  className={`group relative text-left rounded-[20px] p-5 sm:p-7 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[210px] sm:min-h-[230px] focus:outline-none focus:ring-2 focus:ring-primary ${
                    isOffsetRow ? 'lg:translate-x-4' : ''
                  } ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-xl -translate-y-1'
                      : 'bg-white hover:bg-primary text-navy hover:text-white border-navy/20 hover:border-primary shadow-soft'
                  }`}
                >
                  {/* Decorative Bolt-Head Hexagon Icon Frame */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`w-12 h-12 mfg-hex-clip flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-white text-primary'
                          : 'bg-primary-50 text-primary group-hover:bg-white group-hover:text-primary'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`w-3 h-3 rounded-full border-2 ${
                        isSelected
                          ? 'bg-white border-white'
                          : 'border-navy/30 group-hover:border-white'
                      }`}
                    />
                  </div>

                  <div>
                    <h3
                      className={`text-[16px] sm:text-[18px] font-extrabold leading-snug mb-2 transition-colors ${
                        isSelected
                          ? 'text-white'
                          : 'text-navy group-hover:text-white'
                      }`}
                    >
                      {sec.name}
                    </h3>
                    <p
                      className={`text-[12px] sm:text-[13px] leading-relaxed transition-colors ${
                        isSelected
                          ? 'text-white/90'
                          : 'text-navy-70 group-hover:text-white/90'
                      }`}
                    >
                      {sec.desc}
                    </p>
                  </div>

                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between font-mono text-[11px] font-bold ${
                      isSelected
                        ? 'border-white/25 text-white'
                        : 'border-navy-08 text-primary group-hover:border-white/25 group-hover:text-white'
                    }`}
                  >
                    <span>{sec.code}</span>
                    <span>HEX // SPEC</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. WHAT BUYERS CHECK — TECHNICAL DATASHEET (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              BUYER REALITY
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              What B2B Buyers Check{' '}
              <span className="text-primary">Before They Call You</span>
            </h2>
          </div>

          {/* Technical Datasheet Document Container with Edge Measurement Ticks */}
          <div className="relative bg-white rounded-[16px] border-2 border-navy shadow-xl overflow-hidden">
            {/* Top Ruler / Measurement Ticks Strip */}
            <div
              aria-hidden="true"
              className="px-4 py-2 bg-navy text-white flex items-center justify-between font-mono text-[10px] tracking-widest"
            >
              <span>SCALE 1:1 // B2B PROCUREMENT EVALUATION MATRIX</span>
              <span className="hidden sm:inline text-primary">
                丨 10 丨 20 丨 30 丨 40 丨 50 丨 60 丨 70 丨 80 丨 90 丨 100 MM
              </span>
            </div>

            {/* Desktop Specification Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-navy bg-primary-50/50">
                    <th
                      scope="col"
                      className="py-4 px-5 font-mono text-[11px] font-bold uppercase tracking-wider text-navy-50"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="py-4 px-5 text-[14px] font-extrabold text-navy"
                    >
                      Requirement
                    </th>
                    <th
                      scope="col"
                      className="py-4 px-5 text-[14px] font-extrabold text-navy"
                    >
                      Why buyers need it
                    </th>
                    <th
                      scope="col"
                      className="py-4 px-5 text-[14px] font-extrabold text-navy-70"
                    >
                      Typical factory website
                    </th>
                    <th
                      scope="col"
                      className="py-4 px-5 text-[14px] font-extrabold text-primary bg-primary-50 border-l border-primary/25"
                    >
                      WebXCode website
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-08">
                  {DATASHEET_ROWS.map((row) => (
                    <tr
                      key={row.code}
                      className="hover:bg-primary-50/20 transition-colors"
                    >
                      <td className="py-4 px-5 font-mono text-[12px] font-bold text-primary">
                        {row.code}
                      </td>
                      <th
                        scope="row"
                        className="py-4 px-5 text-[15px] font-extrabold text-navy"
                      >
                        {row.requirement}
                      </th>
                      <td className="py-4 px-5 text-[14px] text-navy-70 font-medium">
                        {row.whyNeed}
                      </td>
                      <td className="py-4 px-5 text-[14px] text-navy-50">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-navy-08 text-navy-50 flex items-center justify-center shrink-0">
                            <X className="w-3.5 h-3.5" />
                          </span>
                          <span>{row.typical}</span>
                        </span>
                      </td>
                      <td className="py-4 px-5 text-[14px] font-bold text-navy bg-primary-50/70 border-l border-primary/25">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </span>
                          <span>{row.webxcode}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Requirement Cards */}
            <div className="md:hidden p-4 space-y-4">
              {DATASHEET_ROWS.map((row) => (
                <div
                  key={row.code}
                  className="rounded-xl border border-navy-15 p-4 space-y-2.5 bg-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-primary bg-primary-50 px-2.5 py-0.5 rounded-xs">
                      {row.code}
                    </span>
                    <span className="text-[12px] font-semibold text-navy-50">
                      {row.whyNeed}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-extrabold text-navy">
                    {row.requirement}
                  </h3>
                  <div className="pt-2 border-t border-navy-08 space-y-2 text-[13px]">
                    <div className="flex items-center gap-2 text-navy-50">
                      <X className="w-4 h-4 shrink-0" />
                      <span>Typical: {row.typical}</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-primary bg-primary-50 p-2 rounded-lg">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>WebXCode: {row.webxcode}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom-Right Engineering Drawing Title Block */}
            <div className="border-t-2 border-navy bg-primary-50/40 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] font-bold text-navy">
              <span>TOLERANCE: ZERO LOST ENQUIRIES · QA VERIFIED</span>
              <span className="px-3 py-1 bg-navy text-white rounded-xs">
                DOC: WX-MFG-BUYER-CHECK · REV: 2026 · SHEET 1/1
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. SERVICES — ASSEMBLY LINE (white — scroll-driven on desktop)
      ==================================================================== */}
      <section
        ref={assemblySectionRef}
        className={`bg-white border-b border-navy-08 ${
          prefersReducedMotion ? 'py-[72px] lg:py-[112px]' : 'lg:h-[230vh] py-[72px] lg:py-0'
        }`}
      >
        <div
          className={
            prefersReducedMotion
              ? 'max-w-[1280px] mx-auto px-4 sm:px-6'
              : 'lg:sticky lg:top-[84px] lg:h-[calc(100vh-84px)] flex flex-col justify-center overflow-hidden'
          }
        >
          <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                  WHAT WE BUILD
                </span>
                <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                  Your Complete{' '}
                  <span className="text-primary">Digital Production Line</span>
                </h2>
              </div>

              {/* Station Selector Pills + Keyboard Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-navy-50 mr-1">
                  ACTIVE STATION: ST-0{activeStationIdx + 1} / 08
                </span>
                <button
                  type="button"
                  aria-label="Previous assembly station"
                  onClick={() => {
                    const nextIdx = Math.max(0, activeStationIdx - 1);
                    setActiveStationIdx(nextIdx);
                    setAssemblyProgress(nextIdx / (ASSEMBLY_STATIONS.length - 1));
                  }}
                  className="w-9 h-9 rounded-full border border-navy-15 hover:border-primary text-navy hover:text-primary flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next assembly station"
                  onClick={() => {
                    const nextIdx = Math.min(
                      ASSEMBLY_STATIONS.length - 1,
                      activeStationIdx + 1
                    );
                    setActiveStationIdx(nextIdx);
                    setAssemblyProgress(nextIdx / (ASSEMBLY_STATIONS.length - 1));
                  }}
                  className="w-9 h-9 rounded-full border border-navy-15 hover:border-primary text-navy hover:text-primary flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Overhead Conveyor Track Bar */}
          <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 mb-4">
            <div className="h-2 rounded-full bg-primary-50 overflow-hidden border border-primary-100">
              <div
                style={{
                  width: `${Math.max(12.5, ((activeStationIdx + 1) / 8) * 100)}%`,
                }}
                className="h-full bg-primary transition-all duration-300"
              />
            </div>
          </div>

          {/* Desktop Scroll-Driven Horizontal Conveyor Track */}
          <div className="hidden lg:block max-w-[1280px] w-full mx-auto px-4 sm:px-6 overflow-hidden">
            <div
              style={{
                transform: prefersReducedMotion
                  ? 'none'
                  : `translateX(-${assemblyProgress * 56}%)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="flex gap-6 w-max py-2"
            >
              {ASSEMBLY_STATIONS.map((st, idx) => {
                const Icon = st.icon;
                const isStationActive = idx === activeStationIdx;
                return (
                  <article
                    key={st.code}
                    onMouseEnter={() => setActiveStationIdx(idx)}
                    onFocus={() => setActiveStationIdx(idx)}
                    tabIndex={0}
                    className={`w-[360px] shrink-0 rounded-[20px] p-6 border-2 transition-all duration-300 flex flex-col justify-between focus:outline-none ${
                      isStationActive
                        ? 'bg-white border-primary shadow-xl -translate-y-1'
                        : 'bg-primary-50/35 border-navy-15 hover:border-primary'
                    }`}
                  >
                    <div>
                      {/* Station Light Header */}
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-08">
                        <span className="font-mono text-[12px] font-extrabold text-primary bg-primary-50 px-3 py-1 rounded-md border border-primary-100">
                          {st.code}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              isStationActive
                                ? 'bg-primary ring-4 ring-primary/25'
                                : 'bg-navy/25'
                            }`}
                          />
                          <span
                            className={
                              isStationActive ? 'text-primary' : 'text-navy-50'
                            }
                          >
                            {isStationActive ? 'ONLINE' : 'STANDBY'}
                          </span>
                        </span>
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-navy text-white flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>

                      <h3 className="text-[20px] font-extrabold text-navy mb-2">
                        {st.title}
                      </h3>
                      <p className="text-[14px] text-navy-70 leading-relaxed mb-5">
                        {st.desc}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {st.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-[13px] font-semibold text-navy"
                          >
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenQuoteModal(st.title)}
                      className="pt-3 border-t border-navy-08 flex items-center justify-between text-[13px] font-extrabold text-primary hover:underline cursor-pointer"
                    >
                      <span>Configure Station {st.code}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Mobile / Tablet Normal Horizontal Swipe Carousel (No Scroll-Jacking) */}
          <div className="lg:hidden px-4 sm:px-6 flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {ASSEMBLY_STATIONS.map((st, idx) => {
              const Icon = st.icon;
              const isStationActive = idx === activeStationIdx;
              return (
                <article
                  key={st.code}
                  onClick={() => setActiveStationIdx(idx)}
                  className={`w-[300px] sm:w-[340px] shrink-0 rounded-[20px] p-6 border-2 flex flex-col justify-between ${
                    isStationActive
                      ? 'bg-white border-primary shadow-lg'
                      : 'bg-white border-navy-15'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-08">
                      <span className="font-mono text-[12px] font-bold text-primary bg-primary-50 px-2.5 py-0.5 rounded-xs">
                        {st.code}
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-navy text-white flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-[18px] font-extrabold text-navy mb-2">
                      {st.title}
                    </h3>
                    <p className="text-[13px] text-navy-70 leading-relaxed mb-4">
                      {st.desc}
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {st.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-[12px] font-semibold text-navy"
                        >
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(st.title)}
                    className="pt-3 border-t border-navy-08 flex items-center justify-between text-[13px] font-extrabold text-primary cursor-pointer"
                  >
                    <span>Discuss {st.code}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. PRODUCT CATALOG + RFQ DEMO (navy — id="catalog-demo")
      ==================================================================== */}
      <section
        id="catalog-demo"
        className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden mfg-tech-grid-dark"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              TRY IT
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight mb-3">
              A Catalog That <span className="text-primary">Generates RFQs</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-white/75">
              This is the kind of catalog we build — try filtering products and
              adding them to a quote request.
            </p>
          </div>

          {/* Large White "App Window" Card */}
          <div className="bg-white text-navy rounded-[24px] border-2 border-primary/40 shadow-2xl overflow-hidden">
            {/* Top Bar: Search Input + Live RFQ Cart Button */}
            <div className="px-5 sm:px-7 py-4 bg-primary-50/70 border-b border-navy-15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  aria-label="Search catalog by part number, product name or material"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="Search SKU (e.g. VLV-SS316-50, Valves, SS 316)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-navy-15 text-[13px] font-medium text-navy focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3">
                {datasheetToast && (
                  <span className="font-mono text-[11px] font-bold text-primary bg-white px-3 py-1.5 rounded-full border border-primary/30">
                    {datasheetToast}
                  </span>
                )}

                <div aria-live="polite" className="sr-only">
                  {totalRfqSkus} products in RFQ cart
                </div>

                <button
                  type="button"
                  onClick={() => setRfqDrawerOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-navy hover:bg-primary text-white font-bold text-[13px] transition-colors inline-flex items-center gap-2.5 cursor-pointer shadow-md"
                >
                  <ShoppingCart className="w-4 h-4 text-primary" />
                  <span>RFQ Cart</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[12px] font-extrabold tabular-nums">
                    {totalRfqSkus}
                  </span>
                </button>
              </div>
            </div>

            {/* Catalog Body: Left Sidebar Filters (3 cols) + Right Product Grid (9 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Sidebar Filters */}
              <aside
                aria-label="Product catalog filters"
                className="lg:col-span-3 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-navy-15 bg-primary-50/25 space-y-6"
              >
                {/* Category Checkboxes */}
                <div>
                  <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-3">
                    01 // CATEGORY
                  </h3>
                  <div className="space-y-2">
                    {(['Valves', 'Pumps', 'Fittings', 'Flanges'] as const).map(
                      (cat) => {
                        const checked = selectedCategories.includes(cat);
                        return (
                          <label
                            key={cat}
                            className="flex items-center gap-2.5 text-[13px] font-bold text-navy cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleCategoryFilter(cat)}
                              className="w-4 h-4 rounded accent-primary cursor-pointer"
                            />
                            <span>{cat}</span>
                          </label>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Material Checkboxes */}
                <div>
                  <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-3">
                    02 // MATERIAL GRADE
                  </h3>
                  <div className="space-y-2">
                    {(['SS 304', 'SS 316', 'Carbon Steel'] as const).map(
                      (mat) => {
                        const checked = selectedMaterials.includes(mat);
                        return (
                          <label
                            key={mat}
                            className="flex items-center gap-2.5 text-[13px] font-bold text-navy cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleMaterialFilter(mat)}
                              className="w-4 h-4 rounded accent-primary cursor-pointer"
                            />
                            <span>{mat}</span>
                          </label>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Size Range Chips */}
                <div>
                  <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-3">
                    03 // NOMINAL SIZE
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {(['All', 'DN15–DN50', 'DN65–DN150', 'DN200+'] as const).map(
                      (sz) => {
                        const active = selectedSizeRange === sz;
                        return (
                          <button
                            key={sz}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setSelectedSizeRange(sz)}
                            className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-colors cursor-pointer ${
                              active
                                ? 'bg-primary text-white'
                                : 'bg-white border border-navy-15 text-navy hover:border-primary'
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedMaterials([]);
                    setSelectedSizeRange('All');
                    setCatalogSearch('');
                  }}
                  className="text-[12px] font-bold text-primary hover:underline cursor-pointer"
                >
                  Reset All Filters
                </button>
              </aside>

              {/* Right 8-Product Grid */}
              <div className="lg:col-span-9 p-5 sm:p-6">
                {filteredProducts.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-[16px] font-bold text-navy mb-2">
                      No matching industrial SKUs found.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedMaterials([]);
                        setSelectedSizeRange('All');
                        setCatalogSearch('');
                      }}
                      className="px-5 py-2 rounded-full bg-primary text-white text-[13px] font-bold cursor-pointer"
                    >
                      Show All 8 Products
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((prod) => {
                      const inCartQty = rfqCart[prod.id] || 0;
                      return (
                        <div
                          key={prod.id}
                          className="rounded-[16px] border border-navy-15 hover:border-primary bg-white p-4 flex flex-col justify-between shadow-2xs transition-all"
                        >
                          <div>
                            <div className="relative h-28 rounded-xl overflow-hidden bg-navy mb-3">
                              <img
                                src={prod.image}
                                alt={`${prod.name} (${prod.partNumber})`}
                                loading="lazy"
                                className="w-full h-full object-cover opacity-85"
                              />
                              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-xs bg-navy/90 text-white font-mono text-[10px] font-bold">
                                {prod.material}
                              </span>
                            </div>

                            <div className="font-mono text-[11px] font-bold text-primary mb-0.5">
                              {prod.partNumber}
                            </div>
                            <h4 className="text-[14px] font-extrabold text-navy leading-snug mb-2">
                              {prod.name}
                            </h4>

                            <div className="space-y-1 text-[11px] text-navy-70 font-medium mb-3">
                              <div>• {prod.spec1}</div>
                              <div>• {prod.spec2}</div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-navy-08 space-y-2">
                            <button
                              type="button"
                              onClick={() =>
                                setDatasheetToast(
                                  `Datasheet ${prod.partNumber}.pdf ready`
                                )
                              }
                              className="w-full text-left font-mono text-[11px] font-bold text-navy-50 hover:text-primary flex items-center justify-between cursor-pointer"
                            >
                              <span>Datasheet ↓</span>
                              <Download className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleAddToRfq(prod.id)}
                              className={`w-full py-2 px-3 rounded-lg font-bold text-[12px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                inCartQty > 0
                                  ? 'bg-primary-50 text-primary border border-primary'
                                  : 'bg-primary hover:bg-primary-dark text-white'
                              }`}
                            >
                              {inCartQty > 0 ? (
                                <>
                                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                  <span>Added ({inCartQty} pcs)</span>
                                </>
                              ) : (
                                <span>+ Add to RFQ</span>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Below the Window Prompt */}
          <p className="mt-6 text-center text-[15px] text-white/80">
            Want this for your products?{' '}
            <a
              href="#audit"
              className="font-extrabold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Get a Free B2B Website Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </p>
        </div>

        {/* RFQ Side Drawer Modal (role="dialog") */}
        <AnimatePresence>
          {rfqDrawerOpen && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="rfq-drawer-title"
              className="fixed inset-0 z-50 flex justify-end bg-navy/75 backdrop-blur-xs"
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-md bg-white text-navy h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-navy-15">
                    <div>
                      <span className="font-mono text-[11px] font-bold text-primary block">
                        MULTI-PRODUCT QUOTE REQUEST
                      </span>
                      <h3
                        id="rfq-drawer-title"
                        className="text-[20px] font-extrabold text-navy"
                      >
                        Your RFQ Cart ({totalRfqSkus})
                      </h3>
                    </div>
                    <button
                      ref={rfqCloseBtnRef}
                      type="button"
                      aria-label="Close RFQ Cart"
                      onClick={() => setRfqDrawerOpen(false)}
                      className="w-9 h-9 rounded-full bg-primary-50 text-navy hover:bg-primary hover:text-white flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {rfqSubmittedSuccess ? (
                    <div className="py-10 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-[22px] font-extrabold text-navy">
                        RFQ sent!
                      </h4>
                      <p className="text-[14px] text-navy-70">
                        Typical response within 24 hours. Your multi-SKU quote
                        request has been logged for{' '}
                        <strong>{rfqForm.company}</strong> ({rfqForm.country}).
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setRfqSubmittedSuccess(false);
                          setRfqDrawerOpen(false);
                        }}
                        className="px-6 py-2.5 rounded-full bg-primary text-white text-[13px] font-bold cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Selected Products List with Quantity Steppers */}
                      <div className="space-y-3 mb-6">
                        {rfqProductEntries.length === 0 ? (
                          <p className="text-[13px] text-navy-50 py-4 text-center">
                            No products in your RFQ cart yet. Click &ldquo;+ Add
                            to RFQ&rdquo; on any product.
                          </p>
                        ) : (
                          rfqProductEntries.map(({ product, qty }) => (
                            <div
                              key={product.id}
                              className="p-3.5 rounded-xl bg-primary-50/50 border border-primary-100 flex items-center justify-between gap-3"
                            >
                              <div>
                                <div className="font-mono text-[11px] font-bold text-primary">
                                  {product.partNumber}
                                </div>
                                <div className="text-[13px] font-extrabold text-navy">
                                  {product.name}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  aria-label={`Decrease quantity for ${product.name}`}
                                  onClick={() => updateRfqQty(product.id, -10)}
                                  className="w-7 h-7 rounded-md bg-white border border-navy-15 flex items-center justify-center font-bold cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="font-mono text-[12px] font-bold w-12 text-center tabular-nums">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  aria-label={`Increase quantity for ${product.name}`}
                                  onClick={() => updateRfqQty(product.id, 10)}
                                  className="w-7 h-7 rounded-md bg-white border border-navy-15 flex items-center justify-center font-bold cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Short Buyer Form */}
                      <form
                        onSubmit={handleRfqSubmit}
                        noValidate
                        className="space-y-3.5 pt-4 border-t border-navy-15"
                      >
                        <div>
                          <label
                            htmlFor="rfq-company"
                            className="block font-mono text-[11px] font-bold text-navy mb-1"
                          >
                            COMPANY NAME *
                          </label>
                          <input
                            id="rfq-company"
                            type="text"
                            value={rfqForm.company}
                            onChange={(e) =>
                              setRfqForm({ ...rfqForm, company: e.target.value })
                            }
                            placeholder="Thyssen Flow GmbH"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-navy-15 text-[13px]"
                          />
                          {rfqErrors.company && (
                            <p className="text-[11px] text-primary font-semibold mt-1">
                              {rfqErrors.company}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="rfq-email"
                            className="block font-mono text-[11px] font-bold text-navy mb-1"
                          >
                            WORK EMAIL *
                          </label>
                          <input
                            id="rfq-email"
                            type="email"
                            value={rfqForm.email}
                            onChange={(e) =>
                              setRfqForm({ ...rfqForm, email: e.target.value })
                            }
                            placeholder="procurement@company.de"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-navy-15 text-[13px]"
                          />
                          {rfqErrors.email && (
                            <p className="text-[11px] text-primary font-semibold mt-1">
                              {rfqErrors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="rfq-country"
                            className="block font-mono text-[11px] font-bold text-navy mb-1"
                          >
                            DESTINATION COUNTRY *
                          </label>
                          <input
                            id="rfq-country"
                            type="text"
                            value={rfqForm.country}
                            onChange={(e) =>
                              setRfqForm({ ...rfqForm, country: e.target.value })
                            }
                            placeholder="Germany / UAE / USA"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-navy-15 text-[13px]"
                          />
                          {rfqErrors.country && (
                            <p className="text-[11px] text-primary font-semibold mt-1">
                              {rfqErrors.country}
                            </p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={rfqSubmitting || totalRfqSkus === 0}
                          className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {rfqSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Sending RFQ...</span>
                            </>
                          ) : (
                            <>
                              <span>Send RFQ</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* ====================================================================
          6. GO GLOBAL — EXPORT & MULTILINGUAL SHOWCASE (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 45% (5 cols) */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                EXPORT GROWTH
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-4">
                Win Buyers in{' '}
                <span className="text-primary">20+ Export Markets</span>
              </h2>
              <p className="text-[16px] text-navy-70 leading-relaxed mb-6">
                Overseas importers and EPC procurement teams search in their own
                language and local standards. We build multilingual,
                export-ready industrial pages that rank in Germany, the Middle
                East, Europe, the US, Africa and Latin America.
              </p>

              {/* 4 Export Capability Bullet Points */}
              <ul className="space-y-3.5 mb-8">
                {[
                  'Country-specific landing pages',
                  'Multilingual product pages (EN, DE, ES, FR, AR)',
                  'International SEO (hreflang, local keywords)',
                  'Export enquiry forms with incoterms / MOQ / port fields',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span className="text-[15px] font-bold text-navy">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#audit"
                className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 shadow-md"
              >
                <span>Plan Your Export Website</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right 55% (7 cols) — Interactive Multilingual Switcher + World Map SVG */}
            <div className="lg:col-span-7">
              <div className="rounded-[24px] border-2 border-navy-15 bg-primary-50/35 p-6 sm:p-8 shadow-lg">
                {/* Language Switcher Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-navy-15">
                  <div>
                    <span className="font-mono text-[11px] font-bold text-primary uppercase tracking-wider block">
                      LIVE MULTILINGUAL SPEC PREVIEW
                    </span>
                    <span className="text-[13px] font-bold text-navy-70">
                      Target Region: {currentLangData.marketLabel}
                    </span>
                  </div>

                  {/* 5 Language Buttons */}
                  <div
                    role="group"
                    aria-label="Select preview language"
                    className="flex flex-wrap items-center gap-1.5"
                  >
                    {(['EN', 'DE', 'ES', 'FR', 'AR'] as const).map((code) => {
                      const active = selectedLang === code;
                      return (
                        <button
                          key={code}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSelectedLang(code)}
                          className={`px-3.5 py-2 rounded-lg font-mono text-[12px] font-extrabold transition-all cursor-pointer ${
                            active
                              ? 'bg-primary text-white shadow-xs'
                              : 'bg-white text-navy border border-navy-15 hover:border-primary'
                          }`}
                        >
                          {code}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preview Card with Dynamic lang & dir="rtl" for AR */}
                <div
                  lang={currentLangData.langAttr}
                  dir={currentLangData.dir}
                  className="rounded-2xl bg-white border border-primary/30 p-6 shadow-sm mb-6 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-xs bg-primary-50 text-primary font-mono text-[11px] font-bold">
                      {currentLangData.categoryTag}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-navy-50">
                      hreflang=&quot;{currentLangData.langAttr}&quot;
                    </span>
                  </div>

                  <h3 className="text-[20px] sm:text-[22px] font-extrabold text-navy leading-snug mb-2">
                    {currentLangData.heading}
                  </h3>

                  <div className="font-mono text-[13px] font-bold text-primary mb-2">
                    {currentLangData.productLabel}
                  </div>

                  <p className="text-[14px] text-navy-70 font-medium mb-5">
                    {currentLangData.specLine}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-navy-08">
                    <a
                      href="#audit"
                      className="px-5 py-2.5 rounded-full bg-primary text-white text-[13px] font-bold"
                    >
                      {currentLangData.ctaText}
                    </a>
                    <span className="px-4 py-2 rounded-full bg-primary-50 text-navy font-mono text-[12px] font-bold">
                      {currentLangData.datasheetText}
                    </span>
                  </div>
                </div>

                {/* Minimal World Map Outline SVG with Export Route Arcs from India */}
                <div className="rounded-2xl bg-navy p-4 sm:p-5 text-white relative overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/70 mb-2">
                    <span>EXPORT CORRIDOR TELEMETRY // ORIGIN: INDIA (IN)</span>
                    <span className="text-primary font-bold">
                      EU · MENA · USA · AFRICA · SEA
                    </span>
                  </div>

                  <svg
                    viewBox="0 0 680 220"
                    className="w-full h-36 sm:h-44"
                    role="img"
                    aria-label="Export routes from India to Europe, Middle East, USA, Africa and Southeast Asia"
                  >
                    {/* Subtle Grid Lines */}
                    <line
                      x1="0"
                      y1="55"
                      x2="680"
                      y2="55"
                      stroke="rgba(255,255,255,0.08)"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1="0"
                      y1="110"
                      x2="680"
                      y2="110"
                      stroke="rgba(255,255,255,0.08)"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1="0"
                      y1="165"
                      x2="680"
                      y2="165"
                      stroke="rgba(255,255,255,0.08)"
                      strokeDasharray="3 3"
                    />

                    {/* Simplified Continental Landmass Silhouettes */}
                    {/* North & South America */}
                    <path
                      d="M65,40 L145,35 L165,85 L130,115 L165,145 L150,195 L115,185 L95,120 L55,75 Z"
                      fill="rgba(255,255,255,0.08)"
                      stroke="rgba(255,255,255,0.18)"
                    />
                    {/* Europe & Africa */}
                    <path
                      d="M300,32 L385,28 L400,72 L365,92 L395,135 L365,192 L320,180 L295,115 L285,68 Z"
                      fill="rgba(255,255,255,0.08)"
                      stroke="rgba(255,255,255,0.18)"
                    />
                    {/* Asia & India & SEA */}
                    <path
                      d="M405,35 L585,32 L615,95 L565,155 L485,140 L455,105 L415,95 Z"
                      fill="rgba(255,255,255,0.08)"
                      stroke="rgba(255,255,255,0.18)"
                    />

                    {/* Curved Export Shipping / Inquiry Arcs from India (470, 108) */}
                    {/* India -> Europe (340, 56) */}
                    <path
                      d="M470,108 Q410,32 340,56"
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="2.2"
                      strokeDasharray="5 4"
                    />
                    {/* India -> Middle East (410, 92) */}
                    <path
                      d="M470,108 Q440,82 410,92"
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="2.2"
                    />
                    {/* India -> USA (125, 68) */}
                    <path
                      d="M470,108 Q295,10 125,68"
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="2"
                      strokeDasharray="5 4"
                    />
                    {/* India -> East/West Africa (355, 148) */}
                    <path
                      d="M470,108 Q415,145 355,148"
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    {/* India -> Southeast Asia (548, 128) */}
                    <path
                      d="M470,108 Q515,102 548,128"
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="2.2"
                    />

                    {/* Destination Nodes */}
                    {[
                      { x: 125, y: 68, label: 'USA' },
                      { x: 340, y: 56, label: 'EU / DE' },
                      { x: 410, y: 92, label: 'UAE / GCC' },
                      { x: 355, y: 148, label: 'AFRICA' },
                      { x: 548, y: 128, label: 'SEA' },
                    ].map((pt) => (
                      <g key={pt.label}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="4.5"
                          fill="#ffffff"
                          stroke="#0571c2"
                          strokeWidth="2.5"
                        />
                        <text
                          x={pt.x}
                          y={pt.y - 9}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {pt.label}
                        </text>
                      </g>
                    ))}

                    {/* Origin Hub: INDIA (470, 108) */}
                    <circle
                      cx="470"
                      cy="108"
                      r="9"
                      fill="rgba(5, 113, 194, 0.35)"
                    />
                    <circle
                      cx="470"
                      cy="108"
                      r="5"
                      fill="#0571c2"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x="470"
                      y="128"
                      textAnchor="middle"
                      fill="#0571c2"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      INDIA FACTORY HUB
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. LEAD AUTOMATION — HOW ENQUIRIES REACH YOUR SALES TEAM (primary-50)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px] border-b border-navy-08 mfg-dotted-canvas">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              NO LOST ENQUIRIES
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              Every RFQ Tracked From{' '}
              <span className="text-primary">Website to Order</span>
            </h2>
            <p className="text-[16px] text-navy-70">
              Click or hover any node in the pipeline below to inspect how we
              automate your B2B sales follow-up.
            </p>
          </div>

          {/* Connected Workflow Diagram (Horizontal on Desktop, Vertical on Mobile) */}
          <div className="relative bg-white rounded-[24px] border-2 border-navy-15 p-6 sm:p-8 shadow-md">
            {/* Desktop Animated Packet Track Line */}
            <div className="hidden lg:block relative h-1.5 bg-primary-50 rounded-full mb-8 mx-8 overflow-hidden">
              <div className="h-full w-full bg-primary/25" />
              <span
                className="mfg-packet-dot absolute top-1/2 -translate-y-1/2 w-8 h-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
            </div>

            {/* 7 Workflow Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3.5">
              {WORKFLOW_NODES.map((node, index) => {
                const isSelected = activeNodeId === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveNodeId(node.id)}
                    onMouseEnter={() => setActiveNodeId(node.id)}
                    aria-pressed={isSelected}
                    className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-navy text-white border-primary shadow-md -translate-y-0.5'
                        : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span
                          className={`font-mono text-[11px] font-extrabold px-2 py-0.5 rounded-xs ${
                            isSelected
                              ? 'bg-primary text-white'
                              : 'bg-white text-primary border border-primary-100'
                          }`}
                        >
                          {node.id}
                        </span>
                        <span
                          className={`font-mono text-[10px] font-bold ${
                            isSelected ? 'text-white/70' : 'text-navy-50'
                          }`}
                        >
                          0{index + 1}/07
                        </span>
                      </div>

                      <h3
                        className={`text-[14px] font-extrabold leading-snug mb-1 ${
                          isSelected ? 'text-white' : 'text-navy'
                        }`}
                      >
                        {node.title}
                      </h3>
                    </div>

                    <div
                      className={`font-mono text-[11px] font-semibold pt-2 border-t ${
                        isSelected
                          ? 'text-primary border-white/15'
                          : 'text-navy-50 border-navy-08'
                      }`}
                    >
                      {node.short}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Node Detail Readout Box */}
            <div className="mt-6 pt-5 border-t border-navy-15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-primary-50/60 rounded-xl p-4">
              <div className="flex items-start sm:items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-primary text-white font-mono text-[12px] font-extrabold shrink-0">
                  {activeWorkflowNode.id} · {activeWorkflowNode.title}
                </span>
                <p className="text-[14px] font-semibold text-navy">
                  {activeWorkflowNode.tooltip}
                </p>
              </div>
              <span className="font-mono text-[11px] font-bold text-primary shrink-0">
                SLA STATUS: AUTOMATED ✓
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. CASE STUDY — QUALITY INSPECTION REPORT (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              VERIFIED OUTCOME
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Quality Inspection <span className="text-primary">Report</span>
            </h2>
          </div>

          {/* Bordered QC Inspection Report Card */}
          <div className="rounded-[24px] border-2 border-navy bg-white shadow-xl overflow-hidden">
            {/* Report Header Bar */}
            <div className="bg-navy text-white px-6 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4 border-b-2 border-primary">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-mono text-[11px] font-bold text-primary uppercase tracking-wider">
                    QUALITY INSPECTION REPORT · {QC_CASE_STUDY.reportId}
                  </div>
                  <h3 className="text-[18px] sm:text-[20px] font-extrabold text-white">
                    B2B Catalog &amp; Export Lead System Audit
                  </h3>
                </div>
              </div>

              {/* Stamp-Style Badge */}
              <span className="px-4 py-1.5 rounded-xs border-2 border-primary bg-primary/20 text-white font-mono text-[12px] font-extrabold tracking-widest uppercase">
                STATUS: VERIFIED
              </span>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-navy-15 border-b border-navy-15 bg-primary-50/40">
              <div className="p-4 sm:p-5">
                <span className="font-mono text-[10px] font-bold text-navy-50 uppercase block mb-1">
                  CLIENT (PLACEHOLDER)
                </span>
                <span className="text-[14px] font-extrabold text-navy">
                  {QC_CASE_STUDY.clientName}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <span className="font-mono text-[10px] font-bold text-navy-50 uppercase block mb-1">
                  INDUSTRIAL SECTOR
                </span>
                <span className="text-[14px] font-extrabold text-navy">
                  {QC_CASE_STUDY.sector}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <span className="font-mono text-[10px] font-bold text-navy-50 uppercase block mb-1">
                  TARGET MARKETS
                </span>
                <span className="text-[14px] font-extrabold text-navy">
                  {QC_CASE_STUDY.markets}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <span className="font-mono text-[10px] font-bold text-navy-50 uppercase block mb-1">
                  PROJECT DURATION
                </span>
                <span className="text-[14px] font-extrabold text-primary font-mono">
                  {QC_CASE_STUDY.duration}
                </span>
              </div>
            </div>

            {/* Two-Column Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-navy-15">
              {/* Left: Scope Delivered Checklist */}
              <div className="lg:col-span-6 p-6 sm:p-8">
                <div className="font-mono text-[11px] font-extrabold text-primary uppercase tracking-wider mb-4">
                  SECTION A // SCOPE DELIVERED &amp; INSPECTED
                </div>
                <ul className="space-y-3.5">
                  {QC_CASE_STUDY.inspectedItems.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 p-3 rounded-xl bg-primary-50/50 border border-primary-100"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <div>
                        <span className="font-mono text-[11px] font-bold text-primary block">
                          CHK-0{i + 1} · PASSED
                        </span>
                        <span className="text-[14px] font-bold text-navy">
                          {item}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Measured Results (3 Big Monospace Stat Boxes) */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-primary-50/20">
                <div>
                  <div className="font-mono text-[11px] font-extrabold text-primary uppercase tracking-wider mb-4">
                    SECTION B // MEASURED PERFORMANCE OUTPUT
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {QC_CASE_STUDY.results.map((res) => (
                      <div
                        key={res.label}
                        className="rounded-2xl bg-white border-2 border-primary/30 p-5 text-center shadow-xs"
                      >
                        <div className="font-mono text-[30px] sm:text-[34px] font-extrabold text-primary leading-none mb-2 tabular-nums">
                          {res.value}
                        </div>
                        <div className="text-[12px] font-bold text-navy-70 leading-snug">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Row */}
                <div className="pt-5 border-t border-navy-15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-[12px] font-bold text-navy-70">
                    INSPECTED BY: WEBXCODE INDUSTRIAL DIVISION
                  </span>
                  <Link
                    href="/our-work"
                    className="inline-flex items-center gap-2 font-extrabold text-[14px] text-primary hover:underline"
                  >
                    <span>See More B2B Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. FAQ — PART-NUMBER ACCORDION (primary-50)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[920px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              TECHNICAL FAQ
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Frequently Asked{' '}
              <span className="text-primary">Questions</span>
            </h2>
          </div>

          {/* Part-Number Accordion List */}
          <div className="space-y-3.5">
            {MFG_FAQS.map((faq) => {
              const isOpen = openFaqCode === faq.code;
              return (
                <div
                  key={faq.code}
                  className={`rounded-2xl border-2 transition-all overflow-hidden bg-white ${
                    isOpen ? 'border-primary shadow-md' : 'border-navy-15'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenFaqCode(isOpen ? '' : faq.code)
                    }
                    className="w-full px-5 sm:px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`font-mono text-[12px] font-extrabold px-2.5 py-1 rounded-md shrink-0 ${
                          isOpen
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {faq.code}
                      </span>
                      <span className="text-[16px] sm:text-[17px] font-extrabold text-navy">
                        {faq.question}
                      </span>
                    </div>

                    <span className="w-8 h-8 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-navy-08">
                      <p className="text-[15px] text-navy-70 leading-relaxed pl-0 sm:pl-14">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. FINAL CTA — RFQ-STYLE AUDIT REQUEST FORM (navy — id="audit")
      ==================================================================== */}
      <section
        id="audit"
        className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden mfg-tech-grid-dark"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 45% (5 cols) */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                FREE B2B WEBSITE AUDIT
              </span>

              <h2 className="text-[30px] sm:text-[38px] lg:text-[42px] font-extrabold text-white leading-[1.12] tracking-tight mb-4">
                Find Out Why Buyers Aren&apos;t Sending Enquiries
              </h2>

              <p className="text-[16px] text-white/75 leading-relaxed mb-8">
                Our industrial web engineers will inspect your current website,
                catalog structure and export SEO—and send you a clear action
                plan.
              </p>

              {/* What We'll Check List */}
              <div className="rounded-2xl bg-white/5 border border-white/15 p-6 mb-6">
                <div className="font-mono text-[11px] font-bold text-primary uppercase tracking-wider mb-4">
                  WHAT WE&apos;LL CHECK IN 48 HOURS:
                </div>
                <ul className="space-y-3.5">
                  {[
                    'Product catalog & spec page review',
                    'RFQ / enquiry flow check',
                    'B2B & export keyword opportunities',
                    'Page speed & mobile usability',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <span className="text-[15px] font-bold text-white">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="font-mono text-[12px] text-white/70">
                ⚡ Free audit delivered in 48 hours · No obligation
              </div>
            </div>

            {/* Right 55% (7 cols) — White Card Styled Like an Official RFQ Form */}
            <div className="lg:col-span-7">
              <div className="rounded-[24px] bg-white text-navy border-2 border-primary/40 shadow-2xl overflow-hidden">
                {/* Official RFQ Form Header */}
                <div className="bg-primary-50/80 px-6 sm:px-8 py-4 border-b border-navy-15 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="font-mono text-[12px] font-extrabold text-navy">
                      FORM // WX-AUDIT-REQ-2026
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-primary bg-white px-2.5 py-1 rounded-xs border border-primary/25">
                    PRIORITY: B2B MANUFACTURING
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  {auditSuccess ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>
                      <h3 className="text-[24px] font-extrabold text-navy">
                        Audit Request Logged!
                      </h3>
                      <p className="text-[15px] text-navy-70 max-w-md mx-auto">
                        Thank you, <strong>{auditForm.contactPerson}</strong>.
                        We have queued the B2B website &amp; export SEO audit
                        for <strong>{auditForm.company}</strong> and will send
                        your report within 48 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => setAuditSuccess(false)}
                        className="px-6 py-3 rounded-full bg-primary text-white font-bold text-[14px] cursor-pointer"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleAuditSubmit}
                      noValidate
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="audit-company"
                            className="block font-mono text-[11px] font-extrabold text-navy uppercase mb-1.5"
                          >
                            Company Name *
                          </label>
                          <input
                            id="audit-company"
                            type="text"
                            value={auditForm.company}
                            onChange={(e) =>
                              setAuditForm({
                                ...auditForm,
                                company: e.target.value,
                              })
                            }
                            placeholder="Precision Valves & Controls Ltd."
                            className="w-full px-4 py-3 rounded-xl border border-navy-15 text-[14px] text-navy focus:outline-none focus:border-primary"
                          />
                          {auditErrors.company && (
                            <p className="text-[12px] text-primary font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{auditErrors.company}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="audit-person"
                            className="block font-mono text-[11px] font-extrabold text-navy uppercase mb-1.5"
                          >
                            Contact Person *
                          </label>
                          <input
                            id="audit-person"
                            type="text"
                            value={auditForm.contactPerson}
                            onChange={(e) =>
                              setAuditForm({
                                ...auditForm,
                                contactPerson: e.target.value,
                              })
                            }
                            placeholder="Rajesh Mehta (Director / Sales Head)"
                            className="w-full px-4 py-3 rounded-xl border border-navy-15 text-[14px] text-navy focus:outline-none focus:border-primary"
                          />
                          {auditErrors.contactPerson && (
                            <p className="text-[12px] text-primary font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{auditErrors.contactPerson}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="audit-email"
                            className="block font-mono text-[11px] font-extrabold text-navy uppercase mb-1.5"
                          >
                            Work Email *
                          </label>
                          <input
                            id="audit-email"
                            type="email"
                            value={auditForm.email}
                            onChange={(e) =>
                              setAuditForm({
                                ...auditForm,
                                email: e.target.value,
                              })
                            }
                            placeholder="export@yourfactory.com"
                            className="w-full px-4 py-3 rounded-xl border border-navy-15 text-[14px] text-navy focus:outline-none focus:border-primary"
                          />
                          {auditErrors.email && (
                            <p className="text-[12px] text-primary font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{auditErrors.email}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="audit-phone"
                            className="block font-mono text-[11px] font-extrabold text-navy uppercase mb-1.5"
                          >
                            Phone (with country code) *
                          </label>
                          <input
                            id="audit-phone"
                            type="tel"
                            value={auditForm.phone}
                            onChange={(e) =>
                              setAuditForm({
                                ...auditForm,
                                phone: e.target.value,
                              })
                            }
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3 rounded-xl border border-navy-15 text-[14px] text-navy focus:outline-none focus:border-primary"
                          />
                          {auditErrors.phone && (
                            <p className="text-[12px] text-primary font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{auditErrors.phone}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="audit-website"
                            className="block font-mono text-[11px] font-extrabold text-navy uppercase mb-1.5"
                          >
                            Website URL *
                          </label>
                          <input
                            id="audit-website"
                            type="url"
                            value={auditForm.website}
                            onChange={(e) =>
                              setAuditForm({
                                ...auditForm,
                                website: e.target.value,
                              })
                            }
                            placeholder="https://www.yourfactory.com"
                            className="w-full px-4 py-3 rounded-xl border border-navy-15 text-[14px] text-navy focus:outline-none focus:border-primary"
                          />
                          {auditErrors.website && (
                            <p className="text-[12px] text-primary font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{auditErrors.website}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="audit-products"
                            className="block font-mono text-[11px] font-extrabold text-navy uppercase mb-1.5"
                          >
                            Main Products *
                          </label>
                          <input
                            id="audit-products"
                            type="text"
                            value={auditForm.products}
                            onChange={(e) =>
                              setAuditForm({
                                ...auditForm,
                                products: e.target.value,
                              })
                            }
                            placeholder="e.g. Industrial Valves, CNC Parts, Packaging"
                            className="w-full px-4 py-3 rounded-xl border border-navy-15 text-[14px] text-navy focus:outline-none focus:border-primary"
                          />
                          {auditErrors.products && (
                            <p className="text-[12px] text-primary font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{auditErrors.products}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Target Markets Chips */}
                      <div>
                        <span className="block font-mono text-[11px] font-extrabold text-navy uppercase mb-2">
                          Target Markets (Select all that apply)
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {AUDIT_TARGET_MARKETS.map((market) => {
                            const selected =
                              auditForm.markets.includes(market);
                            return (
                              <button
                                key={market}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => toggleAuditMarket(market)}
                                className={`px-3.5 py-2 rounded-full text-[12px] font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                                  selected
                                    ? 'bg-primary text-white shadow-2xs'
                                    : 'bg-primary-50/60 text-navy border border-navy-15 hover:border-primary'
                                }`}
                              >
                                {selected && <Check className="w-3.5 h-3.5" />}
                                <span>{market}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={auditSubmitting}
                          className="w-full py-4 px-7 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-60"
                        >
                          {auditSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Generating Audit Ticket...</span>
                            </>
                          ) : (
                            <>
                              <span>Request My Free B2B Audit</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. EXPLORE OTHER INDUSTRIES — COMPACT FOOTER NAV (white)
      ==================================================================== */}
      <section className="bg-white py-14 border-t border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                INDUSTRY SOLUTIONS DIRECTORY
              </span>
              <h2 className="text-[22px] font-extrabold text-navy">
                Explore Other Industries We Serve
              </h2>
            </div>
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-[14px] font-extrabold text-primary hover:underline"
            >
              <span>View All 12 Industries</span>
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
                    : ind.slug === 'finance-fintech'
                    ? '/industries/finance-fintech'
                    : ind.slug === 'interior-design-architecture'
                    ? '/industries/interior-design-architecture'
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
                className="shrink-0 px-4 py-2.5 rounded-full border border-navy-15 hover:border-primary hover:bg-primary-50 text-navy hover:text-primary text-[13px] font-bold transition-all inline-flex items-center gap-2"
              >
                <IndustryIcon
                  name={ind.icon}
                  className="w-4 h-4 text-primary"
                />
                <span>{ind.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ManufacturingIndustrial;

