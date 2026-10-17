'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  ShoppingBag,
  Ruler,
  Scissors,
  Search,
  Video,
  Bot,
  Repeat,
  Plus,
  Minus,
  AlertCircle,
  Loader2,
  Play,
  Pause,
  Tag,
  Clock,
  Star,
  Layers,
  Award,
  TrendingUp,
} from 'lucide-react';
import { industries, IndustryIcon } from '@/app/industries/_components/Industries';

const IMG_EDITORIAL_COVER =
  '/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const IMG_RUNWAY_1 =
  '/images/hero_laptop_ui_showcase_1791104898778.jpg';
const IMG_RUNWAY_2 =
  '/images/project_fintech_saas_ui_1791104929193.jpg';
const IMG_RUNWAY_3 =
  '/images/project_ai_enterprise_ui_1791104952051.jpg';
const IMG_RUNWAY_4 =
  '/images/why_webxcode_team_office_1791104914357.jpg';
const IMG_AVATAR_CLIENT =
  '/images/testimonial_2_avatar_1791105060710.jpg';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT FASHION & LIFESTYLE ITEM FROM INDUSTRIES
============================================================================ */
const fashionIndustry =
  industries.find((item) => item.slug === 'fashion-lifestyle') ||
  industries[7];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS
============================================================================ */

/* Section 1: Hero — Magazine Cover Teaser Lines */
const MAGAZINE_COVER_LINES = [
  {
    id: 'cov-1',
    kicker: 'CASE REPORT · P. 14',
    prefix: '',
    highlight: '3x',
    suffix: ' online sales — how one label did it',
  },
  {
    id: 'cov-2',
    kicker: 'FIT ENGINEERING · P. 28',
    prefix: 'Size returns, ',
    highlight: 'solved',
    suffix: '',
  },
  {
    id: 'cov-3',
    kicker: 'VISUAL STUDIO · P. 42',
    prefix: 'AI videos that ',
    highlight: 'sell the look',
    suffix: '',
  },
  {
    id: 'cov-4',
    kicker: 'COLLECTION DROPS · P. 56',
    prefix: 'Launch drops that ',
    highlight: 'sell out',
    suffix: '',
  },
];

/* Section 2: Who We Serve — The Runway (10 Segments) */
export interface RunwaySegmentItem {
  id: string;
  lookNo: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  tag: string;
}

const RUNWAY_SEGMENTS: RunwaySegmentItem[] = [
  {
    id: 'run-d2c',
    lookNo: 'LOOK 01',
    name: 'Fashion D2C Brands',
    description:
      'High-speed flagship stores built for seasonal drops, size finders and mobile impulse checkouts.',
    image: IMG_EDITORIAL_COVER,
    imageAlt: 'Fashion D2C apparel flagship online store',
    tag: 'Apparel & Capsules',
  },
  {
    id: 'run-ethnic',
    lookNo: 'LOOK 02',
    name: 'Ethnic & Occasion Wear',
    description:
      'Richly detailed product pages with blouse/kurta custom tailoring inputs, video shopping and global shipping.',
    image: IMG_RUNWAY_1,
    imageAlt: 'Luxury Indian ethnic and wedding occasion wear online boutique',
    tag: 'Bridal & Festive',
  },
  {
    id: 'run-streetwear',
    lookNo: 'LOOK 03',
    name: 'Streetwear',
    description:
      'Hype countdown drop rooms, password-protected early access queues and instant UPI/Apple Pay checkout.',
    image: IMG_RUNWAY_2,
    imageAlt: 'Streetwear limited edition drop landing page',
    tag: 'Limited Drops',
  },
  {
    id: 'run-activewear',
    lookNo: 'LOOK 04',
    name: 'Activewear & Athleisure',
    description:
      'Fabric stretch & compression guides, activity-based filtering and "Complete the Set" bundle builders.',
    image: IMG_RUNWAY_3,
    imageAlt: 'Performance activewear and athleisure D2C store',
    tag: 'Performance & Sets',
  },
  {
    id: 'run-footwear',
    lookNo: 'LOOK 05',
    name: 'Footwear',
    description:
      '360° sneaker/shoe spins, UK/EU/US/cm foot-length conversion tools and 1-click size exchange portals.',
    image: IMG_RUNWAY_4,
    imageAlt: 'Footwear and sneaker 360 product showcase',
    tag: 'Sneakers & Craft',
  },
  {
    id: 'run-jewelry',
    lookNo: 'LOOK 06',
    name: 'Jewelry & Accessories',
    description:
      'Macro-zoom gemstone & plating views, ring-size finders, hallmark trust badges and gift-box personalization.',
    image: IMG_EDITORIAL_COVER,
    imageAlt: 'Fine and demi-fine jewelry online store with macro zoom',
    tag: 'Fine & Demi-Fine',
  },
  {
    id: 'run-bags',
    lookNo: 'LOOK 07',
    name: 'Bags & Leather Goods',
    description:
      '"What fits inside" laptop/phone capacity visualizers, monogramming previews and color swatch switchers.',
    image: IMG_RUNWAY_1,
    imageAlt: 'Luxury leather handbags and travel goods store',
    tag: 'Carry & Travel',
  },
  {
    id: 'run-kidswear',
    lookNo: 'LOOK 08',
    name: 'Kidswear',
    description:
      'Age-and-height growth size predictors, soft-fabric safety certifications and multi-pack value bundles.',
    image: IMG_RUNWAY_2,
    imageAlt: 'Kids apparel and organic cotton clothing online store',
    tag: 'Age & Height Fit',
  },
  {
    id: 'run-boutiques',
    lookNo: 'LOOK 09',
    name: 'Boutiques & Designer Labels',
    description:
      'Runway lookbook storytelling, made-to-measure appointment booking and private clienteling portals.',
    image: IMG_RUNWAY_3,
    imageAlt: 'Designer couture label and luxury boutique digital flagship',
    tag: 'Runway & Couture',
  },
  {
    id: 'run-gifting',
    lookNo: 'LOOK 10',
    name: 'Lifestyle & Gifting',
    description:
      'Build-your-own gift box configurators, custom message cards and corporate bulk gifting portals.',
    image: IMG_RUNWAY_4,
    imageAlt: 'Curated lifestyle and luxury gifting online store',
    tag: 'Curated Boxes',
  },
];

/* Section 3: Size Chart & Size Logic Data */
export type FitPreferenceOption = 'Slim' | 'Regular' | 'Relaxed';
export type BodyShapeOption = 'Athletic' | 'Average' | 'Broad';

export interface SizeChartRow {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  chestIn: string;
  waistIn: string;
  lengthIn: string;
  chestCm: string;
  waistCm: string;
  lengthCm: string;
}

const SIZE_CHART_TABLE: SizeChartRow[] = [
  {
    size: 'S',
    chestIn: '36–38"',
    waistIn: '29–31"',
    lengthIn: '27.5"',
    chestCm: '91–97 cm',
    waistCm: '74–79 cm',
    lengthCm: '70 cm',
  },
  {
    size: 'M',
    chestIn: '39–41"',
    waistIn: '32–34"',
    lengthIn: '28.5"',
    chestCm: '99–104 cm',
    waistCm: '81–86 cm',
    lengthCm: '72.5 cm',
  },
  {
    size: 'L',
    chestIn: '42–44"',
    waistIn: '35–37"',
    lengthIn: '29.5"',
    chestCm: '107–112 cm',
    waistCm: '89–94 cm',
    lengthCm: '75 cm',
  },
  {
    size: 'XL',
    chestIn: '45–47"',
    waistIn: '38–40"',
    lengthIn: '30.5"',
    chestCm: '114–119 cm',
    waistCm: '97–102 cm',
    lengthCm: '77.5 cm',
  },
];

const SIZE_ORDER: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[] = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
];

/* Section 4: Drop Countdown Details */
const DROP_LAUNCH_DATA = {
  dropCode: 'DROP 07 · LIMITED EDITION',
  title: 'THE MONSOON EDIT',
  subtitle: '24-Piece Resort & Linen Capsule · Numbered Run',
  waitlistCount: '2,340 people waiting',
  featureChips: [
    'Waitlist & early access',
    'Launch-day traffic ready',
    'WhatsApp & email launch alerts',
    'Limited-stock urgency badges',
  ],
};

/* Section 5: Services — The Hanger Rail (9 Garment Tag Cards) */
export interface HangerServiceItem {
  id: string;
  styleCode: string;
  title: string;
  shortHook: string;
  description: string;
  bullets: [string, string, string];
}

const HANGER_RAIL_SERVICES: HangerServiceItem[] = [
  {
    id: 'hang-1',
    styleCode: 'LOT 01 // STORE',
    title: 'Fashion E-commerce Store',
    shortHook: 'Shopify or custom stores built for collections, variants and drops',
    description:
      'We design and engineer fast, mobile-first fashion flagships where color swatches, size availability, fabric movement videos and 1-page checkout work in harmony.',
    bullets: [
      'Instant color/fabric swatch switching on collection grids without page reloads',
      'Slide-out shopping bag with "Complete the Look" cross-sells & free shipping meter',
      'High-speed 1-page UPI, card and COD verification checkout',
    ],
  },
  {
    id: 'hang-2',
    styleCode: 'LOT 02 // EDITORIAL',
    title: 'Lookbooks & Collection Pages',
    shortHook: 'Editorial storytelling that sells the look',
    description:
      'Turn seasonal campaign shoots into shoppable magazine spreads where customers can buy individual pieces or add the entire outfit in one tap.',
    bullets: [
      'Interactive hotspot pins and split-screen editorial lookbook layouts',
      '"Add Full Look to Bag" bundle pricing with automatic size selection',
      'Reusable campaign templates your team can launch in minutes for every new drop',
    ],
  },
  {
    id: 'hang-3',
    styleCode: 'LOT 03 // FIT TECH',
    title: 'Size & Fit Tools',
    shortHook: 'Size finders, fit notes and size charts that cut returns',
    description:
      'Eliminate "should I order M or L?" hesitation with interactive size recommenders, garment vs body measurement toggles and real-buyer fit sliders.',
    bullets: [
      '60-second Height + Weight + Fit Preference size calculator on every product page',
      'Dynamic model reference notes ("Model is 5\'10" wearing size M") per color variant',
      'Verified customer review filters by height, body type and "Runs Small / True to Size"',
    ],
  },
  {
    id: 'hang-4',
    styleCode: 'LOT 04 // AI MOTION',
    title: 'AI Generated Videos & Product Visuals',
    shortHook: 'Product spins, collection teasers and campaign videos',
    description:
      'Bring static catalog photos to life with editorial AI motion clips showing fabric drape, 360° garment turns and high-fashion launch teasers at a fraction of studio shoot time.',
    bullets: [
      '9:16 vertical product motion loops for PDPs and collection headers',
      'On-model drape and texture close-up visuals across every colorway',
      'Produced with strict quality control and clear AI disclosure where required',
    ],
  },
  {
    id: 'hang-5',
    styleCode: 'LOT 05 // AI STYLIST',
    title: 'AI Style Assistant',
    shortHook: '"Complete the look" suggestions and style Q&A 24/7',
    description:
      'An intelligent digital personal stylist trained on your catalog that recommends matching trousers, footwear or jewelry and answers fabric-care questions 24/7.',
    bullets: [
      'Suggests occasion-ready outfits ("What to wear for a beach wedding or brunch")',
      'Answers fabric composition, wash-care, lining and transparency questions',
      'Syncs shopper size and style preferences to your email & WhatsApp CRM',
    ],
  },
  {
    id: 'hang-6',
    styleCode: 'LOT 06 // SEARCH',
    title: 'SEO for Fashion',
    shortHook: 'Rank for category, occasion and style searches',
    description:
      'Win high-intent organic traffic for searches like "pure linen shirts for men", "organza festive saree" or "oversized heavyweight streetwear tee".',
    bullets: [
      'SEO-optimized collection architecture by fabric, silhouette, color and occasion',
      'Rich Product, Price, Availability and Review schema for visual Google results',
      'Core Web Vitals speed optimization even on image-heavy lookbook pages',
    ],
  },
  {
    id: 'hang-7',
    styleCode: 'LOT 07 // SHOPPING ADS',
    title: 'Google Shopping & Performance Max',
    shortHook: 'Visual ads for high-intent shoppers',
    description:
      'Scale profitable ROAS with clean Merchant Center feeds that automatically pause out-of-stock core sizes (S/M/L) so you never waste ad spend on broken size runs.',
    bullets: [
      'Size-stock-aware feed rules that prioritize full-size-run bestsellers',
      'High-intent Google Shopping, PMax and Search campaigns by margin tier',
      'Server-side conversion tracking for accurate attribution across devices',
    ],
  },
  {
    id: 'hang-8',
    styleCode: 'LOT 08 // EXCHANGES',
    title: 'Returns & Exchange Experience',
    shortHook: 'Easy exchanges, WhatsApp updates, store credit',
    description:
      'Save the sale when a size does not fit. We build self-serve exchange flows that nudge shoppers toward an instant size swap or bonus store credit instead of a refund.',
    bullets: [
      '1-click "Swap for Size L" instant exchange portal with reverse pickup tracking',
      'Automated WhatsApp status alerts from pickup to replacement dispatch',
      'Bonus store-credit incentives that retain revenue inside your brand',
    ],
  },
  {
    id: 'hang-9',
    styleCode: 'LOT 09 // DIRECTION',
    title: 'Brand Identity & Art Direction',
    shortHook: 'Logo, visual language and site art direction',
    description:
      'Give your label the unmistakable editorial authority of an international fashion house—from custom wordmarks and garment-tag systems to digital lookbook grids.',
    bullets: [
      'Editorial typography, monogram systems and digital design guidelines',
      'Art direction for product cards, lookbook grids and packaging hang-tags',
      'Cohesive visual identity across your flagship store and launch drops',
    ],
  },
];

/* Section 6: Shop the Lookbook — Page-Turn Demo (4 Looks) */
export interface LookbookProductItem {
  id: string;
  name: string;
  variantNote: string;
  price: number;
  thumb: string;
}

export interface LookbookSpread {
  lookNumber: string;
  pageCode: string;
  title: string;
  seasonTag: string;
  stylingNote: string;
  editorialImage: string;
  editorialAlt: string;
  modelSpec: string;
  items: LookbookProductItem[];
}

const LOOKBOOK_SPREADS: LookbookSpread[] = [
  {
    lookNumber: '01',
    pageCode: '01 / 04',
    title: 'LOOK 01 — Monochrome Tailoring',
    seasonTag: 'AUTUMN / WINTER CAPSULE',
    stylingNote:
      'Structured double-breasted wool-blend blazer paired with wide-leg pleated trousers and minimal leather loafers for effortless gallery-to-dinner polish.',
    editorialImage: IMG_EDITORIAL_COVER,
    editorialAlt: 'Look 01 Monochrome Tailoring editorial fashion spread',
    modelSpec: "Model is 5'11\" wearing Size M Blazer & 32 Trousers",
    items: [
      {
        id: 'lk1-1',
        name: 'Relaxed Double-Breasted Blazer',
        variantNote: 'Midnight Navy · Sizes S–XL',
        price: 6499,
        thumb: IMG_EDITORIAL_COVER,
      },
      {
        id: 'lk1-2',
        name: 'Wide-Leg Pleated Trouser',
        variantNote: 'High-Rise Tailored Fit',
        price: 3899,
        thumb: IMG_RUNWAY_1,
      },
      {
        id: 'lk1-3',
        name: 'Ribbed Supima Cotton Tank',
        variantNote: '240 GSM Heavyweight Knit',
        price: 1499,
        thumb: IMG_RUNWAY_2,
      },
    ],
  },
  {
    lookNumber: '02',
    pageCode: '02 / 04',
    title: 'LOOK 02 — Festive Organza & Silk',
    seasonTag: 'OCCASION & CEREMONY EDIT',
    stylingNote:
      'Hand-embroidered Chanderi silk kurta set layered with a sheer metallic-zari organza dupatta and handcrafted leather juttis.',
    editorialImage: IMG_RUNWAY_1,
    editorialAlt: 'Look 02 Festive Organza and Silk occasion wear spread',
    modelSpec: "Model is 5'8\" wearing Size S (Custom Sleeve Length)",
    items: [
      {
        id: 'lk2-1',
        name: 'Zari Embroidered Silk Kurta Set',
        variantNote: 'Includes Straight Pant · XS–XXL',
        price: 11900,
        thumb: IMG_RUNWAY_1,
      },
      {
        id: 'lk2-2',
        name: 'Sheer Scallop Organza Dupatta',
        variantNote: 'Hand-Finished Edging · 2.5m',
        price: 3400,
        thumb: IMG_EDITORIAL_COVER,
      },
      {
        id: 'lk2-3',
        name: 'Artisan Leather Embroidered Jutti',
        variantNote: 'Cushioned Footbed · Euro 36–41',
        price: 2899,
        thumb: IMG_RUNWAY_4,
      },
    ],
  },
  {
    lookNumber: '03',
    pageCode: '03 / 04',
    title: 'LOOK 03 — Weekend Linen',
    seasonTag: 'RESORT & COASTAL EDIT',
    stylingNote:
      'Breathable 100% European flax linen camp-collar shirt styled over drawstring relaxed trousers and a woven leather crossbody.',
    editorialImage: IMG_RUNWAY_2,
    editorialAlt: 'Look 03 Weekend Linen resort capsule spread',
    modelSpec: "Model is 6'0\" wearing Size L (Relaxed Fit)",
    items: [
      {
        id: 'lk3-1',
        name: 'Pure Flax Linen Camp Shirt',
        variantNote: 'Pre-Washed Soft Drape · S–XXL',
        price: 3299,
        thumb: IMG_RUNWAY_2,
      },
      {
        id: 'lk3-2',
        name: 'Drawstring Linen Lounge Pant',
        variantNote: 'Tapered Ankle · 30" Inseam',
        price: 3699,
        thumb: IMG_RUNWAY_3,
      },
      {
        id: 'lk3-3',
        name: 'Woven Leather Crossbody Sling',
        variantNote: 'Full-Grain Vegetable Tanned',
        price: 4999,
        thumb: IMG_EDITORIAL_COVER,
      },
    ],
  },
  {
    lookNumber: '04',
    pageCode: '04 / 04',
    title: 'LOOK 04 — Utility Street Drop',
    seasonTag: 'DROP 07 ARCHIVE SERIES',
    stylingNote:
      'Boxy 480 GSM French-terry hoodie paired with multi-pocket parachute cargo pants and chunky technical runners.',
    editorialImage: IMG_RUNWAY_3,
    editorialAlt: 'Look 04 Utility Streetwear capsule lookbook spread',
    modelSpec: "Model is 5'10\" wearing Size M (Oversized Drop-Shoulder)",
    items: [
      {
        id: 'lk4-1',
        name: '480 GSM Heavyweight Boxy Hoodie',
        variantNote: 'Drop-Shoulder Fit · XS–XL',
        price: 4299,
        thumb: IMG_RUNWAY_3,
      },
      {
        id: 'lk4-2',
        name: 'Ripstop Parachute Cargo Pant',
        variantNote: 'Adjustable Toggle Hem',
        price: 4599,
        thumb: IMG_RUNWAY_2,
      },
      {
        id: 'lk4-3',
        name: 'Technical Mesh Runner Sneaker',
        variantNote: 'Dual-Density Sole · UK 6–11',
        price: 6999,
        thumb: IMG_RUNWAY_4,
      },
    ],
  },
];

/* Section 7: AI Videos That Sell (4 Vertical 9:16 Phone Frames) */
export interface AiVideoFrameItem {
  id: string;
  pill: string;
  useCase: string;
  durationTag: string;
  caption: string;
  heightOffsetClass: string;
  image: string;
  imageAlt: string;
}

const AI_VIDEO_FRAMES: AiVideoFrameItem[] = [
  {
    id: 'vid-1',
    pill: 'Product 360° Spin',
    useCase: 'For product pages',
    durationTag: '0:06 LOOP · 4K',
    caption: 'Shows front, side, back drape & hemline motion on every SKU.',
    heightOffsetClass: 'lg:mt-0',
    image: IMG_EDITORIAL_COVER,
    imageAlt: 'AI generated 360 degree garment spin preview',
  },
  {
    id: 'vid-2',
    pill: 'Collection Teaser',
    useCase: 'For launch campaigns',
    durationTag: '0:12 REEL · EDITORIAL',
    caption: 'Cinematic runway & mood teasers ready for countdown drop pages.',
    heightOffsetClass: 'lg:mt-8',
    image: IMG_RUNWAY_1,
    imageAlt: 'AI generated seasonal collection launch teaser video',
  },
  {
    id: 'vid-3',
    pill: 'Fabric Close-up',
    useCase: 'For material & quality proof',
    durationTag: '0:05 MACRO · WEAVE',
    caption: 'Highlights linen texture, zari embroidery & leather grain.',
    heightOffsetClass: 'lg:mt-2',
    image: IMG_RUNWAY_2,
    imageAlt: 'Macro fabric weave and embroidery movement close-up',
  },
  {
    id: 'vid-4',
    pill: 'Size & Fit Explainer',
    useCase: 'For reducing size returns',
    durationTag: '0:08 FIT · S / M / L',
    caption: 'Side-by-side comparison of Slim vs Relaxed drape on body.',
    heightOffsetClass: 'lg:mt-10',
    image: IMG_RUNWAY_3,
    imageAlt: 'Visual size and fit comparison explainer video',
  },
];

/* Section 8: Case Study — Sold Out (Styled Like a Sold-Out Product Page) */
const SOLD_OUT_CASE_STUDY = {
  brandName: 'KORA STUDIO (Placeholder)',
  collectionTitle: 'The Resort Linen & Indigo Capsule — Drop 04',
  skuCode: 'CASE-REF // D2C APPAREL · 6 MONTHS',
  ribbonText: 'SOLD OUT IN 4 HOURS',
  sizeBoxMetrics: [
    { value: '3.2x', label: 'Revenue' },
    { value: '−34%', label: 'Returns' },
    { value: '+58%', label: 'Conversion' },
    { value: '12K', label: 'Waitlist' },
  ],
  whatWeDid: [
    'Store redesign',
    'Size finder',
    'Drop landing page',
    'AI product videos',
    'Google Shopping',
  ],
  quote:
    'Our previous site crashed during drops and we were losing nearly a third of our margin to size exchanges. WebXCode rebuilt our store with an interactive Size Finder and a high-speed countdown drop room—our Resort Capsule sold out in 4 hours and size returns dropped by 34%.',
  clientName: 'Rhea Kapoor (Placeholder)',
  clientRole: 'Creative Director & Co-Founder, Contemporary Apparel Label',
};

/* Section 9: FAQ — The Care Label (6 Questions) */
const CARE_LABEL_FAQS = [
  {
    id: 'ffaq-1',
    code: 'CARE 01',
    question: 'Can you build a size finder for our products?',
    answer:
      'Yes. We build custom "Find My Size" calculators tailored to your exact garment grading chart—allowing shoppers to enter their height, weight and fit preference (Slim, Regular, Oversized) to get an instant size recommendation with confidence scores, plus toggleable inches/cm garment and body measurements.',
  },
  {
    id: 'ffaq-2',
    code: 'CARE 02',
    question: 'How do you handle launches with heavy traffic?',
    answer:
      'We architect drop landing pages with edge caching, optimized media delivery, countdown timers, early-access VIP password gates and instant 1-page checkouts so your store stays sub-2-second fast even when thousands of shoppers click your WhatsApp or email launch link at the same minute.',
  },
  {
    id: 'ffaq-3',
    code: 'CARE 03',
    question: 'Can you create AI product videos for our catalog?',
    answer:
      'Yes. We produce high-fashion AI product motion loops, 360° garment turns, fabric-drape close-ups and collection teaser clips directly from your lookbook photography—giving every product page video movement at a fraction of traditional video shoot costs, with clear AI disclosure where required.',
  },
  {
    id: 'ffaq-4',
    code: 'CARE 04',
    question: "Shopify or custom — what's better for a fashion brand?",
    answer:
      'For 90% of D2C fashion, streetwear and ethnic wear brands, a custom-engineered Shopify (or Shopify Plus) storefront is ideal—combining rock-solid inventory, drops and payment gateways with a 100% bespoke editorial design. For complex multi-vendor marketplaces or bespoke made-to-measure configurators, we also build headless and custom stacks.',
  },
  {
    id: 'ffaq-5',
    code: 'CARE 05',
    question: 'How do you reduce returns and exchanges?',
    answer:
      'We attack size returns from both sides: before purchase (interactive size finder, "Model is 5\'10" wearing M" captions, fabric stretch indicators, and real-customer fit reviews) and after purchase (a 1-click self-serve size-swap portal that converts refund requests into instant size exchanges or bonus store credit).',
  },
  {
    id: 'ffaq-6',
    code: 'CARE 06',
    question:
      'Can you help us rank for searches like "linen shirts for men"?',
    answer:
      'Absolutely. Our Fashion SEO framework builds indexable collection hubs around high-intent fabric, silhouette, color and occasion keywords (e.g., "pure linen shirts for men", "haldi ceremony kurta set"), backed by rich Product schema and fast mobile Core Web Vitals.',
  },
];

/* Section 10: Categories for Fitting Room Fit Check Form */
const FIT_CHECK_CATEGORIES = [
  'Apparel',
  'Ethnic',
  'Streetwear',
  'Footwear',
  'Jewelry & Accessories',
  'Other',
];

/* ============================================================================
   MAIN FASHION & LIFESTYLE INDUSTRY PAGE COMPONENT
============================================================================ */
const FashionLifestyle: React.FC<{
  onOpenQuoteModal?: (service?: string) => void;
}> = ({ onOpenQuoteModal: propOpenQuoteModal }) => {
  const quoteModalCtx = useQuoteModal();
  const onOpenQuoteModal = (service?: string) => {
    if (propOpenQuoteModal) propOpenQuoteModal(service);
    else quoteModalCtx.openQuoteModal(service);
  };
  const prefersReducedMotion = useReducedMotion();

  /* Section 2: The Runway Spotlight & Auto-Glide State */
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);
  const [runwayPaused, setRunwayPaused] = useState<boolean>(false);

  /* Section 3: Interactive Size Finder Demo State */
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [fitPreference, setFitPreference] =
    useState<FitPreferenceOption>('Regular');
  const [bodyShape, setBodyShape] = useState<BodyShapeOption>('Average');
  const [sizeChartOpen, setSizeChartOpen] = useState<boolean>(false);

  /* Section 4: Drop Countdown Timer + Waitlist State */
  // Targets ~7 days (6 days, 18 hours, 42 mins, 19 secs) from page load and loops cleanly
  const INITIAL_DROP_SECONDS = 6 * 86400 + 18 * 3600 + 42 * 60 + 19;
  const [dropSecondsLeft, setDropSecondsLeft] =
    useState<number>(INITIAL_DROP_SECONDS);
  const [waitlistEmail, setWaitlistEmail] = useState<string>('');
  const [waitlistError, setWaitlistError] = useState<string>('');
  const [waitlistJoined, setWaitlistJoined] = useState<boolean>(false);

  /* Section 5: Hanger Rail Active Garment Tag + Scroll Ref */
  const hangerRailRef = useRef<HTMLDivElement | null>(null);
  const [activeHangerId, setActiveHangerId] = useState<string>('hang-1');

  /* Section 6: Shop the Lookbook Page-Turn State */
  const [activeLookIndex, setActiveLookIndex] = useState<number>(2); // Defaults to LOOK 03 — Weekend Linen
  const [addedLookItems, setAddedLookItems] = useState<string[]>([]);
  const [fullLookAdded, setFullLookAdded] = useState<boolean>(false);

  /* Section 7: AI Videos Motion Play/Pause Toggle */
  const [aiVideosPlaying, setAiVideosPlaying] = useState<boolean>(true);

  /* Section 9: Care Label FAQ Accordion State */
  const [openFaqId, setOpenFaqId] = useState<string>('ffaq-1');

  /* Section 10: Fitting Room Mirror Fit Check Form State */
  const [fitForm, setFitForm] = useState({
    name: '',
    email: '',
    phone: '',
    storeUrl: '',
    category: 'Apparel',
  });
  const [fitErrors, setFitErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    storeUrl?: string;
  }>({});
  const [fitSubmitting, setFitSubmitting] = useState<boolean>(false);
  const [fitSubmitted, setFitSubmitted] = useState<boolean>(false);

  /* SEO Document Title & Meta Description */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Fashion & Lifestyle Website Development, SEO & AI Creative | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'We design and build high-converting online stores, editorial lookbooks, size finders, launch drop pages, SEO and AI product videos for fashion, apparel and lifestyle brands.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Section 2: Auto-Advance Runway Spotlight Every 3.6 Seconds */
  useEffect(() => {
    if (prefersReducedMotion || runwayPaused) return;
    const timer = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % RUNWAY_SEGMENTS.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [prefersReducedMotion, runwayPaused]);

  /* Section 4: Live Countdown Tick (Loops When Reaching Zero) */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setDropSecondsLeft((prev) =>
        prev <= 1 ? INITIAL_DROP_SECONDS : prev - 1
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, INITIAL_DROP_SECONDS]);

  const countdownDays = Math.floor(dropSecondsLeft / 86400);
  const countdownHours = Math.floor((dropSecondsLeft % 86400) / 3600);
  const countdownMins = Math.floor((dropSecondsLeft % 3600) / 60);
  const countdownSecs = dropSecondsLeft % 60;

  /* Section 3: Calculate Recommended Size from Height, Weight, Fit Preference & Body Shape */
  const computeRecommendedSize = () => {
    // Base index from weight (0=XS, 1=S, 2=M, 3=L, 4=XL, 5=XXL)
    let idx = 2; // default M
    if (weightKg < 55) idx = 0;
    else if (weightKg < 64) idx = 1;
    else if (weightKg < 75) idx = 2;
    else if (weightKg < 86) idx = 3;
    else if (weightKg < 96) idx = 4;
    else idx = 5;

    // Height adjustment
    if (heightCm >= 184 && idx < 4) idx += 1;
    if (heightCm <= 160 && idx > 0) idx -= 1;

    // Fit preference & body shape adjustment
    if (fitPreference === 'Relaxed') idx = Math.min(5, idx + 1);
    if (fitPreference === 'Slim' && bodyShape !== 'Broad') {
      idx = Math.max(0, idx - 1);
    }
    if (bodyShape === 'Broad' && fitPreference !== 'Slim') {
      idx = Math.min(5, idx + 1);
    }

    const recommendedSize = SIZE_ORDER[idx];
    const confidence =
      fitPreference === 'Regular' && bodyShape === 'Average'
        ? 94
        : fitPreference === 'Relaxed'
        ? 92
        : 90;

    return { size: recommendedSize, confidence };
  };

  const sizeRecommendation = computeRecommendedSize();

  const formatHeightFeetInches = (cm: number) => {
    const totalInches = Math.round(cm / 2.54);
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return `${feet}'${inches}"`;
  };

  /* Section 4: Waitlist Submit Handler */
  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !waitlistEmail.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(waitlistEmail.trim())
    ) {
      setWaitlistError('Please enter a valid email for early access.');
      return;
    }
    setWaitlistError('');
    setWaitlistJoined(true);
  };

  /* Section 5: Hanger Rail Scroll Helper */
  const scrollHangerRail = (dir: 'prev' | 'next') => {
    if (!hangerRailRef.current) return;
    const offset = dir === 'next' ? 320 : -320;
    hangerRailRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  /* Section 6: Lookbook Helpers */
  const currentLookSpread =
    LOOKBOOK_SPREADS[activeLookIndex] || LOOKBOOK_SPREADS[0];
  const currentLookTotal = currentLookSpread.items.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const handleToggleLookItem = (itemId: string) => {
    setFullLookAdded(false);
    setAddedLookItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  /* Section 10: Fitting Room Fit Check Form Submit Handler */
  const handleFitCheckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      name?: string;
      email?: string;
      phone?: string;
      storeUrl?: string;
    } = {};

    if (!fitForm.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (
      !fitForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fitForm.email.trim())
    ) {
      errors.email = 'Please enter a valid work email.';
    }
    if (!fitForm.phone.trim() || fitForm.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid phone / WhatsApp number.';
    }
    if (!fitForm.storeUrl.trim()) {
      errors.storeUrl = 'Please enter your store or brand URL.';
    }

    setFitErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setFitSubmitting(true);
    // TODO: Connect Free Store Fit Check form to backend CRM / email service
    setTimeout(() => {
      setFitSubmitting(false);
      setFitSubmitted(true);
    }, 600);
  };

  const otherIndustries = industries.filter(
    (ind) => ind.slug !== 'fashion-lifestyle'
  );

  /* JSON-LD Structured Data (Service, BreadcrumbList, FAQPage) */
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Fashion & Lifestyle Website Development, SEO & AI Creative',
      serviceType:
        'Fashion E-commerce Development, Size & Fit Tools, Lookbook & Drop Pages, Fashion SEO, AI Product Videos',
      audience: {
        '@type': 'Audience',
        audienceType: 'fashion, apparel and lifestyle brands',
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
          name: fashionIndustry.name,
          item: 'https://webxcode.com/industries/fashion-lifestyle',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: CARE_LABEL_FAQS.map((faq) => ({
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

      {/* Scoped High-Fashion Editorial Keyframes (Strict #0571c2, #1e242e, #ffffff) */}
      <style>{`
        @keyframes hangerGentleSway {
          0%, 100% { transform: rotate(0deg); }
          35% { transform: rotate(-1.6deg); }
          70% { transform: rotate(1.4deg); }
        }
        @keyframes videoFramePan {
          0%, 100% { transform: scale(1.03) translateY(0px); }
          50% { transform: scale(1.1) translateY(-10px); }
        }
        .garment-tag-card:hover {
          animation: hangerGentleSway 1.8s ease-in-out infinite;
          transform-origin: top center;
        }
        .ai-video-motion {
          animation: videoFramePan 7s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .garment-tag-card:hover,
          .ai-video-motion {
            animation: none !important;
          }
        }
      `}</style>

      {/* ====================================================================
          1. HERO — THE MAGAZINE COVER (navy, full editorial cover layout)
      ==================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-12 lg:pb-24 overflow-hidden border-b border-white/10">
        {/* Soft Blue Spotlight Glows */}
        <div
          aria-hidden="true"
          className="absolute top-12 right-1/4 w-[620px] h-[620px] blue-glow-strong pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 left-10 w-[440px] h-[440px] blue-glow pointer-events-none"
        />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Top Magazine Issue Bar + Breadcrumb */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-white/15">
            <nav
              aria-label="Breadcrumb"
              className="inline-flex flex-wrap items-center gap-2 text-[12px] font-mono uppercase tracking-[0.14em] text-white/75"
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
              <span className="text-white font-bold" aria-current="page">
                {fashionIndustry.name}
              </span>
            </nav>

            <div className="flex items-center gap-3 text-[11px] font-mono font-extrabold uppercase tracking-[0.2em] text-primary">
              <span>ISSUE 2026 · FASHION &amp; LIFESTYLE</span>
              <span className="text-white/30">|</span>
              <span className="text-white/80">WEBXCODE DIGITAL ATELIER</span>
            </div>
          </div>

          {/* Oversized Decorative Masthead Headline (aria-hidden so there is only one H1) */}
          <div
            aria-hidden="true"
            className="relative z-10 select-none pointer-events-none mb-6 lg:-mb-12"
          >
            <div className="text-[48px] sm:text-[82px] lg:text-[112px] xl:text-[124px] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-white">
              STYLE THAT <span className="text-primary">SELLS</span>
            </div>
          </div>

          {/* Magazine Cover Grid: Left Cover Lines & Real H1 + Center-Right Tall Editorial Model Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end relative z-20">
            {/* Left Column (6 cols): Cover Lines + Real H1 + Buttons */}
            <div className="lg:col-span-6 space-y-8 pt-2 lg:pt-14">
              {/* Magazine Cover Teaser Lines with Thin Blue Rules */}
              <div className="max-w-md border-l-2 border-primary pl-4 space-y-3">
                {MAGAZINE_COVER_LINES.map((line, idx) => (
                  <div
                    key={line.id}
                    className={`${
                      idx > 0 ? 'pt-3 border-t border-primary/35' : ''
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary block mb-0.5">
                      {line.kicker}
                    </span>
                    <p className="text-[16px] sm:text-[19px] font-extrabold text-white leading-snug tracking-tight">
                      {line.prefix}
                      <span className="text-primary">{line.highlight}</span>
                      {line.suffix}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom-Left Real H1 + Paragraph + CTAs */}
              <div className="p-6 sm:p-7 rounded-[24px] bg-white/6 backdrop-blur-md border border-white/15">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/25 text-white border border-primary/40 text-[11px] font-bold uppercase tracking-[0.14em] mb-3">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span>FLAGSHIP STORES · DROPS · AI CREATIVE</span>
                </span>

                <h1 className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-white leading-[1.12] tracking-tight mb-3">
                  Websites &amp; Growth for{' '}
                  <span className="text-primary">
                    Fashion and Lifestyle Brands
                  </span>
                </h1>

                <p className="text-[15px] sm:text-[16px] text-white/75 leading-relaxed mb-6">
                  We build fashion stores and launch experiences that look as
                  good as your collections — and fix the fit, returns and
                  conversion problems that hold you back.
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <a
                    href="#fit-check"
                    className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[14px] transition-all inline-flex items-center gap-2 shadow-lg"
                  >
                    <span>Get a Free Store Fit Check</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#size-finder"
                    className="px-6 py-3.5 rounded-full border-2 border-white/35 hover:border-white hover:bg-white/10 text-white font-extrabold text-[14px] transition-all inline-flex items-center gap-2"
                  >
                    <Ruler className="w-4 h-4 text-primary" />
                    <span>Try the Size Finder</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Center-Right Column (6 cols): Tall Editorial Model Cover Frame + Magazine Barcode */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-[520px] rounded-[28px] overflow-hidden border-2 border-white/25 bg-navy shadow-[0_28px_70px_rgba(5,113,194,0.28)] aspect-[4/5]">
                <Image
                  src={IMG_EDITORIAL_COVER}
                  alt="High-fashion editorial collection showcase on luxury e-commerce website"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />

                {/* Top Right Editorial Issue Stamp */}
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-navy/85 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-extrabold uppercase tracking-[0.18em]">
                  LOOKBOOK EDITION // N° 08
                </div>

                {/* Floating Editorial Callout Badge Left */}
                <div className="absolute top-1/3 left-4 max-w-[210px] p-3.5 rounded-2xl bg-navy/85 backdrop-blur-md border border-primary/50 text-white shadow-lg">
                  <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider block">
                    CONVERSION + FIT
                  </span>
                  <div className="text-[13px] font-extrabold leading-snug mt-0.5">
                    Interactive Size Finder + 1-Tap Outfit Bundles
                  </div>
                </div>

                {/* Bottom-Right Magazine Barcode & ₹/$ Price Detail */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary block font-extrabold">
                      COVER STORY
                    </span>
                    <span className="text-[18px] sm:text-[20px] font-extrabold text-white leading-tight block">
                      The New D2C Flagship Standard
                    </span>
                  </div>

                  {/* Magazine Barcode Box */}
                  <div
                    aria-hidden="true"
                    className="shrink-0 bg-white text-navy px-3 py-2 rounded-lg border border-navy shadow-md text-right"
                  >
                    <div className="flex items-center justify-between text-[9px] font-mono font-extrabold mb-1 gap-2">
                      <span>IND ₹0</span>
                      <span>US $0</span>
                    </div>
                    {/* SVG Barcode Bars */}
                    <svg viewBox="0 0 88 24" className="w-20 h-6">
                      {[
                        2, 5, 9, 12, 17, 20, 25, 29, 32, 37, 41, 44, 49, 53, 58,
                        61, 66, 70, 74, 79, 83,
                      ].map((x, idx) => (
                        <rect
                          key={x}
                          x={x}
                          y="0"
                          width={idx % 3 === 0 ? '2.5' : '1.2'}
                          height="20"
                          fill="#1e242e"
                        />
                      ))}
                    </svg>
                    <div className="font-mono text-[8px] font-bold tracking-[0.22em] text-navy text-center mt-0.5">
                      9 772026 057122
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. WHO WE SERVE — THE RUNWAY (white, spotlight runway strip)
      ==================================================================== */}
      <section
        className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08 overflow-hidden"
        onMouseEnter={() => setRunwayPaused(true)}
        onMouseLeave={() => setRunwayPaused(false)}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                WHO WE WORK WITH
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold text-navy leading-[1.1] tracking-tight">
                Every Brand{' '}
                <span className="text-primary">Deserves the Runway</span>
              </h2>
            </div>

            {/* Manual Runway Controls + Pause Button */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setRunwayPaused((prev) => !prev)}
                aria-label={
                  runwayPaused ? 'Resume runway glide' : 'Pause runway glide'
                }
                className="px-3.5 py-2 rounded-full border border-navy-08 hover:border-primary text-[12px] font-bold text-navy inline-flex items-center gap-1.5 cursor-pointer"
              >
                {runwayPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-primary" />
                    <span>Play Runway</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 text-primary" />
                    <span>Pause</span>
                  </>
                )}
              </button>
              <button
                type="button"
                aria-label="Previous runway look"
                onClick={() =>
                  setSpotlightIndex(
                    (prev) =>
                      (prev - 1 + RUNWAY_SEGMENTS.length) %
                      RUNWAY_SEGMENTS.length
                  )
                }
                className="w-10 h-10 rounded-full border border-navy-08 hover:border-primary hover:bg-primary hover:text-white text-navy flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next runway look"
                onClick={() =>
                  setSpotlightIndex(
                    (prev) => (prev + 1) % RUNWAY_SEGMENTS.length
                  )
                }
                className="w-10 h-10 rounded-full border border-navy-08 hover:border-primary hover:bg-primary hover:text-white text-navy flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Navy Runway Strip with Blue Runway Lights Along Both Edges */}
          <div className="relative rounded-[32px] bg-navy text-white p-6 sm:p-10 shadow-2xl overflow-hidden border-2 border-navy">
            {/* Center Overhead Blue Spotlight Cone */}
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-[360px] h-[480px] bg-gradient-to-b from-primary/35 via-primary/15 to-transparent blur-2xl pointer-events-none"
            />

            {/* Top Edge Blue Runway Lights */}
            <div
              aria-hidden="true"
              className="flex items-center justify-between px-4 pb-5 border-b border-white/10"
            >
              {Array.from({ length: 16 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === 7 || idx === 8
                      ? 'bg-primary shadow-[0_0_12px_#0571c2] scale-125'
                      : 'bg-primary/45'
                  }`}
                />
              ))}
            </div>

            {/* 5 Visible Runway Cards Centered Around the Active Spotlight Card */}
            <div className="py-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 items-center relative z-10">
              {[-2, -1, 0, 1, 2].map((offset) => {
                const idx =
                  (spotlightIndex + offset + RUNWAY_SEGMENTS.length) %
                  RUNWAY_SEGMENTS.length;
                const seg = RUNWAY_SEGMENTS[idx];
                const isCenterSpotlight = offset === 0;
                const visibilityClass =
                  Math.abs(offset) === 2
                    ? 'hidden lg:block'
                    : Math.abs(offset) === 1
                    ? 'hidden sm:block'
                    : 'block';

                return (
                  <motion.div
                    key={`${seg.id}-${offset}`}
                    layout
                    onClick={() => setSpotlightIndex(idx)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isCenterSpotlight}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSpotlightIndex(idx);
                      }
                    }}
                    className={`${visibilityClass} cursor-pointer transition-all duration-300 focus:outline-none ${
                      isCenterSpotlight
                        ? 'scale-105 z-20'
                        : 'scale-90 opacity-55 hover:opacity-85'
                    }`}
                  >
                    <div
                      className={`rounded-[22px] overflow-hidden border-2 transition-all bg-navy ${
                        isCenterSpotlight
                          ? 'border-primary shadow-[0_20px_50px_rgba(5,113,194,0.45)]'
                          : 'border-white/15'
                      }`}
                    >
                      {/* Tall 3:4 Portrait Photo Card */}
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <Image
                          src={seg.image}
                          alt={seg.imageAlt}
                          loading="lazy"
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />

                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-navy/80 backdrop-blur-xs text-white font-mono text-[10px] font-extrabold border border-white/20">
                            {seg.lookNo}
                          </span>
                          {isCenterSpotlight && (
                            <span className="px-2.5 py-1 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold uppercase">
                              SPOTLIGHT
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-3.5 left-3.5 right-3.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary block">
                            {seg.tag}
                          </span>
                          <h3 className="text-[17px] sm:text-[18px] font-extrabold text-white leading-snug">
                            {seg.name}
                          </h3>
                          {isCenterSpotlight && (
                            <p className="text-[12px] text-white/85 leading-relaxed mt-1.5">
                              {seg.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Edge Blue Runway Lights + Quick Segment Pills */}
            <div
              aria-hidden="true"
              className="flex items-center justify-between px-4 pt-5 border-t border-white/10 mb-5"
            >
              {Array.from({ length: 16 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === 7 || idx === 8
                      ? 'bg-primary shadow-[0_0_12px_#0571c2] scale-125'
                      : 'bg-primary/45'
                  }`}
                />
              ))}
            </div>

            {/* All 10 Segment Selector Pills for Direct Jump */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
              {RUNWAY_SEGMENTS.map((seg, i) => {
                const active = spotlightIndex === i;
                return (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => setSpotlightIndex(i)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-white/8 text-white/70 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {seg.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. THE FIT PROBLEM — SIZE FINDER DEMO (primary-50, id="size-finder")
      ==================================================================== */}
      <section
        id="size-finder"
        className="bg-primary-50 py-[72px] lg:py-[112px] border-b border-primary-100 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left (5 cols): Editorial Number + Problem Statement */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
                FIT &amp; RETURNS
              </span>
              <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.1] tracking-tight mb-6">
                Wrong Size = <span className="text-primary">Lost Sale</span>.
                Let&apos;s Fix That.
              </h2>

              {/* Huge Editorial Display Number "1 in 3" */}
              <div className="p-6 rounded-3xl bg-white border-2 border-primary-100 shadow-soft mb-6">
                <div className="text-[64px] sm:text-[80px] font-extrabold text-primary leading-none tracking-[-0.04em]">
                  1 in 3
                </div>
                <p className="text-[15px] font-extrabold text-navy mt-2">
                  fashion returns are often blamed on size and fit{' '}
                  <span className="text-[12px] font-semibold text-navy-50">
                    (General industry observation · Placeholder)
                  </span>
                </p>
              </div>

              <p className="text-[15px] sm:text-[16px] text-navy-70 leading-relaxed mb-6">
                When shoppers are unsure between two sizes, they either abandon
                their bag or order the wrong fit and return it. Smart size
                tools, clear size charts and real-customer fit notes protect
                your margins.
              </p>

              {/* 3 Blue ✓ Points */}
              <ul className="space-y-3">
                {[
                  'Size finder on every product page',
                  'Fit notes from real reviews',
                  'Easy exchange flow',
                ].map((pt) => (
                  <li
                    key={pt}
                    className="flex items-center gap-3 text-[15px] font-extrabold text-navy"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right (7 cols): White Card "Find My Size" Interactive Demo */}
            <div className="lg:col-span-7">
              <div className="rounded-[28px] bg-white border-2 border-primary/25 p-6 sm:p-8 lg:p-10 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-navy-08">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary block">
                      INTERACTIVE PDP WIDGET
                    </span>
                    <h3 className="text-[22px] sm:text-[26px] font-extrabold text-navy">
                      Find My Size
                    </h3>
                  </div>

                  {/* Height Unit Toggle (cm / ft) */}
                  <div
                    role="group"
                    aria-label="Height unit toggle"
                    className="inline-flex rounded-full bg-primary-50 p-1 border border-primary-100"
                  >
                    {(['cm', 'ft'] as const).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setHeightUnit(u)}
                        className={`px-3.5 py-1 rounded-full text-[12px] font-extrabold uppercase cursor-pointer transition-all ${
                          heightUnit === u
                            ? 'bg-primary text-white shadow-2xs'
                            : 'text-navy-70 hover:text-navy'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Height & Weight Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Height Input */}
                  <div className="p-4 rounded-2xl bg-primary-50/50 border border-primary-100">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="size-height-slider"
                        className="text-[13px] font-extrabold text-navy"
                      >
                        Height ({heightUnit})
                      </label>
                      <span className="font-mono text-[15px] font-extrabold text-primary">
                        {heightUnit === 'cm'
                          ? `${heightCm} cm`
                          : `${formatHeightFeetInches(heightCm)} (${heightCm} cm)`}
                      </span>
                    </div>
                    <input
                      id="size-height-slider"
                      type="range"
                      min={150}
                      max={198}
                      step={1}
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>

                  {/* Weight Input */}
                  <div className="p-4 rounded-2xl bg-primary-50/50 border border-primary-100">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="size-weight-slider"
                        className="text-[13px] font-extrabold text-navy"
                      >
                        Weight (kg)
                      </label>
                      <span className="font-mono text-[15px] font-extrabold text-primary">
                        {weightKg} kg
                      </span>
                    </div>
                    <input
                      id="size-weight-slider"
                      type="range"
                      min={45}
                      max={110}
                      step={1}
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                </div>

                {/* Fit Preference + Body Shape Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="block text-[12px] font-mono font-extrabold uppercase tracking-wider text-navy-50 mb-2">
                      Fit Preference
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        ['Slim', 'Regular', 'Relaxed'] as FitPreferenceOption[]
                      ).map((pref) => {
                        const active = fitPreference === pref;
                        return (
                          <button
                            key={pref}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setFitPreference(pref)}
                            className={`py-2.5 px-3 rounded-xl text-[13px] font-extrabold border transition-all cursor-pointer ${
                              active
                                ? 'bg-primary text-white border-primary shadow-xs'
                                : 'bg-white text-navy border-navy-15 hover:border-primary'
                            }`}
                          >
                            {pref}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="block text-[12px] font-mono font-extrabold uppercase tracking-wider text-navy-50 mb-2">
                      Shoulder / Body Build (Optional)
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        ['Athletic', 'Average', 'Broad'] as BodyShapeOption[]
                      ).map((shape) => {
                        const active = bodyShape === shape;
                        return (
                          <button
                            key={shape}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setBodyShape(shape)}
                            className={`py-2.5 px-3 rounded-xl text-[13px] font-extrabold border transition-all cursor-pointer ${
                              active
                                ? 'bg-primary text-white border-primary shadow-xs'
                                : 'bg-white text-navy border-navy-15 hover:border-primary'
                            }`}
                          >
                            {shape}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Size Recommendation Result Box */}
                <div
                  aria-live="polite"
                  className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-primary-50 via-white to-primary-50 border-2 border-primary/35 flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-5"
                >
                  <div className="flex items-center gap-4">
                    {/* Large Size Letter in a Blue Circle */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-white flex items-center justify-center text-[30px] sm:text-[34px] font-extrabold shadow-lg shrink-0">
                      {sizeRecommendation.size}
                    </div>
                    <div>
                      <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary block">
                        YOUR BEST FIT
                      </span>
                      <div className="text-[20px] font-extrabold text-navy">
                        Size {sizeRecommendation.size} ({fitPreference} Fit)
                      </div>
                      <p className="text-[12px] font-bold text-navy-70 mt-0.5">
                        Model is 5&apos;10&quot; wearing M · Based on your{' '}
                        {heightCm} cm / {weightKg} kg profile
                      </p>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="sm:w-44 shrink-0 bg-white p-3.5 rounded-xl border border-primary-100">
                    <div className="flex items-center justify-between text-[12px] font-extrabold text-navy mb-1.5">
                      <span>Fit Confidence</span>
                      <span className="text-primary">
                        {sizeRecommendation.confidence}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-primary-50 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${sizeRecommendation.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Expandable Mini Size Chart Table */}
                <div>
                  <button
                    type="button"
                    aria-expanded={sizeChartOpen}
                    onClick={() => setSizeChartOpen((prev) => !prev)}
                    className="w-full py-2.5 px-4 rounded-xl bg-primary-50/70 hover:bg-primary-50 text-navy text-[13px] font-extrabold flex items-center justify-between cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-primary" />
                      <span>View Garment Size Chart (S / M / L / XL)</span>
                    </span>
                    {sizeChartOpen ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-primary" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {sizeChartOpen && (
                      <motion.div
                        initial={
                          prefersReducedMotion
                            ? false
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={
                          prefersReducedMotion
                            ? undefined
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 rounded-xl overflow-hidden border border-navy-15">
                          <table className="w-full text-left border-collapse text-[13px]">
                            <thead>
                              <tr className="bg-navy text-white font-mono text-[11px] uppercase tracking-wider">
                                <th className="py-2.5 px-3.5">Size</th>
                                <th className="py-2.5 px-3.5">Chest</th>
                                <th className="py-2.5 px-3.5">Waist</th>
                                <th className="py-2.5 px-3.5">Garment Length</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-navy-08">
                              {SIZE_CHART_TABLE.map((row) => {
                                const isRec =
                                  row.size === sizeRecommendation.size;
                                return (
                                  <tr
                                    key={row.size}
                                    className={
                                      isRec
                                        ? 'bg-primary-50 font-extrabold text-primary'
                                        : 'bg-white text-navy'
                                    }
                                  >
                                    <td className="py-2.5 px-3.5 font-extrabold">
                                      {row.size} {isRec && '✓'}
                                    </td>
                                    <td className="py-2.5 px-3.5">
                                      {heightUnit === 'cm'
                                        ? row.chestCm
                                        : row.chestIn}
                                    </td>
                                    <td className="py-2.5 px-3.5">
                                      {heightUnit === 'cm'
                                        ? row.waistCm
                                        : row.waistIn}
                                    </td>
                                    <td className="py-2.5 px-3.5">
                                      {heightUnit === 'cm'
                                        ? row.lengthCm
                                        : row.lengthIn}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-[15px] text-navy-70 font-medium">
            Want a size finder like this on your store?{' '}
            <a
              href="#fit-check"
              className="font-extrabold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Get a Free Store Fit Check</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </p>
        </div>
      </section>

      {/* ====================================================================
          4. LAUNCH DROPS THAT SELL OUT — COUNTDOWN DEMO (navy)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute -right-24 top-1/4 w-[500px] h-[500px] blue-glow pointer-events-none"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              COLLECTION LAUNCHES
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.1] tracking-tight">
              Turn Every Drop Into{' '}
              <span className="text-primary">an Event</span>
            </h2>
          </div>

          {/* Wide "Launch Page" Mockup Inside a Browser Frame on Navy */}
          <div className="rounded-[28px] bg-white/6 border-2 border-white/15 shadow-2xl overflow-hidden backdrop-blur-md">
            {/* Browser Top Chrome Bar */}
            <div className="px-4 py-3 bg-navy/90 border-b border-white/15 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white/25" />
                <span className="w-3 h-3 rounded-full bg-white/25" />
                <span className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <div className="px-4 py-1 rounded-full bg-white/8 border border-white/15 font-mono text-[11px] text-white/80 truncate">
                https://yourfashionlabel.com/drops/the-monsoon-edit
              </div>
              <span className="font-mono text-[11px] font-extrabold text-primary hidden sm:inline">
                ● HIGH-CONCURRENCY READY
              </span>
            </div>

            {/* Inside Browser Frame: Left Campaign Image + Right Live Countdown & Waitlist */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left (6 cols): Campaign Image with Big Overlay Title "THE MONSOON EDIT" */}
              <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] bg-navy overflow-hidden">
                <Image
                  src={IMG_RUNWAY_2}
                  alt="The Monsoon Edit Drop 07 collection launch campaign"
                  loading="lazy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

                <div className="absolute top-5 left-5">
                  <span className="px-3.5 py-1.5 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-widest shadow-md">
                    {DROP_LAUNCH_DATA.dropCode}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-1">
                    CAPSULE PREVIEW · PLACEHOLDER
                  </div>
                  <div className="text-[36px] sm:text-[46px] font-extrabold text-white leading-[0.95] tracking-tight">
                    {DROP_LAUNCH_DATA.title}
                  </div>
                  <p className="text-[14px] text-white/80 font-medium mt-2">
                    {DROP_LAUNCH_DATA.subtitle}
                  </p>
                </div>
              </div>

              {/* Right (6 cols): Live Countdown Timer + Join the Waitlist */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-navy/60">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>DROP UNLOCKS IN</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-white">
                      🔥 {DROP_LAUNCH_DATA.waitlistCount} (Placeholder)
                    </span>
                  </div>

                  {/* Static Screen-Reader Announcement so Tick Doesn't Spam */}
                  <span className="sr-only">
                    Drop 07 launches in approximately 7 days. Join the waitlist
                    for early access.
                  </span>

                  {/* 4 Glass Countdown Boxes (aria-live="off") */}
                  <div
                    aria-live="off"
                    className="grid grid-cols-4 gap-3 sm:gap-4 mb-8"
                  >
                    {[
                      {
                        val: String(countdownDays).padStart(2, '0'),
                        label: 'Days',
                      },
                      {
                        val: String(countdownHours).padStart(2, '0'),
                        label: 'Hours',
                      },
                      {
                        val: String(countdownMins).padStart(2, '0'),
                        label: 'Mins',
                      },
                      {
                        val: String(countdownSecs).padStart(2, '0'),
                        label: 'Secs',
                      },
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        className="rounded-2xl bg-white/8 border border-primary/40 p-3.5 sm:p-4 text-center backdrop-blur-md shadow-lg"
                      >
                        <div className="font-mono text-[28px] sm:text-[38px] font-extrabold text-white tabular-nums leading-none">
                          {unit.val}
                        </div>
                        <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-primary mt-1.5">
                          {unit.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Waitlist Form */}
                  <div className="p-5 rounded-2xl bg-white/6 border border-white/15">
                    <div className="text-[16px] font-extrabold text-white mb-1">
                      Get 1-Hour Early VIP Password Access
                    </div>
                    <p className="text-[13px] text-white/70 mb-4">
                      Members on the waitlist receive a private unlock link via
                      WhatsApp &amp; email before public release.
                    </p>

                    {waitlistJoined ? (
                      <div className="p-3.5 rounded-xl bg-primary/25 border border-primary text-white text-[13px] font-extrabold flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span>
                          You&apos;re on the list! Early access pass reserved for{' '}
                          {waitlistEmail}.
                        </span>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleWaitlistSubmit}
                        noValidate
                        className="flex flex-col sm:flex-row gap-2.5"
                      >
                        <label htmlFor="drop-waitlist-email" className="sr-only">
                          Email address for drop waitlist
                        </label>
                        <input
                          id="drop-waitlist-email"
                          type="email"
                          value={waitlistEmail}
                          onChange={(e) => setWaitlistEmail(e.target.value)}
                          placeholder="Enter your email for VIP drop link..."
                          className="flex-1 px-4 py-3 rounded-full bg-white text-navy text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[14px] transition-all inline-flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                        >
                          <span>Notify Me</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                    {waitlistError && (
                      <p className="mt-2 text-[12px] font-bold text-primary">
                        {waitlistError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[12px] text-white/70 font-semibold">
                  <span>Zero crash under 50,000+ concurrent drop visitors</span>
                  <span className="text-primary font-mono font-bold">
                    DROP ENGINE v2.6
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Feature Chips Below the Mockup */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {DROP_LAUNCH_DATA.featureChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-primary/40 text-white text-[13px] font-bold"
              >
                <Check className="w-3.5 h-3.5 text-primary" />
                <span>{chip}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. SERVICES — THE HANGER RAIL (white, 9 Garment Tag Cards)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                WHAT WE BUILD
              </span>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.1] tracking-tight">
                Everything on <span className="text-primary">the Rail</span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-navy-50 mr-2 hidden sm:inline">
                Scroll the rail · 9 services
              </span>
              <button
                type="button"
                aria-label="Scroll hanger rail left"
                onClick={() => scrollHangerRail('prev')}
                className="w-10 h-10 rounded-full border border-navy-15 hover:border-primary text-navy hover:text-primary flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll hanger rail right"
                onClick={() => scrollHangerRail('next')}
                className="w-10 h-10 rounded-full border border-navy-15 hover:border-primary text-navy hover:text-primary flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Clothing Rail Bar with End Brackets */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="flex items-center justify-between"
            >
              {/* Left Rail Bracket */}
              <div className="w-5 h-7 rounded-t-md bg-navy border-2 border-primary" />
              {/* Solid Navy Clothing Rail Bar */}
              <div className="flex-1 h-3 bg-navy border-y border-primary/50 shadow-md" />
              {/* Right Rail Bracket */}
              <div className="w-5 h-7 rounded-t-md bg-navy border-2 border-primary" />
            </div>

            {/* Horizontally Scrollable Row of 9 Garment Tag Cards Hanging from Rail */}
            <div
              ref={hangerRailRef}
              className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-0 px-2 snap-x snap-mandatory"
            >
              {HANGER_RAIL_SERVICES.map((srv) => {
                const isSelected = activeHangerId === srv.id;
                return (
                  <article
                    key={srv.id}
                    onClick={() => setActiveHangerId(srv.id)}
                    onMouseEnter={() => setActiveHangerId(srv.id)}
                    onFocus={() => setActiveHangerId(srv.id)}
                    tabIndex={0}
                    className="garment-tag-card snap-start shrink-0 w-[295px] sm:w-[315px] flex flex-col items-center cursor-pointer focus:outline-none"
                  >
                    {/* Blue Line Hanger SVG + String Connected to Rail */}
                    <svg
                      viewBox="0 0 120 58"
                      className="w-28 h-14 -mt-1 shrink-0"
                      aria-hidden="true"
                    >
                      {/* Hanger Hook */}
                      <path
                        d="M 60 2 C 60 2, 72 2, 72 12 C 72 19, 60 20, 60 26"
                        fill="none"
                        stroke="#0571c2"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Hanger Shoulders */}
                      <path
                        d="M 16 44 L 60 26 L 104 44 Z"
                        fill="none"
                        stroke="#0571c2"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      {/* Thin String Down to Garment Tag Hole */}
                      <line
                        x1="60"
                        y1="44"
                        x2="60"
                        y2="58"
                        stroke="#1e242e"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Garment Tag Shaped Card (Top Punched Hole + Cut Top-Right Corner) */}
                    <div
                      style={{
                        clipPath:
                          'polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%)',
                      }}
                      className={`w-full flex-1 rounded-b-[22px] rounded-tl-[18px] p-6 border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-navy text-white border-primary shadow-xl -translate-y-1'
                          : 'bg-primary-50/55 text-navy border-primary-100 hover:border-primary'
                      }`}
                    >
                      <div>
                        {/* Punched Garment Tag Hole + Style Code */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            aria-hidden="true"
                            className={`w-4 h-4 rounded-full border-2 ${
                              isSelected
                                ? 'bg-white border-primary'
                                : 'bg-white border-navy/40'
                            }`}
                          />
                          <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary">
                            {srv.styleCode}
                          </span>
                        </div>

                        <h3
                          className={`text-[19px] font-extrabold leading-snug mb-2 ${
                            isSelected ? 'text-white' : 'text-navy'
                          }`}
                        >
                          {srv.title}
                        </h3>

                        <p
                          className={`text-[13px] leading-relaxed mb-4 ${
                            isSelected ? 'text-white/80' : 'text-navy-70'
                          }`}
                        >
                          {srv.description}
                        </p>

                        <ul className="space-y-2 mb-5">
                          {srv.bullets.map((b) => (
                            <li
                              key={b}
                              className={`flex items-start gap-2 text-[12px] font-bold ${
                                isSelected ? 'text-white/90' : 'text-navy'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {srv.id === 'hang-1' ? (
                        <Link
                          href="/services/ecommerce-development"
                          onClick={(e) => e.stopPropagation()}
                          className={`pt-3.5 border-t w-full flex items-center justify-between text-[12px] font-extrabold ${
                            isSelected
                              ? 'border-white/15 text-primary hover:text-white'
                              : 'border-navy-08 text-primary hover:underline'
                          }`}
                        >
                          <span>Explore E-commerce Development</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenQuoteModal(srv.title);
                          }}
                          className={`pt-3.5 border-t w-full flex items-center justify-between text-[12px] font-extrabold cursor-pointer ${
                            isSelected
                              ? 'border-white/15 text-primary hover:text-white'
                              : 'border-navy-08 text-primary hover:underline'
                          }`}
                        >
                          <span>Request Service Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. SHOP THE LOOKBOOK — PAGE-TURN DEMO (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50/45 py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
                LOOKBOOKS &amp; COLLECTION PAGES
              </span>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.1] tracking-tight">
                Lookbooks That Let Shoppers{' '}
                <span className="text-primary">Buy the Whole Outfit</span>
              </h2>
            </div>

            {/* Lookbook Spread Selector Pills (01 / 04 ... 04 / 04) */}
            <div className="flex flex-wrap items-center gap-2">
              {LOOKBOOK_SPREADS.map((spread, idx) => {
                const isActive = activeLookIndex === idx;
                return (
                  <button
                    key={spread.lookNumber}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveLookIndex(idx);
                      setFullLookAdded(false);
                    }}
                    className={`px-4 py-2 rounded-full font-mono text-[12px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-navy text-white border-navy shadow-md'
                        : 'bg-white text-navy border-navy-15 hover:border-primary'
                    }`}
                  >
                    LOOK {spread.lookNumber}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Open Magazine Spread Container (2 Pages Side-by-Side on Desktop) */}
          <div className="rounded-[32px] bg-white border-2 border-navy-15 shadow-2xl overflow-hidden">
            {/* Top Magazine Spread Running Header */}
            <div className="px-6 sm:px-10 py-3.5 bg-navy text-white flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em]">
              <span>WEBXCODE LOOKBOOK ARCHIVE</span>
              <span className="text-primary font-extrabold">
                PAGE {currentLookSpread.pageCode}
              </span>
              <span className="hidden sm:inline">
                {currentLookSpread.seasonTag}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentLookSpread.lookNumber}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, x: 16 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  prefersReducedMotion ? undefined : { opacity: 0, x: -16 }
                }
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 relative"
              >
                {/* Center Magazine Spine Line on Desktop */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-navy-08 via-navy-15 to-navy-08 z-20"
                />

                {/* Left Page (6 cols): Full-Bleed Editorial Photo + Look Title & Styling Note */}
                <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[500px] bg-navy overflow-hidden">
                  <Image
                    src={currentLookSpread.editorialImage}
                    alt={currentLookSpread.editorialAlt}
                    loading="lazy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />

                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-navy font-mono text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                      {currentLookSpread.seasonTag}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-navy/85 text-white border border-white/20 font-mono text-[11px] font-bold">
                      {currentLookSpread.pageCode}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-[24px] sm:text-[30px] font-extrabold leading-tight mb-2">
                      {currentLookSpread.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-white/85 leading-relaxed mb-3">
                      {currentLookSpread.stylingNote}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/15 backdrop-blur-xs font-mono text-[11px] text-white">
                      <Ruler className="w-3.5 h-3.5 text-primary" />
                      <span>{currentLookSpread.modelSpec}</span>
                    </div>
                  </div>
                </div>

                {/* Right Page (6 cols): "In This Look" — 3 Compact Product Rows + Add Full Look to Bag */}
                <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-navy-08">
                      <div>
                        <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary block">
                          SHOP THE SPREAD
                        </span>
                        <h4 className="text-[22px] font-extrabold text-navy">
                          In This Look (3 Pieces)
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold">
                        1-Tap Outfit Bundle
                      </span>
                    </div>

                    {/* 3 Compact Product Rows */}
                    <div className="space-y-3.5 mb-6">
                      {currentLookSpread.items.map((item, idx) => {
                        const isAdded =
                          fullLookAdded || addedLookItems.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                              isAdded
                                ? 'bg-primary-50/70 border-primary'
                                : 'bg-white border-navy-15 hover:border-primary'
                            }`}
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-navy shrink-0 border border-navy-08">
                                <Image
                                  src={item.thumb}
                                  alt={item.name}
                                  loading="lazy"
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                                <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-navy/85 text-white font-mono text-[9px] font-extrabold flex items-center justify-center">
                                  {idx + 1}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <div className="text-[14px] sm:text-[15px] font-extrabold text-navy truncate">
                                  {item.name}
                                </div>
                                <div className="text-[12px] text-navy-70 font-medium">
                                  {item.variantNote}
                                </div>
                                <div className="font-mono text-[13px] font-extrabold text-primary mt-0.5">
                                  ₹{item.price.toLocaleString('en-IN')}{' '}
                                  <span className="text-[10px] text-navy-50 font-normal">
                                    (Placeholder)
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleToggleLookItem(item.id)}
                              className={`px-3.5 py-2 rounded-full text-[12px] font-extrabold shrink-0 transition-all cursor-pointer inline-flex items-center gap-1 ${
                                isAdded
                                  ? 'bg-primary text-white'
                                  : 'bg-primary-50 text-primary hover:bg-primary hover:text-white'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>In Bag</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Combined "Add Full Look to Bag" CTA + Prev/Next Page-Turn Controls */}
                  <div className="pt-5 border-t border-navy-08">
                    <button
                      type="button"
                      onClick={() => setFullLookAdded(true)}
                      className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mb-4"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        {fullLookAdded
                          ? `Full Look Added to Bag (₹${currentLookTotal.toLocaleString(
                              'en-IN'
                            )}) ✓`
                          : `Add Full Look to Bag — ₹${currentLookTotal.toLocaleString(
                              'en-IN'
                            )}`}
                      </span>
                    </button>

                    {/* Prev / Next Look Page-Turn Buttons */}
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLookIndex(
                            (prev) =>
                              (prev - 1 + LOOKBOOK_SPREADS.length) %
                              LOOKBOOK_SPREADS.length
                          );
                          setFullLookAdded(false);
                        }}
                        className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-navy hover:text-primary cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4 text-primary" />
                        <span>Previous Look</span>
                      </button>

                      <span className="font-mono text-[12px] font-extrabold text-navy-50">
                        {currentLookSpread.pageCode}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveLookIndex(
                            (prev) => (prev + 1) % LOOKBOOK_SPREADS.length
                          );
                          setFullLookAdded(false);
                        }}
                        className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-navy hover:text-primary cursor-pointer"
                      >
                        <span>Next Look</span>
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. AI VIDEOS THAT SELL — VERTICAL REEL WALL (navy, 4 9:16 Frames)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[640px] h-[640px] blue-glow pointer-events-none"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                <Video className="w-3.5 h-3.5 text-primary" />
                <span>AI VISUAL STUDIO</span>
              </span>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.1] tracking-tight mb-3">
                Videos That Move Product —{' '}
                <span className="text-primary">Without a 5-Lakh Shoot</span>
              </h2>
              <p className="text-[15px] sm:text-[17px] text-white/75 leading-relaxed">
                Shoppers want to see how a garment moves, drapes and fits before
                they buy. We produce high-fashion AI motion videos for your
                product pages and collection launches.
              </p>
            </div>

            {/* Play / Pause Motion Preview Control */}
            <button
              type="button"
              onClick={() => setAiVideosPlaying((prev) => !prev)}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-[12px] font-mono font-bold uppercase tracking-wider text-white cursor-pointer"
            >
              {aiVideosPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-primary" />
                  <span>Pause Motion Loops</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-primary" />
                  <span>Play Motion Loops</span>
                </>
              )}
            </button>
          </div>

          {/* 4 Tall Vertical 9:16 Phone-Frame Cards at Staggered Heights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {AI_VIDEO_FRAMES.map((frame) => (
              <div
                key={frame.id}
                className={`rounded-[28px] bg-white/6 border-2 border-white/15 hover:border-primary transition-all p-3 shadow-2xl backdrop-blur-md ${frame.heightOffsetClass}`}
              >
                {/* 9:16 Vertical Screen Viewport */}
                <div className="relative aspect-[9/16] rounded-[22px] overflow-hidden bg-navy">
                  <Image
                    src={frame.image}
                    alt={frame.imageAlt}
                    loading="lazy"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`object-cover ${
                      aiVideosPlaying && !prefersReducedMotion
                        ? 'ai-video-motion'
                        : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-navy/30" />

                  {/* Phone Top Speaker Notch + Duration Tag */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-navy/80 border border-white/20 font-mono text-[10px] font-bold text-white">
                      {frame.durationTag}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                      {aiVideosPlaying ? (
                        <Video className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </div>

                  {/* Bottom Overlay Pill + Use-Case + Caption */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-wider mb-2 shadow-md">
                      {frame.pill}
                    </span>
                    <div className="text-[16px] font-extrabold text-white leading-snug">
                      {frame.useCase}
                    </div>
                    <p className="text-[12px] text-white/80 leading-relaxed mt-1">
                      {frame.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-[13px] text-white/70 font-medium">
            All AI visuals are quality-checked and clearly labeled where
            required.{' '}
            <Link
              href="/ai-solutions/ai-generated-videos"
              className="text-primary font-extrabold hover:underline ml-1"
            >
              Explore AI Generated Videos Studio →
            </Link>
            <span className="mx-2 text-white/30">·</span>
            <button
              type="button"
              onClick={() =>
                onOpenQuoteModal('AI Generated Videos & Product Visuals')
              }
              className="text-white/90 hover:text-primary font-extrabold hover:underline cursor-pointer"
            >
              Request Sample AI Lookbook Reel →
            </button>
          </p>
        </div>
      </section>

      {/* ====================================================================
          8. CASE STUDY — SOLD OUT (white, styled like a Sold-Out Product Page)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              CLIENT STORY (PLACEHOLDER)
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.1] tracking-tight">
              From Slow Sales to{' '}
              <span className="text-primary">Sold-Out Drops</span>
            </h2>
          </div>

          {/* Single Editorial Case Card Styled Like a Sold-Out Product Page */}
          <div className="rounded-[32px] bg-white border-2 border-navy-15 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left (5 cols): Editorial Photo with Bold Diagonal "SOLD OUT IN 4 HOURS" Blue Ribbon */}
            <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[460px] bg-navy overflow-hidden">
              <Image
                src={IMG_EDITORIAL_COVER}
                alt="Sold out fashion collection drop case study"
                loading="lazy"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" />

              {/* Diagonal Blue Ribbon */}
              <div className="absolute top-7 -left-10 -rotate-12 bg-primary text-white py-2 px-12 font-mono text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.2em] shadow-xl border-y border-white/30">
                {SOLD_OUT_CASE_STUDY.ribbonText}
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary block mb-1">
                  {SOLD_OUT_CASE_STUDY.skuCode}
                </span>
                <div className="text-[24px] font-extrabold leading-tight">
                  {SOLD_OUT_CASE_STUDY.brandName}
                </div>
                <div className="text-[13px] text-white/80 font-medium mt-0.5">
                  {SOLD_OUT_CASE_STUDY.collectionTitle}
                </div>
              </div>
            </div>

            {/* Right (7 cols): Product-Style Details, 4 Size-Selector Metric Boxes, Chips & Quote */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-navy-08">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    VERIFIED CAMPAIGN OUTCOME (PLACEHOLDER)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[11px] font-extrabold uppercase">
                    STATUS: 100% SOLD THROUGH
                  </span>
                </div>

                {/* 4 Metric Boxes Styled Like Apparel Size Selector Boxes */}
                <div className="mb-7">
                  <span className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50 mb-2.5">
                    6-MONTH PERFORMANCE METRICS (SELECT SIZE VIEW):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {SOLD_OUT_CASE_STUDY.sizeBoxMetrics.map((metric, idx) => (
                      <div
                        key={metric.label}
                        className={`p-4 rounded-2xl border-2 text-center transition-all ${
                          idx === 0
                            ? 'bg-navy text-white border-primary shadow-md'
                            : 'bg-primary-50/45 text-navy border-navy-15'
                        }`}
                      >
                        <div
                          className={`font-mono text-[26px] sm:text-[30px] font-extrabold leading-none ${
                            idx === 0 ? 'text-primary' : 'text-primary'
                          }`}
                        >
                          {metric.value}
                        </div>
                        <div
                          className={`font-mono text-[11px] font-extrabold uppercase tracking-wider mt-1.5 ${
                            idx === 0 ? 'text-white' : 'text-navy'
                          }`}
                        >
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* "What We Did" as Clean Chips */}
                <div className="mb-7">
                  <span className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50 mb-2.5">
                    WHAT WE ENGINEERED:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SOLD_OUT_CASE_STUDY.whatWeDid.map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-navy text-[12px] font-extrabold"
                      >
                        <Check className="w-3.5 h-3.5 text-primary" />
                        <span>{chip}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Short Client Quote */}
                <blockquote className="p-5 rounded-2xl bg-primary-50/50 border-l-4 border-primary text-[14px] sm:text-[15px] text-navy italic leading-relaxed mb-6">
                  &ldquo;{SOLD_OUT_CASE_STUDY.quote}&rdquo;
                </blockquote>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-navy-08">
                <div className="flex items-center gap-3">
                  <Image
                    src={IMG_AVATAR_CLIENT}
                    alt={SOLD_OUT_CASE_STUDY.clientName}
                    loading="lazy"
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <div className="text-[14px] font-extrabold text-navy">
                      {SOLD_OUT_CASE_STUDY.clientName}
                    </div>
                    <div className="text-[12px] text-navy-70 font-medium">
                      {SOLD_OUT_CASE_STUDY.clientRole}
                    </div>
                  </div>
                </div>

                <a
                  href="#fit-check"
                  className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-primary hover:underline"
                >
                  <span>Build a Store Like This</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. FAQ — THE CARE LABEL (light blue tint, Woven Garment Care Label)
      ==================================================================== */}
      <section className="bg-primary-50/45 py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[920px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              FAQ
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.1] tracking-tight">
              The Care <span className="text-primary">Label</span>
            </h2>
          </div>

          {/* Woven Garment Care Label Card with Stitched Dashed Border */}
          <div className="rounded-[28px] bg-white p-3 sm:p-5 shadow-xl border border-navy-15">
            <div className="rounded-[22px] border-2 border-dashed border-navy/25 p-5 sm:p-8 lg:p-10">
              {/* Top Woven Label Header Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b-2 border-navy">
                <div>
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary block">
                    GARMENT SPEC &amp; CARE INSTRUCTIONS
                  </span>
                  <div className="text-[18px] sm:text-[20px] font-extrabold text-navy">
                    100% Crafted for Fashion &amp; Lifestyle Brands
                  </div>
                </div>

                {/* Row of 4 Simple Line Care Icons in Blue */}
                <div
                  aria-label="Garment care symbols"
                  className="flex items-center gap-2.5"
                >
                  {[
                    { symbol: '30°', title: 'Fast Mobile Speed' },
                    { symbol: '△', title: 'Zero Size Guesswork' },
                    { symbol: '⊡', title: 'High-Traffic Drop Ready' },
                    { symbol: '♨', title: 'Full-Margin Growth' },
                  ].map((item) => (
                    <span
                      key={item.symbol}
                      title={item.title}
                      className="w-9 h-9 rounded-lg border-2 border-primary bg-primary-50 text-primary font-mono text-[13px] font-extrabold flex items-center justify-center"
                    >
                      {item.symbol}
                    </span>
                  ))}
                </div>
              </div>

              {/* 6 Accordion Questions Inside Care Label */}
              <div className="divide-y divide-dashed divide-navy-15">
                {CARE_LABEL_FAQS.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setOpenFaqId(isOpen ? '' : faq.id)
                        }
                        className="w-full flex items-start justify-between gap-4 text-left py-2 cursor-pointer group"
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary-50 text-primary shrink-0 mt-0.5">
                            {faq.code}
                          </span>
                          <span className="text-[16px] sm:text-[18px] font-extrabold text-navy group-hover:text-primary transition-colors">
                            {faq.question}
                          </span>
                        </div>
                        <span className="w-7 h-7 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          {isOpen ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={
                              prefersReducedMotion
                                ? false
                                : { height: 0, opacity: 0 }
                            }
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={
                              prefersReducedMotion
                                ? undefined
                                : { height: 0, opacity: 0 }
                            }
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="pt-2 pb-2 pl-0 sm:pl-[74px] text-[14px] sm:text-[15px] text-navy-70 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Care Label Footer */}
              <div className="mt-6 pt-4 border-t-2 border-navy flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-navy-70 font-bold">
                <span>MADE IN WEBXCODE STUDIO · INDIA &amp; GLOBAL</span>
                <span className="text-primary">RN# WXC-2026-FSHN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. FINAL CTA — THE FITTING ROOM MIRROR (navy, #fit-check)
      ==================================================================== */}
      <section
        id="fit-check"
        className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden border-b border-white/10"
      >
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] blue-glow-strong pointer-events-none"
        />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left (5 cols): Editorial Copy + 3 Checkpoints */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                FREE STORE FIT CHECK
              </span>
              <h2 className="text-[30px] sm:text-[40px] lg:text-[46px] font-extrabold text-white leading-[1.08] tracking-tight mb-4">
                Let&apos;s Check How Your Store Fits{' '}
                <span className="text-primary">Your Brand</span>
              </h2>
              <p className="text-[15px] sm:text-[17px] text-white/80 leading-relaxed mb-8">
                Send us your store URL. Our senior fashion e-commerce designers
                and growth strategists will record a custom audit of your visual
                storytelling, size flow and checkout conversion.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Store speed, UX & mobile checkout review',
                  'Size & return reduction opportunities',
                  'SEO, Google Shopping & AI video plan',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[15px] font-bold text-white/95">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-2xl bg-white/6 border border-white/15 text-[13px] text-white/80">
                Prefer a live walkthrough?{' '}
                <button
                  type="button"
                  onClick={() =>
                    onOpenQuoteModal('Fashion & Lifestyle Store Fit Check')
                  }
                  className="text-primary font-extrabold hover:underline cursor-pointer"
                >
                  Open Quick Quote Modal →
                </button>
              </div>
            </div>

            {/* Right (7 cols): Tall Arch-Topped "Fitting Room Mirror" Form Card */}
            <div className="lg:col-span-7">
              <div className="relative mx-auto max-w-[580px] rounded-t-[140px] sm:rounded-t-[180px] rounded-b-[28px] bg-white text-navy p-6 sm:p-10 lg:p-12 border-4 border-primary shadow-[0_0_70px_rgba(5,113,194,0.45)]">
                {/* Mirror Top Spotlight Pill */}
                <div className="text-center mb-6 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase tracking-widest mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>THE FITTING ROOM AUDIT</span>
                  </span>
                  <h3 className="text-[22px] sm:text-[26px] font-extrabold text-navy">
                    Get Your Free Store Fit Check
                  </h3>
                  <p className="text-[13px] text-navy-70 mt-1">
                    Delivered to your inbox &amp; WhatsApp within 48 business
                    hours.
                  </p>
                </div>

                {fitSubmitted ? (
                  <div className="p-6 sm:p-8 rounded-2xl bg-primary-50 border-2 border-primary text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-[20px] font-extrabold text-navy mb-2">
                      Your Store Fit Check Is Booked!
                    </h4>
                    <p className="text-[14px] text-navy-70 leading-relaxed mb-5">
                      Thank you,{' '}
                      <span className="font-extrabold text-navy">
                        {fitForm.name}
                      </span>
                      . Our fashion team is reviewing{' '}
                      <span className="font-mono font-bold text-primary">
                        {fitForm.storeUrl}
                      </span>{' '}
                      ({fitForm.category}) and will send your custom breakdown
                      to <span className="font-bold">{fitForm.email}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFitSubmitted(false);
                        setFitForm({
                          name: '',
                          email: '',
                          phone: '',
                          storeUrl: '',
                          category: 'Apparel',
                        });
                      }}
                      className="px-5 py-2.5 rounded-full bg-navy text-white text-[13px] font-extrabold hover:bg-primary transition-colors cursor-pointer"
                    >
                      Submit Another Brand
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFitCheckSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="fit-name"
                          className="block text-[12px] font-extrabold uppercase tracking-wider text-navy mb-1.5"
                        >
                          Your Name *
                        </label>
                        <input
                          id="fit-name"
                          type="text"
                          value={fitForm.name}
                          onChange={(e) =>
                            setFitForm({ ...fitForm, name: e.target.value })
                          }
                          placeholder="e.g. Aarav Mehta"
                          className="w-full px-4 py-3 rounded-xl border border-navy-15 bg-white text-navy text-[14px] font-medium focus:outline-none focus:border-primary"
                        />
                        {fitErrors.name && (
                          <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{fitErrors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="fit-email"
                          className="block text-[12px] font-extrabold uppercase tracking-wider text-navy mb-1.5"
                        >
                          Work Email *
                        </label>
                        <input
                          id="fit-email"
                          type="email"
                          value={fitForm.email}
                          onChange={(e) =>
                            setFitForm({ ...fitForm, email: e.target.value })
                          }
                          placeholder="founder@yourlabel.com"
                          className="w-full px-4 py-3 rounded-xl border border-navy-15 bg-white text-navy text-[14px] font-medium focus:outline-none focus:border-primary"
                        />
                        {fitErrors.email && (
                          <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{fitErrors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Phone / WhatsApp */}
                      <div>
                        <label
                          htmlFor="fit-phone"
                          className="block text-[12px] font-extrabold uppercase tracking-wider text-navy mb-1.5"
                        >
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="fit-phone"
                          type="tel"
                          value={fitForm.phone}
                          onChange={(e) =>
                            setFitForm({ ...fitForm, phone: e.target.value })
                          }
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-navy-15 bg-white text-navy text-[14px] font-medium focus:outline-none focus:border-primary"
                        />
                        {fitErrors.phone && (
                          <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{fitErrors.phone}</span>
                          </p>
                        )}
                      </div>

                      {/* Brand / Store URL */}
                      <div>
                        <label
                          htmlFor="fit-url"
                          className="block text-[12px] font-extrabold uppercase tracking-wider text-navy mb-1.5"
                        >
                          Brand / Store URL *
                        </label>
                        <input
                          id="fit-url"
                          type="text"
                          value={fitForm.storeUrl}
                          onChange={(e) =>
                            setFitForm({ ...fitForm, storeUrl: e.target.value })
                          }
                          placeholder="yourfashionbrand.com"
                          className="w-full px-4 py-3 rounded-xl border border-navy-15 bg-white text-navy text-[14px] font-medium focus:outline-none focus:border-primary"
                        />
                        {fitErrors.storeUrl && (
                          <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{fitErrors.storeUrl}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Category Chips */}
                    <div className="mb-6">
                      <span className="block text-[12px] font-extrabold uppercase tracking-wider text-navy mb-2">
                        Primary Category
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {FIT_CHECK_CATEGORIES.map((cat) => {
                          const active = fitForm.category === cat;
                          return (
                            <button
                              key={cat}
                              type="button"
                              aria-pressed={active}
                              onClick={() =>
                                setFitForm({ ...fitForm, category: cat })
                              }
                              className={`px-3.5 py-2 rounded-full text-[12px] font-extrabold border transition-all cursor-pointer ${
                                active
                                  ? 'bg-primary text-white border-primary shadow-2xs'
                                  : 'bg-primary-50/50 text-navy border-navy-15 hover:border-primary'
                              }`}
                            >
                              {cat}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={fitSubmitting}
                      className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {fitSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Preparing Your Fit Check...</span>
                        </>
                      ) : (
                        <>
                          <span>Get My Free Store Fit Check</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. EXPLORE OTHER INDUSTRIES (white, Horizontal Chip Bar)
      ==================================================================== */}
      <section className="bg-white py-12 border-t border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary block">
                CROSS-INDUSTRY EXPERTISE
              </span>
              <h2 className="text-[20px] sm:text-[22px] font-extrabold text-navy">
                Explore Other Industries We Serve
              </h2>
            </div>
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-primary hover:underline"
            >
              <span>View All 22 Industries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
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
                    : ind.slug === 'manufacturing-industrial'
                    ? '/industries/manufacturing-industrial'
                    : ind.slug === 'ecommerce'
                    ? '/industries/ecommerce'
                    : ind.slug === 'skincare-beauty'
                    ? '/industries/skincare-beauty'
                    : ind.slug === 'home-decor-furniture'
                    ? '/industries/home-decor-furniture'
                    : ind.slug === 'healthcare'
                    ? '/industries/healthcare'
                    : ind.slug === 'travel-hospitality'
                    ? '/industries/travel-hospitality'
                    : ind.slug === 'education-edtech'
                    ? '/industries/education-edtech'
                    : `/industries#${ind.slug}`
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-navy-15 bg-white hover:border-primary hover:bg-primary-50 text-navy hover:text-primary text-[13px] font-bold whitespace-nowrap transition-colors shrink-0"
              >
                <IndustryIcon name={ind.slug as any}
                  className="w-4 h-4 text-primary shrink-0"
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

export default FashionLifestyle;


