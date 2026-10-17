'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Sofa,
  Lamp,
  BedDouble,
  Ruler,
  Store,
  Video,
  Truck,
  Sparkles,
  Search,
  ShoppingBag,
  Building2,
  MapPin,
  Box,
  Layers,
  Award,
  Plus,
  Minus,
  AlertCircle,
  Loader2,
  Eye,
  Compass,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { industries, IndustryIcon } from '@/app/industries/_components/Industries';

const IMG_ROOM_LIVING =
  '/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const IMG_ROOM_BEDROOM =
  '/images/hero_laptop_ui_showcase_1791104898778.jpg';
const IMG_ROOM_DINING =
  '/images/why_webxcode_team_office_1791104914357.jpg';
const IMG_CASE_STUDY_SOFA =
  '/images/project_fintech_saas_ui_1791104929193.jpg';
const IMG_AVATAR_CLIENT =
  '/images/testimonial_2_avatar_1791105060710.jpg';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT HOME DECOR & FURNITURE ITEM FROM INDUSTRIES
============================================================================ */
const furnitureIndustry =
  industries.find((item) => item.slug === 'home-decor-furniture') ||
  industries[6];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS
============================================================================ */

/* Section 1: Hero — Shuffling Room Card Deck (Living Room, Bedroom, Dining) */
export interface RoomHotspotPin {
  id: string;
  label: string;
  price: string;
  top: string;
  left: string;
}

export interface HeroRoomScene {
  id: string;
  roomTitle: string;
  styleTag: string;
  dimensionsNote: string;
  image: string;
  imageAlt: string;
  pins: RoomHotspotPin[];
}

const HERO_ROOM_SCENES: HeroRoomScene[] = [
  {
    id: 'room-living',
    roomTitle: 'Living Room Collection',
    styleTag: 'Warm Contemporary · Modular Seating',
    dimensionsNote: 'Room Size: 14 × 18 ft',
    image: IMG_ROOM_LIVING,
    imageAlt:
      'Warm contemporary living room with a 3-seater sofa, floor lamp and coffee table',
    pins: [
      {
        id: 'pin-sofa',
        label: '3-Seater Sofa',
        price: '₹42,999',
        top: '52%',
        left: '26%',
      },
      {
        id: 'pin-lamp',
        label: 'Floor Lamp',
        price: '₹6,499',
        top: '24%',
        left: '68%',
      },
      {
        id: 'pin-table',
        label: 'Nested Coffee Table',
        price: '₹12,800',
        top: '74%',
        left: '50%',
      },
    ],
  },
  {
    id: 'room-bedroom',
    roomTitle: 'Bedroom Sanctuary',
    styleTag: 'Upholstered Storage Bed · Orthopedic Sleep',
    dimensionsNote: 'Room Size: 12 × 15 ft',
    image: IMG_ROOM_BEDROOM,
    imageAlt:
      'Cozy master bedroom featuring a king upholstered bed, bedside pendant and woven rug',
    pins: [
      {
        id: 'pin-bed',
        label: 'King Upholstered Bed',
        price: '₹54,500',
        top: '48%',
        left: '34%',
      },
      {
        id: 'pin-mattress',
        label: 'Hybrid Latex Mattress',
        price: '₹24,999',
        top: '66%',
        left: '56%',
      },
    ],
  },
  {
    id: 'room-dining',
    roomTitle: '6-Seater Dining Room',
    styleTag: 'Solid Teak Finish · Artisanal Chairs',
    dimensionsNote: 'Room Size: 11 × 14 ft',
    image: IMG_ROOM_DINING,
    imageAlt:
      'Inviting 6-seater dining table setup with upholstered chairs and linear chandelier',
    pins: [
      {
        id: 'pin-dining-table',
        label: '6-Seater Dining Set',
        price: '₹68,900',
        top: '56%',
        left: '30%',
      },
      {
        id: 'pin-chandelier',
        label: 'Linear Pendant Light',
        price: '₹9,200',
        top: '22%',
        left: '52%',
      },
    ],
  },
];

/* Section 2: Who We Serve — Polaroid Mood Board (8 Segments) */
export interface PolaroidSegment {
  id: string;
  name: string;
  rotationClass: string;
  image: string;
  imageAlt: string;
  description: string;
  solutions: [string, string];
  icon: React.ComponentType<{ className?: string }>;
}

const MOOD_BOARD_SEGMENTS: PolaroidSegment[] = [
  {
    id: 'seg-furniture-brands',
    name: 'Furniture Brands & Manufacturers',
    rotationClass: '-rotate-2',
    image: IMG_ROOM_LIVING,
    imageAlt: 'Custom sofa and living room furniture manufacturer showcase',
    description:
      'Flagship D2C & dealer catalogs with fabric swatches, custom size configurators, and made-to-order lead times.',
    solutions: ['Custom Sofa Configurator', 'Dealer & Project Portal'],
    icon: Sofa,
  },
  {
    id: 'seg-decor-d2c',
    name: 'Home Decor D2C',
    rotationClass: 'rotate-1',
    image: IMG_ROOM_BEDROOM,
    imageAlt: 'Home decor D2C collection with vases, mirrors and table accents',
    description:
      'Shop-the-look room galleries, curated bundle builders, and high-speed mobile checkout for decor brands.',
    solutions: ['Shop-the-Look Hotspots', 'Curated Room Bundles'],
    icon: Sparkles,
  },
  {
    id: 'seg-showrooms',
    name: 'Showrooms & Retailers',
    rotationClass: '-rotate-1',
    image: IMG_ROOM_DINING,
    imageAlt: 'Multi-city furniture showroom display floor',
    description:
      'Bridge online browsers into store walk-ins with local store pages, appointment booking, and live video calls.',
    solutions: ['Book a Showroom Visit', 'Local "Near Me" SEO'],
    icon: Store,
  },
  {
    id: 'seg-mattress',
    name: 'Mattress & Sleep',
    rotationClass: 'rotate-2',
    image: IMG_CASE_STUDY_SOFA,
    imageAlt: 'Orthopedic mattress and sleep accessories online store',
    description:
      'Interactive sleep-quiz finders, firmness comparison tables, 100-night trial trackers, and bed-size selectors.',
    solutions: ['Mattress Finder Quiz', '100-Night Trial UX'],
    icon: BedDouble,
  },
  {
    id: 'seg-lighting',
    name: 'Lighting & Fans',
    rotationClass: 'rotate-1',
    image: IMG_ROOM_LIVING,
    imageAlt: 'Architectural chandeliers, pendant lamps and designer ceiling fans',
    description:
      'Warm/cool light-temperature toggles, room-size lumen calculators, and trade accounts for interior designers.',
    solutions: ['Day/Night Light Preview', 'Architect Trade Pricing'],
    icon: Lamp,
  },
  {
    id: 'seg-rugs',
    name: 'Rugs & Carpets',
    rotationClass: '-rotate-2',
    image: IMG_ROOM_BEDROOM,
    imageAlt: 'Hand-tufted rugs and carpets displayed with room size guides',
    description:
      'Visual rug-size-under-sofa guides, high-zoom weave inspection, and "View in Your Room" AR previews.',
    solutions: ['Rug Size Placement Guide', 'AR Room Preview'],
    icon: Layers,
  },
  {
    id: 'seg-textiles',
    name: 'Home Textiles & Furnishings',
    rotationClass: 'rotate-2',
    image: IMG_ROOM_DINING,
    imageAlt: 'Curtains, upholstery fabrics, cushions and bed linen collections',
    description:
      'Custom curtain rod/drop calculators, swatch sample ordering, and coordinated collection lookbooks.',
    solutions: ['Curtain Drop Calculator', 'Order ₹99 Fabric Swatches'],
    icon: Box,
  },
  {
    id: 'seg-handicrafts',
    name: 'Handicrafts & Exporters',
    rotationClass: '-rotate-1',
    image: IMG_CASE_STUDY_SOFA,
    imageAlt: 'Artisanal Indian home handicrafts and global export catalog',
    description:
      'Multi-currency D2C & wholesale container-load RFQ catalogs built for US, UK, EU and Middle East buyers.',
    solutions: ['Multi-Currency Storefront', 'Wholesale MOQ & RFQ Flow'],
    icon: Award,
  },
];

/* Section 3: The Considered Purchase — Measuring Tape Journey (8 Stops) */
export interface TapeJourneyStop {
  stepNumber: string;
  inchMark: string;
  title: string;
  customerNeeds: string;
  whatWeBuild: string;
}

const MEASURING_TAPE_STOPS: TapeJourneyStop[] = [
  {
    stepNumber: '01',
    inchMark: '12"',
    title: 'Inspiration',
    customerNeeds: 'Room ideas and styles',
    whatWeBuild: 'Lookbooks, shop-the-look pages',
  },
  {
    stepNumber: '02',
    inchMark: '24"',
    title: 'Research',
    customerNeeds: 'Materials, quality, reviews',
    whatWeBuild: 'Rich product pages, material guides',
  },
  {
    stepNumber: '03',
    inchMark: '36"',
    title: 'Measure & Fit',
    customerNeeds: '"Will it fit my room?"',
    whatWeBuild: 'Size guides, fit tools, dimension drawings',
  },
  {
    stepNumber: '04',
    inchMark: '48"',
    title: 'Compare',
    customerNeeds: 'Variants and prices',
    whatWeBuild: 'Clean variant selectors, compare feature',
  },
  {
    stepNumber: '05',
    inchMark: '60"',
    title: 'Visit / Video Call',
    customerNeeds: 'See it before buying',
    whatWeBuild: 'Book a showroom visit, live video shopping',
  },
  {
    stepNumber: '06',
    inchMark: '72"',
    title: 'Buy',
    customerNeeds: 'Big purchase confidence',
    whatWeBuild: 'EMI options, clear delivery dates, trust badges',
  },
  {
    stepNumber: '07',
    inchMark: '84"',
    title: 'Delivery & Assembly',
    customerNeeds: 'Peace of mind',
    whatWeBuild: 'Order tracking, assembly scheduling',
  },
  {
    stepNumber: '08',
    inchMark: '96"',
    title: 'Review & Return',
    customerNeeds: 'Share their home',
    whatWeBuild: 'Review requests, referral offers',
  },
];

/* Section 4: "Will It Fit?" + Configurator Demo Options & Prices */
export interface SofaFitOption {
  id: '2-seater' | '3-seater' | 'l-shape';
  name: string;
  dimsLabelFt: string;
  dimsLabelCm: string;
  widthFt: number; // length along wall
  depthFt: number; // depth into room
  basePrice: number;
}

const SOFA_FIT_OPTIONS: SofaFitOption[] = [
  {
    id: '2-seater',
    name: '2-Seater Sofa',
    dimsLabelFt: '5.5 × 3.0 ft',
    dimsLabelCm: '168 × 91 cm',
    widthFt: 5.5,
    depthFt: 3.0,
    basePrice: 32999,
  },
  {
    id: '3-seater',
    name: '3-Seater Sofa',
    dimsLabelFt: '7.0 × 3.0 ft',
    dimsLabelCm: '213 × 91 cm',
    widthFt: 7.0,
    depthFt: 3.0,
    basePrice: 42999,
  },
  {
    id: 'l-shape',
    name: 'L-Shape Sectional',
    dimsLabelFt: '8.5 × 5.5 ft',
    dimsLabelCm: '259 × 168 cm',
    widthFt: 8.5,
    depthFt: 5.5,
    basePrice: 64999,
  },
];

export type ConfigMaterialId = 'fabric' | 'velvet' | 'leather';
export type ConfigLegsId = 'wood' | 'metal';
export type ConfigCushionsId = 'standard' | 'extra';

const CONFIG_MATERIALS: {
  id: ConfigMaterialId;
  name: string;
  weaveNote: string;
  priceDelta: number;
}[] = [
  {
    id: 'fabric',
    name: 'Bouclé Woven Fabric',
    weaveNote: '320 GSM Stain-Guard Weave',
    priceDelta: 0,
  },
  {
    id: 'velvet',
    name: 'Performance Velvet',
    weaveNote: 'High-Rub Matte Pile',
    priceDelta: 6500,
  },
  {
    id: 'leather',
    name: 'Top-Grain Leatherette',
    weaveNote: 'Wipe-Clean Luxe Finish',
    priceDelta: 12000,
  },
];

const CONFIG_LEGS: {
  id: ConfigLegsId;
  name: string;
  detail: string;
  priceDelta: number;
}[] = [
  {
    id: 'wood',
    name: 'Tapered Solid Wood',
    detail: '6-inch clearance (Robot-vacuum friendly)',
    priceDelta: 0,
  },
  {
    id: 'metal',
    name: 'Architectural Matte Metal',
    detail: 'Sleek sled frame profile',
    priceDelta: 2500,
  },
];

const CONFIG_CUSHIONS: {
  id: ConfigCushionsId;
  name: string;
  detail: string;
  priceDelta: number;
}[] = [
  {
    id: 'standard',
    name: 'Standard Back Cushions',
    detail: 'High-resilience foam core',
    priceDelta: 0,
  },
  {
    id: 'extra',
    name: 'Extra Bolster & Lumbar Set (+4)',
    detail: 'Includes 2 bolsters + 2 accent pillows',
    priceDelta: 3800,
  },
];

/* Section 5: Services — Catalog Index (01–08) */
export interface CatalogServiceItem {
  num: string;
  pageTag: string;
  title: string;
  shortLine: string;
  description: string;
  bullets: [string, string, string];
  thumb: string;
}

const CATALOG_SERVICES: CatalogServiceItem[] = [
  {
    num: '01',
    pageTag: 'p. 04',
    title: 'Furniture & Decor Online Store',
    shortLine: 'Variants, swatches, size guides, EMI and delivery dates',
    description:
      'We build custom Shopify, WooCommerce and headless furniture stores engineered around high-ticket buyer confidence—complete with swatch zoom, dimension diagrams and instant EMI breakdowns.',
    bullets: [
      'Multi-variant selectors for size, upholstery fabric, finish and orientation (LHS/RHS)',
      'Interactive dimension diagrams & downloadable tear-sheets on every product page',
      '1-click ₹99 swatch sample box ordering with redeemable store voucher',
    ],
    thumb: IMG_ROOM_LIVING,
  },
  {
    num: '02',
    pageTag: 'p. 12',
    title: '3D, 360° & "View in Your Room" (AR) Integration',
    shortLine:
      'Let customers see products from every angle and in their space',
    description:
      'Eliminate "how will it look in my living room?" hesitation with lightweight 360° product spins and native iOS/Android AR room placement right from the mobile browser—no app download needed.',
    bullets: [
      'True-to-scale WebAR (USDZ / GLB) "View in Your Room" on mobile Safari & Chrome',
      '360° turntable rotation with real-time fabric and finish swapping',
      'Optimized 3D asset compression so pages still load in under 2 seconds',
    ],
    thumb: IMG_ROOM_BEDROOM,
  },
  {
    num: '03',
    pageTag: 'p. 18',
    title: 'Showroom Locator & Visit Booking',
    shortLine: 'Store pages, book a visit, live video shopping',
    description:
      'Over 60% of sofa and mattress buyers research online before visiting a store. We turn your website into your #1 showroom footfall generator.',
    bullets: [
      'Dedicated city & neighborhood showroom pages with parking, hours and floor display lists',
      '"Book a Showroom Visit" slot scheduler with automated WhatsApp reminders & directions',
      '"See It Live on Video Call" button connecting shoppers to floor staff on WhatsApp/Zoom',
    ],
    thumb: IMG_ROOM_DINING,
  },
  {
    num: '04',
    pageTag: 'p. 26',
    title: 'SEO for Home & Furniture',
    shortLine: 'Rank for room, style, material and "near me" searches',
    description:
      'Capture high-intent shoppers searching for "solid wood 6 seater dining table", "L shape sofa for small living room" or "furniture store near me".',
    bullets: [
      'Programmatic room, style, material and size collection landing pages',
      'Google Business Profile & multi-showroom local pack SEO dominance',
      'Rich Product, Review, Price and Stock schema for standout search snippets',
    ],
    thumb: IMG_CASE_STUDY_SOFA,
  },
  {
    num: '05',
    pageTag: 'p. 34',
    title: 'Google Shopping & Performance Max',
    shortLine: 'High-intent ads for high-value products',
    description:
      'Profitable Google Shopping, PMax and Search ad campaigns structured by product margin, room category and custom vs ready-to-ship lead times.',
    bullets: [
      'Merchant Center feed optimization with dimensions, material and color attributes',
      'High-AOV bidding rules separating ₹40,000+ furniture from low-ticket decor',
      'Offline showroom conversion tracking tied back to online ad clicks',
    ],
    thumb: IMG_ROOM_LIVING,
  },
  {
    num: '06',
    pageTag: 'p. 42',
    title: 'AI Home Style Assistant',
    shortLine:
      'Answers size, material and style questions and suggests matching products',
    description:
      'An intelligent 24/7 digital interior consultant trained on your exact catalog dimensions, wood/fabric care instructions and room-pairing rules.',
    bullets: [
      'Answers "Will this fit through a 32-inch doorway?" and care/warranty questions instantly',
      'Recommends matching coffee tables, rugs and lamps to complete the room look',
      'Captures buyer room size & phone number for your showroom sales team',
    ],
    thumb: IMG_ROOM_BEDROOM,
  },
  {
    num: '07',
    pageTag: 'p. 50',
    title: 'Delivery, Assembly & Pincode Serviceability',
    shortLine: 'Clear delivery dates, tracking and assembly booking',
    description:
      'Big-box logistics is different from parcel shipping. We build pincode-level white-glove delivery, floor-lift checks and carpenter assembly scheduling.',
    bullets: [
      'Instant pincode checker showing exact delivery window & assembly availability',
      'Split dispatch & made-to-order production stage tracker (Frame → Upholstery → QC → Shipped)',
      'Automated carpenter installation slot booking post-delivery',
    ],
    thumb: IMG_ROOM_DINING,
  },
  {
    num: '08',
    pageTag: 'p. 58',
    title: 'B2B, Bulk & Project Orders Portal',
    shortLine: 'For hotels, offices, architects and interior designers',
    description:
      'A dedicated trade and hospitality portal where architects, interior designers and hotel procurement teams can download CAD/3D blocks and request BOQ quotes.',
    bullets: [
      'Downloadable 2D CAD, SketchUp, 3ds Max and BIM model library per SKU',
      'Architect & Interior Designer trade account registration with tiered pricing',
      'Multi-item project BOQ builder for hospitality, café and office fit-outs',
    ],
    thumb: IMG_CASE_STUDY_SOFA,
  },
];

/* Section 6: Online to Showroom Bridge — Travelling Chips & 4 Feature Cards */
const BRIDGE_BOOKING_CHIPS = [
  {
    id: 'bchip-1',
    label: 'Visit booked · Sat 11 AM',
    sub: '3-Seater Sofa Trial',
  },
  {
    id: 'bchip-2',
    label: 'Video call · Today 6 PM',
    sub: 'Live Fabric Swatch Walkthrough',
  },
  {
    id: 'bchip-3',
    label: 'In stock at Noida store',
    sub: 'On Display · Floor 2',
  },
];

const SHOWROOM_BRIDGE_FEATURES = [
  {
    title: 'Store Locator & Pages',
    line: 'Dedicated pages for every showroom with map, parking, floor display items and local SEO.',
    icon: MapPin,
  },
  {
    title: 'Book a Visit',
    line: 'Let shoppers reserve a private 30-minute consultation slot with your store stylist.',
    icon: Calendar,
  },
  {
    title: 'Live Video Shopping',
    line: 'Show real wood grain, cushion softness and fabric shades live from the showroom floor.',
    icon: Video,
  },
  {
    title: 'In-Store Stock Check',
    line: 'Display real-time "On Display at [City] Showroom" badges directly on product pages.',
    icon: Store,
  },
];

/* Section 7: Case Study — Results, Measured (Product Spec Card Style) */
const FURNITURE_CASE_STUDY = {
  brandName: 'Oak & Loom Home (Placeholder)',
  subtitle: 'Solid Wood & Upholstered Furniture · 6 Showrooms + D2C Store',
  widthStat: {
    value: '3.1x',
    label: 'Online Revenue',
    axisTag: 'WIDTH (W) · 8-MONTH D2C GROWTH',
  },
  heightStat: {
    value: '+170%',
    label: 'Showroom Visits Booked',
    axisTag: 'HEIGHT (H) · STORE WALK-INS',
  },
  depthStat: {
    value: '₹38,000',
    label: 'Average Order Value',
    axisTag: 'DEPTH (D) · UP FROM ₹24,500',
  },
  challenge:
    'Customers loved the designs on Instagram and Google, but hesitated to place ₹40,000+ orders online because they were unsure about room fit, fabric texture and delivery timelines.',
  solution:
    'We rebuilt their store with an interactive "Will It Fit?" room sizer, ₹99 redeemable fabric swatch kits, pincode-based carpenter assembly dates, No-Cost EMI breakdowns, and 1-click showroom visit booking.',
  result:
    'Online revenue grew 3.1x in 8 months, average order value climbed to ₹38,000, and booked showroom appointments increased by 170%.',
  quote:
    'Before WebXCode, our website was just an online brochure. Now customers measure their room on the product page, order fabric swatches, or walk into our showrooms with their exact sofa configuration ready.',
  clientName: 'Rohan Malhotra (Placeholder)',
  clientRole: 'Co-Founder, Multi-City Furniture & Home Brand',
};

/* Section 8: Home Decor FAQ (6 Questions) */
const HOME_DECOR_FAQS = [
  {
    id: 'hfaq-1',
    question:
      'Can you add size guides and a "will it fit" tool to our product pages?',
    answer:
      'Yes. We build interactive "Will It Fit?" room-dimension checkers, visual scale comparisons (e.g., sofa next to a standard doorway and person silhouette), and clean W × D × H architectural line drawings with ft/cm toggles right on your product pages.',
  },
  {
    id: 'hfaq-2',
    question: 'Do you integrate 3D, 360° or AR "view in room" features?',
    answer:
      'Yes. We integrate lightweight 360° spin viewers and native WebAR ("View in Your Room") so mobile shoppers on iPhone and Android can place a true-to-scale 3D sofa, bed, rug or lamp directly in their living room without downloading any app.',
  },
  {
    id: 'hfaq-3',
    question: 'Can customers book a showroom visit from the website?',
    answer:
      'Absolutely. Every product page can feature a "See This in Our Showroom" or "Book a Private Store Visit / Video Call" button that checks which showroom has the piece on display and sends an instant WhatsApp confirmation with Google Maps directions.',
  },
  {
    id: 'hfaq-4',
    question:
      'How do you handle large catalogs with many fabrics and finishes?',
    answer:
      'We structure complex furniture catalogs using fast parent-child variant architecture—allowing shoppers to switch between 30+ upholstery fabrics, wood stains and seating configurations with instant image updates, high-res weave zoom, and a "Order Physical Swatch" option.',
  },
  {
    id: 'hfaq-5',
    question: 'Can we offer EMI and show delivery dates by pincode?',
    answer:
      'Yes. We surface "From ₹3,250/mo No-Cost EMI" right beneath the product price (via Razorpay, Snapmint, Bajaj Finserv, or credit card EMI) and build a pincode serviceability table that calculates ready-to-ship vs made-to-order delivery and carpenter assembly dates.',
  },
  {
    id: 'hfaq-6',
    question: 'Do you build B2B / bulk order portals for hotels and projects?',
    answer:
      'Yes. We build dedicated Trade & Hospitality portals where architects, interior designers and hotel buyers can download 2D/3D CAD files, view trade pricing, and submit multi-SKU project BOQs for rapid quotation.',
  },
];

/* Section 9: Business Types for Free Store & Showroom Audit Form */
const AUDIT_BUSINESS_TYPES = [
  'Online Store',
  'Showroom',
  'Both',
  'Manufacturer/Exporter',
];

/* ============================================================================
   MAIN HOME DECOR & FURNITURE INDUSTRY PAGE COMPONENT
============================================================================ */
const HomeDecorFurniture: React.FC<{
  onOpenQuoteModal?: (service?: string) => void;
}> = ({ onOpenQuoteModal: propOpenQuoteModal }) => {
  const quoteModalCtx = useQuoteModal();
  const onOpenQuoteModal = (service?: string) => {
    if (propOpenQuoteModal) propOpenQuoteModal(service);
    else quoteModalCtx.openQuoteModal(service);
  };
  const prefersReducedMotion = useReducedMotion();

  /* Section 1: Hero Shuffling Room Card Deck State */
  const [deckOrder, setDeckOrder] = useState<number[]>([0, 1, 2]);
  const [deckPaused, setDeckPaused] = useState<boolean>(false);
  const [selectedPinId, setSelectedPinId] = useState<string>('pin-sofa');

  /* Section 2: Polaroid Mood Board Active/Tapped Card (for mobile/keyboard) */
  const [activePolaroidId, setActivePolaroidId] = useState<string | null>(
    'seg-furniture-brands'
  );

  /* Section 4: "Will It Fit?" + Configurator Demo State */
  const [demoTab, setDemoTab] = useState<'fit' | 'configure'>('fit');

  // Tab 1: Will It Fit? Inputs (stored in feet, with ft/cm display & input toggle)
  const [measureUnit, setMeasureUnit] = useState<'ft' | 'cm'>('ft');
  const [roomWidthFt, setRoomWidthFt] = useState<number>(12); // front-to-back depth
  const [roomLengthFt, setRoomLengthFt] = useState<number>(14); // left-to-right width
  const [sofaWallFt, setSofaWallFt] = useState<number>(9.5); // available wall length for sofa
  const [previewSofaId, setPreviewSofaId] = useState<
    '2-seater' | '3-seater' | 'l-shape'
  >('3-seater');

  // Tab 2: Configure & Price State
  const [configSizeId, setConfigSizeId] = useState<
    '2-seater' | '3-seater' | 'l-shape'
  >('3-seater');
  const [configMaterialId, setConfigMaterialId] =
    useState<ConfigMaterialId>('fabric');
  const [configLegsId, setConfigLegsId] = useState<ConfigLegsId>('wood');
  const [configCushionsId, setConfigCushionsId] =
    useState<ConfigCushionsId>('standard');

  /* Section 5: Catalog Index Active Expanded Row */
  const [expandedCatalogNum, setExpandedCatalogNum] = useState<string>('01');

  /* Section 8: Home Decor FAQ Accordion State */
  const [openFaqId, setOpenFaqId] = useState<string>('hfaq-1');

  /* Section 9: Free Store & Showroom Audit Form State */
  const [auditForm, setAuditForm] = useState({
    name: '',
    email: '',
    phone: '',
    websiteUrl: '',
    businessType: 'Both',
  });
  const [auditErrors, setAuditErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    websiteUrl?: string;
  }>({});
  const [auditSubmitting, setAuditSubmitting] = useState<boolean>(false);
  const [auditSubmitted, setAuditSubmitted] = useState<boolean>(false);

  /* SEO Document Title & Meta Description */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Furniture & Home Decor Website Development, SEO & Ads | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'We build high-converting online stores and showroom websites for furniture, home decor, mattress, lighting and rug brands—with interactive room fit tools, 3D/AR previews, SEO and showroom visit booking.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Section 1: Auto-Shuffle Room Card Deck Every 5 Seconds */
  useEffect(() => {
    if (prefersReducedMotion || deckPaused) return;
    const interval = setInterval(() => {
      setDeckOrder((prev) => {
        const next = [prev[1], prev[2], prev[0]];
        const nextFrontScene = HERO_ROOM_SCENES[next[0]];
        if (nextFrontScene?.pins[0]) {
          setSelectedPinId(nextFrontScene.pins[0].id);
        }
        return next;
      });
    }, 5200);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, deckPaused]);

  const shuffleNextRoom = () => {
    setDeckOrder((prev) => {
      const next = [prev[1], prev[2], prev[0]];
      const nextFrontScene = HERO_ROOM_SCENES[next[0]];
      if (nextFrontScene?.pins[0]) {
        setSelectedPinId(nextFrontScene.pins[0].id);
      }
      return next;
    });
  };

  const shufflePrevRoom = () => {
    setDeckOrder((prev) => {
      const next = [prev[2], prev[0], prev[1]];
      const nextFrontScene = HERO_ROOM_SCENES[next[0]];
      if (nextFrontScene?.pins[0]) {
        setSelectedPinId(nextFrontScene.pins[0].id);
      }
      return next;
    });
  };

  const frontRoomScene = HERO_ROOM_SCENES[deckOrder[0]];

  /* Section 4: Fit Checker Helper Calculations (with 2 ft walking clearance) */
  const WALKING_CLEARANCE_FT = 2;
  const formatUnitValue = (valFt: number) =>
    measureUnit === 'ft'
      ? Number(valFt.toFixed(1))
      : Math.round(valFt * 30.48);

  const handleDimensionInput = (
    rawVal: string,
    setter: React.Dispatch<React.SetStateAction<number>>,
    minFt: number,
    maxFt: number
  ) => {
    const parsed = parseFloat(rawVal);
    if (Number.isNaN(parsed)) return;
    const inFt = measureUnit === 'ft' ? parsed : parsed / 30.48;
    const clamped = Math.max(minFt, Math.min(maxFt, inFt));
    setter(Number(clamped.toFixed(1)));
  };

  const evaluateSofaFit = (sofa: SofaFitOption) => {
    const effectiveWallLimit = Math.min(sofaWallFt, roomLengthFt);
    const requiredLengthWithWalkway = sofa.widthFt + WALKING_CLEARANCE_FT;
    const requiredDepthWithWalkway = sofa.depthFt + WALKING_CLEARANCE_FT;

    const fitsWall = requiredLengthWithWalkway <= effectiveWallLimit;
    const fitsDepth = requiredDepthWithWalkway <= roomWidthFt;
    const fits = fitsWall && fitsDepth;

    let reason = 'Leaves comfortable 2 ft walking clearance around sofa';
    if (!fitsWall && !fitsDepth) {
      reason = `Needs ${requiredLengthWithWalkway.toFixed(
        1
      )} ft wall & ${requiredDepthWithWalkway.toFixed(
        1
      )} ft room width (incl. 2 ft walkway)`;
    } else if (!fitsWall) {
      reason = `Needs ${requiredLengthWithWalkway.toFixed(
        1
      )} ft wall space (${sofa.widthFt} ft sofa + 2 ft walkway)`;
    } else if (!fitsDepth) {
      reason = `Needs ${requiredDepthWithWalkway.toFixed(
        1
      )} ft room width (${sofa.depthFt} ft depth + 2 ft walkway)`;
    }

    return {
      fits,
      reason,
      requiredLengthWithWalkway,
      requiredDepthWithWalkway,
    };
  };

  /* Section 4: Configurator Price Calculation */
  const selectedSofaBase =
    SOFA_FIT_OPTIONS.find((s) => s.id === configSizeId) || SOFA_FIT_OPTIONS[1];
  const selectedMaterialObj =
    CONFIG_MATERIALS.find((m) => m.id === configMaterialId) ||
    CONFIG_MATERIALS[0];
  const selectedLegsObj =
    CONFIG_LEGS.find((l) => l.id === configLegsId) || CONFIG_LEGS[0];
  const selectedCushionsObj =
    CONFIG_CUSHIONS.find((c) => c.id === configCushionsId) ||
    CONFIG_CUSHIONS[0];

  const configuredTotalPrice =
    selectedSofaBase.basePrice +
    selectedMaterialObj.priceDelta +
    selectedLegsObj.priceDelta +
    selectedCushionsObj.priceDelta;

  const monthlyNoCostEmi = Math.round(configuredTotalPrice / 12);

  /* Section 9: Free Store & Showroom Audit Submit Function */
  const handleFurnitureAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      name?: string;
      email?: string;
      phone?: string;
      websiteUrl?: string;
    } = {};

    if (!auditForm.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (
      !auditForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(auditForm.email.trim())
    ) {
      errors.email = 'Please enter a valid work email.';
    }
    if (!auditForm.phone.trim() || auditForm.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid phone / WhatsApp number.';
    }
    if (!auditForm.websiteUrl.trim()) {
      errors.websiteUrl = 'Please enter your store or showroom URL.';
    }

    setAuditErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setAuditSubmitting(true);
    // TODO: Connect Free Store & Showroom Audit form to backend CRM / email endpoint
    setTimeout(() => {
      setAuditSubmitting(false);
      setAuditSubmitted(true);
    }, 600);
  };

  const otherIndustries = industries.filter(
    (ind) => ind.slug !== 'home-decor-furniture'
  );

  /* JSON-LD Structured Data (Service, BreadcrumbList, FAQPage) */
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Furniture & Home Decor Website Development, SEO & Ads',
      serviceType:
        'Furniture E-commerce Development, Showroom Booking Websites, 3D/AR Product Configurators, SEO & Google Shopping Ads',
      audience: {
        '@type': 'Audience',
        audienceType:
          'furniture and home decor brands, showrooms and retailers',
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
          name: furnitureIndustry.name,
          item: 'https://webxcode.com/industries/home-decor-furniture',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOME_DECOR_FAQS.map((faq) => ({
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

      {/* Scoped Lifestyle & Homely Keyframes (Strict #0571c2, #1e242e, #ffffff) */}
      <style>{`
        .furniture-linen-bg {
          background-image:
            repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.025) 0px,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px,
              transparent 10px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.025) 0px,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px,
              transparent 10px
            );
        }
        @keyframes bridgeChipPulse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .bridge-chip-float-1 {
          animation: bridgeChipPulse 4.2s ease-in-out infinite;
        }
        .bridge-chip-float-2 {
          animation: bridgeChipPulse 4.2s ease-in-out infinite 1.2s;
        }
        .bridge-chip-float-3 {
          animation: bridgeChipPulse 4.2s ease-in-out infinite 2.4s;
        }
        @media (prefers-reduced-motion: reduce) {
          .bridge-chip-float-1,
          .bridge-chip-float-2,
          .bridge-chip-float-3 {
            animation: none !important;
          }
        }
      `}</style>

      {/* ====================================================================
          1. HERO — ROOM CARD DECK (navy, 50/50 split)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-16 lg:py-24 overflow-hidden furniture-linen-bg">
        {/* Soft Blue Glows */}
        <div
          aria-hidden="true"
          className="absolute -top-24 right-1/4 w-[540px] h-[540px] blue-glow-strong pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-20 w-[440px] h-[440px] blue-glow pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
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
                  {furnitureIndustry.name}
                </span>
              </nav>

              {/* Label on Dark */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em]">
                  <Sofa className="w-3.5 h-3.5 text-primary" />
                  <span>HOME DECOR &amp; FURNITURE</span>
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-tight mb-5">
                Help Customers Picture It{' '}
                <span className="text-primary">in Their Home</span>
              </h1>

              {/* Paragraph (white 75%) */}
              <p className="text-[16px] sm:text-[18px] text-white/75 leading-relaxed mb-8 max-w-xl">
                We build furniture and home decor stores that inspire, answer
                every &lsquo;will it fit?&rsquo; question and turn online
                browsing into orders and showroom visits.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#store-audit"
                  className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Get a Free Store &amp; Showroom Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#fit-demo"
                  className="px-7 py-4 rounded-full border-2 border-white/30 hover:border-white hover:bg-white/10 text-white font-bold text-[15px] transition-all inline-flex items-center gap-2"
                >
                  <Ruler className="w-4 h-4 text-primary" />
                  <span>Try &lsquo;Will It Fit?&rsquo;</span>
                </a>
              </div>

              {/* Small Trust Row (white 70%) */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 text-[13px] font-bold text-white/70">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <ShoppingBag className="w-3.5 h-3.5 text-primary" />
                  <span>Online stores</span>
                </span>
                <span className="text-primary font-extrabold">·</span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <Store className="w-3.5 h-3.5 text-primary" />
                  <span>Showrooms</span>
                </span>
                <span className="text-primary font-extrabold">·</span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <Sofa className="w-3.5 h-3.5 text-primary" />
                  <span>D2C home brands</span>
                </span>
              </div>
            </div>

            {/* Right 50% (6 cols) — Stacked Room Card Deck */}
            <div
              className="lg:col-span-6"
              onMouseEnter={() => setDeckPaused(true)}
              onMouseLeave={() => setDeckPaused(false)}
            >
              <div className="relative mx-auto max-w-[540px] pt-6 pb-10 px-2 sm:px-6">
                {/* Floating Glass Chip Outside Deck 1 (Top Left) */}
                <div className="relative sm:absolute sm:-top-2 sm:left-0 z-30 mb-3 sm:mb-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/12 backdrop-blur-md border border-white/25 text-white text-[12px] font-bold shadow-lg">
                  <CreditCard className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>No-cost EMI available</span>
                </div>

                {/* Floating Glass Chip Outside Deck 2 (Bottom Right) */}
                <div className="hidden sm:inline-flex absolute bottom-2 right-2 z-30 items-center gap-2 px-4 py-2 rounded-full bg-white/12 backdrop-blur-md border border-white/25 text-white text-[12px] font-bold shadow-lg">
                  <Truck className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Free delivery &amp; assembly</span>
                </div>

                {/* 3 Stacked Lifestyle Room Cards */}
                <div className="relative h-[370px] sm:h-[420px] w-full flex items-center justify-center">
                  {deckOrder
                    .slice()
                    .reverse()
                    .map((sceneIdx) => {
                      const scene = HERO_ROOM_SCENES[sceneIdx];
                      const stackPosition = deckOrder.indexOf(sceneIdx); // 0 = front, 1 = middle, 2 = back

                      const transformStyles =
                        stackPosition === 0
                          ? {
                              rotate: 0,
                              scale: 1,
                              y: 0,
                              x: 0,
                              zIndex: 20,
                              opacity: 1,
                            }
                          : stackPosition === 1
                          ? {
                              rotate: 3.5,
                              scale: 0.94,
                              y: 14,
                              x: 14,
                              zIndex: 10,
                              opacity: 0.82,
                            }
                          : {
                              rotate: -4,
                              scale: 0.88,
                              y: 26,
                              x: -14,
                              zIndex: 5,
                              opacity: 0.6,
                            };

                      return (
                        <motion.div
                          key={scene.id}
                          layout
                          initial={false}
                          animate={transformStyles}
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : {
                                  type: 'spring',
                                  stiffness: 240,
                                  damping: 26,
                                }
                          }
                          className="absolute inset-0 rounded-[24px] bg-white p-3 sm:p-4 shadow-2xl border-2 border-white/80 flex flex-col justify-between overflow-hidden"
                        >
                          {/* Room Photo Area */}
                          <div className="relative flex-1 rounded-[18px] overflow-hidden bg-navy">
                            <Image
                              src={scene.image}
                              alt={scene.imageAlt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 40vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/15 to-transparent" />

                            {/* Top Left Room Tag + Dimensions */}
                            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                              <span className="px-3 py-1 rounded-full bg-navy/85 backdrop-blur-xs text-white text-[11px] font-extrabold uppercase tracking-wider border border-white/20">
                                {scene.roomTitle}
                              </span>
                              <span className="px-3 py-1 rounded-full bg-white/95 text-navy font-mono text-[11px] font-bold shadow-xs">
                                {scene.dimensionsNote}
                              </span>
                            </div>

                            {/* "Shop the Look" Pinned Pills on the Front Card */}
                            {stackPosition === 0 &&
                              scene.pins.map((pin) => {
                                const isActivePin = selectedPinId === pin.id;
                                return (
                                  <button
                                    key={pin.id}
                                    type="button"
                                    onClick={() => setSelectedPinId(pin.id)}
                                    style={{ top: pin.top, left: pin.left }}
                                    className={`
                                      absolute z-20 -translate-x-1/2 -translate-y-1/2
                                      px-3 py-1.5 rounded-full bg-white text-navy
                                      border-2 transition-all cursor-pointer shadow-lg
                                      flex items-center gap-2 text-left
                                      ${
                                        isActivePin
                                          ? 'border-primary ring-4 ring-primary/30 scale-105'
                                          : 'border-white hover:border-primary'
                                      }
                                    `}
                                  >
                                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0" />
                                    <span className="text-[11px] sm:text-[12px] font-extrabold whitespace-nowrap">
                                      {pin.label} ·{' '}
                                      <span className="text-primary">
                                        {pin.price}
                                      </span>
                                    </span>
                                  </button>
                                );
                              })}

                            {/* Bottom Caption Inside Image */}
                            <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                              <div>
                                <div className="text-[11px] font-semibold text-white/80">
                                  {scene.styleTag}
                                </div>
                                <div className="text-[14px] font-extrabold">
                                  Tap pins to inspect room items (Placeholder)
                                </div>
                              </div>
                              <span className="px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-extrabold uppercase tracking-wider">
                                Shop the Look
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>

                {/* Deck Controls (Shuffle Arrows + Room Dots) */}
                <div className="mt-6 flex items-center justify-between gap-4 px-2">
                  <div className="flex items-center gap-2">
                    {HERO_ROOM_SCENES.map((rm, idx) => {
                      const isFront = deckOrder[0] === idx;
                      return (
                        <button
                          key={rm.id}
                          type="button"
                          onClick={() => {
                            const nextOrder = [
                              idx,
                              (idx + 1) % 3,
                              (idx + 2) % 3,
                            ];
                            setDeckOrder(nextOrder);
                            if (HERO_ROOM_SCENES[idx]?.pins[0]) {
                              setSelectedPinId(
                                HERO_ROOM_SCENES[idx].pins[0].id
                              );
                            }
                          }}
                          aria-label={`Bring ${rm.roomTitle} card to front`}
                          className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                            isFront
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-white/10 text-white/75 hover:bg-white/20'
                          }`}
                        >
                          {rm.roomTitle.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={shufflePrevRoom}
                      aria-label="Previous room card"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={shuffleNextRoom}
                      aria-label="Shuffle next room card"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. WHO WE SERVE — MOOD BOARD (white, polaroid pin-board)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHO WE WORK WITH
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-4">
              Made for <span className="text-primary">Home Brands</span> of
              Every Kind
            </h2>
            <p className="text-[16px] text-navy-70">
              Hover or tap any polaroid on our studio mood board to see what we
              build for your category.
            </p>
          </div>

          {/* Soft Light-Tint Mood Board / Pin Board Container */}
          <div className="rounded-[32px] bg-primary-50/60 border-2 border-primary-100 p-5 sm:p-8 lg:p-12 shadow-inner">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
              {MOOD_BOARD_SEGMENTS.map((seg) => {
                const Icon = seg.icon;
                const isSelected = activePolaroidId === seg.id;
                return (
                  <div
                    key={seg.id}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      setActivePolaroidId(isSelected ? null : seg.id)
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActivePolaroidId(isSelected ? null : seg.id);
                      }
                    }}
                    className={`
                      group relative bg-white rounded-[18px] p-3 sm:p-4 pb-5
                      border border-navy-08 shadow-md
                      transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary
                      hover:rotate-0 hover:-translate-y-2 hover:shadow-xl hover:border-primary
                      ${isSelected ? 'rotate-0 -translate-y-1.5 shadow-xl border-primary' : seg.rotationClass}
                    `}
                  >
                    {/* Small Blue "Tape" Strip Holding the Polaroid at Top Center */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-5 bg-primary/25 border border-primary/40 backdrop-blur-xs -rotate-2 rounded-xs shadow-2xs pointer-events-none"
                    />

                    {/* Polaroid Photo Square */}
                    <div className="aspect-[4/3] rounded-[12px] overflow-hidden bg-navy mb-3.5 relative">
                      <Image
                        src={seg.image}
                        alt={seg.imageAlt}
                        loading="lazy"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 text-primary flex items-center justify-center shadow-sm">
                        <Icon className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Polaroid Caption Area */}
                    <div>
                      <h3 className="text-[14px] sm:text-[16px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug">
                        {seg.name}
                      </h3>

                      {/* Revealed Description + 2 Solution Chips on Hover / Active */}
                      <div
                        className={`mt-2.5 pt-2.5 border-t border-navy-08 transition-all duration-200 ${
                          isSelected
                            ? 'block'
                            : 'hidden sm:block sm:opacity-85 group-hover:opacity-100'
                        }`}
                      >
                        <p className="text-[12px] text-navy-70 leading-relaxed mb-2.5">
                          {seg.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {seg.solutions.map((chip) => (
                            <span
                              key={chip}
                              className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary text-[10px] sm:text-[11px] font-bold border border-primary-100"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. THE CONSIDERED PURCHASE — MEASURING TAPE JOURNEY (primary-50)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px] border-b border-primary-100 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              THE BUYER JOURNEY
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-4">
              Furniture Isn&apos;t an Impulse Buy.{' '}
              <span className="text-primary">
                Your Website Shouldn&apos;t Act Like It.
              </span>
            </h2>
            <p className="text-[16px] text-navy-70">
              A sofa or bed takes 8 deliberate steps from first pin to living
              room delivery. Here is how we engineer every inch of that journey.
            </p>
          </div>

          {/* Desktop Horizontal Unrolling Measuring Tape Graphic */}
          <div className="hidden lg:block">
            <div className="flex items-stretch gap-0 mb-6">
              {/* Left Rounded Navy Measuring Tape Case */}
              <div className="w-40 shrink-0 rounded-2xl bg-navy text-white p-4 border-2 border-primary shadow-xl flex flex-col justify-between relative z-20">
                <div className="flex items-center justify-between">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] font-bold text-white/70">
                    96 IN / 8 FT
                  </span>
                </div>
                <div className="my-2">
                  <div className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-primary">
                    WEBXCODE TAPE
                  </div>
                  <div className="text-[15px] font-extrabold leading-tight mt-0.5">
                    Buyer Fit Measure
                  </div>
                </div>
                <div className="font-mono text-[10px] text-white/60">
                  LOCK · AUTO-RETRACT
                </div>
              </div>

              {/* Unrolled Blue Measuring Tape Blade with White Tick Marks & Inch Numbers */}
              <motion.div
                initial={
                  prefersReducedMotion ? false : { scaleX: 0.25, opacity: 0.5 }
                }
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{ transformOrigin: 'left center' }}
                className="flex-1 bg-primary text-white rounded-r-2xl border-y-2 border-r-2 border-navy/20 shadow-lg relative flex items-center justify-between px-4 py-3 -ml-2 z-10 overflow-hidden"
              >
                {/* Top & Bottom Millimeter/Inch Ruler Ticks */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-2.5 flex justify-between px-2 opacity-65"
                >
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-px bg-white ${
                        i % 6 === 0 ? 'h-2.5' : i % 3 === 0 ? 'h-2' : 'h-1'
                      }`}
                    />
                  ))}
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2.5 flex justify-between px-2 opacity-65"
                >
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-px bg-white ${
                        i % 6 === 0 ? 'h-2.5' : i % 3 === 0 ? 'h-2' : 'h-1'
                      }`}
                    />
                  ))}
                </div>

                {/* 8 Measurement Stop Markers Along the Tape */}
                <div className="w-full grid grid-cols-8 gap-2 relative z-10 py-1">
                  {MEASURING_TAPE_STOPS.map((stop) => (
                    <div
                      key={stop.stepNumber}
                      className="flex flex-col items-center text-center"
                    >
                      <span className="px-2.5 py-0.5 rounded-md bg-navy text-white font-mono text-[12px] font-extrabold shadow-xs border border-white/25">
                        {stop.inchMark}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-white/90 mt-1">
                        STOP {stop.stepNumber}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Metal Tape End Hook on Far Right */}
                <div
                  aria-hidden="true"
                  className="absolute right-0 inset-y-0 w-3 bg-navy border-l-2 border-white/50"
                />
              </motion.div>
            </div>

            {/* 8 Journey Cards Below the Tape (4x2 Grid Aligned with Stops) */}
            <div className="grid grid-cols-4 gap-5">
              {MEASURING_TAPE_STOPS.map((stop) => (
                <div
                  key={stop.stepNumber}
                  className="rounded-2xl bg-white border border-primary-100 p-5 shadow-soft hover:border-primary transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-primary-50 text-primary font-mono text-[11px] font-extrabold">
                        {stop.inchMark} · STEP {stop.stepNumber}
                      </span>
                      <Ruler className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-[18px] font-extrabold text-navy mb-3">
                      {stop.title}
                    </h3>

                    <div className="mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-navy-50 block">
                        What customers need
                      </span>
                      <p className="text-[13px] font-semibold text-navy-70">
                        {stop.customerNeeds}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-navy-08">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary block">
                      What we build
                    </span>
                    <p className="text-[13px] font-extrabold text-navy">
                      {stop.whatWeBuild}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile / Tablet Vertical Measuring Tape Layout */}
          <div className="lg:hidden relative">
            {/* Top Rounded Navy Tape Case */}
            <div className="mb-4 rounded-2xl bg-navy text-white p-4 border-2 border-primary flex items-center justify-between shadow-md">
              <div>
                <div className="font-mono text-[10px] font-extrabold text-primary uppercase tracking-widest">
                  WEBXCODE MEASURING TAPE
                </div>
                <div className="text-[16px] font-extrabold">
                  8-Stop Considered Purchase Journey
                </div>
              </div>
              <span className="px-3 py-1 rounded-lg bg-primary font-mono text-[12px] font-extrabold">
                12&quot; → 96&quot;
              </span>
            </div>

            <div className="relative pl-12 space-y-4">
              {/* Vertical Blue Measuring Tape Strip on Left */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-9 rounded-xl bg-primary border-2 border-navy/20 flex flex-col justify-between py-3 items-center overflow-hidden shadow-md"
              >
                {MEASURING_TAPE_STOPS.map((st) => (
                  <span
                    key={st.inchMark}
                    className="font-mono text-[10px] font-extrabold text-white border-b border-white/40 pb-0.5"
                  >
                    {st.inchMark}
                  </span>
                ))}
              </div>

              {MEASURING_TAPE_STOPS.map((stop) => (
                <div
                  key={stop.stepNumber}
                  className="rounded-2xl bg-white border border-primary-100 p-4 shadow-soft"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[11px] font-extrabold text-primary">
                      STOP {stop.stepNumber} ({stop.inchMark})
                    </span>
                  </div>
                  <h3 className="text-[17px] font-extrabold text-navy mb-2">
                    {stop.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px]">
                    <div className="p-2.5 rounded-xl bg-primary-50/40">
                      <span className="text-[10px] font-mono font-bold uppercase text-navy-50 block">
                        What customers need
                      </span>
                      <span className="font-semibold text-navy">
                        {stop.customerNeeds}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-primary-50">
                      <span className="text-[10px] font-mono font-bold uppercase text-primary block">
                        What we build
                      </span>
                      <span className="font-extrabold text-navy">
                        {stop.whatWeBuild}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. "WILL IT FIT?" + CONFIGURATOR DEMO (white, id="fit-demo")
      ==================================================================== */}
      <section
        id="fit-demo"
        className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08 scroll-mt-20"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              TRY IT
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              Tools That Remove{' '}
              <span className="text-primary">Buying Doubts</span>
            </h2>
            <p className="text-[16px] text-navy-70">
              Interactive room-fit and custom pricing tools we build directly
              into your furniture product pages.
            </p>
          </div>

          {/* Large Rounded Card with 2 Tabs on Top */}
          <div className="rounded-[28px] bg-white border-2 border-primary-100 shadow-xl overflow-hidden">
            {/* Top Tab Bar */}
            <div
              role="tablist"
              aria-label="Interactive furniture tools"
              className="bg-primary-50/70 border-b border-primary-100 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  role="tab"
                  id="tab-fit-checker"
                  aria-selected={demoTab === 'fit'}
                  aria-controls="panel-fit-checker"
                  onClick={() => setDemoTab('fit')}
                  className={`px-6 py-3 rounded-full text-[14px] font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                    demoTab === 'fit'
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-navy hover:border-primary border border-primary-100'
                  }`}
                >
                  <Ruler className="w-4 h-4" />
                  <span>Will It Fit?</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  id="tab-configurator"
                  aria-selected={demoTab === 'configure'}
                  aria-controls="panel-configurator"
                  onClick={() => setDemoTab('configure')}
                  className={`px-6 py-3 rounded-full text-[14px] font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                    demoTab === 'configure'
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-navy hover:border-primary border border-primary-100'
                  }`}
                >
                  <Sofa className="w-4 h-4" />
                  <span>Configure &amp; Price</span>
                </button>
              </div>

              <span className="font-mono text-[11px] font-bold text-primary uppercase tracking-wider px-3 py-1 rounded-full bg-white border border-primary-100">
                INTERACTIVE PRODUCT PAGE WIDGET
              </span>
            </div>

            {/* TAB 1: WILL IT FIT? */}
            {demoTab === 'fit' ? (
              <div
                role="tabpanel"
                id="panel-fit-checker"
                aria-labelledby="tab-fit-checker"
                className="p-6 sm:p-8 lg:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left (5 cols): Room Dimension Inputs */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[20px] font-extrabold text-navy">
                          Enter Your Room Size
                        </h3>
                        <p className="text-[13px] text-navy-70">
                          Includes 2 ft (61 cm) walking clearance check
                        </p>
                      </div>

                      {/* ft / cm Toggle */}
                      <div
                        role="group"
                        aria-label="Measurement unit"
                        className="inline-flex rounded-full bg-primary-50 p-1 border border-primary-100"
                      >
                        {(['ft', 'cm'] as const).map((u) => (
                          <button
                            key={u}
                            type="button"
                            onClick={() => setMeasureUnit(u)}
                            className={`px-3.5 py-1 rounded-full text-[12px] font-extrabold uppercase cursor-pointer transition-all ${
                              measureUnit === u
                                ? 'bg-primary text-white shadow-2xs'
                                : 'text-navy-70 hover:text-navy'
                            }`}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Input 1: Room Width (Front-to-Back) */}
                    <div className="p-4 rounded-2xl bg-primary-50/40 border border-primary-100">
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="input-room-width"
                          className="text-[13px] font-extrabold text-navy"
                        >
                          Room width ({measureUnit})
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            id="input-room-width"
                            type="number"
                            min={measureUnit === 'ft' ? 6 : 183}
                            max={measureUnit === 'ft' ? 24 : 732}
                            step={measureUnit === 'ft' ? 0.5 : 5}
                            value={formatUnitValue(roomWidthFt)}
                            onChange={(e) =>
                              handleDimensionInput(
                                e.target.value,
                                setRoomWidthFt,
                                6,
                                24
                              )
                            }
                            className="w-20 px-2.5 py-1 rounded-lg bg-white border border-navy/20 text-right font-mono text-[14px] font-extrabold text-primary focus:outline-none focus:border-primary"
                          />
                          <span className="font-mono text-[12px] font-bold text-navy-50">
                            {measureUnit}
                          </span>
                        </div>
                      </div>
                      <input
                        type="range"
                        aria-label="Room width slider"
                        min={6}
                        max={24}
                        step={0.5}
                        value={roomWidthFt}
                        onChange={(e) =>
                          setRoomWidthFt(parseFloat(e.target.value))
                        }
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>

                    {/* Input 2: Room Length (Wall-to-Wall) */}
                    <div className="p-4 rounded-2xl bg-primary-50/40 border border-primary-100">
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="input-room-length"
                          className="text-[13px] font-extrabold text-navy"
                        >
                          Room length ({measureUnit})
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            id="input-room-length"
                            type="number"
                            min={measureUnit === 'ft' ? 7 : 213}
                            max={measureUnit === 'ft' ? 28 : 853}
                            step={measureUnit === 'ft' ? 0.5 : 5}
                            value={formatUnitValue(roomLengthFt)}
                            onChange={(e) =>
                              handleDimensionInput(
                                e.target.value,
                                setRoomLengthFt,
                                7,
                                28
                              )
                            }
                            className="w-20 px-2.5 py-1 rounded-lg bg-white border border-navy/20 text-right font-mono text-[14px] font-extrabold text-primary focus:outline-none focus:border-primary"
                          />
                          <span className="font-mono text-[12px] font-bold text-navy-50">
                            {measureUnit}
                          </span>
                        </div>
                      </div>
                      <input
                        type="range"
                        aria-label="Room length slider"
                        min={7}
                        max={28}
                        step={0.5}
                        value={roomLengthFt}
                        onChange={(e) =>
                          setRoomLengthFt(parseFloat(e.target.value))
                        }
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>

                    {/* Input 3: Space for Sofa (Wall Length) */}
                    <div className="p-4 rounded-2xl bg-primary-50/40 border border-primary-100">
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="input-sofa-wall"
                          className="text-[13px] font-extrabold text-navy"
                        >
                          Space for sofa — wall length ({measureUnit})
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            id="input-sofa-wall"
                            type="number"
                            min={measureUnit === 'ft' ? 5 : 152}
                            max={measureUnit === 'ft' ? 20 : 610}
                            step={measureUnit === 'ft' ? 0.5 : 5}
                            value={formatUnitValue(sofaWallFt)}
                            onChange={(e) =>
                              handleDimensionInput(
                                e.target.value,
                                setSofaWallFt,
                                5,
                                20
                              )
                            }
                            className="w-20 px-2.5 py-1 rounded-lg bg-white border border-navy/20 text-right font-mono text-[14px] font-extrabold text-primary focus:outline-none focus:border-primary"
                          />
                          <span className="font-mono text-[12px] font-bold text-navy-50">
                            {measureUnit}
                          </span>
                        </div>
                      </div>
                      <input
                        type="range"
                        aria-label="Available sofa wall space slider"
                        min={5}
                        max={20}
                        step={0.5}
                        value={sofaWallFt}
                        onChange={(e) =>
                          setSofaWallFt(parseFloat(e.target.value))
                        }
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>

                    {/* Polite Screen-Reader & Visual Fit Results List */}
                    <div
                      aria-live="polite"
                      className="space-y-2.5 pt-1"
                    >
                      {SOFA_FIT_OPTIONS.map((sofa) => {
                        const res = evaluateSofaFit(sofa);
                        const isPreviewed = previewSofaId === sofa.id;
                        return (
                          <button
                            key={sofa.id}
                            type="button"
                            onClick={() => setPreviewSofaId(sofa.id)}
                            className={`w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                              isPreviewed
                                ? 'border-primary bg-primary-50/70 shadow-xs'
                                : 'border-navy-08 bg-white hover:border-primary/40'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] font-extrabold text-navy">
                                  {sofa.name}
                                </span>
                                <span className="font-mono text-[11px] font-bold text-navy-50">
                                  (
                                  {measureUnit === 'ft'
                                    ? sofa.dimsLabelFt
                                    : sofa.dimsLabelCm}
                                  )
                                </span>
                              </div>
                              <p className="text-[11px] font-medium text-navy-70 mt-0.5">
                                {res.reason}
                              </p>
                            </div>

                            {res.fits ? (
                              <span className="shrink-0 px-3 py-1 rounded-full bg-primary text-white text-[12px] font-extrabold inline-flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" />
                                <span>Fits</span>
                              </span>
                            ) : (
                              <span className="shrink-0 px-3 py-1 rounded-full bg-navy/10 text-navy-70 border border-dashed border-navy/40 text-[12px] font-extrabold">
                                Too big
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right (7 cols): Top-Down Room Outline Drawn to Scale with 3 Sofa Options */}
                  <div className="lg:col-span-7">
                    <div className="rounded-3xl bg-primary-50/40 border-2 border-primary-100 p-5 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div>
                          <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary block">
                            TOP-DOWN SCALE FLOOR PLAN
                          </span>
                          <h4 className="text-[17px] font-extrabold text-navy">
                            Room: {formatUnitValue(roomLengthFt)} {measureUnit}{' '}
                            (L) × {formatUnitValue(roomWidthFt)} {measureUnit}{' '}
                            (W) · Sofa Wall:{' '}
                            {formatUnitValue(
                              Math.min(sofaWallFt, roomLengthFt)
                            )}{' '}
                            {measureUnit}
                          </h4>
                        </div>
                        <span className="text-[11px] font-bold text-navy-70 bg-white px-3 py-1 rounded-full border border-primary-100">
                          2 ft walking space included
                        </span>
                      </div>

                      {/* Accessible Text Summary for Screen Readers */}
                      <p className="sr-only">
                        Top-down room diagram measuring{' '}
                        {formatUnitValue(roomLengthFt)} by{' '}
                        {formatUnitValue(roomWidthFt)} {measureUnit} with{' '}
                        {formatUnitValue(Math.min(sofaWallFt, roomLengthFt))}{' '}
                        {measureUnit} sofa wall space.{' '}
                        {SOFA_FIT_OPTIONS.map((s) => {
                          const r = evaluateSofaFit(s);
                          return `${s.name}: ${r.fits ? 'Fits' : 'Too big'}. `;
                        }).join('')}
                      </p>

                      {/* Scaled SVG Room Outline + 3 Sofa Option Rectangles */}
                      <div className="bg-white rounded-2xl border-2 border-navy/20 p-4 sm:p-6 flex items-center justify-center">
                        <svg
                          viewBox="0 0 560 340"
                          className="w-full h-auto max-h-[340px]"
                          role="img"
                          aria-label="Top-down scaled room layout showing 2-seater, 3-seater and L-shape sofa fit"
                        >
                          {/* Subtle Blueprint Floor Grid */}
                          <defs>
                            <pattern
                              id="roomGridPattern"
                              width="20"
                              height="20"
                              patternUnits="userSpaceOnUse"
                            >
                              <path
                                d="M 20 0 L 0 0 0 20"
                                fill="none"
                                stroke="rgba(5,113,194,0.08)"
                                strokeWidth="1"
                              />
                            </pattern>
                          </defs>
                          <rect
                            x="0"
                            y="0"
                            width="560"
                            height="340"
                            fill="url(#roomGridPattern)"
                          />

                          {(() => {
                            // Scale room so max 28x24 ft fits cleanly inside 460x260 box
                            const pxPerFt = Math.min(
                              440 / Math.max(roomLengthFt, 10),
                              240 / Math.max(roomWidthFt, 8)
                            );
                            const roomWpx = roomLengthFt * pxPerFt;
                            const roomHpx = roomWidthFt * pxPerFt;
                            const roomX = (560 - roomWpx) / 2;
                            const roomY = (340 - roomHpx) / 2 + 8;

                            const effectiveWallFt = Math.min(
                              sofaWallFt,
                              roomLengthFt
                            );
                            const wallWpx = effectiveWallFt * pxPerFt;
                            const wallX = roomX + (roomWpx - wallWpx) / 2;

                            return (
                              <g>
                                {/* Room Outer Walls (Thin Navy Lines) */}
                                <rect
                                  x={roomX}
                                  y={roomY}
                                  width={roomWpx}
                                  height={roomHpx}
                                  fill="#ffffff"
                                  stroke="#1e242e"
                                  strokeWidth="2.5"
                                  rx="6"
                                />

                                {/* Highlighted Available Sofa Wall Bar on Top Wall */}
                                <line
                                  x1={wallX}
                                  y1={roomY}
                                  x2={wallX + wallWpx}
                                  y2={roomY}
                                  stroke="#0571c2"
                                  strokeWidth="6"
                                />
                                <text
                                  x={wallX + wallWpx / 2}
                                  y={roomY - 10}
                                  textAnchor="middle"
                                  fill="#0571c2"
                                  fontSize="11"
                                  fontWeight="800"
                                >
                                  Sofa Wall: {formatUnitValue(effectiveWallFt)}{' '}
                                  {measureUnit}
                                </text>

                                {/* 2 ft Walking Clearance Zone Indicator */}
                                <rect
                                  x={wallX}
                                  y={roomY + 4}
                                  width={wallWpx}
                                  height={Math.min(
                                    roomHpx - 8,
                                    (5.5 + WALKING_CLEARANCE_FT) * pxPerFt
                                  )}
                                  fill="rgba(5,113,194,0.04)"
                                  stroke="rgba(5,113,194,0.22)"
                                  strokeDasharray="4 4"
                                  rx="4"
                                />

                                {/* Render All 3 Sofa Options Side-by-Side / Layered in Top-Down View */}
                                {SOFA_FIT_OPTIONS.map((sofa, idx) => {
                                  const fitRes = evaluateSofaFit(sofa);
                                  const sW = sofa.widthFt * pxPerFt;
                                  const sD = sofa.depthFt * pxPerFt;
                                  const isSelectedSofa =
                                    previewSofaId === sofa.id;

                                  // Stack the 3 sofa footprints vertically down the room for instant visual comparison
                                  const rowY =
                                    roomY +
                                    16 +
                                    idx * Math.max(58, (roomHpx - 36) / 3);
                                  const sofaX = roomX + (roomWpx - sW) / 2;

                                  return (
                                    <g
                                      key={sofa.id}
                                      onClick={() => setPreviewSofaId(sofa.id)}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {/* Sofa Rectangle (or L-shape) */}
                                      <rect
                                        x={sofaX}
                                        y={rowY}
                                        width={sW}
                                        height={Math.min(sD, 42)}
                                        rx="5"
                                        fill={
                                          fitRes.fits
                                            ? isSelectedSofa
                                              ? '#0571c2'
                                              : 'rgba(5,113,194,0.82)'
                                            : 'rgba(30,36,46,0.08)'
                                        }
                                        stroke={
                                          fitRes.fits ? '#0571c2' : '#1e242e'
                                        }
                                        strokeWidth={isSelectedSofa ? '2.5' : '1.5'}
                                        strokeDasharray={
                                          fitRes.fits ? undefined : '5 4'
                                        }
                                      />

                                      {/* L-Shape Chaise Extension */}
                                      {sofa.id === 'l-shape' && (
                                        <rect
                                          x={sofaX + sW - sW * 0.28}
                                          y={rowY}
                                          width={sW * 0.28}
                                          height={Math.min(sD * 1.15, 54)}
                                          rx="4"
                                          fill={
                                            fitRes.fits
                                              ? isSelectedSofa
                                                ? '#0571c2'
                                                : 'rgba(5,113,194,0.82)'
                                              : 'rgba(30,36,46,0.08)'
                                          }
                                          stroke={
                                            fitRes.fits ? '#0571c2' : '#1e242e'
                                          }
                                          strokeDasharray={
                                            fitRes.fits ? undefined : '5 4'
                                          }
                                        />
                                      )}

                                      {/* Sofa Label + Status Inside/Next to Footprint */}
                                      <text
                                        x={sofaX + sW / 2}
                                        y={rowY + 20}
                                        textAnchor="middle"
                                        fill={
                                          fitRes.fits ? '#ffffff' : '#1e242e'
                                        }
                                        fontSize="11"
                                        fontWeight="800"
                                      >
                                        {sofa.name} (
                                        {fitRes.fits ? '✓ Fits' : 'Too big'})
                                      </text>
                                    </g>
                                  );
                                })}
                              </g>
                            );
                          })()}
                        </svg>
                      </div>

                      <p className="mt-4 text-center text-[13px] font-bold text-navy-70">
                        Most brands lose sales at this exact doubt. We build
                        tools like this into your product pages.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 2: CONFIGURE & PRICE */
              <div
                role="tabpanel"
                id="panel-configurator"
                aria-labelledby="tab-configurator"
                className="p-6 sm:p-8 lg:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Left (6 cols): Selectable Option Chips */}
                  <div className="lg:col-span-6 space-y-6">
                    {/* Option 1: Size */}
                    <div>
                      <span className="block text-[12px] font-mono font-extrabold uppercase tracking-wider text-navy-50 mb-2">
                        1. Select Size
                      </span>
                      <div className="grid grid-cols-3 gap-2.5">
                        {SOFA_FIT_OPTIONS.map((sz) => {
                          const active = configSizeId === sz.id;
                          return (
                            <button
                              key={sz.id}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setConfigSizeId(sz.id)}
                              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                                active
                                  ? 'bg-primary text-white border-primary shadow-sm'
                                  : 'bg-white text-navy border-navy-08 hover:border-primary'
                              }`}
                            >
                              <div className="text-[13px] font-extrabold">
                                {sz.name.replace(' Sectional', '')}
                              </div>
                              <div
                                className={`text-[11px] font-mono mt-0.5 ${
                                  active ? 'text-white/85' : 'text-navy-50'
                                }`}
                              >
                                {sz.dimsLabelFt}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Option 2: Material (Blue Tint Patterns Only) */}
                    <div>
                      <span className="block text-[12px] font-mono font-extrabold uppercase tracking-wider text-navy-50 mb-2">
                        2. Select Upholstery Material
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {CONFIG_MATERIALS.map((mat) => {
                          const active = configMaterialId === mat.id;
                          return (
                            <button
                              key={mat.id}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setConfigMaterialId(mat.id)}
                              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                                active
                                  ? 'bg-primary text-white border-primary shadow-sm'
                                  : 'bg-white text-navy border-navy-08 hover:border-primary'
                              }`}
                            >
                              {/* Blue Tint Texture Swatch Circle */}
                              <span
                                aria-hidden="true"
                                className={`w-8 h-8 rounded-full shrink-0 border ${
                                  active
                                    ? 'bg-white/25 border-white'
                                    : 'bg-primary-50 border-primary/40'
                                }`}
                                style={{
                                  backgroundImage:
                                    mat.id === 'fabric'
                                      ? 'radial-gradient(circle, rgba(5,113,194,0.35) 1px, transparent 1px)'
                                      : mat.id === 'velvet'
                                      ? 'linear-gradient(135deg, rgba(5,113,194,0.35) 0%, rgba(5,113,194,0.08) 100%)'
                                      : 'repeating-linear-gradient(45deg, rgba(5,113,194,0.22) 0px, rgba(5,113,194,0.22) 2px, transparent 2px, transparent 5px)',
                                  backgroundSize:
                                    mat.id === 'fabric' ? '6px 6px' : '100% 100%',
                                }}
                              />
                              <div>
                                <div className="text-[13px] font-extrabold leading-tight">
                                  {mat.name.split(' ').slice(-1)[0]}
                                </div>
                                <div
                                  className={`text-[10px] font-semibold ${
                                    active ? 'text-white/85' : 'text-primary'
                                  }`}
                                >
                                  {mat.priceDelta === 0
                                    ? 'Included'
                                    : `+₹${mat.priceDelta.toLocaleString('en-IN')}`}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Option 3 & 4: Legs + Cushions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="block text-[12px] font-mono font-extrabold uppercase tracking-wider text-navy-50 mb-2">
                          3. Legs Style
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {CONFIG_LEGS.map((leg) => {
                            const active = configLegsId === leg.id;
                            return (
                              <button
                                key={leg.id}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setConfigLegsId(leg.id)}
                                className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                                  active
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-navy border-navy-08 hover:border-primary'
                                }`}
                              >
                                <div className="text-[13px] font-extrabold">
                                  {leg.id === 'wood' ? 'Wood' : 'Metal'}
                                </div>
                                <div
                                  className={`text-[10px] font-semibold ${
                                    active ? 'text-white/85' : 'text-primary'
                                  }`}
                                >
                                  {leg.priceDelta === 0
                                    ? 'Standard'
                                    : `+₹${leg.priceDelta.toLocaleString('en-IN')}`}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <span className="block text-[12px] font-mono font-extrabold uppercase tracking-wider text-navy-50 mb-2">
                          4. Cushions
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {CONFIG_CUSHIONS.map((cush) => {
                            const active = configCushionsId === cush.id;
                            return (
                              <button
                                key={cush.id}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setConfigCushionsId(cush.id)}
                                className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                                  active
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-navy border-navy-08 hover:border-primary'
                                }`}
                              >
                                <div className="text-[13px] font-extrabold">
                                  {cush.id === 'standard'
                                    ? 'Standard'
                                    : 'Extra (+4)'}
                                </div>
                                <div
                                  className={`text-[10px] font-semibold ${
                                    active ? 'text-white/85' : 'text-primary'
                                  }`}
                                >
                                  {cush.priceDelta === 0
                                    ? 'Included'
                                    : `+₹${cush.priceDelta.toLocaleString('en-IN')}`}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right (6 cols): Blue Line-Drawing Sofa Silhouette SVG + Live Price Summary */}
                  <div className="lg:col-span-6">
                    <div className="rounded-3xl bg-primary-50/50 border-2 border-primary-100 p-6 sm:p-8">
                      {/* Blue Line-Drawing Sofa Silhouette SVG */}
                      <div className="bg-white rounded-2xl border border-primary-100 p-4 mb-6 flex flex-col items-center">
                        <div className="w-full flex items-center justify-between text-[11px] font-mono font-bold text-primary mb-2">
                          <span>
                            MODEL: {selectedSofaBase.name.toUpperCase()}
                          </span>
                          <span>{selectedMaterialObj.name}</span>
                        </div>

                        <svg
                          viewBox="0 0 440 190"
                          className="w-full h-40 sm:h-44"
                          role="img"
                          aria-label={`Line drawing of ${selectedSofaBase.name} with ${selectedMaterialObj.name}, ${selectedLegsObj.name} legs and ${selectedCushionsObj.name}`}
                        >
                          {/* Floor Shadow Line */}
                          <line
                            x1="40"
                            y1="168"
                            x2="400"
                            y2="168"
                            stroke="rgba(30,36,46,0.18)"
                            strokeWidth="2"
                          />

                          {(() => {
                            const seatCount =
                              configSizeId === '2-seater' ? 2 : 3;
                            const bodyWidth =
                              configSizeId === '2-seater'
                                ? 220
                                : configSizeId === '3-seater'
                                ? 300
                                : 320;
                            const startX = (440 - bodyWidth) / 2;
                            const seatW = (bodyWidth - 36) / seatCount;

                            return (
                              <g>
                                {/* Backrest Frame */}
                                <rect
                                  x={startX + 14}
                                  y="36"
                                  width={bodyWidth - 28}
                                  height="66"
                                  rx="12"
                                  fill="rgba(5,113,194,0.08)"
                                  stroke="#0571c2"
                                  strokeWidth="2.5"
                                />

                                {/* Seat Cushions */}
                                {Array.from({ length: seatCount }).map(
                                  (_, idx) => (
                                    <g key={idx}>
                                      {/* Back Cushion */}
                                      <rect
                                        x={startX + 18 + idx * seatW}
                                        y="46"
                                        width={seatW - 4}
                                        height="48"
                                        rx="8"
                                        fill="rgba(5,113,194,0.14)"
                                        stroke="#0571c2"
                                        strokeWidth="2"
                                      />
                                      {/* Seat Cushion */}
                                      <rect
                                        x={startX + 18 + idx * seatW}
                                        y="94"
                                        width={seatW - 4}
                                        height="30"
                                        rx="7"
                                        fill="#ffffff"
                                        stroke="#0571c2"
                                        strokeWidth="2.5"
                                      />
                                      {/* Extra Lumbar / Bolster Pillows when 'extra' is selected */}
                                      {configCushionsId === 'extra' && (
                                        <rect
                                          x={
                                            startX +
                                            18 +
                                            idx * seatW +
                                            seatW * 0.2
                                          }
                                          y="66"
                                          width={seatW * 0.6}
                                          height="22"
                                          rx="6"
                                          fill="#0571c2"
                                          stroke="#ffffff"
                                          strokeWidth="1.5"
                                        />
                                      )}
                                    </g>
                                  )
                                )}

                                {/* L-Shape Chaise Lounge Extension on Right Cushion */}
                                {configSizeId === 'l-shape' && (
                                  <rect
                                    x={startX + 18 + 2 * seatW}
                                    y="94"
                                    width={seatW - 4}
                                    height="52"
                                    rx="8"
                                    fill="rgba(5,113,194,0.18)"
                                    stroke="#0571c2"
                                    strokeWidth="2.5"
                                  />
                                )}

                                {/* Left & Right Armrests */}
                                <rect
                                  x={startX}
                                  y="68"
                                  width="20"
                                  height="74"
                                  rx="8"
                                  fill="#ffffff"
                                  stroke="#0571c2"
                                  strokeWidth="2.5"
                                />
                                <rect
                                  x={startX + bodyWidth - 20}
                                  y="68"
                                  width="20"
                                  height="74"
                                  rx="8"
                                  fill="#ffffff"
                                  stroke="#0571c2"
                                  strokeWidth="2.5"
                                />

                                {/* Base Plinth */}
                                <rect
                                  x={startX + 6}
                                  y="124"
                                  width={bodyWidth - 12}
                                  height="18"
                                  rx="4"
                                  fill="rgba(5,113,194,0.22)"
                                  stroke="#0571c2"
                                  strokeWidth="2"
                                />

                                {/* Legs: Wood (Tapered Angled) vs Metal (Architectural Sled) */}
                                {configLegsId === 'wood' ? (
                                  <>
                                    <polygon
                                      points={`${startX + 18},142 ${
                                        startX + 26
                                      },142 ${startX + 22},168 ${
                                        startX + 14
                                      },168`}
                                      fill="#1e242e"
                                    />
                                    <polygon
                                      points={`${
                                        startX + bodyWidth - 26
                                      },142 ${
                                        startX + bodyWidth - 18
                                      },142 ${
                                        startX + bodyWidth - 14
                                      },168 ${
                                        startX + bodyWidth - 22
                                      },168`}
                                      fill="#1e242e"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <path
                                      d={`M ${startX + 16} 142 L ${
                                        startX + 16
                                      } 166 L ${startX + 46} 166`}
                                      fill="none"
                                      stroke="#0571c2"
                                      strokeWidth="4"
                                    />
                                    <path
                                      d={`M ${
                                        startX + bodyWidth - 16
                                      } 142 L ${
                                        startX + bodyWidth - 16
                                      } 166 L ${startX + bodyWidth - 46} 166`}
                                      fill="none"
                                      stroke="#0571c2"
                                      strokeWidth="4"
                                    />
                                  </>
                                )}
                              </g>
                            );
                          })()}
                        </svg>
                      </div>

                      {/* Live Price Summary */}
                      <div
                        aria-live="polite"
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-primary-100"
                      >
                        <div>
                          <span className="text-[12px] font-bold text-navy-70 block">
                            Configured Price (Placeholder)
                          </span>
                          <div className="text-[30px] sm:text-[34px] font-extrabold text-navy tabular-nums leading-tight">
                            ₹{configuredTotalPrice.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[13px] font-extrabold text-primary mt-0.5">
                            or ₹{monthlyNoCostEmi.toLocaleString('en-IN')}/month
                            with No-Cost EMI (12 months)
                          </div>
                        </div>

                        <div className="text-[12px] font-semibold text-navy-70 bg-white p-3 rounded-xl border border-primary-100 space-y-1">
                          <div>
                            Base ({selectedSofaBase.name}): ₹
                            {selectedSofaBase.basePrice.toLocaleString('en-IN')}
                          </div>
                          <div>
                            Options: +₹
                            {(
                              selectedMaterialObj.priceDelta +
                              selectedLegsObj.priceDelta +
                              selectedCushionsObj.priceDelta
                            ).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onOpenQuoteModal(
                            'Custom Furniture Configurator & Store Quote'
                          )
                        }
                        className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        <span>Get a Configurator for Your Store</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. SERVICES — CATALOG INDEX (navy)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute -right-24 top-1/3 w-[500px] h-[500px] blue-glow pointer-events-none"
        />

        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHAT WE BUILD
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight">
              Everything Your Home Brand{' '}
              <span className="text-primary">Needs Online</span>
            </h2>
          </div>

          {/* Large White "Catalog Page" Card on Navy */}
          <div className="rounded-[28px] bg-white text-navy p-6 sm:p-10 lg:p-14 shadow-2xl border-4 border-white/15">
            {/* Catalog Page Header: Big Title "CONTENTS" + Thin Rule */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 mb-6 border-b-2 border-navy">
              <div>
                <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary block mb-1">
                  EDITION N° 26 // DIGITAL STORE &amp; SHOWROOM ARCHITECTURE
                </span>
                <h3 className="text-[32px] sm:text-[42px] font-extrabold tracking-tight text-navy leading-none">
                  CONTENTS
                </h3>
              </div>
              <span className="font-mono text-[12px] font-bold text-navy-50">
                CLICK ANY CHAPTER TO INSPECT SPECIFICATIONS
              </span>
            </div>

            {/* 8 Catalog Index Rows */}
            <div className="divide-y divide-navy-08">
              {CATALOG_SERVICES.map((item) => {
                const isExpanded = expandedCatalogNum === item.num;
                return (
                  <div key={item.num} className="py-4 first:pt-2 last:pb-2">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedCatalogNum(isExpanded ? '' : item.num)
                      }
                      onMouseEnter={() => setExpandedCatalogNum(item.num)}
                      className="w-full text-left flex items-center gap-3 sm:gap-4 group cursor-pointer focus:outline-none"
                    >
                      {/* Small Lifestyle Thumbnail on Far Left */}
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-navy-08 shrink-0">
                        <Image
                          src={item.thumb}
                          alt={item.title}
                          loading="lazy"
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      {/* Big Number (01–08) */}
                      <span
                        className={`font-mono text-[20px] sm:text-[26px] font-extrabold tabular-nums shrink-0 transition-colors ${
                          isExpanded
                            ? 'text-primary'
                            : 'text-navy-50 group-hover:text-primary'
                        }`}
                      >
                        {item.num}
                      </span>

                      {/* Service Name + Subtitle */}
                      <div className="shrink-0 max-w-[60%] sm:max-w-none">
                        <div className="text-[16px] sm:text-[19px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug">
                          {item.title}
                        </div>
                        <div className="text-[12px] text-navy-70 font-medium hidden md:block">
                          {item.shortLine}
                        </div>
                      </div>

                      {/* Dotted Leader Line */}
                      <div
                        aria-hidden="true"
                        className="flex-1 border-b-2 border-dotted border-navy/25 mx-2 hidden sm:block translate-y-1"
                      />

                      {/* "Page Number" Style Tag on Right */}
                      <span
                        className={`ml-auto shrink-0 px-3 py-1 rounded-full font-mono text-[12px] font-extrabold transition-colors ${
                          isExpanded
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {item.pageTag}
                      </span>
                    </button>

                    {/* Smoothly Expanded 2-Line Description & 3 Bullets */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
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
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 sm:ml-24 p-5 rounded-2xl bg-primary-50/60 border border-primary-100">
                            <p className="text-[14px] sm:text-[15px] text-navy-70 leading-relaxed mb-4">
                              {item.description}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                              {item.bullets.map((b) => (
                                <div
                                  key={b}
                                  className="p-3 rounded-xl bg-white border border-primary-100 flex items-start gap-2 text-[12px] font-bold text-navy"
                                >
                                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                  <span>{b}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                              {item.num === '01' && (
                                <Link
                                  href="/services/ecommerce-development"
                                  className="text-[13px] font-extrabold text-primary hover:underline inline-flex items-center gap-1.5"
                                >
                                  <span>Explore E-commerce Development Page</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              )}
                              <button
                                type="button"
                                onClick={() => onOpenQuoteModal(item.title)}
                                className="text-[13px] font-extrabold text-primary hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                              >
                                <span>Request scope for {item.title}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Catalog Page Footer Text */}
            <div className="mt-8 pt-4 border-t border-navy-08 flex items-center justify-between text-[11px] font-mono font-bold text-navy-50">
              <span>WebXCode Home Collection · 2026</span>
              <span>INDEX PAGES 04 — 58</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. ONLINE TO SHOWROOM BRIDGE (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              ONLINE + OFFLINE
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              Turn Online Browsers Into{' '}
              <span className="text-primary">Showroom Visitors</span>
            </h2>
            <p className="text-[16px] text-navy-70">
              Customers research on their phone at night and visit your store on
              Saturday. We connect the two seamlessly.
            </p>
          </div>

          {/* Split with a Curved Dotted Bridge */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            {/* Left (4 cols): Phone Mockup Showing Product Page with "Book a Showroom Visit" Button */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-[290px] rounded-[34px] bg-navy p-3 shadow-2xl border-4 border-navy">
                <div className="rounded-[24px] bg-white p-4 text-navy">
                  {/* Top Phone Notch / Bar */}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-navy-50 mb-3">
                    <span>MOBILE PRODUCT PAGE</span>
                    <span className="text-primary">● IN STOCK</span>
                  </div>

                  {/* Product Photo Inside Phone */}
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-navy mb-3 relative">
                    <Image
                      src={IMG_ROOM_LIVING}
                      alt="3-Seater Sofa on mobile product page"
                      loading="lazy"
                      fill
                      sizes="290px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-white/95 text-navy font-mono text-[10px] font-extrabold">
                      7.0 × 3.0 ft
                    </span>
                  </div>

                  <div className="text-[15px] font-extrabold text-navy leading-snug">
                    Oslo 3-Seater Modular Sofa
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5 mb-3">
                    <span className="text-[16px] font-extrabold text-primary">
                      ₹42,999
                    </span>
                    <span className="text-[11px] font-semibold text-navy-50">
                      or ₹3,583/mo EMI
                    </span>
                  </div>

                  {/* Showroom Availability Strip */}
                  <div className="p-2.5 rounded-xl bg-primary-50/70 border border-primary-100 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[11px] font-bold text-navy leading-tight">
                      On display at Noida, Gurgaon &amp; Mumbai showrooms
                    </span>
                  </div>

                  {/* Primary Showroom Button Inside Phone */}
                  <a
                    href="#store-audit"
                    className="w-full py-2.5 px-3 rounded-full bg-primary text-white text-[12px] font-extrabold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book a Showroom Visit</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Middle (4 cols): Curved Dotted Bridge Path with Travelling Booking Chips */}
            <div className="lg:col-span-4 relative py-6 flex flex-col items-center justify-center">
              {/* Curved Dotted Bridge SVG */}
              <svg
                viewBox="0 0 360 140"
                className="w-full h-32 hidden lg:block"
                aria-hidden="true"
              >
                <path
                  d="M 12 105 Q 180 10 348 105"
                  fill="none"
                  stroke="#0571c2"
                  strokeWidth="3"
                  strokeDasharray="7 7"
                />
                <circle cx="12" cy="105" r="6" fill="#0571c2" />
                <circle cx="180" cy="56" r="6" fill="#0571c2" />
                <circle cx="348" cy="105" r="6" fill="#0571c2" />
              </svg>

              {/* 3 Booking Chips Travelling Along the Bridge */}
              <div className="space-y-3 w-full max-w-[300px] lg:-mt-20 relative z-10">
                {BRIDGE_BOOKING_CHIPS.map((chip, idx) => (
                  <div
                    key={chip.id}
                    className={`bridge-chip-float-${
                      idx + 1
                    } p-3 rounded-2xl bg-white border-2 border-primary/30 shadow-md flex items-center justify-between gap-3`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <div className="text-[12px] font-extrabold text-navy leading-tight">
                          {chip.label}
                        </div>
                        <div className="text-[10px] font-semibold text-primary">
                          {chip.sub} · Placeholder
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right (4 cols): Simple Blue Line Illustration of a Showroom Storefront */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[330px] rounded-[28px] bg-primary-50/50 border-2 border-primary-100 p-5 shadow-soft">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-primary mb-3">
                  <span>PHYSICAL SHOWROOM</span>
                  <span>WALK-IN READY</span>
                </div>

                {/* Blue Line Illustration of Showroom Storefront */}
                <div className="bg-white rounded-2xl border border-primary-100 p-4">
                  <svg
                    viewBox="0 0 280 200"
                    className="w-full h-44"
                    role="img"
                    aria-label="Blue line architectural illustration of a furniture showroom storefront with a sofa and pendant lamp visible inside the glass window"
                  >
                    {/* Storefront Roof & Fascia Signboard */}
                    <rect
                      x="20"
                      y="18"
                      width="240"
                      height="30"
                      rx="4"
                      fill="#1e242e"
                    />
                    <text
                      x="140"
                      y="37"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="11"
                      fontWeight="800"
                      letterSpacing="2"
                    >
                      HOME STUDIO SHOWROOM
                    </text>

                    {/* Awning Scallops */}
                    <path
                      d="M 16 48 L 264 48 L 256 64 L 24 64 Z"
                      fill="#0571c2"
                    />

                    {/* Main Building Frame */}
                    <rect
                      x="24"
                      y="64"
                      width="232"
                      height="116"
                      fill="#ffffff"
                      stroke="#0571c2"
                      strokeWidth="2.5"
                    />

                    {/* Large Display Window Left */}
                    <rect
                      x="36"
                      y="76"
                      width="136"
                      height="92"
                      rx="4"
                      fill="rgba(5,113,194,0.06)"
                      stroke="#0571c2"
                      strokeWidth="2"
                    />

                    {/* Hanging Pendant Lamp Inside Display Window */}
                    <line
                      x1="104"
                      y1="76"
                      x2="104"
                      y2="96"
                      stroke="#0571c2"
                      strokeWidth="2"
                    />
                    <path
                      d="M 90 106 Q 104 90 118 106 Z"
                      fill="#0571c2"
                    />

                    {/* Sofa Silhouette Inside Display Window */}
                    <rect
                      x="58"
                      y="132"
                      width="92"
                      height="24"
                      rx="4"
                      fill="#ffffff"
                      stroke="#0571c2"
                      strokeWidth="2"
                    />
                    <rect
                      x="52"
                      y="140"
                      width="104"
                      height="18"
                      rx="3"
                      fill="rgba(5,113,194,0.2)"
                      stroke="#0571c2"
                      strokeWidth="2"
                    />

                    {/* Glass Entrance Door Right */}
                    <rect
                      x="184"
                      y="76"
                      width="58"
                      height="104"
                      rx="3"
                      fill="rgba(5,113,194,0.12)"
                      stroke="#0571c2"
                      strokeWidth="2"
                    />
                    <circle cx="194" cy="130" r="3" fill="#1e242e" />
                    <rect
                      x="194"
                      y="92"
                      width="38"
                      height="16"
                      rx="3"
                      fill="#0571c2"
                    />
                    <text
                      x="213"
                      y="103"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="8"
                      fontWeight="800"
                    >
                      OPEN
                    </text>

                    {/* Sidewalk Base Line */}
                    <line
                      x1="8"
                      y1="180"
                      x2="272"
                      y2="180"
                      stroke="#1e242e"
                      strokeWidth="3"
                    />
                  </svg>
                </div>

                <div className="mt-3 text-center text-[12px] font-extrabold text-navy">
                  Customers arrive knowing the exact SKU, size &amp; fabric
                </div>
              </div>
            </div>
          </div>

          {/* Below the Bridge: 4 Feature Cards in a Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SHOWROOM_BRIDGE_FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-2xl bg-primary-50/45 border border-primary-100 p-6 hover:border-primary hover:bg-white transition-all shadow-2xs"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center mb-4 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[17px] font-extrabold text-navy mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-[13px] text-navy-70 leading-relaxed">
                    {feat.line}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. CASE STUDY — RESULTS, MEASURED (primary-50, Product Spec Card Style)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px] border-b border-primary-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              CASE STUDY
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              <span className="text-primary">
                {FURNITURE_CASE_STUDY.brandName}:
              </span>{' '}
              Bigger Orders, Fuller Showrooms
            </h2>
          </div>

          {/* Large White Product Spec Card */}
          <div className="rounded-[32px] bg-white border-2 border-primary-100 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left / Center (7 cols): Lifestyle Product Photo Surrounded by W × D × H Dimension Lines */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-primary-50/50 border border-primary-100 p-5 sm:p-8 relative">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-primary mb-4">
                    <span>SPEC SHEET // MEASURED GROWTH OUTCOME</span>
                    <span>UNIT: VERIFIED METRICS</span>
                  </div>

                  <div className="relative pr-0 sm:pr-16 pb-14">
                    {/* Lifestyle Product Photo */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-navy border-2 border-primary shadow-md">
                      <Image
                        src={IMG_CASE_STUDY_SOFA}
                        alt="Oak & Loom Home furniture product and showroom growth case study"
                        loading="lazy"
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />

                      {/* Diagonal Depth (D) Measurement Line Overlaid at Bottom-Left Corner */}
                      <div className="absolute bottom-3 left-3 z-20 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-xs border-2 border-primary shadow-md">
                        <div className="font-mono text-[9px] font-extrabold uppercase tracking-wider text-primary">
                          ↗ {FURNITURE_CASE_STUDY.depthStat.axisTag}
                        </div>
                        <div className="text-[18px] sm:text-[20px] font-extrabold text-navy leading-tight">
                          <span className="text-primary">
                            {FURNITURE_CASE_STUDY.depthStat.value}
                          </span>{' '}
                          {FURNITURE_CASE_STUDY.depthStat.label}
                        </div>
                      </div>
                    </div>

                    {/* Side Height (H) Dimension Line with Arrows */}
                    <div className="mt-3 sm:mt-0 sm:absolute sm:top-0 sm:bottom-14 sm:right-0 sm:w-14 flex sm:flex-col items-center justify-between bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-primary-100">
                      <span className="hidden sm:block w-3 h-0.5 bg-primary" />
                      <div className="hidden sm:block w-0.5 flex-1 bg-primary/50" />
                      <div className="sm:rotate-90 whitespace-nowrap px-3 py-1.5 rounded-full bg-primary text-white text-[12px] font-extrabold shadow-sm">
                        ↕ {FURNITURE_CASE_STUDY.heightStat.value}{' '}
                        {FURNITURE_CASE_STUDY.heightStat.label}
                      </div>
                      <div className="hidden sm:block w-0.5 flex-1 bg-primary/50" />
                      <span className="hidden sm:block w-3 h-0.5 bg-primary" />
                    </div>

                    {/* Bottom Width (W) Dimension Line with Arrows */}
                    <div className="mt-4 sm:absolute sm:bottom-0 sm:left-0 sm:right-16 flex items-center justify-between gap-2">
                      <span className="w-0.5 h-4 bg-primary shrink-0 hidden sm:block" />
                      <div className="h-0.5 flex-1 bg-primary hidden sm:block" />
                      <div className="w-full sm:w-auto px-4 py-2 rounded-full bg-navy text-white text-[13px] sm:text-[14px] font-extrabold text-center shadow-md border border-primary">
                        ↔{' '}
                        <span className="text-primary">
                          {FURNITURE_CASE_STUDY.widthStat.value}
                        </span>{' '}
                        {FURNITURE_CASE_STUDY.widthStat.label}{' '}
                        <span className="text-[11px] font-normal text-white/70">
                          (Placeholder)
                        </span>
                      </div>
                      <div className="h-0.5 flex-1 bg-primary hidden sm:block" />
                      <span className="w-0.5 h-4 bg-primary shrink-0 hidden sm:block" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right (5 cols): Challenge · Solution · Result Blocks + Client Quote */}
              <div className="lg:col-span-5 space-y-5">
                <div className="p-4 rounded-2xl bg-primary-50/50 border border-primary-100">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50 block mb-1">
                    01 · THE CHALLENGE
                  </span>
                  <p className="text-[13px] sm:text-[14px] text-navy-70 leading-relaxed">
                    {FURNITURE_CASE_STUDY.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-primary-50/50 border border-primary-100">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary block mb-1">
                    02 · WHAT WE BUILT
                  </span>
                  <p className="text-[13px] sm:text-[14px] text-navy-70 leading-relaxed">
                    {FURNITURE_CASE_STUDY.solution}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-navy text-white">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary block mb-1">
                    03 · MEASURED RESULT
                  </span>
                  <p className="text-[13px] sm:text-[14px] text-white/90 font-semibold leading-relaxed">
                    {FURNITURE_CASE_STUDY.result}
                  </p>
                </div>

                {/* Client Quote with Avatar */}
                <div className="pt-3 flex items-start gap-3.5">
                  <Image
                    src={IMG_AVATAR_CLIENT}
                    alt={FURNITURE_CASE_STUDY.clientName}
                    loading="lazy"
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover border-2 border-primary shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-[13px] text-navy-70 italic leading-relaxed mb-1">
                      &ldquo;{FURNITURE_CASE_STUDY.quote}&rdquo;
                    </p>
                    <div className="text-[12px] font-extrabold text-navy">
                      {FURNITURE_CASE_STUDY.clientName} ·{' '}
                      <span className="font-semibold text-navy-50">
                        {FURNITURE_CASE_STUDY.clientRole}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Row of Case Study Card */}
            <div className="mt-8 pt-6 border-t border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-[13px] font-bold text-navy-70">
                <span className="text-navy font-extrabold">Services:</span>{' '}
                Store Redesign · Size Tools · Showroom Booking · Google Shopping
              </div>
              <Link
                href="/our-work"
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
          8. HOME DECOR FAQ (white, 2-Column Accordion + Photo Card)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              FAQ
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Questions from <span className="text-primary">Home Brands</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (5 cols): Lifestyle Photo Card + First 2 FAQs */}
            <div className="lg:col-span-5 space-y-4">
              {/* Small Lifestyle Photo Card at Top of Left Column */}
              <div className="rounded-3xl bg-navy text-white overflow-hidden border border-navy shadow-lg">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={IMG_ROOM_LIVING}
                    alt="Furniture store and showroom consultation"
                    loading="lazy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-extrabold uppercase tracking-wider">
                    HOME &amp; LIVING SPECIALISTS
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-[20px] font-extrabold text-white mb-2">
                    Have a custom catalog or multi-showroom setup?
                  </h3>
                  <p className="text-[13px] text-white/75 leading-relaxed mb-4">
                    Whether you sell 50 made-to-order sofa styles or 5,000 home
                    decor SKUs, our team can map out the right store flow.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-[13px] font-extrabold transition-colors"
                  >
                    <span>Talk to our team</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {HOME_DECOR_FAQS.slice(0, 2).map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border-2 transition-all overflow-hidden ${
                      isOpen
                        ? 'border-primary bg-primary-50/30 shadow-sm'
                        : 'border-navy-08 bg-white hover:border-primary/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-[15px] sm:text-[16px] font-extrabold text-navy leading-snug">
                        {faq.question}
                      </span>
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
                          <div className="px-5 pb-5 pt-1 text-[14px] text-navy-70 leading-relaxed border-t border-navy-08">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Column (7 cols): Remaining 4 FAQs */}
            <div className="lg:col-span-7 space-y-4">
              {HOME_DECOR_FAQS.slice(2).map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border-2 transition-all overflow-hidden ${
                      isOpen
                        ? 'border-primary bg-primary-50/30 shadow-sm'
                        : 'border-navy-08 bg-white hover:border-primary/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-[16px] sm:text-[17px] font-extrabold text-navy leading-snug">
                        {faq.question}
                      </span>
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
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
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-[14px] sm:text-[15px] text-navy-70 leading-relaxed border-t border-navy-08">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. FREE STORE & SHOWROOM AUDIT — CTA (navy rounded container, id="store-audit")
      ==================================================================== */}
      <section
        id="store-audit"
        className="bg-white py-[72px] lg:py-[112px] scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-[32px] bg-navy text-white p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl">
            {/* Faint Photo Collage of 3 Room Scenes on the Right Side (Low Opacity) */}
            <div
              aria-hidden="true"
              className="hidden lg:grid grid-cols-2 gap-3 absolute top-6 bottom-6 right-6 w-[48%] opacity-15 pointer-events-none"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={IMG_ROOM_LIVING}
                  alt=""
                  fill
                  sizes="24vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-rows-2 gap-3">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={IMG_ROOM_BEDROOM}
                    alt=""
                    fill
                    sizes="24vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={IMG_ROOM_DINING}
                    alt=""
                    fill
                    sizes="24vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left 50% (6 cols) */}
              <div className="lg:col-span-6">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                  FREE AUDIT
                </span>
                <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.12] tracking-tight mb-4">
                  Get a Free{' '}
                  <span className="text-primary">
                    Store &amp; Showroom Audit
                  </span>
                </h2>
                <p className="text-[16px] sm:text-[17px] text-white/75 leading-relaxed mb-8 max-w-xl">
                  We&apos;ll review your online store, product pages and
                  showroom journey and send clear ideas to increase orders and
                  visits.
                </p>

                {/* 3 Blue ✓ Points */}
                <ul className="space-y-4">
                  {[
                    'Product page & size info review',
                    'SEO & Shopping ads check',
                    'Online-to-showroom journey review',
                  ].map((pt) => (
                    <li
                      key={pt}
                      className="flex items-center gap-3.5 text-[15px] sm:text-[16px] font-bold text-white"
                    >
                      <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Check className="w-4 h-4" />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right 50% (6 cols): White Form Card Styled Like a Furniture Product Tag */}
              <div className="lg:col-span-6">
                <div className="relative mx-auto max-w-[500px] pt-5">
                  {/* Blue String Graphic + Hang-Tag Hole at Top Center */}
                  <svg
                    viewBox="0 0 120 44"
                    className="w-28 h-10 mx-auto -mb-3 relative z-20 pointer-events-none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 60 36 C 35 12, 85 2, 60 2"
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="rounded-t-[36px] rounded-b-[24px] bg-white text-navy p-6 sm:p-8 shadow-2xl border-2 border-primary/30 relative">
                    {/* Punched Product Tag Hole */}
                    <div
                      aria-hidden="true"
                      className="w-6 h-6 rounded-full bg-navy border-4 border-primary mx-auto -mt-2 mb-4 shadow-inner"
                    />

                    <div className="flex items-center justify-between pb-3 mb-5 border-b border-dashed border-navy/20 text-[11px] font-mono font-extrabold text-primary">
                      <span>TAG NO: WX-HOME-AUDIT</span>
                      <span>PRICE: ₹0 (FREE)</span>
                    </div>

                    {auditSubmitted ? (
                      <div className="py-6 text-center">
                        <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                          <Check className="w-7 h-7" />
                        </div>
                        <h3 className="text-[22px] font-extrabold text-navy mb-2">
                          Store &amp; Showroom Audit Requested!
                        </h3>
                        <p className="text-[14px] text-navy-70 mb-6">
                          Thank you, <strong>{auditForm.name}</strong>. Our
                          home &amp; furniture specialists are reviewing{' '}
                          <strong className="text-navy">
                            {auditForm.websiteUrl}
                          </strong>{' '}
                          ({auditForm.businessType}) and will send your custom
                          report within 48 hours.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setAuditSubmitted(false);
                            setAuditForm({
                              name: '',
                              email: '',
                              phone: '',
                              websiteUrl: '',
                              businessType: 'Both',
                            });
                          }}
                          className="px-6 py-2.5 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white text-[13px] font-extrabold transition-colors cursor-pointer"
                        >
                          Submit Another Website
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleFurnitureAuditSubmit}
                        noValidate
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label
                              htmlFor="faudit-name"
                              className="block text-[11px] font-extrabold uppercase tracking-wider text-navy mb-1"
                            >
                              Your Name *
                            </label>
                            <input
                              id="faudit-name"
                              type="text"
                              value={auditForm.name}
                              onChange={(e) =>
                                setAuditForm({
                                  ...auditForm,
                                  name: e.target.value,
                                })
                              }
                              placeholder="Vikram Singhania"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-navy/15 focus:border-primary focus:outline-none text-[14px] text-navy"
                            />
                            {auditErrors.name && (
                              <p className="mt-1 text-[11px] font-bold text-primary flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>{auditErrors.name}</span>
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="faudit-email"
                              className="block text-[11px] font-extrabold uppercase tracking-wider text-navy mb-1"
                            >
                              Work Email *
                            </label>
                            <input
                              id="faudit-email"
                              type="email"
                              value={auditForm.email}
                              onChange={(e) =>
                                setAuditForm({
                                  ...auditForm,
                                  email: e.target.value,
                                })
                              }
                              placeholder="vikram@yourhomebrand.com"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-navy/15 focus:border-primary focus:outline-none text-[14px] text-navy"
                            />
                            {auditErrors.email && (
                              <p className="mt-1 text-[11px] font-bold text-primary flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>{auditErrors.email}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label
                              htmlFor="faudit-phone"
                              className="block text-[11px] font-extrabold uppercase tracking-wider text-navy mb-1"
                            >
                              Phone / WhatsApp *
                            </label>
                            <input
                              id="faudit-phone"
                              type="tel"
                              value={auditForm.phone}
                              onChange={(e) =>
                                setAuditForm({
                                  ...auditForm,
                                  phone: e.target.value,
                                })
                              }
                              placeholder="+91 98765 43210"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-navy/15 focus:border-primary focus:outline-none text-[14px] text-navy"
                            />
                            {auditErrors.phone && (
                              <p className="mt-1 text-[11px] font-bold text-primary flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>{auditErrors.phone}</span>
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="faudit-url"
                              className="block text-[11px] font-extrabold uppercase tracking-wider text-navy mb-1"
                            >
                              Website URL *
                            </label>
                            <input
                              id="faudit-url"
                              type="text"
                              value={auditForm.websiteUrl}
                              onChange={(e) =>
                                setAuditForm({
                                  ...auditForm,
                                  websiteUrl: e.target.value,
                                })
                              }
                              placeholder="https://yourfurniturebrand.com"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-navy/15 focus:border-primary focus:outline-none text-[14px] text-navy"
                            />
                            {auditErrors.websiteUrl && (
                              <p className="mt-1 text-[11px] font-bold text-primary flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>{auditErrors.websiteUrl}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Business Type Chips */}
                        <div>
                          <span className="block text-[11px] font-extrabold uppercase tracking-wider text-navy mb-2">
                            Business Type
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {AUDIT_BUSINESS_TYPES.map((bType) => {
                              const active = auditForm.businessType === bType;
                              return (
                                <button
                                  key={bType}
                                  type="button"
                                  aria-pressed={active}
                                  onClick={() =>
                                    setAuditForm({
                                      ...auditForm,
                                      businessType: bType,
                                    })
                                  }
                                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                                    active
                                      ? 'bg-primary text-white shadow-2xs'
                                      : 'bg-primary-50 text-navy hover:bg-primary/15 border border-primary-100'
                                  }`}
                                >
                                  {bType}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={auditSubmitting}
                          className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-60"
                        >
                          {auditSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Preparing Your Audit...</span>
                            </>
                          ) : (
                            <>
                              <span>Get My Free Audit</span>
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
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. EXPLORE OTHER INDUSTRIES (white, compact)
      ==================================================================== */}
      <section className="bg-white py-12 border-t border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-primary block">
                12 SPECIALIZED SECTORS
              </span>
              <h2 className="text-[20px] font-extrabold text-navy">
                Explore Other Industries We Serve
              </h2>
            </div>
            <Link
              href="/industries"
              className="text-[13px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>View All Industries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
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
                className="shrink-0 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-navy-08 bg-white hover:border-primary hover:bg-primary-50 text-[13px] font-bold text-navy transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                  <IndustryIcon
                    name={ind.icon}
                    className="w-3.5 h-3.5 text-primary"
                  />
                </span>
                <span>{ind.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeDecorFurniture;


