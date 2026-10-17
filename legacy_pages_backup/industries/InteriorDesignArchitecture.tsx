import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Check,
  X,
  Compass,
  Ruler,
  Layers,
  MapPin,
  Search,
  Sparkles,
  Bot,
  Award,
  Star,
  Phone,
  Navigation,
  Home,
  Building2,
  Utensils,
  Store,
  Trees,
  Sofa,
  Palette,
  Camera,
  Sliders,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle2,
  Loader2,
  MoveHorizontal,
} from 'lucide-react';
import { industries, IndustryIcon } from '../Industries';

const portfolioShowcase =
  '/src/assets/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const webDevWorkspace =
  '/src/assets/images/hero_laptop_ui_showcase_1791104898778.jpg';
const agencyTeamCollab =
  '/src/assets/images/project_ai_enterprise_ui_1791104952051.jpg';
const aboutValuesCollaboration =
  '/src/assets/images/why_webxcode_team_office_1791104914357.jpg';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT INTERIOR DESIGN & ARCHITECTURE ITEM
============================================================================ */
const interiorIndustry =
  industries.find((item) => item.slug === 'interior-design-architecture') ||
  industries[2];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS
============================================================================ */

/* Section 2: Who We Serve — 6 Floor Plan Rooms */
const STUDIO_ROOMS = [
  {
    id: 'interior-studios',
    code: 'RM-01',
    name: 'Interior Design Studios',
    area: '2,400 SQ FT',
    desc: 'Editorial portfolio websites, room-by-room case studies, and pre-qualified homeowner enquiry systems.',
    chips: ['Editorial Portfolios', 'High-Budget Lead Filter'],
    gridSpan: 'col-span-12 md:col-span-7',
  },
  {
    id: 'architecture-firms',
    code: 'RM-02',
    name: 'Architecture Firms',
    area: '3,100 SQ FT',
    desc: 'Monograph-grade digital archives with drawings, spatial narratives, and commercial RFP readiness.',
    chips: ['Project Monographs', 'Drawing & Render Galleries'],
    gridSpan: 'col-span-12 md:col-span-5',
  },
  {
    id: 'turnkey-contractors',
    code: 'RM-03',
    name: 'Turnkey Contractors',
    area: '1,950 SQ FT',
    desc: 'Before/after transformation galleries, package estimators, and Google Ads that capture ready-to-build clients.',
    chips: ['Before/After Sliders', 'High-Intent Google Ads'],
    gridSpan: 'col-span-12 md:col-span-4',
  },
  {
    id: 'modular-kitchen',
    code: 'RM-04',
    name: 'Modular Kitchen & Wardrobe',
    area: '1,600 SQ FT',
    desc: 'Layout-wise finish configurators, showroom locator SEO, and instant WhatsApp consultation booking.',
    chips: ['Finish Catalogues', 'Showroom Local SEO'],
    gridSpan: 'col-span-12 md:col-span-4',
  },
  {
    id: 'landscape-designers',
    code: 'RM-05',
    name: 'Landscape Designers',
    area: '1,800 SQ FT',
    desc: 'Outdoor living showcases, villa & resort masterplan stories, and seasonal care enquiry funnels.',
    chips: ['Masterplan Galleries', 'Villa & Hospitality Leads'],
    gridSpan: 'col-span-12 md:col-span-4',
  },
  {
    id: 'furniture-decor',
    code: 'RM-06',
    name: 'Furniture & Décor Studios',
    area: '2,200 SQ FT',
    desc: 'Bespoke collection lookbooks, trade buyer portals, and studio appointment scheduling.',
    chips: ['Bespoke Lookbooks', 'Trade & Showroom Bookings'],
    gridSpan: 'col-span-12',
  },
];

/* Section 4: Services — 6 Material Swatch Cards (No Social Media Marketing) */
const SWATCH_SERVICES = [
  {
    code: 'WX-01',
    textureName: 'TIMBER GRAIN // 01',
    patternType: 'wood',
    title: 'Portfolio Website Design',
    desc: 'Editorial, image-led websites that feel like your brand and frame every project like an architecture monograph.',
    bullets: [
      'Custom typography & spacious architectural grids',
      'Retina-ready WebP/AVIF galleries that load in under 1.5s',
      'Mobile-first touch galleries for clients browsing on phones',
    ],
    icon: Compass,
  },
  {
    code: 'WX-02',
    textureName: 'ARCHITECTURAL CONCRETE // 02',
    patternType: 'concrete',
    title: 'Project Galleries & Case Studies',
    desc: 'Filterable projects with before/after sliders and deep story pages covering brief, materials, and execution.',
    bullets: [
      'Filter by Residential, Commercial, Villa, or Turnkey',
      'Interactive Before / After room transformation sliders',
      'Floor-plan lightbox & material board breakdowns',
    ],
    icon: Layers,
  },
  {
    code: 'WX-03',
    textureName: 'LINEN WEAVE // 03',
    patternType: 'fabric',
    title: 'Local SEO & Google Business Profile',
    desc: 'Rank for "interior designer near me" and "architect in [city]" across Google Search and Google Maps.',
    bullets: [
      'Google Business Profile optimization with project photos',
      'Dedicated affluent neighborhood & city landing pages',
      'Automated client review generation after handover',
    ],
    icon: MapPin,
  },
  {
    code: 'WX-04',
    textureName: 'CARRARA VEIN // 04',
    patternType: 'marble',
    title: 'Google Ads for High-Value Projects',
    desc: 'Search campaigns targeting serious, budget-ready homeowners, villa owners, and commercial developers.',
    bullets: [
      'High-intent keywords ("luxury home interior", "turnkey architect")',
      'Negative keyword filtering to block cheap/DIY clicks',
      'Dedicated conversion landing pages with budget filters',
    ],
    icon: Search,
  },
  {
    code: 'WX-05',
    textureName: 'BRUSHED STEEL // 05',
    patternType: 'steel',
    title: 'Branding & Logo Design',
    desc: 'Identity, monograms, color systems, and editorial pitch decks that match your studio’s signature aesthetic.',
    bullets: [
      'Architectural wordmarks & minimalist studio monograms',
      'Typography, color palette & drawing title-block templates',
      'Cohesive proposal & client handover presentation kits',
    ],
    icon: Palette,
  },
  {
    code: 'WX-06',
    textureName: 'TERRAZZO GRID // 06',
    patternType: 'terrazzo',
    title: 'AI Enquiry Assistant & WhatsApp Bot',
    desc: 'Answers questions 24/7, collects floor plans, property size, and budget, and books site visits automatically.',
    bullets: [
      'Captures carpet area, possession date & budget on WhatsApp',
      'Shares relevant portfolio PDFs based on room/project type',
      'Books discovery calls directly into the principal’s calendar',
    ],
    icon: Bot,
  },
];

/* Section 5: Portfolio Website Anatomy — 6 Hotspots */
const PORTFOLIO_HOTSPOTS = [
  {
    id: 1,
    num: '01',
    title: 'Full-screen hero',
    desc: 'Your best project, front and center — full-bleed architectural photography with minimal editorial type.',
    top: '22%',
    left: '26%',
  },
  {
    id: 2,
    num: '02',
    title: 'Filterable project gallery',
    desc: 'Residential, commercial, hospitality & turnkey filters so prospects immediately see spaces like theirs.',
    top: '48%',
    left: '20%',
  },
  {
    id: 3,
    num: '03',
    title: 'Before / after slider',
    desc: 'Show the transformation from bare shell or outdated layout to finished luxury space.',
    top: '46%',
    left: '54%',
  },
  {
    id: 4,
    num: '04',
    title: 'Project story pages',
    desc: 'Brief, floor plan, process, materials palette, and final photography presented like a magazine feature.',
    top: '68%',
    left: '36%',
  },
  {
    id: 5,
    num: '05',
    title: 'Reviews & awards',
    desc: 'Verified Google reviews, Architectural Digest / Elle Decor features, and COA / IIID credentials.',
    top: '76%',
    left: '68%',
  },
  {
    id: 6,
    num: '06',
    title: 'Smart enquiry form',
    desc: 'Captures project type, square footage, budget tier, and possession timeline before you pick up the phone.',
    top: '26%',
    left: '78%',
  },
];

/* Section 7: Smart Multi-Step Enquiry Form Options */
const PROJECT_TYPES = [
  { id: 'Full Home', label: 'Full Home', sub: 'Apartment / Penthouse', icon: Home },
  { id: 'Kitchen', label: 'Kitchen', sub: 'Modular & Island', icon: Utensils },
  { id: 'Office', label: 'Office', sub: 'Corporate & Studio', icon: Building2 },
  { id: 'Retail / Café', label: 'Retail / Café', sub: 'Hospitality & Store', icon: Store },
  { id: 'Villa / Bungalow', label: 'Villa / Bungalow', sub: 'Architecture & Turnkey', icon: Trees },
];

const SPACE_SIZES = [
  'Under 1,000 sq ft',
  '1,000–2,500 sq ft',
  '2,500–5,000 sq ft',
  '5,000+ sq ft',
];

const BUDGET_TIERS = ['Under ₹5L', '₹5–15L', '₹15–40L', '₹40L+'];

const TIMELINE_OPTIONS = [
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Just planning',
];

/* Section 8: Case Study — Editorial Magazine Spread */
const STUDIO_CASE_STUDY = {
  studioName: 'Studio Arka & Associates (Placeholder)',
  caption:
    'PROJECT FEATURE // THE VERANDAH RESIDENCE, SOUTH DELHI — 4,800 SQ FT TURNKEY ARCHITECTURE & INTERIORS',
  quote:
    'For eight years we relied 100% on word of mouth. Within four months of launching our new WebXCode portfolio and Local SEO system, we signed three full-villa turnkey projects directly from Google Search.',
  clientName: 'Ar. Meera Deshmukh',
  clientRole: 'Principal Architect, Studio Arka (Placeholder)',
  metrics: [
    { value: '3.2x', label: 'QUALIFIED ENQUIRIES' },
    { value: '+260%', label: 'GOOGLE MAP VIEWS' },
    { value: '₹25L+', label: 'AVERAGE PROJECT SIZE' },
  ],
};

/* Section 9: Our Process — 5 Dimension-Line Segments */
const PROCESS_SEGMENTS = [
  {
    step: '01',
    week: 'Week 1',
    title: 'Brief & Moodboard',
    desc: 'Understand your style, clients and goals',
  },
  {
    step: '02',
    week: 'Week 1–2',
    title: 'Photo & Content Curation',
    desc: 'Select and organize your best projects',
  },
  {
    step: '03',
    week: 'Week 2–3',
    title: 'Design',
    desc: 'Editorial layouts that match your brand',
  },
  {
    step: '04',
    week: 'Week 3–5',
    title: 'Build & SEO',
    desc: 'Fast galleries, local SEO, enquiry system',
  },
  {
    step: '05',
    week: 'Week 6',
    title: 'Launch & Grow',
    desc: 'Go live, Google Business setup, ads',
  },
];

/* Section 10: FAQ — 6 Studio Questions */
const DESIGN_STUDIO_FAQS = [
  {
    question: 'Can you make my website look like my design style?',
    answer:
      'Yes. We never force your work into a generic corporate template. Whether your aesthetic is warm tropical modernism, minimalist brutalism, or classic luxury, we craft custom typography, spacing, and moodboard-driven layouts that mirror your studio’s signature sensibility.',
  },
  {
    question: "I don't have professional photos — can you help?",
    answer:
      'Absolutely. We help you curate your strongest 3D renders, elevation drawings, moodboards, and site photography, enhance image grading for consistency, and guide you on shooting future project handovers for maximum visual impact.',
  },
  {
    question: 'How do you get my studio to rank on Google Maps?',
    answer:
      'We optimize your Google Business Profile with geo-tagged project photos, service categories (Interior Designer, Architect, Turnkey Contractor), local citations, neighborhood-specific landing pages on your website, and an automated WhatsApp review system for completed clients.',
  },
  {
    question: 'Can the website filter out low-budget enquiries?',
    answer:
      'Yes. Instead of a plain name-and-phone form, we build a guided multi-step project configurator where prospects select their property type, square footage, budget tier, and timeline. You immediately see which enquiries match your minimum project value.',
  },
  {
    question: 'Can I add new projects myself after launch?',
    answer:
      'Yes. We deliver an intuitive visual CMS where your team can upload a new project title, location, square footage, before/after photos, and gallery images in under 5 minutes—with automatic image compression built in.',
  },
  {
    question: 'How much does a portfolio website cost?',
    answer:
      'A custom editorial portfolio website for an interior designer or architecture studio typically starts from ₹65,000 ($900) depending on project gallery depth, interactive configurators, and Local SEO city pages. Request a free review for an exact quote.',
  },
];

/* ============================================================================
   MAIN INTERIOR DESIGN & ARCHITECTURE PAGE COMPONENT
============================================================================ */
const InteriorDesignArchitecture: React.FC<{
  onOpenQuoteModal: (service?: string) => void;
}> = ({ onOpenQuoteModal }) => {
  const prefersReducedMotion = useReducedMotion();

  /* Section 1: Blueprint-to-Reality Slider State (0 to 100%) */
  const [revealPercent, setRevealPercent] = useState<number>(62);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const heroSliderRef = useRef<HTMLDivElement | null>(null);

  /* Section 2: Interactive Floor Plan Selected Room */
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    STUDIO_ROOMS[0].id
  );

  /* Section 5: Anatomy Hotspot Active ID */
  const [activeHotspotId, setActiveHotspotId] = useState<number>(1);

  /* Section 6: Typing Animation for Local SEO Search Bar */
  const fullSearchPhrase = 'interior designer near me';
  const [typedQuery, setTypedQuery] = useState<string>(fullSearchPhrase);

  /* Section 7: Smart Multi-Step Enquiry Form State */
  const [demoStep, setDemoStep] = useState<number>(1);
  const [demoData, setDemoData] = useState({
    projectType: 'Full Home',
    spaceSize: '2,500–5,000 sq ft',
    budget: '₹15–40L',
    timeline: '1–3 months',
  });

  /* Section 10: FAQ Accordion State */
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  /* Section 11: Free Portfolio Review Form State */
  const [reviewForm, setReviewForm] = useState({
    name: '',
    contact: '',
    url: '',
  });
  const [reviewErrors, setReviewErrors] = useState<{
    name?: string;
    contact?: string;
    url?: string;
  }>({});
  const [reviewSubmitting, setReviewSubmitting] = useState<boolean>(false);
  const [reviewSuccess, setReviewSuccess] = useState<boolean>(false);

  /* SEO Meta & Document Title */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Websites, SEO & Marketing for Interior Designers & Architects | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Premium portfolio websites, project case-study galleries, Local SEO, Google Ads and AI lead pre-qualification for interior design studios and architecture firms.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Initial Blueprint-to-Render Wipe Animation on Mount */
  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealPercent(65);
      return;
    }
    setRevealPercent(15);
    const timer = setTimeout(() => {
      setRevealPercent(65);
    }, 350);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  /* Typing Loop for Local SEO Search Bar */
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedQuery(fullSearchPhrase);
      return;
    }
    let idx = 0;
    let forward = true;
    const interval = setInterval(() => {
      if (forward) {
        idx += 1;
        setTypedQuery(fullSearchPhrase.slice(0, idx));
        if (idx >= fullSearchPhrase.length) {
          forward = false;
        }
      } else {
        idx = 0;
        forward = true;
        setTypedQuery('');
      }
    }, 150);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  /* Blueprint Slider Pointer Handlers */
  const updateSliderFromClientX = (clientX: number) => {
    if (!heroSliderRef.current) return;
    const rect = heroSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const pct = Math.round((x / rect.width) * 100);
    setRevealPercent(Math.max(5, Math.min(95, pct)));
  };

  useEffect(() => {
    if (!isDraggingSlider) return;
    const onMove = (e: MouseEvent) => updateSliderFromClientX(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateSliderFromClientX(e.touches[0].clientX);
    };
    const onUp = () => setIsDraggingSlider(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDraggingSlider]);

  /* Section 11 Review Submit Handler */
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; contact?: string; url?: string } = {};

    if (!reviewForm.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (!reviewForm.contact.trim()) {
      errors.contact = 'Please enter your email or WhatsApp number.';
    }
    if (!reviewForm.url.trim()) {
      errors.url = 'Please share your website or Google Business link.';
    }

    setReviewErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setReviewSubmitting(true);
    // TODO: Connect portfolio review submission to backend endpoint
    setTimeout(() => {
      setReviewSubmitting(false);
      setReviewSuccess(true);
    }, 650);
  };

  const selectedRoom =
    STUDIO_ROOMS.find((r) => r.id === selectedRoomId) || STUDIO_ROOMS[0];
  const activeHotspot =
    PORTFOLIO_HOTSPOTS.find((h) => h.id === activeHotspotId) ||
    PORTFOLIO_HOTSPOTS[0];
  const isHighValueLead =
    demoData.budget === '₹15–40L' || demoData.budget === '₹40L+';
  const otherIndustries = industries.filter(
    (ind) => ind.slug !== 'interior-design-architecture'
  );

  /* JSON-LD Structured Data (Service, BreadcrumbList, FAQPage) */
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Websites, SEO & Marketing for Interior Designers & Architects',
      serviceType:
        'Portfolio Website Design, Project Galleries, Local SEO, Google Ads & AI Enquiry Systems',
      audience: {
        '@type': 'Audience',
        audienceType: 'Interior designers and architecture firms',
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
          name: interiorIndustry.name,
          item: 'https://webxcode.com/industries/interior-design-architecture',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: DESIGN_STUDIO_FAQS.map((faq) => ({
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

      {/* Custom Architectural Drafting & Swatch Styles (Strict 3-color system) */}
      <style>{`
        .arch-drafting-grid-dark {
          background-image:
            linear-gradient(to right, rgba(5, 113, 194, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(5, 113, 194, 0.14) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        .arch-drafting-grid-light {
          background-image:
            linear-gradient(to right, rgba(5, 113, 194, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(5, 113, 194, 0.08) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .swatch-wood {
          background: repeating-linear-gradient(
            90deg,
            rgba(5, 113, 194, 0.14) 0px,
            rgba(5, 113, 194, 0.14) 8px,
            rgba(30, 36, 46, 0.06) 8px,
            rgba(30, 36, 46, 0.06) 18px
          );
        }
        .swatch-concrete {
          background: radial-gradient(rgba(30, 36, 46, 0.16) 1px, transparent 1px),
                      radial-gradient(rgba(5, 113, 194, 0.18) 1px, rgba(5, 113, 194, 0.08) 1px);
          background-size: 14px 14px;
          background-position: 0 0, 7px 7px;
        }
        .swatch-fabric {
          background:
            repeating-linear-gradient(0deg, rgba(5, 113, 194, 0.12) 0px, rgba(5, 113, 194, 0.12) 2px, transparent 2px, transparent 6px),
            repeating-linear-gradient(90deg, rgba(30, 36, 46, 0.08) 0px, rgba(30, 36, 46, 0.08) 2px, transparent 2px, transparent 6px);
        }
        .swatch-marble {
          background: repeating-linear-gradient(
            135deg,
            rgba(5, 113, 194, 0.06) 0px,
            rgba(5, 113, 194, 0.06) 14px,
            rgba(5, 113, 194, 0.22) 14px,
            rgba(30, 36, 46, 0.08) 16px,
            rgba(255, 255, 255, 0.9) 28px
          );
        }
        .swatch-steel {
          background: linear-gradient(
            110deg,
            rgba(30, 36, 46, 0.12) 0%,
            rgba(5, 113, 194, 0.18) 45%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(5, 113, 194, 0.14) 55%,
            rgba(30, 36, 46, 0.12) 100%
          );
        }
        .swatch-terrazzo {
          background-color: rgba(5, 113, 194, 0.08);
          background-image:
            radial-gradient(circle at 20% 35%, rgba(5, 113, 194, 0.35) 3px, transparent 4px),
            radial-gradient(circle at 75% 65%, rgba(30, 36, 46, 0.25) 4px, transparent 5px),
            radial-gradient(circle at 45% 80%, rgba(5, 113, 194, 0.25) 2px, transparent 3px),
            radial-gradient(circle at 85% 25%, rgba(30, 36, 46, 0.18) 3px, transparent 4px);
          background-size: 38px 38px;
        }
      `}</style>

      {/* ====================================================================
          1. HERO — BLUEPRINT TO REALITY (45/55 split, edge to edge)
      ==================================================================== */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] lg:min-h-[720px]">
          {/* Left 45% (5 cols on desktop, order-2 on mobile so image is on top) */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative flex items-center px-4 sm:px-8 lg:pl-12 xl:pl-20 lg:pr-10 py-14 lg:py-20 arch-drafting-grid-dark border-t lg:border-t-0 lg:border-r border-primary/25">
            <div className="relative z-10 max-w-xl">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="inline-flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/70 mb-6"
              >
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
                <Link
                  to="/industries"
                  className="hover:text-white transition-colors"
                >
                  Industries
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
                <span className="text-white font-semibold" aria-current="page">
                  {interiorIndustry.name}
                </span>
              </nav>

              {/* Pill Label */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em]">
                  <Compass className="w-3.5 h-3.5 text-primary" />
                  <span>INTERIOR DESIGN &amp; ARCHITECTURE</span>
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[34px] sm:text-[44px] xl:text-[50px] font-extrabold leading-[1.08] tracking-tight mb-5">
                Websites as Beautiful as{' '}
                <span className="text-primary">the Spaces You Design</span>
              </h1>

              {/* Paragraph */}
              <p className="text-[16px] sm:text-[17px] text-white/75 leading-relaxed mb-8">
                We build premium portfolio websites, local SEO and lead systems
                for interior designers and architects — so the right clients
                find you, trust you and call you.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-9">
                <a
                  href="#review"
                  className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Get a Free Portfolio Review</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/our-work"
                  className="px-7 py-4 rounded-full border border-white/30 hover:border-white hover:bg-white/10 text-white font-bold text-[15px] transition-all inline-flex items-center gap-2"
                >
                  <span>See Design Work</span>
                </Link>
              </div>

              {/* Small Uppercase Caption Row */}
              <div className="pt-5 border-t border-white/15">
                <p className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-white/60">
                  Residential · Commercial · Hospitality · Turnkey
                </p>
              </div>
            </div>
          </div>

          {/* Right 55% (7 cols on desktop, order-1 on mobile) — Edge-to-Edge Blueprint-to-Reality Interactive Reveal */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative min-h-[380px] sm:min-h-[480px] lg:min-h-full bg-navy flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none">
            {/* Corner Crop Marks Around Image Frame */}
            <div className="relative flex-1 w-full rounded-[10px] overflow-hidden border border-primary/40 shadow-2xl">
              {/* Top-left crop mark */}
              <span className="pointer-events-none absolute top-2.5 left-2.5 z-30 w-4 h-4 border-t-2 border-l-2 border-white/80" />
              {/* Top-right crop mark */}
              <span className="pointer-events-none absolute top-2.5 right-2.5 z-30 w-4 h-4 border-t-2 border-r-2 border-white/80" />
              {/* Bottom-left crop mark */}
              <span className="pointer-events-none absolute bottom-2.5 left-2.5 z-30 w-4 h-4 border-b-2 border-l-2 border-white/80" />
              {/* Bottom-right crop mark */}
              <span className="pointer-events-none absolute bottom-2.5 right-2.5 z-30 w-4 h-4 border-b-2 border-r-2 border-white/80" />

              {/* Interactive Slider Container */}
              <div
                ref={heroSliderRef}
                onMouseDown={(e) => {
                  setIsDraggingSlider(true);
                  updateSliderFromClientX(e.clientX);
                }}
                onTouchStart={(e) => {
                  setIsDraggingSlider(true);
                  if (e.touches[0]) {
                    updateSliderFromClientX(e.touches[0].clientX);
                  }
                }}
                className="relative w-full h-full min-h-[350px] sm:min-h-[440px] lg:min-h-[580px] cursor-ew-resize"
              >
                {/* BASE LAYER: BLUEPRINT WIREFRAME + CAD PHOTO VERSION */}
                <div className="absolute inset-0 bg-navy arch-drafting-grid-dark">
                  <img
                    src={interiorIndustry.image || portfolioShowcase}
                    alt="Architectural blueprint elevation of luxury residential living space"
                    className="w-full h-full object-cover opacity-35 mix-blend-luminosity contrast-150 invert"
                  />
                  {/* Architectural SVG CAD Overlay Lines */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
                    viewBox="0 0 800 600"
                    preserveAspectRatio="none"
                  >
                    {/* Perspective Room Wireframe Lines in Primary Blue & White */}
                    <rect
                      x="60"
                      y="50"
                      width="680"
                      height="500"
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                    <line
                      x1="60"
                      y1="50"
                      x2="220"
                      y2="160"
                      stroke="#0571c2"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="740"
                      y1="50"
                      x2="580"
                      y2="160"
                      stroke="#0571c2"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="60"
                      y1="550"
                      x2="220"
                      y2="430"
                      stroke="#0571c2"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="740"
                      y1="550"
                      x2="580"
                      y2="430"
                      stroke="#0571c2"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="220"
                      y="160"
                      width="360"
                      height="270"
                      fill="none"
                      stroke="#ffffff"
                      strokeOpacity="0.55"
                      strokeWidth="1.2"
                    />
                    {/* Sofa & Island CAD Blocks */}
                    <rect
                      x="180"
                      y="360"
                      width="260"
                      height="95"
                      fill="rgba(5,113,194,0.18)"
                      stroke="#0571c2"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="480"
                      y="330"
                      width="140"
                      height="130"
                      fill="rgba(5,113,194,0.12)"
                      stroke="#ffffff"
                      strokeOpacity="0.6"
                      strokeWidth="1.2"
                    />
                    {/* Elevation Callout Texts */}
                    <text
                      x="85"
                      y="82"
                      fill="#ffffff"
                      fontSize="11"
                      fontFamily="monospace"
                      letterSpacing="2"
                    >
                      DWG // ELEVATION A-01 · SCALE 1:50
                    </text>
                    <text
                      x="235"
                      y="185"
                      fill="#0571c2"
                      fontSize="11"
                      fontFamily="monospace"
                      letterSpacing="1.5"
                    >
                      GLAZING SPAN: 4,200 MM
                    </text>
                    <text
                      x="195"
                      y="385"
                      fill="#ffffff"
                      fontSize="10"
                      fontFamily="monospace"
                      letterSpacing="1.5"
                    >
                      BESPOKE LOUNGE MODULE
                    </text>
                  </svg>
                </div>

                {/* REVEALED LAYER: FULL-COLOR LUXURY RENDER PHOTOGRAPH (clipped left-to-right) */}
                <div
                  style={{
                    clipPath: `inset(0 ${100 - revealPercent}% 0 0)`,
                    transition: isDraggingSlider
                      ? 'none'
                      : 'clip-path 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={interiorIndustry.image || portfolioShowcase}
                    alt="Completed luxury architectural living room and interior design"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-navy/25" />
                </div>

                {/* Top Corner Labels: "Render" (left) & "Blueprint" (right) */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-navy/85 backdrop-blur-xs border border-white/25 text-white text-[11px] font-bold uppercase tracking-[0.14em]">
                    Render
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-20 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-xs border border-white/30 text-white text-[11px] font-bold uppercase tracking-[0.14em]">
                    Blueprint
                  </span>
                </div>

                {/* Vertical Draggable Handle with Keyboard Support */}
                <div
                  style={{
                    left: `${revealPercent}%`,
                    transition: isDraggingSlider
                      ? 'none'
                      : 'left 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="absolute top-0 bottom-0 z-30 -translate-x-1/2 flex flex-col items-center justify-center"
                >
                  <div className="w-0.5 h-full bg-white shadow-[0_0_12px_rgba(5,113,194,0.9)]" />
                  <button
                    type="button"
                    role="slider"
                    aria-label="Slide between architectural blueprint and finished interior photo"
                    aria-valuemin={5}
                    aria-valuemax={95}
                    aria-valuenow={revealPercent}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        setRevealPercent((p) => Math.max(5, p - 5));
                      } else if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        setRevealPercent((p) => Math.min(95, p + 5));
                      }
                    }}
                    className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-primary text-white border-2 border-white shadow-xl flex items-center justify-center cursor-ew-resize focus:outline-none focus:ring-4 focus:ring-white/40"
                  >
                    <MoveHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Dimension Line with Tick Marks: "Concept → Completion" */}
            <div className="mt-4 px-2">
              <div className="relative flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                {/* Left Tick */}
                <span className="w-0.5 h-3 bg-primary shrink-0" />
                {/* Left Dimension Line */}
                <div className="flex-1 h-px bg-primary/60 mx-2 relative">
                  <span className="absolute left-1/4 -top-1 w-px h-2 bg-primary/60" />
                  <span className="absolute left-2/4 -top-1 w-px h-2 bg-primary/60" />
                  <span className="absolute left-3/4 -top-1 w-px h-2 bg-primary/60" />
                </div>
                <span className="px-3 py-0.5 rounded-full bg-white/5 border border-primary/40 text-white shrink-0">
                  Concept <span className="text-primary">→</span> Completion (
                  {revealPercent}% Reveal)
                </span>
                {/* Right Dimension Line */}
                <div className="flex-1 h-px bg-primary/60 mx-2 relative">
                  <span className="absolute left-1/4 -top-1 w-px h-2 bg-primary/60" />
                  <span className="absolute left-2/4 -top-1 w-px h-2 bg-primary/60" />
                  <span className="absolute left-3/4 -top-1 w-px h-2 bg-primary/60" />
                </div>
                {/* Right Tick */}
                <span className="w-0.5 h-3 bg-primary shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. WHO WE SERVE — INTERACTIVE FLOOR PLAN (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                WHO WE WORK WITH
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Designed for Every{' '}
                <span className="text-primary">Design Business</span>
              </h2>
            </div>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-navy-50">
              CLICK OR HOVER ANY STUDIO ZONE ON THE FLOOR PLAN:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 65% (8 cols): Interactive Architectural Floor Plan Drawing */}
            <div className="lg:col-span-8 bg-white rounded-[12px] p-4 sm:p-7 border-2 border-navy arch-drafting-grid-light relative shadow-soft">
              {/* Top Architectural Title Block Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-navy/20 text-[11px] font-bold uppercase tracking-[0.16em] text-navy-50">
                <span>FLOOR PLAN // SECTOR LAYOUT A-02</span>
                <span className="text-primary">6 SPECIALIZED STUDIO ZONES</span>
              </div>

              {/* 12-Col Architectural Floor-Plan Grid */}
              <div className="grid grid-cols-12 gap-2.5 sm:gap-3">
                {STUDIO_ROOMS.map((room) => {
                  const isActive = selectedRoomId === room.id;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      aria-pressed={isActive}
                      onMouseEnter={() => setSelectedRoomId(room.id)}
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`${room.gridSpan} relative text-left p-4 sm:p-5 min-h-[120px] sm:min-h-[138px] rounded-[8px] border-2 transition-all cursor-pointer flex flex-col justify-between group focus:outline-none focus:ring-2 focus:ring-primary ${
                        isActive
                          ? 'bg-primary-50 border-primary shadow-md'
                          : 'bg-white/90 hover:bg-primary-50/50 border-navy/35'
                      }`}
                    >
                      {/* Architectural Door Arc & Window Line Accents */}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute top-0 right-5 w-7 h-3.5 border-b border-l rounded-bl-full transition-colors ${
                          isActive
                            ? 'border-primary bg-primary/10'
                            : 'border-navy/30'
                        }`}
                      />
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute bottom-0 left-6 w-10 h-1 transition-colors ${
                          isActive ? 'bg-primary' : 'bg-navy/25'
                        }`}
                      />

                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-[0.16em] px-2 py-0.5 rounded-xs ${
                            isActive
                              ? 'bg-primary text-white'
                              : 'bg-primary-50 text-primary'
                          }`}
                        >
                          {room.code}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-navy-50 tabular-nums">
                          {room.area}
                        </span>
                      </div>

                      <div className="mt-3">
                        <h3
                          className={`text-[13px] sm:text-[14px] font-extrabold uppercase tracking-[0.1em] leading-snug ${
                            isActive ? 'text-primary' : 'text-navy'
                          }`}
                        >
                          {room.name}
                        </h3>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Dimension Legend */}
              <div className="mt-4 pt-3 border-t border-navy/15 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-navy-50">
                <span>NORTH ↑ · DRAWING REF: WXC-2025</span>
                <span>WALLS: 1PX ARCHITECTURAL BLUE</span>
              </div>
            </div>

            {/* Right 35% (4 cols): Side Detail Card */}
            <div className="lg:col-span-4">
              <div className="h-full bg-navy text-white rounded-[12px] p-6 sm:p-8 border border-navy shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-56 h-56 blue-glow pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedRoom.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15">
                      <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-[0.14em]">
                        {selectedRoom.code} · SELECTED ZONE
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                        {selectedRoom.area}
                      </span>
                    </div>

                    <h3 className="text-[24px] sm:text-[26px] font-extrabold text-white leading-snug mb-3">
                      {selectedRoom.name}
                    </h3>

                    <p className="text-[15px] text-white/80 leading-relaxed mb-6">
                      {selectedRoom.desc}
                    </p>

                    <div className="mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary block mb-2.5">
                        KEY DELIVERABLES
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedRoom.chips.map((chip) => (
                          <span
                            key={chip}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-primary/40 text-white text-[12px] font-bold"
                          >
                            <Check className="w-3.5 h-3.5 text-primary" />
                            <span>{chip}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="relative z-10 pt-5 border-t border-white/15">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenQuoteModal(`${selectedRoom.name} Website & SEO`)
                    }
                    className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Discuss {selectedRoom.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. "YOUR WORK IS BEAUTIFUL. IS YOUR WEBSITE?" (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              THE GAP
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Your Work Is Beautiful.{' '}
              <span className="text-primary">Is Your Website?</span>
            </h2>
          </div>

          {/* Side-by-Side Browser Mockups with Central "VS" Circle */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Center VS Badge on Desktop */}
            <div
              aria-hidden="true"
              className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-navy text-white border-4 border-primary-50 shadow-xl items-center justify-center font-extrabold text-[15px] tracking-wider"
            >
              VS
            </div>

            {/* LEFT MOCKUP: Typical Studio Website (desaturated, slightly faded) */}
            <div className="bg-white/80 rounded-[12px] p-6 sm:p-7 border border-navy-15 shadow-soft flex flex-col justify-between opacity-90">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-navy-08">
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-navy-50">
                    TYPICAL STUDIO WEBSITE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-navy-08 text-navy-70 text-[11px] font-bold">
                    Outdated &amp; Slow
                  </span>
                </div>

                {/* Faded Browser Window */}
                <div className="rounded-[8px] border border-navy-15 bg-primary-50/40 overflow-hidden mb-6">
                  <div className="px-3 py-2 bg-navy-08/60 flex items-center gap-1.5 border-b border-navy-08">
                    <span className="w-2.5 h-2.5 rounded-full bg-navy/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-navy/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-navy/25" />
                    <span className="ml-2 text-[11px] text-navy-50 font-mono truncate">
                      old-design-studio.com
                    </span>
                  </div>
                  <div className="p-4 space-y-3 grayscale opacity-75">
                    <div className="grid grid-cols-3 gap-2">
                      <img
                        src={webDevWorkspace}
                        alt="Cramped thumbnail gallery preview"
                        loading="lazy"
                        className="h-16 w-full object-cover rounded-[4px]"
                      />
                      <img
                        src={agencyTeamCollab}
                        alt="Small uncropped project thumbnail"
                        loading="lazy"
                        className="h-16 w-full object-cover rounded-[4px]"
                      />
                      <div className="h-16 rounded-[4px] bg-navy/10 flex items-center justify-center text-[10px] font-mono text-navy-50">
                        Loading...
                      </div>
                    </div>
                    <div className="p-2.5 rounded-[4px] bg-white border border-navy-08 text-[11px] text-navy-50">
                      Generic Contact Form: Name / Email / Message
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Architectural Callout Annotations with Muted ✕ */}
              <div className="space-y-2.5">
                {[
                  'Slow-loading images',
                  'No project stories',
                  'Hard to find on Google',
                  'No way to share budget',
                ].map((issue) => (
                  <div
                    key={issue}
                    className="flex items-center gap-3 text-[14px] font-semibold text-navy-70"
                  >
                    <span className="w-6 h-6 rounded-full bg-navy-08 text-navy-50 flex items-center justify-center shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </span>
                    <span className="w-5 h-px bg-navy/25 shrink-0" />
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT MOCKUP: WebXCode Portfolio Website (crisp, full color) */}
            <div className="bg-white rounded-[12px] p-6 sm:p-7 border-2 border-primary shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-navy-08">
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-primary">
                    WEBXCODE PORTFOLIO WEBSITE
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-primary text-white text-[11px] font-bold">
                    Editorial &amp; High-Converting
                  </span>
                </div>

                {/* Crisp Browser Window */}
                <div className="rounded-[8px] border border-primary/30 bg-navy overflow-hidden mb-6 shadow-md">
                  <div className="px-3 py-2 bg-navy flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                      <span className="ml-2 text-[11px] text-white/80 font-mono truncate">
                        yourstudio.com/projects/south-delhi-villa
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-primary uppercase">
                      0.9s Load
                    </span>
                  </div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={interiorIndustry.image || portfolioShowcase}
                      alt="Full-screen architectural portfolio showcase"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-primary block">
                          RESIDENTIAL TURNKEY · 4,800 SQ FT
                        </span>
                        <span className="text-[14px] font-extrabold text-white">
                          The Verandah Residence
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold">
                        Book Consultation →
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Architectural Callout Annotations with Blue ✓ */}
              <div className="space-y-2.5">
                {[
                  'Fast, high-res galleries',
                  'Case-study pages',
                  'Ranks for "interior designer near me"',
                  'Pre-qualified enquiries',
                ].map((win) => (
                  <div
                    key={win}
                    className="flex items-center gap-3 text-[14px] font-bold text-navy"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span className="w-5 h-px bg-primary shrink-0" />
                    <span>{win}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. SERVICES — MATERIAL SWATCH CARDS (white, 3×2 grid)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHAT WE BUILD
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Everything Your Studio{' '}
              <span className="text-primary">Needs Online</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SWATCH_SERVICES.map((srv) => {
              const Icon = srv.icon;
              const swatchClass =
                srv.patternType === 'wood'
                  ? 'swatch-wood'
                  : srv.patternType === 'concrete'
                  ? 'swatch-concrete'
                  : srv.patternType === 'fabric'
                  ? 'swatch-fabric'
                  : srv.patternType === 'marble'
                  ? 'swatch-marble'
                  : srv.patternType === 'steel'
                  ? 'swatch-steel'
                  : 'swatch-terrazzo';

              return (
                <article
                  key={srv.code}
                  className="group bg-white rounded-[12px] border border-navy-15 hover:border-primary shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Top Material Swatch Sample Strip */}
                    <div
                      className={`relative h-20 ${swatchClass} border-b border-navy-15 px-5 py-3 flex items-start justify-between transition-all duration-300`}
                    >
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-navy bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-navy-15">
                        {srv.textureName}
                      </span>
                      <span className="text-[11px] font-mono font-extrabold text-primary bg-white px-2.5 py-1 rounded-xs border border-primary/30 shadow-2xs">
                        {srv.code}
                      </span>

                      {/* Slide-up "Learn More →" strip on card hover */}
                      <button
                        type="button"
                        onClick={() => onOpenQuoteModal(srv.title)}
                        className="absolute inset-x-0 bottom-0 py-1.5 px-5 bg-primary text-white text-[11px] font-extrabold uppercase tracking-[0.14em] flex items-center justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-pointer"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <div className="w-11 h-11 rounded-[8px] bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>

                      <h3 className="text-[20px] font-extrabold text-navy mb-2">
                        {srv.title}
                      </h3>
                      <p className="text-[14px] text-navy-70 leading-relaxed mb-5">
                        {srv.desc}
                      </p>

                      <ul className="space-y-2">
                        {srv.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-[13px] font-semibold text-navy"
                          >
                            <span className="w-4 h-4 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 border-t border-navy-08/60 flex items-center justify-between text-[12px] font-bold">
                    <span className="text-navy-50 font-mono">
                      SAMPLE BOARD // {srv.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenQuoteModal(srv.title)}
                      className="text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Request Spec</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. PORTFOLIO WEBSITE ANATOMY — HOTSPOT MOCKUP (navy)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden">
        <div className="absolute inset-0 arch-drafting-grid-dark opacity-45 pointer-events-none" />
        <div className="absolute -right-24 top-1/3 w-[520px] h-[520px] blue-glow pointer-events-none" />

        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHAT&apos;S INSIDE
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight">
              Anatomy of a{' '}
              <span className="text-primary">High-Converting Portfolio</span>
            </h2>
          </div>

          {/* Large Centered Desktop Browser Mockup with 6 Pulsing Blue Hotspots */}
          <div className="rounded-[12px] border border-white/20 bg-navy shadow-2xl overflow-hidden">
            {/* Browser Top Chrome */}
            <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="w-3 h-3 rounded-full bg-white/25" />
                <span className="w-3 h-3 rounded-full bg-white/25" />
                <span className="ml-3 text-[12px] font-mono text-white/70">
                  https://studio-arka-architecture.com
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary hidden sm:inline">
                CLICK ANY PULSING NODE (01–06)
              </span>
            </div>

            {/* Interactive Mockup Canvas */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-navy overflow-hidden">
              <img
                src={interiorIndustry.image || portfolioShowcase}
                alt="Interior design studio website anatomy mockup"
                loading="lazy"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/30" />

              {/* Simulated UI Wireframe Blocks Inside the Browser */}
              <div className="absolute inset-4 sm:inset-8 pointer-events-none flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <span className="text-[12px] font-extrabold tracking-[0.2em] uppercase text-white">
                    STUDIO ARKA // ARCHITECTURE
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/80 text-white text-[11px] font-bold">
                    Book Site Visit
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-lg">
                  <div className="rounded-[6px] bg-white/10 backdrop-blur-xs border border-white/20 p-2.5">
                    <div className="text-[10px] font-bold text-primary uppercase">
                      Residential
                    </div>
                    <div className="text-[11px] font-bold text-white">
                      24 Projects
                    </div>
                  </div>
                  <div className="rounded-[6px] bg-white/10 backdrop-blur-xs border border-white/20 p-2.5">
                    <div className="text-[10px] font-bold text-primary uppercase">
                      Before / After
                    </div>
                    <div className="text-[11px] font-bold text-white">
                      Interactive Wipe
                    </div>
                  </div>
                  <div className="rounded-[6px] bg-white/10 backdrop-blur-xs border border-white/20 p-2.5">
                    <div className="text-[10px] font-bold text-primary uppercase">
                      4.9 ★ Google
                    </div>
                    <div className="text-[11px] font-bold text-white">
                      120+ Reviews
                    </div>
                  </div>
                </div>
              </div>

              {/* 6 Numbered Pulsing Blue Hotspots */}
              {PORTFOLIO_HOTSPOTS.map((spot) => {
                const isSelected = activeHotspotId === spot.id;
                return (
                  <div
                    key={spot.id}
                    style={{ top: spot.top, left: spot.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      type="button"
                      aria-expanded={isSelected}
                      aria-label={`Hotspot ${spot.num}: ${spot.title}`}
                      onMouseEnter={() => setActiveHotspotId(spot.id)}
                      onClick={() => setActiveHotspotId(spot.id)}
                      className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full font-extrabold text-[12px] sm:text-[13px] flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/50 ${
                        isSelected
                          ? 'bg-primary text-white scale-110 ring-4 ring-white shadow-xl'
                          : 'bg-navy/90 text-white border-2 border-primary hover:bg-primary'
                      }`}
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
                      <span className="relative">{spot.num}</span>
                    </button>

                    {/* Desktop Glass Tooltip Card Next to Active Hotspot */}
                    {isSelected && (
                      <div className="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 w-64 rounded-[10px] bg-navy/95 backdrop-blur-md border border-primary p-4 shadow-2xl z-30">
                        <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary mb-1">
                          NODE {spot.num}
                        </div>
                        <div className="text-[15px] font-extrabold text-white mb-1">
                          {spot.title}
                        </div>
                        <p className="text-[12px] text-white/80 leading-relaxed">
                          {spot.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Active Hotspot Bottom Sheet Card */}
            <div className="md:hidden p-5 bg-white/10 border-t border-white/15">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary mb-1">
                ACTIVE HOTSPOT {activeHotspot.num}
              </div>
              <h3 className="text-[18px] font-extrabold text-white mb-1">
                {activeHotspot.title}
              </h3>
              <p className="text-[14px] text-white/80 leading-relaxed">
                {activeHotspot.desc}
              </p>
            </div>
          </div>

          {/* Numbered Clickable Legend List Below Mockup */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_HOTSPOTS.map((spot) => {
              const isSelected = activeHotspotId === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveHotspotId(spot.id)}
                  className={`text-left p-4 rounded-[10px] border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-primary/20 border-primary text-white shadow-md'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full text-[12px] font-extrabold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'bg-white/10 text-primary'
                    }`}
                  >
                    {spot.num}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-extrabold text-white mb-0.5">
                      {spot.title}
                    </h3>
                    <p className="text-[12px] text-white/70 leading-relaxed">
                      {spot.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. GET FOUND LOCALLY — SEARCH & MAP MOCK (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 55% (7 cols): Stylized Search Bar + Map Card with 5 Pins */}
            <div className="lg:col-span-7">
              <div className="rounded-[12px] bg-primary-50/70 border border-primary-100 p-5 sm:p-7 shadow-soft">
                {/* Typing Search Bar Mock */}
                <div className="bg-white rounded-full px-5 py-3.5 border-2 border-primary shadow-sm flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3 min-w-0">
                    <Search className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-[15px] sm:text-[16px] font-bold text-navy truncate">
                      {typedQuery}
                      <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-extrabold uppercase tracking-wider shrink-0">
                    Google Local
                  </span>
                </div>

                {/* Simplified Architectural Map Canvas with 5 Pins */}
                <div className="relative h-[300px] sm:h-[330px] rounded-[10px] bg-white border border-navy-15 arch-drafting-grid-light overflow-hidden p-4 flex flex-col justify-between">
                  {/* Decorative Map Roads */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-1/3 inset-x-0 h-2 bg-primary/10" />
                    <div className="absolute top-2/3 inset-x-0 h-1.5 bg-navy/5" />
                    <div className="absolute left-1/4 inset-y-0 w-2 bg-primary/10" />
                    <div className="absolute left-3/4 inset-y-0 w-1.5 bg-navy/5" />
                  </div>

                  {/* 4 Smaller Muted Competitor Pins */}
                  <div className="relative z-10 flex items-center justify-between px-4 pt-2">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-navy-15 text-navy-50 text-[11px] font-bold shadow-2xs">
                      <MapPin className="w-3.5 h-3.5 text-navy-50" />
                      <span>3.8 ★</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-navy-15 text-navy-50 text-[11px] font-bold shadow-2xs">
                      <MapPin className="w-3.5 h-3.5 text-navy-50" />
                      <span>4.1 ★</span>
                    </div>
                  </div>

                  {/* Enlarged Primary Blue Featured Pin + Studio Listing Card */}
                  <div className="relative z-20 mx-auto w-full max-w-md bg-navy text-white rounded-[12px] p-4 sm:p-5 shadow-2xl border-2 border-primary">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary block">
                            #1 LOCAL MAP PACK RESULT
                          </span>
                          <h3 className="text-[17px] font-extrabold text-white">
                            [Your Studio Name]
                          </h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-white text-[11px] font-bold">
                        Open now
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[13px] font-bold text-white/90 mb-4">
                      <span className="text-primary font-extrabold">4.9</span>
                      <div
                        className="flex items-center gap-0.5 text-primary"
                        aria-label="4.9 out of 5 stars"
                      >
                        <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                        <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                        <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                        <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                        <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                      </div>
                      <span className="text-white/70">(120 reviews)</span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/80">
                        Interior Designer &amp; Architect
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="py-2 px-3 rounded-lg bg-primary text-white text-[12px] font-bold flex items-center justify-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Studio</span>
                      </div>
                      <div className="py-2 px-3 rounded-lg bg-white/10 text-white text-[12px] font-bold flex items-center justify-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-primary" />
                        <span>Directions</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom 2 Smaller Pins */}
                  <div className="relative z-10 flex items-center justify-between px-8 pb-1">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-navy-15 text-navy-50 text-[11px] font-bold shadow-2xs">
                      <MapPin className="w-3.5 h-3.5 text-navy-50" />
                      <span>4.0 ★</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-navy-15 text-navy-50 text-[11px] font-bold shadow-2xs">
                      <MapPin className="w-3.5 h-3.5 text-navy-50" />
                      <span>3.9 ★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 45% (5 cols): Explanation + 4 Check Points + CTA */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                LOCAL SEO
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-4">
                Be the First Studio{' '}
                <span className="text-primary">Clients Find</span>
              </h2>
              <p className="text-[16px] text-navy-70 leading-relaxed mb-6">
                When a homeowner or commercial client searches &ldquo;interior
                designer near me&rdquo; or &ldquo;best architect in [city]&rdquo;,
                over 70% of calls go to the top 3 studios in Google Maps and
                local organic results.
              </p>

              <ul className="space-y-3.5 mb-8">
                {[
                  'Google Business Profile optimization',
                  'City & locality landing pages',
                  'Review generation system',
                  'Local citations & map rankings',
                ].map((pt) => (
                  <li
                    key={pt}
                    className="flex items-center gap-3 text-[15px] font-bold text-navy"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#review"
                className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 shadow-md"
              >
                <span>Check My Local Visibility</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. SMART ENQUIRY FORM DEMO — MULTI-STEP (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              BETTER LEADS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              Stop Chasing{' '}
              <span className="text-primary">Low-Budget Enquiries</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-navy-70">
              Our enquiry forms pre-qualify every lead, so you only spend time
              on the right projects. Try the demo.
            </p>
          </div>

          {/* Centered White Card with 5-Step Progress Bar */}
          <div className="bg-white rounded-[16px] p-6 sm:p-10 border border-navy-15 shadow-xl">
            {/* Step Progress Header */}
            <div className="mb-8">
              <div
                aria-live="polite"
                className="flex items-center justify-between text-[12px] font-extrabold uppercase tracking-[0.14em] text-navy-50 mb-3"
              >
                <span>
                  STEP {demoStep} OF 5 —{' '}
                  {demoStep === 1
                    ? 'PROJECT TYPE'
                    : demoStep === 2
                    ? 'SPACE SIZE'
                    : demoStep === 3
                    ? 'BUDGET TIER'
                    : demoStep === 4
                    ? 'TIMELINE'
                    : 'STUDIO LEAD CARD SUMMARY'}
                </span>
                <span className="text-primary tabular-nums">
                  {demoStep * 20}% Complete
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((st) => (
                  <button
                    key={st}
                    type="button"
                    aria-label={`Go to step ${st}`}
                    onClick={() => setDemoStep(st)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      st <= demoStep ? 'bg-primary' : 'bg-primary-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={demoStep}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.2 }}
                className="min-h-[220px] flex flex-col justify-center"
              >
                {/* STEP 1: Project Type */}
                {demoStep === 1 && (
                  <div>
                    <h3 className="text-[20px] font-extrabold text-navy mb-4">
                      1. What type of space are you looking to design?
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {PROJECT_TYPES.map((item) => {
                        const Icon = item.icon;
                        const active = demoData.projectType === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                              setDemoData({ ...demoData, projectType: item.id })
                            }
                            className={`p-4 rounded-[12px] border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                              active
                                ? 'bg-primary text-white border-primary shadow-md'
                                : 'bg-primary-50/40 hover:bg-primary-50 text-navy border-navy-08'
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                                active
                                  ? 'bg-white text-primary'
                                  : 'bg-white text-primary shadow-2xs'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-[14px] font-extrabold leading-tight">
                                {item.label}
                              </div>
                              <div
                                className={`text-[11px] mt-0.5 ${
                                  active ? 'text-white/80' : 'text-navy-50'
                                }`}
                              >
                                {item.sub}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: Space Size */}
                {demoStep === 2 && (
                  <div>
                    <h3 className="text-[20px] font-extrabold text-navy mb-4">
                      2. Approximate carpet / built-up area?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {SPACE_SIZES.map((sz) => {
                        const active = demoData.spaceSize === sz;
                        return (
                          <button
                            key={sz}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                              setDemoData({ ...demoData, spaceSize: sz })
                            }
                            className={`px-5 py-4 rounded-[12px] border-2 font-extrabold text-[15px] flex items-center justify-between transition-all cursor-pointer ${
                              active
                                ? 'bg-primary text-white border-primary shadow-md'
                                : 'bg-primary-50/40 hover:bg-primary-50 text-navy border-navy-08'
                            }`}
                          >
                            <span>{sz}</span>
                            {active && <Check className="w-4 h-4" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: Budget */}
                {demoStep === 3 && (
                  <div>
                    <h3 className="text-[20px] font-extrabold text-navy mb-4">
                      3. Estimated interior / architectural budget?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {BUDGET_TIERS.map((b) => {
                        const active = demoData.budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                              setDemoData({ ...demoData, budget: b })
                            }
                            className={`px-5 py-4 rounded-[12px] border-2 font-extrabold text-[15px] flex items-center justify-between transition-all cursor-pointer ${
                              active
                                ? 'bg-primary text-white border-primary shadow-md'
                                : 'bg-primary-50/40 hover:bg-primary-50 text-navy border-navy-08'
                            }`}
                          >
                            <span>{b}</span>
                            {(b === '₹15–40L' || b === '₹40L+') && (
                              <span
                                className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                  active
                                    ? 'bg-white text-primary'
                                    : 'bg-primary-50 text-primary'
                                }`}
                              >
                                Target Tier
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: Timeline */}
                {demoStep === 4 && (
                  <div>
                    <h3 className="text-[20px] font-extrabold text-navy mb-4">
                      4. When would you like to start work on site?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {TIMELINE_OPTIONS.map((t) => {
                        const active = demoData.timeline === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                              setDemoData({ ...demoData, timeline: t })
                            }
                            className={`px-5 py-4 rounded-[12px] border-2 font-extrabold text-[15px] flex items-center justify-between transition-all cursor-pointer ${
                              active
                                ? 'bg-primary text-white border-primary shadow-md'
                                : 'bg-primary-50/40 hover:bg-primary-50 text-navy border-navy-08'
                            }`}
                          >
                            <span>{t}</span>
                            {active && <Check className="w-4 h-4" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 5: Summary — Studio Lead Card */}
                {demoStep === 5 && (
                  <div className="rounded-[12px] bg-navy text-white p-6 sm:p-7 border border-primary">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/15">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary block">
                          INCOMING STUDIO LEAD NOTIFICATION
                        </span>
                        <h3 className="text-[20px] font-extrabold text-white">
                          Pre-Qualified Client Enquiry Summary
                        </h3>
                      </div>

                      {isHighValueLead ? (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-white text-[12px] font-extrabold shadow-md">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>High-Value Lead</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-[12px] font-bold">
                          <span>Standard Lead</span>
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 block mb-1">
                          Project Type
                        </span>
                        <span className="text-[14px] font-extrabold text-white">
                          {demoData.projectType}
                        </span>
                      </div>
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 block mb-1">
                          Space Size
                        </span>
                        <span className="text-[14px] font-extrabold text-white">
                          {demoData.spaceSize}
                        </span>
                      </div>
                      <div className="rounded-lg bg-primary/20 border border-primary/50 p-3.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                          Budget Tier
                        </span>
                        <span className="text-[14px] font-extrabold text-white">
                          {demoData.budget}
                        </span>
                      </div>
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 block mb-1">
                          Timeline
                        </span>
                        <span className="text-[14px] font-extrabold text-white">
                          {demoData.timeline}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Back / Next Step Controls */}
            <div className="mt-8 pt-5 border-t border-navy-08 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={demoStep === 1}
                onClick={() => setDemoStep((s) => Math.max(1, s - 1))}
                className="px-5 py-2.5 rounded-full border border-navy-15 text-navy font-bold text-[14px] inline-flex items-center gap-2 hover:border-primary hover:text-primary transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {demoStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setDemoStep((s) => Math.min(5, s + 1))}
                  className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setDemoStep(1)}
                  className="px-6 py-2.5 rounded-full bg-primary-50 hover:bg-primary hover:text-white text-primary font-bold text-[14px] transition-colors cursor-pointer"
                >
                  Start Demo Again
                </button>
              )}
            </div>
          </div>

          {/* Below the Card Prompt */}
          <p className="mt-6 text-center text-[15px] font-medium text-navy-70">
            Want this on your website?{' '}
            <a
              href="#review"
              className="font-extrabold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Get a Free Portfolio Review</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </p>
        </div>
      </section>

      {/* ====================================================================
          8. CASE STUDY — EDITORIAL MAGAZINE SPREAD (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              CASE STUDY
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              <span className="text-primary">
                {STUDIO_CASE_STUDY.studioName}
              </span>
              : From Referrals Only to a Full Project Pipeline
            </h2>
          </div>

          {/* Magazine Two-Page Spread Container */}
          <div className="rounded-[12px] border border-navy-15 bg-white shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 relative">
              {/* Thin Vertical Magazine "Spine" Line Between Left & Right Pages */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-navy-15 z-20"
              />

              {/* Left Page (6 cols): Tall Interior Photo + Small Uppercase Caption */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-primary-50/25">
                <div className="relative rounded-[8px] overflow-hidden aspect-[4/3] sm:aspect-[5/4] border border-navy-15">
                  <img
                    src={interiorIndustry.image || portfolioShowcase}
                    alt="The Verandah Residence turnkey architectural interior project"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-navy/85 text-white text-[10px] font-mono uppercase tracking-widest">
                    ISSUE 08 // PORTFOLIO SPREAD
                  </span>
                </div>

                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-navy-50 leading-relaxed">
                  {STUDIO_CASE_STUDY.caption}
                </p>
              </div>

              {/* Right Page (6 cols): Editorial Pull Quote + 3 Magazine Caption Metrics */}
              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  {/* Thin Blue Rule Above Pull Quote */}
                  <div className="w-16 h-1 bg-primary mb-6" />

                  <blockquote className="text-[20px] sm:text-[24px] font-bold text-navy leading-[1.4] tracking-tight mb-6">
                    &ldquo;{STUDIO_CASE_STUDY.quote}&rdquo;
                  </blockquote>

                  <div className="mb-8">
                    <div className="text-[16px] font-extrabold text-navy">
                      {STUDIO_CASE_STUDY.clientName}
                    </div>
                    <div className="text-[13px] font-semibold text-navy-50">
                      {STUDIO_CASE_STUDY.clientRole}
                    </div>
                  </div>
                </div>

                {/* 3 Metrics Laid Out as Magazine Captions */}
                <div className="pt-6 border-t border-navy-15 grid grid-cols-3 gap-4">
                  {STUDIO_CASE_STUDY.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-[28px] sm:text-[36px] font-extrabold text-primary leading-none tabular-nums mb-1.5">
                        {m.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy-70">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Magazine Footer Bar */}
            <div className="px-6 sm:px-10 py-4 bg-primary-50/60 border-t border-navy-15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-navy">
                Services: Portfolio Website · Local SEO · Google Ads
              </span>
              <Link
                to="/our-work"
                className="inline-flex items-center gap-1.5 text-[14px] font-extrabold text-primary hover:underline"
              >
                <span>View More Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. OUR PROCESS — DIMENSION-LINE TIMELINE (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              OUR PROCESS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              From <span className="text-primary">Brief to Launch</span>
            </h2>
          </div>

          {/* Desktop Horizontal Architectural Dimension Line + 5 Segments */}
          <div className="relative">
            {/* Week Labels Above Dimension Line (Desktop) */}
            <div className="hidden lg:grid lg:grid-cols-5 gap-5 mb-3">
              {PROCESS_SEGMENTS.map((seg) => (
                <div
                  key={seg.step}
                  className="text-center text-[12px] font-mono font-extrabold uppercase tracking-[0.16em] text-primary"
                >
                  {seg.week}
                </div>
              ))}
            </div>

            {/* Horizontal Dimension Line with End Arrows & Tick Marks (Desktop) */}
            <div className="hidden lg:flex items-center mb-8 relative">
              {/* Left Arrowhead */}
              <span className="w-3 h-3 border-t-2 border-l-2 border-primary -rotate-45 shrink-0" />
              <motion.div
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
                className="flex-1 h-0.5 bg-primary relative grid grid-cols-5"
              >
                {PROCESS_SEGMENTS.map((seg) => (
                  <div key={seg.step} className="relative flex justify-center">
                    <span className="w-0.5 h-4 bg-navy -top-2 absolute" />
                  </div>
                ))}
              </motion.div>
              {/* Right Arrowhead */}
              <span className="w-3 h-3 border-t-2 border-r-2 border-primary rotate-45 shrink-0" />
            </div>

            {/* 5 Segment Cards (Vertical Dimension Line on Left on Mobile) */}
            <div className="relative pl-6 lg:pl-0 border-l-2 lg:border-l-0 border-primary grid grid-cols-1 lg:grid-cols-5 gap-5">
              {PROCESS_SEGMENTS.map((seg) => (
                <div
                  key={seg.step}
                  className="relative bg-white rounded-[12px] p-6 border border-navy-15 shadow-soft flex flex-col justify-between"
                >
                  {/* Mobile Tick Mark */}
                  <span className="lg:hidden absolute -left-[29px] top-7 w-3.5 h-0.5 bg-primary" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono font-extrabold text-primary bg-primary-50 px-2.5 py-1 rounded-xs">
                        STEP {seg.step}
                      </span>
                      <span className="lg:hidden text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                        {seg.week}
                      </span>
                    </div>

                    <h3 className="text-[18px] font-extrabold text-navy mb-2">
                      {seg.title}
                    </h3>
                    <p className="text-[14px] text-navy-70 leading-relaxed">
                      {seg.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-navy-08/60 flex items-center justify-between text-[11px] font-mono text-navy-50">
                    <span>DIM // {seg.step}</span>
                    <span>{seg.week}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. FAQ — SPLIT WITH IMAGE (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 42% (5 cols): Tall Interior Photo with Corner Crop Marks + Navy Caption Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-[110px]">
              <div className="relative p-3 border border-navy-15 rounded-[12px] bg-primary-50/30">
                {/* 4 Corner Crop Marks */}
                <span className="pointer-events-none absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-primary" />
                <span className="pointer-events-none absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-primary" />
                <span className="pointer-events-none absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-primary" />
                <span className="pointer-events-none absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-primary" />

                <div className="rounded-[8px] overflow-hidden aspect-[4/5] bg-navy relative">
                  <img
                    src={aboutValuesCollaboration}
                    alt="Architects and interior designers reviewing material boards and blueprints"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />

                  {/* Small Navy Caption Card at Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 bg-navy/95 backdrop-blur-md text-white rounded-[10px] p-5 border border-white/15 shadow-xl">
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary mb-1">
                      STUDIO CONSULTATION
                    </div>
                    <p className="text-[15px] font-bold text-white mb-3">
                      Have more questions about your studio&apos;s website?
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-[14px] font-extrabold text-primary hover:underline"
                    >
                      <span>Have more questions? Talk to us</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 58% (7 cols): FAQ Heading + 6-Question Accordion */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                FAQ
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-8">
                Questions from{' '}
                <span className="text-primary">Design Studios</span>
              </h2>

              <div className="space-y-4">
                {DESIGN_STUDIO_FAQS.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={faq.question}
                      className={`rounded-[12px] border transition-all overflow-hidden ${
                        isOpen
                          ? 'border-primary border-l-4 border-l-primary bg-white shadow-soft'
                          : 'border-navy-15 bg-white hover:border-primary'
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <h3
                          className={`text-[16px] sm:text-[17px] font-extrabold leading-snug ${
                            isOpen ? 'text-primary' : 'text-navy'
                          }`}
                        >
                          {faq.question}
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
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. FREE PORTFOLIO REVIEW — FULL-BLEED IMAGE CTA (id="review")
      ==================================================================== */}
      <section
        id="review"
        className="relative py-20 lg:py-28 bg-navy text-white overflow-hidden"
      >
        {/* Full-Bleed Interior Photograph + ~80% Navy Overlay + Faint Blueprint Grid */}
        <img
          src={interiorIndustry.image || portfolioShowcase}
          alt="Luxury architectural interior studio backdrop"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="absolute inset-0 arch-drafting-grid-dark opacity-50 pointer-events-none" />

        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/25 text-white border border-primary/45 text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
            FREE PORTFOLIO REVIEW
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[48px] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
            Let Your Website Win{' '}
            <span className="text-primary">Your Next Project</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
            Share your website or Google profile and we&apos;ll send a free
            review with clear improvements for design, SEO and enquiries.
          </p>

          {/* Inline Form (One Row on Desktop, Stacked on Mobile) */}
          <div className="bg-white text-navy rounded-[16px] p-5 sm:p-7 shadow-2xl border border-white/20 max-w-4xl mx-auto">
            {reviewSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-[22px] font-extrabold text-navy">
                  Portfolio Review Request Received!
                </h3>
                <p className="text-[15px] text-navy-70 max-w-lg mx-auto">
                  Thank you, <strong>{reviewForm.name}</strong>. Our design
                  website specialists are reviewing{' '}
                  <strong>{reviewForm.url}</strong> and will send your tailored
                  improvements to <strong>{reviewForm.contact}</strong> within
                  24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setReviewSuccess(false);
                    setReviewForm({ name: '', contact: '', url: '' });
                  }}
                  className="px-5 py-2 rounded-full bg-primary-50 text-primary text-[13px] font-bold hover:bg-primary hover:text-white transition-colors cursor-pointer"
                >
                  Submit another profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} noValidate>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
                  {/* Name */}
                  <div className="lg:col-span-3 text-left">
                    <label
                      htmlFor="review-name"
                      className="sr-only"
                    >
                      Your Name
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      value={reviewForm.name}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, name: e.target.value })
                      }
                      placeholder="Your Name *"
                      className="w-full px-4 py-3.5 rounded-xl bg-primary-50/50 border border-navy-15 text-navy text-[14px] font-medium focus:outline-none focus:border-primary focus:bg-white"
                    />
                    {reviewErrors.name && (
                      <p className="mt-1 text-[11px] font-semibold text-primary flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{reviewErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email or Phone */}
                  <div className="lg:col-span-3 text-left">
                    <label
                      htmlFor="review-contact"
                      className="sr-only"
                    >
                      Email or WhatsApp Number
                    </label>
                    <input
                      id="review-contact"
                      type="text"
                      value={reviewForm.contact}
                      onChange={(e) =>
                        setReviewForm({
                          ...reviewForm,
                          contact: e.target.value,
                        })
                      }
                      placeholder="Email or Phone *"
                      className="w-full px-4 py-3.5 rounded-xl bg-primary-50/50 border border-navy-15 text-navy text-[14px] font-medium focus:outline-none focus:border-primary focus:bg-white"
                    />
                    {reviewErrors.contact && (
                      <p className="mt-1 text-[11px] font-semibold text-primary flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{reviewErrors.contact}</span>
                      </p>
                    )}
                  </div>

                  {/* Website or Google Profile URL */}
                  <div className="lg:col-span-3 text-left">
                    <label
                      htmlFor="review-url"
                      className="sr-only"
                    >
                      Website or Google profile URL
                    </label>
                    <input
                      id="review-url"
                      type="text"
                      value={reviewForm.url}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, url: e.target.value })
                      }
                      placeholder="Website or Google Profile URL *"
                      className="w-full px-4 py-3.5 rounded-xl bg-primary-50/50 border border-navy-15 text-navy text-[14px] font-medium focus:outline-none focus:border-primary focus:bg-white"
                    />
                    {reviewErrors.url && (
                      <p className="mt-1 text-[11px] font-semibold text-primary flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{reviewErrors.url}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="lg:col-span-3">
                    <button
                      type="submit"
                      disabled={reviewSubmitting}
                      className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
                    >
                      {reviewSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Get My Free Review</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          <p className="mt-5 text-[13px] font-semibold text-white/75">
            No obligation. Reply within 24 hours.
          </p>
        </div>
      </section>

      {/* ====================================================================
          12. EXPLORE OTHER INDUSTRIES (white, compact)
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
              to="/industries"
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
                to={
                  ind.slug === 'b2b-saas'
                    ? '/industries/b2b-saas'
                    : ind.slug === 'finance-fintech'
                    ? '/industries/finance-fintech'
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

export default InteriorDesignArchitecture;


