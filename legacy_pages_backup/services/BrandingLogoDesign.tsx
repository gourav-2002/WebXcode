import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Award,
  Layers,
  Sparkles,
  Grid,
  Type,
  Palette,
  Compass,
  PenTool,
  Eye,
  ShieldCheck,
  Briefcase,
  Package,
  Globe,
  Smartphone,
  CreditCard,
  BookOpen,
  Copy,
  CheckCircle2,
  Maximize2,
  Sliders,
} from 'lucide-react';
import { services } from '../Services';

/* ============================================================================
   TYPES & INTERFACES — BRANDING & LOGO DESIGN (PART 1: SECTIONS 1–4)
============================================================================ */

export interface BrandingLogoDesignProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

type StudioDirectionId = 'minimal-tech' | 'bold-modern' | 'editorial-luxury' | 'friendly-consumer';

interface StudioBrandDirection {
  id: StudioDirectionId;
  tabLabel: string;
  archetypeTag: string;
  sampleBrandName: string;
  sampleTagline: string;
  industryFit: string;
  fontFamilyCss: string;
  fontDisplayLabel: string;
  fontBodyLabel: string;
  fontPairRatio: string;
  swatches: {
    role: 'Primary' | 'Secondary' | 'Accent' | 'Light' | 'Dark';
    name: string;
    hex: string;
    pantoneCode: string;
    textOnSwatch: string;
  }[];
  gridSpec: {
    ratioLabel: string;
    clearSpaceRule: string;
    minimumDigitalSize: string;
    cornerRadiusToken: string;
  };
  packagingSubtitle: string;
  socialHandle: string;
}

interface BrandSituationCard {
  id: string;
  code: string;
  situationTitle: string;
  whoItDescribes: string;
  painPoint: string;
  recommendedScope: string;
  typicalTimeline: string;
  coreDeliverables: string[];
  outcomePromise: string;
}

interface IdentityLayerItem {
  id: string;
  layerNum: string;
  title: string;
  subtitle: string;
  categoryBadge: string;
  whyItMatters: string;
  deliverablesList: string[];
  specimenType:
    | 'positioning-board'
    | 'logo-lockups'
    | 'color-swatches'
    | 'typography-scale'
    | 'graphic-motifs'
    | 'brand-book';
  craftNote: string;
}

/* ============================================================================
   STATIC DATA — SECTION 1: INTERACTIVE BRAND IDENTITY STUDIO BOARD (4 DIRECTIONS)
============================================================================ */

const STUDIO_DIRECTIONS: StudioBrandDirection[] = [
  {
    id: 'minimal-tech',
    tabLabel: 'Minimal Tech',
    archetypeTag: 'PRECISION • ARCHITECTURAL • B2B / SAAS / AI',
    sampleBrandName: 'Vektora',
    sampleTagline: 'Autonomous Cloud Infrastructure',
    industryFit: 'B2B SaaS, Fintech, Developer Tools & AI Platforms',
    fontFamilyCss: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
    fontDisplayLabel: 'Space Grotesk Bold',
    fontBodyLabel: 'Plus Jakarta Sans Regular',
    fontPairRatio: '1.250 Major Third • Tight -0.03em Tracking',
    swatches: [
      {
        role: 'Primary',
        name: 'Cobalt Core',
        hex: '#0571C2',
        pantoneCode: 'PMS 2145 C',
        textOnSwatch: '#FFFFFF',
      },
      {
        role: 'Secondary',
        name: 'Carbon Slate',
        hex: '#1E242E',
        pantoneCode: 'PMS 432 C',
        textOnSwatch: '#FFFFFF',
      },
      {
        role: 'Accent',
        name: 'Electric Cyan',
        hex: '#38BDF8',
        pantoneCode: 'PMS 298 C',
        textOnSwatch: '#0F172A',
      },
      {
        role: 'Light',
        name: 'Ice Mist',
        hex: '#F0F7FD',
        pantoneCode: 'PMS 656 C',
        textOnSwatch: '#1E242E',
      },
      {
        role: 'Dark',
        name: 'Obsidian Ink',
        hex: '#0B0F17',
        pantoneCode: 'PMS Black 6 C',
        textOnSwatch: '#FFFFFF',
      },
    ],
    gridSpec: {
      ratioLabel: '1 : 1.618 Golden Geometric Grid',
      clearSpaceRule: '1.5× Monogram Cap-Height (x)',
      minimumDigitalSize: '16px Favicon / 24px App Icon',
      cornerRadiusToken: '6px Technical Chamfer',
    },
    packagingSubtitle: 'Enterprise Hardware & Welcome Kit',
    socialHandle: '@vektora.cloud',
  },
  {
    id: 'bold-modern',
    tabLabel: 'Bold Modern',
    archetypeTag: 'HIGH-CONTRAST • EXPRESSIVE • CHALLENGER BRANDS',
    sampleBrandName: 'KINETIX',
    sampleTagline: 'Zero-Emission Urban Performance',
    industryFit: 'EV & Mobility, Sportswear, Fintech Challengers & D2C Drops',
    fontFamilyCss: "'Syne', 'Plus Jakarta Sans', sans-serif",
    fontDisplayLabel: 'Syne ExtraBold',
    fontBodyLabel: 'Plus Jakarta Sans Medium',
    fontPairRatio: '1.333 Perfect Fourth • WideDisplay Lockup',
    swatches: [
      {
        role: 'Primary',
        name: 'Volt Emerald',
        hex: '#10B981',
        pantoneCode: 'PMS 3395 C',
        textOnSwatch: '#06281E',
      },
      {
        role: 'Secondary',
        name: 'Asphalt Navy',
        hex: '#141821',
        pantoneCode: 'PMS 433 C',
        textOnSwatch: '#FFFFFF',
      },
      {
        role: 'Accent',
        name: 'Signal Blue',
        hex: '#0571C2',
        pantoneCode: 'PMS 2145 C',
        textOnSwatch: '#FFFFFF',
      },
      {
        role: 'Light',
        name: 'Chalk Stone',
        hex: '#F4F6F8',
        pantoneCode: 'PMS Cool Gray 1 C',
        textOnSwatch: '#141821',
      },
      {
        role: 'Dark',
        name: 'Track Black',
        hex: '#090B10',
        pantoneCode: 'PMS Black 3 C',
        textOnSwatch: '#FFFFFF',
      },
    ],
    gridSpec: {
      ratioLabel: '8pt Modular Kinetic Grid (45° Isometric Cut)',
      clearSpaceRule: '2.0× Stroke Width All Around',
      minimumDigitalSize: '18px App Badge / 28px Wearable',
      cornerRadiusToken: '0px Sharp / 999px Pill Contrast',
    },
    packagingSubtitle: 'Matte Foil Collector Box & Keycard',
    socialHandle: '@kinetix.mobility',
  },
  {
    id: 'editorial-luxury',
    tabLabel: 'Editorial Luxury',
    archetypeTag: 'TIMELESS • CRAFTED • ATELIER & HOSPITALITY',
    sampleBrandName: 'Maison Aurea',
    sampleTagline: 'Botanical Cellular Formulation • Paris & Mumbai',
    industryFit: 'Luxury Skincare, Fine Jewelry, Architecture, Boutique Hotels & Home Decor',
    fontFamilyCss: "'Fraunces', Georgia, serif",
    fontDisplayLabel: 'Fraunces Optical Serif',
    fontBodyLabel: 'Plus Jakarta Sans Light',
    fontPairRatio: '1.414 Augmented Fourth • High-Contrast Hairlines',
    swatches: [
      {
        role: 'Primary',
        name: 'Atelier Bronze',
        hex: '#B4834E',
        pantoneCode: 'PMS 7569 C',
        textOnSwatch: '#FFFFFF',
      },
      {
        role: 'Secondary',
        name: 'Deep Espresso',
        hex: '#1F1B18',
        pantoneCode: 'PMS 412 C',
        textOnSwatch: '#FFFFFF',
      },
      {
        role: 'Accent',
        name: 'Royal Sapphire',
        hex: '#0571C2',
        pantoneCode: 'PMS 2145 C',
        textOnSwatch: '#FFFFFF',
      },
      {
        role: 'Light',
        name: 'Alabaster Silk',
        hex: '#FAF6F0',
        pantoneCode: 'PMS 7527 C',
        textOnSwatch: '#1F1B18',
      },
      {
        role: 'Dark',
        name: 'Noir Velvet',
        hex: '#12100E',
        pantoneCode: 'PMS Black 7 C',
        textOnSwatch: '#FAF6F0',
      },
    ],
    gridSpec: {
      ratioLabel: 'Classical Crest & Optical Serif Axis',
      clearSpaceRule: '2.5× Crest Medallion Radius',
      minimumDigitalSize: '20px Foil Stamp / 32px Monogram',
      cornerRadiusToken: '2px Micro-Bevel Editorial Frame',
    },
    packagingSubtitle: 'Blind-Debossed Cotton Rigid Box',
    socialHandle: '@maisonaurea.official',
  },
  {
    id: 'friendly-consumer',
    tabLabel: 'Friendly Consumer',
    archetypeTag: 'WARM • APPROACHABLE • D2C & WELLNESS',
    sampleBrandName: 'sunoa',
    sampleTagline: 'Daily Gut & Mind Rituals',
    industryFit: 'D2C Food & Beverage, Modern Healthcare, EdTech & Consumer Apps',
    fontFamilyCss: "'Outfit', 'Plus Jakarta Sans', sans-serif",
    fontDisplayLabel: 'Outfit Rounded Bold',
    fontBodyLabel: 'Plus Jakarta Sans Regular',
    fontPairRatio: '1.200 Minor Third • Warm Humanist Curves',
    swatches: [
      {
        role: 'Primary',
        name: 'Sunlit Coral',
        hex: '#F97316',
        pantoneCode: 'PMS 1585 C',
        textOnSwatch: '#FFFFFF',
      },
      {
        role: 'Secondary',
        name: 'Harbor Navy',
        hex: '#1E242E',
        pantoneCode: 'PMS 432 C',
        textOnSwatch: '#FFFFFF',
      },
      {
        role: 'Accent',
        name: 'Sky Lagoon',
        hex: '#0571C2',
        pantoneCode: 'PMS 2145 C',
        textOnSwatch: '#FFFFFF',
      },
      {
        role: 'Light',
        name: 'Oatmilk Cream',
        hex: '#FFFDF9',
        pantoneCode: 'PMS 7499 C',
        textOnSwatch: '#1E242E',
      },
      {
        role: 'Dark',
        name: 'Roast Cocoa',
        hex: '#18181B',
        pantoneCode: 'PMS 419 C',
        textOnSwatch: '#FFFFFF',
      },
    ],
    gridSpec: {
      ratioLabel: 'Organic Circular Tangent Grid (r = 24u)',
      clearSpaceRule: '1.25× Lowercase "o" Counter',
      minimumDigitalSize: '16px App Tile / 22px Bottle Cap',
      cornerRadiusToken: '20px Soft Tactile Curve',
    },
    packagingSubtitle: 'Soft-Touch Standup Pouch & Tin',
    socialHandle: '@drinksunoa',
  },
];

/* ============================================================================
   STATIC DATA — SECTION 2: 4 BRAND SITUATIONS (WHO NEEDS THIS & WHEN)
============================================================================ */

const BRAND_SITUATIONS: BrandSituationCard[] = [
  {
    id: 'new-launch',
    code: 'STAGE 01',
    situationTitle: 'Launching a New Startup or D2C Brand',
    whoItDescribes:
      'Founders preparing to launch a new product, SaaS platform, clinic, or consumer label who refuse to look "early-stage" on day one.',
    painPoint:
      'Launching with a rushed ₹5,000 Canva logo or generic template makes investors, enterprise buyers, and retail shoppers doubt your legitimacy.',
    recommendedScope: 'Brand Foundation + Full Visual Identity System',
    typicalTimeline: '2–3 Weeks',
    coreDeliverables: [
      'Positioning, brand personality & competitive visual audit',
      'Primary wordmark, icon mark, favicon & responsive lockups',
      'Complete color palette (HEX/RGB/CMYK) & typography hierarchy',
      'Launch social kit, pitch deck master & Brand Guidelines book',
    ],
    outcomePromise:
      'Go to market looking like an established category leader from your very first customer touchpoint.',
  },
  {
    id: 'outgrown-logo',
    code: 'STAGE 02',
    situationTitle: 'Outgrown an Early DIY or Freelancer Logo',
    whoItDescribes:
      'Profitable 2–10 year old businesses whose product and team have matured, but whose visual identity still looks stuck in 2016.',
    painPoint:
      'Your sales team feels embarrassed sending your current deck or website to bigger enterprise or international prospects.',
    recommendedScope: 'Strategic Rebrand & Visual System Upgrade',
    typicalTimeline: '3–4 Weeks',
    coreDeliverables: [
      'Brand equity audit (what to preserve vs what to modernize)',
      'Refined geometry logo suite engineered for dark/light screens',
      'Upgraded design tokens, iconography style & photography rules',
      'Redesigned stationery, sales deck, email signatures & web UI kit',
    ],
    outcomePromise:
      'Command higher pricing and win larger deals with a visual identity that matches your real operational scale.',
  },
  {
    id: 'inconsistent-channels',
    code: 'STAGE 03',
    situationTitle: 'Inconsistent Look Across Website, Social & Packaging',
    whoItDescribes:
      'Growing teams where 4 different designers, agencies, and printers use slightly different blues, fonts, and logo stretches.',
    painPoint:
      'Your Instagram, website, Amazon store, and physical packaging look like 4 unrelated companies—wasting ad recall and brand trust.',
    recommendedScope: 'Unified Design System & Brand Book Governance',
    typicalTimeline: '2–3 Weeks',
    coreDeliverables: [
      'Master vector cleanup & standardized lockup clear-space rules',
      'Cross-medium color calibration (Screen HEX vs Print CMYK/Pantone)',
      '30+ page interactive Figma & PDF Brand Guidelines manual',
      'Ready-to-use Canva/Figma templates for internal marketing teams',
    ],
    outcomePromise:
      'Every ad, reel, box, and web page becomes unmistakably yours within 0.5 seconds of scrolling.',
  },
  {
    id: 'repositioning-upmarket',
    code: 'STAGE 04',
    situationTitle: 'Repositioning for New Markets, M&A or Series A/B',
    whoItDescribes:
      'Companies expanding into US/UK/UAE markets, launching a premium product line, or preparing for institutional fundraising.',
    painPoint:
      'What worked for local early adopters feels too regional or tactical when pitching global buyers, luxury retail, or VC partners.',
    recommendedScope: 'Complete Rebrand + Packaging / Digital Rollout',
    typicalTimeline: '4–5 Weeks',
    coreDeliverables: [
      'Category narrative, brand architecture & sub-brand hierarchy',
      'Global-grade identity system tested across 12+ digital/print surfaces',
      'Packaging dielines, trade-show/event graphics & investor deck design',
      'Seamless handoff into Website Development & Creative Campaigns',
    ],
    outcomePromise:
      'Enter global markets or boardrooms with an institutional-grade brand system built for the next decade.',
  },
];

/* ============================================================================
   STATIC DATA — SECTION 3: 6 LAYERS OF A COMPLETE BRAND IDENTITY (ANATOMY)
============================================================================ */

const IDENTITY_ANATOMY_LAYERS: IdentityLayerItem[] = [
  {
    id: 'layer-strategy',
    layerNum: '01',
    title: 'Brand Strategy & Positioning Foundation',
    subtitle: 'Audience psychology, brand archetype, tone of voice & visual territory',
    categoryBadge: 'STRATEGIC CORE',
    whyItMatters:
      'A logo designed without strategy is just decoration. Before sketching a single vector curve, we define who you are, how you sound, and the exact visual space your competitors have left wide open.',
    deliverablesList: [
      'Competitive visual landscape audit (5–8 direct & aspirational peers)',
      'Brand archetype, core personality traits & value proposition pillars',
      'Voice & tone matrix (how the brand speaks on web, ads & support)',
      '2 curated Strategic Moodboards defining visual direction before design begins',
    ],
    specimenType: 'positioning-board',
    craftNote:
      'Aligns founders and stakeholders on objective criteria so logo reviews never turn into subjective guessing.',
  },
  {
    id: 'layer-logo-system',
    layerNum: '02',
    title: 'Logo System & Responsive Lockup Architecture',
    subtitle: 'Primary mark, horizontal/stacked lockups, monogram & 16px favicon',
    categoryBadge: 'VECTOR SYSTEM',
    whyItMatters:
      'A single wide logo fails inside a circular Instagram avatar, a 16×16px browser tab, or a mobile app header. We engineer a responsive 5-part logo system that scales from billboards down to smartwatches.',
    deliverablesList: [
      'Primary Brand Signature (Symbol + Custom/Modified Wordmark)',
      'Horizontal header lockup & vertical stacked crest lockup',
      'Standalone brand mark / monogram for avatars & app icons',
      'Small-scale optical cut optimized specifically for 16px–24px favicons',
    ],
    specimenType: 'logo-lockups',
    craftNote:
      'Every curve is plotted on a mathematical construction grid with optical weight corrections for dark and light backgrounds.',
  },
  {
    id: 'layer-color',
    layerNum: '03',
    title: 'Color Architecture & Cross-Medium Calibration',
    subtitle: 'Primary, secondary, accent & neutral ramps in HEX, RGB, CMYK & Pantone',
    categoryBadge: 'COLOR SCIENCE',
    whyItMatters:
      'Colors that look vibrant on a MacBook screen often print muddy on packaging boxes or fail WCAG contrast on mobile buttons. We build a calibrated color system for both digital UI and physical print.',
    deliverablesList: [
      'Primary & Secondary brand signature colors with emotional rationale',
      'Digital UI tint/shade scales (50–900 ramps) with WCAG AA/AAA contrast ratios',
      'Print-calibrated CMYK breakdowns & Pantone (PMS) spot color matches',
      'Color proportion rules (60-30-10 usage balance across dark & light modes)',
    ],
    specimenType: 'color-swatches',
    craftNote:
      'Includes ready-to-import Figma color variables and CSS custom properties (--brand-primary, etc.) for your dev team.',
  },
  {
    id: 'layer-typography',
    layerNum: '04',
    title: 'Typography System & Hierarchy Scale',
    subtitle: 'Display, body & numeral font pairings with licensing & web/print scales',
    categoryBadge: 'TYPE HIERARCHY',
    whyItMatters:
      '85% of a digital brand experience is typography. Distinct, well-proportioned type makes your website, pitch deck, and packaging recognizable even before someone sees your logo.',
    deliverablesList: [
      'Expressive Display / Headline typeface selection (commercial or open-source)',
      'High-legibility Body & UI typeface for long-form reading and apps',
      'Tabular numeral & technical caption rules for pricing and metrics',
      'Complete H1–H6, Body, Lead & Micro-label sizing, line-height & tracking specs',
    ],
    specimenType: 'typography-scale',
    craftNote:
      'We verify font licensing (Google Fonts / Adobe / Commercial Desktop & Webfont) so you never face surprise license fees.',
  },
  {
    id: 'layer-visual-language',
    layerNum: '05',
    title: 'Visual Language, Patterns, Icons & Photography Style',
    subtitle: 'Custom brand patterns, iconography stroke rules & art direction',
    categoryBadge: 'BRAND WORLD',
    whyItMatters:
      'A logo, color, and font still need a "supporting cast." Custom geometric patterns, bespoke icon rules, and photography lighting direction stop your team from relying on generic stock graphics.',
    deliverablesList: [
      'Bespoke brand pattern / geometric motif derived from your logo anatomy',
      'Custom iconography grid rules (stroke weight, corner radius, two-tone accents)',
      'Photography & illustration art direction (lighting, warmth, composition DOs/DON’Ts)',
      'Social media carousel, badge, and callout framing devices',
    ],
    specimenType: 'graphic-motifs',
    craftNote:
      'Gives your marketing and social teams a rich visual toolkit to create hundreds of on-brand assets effortlessly.',
  },
  {
    id: 'layer-guidelines',
    layerNum: '06',
    title: 'Brand Guidelines Book & Master Asset Library',
    subtitle: 'Comprehensive PDF + Figma Brand Book and organized vector source vault',
    categoryBadge: 'GOVERNANCE & HANDOFF',
    whyItMatters:
      'Without clear rules, even the best identity gets stretched, recolored, and broken within six months. Our Brand Book ensures every future employee, printer, or agency keeps your brand razor-sharp.',
    deliverablesList: [
      '25–45 page Brand Guidelines Book (PDF + Interactive Figma Workspace)',
      'Clear-space diagrams, minimum size limits & explicit Logo Misuse ("Don’ts")',
      'Organized Master Asset Vault: SVG, AI, EPS, PDF, and high-res transparent PNGs',
      'Full commercial IP ownership transfer upon project completion',
    ],
    specimenType: 'brand-book',
    craftNote:
      'Structured so any web developer, packaging vendor, or social designer can find the exact file they need in under 10 seconds.',
  },
];

/* ============================================================================
   SVG LOGO RENDERER FOR THE 4 STUDIO DIRECTIONS
============================================================================ */

const StudioLogoMark: React.FC<{
  directionId: StudioDirectionId;
  primaryColor: string;
  accentColor: string;
  sizeClass?: string;
}> = ({ directionId, primaryColor, accentColor, sizeClass = 'w-14 h-14' }) => {
  if (directionId === 'minimal-tech') {
    return (
      <svg viewBox="0 0 64 64" fill="none" className={sizeClass} aria-hidden="true">
        <rect
          x="6"
          y="6"
          width="52"
          height="52"
          rx="12"
          stroke={primaryColor}
          strokeWidth="2.5"
          strokeDasharray="4 3"
          opacity="0.45"
        />
        <path
          d="M18 20L32 46L46 20"
          stroke={primaryColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25 20L32 33L39 20"
          stroke={accentColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="46" r="4" fill={accentColor} />
      </svg>
    );
  }

  if (directionId === 'bold-modern') {
    return (
      <svg viewBox="0 0 64 64" fill="none" className={sizeClass} aria-hidden="true">
        <polygon points="12,12 36,12 24,32 36,52 12,52" fill={primaryColor} />
        <polygon points="34,12 52,12 38,32 52,52 34,52 22,32" fill={accentColor} />
      </svg>
    );
  }

  if (directionId === 'editorial-luxury') {
    return (
      <svg viewBox="0 0 64 64" fill="none" className={sizeClass} aria-hidden="true">
        <circle cx="32" cy="32" r="26" stroke={primaryColor} strokeWidth="2" />
        <circle
          cx="32"
          cy="32"
          r="21"
          stroke={primaryColor}
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <path
          d="M22 42L32 18L42 42M25.5 34H38.5"
          stroke={primaryColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path d="M32 10L34 15L32 17L30 15Z" fill={accentColor} />
      </svg>
    );
  }

  // friendly-consumer
  return (
    <svg viewBox="0 0 64 64" fill="none" className={sizeClass} aria-hidden="true">
      <rect x="8" y="8" width="48" height="48" rx="22" fill={primaryColor} />
      <circle cx="24" cy="28" r="4" fill="#FFFFFF" />
      <circle cx="40" cy="28" r="4" fill="#FFFFFF" />
      <path
        d="M22 38C25 43 39 43 42 38"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="48" cy="16" r="6" fill={accentColor} />
    </svg>
  );
};

/* ============================================================================
   MAIN PAGE COMPONENT — BRANDING & LOGO DESIGN
============================================================================ */

const BrandingLogoDesign: React.FC<BrandingLogoDesignProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  // Single source of truth from Services.tsx
  const serviceEntry = useMemo(
    () =>
      services.find((s) => s.slug === 'branding-logo-design') || {
        slug: 'branding-logo-design',
        name: 'Branding & Logo Design',
        category: 'Brand & Content',
        badge: null,
        icon: 'Award',
        tagline: 'Memorable brand identity, logo systems, color palettes and guidelines.',
        description:
          'Look like the category leader from the very first impression. We craft distinctive logos, typography hierarchies, color systems, packaging direction, and comprehensive brand books that scale across digital and print.',
        bestFor: ['New Brand Launches', 'Company Rebrands', 'D2C & Luxury Labels'],
        deliverables: [
          'Brand positioning, archetype & visual moodboards',
          'Primary logo, monogram, responsive marks & lockups',
          'Color palette, typography scale & iconography style',
          'Social media, stationery & packaging/deck templates',
          'Comprehensive Brand Guidelines book (PDF + Figma)',
          'Full vector source files (SVG, EPS, PNG, Font licenses)',
        ],
        typicalTimeline: '2–4 weeks',
        keyMetric: 'Complete brand system ready for web, social & packaging (placeholder)',
        relatedIndustries: ['skincare-beauty', 'fashion-lifestyle', 'interior-design-architecture'],
        futurePagePath: '/services/branding-logo-design',
      },
    []
  );

  // Section 1 State: Interactive Brand Identity Studio Board
  const [selectedDirectionId, setSelectedDirectionId] =
    useState<StudioDirectionId>('minimal-tech');
  const [showConstructionGrid, setShowConstructionGrid] = useState<boolean>(true);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const activeStudioDirection = useMemo(
    () =>
      STUDIO_DIRECTIONS.find((dir) => dir.id === selectedDirectionId) ||
      STUDIO_DIRECTIONS[0],
    [selectedDirectionId]
  );

  // Section 2 State: Highlighted Brand Situation Card
  const [selectedSituationId, setSelectedSituationId] = useState<string>('new-launch');

  // Section 3 State: Active Identity Layer Specimen
  const [activeLayerId, setActiveLayerId] = useState<string>('layer-logo-system');

  const activeLayerItem = useMemo(
    () =>
      IDENTITY_ANATOMY_LAYERS.find((l) => l.id === activeLayerId) ||
      IDENTITY_ANATOMY_LAYERS[1],
    [activeLayerId]
  );

  // Section 4 State: Interactive Logo Construction & Lockup Controls
  const [showGoldenGridOverlay, setShowGoldenGridOverlay] = useState<boolean>(true);
  const [showClearSpaceGuides, setShowClearSpaceGuides] = useState<boolean>(true);
  const [lockupCanvasBg, setLockupCanvasBg] = useState<'dark' | 'light' | 'blueprint'>('dark');
  const [selectedLockupVariant, setSelectedLockupVariant] = useState<
    'primary' | 'horizontal' | 'stacked' | 'monogram' | 'favicon'
  >('primary');

  // Copy HEX helper for Section 1 & Section 3 Swatches
  const handleCopyHex = (hex: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }
    setCopiedHex(hex);
    setTimeout(() => {
      setCopiedHex((prev) => (prev === hex ? null : prev));
    }, 1600);
  };

  // SEO Meta Title & Description
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Branding & Logo Design Services — Brand Identity, Logo Systems & Guidelines | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Build a brand people remember. WebXCode crafts strategic brand identities, geometric logo systems, calibrated color palettes, typography hierarchies, packaging direction, and Figma/PDF brand guidelines.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  const triggerQuoteModal = (customServiceContext?: string) => {
    const label = customServiceContext || serviceEntry.name;
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  // JSON-LD Service Schema
  const serviceJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Branding & Logo Design Services (Brand Identity Systems & Guidelines)',
      serviceType: 'Brand Strategy, Logo Design, Visual Identity & Brand Guidelines',
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      description: serviceEntry.description,
      areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'AU'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Branding & Logo Design Deliverables',
        itemListElement: serviceEntry.deliverables.map((item, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name: item,
          },
        })),
      },
    }),
    [serviceEntry]
  );

  return (
    <main className="flex-1 bg-white text-navy overflow-x-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* ======================================================================
          SECTION 1 — HERO: THE LIVE BRAND IDENTITY STUDIO BOARD
          (bg: #1e242e navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Radial Studio Blue Glow + Subtle Architectural Drafting Grid */}
        <div
          className="absolute -top-28 right-1/4 w-[660px] h-[660px] blue-glow-strong pointer-events-none opacity-75"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/65 font-medium">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </li>
              <li className="text-primary-100 font-semibold" aria-current="page">
                {serviceEntry.name}
              </li>
            </ol>
          </nav>

          {/* 55% Left / 45% Right Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-11 items-center">
            {/* Left 55% (7 cols on lg): Positioning, Copy, CTAs & 4 Studio Stat Pills */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Award className="w-3.5 h-3.5 text-primary" />
                <span>
                  {serviceEntry.category.toUpperCase()} • BRAND STRATEGY, LOGO &amp; IDENTITY
                </span>
              </div>

              <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.07] tracking-tight">
                Brands People Remember —{' '}
                <span className="text-primary">From First Impression</span> to Every Touchpoint
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-2xl">
                Customers judge your credibility in under half a second. We don&apos;t just hand you
                a lonely logo file—we craft complete, unmistakable{' '}
                <strong className="text-white font-semibold">
                  brand identity systems: positioning, geometric logo suites, calibrated color
                  palettes, typography scales, packaging direction, and Figma/PDF brand books
                </strong>{' '}
                built to scale across web, social, and print.
              </p>

              {/* Best For Audience Chips */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100 mr-1">
                  Crafted For:
                </span>
                {serviceEntry.bestFor.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-[12px] font-semibold text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Primary + Secondary CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('Start Your Brand Project')}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Start Your Brand Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#identity-anatomy"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>See What&apos;s Included</span>
                </a>
              </div>

              {/* 4 Studio Benchmark Stat Pills */}
              <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  {
                    value: '2–4 Wks',
                    label: 'Typical Brand Sprint',
                    note: 'Discovery to Brand Book',
                  },
                  {
                    value: '3 Concepts',
                    label: 'Distinct Studio Directions',
                    note: 'Strategy-backed routes',
                  },
                  {
                    value: '30+ Pages',
                    label: 'Brand Guidelines Book',
                    note: 'Interactive Figma + PDF',
                  },
                  {
                    value: '100% IP',
                    label: 'Full Vector Ownership',
                    note: 'SVG, AI, EPS, PNG & Fonts',
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10"
                  >
                    <div className="font-mono text-[20px] sm:text-[23px] font-extrabold text-white tabular-nums leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[12.5px] font-bold text-primary-100 mt-1.5">
                      {stat.label}
                    </div>
                    <div className="font-mono text-[10.5px] text-white/60 mt-0.5">
                      {stat.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 45% (5 cols on lg): Interactive Brand Identity Studio Board */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] bg-white/[0.05] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                {/* Studio Board Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-primary" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/90">
                      LIVE BRAND IDENTITY STUDIO BOARD
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConstructionGrid((prev) => !prev)}
                    className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold transition-all cursor-pointer border ${
                      showConstructionGrid
                        ? 'bg-primary/30 border-primary text-primary-100'
                        : 'bg-white/5 border-white/15 text-white/65 hover:text-white'
                    }`}
                  >
                    {showConstructionGrid ? '✓ GRID OVERLAY ON' : 'GRID OVERLAY OFF'}
                  </button>
                </div>

                {/* 4 Brand Direction Switcher Pills */}
                <div className="mb-4">
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-white/60 mb-2">
                    Switch Brand Aesthetic Direction:
                  </div>
                  <div
                    className="grid grid-cols-2 gap-1.5"
                    role="tablist"
                    aria-label="Brand Studio Aesthetic Directions"
                  >
                    {STUDIO_DIRECTIONS.map((dir) => {
                      const isSelected = dir.id === activeStudioDirection.id;
                      return (
                        <button
                          key={dir.id}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => setSelectedDirectionId(dir.id)}
                          className={`px-3 py-2 rounded-xl font-mono text-[11.5px] font-bold text-left transition-all cursor-pointer flex items-center justify-between border ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'bg-white/[0.04] text-white/75 border-white/10 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{dir.tabLabel}</span>
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 ml-1.5 border border-white/40"
                            style={{ backgroundColor: dir.swatches[0].hex }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Animated Brand Presentation Board */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStudioDirection.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-3.5"
                  >
                    {/* 1. Logo Mark & Wordmark Specimen Stage with Construction Grid */}
                    <div
                      className="relative rounded-2xl p-5 border border-white/15 overflow-hidden"
                      style={{
                        backgroundColor: activeStudioDirection.swatches[4].hex,
                        backgroundImage: showConstructionGrid
                          ? 'linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)'
                          : 'none',
                        backgroundSize: '20px 20px',
                      }}
                    >
                      {/* Construction Axis Lines when enabled */}
                      {showConstructionGrid && (
                        <>
                          <div
                            className="absolute inset-x-0 top-1/2 border-t border-dashed border-primary/40 pointer-events-none"
                            aria-hidden="true"
                          />
                          <div
                            className="absolute inset-y-0 left-1/4 border-l border-dashed border-primary/40 pointer-events-none"
                            aria-hidden="true"
                          />
                        </>
                      )}

                      <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/60">
                          {activeStudioDirection.archetypeTag}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-[10px] text-primary-100">
                          {activeStudioDirection.gridSpec.clearSpaceRule}
                        </span>
                      </div>

                      <div className="relative z-10 flex items-center gap-4 py-2">
                        <div className="relative p-2 rounded-xl border border-dashed border-white/25 bg-white/[0.03] shrink-0">
                          <StudioLogoMark
                            directionId={activeStudioDirection.id}
                            primaryColor={activeStudioDirection.swatches[0].hex}
                            accentColor={activeStudioDirection.swatches[2].hex}
                            sizeClass="w-12 h-12"
                          />
                        </div>
                        <div className="min-w-0">
                          <div
                            className="text-[26px] sm:text-[30px] font-extrabold text-white leading-none tracking-tight truncate"
                            style={{ fontFamily: activeStudioDirection.fontFamilyCss }}
                          >
                            {activeStudioDirection.sampleBrandName}
                          </div>
                          <div className="text-[12px] text-white/70 mt-1 truncate">
                            {activeStudioDirection.sampleTagline}
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-white/65">
                        <span>Grid: {activeStudioDirection.gridSpec.ratioLabel}</span>
                        <span>Min: {activeStudioDirection.gridSpec.minimumDigitalSize}</span>
                      </div>
                    </div>

                    {/* 2. 5-Swatch Color Strip (Click to Copy HEX) */}
                    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                      <div className="flex items-center justify-between text-[10.5px] font-mono text-white/70 mb-2">
                        <span className="uppercase font-bold">
                          CALIBRATED 5-SWATCH SYSTEM (CLICK TO COPY HEX)
                        </span>
                        <span className="text-primary-100">
                          {copiedHex ? `Copied ${copiedHex}!` : 'HEX + PMS'}
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {activeStudioDirection.swatches.map((sw) => (
                          <button
                            key={sw.hex}
                            type="button"
                            onClick={() => handleCopyHex(sw.hex)}
                            title={`Copy ${sw.name} (${sw.hex})`}
                            className="group rounded-lg overflow-hidden border border-white/15 text-left transition-transform hover:-translate-y-0.5 cursor-pointer"
                          >
                            <div
                              className="h-9 w-full flex items-end justify-between p-1.5"
                              style={{
                                backgroundColor: sw.hex,
                                color: sw.textOnSwatch,
                              }}
                            >
                              <span className="font-mono text-[9px] font-bold uppercase opacity-85">
                                {sw.role.slice(0, 3)}
                              </span>
                            </div>
                            <div className="bg-[#131820] p-1.5">
                              <div className="font-mono text-[10px] font-bold text-white truncate">
                                {sw.hex}
                              </div>
                              <div className="font-mono text-[8.5px] text-white/55 truncate">
                                {sw.pantoneCode}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Typography Pairing + Live Mockup Preview Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                      {/* Typography Specimen Box */}
                      <div className="sm:col-span-5 rounded-xl bg-white/[0.04] border border-white/10 p-3 flex flex-col justify-between">
                        <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                          TYPE PAIRING
                        </div>
                        <div className="my-1.5 flex items-baseline gap-2">
                          <span
                            className="text-[28px] font-bold text-white leading-none"
                            style={{ fontFamily: activeStudioDirection.fontFamilyCss }}
                          >
                            Aa
                          </span>
                          <span className="font-mono text-[11px] text-white/60">123</span>
                        </div>
                        <div>
                          <div className="text-[11.5px] font-bold text-white truncate">
                            {activeStudioDirection.fontDisplayLabel}
                          </div>
                          <div className="font-mono text-[10px] text-white/55 truncate">
                            + {activeStudioDirection.fontBodyLabel}
                          </div>
                        </div>
                      </div>

                      {/* 3 Mini Real-World Application Mockups (Card, Packaging, Social) */}
                      <div className="sm:col-span-7 rounded-xl bg-white/[0.04] border border-white/10 p-3 flex flex-col justify-between">
                        <div className="font-mono text-[10px] font-bold uppercase text-primary-100 mb-2">
                          LIVE TOUCHPOINT ROLLOUT
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {/* Mini Business Card */}
                          <div
                            className="rounded-lg p-2 border border-white/15 flex flex-col justify-between h-16"
                            style={{ backgroundColor: activeStudioDirection.swatches[1].hex }}
                          >
                            <div
                              className="w-3.5 h-3.5 rounded-sm"
                              style={{ backgroundColor: activeStudioDirection.swatches[0].hex }}
                            />
                            <div>
                              <div className="text-[9px] font-bold text-white truncate">
                                {activeStudioDirection.sampleBrandName}
                              </div>
                              <div className="font-mono text-[7.5px] text-white/60">Card</div>
                            </div>
                          </div>

                          {/* Mini Packaging Box */}
                          <div
                            className="rounded-lg p-2 border border-white/15 flex flex-col justify-between h-16"
                            style={{
                              backgroundColor: activeStudioDirection.swatches[3].hex,
                              color: activeStudioDirection.swatches[1].hex,
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: activeStudioDirection.swatches[0].hex }}
                              />
                              <span className="font-mono text-[7.5px] font-bold uppercase opacity-70">
                                BOX
                              </span>
                            </div>
                            <div
                              className="text-[9px] font-extrabold truncate"
                              style={{ fontFamily: activeStudioDirection.fontFamilyCss }}
                            >
                              {activeStudioDirection.sampleBrandName}
                            </div>
                          </div>

                          {/* Mini Social Profile Tile */}
                          <div
                            className="rounded-lg p-2 border border-white/15 flex flex-col justify-between h-16"
                            style={{ backgroundColor: activeStudioDirection.swatches[0].hex }}
                          >
                            <div className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center text-[8px] font-bold text-white">
                              {activeStudioDirection.sampleBrandName.charAt(0)}
                            </div>
                            <div className="font-mono text-[8px] font-bold text-white truncate">
                              {activeStudioDirection.socialHandle}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Studio Board Footer Bar */}
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-white/70">
                  <span>Best Fit: {activeStudioDirection.industryFit}</span>
                  <button
                    type="button"
                    onClick={() =>
                      triggerQuoteModal(
                        `Brand Direction Inquiry: ${activeStudioDirection.tabLabel}`
                      )
                    }
                    className="font-bold text-primary-100 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore This Style</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2 — WHO THIS IS FOR: 4 BRAND SITUATIONS WE SOLVE
          (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Compass className="w-3.5 h-3.5 text-primary" />
                <span>WHEN TO INVEST IN BRANDING</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Four Moments Where a Great Brand{' '}
                <span className="text-primary">Changes Your Trajectory</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-md leading-[1.65]">
              Whether you are launching from scratch or rebranding a 10-year company, we tailor our
              studio scope to your exact stage of growth.
            </p>
          </div>

          {/* 4 Studio Situation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 items-stretch">
            {BRAND_SITUATIONS.map((sit) => {
              const isSelected = sit.id === selectedSituationId;
              return (
                <div
                  key={sit.id}
                  onClick={() => setSelectedSituationId(sit.id)}
                  className={`rounded-[24px] p-6 sm:p-8 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-xl'
                      : 'bg-white text-navy border-navy-08 hover:border-primary shadow-soft'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-current/10">
                      <span
                        className={`px-3 py-1 rounded-full font-mono text-[11px] font-extrabold uppercase tracking-wider ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {sit.code} • {sit.recommendedScope}
                      </span>
                      <span
                        className={`font-mono text-[12px] font-bold ${
                          isSelected ? 'text-primary-100' : 'text-navy-60'
                        }`}
                      >
                        Timeline: {sit.typicalTimeline}
                      </span>
                    </div>

                    <h3
                      className={`text-[21px] sm:text-[24px] font-extrabold leading-snug ${
                        isSelected ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {sit.situationTitle}
                    </h3>

                    <p
                      className={`mt-2.5 text-[14px] leading-relaxed ${
                        isSelected ? 'text-white/80' : 'text-navy-70'
                      }`}
                    >
                      {sit.whoItDescribes}
                    </p>

                    {/* The Symptom / Risk Box */}
                    <div
                      className={`mt-4 p-3.5 rounded-xl border text-[13px] leading-relaxed ${
                        isSelected
                          ? 'bg-white/[0.06] border-white/15 text-white/90'
                          : 'bg-primary-50/50 border-primary-100 text-navy'
                      }`}
                    >
                      <strong
                        className={`font-bold uppercase font-mono text-[11px] block mb-0.5 ${
                          isSelected ? 'text-primary-100' : 'text-primary'
                        }`}
                      >
                        Why It Costs You Sales:
                      </strong>
                      {sit.painPoint}
                    </div>

                    {/* 4 Deliverables */}
                    <div className="mt-5">
                      <div
                        className={`font-mono text-[11px] font-bold uppercase tracking-wider mb-2.5 ${
                          isSelected ? 'text-white/65' : 'text-navy-60'
                        }`}
                      >
                        What We Deliver for This Stage:
                      </div>
                      <ul className="space-y-2">
                        {sit.coreDeliverables.map((item) => (
                          <li
                            key={item}
                            className={`flex items-start gap-2.5 text-[13px] font-semibold ${
                              isSelected ? 'text-white/95' : 'text-navy'
                            }`}
                          >
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span
                      className={`text-[12.5px] font-semibold ${
                        isSelected ? 'text-primary-100' : 'text-navy-70'
                      }`}
                    >
                      {sit.outcomePromise}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerQuoteModal(`Branding — ${sit.situationTitle}`);
                      }}
                      className={`px-4 py-2.5 rounded-full text-[12.5px] font-bold inline-flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-primary hover:bg-primary-700 text-white'
                          : 'bg-primary-50 hover:bg-navy text-primary hover:text-white'
                      }`}
                    >
                      <span>Scope This Stage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 3 — ANATOMY OF A COMPLETE BRAND IDENTITY (6-LAYER SPECIMEN EXPLORER)
          (bg: #f0f7fd)
      ====================================================================== */}
      <section
        id="identity-anatomy"
        className="py-[72px] lg:py-[112px] bg-primary-50 scroll-mt-20 border-b border-primary-100"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>MORE THAN JUST A LOGO</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              The 6 Layers of a Complete{' '}
              <span className="text-primary">WebXCode Brand Identity System</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              A standalone logo cannot carry an entire business. Click through all 6 layers below to
              inspect the strategic, typographic, color, and governance deliverables we build into
              every full identity project.
            </p>
          </div>

          {/* 2-Column Studio Explorer: Left 6 Layer Tabs (5 cols) + Right Specimen Sheet (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: 6 Layer Selector Cards */}
            <div
              className="lg:col-span-5 flex flex-col justify-between gap-2.5"
              role="tablist"
              aria-label="Brand Identity Layers"
            >
              {IDENTITY_ANATOMY_LAYERS.map((layer) => {
                const isSelected = layer.id === activeLayerItem.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveLayerId(layer.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-[18px] border transition-all cursor-pointer flex items-center justify-between gap-3.5 ${
                      isSelected
                        ? 'bg-navy text-white border-navy shadow-soft'
                        : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`w-8 h-8 rounded-xl font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {layer.layerNum}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                              isSelected ? 'text-primary-100' : 'text-primary'
                            }`}
                          >
                            {layer.categoryBadge}
                          </span>
                        </div>
                        <h3
                          className={`text-[15px] sm:text-[16px] font-extrabold leading-snug mt-0.5 ${
                            isSelected ? 'text-white' : 'text-navy'
                          }`}
                        >
                          {layer.title}
                        </h3>
                        <p
                          className={`text-[12.5px] mt-0.5 line-clamp-1 ${
                            isSelected ? 'text-white/70' : 'text-navy-60'
                          }`}
                        >
                          {layer.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-primary translate-x-0.5' : 'text-navy-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Live Studio Specimen Sheet for Selected Layer */}
            <div className="lg:col-span-7">
              <div className="h-full rounded-[24px] bg-white border border-navy-08 shadow-soft p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLayerItem.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* Specimen Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-navy-08">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[11px] font-extrabold uppercase">
                            LAYER {activeLayerItem.layerNum} OF 06
                          </span>
                          <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase">
                            {activeLayerItem.categoryBadge}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-navy-60">
                          WEBXCODE BRAND SPECIMEN
                        </span>
                      </div>

                      <h3 className="mt-5 text-[22px] sm:text-[26px] font-extrabold text-navy leading-snug">
                        {activeLayerItem.title}
                      </h3>
                      <p className="mt-2 text-[14.5px] text-navy-70 leading-relaxed">
                        {activeLayerItem.whyItMatters}
                      </p>

                      {/* Dynamic Visual Specimen Preview Box */}
                      <div className="mt-6 rounded-2xl bg-navy text-white p-5 border border-navy">
                        {activeLayerItem.specimenType === 'positioning-board' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between font-mono text-[10.5px] text-primary-100 uppercase">
                              <span>BRAND ARCHETYPE &amp; VOICE MATRIX</span>
                              <span>STRATEGIC BRIEF</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                              {[
                                {
                                  label: 'Primary Archetype',
                                  val: 'The Creator + Sage',
                                  sub: 'Authoritative yet inventive',
                                },
                                {
                                  label: 'Voice Polarity',
                                  val: 'Sharp, Direct, Zero Fluff',
                                  sub: 'Human clarity over buzzwords',
                                },
                                {
                                  label: 'Visual White-Space',
                                  val: 'Architectural Precision',
                                  sub: 'Stands apart from generic stock',
                                },
                              ].map((box) => (
                                <div
                                  key={box.label}
                                  className="p-3 rounded-xl bg-white/[0.06] border border-white/10"
                                >
                                  <div className="font-mono text-[10px] text-primary-100 uppercase">
                                    {box.label}
                                  </div>
                                  <div className="text-[13.5px] font-extrabold text-white mt-1">
                                    {box.val}
                                  </div>
                                  <div className="text-[11px] text-white/65 mt-0.5">{box.sub}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeLayerItem.specimenType === 'logo-lockups' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between font-mono text-[10.5px] text-primary-100 uppercase">
                              <span>RESPONSIVE LOGO SCALING SUITE</span>
                              <span>100% VECTOR</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                              {[
                                { title: 'Primary Signature', scale: 'Web Header & Print' },
                                { title: 'Stacked Crest', scale: 'Packaging & Signage' },
                                { title: 'Icon Monogram', scale: 'Social Avatar & App' },
                                { title: '16px Micro Cut', scale: 'Browser Favicon' },
                              ].map((item, i) => (
                                <div
                                  key={item.title}
                                  className="p-3 rounded-xl bg-white/[0.06] border border-white/10 text-center"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-primary/25 border border-primary/50 mx-auto flex items-center justify-center font-mono text-[11px] font-extrabold text-white">
                                    0{i + 1}
                                  </div>
                                  <div className="text-[12px] font-bold text-white mt-2">
                                    {item.title}
                                  </div>
                                  <div className="font-mono text-[10px] text-white/60 mt-0.5">
                                    {item.scale}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeLayerItem.specimenType === 'color-swatches' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between font-mono text-[10.5px] text-primary-100 uppercase">
                              <span>DIGITAL &amp; PRINT COLOR CALIBRATION</span>
                              <span>WCAG AA/AAA VERIFIED</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                              {[
                                {
                                  name: 'Brand Cobalt',
                                  hex: '#0571C2',
                                  cmyk: 'C88 M42 Y0 K0',
                                  contrast: '4.8:1 AA Pass',
                                },
                                {
                                  name: 'Studio Navy',
                                  hex: '#1E242E',
                                  cmyk: 'C78 M68 Y52 K58',
                                  contrast: '15.2:1 AAA Pass',
                                },
                                {
                                  name: 'Sky Tint 100',
                                  hex: '#D9ECFA',
                                  cmyk: 'C14 M3 Y0 K0',
                                  contrast: 'Surface Token',
                                },
                                {
                                  name: 'Ice Canvas 50',
                                  hex: '#F0F7FD',
                                  cmyk: 'C5 M1 Y0 K0',
                                  contrast: '60% Base Field',
                                },
                              ].map((c) => (
                                <div
                                  key={c.name}
                                  className="rounded-xl overflow-hidden border border-white/15 bg-[#131820]"
                                >
                                  <div
                                    className="h-7 w-full"
                                    style={{ backgroundColor: c.hex }}
                                  />
                                  <div className="p-2.5">
                                    <div className="text-[11.5px] font-bold text-white">
                                      {c.name}
                                    </div>
                                    <div className="font-mono text-[10px] text-primary-100">
                                      {c.hex}
                                    </div>
                                    <div className="font-mono text-[9px] text-white/55 mt-0.5">
                                      {c.cmyk}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeLayerItem.specimenType === 'typography-scale' && (
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between font-mono text-[10.5px] text-primary-100 uppercase">
                              <span>TYPOGRAPHIC HIERARCHY SPECIMEN</span>
                              <span>DESKTOP &amp; MOBILE TOKENS</span>
                            </div>
                            <div className="space-y-2 pt-1">
                              <div className="flex items-baseline justify-between border-b border-white/10 pb-1.5">
                                <span className="text-[20px] font-extrabold text-white">
                                  H1 Display Headline
                                </span>
                                <span className="font-mono text-[10px] text-primary-100">
                                  56px / 1.08 / -0.02em
                                </span>
                              </div>
                              <div className="flex items-baseline justify-between border-b border-white/10 pb-1.5">
                                <span className="text-[16px] font-bold text-white/90">
                                  H2 Section Architecture Title
                                </span>
                                <span className="font-mono text-[10px] text-primary-100">
                                  40px / 1.14 / -0.015em
                                </span>
                              </div>
                              <div className="flex items-baseline justify-between">
                                <span className="text-[13px] text-white/75">
                                  Body Regular — High-legibility prose for web &amp; print
                                </span>
                                <span className="font-mono text-[10px] text-primary-100">
                                  16px / 1.65 / 68ch
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeLayerItem.specimenType === 'graphic-motifs' && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                BESPOKE PATTERN
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Geometric Brand Mesh
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                For tissue wrap, decks &amp; web hero backgrounds
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                ICONOGRAPHY GRID
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                24×24px • 1.75px Stroke
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Custom two-tone product &amp; feature icons
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                ART DIRECTION
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Editorial Natural Light
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Zero generic corporate handshake stock photos
                              </div>
                            </div>
                          </div>
                        )}

                        {activeLayerItem.specimenType === 'brand-book' && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                CHAPTERS 01–03
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Strategy, Logo &amp; Clear Space
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Construction grids + explicit misuse rules
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                CHAPTERS 04–06
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Color, Type &amp; Templates
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Ready-to-edit Figma &amp; Canva master files
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                SOURCE VAULT
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                SVG, AI, EPS, PDF &amp; PNG
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Organized folders for print &amp; web vendors
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 4 Concrete Deliverables List */}
                      <div className="mt-6">
                        <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary mb-3">
                          Included in Layer {activeLayerItem.layerNum}:
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {activeLayerItem.deliverablesList.map((deliv) => (
                            <li
                              key={deliv}
                              className="p-3 rounded-xl bg-primary-50/50 border border-navy-08 flex items-start gap-2.5 text-[13px] font-semibold text-navy"
                            >
                              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Craft Note + CTA */}
                    <div className="mt-6 pt-5 border-t border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-[13px] text-navy-70">
                        <strong className="text-navy font-bold">Studio Standard: </strong>
                        {activeLayerItem.craftNote}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(`Brand Identity — ${activeLayerItem.title}`)
                        }
                        className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-700 text-white text-[13px] font-bold inline-flex items-center justify-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                      >
                        <span>Request Sample Brand Book</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 4 — INTERACTIVE LOGO CONSTRUCTION & LOCKUP SYSTEM
          (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Grid className="w-3.5 h-3.5 text-primary" />
                <span>GEOMETRIC LOGO ENGINEERING</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Engineered on Construction Grids —{' '}
                <span className="text-primary">Responsive From 16px to Billboards</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-md leading-[1.65]">
              Inspect how we construct a mark with mathematical balance, clear-space protection, and
              5 responsive lockups so your logo never looks cramped or illegible.
            </p>
          </div>

          {/* Interactive Vector Drafting Console */}
          <div className="rounded-[24px] border-2 border-navy-15 bg-white shadow-soft overflow-hidden">
            {/* Top Drafting Control Toolbar */}
            <div className="bg-navy text-white px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100 mr-2">
                  LOCKUP VARIANT:
                </span>
                {[
                  { id: 'primary', label: '01. Primary Signature' },
                  { id: 'horizontal', label: '02. Horizontal Header' },
                  { id: 'stacked', label: '03. Stacked Crest' },
                  { id: 'monogram', label: '04. Icon / Avatar' },
                  { id: 'favicon', label: '05. 16px Favicon' },
                ].map((tab) => {
                  const isActive = selectedLockupVariant === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() =>
                        setSelectedLockupVariant(
                          tab.id as
                            | 'primary'
                            | 'horizontal'
                            | 'stacked'
                            | 'monogram'
                            | 'favicon'
                        )
                      }
                      className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary text-white shadow-xs'
                          : 'bg-white/[0.07] text-white/75 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Grid, Clear-Space & Surface Toggles */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowGoldenGridOverlay((p) => !p)}
                  className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold border transition-all cursor-pointer ${
                    showGoldenGridOverlay
                      ? 'bg-primary/25 border-primary text-primary-100'
                      : 'bg-white/5 border-white/15 text-white/60'
                  }`}
                >
                  {showGoldenGridOverlay ? '✓ Construction Grid' : 'Construction Grid'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearSpaceGuides((p) => !p)}
                  className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold border transition-all cursor-pointer ${
                    showClearSpaceGuides
                      ? 'bg-primary/25 border-primary text-primary-100'
                      : 'bg-white/5 border-white/15 text-white/60'
                  }`}
                >
                  {showClearSpaceGuides ? '✓ 1.5x Clear-Space' : '1.5x Clear-Space'}
                </button>
                <div className="inline-flex rounded-full bg-white/10 p-0.5 border border-white/15">
                  {(['dark', 'light', 'blueprint'] as const).map((bgMode) => (
                    <button
                      key={bgMode}
                      type="button"
                      onClick={() => setLockupCanvasBg(bgMode)}
                      className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold uppercase cursor-pointer transition-colors ${
                        lockupCanvasBg === bgMode
                          ? 'bg-primary text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {bgMode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main 2-Column Construction Stage + Lockup Spec Sheet */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left 7 Cols: Interactive SVG Vector Construction Stage */}
              <div
                className={`lg:col-span-7 p-6 sm:p-10 relative flex flex-col justify-between min-h-[380px] transition-colors ${
                  lockupCanvasBg === 'dark'
                    ? 'bg-[#121720] text-white'
                    : lockupCanvasBg === 'blueprint'
                    ? 'bg-[#0571c2] text-white'
                    : 'bg-primary-50/60 text-navy'
                }`}
                style={{
                  backgroundImage: showGoldenGridOverlay
                    ? lockupCanvasBg === 'light'
                      ? 'linear-gradient(to right, rgba(5,113,194,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,113,194,0.10) 1px, transparent 1px)'
                      : 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)'
                    : 'none',
                  backgroundSize: '24px 24px',
                }}
              >
                {/* Top Coordinate Readout */}
                <div className="flex items-center justify-between font-mono text-[11px] opacity-75">
                  <span>VECTOR ARTBOARD • 1920 × 1080 PX</span>
                  <span>OPTICAL BALANCE: VERIFIED (1 : 1.618)</span>
                </div>

                {/* Center Logo Construction Specimen with Clear Space Frame */}
                <div className="my-8 flex items-center justify-center">
                  <div
                    className={`relative transition-all p-7 sm:p-10 rounded-2xl ${
                      showClearSpaceGuides
                        ? lockupCanvasBg === 'light'
                          ? 'border-2 border-dashed border-primary bg-white/80 shadow-sm'
                          : 'border-2 border-dashed border-primary-100/60 bg-white/[0.03]'
                        : ''
                    }`}
                  >
                    {/* Clear-Space Corner Markers */}
                    {showClearSpaceGuides && (
                      <>
                        <span className="absolute -top-3 left-3 px-2 py-0.5 rounded bg-primary text-white font-mono text-[9.5px] font-bold">
                          x = 1.5× Cap Height Safe Zone
                        </span>
                        <span className="absolute -bottom-3 right-3 px-2 py-0.5 rounded bg-navy text-primary-100 border border-white/20 font-mono text-[9.5px] font-bold">
                          No text or edges inside box
                        </span>
                      </>
                    )}

                    {/* Construction Circles Overlay */}
                    {showGoldenGridOverlay && (
                      <svg
                        viewBox="0 0 320 120"
                        className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
                        aria-hidden="true"
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="42"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="26"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                        <line
                          x1="0"
                          y1="34"
                          x2="320"
                          y2="34"
                          stroke="currentColor"
                          strokeWidth="0.75"
                          strokeDasharray="4 4"
                        />
                        <line
                          x1="0"
                          y1="86"
                          x2="320"
                          y2="86"
                          stroke="currentColor"
                          strokeWidth="0.75"
                          strokeDasharray="4 4"
                        />
                      </svg>
                    )}

                    {/* Render the active lockup variant */}
                    {selectedLockupVariant === 'primary' && (
                      <div className="relative z-10 flex items-center gap-5">
                        <StudioLogoMark
                          directionId={activeStudioDirection.id}
                          primaryColor={
                            lockupCanvasBg === 'blueprint' ? '#FFFFFF' : '#0571C2'
                          }
                          accentColor="#38BDF8"
                          sizeClass="w-16 h-16 sm:w-20 sm:h-20"
                        />
                        <div>
                          <div
                            className="text-[32px] sm:text-[42px] font-extrabold tracking-tight leading-none"
                            style={{ fontFamily: activeStudioDirection.fontFamilyCss }}
                          >
                            {activeStudioDirection.sampleBrandName}
                          </div>
                          <div className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-75 mt-1.5">
                            {activeStudioDirection.sampleTagline}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedLockupVariant === 'horizontal' && (
                      <div className="relative z-10 flex items-center gap-3.5">
                        <StudioLogoMark
                          directionId={activeStudioDirection.id}
                          primaryColor={
                            lockupCanvasBg === 'blueprint' ? '#FFFFFF' : '#0571C2'
                          }
                          accentColor="#38BDF8"
                          sizeClass="w-11 h-11"
                        />
                        <div
                          className="text-[26px] sm:text-[32px] font-extrabold tracking-tight leading-none"
                          style={{ fontFamily: activeStudioDirection.fontFamilyCss }}
                        >
                          {activeStudioDirection.sampleBrandName}
                        </div>
                        <span className="h-5 w-px bg-current opacity-25 mx-1" />
                        <span className="font-mono text-[11px] uppercase tracking-wider opacity-80">
                          NAVIGATION LOCKUP
                        </span>
                      </div>
                    )}

                    {selectedLockupVariant === 'stacked' && (
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <StudioLogoMark
                          directionId={activeStudioDirection.id}
                          primaryColor={
                            lockupCanvasBg === 'blueprint' ? '#FFFFFF' : '#0571C2'
                          }
                          accentColor="#38BDF8"
                          sizeClass="w-16 h-16 mb-3"
                        />
                        <div
                          className="text-[28px] sm:text-[34px] font-extrabold tracking-tight leading-none"
                          style={{ fontFamily: activeStudioDirection.fontFamilyCss }}
                        >
                          {activeStudioDirection.sampleBrandName}
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-75 mt-1.5">
                          EST. 2026 • PACKAGING CREST
                        </div>
                      </div>
                    )}

                    {selectedLockupVariant === 'monogram' && (
                      <div className="relative z-10 flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-navy border-2 border-primary flex items-center justify-center shadow-lg">
                          <StudioLogoMark
                            directionId={activeStudioDirection.id}
                            primaryColor="#0571C2"
                            accentColor="#38BDF8"
                            sizeClass="w-12 h-12"
                          />
                        </div>
                        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg">
                          <StudioLogoMark
                            directionId={activeStudioDirection.id}
                            primaryColor="#FFFFFF"
                            accentColor="#D9ECFA"
                            sizeClass="w-12 h-12"
                          />
                        </div>
                      </div>
                    )}

                    {selectedLockupVariant === 'favicon' && (
                      <div className="relative z-10 flex items-center gap-6">
                        <div className="px-4 py-2.5 rounded-xl bg-navy text-white border border-white/20 flex items-center gap-2.5 shadow-md">
                          <span className="w-4 h-4 rounded-sm bg-primary flex items-center justify-center font-mono text-[10px] font-extrabold text-white">
                            {activeStudioDirection.sampleBrandName.charAt(0)}
                          </span>
                          <span className="font-mono text-[12px] text-white/90">
                            {activeStudioDirection.sampleBrandName} — Official Site
                          </span>
                          <span className="text-white/40 text-xs ml-2">×</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Vector File Format Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-current/10 font-mono text-[11px] opacity-80">
                  <span>DELIVERED FORMATS: .SVG • .AI • .EPS • .PDF • .PNG (300 DPI)</span>
                  <span>COLOR MODES: RGB • CMYK • PANTONE</span>
                </div>
              </div>

              {/* Right 5 Cols: All 5 Lockup Specifications + Explicit Logo Misuse Rules */}
              <div className="lg:col-span-5 p-6 sm:p-8 bg-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-navy-08">
                <div>
                  <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-3">
                    WHY EVERY BRAND NEEDS 5 LOCKUPS
                  </div>
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold text-navy leading-snug">
                    One Logo File Breaks on Half Your Channels
                  </h3>
                  <p className="mt-2 text-[14px] text-navy-70 leading-relaxed">
                    We deliver a complete responsive lockup family so your brand stays crisp in a
                    42px website navbar, a circular Instagram profile, an embossed box, or a 16px
                    browser tab.
                  </p>

                  {/* 4 Explicit Logo Misuse ("Don'ts") Protected in Our Brand Book */}
                  <div className="mt-6 pt-5 border-t border-navy-08">
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60 mb-3">
                      BRAND BOOK PROTECTION (LOGO MISUSE RULES INCLUDED)
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        'Never stretch or distort aspect ratios',
                        'Never place on low-contrast busy photos',
                        'Never alter primary hex or add drop-shadows',
                        'Never crowd inside the 1.5x clear-space zone',
                      ].map((rule) => (
                        <div
                          key={rule}
                          className="p-3 rounded-xl bg-primary-50/50 border border-navy-08 text-[12px] font-semibold text-navy flex items-start gap-2"
                        >
                          <span className="font-mono text-primary font-extrabold shrink-0">
                            ✕
                          </span>
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Related Brand & Web Cross-Links */}
                <div className="mt-7 pt-5 border-t border-navy-08">
                  <div className="text-[12px] font-extrabold text-navy mb-2.5">
                    Roll Out Your New Brand Across Web &amp; Commerce:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to="/services/creative-communication"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[12px] font-bold transition-colors"
                    >
                      <span>Creative &amp; Communication</span>
                      <ArrowRight className="w-3 h-3 text-primary" />
                    </Link>
                    <Link
                      to="/services/copywriting"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[12px] font-bold transition-colors"
                    >
                      <span>Copywriting</span>
                      <ArrowRight className="w-3 h-3 text-primary" />
                    </Link>
                    <Link
                      to="/services/website-development"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[12px] font-bold transition-colors"
                    >
                      <span>Website Development</span>
                      <ArrowRight className="w-3 h-3 text-primary" />
                    </Link>
                    <Link
                      to="/services/ecommerce-development"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[12px] font-bold transition-colors"
                    >
                      <span>E-commerce Stores</span>
                      <ArrowRight className="w-3 h-3 text-primary" />
                    </Link>
                    <Link
                      to="/services/wordpress-shopify-development"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[12px] font-bold transition-colors"
                    >
                      <span>WordPress &amp; Shopify</span>
                      <ArrowRight className="w-3 h-3 text-primary" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BrandingLogoDesign;
