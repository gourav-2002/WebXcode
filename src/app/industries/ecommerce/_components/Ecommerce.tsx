'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  X,
  ShoppingBag,
  ShoppingCart,
  Star,
  Tag,
  Sparkles,
  Shirt,
  Cpu,
  Home as HomeIcon,
  Coffee,
  Boxes,
  Store,
  Zap,
  ShieldCheck,
  Lock,
  Truck,
  Globe,
  CreditCard,
  Search,
  Bot,
  MessageSquare,
  Layers,
  Wrench,
  TrendingUp,
  RotateCcw,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle2,
  Loader2,
  MapPin,
  Receipt,
  Smartphone,
  PackageCheck,
} from 'lucide-react';
import { industries, IndustryIcon } from '@/app/industries/_components/Industries';

const IMG_PRODUCT_LUXURY =
  '/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const IMG_STORE_SHOWCASE =
  '/images/hero_laptop_ui_showcase_1791104898778.jpg';
const IMG_AVATAR_FOUNDER =
  '/images/testimonial_2_avatar_1791105060710.jpg';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT E-COMMERCE ITEM FROM INDUSTRIES
============================================================================ */
const ecommerceIndustry =
  industries.find((item) => item.slug === 'ecommerce') || industries[4];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS
============================================================================ */

/* Section 1: Hero Live Order Notification Toasts */
const HERO_ORDER_TOASTS = [
  {
    id: 'ord-1',
    title: 'New order · ₹2,499 · Pune',
    sub: 'Paid via One-Tap UPI · Express Dispatch',
    badge: 'JUST NOW',
  },
  {
    id: 'ord-2',
    title: 'New order · $89 · Austin',
    sub: 'International Checkout · Stripe Multi-Currency',
    badge: '12s AGO',
  },
  {
    id: 'ord-3',
    title: 'Cart recovered via WhatsApp · ₹4,150',
    sub: 'Automated 15-min Abandoned Cart Flow',
    badge: 'RECOVERED',
  },
  {
    id: 'ord-4',
    title: 'New order · ₹3,890 · Bengaluru',
    sub: 'Prepaid Discount Applied · Zero RTO Risk',
    badge: '28s AGO',
  },
];

/* Section 2: Store Types — Product Shelf (2 Shelves x 4 Product Boxes) */
export interface StoreShelfItem {
  id: string;
  shelf: 1 | 2;
  name: string;
  priceTag: string;
  heightClass: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  skuCode: string;
}

const STORE_SHELF_ITEMS: StoreShelfItem[] = [
  // Shelf 1
  {
    id: 'st-d2c',
    shelf: 1,
    name: 'D2C Brands',
    priceTag: 'Brand-first',
    heightClass: 'min-h-[235px]',
    description:
      'High-converting flagship stores built for storytelling, bundles, subscriptions and repeat AOV.',
    icon: Sparkles,
    skuCode: 'BOX-01',
  },
  {
    id: 'st-fashion',
    shelf: 1,
    name: 'Fashion & Apparel',
    priceTag: 'Lookbooks',
    heightClass: 'min-h-[255px]',
    description:
      'Fast size/color swatches, fit-finder guides, shop-the-look reels and instant exchange portals.',
    icon: Shirt,
    skuCode: 'BOX-02',
  },
  {
    id: 'st-beauty',
    shelf: 1,
    name: 'Beauty & Personal Care',
    priceTag: 'High repeat',
    heightClass: 'min-h-[225px]',
    description:
      'Skin/hair quiz funnels, ingredient spotlights, regimen builders and auto-replenish checkouts.',
    icon: ShoppingBag,
    skuCode: 'BOX-03',
  },
  {
    id: 'st-electronics',
    shelf: 1,
    name: 'Electronics & Gadgets',
    priceTag: 'Spec-rich',
    heightClass: 'min-h-[250px]',
    description:
      'Side-by-side model comparison tables, warranty registration, EMI calculators and accessory upsells.',
    icon: Cpu,
    skuCode: 'BOX-04',
  },
  // Shelf 2
  {
    id: 'st-home',
    shelf: 2,
    name: 'Home & Kitchen',
    priceTag: 'Visual sets',
    heightClass: 'min-h-[245px]',
    description:
      'Room-by-room inspiration galleries, pincode delivery estimators and high-ticket bundle discounts.',
    icon: HomeIcon,
    skuCode: 'BOX-05',
  },
  {
    id: 'st-food',
    shelf: 2,
    name: 'Food & Gourmet',
    priceTag: 'Fresh packs',
    heightClass: 'min-h-[225px]',
    description:
      'Build-your-own combo boxes, nutrition badges, hyperlocal slot delivery and subscription packs.',
    icon: Coffee,
    skuCode: 'BOX-06',
  },
  {
    id: 'st-b2b',
    shelf: 2,
    name: 'B2B / Wholesale',
    priceTag: 'Bulk orders',
    heightClass: 'min-h-[255px]',
    description:
      'Tiered volume pricing, MOQ rules, GST invoice billing, credit terms and quick-order SKU tables.',
    icon: Boxes,
    skuCode: 'BOX-07',
  },
  {
    id: 'st-marketplace',
    shelf: 2,
    name: 'Marketplace Sellers Going D2C',
    priceTag: 'Own buyers',
    heightClass: 'min-h-[240px]',
    description:
      'Move from Amazon/Flipkart commission traps to owning your customer data, margins and brand.',
    icon: Store,
    skuCode: 'BOX-08',
  },
];

/* Section 3: Revenue Leak Calculator Defaults */
const CALCULATOR_DEFAULTS = {
  visitors: 50000,
  conversionRate: 1.2,
  aovInr: 1500,
  aovUsd: 65,
  liftPercent: 25 as 10 | 25 | 50,
};

/* Section 4: Platform Finder Quiz Questions & Results */
export type PlatformKey = 'shopify' | 'woocommerce' | 'custom';

export interface QuizQuestion {
  id: string;
  stepNumber: number;
  question: string;
  options: {
    id: string;
    label: string;
    sub: string;
    scores: Record<PlatformKey, number>;
  }[];
}

const PLATFORM_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    stepNumber: 1,
    question: 'How many products do you sell?',
    options: [
      {
        id: 'q1-a',
        label: 'Under 100',
        sub: 'Curated D2C line or hero products',
        scores: { shopify: 3, woocommerce: 2, custom: 1 },
      },
      {
        id: 'q1-b',
        label: '100–1,000',
        sub: 'Growing multi-category catalog',
        scores: { shopify: 3, woocommerce: 3, custom: 2 },
      },
      {
        id: 'q1-c',
        label: '1,000+',
        sub: 'Large catalog, complex variants or B2B rules',
        scores: { shopify: 2, woocommerce: 2, custom: 4 },
      },
    ],
  },
  {
    id: 'q2',
    stepNumber: 2,
    question: 'What matters most?',
    options: [
      {
        id: 'q2-a',
        label: 'Launch fast',
        sub: 'Rock-solid hosting, app ecosystem & quick go-live',
        scores: { shopify: 4, woocommerce: 1, custom: 0 },
      },
      {
        id: 'q2-b',
        label: 'Full control & low running cost',
        sub: 'Own the code & database without monthly platform fees',
        scores: { shopify: 0, woocommerce: 4, custom: 2 },
      },
      {
        id: 'q2-c',
        label: 'Unique features & performance',
        sub: 'Sub-second headless speed & custom checkout logic',
        scores: { shopify: 1, woocommerce: 1, custom: 4 },
      },
    ],
  },
  {
    id: 'q3',
    stepNumber: 3,
    question: 'Monthly budget for apps/hosting?',
    options: [
      {
        id: 'q3-a',
        label: 'Low',
        sub: 'Keep recurring monthly software fees minimal',
        scores: { shopify: 1, woocommerce: 4, custom: 1 },
      },
      {
        id: 'q3-b',
        label: 'Medium',
        sub: 'Happy to pay for reliable managed SaaS tools',
        scores: { shopify: 4, woocommerce: 2, custom: 2 },
      },
      {
        id: 'q3-c',
        label: 'Flexible',
        sub: 'Focused on maximum ROI, scale & custom engineering',
        scores: { shopify: 3, woocommerce: 1, custom: 4 },
      },
    ],
  },
];

const PLATFORM_RESULTS: Record<
  PlatformKey,
  {
    name: string;
    badge: string;
    tagline: string;
    whyFits: string[];
    watchOut: string[];
  }
> = {
  shopify: {
    name: 'Shopify / Shopify Plus',
    badge: 'MOST POPULAR FOR D2C',
    tagline:
      'Built for fast-growing D2C brands that want reliability, 99.99% uptime and high-converting checkouts.',
    whyFits: [
      'Fastest time-to-market with zero server maintenance',
      'Best-in-class checkout conversion & native D2C app ecosystem',
      'Handles flash sales and traffic spikes effortlessly',
    ],
    watchOut: [
      'Monthly subscription + third-party app costs can add up as you scale',
      'Checkout customization is restricted unless on Shopify Plus',
    ],
  },
  woocommerce: {
    name: 'WooCommerce (WordPress)',
    badge: 'BEST FOR CONTROL & SEO',
    tagline:
      'Ideal for brands that want 100% ownership of their code, content-led SEO power and lower monthly software fees.',
    whyFits: [
      'Full control over design, checkout fields and database',
      'No platform transaction fees and lower recurring app costs',
      'Unmatched blog & content SEO capabilities built right in',
    ],
    watchOut: [
      'Requires managed cloud hosting and regular plugin security updates',
      'Needs expert speed optimization to stay fast at high SKU counts',
    ],
  },
  custom: {
    name: 'Custom / Headless Commerce',
    badge: 'BUILT FOR SCALE & SPEED',
    tagline:
      'Engineered with Next.js / React + Shopify Headless, Medusa or custom APIs for sub-second speed and bespoke workflows.',
    whyFits: [
      'Instant page transitions and 95+ Core Web Vitals scores',
      'Unlimited customization for B2B pricing, configurators or multi-vendor logic',
      'Complete freedom across web, mobile app and omnichannel touchpoints',
    ],
    watchOut: [
      'Higher initial engineering investment and longer build timeline',
    ],
  },
};

const PLATFORM_MINI_COMPARISON = [
  {
    platform: 'Shopify',
    speedToLaunch: 5,
    flexibility: 4,
    runningCost: 3,
  },
  {
    platform: 'WooCommerce',
    speedToLaunch: 4,
    flexibility: 5,
    runningCost: 5,
  },
  {
    platform: 'Custom / Headless',
    speedToLaunch: 3,
    flexibility: 5,
    runningCost: 4,
  },
];

/* Section 5: Services — The Order Receipt (9 Line Items, No Social Media Marketing) */
export interface ReceiptServiceItem {
  id: string;
  code: string;
  name: string;
  tag: 'INCLUDED' | 'CORE' | 'GROWTH' | 'ADD-ON';
  description: string;
  bullets: string[];
}

const RECEIPT_LINE_ITEMS: ReceiptServiceItem[] = [
  {
    id: 'rc-01',
    code: '01',
    name: 'Store Design & Development (Shopify · WooCommerce · Custom)',
    tag: 'INCLUDED',
    description:
      'Custom-designed, mobile-first online storefronts engineered to showcase your products and convert cold traffic into loyal customers.',
    bullets: [
      'Bespoke theme design tailored to your brand identity',
      'High-converting product pages with sticky Add-to-Cart & bundles',
      'Seamless migration from existing platforms with zero data loss',
    ],
  },
  {
    id: 'rc-02',
    code: '02',
    name: 'Speed & Core Web Vitals Optimization',
    tag: 'INCLUDED',
    description:
      'Every extra second of load time costs up to 10% in lost sales. We strip out bloat so your store loads in under 2 seconds on 4G mobile.',
    bullets: [
      'App & script cleanup, image WebP/AVIF compression & lazy loading',
      'LCP, INP and CLS tuning for green Core Web Vitals',
      'Instant predictive page prefetching on collection & product links',
    ],
  },
  {
    id: 'rc-03',
    code: '03',
    name: 'Conversion Rate Optimization (product pages, cart, checkout)',
    tag: 'CORE',
    description:
      'Data-backed UX improvements across your entire buying funnel to lift conversion rate and Average Order Value (AOV).',
    bullets: [
      'Slide-out cart drawer with free-shipping progress bar & in-cart upsells',
      'One-page frictionless checkout with pincode & address autofill',
      'Trust badges, delivery date estimators & review photo galleries',
    ],
  },
  {
    id: 'rc-04',
    code: '04',
    name: 'E-commerce SEO (category, product and collection pages)',
    tag: 'GROWTH',
    description:
      'Capture high-intent shoppers searching for your product categories on Google without paying for every click.',
    bullets: [
      'Collection & category page keyword architecture that ranks',
      'Product schema (price, stock, star ratings) for rich Google snippets',
      'Technical SEO fixes for faceted filters, canonicals & crawl budget',
    ],
  },
  {
    id: 'rc-05',
    code: '05',
    name: 'Performance Marketing (Google Shopping · Performance Max · Search)',
    tag: 'GROWTH',
    description:
      'Profit-focused Google Shopping and Search campaigns engineered around ROAS, MER and new customer acquisition.',
    bullets: [
      'Optimized Google Merchant Center product feeds with custom labels',
      'Performance Max & High-Intent Search campaigns by margin tier',
      'Server-side conversion tracking (GA4 + Enhanced Conversions)',
    ],
  },
  {
    id: 'rc-06',
    code: '06',
    name: 'AI Shopping Assistant & Product Recommendations',
    tag: 'ADD-ON',
    description:
      '24/7 AI store concierge that helps shoppers pick the right size, shade or model and recommends higher-margin bundles.',
    bullets: [
      'Trained on your catalog, sizing charts, return policy & live order status',
      'Personalized "Frequently Bought Together" & post-purchase upsells',
      'Answers pre-purchase questions instantly to prevent bounce',
    ],
  },
  {
    id: 'rc-07',
    code: '07',
    name: 'Cart Recovery Automation (WhatsApp & Email)',
    tag: 'GROWTH',
    description:
      'Bring back 15–25% of shoppers who abandon their cart using automated, personalized WhatsApp and email sequences.',
    bullets: [
      'Instant WhatsApp cart reminder with one-tap pre-filled checkout link',
      '3-step Klaviyo / email recovery flow with dynamic product cards',
      'Automated COD-to-Prepaid incentive messages to cut RTO',
    ],
  },
  {
    id: 'rc-08',
    code: '08',
    name: 'Integrations (payments, shipping, inventory, ERP)',
    tag: 'INCLUDED',
    description:
      'Connect your storefront with your payment gateways, courier aggregators, warehouse WMS and accounting systems.',
    bullets: [
      'Razorpay, Cashfree, Stripe, PayPal & One-Tap UPI integration',
      'Shiprocket, Delhivery, Blue Dart & automated AWB tracking pages',
      'Two-way inventory sync with Zoho, Unicommerce, Tally or Odoo',
    ],
  },
  {
    id: 'rc-09',
    code: '09',
    name: 'Store Maintenance & Support',
    tag: 'ADD-ON',
    description:
      'Ongoing engineering support, festival sale readiness, security monitoring and continuous CRO testing.',
    bullets: [
      'Dedicated SLA support for flash sales & festive traffic surges',
      'Monthly speed audits, app updates & broken-link monitoring',
      'Continuous A/B testing on landing pages and offer banners',
    ],
  },
];

/* Section 6: Checkout Makeover Steps */
const TYPICAL_CHECKOUT_STEPS = [
  {
    step: 1,
    name: 'Cart Page',
    dropOff: '18% leave at surprise shipping fees',
  },
  {
    step: 2,
    name: 'Forced Account Login',
    dropOff: '24% drop off at password creation',
  },
  {
    step: 3,
    name: 'Long Address Form',
    dropOff: '14% abandon typing 10 manual fields',
  },
  {
    step: 4,
    name: 'Shipping Method',
    dropOff: '11% leave due to unclear delivery date',
  },
  {
    step: 5,
    name: 'Payment Gateway Redirect',
    dropOff: '9% fail on slow gateway reload',
  },
  {
    step: 6,
    name: 'Order Review',
    dropOff: '6% abandon before final confirmation',
  },
];

const CHECKOUT_BENEFIT_CHIPS = [
  'Guest checkout',
  'Address & pincode autofill',
  'One-tap UPI / wallets',
  'Trust badges at payment',
];

/* Section 7: Built for India & Global — Toggle Bento Data */
const INDIA_PAYMENT_CHIPS = ['UPI', 'Cards', 'Net Banking', 'Wallets', 'COD'];
const INDIA_SHIPPING_PARTNERS = ['Shiprocket', 'Delhivery', 'Blue Dart'];

const GLOBAL_PAYMENT_CHIPS = [
  'Stripe',
  'PayPal',
  'Shop Pay',
  'Apple Pay',
  'Google Pay',
];
const GLOBAL_CURRENCIES: Record<
  'INR' | 'USD' | 'EUR' | 'GBP',
  { symbol: string; code: string; price: string; shipping: string }
> = {
  INR: {
    symbol: '₹',
    code: 'INR',
    price: '₹2,499',
    shipping: 'Free Express Shipping across India',
  },
  USD: {
    symbol: '$',
    code: 'USD',
    price: '$34.00',
    shipping: 'Free DHL Express over $75 (US & Canada)',
  },
  EUR: {
    symbol: '€',
    code: 'EUR',
    price: '€31.50',
    shipping: 'DDP Duties Included · EU Delivery in 4 Days',
  },
  GBP: {
    symbol: '£',
    code: 'GBP',
    price: '£27.00',
    shipping: 'UK Tracked Courier · VAT Inclusive',
  },
};

/* Section 8: Case Study — Order Confirmation Style */
const ORDER_CASE_STUDY = {
  orderNumber: 'Order #WX-CS-01',
  brandTag: 'Lumière Botanicals (D2C Beauty Brand · Placeholder)',
  timeline: '6 months',
  itemsDelivered: [
    {
      name: 'Shopify redesign',
      sub: 'Custom mobile-first storefront with shade finder & regimen bundles',
      qty: '1x Storefront',
    },
    {
      name: 'Speed optimization',
      sub: 'App bloat removal, liquid code refactoring & image compression',
      qty: '1.6s Load',
    },
    {
      name: 'CRO',
      sub: 'Slide-out cart drawer with free-gift tier bar & 1-page UPI checkout',
      qty: '+136% CR',
    },
    {
      name: 'Google Shopping',
      sub: 'Merchant Center feed optimization & segmented Performance Max',
      qty: '4.2x ROAS',
    },
    {
      name: 'WhatsApp cart recovery',
      sub: 'Automated 15-min & 4-hour abandoned checkout flows with 1-tap link',
      qty: '24/7 Flow',
    },
  ],
  summaryMetrics: [
    {
      label: 'Conversion rate',
      value: '1.1% → 2.6%',
      note: 'Placeholder',
    },
    {
      label: 'Revenue',
      value: '+2.4x',
      note: 'Placeholder',
    },
    {
      label: 'Cart recovery',
      value: '+18% recovered',
      note: 'Placeholder',
    },
    {
      label: 'Page load',
      value: '4.8s → 1.6s',
      note: 'Placeholder',
    },
  ],
  quote:
    'WebXCode rebuilt our store like a conversion machine. Our mobile checkout drop-offs vanished overnight, and WhatsApp cart recovery now pays for our entire tech stack every single week.',
  clientName: 'Ananya Verma (Placeholder)',
  clientRole: 'Co-Founder, D2C Skincare & Beauty Brand',
};

/* Section 9: Integrations — App Drawer Categories & Tiles */
export type IntegrationCategory =
  | 'Payments'
  | 'Shipping'
  | 'Marketing & CRM'
  | 'Inventory & ERP'
  | 'AI & Support';

const INTEGRATIONS_DRAWER: Record<
  IntegrationCategory,
  { name: string; role: string;monogram: string }[]
> = {
  Payments: [
    { name: 'Razorpay', role: 'UPI, Cards, Magic Checkout', monogram: 'RZ' },
    { name: 'Cashfree', role: 'Instant Settlements & COD', monogram: 'CF' },
    { name: 'PayU', role: 'Enterprise Payment Gateway', monogram: 'PU' },
    { name: 'Stripe', role: '135+ Global Currencies', monogram: 'ST' },
    { name: 'PayPal', role: 'International Buyer Trust', monogram: 'PP' },
  ],
  Shipping: [
    { name: 'Shiprocket', role: '25,000+ Pincodes & NDR Flow', monogram: 'SR' },
    { name: 'Delhivery', role: 'Pan-India Express Logistics', monogram: 'DL' },
    { name: 'Blue Dart', role: 'Priority Air & Surface', monogram: 'BD' },
    { name: 'ShipStation', role: 'Global Multi-Carrier Fulfilment', monogram: 'SS' },
  ],
  'Marketing & CRM': [
    { name: 'Klaviyo', role: 'E-commerce Email & Flows', monogram: 'KL' },
    { name: 'Google Merchant Center', role: 'Shopping Feed Sync', monogram: 'GM' },
    { name: 'Google Analytics 4', role: 'Enhanced E-com Tracking', monogram: 'G4' },
    { name: 'HubSpot', role: 'Customer Lifecycle CRM', monogram: 'HS' },
    { name: 'WATI / WhatsApp API', role: 'Cart Recovery & COD Verify', monogram: 'WA' },
  ],
  'Inventory & ERP': [
    { name: 'Zoho Inventory', role: 'Multi-Warehouse Stock Sync', monogram: 'ZH' },
    { name: 'Unicommerce', role: 'Omnichannel Order Management', monogram: 'UC' },
    { name: 'Tally', role: 'Automated GST Voucher Sync', monogram: 'TL' },
    { name: 'Odoo', role: 'Full Retail & Manufacturing ERP', monogram: 'OD' },
  ],
  'AI & Support': [
    { name: 'OpenAI', role: 'Smart Search & AI Concierge', monogram: 'OA' },
    { name: 'Anthropic Claude', role: 'Catalog & Support Reasoning', monogram: 'CL' },
    { name: 'Freshdesk', role: 'Order Ticket Helpdesk', monogram: 'FD' },
    { name: 'Zendesk', role: 'Omnichannel CX Suite', monogram: 'ZD' },
  ],
};

/* Section 10: E-commerce FAQ (#01 to #06) */
const ECOMMERCE_FAQS = [
  {
    tag: '#01',
    question: 'Can you migrate my store without losing SEO and data?',
    answer:
      'Yes. Whether you are moving from WooCommerce to Shopify, Magento to Shopify Plus, or launching a custom headless store, we migrate 100% of your products, customer accounts, order history, reviews, and URLs with 301 redirects so your Google rankings and organic traffic remain protected.',
  },
  {
    tag: '#02',
    question: 'Shopify or WooCommerce — which is better for my business?',
    answer:
      'Shopify is best if you want fast launch speed, zero server maintenance, and rock-solid checkout reliability for D2C scaling. WooCommerce is ideal if you want complete code ownership, zero platform transaction fees, complex custom checkout rules, or heavy content SEO. You can also take our 3-question Platform Finder quiz above to get an instant recommendation.',
  },
  {
    tag: '#03',
    question: 'How do you reduce cart abandonment?',
    answer:
      'We tackle cart abandonment on two fronts: first, we fix checkout friction with a slide-out cart drawer, guest checkout, pincode autofill, transparent shipping dates, and one-tap UPI/wallet payments. Second, we deploy automated WhatsApp and email recovery flows that bring back 15–25% of abandoned carts within hours.',
  },
  {
    tag: '#04',
    question: 'Can you help reduce COD returns (RTO)?',
    answer:
      'Yes. For Indian D2C brands, we implement automated WhatsApp COD order confirmation, small prepaid incentives (e.g., "Save ₹100 extra on UPI"), pincode-level RTO risk flagging, and automated NDR (Non-Delivery Report) buyer follow-ups via Shiprocket/Delhivery integrations.',
  },
  {
    tag: '#05',
    question: 'Do you also run Google Shopping and Performance Max ads?',
    answer:
      'Yes. We structure and optimize your Google Merchant Center feed (titles, GTINs, custom margin labels), set up server-side GA4 & Enhanced Conversions tracking, and manage profitable Google Shopping, Performance Max, and High-Intent Search campaigns.',
  },
  {
    tag: '#06',
    question: 'How long does it take to build or redesign a store?',
    answer:
      'A high-converting Shopify or WooCommerce store typically takes 3 to 5 weeks from design wireframes to go-live. Larger custom or headless e-commerce builds with ERP integrations take 6 to 10 weeks.',
  },
];

/* Section 11: Free Store Audit — Checkout-Style CTA Data */
const AUDIT_PLATFORMS = ['Shopify', 'WooCommerce', 'Custom', 'Other'];
const AUDIT_ORDER_VOLUMES = ['<100', '100–1,000', '1,000+'];
const AUDIT_ORDER_SUMMARY_ITEMS = [
  { name: 'Store Speed Audit', price: '₹0' },
  { name: 'Conversion & Checkout Review', price: '₹0' },
  { name: 'SEO Health Check', price: '₹0' },
  { name: 'Ads & Tracking Check', price: '₹0' },
];

/* ============================================================================
   NUMBER FORMATTING HELPERS (INDIAN ₹ & USD $)
============================================================================ */
function formatStoreCurrency(amount: number, currency: 'INR' | 'USD'): string {
  const rounded = Math.round(amount);
  if (currency === 'INR') {
    return `₹${rounded.toLocaleString('en-IN')}`;
  }
  return `$${rounded.toLocaleString('en-US')}`;
}

/* ============================================================================
   MAIN E-COMMERCE INDUSTRY PAGE COMPONENT
============================================================================ */
const Ecommerce: React.FC<{
  onOpenQuoteModal?: (service?: string) => void;
}> = ({ onOpenQuoteModal: propOpenQuoteModal }) => {
  const quoteModalCtx = useQuoteModal();
  const onOpenQuoteModal = (service?: string) => {
    if (propOpenQuoteModal) propOpenQuoteModal(service);
    else quoteModalCtx.openQuoteModal(service);
  };
  const prefersReducedMotion = useReducedMotion();

  /* Section 1: Hero Live Store Feed State */
  const [heroCartCount, setHeroCartCount] = useState<number>(3);
  const [heroCartBump, setHeroCartBump] = useState<boolean>(false);
  const [heroBtnPressed, setHeroBtnPressed] = useState<boolean>(false);
  const [heroSalesTicker, setHeroSalesTicker] = useState<number>(124560);
  const [visibleToastIndices, setVisibleToastIndices] = useState<number[]>([
    0, 1, 2,
  ]);

  /* Section 2: Active / Hovered Product Shelf Box */
  const [activeShelfBoxId, setActiveShelfBoxId] = useState<string>('st-d2c');

  /* Section 3: Revenue Leak Calculator State */
  const [calcCurrency, setCalcCurrency] = useState<'INR' | 'USD'>('INR');
  const [calcVisitors, setCalcVisitors] = useState<number>(
    CALCULATOR_DEFAULTS.visitors
  );
  const [calcConvRate, setCalcConvRate] = useState<number>(
    CALCULATOR_DEFAULTS.conversionRate
  );
  const [calcAovInr, setCalcAovInr] = useState<number>(
    CALCULATOR_DEFAULTS.aovInr
  );
  const [calcAovUsd, setCalcAovUsd] = useState<number>(
    CALCULATOR_DEFAULTS.aovUsd
  );
  const [calcLift, setCalcLift] = useState<10 | 25 | 50>(
    CALCULATOR_DEFAULTS.liftPercent
  );

  /* Section 4: Platform Finder Quiz State */
  const [quizStep, setQuizStep] = useState<number>(0); // 0, 1, 2 for Q1-Q3; 3 for Result
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({
    q1: 'q1-b',
    q2: 'q2-a',
    q3: 'q3-b',
  });

  /* Section 5: Order Receipt Expanded Rows */
  const [expandedReceiptIds, setExpandedReceiptIds] = useState<string[]>([
    'rc-01',
    'rc-03',
  ]);

  /* Section 6: Checkout Makeover Step Counter (1 to 6) */
  const [typicalCheckoutStep, setTypicalCheckoutStep] = useState<number>(4);

  /* Section 7: Built for India & Global Toggle + Interactive Mini-Widgets */
  const [marketMode, setMarketMode] = useState<'india' | 'global'>('india');
  const [pincodeInput, setPincodeInput] = useState<string>('400001');
  const [pincodeResult, setPincodeResult] = useState<{
    city: string;
    day: string;
    cod: string;
  }>({
    city: 'Mumbai Metro',
    day: 'Tomorrow, 11 AM',
    cod: 'COD & Instant UPI available',
  });
  const [globalSampleCurrency, setGlobalSampleCurrency] = useState<
    'INR' | 'USD' | 'EUR' | 'GBP'
  >('USD');

  /* Section 9: Integrations App Drawer Active Category */
  const [activeIntegrationTab, setActiveIntegrationTab] =
    useState<IntegrationCategory>('Payments');

  /* Section 10: FAQ Accordion State */
  const [openFaqTag, setOpenFaqTag] = useState<string>('#01');

  /* Section 11: Free Store Audit — Checkout-Style CTA State */
  const [auditForm, setAuditForm] = useState({
    name: '',
    email: '',
    phone: '',
    storeUrl: '',
    platform: 'Shopify',
    monthlyOrders: '100–1,000',
  });
  const [auditErrors, setAuditErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    storeUrl?: string;
  }>({});
  const [auditSubmitting, setAuditSubmitting] = useState<boolean>(false);
  const [auditPlaced, setAuditPlaced] = useState<boolean>(false);

  /* Document Title & Meta Description */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'E-commerce Website Development, SEO & Growth | Shopify & WooCommerce Experts | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'We design, build and grow high-converting Shopify, WooCommerce and custom headless online stores—faster pages, 1-page checkouts, CRO, Google Shopping and WhatsApp cart recovery.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Section 1: Hero Auto-Press Add-to-Cart, Revenue Ticker & Sliding Order Toasts */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const cartInterval = setInterval(() => {
      setHeroBtnPressed(true);
      setTimeout(() => {
        setHeroBtnPressed(false);
        setHeroCartBump(true);
        setHeroCartCount((c) => (c >= 19 ? 3 : c + 1));
        setHeroSalesTicker((s) => s + 2499);
      }, 380);
      setTimeout(() => {
        setHeroCartBump(false);
      }, 900);
    }, 3800);

    const toastInterval = setInterval(() => {
      setVisibleToastIndices((prev) => {
        const nextFirst = (prev[0] + 1) % HERO_ORDER_TOASTS.length;
        return [
          nextFirst,
          (nextFirst + 1) % HERO_ORDER_TOASTS.length,
          (nextFirst + 2) % HERO_ORDER_TOASTS.length,
        ];
      });
    }, 4200);

    return () => {
      clearInterval(cartInterval);
      clearInterval(toastInterval);
    };
  }, [prefersReducedMotion]);

  /* Section 6: Typical 6-Step Checkout Auto-Loop */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const stepTimer = setInterval(() => {
      setTypicalCheckoutStep((prev) => (prev % 6) + 1);
    }, 2200);
    return () => clearInterval(stepTimer);
  }, [prefersReducedMotion]);

  /* Section 3: Revenue Leak Calculator Math
     revenue = visitors × (conversion rate / 100) × AOV
     potential uses conversion rate × (1 + lift)
  */
  const activeAov = calcCurrency === 'INR' ? calcAovInr : calcAovUsd;
  const currentMonthlyRevenue =
    calcVisitors * (calcConvRate / 100) * activeAov;
  const liftedConvRate = calcConvRate * (1 + calcLift / 100);
  const potentialMonthlyRevenue =
    calcVisitors * (liftedConvRate / 100) * activeAov;
  const extraMonthlyRevenue = Math.max(
    0,
    potentialMonthlyRevenue - currentMonthlyRevenue
  );
  const extraYearlyRevenue = extraMonthlyRevenue * 12;

  const currentBarHeightPercent = Math.min(
    100,
    Math.max(
      28,
      Math.round(
        (currentMonthlyRevenue / Math.max(1, potentialMonthlyRevenue)) * 100
      )
    )
  );

  /* Section 4: Platform Quiz Scoring Calculation */
  const calculateRecommendedPlatform = (): PlatformKey => {
    const totals: Record<PlatformKey, number> = {
      shopify: 0,
      woocommerce: 0,
      custom: 0,
    };

    PLATFORM_QUIZ_QUESTIONS.forEach((q) => {
      const chosenId = quizAnswers[q.id];
      const matchedOpt =
        q.options.find((o) => o.id === chosenId) || q.options[0];
      totals.shopify += matchedOpt.scores.shopify;
      totals.woocommerce += matchedOpt.scores.woocommerce;
      totals.custom += matchedOpt.scores.custom;
    });

    if (
      totals.custom >= totals.shopify &&
      totals.custom >= totals.woocommerce
    ) {
      return 'custom';
    }
    if (totals.woocommerce > totals.shopify) {
      return 'woocommerce';
    }
    return 'shopify';
  };

  const recommendedPlatformKey = calculateRecommendedPlatform();
  const recommendedPlatform = PLATFORM_RESULTS[recommendedPlatformKey];

  const handleSelectQuizOption = (questionId: string, optionId: string) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setTimeout(() => {
      setQuizStep((prev) => Math.min(3, prev + 1));
    }, 180);
  };

  /* Section 5: Toggle Receipt Row */
  const toggleReceiptItem = (id: string) => {
    setExpandedReceiptIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  /* Section 7: Pincode Checker Handler */
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = pincodeInput.replace(/\D/g, '').slice(0, 6);
    if (cleaned.length !== 6) {
      setPincodeResult({
        city: 'Enter valid 6-digit pincode',
        day: 'e.g. 400001, 110001, 560001',
        cod: 'Please check digits',
      });
      return;
    }
    const firstDigit = cleaned[0];
    const regionMap: Record<string, { city: string; day: string }> = {
      '1': { city: 'Delhi NCR / North Hub', day: 'Tomorrow by 2 PM' },
      '2': { city: 'UP / Northern Zone', day: 'In 2 Days (Express Air)' },
      '3': { city: 'Ahmedabad / Jaipur West', day: 'Tomorrow by 6 PM' },
      '4': { city: 'Mumbai / Pune Hub', day: 'Tomorrow by 11 AM' },
      '5': { city: 'Bengaluru / Hyderabad Hub', day: 'Tomorrow by 4 PM' },
      '6': { city: 'Chennai / Kochi South', day: 'In 2 Days (Blue Dart Air)' },
      '7': { city: 'Kolkata / East Hub', day: 'In 2 Days (Delhivery)' },
      '8': { city: 'Eastern Zone', day: 'In 3 Days (Tracked)' },
    };
    const match = regionMap[firstDigit] || {
      city: `Pincode ${cleaned}`,
      day: 'In 2–3 Working Days',
    };
    setPincodeResult({
      city: match.city,
      day: `Delivery ${match.day}`,
      cod: 'COD & One-Tap UPI available',
    });
  };

  /* Section 11: Checkout-Style Store Audit Submit Handler */
  const handleStoreAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      name?: string;
      email?: string;
      phone?: string;
      storeUrl?: string;
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
    if (!auditForm.storeUrl.trim()) {
      errors.storeUrl = 'Please enter your store URL or brand name.';
    }

    setAuditErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setAuditSubmitting(true);
    // TODO: Connect free store audit order form to backend endpoint / CRM
    setTimeout(() => {
      setAuditSubmitting(false);
      setAuditPlaced(true);
    }, 650);
  };

  const otherIndustries = industries.filter((ind) => ind.slug !== 'ecommerce');

  /* JSON-LD Structured Data (Service, BreadcrumbList, FAQPage) */
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'E-commerce Website Development, SEO & Growth',
      serviceType: 'E-commerce development and marketing',
      audience: {
        '@type': 'Audience',
        audienceType: 'online stores and D2C brands',
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
          name: ecommerceIndustry.name,
          item: 'https://webxcode.com/industries/ecommerce',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ECOMMERCE_FAQS.map((faq) => ({
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

      {/* Scoped Retail & Receipt Styles (Strict #0571c2, #1e242e, #ffffff) */}
      <style>{`
        .ecom-receipt-zigzag-top {
          background-image: linear-gradient(135deg, #ffffff 50%, transparent 50%),
            linear-gradient(225deg, #ffffff 50%, transparent 50%);
          background-position: bottom left;
          background-size: 20px 20px;
          background-repeat: repeat-x;
        }
        .ecom-receipt-zigzag-bottom {
          background-image: linear-gradient(45deg, transparent 50%, #ffffff 50%),
            linear-gradient(315deg, transparent 50%, #ffffff 50%);
          background-position: top left;
          background-size: 20px 20px;
          background-repeat: repeat-x;
        }
        @keyframes ecomFlyItem {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          60% { transform: translate(110px, -170px) scale(0.65); opacity: 0.95; }
          100% { transform: translate(155px, -210px) scale(0.2); opacity: 0; }
        }
        .ecom-flying-dot {
          animation: ecomFlyItem 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .ecom-flying-dot {
            animation: none !important;
            display: none !important;
          }
        }
      `}</style>

      {/* ====================================================================
          1. HERO — LIVE STORE FEED (navy — 50/50 split)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
        <div className="absolute -right-24 top-1/4 w-[600px] h-[600px] blue-glow-strong pointer-events-none" />
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
                  {ecommerceIndustry.name}
                </span>
              </nav>

              {/* Pill Label on dark */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em]">
                  <ShoppingBag className="w-3.5 h-3.5 text-primary" />
                  <span>E-COMMERCE</span>
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold leading-[1.08] tracking-tight mb-5">
                Online Stores That{' '}
                <span className="text-primary">Sell More, Every Day</span>
              </h1>

              {/* Paragraph */}
              <p className="text-[16px] sm:text-[18px] text-white/75 leading-relaxed mb-8 max-w-xl">
                We design, build and grow Shopify, WooCommerce and custom online
                stores — faster pages, smoother checkouts and smarter marketing
                that turn browsers into buyers.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#store-audit"
                  className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Get a Free Store Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#revenue-calculator"
                  className="px-7 py-4 rounded-full border border-white/25 hover:border-white hover:bg-white/10 text-white font-bold text-[15px] transition-all inline-flex items-center gap-2"
                >
                  <span>Calculate Lost Revenue</span>
                </a>
              </div>

              {/* Platform Logos Row (White Monochrome) */}
              <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-3 sm:gap-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
                  Platforms:
                </span>
                {[
                  { label: 'Shopify', tag: 'Plus & D2C' },
                  { label: 'WooCommerce', tag: 'Full Ownership' },
                  { label: 'Custom / Headless', tag: 'Next.js · API' },
                ].map((plat) => (
                  <div
                    key={plat.label}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-[13px] font-bold"
                  >
                    <Store className="w-3.5 h-3.5 text-primary" />
                    <span>{plat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 50% (6 cols) — "Live Store" Composition */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-[540px]">
                {/* Top Bar: Glass Revenue Ticker + Live Cart Icon with Bumping Blue Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  {/* Glass Revenue Ticker */}
                  <div className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-2.5 shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[12px] font-semibold text-white/80">
                      Today&apos;s sales
                    </span>
                    <span className="font-mono text-[15px] font-extrabold text-white tabular-nums">
                      ₹{heroSalesTicker.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                      Placeholder
                    </span>
                  </div>

                  {/* Cart Icon with Bumping Blue Badge */}
                  <div
                    className={`relative px-4 py-2.5 rounded-2xl bg-white text-navy font-bold text-[13px] flex items-center gap-2 shadow-lg transition-transform duration-300 ${
                      heroCartBump ? 'scale-110 ring-4 ring-primary/40' : 'scale-100'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    <span>Cart</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary text-white font-mono text-[12px] font-extrabold tabular-nums">
                      {heroCartCount}
                    </span>
                  </div>
                </div>

                {/* Main Live Store Grid: Product Card + Order Notification Toasts */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                  {/* White Product Card (7 cols) */}
                  <div className="sm:col-span-7 bg-white text-navy rounded-[20px] p-4 shadow-2xl border border-white/20 relative">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy mb-3.5">
                      <Image
                        src={IMG_PRODUCT_LUXURY}
                        alt="Flagship D2C Vitamin C Serum product card"
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                        BESTSELLER
                      </span>
                      <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-navy/85 text-white text-[11px] font-mono font-bold">
                        1.4s Load
                      </span>
                    </div>

                    {/* Rating in Blue Stars */}
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((st) => (
                        <Star
                          key={st}
                          className="w-3.5 h-3.5 text-primary fill-primary"
                        />
                      ))}
                      <span className="text-[11px] font-bold text-navy-50 ml-1">
                        4.9 (1,420 reviews)
                      </span>
                    </div>

                    <h2 className="text-[16px] font-extrabold text-navy leading-snug mb-1">
                      Botanical Glow Serum · 30ml
                    </h2>

                    <div className="flex items-baseline gap-2 mb-3.5">
                      <span className="text-[20px] font-extrabold text-primary tabular-nums">
                        ₹2,499
                      </span>
                      <span className="text-[12px] text-navy-50 line-through">
                        ₹3,299
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary text-[10px] font-extrabold">
                        SAVE 24%
                      </span>
                    </div>

                    {/* Auto-Pressing Add to Cart Button + Flying Item Dot */}
                    <div className="relative">
                      {heroCartBump && !prefersReducedMotion && (
                        <span
                          aria-hidden="true"
                          className="ecom-flying-dot pointer-events-none absolute left-1/2 top-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-extrabold shadow-lg z-30"
                        >
                          +1
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setHeroCartCount((c) => c + 1);
                          setHeroSalesTicker((s) => s + 2499);
                        }}
                        className={`w-full py-3 px-4 rounded-full font-bold text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          heroBtnPressed
                            ? 'bg-navy text-white scale-95'
                            : 'bg-primary hover:bg-primary-dark text-white shadow-md'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>
                          {heroBtnPressed ? 'Adding to Cart…' : 'Add to Cart'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Stack of Live Order Notification Toasts (5 cols — 3 visible on desktop, 1 on mobile) */}
                  <div
                    aria-hidden="true"
                    className="sm:col-span-5 flex flex-col gap-3"
                  >
                    {visibleToastIndices.map((toastIdx, idx) => {
                      const toast = HERO_ORDER_TOASTS[toastIdx];
                      return (
                        <motion.div
                          key={`${toast.id}-${idx}`}
                          initial={
                            prefersReducedMotion ? false : { opacity: 0, x: 24 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.06 }}
                          className={`${
                            idx > 0 ? 'hidden sm:block' : 'block'
                          } rounded-2xl bg-white text-navy p-3.5 shadow-xl border-l-4 border-primary`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[10px] font-extrabold">
                              {toast.badge}
                            </span>
                            <span className="text-[10px] font-bold text-navy-50">
                               Placeholder
                            </span>
                          </div>
                          <div className="text-[13px] font-extrabold text-navy leading-snug">
                            {toast.title}
                          </div>
                          <div className="text-[11px] text-navy-70 font-medium mt-0.5">
                            {toast.sub}
                          </div>
                        </motion.div>
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
          2. STORE TYPES — PRODUCT SHELF (white — 2-row retail shelf)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHO WE BUILD FOR
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              Every Kind of <span className="text-primary">Online Store</span>
            </h2>
            <p className="text-[16px] text-navy-70">
              Hover or tap any package on the shelf below to see how we tailor
              your storefront to your category.
            </p>
          </div>

          {/* 2 Retail Shelves */}
          <div className="space-y-14">
            {([1, 2] as const).map((shelfNum) => {
              const shelfItems = STORE_SHELF_ITEMS.filter(
                (item) => item.shelf === shelfNum
              );
              return (
                <div key={shelfNum} className="relative">
                  {/* Shelf Label */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                      AISLE 0{shelfNum} {'//'}{' '}
                      {shelfNum === 1
                        ? 'D2C & CONSUMER BRANDS'
                        : 'SPECIALTY, WHOLESALE & MARKETPLACE'}
                    </span>
                    <span className="text-[11px] font-semibold text-navy-50 sm:hidden">
                      Swipe shelf →
                    </span>
                  </div>

                  {/* Product Boxes Standing on the Shelf (4 per shelf, variable packaging heights) */}
                  <div className="flex lg:grid lg:grid-cols-4 gap-5 overflow-x-auto no-scrollbar pt-4 pb-1 px-1 items-end">
                    {shelfItems.map((box) => {
                      const Icon = box.icon;
                      const isActive = activeShelfBoxId === box.id;
                      return (
                        <div
                          key={box.id}
                          onMouseEnter={() => setActiveShelfBoxId(box.id)}
                          onClick={() => setActiveShelfBoxId(box.id)}
                          tabIndex={0}
                          onFocus={() => setActiveShelfBoxId(box.id)}
                          className={`group relative w-[270px] sm:w-[290px] lg:w-auto shrink-0 ${box.heightClass} rounded-t-[20px] rounded-b-[6px] p-6 border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none ${
                            isActive
                              ? 'bg-white border-primary shadow-2xl -translate-y-2.5'
                              : 'bg-primary-50/35 border-navy-15 hover:bg-white hover:border-primary hover:-translate-y-2 hover:shadow-xl'
                          }`}
                        >
                          {/* Top Packaging Barcode & SKU Strip */}
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-4">
                              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-sm">
                                <Icon className="w-6 h-6" />
                              </div>

                              {/* Hanging Price-Tag Style Label from the Corner */}
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy text-white text-[11px] font-extrabold shadow-xs">
                                <Tag className="w-3 h-3 text-primary" />
                                <span>{box.priceTag}</span>
                              </div>
                            </div>

                            <div className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                              {box.skuCode}
                            </div>

                            <h3 className="text-[19px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug mb-2">
                              {box.name}
                            </h3>
                          </div>

                          {/* Description revealed / highlighted on hover or active */}
                          <p
                            className={`text-[13px] leading-relaxed transition-opacity duration-200 ${
                              isActive
                                ? 'text-navy font-medium opacity-100'
                                : 'text-navy-70 opacity-85 group-hover:opacity-100'
                            }`}
                          >
                            {box.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Thin Navy Retail Shelf Plank + Soft Drop Shadow Beneath */}
                  <div
                    aria-hidden="true"
                    className="h-3.5 w-full rounded-full bg-navy shadow-[0_14px_28px_rgba(30,36,46,0.22)] border-t border-primary/40"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. REVENUE LEAK CALCULATOR (light blue tint — id="revenue-calculator")
      ==================================================================== */}
      <section
        id="revenue-calculator"
        className="bg-primary-50 py-[72px] lg:py-[112px] border-b border-navy-08"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                FIND THE LEAKS
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                How Much Revenue Is Your Store{' '}
                <span className="text-primary">Leaving Behind?</span>
              </h2>
            </div>

            {/* Currency Toggle ₹ / $ */}
            <div className="inline-flex items-center bg-white p-1.5 rounded-full border border-navy-15 shadow-2xs self-start">
              <button
                type="button"
                onClick={() => setCalcCurrency('INR')}
                aria-pressed={calcCurrency === 'INR'}
                className={`px-4 py-2 rounded-full text-[13px] font-extrabold transition-all cursor-pointer ${
                  calcCurrency === 'INR'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-navy-70 hover:text-navy'
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setCalcCurrency('USD')}
                aria-pressed={calcCurrency === 'USD'}
                className={`px-4 py-2 rounded-full text-[13px] font-extrabold transition-all cursor-pointer ${
                  calcCurrency === 'USD'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-navy-70 hover:text-navy'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left (White Card) — 4 Inputs with Blue Sliders + Editable Values */}
            <div className="lg:col-span-6 bg-white rounded-[24px] p-6 sm:p-8 border border-navy-15 shadow-soft flex flex-col justify-between space-y-6">
              {/* Input 1: Monthly Visitors */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="calc-visitors"
                    className="text-[14px] font-extrabold text-navy"
                  >
                    1. Monthly store visitors
                  </label>
                  <input
                    id="calc-visitors"
                    type="number"
                    min={1000}
                    max={500000}
                    step={1000}
                    value={calcVisitors}
                    onChange={(e) =>
                      setCalcVisitors(
                        Math.min(500000, Math.max(1000, Number(e.target.value) || 1000))
                      )
                    }
                    className="w-32 px-3 py-1.5 rounded-xl border border-navy-15 font-mono text-[14px] font-extrabold text-primary text-right"
                  />
                </div>
                <input
                  type="range"
                  aria-label="Monthly store visitors"
                  aria-valuemin={1000}
                  aria-valuemax={500000}
                  aria-valuenow={calcVisitors}
                  min={1000}
                  max={500000}
                  step={1000}
                  value={calcVisitors}
                  onChange={(e) => setCalcVisitors(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-navy-50 mt-1">
                  <span>1,000</span>
                  <span>2,50,000</span>
                  <span>5,00,000</span>
                </div>
              </div>

              {/* Input 2: Current Conversion Rate % */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="calc-conv"
                    className="text-[14px] font-extrabold text-navy"
                  >
                    2. Current conversion rate (%)
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      id="calc-conv"
                      type="number"
                      min={0.2}
                      max={5}
                      step={0.1}
                      value={calcConvRate}
                      onChange={(e) =>
                        setCalcConvRate(
                          Math.min(5, Math.max(0.2, Number(e.target.value) || 0.2))
                        )
                      }
                      className="w-24 px-3 py-1.5 rounded-xl border border-navy-15 font-mono text-[14px] font-extrabold text-primary text-right"
                    />
                    <span className="font-mono text-[14px] font-bold text-navy">
                      %
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  aria-label="Current conversion rate percentage"
                  aria-valuemin={0.2}
                  aria-valuemax={5}
                  aria-valuenow={calcConvRate}
                  min={0.2}
                  max={5}
                  step={0.1}
                  value={calcConvRate}
                  onChange={(e) => setCalcConvRate(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-navy-50 mt-1">
                  <span>0.2%</span>
                  <span>2.5%</span>
                  <span>5.0%</span>
                </div>
              </div>

              {/* Input 3: Average Order Value (AOV) */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="calc-aov"
                    className="text-[14px] font-extrabold text-navy"
                  >
                    3. Average order value ({calcCurrency === 'INR' ? '₹' : '$'})
                  </label>
                  <input
                    id="calc-aov"
                    type="number"
                    min={calcCurrency === 'INR' ? 300 : 15}
                    max={calcCurrency === 'INR' ? 20000 : 1000}
                    step={calcCurrency === 'INR' ? 100 : 5}
                    value={activeAov}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      if (calcCurrency === 'INR') {
                        setCalcAovInr(Math.min(20000, Math.max(300, val)));
                      } else {
                        setCalcAovUsd(Math.min(1000, Math.max(15, val)));
                      }
                    }}
                    className="w-32 px-3 py-1.5 rounded-xl border border-navy-15 font-mono text-[14px] font-extrabold text-primary text-right"
                  />
                </div>
                <input
                  type="range"
                  aria-label="Average order value"
                  aria-valuemin={calcCurrency === 'INR' ? 300 : 15}
                  aria-valuemax={calcCurrency === 'INR' ? 20000 : 1000}
                  aria-valuenow={activeAov}
                  min={calcCurrency === 'INR' ? 300 : 15}
                  max={calcCurrency === 'INR' ? 20000 : 1000}
                  step={calcCurrency === 'INR' ? 100 : 5}
                  value={activeAov}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (calcCurrency === 'INR') setCalcAovInr(val);
                    else setCalcAovUsd(val);
                  }}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-navy-50 mt-1">
                  <span>{calcCurrency === 'INR' ? '₹300' : '$15'}</span>
                  <span>{calcCurrency === 'INR' ? '₹10,000' : '$500'}</span>
                  <span>{calcCurrency === 'INR' ? '₹20,000' : '$1,000'}</span>
                </div>
              </div>

              {/* Input 4: Expected Conversion Lift Chips */}
              <div>
                <span className="block text-[14px] font-extrabold text-navy mb-2.5">
                  4. Expected conversion lift with optimization
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {([10, 25, 50] as const).map((lift) => {
                    const active = calcLift === lift;
                    return (
                      <button
                        key={lift}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setCalcLift(lift)}
                        className={`py-3 px-4 rounded-xl font-mono text-[14px] font-extrabold border-2 transition-all cursor-pointer ${
                          active
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-primary-50/50 text-navy border-navy-15 hover:border-primary'
                        }`}
                      >
                        +{lift}% Lift
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right (Navy Card with Blue Glow) — "Now vs Potential" Bar Comparison */}
            <div className="lg:col-span-6 bg-navy text-white rounded-[24px] p-6 sm:p-8 border border-primary/40 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -right-16 -top-16 w-72 h-72 blue-glow-strong pointer-events-none" />

              {/* Screen Reader Accessible Summary */}
              <div aria-live="polite" className="sr-only">
                Current monthly revenue is{' '}
                {formatStoreCurrency(currentMonthlyRevenue, calcCurrency)}.
                Potential monthly revenue with a {calcLift}% conversion lift is{' '}
                {formatStoreCurrency(potentialMonthlyRevenue, calcCurrency)},
                giving an extra{' '}
                {formatStoreCurrency(extraMonthlyRevenue, calcCurrency)} per
                month.
              </div>

              {/* Two Vertical Animated Bars Side by Side */}
              <div>
                <div className="flex items-center justify-between text-[12px] font-mono text-white/70 mb-6">
                  <span>REVENUE PROJECTION MODEL</span>
                  <span className="text-primary font-bold">
                    CR: {calcConvRate.toFixed(1)}% → {liftedConvRate.toFixed(2)}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 items-end h-[220px] pt-8 px-4 sm:px-8 border-b border-white/15">
                  {/* Bar 1: Current Monthly Revenue (Light Blue Tint) */}
                  <div className="flex flex-col items-center h-full justify-end">
                    <span className="font-mono text-[14px] sm:text-[16px] font-extrabold text-white/90 mb-2 tabular-nums">
                      {formatStoreCurrency(currentMonthlyRevenue, calcCurrency)}
                    </span>
                    <div
                      style={{ height: `${currentBarHeightPercent}%` }}
                      className="w-full max-w-[110px] rounded-t-2xl bg-primary/35 border-2 border-primary/60 transition-all duration-300"
                    />
                  </div>

                  {/* Bar 2: Potential Monthly Revenue (Solid Blue) */}
                  <div className="flex flex-col items-center h-full justify-end">
                    <span className="font-mono text-[15px] sm:text-[18px] font-extrabold text-primary mb-2 tabular-nums">
                      {formatStoreCurrency(potentialMonthlyRevenue, calcCurrency)}
                    </span>
                    <div
                      style={{ height: '100%' }}
                      className="w-full max-w-[110px] rounded-t-2xl bg-primary shadow-[0_0_30px_rgba(5,113,194,0.55)] border-2 border-white/30 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-center pt-3 mb-8">
                  <span className="text-[12px] font-bold text-white/75">
                    Current monthly revenue
                  </span>
                  <span className="text-[12px] font-bold text-primary">
                    Potential monthly revenue
                  </span>
                </div>
              </div>

              {/* Big Highlight Callout */}
              <div className="rounded-2xl bg-white/10 border border-primary/40 p-5 mb-6">
                <div className="text-[12px] font-bold uppercase tracking-wider text-white/70 mb-1">
                  Potential Extra Revenue Unlocked:
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="text-[26px] sm:text-[32px] font-extrabold text-primary tabular-nums">
                    +{formatStoreCurrency(extraMonthlyRevenue, calcCurrency)}{' '}
                    <span className="text-[15px] font-bold text-white/80">
                      / month
                    </span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-primary text-white font-mono text-[13px] font-extrabold tabular-nums">
                    +{formatStoreCurrency(extraYearlyRevenue, calcCurrency)} / year
                  </div>
                </div>
              </div>

              {/* CTA & Disclaimer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <a
                  href="#store-audit"
                  className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center justify-center gap-2 shadow-lg shrink-0"
                >
                  <span>Show Me How</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-[11px] text-white/65 leading-relaxed">
                  Estimate for illustration only. Actual results depend on your
                  store, products and market.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. WHICH PLATFORM IS RIGHT FOR YOU? — QUICK QUIZ (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              PLATFORM FINDER
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight mb-3">
              Shopify, WooCommerce or{' '}
              <span className="text-primary">Custom?</span>
            </h2>
            <p className="text-[16px] text-navy-70">
              Answer 3 quick questions to find the best platform architecture
              for your online store.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left / Center Quiz Card (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-[24px] border-2 border-navy-15 p-6 sm:p-8 shadow-soft">
              {quizStep < 3 ? (
                <div>
                  {/* Progress Bar & Question Step Counter */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[12px] font-extrabold text-primary uppercase">
                      QUESTION 0{quizStep + 1} OF 03
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((idx) => (
                        <button
                          key={idx}
                          type="button"
                          aria-label={`Go to question ${idx + 1}`}
                          onClick={() => setQuizStep(idx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            idx === quizStep
                              ? 'w-8 bg-primary'
                              : idx < quizStep
                              ? 'w-4 bg-primary/50'
                              : 'w-4 bg-navy-15'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Current Question */}
                  {(() => {
                    const q = PLATFORM_QUIZ_QUESTIONS[quizStep];
                    return (
                      <div
                        role="radiogroup"
                        aria-labelledby={`quiz-heading-${q.id}`}
                      >
                        <h3
                          id={`quiz-heading-${q.id}`}
                          className="text-[22px] sm:text-[26px] font-extrabold text-navy mb-6"
                        >
                          {q.question}
                        </h3>

                        <div className="space-y-3.5">
                          {q.options.map((opt) => {
                            const selected = quizAnswers[q.id] === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                onClick={() =>
                                  handleSelectQuizOption(q.id, opt.id)
                                }
                                className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-4 cursor-pointer ${
                                  selected
                                    ? 'bg-primary-50/70 border-primary shadow-sm'
                                    : 'bg-white border-navy-15 hover:border-primary'
                                }`}
                              >
                                <div className="flex items-center gap-4">
                                  <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                      selected
                                        ? 'bg-primary text-white'
                                        : 'bg-primary-50 text-primary'
                                    }`}
                                  >
                                    <Store className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="text-[16px] font-extrabold text-navy">
                                      {opt.label}
                                    </div>
                                    <div className="text-[13px] text-navy-70">
                                      {opt.sub}
                                    </div>
                                  </div>
                                </div>

                                <span
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                    selected
                                      ? 'border-primary bg-primary text-white'
                                      : 'border-navy-15'
                                  }`}
                                >
                                  {selected && <Check className="w-3.5 h-3.5" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Bottom Quiz Navigation */}
                  <div className="mt-6 pt-4 border-t border-navy-08 flex items-center justify-between">
                    <button
                      type="button"
                      disabled={quizStep === 0}
                      onClick={() => setQuizStep((s) => Math.max(0, s - 1))}
                      className="text-[13px] font-bold text-navy-50 hover:text-navy disabled:opacity-40 cursor-pointer"
                    >
                      ← Previous Question
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuizStep(3)}
                      className="text-[13px] font-extrabold text-primary hover:underline cursor-pointer"
                    >
                      Skip to Recommendation →
                    </button>
                  </div>
                </div>
              ) : (
                /* Animated Result Card */
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-navy-15">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[10px] font-extrabold uppercase">
                          {recommendedPlatform.badge}
                        </span>
                        <h3 className="text-[24px] font-extrabold text-navy">
                          {recommendedPlatform.name}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setQuizStep(0)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary-50 text-primary text-[12px] font-bold hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Quiz</span>
                    </button>
                  </div>

                  <p className="text-[15px] text-navy-70 leading-relaxed">
                    {recommendedPlatform.tagline}
                  </p>

                  {/* Why It Fits You (3 Blue ✓ Points) */}
                  <div className="rounded-2xl bg-primary-50/60 border border-primary-100 p-5">
                    <div className="text-[12px] font-extrabold uppercase tracking-wider text-primary mb-3">
                      Why it fits you:
                    </div>
                    <ul className="space-y-2.5">
                      {recommendedPlatform.whyFits.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-2.5 text-[14px] font-bold text-navy"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Watch Out For (1–2 Navy-Tint Points) */}
                  <div className="rounded-2xl bg-navy/5 border border-navy-15 p-4">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-navy-70 mb-2">
                      Watch out for:
                    </div>
                    <ul className="space-y-1.5">
                      {recommendedPlatform.watchOut.map((warn) => (
                        <li
                          key={warn}
                          className="flex items-start gap-2 text-[13px] font-medium text-navy-70"
                        >
                          <AlertCircle className="w-4 h-4 text-navy-50 shrink-0 mt-0.5" />
                          <span>{warn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenQuoteModal(
                          `${recommendedPlatform.name} Store Consultation`
                        )
                      }
                      className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>Get a Free Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Compact 3-Column Mini Comparison with Blue Dot Ratings (5 cols) */}
            <div className="lg:col-span-5 bg-primary-50/50 rounded-[24px] border border-primary-100 p-6 sm:p-7">
              <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-1">
                AT-A-GLANCE SCORECARD
              </div>
              <h3 className="text-[20px] font-extrabold text-navy mb-5">
                Platform Comparison Matrix
              </h3>

              <div className="space-y-4">
                {PLATFORM_MINI_COMPARISON.map((row) => (
                  <div
                    key={row.platform}
                    className="rounded-2xl bg-white p-4 border border-navy-15 shadow-2xs"
                  >
                    <div className="text-[16px] font-extrabold text-navy mb-3 pb-2 border-b border-navy-08 flex items-center justify-between">
                      <span>{row.platform}</span>
                      <span className="font-mono text-[11px] text-primary font-bold">
                        5-DOT RATING
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[12px]">
                      {[
                        { label: 'Speed to launch', score: row.speedToLaunch },
                        { label: 'Flexibility', score: row.flexibility },
                        { label: 'Running cost', score: row.runningCost },
                      ].map((metric) => (
                        <div key={metric.label}>
                          <div className="text-navy-70 font-semibold mb-1.5">
                            {metric.label}
                          </div>
                          <div
                            className="flex items-center gap-1"
                            aria-label={`${metric.score} out of 5`}
                          >
                            {[1, 2, 3, 4, 5].map((dot) => (
                              <span
                                key={dot}
                                className={`w-2.5 h-2.5 rounded-full ${
                                  dot <= metric.score
                                    ? 'bg-primary'
                                    : 'bg-navy-15'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. SERVICES — THE ORDER RECEIPT (navy)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHAT WE DELIVER
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight">
              Your <span className="text-primary">Growth Order</span>, Itemized
            </h2>
          </div>

          {/* Tall White Paper Receipt with Torn Zig-Zag Edges */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative mx-auto max-w-[780px] shadow-2xl"
          >
            {/* Top Zig-Zag Torn Edge */}
            <div
              aria-hidden="true"
              className="h-4 w-full ecom-receipt-zigzag-top"
            />

            <div className="bg-white text-navy px-5 sm:px-10 py-8">
              {/* Monospace Receipt Header */}
              <div className="text-center pb-6 mb-6 border-b-2 border-dashed border-navy/25">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-50 text-primary mb-3">
                  <Receipt className="w-6 h-6" />
                </div>
                <div className="font-mono text-[13px] sm:text-[15px] font-extrabold tracking-wider text-navy">
                  WEBXCODE STORE SERVICES · ORDER #WX-2026
                </div>
                <div className="font-mono text-[11px] text-navy-50 mt-1">
                  TERMINAL: D2C-GROWTH-01 · CLICK ANY ITEM TO EXPAND SPECS
                </div>
              </div>

              {/* Column Headers */}
              <div className="flex items-center justify-between font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50 pb-3 border-b border-dashed border-navy/20">
                <span>ITEM // SERVICE DESCRIPTION</span>
                <span>TIER TAG</span>
              </div>

              {/* 9 Expandable Receipt Line Items */}
              <div className="divide-y divide-dashed divide-navy/20">
                {RECEIPT_LINE_ITEMS.map((item) => {
                  const isExpanded = expandedReceiptIds.includes(item.id);
                  return (
                    <div key={item.id} className="py-4">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => toggleReceiptItem(item.id)}
                        className="w-full text-left flex items-center justify-between gap-4 cursor-pointer group"
                      >
                        <div className="flex items-start sm:items-center gap-3">
                          <span className="font-mono text-[12px] font-extrabold text-primary bg-primary-50 px-2.5 py-1 rounded-md shrink-0">
                            #{item.code}
                          </span>
                          <span className="text-[15px] sm:text-[17px] font-extrabold text-navy group-hover:text-primary transition-colors">
                            {item.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <span
                            className={`font-mono text-[11px] font-extrabold px-2.5 py-1 rounded-full ${
                              item.tag === 'INCLUDED'
                                ? 'bg-primary text-white'
                                : 'bg-primary-50 text-primary border border-primary-100'
                            }`}
                          >
                            {item.tag}
                          </span>
                          <span className="w-7 h-7 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                            {isExpanded ? (
                              <Minus className="w-3.5 h-3.5" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" />
                            )}
                          </span>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="mt-3.5 pl-0 sm:pl-12 pr-2 space-y-3">
                          <p className="text-[14px] text-navy-70 leading-relaxed">
                            {item.description}
                          </p>
                          <ul className="space-y-1.5">
                            {item.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-start gap-2 text-[13px] font-bold text-navy"
                              >
                                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                          {item.id === 'rc-01' && (
                            <div className="pt-2">
                              <Link
                                href="/services/ecommerce-development"
                                className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-primary hover:underline"
                              >
                                <span>Explore E-commerce Development Service Page</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Receipt Total & Barcode Footer */}
              <div className="mt-6 pt-6 border-t-2 border-dashed border-navy/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <span className="font-mono text-[14px] font-extrabold text-navy">
                    TOTAL DELIVERABLE:
                  </span>
                  <span className="text-[20px] sm:text-[24px] font-extrabold text-primary">
                    More Sales, Better Margins
                  </span>
                </div>

                {/* CSS / SVG Barcode Graphic */}
                <div className="flex flex-col items-center justify-center pt-2">
                  <svg
                    viewBox="0 0 280 46"
                    className="w-64 h-11 text-navy"
                    aria-hidden="true"
                  >
                    {[
                      4, 10, 14, 22, 26, 34, 38, 42, 50, 56, 60, 68, 74, 78, 86,
                      92, 98, 104, 112, 116, 122, 130, 136, 142, 148, 156, 160,
                      168, 174, 180, 188, 194, 198, 206, 212, 218, 226, 232,
                      238, 244, 252, 258, 264, 270,
                    ].map((x, i) => (
                      <rect
                        key={x}
                        x={x}
                        y="2"
                        width={i % 3 === 0 ? '4' : '2'}
                        height="42"
                        fill="currentColor"
                      />
                    ))}
                  </svg>
                  <p className="font-mono text-[11px] font-bold text-navy-50 mt-2">
                    Thank you for shopping with WebXCode
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Zig-Zag Torn Edge */}
            <div
              aria-hidden="true"
              className="h-4 w-full ecom-receipt-zigzag-bottom"
            />
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          6. CHECKOUT MAKEOVER — BEFORE vs AFTER (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              CHECKOUT OPTIMIZATION
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Fewer Steps. <span className="text-primary">More Orders.</span>
            </h2>
          </div>

          {/* Two Phone Mockups Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1040px] mx-auto items-start">
            {/* Left Phone — "Typical checkout" (Muted, 6 Steps) */}
            <div className="flex flex-col items-center">
              <div className="mb-4 flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-navy/10 text-navy font-mono text-[12px] font-extrabold">
                  Step {typicalCheckoutStep} of 6…
                </span>
                <span className="text-[14px] font-bold text-navy-50">
                  Typical checkout
                </span>
              </div>

              <div className="w-full max-w-[360px] rounded-[36px] border-4 border-navy/20 bg-primary-50/30 p-5 shadow-md">
                {/* Phone Notch */}
                <div className="w-20 h-1.5 rounded-full bg-navy/20 mx-auto mb-4" />

                <div className="space-y-2.5">
                  {TYPICAL_CHECKOUT_STEPS.map((st) => {
                    const isCurrent = typicalCheckoutStep === st.step;
                    return (
                      <div key={st.step}>
                        <div
                          onClick={() => setTypicalCheckoutStep(st.step)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isCurrent
                              ? 'bg-white border-navy text-navy shadow-xs'
                              : 'bg-white/60 border-navy-08 text-navy-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-navy/10 text-navy font-mono text-[11px] font-bold flex items-center justify-center">
                              {st.step}
                            </span>
                            <span className="text-[13px] font-bold">
                              {st.name}
                            </span>
                          </div>
                          <span className="font-mono text-[10px] font-bold text-navy-50">
                            {isCurrent ? 'ACTIVE' : 'WAIT'}
                          </span>
                        </div>

                        {/* Drop-Off Indicator Between Steps */}
                        {isCurrent && (
                          <div className="my-1.5 ml-4 px-3 py-1 rounded-md bg-navy/10 text-navy-70 font-mono text-[11px] font-bold inline-flex items-center gap-1.5">
                            <X className="w-3.5 h-3.5 text-navy" />
                            <span>Drop-off: {st.dropOff}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Phone — "WebXCode checkout" (Crisp, 1 Page) */}
            <div className="flex flex-col items-center">
              <div className="mb-4 flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-primary text-white font-mono text-[12px] font-extrabold shadow-xs">
                  1 page
                </span>
                <span className="text-[14px] font-extrabold text-navy">
                  WebXCode checkout
                </span>
              </div>

              <div className="w-full max-w-[360px] rounded-[36px] border-4 border-primary bg-white p-5 shadow-2xl">
                {/* Phone Notch */}
                <div className="w-20 h-1.5 rounded-full bg-primary/30 mx-auto mb-4" />

                {/* 1-Page Express Checkout UI */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2.5 border-b border-navy-08">
                    <span className="text-[13px] font-extrabold text-navy">
                      Express Guest Checkout
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[10px] font-extrabold">
                      NO LOGIN NEEDED
                    </span>
                  </div>

                  {/* Autofilled Pincode & Address */}
                  <div className="p-3 rounded-xl bg-primary-50/50 border border-primary-100">
                    <div className="flex items-center justify-between text-[11px] font-bold text-primary mb-1">
                      <span>✓ PINCODE 400001 AUTOFILLED</span>
                      <span>Mumbai, MH</span>
                    </div>
                    <div className="text-[12px] font-semibold text-navy">
                      42, Linking Road, Bandra West · Free Express Delivery
                    </div>
                  </div>

                  {/* One-Tap Payment Options */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-navy-50">
                      Instant Payment Method
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {['One-Tap UPI', 'Card / EMI', 'Verified COD'].map(
                        (m, idx) => (
                          <div
                            key={m}
                            className={`p-2 rounded-lg text-center text-[11px] font-extrabold border ${
                              idx === 0
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-navy border-navy-15'
                            }`}
                          >
                            {m}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Order Mini Summary */}
                  <div className="p-3 rounded-xl bg-white border border-navy-08 flex items-center justify-between text-[12px]">
                    <span className="font-semibold text-navy-70">
                      2 Items · Prepaid ₹100 Off
                    </span>
                    <span className="font-extrabold text-navy">₹2,499</span>
                  </div>

                  {/* Sticky Pay Button */}
                  <a
                    href="#store-audit"
                    className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[14px] flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹2,499</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Below: 4 Blue ✓ Chips */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {CHECKOUT_BENEFIT_CHIPS.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary-50 border border-primary-100 text-navy text-[13px] font-extrabold"
              >
                <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
                <span>{chip}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. BUILT FOR INDIA & GLOBAL — TOGGLE BENTO (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                LOCAL &amp; GLOBAL
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Built for{' '}
                <span className="text-primary">How Your Customers Buy</span>
              </h2>
            </div>

            {/* Large Accessible Toggle Switch: India ⟷ Global */}
            <div className="flex items-center gap-3 bg-white p-2 rounded-full border-2 border-navy-15 shadow-sm self-start">
              <button
                type="button"
                onClick={() => setMarketMode('india')}
                className={`px-4 py-2.5 rounded-full text-[13px] font-extrabold inline-flex items-center gap-2 transition-all cursor-pointer ${
                  marketMode === 'india'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-navy-70 hover:text-navy'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>India (D2C &amp; COD)</span>
              </button>

              <button
                type="button"
                role="switch"
                aria-checked={marketMode === 'global'}
                aria-label="Toggle between India and Global e-commerce mode"
                onClick={() =>
                  setMarketMode((m) => (m === 'india' ? 'global' : 'india'))
                }
                className="w-12 h-7 rounded-full bg-navy/15 p-1 flex items-center cursor-pointer relative"
              >
                <span
                  className={`w-5 h-5 rounded-full bg-primary transition-transform ${
                    marketMode === 'global' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setMarketMode('global')}
                className={`px-4 py-2.5 rounded-full text-[13px] font-extrabold inline-flex items-center gap-2 transition-all cursor-pointer ${
                  marketMode === 'global'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-navy-70 hover:text-navy'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Global (Cross-Border)</span>
              </button>
            </div>
          </div>

          {/* Bento Grid of Interactive Mini-Widgets with Smooth Cross-Fade */}
          <AnimatePresence mode="wait">
            {marketMode === 'india' ? (
              <motion.div
                key="bento-india"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6"
              >
                {/* Widget 1: Interactive 6-Digit Pincode Checker (5 cols) */}
                <div className="md:col-span-5 bg-white rounded-[20px] p-6 border border-navy-15 shadow-soft flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[11px] font-extrabold text-primary uppercase">
                        LIVE WIDGET // PINCODE ESTIMATOR
                      </span>
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-[20px] font-extrabold text-navy mb-2">
                      Interactive Pincode Checker
                    </h3>
                    <p className="text-[13px] text-navy-70 mb-4">
                      Show shoppers exact delivery dates and COD availability
                      before they even reach checkout.
                    </p>

                    <form
                      onSubmit={handleCheckPincode}
                      className="flex items-center gap-2 mb-4"
                    >
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        aria-label="Enter 6-digit Indian pincode"
                        value={pincodeInput}
                        onChange={(e) => setPincodeInput(e.target.value)}
                        placeholder="Enter 6-digit pincode (e.g. 400001)"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-navy-15 font-mono text-[14px] font-bold text-navy focus:outline-none focus:border-primary"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-[13px] font-extrabold cursor-pointer"
                      >
                        Check
                      </button>
                    </form>
                  </div>

                  <div className="p-3.5 rounded-xl bg-primary-50/70 border border-primary-100">
                    <div className="text-[12px] font-extrabold text-primary">
                      {pincodeResult.city}
                    </div>
                    <div className="text-[14px] font-extrabold text-navy mt-0.5">
                      {pincodeResult.day} · {pincodeResult.cod}
                    </div>
                  </div>
                </div>

                {/* Widget 2: COD & RTO Reduction Card (4 cols) */}
                <div className="md:col-span-4 bg-navy text-white rounded-[20px] p-6 border border-primary/40 shadow-soft flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[11px] font-extrabold text-primary uppercase">
                        PROFIT PROTECTION
                      </span>
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-[20px] font-extrabold text-white mb-2">
                      COD &amp; RTO Reduction Engine
                    </h3>
                    <p className="text-[13px] text-white/75 mb-4">
                      Cut fake orders and courier return losses by up to 35%
                      with smart rules:
                    </p>
                    <ul className="space-y-2 text-[13px] font-bold text-white">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span>COD verification via WhatsApp OTP</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span>Partial prepaid deposit for high-value COD</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span>High-risk pincode &amp; repeat RTO flags</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/15 font-mono text-[11px] font-bold text-primary">
                    PREPAID INCENTIVE: &ldquo;Extra ₹100 Off on UPI&rdquo;
                  </div>
                </div>

                {/* Widget 3: India Payment Chips & GST Invoices (3 cols) */}
                <div className="md:col-span-3 space-y-6">
                  <div className="bg-white rounded-[20px] p-5 border border-navy-15 shadow-soft">
                    <div className="font-mono text-[11px] font-extrabold text-primary uppercase mb-2">
                      INDIAN PAYMENTS
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {INDIA_PAYMENT_CHIPS.map((p) => (
                        <span
                          key={p}
                          className="px-3 py-1 rounded-full bg-primary-50 text-navy text-[12px] font-extrabold border border-primary-100"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-[20px] p-5 border border-navy-15 shadow-soft">
                    <div className="font-mono text-[11px] font-extrabold text-primary uppercase mb-1">
                      TAX COMPLIANCE
                    </div>
                    <h4 className="text-[16px] font-extrabold text-navy mb-1">
                      GST-Ready Invoices
                    </h4>
                    <p className="text-[12px] text-navy-70">
                      Automatic CGST/SGST/IGST split, HSN codes and B2B buyer
                      GSTIN input at checkout.
                    </p>
                  </div>
                </div>

                {/* Widget 4: Shipping Partners Strip (12 cols) */}
                <div className="md:col-span-12 bg-white rounded-[20px] px-6 py-4 border border-navy-15 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-5 h-5 text-primary" />
                    <span className="text-[14px] font-extrabold text-navy">
                      Integrated Indian Courier Partners &amp; Live AWB Tracking:
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {INDIA_SHIPPING_PARTNERS.map((partner) => (
                      <span
                        key={partner}
                        className="px-4 py-1.5 rounded-full bg-primary-50 text-primary font-mono text-[12px] font-extrabold border border-primary-100"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="bento-global"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6"
              >
                {/* Widget 1: Interactive Multi-Currency Switcher (5 cols) */}
                <div className="md:col-span-5 bg-white rounded-[20px] p-6 border border-navy-15 shadow-soft flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[11px] font-extrabold text-primary uppercase">
                        LIVE WIDGET // CURRENCY CONVERTER
                      </span>
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-[20px] font-extrabold text-navy mb-2">
                      Local Currency Switcher
                    </h3>
                    <p className="text-[13px] text-navy-70 mb-4">
                      Auto-detect buyer country and price products in their
                      native currency with local rounding rules:
                    </p>

                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {(['INR', 'USD', 'EUR', 'GBP'] as const).map((cur) => {
                        const active = globalSampleCurrency === cur;
                        return (
                          <button
                            key={cur}
                            type="button"
                            onClick={() => setGlobalSampleCurrency(cur)}
                            className={`py-2 px-3 rounded-xl font-mono text-[13px] font-extrabold border transition-all cursor-pointer ${
                              active
                                ? 'bg-primary text-white border-primary'
                                : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                            }`}
                          >
                            {GLOBAL_CURRENCIES[cur].symbol} {cur}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-primary-50/70 border border-primary-100 flex items-center justify-between">
                    <div>
                      <div className="text-[12px] font-bold text-navy-70">
                        Artisan Cashmere Scarf
                      </div>
                      <div className="text-[11px] font-semibold text-primary">
                        {GLOBAL_CURRENCIES[globalSampleCurrency].shipping}
                      </div>
                    </div>
                    <div className="font-mono text-[22px] font-extrabold text-navy">
                      {GLOBAL_CURRENCIES[globalSampleCurrency].price}
                    </div>
                  </div>
                </div>

                {/* Widget 2: Multi-Language & Multi-Currency Store Card (4 cols) */}
                <div className="md:col-span-4 bg-navy text-white rounded-[20px] p-6 border border-primary/40 shadow-soft flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold text-primary uppercase block mb-2">
                      SHOPIFY MARKETS &amp; GLOBAL
                    </span>
                    <h3 className="text-[20px] font-extrabold text-white mb-2">
                      Multi-Language &amp; Multi-Currency Storefronts
                    </h3>
                    <p className="text-[13px] text-white/75 mb-4">
                      Sell seamlessly in the US, UK, EU, UAE and Australia from
                      a single inventory back-office.
                    </p>
                    <ul className="space-y-2 text-[13px] font-bold text-white">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span>Geo-IP currency &amp; language routing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span>International SEO with regional hreflang</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span>Calculated DHL / FedEx / Aramex rates</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/15 font-mono text-[11px] font-bold text-primary">
                    DUTIES: DDP / DDU &amp; EU VAT READY
                  </div>
                </div>

                {/* Widget 3: Global Wallets & Tax/VAT Settings (3 cols) */}
                <div className="md:col-span-3 space-y-6">
                  <div className="bg-white rounded-[20px] p-5 border border-navy-15 shadow-soft">
                    <div className="font-mono text-[11px] font-extrabold text-primary uppercase mb-2">
                      GLOBAL WALLETS
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {GLOBAL_PAYMENT_CHIPS.map((p) => (
                        <span
                          key={p}
                          className="px-3 py-1 rounded-full bg-primary-50 text-navy text-[12px] font-extrabold border border-primary-100"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-[20px] p-5 border border-navy-15 shadow-soft">
                    <div className="font-mono text-[11px] font-extrabold text-primary uppercase mb-1">
                      CROSS-BORDER TAX
                    </div>
                    <h4 className="text-[16px] font-extrabold text-navy mb-1">
                      Automated Tax &amp; VAT
                    </h4>
                    <p className="text-[12px] text-navy-70">
                      US state sales tax, UK/EU VAT rules and CSB-V export
                      documentation support.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ====================================================================
          8. CASE STUDY — ORDER CONFIRMATION STYLE (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              CASE STUDY
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              <span className="text-primary">Lumière Botanicals</span>: Results,
              Delivered
            </h2>
          </div>

          {/* Order Confirmation Container */}
          <div className="rounded-[24px] border-2 border-navy-15 bg-white shadow-xl overflow-hidden">
            {/* Top Order Confirmation Banner */}
            <div className="bg-primary-50/70 px-6 sm:px-8 py-6 border-b border-navy-15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-[20px] sm:text-[22px] font-extrabold text-navy">
                    <span>Order Delivered ✓</span>
                  </div>
                  <div className="font-mono text-[12px] font-bold text-primary mt-0.5">
                    {ORDER_CASE_STUDY.orderNumber} · {ORDER_CASE_STUDY.brandTag}{' '}
                    · {ORDER_CASE_STUDY.timeline}
                  </div>
                </div>
              </div>

              <span className="px-4 py-1.5 rounded-full bg-white border border-primary/30 text-primary font-mono text-[12px] font-extrabold self-start sm:self-center">
                VERIFIED GROWTH ORDER
              </span>
            </div>

            {/* Body: Left "Items in this order" + Right "Order Summary" Results */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-navy-15">
              {/* Left (7 cols): Items in this order */}
              <div className="lg:col-span-7 p-6 sm:p-8">
                <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-4">
                  ITEMS IN THIS ORDER (5 DELIVERABLES)
                </div>

                <div className="space-y-3.5">
                  {ORDER_CASE_STUDY.itemsDelivered.map((item) => (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-2xl bg-primary-50/35 border border-navy-08 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Small Thumbnail */}
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-navy shrink-0 border border-navy-15">
                          <Image
                            src={IMG_STORE_SHOWCASE}
                            alt={item.name}
                            loading="lazy"
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-[15px] font-extrabold text-navy">
                            {item.name}
                          </h3>
                          <p className="text-[12px] text-navy-70">
                            {item.sub}
                          </p>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-white border border-primary-100 font-mono text-[11px] font-extrabold text-primary shrink-0">
                        {item.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right (5 cols): Order Summary Panel with Results as Line Items */}
              <div className="lg:col-span-5 p-6 sm:p-8 bg-primary-50/20 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-4">
                    ORDER SUMMARY // MEASURED IMPACT
                  </div>

                  <div className="space-y-3.5 mb-6">
                    {ORDER_CASE_STUDY.summaryMetrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-4 rounded-2xl bg-white border border-primary/25 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div>
                          <div className="text-[14px] font-extrabold text-navy">
                            {m.label}
                          </div>
                          <div className="text-[11px] font-semibold text-navy-50">
                            {m.note}
                          </div>
                        </div>
                        <div className="font-mono text-[20px] sm:text-[22px] font-extrabold text-primary tabular-nums">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Client Quote with Avatar */}
                  <div className="p-4 rounded-2xl bg-navy text-white">
                    <p className="text-[13px] text-white/85 italic leading-relaxed mb-3">
                      &ldquo;{ORDER_CASE_STUDY.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={IMG_AVATAR_FOUNDER}
                        alt={ORDER_CASE_STUDY.clientName}
                        loading="lazy"
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover border border-primary"
                      />
                      <div>
                        <div className="text-[13px] font-extrabold text-white">
                          {ORDER_CASE_STUDY.clientName}
                        </div>
                        <div className="text-[11px] text-white/70">
                          {ORDER_CASE_STUDY.clientRole}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 mt-6 border-t border-navy-15 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href="/our-work"
                    className="inline-flex items-center gap-1.5 text-[14px] font-extrabold text-navy hover:text-primary transition-colors"
                  >
                    <span>View More Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="#store-audit"
                    className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-[13px] font-extrabold inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Track Your Growth</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. INTEGRATIONS — APP DRAWER (navy)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              INTEGRATIONS
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight">
              Plug In <span className="text-primary">Everything You Use</span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div
            role="tablist"
            aria-label="E-commerce integration categories"
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            {(
              [
                'Payments',
                'Shipping',
                'Marketing & CRM',
                'Inventory & ERP',
                'AI & Support',
              ] as IntegrationCategory[]
            ).map((tab) => {
              const active = activeIntegrationTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveIntegrationTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-[13px] font-extrabold transition-all cursor-pointer ${
                    active
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white/10 text-white/75 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Phone-Style App Drawer Grid */}
          <div className="rounded-[28px] bg-white/5 border border-white/15 p-6 sm:p-8 backdrop-blur-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIntegrationTab}
                role="tabpanel"
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
              >
                {INTEGRATIONS_DRAWER[activeIntegrationTab].map((app, idx) => (
                  <motion.div
                    key={app.name}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 12 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: idx * 0.04 }}
                    className="rounded-[20px] bg-white/10 hover:bg-white/15 border border-white/15 p-5 flex flex-col items-center text-center transition-all"
                  >
                    {/* Rounded Square App Icon Tile */}
                    <div className="w-14 h-14 rounded-2xl bg-white text-primary font-mono text-[16px] font-extrabold flex items-center justify-center shadow-lg mb-3 border-2 border-primary/30">
                      {app.monogram}
                    </div>
                    <h3 className="text-[15px] font-extrabold text-white mb-1">
                      {app.name}
                    </h3>
                    <p className="text-[12px] text-white/70">{app.role}</p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. E-COMMERCE FAQ — PRICE-TAG ACCORDION (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              FAQ
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Questions from <span className="text-primary">Store Owners</span>
            </h2>
          </div>

          <div className="space-y-3.5">
            {ECOMMERCE_FAQS.map((faq) => {
              const isOpen = openFaqTag === faq.tag;
              return (
                <div
                  key={faq.tag}
                  className={`rounded-[20px] border-2 transition-all overflow-hidden bg-white ${
                    isOpen ? 'border-primary shadow-md' : 'border-navy-15'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqTag(isOpen ? '' : faq.tag)}
                    className="w-full px-5 sm:px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Small Blue Price-Tag Style Number Label */}
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-[12px] font-extrabold px-3 py-1 rounded-full shrink-0 ${
                          isOpen
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary border border-primary-100'
                        }`}
                      >
                        <Tag className="w-3 h-3" />
                        <span>{faq.tag}</span>
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
                      <p className="text-[15px] text-navy-70 leading-relaxed pl-0 sm:pl-16">
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
          11. FREE STORE AUDIT — CHECKOUT-STYLE CTA (id="store-audit")
      ==================================================================== */}
      <section
        id="store-audit"
        className="bg-primary-50 py-[72px] lg:py-[112px] border-b border-navy-08"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="rounded-[28px] bg-navy text-white p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 blue-glow-strong pointer-events-none" />

            <div className="max-w-2xl mb-8 relative z-10">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                FREE STORE AUDIT CHECKOUT
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.14] tracking-tight mb-2">
                Claim Your <span className="text-primary">Free Store Audit</span>
              </h2>
              <p className="text-[15px] sm:text-[16px] text-white/75">
                Complete your ₹0 audit order below—our e-commerce specialists
                will review your speed, checkout UX, SEO and ad tracking within
                48 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              {/* Left (7 cols): White "Checkout" Form Card */}
              <div className="lg:col-span-7 bg-white text-navy rounded-[24px] p-6 sm:p-8 shadow-xl">
                {/* 1-Page Checkout Step Indicator (Details → Store → Confirm) */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-navy-15 text-[12px] font-extrabold">
                  <span className="inline-flex items-center gap-1.5 text-primary">
                    <span className="w-5 h-5 rounded-full bg-primary text-white font-mono text-[11px] flex items-center justify-center">
                      1
                    </span>
                    <span>Details</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-navy-50" />
                  <span className="inline-flex items-center gap-1.5 text-primary">
                    <span className="w-5 h-5 rounded-full bg-primary text-white font-mono text-[11px] flex items-center justify-center">
                      2
                    </span>
                    <span>Store</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-navy-50" />
                  <span className="inline-flex items-center gap-1.5 text-navy">
                    <span className="w-5 h-5 rounded-full bg-primary-50 text-primary font-mono text-[11px] flex items-center justify-center">
                      3
                    </span>
                    <span>Confirm</span>
                  </span>
                </div>

                {auditPlaced ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto shadow-lg">
                      <Check className="w-8 h-8 stroke-[2.5]" />
                    </div>
                    <h3 className="text-[24px] font-extrabold text-navy">
                      Order placed!
                    </h3>
                    <p className="text-[15px] text-navy-70 max-w-md mx-auto">
                      We&apos;ll email your audit within 48 hours. Your free
                      store review for <strong>{auditForm.storeUrl}</strong> (
                      {auditForm.platform}) is now in queue.
                    </p>
                    <button
                      type="button"
                      onClick={() => setAuditPlaced(false)}
                      className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-[13px] cursor-pointer"
                    >
                      Audit Another Store
                    </button>
                  </div>
                ) : (
                  <form
                    id="store-audit-form"
                    onSubmit={handleStoreAuditSubmit}
                    noValidate
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="ecom-audit-name"
                          className="block text-[12px] font-extrabold text-navy uppercase mb-1"
                        >
                          Your Name *
                        </label>
                        <input
                          id="ecom-audit-name"
                          type="text"
                          value={auditForm.name}
                          onChange={(e) =>
                            setAuditForm({ ...auditForm, name: e.target.value })
                          }
                          placeholder="Rohan Kapoor"
                          className="w-full px-4 py-3 rounded-xl border border-navy-15 text-[14px] text-navy focus:outline-none focus:border-primary"
                        />
                        {auditErrors.name && (
                          <p className="text-[12px] text-primary font-semibold mt-1">
                            {auditErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="ecom-audit-email"
                          className="block text-[12px] font-extrabold text-navy uppercase mb-1"
                        >
                          Work Email *
                        </label>
                        <input
                          id="ecom-audit-email"
                          type="email"
                          value={auditForm.email}
                          onChange={(e) =>
                            setAuditForm({
                              ...auditForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="founder@yourbrand.com"
                          className="w-full px-4 py-3 rounded-xl border border-navy-15 text-[14px] text-navy focus:outline-none focus:border-primary"
                        />
                        {auditErrors.email && (
                          <p className="text-[12px] text-primary font-semibold mt-1">
                            {auditErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="ecom-audit-phone"
                          className="block text-[12px] font-extrabold text-navy uppercase mb-1"
                        >
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="ecom-audit-phone"
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
                          <p className="text-[12px] text-primary font-semibold mt-1">
                            {auditErrors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="ecom-audit-url"
                          className="block text-[12px] font-extrabold text-navy uppercase mb-1"
                        >
                          Store URL *
                        </label>
                        <input
                          id="ecom-audit-url"
                          type="url"
                          value={auditForm.storeUrl}
                          onChange={(e) =>
                            setAuditForm({
                              ...auditForm,
                              storeUrl: e.target.value,
                            })
                          }
                          placeholder="https://yourstore.com"
                          className="w-full px-4 py-3 rounded-xl border border-navy-15 text-[14px] text-navy focus:outline-none focus:border-primary"
                        />
                        {auditErrors.storeUrl && (
                          <p className="text-[12px] text-primary font-semibold mt-1">
                            {auditErrors.storeUrl}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Platform Chips */}
                    <div>
                      <span className="block text-[12px] font-extrabold text-navy uppercase mb-2">
                        Current Platform
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {AUDIT_PLATFORMS.map((plat) => {
                          const active = auditForm.platform === plat;
                          return (
                            <button
                              key={plat}
                              type="button"
                              aria-pressed={active}
                              onClick={() =>
                                setAuditForm({ ...auditForm, platform: plat })
                              }
                              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                                active
                                  ? 'bg-primary text-white shadow-xs'
                                  : 'bg-primary-50/60 text-navy border border-navy-15 hover:border-primary'
                              }`}
                            >
                              {plat}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Monthly Orders Chips */}
                    <div>
                      <span className="block text-[12px] font-extrabold text-navy uppercase mb-2">
                        Monthly Orders
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {AUDIT_ORDER_VOLUMES.map((vol) => {
                          const active = auditForm.monthlyOrders === vol;
                          return (
                            <button
                              key={vol}
                              type="button"
                              aria-pressed={active}
                              onClick={() =>
                                setAuditForm({
                                  ...auditForm,
                                  monthlyOrders: vol,
                                })
                              }
                              className={`px-4 py-2 rounded-full font-mono text-[13px] font-bold transition-all cursor-pointer ${
                                active
                                  ? 'bg-primary text-white shadow-xs'
                                  : 'bg-primary-50/60 text-navy border border-navy-15 hover:border-primary'
                              }`}
                            >
                              {vol} orders/mo
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Right (5 cols): White "Order Summary" Card */}
              <div className="lg:col-span-5 bg-white text-navy rounded-[24px] p-6 sm:p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-navy-15">
                    <h3 className="text-[19px] font-extrabold text-navy">
                      Order Summary
                    </h3>
                    <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold">
                      4 DELIVERABLES
                    </span>
                  </div>

                  <div className="space-y-3.5 pb-5 border-b border-navy-15">
                    {AUDIT_ORDER_SUMMARY_ITEMS.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between text-[14px]"
                      >
                        <span className="font-bold text-navy flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span>{item.name}</span>
                        </span>
                        <span className="font-mono font-extrabold text-primary">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="py-5 flex items-baseline justify-between">
                    <span className="text-[16px] font-extrabold text-navy">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="block text-[12px] font-mono text-navy-50 line-through">
                        ₹14,999 (Placeholder)
                      </span>
                      <span className="font-mono text-[28px] font-extrabold text-primary">
                        ₹0
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    form="store-audit-form"
                    disabled={auditSubmitting || auditPlaced}
                    className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] transition-all inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {auditSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Placing Audit Order…</span>
                      </>
                    ) : (
                      <>
                        <span>Place Free Audit Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Small Trust Row */}
                  <div className="mt-4 pt-3 border-t border-navy-08 flex flex-wrap items-center justify-center gap-4 text-[12px] font-bold text-navy-70">
                    <span className="inline-flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-primary" />
                      <span>Secure</span>
                    </span>
                    <span>·</span>
                    <span>No obligation</span>
                    <span>·</span>
                    <span>Report in 48 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              href="/industries"
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
                href={
                  ind.slug === 'b2b-saas'
                    ? '/industries/b2b-saas'
                    : ind.slug === 'finance-fintech'
                    ? '/industries/finance-fintech'
                    : ind.slug === 'interior-design-architecture'
                    ? '/industries/interior-design-architecture'
                    : ind.slug === 'manufacturing-industrial'
                    ? '/industries/manufacturing-industrial'
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

export default Ecommerce;


