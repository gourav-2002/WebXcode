import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Search,
  Sparkles,
  Play,
  RotateCcw,
  ShieldCheck,
  FileText,
  Clock,
  Sliders,
  CheckCircle2,
  Compass,
  Gauge,
  Link2,
  Layers,
} from 'lucide-react';
import { aiSolutions } from '../AISolutions';

/* ============================================================================
   SECTION 1 — HERO: THE CO-PILOT COCKPIT DATA
============================================================================ */

interface CockpitTaskRow {
  id: string;
  code: string;
  aiAction: string;
  aiTiming: string;
  strategistDecision: string;
  statusTag: string;
}

const COCKPIT_TASKS: CockpitTaskRow[] = [
  {
    id: 'task-1',
    code: 'HUD-01',
    aiAction: 'Clustered 2,184 keywords',
    aiTiming: '12 s',
    strategistDecision: 'Prioritized 18 clusters ✓',
    statusTag: 'LOCKED',
  },
  {
    id: 'task-2',
    code: 'HUD-02',
    aiAction: 'Drafted 24 content briefs',
    aiTiming: '3 min',
    strategistDecision: 'Approved 20, edited 4 ✓',
    statusTag: 'REVIEWED',
  },
  {
    id: 'task-3',
    code: 'HUD-03',
    aiAction: 'Found 312 internal-link opportunities',
    aiTiming: '19 s',
    strategistDecision: 'Accepted 140 ✓',
    statusTag: 'QUEUED',
  },
  {
    id: 'task-4',
    code: 'HUD-04',
    aiAction: 'Detected traffic anomaly on /pricing',
    aiTiming: 'Real-time',
    strategistDecision: 'Fix scheduled ✓',
    statusTag: 'GUARDED',
  },
];

/* ============================================================================
   SECTION 2 — 2,000 KEYWORDS, CLUSTERED IN SECONDS DATA (8 BUBBLES + DOTS)
============================================================================ */

type ClusterIntent = 'Buy' | 'Learn' | 'Compare' | 'Local';

interface KeywordClusterBubble {
  id: string;
  code: string;
  name: string;
  intent: ClusterIntent;
  monthlyVolume: string;
  keywordCount: number;
  bubbleSizeClass: string;
  centerX: number; // % position on canvas when clustered
  centerY: number;
  suggestedPageType: string;
  topKeywords: [
    { kw: string; vol: string },
    { kw: string; vol: string },
    { kw: string; vol: string },
    { kw: string; vol: string },
    { kw: string; vol: string }
  ];
  strategistPriorityNote: string;
}

const KEYWORD_CLUSTERS: KeywordClusterBubble[] = [
  {
    id: 'sofas-buy',
    code: 'CL-01',
    name: 'Sofas — Buy',
    intent: 'Buy',
    monthlyVolume: '48,400 / mo',
    keywordCount: 412,
    bubbleSizeClass: 'w-40 h-40 sm:w-44 sm:h-44',
    centerX: 18,
    centerY: 28,
    suggestedPageType: 'Commercial Category & Filter Hub (/collections/sofas)',
    topKeywords: [
      { kw: 'sofa set price', vol: '14,800' },
      { kw: '3 seater sofa online', vol: '12,100' },
      { kw: 'wooden sofa set design', vol: '9,900' },
      { kw: 'modern fabric sofa', vol: '6,400' },
      { kw: 'buy living room sofa', vol: '5,200' },
    ],
    strategistPriorityNote:
      'Priority #1 commercial hub—high purchase intent; add price range filters & fabric swatches above the fold.',
  },
  {
    id: 'sofa-care-how-to',
    code: 'CL-02',
    name: 'Sofa Care — How to',
    intent: 'Learn',
    monthlyVolume: '29,200 / mo',
    keywordCount: 318,
    bubbleSizeClass: 'w-36 h-36 sm:w-40 sm:h-40',
    centerX: 46,
    centerY: 22,
    suggestedPageType: 'Pillar Care Guide + Step-by-Step Video (/guides/sofa-cleaning)',
    topKeywords: [
      { kw: 'sofa cleaning tips', vol: '9,400' },
      { kw: 'how to clean fabric sofa at home', vol: '8,100' },
      { kw: 'remove coffee stain from linen sofa', vol: '4,800' },
      { kw: 'velvet sofa maintenance guide', vol: '3,900' },
      { kw: 'baking soda sofa cleaning', vol: '3,000' },
    ],
    strategistPriorityNote:
      'Top-of-funnel authority builder—captures AI Overview citations and funnels readers to stain-resistant sofa collections.',
  },
  {
    id: 'sofa-sizes-compare',
    code: 'CL-03',
    name: 'Sofa Sizes — Compare',
    intent: 'Compare',
    monthlyVolume: '21,600 / mo',
    keywordCount: 264,
    bubbleSizeClass: 'w-36 h-36 sm:w-38 sm:h-38',
    centerX: 76,
    centerY: 26,
    suggestedPageType: 'Interactive Comparison & Room-Fit Guide (/compare/l-shape-vs-3-seater)',
    topKeywords: [
      { kw: 'l shaped vs 3 seater sofa', vol: '7,200' },
      { kw: 'standard 3 seater sofa dimensions cm', vol: '5,600' },
      { kw: 'best sofa for small living room', vol: '4,400' },
      { kw: 'sectional vs loveseat apartment', vol: '2,600' },
      { kw: '2 seater vs 3 seater size chart', vol: '1,800' },
    ],
    strategistPriorityNote:
      'Mid-funnel decision helper—reduces buyer hesitation by embedding a room-dimension calculator.',
  },
  {
    id: 'sofa-near-me-local',
    code: 'CL-04',
    name: 'Sofa Near Me — Local',
    intent: 'Local',
    monthlyVolume: '34,900 / mo',
    keywordCount: 295,
    bubbleSizeClass: 'w-36 h-36 sm:w-40 sm:h-40',
    centerX: 22,
    centerY: 72,
    suggestedPageType: 'Store Showroom & Experience Center Pages (/stores/[city])',
    topKeywords: [
      { kw: 'sofa showroom near me', vol: '14,200' },
      { kw: 'furniture store in bangalore indiranagar', vol: '7,800' },
      { kw: 'custom sofa store delhi ncr', vol: '5,900' },
      { kw: 'try sofa fabric samples mumbai', vol: '4,100' },
      { kw: 'home furniture studio hyderabad', vol: '2,900' },
    ],
    strategistPriorityNote:
      'Drives high-ticket foot traffic—pair with LocalBusiness schema, store hours, and appointment booking.',
  },
  {
    id: 'sofa-materials-compare',
    code: 'CL-05',
    name: 'Leather vs Fabric',
    intent: 'Compare',
    monthlyVolume: '18,300 / mo',
    keywordCount: 220,
    bubbleSizeClass: 'w-32 h-32 sm:w-36 sm:h-36',
    centerX: 48,
    centerY: 64,
    suggestedPageType: 'Material Comparison Matrix (/guides/leather-vs-fabric-sofa)',
    topKeywords: [
      { kw: 'leather vs fabric sofa for Indian weather', vol: '6,800' },
      { kw: 'pet friendly sofa fabric scratch proof', vol: '4,900' },
      { kw: 'boucle vs linen upholstery durability', vol: '3,100' },
      { kw: 'best sofa material for kids', vol: '2,100' },
      { kw: 'martindale rub count explained', vol: '1,400' },
    ],
    strategistPriorityNote:
      'Answers #1 pre-purchase objection in warm/humid climates; links directly to pet-friendly & linen SKUs.',
  },
  {
    id: 'sofa-cum-bed-buy',
    code: 'CL-06',
    name: 'Sofa Cum Bed — Buy',
    intent: 'Buy',
    monthlyVolume: '26,500 / mo',
    keywordCount: 248,
    bubbleSizeClass: 'w-34 h-34 sm:w-36 sm:h-36',
    centerX: 74,
    centerY: 66,
    suggestedPageType: 'Dedicated Sub-Category Page (/collections/sofa-cum-beds)',
    topKeywords: [
      { kw: 'wooden sofa cum bed with storage', vol: '9,800' },
      { kw: 'pull out sleeper sofa queen', vol: '6,500' },
      { kw: 'compact sofa bed for guest room', vol: '4,700' },
      { kw: 'folding sofa cum bed price', vol: '3,400' },
      { kw: 'hydraulic sofa bed mechanism', vol: '2,100' },
    ],
    strategistPriorityNote:
      'Separate buyer intent from standard sofas—requires dedicated collection URL instead of mixing on one page.',
  },
  {
    id: 'recliner-sofas-buy',
    code: 'CL-07',
    name: 'Recliner Sofas — Buy',
    intent: 'Buy',
    monthlyVolume: '19,800 / mo',
    keywordCount: 215,
    bubbleSizeClass: 'w-32 h-32 sm:w-34 sm:h-34',
    centerX: 33,
    centerY: 46,
    suggestedPageType: 'Category Page (/collections/recliners)',
    topKeywords: [
      { kw: 'motorized 3 seater recliner sofa', vol: '7,400' },
      { kw: 'single seater recliner chair price', vol: '5,200' },
      { kw: 'home theater recliner sofa set', vol: '3,600' },
      { kw: 'zero gravity leatherette recliner', vol: '2,200' },
      { kw: 'manual vs power recliner sofa', vol: '1,400' },
    ],
    strategistPriorityNote:
      'High AOV category—highlight motor warranty and wall-clearance specs in product schema.',
  },
  {
    id: 'small-space-ideas-learn',
    code: 'CL-08',
    name: 'Small Room Layout',
    intent: 'Learn',
    monthlyVolume: '16,400 / mo',
    keywordCount: 212,
    bubbleSizeClass: 'w-32 h-32 sm:w-34 sm:h-34',
    centerX: 62,
    centerY: 44,
    suggestedPageType: 'Shoppable Lookbook Guide (/ideas/small-living-room-layout)',
    topKeywords: [
      { kw: '10x12 living room sofa arrangement', vol: '5,900' },
      { kw: 'small apartment seating ideas', vol: '4,300' },
      { kw: 'floating sofa in narrow living room', vol: '2,900' },
      { kw: 'accent chair with 2 seater sofa', vol: '1,900' },
      { kw: 'rug size under 3 seater sofa', vol: '1,400' },
    ],
    strategistPriorityNote:
      'Bridges editorial inspiration to product pages via shoppable diagram pins.',
  },
];

interface RawDot {
  id: number;
  scatterX: number;
  scatterY: number;
  clusterIdx: number;
  label?: string;
}

const SCATTER_LABELS: Record<number, string> = {
  4: 'sofa set price',
  19: '3 seater sofa',
  37: 'sofa cleaning tips',
  58: 'l shaped vs 3 seater',
  83: 'sofa showroom near me',
  112: 'leather vs fabric sofa',
  144: 'wooden sofa cum bed',
  178: 'best sofa small room',
  205: 'motorized recliner',
  234: 'remove stain linen',
  261: '10x12 room layout',
  285: 'standard sofa size cm',
};

// Generate 300 deterministic keyword dots (representing 2,184 keywords)
const KEYWORD_PARTICLES: RawDot[] = Array.from({ length: 300 }, (_, i) => {
  const clusterIdx = i % KEYWORD_CLUSTERS.length;
  // Deterministic pseudo-random scatter coordinates (4%..96%)
  const scatterX = 5 + ((i * 37 + 13) % 90);
  const scatterY = 6 + ((i * 53 + 29) % 88);
  return {
    id: i,
    scatterX,
    scatterY,
    clusterIdx,
    label: SCATTER_LABELS[i],
  };
});

/* ============================================================================
   SECTION 3 — WEEKS OF WORK, COMPRESSED: ACCORDION BARS DATA
============================================================================ */

interface CompressedTaskRow {
  id: string;
  code: string;
  taskName: string;
  manualTime: string;
  manualHoursNum: number;
  aiTime: string;
  aiHoursNum: number;
  whatAiDoes: string;
  whatStrategistDoes: string;
}

const COMPRESSED_TASKS: CompressedTaskRow[] = [
  {
    id: 'kw-clustering',
    code: ' compressing-01',
    taskName: 'Keyword research & clustering',
    manualTime: '20 hrs',
    manualHoursNum: 20,
    aiTime: '2 hrs',
    aiHoursNum: 2,
    whatAiDoes: 'Groups 2,000+ raw search terms by SERP overlap & buyer intent.',
    whatStrategistDoes: 'Selects commercial priority clusters & maps URL hierarchy.',
  },
  {
    id: 'content-briefs',
    code: 'compressing-02',
    taskName: 'Content briefs (10 articles)',
    manualTime: '15 hrs',
    manualHoursNum: 15,
    aiTime: '2 hrs',
    aiHoursNum: 2,
    whatAiDoes: 'Extracts competitor headings, PAA questions, entities & word-count targets.',
    whatStrategistDoes: 'Sharpens unique angle, brand POV, and conversion CTAs.',
  },
  {
    id: 'tech-audit',
    code: 'compressing-03',
    taskName: 'Technical audit review',
    manualTime: '12 hrs',
    manualHoursNum: 12,
    aiTime: '3 hrs',
    aiHoursNum: 3,
    whatAiDoes: 'Clusters crawl logs, orphan URLs, schema gaps & CWV bottlenecks.',
    whatStrategistDoes: 'Sequences engineering tickets by revenue & indexing impact.',
  },
  {
    id: 'internal-links',
    code: 'compressing-04',
    taskName: 'Internal linking plan',
    manualTime: '10 hrs',
    manualHoursNum: 10,
    aiTime: '1.5 hrs',
    aiHoursNum: 1.5,
    whatAiDoes: 'Computes semantic similarity across every paragraph & suggests anchor text.',
    whatStrategistDoes: 'Approves high-authority link paths into money pages.',
  },
  {
    id: 'competitor-gap',
    code: 'compressing-05',
    taskName: 'Competitor gap analysis',
    manualTime: '8 hrs',
    manualHoursNum: 8,
    aiTime: '1 hr',
    aiHoursNum: 1,
    whatAiDoes: 'Diffs top 5 competitors’ new pages, ranking velocity & topical coverage.',
    whatStrategistDoes: 'Decides where to counter-attack and where to ignore noise.',
  },
  {
    id: 'monthly-reporting',
    code: 'compressing-06',
    taskName: 'Monthly reporting',
    manualTime: '6 hrs',
    manualHoursNum: 6,
    aiTime: '1 hr',
    aiHoursNum: 1,
    whatAiDoes: 'Pulls GSC, GA4 & rank data into clean cohort charts and anomaly summaries.',
    whatStrategistDoes: 'Writes executive narrative and next-30-day action roadmap.',
  },
];

/* ============================================================================
   SECTION 4 — AI CONTENT BRIEF BUILDER: LIVE DEMO DATA (3 PRESETS)
============================================================================ */

interface ContentBriefPreset {
  id: string;
  chipLabel: string;
  briefCode: string;
  searchIntent: string;
  targetReader: string;
  suggestedTitle: string;
  metaDescription: string;
  outline: [string, string, string, string, string, string, string];
  questionsToAnswer: [string, string, string, string];
  keyEntities: [string, string, string, string, string, string];
  lengthAndMedia: string;
  internalLinks: [
    { anchor: string; url: string },
    { anchor: string; url: string },
    { anchor: string; url: string }
  ];
  strategistNote: string;
}

const BRIEF_PRESETS: ContentBriefPreset[] = [
  {
    id: 'small-living-room',
    chipLabel: 'best sofa for small living room',
    briefCode: 'BRF-101 // COMMERCIAL GUIDE',
    searchIntent: 'Commercial Investigation (Compare + Buy) · High purchase readiness',
    targetReader: 'Urban apartment homeowners & renters furnishing a 10×12 ft or 12×14 ft living room.',
    suggestedTitle: 'Best Sofa for a Small Living Room (2026 Room-Size & Depth Guide)',
    metaDescription:
      'Furnishing a compact apartment? Compare apartment-sized 3-seaters, armless loveseats & L-shape sectionals with exact cm depth charts and layout diagrams.',
    outline: [
      'H2: The 3 Measurements That Matter More Than Sofa Width (Seat Depth, Arm Width, Leg Height)',
      'H2: Best Sofa Styles for a 10×12 ft vs 12×15 ft Living Room',
      'H3: Raised-Leg Mid-Century 3-Seaters (Visual Floor Space Trick)',
      'H3: Compact Reversible Chaise Sectionals (Under 210 cm)',
      'H2: Side-by-Side Comparison Table: 6 Small-Space Sofas by Depth & Doorway Clearance',
      'H2: Fabrics & Colors That Make Narrow Rooms Feel Wider',
      'H2: How to Measure Your Elevator & Stairwell Before Delivery',
    ],
    questionsToAnswer: [
      'What is the ideal sofa depth for a narrow living room?',
      'Should a sofa touch the wall in a small apartment?',
      'Is an L-shaped sofa or a 3-seater better for a 10×12 ft room?',
      'What minimum walkway clearance is needed between a sofa and coffee table?',
    ],
    keyEntities: [
      'Seat depth (85–92 cm)',
      'Visual floor clearance',
      'Reversible chaise',
      'Doorway diagonal clearance',
      'Apartment-scale 3-seater',
      '75 cm walkway rule',
    ],
    lengthAndMedia:
      '1,650–1,900 words · 1 interactive dimension table · 3 overhead floor-plan SVG diagrams · 6 SKU cards',
    internalLinks: [
      { anchor: 'explore compact 3-seater sofas', url: '/collections/3-seater-sofas' },
      { anchor: 'L-shaped vs 3-seater comparison', url: '/compare/l-shape-vs-3-seater' },
      { anchor: 'book a free home measurement visit', url: '/services/measurement-booking' },
    ],
    strategistNote: 'Add our interactive size guide here + link top 3 in-stock apartment SKUs above the fold.',
  },
  {
    id: 'clean-velvet-sofa',
    chipLabel: 'how to clean a velvet sofa',
    briefCode: 'BRF-102 // HOW-TO AUTHORITY',
    searchIntent: 'Informational + Brand Trust (Learn · AI Overview Target)',
    targetReader: 'Existing velvet sofa owners dealing with a spill or shoppers worried about velvet maintenance.',
    suggestedTitle: 'How to Clean a Velvet Sofa at Home Without Crushing the Pile',
    metaDescription:
      'Step-by-step guide to cleaning cotton, performance polyester, and silk velvet sofas. Learn how to blot spills, steam out crush marks, and brush the nap.',
    outline: [
      'H2: First: Check Your Sofa’s Care Tag Code (W, S, W/S, or X)',
      'H2: Daily & Weekly Maintenance: Soft Brushing Along the Nap',
      'H2: Step-by-Step: Removing Fresh Liquid, Coffee & Oil Stains',
      'H3: Why You Must Blot (Never Rub) Velvet Fibers',
      'H3: Using Mild Suds + Distilled Water on Performance Velvet',
      'H2: How to Restore Flattened or Crushed Velvet Pile With Low Steam',
      'H2: 4 Harsh Cleaners That Permanently Ring-Stain Velvet Upholstery',
    ],
    questionsToAnswer: [
      'Can you use water and dish soap on a velvet sofa?',
      'How do you fix water rings on velvet upholstery?',
      'Does steaming a velvet sofa damage the fabric backing?',
      'What is the difference between cotton velvet and performance poly-velvet care?',
    ],
    keyEntities: [
      'WS cleaning code',
      'Velvet nap / pile direction',
      'Soft-bristle upholstery brush',
      'Distilled water mist',
      'Low-heat garment steamer',
      ' hydrophobic stain guard',
    ],
    lengthAndMedia:
      '1,300–1,550 words · HowTo JSON-LD schema · 4 macro before/after fabric photos · 20s brushing video loop',
    internalLinks: [
      { anchor: 'stain-resistant performance velvet sofas', url: '/collections/velvet-sofas' },
      { anchor: 'order free washable fabric swatches', url: '/swatches/request' },
      { anchor: 'annual upholstery care service', url: '/services/furniture-care' },
    ],
    strategistNote: 'Include a 40-word quick-answer box right under H1 to capture Google AI Overviews.',
  },
  {
    id: 'l-shaped-vs-3-seater',
    chipLabel: 'L-shaped vs 3-seater sofa',
    briefCode: 'BRF-103 // DECISION MATRIX',
    searchIntent: 'Commercial Comparison (Mid-to-Bottom Funnel Decision)',
    targetReader: 'Families and hosts torn between a corner sectional and a classic 3-seater + accent chair layout.',
    suggestedTitle: 'L-Shaped Sectional vs 3-Seater Sofa: Which Layout Fits Your Room?',
    metaDescription:
      'Compare seating capacity, floor footprint, conversation flow, and resale flexibility between an L-shaped corner sofa and a 3-seater sofa with accent chairs.',
    outline: [
      'H2: 60-Second Verdict: When to Pick an L-Shape vs a 3-Seater',
      'H2: Floor Footprint & Traffic Flow Comparison (With Exact cm Diagrams)',
      'H2: Lounging vs Hosting: Movie Nights vs Formal Guests',
      'H3: Why L-Shape Sectionals Win for TV Viewing & Corner Dead-Space',
      'H3: Why a 3-Seater + 2 Accent Chairs Wins for Conversation & Moving Homes',
      'H2: Cost-Per-Seat & Delivery Access Breakdown',
      'H2: Hybrid Option: 3-Seater With a Movable Ottoman Chaise',
    ],
    questionsToAnswer: [
      'Does an L-shaped sofa make a small room look smaller?',
      'How many adults can comfortably sit on an L-shaped sofa vs a 3-seater?',
      'Which sofa layout is easier to reconfigure if you move apartments?',
      'Is a movable ottoman better than a fixed L-shape sectional?',
    ],
    keyEntities: [
      'Left-arm facing (LAF) vs Right-arm facing (RAF)',
      'Corner seat ergonomics',
      'Modular ottoman chaise',
      'Conversation triangle',
      'Floor-plan footprint',
      'Cost per seat',
    ],
    lengthAndMedia:
      '1,500–1,750 words · 1 8-row comparison table · 2 side-by-side room floor plans · Quiz CTA',
    internalLinks: [
      { anchor: 'browse modular L-shaped sectionals', url: '/collections/l-shaped-sofas' },
      { anchor: 'shop solid wood 3-seater sofas', url: '/collections/3-seater-sofas' },
      { anchor: 'matching storage ottomans & footstools', url: '/collections/ottomans' },
    ],
    strategistNote: 'Highlight our reversible-chaise models as the "best of both worlds" winner at the end.',
  },
];

/* ============================================================================
   MAIN PAGE COMPONENT
============================================================================ */

interface AiPoweredSeoProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const AiPoweredSeo: React.FC<AiPoweredSeoProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Retrieve Single Source of Truth Entry from AISolutions.tsx */
  const solutionData = useMemo(() => {
    return (
      aiSolutions.find((s) => s.slug === 'ai-powered-seo') || {
        slug: 'ai-powered-seo',
        name: 'AI-Powered SEO',
        category: 'AI Marketing' as const,
        badge: null,
        icon: 'Search' as const,
        tagline: 'Programmatic SEO, entity clustering & AI search visibility at scale',
        description:
          'Supercharge your organic growth with AI-assisted keyword clustering, SERP gap intelligence, automated internal linking maps, programmatic landing page architectures, and continuous visibility tracking across Google Search, AI Overviews, ChatGPT, and Perplexity.',
        deliverables: [
          'AI-driven semantic keyword clustering & buyer-intent topic map (1,000+ terms)',
          'Programmatic SEO page architecture for locations, integrations, or categories',
          'Automated SERP & competitor content brief generation for writers',
          'Entity & JSON-LD schema automation for Google AI Overviews, AEO & GEO',
          'Internal link graph analysis & orphan-page recovery recommendations',
          'Monthly organic traffic, AI citation share & ranking velocity telemetry',
        ] as [string, string, string, string, string, string],
        bestFor: [
          'B2B SaaS & Marketplaces',
          'Multi-City Healthcare & Education',
          'E-commerce Category Scaling',
        ] as [string, string, string],
        typicalTimeline: '3–4 weeks foundation + monthly compounding sprints',
        keyMetric: '+215% faster non-brand organic impression growth in 6 months (placeholder)',
        relatedIndustries: ['b2b-saas', 'ecommerce', 'education-edtech', 'travel-hospitality'],
        relatedServices: ['seo-services', 'aeo-services', 'geo-generative-engine-optimization'],
        futurePagePath: '/ai-solutions/ai-powered-seo',
      }
    );
  }, []);

  /* Section 1 — Cockpit HUD Active Task Highlight */
  const [activeHudTaskIdx, setActiveHudTaskIdx] = useState<number>(0);

  /* Section 2 — Keyword Clustering State */
  const [isClustered, setIsClustered] = useState<boolean>(true);
  const [selectedClusterId, setSelectedClusterId] = useState<string>('sofas-buy');
  const [clusterAnnouncement, setClusterAnnouncement] = useState<string>(
    '2,184 keywords grouped into 8 topic clusters with buyer intent tags.'
  );

  /* Section 3 — Accordion Bars Compression State */
  const [barsCompressed, setBarsCompressed] = useState<boolean>(true);

  /* Section 4 — AI Content Brief Builder State */
  const [selectedPresetId, setSelectedPresetId] = useState<string>('small-living-room');
  const [customTopicQuery, setCustomTopicQuery] = useState<string>(
    'best sofa for small living room'
  );
  const [briefBuildStep, setBriefBuildStep] = useState<number>(8); // 8 sections total
  const [isBuildingBrief, setIsBuildingBrief] = useState<boolean>(false);

  /* SEO Document Title & Meta Description */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'AI-Powered SEO Services | Faster Keyword Research, Briefs & Monitoring | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'SEO at the speed of AI — guided by human strategists. We cluster thousands of keywords, generate content briefs, map internal links, monitor anomalies 24/7, and build guarded programmatic SEO pages.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Section 1 — Auto-cycle HUD task highlight unless reduced motion */
  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setInterval(() => {
      setActiveHudTaskIdx((prev) => (prev + 1) % COCKPIT_TASKS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  /* Section 2 — Cluster / Reset Handlers */
  const handleClusterKeywords = () => {
    setIsClustered(true);
    setClusterAnnouncement(
      'Clustered 2,184 keywords into 8 topic clusters by search intent and SERP overlap. Click any bubble to inspect top keywords.'
    );
  };

  const handleScatterKeywords = () => {
    setIsClustered(false);
    setClusterAnnouncement(
      'Reset to 2,184 ungrouped raw keywords. Click Cluster with AI to group into 8 topic hubs.'
    );
  };

  const activeCluster =
    KEYWORD_CLUSTERS.find((c) => c.id === selectedClusterId) || KEYWORD_CLUSTERS[0];

  /* Section 4 — Brief Builder Trigger */
  const activeBrief =
    BRIEF_PRESETS.find((b) => b.id === selectedPresetId) || BRIEF_PRESETS[0];

  const handleSelectBriefPreset = (preset: ContentBriefPreset) => {
    setSelectedPresetId(preset.id);
    setCustomTopicQuery(preset.chipLabel);
    triggerBriefBuildAnimation();
  };

  const triggerBriefBuildAnimation = () => {
    if (shouldReduceMotion) {
      setBriefBuildStep(8);
      return;
    }
    setIsBuildingBrief(true);
    setBriefBuildStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setBriefBuildStep(step);
      if (step >= 8) {
        clearInterval(interval);
        setIsBuildingBrief(false);
      }
    }, 110);
  };

  const triggerQuoteModal = (customService?: string) => {
    const label = customService || solutionData.name;
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  /* JSON-LD Structured Data (Service + BreadcrumbList) */
  const jsonLdData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'AI-Powered SEO Services — Keyword Clustering, Content Briefs & 24/7 Monitoring',
        serviceType:
          'AI-Assisted Keyword Clustering, Content Brief Generation, Internal Link Graph Optimization, 24/7 SEO Anomaly Monitoring & Guardrailed Programmatic SEO',
        description: solutionData.description,
        provider: {
          '@type': 'Organization',
          name: 'WebXCode',
          url: 'https://webxcode.com',
        },
        areaServed: ['India', 'United States', 'United Kingdom', 'UAE', 'Worldwide'],
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
            name: 'AI Solutions',
            item: 'https://webxcode.com/ai-solutions',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'AI-Powered SEO',
            item: 'https://webxcode.com/ai-solutions/ai-powered-seo',
          },
        ],
      },
    ],
    [solutionData.description]
  );

  return (
    <main className="flex-1 bg-white text-navy overflow-x-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* ======================================================================
          SECTION 1 — HERO: THE CO-PILOT COCKPIT (bg: #1e242e navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-white/10">
        {/* HUD Grid & Radial Glows */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 right-0 w-[640px] h-[640px] blue-glow-strong pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1100px] h-[240px] bg-gradient-to-t from-primary/20 via-primary/5 to-transparent blur-2xl pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/70 mb-8"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
            <Link to="/ai-solutions" className="hover:text-white transition-colors">
              AI Solutions
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
            <span className="text-white font-semibold" aria-current="page">
              {solutionData.name}
            </span>
          </nav>

          {/* Upper Cockpit Split: Left = Copy & CTAs | Right = HUD Windshield Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left (6 cols): Positioning, H1, Lead & CTAs */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Compass className="w-3.5 h-3.5 text-primary" />
                <span>AI-POWERED SEO</span>
              </div>

              <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.07] tracking-[-0.02em]">
                SEO at the Speed of AI.{' '}
                <span className="text-primary">Guided by Experts.</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-xl">
                We use AI to research, plan, monitor and scale your SEO in hours instead of weeks —
                and our strategists make every call that matters.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#preflight"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft transition-all"
                >
                  <span>Get a Free AI SEO Opportunity Scan</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#clustering"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>Watch 2,000 Keywords Cluster</span>
                </a>
              </div>

              {/* Honesty & Guidelines Strip */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-semibold text-white/80">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  <span>AI assists, humans decide</span>
                </span>
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  <span>Search-guideline compliant</span>
                </span>
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  <span>Zero spammy automation</span>
                </span>
              </div>
            </div>

            {/* Right (6 cols): HUD "Windshield" Dual-Stream Task Panel */}
            <div className="lg:col-span-6">
              <div className="rounded-[26px] bg-white/[0.05] border border-primary/40 backdrop-blur-md p-5 sm:p-6 shadow-2xl relative overflow-hidden">
                {/* Corner HUD Brackets (aria-hidden) */}
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary"
                />

                {/* Top Windshield HUD Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary-100">
                      COCKPIT WINDSHIELD // DUAL-CONTROL TELEMETRY
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-white/70">
                    ALT: PAGE-1 TRAJECTORY
                  </span>
                </div>

                {/* Column Headers: AI Co-Pilot vs Human Strategist */}
                <div className="grid grid-cols-12 gap-2 px-3 pb-2 font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                  <div className="col-span-6">AI CO-PILOT (SPEED &amp; SCALE)</div>
                  <div className="col-span-6 text-right sm:text-left">
                    STRATEGIST (FINAL DECISION)
                  </div>
                </div>

                {/* 4 Live Task Rows */}
                <div className="space-y-2.5">
                  {COCKPIT_TASKS.map((task, idx) => {
                    const isFocused = activeHudTaskIdx === idx;
                    return (
                      <div
                        key={task.id}
                        onClick={() => setActiveHudTaskIdx(idx)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer grid grid-cols-1 sm:grid-cols-12 items-center gap-3 ${
                          isFocused
                            ? 'bg-primary/20 border-primary shadow-md'
                            : 'bg-[#131922]/85 border-white/10 hover:border-white/25'
                        }`}
                      >
                        {/* AI Co-Pilot Side */}
                        <div className="sm:col-span-6 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          </span>
                          <div>
                            <div className="text-[13px] font-bold text-white leading-snug">
                              {task.aiAction}
                            </div>
                            <div className="font-mono text-[11px] text-primary-100 font-semibold mt-0.5">
                              AI execution · {task.aiTiming}
                            </div>
                          </div>
                        </div>

                        {/* Strategist Side */}
                        <div className="sm:col-span-6 sm:border-l sm:border-white/15 sm:pl-3.5 flex items-center justify-between gap-2">
                          <div>
                            <div className="font-mono text-[10px] uppercase tracking-wider text-white/55">
                              HUMAN CALL
                            </div>
                            <div className="text-[13px] font-extrabold text-primary-100 leading-snug">
                              {task.strategistDecision}
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-[10px] font-bold text-white shrink-0">
                            {task.statusTag}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Wide Curved Cockpit Dashboard Deck at Bottom of Hero */}
          <div
            aria-hidden="true"
            className="mt-12 rounded-t-[40px] rounded-b-[20px] bg-gradient-to-b from-[#131922] to-[#0d1117] border-t-2 border-x border-b border-primary/40 p-5 sm:p-6 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Left Seat Label: STRATEGIST */}
              <div className="md:col-span-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-mono text-[11px] font-extrabold text-white">
                    PIC
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary-100">
                      LEFT SEAT // PILOT IN COMMAND
                    </div>
                    <div className="text-[15px] font-extrabold text-white">Strategist</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary/20 border border-primary/40 font-mono text-[10px] font-bold text-white">
                  APPROVES ALL
                </span>
              </div>

              {/* Center HUD Gauges & Horizon Line */}
              <div className="md:col-span-4 px-4 py-2 flex items-center justify-around border-y md:border-y-0 md:border-x border-white/10 font-mono">
                <div className="text-center">
                  <div className="text-[10px] text-white/55">RESEARCH SPEED</div>
                  <div className="text-[16px] font-extrabold text-primary">10× FASTER</div>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="text-center">
                  <div className="text-[10px] text-white/55">MONITORING</div>
                  <div className="text-[16px] font-extrabold text-white">24/7 HUD</div>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="text-center">
                  <div className="text-[10px] text-white/55">QUALITY GATE</div>
                  <div className="text-[16px] font-extrabold text-primary-100">100% HUMAN</div>
                </div>
              </div>

              {/* Right Seat Label: AI CO-PILOT */}
              <div className="md:col-span-4 p-3.5 rounded-2xl bg-primary/15 border border-primary/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-mono text-[11px] font-extrabold">
                    AI
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary-100">
                      RIGHT SEAT // DATA ENGINE
                    </div>
                    <div className="text-[15px] font-extrabold text-white">AI Co-Pilot</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary text-white font-mono text-[10px] font-bold">
                  ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2 — 2,000 KEYWORDS, CLUSTERED IN SECONDS (bg: #ffffff, id="clustering")
      ====================================================================== */}
      <section
        id="clustering"
        className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Cluster / Reset Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Search className="w-3.5 h-3.5 text-primary" />
                <span>SEMANTIC KEYWORD CLUSTERING</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.12] tracking-tight">
                From Keyword Chaos to{' '}
                <span className="text-primary">Clear Topic Clusters</span>
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] text-navy-70 leading-[1.65]">
                Instead of manually sorting thousands of spreadsheet rows for two weeks, our AI
                groups raw search terms by real SERP overlap and buyer intent in seconds. Toggle
                between raw chaos and clustered hubs below, then click any bubble to inspect its
                keywords.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleClusterKeywords}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[15px] transition-all cursor-pointer ${
                  isClustered
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-primary hover:bg-primary-700 text-white shadow-soft'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Cluster with AI</span>
              </button>

              <button
                type="button"
                onClick={handleScatterKeywords}
                className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full bg-white hover:bg-navy hover:text-white text-navy border border-navy-15 font-semibold text-[14px] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset (Scatter 2,184 Terms)</span>
              </button>
            </div>
          </div>

          {/* Live announcement for screen readers */}
          <div className="sr-only" aria-live="polite">
            {clusterAnnouncement}
          </div>

          {/* 12-Col Split: Left 7 Cols = Interactive Clustering Canvas | Right 5 Cols = Selected Cluster Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left (7 cols): Interactive Canvas with 300 Dots + 8 Topic Cluster Bubbles */}
            <div className="lg:col-span-7">
              <div className="rounded-[26px] bg-navy text-white border-2 border-navy-15 shadow-xl overflow-hidden flex flex-col justify-between h-full">
                {/* Top Canvas Status Bar */}
                <div className="px-5 py-3.5 bg-[#131820] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                  <span className="text-primary-100 font-extrabold">
                    {isClustered
                      ? 'STATE: 8 TOPIC HUBS CLUSTERED (2,184 KEYWORDS)'
                      : 'STATE: UNGROUPED RAW KEYWORD DUMP (2,184 KEYWORDS)'}
                  </span>
                  <span className="text-white/65">
                    {isClustered ? 'Click any bubble to inspect' : 'Click "Cluster with AI" above'}
                  </span>
                </div>

                {/* Visual Particle & Bubble Canvas */}
                <div className="relative min-h-[440px] sm:min-h-[480px] p-4 overflow-hidden">
                  {/* Decorative 300 Keyword Dots (aria-hidden) */}
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    {KEYWORD_PARTICLES.map((dot) => {
                      const targetCluster = KEYWORD_CLUSTERS[dot.clusterIdx];
                      // Jitter slightly around cluster center when clustered
                      const jitterX = ((dot.id * 17) % 14) - 7;
                      const jitterY = ((dot.id * 23) % 14) - 7;
                      const leftPos = isClustered
                        ? targetCluster.centerX + jitterX
                        : dot.scatterX;
                      const topPos = isClustered
                        ? targetCluster.centerY + jitterY
                        : dot.scatterY;

                      return (
                        <div
                          key={dot.id}
                          style={{
                            left: `${leftPos}%`,
                            top: `${topPos}%`,
                          }}
                          className="absolute transition-all duration-500 ease-out"
                        >
                          <span
                            className={`block rounded-full ${
                              isClustered
                                ? 'w-1.5 h-1.5 bg-primary/45'
                                : 'w-2 h-2 bg-primary-100/70'
                            }`}
                          />
                          {!isClustered && dot.label && (
                            <span className="hidden sm:inline-block ml-2 -mt-2 font-mono text-[10px] text-white/65 whitespace-nowrap bg-navy/80 px-1.5 py-0.5 rounded border border-white/10">
                              {dot.label}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* 8 Accessible Cluster Bubbles (Grid on Mobile, Positioned Hubs on Desktop) */}
                  {isClustered ? (
                    <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 h-full content-center py-2">
                      {KEYWORD_CLUSTERS.map((cluster) => {
                        const isSelected = cluster.id === selectedClusterId;
                        return (
                          <button
                            key={cluster.id}
                            type="button"
                            onClick={() => setSelectedClusterId(cluster.id)}
                            className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-primary text-white border-white shadow-[0_0_24px_rgba(5,113,194,0.65)] scale-[1.03]'
                                : 'bg-[#131922]/90 text-white border-primary/45 hover:border-primary hover:bg-primary/20'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-2">
                                <span
                                  className={`px-2 py-0.5 rounded font-mono text-[10px] font-extrabold uppercase ${
                                    isSelected
                                      ? 'bg-white text-primary'
                                      : 'bg-primary/25 text-primary-100 border border-primary/40'
                                  }`}
                                >
                                  {cluster.intent}
                                </span>
                                <span className="font-mono text-[10px] text-white/70 font-bold">
                                  {cluster.keywordCount} kw
                                </span>
                              </div>
                              <div className="text-[14px] sm:text-[15px] font-extrabold leading-snug">
                                {cluster.name}
                              </div>
                            </div>

                            <div className="mt-3 pt-2 border-t border-white/15 font-mono text-[11px] font-bold text-primary-100">
                              {cluster.monthlyVolume}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="relative z-10 h-full min-h-[400px] flex items-center justify-center">
                      <div className="p-6 rounded-2xl bg-navy/90 border border-primary/50 text-center max-w-sm shadow-2xl backdrop-blur-xs">
                        <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100 mb-1">
                          2,184 UNGROUPED KEYWORDS
                        </div>
                        <p className="text-[14px] text-white/85 mb-4">
                          Raw keyword exports mix transactional buyers, DIY stain searchers, and
                          local store visitors together.
                        </p>
                        <button
                          type="button"
                          onClick={handleClusterKeywords}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[13px] cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Cluster into 8 Topic Hubs</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Canvas Bottom Note */}
                <div className="px-5 py-3 bg-[#131820] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[12px] text-white/75">
                  <span>
                    <strong className="text-white">Note:</strong> AI groups; strategists decide
                    which clusters to target and in what order.
                  </span>
                  <span className="font-mono text-[11px] text-primary-100 font-bold">
                    SERP Overlap Threshold: ≥ 40%
                  </span>
                </div>
              </div>
            </div>

            {/* Right (5 cols): Selected Cluster Side Inspector Card */}
            <div className="lg:col-span-5">
              <div className="h-full rounded-[26px] bg-primary-50/60 border-2 border-primary-100 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-primary-100">
                    <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                      CLUSTER {activeCluster.code} · {activeCluster.intent.toUpperCase()} INTENT
                    </span>
                    <span className="font-mono text-[12px] font-extrabold text-navy">
                      {activeCluster.monthlyVolume}
                    </span>
                  </div>

                  <h3 className="text-[22px] sm:text-[26px] font-extrabold text-navy leading-tight">
                    {activeCluster.name}
                  </h3>

                  {/* Suggested Page Type */}
                  <div className="mt-4 p-3.5 rounded-xl bg-white border border-navy-10">
                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                      SUGGESTED TARGET PAGE TYPE
                    </div>
                    <div className="text-[13.5px] font-bold text-navy mt-0.5">
                      {activeCluster.suggestedPageType}
                    </div>
                  </div>

                  {/* Top 5 Keywords in Cluster */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-60 mb-2">
                      <span>TOP 5 KEYWORDS IN CLUSTER ({activeCluster.keywordCount} TOTAL)</span>
                      <span>MONTHLY VOL</span>
                    </div>
                    <div className="space-y-2">
                      {activeCluster.topKeywords.map((item) => (
                        <div
                          key={item.kw}
                          className="px-3.5 py-2.5 rounded-xl bg-white border border-navy-08 flex items-center justify-between gap-2 font-mono text-[12px]"
                        >
                          <span className="font-bold text-navy truncate">{item.kw}</span>
                          <span className="text-primary font-extrabold shrink-0">{item.vol}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Strategist Decision Box */}
                <div className="mt-6 pt-4 border-t border-primary-100">
                  <div className="p-4 rounded-xl bg-navy text-white">
                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                      STRATEGIST PRIORITY CALL
                    </div>
                    <p className="text-[13px] text-white/90 mt-1 leading-snug">
                      {activeCluster.strategistPriorityNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 3 — WEEKS OF WORK, COMPRESSED: THE ACCORDION BARS (bg: #f0f7fd)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50 border-b border-primary-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + Compress / Expand Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>TIME COMPRESSION ENGINE</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.12] tracking-tight">
                What Used to Take Weeks{' '}
                <span className="text-primary">Now Takes Hours</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setBarsCompressed((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-navy hover:text-white text-navy border border-navy-15 font-mono text-[12px] font-bold transition-colors cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-primary" />
                <span>
                  {barsCompressed
                    ? 'Show Manual Baseline Bars (71 hrs)'
                    : 'Compress with AI Co-Pilot (10.5 hrs)'}
                </span>
              </button>
            </div>
          </div>

          {/* 6 Horizontal Accordion Bellows Task Rows */}
          <div className="space-y-4">
            {COMPRESSED_TASKS.map((row) => {
              const manualPct = (row.manualHoursNum / 20) * 100;
              const aiPct = Math.max(12, (row.aiHoursNum / 20) * 100);

              return (
                <div
                  key={row.id}
                  className="p-5 sm:p-6 rounded-[22px] bg-white border border-navy-10 shadow-soft"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    {/* Task Title & Manual -> AI Delta */}
                    <div className="lg:col-span-4">
                      <div className="text-[16px] sm:text-[17px] font-extrabold text-navy">
                        {row.taskName}
                      </div>
                      <div className="font-mono text-[12px] font-bold text-navy-60 mt-1">
                        Manual: <span className="line-through">{row.manualTime}</span>{' '}
                        <span className="text-primary font-extrabold">→ AI + Strategist: {row.aiTime}</span>
                      </div>
                    </div>

                    {/* Center Accordion Bellows Bar */}
                    <div className="lg:col-span-5">
                      <div className="relative h-11 rounded-xl bg-primary-50 border border-navy-10 p-1.5 flex items-center overflow-hidden">
                        {/* Full Manual Track with Accordion Pleat Lines (aria-hidden) */}
                        <div
                          aria-hidden="true"
                          style={{ width: `${manualPct}%` }}
                          className="absolute left-1.5 top-1.5 bottom-1.5 rounded-lg bg-navy-08 border border-navy-15 flex items-center justify-between px-2 overflow-hidden"
                        >
                          {Array.from({ length: 14 }).map((_, pleatIdx) => (
                            <span
                              key={pleatIdx}
                              className="h-full w-[1px] bg-navy-15 transform -skew-x-12"
                            />
                          ))}
                          <span className="font-mono text-[10px] font-bold text-navy-60 ml-auto pr-1">
                            Manual: {row.manualTime}
                          </span>
                        </div>

                        {/* Compressed Blue AI Bar */}
                        <motion.div
                          initial={false}
                          animate={{
                            width: barsCompressed ? `${aiPct}%` : `${manualPct}%`,
                          }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: 'easeOut' }}
                          className="relative z-10 h-full rounded-lg bg-primary text-white px-3 flex items-center justify-between shadow-sm"
                        >
                          <span className="font-mono text-[11px] font-extrabold whitespace-nowrap">
                            {barsCompressed ? row.aiTime : row.manualTime}
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Right: How the Saved Time Is Used */}
                    <div className="lg:col-span-3 text-[12.5px] text-navy-70 lg:border-l lg:border-navy-08 lg:pl-4">
                      <div>
                        <strong className="text-navy">AI:</strong> {row.whatAiDoes}
                      </div>
                      <div className="mt-1">
                        <strong className="text-primary">Strategist:</strong> {row.whatStrategistDoes}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Caption Banner */}
          <div className="mt-8 p-5 rounded-2xl bg-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[14px] sm:text-[15px] font-semibold text-white/95">
              The time we save goes into strategy, content quality and link building —{' '}
              <span className="text-primary-100 font-extrabold">
                the work that moves rankings.
              </span>
            </p>
            <span className="font-mono text-[11px] text-white/65 shrink-0">
              Illustrative benchmark timings
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 4 — AI CONTENT BRIEF BUILDER: LIVE DEMO (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>AI CONTENT BRIEF BUILDER</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.12] tracking-tight">
              Briefs That Tell Writers{' '}
              <span className="text-primary">Exactly What to Cover</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Pick a target keyword preset on the left and click <strong className="text-navy">Build Brief →</strong> to watch how our AI co-pilot and human SEO strategist assemble a complete writer-ready blueprint.
            </p>
          </div>

          {/* Split Layout: Left 5 Cols = Topic Input & Presets | Right 7 Cols = Assembling Brief Document */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left (5 cols): Topic Input, 3 Preset Chips & Build Brief CTA */}
            <div className="lg:col-span-5 rounded-[24px] bg-primary-50/60 border border-primary-100 p-6 sm:p-7">
              <label
                htmlFor="brief-topic-input"
                className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy mb-2"
              >
                TARGET KEYWORD / TOPIC CLUSTER
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="brief-topic-input"
                  type="text"
                  value={customTopicQuery}
                  onChange={(e) => setCustomTopicQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-navy-15 font-mono text-[13px] font-bold text-navy focus:outline-none focus:border-primary"
                />
              </div>

              {/* 3 Preset Chips */}
              <div className="mt-5">
                <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-60 mb-2.5">
                  TRY A LIVE KEYWORD PRESET:
                </div>
                <div className="flex flex-col gap-2">
                  {BRIEF_PRESETS.map((preset) => {
                    const isSelected = preset.id === selectedPresetId;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectBriefPreset(preset)}
                        className={`w-full text-left px-4 py-3 rounded-xl border font-mono text-[12px] font-bold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-navy text-white border-navy shadow-sm'
                            : 'bg-white text-navy border-navy-12 hover:border-primary'
                        }`}
                      >
                        <span className="truncate">&ldquo;{preset.chipLabel}&rdquo;</span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isSelected ? 'text-primary' : 'text-navy-40'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Build Brief Button */}
              <button
                type="button"
                onClick={triggerBriefBuildAnimation}
                disabled={isBuildingBrief}
                className="mt-6 w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15px] shadow-soft transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isBuildingBrief ? 'Assembling Brief...' : 'Build Brief →'}</span>
              </button>

              {/* What Goes Into Every Brief Box */}
              <div className="mt-6 pt-5 border-t border-primary-100 space-y-2 text-[13px] text-navy-70">
                <div className="font-bold text-navy">Why writers love these briefs:</div>
                <p>
                  Instead of a vague keyword list, writers receive the exact H2/H3 structure,
                  questions from search &amp; AI answers, entity checklist, and internal URLs to
                  link.
                </p>
              </div>
            </div>

            {/* Right (7 cols): Assembling Brief Document */}
            <div className="lg:col-span-7">
              <div className="rounded-[26px] bg-white border-2 border-navy-15 shadow-xl overflow-hidden">
                {/* Document Top Header Bar */}
                <div className="px-6 py-4 bg-navy text-white flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded bg-primary text-white font-mono text-[10px] font-extrabold">
                      {activeBrief.briefCode}
                    </span>
                    <span className="font-mono text-[12px] font-bold text-white/90">
                      Topic: &ldquo;{activeBrief.chipLabel}&rdquo;
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-primary-100">
                    {Math.min(briefBuildStep, 8)} / 8 SECTIONS READY
                  </span>
                </div>

                {/* 8 Brief Sections Assembling Sequentially */}
                <div className="p-6 sm:p-8 space-y-4">
                  {/* 1. Search Intent & Target Reader */}
                  {briefBuildStep >= 1 && (
                    <div className="p-4 rounded-xl bg-primary-50/50 border border-navy-08">
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                        01. SEARCH INTENT &amp; TARGET READER
                      </div>
                      <div className="text-[13.5px] font-bold text-navy mt-1">
                        {activeBrief.searchIntent}
                      </div>
                      <div className="text-[13px] text-navy-70 mt-0.5">
                        Reader: {activeBrief.targetReader}
                      </div>
                    </div>
                  )}

                  {/* 2. Suggested Title & Meta Description */}
                  {briefBuildStep >= 2 && (
                    <div className="p-4 rounded-xl bg-white border border-navy-10">
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                        02. SUGGESTED TITLE &amp; META DESCRIPTION
                      </div>
                      <div className="font-mono text-[13px] font-extrabold text-navy mt-1">
                        Title: {activeBrief.suggestedTitle}
                      </div>
                      <div className="text-[12.5px] text-navy-70 mt-1">
                        Meta: {activeBrief.metaDescription}
                      </div>
                    </div>
                  )}

                  {/* 3. H2/H3 Outline (7 Headings) */}
                  {briefBuildStep >= 3 && (
                    <div className="p-4 rounded-xl bg-white border border-navy-10">
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary mb-2">
                        03. RECOMMENDED H2 / H3 OUTLINE ({activeBrief.outline.length} HEADINGS)
                      </div>
                      <ul className="space-y-1.5 font-mono text-[12px] text-navy">
                        {activeBrief.outline.map((heading) => (
                          <li
                            key={heading}
                            className={
                              heading.startsWith('H3:')
                                ? 'pl-4 text-navy-70 font-medium'
                                : 'font-bold text-navy'
                            }
                          >
                            {heading}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 4. Questions to Answer + 5. Key Entities (2-Col Subgrid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {briefBuildStep >= 4 && (
                      <div className="p-4 rounded-xl bg-white border border-navy-10">
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary mb-2">
                          04. QUESTIONS TO ANSWER (SERP &amp; AI)
                        </div>
                        <ul className="space-y-1.5 text-[12.5px] text-navy-70">
                          {activeBrief.questionsToAnswer.map((q) => (
                            <li key={q} className="flex items-start gap-1.5">
                              <span className="text-primary font-bold">•</span>
                              <span>{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {briefBuildStep >= 5 && (
                      <div className="p-4 rounded-xl bg-white border border-navy-10">
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary mb-2">
                          05. KEY ENTITIES &amp; TERMS TO INCLUDE
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeBrief.keyEntities.map((ent) => (
                            <span
                              key={ent}
                              className="px-2.5 py-1 rounded-lg bg-primary-50 border border-primary-100 font-mono text-[11px] font-bold text-navy"
                            >
                              {ent}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 6. Recommended Length & Media */}
                  {briefBuildStep >= 6 && (
                    <div className="p-3.5 rounded-xl bg-primary-50/50 border border-navy-08 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                        06. LENGTH &amp; MEDIA SPEC:
                      </span>
                      <span className="font-mono text-[12px] font-bold text-navy">
                        {activeBrief.lengthAndMedia}
                      </span>
                    </div>
                  )}

                  {/* 7. Internal Links to Add (3 URLs in Monospace) */}
                  {briefBuildStep >= 7 && (
                    <div className="p-4 rounded-xl bg-white border border-navy-10">
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary mb-2">
                        07. INTERNAL LINKS TO ADD (3 TARGET URLS)
                      </div>
                      <div className="space-y-1.5 font-mono text-[11.5px]">
                        {activeBrief.internalLinks.map((lnk) => (
                          <div
                            key={lnk.url}
                            className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-primary-50/40 border border-navy-08"
                          >
                            <span className="text-navy-70">
                              Anchor: <strong className="text-navy">&ldquo;{lnk.anchor}&rdquo;</strong>
                            </span>
                            <span className="text-primary font-bold">{lnk.url}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 8. Strategist Notes in Caveat */}
                  {briefBuildStep >= 8 && (
                    <div className="p-4 rounded-xl bg-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100 block">
                          08. STRATEGIST MARGIN NOTE
                        </span>
                        <p className="font-caveat text-[22px] text-white mt-0.5 leading-snug">
                          &ldquo;{activeBrief.strategistNote}&rdquo;
                        </p>
                      </div>
                      <span className="px-3 py-1.5 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold shrink-0 self-start sm:self-center">
                        Reviewed by: SEO Strategist ✓
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Connected AI Reporting Cross-Link Bar */}
          <div className="mt-8 p-4 rounded-2xl bg-white border border-navy-08 flex flex-wrap items-center justify-between gap-3 text-[13px] text-navy-70">
            <span>
              Want organic search, AI citation share, and paid + CRM pipeline unified in one weekly executive brief?
            </span>
            <Link
              to="/ai-solutions/ai-analytics-reporting"
              className="font-mono text-[12px] font-extrabold text-primary hover:text-navy inline-flex items-center gap-1"
            >
              <span>Explore AI Analytics &amp; Reporting</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AiPoweredSeo;
