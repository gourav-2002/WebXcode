import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  Droplets,
  Sun,
  Moon,
  Star,
  ShoppingBag,
  ShieldCheck,
  Search,
  Bot,
  Repeat,
  Calendar,
  TrendingUp,
  Layers,
  Award,
  Heart,
  Flower2,
  Scissors,
  Store,
  Plus,
  Minus,
  AlertCircle,
  Loader2,
  Zap,
  Smartphone,
  Eye,
} from 'lucide-react';
import { industries, IndustryIcon } from '../Industries';

const IMG_FLATLAY_PHOTO =
  '/src/assets/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const IMG_STEP_CLEANSE =
  '/src/assets/images/hero_laptop_ui_showcase_1791104898778.jpg';
const IMG_STEP_TREAT =
  '/src/assets/images/project_fintech_saas_ui_1791104929193.jpg';
const IMG_STEP_MOISTURIZE =
  '/src/assets/images/project_ai_enterprise_ui_1791104952051.jpg';
const IMG_AVATAR_CLIENT =
  '/src/assets/images/testimonial_2_avatar_1791105060710.jpg';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT SKINCARE & BEAUTY ITEM FROM INDUSTRIES
============================================================================ */
const beautyIndustry =
  industries.find((item) => item.slug === 'skincare-beauty') || industries[5];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS
============================================================================ */

/* Section 1: Hero Floating Ingredient Bubbles */
const HERO_INGREDIENT_BUBBLES = [
  {
    id: 'ing-1',
    name: 'Niacinamide',
    sub: '10% Barrier Clarifying',
    posClass: 'top-8 -left-4 sm:-left-6',
    delayClass: 'beauty-float-slow',
  },
  {
    id: 'ing-2',
    name: 'Hyaluronic Acid',
    sub: 'Multi-Molecular Hydration',
    posClass: 'top-20 -right-3 sm:-right-6',
    delayClass: 'beauty-float-medium',
  },
  {
    id: 'ing-3',
    name: 'Vitamin C',
    sub: '15% L-Ascorbic Radiance',
    posClass: 'bottom-24 -left-2 sm:-left-8',
    delayClass: 'beauty-float-fast',
  },
];

/* Section 2: Who We Serve — Beauty Palette (8 Circular Pan Wells) */
export interface BeautyPaletteSegment {
  id: string;
  name: string;
  shadeCode: string;
  panTintStyle: string;
  description: string;
  solutions: [string, string];
  icon: React.ComponentType<{ className?: string }>;
}

const BEAUTY_PALETTE_SEGMENTS: BeautyPaletteSegment[] = [
  {
    id: 'seg-skincare',
    name: 'Skincare Brands',
    shadeCode: 'SHADE 01 · DEW',
    panTintStyle:
      'linear-gradient(135deg, rgba(5,113,194,0.16) 0%, rgba(5,113,194,0.05) 100%)',
    description:
      'Ingredient-led D2C stores with skin quizzes, clinical before/after galleries, and regimen bundles that lift AOV.',
    solutions: ['Skin Routine Builder', 'Ingredient SEO & Subscriptions'],
    icon: Droplets,
  },
  {
    id: 'seg-makeup',
    name: 'Makeup & Cosmetics',
    shadeCode: 'SHADE 02 · VELVET',
    panTintStyle:
      'linear-gradient(135deg, rgba(5,113,194,0.24) 0%, rgba(5,113,194,0.08) 100%)',
    description:
      'Interactive shade-finder swatches, undertone matchers, shoppable lookbooks, and high-speed launch drops.',
    solutions: ['Interactive Shade Finder', ' High-AOV Combo Kits'],
    icon: Sparkles,
  },
  {
    id: 'seg-haircare',
    name: 'Haircare',
    shadeCode: 'SHADE 03 · SILK',
    panTintStyle:
      'linear-gradient(135deg, rgba(5,113,194,0.12) 0%, rgba(5,113,194,0.03) 100%)',
    description:
      'Scalp & curl-type diagnostic quizzes paired with 3-step wash-day bundles and 30-day auto-replenish plans.',
    solutions: ['Hair Type Quiz Funnel', 'Auto-Replenish Checkout'],
    icon: Heart,
  },
  {
    id: 'seg-ayurvedic',
    name: 'Ayurvedic & Clean Beauty',
    shadeCode: 'SHADE 04 · BOTANIC',
    panTintStyle:
      'linear-gradient(135deg, rgba(5,113,194,0.20) 0%, rgba(5,113,194,0.06) 100%)',
    description:
      'Storytelling storefronts highlighting botanical sourcing, lab purity certificates, and Dosha/clean beauty filters.',
    solutions: ['Botanical Story Pages', 'Lab Certificate Transparency'],
    icon: Flower2,
  },
  {
    id: 'seg-grooming',
    name: "Men's Grooming",
    shadeCode: 'SHADE 05 · MINERAL',
    panTintStyle:
      'linear-gradient(135deg, rgba(30,36,46,0.14) 0%, rgba(5,113,194,0.10) 100%)',
    description:
      'Fast, no-nonsense kit builders, beard & skin starter packs, and automated refill subscriptions.',
    solutions: ['Custom Kit Configurator', '1-Tap UPI & Refill Flows'],
    icon: Award,
  },
  {
    id: 'seg-fragrance',
    name: 'Fragrance',
    shadeCode: 'SHADE 06 · MIST',
    panTintStyle:
      'linear-gradient(135deg, rgba(5,113,194,0.18) 0%, rgba(255,255,255,0.9) 100%)',
    description:
      'Sensory scent-note pyramids (top, heart, base), discovery sample-set funnels, and redeemable full-bottle vouchers.',
    solutions: ['Scent Profiler Quiz', 'Discovery Set Voucher Flow'],
    icon: Sparkles,
  },
  {
    id: 'seg-retailers',
    name: 'Beauty Retailers',
    shadeCode: 'SHADE 07 · PRISM',
    panTintStyle:
      'linear-gradient(135deg, rgba(5,113,194,0.28) 0%, rgba(5,113,194,0.09) 100%)',
    description:
      'Multi-brand catalogs with fast faceted filtering by brand, active ingredient, skin type, concern, and price.',
    solutions: ['Multi-Brand Faceted Search', 'Loyalty & Rewards Tiering'],
    icon: Store,
  },
  {
    id: 'seg-salons',
    name: 'Salons, Spas & Clinics',
    shadeCode: 'SHADE 08 · LUMEN',
    panTintStyle:
      'linear-gradient(135deg, rgba(5,113,194,0.15) 0%, rgba(30,36,46,0.07) 100%)',
    description:
      'Luxury treatment menus, real-time appointment booking, local Google Maps SEO, and aftercare product stores.',
    solutions: ['Online Appointment Booking', 'Multi-Branch Local SEO'],
    icon: Scissors,
  },
];

/* Section 3: Interactive Routine Builder Demo Options & Mapping */
export type SkinTypeOption =
  | 'Oily'
  | 'Dry'
  | 'Combination'
  | 'Sensitive'
  | 'Normal';
export type SkinConcernOption =
  | 'Acne'
  | 'Dullness'
  | 'Pigmentation'
  | 'Fine Lines'
  | 'Dryness'
  | 'Pores';

const SKIN_TYPES: SkinTypeOption[] = [
  'Oily',
  'Dry',
  'Combination',
  'Sensitive',
  'Normal',
];

const SKIN_CONCERNS: SkinConcernOption[] = [
  'Acne',
  'Dullness',
  'Pigmentation',
  'Fine Lines',
  'Dryness',
  'Pores',
];

export interface RoutineStepProduct {
  stepLabel: string;
  name: string;
  ingredientTag: string;
  price: number;
  image: string;
}

const CLEANSER_BY_SKIN_TYPE: Record<
  SkinTypeOption,
  { name: string; ingredientTag: string; price: number }
> = {
  Oily: {
    name: 'Clarifying Micro-Foam Gel Cleanser',
    ingredientTag: '2% Salicylic Acid + Zinc PCA',
    price: 599,
  },
  Dry: {
    name: 'Velvet Ceramide Cream Cleanser',
    ingredientTag: '5-Ceramide Complex + Oat Lipid',
    price: 649,
  },
  Combination: {
    name: 'Balancing Amino-Acid Gel Wash',
    ingredientTag: 'Niacinamide + Green Tea Ferment',
    price: 599,
  },
  Sensitive: {
    name: 'pH 5.5 Barrier Soothing Milk Wash',
    ingredientTag: 'Centella Asiatica + Panthenol',
    price: 649,
  },
  Normal: {
    name: 'Daily Hydra-Glow Gentle Cleanser',
    ingredientTag: 'Hyaluronic Acid + Chamomile',
    price: 599,
  },
};

const TREATMENT_BY_CONCERN: Record<
  SkinConcernOption,
  { name: string; ingredientTag: string; price: number }
> = {
  Acne: {
    name: 'Blemish Control Clarifying Ampoule',
    ingredientTag: '10% Niacinamide + 1% Zinc',
    price: 799,
  },
  Dullness: {
    name: 'Luminous Radiance Drops Serum',
    ingredientTag: '15% Vitamin C + Ferulic Acid',
    price: 849,
  },
  Pigmentation: {
    name: 'Even-Tone Tranexamic Concentrate',
    ingredientTag: '2% Alpha Arbutin + Kojic Dipalmitate',
    price: 899,
  },
  'Fine Lines': {
    name: 'Cellular Renewal Peptide Serum',
    ingredientTag: 'Multi-Peptide Matrix + Bakuchiol',
    price: 949,
  },
  Dryness: {
    name: 'Deep Reservoir Plumping Serum',
    ingredientTag: '2% Triple Hyaluronic + Polyglutamic',
    price: 799,
  },
  Pores: {
    name: 'Pore-Refining PHA + BHA Essence',
    ingredientTag: 'Gluconolactone + Willow Bark',
    price: 799,
  },
};

const STEP3_PROTECT_MORNING: Record<
  SkinTypeOption,
  { name: string; ingredientTag: string; price: number }
> = {
  Oily: {
    name: 'Weightless Invisible Fluid SPF 50 PA++++',
    ingredientTag: 'UV Filters + Oil-Control Silica',
    price: 799,
  },
  Dry: {
    name: 'Dewy Ceramide Barrier Sun Cream SPF 50',
    ingredientTag: 'Squalane + Broad-Spectrum UV',
    price: 749,
  },
  Combination: {
    name: 'Aqua-Gel Hydrating Sun Drops SPF 50',
    ingredientTag: 'Hyaluronic Acid + Niacinamide',
    price: 799,
  },
  Sensitive: {
    name: '100% Mineral Cica Sun Shield SPF 50',
    ingredientTag: 'Non-Nano Zinc Oxide + Madecassoside',
    price: 849,
  },
  Normal: {
    name: 'Daily Silk Radiance Sunscreen SPF 50',
    ingredientTag: 'Vitamin E + Ectoin Defense',
    price: 799,
  },
};

const STEP3_MOISTURIZE_NIGHT: Record<
  SkinTypeOption,
  { name: string; ingredientTag: string; price: number }
> = {
  Oily: {
    name: 'Cloud-Light Water Gel Night Recovery',
    ingredientTag: 'Niacinamide + Marine Peptides',
    price: 799,
  },
  Dry: {
    name: 'Overnight Lipid-Restore Sleeping Mask',
    ingredientTag: 'Ceramides + Shea Squalane',
    price: 849,
  },
  Combination: {
    name: 'Bio-Repair Cellular Night Emulsion',
    ingredientTag: 'Bifida Ferment + Panthenol B5',
    price: 799,
  },
  Sensitive: {
    name: 'Calm-Barrier Cica Overnight Balm',
    ingredientTag: '5% Panthenol + Allantoin',
    price: 849,
  },
  Normal: {
    name: 'Peptide & Hyaluronic Night Cream',
    ingredientTag: 'Copper Tripeptide + Ceramide NP',
    price: 799,
  },
};

/* Section 4: The Back Label — Challenges & Solutions */
const BACK_LABEL_DATA = {
  strugglingIngredientsList: [
    'Crowded marketplace',
    'rising ad costs',
    'look-alike websites',
    'low trust in claims',
    'one-time buyers',
    'slow mobile pages',
    'generic product pages.',
  ],
  directionsForGrowth: [
    'Build a brand-first store that feels premium',
    'Make every product page answer "Is this right for my skin?"',
    'Earn trust with ingredients, reviews and transparency',
    'Rank for ingredient and concern searches',
    'Turn first orders into repeat customers',
  ],
  packagingBadges: [
    { label: 'Mobile-first', icon: Smartphone },
    { label: 'Fast-loading', icon: Zap },
    { label: 'SEO-ready', icon: Search },
    { label: 'Made for repeat purchases', icon: Repeat },
  ],
  batchNumber: 'Batch No: WX-BEAUTY-26',
};

/* Section 5: Services — 8 Bottle Cards Carousel (No Social Media Marketing / Influencer Services) */
const BOTTLE_SERVICES = [
  {
    code: 'FORMULA 01',
    title: 'D2C Beauty Store Development',
    desc: 'Shopify, WooCommerce or custom stores built for beauty with fast mobile UX and sensory storytelling.',
    bullets: [
      'Custom design tailored to skincare, makeup or wellness',
      'Slide-out cart with free miniature gift progress tiers',
      '1-page UPI & Express checkout built for impulse mobile buyers',
    ],
    icon: ShoppingBag,
  },
  {
    code: 'FORMULA 02',
    title: 'Brand Identity & Creative',
    desc: 'Logo, colors, typography and visual language that make your brand look shelf-ready and luxurious.',
    bullets: [
      'Cohesive packaging-to-website art direction',
      'Ingredient iconography & clinical claim badge systems',
      'High-conversion launch & hero campaign creative assets',
    ],
    icon: Sparkles,
  },
  {
    code: 'FORMULA 03',
    title: 'High-Converting Product Pages',
    desc: 'Ingredients, how-to-use, reviews and routine bundles that answer every buyer question.',
    bullets: [
      'Interactive ingredient glossary & texture/scent notes',
      'Before/after clinical perception sliders & dermatologist notes',
      '"Complete the 3-Step Routine" one-click bundle upsells',
    ],
    icon: Layers,
  },
  {
    code: 'FORMULA 04',
    title: 'SEO & AEO for Beauty',
    desc: 'Rank for ingredients, concerns and "best for [skin type]" searches across Google and AI engines.',
    bullets: [
      'Concern & ingredient landing pages (e.g., "niacinamide for oily skin")',
      'Rich Product & Review schema for star ratings in search',
      'Answer Engine Optimization (AEO) for AI beauty recommendations',
    ],
    icon: Search,
  },
  {
    code: 'FORMULA 05',
    title: 'Performance Marketing',
    desc: 'Google Shopping, Performance Max and Search campaigns structured around hero SKUs and LTV.',
    bullets: [
      'Merchant Center feed optimization by concern & margin tier',
      'High-intent Search ads for problem-aware skincare shoppers',
      'Server-side GA4 & Enhanced Conversions attribution',
    ],
  icon: TrendingUp,
  },
  {
    code: 'FORMULA 06',
    title: 'AI Beauty Advisor & Skin Quiz',
    desc: 'Personalized product recommendations 24/7 that guide shoppers to the right regimen.',
    bullets: [
      'Interactive 60-second skin, hair or shade diagnostic quiz',
      'AI chat advisor trained on your full INCI ingredient list',
      'Zero-party data capture synced directly to your email/WhatsApp CRM',
    ],
    icon: Bot,
  },
  {
    code: 'FORMULA 07',
    title: 'Subscriptions & Repeat Purchase',
    desc: 'Auto-replenish, WhatsApp/email reminders, loyalty rewards that turn first buyers into regulars.',
    bullets: [
      'Subscribe-and-Save recurring delivery options on core SKUs',
      'Automated 28-day bottle-running-low WhatsApp refill nudges',
      'VIP tiered loyalty points & birthday reward automation',
    ],
    icon: Repeat,
  },
  {
    code: 'FORMULA 08',
    title: 'Salon, Spa & Clinic Booking Websites',
    desc: 'Service menus, online booking, local SEO for aesthetics clinics, salons and wellness studios.',
    bullets: [
      'Real-time treatment & stylist slot booking with deposits',
      'Multi-location Google Business Profile & local search dominance',
      'Integrated post-treatment retail skincare store',
    ],
    icon: Calendar,
  },
];

/* Section 6: The Repeat Purchase Loop (6 Points Around a Soft Blue Ring) */
export interface RetentionLoopStage {
  id: string;
  step: string;
  title: string;
  shortTag: string;
  timing: string;
  whatWeSetUp: string;
  deliverables: [string, string];
}

const REPEAT_PURCHASE_LOOP: RetentionLoopStage[] = [
  {
    id: 'loop-1',
    step: '01',
    title: 'Discover',
    shortTag: 'SEO & ads',
    timing: 'Day 0 · First Touch',
    whatWeSetUp:
      'Shoppers searching for their skin concern or key active ingredient land on fast educational collection pages or your interactive Skin Quiz.',
    deliverables: [
      'Ingredient & concern SEO pages',
      'Google Shopping & Search campaigns',
    ],
  },
  {
    id: 'loop-2',
    step: '02',
    title: 'First Order',
    shortTag: 'Smooth checkout',
    timing: 'Day 1 · Conversion',
    whatWeSetUp:
      'Routine bundle upsells in the slide-out cart drawer, free sample tier bar, and 1-page UPI/card checkout convert the first purchase.',
    deliverables: [
      'Slide-out routine cart drawer',
      '1-page express checkout + COD verification',
    ],
  },
  {
    id: 'loop-3',
    step: '03',
    title: 'Welcome',
    shortTag: 'How-to-use guide via email/WhatsApp',
    timing: 'Day 2 · Delivery',
    whatWeSetUp:
      'As soon as the bottle is delivered, an automated WhatsApp and email card shares AM/PM layering order and patch-test guidance.',
    deliverables: [
      'Automated WhatsApp layering guide',
      'Post-purchase welcome email sequence',
    ],
  },
  {
    id: 'loop-4',
    step: '04',
    title: 'Results',
    shortTag: 'Usage tips at day 7',
    timing: 'Day 7 · Habit Building',
    whatWeSetUp:
      'A gentle check-in shares consistency tips and what to expect in week 2 so customers actually finish the bottle and see real results.',
    deliverables: [
      'Day-7 consistency & pairing tips',
      'AI advisor Q&A support link',
    ],
  },
  {
    id: 'loop-5',
    step: '05',
    title: 'Replenish',
    shortTag: 'Reminder at day 25–30',
    timing: 'Day 25–30 · Refill Window',
    whatWeSetUp:
      'Right before their 30ml serum runs out, a 1-tap WhatsApp reorder link and Subscribe-and-Save offer locks in the second order.',
    deliverables: [
      'Predictive 28-day refill WhatsApp link',
      'Auto-replenish subscription portal',
    ],
  },
  {
    id: 'loop-6',
    step: '06',
    title: 'Review & Refer',
    shortTag: 'Reviews + referral rewards',
    timing: 'Day 35+ · Advocacy',
    whatWeSetUp:
      'Happy repeat buyers are prompted to submit a photo review (tagged with their skin type) in exchange for loyalty points and referral credits.',
    deliverables: [
      'Skin-type verified photo review capture',
      'Give ₹200, Get ₹200 referral engine',
    ],
  },
];

/* Section 7: Claim-Safe & Trust-First (3 Columns) */
const CLAIM_SAFE_POINTS = [
  {
    title: 'Claim-Safe Copy',
    description:
      'Product copy written carefully around advertising and cosmetic-claim guidelines (e.g. ASCI in India), avoiding unproven or medical claims.',
    icon: ShieldCheck,
  },
  {
    title: 'Ingredient Transparency',
    description:
      'Full ingredient lists, how-to-use and patch-test guidance on every product page.',
    icon: Droplets,
  },
  {
    title: 'Real Reviews, Shown Honestly',
    description:
      'Verified review integrations filterable by skin type and concern.',
    icon: Eye,
  },
];

/* Section 8: Case Study — Formula Results (Active Ingredients Concentration List) */
const FORMULA_CASE_STUDY = {
  brandName: 'AuraPure Botanicals',
  captionBadge: 'Clean skincare · D2C · 8 months',
  concentrations: [
    {
      label: 'Revenue growth',
      value: '2.8x',
      sub: 'Placeholder',
      barWidth: 92,
    },
    {
      label: 'Repeat customer rate',
      value: '38%',
      sub: 'from 14% · Placeholder',
      barWidth: 84,
    },
    {
      label: 'Conversion rate',
      value: '3.1%',
      sub: 'from 1.4% · Placeholder',
      barWidth: 78,
    },
    {
      label: 'Organic traffic',
      value: '+190%',
      sub: 'Ingredient SEO · Placeholder',
      barWidth: 88,
    },
    {
      label: 'Average order value',
      value: '+42%',
      sub: 'routine bundles · Placeholder',
      barWidth: 74,
    },
  ],
  quote:
    'Our new store feels like a calm, luxury apothecary. The 3-Step Routine Builder immediately lifted our average basket size by 42%, and automated 28-day WhatsApp refill reminders doubled our repeat buyers.',
  clientName: 'Meera Nair (Placeholder)',
  clientRole: 'Founder, Clean Skincare D2C Brand',
};

/* Section 9: Beauty FAQ (6 Questions) */
const BEAUTY_FAQS = [
  {
    id: 'bfaq-1',
    question: 'Can you build a skin quiz or routine builder for our store?',
    answer:
      'Yes. We design and build custom interactive Skin, Hair, and Shade Finder quizzes that match shoppers to a personalized AM/PM routine, allow one-click "Add Full Routine to Bag" with bundle discounts, and sync zero-party skin profile data directly to your email and WhatsApp CRM.',
  },
  {
    id: 'bfaq-2',
    question: 'How do you make our product pages convert better?',
    answer:
      'We structure every product page to answer "Is this right for my skin?" within seconds—featuring clear benefit badges, interactive active-ingredient breakdowns, texture and scent notes, AM/PM layering order, clinical perception stats, and verified reviews filterable by skin type.',
  },
  {
    id: 'bfaq-3',
    question:
      'Can you help us rank for ingredient searches like "niacinamide serum"?',
    answer:
      'Absolutely. Our Beauty SEO & AEO strategy builds dedicated ingredient and skin-concern hubs (e.g., "10% Niacinamide for Oily & Acne-Prone Skin"), adds rich Product and FAQ structured data, and optimizes your store so you rank on both Google Search and AI answer engines.',
  },
  {
    id: 'bfaq-4',
    question: 'Do you set up subscriptions and repeat-purchase reminders?',
    answer:
      'Yes. We configure Subscribe-and-Save recurring orders as well as predictive replenishment flows via WhatsApp and email timed to your bottle size (e.g., Day 28 for a 30ml serum) with a one-tap pre-filled reorder checkout link.',
  },
  {
    id: 'bfaq-5',
    question: 'Can you work with our existing Shopify store?',
    answer:
      'Yes. We can either redesign and speed-optimize your existing Shopify or WooCommerce store—keeping all your products, URLs, reviews, and customer history intact—or build a brand-new flagship store from the ground up.',
  },
  {
    id: 'bfaq-6',
    question: 'Do you build booking websites for salons and spas?',
    answer:
      'Yes. For luxury salons, spas, and dermatology/aesthetic clinics, we build serene service-menu websites with real-time appointment booking, branch locators, local Google Maps SEO, and an integrated online store for aftercare products.',
  },
];

/* Section 10: Brand Types for Glow-Up Audit Form */
const GLOW_AUDIT_BRAND_TYPES = [
  'Skincare',
  'Makeup',
  'Haircare',
  'Clean/Ayurvedic',
  'Salon/Spa',
  'Other',
];

/* ============================================================================
   MAIN SKINCARE & BEAUTY INDUSTRY PAGE COMPONENT
============================================================================ */
const SkincareBeauty: React.FC<{
  onOpenQuoteModal: (service?: string) => void;
}> = ({ onOpenQuoteModal }) => {
  const prefersReducedMotion = useReducedMotion();

  /* Section 1: Hero Mini Bag Toast State */
  const [heroBagAdded, setHeroBagAdded] = useState<boolean>(false);

  /* Section 2: Active Beauty Palette Pan */
  const [activePaletteId, setActivePaletteId] =
    useState<string>('seg-skincare');

  /* Section 3: Interactive Routine Builder Demo State */
  const [selectedSkinType, setSelectedSkinType] =
    useState<SkinTypeOption>('Combination');
  const [selectedConcerns, setSelectedConcerns] = useState<
    SkinConcernOption[]
  >(['Acne', 'Dullness']);
  const [routineTime, setRoutineTime] = useState<'Morning' | 'Night'>(
    'Morning'
  );
  const [concernLimitNotice, setConcernLimitNotice] = useState<string>('');
  const [routineAddedToast, setRoutineAddedToast] = useState<boolean>(false);

  /* Section 5: Bottle Cards Carousel Ref & Active Index */
  const bottleCarouselRef = useRef<HTMLDivElement | null>(null);
  const [activeBottleIndex, setActiveBottleIndex] = useState<number>(0);

  /* Section 6: Repeat Purchase Loop Active Stage */
  const [activeLoopId, setActiveLoopId] = useState<string>('loop-1');

  /* Section 9: Beauty FAQ Accordion State */
  const [openFaqId, setOpenFaqId] = useState<string>('bfaq-1');

  /* Section 10: Free Brand Glow-Up Audit Form State */
  const [glowForm, setGlowForm] = useState({
    name: '',
    email: '',
    phone: '',
    storeUrl: '',
    brandType: 'Skincare',
  });
  const [glowErrors, setGlowErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    storeUrl?: string;
  }>({});
  const [glowSubmitting, setGlowSubmitting] = useState<boolean>(false);
  const [glowSubmitted, setGlowSubmitted] = useState<boolean>(false);

  /* SEO Document Title & Meta Description */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Website, E-commerce & SEO for Skincare and Beauty Brands | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'We design and build high-converting D2C skincare, cosmetics, clean beauty and salon websites—with interactive routine builders, ingredient SEO, AI beauty advisors and repeat-purchase systems.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Section 2: Active Palette Object */
  const activePaletteSegment =
    BEAUTY_PALETTE_SEGMENTS.find((s) => s.id === activePaletteId) ||
    BEAUTY_PALETTE_SEGMENTS[0];

  /* Section 3: Concern Chip Toggle (Max 2 Concerns Rule) */
  const handleToggleConcern = (concern: SkinConcernOption) => {
    setRoutineAddedToast(false);
    if (selectedConcerns.includes(concern)) {
      if (selectedConcerns.length === 1) return; // keep at least 1
      setSelectedConcerns((prev) => prev.filter((c) => c !== concern));
      setConcernLimitNotice('');
      return;
    }
    if (selectedConcerns.length >= 2) {
      // Replace the second concern and announce max-2 rule politely
      setSelectedConcerns((prev) => [prev[0], concern]);
      setConcernLimitNotice(
        `Maximum 2 concerns selected: ${selectedConcerns[0]} & ${concern}.`
      );
      return;
    }
    setSelectedConcerns((prev) => [...prev, concern]);
    setConcernLimitNotice('');
  };

  /* Section 3: Build Recommended 3-Step Routine */
  const primaryConcern: SkinConcernOption = selectedConcerns[0] || 'Dullness';
  const secondaryConcern: SkinConcernOption | undefined = selectedConcerns[1];

  const step1CleanseData = CLEANSER_BY_SKIN_TYPE[selectedSkinType];
  const step2TreatPrimary = TREATMENT_BY_CONCERN[primaryConcern];
  const step2TreatSecondary = secondaryConcern
    ? TREATMENT_BY_CONCERN[secondaryConcern]
    : null;

  const step2Product = {
    stepLabel: 'Step 2 · Treat',
    name: step2TreatPrimary.name,
    ingredientTag: step2TreatSecondary
      ? `${step2TreatPrimary.ingredientTag} · Targets ${primaryConcern} & ${secondaryConcern}`
      : `${step2TreatPrimary.ingredientTag} · Targets ${primaryConcern}`,
    price: step2TreatPrimary.price,
    image: IMG_STEP_TREAT,
  };

  const step3Source =
    routineTime === 'Morning'
      ? STEP3_PROTECT_MORNING[selectedSkinType]
      : STEP3_MOISTURIZE_NIGHT[selectedSkinType];

  const recommendedRoutineSteps: RoutineStepProduct[] = [
    {
      stepLabel: 'Step 1 · Cleanse',
      name: step1CleanseData.name,
      ingredientTag: step1CleanseData.ingredientTag,
      price: step1CleanseData.price,
      image: IMG_STEP_CLEANSE,
    },
    step2Product,
    {
      stepLabel:
        routineTime === 'Morning' ? 'Step 3 · Protect' : 'Step 3 · Moisturize',
      name: step3Source.name,
      ingredientTag: step3Source.ingredientTag,
      price: step3Source.price,
      image: IMG_STEP_MOISTURIZE,
    },
  ];

  const totalRoutinePrice = recommendedRoutineSteps.reduce(
    (sum, item) => sum + item.price,
    0
  );

  /* Section 5: Bottle Carousel Scroll Helpers */
  const scrollBottleCarousel = (dir: 'prev' | 'next') => {
    const nextIdx =
      dir === 'next'
        ? Math.min(BOTTLE_SERVICES.length - 1, activeBottleIndex + 1)
        : Math.max(0, activeBottleIndex - 1);
    setActiveBottleIndex(nextIdx);
    if (bottleCarouselRef.current) {
      const cardWidth = 340;
      bottleCarouselRef.current.scrollTo({
        left: nextIdx * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  /* Section 6: Active Repeat Purchase Loop Stage */
  const activeLoopStage =
    REPEAT_PURCHASE_LOOP.find((st) => st.id === activeLoopId) ||
    REPEAT_PURCHASE_LOOP[0];

  /* Section 10: Glow-Up Audit Form Submit Handler */
  const handleGlowAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      name?: string;
      email?: string;
      phone?: string;
      storeUrl?: string;
    } = {};

    if (!glowForm.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (
      !glowForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(glowForm.email.trim())
    ) {
      errors.email = 'Please enter a valid work email.';
    }
    if (!glowForm.phone.trim() || glowForm.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid phone / WhatsApp number.';
    }
    if (!glowForm.storeUrl.trim()) {
      errors.storeUrl = 'Please enter your store or website URL.';
    }

    setGlowErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setGlowSubmitting(true);
    // TODO: Connect Free Brand Glow-Up Audit form to backend CRM / email service
    setTimeout(() => {
      setGlowSubmitting(false);
      setGlowSubmitted(true);
    }, 600);
  };

  const otherIndustries = industries.filter(
    (ind) => ind.slug !== 'skincare-beauty'
  );

  /* JSON-LD Structured Data (Service, BreadcrumbList, FAQPage) */
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Website, E-commerce & SEO for Skincare and Beauty Brands',
      serviceType:
        'D2C Beauty Store Development, Skin Quiz & Routine Builders, Beauty SEO & Retention Marketing',
      audience: {
        '@type': 'Audience',
        audienceType:
          'skincare, cosmetics and beauty brands, salons and spas',
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
          name: beautyIndustry.name,
          item: 'https://webxcode.com/industries/skincare-beauty',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: BEAUTY_FAQS.map((faq) => ({
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

      {/* Scoped Soft & Luxurious Beauty Keyframes (Strict #0571c2, #1e242e, #ffffff) */}
      <style>{`
        @keyframes beautyBubbleDrift {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes beautyLoopOrbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .beauty-float-slow {
          animation: beautyBubbleDrift 5.5s ease-in-out infinite;
        }
        .beauty-float-medium {
          animation: beautyBubbleDrift 4.4s ease-in-out infinite 0.8s;
        }
        .beauty-float-fast {
          animation: beautyBubbleDrift 3.8s ease-in-out infinite 1.5s;
        }
        .beauty-loop-orbit {
          animation: beautyLoopOrbit 14s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .beauty-float-slow,
          .beauty-float-medium,
          .beauty-float-fast,
          .beauty-loop-orbit {
            animation: none !important;
          }
        }
      `}</style>

      {/* ====================================================================
          1. HERO — SOFT GLOW (white → light blue gradient, 50/50 split)
      ==================================================================== */}
      <section className="relative bg-gradient-to-b from-white via-primary-50/45 to-primary-50/90 text-navy py-16 lg:py-24 overflow-hidden border-b border-primary-100">
        {/* 3 Large Blurred Light-Blue Glow Circles */}
        <div
          aria-hidden="true"
          className="absolute -top-24 right-1/4 w-[480px] h-[480px] rounded-full bg-primary/10 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 -right-20 w-[420px] h-[420px] rounded-full bg-primary/15 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 -left-24 w-[360px] h-[360px] rounded-full bg-primary/8 blur-3xl pointer-events-none"
        />

        {/* Floating Translucent Water-Droplet Bubbles */}
        <div
          aria-hidden="true"
          className="beauty-float-slow absolute top-16 left-[48%] w-12 h-12 rounded-full bg-white/60 border border-primary/20 backdrop-blur-xs shadow-xs pointer-events-none hidden lg:block"
        />
        <div
          aria-hidden="true"
          className="beauty-float-medium absolute bottom-16 left-[44%] w-8 h-8 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-xs pointer-events-none hidden lg:block"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 50% (6 cols) */}
            <div className="lg:col-span-6">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="inline-flex flex-wrap items-center gap-2 text-[13px] font-medium text-navy-70 mb-6"
              >
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
                <Link
                  to="/industries"
                  className="hover:text-primary transition-colors"
                >
                  Industries
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
                <span className="text-navy font-bold" aria-current="page">
                  {beautyIndustry.name}
                </span>
              </nav>

              {/* Pill Label */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>SKINCARE &amp; BEAUTY</span>
                </span>
              </div>

              {/* H1 (navy) */}
              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-navy leading-[1.08] tracking-tight mb-5">
                Beauty Brands Deserve a Website{' '}
                <span className="text-primary">That Glows</span>
              </h1>

              {/* Paragraph (navy 70%) */}
              <p className="text-[16px] sm:text-[18px] text-navy-70 leading-relaxed mb-8 max-w-xl">
                We build beautiful online stores, brand experiences and growth
                systems for skincare and beauty brands — so customers discover
                you, trust you and keep coming back.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#glow-audit"
                  className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Get a Free Brand Glow-Up Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#routine-builder"
                  className="px-7 py-4 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 bg-white/80"
                >
                  <span>Try the Routine Builder</span>
                </a>
              </div>

              {/* Small Trust Row */}
              <div className="pt-6 border-t border-navy-08 flex flex-wrap items-center gap-3 text-[13px] font-bold text-navy-70">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-primary-100">
                  <Droplets className="w-3.5 h-3.5 text-primary" />
                  <span>D2C brands</span>
                </span>
                <span className="text-primary font-extrabold">·</span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-primary-100">
                  <Flower2 className="w-3.5 h-3.5 text-primary" />
                  <span>Clean beauty</span>
                </span>
                <span className="text-primary font-extrabold">·</span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-primary-100">
                  <Scissors className="w-3.5 h-3.5 text-primary" />
                  <span>Salons &amp; spas</span>
                </span>
              </div>
            </div>

            {/* Right 50% (6 cols) — Frosted-Glass Dropper Serum Bottle Product Composition */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-[440px] sm:max-w-[480px] py-6 px-4 flex flex-col items-center">
                {/* Soft Halo Behind Bottle */}
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] h-[310px] rounded-full bg-gradient-to-tr from-primary/20 via-primary-50 to-white border border-white shadow-inner pointer-events-none"
                />

                {/* 3 Floating Ingredient Bubbles Around Bottle */}
                {HERO_INGREDIENT_BUBBLES.map((bub) => (
                  <div
                    key={bub.id}
                    className={`absolute ${bub.posClass} ${bub.delayClass} z-20 px-4 py-2.5 rounded-full bg-white/85 backdrop-blur-md border border-primary/25 shadow-soft flex items-center gap-2.5`}
                  >
                    <span className="w-7 h-7 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      <Droplets className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-[12px] font-extrabold text-navy leading-none">
                        {bub.name}
                      </div>
                      <div className="text-[10px] font-semibold text-primary mt-0.5">
                        {bub.sub}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Floating Review Chip (Top Left/Center) */}
                <div className="beauty-float-medium relative z-20 mb-3 px-4 py-2 rounded-full bg-white/95 border border-primary-100 shadow-md inline-flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((st) => (
                      <Star
                        key={st}
                        className="w-3.5 h-3.5 text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <span className="text-[12px] font-extrabold text-navy">
                    Loved by 10,000+ customers
                  </span>
                  <span className="text-[10px] font-bold text-primary bg-primary-50 px-2 py-0.5 rounded-full">
                    Placeholder
                  </span>
                </div>

                {/* Large Frosted-Glass Dropper Serum Bottle SVG + Label */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Rubber Dropper Bulb */}
                  <div className="w-11 h-12 rounded-t-[22px] bg-gradient-to-b from-white via-primary-50 to-primary/25 border-2 border-primary/30 shadow-sm" />
                  {/* Ribbed Collar Ring */}
                  <div className="w-16 h-6 rounded-md bg-navy text-white border border-primary/40 flex items-center justify-center shadow-md">
                    <span className="font-mono text-[8px] tracking-[0.25em] text-white/80">
                      |||||||
                    </span>
                  </div>
                  {/* Glass Neck */}
                  <div className="w-10 h-4 bg-white/70 border-x-2 border-primary/25" />

                  {/* Frosted Glass Serum Bottle Body */}
                  <div className="relative w-44 sm:w-48 h-64 rounded-t-[44px] rounded-b-[28px] bg-gradient-to-b from-white/95 via-primary-50/85 to-primary/25 border-2 border-white shadow-[0_24px_50px_rgba(5,113,194,0.18)] backdrop-blur-md flex flex-col items-center justify-between p-4 overflow-hidden">
                    {/* Internal Glass Pipette Stem + Droplet */}
                    <div
                      aria-hidden="true"
                      className="w-1.5 h-10 bg-primary/20 rounded-b-full"
                    />

                    {/* Minimalist Luxury Front Bottle Label */}
                    <div className="w-full rounded-[20px] bg-white/95 border border-primary-100 p-4 text-center shadow-xs">
                      <div className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-primary mb-1">
                        WEBXCODE LABS · N° 01
                      </div>
                      <div className="text-[16px] font-extrabold text-navy leading-tight">
                        HYDRA-GLOW CONCENTRATE
                      </div>
                      <div className="w-8 h-0.5 bg-primary/40 mx-auto my-2" />
                      <div className="text-[10px] font-bold text-navy-70">
                        Niacinamide 10% + Hyaluronic
                      </div>
                      <div className="font-mono text-[9px] font-semibold text-navy-50 mt-1.5">
                        30 ML / 1.0 FL. OZ.
                      </div>
                    </div>

                    {/* Liquid Meniscus Glow at Bottle Base */}
                    <div
                      aria-hidden="true"
                      className="w-full h-3 rounded-full bg-primary/20"
                    />
                  </div>

                  {/* Round Pedestal + Soft Reflection Beneath */}
                  <div className="w-60 sm:w-64 h-7 -mt-2 rounded-full bg-gradient-to-r from-primary-50 via-white to-primary-50 border border-primary/25 shadow-[0_18px_36px_rgba(5,113,194,0.22)]" />
                  <div
                    aria-hidden="true"
                    className="w-44 h-6 mt-1 rounded-full bg-primary/10 blur-md"
                  />
                </div>

                {/* Floating Mini "Add to Bag · ₹899" Pill Button */}
                <div className="relative z-20 -mt-3">
                  <button
                    type="button"
                    onClick={() => setHeroBagAdded((v) => !v)}
                    className="px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[13px] shadow-xl inline-flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {heroBagAdded
                        ? 'Added to Bag ✓ · ₹899'
                        : 'Add to Bag · ₹899'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. WHO WE SERVE — BEAUTY PALETTE (white — rounded compact with 8 pans)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHO WE WORK WITH
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              For Every <span className="text-primary">Beauty Business</span>
            </h2>
            <p className="text-[16px] text-navy-70">
              Tap or hover any shade pan in our compact below to explore how we
              craft websites for your beauty category.
            </p>
          </div>

          {/* Large Rounded "Makeup Palette Compact" Container */}
          <div className="rounded-[32px] bg-gradient-to-b from-primary-50/50 via-white to-primary-50/40 border-2 border-primary-100 p-6 sm:p-10 shadow-xl">
            {/* Compact Mirror Top Strip */}
            <div className="flex items-center justify-between pb-5 mb-8 border-b border-primary-100">
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">
                WEBXCODE ATELIER · 8-SHADE DIGITAL COMPACT
              </span>
              <span className="text-[12px] font-bold text-navy-50 hidden sm:inline">
                Select a pan well to inspect
              </span>
            </div>

            {/* 8 Circular "Pan" Wells in 2×4 on Mobile, 4×2 on Desktop */}
            <div
              role="listbox"
              aria-label="Beauty business segments"
              className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7 mb-8"
            >
              {BEAUTY_PALETTE_SEGMENTS.map((pan) => {
                const Icon = pan.icon;
                const isSelected = activePaletteId === pan.id;
                return (
                  <button
                    key={pan.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => setActivePaletteId(pan.id)}
                    onMouseEnter={() => setActivePaletteId(pan.id)}
                    className="group flex flex-col items-center text-center focus:outline-none cursor-pointer"
                  >
                    {/* Circular Pressed Makeup Pan Well */}
                    <div
                      style={{ background: pan.panTintStyle }}
                      className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 border-4 ${
                        isSelected
                          ? 'border-primary scale-95 shadow-[inset_0_6px_16px_rgba(5,113,194,0.28),0_0_24px_rgba(5,113,194,0.22)]'
                          : 'border-white shadow-[inset_0_4px_10px_rgba(30,36,46,0.08),0_8px_20px_rgba(5,113,194,0.08)] group-hover:border-primary/50 group-hover:scale-[0.97]'
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-white text-primary'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider text-navy-50 mt-2">
                        {pan.shadeCode}
                      </span>
                    </div>

                    {/* Pan Name Below */}
                    <h3
                      className={`mt-3 text-[15px] sm:text-[16px] font-extrabold transition-colors ${
                        isSelected
                          ? 'text-primary'
                          : 'text-navy group-hover:text-primary'
                      }`}
                    >
                      {pan.name}
                    </h3>
                  </button>
                );
              })}
            </div>

            {/* Soft Panel Below the Palette Showing 1-Line Description & 2 Solution Chips */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePaletteSegment.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-[24px] bg-white border border-primary-100 p-5 sm:p-7 shadow-soft flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold">
                      {activePaletteSegment.shadeCode}
                    </span>
                    <span className="text-[18px] font-extrabold text-navy">
                      {activePaletteSegment.name}
                    </span>
                  </div>
                  <p className="text-[14px] sm:text-[15px] text-navy-70 font-medium">
                    {activePaletteSegment.description}
                  </p>
                </div>

                {/* 2 Solution Chips */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  {activePaletteSegment.solutions.map((sol) => (
                    <span
                      key={sol}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary text-[13px] font-extrabold"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{sol}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. INTERACTIVE ROUTINE BUILDER DEMO (light blue tint — id="routine-builder")
      ==================================================================== */}
      <section
        id="routine-builder"
        className="bg-primary-50 py-[72px] lg:py-[112px] border-b border-navy-08"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              TRY IT
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              Help Customers Find{' '}
              <span className="text-primary">Their Perfect Routine</span>
            </h2>
            <p className="text-[16px] text-navy-70">
              Personalized routines increase basket size and build loyalty.
              Here&apos;s a demo of what we build for beauty brands.
            </p>
          </div>

          {/* Split Layout: Left Selectors Card + Right Routine "Shelf" */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left (5 cols): White Rounded Selector Card */}
            <div className="lg:col-span-5 bg-white rounded-[28px] p-6 sm:p-8 border border-primary-100 shadow-soft flex flex-col justify-between space-y-6">
              {/* 1. Skin Type Capsule Chips */}
              <div>
                <span className="block text-[13px] font-extrabold uppercase tracking-wider text-navy mb-3">
                  1. Select Skin Type
                </span>
                <div className="flex flex-wrap gap-2">
                  {SKIN_TYPES.map((st) => {
                    const active = selectedSkinType === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setSelectedSkinType(st);
                          setRoutineAddedToast(false);
                        }}
                        className={`px-4 py-2.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                          active
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-primary-50/60 text-navy border border-primary-100 hover:border-primary'
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Main Concerns (Pick up to 2) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-extrabold uppercase tracking-wider text-navy">
                    2. Main Concerns (Pick up to 2)
                  </span>
                  <span className="font-mono text-[11px] font-bold text-primary">
                    {selectedConcerns.length}/2 selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKIN_CONCERNS.map((con) => {
                    const active = selectedConcerns.includes(con);
                    return (
                      <button
                        key={con}
                        type="button"
                        aria-pressed={active}
                        onClick={() => handleToggleConcern(con)}
                        className={`px-4 py-2.5 rounded-full text-[13px] font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                          active
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-primary-50/60 text-navy border border-primary-100 hover:border-primary'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5" />}
                        <span>{con}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Polite Announcement for Max-2 Rule */}
                <div
                  aria-live="polite"
                  className="min-h-[20px] mt-2 text-[12px] font-semibold text-primary"
                >
                  {concernLimitNotice}
                </div>
              </div>

              {/* 3. Routine Time Toggle: Morning ☀ / Night ☾ */}
              <div>
                <span className="block text-[13px] font-extrabold uppercase tracking-wider text-navy mb-3">
                  3. Routine Time
                </span>
                <div className="grid grid-cols-2 gap-3 p-1.5 rounded-full bg-primary-50 border border-primary-100">
                  <button
                    type="button"
                    aria-pressed={routineTime === 'Morning'}
                    onClick={() => {
                      setRoutineTime('Morning');
                      setRoutineAddedToast(false);
                    }}
                    className={`py-3 px-4 rounded-full text-[13px] font-extrabold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      routineTime === 'Morning'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-navy-70 hover:text-navy'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span>Morning</span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={routineTime === 'Night'}
                    onClick={() => {
                      setRoutineTime('Night');
                      setRoutineAddedToast(false);
                    }}
                    className={`py-3 px-4 rounded-full text-[13px] font-extrabold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      routineTime === 'Night'
                        ? 'bg-navy text-white shadow-sm'
                        : 'text-navy-70 hover:text-navy'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    <span>Night</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right (7 cols): The Routine "Shelf" That Builds Itself */}
            <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-8 border border-primary-100 shadow-soft flex flex-col justify-between">
              <div aria-live="polite" className="sr-only">
                Recommended {routineTime} routine for {selectedSkinType} skin
                with {selectedConcerns.join(' and ')}: total ₹
                {totalRoutinePrice.toLocaleString('en-IN')}.
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-navy-08">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary block">
                      PERSONALIZED 3-STEP REGIMEN
                    </span>
                    <h3 className="text-[19px] font-extrabold text-navy">
                      {routineTime} Routine for {selectedSkinType} Skin
                    </h3>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-primary-50 text-primary text-[12px] font-extrabold">
                    Targets: {selectedConcerns.join(' + ')}
                  </span>
                </div>

                {/* 3 Product Cards Appearing in Order */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {recommendedRoutineSteps.map((stepItem, index) => (
                    <motion.div
                      key={`${stepItem.stepLabel}-${stepItem.name}`}
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 14 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: index * 0.08 }}
                      className="rounded-[22px] bg-primary-50/45 border border-primary-100 p-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold uppercase">
                            {stepItem.stepLabel}
                          </span>
                          <span className="font-mono text-[13px] font-extrabold text-navy">
                            ₹{stepItem.price}
                          </span>
                        </div>

                        <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-navy mb-3 border border-white">
                          <img
                            src={stepItem.image}
                            alt={stepItem.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <h4 className="text-[14px] font-extrabold text-navy leading-snug mb-1.5">
                          {stepItem.name}
                        </h4>
                      </div>

                      <div className="pt-2.5 border-t border-primary-100">
                        <span className="inline-block text-[11px] font-bold text-primary leading-tight">
                          ✦ {stepItem.ingredientTag}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Summary Bar Below */}
              <div className="rounded-2xl bg-gradient-to-r from-primary-50 via-white to-primary-50 border-2 border-primary/30 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[12px] font-bold text-navy-70 block">
                    Complete 3-Step Regimen Bundle (Placeholder)
                  </span>
                  <div className="text-[20px] sm:text-[22px] font-extrabold text-navy tabular-nums">
                    Your routine:{' '}
                    <span className="text-primary">
                      ₹{totalRoutinePrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRoutineAddedToast(true)}
                  className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[14px] transition-all inline-flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {routineAddedToast
                      ? 'Routine Added to Bag ✓'
                      : 'Add all to bag →'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Prompt Below */}
          <p className="mt-8 text-center text-[15px] text-navy-70 font-medium">
            Want a routine builder or skin quiz on your store?{' '}
            <a
              href="#glow-audit"
              className="font-extrabold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Get a Free Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </p>
        </div>
      </section>

      {/* ====================================================================
          4. THE BACK LABEL — CHALLENGES & SOLUTIONS (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              THE FORMULA
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              What&apos;s Holding{' '}
              <span className="text-primary">Beauty Brands</span> Back
            </h2>
          </div>

          {/* Tall Rounded Back-of-Bottle Label Panel */}
          <div className="rounded-[32px] border-2 border-navy/20 bg-gradient-to-b from-white via-primary-50/25 to-white p-6 sm:p-10 lg:p-12 shadow-xl">
            {/* Top Apothecary Label Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-8 border-b-2 border-navy/15">
              <div className="font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">
                ACTIVE FORMULATION SHEET // D2C BEAUTY DIAGNOSTIC
              </div>
              <div className="font-mono text-[11px] font-bold text-navy-50">
                NET WT. 100% CONVERSION-FOCUSED
              </div>
            </div>

            {/* Two-Column Label Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 border-b-2 border-navy/15">
              {/* Left Column (5 cols): INGREDIENTS OF A STRUGGLING BRAND */}
              <div className="lg:col-span-5 lg:border-r lg:border-navy/15 lg:pr-8">
                <h3 className="font-mono text-[12px] font-extrabold uppercase tracking-[0.18em] text-navy mb-4 pb-2 border-b border-navy-08">
                  INGREDIENTS OF A STRUGGLING BRAND:
                </h3>

                <p className="text-[15px] sm:text-[16px] leading-[1.9] text-navy-70 font-semibold uppercase tracking-[0.06em]">
                  {BACK_LABEL_DATA.strugglingIngredientsList.map((item, idx) => (
                    <React.Fragment key={item}>
                      <span className="inline-block py-0.5">{item}</span>
                      {idx <
                        BACK_LABEL_DATA.strugglingIngredientsList.length -
                          1 && (
                        <span className="mx-2 text-primary font-extrabold">
                          /
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>

                <div className="mt-6 p-4 rounded-2xl bg-primary-50/60 border border-primary-100 text-[13px] text-navy-70 font-medium">
                  <strong className="text-navy">Warning:</strong> Relying only
                  on paid ads without high-converting product pages or repeat
                  purchase flows erodes D2C margins.
                </div>
              </div>

              {/* Right Column (7 cols): DIRECTIONS FOR GROWTH */}
              <div className="lg:col-span-7">
                <h3 className="font-mono text-[12px] font-extrabold uppercase tracking-[0.18em] text-primary mb-4 pb-2 border-b border-navy-08">
                  DIRECTIONS FOR GROWTH:
                </h3>

                <ol className="space-y-4">
                  {BACK_LABEL_DATA.directionsForGrowth.map((dir, idx) => (
                    <li
                      key={dir}
                      className="flex items-start gap-4 p-3.5 rounded-2xl bg-white border border-primary-100 shadow-2xs"
                    >
                      <span className="w-7 h-7 rounded-full bg-primary text-white font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-[15px] sm:text-[16px] font-extrabold text-navy leading-snug">
                        {dir}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Bottom Strip of the Label: Packaging Symbols + Batch Number */}
            <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {BACK_LABEL_DATA.packagingBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.label}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-primary/30 bg-primary-50/50 text-navy text-[12px] font-bold"
                    >
                      <Icon className="w-3.5 h-3.5 text-primary" />
                      <span>{badge.label}</span>
                    </div>
                  );
                })}
              </div>

              <span className="font-mono text-[11px] font-bold text-navy-50 tracking-wider">
                {BACK_LABEL_DATA.batchNumber}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. SERVICES — BOTTLE CARDS CAROUSEL (navy)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="absolute -left-20 bottom-0 w-[480px] h-[480px] blue-glow pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                WHAT WE BUILD
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight">
                Services That Make{' '}
                <span className="text-primary">Your Brand Shine</span>
              </h2>
            </div>

            {/* Carousel Arrows & Progress Dots */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 mr-2">
                {BOTTLE_SERVICES.map((s, idx) => (
                  <button
                    key={s.code}
                    type="button"
                    aria-label={`Jump to ${s.title}`}
                    onClick={() => {
                      setActiveBottleIndex(idx);
                      bottleCarouselRef.current?.scrollTo({
                        left: idx * 340,
                        behavior: 'smooth',
                      });
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeBottleIndex === idx
                        ? 'w-7 bg-primary'
                        : 'w-2 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Previous service bottle"
                onClick={() => scrollBottleCarousel('prev')}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-primary text-white hover:text-primary flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Next service bottle"
                onClick={() => scrollBottleCarousel('next')}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-primary text-white hover:text-primary flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Snap Carousel of Tall Capsule-Shaped "Bottle" Cards */}
          <div
            ref={bottleCarouselRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6 pt-2"
          >
            {BOTTLE_SERVICES.map((srv, idx) => {
              const Icon = srv.icon;
              const isSelected = activeBottleIndex === idx;
              return (
                <article
                  key={srv.code}
                  onClick={() => setActiveBottleIndex(idx)}
                  onFocus={() => setActiveBottleIndex(idx)}
                  tabIndex={0}
                  className="snap-start shrink-0 w-[300px] sm:w-[325px] flex flex-col items-center focus:outline-none group cursor-pointer"
                >
                  {/* Small Bottle "Cap" Shape at Top */}
                  <div
                    className={`w-20 h-9 rounded-t-2xl border-x-2 border-t-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-primary border-white/40 text-white'
                        : 'bg-white/10 border-white/20 text-primary group-hover:bg-primary group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {/* Bottle Neck Ring */}
                  <div className="w-14 h-2.5 bg-white/20 border-x border-white/25" />

                  {/* Tall Rounded Bottle Shoulder Card Body */}
                  <div
                    className={`w-full flex-1 rounded-t-[44px] rounded-b-[28px] p-6 border-2 backdrop-blur-md transition-all relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white/12 border-primary shadow-[0_18px_40px_rgba(5,113,194,0.32)]'
                        : 'bg-white/6 border-white/15 hover:border-primary/60'
                    }`}
                  >
                    {/* Soft Blue Glow at Bottom Like Light Passing Through a Bottle */}
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-28 rounded-full bg-primary/30 blur-2xl pointer-events-none"
                    />

                    <div className="relative z-10">
                      <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary block mb-2">
                        {srv.code}
                      </span>
                      <h3 className="text-[19px] font-extrabold text-white leading-snug mb-2.5">
                        {srv.title}
                      </h3>
                      <p className="text-[13px] text-white/75 leading-relaxed mb-5">
                        {srv.desc}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {srv.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-[12px] font-semibold text-white/90"
                          >
                            <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {srv.code === 'FORMULA 01' ? (
                      <Link
                        to="/services/ecommerce-development"
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-10 pt-3.5 border-t border-white/15 w-full flex items-center justify-between text-[13px] font-extrabold text-primary hover:text-white transition-colors"
                      >
                        <span>Explore E-commerce Development</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenQuoteModal(srv.title);
                        }}
                        className="relative z-10 pt-3.5 border-t border-white/15 w-full flex items-center justify-between text-[13px] font-extrabold text-primary hover:text-white transition-colors cursor-pointer"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. THE REPEAT PURCHASE LOOP — CIRCULAR RETENTION DIAGRAM (primary-50)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px] border-b border-primary-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              REPEAT CUSTOMERS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-4">
              In Beauty,{' '}
              <span className="text-primary">Repeat Orders</span> Are Everything
            </h2>
            <p className="text-[16px] text-navy-70 leading-relaxed">
              Acquiring the first customer is expensive. We build the automated
              retention loop that turns one-time buyers into loyal subscribers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 7 cols: Circular Loop Diagram with 6 Points Around a Soft Blue Ring */}
            <div className="lg:col-span-7">
              {/* Desktop Circular Ring Layout */}
              <div className="hidden sm:flex relative mx-auto w-[480px] h-[480px] items-center justify-center">
                {/* Outer Soft Glow Ring */}
                <div
                  aria-hidden="true"
                  className="absolute inset-8 rounded-full border-2 border-dashed border-primary/30"
                />
                {/* Main Circular Track */}
                <div
                  aria-hidden="true"
                  className="absolute inset-14 rounded-full border-[3px] border-primary/25 bg-white/55 backdrop-blur-xs shadow-inner"
                />

                {/* Animated Glowing Blue Dot Traveling Around the Ring */}
                {!prefersReducedMotion && (
                  <div
                    aria-hidden="true"
                    className="beauty-loop-orbit absolute inset-14 rounded-full pointer-events-none"
                  >
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_16px_#0571c2] ring-4 ring-white" />
                  </div>
                )}

                {/* Center Hub */}
                <div className="relative z-10 w-44 h-44 rounded-full bg-white border-2 border-primary/30 shadow-soft flex flex-col items-center justify-center text-center p-4">
                  <Repeat className="w-6 h-6 text-primary mb-1.5" />
                  <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary">
                    LTV ENGINE
                  </span>
                  <span className="text-[15px] font-extrabold text-navy leading-tight mt-1">
                    30-Day Refill Cycle
                  </span>
                  <span className="text-[11px] font-semibold text-navy-50 mt-1">
                    Click any stage
                  </span>
                </div>

                {/* 6 Stage Nodes Positioned Around Circle (Angles: -90, -30, 30, 90, 150, 210 deg) */}
                {REPEAT_PURCHASE_LOOP.map((stage, idx) => {
                  const angleDeg = -90 + idx * 60;
                  const angleRad = (angleDeg * Math.PI) / 180;
                  const radius = 184; // px from center of 480x480 box
                  const cx = 240 + Math.cos(angleRad) * radius;
                  const cy = 240 + Math.sin(angleRad) * radius;
                  const isActive = activeLoopId === stage.id;

                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveLoopId(stage.id)}
                      onMouseEnter={() => setActiveLoopId(stage.id)}
                      style={{
                        left: `${cx}px`,
                        top: `${cy}px`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className={`absolute z-20 w-32 rounded-2xl p-2.5 text-center transition-all cursor-pointer border-2 ${
                        isActive
                          ? 'bg-primary text-white border-primary shadow-lg scale-105'
                          : 'bg-white text-navy border-primary-100 hover:border-primary shadow-sm'
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] font-extrabold block ${
                          isActive ? 'text-white/85' : 'text-primary'
                        }`}
                      >
                        STEP {stage.step}
                      </span>
                      <span className="text-[13px] font-extrabold block leading-tight mt-0.5">
                        {stage.title}
                      </span>
                      <span
                        className={`text-[10px] font-semibold block leading-tight mt-0.5 line-clamp-1 ${
                          isActive ? 'text-white/85' : 'text-navy-70'
                        }`}
                      >
                        {stage.shortTag}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile 2x3 Grid Fallback for Circular Loop */}
              <div className="grid grid-cols-2 gap-3 sm:hidden">
                {REPEAT_PURCHASE_LOOP.map((stage) => {
                  const isActive = activeLoopId === stage.id;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveLoopId(stage.id)}
                      className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary text-white border-primary shadow-md'
                          : 'bg-white text-navy border-primary-100'
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] font-extrabold block ${
                          isActive ? 'text-white/80' : 'text-primary'
                        }`}
                      >
                        STEP {stage.step}
                      </span>
                      <span className="text-[15px] font-extrabold block mt-0.5">
                        {stage.title}
                      </span>
                      <span
                        className={`text-[11px] font-medium block mt-1 ${
                          isActive ? 'text-white/85' : 'text-navy-70'
                        }`}
                      >
                        {stage.shortTag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 5 cols: Active Loop Stage Detail Card */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLoopStage.id}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl bg-white border-2 border-primary/25 p-6 sm:p-8 shadow-xl"
                >
                  <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-navy-08">
                    <span className="px-3.5 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase tracking-wider">
                      STAGE {activeLoopStage.step} OF 06 ·{' '}
                      {activeLoopStage.timing}
                    </span>
                    <span className="text-[12px] font-bold text-primary">
                      {activeLoopStage.shortTag}
                    </span>
                  </div>

                  <h3 className="text-[24px] sm:text-[28px] font-extrabold text-navy mb-3">
                    {activeLoopStage.title}
                  </h3>

                  <p className="text-[15px] text-navy-70 leading-relaxed mb-6">
                    {activeLoopStage.whatWeSetUp}
                  </p>

                  <div className="mb-6">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-navy-50 mb-3">
                      WHAT WE CONFIGURE AT THIS STAGE
                    </div>
                    <div className="space-y-2.5">
                      {activeLoopStage.deliverables.map((deliv) => (
                        <div
                          key={deliv}
                          className="flex items-center gap-3 p-3 rounded-xl bg-primary-50/70 border border-primary-100"
                        >
                          <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-[13px] font-bold text-navy">
                            {deliv}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Next Stage Switcher */}
                  <div className="pt-4 border-t border-navy-08 flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-navy-50">
                      Retention flow stage {activeLoopStage.step} / 06
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const currIdx = REPEAT_PURCHASE_LOOP.findIndex(
                          (s) => s.id === activeLoopStage.id
                        );
                        const nextIdx =
                          (currIdx + 1) % REPEAT_PURCHASE_LOOP.length;
                        setActiveLoopId(REPEAT_PURCHASE_LOOP[nextIdx].id);
                      }}
                      className="text-[13px] font-extrabold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next stage in loop</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. CLAIM-SAFE & TRUST-FIRST — CLEAN BEAUTY STRIP (white)
      ==================================================================== */}
      <section className="bg-white py-14 lg:py-20 border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-primary-50/60 via-white to-primary-50/60 border border-primary-100 p-6 sm:p-10 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-primary-100">
              {CLAIM_SAFE_POINTS.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className={`${
                      idx > 0 ? 'pt-6 md:pt-0 md:pl-8' : ''
                    } flex items-start gap-4`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-extrabold text-navy mb-1.5">
                        {point.title}
                      </h3>
                      <p className="text-[14px] text-navy-70 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. CASE STUDY — FORMULA RESULTS CARD (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              FORMULA RESULTS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Clinical-Grade <span className="text-primary">Growth</span> for a
              Clean Skincare Brand
            </h2>
          </div>

          <div className="rounded-[32px] border-2 border-primary-100 bg-white shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left Half: Tall Lifestyle Flat-Lay Image of Skincare Bottles */}
            <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full bg-primary-50 overflow-hidden">
              <img
                src={IMG_FLATLAY_PHOTO}
                alt="Clean skincare D2C store flat-lay product photography"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent" />

              {/* Top Lab Sticker */}
              <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-navy font-mono text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                LAB REPORT · CASE STUDY
              </div>

              {/* Bottom Caption Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-[12px] font-extrabold shadow-md mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{FORMULA_CASE_STUDY.captionBadge}</span>
                </span>
                <div className="text-[22px] font-extrabold text-white">
                  {FORMULA_CASE_STUDY.brandName}{' '}
                  <span className="text-[12px] font-normal text-white/75">
                    (Placeholder)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Half: Active Ingredients Concentration List + Quote */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 mb-6 border-b-2 border-navy">
                  <span className="font-mono text-[12px] font-extrabold uppercase tracking-[0.18em] text-navy">
                    ACTIVE GROWTH CONCENTRATIONS
                  </span>
                  <span className="font-mono text-[11px] font-bold text-primary">
                    VERIFIED 8-MONTH OUTCOME
                  </span>
                </div>

                {/* Concentration Bars */}
                <div className="space-y-4 mb-8">
                  {FORMULA_CASE_STUDY.concentrations.map((row) => (
                    <div
                      key={row.label}
                      className="p-3.5 rounded-2xl bg-primary-50/50 border border-primary-100"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                        <span className="text-[14px] sm:text-[15px] font-extrabold text-navy">
                          {row.label}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[20px] sm:text-[22px] font-extrabold text-primary tabular-nums">
                            {row.value}
                          </span>
                          <span className="text-[11px] font-semibold text-navy-50">
                            ({row.sub})
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white overflow-hidden border border-primary-100">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${row.barWidth}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Quote + Button */}
              <div className="pt-6 border-t border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-start gap-3.5 max-w-md">
                  <img
                    src={IMG_AVATAR_CLIENT}
                    alt={FORMULA_CASE_STUDY.clientName}
                    loading="lazy"
                    className="w-11 h-11 rounded-full object-cover border-2 border-primary shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-[13px] text-navy-70 italic leading-relaxed mb-1.5">
                      &ldquo;{FORMULA_CASE_STUDY.quote}&rdquo;
                    </p>
                    <div className="text-[12px] font-extrabold text-navy">
                      {FORMULA_CASE_STUDY.clientName} ·{' '}
                      <span className="font-semibold text-navy-50">
                        {FORMULA_CASE_STUDY.clientRole}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="#glow-audit"
                  className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[13px] transition-all inline-flex items-center justify-center gap-2 shrink-0 shadow-md"
                >
                  <span>Want results like this? Get a Free Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. FAQ — BEAUTY Q&A SPLIT (primary-50)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px] border-b border-primary-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left 40% (5 cols): Sticky Heading + Soft Rounded Callout Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
                BEAUTY BRAND FAQ
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-navy leading-[1.14] tracking-tight mb-4">
                Questions From{' '}
                <span className="text-primary">Beauty Founders</span>
              </h2>
              <p className="text-[15px] text-navy-70 leading-relaxed mb-8">
                Everything you need to know about launching or upgrading a
                skincare, cosmetics, clean beauty or salon website.
              </p>

              {/* Soft Rounded Callout Card */}
              <div className="rounded-3xl bg-white border-2 border-primary/25 p-6 sm:p-7 shadow-soft">
                <div className="w-11 h-11 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-[20px] font-extrabold text-navy mb-2">
                  Launching a new product line?
                </h3>
                <p className="text-[14px] text-navy-70 leading-relaxed mb-5">
                  Whether you are formulating your first 3 hero SKUs or scaling
                  an established D2C beauty brand, we will map out your ideal
                  store architecture.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onOpenQuoteModal('Skincare & Beauty Store Consultation')
                  }
                  className="px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[13px] transition-all inline-flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Talk to Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 60% (7 cols): 6 Pill-Rounded Accordion Cards */}
            <div className="lg:col-span-7 space-y-3.5">
              {BEAUTY_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-[24px] bg-white border-2 transition-all overflow-hidden ${
                      isOpen
                        ? 'border-primary shadow-md'
                        : 'border-primary-100 hover:border-primary/50'
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
          10. FINAL CTA — FREE BRAND GLOW-UP AUDIT (id="glow-audit")
      ==================================================================== */}
      <section
        id="glow-audit"
        className="py-[72px] lg:py-[112px] bg-gradient-to-b from-white to-primary-50 border-b border-primary-100 scroll-mt-20"
      >
        <div className="max-w-[820px] mx-auto px-4 sm:px-6">
          {/* Large Rounded White Card with Soft Blue Glow Border */}
          <div className="rounded-[32px] bg-white border-2 border-primary/30 shadow-[0_24px_60px_rgba(5,113,194,0.14)] p-6 sm:p-10 lg:p-12">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-extrabold uppercase tracking-[0.12em] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FREE BRAND GLOW-UP AUDIT</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
                Ready to Give Your Brand Website a{' '}
                <span className="text-primary">Glow-Up?</span>
              </h2>
              <p className="text-[15px] sm:text-[16px] text-navy-70 leading-relaxed">
                Get a free audit of your beauty store — design, product pages,
                speed, SEO and repeat-purchase flow.
              </p>
            </div>

            {glowSubmitted ? (
              <div className="rounded-2xl bg-primary-50 border-2 border-primary p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-[22px] font-extrabold text-navy mb-2">
                  Your Brand Glow-Up Audit Is Booked!
                </h3>
                <p className="text-[14px] text-navy-70 max-w-md mx-auto mb-6">
                  We have received the details for{' '}
                  <strong className="text-navy">{glowForm.storeUrl}</strong> (
                  {glowForm.brandType}). Our beauty e-commerce specialists will
                  send your personalized teardown within 48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setGlowSubmitted(false);
                    setGlowForm({
                      name: '',
                      email: '',
                      phone: '',
                      storeUrl: '',
                      brandType: 'Skincare',
                    });
                  }}
                  className="px-6 py-2.5 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white text-[13px] font-extrabold transition-colors cursor-pointer"
                >
                  Submit Another Brand URL
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleGlowAuditSubmit}
                noValidate
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="glow-name"
                      className="block text-[12px] font-extrabold uppercase tracking-wider text-navy mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="glow-name"
                      type="text"
                      value={glowForm.name}
                      onChange={(e) =>
                        setGlowForm({ ...glowForm, name: e.target.value })
                      }
                      placeholder="e.g., Aanya Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 focus:border-primary focus:outline-none text-[14px] text-navy"
                    />
                    {glowErrors.name && (
                      <p className="mt-1 text-[12px] font-semibold text-primary flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{glowErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="glow-email"
                      className="block text-[12px] font-extrabold uppercase tracking-wider text-navy mb-1.5"
                    >
                      Work Email *
                    </label>
                    <input
                      id="glow-email"
                      type="email"
                      value={glowForm.email}
                      onChange={(e) =>
                        setGlowForm({ ...glowForm, email: e.target.value })
                      }
                      placeholder="aanya@yourbeautybrand.com"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 focus:border-primary focus:outline-none text-[14px] text-navy"
                    />
                    {glowErrors.email && (
                      <p className="mt-1 text-[12px] font-semibold text-primary flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{glowErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone / WhatsApp */}
                  <div>
                    <label
                      htmlFor="glow-phone"
                      className="block text-[12px] font-extrabold uppercase tracking-wider text-navy mb-1.5"
                    >
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="glow-phone"
                      type="tel"
                      value={glowForm.phone}
                      onChange={(e) =>
                        setGlowForm({ ...glowForm, phone: e.target.value })
                      }
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 focus:border-primary focus:outline-none text-[14px] text-navy"
                    />
                    {glowErrors.phone && (
                      <p className="mt-1 text-[12px] font-semibold text-primary flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{glowErrors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Brand / Website URL */}
                  <div>
                    <label
                      htmlFor="glow-url"
                      className="block text-[12px] font-extrabold uppercase tracking-wider text-navy mb-1.5"
                    >
                      Brand / Website URL *
                    </label>
                    <input
                      id="glow-url"
                      type="text"
                      value={glowForm.storeUrl}
                      onChange={(e) =>
                        setGlowForm({ ...glowForm, storeUrl: e.target.value })
                      }
                      placeholder="https://yourbeautybrand.com"
                      className="w-full px-4 py-3 rounded-xl border border-navy/15 focus:border-primary focus:outline-none text-[14px] text-navy"
                    />
                    {glowErrors.storeUrl && (
                      <p className="mt-1 text-[12px] font-semibold text-primary flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{glowErrors.storeUrl}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Brand Type Chips */}
                <div>
                  <span className="block text-[12px] font-extrabold uppercase tracking-wider text-navy mb-2">
                    Brand Type
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {GLOW_AUDIT_BRAND_TYPES.map((bType) => {
                      const active = glowForm.brandType === bType;
                      return (
                        <button
                          key={bType}
                          type="button"
                          onClick={() =>
                            setGlowForm({ ...glowForm, brandType: bType })
                          }
                          className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                            active
                              ? 'bg-primary text-white shadow-xs'
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
                  disabled={glowSubmitting}
                  className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-60"
                >
                  {glowSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Preparing Your Glow-Up Audit...</span>
                    </>
                  ) : (
                    <>
                      <span>Get My Free Glow-Up Audit</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[12px] font-semibold text-navy-50">
                  Free · Delivered within 48 hours · No obligation
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. EXPLORE OTHER INDUSTRIES — COMPACT FOOTER BAR (white)
      ==================================================================== */}
      <section className="bg-white py-12 border-t border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-primary block">
                INDUSTRY DIRECTORY
              </span>
              <h2 className="text-[20px] font-extrabold text-navy">
                Explore Other Industries We Serve
              </h2>
            </div>
            <Link
              to="/industries"
              className="text-[13px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>View all 12 industries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {otherIndustries.map((ind) => (
              <Link
                key={ind.slug}
                to={
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
                className="shrink-0 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-navy-08 bg-white hover:border-primary hover:bg-primary-50 text-[13px] font-bold text-navy transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                  <IndustryIcon
                    name={ind.iconName}
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

export default SkincareBeauty;


